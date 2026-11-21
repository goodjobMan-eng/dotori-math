
/* ---------- 10-2. 푸는 방법 고르기: 가볍게 풀기 · 오늘의 문제 · 골라서 풀기, 틀린 이유 보기 켜고 끄기 ---------- */
// 기록은 어느 방법으로 풀어도 똑같이 남는다. 달라지는 것은 화면에 무엇을 보여 주느냐뿐이다.
const PK='dotori-kt-pref';
const pref=()=>Object.assign({why:false,band:0,pace:10,d12:null,seen:{}},J(PK,{}));
const setPref=o=>{ const p=Object.assign(pref(),o); W(PK,p); return p; };
const BANDS=[[1,'1~2학년 내용'],[3,'3~4학년 내용'],[5,'5~6학년 내용']];
const bandName=b=>(BANDS.find(x=>x[0]===b)||[0,'내용 고르기'])[1];
const EPO=[1,2,3].flatMap(c=>EP_ORDER[c]);
const dstr=t=>{ const d=new Date(t); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
function ptr(){ const p=pref(); if(p.d12!=null) return Math.max(0,Math.min(EPO.length-1,p.d12)); const best=load(); let i=EPO.findIndex(e=>best['EP'+e]==null); if(i<0) i=EPO.length-1; setPref({d12:i}); return i; }

// 틀린 문제는 세트가 끝날 때 돌아볼 수 있게 모아 둔다. 도움말은 '틀린 이유 보기'를 켰을 때만 띄운다.
function afterRec(q,given,ok,m){ if(ok) return; const tip=m&&MIS[m]?MIS[m][1]:'';
  if(S&&S.acts){ (S._wrong=S._wrong||[]).push({q:plain(q.q).slice(0,70),g:clean(given),a:plain(q.ansText!=null&&q.ansText!==''?q.ansText:q.ans).slice(0,40),tip}); }
  if(tip&&pref().why){ q._tip=tip; q.hint1=tip; } }

function qFromEp36(ep){ return bestQ([ep]); }                    // 그 편에서 지금 가장 많이 알려 줄 문제
function qFromEp(e){ const fs=G[e]||[]; for(let t=0;t<8&&fs.length;t++){ let q; try{ q=fs[rnd(0,fs.length-1)](); }catch(x){ continue; } if(q&&!q.manip&&!q.onMount) return q; } return null; }
function bag(){ const acts=[], seen=new Set(); return {acts, push(q,flag){ if(!q) return false; const k=keyOf(q); if(seen.has(k)) return false; seen.add(k); if(flag) q[flag]=1; acts.push({kind:'q',q}); return true; }}; }
// 한 세트는 한 엔진(1~2학년 영상편 / 영역별)의 문제로만 만든다.
function runSet(acts,title,flag,video){ if(!acts.length) return home(); const q0=acts[0].q, ep12=q0._e!=null;
  const base=ep12?{mode:'final',ch:chapterOf(q0._e)}:{mode:'ep36',retry:true,ep:q0._ep,ui:uix(q0._ep),ch:0,chars:CAST};
  const steps=video?[video,{kind:'acts'}]:[{kind:'acts'}];
  S=Object.assign(base,{steps,si:0,acts,i:0,results:[],tries:0,counted:0,title,saveKey:'KTSET'},flag); if(ep12) say(' ','rami'); step(); }

function misActs(B,limit){ for(const x of report().mis.filter(x=>formsOf(x.c).length)){ for(const f of shuffle(formsOf(x.c).slice())){ if(B.acts.length>=limit) return;
    for(let t=0;t<6;t++){ let q; try{ q=G36[f.ep][f.i](); }catch(e){ break; } if(q&&q.mis&&Object.values(q.mis).includes(x.c)){ q._ep=f.ep; q._ti=f.i; B.push(q); break; } } } } }
// 비어 있는 개념 조각을 가르는 문제(그 조각을 가리키는 오개념 보기가 든 문제)를 먼저 넣는다.
function pieceActs(B,limit,c){ const fs=shuffle(codesOfPiece(c).flatMap(code=>formsOf(code).map(f=>({f,code})))); for(const {f,code} of fs){ if(B.acts.length>=limit) return;
    for(let t=0;t<6;t++){ let q; try{ q=G36[f.ep][f.i](); }catch(e){ break; } if(q&&q.mis&&Object.values(q.mis).includes(code)){ q._ep=f.ep; q._ti=f.i; B.push(q); break; } } } }
// 확인 문제: 그 조각을 처음 배우는 학년(없으면 가장 낮은 학년)의 문제 2개.
function checkActs(B,c){ const g0=+CPC[c][1][0], gradeOf=ep=>{ const u=UNITS36[uix(ep)]; return u?gradeOfUnit(u):9; };
  const fs=codesOfPiece(c).filter(code=>MISC[code].length===1).flatMap(code=>formsOf(code).map(f=>({f,code}))); if(!fs.length) return 0;
  const lo=Math.min(...fs.map(x=>gradeOf(x.f.ep))), want=fs.some(x=>gradeOf(x.f.ep)===g0)?g0:lo; let n=0; const v=(state().cpv||{})[c]||{ok:0,lose:0}, need=v.ok+v.lose>=2?1:2;
  for(const {f,code} of shuffle(fs.filter(x=>gradeOf(x.f.ep)===want))){ if(n>=need) break; for(let t=0;t<6;t++){ let q; try{ q=G36[f.ep][f.i](); }catch(e){ break; } if(q&&q.mis&&Object.values(q.mis).includes(code)){ q._ep=f.ep; q._ti=f.i; q._chk=c; if(B.push(q)) n++; break; } } }
  return n; }
// 강의 효과를 견줄 수 있게, 비어 있는 조각이 확정되면 (익명 번호 + 조각)으로 정해지는 절반은 강의 먼저(A), 절반은 문제 먼저(B)로 나눈다.
// 두 쪽 모두 '확정 직후 그 조각의 문제 2개'를 푼다(A는 강의를 본 뒤, B는 보기 전). B도 그 두 문제에서 하나라도 틀리면 다음 세트에서 강의를 본다.
const armOf=c=>{ let h=0; for(const ch of did()+c) h=(h*31+ch.charCodeAt(0))>>>0; return h%2?'B':'A'; };
function lecPlan(st,c){ st.lec=st.lec||{}; let L=st.lec[c]; if(!L) L=st.lec[c]={arm:armOf(c),mr:[],k:(CPL[c]||[]).find(lecHas)||''}; return L; }
function pieceVideo(c,L){ const card=!L.k&&typeof KCARDS!=='undefined'&&!!KCARDS[c];   /* 강의 영상이 없는 조각은 개념 카드가 영상 자리를 대신한다 */
  if((!L.k&&!card)||L.v) return null; const t=dstr(Date.now());
  if(L.arm==='B'){ if(L.mr.length<2) return null; if(L.mr.every(x=>x)){ L.v='skip'; return null; } }       // 문제 먼저: 두 문제를 다 맞혔으면 강의는 건너뜀
  L.v=t; if(cfg().share&&KT_ENDPOINT){ const qu=J(QK,[]); qu.push([t,L.k||('card:'+c),-1,0,0,(card?'K ':'V ')+c,1,null,0,0,'',L.arm,0,0,'c']); W(QK,qu.slice(-3000)); }
  if(card) return {kind:'card',c,key:'card:'+c,label:'개념 카드'};
  return {kind:'video',key:L.k,label:`${L.k} ${lecName(L.k)}`}; }
function frontier(st){ const fr=Object.keys(LADDER).map(s=>LADDER[s].find(k=>!['숙달','추정'].includes(kcStatus(k,st)))||LADDER[s][LADDER[s].length-1]); return fr; }

// 가볍게 풀기: 이미 아는 내용에서 5문제. 복습할 것이 있으면 먼저 넣는다.
function startQuick(){ const P=pref(); if(!P.band) return bandPage(startQuick); const B=bag(), N=5; let g=0;
  if(P.band===1){ for(const [k,f] of dueFacts()){ if(B.acts.length>=2) break; B.push(regenFact(k,f)); } const hi=ptr(); while(B.acts.length<N&&g++<80) B.push(qFromEp(EPO[rnd(0,hi)])); }
  else { const st=state(); misActs(B,1); const known=Object.values(LADDER).flat().filter(k=>['숙달','추정','연습'].includes(kcStatus(k,st))), pool=known.length?known:Object.values(LADDER).map(l=>l[0]);
    while(B.acts.length<N&&g++<80){ const eps=epsOf(pool[rnd(0,pool.length-1)]); B.push(qFromEp36(eps[rnd(0,eps.length-1)])); } }
  runSet(shuffle(B.acts),'가볍게 풀기',{kt:'quick'}); }

// 오늘의 문제: 복습 + 틀린 이유 다시 다지기 + 지금 수준의 새 내용. 잘하면 앞으로, 어려우면 뒤로.
// 3~6학년: 확인 문제·약한 조각·다시 다지기를 합쳐 40%까지만 넣고, 나머지는 지금 배우는 단원에서 낸다.
function startDaily(){ const P=pref(); if(!P.band) return bandPage(startDaily); const N=P.pace||10, B=bag(); let g=0, video=null;
  if(P.band===1){ for(const [k,f] of dueFacts()){ if(B.acts.length>=Math.ceil(N*.4)) break; B.push(regenFact(k,f)); }
    const i=ptr(), cur=EPO[i], want=B.acts.length+Math.ceil((N-B.acts.length)*.7);
    while(B.acts.length<want&&g++<80) B.push(qFromEp(cur),'_new');
    while(B.acts.length<N&&g++<240) B.push(qFromEp(i>0?EPO[rnd(0,i-1)]:cur));
    if(!P.seen[cur]){ video={kind:'video',key:epLabel(cur),label:`${epLabel(cur)} ${EPS[cur][0]}`}; const seen=P.seen; seen[cur]=1; setPref({seen}); } }
  else { const st=state(); const ck=checkPieces(st)[0]; if(ck) checkActs(B,ck.c); W(SK,st); const wp=weakPieces(st)[0]; if(wp){ const L=lecPlan(st,wp.c), n0=B.acts.length; video=pieceVideo(wp.c,L); pieceActs(B,Math.max(n0+2,Math.ceil(N*.4)),wp.c); if(L.mr.length<2&&!L.m){ B.acts.slice(n0,n0+2).forEach(a=>{ a.q._arm=L.arm; a.q._lec=wp.c; }); L.m=1; } W(SK,st); } misActs(B,Math.max(B.acts.length,Math.ceil(N*.4)));
    { const room=Math.min((st.probeN||0)<3?3:2,Math.floor(N/2)-B.acts.length); let k=0; for(const c of probeTops(st)){ if(k>=room) break; const q=probeQ(st,c); if(q){ B.push(q); k++; } } if(k){ st.probeN=(st.probeN||0)+1; W(SK,st); } }
    const fr=frontier(st);
    while(B.acts.length<N&&g++<N*10){ const eps=epsOf(fr[g%fr.length]); if(eps.length) B.push(qFromEp36(eps[rnd(0,eps.length-1)]),'_new'); } }
  runSet(P.band===1?B.acts:shuffle(B.acts),'오늘의 문제',{kt:'daily'},video); }
function finishDaily(S0){ const st=state(), t=dstr(Date.now());
  if(!st.daily||st.daily.d!==t){ st.streak=(st.daily&&st.daily.d===dstr(Date.now()-864e5))?(st.streak||0)+1:1; st.daily={d:t}; W(SK,st); }
  if(pref().band===1){ const idx=S0.acts.map((a,k)=>a.q&&a.q._new?k:-1).filter(k=>k>=0); if(idx.length>=3){ const acc=idx.filter(k=>S0.results[k]).length/idx.length; const i=ptr(); setPref({d12:Math.max(0,Math.min(EPO.length-1,i+(acc>=.8?1:acc<.5?-1:0)))}); } } }

// 세트가 끝난 뒤: 내 방식에 맞는 버튼, 그리고 (켜 두었다면) 틀린 문제 돌아보기
function ktResult(S0){ const box=document.querySelector('.result'); if(!box) return;
  if(S0.kt){ const n=S0.acts.length, b=box.querySelector('.big'); if(b) b.textContent=b.textContent.replace('/ 10','/ '+n);
    box.querySelector('#nextbtn')?.remove(); const ag=document.getElementById('again'), li=document.getElementById('list');
    if(S0.kt==='daily') finishDaily(S0);
    if(ag){ ag.textContent=S0.kt==='quick'?'5문제 더':'더 풀기'; ag.onclick=S0.kt==='quick'?startQuick:startDaily; }
    if(li){ li.textContent='그만하기'; li.onclick=home; } }
  const w=S0._wrong||[];
  if(pref().why&&w.length){ box.insertAdjacentHTML('beforeend',`<div style="text-align:left;margin-top:16px"><div class="kt-sec">틀린 문제 돌아보기</div><ul class="recent kt-list">${w.slice(0,10).map(x=>`<li><b>${esc(x.q)}</b><div class="kt-ex">내 답 <b>${esc(x.g||'?')}</b> → 정답 <b>${esc(x.a)}</b></div>${x.tip?`<div class="kt-tip">${x.tip}</div>`:''}</li>`).join('')}</ul></div>`); } }

function bandPage(next){ hush(); app.className='wrap';
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">어떤 내용을 풀까요?</div><span style="width:70px"></span></div>
    <div class="stage"><div style="font-family:Jua;font-size:1.25rem;margin-bottom:12px">풀고 싶은 내용을 골라요. 나중에 바꿀 수 있어요.</div>
    <div class="kt-modes" style="grid-template-columns:1fr">${BANDS.map(([b,n])=>`<button class="kt-mode kt-band" data-band="${b}"><b>${n}</b></button>`).join('')}</div></div>`;
  document.getElementById('back').onclick=home;
  app.querySelectorAll('[data-band]').forEach(x=>x.onclick=()=>{ const b=+x.dataset.band; setPref({band:b});
    if(b>=3){ const st=state(); Object.values(LADDER).flat().forEach(k=>{ if(+k[2]<b) st.est[k]=1; else if(st.kc[k]==null) delete st.est[k]; }); W(SK,st); }
    (next||home)(); }); }

function modesHTML(){ const P=pref(), st=state(), done=st.daily&&st.daily.d===dstr(Date.now());
  const sub=done?`${st.streak||1}일째 이어서 풀고 있어요`:P.band?`내 수준에 맞춘 ${P.pace}문제`:'내 수준에 맞춰 매일 조금씩';
  return `<div class="kt-modes"><button class="kt-mode" id="kt-quick"><img class="who" src="${JU['청이']['자세_만세']}" alt=""><b>가볍게 풀기</b><span>5문제만 풀고 끝</span></button>
    <button class="kt-mode" id="kt-daily"><img class="who" src="${JU['부엉 박사님']['자세_손가락하나']}" alt=""><b>오늘의 문제</b><span>${sub}</span>${done?'<i class="stamp">다 풀었어요</i>':''}</button></div>
    <div class="kt-chips"><button class="kt-chip${P.why?' on':''}" id="kt-why">틀린 이유 보기 ${P.why?'켜짐':'꺼짐'}</button><button class="kt-chip" id="kt-pace">하루 ${P.pace}문제</button><button class="kt-chip" id="kt-slot">${slotName(curSlot())?slotFace(curSlot(),'tiny')+slotName(curSlot()):'내 친구 고르기'}</button><button class="kt-chip" id="kt-band">${bandName(P.band)}</button>${P.band>=3&&!st.lvl?'<button class="kt-chip" id="kt-diag">내 수준 정확히 찾기</button>':''}</div>
    <h2 class="sec">골라서 풀기</h2>`; }
function bindModes(){ const on=(id,f)=>{ const b=document.getElementById(id); if(b) b.onclick=f; };
  on('kt-quick',startQuick); on('kt-daily',startDaily); on('kt-diag',startDiag);
  on('kt-why',()=>{ setPref({why:!pref().why}); home(); });
  on('kt-pace',()=>{ const p=pref().pace; setPref({pace:p===5?10:p===10?15:5}); home(); });
  on('kt-band',()=>bandPage(home)); on('kt-slot',()=>slotPage(false)); }

/* ---------- 10-3. 골라서 풀기: 영상이 있든 없든 학년 → 영역 → 단원 순서(계열)로 한 줄에 ---------- */
const DOMS=['수와 연산','변화와 관계','도형과 측정','자료와 가능성'];
const domOf=u=>({S2:'수와 연산',S3:'수와 연산',S4:'자료와 가능성',S5:'변화와 관계',S6:'도형과 측정'})[String(u.eps[0]).slice(0,2)]||'수와 연산';
const gradeOfUnit=u=>+((u.title.match(/^(\d)-/)||[0,u.grade])[1]);
const CH_GRADE={1:1,2:1,3:2};                                   // 영상편 1·2장은 1학년, 3장(세 자리 수·곱셈구구)은 2학년 자리에 둔다
let LASTG=null;
function semName(p){ const ps=p.split('·').map(x=>x.split('-')); return ps.every(x=>x[0]===ps[0][0])?`${ps[0][0]}학년 ${ps.map(x=>x[1]).join('·')}학기`:ps.map(x=>`${x[0]}학년 ${x[1]}학기`).join(', '); }
function gradeItems(g){ const best=load(), out=[];
  for(const c of [1,2,3]) if(CH_GRADE[c]===g){ const es=EP_ORDER[c]; out.push({dom:'수와 연산',key:'0'+c,ch:c,m:`${CHAPTERS[c].desc.split(' · ')[0]}, 영상 보고 풀기`,t:CHAPTERS[c].title,done:es.every(e=>best['EP'+e]!=null),tot:es.length,ok:es.filter(e=>best['EP'+e]!=null).length}); }
  UNITS36.forEach((u,ui)=>{ if(gradeOfUnit(u)!==g) return; const ok=u.eps.filter(e=>best['EP'+e]!=null).length; out.push({dom:domOf(u),key:'1'+u.title.slice(0,3)+String(ui).padStart(3,'0'),ui,m:semName(u.title.split(' ')[0])+(u.eps.some(e=>VIDEOS[e])?', 영상 있음':''),t:u.title.replace(/^\S+\s/,''),done:ok===u.eps.length,tot:u.eps.length,ok}); });
  return out.sort((a,b)=>DOMS.indexOf(a.dom)-DOMS.indexOf(b.dom)||(a.key<b.key?-1:a.key>b.key?1:0)); }
// 캐릭터마다 이야기가 벌어지는 곳이 다르다. 영상과 같은 장소 그림을 단원 목록 머리에 놓는다.
// c는 그림에서 띠 가운데에 올 높이(0=맨 위, 1=맨 아래). 새 장소는 A에 '배경_이름'을 넣고 여기에 적으면 된다.
const WORLD={
  home:{place:'참나무 집',bg:'배경_할머니집',c:.67,who:[['도토','자세_손흔들기'],['람이','자세_박수']]},
  store:{place:'도토리 장터',bg:'배경_도토리장터',c:.61,who:[['도토','자세_만세'],['람이','자세_손흔들기']]},
  squirrel:{place:'숲속 장터',bg:'배경_숲속장터',c:.56,who:[['도토','자세_손흔들기'],['람이','자세_박수']]},
  panda:{place:'대나무 숲',bg:'배경_대나무숲',c:.57,who:[['대롱이','기본'],['반반이','기본']]},
  panda2:{place:'대나무 빵집',bg:'배경_대나무빵집',c:.5,who:[['대롱이','기본'],['반반이','기본']]},
  alpaca:{place:'뜨개 공방',bg:'배경_뜨개공방',c:.46,who:[['포근이','자세_손흔들기'],['몽글이','자세_박수']]},
  owl:{place:'숲속 교실',bg:'배경_숲속교실',c:.48,who:[['부엉 박사님','자세_손가락하나']]},
  quokka:{place:'블록 놀이터',bg:'배경_블록놀이터',c:.47,who:[['방긋이','자세_만세'],['생긋이','자세_손흔들기']]},
  rabbit:{place:'시계탑 광장',bg:'배경_시계탑',c:.31,who:[['째깍이','자세_손흔들기'],['똑딱이','자세_박수']]},
  giraffe:{place:'무지개 언덕',bg:'배경_풀밭',c:.43,who:[['길쭉이','기본'],['껑충이','자세_손흔들기']]},
  giraffe2:{place:'무지개 언덕',bg:'배경_풀밭',c:.43,who:[['길쭉이','기본'],['째깍이','자세_손흔들기']]},
  scale:{place:'연못가',nm:'첨벙 선생님과 친구들',bg:'배경_연못가',c:.62,who:[['첨벙 선생님','기본'],['코코','자세_손흔들기'],['콩알이','자세_만세']]},
  hippo:{place:'연못가',bg:'배경_연못가',c:.62,who:[['첨벙 선생님','자세_손가락하나']]},
  bee:{place:'꿀벌 꽃밭',bg:'배경_꿀벌꽃밭',c:.44,who:[['붕붕이','기본'],['윙윙이','기본']]}};
const posOf=(c,h)=>`center ${Math.max(0,Math.min(100,(c-h/2)/(1-h)*100)).toFixed(0)}%`;      // h: 띠에 보이는 높이의 비율
// 학년마다 그 학년에 처음 가는 곳을 길가에 세운다.
const GRADE_PLACE={1:'home',2:'store',3:'panda',4:'bee',5:'alpaca',6:'quokka'};
const andName=ns=>ns.length>1?ns.slice(0,-1).join(', ')+(/[가-힣]$/.test(ns[ns.length-2])&&(ns[ns.length-2].charCodeAt(ns[ns.length-2].length-1)-44032)%28?'과 ':'와 ')+ns[ns.length-1]:ns[0];
// 단원이 어느 캐릭터의 이야기인지 제목으로 가른다.
function worldOf(x){ if(x.ch) return x.ch<3?'home':'store'; const t=x.t;
  if(x.dom==='수와 연산') return /분수|소수|약분|통분/.test(t)?(gradeOfUnit(UNITS36[x.ui])>=5?'panda2':'panda'):'squirrel';
  if(x.dom==='변화와 관계') return 'alpaca'; if(x.dom==='자료와 가능성') return 'bee';
  if(/길이/.test(t)) return /시간/.test(t)?'giraffe2':'giraffe'; if(/시각|시간/.test(t)) return 'rabbit';
  if(/들이|무게/.test(t)) return 'scale'; if(/부피/.test(t)) return 'hippo';
  if(/모양과 비교|직육면체|각기둥|공간과 입체/.test(t)) return 'quokka'; return 'owl'; }
function sceneHTML(key){ const w=WORLD[key], img=A[w.bg], ns=w.who.map(x=>x[0]).filter(n=>JU[n]);
  return `<div class="kt-scene${w.who.length>2?' many':''}" style="background:#E9D2A6${img?` url(${img}) ${posOf(w.c,.2)}/cover`:''}"><span class="nm"><b>${w.place}</b><i>${w.nm||andName(ns)}</i></span>${w.who.map(([n,m])=>JU[n]?`<img src="${JU[n][m]||JU[n]['기본']}" alt="">`:'').join('')}</div>`; }
function gradePage(g){ if(typeof S!=='undefined'&&S) S.idle=true; hush(); app.className='wrap'; LASTG=g; const raw=gradeItems(g), ord=[]; raw.forEach(x=>{ const k=x.dom+'|'+worldOf(x); if(!ord.includes(k)) ord.push(k); });
  const items=raw.map((x,i)=>[x,i]).sort((a,b)=>ord.indexOf(a[0].dom+'|'+worldOf(a[0]))-ord.indexOf(b[0].dom+'|'+worldOf(b[0]))||a[1]-b[1]).map(a=>a[0]); let last='', lastW='';   // 같은 장소의 단원끼리 모으고, 그 안에서는 배우는 순서대로
  const cards=items.map((x,i)=>{ const wk=worldOf(x), hd=(x.dom!==last?`<div class="kt-dom2">${x.dom}</div>`:'')+(x.dom!==last||wk!==lastW?sceneHTML(wk):''); last=x.dom; lastW=wk; const r=x.tot?x.ok/x.tot:0;
    return hd+`<button class="kt-row" data-gi="${i}"><img class="ac" src="${A['소품_도토리']}" alt="" style="opacity:${(.3+.7*r).toFixed(2)};filter:grayscale(${(1-r).toFixed(2)})"><span class="tt"><b>${x.t}</b><i>${x.m}</i></span><span class="pp">${x.ok}/${x.tot} 편</span></button>`; }).join('');
  app.innerHTML=`<div class="top"><button class="back" id="back">← 처음</button><div class="crumb">${g}학년</div><span style="width:70px"></span></div>
    <div class="kt-chips">${[1,2,3,4,5,6].map(k=>`<button class="kt-chip${k===g?' on':''}" data-g="${k}">${k}학년</button>`).join('')}</div>
    <div class="kt-list2">${cards}</div>`;
  document.getElementById('back').onclick=home;
  app.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>gradePage(+b.dataset.g));
  app.querySelectorAll('[data-gi]').forEach(b=>b.onclick=()=>{ const x=items[+b.dataset.gi]; if(x.ch) chapter(x.ch); else unit36(x.ui); }); }
function hereGrade(){ const b=pref().band; if(!b) return 0; return b===1?CH_GRADE[chapterOf(EPO[ptr()])]||1:b; }
// 학년은 순서가 있는 길이다. 마을 길을 따라 그 학년의 장소 그림 여섯 장을 세운다.
function gradesHTML(){ const here=hereGrade(), H=600, pts=[0,1,2,3,4,5].map(i=>[i%2?72:28,(i+.6)*H/6]);
  const d=pts.map((p,i)=>i?`S${(pts[i-1][0]+p[0])/2+(i%2?12:-12)},${p[1]-10} ${p[0]},${p[1]}`:`M${p[0]},${p[1]}`).join(' ');
  return `<div class="kt-path"><svg viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="#C9A56B" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 13" vector-effect="non-scaling-stroke"/></svg>${[1,2,3,4,5,6].map(g=>{ const it=gradeItems(g), ok=it.reduce((a,x)=>a+x.ok,0), tot=it.reduce((a,x)=>a+x.tot,0);
    const w=WORLD[GRADE_PLACE[g]];
    return `<button class="kt-tree" data-g="${g}" aria-label="${g}학년, ${w.place}"><span class="pic" style="background-image:url(${A[w.bg]});background-position:${posOf(w.c,.42)}"></span>${g===here?`<img class="here" src="${JU['도토']['자세_손흔들기']}" alt="지금 여기">`:''}<span class="lb"><b>${g}학년</b><i>${ok}/${tot} 편</i></span></button>`; }).join('')}</div>`; }
function unifyHome(){ const root=document.getElementById('app'); if(!root) return;
  root.querySelectorAll('h2.sec').forEach(h=>{ if(/영상 보고 풀기|영역별 문제/.test(h.textContent)) h.remove(); }); root.querySelector('.chapters')?.remove(); root.querySelector('.grades')?.remove();
  root.querySelector('.hero')?.remove(); root.querySelector('.parade')?.remove();
  root.insertAdjacentHTML('afterbegin',`<div class="kt-hero"><div class="sign"><h1>도토리 숲 수학 퀴즈</h1></div><img class="c1" src="${JU['도토']['자세_손흔들기']}" alt="도토"><img class="c3" src="${JU['할머니']['기본']}" alt="할머니"><img class="c2" src="${JU['람이']['자세_박수']}" alt="람이"></div>`);
  const note=root.querySelector('.note'); if(note) note.innerHTML=note.innerHTML.replace(/[\u{1F300}-\u{1FAFF}☀-➿️]\s?/gu,'').replace(/ → /g,', ');
  const h=[...root.querySelectorAll('h2.sec')].find(x=>/골라서 풀기/.test(x.textContent)); if(h){ h.insertAdjacentHTML('afterend',gradesHTML()); root.querySelectorAll('.kt-tree').forEach(b=>b.onclick=()=>gradePage(+b.dataset.g)); } }
grade36=function(g){ return gradePage(LASTG||g); };
const _ch0=chapter; chapter=function(ch){ const r=_ch0.apply(this,arguments); try{ const b=document.getElementById('back'); if(b){ b.textContent='← '+CH_GRADE[ch]+'학년'; b.onclick=()=>gradePage(CH_GRADE[ch]); } }catch(e){} return r; };
