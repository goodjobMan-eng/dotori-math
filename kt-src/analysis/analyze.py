"""익명 학습 기록으로 "어디를 고쳐야 하는지" 찾는 보고서를 만든다.

사용:  python3 analysis/analyze.py <원본 폴더> [출력 폴더]
  - 원본 폴더: raw/<날짜>/<기기>.json 들이 든 폴더(server/pull_kv.py로 내려받은 것)
  - 출력: report.md(사람이 읽는 보고서), items.csv(틀마다 한 줄), flags.json(고칠 후보 목록, 프로그램이 읽는 꼴)
  - 문제 이름은 analysis/catalog.json에서 읽는다(앱을 고친 뒤 `node analysis/make_catalog.js`로 다시 만든다).

원칙
  1. 수가 모자라면 판단하지 않는다. 틀 하나에 응답 MIN_N건·기기 MIN_DEV대가 안 되면 '자료 부족'으로 둔다.
  2. 사람이 푼 것 같지 않은 기기는 뺀다(대부분 0.3초 안에 답함, 하루 1,500건 초과, 200건 넘는데 정답률 0%·100%).
  3. 보고서는 '고칠 후보'를 보여 줄 뿐이다. 고칠지 말지는 문제를 직접 보고 정한다.

기록 한 줄: [날짜, 편, 틀, 종, 시드, 낸 답, 정답, 오개념 코드, 걸린 ms, 진단, 보기에 나온 코드들, 방식, 세트 안 순서, 다시 나온 문제, 응답 형태(c·w·m), 받은 도움]
"""
import csv, glob, json, os, statistics, sys
from collections import Counter, defaultdict
from itertools import combinations

MIN_N, MIN_DEV = 30, 10          # 틀 하나를 판단하는 데 필요한 응답 수·기기 수
EASY, HARD = 0.95, 0.25          # 정답률이 이보다 높으면 '너무 쉬움', 낮으면 '너무 어려움'
FAST_MS, SLOW_MS = 1500, 90000   # 가운데 시간이 이보다 짧으면 '찍기 의심', 길면 '너무 김'
HERE = os.path.dirname(os.path.abspath(__file__))


def load(src):
    by_dev = defaultdict(list)
    for p in sorted(glob.glob(os.path.join(src, 'raw', '*', '*.json'))):
        try:
            with open(p, encoding='utf-8') as f:
                b = json.load(f)
        except Exception:
            continue
        if b.get('v') != 2 or not isinstance(b.get('recs'), list):
            continue
        for r in b['recs']:
            if isinstance(r, list) and len(r) >= 10:
                by_dev[b['did']].append(r + [''] * (16 - len(r)))
    return by_dev


def clean(by_dev):
    """사람이 푼 것 같지 않은 기기를 뺀다. (남긴 기기, 뺀 수)"""
    kept, dropped = {}, 0
    for did, recs in by_dev.items():
        n = len(recs)
        fast = sum(1 for r in recs if 0 < r[8] < 300) / n
        acc = sum(r[6] for r in recs) / n
        per_day = max(Counter(r[0] for r in recs).values())
        if fast > 0.8 or per_day > 1500 or (n >= 200 and acc in (0, 1)):
            dropped += 1
            continue
        kept[did] = recs
    return kept, dropped


def pct(x):
    return '-' if x is None else f'{round(x * 100)}%'


def main(src, out):
    cat = {'eps': {}, 'mis': {}, 'ladder': None}
    cp = os.path.join(HERE, 'catalog.json')
    if os.path.exists(cp):
        cat = json.load(open(cp, encoding='utf-8'))
    raw = load(src)
    devs, dropped = clean(raw)
    os.makedirs(out, exist_ok=True)
    L = []                                                   # 보고서 줄
    allrecs = [(d, r) for d, rs in devs.items() for r in rs]
    qrecs = [(d, r) for d, r in allrecs if not str(r[1]).startswith('card:')]
    days = sorted({r[0] for _, r in allrecs})
    L += ['# 학습 기록 보고서', '',
          f'- 기간: {days[0] if days else "-"} ~ {days[-1] if days else "-"}',
          f'- 기기(친구) {len(devs)}  /  뺀 기기 {dropped}(사람이 푼 것 같지 않음)',
          f'- 응답 {len(qrecs)}건  /  개념 카드 본 횟수 {len(allrecs) - len(qrecs)}',
          f'- 판단 기준: 틀 하나에 응답 {MIN_N}건·기기 {MIN_DEV}대 이상일 때만 판단', '']
    if not qrecs:
        L.append('기록이 없습니다.')
        open(os.path.join(out, 'report.md'), 'w', encoding='utf-8').write('\n'.join(L))
        return

    # 기기의 실력(그 틀을 뺀 정답률)을 구하려고 기기별 합을 먼저 구한다
    dev_tot = {d: (sum(r[6] for r in rs if not str(r[1]).startswith('card:')), sum(1 for r in rs if not str(r[1]).startswith('card:'))) for d, rs in devs.items()}

    def info(ep, ti):
        e = cat['eps'].get(ep) or {}
        t = (e.get('tpl') or [])
        t = t[ti] if 0 <= ti < len(t) else {}
        return e.get('title', ''), t

    # ---------- 1. 틀마다 ----------
    by_tpl = defaultdict(list)
    for d, r in qrecs:
        by_tpl[(r[1], r[2])].append((d, r))
    rows, flags = [], []
    optrows = []
    for (ep, ti), xs in sorted(by_tpl.items()):
        n = len(xs)
        nd = len({d for d, _ in xs})
        acc = sum(r[6] for _, r in xs) / n
        ms = [r[8] for _, r in xs if r[8] > 0]
        med = statistics.median(ms) if ms else 0
        title, t = info(ep, ti)
        form = Counter(r[14] for _, r in xs).most_common(1)[0][0] or t.get('form', '')
        fl = []
        enough = n >= MIN_N and nd >= MIN_DEV
        # 변별: 실력이 위쪽 절반인 기기와 아래쪽 절반인 기기의 정답률 차이
        disc = None
        ab = []
        for d, r in xs:
            ok, tot = dev_tot[d]
            if tot - 1 >= 20:
                ab.append(((ok - r[6]) / (tot - 1), r[6]))
        if len(ab) >= 20:
            ab.sort()
            h = len(ab) // 2
            lo, hi = ab[:h], ab[-h:]
            disc = sum(v for _, v in hi) / len(hi) - sum(v for _, v in lo) / len(lo)
        wrong = [r for _, r in xs if not r[6]]
        unc = [r for r in wrong if r[7] in (None, 'F', '')]
        # 보기에 나왔는데 아무도 안 고른 오답 코드
        exp, cho = Counter(), Counter()
        for _, r in xs:
            for c in str(r[10] or '').split('|'):
                if c:
                    exp[c] += 1
            if not r[6] and r[7]:
                cho[r[7]] += 1
        dead = [c for c, k in exp.items() if c != 'F' and k >= MIN_N and cho[c] / k < 0.02]
        # 조작: 낸 답 칸 = 'm:방법:차례/상태' 또는 'ok:…'
        tags = Counter()
        tag_ok = defaultdict(lambda: [0, 0])
        if form == 'm':
            for _, r in xs:
                g = str(r[5])
                body = g.split(':', 1)[1] if ':' in g else ''
                tag = body.split(':', 1)[0] if ':' in body else ''
                if tag and len(tag) <= 2 and tag[0] in 'TGSQXN':
                    tags[tag] += 1
                    tag_ok[tag][0] += r[6]
                    tag_ok[tag][1] += 1
        if enough:
            if acc >= EASY and t.get('stage', 1) >= 1:
                fl.append('너무 쉬움')
            if acc <= HARD:
                fl.append('너무 어려움')
            if disc is not None and disc < -0.05:
                fl.append('잘하는 아이가 더 틀림')
            if med and med < FAST_MS and form != 'm':
                fl.append('찍기 의심(너무 빨리 답함)')
            if med > SLOW_MS:
                fl.append('너무 오래 걸림')
            if len(wrong) >= 10 and len(unc) / len(wrong) >= 0.5:
                top = Counter(str(r[5]) for r in unc if r[14] == 'w').most_common(3)
                fl.append('오답의 절반 이상이 오개념으로 안 잡힘' + (' (많이 쓴 오답: ' + ', '.join(f'{g}×{k}' for g, k in top) + ')' if top else ''))
            if dead:
                fl.append('아무도 안 고르는 오답 보기: ' + ', '.join(dead))
            tg = sum(tags.values())
            if tg >= MIN_N:
                q = sum(k for a, k in tags.items() if a[0] == 'Q') / tg
                rr = sum(k for a, k in tags.items() if a.endswith('r')) / tg
                if q >= 0.3:
                    fl.append(f'조작을 거의 안 하고 냄 {pct(q)}(무엇을 할지 모름?)')
                if rr >= 0.4:
                    fl.append(f'되돌리기가 많음 {pct(rr)}(조작 방법이 헷갈림?)')
        # 보기별·실력 띠별 선택 비율(캐나다 온타리오 EQAO 공개 문항 자료의 표와 같은 꼴, 11/24)
        # 실력 띠: 그 틀을 뺀 기기 정답률로 4등분(아래 1 ~ 위 4). 고르기 문제(c)에서만.
        if form == 'c' and len(ab) >= 40:
            band_of = {}
            sab = sorted(((ok - 0) / tot, d) for d, (ok, tot) in dev_tot.items() if tot >= 20)
            for i, (_, d) in enumerate(sab):
                band_of[d] = 1 + min(3, i * 4 // max(1, len(sab)))
            tab = defaultdict(Counter)
            for d, r in xs:
                if d in band_of:
                    tab[band_of[d]][str(r[5])] += 1
            opts = sorted({g for c in tab.values() for g in c})
            right = Counter(str(r[5]) for _, r in xs if r[6]).most_common(1)
            right = right[0][0] if right else ''
            for g in opts:
                if g == right:
                    continue
                lo = tab[1][g] / max(1, sum(tab[1].values())); hi = tab[4][g] / max(1, sum(tab[4].values()))
                if sum(tab[4].values()) >= 10 and hi >= 0.15 and hi >= 2 * lo and hi - lo >= 0.1:
                    fl.append(f'잘하는 아이를 끄는 오답 "{g}" (위 띠 {pct(hi)}, 아래 띠 {pct(lo)}): 글이 모호하거나 정답이 둘일 수 있음')
            b1 = tab[1]; tot1 = sum(b1.values())
            if enough and tot1 >= 20 and len(b1) >= 3:
                sh = [k / tot1 for k in b1.values()]
                if max(sh) - min(sh) < 0.15:
                    fl.append('아래 띠는 보기를 고르게 고름(찍기)')
            optrows.append([ep, ti, title] + [';'.join(f'{g}:{tab[b][g]}' for g in opts) for b in (1, 2, 3, 4)] + [right])
        rows.append([ep, ti, title, t.get('stage', ''), form, n, nd, round(acc, 3), round(med), '' if disc is None else round(disc, 3), len(wrong), len(unc), ' / '.join(fl), t.get('sample', '')])
        if fl:
            flags.append({'ep': ep, 'ti': ti, 'title': title, 'n': n, 'acc': round(acc, 3), 'flags': fl, 'sample': t.get('sample', ''), 'tags': dict(tags), 'tag_acc': {a: round(v[0] / v[1], 2) for a, v in tag_ok.items() if v[1] >= 10}})
    with open(os.path.join(out, 'items.csv'), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['편', '틀', '편 이름', '단계', '응답 형태', '응답 수', '기기 수', '정답률', '가운데 시간(ms)', '변별(위−아래)', '오답 수', '안 잡힌 오답', '고칠 후보', '문제 예'])
        w.writerows(rows)
    with open(os.path.join(out, 'options.csv'), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['편', '틀', '편 이름', '실력 띠1(아래) 보기:수', '띠2', '띠3', '띠4(위)', '정답'])
        w.writerows(optrows)
    judged = sum(1 for r in rows if r[5] >= MIN_N and r[6] >= MIN_DEV)
    flags.sort(key=lambda x: (-len(x['flags']), -x['n']))
    L += ['## 1. 고칠 문제 후보', '', f'틀 {len(rows)}개에 기록이 있고, 그중 {judged}개가 판단 기준을 넘었습니다. 후보 {len(flags)}개.', '']
    if flags:
        L += ['| 편 | 틀 | 문제 예 | 응답 | 정답률 | 까닭 |', '|---|---|---|---|---|---|']
        for x in flags[:60]:
            L.append(f"| {x['ep']} {x['title']} | {x['ti']} | {x['sample'][:36]} | {x['n']} | {pct(x['acc'])} | {'<br>'.join(x['flags'])} |")
        if len(flags) > 60:
            L.append(f'\n(나머지 {len(flags) - 60}개는 flags.json)')
    else:
        L.append('아직 후보가 없습니다(자료가 모자라거나 문제가 없음).')
    L.append('')

    # ---------- 2. 조작한 방법 ----------
    L += ['## 2. 조작 문제를 어떻게 풀었나', '', 'T 번갈아 하나씩 · G 몰아서(묶어서) · S 한 가지만 · Q 거의 안 만짐 · X 바꾸기 함 · N 바꾸기 안 함 · 뒤의 r = 되돌리기 많음', '']
    mt = [x for x in by_tpl.items() if Counter(r[14] for _, r in x[1]).most_common(1)[0][0] == 'm']
    line = []
    for (ep, ti), xs in mt:
        tg = Counter()
        okc = defaultdict(lambda: [0, 0])
        for _, r in xs:
            g = str(r[5])
            body = g.split(':', 1)[1] if ':' in g else ''
            tag = body.split(':', 1)[0] if ':' in body else ''
            if tag and len(tag) <= 2 and tag[0] in 'TGSQXN':
                tg[tag] += 1
                okc[tag][0] += r[6]
                okc[tag][1] += 1
        tot = sum(tg.values())
        if tot >= MIN_N:
            title, t = info(ep, ti)
            line.append((tot, f"| {ep} {title} | {ti} | {t.get('sample', '')[:30]} | {tot} | " + ' · '.join(f'{a} {pct(k / tot)}(정답 {pct(okc[a][0] / okc[a][1])})' for a, k in tg.most_common()) + ' |'))
    if line:
        L += ['| 편 | 틀 | 문제 예 | 응답 | 방법별 비율(그 방법의 정답률) |', '|---|---|---|---|---|'] + [s for _, s in sorted(line, reverse=True)[:40]]
        L += ['', '읽는 법: 한 방법의 정답률이 다른 방법보다 뚜렷이 낮으면, 그 방법을 쓴 아이에게 다른 도움말이나 다음 문제를 주는 갈림을 만들 수 있습니다.']
    else:
        L.append('아직 자료가 모자랍니다.')
    L.append('')

    # ---------- 3. 오개념 ----------
    L += ['## 3. 오개념', '']
    code_dev = defaultdict(set)
    code_days = defaultdict(lambda: defaultdict(set))
    for d, r in qrecs:
        c = r[7]
        if c and c != 'F' and not r[6]:
            code_dev[c].add(d)
            code_days[c][d].add(r[0])
    if code_dev:
        L += ['| 코드 | 이름 | 보인 기기 | 다른 날에도 다시 보인 비율 |', '|---|---|---|---|']
        for c, ds in sorted(code_dev.items(), key=lambda x: -len(x[1]))[:25]:
            again = sum(1 for d in ds if len(code_days[c][d]) >= 2) / len(ds)
            L.append(f"| {c} | {cat['mis'].get(c, '')} | {len(ds)} | {pct(again) if len(ds) >= MIN_DEV else '자료 부족'} |")
        L += ['', '다시 보인 비율이 높은 코드 = 한 번 짚어 줘도 안 고쳐지는 오개념. 도움말·조작 문제를 먼저 손볼 곳입니다.', '']
        # 같이 나타나는 오개념
        dev_codes = defaultdict(set)
        for c, ds in code_dev.items():
            for d in ds:
                dev_codes[d].add(c)
        nd = len(devs)
        pairs = []
        for a, b in combinations(sorted(code_dev), 2):
            both = len(code_dev[a] & code_dev[b])
            if both >= 8:
                lift = both * nd / (len(code_dev[a]) * len(code_dev[b]))
                if lift >= 2:
                    pairs.append((lift, both, a, b))
        if pairs:
            L += ['같은 아이에게 함께 나타나는 오개념(우연보다 2배 넘게 자주):', '']
            for lift, both, a, b in sorted(pairs, reverse=True)[:15]:
                L.append(f"- {a} {cat['mis'].get(a, '')}  +  {b} {cat['mis'].get(b, '')}  — {both}명, {lift:.1f}배")
            L += ['', '뿌리가 같은 오개념일 수 있습니다. 한쪽이 보이면 다른 쪽도 확인하는 문제를 내는 규칙을 생각해 볼 수 있습니다.', '']
    else:
        L += ['아직 자료가 없습니다.', '']

    # ---------- 4. 배우는 차례 ----------
    L += ['## 4. 배우는 차례(앞 내용을 알면 뒤 내용을 더 잘하나)', '']
    kc_of = {ep: e.get('kc') for ep, e in cat['eps'].items()}
    dk = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    for d, r in qrecs:
        k = kc_of.get(r[1])
        if k:
            dk[d][k][0] += r[6]
            dk[d][k][1] += 1
    seen = False
    if cat.get('ladder'):
        tbl = []
        for strand, ks in cat['ladder'].items():
            for a, b in zip(ks, ks[1:]):
                hi, lo = [], []
                for d, m in dk.items():
                    if m[a][1] >= 5 and m[b][1] >= 5:
                        (hi if m[a][0] / m[a][1] >= 0.8 else lo if m[a][0] / m[a][1] < 0.6 else []).append(m[b][0] / m[b][1])
                if len(hi) >= MIN_DEV and len(lo) >= MIN_DEV:
                    gap = statistics.mean(hi) - statistics.mean(lo)
                    tbl.append(f"| {a} → {b} | {len(hi)} / {len(lo)} | {pct(statistics.mean(hi))} / {pct(statistics.mean(lo))} | {'차례 의심' if gap < 0.05 else ''} |")
        if tbl:
            seen = True
            L += ['| 앞 → 뒤 | 앞을 잘한 기기 / 못한 기기 | 뒤 내용 정답률(잘한 / 못한) | |', '|---|---|---|---|'] + tbl
            L += ['', "'차례 의심' = 앞 내용을 잘하든 못하든 뒤 내용 성적이 비슷함. 선수 관계가 아니거나, 앞 내용 문제가 그 개념을 제대로 재지 못한다는 뜻입니다."]
    if not seen:
        L.append('아직 자료가 모자랍니다(두 내용을 모두 5문제 넘게 푼 기기가 양쪽에 10대씩 필요).')
    L.append('')

    # ---------- 5. 도움과 기억 ----------
    L += ['## 5. 도움의 효과와 기억', '']

    def acc_of(rs):
        return (sum(r[6] for r in rs) / len(rs), len(rs)) if rs else (None, 0)
    eased = acc_of([r for _, r in qrecs if 'e' in str(r[15])])
    again = acc_of([r for _, r in qrecs if r[13] == 1])
    first = acc_of([r for _, r in qrecs if r[13] == 0 and r[11] != 'r'])
    review = acc_of([r for _, r in qrecs if r[11] == 'r'])
    L += [f'- 새로 만난 문제 정답률: {pct(first[0])} ({first[1]}건)',
          f'- 틀려서 다시 나온 문제 정답률: {pct(again[0])} ({again[1]}건) — 낮으면 도움말이 통하지 않는 것',
          f'- 선수 내용으로 내려 준 문제 정답률: {pct(eased[0])} ({eased[1]}건) — 낮으면 내려간 곳도 어려운 것',
          f'- 복습 문제 정답률: {pct(review[0])} ({review[1]}건)']
    # 며칠 뒤: 같은 기기·같은 편, 첫날과 그 뒤 날
    de = defaultdict(lambda: defaultdict(list))
    for d, r in qrecs:
        de[(d, r[1])][r[0]].append(r[6])
    f0, f1 = [], []
    for _, m in de.items():
        ds = sorted(m)
        if len(ds) >= 2 and len(m[ds[0]]) >= 3:
            later = [v for x in ds[1:] for v in m[x]]
            if len(later) >= 2:
                f0.append(sum(m[ds[0]]) / len(m[ds[0]]))
                f1.append(sum(later) / len(later))
    if len(f0) >= MIN_N:
        L.append(f'- 같은 편을 다른 날 다시 풀었을 때: 첫날 {pct(statistics.mean(f0))} → 그 뒤 {pct(statistics.mean(f1))} ({len(f0)}쌍)')
    else:
        L.append('- 며칠 뒤 기억: 자료 부족')
    L.append('')

    # ---------- 6. 단계별 ----------
    L += ['## 6. 단계별 정답률', '']
    names = ['만져 보기', '기본 익히기', '이야기 문제', '도전 문제']
    st = defaultdict(list)
    for (ep, ti), xs in by_tpl.items():
        _, t = info(ep, ti)
        if 'stage' in t:
            st[t['stage']] += [r[6] for _, r in xs]
    for s in sorted(st):
        L.append(f'- {names[s] if 0 <= s < 4 else s}: {pct(sum(st[s]) / len(st[s]))} ({len(st[s])}건)')
    L += ['', '단계가 올라갈수록 정답률이 조금씩 내려가는 것이 자연스럽습니다. 거꾸로면 단계 가르기나 문제 난이도를 다시 봅니다.', '']

    # ---------- 7. 난이도(실력을 고려한 Rasch 추정) ----------
    L += difficulty(qrecs, by_tpl, info, out)

    open(os.path.join(out, 'report.md'), 'w', encoding='utf-8').write('\n'.join(L))
    json.dump(flags, open(os.path.join(out, 'flags.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'기기 {len(devs)}(뺀 것 {dropped}), 응답 {len(qrecs)}, 판단한 틀 {judged}, 고칠 후보 {len(flags)} → {out}/report.md')



def difficulty(qrecs, by_tpl, info, out):
    """틀마다 난이도를 '실력을 고려해서' 잰다(라쉬 모형, 1모수 IRT).
    그냥 정답률은 '누가 풀었나'에 따라 흔들린다(잘하는 아이가 많이 푼 틀은 쉬워 보임). 그래서
    P(맞힘) = 1 / (1 + exp(-(실력 - 난이도))) 로 기기 실력과 틀 난이도를 함께 맞춘다.
    - 처음 만난 문제의 첫 답만 쓴다(다시 나온 문제·복습 제외). 응답 MIN_N건·기기 MIN_DEV대가 안 되는 틀은 '자료 부족'.
    - 난이도 0 = 평균 실력의 아이가 반쯤 맞힘. +1이면 더 어려움. 다섯 단계(1 아주 쉬움 ~ 5 아주 어려움)로도 적는다.
    - 출력 difficulty.csv, 보고서 7절(편 안에서 단계 순서와 난이도가 거꾸로인 곳 포함)."""
    import math
    rs = [(d, (r[1], r[2]), int(r[6])) for d, r in qrecs if r[13] == 0 and r[11] != 'r']
    cnt, devs_of = Counter(k for _, k, _ in rs), defaultdict(set)
    for d, k, _ in rs:
        devs_of[k].add(d)
    keep = {k for k in cnt if cnt[k] >= MIN_N and len(devs_of[k]) >= MIN_DEV}
    rs = [x for x in rs if x[1] in keep]
    L = ['## 7. 난이도(실력을 고려한 추정)', '']
    if len(keep) < 3:
        L += ['자료 부족: 응답이 충분한 틀이 3개 미만입니다.', '']
        return L
    th, b = defaultdict(float), {k: 0.0 for k in keep}
    E = lambda d, k: 1 / (1 + math.exp(-(th[d] - b[k])))
    clip = lambda x: max(-1.0, min(1.0, x))
    for it in range(100):                                 # 번갈아 맞추기(JML): 실력 → 난이도 순서로, 한 번에 1 이하만 움직임
        g, h = defaultdict(float), defaultdict(float)
        for d, k, y in rs:
            q = E(d, k); g[d] += y - q; h[d] += q * (1 - q)
        for d in g:
            th[d] = max(-6, min(6, th[d] + clip(g[d] / (h[d] + 0.3))))
        g, h = defaultdict(float), defaultdict(float)
        for d, k, y in rs:
            q = E(d, k); g[k] += q - y; h[k] += q * (1 - q)
        step = 0
        for k in g:
            dx = clip(g[k] / (h[k] + 0.3)); step = max(step, abs(dx))
            b[k] = max(-6, min(6, b[k] + dx))
        m = statistics.mean(b.values())
        for k in b:
            b[k] -= m
        for d in th:
            th[d] -= m
        if step < 1e-3:
            break
    lv = lambda x: 1 if x < -1.5 else 2 if x < -0.5 else 3 if x <= 0.5 else 4 if x <= 1.5 else 5
    names = ['아주 쉬움', '쉬움', '보통', '어려움', '아주 어려움']
    rows = []
    for k in sorted(b, key=lambda k: b[k]):
        title, t = info(*k)
        acc = statistics.mean(y for _, kk, y in rs if kk == k)
        rows.append([k[0], k[1], title, t.get('stage', ''), t.get('form', ''), cnt[k], round(acc, 3), round(b[k], 2), lv(b[k])])
    with open(os.path.join(out, 'difficulty.csv'), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['편', '틀', '편 이름', '단계', '형태', '첫 응답 수', '정답률', '난이도(로짓)', '난이도 1~5'])
        w.writerows(rows)
    dist = Counter(r[8] for r in rows)
    L += [f'- 판단한 틀 {len(rows)}개: ' + ', '.join(f'{names[i-1]} {dist.get(i, 0)}' for i in range(1, 6)),
          '- 정답률과 다를 수 있습니다: 잘하는 아이가 많이 푼 틀은 정답률이 높아도 난이도가 높게 나옵니다.', '',
          '가장 어려운 틀 10개', '']
    L += [f'- {r[0]}#{r[1]} {r[2]} — 난이도 {r[7]:+.2f}({names[r[8]-1]}), 정답률 {pct(r[6])}, {r[5]}건' for r in rows[::-1][:10]]
    L += ['', '가장 쉬운 틀 10개', '']
    L += [f'- {r[0]}#{r[1]} {r[2]} — 난이도 {r[7]:+.2f}({names[r[8]-1]}), 정답률 {pct(r[6])}, {r[5]}건' for r in rows[:10]]
    inv = []
    by_ep = defaultdict(list)
    for r in rows:
        if r[3] != '':
            by_ep[r[0]].append(r)
    for ep, xs in by_ep.items():                         # 앞 단계 틀이 뒤 단계 틀보다 1 이상 어려우면 거꾸로
        for a in xs:
            later = [c for c in xs if a[3] < c[3] and a[7] - c[7] >= 1.0]
            if later:
                inv.append(f'- {ep} {a[2]}: {a[3]}단계 #{a[1]}({a[7]:+.2f})가 뒤 단계 틀 {len(later)}개보다 어려움 '
                           f'(예: {later[0][3]}단계 #{later[0][1]} {later[0][7]:+.2f})')
    L += ['', '단계 순서와 난이도가 거꾸로인 곳(앞 단계가 1 이상 더 어려움)', '']
    L += inv[:30] if inv else ['- 없음']
    L.append('')
    return L

if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, 'out'))
