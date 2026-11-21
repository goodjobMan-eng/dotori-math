const { chromium } = require('playwright');
// 틀 하나의 문제 객체를 통째로 보기: node x43.js S3-98 1
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(([e,i])=>{ const q=(G36[e]||G[e])[i](); return JSON.stringify(q,(k,v)=>typeof v==='function'?'[fn]':v,1); },[process.argv[2],+process.argv[3]]);
 console.log(r); await b.close(); })();
