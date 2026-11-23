"""보고서 프로그램(analyze.py)이 제대로 찾는지 보려고 가짜 기록을 만든다. 실제 자료가 아니다.

사용:  python3 analysis/fake_data.py <출력 폴더> [기기 수]
일부러 심어 두는 문제(analyze.py가 찾아야 함):
  - EASY  너무 쉬운 틀           - HARD  너무 어려운 틀
  - REV   잘하는 아이가 더 틀리는 틀   - FAST  1초 안에 찍는 틀
  - UNC   오답이 오개념으로 안 잡히는 쓰기 틀(같은 오답을 많이 씀)
  - DEAD  아무도 안 고르는 오답 보기가 있는 틀
  - MQ    조작을 거의 안 하고 내는 조작 틀
  - 로봇 기기 3대(0.1초마다 답함) → 걸러져야 함
"""
import json, os, random, sys, uuid

HERE = os.path.dirname(os.path.abspath(__file__))


def main(out, ndev=120):
    random.seed(7)
    cat = json.load(open(os.path.join(HERE, 'catalog.json'), encoding='utf-8'))
    eps = [e for e in cat['eps'] if e.startswith('S3-')][:12]
    plant = {'EASY': (eps[0], 0), 'HARD': (eps[1], 0), 'REV': (eps[2], 0), 'FAST': (eps[3], 0), 'UNC': (eps[4], 0), 'DEAD': (eps[5], 0), 'MQ': (eps[6], 0), 'TRAP': (eps[7], 0)}
    inv = {v: k for k, v in plant.items()}
    days = [f'2026-11-{d:02d}' for d in range(23, 29)]
    for i in range(ndev + 3):
        robot = i >= ndev
        did = str(uuid.UUID(int=random.getrandbits(128), version=4))
        abil = random.betavariate(5, 3)
        for day in random.sample(days, 3):
            recs = []
            for k in range(60):
                ep = random.choice(eps)
                ti = 0 if random.random() < 0.5 else random.randrange(max(1, cat['eps'][ep]['n']))
                tag = inv.get((ep, ti))
                p = abil
                ms = random.randint(4000, 30000)
                form, code, given, expo = 'c', None, '3', 'N3-01|N3-02'
                if tag == 'EASY':
                    p = 0.99
                if tag == 'HARD':
                    p = 0.1
                if tag == 'TRAP':
                    p = 1 - abil * 0.6
                if tag == 'REV':
                    p = 1 - abil
                if tag == 'FAST':
                    ms = random.randint(400, 1200)
                if tag == 'MQ':
                    form = 'm'
                ok = 1 if random.random() < p else 0
                if robot:
                    ok, ms = random.randint(0, 1), 100
                if not ok:
                    code = random.choice(['N3-01', 'N3-02'])
                    given = random.choice(['5', '7', '9'])
                    if tag == 'TRAP':
                        given = '8' if abil > 0.6 else random.choice(['5', '7'])
                    if tag == 'UNC':
                        form, code, given = 'w', None, random.choice(['24', '24', '24', '42', '7'])
                    if tag == 'DEAD':
                        code = 'N3-01'
                if form == 'm':
                    t = random.choice(['Q', 'Q', 'T', 'G']) if tag == 'MQ' else random.choice(['T', 'G'])
                    given = ('ok:' if ok else 'm:') + t + ':p0p1/b:0'
                    expo = ''
                recs.append([day, ep, ti, 0, random.getrandbits(32), given, ok, code, ms, 0, expo, 'd', k % 10, 0, form, ''])
            p = os.path.join(out, 'raw', day)
            os.makedirs(p, exist_ok=True)
            json.dump({'v': 2, 'did': did, 'day': day, 'recs': recs}, open(os.path.join(p, did + '.json'), 'w'))
    print('심은 것:', {k: f'{v[0]}#{v[1]}' for k, v in plant.items()})


if __name__ == '__main__':
    main(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 120)
