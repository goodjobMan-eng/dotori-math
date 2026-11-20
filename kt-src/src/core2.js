
/* ---------- 5. 지식요소(KC)와 사다리 ---------- */
const UNIT_KC = {'3-1 덧셈과 뺄셈 (세 자리 수)':'KN3-1','3-1 나눗셈':'KN3-3','3-1 곱셈 (두 자리 × 한 자리)':'KN3-2','3-1 분수와 소수':'KN3-4','3-2 곱셈':'KN3-2','3-2 나눗셈':'KN3-3','3-2 분수':'KN3-4',
'4-1 큰 수':'KN4-1','4-1 곱셈과 나눗셈':'KN4-2','4-2 분수의 덧셈과 뺄셈':'KN4-3','4-2 소수의 덧셈과 뺄셈':'KN4-4','5-1 자연수의 혼합 계산':'KN5-1','5-1 약수와 배수':'KN5-2','5-1 약분과 통분':'KN5-3','5-1 분수의 덧셈과 뺄셈 (분모가 다른)':'KN5-3',
'5-2 수의 범위와 어림하기':'KN5-6','5-2 분수의 곱셈':'KN5-4','5-2 소수의 곱셈':'KN5-5','6-1 분수의 나눗셈':'KN6-1','6-1 소수의 나눗셈':'KN6-2','6-2 분수의 나눗셈':'KN6-1','6-2 소수의 나눗셈':'KN6-2',
'2-1 분류하기':'KD2-1','2-2 표와 그래프':'KD2-1','3-2 자료의 정리':'KD4-1','4-1 막대그래프':'KD4-1','4-2 꺾은선그래프':'KD4-1','5-2 평균과 가능성':'KD5-1','6-1 비율그래프':'KD6-1',
'1-2 규칙 찾기':'KR2-1','2-2 규칙 찾기':'KR2-1','4-1 규칙 찾기':'KR4-1','5-1 규칙과 대응':'KR5-1','6-1 비와 비율':'KR6-1','6-2 비례식과 비례배분':'KR6-3',
'1-1·1-2 모양과 비교하기':'KG1-1','2-1 여러 가지 도형':'KG2-2','1-2·2-2 시각과 시간':'KG2-1','2-2 길이 재기':'KG2-1','3-1 평면도형':'KG3-1','3-2 원':'KG3-2','3-1 길이와 시간':'KG3-3','3-2 들이와 무게':'KG3-3',
'4-1 각도':'KG4-1','4-1 평면도형의 이동':'KG4-3','4-2 수직과 평행':'KG4-2','4-2 삼각형·사각형·다각형':'KG4-2','5-1 다각형의 둘레와 넓이':'KG5-1','5-2 합동과 대칭':'KG5-2','5-2 직육면체':'KG5-3',
'6-1 각기둥과 각뿔':'KG6-1','6-1 직육면체의 부피와 겉넓이':'KG6-2','6-2 공간과 입체':'KG6-3','6-2 원기둥·원뿔·구, 원의 넓이':'KG6-4'};
const EP_KC_OVR = {'S5-16':'KR6-2','S6-62':'KG6-5','S6-63':'KG6-5','S3-21':'KN3-5','S3-22':'KN3-5'};
const EP_KC = {}, KC_EPS = {};
UNITS36.forEach(u=>u.eps.forEach(e=>{ const k=EP_KC_OVR[e]||UNIT_KC[u.title]; if(!k) return; EP_KC[e]=k; (KC_EPS[k]=KC_EPS[k]||[]).push(e); }));
const epKC = ep => EP_KC[ep]||null, epsOf = kc => KC_EPS[kc]||[], uix = ep => UNITS36.findIndex(u=>u.eps.includes(ep));
const KCN = {'KN3-1':'세 자리 수 덧셈·뺄셈','KN3-2':'곱셈(3학년)','KN3-3':'나눗셈(3학년)','KN3-4':'분수의 뜻과 크기','KN3-5':'소수 한 자리 수','KN4-1':'큰 수','KN4-2':'곱셈·나눗셈(4학년)','KN4-3':'분모 같은 분수 계산','KN4-4':'소수의 덧셈·뺄셈',
'KN5-1':'혼합 계산','KN5-2':'약수와 배수','KN5-3':'약분·통분, 분모 다른 분수 계산','KN5-4':'분수의 곱셈','KN5-5':'소수의 곱셈','KN5-6':'수의 범위와 어림','KN6-1':'분수의 나눗셈','KN6-2':'소수의 나눗셈',
'KR4-1':'규칙과 등식','KR5-1':'대응 관계','KR6-1':'비와 비율','KR6-2':'백분율','KR6-3':'비례식·비례배분',
'KG3-1':'각·직각·직사각형','KG3-2':'원','KG3-3':'길이·들이·무게·시간','KG4-1':'각도','KG4-2':'삼각형·사각형 분류','KG4-3':'도형의 이동','KG5-1':'둘레와 넓이','KG5-2':'합동과 대칭','KG5-3':'직육면체',
'KG6-1':'각기둥과 각뿔','KG6-2':'부피와 겉넓이','KG6-3':'공간과 입체','KG6-4':'원주와 원의 넓이','KG6-5':'원기둥·원뿔·구',
'KD4-1':'그림·막대·꺾은선그래프','KD5-1':'평균과 가능성','KD6-1':'띠·원그래프'};
const SNAME = {N:'수와 연산',R:'변화와 관계',G:'도형과 측정',D:'자료와 가능성'};
// 수준 찾기에 쓰는 사다리(3~6학년). 영역 안에서 배우는 순서대로 한 줄로 세운 근사값이다.
const LADDER = {
  N:['KN3-1','KN3-2','KN3-3','KN3-4','KN3-5','KN4-1','KN4-2','KN4-3','KN4-4','KN5-1','KN5-2','KN5-3','KN5-4','KN5-5','KN5-6','KN6-1','KN6-2'],
  R:['KR4-1','KR5-1','KR6-1','KR6-2','KR6-3'],
  G:['KG3-1','KG3-2','KG3-3','KG4-1','KG4-2','KG4-3','KG5-1','KG5-2','KG5-3','KG6-1','KG6-2','KG6-3','KG6-4','KG6-5'],
  D:['KD4-1','KD5-1','KD6-1']};

/* ---------- 6. 문제를 다시 만들 수 있게: 시드 고정 ---------- */
// 문제는 난수로 만들어지므로 (편, 틀 번호, 시드, 버전)만 있으면 같은 문제를 그대로 다시 만들 수 있다.
const RAW = {};
function mb32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function withSeed(seed,f){ const prev=Math.random; Math.random=mb32(seed); try{ return f(); } finally{ Math.random=prev; } }
Object.keys(G36).forEach(ep=>{ RAW[ep]=G36[ep].slice(); G36[ep]=RAW[ep].map((g,gi)=>function(){ const seed=(Math.random()*4294967296)>>>0; const q=withSeed(seed,()=>tagQ(ep,gi,g())); if(q&&typeof q==='object') q._seed=seed; return q; }); });
const regen = (ep,ti,seed) => withSeed(seed, ()=>tagQ(ep,ti,RAW[ep][ti]()));

/* ---------- 7. 기록·추적 ---------- */
const LK='dotori-kt-log', SK='dotori-kt-state', DK='dotori-kt-did', QK='dotori-kt-queue', CK='dotori-kt-cfg';
const J=(k,d)=>{ try{ const v=localStorage.getItem(k); const x=v?JSON.parse(v):null; return x==null?d:x; }catch(e){ return d; } };
const W=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
const today=()=>{ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const BKT={L0:.3,T:.15,S:.1};
const state=()=>Object.assign({kc:{},kn:{},mis:{},est:{},lvl:null,diagAt:null},J(SK,{}));
function did(){ let v=J(DK,null); if(!v||!/^[0-9a-f-]{36}$/.test(v)){ v=(crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{ const r=crypto.getRandomValues(new Uint8Array(1))[0]&15; return (c==='x'?r:(r&3|8)).toString(16); })); W(DK,v); } return v; }
const clean=s=>String(s==null?'':s).replace(/[^0-9A-Za-z가-힣ㄱ-ㅎ .:,/%°²³+×÷=−\-~()←→↑↓]/g,'').slice(0,24);
const plain=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// 무게를 준 갱신. 확률을 그대로 섞지 않고 로그오즈에 (무게 × 로그우도비)를 더한다(푸는 순서와 무관하고, 높은 숙달에서도 증거가 같은 세기로 작동).
// 0.02~0.95로 묶어 둔다: 저학년 조각이 0.999로 굳으면 고학년에서 그 오개념이 나와도 내려가지 않기 때문.
const _lg=p=>Math.log(p/(1-p)), _clip=p=>Math.min(.95,Math.max(.02,p));
function bktW(L,ok,G,w){ L=_clip(L); const lr=ok?Math.log((1-BKT.S)/G):Math.log(BKT.S/(1-G)); const x=1/(1+Math.exp(-(_lg(L)+w*lr))); return +_clip(x+(1-x)*BKT.T*(ok?w:0)).toFixed(4); }
const pieceL=(st,c)=>(st.cp&&st.cp[c]!=null)?st.cp[c]:.5;
// 개념 조각 숙달. 틀림: 고른 오답의 코드가 가리키는 주 조각을 그 무게로 깎고, 부 조각은 (무게 × 주 조각의 지금 숙달)만큼만 깎는다.
//   주 조각이 이미 비어 있으면 그것으로 오답이 설명되므로 부 조각까지 끌어내리지 않는다.
// 맞음: 보기에 있었지만 고르지 않은 오개념의 주 조각에 약한 긍정 증거(0.1). 찍었을 수 있으니 3초 넘게 풀었을 때만.
function pieceUpdate(st,q,m,ok,G,ms,fk){ st.cp=st.cp||{}; st.cpn=st.cpn||{}; st.cph=st.cph||{}; const up=(c,good,w)=>{ if(!CPC[c]||w<=0) return; st.cp[c]=bktW(pieceL(st,c),good,G,w); st.cpn[c]=(st.cpn[c]||0)+1; };
  if(!ok){ const ps=m&&MISC[m]; if(ps){ const L0=pieceL(st,ps[0][0]); ps.forEach(([c,w],i)=>up(c,false,i?w*L0:w)); const c0=ps[0][0], hs=st.cph[c0]||(st.cph[c0]=[]); if(fk&&!hs.includes(fk)){ hs.push(fk); st.cph[c0]=hs.slice(-4); } } }
  else if(q.mis&&(ms==null||ms>=3000)){ const seen={}; Object.values(q.mis).forEach(code=>(MISC[code]||[]).slice(0,1).forEach(([c])=>{ if(!seen[c]){ seen[c]=1; up(c,true,.1); } })); } }
// 약한 조각: 증거 2번 이상이고 숙달 0.35 미만. 다만 곧바로 "비어 있다"고 하지 않는다.
// 고학년 문제의 오답만으로 저학년 조각이 깎였을 수 있으므로(예: 분수 나눗셈에서만 나누는 수를 바꿈), 먼저 그 조각을 처음 배우는 단원의 문제 2개로 확인한다.
//   확인 중(chk) → 둘 다 맞히면 '맥락에서만 틀림(ctx)'으로 두고 숙달을 0.6으로 되돌림 / 하나라도 틀리면 '비어 있음(weak)' 확정.
//   ctx가 된 뒤 다시 약해지면 확인 없이 확정.
// '약함'의 조건: 그 조각을 가리키는 오답을 서로 다른 문항 2종 이상에서 골랐고 숙달이 0.35 미만.
function pieceStage(st,c){ st.cpv=st.cpv||{}; const cp=st.cp||{}, n=st.cpn||{}; const low=CPC[c]&&((st.cph||{})[c]||[]).length>=2&&cp[c]<.35; const v=st.cpv[c];
  if(!low) return v&&v.s==='ctx'?'ctx':null; if(!v){ st.cpv[c]={s:'chk',n:0,ok:0}; return 'chk'; } if(v.s==='ctx'){ st.cpv[c]={s:'weak'}; return 'weak'; } return v.s; }
function pieceCheck(st,q,ok){ const c=q._chk; if(!c) return; st.cpv=st.cpv||{}; const v=st.cpv[c]; if(!v||v.s!=='chk') return; v.n++; if(ok) v.ok++;
  if(!ok) st.cpv[c]={s:'weak'}; else if(v.n>=2){ st.cpv[c]={s:'ctx'}; st.cp[c]=.65; st.cph[c]=[]; } }
function weakPieces(st,all){ const own=!st; st=st||state(); const cp=st.cp||{}; const rows=Object.keys(cp).filter(c=>CPC[c]).map(c=>({c,name:CPC[c][0],when:CPC[c][1],L:cp[c],s:pieceStage(st,c)})).filter(x=>x.s);
  if(own) W(SK,st); const weak=rows.filter(x=>x.s==='weak').map(x=>x.c); rows.forEach(x=>x.pre=CPC[x.c][2].filter(p=>weak.includes(p)));
  const ord=x=>+x.when.replace('-','.'); return rows.filter(x=>all||x.s==='weak').sort((a,b)=>a.pre.length-b.pre.length||ord(a)-ord(b)); }
const checkPieces=st=>weakPieces(st,true).filter(x=>x.s==='chk');
// 공개 데이터에 더 싣는 칸: 보기에 있던 오개념 코드들(보기별 무게를 다시 추정하는 데 꼭 필요), 푸는 방식, 세트 안 순서, 다시 나온 문제인지.
function recExtra(q){ let mode='u'; try{ mode=q.diag?'g':S.focus?'f':S.kt==='daily'?'d':S.kt==='quick'?'q':S.review?'r':'u'; }catch(e){}
  const ex=[...new Set(Object.values(q.mis||{}))].sort().slice(0,4).join('|'); let seq=0; try{ seq=Math.max(0,Math.min(99,S.i|0)); }catch(e){}
  return [ex,mode,seq,q._review?1:0,q.manip?'m':(q.opts&&q.opts.length)?'c':'w']; }
function rec(q, given, ok){
  if(!q||q._kt) return; q._kt=1;
  const ep=q._ep||(S&&S.ep)||''; if(!/^S\d-\d{1,3}$/.test(String(ep))) return;       // 3~6학년 영역 문항만
  const gk=/^\d+$/.test(String(given))?String(+given):String(given);
  const m=ok?null:((q.mis&&(q.mis[String(given)]||q.mis[gk]))||q._mcode||null);
  const ti=q._ti==null?-1:q._ti, v=q._v||0, fk=`${ep}:${ti}:${v}`, kc=epKC(ep);
  const ms=q._t0?Math.min(600000,Date.now()-q._t0):0;
  const r={d:today(),ep,ti,v,sd:q._seed==null?0:q._seed,g:clean(given),ok:ok?1:0,m,ms,dg:q.diag?1:0};
  if(!ok) r.qt=plain(q.q).slice(0,70);                                                 // 교사 화면용(기기 안에만 남음)
  const log=J(LK,[]); log.push(r); W(LK,log.slice(-3000));
  const st=state();
  const nOpt=(q.opts&&q.opts.length)||0, G=nOpt?1/nOpt:.05;
  // 보기마다 무게가 다르다: 오개념 보기를 골랐으면 원인은 그 오개념이 가리키는 개념 조각에 있으므로 단원 숙달은 약하게, 조각은 세게 깎는다.
  const wk=ok?1:(m&&MISC[m])?.4*pieceL(st,MISC[m][0][0])+.1:(q.fx&&(q.fx[String(given)]||q.fx[gk]))?.3:.7;   // 선수 조각이 이미 비어 있으면 이 단원 숙달은 덜 깎는다
  if(kc){ st.kc[kc]=bktW(st.kc[kc]==null?BKT.L0:st.kc[kc],ok,G,wk); st.kn[kc]=(st.kn[kc]||0)+1; }
  pieceUpdate(st,q,m,ok,G,ms,fk); pieceCheck(st,q,ok);
  if(q.mis){ for(const c of new Set(Object.values(q.mis))){ const e=st.mis[c]||(st.mis[c]={h:[],n:0,ep:[]}); e.h.push([fk,c===m?1:0,ok?1:0]); e.h=e.h.slice(-8);
    if(c===m){ e.n++; if(!e.ep.includes(ep)) e.ep.push(ep); e.ep=e.ep.slice(-5); } } }
  W(SK,st);
  afterRec(q,given,ok,m);
  if(cfg().share&&KT_ENDPOINT){ const qu=J(QK,[]); qu.push([r.d,ep,ti,v,r.sd,r.g,r.ok,m,ms,r.dg,...recExtra(q)]); W(QK,qu.slice(-3000)); }
}
// 최근 8번의 기회(그 오개념의 오답이 보기에 있던 문제) 안에서 판정한다. 기록 한 칸 = [문항, 그 오답을 골랐나, 맞혔나].
// 확인: 서로 다른 문항 2종 이상에서 3번 이상 골랐고, (노출의 70% 이상) 또는 (틀릴 때마다 대부분 그 오답: 오답 4번 이상 중 80% 이상이면서 정답률 40% 이상 = 찍는 아이가 아님).
// 의심: 2종 이상에서 2번. 해소: 그 오답이 있던 문제를 3번 이어서 맞힘(다른 오답을 고른 것은 해소가 아님).
function status(code,st){ const e=(st||state()).mis[code]; if(!e||!e.h||!e.h.length) return null; const h=e.h, n=h.length, picks=h.filter(x=>x[1]), k=picks.length, distinct=new Set(picks.map(x=>x[0])).size;
  const w=h.filter(x=>x[1]||x[2]===0).length, last3=h.slice(-3); if(last3.length===3&&last3.every(x=>x[2]===1)) return null;
  if(MISC[code]&&pieceL(st||state(),MISC[code][0][0])>=.75) return null;                 // 그 오개념이 가리키는 조각이 채워졌으면 해소
  if(k>=3&&distinct>=2&&(k/n>=.7||(w>=4&&k/w>=.8&&(n-w)/n>=.4))) return '확인'; if(k>=2&&distinct>=2) return '의심'; return null; }
// 문제 3개 미만으로는 숙달·미숙달을 단정하지 않는다.
function kcStatus(k,st){ const p=st.kc[k], n=(st.kn||{})[k]||0; if(p==null) return st.est[k]?'추정':'모름'; if(n<3) return p>=.4&&st.est[k]?'추정':'연습'; return p>=.85?'숙달':p>=.4?'연습':'미숙달'; }
function report(){ const st=state(); const mis=Object.keys(st.mis).map(c=>({c,s:status(c,st),n:st.mis[c].n,ep:st.mis[c].ep||[]})).filter(x=>x.s&&MIS[x.c]).sort((a,b)=>(a.s==='확인'?0:1)-(b.s==='확인'?0:1)||b.n-a.n);
  return {mis, kc:Object.keys(KCN).map(k=>({k,s:kcStatus(k,st),p:st.kc[k]}))}; }

/* ---------- 8. 수준 찾기(첫 진단) ---------- */
const CAST=['도토','대롱이','부엉 박사님','붕붕이'];
function pickForKC(kc){ const eps=shuffle(epsOf(kc).slice());
  for(const pass of [0,1]) for(const ep of eps){ for(const i of shuffle(G36[ep].map((_,k)=>k))){ for(let t=0;t<3;t++){ let q; try{ q=G36[ep][i](); }catch(e){ break; }
    if(!q||q.manip||q.onMount) break; if(pass===0&&!q.write) break; if(!q.write&&(!q.opts||q.opts.length<3)) continue; q._ep=ep; q._ti=i; return q; } } }
  return null; }
function diagApply(){ const D=S.diagRun; if(!D.cur||D.cur.done) return; D.cur.done=1; const t=D.strands[D.si]; if(S.results[D.cur.i]) t.lo=D.cur.mid+1; else t.hi=D.cur.mid; }
function diagNext(){ const D=S.diagRun; diagApply();
  for(;;){ while(D.si<D.strands.length&&D.strands[D.si].lo>=D.strands[D.si].hi) D.si++;
    if(D.si>=D.strands.length){ S.acts.length=S.i; return false; }
    const t=D.strands[D.si], mid=(t.lo+t.hi)>>1, q=pickForKC(LADDER[t.s][mid]);
    if(!q){ t.lo=mid+1; continue; }
    D.cur={mid,i:S.i}; S.acts[S.i]={kind:'q',q}; S.ep=q._ep; S.ui=uix(q._ep); return true; } }
function startDiag(){ const strands=Object.keys(LADDER).map(s=>({s,lo:0,hi:LADDER[s].length}));
  const total=strands.reduce((a,t)=>a+Math.ceil(Math.log2(t.hi+1)),0);
  S={mode:'ep36',retry:true,diagRun:{strands,si:0,cur:null},ep:'S2-01',ui:0,ch:0,steps:[{kind:'acts'}],si:0,acts:Array.from({length:total},()=>({kind:'q',q:null})),i:0,results:[],tries:0,counted:0,title:'내 수준 찾기',saveKey:'RETRY',chars:CAST};
  if(diagNext()) step(); else home(); }
function diagDone(){ diagApply(); const st=state(); st.lvl={}; S.diagRun.strands.forEach(t=>{ st.lvl[t.s]=t.lo; LADDER[t.s].slice(0,t.lo).forEach(k=>{ st.est[k]=1; }); }); st.diagAt=today(); W(SK,st);
  S={idle:true}; hush(); app.className='wrap';
  app.innerHTML=`<div class="stage"><div style="font-family:Jua;font-size:1.3rem;margin-bottom:14px">수준 찾기 끝! 이제 내 수준에 맞는 문제가 나와요.</div><div class="btns"><button class="next" id="kt-go">오늘의 문제 풀기</button><button class="ghost" id="kt-home">처음으로</button></div></div>`;
  document.getElementById('kt-go').onclick=startDaily; document.getElementById('kt-home').onclick=home; if(!pref().band) setPref({band:3}); }

/* ---------- 9. 다시 다지기(오개념 맞춤 연습)와 오늘의 코스 ---------- */
let FORM_IDX=null;
function formsOf(code){ if(!FORM_IDX){ FORM_IDX={}; for(const ep of Object.keys(G36)) G36[ep].forEach((g,i)=>{ for(let k=0;k<8;k++){ let q; try{ q=g(); }catch(e){ break; } if(!q||typeof q!=='object') break; if(!q.mis) continue;
    for(const c of Object.values(q.mis||{})){ const a=(FORM_IDX[c]=FORM_IDX[c]||[]); if(!a.some(x=>x.ep===ep&&x.i===i)) a.push({ep,i}); } } }); }
  return FORM_IDX[code]||[]; }
function startFocus(code){ const fs=shuffle(formsOf(code).slice()); if(!fs.length) return home(); const acts=[], seen=new Set();
  for(let g=0;g<150&&acts.length<6;g++){ const f=fs[g%fs.length]; let q; try{ q=G36[f.ep][f.i](); }catch(e){ continue; } if(!q.mis||!Object.values(q.mis).includes(code)) continue;
    const k=keyOf(q); if(seen.has(k)) continue; seen.add(k); q._ep=f.ep; q._ti=f.i; acts.push({kind:'q',q}); }
  if(!acts.length) return home(); shuffle(acts); const ep0=acts[0].q._ep;
  S={mode:'ep36',retry:true,focus:code,ep:ep0,ui:uix(ep0),ch:0,steps:[{kind:'acts'}],si:0,acts,i:0,results:[],tries:0,counted:0,title:'다시 다지기',saveKey:'RETRY',chars:CAST}; step(); }
let CUR=[];
function course(){ const st=state(), best=load(), out=[];
  const due=dueFacts().length; if(due) out.push({k:'review',n:'1~2학년',t:'다시 만나기',s:`${Math.min(10,due)}문제`});
  if(!st.lvl) out.push({k:'diag',n:'3~6학년 · 처음 한 번',t:'내 수준 찾기',s:'14문제쯤'});
  for(const x of report().mis.filter(x=>formsOf(x.c).length).slice(0,2)){ const ep=x.ep[x.ep.length-1]; out.push({k:'focus',code:x.c,n:'다시 다지기',t:(EPS36[ep]||[''])[0],s:'6문제'}); }
  if(st.lvl) for(const s of Object.keys(LADDER)){ const kc=LADDER[s].find(k=>!['숙달','추정'].includes(kcStatus(k,st))); if(!kc) continue;
    const eps=epsOf(kc), ep=eps.find(e=>(best['EP'+e]??-1)<8)||eps[0]; if(ep) out.push({k:'ep',ep,n:SNAME[s],t:EPS36[ep][0],s:ep}); }
  return out.slice(0,6); }
function courseHTML(){ CUR=course(); return `<div class="eps ktc">${CUR.map((x,i)=>`<button class="ep" data-kt="${i}"><span class="n">${x.n}</span><span class="t">${x.t}</span><span class="s">${x.s}</span></button>`).join('')}</div>`; }
function bindCourse(){ document.querySelectorAll('[data-kt]').forEach(b=>b.onclick=()=>{ const x=CUR[+b.dataset.kt]; if(!x) return; if(x.k==='review') startReview(); else if(x.k==='diag') startDiag(); else if(x.k==='focus') startFocus(x.code); else startEp36(x.ep,uix(x.ep)); }); }
function coursePage(msg){ hush(); app.className='wrap';
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">오늘의 코스</div><span style="width:70px"></span></div>
    <div class="stage"><div style="font-family:Jua;font-size:1.3rem;margin-bottom:12px">${msg}</div>${courseHTML()}</div>`;
  document.getElementById('back').onclick=home; bindCourse(); }

/* ---------- 10. 선생님용 화면 ---------- */
function teacherPage(){ if(typeof S!=='undefined'&&S) S.idle=true; hush(); app.className='wrap'; const st=state(), R=report(), log=J(LK,[]);
  const misH=R.mis.length?R.mis.map(x=>{ const ex=log.filter(r=>r.m===x.c&&r.qt).slice(-2).map(r=>`<div class="kt-ex">“${esc(r.qt)}” → 낸 답 <b>${esc(r.g)}</b></div>`).join('');
      return `<li><b>${x.s==='확인'?'확인':'의심'} · ${x.c}</b> ${MIS[x.c][0]}<div class="kt-tip">도움말: ${MIS[x.c][1]}</div>${ex}</li>`; }).join('')
    :'<li>확인되거나 의심되는 오개념이 아직 없습니다.</li>';
  const C={숙달:'m',추정:'e',연습:'p',미숙달:'x',모름:'u'};
  const lad=Object.keys(LADDER).map(s=>`<div class="kt-sec">${SNAME[s]}</div><div>${LADDER[s].map(k=>{ const v=kcStatus(k,st); return `<span class="kt-kc kt-${C[v]}">${KCN[k]} · ${v}</span>`; }).join('')}</div>`).join('');
  const cr=course().map(x=>`<li>${x.n} — ${x.t} <span class="rd">${x.s}</span></li>`).join('');
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">선생님용</div><span style="width:70px"></span></div>
    <div class="stage" style="text-align:left">
      <p style="font-size:.95rem;color:var(--ink-soft)">이 기기에 쌓인 기록 ${log.length}건 · 수준 찾기 ${st.diagAt||'아직 안 함'}${cfg().share?' · 익명 기록 공유 켜짐':''}</p>
      <h2 class="sec">오개념</h2><ul class="recent kt-list">${misH}</ul>
      <p class="kt-ex">최근 8번의 기회에서 서로 다른 문항 2종 이상에 걸쳐 3번 이상 나오면 확인, 2번이면 의심입니다. 바르게 풀면 사라집니다.</p>
      <h2 class="sec">비어 있는 개념</h2><ul class="recent kt-list">${(w=>w.length?w.map(x=>`<li><b>${esc(x.name)}</b> <span class="rd">${x.when.replace('-','학년 ')}학기에 처음 배움${x.pre.length?' · 먼저 '+x.pre.map(p=>CPC[p][0]).join(', '):''}</span><div class="kt-ex">강의: ${(CPL[x.c]||[]).map(k=>`${k} ${esc(lecName(k))}${lecHas(k)?'':'(준비 중)'}`).join(', ')}</div></li>`).join(''):'<li>아직 비어 있다고 볼 개념이 없습니다.</li>')(weakPieces(st))}${weakPieces(st,true).filter(x=>x.s!=='weak').map(x=>`<li><b>${esc(x.name)}</b> <span class="rd">${x.s==='chk'?'확인 중: 처음 배우는 단원의 문제 2개로 다시 봅니다':'처음 배우는 단원에서는 맞힘. 윗학년 문제에서만 틀립니다'}</span></li>`).join('')}</ul>
      <p class="kt-ex">오답 보기마다 "이 답을 고르면 어떤 개념을 모르는 것"인지와 그 무게를 정해 두었습니다. 같은 개념을 가리키는 오답이 두 번 이상 쌓이면 여기에 나옵니다. 위에 있을수록 먼저 채워야 하는 개념입니다.</p>
      <h2 class="sec">자주 틀리는 단순 지식 (1~2학년)</h2><ul class="recent kt-list">${factsHTML()}</ul>
      <p class="kt-ex">틀리면 같은 세트 뒤쪽에 한 번 더 나오고, 그 뒤 10분 → 다음 날 → 3일 간격으로 다시 나옵니다. 네 번 이어서 맞히면 익힘으로 바뀝니다.</p>
      <h2 class="sec">영역별 수준 (3~6학년)</h2>${lad}
      <p class="kt-ex">숙달·미숙달은 문제를 3개 이상 푼 뒤에만 표시합니다. 추정은 수준 찾기에서 맞혔거나 더 어려운 내용을 맞혀 건너뛴 내용입니다.</p>
      <h2 class="sec">추천 코스</h2><ul class="recent kt-list">${cr||'<li>추천할 내용이 없습니다.</li>'}</ul>
      <div class="btns" style="margin-top:14px"><button class="ghost" id="kt-rediag">수준 다시 찾기</button><button class="ghost" id="kt-reset">${curSlot()}번 자리의 학습 기록 지우기</button></div>
      <h2 class="sec">기록 옮기기</h2><p class="kt-ex">아이패드 사파리는 홈 화면에 추가하지 않으면 7일 안 쓸 때 기록을 지웁니다. 꺼낸 글자를 메모장에 보관했다가 다시 넣을 수 있습니다(이 기기의 모든 자리).</p>
      <textarea id="kt-io" rows="3" style="width:100%;font-size:.8rem;border:2px solid var(--line);border-radius:12px;padding:8px" aria-label="기록 글자"></textarea>
      <div class="btns" style="margin-top:8px"><button class="ghost" id="kt-exp">기록 꺼내기</button><button class="ghost" id="kt-imp">기록 넣기</button></div>
    </div>`;
  document.getElementById('back').onclick=home; document.getElementById('kt-rediag').onclick=startDiag;
  const rb=document.getElementById('kt-reset'); let armed=false;
  rb.onclick=()=>{ if(!armed){ armed=true; rb.textContent='한 번 더 누르면 지웁니다 (새 학생이 쓸 때)'; return; }
    try{ learnerKeys().forEach(k=>localStorage.removeItem(k)); }catch(e){} FORM_IDX=null; teacherPage(); };
  const io=document.getElementById('kt-io'); document.getElementById('kt-exp').onclick=()=>{ io.value=exportAll(); io.select(); };
  document.getElementById('kt-imp').onclick=()=>{ const b=document.getElementById('kt-imp'); if(importAll(io.value)) location.reload(); else b.textContent='붙여 넣은 글자를 읽을 수 없어요'; }; }

/*__FACTS__*/
/*__MODES__*/
/* ---------- 11. 기존 화면에 연결 ---------- */
const css=document.createElement('style'); css.textContent=`.kt-kc{display:inline-block;margin:3px;padding:4px 10px;border-radius:999px;font-size:.85rem;border:2px solid #d9c7a8;background:#fff}
.kt-m{background:#DDF3D8;border-color:#7DBB6F}.kt-e{background:#F2F8EE;border-style:dashed;border-color:#7DBB6F}.kt-p{background:#FFF1C9;border-color:#E2B33C}.kt-x{background:#FBDDD6;border-color:#E07B62}.kt-u{color:#9a8a70}
.kt-ex{font-size:.85rem;color:var(--ink-soft);margin-top:3px}.kt-tip{font-size:.9rem;margin-top:3px}.kt-sec{margin:12px 0 4px;font-family:Jua;font-size:1.05rem}.kt-list li{display:block;text-align:left}
/* 숲길 그림책: 나무 팻말(버튼), 종이 꼬리표(설정), 징검돌 길(학년) */
body{background-image:none}body:before{background:#FFF7EC var(--kt-grain)!important}
.kt-hero{position:relative;height:292px;margin:0 0 34px;overflow:hidden;border:3px solid #7A4A1E;border-radius:34px 26px 32px 24px/26px 34px 24px 32px;background:#E9D2A6 var(--kt-forest) center 78%/cover}
.kt-hero .sign{position:absolute;left:50%;top:14px;width:min(78%,290px);height:80px;transform:translateX(-50%) rotate(-1.5deg);background:var(--kt-sign) center/100% 100% no-repeat;display:grid;place-items:center}
.kt-hero h1{font-size:1.5rem;color:#5A3516;margin:0}
.kt-hero img{position:absolute;bottom:6px;height:108px}.kt-hero .c1{left:5%}.kt-hero .c2{right:5%}.kt-hero .c3{left:50%;transform:translateX(-50%);height:88px;bottom:44px}
.kt-modes{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 0 12px}
.kt-mode{position:relative;display:flex;flex-direction:column;gap:3px;align-items:flex-start;justify-content:center;text-align:left;min-height:116px;padding:22px 14px 18px 22px;border:0;background:var(--kt-sign) center/100% 100% no-repeat;font-family:"Jua",sans-serif;color:#5A3516;cursor:pointer;filter:drop-shadow(0 4px 0 rgba(90,53,22,.22))}
.kt-mode:nth-child(odd){transform:rotate(-1.2deg)}.kt-mode:nth-child(even){transform:rotate(1deg)}
.kt-mode b{font-size:1.3rem;font-weight:400}.kt-mode span{font-family:"Gowun Dodum",sans-serif;font-size:.86rem;color:#7B5632}
.kt-mode.kt-band{align-items:center;text-align:center;padding:22px 14px 18px calc(14px + 4%)}.kt-mode.kt-band b{font-size:clamp(1.6rem,6vw,2.1rem);text-shadow:0 1px 0 rgba(255,255,255,.75)}
.kt-mode .who{position:absolute;right:4px;top:-34px;height:68px;pointer-events:none}
.kt-mode .stamp{position:absolute;right:14px;bottom:12px;transform:rotate(-8deg);border:2px solid #3F7A34;border-radius:7px;padding:0 7px;font-style:normal;font-size:.8rem;color:#3F7A34}
.kt-mode:active{transform:translateY(3px);filter:none}.kt-mode:focus-visible,.kt-tree:focus-visible,.kt-chip:focus-visible{outline:3px solid #3F7A34;outline-offset:3px}
.kt-slots{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.kt-slot{position:relative;aspect-ratio:1.25;border:0;background:var(--kt-sign) center/100% 100% no-repeat;font-family:"Jua",sans-serif;font-size:1.3rem;color:#5A3516;cursor:pointer}.kt-slot.used::after{content:"";position:absolute;right:16%;top:18%;width:8px;height:8px;border-radius:50%;background:#3F7A34}.kt-slot.on{outline:3px solid #3F7A34;outline-offset:1px;border-radius:14px}.kt-slot:focus-visible{outline:3px solid #3F7A34}
.kt-chips{display:flex;flex-wrap:wrap;gap:8px;margin:4px 2px 8px}
.kt-chip{position:relative;padding:7px 13px 7px 25px;border:0;background:#E9D2A6;color:#5A3516;font-family:"Jua",sans-serif;font-size:.88rem;cursor:pointer;clip-path:polygon(11px 0,100% 0,100% 100%,11px 100%,0 50%)}
.kt-chip::before{content:"";position:absolute;left:12px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:var(--bg)}
.kt-chip.on{background:#BFDDA8;color:#2F5F27}
.kt-path{position:relative;display:flex;flex-direction:column;margin:8px 0 6px;padding:4px 0 8px}
.kt-path svg{position:absolute;left:0;top:4px;width:100%;height:calc(100% - 12px);pointer-events:none}
.kt-tree{position:relative;width:47%;max-width:230px;margin-top:-34px;padding:0 0 26px;border:0;background:none;cursor:pointer;font-family:"Jua",sans-serif;color:#5A3516}
.kt-tree .pic{display:block;aspect-ratio:5/4;border:3px solid #7A4A1E;border-radius:30px 22px 28px 20px/22px 30px 20px 28px;background:#E9D2A6 center/cover no-repeat;box-shadow:0 5px 0 rgba(90,53,22,.18)}
.kt-tree:nth-of-type(even) .pic{border-radius:22px 30px 20px 28px/28px 20px 30px 22px}
.kt-tree:first-of-type{margin-top:0}.kt-tree:nth-of-type(odd){align-self:flex-start;margin-left:2%}.kt-tree:nth-of-type(even){align-self:flex-end;margin-right:2%}
.kt-tree .lb{position:absolute;z-index:2;left:50%;bottom:0;transform:translateX(-50%) rotate(-2deg);display:flex;flex-direction:column;align-items:center;min-width:104px;padding:6px 16px 8px;background:var(--kt-sign) center/100% 100% no-repeat;line-height:1.15}
.kt-tree:nth-of-type(even) .lb{transform:translateX(-50%) rotate(1.5deg)}
.kt-tree b,.kt-tree i{position:relative}.kt-tree b{font-size:1.2rem;font-weight:400}.kt-tree i{font-style:normal;font-family:"Gowun Dodum",sans-serif;font-size:.76rem;color:#7B5632}
.kt-tree .here{position:absolute;right:-6px;bottom:20px;height:78px;pointer-events:none;z-index:1}.kt-tree:nth-of-type(even) .here{right:auto;left:-6px}
.kt-tree:active .pic{transform:translateY(3px);box-shadow:none}
.kt-dom{margin:20px 0 4px}.kt-dom span{display:inline-block;padding:7px 22px;background:var(--kt-sign) center/100% 100% no-repeat;font-family:"Jua",sans-serif;font-size:1.05rem;color:#5A3516;transform:rotate(-1deg)}
.kt-list2{margin-bottom:20px}
.kt-scene{position:relative;display:flex;align-items:flex-end;justify-content:flex-end;gap:2px;height:136px;margin:10px 0 2px;padding:0 14px;border:3px solid #7A4A1E;border-radius:26px 20px 24px 18px/20px 26px 18px 24px;overflow:hidden}
.kt-dom2{margin:30px 2px 0;font-family:"Jua",sans-serif;font-size:1.2rem;color:var(--ink)}.kt-dom2:first-child{margin-top:8px}.kt-scene img{height:86px;margin-bottom:2px;filter:drop-shadow(0 2px 0 rgba(90,53,22,.15))}
.kt-scene.many img{height:66px}
.kt-scene .nm{position:absolute;left:10px;top:10px;transform:rotate(-1.5deg);display:flex;flex-direction:column;padding:8px 20px 10px;background:var(--kt-sign) center/100% 100% no-repeat;font-family:"Jua",sans-serif;color:#5A3516;line-height:1.2}
.kt-scene .nm b{font-weight:400;font-size:1.2rem}.kt-scene .nm i{font-style:normal;font-family:"Gowun Dodum",sans-serif;font-size:.8rem;color:#7B5632}
.kt-row{display:grid;grid-template-columns:30px 1fr auto;align-items:center;gap:12px;width:100%;padding:13px 4px;border:0;border-bottom:2px dashed var(--line);background:none;text-align:left;color:var(--ink);cursor:pointer}
.kt-row .ac{width:26px}.kt-row .tt{display:flex;flex-direction:column;gap:1px;min-width:0}.kt-row b{font-family:"Jua",sans-serif;font-weight:400;font-size:1.15rem}.kt-row i{font-style:normal;font-size:.82rem;color:var(--ink-soft)}
.kt-row .pp{font-family:"Jua",sans-serif;font-size:.92rem;color:#8A5A2B;white-space:nowrap}.kt-row:active{background:rgba(233,210,166,.35)}.kt-row:focus-visible{outline:3px solid #3F7A34;outline-offset:2px}
`; document.head.appendChild(css);
const rs=document.documentElement.style; rs.setProperty('--kt-sign',`url(${A['팻말']})`); rs.setProperty('--kt-tree',`url(${A['나무']})`); rs.setProperty('--kt-forest',`url(${A['배경_할머니집']||A['배경_숲']})`);
rs.setProperty('--kt-grain',`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`);

const _q0=question; question=function(q){ if(q) q._t0=Date.now(); return _q0.apply(this,arguments); };
const _a0=answer; answer=function(btn,q){ let tip=null;
  try{ if(S&&S.tries===0&&q&&!q._kt){ let v=btn&&btn.dataset?btn.dataset.v:''; if(q._mstate!=null) v=(String(v)===String(q.ans)?'ok:':'m:')+q._mstate; if(v!=='__done'){ const ok=q._mstate!=null?v.startsWith('ok:'):String(v)===String(q.ans); (q._e!=null?recEP:rec)(q,v,ok); if(!ok) tip=q._tip; } } }catch(e){}
  const r=_a0.apply(this,arguments);
  try{ if(tip){ const m=document.querySelector('#fb .msg'); if(m&&!m.querySelector('.hint1')) m.insertAdjacentHTML('beforeend',`<div class="hint1">${tip}</div>`); } }catch(e){}
  return r; };
const _ra0=runAct; runAct=function(){ if(S&&S.diagRun&&!S.acts[S.i].q){ if(!diagNext()) return result(); } return _ra0.apply(this,arguments); };
const _r0=result; result=function(){ if(S&&S.diagRun) return diagDone(); const code=S&&S.focus, rv=S&&S.review, n=S&&S.acts?S.acts.length:10, S0=S; const r=_r0.apply(this,arguments);
  try{ ktResult(S0); }catch(e){}
  try{ if(rv){ const b=document.querySelector('.result .big'); if(b) b.textContent=b.textContent.replace('/ 10','/ '+n); const ag=document.getElementById('again'); if(ag){ if(dueFacts().length) ag.onclick=startReview; else ag.remove(); } const li=document.getElementById('list'); if(li){ if([...document.querySelectorAll('.result button')].some(x=>x!==li&&x.textContent.trim()==='처음으로')) li.remove(); else { li.textContent='처음으로'; li.onclick=home; } } } }catch(e){}
  try{ if(code){ const b=document.querySelector('.result .big'); if(b) b.textContent=b.textContent.replace('/ 10','/ '+n); const ag=document.getElementById('again'); if(ag) ag.onclick=()=>startFocus(code); const li=document.getElementById('list'); if(li){ li.textContent='처음으로'; li.onclick=home; } } }catch(e){}
  return r; };
const _h0=home; home=function(){ const r=_h0.apply(this,arguments);
  try{ const h=document.querySelector('#app h2.sec'); if(h){ h.insertAdjacentHTML('beforebegin',modesHTML()); bindModes(); unifyHome(); } }catch(e){}
  return r; };
const _sp0=statsPage; statsPage=function(){ const r=_sp0.apply(this,arguments);
  try{ const st=document.querySelector('#app .stage'); if(st){ st.insertAdjacentHTML('beforeend',`<div class="btns" style="margin-top:14px"><button class="ghost" id="kt-teacher">선생님용 보기</button></div>`); document.getElementById('kt-teacher').onclick=teacherPage; } }catch(e){}
  return r; };

/* ---------- 12. 익명 묶음 전송 (교사가 켠 기기만) ---------- */
// 주소 끝에 #kt-share-on / #kt-share-off / #kt-reset(기기 번호 새로 만들기) / #teacher(선생님용 화면)
function cfg(){ return J(CK,{share:false,last:0,after:0}); }
function setCfg(c){ W(CK,c); }
const DAY=864e5;
function maybeSend(){ if(!KT_ENDPOINT||!navigator.sendBeacon) return; const c=cfg(); if(!c.share) return; const qu=J(QK,[]), now=Date.now();
  if(qu.length<50||now-c.last<DAY) return;
  if(!c.after){ c.after=now+Math.floor(Math.random()*6*3600e3); setCfg(c); return; }     // 기기마다 0~6시간 늦춰 몰림 방지
  if(now<c.after) return;
  const batch=qu.slice(0,2000), body=JSON.stringify({v:KT_VER,did:did(),day:today(),recs:batch});
  let ok=false; try{ ok=navigator.sendBeacon(KT_ENDPOINT,new Blob([body],{type:'text/plain'})); }catch(e){}
  if(ok){ W(QK,qu.slice(batch.length)); c.last=now; c.after=0; setCfg(c); } }
addEventListener('pagehide',maybeSend);
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') maybeSend(); });

/* ---------- 12. 자리 바꾸기: 한 기기를 여러 아이가 쓸 때 기록이 섞이지 않게 ---------- */
// 이름 없이 번호만 고른다. 자리마다 기록 묶음을 따로 두고, 바꿀 때 지금 기록을 접어 넣고 그 자리 기록을 편다. 익명 기기 번호도 자리마다 다르다.
const SLOT_CUR='dotori-slot-cur', SLOT_AT='dotori-slot-at', slotKey=n=>'dotori-slot-'+n;
const curSlot=()=>{ try{ return +(localStorage.getItem(SLOT_CUR)||1); }catch(e){ return 1; } };
const learnerKeys=()=>Object.keys(localStorage).filter(k=>k.startsWith('dotori-')&&!k.startsWith('dotori-slot-')&&k!==CK&&k!=='dotori-input');
function switchSlot(n){ const cur=curSlot(); if(n===cur) return home(); try{ const pack={}; learnerKeys().forEach(k=>{ pack[k]=localStorage.getItem(k); localStorage.removeItem(k); }); localStorage.setItem(slotKey(cur),JSON.stringify(pack));
    const nx=J(slotKey(n),{}); Object.entries(nx).forEach(([k,v])=>localStorage.setItem(k,v)); localStorage.removeItem(slotKey(n)); localStorage.setItem(SLOT_CUR,String(n)); localStorage.setItem(SLOT_AT,String(Date.now())); }catch(e){} location.reload(); }
const slotUsed=n=>n===curSlot()?learnerKeys().length>0:!!localStorage.getItem(slotKey(n));
function slotPage(ask){ hush(); app.className='wrap'; const cur=curSlot();
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">자리 고르기</div><span style="width:70px"></span></div>
    <div class="stage"><div style="font-family:Jua;font-size:1.25rem;margin-bottom:6px">${ask?`방금 쓰던 ${cur}번 자리가 맞나요?`:'내 번호를 골라요'}</div>
    <p class="kt-ex" style="margin-bottom:12px">여럿이 함께 쓰는 기기에서는 자리마다 기록이 따로 쌓여요. 이름은 적지 않아요.</p>
    <div class="kt-slots">${Array.from({length:30},(_,i)=>i+1).map(n=>`<button class="kt-slot${n===cur?' on':''}${slotUsed(n)?' used':''}" data-slot="${n}">${n}</button>`).join('')}</div></div>`;
  document.getElementById('back').onclick=()=>{ try{ localStorage.setItem(SLOT_AT,String(Date.now())); }catch(e){} home(); };
  app.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{ try{ localStorage.setItem(SLOT_AT,String(Date.now())); }catch(e){} switchSlot(+b.dataset.slot); }); }
// 기록 옮기기: 이 기기의 모든 자리 기록을 글자로 꺼내거나 다시 넣는다(브라우저가 저장소를 지웠을 때, 기기를 바꿀 때).
function exportAll(){ const o={}; try{ Object.keys(localStorage).filter(k=>k.startsWith('dotori-')).forEach(k=>o[k]=localStorage.getItem(k)); }catch(e){} return JSON.stringify(o); }
function importAll(txt){ let o; try{ o=JSON.parse(txt); }catch(e){ return false; } if(!o||typeof o!=='object') return false; const ks=Object.keys(o).filter(k=>k.startsWith('dotori-')&&typeof o[k]==='string'); if(!ks.length) return false;
  try{ Object.keys(localStorage).filter(k=>k.startsWith('dotori-')).forEach(k=>localStorage.removeItem(k)); ks.forEach(k=>localStorage.setItem(k,o[k])); }catch(e){ return false; } return true; }
window.KT={slotPage,switchSlot,curSlot,exportAll,importAll,checkPieces,pieceStage,CPL,CPC,MISC,weakPieces,state,gradePage:g=>gradePage(g),startQuick,startDaily,pref,setPref,rec:(q,g,ok)=>(q&&q._e!=null?recEP:rec)(q,g,ok),factKey,dueFacts,startReview,report,status,epKC,MIS,LADDER,regen,formsOf,startDiag,startFocus,teacherPage,course};
(function boot(){ const h=location.hash; const c=cfg();
  if(h==='#kt-share-on'){ c.share=true; did(); setCfg(c); } else if(h==='#kt-share-off'){ c.share=false; W(QK,[]); setCfg(c); } else if(h==='#kt-reset'){ try{ localStorage.removeItem(DK); }catch(e){} did(); }
  if(h.startsWith('#kt-')) history.replaceState(null,'',location.pathname+location.search);
  try{ if(navigator.storage&&navigator.storage.persist) navigator.storage.persist(); }catch(e){}
  let ask=false; try{ const at=+(localStorage.getItem(SLOT_AT)||0); ask=at>0&&Date.now()-at>2*3600e3&&Array.from({length:30},(_,i)=>i+1).filter(slotUsed).length>1; }catch(e){}
  if(h==='#teacher') teacherPage(); else if(ask) slotPage(true); else home(); })();
})();
