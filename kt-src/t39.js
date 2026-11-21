const { chromium } = require('playwright');
// 개념 카드: 카드마다 300번 만들어 보기(보기 3개·정답 포함·깨진 값 없음), 실제 화면에서 3장 넘기기(오답 → 한마디 → 정답 → 문제로), 영상 없는 조각이면 pieceVideo가 카드를 돌려주는지. 화면 /tmp/t39.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const bad=[], ids=Object.keys(KCARDS); for(const c of ids) for(let k=0;k<300;k++){ let C; try{ C=KCARDS[c](); }catch(e){ bad.push(c+' '+e.message); break; } if(C.p.length!==3) bad.push(c+' 장 수'); const L=C.p[2], o=L.opts.map(String); if(o.length!==3||new Set(o).size!==3) bad.push(c+' 보기 '+o); if(!o.includes(String(L.ans))) bad.push(c+' 정답 없음'); const txt=JSON.stringify(C); if(/NaN|undefined|Infinity|-\d/.test(txt.replace(/<[^>]+>/g,'').replace(/[a-z-]+:[^;"]+;?/g,''))) bad.push(c+' 깨진 값 '+txt.replace(/<[^>]+>/g,'').slice(0,160)); }
   return {ids,bad:[...new Set(bad)].slice(0,12)}; });
 console.log(JSON.stringify(r)); if(r.bad.length) errs.push('bad');
 const shots=[], kinds={};
 for(const c of r.ids){ await p.evaluate((c)=>{ localStorage.clear(); if(['C01','C02','C03','C04','C05','C07'].includes(c)) localStorage.setItem('dotori-input','hand'); KT.setPref({band:3}); const q=G36['S2-02'][0](); q._ep='S2-02'; S={mode:'ep36',retry:true,ep:'S2-02',ui:UNITS36.findIndex(u=>u.eps.includes('S2-02')),ch:0,steps:[{kind:'card',c,key:'card:'+c,label:'개념 카드'},{kind:'acts'}],si:0,acts:[{kind:'q',q}],i:0,results:[],tries:0,counted:0,title:'오늘의 문제'}; step(); },c);
   await p.click('#next'); await p.waitForTimeout(120); await p.screenshot({path:'/tmp/t39_'+c+'.png'}); shots.push(c); await p.click('#next'); await p.waitForTimeout(120);
   const info=await p.evaluate(()=>({n:document.querySelectorAll('.kc-opts button').length,hw:document.querySelectorAll('#kchw canvas').length,nextShown:document.getElementById('next').style.display!=='none'})); kinds[c]=info.hw?'쓰기':'고르기';
   if(info.nextShown||(!info.n&&!info.hw)) errs.push(c+' 3장 화면 '+JSON.stringify(info));
   if(info.n){ // 오답 → 한마디 + '다른 수로 다시'(넘어가기 단추는 안 보임) → 다시 → 정답 → 문제로
     const pick=async(right)=>{ await p.evaluate((right)=>{ const C=window.__kcAns; },right); };
     let v=await p.evaluate(()=>[...document.querySelectorAll('.kc-opts button')].map(x=>x.dataset.v).filter(x=>x!==window.__kcAns)); await p.click(`.kc-opts button[data-v="${v[0]}"]`); await p.waitForTimeout(60);
     let s=await p.evaluate(()=>({why:document.getElementById('kcwhy').textContent,next:document.getElementById('next').style.display!=='none',re:document.getElementById('kcre').style.display!=='none'}));
     let guard=0; while(!s.next&&guard++<12){ if(!/💡/.test(s.why)||!s.re) { errs.push(c+' 오답 처리 '+JSON.stringify(s)); break; } await p.click('#kcre'); await p.waitForTimeout(80); if(!(await p.$('.kc-opts'))){ await p.click('#next'); await p.waitForTimeout(60); await p.click('#next'); await p.waitForTimeout(60); }
       v=await p.evaluate(()=>{ const bs=[...document.querySelectorAll('.kc-opts button')].map(x=>x.dataset.v); const a=window.__kcAns; return [a,...bs.filter(x=>x!==a)]; }); await p.click(`.kc-opts button[data-v="${v[0]}"]`); await p.waitForTimeout(60);
       s=await p.evaluate(()=>({why:document.getElementById('kcwhy').textContent,next:document.getElementById('next').style.display!=='none',re:document.getElementById('kcre').style.display!=='none'})); }
     if(!s.next) errs.push(c+' 정답으로 못 넘어감'); else { await p.click('#next'); await p.waitForTimeout(200); const onQ=await p.evaluate(()=>!!document.getElementById('visual')||!!document.querySelector('.opts')); if(!onQ) errs.push(c+' 문제로 안 넘어감'); } }
   else { await p.screenshot({path:'/tmp/t39_hw_'+c+'.png'}); await p.click('#kcok'); await p.waitForTimeout(60); const w=await p.evaluate(()=>document.getElementById('kcwhy').textContent); if(!/써 주세요/.test(w)) errs.push(c+' 빈 손글씨를 막지 않음'); } }
 console.log('마지막 장', JSON.stringify(kinds));
 console.log('errors',errs); await b.close();
 require('fs').writeFileSync('/tmp/t39_list.txt',shots.join(' ')); })();
