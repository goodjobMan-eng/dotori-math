const { chromium } = require('playwright');
// 시간·복합 단위 답 상자(3-39): 상자 2개, 칸 없음, 정답·빈 상자·넘친 답(G2-17)·예상 오답 코드 + 화면 /tmp/t38.png
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const st=await p.evaluate(()=>{ const o={frames:0,noub:[]}; for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>{ let ub=0,cmp=0; for(let k=0;k<12;k++){ const q=g(); if(!q||!q.write||!q.slots||typeof q.visual!=='string') continue; if(q.ub) ub++; if(/<\/span><b>(시간?|분|m|cm|km|L|kg)<\/b><span class="vgrp">/.test(q.visual)) cmp++; } if(ub) o.frames++; if(cmp&&ub!==cmp) o.noub.push(ep+'#'+i); }); return o; });
 console.log(JSON.stringify(st)); if(st.noub.length) errs.push('상자로 못 바꾼 틀 '+st.noub.join(' '));
 const open=(ep,i,re)=>p.evaluate(([ep,i,re])=>{ localStorage.clear(); KT.setPref({band:3}); let qq; for(let k=0;k<400;k++){ qq=G36[ep][i](); if(!re||new RegExp(re).test(JSON.stringify(qq.mis||{}))) break; } S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq},{kind:'q',q:G36[ep][i]()}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; window.__q=qq; question(qq); return {q:qq.q,a:qq.ub&&qq.ub.a,mis:qq.mis||{},boxes:document.querySelectorAll('#visual .ubox').length,slots:document.querySelectorAll('#visual .vslot').length}; },[ep,i,re]);
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
 console.log('errors',errs); await b.close(); })();
