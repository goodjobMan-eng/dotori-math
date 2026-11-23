/* 문제지형 발문: 수와 단위가 줄바꿈으로 떨어지지 않게 */
window.nmJ=w=>{ const k=(String(w).charCodeAt(String(w).length-1)-0xAC00)%28; return k>0?w+'이는':w+'는'; };
window.qpNb=t=>(/[가-힣]/.test(String(t||'').replace(/<[^>]+>/g,''))?String(t):`${t}<span class="qp-sub">계산해 보세요.</span>`).replace(/(\d[\d,.]*)\s(?=(cm|mm|km|m|kg|g|t|L|mL|°|%|초|분|시간|개|명|원|쪽|번|권|자루|마리|장|대|송이|배)(?![a-zA-Z]))/g,'$1&nbsp;');

/* ---------- 3-77. 국가 수리력 진단도구 꼴 문항(편에 섞어 냄) ----------
   국가기초학력지원포털의 「수리력 진단도구」(한국교육과정평가원, 1수준·2수준 × 수와 연산·도형과 측정)의
   문항 '짜임'(차례, 생활 맥락, 4지선다, 말풍선 고르기, 표·그림 읽기)과 도달 기준(분할 점수)만 따왔다.
   문항 글·수·그림은 모두 새로 만들고, 풀 때마다 수가 바뀐다(검사지 문항을 옮기지 않음 — 저작권은 평가원).
   1수준 = 1~2학년 내용, 2수준 = 3~4학년 내용. 오답 보기는 오개념 코드를 단다. */
{ const S=GX_S, RED='#B04A2E', BL='#2F6FA8', pic=(g,W,H,cap)=>cpWrap(cpSvg(g,W,H,300),cap||''), BK={};
  const pk=a=>a[rnd(0,a.length-1)], nm=()=>pk(['민지','도윤','서아','하준','지우','유나','시우','예린','준호','다은']);
  const won=n=>n.toLocaleString('ko-KR'), jw=n=>n+('0136789'.includes(String(n).slice(-1))&&!'29'.includes(String(n).slice(-1))?'과':'와');
  const dot=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="9" fill="${c||'#F2A65A'}" stroke="${S}" stroke-width="1.5"/>`;
  const reg=(lv,dom,items)=>{ BK[lv+dom]=items; };
  /* 같은 답이 겹치지 않는 4지선다. ans와 겹치거나 서로 겹치는 오답은 버리고, 3개가 안 되면 null을 돌려 다시 만들게 한다 */
  const Q4=(q,vis,ans,wr)=>{ const A=String(ans), s=new Set([A]), w=[]; for(const [v,c] of wr){ if(v==null) continue; const k=String(v); if(s.has(k)||/NaN|undefined|^-/.test(k)) continue; s.add(k); w.push([k,c]); } if(w.length<3) return null; return cq(q,vis,A,w.slice(0,3)); };
  const tryQ=f=>{ for(let t=0;t<30;t++){ const q=f(); if(q) return q; } return null; };
  const sino=n=>{ const D=['','일','이','삼','사','오','육','칠','팔','구'], U=['','십','백','천']; let s=''; const d=String(n).split('').reverse(); for(let i=d.length-1;i>=0;i--){ const v=+d[i]; if(!v) continue; s+=(v===1&&i>0?'':D[v])+U[i]; } return s||'영'; };
  const bigRead=n=>{ const man=Math.floor(n/10000), r=n%10000; return (man?sino(man)+'만 ':'')+(r?sino(r):'').trim(); };

  /* ===== 1수준 · 수와 연산 (14문항, 10개 이상 맞히면 도달) ===== */
  const N1=[
    ['10까지의 수 세기',()=>{ const n=rnd(5,9); let g=''; for(let i=0;i<n;i++) g+=dot(22+(i%5)*30,22+Math.floor(i/5)*30,'#F7B6C2'); return Q4('사탕은 모두 몇 개인가요?',pic(g,160,70),n+'개',[[(n-1)+'개','N1-07'],[(n+1)+'개','N1-07'],[(n+2)+'개',null],[(n-2)+'개',null]]); }],
    ['모으기',()=>{ const a=rnd(2,6), b=rnd(2,9-a); let g=''; for(let i=0;i<a;i++) g+=`<rect x="${12+i*16}" y="14" width="9" height="46" rx="2" fill="#FFD35C" stroke="${S}"/>`; for(let i=0;i<b;i++) g+=`<rect x="${132+i*16}" y="14" width="9" height="46" rx="2" fill="#9CC9F0" stroke="${S}"/>`; return Q4('연필을 모으면 모두 몇 자루인가요?',pic(g,240,72),(a+b)+'자루',[[(Math.abs(a-b)||a+b+2)+'자루','N1-03'],[a+'자루',null],[b+'자루',null],[(a+b+1)+'자루','N1-07']]); }],
    ['받아올림이 있는 두 자리 수의 덧셈(문장)',()=>{ const a=rnd(14,48), b=rnd(13,49); if(a%10+b%10<10||a+b>99) return null; const w=nm(); return Q4(`${nmJ(w)} 어제 동화책을 ${a}쪽, 오늘 ${b}쪽 읽었어요. 어제와 오늘 읽은 동화책은 모두 몇 쪽인가요?`,'',(a+b)+'쪽',[[(a+b-10)+'쪽','N2-01'],[(a+b+10)+'쪽',null],[(Math.floor(a/10)+Math.floor(b/10))*10+(a%10+b%10)%10+10+'쪽',null],[Math.abs(a-b)+'쪽','N1-03']]); }],
    ['받아올림이 있는 두 자리 수의 덧셈(생활)',()=>{ const a=rnd(15,39), b=rnd(26,59); if(a%10+b%10<10||a+b>99) return null; return Q4(`줄넘기를 어제는 ${a}번, 오늘은 ${b}번 넘었어요. 어제와 오늘 넘은 줄넘기는 모두 몇 번인가요?`,'',(a+b)+'번',[[(a+b-10)+'번','N2-01'],[(b-a)+'번','N1-03'],[(a+b+10)+'번',null],[(a+b+1)+'번',null]]); }],
    ['네 자리 수 (수 모형)',()=>{ const th=rnd(1,4), h=rnd(1,5), t=rnd(1,5), o=rnd(1,8); const n=th*1000+h*100+t*10+o; let g='', x=8; const blk=(w,hh,c,k)=>{ for(let i=0;i<k;i++){ g+=`<rect x="${x}" y="${70-hh}" width="${w}" height="${hh}" fill="${c}" stroke="${S}" stroke-width="1"/>`; x+=w+3; } x+=8; }; blk(22,40,'#E9D5F5',th); blk(16,30,'#FBD9A5',h); blk(5,30,'#CFE0F7',t); blk(6,6,'#FFF3C4',o);
      const cap='큰 정육면체 1000, 판 100, 막대 10, 작은 정육면체 1'; return Q4('수 모형이 나타내는 수는 얼마인가요?',pic(g,Math.max(x,120),76,cap),n,[[th*1000+t*100+h*10+o,'N4-15'],[n+100,null],[(th+1)*1000+h*100+t*10+o,null],[th*1000+h*100+o*10+t,'N4-15']]); }],
    ['전체에서 부분 빼기(문장)',()=>{ const tot=rnd(21,32), b=rnd(11,tot-8); return Q4(`우리 반 학생은 모두 ${tot}명이에요. 남학생이 ${b}명이면 여학생은 몇 명인가요?`,'',(tot-b)+'명',[[(tot+b)+'명','N1-03'],[(tot-b+10)+'명','N2-02'],[(tot-b-2)+'명',null],[b+'명',null]]); }],
    ['묶어 세기',()=>{ const k=pk([5,10]), m=rnd(4,8), n=k*m; let g=''; for(let i=0;i<m;i++){ const x=10+(i%4)*58, y=8+Math.floor(i/4)*44; g+=`<rect x="${x}" y="${y}" width="52" height="38" rx="8" fill="none" stroke="${BL}" stroke-dasharray="3 2"/>`; for(let j=0;j<Math.min(k,5);j++) g+=`<circle cx="${x+9+j*9}" cy="${y+12}" r="4" fill="#F7B6C2" stroke="${S}" stroke-width=".8"/>`; g+=gxT(x+26,y+32,k+'개',10); } return Q4(`풍선을 ${k}개씩 묶었어요. 풍선은 모두 몇 개인가요?`,pic(g,250,Math.ceil(m/4)*44+10),n+'개',[[(k+m)+'개','N2-05'],[(n-k)+'개',null],[(n+k)+'개',null],[m+'개',null]]); }],
    ['가르기',()=>{ const n=10, a=rnd(2,n-2); let g=''; for(let i=0;i<n;i++) g+=dot(16+(i%6)*24,18+Math.floor(i/6)*24,'#fff'); g+=`<text x="190" y="30" font-size="15" fill="#4A2E14">${n} → ${jw(a)} □</text>`; return Q4(`축구공 ${n}개를 ${a}개와 몇 개로 갈랐어요. □ 안에 알맞은 수는?`,pic(g,290,60),n-a,[[n+a,'N1-03'],[n,null],[a,null],[n-a+1,'N1-02']]); }],
    ['세 자리 수 읽기',()=>{ const mk=()=>{ const n=rnd(1,9)*100+pk([0,rnd(1,9)])*10+rnd(1,9); return n; }; const ns=[mk(),mk(),mk(),mk()]; if(new Set(ns).size<4) return null; const bad=rnd(0,3); const wr=n=>{ const h=Math.floor(n/100), t=Math.floor(n/10)%10, o=n%10; return t===0?sino(h*100)+'영'+sino(o):sino(h)+'백'+sino(t)+sino(o); };
      const ctx=['번 버스가 와요','쪽까지 읽었어요','번 번호표를 뽑았어요','개를 모았어요'], lines=ns.map((n,i)=>`“${n}${ctx[i]}” → ${i===bad?wr(n):sino(n)}`);
      return Q4('수를 바르게 읽지 않은 것은 무엇인가요?','',lines[bad],lines.filter((_,i)=>i!==bad).map(s=>[s,null]).concat([['모두 바르게 읽었어요',null]])); }],
    ['두 자리 수 쓰고 읽기',()=>{ const t=rnd(5,9), o=rnd(1,9), n=t*10+o; let g=''; for(let i=0;i<t;i++) g+=`<rect x="${6+i*26}" y="6" width="22" height="30" rx="4" fill="#FFF3C4" stroke="${S}"/>`+gxT(17+i*26,26,'10',9); for(let i=0;i<o;i++) g+=`<ellipse cx="${14+i*16}" cy="52" rx="6" ry="8" fill="#fff" stroke="${S}"/>`; return Q4('달걀의 수를 바르게 쓰고 읽은 것은?',pic(g,Math.max(t*26+10,o*16+20),66,'한 판에 10개씩'),`${n} – ${sino(n)}`,[[`${n} – ${sino(t)}${sino(o)}`,'N1-10'],[`${t+1}${o} – ${sino(t+1)}십${sino(o)}`.replace(/^(\d+)/,m=>m),null],[`${(t+1)*10+o} – ${sino(t)}${sino(o)}`,null],[`${o}${t} – ${sino(o*10+t)}`,'N4-15']]); }],
    ['덧셈식과 뺄셈식의 관계',()=>{ const a=rnd(31,58), b=rnd(11,a-12); const c=a-b; return Q4(`뺄셈식 ${a} − ${b} = ${c}를 덧셈식으로 바꾸면 □ + ${b} = ${a}, ${b} + □ = ${a}예요. □에 공통으로 들어갈 수는?`,'',c,[[b,'N1-08'],[a,'N1-08'],[a+b,'N1-03'],[c+1,null]]); }],
    ['수 카드로 가장 큰 네 자리 수',()=>{ const ds=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4); const hi=+ds.slice().sort((a,b)=>b-a).join(''), lo=+ds.slice().sort((a,b)=>a-b).join(''); const big=pk([1,0]); const cards=`<div style="display:flex;gap:8px;justify-content:center">${ds.map(d=>`<span style="display:inline-block;width:34px;height:44px;border:2px solid #7A4A1E;border-radius:6px;font:700 24px/44px Jua,sans-serif;background:#fff">${d}</span>`).join('')}</div>`;
      return big?Q4('수 카드 4장을 한 번씩만 써서 만들 수 있는 가장 큰 네 자리 수는 얼마일까요?',cards,hi,[[lo,'N3-37'],[+ds.join(''),null],[+String(hi).slice(0,2)+String(hi).slice(3)+String(hi)[2]+'' ,null],[+(String(hi)[1]+String(hi)[0]+String(hi).slice(2)),null]]):Q4('수 카드 4장을 한 번씩만 써서 만들 수 있는 가장 작은 네 자리 수는 얼마일까요?',cards,lo,[[hi,'N3-37'],[+ds.join(''),null],[+(String(lo)[1]+String(lo)[0]+String(lo).slice(2)),null],[+(String(lo).slice(0,2)+String(lo)[3]+String(lo)[2]),null]]); }],
    ['수 카드로 뺄셈식 만들기',()=>{ const a=rnd(12,29), b=rnd(13,39); const c=a+b; if(c>99||a===b) return null; const cards=[a,b,c].sort((x,y)=>x-y); return Q4(`수 카드 ${cards.join(', ')}을 모두 한 번씩 써서 만든 뺄셈식으로 알맞은 것은?`,'',`${c} − ${b} = ${a}`,[[`${Math.max(a,b)} − ${Math.min(a,b)} = ${c}`,null],[`${c} − ${b} = ${b}`,null],[`${a} + ${b} = ${c}`,'N1-03']]); }],
    ['더 많은 수 구하기(비교)',()=>{ const a=rnd(41,68), b=rnd(19,a-9); if(a%10>=b%10) return null; const w=nm(); return Q4(`${nmJ(w)} 딸기를 ${a}개, 동생은 ${b}개 땄어요. ${nmJ(w)} 동생보다 딸기를 몇 개 더 땄나요?`,'',(a-b)+'개',[[(a-b+10)+'개','N2-02'],[(a+b)+'개','N1-03'],[(Math.floor(a/10)-Math.floor(b/10))*10+Math.abs(a%10-b%10)+'개','N2-02'],[(a-b-1)+'개',null]]); }],
  ];
  reg(1,'수',N1);

  /* ===== 1수준 · 도형과 측정 (12문항, 8개 이상) ===== */
  const shp={ circ:(x,y)=>`<circle cx="${x}" cy="${y}" r="20" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`, tri:(x,y)=>`<polygon points="${x},${y-20} ${x+21},${y+16} ${x-21},${y+16}" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`, sq:(x,y)=>`<rect x="${x-18}" y="${y-18}" width="36" height="36" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`, ell:(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="24" ry="13" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`,
    pent:(x,y)=>`<polygon points="${[0,1,2,3,4].map(i=>[x+20*Math.sin(i*1.2566),y-20*Math.cos(i*1.2566)].map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`, hex:(x,y)=>`<polygon points="${[0,1,2,3,4,5].map(i=>[x+20*Math.sin(i*1.0472+.5236),y-20*Math.cos(i*1.0472+.5236)].map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`,
    semi:(x,y)=>`<path d="M${x-22},${y+8} A22,22 0 0 1 ${x+22},${y+8} Z" fill="${GX_F}" stroke="${S}" stroke-width="2"/>`, rect:(x,y)=>`<rect x="${x-25}" y="${y-14}" width="50" height="28" fill="${GX_F}" stroke="${S}" stroke-width="2"/>` };
  const row4=(ks,labs)=>pic(ks.map((k,i)=>shp[k](36+i*64,34)+gxT(36+i*64,74,labs[i],13)).join(''),260,82);
  const L4=['①','②','③','④'], HG=['㉠','㉡','㉢','㉣','㉤'];
  const G1=[
    ['원 찾기',()=>{ const ks=shuffle(['circ','ell','semi',pk(['hex','pent'])]); const i=ks.indexOf('circ'); const nameOf={ell:'길쭉한 동그라미',semi:'반원 모양',hex:'육각형',pent:'오각형'}; return Q4('원을 고르세요.',row4(ks,L4),L4[i],ks.map((k,j)=>[L4[j],k==='ell'||k==='semi'?'G1-02':null]).filter(x=>x[0]!==L4[i])); }],
    ['같은 모양 세기',()=>{ const ks=[]; for(let i=0;i<8;i++) ks.push(pk(['sq','tri','circ','rect'])); const n=ks.filter(k=>k==='sq').length; if(n<1||n+ks.filter(k=>k==='rect').length>6) return null; const g=ks.map((k,i)=>shp[k](30+(i%4)*60,30+Math.floor(i/4)*52)).join(''); const r=ks.filter(k=>k==='rect').length; const N=n+r, t=ks.filter(k=>k==='tri').length; return Q4('▢ 모양은 모두 몇 개인가요?',pic(g,250,108),N+'개',[[(r?n:N+1)+'개','G1-02'],[(N+t)+'개','G1-02'],[(N+2)+'개',null],[(N-1||N+3)+'개',null]]); }],
    ['오각형 고르기',()=>{ const ks=shuffle(['pent','pent','hex','tri','sq']); const ids=ks.map((k,i)=>k==='pent'?i:-1).filter(i=>i>=0); const g=ks.map((k,i)=>shp[k](30+i*52,32)+gxT(30+i*52,72,HG[i],13)).join(''); const ans=ids.map(i=>HG[i]).join(', '); const others=[[0,1],[1,2],[2,3],[3,4],[0,2],[1,3],[2,4],[0,4],[1,4],[0,3]].map(p=>p.map(i=>HG[i]).join(', ')).filter(s=>s!==ans); const hexI=ks.indexOf('hex'); return Q4('오각형을 모두 고른 것은?',pic(g,270,82),ans,[[[ids[0],hexI].sort().map(i=>HG[i]).join(', '),'G1-02'],...shuffle(others).slice(0,3).map(s=>[s,null])]); }],
    ['전자시계와 같은 시각',()=>{ const h=rnd(1,11), m=pk([0,30,rnd(1,11)*5]); const t=`${h}:${String(m).padStart(2,'0')}`; const vis=`<div style="display:inline-block;background:#222;color:#7CFC7C;font:700 30px/1 monospace;padding:6px 14px;border-radius:8px">${t}</div>`; const wr=[[`${m/5===0?12:m/5}시 ${h*5}분`,'G2-07'],[`${h+1}시 ${m}분`,'G2-06'],[`${h}시 ${m===30?0:30}분`,null],[`${h}시 ${m+5>55?m-5:m+5}분`,null]].map(([s,c])=>[s.replace(/ 0분$/,''),c]); return Q4('전자시계와 같은 시각을 나타내는 것은?',vis,`${h}시 ${m}분`.replace(/ 0분$/,''),wr); }],
    ['cm를 m와 cm로',()=>{ const n=rnd(1,3)*100+rnd(1,9)*10+rnd(0,9); const m=Math.floor(n/100), c=n%100; return Q4(`${n} cm는 몇 m 몇 cm인가요?`,'',`${m} m ${c} cm`,[[`${m} m ${c%10?Math.floor(c/10)*100+c%10:c+100} cm`,null],[`${m*10+Math.floor(c/10)} m ${c%10} cm`,'G3-05'],[`${m+1} m ${c} cm`,null],[`${m} m ${100-c} cm`,null]]); }],
    ['길이의 차(m, cm)',()=>{ const a=rnd(160,185), b=rnd(120,a-15); const A=a-b; const fmt=v=>v>=100?`${Math.floor(v/100)} m ${v%100} cm`:`${v} cm`; return Q4(`선생님의 키는 ${fmt(a)}, 진우의 키는 ${fmt(b)}예요. 선생님은 진우보다 얼마만큼 더 큰가요?`,'',`${A} cm`,[[fmt(a+b),'N1-03'],[`1 m ${A} cm`,'G2-13'],[`${A+10} cm`,'N2-08'],[`${A-1} cm`,null]]); }],
    ['도형 바르게 설명하기',()=>{ const good=pk(['삼각형은 꼭짓점이 3개예요.','사각형은 변이 4개예요.','원은 뾰족한 곳이 없어요.']); const bad=['원은 꼭짓점이 1개예요.','삼각형은 변이 4개예요.','사각형은 꼭짓점이 3개예요.','원은 곧은 선으로 둘러싸여 있어요.']; return Q4('도형에 대해 바르게 말한 것은?','',good,shuffle(bad).slice(0,3).map(s=>[s,'G1-02'])); }],
    ['몇 시간 몇 분',()=>{ const n=rnd(65,115); const h=Math.floor(n/60), m=n%60; return Q4(`${n}분은 몇 시간 몇 분인가요?`,'',`${h}시간 ${m}분`,[[`${h}시간 ${m+10}분`,null],[`${h}시간 ${m+20}분`,null],[`${h+1}시간 ${m}분`,null],[`${Math.floor(n/10)}시간 ${n%10}분`,'G2-03']]); }],
    ['그림을 보고 가장 많은 것',()=>{ const ds=['월','화','수','목'], v=ds.map(()=>rnd(1,5)); const mx=Math.max(...v); if(v.filter(x=>x===mx).length>1) return null; let g=''; v.forEach((k,i)=>{ for(let j=0;j<k;j++) g+=`<rect x="${20+i*58}" y="${110-(j+1)*20}" width="40" height="18" rx="3" fill="#C9E3B4" stroke="${S}"/>`; g+=gxT(40+i*58,126,ds[i]+'요일',12); }); const i=v.indexOf(mx); const mn=v.indexOf(Math.min(...v)); return Q4('요일별로 음식물 쓰레기 통을 쌓았어요. 쓰레기가 가장 많이 나온 요일은?',pic(g,250,132,'통 하나의 양은 모두 같아요'),ds[i]+'요일',ds.map((d,j)=>[d+'요일',j===mn?'N1-13':null]).filter(x=>x[0]!==ds[i]+'요일')); }],
    ['달력에서 몇 주일 후',()=>{ const d=rnd(2,10), k=pk([1,2]); const A=d+7*k; const first=rnd(0,6); let cal='<table style="border-collapse:collapse;margin:0 auto;font-size:.9rem">'+'<tr>'+['일','월','화','수','목','금','토'].map(x=>`<th style="padding:2px 6px">${x}</th>`).join('')+'</tr><tr>'; for(let i=0;i<first;i++) cal+='<td></td>'; for(let x=1;x<=31;x++){ cal+=`<td style="padding:2px 6px;${x===d?'background:#FFE3B0;border-radius:6px;font-weight:700':''}">${x}</td>`; if((x+first)%7===0) cal+='</tr><tr>'; } cal+='</tr></table>'; return Q4(`5월 달력이에요. 색칠한 날은 ${d}일이에요. 이날부터 ${k}주일 후는 몇 월 며칠인가요?`,cal,`5월 ${A}일`,[[`5월 ${d+k}일`,null],[`5월 ${d+7*k+1}일`,null],[`5월 ${d+7*(k+1)}일`,null],[`${5+k}월 ${d}일`,null]]); }],
    ['쌓기나무의 위치',()=>{ const cols=[rnd(1,3),rnd(2,3),rnd(1,3)]; const cells=[]; cols.forEach((h,c)=>{ for(let r=0;r<h;r++) cells.push([c,r]); }); const can=cells.filter(([c,r])=>r<cols[c]-1); if(!can.length) return null; const [cc,cr]=pk(can); const lab=shuffle(['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ']); let g=''; cells.forEach(([c,r],i)=>{ const x=40+c*44, y=130-(r+1)*40; g+=`<rect x="${x}" y="${y}" width="42" height="38" fill="${c===cc&&r===cr?'#BBB':'#F3D7A6'}" stroke="${S}" stroke-width="2"/>`+gxT(x+21,y+25,lab[i],15); }); const L=k=>lab[cells.findIndex(([c,r])=>c===k[0]&&r===k[1])]; const ans=L([cc,cr+1]); const wr=[]; if(cr>0) wr.push([L([cc,cr-1]),'G1-04']); if(cols[cc-1]>cr) wr.push([L([cc-1,cr]),'G1-04']); if(cols[cc+1]>cr) wr.push([L([cc+1,cr]),'G1-04']); cells.forEach(k=>wr.push([L(k),null])); return Q4('회색 쌓기나무의 바로 위에 있는 쌓기나무는?',pic(g,220,136,'앞에서 본 모양'),ans,wr); }],
    ['길이 어림하기',()=>{ const n=rnd(3,8); let g=''; for(let i=0;i<n;i++) g+=`<circle cx="${22+i*20}" cy="20" r="9" fill="#CFE0F7" stroke="${S}"/>`; g+=`<rect x="12" y="40" width="${n*20}" height="12" rx="6" fill="#B9BEC6" stroke="${S}"/>`; return Q4('공깃돌 하나의 길이는 약 1 cm예요. 클립의 길이는 약 얼마인가요?',pic(g,n*20+30,60),`약 ${n} cm`,[[`약 ${n} m`,'G3-07'],[`약 ${n*10} cm`,'G3-07'],[`약 1 cm`,null],[`약 ${n+5} cm`,null]]); }],
  ];
  reg(1,'도',G1);

  /* ===== 2수준 · 수와 연산 (20문항, 12개 이상) ===== */
  const fr=(a,b)=>`${b}분의 ${a}`;
  const N2=[
    ['큰 수 읽기(금액)',()=>{ const n=rnd(2,9)*10000+rnd(1,9)*1000+rnd(1,9)*100+pk([0,50]); return Q4(`영수증에 적힌 금액은 ${won(n)}원이에요. 이 금액을 바르게 읽은 것은?`,'',bigRead(n)+' 원',[[bigRead(n*10)+' 원','N4-07'],[bigRead(Math.floor(n/10))+' 원','N4-07'],[sino(Math.floor(n/1000))+'천 '+bigRead(n%1000)+' 원','N4-08'],[bigRead(n+1000)+' 원',null]]); }],
    ['큰 수의 크기 비교',()=>{ const base=rnd(85,99)*1000000; const vs=shuffle([base, base+rnd(15,25)*1000000, base+rnd(5,14)*1000000+500000, base-rnd(3,9)*1000000]); const ns=['가','나','다','라']; const mx=vs.indexOf(Math.max(...vs)), mn=vs.indexOf(Math.min(...vs)); const tb=`<table style="margin:0 auto;border-collapse:collapse">${vs.map((v,i)=>`<tr><td style="padding:2px 10px">${ns[i]}회사</td><td style="padding:2px 10px;text-align:right">${won(v)}원</td></tr>`).join('')}</table>`; const pair=(a,b)=>`${ns[a]}회사 – ${ns[b]}회사`; const oth=[0,1,2,3].filter(i=>i!==mx&&i!==mn); return Q4('올해 번 돈이 가장 많은 회사와 가장 적은 회사를 차례로 쓴 것은?',tb,pair(mx,mn),[[pair(mn,mx),null],[pair(mx,oth[0]),'N4-10'],[pair(oth[1],mn),'N4-10'],[pair(oth[0],oth[1]),null]]); }],
    ['표를 읽고 세 자리 수의 덧셈',()=>{ const a=rnd(105,189), b=rnd(126,198); if(a%10+b%10<10) return null; const tb=`<table style="margin:0 auto;border-collapse:collapse;border:1px solid #C9A877">${[['활동(30분)','쓰는 열량(킬로칼로리)'],['자전거 타기',a],['배드민턴',b]].map(r=>`<tr>${r.map(c=>`<td style="border:1px solid #C9A877;padding:3px 10px">${c}</td>`).join('')}</tr>`).join('')}</table>`; return Q4('30분 동안 자전거를 타고, 30분 동안 배드민턴을 쳤어요. 운동하는 데 쓴 열량은 모두 몇 킬로칼로리인가요?',tb,a+b,[[a+b-10,'N2-01'],[a+b+10,null],[b-a,'N1-03'],[a+b-100,null]]); }],
    ['배치도에서 곱셈',()=>{ const r=rnd(6,9), c=rnd(12,24); let g=gxT(130,12,'무대',12); for(let i=0;i<r;i++) for(let j=0;j<c;j++) g+=`<rect x="${10+j*(240/c)}" y="${20+i*10}" width="${240/c-1.5}" height="8" fill="#9CC9F0"/>`; return Q4(`공연장 좌석이 한 줄에 ${c}개씩 ${r}줄 있어요. 좌석은 모두 몇 개인가요?`,pic(g,260,26+r*10),(r*c)+'개',[[(r+c)+'개','N2-05'],[(r*c-r)+'개',null],[(r*c+c)+'개',null],[((r*Math.floor(c/10))*10+(r*(c%10))%10)+'개','N3-14']]); }],
    ['세 자리 수 × 한 자리 수(생활)',()=>{ const p=rnd(13,19)*10, k=rnd(4,8); return Q4(`중국 돈 1위안을 우리나라 돈 ${p}원으로 바꿀 수 있다고 해요. 중국 돈 ${k}위안은 우리나라 돈으로 얼마인가요?`,'',won(p*k)+'원',[[won(p+k)+'원','N2-05'],[won(p*k-100)+'원','N3-14'],[won(p*k+p)+'원',null],[won(p*(k-1))+'원',null]]); }],
    ['두 자리 수 × 두 자리 수(문장)',()=>{ const a=rnd(24,68), b=rnd(12,19); return Q4(`강낭콩을 상자 ${b}개에 ${a}개씩 심었어요. 강낭콩은 모두 몇 개인가요?`,'',(a*b)+'개',[[(a*(b%10)+a*Math.floor(b/10))+'개','N3-03'],[(a+b)+'개','N2-05'],[(a*b-a)+'개',null],[(a*b+10)+'개',null]]); }],
    ['곱셈식을 나눗셈식으로',()=>{ const mk=()=>{ const a=rnd(3,9), b=rnd(3,9); return [a,b]; }; const [a,b]=mk(); if(a===b) return null; const good=`${a} × ${b} = ${a*b} → ${a*b} ÷ ${a} = ${b}, ${a*b} ÷ ${b} = ${a}`; return Q4('곱셈식을 나눗셈식 2개로 바르게 나타낸 것은?','',good,[[`${a} × ${b} = ${a*b} → ${a*b} ÷ ${a} = ${b}, ${a*b} ÷ 2 = ${a*b/2}`.replace(/÷ 2 = [\d.]+/,`÷ ${b} = ${b}`),'N3-30'],[`${a} × ${b} = ${a*b} → ${a} ÷ ${b} = ${a*b}, ${b} ÷ ${a} = ${a*b}`,'N3-01'],[`${a} × ${b} = ${a*b} → ${a*b} ÷ ${a+1} = ${b}, ${a*b} ÷ ${b} = ${a+1}`,null],[`${a} × ${b} = ${a*b} → ${a*b} − ${a} = ${b}, ${a*b} − ${b} = ${a}`,'N3-11']]); }],
    ['나눗셈식을 곱셈식으로',()=>{ const d=rnd(3,9), q=rnd(3,9); const n=d*q; return Q4(`${n} ÷ ${d} = ${q}를 곱셈식 ${d} × □ = △로 나타내요. □, △에 알맞은 수를 차례로 쓴 것은?`,'',`${q}, ${n}`,[[`${d}, ${n}`,'N3-30'],[`${q}, ${d}`,null],[`${n}, ${q}`,'N3-01'],[`${q+1}, ${n}`,null]]); }],
    ['잘못 계산한 나눗셈 찾기',()=>{ const mk=()=>{ const d=rnd(2,6), q=rnd(12,19); return [d*q,d,q]; }; const xs=[mk(),mk(),mk(),mk()]; if(new Set(xs.map(x=>x[0]+'/'+x[1])).size<4) return null; const bad=rnd(0,3); const L=xs.map(([n,d,q],i)=>`${n} ÷ ${d} = ${i===bad?q+pk([1,-1,10]):q}`); return Q4('잘못 계산한 것을 고르세요.','',L[bad],L.filter((_,i)=>i!==bad).map(s=>[s,null]).concat([['모두 맞게 계산했어요',null]])); }],
    ['나머지가 있는 나눗셈(문장)',()=>{ const d=rnd(3,6), q=rnd(12,24), r=rnd(1,d-1); const n=d*q+r; if(n>99) return null; return Q4(`사탕 ${n}개를 ${d}명에게 똑같이 나누어 주려고 해요. 한 명이 갖는 사탕 수와 남는 사탕 수를 차례로 쓴 것은?`,'',`${q}개, ${r}개`,[[`${q-1}개, ${r+d}개`,'N3-02'],[`${q}개, ${d-r}개`,null],[`${q+1}개, ${r}개`,null],[`${Math.floor(n/10)}개, ${n%10}개`,null]]); }],
    ['그림을 보고 분수',()=>{ const n=pk([4,5,6,8]), k=rnd(1,n-1); let g=''; for(let i=0;i<n;i++) g+=`<rect x="${10+i*(220/n)}" y="10" width="${220/n}" height="40" fill="${i<k?'#BBB':'#fff'}" stroke="${S}" stroke-width="2"/>`; return Q4('회색 부분은 전체의 얼마인가요?',pic(g,240,60),fr(k,n),[[fr(n-k,n),'N3-16'],[fr(k,n-k),'N3-17'],[fr(n,k),'N3-40'],[fr(1,n),null]]); }],
    ['묶음의 분수만큼',()=>{ const m=pk([3,4,5,6]), per=rnd(2,4), N=m*per, a=rnd(1,m-1); let g=''; for(let i=0;i<m;i++){ for(let j=0;j<per;j++) g+=dot(18+i*(per*20+12)+j*20,28,i<a?'#F2A65A':'#fff'); g+=`<rect x="${7+i*(per*20+12)}" y="14" width="${per*20+2}" height="28" rx="8" fill="none" stroke="${BL}" stroke-dasharray="3 2"/>`; } return Q4(`${N}개를 ${per}개씩 묶었어요. ${N}의 ${fr(a,m)}은 몇 개인가요?`,pic(g,m*(per*20+12)+14,52),a*per,[[a,'N3-39'],[per,'N3-25'],[N-a*per,null],[a*per+1,null]]); }],
    ['가분수를 대분수로',()=>{ const b=pk([3,4,5]), w=rnd(1,2), a=rnd(1,b-1), n=w*b+a; let g=''; for(let i=0;i<=3*b;i++) g+=`<line x1="${20+i*(240/(3*b))}" y1="${i%b?24:18}" x2="${20+i*(240/(3*b))}" y2="34" stroke="${S}"/>`; for(let i=0;i<=3;i++) g+=gxT(20+i*80,50,i,12); g+=`<line x1="20" y1="34" x2="260" y2="34" stroke="${S}" stroke-width="2"/><circle cx="${20+n*(240/(3*b))}" cy="34" r="5" fill="${RED}"/>`; return Q4(`수직선의 점은 ${fr(n,b)}이에요. 대분수로 나타낸 것은?`,pic(g,280,58),`${jw(w)} ${fr(a,b)}`,[[`${jw(a)} ${fr(w,b)}`,'N3-38'],[`${jw(w+1)} ${fr(a,b)}`,null],[`${jw(w)} ${fr(b-a,b)}`,null],[`${jw(n)} ${fr(1,b)}`,null]]); }],
    ['분수의 크기 비교',()=>{ const b=pk([5,6,7,8,9]), a=rnd(2,b-2); const big=rnd(a+1,b-1), small=[rnd(1,a-1),a]; return Q4(`${fr(a,b)}보다 큰 분수는?`,'',fr(big,b),[[fr(a,b+3),'N3-06'],[fr(small[0],b),'N3-41'],[fr(a,b+1),'N3-06'],[fr(a,b),null]]); }],
    ['바르게 설명한 사람(단위분수)',()=>{ const a=rnd(3,5), b=rnd(a+2,9); const p=[`준기: ${fr(1,a)}이 ${fr(1,b)}보다 더 커요.`, `슬기: ${fr(1,b)}이 ${fr(1,a)}보다 더 커요.`, `연수: ${fr(1,a)}이 ${fr(1,b)}보다 더 작아요.`]; return Q4('바르게 설명한 친구는?','',p[0],[[p[1],'N3-06'],[p[2],'N3-06'],['모두 바르게 말했어요',null]]); }],
    ['분수를 소수로',()=>{ const k=rnd(1,9), m=rnd(11,99); if(m%10===0) return null; const good=`${fr(k,10)} → 0.${k}`; return Q4('분수를 소수로 바르게 나타낸 것은?','',good,[[`${fr(k,100)} → 0.${k}`,'N4-24'],[`${fr(m,100)} → ${m/10}`,'N4-24'],[`${fr(k,10)} → ${k}.0`,'N3-08'],[`${fr(m,10)} → 0.${m}`,'N4-24']]); }],
    ['말하는 소수 쓰기',()=>{ const o=rnd(1,5), t=rnd(1,9), h=rnd(0,9), th=rnd(1,9); const v=+((o*1000+t*100+h*10+th)/1000).toFixed(3); const say=`1이 ${o}개, 0.1이 ${t}개, ${h?`0.01이 ${h}개, `:''}0.001이 ${th}개인 수`; return Q4(`${say}는 얼마인가요?`,'',String(v),[[`${o}.${t}${th}`+(h?'':'0'),'N4-15'],[String((o*1000+t*100+th*10+h)/1000),'N4-24'],[String(v*10),null],[`${o}${t}.${h}${th}`,'N4-24']]); }],
    ['소수의 크기 비교(대화)',()=>{ const a=rnd(11,89), b=rnd(2,9); if(a/100>=b/10||a%10===0) return null; const p=[`수지: ${a}이 ${b}보다 크니까 0.${a}가 0.${b}보다 커요.`,`지태: 0.${b}는 0.01이 ${b*10}개이고 0.${a}는 0.01이 ${a}개라서 0.${b}가 더 커요.`,`민기: 소수점 아래 숫자가 많은 0.${a}가 더 커요.`]; return Q4(`0.${a}와 0.${b}의 크기를 비교한 대화예요. 바르게 말한 친구는?`,'',p[1],[[p[0],'N3-08'],[p[2],'N4-02'],['둘의 크기가 같아요',null]]); }],
    ['소수의 덧셈(생활)',()=>{ const a=rnd(11,29)/10, b=rnd(11,39)/10; if(Math.round((a%1)*10)+Math.round((b%1)*10)<10) return null; const A=+(a+b).toFixed(1); return Q4(`우유를 어제 ${a} L, 오늘 ${b} L 마셨어요. 모두 몇 L 마셨나요?`.replace('우유를','물을'),'',A+' L',[[+(A-1).toFixed(1)+' L','N2-01'],[+(A+0.1).toFixed(1)+' L',null],[`${Math.floor(a)+Math.floor(b)}.${Math.round((a%1)*10)+Math.round((b%1)*10)} L`,'N3-08'],[+(Math.abs(a-b)).toFixed(1)+' L','N1-03']]); }],
    ['소수의 뺄셈(두 높이의 차)',()=>{ const a=rnd(101,135)/10, b=rnd(801,999)/100; const A=+(a-b).toFixed(2); return Q4(`탑 가의 높이는 ${a} m, 탑 나의 높이는 ${b} m예요. 더 높은 탑과 두 높이의 차를 바르게 쓴 것은?`,'',`가, ${A} m`,[[`나, ${A} m`,'N4-02'],[`가, ${+(Math.round(a*10)-Math.round(b*100)/10).toFixed(1)} m`.replace(/-/,''),'N4-03'],[`가, ${+(A+1).toFixed(2)} m`,null],[`나, ${+(b-a+20).toFixed(2)} m`,null]]); }],
  ];
  reg(2,'수',N2);

  /* ===== 2수준 · 도형과 측정 (26문항, 18개 이상) — 도형 그림이 많아 격자 도형을 쓴다 ===== */
  const PIECE=[[0,0],[0,1],[0,2],[1,2]];                          // 'ㄴ' 모양(뒤집기·돌리기를 구별할 수 있는 비대칭 조각)
  const pieceSvg=(cells,ox,oy,u)=>cells.map(([x,y])=>`<rect x="${ox+x*u}" y="${oy+y*u}" width="${u}" height="${u}" fill="#9CC9F0" stroke="${S}" stroke-width="1.5"/>`).join('');
  const norm=c=>{ const mx=Math.min(...c.map(p=>p[0])), my=Math.min(...c.map(p=>p[1])); return c.map(([x,y])=>[x-mx,y-my]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]); };
  const flipH=c=>norm(c.map(([x,y])=>[-x,y])), flipV=c=>norm(c.map(([x,y])=>[x,-y])), rot90=c=>norm(c.map(([x,y])=>[-y,x]));
  const same=(a,b)=>JSON.stringify(norm(a))===JSON.stringify(norm(b));
  const choicePics=(cands,ans)=>{ const vis=pic(cands.map((c,i)=>pieceSvg(c,14+i*66,10,14)+gxT(34+i*66,80,L4[i],13)).join(''),270,88); return vis; };
  const transQ=(title,f,wrongs,code)=>{ const base=pk([PIECE,rot90(PIECE),flipH(PIECE)]); const A=f(base); const cands=shuffle([A,...wrongs(base)]); if(new Set(cands.map(c=>JSON.stringify(norm(c)))).size<4) return null; const i=cands.findIndex(c=>same(c,A)); const vis=`<div>${pic(pieceSvg(base,20,10,16)+gxT(30,82,'보기',12),110,90)}${choicePics(cands)}</div>`; return Q4(title,vis,L4[i],L4.filter((_,j)=>j!==i).map(s=>[s,code||'G4-04'])); };
  const angPic=(deg)=>{ const r=60, x0=20, y0=80, x1=x0+r*Math.cos(deg*Math.PI/180), y1=y0-r*Math.sin(deg*Math.PI/180); return `<line x1="${x0}" y1="${y0}" x2="${x0+r}" y2="${y0}" stroke="${S}" stroke-width="3"/><line x1="${x0}" y1="${y0}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${S}" stroke-width="3"/>`; };
  const G2=[
    ['직각이 있는 도형',()=>{ const ks=shuffle(['sq','rect','tri','pent']); const has=k=>k==='sq'||k==='rect'; const ids=ks.map((k,i)=>has(k)?i:-1).filter(i=>i>=0); const g=ks.map((k,i)=>shp[k](36+i*64,34)+gxT(36+i*64,74,HG[i],13)).join(''); const ans=ids.map(i=>HG[i]).join(', '); const all=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].map(p=>p.map(i=>HG[i]).join(', ')).filter(s=>s!==ans); return Q4('직각이 있는 도형을 모두 고른 것은?',pic(g,260,82),ans,shuffle(all).map(s=>[s,null])); }],
    ['둔각 찾기',()=>{ const ds=shuffle([rnd(100,160),rnd(25,75),90,rnd(20,80)]); if(ds[3]===ds[1]) return null; const i=ds.findIndex(d=>d>90); const g=ds.map((d,j)=>`<g transform="translate(${j*68},0)">${angPic(d)}</g>`+gxT(30+j*68,100,L4[j],13)).join(''); return Q4('둔각을 고르세요.',pic(g,280,106),L4[i],ds.map((d,j)=>[L4[j],'G4-07']).filter((_,j)=>j!==i)); }],
    ['평행한 두 직선',()=>{ const i=rnd(0,3); let g=''; for(let j=0;j<4;j++){ const ox=10+j*68, t=j===i?0:pk([8,-8,12,-12]); g+=`<line x1="${ox}" y1="20" x2="${ox+55}" y2="${20+t/2}" stroke="${S}" stroke-width="3"/><line x1="${ox}" y1="55" x2="${ox+55}" y2="${55-t}" stroke="${S}" stroke-width="3"/>`+gxT(ox+28,90,L4[j],13); } return Q4('두 직선이 서로 평행한 것은?',pic(g,280,96),L4[i],L4.filter((_,j)=>j!==i).map(s=>[s,'G4-03'])); }],
    ['도형 밀기',()=>transQ('〈보기〉의 도형을 오른쪽으로 밀었을 때의 도형은?',c=>c,b=>[flipH(b),flipV(b),rot90(b)],'G4-15')],
    ['도형 뒤집기',()=>transQ('〈보기〉의 도형을 아래쪽으로 뒤집었을 때의 도형은?',c=>flipV(c),b=>[b,flipH(b),rot90(rot90(rot90(b)))],'G4-14')],
    ['도형 돌리기',()=>transQ('〈보기〉의 도형을 시계 방향으로 180°만큼 돌린 도형은?',c=>rot90(rot90(c)),b=>[flipV(b),flipH(b),rot90(b)],'G4-13')],
    ['원의 반지름',()=>{ const r=rnd(3,9); return Q4(`원의 지름이 ${2*r} cm예요. 반지름은 몇 cm인가요?`,pic(`<circle cx="70" cy="60" r="50" fill="#fff" stroke="${S}" stroke-width="2"/><line x1="20" y1="60" x2="120" y2="60" stroke="${RED}" stroke-width="2"/><circle cx="70" cy="60" r="3" fill="${S}"/>`+gxT(70,52,`${2*r} cm`,13,RED),140,120),r+' cm',[[(4*r)+' cm','G3-04'],[(2*r)+' cm','G3-04'],[(r+2)+' cm',null],[(r*3)+' cm',null]]); }],
    ['이등변삼각형의 변',()=>{ const a=rnd(5,12), b=rnd(3,a+3); if(a===b) return null; return Q4(`이등변삼각형의 두 변의 길이가 ${a} cm로 같고, 나머지 한 변이 ${b} cm예요. 세 변의 길이의 합은?`,'',(2*a+b)+' cm',[[(a+2*b)+' cm',null],[(a+b)+' cm',null],[(3*a)+' cm',null],[(3*b)+' cm',null]]); }],
    ['정삼각형의 한 변',()=>{ const s=rnd(4,13); return Q4(`정삼각형의 세 변의 길이의 합이 ${3*s} cm예요. 한 변은 몇 cm인가요?`,'',s+' cm',[[(3*s/2).toString().includes('.')?(s+1)+' cm':(3*s/2)+' cm',null],[(3*s)+' cm',null],[(s+3)+' cm',null],[(s-1)+' cm',null]]); }],
    ['예각삼각형',()=>{ const T=[[60,60],[50,70],[45,65]], R=[[90,45],[90,30]], O=[[110,40],[120,30],[130,25]]; const ks=shuffle([pk(T),pk(T),pk(R),pk(O)]); const isA=k=>k[0]<90&&k[1]<90&&180-k[0]-k[1]<90; const ids=ks.map((k,i)=>isA(k)?i:-1).filter(i=>i>=0); if(ids.length!==2) return null; const g=ks.map((k,i)=>`<g transform="translate(${i*80},0) scale(.5)">${gxTri(k[0],k[1],[])}</g>`+gxT(40+i*80,84,HG[i],13)).join(''); const ans=ids.map(i=>HG[i]).join(', '); const all=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].map(p=>p.map(i=>HG[i]).join(', ')).filter(s=>s!==ans); return Q4('예각삼각형을 모두 고른 것은? (세 각의 크기를 적어 두었어요)',pic(g,330,92)+`<div style="font-size:.85rem">${ks.map((k,i)=>`${HG[i]} ${k[0]}°, ${k[1]}°, ${180-k[0]-k[1]}°`).join(' · ')}</div>`,ans,shuffle(all).map(s=>[s,'G4-09'])); }],
    ['설명에 맞는 사각형',()=>{ return Q4('“네 각이 모두 직각이에요. 그런데 네 변의 길이가 모두 같지는 않아요.” 어떤 도형인가요?','','직사각형',[['정사각형','G3-03'],['마름모','G4-05'],['사다리꼴',null]]); }],
    ['사다리꼴 찾기',()=>{ return Q4('사다리꼴에 대해 바르게 말한 것은?','','평행한 변이 한 쌍이라도 있으면 사다리꼴이에요.',[['평행한 변이 꼭 두 쌍 있어야 사다리꼴이에요.','G4-05'],['직사각형은 사다리꼴이 아니에요.','G4-05'],['네 변의 길이가 모두 같아야 사다리꼴이에요.',null]]); }],
    ['정사각형의 변',()=>{ const s=rnd(3,9); return Q4(`정사각형의 네 변의 길이의 합이 ${4*s} cm예요. 한 변은 몇 cm인가요?`,'',s+' cm',[[(2*s)+' cm',null],[(4*s)+' cm',null],[(s+4)+' cm',null],[(s-1)+' cm',null]]); }],
    ['설명에 맞는 도형',()=>{ return Q4('“마주 보는 두 쌍의 변이 서로 평행하고, 네 변의 길이가 모두 같아요.” 이 설명에 가장 알맞은 도형은 무엇일까요?','','마름모',[['사다리꼴','G4-05'],['삼각형',null],['원',null]]); }],
    ['시간 계산(걸린 시간)',()=>{ const h=rnd(8,10), m=rnd(5,45), d=rnd(25,115); const e=h*60+m+d; const eh=Math.floor(e/60), em=e%60; const A=d>=60?`${Math.floor(d/60)}시간 ${d%60}분`.replace(/ 0분/,''):`${d}분`; return Q4(`온라인 수업이 ${h}시 ${m}분에 시작해서 ${eh}시 ${em}분에 끝났어요. 수업한 시간은?`,'',A,[[(d+40)>=60?`${Math.floor((d+40)/60)}시간 ${(d+40)%60}분`:`${d+40}분`,'G2-03'],[`${(eh-h)}시간 ${Math.abs(em-m)}분`,'G2-03'],[`${d+5}분`,null],[`${d+60}분`,null]].map(([s,c])=>[s.replace(/ 0분$/,''),c])); }],
    ['시각 읽기(초)',()=>{ const h=rnd(1,11), m=rnd(1,11)*5, s=rnd(1,11)*5; const v=`<div style="display:inline-block;background:#222;color:#7CFC7C;font:700 28px/1 monospace;padding:6px 14px;border-radius:8px">${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</div>`; return Q4('시각을 바르게 읽은 것은?',v,`${h}시 ${m}분 ${s}초`,[[`${h}시 ${s}분 ${m}초`,null],[`${m}시 ${h}분 ${s}초`,null],[`${h}시 ${m/5}분 ${s/5}초`,'G2-07'],[`${h+1}시 ${m}분 ${s}초`,null]]); }],
    ['알맞은 단위',()=>{ const it=pk([['교실 문의 높이는 약 2 □예요.','m'],['연필의 길이는 약 15 □예요.','cm'],['개미의 몸길이는 약 5 □예요.','mm'],['집에서 학교까지 약 1 □예요.','km']]); return Q4(it[0]+' □에 알맞은 단위는?','',it[1],['mm','cm','m','km'].filter(u=>u!==it[1]).map(u=>[u,'G3-07'])); }],
    ['mm를 cm와 mm로',()=>{ const n=rnd(101,399); if(n%10===0) return null; return Q4(`${n} mm를 cm와 mm로 바르게 나타낸 것은?`,'',`${Math.floor(n/10)} cm ${n%10} mm`,[[`${Math.floor(n/100)} cm ${n%100} mm`,'N3-28'],[`${n} cm`,'N3-27'],[`${n*10} cm`,null],[`${Math.floor(n/10)} cm ${n%10*10} mm`,null]]); }],
    ['km와 m 비교',()=>{ const a=[rnd(1,2),rnd(1,9)*100], b=rnd(1,2)*1000+rnd(1,9)*100+rnd(10,99), c=[2,rnd(1,9)*100+rnd(1,9)*10], d=rnd(1500,1999); const vals=[a[0]*1000+a[1],b,c[0]*1000+c[1],d]; if(new Set(vals).size<4) return null; const ns=['가 다리','나 다리','다 다리','라 다리']; const L=[`${a[0]} km ${a[1]} m`,`${b} m`,`${c[0]} km ${c[1]} m`,`${d} m`]; const i=vals.indexOf(Math.max(...vals)); const tb=`<table style="margin:0 auto;border-collapse:collapse">${ns.map((n,j)=>`<tr><td style="padding:2px 10px">${n}</td><td style="padding:2px 10px">${L[j]}</td></tr>`).join('')}</table>`; const big=[b,d].indexOf(Math.max(b,d)); return Q4('가장 긴 다리는?',tb,ns[i],ns.map((n,j)=>[n,(j===1||j===3)?'G3-05':null]).filter((_,j)=>j!==i)); }],
    ['들이 어림(알맞지 않은 것)',()=>{ const ok=['우유 한 팩에 약 200 mL가 들어 있어요.','큰 물통에 약 2 L가 들어가요.','요구르트 병의 들이는 약 100 mL예요.','욕조에 물이 약 200 L 들어가요.']; const bad=pk(['작은 약병의 들이는 약 35 L예요.','컵 하나의 들이는 약 3 L예요.','양동이의 들이는 약 8 mL예요.']); return Q4('들이를 알맞지 않게 말한 것은?','',bad,shuffle(ok).slice(0,3).map(s=>[s,'G3-07'])); }],
    ['L와 mL 바꾸기',()=>{ const l=rnd(1,4), m=rnd(1,9)*100+pk([0,rnd(1,9)*10]); const good=`${l*1000+m} mL = ${l} L ${m} mL`; return Q4('들이를 바르게 바꾸어 나타낸 것은?','',good,[[`${l*100+m/10} mL = ${l} L ${m} mL`,'G3-05'],[`${l*1000+m} mL = ${l*10+Math.floor(m/100)} L ${m%100} mL`,'G3-05'],[`${l} L ${m} mL = ${l}${m} 0 mL`.replace(' 0 mL','0 mL'),'G3-05'],[`${l*1000+m} mL = ${l+1} L ${m} mL`,null]]); }],
    ['들이의 덧셈',()=>{ const a=[1,rnd(3,8)*100], b=[1,rnd(2,8)*100]; const s=a[1]+b[1]; const A=s>=1000?`${a[0]+b[0]+1} L ${s-1000} mL`:`${a[0]+b[0]} L ${s} mL`; return Q4(`물을 어제 ${a[0]} L ${a[1]} mL, 오늘 ${b[0]} L ${b[1]} mL 마셨어요. 모두 얼마인가요?`,'',A.replace(/ 0 mL$/,''),[[`${a[0]+b[0]} L ${s} mL`.replace(/ 0 mL$/,''),s>=1000?'G2-17':null],[`${Math.abs(a[1]-b[1])} mL`,'N1-03'],[`${a[0]+b[0]+2} L ${s%1000} mL`,null],[`${a[0]+b[0]} L ${s%1000} mL`,'G2-17']]); }],
    ['무게 어림',()=>{ const ok=['바나나 한 송이 약 1 kg','수박 한 통 약 6 kg','시금치 한 단 약 400 g','연필 한 자루 약 5 g']; const bad=pk(['고기 한 근 약 600 kg','달걀 한 개 약 50 kg','책가방 약 3 g']); return Q4('무게를 잘못 어림한 것은?','',bad,shuffle(ok).slice(0,3).map(s=>[s,'G3-07'])); }],
    ['무게 단위 설명',()=>{ const k=rnd(2,7), g=rnd(1,9)*100; const bad=pk([`${g} g은 ${g/100} kg이에요.`,`${k} kg ${g} g은 ${k}${g/100} g이에요.`]); const ok=[`${k} kg은 ${k*1000} g이에요.`,`1 kg ${g} g은 ${1000+g} g이에요.`,`${k*1000+g} g은 ${k} kg ${g} g이에요.`]; return Q4('무게의 단위를 잘못 설명한 것은?','',bad,ok.map(s=>[s,'G3-05'])); }],
    ['무게의 덧셈',()=>{ const a=[rnd(1,3),rnd(3,9)*100], b=[rnd(1,2),rnd(3,9)*100]; const s=a[1]+b[1]; if(s<1000) return null; const A=`${a[0]+b[0]+1} kg ${s-1000} g`.replace(/ 0 g$/,''); return Q4(`고기를 ${a[0]} kg ${a[1]} g, ${b[0]} kg ${b[1]} g 샀어요. 산 고기는 모두 얼마인가요?`,'',A,[[`${a[0]+b[0]} kg ${s-1000} g`.replace(/ 0 g$/,''),'G2-17'],[`${a[0]+b[0]} kg ${s} g`,'G2-17'],[`${a[0]+b[0]+2} kg ${s-1000} g`.replace(/ 0 g$/,''),null],[`${a[0]+b[0]+1} kg ${s-900} g`,null]]); }],
    ['각도 읽기',()=>{ const d=rnd(3,8)*10+pk([0,0,5]); const r=60, x0=150, y0=90; let g=`<path d="M${x0-r-10},${y0} A${r+10},${r+10} 0 0 1 ${x0+r+10},${y0}" fill="#FFF3C4" stroke="${S}"/>`; for(let k=0;k<=18;k++){ const a=k*10*Math.PI/180; g+=`<line x1="${x0+(r+10)*Math.cos(a)}" y1="${y0-(r+10)*Math.sin(a)}" x2="${x0+(r+4)*Math.cos(a)}" y2="${y0-(r+4)*Math.sin(a)}" stroke="${S}"/>`; if(k%3===0) g+=gxT(x0+(r+22)*Math.cos(a),y0-(r+22)*Math.sin(a)+4,k*10,9)+gxT(x0+(r-8)*Math.cos(a),y0-(r-8)*Math.sin(a)+4,180-k*10,8,'#9A7A5A'); }
      g+=`<line x1="${x0}" y1="${y0}" x2="${x0+r+10}" y2="${y0}" stroke="${RED}" stroke-width="3"/><line x1="${x0}" y1="${y0}" x2="${x0+(r+10)*Math.cos(d*Math.PI/180)}" y2="${y0-(r+10)*Math.sin(d*Math.PI/180)}" stroke="${RED}" stroke-width="3"/>`; return Q4('각도기로 잰 각도는?',pic(g,300,110,'밑금에 맞춘 변을 0°로 하여 시작하는 눈금을 읽어요'),d+'°',[[(180-d)+'°','G4-01'],[(d+10)+'°',null],[(d-5)+'°',null],['180°',null]]); }],
  ];
  reg(2,'도',G2);

  /* 점검 세트로 따로 내지 않고(낙인 걱정 — 교수님 11/23), 각 틀을 알맞은 편의 문제 묶음에 넣어 평소 풀이 속에 섞는다 */
  const MAP={ N1:[3,15,31,31,39,32,40,14,36,17,34,39,32,32], G1:['S6-03','S6-01','S6-05','S6-10','S6-15','S6-16','S6-05','S6-11','S4-05','S6-13','S6-02','S6-14'],
    N2:['S3-41','S3-44','S2-03','S2-15','S3-24','S3-27','S2-10','S2-10','S3-33','S3-29','S3-18','S3-35','S3-37','S3-38','S3-20','S3-56','S3-56','S3-58','S3-61','S3-62'],
    G2:['S6-18','S6-48','S6-20','S6-22','S6-23','S6-24','S6-26','S6-28','S6-28','S6-29','S6-31','S6-30','S6-19','S6-30','S6-36','S6-34','S6-38','S6-37','S6-39','S6-41','S6-40','S6-42','S6-44','S6-43','S6-46','S6-47'] };
  const wrap=f=>()=>tryQ(f);
  window._BK={N1,G1,N2,G2,MAP,wrap};
  try{ [['N1',N1],['G1',G1],['N2',N2],['G2',G2]].forEach(([k,arr])=>arr.forEach(([std,f],i)=>{ const ep=MAP[k][i], g=wrap(f);
      if(typeof ep==='number'){ if(typeof G!=='undefined'&&G[ep]) G[ep].push(g); }
      else if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } })); }catch(e){}
}

/* ---------- 3-78. 학습지(늘품이) 꼴 새 유형: <보기> 상자, 검산 사슬, 10배 화살표, 세로셈 ㉠ ----------
   네온 제안(11/23)을 따라 고르기형으로 먼저 넣고, 조작형은 다음에. 선행 금지: 편마다 그 학년 범위의 수만 쓴다. */
{ const S=GX_S, RED='#B04A2E', BL='#2F6FA8';
  const bogi=(inner,t)=>`<div class="bogi" style="position:relative;border:2px solid #C9A877;border-radius:12px;padding:16px 14px 10px;margin:8px auto;max-width:340px;background:#fff;text-align:left;font-size:1.05rem;line-height:1.7"><span style="position:absolute;top:-11px;left:12px;background:#fff;padding:0 6px;font-weight:700;color:#7A4A1E">&lt;${t||'보기'}&gt;</span>${inner}</div>`;
  const chip=(t,c)=>`<span style="display:inline-block;min-width:34px;padding:2px 8px;margin:0 2px;border-radius:8px;background:${c||'#FFF3C4'};border:1.5px solid #C9A877;text-align:center;font-weight:700">${t}</span>`;
  const vcalc=(rows,w)=>`<table class="vcalc" style="margin:6px auto;border-collapse:collapse;font:700 1.45rem/1.5 ui-monospace,monospace;font-variant-numeric:tabular-nums">${rows.map(r=>`<tr${r.line?' style="border-top:2.5px solid #4A2E14"':''}>${[...String(r.s).padStart(w,' ')].map(ch=>`<td style="width:1.15em;text-align:center;${r.c?'color:'+r.c:''}">${ch===' '?'':ch}</td>`).join('')}${r.note?`<td style="padding-left:10px;font:400 .85rem sans-serif;color:#7B5632">${r.note}</td>`:''}</tr>`).join('')}</table>`;
  const L={}; const cq4=(q,v,A,w)=>{ const seen=new Set([String(A)]), u=[]; for(const x of w){ const k=String(x[0]); if(x[0]==null||seen.has(k)) continue; seen.add(k); u.push(x); } return u.length>=3?cq(q,v,A,u.slice(0,3)):null; }; const jj=(n,a,b)=>n+('013678'.includes(String(n).slice(-1))?a:b);
  /* ① 나눗셈 검산 사슬 (3학년 나눗셈) */
  L.chain=()=>{ const d=rnd(3,9), q=rnd(4,9)+pk0([0,10]), r=rnd(1,d-1), n=d*q+r; if(n>99&&q<10) return null; const vis=bogi(`${n} ÷ ${d} = ${q} … ${r}<div style="margin-top:6px">${chip(d,'#FBD9A5')} × ${chip(q,'#CFE0F7')} = ${chip('㉠')} → ${chip('㉠')} + ${chip(r,'#E9D5F5')} = ${chip('㉡')}</div>`,'계산 결과 확인하기');
    return cq4('나눗셈을 맞게 했는지 확인하는 식이에요. ㉠, ㉡에 알맞은 수를 차례로 쓴 것은?',vis,`${d*q}, ${n}`,[[`${d*q}, ${d*q-r}`,'N3-15'],[`${d*r}, ${d*r+q}`,'N3-01'],[`${q*r}, ${q*r+d}`,'N3-01'],[`${d*q}, ${n+d}`,null],[`${d+q}, ${d+q+r}`,'N2-05'],[`${n}, ${n+r}`,null]]); };
  /* ② 10배 화살표 관계 (3학년: 두 자리 × 몇십) */
  L.tenX=()=>{ const a=rnd(12,48), b=rnd(2,6); const p=a*b; const vis=`<div style="display:inline-grid;grid-template-columns:auto auto auto auto auto;gap:4px 8px;align-items:center;font:700 1.3rem sans-serif;margin:8px auto">
      <span>${a}</span><span>×</span>${chip(b)}<span>=</span><span>${p}</span>
      <span></span><span></span><span style="color:${RED};font-size:.8rem;text-align:center">↓ 10배</span><span></span><span style="color:${RED};font-size:.8rem;text-align:center">↓ 10배</span>
      <span>${a}</span><span>×</span>${chip(b*10)}<span>=</span>${chip('㉠')}</div>`;
    return cq4('곱하는 수가 10배가 되면 곱도 10배가 돼요. ㉠에 알맞은 수는?',vis,p*10,[[p,'N3-12'],[p*100,'N3-33'],[p+10,'N2-05'],[a*b+a*10,null]]); };
  /* ③ 10배·10분의 1 화살표 (5학년 소수의 곱셈) */
  L.tenthX=()=>{ const a=rnd(12,89), b=rnd(2,9); if(a%10===0) return null; const p=a*b, A=+(p/10).toFixed(1); const vis=`<div style="display:inline-grid;grid-template-columns:auto auto auto auto auto;gap:4px 8px;align-items:center;font:700 1.3rem sans-serif;margin:8px auto">
      <span>${a}</span><span>×</span><span>${b}</span><span>=</span><span>${p}</span>
      <span style="color:${BL};font-size:.75rem">↓ 10분의 1배</span><span></span><span></span><span></span><span style="color:${BL};font-size:.75rem">↓ 10분의 1배</span>
      <span>${a/10}</span><span>×</span><span>${b}</span><span>=</span>${chip('㉠')}</div>`;
    return cq4('곱해지는 수가 10분의 1배가 되면 곱은 어떻게 될까요? ㉠에 알맞은 수는?',vis,A,[[p,'N3-08'],[+(p/100).toFixed(2),'N5-07'],[p*10,'N6-07'],[+(A+1).toFixed(1),null]]); };
  /* ④ 세로셈의 ㉠ 줄 (3학년 두 자리 × 두 자리: 부분곱의 자리) */
  L.vPart=()=>{ const a=rnd(13,49), b1=rnd(2,4), b0=rnd(2,9); const b=b1*10+b0; const p1=a*b0, p2=a*b1*10; const w=String(a*b).length+1;
    const vis=vcalc([{s:a},{s:'×'+String(b).padStart(w-1,' ')},{s:p1,line:1},{s:'㉠'.padStart(w,' '),c:RED},{s:a*b,line:1}],w)+`<div style="font-size:.8rem;color:#7B5632">${a} × ${b0} = ${p1}</div>`;
    return cq4('세로셈에서 ㉠에 알맞은 수는?',vis,p2,[[a*b1,'N3-03'],[p1+p2,null],[a*b-p1+a,null],[a*(b1+b0),'N2-05']]); };
  /* ⑤ <보기>의 ㉠, ㉡ 낱말 (3학년 나머지 있는 나눗셈) */
  L.words=()=>{ const d=rnd(3,8), q=rnd(3,9), r=rnd(1,d-1), n=d*q+r; const vis=bogi(`${n} ÷ ${d} = ${q} … ${r}<div style="margin-top:6px">${jj(q,'은','는')} ㉠이고, ${jj(r,'은','는')} ㉡이에요.</div>`);
    return cq4('〈보기〉의 ㉠, ㉡에 알맞은 말을 차례로 쓴 것은?',vis,'몫, 나머지',[['나머지, 몫','N3-22'],['나누는 수, 몫','N3-22'],['몫, 나누는 수','N3-22'],['나누어지는 수, 나머지',null]]); };
  const pk0=a=>a[rnd(0,a.length-1)];
  const T=f=>()=>{ for(let t=0;t<30;t++){ const q=f(); if(q) return q; } return null; };
  window._LW=L;
  try{ const add=(ep,g)=>{ if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-33',T(L.chain)); add('S3-25',T(L.tenX)); add('S3-96',T(L.tenthX)); add('S3-27',T(L.vPart)); add('S3-29',T(L.words)); }catch(e){}
}

/* ---------- 3-84. 일본 전국학력·학습상황조사(2022~2026) '해설'의 解答類型에서 가져온 오답 보기 ----------
   해설은 문항마다 오답을 '어떤 생각에서 나왔는지'로 나눠 둔다(예: 저울 최소 눈금을 1 g·10 g으로 봄, 10% 증량을 0.1로 봄).
   그 오답 생각을 그대로 보기로 쓰고, 문항 글·수·맥락은 새로 만든다. 학년은 우리 교육과정 차례에 맞춘다. */
{ const S=GX_S, pk=a=>a[rnd(0,a.length-1)];
  const Q4=(q,vis,ans,wr)=>{ const A=String(ans), s=new Set([A]), w=[]; for(const [v,c] of wr){ if(v==null) continue; const k=String(v); if(s.has(k)||/NaN|undefined/.test(k)) continue; s.add(k); w.push([k,c]); } if(w.length<3) return null; return cq(q,vis,A,w.slice(0,3)); };
  const T=f=>()=>{ for(let t=0;t<30;t++){ const q=f(); if(q) return q; } return null; };
  const won=n=>n.toLocaleString('ko-KR'), J={};
  /* 4학년 소수의 덧셈: 몇의 몇 개로 보기 (2025 3(1): 0.1·1로 본 오답) */
  J.unit=()=>{ const a=rnd(2,9), b=rnd(1,9); return Q4(`0.${a} + 0.0${b}를 계산하려고 해요. 두 수를 모두 '□가 몇 개인 수'로 나타내어 더하려고 할 때, □에 알맞은 수는 얼마일까요?`,'',`0.01`,[['0.1','N4-24'],['1','N4-24'],['10',null],['0.001',null]]); };
  /* 3학년 저울 눈금 (2025 4(3): 최소 눈금을 1 g, 10 g, 0.5 g으로 봄) */
  J.scale=()=>{ const step=pk([5,20]), k=rnd(2,4); const base=pk([100,200,300]); const v=base+step*k; let g=`<line x1="20" y1="40" x2="300" y2="40" stroke="${S}" stroke-width="2"/>`; for(let i=0;i<=10;i++){ const x=20+i*28; g+=`<line x1="${x}" y1="${i%5?32:26}" x2="${x}" y2="40" stroke="${S}"/>`; if(i%5===0) g+=gxT(x,20,base+step*i,11); }
    g+=`<polygon points="${20+k*28},44 ${14+k*28},58 ${26+k*28},58" fill="#C2412F"/>`;
    return Q4('저울의 바늘이 가리키는 무게는 몇 g인가요?',cpWrap(cpSvg(g,320,64,320),`작은 눈금 한 칸이 몇 g인지 먼저 알아봐요`),v+' g',[[(base+k)+' g','G2-09'],[(base+10*k)+' g','D4-01'],[(base+k*(step===5?10:5))+' g',null],[(base+step*(k+1))+' g',null]]); };
  /* 6학년 백분율 증량 (2025 4(4): 0.1·10배·110으로 봄) */
  J.inc=()=>{ const p=pk([10,20,25,30]); return Q4(`세제 양을 ${p}% 늘렸어요. 늘린 뒤의 양은 처음 양의 몇 배일까요?`,'',String(1+p/100),[[String(p/100),'R6-06'],[String(p),'R6-04'],[String(100+p),'R6-04'],[String(p/10),'R6-04']]); };
  /* 3학년 가운데 0이 있는 곱셈 (2022: 0을 무시하고 계산) */
  J.zero=()=>{ const h=rnd(1,4), o=rnd(2,9), k=rnd(2,4); const n=h*100+o; return Q4(`${n} × ${k}를 계산하면?`,'',n*k,[[(h*10+o)*k,null],[h*k*100+o*k*10,null],[n*k+100,null],[h*100*k+o,'N1-12']]); };
  /* 5학년 최소공배수 (2022: 두 수의 곱, 최대공약수, 공약수 중 최소, 공배수 여러 개) */
  J.lcm=()=>{ const [a,b]=pk([[14,21],[6,10],[9,15],[12,18],[8,20],[10,15]]); const g=_m2gcd(a,b), l=_m2lcm(a,b); return Q4(`${a}와 ${b}의 최소공배수는?`.replace(/(\d)와/,(m,d)=>d+('013678'.includes(d)?'과':'와')),'',l,[[a*b,'N5-12'],[g,'N5-02'],[1,'N5-02'],[l*2,'N5-12']]); };
  /* 6학년 백분율 계산 (2022 2(2): 40, 0.4, 0.04, 1000÷0.4) */
  J.pct=()=>{ const tot=pk([800,1000,1200,1500]), p=pk([20,30,40,60]); const A=tot*p/100; return Q4(`${won(tot)}원짜리 물건값의 ${p}%는 얼마인가요?`,'',won(A)+'원',[[p+'원','R6-04'],[won(tot*p/1000)+'원','R6-04'],[won(Math.round(tot/(p/100)))+'원','R6-01'],[won(tot-A)+'원',null]]); };
  /* 5학년 대응: 겹쳐 쌓는 의자 높이 (2023 1: 비례라고 잘못 봄) */
  J.chair=()=>{ const h=pk([70,80,90]), d=pk([10,12,15]), n=rnd(4,7); const A=h+d*(n-1); return Q4(`의자 1개의 높이는 ${h} cm예요. 의자를 하나씩 겹쳐 쌓을 때마다 높이가 ${d} cm씩 높아져요. 의자 ${n}개를 쌓으면 높이는?`,'',A+' cm',[[h*n+' cm','R5-02'],[(h+d*n)+' cm','R5-01'],[d*n+' cm','R5-01'],[(h+d)*(n-1)+' cm',null]]); };
  /* 3학년 몇십 × 몇십 (2023 2: 5×4=20 뒤 0을 하나만, 셋 붙임) */
  J.tens=()=>{ const a=rnd(2,9), b=rnd(2,9); const p=a*b; if(p%10===0) return null; return Q4(`${a*10} × ${b*10}을 계산하면?`.replace(/(\d)을/,(m,d)=>d+('013678'.includes(d)?'을':'를')),'',p*100,[[p*10,'N3-33'],[p*1000,'N3-33'],[p,'N3-12'],[p*100+10,null]]); };
  /* 3학년 '적다'라는 말에 끌린 뺄셈 (2024 1(1)) */
  J.fewer=()=>{ const a=rnd(12,29), d=rnd(3,9); return Q4(`민수가 가진 사탕은 ${a}개예요. 민수는 누나보다 ${d}개 적게 가졌어요. 누나가 가진 사탕은 몇 개인가요?`,'',(a+d)+'개',[[(a-d)+'개','N1-13'],[(a*d)+'개','N6-06'],[d+'개',null],[(a+d+1)+'개',null]]); };
  /* 6학년 원주 (2024 3(2): 지름의 2배, 4배로 봄) */
  J.circ=()=>{ const d=pk([4,6,8,10,20]); return Q4(`지름이 ${d} cm인 원의 원주는 약 몇 cm일까요? (원주율 3.14)`,'',+(d*3.14).toFixed(2)+' cm',[[d*2+' cm','G6-12'],[d*4+' cm','G6-12'],[+(d/2*3.14).toFixed(2)+' cm','G6-12'],[+(d*d*3.14).toFixed(2)+' cm','G6-12']]); };
  /* 6학년 (자연수)÷(소수) (2024 3(3): 나누는 수만 10배) */
  J.divDec=()=>{ const q=rnd(3,9)*100, d=pk([0.2,0.4,0.5,0.6,0.8]); const n=Math.round(q*d); return Q4(`${n} ÷ ${d}를 계산하면?`,'',q,[[q/10,'N6-07'],[q*10,'N6-07'],[+(n*d).toFixed(1),'N6-06'],[q+1,null]]); };
  /* 6학년 오각기둥의 면 (2024: 밑면을 하나로, 옆면을 둘로 봄) */
  J.prism=()=>{ const k=pk([5,6,7]), nm={5:'오',6:'육',7:'칠'}[k]; return Q4(`${nm}각기둥의 면은 모두 몇 개인가요?`,'',(k+2)+'개',[[(k+1)+'개','G6-03'],[k+'개','G6-03'],[(k+3)+'개','G6-03'],[(2*k)+'개','G6-03']]); };
  /* 6학년 정육면체 겉넓이 (2026: 정사각형 넓이만, 한 변×6, 부피) */
  J.cube=()=>{ const a=rnd(2,7); return Q4(`한 모서리가 ${a} cm인 정육면체의 겉넓이는?`,'',a*a*6+' cm²',[[a*a+' cm²','G6-06'],[a*6+' cm²','G6-06'],[a*a*a+' cm²','G6-05'],[a*a*4+' cm²','G6-06']]); };
  /* 5학년 반올림 (2026: 올림·버림, 다른 자리에서 반올림) */
  J.round=()=>{ const n=rnd(2,9)*10000+rnd(1,9)*1000+rnd(1,4)*100+rnd(10,99); const th=Math.round(n/1000)*1000; return Q4(`${won(n)}을 반올림하여 천의 자리까지 나타내면?`,'',won(th),[[won(th+1000),'N5-14'],[won(Math.round(n/100)*100),'N5-14'],[won(Math.round(n/10)*10),'N5-14'],[won(Math.floor(n/10000)*10000),'N5-14']]); };
  /* 4학년 자연수 − 소수 (2026: 자리마다 큰 수에서 작은 수, 받아내림 한 번만) */
  J.decSub=()=>{ const w=rnd(3,9), x=rnd(101,(w-1)*100+99)/100; if(Math.round(x*100)%10===0) return null; const A=+(w-x).toFixed(2); const xs=x.toFixed(2).split(''); const naive=(w-+xs[0])+'.'+xs[2]+xs[3]; return Q4(`${w} − ${x.toFixed(2)}를 계산하면?`,'',A,[[naive,'N2-02'],[+(A+0.1).toFixed(2),'N2-08'],[+(A+1).toFixed(2),'N2-08'],[+(w-x/10).toFixed(3),'N4-03']]); };
  /* 4학년 막대그래프: 약 몇 배 (2025 1(1): 차를 구함) */
  J.times=()=>{ const a=rnd(3,8), k=pk([2,3]); const b=a*k; let g=''; [[a,'2005년'],[b,'2025년']].forEach(([v,l],i)=>{ g+=`<rect x="${60+i*90}" y="${110-v*4}" width="40" height="${v*4}" fill="#9CC9F0" stroke="${S}"/>`+gxT(80+i*90,126,l,11); }); for(let i=0;i<=8;i++) g+=`<line x1="40" y1="${110-i*12}" x2="230" y2="${110-i*12}" stroke="#E8D9BF"/>`+gxT(30,114-i*12,i*3,9);
    return Q4('2025년의 수확량은 2005년의 약 몇 배인가요? (단위: 만 상자)',cpWrap(cpSvg(g,250,132,280),''),`약 ${k}배`,[[`약 ${b-a}배`,'D4-01'],[`약 ${k+1}배`,null],[`약 ${b}배`,null],[`약 ${a}배`,null]]); };
  window._JP=J;
  try{ const add=(ep,g)=>{ if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    [['S3-61','unit'],['S6-44','scale'],['S5-16','inc'],['S3-24','zero'],['S3-72','lcm'],['S5-16','pct'],['S5-12','chair'],['S3-25','tens'],['S2-04','fewer'],['S6-74','circ'],['S3-110','divDec'],['S6-59','prism'],['S6-76','cube'],['S3-87','round'],['S3-62','decSub'],['S4-10','times']].forEach(([e,k])=>add(e,T(J[k]))); }catch(e){}
}

/* ---------- 3-85. 독일 VERA-3 과제 해설(IQB)의 '예상되는 어려움'에서 가져온 오답 보기 ---------- */
{ const pk=a=>a[rnd(0,a.length-1)], won=n=>n.toLocaleString('ko-KR');
  const Q4=(q,vis,ans,wr)=>{ const A=String(ans), s=new Set([A]), w=[]; for(const [v,c] of wr){ if(v==null) continue; const k=String(v); if(s.has(k)) continue; s.add(k); w.push([k,c]); } if(w.length<3) return null; return cq(q,vis,A,w.slice(0,3)); };
  const T=f=>()=>{ for(let t=0;t<30;t++){ const q=f(); if(q) return q; } return null; }, V={};
  /* 걸린 시간: 시와 분을 따로 '큰 수에서 작은 수'로 뺌 (SendungmitderMaus) */
  V.span=()=>{ const h=rnd(8,10), m=rnd(31,55), d=rnd(50,110); const e=h*60+m+d, eh=Math.floor(e/60), em=e%60; if(em>=m) return null; const A=`${Math.floor(d/60)}시간 ${d%60}분`.replace(/^0시간 /,'').replace(/ 0분$/,''); const naive=`${eh-h}시간 ${m-em}분`;
    return Q4(`영화가 ${h}시 ${m}분에 시작해서 ${eh}시 ${em}분에 끝났어요. 영화를 본 시간은?`,'',A,[[naive,'G2-03'],[`${eh-h}시간 ${em+60-m+40}분`,'G2-03'],[`${d+40}분`,'G2-03'],[`${eh-h+1}시간 ${em}분`,null]]); };
  /* 단위가 섞인 길이 비교: 2.35 m가 2.5 m보다 길다고 봄 (Größenumwandeln) */
  V.len=()=>{ const a=rnd(1,3), b=rnd(2,8); const xs=[`${a}.${b}`,`${a}.${b-1}${rnd(5,9)}`,`${a}.0${rnd(5,9)}`,`${a}.${b-1}`]; const v=xs.map(Number); if(new Set(v).size<4) return null; const mx=xs[v.indexOf(Math.max(...v))]; return Q4(`줄넘기 줄의 길이예요. 가장 긴 줄은? (${xs.map(x=>x+' m').join(', ')})`,'',mx+' m',xs.filter(x=>x!==mx).map(x=>[x+' m',x.length>mx.length?'N4-02':null])); };
  /* 묶음 할인: 가장 싸게 사기 (Bleistifte: 묶음을 쓰지 않은 값) */
  V.pack=()=>{ const one=pk([300,400,500]), k=pk([4,5,6]), pack=one*k-pk([200,300,400]), n=k*2+rnd(1,k-1); const best=Math.floor(n/k)*pack+(n%k)*one;
    return Q4(`연필 한 자루는 ${won(one)}원, ${k}자루 묶음은 ${won(pack)}원이에요. 연필 ${n}자루를 가장 싸게 사려면 얼마가 필요할까요?`,'',won(best)+'원',[[won(n*one)+'원',null],[won(Math.ceil(n/k)*pack)+'원',null],[won(best+one)+'원',null],[won(pack*n/k|0)+'원',null]]); };
  /* 구할 수 없는 문제: 보이는 수를 아무렇게나 계산함 (Kapitänsaufgabe) */
  V.capt=()=>{ const a=rnd(11,29), b=rnd(12,25); return Q4(`버스에 어른 ${a}명과 어린이 ${b}명이 타고 있어요. 버스 운전사는 몇 살일까요?`,'',`주어진 것으로는 알 수 없어요`,[[`${a+b}살`,'N1-03'],[`${Math.abs(a-b)}살`,'N1-03'],[`${a}살`,null],[`${b}살`,null]]); };
  /* 24시간 시각 (Uhrzeitenzuordnen: 24시각제를 12시각제로 바꾸지 못함) */
  V.h24=()=>{ const h=rnd(13,21), m=rnd(1,11)*5; return Q4(`기차가 ${h}시 ${m}분에 출발해요. 같은 시각은?`,'',`오후 ${h-12}시 ${m}분`,[[`오후 ${h-10}시 ${m}분`,'G2-12'],[`오전 ${h-12}시 ${m}분`,'G2-12'],[`오후 ${h}시 ${m}분`,'G2-12'],[`오후 ${h-12}시 ${60-m}분`,null]]); };
  window._DE=V;
  try{ const add=(ep,g)=>{ if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    [['S6-36','span'],['S3-58','len'],['S3-24','pack'],['S2-04','capt'],['S6-34','h24']].forEach(([e,k])=>add(e,T(V[k]))); }catch(e){}
}

/* ---------- 3-86. 프랑스 repères '눈금 있는 수직선에 수 놓기' 꼴: 눈금 한 칸의 크기를 바꿔 가며 묻는다 ---------- */
{ const S=GX_S, pk=a=>a[rnd(0,a.length-1)];
  const Q4=(q,vis,ans,wr)=>{ const A=String(ans), s=new Set([A]), w=[]; for(const [v,c] of wr){ if(v==null) continue; const k=String(v); if(s.has(k)||/NaN|e/.test(k)) continue; s.add(k); w.push([k,c]); } if(w.length<3) return null; return cq(q,vis,A,w.slice(0,3)); };
  const fmt=(v,dp)=>dp?(+v.toFixed(dp)).toString():Math.round(v).toLocaleString('ko-KR');
  const line=(start,step,per,k,dp)=>{ /* 큰 눈금 2개(첫 칸·마지막 칸)에만 수를 쓰고, 그 사이를 per칸으로 나눔. 화살표는 k번째 */ const W=280, u=W/(per*2); let g=`<line x1="14" y1="40" x2="${14+W}" y2="40" stroke="${S}" stroke-width="2"/>`; for(let i=0;i<=per*2;i++){ const x=14+i*u; g+=`<line x1="${x}" y1="${i%per?33:27}" x2="${x}" y2="${i%per?47:53}" stroke="${S}" stroke-width="${i%per?1:2}"/>`; if(i%per===0&&i<per*2) g+=gxT(x,70,fmt(start+step*i,dp),11); }
    g+=`<polygon points="${14+k*u},26 ${8+k*u},12 ${20+k*u},12" fill="#C2412F"/>`; return cpWrap(cpSvg(g,W+28,76,320),''); };
  const mk=(start,step,per,dp,grade)=>{ const k=rnd(1,per*2-1); if(k===per) return null; const v=start+step*k; const one=start+k*(dp?Math.pow(10,-dp):1), ten=start+step*10*k/((per===10)?10:1);
    return Q4('화살표가 가리키는 수는 얼마인가요?',line(start,step,per,k,dp),fmt(v,dp),[[fmt(one,dp),'D4-01'],[fmt(start+step*(k+1),dp),'G2-09'],[fmt(start+step*10*k,dp),'N3-09'],[fmt(start+step*(k-1),dp),'G2-09']]); };
  const F={
    big:()=>{ const step=pk([1000,10000,100000]), per=pk([5,10]); const start=rnd(1,8)*step*per; return mk(start,step,per,0); },
    dec1:()=>{ const per=pk([5,10]), step=per===5?0.2:0.1; return mk(rnd(0,3),step,per,1); },
    dec2:()=>{ const per=pk([5,10]), step=per===5?0.02:0.01; return mk(rnd(1,4)+rnd(0,9)/10,step,per,2); },
    half:()=>{ return mk(rnd(0,4)*2,0.5,2,1); }
  };
  const T=f=>()=>{ for(let t=0;t<40;t++){ const q=f(); if(q) return q; } return null; };
  window._FR=F;
  try{ const add=(ep,g)=>{ if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-43',T(F.big)); add('S3-21',T(F.dec1)); add('S3-56',T(F.dec2)); add('S3-22',T(F.half)); }catch(e){}
}

/* ---------- 3-87. 영국 KS2 계산 시험(2026) 꼴: □가 식의 앞·가운데에 오는 문제(등호를 '답은'으로만 보지 않게) ---------- */
{ const pk=a=>a[rnd(0,a.length-1)], won=n=>n.toLocaleString('ko-KR');
  const Q4=(q,vis,ans,wr)=>{ const A=String(ans), s=new Set([A]), w=[]; for(const [v,c] of wr){ if(v==null) continue; const k=String(v); if(s.has(k)) continue; s.add(k); w.push([k,c]); } if(w.length<3) return null; return cq(q,vis,A,w.slice(0,3)); };
  const T=f=>()=>{ for(let t=0;t<30;t++){ const q=f(); if(q) return q; } return null; }, K={};
  K.expand=()=>{ const m=rnd(2,9), t=rnd(1,9), h=rnd(1,9), o=rnd(1,9); const n=m*1000000+t*10000+h*100+o; return Q4(`${won(n)} = ${won(m*1000000)} + □ + ${h*100} + ${o}에서 □에 알맞은 수는?`,'',won(t*10000),[[won(t*1000),'N4-15'],[won(t*100000),'N4-15'],[String(t),'N4-15'],[won(t*10),null]]); };
  K.frontDiv=()=>{ const d=rnd(3,9), q=rnd(11,19); return Q4(`□ ÷ ${d} = ${q}에서 □에 알맞은 수는?`,'',d*q,[[d+q,'N3-30'],[q-d,'N3-30'],[d*q+d,null],[d*(q-1),null]]); };
  K.leftEq=()=>{ const a=rnd(430,999), b=rnd(115,a-210); if(a%10>=b%10) return null; return Q4(`□ = ${a} − ${b}에서 □에 알맞은 수는?`,'',a-b,[[a+b,'R4-02'],[a-b+10,'N2-08'],[Math.abs(Math.floor(a/10)*10-Math.floor(b/10)*10)+Math.abs(a%10-b%10),'N2-02'],[a-b-10,null]]); };
  window._KS=K;
  try{ const add=(ep,g)=>{ if(G36[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
    add('S3-40',T(K.expand)); add('S3-31',T(K.frontDiv)); add('S2-06',T(K.leftEq)); }catch(e){}
}

/* ---------- 3-89. 각도기 그림을 보고 각도 읽기(늘품이 진단A '각도기를 보고 빈칸에 각의 크기를 써넣으시오' 꼴) ----------
   교과서 말: 각도기의 중심을 꼭짓점에, 밑금을 한 변에 맞추고, 그 변을 0°로 하여 다른 한 변이 가리키는 눈금을 읽는다.
   오답: 다른 줄 눈금(180°−각)을 읽음(G4-01). 변이 오른쪽·왼쪽 어느 쪽에 맞춰져도 나오게 한다. */
{ const pk=a=>a[rnd(0,a.length-1)];
  window._PROT=()=>{ const deg=rnd(2,16)*10+pk([0,0,5]); if(deg===90) return null; const left=Math.random()<.5; const a=(left?180-deg:deg)*Math.PI/180;
    let s=`<g transform="translate(160,150)">${protG(140)}</g>`; const bx=left?5:315; s+=`<line x1="160" y1="150" x2="${bx}" y2="150" stroke="#6B3E1C" stroke-width="3"/><line x1="160" y1="150" x2="${(160+155*Math.cos(a)).toFixed(1)}" y2="${(150-155*Math.sin(a)).toFixed(1)}" stroke="#D45F16" stroke-width="3"/>`;
    const vis=`<svg viewBox="0 0 320 160" style="width:100%;max-width:340px;display:block;margin:auto">${s}</svg>`;
    const o=[[String(180-deg)+'°','G4-01'],[String(deg+10)+'°',null],[String(Math.max(5,deg-10))+'°',null]]; const A=deg+'°'; if(o.some(x=>x[0]===A)) return null;
    const q=cq('각도기로 각의 크기를 재었어요. 각의 크기는 몇 도인가요?',vis,A,o); q.hint1='각도기의 중심을 꼭짓점에, 밑금을 한 변(갈색)에 맞추었어요. 이 변이 0°인 줄의 눈금을 따라가며 다른 한 변(주황)이 가리키는 눈금을 읽어요.'; return q; };
  try{ const g=()=>{ for(let t=0;t<20;t++){ const q=window._PROT(); if(q) return q; } return null; }; (window._NTW=window._NTW||[]).push(['S6-47',G36['S6-47'].length,g]); G36['S6-47'].push(g); }catch(e){}
}
