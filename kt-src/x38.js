const { chromium } = require('playwright');
// 쓰기형 틀 표본(눈 검산용): node x38.js 접두어(S6 등) → 틀마다 1개: 문제 ∥ 정답 ∥ 풀이 ∥ 예상 오답
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate((pre)=>{ const o=[]; const pl=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/[​]/g,'').replace(/\s+/g,' ').trim(); for(const e of Object.keys(G36)){ if(!e.startsWith(pre)) continue; G36[e].forEach((g,i)=>{ let q; try{ q=g(); }catch(x){ return; } if(!q||q.manip||q.onMount||(q.opts&&q.opts.length)) return; const eq=/=/.test(pl(q.ansText)); o.push(e+'#'+i+' '+pl(q.q).slice(0,74)+(pl(q.q).length<30?' ['+pl(q.visual).slice(0,50)+']':'')+' ∥ '+pl(q.ans)+' ∥ '+pl(q.ansText).slice(0,44)+' ∥ '+Object.entries(q.mis||{}).map(x=>x.join(':')).join(',')); }); } return o; },process.argv[2]||'S6');
 console.log(r.join('\n')); await b.close(); })();
