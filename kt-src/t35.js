const { chromium } = require('playwright');
// 소수 답 통째로 쓰기(mountFree): 소수 쓰기 틀마다 칸·점 버튼이 없고 답 상자 하나만 있는지, 바른 답/자리 틀린 답/예상 오답이 제대로 채점되는지.
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const open=(ep,i,seed)=>p.evaluate(([ep,i,seed])=>{ const q=KT.regen(ep,i,seed); q._ep=ep; q._ti=i; S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q},{kind:'q',q}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; question(q); return {ans:q.ans,at:q.ansText,mis:q.mis,vis:document.getElementById('visual').innerText.replace(/\s+/g,' ').slice(0,80),free:document.querySelectorAll('#freeans').length,slots:document.querySelectorAll('#visual .vslot').length,dp:document.querySelectorAll('.dotpick').length,keys:[...document.querySelectorAll('.nk')].map(x=>x.dataset.k).join('')}; },[ep,i,seed]);
 const type=async s=>{ for(const c of s) await p.click(`.nk[data-k="${c}"]`); await p.click('.wok'); await p.waitForTimeout(250); return p.evaluate(()=>({fb:document.getElementById('fb').innerText.replace(/\s+/g,' ').slice(0,70),box:document.getElementById('freeans')?.textContent})); };
 const out={};
 // 1) 전수: 소수 쓰기 틀은 모두 답 상자 하나
 out.all=await p.evaluate(()=>{ const o={dec:0,free:0,bad:[]}; for(const ep of Object.keys(G36)) for(let i=0;i<G36[ep].length;i++){ let q; try{ q=KT.regen(ep,i,4); }catch(e){ continue; } if(!q||q.manip||q.onMount||(q.opts&&q.opts.length)||!/class="dot"/.test(q.visual||'')) continue; o.dec++; q._ep=ep; q._ti=i; S={mode:'ep36',ep,ui:UNITS36.findIndex(u=>u.eps.includes(ep)),acts:[{kind:'q',q}],i:0,results:[],tries:0,steps:[{kind:'acts'}],si:0,title:'t'}; question(q); if(document.querySelectorAll('#freeans').length===1&&!document.querySelectorAll('.dotpick').length) o.free++; else if(o.bad.length<8) o.bad.push(ep+'#'+i+' 점'+(q.visual.match(/class="dot"/g)||[]).length); } return o; });
 // 2) 원주 문제: 식이 안 보이고, 바른 답 통과
 const q1=await open('S6-74',0,3); out.q1=q1; const truth=String(q1.at).match(/= ([\d.]+)/)[1]; out.eqShown=/×/.test(q1.vis);
 out.wrongPoint=await type(String(+(parseFloat(truth)*10).toFixed(4))); out.mcode=await p.evaluate(()=>S.acts[0].q._mcode);
 out.right=await type(truth);
 // 3) 예상 오답(소수점 뺀 열쇠)과 맞는지: 첫 예상 오답을 소수로 바꿔 입력
 const q2=await open('S6-74',0,5); const mk=Object.keys(q2.mis||{})[0]; if(mk){ const t2=String(q2.at).match(/= ([\d.]+)/)[1], dec=(t2.split('.')[1]||'').length; const g=(+mk/Math.pow(10,dec)); out.misTry={key:mk,code:q2.mis[mk],typed:String(g)}; await type(String(g)); out.misLog=await p.evaluate(()=>{ try{ const st=KT.state(); return JSON.stringify(st.log?st.log.slice(-1):Object.keys(st)).slice(0,160); }catch(e){ return String(e); } }); }
 await open('S6-75',0,2); await p.screenshot({path:'/tmp/t35.png'});
 console.log(JSON.stringify(out,null,1)); console.log('errors',errs.slice(0,3)); await b.close(); })();
