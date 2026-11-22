
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
const M2={}, _m2gcd=(a,b)=>{ while(b){ [a,b]=[b,a%b]; } return a; }, _m2lcm=(a,b)=>a*b/_m2gcd(a,b);
const m2css='font-family:Jua,sans-serif;color:#4A2E14', m2b=(act,lab,st)=>`<button type="button" data-ma="${act}" style="font-family:Jua,sans-serif;font-size:1rem;min-width:44px;min-height:44px;padding:6px 10px;border-radius:12px;border:2px solid #C9A56B;background:#FFF8EC;color:#4A2E14;cursor:pointer;touch-action:manipulation;${st||''}">${lab}</button>`;
const m2wrap=inner=>`<div class="m2" style="${m2css};display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;-webkit-user-select:none;user-select:none;touch-action:manipulation">${inner}</div>`;
// 공통 틀: st(상태)와 draw()만 주면 누르기·다시 그리기를 맡는다. on(act, 누른 단추)에서 상태를 바꾼다.
const m2style=()=>{ try{ if(document.getElementById('m2css')) return; const st=document.createElement('style'); st.id='m2css'; st.textContent=`.m2 button[data-ma]{transition:transform .08s ease,background-color .15s ease,border-color .15s ease,box-shadow .15s ease;box-shadow:0 2px 0 #DCC79E}.m2 button[data-ma]:active{transform:translateY(2px) scale(.96);box-shadow:0 0 0 #DCC79E}.m2 svg [data-ma]{transition:fill .15s ease}@keyframes m2pop{0%{transform:scale(.88)}60%{transform:scale(1.06)}100%{transform:scale(1)}}.m2 .m2-pop{animation:m2pop .2s ease-out}@keyframes m2ok{0%{box-shadow:0 0 0 0 rgba(91,168,91,.55)}100%{box-shadow:0 0 0 22px rgba(91,168,91,0)}}.m2.m2-ok{animation:m2ok .8s ease-out;border-radius:16px}@keyframes m2no{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}.m2.m2-no{animation:m2no .35s ease-in-out}@media (prefers-reduced-motion:reduce){.m2 *,.m2{animation:none!important;transition:none!important}}`; document.head.appendChild(st); }catch(e){} };
const m2make=(o)=>{ const m={ html:m2wrap(o.draw()), _root:null,
    mount(root){ m._root=root; m2style(); try{ if(o.tiltTarget) o._last=o.tiltTarget(); }catch(e){} root.addEventListener('click',e=>{ const b=e.target&&e.target.closest?e.target.closest('[data-ma]'):null; if(!b||!root.contains(b)||m._lock) return; e.preventDefault(); const act=b.dataset.ma; try{ o.on(act,b); }catch(err){} if(o.tiltTarget&&o._shown==null) o._shown=o._last==null?o.tiltTarget():o._last; m.redraw(); m._pop(act); m._tween(); if(o.tiltTarget) o._last=o.tiltTarget(); }); },
    _pop(act){ try{ const el=m._root&&[...m._root.querySelectorAll('[data-ma]')].find(x=>x.dataset.ma===act); if(el&&el.tagName==='BUTTON'){ el.classList.add('m2-pop'); } }catch(e){} },
    /* 저울처럼 기울기가 있는 판: 목표 기울기까지 몇 장면에 걸쳐 움직임(값 판정과는 무관, 보이는 것만) */
    _tween(){ if(!o.tiltTarget||typeof requestAnimationFrame!=='function') return; const to=o.tiltTarget(), from=o._shown==null?to:o._shown; if(Math.abs(to-from)<.01){ o._shown=to; return; } const id=(m._tw=(m._tw||0)+1), t0=Date.now(), D=260; /* 장면마다 그림(svg)만 바꾼다: 단추까지 다시 그리면 누르는 도중에 단추가 바뀌어 누름이 사라질 수 있음 */ const paint=()=>{ try{ const h=o.draw(), i=h.indexOf('<svg'), j=h.indexOf('</svg>'), cur=m._root&&m._root.querySelector('svg'); if(cur&&i>=0&&j>i){ const tmp=document.createElement('div'); tmp.innerHTML=h.slice(i,j+6); const ns=tmp.firstElementChild; if(ns) cur.innerHTML=ns.innerHTML; } }catch(e){} }; const step=()=>{ if(id!==m._tw) return; const k=Math.min(1,(Date.now()-t0)/D), e=1-Math.pow(1-k,3); o._shown=from+(to-from)*e; paint(); if(k<1) requestAnimationFrame(step); }; o._shown=from; paint(); requestAnimationFrame(step); },
    redraw(){ if(m._root) m._root.innerHTML=m2wrap(o.draw()); },
    check(){ let ok=false; try{ ok=!!o.check(); }catch(e){} try{ window.__manipStrat=o.strat?o.strat():null; }catch(e){} try{ const w=m._root&&m._root.querySelector('.m2'); if(w){ w.classList.remove('m2-ok','m2-no'); void w.offsetWidth; w.classList.add(ok?'m2-ok':'m2-no'); } }catch(e){} return ok; },
    wrong(){ try{ return o.wrong?o.wrong():null; }catch(e){ return null; } },
    reveal(){ try{ o.reveal&&o.reveal(); }catch(e){} m._lock=true; m._tw=(m._tw||0)+1; o._shown=null; m.redraw(); }, state:()=>o.state?o.state():null, goal:()=>o.goal?o.goal():null };
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

// ===== manip2 이어서(11/23 새벽): 도형·자료·규칙 영역의 누르기 엔진 — 제미나이 제안(카드 모두 고르기, 눈금·칸 찍기, 자르는 선 고르기) =====
// 이 아래 엔진은 goal()이 {taps:[정답까지 누를 단추], mis:[오개념 상태까지 누를 단추], misName} 을 돌려준다(자동 검사 로봇이 그대로 누름).
/* ---------- E11. 조건에 맞는 것을 모두 고르기 ---------- */
const _m2rot=(P,deg,cx,cy)=>{ const t=deg*Math.PI/180; return P.map(([x,y])=>[cx+(x-cx)*Math.cos(t)-(y-cy)*Math.sin(t),cy+(x-cx)*Math.sin(t)+(y-cy)*Math.cos(t)]); };
const _m2fit=(P,W,H,pad)=>{ const xs=P.map(p=>p[0]), ys=P.map(p=>p[1]), x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys), s=Math.min((W-2*pad)/(x1-x0||1),(H-2*pad)/(y1-y0||1)), ox=(W-(x1-x0)*s)/2, oy=(H-(y1-y0)*s)/2; return P.map(([x,y])=>[(ox+(x-x0)*s).toFixed(1),(oy+(y-y0)*s).toFixed(1)]); };
const _m2poly=(P,deg,open)=>{ const Q=_m2fit(_m2rot(P,deg||0,50,40),96,76,8); return `<svg viewBox="0 0 96 76" width="84" height="66"><${open?'polyline':'polygon'} points="${Q.map(p=>p.join(',')).join(' ')}" fill="${open?'none':'#FFE3B0'}" stroke="#7A4A1E" stroke-width="2.2" stroke-linejoin="round"/></svg>`; };
const _m2reg=n=>Array.from({length:n},(_,i)=>[50+30*Math.sin(2*Math.PI*i/n),40-30*Math.cos(2*Math.PI*i/n)]);
const SHP2={ rect:[[10,20],[90,20],[90,60],[10,60]], square:[[20,10],[80,10],[80,70],[20,70]], rhombus:[[50,8],[88,40],[50,72],[12,40]], para:[[28,18],[92,18],[72,62],[8,62]], trap:[[30,18],[70,18],[92,62],[8,62]], trapR:[[20,18],[60,18],[92,62],[20,62]], quad:[[16,20],[72,10],[88,66],[40,50]], kite:[[50,6],[74,30],[50,74],[26,30]],
  triEq:[[50,8],[87,72],[13,72]], triIso:[[50,6],[74,72],[26,72]], triRight:[[14,12],[14,70],[86,70]], triRightIso:[[20,14],[20,70],[76,70]], triAcute:[[36,8],[90,70],[10,60]], triObt:[[6,62],[94,62],[26,34]], triThin:[[6,58],[94,50],[60,66]],
  pent:_m2reg(5), hexa:_m2reg(6), pentIrr:[[20,16],[70,10],[92,44],[60,72],[12,60]] };
const _m2curve=`<svg viewBox="0 0 96 76" width="84" height="66"><path d="M16 62 L80 62 Q62 34 48 12 Z" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2.2" stroke-linejoin="round"/><path d="M48 12 Q20 30 16 62" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2.2"/></svg>`;
const _m2angle=(deg,rot)=>{ const r=rot*Math.PI/180, a=(rot-deg)*Math.PI/180, O=[48,46], p1=[O[0]+34*Math.cos(r),O[1]+34*Math.sin(r)], p2=[O[0]+34*Math.cos(a),O[1]+34*Math.sin(a)], q1=[O[0]+12*Math.cos(r),O[1]+12*Math.sin(r)], q2=[O[0]+12*Math.cos(a),O[1]+12*Math.sin(a)]; return `<svg viewBox="0 0 96 86" width="84" height="74"><path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${O[0]} ${O[1]} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="#7A4A1E" stroke-width="2.4" stroke-linecap="round"/><path d="M${q1[0].toFixed(1)} ${q1[1].toFixed(1)} A12 12 0 ${deg>180?1:0} 0 ${q2[0].toFixed(1)} ${q2[1].toFixed(1)}" fill="none" stroke="#D45F16" stroke-width="1.8"/></svg>`; };
const _m2circ=(kind,deg)=>{ const t=deg*Math.PI/180, c=Math.cos(t), s=Math.sin(t), O=[48,38], R=28; let x1,y1,x2,y2; if(kind==='dia'){ x1=O[0]-R*c; y1=O[1]-R*s; x2=O[0]+R*c; y2=O[1]+R*s; } else if(kind==='rad'){ x1=O[0]; y1=O[1]; x2=O[0]+R*c; y2=O[1]+R*s; } else { const d=12, h=Math.sqrt(R*R-d*d); x1=O[0]-d*s-h*c; y1=O[1]+d*c-h*s; x2=O[0]-d*s+h*c; y2=O[1]+d*c+h*s; } return `<svg viewBox="0 0 96 76" width="84" height="66"><circle cx="48" cy="38" r="28" fill="#FFF8EC" stroke="#7A4A1E" stroke-width="2"/><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#D45F16" stroke-width="2.6" stroke-linecap="round"/><circle cx="48" cy="38" r="2.6" fill="#4A2E14"/></svg>`; };
M2.pick=items=>{ const sel=new Set();
  const o={ draw(){ return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:330px;width:100%">`+items.map((it,i)=>m2b('k'+i,it.svg,`padding:4px;min-height:76px;background:${sel.has(i)?'#FFD98A':'#fff'};border-color:${sel.has(i)?'#D45F16':'#E3CFA8'};border-width:${sel.has(i)?3:2}px`)).join('')+`</div><div style="font-size:.9rem;color:#8A6A4A">맞는 것을 모두 눌러요. 다시 누르면 빠져요. (${sel.size}개 고름)</div>`; },
    on(a){ const i=+a.slice(1); sel.has(i)?sel.delete(i):sel.add(i); },
    check(){ return items.every((it,i)=>!!it.ok===sel.has(i)); },
    wrong(){ if(!sel.size) return null; const h=items.find((it,i)=>!it.ok&&sel.has(i)&&it.hit); if(h) return h.hit; const m=items.find((it,i)=>it.ok&&!sel.has(i)&&it.miss); if(m) return m.miss; return null; },
    reveal(){ sel.clear(); items.forEach((it,i)=>{ if(it.ok) sel.add(i); }); },
    goal(){ const taps=items.map((it,i)=>it.ok?'k'+i:null).filter(Boolean); let mis=null, misName=null; const hi=items.findIndex(it=>!it.ok&&it.hit), mi=items.findIndex(it=>it.ok&&it.miss);
      if(hi>=0){ mis=taps.concat(['k'+hi]); misName=items[hi].hit; } else if(mi>=0){ mis=taps.filter(t=>t!=='k'+mi); misName=items[mi].miss; if(!mis.length){ mis=null; misName=null; } } return {taps,mis,misName}; },
    state:()=>({sel:[...sel].sort((a,b)=>a-b)}) };
  const m=m2make(o); m._o=o; return m; };
const _m2pk=(svg,ok,miss,hit)=>({svg,ok:!!ok,miss:miss||null,hit:hit||null});
const _m2S=(k,deg)=>_m2poly(SHP2[k],deg||0);
const M2_PICK={ /* [문제 글, 도움말, 보기들(), 오개념 표] */
  rect:['직사각형을 모두 골라 보세요.','네 각이 모두 직각인 사각형이 직사각형이에요.',()=>[_m2pk(_m2S('rect'),1),_m2pk(_m2S('rect',28),1,'기울어진 직사각형을 빼놓았어요'),_m2pk(_m2S('square'),1,'정사각형을 빼놓았어요'),_m2pk(_m2S('para'),0),_m2pk(_m2S('trap'),0),_m2pk(_m2S('rhombus'),0)],{'기울어진 직사각형을 빼놓았어요':'G3-02','정사각형을 빼놓았어요':'G3-03'}],
  rightTri:['직각삼각형을 모두 골라 보세요.','한 각이 직각인 삼각형이 직각삼각형이에요. 돌려 놓아도 직각은 직각이에요.',()=>[_m2pk(_m2S('triRight'),1),_m2pk(_m2S('triRight',rndPick(35,140,200)),1,'기울어진 직각삼각형을 빼놓았어요'),_m2pk(_m2S('triAcute'),0),_m2pk(_m2S('triObt'),0),_m2pk(_m2S('triEq'),0),_m2pk(_m2S('triRightIso',rndPick(45,225)),1,'기울어진 직각삼각형을 빼놓았어요')],{'기울어진 직각삼각형을 빼놓았어요':'G3-02'}],
  para:['평행사변형을 모두 골라 보세요.','마주 보는 두 쌍의 변이 서로 평행한 사각형이 평행사변형이에요.',()=>[_m2pk(_m2S('para'),1),_m2pk(_m2S('rect'),1,'직사각형·마름모·정사각형도 평행사변형이에요'),_m2pk(_m2S('rhombus'),1,'직사각형·마름모·정사각형도 평행사변형이에요'),_m2pk(_m2S('square'),1,'직사각형·마름모·정사각형도 평행사변형이에요'),_m2pk(_m2S('trap'),0,null,'한 쌍만 평행한 사각형을 골랐어요'),_m2pk(_m2S('quad'),0)],{'직사각형·마름모·정사각형도 평행사변형이에요':'G4-05','한 쌍만 평행한 사각형을 골랐어요':'G4-06'}],
  trap:['사다리꼴을 모두 골라 보세요.','평행한 변이 한 쌍이라도 있으면 사다리꼴이에요.',()=>[_m2pk(_m2S('trap'),1),_m2pk(_m2S('trapR'),1),_m2pk(_m2S('para'),1,'평행사변형·직사각형도 사다리꼴이에요'),_m2pk(_m2S('rect'),1,'평행사변형·직사각형도 사다리꼴이에요'),_m2pk(_m2S('quad'),0),_m2pk(_m2S('kite'),0)],{'평행사변형·직사각형도 사다리꼴이에요':'G4-05'}],
  rhombus:['마름모를 모두 골라 보세요.','네 변의 길이가 모두 같은 사각형이 마름모예요.',()=>[_m2pk(_m2S('rhombus'),1),_m2pk(_m2S('rhombus',90),1),_m2pk(_m2S('square'),1,'정사각형도 마름모예요'),_m2pk(_m2S('rect'),0),_m2pk(_m2S('para'),0),_m2pk(_m2S('kite'),0,null,'네 변의 길이가 같지 않은 사각형을 골랐어요')],{'정사각형도 마름모예요':'G4-05','네 변의 길이가 같지 않은 사각형을 골랐어요':'G4-06'}],
  iso:['이등변삼각형을 모두 골라 보세요.','두 변의 길이가 같은 삼각형이 이등변삼각형이에요.',()=>[_m2pk(_m2S('triIso'),1),_m2pk(_m2S('triIso',rndPick(90,180)),1),_m2pk(_m2S('triEq'),1,'정삼각형도 이등변삼각형이에요'),_m2pk(_m2S('triRightIso'),1,'직각이등변삼각형도 이등변삼각형이에요'),_m2pk(_m2S('triAcute'),0),_m2pk(_m2S('triObt'),0)],{'정삼각형도 이등변삼각형이에요':'G4-02','직각이등변삼각형도 이등변삼각형이에요':'G4-02'}],
  acute:['예각삼각형을 모두 골라 보세요.','세 각이 모두 예각이어야 예각삼각형이에요.',()=>[_m2pk(_m2S('triEq'),1),_m2pk(_m2S('triAcute'),1),_m2pk(_m2S('triIso'),1),_m2pk(_m2S('triRight'),0,null,'예각이 있기만 하면 예각삼각형이라고 봤어요'),_m2pk(_m2S('triObt'),0,null,'예각이 있기만 하면 예각삼각형이라고 봤어요'),_m2pk(_m2S('triThin'),0,null,'예각이 있기만 하면 예각삼각형이라고 봤어요')],{'예각이 있기만 하면 예각삼각형이라고 봤어요':'G4-09'}],
  regular:['정다각형을 모두 골라 보세요.','변의 길이가 모두 같고 각의 크기도 모두 같아야 정다각형이에요.',()=>[_m2pk(_m2S('triEq'),1),_m2pk(_m2S('square'),1),_m2pk(_m2S('pent'),1),_m2pk(_m2S('hexa'),1),_m2pk(_m2S('rhombus'),0,null,'변의 길이만 같은 도형을 골랐어요'),_m2pk(_m2S('rect'),0,null,'각의 크기만 같은 도형을 골랐어요')],{'변의 길이만 같은 도형을 골랐어요':'G4-06','각의 크기만 같은 도형을 골랐어요':'G4-06'}],
  tri2:['삼각형을 모두 골라 보세요.','곧은 선 3개로 둘러싸인 도형이 삼각형이에요.',()=>[_m2pk(_m2S('triEq'),1),_m2pk(_m2S('triEq',180),1,'뒤집히거나 길쭉한 삼각형을 빼놓았어요'),_m2pk(_m2S('triThin'),1,'뒤집히거나 길쭉한 삼각형을 빼놓았어요'),_m2pk(_m2curve,0,null,'굽은 선이 있는 도형을 골랐어요'),_m2pk(_m2poly([[14,66],[50,10],[86,66],[70,66]].slice(0,3),0,true),0,null,'끊어진 도형을 골랐어요'),_m2pk(_m2S('quad'),0)],{'뒤집히거나 길쭉한 삼각형을 빼놓았어요':'G2-14','굽은 선이 있는 도형을 골랐어요':'G2-04','끊어진 도형을 골랐어요':'G2-05'}],
  lineSym:['선대칭도형을 모두 골라 보세요.','한 직선을 따라 접었을 때 완전히 겹치는 도형이에요.',()=>[_m2pk(_m2S('triIso'),1),_m2pk(_m2S('rect'),1),_m2pk(_m2S('hexa'),1),_m2pk(_m2S('para'),0,null,'접어서 겹치지 않는 도형을 골랐어요'),_m2pk(_m2S('triAcute'),0),_m2pk(_m2S('trapR'),0)],{'접어서 겹치지 않는 도형을 골랐어요':'G5-05'}],
  pointSym:['점대칭도형을 모두 골라 보세요.','한 점을 중심으로 180° 돌렸을 때 처음과 완전히 겹치는 도형이에요.',()=>[_m2pk(_m2S('para'),1,'평행사변형을 빼놓았어요'),_m2pk(_m2S('rect'),1),_m2pk(_m2S('hexa'),1),_m2pk(_m2S('triEq'),0,null,'180° 돌리면 겹치지 않는 도형을 골랐어요'),_m2pk(_m2S('trap'),0,null,'180° 돌리면 겹치지 않는 도형을 골랐어요'),_m2pk(_m2S('triIso'),0,null,'180° 돌리면 겹치지 않는 도형을 골랐어요')],{'평행사변형을 빼놓았어요':'G5-05','180° 돌리면 겹치지 않는 도형을 골랐어요':'G5-05'}],
  obtAngle:['둔각을 모두 골라 보세요.','직각(90°)보다 크고 180°보다 작은 각이 둔각이에요.',()=>[_m2pk(_m2angle(rnd(105,125),rndPick(0,40,200)),1),_m2pk(_m2angle(rnd(140,165),rndPick(0,90,180)),1),_m2pk(_m2angle(90,rndPick(0,30)),0,null,'직각을 둔각으로 골랐어요'),_m2pk(_m2angle(rnd(25,45),rndPick(0,180)),0),_m2pk(_m2angle(rnd(60,80),rndPick(0,120)),0),_m2pk(_m2angle(rnd(100,112),rndPick(70,250)),1)],{'직각을 둔각으로 골랐어요':'G4-07'}],
  acuAngle:['예각을 모두 골라 보세요.','0°보다 크고 직각(90°)보다 작은 각이 예각이에요.',()=>[_m2pk(_m2angle(rnd(25,45),rndPick(0,40,200)),1),_m2pk(_m2angle(rnd(60,82),rndPick(0,90,180)),1),_m2pk(_m2angle(90,rndPick(0,30)),0,null,'직각을 예각으로 골랐어요'),_m2pk(_m2angle(rnd(110,130),rndPick(0,180)),0),_m2pk(_m2angle(rnd(145,165),rndPick(0,120)),0),_m2pk(_m2angle(rnd(70,84),rndPick(100,250)),1)],{'직각을 예각으로 골랐어요':'G4-07'}],
  dia:['원의 지름을 그은 것을 모두 골라 보세요.','지름은 원의 중심을 지나는 선분이에요.',()=>[_m2pk(_m2circ('dia',0),1),_m2pk(_m2circ('dia',rndPick(50,120)),1),_m2pk(_m2circ('chord',rndPick(0,30)),0,null,'중심을 지나지 않는 선분을 골랐어요'),_m2pk(_m2circ('rad',rndPick(0,200)),0,null,'반지름을 지름으로 골랐어요'),_m2pk(_m2circ('dia',90),1),_m2pk(_m2circ('chord',rndPick(100,160)),0,null,'중심을 지나지 않는 선분을 골랐어요')],{'중심을 지나지 않는 선분을 골랐어요':'G3-08','반지름을 지름으로 골랐어요':'G3-04'}] };
M2.qPick=kind=>()=>{ const T=M2_PICK[kind]; return m2q(T[0],T[1],M2.pick(shuffle(T[2]())),'맞는 것을 모두 골랐어요',T[3]); };

/* ---------- E12. 칸 채우기(띠그래프 · 비례배분 · 그림그래프 · 꺾은선그래프 · 가능성) ---------- */
// 띠: n칸. 칸을 누르면 그 칸까지 칠해진다(다시 누르면 한 칸 줄어듦).
M2.band=(n,ans,alts,labels)=>{ let k=0;
  const o={ draw(){ const u=Math.floor(300/n); let g=''; for(let i=0;i<n;i++) g+=`<rect data-ma="b${i+1}" x="${4+i*u}" y="14" width="${u}" height="34" fill="${i<k?'#F2A65A':'#fff'}" stroke="#7A4A1E" stroke-width="1.4" style="cursor:pointer"/>`; for(let i=0;i<=n;i+=labels.every) g+=`<text x="${4+i*u}" y="62" font-size="10" text-anchor="middle" fill="#4A2E14">${labels.fn(i)}</text>`; return `<svg viewBox="0 0 ${n*u+8} 68" style="width:100%;max-width:${n*u+8}px;touch-action:manipulation">${g}</svg><div style="display:flex;gap:8px;align-items:center">${m2b('m','한 칸 덜기')}<b>${k}칸 칠함</b>${m2b('p','한 칸 더')}</div>`; },
    on(a){ if(a==='m') k=Math.max(0,k-1); else if(a==='p') k=Math.min(n,k+1); else { const i=+a.slice(1); k=k===i?i-1:i; } },
    check(){ return k===ans; }, wrong(){ if(!k) return null; return alts[k]||null; }, reveal(){ k=ans; },
    goal(){ const mk=Object.keys(alts).map(Number).find(x=>x>0&&x<=n&&x!==ans); return {taps:['b'+ans],mis:mk?['b'+mk]:null,misName:mk?alts[mk]:null}; }, state:()=>({k}) };
  const m=m2make(o); m._o=o; return m; };
M2.qBandPct=()=>{ const unit=rndPick(5,10), n=100/unit, tot=rndPick(20,40,50), part=tot*rndPick(2,3,4,5,6,7)*unit/100*(unit===5?1:1); const pct=part*100/tot; if(!Number.isInteger(part)||pct%unit||pct<=0||pct>=100) return M2.qBandPct(); const ans=pct/unit, alts={}; if(part!==ans&&part<=n) alts[part]='학생 수만큼 칸을 칠했어요'; if(unit===5&&pct/10!==ans&&Number.isInteger(pct/10)) alts[pct/10]='한 칸을 10%로 봤어요'; if(unit===10&&pct/5<=n&&pct/5!==ans) alts[pct/5]='한 칸을 5%로 봤어요';
  return m2q(`학생 ${tot}명 가운데 ${part}명이 축구를 좋아해요. 한 칸이 ${unit}%인 띠그래프에 축구를 좋아하는 학생의 비율만큼 칠해 보세요.`,`먼저 백분율을 구해요: ${part} ÷ ${tot} × 100`,M2.band(n,ans,alts,{every:n===20?4:2,fn:i=>(i*unit)+'%'}),`${pct}% → ${ans}칸`,{'학생 수만큼 칸을 칠했어요':'D6-01','한 칸을 10%로 봤어요':'D6-03','한 칸을 5%로 봤어요':'D6-03'}); };
M2.qBandShare=()=>{ const [a,b]=rndPick([2,3],[3,2],[1,4],[3,7],[2,1],[1,2],[3,1],[4,1]), kk=rndPick(1,2,2,3), n=(a+b)*kk; if(n>20||n<5) return M2.qBandShare(); const ans=a*kk, alts={}; if(a!==ans) alts[a]='비의 수만큼만 칠했어요'; if(b*kk!==ans) alts[b*kk]='두 사람의 몫을 바꿨어요'; if(n%a===0&&n/a!==ans&&!alts[n/a]) alts[n/a]='전체를 한쪽 수로 나눴어요';
  return m2q(`리본 ${n}칸을 도토와 람이가 ${a} : ${b}로 나누어 가져요. 도토의 몫만큼 칠해 보세요.`,`전체를 ${a} + ${b} = ${a+b}묶음으로 보면 한 묶음은 ${kk}칸이에요.`,M2.band(n,ans,alts,{every:n>10?5:1,fn:i=>i}),`도토 ${ans}칸, 람이 ${b*kk}칸`,{'비의 수만큼만 칠했어요':'R6-13','두 사람의 몫을 바꿨어요':'R6-01','전체를 한쪽 수로 나눴어요':'R6-13'}); };
/* 그림그래프 만들기: 큰 그림(10)·작은 그림(1) */
M2.picto=(N,big)=>{ let B=0, s=0;
  const o={ draw(){ return `<div style="background:#fff;border:2px solid #E3CFA8;border-radius:12px;padding:8px;min-height:64px;width:100%;max-width:320px;text-align:center"><span style="font-size:1.7rem;letter-spacing:-3px">${'🍎'.repeat(B)}</span><span style="font-size:.95rem;letter-spacing:-2px">${'🍎'.repeat(s)}</span>${B+s?'':'<span style="color:#B9A888">아직 없어요</span>'}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('Bp',`큰 그림(${big}개) +1`)}${m2b('Bm','큰 그림 −1')}${m2b('sp','작은 그림(1개) +1')}${m2b('sm','작은 그림 −1')}</div><div style="font-size:.9rem;color:#8A6A4A">큰 그림 ${B}개, 작은 그림 ${s}개</div>`; },
    on(a){ if(a==='Bp') B=Math.min(9,B+1); else if(a==='Bm') B=Math.max(0,B-1); else if(a==='sp') s=Math.min(30,s+1); else if(a==='sm') s=Math.max(0,s-1); },
    check(){ return B*big+s===N&&s<big; },
    wrong(){ if(!B&&!s) return null; if(B*big+s===N&&s>=big) return '큰 그림으로 바꿀 수 있는데 작은 그림으로 그렸어요'; if(B+s===N||(B===0&&s===N)) return '그림 하나를 모두 1개로 봤어요'; if(B===N%big&&s===Math.floor(N/big)) return '큰 그림과 작은 그림을 바꿨어요'; return null; },
    reveal(){ B=Math.floor(N/big); s=N%big; },
    goal(){ const taps=[]; for(let i=0;i<Math.floor(N/big);i++) taps.push('Bp'); for(let i=0;i<N%big;i++) taps.push('sp'); const mis=[]; for(let i=0;i<N%big;i++) mis.push('Bp'); for(let i=0;i<Math.floor(N/big);i++) mis.push('sp'); const sw=(N%big)!==Math.floor(N/big); return {taps,mis:sw?mis:null,misName:sw?'큰 그림과 작은 그림을 바꿨어요':null}; }, state:()=>({B,s}) };
  const m=m2make(o); m._o=o; return m; };
M2.qPicto=()=>{ const N=rnd(2,5)*10+rnd(1,8); if(Math.floor(N/10)===N%10) return M2.qPicto(); return m2q(`사과를 ${N}개 땄어요. 큰 그림은 10개, 작은 그림은 1개를 나타낼 때, 그림그래프로 나타내 보세요.`,`${N}은 10이 ${Math.floor(N/10)}개, 1이 ${N%10}개예요.`,M2.picto(N,10),`큰 그림 ${Math.floor(N/10)}개, 작은 그림 ${N%10}개`,{'큰 그림으로 바꿀 수 있는데 작은 그림으로 그렸어요':'D3-01','그림 하나를 모두 1개로 봤어요':'D3-01','큰 그림과 작은 그림을 바꿨어요':'D3-01'}); };
/* 꺾은선그래프 점 찍기: 눈금 한 칸이 unit */
M2.linePts=(vals,unit,rows,names)=>{ const y=vals.map(()=>0);
  const o={ draw(){ const W=300, x0=34, cw=(W-x0-10)/vals.length, u=18, H=rows*u; let g=`<line x1="${x0}" y1="6" x2="${x0}" y2="${6+H}" stroke="#7A4A1E"/><line x1="${x0}" y1="${6+H}" x2="${W-4}" y2="${6+H}" stroke="#7A4A1E"/>`; for(let r=0;r<=rows;r++){ g+=`<line x1="${x0}" y1="${6+H-r*u}" x2="${W-4}" y2="${6+H-r*u}" stroke="#EADBC2"/>`; if(r%2===0) g+=`<text x="${x0-5}" y="${10+H-r*u}" font-size="10" text-anchor="end" fill="#4A2E14">${r*unit}</text>`; }
      let d=''; vals.forEach((v,i)=>{ const cx=x0+cw*(i+.5); for(let r=1;r<=rows;r++) g+=`<circle data-ma="y${i}_${r}" cx="${cx.toFixed(1)}" cy="${6+H-r*u}" r="8" fill="${y[i]===r?'#D45F16':'#fff'}" fill-opacity="${y[i]===r?1:.01}" stroke="${y[i]===r?'#7A4A1E':'none'}" style="cursor:pointer"/>`; g+=`<text x="${cx.toFixed(1)}" y="${22+H}" font-size="11" text-anchor="middle" fill="#4A2E14">${names[i]}</text>`; if(y[i]) d+=(d?'L':'M')+cx.toFixed(1)+','+(6+H-y[i]*u); });
      if(y.every(v=>v)) g+=`<path d="${d}" fill="none" stroke="#D45F16" stroke-width="2"/>`; return `<svg viewBox="0 0 ${W} ${H+30}" style="width:100%;max-width:320px;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A">${names.map((n,i)=>`${n} ${vals[i]}`).join(' · ')} — 세로 눈금 한 칸은 ${unit}이에요. 가로선 위를 눌러 점을 찍어요.</div>`; },
    on(a){ const [i,r]=a.slice(1).split('_').map(Number); y[i]=y[i]===r?0:r; },
    check(){ return y.every((v,i)=>v*unit===vals[i]); },
    wrong(){ if(!y.every(v=>v)) return null; if(y.every((v,i)=>v===vals[i])&&unit!==1) return '눈금 한 칸을 1로 봤어요'; return null; },
    reveal(){ vals.forEach((v,i)=>{ y[i]=v/unit; }); },
    goal(){ const one=unit!==1&&vals.every(v=>v<=rows); return {taps:vals.map((v,i)=>`y${i}_${v/unit}`),mis:one?vals.map((v,i)=>`y${i}_${v}`):null,misName:one?'눈금 한 칸을 1로 봤어요':null}; }, state:()=>({y:y.slice()}) };
  const m=m2make(o); m._o=o; return m; };
M2.qLinePts=()=>{ const unit=2, rows=8, names=['월','화','수','목'], vals=names.map(()=>rnd(1,4)*2); if(new Set(vals).size<2) return M2.qLinePts(); return m2q(`요일별 새싹의 키(cm)를 꺾은선그래프로 나타내 보세요.`,'세로 눈금 한 칸이 얼마인지 먼저 확인해요.',M2.linePts(vals,unit,rows,names),'점을 바르게 찍었어요',{'눈금 한 칸을 1로 봤어요':'D4-01'}); };
/* 회전판 색칠: 가능성에 맞게 칸을 칠하기 */
M2.spin=(n,want)=>{ const on=new Set(); const need=want==='half'?n/2:want==='sure'?n:0;
  const o={ draw(){ let g=''; for(let i=0;i<n;i++){ const a0=2*Math.PI*i/n-Math.PI/2, a1=2*Math.PI*(i+1)/n-Math.PI/2, x0=80+62*Math.cos(a0), y0=80+62*Math.sin(a0), x1=80+62*Math.cos(a1), y1=80+62*Math.sin(a1); g+=`<path data-ma="s${i}" d="M80 80 L${x0.toFixed(1)} ${y0.toFixed(1)} A62 62 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${on.has(i)?'#E4604E':'#fff'}" stroke="#7A4A1E" stroke-width="1.8" style="cursor:pointer"/>`; } g+=`<line x1="80" y1="80" x2="80" y2="34" stroke="#4A2E14" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="80" r="5" fill="#4A2E14"/>`; return `<svg viewBox="0 0 160 160" style="width:100%;max-width:190px;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A">칸을 눌러 빨간색으로 칠해요 (${on.size}칸 / ${n}칸) ${m2b('clr','지우기','font-size:.78rem;min-height:36px;padding:2px 8px')}</div>`; },
    on(a){ if(a==='clr'){ on.clear(); return; } const i=+a.slice(1); on.has(i)?on.delete(i):on.add(i); },
    check(){ return on.size===need; },
    wrong(){ if(want==='half'){ if(on.size===1) return '한 칸만 칠했어요'; if(on.size===n) return '모두 칠했어요'; return on.size?'칠한 칸이 절반이 아니에요':null; } if(want==='sure') return on.size?'빨간색이 아닌 칸이 남아 있어요':'하나도 칠하지 않았어요'; return on.size?'빨간색 칸이 있으면 불가능하지 않아요':null; },
    reveal(){ on.clear(); for(let i=0;i<need;i++) on.add(i); },
    goal(){ const taps=[]; for(let i=0;i<need;i++) taps.push('s'+i); const mis=want==='half'?['s0']:want==='sure'?['s0','s1']:['s0']; const misName=want==='half'?'한 칸만 칠했어요':want==='sure'?'빨간색이 아닌 칸이 남아 있어요':'빨간색 칸이 있으면 불가능하지 않아요'; return {taps,mis,misName,emptyOk:want==='none'}; }, state:()=>({n:on.size}) };
  const m=m2make(o); m._o=o; return m; };
M2.qSpin=()=>{ const n=rndPick(4,6,8), want=rndPick('half','half','sure'); return m2q(want==='half'?`화살이 빨간색에 멈출 가능성이 '반반'이 되도록 회전판을 칠해 보세요.`:`화살이 빨간색에 멈출 가능성이 '확실하다'가 되도록 회전판을 칠해 보세요.`,want==='half'?'반반은 전체의 절반이에요. 어느 칸을 칠해도 괜찮아요.':'어디에 멈춰도 빨간색이어야 해요.',M2.spin(n,want),want==='half'?`${n}칸 가운데 ${n/2}칸`:`${n}칸 모두`,{'한 칸만 칠했어요':'D5-09','모두 칠했어요':'D5-06','칠한 칸이 절반이 아니에요':'D5-05','빨간색이 아닌 칸이 남아 있어요':'D5-06','하나도 칠하지 않았어요':'D5-06'}); };

/* ---------- E10. 자르는 선 고르기(평행사변형 → 직사각형) — 제미나이 제안 ---------- */
M2.cut=(b,h,sk)=>{ let pick=null; const u=22, X0=20, Y0=16, W=b*u, H=h*u, S=sk*u;   /* 평행사변형: 아래 변 (X0,Y0+H)-(X0+W,Y0+H), 위 변이 오른쪽으로 S만큼 밀림 */
  const P=[[X0+S,Y0],[X0+S+W,Y0],[X0+W,Y0+H],[X0,Y0+H]];
  const lines={ v:[[X0+S,Y0],[X0+S,Y0+H]], s:[[X0+S+W/2,Y0],[X0+W/2,Y0+H]], d:[[X0+S,Y0],[X0+W,Y0+H]] };
  const o={ draw(){ let g=''; if(pick==='v'){ g+=`<polygon points="${X0+S},${Y0} ${X0+S+W},${Y0} ${X0+S+W},${Y0+H} ${X0+S},${Y0+H}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2"/><polygon points="${X0+W},${Y0+H} ${X0+S+W},${Y0} ${X0+S+W},${Y0+H}" fill="#F2A65A" stroke="#7A4A1E" stroke-width="2"/><polygon points="${X0},${Y0+H} ${X0+S},${Y0} ${X0+S},${Y0+H}" fill="none" stroke="#B9A888" stroke-width="1.5" stroke-dasharray="4 3"/>`; }
      else if(pick==='s'){ g+=`<polygon points="${X0+S+W/2},${Y0} ${X0+S+W},${Y0} ${X0+W},${Y0+H} ${X0+W/2},${Y0+H}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2"/><polygon points="${X0+S+W},${Y0} ${X0+S+W+W/2},${Y0} ${X0+W+W/2},${Y0+H} ${X0+W},${Y0+H}" fill="#F2A65A" stroke="#7A4A1E" stroke-width="2"/>`; }
      else if(pick==='d'){ g+=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2"/><line x1="${X0+S}" y1="${Y0}" x2="${X0+W}" y2="${Y0+H}" stroke="#D45F16" stroke-width="2.4"/>`; }
      else g+=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2"/>`;
      if(!pick) for(const [k,L] of Object.entries(lines)) g+=`<line x1="${L[0][0]}" y1="${L[0][1]}" x2="${L[1][0]}" y2="${L[1][1]}" stroke="#D45F16" stroke-width="2" stroke-dasharray="5 4"/>`;
      const msg=pick==='v'?'직사각형이 됐어요!':pick==='s'?'옮겨도 평행사변형 그대로예요.':pick==='d'?'삼각형 두 개로 나뉘었어요. 직사각형은 아니에요.':'점선 가운데 하나를 골라요';
      return `<svg viewBox="0 0 ${X0+S+W+W/2+20} ${H+32}" style="width:100%;max-width:330px">${g}</svg><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('v','① 곧게 선 선')}${m2b('s','② 비스듬한 선')}${m2b('d','③ 마주 보는 꼭짓점을 이은 선')}${m2b('x','다시')}</div><div style="font-size:.95rem">${msg}</div>`; },
    on(a){ pick=a==='x'?null:a; }, check(){ return pick==='v'; },
    wrong(){ return pick==='s'?'비스듬한 선으로 잘랐어요':pick==='d'?'대각선으로 잘랐어요':null; }, reveal(){ pick='v'; },
    goal:()=>({taps:['v'],mis:['s'],misName:'비스듬한 선으로 잘랐어요'}), state:()=>({pick:pick||'-'}) };
  const m=m2make(o); m._o=o; return m; };
M2.qCut=()=>{ const b=rnd(4,6), h=rnd(2,4), sk=rnd(1,2); return m2q('평행사변형을 잘라 옮겨서 직사각형으로 만들려고 해요. 어느 선을 따라 잘라야 할까요? 선을 골라서 확인해 보세요.','밑변에 수직인 선으로 자르면 직각이 생겨요. 그 선의 길이가 높이예요.',M2.cut(b,h,sk),'밑변에 수직인 선(높이)으로 잘라요',{'비스듬한 선으로 잘랐어요':'G5-02','대각선으로 잘랐어요':'G5-02'}); };

try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } }; const PK={};
  for(const k of Object.keys(M2_PICK)) PK[k]=M2.qPick(k); M2._pk=PK;
  add('S6-19',PK.rect); add('S6-18',PK.rightTri); add('S6-30',PK.para); add('S6-30',PK.trap); add('S6-31',PK.rhombus); add('S6-31',PK.para); add('S6-28',PK.iso); add('S6-29',PK.acute); add('S6-33',PK.regular); add('S6-04',PK.tri2);
  add('S6-55',PK.pointSym); add('S6-54',PK.lineSym); add('S6-49',PK.obtAngle); add('S6-49',PK.acuAngle); add('S6-26',PK.dia);
  add('S4-19',M2.qBandPct); add('S4-20',M2.qBandPct); add('S5-19',M2.qBandShare); add('S5-20',M2.qBandShare); add('S4-07',M2.qPicto); add('S4-08',M2.qPicto); add('S4-11',M2.qLinePts); add('S4-12',M2.qLinePts); add('S4-17',M2.qSpin); add('S4-18',M2.qSpin); add('S6-70',M2.qCut);
}catch(e){}

// ===== manip2 이어서(11/23 새벽, 교수님: "먼저 추를 하나씩 올려 □ 추의 무게를 구하는 것부터", "부러진 자 등 제미나이가 제안한 조작도 다") =====
/* ---------- 양팔저울에 추 올리기: □ 추의 무게 → 물건의 무게 → 등식 ---------- */
// cfg: {left:[{v,lab,hid,emoji}], right:[{v,lab}], types:[{v,lab,max}], wrongFn(added,cnt), misTaps}
M2.scale=cfg=>{ const cnt=cfg.types.map(()=>0), sumL=cfg.left.reduce((p,x)=>p+x.v,0), sumR=cfg.right.reduce((p,x)=>p+x.v,0), need=sumL-sumR, added=()=>cnt.reduce((p,c,i)=>p+c*cfg.types[i].v,0), big=Math.max(sumL,1);
  const blk=(x,y,lab,fill,w)=>`<g transform="translate(${x} ${y})"><rect x="${-(w||26)/2}" y="-20" width="${w||26}" height="20" rx="4" fill="${fill}" stroke="#4A2E14" stroke-width="1.4"/><text x="0" y="-6" font-size="${String(lab).length>3?8.5:11}" text-anchor="middle" font-weight="700" fill="#4A2E14">${lab}</text></g>`;
  const stack=(items)=>{ const per=3; return items.map((it,i)=>blk(-28+(i%per)*28,-6-Math.floor(i/per)*21,it.lab,it.fill,it.w)).join(''); };
  const o={ tiltTarget(){ return Math.max(-11,Math.min(11,(sumL-(sumR+added()))/big*40)); }, draw(){ const tilt=o._shown!=null?o._shown:o.tiltTarget(), rad=tilt*Math.PI/180, dy=100*Math.sin(rad), dx=100*Math.cos(rad), lx=160-dx, ly=96+dy, rx=160+dx, ry=96-dy;
      const L=cfg.left.map(x=>({lab:x.hid?(x.emoji||'□'):x.lab,fill:x.hid?'#F9C6CF':'#C9D8E8',w:x.hid?30:26})), R=cfg.right.map(x=>({lab:x.lab,fill:'#C9D8E8'})); cnt.forEach((c,i)=>{ if(c>4) R.push({lab:cfg.types[i].lab+'×'+c,fill:'#FFD98A',w:44}); else for(let k=0;k<c;k++) R.push({lab:cfg.types[i].lab,fill:'#FFD98A'}); });
      const pan=(x,y,items)=>`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y+30).toFixed(1)}" stroke="#7A4A1E" stroke-width="1.5"/><g transform="translate(${x.toFixed(1)} ${(y+30).toFixed(1)})"><path d="M-50 0 Q0 24 50 0" fill="#F4E3C1" stroke="#7A4A1E" stroke-width="2"/>${stack(items)}</g>`;
      const g=`<line x1="160" y1="176" x2="160" y2="96" stroke="#7A4A1E" stroke-width="5"/><rect x="128" y="174" width="64" height="8" rx="3" fill="#7A4A1E"/><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#7A4A1E" stroke-width="5" stroke-linecap="round"/>${pan(lx,ly,L)}${pan(rx,ry,R)}`;
      return `<svg viewBox="0 0 320 190" style="width:100%;max-width:330px">${g}</svg><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">`+cfg.types.map((t,i)=>`<span style="display:inline-flex;gap:3px;align-items:center">${m2b('a'+i,`${t.lab} 추 올리기`,'background:#FFD98A')}${m2b('r'+i,'빼기','font-size:.8rem;padding:2px 8px')}</span>`).join('')+`</div><div style="font-size:.9rem;color:#8A6A4A">${cfg.note||'추를 하나씩 올려 저울이 수평이 되게 해요'}</div>`; },
    on(a){ const i=+a.slice(1), t=cfg.types[i]; if(!t) return; if(a[0]==='a'){ if(cnt[i]<(t.max||12)&&added()+t.v<=sumL*3+50*t.v) cnt[i]++; } else if(cnt[i]>0) cnt[i]--; },
    check(){ return added()===need; },
    wrong(){ if(!added()) return null; return cfg.wrongFn?cfg.wrongFn(added(),cnt.slice()):null; },
    reveal(){ const s=o._sol(); if(s) s.forEach((c,i)=>{ cnt[i]=c; }); },
    _sol(){ const res=cfg.types.map(()=>0); let rest=need; for(let i=0;i<cfg.types.length;i++){ const t=cfg.types[i], c=Math.min(t.max||12,Math.floor(rest/t.v)); res[i]=c; rest-=c*t.v; } return rest===0?res:null; },
    goal(){ const s=o._sol()||[], taps=[]; s.forEach((c,i)=>{ for(let k=0;k<c;k++) taps.push('a'+i); }); const mt=cfg.misTaps?cfg.misTaps():null; return {taps,mis:mt?mt[0]:null,misName:mt?mt[1]:null,need}; }, state:()=>({cnt:cnt.slice(),added:added()}) };
  const m=m2make(o); m._o=o; return m; };
const _T15=[{v:5,lab:'5',max:12},{v:1,lab:'1',max:12}];
M2.qBoxWeight=()=>{ const v=rnd(4,19); return m2q('□ 추의 무게를 알아봐요. 오른쪽 접시에 추를 하나씩 올려 저울이 수평이 되게 해 보세요.','저울이 수평이면 양쪽의 무게가 같아요. 올린 추의 무게를 모두 더하면 □ 추의 무게예요.',M2.scale({left:[{v,hid:1}],right:[],types:_T15}),`□ = ${v}`,{}); };
M2.qBalance=()=>{ const a=rnd(6,15), b=rnd(3,9), c=rnd(2,a+b-3), ans=a+b-c; if(ans<=0||ans>40) return M2.qBalance(); const tapsFor=n=>{ const t=[]; for(let k=0;k<Math.floor(n/5);k++) t.push('a0'); for(let k=0;k<n%5;k++) t.push('a1'); return t; };
  return m2q(`${a} + ${b} = ${c} + □ 를 저울로 알아봐요. 오른쪽 접시에 추를 더 올려 저울이 수평이 되게 해 보세요.`,'등호(=)는 양쪽의 무게가 같다는 뜻이에요. 더 올린 추의 무게가 □예요.',M2.scale({left:[{v:a,lab:a},{v:b,lab:b}],right:[{v:c,lab:c}],types:_T15,wrongFn:x=>x===a+b?'왼쪽 계산의 답만큼 올렸어요':x===a+b+c?'수를 모두 더한 만큼 올렸어요':null,misTaps:()=>a+b<=60?[tapsFor(a+b),'왼쪽 계산의 답만큼 올렸어요']:null}),`□ = ${ans} (양쪽 모두 ${a+b})`,{'왼쪽 계산의 답만큼 올렸어요':'R4-02','수를 모두 더한 만큼 올렸어요':'R4-02'}); };
const _TKG=[{v:1000,lab:'1 kg',max:5},{v:500,lab:'500 g',max:6},{v:100,lab:'100 g',max:9}];
M2.qWeigh=()=>{ const [nm,e]=rndPick(['수박','🍉'],['책가방','🎒'],['호박','🎃'],['도토리 바구니','🧺']), w=rnd(8,38)*100; return m2q(`${nm}의 무게를 재어 봐요. 오른쪽 접시에 추를 올려 저울이 수평이 되게 해 보세요.`,'무거운 추부터 올리고, 넘치면 가벼운 추로 바꿔요.',M2.scale({left:[{v:w,hid:1,emoji:e}],right:[],types:_TKG,note:'1 kg, 500 g, 100 g 추를 올려 수평을 맞춰요'}),`${Math.floor(w/1000)?Math.floor(w/1000)+' kg ':''}${w%1000?w%1000+' g':''}`.trim(),{}); };
M2.qWeighLim=()=>{ const kg=rndPick(2,2,3), g=rnd(1,4)*100, w=kg*1000+g, T=[{v:1000,lab:'1 kg',max:1},{v:500,lab:'500 g',max:6},{v:100,lab:'100 g',max:9}]; if((w-1000)>6*500+9*100) return M2.qWeighLim(); const misN=(kg-1)+g/100; return m2q(`무게가 ${kg} kg ${g} g인 도토리 바구니와 수평이 되게 추를 올려 보세요. 1 kg 추는 1개뿐이에요!`,'1 kg은 1000 g이에요. 500 g 추 2개, 100 g 추 10개와 같아요.',M2.scale({left:[{v:w,hid:1,emoji:'🧺'}],right:[],types:T,note:'1 kg 추가 모자라면 500 g, 100 g 추로 채워요',wrongFn:(x,c)=>c[0]===1&&c[1]===0&&c[2]===misN?'1 kg을 100 g 추 1개로 바꿔 올렸어요':null,misTaps:()=>{ const t=['a0']; for(let k=0;k<misN;k++) t.push('a2'); return [t,'1 kg을 100 g 추 1개로 바꿔 올렸어요']; }}),`1 kg 추 1개와 나머지 ${w-1000} g`,{'1 kg을 100 g 추 1개로 바꿔 올렸어요':'G3-05'}); };

/* ---------- 그림을 보고 수 맞추기(값을 − / + 로 정함): 부러진 자 ---------- */
M2.read=(svg,ans,alts,unit,max,lab)=>{ let x=0;
  const o={ draw(){ return svg+`<div style="display:flex;gap:6px;align-items:center">${m2b('m','−')}<b style="font-size:1.4rem;min-width:120px;text-align:center">${lab||''} ${x} ${unit}</b>${m2b('p','+')}</div>`; },
    on(a){ x=Math.max(0,Math.min(max,x+(a==='p'?1:-1))); }, check(){ return x===ans; }, wrong(){ return x?(alts[x]||null):null; }, reveal(){ x=ans; },
    goal(){ const mk=Object.keys(alts).map(Number).find(v=>v>0&&v<=max&&v!==ans); return {taps:Array(ans).fill('p'),mis:mk?Array(mk).fill('p'):null,misName:mk?alts[mk]:null}; }, state:()=>({x}) };
  const m=m2make(o); m._o=o; return m; };
M2.qRuler=()=>{ const s=rnd(2,4), a=s+rnd(0,2), L=rnd(3,6), b=a+L, n=9, u=30, X=v=>14+(v-s)*u; let g=`<path d="M4 44 L${X(s)-6} 44 l4 -5 l4 10 l4 -10 l4 10 L${X(s)} 44 L${X(s+n)+10} 44 L${X(s+n)+10} 84 L4 84 Z" fill="#FFF3C4" stroke="#7A4A1E" stroke-width="1.8"/>`; for(let v=s;v<=s+n;v++) g+=`<line x1="${X(v)}" y1="44" x2="${X(v)}" y2="60" stroke="#4A2E14" stroke-width="1.8"/><text x="${X(v)}" y="76" font-size="13" text-anchor="middle" font-weight="700" fill="#4A2E14">${v}</text>`; for(let v=s;v<s+n;v++) g+=`<line x1="${X(v)+u/2}" y1="44" x2="${X(v)+u/2}" y2="53" stroke="#4A2E14" stroke-width="1"/>`;
  g+=`<rect x="${X(a)}" y="18" width="${(b-a)*u-14}" height="16" fill="#F2A65A" stroke="#7A4A1E" stroke-width="1.6"/><path d="M${X(b)-14} 18 L${X(b)} 26 L${X(b)-14} 34 Z" fill="#F9E0B8" stroke="#7A4A1E" stroke-width="1.6"/><line x1="${X(a)}" y1="12" x2="${X(a)}" y2="44" stroke="#D45F16" stroke-dasharray="3 3"/><line x1="${X(b)}" y1="12" x2="${X(b)}" y2="44" stroke="#D45F16" stroke-dasharray="3 3"/>`;
  const alts={}; alts[b]='끝 눈금을 그대로 읽었어요'; if(L+1!==b) alts[L+1]='눈금의 수를 셌어요';
  return m2q('앞부분이 부러진 자로 연필의 길이를 재었어요. 연필의 길이는 몇 cm일까요?','연필의 양쪽 끝 사이에 1 cm가 몇 번 들어가는지 세어요.',M2.read(`<svg viewBox="0 0 ${X(s+n)+18} 90" style="width:100%;max-width:340px">${g}</svg>`,L,alts,'cm',15,'연필의 길이'),`${L} cm (${a}부터 ${b}까지 ${L}칸)`,{'끝 눈금을 그대로 읽었어요':'G2-08','눈금의 수를 셌어요':'G2-09'}); };

/* ---------- 물컵으로 퍼 담아 들이 비교(1학년) ---------- */
Object.assign(MIS,{'G1-06':['서로 다른 크기의 컵으로 재고 횟수만 견줌','두 통을 견줄 때는 같은 컵으로 재어야 해요.']});
M2.cups=(capA,capB,big)=>{ const fill=[0,0], used=[{s:0,b:0},{s:0,b:0}]; let choice=null; const cap=[capA,capB], right=capA>capB?0:capB>capA?1:2;
  const bottle=(i,x,w,h)=>{ const lv=fill[i]/cap[i], y0=150-h; return `<rect x="${x}" y="${y0}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="#7A4A1E" stroke-width="2.2"/><rect x="${x+2}" y="${(y0+h-2-(h-4)*lv).toFixed(1)}" width="${w-4}" height="${((h-4)*lv).toFixed(1)}" fill="#8CC8EE"/><text x="${x+w/2}" y="168" font-size="14" text-anchor="middle" font-weight="700" fill="#4A2E14">${i?'나':'가'} ${fill[i]>=cap[i]?'(가득!)':''}</text>`; };
  const o={ draw(){ return `<svg viewBox="0 0 300 176" style="width:100%;max-width:215px">${bottle(0,50,54,130)}${bottle(1,160,110,66)}</svg>`+`<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;max-width:330px">`+[0,1].map(i=>`<div style="background:#fff;border:2px solid #E3CFA8;border-radius:12px;padding:5px;text-align:center"><b>${i?'나':'가'} 통에 붓기</b><div style="display:flex;gap:4px;justify-content:center;margin:3px 0">${m2b('s'+i,'작은 컵','font-size:.9rem;padding:4px 6px')}${m2b('b'+i,'큰 컵','font-size:.9rem;padding:4px 6px')}</div><span style="font-size:.8rem;color:#8A6A4A">작은 컵 ${used[i].s}번 · 큰 컵 ${used[i].b}번</span></div>`).join('')+`</div><div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;justify-content:center"><b style="font-size:.95rem">더 많이 들어가는 통</b>${['가','나','같아요'].map((n,i)=>m2b('c'+i,n,'min-width:48px;padding:4px 8px;'+(choice===i?'background:#FFD98A;border-color:#D45F16':''))).join('')}${m2b('x','비우기','font-size:.8rem;padding:2px 8px')}</div>`; },
    on(a){ if(a==='x'){ fill[0]=fill[1]=0; used[0]={s:0,b:0}; used[1]={s:0,b:0}; return; } const i=+a[1]; if(a[0]==='c'){ choice=choice===i?null:i; return; } const v=a[0]==='b'?big:1; if(fill[i]+v<=cap[i]){ fill[i]+=v; used[i][a[0]]++; } },
    _same(){ const k=i=>used[i].s&&!used[i].b?'s':used[i].b&&!used[i].s?'b':null; return k(0)&&k(0)===k(1); },
    check(){ return choice===right&&fill[0]===capA&&fill[1]===capB&&o._same(); },
    wrong(){ if(choice==null) return null; const poured=fill[0]+fill[1]; if(!poured) return choice===0&&right!==0?'물을 붓지 않고 키가 큰 통을 골랐어요':null; if(fill[0]===capA&&fill[1]===capB&&!o._same()) return '서로 다른 컵으로 재었어요'; return null; },
    reveal(){ fill[0]=capA; fill[1]=capB; used[0]={s:capA,b:0}; used[1]={s:capB,b:0}; choice=right; },
    goal(){ const taps=[]; for(let k=0;k<capA;k++) taps.push('s0'); for(let k=0;k<capB;k++) taps.push('s1'); taps.push('c'+right); return {taps,mis:right!==0?['c0']:null,misName:right!==0?'물을 붓지 않고 키가 큰 통을 골랐어요':null}; }, state:()=>({fill:fill.slice(),choice:choice==null?'-':choice}) };
  const m=m2make(o); m._o=o; return m; };
/* 넓은 통이 더 많음(절반) · 키 큰 통이 더 많음(30%) · 같음(20%)을 섞어, '낮은 통이 답'이라는 요령이 통하지 않게 함(제미나이와 검토) */
M2.qCups=()=>{ const big=2, r=Math.random(), base=rndPick(4,6), capA=r<.5?base:r<.8?base+rndPick(2,4):base+2, capB=r<.5?base+rndPick(2,4):r<.8?base:base+2, nm=capA>capB?'가 통':capB>capA?'나 통':'두 통이 같아요'; return m2q('가 통과 나 통 가운데 물이 더 많이 들어가는 통은 어느 것일까요? 컵으로 물을 부어 가득 채워 보고 골라 보세요.','두 통을 같은 컵으로 재어야 견줄 수 있어요. 가득 찰 때까지 몇 번 부었는지 세어요.',M2.cups(capA,capB,big),`${nm} (작은 컵으로 가 ${capA}번, 나 ${capB}번)`,{'물을 붓지 않고 키가 큰 통을 골랐어요':'G2-16','서로 다른 컵으로 재었어요':'G1-06'}); };

/* ---------- 띠를 똑같이 자르기(분수의 뜻: 똑같이 나눈 것 가운데 몇) ---------- */
M2.strip=(d,a)=>{ const N=12, cuts=new Set(), col=new Set();
  const pieces=()=>{ const c=[0,...[...cuts].sort((x,y)=>x-y),N], out=[]; for(let i=0;i<c.length-1;i++) out.push([c[i],c[i+1]]); return out; };
  const o={ draw(){ const u=24, P=pieces(); let g=''; P.forEach(([s,e],i)=>{ g+=`<rect data-ma="f${i}" x="${6+s*u}" y="16" width="${(e-s)*u}" height="40" fill="${col.has(i)?'#F2A65A':'#FFF8EC'}" stroke="#7A4A1E" stroke-width="2.2" style="cursor:pointer"/>`; }); for(let k=1;k<N;k++) g+=`<g data-ma="c${k}" style="cursor:pointer"><rect x="${6+k*u-9}" y="58" width="18" height="26" fill="#fff" fill-opacity=".01"/><line x1="${6+k*u}" y1="60" x2="${6+k*u}" y2="76" stroke="${cuts.has(k)?'#D45F16':'#C9B38C'}" stroke-width="${cuts.has(k)?3:1.6}"/><text x="${6+k*u}" y="90" font-size="13" text-anchor="middle" fill="${cuts.has(k)?'#D45F16':'#A8946F'}">✂</text></g>`;
      return `<svg viewBox="0 0 ${N*u+12} 92" style="width:100%;max-width:330px;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A;text-align:center">아래 가위 표시를 눌러 자르고, 조각을 눌러 칠해요 (${P.length}조각, ${col.size}조각 칠함) ${m2b('x','처음부터','font-size:.8rem;min-height:36px;padding:2px 8px')}</div>`; },
    on(act){ if(act==='x'){ cuts.clear(); col.clear(); return; } const k=+act.slice(1); if(act[0]==='c'){ cuts.has(k)?cuts.delete(k):cuts.add(k); col.clear(); } else { col.has(k)?col.delete(k):col.add(k); } },
    _eq(){ const P=pieces(); return P.every(([s,e])=>e-s===P[0][1]-P[0][0]); },
    check(){ return pieces().length===d&&o._eq()&&col.size===a; },
    wrong(){ const P=pieces(); if(P.length===1) return null; if(P.length===d&&!o._eq()&&col.size===a) return '크기가 다르게 잘랐어요'; if(o._eq()&&P.length===d&&col.size===d-a&&d-a!==a) return '칠하지 않을 조각 수만큼 칠했어요'; if(P.length===d&&!o._eq()) return '크기가 다르게 잘랐어요'; return null; },
    reveal(){ cuts.clear(); col.clear(); for(let k=1;k<d;k++) cuts.add(k*N/d); for(let i=0;i<a;i++) col.add(i); },
    goal(){ const taps=[]; for(let k=1;k<d;k++) taps.push('c'+(k*N/d)); for(let i=0;i<a;i++) taps.push('f'+i); const mis=[]; for(let k=1;k<d;k++) mis.push('c'+k); for(let i=0;i<a;i++) mis.push('f'+i); const eqToo=d-1>=1&&(()=>{ const c=[0]; for(let k=1;k<d;k++) c.push(k); c.push(N); return c.every((v,i)=>i===0||c[i]-c[i-1]===c[1]-c[0]); })(); return {taps,mis:eqToo?null:mis,misName:eqToo?null:'크기가 다르게 잘랐어요'}; }, state:()=>({cuts:[...cuts].sort((x,y)=>x-y),col:col.size}) };
  const m=m2make(o); m._o=o; return m; };
M2.qStrip=()=>{ const d=rndPick(2,3,4,6), a=rnd(1,d-1); return m2q(`띠를 똑같이 ${d}조각으로 자르고, 그 가운데 ${a}조각을 칠해 ${d}분의 ${a}를 나타내 보세요.`,'조각의 크기가 모두 같아야 분수로 나타낼 수 있어요.',M2.strip(d,a),`똑같이 ${d}조각 가운데 ${a}조각`,{'크기가 다르게 잘랐어요':'N3-05','칠하지 않을 조각 수만큼 칠했어요':'N3-16'}); };

/* ---------- 수직선을 나누고 수의 자리 찾기(소수) ---------- */
M2.nline=(tenths)=>{ let n=4, at=null; const OPT=[2,4,5,10];   /* tenths: 찾을 수 × 10 (0~20) */
  const o={ draw(){ const x0=20, x1=300, st=(x1-x0)/(2*n); let g=`<line x1="10" y1="44" x2="310" y2="44" stroke="#7A4A1E" stroke-width="2"/>`; for(let i=0;i<=2*n;i++){ const x=x0+i*st, bigT=i%n===0; g+=`<g data-ma="t${i}" style="cursor:pointer"><rect x="${(x-Math.min(13,st/2)).toFixed(1)}" y="20" width="${(2*Math.min(13,st/2)).toFixed(1)}" height="46" fill="#fff" fill-opacity=".01"/><line x1="${x.toFixed(1)}" y1="${bigT?30:35}" x2="${x.toFixed(1)}" y2="${bigT?58:53}" stroke="#7A4A1E" stroke-width="${bigT?2.4:1.4}"/>${at===i?`<path d="M${x.toFixed(1)} 30 l0 -22 l14 6 l-14 6" fill="#E4604E" stroke="#7A4A1E" stroke-width="1.4"/>`:''}</g>`; if(bigT) g+=`<text x="${x.toFixed(1)}" y="76" font-size="13" text-anchor="middle" font-weight="700" fill="#4A2E14">${i/n}</text>`; }
      return `<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center"><b>1을 몇 칸으로?</b>${OPT.map(v=>m2b('n'+v,v+'칸','min-width:48px;'+(n===v?'background:#FFD98A;border-color:#D45F16':''))).join('')}</div><svg viewBox="0 0 320 84" style="width:100%;max-width:340px;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A">칸 수를 고르고, 눈금을 눌러 깃발을 꽂아요</div>`; },
    on(a){ if(a[0]==='n'){ n=+a.slice(1); at=null; } else { const i=+a.slice(1); at=at===i?null:i; } },
    check(){ return at!=null&&at*10===tenths*n; },
    wrong(){ if(at==null) return null; const frac=tenths%10, whole=Math.floor(tenths/10); if(n!==10&&at===whole*n+frac&&at*10!==tenths*n) return '한 칸을 0.1로 봤어요'; return null; },
    reveal(){ n=10; at=tenths; },
    goal(){ const whole=Math.floor(tenths/10), frac=tenths%10, nn=(tenths*5)%10===0?5:10, canMis=frac<=4&&frac>0&&(whole*4+frac)*10!==tenths*4; return {taps:['n'+nn,'t'+(tenths*nn/10)],mis:canMis?['n4','t'+(whole*4+frac)]:null,misName:canMis?'한 칸을 0.1로 봤어요':null}; }, state:()=>({n,at:at==null?'-':at}) };
  const m=m2make(o); m._o=o; return m; };
M2.qNLine=()=>{ const t=rndPick(2,3,4,6,7,8,12,13,14,16,17,18); return m2q(`수직선에서 ${(t/10).toFixed(1)}의 자리를 찾아 깃발을 꽂아 보세요. 먼저 1을 몇 칸으로 나눌지 골라요.`,'0.1은 1을 똑같이 10칸으로 나눈 것 가운데 한 칸이에요.',M2.nline(t),`${(t/10).toFixed(1)}의 자리`,{'한 칸을 0.1로 봤어요':'N4-28'}); };

/* ---------- 0이 있는 자료의 평균: 블록을 옮겨 고르게 ---------- */
M2.level=(vals,names)=>{ const v=vals.slice(); let hand=0; const n=v.length, sum=vals.reduce((a,b)=>a+b,0), avg=sum/n, zi=vals.indexOf(0);
  const o={ draw(){ return `<div style="display:flex;gap:6px;justify-content:center;align-items:flex-end;width:100%;max-width:340px">`+v.map((x,i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px"><div style="min-height:${Math.max(...vals,avg)*15+34}px;display:flex;flex-direction:column-reverse;align-items:center">${Array.from({length:x},()=>'<span style="display:block;width:30px;height:13px;background:#F2A65A;border:1px solid #7A4A1E;border-radius:2px;margin-top:1px"></span>').join('')}</div><b>${x}</b><span style="font-size:.85rem">${names[i]}</span>${m2b('u'+i,'빼기','font-size:.78rem;min-width:44px;min-height:38px;padding:2px 4px')}${m2b('d'+i,'놓기','font-size:.78rem;min-width:44px;min-height:38px;padding:2px 4px')}</div>`).join('')+`</div><div style="font-size:.95rem">손에 든 블록: <b>${hand}개</b></div>`; },
    on(a){ const i=+a.slice(1); if(a[0]==='u'){ if(v[i]>0){ v[i]--; hand++; } } else if(hand>0&&v[i]<20){ v[i]++; hand--; } },
    check(){ return hand===0&&v.every(x=>x===avg); },
    wrong(){ if(hand===0&&zi>=0&&v[zi]===0){ const rest=v.filter((_,i)=>i!==zi); if(rest.every(x=>x===rest[0])&&rest[0]!==0) return '0인 칸을 빼고 고르게 했어요'; } return null; },
    reveal(){ for(let i=0;i<n;i++) v[i]=avg; hand=0; },
    goal(){ const plan=target=>{ const cur=vals.slice(), t=[]; let h=0; for(let i=0;i<n;i++) while(cur[i]>target[i]){ cur[i]--; h++; t.push('u'+i); } for(let i=0;i<n;i++) while(cur[i]<target[i]&&h>0){ cur[i]++; h--; t.push('d'+i); } return t; }; const taps=plan(v.map(()=>avg)); let mis=null, misName=null; if(zi>=0&&sum%(n-1)===0){ mis=plan(vals.map((_,i)=>i===zi?0:sum/(n-1))); misName='0인 칸을 빼고 고르게 했어요'; } return {taps,mis,misName}; }, state:()=>({v:v.slice(),hand}) };
  const m=m2make(o); m._o=o; return m; };
M2.qLevel0=()=>{ const sets=[[2,0,4,6,8],[5,0,3,7,5],[4,0,8,2,6],[6,0,6,4,4],[0,5,8,3,4],[7,3,0,5,5]], vals=rndPick(...sets), names=['월','화','수','목','금']; return m2q(`요일마다 읽은 책 수예요(${vals.join('권, ')}권). 블록을 옮겨 다섯 요일의 높이를 모두 같게 만들어 보세요. 한 권도 읽지 않은 날도 있어요.`,'0권인 날도 하루예요. 다섯 요일 모두 같은 높이가 되어야 해요.',M2.level(vals,names),`하루 평균 ${vals.reduce((a,b)=>a+b,0)/5}권`,{'0인 칸을 빼고 고르게 했어요':'D5-08'}); };

try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  /* 등식 편: 숫자 단추로 □를 정하던 저울을 '추를 하나씩 올리는' 저울로 바꾸고, 그 앞에 □ 추의 무게 알아보기를 둠 */
  for(const ep of ['S5-09','S5-10']){ const F=G36[ep]||[]; const old=F.findIndex(g=>{ try{ return /저울이 수평이 되도록 노란 추의 무게/.test(String(g().q)); }catch(e){ return false; } }); if(old>=0) F[old]=M2.qBalance; else add(ep,M2.qBalance); }
  add('S5-09',M2.qBoxWeight); add('S5-10',M2.qBoxWeight); add('S6-43',M2.qWeigh); add('S6-44',M2.qWeigh); add('S6-46',M2.qWeighLim); add('S6-45',M2.qWeighLim);
  add('S6-14',M2.qRuler); add('S6-15',M2.qRuler); add('S6-08',M2.qCups); add('S3-17',M2.qStrip); add('S3-18',M2.qStrip); add('S3-56',M2.qNLine); add('S3-57',M2.qNLine); add('S4-15',M2.qLevel0); add('S4-16',M2.qLevel0);
}catch(e){}

// ===== manip2 이어서(11/23 새벽, 제미나이 3차 검토): 양쪽에서 같은 추 덜기, 통분, 분수의 나눗셈, 시각 계산, 겉넓이, 최대공약수·최소공배수 =====
/* 양쪽에서 같은 추를 덜어 □만 남기기 */
M2.takeBoth=(v,k)=>{ const on={L:true,R:true,V:true};
  const o={ tiltTarget(){ const sl=v+(on.L?k:0), sr=(on.V?v:0)+(on.R?k:0); return Math.max(-11,Math.min(11,(sl-sr)/(v+k)*40)); }, draw(){ const tilt=o._shown!=null?o._shown:o.tiltTarget(), rad=tilt*Math.PI/180, dy=100*Math.sin(rad), dx=100*Math.cos(rad), lx=160-dx, ly=70+dy, rx=160+dx, ry=70-dy;
      const blk=(x,lab,fill,act,w)=>`<g transform="translate(${x} -6)"><rect x="${-(w||30)/2}" y="-26" width="${w||30}" height="26" rx="4" fill="${fill}" stroke="#4A2E14" stroke-width="1.5"/><text x="0" y="-8" font-size="13" text-anchor="middle" font-weight="700" fill="#4A2E14">${lab}</text></g>`;
      const pan=(x,y,inner)=>`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y+34).toFixed(1)}" stroke="#7A4A1E" stroke-width="1.5"/><g transform="translate(${x.toFixed(1)} ${(y+34).toFixed(1)})"><path d="M-54 0 Q0 24 54 0" fill="#F4E3C1" stroke="#7A4A1E" stroke-width="2"/>${inner}</g>`;
      const g=`<line x1="160" y1="150" x2="160" y2="70" stroke="#7A4A1E" stroke-width="5"/><rect x="128" y="148" width="64" height="8" rx="3" fill="#7A4A1E"/><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#7A4A1E" stroke-width="5" stroke-linecap="round"/>${pan(lx,ly,blk(-18,'□','#F9C6CF')+(on.L?blk(18,k,'#FFD98A','L'):''))}${pan(rx,ry,(on.V?blk(-18,v,'#C9D8E8','V'):'')+(on.R?blk(18,k,'#FFD98A','R'):''))}`;
      return `<svg viewBox="0 0 320 164" style="width:100%;max-width:330px;touch-action:manipulation">${g}</svg><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('L',on.L?`왼쪽 ${k} 덜기`:`왼쪽 ${k} 다시 놓기`)}${m2b('R',on.R?`오른쪽 ${k} 덜기`:`오른쪽 ${k} 다시 놓기`)}${m2b('V',on.V?`오른쪽 ${v} 덜기`:`오른쪽 ${v} 다시 놓기`)}</div><div style="font-size:.9rem;color:#8A6A4A">저울이 수평인 채로 □ 추만 남겨요</div>`; },
    on(a){ if(a in on) on[a]=!on[a]; }, check(){ return !on.L&&!on.R&&on.V; },
    wrong(){ if(on.L!==on.R&&on.V) return '한쪽에서만 덜어 냈어요'; if(!on.V) return '무게가 다른 추를 덜어 냈어요'; return null; }, reveal(){ on.L=false; on.R=false; on.V=true; },
    goal:()=>({taps:['L','R'],mis:['L'],misName:'한쪽에서만 덜어 냈어요'}), state:()=>({L:on.L?1:0,R:on.R?1:0,V:on.V?1:0}) };
  const m=m2make(o); m._o=o; return m; };
M2.qTakeBoth=()=>{ const v=rnd(4,12); let k=rnd(2,9); if(k===v) k++; return m2q(`□ + ${k} = ${v} + ${k} 예요. 양쪽에서 같은 무게의 추를 덜어 내어 □ 추만 남겨 보세요. 저울은 수평이어야 해요.`,'양쪽에서 같은 무게를 덜어 내면 저울은 그대로 수평이에요.',M2.takeBoth(v,k),`□ = ${v}`,{'한쪽에서만 덜어 냈어요':'R4-02','무게가 다른 추를 덜어 냈어요':'R4-02'}); };

/* 통분: 두 분수 막대를 더 잘게 나누어 한 칸의 크기를 같게 */
M2.refine=(a,b,c,d)=>{ let m=[1,1]; const bar=(n,den,mul,col)=>{ const N=den*mul, u=300/N; let g=''; for(let i=0;i<N;i++) g+=`<rect x="${(4+i*u).toFixed(1)}" y="4" width="${u.toFixed(1)}" height="30" fill="${i<n*mul?col:'#fff'}" stroke="#7A4A1E" stroke-width="${i%mul===0?1.6:.7}"/>`; return `<svg viewBox="0 0 308 38" style="width:100%;max-width:330px">${g}</svg>`; };
  const o={ draw(){ const row=(i,n,den,col)=>`${bar(n,den,m[i],col)}<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center"><b style="min-width:92px">${den*m[i]}분의 ${n*m[i]}</b>${m2b('x'+i+'2','2배로 잘게')}${m2b('x'+i+'3','3배로 잘게')}${m2b('z'+i,'처음으로','font-size:.8rem;padding:2px 8px')}</div>`; return row(0,a,b,'#F2A65A')+row(1,c,d,'#8CC8EE')+`<div style="font-size:.9rem;color:#8A6A4A">두 막대의 한 칸 크기가 같아지게 잘게 나눠요</div>`; },
    on(act){ const i=+act[1]; if(act[0]==='z'){ m[i]=1; return; } const f=+act[2], den=i?d:b; if(den*m[i]*f<=24) m[i]*=f; },
    check(){ return b*m[0]===d*m[1]; }, wrong(){ if(m[0]===1&&m[1]===1) return null; if(m[0]===m[1]&&b!==d) return '두 막대를 같은 배로만 잘랐어요'; return null; },
    reveal(){ const L=_m2lcm(b,d); m=[L/b,L/d]; },
    goal(){ const L=_m2lcm(b,d), fac=x=>{ const t=[]; while(x%2===0){ t.push(2); x/=2; } while(x%3===0){ t.push(3); x/=3; } return x===1?t:null; }, f0=fac(L/b)||[], f1=fac(L/d)||[]; const taps=f0.map(f=>'x0'+f).concat(f1.map(f=>'x1'+f)); return {taps,mis:b!==d?['x02','x12']:null,misName:b!==d&&b*2!==d*2?'두 막대를 같은 배로만 잘랐어요':null}; }, state:()=>({m:m.slice()}) };
  const m_=m2make(o); m_._o=o; return m_; };
M2.qRefine=()=>{ const [b,d]=rndPick([2,3],[2,4],[3,4],[2,6],[3,6],[4,6],[3,2],[4,3]), a=rnd(1,b-1), c=rnd(1,d-1), L=_m2lcm(b,d); return m2q(`${b}분의 ${a}와 ${d}분의 ${c}를 통분하려고 해요. 두 막대를 잘게 나누어 한 칸의 크기를 같게 만들어 보세요.`.replace(/(\d)와 /,(x,v)=>v+('2459'.includes(v)?'와 ':'과 ')),'한 칸의 크기가 같아야 칸의 수를 더하거나 뺄 수 있어요.',M2.refine(a,b,c,d),`${L}분의 ${a*L/b}, ${L}분의 ${c*L/d}`,{'두 막대를 같은 배로만 잘랐어요':'N5-13'}); };

/* 분수의 나눗셈: 몇 번 덜어 낼 수 있나 */
M2.fdiv=(pieces,per,den,whole,alts)=>{ let k=0, x=0; const q=pieces/per;
  const o={ draw(){ const u=Math.min(26,300/pieces); let g=''; for(let i=0;i<pieces;i++){ const gone=i<k*per; g+=`<rect x="${(4+i*u).toFixed(1)}" y="4" width="${u.toFixed(1)}" height="30" fill="${gone?'#E9E2D4':'#F2A65A'}" stroke="#7A4A1E" stroke-width="${whole&&i%den===0?2:.8}" ${gone?'stroke-dasharray="3 2"':''}/>`; }
      return `<svg viewBox="0 0 ${(pieces*u+8).toFixed(0)} 38" style="width:100%;max-width:330px">${g}</svg><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center">${m2b('t',`${den}분의 ${per}만큼 덜어 내기`,'background:#FFD98A')}${m2b('u','되돌리기','font-size:.85rem')}<span style="font-size:.9rem">덜어 낸 횟수 <b>${k}번</b></span></div><div style="display:flex;gap:6px;align-items:center">${m2b('m','−')}<b style="font-size:1.3rem;min-width:110px;text-align:center">몫 ${x}</b>${m2b('p','+')}</div>`; },
    on(a){ if(a==='t'){ if((k+1)*per<=pieces) k++; } else if(a==='u'){ if(k>0) k--; } else x=Math.max(0,Math.min(40,x+(a==='p'?1:-1))); },
    check(){ return x===q; }, wrong(){ return x?(alts[x]||null):null; }, reveal(){ k=q; x=q; },
    goal(){ const mk=Object.keys(alts).map(Number).find(v=>v>0&&v!==q&&v<=40); return {taps:Array(q).fill('t').concat(Array(q).fill('p')),mis:mk?Array(mk).fill('p'):null,misName:mk?alts[mk]:null}; }, state:()=>({k,x}) };
  const m=m2make(o); m._o=o; return m; };
M2.qFdivSame=()=>{ const d=rndPick(5,7,8,9,10), c=rnd(1,3), q=rnd(2,4), n=c*q; if(n>=d+ d||n===c||n>12) return M2.qFdivSame(); const alts={}; if(n-c!==q&&n-c>0) alts[n-c]='한 번만 덜어 내고 남은 칸 수를 답했어요'; return m2q(`${d}분의 ${n} ÷ ${d}분의 ${c} 를 알아봐요. ${d}분의 ${n}에서 ${d}분의 ${c}를 몇 번 덜어 낼 수 있는지 해 보고, 몫을 정해 보세요.`,'나눗셈은 몇 번 덜어 낼 수 있는지 세는 것과 같아요.',M2.fdiv(n,c,d,false,alts),`${q}번 (${n} ÷ ${c} = ${q})`,{'한 번만 덜어 내고 남은 칸 수를 답했어요':'N3-11'}); };
M2.qFdivUnit=()=>{ const a=rnd(2,3), d=rndPick(2,3,4), q=a*d, alts={}; alts[a]='나누면 처음 수보다 커질 수 없다고 봤어요'; if(d!==a&&d!==q) alts[d]='분모만 답했어요'; return m2q(`${a} ÷ ${d}분의 1 을 알아봐요. 길이 ${a}인 띠에서 ${d}분의 1을 몇 번 덜어 낼 수 있는지 해 보고, 몫을 정해 보세요.`,`1 안에 ${d}분의 1이 ${d}번 들어 있어요.`,M2.fdiv(q,1,d,true,alts),`${q}번 (${a} × ${d} = ${q})`,{'나누면 처음 수보다 커질 수 없다고 봤어요':'N6-01','분모만 답했어요':'N6-02'}); };

/* 시각 계산: 단추로 시계를 앞으로(뒤로) 돌려 보기 */
M2.clockGo=(h0,m0,t,dir)=>{ let add=0;
  const o={ draw(){ const tot=h0*60+m0+dir*add, hh=((Math.floor(tot/60)-1)%12+12)%12+1, mm=((tot%60)+60)%60; const steps=[10,5,1]; return `<div style="display:flex;justify-content:center">${clockSvg(hh,mm).replace('width="140"','width="150" height="150"')}</div><div style="font-size:1rem">처음 시각 <b>${h0}시 ${m0}분</b> → ${dir>0?'뒤로':'앞으로'} <b>${add}분</b> 움직였어요</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${steps.map(s=>m2b('p'+s,`${s}분 ${dir>0?'뒤로':'전으로'}`,'background:#FFD98A')).join('')}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${steps.map(s=>m2b('m'+s,`${s}분 되돌리기`,'font-size:.82rem')).join('')}</div>`; },
    on(a){ const s=+a.slice(1); if(a[0]==='p'){ if(add+s<=120) add+=s; } else if(add-s>=0) add-=s; },
    check(){ return add===t; }, wrong(){ return null; }, reveal(){ add=t; },
    goal(){ const taps=[]; let r=t; for(const s of [10,5,1]) while(r>=s){ taps.push('p'+s); r-=s; } return {taps,mis:null,misName:null}; }, state:()=>({add}) };
  const m=m2make(o); m._o=o; return m; };
M2.qClockAfter=()=>{ const h=rnd(1,10), m=rnd(31,55), t=rnd(12,48); if(m+t<60) return M2.qClockAfter(); const tot=h*60+m+t; return m2q(`${h}시 ${m}분에서 ${t}분 뒤의 시각이 되도록 시계를 움직여 보세요.`,'긴바늘이 12를 지나면 짧은바늘이 다음 숫자로 넘어가요. 60분이 1시간이에요.',M2.clockGo(h,m,t,1),`${Math.floor(tot/60)}시 ${tot%60}분`,{}); };
M2.qClockBefore=()=>{ const h=rnd(2,11), m=rnd(5,28), t=rnd(12,48); if(m-t>=0) return M2.qClockBefore(); const tot=h*60+m-t; return m2q(`${h}시 ${m}분에서 ${t}분 전의 시각이 되도록 시계를 움직여 보세요.`,'긴바늘이 12를 거꾸로 지나면 짧은바늘이 앞 숫자 쪽으로 돌아가요.',M2.clockGo(h,m,t,-1),`${Math.floor(tot/60)}시 ${tot%60}분`,{}); };

/* 겉넓이: 전개도의 여섯 면을 모두 찾아 누르기 */
M2.netFaces=(a,b,c)=>{ const sel=new Set(), u=Math.min(16,Math.floor(150/(2*c+2*a)*2)), s=v=>v*u; /* 십자 모양 전개도: 가운데 줄에 [c|a|c|a] × b, 위아래에 a×c */
  const F=[[0,s(c),s(c),s(b),c*b],[s(c),s(c),s(a),s(b),a*b],[s(c)+s(a),s(c),s(c),s(b),c*b],[2*s(c)+s(a),s(c),s(a),s(b),a*b],[s(c),0,s(a),s(c),a*c],[s(c),s(c)+s(b),s(a),s(c),a*c]];
  const o={ draw(){ const W=2*s(c)+2*s(a)+8, H=2*s(c)+s(b)+8; let g=''; F.forEach((f,i)=>{ g+=`<g data-ma="f${i}" style="cursor:pointer"><rect x="${4+f[0]}" y="${4+f[1]}" width="${f[2]}" height="${f[3]}" fill="${sel.has(i)?'#F2A65A':'#FFF8EC'}" stroke="#7A4A1E" stroke-width="1.8"/><text x="${4+f[0]+f[2]/2}" y="${4+f[1]+f[3]/2+4}" font-size="11" text-anchor="middle" fill="#4A2E14" font-weight="700">${sel.has(i)?f[4]:''}</text></g>`; });
      const sum=[...sel].reduce((p,i)=>p+F[i][4],0); return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${Math.min(330,W*1.6)}px;touch-action:manipulation">${g}</svg><div style="font-size:.95rem;text-align:center">가로 ${a} cm, 세로 ${c} cm, 높이 ${b} cm인 상자를 펼친 그림이에요.<br>겉넓이에 들어가는 면을 모두 눌러요 (${sel.size}개, 지금까지 ${sum} cm²)</div>`; },
    on(act){ const i=+act.slice(1); sel.has(i)?sel.delete(i):sel.add(i); }, check(){ return sel.size===6; },
    wrong(){ if(sel.size===3){ const kinds=new Set([...sel].map(i=>F[i][4]+'_'+(i<4?i%2:2))); if(kinds.size===3) return '마주 보는 면을 한 번씩만 셌어요'; } if(sel.size&&sel.size<6) return '빠뜨린 면이 있어요'; return null; },
    reveal(){ for(let i=0;i<6;i++) sel.add(i); }, goal:()=>({taps:[0,1,2,3,4,5].map(i=>'f'+i),mis:['f0','f1','f4'],misName:'마주 보는 면을 한 번씩만 셌어요'}), state:()=>({n:sel.size}) };
  const m=m2make(o); m._o=o; return m; };
M2.qNetFaces=()=>{ let a=rnd(3,6), b=rnd(2,5), c=rnd(2,4); if(a===b) b++; if(c===a) a++; if(b===c) b++; return m2q('직육면체의 겉넓이를 구하려고 해요. 펼친 그림에서 겉넓이에 들어가는 면을 모두 눌러 넓이를 더해 보세요.','직육면체의 면은 6개예요. 마주 보는 면끼리 넓이가 같아요.',M2.netFaces(a,b,c),`겉넓이 ${2*(a*b+b*c+c*a)} cm²`,{'마주 보는 면을 한 번씩만 셌어요':'G6-06','빠뜨린 면이 있어요':'G6-06'}); };

/* 최대공약수: 직사각형을 남김없이 채우는 가장 큰 정사각형 타일 */
M2.tile=(A,B)=>{ let sd=1; const g0=_m2gcd(A,B), OPT=[1,2,3,4,5,6,8,10].filter(v=>v<=Math.min(A,B));
  const o={ draw(){ const u=Math.min(14,Math.floor(300/A)), W=A*u, H=B*u; let g=`<rect x="4" y="4" width="${W}" height="${H}" fill="#FCE3DF" stroke="#7A4A1E" stroke-width="2"/>`; const nx=Math.floor(A/sd), ny=Math.floor(B/sd); for(let y=0;y<ny;y++) for(let x=0;x<nx;x++) g+=`<rect x="${4+x*sd*u}" y="${4+y*sd*u}" width="${sd*u}" height="${sd*u}" fill="#F2A65A" stroke="#7A4A1E" stroke-width="1"/>`; const fit=A%sd===0&&B%sd===0;
      return `<svg viewBox="0 0 ${W+8} ${H+8}" style="width:100%;max-width:${W+8}px">${g}</svg><div style="font-size:.95rem">가로 ${A}, 세로 ${B} · 한 변이 <b>${sd}</b>인 타일: ${fit?'남김없이 채워져요':'남는 곳(분홍)이 있어요'}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${OPT.map(v=>m2b('s'+v,String(v),'min-width:46px;'+(sd===v?'background:#FFD98A;border-color:#D45F16':''))).join('')}</div><div style="font-size:.9rem;color:#8A6A4A">남김없이 채우는 가장 큰 타일을 골라요</div>`; },
    on(a){ sd=+a.slice(1); }, check(){ return sd===g0; },
    wrong(){ if(A%sd===0&&B%sd===0&&sd<g0&&sd>1) return '더 큰 타일이 있는데 작은 타일을 골랐어요'; if((A%sd===0)!==(B%sd===0)) return '한쪽 변만 딱 맞는 타일을 골랐어요'; return null; }, reveal(){ sd=g0; },
    goal(){ const small=OPT.find(v=>v>1&&v<g0&&A%v===0&&B%v===0), one=OPT.find(v=>(A%v===0)!==(B%v===0)); return {taps:['s'+g0],mis:small?['s'+small]:one?['s'+one]:null,misName:small?'더 큰 타일이 있는데 작은 타일을 골랐어요':one?'한쪽 변만 딱 맞는 타일을 골랐어요':null}; }, state:()=>({sd}) };
  const m=m2make(o); m._o=o; return m; };
M2.qTile=()=>{ const [A,B]=rndPick([12,8],[18,12],[20,12],[16,12],[24,18],[20,8],[18,6],[15,10],[24,16]); return m2q(`가로 ${A}, 세로 ${B}인 직사각형을 크기가 같은 정사각형 타일로 남김없이 채우려고 해요. 채울 수 있는 가장 큰 타일의 한 변을 찾아보세요.`,`타일의 한 변은 ${A}도 나누고 ${B}도 나누어야 해요.`,M2.tile(A,B),`한 변 ${_m2gcd(A,B)} (${A}와 ${B}의 최대공약수)`.replace(/(\d)와 /,(x,v)=>v+('2459'.includes(v)?'와 ':'과 ')),{'더 큰 타일이 있는데 작은 타일을 골랐어요':'N5-12','한쪽 변만 딱 맞는 타일을 골랐어요':'N5-11'}); };
/* 최소공배수: 두 개구리가 처음으로 함께 밟는 칸 */
M2.jump=(a,b)=>{ let at=0; const L=_m2lcm(a,b), N=Math.min(a*b,36);
  const o={ draw(){ const per=Math.min(N,12), u=Math.floor(324/per); let g=''; for(let v=1;v<=N;v++){ const r=Math.floor((v-1)/per), c=(v-1)%per, x=4+c*u, y=6+r*52, A=v%a===0, B=v%b===0; g+=`<g data-ma="n${v}" style="cursor:pointer"><rect x="${x}" y="${y}" width="${u-1}" height="40" rx="3" fill="${at===v?'#FFD98A':'#fff'}" stroke="${at===v?'#D45F16':'#C9B38C'}" stroke-width="${at===v?2.4:1}"/><text x="${x+u/2}" y="${y+15}" font-size="13" text-anchor="middle" font-weight="700" fill="#4A2E14">${v}</text>${A?`<circle cx="${x+u/2-4}" cy="${y+28}" r="4" fill="#5BA85B"/>`:''}${B?`<circle cx="${x+u/2+4}" cy="${y+28}" r="4" fill="#E4604E"/>`:''}</g>`; }
      return `<svg viewBox="0 0 ${per*u+8} ${Math.ceil(N/per)*52+8}" style="width:100%;max-width:340px;touch-action:manipulation">${g}</svg><div style="font-size:.92rem;text-align:center"><span style="color:#3F8F3F">●</span> ${a}칸씩 뛰는 개구리 · <span style="color:#D04A3A">●</span> ${b}칸씩 뛰는 개구리<br>두 개구리가 처음으로 함께 밟는 칸을 눌러요</div>`; },
    on(act){ const v=+act.slice(1); at=at===v?0:v; }, check(){ return at===L; },
    wrong(){ if(!at) return null; if(at%a===0&&at%b===0&&at>L) return '처음이 아닌 칸을 골랐어요'; if((at%a===0)!==(at%b===0)) return '한 개구리만 밟는 칸을 골랐어요'; return null; }, reveal(){ at=L; },
    goal(){ const later=2*L<=N?2*L:null, one=a!==L?a:b; return {taps:['n'+L],mis:later?['n'+later]:['n'+one],misName:later?'처음이 아닌 칸을 골랐어요':'한 개구리만 밟는 칸을 골랐어요'}; }, state:()=>({at}) };
  const m=m2make(o); m._o=o; return m; };
M2.qJump=()=>{ const [a,b]=rndPick([2,3],[3,4],[4,6],[2,5],[3,6],[4,5],[6,9],[4,10],[6,8]); return m2q(`${a}칸씩 뛰는 개구리와 ${b}칸씩 뛰는 개구리가 0에서 함께 출발해요. 두 개구리가 처음으로 함께 밟는 칸을 찾아보세요.`,`${a}의 배수이면서 ${b}의 배수인 수 가운데 가장 작은 수예요.`,M2.jump(a,b),`${_m2lcm(a,b)} (${a}와 ${b}의 최소공배수)`.replace(/(\d)와 /,(x,v)=>v+('2459'.includes(v)?'와 ':'과 ')),{'처음이 아닌 칸을 골랐어요':'N5-12','한 개구리만 밟는 칸을 골랐어요':'N5-11'}); };

try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  add('S5-10',M2.qTakeBoth); add('S3-76',M2.qRefine); add('S3-79',M2.qRefine); add('S3-81',M2.qRefine); add('S3-104',M2.qFdivSame); add('S3-106',M2.qFdivUnit);
  add('S6-35',M2.qClockAfter); add('S6-36',M2.qClockBefore); add('S6-76',M2.qNetFaces); add('S3-71',M2.qTile); add('S3-73',M2.qTile); add('S3-72',M2.qJump);
}catch(e){}

// ===== manip2 이어서(11/23 새벽, 제미나이 4차: 다른 나라 평가의 화면 조작형) — 표에서 줄마다 고르기(Smarter Balanced·NAEP), 식 만들기, 반례·두 조건 고르기 =====
/* 표에서 줄마다 하나씩 고르기 */
M2.matrix=(rows,cols)=>{ const sel=rows.map(()=>-1);
  const o={ draw(){ return `<div style="width:100%;max-width:340px;min-width:280px;align-self:center;display:flex;flex-direction:column;gap:6px">`+rows.map((r,i)=>`<div style="background:#fff;border:2px solid #E3CFA8;border-radius:12px;padding:6px"><div style="font-size:1.05rem;text-align:center;margin-bottom:4px">${r.lab}</div><div style="display:flex;gap:4px;justify-content:center">${cols.map((c,j)=>m2b(`r${i}c${j}`,c,`flex:1;font-size:.82rem;padding:4px 2px;${sel[i]===j?'background:#FFD98A;border-color:#D45F16':''}`)).join('')}</div></div>`).join('')+`</div>`; },
    on(a){ const m=a.match(/^r(\d+)c(\d+)$/); if(!m) return; const i=+m[1], j=+m[2]; sel[i]=sel[i]===j?-1:j; },
    check(){ return rows.every((r,i)=>sel[i]===r.ans); },
    wrong(){ if(sel.some(x=>x<0)) return null; for(let i=0;i<rows.length;i++){ if(sel[i]!==rows[i].ans&&rows[i].w&&rows[i].w[sel[i]]) return rows[i].w[sel[i]]; } return null; },
    reveal(){ rows.forEach((r,i)=>{ sel[i]=r.ans; }); },
    goal(){ const taps=rows.map((r,i)=>`r${i}c${r.ans}`); let mis=null, misName=null; const k=rows.findIndex(r=>r.w&&Object.keys(r.w).length); if(k>=0){ const j=+Object.keys(rows[k].w)[0]; mis=taps.slice(); mis[k]=`r${k}c${j}`; misName=rows[k].w[j]; } return {taps,mis,misName}; }, state:()=>({sel:sel.map(x=>x<0?'_':x)}) };
  const m=m2make(o); m._o=o; return m; };
M2.qMatHalf=()=>{ const C=['작다','같다','크다'], pool=shuffle([[3,8,0],[2,5,0],[1,3,0],[4,8,1],[3,6,1],[5,10,1],[5,8,2],[7,10,2],[5,6,2],[7,12,2],[4,9,0]]); const rows=[pool.find(x=>x[2]===0),pool.find(x=>x[2]===1),pool.find(x=>x[2]===2),pool.filter(x=>x[2]!==1)[2]].map(([n,d,a])=>({lab:`${d}분의 ${n}`,ans:a,w:a===2&&d>=8?{0:'분모가 크면 작은 분수라고 봤어요'}:a===0&&d<=5?{2:'분모가 작으면 큰 분수라고 봤어요'}:null}));
  return m2q('분수마다 2분의 1보다 작은지, 같은지, 큰지 골라 보세요.','분자를 2배 한 수가 분모보다 큰지 작은지 살펴봐요.',M2.matrix(shuffle(rows),C),'분수마다 2분의 1과 바르게 견주었어요',{'분모가 크면 작은 분수라고 봤어요':'N3-06','분모가 작으면 큰 분수라고 봤어요':'N3-06'}); };
M2.qMatQuad=()=>{ const C=['항상 맞아요','가끔 맞아요','아니에요'], P=[['직사각형은 평행사변형이에요',0,{2:'포함 관계를 받아들이지 않았어요',1:'포함 관계를 받아들이지 않았어요'}],['평행사변형은 직사각형이에요',1,{0:'거꾸로도 항상 맞다고 봤어요'}],['정사각형은 마름모예요',0,{2:'포함 관계를 받아들이지 않았어요',1:'포함 관계를 받아들이지 않았어요'}],['마름모의 네 각은 모두 직각이에요',1,{0:'거꾸로도 항상 맞다고 봤어요'}],['직사각형의 네 각은 모두 직각이에요',0,null],['마름모의 네 변의 길이는 모두 같아요',0,null],['사다리꼴은 네 변의 길이가 모두 같아요',1,null],['삼각형에는 평행한 변이 있어요',2,null]];
  const rows=shuffle(P).slice(0,4).map(x=>({lab:x[0],ans:x[1],w:x[2]})); if(!rows.some(r=>r.w)) return M2.qMatQuad(); return m2q('사각형에 대한 말이에요. 말마다 알맞은 칸을 골라 보세요.','"항상"인지 "그럴 때도 있는지"를 그림을 떠올려 따져 봐요.',M2.matrix(rows,C),'말마다 바르게 판단했어요',{'포함 관계를 받아들이지 않았어요':'G4-05','거꾸로도 항상 맞다고 봤어요':'G4-05'}); };
M2.qMatMul=()=>{ const n=rndPick(8,12,20,24), C=[`${n}보다 작다`,`${n}${'136780'.includes(String(n).slice(-1))?'과':'와'} 같다`,`${n}보다 크다`], P=[[`${n} × 3분의 2`,0,{2:'곱하면 항상 커진다고 봤어요'}],[`${n} × 4분의 1`,0,{2:'곱하면 항상 커진다고 봤어요'}],[`${n} × 1`,1,{2:'곱하면 항상 커진다고 봤어요'}],[`${n} × 2분의 3`,2,null],[`${n} × 1과 4분의 1`,2,null],[`${n} × 0.5`,0,{2:'곱하면 항상 커진다고 봤어요'}]];
  const rows=shuffle(P).slice(0,4).map(x=>({lab:x[0],ans:x[1],w:x[2]})); if(!rows.some(r=>r.w)||new Set(rows.map(r=>r.ans)).size<2) return M2.qMatMul(); return m2q(`계산하지 않고, 곱이 ${n}보다 큰지 작은지 골라 보세요.`,'1보다 작은 수를 곱하면 처음 수보다 작아져요.',M2.matrix(rows,C),'곱의 크기를 바르게 어림했어요',{'곱하면 항상 커진다고 봤어요':'N5-05'}); };
M2.qMatDiv=()=>{ const n=rndPick(6,8,12), C=[`${n}보다 작다`,`${n}${'136780'.includes(String(n).slice(-1))?'과':'와'} 같다`,`${n}보다 크다`], P=[[`${n} ÷ 0.5`,2,{0:'나누면 항상 작아진다고 봤어요'}],[`${n} ÷ 4분의 1`,2,{0:'나누면 항상 작아진다고 봤어요'}],[`${n} ÷ 1`,1,{0:'나누면 항상 작아진다고 봤어요'}],[`${n} ÷ 2`,0,null],[`${n} ÷ 1.5`,0,null],[`${n} ÷ 0.1`,2,{0:'나누면 항상 작아진다고 봤어요'}]];
  const rows=shuffle(P).slice(0,4).map(x=>({lab:x[0],ans:x[1],w:x[2]})); if(!rows.some(r=>r.w)||new Set(rows.map(r=>r.ans)).size<2) return M2.qMatDiv(); return m2q(`계산하지 않고, 몫이 ${n}보다 큰지 작은지 골라 보세요.`,'1보다 작은 수로 나누면 처음 수보다 커져요.',M2.matrix(rows,C),'몫의 크기를 바르게 어림했어요',{'나누면 항상 작아진다고 봤어요':'N6-01'}); };

/* 식 만들기: 수와 기호 단추를 눌러 식을 세운다 */
M2.build=(nums,target,wrongFn,sol,misSol)=>{ let toks=[]; const used=()=>toks.filter(t=>t[0]==='n').map(t=>+t.slice(1)), SYM={'+':'+','-':'−','*':'×','/':'÷','(':'(',')':')'};
  const str=()=>toks.map(t=>t[0]==='n'?nums[+t.slice(1)]:SYM[t.slice(1)]).join(' ');
  const val=()=>{ if(!toks.length) return null; const js=toks.map(t=>t[0]==='n'?String(nums[+t.slice(1)]):t.slice(1)).join(' '); if(!/^[\d\s+\-*/()]+$/.test(js)) return null; try{ const v=Function('"use strict";return ('+js+')')(); return Number.isFinite(v)?v:null; }catch(e){ return null; } };
  const o={ draw(){ const u=used(); return `<div style="min-height:46px;background:#fff;border:2px solid #E3CFA8;border-radius:12px;padding:8px 10px;font-size:1.3rem;text-align:center;width:100%;max-width:330px">${str()||'<span style="color:#B9A888;font-size:1rem">여기에 식이 만들어져요</span>'}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${nums.map((n,i)=>m2b('n'+i,String(n),`min-width:56px;font-size:1.1rem;${u.includes(i)?'opacity:.35':'background:#E3F1FA'}`)).join('')}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${Object.keys(SYM).map(k=>m2b('o'+k,SYM[k],'min-width:46px;font-size:1.2rem')).join('')}${m2b('bk','지우기','font-size:.9rem')}</div><div style="font-size:.9rem;color:#8A6A4A">수는 한 번씩만 써요. 계산은 하지 않고 식만 세워요.</div>`; },
    on(a){ if(a==='bk'){ toks.pop(); return; } if(toks.length>=15) return; if(a[0]==='n'){ if(used().includes(+a.slice(1))) return; const last=toks[toks.length-1]; if(last&&(last[0]==='n'||last==='o)')) return; } toks.push(a); },
    check(){ const v=val(); return v!=null&&used().length===nums.length&&Math.abs(v-target)<1e-9; },
    wrong(){ const v=val(); if(v==null||used().length!==nums.length) return null; return wrongFn?wrongFn(v,toks.map(t=>t[0]==='n'?nums[+t.slice(1)]:t.slice(1))):null; },
    reveal(){ toks=sol.slice(); }, goal:()=>({taps:sol.slice(),mis:misSol?misSol[0]:null,misName:misSol?misSol[1]:null}), state:()=>({n:toks.length,v:val()==null?'-':val()}) };
  const m=m2make(o); m._o=o; return m; };
M2.qBuildChange=()=>{ const p=rndPick(600,700,800,900), n=rnd(2,4), q=rndPick(1200,1500,1800), P=rndPick(5000,10000); if(p*n+q>=P) return M2.qBuildChange(); const target=P-(p*n+q), noPar=P-p*n+q; return m2q(`${P}원을 내고 ${p}원짜리 공책 ${n}권과 ${q}원짜리 필통 1개를 샀어요. 거스름돈을 구하는 식을 하나로 세워 보세요.`,'산 물건의 값을 모두 더한 것을 낸 돈에서 빼요. 먼저 계산할 곳은 괄호로 묶어요.',M2.build([P,p,n,q],target,v=>Math.abs(v-noPar)<1e-9&&noPar!==target?'괄호를 빼먹었어요':null,['n0','o-','o(','n1','o*','n2','o+','n3','o)'],[['n0','o-','n1','o*','n2','o+','n3'],'괄호를 빼먹었어요']),`${P} − (${p} × ${n} + ${q}) = ${target}`,{'괄호를 빼먹었어요':'N5-09'}); };
M2.qBuildShare=()=>{ const k=rnd(3,8), u=rnd(3,9), N=k*u; return m2q(`도토리 ${N}개를 ${k}명이 똑같이 나누어 가져요. 한 명이 가지는 도토리 수를 구하는 식을 세워 보세요.`,'전체를 사람 수로 나누어요. 나누어지는 수를 먼저 써요.',M2.build([k,N],u,(v,t)=>t.length===3&&t[0]===k&&t[1]==='/'&&t[2]===N?'나누는 수와 나누어지는 수를 바꿨어요':(Math.abs(v-(N-k))<1e-9?'나눗셈 대신 뺄셈을 했어요':null),['n1','o/','n0'],[['n0','o/','n1'],'나누는 수와 나누어지는 수를 바꿨어요']),`${N} ÷ ${k} = ${u}`,{'나누는 수와 나누어지는 수를 바꿨어요':'N3-01','나눗셈 대신 뺄셈을 했어요':'N6-06'}); };
M2.qBuildTwo=()=>{ const a=rnd(12,24), n=rnd(3,6), k=rnd(7,15), target=a*n-k; return m2q(`도토리가 한 봉지에 ${a}개씩 들어 있어요. ${n}봉지를 사서 ${k}개를 먹었어요. 남은 도토리 수를 구하는 식을 하나로 세워 보세요.`,'먼저 모두 몇 개인지 곱셈으로 나타내고, 먹은 만큼 빼요.',M2.build([a,n,k],target,v=>Math.abs(v-(a*n+k))<1e-9?'빼야 할 것을 더했어요':Math.abs(v-a*(n-k))<1e-9||Math.abs(v-(a-k)*n)<1e-9?'먼저 계산할 곳을 잘못 묶었어요':null,['n0','o*','n1','o-','n2'],[['n0','o*','n1','o+','n2'],'빼야 할 것을 더했어요']),`${a} × ${n} − ${k} = ${target}`,{'빼야 할 것을 더했어요':'N1-03','먼저 계산할 곳을 잘못 묶었어요':'N5-09'}); };

/* 글 카드 모두 고르기: 반례 찾기, 두 조건을 모두 채우는 수 */
const _m2txt=t=>`<div style="font-size:1.25rem;padding:14px 0;min-width:70px">${t}</div>`;
M2.qCounterMul=()=>{ const n=rndPick(6,8,12); const items=shuffle([_m2pk(_m2txt('0.5'),1,'곱이 작아지는 수를 빼놓았어요'),_m2pk(_m2txt('4분의 3'),1,'곱이 작아지는 수를 빼놓았어요'),_m2pk(_m2txt('1'),1),_m2pk(_m2txt('2'),0),_m2pk(_m2txt('1.5'),0),_m2pk(_m2txt('3'),0)]); return m2q(`"${n}에 어떤 수를 곱하면 항상 ${n}보다 커진다."는 말이 틀렸다는 것을 보여 주려고 해요. ${n} × □ 가 ${n}보다 커지지 않는 □를 모두 골라 보세요.`,'틀린 말은 맞지 않는 예를 하나만 찾아도 틀렸다고 할 수 있어요.',M2.pick(items),`0.5, 4분의 3, 1 (곱이 ${n}보다 크지 않아요)`,{'곱이 작아지는 수를 빼놓았어요':'N5-05'}); };
M2.qTwoCond=()=>{ const [a,nm]=rndPick([3,'3의 배수'],[4,'4의 배수'],[5,'5의 배수']), odd=a===4?false:rndPick(true,false), c2=odd?'홀수':'짝수', okF=v=>v%a===0&&(v%2===1)===odd, pool=shuffle(Array.from({length:40},(_,i)=>i+6)); const yes=pool.filter(okF).slice(0,3), no1=pool.filter(v=>v%a===0&&!okF(v)).slice(0,a===4?0:2), no2=pool.filter(v=>v%a!==0&&(v%2===1)===odd).slice(0,6-yes.length-no1.length); if(yes.length<2||yes.length+no1.length+no2.length<6) return M2.qTwoCond();
  const items=shuffle([...yes.map(v=>_m2pk(_m2txt(v),1)),...no1.map(v=>_m2pk(_m2txt(v),0,null,'한 조건만 맞는 수를 골랐어요')),...no2.map(v=>_m2pk(_m2txt(v),0,null,'한 조건만 맞는 수를 골랐어요'))]); return m2q(`${nm}이면서 ${c2}인 수를 모두 골라 보세요.`.replace('배수이면서','배수이면서'),'두 조건을 하나씩 모두 확인해요.',M2.pick(items),yes.sort((x,y)=>x-y).join(', '),{'한 조건만 맞는 수를 골랐어요':'N5-11'}); };

try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  add('S3-77',M2.qMatHalf); add('S3-20',M2.qMatHalf); add('S6-31',M2.qMatQuad); add('S3-90',M2.qMatMul); add('S3-94',M2.qMatMul); add('S3-110',M2.qMatDiv); add('S3-108',M2.qMatDiv);
  add('S3-67',M2.qBuildChange); add('S3-66',M2.qBuildChange); add('S2-09',M2.qBuildShare); add('S2-08',M2.qBuildShare); add('S2-16',M2.qBuildTwo); add('S2-13',M2.qBuildTwo);
  add('S3-89',M2.qCounterMul); add('S3-95',M2.qCounterMul); add('S3-69',M2.qTwoCond); add('S3-72',M2.qTwoCond);
}catch(e){}
