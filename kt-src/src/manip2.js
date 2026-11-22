
// ===== manip2.js — 적은 엔진으로 많은 편을 덮는 '직접 해 보기'(구체적 조작) 엔진 (교수님 11/22 밤) =====
// 원칙: ① 끌기 대신 누르기(터치 기기·저학년에서 안정) ② 판정은 [다 했어요]를 누른 때의 마지막 상태로만(중간 장난은 보지 않음)
//       ③ 틀린 상태마다 오개념 코드(m.wrong()이 보기 이름을 돌려주고, 문제의 mis에 이름→코드) ④ 시간은 따지지 않음
//       ⑤ 정답 상태가 여러 가지면 모두 인정 ⑥ 두 번 틀리면 정답 상태를 보여 줌(m.reveal)
//       ⑦ 어떻게 했는지(전략)는 window.__manipStrat에 남김(하나씩 돌리기/묶어서 담기 등) — 서버 형식은 그대로
Object.assign(MIS,{
'N3-46':['똑같이 나누지 않고 묶음마다 수를 다르게 놓음','나눗셈은 모든 묶음의 수가 같아야 해요. 하나씩 차례로 돌려 가며 놓아 보세요.'],
'N2-13':['덜어 내야 할 수와 다른 수를 덜어 냄','빼는 수만큼만 덜어 내요. 백·십·일 모형을 자리마다 몇 개 덜어야 하는지 먼저 말해 보세요.'],
'R6-15':['비를 맞추지 않고 한쪽 양만 맞춤','두 양을 같은 수만큼 곱해서(배로) 늘려야 비가 그대로예요.']});
try{ if(typeof window!=='undefined') (window.__MISC_ADD=window.__MISC_ADD||[]).push(['N3-46',[['C08',.9]]],['N2-13',[['C05',.9]]],['R6-15',[['RC05',.9]]]); }catch(e){}
const M2={};
const m2css='font-family:Jua,sans-serif;color:#4A2E14', m2b=(act,lab,st)=>`<button type="button" data-ma="${act}" style="font-family:Jua,sans-serif;font-size:1rem;min-width:44px;min-height:44px;padding:6px 10px;border-radius:12px;border:2px solid #C9A56B;background:#FFF8EC;color:#4A2E14;cursor:pointer;touch-action:manipulation;${st||''}">${lab}</button>`;
const m2wrap=inner=>`<div class="m2" style="${m2css};display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;-webkit-user-select:none;user-select:none;touch-action:manipulation">${inner}</div>`;
// 공통 틀: st(상태)와 draw()만 주면 누르기·다시 그리기를 맡는다. on(act, 누른 단추)에서 상태를 바꾼다.
const m2make=(o)=>{ const m={ html:m2wrap(o.draw()), _root:null,
    mount(root){ m._root=root; root.addEventListener('click',e=>{ const b=e.target&&e.target.closest?e.target.closest('[data-ma]'):null; if(!b||!root.contains(b)||m._lock) return; e.preventDefault(); try{ o.on(b.dataset.ma,b); }catch(err){} m.redraw(); }); },
    redraw(){ if(m._root) m._root.innerHTML=m2wrap(o.draw()); },
    check(){ let ok=false; try{ ok=!!o.check(); }catch(e){} try{ window.__manipStrat=o.strat?o.strat():null; }catch(e){} return ok; },
    wrong(){ try{ return o.wrong?o.wrong():null; }catch(e){ return null; } },
    reveal(){ try{ o.reveal&&o.reveal(); }catch(e){} m._lock=true; m.redraw(); }, state:()=>o.state?o.state():null, goal:()=>o.goal?o.goal():null };
  return m; };
const m2q=(text,hint,m,ansText,mis)=>{ const q=MQ(text,hint,m,ansText); if(mis) q.mis=mis; /* 앱의 조작 기록 방식에 맞춤: 처음 [다 했어요] 때의 상태(짧은 글)와 오개념 코드 */ const s0=m.state; m.state=()=>{ const v=s0(); try{ Object.defineProperty(v,'toString',{value:()=>JSON.stringify(v).replace(/["{}]/g,'').slice(0,24),enumerable:false}); }catch(e){} return v; }; m.mcode=()=>{ const w=m.wrong(); return w&&mis&&mis[w]?mis[w]:null; }; return q; };

/* ---------- E1. 접시에 나누어 담기(나눗셈의 두 뜻 · 묶어 세기) ---------- */
// mode 'share': 접시 k개에 똑같이(남으면 바구니에) / 'measure': 한 접시에 u개씩(접시는 필요한 만큼) / 'build': 한 접시에 u개씩 b접시 만들기(곱셈)
M2.dish=(mode,N,k,u,b)=>{ let basket=N, plates=mode==='share'?Array(k).fill(0):[0,0], seq=[]; const MAXP=12;
  const eq=a=>a.every(x=>x===a[0]), used=()=>plates.filter(x=>x>0);
  const acorn=n=>`<span style="font-size:1.05rem;line-height:1.1;letter-spacing:-2px">${'🌰'.repeat(Math.min(n,30))}</span>`;
  const o={ draw(){ let h=`<div style="background:#F4E3C1;border:2px solid #C9A56B;border-radius:14px;padding:6px 10px;min-height:44px;max-width:320px;width:100%;text-align:center"><div style="font-size:.85rem;color:#8A6A4A">바구니 (${basket}개)</div>${acorn(basket)||'&nbsp;'}</div>`;
      h+=`<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:340px">`+plates.map((n,i)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:3px">${m2b('p'+i,`<div style="font-size:.78rem;color:#8A6A4A">접시 ${i+1}</div><div style="min-width:62px;min-height:30px">${acorn(n)||'·'}</div><b>${n}개</b>`,'background:#fff;border-radius:50% / 34%;padding:6px 8px')}${m2b('r'+i,'하나 빼기','font-size:.8rem;min-height:40px;padding:2px 8px')}</div>`).join('')+`</div>`;
      if(mode!=='share') h+=`<div style="display:flex;gap:8px">${m2b('add','접시 더 놓기')}${m2b('del','빈 접시 치우기')}</div>`;
      h+=`<div style="font-size:.9rem;color:#8A6A4A">접시를 누르면 도토리가 하나 담겨요</div>`; return h; },
    on(a){ if(a[0]==='p'){ const i=+a.slice(1); if(basket>0&&plates[i]<30){ plates[i]++; basket--; seq.push(i); try{ sfx('pop'); }catch(e){} } }
      else if(a[0]==='r'){ const i=+a.slice(1); if(plates[i]>0){ plates[i]--; basket++; } }
      else if(a==='add'){ if(plates.length<MAXP) plates.push(0); } else if(a==='del'){ const j=plates.lastIndexOf(0); if(j>=0&&plates.length>1) plates.splice(j,1); } },
    check(){ if(mode==='share'){ const q=Math.floor(N/k); return plates.every(x=>x===q)&&basket===N%k; }
      if(mode==='measure'){ const us=used(); return us.length===Math.floor(N/u)&&us.every(x=>x===u)&&basket===N%u; }
      const us=used(); return us.length===b&&us.every(x=>x===u); },
    wrong(){ if(mode==='share'){ if(!eq(plates)) return '접시마다 수가 달라요'; if(basket>=k) return '더 나눌 수 있는데 남겼어요'; return null; }
      const us=used(); if(!us.length) return null;
      if(mode==='measure'){ if(eq(us)&&us[0]!==u&&us.length===u&&N%u===0&&us[0]===N/u) return '접시 수와 한 접시의 수를 바꿨어요'; if(!us.every(x=>x===u)) return '접시마다 수가 달라요'; if(basket>=u) return '더 나눌 수 있는데 남겼어요'; return null; }
      if(eq(us)&&us.length===u&&us[0]===b&&u!==b) return '접시 수와 한 접시의 수를 바꿨어요'; if(!eq(us)) return '접시마다 수가 달라요'; return null; },
    reveal(){ if(mode==='share'){ const q=Math.floor(N/k); plates=Array(k).fill(q); basket=N%k; } else if(mode==='measure'){ plates=Array(Math.floor(N/u)).fill(u); basket=N%u; } else { plates=Array(b).fill(u); basket=N-u*b; } },
    strat(){ if(seq.length<4) return null; let sw=0; for(let i=1;i<seq.length;i++) if(seq[i]!==seq[i-1]) sw++; return sw>=seq.length*0.6?'one_by_one':'grouping'; },
    goal(){ if(mode==='share') return {plates:Array(k).fill(Math.floor(N/k))}; if(mode==='measure') return {plates:Array(Math.floor(N/u)).fill(u)}; return {plates:Array(b).fill(u)}; },
    state:()=>({basket,plates:plates.slice()}) };
  const m=m2make(o); m._o=o; return m; };
const M2_DISH_MIS={'접시마다 수가 달라요':'N3-46','더 나눌 수 있는데 남겼어요':'N3-02','접시 수와 한 접시의 수를 바꿨어요':'N2-10'};
M2.qShare=()=>{ const k=rnd(2,5), q=rnd(2,6), N=k*q; return m2q(`도토리 ${N}개를 접시 ${k}개에 똑같이 나누어 담아 보세요.`,'하나씩 차례로 돌려 가며 담으면 똑같이 나눌 수 있어요.',M2.dish('share',N,k),`한 접시에 ${q}개씩 (${N} ÷ ${k} = ${q})`,M2_DISH_MIS); };
M2.qMeasure=()=>{ const u=rnd(2,6), n=rnd(2,5), N=u*n; return m2q(`도토리 ${N}개를 한 접시에 ${u}개씩 담아 보세요. 접시가 모자라면 더 놓아요.`,`한 접시에 ${u}개가 되면 다음 접시로 넘어가요.`,M2.dish('measure',N,0,u),`접시 ${n}개 (${N} ÷ ${u} = ${n})`,Object.assign({},M2_DISH_MIS,{'접시 수와 한 접시의 수를 바꿨어요':'N3-01'})); };
M2.qShareRem=()=>{ const k=rnd(3,5), q=rnd(2,5), r=rnd(1,k-1), N=k*q+r; return m2q(`도토리 ${N}개를 접시 ${k}개에 똑같이 나누어 담아 보세요. 더 나눌 수 없을 때 남는 도토리는 바구니에 두어요.`,'바구니에 남은 도토리가 접시 수보다 적어야 다 나눈 거예요.',M2.dish('share',N,k),`한 접시에 ${q}개씩, ${r}개 남음 (${N} ÷ ${k} = ${q} … ${r})`,M2_DISH_MIS); };
M2.qMeasureRem=()=>{ const u=rnd(3,6), n=rnd(2,4), r=rnd(1,u-1), N=u*n+r; return m2q(`도토리 ${N}개를 한 접시에 ${u}개씩 담아 보세요. ${u}개가 안 되는 도토리는 바구니에 두어요.`,`바구니에 ${u}개보다 적게 남아야 해요.`,M2.dish('measure',N,0,u),`접시 ${n}개, ${r}개 남음 (${N} ÷ ${u} = ${n} … ${r})`,Object.assign({},M2_DISH_MIS,{'접시 수와 한 접시의 수를 바꿨어요':'N3-01'})); };
M2.qBuild=()=>{ let u=rnd(2,6), b=rnd(2,5); if(u===b) u++; return m2q(`한 접시에 도토리를 ${u}개씩, 접시 ${b}개에 담아 보세요.`,`접시 ${b}개에 ${u}개씩이면 ${u} × ${b}예요.`,M2.dish('build',u*b+rnd(2,5),0,u,b),`${u}개씩 ${b}접시 (${u} × ${b} = ${u*b})`,M2_DISH_MIS); };

/* ---------- E2. 수 모형 바꾸기(받아올림·받아내림 · 소수) ---------- */
// names: ['백','십','일'] 또는 ['일','0.1','0.01']. task 'tidy': 한 자리에 10개가 넘지 않게 바꾸기 / 'take': b만큼 덜어 내기(모자라면 윗자리 모형을 바꿔서)
M2.blocks=(task,start,bd,names)=>{ let v=start.slice(), rm=[0,0,0], moved=0; const col=['#E8873A','#5BA85B','#4F8FD9'];
  const glyph=(i,n)=>{ const w=i===0?22:i===1?8:9, h=i===0?22:i===1?22:9; let s=''; for(let k=0;k<Math.min(n,24);k++) s+=`<span style="display:inline-block;width:${w}px;height:${h}px;background:${col[i]};border:1px solid #4A2E14;border-radius:2px;margin:1px"></span>`; return s||'<span style="color:#B9A888">없음</span>'; };
  const o={ draw(){ let h=`<div style="display:flex;gap:6px;justify-content:center;width:100%;max-width:340px">`+[0,1,2].map(i=>`<div style="flex:1;background:#fff;border:2px solid ${v[i]>9?'#D45F16':'#E3CFA8'};border-radius:12px;padding:5px;text-align:center;min-height:96px"><div style="font-size:.9rem">${names[i]} 모형 <b>${v[i]}개</b></div><div style="line-height:0;margin-top:4px">${glyph(i,v[i])}</div>${task==='take'?`<div style="margin-top:6px">${m2b('t'+i,'1개 덜기','font-size:.8rem;min-height:34px;padding:2px 6px')}</div>`:''}</div>`).join('')+`</div>`;
      h+=`<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">`+[1,2].map(i=>task==='tidy'?m2b('u'+i,`${names[i]} 10개 → ${names[i-1]} 1개`,'font-size:.85rem'):m2b('d'+i,`${names[i-1]} 1개 → ${names[i]} 10개`,'font-size:.85rem')).join('')+(task==='tidy'?[1,2].map(i=>m2b('d'+i,`${names[i-1]} 1개 → ${names[i]} 10개`,'font-size:.78rem;opacity:.75')).join(''):'')+`</div>`;
      if(task==='take') h+=`<div style="background:#FFF3D6;border:2px dashed #E3CFA8;border-radius:12px;padding:5px 10px;font-size:.9rem;text-align:center">덜어 낸 것: ${names.map((n,i)=>`${n} ${rm[i]}개`).join(', ')} ${m2b('back','되돌리기','font-size:.78rem;min-height:32px;padding:2px 8px')}</div>`;
      return h; },
    on(a){ const i=+a.slice(1); if(a[0]==='u'){ if(v[i]>=10){ v[i]-=10; v[i-1]++; moved++; } } else if(a[0]==='d'){ if(v[i-1]>=1&&v[i]+10<=40){ v[i-1]--; v[i]+=10; moved++; } }
      else if(a[0]==='t'){ if(v[i]>0){ v[i]--; rm[i]++; } } else if(a==='back'){ for(let k=2;k>=0;k--) if(rm[k]>0){ rm[k]--; v[k]++; break; } } },
    check(){ if(task==='tidy') return v[1]<=9&&v[2]<=9; return rm[0]===bd[0]&&rm[1]===bd[1]&&rm[2]===bd[2]; },
    wrong(){ if(task==='tidy') return moved===0?'모형을 바꾸지 않았어요':'아직 10개가 넘는 자리가 있어요';
      const big=[0,1,2].map(i=>Math.abs(start[i]-bd[i])); if(rm.every((x,i)=>x===big[i])&&!rm.every((x,i)=>x===bd[i])) return '자리마다 큰 수에서 작은 수를 뺐어요'; return '덜어 낸 수가 빼는 수와 달라요'; },
    reveal(){ const val=start[0]*100+start[1]*10+start[2]; if(task==='tidy'){ v=[Math.floor(val/100),Math.floor(val/10)%10,val%10]; } else { const r=val-(bd[0]*100+bd[1]*10+bd[2]); v=[Math.floor(r/100),Math.floor(r/10)%10,r%10]; rm=bd.slice(); } },
    strat(){ return moved?'trade':'no_trade'; }, goal:()=>({task,bd}), state:()=>({v:v.slice(),rm:rm.slice()}) };
  const m=m2make(o); m._o=o; return m; };
const M2_BLK_MIS={'모형을 바꾸지 않았어요':'N2-01','아직 10개가 넘는 자리가 있어요':'N2-01','자리마다 큰 수에서 작은 수를 뺐어요':'N2-02','덜어 낸 수가 빼는 수와 달라요':'N2-13'};
const _dg=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10], _NM3=['백','십','일'], _NMD=['일','0.1','0.01'], _dec=n=>(n/100).toFixed(2).replace(/0$/,'').replace(/\.0$/,'');
M2.qAddTidy=()=>{ const a=rnd(12,48)*10+rnd(3,9)-rnd(0,0), b=rnd(12,40)*10+rnd(3,9); const A=_dg(a), B=_dg(b), st=[A[0]+B[0],A[1]+B[1],A[2]+B[2]]; if(st[1]<=9&&st[2]<=9) return M2.qAddTidy(); if(st[0]>9) return M2.qAddTidy(); return m2q(`${a} + ${b} 를 수 모형으로 모았어요. 한 자리에 10개가 넘지 않도록 모형을 바꾸어 정리해 보세요.`,'일 모형 10개는 십 모형 1개, 십 모형 10개는 백 모형 1개와 같아요.',M2.blocks('tidy',st,null,_NM3),`${a} + ${b} = ${a+b}`,M2_BLK_MIS); };
M2.qSubTake=()=>{ const a=rnd(31,89)*10+rnd(0,6), b=rnd(11,Math.floor(a/10)-12)*10+rnd(7,9); const A=_dg(a), B=_dg(b); if(a-b<10||A[2]>=B[2]) return M2.qSubTake(); return m2q(`수 모형 ${a}에서 ${b}만큼 덜어 내 보세요. 모자라는 자리는 윗자리 모형을 바꾸어서 덜어요.`.replace(/(\d)에서/,'$1에서'),'일 모형이 모자라면 십 모형 1개를 일 모형 10개로 바꿔요.',M2.blocks('take',A,B,_NM3),`${a} − ${b} = ${a-b}`,M2_BLK_MIS); };
M2.qMulTidy=()=>{ const t=rnd(1,3), o=rnd(4,9), m=rnd(3,6); if(o*m<10) return M2.qMulTidy(); const a=10*t+o; return m2q(`${a}씩 ${m}묶음을 수 모형으로 모았더니 십 모형 ${t*m}개, 일 모형 ${o*m}개예요. 한 자리에 10개가 넘지 않도록 정리해 보세요.`,'일 모형 10개를 십 모형 1개로 바꿔요. 여러 번 바꿀 수 있어요.',M2.blocks('tidy',[0,t*m,o*m],null,_NM3),`${a} × ${m} = ${a*m}`,M2_BLK_MIS); };
M2.qDecTidy=()=>{ const a=rnd(11,48)*10+rnd(3,9), b=rnd(11,40)*10+rnd(3,9), A=_dg(a), B=_dg(b), st=[A[0]+B[0],A[1]+B[1],A[2]+B[2]]; if((st[1]<=9&&st[2]<=9)||st[0]>9) return M2.qDecTidy(); return m2q(`${_dec(a)} + ${_dec(b)} 를 소수 모형으로 모았어요. 한 자리에 10개가 넘지 않도록 바꾸어 정리해 보세요.`,'0.01 모형 10개는 0.1 모형 1개, 0.1 모형 10개는 1 모형 1개와 같아요.',M2.blocks('tidy',st,null,_NMD),`${_dec(a)} + ${_dec(b)} = ${_dec(a+b)}`,Object.assign({},M2_BLK_MIS,{'모형을 바꾸지 않았어요':'N4-03','아직 10개가 넘는 자리가 있어요':'N4-03'})); };
M2.qDecTake=()=>{ const a=rnd(21,89)*10+rnd(0,5), b=rnd(11,Math.floor(a/10)-8)*10+rnd(6,9), A=_dg(a), B=_dg(b); if(a-b<10||A[2]>=B[2]) return M2.qDecTake(); return m2q(`소수 모형 ${_dec(a)}에서 ${_dec(b)}만큼 덜어 내 보세요. 모자라는 자리는 윗자리 모형을 바꾸어서 덜어요.`,'0.01 모형이 모자라면 0.1 모형 1개를 0.01 모형 10개로 바꿔요.',M2.blocks('take',A,B,_NMD),`${_dec(a)} − ${_dec(b)} = ${_dec(a-b)}`,M2_BLK_MIS); };

/* ---------- E3. 계산 순서 누르기(혼합 계산) ---------- */
// toks: 수·연산 기호·괄호를 차례로 담은 배열. 연산 기호를 계산할 차례대로 누른다.
const m2order=toks=>{ const ops=[]; toks.forEach((t,i)=>{ if(/^[+−×÷]$/.test(String(t))) ops.push(i); }); const depth=[]; let d=0; toks.forEach((t,i)=>{ if(t==='(') d++; depth[i]=d; if(t===')') d--; });
  const rank=i=>-depth[i]*10-(/[×÷]/.test(toks[i])?1:0); return ops.slice().sort((x,y)=>(rank(x)-rank(y))||(x-y)); };
M2.order=toks=>{ const right=m2order(toks), ltr=right.slice().sort((a,b)=>a-b), noPar=(()=>{ const ops=ltr; const rk=i=>(/[×÷]/.test(toks[i])?0:1); return ops.slice().sort((x,y)=>(rk(x)-rk(y))||(x-y)); })(); let pick=[];
  const o={ draw(){ let h=`<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;font-size:1.2rem;max-width:340px">`+toks.map((t,i)=>{ if(/^[+−×÷]$/.test(String(t))){ const k=pick.indexOf(i); return `<span style="position:relative;display:inline-block">${m2b('o'+i,t,`font-size:1.2rem;min-width:42px;padding:4px 6px;${k>=0?'background:#FFD98A;border-color:#D45F16':''}`)}${k>=0?`<b style="position:absolute;top:-9px;right:-5px;background:#D45F16;color:#fff;border-radius:50%;width:20px;height:20px;font-size:.8rem;line-height:20px;text-align:center">${k+1}</b>`:''}</span>`; } return `<span style="padding:0 2px">${t}</span>`; }).join('')+`</div>`;
      h+=`<div style="display:flex;gap:8px;align-items:center">${m2b('reset','처음부터')}<span style="font-size:.9rem;color:#8A6A4A">먼저 계산할 기호부터 차례로 눌러요</span></div>`; return h; },
    on(a){ if(a==='reset'){ pick=[]; return; } const i=+a.slice(1), k=pick.indexOf(i); if(k>=0){ if(k===pick.length-1) pick.pop(); return; } pick.push(i); },
    check(){ return pick.length===right.length&&pick.every((x,i)=>x===right[i]); },
    wrong(){ if(pick.length<right.length) return null; const same=(a,b)=>a.every((x,i)=>x===b[i]); if(same(pick,ltr)&&!same(ltr,right)) return '앞에서부터 차례로 눌렀어요'; if(same(pick,noPar)&&!same(noPar,right)) return '괄호를 먼저 계산하지 않았어요'; return '순서가 달라요'; },
    reveal(){ pick=right.slice(); }, goal:()=>({right:right.slice(),ltr:ltr.slice()}), state:()=>({pick:pick.slice(),right:right.slice()}) };
  const m=m2make(o); m._o=o; return m; };
const M2_ORD_MIS={'앞에서부터 차례로 눌렀어요':'N5-01','괄호를 먼저 계산하지 않았어요':'N5-09','순서가 달라요':'N5-09'};
const m2val=toks=>{ const s=toks.join(' ').replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/'); return Function('"use strict";return ('+s+')')(); };
M2.qOrder=kind=>()=>{ for(let t=0;t<60;t++){ const a=rnd(12,40), b=rnd(2,9), c=rnd(2,9), d=rnd(2,6), e=rnd(2,9); let T;
    if(kind==='as') T=rndPick([a+b*3,'−',b*2,'+',c],[a,'+',b,'−',c],[a+20,'−',b,'−',c]);
    else if(kind==='md') T=rndPick([b*c,'÷',b,'×',d],[b,'×',c*d,'÷',d],[b*c*2,'÷',c,'÷',2]);
    else if(kind==='mix') T=rndPick([a,'+',b,'×',c],[a+b*c,'−',b,'×',c],[a,'+',b*c,'÷',b],[a,'−',b*c,'÷',c],[b,'×',c,'+',a]);
    else if(kind==='par') T=rndPick(['(',a,'+',b,')','×',c],[c,'×','(',a,'−',b,')'],[a+b*d,'−','(',b,'+',d,')'],['(',b*c+b,'−',b,')','÷',b],[a,'+',b,'×','(',c,'+',d,')']);
    else T=rndPick([a,'+',b*c,'÷',b,'×',d,'−',e],[a+50,'−',b,'×',c,'+',d*e,'÷',d],['(',a,'+',b,')','×',c,'−',d*e,'÷',e],[a,'+',b,'×','(',c*d,'−',d,')','÷',d]);
    let v; try{ v=m2val(T); }catch(x){ continue; } if(!Number.isInteger(v)||v<0) continue;
    /* 중간 결과도 음수·분수가 되지 않게: 올바른 차례로 한 걸음씩 계산해 본다 */
    const ok=(()=>{ let arr=T.slice(); for(let guard=0;guard<10;guard++){ const ord=m2order(arr); if(!ord.length) break; const i=ord[0], x=+arr[i-1], y=+arr[i+1], r=arr[i]==='+'?x+y:arr[i]==='−'?x-y:arr[i]==='×'?x*y:x/y; if(!Number.isInteger(r)||r<0) return false; arr.splice(i-1,3,r); for(let j=0;j<arr.length-2;j++) if(arr[j]==='('&&arr[j+2]===')'){ arr.splice(j,3,arr[j+1]); j=-1; } } return true; })(); if(!ok) continue;
    return m2q('계산할 차례대로 기호를 눌러 보세요.',kind==='as'||kind==='md'?'같은 종류의 계산만 있으면 앞에서부터 차례로 계산해요.':'괄호 안 → 곱셈·나눗셈 → 덧셈·뺄셈 차례로 계산해요.',M2.order(T),`${T.join(' ')} = ${v}`,M2_ORD_MIS); } return null; };

/* ---------- E4. 넓이 모델 칠하기(분수 × 분수) ---------- */
M2.area=(c,r,a,b)=>{ const on=new Set(), key=(x,y)=>x+','+y, u=Math.min(40,Math.floor(300/c));
  const o={ draw(){ let g=''; for(let y=0;y<r;y++) for(let x=0;x<c;x++){ const inA=x<a, inB=y<b, k=key(x,y), f=on.has(k)?'#E8873A':inA&&inB?'#FFF':inA?'#FFF4D6':inB?'#E3F1FA':'#fff'; g+=`<rect data-ma="c${k}" x="${4+x*u}" y="${4+y*u}" width="${u}" height="${u}" fill="${f}" stroke="#B89A72" stroke-width="1.4" style="cursor:pointer"/>`; }
      g+=`<rect x="4" y="4" width="${a*u}" height="${r*u}" fill="none" stroke="#E0A020" stroke-width="3"/><rect x="4" y="4" width="${c*u}" height="${b*u}" fill="none" stroke="#3F8FD0" stroke-width="3" stroke-dasharray="6 4"/>`;
      return `<svg viewBox="0 0 ${c*u+8} ${r*u+8}" style="width:100%;max-width:${c*u+8}px;touch-action:manipulation">${g}</svg><div style="font-size:.88rem;color:#8A6A4A;text-align:center">노란 테두리: 가로로 ${c}분의 ${a} · 파란 점선: 세로로 ${r}분의 ${b}<br>두 테두리가 겹치는 칸만 눌러 칠해요 (${on.size}칸 칠함) ${m2b('clr','지우기','font-size:.78rem;min-height:32px;padding:2px 8px')}</div>`; },
    on(act){ if(act==='clr'){ on.clear(); return; } const k=act.slice(1); on.has(k)?on.delete(k):on.add(k); },
    check(){ if(on.size!==a*b) return false; for(let y=0;y<b;y++) for(let x=0;x<a;x++) if(!on.has(key(x,y))) return false; return true; },
    wrong(){ const inter=[...on].filter(k=>{ const [x,y]=k.split(',').map(Number); return x<a&&y<b; }).length, uni=a*r+b*c-a*b; if(on.size===uni&&inter===a*b) return '두 테두리 안을 모두 칠했어요'; if(on.size===a+b) return '분자끼리 더한 만큼 칠했어요'; if(inter===on.size&&on.size<a*b) return '겹치는 칸을 다 칠하지 않았어요'; return '겹치지 않는 칸을 칠했어요'; },
    reveal(){ on.clear(); for(let y=0;y<b;y++) for(let x=0;x<a;x++) on.add(key(x,y)); }, goal:()=>({a,b,c,r}), state:()=>({n:on.size}) };
  const m=m2make(o); m._o=o; return m; };
M2.qArea=()=>{ const c=rnd(3,6), r=rnd(2,5), a=rnd(1,c-1), b=rnd(1,r-1); if(a*b===a+b) return M2.qArea(); return m2q(`${c}분의 ${a} × ${r}분의 ${b} 를 그림으로 알아봐요. 노란 테두리와 파란 점선이 겹치는 칸을 칠해 보세요.`,`전체는 ${c*r}칸이에요. 겹치는 칸이 곱이에요.`,M2.area(c,r,a,b),`${c*r}분의 ${a*b}`,{'두 테두리 안을 모두 칠했어요':'N5-04','분자끼리 더한 만큼 칠했어요':'N5-04','겹치지 않는 칸을 칠했어요':'N5-05','겹치는 칸을 다 칠하지 않았어요':'N3-07'}); };

/* ---------- E5. 양팔저울(등호의 뜻) ---------- */
M2.balance=(L,R,ans)=>{ let x=0; const sumL=L.reduce((p,q)=>p+q,0), sumR=R.reduce((p,q)=>p+q,0);
  const o={ draw(){ const diff=sumL-(sumR+x), tilt=Math.max(-12,Math.min(12,diff*1.5)), pan=(cx,ws,un)=>`<g transform="translate(${cx} 0)"><path d="M-46 0 Q0 26 46 0" fill="#F4E3C1" stroke="#7A4A1E" stroke-width="2"/>${ws.map((w,i)=>`<g transform="translate(${-30+i*30+(ws.length===1?30:0)} -6)"><rect x="-13" y="-22" width="26" height="22" rx="4" fill="${un&&i===ws.length-1?'#FFD98A':'#C9D8E8'}" stroke="#4A2E14" stroke-width="1.5"/><text x="0" y="-6" font-size="12" text-anchor="middle" font-weight="700" fill="#4A2E14">${w}</text></g>`).join('')}</g>`;
      const rad=tilt*Math.PI/180, dy=100*Math.sin(rad), dx=100*Math.cos(rad), lx=150-dx, ly=44+dy, rx=150+dx, ry=44-dy;
      const g=`<line x1="150" y1="118" x2="150" y2="44" stroke="#7A4A1E" stroke-width="5"/><rect x="118" y="116" width="64" height="8" rx="3" fill="#7A4A1E"/><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#7A4A1E" stroke-width="5" stroke-linecap="round"/><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${lx.toFixed(1)}" y2="${(ly+34).toFixed(1)}" stroke="#7A4A1E" stroke-width="1.5"/><line x1="${rx.toFixed(1)}" y1="${ry.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${(ry+34).toFixed(1)}" stroke="#7A4A1E" stroke-width="1.5"/><g transform="translate(${(lx-70).toFixed(1)} ${(ly+34).toFixed(1)})">${pan(70,L,false)}</g><g transform="translate(${(rx-230).toFixed(1)} ${(ry+34).toFixed(1)})">${pan(230,R.concat([x||'?']),true)}</g>`;
      return `<svg viewBox="0 0 300 140" style="width:100%;max-width:320px">${g}</svg><div style="font-size:1.15rem">${L.join(' + ')} = ${R.concat(['□']).join(' + ')}</div><div style="display:flex;gap:6px;align-items:center">${m2b('m5','−5')}${m2b('m1','−1')}<b style="font-size:1.3rem;min-width:54px;text-align:center">□ = ${x}</b>${m2b('p1','+1')}${m2b('p5','+5')}</div><div style="font-size:.88rem;color:#8A6A4A">노란 추의 무게를 바꾸어 저울이 수평이 되게 해요</div>`; },
    on(a){ const d={m5:-5,m1:-1,p1:1,p5:5}[a]||0; x=Math.max(0,Math.min(60,x+d)); },
    check(){ return sumL===sumR+x; }, wrong(){ if(x===sumL) return '왼쪽 계산의 답을 썼어요'; if(x===sumL+sumR) return '수를 모두 더했어요'; return '저울이 수평이 아니에요'; },
    reveal(){ x=ans; }, goal:()=>({x:ans,sumL,sumR}), state:()=>({x}) };
  const m=m2make(o); m._o=o; return m; };
M2.qBalance=()=>{ const a=rnd(6,15), b=rnd(3,9), c=rnd(2,a+b-2), ans=a+b-c; if(ans===a+b||ans<=0) return M2.qBalance(); return m2q(`저울이 수평이 되도록 노란 추의 무게를 정해 보세요. ${a} + ${b} = ${c} + □`,'등호(=)는 양쪽의 무게가 같다는 뜻이에요.',M2.balance([a,b],[c],ans),`□ = ${ans} (양쪽 모두 ${a+b})`,{'왼쪽 계산의 답을 썼어요':'R4-02','수를 모두 더했어요':'R4-02','저울이 수평이 아니에요':'R4-02'}); };

/* ---------- E6. 직사각형으로 늘어놓기(약수) ---------- */
M2.array=N=>{ let w=1; const saved=new Set(), divs=[]; for(let i=1;i<=N;i++) if(N%i===0) divs.push(i);
  const o={ draw(){ const rows=Math.floor(N/w), rem=N%w, u=Math.max(7,Math.min(18,Math.floor(280/Math.max(w,6)))); let g=''; for(let i=0;i<N;i++){ const x=i%w, y=Math.floor(i/w), last=y===rows&&rem; g+=`<rect x="${2+x*u}" y="${2+y*u}" width="${u-2}" height="${u-2}" rx="2" fill="${last?'#E4604E':'#F2A65A'}" stroke="#7A4A1E" stroke-width="1"/>`; }
      const H=(rows+(rem?1:0))*u+4; return `<svg viewBox="0 0 ${Math.max(w,6)*u+4} ${Math.min(H,400)}" style="width:100%;max-width:300px;max-height:190px">${g}</svg><div style="display:flex;gap:6px;align-items:center">${m2b('m1','한 줄에 −1')}<b style="font-size:1.1rem;min-width:110px;text-align:center">한 줄에 ${w}개${rem?` · ${rem}개 남음`:` · ${rows}줄`}</b>${m2b('p1','한 줄에 +1')}</div><div>${m2b('save',rem?'남는 것이 있어요':'이 모양 담기 ✓',rem?'opacity:.5':'background:#FFD98A')}</div><div style="font-size:.95rem;text-align:center">담은 모양(한 줄의 수): <b>${[...saved].sort((a,b)=>a-b).join(', ')||'없음'}</b> ${m2b('undo','하나 빼기','font-size:.78rem;min-height:32px;padding:2px 8px')}</div>`; },
    on(a){ if(a==='m1') w=Math.max(1,w-1); else if(a==='p1') w=Math.min(N,w+1); else if(a==='save'){ if(N%w===0) saved.add(w); } else if(a==='undo'){ const l=[...saved].pop(); if(l!=null) saved.delete(l); } },
    check(){ return saved.size===divs.length; },
    wrong(){ if(!saved.size) return null; const miss=divs.filter(d=>!saved.has(d)); if(miss.length&&miss.every(d=>d===1||d===N)) return '1줄짜리와 1개씩 놓는 모양을 빠뜨렸어요'; return '빠뜨린 모양이 있어요'; },
    reveal(){ divs.forEach(d=>saved.add(d)); }, goal:()=>({divs:divs.slice(),N}), state:()=>({w,saved:[...saved]}) };
  const m=m2make(o); m._o=o; return m; };
M2.qArray=()=>{ const N=rndPick(12,16,18,20,24,28,30); return m2q(`타일 ${N}개를 남김없이 직사각형 모양으로 놓는 방법을 모두 찾아 담아 보세요. (한 줄에 놓는 수를 바꾸어 가며 찾아요.)`,`한 줄에 1개부터 ${N}개까지 차례로 해 보면 빠뜨리지 않아요.`,M2.array(N),`${N}의 약수: ${(()=>{ const d=[]; for(let i=1;i<=N;i++) if(N%i===0) d.push(i); return d.join(', '); })()}`,{'1줄짜리와 1개씩 놓는 모양을 빠뜨렸어요':'N5-10','빠뜨린 모양이 있어요':'N5-19'}); };

/* ---------- E7. 섞기(비 · 진하기) ---------- */
M2.mix=(mode,p)=>{ let x=mode==='ratio'?p.x0:0, y=mode==='ratio'?p.y0:0;
  const cup=(n,col)=>`<span style="display:inline-block;line-height:1;font-size:.95rem;color:${col}">${'●'.repeat(Math.min(n,24))||'<span style="color:#B9A888">없음</span>'}</span>`;
  const o={ draw(){ const A=p.names[0], B=p.names[1], st=mode==='ratio'?1:p.step; return `<div style="display:flex;gap:10px;justify-content:center;width:100%;max-width:340px">`+[[A,x,'#E8873A','x'],[B,y,'#4F8FD9','y']].map(([n,v,col,k])=>`<div style="flex:1;background:#fff;border:2px solid #E3CFA8;border-radius:12px;padding:6px;text-align:center"><div>${n} <b>${v}${p.unit}</b></div><div style="min-height:22px">${cup(mode==='ratio'?v:Math.round(v/st),col)}</div><div style="display:flex;gap:6px;justify-content:center;margin-top:4px">${m2b(k+'m','−')}${m2b(k+'p','+')}</div></div>`).join('')+`</div><div style="font-size:.95rem">${mode==='ratio'?`지금 ${A} : ${B} = ${x} : ${y}`:`${A} ${x} g + ${B} ${y} g = 모두 ${x+y} g`}</div>`; },
    on(a){ const st=mode==='ratio'?1:p.step, d=a[1]==='p'?st:-st; if(a[0]==='x') x=Math.max(mode==='ratio'?p.x0:0,Math.min(p.max,x+d)); else y=Math.max(mode==='ratio'?p.y0:0,Math.min(p.max,y+d)); },
    check(){ if(mode==='ratio') return x*p.b===y*p.a&&x+y===p.total; return x+y===p.total&&x*100===p.pct*p.total; },
    wrong(){ if(mode==='ratio'){ if(x*p.b===y*p.a) return '비는 맞지만 전체 양이 달라요'; if(x*p.a===y*p.b) return '두 양의 순서를 바꿨어요'; if(x-y===p.a-p.b&&x!==p.a) return '두 양의 차이만 맞췄어요'; if(x+y===p.total) return '전체 양만 맞췄어요'; return '비가 달라요'; }
      if(x*100===p.pct*p.total&&y===p.total) return '물의 양을 전체 양으로 넣었어요'; if(x===p.pct&&x+y===p.total&&p.total!==100) return '퍼센트 수를 그대로 넣었어요'; if(x+y===p.total) return '전체 양만 맞췄어요'; return '진하기가 달라요'; },
    reveal(){ if(mode==='ratio'){ x=p.a*p.total/(p.a+p.b); y=p.b*p.total/(p.a+p.b); } else { x=p.pct*p.total/100; y=p.total-x; } }, goal:()=>mode==='ratio'?{x:p.a*p.total/(p.a+p.b),y:p.b*p.total/(p.a+p.b),a:p.a,b:p.b,x0:p.x0,y0:p.y0}:{x:p.pct*p.total/100,y:p.total-p.pct*p.total/100,pct:p.pct,total:p.total}, state:()=>({x,y}) };
  const m=m2make(o); m._o=o; return m; };
M2.qRatio=()=>{ const [a,b]=rndPick([1,2],[1,3],[2,3],[3,2],[1,4],[3,4]), k=rnd(2,4), total=(a+b)*k; return m2q(`원액 ${a}컵에 물 ${b}컵을 섞은 주스가 있어요(원액 : 물 = ${a} : ${b}). 같은 맛으로 모두 ${total}컵이 되도록 원액과 물을 더 넣어 보세요.`,`같은 맛이 되려면 원액과 물을 같은 배로 늘려요.`,M2.mix('ratio',{a,b,x0:a,y0:b,total,max:total,names:['원액','물'],unit:'컵'}),`원액 ${a*k}컵, 물 ${b*k}컵`,{'두 양의 순서를 바꿨어요':'R6-01','두 양의 차이만 맞췄어요':'R6-10','전체 양만 맞췄어요':'R6-15','비는 맞지만 전체 양이 달라요':'R6-15','비가 달라요':'R6-10'}); };
M2.qSalt=()=>{ const total=rndPick(100,200), pct=rndPick(10,20,30,40), step=total/20; return m2q(`진하기가 ${pct}%인 소금물 ${total} g을 만들어 보세요. 소금과 물을 알맞게 넣어요.`,`진하기는 소금물 전체(${total} g)에 대한 소금의 양이에요.`,M2.mix('salt',{total,pct,step,max:total,names:['소금','물'],unit:' g'}),`소금 ${pct*total/100} g, 물 ${total-pct*total/100} g`,{'물의 양을 전체 양으로 넣었어요':'R6-08','퍼센트 수를 그대로 넣었어요':'R6-06','전체 양만 맞췄어요':'R6-08','진하기가 달라요':'R6-08'}); };


/* ---------- E9. 소수점 찍기(소수의 곱셈·나눗셈) — 제미나이 제안(가벼운 화면으로 연산 편을 넓게 덮음) ---------- */
// digits: 자연수끼리 계산한 결과의 숫자들(앞에 0을 채움). 숫자 사이를 눌러 소수점을 찍는다. pos: 정답 자리(앞에서 pos번째 숫자 뒤)
M2.point=(digits,pos,alts)=>{ let at=0;   /* 0 = 아직 안 찍음 */
  const o={ draw(){ let h=`<div style="display:flex;align-items:flex-end;justify-content:center;font-size:2rem;line-height:1">`; for(let i=0;i<digits.length;i++){ h+=`<span style="display:inline-block;min-width:26px;text-align:center;padding:4px 0;border-bottom:3px solid #C9A56B">${digits[i]}</span>`; if(i<digits.length-1) h+=m2b('g'+(i+1),at===i+1?'<b style="color:#D45F16;font-size:2rem">.</b>':'<span style="color:#D9C3A0">·</span>','min-width:40px;min-height:48px;padding:0;border-style:dashed;'+(at===i+1?'background:#FFD98A;border-color:#D45F16':'')); }
      return h+`</div><div style="font-size:.9rem;color:#8A6A4A">숫자 사이를 눌러 소수점을 찍어요. 다시 누르면 지워져요.</div>`; },
    on(a){ const i=+a.slice(1); at=at===i?0:i; }, check(){ return at===pos; },
    wrong(){ if(!at) return null; return (alts&&alts[at])||'소수점의 자리가 달라요'; }, reveal(){ at=pos; }, goal:()=>({pos,alts:alts||{}}), state:()=>({at}) };
  const m=m2make(o); m._o=o; return m; };
const _dstr=(n,d)=>d?(n/Math.pow(10,d)).toFixed(d):String(n);
M2.qPointMul=()=>{ const da=rndPick(1,1,2), db=rndPick(0,1,1,2); if(da+db>3) return M2.qPointMul(); const A=da===1?rnd(2,9)+rndPick(0,0,10,20,30):rnd(2,9)+rndPick(0,10,20), B=db===0?rnd(2,9):db===1?rnd(2,9):rnd(2,9); const P=A*B; if(P%10===0) return M2.qPointMul();
  const d=da+db, digits=String(P).padStart(d+1,'0').split(''), pos=digits.length-d, alts={}; const mx=digits.length-Math.max(da,db), ad=digits.length-Math.abs(da-db); if(mx!==pos&&mx>=1&&mx<digits.length) alts[mx]='소수 자릿수가 많은 쪽만 따랐어요'; for(let i=1;i<digits.length;i++) if(i!==pos&&!alts[i]) alts[i]='소수점의 자리가 달라요';
  return m2q(`${A} × ${B} = ${P} 이에요. ${_dstr(A,da)} × ${_dstr(B,db)} 의 곱이 되도록 소수점을 찍어 보세요.`,`곱하는 두 수의 소수점 아래 자리 수를 더한 만큼(${da} + ${db} = ${d}자리) 소수점 아래 자리가 생겨요.`,M2.point(digits,pos,alts),`${_dstr(A,da)} × ${_dstr(B,db)} = ${_dstr(P,d)}`,{'소수 자릿수가 많은 쪽만 따랐어요':'N5-07','소수점의 자리가 달라요':'N5-07'}); };
M2.qPointDiv=()=>{ const d=rndPick(1,1,2), n=rnd(2,9), Q=d===1?rnd(12,98):rnd(12,98), A=Q*n; if(Q%10===0||A>=1000) return M2.qPointDiv(); const digits=String(Q).padStart(d+1,'0').split(''), pos=digits.length-d, alts={}; for(let i=1;i<digits.length;i++) if(i!==pos) alts[i]='소수점의 자리가 달라요';
  if(digits.length<3&&d===1) { digits.unshift('0'); return _m2PointDivFix(d,n,Q,A); }
  return m2q(`${A} ÷ ${n} = ${Q} 이에요. ${_dstr(A,d)} ÷ ${n} 의 몫이 되도록 소수점을 찍어 보세요.`,`나누어지는 수가 ${Math.pow(10,d)}분의 1이 되면 몫도 ${Math.pow(10,d)}분의 1이 돼요.`,M2.point(digits,pos,alts),`${_dstr(A,d)} ÷ ${n} = ${_dstr(Q,d)}`,{'소수점의 자리가 달라요':'N6-07'}); };
const _m2PointDivFix=(d,n,Q,A)=>{ const digits=String(Q).padStart(d+2,'0').split(''), pos=digits.length-d, alts={}; for(let i=1;i<digits.length;i++) if(i!==pos) alts[i]='소수점의 자리가 달라요';
  return m2q(`${A} ÷ ${n} = ${Q} 이에요. ${_dstr(A,d)} ÷ ${n} 의 몫이 되도록 소수점을 찍어 보세요. (맨 앞의 0은 자리를 맞추려고 채운 거예요.)`,`나누어지는 수가 ${Math.pow(10,d)}분의 1이 되면 몫도 ${Math.pow(10,d)}분의 1이 돼요.`,M2.point(digits,pos,alts),`${_dstr(A,d)} ÷ ${n} = ${_dstr(Q,d)}`,{'소수점의 자리가 달라요':'N6-07'}); };
/* ---------- 편에 넣기(맨 끝에 추가) ---------- */
try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  add('S2-08',M2.qShare); add('S2-09',M2.qMeasure); add('S2-11',M2.qShare); add('S2-11',M2.qMeasure); add('S2-10',M2.qBuild); add('S3-29',M2.qShareRem); add('S3-29',M2.qMeasureRem); add('S3-30',M2.qShareRem); add('S3-33',M2.qMeasureRem);
  add('S2-02',M2.qAddTidy); add('S2-03',M2.qAddTidy); add('S2-05',M2.qSubTake); add('S2-06',M2.qSubTake); add('S2-14',M2.qMulTidy); add('S2-15',M2.qMulTidy); add('S2-16',M2.qMulTidy); add('S3-60',M2.qDecTidy); add('S3-61',M2.qDecTidy); add('S3-62',M2.qDecTake);
  add('S3-63',M2.qOrder('as')); add('S3-64',M2.qOrder('md')); add('S3-65',M2.qOrder('mix')); add('S3-66',M2.qOrder('par')); add('S3-67',M2.qOrder('all')); add('S3-113',M2.qOrder('all'));
  add('S3-91',M2.qArea); add('S5-09',M2.qBalance); add('S5-10',M2.qBalance); add('S3-68',M2.qArray); add('S3-70',M2.qArray);
  add('S3-93',M2.qPointMul); add('S3-94',M2.qPointMul); add('S3-95',M2.qPointMul); add('S3-96',M2.qPointMul); add('S3-100',M2.qPointDiv); add('S3-101',M2.qPointDiv); add('S3-103',M2.qPointDiv);
  add('S5-13',M2.qRatio); add('S5-18',M2.qRatio); add('S5-21',M2.qRatio); add('S5-16',M2.qSalt);
}catch(e){}
window._M2=M2;
