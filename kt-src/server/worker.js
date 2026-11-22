// 도토리 숲 수학 — 익명 학습 기록 수집 서버 (Cloudflare Worker + R2)
// 하는 일: 앱이 하루 한 번 이하로 보내는 익명 묶음을 검사해서 R2(비공개 저장소)에 파일로 쌓는다.
// 하지 않는 일: IP·브라우저 정보·쿠키 저장, 읽기 API 제공(데이터는 관리자만 R2에서 내려받음).

const ALLOWED_ORIGINS = ['https://goodjobman-eng.github.io'];
const MAX_BODY = 200 * 1024;          // 200KB
const MAX_RECS = 2000;
// 그럴듯함 검사: 한 아이가 하루에 2시간 넘게 공부하지는 않는다(교수님 11/22). 여유를 두어 하루 3시간·600문제를 넘는 날이 하나라도 있으면 가짜로 보고 묶음을 받지 않는다.
const DAY_MS_MAX = 3 * 3600 * 1000, DAY_RECS_MAX = 600, DAYS_BACK = 45;
function plausible(body) {
  const by = {}; const t0 = Date.parse(body.day + 'T00:00:00Z');
  for (const r of body.recs) {
    const t = Date.parse(r[0] + 'T00:00:00Z'); if (Number.isNaN(t) || t > t0 + 864e5 || t < t0 - DAYS_BACK * 864e5) return false;   // 보낸 날보다 뒤이거나 너무 오래된 줄
    const d = by[r[0]] || (by[r[0]] = { n: 0, ms: 0 }); d.n++; d.ms += r[8];
    if (d.n > DAY_RECS_MAX || d.ms > DAY_MS_MAX) return false;
  }
  const fast = body.recs.filter(r => r[8] > 0 && r[8] < 300).length;           // 0.3초 안에 답한 줄이 대부분이면 사람이 푼 것이 아님
  return !(body.recs.length >= 30 && fast > body.recs.length * 0.8);
}
const RE = {
  did:  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  day:  /^\d{4}-\d{2}-\d{2}$/,
  ep:   /^(S\d-\d{1,3}|EP\d{2}|card:[A-Z]{1,2}\d{2})$/,              // card:C12 = 개념 카드를 본 줄
  code: /^([NRGD]\d-\d{2}|F)$/,                                    // F = 오개념으로 가르지 못한 그 밖의 오답
  codes:/^(([NRGD]\d-\d{2}|F)(\|([NRGD]\d-\d{2}|F)){0,3})?$/,
  mode: /^[ugfdqrkABpns]$/,
  given:/^[0-9A-Za-z가-힣ㄱ-ㅎ .:,/%°²³+×÷=−\-~()←→↑↓]{0,24}$/,
};

const cors = origin => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST',
  'Vary': 'Origin',
});
const reply = (status, origin) => new Response(null, { status, headers: cors(origin) });

function dayOk(day) {
  const t = Date.parse(day + 'T00:00:00Z'); if (Number.isNaN(t)) return false;
  return Math.abs(Date.now() - t) <= 3 * 864e5;                        // 서버 날짜 ±3일만
}
function recOk(r) {                                                     // [day, ep, ti, v, seed, given, ok, code, ms, diag, 노출 코드들, 방식, 세트 안 순서, 다시 나온 문제, 응답 형태(c 고르기·w 쓰기·m 조작)]
  return Array.isArray(r) && (r.length === 15 || (r.length === 16 && typeof r[15] === 'string' && /^[a-z]{0,4}$/.test(r[15])))   // 16번째 칸: 받은 도움(v 그림과 함께 나옴, e 선수 내용으로 바꿔 낸 문제)
    && typeof r[0] === 'string' && RE.day.test(r[0])
    && typeof r[1] === 'string' && RE.ep.test(r[1])
    && Number.isInteger(r[2]) && r[2] >= -1 && r[2] < 200
    && Number.isInteger(r[3]) && r[3] >= 0 && r[3] < 100
    && Number.isInteger(r[4]) && r[4] >= 0 && r[4] <= 4294967295
    && typeof r[5] === 'string' && RE.given.test(r[5])
    && (r[6] === 0 || r[6] === 1)
    && (r[7] === null || (typeof r[7] === 'string' && RE.code.test(r[7])))
    && Number.isInteger(r[8]) && r[8] >= 0 && r[8] <= 600000
    && (r[9] === 0 || r[9] === 1)
    && typeof r[10] === 'string' && RE.codes.test(r[10])
    && typeof r[11] === 'string' && RE.mode.test(r[11])
    && Number.isInteger(r[12]) && r[12] >= 0 && r[12] < 100
    && (r[13] === 0 || r[13] === 1)
    && (r[14] === 'c' || r[14] === 'w' || r[14] === 'm');
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url); const origin = req.headers.get('Origin') || '';
    if (url.pathname !== '/v1/ingest') return reply(404, origin);
    if (req.method === 'OPTIONS') return reply(204, origin);
    if (req.method !== 'POST') return reply(405, origin);
    if (!ALLOWED_ORIGINS.includes(origin)) return reply(403, origin);  // 다른 사이트에서 보낸 요청 거절

    // IP별 속도 제한(Cloudflare Rate Limiting 바인딩). IP는 세기만 하고 저장하지 않는다.
    if (env.LIMITER) {
      const { success } = await env.LIMITER.limit({ key: req.headers.get('CF-Connecting-IP') || 'x' });
      if (!success) return reply(429, origin);
    }

    const len = +(req.headers.get('Content-Length') || 0);
    if (len > MAX_BODY) return reply(413, origin);
    const text = await req.text(); if (text.length > MAX_BODY) return reply(413, origin);

    let body; try { body = JSON.parse(text); } catch { return reply(400, origin); }
    const keys = Object.keys(body || {}).sort().join(',');
    if (keys !== 'day,did,recs,v') return reply(400, origin);           // 정해진 칸 외에는 받지 않음(이름 등 끼워 넣기 방지)
    if (body.v !== 2 || !RE.did.test(body.did) || !RE.day.test(body.day) || !dayOk(body.day)) return reply(400, origin);
    if (!Array.isArray(body.recs) || body.recs.length < 1 || body.recs.length > MAX_RECS || !body.recs.every(recOk)) return reply(400, origin);
    if (!plausible(body)) return reply(422, origin);

    // 한 기기는 하루 한 묶음만. 같은 날 두 번째는 거절(서버 폭주·도배 방지).
    const key = `raw/${body.day}/${body.did}.json`;
    // 저장소: R2(BUCKET)가 묶여 있으면 R2, 없으면 KV(카드 등록 없이 무료로 시작할 수 있음. 하루 쓰기 1,000번·1GB까지).
    const data = JSON.stringify({ v: 2, did: body.did, day: body.day, recs: body.recs });
    if (env.BUCKET) {
      if (await env.BUCKET.head(key)) return reply(409, origin);
      await env.BUCKET.put(key, data, { httpMetadata: { contentType: 'application/json' } });
    } else if (env.KV) {
      if (await env.KV.get(key) !== null) return reply(409, origin);
      try { await env.KV.put(key, data); } catch { return reply(503, origin); }   // 무료 한도(하루 쓰기 1,000번)를 넘으면 그날은 더 받지 않음 = 하루 총량 상한. 요금은 나가지 않는다.
    } else return reply(500, origin);
    return reply(204, origin);
  },
};
