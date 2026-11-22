const { chromium } = require('playwright');
// 규칙(반복 무늬)은 한 줄로: 좁은 화면(360)에서 순서를 보여 주는 그림이 두 줄로 꺾이지 않는지. 1~6학년 '규칙·다음에 올' 문제 전부. 화면 /tmp/t44.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:360,height:780}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const forms=await p.evaluate(()=>{ const o=[]; for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>{ let q; try{ q=g(); }catch(e){ return; } const u=UNITS36.find(u=>u.eps.includes(ep)); if(q&&(/규칙|다음에 올|다음 (색|모양|수)/.test(String(q.q))||(u&&/규칙/.test(u.title||u.name||'')))&&typeof q.visual==='string'&&q.visual.length>20&&!q.manip&&!q.onMount) o.push([ep,i]); }); return o; });
 const bad=[]; let shot=0;
 for(const [ep,i] of forms){ for(let k=0;k<4;k++){ const r=await p.evaluate(([ep,i])=>{ localStorage.clear(); localStorage.setItem('dotori-input','pad'); KT.setPref({band:2}); const qq=G36[ep][i](); S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; runAct();
   const out=[]; document.querySelectorAll('#visual *').forEach(c=>{ const cs=getComputedStyle(c); if(!(cs.display.includes('flex')&&cs.flexWrap==='wrap')&&!c.classList.contains('seqrow')&&!(cs.display.includes('grid'))) return; if(c.closest('table')||c.classList.contains('seqgrid')) return;   /* seqgrid는 한 줄이 반복 마디 하나인 표 배열(의도) */ const kids=[...c.children]; if(kids.length<4) return; const tops=new Set(kids.map(x=>(r=>Math.round((r.top+r.height/2)/24))(x.getBoundingClientRect()))); if(tops.size>1) out.push(c.className+' '+kids.length+'개가 '+tops.size+'줄'); if(c.getBoundingClientRect().right>document.documentElement.clientWidth+1) out.push('화면 밖'); });
   return {q:String(qq.q).slice(0,24),out,seq:!!document.querySelector('#visual .seqrow')}; },[ep,i]);
   if(r.out.length) bad.push(ep+'#'+i+' '+r.q+' '+r.out.join(',')); if(r.seq&&shot<3){ await p.screenshot({path:'/tmp/t44_'+shot+'.png'}); shot++; } } }
 console.log('규칙 그림 틀', forms.length, '두 줄로 꺾인 틀', [...new Set(bad)].length); [...new Set(bad)].slice(0,12).forEach(x=>console.log(' ', x));
 if(bad.length) errs.push('두 줄');
 const adult=await p.evaluate(()=>document.documentElement.innerHTML.includes('어른과 함께')); if(adult) errs.push('어른과 함께 남음');
 console.log('errors',errs); await b.close(); })();
