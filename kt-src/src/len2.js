
/* ===== 3-99. 2학년 길이 재기 보강(교수님 11/24): 자로 재는 방법, 눈금 사이 '약', 어림과 실제 견주기, 몸으로 어림해서 더하기 =====
   2-1 4단원 길이 재기: 1 cm, 자로 길이 재기(눈금 0에 맞추기·나란히 대기), 끝이 눈금 사이면 가까운 눈금 + '약', 길이 어림하기
   2-2 3단원 길이 재기: 1 m, 길이의 합·차, 길이 어림하기(양팔·걸음으로 1 m 어림) — 늘품이 진단(어림한 길이·실제 길이) 꼴 참고 */
/* 새 편 S6-81 「어림하고 재어 봐요」(2-1 길이 재기): 길이 어림하기를 설명하는 영상이 없어 편을 새로 둠. 영상이 올라오면 videos_patch.json에 주소만 넣으면 이어짐 */
EPS36['S6-81']=['어림하고 재어 봐요','길이 어림하기']; G36['S6-81']=G36['S6-81']||[];
{ const u=UNITS36.find(u=>u.title==='2-1 길이 재기'); if(u&&!u.eps.includes('S6-81')) u.eps.push('S6-81'); }
Object.assign(MIS,{
'G2-18':['자의 눈금 0이 아니라 자의 맨 끝에 물건을 맞춤','자의 맨 끝이 아니라 눈금 0에 물건의 한쪽 끝을 맞춰요.'],
'G2-19':['끝이 눈금 사이에 있을 때 가까운 쪽 눈금을 읽지 못함','끝이 두 눈금 사이에 있으면 더 가까운 눈금을 읽고 "약"을 붙여요.'],
'G2-20':['어림한 길이와 실제 길이의 차이로 견주지 않음','실제 길이와의 차가 작을수록 더 가깝게 어림한 거예요.'],
'G2-21':['기준 길이와 잰 횟수를 함께 생각하지 못함','약 1 m로 4번이면 약 4 m, 약 50 cm 걸음으로 2번이면 약 1 m예요.'],
'G2-22':['자를 물건과 나란히 대지 않음','자를 물건 옆에 곧게, 나란히 대어요.']});
try{ (window.__MISC_ADD=window.__MISC_ADD||[]).push(...['G2-18','G2-19','G2-20','G2-21','G2-22'].map(c=>[c,[['GC03',.9]]])); }catch(e){}

/* 자 그림: 0~N cm, 1 cm = U px. 물건(막대)은 a cm에서 b cm까지. lead = 자의 맨 끝에서 눈금 0까지 여백(px). tilt = 자를 비스듬히 */
const _L2U=24;
function _l2ruler({N=10,a=0,b=5,lead=26,tilt=0,objX=null,label=''}={}){
  const U=_L2U, W=lead+N*U+16, x0=10, rx=x0+lead;               // 자의 눈금 0 위치
  let r=`<rect x="${x0}" y="0" width="${W}" height="30" rx="3" fill="#FFF3C4" stroke="#B5701F" stroke-width="1.8"/>`;
  for(let i=0;i<=N;i++){ const x=rx+i*U; r+=`<line x1="${x}" y1="0" x2="${x}" y2="13" stroke="#4A2E14" stroke-width="1.6"/><text x="${x}" y="25" font-size="10.5" text-anchor="middle" fill="#4A2E14">${i}</text>`; if(i<N) r+=`<line x1="${x+U/2}" y1="0" x2="${x+U/2}" y2="7" stroke="#4A2E14" stroke-width="1"/>`; }
  const ox=objX!=null?objX:rx+a*U, ow=(b-a)*U;
  const tw=Math.min(12,ow*.3), obj=`<path d="M${ox} -21 H${ox+ow-tw} L${ox+ow} -14 L${ox+ow-tw} -7 H${ox} Z" fill="#F2B544" stroke="#6B3E1C" stroke-width="1.5" stroke-linejoin="round"/><path d="M${ox+ow-tw*.35} -16.5 L${ox+ow} -14 L${ox+ow-tw*.35} -11.5 Z" fill="#3A2A1C"/>`;
  const rulerG=tilt?`<g transform="rotate(${tilt} ${rx} 0)">${r}</g>`:r;
  const tag=label?`<text x="2" y="-10" font-size="15" font-weight="700" fill="#2E2620">${label}</text>`:'';
  return {svg:`<g transform="translate(${label?22:0},28)">${rulerG}${obj}</g>${tag?`<g transform="translate(0,28)">${tag}</g>`:''}`, w:W+20+(label?22:0)}; }
const _l2svg=(rows,h)=>{ const w=Math.max(...rows.map(r=>r.w)); return `<svg viewBox="0 0 ${w} ${h}" width="${Math.min(330,w)}" style="max-width:100%;display:block;margin:0 auto">${rows.map((r,i)=>`<g transform="translate(0,${i*82})">${r.svg}</g>`).join('')}</svg>`; };
const _l2J=['㉠','㉡','㉢'];

/* 2-1: 자로 바르게 잰 것 고르기(그림 셋) */
ADD('S6-15', ()=>{ const L=rnd(4,7);
  const kinds=shuffle(['ok',...shuffle(['edge','from1','tilt']).slice(0,2)]);
  const rows=kinds.map((k,i)=>{ const o={N:9,a:0,b:L,label:_l2J[i]};
    if(k==='edge'){ o.objX=10; }                              /* 자의 맨 끝(여백)에 맞춤 */
    if(k==='from1'){ o.a=1; o.b=L+1; }                        /* 눈금 1에 맞춤 */
    if(k==='tilt'){ o.tilt=4; }                               /* 자를 비스듬히 */
    return _l2ruler(o); });
  const code={edge:'G2-18',from1:'G2-08',tilt:'G2-22'}; const ans=_l2J[kinds.indexOf('ok')];
  const o=CF('자로 연필의 길이를 바르게 잰 것을 찾아 기호를 고르세요.',_l2svg(rows,82*3-8),ans,_l2J.slice());
  o.mis={}; kinds.forEach((k,i)=>{ if(k!=='ok') o.mis[_l2J[i]]=code[k]; }); o.diag=1;
  o.hint='물건의 한쪽 끝을 자의 눈금 0에 맞추고, 자를 물건과 나란히 대었는지 보세요.'; return o; });

/* 2-1: 끝이 눈금 사이에 있을 때 '약 □ cm' */
ADD('S6-15', ()=>{ const L=rnd(4,8), up=rnd(0,1), b=L+(up?0.7:0.3), near=up?L+1:L, far=up?L:L+1;
  const vis=_l2svg([_l2ruler({N:10,a:0,b})],66);
  const o=MC('연필의 길이는 약 몇 cm일까요?',vis,`약 ${near} cm`,[[`약 ${far} cm`,'G2-19'],[`약 ${near+1} cm`,'G2-09']]);
  o.hint='연필 끝이 어느 눈금에 더 가까운지 보세요. 가까운 눈금을 읽고 "약"을 붙여요.'; return o; });

/* 2-1: 자로 재는 방법을 바르게 말한 친구 */
ADD('S6-15', MT([
  ['자로 길이를 잴 때 바르게 말한 친구는?','람이: 물건의 한쪽 끝을 자의 눈금 0에 맞춰요.',[['도토: 물건의 한쪽 끝을 자의 맨 끝에 맞춰요.','G2-18'],['청이: 눈금이 몇 개 있는지 세면 길이예요.','G2-09'],['코코: 자를 비스듬히 놓아도 괜찮아요.','G2-22']]],
  ['클립의 한쪽 끝을 자의 눈금 2에 맞추었더니 다른 쪽 끝이 눈금 6에 있었어요. 바르게 말한 친구는?','람이: 2부터 6까지 1 cm가 4번이니까 4 cm예요.',[['도토: 끝의 눈금이 6이니까 6 cm예요.','G2-08'],['청이: 눈금 2, 3, 4, 5, 6이 5개니까 5 cm예요.','G2-09']]]]));

/* 2-1: 어림하고 자로 재어 견주기(늘품이 꼴: 어림한 길이·실제 길이) */
ADD('S6-81', ()=>{ let c,e1,e2; do{ c=rnd(5,9); const d1=rnd(1,2), d2=d1+rnd(1,2), s1=rnd(0,1)?1:-1; e1=c+s1*d1; e2=c-s1*d2; }while(e1<1||e2<1||e2>12);
  const [A,B]=shuffle(['도토','람이']); const vis=_l2svg([_l2ruler({N:10,a:0,b:c})],66);
  const o=CF(`${A}는 연필의 길이를 약 ${e1} cm, ${B}는 약 ${e2} cm로 어림했어요. 자로 재어 보고, 실제 길이에 더 가깝게 어림한 친구를 고르세요.`.replace('도토는','도토는').replace(/람이는/,'람이는'),vis,A,[A,B]);
  o.mis={[B]:'G2-20'}; o.diag=1; o.hint='먼저 자로 실제 길이를 읽고, 어림한 길이와의 차가 더 작은 친구를 찾아요.'; return o; });

/* 2-2: 양팔(약 1 m)로 어림하기 */
ADD('S6-16', ()=>{ const n=rnd(3,6), what=rndPick('칠판','교실 앞쪽 벽','복도 게시판','운동장 철봉');
  const o=MC(`양팔을 벌린 길이가 약 1 m예요. ${what}의 길이를 양팔로 재었더니 ${n}번쯤이었어요. ${what}의 길이는 약 몇 m일까요?`,'',`약 ${n} m`,[[`약 ${n} cm`,'G3-07'],['약 1 m','G2-21'],[`약 ${n*10} m`,'G3-07']]);
  o.hint='약 1 m로 몇 번 재었는지 생각해요.'; return o; });

/* 2-2: 걸음(약 50 cm)으로 어림하기 */
ADD('S6-16', ()=>{ const k=rnd(3,8), what=rndPick('복도','교실','현관','놀이터 울타리');
  const o=MC(`한 걸음의 길이가 약 50 cm예요. ${what}의 길이를 걸어 보았더니 ${2*k}걸음이었어요. ${what}의 길이는 약 몇 m일까요?`,'',`약 ${k} m`,[[`약 ${2*k} m`,'G2-21'],[`약 ${k} cm`,'G3-07'],[`약 ${2*k*50} m`,'G2-17']]);
  o.hint='두 걸음이면 약 100 cm, 곧 약 1 m예요.'; return o; });

/* 2-2: 어림한 길이 더하기 */
ADD('S6-16', ()=>{ const a=rnd(2,5), b=rnd(1,4);
  const o=MC(`양팔을 벌린 길이가 약 1 m예요. 양팔로 재어 보니 칠판은 ${a}번쯤, 게시판은 ${b}번쯤이었어요. 칠판과 게시판을 나란히 이어 놓은 길이는 약 몇 m일까요?`,'',`약 ${a+b} m`,[[`약 ${a+b} cm`,'G3-07'],[`약 ${a} m`,'G2-21']]);
  o.hint='양팔 한 번이 약 1 m예요. 칠판과 게시판을 각각 어림한 뒤 두 길이를 더해 보세요.'; return o; });

/* 2-2: 어림한 길이와 실제 길이 견주기(m와 cm) */
ADD('S6-16', ()=>{ const r=rndPick(160,170,180,190), dA=200-r, dB=dA+rndPick(10,20), eB=r-dB, [A,B]=shuffle(['도토','람이']);
  const mcm=x=>x>=100?`${Math.floor(x/100)} m${x%100?` ${x%100} cm`:''}`:`${x} cm`;
  const o=CF(`줄넘기 줄의 길이를 ${A}는 약 2 m, ${B}는 약 ${mcm(eB)}로 어림했어요. 실제로 재어 보니 ${mcm(r)}였어요. 더 가깝게 어림한 친구는 누구일까요?`,'',A,[A,B]);
  o.mis={[B]:'G2-20'}; o.diag=1; o.hint=`실제 길이 ${mcm(r)}와 어림한 길이의 차를 cm로 구해 견주어 보세요.`; return o; });

/* 단원 맞추기(11/24): S6-15 편의 1 m 문제(m·cm 바꾸기, 줄자)는 2-2 길이 재기(S6-16 편)로 옮기고, S6-15에는 2-1 'cm 자로 재기'만 남긴다.
   S6-15 영상(자 쓰는 법·약·1 m)은 2-1 길이 재기 단원에, S6-16 영상(1 m 어림·m와 cm 계산)은 2-2 길이 재기 단원에 놓인다. */
(()=>{ const T=s=>String(s||'').replace(/<[^>]+>/g,' '), isM=g=>{ for(let t=0;t<4;t++){ let q; try{ q=g(); }catch(e){ return false; } if(q&&/\d\s?m(?![m²³L])|\bm\b|몇 m/.test(T(q.q)+' '+(q.opts||[]).join(' ')+' '+T(q.ans))) return true; } return false; };
  const keep=[], mv=[]; for(const g of G36['S6-15']) (isM(g)?mv:keep).push(g); G36['S6-15'].length=0; G36['S6-15'].push(...keep); G36['S6-16'].unshift(...mv); window._len2mv=mv.length; })();

/* S6-81: 1 cm 기준으로 어림하기(그림: 1 cm 조각 하나와 막대) */
ADD('S6-81', ()=>{ const n=rnd(4,9), U=_L2U, W=n*U+60;
  const vis=`<svg viewBox="0 0 ${W} 86" width="${Math.min(330,W)}" style="max-width:100%;display:block;margin:0 auto"><rect x="10" y="8" width="${U}" height="16" rx="3" fill="#8FC77A" stroke="#3E6B2E" stroke-width="1.5"/><text x="${10+U+8}" y="21" font-size="12" fill="#3E6B2E" font-weight="700">1 cm</text><rect x="10" y="50" width="${n*U}" height="18" rx="8" fill="#F2B544" stroke="#6B3E1C" stroke-width="1.6"/><text x="${10+n*U/2}" y="82" font-size="11" text-anchor="middle" fill="#8A6A4A">리본</text></svg>`;
  const o=MC('초록 조각의 길이는 1 cm예요. 리본의 길이를 어림하면 약 몇 cm일까요?',vis,`약 ${n} cm`,[[`약 ${n} m`,'G3-07'],[`약 ${n*10} cm`,'G3-07'],['약 1 cm','G2-21']]);
  o.hint='1 cm 조각이 리본에 몇 번쯤 들어갈지 눈으로 이어 대어 보세요.'; return o; });
/* S6-81: 어림한 길이와 실제 길이의 차(늘품이: 어림한 길이 · 실제 길이) */
ADD('S6-81', ()=>{ const c=rnd(6,12), d=rnd(1,3), e=rnd(0,1)?c+d:c-d, who=rndPick('도토','람이','청이');
  const o=WM(`${who}는 지우개 상자의 길이를 약 ${e} cm로 어림했어요. 자로 재어 보니 ${c} cm였어요. 어림한 길이와 실제 길이의 차는 몇 cm일까요?`,'',d,[[c+e,'G2-20']],'','cm');
  o.hint='두 길이 중 긴 것에서 짧은 것을 빼요.'; return o; });
/* S6-81: 알맞은 길이 어림(물건 → 약 몇 cm) */
ADD('S6-81', MT([
  ['색연필의 길이는 약 몇 cm일까요?','약 15 cm',[['약 15 m','G3-07'],['약 150 cm','G3-07'],['약 1 cm','G3-07']]],
  ['지우개의 길이는 약 몇 cm일까요?','약 4 cm',[['약 4 m','G3-07'],['약 40 cm','G3-07']]],
  ['손가락 한 마디의 너비에 가장 가까운 길이는?','약 1 cm',[['약 10 cm','G3-07'],['약 1 m','G3-07']]]]));

/* ===== 3-99b. 자로 직접 재기·긋기 조작(교수님 11/24: "자로 직접 재는 활동 필요") =====
   ① 자를 끌어 0을 연필 끝에 맞추고 재는데, 끝이 눈금 사이면 가까운 눈금 '약 □ cm'
   ② 자를 사용하여 □ cm인 선 긋기: 자를 끌어 0을 점에 맞추고, 끝낼 눈금을 눌러 선을 긋는다 */
function _l2rulerG(R,N,u,y){ let g=`<g class="rul" style="cursor:grab"><rect x="${R-8}" y="${y}" width="${N*u+16}" height="40" rx="4" fill="#FFF3C4" stroke="#B5701F" stroke-width="2"/>`;
  for(let i=0;i<=N;i++){ g+=`<line x1="${R+i*u}" y1="${y}" x2="${R+i*u}" y2="${y+18}" stroke="#4A2E14" stroke-width="${i===0?3:1.8}"/><text x="${R+i*u}" y="${y+34}" font-size="12" font-weight="700" text-anchor="middle" fill="${i===0?'#D45F16':'#4A2E14'}">${i}</text>`; if(i<N) g+=`<line x1="${R+i*u+u/2}" y1="${y}" x2="${R+i*u+u/2}" y2="${y+9}" stroke="#4A2E14" stroke-width="1"/>`; }
  return g+'</g>'; }
const _l2pt=(svg,e)=>{ const r=svg.getBoundingClientRect(), vb=svg.viewBox.baseVal; return {x:(e.clientX-r.left)*vb.width/r.width, y:(e.clientY-r.top)*vb.height/r.height}; };

/* ① 약 □ cm 재기 */
function measureApprox(Lf,start){ const u=26, N=12, W=u*(N+3), near=Math.round(Lf), far=Lf>near?near+1:near-1; let rx=0.5, ans=0;
  const draw=()=>pencilSvg(10+start*u,Lf,u,14)+_l2rulerG(10+rx*u,N,u,44)+`<text x="${W/2}" y="100" font-size="12" text-anchor="middle" fill="#8A6A4A">↔ 자를 끌어서 옮겨요</text>`;
  const upd=root=>{ root.querySelector('svg.mmeas2').innerHTML=draw(); root.querySelector('#mval2').textContent=ans; };
  return { html:`<svg class="mmeas2" viewBox="0 0 ${W} 104" style="width:100%;max-width:380px;touch-action:none">${draw()}</svg><div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px;font-family:Jua,sans-serif;font-size:1.25rem"><span>연필의 길이: 약</span><button class="ghost" id="mminus2" style="width:44px;height:44px;font-size:1.4rem">−</button><b id="mval2" style="min-width:30px;text-align:center;font-size:1.6rem">0</b><button class="ghost" id="mplus2" style="width:44px;height:44px;font-size:1.4rem">+</button><span>cm</span></div>`,
    mount(root){ const svg=root.querySelector('svg.mmeas2'); let grab=null;
      svg.addEventListener('pointerdown',e=>{ e.preventDefault(); grab=_l2pt(svg,e).x/u-rx; svg.setPointerCapture(e.pointerId); });
      svg.addEventListener('pointermove',e=>{ if(grab==null) return; rx=Math.max(-0.5,Math.min(3,Math.round((_l2pt(svg,e).x/u-grab)*2)/2)); upd(root); });
      const end=()=>{ grab=null; }; svg.addEventListener('pointerup',end); svg.addEventListener('pointercancel',end);
      root.querySelector('#mminus2').onclick=()=>{ ans=Math.max(0,ans-1); upd(root); }; root.querySelector('#mplus2').onclick=()=>{ ans=Math.min(N,ans+1); upd(root); }; },
    check:()=>ans===near, state:()=>`${ans}@${rx}`,
    mcode:()=>{ if(ans===far) return 'G2-19'; const endRead=start+Lf-rx; if(Math.abs(rx-start)>0.01&&ans===Math.round(endRead)) return 'G2-08'; return null; },
    reveal(){ rx=start; ans=near; const r=document.getElementById('manip'); if(r) upd(r); } }; }
ADD('S6-15', ()=>{ const L=rnd(4,8), Lf=L+rndPick(0.3,-0.3), start=rndPick(1,1.5,2); return MQ('자를 옮겨서 연필의 길이를 재어 보세요. 연필 끝이 눈금 사이에 있으면 가까운 눈금을 읽어요.','자의 0을 연필의 한쪽 끝에 맞추고, 다른 쪽 끝이 어느 눈금에 더 가까운지 봐요.',measureApprox(Lf,start),`약 ${Math.round(Lf)} cm`); });

/* ② □ cm 선 긋기 */
function drawLineManip(L,dot){ const u=26, N=10, W=u*(N+4); let rx=0.5, endI=null;
  const dotX=10+dot*u, R=()=>10+rx*u;
  const draw=()=>{ let g=`<circle cx="${dotX}" cy="34" r="5" fill="#D45F16"/><text x="${dotX}" y="20" font-size="12" text-anchor="middle" fill="#D45F16" font-weight="700">점 ㄱ</text>`;
    if(endI!=null){ const ex=R()+endI*u; g+=`<line x1="${dotX}" y1="34" x2="${ex}" y2="34" stroke="#2F7DD6" stroke-width="4" stroke-linecap="round"/><circle cx="${ex}" cy="34" r="4" fill="#2F7DD6"/>`; }
    return g+_l2rulerG(R(),N,u,44)+`<text x="${W/2}" y="100" font-size="12" text-anchor="middle" fill="#8A6A4A">자를 끌어 옮기고, 선을 끝낼 눈금을 눌러요</text>`; };
  const upd=root=>{ root.querySelector('svg.mline').innerHTML=draw(); };
  const lenNow=()=>endI==null?null:(R()+endI*u-dotX)/u;
  return { html:`<svg class="mline" viewBox="0 0 ${W} 104" style="width:100%;max-width:380px;touch-action:none">${draw()}</svg>`,
    mount(root){ const svg=root.querySelector('svg.mline'); let st=null;
      svg.addEventListener('pointerdown',e=>{ e.preventDefault(); const p=_l2pt(svg,e); st={x:p.x,grab:p.x/u-rx,drag:false}; svg.setPointerCapture(e.pointerId); });
      svg.addEventListener('pointermove',e=>{ if(!st) return; const p=_l2pt(svg,e); if(Math.abs(p.x-st.x)>6) st.drag=true; if(st.drag){ rx=Math.max(-0.5,Math.min(4,Math.round((p.x/u-st.grab)*2)/2)); endI=null; upd(root); } });
      svg.addEventListener('pointerup',e=>{ if(st&&!st.drag){ const p=_l2pt(svg,e); const i=Math.round((p.x-R())/u); if(i>=1&&i<=N){ endI=i; upd(root); } } st=null; });
      svg.addEventListener('pointercancel',()=>{ st=null; }); },
    check:()=>endI!=null&&Math.abs(R()-dotX)<0.01&&endI===L, state:()=>`${endI}@${rx}`,
    mcode:()=>{ if(endI==null) return null; if(Math.abs(R()-dotX)>0.01){ if(Math.abs(R()-8-dotX)<u*0.3) return 'G2-18'; if(endI===L) return 'G2-08'; } if(endI===L+1||Math.abs(lenNow()-(L+1))<0.01) return 'G2-09'; return null; },
    reveal(){ rx=dot; endI=L; const r=document.getElementById('manip'); if(r) upd(r); } }; }
ADD('S6-15', ()=>{ const L=rnd(3,6), dot=rndPick(2.5,3,3.5); return MQ(`자를 사용하여 점 ㄱ에서 시작하는 길이가 ${L} cm인 선을 그어 보세요.`,'자의 눈금 0을 점 ㄱ에 맞추고, 눈금 '+L+'까지 선을 그어요.',drawLineManip(L,dot),`${L} cm인 선`); });
