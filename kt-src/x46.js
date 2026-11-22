const { chromium } = require('playwright');
// 그림이 있어야 할 상황(저울·그릇·시계·도형·그래프 등)을 글로만 묻는 틀 찾기 → x46_out.txt
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const KW={저울:/저울/,무게:/무게|무겁|가볍/,길이:/길이|길다|짧|키가|더 긴/,들이:/들이|그릇|컵|물을|병/,시계:/시계|시각|바늘/,도형:/삼각형|사각형|오각형|육각형|원|직사각형|정사각형|마름모|평행사변형|사다리꼴|각기둥|각뿔|원기둥|원뿔|구|직육면체|정육면체|꼭짓점|모서리|면/,각:/각도|직각|예각|둔각|°/,그래프:/그래프|표/,수직선:/수직선/,쌓기:/쌓기나무/,모양:/모양|무늬/,위치:/왼쪽|오른쪽|위쪽|아래쪽|앞|뒤|사이/,색칠:/색칠|칠한/};
   const out={}; const ALL={}; for(const ep of Object.keys(G36)) ALL[ep]=G36[ep];
   for(const ep of Object.keys(ALL)) ALL[ep].forEach((g,i)=>{ let none=0, tot=0, s=''; for(let k=0;k<6;k++){ let q; try{ q=g(); }catch(e){ return; } if(!q) continue; tot++; const v=String(q.visual||'').trim(); if(!v&&!q.manip&&!q.onMount){ none++; s=String(q.q).replace(/<[^>]+>/g,''); } } if(!none) return;
     const hit=Object.keys(KW).filter(k=>KW[k].test(s)); if(!hit.length) return; const u=UNITS36.find(u=>u.eps.includes(ep)); (out[hit[0]]=out[hit[0]]||[]).push(`${ep}#${i} [${u?u.grade:''}] ${s.slice(0,70)}`); });
   return out; });
 const lines=[]; let n=0; for(const k of Object.keys(r)){ lines.push(`## ${k} ${r[k].length}`); r[k].forEach(x=>lines.push(x)); n+=r[k].length; }
 require('fs').writeFileSync('x46_out.txt',lines.join('\n')); console.log('그림 없는 상황 문제 틀', n); for(const k of Object.keys(r)) console.log(k, r[k].length); await b.close(); })();
