
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
try{ window.__ktMap={LADDER,epKC,epsOf}; }catch(e){}   /* 통계 보고서용(analysis/make_catalog.js): 편 → 개념 덩어리, 덩어리의 차례 */

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
const state=()=>Object.assign({kc:{},kn:{},kw:{},em:{},ec:{},ew:{},mis:{},est:{},lvl:null,diagAt:null},J(SK,{}));
function did(){ let v=J(DK,null); if(!v||!/^[0-9a-f-]{36}$/.test(v)){ v=(crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{ const r=crypto.getRandomValues(new Uint8Array(1))[0]&15; return (c==='x'?r:(r&3|8)).toString(16); })); W(DK,v); } return v; }
const clean=s=>String(s==null?'':s).replace(/[①-⑳]/g,c=>String(c.charCodeAt(0)-0x245F)).replace(/[㉠-㉭]/g,c=>'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'[c.charCodeAt(0)-0x3260]).replace(/[^0-9A-Za-z가-힣ㄱ-ㅎ .:,/%°²³+×÷=−\-~()←→↑↓]/g,'').slice(0,24);
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
  if(q._arm&&q._lec&&st.lec&&st.lec[q._lec]){ const L=st.lec[q._lec]; L.mr=[...(L.mr||[]),ok?1:0].slice(0,2); }
  if(!ok){ const ps=m&&MISC[m]; if(ps){ const L0=pieceL(st,ps[0][0]); ps.forEach(([c,w],i)=>up(c,false,i?w*L0:w)); const c0=ps[0][0], hs=st.cph[c0]||(st.cph[c0]=[]); if(fk&&!hs.includes(fk)){ hs.push(fk); st.cph[c0]=hs.slice(-4); } } }
  if(q._probe&&CPC[q._probe]){ const c=q._probe; st.cpo=st.cpo||{}; const fast=ms!=null&&ms<3000;
    if(ok&&!fast){ up(c,true,.5); st.cpo[c]=(st.cpo[c]||0)+1; const d1=CPC[c][2], d2=[...new Set(d1.flatMap(x=>CPC[x]?CPC[x][2]:[]))].filter(x=>x!==c&&!d1.includes(x)); d1.forEach(x=>{ up(x,true,.35); st.cpo[x]=(st.cpo[x]||0)+.5; }); d2.forEach(x=>{ up(x,true,.25); st.cpo[x]=(st.cpo[x]||0)+.5; }); }
    else if(!ok){ st.cpf=st.cpf||{}; st.cpf[c]=1; const ps=m&&MISC[m]; if(!ps||ps[0][0]!==c){ up(c,false,.5); const hs=st.cph[c]||(st.cph[c]=[]); if(fk&&!hs.includes(fk)) hs.push(fk); } } }
  else if(q.mis&&(ms==null||ms>=3000)){ const seen={}; Object.values(q.mis).forEach(code=>(MISC[code]||[]).slice(0,1).forEach(([c])=>{ if(!seen[c]){ seen[c]=1; up(c,true,.1); } })); } }
// 약한 조각: 증거 2번 이상이고 숙달 0.35 미만. 다만 곧바로 "비어 있다"고 하지 않는다.
// 고학년 문제의 오답만으로 저학년 조각이 깎였을 수 있으므로(예: 분수 나눗셈에서만 나누는 수를 바꿈), 먼저 그 조각을 처음 배우는 단원의 문제 2개로 확인한다.
//   확인 중(chk) → 둘 다 맞히면 '맥락에서만 틀림(ctx)'으로 두고 숙달을 0.6으로 되돌림 / 하나라도 틀리면 '비어 있음(weak)' 확정.
//   ctx가 된 뒤 다시 약해지면 확인 없이 확정.
// '약함'의 조건: 그 조각을 가리키는 오답을 서로 다른 문항 2종 이상에서 골랐고 숙달이 0.35 미만.
const fkGrade=fk=>{ const ep=String(fk).split(':')[0]; if(/^EP/.test(ep)) return 1; const u=UNITS36[uix(ep)]; return u?gradeOfUnit(u):9; };
/* 찌르기(탐색): 제 학년 아래 조각 가운데 직접 확인된 적 없는 것을 그물의 꼭대기부터 묻는다. 맞히면 그 아래 두 단계까지 함께 확인된 것으로 치고, 틀리면 꼭대기가 빠져 그 아래 조각이 다음 꼭대기가 된다. */
function probePool(st){ const b=pref().band||3, po=st.cpo||{}, hs=st.cph||{}, cv=st.cpv||{};
  const base=Object.keys(CPC).filter(c=>+CPC[c][1][0]<b&&(po[c]||0)<1&&pieceL(st,c)<.8&&(hs[c]||[]).length<2&&!cv[c]&&codesOfPiece(c).some(code=>formsOf(code).length)); const inB=new Set(base), pf=st.cpf||{};
  return base.filter(c=>!(pf[c]&&CPC[c][2].some(x=>inB.has(x)))); }   /* 찔러서 틀린 조각은 그 아래 조각을 다 살핀 뒤에 다시 묻는다 */
function probeTops(st){ const pool=probePool(st), inP=new Set(pool); const under=c=>{ const d1=CPC[c][2], d2=d1.flatMap(x=>CPC[x]?CPC[x][2]:[]); return new Set([...d1,...d2].filter(x=>inP.has(x))).size; };
  const pf=Object.keys(st.cpf||{}).filter(c=>CPC[c]&&!((st.cpo||{})[c]>=1)), hot=new Set(pf.flatMap(c=>{ const d1=CPC[c][2]; return [...d1,...d1.flatMap(x=>CPC[x]?CPC[x][2]:[])]; }));   /* 찔러서 틀린 갈래를 먼저 파 내려간다 */
  return pool.filter(c=>!pool.some(d=>CPC[d][2].includes(c))).map(c=>[under(c)+(hot.has(c)?10:0)+Math.random()*.5,c]).sort((a,b)=>b[0]-a[0]).map(x=>x[1]); }
/* 11/23: 아래 학년 개념을 확인하는 문제라도, 문제 자체는 아이 학년까지의 편에서만 고른다(4학년에게 6학년 '원의 둘레' 문제가 확인용으로 나오던 것 막음). */
function probeLim(){ const P=pref(); return P.gr?Math.max(3,P.band||3):((P.band||3)+1); }
function epGradeOf(ep){ try{ const u=UNITS36[uix(ep)]; return u?+((u.title.match(/^(\d)-/)||[0,u.grade])[1]):9; }catch(e){ return 9; } }
function probeQ(st,c){ let best=null, bv=-1; const lim=probeLim(); for(const {f,code} of shuffle(codesOfPiece(c).flatMap(code=>formsOf(code).map(f=>({f,code}))).filter(x=>epGradeOf(x.f.ep)<=lim)).slice(0,8)){ for(let t=0;t<4;t++){ let q; try{ q=G36[f.ep][f.i](); }catch(e){ break; }
      if(q&&!q.manip&&!q.onMount&&q.mis&&Object.values(q.mis).includes(code)){ q._ep=f.ep; q._ti=f.i; const v=qInfo(q,st); if(v>bv){ bv=v; best=q; } break; } } }
  if(best) best._probe=c; return best; }
function pieceStage(st,c){ st.cpv=st.cpv||{}; const cp=st.cp||{}, hs=(st.cph||{})[c]||[]; const low=CPC[c]&&hs.length>=2&&cp[c]<.35; const v=st.cpv[c];
  if(!low) return v&&v.s==='ctx'?'ctx':null; if(v&&v.s==='ctx'){ if(v.left>0) return 'ctx'; st.cpv[c]={s:'weak'}; return 'weak'; }
  if(!v){ const g0=+CPC[c][1][0], upper=hs.some(fk=>fkGrade(fk)>g0), has=codesOfPiece(c).some(code=>MISC[code].length===1&&formsOf(code).length);
    st.cpv[c]=(upper&&has)?{s:'chk',ok:0,lose:0}:{s:'weak'}; return st.cpv[c].s; }                 // 제 학년 문제에서 틀린 것이면 확인 없이 확정
  return v.s; }
// 확인 문제 판정: 2번 맞히면 통과(윗학년 맥락에서만 틀림), 그 조각의 오개념 보기를 고르면 바로 확정, 다른 까닭으로 틀리면 한 문제 더(3판 2선승). 2초 안에 맞힌 것은 찍은 것으로 보고 세지 않는다.
function pieceCheck(st,q,ok,m,ms){ const c=q._chk; if(!c) return; st.cpv=st.cpv||{}; const v=st.cpv[c]; if(!v||v.s!=='chk') return;
  if(ok){ if(ms==null||ms>=2000) v.ok++; } else if(m&&MISC[m]&&MISC[m][0][0]===c){ st.cpv[c]={s:'weak'}; return; } else v.lose++;
  if(v.ok>=2){ st.cpv[c]={s:'ctx',left:10}; st.cp[c]=.65; st.cph[c]=[]; } else if(v.lose>=2) st.cpv[c]={s:'weak'}; }
// 통과한 조각(ctx)은 그 뒤 윗학년 문제에서 같은 오답이 나와도 10번까지는 아랫학년 조각을 깎지 않는다(확인 → 복원 → 다시 추락의 되풀이를 막음).
function ctxShield(st,m,fk){ const ps=m&&MISC[m]; if(!ps) return false; const c=ps[0][0], v=(st.cpv||{})[c]; if(!v||v.s!=='ctx'||!(v.left>0)||fkGrade(fk)<=+CPC[c][1][0]) return false; v.left--; return true; }
function weakPieces(st,all){ const own=!st; st=st||state(); const cp=st.cp||{}; const rows=Object.keys(cp).filter(c=>CPC[c]).map(c=>({c,name:CPC[c][0],when:CPC[c][1],L:cp[c],s:pieceStage(st,c)})).filter(x=>x.s);
  if(own) W(SK,st); const weak=rows.filter(x=>x.s==='weak').map(x=>x.c); rows.forEach(x=>x.pre=CPC[x.c][2].filter(p=>weak.includes(p)));
  const ord=x=>+x.when.replace('-','.'); return rows.filter(x=>all||x.s==='weak').sort((a,b)=>a.pre.length-b.pre.length||ord(a)-ord(b)); }
const checkPieces=st=>weakPieces(st,true).filter(x=>x.s==='chk');
// 공개 데이터에 더 싣는 칸: 보기에 있던 오개념 코드들(보기별 무게를 다시 추정하는 데 꼭 필요), 푸는 방식, 세트 안 순서, 다시 나온 문제인지.
// 쓰기형 답은 아이가 이름·전화번호를 적을 수 있으므로, 숫자와 기호가 아니거나 12자를 넘으면 내보내지 않는다.
const maskG=(q,g)=>(q.opts&&q.opts.length)||q.manip?g:(/^[0-9\-−.\/: ]{0,12}$/.test(String(g))?g:'STR');
function recExtra(q){ let mode='u'; try{ mode=q._arm?q._arm:q._chk?'k':q.diag?'g':q._probe?'p':q._follow?'n':S.focus?'f':S.kt==='daily'?'d':S.kt==='quick'?'q':S.review?'r':'u'; }catch(e){}
  const ex=[...new Set(Object.values(q.mis||{}).filter(c=>c&&/^([NRGD]\d-\d{2}|F)$/.test(c)))].sort().slice(0,4).join('|'); let seq=0; try{ seq=Math.max(0,Math.min(99,S.i|0)); }catch(e){}
  /* 받은 도움(처방 효과를 보려면 필요): v 그림과 함께 나온 문제, e 갇혀서 선수 내용으로 바꿔 낸 문제 */ let help=''; try{ if(q._svShown||(q._cpaPic&&q._svShown!==0)) help+='v'; if(q._eased) help+='e'; }catch(e){}
  return [ex,mode,seq,q._review?1:0,q.manip?'m':(q.opts&&q.opts.length)?'c':'w',help]; }
function rec(q, given, ok){
  if(!q||q._kt) return; q._kt=1;
  const ep=q._ep||(S&&S.ep)||''; if(!/^S\d-\d{1,3}$/.test(String(ep))) return;       // 3~6학년 영역 문항만
  const gk=/^\d+$/.test(String(given))?String(+given):String(given);
  const m=ok?null:((q.mis&&(q.mis[String(given)]||q.mis[gk]))||q._mcode||null);
  /* 이어 묻기: 쓰기·조작 문제를 틀렸는데 어떤 오개념인지 알 수 없으면, 바로 다음 문제를 같은 단원의 보기 촘촘한 객관식으로 바꿔 원인을 가른다(세트당 2번까지). */
  if(!ok&&!m&&(q.manip||!(q.opts&&q.opts.length>1))&&S&&S.acts&&!S.diagRun&&!q._follow&&(S.fol||0)<2){ try{ const nx=S.acts[S.i+1]; if(nx&&nx.kind==='q'&&nx.q&&!nx.q._probe&&!nx.q._arm&&!nx.q._chk&&!nx.q._follow){ const k0=epKC(ep), okQ=x=>x.opts&&x.opts.length>=4&&x.mis&&Object.keys(x.mis).length>=2, f=bestQ([ep],okQ)||bestQ(shuffle(epsOf(k0).filter(e=>e!==ep)).slice(0,4),okQ); if(f){ f._follow=1; nx.q=f; S.fol=(S.fol||0)+1; } } }catch(e){} }
  const ti=q._ti==null?-1:q._ti, v=q._v||0, fk=`${ep}:${ti}:${v}`, kc=epKC(ep);
  const ms=q._t0?Math.min(600000,Date.now()-q._t0):0;
  const r={d:today(),ep,ti,v,sd:q._seed==null?0:q._seed,g:clean(given),ok:ok?1:0,m,ms,dg:q.diag?1:0};
  if(!ok) r.qt=plain(q.q).slice(0,70);                                                 // 교사 화면용(기기 안에만 남음)
  const log=J(LK,[]); log.push(r); W(LK,log.slice(-3000));
  const st=state();
  const nOpt=(q.opts&&q.opts.length)||0, G=nOpt?1/nOpt:.05;
  // 보기마다 무게가 다르다: 오개념 보기를 골랐으면 원인은 그 오개념이 가리키는 개념 조각에 있으므로 단원 숙달은 약하게, 조각은 세게 깎는다.
  const shield=!ok&&ctxShield(st,m,fk);
  const wk=ok?1:shield?.7:(m&&MISC[m])?.4*pieceL(st,MISC[m][0][0])+.1:(q.fx&&(q.fx[String(given)]||q.fx[gk]))?.3:.7;   // 선수 조각이 이미 비어 있으면 이 단원 숙달은 덜 깎는다
  if(kc){ st.kc[kc]=bktW(st.kc[kc]==null?BKT.L0:st.kc[kc],ok,G,wk); st.kn[kc]=(st.kn[kc]||0)+1; if(ok&&!nOpt){ st.kw=st.kw||{}; st.kw[kc]=(st.kw[kc]||0)+1; }
    /* 편(학습 요소)마다 따로 추적: 단원 숙달도만 보면 쉬운 편만 맞혀도 단원이 숙달이 된다 */ st.em=st.em||{}; st.ec=st.ec||{}; st.em[ep]=bktW(st.em[ep]==null?BKT.L0:st.em[ep],ok,G,wk); if(ok){ st.ec[ep]=(st.ec[ep]||0)+1; if(!nOpt){ st.ew=st.ew||{}; st.ew[ep]=(st.ew[ep]||0)+1; } } }
  touchSlot(); if(!shield) pieceUpdate(st,q,m,ok,G,ms,fk); pieceCheck(st,q,ok,m,ms);
  if(q.mis){ for(const c of new Set(Object.values(q.mis))){ const e=st.mis[c]||(st.mis[c]={h:[],n:0,ep:[]}); e.h.push([fk,c===m?1:0,ok?1:0,nOpt||20]); e.h=e.h.slice(-8);
    if(c===m){ e.n++; if(!e.ep.includes(ep)) e.ep.push(ep); e.ep=e.ep.slice(-5); } } }
  W(SK,st);
  afterRec(q,given,ok,m);
  if(cfg().share&&KT_ENDPOINT&&dayRoom(ms)){ const qu=J(QK,[]); qu.push([r.d,ep,ti,v,r.sd,maskG(q,r.g),r.ok,m,ms,r.dg,...recExtra(q)]); W(QK,qu.slice(-3000)); }
}
// 최근 8번의 기회(그 오개념의 오답이 보기에 있던 문제) 안에서 판정한다. 기록 한 칸 = [문항, 그 오답을 골랐나, 맞혔나].
// 확인: 서로 다른 문항 2종 이상에서 3번 이상 골랐고, 그 횟수가 찍어서 나올 횟수보다 뚜렷이 많을 때(기댓값 + 표준편차의 2배 이상). 대체로 맞히는 아이는 틀린 문제만 놓고 같은 방식으로 본다.
// 의심: 2종 이상에서 2번. 해소: 그 오답이 있던 문제를 3번 이어서 맞힘(다른 오답을 고른 것은 해소가 아님).
function status(code,st){ const e=(st||state()).mis[code]; if(!e||!e.h||!e.h.length) return null; const h=e.h, picks=h.filter(x=>x[1]), K=picks.length, distinct=new Set(picks.map(x=>x[0])).size;
  const last3=h.slice(-3); if(last3.length===3&&last3.every(x=>x[2]===1)) return null;
  if(MISC[code]&&pieceL(st||state(),MISC[code][0][0])>=.75) return null;                 // 그 오개념이 가리키는 조각이 채워졌으면 해소
  if(distinct<2||K<2) return null;
  // 보기 수가 문항마다 다르므로(3~5지선다, 쓰기·조작은 20으로 침) "찍어서 그 보기를 고를 횟수"의 기댓값과 분산을 문항별로 더해 견준다.
  const m=x=>x[3]||3; let E1=0,V1=0; h.forEach(x=>{ const p=1/m(x); E1+=p; V1+=p*(1-p); });
  const wrong=h.filter(x=>x[1]||x[2]===0); let E2=0,V2=0; wrong.forEach(x=>{ const q=1/Math.max(1,m(x)-1); E2+=q; V2+=q*(1-q); });
  const acc=(h.length-wrong.length)/h.length, z1=K>E1?(K-E1)*(K-E1):0, z2=K>E2?(K-E2)*(K-E2):0;
  if(K>=3&&(z1>=4*V1||(acc>=.4&&wrong.length>=3&&z2>=4*Math.max(V2,.01)))) return '확인';
  return z1>=V1?'의심':null; }
// 문제 3개 미만으로는 숙달·미숙달을 단정하지 않는다.
function kcStatus(k,st){ const p=st.kc[k], n=(st.kn||{})[k]||0; if(p==null) return st.est[k]?'추정':'모름'; if(n<3) return p>=.4&&st.est[k]?'추정':'연습'; /* 숙달 판정(11/22, 카본과 맞춤): 단원 숙달도(단원 BKT)만으로는 쉬운 편만 맞혀도 숙달이 되고, 3지선다 3번이면 0.94가 된다.
     편 통과 = 그 편에서 2번 이상 정답(그중 한 번은 직접 쓰거나 조작한 답; 고르기 문제뿐인 편은 3번) + 편 숙달도 0.65 이상
     단원 숙달 = 모든 편 통과 + 편 숙달도 평균 0.8 이상 */
  if(n>=3&&epHoles(k,st).length===0&&kcMean(k,st)>=.8) return '숙달'; return p>=.4?'연습':'미숙달'; }
let _EPW=null; function epHasWrite(ep){ if(!_EPW) _EPW={}; if(_EPW[ep]==null){ let w=0; for(const g of (G36[ep]||[])){ try{ const q=g(); if(q&&(q.manip||q.onMount||!(q.opts&&q.opts.length))){ w=1; break; } }catch(e){} } _EPW[ep]=w; } return _EPW[ep]; }
function epPass(e,st){ const c=(st.ec||{})[e]||0, w=(st.ew||{})[e]||0, m=(st.em||{})[e]; return m!=null&&m>=.65&&(epHasWrite(e)?(c>=2&&w>=1):c>=3); }
function kcMean(k,st){ const eps=epsOf(k).filter(e=>(G36[e]||[]).length); if(!eps.length) return 0; return eps.reduce((a,e)=>a+((st.em||{})[e]??.3),0)/eps.length; }
/* 단원 안에서 아직 통과하지 못한 편 */
function epHoles(k,st){ return epsOf(k).filter(e=>(G36[e]||[]).length&&!epPass(e,st)); }
/* 단원에서 다음에 낼 편: 구멍인 편 먼저(앞 편부터), 없으면 편 숙달도가 낮은 쪽 */
function nextEp(k,st){ const eps=epsOf(k).filter(e=>(G36[e]||[]).length); if(!eps.length) return null; const h=epHoles(k,st); if(h.length) return h[Math.random()<.75?0:Math.floor(Math.random()*h.length)]; const em=st.em||{}; return eps.slice().sort((a,b)=>(em[a]??.3)-(em[b]??.3))[Math.floor(Math.random()*Math.min(3,eps.length))]; }
function report(){ const st=state(); const mis=Object.keys(st.mis).map(c=>({c,s:status(c,st),n:st.mis[c].n,ep:st.mis[c].ep||[]})).filter(x=>x.s&&MIS[x.c]).sort((a,b)=>(a.s==='확인'?0:1)-(b.s==='확인'?0:1)||b.n-a.n);
  return {mis, kc:Object.keys(KCN).map(k=>({k,s:kcStatus(k,st),p:st.kc[k]}))}; }

/* ---------- 8. 수준 찾기(첫 진단) ---------- */
const CAST=['도토','대롱이','부엉 박사님','붕붕이'];
/* 가장 큰 원칙(교수님, 2026-11-20): 문제 하나를 풀 때마다 가장 많은 개념 정보를 얻고, 적은 표본으로 결손을 찾아낸다.
   그래서 문제를 아무거나 뽑지 않고 '지금 이 아이에 대해 가장 많이 알려 줄 문제'를 뽑는다.
   정보량 = 단원 숙달의 불확실함 × (1 − 찍어서 맞힐 확률) + 보기에 든 오개념이 가리키는 조각마다의 불확실함.
   불확실함은 숙달이 0.5에 가까울수록 크다(이미 아는 것, 이미 모른다고 확인된 것은 다시 물어도 얻는 것이 적다). */
const H2=p=>{ p=Math.min(.98,Math.max(.02,p)); return -(p*Math.log2(p)+(1-p)*Math.log2(1-p)); };
// 이 아이가 이 문제에 어떻게 답할지를 먼저 어림한다: 맞힐 확률은 단원 숙달에서, 틀릴 때 어느 오답으로 갈지는 그 오답이 가리키는 조각이 빈 정도에 비례.
// 정보량은 그 답 분포의 엔트로피다. 보기는 하나만 고를 수 있으므로 조각별 불확실함을 그냥 더하지 않고, 고를 가능성이 거의 없는 보기는 저절로 값이 작아진다.
// 코드 없는 오답들은 한 칸("그 밖")으로 묶는다(골라도 어느 개념이 비었는지 알려 주지 않으므로).
// 선수 조각이 이미 '비어 있음'으로 확정된 아이에게 그 위의 문제를 내면 틀릴 것이 뻔하므로 값을 크게 깎는다.
function qInfo(q,st){ st=st||state(); const kc=epKC(q._ep), n=(q.opts&&q.opts.length)||0, G=n?1/n:.05, L=_clip(kc&&st.kc[kc]!=null?st.kc[kc]:BKT.L0);
  const pc=L*(1-BKT.S)+(1-L)*G, byPiece={}; let other=0, nUn=0; const mis=q.mis||{};
  if(n){ for(const o of q.opts){ const k=String(o); if(k===String(q.ans)) continue; const c=mis[k]; if(c&&MISC[c]){ const pz=MISC[c][0][0]; byPiece[pz]=(byPiece[pz]||0)+(1-pieceL(st,pz))+.05; } else { other+=.15; nUn++; } } }
  else { Object.values(mis).forEach(c=>{ if(MISC[c]){ const pz=MISC[c][0][0]; byPiece[pz]=(byPiece[pz]||0)+(1-pieceL(st,pz))+.05; } }); other=.5; }
  const tot=Object.values(byPiece).reduce((a,b)=>a+b,0)+other||1, ps=[pc,...Object.values(byPiece).map(w=>(1-pc)*w/tot),(1-pc)*other/tot].filter(x=>x>1e-6);
  let H=-ps.reduce((a,x)=>a+x*Math.log2(x),0);
  const cv=st.cpv||{}, weak=c=>cv[c]&&cv[c].s==='weak'; const pcs=Object.keys(byPiece);
  if(pcs.some(c=>CPC[c]&&CPC[c][2].some(weak))) H*=.3;            // 선수 조각이 비어 있음: 이 문제는 뒤로
  return H; }
// 여러 편의 틀을 하나씩 만들어 보고 정보량이 큰 것 가운데서 고른다(늘 같은 문제가 나오지 않게, 가장 큰 것의 80% 이상인 것 중에서 뽑음).
function bestQ(eps,ok,st){ st=st||state(); const cs=[]; for(const ep of eps){ const seen=new Set(); (G36[ep]||[]).forEach((g,i)=>{ if(seen.has(g)||cs.length>60) return; seen.add(g); for(let t=0;t<2;t++){ let q; try{ q=g(); }catch(e){ return; }
      if(!q||q.manip||q.onMount) return; if(ok&&!ok(q)) continue; q._ep=ep; q._ti=i; cs.push([qInfo(q,st),q]); return; } }); }
  if(!cs.length) return null; cs.sort((a,b)=>b[0]-a[0]); const top=cs.filter(x=>x[0]>=cs[0][0]*.8).slice(0,4); return top[Math.floor(Math.random()*top.length)][1]; }
function pickForKC(kc){ return bestQ(shuffle(epsOf(kc).slice()),q=>q.write||(q.opts&&q.opts.length>=3)); }
/* 내 수준 찾기(다시 짬): 단원 사다리를 반씩 좁히던 것을 버리고, 매 문제 "지금 가장 많이 알려 줄 문제"를 고른다.
   - 후보: 고른 학년대와 그 앞뒤 한 학년의 모든 편. 한 편은 한 번만, 같은 조각은 세 번까지만.
   - 답할 때마다 단원·조각·오개념이 갱신되고(rec), 거기에 더해 같은 영역의 앞뒤 단원으로 약하게 번진다:
     맞히면 그보다 앞 단원이 올라가고, 틀리면 그보다 뒤 단원이 내려간다(멀수록 약하게, 직접 물어본 단원은 건드리지 않음).
   - 12문제, 또는 6문제 뒤 남은 문제의 정보량이 작아지면 끝. */
const DIAG_N=12;
function diagEps(){ const b=pref().band||3, lo=Math.max(3,b-1), hi=Math.min(6,b+1); return UNITS36.filter(u=>{ const g=gradeOfUnit(u); return g>=lo&&g<=hi; }).flatMap(u=>u.eps); }
function diagApply(){ const D=S.diagRun; if(!D.cur||D.cur.done) return; D.cur.done=1; const ok=!!S.results[D.cur.i], kc=epKC(D.cur.ep); if(!kc) return; const st=state(), Ld=LADDER[kc[1]]||[], idx=Ld.indexOf(kc); if(idx<0) return;
  D.asked[kc]=1; const R=D.res[kc]=D.res[kc]||[0,0]; R[ok?0:1]++; for(let k=0;k<Ld.length;k++){ if(k===idx||D.asked[Ld[k]]) continue; const d=Math.abs(k-idx)-1, cur=st.kc[Ld[k]]==null?BKT.L0:st.kc[Ld[k]];
    if(ok&&k<idx) st.kc[Ld[k]]=bktW(cur,true,1/3,.6*Math.pow(.8,d)); else if(!ok&&k>idx) st.kc[Ld[k]]=bktW(cur,false,1/3,.5*Math.pow(.8,d)); }
  W(SK,st); }
/* 영역마다 '맞힌 가장 높은 단원(lo)'과 '틀린 가장 낮은 단원(hi)' 사이를 반씩 좁힌다. 어느 단원을 물을지는 이 틈이, 그 단원의 어떤 문제를 낼지는 정보량이 정한다. */
function diagGap(sd){ const D=S.diagRun, Ld=LADDER[sd], av=[]; Ld.forEach((kc,k)=>{ if(!D.skip[kc]&&epsOf(kc).some(e=>D.eps.includes(e))) av.push(k); }); if(!av.length) return null;
  let lo=av[0]-1, hi=av[av.length-1]+1; Ld.forEach((kc,k)=>{ const R=D.res[kc]; if(R&&R[0]>0&&R[0]>=R[1]&&k>lo) lo=k; }); Ld.forEach((kc,k)=>{ const R=D.res[kc]; if(R&&R[1]>R[0]&&k>lo&&k<hi) hi=k; });
  const mid=av.filter(k=>k>lo&&k<hi); return {sd,lo,hi,mid,Ld}; }
function diagTarget(){ const D=S.diagRun, gs=Object.keys(LADDER).map(diagGap).filter(Boolean), open=gs.filter(g=>g.mid.length);
  if(open.length){ open.sort((a,b)=>b.mid.length-a.mid.length||Math.random()-.5); const g=open[0], c=(g.lo+g.hi)/2; return g.Ld[g.mid.slice().sort((a,b)=>Math.abs(a-c)-Math.abs(b-c))[0]]; }
  const re=gs.map(g=>g.Ld[g.hi]).filter(kc=>kc&&D.res[kc]&&D.res[kc][1]===1&&D.res[kc][0]===0&&!D.re[kc]);   /* 틈이 다 닫혔으면: 한 번 틀린 경계 단원을 한 번 더(실수였는지) */
  if(re.length){ D.re[re[0]]=1; return re[0]; }
  const st=state(), hs=[]; gs.forEach(g=>g.Ld.forEach((kc,k)=>{ if(k<g.lo&&!D.res[kc]&&!D.skip[kc]&&epsOf(kc).some(e=>D.eps.includes(e))) hs.push([st.kc[kc]==null?BKT.L0:st.kc[kc],Math.random(),kc]); }));   /* 남는 문제로는 수준 아래에서 한 번도 안 물은 단원(구멍 후보)을 숙달이 낮은 것부터 */
  if(hs.length){ hs.sort((a,b)=>a[0]-b[0]||a[1]-b[1]); return hs[0][2]; } return null; }
function diagNext(){ const D=S.diagRun; diagApply(); if(S.i>=DIAG_N){ S.acts.length=S.i; return false; } const st=state(); let q=null;
  for(let t=0;t<8&&!q;t++){ const kc=diagTarget(); if(!kc) break; const es=epsOf(kc).filter(e=>D.eps.includes(e)), un=es.filter(e=>!D.used[e]);
    q=bestQ(shuffle(un.length?un:es),q=>q.write||(q.opts&&q.opts.length>=3),st); if(!q) D.skip[kc]=1; }
  if(!q){ S.acts.length=S.i; return false; }
  { const b=pref().band||3, cnt={}; Object.values(q.mis||{}).forEach(c=>{ const z=MISC[c]&&MISC[c][0][0]; if(z&&CPC[z]&&+CPC[z][1][0]<b) cnt[z]=(cnt[z]||0)+1; }); const z=Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x])[0]; if(z) q._probe=z; }   /* 수준을 찾는 문제가 아래 학년 조각도 함께 확인하게 한다 */
  D.used[q._ep]=1; q.diag=1; D.cur={i:S.i,ep:q._ep}; S.acts[S.i]={kind:'q',q}; S.ep=q._ep; S.ui=uix(q._ep); return true; }
function startDiag(){ if(!pref().band||pref().band<3) setPref({band:3});
  S={mode:'ep36',retry:true,diagRun:{eps:diagEps(),used:{},pc:{},asked:{},res:{},skip:{},re:{},cur:null},ep:'S2-01',ui:0,ch:0,steps:[{kind:'acts'}],si:0,acts:Array.from({length:DIAG_N},()=>({kind:'q',q:null})),i:0,results:[],tries:0,counted:0,title:'내 수준 찾기',saveKey:'RETRY',chars:CAST};
  if(diagNext()) step(); else home(); }
function diagDone(){ diagApply(); const st=state(); st.lvl={}; Object.keys(LADDER).forEach(sd=>{ const Ld=LADDER[sd]; const g=diagGap(sd), k=g?g.lo+1:0;   /* 수준 = 맞힌 가장 높은 단원까지 */ st.lvl[sd]=k; Ld.slice(0,k).forEach(x=>{ const R=S.diagRun.res[x]; if(R&&R[1]>R[0]) return; st.est[x]=1; if((st.kc[x]==null?BKT.L0:st.kc[x])<.55) st.kc[x]=.55; }); }); st.diagAt=today(); W(SK,st);
  const cp=st.cp||{}, good=Object.keys(cp).filter(c=>CPC[c]&&cp[c]>=.6).length, chk=checkPieces(st).length, weak=weakPieces(st).length, low=Object.keys(cp).filter(c=>CPC[c]&&cp[c]<.35).length;
  S={idle:true}; hush(); app.className='wrap';
  app.innerHTML=`<div class="stage"><div style="font-family:Jua;font-size:1.3rem;margin-bottom:8px">수준 찾기 끝! 이제 내 수준에 맞는 문제가 나와요.</div><p class="kt-ex" style="margin-bottom:14px">잘 아는 개념 ${good}개 · 더 살펴볼 개념 ${Math.max(low,chk+weak)}개</p><div class="btns"><button class="next" id="kt-go">오늘의 문제 풀기</button><button class="ghost" id="kt-home">처음으로</button></div></div>`;
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
  if(st.lvl) for(const s of Object.keys(LADDER)){ const cg=window._capG?window._capG():9, kc=LADDER[s].find(k=>+((k.match(/^K[A-Z](\d)/)||[])[1]||0)<=cg&&!['숙달','추정'].includes(kcStatus(k,st))); if(!kc) continue;
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
      ${(n=>((pref().band||0)>=3)?`<p class="kt-empty">아래 학년 개념 가운데 아직 직접 확인하지 못한 것: <b>${n}개</b>${n?' · 오늘의 문제에 두세 문제씩 섞어 확인합니다.':' · 모두 확인했습니다.'}</p>`:'')(probePool(state()).length)}
      <h2 class="sec">비어 있는 개념</h2><ul class="recent kt-list">${(w=>w.length?w.map(x=>`<li><b>${esc(x.name)}</b> <span class="rd">${x.when.replace('-','학년 ')}학기에 처음 배움${x.pre.length?' · 먼저 '+x.pre.map(p=>CPC[p][0]).join(', '):''}</span><div class="kt-ex">강의: ${(CPL[x.c]||[]).map(k=>`${k} ${esc(lecName(k))}${lecHas(k)?'':'(준비 중)'}`).join(', ')}</div></li>`).join(''):'<li>아직 비어 있다고 볼 개념이 없습니다.</li>')(weakPieces(st))}${weakPieces(st,true).filter(x=>x.s!=='weak').map(x=>`<li><b>${esc(x.name)}</b> <span class="rd">${x.s==='chk'?'확인 중: 처음 배우는 단원의 문제 2개로 다시 봅니다':'처음 배우는 단원에서는 맞힘. 윗학년 문제에서만 틀립니다'}</span></li>`).join('')}</ul>
      <p class="kt-ex">오답 보기마다 "이 답을 고르면 어떤 개념을 모르는 것"인지와 그 무게를 정해 두었습니다. 같은 개념을 가리키는 오답이 두 번 이상 쌓이면 여기에 나옵니다. 위에 있을수록 먼저 채워야 하는 개념입니다.</p>
${(L=>{ const ks=Object.keys(L).filter(c=>CPC[c]&&(L[c].mr||[]).length); return ks.length?`<h2 class="sec">강의와 문제의 순서</h2><ul class="recent kt-list">${ks.map(c=>`<li><b>${esc(CPC[c][0])}</b> <span class="rd">${L[c].arm==='A'?'강의 먼저':'문제 먼저'} · 바로 뒤 두 문제 ${L[c].mr.filter(x=>x).length}/${L[c].mr.length}${L[c].k?' · '+L[c].k:''}</span></li>`).join('')}</ul><p class="kt-ex">비어 있는 개념이 확정되면 절반은 강의부터, 절반은 문제부터 봅니다(모두 강의는 봄). 바로 뒤 두 문제의 결과를 견주면 강의가 실제로 도움이 되는지 알 수 있습니다.</p>`:''; })(st.lec||{})}
      <h2 class="sec">자주 틀리는 단순 지식 (1~2학년)</h2><ul class="recent kt-list">${factsHTML()}</ul>
      <p class="kt-ex">틀리면 같은 세트 뒤쪽에 한 번 더 나오고, 그 뒤 10분 → 다음 날 → 3일 간격으로 다시 나옵니다. 네 번 이어서 맞히면 익힘으로 바뀝니다.</p>
      <h2 class="sec">영역별 수준 (3~6학년)</h2>${lad}
      <p class="kt-ex">숙달·미숙달은 문제를 3개 이상 푼 뒤에만 표시합니다. 추정은 수준 찾기에서 맞혔거나 더 어려운 내용을 맞혀 건너뛴 내용입니다.</p>
      <h2 class="sec">추천 코스</h2><ul class="recent kt-list">${cr||'<li>추천할 내용이 없습니다.</li>'}</ul>
      <div class="btns" style="margin-top:14px"><button class="ghost" id="kt-rediag">수준 다시 찾기</button><button class="ghost" id="kt-reset">${slotName(curSlot())||'이 기기'}의 학습 기록 지우기</button></div>
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
.kt-mode{align-items:center;text-align:center;padding-left:calc(14px + 4%)}.kt-modes:has(.who){margin-top:42px}.kt-mode b{text-shadow:0 1px 0 rgba(255,255,255,.75)}
.kt-mode .who{position:absolute;right:4px;top:-34px;height:68px;pointer-events:none}
.kt-mode .stamp{position:absolute;right:14px;bottom:12px;transform:rotate(-8deg);border:2px solid #3F7A34;border-radius:7px;padding:0 7px;font-style:normal;font-size:.8rem;color:#3F7A34}
.kt-mode:active{transform:translateY(3px);filter:none}.kt-mode:focus-visible,.kt-tree:focus-visible,.kt-chip:focus-visible{outline:3px solid #3F7A34;outline-offset:3px}
.kt-faces{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:6px 0 14px}.kt-faces.small{grid-template-columns:repeat(4,1fr);gap:8px}.kt-pick{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 2px;border:0;background:none;cursor:pointer;font-family:"Jua",sans-serif;color:var(--ink)}.kt-pick b{font-weight:400;font-size:.95rem}.kt-pick.on .kt-face{outline:3px solid #3F7A34;outline-offset:2px}.kt-pick:focus-visible{outline:3px solid #3F7A34;border-radius:14px}
.kt-face.tiny{width:34px;height:34px;border-width:2px}.kt-face.tiny img{height:30px;margin-bottom:-2px}
#kt-me{position:fixed;top:calc(10px + env(safe-area-inset-top));right:10px;z-index:900;display:flex;align-items:center;gap:6px;padding:4px 12px 4px 4px;border:2px solid #7A4A1E;border-radius:999px;background:#FFF8EC;box-shadow:0 3px 0 rgba(90,53,22,.22);font-family:"Jua",sans-serif;font-size:1rem;color:#5A3516;cursor:pointer}
#kt-me b{font-weight:400;white-space:nowrap}
#kt-me.inrow{position:static;margin-left:auto;flex:0 0 auto;box-shadow:none}
.top .dots{flex-wrap:nowrap;min-width:0;gap:clamp(2px,1vw,5px)}.top .dots .dot{flex:0 1 12px;min-width:5px}.top .dots .dot.now{flex:0 1 26px}
.top .crumb{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
#kt-me.inrow+.speak,#kt-me.inrow+#speak{margin-left:6px}
#kt-me.face{padding:3px;gap:0}#kt-me.face b{display:none}#kt-me.face .kt-face.tiny{width:34px;height:34px;margin:0}#kt-me.face .kt-face.tiny img{height:30px}
@media print{#kt-me{display:none}}
.kt-face{display:grid;place-items:end center;width:72px;height:72px;border-radius:46% 54% 50% 50%/52% 48% 52% 48%;background:var(--fc);border:3px solid #7A4A1E;overflow:hidden}.kt-face img{height:62px;margin-bottom:-4px}.kt-faces.small .kt-face{width:60px;height:60px}.kt-faces.small .kt-face img{height:52px}.kt-face.tiny{display:inline-grid;width:26px;height:26px;border-width:2px;vertical-align:-7px;margin-right:4px}.kt-face.tiny img{height:22px;margin-bottom:-2px}
.kt-hometop{position:sticky;top:0;z-index:50;justify-content:flex-end;margin:-6px -4px 8px;padding:calc(6px + env(safe-area-inset-top)) 4px 6px;background:#FFF7EC}
.kt-hometop #kt-me.inrow{margin-left:8px}.kt-gear{order:-1;margin-left:auto;padding:6px 14px;border:2px solid #7A4A1E;border-radius:999px;background:#FFF8EC;font-family:"Jua",sans-serif;font-size:1rem;color:#5A3516;cursor:pointer}
.kt-main{margin:40px 0 12px}.kt-mode.kt-big{width:100%;min-height:132px}.kt-mode.kt-big b{font-size:clamp(1.7rem,7vw,2.2rem)}.kt-mode.kt-big .who{height:84px;top:-46px;right:8%}
.kt-small{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:0 0 14px}.kt-small.three{grid-template-columns:repeat(3,1fr)}
.kt-mode.kt-sm{min-height:86px;padding:14px 6px 12px calc(6px + 4%)}.kt-mode.kt-sm b{font-size:clamp(1rem,4.3vw,1.2rem)}.kt-mode.kt-sm span{font-size:.76rem}
.kt-set{text-align:left}.kt-setrow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 4px;border-bottom:2px dashed #E3CFA8}.kt-setrow>span{font-family:"Jua",sans-serif;font-size:1.1rem;color:#5A3516}.kt-setrow>div{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.kt-opt{padding:7px 12px;border:2px solid #C9A77A;border-radius:12px;background:#fff;font-family:"Jua",sans-serif;font-size:.95rem;color:#7B5632;cursor:pointer}.kt-opt.on{border-color:#3F7A34;background:#E4F1D8;color:#2F5F27}
.statcard.mini{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;padding:10px 14px;font-family:"Jua",sans-serif;font-size:1rem;color:#5A3516;text-align:center}.statcard.mini b{font-size:1.5rem;color:#D45F16;margin:0 2px}.statcard.mini i{font-style:normal;color:#9A7A55;font-size:.9rem}
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
  try{ const st=document.querySelector('#app .stage'); if(st){ st.insertAdjacentHTML('beforeend',`<div class="btns" style="margin-top:14px"><button class="ghost" id="kt-teacher">통과 확인</button></div>`); document.getElementById('kt-teacher').onclick=()=>teacherPage(); } }catch(e){}
  return r; };

/* ---------- 12. 익명 묶음 전송 (교사가 켠 기기만) ---------- */
// 주소 끝에 #kt-share-on / #kt-share-off / #kt-reset(기기 번호 새로 만들기) / #teacher(선생님용 화면)
function cfg(){ return J(CK,{share:true,last:0,after:0}); }   /* 11/22 교수님: 무작위 기기 번호는 식별 정보로 보지 않는다 → 익명 전송 기본 켬(서버 주소가 비어 있으면 아무것도 보내지 않음). 끄기: 주소 끝 #kt-share-off */
function setCfg(c){ W(CK,c); }
/* 하루에 보낼 양의 상한: 한 아이가 하루 2시간 넘게 공부하지는 않는다 → 그날 푼 시간이 2시간, 문제가 500개를 넘으면 그날은 더 보낼 줄에 넣지 않는다(서버는 3시간·600문제를 넘는 묶음을 받지 않음) */
function dayRoom(ms){ try{ const c=cfg(), t=today(); if(!c.dn||c.dn.d!==t) c.dn={d:t,n:0,ms:0}; if(c.dn.n>=500||c.dn.ms>=2*3600e3) return false; c.dn.n++; c.dn.ms+=Math.max(0,ms|0); setCfg(c); return true; }catch(e){ return true; } }
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

/* ---------- 12. 내 친구 고르기: 한 기기를 여러 아이가 쓸 때 기록이 섞이지 않게 ---------- */
// 기본은 기기 하나 = 한 아이(아무것도 고르지 않아도 됨). 여럿이 쓰는 기기에서는 이름 대신 "파란 쿼카", "노란 토끼"처럼 색깔과 동물로 된 나만의 친구를 고른다.
// 친구마다 기록 묶음과 익명 번호가 따로다. 바꿀 때 지금 기록을 접어 넣고 그 친구의 기록을 편다.
// 누가 쓰는지 짐작: 친구마다 쓴 시간대를 세어 두고, 다시 열면 "지금 이 시간에 자주 오던 친구"를 맨 앞에 보여 준다.
const SLOT_CUR='dotori-slot-cur', SLOT_AT='dotori-slot-at', SLOT_USE='dotori-slot-use', slotKey=n=>'dotori-slot-'+n;
const ANIMALS=[['다람쥐','도토'],['청설모','청이'],['판다','대롱이'],['쿼카','방긋이'],['토끼','째깍이'],['알파카','포근이'],['기린','길쭉이'],['코끼리','코코'],['생쥐','콩알이'],['하마','첨벙 선생님'],['꿀벌','붕붕이'],['부엉이','부엉 박사님'],['고슴도치','고슴도치 손님'],['두더지','두더지 손님'],['나비','나비 손님'],['개미','개미 반장']].filter(a=>JU[a[1]]);
const COLORS=[['빨간','#E4604E'],['주황','#EE9A3A'],['노란','#F2C94C'],['초록','#6BAF5B'],['파란','#4F8FD9'],['보라','#9A77CF'],['분홍','#EE8FB5'],['하늘색','#7CC6E8']];
const curSlot=()=>{ try{ const v=localStorage.getItem(SLOT_CUR)||'0'; return /^\d+-\d+$/.test(v)?v:'0'; }catch(e){ return '0'; } };       // '동물번호-색번호', 고르지 않았으면 '0'
const slotName=id=>{ if(id==='0') return ''; const [a,c]=id.split('-').map(Number); return ANIMALS[a]&&COLORS[c]?`${COLORS[c][0]} ${ANIMALS[a][0]}`:''; };
const slotFace=(id,cls)=>{ if(id==='0') return ''; const [a,c]=id.split('-').map(Number); if(!ANIMALS[a]||!COLORS[c]) return ''; return `<span class="kt-face ${cls||''}" style="--fc:${COLORS[c][1]}"><img src="${JU[ANIMALS[a][1]]['기본']}" alt=""></span>`; };
const learnerKeys=()=>Object.keys(localStorage).filter(k=>k.startsWith('dotori-')&&!k.startsWith('dotori-slot-')&&k!==CK&&k!=='dotori-input');
const slotUse=()=>J(SLOT_USE,{});
function touchSlot(){ try{ const id=curSlot(), u=slotUse(), e=u[id]||(u[id]={h:Array(24).fill(0),at:0}), now=new Date(); if(Date.now()-e.at>20*60e3) e.h[now.getHours()]++; e.at=Date.now(); W(SLOT_USE,u); localStorage.setItem(SLOT_AT,String(Date.now())); }catch(e){} }
function switchSlot(n){ const cur=curSlot(); if(n===cur){ touchSlot(); return home(); }
  if(cur==='0'&&!knownSlots().length){ try{ localStorage.setItem(SLOT_CUR,n); touchSlot(); }catch(e){} return home(); }      // 처음 친구를 고르는 것이면 지금까지의 기록이 그 친구의 것
  try{ const pack={}; learnerKeys().forEach(k=>{ pack[k]=localStorage.getItem(k); localStorage.removeItem(k); }); if(Object.keys(pack).length) localStorage.setItem(slotKey(cur),JSON.stringify(pack));
    const nx=J(slotKey(n),{}); Object.entries(nx).forEach(([k,v])=>localStorage.setItem(k,v)); localStorage.removeItem(slotKey(n)); localStorage.setItem(SLOT_CUR,n); touchSlot(); }catch(e){} location.reload(); }
const slotUsed=n=>n===curSlot()?learnerKeys().length>0:!!localStorage.getItem(slotKey(n));
// 이 기기에서 쓴 적 있는 친구들을, 지금 시각(앞뒤 한 시간)에 자주 온 순서 → 최근에 온 순서로.
function knownSlots(){ const u=slotUse(), hr=new Date().getHours(), near=e=>e.h[hr]+.5*(e.h[(hr+23)%24]+e.h[(hr+1)%24]);
  return Object.keys(u).filter(id=>id!=='0'&&slotName(id)).sort((a,b)=>near(u[b])-near(u[a])||u[b].at-u[a].at); }
function slotPage(ask,pickA){ hush(); app.className='wrap'; const cur=curSlot(), known=knownSlots(), stamp=()=>{ try{ localStorage.setItem(SLOT_AT,String(Date.now())); }catch(e){} };
  const top=known.length?`<div class="kt-sec">${ask?'혹시 이 친구인가요?':'이 기기의 친구들'}</div><div class="kt-faces">${known.slice(0,6).map(id=>`<button class="kt-pick${id===cur?' on':''}" data-slot="${id}">${slotFace(id)}<b>${slotName(id)}</b></button>`).join('')}</div>`:'';
  const body=pickA==null
    ?`<div class="kt-sec">${known.length?'다른 친구 찾기':'어떤 동물로 할까요?'}</div><div class="kt-faces small">${ANIMALS.map((a,i)=>`<button class="kt-pick" data-animal="${i}"><span class="kt-face" style="--fc:#E9D2A6"><img src="${JU[a[1]]['기본']}" alt=""></span><b>${a[0]}</b></button>`).join('')}</div>`
    :`<div class="kt-sec">${ANIMALS[pickA][0]}, 무슨 색으로 할까요?</div><div class="kt-faces small">${COLORS.map((c,i)=>`<button class="kt-pick" data-slot="${pickA}-${i}">${slotFace(pickA+'-'+i)}<b>${c[0]}</b></button>`).join('')}</div><div class="btns" style="margin-top:12px"><button class="ghost" id="kt-animals">다른 동물 고르기</button></div>`;
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">내 친구 고르기</div><span style="width:70px"></span></div>
    <div class="stage" style="text-align:left"><p class="kt-ex" style="margin-bottom:8px">여럿이 함께 쓰는 기기에서는 색깔과 동물로 된 나만의 친구를 골라요. 이름은 적지 않아요. 내 친구가 무엇인지는 나만 기억해요.</p>${pickA==null?top:''}${body}</div>`;
  document.getElementById('back').onclick=()=>{ stamp(); home(); };
  app.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{ stamp(); switchSlot(b.dataset.slot); });
  app.querySelectorAll('[data-animal]').forEach(b=>b.onclick=()=>slotPage(ask,+b.dataset.animal));
  const ab=document.getElementById('kt-animals'); if(ab) ab.onclick=()=>slotPage(ask); }
// 기록 옮기기: 이 기기의 모든 자리 기록을 글자로 꺼내거나 다시 넣는다(브라우저가 저장소를 지웠을 때, 기기를 바꿀 때).
function exportAll(){ const o={}; try{ Object.keys(localStorage).filter(k=>k.startsWith('dotori-')).forEach(k=>o[k]=localStorage.getItem(k)); }catch(e){} return JSON.stringify(o); }
function importAll(txt){ let o; try{ o=JSON.parse(txt); }catch(e){ return false; } if(!o||typeof o!=='object') return false; const ks=Object.keys(o).filter(k=>k.startsWith('dotori-')&&typeof o[k]==='string'); if(!ks.length) return false;
  try{ Object.keys(localStorage).filter(k=>k.startsWith('dotori-')).forEach(k=>localStorage.removeItem(k)); ks.forEach(k=>localStorage.setItem(k,o[k])); }catch(e){ return false; } return true; }
window.KT={epHoles,nextEp,epPass,kcMean,probePool,probeTops,qInfo,bestQ,slotPage,switchSlot,curSlot,slotName,knownSlots,exportAll,importAll,checkPieces,pieceStage,CPL,CPC,MISC,weakPieces,state,gradePage:g=>gradePage(g),startQuick,startDaily,pref,setPref,rec:(q,g,ok)=>(q&&q._e!=null?recEP:rec)(q,g,ok),factKey,dueFacts,startReview,report,status,epKC,MIS,LADDER,regen,formsOf,startDiag,startFocus,teacherPage,course};
function myBadge(){ try{ let b=document.getElementById('kt-me'); const id=curSlot();
  if(id==='0'){ if(b) b.remove(); _meEl=null; return; }
  if(!b) b=_meEl; if(!b){ b=document.createElement('button'); b.id='kt-me'; b.type='button'; document.body.appendChild(b); b.onclick=()=>slotPage(false); } _meEl=b;
  b.innerHTML=`${slotFace(id,'tiny')}<b>${slotName(id)}</b>`; b.setAttribute('aria-label','내 친구: '+slotName(id)+' (바꾸기)'); placeBadge(); }catch(e){} }
/* 내 친구 표시 자리(교수님 11/22): '나'는 오른쪽 위가 익숙하다. 다만 떠 있으면 🔊 단추·진행 점을 가리므로
   맨 위 줄(.top)이 있는 화면에서는 그 줄 안 오른쪽 끝(🔊 바로 왼쪽)에 넣고, 문제 화면(🔊 있음)에서는 얼굴만 작게.
   맨 위 줄이 없는 화면(처음 화면)에서만 오른쪽 위에 이름과 함께 띄운다. 화면이 바뀔 때마다 다시 자리를 잡는다. */
let _meEl=null;   /* 화면을 다시 그리면 맨 위 줄 안의 표시도 함께 지워지므로 붙잡아 두었다가 다시 넣는다 */
function placeBadge(){ const b=document.getElementById('kt-me')||_meEl; if(!b) return; const top=document.querySelector('#app .top');
  if(top){ const sp=top.querySelector('#speak,.speak'); b.classList.add('inrow'); b.classList.toggle('face',!!sp); if(sp){ if(b.nextSibling!==sp||b.parentNode!==top) top.insertBefore(b,sp); } else if(b.parentNode!==top||top.lastElementChild!==b) top.appendChild(b); }
  else { b.classList.remove('inrow','face'); if(b.parentNode!==document.body) document.body.appendChild(b); }
  /* 맨 위 줄의 제목(예: '선생님용')이 잘리면 이름은 빼고 얼굴만 */
  if(top&&!b.classList.contains('face')){ const cr=top.querySelector('.crumb'); if(cr&&cr.scrollWidth>cr.clientWidth+1) b.classList.add('face'); } }
try{ new MutationObserver(()=>placeBadge()).observe(document.getElementById('app'),{childList:true}); }catch(e){}
(function boot(){ const h=location.hash; const c=cfg();
  if(h==='#kt-share-on'){ c.share=true; did(); setCfg(c); } else if(h==='#kt-share-off'){ c.share=false; W(QK,[]); setCfg(c); } else if(h==='#kt-reset'){ try{ localStorage.removeItem(DK); }catch(e){} did(); }
  if(h.startsWith('#kt-')) history.replaceState(null,'',location.pathname+location.search);
  myBadge();
  try{ if(navigator.storage&&navigator.storage.persist) navigator.storage.persist(); }catch(e){}
  let ask=false; try{ const at=+(localStorage.getItem(SLOT_AT)||0); ask=at>0&&Date.now()-at>2*3600e3&&knownSlots().length>1; }catch(e){}
  if(h==='#teacher') teacherPage(); else if(ask) slotPage(true); else home(); })();
})();

/* 보기 한 칸 안에서 식·말이 줄바꿈되지 않게 (교수님 11/22: '□ = △ × / 4'처럼 끊기면 안 됨)
   보기를 한 줄로 두고, 칸이 좁아 넘치면 3열 → 2열 → 1열로 넓힌다. 1열에서도 넘치는 긴 문장만 띄어쓰기에서 줄바꿈. */
(function(){ const fit=el=>{ const bs=[...el.querySelectorAll(':scope > .opt')]; if(!bs.length||el.offsetWidth===0) return; const key=bs.map(b=>b.textContent).join('|')+el.offsetWidth; if(el._fitKey===key) return; el._fitKey=key;
    el.style.gridTemplateColumns=''; bs.forEach(b=>{ b.style.whiteSpace='nowrap'; }); const over=()=>bs.some(b=>b.scrollWidth>b.clientWidth+1);
    if(over()){ if(!el.classList.contains('wide')) el.style.gridTemplateColumns='repeat(2,1fr)'; if(over()) el.style.gridTemplateColumns='1fr'; if(over()) bs.forEach(b=>{ if(b.scrollWidth>b.clientWidth+1) b.style.whiteSpace=''; }); } };
  let raf=0; const run=()=>{ raf=0; document.querySelectorAll('.opts').forEach(el=>{ try{ fit(el); }catch(e){} }); };
  try{ new MutationObserver(()=>{ if(!raf) raf=requestAnimationFrame(run); }).observe(document.body,{childList:true,subtree:true}); addEventListener('resize',()=>{ if(!raf) raf=requestAnimationFrame(run); }); }catch(e){} })();

/* 보기 제시 규칙(11/22, Claude 안 + 카본 반박 반영)
   ① 그림 보기는 그림 카드를 직접 눌러도 고를 수 있다: 그림 아래 이름표(가·나·다, ①②③)와 같은 글자의 보기 단추를 대신 눌러 준다. 그림을 찾고 다시 번호 단추를 찾는 사이의 옮겨 누르기 실수를 줄인다(주의 분리).
   ② 문제가 바뀐 직후 0.35초 동안은 보기 누름을 받지 않는다: 앞 문제에서 이어진 연타가 오답(오개념)으로 기록되지 않게. */
(function(){ let shownAt=0; const lab=el=>{ const b=el.querySelector(':scope > b'); return b?b.textContent.trim():''; };
  const mark=()=>{ document.querySelectorAll('.opts').forEach(o=>{ if(!o._seen){ o._seen=1; shownAt=Date.now(); } }); const opts=[...document.querySelectorAll('.opts > .opt')]; if(!opts.length) return; const names=new Set(opts.map(b=>b.textContent.trim()));
    document.querySelectorAll('.tf').forEach(f=>{ const n=lab(f); if(n&&names.has(n)&&!f._pick){ f._pick=1; f.style.cursor='pointer'; f.style.borderRadius='12px'; f.style.padding='4px'; f.setAttribute('role','button'); f.setAttribute('aria-label','보기 '+n); } }); };
  try{ new MutationObserver(()=>mark()).observe(document.body,{childList:true,subtree:true}); }catch(e){}
  document.addEventListener('click',e=>{ const t=e.target; if(!t||!t.closest) return; const isOpt=t.closest('.opts > .opt'), fig=t.closest('.tf');
    if((isOpt||fig)&&Date.now()-shownAt<(window._tapLockMs==null?(((document.querySelector('.bubble .q, .qp-q')||document.querySelector('.bubble')||{}).textContent||'').length>45?800:350):window._tapLockMs)){ e.stopPropagation(); e.preventDefault(); return; }
    /* 3~6학년 고르기: 처음 누르면 '고름'만 표시, 같은 보기를 한 번 더 누르면 결정(네온 11/23: 손가락 스침으로 오답·오개념이 기록되는 것을 막음). 1~2학년·테스트(_tapLockMs=0)는 그대로 */
    if(window._armConfirm&&isOpt&&!isOpt.disabled&&typeof S!=='undefined'&&S&&S.mode==='ep36'&&window._tapLockMs!==0&&!e._armPass){ /* 교수님 11/24: 두 번 눌러 제출은 불편 → 한 번에 제출(필요하면 window._armConfirm=true로 되살림) */ const op=isOpt.closest('.opts'); if(op&&!op.classList.contains('kt-noarm')&&op._armed!==isOpt){ e.stopPropagation(); e.preventDefault(); op.querySelectorAll('.opt').forEach(b=>{ b.classList.remove('kt-arm'); }); isOpt.classList.add('kt-arm'); op._armed=isOpt; let tip=op.parentNode.querySelector('.kt-armtip'); if(!tip){ op.insertAdjacentHTML('afterend','<div class="kt-armtip" style="text-align:center;font-size:.9rem;color:#B5541A;margin-top:6px;font-family:Jua,sans-serif">같은 보기를 한 번 더 누르면 결정돼요</div>'); } return; } }
    if(fig&&fig._pick&&!isOpt){ const n=lab(fig), b=[...document.querySelectorAll('.opts > .opt')].find(x=>x.textContent.trim()===n&&!x.disabled); if(b){ fig.style.outline='3px solid #E88A2C'; setTimeout(()=>{ try{ fig.style.outline=''; }catch(_){} },500); b.click(); } } },true); })();
