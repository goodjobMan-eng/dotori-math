const { chromium } = require('playwright');
// 시간·복합 단위 답 상자(3-39): 상자 2개, 칸 없음, 정답·빈 상자·넘친 답(G2-17)·예상 오답 코드 + 화면 /tmp/t38.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const st=await p.evaluate(()=>{ const o={frames:0,noub:[]}; for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>{ let ub=0,cmp=0; for(let k=0;k<12;k++){ const q=g(); if(!q||!q.write||!q.slots||typeof q.visual!=='string') continue; if(q.ub) ub++; if(/<\/span><b>(시간?|분|m|cm|km|L|kg)<\/b>(<\/span><span class="uchunk">)?<span class="vgrp">/.test(q.visual)) cmp++; } if(ub) o.frames++; if(cmp&&ub!==cmp) o.noub.push(ep+'#'+i); }); return o; });
 console.log(JSON.stringify(st)); if(st.noub.length) errs.push('상자로 못 바꾼 틀 '+st.noub.join(' '));
 const open=(ep,i,re)=>p.evaluate(([ep,i,re])=>{ localStorage.clear(); if(!window.__hand) localStorage.setItem('dotori-input','pad'); KT.setPref({band:3}); let qq; for(let k=0;k<400;k++){ qq=G36[ep][i](); if(!re||new RegExp(re).test(JSON.stringify(qq.mis||{}))) break; } S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq},{kind:'q',q:G36[ep][i]()}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; window.__q=qq; question(qq); return {q:qq.q,a:qq.ub&&qq.ub.a,mis:qq.mis||{},boxes:document.querySelectorAll('#visual .ubox').length,slots:document.querySelectorAll('#visual .vslot').length}; },[ep,i,re]);
 const type=async(x,y)=>{ for(const c of String(x)) await p.click(`.numpad .nk[data-k="${c}"]`); await p.click(`.numpad .nk[data-k="→"]`); for(const c of String(y)) await p.click(`.numpad .nk[data-k="${c}"]`); await p.click('.wok'); await p.waitForTimeout(250); return (await p.textContent('#fb')).trim().slice(0,30); };
 const last=()=>p.evaluate(()=>{ try{ const L=JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>/log/i.test(k)&&/"mis"|"m"/.test(localStorage.getItem(k)))||'')||'[]'); return null; }catch(e){ return null; } });
 // 1) 정답
 let i=await open('S6-36',1); if(i.boxes!==2||i.slots!==0) errs.push('상자 수 '+JSON.stringify(i)); await p.screenshot({path:'/tmp/t38a.png'}); let fb=await type(i.a[0],i.a[1]); console.log('정답', i.q, i.a, '→', fb); if(!/잘했|정답|좋아|맞|정확|우아|오~|옳지/.test(fb)) errs.push('정답 처리 안 됨 '+fb);
 // 2) 빈 상자
 i=await open('S6-37',1); for(const c of String(i.a[0])) await p.click(`.numpad .nk[data-k="${c}"]`); await p.click('.wok'); await p.waitForTimeout(200); fb=(await p.textContent('#fb')).trim(); console.log('빈 상자 →', fb); if(!/비어/.test(fb)) errs.push('빈 상자를 막지 않음');
 // 3) 넘친 답: 값은 같음 → G2-17, 앞자리 0(05)은 정답
 i=await open('S6-36',1); const rec=[]; await p.evaluate(()=>{ const r=KT.rec; window.__rec=[]; KT.rec=function(q,g,ok){ window.__rec.push([g,ok,q._mcode||(q.mis||{})[g]||null]); return r.apply(this,arguments); }; });
 fb=await type(i.a[0]-1,i.a[1]+60); let r=await p.evaluate(()=>window.__rec); console.log('넘친 답', i.a, '→', fb, JSON.stringify(r)); if(!r.length||r[0][2]!=='G2-17') errs.push('G2-17 아님'); await p.screenshot({path:'/tmp/t38b.png'});
 fb=await type('0'+i.a[0],i.a[1]); console.log('앞자리 0 →', fb); if(!/잘했|정답|좋아|맞|정확|우아|오~|옳지/.test(fb)) errs.push('05 꼴 정답 처리 안 됨 '+fb);
 // 4) 예상 오답: 시계 긴바늘 숫자 그대로(G2-07), 자릿수가 달라도 쓸 수 있음
 i=await open('S6-10',1,'G2-07'); const k=Object.keys(i.mis).find(k=>i.mis[k]==='G2-07').split(','); await p.evaluate(()=>{ window.__rec=[]; }); fb=await type(k[0],k[1]); r=await p.evaluate(()=>window.__rec); console.log('시계', i.a, '쓴 답', k, '→', JSON.stringify(r)); if(!r.length||r[0][2]!=='G2-07') errs.push('G2-07 아님'); await p.screenshot({path:'/tmp/t38c.png'});
 // 5) 2학년 시계 읽기는 기본이 손글씨: 칸이 그대로 있고(숫자를 직접 씀), 숫자판으로 바꾸면 상자, 다시 손글씨로 바꾸면 칸
 await p.evaluate(()=>{ window.__hand=1; }); i=await open('S6-10',1); const cv=await p.evaluate(()=>document.querySelectorAll('#visual .vslot canvas').length); console.log('2학년 기본', JSON.stringify({boxes:i.boxes,slots:i.slots,canvas:cv})); if(i.boxes!==0||!i.slots||cv!==i.slots) errs.push('2학년 손글씨 칸이 아님');
 await p.click('.wmode'); await p.waitForTimeout(200); let m=await p.evaluate(()=>({boxes:document.querySelectorAll('#visual .ubox').length,slots:document.querySelectorAll('#visual .vslot').length})); if(m.boxes!==2) errs.push('숫자판 전환 뒤 상자 아님 '+JSON.stringify(m));
 await p.click('.wmode'); await p.waitForTimeout(200); m=await p.evaluate(()=>({boxes:document.querySelectorAll('#visual .ubox').length,canvas:document.querySelectorAll('#visual .vslot canvas').length})); if(m.boxes!==0||!m.canvas) errs.push('손글씨 전환 뒤 칸 아님 '+JSON.stringify(m)); await p.screenshot({path:'/tmp/t38d.png'});
 // 6) 줄은 의미 단위로: 칸 묶음과 단위 글자가 같은 줄(위치가 겹침)에 있어야 한다. 좁은 화면(360)에서 손글씨·숫자판 둘 다.
 await p.setViewportSize({width:360,height:780}); const lines=[];
 for(const hand of [1,0]) for(const [ep,k] of [['S6-10',1],['S6-10',2],['S6-11',1],['S6-16',0],['S6-35',2],['S6-39',0],['S6-42',1],['S6-46',1]]) for(let t=0;t<6;t++){ await p.evaluate((h)=>{ window.__hand=h; },hand); await open(ep,k); await p.waitForTimeout(60);
   const r=await p.evaluate(()=>{ const out=[]; document.querySelectorAll('#visual .uchunk').forEach(c=>{ const g=c.querySelector('.vgrp').getBoundingClientRect(), u=c.querySelector('b').getBoundingClientRect(); const mid=u.top+u.height/2; if(!(mid>g.top&&mid<g.bottom)) out.push('단위가 다른 줄'); if(u.right>document.documentElement.clientWidth+1) out.push('화면 밖'); }); const cs=[...document.querySelectorAll('#visual .uchunk')].map(c=>Math.round(c.getBoundingClientRect().top)); return {n:cs.length,rows:new Set(cs).size,out}; });
   if(r.n!==2||r.out.length) errs.push(ep+'#'+k+(hand?' 손글씨 ':' 숫자판 ')+JSON.stringify(r)); lines.push(r.rows); if(ep==='S6-10'&&hand&&t===0) await p.screenshot({path:'/tmp/t38e.png'}); }
 console.log('덩어리 줄 수(1이면 한 줄)', JSON.stringify(lines.reduce((o,x)=>(o[x]=(o[x]||0)+1,o),{})));
 console.log('errors',errs); await b.close(); })();
