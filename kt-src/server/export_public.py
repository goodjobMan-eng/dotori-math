"""R2에서 내려받은 원본 묶음을 공개 데이터셋으로 정리한다.

사용:  python export_public.py <원본 폴더> <출력 폴더> <월 YYYY-MM>
  - 원본 폴더: raw/<날짜>/<기기>.json 들
  - 비밀 소금값: 환경변수 KT_SALT (공개 저장소·데이터에 절대 넣지 않음)

공개본에서 바꾸는 것
  1. 날짜를 뺀다. 대신 그 기기의 '며칠째'(0, 1, 2 …)만 남긴다. 담임이 "우리 반이 그날 그 단원을 풀었다"로 기기를 찾을 수 없게.
  2. 기기 번호 → 소금 친 해시(16자). 기기에 남은 번호로 공개 데이터를 찾아볼 수 없게.
  3. 의심스러운 기기 제거: 응답 대부분이 0.3초 미만, 하루 1,500건 초과, 200건 이상인데 정답률이 정확히 0% 또는 100%.
  4. 기록이 20건 미만인 기기 제거.
문제 내용은 (episode, template, variant, seed, 앱 버전)으로 공개 소스에서 그대로 다시 만들 수 있다.
"""
import csv, glob, hashlib, hmac, json, os, sys
from datetime import date

def main(src, out, month):
    salt = os.environ.get('KT_SALT')
    if not salt or len(salt) < 32:
        sys.exit('KT_SALT 환경변수(32자 이상)가 필요합니다.')
    by_dev = {}
    for p in sorted(glob.glob(os.path.join(src, 'raw', f'{month}-*', '*.json'))):
        with open(p, encoding='utf-8') as f:
            b = json.load(f)
        if b.get('v') != 2:
            continue
        by_dev.setdefault(b['did'], []).extend(b['recs'])
    os.makedirs(out, exist_ok=True)
    kept = dropped = 0
    path = os.path.join(out, f'responses_{month}.csv')
    with open(path, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['learner', 'day_index', 'seq', 'episode', 'template', 'variant', 'seed', 'given', 'correct', 'misconception', 'ms', 'diagnostic', 'app_version', 'exposed_codes', 'mode', 'set_pos', 'repeat', 'resp_type'])
        for did, recs in by_dev.items():
            n = len(recs)
            fast = sum(1 for r in recs if r[8] < 300) / n if n else 0
            acc = sum(r[6] for r in recs) / n if n else 0
            days = sorted({r[0] for r in recs})
            per_day = max((sum(1 for r in recs if r[0] == d) for d in days), default=0)
            if n < 20 or fast > 0.8 or per_day > 1500 or (n >= 200 and acc in (0, 1)):
                dropped += 1
                continue
            d0 = date.fromisoformat(days[0])
            lid = hmac.new(salt.encode(), did.encode(), hashlib.sha256).hexdigest()[:16]
            for i, r in enumerate(recs):
                w.writerow([lid, (date.fromisoformat(r[0]) - d0).days, i, r[1], r[2], r[3], r[4], r[5], r[6], r[7] or '', min(180000, round(r[8] / 100) * 100), r[9], 3] + (list(r[10:15]) if len(r) >= 15 else ['', '', '', '', '']))
            kept += 1
    print(f'{path}: 기기 {kept}대 포함, {dropped}대 제외')

if __name__ == '__main__':
    main(*sys.argv[1:4])
