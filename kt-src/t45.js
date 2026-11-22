const { chromium } = require('playwright');
// 내 친구 표시 자리: 처음 화면은 오른쪽 위(이름까지), 맨 위 줄이 있는 화면은 그 줄 안, 문제 화면은 🔊 왼쪽에 얼굴만. 🔊·진행 점·목록 단추와 겹치지 않아야 한다(360 폭).
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:360,height:780}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1200);
 await p.evaluate(()=>{ KT.switchSlot('5-3'); }); await p.reload(); await p.waitForTimeout(1200);
 const ov=(a,b)=>a&&b&&!(a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top);
 const chk=async(name)=>{ const r=await p.evaluate(()=>{ const R=e=>e?(({left,right,top,bottom})=>({left,right,top,bottom}))(e.getBoundingClientRect()):null; const me=document.getElementById('kt-me'); return {me:R(me),cls:me&&me.className,name:me&&getComputedStyle(me.querySelector('b')).display!=='none',sp:R(document.querySelector('#app #speak, #app .speak')),back:R(document.querySelector('#app .back')),dots:[...document.querySelectorAll('#app .top .dot, #app .top [class*="dots"]')].map(R),vw:document.documentElement.clientWidth}; });
   const bad=[]; if(!r.me) bad.push('표시 없음'); else { if(r.me.right>r.vw+1) bad.push('화면 밖'); if(ov(r.me,r.sp)) bad.push('🔊와 겹침'); if(ov(r.me,r.back)) bad.push('목록 단추와 겹침'); r.dots.forEach(d=>{ if(ov(r.me,d)) bad.push('진행 점과 겹침'); }); }
   console.log(name, r.cls, '이름', r.name, bad.join(',')||'ok'); if(bad.length) errs.push(name+' '+bad.join(',')); await p.screenshot({path:'/tmp/t45_'+name+'.png'}); return r; };
 let r=await chk('home'); if(r.cls&&r.cls.includes('inrow')) { /* 처음 화면에 맨 위 줄이 있으면 그 줄 안도 괜찮음 */ }
 await p.evaluate(()=>{ KT.setPref({band:2}); const ep='S5-04'; const qq=G36[ep][0](); S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[1,2,3,4,5,6,7,8,9,10].map(()=>({kind:'q',q:G36[ep][0]()})),i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; runAct(); }); await p.waitForTimeout(200);
 r=await chk('question'); if(!r.cls||!r.cls.includes('face')) errs.push('문제 화면인데 얼굴만이 아님');
 await p.evaluate(()=>KT.gradePage(3)); await p.waitForTimeout(200); await chk('grade');
 await p.evaluate(()=>KT.teacherPage()); await p.waitForTimeout(200); await chk('teacher');
 await p.evaluate(()=>{ home(); }); await p.waitForTimeout(200); await chk('home2');
 console.log('errors',errs); await b.close(); })();
