const { chromium } = require('playwright');
// 교수님 11/22 지적: 덧셈표·곱셈표 문제에 표가 보이는지, '어른과 함께 읽어요'가 없는지, '우리 강아지' 칭찬은 할머니 그림인지
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const bad=[]; let n=0; const all=Object.assign({},G); for(const ep of Object.keys(G36)) all[ep]=G36[ep];
   for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>{ for(let k=0;k<30;k++){ let q; try{ q=g(); }catch(e){ return; } if(!q) continue; const t=String(q.q).replace(/<[^>]+>/g,''); if(/덧셈표|곱셈표/.test(t)){ n++; if(!/<table/.test(String(q.visual||''))&&!q.manip&&!q.onMount) bad.push(ep+'#'+i+' '+t.slice(0,30)); } } });
   return {n,bad:[...new Set(bad)]}; });
 console.log('표 문제', r.n, '표 없음', JSON.stringify(r.bad)); if(r.bad.length) errs.push('표 없는 덧셈표·곱셈표 문제');
 const one=await p.evaluate(()=>{ localStorage.clear(); localStorage.setItem('dotori-input','pad'); KT.setPref({band:2}); const ep='S5-04'; let qq; for(let k=0;k<300;k++){ const i=Math.floor(Math.random()*G36[ep].length); qq=G36[ep][i](); if(/오른쪽으로 한 칸/.test(qq.q)) break; }
   S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),chars:(UNITS36[UNITS36.findIndex(u=>u.eps.includes(ep))]||{}).chars||S&&S.chars,acts:[{kind:'q',q:qq},{kind:'q',q:qq}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; runAct(); return {q:qq.q,table:!!document.querySelector('#visual table'),adult:document.body.innerText.includes('어른과 함께')}; });
 console.log(JSON.stringify(one)); if(!one.table) errs.push('덧셈표 문제 화면에 표 없음'); if(one.adult) errs.push('어른과 함께 읽어요가 남음');
 await p.screenshot({path:'/tmp/t43a.png'});
 // 칭찬: 할머니 말이면 할머니 그림
 let ok=0, seen=0; for(let k=0;k<30&&seen<3;k++){ const s=await p.evaluate(()=>{ S.i=0; S.tries=0; S.results=[]; runAct(); const q=S.acts[0].q; const b=[...document.querySelectorAll('.opt')].find(x=>String(x.dataset.v)===String(q.ans)); b.click(); const m=document.querySelector('#fb .msg'), img=document.querySelector('#fb .fb img'); return {msg:m?m.textContent:'',alt:img?img.alt:'',src:img?img.src.slice(0,40):''}; });
   if(/우리 강아지/.test(s.msg)){ seen++; if(s.alt==='할머니') ok++; else errs.push('강아지 칭찬인데 '+s.alt); if(seen===1) await p.screenshot({path:'/tmp/t43b.png'}); } }
 console.log('강아지 칭찬', seen, '할머니', ok);
 console.log('errors',errs); await b.close(); })();
