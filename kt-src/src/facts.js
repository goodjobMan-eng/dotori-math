
/* ---------- 10-1. 1~2학년(영상편): 시드 고정 · 보기에 오개념 넣기 · 단순 지식 되풀이 ---------- */
// 세 갈래로 다룬다. 단순 지식(숫자, 덧셈·뺄셈·곱셈 낱개)은 틀린 것을 간격을 두고 똑같이 다시 낸다.
// 개념은 지식요소별 숙달로, 오개념은 오답 코드로 본다(위 7~9번).
Object.assign(MIS, {
'N1-05':['등호를 "답을 쓰는 자리"로 이해','등호는 양쪽이 같다는 뜻이에요. 왼쪽과 오른쪽을 똑같게 만들어요.'],
'N2-05':['곱셈을 덧셈과 혼동','□ × △는 □를 △번 더한 것이에요.'],
'N2-06':['0과 1의 곱을 덧셈처럼 처리','어떤 수에 0을 곱하면 0, 1을 곱하면 그 수 그대로예요.'],
});
const FK='dotori-kt-facts', RAW1={}, WRAP1=new Map();
const INT=[0, 10*60e3, 864e5, 3*864e5];                       // 상자 0→1→2→3: 바로, 10분 뒤, 다음 날, 3일 뒤. 그다음은 '익힘'
const epLabel=e=>'EP'+String(e).padStart(2,'0');

// 문제에서 식을 읽어 낸다. 예: "2 + 4 = ?" → 2+4, "3 = 2 + □" → 3=2+□, "2의 3배는?"(그림 2 × 3 =) → 2×3
function exprOf(q){ const s=plain(q.q).replace(/​/g,''), v=plain(q.visual); let m;
  if(/\d/.test(s)&&/[+−\-×÷□]/.test(s)&&!/[가-힣]{2,}/.test(s)) return s.replace(/\s+/g,'').replace(/-/g,'−').replace(/=?\?$/,'').replace(/=$/,'');
  if((m=(s+' '+v).match(/(\d+)\s*([+−\-×÷])\s*(\d+)/))) return `${m[1]}${m[2]==='-'?'−':m[2]}${m[3]}`;
  return null; }
// 단순 지식의 이름표. 식이 있으면 식, 수를 세거나 읽고 쓰는 문제면 '수7'. 문장제·개념 문제는 null.
function factKey(q){ if(!q||q.manip||q.onMount) return null; const e=exprOf(q); if(e) return e;
  if(!/\d/.test(plain(q.q))&&/^\d{1,3}$/.test(String(q.ans))) return '수'+q.ans; return null; }
const factName=k=>k.startsWith('수')?'숫자 '+k.slice(1):k.replace(/([+−×÷=])/g,' $1 ');

// 식에서 알려진 오개념 오답을 계산해 보기에 넣거나(보기형), 예상 오답으로 달아 둔다(쓰기형).
function codeEP(q){ const k=exprOf(q); if(!k||!/^\d+$/.test(String(q.ans))) return; const A=+q.ans, mis={}; let m;
  const add=(v,c)=>{ if(Number.isInteger(v)&&v>=0&&v!==A) mis[String(v)]=c; };
  if((m=k.match(/^(\d+)×(\d+)$/))){ const a=+m[1], b=+m[2]; if(a*b!==A) return; add(a+b,(a<=1||b<=1)?'N2-06':'N2-05'); }
  else if((m=k.match(/^(\d+)\+(\d+)$/))){ const a=+m[1], b=+m[2]; if(a+b!==A) return;
    if((a>=10||b>=10)&&(a%10+b%10)>=10){ const s=String(a).padStart(3,'0'), t=String(b).padStart(3,'0'); add(+[0,1,2].map(i=>(+s[i]+ +t[i])%10).join(''),'N2-01'); } }
  else if((m=k.match(/^(\d+)−(\d+)$/))){ const a=+m[1], b=+m[2]; if(a-b!==A) return;
    if(a>=20&&a%10<b%10){ const s=String(a), t=String(b).padStart(s.length,'0'); add(+[...s].map((d,i)=>Math.abs(d-t[i])).join(''),'N2-02'); } }
  else if((m=k.match(/^(\d+)\+(\d+)=□\+(\d+)$/))){ add(+m[1]+ +m[2],'N1-05'); }
  if(!Object.keys(mis).length) return;
  if(q.opts&&q.opts.length){ const num=typeof q.opts[0]==='number';
    for(const v of Object.keys(mis)){ if(q.opts.map(String).includes(v)) continue; const j=q.opts.findIndex(o=>String(o)!==String(q.ans)&&!(String(o) in mis)); if(j<0){ delete mis[v]; continue; } q.opts[j]=num?+v:v; } }
  if(Object.keys(mis).length) q.mis=mis; }

function gen1(e,i,seed){ const q=withSeed(seed,RAW1[e][i]); if(q&&typeof q==='object'){ q._seed=seed; q._e=+e; q._ei=i; try{ codeEP(q); }catch(x){} } return q; }
// 같은 틀이 여러 번 들어 있는 편이 있어(뽑힐 확률 조절), 같은 함수에는 같은 포장을 씌운다.
for(const e of Object.keys(G)){ RAW1[e]=G[e].slice(); G[e]=RAW1[e].map((g,i)=>{ let w=WRAP1.get(g); if(!w){ w=function(){ return gen1(e,i,(Math.random()*4294967296)>>>0); }; WRAP1.set(g,w); } return w; }); }

// 틀리면 상자 0(바로 다시). 복습 때가 되어 맞히면 한 상자씩 올라가고, 상자 3을 지나면 '익힘'.
function factUpdate(q,ok){ const key=factKey(q); if(!key) return null; const F=J(FK,{}), now=Date.now(); let f=F[key];
  if(!ok){ f=F[key]=Object.assign(f||{w:0},{box:0,due:now,e:q._e,i:q._ei,sd:q._seed,done:0}); f.w++; W(FK,F); }
  else if(f&&!f.done&&now>=f.due){ f.box=(f.box||0)+1; if(f.box>=INT.length) f.done=1; else f.due=now+INT[f.box]; W(FK,F); }
  return key; }
function dueFacts(){ const F=J(FK,{}), now=Date.now(); return Object.entries(F).filter(([k,f])=>!f.done&&f.due<=now&&RAW1[f.e]&&RAW1[f.e][f.i]).sort((a,b)=>a[1].due-b[1].due); }
function regenFact(key,f){ let q=null; try{ q=gen1(f.e,f.i,f.sd); }catch(e){} if(!q||factKey(q)!==key){ const F=J(FK,{}); delete F[key]; W(FK,F); return null; } q._review=1; return q; }

function recEP(q,given,ok){ if(!q||q._kt) return; q._kt=1; const ep=epLabel(q._e), fk=`${ep}:${q._ei}:0`;
  const gk=/^\d+$/.test(String(given))?String(+given):String(given), m=ok?null:((q.mis&&(q.mis[String(given)]||q.mis[gk]))||null);
  const ms=q._t0?Math.min(600000,Date.now()-q._t0):0, key=factUpdate(q,ok);
  const r={d:today(),ep,ti:q._ei,v:0,sd:q._seed||0,g:clean(given),ok:ok?1:0,m,ms,dg:0}; if(key) r.f=key; if(!ok) r.qt=plain(q.q).slice(0,70);
  const log=J(LK,[]); log.push(r); W(LK,log.slice(-3000));
  if(q.mis){ const st=state(); for(const c of new Set(Object.values(q.mis))){ const e=st.mis[c]||(st.mis[c]={h:[],n:0,ep:[]}); e.h.push([fk,c===m?1:0,ok?1:0]); e.h=e.h.slice(-8);
      if(c===m){ e.n++; if(!e.ep.includes(ep)) e.ep.push(ep); e.ep=e.ep.slice(-5); } } W(SK,st); }
  try{ const st2=state(); pieceUpdate(st2,q,m,ok,(q.opts&&q.opts.length)?1/q.opts.length:.05,ms,fk); W(SK,st2); }catch(e){}
  afterRec(q,given,ok,m);
  if(cfg().share&&KT_ENDPOINT){ const qu=J(QK,[]); qu.push([r.d,ep,q._ei,0,r.sd,r.g,r.ok,m,ms,0,...recExtra(q)]); W(QK,qu.slice(-3000)); }
  // 틀린 단순 지식은 이번 세트 뒤쪽에 똑같이 한 번 더 낸다.
  if(!ok&&key&&S&&S.acts&&(S.mode==='ep'||S.mode==='final')){ S._rv=S._rv||{};
    if(!S._rv[key]){ let j=-1; for(let k=S.acts.length-1;k>S.i+1;k--){ if(S.acts[k].kind==='q'&&!S.acts[k].q._review){ j=k; break; } }
      if(j>0){ const q2=regenFact(key,J(FK,{})[key]); if(q2){ S.acts[j]={kind:'q',q:q2}; S._rv[key]=1; } } } } }

// 세트를 만들 때, 복습할 때가 된 것을 최대 3개 끼워 넣는다(이미 배운 편의 것만).
function injectReviews(acts,maxE){ const qi=acts.map((a,k)=>a.kind==='q'?k:-1).filter(k=>k>=0), have=new Set(acts.filter(a=>a.kind==='q').map(a=>factKey(a.q))); let n=0;
  for(const [key,f] of dueFacts()){ if(n>=3||!qi.length) break; if(f.e>maxE||have.has(key)) continue; const q=regenFact(key,f); if(!q) continue;
    acts[qi.splice(Math.floor(Math.random()*qi.length),1)[0]]={kind:'q',q}; have.add(key); n++; }
  return acts; }
const _ma0=makeActs; makeActs=function(ep){ return injectReviews(_ma0.apply(this,arguments),+ep); };
const _mf0=makeFinalActs; makeFinalActs=function(ch){ return injectReviews(_mf0.apply(this,arguments),CHAPTERS[ch].eps[1]); };
function startReview(){ const acts=[]; for(const [key,f] of dueFacts()){ if(acts.length>=10) break; const q=regenFact(key,f); if(q) acts.push({kind:'q',q}); } if(!acts.length) return home();
  S={mode:'final',review:true,ch:chapterOf(acts[0].q._e),steps:[{kind:'acts'}],si:0,acts,i:0,results:[],tries:0,counted:0,title:'다시 만나기',saveKey:'REVIEW'}; say(' ','rami'); step(); }
function factsHTML(){ const F=J(FK,{}), now=Date.now(); const xs=Object.entries(F).sort((a,b)=>(a[1].done||0)-(b[1].done||0)||b[1].w-a[1].w).slice(0,12);
  if(!xs.length) return '<li>되풀이할 단순 지식이 아직 없습니다.</li>';
  const when=f=>f.done?'익힘':f.due<=now?'지금 복습할 때':now+INT[1]>=f.due?'조금 뒤 복습':now+INT[2]>=f.due?'내일 복습':'며칠 뒤 복습';
  return xs.map(([k,f])=>`<li><b>${esc(factName(k))}</b> <span class="rd">${f.w}번 틀림 · ${when(f)} · ${epLabel(f.e)}</span></li>`).join(''); }
