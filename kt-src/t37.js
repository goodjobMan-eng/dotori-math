const { chromium } = require('playwright');
// 풀이 단계 빈칸(3-38): 칸 수 = 답 열쇠 길이, 열쇠 길이, 실제 화면에서 정답 처리 + 화면 /tmp/t37_*.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const T=['S3-98#1','S3-105#0','S3-106#0','S3-107#0','S3-113#3'];
 const r=await p.evaluate((T)=>{ const bad=[], n={};
  for(const t of T){ const [e,i]=t.split('#'); n[t]=0; for(let k=0;k<300;k++){ const q=G36[e][+i](); const s=(q.visual.match(/class="vslot/g)||[]).length; if(!q._step) { bad.push(t+' 단계 칸 없음 '+q.q); continue; } n[t]++; if(s!==String(q.ans).length) bad.push(t+' 칸 수 '+s+'≠'+q.ans); for(const m of Object.keys(q.mis||{})) if(m.length!==String(q.ans).length) bad.push(t+' 열쇠 길이 '+m); } }
  return {n,bad:[...new Set(bad)].slice(0,20)}; },T);
 console.log(JSON.stringify(r)); if(r.bad.length) errs.push('bad '+r.bad.length);
 for(const t of T){ const info=await p.evaluate((t)=>{ const [ep,i]=t.split('#'); localStorage.clear(); localStorage.setItem('dotori-input','pad'); KT.setPref({band:6}); const qq=G36[ep][+i](); S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq},{kind:'q',q:G36[ep][+i]()}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; question(qq); return {q:qq.q,ans:String(qq.ans),slots:document.querySelectorAll('#visual .vslot').length}; },t);
  await p.waitForTimeout(300); await p.screenshot({path:'/tmp/t37_'+t.replace('#','_')+'.png'});
  for(const c of info.ans) await p.click(`.numpad .nk[data-k="${c}"]`); await p.click('.wok'); await p.waitForTimeout(300); const fb=(await p.textContent('#fb')).trim().slice(0,20);
  console.log(t, JSON.stringify(info), '→', fb); if(!/잘했|정답|좋아|맞/.test(fb)) errs.push(t+' 정답 처리 안 됨: '+fb); }
 console.log('errors',errs); await b.close(); })();
