const { chromium } = require('playwright');
// 음수 검사(초등은 자연수·분수·소수 범위, 음수 없음): 모든 틀을 200번씩 뽑아 정답·보기·예상 오답·풀이·문제·힌트·읽어 주는 글에 음수가 있는지 본다.
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); p.on('pageerror',e=>console.log('페이지 오류',e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const bad={}; let n=0; const pl=h=>String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/[​]/g,'').replace(/\s+/g,' ').trim();
  const negVal=s=>/^[-−]\s*\d/.test(String(s).trim());                       // 값 자체가 음수(보기·정답·예상 오답)
  const negTxt=s=>/(=|은|는|이|가|면|,|\()\s*[-−]\d/.test(s)||/^[-−]\d/.test(s)||/영하|마이너스|음수/.test(s);   // 글 속 음수
  const scan=(e,i,g)=>{ for(let k=0;k<600;k++){ let q; try{ q=g(); }catch(x){ return; } if(!q||typeof q!=='object') return; n++; const id=e+'#'+i; if(bad[id]) return; const flag=(w,s)=>{ bad[id]=w+' ∥ '+pl(q.q).slice(0,50)+' ∥ '+String(s).slice(0,60); };
    if(typeof q.ans==='number'&&q.ans<0||negVal(pl(q.ans))) return flag('정답',q.ans); for(const o of (q.opts||[])){ const s=pl(typeof o==='object'?(o.v??o.label):o); if(negVal(s)) return flag('보기',s); }
    for(const m of Object.keys(q.mis||{})) if(negVal(m)) return flag('예상 오답',m); for(const f of ['ansText','q','speech','hint','ansSpeech','visual']){ const s=pl(q[f]); if(negTxt(s)) return flag(f,s.match(/.{0,25}(=|은|는|이|가|면|,|\(|^)\s*[-−]\d.{0,10}|영하|마이너스|음수/)?.[0]||s); } } };
  for(const e of Object.keys(G36)) G36[e].forEach((g,i)=>scan(e,i,g)); for(const e of Object.keys(G)) G[e].forEach((g,i)=>scan(e,i,g)); return {n,bad}; });
 const ks=Object.keys(r.bad); console.log('뽑은 문제',r.n,'| 음수가 나온 틀',ks.length); ks.forEach(k=>console.log(k+' | '+r.bad[k])); await b.close(); })();
