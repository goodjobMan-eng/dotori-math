const { chromium } = require('playwright');
// 식을 미리 주는 틀 찾기: 문제 글에는 연산 기호가 없는데(문장제·도형) 그림 칸에 '수 연산 수 =' 식이 보이는 쓰기형·객관식 틀.
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const o=[]; const pl=h=>String(h||'').replace(/<svg[\s\S]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); const scan=(e,i,g)=>{ let q; try{ q=g(); }catch(x){ return; } if(!q||q.manip||q.onMount) return; const Q=pl(q.q), V=pl(q.visual); if(/[+−×÷]/.test(Q)||/식|계산|□|빈칸|어림|검산|세로셈/.test(Q)) return; if(/\d\s*[+−×÷]\s*[\d(]/.test(V)&&/=/.test(V)) o.push(e+'#'+i+' '+(q.opts&&q.opts.length?'객':'쓰')+' '+Q.slice(0,56)+' ∥ '+V.slice(0,60)); }; for(const e of Object.keys(G36)) G36[e].forEach((g,i)=>scan(e,i,g)); for(const e of Object.keys(G)) G[e].forEach((g,i)=>scan(e,i,g)); return o; });
 console.log(r.length); console.log(r.join('\n')); await b.close(); })();
