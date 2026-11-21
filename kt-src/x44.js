const { chromium } = require('playwright');
// 단위가 붙은 칸 답(시간·복합 단위) 조사: 칸 묶음 뒤에 단위 글자가 오는 쓰기형 틀
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+process.cwd()+'/out/index.html'); await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{ const out={}, U='시간|시|분|초|일|주|개월|년|km|cm|mm|m|kg|g|t|mL|L|원|개|도|°';
  const scan=(name,g)=>{ for(let k=0;k<25;k++){ let q; try{ q=g(); }catch(e){ return; } if(!q||!q.write||!q.slots||typeof q.visual!=='string') continue;
    const s=q.visual.replace(/<span class="vslot[^"]*"><\/span>/g,'□').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); const grp=s.match(/□+/g)||[];
    const m=[...s.matchAll(new RegExp('(□+) ?('+U+')(?![a-zA-Z가-힣])','g'))]; if(!m.length) continue; const sig=m.map(x=>x[2]).join('+')+(grp.length>m.length?' (+단위 없는 칸)':''); (out[name]=out[name]||new Set()).add(sig+' ∥ '+s.slice(-46)+' ∥ '+q.ans+' ∥ free:'+(q._free?1:0)); } };
  for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>scan(ep+'#'+i,g)); for(const ep of Object.keys(G)) if(!G36[ep]) G[ep].forEach((g,i)=>scan(ep+'#'+i,g));
  return Object.entries(out).map(([k,v])=>k+' | '+[...v].slice(0,2).join('  //  ')); });
 console.log(r.join('\n')); console.log('틀', r.length); await b.close(); })();
