// 문제 틀 목록 만들기: 앱(out/index.html)을 열어 편·틀마다 이름·단계·응답 형태·보기 문항 예·오개념 코드를 뽑아 analysis/catalog.json에 쓴다.
// 통계 보고서(analyze.py)가 "어느 편의 몇 번째 틀"을 사람이 읽을 수 있는 글로 바꿀 때 쓴다. 앱을 고친 뒤(틀을 더한 뒤) 다시 돌린다.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage(); await p.goto('file://' + path.resolve(__dirname, '..', 'out', 'index.html')); await p.waitForTimeout(1500);
  const cat = await p.evaluate(() => { const strip = s => String(s || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const eps = {}, mis = {}; try { for (const [c, v] of Object.entries(KT.MIS || {})) mis[c] = Array.isArray(v) ? v[0] : String(v && v.name || v); } catch (e) {}
    let ladder = null; const kc = {}; try { ladder = window.__ktMap.LADDER; for (const ep of Object.keys(G36)) kc[ep] = window.__ktMap.epKC(ep); } catch (e) {}
    for (const ep of Object.keys(G36)) { const T = []; G36[ep].forEach((g, i) => { const st = {}, fm = {}, codes = new Set(); let sample = '', ans = '';
        for (let t = 0; t < 5; t++) { let q; try { q = typeof tagQ === 'function' ? tagQ(ep, i, g()) : g(); } catch (e) { continue; } if (!q) continue;
          const s = window.ktStage ? window.ktStage(q) : 1; st[s] = (st[s] || 0) + 1; const f = (q.manip || q.onMount) ? 'm' : q.write ? 'w' : 'c'; fm[f] = (fm[f] || 0) + 1;
          if (!sample) { sample = strip(q.q).slice(0, 70); ans = strip(q.ansText || q.ans).slice(0, 30); }
          try { for (const c of Object.values(q.mis || {})) if (c) codes.add(c); } catch (e) {} try { for (const c of (q.codes || [])) if (c) codes.add(c); } catch (e) {} }
        const top = o => Object.keys(o).sort((a, b) => o[b] - o[a])[0]; T.push({ i, stage: +(top(st) ?? 1), form: top(fm) || 'c', sample, ans, codes: [...codes] }); });
      let title = ''; try { title = (EPS36[ep] && EPS36[ep][0]) || ''; } catch (e) {} eps[ep] = { title, kc: kc[ep] || null, n: T.length, tpl: T }; }
    return { made: new Date().toISOString().slice(0, 10), eps, mis, ladder }; });
  fs.writeFileSync(path.join(__dirname, 'catalog.json'), JSON.stringify(cat)); console.log('편', Object.keys(cat.eps).length, '틀', Object.values(cat.eps).reduce((a, e) => a + e.n, 0), '오개념', Object.keys(cat.mis).length, '사다리', cat.ladder ? Object.keys(cat.ladder).length : '없음'); await b.close(); })();
