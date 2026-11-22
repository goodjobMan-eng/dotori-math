const { chromium } = require('playwright');
// 자로 재기 조작: 자를 끌면 움직이는지, 0을 맞추고 길이를 넣으면 정답, 0을 안 맞추고 끝 눈금을 읽으면 G2-08. 줄자 읽기 문제. 그림 붙은 문제들(물건 그림이 실제로 뜨는지). 화면 /tmp/t46_*.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const open=(ep,re)=>p.evaluate(([ep,re])=>{ localStorage.clear(); KT.setPref({band:2}); let qq,i; for(i=0;i<G36[ep].length;i++){ qq=G36[ep][i](); if(new RegExp(re).test(String(qq.q))) break; } S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq},{kind:'q',q:qq}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; runAct(); window.__q=qq; return {i,q:qq.q,ans:qq.ansText}; },[ep,re]);
 let r=await open('S6-14','자를 옮겨서'); console.log(JSON.stringify(r)); const L=parseInt(r.ans);
 const box=await p.$('svg.mmeas'); const bb=await box.boundingBox(); const sc=bb.width/ (26*15);
 const st0=await p.evaluate(()=>window.__q.manip.state()); await p.mouse.move(bb.x+80*sc,bb.y+60*sc); await p.mouse.down(); await p.mouse.move(bb.x+80*sc+26*sc*1.5,bb.y+60*sc,{steps:6}); await p.mouse.up(); const st1=await p.evaluate(()=>window.__q.manip.state()); console.log('끌기', st0,'→',st1); if(st0===st1) errs.push('자가 안 움직임');
 await p.screenshot({path:'/tmp/t46_a.png'});
 const m=await p.evaluate((L)=>{ const M=window.__q.manip; for(let k=0;k<L+1;k++) document.getElementById('mplus').click(); return {code:M.mcode(),ok:M.check()}; },L); console.log('L+1 →', JSON.stringify(m)); if(m.code!=='G2-09'&&m.code!=='G2-08') errs.push('코드 없음 '+m.code);
 const m2=await p.evaluate(()=>{ const M=window.__q.manip; document.getElementById('mminus').click(); return {ok:M.check()}; }); if(!m2.ok) errs.push('정답 처리 안 됨');
 r=await open('S6-15','줄자로'); console.log(JSON.stringify(r)); await p.screenshot({path:'/tmp/t46_b.png'});
 const pics=await p.evaluate(()=>{ const bad=[]; const want=[['S6-08','양팔저울'],['S6-08','주전자는'],['S6-08','가득 찬 가 컵'],['S6-14','자의 눈금'],['S6-10','짧은바늘이'],['S5-03','수 배열표에서'],['S6-01','어떤 모양'],['S6-03','비슷한 모양'],['S4-04','우유'],['S4-03','강아지가']]; for(const [ep,re] of want){ let hit=0, vis=0; for(const g of G36[ep]) for(let k=0;k<25;k++){ const q=g(); if(new RegExp(re).test(String(q.q))){ hit++; if(String(q.visual||'').trim()) vis++; } } if(!hit) bad.push(ep+' '+re+' 문제 없음'); else if(vis<hit) bad.push(ep+' '+re+' 그림 '+vis+'/'+hit); } return bad; });
 console.log('그림', JSON.stringify(pics)); if(pics.length) errs.push('그림 없음');
 await open('S6-08','양팔저울'); await p.waitForTimeout(400); const loaded=await p.evaluate(()=>[...document.querySelectorAll('#visual img.objimg')].map(i=>i.naturalWidth)); console.log('저울 그림', JSON.stringify(loaded)); if(!loaded.length||loaded.some(x=>!x)) errs.push('물건 그림 안 뜸'); await p.screenshot({path:'/tmp/t46_c.png'});
 await open('S6-08','주전자는'); await p.waitForTimeout(400); await p.screenshot({path:'/tmp/t46_d.png'});
 console.log('errors',errs); await b.close(); })();
