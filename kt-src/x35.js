const { chromium } = require('playwright');
// 쓰기형 자연수 식 문제의 정답 검산: 문제 글이 순수한 식이면 직접 계산해 정답과 비교한다(틀마다 30번).
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); p.on('pageerror',e=>console.log('페이지 오류',e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const bad=[]; let n=0; const pl=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/,/g,'').replace(/\s+/g,' ').trim();
  const ev=(t)=>{ let i=0; const ap=(x,o,y)=>o==='+'?x+y:o==='−'?x-y:o==='×'?x*y:x/y, prim=()=>{ if(t[i]==='('){ i++; const v=sum(); i++; return v; } return +t[i++]; }, term=()=>{ let v=prim(); while(t[i]==='×'||t[i]==='÷'){ const o=t[i++]; v=ap(v,o,prim()); } return v; }, sum=()=>{ let v=term(); while(t[i]==='+'||t[i]==='−'){ const o=t[i++]; v=ap(v,o,term()); } return v; }; return sum(); };
  const scan=(e,i,g)=>{ for(let k=0;k<30;k++){ let q; try{ q=g(); }catch(x){ return; } if(!q||(q.opts&&q.opts.length)||q.manip||q.onMount) return; const Q=pl(q.q).replace(/ = \?$/,''); if(!/^[\d\s.+−×÷()]+$/.test(Q)||!/[+−×÷]/.test(Q)) continue; const A=String(q.ans); if(!/^\d+$/.test(A)) continue; const v=ev(Q.match(/\d+(?:\.\d+)?|[+−×÷()]/g)); n++; const at=String(q.ansText||''); const dec=/\./.test(Q)||!Number.isInteger(v);
    const ok=dec?(String(+v.toFixed(6)).replace('.','')===A.replace(/^0+(?=\d)/,'')||String(+v.toFixed(6)).replace('.','')===A||/…/.test(at)):(String(v)===A||/…/.test(at)); if(!ok){ bad.push(e+'#'+i+' '+Q+' ⇒ 계산 '+v+' / 정답 '+A+' / '+at); break; } } };
  for(const e of Object.keys(G36)) G36[e].forEach((g,i)=>scan(e,i,g)); for(const e of Object.keys(G)) G[e].forEach((g,i)=>scan(e,i,g)); return {n,bad}; });
 console.log(JSON.stringify(r,null,1)); await b.close(); })();
