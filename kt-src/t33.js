const { chromium } = require('playwright');
// 소수 끝 0을 뺀 쓰기 문제: 답이 자연수가 된 경우(0.5 × 6 = 3) 칸 1개, 소수점 없음, 3을 쓰면 정답.
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 for(const [ep,re] of [['S3-93',/^\d+$/],['S3-61',/^\d+\.\d$/],['S3-112',/병/]]){
 const info=await p.evaluate(([ep,re])=>{ localStorage.clear(); localStorage.setItem('dotori-input','pad'); KT.setPref({band:5}); let qq,i,ok=false; for(i=0;i<G36[ep].length&&!ok;i++){ for(let sd=1;sd<80;sd++){ qq=KT.regen(ep,i,sd); if(qq&&!qq.manip&&qq.write&&qq.slots&&/eqrow/.test(qq.visual)&&new RegExp(re).test(String(qq.ansText))){ ok=true; break; } } if(ok) break; } if(!ok) return null; S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q:qq},{kind:'q',q:G36[ep][i]()}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; question(qq); return {q:qq.q,ans:qq.ans,at:qq.ansText,slots:document.querySelectorAll('#visual .vslot').length,dots:document.querySelectorAll('.dotpick').length,free:document.querySelectorAll('#freeans').length}; },[ep,re.source]);
 if(!info){ console.log(ep,'해당 문제 없음'); continue; }
 const free=await p.evaluate(()=>document.querySelectorAll('#freeans').length); const typed=free?(String(info.at).match(/\d+(?:\.\d+)?/)||[String(info.ans)])[0]:String(info.ans); for(const c of typed) await p.click(`.numpad .nk[data-k="${c}"]`);
 await p.click('.wok'); await p.waitForTimeout(300); const fb=(await p.textContent('#fb')).trim().slice(0,24);
 console.log(ep, JSON.stringify(info), '→', fb); if(!/잘했|정답|좋아|맞/.test(fb)) errs.push(ep+' 정답 처리 안 됨: '+fb); }
 console.log('errors',errs); await b.close(); })();
