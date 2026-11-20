/* ==========================================================================
   진단 문항 + 지식추적(KT) + 익명 묶음 전송
   - 문서: 프로젝트 claude/25_오개념분류_지식추적틀.md
   - 오답 보기·예상 오답마다 오개념 코드(N/R/G/D)를 붙여, 아이가 낸 답으로 원인을 추적한다.
   - 기록은 기기 안(localStorage)에 남고, 교사가 켠 기기만 하루 한 번 이하로 익명 묶음을 보낸다.
   ========================================================================== */
(function(){
'use strict';

/* ---------- 0. 설정 ---------- */
const KT_ENDPOINT = '';            // 서버 배포 후 'https://<worker 주소>/v1/ingest' 를 넣는다. 비어 있으면 전송 기능 꺼짐.
const KT_VER = 1;                  // 문항·코드표 버전. 템플릿을 고치면 올린다.

/* ---------- 1. 진단 문항 도우미 ---------- */
// MC: 보기형. wr = [[오답값, 오개념코드], ...] 중 2개를 골라 보기 3개를 만든다.
function MC(q, vis, ans, wr, extra){
  const A = String(ans); const seen = new Set([A]); const pool = [];
  for(const [v,c] of shuffle(wr.slice())){ if(v==null) continue; const s=String(v); if(s===''||seen.has(s)) continue; seen.add(s); pool.push([s,c]); }
  const pk = pool.slice(0,2);
  for(const f of (extra||[])){ if(pk.length>=2) break; const s=String(f); if(!seen.has(s)){ seen.add(s); pk.push([s,null]); } }
  const opts = shuffle([A, ...pk.map(x=>x[0])]);
  const o = CF(q, vis||'', A, opts); o.mis = {};
  pk.forEach(([s,c])=>{ if(c) o.mis[String(fixJ(s))] = c; });   // CF가 보기를 다시 섞으므로 글 자체로 짝짓는다
  o.diag = 1; return o;
}
// MT: 글 보기형 문제 은행. [질문, 정답, [[오답, 코드], ...], 그림?]
const MT = bank => () => { const [q,ans,wr,vis] = rndPick(...bank); return MC(q, vis||'', ans, wr); };
// WM: 직접 쓰기형. wr = [[예상 오답(정수), 코드], ...] — 아이가 그 수를 쓰면 그 오개념으로 기록.
function WM(q, vis, ans, wr, pre, post){
  const A=String(ans), coded=wr.filter(([v,c])=>v!=null&&c!=null&&v>=0&&Number.isInteger(v)&&String(v)!==A);
  // 칸 수가 정답 자릿수로 정해지므로, 자릿수가 다른 오답은 쓸 수 없다 → 그런 오답만 있으면 보기형으로 낸다.
  if(coded.length && !coded.some(([v])=>String(v).length===A.length)){
    const u=post?` ${post}`:''; return MC(q, vis, `${pre?pre+' ':''}${A}${u}`, coded.map(([v,c])=>[`${pre?pre+' ':''}${v}${u}`,c]));
  }
  const o = WN(q, vis||'', ans, pre||'', post||''); o.mis = {};
  for(const [v,c] of coded){ const s=String(v); if(!(s in o.mis)) o.mis[s]=c; }
  o.diag = 1; return o;
}
const ADD = (ep, ...gens) => { if(G36[ep]) G36[ep].push(...gens); };
const F = (n,d) => frStr(n,d);                 // 기약분수 글(예: 4분의 3, 2과 3분의 1)
const D1 = x => fmtDec(x,3);                   // 소수 글
const UNI = (...xs) => { const s=new Set(); return xs.filter(x=>{ const k=String(x); if(s.has(k)) return false; s.add(k); return true; }); };

/* ---------- 2. 그림 ---------- */
const DASH = 'stroke="#D45F16" stroke-width="2" stroke-dasharray="5 4"';
const paraSvg = (a,s,h) => SV(260,140,`<polygon points="70,20 230,20 190,110 30,110" fill="#FFE3B0" ${STK}/><line x1="70" y1="20" x2="70" y2="110" ${DASH}/>`+lab(110,130,a+' cm')+lab(92,70,h+' cm')+lab(28,58,s+' cm'),280);
const triSvg  = (a,s,h) => SV(240,140,`<polygon points="90,15 210,110 30,110" fill="#FFE3B0" ${STK}/><line x1="90" y1="15" x2="90" y2="110" ${DASH}/>`+lab(120,130,a+' cm')+lab(108,75,h+' cm')+lab(38,55,s+' cm'),260);
const prismSvg = n => { // 눕힌 n각기둥(옆에서 본 겨냥도 느낌): 왼쪽·오른쪽 끝이 밑면
  const r=34, cx1=60, cx2=200, cy=70, pts=[]; for(let i=0;i<n;i++){ const t=Math.PI*2*i/n - Math.PI/2; pts.push([Math.cos(t)*r*0.45, Math.sin(t)*r]); }
  const P=(cx)=>pts.map(([x,y])=>`${(cx+x).toFixed(1)},${(cy+y).toFixed(1)}`).join(' ');
  let s=`<polygon points="${P(cx1)}" fill="#F5D39A" ${STK}/>`; pts.forEach(([x,y])=>{ s+=`<line x1="${(cx1+x).toFixed(1)}" y1="${(cy+y).toFixed(1)}" x2="${(cx2+x).toFixed(1)}" y2="${(cy+y).toFixed(1)}" stroke="#6B3E1C" stroke-width="2"/>`; });
  s+=`<polygon points="${P(cx2)}" fill="#FFE3B0" ${STK}/>`; return SV(260,140,s,280); };
// 합동인 두 삼각형: 오른쪽은 왼쪽을 180° 돌린 것. 왼쪽에만 길이·각을 적는다.
const congSvg = (side, ang) => {
  const T1={ㄱ:[30,120],ㄴ:[150,120],ㄷ:[60,30]}, T2={ㄹ:[320,30],ㅁ:[200,30],ㅂ:[290,120]};
  const poly=T=>Object.values(T).map(p=>p.join(',')).join(' ');
  let s=`<polygon points="${poly(T1)}" fill="#FFE3B0" ${STK}/><polygon points="${poly(T2)}" fill="#E3F0FF" ${STK}/>`;
  const vl=(t,[x,y],dx,dy)=>`<text x="${x+dx}" y="${y+dy}" font-size="15" text-anchor="middle" font-weight="800" fill="#2E5E9E">${t}</text>`;
  s+=vl('ㄱ',T1.ㄱ,-12,6)+vl('ㄴ',T1.ㄴ,12,6)+vl('ㄷ',T1.ㄷ,0,-8)+vl('ㄹ',T2.ㄹ,12,0)+vl('ㅁ',T2.ㅁ,-12,0)+vl('ㅂ',T2.ㅂ,0,18);
  if(side){ s+=lab(90,138,side[0]+' cm')+lab(118,72,side[1]+' cm')+lab(28,72,side[2]+' cm'); }
  if(ang){ s+=lab(52,112,ang[0]+'°')+lab(130,112,ang[1]+'°'); }
  return SV(360,150,s,360); };

/* ---------- 3. 진단 문항 (단원별) ---------- */
/* 3-1 수와 연산: 3~4학년 */
ADD('S2-02', ()=>{ const a=rnd(1,4)*100+rnd(1,8)*10+rnd(5,9), b=rnd(1,4)*100+rnd(0,8)*10+rnd(10-a%10,9); const A=String(a).split('').map(Number), B=String(b).split('').map(Number);
  const noCarry=+A.map((x,i)=>(x+B[i])%10).join(''), concat=+A.map((x,i)=>x+B[i]).join('');
  return WM(`${a} + ${b}`, vert2(a,'+',b,a+b), a+b, [[noCarry,'N2-01'],[concat,'N2-01']]); });
ADD('S2-05', ()=>{ const a=rnd(3,9)*100+rnd(2,9)*10+rnd(0,4), b=rnd(1,Math.floor(a/100)-1)*100+rnd(0,Math.floor(a%100/10)-1)*10+rnd(a%10+1,9); const A=String(a).split('').map(Number), B=String(b).padStart(3,'0').split('').map(Number);
  const big=+A.map((x,i)=>Math.abs(x-B[i])).join('');
  return WM(`${a} − ${b}`, vert2(a,'−',b,a-b), a-b, [[big,'N2-02']]); });
ADD('S2-06', ()=>{ const h=rnd(3,9), b=rnd(1,h-1)*100+rnd(1,9)*10+rnd(1,9), a=h*100; const wrongNoDec=a-b+90; // 백의 자리를 빌리고 십의 자리에서 다시 빌리지 않음
  return WM(`${a} − ${b}`, vert2(a,'−',b,a-b), a-b, [[wrongNoDec,'N2-04'],[+String(b).split('').map((x,i)=>Math.abs(+String(a)[i]-x)).join(''),'N2-02']]); });
ADD('S3-29', ()=>{ const d=rnd(3,6), q=rnd(3,8), r=rnd(1,d-1); const n=d*q+r;
  return MC(`${n} ÷ ${d}의 몫과 나머지는?`, '', `${q} 나머지 ${r}`, [[`${q-1} 나머지 ${r+d}`,'N3-02'],[`${q+1} 나머지 ${r}`,null]]); });
ADD('S3-32', ()=>{ const d=rnd(2,4), t=rnd(1,2), o=rnd(1,3); const q=t*100+o, n=q*d; // 몫 가운데 0
  return WM(`${n} ÷ ${d}`, '', q, [[t*10+o,'N3-04']]); });
ADD('S3-20', MT([
  ['더 큰 분수는?','3분의 1',[['5분의 1','N3-06'],['둘이 같다','N3-06']]],
  ['더 큰 분수는?','4분의 1',[['8분의 1','N3-06'],['둘이 같다','N3-06']]],
  ['피자 한 판을 똑같이 나눌 때, 한 조각이 더 큰 것은?','3명이 나눌 때',[['6명이 나눌 때','N3-06'],['똑같다','N3-06']]],
]));
ADD('S3-17', MT([
  ['크기가 서로 다른 4조각 중 1조각. 전체의 4분의 1일까?','아니다',[['그렇다','N3-05']]],
  ['똑같이 나누지 않은 3조각 중 1조각은 3분의 1일까?','아니다',[['그렇다','N3-05']]],
]));
ADD('S3-35', ()=>{ const k=rnd(3,5), m=rnd(2,4), n=k*m, p=rnd(1,k-1); return WM(`${n}의 ${k}분의 ${p}은?`, '', m*p, [[m,'N3-07'],[p,'N3-07']]); });
ADD('S3-58', ()=>{ const a=rnd(2,8), b=rnd(1,9); const x=`0.${a}`, y=`0.${a-1}${b}`; return MC(`더 큰 수는? ${x} 와 ${y}`, '', x, [[y,'N4-02'],['같다','N4-02']]); });
ADD('S3-61', ()=>{ const a=rnd(2,8)+rnd(1,9)/10, b=rnd(1,9)/10+rnd(1,9)/100; const right=+(a+b).toFixed(2);
  const endAlign=+((Math.round(a*10)+Math.round(b*100))/100).toFixed(2); // 끝자리를 맞춘 경우
  return MC(`${D1(a)} + ${D1(b)}`, '', D1(right), [[D1(endAlign),'N4-03'],[D1(+(right+1).toFixed(2)),null]]); });

/* 3-2 수와 연산: 5학년 */
ADD('S3-63', ()=>{ const a=rnd(20,40), b=rnd(2,6), c=rnd(2,5); return WM(`${a} − ${b} × ${c}`, '', a-b*c, [[(a-b)*c,'N5-01']]); });
ADD('S3-65', ()=>{ const a=rnd(2,9), b=rnd(2,9), c=rnd(2,5); return WM(`${a} + ${b} × ${c}`, '', a+b*c, [[(a+b)*c,'N5-01']]); });
ADD('S3-72', ()=>{ const g=rnd(2,6), x=rnd(2,3), y=x+1; const a=g*x, b=g*y; return WM(`${a}와 ${b}의 최소공배수는?`, '', g*x*y, [[g,'N5-02'],[a*b,null]]); });
ADD('S3-71', ()=>{ const g=rnd(2,6), x=rnd(2,3), y=x+1; const a=g*x, b=g*y; return WM(`${a}와 ${b}의 최대공약수는?`, '', g, [[g*x*y,'N5-02']]); });
ADD('S3-74', MT([
  ['2분의 1과 크기가 같은 분수는?','4분의 2',[['3분의 2','N5-03'],['4분의 3','N5-03']]],
  ['3분의 1과 크기가 같은 분수는?','6분의 2',[['4분의 2','N5-03'],['5분의 3','N5-03']]],
  ['4분의 3과 크기가 같은 분수는?','8분의 6',[['5분의 4','N5-03'],['6분의 5','N5-03']]],
]));
ADD('S3-79', ()=>{ const [a,b]=rndPick([2,3],[2,5],[3,4],[3,5],[4,5]); return MC(`${b}분의 1 + ${a}분의 1`, '', F(a+b,a*b), [[F(2,a+b),'N5-04'],[F(1,a*b),null]]); });
ADD('S3-81', ()=>{ const [a,b]=rndPick([2,3],[3,4],[2,5],[4,5]); const n=a-1; return MC(`${a}분의 ${n} − ${b}분의 1`, '', F(n*b-a,a*b), [[ (n-1)>0?F(n-1,b-a>0?b-a:1):'0','N5-04'],[F(n*b-a+1,a*b),null]]); });
ADD('S3-84', MT([
  ['15 초과인 수에 15가 들어갈까?','들어가지 않는다',[['들어간다','N5-08']]],
  ['20 미만인 자연수 중 가장 큰 수는?','19',[['20','N5-08'],['21','N5-08']]],
  ['10 이상 13 미만인 자연수는 몇 개?','3개',[['4개','N5-08'],['2개','N5-08']]],
]));
ADD('S3-90', MT([
  ['6 × 2분의 1의 곱은 6과 비교하면?','6보다 작다',[['6보다 크다','N5-05'],['6과 같다','N5-05']]],
  ['10 × 5분의 4의 곱은 10과 비교하면?','10보다 작다',[['10보다 크다','N5-05'],['10과 같다','N5-05']]],
]));
ADD('S3-92', ()=>{ const d=rnd(2,4), e=d+1; return MC(`2와 ${d}분의 1 × 3과 ${e}분의 1`, '', F((2*d+1)*(3*e+1), d*e), [[`6과 ${d*e}분의 1`,'N5-06'],[F((2*d+1)*3,d),null]]); });
ADD('S3-95', ()=>{ const a=rnd(2,9), b=rnd(2,9); return MC(`0.${a} × 0.${b}`, '', D1(a*b/100), [[D1(a*b/10),'N5-07'],[D1(a*b/1000),'N5-07']]); });
ADD('S3-96', ()=>{ const a=rnd(11,49), b=rnd(2,9); return MC(`${a} × ${b} = ${a*b}이에요. ${a/10} × 0.${b}는?`, '', D1(a*b/100), [[D1(a*b/10),'N5-07'],[D1(a*b/1000),'N5-07']]); });

/* 3-3 수와 연산: 6학년 */
ADD('S3-97', ()=>{ const b=rnd(3,9), a=rnd(1,b-1); if(gcd(a,b)!==1) return MC(`3 ÷ 4의 몫을 분수로 나타내면?`,'', '4분의 3', [['3분의 4','N3-01'],['7분의 3',null]]);
  return MC(`${a} ÷ ${b}의 몫을 분수로 나타내면?`, '', F(a,b), [[`${a}분의 ${b}`,'N3-01'],[F(a,a+b),null]]); });
ADD('S3-98', ()=>{ const d=rnd(3,8), n=rnd(1,d-1), k=rnd(2,4); return MC(`${d}분의 ${n} ÷ ${k}`, '', F(n,d*k), [[F(n*k,d),'N6-04'],[`${d}분의 ${n}`,'N6-04']]); });
ADD('S3-104', ()=>{ const d=rnd(5,11), b=rnd(1,3), q=rnd(2,4), a=b*q; if(a>=d) return G36['S3-104'].at(-1)(); return MC(`${d}분의 ${a} ÷ ${d}분의 ${b}`, '', String(q), [[`${d}분의 ${q}`,'N6-03'],[F(a*b,d*d),'N6-02']]); });
ADD('S3-106', ()=>{ const k=rnd(2,6), d=rnd(2,5), n=rnd(1,d-1); if(gcd(n,d)!==1) return MC('6 ÷ 2분의 1','', '12', [['3','N6-01'],['2분의 1','N6-02']]);
  return MC(`${k} ÷ ${d}분의 ${n}`, '', F(k*d,n), [[F(k*n,d),'N6-02'],[F(n,k*d),'N6-02']]); },
  MT([
    ['8 ÷ 4분의 3의 몫은 8과 비교하면?','8보다 크다',[['8보다 작다','N6-01'],['8과 같다','N6-01']]],
    ['5 ÷ 0.5의 몫은 5와 비교하면?','5보다 크다',[['5보다 작다','N6-01'],['5와 같다','N6-01']]],
    ['1보다 작은 수로 나누면 몫은 나누어지는 수보다?','커진다',[['작아진다','N6-01'],['항상 같다','N6-01']]],
  ]));
ADD('S3-107', ()=>{ const [a,b]=rndPick([2,3],[3,4],[1,2],[3,5],[2,5]), [c,d]=rndPick([4,5],[2,3],[5,6],[3,4],[1,3]);
  return MC(`${b}분의 ${a} ÷ ${d}분의 ${c}`, '', F(a*d,b*c), [[F(b*c,a*d),'N6-02'],[F(a*c,b*d),'N6-02'],[F(b*d,a*c),'N6-02']]); },
  ()=>{ const [p,q]=rndPick([3,4],[2,3],[4,5]), [r,s]=rndPick([2,5],[1,2],[3,7]); // p/q m 가 r/s kg
    return MC(`철근 ${q}분의 ${p} m의 무게가 ${s}분의 ${r} kg이에요. 1 m의 무게는 몇 kg?`, '', F(r*q,s*p), [[F(r*p,s*q),'N6-06'],[F(p*s,q*r),'N6-06']]); },
  ()=>{ const u=rndPick([3,4],[2,3],[3,5]); const n=rnd(2,4), [fn,fd]=rndPick([1,2],[1,3],[2,3]); // 남는 양 = 몫의 분수 부분 × 한 묶음
    const [un,ud]=u; const total=F(n*fd*un+fn*un, fd*ud), left=F(fn*un, fd*ud);
    return MC(`주스 ${total} L를 ${ud}분의 ${un} L씩 병에 담으면 몫이 ${n}과 ${fd}분의 ${fn}이에요. ${n}병을 채우고 남는 주스는 몇 L?`, '', left, [[F(fn,fd),'N6-05'],[F(un,ud),null]]); });
ADD('S3-100', ()=>{ const q=rnd(11,99)/10, k=rnd(2,4); return MC(`${D1(+(q*k).toFixed(1))} ÷ ${k}`, '', D1(q), [[D1(+(q*10).toFixed(1)),'N6-07'],[D1(+(q/10).toFixed(2)),'N6-07']]); });
ADD('S3-101', ()=>{ const d=rnd(2,4), w=rnd(1,3), t=rnd(1,9); const q=+(w+t/100).toFixed(2); const n=+(q*d).toFixed(2); return MC(`${D1(n)} ÷ ${d}`, '', D1(q), [[D1(+(w+t/10).toFixed(1)),'N6-08'],[D1(+(q*10).toFixed(1)),'N6-07']]); });
ADD('S3-108', ()=>{ const b=rnd(2,9), q=rnd(3,15); const a=b*q; return MC(`${D1(a/10)} ÷ 0.${b}`, '', String(q), [[D1(q/10),'N6-07'],[String(q*10),'N6-07']]); });
ADD('S3-109', ()=>{ const b=rnd(2,9), q=rnd(3,15); const a=b*q; return MC(`${D1(a/100)} ÷ 0.${b}`, '', D1(q/10), [[String(q),'N6-07'],[D1(q/100),'N6-07']]); });
ADD('S3-112', ()=>{ const b=rnd(3,9), q=rnd(4,9), r=rnd(1,b-1); const a=b*q+r; // a/10 ÷ b/10
  return MC(`끈 ${D1(a/10)} m를 0.${b} m씩 자르면 몇 도막이 되고 몇 m가 남을까?`, '', `${q}도막, ${D1(r/10)} m`, [[`${q}도막, ${r} m`,'N6-09'],[`${q+1}도막, 0 m`,'N6-10']]); },
  MT([
    ['한 상자에 4개씩 담아요. 사과 30개를 모두 담으려면 상자는 몇 개?','8개',[['7개','N6-10'],['7.5개','N6-10']]],
    ['리본 7.5 m로 2 m짜리 리본을 몇 개 만들 수 있을까?','3개',[['4개','N6-10'],['3.75개','N6-10']]],
    ['학생 23명이 5인승 보트를 타요. 보트는 최소 몇 대?','5대',[['4대','N6-10'],['4.6대','N6-10']]],
  ]));

/* 3-4 변화와 관계 */
ADD('S5-10', ()=>{ const a=rnd(15,40), b=rnd(11,29), c=a+rnd(2,8); return WM(`${a} + ${b} = □ + ${c}, □는?`, '', a+b-c, [[a+b,'R4-02'],[a+b+c,'R4-02']]); });
ADD('S5-12', ()=>{ const k=rnd(3,6); const rows=[1,2,3].map(x=>`□ = ${x} → △ = ${x*k}`).join(', '); return MC(`${rows}. □와 △의 관계를 식으로 나타내면?`, '', `△ = □ × ${k}`, [[`△ = □ + ${k*2-1}`,'R5-02'],[`□ = △ × ${k}`,'R5-01'],[`△ = □ + ${k}`,'R5-02']]); });
ADD('S5-13', ()=>{ const a=rnd(2,9), b=rnd(2,9); if(a===b) return MC('5에 대한 3의 비는?','', '3 : 5', [['5 : 3','R6-01'],['3 : 8',null]]);
  return MC(`${a}에 대한 ${b}의 비는?`, '', `${b} : ${a}`, [[`${a} : ${b}`,'R6-01'],[`${b} : ${a+b}`,'R6-03']]); },
  MT([
    ['2 : 3과 4 : 5는 같은 비율일까?','아니다',[['그렇다 (둘 다 1 차이)','R6-02']]],
    ['우유 2컵에 코코아 3숟가락, 우유 4컵에 코코아 몇 숟가락이면 맛이 같을까?','6숟가락',[['5숟가락','R6-02'],['4숟가락','R6-02']]],
  ]));
ADD('S5-14', ()=>{ const g=rnd(8,15), h=rnd(8,15); if(g===h) return G36['S5-14'].at(-1)(); return MC(`남학생 ${g}명, 여학생 ${h}명이에요. 전체 학생 수에 대한 남학생 수의 비율은?`, '', F(g,g+h), [[F(g,h),'R6-03'],[F(h,g+h),'R6-01']]); },
  MT([
    ['비율은 1보다 클 수 있을까?','클 수 있다',[['항상 1보다 작다','R6-05'],['항상 1이다','R6-05']]],
  ]));
ADD('S5-15', MT([
  ['속력을 구하는 식은?','거리 ÷ 시간',[['시간 ÷ 거리','R6-09'],['거리 × 시간','R6-09']]],
  ['인구 밀도를 구하는 식은?','인구 ÷ 넓이',[['넓이 ÷ 인구','R6-09'],['인구 × 넓이','R6-09']]],
]), ()=>{ const t=rnd(2,4), v=rnd(4,9)*10; return MC(`${v*t} km를 ${t}시간 동안 달렸어요. 속력은 시속 몇 km?`, '', `시속 ${v} km`, [[`시속 ${D1(t/(v*t))} km`,'R6-09'],[`시속 ${v*t*t} km`,'R6-09']]); });
ADD('S5-16', ()=>{ const k=rnd(1,9); return rndPick(
    ()=>MC(`0.${k}를 백분율로 나타내면?`, '', `${k*10}%`, [[`${k}%`,'R6-04'],[`${k*100}%`,'R6-04']]),
    ()=>MC(`0.0${k}를 백분율로 나타내면?`, '', `${k}%`, [[`${k*10}%`,'R6-04'],[`0.${k}%`,'R6-04']]))(); },
  ()=>{ const p=rnd(2,9)*1000, r=rndPick(10,20,30,40); return MC(`${p}원짜리 물건을 ${r}% 할인하면 얼마에 살 수 있을까?`, '', `${p*(100-r)/100}원`, [[`${p*r/100}원`,'R6-07'],[`${p-r}원`,'R6-07']]); },
  ()=>{ const s=rndPick(10,20,25,30), w=rndPick(40,60,90,70); const tot=s+w; if((s*100)%tot!==0) return MC('소금 20 g을 물 80 g에 녹인 소금물의 진하기는?','', '20%', [['25%','R6-08'],['80%',null]]);
    return MC(`소금 ${s} g을 물 ${w} g에 녹였어요. 소금물의 진하기는?`, '', `${s*100/tot}%`, [[`${+(s*100/w).toFixed(1)}%`,'R6-08'],[`${s}%`,'R6-08']]); },
  MT([
    ['10000원짜리를 20% 올린 뒤, 다시 20% 내리면?','10000원보다 싸다',[['10000원과 같다','R6-06'],['10000원보다 비싸다','R6-06']]],
    ['150%는 나올 수 있는 백분율일까?','나올 수 있다',[['나올 수 없다','R6-05']]],
  ]));
ADD('S5-17', ()=>{ const a=rnd(2,5), b=a+rnd(1,3), k=rnd(2,4); return MC(`${a} : ${b}와 비율이 같은 비는?`, '', `${a*k} : ${b*k}`, [[`${a+k} : ${b+k}`,'R6-10'],[`${b*k} : ${a*k}`,'R6-01']]); });
ADD('S5-18', ()=>{ const [a,b]=rndPick([2,3],[3,4],[2,5],[4,5],[3,5]); return MC(`${a}분의 1 : ${b}분의 1을 간단한 자연수의 비로 나타내면?`, '', `${b} : ${a}`, [[`${a} : ${b}`,'R6-11'],[`1 : 1`,'R6-11']]); });
ADD('S5-19', ()=>{ const a=rnd(2,5), b=a+rnd(1,4), k=rnd(2,5); return WM(`${a} : ${b} = □ : ${b*k}, □는?`, '', a*k, [[(b*b*k)%a===0?b*b*k/a:null,'R6-12'],[b*k-(b-a),'R6-10']]); });
ADD('S5-20', MT([
  ['한 사람이 하면 6일 걸리는 일을 똑같이 일하는 3사람이 함께 하면 며칠?','2일',[['18일','R6-14'],['3일',null]]],
  ['10살인 형과 5살인 동생. 동생이 10살이 되면 형은?','15살',[['20살','R6-14'],['25살',null]]],
  ['빨래 1장을 말리는 데 2시간. 빨래 3장을 한꺼번에 널면?','2시간',[['6시간','R6-14'],['3시간',null]]],
]));
ADD('S5-21', ()=>{ const a=rnd(1,4), b=a+rnd(1,3), k=rnd(2,6); const tot=(a+b)*k; return WM(`${tot}을 ${a} : ${b}로 나누면 작은 쪽은?`, '', a*k, [[tot%a===0?tot/a:null,'R6-13'],[tot%b===0?tot/b:null,'R6-13'],[Math.abs(b-a)*k,null]]); });

/* 3-5 도형과 측정 */
ADD('S6-35', ()=>{ const h=rnd(1,3), m=rnd(10,50); return WM(`${h}시간 ${m}분은 몇 분?`, '', h*60+m, [[h*100+m,'G2-03']], '', '분'); });
ADD('S6-38', ()=>{ const k=rnd(2,9); return WM(`${k} km는 몇 m?`, '', k*1000, [[k*100,'G3-05'],[k*10,'G3-05']], '', 'm'); });
ADD('S6-40', ()=>{ const k=rnd(2,9); return WM(`${k} L는 몇 mL?`, '', k*1000, [[k*100,'G3-05'],[k*10,'G3-05']], '', 'mL'); });
ADD('S6-43', ()=>{ const k=rnd(2,9), g=rnd(1,9)*100; return WM(`${k} kg ${g} g은 몇 g?`, '', k*1000+g, [[k*100+g,'G3-05'],[+(`${k}${g}`),'G3-05']], '', 'g'); });
ADD('S6-26', ()=>{ const r=rnd(3,9); return rndPick(()=>WM(`반지름이 ${r} cm인 원의 지름은?`, polySvg(0), 2*r, [[r,'G3-04']], '', 'cm'), ()=>WM(`지름이 ${2*r} cm인 원의 반지름은?`, polySvg(0), r, [[4*r,'G3-04'],[2*r,'G3-04']], '', 'cm'))(); });
ADD('S6-18', MT([
  ['변을 길게 그리면 각의 크기는?','변하지 않는다',[['커진다','G3-01'],['작아진다','G3-01']]],
  ['두 변이 짧은 각과 두 변이 긴 각, 벌어진 정도가 같다면?','크기가 같다',[['변이 긴 각이 크다','G3-01'],['변이 짧은 각이 크다','G3-01']]],
]));
ADD('S6-19', MT([
  ['정사각형은 직사각형이라고 할 수 있을까?','있다',[['없다','G3-03']]],
  ['비스듬히 돌려 놓은 직사각형의 네 각은?','모두 직각',[['직각이 아니다','G3-02'],['두 개만 직각','G3-02']]],
]));
ADD('S6-28', MT([
  ['정삼각형은 이등변삼각형이라고 할 수 있을까?','있다',[['없다','G4-02']]],
  ['세 변의 길이가 같은 삼각형은?','정삼각형이면서 이등변삼각형',[['정삼각형만 된다','G4-02'],['이등변삼각형만 된다','G4-02']]],
]));
ADD('S6-31', MT([
  ['마름모는 평행사변형이라고 할 수 있을까?','있다',[['없다','G4-05']]],
  ['정사각형은 마름모라고 할 수 있을까?','있다',[['없다','G4-05']]],
  ['직사각형은 평행사변형이라고 할 수 있을까?','있다',[['없다','G4-05']]],
]));
ADD('S6-20', MT([
  ['비스듬히 그려진 두 직선이 만나서 이루는 각이 직각이면?','서로 수직이다',[['수직이 아니다 (세로가 아니라서)','G4-03']]],
  ['지금 그려진 부분에서 만나지 않는 두 선분은 항상 평행할까?','아니다',[['그렇다','G4-03']]],
]));
ADD('S6-47', MT([
  ['각도기 바깥쪽 눈금은 60, 안쪽 눈금은 120. 변이 안쪽 눈금 0에서 시작하면 각도는?','120°',[['60°','G4-01']]],
  ['각도기 바깥쪽 눈금은 50, 안쪽 눈금은 130. 변이 바깥쪽 눈금 0에서 시작하면 각도는?','50°',[['130°','G4-01']]],
]));

// 5-1 다각형의 둘레와 넓이
ADD('S6-68', ()=>{ const a=rnd(4,12), b=rnd(3,9); if(a===b) return G36['S6-68'][0](); return MC('직사각형의 넓이는?', figSvg('rect',a,b), `${a*b} cm²`, [[`${2*(a+b)} cm²`,'G5-01'],[`${a+b} cm²`,'G5-01']]); },
  MT([
    ['둘레가 같은 두 직사각형의 넓이는?','같을 수도 다를 수도 있다',[['항상 같다','G5-01'],['항상 다르다',null]]],
    ['둘레가 더 긴 직사각형은 넓이도 항상 더 넓을까?','아니다',[['그렇다','G5-01']]],
  ]),
  ()=>{ // 둘레는 같고 넓이는 다른 두 직사각형 비교
    const s=rnd(6,10); const a1=s-1, b1=1, a2=Math.ceil(s/2), b2=s-a2; return MC(`가로 ${a1} cm, 세로 ${b1} cm인 직사각형 가와 가로 ${a2} cm, 세로 ${b2} cm인 직사각형 나. 넓이가 더 넓은 것은?`, '', '나', [['둘이 같다','G5-01'],['가','G5-01']]); });
ADD('S6-69', ()=>{ const m=rnd(2,9); return MC(`${m} m²는 몇 cm²?`, '', `${m*10000} cm²`, [[`${m*100} cm²`,'G5-04'],[`${m*1000} cm²`,'G5-04']]); });
ADD('S6-70', ()=>{ const a=rnd(6,14), h=rnd(3,8), s=h+rnd(1,3); return WM('평행사변형의 넓이는? (점선이 높이)', paraSvg(a,s,h), a*h, [[a*s,'G5-02'],[a*h/2%1?null:a*h/2,'G5-03'],[2*(a+s),'G5-01']], '', 'cm²'); });
ADD('S6-71', ()=>{ const a=rnd(3,8)*2, h=rnd(3,9), s=h+rnd(1,3); return WM('삼각형의 넓이는? (점선이 높이)', triSvg(a,s,h), a*h/2, [[a*h,'G5-03'],[a*s%2?null:a*s/2,'G5-02'],[a*s,'G5-02']], '', 'cm²'); });
ADD('S6-73', ()=>{ const a=rnd(3,8), b=a+rnd(2,8), h=rnd(2,6)*2; return WM('사다리꼴의 넓이는?', figSvg('trap',a,b,h+' cm'), (a+b)*h/2, [[(a+b)*h,'G5-03'],[a*b*h%2?null:a*b*h/2,null]], '', 'cm²'); });
ADD('S6-72', ()=>{ const a=rnd(2,8)*2, b=rnd(3,12); return WM('마름모의 넓이는? (두 대각선)', figSvg('rhom',a,b+' cm'), a*b/2, [[a*b,'G5-03']], '', 'cm²'); });

// 5-2 합동과 대칭 — 넓이 계산만으로는 알 수 없는 '합동의 뜻'과 '대응'을 따로 진단
ADD('S6-52',
  MT([
    ['넓이가 같은 두 직사각형은 항상 합동일까?','아니다',[['그렇다','G5-07']]],
    ['둘레가 같은 두 삼각형은 항상 합동일까?','아니다',[['그렇다','G5-07']]],
    ['세 각의 크기가 각각 같은 두 삼각형은 항상 합동일까?','아니다',[['그렇다','G5-07']]],
    ['반드시 합동인 것은?','둘레가 같은 두 정삼각형',[['넓이가 같은 두 직사각형','G5-07'],['세 각이 같은 두 삼각형','G5-07']]],
    ['반드시 합동인 것은?','한 변이 같은 두 정사각형',[['넓이가 같은 두 삼각형','G5-07'],['둘레가 같은 두 직사각형','G5-07']]],
    ['합동인 두 도형을 고르는 방법으로 알맞은 것은?','포개어 완전히 겹치는지 본다',[['넓이가 같은지 본다','G5-07'],['둘레가 같은지 본다','G5-07']]],
  ]),
  ()=>{ const a=rnd(4,9); const b=a*rndPick(2,3); // 넓이만 같은 직사각형
    const ws=[2,3,4,6].filter(x=>(a*b)%x===0&&x!==a&&x!==b&&a*b/x!==a); if(!ws.length) return MC('넓이가 같은 두 직사각형은 항상 합동일까?','', '아니다', [['그렇다','G5-07']]); const W=rndPick(...ws); const H=a*b/W;
    return MC(`가로 ${a} cm, 세로 ${b} cm인 직사각형과 가로 ${W} cm, 세로 ${H} cm인 직사각형은 합동일까?`, '', '합동이 아니다', [['합동이다 (넓이가 같아서)','G5-07']]); });
ADD('S6-53',
  ()=>{ // 돌려 놓은 합동 삼각형에서 대응변 찾기
    let a,b,c; do{ a=rnd(8,13); b=rnd(5,10); c=rnd(5,10); }while(b===c||a===b||a===c||b+c<=a);
    const E=[['ㄹㅁ',a],['ㅁㅂ',b],['ㅂㄹ',c]]; const k=rnd(0,2); const ask=E[k];
    return WM(`삼각형 ㄱㄴㄷ과 삼각형 ㄹㅁㅂ은 합동이에요(ㄱ↔ㄹ, ㄴ↔ㅁ, ㄷ↔ㅂ). 변 ${ask[0]}의 길이는?`, congSvg([a,b,c],null), ask[1], E.filter((_,i)=>i!==k).map(e=>[e[1],'G5-08']), '', 'cm'); },
  ()=>{ // 돌려 놓은 합동 삼각형에서 대응각 찾기
    let x,y; do{ x=rnd(35,80); y=rnd(30,75); }while(x===y||x+y>=150||180-x-y===x||180-x-y===y);
    const z=180-x-y; const A=[['ㄹ',x],['ㅁ',y],['ㅂ',z]]; const k=rnd(0,2);
    return WM(`삼각형 ㄱㄴㄷ과 삼각형 ㄹㅁㅂ은 합동이에요(ㄱ↔ㄹ, ㄴ↔ㅁ, ㄷ↔ㅂ). 각 ${A[k][0]}의 크기는?`, congSvg(null,[x,y]), A[k][1], A.filter((_,i)=>i!==k).map(e=>[e[1],'G5-08']).concat([[180-A[k][1],null]]), '', '도'); },
  ()=>{ const a=rnd(4,9), b=rnd(3,8); return MC(`합동인 두 직사각형이 있어요. 하나는 둘레가 ${2*(a+b)} cm예요. 다른 하나의 둘레는?`, '', `${2*(a+b)} cm`, [[`${a+b} cm`,null],['알 수 없다','G5-08']]); });
ADD('S6-54',
  ()=>{ const r=rnd(2,7); return WM(`선대칭도형에서 점 ㄱ은 대칭축에서 ${r} cm 떨어져 있어요. 점 ㄱ과 대응점을 이은 선분의 길이는?`, '', 2*r, [[r,'G5-10']], '', 'cm'); },
  ()=>{ const k=rndPick(['정사각형',4,[[2,'G5-09'],[8,null]]],['직사각형',2,[[4,'G5-09'],[1,null]]],['마름모',2,[[4,'G5-09'],[1,null]]],['이등변삼각형',1,[[3,'G5-09'],[2,null]]],['정육각형',6,[[3,'G5-09'],[12,null]]]);
    return MC(`${k[0]}의 대칭축은 몇 개?`, '', `${k[1]}개`, k[2].map(([v,c])=>[`${v}개`,c])); },
  MT([
    ['평행사변형은 선대칭도형일까?','아니다',[['그렇다','G5-05']]],
    ['직사각형의 대각선은 대칭축일까?','아니다',[['그렇다','G5-09']]],
    ['선대칭도형에서 대칭축은 대응점을 이은 선분을?','수직으로 똑같이 둘로 나눈다',[['지나지 않는다','G5-10'],['비스듬히 지난다','G5-10']]],
  ]));
ADD('S6-55',
  ()=>{ const r=rnd(2,7); return WM(`점대칭도형에서 점 ㄱ은 대칭의 중심에서 ${r} cm 떨어져 있어요. 점 ㄱ과 대응점 사이의 거리는?`, '', 2*r, [[r,'G5-10']], '', 'cm'); },
  MT([
    ['정삼각형은 점대칭도형일까?','아니다',[['그렇다','G5-05']]],
    ['평행사변형은 점대칭도형일까?','그렇다',[['아니다','G5-05']]],
    ['선대칭도형이면서 점대칭도형인 것은?','직사각형',[['정삼각형','G5-05'],['평행사변형','G5-05']]],
  ]));
ADD('S6-57', MT([
  ['직육면체 겨냥도에서 점선으로 그린 모서리는?','보이지 않는 모서리',[['짧은 모서리','G5-06'],['없는 모서리','G5-06']]],
  ['정육면체 전개도를 접었을 때 두 면이 겹치면?','정육면체 전개도가 아니다',[['그래도 전개도다','G5-06']]],
]));

// 6-1 각기둥과 각뿔
ADD('S6-59', ()=>{ const n=rnd(3,6); const nm=PNAME[n]; return MC(`옆으로 눕혀 놓은 ${nm}각기둥이에요. 밑면의 모양은?`, prismSvg(n), `${nm}각형`, [['직사각형','G6-01'],[`${PNAME[n+1]||'팔'}각형`,null]]); },
  ()=>{ const n=rnd(3,8); const k=rndPick(['꼭짓점',2*n,[[n+1,'G6-03'],[3*n,'G6-03']]],['모서리',3*n,[[2*n,'G6-03'],[n+2,'G6-03']]],['면',n+2,[[n+1,'G6-03'],[2*n,'G6-03']]]);
    return WM(`${PNAME[n]}각기둥의 ${jo(k[0],'은','는')} 몇 개?`, '', k[1], k[2], '', '개'); },
  MT([
    ['밑면이 오각형이고 옆면이 직사각형인 입체도형의 이름은?','오각기둥',[['오각뿔','G6-02'],['사각기둥','G6-02']]],
    ['옆면이 모두 직사각형이고 밑면이 삼각형인 입체도형은?','삼각기둥',[['사각기둥','G6-02'],['삼각뿔','G6-02']]],
  ]));
ADD('S6-60', ()=>{ const n=rnd(3,8); const k=rndPick(['꼭짓점',n+1,[[2*n,'G6-03'],[n,'G6-03']]],['모서리',2*n,[[3*n,'G6-03'],[n+1,'G6-03']]],['면',n+1,[[n+2,'G6-03'],[2*n,'G6-03']]]);
    return WM(`${PNAME[n]}각뿔의 ${jo(k[0],'은','는')} 몇 개?`, '', k[1], k[2], '', '개'); },
  MT([
    ['각뿔의 높이는?','꼭짓점에서 밑면에 수직으로 내린 선분의 길이',[['옆 모서리의 길이','G6-04'],['밑면 한 변의 길이',null]]],
    ['밑면이 사각형인 각뿔의 이름은?','사각뿔',[['삼각뿔 (옆면이 삼각형이라서)','G6-02'],['사각기둥','G6-02']]],
  ]));

// 6-1 직육면체의 부피와 겉넓이
ADD('S6-76', ()=>{ const a=rnd(2,7), b=rnd(2,6), c=rnd(2,5); return WM('직육면체의 겉넓이는?', boxSvg(a,b,c), 2*(a*b+b*c+c*a), [[a*b+b*c+c*a,'G6-06'],[a*b*c,'G6-05'],[4*(a+b+c),null]], '', 'cm²'); },
  ()=>{ const a=rnd(2,9); return WM(`한 모서리가 ${a} cm인 정육면체의 겉넓이는?`, '', 6*a*a, [[4*a*a,'G6-06'],[a*a*a,'G6-05'],[a*a,'G6-06']], '', 'cm²'); });
ADD('S6-78', ()=>{ const a=rnd(2,7), b=rnd(2,6), c=rnd(2,5); return WM('직육면체의 부피는?', boxSvg(a,b,c), a*b*c, [[2*(a*b+b*c+c*a),'G6-05'],[a+b+c,null]], '', 'cm³'); },
  ()=>{ const k=rndPick(2,3); return MC(`정육면체의 모든 모서리를 ${k}배로 늘이면 부피는 몇 배?`, '', `${k**3}배`, [[`${k}배`,'G6-08'],[`${k*k}배`,'G6-08']]); },
  MT([['부피의 단위는?','cm³',[['cm²','G6-07'],['cm','G6-07']]]]));
ADD('S6-79', ()=>{ const m=rnd(2,6); return MC(`${m} m³는 몇 cm³?`, '', `${m*1000000} cm³`, [[`${m*100} cm³`,'G6-07'],[`${m*10000} cm³`,'G6-07']]); });

// 6-2 원, 원기둥
ADD('S6-74', ()=>{ const r=rnd(2,9); return MC(`반지름이 ${r} cm인 원의 원주는? (원주율 3.14)`, polySvg(0), `${D1(2*r*3.14)} cm`, [[`${D1(r*3.14)} cm`,'G6-12'],[`${D1(r*r*3.14)} cm`,'G6-12']]); },
  MT([
    ['큰 원과 작은 원의 원주율을 비교하면?','같다',[['큰 원이 크다','G6-11'],['작은 원이 크다','G6-11']]],
    ['원주율은 무엇일까?','원주 ÷ 지름',[['원주 ÷ 반지름','G6-12'],['지름 ÷ 원주','G6-12']]],
  ]));
ADD('S6-75', ()=>{ const r=rnd(2,9); return MC(`반지름이 ${r} cm인 원의 넓이는? (원주율 3.14)`, polySvg(0), `${D1(r*r*3.14)} cm²`, [[`${D1(2*r*3.14)} cm²`,'G6-12'],[`${D1(4*r*r*3.14)} cm²`,'G6-12']]); },
  ()=>{ const k=rndPick(2,3); return MC(`원의 반지름을 ${k}배로 늘이면 넓이는 몇 배?`, '', `${k*k}배`, [[`${k}배`,'G6-13'],[`${2*k}배`,'G6-13']]); });
ADD('S6-62', ()=>{ const r=rnd(2,6); return MC(`밑면의 반지름이 ${r} cm인 원기둥의 전개도에서 옆면(직사각형)의 가로는? (원주율 3.14)`, '', `${D1(2*r*3.14)} cm`, [[`${2*r} cm`,'G6-14'],[`${D1(r*3.14)} cm`,'G6-12']]); },
  MT([
    ['원기둥에 모서리가 있을까?','없다',[['있다','G6-15']]],
    ['원기둥의 꼭짓점은 몇 개?','0개',[['8개','G6-15'],['2개','G6-15']]],
  ]));
ADD('S6-63', MT([
  ['원뿔의 높이는?','꼭짓점에서 밑면에 수직으로 내린 선분의 길이',[['모선의 길이','G6-04'],['밑면의 지름',null]]],
  ['구에 꼭짓점이 있을까?','없다',[['1개 있다','G6-15']]],
]));

/* 3-6 자료와 가능성 */
ADD('S4-07', ()=>{ const B=rnd(1,4), s=rnd(1,8); return WM(`큰 그림은 10개, 작은 그림은 1개를 나타내요. 큰 그림 ${B}개와 작은 그림 ${s}개는 몇 개?`, '', 10*B+s, [[B+s,'D3-01']], '', '개'); });
ADD('S4-10', ()=>{ const u=rndPick(2,5,10), n=rnd(3,8); return WM(`세로 눈금 한 칸이 ${u}명인 막대그래프에서 막대가 ${n}칸이에요. 몇 명?`, '', u*n, [[n,'D4-01']], '', '명'); });
ADD('S4-12', MT([
  ['물결선으로 아랫부분을 줄인 꺾은선그래프에서 선이 가파르게 올라가면?','눈금 값을 보고 실제로 얼마나 늘었는지 확인해야 한다',[['크게 늘었다','D4-02'],['두 배가 되었다','D4-02']]],
]));
ADD('S4-13', MT([
  ['한 달 동안 키가 자란 변화를 나타내기 좋은 그래프는?','꺾은선그래프',[['원그래프','D6-05'],['그림그래프','D6-05']]],
  ['반 학생들이 좋아하는 과일의 비율을 나타내기 좋은 그래프는?','원그래프',[['꺾은선그래프','D6-05']]],
]));
ADD('S4-14', MT([
  ['평균은 반드시 자료 안에 있는 값일까?','아니다',[['그렇다','D5-01']]],
  ['평균은 가장 많이 나온 값일까?','아니다',[['그렇다','D5-01']]],
]));
ADD('S4-15', ()=>{ let xs, m; do{ xs=[rnd(1,5),rnd(2,7),rnd(8,15)]; m=(xs[0]+xs[1]+xs[2])/3; }while(m%1||m===(Math.min(...xs)+Math.max(...xs))/2);
  const mid=(Math.min(...xs)+Math.max(...xs))/2; return WM(`${xs.join(', ')}의 평균은?`, '', m, [[mid%1?null:mid,'D5-02'],[xs[1],'D5-01']]); });
ADD('S4-18', MT([
  ['동전을 던져 앞면이 3번 연속 나왔어요. 다음에 앞면이 나올 가능성은?','반반이다',[['거의 없다','D5-03'],['확실하다','D5-03']]],
  ['주사위를 던져 1이 나올 가능성은? (나온다/안 나온다 둘 중 하나니까?)','반반보다 작다',[['반반이다','D5-03'],['확실하다',null]]],
]));
ADD('S4-19', ()=>{ const t=rndPick(20,40,50), p=rndPick(10,20,30,40); const n=t*p/100; if(n%1) return G36['S4-19'][0](); return MC(`학생 ${t}명 중 ${n}명이 축구를 좋아해요. 띠그래프에서 축구는 몇 %?`, '', `${p}%`, [[`${n}%`,'D6-01'],[`${t}%`,null]]); },
  ()=>{ const a=rndPick(15,20,25,30), b=rndPick(20,25,30,35); return MC(`띠그래프에서 피자는 눈금 ${a}%부터 ${a+b}%까지예요. 피자는 몇 %?`, '', `${b}%`, [[`${a+b}%`,'D6-03'],[`${a}%`,'D6-03']]); });
ADD('S4-20', ()=>{ const p=rndPick(10,20,25,30,40); return MC(`원그래프에서 ${p}%인 부분의 중심각은?`, '', `${p*3.6}°`, [[`${p}°`,'D6-04'],[`${p*2}°`,null]]); });
ADD('S4-21', ()=>{ const ta=rndPick(200,300,400), pa=rndPick(20,30,40), tb=100, pb=pa+rndPick(10,20); return MC(`가 학교 ${ta}명 중 ${pa}%, 나 학교 ${tb}명 중 ${pb}%가 걸어서 와요. 걸어서 오는 학생이 더 많은 학교는?`, '', '가 학교', [['나 학교','D6-02'],['알 수 없다',null]]); });

/* ---------- 4. 오개념 이름 (화면 표시용) ---------- */
const MISNAME = {
'N2-01':'받아올림한 수를 올리지 않아요','N2-02':'자리마다 큰 수에서 작은 수를 빼요','N2-04':'0이 있을 때 받아내림이 헷갈려요',
'N3-01':'나누는 수와 나누어지는 수의 자리가 바뀌어요','N3-02':'나머지가 나누는 수보다 커요','N3-04':'몫의 가운데 0을 빠뜨려요','N3-05':'똑같이 나누지 않아도 분수라고 생각해요','N3-06':'분모가 크면 더 큰 분수라고 생각해요','N3-07':'여러 개의 몇 분의 몇이 헷갈려요',
'N4-02':'소수는 자릿수가 많으면 크다고 생각해요','N4-03':'소수점이 아니라 끝자리를 맞춰요',
'N5-01':'혼합 계산을 앞에서부터만 해요','N5-02':'최대공약수와 최소공배수가 헷갈려요','N5-03':'분자·분모에 같은 수를 더해도 같다고 생각해요','N5-04':'분자끼리, 분모끼리 더해요','N5-05':'곱하면 항상 커진다고 생각해요','N5-06':'대분수 곱셈을 따로따로 해요','N5-07':'소수 곱셈의 소수점 위치가 헷갈려요','N5-08':'이상·초과·미만의 경계가 헷갈려요',
'N6-01':'나누면 항상 작아진다고 생각해요','N6-02':'역수로 바꿀 수를 헷갈려요','N6-03':'분모가 같은 나눗셈에서 분모를 남겨요','N6-04':'(분수)÷(자연수)에서 자연수를 곱해요','N6-05':'몫의 분수 부분을 남은 양으로 생각해요','N6-06':'문장제에서 나누는 방향을 바꿔요','N6-07':'몫의 소수점 위치가 헷갈려요','N6-08':'몫의 빈 자리 0을 빠뜨려요','N6-09':'나머지의 소수점이 헷갈려요','N6-10':'올릴지 버릴지 상황을 판단하기 어려워요',
'R4-02':'등호(=)를 "답은"으로 생각해요','R5-01':'대응 관계의 방향이 바뀌어요','R5-02':'곱하는 관계를 더하기로 봐요',
'R6-01':'기준량과 비교하는 양이 바뀌어요','R6-02':'두 비를 차이로 비교해요','R6-03':'부분끼리의 비와 전체에 대한 비가 헷갈려요','R6-04':'소수를 백분율로 바꿀 때 자리가 헷갈려요','R6-05':'비율은 1을 넘을 수 없다고 생각해요','R6-06':'백분율의 기준이 바뀌는 것을 놓쳐요','R6-07':'할인율과 할인한 값이 헷갈려요','R6-08':'진하기의 기준을 물로 잡아요','R6-09':'속력·밀도에서 나누는 방향이 바뀌어요','R6-10':'비의 성질을 더하기로 써요','R6-11':'분수의 비를 자연수의 비로 바꿀 때 거꾸로 해요','R6-12':'외항·내항의 곱을 잘못 짝지어요','R6-13':'비례배분에서 전체를 항으로 나눠요','R6-14':'비례하지 않는 상황에 비례식을 써요',
'G2-03':'시간을 100분 단위로 계산해요','G3-01':'변이 길면 각이 크다고 생각해요','G3-02':'돌려 놓은 직각을 알아보기 어려워요','G3-03':'정사각형은 직사각형이 아니라고 생각해요','G3-04':'지름과 반지름이 헷갈려요','G3-05':'단위를 100배로 바꿔요',
'G4-01':'각도기 안쪽·바깥쪽 눈금이 헷갈려요','G4-02':'삼각형은 이름이 하나뿐이라고 생각해요','G4-03':'수직·평행을 방향으로만 판단해요','G4-05':'사각형 사이의 포함 관계가 헷갈려요',
'G5-01':'넓이와 둘레가 헷갈려요','G5-02':'비스듬한 변을 높이로 써요','G5-03':'넓이 공식에서 ÷ 2를 빠뜨려요','G5-04':'넓이 단위를 길이처럼 바꿔요','G5-05':'선대칭과 점대칭이 헷갈려요','G5-06':'겨냥도·전개도에서 보이지 않는 부분이 헷갈려요',
'G5-07':'넓이나 둘레가 같으면 합동이라고 생각해요','G5-08':'돌려 놓은 합동 도형에서 대응을 위치로 찾아요','G5-09':'대각선이면 대칭축이라고 생각해요','G5-10':'대칭축(중심)에서 대응점까지의 거리가 헷갈려요',
'G6-01':'아래에 놓인 면이 밑면이라고 생각해요','G6-02':'각기둥·각뿔 이름을 붙이기 어려워요','G6-03':'면·모서리·꼭짓점 수 규칙이 섞여요','G6-04':'높이를 옆 모서리(모선)로 생각해요','G6-05':'부피와 겉넓이가 헷갈려요','G6-06':'겉넓이에서 면을 빠뜨려요','G6-07':'부피 단위가 헷갈려요','G6-08':'길이가 2배면 부피도 2배라고 생각해요',
'G6-11':'원주율이 원마다 다르다고 생각해요','G6-12':'원주·넓이 공식이 헷갈려요','G6-13':'반지름이 2배면 넓이도 2배라고 생각해요','G6-14':'원기둥 옆면의 가로를 지름으로 생각해요','G6-15':'원기둥에도 모서리·꼭짓점이 있다고 생각해요',
'D3-01':'그림그래프의 큰 그림·작은 그림 단위를 놓쳐요','D4-01':'막대그래프 한 칸을 항상 1로 읽어요','D4-02':'물결선 그래프의 변화를 크게 읽어요','D5-01':'평균은 자료 안에 있는 값이라고 생각해요','D5-02':'평균을 가장 큰 값과 작은 값의 가운데로 구해요','D5-03':'앞의 결과가 다음 결과에 영향을 준다고 생각해요',
'D6-01':'사람 수를 %로 읽어요','D6-02':'전체가 다른데 비율로만 비교해요','D6-03':'띠그래프 눈금 위치를 그대로 읽어요','D6-04':'%를 각도로 그대로 옮겨요','D6-05':'목적에 맞는 그래프를 고르기 어려워요'};

/* ---------- 5. 단원 → 지식요소(KC) ---------- */
const UNIT_KC = {'3-1 덧셈과 뺄셈 (세 자리 수)':'KN3-1','3-1 나눗셈':'KN3-3','3-1 곱셈 (두 자리 × 한 자리)':'KN3-2','3-1 분수와 소수':'KN3-4','3-2 곱셈':'KN3-2','3-2 나눗셈':'KN3-3','3-2 분수':'KN3-4',
'4-1 큰 수':'KN4-1','4-1 곱셈과 나눗셈':'KN4-2','4-2 분수의 덧셈과 뺄셈':'KN4-3','4-2 소수의 덧셈과 뺄셈':'KN4-4','5-1 자연수의 혼합 계산':'KN5-1','5-1 약수와 배수':'KN5-2','5-1 약분과 통분':'KN5-3','5-1 분수의 덧셈과 뺄셈 (분모가 다른)':'KN5-3',
'5-2 수의 범위와 어림하기':'KN5-6','5-2 분수의 곱셈':'KN5-4','5-2 소수의 곱셈':'KN5-5','6-1 분수의 나눗셈':'KN6-1','6-1 소수의 나눗셈':'KN6-2','6-2 분수의 나눗셈':'KN6-1','6-2 소수의 나눗셈':'KN6-2',
'2-1 분류하기':'KD2-1','2-2 표와 그래프':'KD2-1','3-2 자료의 정리':'KD4-1','4-1 막대그래프':'KD4-1','4-2 꺾은선그래프':'KD4-1','5-2 평균과 가능성':'KD5-1','6-1 비율그래프':'KD6-1',
'1-2 규칙 찾기':'KR2-1','2-2 규칙 찾기':'KR2-1','4-1 규칙 찾기':'KR4-1','5-1 규칙과 대응':'KR5-1','6-1 비와 비율':'KR6-1','6-2 비례식과 비례배분':'KR6-3',
'1-1·1-2 모양과 비교하기':'KG1-1','2-1 여러 가지 도형':'KG2-2','1-2·2-2 시각과 시간':'KG2-1','2-2 길이 재기':'KG2-1','3-1 평면도형':'KG3-1','3-2 원':'KG3-2','3-1 길이와 시간':'KG3-3','3-2 들이와 무게':'KG3-3',
'4-1 각도':'KG4-1','4-1 평면도형의 이동':'KG4-3','4-2 수직과 평행':'KG4-2','4-2 삼각형·사각형·다각형':'KG4-2','5-1 다각형의 둘레와 넓이':'KG5-1','5-2 합동과 대칭':'KG5-2','5-2 직육면체':'KG5-3',
'6-1 각기둥과 각뿔':'KG6-1','6-1 직육면체의 부피와 겉넓이':'KG6-2','6-2 공간과 입체':'KG6-3','6-2 원기둥·원뿔·구, 원의 넓이':'KG6-4'};
const EP_KC_OVR = {'S5-16':'KR6-2','S6-62':'KG6-5','S6-63':'KG6-5','S3-21':'KN3-5','S3-22':'KN3-5'};
let EP_KC = null;
function epKC(ep){ if(!EP_KC){ EP_KC={}; (UNITS36||[]).forEach(u=>u.eps.forEach(e=>{ EP_KC[e]=EP_KC_OVR[e]||UNIT_KC[u.title]||null; })); } return EP_KC[ep]||null; }

/* ---------- 6. 기록·추적 ---------- */
const LK='dotori-kt-log', SK='dotori-kt-state', DK='dotori-kt-did', QK='dotori-kt-queue', CK='dotori-kt-cfg';
const J=(k,d)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } };
const W=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
const today=()=>{ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const BKT={L0:.3,T:.15,S:.1};
function did(){ let v=J(DK,null); if(!v||!/^[0-9a-f-]{36}$/.test(v)){ v=(crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{ const r=crypto.getRandomValues(new Uint8Array(1))[0]&15; return (c==='x'?r:(r&3|8)).toString(16); })); W(DK,v); } return v; }
const clean=s=>String(s==null?'':s).replace(/[^0-9A-Za-z가-힣ㄱ-ㅎ .:,/%°²³+×÷=−\-~()]/g,'').slice(0,24);

function rec(q, given, ok){
  if(!q||q._kt) return; q._kt=1;
  const ep=q._ep||(S&&S.ep)||''; if(!/^S\d-\d{1,3}$/.test(String(ep))) return;   // 3~6학년 영역 문항만
  const g=clean(given), gk=/^\d+$/.test(String(given))?String(+given):String(given); const m=ok?null:((q.mis&&(q.mis[String(given)]||q.mis[gk]))||null);
  const ms=q._t0?Math.min(600000,Date.now()-q._t0):0; const kc=epKC(ep);
  const r={d:today(),ep,ti:q._ti==null?-1:q._ti,g,ok:ok?1:0,m,ms,dg:q.diag?1:0,v:KT_VER};
  const log=J(LK,[]); log.push(r); W(LK,log.slice(-5000));
  const st=J(SK,{kc:{},mis:{},exp:{}});
  if(kc){ const nOpt=(q.opts&&q.opts.length)||0; const G=nOpt?1/nOpt:.05; let L=st.kc[kc]==null?BKT.L0:st.kc[kc];
    const post=ok?(L*(1-BKT.S))/(L*(1-BKT.S)+(1-L)*G):(L*BKT.S)/(L*BKT.S+(1-L)*(1-G)); st.kc[kc]=+(post+(1-post)*BKT.T).toFixed(4); }
  if(q.mis){ for(const c of new Set(Object.values(q.mis))) st.exp[c]=(st.exp[c]||0)+1; }
  if(m){ const e=st.mis[m]||{n:0,t:[],ep:[]}; e.n++; const key=`${ep}:${q._ti}`; if(!e.t.includes(key)) e.t.push(key); if(!e.ep.includes(ep)) e.ep.push(ep); e.t=e.t.slice(-20); st.mis[m]=e; }
  W(SK,st);
  if(cfg().share&&KT_ENDPOINT){ const qu=J(QK,[]); qu.push([r.d,r.ep,r.ti,r.g,r.ok,r.m,r.ms,r.dg]); W(QK,qu.slice(-3000)); }
}
function status(code){ const st=J(SK,{kc:{},mis:{},exp:{}}); const e=st.mis[code]; if(!e) return null; const exp=st.exp[code]||0; const distinct=e.t.length;
  if(distinct>=2&&exp>=3&&e.n/exp>=2/3) return '확인'; if(distinct>=2) return '의심'; return null; }
function report(){ const st=J(SK,{kc:{},mis:{},exp:{}}); const mis=Object.keys(st.mis).map(c=>({c,name:MISNAME[c]||c,s:status(c),n:st.mis[c].n,ep:st.mis[c].ep})).filter(x=>x.s).sort((a,b)=>(a.s==='확인'?0:1)-(b.s==='확인'?0:1)||b.n-a.n);
  const kc=Object.entries(st.kc).map(([k,p])=>({k,p})).sort((a,b)=>a.p-b.p); return {mis,kc}; }

/* ---------- 7. 기존 화면에 연결 ---------- */
const _q0=question; question=function(q){ if(q) q._t0=Date.now(); return _q0.apply(this,arguments); };
const _a0=answer; answer=function(btn,q){ try{ if(S&&S.tries===0&&q&&!q._kt){ const v=btn&&btn.dataset?btn.dataset.v:''; if(v!=='__done') rec(q,v,String(v)===String(q.ans)); } }catch(e){} return _a0.apply(this,arguments); };

const KCNAME={KN3:'세 자리 수·곱셈·나눗셈',KN4:'큰 수·분수·소수 계산',KN5:'혼합 계산·분수·소수의 곱셈',KN6:'분수·소수의 나눗셈',KR:'규칙·비와 비율',KG:'도형과 측정',KD:'자료와 가능성'};
const _sp0=statsPage; statsPage=function(){ const r=_sp0.apply(this,arguments); try{
  const R=report(); const st=document.querySelector('#app .stage'); if(!st) return r;
  const misHtml=R.mis.length?R.mis.slice(0,6).map(x=>`<li><b>${x.s==='확인'?'🔴':'🟡'} ${x.name}</b><span class="rd"> ${x.ep.slice(0,3).join(' · ')}</span></li>`).join(''):'<li>아직 눈에 띄는 생각 습관이 없어요. 계속 풀어 보세요!</li>';
  st.insertAdjacentHTML('beforeend',`<h2 class="sec">🧭 생각 습관 점검</h2><ul class="recent">${misHtml}</ul><p style="font-size:.9rem;color:var(--ink-soft)">🔴 여러 번 같은 이유로 틀렸어요 · 🟡 두 번 보였어요. 옆에 적힌 편을 다시 풀어 보세요.</p>`);
  if(cfg().share) st.insertAdjacentHTML('beforeend',`<p style="font-size:.8rem;color:var(--ink-soft)">이 기기는 이름 없이 학습 기록을 공유하고 있어요.</p>`);
 }catch(e){} return r; };

/* ---------- 8. 익명 묶음 전송 (교사가 켠 기기만) ---------- */
// 교사가 한 번: 주소 끝에 #kt-share-on 을 붙여 열면 켜지고, #kt-share-off 면 꺼진다. #kt-reset 은 기기 번호를 새로 만든다.
function cfg(){ return J(CK,{share:false,last:0,after:0}); }
function setCfg(c){ W(CK,c); }
(function hashCmd(){ const h=location.hash; if(!h.startsWith('#kt-')) return; const c=cfg();
  if(h==='#kt-share-on'){ c.share=true; did(); } else if(h==='#kt-share-off'){ c.share=false; W(QK,[]); } else if(h==='#kt-reset'){ try{ localStorage.removeItem(DK); }catch(e){} did(); }
  setCfg(c); history.replaceState(null,'',location.pathname+location.search); })();
const DAY=864e5;
function maybeSend(){ if(!KT_ENDPOINT||!navigator.sendBeacon) return; const c=cfg(); if(!c.share) return; const qu=J(QK,[]); const now=Date.now();
  if(qu.length<50||now-c.last<DAY) return;
  if(!c.after){ c.after=now+Math.floor(Math.random()*6*3600e3); setCfg(c); return; }     // 기기마다 0~6시간 늦춰 몰림 방지
  if(now<c.after) return;
  const batch=qu.slice(0,2000); const body=JSON.stringify({v:KT_VER,did:did(),day:today(),recs:batch});
  let ok=false; try{ ok=navigator.sendBeacon(KT_ENDPOINT,new Blob([body],{type:'text/plain'})); }catch(e){}
  if(ok){ W(QK,qu.slice(batch.length)); c.last=now; c.after=0; setCfg(c); }                // 실패하면 그대로 두고 다음 날 함께 보냄
}
addEventListener('pagehide',maybeSend);
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') maybeSend(); });

window.KT={rec,report,status,epKC,MISNAME,_maybeSend:maybeSend};
})();
