
/* ===== 교사가 옆에 없어도: 비계 사다리 · 보호자용 한 장 (core2.js 안쪽에 들어감, 로드맵 27번) ===== */
/* ===== 비계 사다리 (로드맵 1단계-③) =====
   교사가 옆에서 하는 일: 같은 실수를 두 번 하면 멈추고 같이 짚어 본 뒤, 비슷한 문제를 하나 더 내서 고쳐졌는지 본다.
   - ladder: 한 세트 안에서 같은 개념 조각을 가리키는 오답이 두 번(첫 시도 기준) → 그 조각의 카드 + 같은 꼴 문제 하나
   - stuck: 첫 시도 오답이 세 번 이어짐 → 가장 최근 오답 조각의 카드(+ 같은 꼴 문제). 카드가 없으면 끼워 넣지 않는다.
   한 세트에 사다리는 두 번까지, 같은 조각은 한 번만. 세트 점수에는 영향을 주지 않는다(카드는 점수 칸이 없고, 덧붙인 문제는 맞히면 별이 늘 뿐). */
function sameFormQ(q,code){ for(let t=0;t<8;t++){ let n=null;
    try{ if(q._e!=null&&typeof gen1==='function') n=gen1(q._e,q._ei,(Math.random()*1e9)|0); else if(q._ep&&G36[q._ep]){ n=G36[q._ep][q._ti!=null?q._ti:q._ei](); if(n){ n._ep=q._ep; n._ti=q._ti; } } }catch(e){ n=null; }
    if(!n||n.manip||n.onMount) continue; if(String(n.q)===String(q.q)&&String(n.ans)===String(q.ans)) continue; if(code&&n.mis&&!Object.values(n.mis).includes(code)&&t<5) continue; n._scaf=1; return n; }
  /* 같은 꼴이 늘 같은 문제를 내면 같은 편의 다른 꼴에서 고른다 */
  try{ const ep=q._ep, F=ep&&G36[ep]; if(F) for(const i of shuffle(F.map((_,k)=>k))){ if(i===(q._ti!=null?q._ti:q._ei)) continue; const n=F[i](); if(!n||n.manip||n.onMount||n.write!==q.write) continue; if(code&&!(n.mis&&Object.values(n.mis).includes(code))) continue; n._ep=ep; n._ti=i; n._scaf=1; return n; } }catch(e){}
  return null; }
function ladderAfter(q,ok,m){ if(!S||!S.acts||S.diag||q.diag||q._probe||q._scaf||q._chk) return; if(S._ld==null){ S._ld={n:0,pc:{},run:0,done:{}}; }
  const L=S._ld; if(q._firstSeen) return; q._firstSeen=1;
  if(ok){ L.run=0; return; } L.run++;
  const c=m&&typeof MISC!=='undefined'&&MISC[m]?MISC[m][0][0]:null; if(c){ L.pc[c]=(L.pc[c]||0)+1; L.last=c; }
  if(L.n>=2) return; let why=null, pc=null;
  if(c&&L.pc[c]>=2&&!L.done[c]&&KCARDS[c]){ why='ladder'; pc=c; }
  else if(L.run>=3&&L.last&&!L.done[L.last]&&KCARDS[L.last]){ why='stuck'; pc=L.last; }
  if(!pc) return; L.n++; L.done[pc]=1; L.run=0;
  const add=[{kind:'card',c:pc,why}], sib=sameFormQ(q,m); if(sib) add.push({kind:'q',q:sib});
  S.acts.splice(S.i+1,0,...add); }
{ const _ar=afterRec; afterRec=function(q,given,ok,m){ _ar(q,given,ok,m); try{ ladderAfter(q,ok,m); }catch(e){} }; }
{ const _rx=recExtra; recExtra=function(q){ const r=_rx(q); try{ if(q._scaf) r[1]='s'; }catch(e){} return r; }; }

/* ===== 보호자에게 보여 줄 한 장 (로드맵 2단계-⑤) =====
   교사 용어 없이: 이번 주에 한 것 / 잘하는 것 / 아직 어려운 것 / 집에서 해 볼 것 한 가지. 통계 화면의 '보호자용 보기'와 선생님용 화면 맨 위에서 연다. */
const HOME={
 C01:'과자나 블록 10개를 두 손에 나누어 쥐고 "한 손에 7개면 다른 손에는?" 하고 번갈아 물어봐 주세요.',
 C02:'"사탕 3개와 4개는 사탕 5개와 몇 개랑 같을까?"처럼 = 양쪽이 같아지는 놀이를 해 주세요.',
 C03:'동전(10원·1원)이나 빨대 10개 묶음으로 37, 52 같은 수를 만들어 보게 해 주세요.',
 C04:'27 + 8처럼 일의 자리끼리 10이 넘는 덧셈을 동전으로 해 보고, 1원 10개를 10원 1개로 바꾸게 해 주세요.',
 C05:'42 − 7을 동전으로: 1원이 모자라면 10원 하나를 1원 10개로 바꾸는 장면을 직접 해 보게 해 주세요.',
 C06:'뺄셈을 하고 나면 "답에 뺀 수를 더하면 처음 수가 되는지" 꼭 확인하는 습관을 함께 들여 주세요.',
 C07:'간식을 "3개씩 4접시"로 놓고 모두 몇 개인지, 3 + 3 + 3 + 3과 3 × 4가 같은지 확인해 보세요.',
 C08:'과자 12개를 3명에게 똑같이 나누기, 12개를 3개씩 덜어 내기를 둘 다 해 보게 해 주세요.',
 C09:'23 × 4를 20 × 4와 3 × 4로 나누어 계산하고 더하는 말을 소리 내어 하게 해 주세요.',
 C10:'나눗셈을 할 때 "이 자리는 나눌 수 있나?"를 매번 소리 내어 묻게 해 주세요. 못 나누면 몫에 0을 써요.',
 C11:'나머지가 있는 나눗셈은 "나머지가 나누는 수보다 작은지"를 꼭 확인하게 해 주세요.',
 C12:'피자나 종이를 똑같이 접어 나누고, 그중 몇 조각인지 분수로 말하게 해 주세요. "똑같이"가 핵심이에요.',
 C13:'귤 12개 중 3분의 1은 몇 개인지, 먼저 3묶음으로 나누어 보게 해 주세요.',
 C14:'종이띠를 2, 3, 4칸으로 똑같이 접어 2분의 1, 3분의 1, 4분의 1의 크기를 대어 보게 해 주세요.',
 C15:'"7분의 9는 1과 몇 분의 몇?"처럼 1이 몇 개 들어 있는지 종이띠로 확인해 보게 해 주세요.',
 C16:'자의 mm 눈금으로 0.1 cm, 1.3 cm를 찾아보고, 0.9와 0.10 가운데 무엇이 더 큰지 이야기해 보세요.',
 C17:'1 m = 100 cm, 1 cm = 10 mm처럼 단위를 바꿀 때 0이 몇 개 붙는지 함께 확인해 주세요.',
 C18:'신문이나 광고의 큰 수를 뒤에서부터 네 자리씩 끊어 만, 억으로 읽어 보게 해 주세요.',
 C19:'분모가 같은 분수끼리 더할 때 분모는 그대로 두고 분자만 더한다는 것을 종이띠로 보여 주세요.',
 C20:'2.4 + 1.35처럼 자릿수가 다른 소수는 소수점을 세로로 맞춰 쓰게 해 주세요.',
 C21:'혼합 계산은 계산하기 전에 순서를 먼저 번호로 적게 해 주세요(괄호 → ×, ÷ → +, −).',
 C22:'12와 18을 둘 다 나누어떨어지게 하는 수를 함께 찾아보며 공약수를 이야기해 보세요.',
 C23:'피자를 2조각 중 1조각과 4조각 중 2조각으로 잘라 크기가 같은지 비교해 보세요.',
 C24:'"10세 이상", "만 7세 미만"처럼 생활 속 안내문에서 경계의 수가 들어가는지 함께 따져 보세요.',
 C25:'물건 값을 어림할 때 올림·버림·반올림 가운데 무엇이 알맞은지 장보기 상황에서 이야기해 보세요.',
 C26:'"6의 3분의 2는?"처럼 분수만큼을 구할 때 먼저 3묶음으로 나누는 그림을 그리게 해 주세요.',
 C27:'0.3 × 0.2의 답을 어림으로 먼저 말해 보게 하고(1보다 훨씬 작다), 소수점 자리를 확인해 주세요.',
 C28:'1보다 작은 수를 곱하면 작아지고, 1보다 작은 수로 나누면 커진다는 것을 예로 함께 확인해 보세요.',
 C29:'"6 안에 4분의 3이 몇 번 들어갈까?"처럼 나눗셈을 덜어 내기로 말해 보게 해 주세요.',
 C30:'2.4 ÷ 0.6은 24 ÷ 6과 몫이 같다는 것(둘 다 10배)을 함께 확인해 주세요.'};
const HOME_AREA={G:'집 안 물건의 길이·들이·무게를 어림하고 재어 보는 놀이가 도형과 측정에 가장 좋아요.',R:'수가 늘어나는 규칙(계단, 달력)을 찾아 말로 설명하게 해 주세요.',D:'가족의 좋아하는 음식 등을 조사해 표나 그래프로 정리해 보게 해 주세요.'};
function parentPage(){ if(typeof S!=='undefined'&&S) S.idle=true; try{ hush(); }catch(e){} app.className='wrap';
  const st=state(), stats=loadStats(), R=report(); const days=[]; for(let k=0;k<7;k++){ const d=new Date(Date.now()-k*864e5); days.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`); }
  const w=days.map(k=>stats.days[k]).filter(Boolean), n=w.reduce((a,x)=>a+x.n,0), ok=w.reduce((a,x)=>a+x.ok,0), pct=n?Math.round(ok/n*100):0;
  const good=[]; try{ Object.keys(LADDER).forEach(s=>LADDER[s].forEach(k=>{ if(kcStatus(k,st)==='숙달') good.push(KCN[k]); })); }catch(e){}
  const weak=(()=>{ try{ return weakPieces(st); }catch(e){ return []; } })().slice(0,2);
  const mis=R.mis.filter(x=>x.s==='확인').slice(0,2);
  const tip=weak.length?(HOME[weak[0].c]||HOME_AREA[weak[0].c[0]]||''):'';
  const kc=(()=>{ try{ return JSON.parse(localStorage.getItem(KCK)||'[]').filter(r=>r.t>Date.now()-7*864e5).length; }catch(e){ return 0; } })();
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">보호자용</div><span style="width:70px"></span></div>
   <div class="stage" style="text-align:left">
    <h2 class="sec">이번 주에 한 것</h2>
    <p class="kc-say">${n?`최근 7일 동안 <b>${w.length}일</b> 공부했고, 문제를 <b>${n}개</b> 풀어 <b>${pct}%</b>를 맞혔어요.${kc?` 어려운 곳에서 개념 카드를 ${kc}번 함께 봤어요.`:''}`:'최근 7일 동안 푼 문제가 없어요. 하루 5분, 가볍게 풀기부터 시작해 보세요.'}</p>
    <h2 class="sec">잘하고 있는 것</h2>
    <p class="kc-say">${good.length?good.slice(-4).map(esc).join(', ')+'.':'아직 충분히 풀지 않아 판단하기 일러요. 몇 번 더 풀면 보여 드릴게요.'}</p>
    <h2 class="sec">아직 어려운 것</h2>
    <div class="kc-say">${weak.length?weak.map(x=>`<div style="margin:4px 0"><b>${esc(x.name)}</b> <span style="color:var(--ink-soft);font-size:.95rem">(${x.when.replace('-','학년 ')}학기에 처음 배우는 내용)</span></div>`).join(''):'지금은 따로 짚어 드릴 부분이 없어요.'}
     ${mis.map(x=>`<div style="margin:6px 0;font-size:1rem">자주 하는 실수: ${esc(MIS[x.c][1])}</div>`).join('')}</div>
    <h2 class="sec">집에서 해 볼 것 한 가지</h2>
    <p class="kc-say">${tip?esc(tip):'오늘 푼 문제 가운데 하나를 아이가 어른에게 설명해 보게 해 주세요. 설명할 수 있으면 아는 것이에요.'}</p>
    <p class="kt-ex">이 기기에 쌓인 기록으로만 만든 내용이에요. 정답 비율보다 꾸준히 푸는 날 수가 더 중요해요.</p>
    <div class="btns" style="margin-top:12px"><button class="ghost" id="pp-teacher">선생님용 자세히 보기</button></div>
   </div>`;
  document.getElementById('back').onclick=home; document.getElementById('pp-teacher').onclick=teacherPage; }
{ const _sp=statsPage; statsPage=function(){ const r=_sp.apply(this,arguments);
  try{ const st=document.querySelector('#app .stage'); if(st&&!document.getElementById('kt-parent')){ st.insertAdjacentHTML('beforeend',`<div class="btns" style="margin-top:8px"><button class="ghost" id="kt-parent">보호자용 보기</button></div>`); document.getElementById('kt-parent').onclick=parentPage; } }catch(e){}
  return r; }; }
{ const _tp=teacherPage; teacherPage=function(){ const r=_tp.apply(this,arguments);
  try{ const st=document.querySelector('#app .stage'); if(st) st.insertAdjacentHTML('afterbegin',`<div class="btns" style="margin:0 0 10px"><button class="ghost" id="kt-parent2">보호자에게 보여 줄 한 장</button></div>`); document.getElementById('kt-parent2').onclick=parentPage; }catch(e){}
  return r; }; }


/* 받침에 따라 '이라고/라고' */
function jRago(g){ const ch=String(g).trim().slice(-1); if(/[0-9]/.test(ch)) return [0,1,3,6,7,8].includes(+ch)?'이라고':'라고'; const c=ch.charCodeAt(0); if(c>=0xAC00&&c<=0xD7A3) return (c-0xAC00)%28?'이라고':'라고'; return '라고'; }
/* ===== 아이가 낸 답으로 말하기 (로드맵 1단계-②) =====
   '틀린 이유 보기'를 켰을 때 나오는 한마디 앞에 아이가 낸 답을 붙인다: "885라고 했구나. 받아올림한 1을 더해요…" */
{ const _ar2=afterRec; afterRec=function(q,given,ok,m){ _ar2(q,given,ok,m); try{ if(!ok&&q._tip&&q.hint1===q._tip){ const g=clean(given); if(g&&g.length<=14&&!/^m:|^ok:/.test(g)){ q.hint1=`<b>${esc(g)}</b>${jRago(g)} 했구나. ${q._tip}`; q._tip=q.hint1; } } }catch(e){} }; }

/* ===== 막힘 감지 (로드맵 2단계-⑥) =====
   한 문제 앞에서 오래 멈춰 있으면(1~2학년 40초, 3~6학년 70초) '같이 알아볼까?' 단추를 띄운다. 누르면 그 문제 오답들이 가리키는 개념 카드를 먼저 보고 같은 문제로 돌아온다.
   도움을 받은 뒤의 답은 지식추적에 넣지 않는다(q._kt). */
let _stuckT=null;
function stuckArm(q){ clearTimeout(_stuckT); if(!q||!S||!S.acts||S.diag||q.diag||q._probe||q._kt||q._helped) return; const codes=Object.values(q.mis||{}).filter(m=>MISC[m]); const c=codes.map(m=>MISC[m][0][0]).find(c=>KCARDS[c]); if(!c) return;
  const at=S.i, wait=(q._e!=null||((UNITS36[S.ui]||{}).grade||3)<3)?40000:70000;
  _stuckT=setTimeout(()=>{ try{ if(!S||S.i!==at||S.acts[S.i].q!==q||S.tries>0||document.querySelector('#fb .fb')) return; const fb=document.getElementById('fb'); if(!fb||document.getElementById('kt-stuck')) return;
    fb.insertAdjacentHTML('afterbegin',`<button class="ghost" id="kt-stuck" style="width:100%;margin:6px 0">💡 어려우면 같이 알아볼까?</button>`);
    document.getElementById('kt-stuck').onclick=()=>{ q._helped=1; q._kt=1; S.acts.splice(S.i,0,{kind:'card',c,why:'stuck'}); runAct(); }; }catch(e){} },wait); }
{ const _qq=question; question=function(q){ const r=_qq.apply(this,arguments); try{ stuckArm(q); }catch(e){} return r; }; }

/* ===== 자신 있었는지 묻기 (로드맵 2단계-⑧ 대신) =====
   교사는 아이가 '찍어서 맞혔는지'를 표정으로 안다. 앱은 물어본다: 오개념 보기가 있는 객관식을 처음에 맞혔을 때, 세트에 두 번까지, 네 번에 한 번꼴로
   '확실해요 / 헷갈렸어요 / 찍었어요'. 찍었다고 하면 같은 꼴 문제를 세트 끝에 한 번 더 내서 확인한다. 기록은 기기 안 dotori-kt-conf. */
const CFK='dotori-kt-conf';
{ const _an=answer; answer=function(btn,q){ const first=S&&S.tries===0; const r=_an.apply(this,arguments);
  try{ if(!first||!q||q._scaf||q.diag||q._probe||!S||!S.acts||S.diag||!q.opts||q.opts.length<3||!q.mis||!Object.keys(q.mis).length) return r;
    const v=btn&&btn.dataset?btn.dataset.v:null; if(String(v)!==String(q.ans)) return r; S._cf=S._cf||0; if(S._cf>=2||Math.random()>0.25) return r; S._cf++;
    const m=document.querySelector('#fb .msg'); if(!m) return r; const Q=(S.acts[S.i]&&S.acts[S.i].q)||q;
    m.insertAdjacentHTML('beforeend',`<div class="kt-conf" style="margin-top:10px;font-size:1rem">자신 있었어? <span style="display:inline-flex;gap:6px;flex-wrap:wrap;margin-top:6px">${['확실해요','헷갈렸어요','찍었어요'].map(x=>`<button class="ghost" data-c="${x}" style="padding:6px 10px;font-size:.95rem">${x}</button>`).join('')}</span></div>`);
    m.querySelectorAll('.kt-conf button').forEach(b=>b.onclick=()=>{ const c=b.dataset.c; m.querySelector('.kt-conf').innerHTML=c==='찍었어요'?'솔직하게 말해 줘서 고마워! 비슷한 문제를 하나 더 풀어 보자.':c==='헷갈렸어요'?'헷갈려도 맞혔네! 비슷한 문제를 한 번 더 볼게.':'좋아요!';
      try{ const L=JSON.parse(localStorage.getItem(CFK)||'[]'); L.push({t:Date.now(),ep:Q._ep||Q._e,c}); localStorage.setItem(CFK,JSON.stringify(L.slice(-300))); }catch(e){}
      if(c!=='확실해요'){ const sib=sameFormQ(Q._ep?Q:q,null); if(sib){ sib._conf=1; S.acts.push({kind:'q',q:sib}); } } }); }catch(e){}
  return r; }; }

try{ window._sameFormQ=sameFormQ; window._jRago=jRago; window._parentPage=parentPage; window._ladderAfter=ladderAfter; window._MISC=MISC; }catch(e){}

/* 입체도형 그림 발판: 그림으로 2번 맞히면 글로만, 글로만 틀리면 다시 그림 (tags3 3-49) */
{ const _ar3=afterRec; afterRec=function(q,given,ok,m){ _ar3(q,given,ok,m); try{ window._svFade&&window._svFade(q,ok); }catch(e){} }; }

/* 도전 문장제 통계(임시 난이도 → 나중에 정답률로 가림) */
{ const _ar4=afterRec; afterRec=function(q,given,ok,m){ _ar4(q,given,ok,m); try{ window._hqRec&&window._hqRec(q,ok); }catch(e){} }; }

/* 둘 중 고르기는 한 문제로 판단하지 않는다 (교수님 11/22): 찍어도 반은 맞으므로, 같은 꼴 문제를 수만 바꿔 한 번 더 낸다. 두 번의 결과가 엇갈리면 한 번 더(모두 3문제까지).
   같은 꼴이 늘 같은 문제만 내면 같은 편의 다른 둘 중 고르기에서 고른다. 각 문제는 따로 기록되어 지식추적에 그대로 쌓인다. */
function pairMore(q){ const ep=q._ep||(typeof S!=='undefined'&&S&&S.ep)||null, F=ep&&typeof G36!=='undefined'&&G36[ep]; if(!F) return null; const two=n=>n&&!n.manip&&!n.onMount&&Array.isArray(n.opts)&&n.opts.length===2, same=n=>String(n.q)===String(q.q)&&String(n.ans)===String(q.ans), seenQ=(q._pairSeenQ||[]).concat(String(q.q)+'|'+String(q.ans));
  const fresh=n=>two(n)&&!seenQ.includes(String(n.q)+'|'+String(n.ans));
  if(q._ti!=null&&q._ti>=0&&F[q._ti]) for(let t=0;t<10;t++){ let n=null; try{ n=F[q._ti](); }catch(e){} if(fresh(n)){ n._pairSeenQ=seenQ; n._ep=ep; n._ti=q._ti; return n; } }
  for(const i of shuffle(F.map((_,k)=>k))){ if(i===q._ti) continue; for(let t=0;t<4;t++){ let n=null; try{ n=F[i](); }catch(e){} if(fresh(n)){ n._pairSeenQ=seenQ; n._ep=ep; n._ti=i; return n; } } } return null; }
function pairAfter(q,ok){ if(!S||!S.acts||S.diag||S.diagRun||!q||q.diag||q._probe||q._chk||q._follow||q._scaf||q.manip||q.onMount||!Array.isArray(q.opts)||q.opts.length!==2||q._pairDone) return; q._pairDone=1;
  const hist=(q._pairHist||[]).concat(ok?1:0); if(hist.length>=3) return; if(hist.length===2&&hist[0]===hist[1]) return;
  const n=pairMore(q); if(!n) return; n._pairHist=hist; n._pair=hist.length+1; S.acts.splice(S.i+1,0,{kind:'q',q:n}); }
{ const _ar5=afterRec; afterRec=function(q,given,ok,m){ _ar5(q,given,ok,m); try{ pairAfter(q,ok); }catch(e){} }; }
try{ window._pairMore=pairMore; }catch(e){}
