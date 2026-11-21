const { chromium } = require('playwright');
// 쓰기형 예상 오답 표본: node x34.js 편 번호 [개수]  /  1~2학년은 편 번호만(예: 27 11)
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); p.on('pageerror',e=>console.log('페이지 오류',e.message)); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(([e,i,n])=>{ const g=(G36[e]||G[e])[i], o=[]; for(let k=0;k<n;k++){ const q=g(); o.push(String(q.q).replace(/<[^>]+>/g,'').slice(0,60)+' ∥ '+q.ans+' ∥ '+JSON.stringify(q.mis||{})+' ∥ '+(q.ansText||'')); } return o; },[process.argv[2],+process.argv[3],+process.argv[4]||5]);
 console.log(r.join('\n')); await b.close(); })();
