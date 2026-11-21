const { chromium } = require('playwright');
// 아이가 낸 답으로 말하기, 막힘 감지 단추, '자신 있었어?' 확인
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:820}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const j=await p.evaluate(()=>['885','12','3','같아요','4분의 3','직각'].map(g=>g+window._jRago(g)).join(' ')); console.log(j); if(j!=='885라고 12라고 3이라고 같아요라고 4분의 3이라고 직각이라고') errs.push('조사 '+j);
 const setup=(why)=>p.evaluate((why)=>{ localStorage.clear(); localStorage.setItem('dotori-input','pad'); KT.setPref({band:3,why}); let F=null;
   for(const ep of Object.keys(G36)){ G36[ep].forEach((g,i)=>{ if(F) return; let q; try{ q=g(); }catch(e){ return; } if(q&&!q.write&&!q.manip&&!q.onMount&&q.opts&&q.opts.length>=3&&q.mis&&Object.keys(q.mis).some(k=>_MISC[q.mis[k]]&&KCARDS[_MISC[q.mis[k]][0][0]]&&q.opts.map(String).includes(k))) F={ep,i}; }); if(F) break; }
   const mk=()=>{ for(let t=0;t<30;t++){ const q=G36[F.ep][F.i](); q._ep=F.ep; q._ti=F.i; if(Object.keys(q.mis).some(k=>_MISC[q.mis[k]]&&KCARDS[_MISC[q.mis[k]][0][0]]&&q.opts.map(String).includes(k))) return q; } };
   S={mode:'ep36',ep:F.ep,ui:UNITS36.findIndex(u=>u.eps.includes(F.ep)),acts:[1,2,3,4].map(()=>({kind:'q',q:mk()})),i:0,results:[],tries:0,counted:0,steps:[{kind:'acts'}],si:0,title:'오늘의 문제',kt:'daily'}; runAct(); return F; },why);
 // 1) 이유 보기 켬 → 오답 한마디에 아이 답
 await setup(true); const w=await p.evaluate(()=>{ const q=S.acts[0].q; const k=Object.keys(q.mis).find(k=>_MISC[q.mis[k]]&&q.opts.map(String).includes(k)); const b=[...document.querySelectorAll('.opt')].find(x=>String(x.dataset.v)===k); b.click(); return {k,h:(document.querySelector('#fb .hint1')||{}).innerHTML||''}; });
 console.log('한마디', JSON.stringify(w).slice(0,200)); if(!w.h.includes('<b>'+w.k+'</b>')) errs.push('아이 답이 한마디에 없음');
 // 2) 막힘 감지: 시간을 앞당겨 단추가 뜨는지, 누르면 카드 → 같은 문제
 await p.evaluate(()=>{ window.__st=setTimeout; window.setTimeout=(f,t,...a)=>window.__st(f,t>=30000?50:t,...a); }); await setup(false); await p.waitForTimeout(400);
 const btn=await p.$('#kt-stuck'); if(!btn) errs.push('막힘 단추 없음'); else { await btn.click(); await p.waitForTimeout(150); const c=await p.evaluate(()=>({card:!!document.querySelector('.kc-dots'),hint:(document.querySelector('.bubble .hint')||{}).textContent,kind:S.acts[S.i].kind,next:S.acts[S.i+1].q&&S.acts[S.i+1].q._helped})); console.log('막힘', JSON.stringify(c)); if(!c.card||c.kind!=='card'||!c.next) errs.push('막힘 카드 흐름'); }
 await p.evaluate(()=>{ window.setTimeout=window.__st; });
 // 3) 자신 있었어?: 확률을 1로
 await p.evaluate(()=>{ window.__rnd=Math.random; }); await setup(false); await p.evaluate(()=>{ Math.random=()=>0.1; });
 const before=await p.evaluate(()=>S.acts.length); await p.evaluate(()=>{ const q=S.acts[0].q; [...document.querySelectorAll('.opt')].find(x=>String(x.dataset.v)===String(q.ans)).click(); }); await p.waitForTimeout(100);
 await p.evaluate(()=>{ Math.random=window.__rnd; }); const cf=await p.$$('.kt-conf button'); if(cf.length!==3) errs.push('자신감 단추 '+cf.length); else { await p.click('.kt-conf button[data-c="찍었어요"]'); await p.waitForTimeout(80); const after=await p.evaluate(()=>({n:S.acts.length,conf:S.acts[S.acts.length-1].q._conf,log:localStorage.getItem('dotori-kt-conf')})); console.log('찍었어요', JSON.stringify(after), await p.evaluate(()=>{ const q=S.acts[0].q; try{ const n=window._sameFormQ(q,null); return q._ep+'#'+q._ti+' '+String(q.q).slice(0,30)+' → '+(n?String(n.q).slice(0,30):'null'); }catch(e){ return 'ERR '+e.stack; } })); if(after.n!==before+1||!after.conf) errs.push('찍었어요 → 다시 확인 문제 없음'); }
 await p.evaluate(()=>{ Math.random=window.__rnd; });
 console.log('errors',errs); await b.close(); })();
