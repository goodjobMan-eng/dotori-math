// 도토리 숲 수학 — 익명 학습 기록 수집 서버 (Cloudflare Worker + R2)
// 하는 일: 앱이 하루 한 번 이하로 보내는 익명 묶음을 검사해서 R2(비공개 저장소)에 파일로 쌓는다.
// 하지 않는 일: IP·브라우저 정보·쿠키 저장, 읽기 API 제공(데이터는 관리자만 R2에서 내려받음).

const ALLOWED_ORIGINS = ['https://goodjobman-eng.github.io'];
const MAX_BODY = 200 * 1024;          // 200KB
const MAX_RECS = 2000;
const RE = {
  did:  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  day:  /^\d{4}-\d{2}-\d{2}$/,
  ep:   /^(S\d-\d{1,3}|EP\d{2})$/,
  code: /^[NRGD]\d-\d{2}$/,
  codes:/^([NRGD]\d-\d{2}(\|[NRGD]\d-\d{2}){0,3})?$/,
  mode: /^[ugfdqrkAB]$/,
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
  return Array.isArray(r) && r.length === 15
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

    // 한 기기는 하루 한 묶음만. 같은 날 두 번째는 거절(서버 폭주·도배 방지).
    const key = `raw/${body.day}/${body.did}.json`;
    if (await env.BUCKET.head(key)) return reply(409, origin);
    await env.BUCKET.put(key, JSON.stringify({ v: 2, did: body.did, day: body.day, recs: body.recs }), {
      httpMetadata: { contentType: 'application/json' },
    });
    return reply(204, origin);
  },
};
