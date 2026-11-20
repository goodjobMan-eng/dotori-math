
/* ---------- 3-9. 기본(예제) 문제에 오개념 보기 달기 — 3학년 수와 연산 (2026-11-20, Claude·Gemini 교차 검토 1차) ---------- */
// 기본 문제는 수가 매번 바뀌므로, 만들어진 문제에서 수를 읽어 '오개념이면 내는 답'을 계산해 보기에 넣는다.
// 한 문항의 두 오답은 서로 다른 코드. 오답 풀이 3개 이상이면 그중 2개를 뽑는다(시드로 재현).
// 구구 인접 단처럼 오개념이 아닌 '사실 인출 실패'는 코드 대신 q.fx에 표시해 둔다(나중에 되풀이 큐로).
Object.assign(MIS, {
'N2-07':['올림수를 윗자리로 넘기지 않고 그 자리에 그대로 씀','10이 넘으면 1을 윗자리로 올리고, 남은 수만 그 자리에 써요.'],
'N2-08':['받아내림한 뒤 윗자리 수를 줄이지 않음','10을 빌려 왔으면 윗자리 수는 1 작아져요.'],
'N3-10':['검산을 무조건 처음 수끼리 더하는 것으로 앎','뺄셈의 검산은 (답) + (뺀 수)가 처음 수가 되는지 보는 거예요.'],
'N3-11':['나눗셈을 한 번 빼는 것으로 이해','나눗셈은 똑같이 나누거나, 같은 수를 0이 될 때까지 여러 번 빼는 거예요.'],
'N3-12':['몇십의 곱에서 0을 빠뜨림','몇십을 곱할 때는 곱한 뒤 0을 꼭 붙여요.'],
'N3-13':['십의 자리 수를 곱하지 않음','일의 자리도, 십의 자리도 모두 곱해요.'],
'N3-14':['곱셈에서 올린 수를 더하지 않음','올린 수는 윗자리 곱에 더해요.'],
'N3-15':['나눗셈 검산에서 나머지를 더하지 않음','(나누는 수) × (몫)에 나머지를 더해야 처음 수가 돼요.'],
'N3-16':['색칠하지 않은 부분을 분자로 씀','분자는 색칠한 부분의 수예요.'],
'N3-17':['분모를 나머지 조각 수로 씀(부분 대 부분)','분모는 전체를 똑같이 나눈 수예요. 색칠한 것도 함께 세요.'],
'N3-18':['분자와 분모가 같은 분수를 진분수로 봄','분자가 분모와 같거나 크면 가분수예요.'],
'N3-19':['대분수의 자연수를 무시하고 분자만 비교','대분수를 가분수로 바꾸거나, 자연수 부분부터 비교해요.'],
'N3-20':['검산에서 더할 수를 잘못 고름','(답)에 (뺀 수)를 더해요. 처음 수를 더하는 게 아니에요.'],
'N3-21':['올린 수를 먼저 더한 뒤 곱함','먼저 곱하고, 그다음에 올린 수를 더해요.'],
'N3-22':['검산식에서 몫·나누는 수·나머지의 자리를 혼동','(나누는 수) × (몫) + (나머지) 순서예요.'],
'N3-23':['자연수가 붙은 분수가 무조건 더 크다고 봄','가분수를 대분수로 바꾸어 비교해요.'],
'N3-24':['분자가 같으면 크기도 같다고 봄','분자가 같아도 분모가 다르면 한 조각의 크기가 달라요.'],
'N3-25':['전체의 분수에서 분모를 그대로 답함','전체를 분모만큼 똑같이 묶었을 때 한 묶음의 수를 구해요.'],
'N3-26':['전체의 분수를 뺄셈으로 처리','분수만큼은 빼는 것이 아니라 똑같이 나눈 것 중 몇 묶음이에요.'],
'N3-27':['단위가 바뀌어도 수를 그대로 씀','1 cm는 10 mm예요. 단위가 커지면 수는 작아져요.'],
'N3-28':['mm와 cm의 관계를 100배로 앎','10 mm가 1 cm예요. 1 mm는 0.1 cm예요.'],
'N3-29':['0.1을 일의 자리에 더함','0.1은 소수 첫째 자리에 더해요.'],
'N3-30':['곱셈과 나눗셈의 관계를 모름(보이는 수를 그대로 곱함)','나눗셈식의 몫과 나누는 수를 곱하면 나누어지는 수가 돼요.'],
'N3-31':['몫을 너무 크게 잡고 거꾸로 뺌','나누는 수 × 몫이 나누어지는 수보다 크면 안 돼요.'],
'N3-32':['진분수·가분수·대분수의 이름 혼동','분자가 분모보다 작으면 진분수, 자연수와 진분수로 된 수는 대분수예요.'],
'N3-33':['몇십 × 몇십에서 0의 개수를 잘못 셈','곱하는 두 수의 0의 개수만큼 0을 붙여요. 4 × 5 = 20의 0은 따로예요.'],
'N3-34':['몫의 0을 끝에 붙임','나눌 수 없는 자리가 어디인지 보고 그 자리에 0을 써요.'],
'N3-35':['대분수의 자연수를 분자에 그대로 더함','자연수 1은 분모와 같은 수만큼의 조각이에요.'],
'N3-36':['대분수의 자연수와 분자를 이어 씀','자연수를 분모만큼의 조각으로 바꾸어 분자에 더해요.'],
'N3-37':['자릿값을 보지 않고 가장 큰 숫자가 든 수를 고름','자연수 부분부터 비교해요.'],
});
MIS['N3-02'][0]='나머지가 나누는 수보다 크거나 같음';
const TAG3={}; const T3=(k,f)=>{ TAG3[k]=f; };
const _pl=s=>String(s==null?'':s).replace(/<svg[\s\S]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ');
const _nums=q=>(_pl(q.q)+' | '+_pl(q.visual)).match(/\d+(?:\.\d+)?/g)||[];
// 정답은 그대로 두고 오답만 바꾼다. pool: [[값, 코드|'F'|null], ...]
function setOpts(q,pool,keep){ const A=String(q.ans), seen=new Set([A]), ok=[];
  for(const [v,c] of pool){ const s=String(v); if(v==null||seen.has(s)||/NaN|undefined|-/.test(s)) continue; seen.add(s); ok.push([v,c]); }
  const codes=new Set(); const uniq=ok.filter(([v,c])=>{ if(c&&c!=='F'&&codes.has(c)) return false; if(c) codes.add(c); return true; });
  if(uniq.length<2) return q;                                     // 조건이 안 맞는 수가 나오면 원래 보기 그대로
  while(uniq.length>2) uniq.splice(Math.floor(Math.random()*uniq.length),1);
  const num=typeof q.ans==='number', opts=[q.ans,...uniq.map(x=>num?+x[0]:String(x[0]))];
  for(let i=opts.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [opts[i],opts[j]]=[opts[j],opts[i]]; }
  q.opts=opts; q.mis={}; q.fx={}; uniq.forEach(([v,c])=>{ if(c==='F') q.fx[String(v)]=1; else if(c) q.mis[String(v)]=c; }); if(keep) Object.assign(q,keep); return q; }
function tagOnly(q,map){ q.mis=q.mis||{}; for(const o of q.opts||[]){ const c=map(String(o)); if(c&&String(o)!==String(q.ans)) q.mis[String(o)]=c; } return q; }
const dg=n=>String(n).split('').map(Number);
T3('S2-02#2',q=>{ const [a,b]=_nums(q).map(Number); if(a+b!==q.ans) return q; const L=Math.max(String(a).length,String(b).length), x=dg(String(a).padStart(L,'0')), y=dg(String(b).padStart(L,'0')), s=x.map((d,i)=>d+y[i]);
  return setOpts(q,[[+s.map(v=>v%10).join(''),'N2-01'],[s.some(v=>v>9)?+s.join(''):null,'N2-07']]); });
T3('S2-05#2',q=>{ const [a,b]=_nums(q).map(Number); if(a-b!==q.ans) return q; const x=dg(a), y=dg(String(b).padStart(x.length,'0'));
  return setOpts(q,[[+x.map((d,i)=>Math.abs(d-y[i])).join(''),'N2-02'],[+x.map((d,i)=>d<y[i]?d+10-y[i]:d-y[i]).join(''),'N2-08']]); });
T3('S2-07#2',q=>{ const [a,b,c]=_nums(q).map(Number); if(a-b!==c) return q; return setOpts(q,[[`${a} + ${b} = ${a+b}`,'N3-10'],[`${a} + ${c} = ${a+c}`,'N3-20']]); });
T3('S2-08#1',q=>{ const [a,b]=_nums(q).map(Number); return setOpts(q,[[`${a}개에서 ${b}개 빼기`,'N3-11'],[`${b}개를 ${a}곳에 똑같이 나누기`,'N3-01']]); });
T3('S2-10#1',q=>{ const [a,b]=_nums(q).map(Number); return setOpts(q,[[`${a} × ${b} = ${a*b}`,'N3-30'],[`${a} − ${b} = ${a-b}`,'N3-11']]); });
T3('S2-11#1',q=>{ const [a,b]=_nums(q).map(Number), A=+q.ans; if(a/b!==A) return q; const f=Math.random()<.5&&A>1?A-1:A+1; return setOpts(q,[[a-b,'N3-11'],[f===a-b?A+2:f,'F']]); });
T3('S2-12#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*×\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2]; if(a*b!==q.ans) return q; return setOpts(q,[[a/10*b,'N3-12'],[a+b,'N2-05']]); });
T3('S2-14#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*×\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2], t=Math.floor(a/10), o=a%10; if(a*b!==q.ans||o<1||b<2) return q;
  return setOpts(q,[[+`${t}${o*b}`,'N3-13'],[a+b,'N2-05']],{q:`${a} × ${b}의 값은?`}); });
T3('S2-15#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*×\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2], t=Math.floor(a/10), o=a%10, c=Math.floor(o*b/10); if(a*b!==q.ans||!c) return q;
  return setOpts(q,[[t*b*10+o*b%10,'N3-14'],[(t+c)*b*10+o*b%10,'N3-21'],[+`${t*b}${o*b}`,'N2-07']],{q:`${a} × ${b}의 값은?`}); });
T3('S3-17#3',q=>{ const m=String(q.ans).match(/^(\d+)분의 1$/); if(!m||+m[1]<3) return q; const n=+m[1]; return setOpts(q,[[`${n}분의 ${n-1}`,'N3-16'],[`${n-1}분의 1`,'N3-17']]); });
T3('S3-18#3',q=>{ const m=String(q.ans).match(/^(\d+)분의 (\d+)$/); if(!m) return q; const b=+m[1], a=+m[2], r=b-a; if(r<1||r===a) return q;
  return setOpts(q,[[`${b}분의 ${r}`,'N3-16'],[a<r?`${r}분의 ${a}`:`${a}분의 ${r}`,'N3-17']]); });
T3('S3-20#0',q=>{ const w=(q.opts||[]).map(String).find(o=>o!==String(q.ans)); if(!w) return q; return setOpts(q,[[w,'N3-06'],['크기가 같다','N3-24']]); });
T3('S3-20#1',q=>{ const ds=(q.opts||[]).map(o=>+String(o).match(/^(\d+)분의/)[1]), mn=Math.min(...ds); return tagOnly(q,o=>o.startsWith(mn+'분의')?'N3-06':null); });
T3('S3-21#3',q=>{ const x=_nums(q)[0]; if(String(q.ans)!=='0.'+x) return q; return setOpts(q,[[x,'N3-27'],['0.0'+x,'N3-28']]); });
T3('S3-22#2',q=>{ const m=_pl(q.q).match(/(\d+)\.(\d)보다 0\.1 큰/); if(!m) return q; const d=+m[1], f=+m[2]; return setOpts(q,[[f===9?`${d}.10`:null,'N3-08'],[`${d+1}.${f}`,'N3-29'],[f!==9?`${d}.${f}1`:null,null]]); });
T3('S3-27#1',q=>{ const a=_nums(q)[0]; return tagOnly(q,o=>o===String(a)?'N3-03':null); });
T3('S3-30#0',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2], Q=Math.floor(a/b), r=a%b; if(!r||String(q.ans)!==`${Q} … ${r}`) return q;
  return setOpts(q,[[`${Q-1} … ${r+b}`,'N3-02'],[`${Q+1} … ${b-r}`,'N3-31']]); });
T3('S3-33#0',q=>{ const [a,b,Q,r]=_nums(q).map(Number); if(b*Q+r!==a) return q; return setOpts(q,[[`${b} × ${Q} = ${b*Q}`,'N3-15'],[`${Q} × ${r} + ${b} = ${Q*r+b}`,'N3-22']]); });
T3('S3-35#1',q=>{ const m=_pl(q.q).match(/(\d+)의 (\d+)분의 1/); if(!m) return q; const n=+m[1], b=+m[2]; if(n/b!==+q.ans||n/b===b||n===2*b) return q; return setOpts(q,[[b,'N3-25'],[n-b,'N3-26']]); });
T3('S3-36#0',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+)/); if(!m) return q; const eq=m[1]===m[2]; return setOpts(q,[[q.ans==='가분수'?'진분수':'가분수',eq?'N3-18':'N3-32'],['대분수',eq?'N3-32':null]]); });
T3('S3-38#0',q=>{ const m=_pl(q.q).match(/(\d+)과 (\d+)분의 (\d+)\s*과 (\d+)분의 (\d+)/); if(!m) return q; const n=+m[3], k=+m[5], A=String(q.ans), fr=n<k?'<':n>k?'>':'=';
  return tagOnly(q,o=>o===fr?'N3-19':o==='>'?'N3-23':null); });
function tagQ(ep,i,q){ const f=TAG3[ep+'#'+i]; if(!f||!q||typeof q!=='object') return q; try{ return f(q)||q; }catch(e){ return q; } }

// Gemini가 꼭 있어야 한다고 본 진단 문항(검토 후 채택). 수를 바꾼 종을 2~3개씩 둔다.
B('S2-06', ['502 − 167을 계산하면?','335',[['345','N2-04'],['435','N2-08']]], ['704 − 258을 계산하면?','446',[['456','N2-04'],['546','N2-08']]], ['603 − 345를 계산하면?','258',[['268','N2-04'],['358','N2-08']]]);
B('S3-25', ['40 × 50을 계산하면?','2000',[['200','N3-33'],['90','N2-05']]], ['60 × 50을 계산하면?','3000',[['300','N3-33'],['110','N2-05']]], ['80 × 50을 계산하면?','4000',[['400','N3-33'],['130','N2-05']]]);
B('S3-32', ['312 ÷ 3의 몫은?','104',[['14','N3-04'],['140','N3-34']]], ['824 ÷ 4의 몫은?','206',[['26','N3-04'],['260','N3-34']]], ['515 ÷ 5의 몫은?','103',[['13','N3-04'],['130','N3-34']]]);
B('S3-37', ['2와 5분의 3을 가분수로 나타내면?','5분의 13',[['5분의 5','N3-35'],['5분의 23','N3-36']]], ['3과 4분의 1을 가분수로 나타내면?','4분의 13',[['4분의 4','N3-35'],['4분의 31','N3-36']]], ['1과 7분의 4를 가분수로 나타내면?','7분의 11',[['7분의 5','N3-35'],['7분의 14','N3-36']]]);
B('S3-22', ['0.9, 1.4, 2 중 가장 큰 수는?','2',[['1.4','N3-08'],['0.9','N3-37']]], ['0.8, 2.3, 3 중 가장 큰 수는?','3',[['2.3','N3-08'],['0.8','N3-37']]], ['0.7, 1.5, 4 중 가장 큰 수는?','4',[['1.5','N3-08'],['0.7','N3-37']]]);

/* ---------- 3-10. 4학년 수와 연산 (Claude·Gemini 교차 검토 2차) ---------- */
Object.assign(MIS, {
'N4-07':['자연수의 자릿수(0의 개수)·단위 사이 배수를 틀림','만은 천의 10배예요. 0의 개수를 자리마다 세어 봐요.'],
'N4-08':['큰 수를 네 자리씩 끊어 읽지 못함','일의 자리부터 네 자리씩 끊고 만, 억, 조를 붙여 읽어요.'],
'N4-09':['자리 이름·세는 방향을 틀림','자리는 일의 자리(소수는 소수점)에서부터 세요.'],
'N4-10':['자릿수를 보지 않고 맨 앞 숫자만 비교','먼저 자릿수를 비교해요. 자릿수가 많은 수가 더 커요.'],
'N4-11':['몫을 크게 어림하고 확인하지 않음','(나누는 수) × (몫)이 나누어지는 수보다 크면 몫을 줄여요.'],
'N4-12':['나머지를 문제 상황에 맞게 처리하지 못함','남은 것도 태워야 하는지, 남은 것은 못 쓰는지 상황을 먼저 봐요.'],
'N4-13':['소수는 자릿수가 짧을수록 크다고 봄','같은 자리끼리 차례로 비교해요. 0.9와 0.90은 같아요.'],
'N4-14':['몇 배와 몇 분의 1의 방향을 혼동','수가 작아졌으면 몇 분의 1, 커졌으면 몇 배예요.'],
'N4-15':['자리의 숫자와 그 숫자가 나타내는 값을 혼동','"숫자"는 그 자리에 쓰인 한 자리 수예요.'],
'N4-16':['몫 대신 나머지를 답함','무엇을 묻는지 다시 읽어요.'],
'N4-18':['큰 수를 소리 나는 대로 이어 씀','오만 육백사십은 50000과 640을 이어 쓰는 것이 아니라 자리에 맞춰 써요.'],
'N4-19':['곱셈을 같은 자리 숫자끼리만 곱함','곱하는 수의 각 자리를 곱해지는 수 전체에 곱해요.'],
'N4-20':['0을 지우고 나눈 뒤 나머지의 자릿값을 되돌리지 않음','0을 하나씩 지웠으면 나머지에는 0을 다시 붙여요.'],
'N4-23':['소수점이 옮겨지는 칸 수를 틀림','10분의 1마다 소수점이 왼쪽으로 한 칸씩 옮겨져요.'],
});
const _nc=s=>String(s).replace(/(\d),(?=\d{3})/g,'$1');
// 4학년 큰 수 단원은 교과서처럼 세 자리 쉼표를 쓰지 않는다(쉼표가 네 자리 끊어 읽기를 방해하고, 쉼표 개수만으로 크기를 맞히게 됨).
function noComma(q){ ['q','visual','speech'].forEach(k=>{ if(typeof q[k]==='string') q[k]=_nc(q[k]); }); if(typeof q.ans==='string') q.ans=_nc(q.ans); if(q.opts) q.opts=q.opts.map(o=>typeof o==='string'?_nc(o):o); if(typeof q.ansText==='string') q.ansText=_nc(q.ansText); return q; }
T3('S3-39#0',q=>setOpts(q,[[99910,'N2-07'],[100000,'N4-07']]));
T3('S3-39#1',q=>{ const m=_pl(q.q).match(/1000이 (\d+)개/); if(!m||+m[1]<20||+m[1]%10) return q; const n=+m[1]; return setOpts(q,[[100*n,'N4-07'],[1000+n,'N2-05']]); });
T3('S3-39#2',q=>{ const m=_pl(q.q).match(/(\d+)만은 1000이/); if(!m) return q; return setOpts(q,[[+m[1],'N4-07'],[+m[1]*100,null]]); });
T3('S3-40#2',q=>{ const m=_pl(q.q).match(/(\d+)에서 (만|천|백|십|일)의 자리 숫자/); if(!m) return q; const d=dg(m[1]), L=d.length, p='일십백천만'.indexOf(m[2]), at=k=>(k>=0&&k<L)?d[L-1-k]:null; if(at(p)!==+q.ans) return q;
  return setOpts(q,[[at(p+1)!=null?at(p+1):at(p-1),'N4-09'],[p>0&&d[L-1-p]?d[L-1-p]*10**p:null,'N4-15'],[d[p]!==at(p+1)?d[p]:null,null]]); });
T3('S3-41#1',q=>{ noComma(q); const m=_pl(q.q).match(/이 (\d+)개인 수/); const A=+q.ans; if(!m||!A) return q; const k=+m[1], u=A/k; return setOpts(q,[[String(A/10),'N4-07'],[String(u+k),'N2-05']]); });
['S3-40#0','S3-41#0','S3-42#0','S3-42#1','S3-43#0','S3-44#1'].forEach(k=>T3(k,noComma));
T3('S3-43#1',q=>{ noComma(q); const A=+q.ans; if(!A) return q; return setOpts(q,[[String(A/10),'N4-09'],[String(+String(A).replace(/0+$/,'')),'N4-07']]); });
T3('S3-44#0',q=>{ noComma(q); const [a,b]=_nums(q); if(!a||!b) return q; const big=+a>+b?a:b, sm=+a>+b?b:a, w=(q.opts||[]).map(String).find(o=>o!==String(q.ans)); if(!w) return q;
  return setOpts(q,[[w,String(sm).length<String(big).length&&sm[0]>big[0]?'N4-10':null],['=',null]]); });
T3('S3-47#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2], Q=Math.floor(a/b); if(Q!==+q.ans) return q; return setOpts(q,[[Q+1,'N4-11'],[a-b,'N3-11']],{q:`${a} ÷ ${b}의 몫은?`}); });
T3('S3-50#0',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*(\d+)\s*=\s*(\d+)\s*…\s*(\d+)/); if(!m) return q; const Q=+m[3], r=+m[4]; if(Q+1!==+q.ans) return q; return setOpts(q,[[Q,'N4-12'],[r,'N4-16'],[Q+r,null]]); });
T3('S3-50#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*(\d+)\s*=\s*(\d+)\s*…\s*(\d+)/); if(!m) return q; const Q=+m[3], r=+m[4]; if(Q!==+q.ans) return q; return setOpts(q,[[Q+1,'N4-12'],[r,'N4-16']]); });
T3('S3-51#2',q=>{ const m=String(q.ans).match(/^(\d+)분의 (\d+)$/); if(!m) return q; return tagOnly(q,o=>o===`${2*m[1]}분의 ${m[2]}`?'N4-04':null); });
T3('S3-56#2',q=>{ const m=_pl(q.q).match(/(\d)\.(\d)(\d)에서 소수 둘째/); if(!m||m[2]===m[3]||+m[3]!==+q.ans) return q; return setOpts(q,[[+m[2],'N4-09'],[m[1]!==m[2]&&m[1]!==m[3]?+m[1]:null,null]]); });
T3('S3-56#3',q=>{ const x=_nums(q)[0]; return tagOnly(q,o=>o===String(x)?'N3-27':o===String(x/10)?'N3-28':null); });
T3('S3-58#0',q=>{ const [a,b]=_nums(q); if(!a||!b||a.length===b.length) return q; const short=a.length<b.length?a:b, shortBig=+short>+(short===a?b:a); return tagOnly(q,o=>o==='='?null:shortBig?'N4-02':'N4-13'); });
T3('S3-58#1',q=>{ q.opts=['=','<','>']; for(let i=2;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [q.opts[i],q.opts[j]]=[q.opts[j],q.opts[i]]; } q.mis={'<':'N4-02','>':'N4-13'}; return q; });
T3('S3-59#2',q=>tagOnly(q,o=>/배$/.test(o)&&!/배$/.test(String(q.ans))?'N4-14':/분의 1$/.test(o)?'N4-23':null));
T3('S3-60#1',q=>{ const m=_pl(q.visual).match(/(\d)\.(\d)\s*\+\s*(\d)\.(\d)/); if(!m) return q; const [ai,af,bi,bf]=m.slice(1).map(Number); if(af+bf<10) return q; return setOpts(q,[[`${ai+bi}.${af+bf}`,'N3-08'],[`${ai+bi}.${(af+bf)%10}`,'N2-01']],{q:`${ai}.${af} + ${bi}.${bf}의 값은?`}); });

B('S3-40', ['오만 육백사십을 수로 쓰면?','50640',[['5640','N4-01'],['50000640','N4-18']]], ['삼만 칠십이를 수로 쓰면?','30072',[['3072','N4-01'],['3000072','N4-18']]], ['팔만 오백육을 수로 쓰면?','80506',[['8506','N4-01'],['80000506','N4-18']]]);
B('S3-45', ['214 × 32를 계산하면?','6848',[['1070','N3-03'],['238','N4-19']]], ['312 × 23을 계산하면?','7176',[['1560','N3-03'],['326','N4-19']]], ['123 × 32를 계산하면?','3936',[['615','N3-03'],['166','N4-19']]]);
B('S3-46', ['580 ÷ 40의 몫과 나머지는?','14 … 20',[['140 … 20','N4-06'],['14 … 2','N4-20']]], ['750 ÷ 60의 몫과 나머지는?','12 … 30',[['120 … 30','N4-06'],['12 … 3','N4-20']]], ['930 ÷ 70의 몫과 나머지는?','13 … 20',[['130 … 20','N4-06'],['13 … 2','N4-20']]]);
B('S3-55', ['3과 8분의 1 − 1과 8분의 5를 계산하면?','1과 8분의 4',[['1과 8분의 6','N4-05'],['2와 8분의 4','N2-02']]], ['5와 7분의 2 − 2와 7분의 6을 계산하면?','2와 7분의 3',[['2와 7분의 6','N4-05'],['3과 7분의 4','N2-02']]], ['4와 9분의 1 − 1과 9분의 6을 계산하면?','2와 9분의 4',[['2와 9분의 5','N4-05'],['3과 9분의 5','N2-02']]]);
B('S3-61', ['2.4 + 1.35를 계산하면?','3.75',[['1.59','N4-03'],['3.39','N3-08']]], ['3.2 + 1.46을 계산하면?','4.66',[['1.78','N4-03'],['4.48','N3-08']]], ['1.6 + 2.23을 계산하면?','3.83',[['2.39','N4-03'],['3.29','N3-08']]]);
