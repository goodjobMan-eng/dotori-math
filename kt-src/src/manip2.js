
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
const m2make=(o)=>{ const m={ html:m2wrap(o.draw()), _root:null, _log:[],
    /* 조작한 차례로 '어떻게 했는지' 알아내기(11/23 교수님: "순서로 오답틀을 만들 수 있다, 서버가 아니라 앱 안에서 판단").
       첫 글자 = 방법: T 번갈아 가며 하나씩 / G 한 군데에 몰아서(묶어서) / S 한 가지 단추만 / Q 거의 안 만짐. 뒤에 r = 되돌리기를 2번 넘게 함(해 보며 고침).
       엔진이 따로 정한 방법(strat)이 있으면 그것을 쓴다: one_by_one→T, grouping→G, trade→X(바꾸기 함), no_trade→N. */
    seqTag(){ const L=m._log; let t='Q'; try{ const s=o.strat?o.strat():null; const map={one_by_one:'T',grouping:'G',trade:'X',no_trade:'N'}; const core=L.filter(a=>!/^(undo|del|bk|back|clr|reset|x)\d*$/.test(a)); const kinds=new Set(core).size; let sw=0; for(let i=1;i<core.length;i++) if(core[i]!==core[i-1]) sw++; if(s&&map[s]) t=map[s]; else if(core.length<2) t='Q'; else if(kinds<2) t='S'; else t=sw>=(core.length-1)*0.6?'T':'G'; if(L.length-core.length>2) t+='r'; }catch(e){} return t; },
    /* 서버의 '낸 답' 칸(24자, 정해진 글자만)에 'm:'/'ok:' 뒤로 들어감 → 21자: 방법 + 누른 차례 앞부분(같은 것이 이어지면 '.횟수') + '/' + 마지막 상태 */
    logStr(stateStr){ let out='', i=0; const L=m._log; while(i<L.length){ let j=i; while(j+1<L.length&&L[j+1]===L[i]) j++; out+=L[i]+(j>i?'.'+(j-i+1):''); i=j+1; } const cl=s=>String(s||'').replace(/_/g,',').replace(/[^0-9A-Za-z.,:\-]/g,''); const head=m.seqTag()+':'+cl(out).slice(0,10); return (head+'/'+cl(stateStr)).slice(0,21); },
    mount(root){ m._root=root; m2style(); try{ if(o.tiltTarget) o._last=o.tiltTarget(); }catch(e){} try{ m._drag(root); }catch(e){} root.addEventListener('click',e=>{ const b=e.target&&e.target.closest?e.target.closest('[data-ma]'):null; if(!b||!root.contains(b)||m._lock) return; if(m._skipClick&&Date.now()<m._skipClick){ m._skipClick=0; return; } if(b.dataset.drag&&m._ptAt&&Date.now()-m._ptAt<700) return; e.preventDefault(); const act=b.dataset.ma; if(m._log.length<80) m._log.push(act); try{ o.on(act,b); }catch(err){} if(o.tiltTarget&&o._shown==null) o._shown=o._last==null?o.tiltTarget():o._last; m.redraw(); m._pop(act); m._tween(); if(o.tiltTarget) o._last=o.tiltTarget(); }); },
    /* 끌어 놓기(11/23 교수님: "추를 끌어서 저울로 옮기는 느낌"): data-drag가 붙은 단추를 끌면 그림이 손가락을 따라오고, 그림판(svg) 위에서 놓으면 그 단추를 누른 것과 같다. 그냥 누르기도 그대로 된다. */
    _drag(root){ let d=null; const end=(e,cancel)=>{ if(!d) return; const d0=d, {act,ghost,sx,sy,moved}=d; d=null; try{ ghost&&ghost.remove(); }catch(x){} if(cancel) return; /* 끌지 않고 손을 뗌 = 누르기. 끌기 단추는 여기서 바로 처리한다(일부 기기는 끌기 바로 뒤의 누름에 click을 안 보냄). 뒤따라오는 click은 무시. */ if(!moved){ const b=d0.src; if(b&&b.isConnected&&!m._lock&&e.target&&b.contains(e.target)){ m._ptAt=Date.now(); if(m._log.length<80) m._log.push(act); try{ o.on(act,b); }catch(x){} if(o.tiltTarget&&o._shown==null) o._shown=o._last==null?o.tiltTarget():o._last; m.redraw(); m._pop(act); m._tween(); if(o.tiltTarget) o._last=o.tiltTarget(); } return; } /* 끌고 난 바로 뒤에 따라오는 누름 한 번만 무시(길게 잡으면 다음 누름을 먹음) */ m._skipClick=Date.now()+60; const sv=root.querySelector('svg'); if(!sv) return; const r=sv.getBoundingClientRect(); if(e.clientX>=r.left-10&&e.clientX<=r.right+10&&e.clientY>=r.top-10&&e.clientY<=r.bottom+10&&!m._lock){ if(m._log.length<80) m._log.push(act); try{ o.on(act); }catch(x){} if(o.tiltTarget&&o._shown==null) o._shown=o._last==null?o.tiltTarget():o._last; m.redraw(); m._tween(); if(o.tiltTarget) o._last=o.tiltTarget(); try{ sfx('pop'); }catch(x){} } };
      root.addEventListener('pointerdown',e=>{ const b=e.target&&e.target.closest?e.target.closest('[data-drag]'):null; if(!b||m._lock) return; d={act:b.dataset.ma,sx:e.clientX,sy:e.clientY,moved:false,ghost:null,src:b}; });
      root.addEventListener('pointermove',e=>{ if(!d) return; const dx=e.clientX-d.sx, dy=e.clientY-d.sy; if(!d.moved&&dx*dx+dy*dy<100) return; if(!d.moved){ d.moved=true; const g=d.src.cloneNode(true); g.removeAttribute('data-ma'); g.removeAttribute('data-drag'); const r=d.src.getBoundingClientRect(); g.style.cssText+=`;position:fixed;left:0;top:0;width:${r.width}px;margin:0;z-index:9999;pointer-events:none;opacity:.92;box-shadow:0 8px 18px rgba(0,0,0,.25);transform:translate(${e.clientX-r.width/2}px,${e.clientY-r.height/2}px) scale(1.08)`; document.body.appendChild(g); d.ghost=g; d.w=r.width; d.h=r.height; } if(d.ghost) d.ghost.style.transform=`translate(${e.clientX-d.w/2}px,${e.clientY-d.h/2}px) scale(1.08)`; e.preventDefault(); },{passive:false});
      root.addEventListener('pointerup',e=>end(e,false)); root.addEventListener('pointercancel',e=>end(e,true)); },
    _pop(act){ try{ const el=m._root&&[...m._root.querySelectorAll('[data-ma]')].find(x=>x.dataset.ma===act); if(el&&el.tagName==='BUTTON'){ el.classList.add('m2-pop'); } }catch(e){} },
    /* 저울처럼 기울기가 있는 판: 목표 기울기까지 몇 장면에 걸쳐 움직임(값 판정과는 무관, 보이는 것만) */
    _tween(){ if(!o.tiltTarget||typeof requestAnimationFrame!=='function') return; const to=o.tiltTarget(), from=o._shown==null?to:o._shown; if(Math.abs(to-from)<.01){ o._shown=to; return; } const id=(m._tw=(m._tw||0)+1), t0=Date.now(), D=260; /* 장면마다 그림(svg)만 바꾼다: 단추까지 다시 그리면 누르는 도중에 단추가 바뀌어 누름이 사라질 수 있음 */ const paint=()=>{ try{ const h=o.draw(), i=h.indexOf('<svg'), j=h.indexOf('</svg>'), cur=m._root&&m._root.querySelector('svg'); if(cur&&i>=0&&j>i){ const tmp=document.createElement('div'); tmp.innerHTML=h.slice(i,j+6); const ns=tmp.firstElementChild; if(ns) cur.innerHTML=ns.innerHTML; } }catch(e){} }; const step=()=>{ if(id!==m._tw) return; const k=Math.min(1,(Date.now()-t0)/D), e=1-Math.pow(1-k,3); o._shown=from+(to-from)*e; paint(); if(k<1) requestAnimationFrame(step); }; o._shown=from; paint(); requestAnimationFrame(step); },
    redraw(){ if(m._root) m._root.innerHTML=m2wrap(o.draw()); },
    check(){ let ok=false; try{ ok=!!o.check(); }catch(e){} try{ window.__manipStrat=m.seqTag(); }catch(e){} try{ const w=m._root&&m._root.querySelector('.m2'); if(w){ w.classList.remove('m2-ok','m2-no'); void w.offsetWidth; w.classList.add(ok?'m2-ok':'m2-no'); } }catch(e){} return ok; },
    wrong(){ try{ return o.wrong?o.wrong():null; }catch(e){ return null; } },
    reveal(){ try{ o.reveal&&o.reveal(); }catch(e){} m._lock=true; m._tw=(m._tw||0)+1; o._shown=null; m.redraw(); }, state:()=>o.state?o.state():null, goal:()=>o.goal?o.goal():null };
  return m; };
const m2q=(text,hint,m,ansText,mis)=>{ const q=MQ(text,hint,m,ansText); if(mis) q.mis=mis; /* 틀렸을 때 풀이 맨 위에 '내가 한 것'을 한 줄로 짚어 준다(네온 11/23: 자율학습에서는 정답 풀이만으로는 자기 생각의 어디가 틀렸는지 모름) */ try{ const h0=q.hint||hint||''; Object.defineProperty(q,'hint',{configurable:true,enumerable:true,get(){ let w=null; try{ w=m._log&&m._log.length?m.wrong():null; }catch(e){} return w?`<span class="kt-mine" style="display:block;margin-bottom:4px;color:#B04A2E">내 생각 점검: ${w}</span>${h0}`:h0; },set(v){} }); }catch(e){} /* 앱의 조작 기록 방식에 맞춤: 처음 [다 했어요] 때의 상태(짧은 글)와 오개념 코드 */ const s0=m.state; m.state=()=>{ const v=s0(); try{ Object.defineProperty(v,'toString',{value:()=>m.logStr(JSON.stringify(v).replace(/["{}]/g,'')),enumerable:false}); }catch(e){} return v; }; m.mcode=()=>{ const w=m.wrong(); return w&&mis&&mis[w]?mis[w]:null; }; return q; };

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
/* 소수점 찍기 (11/23 다시 만듦 — 교수님: "오히려 오개념이 생기겠다", 제미나이 네온과 상의)
   전: 자리를 맞추려고 0을 미리 채워 '0 8 7'을 보여 주고 사이를 누르게 함 → 정답이 '08.7'이라는 틀린 표기가 됨.
   지금: 숫자만 놓고( 8 7 ) 그 앞·사이·뒤를 누른다. 앞을 누르면 그때 '0.'이 생겨 0.87, 한 칸 더 앞은 0.087, 사이는 8.7, 맨 뒤는 87(소수점 없음).
   누를 곳은 답과 상관없이 늘 같은 개수(숫자 수 + 2)라서 자리 수가 답을 알려 주지 않는다. pos = 소수점 아래 자리 수. */
M2.point=(digits,pos,alts)=>{ let at=-1; const D=String(digits).split(''), L=D.length;
  const txt=s=>s<0?'':s===0?D.join(''):s<L?D.slice(0,L-s).join('')+'.'+D.slice(L-s).join(''):'0.'+'0'.repeat(s-L)+D.join('');
  const o={ draw(){ const slot=(s,lab)=>m2b('g'+s,at===s?`<b style="color:#D45F16;font-size:${s===0?'1rem':'1.9rem'}">${lab}</b>`:`<span style="color:#C9B28A;font-size:${s===0?'.8rem':'1.4rem'}">${s===0?'점 없음':'·'}</span>`,'min-width:'+(s===0?(L>=4?40:46):(L>=4?28:34))+'px;min-height:50px;padding:0 1px;border-style:dashed;'+(at===s?'background:#FFE9B8;border-color:#D45F16':''));
      let h=`<div style="display:flex;align-items:flex-end;justify-content:center;gap:2px;font-size:2rem;line-height:1">`+slot(L+1,'0.0')+slot(L,at===L+1?'':'0.');
      for(let i=0;i<L;i++){ h+=`<span style="display:inline-block;min-width:20px;text-align:center;padding:4px 0;border-bottom:3px solid #C9A56B">${D[i]}</span>`; const s=L-1-i; h+=slot(s,s===0?'점 없음':'.'); }
      return h+`</div><div style="font-size:1rem;color:#6B4A1E;margin-top:6px;min-height:1.5em">${at<0?'<span style="font-size:.9rem;color:#8A6A4A">소수점이 들어갈 자리를 눌러요. 다시 누르면 지워져요.</span>':`지금 만든 수: <b style="font-size:1.25rem;color:#D45F16">${txt(at)}</b>`}</div>`; },
    on(a){ const i=+a.slice(1); at=at===i?-1:i; }, check(){ return at===pos; },
    wrong(){ if(at<0) return null; return (alts&&alts[at])||'소수점의 자리가 달라요'; }, reveal(){ at=pos; },
    goal:()=>{ const ws=Object.keys(alts||{}).map(Number).filter(x=>x!==pos); const w=ws.length?ws[0]:(pos===1?2:1); return {pos,alts:alts||{},taps:['g'+pos],mis:['g'+w],misName:(alts&&alts[w])||'소수점의 자리가 달라요'}; }, state:()=>({at:at<0?'_':at}) };
  const m=m2make(o); m._o=o; return m; };
const _dstr=(n,d)=>d?(n/Math.pow(10,d)).toFixed(d):String(n);
M2.qPointMul=()=>{ const da=rndPick(1,1,2), db=rndPick(0,1,1,2); if(da+db>3) return M2.qPointMul(); const A=da===1?rnd(2,9)+rndPick(0,0,10,20,30):rnd(2,9)+rndPick(0,10,20), B=rnd(2,9); const P=A*B; if(P%10===0) return M2.qPointMul();
  const d=da+db, L=String(P).length, alts={}, mx=Math.max(da,db); if(d>L+1) return M2.qPointMul(); if(mx!==d) alts[mx]='소수 자릿수가 많은 쪽만 따랐어요'; alts[0]=alts[0]||'소수점을 찍지 않았어요'; for(let i=1;i<=L+1;i++) if(i!==d&&!alts[i]) alts[i]='소수점의 자리가 달라요'; delete alts[d];
  return m2q(`${A} × ${B} = ${P}를 보고, ${_dstr(A,da)} × ${_dstr(B,db)}의 값이 되도록 소수점 자리를 눌러 보세요.`,`곱하는 두 수의 소수점 아래 자리 수를 더한 만큼(${da} + ${db} = ${d}자리) 소수점 아래 자리가 생겨요.`,M2.point(String(P),d,alts),`${_dstr(A,da)} × ${_dstr(B,db)} = ${_dstr(P,d)}`,{'소수 자릿수가 많은 쪽만 따랐어요':'N5-07','소수점의 자리가 달라요':'N5-07','소수점을 찍지 않았어요':'N5-07'}); };
M2.qPointDiv=()=>{ const d=rndPick(1,1,2), n=rnd(2,9), Q=rnd(12,98), A=Q*n; if(Q%10===0||A>=1000||A%10===0) return M2.qPointDiv(); /* A가 0으로 끝나면 2.70처럼 어색한 소수가 됨 */ const L=String(Q).length, alts={0:'소수점을 찍지 않았어요'}; for(let i=1;i<=L+1;i++) if(i!==d) alts[i]='소수점의 자리가 달라요';
  const a=A/Math.pow(10,d), est=a>=10?Math.round(a/10)*10:a>=1?Math.round(a):null;
  return m2q(`${A} ÷ ${n} = ${Q}를 보고, ${_dstr(A,d)} ÷ ${n}의 몫이 되도록 소수점 자리를 눌러 보세요.`,(est&&est>=n?`어림해 봐요. ${_dstr(A,d)}는 ${est}쯤이니까 몫은 ${est} ÷ ${n}쯤이 되어야 해요. `:'')+`나누어지는 수가 ${Math.pow(10,d)}분의 1이 되면 몫도 ${Math.pow(10,d)}분의 1이 돼요.`,M2.point(String(Q),d,alts),`${_dstr(A,d)} ÷ ${n} = ${_dstr(Q,d)}`,{'소수점의 자리가 달라요':'N6-07','소수점을 찍지 않았어요':'N6-07'}); };
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
  const o={ draw(){ const u=Math.floor(300/n); let g=''; for(let i=0;i<n;i++) g+=`<rect data-ma="b${i+1}" x="${4+i*u}" y="14" width="${u}" height="34" fill="${i<k?'#F2A65A':'#fff'}" stroke="#7A4A1E" stroke-width="1.4" style="cursor:pointer"/>`; for(let i=0;i<=n;i+=labels.every) g+=`<text x="${4+i*u}" y="62" font-size="10" text-anchor="${i===0?'start':i===n?'end':'middle'}" fill="#4A2E14">${labels.fn(i)}</text>`; return `<svg viewBox="0 0 ${n*u+8} 68" style="width:100%;max-width:${n*u+8}px;touch-action:manipulation">${g}</svg><div style="display:flex;gap:8px;align-items:center">${m2b('m','한 칸 덜기')}<b>${k}칸 칠함</b>${m2b('p','한 칸 더')}</div>`; },
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
  /* 추 그림: 손잡이가 달린 놋쇠 추. 무거울수록 크게(가장 무거운 것을 1로 두고, 너무 작아지지 않게 아래를 막음) */
  const vmax=Math.max(...cfg.types.map(t=>t.v)), wOf=v=>Math.round(40*Math.max(.52,Math.min(1.1,Math.pow(Math.min(v,vmax)/vmax,.36))));
  const brass=(cx,by,W,lab,kind)=>{ const H=W*.82, k=W*.2, fs=Math.max(6.5,Math.min(11,W/(String(lab).length*.6))), c1=kind==='fix'?'#D9E2EC':kind==='box'?'#F9C6CF':'#F4D27A', c2=kind==='fix'?'#9FB0C2':kind==='box'?'#E48FA3':'#C99A2E';
    return `<g><rect x="${(cx-k/2).toFixed(1)}" y="${(by-H-k*.9).toFixed(1)}" width="${k.toFixed(1)}" height="${(k*1.1).toFixed(1)}" fill="${c2}" stroke="#4A2E14" stroke-width="1.2"/><circle cx="${cx.toFixed(1)}" cy="${(by-H-k*.9).toFixed(1)}" r="${(k*.62).toFixed(1)}" fill="${c1}" stroke="#4A2E14" stroke-width="1.2"/><rect x="${(cx-W/2).toFixed(1)}" y="${(by-H).toFixed(1)}" width="${W}" height="${H.toFixed(1)}" rx="${(W*.16).toFixed(1)}" fill="${c1}" stroke="#4A2E14" stroke-width="1.5"/><rect x="${(cx-W/2+2).toFixed(1)}" y="${(by-H*.34).toFixed(1)}" width="${W-4}" height="${(H*.26).toFixed(1)}" rx="2" fill="${c2}" opacity=".55"/><text x="${cx.toFixed(1)}" y="${(by-H*.48+fs*.36).toFixed(1)}" font-size="${fs.toFixed(1)}" text-anchor="middle" font-weight="700" fill="#4A2E14">${lab}</text></g>`; };
  const thing=(cx,by,e)=>`<text x="${cx}" y="${by-4}" font-size="34" text-anchor="middle">${e}</text>`;
  /* 접시 위에 왼쪽부터 놓고, 한 줄(너비 100)이 차면 위로 쌓는다 */
  const stack=(items)=>{ let x=-50, y=-5, rowH=0, out=''; const tot=items.reduce((p,it)=>p+it.w+2,0); if(tot<100) x=-tot/2; for(const it of items){ if(x+it.w>52&&x>-50){ x=-50; y-=rowH+2; rowH=0; } out+=it.e?thing(x+it.w/2,y,it.e):brass(x+it.w/2,y,it.w,it.lab,it.kind); x+=it.w+2; rowH=Math.max(rowH,it.e?34:it.w*1.05); } return out; };
  const o={ tiltTarget(){ return Math.max(-11,Math.min(11,(sumL-(sumR+added()))/big*40)); }, draw(){ const tilt=o._shown!=null?o._shown:o.tiltTarget(), rad=tilt*Math.PI/180, dy=100*Math.sin(rad), dx=100*Math.cos(rad), lx=160-dx, ly=96+dy, rx=160+dx, ry=96-dy;
      const short=t=>String(t).replace(' ',''); const L=cfg.left.map(x=>x.hid?(x.emoji?{e:x.emoji,w:38}:{lab:'□',kind:'box',w:36}):{lab:x.lab,kind:'fix',w:Math.max(24,wOf(x.v))}), R=cfg.right.map(x=>({lab:x.lab,kind:'fix',w:Math.max(24,wOf(x.v))})); cnt.forEach((c,i)=>{ const t=cfg.types[i], W=wOf(t.v); if(c>6) R.push({lab:short(t.lab)+'×'+c,w:Math.max(W,44)}); else for(let k=0;k<c;k++) R.push({lab:short(t.lab),w:W}); });
      const pan=(x,y,items)=>`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y+30).toFixed(1)}" stroke="#7A4A1E" stroke-width="1.5"/><g transform="translate(${x.toFixed(1)} ${(y+30).toFixed(1)})"><path d="M-50 0 Q0 24 50 0" fill="#F4E3C1" stroke="#7A4A1E" stroke-width="2"/>${stack(items)}</g>`;
      const g=`<line x1="160" y1="176" x2="160" y2="96" stroke="#7A4A1E" stroke-width="5"/><rect x="128" y="174" width="64" height="8" rx="3" fill="#7A4A1E"/><line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#7A4A1E" stroke-width="5" stroke-linecap="round"/>${pan(lx,ly,L)}${pan(rx,ry,R)}`;
      /* 받침 위의 추: 끌어서 저울 위에 놓거나 눌러서 올린다 */
      const tray=cfg.types.map((t,i)=>{ const W=wOf(t.v), H=W*.82+W*.2*1.6+4; return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">${m2b('a'+i,`<svg viewBox="0 0 ${W+6} ${H.toFixed(0)}" width="${Math.round((W+6)*1.25)}" height="${Math.round(H*1.25)}" style="display:block;pointer-events:none">${brass((W+6)/2,H-2,W,short(t.lab))}</svg><div style="font-size:.78rem;line-height:1.1">${t.lab}${t.max&&t.max<=2?` (${t.max-cnt[i]}개 남음)`:''}</div>`,'background:#FFF8EC;padding:4px 6px;touch-action:none;cursor:grab').replace('data-ma=','data-drag="1" data-ma=')}${m2b('r'+i,'빼기','font-size:.78rem;min-height:36px;padding:2px 10px')}</div>`; }).join('');
      return `<svg viewBox="0 0 320 190" style="width:100%;max-width:330px">${g}</svg><div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;background:#EAD9B8;border-radius:12px;padding:6px 10px">${tray}</div><div style="font-size:.9rem;color:#8A6A4A">${cfg.note||'추를 끌어서 접시에 올려요 (눌러도 올라가요)'}</div>`; },
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
M2.qWeigh=()=>{ const [nm,e]=rndPick(['수박','🍉'],['책가방','🎒'],['호박','🎃'],['도토리 바구니','🧺']), w=rnd(8,38)*100; return m2q(`${nm}의 무게를 재어 봐요. 오른쪽 접시에 추를 올려 저울이 수평이 되게 해 보세요.`,'무거운 추부터 올리고, 넘치면 가벼운 추로 바꿔요.',M2.scale({left:[{v:w,hid:1,emoji:e}],right:[],types:_TKG,note:'추를 끌어서 접시에 올려요 (눌러도 올라가요)'}),`${Math.floor(w/1000)?Math.floor(w/1000)+' kg ':''}${w%1000?w%1000+' g':''}`.trim(),{}); };
M2.qWeighLim=()=>{ const kg=rndPick(2,2,3), g=rnd(1,4)*100, w=kg*1000+g, T=[{v:1000,lab:'1 kg',max:1},{v:500,lab:'500 g',max:6},{v:100,lab:'100 g',max:9}]; if((w-1000)>6*500+9*100) return M2.qWeighLim(); const misN=(kg-1)+g/100; return m2q(`무게가 ${kg} kg ${g} g인 도토리 바구니와 수평이 되게 추를 올려 보세요. 1 kg 추는 1개뿐이에요!`,'1 kg은 1000 g이에요. 500 g 추 2개, 100 g 추 10개와 같아요.',M2.scale({left:[{v:w,hid:1,emoji:'🧺'}],right:[],types:T,note:'1 kg 추는 1개뿐! 모자라면 500 g, 100 g 추로 채워요',wrongFn:(x,c)=>c[0]===1&&c[1]===0&&c[2]===misN?'1 kg을 100 g 추 1개로 바꿔 올렸어요':null,misTaps:()=>{ const t=['a0']; for(let k=0;k<misN;k++) t.push('a2'); return [t,'1 kg을 100 g 추 1개로 바꿔 올렸어요']; }}),`1 kg 추 1개와 나머지 ${w-1000} g`,{'1 kg을 100 g 추 1개로 바꿔 올렸어요':'G3-05'}); };

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

// ===== manip2 이어서(11/23 새벽): 두 막대 모형(싱가포르식) · 모눈에 점 찍어 도형 완성 =====
/* 두 막대: mode 'set'(두 막대의 칸 수를 정해 합과 차를 맞춤) / 'move'(긴 막대에서 짧은 막대로 한 칸씩 옮겨 같게) */
M2.bars=(mode,P)=>{ let A=mode==='set'?0:P.a, B=mode==='set'?0:P.b, moved=0; const MAX=mode==='set'?P.S:P.a;
  const bar=(n,col,nm)=>`<div style="display:flex;align-items:center;gap:6px;width:100%;max-width:340px"><b style="min-width:42px">${nm}</b><div style="display:flex;flex-wrap:wrap;gap:1px;flex:1;min-height:26px">${Array.from({length:n},()=>`<span style="display:inline-block;width:${Math.max(8,Math.min(20,Math.floor(250/Math.max(MAX,10))))}px;height:24px;background:${col};border:1px solid #7A4A1E;border-radius:2px"></span>`).join('')}</div><b style="min-width:30px;text-align:right">${n}</b></div>`;
  const o={ draw(){ let h=bar(A,'#F2A65A',P.names[0])+bar(B,'#8CC8EE',P.names[1]);
      if(mode==='set') h+=`<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center">${m2b('A5',`${P.names[0]} +5`)}${m2b('A1',`${P.names[0]} +1`)}${m2b('a1',`${P.names[0]} −1`,'font-size:.85rem')}</div><div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center">${m2b('B5',`${P.names[1]} +5`)}${m2b('B1',`${P.names[1]} +1`)}${m2b('b1',`${P.names[1]} −1`,'font-size:.85rem')}</div><div style="font-size:.95rem">합 <b>${A+B}</b> · 차 <b>${Math.abs(A-B)}</b></div>`;
      else h+=`<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('mv',`${P.names[0]} → ${P.names[1]} 한 칸 주기`,'background:#FFD98A')}${m2b('bk','한 칸 되돌리기','font-size:.85rem')}</div><div style="font-size:.95rem">지금까지 <b>${moved}칸</b> 주었어요</div>`; return h; },
    on(a){ if(mode==='set'){ const d={A5:[5,0],A1:[1,0],a1:[-1,0],B5:[0,5],B1:[0,1],b1:[0,-1]}[a]; if(!d) return; A=Math.max(0,Math.min(MAX,A+d[0])); B=Math.max(0,Math.min(MAX,B+d[1])); } else if(a==='mv'){ if(A>0){ A--; B++; moved++; } } else if(a==='bk'){ if(moved>0){ A++; B--; moved--; } } },
    check(){ return mode==='set'?(A+B===P.S&&A-B===P.d):(A===B); },
    wrong(){ if(mode==='set'){ if(!A&&!B) return null; if(A===P.S-P.d&&B===P.d) return '합에서 차를 뺀 수를 그대로 놓았어요'; if(A-B===P.d&&A+B!==P.S) return '차만 맞췄어요'; if(A+B===P.S&&A-B!==P.d) return '합만 맞췄어요'; return null; } if(moved===P.a-P.b) return '차이만큼 모두 주었어요'; return null; },
    reveal(){ if(mode==='set'){ A=(P.S+P.d)/2; B=(P.S-P.d)/2; } else { const k=(P.a-P.b)/2; A=P.a-k; B=P.b+k; moved=k; } },
    goal(){ if(mode==='set'){ const ta=(n,c)=>{ const t=[]; for(let i=0;i<Math.floor(n/5);i++) t.push(c+'5'); for(let i=0;i<n%5;i++) t.push(c+'1'); return t; }, a=(P.S+P.d)/2, b=(P.S-P.d)/2; return {taps:ta(a,'A').concat(ta(b,'B')),mis:ta(P.S-P.d,'A').concat(ta(P.d,'B')),misName:'합에서 차를 뺀 수를 그대로 놓았어요'}; } const k=(P.a-P.b)/2; return {taps:Array(k).fill('mv'),mis:Array(P.a-P.b).fill('mv'),misName:'차이만큼 모두 주었어요'}; }, state:()=>({A,B,moved}) };
  const m=m2make(o); m._o=o; return m; };
M2.qBarsSumDiff=()=>{ const b=rnd(4,12), d=rnd(2,6), a=b+d, S=a+b; if(S-d===a||S>34) return M2.qBarsSumDiff(); return m2q(`도토와 람이가 주운 도토리는 모두 ${S}개이고, 도토가 람이보다 ${d}개 더 많이 주웠어요. 두 막대의 칸 수를 정해 두 사람이 주운 도토리 수를 나타내 보세요.`,'합과 차를 둘 다 맞춰야 해요. 차만큼을 먼저 떼어 놓고 나머지를 똑같이 나누어 봐요.',M2.bars('set',{S,d,names:['도토','람이']}),`도토 ${a}개, 람이 ${b}개`,{'합에서 차를 뺀 수를 그대로 놓았어요':'N1-12','차만 맞췄어요':'N1-12','합만 맞췄어요':'N1-12'}); };
M2.qBarsGive=()=>{ const b=rnd(3,9), k=rnd(2,5), a=b+2*k; return m2q(`도토는 구슬이 ${a}개, 람이는 ${b}개 있어요. 도토가 람이에게 구슬을 한 개씩 주어 두 사람의 구슬 수가 같아지게 해 보세요.`,'한 개를 주면 도토는 1개 줄고 람이는 1개 늘어서, 차이는 2개씩 줄어요.',M2.bars('move',{a,b,names:['도토','람이']}),`${k}개를 주면 둘 다 ${b+k}개`,{'차이만큼 모두 주었어요':'N1-12'}); };

/* 모눈의 점을 눌러 도형 완성하기: 세 점이 주어지고 네 번째 꼭짓점을 찍음 */
M2.gridPt=(pts,ans,alts,W,H,label)=>{ let at=null; const u=30, X=x=>18+x*u, Y=y=>18+(H-y)*u, eq=(p,q)=>p&&q&&p[0]===q[0]&&p[1]===q[1];
  const o={ draw(){ let g=''; for(let x=0;x<=W;x++) g+=`<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(H)}" stroke="#E6D8BE"/>`; for(let y=0;y<=H;y++) g+=`<line x1="${X(0)}" y1="${Y(y)}" x2="${X(W)}" y2="${Y(y)}" stroke="#E6D8BE"/>`;
      const all=at?pts.concat([at]):pts; if(at) g+=`<polygon points="${all.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="#FFE3B0" fill-opacity=".7" stroke="#7A4A1E" stroke-width="2"/>`; else g+=`<polyline points="${pts.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="#7A4A1E" stroke-width="2"/>`;
      for(let x=0;x<=W;x++) for(let y=0;y<=H;y++){ if(pts.some(p=>p[0]===x&&p[1]===y)) continue; g+=`<circle data-ma="g${x}_${y}" cx="${X(x)}" cy="${Y(y)}" r="12" fill="${eq(at,[x,y])?'#E4604E':'#fff'}" fill-opacity="${eq(at,[x,y])?1:.01}" style="cursor:pointer"/><circle cx="${X(x)}" cy="${Y(y)}" r="2" fill="#C9B38C" pointer-events="none"/>`; }
      pts.forEach((p,i)=>{ g+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="#7A4A1E"/><text x="${X(p[0])-10}" y="${Y(p[1])-8}" font-size="13" font-weight="700" fill="#4A2E14">${'ㄱㄴㄷ'[i]}</text>`; }); if(at) g+=`<text x="${X(at[0])+8}" y="${Y(at[1])-8}" font-size="13" font-weight="700" fill="#D04A3A">ㄹ</text>`;
      return `<svg viewBox="0 0 ${W*u+36} ${H*u+36}" style="width:100%;max-width:${Math.min(340,W*u+36)}px;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A">${label}</div>`; },
    on(a){ const [x,y]=a.slice(1).split('_').map(Number); at=eq(at,[x,y])?null:[x,y]; },
    check(){ return eq(at,ans); }, wrong(){ if(!at) return null; const k=at.join(','); return alts[k]||null; }, reveal(){ at=ans.slice(); },
    goal(){ const mk=Object.keys(alts)[0]; return {taps:[`g${ans[0]}_${ans[1]}`],mis:mk?['g'+mk.replace(',','_')]:null,misName:mk?alts[mk]:null}; }, state:()=>({at:at?at.join('_'):'_'}) };
  const m=m2make(o); m._o=o; return m; };
M2.qGridPara=()=>{ const W=8, H=5, ax=rnd(1,2), ay=rnd(0,1), w=rnd(3,4), sx=rnd(1,2), h=rnd(2,3); const Aq=[ax+sx,ay+h], Bq=[ax,ay], Cq=[ax+w,ay], D=[ax+sx+w,ay+h]; if(D[0]>W||D[1]>H) return M2.qGridPara(); const alts={}; const up=[ax+w,ay+h]; if(up[0]!==D[0]) alts[up.join(',')]='비스듬한 변을 곧게 세웠어요'; const mir=[ax+w-sx,ay+h]; if(mir[0]>=0&&mir.join(',')!==D.join(',')&&!alts[mir.join(',')]&&!(mir[0]===Aq[0]&&mir[1]===Aq[1])) alts[mir.join(',')]='마주 보는 변이 나란하지 않아요';
  return m2q('점 ㄱ, ㄴ, ㄷ이 있어요. 사각형 ㄱㄴㄷㄹ이 평행사변형이 되도록 점 ㄹ을 찍어 보세요.','마주 보는 변끼리 서로 평행하고 길이가 같아야 해요. ㄴ에서 ㄱ으로 가는 만큼 ㄷ에서도 가 봐요.',M2.gridPt([Aq,Bq,Cq],D,alts,W,H,'모눈의 점을 눌러 ㄹ을 찍어요'),'마주 보는 두 쌍의 변이 평행해요',{'비스듬한 변을 곧게 세웠어요':'G4-06','마주 보는 변이 나란하지 않아요':'G4-03'}); };
M2.qGridRect=()=>{ const W=8, H=5, ax=rnd(1,3), ay=rnd(0,1), w=rnd(3,4), h=rnd(2,3), Aq=[ax,ay+h], Bq=[ax,ay], Cq=[ax+w,ay], D=[ax+w,ay+h], alts={}; alts[[ax+w+1,ay+h].join(',')]='직각이 아닌 각이 생겼어요'; alts[[ax+w,ay+h+1>H?ay+h-1:ay+h+1].join(',')]='마주 보는 변의 길이가 달라요';
  return m2q('점 ㄱ, ㄴ, ㄷ이 있어요. 사각형 ㄱㄴㄷㄹ이 직사각형이 되도록 점 ㄹ을 찍어 보세요.','네 각이 모두 직각이어야 해요.',M2.gridPt([Aq,Bq,Cq],D,alts,W,H,'모눈의 점을 눌러 ㄹ을 찍어요'),'네 각이 모두 직각이에요',{'직각이 아닌 각이 생겼어요':'G3-02','마주 보는 변의 길이가 달라요':'G3-02'}); };
try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  add('S2-07',M2.qBarsSumDiff); add('S2-04',M2.qBarsSumDiff); add('S2-06',M2.qBarsGive); add('S2-01',M2.qBarsGive); add('S6-30',M2.qGridPara); add('S6-20',M2.qGridPara); add('S6-19',M2.qGridRect); add('S6-21',M2.qGridRect);
}catch(e){}

// ===== manip2 이어서(11/23 아침, 교수님: "들이가 다른 느낌, 상자가 아니라 구체적인 물건, 액체가 옮겨지는 느낌으로") =====
/* 물 붓기: 1 L 병과 100 mL 컵(크기가 다름)으로 눈금 있는 통에 물을 부어 들이를 만든다. 지금 든 양은 숫자로 알려 주지 않고 통의 눈금으로 읽는다. */
M2.pour=(target)=>{ const cnt=[0,0], cap=(Math.floor(target/1000)+2)*1000, lvl=()=>cnt[0]*1000+cnt[1]*100; let src=-1;
  const o={ tiltTarget(){ return lvl(); },
    draw(){ const shown=o._shown!=null?o._shown:lvl(), BX=176, BW=104, BY=14, BH=160, yOf=v=>BY+BH-(v/cap)*BH, moving=Math.abs(shown-lvl())>1;
      let g=`<rect x="${BX}" y="${yOf(shown).toFixed(1)}" width="${BW}" height="${(BY+BH-yOf(shown)).toFixed(1)}" fill="#8CC8EE"/>`+(shown>0?`<rect x="${BX}" y="${yOf(shown).toFixed(1)}" width="${BW}" height="3" fill="#C9E8FA"/>`:'');
      for(let v=100;v<cap;v+=100){ const big=v%1000===0, mid=v%500===0; g+=`<line x1="${BX}" y1="${yOf(v).toFixed(1)}" x2="${BX+(big?34:mid?22:12)}" y2="${yOf(v).toFixed(1)}" stroke="#4A2E14" stroke-width="${big?2:1}"/>`; if(big) g+=`<text x="${BX+38}" y="${(yOf(v)+4).toFixed(1)}" font-size="12" font-weight="700" fill="#4A2E14">${v/1000} L</text>`; }
      g+=`<path d="M${BX} ${BY-6} L${BX} ${BY+BH} L${BX+BW} ${BY+BH} L${BX+BW} ${BY-6}" fill="none" stroke="#4A2E14" stroke-width="3" stroke-linejoin="round"/>`;
      /* 1 L 병(큼)과 100 mL 컵(작음) */
      const hi=i=>src===i&&moving;
      g+=`<g ${hi(0)?'transform="rotate(-18 54 120)"':''}><rect x="38" y="74" width="34" height="96" rx="6" fill="#DDF1FB" stroke="#4A2E14" stroke-width="2"/><rect x="47" y="60" width="16" height="16" rx="3" fill="#F2A65A" stroke="#4A2E14" stroke-width="2"/><rect x="40" y="96" width="30" height="72" rx="4" fill="#8CC8EE"/><text x="55" y="140" font-size="12" font-weight="700" text-anchor="middle" fill="#1F4E6B">1 L</text></g>`;
      g+=`<g ${hi(1)?'transform="rotate(-18 112 158)"':''}><path d="M102 146 L122 146 L119 170 L105 170 Z" fill="#DDF1FB" stroke="#4A2E14" stroke-width="2"/><path d="M104 152 L120 152 L118.5 168.5 L105.5 168.5 Z" fill="#8CC8EE"/></g><text x="112" y="186" font-size="10" font-weight="700" text-anchor="middle" fill="#4A2E14">100 mL</text><text x="55" y="186" font-size="10" font-weight="700" text-anchor="middle" fill="#4A2E14">1 L 병</text>`;
      if(moving&&shown<lvl()&&src>=0){ const sx=src===0?72:122, sy=src===0?70:146; g+=`<path d="M${sx} ${sy} Q${(sx+BX+30)/2} ${sy-46} ${BX+30} ${yOf(shown).toFixed(1)}" fill="none" stroke="#8CC8EE" stroke-width="${src===0?7:4}" stroke-linecap="round" opacity=".9"/>`; }
      return `<svg viewBox="0 0 300 192" style="width:100%;max-width:330px">${g}</svg><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('a0','🧴 1 L 병으로 붓기','background:#DDF1FB;touch-action:none;cursor:grab').replace('data-ma=','data-drag="1" data-ma=')}${m2b('a1','🥛 100 mL 컵으로 붓기','background:#DDF1FB;touch-action:none;cursor:grab').replace('data-ma=','data-drag="1" data-ma=')}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${m2b('r0','1 L 덜어 내기','font-size:.85rem')}${m2b('r1','100 mL 덜어 내기','font-size:.85rem')}</div><div style="font-size:.9rem;color:#8A6A4A">1 L 병 ${cnt[0]}번 · 100 mL 컵 ${cnt[1]}번 — 끌어서 통에 붓거나 눌러요</div>`; },
    on(a){ const i=+a[1], v=i?100:1000; if(a[0]==='a'){ if(lvl()+v<=cap){ cnt[i]++; src=i; } } else if(cnt[i]>0){ cnt[i]--; src=-1; } },
    check(){ return lvl()===target; },
    wrong(){ if(!lvl()) return null; const L=Math.floor(target/1000), m=(target%1000)/100; if(cnt[0]===0&&cnt[1]===L+m&&L>0) return '1 L를 100 mL 컵 한 번으로 봤어요'; return null; },
    reveal(){ cnt[0]=Math.floor(target/1000); cnt[1]=(target%1000)/100; src=-1; },
    goal(){ const L=Math.floor(target/1000), m=(target%1000)/100; return {taps:Array(L).fill('a0').concat(Array(m).fill('a1')),mis:Array(L+m).fill('a1'),misName:'1 L를 100 mL 컵 한 번으로 봤어요'}; }, state:()=>({cnt:cnt.slice()}) };
  const m=m2make(o); m._o=o; return m; };
const _mlf=t=>`${Math.floor(t/1000)?Math.floor(t/1000)+' L ':''}${t%1000?t%1000+' mL':''}`.trim(), _gf=t=>`${Math.floor(t/1000)?Math.floor(t/1000)+' kg ':''}${t%1000?t%1000+' g':''}`.trim();
M2.qPour=()=>{ const t=rnd(1,3)*1000+rnd(1,9)*100; return m2q(`1 L 병과 100 mL 컵으로 통에 물을 부어 ${_mlf(t)}를 만들어 보세요.`,'1 L는 100 mL 컵으로 10번이에요. 통의 눈금 한 칸은 100 mL예요.',M2.pour(t),_mlf(t),{'1 L를 100 mL 컵 한 번으로 봤어요':'G3-05'}); };
M2.qPourSum=()=>{ const a=rnd(11,19)*100, b=rnd(3,9)*100; if((a+b)%1000===0) return M2.qPourSum(); return m2q(`${_mlf(a)} + ${_mlf(b)} 만큼 통에 물을 부어 보세요.`,'mL끼리 더해서 1000 mL가 넘으면 1 L로 바꿔요.',M2.pour(a+b),_mlf(a+b),{'1 L를 100 mL 컵 한 번으로 봤어요':'G3-05'}); };
/* 정해진 무게 만들기: 무게를 아는 바구니와 수평이 되게 추를 올림(추는 무게에 따라 크기가 다름) */
M2.qWeighMake=()=>{ const w=rnd(1,4)*1000+rnd(2,9)*100; return m2q(`무게가 ${_gf(w)}인 바구니와 수평이 되게 추를 올려 보세요.`,'무거운 추부터 올리고, 넘치면 가벼운 추로 바꿔요.',M2.scale({left:[{v:w,hid:1,emoji:'🧺'}],right:[],types:_TKG,note:'추를 끌어서 접시에 올려요 (눌러도 올라가요)'}),_gf(w),{}); };
M2.qWeighSum=()=>{ const a=rnd(11,25)*100, b=rnd(3,9)*100, w=a+b; return m2q(`${_gf(a)}짜리 바구니와 ${_gf(b)}짜리 바구니를 함께 올렸어요. 수평이 되게 추를 올려 보세요.`,'g끼리 더해서 1000 g이 넘으면 1 kg으로 바꿔요.',M2.scale({left:[{v:a,hid:1,emoji:'🧺'},{v:b,hid:1,emoji:'🧺'}],right:[],types:_TKG,note:'추를 끌어서 접시에 올려요 (눌러도 올라가요)'}),_gf(w),{}); };
try{ const rep=(ep,re,g)=>{ const F=G36[ep]||[]; const i=F.findIndex(f=>{ try{ const q=f(); return q&&re.test(String(q.q)); }catch(e){ return false; } }); if(i>=0) F[i]=g; else if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,F.length,g]); F.push(g); } };
  rep('S6-40',/물을 부어 .*만들어/,M2.qPour); rep('S6-42',/만큼 물을 부어/,M2.qPourSum); rep('S6-43',/추를 올려 .*만들어/,M2.qWeighMake); rep('S6-46',/만큼 추를 올려/,M2.qWeighSum);
}catch(e){}

/* ===== 국가기초학력지원포털 '늘품이 진단 A형'(3·4학년) 학습지에서 얻은 조작 2종 (11/23 저녁, 교수님: "영감을 얻어 조작 활동을 추가") =====
   ① 점을 이어 도형을 똑같이 나누기(분수의 이해 1번 "표시된 점을 이용하여 도형을 똑같이 나누시오")
   ② 표를 보고 막대그래프 완성하기(막대그래프 5번 "막대그래프를 완성하시오") */
M2.split=(k,n)=>{ /* 정k각형의 가운데 점에서 꼭짓점으로 선을 그어 똑같이 n조각으로. sel[i] = i번 꼭짓점으로 선을 그었는가 */ const sel=Array(k).fill(false), R=70, cx=100, cy=92, P=[...Array(k)].map((_,i)=>[cx+R*Math.sin(2*Math.PI*i/k),cy-R*Math.cos(2*Math.PI*i/k)]);
  const gaps=()=>{ const on=sel.map((v,i)=>v?i:-1).filter(i=>i>=0); return on.map((v,j)=>((on[(j+1)%on.length]-v+k)%k)||k); };
  const o={ draw(){ let g=`<polygon points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="#FFE9BF" stroke="#6B4A1E" stroke-width="2.2"/>`; P.forEach((p,i)=>{ if(sel[i]) g+=`<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="#D45F16" stroke-width="3" stroke-linecap="round"/>`; }); g+=`<circle cx="${cx}" cy="${cy}" r="4.5" fill="#4A2E14"/>`; P.forEach((p,i)=>{ g+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${sel[i]?'#D45F16':'#4A2E14'}"/><circle data-ma="v${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="22" fill="transparent" style="cursor:pointer"/>`; });
      return `<svg viewBox="0 0 200 184" width="220" style="max-width:100%;touch-action:manipulation">${g}</svg><div style="font-size:.9rem;color:#8A6A4A">꼭짓점의 점을 누르면 가운데 점과 이어져요. 다시 누르면 지워져요. (그은 선 ${sel.filter(Boolean).length}개)</div>`; },
    on(a){ const i=+a.slice(1); sel[i]=!sel[i]; }, check(){ const G=gaps(); return G.length===n&&G.every(v=>v===G[0]); },
    wrong(){ const G=gaps(); if(G.length<2) return null; if(!G.every(v=>v===G[0])) return '조각의 크기가 서로 달라요'; return '조각의 수가 달라요'; },
    reveal(){ sel.fill(false); for(let i=0;i<k;i+=k/n) sel[i]=true; },
    goal(){ const taps=[]; for(let i=0;i<k;i+=k/n) taps.push('v'+i); const mis=k>n?[...Array(n)].map((_,i)=>'v'+i):null; return {taps,mis,misName:mis?'조각의 크기가 서로 달라요':null}; }, state:()=>({s:sel.map(v=>v?1:0).join('')}) };
  const m=m2make(o); m._o=o; return m; };
M2.qSplit=()=>{ const [k,n,nm]=rndPick([3,3,'정삼각형'],[6,6,'정육각형'],[6,3,'정육각형'],[6,2,'정육각형'],[4,4,'정사각형'],[4,2,'정사각형'],[8,4,'정팔각형'],[8,2,'정팔각형']); return m2q(`${nm}을 똑같이 ${n}조각으로 나누려고 해요. 가운데 점과 꼭짓점을 이어서 나누어 보세요.`,`똑같이 나눈다는 것은 조각의 모양과 크기가 모두 같다는 뜻이에요. 선과 선 사이가 모두 같게 벌어져야 해요.`,M2.split(k,n),`조각의 크기가 모두 같게 ${n}조각`,{'조각의 크기가 서로 달라요':'N3-05','조각의 수가 달라요':'N3-05'}); };
M2.barDraw=(names,vals,u)=>{ const h=vals.map(()=>0), MAX=10;
  const o={ draw(){ const W=44, x0=34, y0=150, c=13; let g=''; for(let r=0;r<=MAX;r++){ g+=`<line x1="${x0}" y1="${y0-r*c}" x2="${x0+names.length*W}" y2="${y0-r*c}" stroke="${r%5===0?'#B89A72':'#E8D9BF'}" stroke-width="${r%5===0?1.4:1}"/>`; if(r%5===0) g+=`<text x="${x0-5}" y="${y0-r*c+4}" font-size="11" text-anchor="end" fill="#6B4A1E" font-family="Jua">${r*u}</text>`; } names.forEach((nm,i)=>{ g+=`<line x1="${x0+i*W}" y1="${y0}" x2="${x0+i*W}" y2="${y0-MAX*c}" stroke="#E8D9BF"/>`; if(h[i]) g+=`<rect x="${x0+i*W+9}" y="${y0-h[i]*c}" width="${W-18}" height="${h[i]*c}" fill="#F2A65A" stroke="#6B4A1E" stroke-width="1.3"/>`; g+=`<text x="${x0+i*W+W/2}" y="${y0+15}" font-size="12" text-anchor="middle" fill="#4A2E14" font-family="Jua">${nm}</text>`; }); g+=`<line x1="${x0}" y1="${y0}" x2="${x0+names.length*W}" y2="${y0}" stroke="#6B4A1E" stroke-width="2"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0-MAX*c}" stroke="#6B4A1E" stroke-width="2"/><text x="${x0+4}" y="${y0-MAX*c-7}" font-size="10" text-anchor="start" fill="#8A6A4A" font-family="Jua">(명)</text>`;
      return `<table style="border-collapse:collapse;font-size:1rem;margin:0 auto 4px;background:#fff"><tr>${names.map(n=>`<th style="border:1.5px solid #B89A72;padding:2px 9px;background:#FFF8EC">${n}</th>`).join('')}</tr><tr>${vals.map(v=>`<td style="border:1.5px solid #B89A72;padding:2px 9px;text-align:center">${v}명</td>`).join('')}</tr></table><svg viewBox="0 0 ${x0+names.length*W+10} 172" width="${x0+names.length*W+10}" style="max-width:100%">${g}</svg><div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">${names.map((nm,i)=>`<span style="display:inline-flex;flex-direction:column;gap:3px;align-items:center">${m2b('p'+i,'▲','min-width:46px;min-height:44px')}<span style="font-size:.8rem;color:#6B4A1E">${nm}</span>${m2b('m'+i,'▼','min-width:46px;min-height:44px')}</span>`).join('')}</div>`; },
    on(a){ const i=+a.slice(1); if(a[0]==='p') h[i]=Math.min(MAX,h[i]+1); else h[i]=Math.max(0,h[i]-1); },
    check(){ return h.every((v,i)=>v*u===vals[i]); },
    wrong(){ if(h.every(v=>!v)) return null; if(u>1&&h.every((v,i)=>v===Math.min(MAX,vals[i]))) return '눈금 한 칸을 1명으로 보고 그렸어요'; if(h.some(v=>!v)) return '그리지 않은 막대가 있어요'; return '막대의 높이가 표와 달라요'; },
    reveal(){ vals.forEach((v,i)=>{ h[i]=v/u; }); },
    goal(){ const taps=[], mis=[]; vals.forEach((v,i)=>{ for(let k=0;k<v/u;k++) taps.push('p'+i); for(let k=0;k<Math.min(MAX,v);k++) mis.push('p'+i); }); return {taps,mis:u>1?mis:null,misName:u>1?'눈금 한 칸을 1명으로 보고 그렸어요':null}; }, state:()=>({h:h.join('')}) };
  const m=m2make(o); m._o=o; return m; };
M2.qBarDraw=()=>{ const u=rndPick(1,2,2,5), names=shuffle(['축구','피구','수영','줄넘기','농구','배구']).slice(0,4), vals=names.map(()=>u*rnd(1,u===1?9:8)); if(new Set(vals).size<3) return M2.qBarDraw(); return m2q(`표를 보고 막대그래프를 완성해 보세요. 세로 눈금 한 칸이 몇 명인지 먼저 살펴보세요.`,`세로 눈금 5칸이 ${5*u}명이니까 한 칸은 ${u}명이에요. ${vals[0]}명은 ${vals[0]/u}칸이에요.`,M2.barDraw(names,vals,u),names.map((n,i)=>`${n} ${vals[i]/u}칸`).join(', '),{'눈금 한 칸을 1명으로 보고 그렸어요':'D4-01','그리지 않은 막대가 있어요':'D4-05','막대의 높이가 표와 달라요':'D4-01'}); };
try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } }; const byT=re=>Object.keys(G36).find(ep=>{ try{ return re.test((EPS36[ep]||[])[0]||''); }catch(e){ return false; } });
  add('S4-09',M2.qBarDraw); add('S3-17',M2.qSplit); /* S3-17 = '똑같아야 분수야' */ }catch(e){}

/* ===== 3-79. 늘품이 통권(4~6학년 교사용 5권, 11/23)에서 자주 나오는데 앱에 없던 꼴: 선으로 잇기 · ○표 모두 하기 · 두 색으로 색칠하기 =====
   통권 발문 179개 중 '써넣기' 71, '연결하시오/맞게' 27, '○ 표' 14, '색칠' 6 … → 잇기·○표·색칠을 누르기 조작 엔진으로 만든다. */
const M2X={};
/* 선으로 잇기: 왼쪽을 누르고 오른쪽을 누르면 이어짐(같은 색 번호). 다시 누르면 바꿀 수 있음. ans[i] = 왼쪽 i와 이어야 할 오른쪽 번호. wrongMap: 'i>j' → 오개념 이름 */
M2.match=(L,R,ans,wrongMap,multi)=>{ const link=L.map(()=>-1); let cur=-1; const COL=['#E8743B','#2F6FA8','#3C9A5F','#A24FB5','#C2962B','#D2486B'];
  const cell=(act,html,col,sel)=>`<button type="button" data-ma="${act}" style="display:flex;align-items:center;gap:6px;width:100%;min-height:48px;padding:6px 10px;border-radius:12px;border:2.5px solid ${col||'#C9A56B'};background:${sel?'#FFF1D6':'#fff'};color:#4A2E14;font-family:'Gowun Dodum',Jua,sans-serif;font-weight:700;font-size:1.02rem;text-align:left;cursor:pointer;touch-action:manipulation">${html}</button>`;
  const dot=c=>`<span style="flex:none;width:14px;height:14px;border-radius:50%;background:${c||'#fff'};border:2px solid ${c||'#C9A56B'}"></span>`;
  const o={ draw(){ const rc=R.map((_,j)=>{ const i=link.indexOf(j); return i>=0?COL[i%COL.length]:null; });
      return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;width:100%;max-width:440px">${[...Array(Math.max(L.length,R.length))].map((_,i)=>{ const t=L[i]; return t==null?`<div></div><div>${cell('r'+i,`${dot(rc[i])}<span style="flex:1">${R[i]}</span>`,rc[i])}</div>`:`<div>${cell('l'+i,`<span style="flex:1">${t}</span>${dot(link[i]>=0||cur===i?COL[i%COL.length]:null)}`,link[i]>=0||cur===i?COL[i%COL.length]:null,cur===i)}</div><div>${R[i]!=null?cell('r'+i,`${dot(rc[i])}<span style="flex:1">${R[i]}</span>`,rc[i]):''}</div>`; }).join('')}</div><div style="font-size:.88rem;color:#8A6A4A">왼쪽을 누르고, 알맞은 오른쪽을 누르면 이어져요. (이은 것 ${link.filter(v=>v>=0).length}/${L.length})</div>`; },
    on(a){ const k=+a.slice(1); if(a[0]==='l'){ cur=cur===k?-1:k; return; } if(cur<0) return; const old=link.indexOf(k); if(old>=0&&!multi) link[old]=-1; link[cur]=k; cur=-1; },
    check(){ return link.every((v,i)=>v===ans[i]); },
    wrong(){ if(link.some(v=>v<0)) return '아직 다 잇지 않았어요'; for(let i=0;i<L.length;i++){ if(link[i]!==ans[i]){ const k=i+'>'+link[i]; if(wrongMap&&wrongMap[k]) return wrongMap[k]; } } return '잘못 이은 것이 있어요'; },
    reveal(){ ans.forEach((v,i)=>link[i]=v); cur=-1; },
    goal(){ return {taps:ans.flatMap((v,i)=>['l'+i,'r'+v]),mis:null}; }, state:()=>({k:link.map(v=>v<0?'x':v).join('')}) };
  const m=m2make(o); m._o=o; return m; };
/* ○ 표 모두 하기: 그림·글 카드를 눌러 ○(다시 누르면 지움). 정답 집합과 같아야 함 */
M2.pickAll=(items,good,extraWrong)=>{ const on=new Set();
  const o={ draw(){ return `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:460px">${items.map((h,i)=>`<button type="button" data-ma="p${i}" style="position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;min-width:72px;min-height:64px;padding:6px 8px;border-radius:14px;border:2.5px solid ${on.has(i)?'#D45F16':'#C9A56B'};background:#fff;cursor:pointer;touch-action:manipulation;font-family:'Gowun Dodum',Jua,sans-serif;font-weight:700;font-size:1.05rem;color:#4A2E14">${h}${on.has(i)?'<span style="position:absolute;inset:4px;border:3px solid #D45F16;border-radius:50%;pointer-events:none"></span>':''}</button>`).join('')}</div><div style="font-size:.88rem;color:#8A6A4A">알맞은 것을 모두 눌러 ○표 하세요. 다시 누르면 지워져요. (○ ${on.size}개)</div>`; },
    on(a){ const i=+a.slice(1); on.has(i)?on.delete(i):on.add(i); },
    check(){ return on.size===good.length&&good.every(i=>on.has(i)); },
    wrong(){ const miss=good.filter(i=>!on.has(i)).length, extra=[...on].filter(i=>!good.includes(i)); if(extra.length&&extraWrong){ for(const i of extra) if(extraWrong[i]) return extraWrong[i]; } return extra.length?'아닌 것에도 ○ 표 했어요':miss?'빠뜨린 것이 있어요':null; },
    reveal(){ on.clear(); good.forEach(i=>on.add(i)); },
    goal(){ return {taps:good.map(i=>'p'+i),mis:null}; }, state:()=>({s:items.map((_,i)=>on.has(i)?1:0).join('')}) };
  const m=m2make(o); m._o=o; return m; };
/* 두 색으로 색칠하기: 누를 때마다 빨강 → 파랑 → 지움. want[i] = 'r' | 'b' | '' */
M2.color2=(items,want,names,wrongOf)=>{ const c=items.map(()=>''); const nx={'':'r','r':'b','b':''}, FILL={r:'#F6B3A8',b:'#A9CDEF','':'#fff'}, ST={r:'#C2412F',b:'#2F6FA8','':'#C9A56B'};
  const o={ draw(){ return `<div style="display:flex;gap:12px;font-size:.92rem;justify-content:center"><span><span style="display:inline-block;width:14px;height:14px;background:${FILL.r};border:2px solid ${ST.r};border-radius:4px;vertical-align:-2px"></span> ${names[0]}</span><span><span style="display:inline-block;width:14px;height:14px;background:${FILL.b};border:2px solid ${ST.b};border-radius:4px;vertical-align:-2px"></span> ${names[1]}</span></div><div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:460px">${items.map((h,i)=>`<button type="button" data-ma="c${i}" style="overflow:hidden;display:flex;align-items:center;justify-content:center;min-width:72px;min-height:60px;padding:6px 8px;border-radius:14px;border:2.5px solid ${ST[c[i]]};background:${FILL[c[i]]};cursor:pointer;touch-action:manipulation;font-family:'Gowun Dodum',Jua,sans-serif;font-weight:700;font-size:1.05rem;color:#4A2E14">${h}</button>`).join('')}</div><div style="font-size:.88rem;color:#8A6A4A">누를 때마다 빨강 → 파랑 → 지우기 차례로 바뀌어요.</div>`; },
    on(a){ const i=+a.slice(1); c[i]=nx[c[i]]; },
    check(){ return c.every((v,i)=>v===want[i]); },
    wrong(){ for(let i=0;i<items.length;i++){ if(c[i]!==want[i]&&c[i]&&want[i]&&wrongOf) return wrongOf; } return c.some((v,i)=>v!==want[i])?'색칠이 맞지 않은 것이 있어요':null; },
    reveal(){ want.forEach((v,i)=>c[i]=v); },
    goal(){ return {taps:want.flatMap((v,i)=>v==='r'?['c'+i]:v==='b'?['c'+i,'c'+i]:[]),mis:null}; }, state:()=>({s:c.map(v=>v||'0').join('')}) };
  const m=m2make(o); m._o=o; return m; };

{ const pick=a=>a[rnd(0,a.length-1)], sh=a=>shuffle(a.slice());
  const triSvg=(A,B,w)=>{ const C=180-A-B, L=120, ra=A*Math.PI/180, rb=B*Math.PI/180, h=L/(1/Math.tan(ra)+1/Math.tan(rb)), px=h/Math.tan(ra); const x0=10, y0=h+10; return `<svg viewBox="${Math.min(0,x0+px-5)} 0 ${L+20+Math.max(0,-px)} ${h+20}" width="${w||70}" style="display:block;box-shadow:none;background:none;border-radius:0"><polygon points="${x0},${y0} ${x0+L},${y0} ${(x0+px).toFixed(1)},${(y0-h).toFixed(1)}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="3"/></svg>`; };
  const angSvg=d=>{ const r=34, x=6, y=40, a=d*Math.PI/180; return `<svg viewBox="0 0 ${d>90?80:50} 46" width="${d>90?64:44}" style="display:block;margin:auto"><line x1="${d>90?40:x}" y1="${y}" x2="${(d>90?40:x)+r}" y2="${y}" stroke="#7A4A1E" stroke-width="3"/><line x1="${d>90?40:x}" y1="${y}" x2="${((d>90?40:x)+r*Math.cos(a)).toFixed(1)}" y2="${(y-r*Math.sin(a)).toFixed(1)}" stroke="#7A4A1E" stroke-width="3"/></svg>`; };
  /* 잇기 ① 나눗셈식 ↔ 몫과 나머지 (3학년) */
  M2X.mDiv=()=>{ const xs=[]; const seen=new Set(); while(xs.length<4){ const d=rnd(3,8), q=rnd(4,9), r=rnd(1,d-1), n=d*q+r, k=q+'/'+r; if(seen.has(k)||seen.has('n'+n)) continue; seen.add(k); seen.add('n'+n); xs.push([n,d,q,r]); }
    const ord=sh([0,1,2,3]); const R=ord.map(i=>`몫 ${xs[i][2]}, 나머지 ${xs[i][3]}`); const ans=xs.map((_,i)=>ord.indexOf(i));
    return m2q('나눗셈식과 몫·나머지를 알맞게 이어 보세요.','나머지는 나누는 수보다 작아야 해요. 나누는 수 × 몫에 나머지를 더하면 나누어지는 수가 되는지 확인해요.',M2.match(xs.map(x=>`${x[0]} ÷ ${x[1]}`),R,ans),'바르게 이은 것',{'아직 다 잇지 않았어요':null,'잘못 이은 것이 있어요':'N3-02'}); };
  /* 잇기 ② 큰 수 ↔ 읽기 (4학년) */
  M2X.mRead=()=>{ const sino=n=>{ const D=['','일','이','삼','사','오','육','칠','팔','구'], U=['','십','백','천']; let s=''; const d=String(n).split('').reverse(); for(let i=d.length-1;i>=0;i--){ const v=+d[i]; if(!v) continue; s+=(v===1&&i>0?'':D[v])+U[i]; } return s; };
    const rd=n=>{ const man=Math.floor(n/10000), r=n%10000; return (man?sino(man)+'만':'')+(r?' '+sino(r):''); };
    const base=[rnd(1,9),rnd(0,9),rnd(1,9),rnd(0,9),rnd(1,9)]; const mk=p=>+p.join(''); const a=mk(base), b=mk([base[0],base[2],base[1],base[3],base[4]]), c=mk([base[0],base[1],base[2],base[4],base[3]]), d=a*10; const ns=[...new Set([a,b,c,d])]; if(ns.length<4) return M2X.mRead();
    const ord=sh([0,1,2,3]); return m2q('수와 그 수를 읽은 것을 알맞게 이어 보세요.','만 단위로 끊어서, 만의 자리부터 차례로 읽어요. 0이 있는 자리는 읽지 않아요.',M2.match(ns.map(n=>n.toLocaleString('ko-KR')),ord.map(i=>rd(ns[i])),ns.map((_,i)=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'N4-08'}); };
  /* 잇기 ③ 정다각형 ↔ 이름 (4학년) */
  M2X.mPoly=()=>{ const ks=sh([3,4,5,6,8]).slice(0,4), nm={3:'정삼각형',4:'정사각형',5:'정오각형',6:'정육각형',8:'정팔각형'}; const pg=k=>`<svg viewBox="-24 -24 48 48" width="42" style="display:block;box-shadow:none;background:none"><polygon points="${[...Array(k)].map((_,i)=>[20*Math.sin(2*Math.PI*i/k+(k===4?Math.PI/4:0)),-20*Math.cos(2*Math.PI*i/k+(k===4?Math.PI/4:0))].map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2.5"/></svg>`;
    const ord=sh([0,1,2,3]); return m2q('정다각형과 이름을 알맞게 이어 보세요.','변의 수를 세어 보세요. 변이 ■개인 정다각형은 정■각형이에요.',M2.match(ks.map(pg),ord.map(i=>nm[ks[i]]),ks.map((_,i)=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'G4-06'}); };
  /* 잇기 ④ 소수의 덧셈식 ↔ 결과 (4학년): 받아올림 무시한 값이 보기에 섞여 있음 */
  M2X.mDec=()=>{ const xs=[]; const res=new Set(); while(xs.length<3){ const a=rnd(11,59)/10, b=rnd(11,49)/10, s=+(a+b).toFixed(1); if(res.has(s)) continue; res.add(s); xs.push([a,b,s]); } const trap=xs.find(x=>Math.round(x[0]*10)%10+Math.round(x[1]*10)%10>=10); const R=xs.map(x=>x[2]); const tv=trap?+(trap[2]-1).toFixed(1):+(xs[0][2]+1).toFixed(1); if(R.includes(tv)) return M2X.mDec(); R.push(tv); const ord=sh([0,1,2,3]);
    return m2q('계산식과 계산 결과를 알맞게 이어 보세요. (결과 하나는 남아요)','소수점끼리 맞추어 쓰고, 0.1이 10개 모이면 1로 받아올려요.',M2.match(xs.map(x=>`${x[0]} + ${x[1]}`),ord.map(i=>R[i]),xs.map((_,i)=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'N2-01'}); };
  /* ○표 ① 각을 모두 찾기 (3학년) — 꺾인 선·굽은 선·떨어진 두 선은 각이 아님 */
  M2X.pAngle=()=>{ const S='#7A4A1E', it=[]; const good=[]; const kinds=sh(['ang','ang','ang','curve','gap','ray1','open']).slice(0,6);
    kinds.forEach((k,i)=>{ let g=''; if(k==='ang'){ const d=pick([40,70,90,120]); const a=d*Math.PI/180, vx=d>90?24:8, r=d>90?24:32; g=`<line x1="${vx}" y1="40" x2="46" y2="40" stroke="${S}" stroke-width="3" stroke-linecap="round"/><line x1="${vx}" y1="40" x2="${(vx+r*Math.cos(a)).toFixed(1)}" y2="${(40-r*Math.sin(a)).toFixed(1)}" stroke="${S}" stroke-width="3" stroke-linecap="round"/>`; good.push(i); }
      else if(k==='curve') g=`<path d="M8,40 L46,40 M8,40 Q12,10 40,8" fill="none" stroke="${S}" stroke-width="3"/>`; else if(k==='gap') g=`<line x1="14" y1="40" x2="46" y2="40" stroke="${S}" stroke-width="3"/><line x1="8" y1="34" x2="30" y2="8" stroke="${S}" stroke-width="3"/>`; else if(k==='ray1') g=`<line x1="8" y1="26" x2="46" y2="26" stroke="${S}" stroke-width="3"/>`; else g=`<path d="M8,40 Q27,4 46,40" fill="none" stroke="${S}" stroke-width="3"/>`;
      it.push(`<svg viewBox="0 0 54 48" width="54" height="48" style="display:block;box-shadow:none;background:none;border-radius:0">${g}</svg>`); });
    if(good.length<2) return M2X.pAngle(); const ex={}; kinds.forEach((k,i)=>{ if(k==='curve'||k==='open') ex[i]='굽은 선도 각이라고 봤어요'; if(k==='gap') ex[i]='떨어진 두 선도 각이라고 봤어요'; });
    return m2q('각을 모두 찾아 ○표 하세요.','한 점에서 그은 두 반직선으로 이루어진 도형이 각이에요. 굽은 선이 있거나 두 선이 만나지 않으면 각이 아니에요.',M2.pickAll(it,good,ex),'각에만 ○ 표',{'굽은 선도 각이라고 봤어요':null,'떨어진 두 선도 각이라고 봤어요':null,'빠뜨린 것이 있어요':null}); };
  /* ○표 ② 어떤 수의 배수 모두 (5학년) */
  M2X.pMult=()=>{ const k=pick([3,4,6,7]); const ns=new Set(); while(ns.size<8) ns.add(rnd(10,60)); const arr=[...ns]; const good=arr.map((n,i)=>n%k===0?i:-1).filter(i=>i>=0); if(good.length<2||good.length>5) return M2X.pMult(); const ex={}; arr.forEach((n,i)=>{ if(n%k&&k%n===0) ex[i]='약수와 배수를 바꾸어 생각했어요'; if(n%k&&String(n).includes(String(k))) ex[i]='숫자에 들어 있으면 배수라고 봤어요'; });
    return m2q(`${k}의 배수를 모두 찾아 ○표 하세요.`,`${k}의 배수는 ${k}에 1, 2, 3, …을 곱한 수예요. ${k}로 나누어떨어지는지 확인해요.`,M2.pickAll(arr.map(String),good,ex),'배수에만 ○ 표',{'숫자에 들어 있으면 배수라고 봤어요':null,'약수와 배수를 바꾸어 생각했어요':'N5-02'}); };
  /* 색칠 ① 예각삼각형 빨강, 둔각삼각형 파랑 (4학년) */
  M2X.cTri=()=>{ const T=[[60,60],[50,70],[55,65],[70,45]], O=[[110,40],[120,30],[100,50],[130,25]], Rt=[[90,45],[90,35]]; const set=sh([pick(T),pick(T),pick(O),pick(O),pick(Rt)]); const want=set.map(([a,b])=>{ const c=180-a-b; return Math.max(a,b,c)<90?'r':Math.max(a,b,c)>90?'b':''; });
    return m2q('예각삼각형은 빨간색, 둔각삼각형은 파란색으로 색칠하세요.','가장 큰 각을 보세요. 세 각이 모두 예각이면 예각삼각형, 한 각이 둔각이면 둔각삼각형이에요. 직각삼각형은 색칠하지 않아요.',M2.color2(set.map(([a,b])=>triSvg(a,b,64)),want,['예각삼각형','둔각삼각형'],'예각과 둔각을 바꾸어 칠했어요'),'바르게 색칠',{'예각과 둔각을 바꾸어 칠했어요':'G4-09','색칠이 맞지 않은 것이 있어요':'G4-09'}); };
  /* 색칠 ② 가장 큰 소수 빨강, 가장 작은 소수 파랑 (4학년) — 자릿수가 많으면 크다는 오개념을 잡는 수 */
  M2X.cDec=()=>{ const a=rnd(2,8); const vs=[`${a}.${rnd(1,9)}`,`${a}.${rnd(10,99)}`,`${a}.${rnd(101,999)}`,`${a}.0${rnd(1,9)}`]; const nums=vs.map(Number); if(new Set(nums).size<4) return M2X.cDec(); const mx=Math.max(...nums), mn=Math.min(...nums); const ord=sh(vs);
    const want=ord.map(v=>+v===mx?'r':+v===mn?'b':''); const longest=ord.reduce((p,v)=>v.length>p.length?v:p,''); if(+longest===mx) return M2X.cDec();
    return m2q('가장 큰 소수는 빨간색, 가장 작은 소수는 파란색으로 색칠하세요.','자연수 부분이 같으면 소수 첫째 자리부터 차례로 비교해요. 소수점 아래 숫자가 많다고 큰 수가 아니에요.',M2.color2(ord,want,['가장 큰 수','가장 작은 수'],'자릿수가 많으면 크다고 봤어요'),'바르게 색칠',{'자릿수가 많으면 크다고 봤어요':'N4-02','색칠이 맞지 않은 것이 있어요':'N4-02'}); };
  window._M2X=M2X;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-29',M2X.mDiv); add('S3-41',M2X.mRead); add('S6-32',M2X.mPoly); add('S3-61',M2X.mDec); add('S6-18',M2X.pAngle); add('S3-70',M2X.pMult); add('S6-29',M2X.cTri); add('S3-58',M2X.cDec); }catch(e){}
}

/* ===== 3-80. 다른 나라 평가 꼴(11/23 교수님이 레퍼런스에 넣음) =====
   독일 VERA-3(IQB, CC BY): '맞아요/아니에요'를 줄마다 고르기(stimmt/stimmt nicht), 숫자 카드를 칸에 넣어 식 완성(Ziffern einsetzen)
   일본 전국학력·학습상황조사: 답을 고르고 '그렇게 고른 까닭'도 고르기(찍기와 이해를 가름) */
/* 줄마다 맞아요/아니에요: rows=[[글, true/false, 틀렸을 때 오개념 이름]] */
M2.truth=rows=>{ const v=rows.map(()=>null);
  const btn=(i,val,lab)=>`<button type="button" data-ma="${val?'y':'n'}${i}" style="min-width:66px;min-height:42px;border-radius:10px;border:2.5px solid ${v[i]===val?(val?'#3C9A5F':'#C2412F'):'#C9A56B'};background:${v[i]===val?(val?'#DDF1E2':'#FBE0DB'):'#fff'};font-family:Jua,sans-serif;font-size:1rem;color:#4A2E14;cursor:pointer;touch-action:manipulation">${lab}</button>`;
  const o={ draw(){ return `<div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:460px">${rows.map((r,i)=>`<div style="display:flex;align-items:center;gap:8px;background:#fff;border:2px solid #EAD5B0;border-radius:12px;padding:6px 8px"><span style="flex:1;font-family:'Gowun Dodum',Jua,sans-serif;font-weight:700;font-size:1.02rem;line-height:1.45;text-align:left">${r[0]}</span>${btn(i,true,'맞아요')}${btn(i,false,'아니에요')}</div>`).join('')}</div><div style="font-size:.88rem;color:#8A6A4A">줄마다 하나씩 골라요.</div>`; },
    on(a){ const i=+a.slice(1); v[i]=a[0]==='y'; },
    check(){ return rows.every((r,i)=>v[i]===r[1]); },
    wrong(){ if(v.some(x=>x===null)) return '아직 고르지 않은 줄이 있어요'; for(let i=0;i<rows.length;i++) if(v[i]!==rows[i][1]&&rows[i][2]) return rows[i][2]; return '맞지 않게 고른 줄이 있어요'; },
    reveal(){ rows.forEach((r,i)=>v[i]=r[1]); }, goal(){ return {taps:rows.map((r,i)=>(r[1]?'y':'n')+i),mis:null}; }, state:()=>({s:v.map(x=>x===null?'x':x?1:0).join('')}) };
  const m=m2make(o); m._o=o; return m; };
/* 답 + 까닭 고르기: ans/reason 보기 목록과 정답 번호. 답만 맞고 까닭이 틀리면 '까닭' 오개념 */
M2.why=(A0,ai0,R0,ri0,rm0)=>{ /* 같은 글의 보기는 하나만 남김(정답 쪽을 남김) */ const dd=(arr,ci)=>{ const keep=[], seen=new Map(); arr.forEach((t,i)=>{ const k=String(t); if(seen.has(k)){ if(i===ci) keep[seen.get(k)]=i; return; } seen.set(k,keep.length); keep.push(i); }); return keep; };
  { const ka=dd(A0,ai0), kr=dd(R0,ri0); const rm1={}; if(rm0) kr.forEach((oi,ni)=>{ if(rm0[oi]!=null) rm1[ni]=rm0[oi]; }); ai0=ka.indexOf(ai0); ri0=kr.indexOf(ri0); A0=ka.map(i=>A0[i]); R0=kr.map(i=>R0[i]); rm0=rm1; } /* 보기 차례를 섞는다(정답 자리가 늘 같으면 자리로 찍음). 수·단위로 된 답 보기는 크기 차례가 자연스러워 그대로 둔다 */ const keepA=A0.every(t=>/^[\d.]/.test(String(t))), oa=keepA?A0.map((_,i)=>i):shuffle(A0.map((_,i)=>i)), or=shuffle(R0.map((_,i)=>i)); const A=oa.map(i=>A0[i]), R=or.map(i=>R0[i]), ai=oa.indexOf(ai0), ri=or.indexOf(ri0), reasonMis={}; if(rm0) Object.keys(rm0).forEach(k=>{ reasonMis[or.indexOf(+k)]=rm0[k]; }); let a=null, r=null;
  const chip=(act,lab,on)=>`<button type="button" data-ma="${act}" style="width:100%;min-height:44px;padding:6px 10px;border-radius:12px;border:2.5px solid ${on?'#D45F16':'#C9A56B'};background:${on?'#FFF1D6':'#fff'};font-family:'Gowun Dodum',Jua,sans-serif;font-weight:700;font-size:1rem;text-align:left;color:#4A2E14;cursor:pointer;touch-action:manipulation;line-height:1.4">${lab}</button>`;
  const o={ draw(){ return `<div style="width:100%;max-width:460px;display:flex;flex-direction:column;gap:6px"><div style="font-family:Jua,sans-serif;text-align:left">① 답을 골라요</div>${A.map((t,i)=>chip('a'+i,t,a===i)).join('')}<div style="font-family:Jua,sans-serif;text-align:left;margin-top:6px">② 그렇게 고른 까닭을 골라요</div>${R.map((t,i)=>chip('r'+i,t,r===i)).join('')}</div>`; },
    on(x){ const i=+x.slice(1); if(x[0]==='a') a=i; else r=i; },
    check(){ return a===ai&&r===ri; },
    wrong(){ if(a===null||r===null) return '답과 까닭을 모두 골라요'; if(a===ai&&r!==ri) return (reasonMis&&reasonMis[r])||'답은 맞았지만 까닭이 맞지 않아요'; return (reasonMis&&reasonMis[r])||'답이 맞지 않아요'; },
    reveal(){ a=ai; r=ri; }, goal(){ return {taps:['a'+ai,'r'+ri],mis:null}; }, state:()=>({s:`${a==null?'x':a}${r==null?'x':r}`}) };
  const m=m2make(o); m._o=o; return m; };
/* 숫자 카드를 빈칸에: tpl = 식 모양 ['□','□','□','−','□','□','=', '921'] 처럼. 카드는 한 번씩. ok(vals)로 판정(답이 여러 가지면 모두 인정) */
M2.digits=(cards,slots,render,ok)=>{ const put=Array(slots).fill(null); let cur=null;
  const o={ draw(){ const used=new Set(put.filter(x=>x!==null)); return `<div style="font:700 1.6rem/1.3 ui-monospace,monospace">${render(i=>`<button type="button" data-ma="s${i}" style="width:44px;height:52px;margin:2px;border-radius:8px;border:2.5px ${put[i]===null?'dashed':'solid'} ${cur!==null&&put[i]===null?'#D45F16':'#C9A56B'};background:#fff;font:700 1.5rem Jua,sans-serif;color:#2F6FA8;cursor:pointer;touch-action:manipulation">${put[i]===null?'':cards[put[i]]}</button>`)}</div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:6px">${cards.map((c,k)=>`<button type="button" data-ma="c${k}" style="width:46px;height:56px;border-radius:8px;border:2.5px solid ${cur===k?'#D45F16':'#7A4A1E'};background:${used.has(k)?'#EEE':'#FFF8EC'};opacity:${used.has(k)?.4:1};font:700 1.6rem Jua,sans-serif;color:#4A2E14;cursor:pointer;touch-action:manipulation">${c}</button>`).join('')}</div><div style="font-size:.88rem;color:#8A6A4A">카드를 누르고 칸을 누르면 들어가요. 칸을 다시 누르면 빠져요.</div>`; },
    on(a){ const k=+a.slice(1); if(a[0]==='c'){ if(put.includes(k)) return; cur=cur===k?null:k; return; } if(put[k]!==null){ put[k]=null; return; } if(cur!==null){ put[k]=cur; cur=null; } },
    check(){ return put.every(x=>x!==null)&&ok(put.map(x=>cards[x])); },
    wrong(){ if(put.some(x=>x===null)) return '빈칸이 남았어요'; return '식이 맞지 않아요'; },
    reveal(){ if(o._sol) o._sol.forEach((c,i)=>put[i]=c); }, goal(){ return o._sol?{taps:o._sol.flatMap((c,i)=>['c'+c,'s'+i]),mis:null}:null; }, state:()=>({s:put.map(x=>x===null?'x':cards[x]).join('')}) };
  const m=m2make(o); m._o=o; return m; };

{ const pick=a=>a[rnd(0,a.length-1)], sh=a=>shuffle(a.slice());
  const X={};
  /* 맞아요/아니에요 ① 사각형 사이의 관계 (4학년) */
  X.tQuad=()=>{ const pool=[['정사각형은 직사각형이라고 할 수 있어요.',true,'정사각형은 직사각형이 아니라고 봤어요'],['직사각형은 모두 정사각형이에요.',false,'직사각형과 정사각형을 같게 봤어요'],['마름모는 평행사변형이라고 할 수 있어요.',true,'사각형 사이의 관계를 모름'],['평행사변형은 모두 마름모예요.',false,'사각형 사이의 관계를 모름'],['사다리꼴은 모두 평행사변형이에요.',false,'사다리꼴의 뜻을 모름'],['정사각형은 마름모라고 할 수 있어요.',true,'사각형 사이의 관계를 모름'],['직사각형은 사다리꼴이라고 할 수 있어요.',true,'사다리꼴의 뜻을 모름']];
    const rows=sh(pool).slice(0,4); if(rows.every(r=>r[1])||rows.every(r=>!r[1])) return X.tQuad();
    return m2q('사각형에 대한 설명이에요. 줄마다 맞으면 [맞아요], 틀리면 [아니에요]를 골라요.','뜻을 떠올려요. 사다리꼴: 평행한 변이 한 쌍이라도 있음. 평행사변형: 두 쌍. 마름모: 네 변이 같음. 직사각형: 네 각이 직각. 정사각형: 둘 다.',M2.truth(rows),'줄마다 바르게',{'정사각형은 직사각형이 아니라고 봤어요':'G3-03','직사각형과 정사각형을 같게 봤어요':'G4-05','사각형 사이의 관계를 모름':'G4-05','사다리꼴의 뜻을 모름':'G4-05'}); };
  /* 맞아요/아니에요 ② 소수의 크기 (4학년) */
  X.tDec=()=>{ const a=rnd(1,8), b=rnd(1,9), c=rnd(10,99); const rows=sh([[`0.${b} 와 0.${b}0 은 크기가 같아요.`,true,'끝자리 0을 붙이면 커진다고 봤어요'],[`0.${c} 는 0.${b} 보다 커요.`,c/100>b/10,'자릿수가 많으면 크다고 봤어요'],[`${a}.${b} 는 ${a}.0${b} 보다 커요.`,true,'0이 있는 자리를 무시했어요'],[`0.${b} 는 0.01이 ${b}개인 수예요.`,false,'자릿값을 잘못 봤어요']]).map(r=>[r[0].replace(/ (와|는|은|이) /g,(m,j)=>j+' ').replace(/ 보다/,'보다'),r[1],r[2]]);
    if(String(c).length===2&&c%10===0) return X.tDec(); return m2q('소수에 대한 설명이에요. 줄마다 맞는지 골라요.','소수점 아래 끝자리 0은 생략해도 크기가 같아요. 크기는 자연수 부분 → 소수 첫째 자리 → 둘째 자리 차례로 비교해요.',M2.truth(rows),'줄마다 바르게',{'자릿수가 많으면 크다고 봤어요':'N4-02','끝자리 0을 붙이면 커진다고 봤어요':'N4-02','0이 있는 자리를 무시했어요':'N4-15','자릿값을 잘못 봤어요':'N4-24'}); };
  /* 답+까닭 ① 비율그래프: 비율이 줄어도 양은 늘 수 있음 (6학년, 일본 전국학력 2025 꼴) */
  X.wBand=()=>{ const T1=rnd(40,60)*10, T2=T1+rnd(20,40)*10, p1=rnd(15,25), p2=p1-rnd(1,4); const a1=T1*p1/100, a2=T2*p2/100; if(a2<=a1||a1%1||a2%1) return X.wBand();
    const vis=`<table style="margin:4px auto;border-collapse:collapse;font-size:.95rem;background:#fff">${[['','전체 수확량','우리 마을의 비율'],['작년',T1+' kg',p1+' %'],['올해',T2+' kg',p2+' %']].map((r,i)=>`<tr>${r.map(c=>`<t${i?'d':'h'} style="border:1.5px solid #C9A877;padding:3px 10px">${c}</t${i?'d':'h'}>`).join('')}</tr>`).join('')}</table>`;
    const q=m2q('우리 마을이 차지하는 비율은 작년보다 줄었어요. 그렇다면 우리 마을의 수확량도 줄었을까요?','비율은 전체에 대한 몫이에요. 양을 알려면 (전체) × (비율)을 계산해서 비교해야 해요.',M2.why(['줄었어요','늘었어요'],1,[`비율이 ${p1}%에서 ${p2}%로 줄었으니까`,`작년 ${T1}×${p1}÷100=${a1} kg, 올해 ${T2}×${p2}÷100=${a2} kg이니까`,`전체 수확량이 늘었으니까 무조건 늘어요`],1,{0:'비율만 보고 양을 판단했어요',2:'전체만 보고 판단했어요'}),'늘었어요 (양을 계산해서 비교)',{'비율만 보고 양을 판단했어요':'D6-02','전체만 보고 판단했어요':'D6-02','답은 맞았지만 까닭이 맞지 않아요':'D6-02'}); q.visual=vis+(q.visual||''); return q; };
  /* 답+까닭 ② 평균 비교: 합이 커도 평균은 작을 수 있음 (5학년) */
  X.wAvg=()=>{ const n1=4, n2=5, s1=n1*rnd(6,9), s2=n2*rnd(4,6)+rnd(0,1)*0; const m1=s1/n1, m2=s2/n2; if(s2<=s1||m2>=m1) return X.wAvg();
    return m2q(`줄넘기를 가 모둠 ${n1}명은 모두 ${s1}번, 나 모둠 ${n2}명은 모두 ${s2}번 했어요. 한 사람이 평균 더 많이 한 모둠은?`,'사람 수가 다르면 합으로 비교할 수 없어요. 평균 = 합 ÷ 사람 수로 비교해요.',M2.why(['가 모둠','나 모둠'],0,[`나 모둠의 합 ${s2}번이 더 크니까`,`가 모둠 ${s1}÷${n1}=${m1}, 나 모둠 ${s2}÷${n2}=${m2}이니까`,`사람 수가 적은 모둠이 늘 평균이 높으니까`],1,{0:'합으로 평균을 비교했어요',2:'사람 수로만 판단했어요'}),'가 모둠 (평균으로 비교)',{'합으로 평균을 비교했어요':'D5-04','사람 수로만 판단했어요':'D5-04','답은 맞았지만 까닭이 맞지 않아요':'D5-04'}); };
  /* 숫자 카드 ① 세 자리 수 − 두 자리 수 = 결과 (3학년, VERA-3 Ziffern einsetzen 꼴) */
  X.dSub=()=>{ for(let t=0;t<200;t++){ const cards=sh([1,2,3,4,5,6,7,8,9]).slice(0,5); const sols=[]; for(const p of (function*(){ for(const a of cards) for(const b of cards) for(const c of cards) for(const d of cards) for(const e of cards){ const s=[a,b,c,d,e]; if(new Set(s).size===5) yield s; } })()){ const A=p[0]*100+p[1]*10+p[2], B=p[3]*10+p[4]; if(A-B>0) sols.push([p,A-B]); } const R=pick(sols)[1]; const good=sols.filter(s=>s[1]===R); if(good.length!==1||R<100) continue; const sol=good[0][0].map(v=>cards.indexOf(v));
      const m=M2.digits(cards,5,S=>`<table style="margin:auto;border-collapse:collapse"><tr><td></td><td>${S(0)}</td><td>${S(1)}</td><td>${S(2)}</td></tr><tr><td style="padding-right:6px">−</td><td></td><td>${S(3)}</td><td>${S(4)}</td></tr><tr style="border-top:3px solid #4A2E14">${('  '+R).slice(-4).split('').map(c=>`<td style="text-align:center;font:700 1.6rem Jua,sans-serif">${c===' '?'':c}</td>`).join('')}</tr></table>`,v=>(v[0]*100+v[1]*10+v[2])-(v[3]*10+v[4])===R); m._o._sol=sol;
      return m2q(`숫자 카드 ${cards.join(', ')}을 한 번씩만 써서 뺄셈의 차가 ${R}이 되게 만들어 보세요.`,'일의 자리부터 차례로 생각해요. 받아내림이 있으면 윗자리에서 10을 빌려 와요. 맞지 않으면 카드를 바꿔 보며 찾아요.',m,'차가 맞는 뺄셈식',{'식이 맞지 않아요':null}); } return null; };
  window._M2V=X;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S6-31',X.tQuad); add('S3-58',X.tDec); add('S4-21',X.wBand); add('S4-16',X.wAvg); add('S2-06',X.dSub); }catch(e){}
}

/* ===== 3-81. 네온과 짠 '없던 틀' 표(11/23 밤, 3~6학년 × 4영역)에서 고른 22틀 =====
   기준: ① 학생 편의(누르기만, 한 화면, 말 짧게) ② 진단 효율(한 문항에 여러 판단 → 줄마다 다른 오개념) ③ 보정 효율(틀린 줄·까닭에 맞는 풀이를 hint로)
   ④ 자율학습(까닭 고르기로 찍기를 걸러 냄, 풀이가 '확인하는 방법'을 알려 줌). 선행·음수 없음. */
{ const pick=a=>a[rnd(0,a.length-1)], sh=a=>shuffle(a.slice()), Y={};
  const mq=(t,h,m,a,mis)=>m2q(t,h,m,a,mis);
  const tr4=(pool,n)=>{ for(let k=0;k<20;k++){ const r=sh(pool).slice(0,n||4); if(r.some(x=>x[1])&&r.some(x=>!x[1])) return r; } return pool.slice(0,n||4); };
  /* 3학년 */
  Y.mMulDiv=()=>{ const ps=[]; const seen=new Set(); while(ps.length<4){ const a=rnd(3,9), b=rnd(3,9); if(a===b||seen.has(a*b)) continue; seen.add(a*b); ps.push([a,b]); } const ord=sh([0,1,2,3]);
    return mq('나눗셈식과 같은 관계인 곱셈식을 이어 보세요.','나눗셈 ■ ÷ ▲ = ●는 곱셈 ▲ × ● = ■와 한 가족이에요. 나누어지는 수가 곱셈의 결과가 돼요.',M2.match(ps.map(([a,b])=>`${a*b} ÷ ${a} = ${b}`),ord.map(i=>`${ps[i][0]} × ${ps[i][1]} = ${ps[i][0]*ps[i][1]}`),ps.map((_,i)=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'N3-30'}); };
  Y.pRight=()=>{ const S='#7A4A1E'; const items=[], good=[], ex={}; const kinds=sh(['r','r','r','a','o','a']);
    kinds.forEach((k,i)=>{ const rot=rnd(15,70)*(Math.random()<.5?1:-1); const d=k==='r'?90:k==='a'?rnd(55,75):rnd(105,125); const a=d*Math.PI/180;
      const g=`<g transform="rotate(${rot} 27 26)"><line x1="14" y1="34" x2="44" y2="34" stroke="${S}" stroke-width="3" stroke-linecap="round"/><line x1="14" y1="34" x2="${(14+26*Math.cos(a)).toFixed(1)}" y2="${(34-26*Math.sin(a)).toFixed(1)}" stroke="${S}" stroke-width="3" stroke-linecap="round"/></g>`;
      items.push(`<svg viewBox="0 0 54 52" width="54" height="52" style="display:block;box-shadow:none;background:none">${g}</svg>`); if(k==='r') good.push(i); else ex[i]='직각이 아닌 각을 골랐어요'; });
    return mq('기울어져 있어도 직각인 것을 모두 찾아 ○표 하세요.','직각 삼각자의 직각 부분을 꼭짓점에 대 보세요. 놓인 방향과 관계없이 꼭 맞으면 직각이에요.',M2.pickAll(items,good,ex),'직각에만 ○표',{'빠뜨린 것이 있어요':'G3-02','직각이 아닌 각을 골랐어요':'G4-07'}); };
  Y.mUnit=()=>{ const km=rnd(1,4), m=rnd(1,9)*100, mn=rnd(1,2)*60+pick([10,20,30,40]), cm=rnd(1,3), cc=rnd(10,90); const L=[`${km} km ${m} m`,`${mn}분`,`${cm} m ${cc} cm`]; const R=[`${km*1000+m} m`,`${Math.floor(mn/60)}시간 ${mn%60}분`,`${cm*100+cc} cm`,`${km*100+m} m`]; const ord=sh([0,1,2,3]);
    return mq('같은 길이·시간끼리 이어 보세요. (하나는 남아요)','1 km = 1000 m, 1 m = 100 cm, 1시간 = 60분이에요. 단위마다 몇 배인지 다르니 조심해요.',M2.match(L,ord.map(i=>R[i]),[0,1,2].map(i=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'G3-05'}); };
  /* 4학년 */
  Y.tSeq=()=>{ const a=rnd(2,5), k=pick([2,3]); const s=[a,a*k,a*k*k,a*k*k*k]; const d=s[1]-s[0];
    const rows=tr4([[`${k}배씩 커지는 규칙이에요.`,true,'첫 두 수의 차이만 봤어요'],[`${d}씩 커지는 규칙이에요.`,false,'첫 두 수의 차이만 봤어요'],[`다음 수는 ${s[3]*k}예요.`,true,'규칙을 끝까지 적용하지 않았어요'],[`다음 수는 ${s[3]+d}예요.`,false,'첫 두 수의 차이만 봤어요'],[`수가 점점 커져요.`,true,null]]);
    return mq(`수 배열 ${s.join(', ')}, … 을 보고 한 말이에요. 줄마다 맞는지 골라요.`,'이웃한 두 수 사이를 모두 살펴봐요. 차이가 일정한지, 몇 배씩인지 확인해요.',M2.truth(rows),'줄마다 바르게',{'첫 두 수의 차이만 봤어요':'R4-03','규칙을 끝까지 적용하지 않았어요':'R4-01'}); };
  Y.wQuot=()=>{ const d=rnd(21,48), q=rnd(12,19), n=d*q+rnd(0,d-1); if(n>999) return Y.wQuot();
    return mq(`${n} ÷ ${d}의 몫은 한 자리 수일까요, 두 자리 수일까요?`,`${d} × 10 = ${d*10}이에요. 나누어지는 수가 이보다 크면 몫은 10보다 커요(두 자리).`,M2.why(['한 자리 수','두 자리 수'],1,[`${String(n)[0]}이 ${d}보다 작으니까`,`${d} × 10 = ${d*10}이 ${n}보다 작으니까`,`나누는 수가 두 자리니까 몫은 한 자리`],1,{0:'앞자리만 보고 어림했어요',2:'나누는 수의 자릿수로만 판단했어요'}),'두 자리 수',{'앞자리만 보고 어림했어요':'N4-11','나누는 수의 자릿수로만 판단했어요':'N4-06','답은 맞았지만 까닭이 맞지 않아요':'N4-11'}); };
  Y.pPara=()=>{ const shapes=[['sq','정사각형',true],['rect','직사각형',true],['rh','마름모',true],['pg','평행사변형',true],['tz','사다리꼴',false],['kt','연 모양',false]]; const pickS=sh(shapes).slice(0,5); if(!pickS.some(s=>!s[2])) return Y.pPara();
    const P={sq:'14,10 44,10 44,40 14,40',rect:'6,14 52,14 52,38 6,38',rh:'29,6 48,26 29,46 10,26',pg:'14,12 52,12 42,40 4,40',tz:'18,12 40,12 52,40 6,40',kt:'29,6 44,20 29,46 14,20'};
    const it=pickS.map(s=>`<svg viewBox="0 0 58 52" width="58" height="52" style="display:block;box-shadow:none;background:none"><polygon points="${P[s[0]]}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2.5"/></svg>`);
    const good=pickS.map((s,i)=>s[2]?i:-1).filter(i=>i>=0), ex={}; pickS.forEach((s,i)=>{ if(!s[2]) ex[i]='한 쌍만 평행한 것도 골랐어요'; });
    return mq('마주 보는 두 쌍의 변이 서로 평행한 사각형을 모두 찾아 ○표 하세요.','평행사변형의 조건(두 쌍 평행)을 직사각형·정사각형·마름모도 모두 만족해요. 이름이 달라도 조건을 따져 봐요.',M2.pickAll(it,good,ex),'두 쌍이 평행한 사각형 모두',{'빠뜨린 것이 있어요':'G4-05','한 쌍만 평행한 것도 골랐어요':'G4-05'}); };
  Y.wProt=()=>{ const s=rnd(2,5)*10, d=rnd(4,9)*10; const e=s+d; if(e>170||180-e===d||180-e===e) return Y.wProt(); /* 180−끝 눈금이 답과 같으면 보기가 겹침(교수님 11/24: 80이 두 개) */
    return mq(`각도기의 중심을 꼭짓점에 맞추었지만 밑금을 한 변에 맞추지 않았어요. 같은 줄의 눈금으로 읽었더니 한 변은 ${s}°, 다른 한 변은 ${e}°를 가리켜요. 이 각의 크기는?`,'원래는 밑금을 한 변에 맞추어 그 변을 0°로 하고 읽어요. 밑금을 맞추지 않았다면 같은 줄의 두 눈금의 차가 각의 크기예요.',M2.why([`${e}°`,`${d}°`,`${180-e}°`],1,[`다른 한 변이 가리키는 눈금이 ${e}이니까`,`${e} − ${s} = ${d}이니까`,`다른 줄의 눈금을 읽으니까`],1,{0:'끝 눈금만 읽었어요',2:'두 줄의 눈금을 섞어 읽었어요'}),`${d}°`,{'끝 눈금만 읽었어요':'G4-11','두 줄의 눈금을 섞어 읽었어요':'G4-01','답은 맞았지만 까닭이 맞지 않아요':'G4-11','답이 맞지 않아요':'G4-11'}); };
  Y.mGraph=()=>{ const L=['한 달 동안 키가 어떻게 자랐는지','우리 반이 좋아하는 운동별 학생 수','하루 동안 기온이 어떻게 변했는지','반별 모은 빈 병의 수']; const R=['꺾은선그래프','막대그래프','꺾은선그래프','막대그래프']; const idx=sh([0,1,2,3]).slice(0,2); const L2=[L[0],L[1]].concat([]); 
    return mq('나타내려는 것에 알맞은 그래프를 이어 보세요.','시간에 따라 변하는 모습은 꺾은선그래프, 여러 항목의 크기를 비교할 때는 막대그래프가 알맞아요.',M2.match([L[idx[0]],L[idx[1]]].concat([0,1,2,3].filter(i=>!idx.includes(i)).map(i=>L[i])),['꺾은선그래프','막대그래프'],[idx[0],idx[1],...[0,1,2,3].filter(i=>!idx.includes(i))].map(i=>R[i]==='꺾은선그래프'?0:1),null,true),'알맞게 이은 것',{'잘못 이은 것이 있어요':'D6-05'}); };
  Y.wWave=()=>{ const a=rnd(31,38), b=a+rnd(2,4);
    const vis=`<svg viewBox="0 0 220 120" width="220" style="display:block;margin:auto;box-shadow:none"><line x1="30" y1="10" x2="30" y2="100" stroke="#7A4A1E"/><line x1="30" y1="100" x2="200" y2="100" stroke="#7A4A1E"/><path d="M26,92 l4,-3 l4,3 l4,-3" fill="none" stroke="#7A4A1E"/>${[...Array(6)].map((_,i)=>`<line x1="30" y1="${85-i*14}" x2="200" y2="${85-i*14}" stroke="#E8D9BF"/><text x="26" y="${88-i*14}" font-size="9" text-anchor="end" fill="#6B4A1E">${30+i*2}</text>`).join('')}<polyline points="70,${85-(a-30)*7} 160,${85-(b-30)*7}" fill="none" stroke="#C2412F" stroke-width="2.5"/><circle cx="70" cy="${85-(a-30)*7}" r="3.5" fill="#C2412F"/><circle cx="160" cy="${85-(b-30)*7}" r="3.5" fill="#C2412F"/><text x="70" y="114" font-size="10" text-anchor="middle">3월</text><text x="160" y="114" font-size="10" text-anchor="middle">9월</text></svg>`;
    const q=mq(`강낭콩의 키(cm)를 물결선 그래프로 나타냈어요. "9월 점의 높이가 3월보다 훨씬 높으니 키가 2배쯤 되었어"라는 말은 맞을까요?`,'물결선은 그래프의 아래쪽을 줄여서 생략한 거예요. 높이를 비교하지 말고 세로 눈금의 값을 읽어 비교해요.',M2.why(['맞아요','아니에요'],1,['점의 높이가 2배쯤 되니까',`눈금을 읽으면 ${a} cm에서 ${b} cm로 ${b-a} cm 자랐으니까`,'물결선이 있으면 그래프를 믿을 수 없으니까'],1,{0:'물결선을 무시하고 높이로 비교했어요',2:'물결선의 뜻을 몰라요'}),'아니에요 (눈금으로 비교)',{'물결선을 무시하고 높이로 비교했어요':'D4-02','물결선의 뜻을 몰라요':'D4-02','답은 맞았지만 까닭이 맞지 않아요':'D4-02','답이 맞지 않아요':'D4-02'}); q.visual=vis+(q.visual||''); return q; };
  /* 5학년 */
  Y.tLcm=()=>{ const [a,b]=pick([[4,6],[6,8],[6,9],[8,12],[9,12],[10,15]]); const g=_m2gcd(a,b), l=_m2lcm(a,b);
    const rows=tr4([[`${a}과 ${b}의 공약수 중 가장 큰 수는 ${g}${'013678'.includes(String(g).slice(-1))?'이에요':'예요'}.`,true,'최대공약수를 잘못 구했어요'],[`${a*b}는 ${a}와 ${b}의 최소공배수예요.`.replace(/^(\d+)는/,(m,n)=>n+('013678'.includes(n.slice(-1))?'은':'는')),l===a*b,'두 수를 곱하면 최소공배수라고 봤어요'],[`${l}은 ${a}와 ${b}의 공배수예요.`,true,null],[`${a*2}는 ${a}와 ${b}의 공배수예요.`,(a*2)%b===0,'한 수의 배수만 확인했어요'],[`${l*2}도 ${a}와 ${b}의 공배수예요.`,true,'공배수는 하나뿐이라고 봤어요']]).map(r=>[r[0].replace(/(\d)[과와] /g,(m,d)=>d+('013678'.includes(d)?'과':'와')+' ').replace(/(\d)[은는] /g,(m,d)=>d+('013678'.includes(d)?'은':'는')+' ').replace(/(\d)[은는]도/g,'$1도'),r[1],r[2]]);
    return mq(`${a}와 ${b}에 대한 설명이에요. 줄마다 맞는지 골라요.`.replace(/(\d)와/,(m,d)=>d+('013678'.includes(d)?'과':'와')),'공배수는 두 수 모두의 배수예요. 한쪽 수의 배수인지만 보지 말고 두 수로 모두 나누어 보세요.',M2.truth(rows),'줄마다 바르게',{'한 수의 배수만 확인했어요':'N5-11','두 수를 곱하면 최소공배수라고 봤어요':'N5-12','최대공약수를 잘못 구했어요':'N5-02','공배수는 하나뿐이라고 봤어요':'N5-11'}); };
  Y.mRule=()=>{ const ops=sh([['+',rnd(3,6)],['×',rnd(2,4)],['−',rnd(1,3)]]); const tables=ops.map(([o,k])=>{ const xs=[o==='−'?k+2:2,o==='−'?k+3:3,o==='−'?k+4:4]; return xs.map(x=>`${x}→${o==='+'?x+k:o==='×'?x*k:x-k}`).join(', '); }); const R=ops.map(([o,k])=>`△ = □ ${o} ${k}`); const ord=sh([0,1,2]);
    return mq('□와 △의 대응표를 보고 알맞은 식을 이어 보세요.','표의 두 줄 이상을 식에 넣어 확인해요. 첫 줄만 맞는 식은 규칙이 아니에요.',M2.match(tables,ord.map(i=>R[i]),[0,1,2].map(i=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'R5-03'}); };
  Y.pRange=()=>{ const lo=rnd(12,30), hi=lo+rnd(4,6); const kind=pick([['이상','미만'],['초과','이하'],['이상','이하']]); const ns=sh([lo-1,lo,lo+1,lo+2,hi-1,hi,hi+1]).slice(0,6); if(!ns.includes(lo)||!ns.includes(hi)) return Y.pRange();
    const inR=n=>(kind[0]==='이상'?n>=lo:n>lo)&&(kind[1]==='미만'?n<hi:n<=hi); const good=ns.map((n,i)=>inR(n)?i:-1).filter(i=>i>=0); const ex={}; ns.forEach((n,i)=>{ if(!inR(n)&&(n===lo||n===hi)) ex[i]='경계의 수를 잘못 넣었어요'; });
    return mq(`${lo} ${kind[0]} ${hi} ${kind[1]}인 수를 모두 찾아 ○표 하세요.`,'이상·이하는 그 수를 포함하고, 초과·미만은 포함하지 않아요. 수직선에 ●(포함)와 ○(포함 안 함)로 나타내 보세요.',M2.pickAll(ns.map(String),good,ex),'범위에 드는 수 모두',{'경계의 수를 잘못 넣었어요':'N5-08','빠뜨린 것이 있어요':'N5-16'}); };
  Y.tSym=()=>{ const rows=tr4([['직사각형의 대각선은 항상 대칭축이에요.',false,'대각선이면 대칭축이라고 봤어요'],['정사각형의 대각선은 대칭축이에요.',true,null],['넓이가 같은 두 삼각형은 항상 합동이에요.',false,'넓이가 같으면 합동이라고 봤어요'],['합동인 두 도형은 넓이가 같아요.',true,null],['원은 대칭축이 셀 수 없이 많아요.',true,null],['평행사변형은 항상 선대칭도형이에요.',false,'점대칭과 선대칭을 혼동했어요']]);
    return mq('도형에 대한 설명이에요. 줄마다 맞는지 골라요.','대칭축으로 접었을 때 완전히 겹쳐야 해요. 직사각형을 대각선으로 접으면 겹치지 않아요. 합동은 모양과 크기가 모두 같아야 해요.',M2.truth(rows),'줄마다 바르게',{'대각선이면 대칭축이라고 봤어요':'G5-09','넓이가 같으면 합동이라고 봤어요':'G5-07','점대칭과 선대칭을 혼동했어요':'G5-05'}); };
  Y.wAvg0=()=>{ const v=sh([rnd(2,6),0,rnd(1,6),rnd(2,7),rnd(1,5)]); const s=v.reduce((a,b)=>a+b,0); if(s%5||s%4===0) return Y.wAvg0(); const m=s/5, m4=+(s/4).toFixed(2);
    return mq(`5일 동안 읽은 책의 수가 ${v.join(', ')}권이에요. 하루 평균 몇 권을 읽었을까요?`,'0권인 날도 자료의 하나예요. 평균 = (자료의 합) ÷ (자료의 수)에서 자료의 수는 5예요.',M2.why([`${m}권`,`${m4}권`,`${s}권`],0,[`${s} ÷ 5 = ${m}이니까`,`0은 빼고 ${s} ÷ 4이니까`,`모두 더하면 ${s}이니까`],0,{1:'0인 자료를 빼고 나눴어요',2:'평균 대신 합을 구했어요'}),`${m}권`,{'0인 자료를 빼고 나눴어요':'D5-08','평균 대신 합을 구했어요':'D5-04','답이 맞지 않아요':'D5-08','답은 맞았지만 까닭이 맞지 않아요':'D5-08'}); };
  Y.mChance=()=>{ const ev=sh([['주사위를 던져 7이 나올 가능성','불가능해요'],['동전을 던져 그림 면이 나올 가능성','반반이에요'],['내일 아침에 해가 뜰 가능성','확실해요'],['빨간 공만 든 주머니에서 빨간 공을 꺼낼 가능성','확실해요'],['흰 공 2개, 검은 공 2개에서 흰 공을 꺼낼 가능성','반반이에요']]).slice(0,3); const R=['불가능해요','반반이에요','확실해요']; if(new Set(ev.map(e=>e[1])).size<2) return Y.mChance();
    return mq('일이 일어날 가능성을 알맞게 이어 보세요.','일어날 수 없으면 불가능(0), 꼭 일어나면 확실(1), 될 수도 안 될 수도 있고 그 정도가 같으면 반반(2분의 1)이에요.',M2.match(ev.map(e=>e[0]),R,ev.map(e=>R.indexOf(e[1])),null,true),'알맞게 이은 것',{'잘못 이은 것이 있어요':'D5-06'}); };
  /* 6학년 */
  Y.tFdiv=()=>{ const n=rnd(3,9), a=rnd(2,4), b=a+rnd(1,3); const rows=tr4([[`${n} ÷ ${b}분의 ${a}는 ${n}보다 커요.`,true,'나누면 항상 작아진다고 봤어요'],[`${n} ÷ ${b}분의 ${a}는 ${n}보다 작아요.`,false,'나누면 항상 작아진다고 봤어요'],[`${n} × ${b}분의 ${a}는 ${n}보다 작아요.`,true,'곱하면 항상 커진다고 봤어요'],[`${n} ÷ 1은 ${n}과 같아요.`.replace(/(\d)과 같아요/,(m,d)=>d+('013678'.includes(d)?'과':'와')+' 같아요'),true,null],[`${n} × ${b}분의 ${a}는 ${n}보다 커요.`,false,'곱하면 항상 커진다고 봤어요']]);
    return mq('계산하지 말고, 크기를 어림해서 줄마다 맞는지 골라요.','1보다 작은 수로 나누면 몫은 처음 수보다 커지고, 1보다 작은 수를 곱하면 처음 수보다 작아져요.',M2.truth(rows),'줄마다 바르게',{'나누면 항상 작아진다고 봤어요':'N6-01','곱하면 항상 커진다고 봤어요':'N5-05'}); };
  Y.wDisc=()=>{ const p=rnd(2,5)*1000, a=pick([10,20]), b=pick([10,20]); const p1=p*(100-a)/100, p2=p1*(100-b)/100, one=p*(100-a-b)/100;
    return mq(`${p}원짜리 물건을 ${a}% 할인한 뒤, 그 값에서 다시 ${b}% 할인했어요. 처음부터 ${a+b}% 할인한 값과 같을까요?`,'두 번째 할인은 처음 값이 아니라 이미 할인된 값을 기준량으로 해요. 단계별로 값을 계산해 비교해요.',M2.why(['같아요','달라요'],1,[`${a}% + ${b}% = ${a+b}%이니까`,`${p}→${p1}→${p2}원이고, ${a+b}% 할인은 ${one}원이니까`,'할인은 두 번 하면 안 되니까'],1,{0:'기준량이 바뀌는 것을 무시했어요'}),'달라요',{'기준량이 바뀌는 것을 무시했어요':'R6-06','답이 맞지 않아요':'R6-06','답은 맞았지만 까닭이 맞지 않아요':'R6-06'}); };
  Y.tSolid=()=>{ const rows=tr4([['각기둥의 밑면은 항상 바닥에 닿은 면이에요.',false,'아래에 놓인 면이 밑면이라고 봤어요'],['각기둥의 두 밑면은 서로 평행하고 합동이에요.',true,null],['원기둥에는 꼭짓점이 없어요.',true,'원기둥에 꼭짓점이 있다고 봤어요'],['구에는 모서리가 1개 있어요.',false,'원기둥·구에 모서리가 있다고 봤어요'],['오각뿔의 밑면은 오각형이에요.',true,'각뿔의 이름을 잘못 붙였어요'],['삼각기둥의 옆면은 모두 삼각형이에요.',false,'각기둥의 옆면 모양을 몰라요']]);
    return mq('입체도형에 대한 설명이에요. 줄마다 맞는지 골라요.','밑면은 놓인 위치가 아니라 서로 평행한 두 면(각기둥)이나 옆면과 만나는 한 면(각뿔)이에요. 각기둥의 옆면은 직사각형이에요.',M2.truth(rows),'줄마다 바르게',{'아래에 놓인 면이 밑면이라고 봤어요':'G6-01','원기둥에 꼭짓점이 있다고 봤어요':'G6-15','원기둥·구에 모서리가 있다고 봤어요':'G6-15','각뿔의 이름을 잘못 붙였어요':'G6-02','각기둥의 옆면 모양을 몰라요':'G6-03'}); };
  Y.wCircle2=()=>{ const r=rnd(2,6);
    return mq(`반지름이 ${r} cm인 원의 반지름을 2배로 늘리면, 넓이는 몇 배가 될까요?`,'원의 넓이 = 반지름 × 반지름 × 원주율이에요. 반지름이 2배면 반지름을 두 번 곱하니까 2 × 2배가 돼요.',M2.why(['2배','4배','8배'],1,['반지름이 2배니까 넓이도 2배',`${r}×${r}×3.14와 ${2*r}×${2*r}×3.14를 비교하면 4배니까`,'2를 세 번 곱하니까'],1,{0:'길이가 2배면 넓이도 2배라고 봤어요',2:'넓이와 부피를 혼동했어요'}),'4배',{'길이가 2배면 넓이도 2배라고 봤어요':'G6-13','넓이와 부피를 혼동했어요':'G6-08','답이 맞지 않아요':'G6-13','답은 맞았지만 까닭이 맞지 않아요':'G6-13'}); };
  Y.wSchool=()=>{ const A=rnd(3,5)*100, pa=rnd(3,4)*10, B=rnd(1,2)*100, pb=pa+rnd(2,3)*10; if(A*pa<=B*pb) return Y.wSchool();
    return mq(`가 학교 ${A}명 중 ${pa}%, 나 학교 ${B}명 중 ${pb}%가 안경을 써요. 안경을 쓴 학생이 더 많은 학교는?`,'전체가 다르면 비율만으로 수를 비교할 수 없어요. 전체 × 비율로 실제 수를 구해 비교해요.',M2.why(['가 학교','나 학교'],0,[`${pb}%가 ${pa}%보다 크니까`,`가 ${A}×${pa}÷100=${A*pa/100}명, 나 ${B}×${pb}÷100=${B*pb/100}명이니까`,'학생 수가 많은 학교가 항상 많으니까'],1,{0:'전체가 다른데 비율만 비교했어요',2:'전체만 보고 판단했어요'}),'가 학교',{'전체가 다른데 비율만 비교했어요':'D6-02','전체만 보고 판단했어요':'D6-02','답이 맞지 않아요':'D6-02','답은 맞았지만 까닭이 맞지 않아요':'D6-02'}); };
  Y.mBand=()=>{ const cuts=[0]; let t=0; const parts=[]; for(let i=0;i<3;i++){ const v=rnd(2,4)*5; parts.push(v); t+=v; cuts.push(t); } parts.push(100-t); cuts.push(100); if(new Set(parts).size<4) return Y.mBand(); const nm=['사과','배','포도','귤'];
    const bar=`<svg viewBox="0 0 260 46" width="260" style="display:block;margin:auto;box-shadow:none">${parts.map((p,i)=>`<rect x="${10+cuts[i]*2.4}" y="6" width="${p*2.4}" height="22" fill="${['#F6B3A8','#C9E3B4','#D8C3EE','#FFD9A0'][i]}" stroke="#7A4A1E"/><text x="${10+(cuts[i]+p/2)*2.4}" y="21" font-size="10" text-anchor="middle">${nm[i]}</text>`).join('')}${[0,20,40,60,80,100].map(v=>`<line x1="${10+v*2.4}" y1="28" x2="${10+v*2.4}" y2="33" stroke="#7A4A1E"/><text x="${10+v*2.4}" y="43" font-size="8" text-anchor="middle">${v}</text>`).join('')}</svg>`;
    const R=parts.map(p=>p+'%').concat([cuts[2]+'%']); const uniq=[...new Set(R)]; if(uniq.length<5) return Y.mBand(); const ord=sh([0,1,2,3,4]);
    const q=mq('띠그래프를 보고 과일별 비율을 이어 보세요. (하나는 남아요)','항목의 비율은 끝 눈금에서 시작 눈금을 뺀 길이예요. 끝 눈금만 읽으면 앞 항목까지 더한 값이 돼요.',M2.match(nm,ord.map(i=>R[i]),[0,1,2,3].map(i=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'D6-03'}); q.visual=bar+(q.visual||''); return q; };
  window._M2Y=Y;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    [['S2-10','mMulDiv'],['S6-18','pRight'],['S6-38','mUnit'],['S5-03','tSeq'],['S3-47','wQuot'],['S6-31','pPara'],['S6-47','wProt'],['S4-13','mGraph'],['S4-12','wWave'],['S3-72','tLcm'],['S5-12','mRule'],['S3-84','pRange'],['S6-54','tSym'],['S4-15','wAvg0'],['S4-18','mChance'],['S3-107','tFdiv'],['S5-16','wDisc'],['S6-63','tSolid'],['S6-75','wCircle2'],['S4-21','wSchool'],['S4-19','mBand']].forEach(([e,k])=>add(e,Y[k])); }catch(e){}
}

/* ===== 3-82. 네온 표 나머지(11/23 밤): 답+까닭·잇기·판별로 7틀 ===== */
{ const pick=a=>a[rnd(0,a.length-1)], sh=a=>shuffle(a.slice()), Z={}, jw=n=>n+('013678'.includes(String(n).slice(-1))?'과':'와');
  Z.wMixSub=()=>{ const d=pick([4,5,6,8]), w=rnd(2,4), a=rnd(1,d-2), b=rnd(a+1,d-1); const A=(w-1)+'과 '+d+'분의 '+(d+a-b); const ans=`${jw(w-1)} ${d}분의 ${d+a-b}`, w10=`${jw(w-1)} ${d}분의 ${10+a-b}`;
    return m2q(`${jw(w)} ${d}분의 ${a} − ${d}분의 ${b}를 계산하면?`,`분수 부분끼리 뺄 수 없으면 자연수 1을 ${d}분의 ${d}로 바꾸어 분수 부분에 더해요. 1을 10으로 바꾸는 것이 아니에요.`,M2.why([ans,w10,`${jw(w)} ${d}분의 ${b-a}`],0,[`자연수 1을 ${d}분의 ${d}로 바꾸어 ${d}분의 ${d+a}에서 ${b}를 뺐으니까`,`1을 10으로 받아내려 ${10+a}에서 ${b}를 뺐으니까`,`큰 분자에서 작은 분자를 뺐으니까`],0,{1:'1을 10으로 받아내렸어요',2:'큰 수에서 작은 수를 뺐어요'}),ans,{'1을 10으로 받아내렸어요':'N4-05','큰 수에서 작은 수를 뺐어요':'N2-02','답이 맞지 않아요':'N4-05','답은 맞았지만 까닭이 맞지 않아요':'N4-05'}); };
  Z.wEq=()=>{ const a=rnd(11,29), b=rnd(3,9), c=rnd(2,b-1+5); const A=a+b-c; if(A<=0||c===b) return Z.wEq();
    return m2q(`${a} + ${b} = □ + ${c}에서 □에 알맞은 수는?`,'등호(=)는 "답은"이 아니라 양쪽의 크기가 같다는 뜻이에요. 왼쪽을 먼저 계산하고, 오른쪽이 같아지는 수를 찾아요.',M2.why([String(A),String(a+b),String(a+b+c)],0,[`왼쪽이 ${a+b}이니까 □ + ${c} = ${a+b}가 되는 수`,`${a} + ${b}를 계산한 값이 답이니까`,`나온 수를 모두 더했으니까`],0,{1:'등호를 "답은"으로 이해했어요',2:'수를 모두 더했어요'}),String(A),{'등호를 "답은"으로 이해했어요':'R4-02','수를 모두 더했어요':'R4-02','답이 맞지 않아요':'R4-02','답은 맞았지만 까닭이 맞지 않아요':'R4-02'}); };
  Z.wFracAdd=()=>{ const [a,b]=pick([[2,3],[2,5],[3,4],[3,5],[4,5]]); const L=a*b; const ans=`${L}분의 ${a+b}`, bad=`${a+b}분의 2`;
    return m2q(`${a}분의 1 + ${b}분의 1을 계산하면?`,`분모가 다르면 먼저 통분해요. ${a}분의 1 = ${L}분의 ${b}, ${b}분의 1 = ${L}분의 ${a}예요.`,M2.why([ans,bad,`${L}분의 2`],0,[`통분하면 ${L}분의 ${b} + ${L}분의 ${a}이니까`,`분모끼리, 분자끼리 더했으니까`,`분모를 곱하고 분자를 더했으니까`],0,{1:'분자끼리, 분모끼리 더했어요',2:'통분하지 않고 분자만 더했어요'}),ans,{'분자끼리, 분모끼리 더했어요':'N5-04','통분하지 않고 분자만 더했어요':'N5-13','답이 맞지 않아요':'N5-04','답은 맞았지만 까닭이 맞지 않아요':'N5-04'}); };
  Z.wDecRem=()=>{ /* 네온: 나누는 수가 소수여야 소수점 옮김 뒤 나머지 소수점 오류가 잡힘 */ const d=pick([1.2,1.5,2.5,0.4,0.6]), q=rnd(2,7), r=rnd(1,Math.round(d*10)-1)/10; const n=+(d*q+r).toFixed(1); if(n>=30||Math.round(r*10)%10===0) return Z.wDecRem();
    return m2q(`리본 ${n} m를 ${d} m씩 자르면 몇 도막이 되고, 남는 리본은 몇 m일까요?`,`몫은 자연수까지 구하고, 남는 양은 원래 수의 소수점 자리를 그대로 내려 써요. 검산: ${d} × ${q} + ${r} = ${n}`,M2.why([`${q}도막, ${r} m`,`${q}도막, ${Math.round(r*10)} m`,`${q+1}도막, 0 m`],0,[`${d} × ${q} + ${r} = ${n}로 확인했으니까`,`나머지 소수점을 지웠으니까`,`남는 것은 한 도막으로 치니까`],0,{1:'나머지의 소수점을 빠뜨렸어요',2:'남는 양을 한 도막으로 셌어요'}),`${q}도막, ${r} m`,{'나머지의 소수점을 빠뜨렸어요':'N6-09','남는 양을 한 도막으로 셌어요':'N4-12','답이 맞지 않아요':'N6-09','답은 맞았지만 까닭이 맞지 않아요':'N6-09'}); };
  Z.wProp=()=>{ const a=rnd(2,5), b=a+rnd(1,4), k=rnd(2,5); const A=a*k, add=a+(b*k-b); if(new Set([A,add,b*k-a]).size<3) return Z.wProp();
    return m2q(`${a} : ${b} = □ : ${b*k}에서 □에 알맞은 수는?`,`비의 뒤의 수가 ${b}에서 ${b*k}로 ${k}배가 되었어요. 비의 성질에 따라 앞의 수도 ${k}배 해요.`,M2.why([String(A),String(add),String(b*k-a)],0,[`${b} × ${k} = ${b*k}이니까 ${a} × ${k}`,`${b}에서 ${b*k}로 ${b*k-b} 커졌으니 ${a}에도 더했으니까`,`외항과 내항을 바꿨으니까`],0,{1:'비의 성질을 덧셈으로 적용했어요',2:'외항과 내항을 잘못 짝지었어요'}),String(A),{'비의 성질을 덧셈으로 적용했어요':'R6-10','외항과 내항을 잘못 짝지었어요':'R6-12','답이 맞지 않아요':'R6-10','답은 맞았지만 까닭이 맞지 않아요':'R6-10'}); };
  Z.mArea=()=>{ const xs=[]; const seen=new Set(); while(xs.length<3){ const t=pick(['pg','tr']), b=rnd(3,9), h=rnd(2,8); const A=t==='pg'?b*h:b*h/2; if(A%1||seen.has(A)) continue; seen.add(A); xs.push([t,b,h,A]); }
    const L=xs.map(([t,b,h])=>`${t==='pg'?'평행사변형':'삼각형'}: 밑변 ${b} cm, 높이 ${h} cm`); const R=xs.map(x=>x[3]+' cm²'); const tr=xs.find(x=>x[0]==='tr'); const trap=tr?tr[1]*tr[2]+' cm²':(xs[0][3]+1)+' cm²'; if(R.includes(trap)) return Z.mArea(); R.push(trap); const ord=sh([0,1,2,3]);
    return m2q('도형과 넓이를 알맞게 이어 보세요. (넓이 하나는 남아요)','평행사변형은 밑변 × 높이, 삼각형은 밑변 × 높이 ÷ 2예요. 삼각형에서 ÷ 2를 빠뜨리지 않았는지 확인해요.',M2.match(L,ord.map(i=>R[i]),[0,1,2].map(i=>ord.indexOf(i))),'바르게 이은 것',{'잘못 이은 것이 있어요':'G5-03'}); };
  Z.tPicto=()=>{ const ns=['가 마을','나 마을','다 마을']; const v=ns.map(()=>rnd(1,4)*10+rnd(1,6)); if(new Set(v).size<3) return Z.tPicto(); const icon=(big,s)=>`<span style="display:inline-block;width:${big?18:11}px;height:${big?18:11}px;border-radius:50%;background:${big?'#E8743B':'#F6C59E'};margin:1px;vertical-align:middle"></span>`;
    const tb=`<table style="margin:4px auto;border-collapse:collapse;background:#fff">${ns.map((n,i)=>`<tr><td style="border:1.5px solid #C9A877;padding:3px 8px">${n}</td><td style="border:1.5px solid #C9A877;padding:3px 8px;text-align:left">${[...Array(Math.floor(v[i]/10))].map(()=>icon(1)).join('')}${[...Array(v[i]%10)].map(()=>icon(0)).join('')}</td></tr>`).join('')}</table><div style="font-size:.85rem">큰 동그라미 10상자, 작은 동그라미 1상자</div>`;
    const mx=v.indexOf(Math.max(...v)); const cnt=v.map(x=>Math.floor(x/10)+x%10); const mostIcons=cnt.indexOf(Math.max(...cnt)); if(mostIcons===mx||cnt.filter(x=>x===cnt[mostIcons]).length>1) return Z.tPicto(); /* 네온: 그림이 가장 많은 마을 ≠ 상자가 가장 많은 마을이어야 함정이 됨 */
    const rows=sh([[`${ns[mx]}의 사과가 가장 많아요.`,true,'그림 개수로만 비교했어요'],[`${ns[0]}의 사과는 ${v[0]}상자예요.`,true,'큰 그림과 작은 그림의 단위를 무시했어요'],[`${ns[1]}의 사과는 ${cnt[1]}상자예요.`,cnt[1]===v[1],'큰 그림과 작은 그림의 단위를 무시했어요'],[`그림이 가장 많은 ${ns[mostIcons]}의 사과가 가장 많아요.`,mostIcons===mx,'그림 개수로만 비교했어요']]).slice(0,4);
    if(rows.every(r=>r[1])) return Z.tPicto(); const q=m2q('마을별 사과 생산량을 그림그래프로 나타냈어요. 줄마다 맞는지 골라요.','큰 그림 하나는 10상자, 작은 그림 하나는 1상자예요. 그림의 개수가 아니라 나타내는 수를 더해 비교해요.',M2.truth(rows),'줄마다 바르게',{'그림 개수로만 비교했어요':'D3-01','큰 그림과 작은 그림의 단위를 무시했어요':'D3-01'}); q.visual=tb+(q.visual||''); return q; };
  window._M2Z=Z;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    [['S3-55','wMixSub'],['S5-10','wEq'],['S3-79','wFracAdd'],['S3-112','wDecRem'],['S5-19','wProp'],['S6-71','mArea'],['S4-08','tPicto']].forEach(([e,k])=>add(e,Z[k])); }catch(e){}
}

/* ===== 3-83. 모눈 칠하기·완성하기(늘품이 통권 발문 2위 '그리기·완성하기', 독일 VERA '그려 넣기') =====
   M2.paint(c,r,given,o): given=이미 칠해진 칸(바꿀 수 없음), 누를 때마다 칠/지움. o.check(set) o.wrong(set) o.axis o.center o.sol */
M2.paint=(c,r,given,opt)=>{ const on=new Set(), G=new Set(given.map(([x,y])=>x+','+y)), u=Math.min(38,Math.floor(300/c));
  const o={ draw(){ let g=''; for(let y=0;y<r;y++) for(let x=0;x<c;x++){ const k=x+','+y, fix=G.has(k), v=on.has(k); g+=`<rect ${fix?'':`data-ma="c${x}_${y}"`} x="${6+x*u}" y="${6+y*u}" width="${u}" height="${u}" fill="${fix?'#F2A65A':v?'#9CC9F0':'#fff'}" stroke="#C9B48E" stroke-width="1" style="${fix?'':'cursor:pointer'}"/>`; }
      if(opt.axis!=null) g+=`<line x1="${6+opt.axis*u}" y1="0" x2="${6+opt.axis*u}" y2="${12+r*u}" stroke="#C2412F" stroke-width="3" stroke-dasharray="6 4"/>`;
      if(opt.center) g+=`<circle cx="${6+opt.center[0]*u}" cy="${6+opt.center[1]*u}" r="5" fill="#C2412F"/>`;
      return `<svg viewBox="0 0 ${12+c*u} ${12+r*u}" width="${12+c*u}" style="max-width:100%;display:block;margin:auto;box-shadow:none;touch-action:manipulation">${g}</svg><div style="font-size:.88rem;color:#8A6A4A">${opt.tip||'칸을 누르면 칠해지고, 다시 누르면 지워져요.'} (칠한 칸 ${on.size}개)</div>`; },
    on(a){ const [x,y]=a.slice(1).split('_'); const k=x+','+y; on.has(k)?on.delete(k):on.add(k); },
    check(){ return opt.check(on); }, wrong(){ return opt.wrong?opt.wrong(on):'아직 맞지 않아요'; },
    reveal(){ on.clear(); (opt.sol||[]).forEach(([x,y])=>on.add(x+','+y)); }, goal(){ return opt.sol?{taps:opt.sol.map(([x,y])=>`c${x}_${y}`),mis:null}:null; }, state:()=>({n:on.size}) };
  const m=m2make(o); m._o=o; return m; };
{ const pick=a=>a[rnd(0,a.length-1)], W={}, key=(x,y)=>x+','+y, same=(set,arr)=>set.size===arr.length&&arr.every(([x,y])=>set.has(key(x,y)));
  const blob=(c,r,n,x0,y0,xmax)=>{ const s=[[x0,y0]], S=new Set([key(x0,y0)]); let t=0; while(s.length<n&&t++<400){ const [x,y]=pick(s), [dx,dy]=pick([[1,0],[-1,0],[0,1],[0,-1]]), nx=x+dx, ny=y+dy; if(nx<0||ny<0||nx>=(xmax==null?c:xmax)||ny>=r||S.has(key(nx,ny))) continue; S.add(key(nx,ny)); s.push([nx,ny]); } return s.length===n?s:null; };
  /* ① 부분이 전체의 몇 분의 1일 때 전체 칠하기 (3학년) */
  W.whole=()=>{ const n=pick([2,3,4]), k=pick([2,3]); const c=6, r=4; const g=blob(c,r,k,0,0); if(!g) return W.whole(); const need=n*k;
    return m2q(`주황색 부분은 전체의 ${n}분의 1이에요. 전체가 되도록 파란색으로 더 칠해 보세요.`,`주황색 ${k}칸이 ${n}분의 1이면, 전체는 ${k}칸이 ${n}묶음이에요. 주황색까지 모두 ${need}칸이 되게 칠해요.`,M2.paint(c,r,g,{check:s=>s.size+k===need,wrong:s=>s.size===need?'주황색 칸을 빼고 셌어요':s.size+k===n?'칸 수를 묶음 수와 같게 봤어요':'전체의 칸 수가 맞지 않아요',sol:(()=>{ const out=[]; for(let y=0;y<r&&out.length<need-k;y++) for(let x=0;x<c&&out.length<need-k;x++) if(!g.some(p=>p[0]===x&&p[1]===y)) out.push([x,y]); return out; })()}),`모두 ${need}칸`,{'주황색 칸을 빼고 셌어요':'N3-07','칸 수를 묶음 수와 같게 봤어요':'N3-07','전체의 칸 수가 맞지 않아요':'N3-07'}); };
  /* ② 선대칭도형 완성 (5학년) */
  W.sym=()=>{ const c=8, r=5, ax=4; const half=blob(c,r,rnd(4,6),3,rnd(1,3),ax); if(!half) return W.sym(); const sol=half.map(([x,y])=>[2*ax-1-x,y]); const shift=half.map(([x,y])=>[x+ax,y]);
    return m2q('빨간 점선을 대칭축으로 하는 선대칭도형이 되도록 오른쪽을 칠해 완성하세요.','대칭축에서 각 칸까지의 거리가 같도록 반대쪽에 칠해요. 그대로 옮기는(밀기) 것이 아니라 거울처럼 뒤집어야 해요.',M2.paint(c,r,half,{axis:ax,check:s=>same(s,sol),wrong:s=>same(s,shift)?'뒤집지 않고 그대로 옮겼어요':'대칭축까지의 거리가 맞지 않아요',sol}),'거울처럼 뒤집은 모양',{'뒤집지 않고 그대로 옮겼어요':'G5-15','대칭축까지의 거리가 맞지 않아요':'G5-10'}); };
  /* ③ 점대칭도형 완성 (5학년): 대칭의 중심 = 모눈 가운데 꼭짓점 */
  W.psym=()=>{ const c=8, r=6; const half=blob(c,r,rnd(4,6),3,rnd(1,2),4).filter(([x,y])=>y<3); if(half.length<3) return W.psym(); const sol=half.map(([x,y])=>[c-1-x,r-1-y]); const line=half.map(([x,y])=>[c-1-x,y]); if(sol.some(([x,y])=>half.some(p=>p[0]===x&&p[1]===y))) return W.psym();
    return m2q('빨간 점을 대칭의 중심으로 하는 점대칭도형이 되도록 칠해 완성하세요.','점대칭은 대칭의 중심을 기준으로 180° 돌렸을 때 겹치는 도형이에요. 각 칸을 중심을 지나 반대편 같은 거리에 칠해요.',M2.paint(c,r,half,{center:[c/2,r/2],check:s=>same(s,sol),wrong:s=>same(s,line)?'선대칭처럼 옆으로만 뒤집었어요':'대칭의 중심까지의 거리가 맞지 않아요',sol}),'180° 돌린 모양',{'선대칭처럼 옆으로만 뒤집었어요':'G5-05','대칭의 중심까지의 거리가 맞지 않아요':'G5-10'}); };
  /* ④ 넓이가 ■ cm²인 직사각형 그리기 (5학년): 둘레와 넓이 혼동을 잡음 */
  W.rectA=()=>{ const A=pick([6,8,10,12,15,16,18]); const c=8, r=5; const ok=s=>{ if(s.size!==A) return false; const p=[...s].map(k=>k.split(',').map(Number)); const xs=p.map(v=>v[0]), ys=p.map(v=>v[1]); const w=Math.max(...xs)-Math.min(...xs)+1, h=Math.max(...ys)-Math.min(...ys)+1; return w*h===A; };
    const fac=[...Array(8)].map((_,i)=>i+1).filter(w=>A%w===0&&w<=c&&A/w<=r); if(!fac.length) return W.rectA(); const w0=fac[fac.length-1], sol=[]; for(let y=0;y<A/w0;y++) for(let x=0;x<w0;x++) sol.push([x,y]);
    return m2q(`모눈 한 칸은 1 cm²예요. 넓이가 ${A} cm²인 직사각형을 칠해 보세요.`,`넓이는 칠한 칸의 수예요. 가로 × 세로 = ${A}가 되는 가로·세로를 먼저 찾아 보세요.`,M2.paint(c,r,[],{check:ok,wrong:s=>{ if(s.size===A) return '칸 수는 맞지만 직사각형이 아니에요'; const p=[...s].map(k=>k.split(',').map(Number)); if(!p.length) return '아직 칠하지 않았어요'; const xs=p.map(v=>v[0]), ys=p.map(v=>v[1]); const w=Math.max(...xs)-Math.min(...xs)+1, h=Math.max(...ys)-Math.min(...ys)+1; return 2*(w+h)===A?'둘레가 '+A+'인 직사각형을 그렸어요':'넓이가 맞지 않아요'; },sol}),`넓이 ${A} cm² 직사각형`,{['둘레가 '+A+'인 직사각형을 그렸어요']:'G5-01','넓이가 맞지 않아요':'G5-01','칸 수는 맞지만 직사각형이 아니에요':null}); };
  window._M2W=W;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    [['S3-34','whole'],['S6-54','sym'],['S6-55','psym'],['S6-68','rectA']].forEach(([e,k])=>add(e,W[k])); }catch(e){}
}

/* ===== 3-88. 레퍼런스에서 가져온 구체 조작 2가지 (11/24) =====
   ① 자리값 판에 바둑돌 놓기·옮기기 — 독일 VERA-3 'Stellenwerttafel'(점으로 수 나타내기, 점 하나 옮겨 가장 큰 수), 늘품이 '바둑돌'
   ② 컴퍼스 꽂을 자리·벌릴 길이 고르기 — 일본 전국학력 2025 2(1)(평행사변형 작도에서 꽂을 꼭짓점·벌릴 길이를 잘못 고름), 늘품이 '컴퍼스'(35회) */
M2.pv=(cols,start,opt)=>{ const v=start.slice(); const moved=()=>v.reduce((s,x,i)=>s+Math.abs(x-start[i]),0);
  const val=()=>v.reduce((s,x,i)=>s*10+x,0);
  const o={ draw(){ const W=Math.min(76,Math.floor(280/cols.length)); return `<div style="display:grid;max-width:100%;grid-template-columns:repeat(${cols.length},minmax(0,${W}px));gap:0;border:2.5px solid #7A4A1E;border-radius:10px;overflow:hidden;background:#fff">${cols.map((c,i)=>`<div style="border-left:${i?'2px solid #C9A56B':'0'};display:flex;flex-direction:column;align-items:center"><div style="width:100%;text-align:center;background:#FFF1D6;font-family:Jua,sans-serif;padding:4px 0;border-bottom:2px solid #C9A56B">${c}</div><button type="button" data-ma="u${i}" style="width:100%;min-height:96px;border:0;background:#fff;cursor:pointer;touch-action:manipulation;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:3px;padding:6px 4px">${'<span style="width:16px;height:16px;border-radius:50%;background:#3A3A3A;display:inline-block"></span>'.repeat(v[i])}</button><button type="button" data-ma="d${i}" style="width:100%;min-height:40px;border:0;border-top:2px dashed #E8D9BF;background:#FFF8EC;font-family:Jua,sans-serif;color:#8A6A4A;cursor:pointer;touch-action:manipulation">빼기</button></div>`).join('')}</div><div style="font-size:.9rem;color:#8A6A4A">${opt.moveOne?'칸을 누르면 바둑돌이 놓이고, [빼기]를 누르면 빠져요. 돌은 하나만 옮겨요.':'칸을 누르면 바둑돌이 하나 놓이고, [빼기]를 누르면 하나 빠져요.'}</div>`; },
    on(a){ const i=+a.slice(1); if(a[0]==='u'){ if(v[i]<9) v[i]++; } else if(v[i]>0) v[i]--; },
    check(){ return opt.check(val(),v,moved()); }, wrong(){ return opt.wrong?opt.wrong(val(),v,moved()):'아직 맞지 않아요'; },
    reveal(){ opt.sol.forEach((x,i)=>v[i]=x); }, goal(){ const t=[]; opt.sol.forEach((x,i)=>{ const d=x-start[i]; for(let k=0;k<Math.abs(d);k++) t.push((d>0?'u':'d')+i); }); return {taps:t,mis:null}; }, state:()=>({s:v.join('')}) };
  const m=m2make(o); m._o=o; return m; };
M2.compass=(pts,lens,ok,wrongOf,extra)=>{ let at=null, L=null, drawn=false; const u=34;
  const o={ draw(){ let g=extra||''; if(drawn&&at!=null&&L!=null){ const [x,y]=pts[at].p; g+=`<circle cx="${x}" cy="${y}" r="${L*u}" fill="none" stroke="#D45F16" stroke-width="2" stroke-dasharray="5 4"/>`; }
      pts.forEach((pt,i)=>{ const [x,y]=pt.p; g+=`<circle data-ma="p${i}" cx="${x}" cy="${y}" r="13" fill="${at===i?'#E8743B':'#fff'}" stroke="#7A4A1E" stroke-width="2.5" style="cursor:pointer"/><text x="${x}" y="${y-18}" font-size="15" text-anchor="middle" font-family="Jua">${pt.n}</text>`; });
      return `<svg viewBox="0 0 340 250" width="340" style="max-width:100%;display:block;margin:auto;box-shadow:none;background:#fff;border-radius:10px;touch-action:manipulation">${g}</svg><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center"><span style="font-family:Jua,sans-serif">컴퍼스 벌리기:</span>${lens.map((l,i)=>m2b('l'+i,l+' cm',L===l?'border-color:#E8743B;background:#FFF1D6':'')).join('')}</div><div style="display:flex;gap:8px;justify-content:center;margin-top:4px">${m2b('go','컴퍼스 돌려 보기','')}</div><div style="font-size:.88rem;color:#8A6A4A">점을 눌러 컴퍼스 침을 꽂고, 벌릴 길이를 고른 뒤 돌려 보세요. (꽂은 곳: ${at==null?'아직':pts[at].n}, 벌린 길이: ${L==null?'아직':L+' cm'})</div>`; },
    on(a){ if(a==='go'){ drawn=true; return; } drawn=false; if(a[0]==='p') at=+a.slice(1); else L=lens[+a.slice(1)]; },
    check(){ return at!=null&&L!=null&&ok(at,L); }, wrong(){ if(at==null||L==null) return '꽂을 곳과 벌릴 길이를 모두 골라요'; return wrongOf(at,L); },
    reveal(){ const s=o._sol; at=s[0]; L=s[1]; drawn=true; }, goal(){ const s=o._sol; return {taps:['p'+s[0],'l'+lens.indexOf(s[1]),'go'],mis:null}; }, state:()=>({s:`${at==null?'x':at}${L==null?'x':L}`}) };
  const m=m2make(o); m._o=o; return m; };
{ const pk=a=>a[rnd(0,a.length-1)], PV={};
  /* 수를 바둑돌로 나타내기 (4학년 0이 있는 자리) */
  PV.show=()=>{ const cols=['만','천','백','십','일']; const d=[rnd(1,4),pk([0,rnd(1,5)]),pk([0,rnd(1,5)]),rnd(0,4),rnd(1,5)]; if(!d.includes(0)) d[2]=0; const n=+d.join('');
    return m2q(`바둑돌로 ${n.toLocaleString('ko-KR')}을 나타내 보세요.`.replace(/(\d)을/,(m,x)=>x+('013678'.includes(x)?'을':'를')),'각 자리의 숫자만큼 그 자리 칸에 바둑돌을 놓아요. 0인 자리는 비워 둬요.',M2.pv(cols,[0,0,0,0,0],{check:x=>x===n,wrong:(x,v)=>v.join('')===String(n).split('').reverse().join('')?'자리를 거꾸로 놓았어요':'나타낸 수가 달라요',sol:d}),n.toLocaleString('ko-KR'),{'자리를 거꾸로 놓았어요':'N4-15','나타낸 수가 달라요':'N4-15'}); };
  /* 바둑돌 하나만 옮겨 가장 큰 수 (독일 VERA 'Wie heißt die Zahl') */
  PV.move=()=>{ const cols=['천','백','십','일']; const s=[rnd(1,3),rnd(0,3),rnd(1,4),rnd(1,4)]; const sol=s.slice(); let from=3; for(let i=3;i>0;i--) if(s[i]>0){ from=i; break; } if(s[0]>=9) return PV.move(); sol[from]--; sol[0]++; const target=+sol.join('');
    let best=0; for(let i=0;i<4;i++) for(let j=0;j<4;j++){ if(i===j||!s[i]) continue; const t=s.slice(); t[i]--; t[j]++; best=Math.max(best,+t.join('')); } if(best!==target) return PV.move();
    return m2q(`바둑돌 ${s.reduce((a,b)=>a+b,0)}개로 ${(+s.join('')).toLocaleString('ko-KR')}을 나타냈어요. 바둑돌 하나만 옮겨서 가장 큰 수를 만들어 보세요.`.replace(/(\d)을 나타/,(m,x)=>x+('013678'.includes(x)?'을':'를')+' 나타'),'가장 높은 자리의 돌이 하나 늘수록 수가 가장 많이 커져요. 낮은 자리에서 하나를 빼서 가장 높은 자리로 옮겨요.',M2.pv(cols,s,{moveOne:1,check:(x,v,mv)=>mv===2&&x===target,wrong:(x,v,mv)=>mv!==2?'돌을 하나만 옮겨요':x<target?'더 큰 수를 만들 수 있어요':'나타낸 수가 달라요',sol}),target.toLocaleString('ko-KR'),{'더 큰 수를 만들 수 있어요':'N4-10','돌을 하나만 옮겨요':null,'나타낸 수가 달라요':'N4-15'}); };
  /* 컴퍼스: 평행사변형의 넷째 꼭짓점 찾기 (4학년, 일본 2025 2(1) 꼴) */
  PV.para=()=>{ const u=32, a=pk([3,4,5]), bc=pk([2,3,4,5].filter(x=>x!==a)); const A=[30,215], B=[30+a*u,215], C=[B[0]+0.6*bc*u,215-0.8*bc*u]; const D=[A[0]+(C[0]-B[0]),A[1]+(C[1]-B[1])]; const AB=a, BC=bc; if(C[0]>320||C[1]<30) return PV.para();
    const ex=`<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="#4A2E14" stroke-width="3"/><line x1="${B[0]}" y1="${B[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#4A2E14" stroke-width="3"/><text x="${(A[0]+B[0])/2}" y="${A[1]+20}" font-size="13" text-anchor="middle">${AB} cm</text><text x="${(B[0]+C[0])/2+22}" y="${(B[1]+C[1])/2}" font-size="13" text-anchor="middle">${BC} cm</text><line x1="${C[0]}" y1="${C[1]}" x2="${C[0]-AB*u}" y2="${C[1]}" stroke="#7A4A1E" stroke-width="1.5" stroke-dasharray="4 4"/><text x="${D[0]}" y="${D[1]-6}" font-size="12" fill="#8A6A4A" text-anchor="middle">?</text>`;
    const pts=[{n:'ㄱ',p:A},{n:'ㄴ',p:B},{n:'ㄷ',p:C}]; const lens=[...new Set([AB,BC,BC+1,AB+BC])].sort((x,y)=>x-y);
    const m=M2.compass(pts,lens,(i,L)=>i===0&&L===BC,(i,L)=>i===0?'꽂은 곳은 맞지만 벌린 길이가 달라요':L===BC?'벌린 길이는 맞지만 꽂은 곳이 달라요':'꽂은 곳과 벌린 길이가 모두 달라요',ex); m._o._sol=[0,BC];
    return m2q('변 ㄱㄴ, 변 ㄴㄷ을 두 변으로 하는 평행사변형 ㄱㄴㄷㄹ을 그리려고 해요. 점선 위의 꼭짓점 ㄹ을 찾으려면 컴퍼스 침을 어디에 꽂고 몇 cm 벌려야 할까요?','평행사변형은 마주 보는 두 변의 길이가 같아요. 변 ㄱㄹ은 변 ㄴㄷ과 길이가 같으니, 점 ㄱ에 침을 꽂고 변 ㄴㄷ의 길이만큼 벌려요.',m,`ㄱ에 꽂고 ${BC} cm`,{'꽂은 곳은 맞지만 벌린 길이가 달라요':'G4-05','벌린 길이는 맞지만 꽂은 곳이 달라요':'G4-05','꽂은 곳과 벌린 길이가 모두 달라요':'G4-05'}); };
  /* 컴퍼스: 이등변삼각형 그리기 (4학년) */
  PV.iso=()=>{ const u=34, base=pk([4,5,6]), side=pk([3,4,5]); if(side*2<=base) return PV.iso(); const A=[60,200], B=[60+base*u,200];
    const ex=`<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="#4A2E14" stroke-width="3"/><text x="${(A[0]+B[0])/2}" y="${A[1]+22}" font-size="13" text-anchor="middle">${base} cm</text>`;
    const pts=[{n:'ㄱ',p:A},{n:'ㄴ',p:B}]; const lens=[...new Set([side,base,side+1,side*2])].sort((x,y)=>x-y);
    const m=M2.compass(pts,lens,(i,L)=>L===side,(i,L)=>L===base?'밑변의 길이만큼 벌렸어요':'벌린 길이가 달라요',ex); m._o._sol=[0,side];
    return m2q(`밑변이 ${base} cm이고 나머지 두 변이 ${side} cm인 이등변삼각형을 그리려고 해요. 컴퍼스를 한쪽 끝에 꽂고 몇 cm 벌려야 할까요?`,`이등변삼각형의 같은 두 변은 ${side} cm예요. 밑변의 양 끝에서 ${side} cm씩 원을 그리면 만나는 점이 세 번째 꼭짓점이에요.`,m,`${side} cm`,{'밑변의 길이만큼 벌렸어요':null,'벌린 길이가 달라요':null}); };
  window._PV=PV;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-40',PV.show); add('S3-39',PV.move); add('S6-30',PV.para); add('S6-28',PV.iso); }catch(e){}
}

/* ===== 3-91. 조작이 없던 편에 '직접 해 보기' + 진단(11/24) =====
   틀린 상태마다 오개념 코드가 붙는다(m.wrong → q.mis). 엔진은 있던 것(paint·pickAll·color2·match)을 쓰고, 쌓기나무 직육면체만 새로 만든다.
   레퍼런스: 늘품이 놀이 '같은 부피의 직육면체 만들기'(6학년), 진단도구 분수·어림·규칙 문항의 오답 유형 */
{ const pick=a=>a[rnd(0,a.length-1)], key=(x,y)=>x+','+y;
  const fr=(n,d)=>`${d}분의 ${n}`, mx=(w,n,d)=>`${w}${'136780'.includes(String(w).slice(-1))?'과':'와'} ${d}분의 ${n}`;
  const reW=(m,f)=>{ const ow=m._o.wrong; m._o.wrong=()=>{ let r=null; try{ r=f(m._o.state()); }catch(e){} return r||ow(); }; return m; };
  const pts=s=>[...s].map(k=>k.split(',').map(Number));
  const box=s=>{ const p=pts(s); if(!p.length) return null; const xs=p.map(v=>v[0]), ys=p.map(v=>v[1]); const w=Math.max(...xs)-Math.min(...xs)+1, h=Math.max(...ys)-Math.min(...ys)+1; return {w,h,full:w*h===p.length}; };
  const X={};
  /* ① 3학년 분수만큼은 몇 개: 12의 3분의 2 — 분자만큼(2개), 한 묶음만(4개) 칠하는 오개념 */
  X.fracOf=()=>{ const g=pick([3,4]), per=pick([3,4,5]), k=rnd(2,g-1), N=g*per, need=k*per; const sol=[]; for(let y=0;y<k;y++) for(let x=0;x<per;x++) sol.push([x,y]);
    const m=M2.paint(per,g,[],{tip:'한 줄이 한 묶음이에요. 칸을 누르면 칠해져요.',check:s=>s.size===need,wrong:s=>s.size===k?'분자의 수만큼만 칠했어요':s.size===per?'한 묶음만 칠했어요':s.size===N-need?'남는 쪽을 칠했어요':'칠한 개수가 맞지 않아요',sol});
    return m2q(`도토리 ${N}개를 똑같이 ${g}묶음으로 나누었어요(한 줄이 한 묶음). ${N}의 ${fr(k,g)}만큼 칠해 보세요.`,`${N}의 ${fr(1,g)}은 한 묶음(${per}개)이에요. ${fr(k,g)}은 그 묶음이 ${k}개예요.`,m,`${need}개`,{'분자의 수만큼만 칠했어요':'N3-07','한 묶음만 칠했어요':'N3-39','남는 쪽을 칠했어요':null,'칠한 개수가 맞지 않아요':null}); };
  /* ② 3학년 진분수·가분수 색칠 — 분자와 분모가 같은 분수를 진분수로 보는 오개념 */
  X.propImp=()=>{ const d=pick([4,5,6,7]); const items=shuffle([[rnd(1,d-1),d],[rnd(1,d-1),d],[d,d],[d+rnd(1,4),d],[d+rnd(1,3),d],[rnd(1,d-1),d]].map(([n,dd])=>[n,dd])); const seen=new Set(); const uq=items.filter(([n,dd])=>{ const k=n+'/'+dd; if(seen.has(k)) return false; seen.add(k); return true; }); if(uq.length<5) return X.propImp();
    const want=uq.map(([n,dd])=>n<dd?'r':'b'), eqI=uq.findIndex(([n,dd])=>n===dd);
    const m=M2.color2(uq.map(([n,dd])=>fr(n,dd)),want,['진분수','가분수'],'진분수와 가분수를 바꿔 칠했어요');
    reW(m,st=>st.s[eqI]==='r'?'분자와 분모가 같은 분수를 진분수로 칠했어요':st.s.includes('0')?'아직 칠하지 않은 분수가 있어요':null);
    return m2q('진분수는 빨간색, 가분수는 파란색으로 칠해 보세요.','분자가 분모보다 작으면 진분수, 분자가 분모와 같거나 크면 가분수예요.',m,'진분수 빨강, 가분수 파랑',{'분자와 분모가 같은 분수를 진분수로 칠했어요':'N3-18','진분수와 가분수를 바꿔 칠했어요':'N3-32','아직 칠하지 않은 분수가 있어요':null,'색칠이 맞지 않은 것이 있어요':'N3-32'}); };
  /* ③ 3학년 대분수 ↔ 가분수 잇기 — 자연수를 분자에 더함(N3-35), 자연수와 분자를 이어 씀(N3-36) */
  X.mixImp=()=>{ const d=pick([3,4,5,6]); const raw=[]; while(raw.length<3){ const w=rnd(1,3), n=rnd(1,d-1); if(!raw.some(r=>r[0]===w&&r[1]===n)) raw.push([w,n]); }
    const R0=raw.map(([w,n])=>fr(w*d+n,d)), dA=fr(raw[0][0]+raw[0][1],d), dB=fr(+(String(raw[1][0])+raw[1][1]),d);
    if(new Set([...R0,dA,dB]).size<5) return X.mixImp();
    const R=shuffle([...R0,dA,dB]), ans=R0.map(r=>R.indexOf(r)), wm={}; wm['0>'+R.indexOf(dA)]='자연수를 분자에 그대로 더했어요'; wm['1>'+R.indexOf(dB)]='자연수와 분자를 이어 썼어요';
    return m2q('대분수와 크기가 같은 가분수를 이어 보세요. (남는 가분수도 있어요)','자연수 1은 분모만큼의 조각이에요. 자연수 × 분모에 분자를 더하면 가분수의 분자가 돼요.',M2.match(raw.map(([w,n])=>mx(w,n,d)),R,ans,wm),R0.join(', '),{'자연수를 분자에 그대로 더했어요':'N3-35','자연수와 분자를 이어 썼어요':'N3-36','잘못 이은 것이 있어요':'N3-38','아직 다 잇지 않았어요':null}); };
  /* ④ 5학년 기약분수 잇기 — 공약수로 한 번만 나누고 멈춤(N5-12) */
  X.lowest=()=>{ const base=shuffle([[1,2],[2,3],[3,4],[1,3],[2,5],[3,5]]).slice(0,3), ks=[4,6,4]; const L=base.map(([a,b],i)=>[a*ks[i],b*ks[i]]); const R0=base.map(([a,b])=>fr(a,b)), dA=fr(L[0][0]/2,L[0][1]/2), dB=fr(L[1][0]/2,L[1][1]/2);
    if(new Set([...R0,dA,dB]).size<5) return X.lowest();
    const R=shuffle([...R0,dA,dB]), ans=R0.map(r=>R.indexOf(r)), wm={}; wm['0>'+R.indexOf(dA)]='한 번만 약분하고 멈췄어요'; wm['1>'+R.indexOf(dB)]='한 번만 약분하고 멈췄어요';
    return m2q('분수를 기약분수로 나타낸 것과 이어 보세요. (남는 분수도 있어요)','분모와 분자의 공약수가 1뿐일 때까지 나누어요. 최대공약수로 한 번에 나누면 빨라요.',M2.match(L.map(([a,b])=>fr(a,b)),R,ans,wm),R0.join(', '),{'한 번만 약분하고 멈췄어요':'N5-12','잘못 이은 것이 있어요':null,'아직 다 잇지 않았어요':null}); };
  /* ⑤ 5학년 이상·이하·초과·미만 고르기 — 경계 수를 넣고 빼는 오개념 */
  X.range=()=>{ const a=rnd(12,30), b=a+rnd(4,6), kind=pick(['이상이하','이상미만','초과이하']); const inR=v=>(kind==='초과이하'?v>a:v>=a)&&(kind==='이상미만'?v<b:v<=b);
    const nums=shuffle([...new Set([a-1,a,a+1,rnd(a+2,b-2),b-1,b,b+1])]); const good=nums.map((v,i)=>inR(v)?i:-1).filter(i=>i>=0);
    const nm={이상이하:`${a} 이상 ${b} 이하`,이상미만:`${a} 이상 ${b} 미만`,초과이하:`${a} 초과 ${b} 이하`}[kind];
    const ia=nums.indexOf(a), ib=nums.indexOf(b);
    const m=M2.pickAll(nums.map(String),good);
    reW(m,st=>{ const s=st.s; const bad=(i,want)=>(s[i]==='1')!==want; if(bad(ia,inR(a))||bad(ib,inR(b))) return '경계에 있는 수를 잘못 넣거나 뺐어요'; return null; });
    return m2q(`${nm}인 수를 모두 찾아 ○표 하세요.`,'이상·이하는 그 수를 포함하고, 초과·미만은 포함하지 않아요.',m,good.map(i=>nums[i]).join(', '),{'경계에 있는 수를 잘못 넣거나 뺐어요':'N5-08','아닌 것에도 ○ 표 했어요':null,'빠뜨린 것이 있어요':null}); };
  /* ⑥ 5학년 올림·버림·반올림해서 같은 수가 되는 수 고르기 — 경계(올림 340, 버림 360, 반올림 450·550) */
  X.roundSet=kind=>()=>{ const t=rnd(3,8)*100, R=kind==='반올림'?t:t+rnd(2,8)*10; const unit=kind==='반올림'?100:10, place=kind==='반올림'?'백':'십';
    const f=v=>kind==='올림'?Math.ceil(v/unit)*unit:kind==='버림'?Math.floor(v/unit)*unit:Math.round(v/unit)*unit;
    const cand=kind==='반올림'?[R-51,R-50,R-1-rnd(0,30),R+rnd(5,30),R+49,R+50,R+51]:kind==='올림'?[R-10,R-9,R-rnd(2,8),R,R+1]:[R-1,R,R+rnd(2,8),R+9,R+10];
    const nums=shuffle([...new Set(cand)]); const good=nums.map((v,i)=>f(v)===R?i:-1).filter(i=>i>=0);
    const edge=kind==='반올림'?[R-50,R+50,R-51,R+49]:kind==='올림'?[R-10,R]:[R,R+10];
    const m=M2.pickAll(nums.map(String),good);
    reW(m,st=>{ const s=st.s; for(const e of edge){ const i=nums.indexOf(e); if(i>=0&&(s[i]==='1')!==(f(e)===R)) return kind==='반올림'?'5에서 올리는 것과 경계를 헷갈렸어요':'올림·버림의 경계를 헷갈렸어요'; } return null; });
    return m2q(`${kind}하여 ${place}의 자리까지 나타내면 ${R}이 되는 수를 모두 찾아 ○표 하세요.`,kind==='반올림'?'구하려는 자리 바로 아래 자리 숫자가 0~4이면 버리고, 5~9이면 올려요.':kind==='올림'?'구하려는 자리 아래 수가 0이 아니면 올려요. 아래 수가 모두 0이면 그대로예요.':'구하려는 자리 아래 수를 모두 0으로 버려요.',m,good.map(i=>nums[i]).join(', '),{'5에서 올리는 것과 경계를 헷갈렸어요':'N5-14','올림·버림의 경계를 헷갈렸어요':'N6-10','아닌 것에도 ○ 표 했어요':null,'빠뜨린 것이 있어요':null}); };
  /* ⑦ 5학년 (자연수) ÷ (자연수)의 몫을 분수로: 피자 a판을 b명이 — 한 판을 통째로(1), 한 조각만(b분의 1) */
  X.pizza=()=>{ const b=pick([3,4,5,6]), a=rnd(2,b-1); const sol=[]; for(let y=0;y<a;y++) sol.push([0,y]);
    const m=M2.paint(b,a,[],{tip:'한 줄이 피자 한 판이에요(똑같이 '+b+'조각). 칸을 누르면 칠해져요.',check:s=>s.size===a,wrong:s=>s.size===b?'피자 한 판을 통째로 한 명 몫으로 봤어요':s.size===1?'한 판에서 한 조각만 칠했어요':'칠한 조각 수가 맞지 않아요',sol});
    return m2q(`피자 ${a}판을 ${b}명이 똑같이 나누어 먹어요. 한 명이 먹는 양만큼 칠해 보세요.`,`한 판을 ${b}조각으로 나누면 한 명은 판마다 1조각씩 먹어요. 그래서 ${a} ÷ ${b} = ${fr(a,b)}예요.`,m,`${fr(a,b)}판 (${a}조각)`,{'피자 한 판을 통째로 한 명 몫으로 봤어요':'N3-01','한 판에서 한 조각만 칠했어요':'N3-39','칠한 조각 수가 맞지 않아요':null}); };
  /* ⑧ 5학년 늘어나는 모양의 규칙: 계단 1, 3, 6, … 다음 — 늘어나는 수를 그대로(+2) 두는 오개념 */
  X.stairs=()=>{ const n=pick([4,5]); const tri=k=>k*(k+1)/2; let vis='<div style="display:flex;gap:14px;align-items:flex-end;justify-content:center">'; for(let k=1;k<n;k++){ let g=''; for(let i=0;i<k;i++) for(let j=0;j<=i;j++) g+=`<rect x="${2+j*12}" y="${2+(k-1-i+0)*12}" width="12" height="12" fill="#F2A65A" stroke="#7A4A1E"/>`; vis+=`<div style="text-align:center;font-size:.85rem"><svg viewBox="0 0 ${4+k*12} ${4+k*12}" width="${4+k*12}" style="box-shadow:none;display:block;margin:auto">${g}</svg>${['','첫','둘','셋','넷'][k]}째</div>`; } vis+='</div>';
    const need=tri(n), prev=tri(n-1), d0=tri(n-1)-tri(n-2); const sol=[]; for(let i=0;i<n;i++) for(let j=0;j<=i;j++) sol.push([j,i]);
    const m=M2.paint(n+1,n+1,[],{check:s=>s.size===need,wrong:s=>s.size===prev+d0?'늘어나는 수를 앞과 똑같이 더했어요':s.size===prev*2?'앞 모양의 2배로 늘렸어요':'칸 수가 규칙에 맞지 않아요',sol});
    const q=m2q(`규칙에 따라 계단 모양을 쌓고 있어요. ${['','','','','넷','다섯'][n]}째 모양을 칠해 보세요.`,`모양마다 칸 수가 ${[1,2,3].slice(0,n-1).map(tri).join(', ')}…로 늘어요. 늘어나는 수가 1씩 커져요.`,m,`${need}칸`,{'늘어나는 수를 앞과 똑같이 더했어요':'R4-01','앞 모양의 2배로 늘렸어요':'R5-03','칸 수가 규칙에 맞지 않아요':null});
    q.visual=vis+q.visual; return q; };
  /* ⑨ 3학년 둘레가 ■ cm인 직사각형 칠하기 — 넓이를 ■로 그림(G5-01) */
  X.perim=()=>{ const P=pick([10,12,14,16]); const c=8, r=5; const ok=s=>{ const b=box(s); return !!b&&b.full&&2*(b.w+b.h)===P; }; const w0=P/2-2, sol=[]; for(let y=0;y<2;y++) for(let x=0;x<w0;x++) sol.push([x,y]); if(w0>c) return X.perim();
    return m2q(`모눈 한 칸의 한 변은 1 cm예요. 둘레가 ${P} cm인 직사각형을 칠해 보세요.`,'둘레는 도형의 바깥 테두리 길이예요. (가로 + 세로) × 2를 생각해 보세요.',M2.paint(c,r,[],{check:ok,wrong:s=>{ const b=box(s); if(!b) return '아직 칠하지 않았어요'; if(!b.full) return '직사각형 모양이 아니에요'; return s.size===P?'칸 수(넓이)를 둘레와 같게 칠했어요':'둘레가 맞지 않아요'; },sol}),`둘레 ${P} cm 직사각형`,{'칸 수(넓이)를 둘레와 같게 칠했어요':'G5-01','직사각형 모양이 아니에요':null,'둘레가 맞지 않아요':null,'아직 칠하지 않았어요':null}); };
  /* ⑩ 5학년 합동인 도형 칠하기 — 넓이(칸 수)만 같게 칠함(G5-07) */
  X.congr=()=>{ const c=9, r=5; const sh=pick([[[0,0],[1,0],[2,0],[0,1]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[1,0],[2,0],[1,1],[1,2]],[[0,0],[0,1],[1,1],[2,1],[2,2]],[[0,0],[1,0],[0,1],[0,2],[1,2]]]); const oy=rnd(0,r-1-Math.max(...sh.map(p=>p[1]))); const given=sh.map(([x,y])=>[x,y+oy]);
    const norm=a=>{ const mnx=Math.min(...a.map(p=>p[0])), mny=Math.min(...a.map(p=>p[1])); return a.map(([x,y])=>(x-mnx)+','+(y-mny)).sort().join(' '); };
    const forms=new Set(); let cur=sh; for(let f=0;f<2;f++){ for(let t=0;t<4;t++){ forms.add(norm(cur)); cur=cur.map(([x,y])=>[y,-x]); } cur=cur.map(([x,y])=>[-x,y]); }
    const sol=sh.map(([x,y])=>[x+5,y+oy]);
    return m2q('왼쪽 주황색 도형과 합동인 도형을 오른쪽에 칠해 보세요. (돌리거나 뒤집어도 돼요)','합동은 모양과 크기가 같아서 포개었을 때 완전히 겹치는 도형이에요. 칸 수만 같으면 안 돼요.',M2.paint(c,r,given,{tip:'오른쪽 빈칸을 누르면 칠해져요.',check:s=>s.size===sh.length&&forms.has(norm(pts(s))),wrong:s=>s.size===sh.length?'칸 수(넓이)만 같고 모양이 달라요':'칸 수가 달라요',sol}),'모양과 크기가 같은 도형',{'칸 수(넓이)만 같고 모양이 달라요':'G5-07','칸 수가 달라요':'G5-14'}); };
  window._M2N=X;
  try{ const add=(ep,g)=>{ if(G36[ep]&&g){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-35',X.fracOf); add('S3-36',X.propImp); add('S3-38',X.mixImp); add('S3-75',X.lowest); add('S3-83',X.range);
    add('S3-85',X.roundSet('올림')); add('S3-86',X.roundSet('버림')); add('S3-87',X.roundSet('반올림')); add('S3-97',X.pizza); add('S5-06',X.stairs);
    add('S6-66',X.perim); add('S6-52',X.congr); add('S5-17',M2.qRatio); add('S5-14',M2.qBandPct); }catch(e){}
}

/* ===== 3-92. 쌓기나무로 같은 부피의 직육면체 만들기(늘품이 6학년 놀이) =====
   가로·세로·높이를 바꾸어 쌓기나무 N개짜리 직육면체를 서로 다르게 여러 개 만든다. 돌려 놓은 같은 직육면체는 하나로 센다. */
M2.box3=(N,need)=>{ let d=[1,1,1]; const saved=[]; const lab=['가로','세로','높이']; let note='';
  const iso=(a,b,c)=>{ const u=Math.max(6,Math.min(16,Math.floor(120/(a+b+c)))), cx=u*b*0.87, P=(x,y,z)=>[(x-y)*u*0.87+cx+8, (x+y)*u*0.5-z*u+c*u+8]; const q=pts=>pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
    let g=`<polygon points="${q([P(0,0,c),P(a,0,c),P(a,b,c),P(0,b,c)])}" fill="#F7D9A8" stroke="#7A4A1E" stroke-width="1.5"/><polygon points="${q([P(a,0,0),P(a,b,0),P(a,b,c),P(a,0,c)])}" fill="#E8B56C" stroke="#7A4A1E" stroke-width="1.5"/><polygon points="${q([P(0,b,0),P(a,b,0),P(a,b,c),P(0,b,c)])}" fill="#D99A4E" stroke="#7A4A1E" stroke-width="1.5"/>`;
    const L=(p1,p2)=>`<line x1="${p1[0].toFixed(1)}" y1="${p1[1].toFixed(1)}" x2="${p2[0].toFixed(1)}" y2="${p2[1].toFixed(1)}" stroke="#7A4A1E" stroke-width=".7"/>`;
    for(let i=1;i<a;i++){ g+=L(P(i,0,c),P(i,b,c))+L(P(i,b,0),P(i,b,c)); } for(let j=1;j<b;j++){ g+=L(P(0,j,c),P(a,j,c))+L(P(a,j,0),P(a,j,c)); } for(let k=1;k<c;k++){ g+=L(P(a,0,k),P(a,b,k))+L(P(0,b,k),P(a,b,k)); }
    const W=(a+b)*u*0.87+16, H=(a+b)*u*0.5+c*u+16; return `<svg viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" width="${Math.min(220,W).toFixed(0)}" style="box-shadow:none;display:block;margin:auto">${g}</svg>`; };
  const keyOf=t=>t.slice().sort((x,y)=>x-y).join('x');
  const o={ draw(){ const [a,b,c]=d; return `${iso(a,b,c)}<div style="font-size:.95rem">쌓기나무 <b>${a*b*c}개</b></div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">${lab.map((l,i)=>`<div style="display:flex;align-items:center;gap:4px">${m2b('m'+i,'−','min-width:38px;padding:4px')}<span style="min-width:62px;text-align:center">${l} ${d[i]}</span>${m2b('p'+i,'+','min-width:38px;padding:4px')}</div>`).join('')}</div><div>${m2b('save','이 모양 담기 ✓')}</div><div style="font-size:.88rem;color:#8A6A4A">담은 모양: ${saved.length?saved.map(t=>t.join(' × ')).join(', '):'아직 없어요'}${note?' — '+note:''}</div>`; },
    on(a){ note=''; if(a==='save'){ if(saved.some(t=>keyOf(t)===keyOf(d))){ note='돌려 놓으면 같은 모양이에요'; o._dup=(o._dup||0)+1; return; } saved.push(d.slice()); return; } const i=+a.slice(1); if(a[0]==='p'&&d[i]<12) d[i]++; if(a[0]==='m'&&d[i]>1) d[i]--; },
    check(){ return saved.length>=need&&saved.every(t=>t[0]*t[1]*t[2]===N); },
    wrong(){ if(saved.some(t=>t[0]*t[1]*t[2]!==N)){ const t=saved.find(t=>t[0]*t[1]*t[2]!==N); return t[0]+t[1]+t[2]===N?'가로·세로·높이를 더했어요':2*(t[0]*t[1]+t[1]*t[2]+t[0]*t[2])===N?'겉넓이를 맞췄어요':'쌓기나무 수가 맞지 않는 모양이 있어요'; } if(o._dup) return '돌려 놓은 같은 모양을 다시 담으려 했어요'; return '아직 모양이 모자라요'; },
    reveal(){ saved.length=0; const out=[]; for(let a=1;a<=N;a++) for(let b=a;b<=N;b++){ if(N%(a*b)) continue; const c=N/(a*b); if(c>=b&&c<=12&&out.length<need) out.push([a,b,c]); } out.forEach(t=>saved.push(t)); d=out[0].slice(); },
    goal(){ return null; }, state:()=>({s:saved.map(keyOf).join('_')}) };
  const m=m2make(o); m._o=o; return m; };
window._qBox3=M2.qBox3=()=>{ const N=rndPick(12,18,24), need=3; return m2q(`쌓기나무 ${N}개를 모두 써서 부피가 같은 직육면체를 서로 다르게 ${need}가지 만들어 담아 보세요.`,`쌓기나무 한 개의 부피는 1 cm³예요. 가로 × 세로 × 높이 = ${N}이 되는 세 수를 찾아요. 돌려 놓은 모양은 같은 것으로 쳐요.`,M2.box3(N,need),`가로 × 세로 × 높이 = ${N}`,{'가로·세로·높이를 더했어요':'G6-05','겉넓이를 맞췄어요':'G6-05','쌓기나무 수가 맞지 않는 모양이 있어요':null,'돌려 놓은 같은 모양을 다시 담으려 했어요':null,'아직 모양이 모자라요':null}); };
try{ if(G36['S6-77']) G36['S6-77'].push(M2.qBox3); if(G36['S6-78']) G36['S6-78'].push(M2.qBox3); (window._NTW=window._NTW||[]).push(['S6-77',0,M2.qBox3]); }catch(e){}

/* ===== 3-93. 3학년 mm 자로 길이 재기(11/24): 'cm 몇 mm'를 두 단추로 맞춘다 =====
   오개념: 0이 아닌 눈금에서 시작했는데 끝 눈금을 그대로 읽음(G2-08), 작은 눈금(mm)을 세지 않음, 작은 눈금 한 칸을 0.5나 2로 봄 */
M2.read2=(svg,ansMM,alts)=>{ let c=0, mm=0;
  const o={ draw(){ return svg+`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center"><span style="display:flex;align-items:center;gap:4px">${m2b('cm','−')}<b style="font-size:1.3rem;min-width:56px;text-align:center">${c} cm</b>${m2b('cp','+')}</span><span style="display:flex;align-items:center;gap:4px">${m2b('mm','−')}<b style="font-size:1.3rem;min-width:62px;text-align:center">${mm} mm</b>${m2b('mp','+')}</span></div>`; },
    on(a){ if(a==='cp'&&c<20) c++; if(a==='cm'&&c>0) c--; if(a==='mp'&&mm<9) mm++; if(a==='mm'&&mm>0) mm--; },
    check(){ return c*10+mm===ansMM; }, wrong(){ return alts[c*10+mm]||null; }, reveal(){ c=Math.floor(ansMM/10); mm=ansMM%10; },
    goal(){ return {taps:[...Array(Math.floor(ansMM/10)).fill('cp'),...Array(ansMM%10).fill('mp')],mis:null}; }, state:()=>({x:c*10+mm}) };
  const m=m2make(o); m._o=o; return m; };
window._qRulerMM=M2.qRulerMM=()=>{ const s=rndPick(0,0,1,2), A=s*10+rnd(0,4), L=rnd(23,58); if(L%10===0) return M2.qRulerMM(); const B=A+L, n=Math.ceil(B/10)+1-s, u=34, X=v=>14+(v-s*10)*u/10;
  let g=`<rect x="4" y="44" width="${X((s+n)*10)+6}" height="40" fill="#FFF3C4" stroke="#7A4A1E" stroke-width="1.8" rx="3"/>`;
  for(let v=s*10;v<=(s+n)*10;v++){ const big=v%10===0, mid=v%5===0; g+=`<line x1="${X(v).toFixed(1)}" y1="44" x2="${X(v).toFixed(1)}" y2="${big?62:mid?56:51}" stroke="#4A2E14" stroke-width="${big?1.8:.9}"/>`; if(big) g+=`<text x="${X(v).toFixed(1)}" y="78" font-size="13" text-anchor="middle" font-weight="700" fill="#4A2E14">${v/10}</text>`; }
  g+=`<rect x="${X(A).toFixed(1)}" y="20" width="${(X(B)-X(A)).toFixed(1)}" height="14" rx="3" fill="#7CB0E0" stroke="#2F6FA8" stroke-width="1.6"/><line x1="${X(A).toFixed(1)}" y1="12" x2="${X(A).toFixed(1)}" y2="44" stroke="#D45F16" stroke-dasharray="3 3"/><line x1="${X(B).toFixed(1)}" y1="12" x2="${X(B).toFixed(1)}" y2="44" stroke="#D45F16" stroke-dasharray="3 3"/>`;
  const svg=`<div style="width:100%;overflow-x:auto"><svg viewBox="0 0 ${(X((s+n)*10)+16).toFixed(0)} 90" style="width:100%;min-width:300px;max-width:420px;display:block;margin:auto">${g}</svg></div><div style="font-size:.85rem;color:#8A6A4A">큰 눈금 한 칸은 1 cm, 작은 눈금 한 칸은 1 mm예요.</div>`;
  const alts={}; if(A) alts[B]='끝 눈금을 그대로 읽었어요'; alts[Math.floor(L/10)*10]='작은 눈금(mm)을 세지 않았어요'; const half=Math.floor(L/10)*10+Math.round((L%10)/2); if(half!==L&&!alts[half]) alts[half]='작은 눈금 한 칸을 2 mm로 봤어요';
  return m2q('자로 색 테이프의 길이를 재었어요. 몇 cm 몇 mm인지 맞추어 보세요.','테이프의 왼쪽 끝 눈금에서 오른쪽 끝 눈금까지 1 cm가 몇 번, 1 mm가 몇 번 들어가는지 세어요.',M2.read2(svg,L,alts),`${Math.floor(L/10)} cm ${L%10} mm`,{'끝 눈금을 그대로 읽었어요':'G2-08','작은 눈금(mm)을 세지 않았어요':'D4-01','작은 눈금 한 칸을 2 mm로 봤어요':'D4-01'}); };
try{ if(G36['S6-37']){ G36['S6-37'].push(M2.qRulerMM); (window._NTW=window._NTW||[]).push(['S6-37',G36['S6-37'].length-1,M2.qRulerMM]); } }catch(e){}

/* ===== 3-94. 각도기로 각도를 재는 순서 잇기(늘품이 낱개 '각도' — 순서에 맞게 번호 쓰기) =====
   밑금·중심을 맞추기 전에 눈금부터 읽거나, 0°에서 시작하지 않는 눈금을 읽는 순서를 진단 */
{ const S=['각도기의 중심을 각의 꼭짓점에 맞춰요.','각도기의 밑금을 각의 한 변에 맞춰요.','밑금에 맞춘 변의 0°에서 시작하는 눈금을 따라가 다른 변이 가리키는 눈금을 읽어요.'];
  window._qProtOrder=()=>{ const L=['첫째','둘째','셋째'], R=shuffle(S.slice()), ans=S.map(s=>R.indexOf(s)), wm={};
    wm['0>'+R.indexOf(S[2])]='맞추기 전에 눈금부터 읽었어요'; wm['1>'+R.indexOf(S[2])]='맞추기 전에 눈금부터 읽었어요';
    return m2q('각도기로 각도를 재는 순서에 맞게 이어 보세요.','중심과 밑금을 먼저 맞춘 다음, 밑금에 맞춘 변의 0°에서 시작하는 눈금을 읽어요.',M2.match(L,R,ans,wm),'중심 맞추기 → 밑금 맞추기 → 0°에서 시작하는 눈금 읽기',{'맞추기 전에 눈금부터 읽었어요':'G4-01','잘못 이은 것이 있어요':null,'아직 다 잇지 않았어요':null}); };
  try{ if(G36['S6-47']){ G36['S6-47'].push(window._qProtOrder); (window._NTW=window._NTW||[]).push(['S6-47',G36['S6-47'].length-1,window._qProtOrder]); } }catch(e){} }

/* ===== 3-95. '빈틈없이 채워요'(S6-33)를 교과서·늘품이 방식으로(교수님 11/24) =====
   4학년 '다각형'의 모양 채우기는 모양 조각(정삼각형·마름모·사다리꼴·정육각형)을 겹치지 않게 빈틈없이 놓는 활동이다.
   정다각형의 한 각(108°, 120°)이나 '한 꼭짓점에 모인 각의 합 360°'로 판단하는 문제는 교육과정 밖이라 뺀다. */
{ const s=34, h=s*0.866, P={
    tri:{n:'정삼각형',u:1,p:[[0,h],[s,h],[s/2,0]]}, rho:{n:'마름모',u:2,p:[[0,h],[s,h],[1.5*s,0],[0.5*s,0]]},
    trap:{n:'사다리꼴',u:3,p:[[0,h],[2*s,h],[1.5*s,0],[0.5*s,0]]}, hex:{n:'정육각형',u:6,p:[[0.5*s,0],[1.5*s,0],[2*s,h],[1.5*s,2*h],[0.5*s,2*h],[0,h]]},
    big:{n:'큰 정삼각형',u:4,p:[[0,2*h],[2*s,2*h],[s,0]]}, para:{n:'평행사변형',u:4,p:[[0,h],[2*s,h],[2.5*s,0],[0.5*s,0]]} };
  const poly=(sh,dx,dy,fill,sw)=>`<polygon points="${sh.p.map(([x,y])=>(x+dx).toFixed(1)+','+(y+dy).toFixed(1)).join(' ')}" fill="${fill}" stroke="#7A4A1E" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const W=sh=>Math.max(...sh.p.map(v=>v[0])), H=sh=>Math.max(...sh.p.map(v=>v[1]));
  const PAIRS=[['hex','tri'],['hex','rho'],['hex','trap'],['big','tri'],['trap','tri'],['para','tri'],['para','rho'],['rho','tri']];
  window._qFillPieces=()=>{ const [tk,pk]=pick2(); const T=P[tk], K=P[pk], ans=T.u/K.u;
    const w1=W(T)*1.25, svg=`<svg viewBox="-6 -6 ${(w1+W(K)+40).toFixed(0)} ${(Math.max(H(T)*1.25,H(K))+30).toFixed(0)}" style="max-width:300px;width:100%;display:block;margin:auto;box-shadow:none"><g transform="scale(1.25)">${poly(T,0,0,'#FFF','3')}</g>${poly(K,w1+24,(H(T)*1.25-H(K))/2,'#F2A65A','2')}<text x="${(w1/2).toFixed(0)}" y="${(H(T)*1.25+20).toFixed(0)}" text-anchor="middle" font-size="13" fill="#4A2E14">채울 모양</text><text x="${(w1+24+W(K)/2).toFixed(0)}" y="${(H(T)*1.25+20).toFixed(0)}" text-anchor="middle" font-size="13" fill="#4A2E14">모양 조각</text></svg>`;
    /* 그림은 같은 비율이 아니라 '채울 모양'을 조금 크게 그린다 → 그림 길이를 재서 답하지 않게, 조각의 관계(정삼각형 몇 개 크기)로 판단 */
    const rel=`(${K.n} 조각 1개는 정삼각형 조각 ${K.u}개와 크기가 같아요. ${T.n}은 정삼각형 조각 ${T.u}개로 채울 수 있어요.)`;
    const sides=T.p.length; let cand=[ans,T.u,sides,K.u*ans+1].filter((v,i,a)=>v>0&&a.indexOf(v)===i); while(cand.length<3) cand.push(ans+cand.length);
    const opts=shuffle(cand.slice(0,4).map(v=>v+'개'));
    const ob=w=>w+(((w.charCodeAt(w.length-1)-0xAC00)%28)?'을':'를');
    return {q:`${ob(T.n)} ${K.n} 조각으로 겹치지 않게 빈틈없이 채우려고 해요. ${K.n} 조각은 몇 개 필요할까요?`, visual:svg, opts, ans:ans+"개", mis:{}, hint1:"조각을 겹치지 않게, 빈틈없이 놓아 보세요.", hint:rel+` 그래서 ${T.u} ÷ ${K.u} = ${ans}(개)예요.`}; };
  const pick2=()=>PAIRS[rnd(0,PAIRS.length-1)];
  try{ if(G36['S6-33']){ const BAD=/한 각은|한 각의 크기|꼭짓점에 모이는|채울 수 없는|채울 수 있는 정다각형|360°/; G36['S6-33']=G36['S6-33'].filter(f=>{ for(let t=0;t<12;t++){ try{ const q=f(); const txt=[q.q,...(q.opts||[]),q.hint||'',q.hint1||''].join(' '); if(BAD.test(txt)) return false; }catch(e){} } return true; });
    G36['S6-33'].push(window._qFillPieces,window._qFillPieces); } }catch(e){}
}

/* ===== 3-96. 모양 조각 놓기(패턴 블록) — 4학년 '모양 채우기'를 직접 해 보기(교수님 11/24: "차라리 조작활동을") =====
   삼각형 눈금 위에 채울 모양이 있다. 조각(정삼각형·마름모·사다리꼴·정육각형)을 고르고 빈칸을 누르면 그 칸을 덮도록 조각이 놓인다.
   [돌리기]는 방금 놓은 조각의 방향을 바꾸고, 놓인 조각을 누르면 빠진다. 겹치거나 모양 밖으로 나가게는 놓이지 않는다. */
{ const S=30, Hh=S*0.866, up=(r,c)=>((r+c)%2===0), K=(r,c)=>r+'x'+c;
  const PC={tri:{n:'정삼각형',u:1,col:'#7CC47F'},rho:{n:'마름모',u:2,col:'#6FA8DC'},trap:{n:'사다리꼴',u:3,col:'#E06666'},hex:{n:'정육각형',u:6,col:'#F6C343'}};
  const pts=(r,c)=>up(r,c)?[[c*S/2,(r+1)*Hh],[(c+2)*S/2,(r+1)*Hh],[(c+1)*S/2,r*Hh]]:[[c*S/2,r*Hh],[(c+2)*S/2,r*Hh],[(c+1)*S/2,(r+1)*Hh]];
  const nb=(r,c)=>[[r,c-1],[r,c+1],up(r,c)?[r+1,c]:[r-1,c]];
  const verts=(r,c)=>pts(r,c).map(([x,y])=>Math.round(x*2/S)+'_'+Math.round(y/Hh));
  /* 채울 모양 */
  const SH={
    hex:()=>[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]],
    big3:()=>{ const o=[]; for(let k=0;k<3;k++) for(let c=2-k;c<=2+k;c++) o.push([k,c]); return o; },
    big2:()=>{ const o=[]; for(let k=0;k<2;k++) for(let c=2-k;c<=2+k;c++) o.push([k,c]); return o; },
    trap2:()=>{ const o=[]; for(let k=1;k<3;k++) for(let c=2-k;c<=2+k;c++) o.push([k,c]); return o; },
    para:()=>{ const o=[]; for(let c=1;c<=4;c++) o.push([0,c]); for(let c=0;c<=3;c++) o.push([1,c]); return o; },
    bighex:()=>{ const o=[]; const rows=[[0,2,6],[1,1,7],[2,1,7],[3,2,6]]; for(const [r,a,b] of rows) for(let c=a;c<=b;c++) o.push([r,c]); return o; } };
  /* 놓을 수 있는 자리: 칸 집합(키 목록) */
  const placements=(type,cell,inT)=>{ const [r,c]=cell, out=[], seen=new Set(), add=a=>{ if(!a.every(([x,y])=>inT(x,y))) return; const k=a.map(([x,y])=>K(x,y)).sort().join(' '); if(!seen.has(k)){ seen.add(k); out.push(a); } };
    if(type==='tri') add([[r,c]]);
    if(type==='rho') nb(r,c).forEach(n=>add([[r,c],n]));
    if(type==='trap'){ const ns=nb(r,c); for(let i=0;i<3;i++) for(let j=i+1;j<3;j++) add([[r,c],ns[i],ns[j]]); ns.forEach(n=>nb(...n).forEach(m=>{ if(!(m[0]===r&&m[1]===c)) add([[r,c],n,m]); })); }
    if(type==='hex'){ verts(r,c).forEach(v=>{ const [vx,vy]=v.split('_').map(Number); const cand=[]; for(let rr=vy-1;rr<=vy;rr++) for(let cc=vx-2;cc<=vx;cc++){ if(verts(rr,cc).includes(v)) cand.push([rr,cc]); } if(cand.length===6) add(cand); }); }
    return out; };
  /* 가장 적은 조각 수(작은 모양이라 끝까지 찾아도 빠름) */
  const solve=(cells,types)=>{ const inS=new Set(cells.map(([r,c])=>K(r,c))); let best=null; const ord=cells.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const rec=(used,list)=>{ if(best&&list.length>=best.length) return; const f=ord.find(([r,c])=>!used.has(K(r,c))); if(!f){ best=list.slice(); return; }
      for(const t of types.slice().sort((a,b)=>PC[b].u-PC[a].u)) for(const p of placements(t,f,(x,y)=>inS.has(K(x,y))&&!used.has(K(x,y)))){ p.forEach(([x,y])=>used.add(K(x,y))); list.push([t,p]); rec(used,list); list.pop(); p.forEach(([x,y])=>used.delete(K(x,y))); } };
    rec(new Set(),[]); return best; };
  M2.tiles=(cells,types,o2)=>{ const inS=new Set(cells.map(([r,c])=>K(r,c))); let cur=types[0], placed=[], last=null, saved=[], note=''; const kOf=pl=>pl.map(p=>({tri:'t',rho:'r',trap:'p',hex:'h'})[p.t]).sort().join(''); const owner=()=>{ const m={}; placed.forEach((p,i)=>p.cells.forEach(([r,c])=>m[K(r,c)]=i)); return m; };
    const minC=Math.min(...cells.map(v=>v[1])), maxC=Math.max(...cells.map(v=>v[1])), maxR=Math.max(...cells.map(v=>v[0]));
    const o={ draw(){ const ow=owner(); let g=''; cells.forEach(([r,c])=>{ const i=ow[K(r,c)]; g+=`<polygon data-ma="c${r}x${c}" points="${pts(r,c).map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${i==null?'#FFFDF6':PC[placed[i].t].col}" stroke="${i==null?'#C9B28A':PC[placed[i].t].col}" stroke-width="${i==null?1:0.6}" ${i==null?'stroke-dasharray="3 2"':''} style="cursor:pointer"/>`; });
        placed.forEach(p=>{ /* 조각 테두리: 조각 안쪽 변은 그리지 않는다 */ const own=new Set(p.cells.map(([r,c])=>K(r,c))); p.cells.forEach(([r,c])=>{ const P=pts(r,c); const edges=[[P[0],P[1]],[P[1],P[2]],[P[2],P[0]]]; const ns=nb(r,c); edges.forEach(([a,b])=>{ const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2; const inner=ns.some(([x,y])=>own.has(K(x,y))&&pts(x,y).filter(q=>Math.abs(q[0]-a[0])+Math.abs(q[1]-a[1])<0.5||Math.abs(q[0]-b[0])+Math.abs(q[1]-b[1])<0.5).length===2); if(!inner) g+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#4A2E14" stroke-width="2.2" stroke-linecap="round" pointer-events="none"/>`; }); }); });
        const vb=`${(minC*S/2-4).toFixed(0)} -4 ${((maxC-minC+2)*S/2+8).toFixed(0)} ${((maxR+1)*Hh+8).toFixed(0)}`;
        const pal=types.map(t=>{ const sel=t===cur; const mini={tri:'0,17 18,17 9,1',rho:'0,17 18,17 27,1 9,1',trap:'0,17 36,17 27,1 9,1',hex:'9,1 27,1 36,17 27,33 9,33 0,17'}[t]; return m2b('p'+t,`<svg viewBox="-2 -2 40 ${t==='hex'?38:22}" width="${t==='hex'?34:38}" style="display:block;margin:auto;box-shadow:none;background:transparent"><polygon points="${mini}" fill="${PC[t].col}" stroke="#4A2E14" stroke-width="1.5"/></svg><span style="font-size:.8rem">${PC[t].n}</span>`,'padding:4px 6px;min-width:58px;'+(sel?'border-color:#D45F16;background:#FFE9B8;box-shadow:0 0 0 2px #F2A65A':'')); }).join('');
        const left=cells.length-placed.reduce((a,p)=>a+p.cells.length,0);
        const wl=o2.ways?`<div style="display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap">${m2b('save','이 방법 담기 ✓')}<span style="font-size:.85rem;color:#8A6A4A">담은 방법: ${saved.length?saved.map(k=>k.split('').map(ch=>({t:'정삼각형',r:'마름모',p:'사다리꼴',h:'정육각형'})[ch]).reduce((a,n)=>{ a[n]=(a[n]||0)+1; return a; },{})).map(m=>Object.entries(m).map(([n,c])=>n+' '+c).join('+')).join(' / '):'아직 없어요'}${note?' — '+note:''}</span></div>`:'';
        return `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${pal}</div><svg viewBox="${vb}" style="width:100%;max-width:300px;display:block;margin:auto;box-shadow:none;background:transparent;touch-action:manipulation">${g}</svg><div style="display:flex;gap:8px;justify-content:center">${m2b('rot','돌리기 ↻')}${m2b('clr','모두 빼기')}</div><div style="font-size:.9rem;color:#8A6A4A">조각 ${placed.length}개 · 빈칸 ${left}칸</div>${wl}`; },
      on(a){ note=''; if(a==='save'){ if(placed.reduce((x,p)=>x+p.cells.length,0)<cells.length){ note='빈칸을 다 채운 다음 담아요'; return; } const k=kOf(placed); if(saved.includes(k)){ note='조각 종류와 수가 같은 방법이에요'; o._dupW=1; return; } saved.push(k); placed=[]; last=null; return; } if(a[0]==='p'){ cur=a.slice(1); return; } if(a==='clr'){ placed=[]; last=null; return; }
        if(a==='rot'){ if(!last) return; const i=placed.indexOf(last.p); if(i<0) return; placed.splice(i,1); const ow=owner(); const alts=placements(last.t,last.anchor,(x,y)=>inS.has(K(x,y))&&ow[K(x,y)]==null); if(!alts.length) return; last.idx=(last.idx+1)%alts.length; last.p={t:last.t,cells:alts[last.idx]}; placed.push(last.p); return; }
        const m=a.match(/^c(\d+)x(\d+)$/); if(!m) return; const r=+m[1], c=+m[2]; const ow=owner(); if(ow[K(r,c)]!=null){ placed.splice(ow[K(r,c)],1); last=null; return; }
        const alts=placements(cur,[r,c],(x,y)=>inS.has(K(x,y))&&ow[K(x,y)]==null); if(!alts.length){ o._miss=(o._miss||0)+1; return; } const p={t:cur,cells:alts[0]}; placed.push(p); last={t:cur,anchor:[r,c],idx:0,p}; },
      check(){ if(o2.ways) return saved.length>=o2.ways; return placed.reduce((a,p)=>a+p.cells.length,0)===cells.length&&(!o2.check||o2.check(placed)); },
      wrong(){ if(o2.ways) return o._dupW?'같은 방법을 다시 담으려 했어요':'방법이 아직 모자라요'; const cov=placed.reduce((a,p)=>a+p.cells.length,0); if(cov<cells.length) return placed.length?'빈칸이 남았어요':'아직 조각을 놓지 않았어요'; return o2.wrong?o2.wrong(placed):null; },
      reveal(){ if(o2.ways){ saved=(o2.waySols||[]).map(b=>kOf(b.map(([t,c])=>({t,cells:c})))); } const b=o2.sol||solve(cells,types); placed=(b||[]).map(([t,c])=>({t,cells:c})); last=null; },
      goal(){ return null; }, state:()=>({s:(o2.ways?saved.join('_')+'/':'')+placed.map(p=>p.t[0]).sort().join('')}) };
    const mm=m2make(o); mm._o=o; return mm; };
  window._tileSolve=solve; window._tileShapes=SH;
  const ob=w=>w+(((w.charCodeAt(w.length-1)-0xAC00)%28)?'을':'를');
  /* ① 한 가지 조각으로만 채우기 */
  window._qTileOne=()=>{ const opts=[['hex','trap'],['hex','rho'],['hex','tri'],['big3','trap'],['para','rho'],['big2','tri'],['trap2','tri']].filter(([s,t])=>solve(SH[s](),[t])); const [sk,t]=opts[rnd(0,opts.length-1)]; const cells=SH[sk](); const nm={hex:'정육각형',big3:'큰 정삼각형',big2:'정삼각형',trap2:'사다리꼴',para:'평행사변형'}[sk]; const need=cells.length/PC[t].u;
    return m2q(`${ob(nm)} ${PC[t].n} 조각으로만 겹치지 않게 빈틈없이 채워 보세요.`,`빈칸을 누르면 조각이 놓여요. 방향이 안 맞으면 [돌리기]를 눌러요. ${PC[t].n} 조각 1개는 작은 정삼각형 ${PC[t].u}칸이에요.`,M2.tiles(cells,[t],{}),`${PC[t].n} ${need}개`,{'빈칸이 남았어요':null,'아직 조각을 놓지 않았어요':null}); };
  /* ② 가장 적은 조각으로 채우기(늘품이 '조각 수를 가장 적게') */
  window._qTileMin=()=>{ const sk=['hex','big3','trap2','bighex'][rnd(0,3)]; const cells=SH[sk](); const types=['tri','rho','trap','hex']; const best=solve(cells,types); const nm={hex:'정육각형',big3:'큰 정삼각형',trap2:'사다리꼴',bighex:'큰 육각형'}[sk];
    return m2q(`모양 조각을 가장 적게 써서 ${ob(nm)} 빈틈없이 채워 보세요.`,'큰 조각을 먼저 놓으면 조각 수가 줄어요. 정육각형 1개는 사다리꼴 2개, 마름모 3개, 정삼각형 6개와 크기가 같아요.',M2.tiles(cells,types,{sol:best,check:pl=>pl.length===best.length,wrong:pl=>pl.length>best.length?'조각 수를 더 줄일 수 있어요':null}),`조각 ${best.length}개`,{'조각 수를 더 줄일 수 있어요':null,'빈칸이 남았어요':null,'아직 조각을 놓지 않았어요':null}); };
  /* ③ 세 가지 조각을 모두 써서 채우기 */
  window._qTileThree=()=>{ const sk=['big3','bighex','trap2'][rnd(0,2)]; const cells=SH[sk](); const nm={big3:'큰 정삼각형',bighex:'큰 육각형',trap2:'사다리꼴'}[sk];
    return m2q(`정삼각형, 마름모, 사다리꼴 조각을 모두 한 번 이상 써서 ${ob(nm)} 빈틈없이 채워 보세요.`,'세 가지 조각이 모두 들어가야 해요. 큰 조각부터 놓고 남는 칸을 작은 조각으로 채워 보세요.',M2.tiles(cells,['tri','rho','trap'],{check:pl=>['tri','rho','trap'].every(t=>pl.some(p=>p.t===t)),wrong:pl=>'쓰지 않은 조각이 있어요',sol:(()=>{ /* 세 가지가 다 들어가는 채우기 하나 찾기 */ const all=[]; const inS=new Set(cells.map(([r,c])=>K(r,c))); const ord=cells.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]); let found=null; const rec=(used,list)=>{ if(found) return; const f=ord.find(([r,c])=>!used.has(K(r,c))); if(!f){ if(['tri','rho','trap'].every(t=>list.some(x=>x[0]===t))) found=list.slice(); return; } for(const t of ['trap','rho','tri']) for(const p of placements(t,f,(x,y)=>inS.has(K(x,y))&&!used.has(K(x,y)))){ p.forEach(([x,y])=>used.add(K(x,y))); list.push([t,p]); rec(used,list); list.pop(); p.forEach(([x,y])=>used.delete(K(x,y))); if(found) return; } }; rec(new Set(),[]); return found; })()}),'세 가지 조각을 모두 쓴 채우기',{'쓰지 않은 조각이 있어요':null,'빈칸이 남았어요':null,'아직 조각을 놓지 않았어요':null}); };
  try{ if(G36['S6-33']){ G36['S6-33'].push(window._qTileOne,window._qTileMin,window._qTileThree); (window._NTW=window._NTW||[]).push(['S6-33',G36['S6-33'].length-1,window._qTileThree]); } }catch(e){}
  /* ④ 같은 모양을 서로 다른 방법으로 채우기(네온 11/24: 다양한 방법 찾기) */
  window._qTileWays=()=>{ const cells=SH.hex(); const ways=[['hex'],['trap'],['rho'],['tri']].map(t=>solve(cells,t)); const mix=solve(cells,['trap','tri']); const pool=[...ways,mix].filter(Boolean);
    return m2q('정육각형을 서로 다른 방법으로 3가지 채워 보세요. 하나를 다 채우면 [이 방법 담기]를 눌러요.','조각의 종류나 개수가 달라야 다른 방법이에요. 정육각형 1개, 사다리꼴 2개, 마름모 3개, 정삼각형 6개… 섞어서 채워도 돼요.',M2.tiles(cells,['tri','rho','trap','hex'],{ways:3,waySols:pool.slice(0,3)}),'예: 정육각형 1개 / 사다리꼴 2개 / 마름모 3개',{'같은 방법을 다시 담으려 했어요':null,'방법이 아직 모자라요':null}); };
  try{ if(G36['S6-33']) G36['S6-33'].push(window._qTileWays); }catch(e){}
}

/* ===== 3-97. 칠교 조각 놓기(교수님 11/24: "칠교놀이를 다른 학년에") =====
   2학년 '칠교로 만들어요'(S6-06): 칠교 조각으로 삼각형·사각형 만들기 — 교과서 활동.
   5학년 평행사변형·삼각형 넓이(S6-70·71): 늘품이 5학년 놀이 '칠교야 놀자!'([6수03-05]·[6수03-06]) — 칠교 조각으로 만든 도형을
   같은 조각으로 직사각형으로 바꾸고 모눈 칸 수로 넓이를 센다(조각을 옮겨도 넓이는 그대로).
   그림자 안을 누르면 고른 조각이 그 자리에 맞을 때만 놓인다(돌리기는 자동). 크기·모양을 잘못 고른 것을 기록한다. */
{ const U=34, PN0={L:'큰 삼각형',M:'중간 삼각형',S:'작은 삼각형',Q:'정사각형',P:'평행사변형'}, COL={L:'#E06666',M:'#F6C343',S:'#7CC47F',Q:'#6FA8DC',P:'#B48AD6'};
  const ICON={L:'0,18 36,18 18,0',M:'4,18 22,18 22,0',S:'5,18 23,18 14,9',Q:'18,1 27,10 18,19 9,10',P:'2,18 12,8 32,8 22,18'};
  M2.tang=(slots,stock,o2)=>{ const PN=o2.g2?{L:'큰 삼각형',M:'중간 삼각형',S:'작은 삼각형',Q:'사각형 가',P:'사각형 나'}:PN0; const put=slots.map(()=>false); let cur=Object.keys(stock)[0], val=0; const miss=[]; const left=t=>stock[t]-slots.filter((s,i)=>put[i]&&s.t===t).length;
    const xs=slots.flatMap(s=>s.p.map(v=>v[0])), ys=slots.flatMap(s=>s.p.map(v=>v[1])); const X0=Math.min(...xs), Y0=Math.min(...ys), X1=Math.max(...xs), Y1=Math.max(...ys); const FY=y=>Y0+Y1-y; /* 위쪽이 위로 오게(뾰족한 꼭짓점이 위) */
    const o={ draw(){ let g=''; if(o2.grid){ for(let x=X0-1;x<=X1+1;x++) g+=`<line x1="${x*U}" y1="${(Y0-1)*U}" x2="${x*U}" y2="${(Y1+1)*U}" stroke="#E6D6B8" stroke-width="1"/>`; for(let y=Y0-1;y<=Y1+1;y++) g+=`<line x1="${(X0-1)*U}" y1="${y*U}" x2="${(X1+1)*U}" y2="${y*U}" stroke="#E6D6B8" stroke-width="1"/>`; }
        slots.forEach((s,i)=>{ const P=s.p.map(([x,y])=>(x*U).toFixed(1)+','+(FY(y)*U).toFixed(1)).join(' '); g+=put[i]?`<polygon data-ma="s${i}" points="${P}" fill="${COL[s.t]}" stroke="#4A2E14" stroke-width="2" stroke-linejoin="round"/>`:`<polygon data-ma="s${i}" points="${P}" fill="#CDB58E" stroke="#CDB58E" stroke-width="1.2" stroke-linejoin="round" style="cursor:pointer"/>`; });
        const pal=Object.keys(stock).map(t=>m2b('p'+t,`<svg viewBox="-1 -1 38 21" width="40" style="display:block;margin:auto;box-shadow:none;background:transparent"><polygon points="${ICON[t]}" fill="${COL[t]}" stroke="#4A2E14" stroke-width="1.4"/></svg><span style="font-size:.72rem">${PN[t]} ${left(t)}개</span>`,'padding:3px 4px;min-width:58px;'+(t===cur?'border-color:#D45F16;background:#FFE9B8;box-shadow:0 0 0 2px #F2A65A;':'')+(left(t)<=0?'opacity:.45;':''))).join('');
        const done=put.every(Boolean), pad=o2.grid?1:0;
        const area=o2.askArea?`<div style="display:flex;align-items:center;gap:6px;justify-content:center;flex-wrap:wrap"><span>넓이: 모눈</span>${m2b('vm','−')}<b style="font-size:1.3rem;min-width:34px;text-align:center">${val}</b>${m2b('vp','+')}<span>칸</span></div>`:'';
        const src=o2.src?`<div style="font-size:.85rem">처음 모양: ${o2.srcName}</div><svg viewBox="${o2.srcBox}" style="width:46%;max-width:150px;display:block;margin:auto;box-shadow:none;background:transparent">${o2.src.map(s=>`<polygon points="${s.p.map(([x,y])=>(x*U).toFixed(1)+','+((o2.srcH||2)-y)*U).join(' ')}" fill="${COL[s.t]}" stroke="#4A2E14" stroke-width="2" stroke-linejoin="round"/>`).join('')}</svg><div style="font-size:.85rem">같은 조각으로 만들 모양 ↓</div>`:'';
        return `${src}<div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center">${pal}</div><svg viewBox="${((X0-pad)*U-4).toFixed(0)} ${((Y0-pad)*U-4).toFixed(0)} ${((X1-X0+2*pad)*U+8).toFixed(0)} ${((Y1-Y0+2*pad)*U+8).toFixed(0)}" style="width:100%;max-width:${Math.min(280,(X1-X0+2*pad)*U+8)}px;display:block;margin:auto;box-shadow:none;background:transparent">${g}</svg><div style="font-size:.88rem;color:#8A6A4A;min-height:1.3em">${o._note||(done?'다 채웠어요!':'조각을 고르고, 그림자 안을 눌러 놓아요. 놓은 조각을 누르면 빠져요.')}</div>${area}`; },
      on(a){ o._note=''; if(a==='vp'&&val<60){ val++; return; } if(a==='vm'&&val>0){ val--; return; } if(a[0]==='p'){ cur=a.slice(1); return; }
        const m=a.match(/^s(\d+)$/); if(!m) return; const i=+m[1]; if(put[i]){ put[i]=false; return; }
        if(!cur||left(cur)<=0){ o._note='그 조각은 다 썼어요. 다른 조각을 골라요.'; return; }
        if(slots[i].t!==cur){ miss.push(cur+slots[i].t); o._note=`${PN[cur]}${'MPQ'.includes(cur)?'은':'은'} 그 자리에 맞지 않아요.`; return; }
        put[i]=true; if(left(cur)<=0){ const nx=Object.keys(stock).find(k=>left(k)>0); if(nx) cur=nx; } },
      check(){ return put.every(Boolean)&&(!o2.askArea||val===o2.askArea); },
      wrong(){ if(!put.every(Boolean)){ if(miss.some(x=>/^[LMS][LMS]$/.test(x))) return '크기가 다른 삼각형을 헷갈렸어요'; if(miss.some(x=>x==='QP'||x==='PQ')) return o2.g2?'모양이 다른 사각형을 헷갈렸어요':'정사각형과 평행사변형을 헷갈렸어요'; return '빈 곳이 남았어요'; }
        if(o2.askArea&&val!==o2.askArea) return o2.perim&&val===o2.perim?'넓이 대신 둘레를 셌어요':'칸 수를 잘못 셌어요'; return null; },
      reveal(){ put.fill(true); if(o2.askArea) val=o2.askArea; },
      goal(){ return null; }, state:()=>({s:put.map(b=>b?1:0).join('')+(o2.askArea?'v'+val:'')}) };
    const mm=m2make(o); mm._o=o; return mm; };
  const T=(t,...p)=>({t,p});
  const SET={L:2,M:1,S:2,Q:1,P:1};
  const ob=w=>w+(((w.charCodeAt(w.length-1)-0xAC00)%28)?'을':'를');
  /* 2학년: 칠교 한 벌(7조각)에서 알맞은 조각을 골라 삼각형·사각형 만들기 */
  const G2=[
    ['삼각형',[T('M',[2,0],[4,0],[2,2]),T('S',[0,0],[2,0],[1,1]),T('S',[1,1],[2,0],[2,2])]],
    ['삼각형',[T('Q',[2,0],[3,1],[2,2],[1,1]),T('S',[0,0],[2,0],[1,1]),T('S',[2,0],[4,0],[3,1])]],
    ['사각형',[T('M',[0,0],[2,0],[0,2]),T('S',[2,0],[2,2],[1,1]),T('S',[0,2],[1,1],[2,2])]],
    ['사각형',[T('P',[0,1],[1,0],[3,0],[2,1]),T('S',[2,1],[3,0],[4,1])]],
    ['삼각형',[T('L',[0,0],[4,0],[2,2]),T('L',[2,2],[4,0],[4,4])]] ];
  window._qTang2=()=>{ const [nm,sl]=G2[rnd(0,G2.length-1)];
    return m2q(`칠교 조각 ${sl.length}개로 ${ob(nm)} 만들어요. 알맞은 조각을 골라 그림자를 채워 보세요.`,'어떤 조각이 들어갈지 크기와 모양을 비교해 보세요. 크기가 다른 삼각형이 세 가지 있어요.',M2.tang(sl,SET,{g2:1}),`그림자에 맞는 조각 ${sl.length}개`,{'크기가 다른 삼각형을 헷갈렸어요':null,'모양이 다른 사각형을 헷갈렸어요':null,'빈 곳이 남았어요':null}); };
  /* 5학년: 평행사변형·삼각형(칠교 조각) → 같은 조각으로 직사각형 → 모눈 칸 수 */
  const RECT=[T('M',[0,0],[2,0],[0,2]),T('S',[2,0],[2,2],[1,1]),T('S',[0,2],[1,1],[2,2])];
  const SRC={ para:{n:'평행사변형',s:[T('M',[0,0],[2,0],[2,2]),T('S',[2,0],[3,1],[2,2]),T('S',[3,1],[4,2],[2,2])],box:`-6 -6 ${4*U+12} ${2*U+12}`},
              tri:{n:'삼각형',s:[T('M',[2,0],[4,0],[2,2]),T('S',[0,0],[2,0],[1,1]),T('S',[1,1],[2,0],[2,2])],box:`-6 -6 ${4*U+12} ${2*U+12}`} };
  const q5=k=>()=>{ const S=SRC[k];
    return m2q(`칠교 조각으로 만든 ${S.n}이에요. 같은 조각으로 직사각형을 만들고, 넓이가 모눈 몇 칸인지 세어 보세요.`,`조각을 옮겨 붙여도 넓이는 그대로예요. 직사각형의 넓이는 (가로) × (세로)로 셀 수 있어요. 그래서 처음 ${S.n}의 넓이도 같아요.`,M2.tang(RECT,{M:1,S:2},{grid:1,askArea:4,perim:8,src:S.s,srcName:S.n,srcBox:S.box}),'모눈 4칸',{'넓이 대신 둘레를 셌어요':'G5-01','칸 수를 잘못 셌어요':null,'크기가 다른 삼각형을 헷갈렸어요':null,'빈 곳이 남았어요':null}); };
  window._qTang5p=q5('para'); window._qTang5t=q5('tri');
  try{ if(G36['S6-06']) G36['S6-06'].push(window._qTang2,window._qTang2); if(G36['S6-70']) G36['S6-70'].push(window._qTang5p); if(G36['S6-71']) G36['S6-71'].push(window._qTang5t); (window._NTW=window._NTW||[]).push(['S6-06',0,window._qTang2]); }catch(e){}
}

/* ===== 3-98. 계열성 맞추기(교수님 11/24: "모든 문제가 단원·성취기준과 맞는지, 계열성") =====
   단원 지도(UNITS36)에서 개념이 처음 나오는 단원보다 앞선 편에, 아직 안 배운 용어·표기가 보기·발문에 들어가지 않게 편별로 바로잡는다.
   - dropQ: 이런 발문이 나오면 그 틀을 다시 만든다(최대 12번)  - mapOpt/mapText: 글자 바꾸기  - dropOpt: 보기에서 빼기(3개 미만이면 채움) */
setTimeout(()=>{ try{
  const R={
    'S3-21':{dropOpt:/^\d*\.\d\d/,fill:['50','10','0.1','1']},
    'S3-22':{dropOpt:/^\d*\.\d\d/},
    'S3-17':{mapText:[[/정삼각형/g,'삼각형']]},
    'S6-18':{mapOpt:{'둔각':'선분','예각':'반직선'},mapText:[[/그림의 (사다리꼴|평행사변형|마름모)에서/g,'그림의 사각형에서']]},
    'S6-19':{mapOpt:{'마름모':'직각삼각형','사다리꼴':'원','예각삼각형':'사각형','정삼각형':'원'}},
    'S6-26':{mapOpt:{'둘레':'원의 중심'}},
    'S6-32':{dropQ:/둘레/},
    'S6-50':{dropQ:/이등변|정삼각형/},
    'S4-13':{mapOpt:{'원그래프':'막대그래프','띠그래프':'그림그래프'}},
    /* 2차 점검(단원 지도 전체를 편별 발문으로 대조) */
    'S2-13':{dropQ:/식을 하나로|하나의 식/},   /* 여러 연산을 한 식으로 = 5-1 혼합 계산 */
    'S2-16':{dropQ:/식을 하나로|하나의 식/},
    'S6-27':{mapText:[[/밑면의 반지름/g,'바닥 원의 반지름']]},   /* '밑면'은 5·6학년 용어 */
    'S6-20':{mapText:[[/^평행사변형에서 평행한 변/,'직사각형에서 평행한 변']]},   /* 평행사변형은 같은 단원 뒤 차시 */
    'S6-05':{dropQ:/칠각형|팔각형/},   /* 2학년은 육각형까지 */
    'S5-20':{dropQ:/함께 하면 며칠/},   /* 반비례 = 중학교 */
    'S4-20':{dropQ:/중심각|몇 도|인 부분은\?$/},   /* 원그래프 중심각 = 중학교 */
    'S5-07':{dropQ:/□번째/},   /* □를 쓴 대응 식 = 5-1 규칙과 대응 */
    /* 네온 2차 검토: '꼭지각·밑각'은 교과서에 없는 용어(중학교), 가능성은 0·1/2·1 밖의 분수를 보기로도 쓰지 않음 */
    'S6-28':{mapText:[[/이등변삼각형의 꼭지각이 (\d+)°(이)?면 한 밑각은\?/g,'이등변삼각형에서 크기가 같은 두 각이 아닌 나머지 한 각이 $1°이면, 크기가 같은 두 각 중 한 각은 몇 도일까요?'],[/꼭지각이 (\d+)°인 이등변삼각형의 한 밑각은 몇 도일까요\?/g,'이등변삼각형에서 크기가 같은 두 각이 아닌 나머지 한 각이 $1°예요. 크기가 같은 두 각 중 한 각은 몇 도일까요?'],[/밑각/g,'크기가 같은 각'],[/꼭지각/g,'나머지 한 각']]},
    'S4-18':{dropOpt:/^(?!2분의 1$)\d+분의 \d+$/,fill:['0','1','2분의 1']},
    'S4-17':{dropOpt:/^(?!2분의 1$)\d+분의 \d+$/},
  };
  const mapS=(s,m)=>{ if(typeof s!=='string') return s; for(const [a,b] of m) s=s.replace(a,b); return s; };
  for(const ep of Object.keys(R)){ if(!G36[ep]) continue; const r=R[ep];
    const orig=G36[ep].slice();
    G36[ep]=G36[ep].map((f,fi)=>{ const g=function(){ let q; for(let t=0;t<12;t++){ q=f.apply(this,arguments); if(!q||!r.dropQ||!r.dropQ.test(String(q.q||''))) break; }
        if(q&&r.dropQ&&r.dropQ.test(String(q.q||''))){ /* 이 틀은 늘 그 발문 → 같은 편의 다른 틀로 */ const others=orig.filter((x,xi)=>xi!==fi); for(let t=0;t<20&&others.length;t++){ q=others[rnd(0,others.length-1)](); if(q&&!r.dropQ.test(String(q.q||''))) break; } }
        if(!q) return q;
        if(r.mapText){ q.q=mapS(q.q,r.mapText); for(const k of ['hint','hint1','speech']) if(typeof q[k]==='string') q[k]=mapS(q[k],r.mapText); }
        if(Array.isArray(q.opts)&&q.opts.length>=2&&!q.manip){
          if(r.mapOpt){ const mo=o=>typeof o==='string'&&r.mapOpt[o]!=null&&String(q.ans)!==o?r.mapOpt[o]:o; const nm={}; q.opts=q.opts.map(o=>{ const n=mo(o); if(q.mis&&o in q.mis) nm[n]=q.mis[o]; return n; }); if(q.mis){ for(const k of Object.keys(q.mis)) if(!(k in nm)&&q.opts.includes(k)) nm[k]=q.mis[k]; q.mis=nm; } q.opts=[...new Set(q.opts)]; }
          if(r.dropOpt){ q.opts=q.opts.filter(o=>String(o)===String(q.ans)||!r.dropOpt.test(String(o))); if(q.mis) for(const k of Object.keys(q.mis)) if(!q.opts.map(String).includes(k)) delete q.mis[k]; (r.fill||[]).forEach(x=>{ if(q.opts.length<3&&!q.opts.includes(x)&&x!==String(q.ans)) q.opts.push(x); }); }
        }
        return q; }; g._seq=1; return g; });
  } }catch(e){} },0);
