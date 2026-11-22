"""Cloudflare KV에 쌓인 익명 기록을 내 컴퓨터로 내려받는다. (이미 받은 파일은 건너뜀)

사용:  python3 server/pull_kv.py <받을 폴더>
필요한 환경변수 (화면에 찍거나 저장소에 올리지 말 것)
  CF_ACCOUNT_ID  Cloudflare 계정 ID (대시보드 오른쪽 아래)
  CF_KV_ID       기록이 쌓이는 KV 이름공간 ID (Workers & Pages → KV)
  CF_API_TOKEN   'Workers KV Storage: Read' 권한만 준 API 토큰 (내 프로필 → API 토큰)
받은 뒤:  python3 analysis/analyze.py <받을 폴더>

주의: 이 스크립트는 Cloudflare 문서의 API 형식대로 썼고, 실제 계정으로 돌려 본 적은 아직 없다. 처음 돌릴 때 오류가 나면 오류 글을 그대로 알려 주면 된다.
"""
import json, os, sys, urllib.parse, urllib.request

API = 'https://api.cloudflare.com/client/v4'


def get(url, token):
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + token})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main(out):
    acc, ns, tok = (os.environ.get(k) for k in ('CF_ACCOUNT_ID', 'CF_KV_ID', 'CF_API_TOKEN'))
    if not (acc and ns and tok):
        sys.exit(__doc__)
    base = f'{API}/accounts/{acc}/storage/kv/namespaces/{ns}'
    cursor, new, old = '', 0, 0
    while True:
        q = {'prefix': 'raw/', 'limit': 1000}
        if cursor:
            q['cursor'] = cursor
        page = json.loads(get(base + '/keys?' + urllib.parse.urlencode(q), tok))
        for k in page.get('result', []):
            name = k['name']                                     # raw/<날짜>/<기기>.json
            parts = name.split('/')
            if len(parts) != 3 or '..' in name or not name.endswith('.json'):
                continue
            path = os.path.join(out, *parts)
            if os.path.exists(path):
                old += 1
                continue
            os.makedirs(os.path.dirname(path), exist_ok=True)
            data = get(base + '/values/' + urllib.parse.quote(name, safe=''), tok)
            with open(path, 'wb') as f:
                f.write(data)
            new += 1
        cursor = (page.get('result_info') or {}).get('cursor') or ''
        if not cursor:
            break
    print(f'새로 받은 묶음 {new}, 이미 있던 것 {old} → {out}')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1])
