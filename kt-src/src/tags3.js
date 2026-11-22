
/* ---------- 3-9. 기본(예제) 문제에 오개념 보기 달기 — 3학년 수와 연산 (2026-11-20, Claude·Gemini 교차 검토 1차) ---------- */
// 기본 문제는 수가 매번 바뀌므로, 만들어진 문제에서 수를 읽어 '오개념이면 내는 답'을 계산해 보기에 넣는다.
// 한 문항의 오답들은 서로 다른 코드. 오개념 유형 수만큼 보기를 둔다(오답 최대 4개, 5지선다까지).
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
  while(uniq.length>4) uniq.splice(Math.floor(Math.random()*uniq.length),1);      // 오개념 유형이 많으면 보기도 늘린다(정답 + 오답 최대 4개 = 5지선다). 교수님 지적(2026-11-20)
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
  return setOpts(q,[[t*b*10+o*b%10,'N3-14'],[(t+c)*b*10+o*b%10,'N3-21'],[+`${t*b}${o*b}`,'N2-07'],[a+b,'N2-05']],{q:`${a} × ${b}의 값은?`}); });
T3('S3-17#3',q=>{ const m=String(q.ans).match(/^(\d+)분의 1$/); if(!m||+m[1]<3) return q; const n=+m[1]; return setOpts(q,[[`${n}분의 ${n-1}`,'N3-16'],[`${n-1}분의 1`,'N3-17']]); });
T3('S3-18#3',q=>{ const m=String(q.ans).match(/^(\d+)분의 (\d+)$/); if(!m) return q; const b=+m[1], a=+m[2], r=b-a; if(r<1||r===a) return q;
  return setOpts(q,[[`${b}분의 ${r}`,'N3-16'],[a<r?`${r}분의 ${a}`:`${a}분의 ${r}`,'N3-17']]); });
T3('S3-20#0',q=>{ const w=(q.opts||[]).map(String).find(o=>o!==String(q.ans)); if(!w) return q; return setOpts(q,[[w,'N3-06'],['크기가 같다','N3-24']]); });
T3('S3-20#1',q=>{ const ds=(q.opts||[]).map(o=>+String(o).match(/^(\d+)분의/)[1]), mn=Math.min(...ds); return tagOnly(q,o=>o.startsWith(mn+'분의')?'N3-06':null); });
T3('S3-21#3',q=>{ const x=_nums(q)[0]; if(String(q.ans)!=='0.'+x) return q; return setOpts(q,[[x,'N3-27'],['0.0'+x,'N3-28']]); });
T3('S3-22#2',q=>{ const m=_pl(q.q).match(/(\d+)\.(\d)보다 0\.1 큰/); if(!m) return q; const d=+m[1], f=+m[2]; return setOpts(q,[[f===9?`${d}.10`:null,'N3-08'],[`${d+1}.${f}`,'N3-29'],[f!==9?`${d}.${f}1`:null,null]]); });
T3('S3-27#1',q=>{ const a=_nums(q)[0]; return tagOnly(q,o=>o===String(a)?'N3-03':null); });
T3('S3-30#0',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*(\d+)/); if(!m) return q; const a=+m[1], b=+m[2], Q=Math.floor(a/b), r=a%b; if(!r||String(q.ans)!==`${Q} … ${r}`) return q;
  return setOpts(q,[[`${Q-1} … ${r+b}`,'N3-02'],[`${Q+1} … ${b-r}`,'N3-31'],[Q!==r?`${r} … ${Q}`:null,'N3-22']]); });
T3('S3-33#0',q=>{ const [a,b,Q,r]=_nums(q).map(Number); if(b*Q+r!==a) return q; return setOpts(q,[[`${b} × ${Q} = ${b*Q}`,'N3-15'],[`${Q} × ${r} + ${b} = ${Q*r+b}`,'N3-22']]); });
T3('S3-35#1',q=>{ const m=_pl(q.q).match(/(\d+)의 (\d+)분의 1/); if(!m) return q; const n=+m[1], b=+m[2]; if(n/b!==+q.ans||n/b===b||n===2*b) return q; return setOpts(q,[[b,'N3-25'],[n-b,'N3-26']]); });
T3('S3-36#0',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+)/); if(!m) return q; const eq=m[1]===m[2]; return setOpts(q,[[q.ans==='가분수'?'진분수':'가분수',eq?'N3-18':'N3-32'],['대분수',eq?'N3-32':null]]); });
T3('S3-38#0',q=>{ const m=_pl(q.q).match(/(\d+)과 (\d+)분의 (\d+)\s*과 (\d+)분의 (\d+)/); if(!m) return q; const n=+m[3], k=+m[5], A=String(q.ans), fr=n<k?'<':n>k?'>':'=';
  return tagOnly(q,o=>o===fr?'N3-19':o==='>'?'N3-23':null); });
let tagQ=function(ep,i,q){ const f=TAG3[ep+'#'+i]; if(!f||!q||typeof q!=='object') return q; try{ return f(q)||q; }catch(e){ return q; } }

// Gemini가 꼭 있어야 한다고 본 진단 문항(검토 후 채택). 수를 바꾼 종을 2~3개씩 둔다.
B('S2-06', ['502 − 167을 계산하면?','335',[['345','N2-04'],['435','N2-08']]], ['704 − 258을 계산하면?','446',[['456','N2-04'],['546','N2-08']]], ['603 − 345를 계산하면?','258',[['268','N2-04'],['358','N2-08']]]);
B('S3-25', ['40 × 50을 계산하면?','2000',[['200','N3-33'],['90','N2-05']]], ['60 × 50을 계산하면?','3000',[['300','N3-33'],['110','N2-05']]], ['80 × 50을 계산하면?','4000',[['400','N3-33'],['130','N2-05']]]);
B('S3-32', ['312 ÷ 3의 몫은?','104',[['14','N3-04'],['140','N3-34']]], ['824 ÷ 4의 몫은?','206',[['26','N3-04'],['260','N3-34']]], ['515 ÷ 5의 몫은?','103',[['13','N3-04'],['130','N3-34']]]);
B('S3-37', ['2와 5분의 3을 가분수로 나타내면?','5분의 13',[['5분의 5','N3-35'],['5분의 23','N3-36'],['5분의 6','N3-38']]], ['3과 4분의 1을 가분수로 나타내면?','4분의 13',[['4분의 4','N3-35'],['4분의 31','N3-36'],['4분의 3','N3-38']]], ['1과 7분의 4를 가분수로 나타내면?','7분의 11',[['7분의 5','N3-35'],['7분의 14','N3-36']]]);
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
T3('S3-56#2',q=>{ const m=_pl(q.q).match(/(\d)\.(\d)(\d)에서 소수 둘째/); if(!m||m[2]===m[3]||+m[3]!==+q.ans) return q; return setOpts(q,[[+m[2],'N4-24'],[m[1]!==m[2]&&m[1]!==m[3]?+m[1]:null,null]]); });
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

/* ---------- 3-11. 5~6학년 수와 연산 (Claude·Gemini 교차 검토 3차) ---------- */
Object.assign(MIS, {
'N5-09':['연산 순서·괄호를 잘못 적용','괄호 안을 먼저, 곱셈·나눗셈을 덧셈·뺄셈보다 먼저, 같은 급은 앞에서부터 계산해요.'],
'N5-10':['1과 자기 자신을 약수에서 뺌','1과 그 수 자신도 약수예요.'],
'N5-11':['공약수·공배수에서 한쪽 수만 확인','두 수 모두의 약수(배수)여야 공약수(공배수)예요.'],
'N5-12':['기약·최소·최대 조건을 끝까지 채우지 않음','더 나눌 수 있는지, 더 작은(큰) 수가 있는지 끝까지 확인해요.'],
'N5-13':['크기가 같은 분수를 만들 때 분자·분모 한쪽만 바꿈','분자와 분모에 같은 수를 곱하거나 같은 수로 나눠요.'],
'N5-14':['반올림하는 자리를 혼동','"백의 자리까지"는 십의 자리에서 반올림해요.'],
'N5-15':['(분수)×(자연수)에서 자연수를 분모에 곱함','자연수는 분자에만 곱해요.'],
'N6-11':['분수의 나눗셈에서 역수로 바꾸지 않고 그대로 곱함','나누는 분수의 분자와 분모를 바꾸어 곱해요.'],
'N6-12':['나눗셈 상황을 곱셈으로 식을 세움','1에 해당하는 양을 구할 때는 기준이 되는 양으로 나눠요.'],
});
const _gcd=(a,b)=>b?_gcd(b,a%b):a, _lcm=(a,b)=>a*b/_gcd(a,b), _jo=n=>'013678'.includes(String(n).slice(-1))?'은':'는';
const tagNum=(q,f)=>tagOnly(q,o=>{ const x=parseFloat(String(o).replace(/[^\d.]/g,'')), A=parseFloat(String(q.ans).replace(/[^\d.]/g,'')); return isNaN(x)||isNaN(A)?null:f(x,A,o); });
T3('S3-63#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*−\s*(\d+)\s*\+\s*(\d+)/); if(!m) return q; const [a,b,c]=m.slice(1).map(Number); if(a-b+c!==q.ans) return q; return setOpts(q,[[a-(b+c),'N5-09'],[q.ans+2,'F']],{q:`${a} − ${b} + ${c}의 값은?`}); });
T3('S3-65#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*−\s*(\d+)\s*×\s*(\d+)/); if(!m) return q; const [a,b,c]=m.slice(1).map(Number); if(a-b*c!==q.ans) return q; return setOpts(q,[[(a-b)*c,'N5-01'],[b*c,'F']],{q:`${a} − ${b} × ${c}의 값은?`}); });
T3('S3-66#1',q=>{ const m=_pl(q.visual).match(/(\d+)\s*÷\s*\((\d+)\s*×\s*(\d+)\)/); if(!m) return q; const [a,b,c]=m.slice(1).map(Number); return setOpts(q,[[a/b*c,'N5-09'],[b*c,'F']]); });
T3('S3-67#1',q=>{ const m=_pl(q.visual).match(/\((\d+)\s*\+\s*(\d+)\)\s*×\s*(\d+)\s*−\s*(\d+)/); if(!m) return q; const [a,b,c,d]=m.slice(1).map(Number); return setOpts(q,[[a+b*c-d,'N5-09'],[(a+b)*(c-d),null]]); });
T3('S3-68#1',q=>{ const n=+_nums(q)[0], A=+q.ans, sq=Number.isInteger(Math.sqrt(n)); return setOpts(q,[[A-2>0?A-2:null,'N5-10'],[sq?A+1:A-1,'F']]); });
T3('S3-70#0',q=>{ const m=_pl(q.visual).match(/(\d+)\s*×\s*(\d+)\s*=\s*(\d+)/); if(!m) return q; const [a,b,c]=m.slice(1).map(Number), w=(q.opts||[]).map(String).find(o=>/약수$/.test(o)); if(!w||a===b) return q;
  return setOpts(q,[[w,'N5-02'],[`${a}${_jo(a)} ${b}의 배수`,null]]); });
T3('S3-71#1',q=>{ const [a,b]=_nums(q).map(Number), g=_gcd(a,b), l=_lcm(a,b); if(g<2) return q; let one=null; for(let d=2;d<=a;d++) if(a%d===0&&b%d!==0){ one=d; break; } if(one==null) for(let d=2;d<=b;d++) if(b%d===0&&a%d!==0){ one=d; break; }
  q.q=_pl(q.q).replace('공약수가 아닌 것은?','공약수는?').trim(); q.ans=String(g); if(typeof q.ansText==='string') q.ansText=String(g); q.opts=[String(g),String(g+1),String(l)]; return setOpts(q,[[one,'N5-11'],[l,'N5-02']]); });
T3('S3-72#1',q=>{ const [a,b]=_nums(q).map(Number), g=_gcd(a,b), l=_lcm(a,b); if(String(q.ans)!==`${l}일 뒤`) return q; return setOpts(q,[[g>1?`${g}일 뒤`:null,'N5-02'],[`${a+b}일 뒤`,'N2-05'],[a*b!==l?`${a*b}일 뒤`:null,'N5-12'],[(2*Math.max(a,b))%Math.min(a,b)&&2*Math.max(a,b)!==l?`${2*Math.max(a,b)}일 뒤`:null,'N5-11']]); });
T3('S3-73#0',q=>{ const [a,b]=_nums(q).map(Number), g=_gcd(a,b), l=_lcm(a,b); if(String(q.ans)!==`${g}봉지`) return q; return setOpts(q,[[`${l}봉지`,'N5-02'],[`${a+b}봉지`,'N2-05'],[Math.min(a,b)!==g?`${Math.min(a,b)}봉지`:null,'N5-11'],[(d=>d?`${d}봉지`:null)([2,3,5].find(k=>k<g&&g%k===0)),'N5-12']]); });
T3('S3-73#1',q=>{ const [a,b]=_nums(q).map(Number), g=_gcd(a,b), l=_lcm(a,b); if(+q.ans!==l) return q; return setOpts(q,[[g>1?g:null,'N5-02'],[a*b!==l?a*b:null,'N5-12'],[a+b,'N2-05']]); });
T3('S3-74#2',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+)와/), n=String(q.ans).match(/^(\d+)분의 (\d+)$/); if(!m||!n) return q; const a=+m[1], b=+m[2], k=+n[1]/a; if(k<2||!Number.isInteger(k)) return q; return setOpts(q,[[`${a+k}분의 ${b+k}`,'N5-03'],[`${a}분의 ${b*k}`,'N5-13']]); });
T3('S3-75#1',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+)/); if(!m) return q; const D=+m[1], N=+m[2], g=_gcd(D,N); if(g<2) return q; let d=0; for(let k=2;k<g;k++) if(g%k===0){ d=k; break; }
  return setOpts(q,[[d?`${D/d}분의 ${N/d}`:`${D}분의 ${N}`,'N5-12'],[`${D}분의 ${N/g}`,'N5-13']]); });
T3('S3-76#1',q=>{ const [a,b]=_nums(q).map(Number), g=_gcd(a,b), A=+q.ans; if(A%a||A%b) return q; const one=[a,b].find(x=>x!==A&&(x%a||x%b)); return setOpts(q,[[a+b,'N2-05'],[g>1&&g!==A?g:null,'N5-02'],[one||null,'N5-11']]); });
T3('S3-78#1',q=>{ const m=_pl(q.q).match(/0\.(\d\d)를/); if(!m) return q; const x=+m[1]; return setOpts(q,[[`100분의 ${x}`,'N5-12'],[`10분의 ${x}`,'N3-28'],[`200분의 ${x}`,null]]); });
T3('S3-79#1',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+) \+ (\d+)분의 (\d+)/), n=String(q.ans).match(/(\d+)분의 (\d+)$/); if(!m||!n) return q; const [a,b,c,d]=m.slice(1).map(Number); return setOpts(q,[[`${a+c}분의 ${b+d}`,'N5-04'],[`${n[1]}분의 ${b+d}`,'N5-13']],{q:`${a}분의 ${b} + ${c}분의 ${d}의 값은?`}); });
T3('S3-81#1',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+) − (\d+)분의 (\d+)/), n=String(q.ans).match(/(\d+)분의 (\d+)$/); if(!m||!n) return q; const [a,b,c,d]=m.slice(1).map(Number); return setOpts(q,[[a-c>=2&&b-d>=1?`${a-c}분의 ${b-d}`:null,'N5-04'],[b!==d?`${n[1]}분의 ${Math.abs(b-d)}`:null,'N5-13']]); });
const rangeTag=q=>{ const t=_pl(q.q), m=t.match(/^([\d, ]+) 중 (\d+) (이상|이하|초과|미만)/); if(!m) return q; const xs=m[1].split(',').map(s=>+s.trim()), B=+m[2], has=xs.includes(B), A=+q.ans; if(!has) return q; const incl=/이상|이하/.test(m[3]);
  return setOpts(q,[[incl?A-1:A+1,incl?'N5-16':'N5-08'],[xs.length-A!==A&&xs.length-A!==(incl?A-1:A+1)?xs.length-A:null,null],[incl?A+1:A-1,null]]); };
T3('S3-83#0',rangeTag); T3('S3-84#1',rangeTag);
T3('S3-83#1',q=>tagOnly(q,o=>/이상|이하/.test(_pl(q.q))?'N5-16':'N5-08'));
T3('S3-84#2',q=>tagNum(q,(x,A)=>x===A+1?'N5-08':null));
T3('S3-85#1',q=>tagNum(q,(x,A)=>x===A-1?'N6-10':null));
T3('S3-86#1',q=>tagNum(q,(x,A)=>x===A+1?'N6-10':null));
T3('S3-87#1',q=>{ const n=+_nums(q)[0], A=+q.ans; if(Math.round(n/100)*100!==A) return q; const up=Math.ceil(n/100)*100, k=Math.round(n/1000)*1000; return setOpts(q,[[up!==A?up:Math.floor(n/100)*100,'N6-10'],[k!==A?k:null,'N5-14']]); });
['S3-88#0','S3-88#1','S3-88#2'].forEach(k=>T3(k,q=>tagOnly(q,o=>'N6-10')));
const fracNat=q=>{ const t=_pl(q.q), m=t.match(/(\d+)분의 (\d+) × (\d+)/)||(t.match(/(\d+) × (\d+)분의 (\d+)/)||[]).slice(0).map((v,i,r)=>i===0?v:[r[2],r[3],r[1]][i-1]); if(!m||m.length<4) return q; const a=+m[1], b=+m[2], k=+m[3];
  return setOpts(q,[[Math.random()<.5?`${a*k}분의 ${b*k}`:`${a*k}분의 ${b}`,'N5-15'],[`${a}분의 ${b+k}`,'N2-05'],[`${k}${'013678'.includes(String(k).slice(-1))?'과':'와'} ${a}분의 ${b}`,'N5-06']],{q:t.replace(/, 청이는.*$/,'의 값은?')}); };
T3('S3-89#1',fracNat); T3('S3-90#1',fracNat);
T3('S3-92#1',q=>tagOnly(q,o=>/[과와] \d+분의/.test(o)?'N5-06':null));
T3('S3-94#1',q=>tagOnly(q,o=>/크다/.test(o)?'N5-05':null));
T3('S3-106#1',q=>tagOnly(q,o=>/작다/.test(o)?'N6-01':null));
T3('S3-96#0',q=>tagNum(q,(x,A)=>x>A?'N5-07':null));
T3('S3-97#1',q=>{ const [a,b]=_nums(q); return tagOnly(q,o=>o===`${a}분의 ${b}`?'N3-01':null); });
T3('S3-102#1',q=>tagNum(q,(x,A)=>Math.abs(x-A*10)<1e-9?'N6-07':'N3-01'));
const dpTag=q=>tagNum(q,(x,A)=>x>A?'N3-08':x<A?'N6-07':null);
T3('S3-103#0',dpTag); T3('S3-103#2',dpTag); T3('S3-109#1',q=>{ dpTag(q); const m=_pl(q.visual).match(/([\d.]+)\s*÷\s*([\d.]+)/); if(m) q.q=`${m[1]} ÷ ${m[2]}의 몫은?`; return q; });
T3('S3-104#1',q=>{ const m=_pl(q.q).match(/(\d+)분의 (\d+) ÷ (\d+)분의 (\d+)/); if(!m||m[1]!==m[3]) return q; const a=+m[1], b=+m[2], c=+m[4]; if(String(q.ans)!==`${c}분의 ${b}`) return q; return setOpts(q,[[`${a*a}분의 ${b*c}`,'N6-11'],[`${b}분의 ${c}`,'N3-01']]); });
T3('S3-107#1',q=>{ const m=_pl(q.q).match(/(\d+분의 \d+) ÷ (\d+분의 \d+)/); if(!m) return q; const inv=f=>f.replace(/(\d+)분의 (\d+)/,'$2분의 $1');
  return setOpts(q,[[`${m[1]} × ${m[2]}`,'N6-11'],[`${inv(m[1])} × ${m[2]}`,'N6-02'],[`${inv(m[1])} × ${inv(m[2])}`,'N6-13']]); });
T3('S3-111#1',q=>tagOnly(q,o=>(o.split('.')[1]||'').length<(String(q.ans).split('.')[1]||'').length?'N5-14':'N6-10'));
T3('S3-112#1',q=>tagNum(q,(x,A)=>x>A?'N6-09':null));

B('S3-67', ['30 − (4 + 2) × 3을 계산하면?','12',[['72','N5-01'],['32','N5-09']]], ['40 − (3 + 5) × 2를 계산하면?','24',[['64','N5-01'],['47','N5-09']]], ['50 − (6 + 4) × 3을 계산하면?','20',[['120','N5-01'],['56','N5-09']]]);
B('S3-68', ['14 = 2 × 7을 보고 14의 약수를 모두 고르면?','1, 2, 7, 14',[['2, 7','N5-10'],['14, 28, 42','N5-02']]], ['15 = 3 × 5를 보고 15의 약수를 모두 고르면?','1, 3, 5, 15',[['3, 5','N5-10'],['15, 30, 45','N5-02']]], ['21 = 3 × 7을 보고 21의 약수를 모두 고르면?','1, 3, 7, 21',[['3, 7','N5-10'],['21, 42, 63','N5-02']]]);
B('S3-82', ['3과 4분의 1 − 1과 3분의 2를 계산하면?','1과 12분의 7',[['1과 12분의 5','N4-05'],['2와 12분의 5','N2-02'],['1과 12분의 11','N5-13']]], ['4와 3분의 1 − 2와 4분의 3을 계산하면?','1과 12분의 7',[['1과 12분의 5','N4-05'],['2와 12분의 5','N2-02'],['1과 12분의 10','N5-13']]], ['5와 5분의 1 − 2와 3분의 2를 계산하면?','2와 15분의 8',[['2와 15분의 3','N4-05'],['3과 15분의 7','N2-02'],['2와 15분의 14','N5-13']]]);
B('S3-94', ['6, 6 × 0.4, 6 × 1.2 중 가장 작은 것은?','6 × 0.4',[['6','N5-05'],['6 × 1.2',null]]], ['8, 8 × 0.5, 8 × 1.5 중 가장 작은 것은?','8 × 0.5',[['8','N5-05'],['8 × 1.5',null]]]);
B('S3-96', ['82 × 2 = 164예요. 0.82 × 0.2는?','0.164',[['1.64','N5-07'],['164','N3-08']]], ['43 × 3 = 129예요. 0.43 × 0.3은?','0.129',[['1.29','N5-07'],['129','N3-08']]], ['56 × 4 = 224예요. 0.56 × 0.4는?','0.224',[['2.24','N5-07'],['224','N3-08']]]);
B('S3-101', ['8.24 ÷ 4를 계산하면?','2.06',[['2.6','N6-08'],['20.6','N6-07']]], ['9.27 ÷ 3을 계산하면?','3.09',[['3.9','N6-08'],['30.9','N6-07']]], ['5.15 ÷ 5를 계산하면?','1.03',[['1.3','N6-08'],['10.3','N6-07']]]);
B('S3-104', ['9분의 8 ÷ 9분의 2를 계산하면?','4',[['9분의 4','N6-03'],['81분의 16','N6-11']]], ['7분의 6 ÷ 7분의 2를 계산하면?','3',[['7분의 3','N6-03'],['49분의 12','N6-11']]], ['11분의 9 ÷ 11분의 3을 계산하면?','3',[['11분의 3','N6-03'],['121분의 27','N6-11']]]);
B('S3-107', ['철사 5분의 3 m의 무게가 10분의 3 kg이에요. 철사 1 m의 무게는?','2분의 1 kg',[['2 kg','N6-06'],['50분의 9 kg','N6-12']]], ['호스 4분의 3 m의 무게가 8분의 3 kg이에요. 호스 1 m의 무게는?','2분의 1 kg',[['2 kg','N6-06'],['32분의 9 kg','N6-12']]]);
B('S3-110', ['페인트 1.6 L로 벽 0.8 m²를 칠했어요. 페인트 1 L로 칠할 수 있는 넓이는?','0.5 m²',[['2 m²','N6-06'],['1.28 m²','N6-12']]], ['페인트 2.4 L로 벽 0.6 m²를 칠했어요. 페인트 1 L로 칠할 수 있는 넓이는?','0.25 m²',[['4 m²','N6-06'],['1.44 m²','N6-12']]]);
B('S3-112', ['2.6 ÷ 0.4의 몫을 자연수까지 구하면 나머지는?','0.2',[['2','N6-09'],['0.5',null]]], ['3.5 ÷ 0.6의 몫을 자연수까지 구하면 나머지는?','0.5',[['5','N6-09'],['0.8',null]]]);

/* ---------- 3-13. 쓰기형(손글씨) 계산 문제: 식에서 '오개념이면 쓰는 답'을 계산해 예상 오답으로 달아 둔다 ---------- */
/* 나머지가 있는 나눗셈(답 = 몫과 나머지를 이어 쓴 숫자열): 풀이 글 'a ÷ b = Q … R'에서 읽는다 */
function codeWR(q){ const x=String(q.ansText||'').replace(/,/g,'').match(/^(\d+) ÷ (\d+) = (\d+) … (\d+)$/); if(!x) return q; const a=+x[1], b=+x[2], Q=+x[3], R=+x[4], A=String(q.ans); if(A!==`${Q}${R}`||Q*b+R!==a) return q;
  const mis={}, add=(k,c)=>{ k=String(k); if(k!==A&&!(k in mis)) mis[k]=c; }; if(Q>=1) add(`${Q-1}${R+b}`,'N3-02'); if(a>b) add(`${a-b}`,'N3-11'); if(Object.keys(mis).length) q.mis=mis; return q; }
function codeW(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans); if(!/^\d+(\.\d+)?$/.test(A)) return q;
  const t0=(_pl(q.visual)+' | '+_pl(q.q)).replace(/,/g,''); if(/[()]/.test(t0.split('|')[0])||/분의/.test(t0)) return q;   /* 분수식·괄호식은 읽지 않는다 */
  let m=null; { const RE=/(\d+(?:\.\d+)?)\s*([+−×÷])\s*(\d+(?:\.\d+)?)(?!\s*[+−×÷\d(])/, fit=x=>{ const a=+x[1], b=+x[3], v=x[2]==='+'?a+b:x[2]==='−'?a-b:x[2]==='×'?a*b:a/b; return Math.abs(v-+A)<1e-9; };
    for(const src of [_pl(q.q), String(q.ansText||'').split('=')[0], _pl(q.visual)]){ const u=String(src).replace(/,/g,''), x=u.match(RE); if(x&&!/[+−×÷]/.test(u.slice(0,x.index))&&fit(x)){ m=x; break; } } }
  if(!m) return codeWR(q);   /* 맞는 식이 없으면 나머지가 있는 나눗셈인지 본다 */
  const as=m[1], op=m[2], bs=m[3], a=+as, b=+bs, mis={}, clash=new Set(), add=(v,c)=>{ if(v==null) return; const s=String(v); if(s===A||/NaN|-|e/.test(s)) return; if(s in mis){ if(mis[s]!==c) clash.add(s); return; } mis[s]=c; }, dec=as.includes('.')||bs.includes('.');
  const eq=(x,y)=>Math.abs(x-y)<1e-9;
  if(!dec){
    if(op==='+'&&a+b===+A){ const L=Math.max(as.length,bs.length), x=dg(as.padStart(L,'0')), y=dg(bs.padStart(L,'0')), s=x.map((d,i)=>d+y[i]); if(s.some(v=>v>9)){ add(+s.map(v=>v%10).join(''),'N2-01'); add(+s.join(''),'N2-07'); } }
    else if(op==='−'&&a-b===+A&&a>=10){ const x=dg(as), y=dg(bs.padStart(as.length,'0')); if(x.some((d,i)=>d<y[i])){ add(+x.map((d,i)=>Math.abs(d-y[i])).join(''),'N2-02'); add(+x.map((d,i)=>d<y[i]?d+10-y[i]:d-y[i]).join(''),'N2-08');
        if(x.length===3&&x[1]===0&&x[2]<y[2]) add(+`${x[0]-1-y[0]}${10-y[1]}${x[2]+10-y[2]}`,'N2-04'); } }
    else if(op==='×'&&a*b===+A){ add(a+b,'N2-05');
      if(b<10&&a>=10&&a<100){ const T=Math.floor(a/10), o=a%10, c=Math.floor(o*b/10); if(c){ add(T*b*10+o*b%10,'N3-14'); add((T+c)*b*10+o*b%10,'N3-21'); } }
      else if(b<10&&a>=100&&a<1000){ const ds=dg(as), ps=ds.map(d=>d*b); if(ps.slice(1).some(v=>v>9)){ let v=0; ps.forEach((p,i)=>{ v=v*10+(i===0?p:p%10); }); add(v,'N3-14'); } }   /* 세 자리 × 한 자리: 올림한 수를 더하지 않음 */
      else if(a%10===0&&b%10===0&&a<100&&b<100) add(a*b/10,'N3-33');
      else if(a%10===0&&b<10&&a<100) add(a/10*b,'N3-12');
      else if(b>=10&&b<100&&a>=10) add(a*(b%10)+a*Math.floor(b/10),'N3-03'); }
    else if(op==='÷'&&eq(a/b,+A)){ add(a-b,'N3-11'); if(/^[1-9]0+[1-9]$|^[1-9]\d*0[1-9]$/.test(A)){ add(+A.replace(/0/g,''),'N3-04'); add(+(A.replace(/0/g,'')+'0'),'N3-34'); } } }
  else { const da=(as.split('.')[1]||'').length, db=(bs.split('.')[1]||'').length, ia=+as.replace('.',''), ib=+bs.replace('.',''), fx=(v,d)=>String(+(v/10**d).toFixed(d));
    if(op==='+'&&eq(a+b,+A)){ if(da!==db) add(fx(ia+ib,Math.max(da,db)),'N4-03'); const fa=+(as.split('.')[1]||0), fb=+(bs.split('.')[1]||0); if(da===db&&da===1&&fa+fb>=10){ add(`${Math.floor(a)+Math.floor(b)}.${fa+fb}`,'N3-08'); add(`${Math.floor(a)+Math.floor(b)}.${(fa+fb)%10}`,'N2-01'); } }
    else if(op==='−'&&eq(a-b,+A)){ if(da!==db&&ia>ib) add(fx(ia-ib,Math.max(da,db)),'N4-03'); }
    else if(op==='×'&&eq(a*b,+A)){ add(String(ia*ib),'N3-08'); if(da&&db) add(fx(ia*ib,Math.max(da,db)),'N5-07'); }
    else if(op==='÷'&&eq(a/b,+A)&&db===0){ add(String(+(ia/b).toFixed(6)),'N3-08'); add(String(+(+A/10).toFixed(6)),'N6-07'); if(/^\d+\.0\d+$/.test(A)) add(A.replace('.0','.'),'N6-08'); } }
  clash.forEach(k=>delete mis[k]);                                // 서로 다른 오개념이 같은 답을 내면 어느 쪽인지 알 수 없으므로 코드를 달지 않는다
  if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 2: 식이 드러나지 않는 문제(도형 공식, 평균, 백분율, 비례식, 문장제)에서 아이들이 흔히 내는 값을 계산해 코드를 단다. 수의 역할은 정답이 나오는 배치를 찾아 정한다. */
const _perm=a=>a.length<=1?[a]:a.flatMap((x,i)=>_perm([...a.slice(0,i),...a.slice(i+1)]).map(r=>[x,...r]));
function codeW2(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q; const Av=+A;
  const Q=_pl(q.q), t=(Q+' | '+_pl(q.visual)).replace(/,/g,''), mis={}, clash=new Set(); let ns=(t.match(/\d+(?:\.\d+)?/g)||[]).map(Number);
  if(!ns.length&&/<svg/.test(String(q.visual))) ns=(String(q.visual).replace(/<[^>]+>/g,' ').match(/\d+(?:\.\d+)?(?=\s*(?:cm|mm|km|m)(?![²³a-z]))/g)||[]).map(Number);   /* 치수가 도형 그림 안에만 있을 때: 길이 단위가 붙은 수만 읽는다 */
  const add=(v,c)=>{ if(v==null||!Number.isFinite(v)||v<=0||!Number.isInteger(v)) return; const k=String(v); if(k===A) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; };
  const find=(n,f)=>{ if(ns.length<n||ns.length>n+1) return null; for(const pm of _perm(ns.slice(0,4))){ const x=pm.slice(0,n); if(Math.abs(f(...x)-Av)<1e-9) return x; } return null; }; let x;
  if(/사다리꼴/.test(Q)&&/넓이/.test(Q)){ if((x=find(3,(a,b,h)=>(a+b)*h/2))){ add((x[0]+x[1])*x[2],'G5-03'); add(x[0]*x[1]*x[2]/2,'G5-12'); } }
  else if(/삼각형|마름모/.test(Q)&&/넓이는/.test(Q)){ if((x=find(2,(a,b)=>a*b/2))) add(x[0]*x[1],'G5-03'); }
  else if(/직사각형|평행사변형/.test(Q)&&/넓이는/.test(Q)){ if(ns.length===2&&ns[0]*ns[1]===Av){ add(2*(ns[0]+ns[1]),'G5-01'); add(ns[0]+ns[1],'G5-01'); } }
  else if(/정사각형/.test(Q)&&/넓이는/.test(Q)){ if(ns.length===1&&ns[0]*ns[0]===Av) add(4*ns[0],'G5-01'); }
  else if(/직사각형/.test(Q)&&/둘레/.test(Q)){ if(ns.length===2&&2*(ns[0]+ns[1])===Av) add(ns[0]*ns[1],'G5-01'); }
  else if(/정사각형/.test(Q)&&/둘레/.test(Q)){ if(ns.length===1&&4*ns[0]===Av) add(ns[0]*ns[0],'G5-01'); }
  else if(/직육면체/.test(Q)&&/부피는/.test(Q)){ if(ns.length===3&&ns[0]*ns[1]*ns[2]===Av) add(2*(ns[0]*ns[1]+ns[1]*ns[2]+ns[2]*ns[0]),'G6-05'); }
  else if(/정육면체/.test(Q)&&/부피는/.test(Q)){ if(ns.length===1&&ns[0]**3===Av) add(6*ns[0]*ns[0],'G6-05'); }
  else if(/직육면체/.test(Q)&&/겉넓이/.test(Q)){ if(ns.length===3&&2*(ns[0]*ns[1]+ns[1]*ns[2]+ns[2]*ns[0])===Av){ add(ns[0]*ns[1]*ns[2],'G6-05'); add(ns[0]*ns[1]+ns[1]*ns[2]+ns[2]*ns[0],'G6-06'); } }
  else if(/정육면체/.test(Q)&&/겉넓이/.test(Q)){ if(ns.length===1&&6*ns[0]*ns[0]===Av){ add(ns[0]**3,'G6-05'); add(ns[0]*ns[0],'G6-06'); } }
  else if(/평균은\?|평균 몇/.test(Q)){ const m=(Q.match(/\d+/g)||[]).map(Number), v=/평균은\?/.test(Q)?m:m.slice(1); if(v.length>=3&&Math.abs(v.reduce((a,b)=>a+b,0)/v.length-Av)<1e-9){ add(v.reduce((a,b)=>a+b,0),'D5-04'); add((Math.max(...v)+Math.min(...v))/2,'D5-02'); } }
  else if(/삼각형/.test(Q)&&/나머지 한 각/.test(Q)){ if(ns.length===2&&180-ns[0]-ns[1]===Av) add(360-ns[0]-ns[1],'G4-12'); }
  else if(/사각형/.test(Q)&&/나머지 한 각/.test(Q)){ if(ns.length===3&&360-ns[0]-ns[1]-ns[2]===Av) add(180-ns[0]-ns[1]-ns[2],'G4-12'); }
  else if(/이등변삼각형/.test(Q)&&/꼭지각/.test(Q)&&/밑각은/.test(Q)){ if(ns.length===1&&(180-ns[0])/2===Av) add(180-ns[0],'G4-18'); }
  else if(/직육면체/.test(Q)&&/모서리 길이의 합/.test(Q)){ if(ns.length===3&&4*(ns[0]+ns[1]+ns[2])===Av){ add(ns[0]+ns[1]+ns[2],'G5-13'); add(2*(ns[0]+ns[1]+ns[2]),'G5-13'); } }
  else if(/m²는 몇 cm²/.test(Q)){ if(ns.length===1&&ns[0]*10000===Av){ add(ns[0]*100,'G5-04'); } }
  else if(/지름이 \d+ (cm|m)인 원의 반지름/.test(Q)){ if(ns.length===1&&ns[0]/2===Av){ add(ns[0]*2,'G3-04'); add(ns[0],'G3-04'); } }
  else if(/반지름이 \d+ (cm|m)인 (원|구)의 지름/.test(Q)){ if(ns.length>=1&&ns[0]*2===Av){ add(ns[0],'G3-04'); if(ns[0]%2===0) add(ns[0]/2,'G3-04'); } }
  else if(/명 중 \d+명은 몇 %/.test(Q)){ if(ns.length===2&&ns[1]/ns[0]*100===Av) add(ns[1],'D6-01'); }
  else if(/% 할인하면 얼마/.test(Q)){ if(ns.length===2&&ns[0]*(100-ns[1])/100===Av) add(ns[0]*ns[1]/100,'R6-07'); }
  else if(/^\s*\d+ : \d+ = \d+ : □/.test(Q)){ const m=Q.match(/\d+/g).map(Number); if(m[1]*m[2]/m[0]===Av) add(m[1]*m[2],'R6-15'); }
  else if(/생활 속 문제/.test(t)){ const m=(Q.match(/\d+/g)||[]).map(Number); if(m.length===2){ const [a,b]=m; if(a*b===Av&&a>1&&b>1) add(a+b,'N2-05'); else if(b&&a/b===Av&&b>1) add(a-b,'N3-11'); } }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 3: 분수의 덧셈·뺄셈(칸에 쓴 숫자를 이어 붙인 답)과 단위 환산. 정답을 같은 방식으로 다시 만들어 맞을 때만 오답 값을 단다. */
function codeW3(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans), Q=_pl(q.q), V=_pl(q.visual), mis={}, clash=new Set();
  const add=(k,c)=>{ k=String(k); if(k===A||/-|NaN|\./.test(k)) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; }; let m;
  const fr=[...Q.matchAll(/(?:(\d+)[과와] )?(\d+)분의 (\d+)/g)].map(x=>({w:+(x[1]||0),d:+x[2],n:+x[3]})), op=/\+/.test(Q)?1:/−/.test(Q)?-1:0;
  if(fr.length===2&&op&&!/생활 속 문제/.test(V)&&!/^\s*1 −/.test(Q)){ const [x,y]=fr, g=(a,b)=>b?g(b,a%b):a, L=x.d*y.d/g(x.d,y.d), X=x.n*L/x.d, Y=y.n*L/y.d, given=(V.match(/=\s*(\d+)\s*$/)||[])[1];
    if(!x.w&&!y.w&&!given&&x.d!==y.d){ const N=X+op*Y, k=g(N,L); if(N>0&&N<L&&A===`${N/k}${L/k}`){ add(`${x.n+op*y.n}${Math.abs(x.d+op*y.d)}`,'N5-04'); if(k>1) add(`${N}${L}`,'N5-12'); if(x.n+op*y.n>0) add(`${x.n+op*y.n}${L}`,'N5-13'); } }
    else if(x.w&&y.w&&given&&+given===L){ const W=x.w+op*y.w;
      if(op>0&&X+Y<L&&A===`${W}${X+Y}`){ if(x.d!==y.d) add(`${W}${x.n+y.n}`,'N5-13'); }
      else if(op<0&&X>Y&&A===`${W}${X-Y}`){ if(x.d!==y.d&&x.n>y.n) add(`${W}${x.n-y.n}`,'N5-13'); }
      else if(op<0&&X<Y&&A===`${W-1}${L+X-Y}`){ add(`${W}${Y-X}`,'N2-02'); if(L!==10) add(`${W-1}${10+X-Y}`,'N4-05'); } } }
  else if((m=Q.match(/^(\d+) ?(시간|분) (\d+) ?(분|초)[은는] 몇 (분|초)\?/))){ if(A===String(60*m[1]+ +m[3])) add(100*m[1]+ +m[3],'G2-03'); }
  else if((m=Q.match(/^(\d+) ?(분|초)[은는] 몇 (시간|분) 몇 (분|초)\?/))){ const x=+m[1]; if(x>=100&&A===`${Math.floor(x/60)}${x%60}`) add(`${Math.floor(x/100)}${x%100}`,'G2-03'); }
  else if((m=Q.match(/^(\d+) (km|kg|L|cm) (\d+) (m|g|mL|mm)[은는] 몇 (m|g|mL|mm)\?/))){ const K=m[2]==='cm'?10:1000; if(A===String(K*m[1]+ +m[3])) add(100*m[1]+ +m[3],'G3-05'); }
  else if((m=Q.match(/^(\d+) t[은는] 몇 kg\?/))){ if(A===String(1000*m[1])) add(100*m[1],'G3-05'); }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 4: 소수 계산·소수 문장제(답은 소수점을 뺀 숫자열), 분수끼리의 곱셈·나눗셈. 소수점은 칸에 미리 찍혀 있어 자리만 틀린 답은 가릴 수 없고, 숫자가 달라지는 오답만 단다. */
function codeW4(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans), Q=_pl(q.q), V=_pl(q.visual), mis={}, clash=new Set(), eq=(x,y)=>Math.abs(x-y)<1e-9;
  const dig=v=>String(+(+v).toFixed(6)).replace('.',''), add=(v,c)=>{ if(v==null||!Number.isFinite(+v)||+v<0) return; const k=typeof v==='string'?v:dig(v); if(k===A||!/^\d+$/.test(k)) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; };
  const fr=[...Q.matchAll(/(?:(\d+)[과와] )?(\d+)분의 (\d+)/g)].map(x=>({w:+(x[1]||0),d:+x[2],n:+x[3]})), g=(a,b)=>b?g(b,a%b):a, red=(n,d)=>{ const k=g(n,d); return `${n/k}${d/k}`; };
  if(fr.length===2&&!fr[0].w&&!fr[1].w&&/[×÷]/.test(Q)&&!/생활 속 문제/.test(V)){ const [x,y]=fr;
    if(/÷/.test(Q)){ const n=x.n*y.d, d=x.d*y.n; if(n<d&&A===red(n,d)) add(red(x.n*y.n,x.d*y.d),'N6-11'); }
    else { const n=x.n*y.n, d=x.d*y.d; if(A===red(n,d)&&x.n*y.d<x.d*y.n) add(red(x.n*y.d,x.d*y.n),'N5-18'); } }
  else if(/\d\.\d/.test(Q+V)&&q.ansText){ const at=String(q.ansText).match(/^\s*(\d+(?:\.\d+)?)/); if(!at||at[1].replace('.','')!==A) return q; const R=+at[1];
    const word=/생활 속 문제/.test(V); let src=word?Q:(V.split('=')[0]||''), m=(src.replace(/,/g,'').match(/\d+(?:\.\d+)?/g)||[]); if(m.length!==2&&!word){ src=Q; m=(src.replace(/,/g,'').match(/\d+(?:\.\d+)?/g)||[]); }   /* 세로셈 그림은 숫자가 칸마다 떨어져 있으므로 문제 글의 식을 읽는다 */
    if(word&&m.length===3&&m[0]==='1'&&/^1 (m|L|kg|개|분|시간)/.test(Q)) m=m.slice(1);   /* '1 m의 무게가 …'의 1은 식의 수가 아니다 */
    if(m.length!==2) return q; const as=m[0], bs=m[1], a=+as, b=+bs;
    const fits={'+':eq(a+b,R),'−':eq(a-b,R),'×':eq(a*b,R),'÷':!!b&&eq(a/b,R)}, sg=(src.match(/[+−×÷]/g)||[]), cand=Object.keys(fits).filter(k=>fits[k]); const op=word?(cand.length===1?cand[0]:null):(sg.length===1&&fits[sg[0]]?sg[0]:null); if(!op) return q;
    const da=(as.split('.')[1]||'').length, db=(bs.split('.')[1]||'').length, ia=+as.replace('.',''), ib=+bs.replace('.',''), D=Math.max(da,db);
    if(op==='+'){ if(da!==db) add((ia+ib)/10**D,'N4-03'); else if(da===1){ const fa=ia%10, fb=ib%10; if(fa+fb>=10){ add(`${Math.floor(a)+Math.floor(b)}${fa+fb}`,'N3-08'); add(`${Math.floor(a)+Math.floor(b)}${(fa+fb)%10}`,'N2-01'); } } }
    else if(op==='−'){ if(da!==db&&ia!==ib) add(Math.abs(ia-ib)/10**D,'N4-03'); }
    else if(op==='×'){ if(word){ add(a+b,'N2-05'); if(b&&b<1) add(a/b,'N6-06'); }
      else if(da&&!db&&b<10&&ia>=10&&ia<100){ const T=Math.floor(ia/10), o=ia%10, c=Math.floor(o*b/10); if(c){ add((T*b*10+o*b%10)/10**da,'N3-14'); add(((T+c)*b*10+o*b%10)/10**da,'N3-21'); } } }
    else if(op==='÷'){ if(word){ add(a*b,'N6-12'); if(a>b) add(a-b,'N3-11'); } else { if(R<1) add(String(+(R*10).toFixed(6)).replace('.',''),'N6-07'); else if(db) add(R/10,'N6-07'); if(db) add(a*b,'N6-12'); if(!db&&/^\d+\.0\d+$/.test(at[1])) add(at[1].replace('.0','.').replace('.',''),'N6-08'); } } }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 5: 분수와 자연수의 곱셈·나눗셈, 원주와 원의 넓이. */
function codeW5(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans), Q=_pl(q.q), V=_pl(q.visual), mis={}, clash=new Set();
  const add=(k,c)=>{ k=String(k); if(k===A||!/^\d+$/.test(k)) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; }, dig=v=>String(+(+v).toFixed(6)).replace('.',''); let m;
  if(/생활 속 문제/.test(V)&&!/원주율/.test(Q)){ return q; }
  if((m=Q.match(/^(\d+)[과와] (\d+)분의 (\d+) × (\d+)$/))){ const [w,d,n,k]=m.slice(1).map(Number), N=n*k; if(N<d&&A===`${w*k}${N}`) add(`${w*k}${n}`,'N5-06'); }
  else if((m=Q.match(/^(\d+)분의 (\d+) × (\d+)$/))){ const [d,n,k]=m.slice(1).map(Number), N=n*k; if(N>d&&N%d&&A===`${Math.floor(N/d)}${N%d}`) add(String(N),'N4-26'); }
  else if((m=Q.match(/^(\d+)분의 (\d+) ÷ (\d+)$/))){ const [d,n,k]=m.slice(1).map(Number); if(n%k===0&&A===String(n/k)&&/=\s*\d+\s*$/.test(V)) add(String(n*k),'N6-04'); }
  else if((m=Q.match(/^지름이 (\d+) cm인 원의 원주는\?/))){ const d=+m[1]; if(A===dig(d*3.14)){ add(dig(d/2*3.14),'G3-04'); add(dig(d/2*d/2*3.14),'G6-12'); add(dig(d*2*3.14),'G3-04'); } }
  else if((m=Q.match(/^반지름이 (\d+) (?:cm|m)인 .*넓이는/))){ const r=+m[1]; if(A===dig(r*r*3.14)){ add(dig(r*3.14),'G6-18'); add(dig(2*r*3.14),'G6-12'); add(dig(2*r*2*r*3.14),'G3-04'); } }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 6: 혼합 계산(연산이 둘 이상인 자연수 식). 앞에서부터만 계산한 값(N5-01), 괄호를 무시한 값(N5-09)을 단다. */
function codeW6(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q; const Q=_pl(q.q).replace(/,/g,'').trim();
  if(!/^[\d\s+−×÷()]+$/.test(Q)||(Q.match(/[+−×÷]/g)||[]).length<2) return q; const tk=Q.match(/\d+|[+−×÷()]/g), ap=(x,o,y)=>o==='+'?x+y:o==='−'?x-y:o==='×'?x*y:x/y;
  const ev=(t)=>{ let i=0; const prim=()=>{ if(t[i]==='('){ i++; const v=sum(); i++; return v; } return +t[i++]; }, term=()=>{ let v=prim(); while(t[i]==='×'||t[i]==='÷') { const o=t[i++]; v=ap(v,o,prim()); } return v; }, sum=()=>{ let v=term(); while(t[i]==='+'||t[i]==='−'){ const o=t[i++]; v=ap(v,o,term()); } return v; }; return sum(); };
  const ltr=(t)=>{ const f=t.filter(x=>x!=='('&&x!==')'); let v=+f[0]; for(let i=1;i<f.length;i+=2) v=ap(v,f[i],+f[i+1]); return v; };
  if(String(ev(tk))!==A) return q; const mis={}, ok=v=>Number.isInteger(v)&&v>=0&&String(v)!==A; const np=tk.filter(x=>x!=='('&&x!==')'), hasP=tk.includes('(');
  if(hasP){ const v=ev(np); if(ok(v)) mis[String(v)]='N5-09'; const w=ltr(tk); if(ok(w)&&!(String(w) in mis)) mis[String(w)]='N5-01'; } else { const w=ltr(tk); if(ok(w)) mis[String(w)]='N5-01'; }
  if(!hasP&&np.length===5&&((np[1]==='−'&&np[3]==='+')||(np[1]==='÷'&&np[3]==='×'))){ const v=ap(+np[0],np[1],ap(+np[2],np[3],+np[4])); if(ok(v)&&!(String(v) in mis)) mis[String(v)]='N5-09'; }   /* 같은 단계인데 뒤부터 계산 */
  if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 7: 답이 분수(칸 = [자연수] 분자 분모 순)인 계산·문장제. 풀이 글의 분수가 실제 계산값과 같을 때만 단다.
   연산은 기호나 문장제의 말(모두·남은·번 주면·의 …만큼·똑같이 나누어·몇 배)에서 읽는다. 오답은 약분 전 꼴과 약분한 꼴을 모두 단다. */
function codeW7(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans), Q=_pl(q.q), R=String(q.ansText||'').trim().match(/^(?:(\d+)[과와] )?(\d+)분의 (\d+)$/); if(!R) return q;
  const rw=+(R[1]||0), rd=+R[2], rn=+R[3]; if(A!==`${rw||''}${rn}${rd}`) return q; const g=(a,b)=>b?g(b,a%b):a, mis={}, clash=new Set();
  const key=(n,d,w)=>{ if(!(n>0&&d>1)||n===d||!Number.isInteger(n)||!Number.isInteger(d)) return null; return `${w||''}${n}${d}`; };
  const add=(n,d,c,w)=>{ for(const [N,D] of [[n,d],[n/g(n,d),d/g(n,d)]]){ const k=key(N,D,w); if(!k||k===A) continue; if(k in mis){ if(mis[k]!==c) clash.add(k); continue; } mis[k]=c; } };
  const fr=[...Q.matchAll(/(?:(\d+)[과와] )?(\d+)분의 (\d+)/g)].map(x=>({w:+(x[1]||0),d:+x[2],n:+x[3]})), same=(n,d)=>n*rd===(rw*rd+rn)*d;   /* n/d가 정답과 같은 값인가 */
  const op=/\+/.test(Q)||/모두 몇/.test(Q)&&fr.length===2?'+':/−/.test(Q)||/남은/.test(Q)?'−':/×/.test(Q)||/번 주면|만큼/.test(Q)?'×':/÷/.test(Q)||/똑같이 나누어|몇 배/.test(Q)?'÷':'';
  if(fr.length===2&&(op==='+'||op==='−')){ const [x,y]=fr, sg=op==='+'?1:-1, L=x.d*y.d/g(x.d,y.d), X=(x.w*x.d+x.n)*(L/x.d), Y=(y.w*y.d+y.n)*(L/y.d); if(!same(X+sg*Y,L)) return q;
    if(!x.w&&!y.w){ if(x.d===y.d){ if(sg>0) add(x.n+y.n,x.d+y.d,'N4-04'); } else { add(x.n+sg*y.n,Math.abs(x.d+sg*y.d),'N5-04'); add(x.n+sg*y.n,L,'N5-13'); } }
    else if(x.w&&y.w&&x.d===y.d){ const W=x.w+sg*y.w, d=x.d; if(sg>0&&x.n+y.n>=d){ const k=`${W}${x.n+y.n}${d}`; if(k!==A) mis[k]='N4-26'; } else if(sg<0&&x.n<y.n){ const k=`${W}${y.n-x.n}${d}`; if(k!==A) mis[k]='N2-02'; if(d!==10){ const k2=`${W-1}${10+x.n-y.n}${d}`; if(k2!==A&&!(k2 in mis)) mis[k2]='N4-05'; } } }
    else if(x.w&&y.w){ const W=x.w+sg*y.w; if(x.n+sg*y.n>0&&Math.abs(x.d+sg*y.d)>0){ const k=`${W}${x.n+sg*y.n}${Math.abs(x.d+sg*y.d)}`; if(k!==A) mis[k]='N5-04'; } } }
  else if(fr.length===2&&op==='×'&&!fr[0].w&&!fr[1].w){ const [x,y]=fr; if(!same(x.n*y.n,x.d*y.d)) return q; add(x.n*y.d,x.d*y.n,'N5-18'); add(x.n+y.n,x.d+y.d,'N5-04'); }
  else if(fr.length===2&&op==='÷'&&!fr[0].w&&!fr[1].w){ const [x,y]=fr; if(!same(x.n*y.d,x.d*y.n)) return q; add(x.n*y.n,x.d*y.d,'N6-11'); add(x.d*y.n,x.n*y.d,'N6-02'); }
  else if(fr.length===1&&!fr[0].w&&(op==='×'||op==='÷')){ const x=fr[0], ks=(Q.replace(/(\d+)분의 (\d+)/,' ').match(/\d+/g)||[]).map(Number).filter(v=>v>1); if(ks.length!==1) return q; const k=ks[0];
    if(op==='×'){ if(!same(x.n*k,x.d)) return q; add(x.n,x.d*k,'N5-15'); add(x.n*k,x.d*k,'N5-15'); } else { if(!same(x.n,x.d*k)) return q; add(x.n*k,x.d,'N6-04'); if(x.n%k===0&&x.d%k===0) add(x.n/k,x.d/k,'N6-14'); } }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
/* 쓰기형 8: 비율을 소수로(a : b → a ÷ b). 기준량과 비교하는 양을 바꿔 b ÷ a를 쓴 답(R6-01). 열쇠는 정답과 같은 소수 자릿수로 맞춘 숫자열. */
function codeW8(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const m=_pl(q.q).match(/^\s*(\d+) : (\d+)의 비율을 소수로\?/); if(!m) return q; const a=+m[1], b=+m[2], A=String(q.ans), t=(String(q.ansText||'').match(/([\d.]+)\s*$/)||[])[1]; if(!t||Math.abs(a/b-+t)>1e-9) return q;
  const dec=(t.split('.')[1]||'').length, w=b/a*Math.pow(10,dec); if(Number.isInteger(w)){ const k=String(w).padStart(A.length,'0'); if(k!==A) q.mis={[k]:'R6-01'}; } return q; }
/* 쓰기형 9: 변화와 관계·자료와 가능성의 자연수 답(비례배분·비례식·단위량·백분율·할인·평균·등식의 □). 문제 글의 수로 정답을 다시 계산해 맞을 때만 단다. */
function codeW9(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q; const Av=+A, Q=_pl(q.q).replace(/,/g,'').replace(/\s+/g,' ').trim(), mis={}, clash=new Set(); let m;
  const add=(v,c)=>{ if(v==null||!Number.isFinite(v)||v<0||!Number.isInteger(v)) return; const k=String(v); if(k===A) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; };
  if((m=Q.match(/(\d+)(?:개|원)?[을를] (\d+) : (\d+)(?:으로|로) 나[누눈]/))){ const N=+m[1], a=+m[2], b=+m[3], pa=N*a/(a+b), pb=N*b/(a+b); if(Av===pa||Av===pb){ const mine=Av===pa?a:b, oth=Av===pa?pb:pa; add(oth,'R6-01'); if(N/mine!==oth) add(N/mine,'R6-13'); if(N/(a+b)!==oth&&N/(a+b)!==N/mine) add(N/(a+b),'R6-16'); } }
  else if((m=Q.match(/^(\d+) : (\d+) = (\d+) : □/))){ const [a,b,c]=m.slice(1).map(Number); if(b*c/a===Av){ add(b*c,'R6-15'); add(c+(b-a),'R6-10'); add(a*c/b,'R6-12'); } }
  else if((m=Q.match(/^(\d+) : (\d+) = □ : (\d+)/))){ const [a,b,d]=m.slice(1).map(Number); if(a*d/b===Av){ add(a*d,'R6-15'); add(d-(b-a),'R6-10'); add(b*d/a,'R6-12'); } }
  else if((m=Q.match(/(\d+) ?(?:m|분|개|L|kg|시간)[가이에] (\d+) ?(?:원|L|km|개|g|kg)(?:이면|가 나오는[^.]*에서|를 [^.]*면)? (\d+) ?(?:m|분|개|L|kg|시간)/))&&+m[1]>1&&+m[2]*+m[3]/+m[1]===Av){ const [a,P,y]=m.slice(1).map(Number); add(P+(y-a),'R6-10'); add(P*y,'R6-15'); }
  else if((m=Q.match(/(\d+) ?(시간|km²)에 (\d+) ?(km|명)[을를이가] .*1 ?(시간|km²)에 몇/))&&+m[3]/+m[1]===Av){ add(+m[3]*+m[1],'N6-12'); add(+m[3]-+m[1],'R6-02'); }
  else if((m=Q.match(/(\d+)명 중 (\d+)명은 몇 %/))&&+m[2]/+m[1]*100===Av){ add(+m[2],'D6-01'); add(+m[1]-+m[2],'R6-02'); }
  else if((m=Q.match(/전체 (\d+)명 중 (\d+)%는 몇 명/))&&+m[1]*+m[2]/100===Av){ add(+m[1]*+m[2],'R6-04'); add(+m[2],'D6-01'); }
  else if((m=Q.match(/(\d+)원짜리[^%]*?(\d+)% 할인/))&&+m[1]*(100-+m[2])/100===Av){ add(+m[1]*+m[2]/100,'R6-07'); add(+m[1]-+m[2],'R6-07'); }
  else if((m=Q.match(/(\d+)명의 평균이 (\d+)점이면 점수의 합/))&&+m[1]*+m[2]===Av){ add(+m[1]+ +m[2],'N2-05'); }
  else if((m=Q.match(/(\d+|세|네|다섯) 번 본 시험의 평균이 (\d+)점.*?점수가 (.+?)이면 나머지/))){ const n={세:3,네:4,다섯:5}[m[1]]||+m[1], avg=+m[2], v=(m[3].match(/\d+/g)||[]).map(Number), sum=v.reduce((a,b)=>a+b,0); if(v.length===n-1&&n*avg-sum===Av){ add(n*avg,'D5-04'); add(Math.round(sum/v.length)===sum/v.length?sum/v.length:null,'D5-02'); } }
  else if((m=Q.match(/(\d+)회 평균이 (\d+)점이에요\. ([\d ]+)점 다음 마지막/))){ const n=+m[1], avg=+m[2], v=(m[3].match(/\d+/g)||[]).map(Number), sum=v.reduce((a,b)=>a+b,0); if(v.length===n-1&&n*avg-sum===Av){ add(n*avg,'D5-04'); add(avg,'D5-02'); } }
  else if(/고르게 하면/.test(Q)){ const all=(Q.split('고르게')[0].match(/\d+/g)||[]).map(Number); for(const v of [all,all.slice(1)]){ if(v.length>=3&&v.reduce((a,b)=>a+b,0)/v.length===Av){ add(v.reduce((a,b)=>a+b,0),'D5-04'); add((Math.max(...v)+Math.min(...v))/2,'D5-02'); break; } } }
  else if((m=Q.match(/^(\d+) ([+−×]) (\d+) = □ ([+−×]) (\d+)/))||(m=Q.match(/^(\d+) ([+−×]) (\d+) = (\d+) ([+−×]) □/))){ const ap=(x,o,y)=>o==='+'?x+y:o==='−'?x-y:x*y, L=ap(+m[1],m[2],+m[3]), front=/= □/.test(Q), c=front?+m[5]:+m[4], o=front?m[4]:m[5]; const ok=front?ap(Av,o,c)===L:ap(c,o,Av)===L; if(ok){ add(L,'R4-02'); add(ap(L,o,c),'R4-02'); } }
  clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
const _tagQ0=tagQ; tagQ=function(ep,i,q){ q=_tagQ0(ep,i,q); if(q&&typeof q==='object'&&!TAG3[ep+'#'+i]){ if(q.mis&&!Object.keys(q.mis).length) delete q.mis;   /* 빈 mis({})가 있으면 규칙이 모두 건너뛰던 것을 막는다 */
  for(const f of [codeW,codeW2,codeW3,codeW4,codeW5,codeW6,codeW7,codeW8,codeW9]){ try{ f(q); }catch(e){ (window.__cwErr=window.__cwErr||{})[f.name+' '+ep+'#'+i]=String(e&&e.message); } } } return q; };

/* ---------- 3-14. 도형과 측정 (Claude·Gemini 교차 검토 4차) ---------- */
Object.assign(MIS, {
'G2-04':['곧은 선으로 둘러싸여야 한다는 조건을 무시(선의 수만 봄)','삼각형·사각형은 곧은 선으로만 둘러싸인 도형이에요.'],
'G2-05':['둘러싸인(닫힌) 도형이어야 한다는 조건을 무시','끊어진 곳이 없어야 도형이에요.'],
'G2-06':['정각이 가까울 때 시를 한 시간 크게 읽음','짧은바늘이 지나온 숫자가 "시"예요.'],
'G2-07':['긴바늘이 가리키는 숫자를 그대로 분으로 읽음','긴바늘의 숫자 1은 5분이에요.'],
'G2-08':['자의 끝 눈금을 그대로 길이로 읽음','시작 눈금이 0이 아니면 끝 눈금에서 시작 눈금을 빼요.'],
'G2-09':['칸이 아니라 눈금의 개수를 셈','길이는 눈금 사이 칸의 수예요.'],
'G3-06':['선분·반직선·직선을 끝이 있는지로 구분하지 못함','선분은 양쪽 끝이 있고, 반직선은 한쪽만, 직선은 양쪽으로 끝없이 늘어나요.'],
'G3-07':['단위의 크기 감각이 부족(같은 종류의 단위를 잘못 고름)','1 m, 1 L, 1 kg이 얼마쯤인지 떠올려 봐요.'],
'G3-08':['지름은 원의 중심을 지나야 한다는 조건을 빠뜨림','원의 중심을 지나는 선분만 지름이에요.'],
'G4-07':['예각·둔각의 기준(직각)을 혼동','직각보다 작으면 예각, 크면 둔각이에요.'],
'G4-08':['수직과 평행을 혼동하거나 수직 조건을 놓침','만나서 직각이면 수직, 만나지 않으면 평행이에요. 거리는 수직으로 재요.'],
'G4-09':['예각삼각형(세 각 모두)과 직각·둔각삼각형(한 각)의 조건을 반대로 적용','예각삼각형은 세 각이 모두 예각이어야 해요.'],
'G4-10':['시계 방향과 시계 반대 방향을 혼동','시곗바늘이 도는 쪽이 시계 방향이에요.'],
'G5-11':['직육면체의 모서리 수와 꼭짓점 수를 바꿔 앎','면 6개, 모서리 12개, 꼭짓점 8개예요.'],
'G6-16':['보는 방향과 보이는 모양을 잘못 짝지음','위에서 보면 밑면 모양, 앞·옆에서 보면 옆모습이 보여요.'],
'G6-17':['구를 자른 면의 크기가 항상 같다고 봄','구는 중심을 지나게 자를 때 자른 면이 가장 커요.'],
});
const TX=(k,map,re)=>T3(k,q=>re&&!re.test(_pl(q.q))?q:tagOnly(q,o=>typeof map==='function'?map(o,String(q.ans)):(map[o]||null)));
TX('S6-17#0',o=>'G3-06',/선의 이름/); TX('S6-17#1',o=>'G3-06',/길이를 잴 수/);
TX('S6-18#0',(o,A)=>A!=='직각'?null:/작다/.test(o)?'G3-01':/크다/.test(o)?'G3-02':null);
TX('S6-19#0',{'없다':'G3-03'},/정사각형은 직사각형/); TX('S6-26#2',{'반지름':'G3-04'},/둘로 나누는/);
['S6-38#1','S6-41#0','S6-41#1','S6-44#0','S6-44#1'].forEach(k=>TX(k,o=>'G3-07'));
TX('S6-48#1',(o,A)=>(A==='예각'&&o==='둔각')||(A==='둔각'&&o==='예각')?'G4-07':null);
TX('S6-51#2',{'4개':'G4-06'},/삼각형 몇 개/); TX('S6-20#1',{'평행':'G4-08'},/직각일 때/); TX('S6-20#2',{'2쌍':'G4-08'},/수직인 변/); TX('S6-21#0',{'다르다':'G4-03'},/평행선 사이/);
TX('S6-29#0',(o,A)=>A!=='직각삼각형'?null:o==='예각삼각형'?'G4-09':o==='둔각삼각형'?'G4-07':null); TX('S6-29#1',{'3개':'G4-09'},/둔각삼각형에는/);
TX('S6-31#0',{'정사각형이다':'G4-05','직사각형이다':'G4-06'},/마름모에 대한/); TX('S6-31#1',{'평행사변형':'G4-05'},/직사각형이면서 마름모/);
TX('S6-57#1',{'그리지 않는다':'G5-06'},/보이지 않는 모서리/); TX('S6-58#1',{'5개':'G5-06'},/수직인 면/); TX('S6-58#2',{'다르다':'G5-06'},/겹치는 선분/);
TX('S6-59#1',o=>/뿔$/.test(o)?'G6-02':null); TX('S6-59#2',{'수직이다':'G4-08','만난다':'G6-01'},/두 밑면/);
TX('S6-60#1',o=>/기둥$/.test(o)?'G6-02':null); TX('S6-60#2',{'2개':'G6-02'},/각뿔의 밑면/); TX('S6-61#1',{'삼각형':'G6-02'},/각기둥의 옆면/);
TX('S6-77#2',o=>'G6-07',/1 cm³는/);
T3('S6-79#0',q=>tagNum(q,(x,A)=>Math.abs(x-A/100)<1?'G5-04':'G6-07'));
TX('S6-64#0',{'직사각형':'G6-16'},/원기둥을 위에서/); TX('S6-62#1',{'원':'G6-16'},/원기둥을 앞에서/);
TX('S6-63#0',{'높이':'G6-04','지름':'G3-04'},/꼭짓점과 밑면/); TX('S6-74#1',{'반지름':'G3-04','넓이':'G6-12'},/원주율은/);

B('S6-04', ['사각형이 될 수 있는 도형은?','곧은 선 4개로 둘러싸인 도형',[['굽은 선 1개와 곧은 선 3개로 둘러싸인 도형','G2-04'],['곧은 선 4개를 이었지만 한쪽이 열려 있는 도형','G2-05']]], ['삼각형이 될 수 있는 도형은?','곧은 선 3개로 둘러싸인 도형',[['굽은 선 1개와 곧은 선 2개로 둘러싸인 도형','G2-04'],['곧은 선 3개를 이었지만 한쪽이 열려 있는 도형','G2-05']]]);
B('S6-10', ['짧은바늘이 4와 5 사이에 있고 긴바늘이 9를 가리켜요. 몇 시 몇 분일까요?','4시 45분',[['5시 45분','G2-06'],['4시 9분','G2-07']]], ['짧은바늘이 7과 8 사이에 있고 긴바늘이 10을 가리켜요. 몇 시 몇 분일까요?','7시 50분',[['8시 50분','G2-06'],['7시 10분','G2-07']]], ['짧은바늘이 2와 3 사이에 있고 긴바늘이 11을 가리켜요. 몇 시 몇 분일까요?','2시 55분',[['3시 55분','G2-06'],['2시 11분','G2-07']]]);
B('S6-14', ['연필이 자의 눈금 3에서 시작해 눈금 10에서 끝나요. 연필의 길이는?','7 cm',[['10 cm','G2-08'],['8 cm','G2-09']]], ['지우개가 자의 눈금 2에서 시작해 눈금 6에서 끝나요. 지우개의 길이는?','4 cm',[['6 cm','G2-08'],['5 cm','G2-09']]], ['못이 자의 눈금 4에서 시작해 눈금 9에서 끝나요. 못의 길이는?','5 cm',[['9 cm','G2-08'],['6 cm','G2-09']]]);
B('S6-19', ['직사각형이라고 부를 수 있는 도형을 모두 고르면? (ㄱ. 가로 5 cm, 세로 3 cm인 직사각형  ㄴ. 한 변이 4 cm인 정사각형)','ㄱ, ㄴ',[['ㄱ','G3-03'],['ㄴ',null]]]);
B('S6-21', ['평행선 사이에 수직으로 그은 선분은 5 cm, 비스듬히 그은 선분은 7 cm예요. 평행선 사이의 거리는?','5 cm',[['7 cm','G4-08'],['재는 곳마다 다르다','G4-03']]], ['평행선 사이에 수직으로 그은 선분은 4 cm, 비스듬히 그은 선분은 6 cm예요. 평행선 사이의 거리는?','4 cm',[['6 cm','G4-08'],['재는 곳마다 다르다','G4-03']]]);
B('S6-23', ['도형을 오른쪽으로 뒤집으면 어떻게 될까요?','왼쪽과 오른쪽이 서로 바뀐다',[['시계 방향으로 90° 돌린 모양이 된다','G4-04'],['도형이 커진다',null]]]);
B('S6-24', ['위쪽(↑)을 가리키는 화살표를 시계 반대 방향으로 90° 돌리면 어느 쪽을 가리킬까요?','왼쪽(←)',[['오른쪽(→)','G4-10'],['아래쪽(↓)','G4-04']]], ['오른쪽(→)을 가리키는 화살표를 시계 방향으로 90° 돌리면 어느 쪽을 가리킬까요?','아래쪽(↓)',[['위쪽(↑)','G4-10'],['왼쪽(←)','G4-04']]]);
B('S6-26', ['원의 지름에 대한 설명으로 옳은 것은?','한 원에 그을 수 있는 지름은 셀 수 없이 많다',[['원 위의 두 점을 이은 선분은 모두 지름이다','G3-08'],['한 원에서 지름은 반지름보다 짧다','G3-04']]], ['원을 똑같이 둘로 나누는 선분은?','지름',[['반지름','G3-04'],['원 위의 아무 두 점을 이은 선분','G3-08']]]);
B('S6-28', ['세 변이 8 cm, 8 cm, 8 cm인 삼각형을 부를 수 있는 이름을 모두 고르면?','이등변삼각형, 정삼각형',[['정삼각형','G4-02'],['이등변삼각형',null]]]);
B('S6-31', ['마름모에 대한 설명으로 옳은 것은?','평행사변형이다',[['평행사변형이 아니다','G4-05'],['네 각이 모두 직각이다','G4-06']]], ['항상 직사각형이면서 마름모인 사각형은?','정사각형',[['평행사변형','G4-05'],['마름모','G4-06']]]);
B('S6-56', ['직육면체의 면, 모서리, 꼭짓점의 수를 바르게 짝지은 것은?','면 6개, 모서리 12개, 꼭짓점 8개',[['면 6개, 모서리 8개, 꼭짓점 12개','G5-11'],['면 3개, 모서리 9개, 꼭짓점 7개','G5-06']]], ['직육면체에서 한 면과 수직인 면은 몇 개일까요?','4개',[['1개','G4-08'],['5개','G5-06']]]);
B('S6-59', ['밑면이 사각형인 각기둥의 이름은?','사각기둥',[['사각뿔','G6-02'],['육각기둥','G6-03']]]);
B('S6-60', ['사각뿔의 밑면은 몇 개일까요?','1개',[['2개','G6-02'],['5개','G6-03']]]);
B('S6-61', ['오각기둥의 옆면은 어떤 모양일까요?','직사각형',[['삼각형','G6-02'],['오각형','G6-01']]]);
B('S6-62', ['원기둥에 있는 것은?','밑면',[['꼭짓점','G6-15'],['모선','G6-04']]]);
B('S6-63', ['구에 대한 설명으로 옳은 것은?','어느 방향에서 보아도 원이다',[['평면으로 자른 면의 크기는 어디를 잘라도 같다','G6-17'],['구에는 꼭짓점이 1개 있다','G6-15']]]);

/* ---------- 3-15. 변화와 관계 · 자료와 가능성 (Claude·Gemini 교차 검토 5차) ---------- */
Object.assign(MIS, {
'R1-01':['반복 마디를 보지 않고 바로 앞의 것을 이어 씀','어디서부터 어디까지가 되풀이되는지 먼저 묶어 봐요.'],
'R1-02':['반복 마디의 순서(시작 위치)를 틀림','되풀이되는 묶음 안에서 지금 몇 번째인지 세어 봐요.'],
'R1-03':['수 배열표에서 가로(1씩)와 세로(10씩)를 혼동','오른쪽으로 가면 1씩, 아래로 가면 10씩 커져요.'],
'R5-03':['한 쌍(처음 두 수)만 보고 규칙을 정함','모든 쌍에 맞는 규칙인지 확인해요.'],
'D1-01':['분류 기준이 분명하지 않거나 기준을 섞음','누가 나누어도 똑같이 되는 기준 하나로 끝까지 나눠요.'],
'D1-02':['자료의 수(합계)와 종류의 수를 혼동','합계는 자료를 모두 센 수예요.'],
'D4-03':['변화가 큰 때를 값이 큰 때로 봄','선이 가장 가파르게 기울어진 곳이 가장 많이 변한 때예요.'],
'D5-04':['평균 대신 합계로 답하거나 비교함','평균은 모두 더한 뒤 자료의 수로 나눈 값이에요.'],
'D5-05':['어떤 일이든 가능성이 반반이라고 봄','일어날 수 있는 경우를 하나씩 따져 봐요.'],
'D5-06':['불가능(0)·반반(2분의 1)·확실(1)을 서로 바꿈','절대 안 일어나면 0, 반드시 일어나면 1이에요.'],
'D5-07':['가능성 대신 개수를 그대로 씀','가능성은 0부터 1까지의 수로 나타내요.'],
});
TX('S5-03#1',{'1씩 커진다':'N4-15'},/수 배열표에서/); TX('S5-03#3',{'10 커진다':'R1-03'},/오른쪽으로 한 칸/);
T3('S5-09#1',q=>tagOnly(q,o=>{ const m=o.match(/^(\d+) \+ (\d+) = (\d+) \+ (\d+)$/); return m&&+m[1]+ +m[2]===+m[3]?'R4-02':null; }));
const corrTag=q=>{ const A=String(q.ans); let m; if((m=A.match(/^△ = □ × (\d+)$/))&&+m[1]>=2) return setOpts(q,[[`△ = □ + ${+m[1]-1}`,'R5-02'],[`□ = △ × ${m[1]}`,'R5-01']]);
  if((m=A.match(/^△ = □ \+ (\d+)$/))) return setOpts(q,[[`△ = □ × ${+m[1]+1}`,'R5-03'],[`□ = △ + ${m[1]}`,'R5-01']]); return q; };
T3('S5-12#0',corrTag); T3('S5-12#1',corrTag);
T3('S5-13#0',q=>{ const m=String(q.ans).match(/^(\d+) : (\d+)$/); if(!m||m[1]===m[2]) return q; return setOpts(q,[[`${m[2]} : ${m[1]}`,'R6-01'],[`${m[1]} : ${+m[1]+ +m[2]}`,'R6-03']]); });
T3('S5-13#1',q=>{ const m=_pl(q.q).match(/(\d+) : (\d+)에서 기준량/); if(!m||m[1]===m[2]||+q.ans!==+m[2]) return q; return setOpts(q,[[+m[1],'R6-01'],[+m[1]+ +m[2],'R6-03']]); });
T3('S5-14#1',q=>{ const m=_pl(q.q).match(/(\d+)의 (\d+)에 대한 비율을 분수로/); if(!m||m[1]===m[2]) return q; return setOpts(q,[[`${m[1]}분의 ${m[2]}`,'R6-01'],[`${+m[1]+ +m[2]}분의 ${m[1]}`,'R6-03']]); });
T3('S5-18#0',q=>{ const m=String(q.ans).match(/^(\d+) : (\d+)$/); return m?tagOnly(q,o=>o===`${m[2]} : ${m[1]}`?'R6-01':null):q; });
T3('S5-18#1',q=>{ const m=_pl(q.q).match(/(\d+) : (\d+)를/); if(!m) return q; const a=+m[1], b=+m[2], g=_gcd(a,b); let d=0; for(let k=2;k<g;k++) if(g%k===0){ d=k; break; } return setOpts(q,[[d?`${a/d} : ${b/d}`:null,'N5-12'],[`${b/g} : ${a/g}`,'R6-01'],[!d?`${a/g+1} : ${b/g+1}`:null,null]]); });
T3('S4-12#1',q=>{ const m=_pl(q.q).match(/(\d+)~(\d+) 사이/); if(!m) return q; return tagOnly(q,o=>{ const r=o.match(/^(\d+)~(\d+)$/); return r&&+r[1]<=+m[1]&&+r[2]>=+m[2]?'D4-02':null; }); });
TX('S4-13#0',o=>'D6-05',/알맞은 그래프/); TX('S4-22#3',o=>'D6-05',/알맞은 그래프/);
T3('S4-16#1',q=>{ const m=_pl(q.q).match(/가 모둠 ([\d, ]+)\/ 나 모둠 ([\d, ]+)\./); if(!m) return q; const s=x=>x.split(',').map(Number).reduce((a,b)=>a+b,0), sa=s(m[1]), sb=s(m[2]), A=String(q.ans); const wrongBigger=A==='가 모둠'?sb>sa:sa>sb; return wrongBigger?tagOnly(q,o=>'D5-04'):q; });
TX('S4-17#0',{'반반이다':'D5-05','확실하다':'D5-06'},/7이 나올/); TX('S4-17#1',{'불가능하다':'D5-06'},/6 이하/);
TX('S4-18#0',{'2분의 1':'D5-05','1':'D5-06'},/검은 돌/); TX('S4-18#1',{'1':'D5-06'},/가능성을 수로/); TX('S4-18#2',{'1':'D5-06'},/가능성을 수로/); TX('S4-22#4',{'2분의 1':'D5-05','0':'D5-06'},/가능성을 수로/);

B('S4-01', ['단추를 누가 나누어도 결과가 똑같이 나오는 분류 기준은?','단추 구멍의 수',[['보기에 예쁜 단추','D1-01'],['단추의 전체 개수','D1-02']]], ['동물 카드를 누가 나누어도 결과가 똑같이 나오는 분류 기준은?','다리의 수',[['귀여운 동물','D1-01'],['카드의 전체 장수','D1-02']]]);
B('S4-03', ['빨간 세모 4개, 파란 세모 3개, 빨간 네모 5개를 모양에 따라 표로 정리해요. 세모의 수와 합계는?','세모 7, 합계 12',[['세모 4, 합계 9','D1-01'],['세모 7, 합계 2','D1-02']]], ['노란 동그라미 2개, 초록 동그라미 6개, 노란 네모 3개를 모양에 따라 표로 정리해요. 동그라미의 수와 합계는?','동그라미 8, 합계 11',[['동그라미 2, 합계 5','D1-01'],['동그라미 8, 합계 2','D1-02']]]);
B('S5-01', ['★ ● ▲ ★ ● ▲ ★ □ 에서 □에 알맞은 모양은?','●',[['★','R1-01'],['▲','R1-02']]], ['● ● ▲ ● ● ▲ ● ● □ 에서 □에 알맞은 모양은?','▲',[['●','R1-01'],['★',null]]], ['★ ▲ ▲ ★ ▲ ▲ ★ ▲ □ 에서 □에 알맞은 모양은?','▲',[['★','R1-02'],['●',null]]]);
B('S5-03', ['1부터 100까지의 수 배열표에서 36의 바로 아래 칸에 있는 수는?','46',[['37','R1-03'],['26',null]]], ['1부터 100까지의 수 배열표에서 58의 바로 아래 칸에 있는 수는?','68',[['59','R1-03'],['48',null]]], ['1부터 100까지의 수 배열표에서 오른쪽으로 한 칸 가면 수는 어떻게 될까요?','1 커진다',[['10 커진다','R1-03'],['1 작아진다',null]]]);
B('S5-07', ['3, 6, 12, 24 다음에 올 수는?','48',[['36','R4-01'],['27','R4-03']]], ['2, 6, 18, 54 다음에 올 수는?','162',[['90','R4-01'],['58','R4-03']]], ['5, 10, 20, 40 다음에 올 수는?','80',[['60','R4-01'],['45','R4-03']]]);
B('S5-18', ['0.7 : 0.03을 간단한 자연수의 비로 나타내면?','70 : 3',[['7 : 3','R6-11'],['3 : 70','R6-01']]], ['0.9 : 0.07을 간단한 자연수의 비로 나타내면?','90 : 7',[['9 : 7','R6-11'],['7 : 90','R6-01']]]);
B('S4-11', ['강낭콩의 키가 5월 4 cm, 6월 11 cm, 7월 15 cm, 8월 17 cm예요. 키가 가장 많이 자란 때는?','5월과 6월 사이',[['7월과 8월 사이','D4-03'],['6월과 7월 사이',null]]], ['1주에서 2주 사이에 식물 가는 3 cm에서 9 cm로, 식물 나는 10 cm에서 13 cm로 자랐어요. 꺾은선이 더 가파른 식물은?','가',[['나','D4-03'],['같다',null]]], ['기온이 9시 12도, 10시 14도, 11시 19도, 12시 21도예요. 기온이 가장 많이 오른 때는?','10시와 11시 사이',[['11시와 12시 사이','D4-03'],['9시와 10시 사이',null]]]);
B('S4-13', ['마을별 나무 수의 많고 적음을 한눈에 비교하기에 가장 알맞은 것은?','막대그래프',[['꺾은선그래프','D6-05'],['합계만 적은 표',null]]]);
B('S4-16', ['가 모둠 12, 20, 22 / 나 모둠 12, 14, 16, 22. 평균이 더 높은 모둠은?','가 모둠',[['나 모둠','D5-04'],['같다','D5-02']]], ['가 모둠 15, 23, 25 / 나 모둠 15, 17, 19, 25. 평균이 더 높은 모둠은?','가 모둠',[['나 모둠','D5-04'],['같다','D5-02']]]);
B('S4-15', ['4일 동안 줄넘기를 14회, 0회, 20회, 14회 했어요. 하루 평균 몇 회 한 셈일까요?','12회',[['48회','D5-04'],['10회','D5-02'],['16회','D5-08'],['14회','D5-01']]], ['4일 동안 책을 10쪽, 0쪽, 16쪽, 6쪽 읽었어요. 하루 평균 몇 쪽 읽은 셈일까요?','8쪽',[['32쪽','D5-04'],['16쪽',null]]]);
B('S4-18', ['파란 공만 6개 든 주머니에서 공 1개를 꺼낼 때, 파란 공이 나올 가능성을 수로 나타내면?','1',[['6','D5-07'],['2분의 1','D5-05']]], ['빨간 구슬 2개, 파란 구슬 2개가 든 주머니에서 빨간 구슬을 꺼낼 가능성을 수로 나타내면?','2분의 1',[['2','D5-07'],['1','D5-06']]]);

/* 전수 점검에서 코드가 모자랐던 조각(C20, C24, C27, RC03)을 채우는 문항 */
B('S3-62', ['4 − 1.6을 계산하면?','2.4',[['3.6','N4-25'],['3.4','N2-08']]], ['7 − 2.3을 계산하면?','4.7',[['5.3','N4-25'],['5.7','N2-08']]], ['5 − 0.8을 계산하면?','4.2',[['5.8','N4-25'],['5.2','N2-08']]]);
B('S3-95', ['1.4 × 0.3을 계산하면?','0.42',[['4.2','N5-17'],['42','N3-08']]], ['2.3 × 0.2를 계산하면?','0.46',[['4.6','N5-17'],['46','N3-08']]], ['1.6 × 0.4를 계산하면?','0.64',[['6.4','N5-17'],['64','N3-08']]]);
B('S3-83', ['25 이상인 수를 모두 고르면?','25, 26, 30',[['26, 30','N5-16'],['24, 25','N5-16']]], ['40 이하인 수는?','40',[['41','N5-16'],['45',null]]]);
B('S3-84', ['35 미만인 수는?','34',[['35','N5-08'],['36',null]]], ['50 초과인 수는?','51',[['50','N5-08'],['49',null]]]);
B('S5-11', ['□가 2, 3, 4일 때 △가 6, 9, 12예요. □와 △ 사이의 관계는?','△ = □ × 3',[['△ = □ + 4','R5-03'],['□ = △ × 3','R5-01']]], ['□가 1, 2, 3일 때 △가 5, 6, 7이에요. □와 △ 사이의 관계는?','△ = □ + 4',[['△ = □ × 5','R5-03'],['□ = △ + 4','R5-01']]]);

/* ---------- 3-16. 보기 수 제한을 풂(교수님): 오개념 유형이 서너 가지인 문항은 4~5지선다 ---------- */
Object.assign(MIS, {
'N3-38':['대분수를 가분수로 바꿀 때 자연수를 분자에 곱함','자연수는 분모와 곱해서 분자에 더해요.'],
'N6-13':['분수의 나눗셈에서 두 분수를 모두 뒤집음','나누는 분수만 분자와 분모를 바꿔요.'],
'G5-12':['사다리꼴의 넓이에서 윗변과 아랫변을 곱함','(윗변 + 아랫변) × 높이 ÷ 2예요.'],
'G6-18':['원의 넓이에서 반지름을 한 번만 곱함','반지름 × 반지름 × 원주율이에요.'],
'D5-08':['평균을 구할 때 0인 자료를 빼고 나눔','0도 자료 하나예요. 자료의 수에 넣어요.'],
});
B('S3-58', ['0.5, 0.48, 0.09, 0.032 중 가장 큰 수는?','0.5',[['0.032','N4-02'],['0.09','N3-37'],['0.48',null]]], ['0.7, 0.65, 0.08, 0.123 중 가장 큰 수는?','0.7',[['0.123','N4-02'],['0.08','N3-37'],['0.65',null]]]);
B('S6-73', ['윗변 4 cm, 아랫변 8 cm, 높이 5 cm인 사다리꼴의 넓이는? (옆의 두 변은 6 cm, 7 cm)','30 cm²',[['60 cm²','G5-03'],['25 cm²','G5-01'],['80 cm²','G5-12']]], ['윗변 3 cm, 아랫변 7 cm, 높이 4 cm인 사다리꼴의 넓이는? (옆의 두 변은 5 cm, 5 cm)','20 cm²',[['40 cm²','G5-03'],['42 cm²','G5-12'],['50 cm²',null]]]);
B('S6-76', ['가로 5 cm, 세로 4 cm, 높이 3 cm인 직육면체의 겉넓이는?','94 cm²',[['47 cm²','G6-06'],['60 cm²','G6-05'],['48 cm²','G5-01']]], ['가로 6 cm, 세로 2 cm, 높이 4 cm인 직육면체의 겉넓이는?','88 cm²',[['44 cm²','G6-06'],['48 cm²','G6-05'],['12 cm²',null]]]);
B('S6-75', ['반지름이 5 cm인 원의 넓이는? (원주율 3.1)','77.5 cm²',[['31 cm²','G6-12'],['15.5 cm²','G6-18'],['310 cm²','G3-04']]], ['반지름이 4 cm인 원의 넓이는? (원주율 3)','48 cm²',[['24 cm²','G6-12'],['12 cm²','G6-18'],['192 cm²','G3-04']]]);
B('S5-16', ['소금 25 g을 물 100 g에 녹였어요. 소금물의 진하기는?','20%',[['25%','R6-08'],['80%','R6-01'],['75%','R6-02']]], ['설탕 20 g을 물 60 g에 녹였어요. 설탕물의 진하기는?','25%',[['75%','R6-01'],['40%','R6-02'],['20%',null]]]);
B('S5-19', ['6 : 8 = 12 : □에서 □는?','16',[['14','R6-10'],['9','R6-12'],['4','R6-01']]], ['4 : 10 = 12 : □에서 □는?','30',[['18','R6-10'],['3','R6-01'],['48',null]]]);
B('S5-21', ['사탕 30개를 2 : 3으로 나눌 때 앞사람이 갖는 사탕은?','12개',[['15개','R6-13'],['20개','R6-03'],['10개',null]]], ['구슬 40개를 3 : 5로 나눌 때 앞사람이 갖는 구슬은?','15개',[['24개','R6-03'],['8개',null],['25개','R6-01']]]);

/* ---------- 3-17. 1~2학년 영상편에 넣는 조각 확인 문항(C01 수의 순서·모으기, C02 덧뺄셈의 뜻·등호) ---------- */
(function(){ if(typeof G==='undefined'||typeof P!=='function') return; const sh=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const mk=(who,text,ans,wr)=>{ const seen=new Set([ans]), ws=wr.filter(([v])=>v>=0&&!seen.has(v)&&seen.add(v)); const q=P(who,text,text,'',ans,sh([ans,...ws.map(x=>x[0])]),{}); q.mis={}; q.fx={}; ws.forEach(([v,c])=>{ if(c==='F') q.fx[String(v)]=1; else if(c) q.mis[String(v)]=c; }); return q; };
  const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), add=(e,f)=>{ if(G[e]) G[e].push(f); };
  add(6,()=>{ const a=R(3,9); return Math.random()<.5?mk('rami',`${a}보다 1 작은 수는?`,a-1,[[a+1,'N1-01'],[a-2,'F']]):mk('rami',`${a}보다 1 큰 수는?`,a+1,[[a-1,'N1-01'],[a+2,'F']]); });
  add(24,()=>{ let a=R(1,9); if(a===5) a=3; return mk('doto',`${a}와 □를 모으면 10이 돼요. □는?`.replace(/^([1367])와/,'$1과').replace(/^8와/,'8과'),10-a,[[11-a,'N1-02'],[a+1,'N1-01'],[9-a,'F']]); });
  add(15,()=>{ let a=R(2,8); if(a===5) a=6; return mk('rami',`10을 ${a}${'013678'.includes(String(a))?'과':'와'} □로 갈라요. □는?`,10-a,[[11-a,'N1-02'],[a+1,'N1-01'],[a,'F']]); });
  add(19,()=>{ const b=R(1,4), a=b+R(2,5); return mk('cheong',`빨간 공 ${a}개, 파란 공 ${b}개. 빨간 공이 몇 개 더 많을까요?`,a-b,[[a+b,'N1-03'],[a,'F']]); });
  add(34,()=>{ const b=R(1,4), c=b+R(2,5); return mk('rami',`${c} = □ + ${b}`,c-b,[[c+b,'N1-03'],[c,'N1-05'],[b,'F']]); });
  add(34,()=>{ const a=R(2,5), b=R(2,4), d=R(1,a+b-2); return mk('doto',`${a} + ${b} = □ + ${d}`,a+b-d,[[a+b,'N1-05'],[a+b+d,'N1-03'],[d,'F']]); });
})();

/* ---------- 3-18. 한 문제로 여러 조각을 가르는 문항(4~5지선다) — 수와 연산 5~6학년 (Claude 작성, 검산함) ---------- */
Object.assign(MIS, {
'N5-18':['분수의 곱셈에서 한 분수를 뒤집어 곱함','곱셈은 뒤집지 않아요. 분자끼리, 분모끼리 곱해요.'],
'N6-14':['(분수)÷(자연수)에서 분모를 자연수로 나눔','분모에 자연수를 곱해요(조각을 더 잘게 나누는 거예요).'],
});
B('S3-67', ['20 − 2 × (3 + 4)를 계산하면?','6',[['58','N5-01'],['18','N5-09'],['11','N2-05']]], ['30 − 3 × (2 + 5)를 계산하면?','9',[['59','N5-01'],['29','N5-09'],['20','N2-05']]]);
B('S3-73', ['12와 18의 최대공약수는?','6',[['36','N5-02'],['3','N5-12'],['12','N5-11'],['30','N2-05']]], ['8과 12의 최소공배수는?','24',[['4','N5-02'],['96','N5-12'],['16','N5-11'],['20','N2-05']]]);
B('S3-75', ['18분의 12를 기약분수로 나타내면?','3분의 2',[['9분의 6','N5-12'],['18분의 2','N5-13'],['16분의 10','N5-03']]], ['30분의 20을 기약분수로 나타내면?','3분의 2',[['15분의 10','N5-12'],['30분의 2','N5-13'],['25분의 15','N5-03']]]);
B('S3-79', ['2분의 1 + 3분의 1을 계산하면?','6분의 5',[['5분의 2','N5-04'],['6분의 2','N5-13'],['6분의 1',null]]], ['4분의 1 + 3분의 2를 계산하면?','12분의 11',[['7분의 3','N5-04'],['12분의 3','N5-13'],['12분의 2',null]]]);
B('S3-87', ['3462를 반올림하여 백의 자리까지 나타내면?','3500',[['3400','N6-10'],['3000','N5-14'],['35','N4-15']]], ['5728을 반올림하여 백의 자리까지 나타내면?','5700',[['5800','N6-10'],['6000','N5-14'],['57','N4-15']]]);
B('S3-91', ['3분의 2 × 4분의 3을 계산하면?','2분의 1',[['7분의 5','N5-04'],['12분의 17','N2-05'],['9분의 8','N5-18']]], ['5분의 2 × 2분의 1을 계산하면?','5분의 1',[['7분의 3','N5-04'],['10분의 9','N2-05'],['5분의 4','N5-18']]]);
B('S3-95', ['0.6 × 0.4를 계산하면?','0.24',[['2.4','N5-17'],['24','N3-08'],['0.024','N5-07'],['1','N2-05']]], ['0.3 × 0.5를 계산하면?','0.15',[['1.5','N5-17'],['15','N3-08'],['0.015','N5-07'],['0.8','N2-05']]]);
B('S3-98', ['4분의 3 ÷ 2를 계산하면?','8분의 3',[['4분의 6','N6-04'],['2분의 3','N6-14'],['3분의 8','N6-02'],['6분의 3','N2-05']]], ['5분의 4 ÷ 3을 계산하면?','15분의 4',[['5분의 12','N6-04'],['4분의 15','N6-02'],['8분의 4','N2-05']]]);
B('S3-101', ['6.12 ÷ 3을 계산하면?','2.04',[['2.4','N6-08'],['204','N3-08'],['20.4','N6-07'],['3.12','N3-11']]], ['8.16 ÷ 4를 계산하면?','2.04',[['2.4','N6-08'],['204','N3-08'],['20.4','N6-07'],['4.16','N3-11']]]);
B('S3-107', ['4분의 3 ÷ 8분의 3을 계산하면?','2',[['32분의 9','N6-11'],['2분의 1','N3-01'],['9분의 32','N6-13']]], ['3분의 2 ÷ 9분의 4를 계산하면?','1과 2분의 1',[['27분의 8','N6-11'],['3분의 2','N3-01'],['8분의 27','N6-13']]]);
B('S3-109', ['3.6 ÷ 0.4를 계산하면?','9',[['0.9','N6-07'],['3.2','N3-11'],['90',null]]], ['4.8 ÷ 0.6을 계산하면?','8',[['0.8','N6-07'],['4.2','N3-11'],['80',null]]]);

/* ---------- 3-19. 한 문제로 여러 조각을 가르는 문항(5지선다) — 수와 연산 3~4학년 (Gemini 작성, Claude가 값 검산·코드 번호 맞춤) ---------- */
Object.assign(MIS, {
'N3-39':['전체의 분수에서 단위분수만큼만 구하고 멈춤','한 묶음의 수를 구한 다음 분자만큼 곱해요.'],
'N4-26':['분수 부분이 가분수인 채로 답함','분수 부분이 1보다 크면 자연수로 올려요.'],
'N4-27':['자연수 1을 받아내릴 때 원래 있던 분자를 더하지 않음','받아내린 1(분모만큼)에 원래 분자를 더한 뒤 빼요.'],
});
B('S2-06', ['503 − 167을 계산하면?','336',[['346','N2-04'],['436','N2-08'],['464','N2-02'],['670','N1-03']]]);
B('S2-07', ['□ − 148 = 236에서 □에 알맞은 수는?','384',[['88','N3-10'],['374','N2-01'],['3714','N2-07'],['112','N2-02']]]);
B('S2-08', ['귤 28개를 바구니 4개에 똑같이 나누어 담아요. 한 바구니에 담는 귤의 수를 구하는 식은?','28 ÷ 4',[['4 ÷ 28','N3-01'],['28 − 4','N3-11'],['28 × 4','N3-30'],['28 + 4','N1-03']]]);
B('S2-11', ['2 = □ ÷ 6에서 □에 알맞은 수는?','12',[['3','N3-01'],['8','N2-05'],['4','N3-11'],['2','N1-05']]]);
B('S2-15', ['37 × 4를 계산하면?','148',[['128','N3-14'],['208','N3-21'],['1228','N2-07'],['41','N2-05']]]);
B('S2-14', ['81 × 5를 계산하면?','405',[['85','N3-13'],['406','N2-06'],['45','N3-12'],['86','N2-05']]]);
B('S3-18', ['0과 1 사이를 똑같이 나눈 수직선이에요. 화살표가 가리키는 수는?','5분의 2',[['4분의 2','N3-09'],['5분의 3','N3-16'],['3분의 2','N3-17']],nline(5,2)]);
B('S3-22', ['1.9보다 0.1 큰 수는?','2',[['1.10','N3-08'],['2.9','N3-29'],['1.8','N1-01'],['1.91',null]]]);
B('S3-27', ['46 × 14를 계산하면?','644',[['230','N3-03'],['544','N2-01'],['624','N3-14'],['60','N2-05']]], ['35 × 40을 계산하면?','1400',[['140','N3-12'],['1200','N3-14'],['2000','N3-21'],['75','N2-05']]]);
B('S3-32', ['614 ÷ 3의 몫과 나머지는?','204 … 2',[['24 … 2','N3-04'],['203 … 5','N3-02'],['240 … 2','N3-34'],['205 … 1','N3-31']]]);
B('S3-33', ['어떤 수를 6으로 나누었더니 몫이 8이고 나머지가 5예요. 어떤 수는?','53',[['48','N3-15'],['19','N2-05'],['43','N1-03'],['38','N3-22']]]);
B('S3-35', ['바둑돌 18개의 3분의 2는 몇 개일까요?','12',[['6','N3-39'],['3','N3-25'],['15','N3-26'],['27','N3-07']]], ['구슬 20개의 4분의 3은 몇 개일까요?','15',[['5','N3-39'],['4','N3-25'],['16','N3-26']]]);
B('S3-37', ['3과 5분의 2를 가분수로 나타내면?','5분의 17',[['5분의 5','N3-35'],['5분의 32','N3-36'],['5분의 6','N3-38']]]);
B('S3-40', ['육만 사백이십을 수로 쓰면?','60420',[['6420','N4-01'],['600420','N4-07'],['60402','N4-09'],['60000420','N4-18']]]);
B('S3-39', ['1000이 35개인 수는?','35000',[['3500','N4-07'],['1035','N2-05'],['100035','N4-18'],['35','N4-15']]]);
B('S3-45', ['214 × 23을 계산하면?','4922',[['1070','N3-03'],['4822','N2-01'],['4912','N3-14'],['237','N2-05']]]);
B('S3-46', ['580 ÷ 40의 몫과 나머지는?','14 … 20',[['140 … 20','N4-06'],['13 … 60','N3-02'],['15 … 20','N3-31'],['14 … 2','N4-20']]]);
B('S3-54', ['2와 7분의 5 + 1과 7분의 6을 계산하면?','4와 7분의 4',[['3과 14분의 11','N4-04'],['4와 7분의 1','N4-05'],['3과 7분의 4','N2-01'],['3과 7분의 11','N4-26']]]);
B('S3-55', ['4와 7분의 2 − 1과 7분의 6을 계산하면?','2와 7분의 3',[['2와 7분의 6','N4-05'],['3과 7분의 4','N2-02'],['3과 7분의 3','N2-08'],['2와 7분의 1','N4-27']]]);
B('S3-61', ['2.6 + 1.48을 계산하면?','4.08',[['1.74','N4-03'],['3.54','N3-08'],['3.08','N2-01'],['4.8',null]]]);
B('S3-62', ['5 − 1.36을 계산하면?','3.64',[['4.36','N4-25'],['3.74','N2-04'],['4.64','N2-08'],['1.31','N4-03']]]);

/* ---------- 3-20. 한 문제로 여러 조각을 가르는 문항(4~5지선다) — 도형과 측정 (Gemini 작성, Claude가 검산·코드 맞춤·문장 줄임) ---------- */
Object.assign(MIS, {
'G4-11':['각도기의 한 변을 0에 맞추지 않고 다른 쪽 눈금을 그대로 읽음','두 변이 가리키는 눈금의 차를 구해요.'],
'G4-12':['삼각형의 세 각의 합(180°)과 사각형의 네 각의 합(360°)을 혼동','삼각형은 180°, 사각형은 360°예요.'],
'G4-13':['돌리는 각도(90°와 180°)를 혼동','90°는 직각만큼, 180°는 반 바퀴예요.'],
'G4-14':['뒤집는 방향(위아래와 좌우)을 혼동','아래로 뒤집으면 위아래가 바뀌고, 옆으로 뒤집으면 왼쪽과 오른쪽이 바뀌어요.'],
'G5-13':['직육면체에서 길이가 같은 모서리가 4개씩 있다는 것을 놓침','가로·세로·높이 모서리가 4개씩 있어요.'],
});
B('S6-18', ['한 변이 6 cm인 정사각형을 비스듬히 기울여 놓았어요. 옳은 설명은?','네 각이 모두 직각이고 직사각형이라고도 할 수 있다',[['정사각형이므로 직사각형이라고 할 수 없다','G3-03'],['기울어져 있으므로 직각이 없다','G3-02'],['변을 12 cm로 늘이면 각도 커진다','G3-01']]]);
B('S6-17', ['자의 눈금 3에 있는 점 ㄱ에서 눈금 10에 있는 점 ㄴ까지 곧게 이었어요. 이 선의 이름과 길이는?','선분 ㄱㄴ, 7 cm',[['직선 ㄱㄴ, 7 cm','G3-06'],['선분 ㄱㄴ, 10 cm','G2-08'],['선분 ㄱㄴ, 8 cm','G2-09'],['선분 ㄱㄴ, 13 cm','N1-03']]]);
B('S6-27', ['지름이 14 cm인 원을 그리려면 컴퍼스를 몇 cm 벌려야 할까요?','7 cm',[['14 cm','G3-04'],['12 cm','N3-11'],['28 cm',null]]], ['반지름이 8 cm인 원과 지름이 10 cm인 원이 바깥에서 한 점에서 만나요. 두 원의 중심 사이의 거리는?','13 cm',[['18 cm','G3-04'],['3 cm','N1-03'],['26 cm',null]]]);
B('S6-37', ['6 cm 4 mm는 모두 몇 mm일까요?','64 mm',[['604 mm','G3-05'],['10 mm','N2-05'],['46 mm',null]]]);
B('S6-36', ['3시간 15분 − 1시간 40분은?','1시간 35분',[['1시간 75분','G2-03'],['2시간 35분','N2-08'],['2시간 25분','N2-02'],['4시간 55분','N1-03']]]);
B('S6-42', ['물 3 L에서 70 mL를 따라 내면 남은 물은 몇 mL일까요?','2930 mL',[['230 mL','G3-05'],['2030 mL','N2-04'],['3930 mL','N2-08'],['3070 mL','N1-03']]]);
B('S6-46', ['1 kg 60 g + 2 kg 70 g은 모두 몇 g일까요?','3130 g',[['430 g','G3-05'],['3030 g','N2-01'],['4300 g',null]]]);
B('S6-47', ['각도기의 중심을 꼭짓점에 맞추었더니 한 변은 안쪽 눈금 30°, 다른 변은 안쪽 눈금 140°(바깥쪽 눈금 40°)를 지나요. 이 각의 크기는?','110°',[['10°','G4-01'],['140°','G4-11'],['170°','N1-03']]]);
B('S6-50', ['삼각형의 두 각이 32°, 45°예요. 나머지 한 각의 크기와 종류는?','103°, 둔각',[['103°, 예각','G4-07'],['283°, 둔각','G4-12'],['117°, 둔각','N2-02'],['113°, 둔각','N2-08']]]);
B('S6-24', ['위쪽 변은 빨간색, 오른쪽 변은 파란색인 정사각형을 시계 반대 방향으로 90° 돌렸어요. 빨간색 변과 파란색 변은 차례로 어느 쪽에 있을까요?','왼쪽, 위쪽',[['오른쪽, 아래쪽','G4-10'],['위쪽, 왼쪽','G4-04'],['아래쪽, 왼쪽','G4-13'],['위쪽, 오른쪽',null]]]);
B('S6-23', ['위에 꼭짓점 가, 왼쪽 아래에 나, 오른쪽 아래에 다가 있는 삼각형을 아래쪽으로 뒤집었어요. 꼭짓점 가의 방향과 왼쪽에 놓이는 꼭짓점은?','아래쪽, 나',[['아래쪽, 다','G4-04'],['위쪽, 다','G4-14'],['위쪽, 나',null]]]);
B('S6-21', ['기울어진 두 평행선 사이에 선분을 그었어요. 두 직선과 직각을 이루는 선분은 6 cm, 가로로 반듯하게 그은 선분은 8 cm, 더 비스듬한 선분은 11 cm예요. 평행선 사이의 거리는?','6 cm',[['8 cm','G4-03'],['11 cm','G4-08'],['재는 곳마다 다르다',null]]]);
B('S6-20', ['직사각형을 비스듬히 기울여 놓았어요. 서로 평행한 변과 서로 수직인 변은 각각 몇 쌍일까요?','평행 2쌍, 수직 4쌍',[['평행 4쌍, 수직 2쌍','G4-08'],['평행 0쌍, 수직 0쌍','G4-03'],['평행 2쌍, 수직 2쌍',null]]]);
B('S6-29', ['세 변이 모두 6 cm이고 세 각이 모두 60°인 삼각형의 이름을 모두 고르면?','이등변삼각형, 정삼각형, 예각삼각형',[['정삼각형','G4-02'],['이등변삼각형, 정삼각형, 둔각삼각형','G4-07'],['정삼각형, 예각삼각형',null]]]);
B('S6-31', ['마주 보는 두 쌍의 변이 평행하고 네 변이 모두 5 cm이며 이웃한 두 각이 70°, 110°인 사각형의 이름을 모두 고르면?','사다리꼴, 평행사변형, 마름모',[['마름모','G4-05'],['사다리꼴, 평행사변형, 마름모, 정사각형','G4-06'],['평행사변형, 마름모',null]]]);
B('S6-71', ['밑변이 12 cm, 높이가 8 cm이고 나머지 두 변이 모두 10 cm인 삼각형의 넓이는?','48 cm²',[['96 cm²','G5-03'],['60 cm²','G5-02'],['32 cm²','G5-01'],['20 cm²','N2-05']]]);
B('S6-69', ['가로 4 m, 세로 3 m인 거실 바닥의 넓이는 몇 cm²일까요?','120000 cm²',[['1200 cm²','G5-04'],['1400 cm²','G5-01'],['12 cm²','N3-27'],['12000 cm²',null]]]);
B('S6-54', ['가로 10 cm, 세로 6 cm인 직사각형에 세로 방향 대칭축을 그었어요. 왼쪽 위 꼭짓점에서 이 대칭축까지의 거리와, 그을 수 있는 대칭축의 수는?','5 cm, 2개',[['5 cm, 4개','G5-09'],['10 cm, 2개','G5-10'],['5 cm, 1개',null]]]);
B('S6-56', ['가로 6 cm, 세로 4 cm, 높이 5 cm인 직육면체의 모든 모서리의 길이의 합은?','60 cm',[['45 cm','G5-06'],['15 cm','G5-13'],['30 cm',null]]]);
B('S6-58', ['정육면체 전개도에 정사각형 가, 나, 다, 라가 가로로 한 줄로 이어져 있고, 나의 위에 마, 아래에 바가 있어요. 접었을 때 면 가와 평행한 면, 그리고 면 가와 수직인 면의 수는?','면 다, 4개',[['면 라, 4개','G5-06'],['면 다, 1개','G4-08'],['면 다, 5개',null]]]);
B('S6-60', ['밑면이 한 변 6 cm인 정사각형이고 옆면이 삼각형 4개인 입체도형이 있어요. 옆 모서리는 10 cm, 꼭짓점에서 밑면에 수직으로 내린 선분은 8 cm예요. 이름, 모서리의 수, 높이는?','사각뿔, 8개, 8 cm',[['사각기둥, 8개, 8 cm','G6-02'],['사각뿔, 12개, 8 cm','G6-03'],['사각뿔, 8개, 10 cm','G6-04'],['오각뿔, 8개, 8 cm',null]]]);
B('S6-59', ['합동인 오각형 2개와 직사각형 5개로 된 입체도형을 눕혀서 직사각형 면이 바닥에 닿게 놓았어요. 밑면의 모양, 밑면의 수, 꼭짓점의 수는?','오각형, 2개, 10개',[['직사각형, 1개, 10개','G6-01'],['오각형, 2개, 15개','G6-03'],['오각형, 1개, 6개','G6-02'],['오각형, 2개, 5개',null]]]);
B('S6-79', ['한 모서리가 1 m인 정육면체의 모서리를 2배로 늘여 한 모서리가 2 m인 정육면체를 만들었어요. 새 정육면체의 부피는 몇 cm³일까요?','8000000 cm³',[['2000000 cm³','G6-08'],['800 cm³','G6-07'],['80000 cm³','G5-04'],['240000 cm³','G6-05']]]);
B('S6-65', ['가로 2칸, 세로 2칸 자리에 쌓기나무를 쌓았어요. 왼쪽 앞 1층, 오른쪽 앞 2층, 왼쪽 뒤 3층, 오른쪽 뒤 1층이에요. 쌓기나무의 수와, 오른쪽 옆에서 본 모양의 왼쪽 줄·오른쪽 줄 층수는?','7개, 왼쪽 2층·오른쪽 3층',[['4개, 왼쪽 2층·오른쪽 3층','G6-09'],['7개, 왼쪽 3층·오른쪽 2층','G6-16'],['7개, 왼쪽 2층·오른쪽 1층',null]]], ['위에서 본 모양은 가로 2칸·세로 2칸이고, 앞과 오른쪽 옆에서 본 모양은 모두 왼쪽 2층·오른쪽 2층이에요. 이렇게 쌓을 때 쌓기나무는 가장 적게 몇 개, 가장 많게 몇 개일까요?','가장 적게 6개, 가장 많게 8개',[['가장 적게 8개, 가장 많게 8개','G6-10'],['가장 적게 4개, 가장 많게 8개',null]]]);
B('S6-75', ['반지름 3 cm인 원(넓이 27 cm²)을 키워 지름 12 cm인 원을 만들었어요(원주율 3). 원주율은 어떻게 되고, 큰 원의 넓이는 얼마일까요?','원주율은 그대로, 108 cm²',[['원주율도 2배, 108 cm²','G6-11'],['원주율은 그대로, 54 cm²','G6-13'],['원주율은 그대로, 36 cm²','G6-12'],['원주율은 그대로, 432 cm²','G3-04']]]);
B('S6-62', ['밑면의 반지름이 4 cm, 높이가 10 cm인 원기둥이 있어요(원주율 3.1). 모서리의 수와, 전개도에서 옆면 직사각형의 가로는?','0개, 24.8 cm',[['0개, 8 cm','G6-14'],['2개, 24.8 cm','G6-15'],['0개, 49.6 cm','G6-12'],['0개, 12.4 cm','G3-04']]]);

/* ---------- 3-21. 한 문제로 여러 조각을 가르는 문항(4~5지선다) — 변화와 관계·자료와 가능성 (Gemini 작성, Claude가 검산·코드 맞춤) ---------- */
Object.assign(MIS, {
'R6-15':['비례식에서 외항(내항)의 곱만 구하고 나누지 않음','외항의 곱과 내항의 곱이 같아요. 곱을 구한 뒤 나머지 수로 나눠요.'],
'R6-16':['비례배분에서 한 몫의 크기만 구하고 자기 몫을 곱하지 않음','전체를 비의 합으로 나눈 뒤 자기 비만큼 곱해요.'],
'D4-04':['오른 것과 내린 것을 가리지 않고 변화 폭만 봄','올라갔는지 내려갔는지 먼저 봐요.'],
'D5-09':['가능성을 전체 개수 분의 1로 씀','모두 같은 색이면 반드시 그 색이 나와요. 가능성은 1이에요.'],
'D6-06':['원 전체의 중심각을 180°로 계산','원 전체는 360°예요.'],
});
B('S5-01', ['○, △, □, ☆, ○, △ 다음에 올 모양은?','□',[['△','R1-01'],['○','R1-02'],['☆',null]]]);
B('S5-03', ['7, 17, 27, 37은 어떤 규칙으로 놓여 있을까요?','10씩 커진다',[['1씩 커진다','N4-15'],['10씩 작아진다','N1-01'],['7씩 커진다',null]]]);
B('S5-08', ['1, 3, 9, 27 다음에 올 수는?','81',[['45','R4-01'],['29','R4-03'],['30','N2-05']]]);
B('S5-09', ['25 + 8 = □ + 7에서 □에 알맞은 수는?','26',[['33','R4-02'],['40',null],['18',null]]]);
B('S5-12', ['□가 1, 2, 3일 때 △는 4, 8, 12예요. 알맞은 식은?','△ = □ × 4',[['□ = △ × 4','R5-01'],['△ = □ + 3','R5-02'],['△ = □ + 4','R4-01']]], ['동생이 2살일 때 형은 6살, 동생이 3살일 때 형은 7살이에요. 동생이 10살일 때 형은 몇 살일까요?','14살',[['30살','R5-03'],['6살','R5-01'],['8살','R4-01'],['16살',null]]]);
B('S5-16', ['소금 30 g을 물 120 g에 녹였어요. 소금물에 대한 소금의 비율은 몇 %일까요?','20%',[['25%','R6-08'],['2%','R6-04'],['90%','R6-02'],['5%','R6-01']]], ['2000원인 공책을 30% 할인해서 팔아요. 얼마를 내야 할까요?','1400원',[['600원','R6-07'],['1940원','R6-04'],['2600원','N1-03'],['1700원',null]]]);
B('S5-20', ['4 : 6 = □ : 12에서 □에 알맞은 수는?','8',[['10','R6-10'],['18','R6-12'],['48','R6-15'],['4',null]]]);
B('S5-21', ['사탕 30개를 지수와 민호가 2 : 3으로 나눠요. 지수가 받는 사탕은 몇 개일까요?','12개',[['15개','R6-13'],['20개','R6-03'],['18개','R6-01'],['6개','R6-16']]]);
B('S4-05', ['좋아하는 과일이 사과 5명, 포도 3명, 귤 9명이에요. 가장 많은 과일은 가장 적은 과일보다 몇 명 더 많을까요?','6명',[['12명','N1-03'],['9명',null],['17명',null]]]);
B('S4-08', ['그림그래프에서 큰 동그라미는 10명, 작은 동그라미는 1명이에요. 큰 동그라미 3개와 작은 동그라미 5개는 몇 명일까요?','35명',[['8명','D3-01'],['53명','N4-09'],['305명','N4-18'],['18명',null]]]);
B('S4-10', ['막대그래프에서 작은 눈금 5칸이 25명이에요. 작은 눈금 7칸 높이의 막대는 몇 명일까요?','35명',[['7명','D4-01'],['12명','N2-05'],['27명',null]]]);
B('S4-12', ['0과 30 사이를 물결선으로 줄인 꺾은선그래프에서 30 위로 한 칸은 2 L예요. 30 위로 4칸 올라간 점은 몇 L일까요?','38 L',[['8 L','D4-02'],['34 L','D4-01'],['22 L','N1-03']]]);
B('S4-11', ['낮 기온이 1일 10도, 2일 16도, 3일 19도, 4일 17도, 5일 8도예요. 기온이 가장 많이 올라간 때는?','1일과 2일 사이',[['2일과 3일 사이','D4-03'],['4일과 5일 사이','D4-04'],['3일과 4일 사이',null]]]);
B('S4-16', ['4일 동안 읽은 책이 8권, 0권, 14권, 14권이에요. 하루 평균 몇 권을 읽었을까요?','9권',[['12권','D5-08'],['7권','D5-02'],['14권','D5-01'],['36권','D5-04']]]);
B('S4-18', ['파란 구슬만 5개 든 통에서 1개를 꺼낼 때, 파란 구슬이 나올 가능성을 수로 나타내면?','1',[['2분의 1','D5-05'],['0','D5-06'],['5','D5-07'],['5분의 1','D5-09']]]);
B('S4-21', ['200명을 조사한 띠그래프에서 운동이 눈금 35에서 60까지 차지해요. 운동을 고른 학생은 몇 명일까요?','50명',[['25명','D6-01'],['120명','D6-03'],['5명','R6-04'],['70명',null]]], ['200명을 조사한 원그래프에서 독서가 60명이에요. 독서의 중심각은 몇 도일까요?','108°',[['30°','D6-04'],['60°','D6-01'],['10.8°','R6-04'],['54°','D6-06']]]);

/* ===== 3-22. 그림 고르기(밀기·뒤집기·돌리기): 오답 그림마다 오개념 코드, 5지선다까지 ===== */
Object.assign(MIS,{
'G4-15':['밀면 도형의 방향이 바뀐다고 봄','밀기는 위치만 바뀌고 모양과 방향은 그대로예요.'],
'G4-16':['뒤집어도 모양이 그대로라고 봄','뒤집으면 거울에 비친 것처럼 방향이 반대가 돼요.'],
'G4-17':['같은 방향으로 두 번 뒤집으면 처음과 같아짐을 모름','한 번 뒤집고 또 뒤집으면 처음 모양으로 돌아와요.']});
function tQ5(q,f,correct,wrongs){ const ck=tKey(correct), seen=new Set([ck]), ws=[]; for(const [g,c] of shuffle(wrongs.slice())){ const k=tKey(g); if(seen.has(k)) continue; seen.add(k); ws.push([g,c]); if(ws.length>=4) break; }
  if(ws.length<2) return null; const all=[correct,...ws.map(w=>w[0])], order=shuffle(all.map((_,i)=>i)), labs=['가','나','다','라','마'].slice(0,all.length), ans=labs[order.indexOf(0)];
  const vis=`<div class="tfrow">${tFig(f,'',true)}<span class="tarrow">→ ?</span></div><div class="tfrow" style="flex-wrap:wrap;gap:8px">${order.map((k,j)=>tFig(all[k],labs[j])).join('')}</div>`;
  const r=C36(WHO(),q,q,vis,ans,labs.slice()); r.mis={}; order.forEach((k,j)=>{ if(k>0) r.mis[labs[j]]=ws[k-1][1]; }); return r; }
const tA=(f,fn)=>tApply(f,fn), tRk=k=>c=>tRot(c,k);
const _rep=(ep,re,f)=>{ const i=G36[ep].findIndex(g=>{ try{ const q=g(); return q&&!q.manip&&re.test(q.q||''); }catch(e){ return false; } }); if(i>=0) G36[ep][i]=f; };   /* 조작 문제는 그대로 두고, 그림 고르기 틀만 찾아 바꾼다 */
_rep('S6-22',/밀면 어떤 모양/,tGen(()=>{ const f=tRand(), d=rndPick('오른쪽','왼쪽','위쪽','아래쪽'); return tQ5(`이 도형을 ${d}으로 밀면 어떤 모양이 될까요?`,f,f,[[tA(f,tLR),'G4-15'],[tA(f,tUD),'G4-15'],[tA(f,tRk(1)),'G4-15'],[tA(f,tRk(2)),'G4-15']]); }));
_rep('S6-23',/으로 뒤집으면\?/,tGen(()=>{ const f=tRand(), lr=rnd(0,1); return tQ5(`이 도형을 ${lr?'오른쪽(또는 왼쪽)':'아래쪽(또는 위쪽)'}으로 뒤집으면?`,f,tA(f,lr?tLR:tUD),[[tA(f,lr?tUD:tLR),'G4-14'],[tA(f,tRk(1)),'G4-04'],[tA(f,tRk(2)),'G4-04'],[f,'G4-16']]); }));
_rep('S6-23',/두 번 뒤집으면/,tGen(()=>{ const f=tRand(); return tQ5('오른쪽으로 두 번 뒤집으면?',f,f,[[tA(f,tLR),'G4-17'],[tA(f,tUD),'G4-14'],[tA(f,tRk(2)),'G4-04'],[tA(f,tRk(1)),'G4-04']]); }));
_rep('S6-24',/^이 도형을 시계 방향으로/,tGen(()=>{ const f=tRand(), k=rnd(1,3); const ws=k===2?[[tA(f,tRk(1)),'G4-13'],[tA(f,tRk(3)),'G4-13']]:[[tA(f,tRk(4-k)),'G4-10'],[tA(f,tRk(2)),'G4-13']]; return tQ5(`이 도형을 시계 방향으로 ${k*90}° 돌리면?`,f,tA(f,tRk(k)),[...ws,[tA(f,tLR),'G4-04'],[tA(f,tUD),'G4-04']]); }));
_rep('S6-24',/^시계 반대 방향으로 90° 돌리면/,tGen(()=>{ const f=tRand(); return tQ5('시계 반대 방향으로 90° 돌리면?',f,tA(f,tRk(3)),[[tA(f,tRk(1)),'G4-10'],[tA(f,tRk(2)),'G4-13'],[tA(f,tLR),'G4-04'],[tA(f,tUD),'G4-04']]); }));

/* ===== 3-23. 그림 고르기(합동·선대칭·점대칭): 오답 그림마다 오개념 코드 ===== */
Object.assign(MIS,{
'G5-14':['모양이 같으면 크기가 달라도 합동이라고 봄','합동은 모양과 크기가 모두 같아 완전히 겹쳐요.'],
'G5-15':['대칭인 쪽을 뒤집거나 돌리지 않고 그대로 옮겨 그림','선대칭은 접은 것처럼 반대로, 점대칭은 반 바퀴 돌린 것처럼 그려요.']});
/* 합동인 도형 고르기: 크게·작게 닮은 도형(G5-14), 넓이만 같은 도형(G5-07) */
(()=>{ const i=G36['S6-52'].findIndex(g=>{ try{ return /합동인 도형은 어느 것/.test(g().q||''); }catch(e){ return false; } }); if(i<0) return;
  G36['S6-52'][i]=()=>{ const T=mkTri(); const xs=T.P.map(p=>p[0]), ys=T.P.map(p=>p[1]), ext=Math.max(...xs)-Math.min(...xs), eyt=Math.max(...ys)-Math.min(...ys), s=60/Math.max(ext,eyt);
    const make=k=>{ let P=T.P.map(([x,y])=>k===1?[x*1.35,y*1.35]:k===2?[x*.68,y*.68]:[x,y]); if(k===3) P=P.map(([x,y],j)=>j===0?[x+(x>ext/2?-1:1)*ext*.45,y]:[x,y]); const t=Math.PI/2*rnd(0,3), f=rnd(0,1)?-1:1; return P.map(([x,y])=>[f*x*Math.cos(t)-y*Math.sin(t),f*x*Math.sin(t)+y*Math.cos(t)]); };
    const place=(P,cx,cy)=>{ const X=P.map(p=>p[0]*s), Y=P.map(p=>p[1]*s), ox=cx-(Math.max(...X)+Math.min(...X))/2, oy=cy-(Math.max(...Y)+Math.min(...Y))/2; return P.map(([x,y])=>[x*s+ox,y*s+oy]); };
    const pg=(Q,fill,st)=>`<polygon points="${Q.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/>`;
    const order=shuffle([0,1,2,3]), labs=['가','나','다','라'], code=[null,'G5-14','G5-14','G5-07'];
    let g=pg(place(T.P,180,50),'#FFE3B0','#6B3E1C')+`<line x1="10" y1="104" x2="350" y2="104" stroke="#EADBC8" stroke-dasharray="4 4"/>`;
    order.forEach((k,j)=>{ const cx=48+j*88; g+=pg(place(make(k),cx,170),'#DCEEFF','#2F6E9E')+`<text x="${cx}" y="252" font-size="17" font-weight="700" text-anchor="middle" fill="#2E2620">${labs[j]}</text>`; });
    const r=C36(WHO(),'위 삼각형과 합동인 도형은 어느 것일까요?','위 삼각형과 합동인 도형은 어느 것일까요?',svgWrap(g,262),labs[order.indexOf(0)],labs.slice()); r.mis={}; order.forEach((k,j)=>{ if(k) r.mis[labs[j]]=code[k]; }); return r; }; })();
/* 대칭이 되도록 완성한 그림 고르기: 8×4 칸, 왼쪽 절반이 주어짐 */
const symFig=(cells,o,u)=>{ const W=8*u, H=4*u; let g=''; for(let k=0;k<=8;k++) g+=`<line x1="${k*u}" y1="0" x2="${k*u}" y2="${H}" stroke="#E5D3B5"/>`; for(let k=0;k<=4;k++) g+=`<line x1="0" y1="${k*u}" x2="${W}" y2="${k*u}" stroke="#E5D3B5"/>`;
  cells.forEach(([x,y,n])=>{ g+=`<rect x="${x*u}" y="${y*u}" width="${u}" height="${u}" fill="${n?'#8CC0E8':'#F2A65A'}" stroke="#7A4A1E" stroke-width="1.5"/>`; });
  g+=o.axis?`<line x1="${W/2}" y1="-3" x2="${W/2}" y2="${H+3}" stroke="#D43D2A" stroke-width="2.5" stroke-dasharray="5 4"/>`:`<circle cx="${W/2}" cy="${H/2}" r="${u*.28}" fill="#D43D2A"/>`;
  return `<div class="tf"><svg viewBox="-3 -4 ${W+6} ${H+8}" width="${W+6}" height="${H+8}">${g}</svg>${o.label?`<b>${o.label}</b>`:''}</div>`; };
function symQ(axis){ for(let t=0;t<60;t++){ const half=[]; for(let y=0;y<4;y++) for(let x=1;x<4;x++) if(Math.random()<.42) half.push([x,y]); if(half.length<4||half.length>7||!half.some(c=>c[0]===3)) continue;
    const mir=half.map(([x,y])=>[7-x,y,1]), rot=half.map(([x,y])=>[7-x,3-y,1]), mov=half.map(([x,y])=>[x+3,y,1]), far=(axis?mir:rot).map(([x,y])=>[x+1,y,1]);
    const cor=axis?mir:rot, ws=[[axis?rot:mir,'G5-05'],[mov,'G5-15'],[far,'G5-10']], key=c=>c.map(v=>v[0]+','+v[1]).sort().join('|'), ks=[cor,...ws.map(w=>w[0])].map(key);
    if(new Set(ks).size<4||far.some(c=>c[0]>7)) continue;
    const all=[cor,...ws.map(w=>w[0])], order=shuffle([0,1,2,3]), labs=['가','나','다','라'], H=half.map(c=>[c[0],c[1]]);
    const q=axis?'점선을 대칭축으로 하는 선대칭도형이 되게 완성한 것은?':'빨간 점을 대칭의 중심으로 하는 점대칭도형이 되게 완성한 것은?';
    const vis=`<div class="tfrow">${symFig(H,{axis},20)}<span class="tarrow">→ ?</span></div><div class="tfrow" style="flex-wrap:wrap;gap:8px">${order.map((k,j)=>symFig([...H,...all[k]],{axis,label:labs[j]},16)).join('')}</div>`;
    const r=C36(WHO(),q,q,vis,labs[order.indexOf(0)],labs.slice()); r.mis={}; order.forEach((k,j)=>{ if(k) r.mis[labs[j]]=ws[k-1][1]; }); return r; } return null; }
G36['S6-54'].push(()=>symQ(1)||G36['S6-54'][0]()); G36['S6-55'].push(()=>symQ(0)||G36['S6-55'][0]());

/* ===== 3-24. 코드 없던 객관식 가운데 오답의 뜻이 뚜렷한 것 ===== */
TX('S6-29#2',{'예각삼각형':'G4-09'},/두 각이/); TX('S3-42#0',o=>'N4-07',/(억|조)[이가] \d+개인 수/); TX('S3-42#1',o=>'N4-08',/읽으면/);

/* ===== 3-25. 5지선다로 넓히기: 3-1 분수와 소수 (Claude·Gemini 교차 검토, 직접 검산) ===== */
Object.assign(MIS,{
'N3-40':['분모와 분자의 자리를 바꿔 앎','아래가 분모(전체를 나눈 수), 위가 분자(그중 몇 개)예요.'],
'N3-41':['분모가 같을 때 분자가 작을수록 크다고 봄','분모가 같으면 분자가 큰 분수가 더 커요.'],
'N3-42':['수직선에서 시작 수를 빠뜨리고 0부터 읽음','2와 3 사이라면 2에서 시작해 2.1, 2.2로 읽어요.']});
B('S3-18', ['끈을 똑같이 7조각으로 나눈 것 중 2조각을 썼어요. 쓴 끈은 전체의 얼마일까요?','7분의 2',[['7분의 5','N3-16'],['5분의 2','N3-17'],['7분의 1','N3-39'],['2분의 1','N3-05']]],
  ['8분의 3에 대한 설명으로 옳은 것은?','8분의 1이 3개인 수이다',[['분모는 3이고 분자는 8이다','N3-40'],['크기가 다른 8조각 중 3조각이다','N3-05'],['8분의 5보다 큰 분수이다','N3-41']]]);
B('S3-20', ['8분의 1과 4분의 1 중 더 큰 분수, 5분의 3과 5분의 2 중 더 큰 분수를 차례로 쓰면?','4분의 1, 5분의 3',[['8분의 1, 5분의 3','N3-06'],['4분의 1, 5분의 2','N3-41'],['같다, 5분의 3','N3-24'],['8분의 1, 5분의 2','F']]]);
B('S3-21', ['3 cm 5 mm는 몇 cm일까요?','3.5 cm',[['35 cm','N3-27'],['3.05 cm','N3-28'],['8 cm','F'],['5.3 cm',null]]],
  ['1이 2개, 0.1이 15개인 수는?','3.5',[['2.15','N3-08'],['2.5','N2-01'],['17','N3-29'],['35','F']]],
  ['2와 3 사이를 똑같이 10칸으로 나눈 수직선에서 2에서 오른쪽으로 4칸 간 곳의 수는?','2.4',[['0.4','N3-42'],['2.5','G2-09'],['2.6','F'],['3.4',null]]]);

/* ===== 3-26. 5지선다로 넓히기: 4-1 큰 수, 5-1 약수와 배수 (직접 검산) ===== */
Object.assign(MIS,{'N5-19':['약수를 곱셈 짝으로 찾지 않아 일부를 빠뜨림','1×36, 2×18, 3×12처럼 짝을 지어 빠짐없이 찾아요.']});
B('S3-42', ['이억 오백삼만을 수로 바르게 쓴 것은?','205030000',[['2530000','N4-01'],['20503000','N4-07'],['205300000','N4-09'],['20503','N4-08']]],
  ['1000억이 20개인 수는?','2조',[['2000억','N4-07'],['1020억','N2-05'],['20조','F']]]);
B('S3-40', ['759380에서 만의 자리 숫자가 나타내는 값은?','50000',[['5','N4-15'],['80000','N4-09'],['9000','F']]]);
B('S3-44', ['56820보다 크고 58100보다 작은 수는?','57040',[['5704','N4-10'],['56790','N3-37'],['58300','F']]]);
B('S3-68', ['36의 약수는 모두 몇 개일까요?','9개',[['7개','N5-10'],['5개','N5-19'],['셀 수 없이 많다','N5-02'],['10개','F']]]);
B('S3-70', ['28 = 4 × 7을 보고 바르게 말한 것은?','28은 4와 7의 배수이다',[['28은 4와 7의 약수이다','N5-02'],['28의 약수는 4와 7뿐이다','N5-19'],['7은 4의 배수이다','F']]]);
B('S3-71', ['공책 20권과 연필 32자루를 남김없이 똑같이, 될 수 있는 대로 많은 학생에게 나누어 주려고 해요. 몇 명에게 줄 수 있을까요?','4명',[['2명','N5-12'],['160명','N5-02'],['20명','N5-11'],['52명','F']]]);
B('S3-72', ['8과 12의 최소공배수는?','24',[['96','N5-12'],['4','N5-02'],['16','N5-11'],['20','F']]],
  ['6과 9의 공배수 가운데 40에 가장 가까운 수는?','36',[['54','N5-12'],['42','N5-11'],['3','N5-02'],['18','F']]]);

/* ===== 3-27. 5지선다로 넓히기: 4-2 삼각형·사각형·다각형, 5-1 둘레와 넓이 (직접 검산) ===== */
Object.assign(MIS,{
'G4-18':['이등변삼각형에서 두 밑각이 같다는 성질을 쓰지 않음','꼭지각을 뺀 나머지를 똑같이 둘로 나누면 한 밑각이에요.'],
'G4-19':['한 꼭짓점에서 긋는 대각선 수와 전체 대각선 수를 혼동','한 꼭짓점에서는 자기와 이웃한 두 꼭짓점을 뺀 만큼만 그을 수 있어요.'],
'G5-16':['2로 나누지 않아도 되는 넓이를 2로 나눔','÷ 2는 삼각형·마름모·사다리꼴처럼 직사각형의 절반일 때만 해요.']});
B('S6-28', ['꼭지각이 40°인 이등변삼각형의 한 밑각은 몇 도일까요?','70°',[['140°','G4-18'],['160°','G4-12'],['100°','F']]]);
B('S6-29', ['두 각이 40°, 45°인 삼각형에 대한 설명으로 옳은 것은?','한 각이 95°인 둔각삼각형이다',[['예각이 2개 있으므로 예각삼각형이다','G4-09'],['한 각이 95°인 예각삼각형이다','G4-07'],['한 각이 85°인 예각삼각형이다','F']]]);
B('S6-32', ['육각형의 한 꼭짓점에서 그을 수 있는 대각선은 모두 몇 개일까요?','3개',[['5개','G4-06'],['9개','G4-19'],['4개','F']]]);
B('S6-30', ['네 각이 직각이 아닌 마름모의 두 대각선에 대한 설명으로 옳은 것은?','서로 수직으로 만나고 서로를 똑같이 둘로 나눈다',[['두 대각선의 길이가 같다','G4-06'],['서로 수직으로 만나지 않는다','G4-03'],['대각선을 4개 그을 수 있다','F']]]);
B('S6-69', ['가로 300 cm, 세로 200 cm인 직사각형 돗자리의 넓이는 몇 m²일까요?','6 m²',[['600 m²','G5-04'],['60000 m²','N3-27'],['10 m²','G5-01'],['5 m²','F']]]);
B('S6-70', ['밑변이 9 cm, 옆의 변이 7 cm이고 높이가 6 cm인 평행사변형의 넓이는?','54 cm²',[['63 cm²','G5-02'],['32 cm²','G5-01'],['27 cm²','G5-16']]]);
B('S6-71', ['넓이가 36 cm²이고 밑변이 9 cm인 삼각형의 높이는?','8 cm',[['4 cm','G5-03'],['27 cm','N3-11'],['2 cm','F']]]);
B('S6-72', ['한 변이 5 cm이고 두 대각선이 6 cm, 8 cm인 마름모의 넓이는?','24 cm²',[['48 cm²','G5-03'],['20 cm²','G5-01'],['25 cm²','G5-02'],['7 cm²','F']]]);

/* ===== 3-28. 5지선다로 넓히기: 4-2 분수의 덧셈과 뺄셈, 소수의 덧셈과 뺄셈 (직접 검산) ===== */
B('S3-52', ['8분의 5 + 8분의 6을 계산하여 대분수로 나타내면?','1과 8분의 3',[['16분의 11','N4-04'],['1과 8분의 1','N4-05'],['8분의 11','N4-26'],['8분의 1','N1-03']]]);
B('S3-53', ['1 − 7분의 5를 계산하면?','7분의 2',[['7분의 5','N4-05'],['7분의 4','N2-02'],['1과 7분의 2','F']]]);
B('S3-55', ['5 − 2와 7분의 4를 계산하면?','2와 7분의 3',[['3과 7분의 3','N2-08'],['2와 7분의 6','N4-05'],['3과 7분의 4','F']]],
  ['우유가 1과 7분의 1 L 있었어요. 얼마를 마셨더니 7분의 5 L가 남았어요. 마신 우유는 몇 L일까요?','7분의 3 L',[['1과 7분의 6 L','N1-03'],['1과 7분의 4 L','N2-02'],['7분의 2 L','N4-27'],['1과 7분의 3 L','F']]]);
B('S3-58', ['나타내는 수가 가장 큰 것은?','0.1이 24개인 수',[['2.38','N3-08'],['0.01이 95개인 수','N3-37'],['1이 2개, 0.01이 7개인 수','N4-01'],['0.594','N4-02']]]);
B('S3-62', ['6.5 − 2.18을 계산하면?','4.32',[['4.48','N4-25'],['4.42','N2-08'],['4.13','N3-08'],['1.53','N4-03']]],
  ['4.03 − 1.58을 계산하면?','2.45',[['2.55','N2-04'],['3.45','N2-08'],['3.55','N2-02'],['5.61','N1-03']]]);

/* ===== 3-29. 5지선다로 넓히기: 5-1 약분과 통분·분모가 다른 분수의 덧뺄셈, 5-2 분수·소수의 곱셈 (직접 검산) ===== */
B('S3-76', ['4분의 3과 6분의 5를 가장 작은 공통분모로 통분하면?','12분의 9, 12분의 10',[['24분의 18, 24분의 20','N5-12'],['12분의 3, 12분의 5','N5-13'],['12분의 11, 12분의 11','N5-03'],['12분의 6, 12분의 15','F']]]);
B('S3-74', ['7분의 3의 분모에 14를 더했어요. 크기가 변하지 않으려면 분자에 얼마를 더해야 할까요?','6',[['14','N5-03'],['2','N5-13'],['9','F']]]);
B('S3-81', ['15분의 7 − 6분의 1을 계산하여 기약분수로 나타내면?','10분의 3',[['30분의 9','N5-12'],['9분의 6','N5-04'],['30분의 6','N5-13'],['30분의 19','N1-03']]]);
B('S3-80', ['1과 3분의 2 + 2와 4분의 3을 계산하면?','4와 12분의 5',[['3과 7분의 5','N5-04'],['3과 12분의 5','N2-01'],['4와 12분의 7','N4-05'],['3과 24분의 17','N4-04']]]);
B('S3-91', ['리본 7분의 5 m의 3분의 2를 썼어요. 쓴 리본은 몇 m일까요?','21분의 10 m',[['21분의 5 m','N3-39'],['10분의 7 m','N5-04'],['3분의 2 m','F']]]);
B('S3-92', ['3과 5분의 1 × 1과 3분의 1을 계산하면?','4와 15분의 4',[['3과 15분의 1','N5-06'],['15분의 8','N3-35'],['6과 15분의 4','F']]]);
B('S3-94', ['15 × 0.04를 계산하면?','0.6',[['0.06','N5-07'],['60','N3-08'],['15.04','N2-05'],['6','F']]]);
B('S3-95', ['1.4 × 0.06을 계산하면?','0.084',[['0.84','N5-17'],['8.4','N5-07'],['0.064','N3-14'],['1.46','N2-05']]],
  ['1 L로 3.2 km를 달리는 자동차가 휘발유 0.4 L로 달릴 수 있는 거리는?','1.28 km',[['8 km','N6-06'],['12.8 km','N5-07'],['3.6 km','N2-05'],['2.8 km','F']]]);

/* ===== 3-30. 전수 검증에서 나온 결함: 점대칭 대응각 문제가 가끔 정답 없이 만들어짐 → 정답이 수로 나올 때까지 다시 만든다 ===== */
(()=>{ const ep='S6-55', i=G36[ep].findIndex(g=>{ try{ const q=g(); return q&&/점대칭도형이에요\. 각/.test(q.q||''); }catch(e){ return false; } }); if(i<0) return; const old=G36[ep][i];
  G36[ep][i]=()=>{ for(let t=0;t<12;t++){ const q=old(); if(q&&/^\d+$/.test(String(q.ans))&&+q.ans>0&&+q.ans<360) return q; } return old(); }; })();

/* ===== 3-31. 5지선다로 넓히기: 6학년 분수의 나눗셈, 소수의 나눗셈 (직접 검산) ===== */
B('S3-99', ['2와 5분의 2 ÷ 4를 계산하면?','5분의 3',[['2와 10분의 1','N5-06'],['5분의 1','N3-35'],['9와 5분의 3','N6-04'],['1과 3분의 2','N6-02']]]);
B('S3-105', ['주스 8분의 7 L를 한 컵에 4분의 1 L씩 가득 채워 담아요. 채울 수 있는 컵 수와 남는 주스는?','3컵, 8분의 1 L',[['3컵, 2분의 1 L','N6-05'],['4컵, 0 L','N6-10'],['7컵, 0 L','N5-13'],['2컵, 8분의 3 L','F']]]);
B('S3-100', ['4.5 ÷ 18을 계산하면?','0.25',[['2.5','N6-07'],['4','N6-06'],['25','N3-08'],['0.29','F']]]);
B('S3-109', ['넓이가 4.32 m²이고 가로가 0.4 m인 직사각형의 세로는?','10.8 m',[['1.8 m','N6-08'],['1.08 m','N6-07'],['1.728 m','N6-12'],['108 m','F']]]);
B('S3-108', ['1.5 ÷ 0.06을 계산하면?','25',[['2.5','N6-07'],['0.04','N6-06'],['0.25','F']]]);
B('S3-111', ['17 ÷ 7의 몫을 반올림하여 소수 둘째 자리까지 나타내면?','2.43',[['2.4','N5-14'],['2.42','N6-10'],['24.3','N6-07'],['2.428','F']]]);
B('S3-112', ['참기름 4.2 L를 한 병에 0.8 L씩 가득 채워 담아요. 채울 수 있는 병 수와 남는 참기름은?','5병, 0.2 L',[['5병, 2 L','N6-09'],['5병, 0.25 L','N6-05'],['6병, 0 L','N6-10'],['4병, 1 L','F']]]);

/* ===== 3-31b. 4~5지선다 넓히기: 3-2 원, 5-2 직육면체 (직접 검산) ===== */
Object.assign(MIS,{
'G3-09':['한 원에서 반지름(지름)의 길이가 모두 같음을 모름','한 원에서는 어느 쪽으로 그어도 반지름끼리, 지름끼리 길이가 같아요.'],
'G3-10':['맞닿은 원에서 중심 사이의 거리와 전체 길이를 혼동','중심에서 중심까지는 바깥쪽 반지름을 빼고 세어요.'],
'G5-17':['정육면체는 직육면체가 아니라고 봄','정육면체도 직사각형(정사각형) 6개로 둘러싸여 있으니 직육면체예요.']});
B('S6-26', ['원의 중심 ㅇ과 원 위의 한 점을 이은 선분이 6 cm예요. 원 위의 두 점을 이은 선분 가운데 가장 긴 것은 몇 cm일까요?','12 cm',[['6 cm','G3-04'],['알 수 없다','G3-09'],['3 cm','F']]],
  ['원 가는 반지름이 9 cm이고, 원 나는 지름이 16 cm예요. 두 원의 지름의 차는?','2 cm',[['7 cm','G3-04'],['34 cm','N1-03'],['1 cm','F']]],
  ['반지름이 5 cm인 원 3개가 한 줄로 맞닿아 있어요. 양 끝 두 원의 중심 사이의 거리는?','20 cm',[['30 cm','G3-10'],['15 cm','G3-04'],['10 cm','F']]]);
B('S6-56', ['직육면체에서 면과 면이 만나는 선분은 모두 몇 개일까요?','12개',[['8개','G5-11'],['9개','G5-06'],['6개','F']]],
  ['직육면체에서 서로 평행한 면은 모두 몇 쌍일까요?','3쌍',[['1쌍','G4-03'],['4쌍','G4-08'],['6쌍','F']]],
  ['정육면체에 대한 설명으로 옳은 것은?','정육면체는 직육면체라고 할 수 있다',[['정육면체는 직육면체가 아니다','G5-17'],['한 면과 수직으로 만나는 면은 5개이다','G4-08'],['직육면체보다 모서리의 수가 적다','F']]]);
B('S6-58', ['밑면이 가로 5 cm, 세로 3 cm이고 높이가 9 cm인 직육면체의 전개도에서, 옆면 4개를 옆으로 이어 붙인 큰 직사각형의 가로는?','16 cm',[['8 cm','G5-06'],['15 cm','G5-01'],['20 cm','F']]]);

/* ===== 3-31c. 4~5지선다 넓히기: 4-2 수직과 평행, 6-2 원기둥·원뿔·구 (직접 검산) ===== */
Object.assign(MIS,{
'G4-20':['평행선 중 한 직선에 수직이면 다른 직선에도 수직임을 모름','평행한 두 직선은 기울기가 같아서, 한쪽에 수직인 선은 다른 쪽에도 수직이에요.'],
'G6-19':['입체도형을 자른 면(단면)의 모양을 잘못 떠올림','구는 어디를 잘라도 자른 면이 원이에요.']});
B('S6-20', ['떨어져 있는 두 선분을 곧게 늘였더니 만나서 90°를 이루었어요. 두 선분의 관계는?','서로 수직이다',[['서로 평행하다','G4-08'],['가로와 세로 방향일 때만 수직이다','G4-03'],['길이가 같아야 수직이다','G3-01'],['수직도 평행도 아니다','F']]],
  ['윗변과 아랫변이 평행한 사다리꼴에서 왼쪽 변은 아랫변과 직각으로, 오른쪽 변은 아랫변과 60°로 만나요. 이 도형을 비스듬히 돌려 놓으면 직각은 몇 개일까요?','2개',[['0개','G3-02'],['1개','G4-20'],['4개','F']]]);
B('S6-62', ['가로 5 cm, 세로 8 cm인 직사각형 종이를 세로 변을 축으로 한 바퀴 돌려 원기둥을 만들었어요. 이 원기둥을 앞에서 본 모양의 가로와 세로는?','가로 10 cm, 세로 8 cm',[['가로 5 cm, 세로 8 cm','G3-04'],['가로 30 cm, 세로 8 cm','G6-14'],['가로 16 cm, 세로 5 cm','F']]]);
B('S6-63', ['밑면의 반지름이 6 cm, 꼭짓점에서 밑면 둘레까지 이은 선분이 10 cm, 꼭짓점에서 밑면에 수직으로 내린 선분이 8 cm인 원뿔이 있어요. 밑면의 지름, 높이, 꼭짓점의 수를 차례로 쓰면?','12 cm, 8 cm, 1개',[['12 cm, 10 cm, 1개','G6-04'],['6 cm, 8 cm, 1개','G3-04'],['12 cm, 8 cm, 0개','F']]],
  ['반지름이 7 cm인 구를 똑같이 반으로 잘랐어요. 자른 면의 모양과 그 지름은?','원, 14 cm',[['반원, 14 cm','G6-19'],['원, 7 cm','G3-04'],['구, 14 cm','F']]]);

/* ===== 3-31d. 4지선다 넓히기: 1~2학년 시각과 시간, 길이 재기 (한 문장, 직접 검산) ===== */
Object.assign(MIS,{
'G2-11':['오전에서 오후로 넘어가는 시간을 12시를 거쳐 세지 못함','오전 9시에서 낮 12시까지, 다시 12시에서 오후 2시까지 나누어 세어요.'],
'G2-12':['하루를 12시간으로 앎','시계는 하루에 두 바퀴 돌아요. 하루는 24시간이에요.'],
'G2-13':['m는 m끼리, cm는 cm끼리 계산하지 않음','같은 단위끼리 더하고 빼요.']});
B('S6-11', ['1시간 25분은 모두 몇 분일까요?','85분',[['125분','G2-03'],['35분','N1-03'],['26분','F']]]);
B('S6-12', ['오전 9시부터 오후 2시까지는 몇 시간일까요?','5시간',[['7시간','G2-11'],['6시간','G2-09'],['11시간','F']]],
  ['1일 5시간은 모두 몇 시간일까요?','29시간',[['17시간','G2-12'],['15시간','G2-03'],['65시간','F']]]);
B('S6-13', ['2주일은 모두 며칠일까요?','14일',[['20일','G2-03'],['9일','N2-05'],['10일','F']]]);
B('S6-16', ['3 m 50 cm와 40 cm를 더하면 얼마일까요?','3 m 90 cm',[['43 m 50 cm','G2-13'],['3 m 10 cm','N1-03'],['93 cm','F']]],
  ['교실 문의 높이로 알맞은 것은?','약 2 m',[['약 2 cm','G3-07'],['약 200 m','N3-27'],['약 20 cm','F']]]);

/* ===== 3-31e. 4지선다 넓히기: 1~2학년 규칙 찾기, 분류하기, 표와 그래프, 모양과 비교하기 (한 문장, 직접 검산) ===== */
Object.assign(MIS,{
'R1-04':['수가 몇씩 변하는지 잘못 봄','앞뒤 수의 차를 두 군데 넘게 확인해요.'],
'N1-06':['0을 더하거나 빼면 0이 된다고 봄','0은 아무것도 없다는 뜻이라, 더하거나 빼도 수가 그대로예요.'],
'N1-07':['세면서 하나를 더 세거나 덜 셈','하나씩 짚으면서 한 번씩만 세어요.'],
'N1-08':['남은 것(모르는 부분)이 아니라 전체나 덜어 낸 수를 답함','무엇을 묻는지 다시 읽고, 남은 것만 세어요.'],
'N1-09':['이어 세기·거꾸로 세기를 처음 수부터 세어 1이 어긋남','처음 수는 이미 센 수예요. 그다음 수부터 세어요.'],
'N1-10':['묶음(십·백)과 낱개를 구별하지 않고 숫자만 더함','바구니 하나는 열 개, 상자 하나는 백 개예요.'],
'N1-12':['세 수 계산에서 한 번만 계산하고 멈춤','앞의 두 수를 계산한 다음, 남은 수까지 계산해요.'],
'N1-13':['많다·적다(크다·작다)의 방향을 혼동','무엇을 고르라고 했는지(더 큰 것, 더 작은 것) 다시 읽어요.'],
'N2-09':['곱셈구구에서 한 묶음을 더 세거나 덜 셈','몇 번 뛰었는지 손가락으로 세면서 확인해요.'],
'N2-10':['묶음의 수와 한 묶음의 크기를 혼동','몇 개씩인지, 몇 묶음인지 따로 적어 봐요.'],
'N2-11':['자리를 맞추지 않고 낱개를 묶음 자리에 더함','낱개는 낱개끼리, 묶음은 묶음끼리 더해요.'],
'N2-12':['작은 수에서 큰 수를 뺄 수 없으면 0이라고 씀','뺄 수 없으면 윗자리에서 받아내려요.'],
'G1-01':['상자·둥근기둥·공 모양의 특징(평평한 면, 둥근 면)을 구별하지 못함','평평한 면이 있는지, 잘 굴러가는지 살펴봐요.'],
'G1-02':['네모·세모·동그라미(변과 꼭짓점의 수)를 구별하지 못함','뾰족한 곳과 곧은 선이 몇 개인지 세어 봐요.'],
'G1-04':['왼쪽과 오른쪽을 혼동','밥 먹는 손, 글씨 쓰는 손이 어느 쪽인지 떠올려요.'],
'N3-43':['어림할 때 반올림하지 않고 앞자리만 읽음','가까운 몇백으로 바꿔서 어림해요. 50이 넘으면 올려요.'],
'N3-44':['어림하라는데 정확한 값을 계산해 답함','약 얼마인지 물으면 가까운 몇백으로 바꿔 계산해요.'],
'G2-14':['놓인 방향이 바뀌면 다른 모양이라고 봄','돌려 놓아도 뾰족한 곳과 곧은 선의 수는 그대로예요.'],
'G1-05':['길이나 키를 비교할 때 한쪽 끝을 맞추지 않음','한쪽 끝을 나란히 맞춘 다음, 반대쪽 끝이 더 나온 쪽이 길어요.'],
'D4-05':['두 번째·세 번째 같은 순서 조건을 놓치고 가장 큰 것을 고름','가장 긴 막대부터 차례로 짚으며 몇 번째인지 세어 보세요.'],
'G2-15':['비교한 결과를 반대로 읽음','저울은 내려간 쪽이 무겁고, 옮겨 부어 넘치면 처음 그릇이 더 많이 담겨요.'],
'G2-16':['높이나 크기 한 가지만 보고 양이 같다고 봄','높이나 크기가 같아도 담기는 양과 무게는 다를 수 있어요.']});
B('S5-05', ['25, 23, 21, □, 17에서 □에 알맞은 수는?','19',[['20','R1-04'],['23','N1-01'],['29','F']]]);
B('S5-04', ['곱셈표의 6단 줄에서 18의 바로 오른쪽 칸은 18보다 얼마 더 클까요?','6',[['1','R1-03'],['24','F']]]);
B('S4-02', ['큰 ○ 2개, 작은 ○ 4개, 큰 △ 3개를 크기에 따라 나누면 큰 모양은 모두 몇 개일까요?','5개',[['6개','D1-01'],['9개','D1-02'],['2개','F']]],
  ['○, △, ○, ★, △, ○, ○를 모양에 따라 나누면 몇 묶음이 될까요?','3묶음',[['7묶음','D1-02'],['2묶음','F']]]);
B('S4-03', ['좋아하는 동물 표에서 강아지가 6명, 합계가 15명이에요. 나머지인 고양이는 몇 명일까요?','9명',[['21명','N1-03'],['11명','N2-02'],['15명','F']]]);
B('S4-04', ['한 명에 ○를 하나씩 그린 그래프에 우유 ○○○, 주스 ○○○○○○가 있어요. 조사한 학생은 모두 몇 명일까요?','9명',[['3명','N1-03'],['2명','D1-02'],['6명','F']]]);
B('S6-03', ['○, △, □ 모양에 대해 바르게 말한 것은?','□ 모양은 곧은 선이 4개이다',[['○ 모양은 곧은 선으로 둘러싸여 있다','G2-04'],['△ 모양을 거꾸로 돌리면 △ 모양이 아니다','G2-14'],['△ 모양은 뾰족한 곳이 2개이다','F']]]);
B('S6-08', ['가득 찬 가 컵의 물을 빈 나 컵에 부었더니 넘쳤어요. 바르게 말한 것은?','가 컵에 더 많이 담긴다',[['나 컵에 더 많이 담긴다','G2-15'],['두 컵에 담기는 양이 같다','G2-16'],['가 컵이 더 높다','F']]],
  ['크기가 같은 빨간 공과 파란 공을 양팔저울에 올렸더니 빨간 공 쪽이 내려갔어요. 바르게 말한 것은?','빨간 공이 더 무겁다',[['파란 공이 더 무겁다','G2-15'],['두 공의 무게가 같다','G2-16'],['빨간 공이 더 길다','F']]]);

/* ===== 3-31f. 4~5지선다 넓히기: 5-1 규칙과 대응, 6-1 비와 비율, 6-2 비례식과 비례배분 (직접 검산) ===== */
B('S5-12', ['사탕을 한 봉지에 6개씩 담아요. 전체 사탕 수를 □, 봉지 수를 △라 할 때 알맞은 식은?','△ = □ ÷ 6',[['□ = △ ÷ 6','R5-01'],['△ = □ − 6','R5-02'],['△ = □ × 6','F']]],
  ['사과와 배를 합하여 15개 사려고 해요. 사과 수를 □, 배 수를 △라 할 때 알맞은 식은?','□ + △ = 15',[['△ = □ − 15','R5-01'],['□ × △ = 15','R5-02'],['△ = □ + 15','F']]]);
B('S5-11', ['□가 3, 4, 5일 때 △는 15, 16, 17이에요. □가 20일 때 △는?','32',[['100','R5-03'],['18','R4-01'],['8','F']]]);
B('S5-13', ['「8에 대한 5의 비」를 기호로 쓰고 기준량을 찾으면?','5 : 8, 기준량 8',[['8 : 5, 기준량 5','R6-01'],['5 : 13, 기준량 13','R6-03'],['5 : 8, 기준량 5','F']]]);
B('S5-16', ['학생 20명 가운데 8명이 안경을 썼어요. 전체 학생 수에 대한 안경을 쓴 학생 수의 백분율은?','40%',[['8%','D6-01'],['88%','R6-10'],['0.4%','R6-04'],['250%','R6-01']]]);
B('S5-15', ['자동차가 같은 빠르기로 30분 동안 45 km를 달렸어요. 1시간 동안 달리는 거리는?','90 km',[['150 km','G2-03'],['75 km','R6-10'],['22.5 km','R6-09'],['1.5 km','F']]]);
B('S5-18', ['0.3 : 0.15를 가장 간단한 자연수의 비로 나타내면?','2 : 1',[['1 : 5','N4-03'],['30 : 15','N5-12'],['1 : 2','R6-01'],['3 : 1.5','F']]]);
B('S5-20', ['페인트 6 L로 벽 8 m²를 칠해요. 같은 비율로 벽 12 m²를 칠하려면 페인트는 몇 L 필요할까요?','9 L',[['10 L','R6-10'],['16 L','R6-12'],['72 L','R6-15'],['4 L','F']]]);
B('S5-21', ['둘레가 48 cm인 직사각형의 가로와 세로의 비가 3 : 1이에요. 가로는 몇 cm일까요?','18 cm',[['8 cm','R6-13'],['6 cm','R6-16'],['36 cm','F']]]);

/* ===== 3-31g. 글 검토에서 나온 정답 결함: '오른쪽으로 a칸, 다시 왼쪽으로 b칸 → 처음보다 오른쪽으로 몇 칸?'에서 b가 a보다 크면 실제로는 왼쪽인데 오른쪽으로 물었음 → a가 b보다 크게만 만든다 ===== */
_rep('S6-25',/처음보다 오른쪽으로 몇 칸/,()=>{ const b=rnd(1,4), a=b+rnd(1,3); return WN(`점을 오른쪽으로 ${a}칸 옮긴 다음 다시 왼쪽으로 ${b}칸 옮기면, 처음 자리보다 오른쪽으로 몇 칸 간 곳에 있을까요?`,'',a-b,'','칸'); });

/* ===== 3-31h. 글 검토 7회차: 각이 180°를 넘게 나오는 대칭 도형 문제, '다리가 2개인 의자', 쌓기나무 4지선다 ===== */
(()=>{ for(const [ep,re] of [['S6-54',/선대칭도형이에요\(점선은 대칭축\)\. 각/],['S6-55',/점대칭도형이에요\. 각/]]){ const i=G36[ep].findIndex(g=>{ try{ const q=g(); return q&&re.test(q.q||''); }catch(e){ return false; } }); if(i<0) continue; const old=G36[ep][i];
    G36[ep][i]=()=>{ for(let t=0;t<20;t++){ const q=old(); if(q&&/^\d+$/.test(String(q.ans))&&+q.ans>0&&+q.ans<180) return q; } return old(); }; } })();
_rep('S5-11',/^다리가 \d+개인 의자가 있어요/,()=>{ const [thing,unit,part,k]=rndPick(['오리','마리','다리',2],['세발자전거','대','바퀴',3],['의자','개','다리',4],['개미','마리','다리',6]); const xs=[1,2,3,4,5], r=rnd(2,4);
  return WN(`${thing} 한 ${unit}의 ${part}는 ${k}개예요. ${thing} ${xs[r]}${unit}의 ${part}는 모두 몇 개일까요?`,tbl(xs,xs.map((x,i)=>i===r?'?':x*k),[thing+' 수',part+' 수']),xs[r]*k,'','개'); });
Object.assign(MIS,{'G6-20':['쌓은 개수와 가장 높은 층수를 혼동','층수는 한 자리의 높이이고, 개수는 모든 자리의 수를 더한 값이에요.']});
B('S6-65', ['위에서 본 모양의 네 자리에 쌓은 수가 2, 3, 1, 2라고 쓰여 있어요. 쌓기나무는 모두 몇 개일까요?','8개',[['4개','G6-09'],['3개','G6-20'],['12개','F']]]);
B('S6-64', ['한 줄로 놓인 세 자리에 쌓기나무를 왼쪽부터 1개, 3개, 2개 쌓았어요. 앞에서 본 모양은 왼쪽부터 몇 층일까요?','1층, 3층, 2층',[['2층, 3층, 1층','G6-16'],['1층, 1층, 1층','G6-09'],['3층, 3층, 3층','G6-20']]]);

B('S5-04', ['덧셈표에서 오른쪽으로 한 칸 갈 때마다 수는 어떻게 될까요?','1씩 커진다',[['10씩 커진다','R1-03'],['2씩 커진다','R1-04'],['1씩 작아진다','N1-01']]]);

/* ===== 3-31i. 4~5지선다 넓히기: 3-2 곱셈, 5-1 혼합 계산, 4-1 막대그래프 (직접 검산) ===== */
B('S3-24', ['207 × 4를 계산하면?','828',[['108','N4-01'],['808','N3-14'],['8028','N2-07'],['868','F']]]);
B('S3-27', ['37 × 25를 계산하면?','925',[['259','N3-03'],['635','N4-19'],['825','N2-01']]]);
B('S3-65', ['30 − 24 ÷ 2 + 4를 계산하면?','22',[['7','N5-01'],['14','N5-09'],['26','F']]]);
B('S3-66', ['36 ÷ (6 + 3) × 2를 계산하면?','8',[['18','N5-01'],['2','N5-09'],['12','F']]]);
B('S3-67', ['500원짜리 공책 2권과 400원짜리 연필 1자루를 사고 3000원을 냈어요. 거스름돈을 구하는 식은?','3000 − (500 × 2 + 400)',[['3000 − 500 × 2 + 400','N5-09'],['(3000 − 500) × 2 − 400','N5-01'],['3000 − (500 + 400) × 2','F']]]);
B('S4-09', ['모두 33명을 조사한 표에 개 12명, 토끼 6명이 적혀 있고 고양이는 지워졌어요. 눈금 한 칸이 3명인 막대그래프에서 고양이는 몇 칸으로 그릴까요?','5칸',[['15칸','D4-01'],['11칸','F'],['45칸','N4-14']]]);
B('S4-10', ['눈금 한 칸이 5권인 막대그래프에서 동화책은 9칸, 위인전은 4칸, 과학책은 6칸이에요. 가장 많은 책은 가장 적은 책보다 몇 권 더 많을까요?','25권',[['5권','D4-01'],['65권','N1-03'],['15권','F']]]);

/* ===== 3-31j. 4~5지선다 넓히기: 3-1 길이와 시간, 3-2 들이와 무게, 4-1 규칙 찾기 (직접 검산) ===== */
B('S6-37', ['508 mm는 몇 cm 몇 mm일까요?','50 cm 8 mm',[['5 cm 8 mm','G3-05'],['58 cm','N4-01'],['500 cm 8 mm','F']]]);
B('S6-38', ['3 km 70 m는 모두 몇 m일까요?','3070 m',[['370 m','G3-05'],['3700 m','N4-01'],['30070 m','G3-07'],['73 m','F']]]);
B('S6-35', ['1분 55초 + 2분 50초는 몇 분 몇 초일까요?','4분 45초',[['4분 5초','G2-03'],['3분 45초','N2-01'],['3분 105초','F']]]);
B('S6-42', ['2 L 800 mL + 1 L 500 mL는 몇 L 몇 mL일까요?','4 L 300 mL',[['3 L 300 mL','N2-01'],['1 L 300 mL','N1-03'],['3 L 1300 mL','F']]]);
B('S6-46', ['4 kg 200 g − 1 kg 500 g은 몇 kg 몇 g일까요?','2 kg 700 g',[['3 kg 300 g','N2-02'],['3 kg 700 g','N2-08'],['5 kg 700 g','N1-03'],['2 kg 500 g','F']]]);
B('S6-45', ['5040 kg은 몇 t 몇 kg일까요?','5 t 40 kg',[['50 t 40 kg','G3-05'],['5 t 400 kg','N4-01'],['5 t 4 kg','F']]]);
B('S5-06', ['100, 98, 94, 88, 80 다음에 올 수는?','70',[['72','R4-01'],['78','R5-03'],['90','N1-03'],['64','F']]],
  ['성냥개비로 정사각형을 한 줄로 이어 붙여요. 정사각형 1개는 4개, 2개는 7개, 3개는 10개가 필요해요. 정사각형 6개를 이어 붙이려면 성냥개비는 몇 개 필요할까요?','19개',[['20개','R6-14'],['13개','R4-01'],['22개','F']]]);
B('S5-08', ['480 ÷ 2 = 240, 480 ÷ 4 = 120, 480 ÷ 8 = 60. 이 규칙에서 넷째 식의 몫은?','30',[['0','R4-01'],['40','R1-04'],['120','N4-14'],['16','F']]]);

/* ===== 3-32. 글 검토에서 고친 문장(화면 글만 바꾼다. 음성 글과 태그는 그대로) ===== */
const FIXT=[
 [/^(\d+) \+ (\d+), 청이가 (\d+)이래\. 맞을까\?$/, (m,a,b,c)=>`${a} + ${b} = ? 청이의 답은 ${c}. 바르게 계산하면?`],
 [/^(\d+) − (\d+), 청이는 거꾸로 뺐대$/, (m,a,b)=>`${a} − ${b} = ? 청이는 자리마다 큰 숫자에서 작은 숫자를 뺐대요. 바르게 계산하면?`],
 [/^바구니 (\d+)개씩 (\d+)묶음, 도토리는\?$/, (m,a,b)=>`열 개짜리 바구니가 ${a}개씩 ${b}묶음이에요. 도토리는 모두 몇 개일까요?`],
 [/^구리 아저씨 가게에서 도토리를 한 봉지에 (\d{3,})개씩 담았어요\. (\d+)봉지에 담은 도토리는 모두 몇 개일까요\?$/, (m,a,b)=>`구리 아저씨가 도토리를 수레 한 대에 ${a}개씩 실었어요. 수레 ${b}대에 실은 도토리는 모두 몇 개일까요?`],
 [/^(\d+ ÷ \d+ = \d+ … \d+), 맞을까\?$/, (m,a)=>`잘못된 계산: ${a}. 바르게 계산하면?`],
 [/^대분수 (.+)을 가분수로$/, (m,a)=>`대분수 ${a}을 가분수로 나타내면?`], [/^대분수 (.+)를 가분수로$/, (m,a)=>`대분수 ${a}를 가분수로 나타내면?`],
 [/^(.+분의 \d+) 과 (.+분의 \d+), 더 큰 것은\?$/, (m,a,b)=>`${a} □ ${b}, □에 알맞은 것은?`],
 [/^(.+), 청이는 (.+)이래$/, (m,a,b)=>`${a} = ? 청이의 답은 ${b}. 바르게 계산하면?`],
 [/^(\d+)명이 (\d+)명씩 타는 배, 몇 척\?$/, (m,a,b)=>`${a}명이 한 척에 ${b}명씩 배를 타요. 모두 타려면 배는 적어도 몇 척 있어야 할까요?`],
 [/^도토리 (\d+)개로 (\d+)개짜리 꾸러미 몇 개\?$/, (m,a,b)=>`도토리 ${a}개로 ${b}개짜리 꾸러미를 몇 개까지 만들 수 있을까요?`],
 [/^더 큰 수는\? (\S+) [와과] (\S+)$/, (m,a,b)=>`더 큰 수는? ${a}, ${b}`],
 [/^(\S+)[와과] (\S+), 어느 쪽이 클까\?$/, (m,a,b)=>`${a} □ ${b}, □에 알맞은 것은?`],
 [/^(\d+)일마다, (\d+)일마다 오면 처음 같이 오는 날은\?$/, (m,a,b)=>`한 친구는 ${a}일마다, 다른 친구는 ${b}일마다 와요. 오늘 같이 왔다면 다음에 처음으로 같이 오는 날은?`],
 [/^도토리 (\d+)개, 밤 (\d+)개를 최대 몇 봉지에 똑같이\?$/, (m,a,b)=>`도토리 ${a}개와 밤 ${b}개를 남김없이 똑같이 나누어 담아요. 최대 몇 봉지에 담을 수 있을까요?`],
 [/^가로 (\d+), 세로 (\d+) 타일로 가장 작은 정사각형, 한 변은\?$/, (m,a,b)=>`가로 ${a}, 세로 ${b}인 타일을 늘어놓아 가장 작은 정사각형을 만들면 한 변의 길이는?`],
 [/^도토리 (\d+)개를 100개 상자에 담으면 상자 몇 개\?$/, (m,a)=>`도토리 ${a}개를 한 상자에 100개씩 모두 담으려면 상자는 몇 개 필요할까요?`],
 [/^도토리 (\d+)개를 10개씩 바구니에, 가득 찬 바구니는\?$/, (m,a)=>`도토리 ${a}개를 한 바구니에 10개씩 담으면 가득 찬 바구니는 몇 개일까요?`],
 [/^사람 (\d+)명이 (\d+)명씩 타는 배, 배는 몇 척\? 어떤 어림\?$/, (m,a,b)=>`${a}명이 한 척에 ${b}명씩 배를 타요. 필요한 배의 수를 구할 때 알맞은 어림은?`],
 [/^동전 (\d+)원을 1000원 지폐로 바꾸면\? 어떤 어림\?$/, (m,a)=>`동전 ${a}원을 1000원짜리 지폐로 바꿀 때 알맞은 어림은?`],
 [/^키 (\d+) cm를 약 몇 cm라고 말할까\? 어떤 어림\?$/, (m,a)=>`키 ${a} cm를 약 몇십 cm라고 말할 때 알맞은 어림은?`],
 [/^(\d+[을를] 반올림하여 [가-힣]+의 자리까지)\??$/, (m,a)=>`${a} 나타내면?`],
 [/^(.+분의 \d+)[을를] 통분 \(최소공배수로\)$/, (m,a)=>`${a}, 가장 작은 공통분모로 통분하면?`],
 [/^(.+의 몫을 반올림하여 소수 [가-힣]+ 자리까지)\??$/, (m,a)=>`${a} 나타내면?`],
 [/^물 (\S+) L를 (\S+) L씩 나누면\?$/, (m,a,b)=>`물 ${a} L를 한 병에 ${b} L씩 담으면 몇 병이 되고 몇 L가 남을까요?`],
 [/^도토리 (\d+)개를 그림그래프로 나타내면 큰 그림은 몇 개\?$/, (m,a)=>`큰 그림은 10개, 작은 그림은 1개를 나타내요. 도토리 ${a}개를 나타내려면 큰 그림은 몇 개 그릴까요?`],
 [/^(큰 그림은 100명, 작은 그림은 10명을 나타내요\. 큰 그림 \d+개와 작은 그림 \d+개)는\?$/, (m,a)=>`${a}는 모두 몇 명일까요?`],
 [/^도토리 (\d+), (\d+), (\d+)개를 고르게 하면 한 사람에 몇 개\?$/, (m,a,b,c)=>`세 사람이 도토리를 ${a}개, ${b}개, ${c}개 가지고 있어요. 고르게 나누면 한 사람이 몇 개씩일까요?`],
 [/^3회 평균이 (\d+)점이에요\. (\d+), (\d+)점 다음 마지막 회는 몇 점\?$/, (m,a,b,c)=>`세 번 본 시험의 평균이 ${a}점이에요. 두 번의 점수가 ${b}점, ${c}점이면 나머지 한 번은 몇 점일까요?`],
 [/가능성을 수로\?$/, ()=>'가능성을 수로 나타내면?'],
 [/^(나이 차이가 \d+살이에요\. 내가 \d+살이면 언니는)\?$/, (m,a)=>`${a} 몇 살일까요?`],
 [/^(□가 .+일 때 △가 .+\d)\. 식은\?$/, (m,a)=>`${a}이에요. 알맞은 식은?`],
 [/^(.+[을를] 간단한 자연수의 비로)\?$/, (m,a)=>`${a} 나타내면?`],
 [/^(\d+)분에 (\d+) L 나오는 수도, (\d+)분이면\?$/, (m,a,b,c)=>`${a}분에 ${b} L가 나오는 수도에서 ${c}분 동안 나오는 물은 몇 L일까요?`],
 [/^(도토리 \d+개를 \d+ : \d+[으]?로 나누면 앞사람은)\?$/, (m,a)=>`${a} 몇 개를 가질까요?`],
 [/^(\d+원을 \d+ : \d+[으]?로 나누면 뒷사람은)\?$/, (m,a)=>`${a} 얼마를 가질까요?`],
 [/^네 각이 모두 직각이고 네 변의 길이가 같은 사각형은\?$/, ()=>'네 각이 모두 직각이고 네 변의 길이가 같은 사각형의 가장 알맞은 이름은?'],
 [/^(1층에 \d+개, 2층에 \d+개\. 쌓기나무는 모두)\?$/, (m,a)=>`${a} 몇 개일까요?`],
 [/^(세 변이 \d+ cm, \d+ cm, \d+ cm인 삼각형)은\?$/, (m,a)=>`${a}의 가장 알맞은 이름은?`],
 [/쌓기나무는 모두\?$/, ()=>'쌓기나무는 모두 몇 개일까요?'],
 [/^정육면체 전개도에서 한 면과 이웃한 면은 몇 개\?$/, ()=>'정육면체의 전개도를 접었을 때 한 면과 만나는 면은 몇 개일까요?'],
 [/^물병 하나의 들이에 알맞은 단위는\?$/, ()=>'작은 음료수 캔 하나의 들이에 알맞은 단위는?'],
 [/^(.+)[은는] 약\?$/, (m,a)=>`${a}, 약 얼마일까요?`],
 [/^(\d+ m의 .+만큼은 몇 m일까요\?) 반반이가 리본을 잘라요\.$/, (m,a)=>`반반이가 리본을 잘라요. ${a}`],
];
const _bat=n=>/[013678]$/.test(String(n));   /* 수를 읽었을 때 받침이 있는지(끝자리 0·1·3·6·7·8) */
/* 숫자 바로 뒤 조사를 읽는 소리의 받침에 맞춤(화면 글): 0.3와→0.3과, 4을→4를, 3로→3으로 */
function fixNumJosa(s){ if(typeof s!=='string') return s; return s.replace(/(\d)(으로|로|은|는|을|를|과|와)(?=[\s,.?!)]|$)/g,(m,d,j)=>{ const bat=/[013678]/.test(d), ri=/[178]/.test(d); const nj=(j==='으로'||j==='로')?((bat&&!ri)?'으로':'로'):({'은':'은는','는':'은는','을':'을를','를':'을를','과':'과와','와':'과와'})[j][bat?0:1]; return d+nj; }); }
function fixText(q){ if(q&&typeof q.hint==='string'&&!/</.test(q.hint)) q.hint=fixNumJosa(q.hint); if(q&&typeof q.q==='string'&&!/</.test(q.q)) q.q=fixNumJosa(q.q);
 if(q&&typeof q.q==='string'){ for(const [re,f] of FIXT){ if(re.test(q.q)){ q.q=q.q.replace(re,f); break; } }
  q.q=q.q.replace(/(\d+ kg) 0 g(?=[은이에 ])/,'$1').replace(/(\d+ L) 0 mL(?=[은이에 ])/,'$1');
    q.q=q.q.replace(/(\d)(이에요|예요)([.,!]|$)/g,(m,d,e,t)=>d+(_bat(d)?'이에요':'예요')+t);
    if(q.opts){ const j=q.opts.indexOf('~아닐 것 같다'); if(j>=0&&q.ans!=='~아닐 것 같다'){ q.opts[j]='아닐 것 같다'; if(q.mis&&q.mis['~아닐 것 같다']){ q.mis['아닐 것 같다']=q.mis['~아닐 것 같다']; delete q.mis['~아닐 것 같다']; } } }
    const at=String(q.ansText==null?'':q.ansText);
    if(/\d\.\d0 /.test(q.q)&&!/\.\d*0$/.test(at.trim())) q.q=q.q.replace(/(\d\.\d)0 /g,'$1 ');
    if(/\./.test(at)) q.q=q.q.replace(/^주스 (\S+) L를 한 컵에 (\S+) L씩 나누어 담으면 몇 컵이 될까요\?$/,(m,a,b)=>`주스 ${a} L는 ${b} L들이 컵으로 몇 컵일까요? (소수로 답해요)`);
    if(/\./.test(at)) q.q=q.q.replace(/^도토리 (\d+)개를 (\d+)명에게 똑같이 나누어 주면 한 명이 몇 개씩 받을까요\?$/,(m,a,b)=>`떡 ${a}개를 ${b}명이 똑같이 나누어 먹으면 한 명이 몇 개씩 먹을까요?`); }
  return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ return fixText(_t(ep,i,q)); }; }

/* ===== 3-34. 소수 표기 바로잡기: 끝자리 0(3.0, 0.80, 4.50)을 뺀다 =====
   toFixed로 만든 수라 '18.0 ÷ 5', '1.55 + 2.75 = 4.30'처럼 나오던 것. 교과서 표기는 18 ÷ 5, 4.3.
   쓰기형은 태그 붙이기 전에(칸 수·정답 숫자까지), 객관식은 태그 붙인 뒤에(보기·코드 키까지) 고친다.
   끝자리 0이 내용인 편(자릿값·크기 비교·읽기·소수점 위치·반올림)은 건드리지 않는다. */
const DEC_KEEP=new Set(['S3-21','S3-22','S3-56','S3-58','S3-78','S3-96','S3-111']);
const _tz=/(\d+\.\d*?)0+(?![\d.])/g, _tzs=s=>String(s).replace(_tz,(m,a)=>a.replace(/\.$/,''));
function decKeep(ep,q){ return DEC_KEEP.has(ep)||!q||q.manip||typeof q.q!=='string'||/청이의 답|읽으면/.test(q.q); }
function normDecPre(ep,q){ if(decKeep(ep,q)||!(q.write&&q.slots)||typeof q.ansText!=='string'||typeof q.visual!=='string') return q;
  const has=s=>{ _tz.lastIndex=0; return _tz.test(String(s)); };
  if(has(q.q)){ q.q=fixNumJosa(_tzs(q.q)); q.visual=q.visual.replace(/<b>([^<]*)<\/b>/g,(m,a)=>'<b>'+_tzs(a)+'</b>'); if(typeof q.speech==='string') q.speech=q.speech.replace(/( 점 [일이삼사오육칠팔구영]*[일이삼사오육칠팔구])영+(?![가-힣])/g,'$1').replace(/ 점 영+(?![가-힣])/g,''); }
  if(!has(q.ansText)) return q;
  const nums=q.ansText.match(/\d+(?:\.\d+)?/g)||[]; const grp=q.visual.match(/<span class="vgrp">.*?<\/span><\/span>/g)||[];
  if(nums.length!==grp.length||nums.join('').replace(/\./g,'')!==String(q.ans)) return q;
  let vis=q.visual; const out=[];
  nums.forEach((n,j)=>{ const s=_tzs(n); out.push(s); if(s===n) return; const k=n.length-s.length-(s.indexOf('.')<0?1:0); let g=grp[j]; for(let x=0;x<k;x++) g=g.replace(/<span class="vslot"><\/span>(?=<\/span>$)/,''); if(s.indexOf('.')<0) g=g.replace('<em class="dot">.</em>',''); vis=vis.replace(grp[j],g); });
  q.visual=vis; q.ans=out.join('').replace(/\./g,''); let j=0; q.ansText=q.ansText.replace(/\d+(?:\.\d+)?/g,()=>out[j++]); return q; }
function normDecPost(ep,q){ if(decKeep(ep,q)||!Array.isArray(q.opts)||!q.opts.length||q.opts.some(o=>typeof o!=='string')) return q;
  const no=q.opts.map(_tzs); if(new Set(no).size!==no.length) return q;
  if(no.some((o,i)=>o!==q.opts[i])){ if(q.mis){ const m={}; for(const k of Object.keys(q.mis)) m[_tzs(k)]=q.mis[k]; q.mis=m; } q.ans=_tzs(q.ans); q.opts=no; }
  q.q=fixNumJosa(_tzs(q.q)); return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ try{ q=normDecPre(ep,q); }catch(e){} q=_t(ep,i,q); try{ q=normDecPost(ep,q); }catch(e){} return q; }; }
/* ===== 3-35. 3~6학년 보기 규칙 엔진 G36R (2026-11-21) =====
   원칙은 보기규칙.md. 태그 사슬이 끝난 뒤, 아직 코드가 없는 오답(무작위 오답)을 그 문제에서 실제로 나오는 오개념 오답으로 바꾼다.
   R36['편#번호'] = (q, 글) => [[오답, 코드|'F'], ...]. 후보가 지금 보기와 같으면 코드만 붙이고, 없으면 코드 없는 보기 자리에 넣거나(5지까지) 덧붙인다.
   한 코드는 한 보기에만. 끝까지 코드가 없는 보기는 실수형(q.fx)으로 표시한다. 난수를 쓰지 않는다. */
const R36={};
const _r6=x=>+(+x).toFixed(6);
const _N=s=>(String(s).replace(/(\d),(?=\d{3})/g,'$1').match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const _FR=s=>[...String(s).matchAll(/(\d+)분의 (\d+)/g)].map(m=>[+m[1],+m[2]]);
const _fr=(d,n)=>`${d}분의 ${n}`;
const _gcd2=(a,b)=>b?_gcd2(b,a%b):a;
const _like=(q,v)=>typeof q.ans==='number'?v:String(q.ans).replace(/\d+(?:\.\d+)?/,String(v));
const _noCarry=(a,b)=>{ const x=String(a).split('').reverse(), y=String(b).split('').reverse(); let s=''; for(let i=0;i<Math.max(x.length,y.length);i++) s=((+(x[i]||0)+ +(y[i]||0))%10)+s; return +s; };
const _bigSmall=(a,b)=>{ const x=String(a).split('').reverse(), y=String(b).split('').reverse(); let s=''; for(let i=0;i<x.length;i++) s=Math.abs(+(x[i]||0)- +(y[i]||0))+s; return +s; };
const _noDec=(a,b)=>{ const x=String(a).split('').reverse().map(Number), y=String(b).split('').reverse().map(Number); let s=''; for(let i=0;i<x.length;i++){ const d=x[i]-(y[i]||0); s=(d<0?d+10:d)+s; } return +s; };
function _expr(s){ const m=String(s).match(/[\d(][\d\s+\-−×÷()]*[\d)]/); if(!m) return null; const tk=m[0].replace(/−/g,'-').match(/\d+|[-+×÷()]/g); if(!tk||tk.length<5) return null;
  const ap=(a,o,b)=>o==='+'?a+b:o==='-'?a-b:o==='×'?a*b:(b&&a%b===0?a/b:NaN);
  const flat=arr=>{ const v=arr.slice(); for(let pass=0;pass<2;pass++){ for(let i=1;i<v.length-1;){ const o=v[i]; if((pass===0)===(o==='×'||o==='÷')){ v.splice(i-1,3,ap(v[i-1],o,v[i+1])); } else i+=2; } } return v[0]; };
  const lr=arr=>{ let r=arr[0]; for(let i=1;i<arr.length-1;i+=2) r=ap(r,arr[i],arr[i+1]); return r; };
  const np=tk.filter(x=>x!=='('&&x!==')').map(x=>/\d/.test(x)?+x:x);
  let first=NaN; const pi=tk.indexOf('('); if(pi>=0){ const pj=tk.indexOf(')'); first=flat(tk.slice(pi+1,pj).map(x=>/\d/.test(x)?+x:x)); } else { let k=np.findIndex(x=>x==='×'||x==='÷'); if(k<0) k=1; first=ap(np[k-1],np[k],np[k+1]); }
  return [[lr(np),'N5-01'],[flat(np),'N5-09'],[first,'N1-12']].filter(([v])=>Number.isInteger(v)&&v>=0); }
const _exprRule=(q,s)=>_expr(s);
for(const k of ['S3-63#1','S3-64#1','S3-65#1','S3-66#1','S3-66#2','S3-67#1']) R36[k]=_exprRule;
// --- 덧셈·뺄셈 ---
R36['S2-01#2']=(q,s)=>{ const [a,b]=_N(s); return [[_noCarry(a,b),'N2-01'],[Math.abs(a-b),'N1-03'],[a+b+100,'F']]; };
R36['S2-07#1']=(q,s)=>{ const [a,b]=_N(s); return [[_bigSmall(a,b),'N2-02'],[_noDec(a,b),'N2-08'],[a+b,'N1-03']]; };
R36['S2-05#2']=(q,s)=>{ const [a,b]=_N(s); return [[_bigSmall(a,b),'N2-02'],[_noDec(a,b),'N2-08'],[a+b,'N1-03']]; };
R36['S2-05#6']=(q,s)=>q.opts.filter(o=>/= 0$/.test(String(o))).map(o=>[o,'N2-12']);
const _est=(f)=>(q,s)=>{ const [a,b]=_N(s); const fl=x=>Math.floor(x/100)*100; return [[_like(q,f(fl(a),b<100?b:fl(b))),'N3-43'],[_like(q,f(a,b)),'N3-44'],[_like(q,f(Math.ceil(a/100)*100,b<100?b:Math.ceil(b/100)*100)),'F']]; };
R36['S2-07#0']=_est((a,b)=>a+b); R36['S3-49#0']=_est((a,b)=>a+b); R36['S3-49#1']=_est((a,b)=>a*b);
// --- 곱셈·나눗셈 ---
R36['S2-09#1']=(q,s)=>{ const [a,b]=_N(s); return [[a-b,'N3-11'],[b,'N3-30'],[q.ans+1,'F']]; };
R36['S2-11#1']=(q,s)=>{ const [a,b]=_N(s); return [[a-b,'N3-11'],[a*b,'N3-30'],[b,'F']]; };
R36['S2-14#1']=(q,s)=>{ const [a,b]=_N(s); return [[a+b,'N2-05'],[Math.floor(a/10)*10*b+a%10,'F']]; };
R36['S3-25#1']=()=>[[1,'N3-12'],[3,'N3-33']];
R36['S3-27#1']=(q,s)=>{ const [a,b]=_N(s); return [[a*b,'F']]; };
R36['S3-27#5']=()=>[[312,'N3-14']];
R36['S3-29#5']=(q,s)=>{ const [a,b]=_N(s), k=Math.floor(a/b)+1; return [[`${k} 나머지 ${k*b-a}`,'N3-31']]; };
R36['S3-30#1']=(q,s)=>{ const [d]=_N(s); return [[d-1,'N3-02'],[0,'F']]; };
R36['S3-30#2']=(q)=>q.opts.filter(o=>/^틀렸다\. 몫은 \d+이다$/.test(String(o))).map(o=>[o,'N4-11']);
const _zeroEnd=(q)=>{ const a=String(q.ans); return /0/.test(a.slice(1,-1))?[[+(a.replace('0','')+'0'),'N3-34']]:[]; };
R36['S3-32#5']=_zeroEnd; R36['S3-32#6']=_zeroEnd;
R36['S3-48#5']=(q)=>[[+(String(q.ans)[0]+'0'+String(q.ans).slice(1)),'F']];
R36['S3-50#0']=(q)=>[[q.ans+1,'F']]; R36['S3-50#1']=(q)=>[[q.ans+1,'N6-10'],[q.ans-1,'F']];
R36['S3-85#1']=(q)=>{ const n=_N(q.ans)[0]; return [[_like(q,n+1),'F']]; }; R36['S3-86#1']=(q)=>{ const n=_N(q.ans)[0]; return [[_like(q,n-1),'F']]; };
// --- 분수의 뜻·크기 ---
R36['S3-17#1']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,/크기가 다른/.test(o)?'N3-05':'F']);
R36['S3-17#2']=(q)=>[[q.ans+1,'N1-07'],[q.ans-1,'F']];
R36['S3-17#3']=(q)=>{ const [[d]]=_FR(q.ans); return [[_fr(1,d),'N3-40'],[_fr(d-1,1),'N3-17'],[_fr(d+1,1),'N1-07']].filter(([v])=>!/^0분의|^1분의 1$/.test(v)); };
R36['S3-18#2']=(q,s)=>{ const [[d,n]]=_FR(s); return [[n,'N3-40'],[d+n,'F']]; };
R36['S3-18#3']=(q)=>{ const [[d,n]]=_FR(q.ans); return [[_fr(n,d),'N3-40'],[_fr(d,d-n),'N3-16'],[_fr(d-n,n),'N3-17']]; };
const _cmpFr=(q,s)=>{ const v=String(q.visual||'').replace(/<[^>]+>/g,' '); const f=_FR(s).length>=2?_FR(s):(v.match(/\d+/g)||[]).reduce((a,x,i,arr)=>i%2?a.concat([[+x,+arr[i-1]]]):a,[]);
  const opp=q.ans==='<'?'>':'<'; let c='F'; if(f.length>=2){ const [[d1,n1],[d2,n2]]=f; if(d1===d2) c='N3-41'; else if(n1===n2) c='N3-06'; else c=((opp==='>')===(d1>d2))?'N3-06':'N5-13'; } return [[opp,c],['=','F']]; };
R36['S3-19#1']=_cmpFr; R36['S3-38#1']=_cmpFr; R36['S3-77#0']=_cmpFr;
R36['S3-77#1']=(q)=>[[q.ans==='<'?'>':'<','N3-08'],['=','F']];
R36['S3-19#0']=(q,s)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'N3-41']);
R36['S3-19#2']=(q,s)=>{ const [[d]]=_FR(q.ans); return [[_fr(d+1,1),'N3-09'],[String(d),'N3-25'],[_fr(d-1,1),'F']]; };
R36['S3-20#1']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
R36['S3-20#2']=()=>[['둘이 같다','N3-24']];
R36['S3-34#1']=(q)=>{ const [[g]]=_FR(q.ans); return q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>{ const f=_FR(o); return [o,f.length&&f[0][0]>g?'N3-07':'F']; }); };
R36['S3-34#2']=(q,s)=>{ const N=_N(s)[0], [[d,n]]=_FR(s); return [[_like(q,N-d),'N3-26'],[_like(q,d),'N3-25'],[_like(q,N/d),'N3-39']]; };
R36['S3-35#1']=(q,s)=>{ const N=_N(s)[0], [[d,n]]=_FR(s); return [[N-d,'N3-26'],[d,'N3-25'],[N/d,'N3-39']]; };
R36['S3-36#0']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
R36['S3-38#0']=(q,s)=>[[q.ans==='<'?'>':'<',q.ans==='<'?'N3-23':'N3-19'],['=','F']];
R36['S3-17#4']=(q)=>q.opts.filter(o=>/분의 [2-9]/.test(String(o))).map(o=>[o,'F']); R36['S3-17#5']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
// --- 소수 ---
R36['S3-21#4']=(q,s)=>{ const k=_N(s)[1]; return [[k,'N3-27'],[_r6(k/100),'N3-08']]; };
R36['S3-22#1']=(q,s)=>{ const [a,b]=_N(s); if(/더 큰 수는\?$/.test(s)&&/^[<>]$/.test(String(q.ans))) q.q=`${a} □ ${b}, □에 알맞은 것은?`; const big=q.ans==='<'?b:a, sm=q.ans==='<'?a:b; const dmax=x=>Math.max(...String(x).replace('.','').split('').map(Number)); return [[q.ans==='<'?'>':'<',dmax(sm)>dmax(big)?'N3-37':'N3-08']]; };
R36['S3-22#2']=(q,s)=>{ const a=_N(s)[0]; return [[+(String(a)+'1'),'N3-08'],[_r6(a+1),'N3-29'],[_r6(a-0.1),'N1-01']]; };
R36['S3-56#2']=(q,s)=>{ const n=String(_N(s)[0]); return [[+n.split('.')[1][0],'N4-24'],[+n[0],'N4-09']]; };   /* 자연수 부분의 숫자를 고름 = 자리 이름을 틀림 */
R36['S3-56#3']=(q,s)=>{ const c=_N(s)[0]; return [[(c/10).toFixed(1),'N3-28'],[String(c),'N3-27']]; };
R36['S3-57#1']=(q,s)=>{ const n=String(_N(s)[0]).split('.'); const un=x=>String(x).replace(/​/g,''); let r=[]; try{ r.push([`${un(sinoRaw(+n[0]))} 점 ${un(sinoRaw(+n[1]))}`,'N3-08']); }catch(e){} return r.concat(q.opts.filter(o=>/^영 점/.test(String(o))).map(o=>[o,'F']),q.opts.filter(o=>!/^영 점/.test(String(o))&&String(o)!==String(q.ans)).map(o=>[o,'N4-23'])); };
R36['S3-58#0']=()=>[['=','F']]; R36['S3-58#2']=()=>[['같다','F']];
R36['S3-58#3']=(q)=>q.opts.filter(o=>/^\d\.\d이 더 크다$/.test(String(o))).map(o=>[o,'N4-13']);
R36['S3-60#1']=(q)=>[[String(q.ans).replace('.',''),'N3-08'],[_r6(+q.ans+1),'F']];
R36['S3-61#4']=(q,s)=>{ const m=s.match(/(\d+)\.(\d+) \+ (\d+)\.(\d+)/); if(!m) return []; return [[+(`${+m[1]+ +m[3]}.${+m[2]+ +m[4]}`),'N3-08'],[_r6(+q.ans+1),'F']]; };
R36['S3-62#4']=(q,s)=>{ const m=s.match(/(\d+)\.(\d+) [−-] (\d+)\.(\d+)/); if(!m) return []; const L=Math.max(m[2].length,m[4].length), A=+(m[1]+m[2].padEnd(L,'0')), B=+(m[3]+m[4].padEnd(L,'0')); return [[_r6(_bigSmall(A,B)/10**L),'N2-02'],[_r6(+q.ans+1),'F']]; };
R36['S3-96#0']=(q)=>[[_r6(+q.ans*10),'N5-07'],[_r6(+q.ans/10),'F']];
R36['S3-101#5']=(q)=>[[_r6(+q.ans*10),'N6-07']];
R36['S3-112#1']=(q)=>[[_r6(+q.ans/10),'F']]; R36['S3-112#4']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']); R36['S3-112#5']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
// --- 큰 수 ---
R36['S3-39#2']=(q)=>[[q.ans*10,'+N4-07']];   /* 0의 개수를 틀림 */
R36['S3-40#0']=(q,s)=>{ const n=_N(s)[0], z=String(n); const r=[]; try{ if(/0/.test(z.slice(1))) r.push([readBig(+(z[0]+z.slice(1).replace('0',''))),'N4-01']); r.push([readBig(n+1000),'F'],[readBig(n+100),'F']); }catch(e){} return r; };
R36['S3-41#0']=(q,s)=>{ const n=_N(s)[0]; try{ return [[readBig(n*10),'N4-08'],[readBig(Math.floor(n/10)),'N4-09']]; }catch(e){ return []; } };
R36['S3-40#2']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'+N4-09']);   /* 다른 자리의 숫자를 고름 */
R36['S3-41#2']=(q)=>[[q.ans*10,'N4-07'],[q.ans/10,'N4-01']];
R36['S3-42#0']=(q)=>{ const L=String(q.ans).length; return q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,String(o).length<L?'N4-01':'N4-07']); };
R36['S3-43#0']=(q,s)=>{ const st=_N(s)[0], last=q.ans-st; return [[last+st/10,'N4-09'],[last+st*10,'N4-07'],[last-st,'N1-01']]; };
R36['S3-44#0']=(q,s)=>{ const [a,b]=_N(s); const opp=q.ans==='<'?'>':'<'; const big=q.ans==='<'?b:a, sm=q.ans==='<'?a:b; return [[opp,+String(sm)[0]>+String(big)[0]?'N4-10':'N1-13'],['=','F']]; };
R36['S3-44#1']=(q)=>{ const w=q.opts.filter(o=>o!==q.ans).sort((a,b)=>a-b); return w.length?[[w[w.length-1],'N4-10'],[w[0],'N1-13']]:[]; };
// --- 약수와 배수 ---
R36['S3-68#0']=(q,s)=>{ const n=_N(s)[0]; return q.opts.filter(o=>o!==q.ans).map(o=>[o,(o===n||o===1)?'N5-10':(o*o>n?'N5-19':'F')]); };
R36['S3-68#1']=(q)=>[[q.ans-2,'N5-10'],[q.ans-1,'N5-19'],[q.ans+1,'F']];
R36['S3-69#1']=(q,s)=>{ const k=_N(s)[0]; const d=[2,3,5].find(x=>k%x===0&&x<k)||1; return [[d,'N5-02'],[q.ans+1,'F']]; };
R36['S3-70#1']=(q,s)=>{ const n=_N(s)[0]; return [[n*2,'N5-02'],[n+1,'F']]; };
R36['S3-70#0']=(q)=>q.opts.filter(o=>/배수$/.test(String(o))&&String(o)!==String(q.ans)).map(o=>[o,'F']);
R36['S3-70#2']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
R36['S3-71#2']=(q,s)=>{ const [a,b]=_N(s); const c=[2,3,5,7].find(x=>a%x===0&&b%x===0&&x<q.ans); return [[a*b/q.ans,'N5-02']].concat(c?[[c,'N5-12']]:[],[[q.ans+ (a>b?b:a),'F']]); };
R36['S3-72#2']=(q,s)=>{ const [a,b]=_N(s); return [[_gcd2(a,b),'N5-02'],[a*b===q.ans?q.ans*2:a*b,'N5-12'],[a+b,'F']]; };
R36['S3-72#1']=(q,s)=>{ const [a,b]=_N(s), L=a*b/_gcd2(a,b); return [[_like(q,a*b===L?L*2:a*b),'N5-12'],[_like(q,a+b),'F'],[_like(q,Math.abs(a-b)),'F']]; };
R36['S3-73#1']=(q,s)=>{ const [a,b]=_N(s); return [[a+b,'F'],[a*b===q.ans?a*b*2:a*b,'N5-12']]; };
// --- 분수의 계산 ---
R36['S3-51#2']=(q,s)=>{ const [[d,a],[,b]]=_FR(s); return [[_fr(d*2,a+b),'N4-04'],[_fr(d,Math.abs(a-b)),'N1-03'],[_fr(d,a),'F']]; }; R36['S3-51#4']=R36['S3-51#2'];
R36['S3-55#4']=(q,s)=>{ const w=_N(s)[0], [[d,n]]=_FR(s), jo=x=>/[013678]$/.test(String(x))?'과':'와'; return [[`${w-1}${jo(w-1)} ${_fr(d,n+10)}`,'N4-05'],[`${w-1}${jo(w-1)} ${_fr(d,d)}`,'N4-27'],[`${w-1}${jo(w-1)} ${_fr(d,n)}`,'F']]; };
R36['S3-74#2']=(q,s)=>{ const [[d,n]]=_FR(s); return q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>{ const f=_FR(o)[0]; if(!f) return [o,'F']; return [o,(f[1]-n===f[0]-d&&f[1]!==n)?'N5-03':(f[0]===d||f[1]===n)?'N5-13':'F']; }); };
R36['S3-78#1']=(q,s)=>{ const n=Math.round(_N(s)[0]*100); return [[_fr(100,n),'N5-12'],[_fr(10,n),'N4-24'],[_fr(200,n),'F']]; };
const _addFr=(sub)=>(q,s)=>{ const [[d1,n1],[d2,n2]]=_FR(s), L=d1*d2/_gcd2(d1,d2); const r=[[_fr(sub?Math.abs(d1-d2):d1+d2,sub?Math.abs(n1-n2):n1+n2),'N5-04'],[_fr(L,sub?Math.abs(n1-n2):n1+n2),'N5-13'],[_fr(d1*d2,sub?Math.abs(n1-n2):n1+n2),'F']]; if(sub&&n1===n2) r.push([_fr(L,n1+n2),'N5-13']); return r.filter(([v])=>!/^0분의|분의 0$/.test(v)); };
R36['S3-79#1']=_addFr(false); R36['S3-79#3']=_addFr(false); R36['S3-80#2']=_addFr(false); R36['S3-81#1']=_addFr(true); R36['S3-81#3']=_addFr(true);
R36['S3-92#1']=(q)=>q.opts.filter(o=>!q.mis[String(o)]&&String(o)!==String(q.ans)).map(o=>[o,'F']); R36['S3-92#3']=R36['S3-92#1']; R36['S3-92#4']=R36['S3-92#1'];
R36['S3-91#4']=(q)=>q.opts.filter(o=>/같다$/.test(String(o))).map(o=>[o,'F']); R36['S3-94#1']=R36['S3-91#4']; R36['S3-106#1']=R36['S3-91#4'];
R36['S3-94#4']=(q)=>q.opts.filter(o=>/× 1\.\d/.test(String(o))).map(o=>[o,'N1-13']);
R36['S3-97#1']=(q)=>q.opts.filter(o=>/^\d+[과와] /.test(String(o))&&String(o)!==String(q.ans)).map(o=>[o,'F']);
R36['S3-97#2']=(q,s)=>{ const [a,b]=_N(s); return [[_fr(a,b),'N3-01'],[_fr(a+b,a),'F']]; };
R36['S3-97#3']=(q)=>q.opts.filter(o=>/[−-]/.test(String(o))).map(o=>[o,'N3-11']);
const _divNat=(q,s)=>{ const [[d,n]]=_FR(s), k=_N(s.replace(/\d+분의 \d+/,''))[0]; const r=[[_fr(d,n*k),'N6-04']]; if(d%k===0&&d/k>1) r.push([_fr(d/k,n),'N6-14']); r.push([_fr(d,n),'F']); return r; };
R36['S3-98#4']=_divNat; R36['S3-98#5']=_divNat;
const _divFr=(q,s)=>{ const [[d1,n1],[d2,n2]]=_FR(s); const g=_gcd2(n1*n2,d1*d2); const inv=_gcd2(n2,n1); const r=[[_fr(d1,n1/n2|0),'N6-03']].filter(()=>n1%n2===0); r.push([_fr(d1*d2/g,n1*n2/g),'N6-11'],[_fr(n1/inv,n2/inv),'N3-01'],[_fr(d1,Math.abs(n1-n2)),'F']); return r.filter(([v])=>!/분의 0$/.test(v)); };
R36['S3-104#1']=_divFr; R36['S3-104#3']=_divFr; R36['S3-104#4']=_divFr;
R36['S3-107#5']=(q)=>q.opts.filter(o=>!q.mis[String(o)]&&String(o)!==String(q.ans)).map(o=>[o,'F']); R36['S3-107#6']=R36['S3-107#5'];
// --- 수의 범위·어림 ---
R36['S3-83#0']=(q)=>q.opts.filter(o=>!q.mis[String(o)]&&o!==q.ans).map(o=>[o,'F']);
R36['S3-83#2']=(q)=>q.opts.filter(o=>!q.mis[String(o)]&&o!==q.ans).map(o=>[o,'F']);
R36['S3-84#1']=(q)=>[[q.ans+1,'N5-08'],[q.ans-1,'F']];
R36['S3-84#2']=(q)=>[[q.ans+1,'N5-08'],[q.ans-1,'N5-16']];
R36['S3-84#4']=(q,s)=>{ const b=_N(s)[0]; return [[b,'N5-08'],[b-1,'N5-16']]; };
R36['S3-87#1']=(q,s)=>{ const n=_N(s)[0]; return [[Math.round(n/10)*10,'N5-14'],[Math.floor(n/100)*100===q.ans?Math.ceil(n/100)*100+100:Math.floor(n/100)*100,'F'],[Math.round(n/1000)*1000,'N5-14']]; };
// --- 자료와 가능성(S4), 변화와 관계(S5) ---
const _tg=f=>(q,s)=>q.opts.filter(o=>String(o)!==String(q.ans)&&!q.mis[String(o)]).map(o=>[o,f(String(o),q,s)]).filter(x=>x[1]);
R36['S4-01#3']=_tg(()=>'D1-01');
R36['S4-05#2']=(q,s)=>{ const v=_N(s); const mx=Math.max(...v), mn=Math.min(...v); return [[_like(q,mx+mn),'N1-03'],[_like(q,mx),'N1-08'],[_like(q,mx-v.slice().sort((a,b)=>a-b)[1]),'F']]; };
R36['S4-08#2']=_tg(o=>/개수|수$/.test(o)?'D3-01':'F');
R36['S4-09#3']=(q,s)=>{ const [k,t]=_N(s); return [[_like(q,1),'D4-01'],[_like(q,t),'N1-08'],[_like(q,k),'F']]; };
R36['S4-11#2']=(q,s)=>{ const m=[...s.matchAll(/(\d+)시 (\d+)도/g)].map(x=>[+x[1],+x[2]]); if(m.length<3) return []; let mi=0; m.forEach((x,i)=>{ if(x[1]>m[mi][1]) mi=i; }); const r=[]; if(mi>0) r.push([`${m[mi-1][0]}시와 ${m[mi][0]}시 사이`,'D4-03']); return r; };
R36['S4-12#3']=_tg(o=>/변했다|크게/.test(o)?'D4-02':'F');
// 그래프·그림을 보고 이름을 고르는 문제: 그림(q.visual)에서 값을 읽어 오답의 까닭을 붙인다.
const _argm=(v,f)=>{ let b=0; v.forEach((x,i)=>{ if(f(x,v[b])) b=i; }); return b; };
R36['S4-05#0']=(q)=>{ const r=[...String(q.visual).matchAll(/<tr><th>([^<]+)<\/th><td>([^<]*)<\/td>/g)].map(m=>[m[1],(m[2].match(/○/g)||[]).length]); if(r.length<2) return []; return [[r[_argm(r,(x,y)=>x[1]<y[1])][0],'N1-13']]; };
R36['S4-08#0']=(q)=>{ const r=[...String(q.visual).matchAll(/<tr><th>([^<]+)<\/th><td>(.*?)<\/td>/g)].map(m=>{ const B=(m[2].match(/pgb/g)||[]).length, S=(m[2].match(/pgs/g)||[]).length; return [m[1],B*10+S,B+S]; }); if(r.length<2) return []; return [[r[_argm(r,(x,y)=>x[2]>y[2])][0],'D3-01'],[r[_argm(r,(x,y)=>x[1]<y[1])][0],'N1-13']]; };
R36['S4-10#2']=(q)=>{ const v=String(q.visual), h=[...v.matchAll(/<rect x="([\d.]+)"[^>]*height="([\d.]+)"/g)].map(m=>[+m[1],+m[2]]).sort((a,b)=>a[0]-b[0]), n=[...v.matchAll(/<text x="([\d.]+)" y="174"[^>]*>([^<]+)</g)].map(m=>[+m[1],m[2]]).sort((a,b)=>a[0]-b[0]); if(h.length<2||h.length!==n.length) return []; const r=n.map((x,i)=>[x[1],h[i][1]]); return [[r[_argm(r,(x,y)=>x[1]>y[1])][0],'D4-05'],[r[_argm(r,(x,y)=>x[1]<y[1])][0],'N1-13']]; };
R36['S4-11#1']=(q)=>{ const v=String(q.visual), y=[...v.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map(m=>[+m[1],+m[2]]).sort((a,b)=>a[0]-b[0]), n=[...v.matchAll(/<text x="([\d.]+)" y="174"[^>]*>([^<]+)</g)].map(m=>[+m[1],m[2]]).sort((a,b)=>a[0]-b[0]); if(y.length<3||y.length!==n.length) return []; const r=[]; for(let i=0;i+1<y.length;i++) r.push([n[i][1]+'~'+n[i+1][1],y[i][1]-y[i+1][1],y[i+1][1]]); return [[r[_argm(r,(x,z)=>x[2]<z[2])][0],'D4-03'],[r[_argm(r,(x,z)=>Math.abs(x[1])<Math.abs(z[1]))][0],'N1-13']]; };
R36['S4-19#1']=(q)=>{ const r=[...String(q.visual).matchAll(/flex:(\d+)[^>]*>([^<]+)<br>/g)].map(m=>[m[2],+m[1]]); if(r.length<2) return []; return [[r[_argm(r,(x,y)=>x[1]<y[1])][0],'N1-13'],[r[r.length-1][0],'D6-03']]; };

R36['S4-15#5']=(q,s)=>{ const u=String(q.ans).replace(/[\d.\s]/g,''); if(!u) return []; const d=[...s.matchAll(new RegExp('(\\d+)'+u,'g'))].map(m=>+m[1]); if(d.length<3) return []; const sum=d.reduce((a,b)=>a+b,0), nz=d.filter(x=>x>0).length; const r=[[_like(q,sum),'D5-04']]; if(nz&&nz<d.length&&sum%nz===0) r.push([_like(q,sum/nz),'D5-08']); const mid=(Math.max(...d)+Math.min(...d))/2; if(Number.isInteger(mid)) r.push([_like(q,mid),'D5-02']); return r; };
R36['S4-17#0']=_tg(o=>/반반/.test(o)?'D5-05':'D5-06'); R36['S4-17#1']=R36['S4-17#0'];
R36['S4-17#2']=_tg(()=>'N1-13');
const _probG=(q,s)=>{ const A=String(q.ans), r=[[A==='1'?'0':'1','D5-06'],[A==='2분의 1'?null:'2분의 1','D5-05']]; let m;
  if(/주사위.*짝수/.test(s)) r.push(['3','D5-07'],['6분의 1','D5-09']); else if((m=s.match(/똑같이 (\d+)칸.*?(\d+)칸을/))) r.push([m[2],'D5-07'],[_fr(+m[1],1),'D5-09']); else if((m=s.match(/(\d+)개만/))) r.push([m[1],'D5-07']);
  return r.filter(x=>x[0]!=null); };
R36['S4-18#0']=_probG; R36['S4-22#4']=_probG; R36['S4-18#1']=_probG; R36['S4-18#2']=_probG;
R36['S4-18#3']=_tg(o=>/확실/.test(o)?'D5-06':'F');
R36['S4-19#2']=(q,s)=>{ const [N,k]=_N(s); return [[`${k}%`,'D6-01'],[`${N}%`,'N1-08']]; };
R36['S4-19#3']=(q,s)=>{ const [a,b]=_N(s); return [[`${b}%`,'D6-03'],[`${a+b}%`,'N1-03']]; };
R36['S4-19#4']=(q,s)=>{ const [N,k]=_N(s); return [[`${k}%`,'D6-01'],[`${N/k}%`,'R6-01']]; };
R36['S4-20#2']=(q,s)=>{ const pc=_N(s)[0]; return [[`${pc}°`,'D6-04'],[`${_r6(pc*1.8)}°`,'D6-06']]; };
R36['S4-20#3']=(q,s)=>{ const [pc,N]=_N(s); return [[_like(q,pc),'D6-01'],[_like(q,N),'N1-08']]; };
// 반복 규칙(이모지): 바로 앞의 것을 이어 쓰면 R1-01, 마디 안의 다른 것은 R1-02
const _emo=(q)=>{ const v=Array.from(String(q.visual||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,'')).filter(c=>c!=='?'&&c!=='️'&&c.codePointAt(0)>0x2000); const prev=v[v.length-1]; return q.opts.filter(o=>String(o)!==String(q.ans)&&!q.mis[String(o)]).map(o=>[o,String(o)===prev?'R1-01':(v.includes(String(o))?'R1-02':'F')]); };
R36['S5-01#1']=_emo; R36['S5-01#2']=_emo; R36['S5-01#4']=_emo;
R36['S5-01#3']=_tg(()=>'R1-02');
R36['S5-03#1']=_tg(o=>/^1씩/.test(o)?'R1-03':'R1-04');
R36['S5-03#3']=_tg(o=>/작아진다/.test(o)?'N1-01':'R1-03');
R36['S5-03#4']=(q)=>[[q.ans-9,'R1-03'],[q.ans-20,'N1-01']];
R36['S5-05#1']=_tg(o=>/작아진다/.test(o)?'N1-01':'R1-04'); R36['S5-04#1']=R36['S5-05#1'];
R36['S5-06#2']=(q,s)=>{ const v=_N(s), a=v[0], d=v[1]-v[0], k=v[v.length-1]; return [[a+d*k,'N1-07'],[d*k,'F']]; };
R36['S5-07#1']=_tg(o=>/^순서 \+ \d+$/.test(o)?'R5-02':'F');
R36['S5-09#2']=(q,s)=>{ const [a,b,c]=_N(s); return [[a+b,'R4-02'],[a+b+c,'N1-03']]; };
R36['S5-13#3']=_tg(o=>/^\d+ : \d+$/.test(o)?'N1-13':null); R36['S5-13#4']=_tg(o=>/^레몬/.test(o)?'N1-13':null);
const _whole=(q,s)=>{ const [a,b]=_N(s); return [[`${a} : ${b}`,'R6-03'],[`${a+b} : ${a}`,'R6-01'],[`${b} : ${a+b}`,'F']]; };
R36['S5-14#2']=_whole; R36['S5-14#4']=_whole;
R36['S5-16#7']=_tg(o=>/^설탕 \d+ g$|^소금 \d+ g$/.test(o)?'R6-01':null);
R36['S5-18#1']=(q,s)=>{ const [a,b]=_N(s); const g=_gcd2(a,b); return [[`${b/g} : ${a/g}`,'R6-01'],[a>b?`${a-(b-1)} : 1`:`1 : ${b-(a-1)}`,'R6-10']]; };   /* 같은 수를 빼서 줄임. 음수가 나오지 않게 작은 쪽을 1로 */
R36['S5-21#4']=(q,s)=>{ const [N,a,b]=_N(s); const u=N/(a+b); return [[_like(q,N/2),'R6-13'],[_like(q,u),'R6-16'],[_like(q,u*Math.max(a,b)),'N1-13']]; };
// --- 카본 교차 확인(11/21)으로 보강한 둘째 오답 ---
R36['S2-11#1']=(q,s)=>{ const [a,b]=_N(s); return [[a-b,'N3-11'],[q.ans-1,'N2-09'],[a*b,'N3-30']]; };
R36['S3-25#1']=(q)=>[[1,'N3-12'],[q.ans===3?2:3,'N3-33']];
R36['S3-27#1']=(q,s)=>{ const [a]=_N(s); return [[a+10,'N2-05'],[a*_N(s)[1],'F']]; };
R36['S3-68#0']=(q,s)=>{ const n=_N(s)[0]; return [[n,'N5-10']].concat(q.opts.filter(o=>o!==q.ans).map(o=>[o,(o===n||o===1)?'N5-10':(o*o>n?'N5-19':'F')])); };
{ const _dn=R36['S3-98#4']; R36['S3-98#4']=(q,s)=>{ const [[d,n]]=_FR(s), k=_N(s.replace(/\d+분의 \d+/,''))[0]; const r=_dn(q,s); if((k*d)%n===0) r.splice(1,0,[String(k*d/n),'N6-02']); return r; }; R36['S3-98#5']=R36['S3-98#4']; }
R36['S3-112#1']=(q,s)=>{ const [a,b]=_N(s); return [[_r6(+q.ans*10),'N6-09'],[Math.round((a/b-Math.floor(a/b))*100)/100,'N6-05'],[_r6(+q.ans/10),'F']]; };
R36['S5-12#3']=(q,s)=>{ const v=_N(s); if(v.length<5) return []; return [[v[3]+(v[3]-v[1]),'R4-01'],[v[4]+(v[1]-v[0]),'R5-02']]; };
// --- 도형과 측정(S6) ---
R36['S6-01#0']=_tg(()=>'+G1-01'); R36['S6-01#1']=R36['S6-01#0']; R36['S6-01#2']=R36['S6-01#0'];
R36['S6-03#0']=_tg(()=>'+G1-02'); R36['S6-03#1']=R36['S6-03#0']; R36['S6-03#3']=R36['S6-03#0']; R36['S6-05#2']=R36['S6-03#0']; R36['S6-06#0']=_tg((o,q,s)=>/몇 개/.test(s)?'F':'+G1-02'); R36['S6-06#1']=R36['S6-06#0']; R36['S6-04#3']=R36['S6-03#0'];
R36['S6-04#0']=_tg(o=>/원/.test(o)?'G2-04':'+G1-02'); R36['S6-04#1']=R36['S6-04#0'];
R36['S6-07#0']=_tg(()=>'+G2-15'); R36['S6-07#2']=R36['S6-07#0']; R36['S6-07#4']=_tg((o,q,s)=>/맞춰야/.test(s)?'+G1-05':'+G2-15'); R36['S6-08#0']=R36['S6-07#0']; R36['S6-08#1']=R36['S6-07#0']; R36['S6-08#2']=R36['S6-07#0'];
R36['S6-02#2']=_tg(o=>/^(왼쪽|오른쪽)$/.test(o)?'G1-04':'F');
R36['S6-09#1']=_tg((o,q)=>{ const a=String(q.ans).match(/^(\d+)시 (\d+)분$/), b=o.match(/^(\d+)시 (\d+)분$/); return a&&b&&a[2]===b[2]&&+b[1]===+a[1]+1?'G2-06':'F'; });
R36['S6-16#2']=_tg(()=>'+G3-07');
R36['S6-17#1']=_tg(()=>'+G3-06');
R36['S6-18#0']=_tg(o=>/^직각$/.test(o)?'F':'G4-07');
R36['S6-18#5']=_tg(o=>/큰 부채/.test(o)?'G3-01':'F');
R36['S6-29#0']=_tg(()=>'+G4-09'); R36['S6-29#1']=R36['S6-29#0']; R36['S6-29#2']=R36['S6-29#0'];
R36['S6-19#0']=_tg((o,q,s)=>/삼각형은\?/.test(s)?'+G4-09':o==='직사각형'?'G4-06':'F');
R36['S6-19#2']=_tg(o=>/^가$/.test(o)?'G3-03':'F');
R36['S6-36#3']=(q,s)=>{ const m=s.match(/(\d+)시간 (\d+)분 [−-] (\d+)시간 (\d+)분/); if(!m) return []; const [h1,m1,h2,m2]=m.slice(1).map(Number); const tot=(h1-h2)*60+(m1-m2); const r=[[`${(h1-h2)*100+m1-m2}분`,'G2-03']]; if(m1<m2) r.push([`${h1-h2}시간 ${m2-m1}분`,'N2-02'],[`${tot+60}분`,'N2-08']); return r; };
R36['S6-22#3']=_tg(o=>/뒤집힌다|바뀐다/.test(o)?'G4-15':'F');
R36['S6-23#3']=_tg((o)=>/[↓]/.test(o)?'G4-14':null);
R36['S6-24#4']=_tg((o,q)=>({'↓':'↑','↑':'↓','→':'←','←':'→'})[String(q.ans)]===o?'G4-10':null);
R36['S6-21#0']=_tg(o=>/비스듬한/.test(o)?'G5-02':'F');
R36['S6-28#3']=_tg(o=>/^나$/.test(o)?'G4-02':'F');
R36['S6-28#4']=_tg(o=>/^(정삼각형|이등변삼각형)$/.test(o)?'+G4-02':'F');
R36['S6-31#0']=_tg(o=>/사다리꼴이 아니다|직사각형이 아니다|평행사변형이 아니다/.test(o)?'G4-05':'F');
R36['S6-33#1']=_tg(()=>'+G4-06');
const _corr=_tg(()=>'+G5-08'); R36['S6-52#1']=_corr; R36['S6-53#2']=_corr; R36['S6-53#3']=_corr; R36['S6-55#0']=_corr; R36['S6-54#4']=_corr;
R36['S6-58#2']=_tg(o=>/^5개$/.test(o)?'G5-06':'F');
R36['S6-59#2']=_tg(o=>/삼각형/.test(o)?'G6-02':'F'); R36['S6-61#1']=_tg(o=>/직사각형/.test(o)?'G6-02':'F');
R36['S6-59#6']=_tg(o=>/바닥에/.test(o)?'G6-01':'F');
R36['S6-78#6']=_tg(o=>/^6배$/.test(o)?'N2-05':null);
R36['S6-64#0']=_tg(o=>/^원$/.test(o)?'G6-16':'F'); R36['S6-64#1']=_tg(o=>/삼각형/.test(o)?'G6-16':'F');
R36['S6-63#3']=_tg(o=>/지름/.test(o)?'F':'+G6-15');
R36['S6-74#5']=_tg(o=>/더 크다/.test(o)?'+G6-11':null);
R36['S6-75#2']=(q,s)=>{ const r=_N(s)[0], u=String(q.ans).replace(/^[\d.]+/,''); return [[_r6(r*3.14)+u,'G6-18'],[_r6(4*r*r*3.14)+u,'G3-04'],[_r6(2*r*3.14)+u,'G6-12']]; };
R36['S6-74#3']=(q,s)=>{ const r=_N(s)[0], u=String(q.ans).replace(/^[\d.]+/,''); return [[_r6(r*3.14)+u,'G3-04'],[_r6(r*r*3.14)+u,'G6-12']]; };
// 한 번호에 서로 다른 문제가 섞여 있는 틀(고정 문항 묶음)은 문제 글이 이 꼴일 때만 규칙을 쓴다. 규칙을 더할 때 x30.js로 꼴을 확인할 것.
const G36G={'S2-14#1':/청이의 답은/,'S3-104#4':/계산하면\?$/,'S3-19#2':/똑같이 \d+칸으로 나눈/,'S3-20#2':/^더 큰 분수는\?$/,'S3-21#4':/개인 수는\?$/,'S3-27#5':/^23 × 14/,'S3-48#5':/계산하면\?$/,
 'S3-51#4':/계산하면\?$/,'S3-55#4':/받아내림하면\?$/,'S4-09#3':/한 칸은\?$/,'S4-19#4':/^전체 \d+명 중/,'S4-20#3':/전체가/,'S5-03#4':/바로 아래 칸/,'S5-04#1':/덧셈표/,'S5-05#1':/규칙은\?$/,
 'S5-14#2':/비는\?$/,'S5-14#4':/비는\?$/,'S5-21#4':/적게 갖는 쪽은 몇 개/,'S4-18#2':/회전판/,'S4-05#2':/몇 명 더 많/,'S5-06#2':/번째 수는\?$/,'S5-09#2':/□ \+ \d+에서/,'S5-18#1':/간단한 자연수의 비/,'S3-27#1':/에서 \d+ × 10은\?$/,'S5-12#3':/□가 \d+이면 △는\?$/,'S6-36#3':/시간 \d+분 [−-] \d+시간/,'S6-75#2':/^반지름이 \d+ cm인 원의 넓이/,'S6-74#3':/^반지름이 \d+ cm인 원의 원주/,'S6-09#1':/시각은\?$/,'S6-78#6':/몇 배/,'S6-02#2':/오른손|왼손/};
function g36Wrong(ep,i,q){ if(!q||q.manip||q.onMount||!Array.isArray(q.opts)||q.opts.length<2||q.opts.some(o=>o!==null&&typeof o==='object')) return q;
  const A=String(q.ans); q.mis=q.mis||{}; q.fx=q.fx||{}; const isU=o=>String(o)!==A&&!q.mis[String(o)];   // 실수형(F)으로만 표시된 보기도 더 나은 후보가 있으면 바꾼다
  if(!q.opts.some(isU)) return q;
  const f=R36[ep+'#'+i], gd=G36G[ep+'#'+i]; let cand=[]; if(f&&(!gd||gd.test(_pl(q.q).replace(/\u200B/g,'').replace(/\s+/g,' ').trim()))){ try{ cand=f(q,_pl(q.q).replace(/​/g,'').replace(/\s+/g,' ').trim())||[]; }catch(e){ cand=[]; } }
  const num=typeof q.opts[0]==='number'&&typeof q.ans==='number', numOpt=q.opts.every(o=>typeof o==='number'), used=new Set(Object.values(q.mis)), seen=new Set(q.opts.map(String)), add=[];
  for(let [v,c] of cand){ const s=String(v); if(v==null||s===A||/NaN|undefined|Infinity/.test(s)||(num&&!(+v>=0))) continue; const dup=typeof c==='string'&&c[0]==='+'; if(dup) c=c.slice(1);
    const ex=q.opts.find(o=>String(o)===s);
    if(ex!==undefined){ if(!isU(ex)) continue; if(c==='F') q.fx[s]=1; else if(dup||!used.has(c)){ q.mis[s]=c; used.add(c); delete q.fx[s]; } continue; }
    if(c!=='F'&&used.has(c)) continue; if(seen.has(s)) continue; seen.add(s); if(c!=='F') used.add(c); add.push([v,c]); }
  const opts=q.opts.slice(); let rest=opts.filter(isU);
  for(const [v,c] of add){ const val=numOpt?+v:String(v); if(c==='F'&&!rest.length) continue;
    if(rest.length){ const r=rest.shift(); opts[opts.indexOf(r)]=val; delete q.fx[String(r)]; } else if(opts.length<5){ opts.splice((opts.length*3+String(v).length)%(opts.length+1),0,val); } else continue;
    if(c==='F') q.fx[String(val)]=1; else q.mis[String(val)]=c; }
  for(const r of opts.filter(isU)) q.fx[String(r)]=1;
  // 오개념 오답이 2개 이상이면 정보 없는 실수형 보기는 뺀다(보기 수 = 정답 + 오개념 수). 1개뿐이면 실수형 하나만 남겨 3지를 지킨다.
  const coded=opts.filter(o=>String(o)!==A&&q.mis[String(o)]).length; let keepF=coded>=2?0:(coded===1?1:9); const out=[];
  for(const o of opts){ const s=String(o); if(s!==A&&!q.mis[s]){ if(keepF>0){ keepF--; out.push(o); } else delete q.fx[s]; } else out.push(o); }
  q.opts=out; return q; }
/* ---------- 3-36. 보기 자리 섞기 ----------
   보기의 자리(1번·2번…)는 오개념 종류나 정답과 아무 관계가 없어야 한다. 규칙이 보기를 끼워 넣는 순서가 자리에 남지 않게, 모든 처리가 끝난 뒤 한 번 섞는다.
   Math.random을 쓰지만 씨앗 재생성(withSeed) 안에서 불리므로 같은 씨앗이면 같은 순서다. 부등호(>, =, <)처럼 순서가 약속인 보기는 그대로 둔다. 점검: node x37.js */
/* 복수 정답 막기: 정답과 값이 같은 오답 보기(8.5와 8.50, 3분의 1과 6분의 2)는 뺀다. 분수는 문제가 꼴(기약분수·대분수·가분수 등)을 요구하지 않을 때만. */
/* 쓰기형 10: 시간·복합 단위의 덧셈과 뺄셈(답 = 큰 단위 숫자 + 작은 단위 숫자를 이어 쓴 열쇠). 칸 수가 정답과 같은 오답만 쓸 수 있으므로 길이가 같을 때만 단다.
   60에서 받아올림·받아내림을 100으로 한 답(G2-03), 받아올림한 1을 더하지 않은 답(N2-01), 작은 단위를 큰 쪽에서 작은 쪽으로 뺀 답(N2-02). */
function codeW10(q){ if(!q||q.opts&&q.opts.length||q.manip||q.onMount||q.mis) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q; const Q=_pl(q.q).replace(/,/g,'').replace(/\s+/g,' ').trim(), mis={}, clash=new Set(); let m;
  const UT={}; const add=(k,c)=>{ k=String(k); if(/-/.test(k)) return; if(/,/.test(k)){ if(!(k in UT)) UT[k]=c; k=k.replace(',',''); } if(k===A||k.length!==A.length) return; if(k in mis){ if(mis[k]!==c) clash.add(k); return; } mis[k]=c; };
  const tsub=(H,M,h,d)=>{ let tm=H*60+M-h*60-d; if(tm<0) return; if(`${Math.floor(tm/60)}${tm%60}`!==A) return; if(M<d){ add(`${H-h-1},${M+100-d}`,'G2-03'); add(`${H-h},${d-M}`,'N2-02'); } };
  const tadd=(H,M,h,d)=>{ const tm=H*60+M+h*60+d; if(`${Math.floor(tm/60)}${tm%60}`!==A) return; if(M+d>=60){ add(`${H+h},${M+d-60}`,'N2-01'); if(M+d>=100) add(`${H+h+1},${M+d-100}`,'G2-03'); } };
  if((m=Q.match(/(\d+)시간? (\d+)분 − (?:(\d+)시간 )?(\d+)분/))) tsub(+m[1],+m[2],+(m[3]||0),+m[4]);
  else if((m=Q.match(/(\d+)시 (\d+)분에서 (\d+)분 전/))) tsub(+m[1],+m[2],0,+m[3]);
  else if((m=Q.match(/(\d+)시 (\d+)분에 끝났어요.*?(\d+)분 동안/))) tsub(+m[1],+m[2],0,+m[3]);
  else if((m=Q.match(/(\d+)시간 (\d+)분 \+ (?:(\d+)시간 )?(\d+)분/))) tadd(+m[1],+m[2],+(m[3]||0),+m[4]);
  else if((m=Q.match(/(\d+)시 (\d+)분에서 (\d+)분 뒤/))||(m=Q.match(/(\d+)시 (\d+)분에 [^.]*?(\d+)분 동안/))) tadd(+m[1],+m[2],0,+m[3]);
  else if((m=Q.match(/(\d+) (km|kg|L|m|cm) (\d+) (m|g|mL|cm|mm) ([+−]) (?:(\d+) (?:km|kg|L|m|cm) )?(\d+) (?:m|g|mL|cm|mm)\b/))||(m=Q.match(/(\d+) (km|kg|L|m|cm) (\d+) (m|g|mL|cm|mm)[^+−\d]*?()()(\d+) (?:m|g|mL|cm|mm)[을를] (더|꺼|따|썼|마)/))){
    const base=m[2]==='m'?100:m[2]==='cm'?10:1000, X=+m[1], y=+m[3], Z=+(m[6]||0), w=+m[7], plus=m[5]==='+'||m[8]==='더'; const tot=plus?X*base+y+Z*base+w:X*base+y-Z*base-w; if(tot<0||`${Math.floor(tot/base)}${tot%base}`!==A) return q;
    if(plus&&y+w>=base) add(`${X+Z},${y+w-base}`,'N2-01'); if(!plus&&y<w){ add(`${X-Z},${w-y}`,'N2-02'); add(`${X-Z},${y+base-w}`,'N2-08'); } if(base===1000){ if(plus&&y+w>=100&&y+w<1000) add(`${X+Z+1},${y+w-100}`,'G3-05'); if(!plus&&y<w&&X-Z-1>=0) add(`${X-Z-1},${y+100-w}`,'G3-05'); } }   /* 1000 관계인데 100에서 받아올림·받아내림 */
  if(Object.keys(UT).length) q._ut=UT; clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length) q.mis=mis; return q; }
function dropEqualOpts(q){ try{ if(!q||!Array.isArray(q.opts)||q.opts.length<2) return q; const A=String(q.ans), Q=_pl(q.q), num=s=>/^\d+(\.\d+)?$/.test(s)?parseFloat(s):null, fr=s=>{ const m=String(s).match(/^(?:(\d+)[과와] )?(\d+)분의 (\d+)$/); return m?+(m[1]||0)+ +m[3]/+m[2]:null; };
  const av=num(A), af=fr(A), formAsked=/기약|약분|통분|가분수|대분수|나타내|같은|소수로|분수로/.test(Q); const same=o=>{ const s=String(o); if(s===A) return false; if(av!=null&&num(s)!=null) return Math.abs(num(s)-av)<1e-9; if(af!=null&&fr(s)!=null&&!formAsked) return Math.abs(fr(s)-af)<1e-9; return false; };
  const keep=q.opts.filter(o=>!same(o)); if(keep.length<q.opts.length&&keep.length<2){ const m=A.match(/^(\d+)분의 (\d+)$/), alt=m?`${m[1]}분의 ${+m[2]+1}`:av!=null?String(+(av+1).toFixed(6)):null; if(alt&&!keep.includes(alt)){ keep.push(alt); (q.fx=q.fx||{})[alt]=1; } }   /* 보기가 둘뿐이면 실수형 보기 하나로 바꿔 넣는다 */
  if(keep.length<q.opts.length+ (keep.length>=2&&q.opts.some(same)?1:0)&&keep.length>=2&&q.opts.some(same)){ for(const o of q.opts) if(same(o)){ if(q.mis) delete q.mis[String(o)]; if(q.fx) delete q.fx[String(o)]; } q.opts=keep; } }catch(e){} return q; }
function mixOpts(q){ try{ if(!q||typeof q!=='object'||q.manip||q.onMount||!Array.isArray(q.opts)||q.opts.length<2) return q; if(q.opts.every(o=>/^[<>=＞＜]$/.test(String(o).trim()))) return q;
  /* 그림에 붙은 이름(가·나·다…, ㄱ·ㄴ·ㄷ…, ①②③…)이 보기면 섞지 않고 차례대로 둔다 (교수님 11/22: 순서대로 있어야 고를 때 안 헷갈림). 그림 쪽 순서가 이미 섞여 있어 정답 자리는 매번 다르다. */
  for(const ord of ['가나다라마바사아','ㄱㄴㄷㄹㅁㅂㅅㅇ','①②③④⑤⑥⑦⑧','㉠㉡㉢㉣㉤','ABCDEFGH']){ if(q.opts.every(o=>{ const t=String(o).trim(); return t.length===1&&ord.includes(t); })){ q.opts.sort((x,y)=>ord.indexOf(String(x).trim())-ord.indexOf(String(y).trim())); return q; } }
  const a=q.opts; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  /* 긍정·부정 짝(있다/없다, 맞다/틀리다…)은 긍정을 앞에 고정: 정답이 어느 쪽인지는 문제마다 달라 자리가 답을 알려 주지 않고, 늘 같은 자리라 읽는 부담이 준다 */
  if(a.length===2){ const neg=x=>/^(없다|틀리다|아니요|아니다|다르다|안 |될 수 없다|×)/.test(String(x).trim())||/(이|가) 아니다$|지 않다$|할 수 없다$/.test(String(x).trim()); if(neg(a[0])&&!neg(a[1])) a.reverse(); }
  /* '같다·알 수 없다·모두 …' 같은 판단 보류형 보기는 늘 맨 끝 (뜻이 정해진 보기라 자리를 고정해도 답이 새지 않는다) */
  else { const tail=x=>/^((둘이|크기가|길이가|두 \S+가|모두) )?같(다|아요)$|^알 수 없다$|^정할 수 없다$|^모두 (맞다|아니다)$/.test(String(x).trim()); const t=a.filter(tail); if(t.length&&t.length<a.length){ const h=a.filter(x=>!tail(x)); a.length=0; a.push(...h,...t); } } }catch(e){} return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=g36Wrong(ep,i,q); }catch(e){}
  /* 문제 글을 다듬은(fixText) 뒤의 글로 한 번 더: 쓰기형인데 아직 예상 오답이 없으면 글을 읽는 규칙을 다시 돌린다 */
  try{ if(q&&typeof q==='object'&&!(q.opts&&q.opts.length)&&!q.manip&&!q.onMount&&!TAG3[ep+'#'+i]&&!(q.mis&&Object.keys(q.mis).length)){ delete q.mis; for(const f of [codeW2,codeW3,codeW7,codeW8,codeW9,codeW10]){ try{ f(q); }catch(e){} if(q.mis) break; } } }catch(e){}
  return mixOpts(dropEqualOpts(q)); }; }
try{ window.__R36=R36; window.__G36G=G36G; window.__MIS=MIS; }catch(e){}


/* ===== 3-33. 1~2학년 수와 연산(EP 엔진) 글 검토: 화면 글만 고친다 ===== */
/* 수 낱말(보이지 않는 표시로 감싼 것) 바로 뒤 조사를 받침에 맞춤: 사을→사를, 삼로→삼으로, 일으로→일로 */
function fixJosa(t){ if(typeof t!=='string'||t.indexOf('​')<0) return t;
  const P={'은':['은','는'],'는':['은','는'],'이':['이','가'],'가':['이','가'],'을':['을','를'],'를':['을','를'],'과':['과','와'],'와':['과','와'],'이에요':['이에요','예요'],'예요':['이에요','예요'],'이야':['이야','야'],'야':['이야','야'],'이란다':['이란다','란다'],'란다':['이란다','란다']};
  return t.replace(/([가-힣])​(으로|로|이에요|예요|이란다|란다|이야|야|은|는|이|가|을|를|과|와)(?=[\s,.?!~…]|$)/g,(m,ch,j)=>{ const jong=(ch.charCodeAt(0)-0xAC00)%28; const nj=(j==='으로'||j==='로')?((jong>0&&jong!==8)?'으로':'로'):P[j][jong>0?0:1]; return ch+'​'+nj; }); }
try{ window.fixJosa=fixJosa; }catch(e){}   /* 놀이(bubbleSay)가 바깥에서 부르므로 전역으로 — 없으면 놀이가 멈춰 건너뛰어짐(교수님 11/22: 6과 4 가르기) */
if(typeof say==='function'){ const _say=say; say=function(text,who,cb){ return _say(fixJosa(text),who,cb); }; }
/* ===== 1~2학년 보기 규칙 엔진 (2026-11-21) =====
   원칙: 객관식 오답은 모두 '그 답이 나오는 오개념'에서 만든다(무작위 오답 금지). 문제 글의 꼴마다 오개념 규칙을 적용해
   [오답, 코드] 후보를 만들고, 정답 + 후보 최대 3개(4지)로 보기를 다시 짠다. 후보가 2개 못 되면 원래 보기로 채운다.
   난수를 쓰지 않으므로 씨앗 재생성(KT.regen)과 맞는다. 규칙을 더할 때는 EPR 배열에 한 줄. 점검: node x28.js, node x29.js */
const EPR=[
 [/^(\d+) \+ (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],s=a+b,r=[]; if(b===0||a===0) r.push([0,'N1-06']);
    if(a>=10&&b>=10&&a%10+b%10>=10){ r.push([s-10,'N2-01']); r.push([+(''+(Math.floor(a/10)+Math.floor(b/10))+(a%10+b%10)),'N2-07']); }
    else if(a>=10&&b<10&&a%10+b<10) r.push([a+b*10,'N2-11']); else if(a>=10&&b>=10) r.push([a+b%10,'N2-11']);
    r.push([s-1,'N1-09'],[s+1,'N1-07']); if(a!==b&&s<20) r.push([Math.abs(a-b),'N1-03']); return r; }],
 [/^(\d+) [−-] (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],d=a-b,r=[]; if(b===0) r.push([0,'N1-06']);
    if(a>=10&&a%10<b%10){ r.push([(Math.floor(a/10)-Math.floor(b/10))*10+(b%10-a%10),'N2-02']); if(b>=10) r.push([d+10,'N2-08']); }
    if(b!==d&&b>0) r.push([b,'N1-08']); r.push([d+1,'N1-09'],[d-1,'N1-07']); if(a<10) r.push([a+b,'N1-03']); return r; }],
 [/^(\d+) \+ (\d+) \+ (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],c=+m[3],s=a+b+c; return [[a+b,'N1-12'],[s-10,'N2-01'],[s-1,'N1-09'],[s+1,'N1-07']]; }],
 [/^(\d+) [−-] (\d+) [−-] (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],c=+m[3],d=a-b-c; return [[a-b,'N1-12'],[a-b+c,'N1-03'],[d+1,'N1-09'],[d-1,'N1-07']]; }],
 [/^(\d+) \+ (\d+) [−-] (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],c=+m[3],d=a+b-c; return [[a+b,'N1-12'],[a+b+c,'N1-03'],[d+1,'N1-07'],[d-1,'N1-09']]; }],
 [/^(\d+) × (\d+) = \?$/,(m)=>{ const a=+m[1],b=+m[2],r=[]; if(a===0||b===0) r.push([a+b,'N2-06'],[1,'N2-06'],[a+b+1,'N2-06']); else if(a===1||b===1) r.push([a+b,'N2-06'],[1,'N2-10'],[0,'N2-06']); else r.push([a+b,'N2-05']);
    if(a>1&&b>0) r.push([a*(b+1),'N2-09'],[a*(b-1),'N2-09']); return r; }],
 [/^(\d+)단: /,(m,q)=>{ const a=+m[1],b=q.ans/a; return Number.isInteger(b)?[[a+b,'N2-05'],[a*(b+1),'N2-09'],[a*(b-1),'N2-09']]:[]; }],
 [/^(\d+) × □ = (\d+)$/,(m,q)=>{ const a=+m[1],t=+m[2]; return [[t-a,'N2-05'],[q.ans+1,'N2-09'],[q.ans-1,'N2-09'],[t,'N1-05']]; }],
 [/^(\d+) = □ \+ (\d+)$|^(\d+) = (\d+) \+ □$/,(m,q)=>{ const N=+(m[1]||m[3]),a=+(m[2]||m[4]); return [[N,'N1-05'],[N+a,'N1-03'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^(\d+) \+ □ = (\d+)$|^□ \+ (\d+) = (\d+)$/,(m,q)=>{ const a=+(m[1]||m[3]),t=+(m[2]||m[4]); return [[a+t,'N1-03'],[t,'N1-05'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^(\d+) [−-] □ = (\d+)$/,(m,q)=>{ const t=+m[1],a=+m[2]; return [[t+a,'N1-03'],[a,'N1-05'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^□ [−-] (\d+) = (\d+)$/,(m,q)=>{ const a=+m[1],x=+m[2]; return [[Math.abs(x-a),'N1-03'],[x,'N1-05'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^(\d+) \+ (\d+) = □ \+ (\d+)$/,(m,q)=>{ const a=+m[1],b=+m[2],c=+m[3]; return [[a+b,'N1-05'],[a+b+c,'N1-03'],[q.ans+1,'N1-07']]; }],
 [/^(\d+)[은는] (\d+)[와과] 몇\?$|^(\d+)[을를] (\d+)[와과] □로 갈라요/,(m,q)=>{ const N=+(m[1]||m[3]),a=+(m[2]||m[4]); return [[N,'N1-08'],[N+a,'N1-03'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^(\d+)[와과] (\d+)[을를] 모으면\?$/,(m,q)=>{ const a=+m[1],b=+m[2],r=[]; if(a!==b) r.push([Math.abs(a-b),'N1-03']); r.push([a+b+1,'N1-07'],[a+b-1,'N1-09']); return r; }],
 [/빨간 공 (\d+)개, 파란 공 (\d+)개\. 빨간 공이 몇 개 더/,(m)=>{ const a=+m[1],b=+m[2]; return [[a+b,'N1-03'],[a,'N1-08'],[b,'N1-08']]; }],
 [/^(\d+)[와과] □[을를] 모으면 10이 돼요/,(m)=>{ const a=+m[1]; return [[10-a+1,'N1-02'],[10-a-1,'N1-02'],[10+a,'N1-03']]; }],
 [/^10을 만들려면 (\d+)[와과] 몇\?$/,(m,q)=>{ const a=+m[1]; return [[10-a+1,'N1-02'],[10-a-1,'N1-02'],[10+a,'N1-03']]; }],
 [/^나 (\d+)개 줘! 도토는 몇 개 남지\?$/,(m,q)=>{ const a=+m[1],N=q.ans+a,r=[]; if(a!==q.ans) r.push([a,'N1-08']); r.push([N,'N1-08'],[q.ans+1,'N1-09'],[q.ans-1,'N1-07']); return r; }],
 [/^(\d+)보다 1 큰 수/,(m)=>{ const a=+m[1]; return [[a-1,'N1-01'],[a,'N1-07'],[a+2,'N1-07']]; }],
 [/^(\d+)보다 1 작은 수/,(m)=>{ const a=+m[1]; return [[a+1,'N1-01'],[a,'N1-07'],[a-2,'N1-07']]; }],
 [/^(\d+)씩 (뛰어 세기|거꾸로), 다음은\?$/,(m,q)=>{ const k=+m[1],dn=m[2]==='거꾸로'?-1:1, c=q.ans-dn*k, r=[[c-dn*k,'N1-01'],[c+dn,'R1-04']]; if(k===10) r.push([c+dn*100,'N4-09']); else if(k===100) r.push([c+dn*10,'N4-09']); else r.push([c+dn*2*k,'R1-04']); return r; }],
 [/^(\d+)씩 (\d+)묶음, 모두 몇 개\?$/,(m)=>{ const a=+m[1],b=+m[2]; return [[a+b,'N2-05'],[b,'N2-10'],[a*(b+1),'N2-09'],[a*(b-1),'N2-09']]; }],
 [/^(\d+)의 (\d+)배는\?$/,(m)=>{ const a=+m[1],b=+m[2]; return [[a+b,'N2-05'],[a*(b+1),'N2-09'],[a*(b-1),'N2-09']]; }],
 [/^(\d+)[은는] (\d+)의 몇 배\?$/,(m,q)=>{ const X=+m[1],a=+m[2]; return [[X-a,'N2-05'],[q.ans+1,'N2-09'],[q.ans-1,'N2-09']]; }],
 [/^(\d+)씩 묶으면 몇 묶음\?$/,(m,q)=>{ const a=+m[1]; return [[a,'N2-10'],[q.ans+1,'N2-09'],[q.ans-1,'N2-09'],[q.ans*a,'N2-10']]; }],
 [/^상자 (\d+)개는 도토리 몇 개\?$/,(m)=>{ const c=+m[1]; return [[c*10,'N4-07'],[c,'N4-15'],[c*1000,'N4-07']]; }],
 [/^바구니 (\d+)개는 도토리 몇 개\?$/,(m)=>{ const c=+m[1]; return [[c,'N4-15'],[c*100,'N4-07'],[c*10+10,'N1-07']]; }],
 [/^도토리 (\d+)개는 상자 몇 개\?$/,(m,q)=>{ const X=+m[1]; return [[X/10,'N4-07'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']]; }],
 [/^(\d+)에서 ([천백십일])의 자리 숫자는\?$|^(\d+), (천)의 자리 숫자는\?$/,(m,q)=>{ const ds=String(m[1]||m[3]).split('').map(Number); return ds.filter(d=>d!==q.ans).map(d=>[d,'N4-09']); }],
 [/^(\d+)에서 ([천백십일])의 자리 숫자 (\d)[은는] 얼마\?$/,(m,q)=>{ const d=+m[3],k='일십백천'.indexOf(m[2]),r=[[d,'N4-15']]; for(let e=0;e<String(m[1]).length;e++) if(e!==k&&e>0) r.push([d*10**e,'N4-09']); return r; }],
 [/^(\d+)\+(\d+)=(\d+)이면, \d+[−-](\d+)=\?$/,(m,q)=>{ const a=+m[1],b=+m[2],c=+m[3],x=+m[4]; return [[c,'N1-08'],[x,'N1-08'],[c+x,'N1-03']]; }],
 [/^(\d+)[−-](\d+)=(\d+)이면, (\d+)\+(\d+)=\?$/,(m,q)=>{ const a=+m[1],b=+m[2],c=+m[3]; return [[c,'N1-08'],[b,'N1-08'],[Math.abs(c-b),'N1-03'],[a+1,'N1-07']]; }],
 [/^['‘].*['’][은는] 숫자로\?$/,(m,q)=>{ const n=q.ans; if(n<10) return [[n+1,'N1-01'],[n-1,'N1-01']]; const ds=String(n).split(''), r=[]; if(ds.includes('0')) r.push([+ds.filter((d,i)=>i===0||d!=='0').join(''),'N4-01']);
    for(let i=0;i<ds.length-1&&r.length<3;i++) if(ds[i]!==ds[i+1]&&!(i===0&&ds[i+1]==='0')){ const e=ds.slice(); [e[i],e[i+1]]=[e[i+1],e[i]]; r.push([+e.join(''),'N4-09']); } return r; }],
 [/^[\d, ]+, 다음은\?$/,(m,q)=>[[q.ans+1,'N1-01'],[q.ans+2,'N1-01'],[q.ans===0?3:q.ans-1,'N1-07']]],
 [/째 도토리는 몇 번\?$/,(m,q)=>[[q.ans+1,'N1-07'],[q.ans-1,'N1-07'],[q.ans+2,'N1-07']]],
 [/^더 큰 수는\?$/,(m,q)=>{ const v=(String(q.visual||'').replace(/<[^>]+>/g,' ').match(/\d+/g)||[]).map(Number).filter(x=>x!==q.ans); return v.length?[[v[0],'N1-13']]:[]; }],
 [/^도토리 10개면 바구니 몇 개\?$/,()=>[[10,'N4-15'],[2,'N1-07'],[0,'N1-07']]],
 [/^바구니 하나는 도토리 몇 개\?$/,()=>[[1,'N4-15'],[9,'N1-07'],[11,'N1-07']]],
 [/^(\d+)[은는] 바구니 몇 개와 낱개 (\d+)개\?$/,(m,q)=>{ const n=+m[1],s=+m[2],r=[]; if(s!==q.ans) r.push([s,'N4-09']); r.push([n,'N4-15'],[q.ans+1,'N1-07'],[q.ans-1,'N1-07']); return r; }],
 [/^(도토리가 몇 개일까요\?|모두 몇 개일까요\?)$/,(m,q)=>{ const n=q.ans,r=[]; if(n<10) return [[n+1,'N1-07'],[n-1,'N1-07'],[n+2,'N1-07']];
    const ds=String(n).split('').map(Number), sum=ds.reduce((x,y)=>x+y,0);
    if(ds.includes(0)&&n>=100) r.push([+ds.filter((d,i)=>i===0||d!==0).join(''),'N4-01']);
    if(n<100){ if(ds[0]!==ds[1]&&ds[1]>0) r.push([ds[1]*10+ds[0],'N4-09']); } else if(ds[0]!==ds[1]) r.push([+(''+ds[1]+ds[0]+ds.slice(2).join('')),'N4-09']);
    r.push([sum,'N1-10']); r.push([n+10,'N1-07'],[n-10,'N1-07']); return r; }],
];
const ORDW=['첫째','둘째','셋째','넷째','다섯째','여섯째','일곱째','여덟째','아홉째','열째'];
function epWrongS(q,s){ const o=q.opts.map(String), ans=String(q.ans); q.mis=q.mis||{}; const set=(v,c)=>{ if(v!==ans&&!q.mis[v]) q.mis[v]=c; };
  if(/누가 더 (많|적)을까요\?|어느 창고가 더 많을까요\?|텅 빈 주머니는 어느 쪽\?/.test(s)){ for(const v of o) set(v,/같아요|둘 다/.test(v)?'F':'N1-13'); return q; }
  if(/몇째일까요\?$/.test(s)){ const zw=ans.indexOf('\u200B')>=0, k=ORDW.indexOf(ans.replace(/\u200B/g,'')); if(k<0) return q; const W2=w=>zw?'\u200B'+w+'\u200B':w; const want=[k+1,k-1,k+2,k-2].filter(i=>i>=0&&i<ORDW.length).slice(0,3).map(i=>ORDW[i]);
    const all=[k,...want.map(w=>ORDW.indexOf(w))].sort((a,b)=>a-b).map(i=>W2(ORDW[i])); const r=(k*3+1)%all.length; q.opts=all.slice(r).concat(all.slice(0,r)); q.mis={}; for(const w of want) q.mis[W2(w)]='N1-07'; return q; }
  if(/묶음을 곱셈식으로!$/.test(s)){ for(const v of o) set(v,/\+/.test(v)?'N2-05':'N2-09'); return q; }
  return q; }
function epWrong(q){ if(!q||!Array.isArray(q.opts)||q.opts.length<3) return q;
  if(typeof q.ans!=='number'||q.opts.some(o=>typeof o!=='number')){ try{ return epWrongS(q,String(q.q).replace(/<[^>]+>/g,' ').replace(/​/g,'').replace(/\s+/g,' ').trim()); }catch(e){ return q; } }
  const s=String(q.q).replace(/<[^>]+>/g,' ').replace(/​/g,'').replace(/\s+/g,' ').trim();
  if(q.opts.some(o=>typeof o!=='number')) return q;
  let cand=null; for(const [re,f] of EPR){ const m=s.match(re); if(m){ try{ cand=f(m,q); }catch(e){ cand=null; } break; } }
  if(!cand) return q;
  const old=q.mis||{}, seen=new Set([q.ans]), wrong=[];
  for(const o of q.opts) if(o!==q.ans&&old[o]&&!seen.has(o)){ seen.add(o); wrong.push([o,old[o]]); }          // 이미 코드가 붙은 오답은 살린다
  for(const [v,c] of cand){ if(wrong.length>=3) break; if(!Number.isInteger(v)||v<0||seen.has(v)) continue; seen.add(v); wrong.push([v,c]); }
  if(wrong.length<2){ for(const o of q.opts){ if(wrong.length>=2) break; if(!seen.has(o)){ seen.add(o); wrong.push([o,'F']); } } }
  wrong.length=Math.min(wrong.length,3);
  const all=[q.ans,...wrong.map(w=>w[0])].sort((a,b)=>a-b); const k=(q.ans*7+all.length*3+wrong.reduce((x,w)=>x+w[0],0))%all.length;   // 정답 자리가 한쪽에 몰리지 않게 돌린다
  q.opts=all.slice(k).concat(all.slice(0,k)); q.mis={}; for(const [v,c] of wrong) if(c) q.mis[v]=c; return q; }
function fixEP(q){ if(q){ /* 빼기 기호를 하이픈(-)이 아니라 −로 통일 */ for(const k of ['q','ansText','hint']) if(typeof q[k]==='string') q[k]=q[k].replace(/(\d)\s-\s(\d)/g,'$1 − $2'); if(typeof q.visual==='string') q.visual=q.visual.replace(/>-<\/(i|span|b)>/g,'>−</$1>').replace(/(\d)\s-\s(\d)/g,'$1 − $2'); }
  if(q){ for(const k of ['speech','ansSpeech','hint']) if(typeof q[k]==='string') q[k]=fixJosa(q[k]); } if(q&&typeof q.q==='string'){ q.q=q.q.replace(/(하나​?['’])은/,'$1는'); q.q=q.q.replace(/^(['‘].*?([가-힣])​?['’])[은는] 숫자로\?$/,(m,a,ch)=>a+(((ch.charCodeAt(0)-0xAC00)%28)?'은':'는')+' 숫자로?');
  { const m=q.q.match(/^(\d+)에서 숫자 (\d)([은는]) 얼마\?$/); const an=+q.ans; if(m&&an>0){ const pl=an>=1000?'천':an>=100?'백':an>=10?'십':'일'; q.q=`${m[1]}에서 ${pl}의 자리 숫자 ${m[2]}${m[3]} 얼마?`; } } } return q; }
/* 1~2학년 쓰기형(보기 없는) 틀: 객관식과 같은 규칙(EPR)으로 '오개념이면 쓰는 답'을 계산해 예상 오답으로 단다 */
function epWrite(q){ try{ if(!q||typeof q!=='object'||(q.opts&&q.opts.length)||q.manip||q.onMount||(q.mis&&Object.keys(q.mis).length)) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q;
  const q0=_pl(q.q).replace(/\s+/g,' ').trim(), cands=[q0, q0.replace(/ 수를 써요$/,' 수는?'), String(q.ansText||'').replace(/= \d+\s*$/,'= ?')]; if(/^빈칸을 찾아요$/.test(q0)){ let V=_pl(q.visual).replace(/\s+/g,' ').trim().replace(/^[+−-] (?=[+−-])/,''); V=/^[+−-] \d/.test(V)?'□ '+V:V.replace(/([+−-]) =/,'$1 □ ='); cands.push(V.replace(/-/g,'−')); }   /* 그림 칸의 식(□ − 3 = 5)을 글로 되살려 객관식 규칙에 맞춘다 */ for(const t of cands){ const u=String(t).replace(/\s+/g,' ').trim(); if(!u) continue; for(const [re,f] of EPR){ const m=u.match(re); if(!m) continue;
      if(/^\d+ [+×−-] \d+ = \?$/.test(u)){ const n=(u.match(/\d+/g)||[]).map(Number), o=(u.match(/[+×−-]/)||[])[0], v=o==='+'?n[0]+n[1]:o==='×'?n[0]*n[1]:n[0]-n[1]; if(String(v)!==A) continue; }   /* 순수한 식이면 계산한 값이 정답과 같을 때만. □·말로 된 꼴은 객관식과 같은 규칙을 그대로 쓴다 */
      const mis={}, clash=new Set(); for(const [w,c] of (f(m,q)||[])){ const k=String(w); if(k===A||!/^\d+$/.test(k)||typeof c!=='string'||c==='F') continue; if(k in mis){ if(mis[k]!==c) clash.add(k); continue; } mis[k]=c; } clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length){ q.mis=mis; return q; } } } }catch(e){} return q; }
if(typeof G!=='undefined') for(const e of Object.keys(G)) G[e]=G[e].map(g=>function(){ return mixOpts(epWrite(epWrong(fixEP(g.apply(this,arguments))))); });

/* ========== 3-37. 그림을 보고 구하는 도형 문제 — 반드시 파일 맨 끝(틀 번호가 뒤에 붙도록) ========== */
/* ---------- 그림을 보고 구하는 도형 문제 (교수님 11/21: 초등은 구체적 조작기 — 글로만 주는 문제와 함께, 실제 도형을 보여 주고 넓이·둘레·각도를 구하게 하는 문제가 있어야 한다) ----------
   각도는 주어진 값대로 그린다(눈으로 봐도 맞게). 문제 글에는 수를 넣지 않고 그림의 표시에서 읽게 한다. */
const _T=(x,y,t,sz=14,c='#4A2E14')=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${sz}" text-anchor="middle" font-weight="700" fill="${c}">${t}</text>`;
const _fit=(pts,W,H,pad)=>{ const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]), x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys), k=Math.min((W-2*pad)/(x1-x0||1),(H-2*pad)/(y1-y0||1)), ox=(W-(x1-x0)*k)/2, oy=(H-(y1-y0)*k)/2; return pts.map(p=>[ox+(p[0]-x0)*k, oy+(y1-p[1])*k]); };   /* 수학 좌표(위가 +) → 화면 좌표 */
const _inLab=(P,i,t,d=26)=>{ const n=P.length, c=[P.reduce((a,p)=>a+p[0],0)/n, P.reduce((a,p)=>a+p[1],0)/n], v=[c[0]-P[i][0], c[1]-P[i][1]], L=Math.hypot(v[0],v[1])||1; return _T(P[i][0]+v[0]/L*d, P[i][1]+v[1]/L*d+5, t, 13, /\?/.test(t)?'#D45F16':'#4A2E14'); };   /* 꼭짓점 안쪽에 각 표시 */
const polyAngSvg=(pts,labs)=>{ const W=260,H=150, P=_fit(pts,W,H,20); return SV(W,H,`<polygon points="${P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="#FFE3B0" ${STK}/>`+labs.map((t,i)=>t?_inLab(P,i,t):'').join(''),300); };
const _rad=d=>d*Math.PI/180;
const triPts=(A,B)=>{ const L=10, C=180-A-B, b=L*Math.sin(_rad(B))/Math.sin(_rad(C)); return [[0,0],[L,0],[b*Math.cos(_rad(A)), b*Math.sin(_rad(A))]]; };   /* 왼쪽 각 A, 오른쪽 각 B */
const quadPts=(a,b,c)=>{ const L1=10, L2=6, P0=[0,0], P1=[L1,0], d1=_rad(180-b), P2=[P1[0]+L2*Math.cos(d1), P1[1]+L2*Math.sin(d1)], d2=d1+_rad(180-c), u=[Math.cos(d2),Math.sin(d2)], w=[Math.cos(_rad(a)),Math.sin(_rad(a))], den=u[0]*w[1]-u[1]*w[0]; if(Math.abs(den)<1e-6) return null; const t=(-(P2[0])*w[1]+P2[1]*w[0])/den, s=(u[0]*(-P2[1])-u[1]*(-P2[0]))/(-den); if(!(t>1)||!(s>1)) return null; return [P0,P1,P2,[P2[0]+t*u[0],P2[1]+t*u[1]]]; };   /* 각 a(왼쪽 아래), b(오른쪽 아래), c(오른쪽 위) */
const _tick=(p,q)=>{ const m=[(p[0]+q[0])/2,(p[1]+q[1])/2], v=[q[0]-p[0],q[1]-p[1]], L=Math.hypot(v[0],v[1])||1, n=[-v[1]/L*6, v[0]/L*6]; return `<line x1="${(m[0]-n[0]).toFixed(1)}" y1="${(m[1]-n[1]).toFixed(1)}" x2="${(m[0]+n[0]).toFixed(1)}" y2="${(m[1]+n[1]).toFixed(1)}" stroke="#D45F16" stroke-width="2.5"/>`; };
const isoSvg=(apex,labs)=>{ const base=(180-apex)/2, W=260,H=150, P=_fit(triPts(base,base),W,H,20); return SV(W,H,`<polygon points="${P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="#FFE3B0" ${STK}/>`+_tick(P[0],P[2])+_tick(P[1],P[2])+labs.map((t,i)=>t?_inLab(P,i,t):'').join(''),300); };
const rectQSvg=(inside,bottom,left)=>SV(240,140,`<rect x="50" y="18" width="150" height="88" fill="#FFE3B0" ${STK}/>`+_T(125,68,inside,14)+_T(125,128,bottom,14)+_T(26,67,left,14,/\?/.test(left)?'#D45F16':'#4A2E14'),300);
const cubeSvg=a=>SV(220,162,`<polygon points="40,55 135,55 135,150 40,150" fill="#FFE3B0" ${STK}/><polygon points="40,55 80,18 175,18 135,55" fill="#FFF0D0" ${STK}/><polygon points="135,55 175,18 175,113 135,150" fill="#F5D39A" ${STK}/><line x1="40" y1="150" x2="80" y2="113" ${DASH}/><line x1="80" y1="113" x2="175" y2="113" ${DASH}/><line x1="80" y1="18" x2="80" y2="113" ${DASH}/>`+_T(88,146,a+' cm',14),240);
const diaSvg=t=>SV(240,140,`<circle cx="120" cy="68" r="56" fill="#FFE3B0" ${STK}/><line x1="64" y1="68" x2="176" y2="68" ${DASH}/><circle cx="120" cy="68" r="3" fill="#4A2E14"/>`+_T(120,60,t,14),300);
const rowCircSvg=(n,t,mark)=>{ const r=Math.min(40,110/n), W=Math.max(2*r*n+30,120), cy=r+22; let s=''; for(let i=0;i<n;i++){ const cx=15+r+2*r*i; s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFE3B0" ${STK}/><circle cx="${cx}" cy="${cy}" r="2.5" fill="#4A2E14"/>`; } s+=`<line x1="${15+r}" y1="${cy}" x2="${15+2*r}" y2="${cy}" ${DASH}/>`+_T(15+r,cy-r-5,'반지름 '+t,12); if(mark==='len') s+=`<line x1="15" y1="${cy+r+12}" x2="${15+2*r*n}" y2="${cy+r+12}" stroke="#D45F16" stroke-width="2"/>`+_T(15+r*n,cy+r+28,'?',14,'#D45F16'); else s+=`<line x1="${15+r}" y1="${cy+r+12}" x2="${15+r+2*r*(n-1)}" y2="${cy+r+12}" stroke="#D45F16" stroke-width="2"/>`+_T(15+r*n,cy+r+28,'?',14,'#D45F16'); return SV(W,cy+r+34,s,320); };
ADD('S6-50', ()=>{ let a,b; do{ a=rnd(25,95); b=rnd(25,95); }while(a+b>150||a+b<70); const c=180-a-b; return WM('그림을 보고 ?로 표시한 각의 크기를 구해 보세요.', polyAngSvg(triPts(a,b),[a+'°',b+'°','?']), c, [[360-a-b,'G4-12'],[a+b,'G4-12']], '', '도'); });
ADD('S6-51', ()=>{ for(let k=0;k<40;k++){ const a=rnd(60,110), b=rnd(60,115), c=rnd(60,120), d=360-a-b-c; if(d<50||d>130) continue; const P=quadPts(a,b,c); if(!P) continue; return WM('사각형에서 ?로 표시한 각의 크기를 구해 보세요.', polyAngSvg(P,[a+'°',b+'°',c+'°','?']), d, [[180-a-b-c>0?180-a-b-c:null,'G4-12'],[a+b+c,'G4-12']], '', '도'); } return G36['S6-51'][0](); });
ADD('S6-28', ()=>{ const t=rnd(10,60)*2, base=(180-t)/2; return WM('두 변의 길이가 같은 삼각형이에요. ?로 표시한 각의 크기는?', isoSvg(t,['?','',t+'°']), base, [[180-t,'G4-18'],[t,'G4-18']], '', '도'); });
ADD('S6-28', ()=>{ const base=rnd(25,80), t=180-2*base; return WM('두 변의 길이가 같은 삼각형이에요. ?로 표시한 각의 크기는?', isoSvg(t,[base+'°','','?']), t, [[180-base,'G4-18'],[base,'G4-18']], '', '도'); });
ADD('S6-68', ()=>{ const a=rnd(3,12), b=rnd(2,9), S=a*b; return WM('직사각형의 넓이가 그림과 같아요. ?에 알맞은 길이는?', rectQSvg(`넓이 ${S} cm²`, a+' cm', '?'), b, [[S-a>0?S-a:null,'G5-01'],[(S-2*a)>0&&(S-2*a)%2===0?(S-2*a)/2:null,'G5-01']], '', 'cm'); });
ADD('S6-66', ()=>{ const a=rnd(3,12), b=rnd(2,9), R=2*(a+b); return WM('직사각형의 둘레가 그림과 같아요. ?에 알맞은 길이는?', rectQSvg(`둘레 ${R} cm`, a+' cm', '?'), b, [[R-a,'G5-01'],[R%a===0?R/a:null,'G5-01'],[R-2*a,'G5-13']], '', 'cm'); });
ADD('S6-71', ()=>{ const a=rnd(2,8)*2, h=rnd(2,5)*2, S=a*h/2; return WM(`넓이가 ${S} cm²인 삼각형이에요. ?로 표시한 높이는?`, figSvg('tri',a,'?'), h, [[S/a,'G5-03']], '', 'cm'); });
ADD('S6-70', ()=>{ const a=rnd(4,12), h=rnd(3,9), S=a*h; return WM(`넓이가 ${S} cm²인 평행사변형이에요. ?로 표시한 높이는?`, figSvg('para',a,'?'), h, [[2*h,'G5-16']], '', 'cm'); });
ADD('S6-56', ()=>{ const a=rnd(3,9), b=rnd(2,8), c=rnd(2,8); return WM('직육면체의 모든 모서리 길이의 합은?', boxSvg(a,b,c), 4*(a+b+c), [[a+b+c,'G5-13'],[2*(a+b+c),'G5-13']], '', 'cm'); });
ADD('S6-76', ()=>{ const a=rnd(2,9); return WM('정육면체의 겉넓이는?', cubeSvg(a), 6*a*a, [[a*a*a,'G6-05'],[a*a,'G6-06'],[4*a*a,'G6-06']], '', 'cm²'); });
ADD('S6-78', ()=>{ const a=rnd(2,9); return WM('정육면체의 부피는?', cubeSvg(a), a*a*a, [[6*a*a,'G6-05'],[a*a,'G6-06']], '', 'cm³'); });
ADD('S6-26', ()=>{ const r=rnd(2,15), d=2*r; return WM('원의 반지름은 몇 cm일까요?', diaSvg(d+' cm'), r, [[2*d,'G3-04'],[d,'G3-04']], '', 'cm'); });
ADD('S6-27', ()=>{ const n=rnd(2,4), r=rnd(2,9); return WM('크기가 같은 원을 맞닿게 그렸어요. ?로 표시한 전체 길이는?', rowCircSvg(n,r+' cm','len'), 2*r*n, [[r*n,'G3-04'],[2*r*(n-1),'G3-10']], '', 'cm'); });
ADD('S6-27', ()=>{ const n=rnd(3,4), r=rnd(2,9); return WM('크기가 같은 원을 맞닿게 그렸어요. 양 끝 두 원의 중심 사이의 거리(?)는?', rowCircSvg(n,r+' cm','ctr'), 2*r*(n-1), [[2*r*n,'G3-10'],[r*(n-1),'G3-04']], '', 'cm'); });


// ===== 3-38. 풀이 단계는 '식의 빈칸 채우기'로 =====
// 분수 나눗셈 첫 문제는 중간 식(= 3분의 2 × 3분의 1 =)을 다 보여 줘서 마지막 곱셈만 하면 됐다.
// 중간 식에서 핵심이 되는 수를 빈칸으로 바꾼다. 식 전체를 쓰게 하지 않고 칸만 채우게 한다.
// 답 열쇠 = (단계 칸에 쓴 숫자) + (마지막 답). 단계 칸을 틀리면 그 자리에서 오개념을 알 수 있다.
const _sb=n=>'<b class="fs">'+'<span class="vslot"></span>'.repeat(String(n).length)+'</b>';
const _fr2=/<span class="frac"><b>(\d+)<\/b><i><\/i><b>(\d+)<\/b><\/span>/g;
const STEPB={
 // 곱셈으로 바꾸는 단계: 뒤의 분수(역수)를 빈칸으로. 뒤집지 않고 그대로 쓰면 N6-02
 inv:(st)=>{ const m=[...st.matchAll(_fr2)]; if(m.length!==2) return null; const [all,t,b]=m[1]; return {html:st.slice(0,m[1].index)+`<span class="frac">${_sb(t)}<i></i>${_sb(b)}</span>`+st.slice(m[1].index+all.length), key:t+b, wrong:t!==b?[[b+t,'N6-02']]:[]}; },
 // 통분하는 단계: 두 분자를 빈칸으로. 분자를 그대로 두면 N5-13
 com:(st,pr)=>{ const m=[...st.matchAll(_fr2)], o=[...pr.matchAll(_fr2)]; if(m.length!==2||o.length!==2) return null; let h=st; for(const x of [m[1],m[0]]) h=h.slice(0,x.index)+`<span class="frac">${_sb(x[1])}<i></i><b>${x[2]}</b></span>`+h.slice(x.index+x[0].length);
   const key=m[0][1]+m[1][1], w=o[0][1]+o[1][1]; return {html:h, key, wrong:w!==key&&w.length===key.length?[[w,'N5-13']]:[]}; },
 // (자연수 ÷ 분자) × 분모 단계: 분자·분모 자리를 빈칸으로. 서로 바꿔 쓰면 N6-02
 nat:(st)=>{ const m=st.match(/^<b>\((\d+) ÷ (\d+)\) × (\d+)<\/b>$/); if(!m) return null; return {html:`<b>(${m[1]} ÷</b>${_sb(m[2])}<b>) ×</b>${_sb(m[3])}`, key:m[2]+m[3], wrong:m[2]!==m[3]?[[m[3]+m[2],'N6-02']]:[]}; }
};
const STEPT={'S3-98#1':'inv','S3-107#0':'inv','S3-113#3':'inv','S3-105#0':'com','S3-106#0':'nat'};
function stepBlank(ep,i,q){ const k=STEPT[ep+'#'+i]; if(!k||!q||!q.write||!q.slots||typeof q.visual!=='string') return q;
  const P=q.visual.split('<i>=</i>'); if(P.length!==3) return q; const r=STEPB[k](P[1],P[0]); if(!r) return q;
  const v=[P[0],r.html,P[2]].join('<i>=</i>'), A=String(q.ans); if((v.match(/class="vslot"/g)||[]).length!==r.key.length+A.length) return q;
  const mis={}; for(const [m,c] of Object.entries(q.mis||{})) if(m.length===A.length) mis[r.key+m]=c;
  for(const [w,c] of r.wrong){ mis[w+A]=c; for(const m of Object.keys(q.mis||{})) if(m.length===A.length) mis[w+m]=c; }
  q.visual=v.replace('class="eqrow long"','class="eqrow long stepq"').replace(/class="vslot"/g,'class="vslot mini"'); q.ans=r.key+A; q.mis=mis; q._step=r.key.length; return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=stepBlank(ep,i,q); }catch(e){} return q; }; }


// ===== 3-39. 시간·복합 단위 답은 '단위마다 답 상자 하나' =====
// 칸(숫자 한 자리마다 하나)은 칸 수가 답의 자릿수를 알려 줘서 '3시간 75분', '0시간 115분' 같은 답을 쓸 수 없었다.
// Claude·카본 상의(11/21): 단위마다 길이 제한이 느슨한 상자 하나([ ]시간 [ ]분). 단위 틀은 남기고 자릿수 힌트만 없앤다.
// 예상 오답 열쇠는 '큰 단위 값,작은 단위 값'(예: "3,75"). 화면은 build.py의 mountUnit.
Object.assign(MIS,{'G2-17':['작은 단위가 넘쳤는데 큰 단위로 바꾸지 않음','60분은 1시간, 100 cm는 1 m처럼 넘친 만큼 큰 단위로 바꿔 써요.']});
const UBASE={'시+분':60,'시간+분':60,'분+초':60,'m+cm':100,'cm+mm':10,'km+m':1000,'L+mL':1000,'kg+g':1000};
function codeU(q){ if(!q||!q.write||!q.slots||typeof q.visual!=='string') return q;
  const m=q.visual.match(/<span class="vgrp">((?:<span class="vslot[^"]*"><\/span>)+)<\/span><b>([^<]+)<\/b><span class="vgrp">((?:<span class="vslot[^"]*"><\/span>)+)<\/span><b>([^<]+)<\/b><\/div>$/); if(!m) return q;
  const u=[m[2].trim(),m[4].trim()], base=UBASE[u.join('+')]; if(!base) return q;
  const n1=(m[1].match(/vslot/g)||[]).length, n2=(m[3].match(/vslot/g)||[]).length, A=String(q.ans); if(!/^\d+$/.test(A)||n1+n2!==A.length||(q.visual.match(/class="vslot/g)||[]).length!==A.length) return q;
  const a=[+A.slice(0,n1),+A.slice(n1)], tot=a[0]*base+a[1], T={};
  const add=(x,y,c)=>{ if(!(x>=0)||!(y>=0)||x!==Math.floor(x)||y!==Math.floor(y)||(x===a[0]&&y===a[1])) return; const k=x+','+y; if(!(k in T)) T[k]=c; };
  for(const [k,c] of Object.entries(q._ut||{})){ const [x,y]=k.split(',').map(Number); add(x,y,c); if(c==='N2-01') add(x,y+base,'G2-17'); }   // 받아올림을 안 한 답과, 넘친 채로 둔 답
  for(const [k,c] of Object.entries(q.mis||{})) if(/^\d+$/.test(k)&&k.length===A.length) add(+k.slice(0,n1),+k.slice(n1),c);
  const Q=_pl(q.q).replace(/,/g,'').replace(/\s+/g,' ').trim(); let c;
  if(u[0]==='시'&&/<svg/.test(q.visual)&&/시계/.test(Q)){ if(a[1]>0&&a[1]%5===0) add(a[0],a[1]/5,'G2-07'); if(a[1]>=30) add(a[0]%12+1,a[1],'G2-06'); }   // 시계 읽기
  if((c=Q.match(/(\d+) ?(mm|cm|m|mL|g|분|초)[는은]? ?몇/))&&+c[1]===tot){ add(0,tot,'G2-17'); if(base===60) add(Math.floor(tot/100),tot%100,'G2-03'); if(base===1000) add(Math.floor(tot/100),tot%100,'G3-05'); }   // 단위 바꾸기
  q.ub={u,base,a}; if(Object.keys(T).length) q.mis=Object.assign({},q.mis||{},T); return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=codeU(q); }catch(e){} return q; }; }


// ===== 3-40. km·m 뺄셈: 자릿수 함정이 있는 수 조합 =====
// 카본 지적(11/21): 'km ### m'끼리는 십진 계산과 답이 같아 오개념이 안 드러난다. m가 두 자리이고 받아내림이 있어야 100으로 받아내리는 오답(G3-05)이 갈린다.
ADD('S6-39', ()=>{ const c=rnd(1,2), a=c+rnd(2,3), b=rnd(10,90), d=rnd(b+10,Math.min(950,b+400)), tot=a*1000+b-c*1000-d; return WN2(`${a} km ${b} m − ${c} km ${d} m`,'',Math.floor(tot/1000),'km',tot%1000,'m'); });


// ===== 3-41. 줄은 의미 단위로 =====
// 교수님 지시(11/21): '□□시 □□분'이 '□□시 □□ / 분'으로 꺾이면 안 된다. 칸 묶음과 그 단위 글자를 한 덩어리(.uchunk)로 묶어
// 덩어리 안에서는 줄이 바뀌지 않게 한다. 한 줄에 다 안 들어가면 덩어리 사이에서만 바뀐다(□□시 / □□분).
function unitChunk(q){ if(!q||typeof q.visual!=='string'||q.visual.indexOf('uchunk')>=0) return q;
  q.visual=q.visual.replace(/<span class="vgrp">((?:<span class="vslot[^"]*"><\/span>|<em class="dot"><\/em>)+)<\/span><b>([^<]{1,6})<\/b>/g,'<span class="uchunk"><span class="vgrp">$1</span><b>$2</b></span>'); return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=unitChunk(q); }catch(e){} return q; }; }


// ===== 3-42. 덧셈표·곱셈표를 묻는데 표가 없던 문제에 표를 붙인다 (교수님 지적 11/22) =====
// 글로만 "덧셈표에서 오른쪽으로 한 칸 갈 때마다…"를 물으면 표를 떠올리지 못하는 아이는 풀 수 없다. 문제에 나온 단(6단 등)이 들어가게 표를 그리고, 그 줄을 칠한다.
function opTable(op,rows,cols,hiRow){ const f=(x,y)=>op==='+'?x+y:x*y;
  return `<table class="dt num"><tr><th>${op}</th>${cols.map(x=>`<th>${x}</th>`).join('')}</tr>${rows.map(x=>`<tr><th>${x}</th>${cols.map(y=>`<td${x===hiRow?' style="background:#FFE3B0"':''}>${f(x,y)}</td>`).join('')}</tr>`).join('')}</table>`; }
function tableVis(q){ if(!q||(q.visual&&String(q.visual).trim())) return q; const t=_pl(String(q.q)); const m=t.match(/(덧셈표|곱셈표)/); if(!m) return q;
  const op=m[1]==='덧셈표'?'+':'×', dan=(t.match(/(\d)단/)||[])[1], d=dan?+dan:null;
  let rows=[1,2,3,4,5]; if(d){ const lo=Math.max(1,Math.min(d-2,5)); rows=[lo,lo+1,lo+2,lo+3,lo+4]; }
  const cols=op==='+'?[1,2,3,4,5]:[1,2,3,4,5,6];
  q.visual=opTable(op,rows,cols,d||(op==='+'?null:null)); return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=tableVis(q); }catch(e){} return q; }; }


// ===== 3-43. 말풍선 속 식은 한 덩어리로 (교수님 11/22: 의미 단위 줄바꿈) =====
// '2 × 8 = 4 × □ 의 □는?'이 '2 × 8 = 4 / × □ 의 □는?'으로 꺾이지 않게, 식(수·□·?와 연산 기호가 이어진 부분)을 줄바꿈 없는 덩어리로 감싼다.
const EXPR_RE=/((?:\d[\d,.]*|□|\?)(?:\s*[+\-−×÷=<>:]\s*(?:\d[\d,.]*|□|\?))+)/g;
function nowrapExpr(q){ if(!q||typeof q.q!=='string'||q.q.indexOf('class="nw"')>=0) return q;
  q.q=q.q.split(/(<[^>]+>)/).map(seg=>seg.startsWith('<')?seg:seg.replace(EXPR_RE,m=>/[+\-−×÷=<>:]/.test(m)&&m.length>4?`<span class="nw">${m}</span>`:m)).join(''); return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=nowrapExpr(q); }catch(e){} return q; }; }


// ===== 3-44. 그림 없이 글로만 상황을 묻던 문제에 그림 붙이기 (교수님 11/22) =====
// 원칙(교수님): 에셋에 그 수업 그림이 있으면 쓰고, 없으면 Flow로 그린다. 그림 때문에 오개념이 생기지 않게 구성한다.
//  - 물건 그림(Flow, img/obj/*.webp): 실제 크기 순서를 지킨다(기차 > 자전거, 코끼리 > 고양이 > 토끼). 같은 크기 칸에 넣으면 '그림 크기 = 실제 크기'로 잘못 읽을 수 있어서.
//  - 저울의 두 공은 크기를 같게(크기가 아니라 무게를 보게), 물 높이를 견주는 두 컵은 똑같은 컵.
//  - 값이 바뀌는 그림(자 눈금, 시계, 수 배열표, 표·그래프, 모양 늘어놓기)은 코드로 정확히 그린다.
const OBJ=(n,w)=>`<img class="objimg" src="img/obj/${n}.webp" alt="" style="width:${w||72}px">`;
const OBJN={'축구공':'soccer','구슬':'marble','수박':'watermelon','주사위':'dice','휴지 상자':'tissuebox','책':'book','풀통':'gluestick','음료수 캔':'can','휴지심':'tube','북':'drum','시계':'clock','삼각김밥':'gimbap','공책':'notebook','우산':'umbrella','지우개':'eraser','자전거':'bicycle','기차':'train','욕조':'bathtub','숟가락':'spoon','컵':'cup','코끼리':'elephant','고양이':'cat','토끼':'rabbit','손수건':'handkerchief','이불':'blanket','주전자':'kettle','물병':'bottle'};
// 실제 크기 순서를 지키는 너비(px)
const OBJW={train:230,bicycle:80,umbrella:150,eraser:30,bathtub:170,cup:42,spoon:40,elephant:170,cat:58,rabbit:44,blanket:180,handkerchief:44};
/* 실제 물건을 견주는 그림은 실제 크기 순서대로 크기를 달리해 그린다 (교수님 11/22: 같은 크기로 그리면 그림을 보고 오답을 고를 수 있음). 크기 등급을 모르는 물건이 섞이면 같은 칸. */
const OBJ_SIZE={'기차':10,'코끼리':10,'욕조':8,'이불':8,'자전거':6,'우산':5,'수박':5,'북':5,'고양이':4,'주전자':4,'축구공':4,'토끼':3,'물병':3,'책':3,'공책':3,'휴지 상자':3,'시계':3,'컵':2,'손수건':2,'숟가락':2,'음료수 캔':2,'풀통':2,'휴지심':2,'삼각김밥':2,'주사위':1,'지우개':1,'구슬':1};
const objRow=(names)=>{ const sz=names.map(n=>OBJ_SIZE[n]), known=names.length>1&&sz.every(v=>v!=null)&&new Set(sz).size>1, mn=Math.min(...sz), mx=Math.max(...sz), px=v=>known?Math.round(46+(140-46)*(v-mn)/(mx-mn)):84;
  return `<div class="objrow" style="align-items:flex-end">${names.map((n,i)=>{ const k=OBJN[n], w=px(sz[i]); return k?`<figure style="width:${Math.max(64,w+10)}px"><div style="height:${known?Math.max(56,Math.min(110,w)):78}px;display:flex;align-items:flex-end;justify-content:center"><img class="objimg" src="img/obj/${k}.webp" alt="" style="max-width:${w}px;max-height:${known?w:74}px;width:auto;height:auto"></div><figcaption>${n}</figcaption></figure>`:''; }).join('')}</div>`; };
const sh3=()=>`<div class="objrow">${[['상자 모양','tissuebox'],['둥근기둥 모양','can'],['공 모양','soccer']].map(([t,k])=>`<figure>${OBJ(k,64)}<figcaption>${t}</figcaption></figure>`).join('')}</div>`;
const flat3=()=>`<div class="objrow">${[['동그라미','<circle cx="30" cy="30" r="24"/>'],['세모','<polygon points="30,6 55,52 5,52"/>'],['네모','<rect x="7" y="7" width="46" height="46"/>']].map(([t,g])=>`<figure><svg width="60" height="60" viewBox="0 0 60 60" fill="#FFE3B0" stroke="#B5701F" stroke-width="3">${g}</svg><figcaption>${t}</figcaption></figure>`).join('')}</div>`;
function rulerSvg(a,b,name){ const u=26, W=12*u+30; let g=`<rect x="10" y="40" width="${11*u+10}" height="34" rx="4" fill="#FFF3C4" stroke="#B5701F" stroke-width="2"/>`;
  for(let i=0;i<=11;i++){ g+=`<line x1="${15+i*u}" y1="40" x2="${15+i*u}" y2="${i%5===0?58:54}" stroke="#4A2E14" stroke-width="1.5"/><text x="${15+i*u}" y="70" font-size="12" text-anchor="middle" fill="#4A2E14">${i}</text>`; for(let j=1;j<10&&i<11;j++) g+=`<line x1="${15+i*u+j*u/10}" y1="40" x2="${15+i*u+j*u/10}" y2="${j===5?50:46}" stroke="#4A2E14" stroke-width=".7"/>`; }
  g+=`<rect x="${15+a*u}" y="10" width="${(b-a)*u}" height="24" rx="5" fill="${name==='못'?'#B9BEC6':'#F7B6C2'}" stroke="#6B3E1C" stroke-width="2"/><line x1="${15+a*u}" y1="34" x2="${15+a*u}" y2="40" stroke="#D45F16" stroke-dasharray="2 2"/><line x1="${15+b*u}" y1="34" x2="${15+b*u}" y2="40" stroke="#D45F16" stroke-dasharray="2 2"/>`;
  return `<svg viewBox="0 0 ${W} 80" width="${W}" style="max-width:100%">${g}</svg>`; }
function clockSvg(h,m){ const P=(deg,r)=>[60+r*Math.sin(deg*Math.PI/180),60-r*Math.cos(deg*Math.PI/180)]; let g=`<circle cx="60" cy="60" r="54" fill="#fff" stroke="#6B3E1C" stroke-width="5"/>`;
  for(let k=1;k<=12;k++){ const [x,y]=P(k*30,42); g+=`<text x="${x}" y="${y+5}" font-size="14" text-anchor="middle" fill="#4A2E14">${k}</text>`; } for(let k=0;k<60;k++){ const [x1,y1]=P(k*6,52), [x2,y2]=P(k*6,k%5?49:46); g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4A2E14" stroke-width="${k%5?1:2}"/>`; }
  const [hx,hy]=P(((h%12)+m/60)*30,26), [mx,my]=P(m*6,40); return `<svg viewBox="0 0 120 120" width="140">${g}<line x1="60" y1="60" x2="${hx}" y2="${hy}" stroke="#4A2E14" stroke-width="6" stroke-linecap="round"/><line x1="60" y1="60" x2="${mx}" y2="${my}" stroke="#D45F16" stroke-width="3.5" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#4A2E14"/></svg>`; }
function hundredTable(r0,r1,mark,hi,upto){ let t='<table class="dt num hund">'; for(let r=r0;r<=r1;r++){ t+='<tr>'; for(let c=1;c<=10;c++){ const n=r*10+c; const shown=mark&&mark[n]!=null?mark[n]:(upto&&n>upto?'':n); t+=`<td${hi&&hi.includes(n)?' style="background:#FFD08A"':''}>${shown}</td>`; } t+='</tr>'; } return t+'</table>'; }
const symRow=(arr)=>`<div class="seqrow" style="--n:${arr.length}">${arr.map(x=>`<span class="seqit${x==='□'||x==='?'?' seqq':''}" style="font-size:1.5rem">${x==='□'?'?':x}</span>`).join('')}</div>`;
function sitVis(q){ if(!q||(q.visual&&String(q.visual).trim())||q.manip||q.onMount) return q; const t=_pl(String(q.q)); let m; let v='';
  if(/양팔저울/.test(t)&&/빨간 공 쪽이 내려/.test(t)) v=OBJ('balance',200);
  else if(/가득 찬 가 컵의 물을 빈 나 컵에 부었더니 넘쳤/.test(t)) v=`<div class="objrow" style="gap:30px">${['가','나'].map(n=>`<figure>${OBJ('cup',62)}<figcaption>${n} 컵</figcaption></figure>`).join('')}</div>`;   /* 넘치는 장면을 그리면 그림만 보고 답한다 → 컵 두 개만, 크기도 같게 */
  else if(/같은 컵에 물을 부었더니 높이가/.test(t)) v=OBJ('twocups',190);
  else if((m=t.match(/주전자는 (\d+)컵, 물병은 (\d+)컵/))){ const cups=n=>Array.from({length:n},()=>OBJ('cup',24)).join(''); const hImg=(k)=>`<img class="objimg" src="img/obj/${k}.webp" alt="" style="height:90px;width:auto">`; v=`<div class="objrow" style="align-items:flex-start;gap:26px">${[['kettle','주전자',+m[1]],['bottle','물병',+m[2]]].map(([k,n,c])=>`<figure style="width:120px">${hImg(k)}<figcaption>${n}</figcaption><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2px;width:112px">${cups(c)}</div></figure>`).join('')}</div>`;   /* 두 그릇은 같은 높이로(그림 크기가 아니라 컵 수로 견주게) */ }
  else if(/(어떤 모양|모양은\?)/.test(t)&&/(축구공|구슬|수박|주사위|휴지 상자|책|풀통|음료수 캔|휴지심|북)은|는 어떤 모양/.test(t)){ const o=(t.match(/^(.+?)(은|는) 어떤 모양/)||[])[1]; if(o&&OBJN[o]) v=`<div class="objrow"><figure>${OBJ(OBJN[o],96)}</figure></div>`; }
  else if(/(굴러가|쌓을 수|평평한 면|뾰족한 부분)/.test(t)&&/모양은\?/.test(t)) v=sh3();
  else if(/비슷한 모양은\?/.test(t)){ const o=(t.match(/^(시계|삼각김밥|공책)/)||[])[1]; if(o) v=`<div class="objrow"><figure>${OBJ(OBJN[o],96)}</figure></div>`; }
  else if(/뾰족한 곳이/.test(t)||/○, △, □ 모양에 대해/.test(t)) v=flat3();
  else if((m=t.match(/^더 (긴|짧은|좁은|넓은) 것은\?/))||/가장 (무거운|가벼운) 것은|가장 많이 담을 수 있는 것은/.test(t)) v=objRow(q.opts||[]);
  else if((m=t.match(/(지우개|못|연필|크레파스|색연필|클립)(이|가) 자의 눈금 (\d+)에서 시작해 눈금 (\d+)에서 끝나/))) v=rulerSvg(+m[3],+m[4],m[1]);
  else if((m=t.match(/짧은바늘이 (\d+)[와과] (\d+) 사이에 있고 긴바늘이 (\d+)/))) v=clockSvg(+m[1],(+m[3]%12)*5);
  else if((m=t.match(/수 배열표에서 (\d+), (\d+), (\d+)…로 색칠/))){ const a=+m[1]; v=hundredTable(0,4,null,[a,a+10,a+20,a+30,a+40].filter(x=>x<=50)); }
  else if((m=t.match(/수 배열표에서 (\d+)의 바로 (아래|위|오른쪽|왼쪽) 칸/))){ const n=+m[1], r=Math.floor((n-1)/10); const mk={}; const tgt=m[2]==='아래'?n+10:m[2]==='위'?n-10:m[2]==='오른쪽'?n+1:n-1; mk[tgt]='?'; v=hundredTable(Math.max(0,r-1),Math.min(9,r+1),mk,[n],n); }   /* 기준 수 뒤로는 비워 둔다 */
  else if(/수 배열표에서 (오른쪽으로|아래로) 한 칸/.test(t)) v=hundredTable(0,2,null,null);
  else if((m=t.match(/^([●▲■★○△□☆◆ ,]+) (에서 □에|다음에)/))){ const arr=m[1].split(/[ ,]+/).filter(x=>x); if(m[2]==='다음에') arr.push('?'); v=symRow(arr); }
  else if((m=t.match(/^([○△★□☆, ]+)를 모양에 따라/))) v=symRow(m[1].split(/[ ,]+/).filter(x=>x));
  else if((m=t.match(/큰 ○ (\d+)개, 작은 ○ (\d+)개, 큰 △ (\d+)개/))){ const c=(r,n)=>Array.from({length:n},()=>`<svg width="${r*2+4}" height="${r*2+4}"><circle cx="${r+2}" cy="${r+2}" r="${r}" fill="#FFE3B0" stroke="#B5701F" stroke-width="2"/></svg>`).join(''), tr=n=>Array.from({length:n},()=>`<svg width="44" height="40"><polygon points="22,2 42,38 2,38" fill="#CFE6F7" stroke="#3F7FB0" stroke-width="2"/></svg>`).join(''); v=`<div class="objrow" style="flex-wrap:wrap;gap:6px">${c(19,+m[1])}${c(10,+m[2])}${tr(+m[3])}</div>`; }
  else if((m=t.match(/(노란|빨간|파란|초록) (동그라미|세모|네모) (\d+)개, (노란|빨간|파란|초록) (동그라미|세모|네모) (\d+)개, (노란|빨간|파란|초록) (동그라미|세모|네모) (\d+)개/))){ const CL={빨간:'#E85D4A',파란:'#4A8FE8',노란:'#F2C230',초록:'#5DB85D'}, SH={동그라미:'동그라미',세모:'세모',네모:'네모'}; let it=[]; for(let k=0;k<3;k++) for(let j=0;j<+m[3+k*3];j++) it.push([m[2+k*3],m[1+k*3]]); it=shuffle(it); v=`<div class="items">${it.map(([s,c])=>shp(SH[s],CL[c])).join('')}</div>`; }
  else if((m=t.match(/강아지가 (\d+)명, 합계가 (\d+)명/))) v=`<table class="dt"><tr><th>동물</th><th>강아지</th><th>고양이</th><th>합계</th></tr><tr><th>사람 수(명)</th><td>${m[1]}</td><td>?</td><td>${m[2]}</td></tr></table>`;
  else if((m=t.match(/우유 (○+), 주스 (○+)/))) v=`<table class="dt"><tr><th>우유</th><td style="text-align:left;letter-spacing:4px">${m[1]}</td></tr><tr><th>주스</th><td style="text-align:left;letter-spacing:4px">${m[2]}</td></tr></table>`;
  else if(/원은 어떤 선으로|삼각형과 사각형의 공통점|원에는 꼭짓점이/.test(t)) v=`<div class="objrow">${[['원','<circle cx="30" cy="30" r="24"/>'],['삼각형','<polygon points="30,6 55,52 5,52"/>'],['사각형','<rect x="7" y="7" width="46" height="46"/>']].map(([n,g])=>`<figure><svg width="60" height="60" viewBox="0 0 60 60" fill="#FFF3DE" stroke="#B5701F" stroke-width="3">${g}</svg><figcaption>${n}</figcaption></figure>`).join('')}</div>`;
  else if(/길이를 비교할 때 먼저 할 일/.test(t)) v=`<svg viewBox="0 0 240 80" width="240"><line x1="20" y1="8" x2="20" y2="72" stroke="#D45F16" stroke-width="2" stroke-dasharray="4 3"/><rect x="20" y="16" width="170" height="16" rx="7" fill="#F2C230" stroke="#6B3E1C" stroke-width="2"/><rect x="20" y="48" width="120" height="16" rx="7" fill="#7FB8E6" stroke="#6B3E1C" stroke-width="2"/></svg>`;
  if(v){ q.visual=v; } return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=sitVis(q); }catch(e){} return q; }; }


// ===== 3-45. 자로 실제로 재기 (교수님 11/22: 2학년 cm·m는 실제로 재는 활동이 있어야) =====
// ① 자 옮겨 재기(조작): 연필이 자의 0에 맞춰져 있지 않다. 아이가 자를 끌어 0을 연필 끝에 맞춘 뒤 길이를 센다.
//    - 오개념이 생기지 않게: 연필은 늘 0이 아닌 곳에서 시작(0에 맞추는 단계를 건너뛰지 못하게), 길이는 cm 단위로 딱 떨어지게, 자의 1 cm 칸을 굵게.
//    - 첫 제출 코드: 자를 0에 맞추지 않고 끝 눈금을 읽음 G2-08, 눈금 줄 수를 셈(+1) G2-09.
// ② 줄자 읽기(쓰기): 1 m가 넘는 물건을 줄자에 대고 '몇 m 몇 cm'로. 0에서 시작하는 줄자, 10 cm마다 수.
function pencilSvg(x,len,u,y){ const L=len*u; return `<g><rect x="${x}" y="${y}" width="${L-14}" height="16" fill="#F2C230" stroke="#6B3E1C" stroke-width="1.5"/><rect x="${x}" y="${y}" width="10" height="16" fill="#F7B6C2" stroke="#6B3E1C" stroke-width="1.5"/><polygon points="${x+L-14},${y} ${x+L},${y+8} ${x+L-14},${y+16}" fill="#F3D9B1" stroke="#6B3E1C" stroke-width="1.5"/><polygon points="${x+L-5},${y+5.5} ${x+L},${y+8} ${x+L-5},${y+10.5}" fill="#4A2E14"/></g>`; }
function measureManip(L,start){ const u=26, N=12, W=u*(N+3); let rx=0.5, ans=0, moved=false;
  const draw=()=>{ let g=pencilSvg(10+start*u,L,u,14); const R=10+rx*u; g+=`<g class="rul" style="cursor:grab"><rect x="${R-8}" y="44" width="${N*u+16}" height="40" rx="4" fill="#FFF3C4" stroke="#B5701F" stroke-width="2"/>`;
    for(let i=0;i<=N;i++){ g+=`<line x1="${R+i*u}" y1="44" x2="${R+i*u}" y2="${i%5===0?64:60}" stroke="#4A2E14" stroke-width="${i===0?3:1.8}"/><text x="${R+i*u}" y="78" font-size="12" font-weight="700" text-anchor="middle" fill="${i===0?'#D45F16':'#4A2E14'}">${i}</text>`; if(i<N) for(let j=1;j<10;j++) g+=`<line x1="${R+i*u+j*u/10}" y1="44" x2="${R+i*u+j*u/10}" y2="${j===5?54:50}" stroke="#4A2E14" stroke-width=".6"/>`; }
    g+=`</g><text x="${W/2}" y="100" font-size="12" text-anchor="middle" fill="#8A6A4A">↔ 자를 끌어서 옮겨요</text>`; return g; };
  const upd=root=>{ root.querySelector('svg.mmeas').innerHTML=draw(); root.querySelector('#mval').textContent=ans; };
  return { html:`<svg class="mmeas" viewBox="0 0 ${W} 104" style="width:100%;max-width:380px;touch-action:none">${draw()}</svg><div class="mrow" style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:6px;font-family:Jua,sans-serif;font-size:1.3rem"><span>연필의 길이:</span><button class="ghost" id="mminus" style="width:44px;height:44px;font-size:1.4rem">−</button><b id="mval" style="min-width:36px;text-align:center;font-size:1.6rem">0</b><button class="ghost" id="mplus" style="width:44px;height:44px;font-size:1.4rem">+</button><span>cm</span></div>`,
    mount(root){ const svg=root.querySelector('svg.mmeas'); let grab=null;
      dragOn(svg,pt=>{ const x=(pt.x-10)/u; if(grab==null) grab=x-rx; rx=Math.max(-1,Math.min(N+2-N,Math.round((x-grab)*2)/2)); rx=Math.max(-0.5,Math.min(3,rx)); moved=true; upd(root); },()=>{ grab=null; });
      root.querySelector('#mminus').onclick=()=>{ ans=Math.max(0,ans-1); upd(root); }; root.querySelector('#mplus').onclick=()=>{ ans=Math.min(N,ans+1); upd(root); }; },
    check:()=>ans===L, state:()=>`${ans}@${rx}`,
    mcode:()=>{ const endRead=start+L-rx; if(ans!==L&&ans===Math.round(endRead)&&Math.abs(rx-start)>0.01) return 'G2-08'; if(ans===L+1) return 'G2-09'; return null; },
    reveal(){ rx=start; ans=L; const r=document.getElementById('manip'); if(r) upd(r); } }; }
ADD('S6-14', ()=>{ const L=rnd(3,8), start=rndPick(1,1.5,2,2.5,3); return MQ('자를 옮겨서 연필의 길이를 재어 보세요.','자의 0을 연필의 한쪽 끝에 맞추고, 다른 쪽 끝의 눈금을 읽어요.',measureManip(L,start),`${L} cm`); });
ADD('S6-15', ()=>{ const L=rnd(3,8), start=rndPick(1,2,2.5); return MQ('자를 옮겨서 연필의 길이를 재어 보세요.','자의 0을 연필의 한쪽 끝에 맞추고, 다른 쪽 끝의 눈금을 읽어요.',measureManip(L,start),`${L} cm`); });
function tapeSvg(totalCm,name){ const maxCm=Math.ceil((totalCm+20)/50)*50, sc=300/maxCm, W=330; let g=`<rect x="12" y="52" width="${maxCm*sc+6}" height="30" rx="3" fill="#FFE9A8" stroke="#B5701F" stroke-width="2"/>`;
  for(let c=0;c<=maxCm;c+=5){ const x=15+c*sc; g+=`<line x1="${x}" y1="52" x2="${x}" y2="${c%10===0?66:60}" stroke="#4A2E14" stroke-width="${c%100===0?2.2:1}"/>`; if(c%50===0) g+=`<text x="${x}" y="78" font-size="10" text-anchor="middle" fill="${c%100===0?'#D45F16':'#4A2E14'}" font-weight="${c%100===0?700:400}">${c}</text>`; }
  g+=`<rect x="15" y="20" width="${totalCm*sc}" height="24" rx="3" fill="#C98B54" stroke="#6B3E1C" stroke-width="2"/><text x="${15+totalCm*sc/2}" y="37" font-size="12" text-anchor="middle" fill="#fff">${name}</text><line x1="${15+totalCm*sc}" y1="44" x2="${15+totalCm*sc}" y2="52" stroke="#D45F16" stroke-width="2" stroke-dasharray="2 2"/>`;
  return `<svg viewBox="0 0 ${W} 90" width="${W}" style="max-width:100%">${g}</svg><div style="font-size:.85rem;color:#8A6A4A">줄자의 눈금 단위는 cm예요. 100 cm = 1 m</div>`; }
ADD('S6-15', ()=>{ const name=rndPick('책상','칠판','소파','침대'), c=rndPick(110,120,130,140,150,160,170,180,190,105,115,125,135,145); return WN2(`줄자로 ${name}의 길이를 재었어요. 몇 m 몇 cm일까요?`,tapeSvg(c,name),Math.floor(c/100),'m',c%100,'cm'); });


// ===== 3-46. 1학년 길이 비교: 막대를 끌어 한쪽 끝을 맞춘 뒤 비교 (교수님 11/22) =====
// 처음부터 끝을 맞춰 주면 너무 쉽다. 두 막대의 시작이 다르고, 긴 막대가 더 왼쪽에서 시작해서 오른쪽 끝만 보면 짧은 막대가 길어 보이게 놓는다(함정).
// 아이가 막대를 끌어 왼쪽 끝을 출발선에 맞추면 바로 보인다. 첫 제출에서 오른쪽 끝만 보고 고르면 G1-05(한쪽 끝을 맞추지 않음).
function alignManip(n=2,mode='long'){ const u=24, W=330, H=18+n*42;
  const NM=['노란','파란','분홍','초록'], C=[['#F2C230','#B08A14'],['#7FB8E6','#2F6FA8'],['#F4A6C0','#B5527A'],['#8FD18F','#3F8F3F']];
  let L,st; for(let t=0;t<500;t++){ const pool=shuffle([4,5,6,7,8,9,10,11]).slice(0,n); L=pool; st=L.map(()=>rndPick(0.5,1,1.5,2,2.5,3,3.5,4)); const R=L.map((l,k)=>st[k]+l); if(Math.max(...R)>13.5) continue;
    const tgt=mode==='long'?L.indexOf(Math.max(...L)):L.indexOf(Math.min(...L)), farR=mode==='long'?R.indexOf(Math.max(...R)):R.indexOf(Math.min(...R)); if(farR!==tgt&&new Set(R).size===n) break; }   /* 오른쪽 끝만 보면 틀리게(함정) */
  const tgt=mode==='long'?L.indexOf(Math.max(...L)):L.indexOf(Math.min(...L)); let x=st.map(v=>1+v), pickd=null;
  const draw=()=>{ let g=`<line x1="${10+u}" y1="6" x2="${10+u}" y2="${H-8}" stroke="#D45F16" stroke-width="2" stroke-dasharray="5 4"/><text x="${10+u}" y="${H+1}" font-size="12" text-anchor="middle" fill="#D45F16">출발선</text>`;
    for(let k=0;k<n;k++) g+=`<g data-k="${k}" style="cursor:grab"><rect x="${10+x[k]*u}" y="${14+k*42}" width="${L[k]*u}" height="26" rx="11" fill="${C[k][0]}" stroke="${C[k][1]}" stroke-width="2.5"/><circle cx="${10+x[k]*u+13}" cy="${27+k*42}" r="4" fill="${C[k][1]}"/></g>`; return g; };
  const upd=root=>{ root.querySelector('svg.malign').innerHTML=draw(); };
  return { html:`<svg class="malign" viewBox="0 0 ${W+40} ${H+6}" style="width:100%;max-width:400px;touch-action:none">${draw()}</svg><div style="font-size:.9rem;color:#8A6A4A;margin:4px 0">막대를 끌어서 옮길 수 있어요</div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${L.map((_,k)=>`<button class="ghost" data-p="${k}" style="border-color:${C[k][1]}">${NM[k]} 막대</button>`).join('')}</div>`,
    mount(root){ const svg=root.querySelector('svg.malign'); let which=null, grab=null;
      dragOn(svg,pt=>{ const cx=(pt.x-10)/u; if(which==null){ which=Math.max(0,Math.min(n-1,Math.floor((pt.y-8)/42))); grab=cx-x[which]; } x[which]=Math.max(0,Math.min(13.5-L[which],Math.round((cx-grab)*2)/2)); upd(root); },()=>{ which=null; grab=null; });
      root.querySelectorAll('button[data-p]').forEach(b=>b.onclick=()=>{ pickd=+b.dataset.p; root.querySelectorAll('button[data-p]').forEach(z=>z.style.background=z===b?'#FFE3B0':''); }); },
    check:()=>pickd===tgt, state:()=>`${pickd}@${x.join(',')}`,
    mcode:()=>{ if(pickd==null||pickd===tgt) return null; const R=x.map((v,k)=>v+L[k]); const far=mode==='long'?R.indexOf(Math.max(...R)):R.indexOf(Math.min(...R)); return pickd===far&&new Set(x).size>1?'G1-05':null; },
    reveal(){ x=L.map(()=>1); pickd=tgt; const r=document.getElementById('manip'); if(r){ upd(r); r.querySelectorAll('button[data-p]').forEach((z,k)=>z.style.background=k===tgt?'#FFE3B0':''); } }, _lon:tgt, _L:L }; }
ADD('S6-07', ()=>MQ('두 막대 중 어느 것이 더 길까요? 막대를 옮겨서 비교해 보세요.','두 막대의 한쪽 끝을 출발선에 맞추어 봐요.',alignManip(),'더 긴 막대를 찾았어요'));
ADD('S6-07', ()=>{ const n=rndPick(3,4), md=rndPick('long','short'); return MQ(`막대 ${n}개 중 가장 ${md==='long'?'긴':'짧은'} 막대는 무엇일까요? 막대를 옮겨서 비교해 보세요.`,'모든 막대의 한쪽 끝을 출발선에 맞추어 봐요.',alignManip(n,md),`가장 ${md==='long'?'긴':'짧은'} 막대를 찾았어요`); });


// ===== 3-47. 쌓기나무를 실제로 쌓기 (교수님 11/22: 단순 덧셈 말고, 조건을 주고 직접 쌓게) =====
// 3×3 판 위에 쌓기나무를 입체(등각) 그림으로 쌓는다. 쌓기/빼기 모드, 돌려 보기(90°씩).
// 아이가 쌓은 것의 위·앞·옆 모양은 보여 주지 않는다(돌려 보며 스스로 확인). 조건은 교과서처럼 그림으로만 준다.
//  ① 위·앞·옆에서 본 모양대로 쌓기  ② 가장 적은 개수로 쌓기(가능한 개수가 여러 가지)  ③ 입체 그림 + 위에서 본 모양 → 똑같이 쌓기(숨은 쌓기나무, G6-09)
//  ④ 층별로 나타낸 모양대로 쌓기  ⑤ 위에서 본 모양에 쓴 수대로 쌓기
const SK_N=3, SK_MAXH=4;
const skClone=H=>H.map(r=>r.slice()), skSum=H=>H.flat().reduce((a,b)=>a+b,0);
const skTop=H=>H.map(r=>r.map(v=>v>0?1:0)), skFront=H=>H[0].map((_,c)=>Math.max(...H.map(r=>r[c]))), skSide=H=>H.map(r=>Math.max(...r)).reverse();   /* 옆 = 오른쪽 옆: 왼쪽부터 앞줄→뒷줄 */
const skSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const skViewsEq=(A,B)=>skSame(skTop(A),skTop(B))&&skSame(skFront(A),skFront(B))&&skSame(skSide(A),skSide(B));
function skRand(lo,hi,maxh=3){ for(let t=0;t<2000;t++){ const H=Array.from({length:SK_N},()=>Array(SK_N).fill(0)); const cells=[[rnd(0,2),rnd(0,2)]]; const k=rnd(3,7);
    while(cells.length<k){ const [r,c]=rndPick(...cells), d=rndPick([0,1],[1,0],[0,-1],[-1,0]), R=r+d[0], C=c+d[1]; if(R<0||C<0||R>2||C>2||cells.some(x=>x[0]===R&&x[1]===C)) continue; cells.push([R,C]); }
    cells.forEach(([r,c])=>H[r][c]=rnd(1,maxh)); const n=skSum(H); if(n>=lo&&n<=hi&&Math.max(...H.flat())>=2) return H; } return [[0,1,0],[1,2,1],[0,1,0]]; }
function skIsoSvg(H,{s=24,rot=0,click=false,front=true,cls=''}={}){ const k=s*0.866, P=(x,y,z)=>[(x-y)*k,(x+y)*s/2-z*s], pts=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
  const n=SK_N; let V=skClone(H), map=Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>[r,c]));
  for(let t=0;t<rot;t++){ V=V.map((_,r)=>V.map((__,c)=>V[n-1-c][r])); map=map.map((_,r)=>map.map((__,c)=>map[n-1-c][r])); }   /* 시계 방향 90° */
  let g='';
  for(let y=0;y<n;y++) for(let x=0;x<n;x++){ const [R,C]=map[y][x]; g+=`<polygon points="${pts([P(x,y,0),P(x+1,y,0),P(x+1,y+1,0),P(x,y+1,0)])}" fill="#F4ECDD" stroke="#CBB89A" stroke-width="1" ${click?`data-r="${R}" data-c="${C}"`:''}/>`; }
  /* 원래 '앞' 쪽 표시 */
  if(front){ let fx=n/2, fy=n+0.9; for(let t=0;t<rot;t++){ const ox=fx, oy=fy; fx=n-oy; fy=ox; } const q=P(fx,fy,0); g+=`<text x="${q[0].toFixed(1)}" y="${(q[1]+4).toFixed(1)}" font-size="${Math.round(s*0.5)}" text-anchor="middle" fill="#D2477A" font-weight="700">앞</text>`; }
  const order=[]; for(let y=0;y<n;y++) for(let x=0;x<n;x++) order.push([x,y]); order.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));
  for(const [x,y] of order){ const [R,C]=map[y][x]; for(let z=0;z<V[y][x];z++){ const d=click?`data-r="${R}" data-c="${C}"`:'';
    g+=`<g ${d}><polygon points="${pts([P(x,y+1,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x,y+1,z+1)])}" fill="#E3A866" stroke="#7A4A1E" stroke-width="1.3"/><polygon points="${pts([P(x+1,y,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x+1,y,z+1)])}" fill="#C98742" stroke="#7A4A1E" stroke-width="1.3"/><polygon points="${pts([P(x,y,z+1),P(x+1,y,z+1),P(x+1,y+1,z+1),P(x,y+1,z+1)])}" fill="#F7D7A0" stroke="#7A4A1E" stroke-width="1.3"/></g>`; } }
  const W=2*n*k+s*1.2, top=-(SK_MAXH)*s-6, Hh=n*s+SK_MAXH*s+s*1.1;
  return `<svg class="${cls}" viewBox="${(-n*k-s*0.6).toFixed(1)} ${top.toFixed(1)} ${W.toFixed(1)} ${Hh.toFixed(1)}" style="width:100%;max-width:${Math.round(W*1.25)}px">${g}</svg>`; }
/* 교과서식 본 모양(모눈): 위 = 판 그대로(앞이 아래), 앞·옆 = 아래에서부터 층 */
function skViewSvg(kind,H,u=24,nolab){ const n=SK_N, lab={top:['위','#6BA34A'],front:['앞','#D2477A'],side:['옆','#D2477A']}[kind]; let rows, cols, fill;
  if(kind==='top'){ const T=skTop(H); rows=n; cols=n; fill=(r,c)=>T[r][c]; }
  else { const h=kind==='front'?skFront(H):skSide(H); rows=3; cols=n; fill=(r,c)=>h[c]>=rows-r; }
  let g=''; for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ const f=fill(r,c); g+=`<rect x="${c*u}" y="${22+r*u}" width="${u}" height="${u}" fill="${f?'#E9B373':'#fff'}" stroke="${f?'#7A4A1E':'#C9BBA6'}" stroke-width="${f?1.4:1}" ${f?'':'stroke-dasharray="2 2"'}/>`; }
  if(!nolab) g=`<circle cx="${cols*u/2}" cy="9" r="9" fill="${lab[1]}"/><text x="${cols*u/2}" y="13" font-size="11" text-anchor="middle" fill="#fff" font-weight="700">${lab[0]}</text>`+g;
  return `<svg viewBox="-2 ${nolab?19:-1} ${cols*u+4} ${rows*u+(nolab?5:25)}" width="${cols*u+4}" style="background:transparent">${g}</svg>`; }
function skNumSvg(H,u=24){ let g=`<circle cx="${SK_N*u/2}" cy="9" r="9" fill="#6BA34A"/><text x="${SK_N*u/2}" y="13" font-size="11" text-anchor="middle" fill="#fff" font-weight="700">위</text>`;
  for(let r=0;r<SK_N;r++) for(let c=0;c<SK_N;c++){ const v=H[r][c]; g+=`<rect x="${c*u}" y="${22+r*u}" width="${u}" height="${u}" fill="${v?'#E9B373':'#fff'}" stroke="${v?'#7A4A1E':'#C9BBA6'}" ${v?'':'stroke-dasharray="2 2"'}/>`+(v?`<text x="${c*u+u/2}" y="${22+r*u+u/2+5}" font-size="14" text-anchor="middle" font-weight="700" fill="#4A2E14">${v}</text>`:''); }
  return `<svg viewBox="-2 -1 ${SK_N*u+4} ${SK_N*u+25}" width="${SK_N*u+4}" style="background:transparent">${g}<text x="${SK_N*u/2}" y="${SK_N*u+36}" font-size="10" text-anchor="middle" fill="#8A6A4A">↓앞</text></svg>`; }
function skLayerSvg(H,z,u=22){ let g=''; for(let r=0;r<SK_N;r++) for(let c=0;c<SK_N;c++){ const f=H[r][c]>=z; g+=`<rect x="${c*u}" y="${r*u}" width="${u}" height="${u}" fill="${f?'#E9B373':'#fff'}" stroke="${f?'#7A4A1E':'#C9BBA6'}" ${f?'':'stroke-dasharray="2 2"'}/>`; }
  return `<div style="text-align:center;font-size:.85rem"><svg viewBox="-1 -1 ${SK_N*u+2} ${SK_N*u+2}" width="${SK_N*u+2}" style="background:transparent">${g}</svg><br>${z}층</div>`; }
const skCond=inner=>`<div class="skcond" style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap;background:#FFF8EC;border:2px solid #EBD9BC;border-radius:12px;padding:8px 10px;color:#4A2E14">${inner}</div>`;
/* 쌓기 판(조작) */
function stack3D({cond='',check,reveal,mcode}={}){ let H=Array.from({length:SK_N},()=>Array(SK_N).fill(0)), rot=0;
  /* 조작(교수님 11/22): 누르면 쌓이고, 길게 누르거나 마우스 오른쪽 단추를 누르면 하나 빠진다. 쌓기/빼기 모드를 바꾸는 단추는 없앴다(모드를 잊고 누르는 실수가 생김). */
  const btn=(id,t)=>`<button class="ghost" id="${id}" style="padding:7px 12px;font-size:1rem">${t}</button>`;
  const html=`${cond}<div class="skwrap" style="width:100%;max-width:340px;background:#fff;border-radius:12px;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none">${skIsoSvg(H,{s:30,click:true,cls:'sk3d'})}</div>
    <div style="font-size:.9rem;color:#7B5632;text-align:center">누르면 쌓여요 · <b>길게 누르면</b> 하나 빠져요</div>
    <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">${btn('skRot','⟳ 돌려 보기')}${btn('skClr','처음부터')}</div>
    <div id="skCnt" style="font-family:Jua,sans-serif;font-size:1.1rem;color:#4A2E14">쌓은 쌓기나무 0개</div>`;
  const upd=root=>{ const w=root.querySelector('.skwrap'); w.innerHTML=skIsoSvg(H,{s:30,rot,click:true,cls:'sk3d'}); root.querySelector('#skCnt').textContent=`쌓은 쌓기나무 ${skSum(H)}개`; };
  const add=(r,c)=>{ if(H[r][c]<SK_MAXH){ H[r][c]++; try{ sfx('pop'); }catch(_){} return true; } return false; }, del=(r,c)=>{ if(H[r][c]>0){ H[r][c]--; try{ sfx('nibble'); }catch(_){} return true; } return false; };
  return { html,
    mount(root){ const w=root.querySelector('.skwrap'); let timer=0, held=false, sx=0, sy=0; const cell=e=>{ const el=e.target&&e.target.closest&&e.target.closest('[data-r]'); return el?[+el.dataset.r,+el.dataset.c]:null; };
      const cancel=()=>{ if(timer){ clearTimeout(timer); timer=0; } };
      w.addEventListener('pointerdown',e=>{ if(e.button===2) return; const rc=cell(e); held=false; cancel(); if(!rc) return; sx=e.clientX; sy=e.clientY; timer=setTimeout(()=>{ timer=0; held=true; if(del(rc[0],rc[1])) upd(root); },450); });
      w.addEventListener('pointermove',e=>{ if(timer&&Math.hypot(e.clientX-sx,e.clientY-sy)>12) cancel(); });
      ['pointerup','pointercancel','pointerleave'].forEach(n=>w.addEventListener(n,cancel));
      w.addEventListener('click',e=>{ if(held){ held=false; e.preventDefault(); return; } const rc=cell(e); if(!rc) return; if(add(rc[0],rc[1])) upd(root); });
      w.addEventListener('contextmenu',e=>{ e.preventDefault(); cancel(); if(held){ return; } const rc=cell(e); if(rc&&del(rc[0],rc[1])) upd(root); });
      root.querySelector('#skRot').onclick=()=>{ rot=(rot+1)%4; upd(root); }; root.querySelector('#skClr').onclick=()=>{ H=H.map(r=>r.map(()=>0)); upd(root); }; upd(root); },
    check:()=>!!check(H), state:()=>H.flat().join(''), mcode:()=>mcode?mcode(H):null,
    reveal(){ H=skClone(reveal); rot=0; const r=document.getElementById('manip'); if(r) upd(r); }, _H:()=>H, _set(h){ H=skClone(h); } }; }
/* 가능한 쌓기 모두 찾기(위 모양 고정, 각 칸 1~3층) */
function skSolutions(T){ const cells=[]; for(let r=0;r<SK_N;r++) for(let c=0;c<SK_N;c++) if(T[r][c]) cells.push([r,c]); const out=[], H=Array.from({length:SK_N},()=>Array(SK_N).fill(0));
  const go=i=>{ if(i===cells.length){ out.push(skClone(H)); return; } const [r,c]=cells[i]; for(let v=1;v<=3;v++){ H[r][c]=v; go(i+1); } H[r][c]=0; }; go(0); return out; }
/* 입체 그림에서 보이는 쌓기나무·윗면 (캔버스에 색 번호로 그려 픽셀을 센다) */
function skVisible(H){ try{ const s=20, k=s*0.866, n=SK_N, cv=document.createElement('canvas'); cv.width=200; cv.height=200; const g=cv.getContext('2d'); g.imageSmoothingEnabled=false;
    const P=(x,y,z)=>[100+(x-y)*k,110+(x+y)*s/2-z*s], poly=(a,col)=>{ g.fillStyle=col; g.beginPath(); a.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p)); g.closePath(); g.fill(); };
    const ids=[]; const order=[]; for(let y=0;y<n;y++) for(let x=0;x<n;x++) order.push([x,y]); order.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));
    for(const [x,y] of order) for(let z=0;z<H[y][x];z++){ const id=ids.length+1; ids.push([y,x,z]); const col=f=>`rgb(${id*8},${f*60+20},0)`;
      poly([P(x,y+1,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x,y+1,z+1)],col(0)); poly([P(x+1,y,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x+1,y,z+1)],col(1)); poly([P(x,y,z+1),P(x+1,y,z+1),P(x+1,y+1,z+1),P(x,y+1,z+1)],col(2)); }
    const d=g.getImageData(0,0,200,200).data, cnt={}; for(let i=0;i<d.length;i+=4){ if(!d[i+3]) continue; const id=Math.round(d[i]/8), f=Math.round((d[i+1]-20)/60); if(id<1||id>ids.length||Math.abs(d[i]-id*8)>1||Math.abs(d[i+1]-(f*60+20))>1) continue; const key=id+'_'+f; cnt[key]=(cnt[key]||0)+1; }
    const area=k*s, vis=ids.filter((_,j)=>[0,1,2].some(f=>(cnt[(j+1)+'_'+f]||0)>area*0.08)).length;
    const topOk=ids.every(([y,x,z],j)=>z<H[y][x]-1||(cnt[(j+1)+'_2']||0)>area*0.5);
    return {vis, topOk}; }catch(e){ return {vis:skSum(H), topOk:false}; } }
const skBox=(a,b)=>`<div style="display:flex;flex-direction:column;align-items:center">${a}${b?`<div style="font-size:.8rem;color:#8A6A4A">${b}</div>`:''}</div>`;
const SKQ=[];
/* ① 위·앞·옆 모양대로 */
SKQ.push(()=>{ let H, sols; for(let t=0;t<200;t++){ H=skRand(5,10); sols=skSolutions(skTop(H)).filter(x=>skViewsEq(x,H)); if(sols.length<=3) break; }
  return MQ('위, 앞, 옆에서 본 모양이 되도록 쌓기나무를 쌓아 보세요.','앞에서 본 모양은 줄마다 가장 높은 층을 보여 줘요. 다 쌓으면 돌려 보며 확인해요.',
    stack3D({cond:skCond(skViewSvg('top',H)+skViewSvg('front',H)+skViewSvg('side',H)), check:B=>skViewsEq(B,H), reveal:H,
      mcode:B=>(skSame(skFront(B),skFront(H))&&skSame(skSide(B),skSide(H))&&!skSame(skTop(B),skTop(H)))?'G6-10':null}),'세 방향 모양이 모두 같아요'); });
/* ② 가장 적은 개수로 */
SKQ.push(()=>{ let H, sols, mn, mx; for(let t=0;t<300;t++){ H=skRand(5,11); sols=skSolutions(skTop(H)).filter(x=>skViewsEq(x,H)); const ns=sols.map(skSum); mn=Math.min(...ns); mx=Math.max(...ns); if(mn<mx) break; }
  const best=sols.find(x=>skSum(x)===mn);
  return MQ('위, 앞, 옆에서 본 모양이 되도록 쌓되, 쌓기나무를 가장 적게 써서 쌓아 보세요.','세 방향 모양은 그대로 두고 빼도 되는 쌓기나무가 있는지 찾아봐요.',
    stack3D({cond:skCond(skViewSvg('top',H)+skViewSvg('front',H)+skViewSvg('side',H)), check:B=>skViewsEq(B,H)&&skSum(B)===mn, reveal:best,
      mcode:B=>skViewsEq(B,H)&&skSum(B)>mn?'G6-10':null}),`가장 적게 ${mn}개`); });
/* ③ 입체 그림 + 위에서 본 모양 → 똑같이 (숨은 쌓기나무) */
SKQ.push(()=>{ let H, v; for(let t=0;t<300;t++){ H=skRand(6,11); v=skVisible(H); if(v.topOk&&v.vis<skSum(H)) break; }
  return MQ('그림과 똑같은 모양으로 쌓아 보세요. 위에서 본 모양도 함께 보세요.','보이지 않는 뒤쪽·아래쪽에도 쌓기나무가 있어요. 위에서 본 모양의 칸마다 쌓기나무가 있어요.',
    stack3D({cond:skCond(skBox(`<div style="width:170px">${skIsoSvg(H,{s:20})}</div>`,'쌓은 모양')+skBox(skViewSvg('top',H),'위에서 본 모양')), check:B=>skSame(B,H), reveal:H,
      mcode:B=>skSum(B)===v.vis&&skSum(B)<skSum(H)?'G6-09':null}),`모두 ${skSum(H)}개`); });
/* ④ 층별로 나타낸 모양대로 */
SKQ.push(()=>{ const H=skRand(6,12); const mh=Math.max(...H.flat());
  return MQ('층별로 나타낸 모양을 보고 쌓기나무를 쌓아 보세요.','1층부터 차례로 쌓아요. 2층에 놓인 쌓기나무 아래에는 1층 쌓기나무가 있어야 해요.',
    stack3D({cond:skCond(Array.from({length:mh},(_,i)=>skLayerSvg(H,i+1)).join('')), check:B=>skSame(B,H), reveal:H,
      mcode:B=>{ const up=B.flat().filter(x=>x>=2).length, need=H.flat().filter(x=>x>=2).length; return null; }}),`모두 ${skSum(H)}개`); });
/* ⑤ 위에서 본 모양에 쓴 수대로 */
SKQ.push(()=>{ const H=skRand(5,10);
  return MQ('위에서 본 모양의 각 칸에 쓴 수만큼 쌓기나무를 쌓아 보세요.','칸에 쓴 수는 그 자리에 쌓은 층수예요. 앞이 아래쪽이에요.',
    stack3D({cond:skCond(skNumSvg(H)), check:B=>skSame(B,H), reveal:H}),`모두 ${skSum(H)}개`); });
try{
  /* 틀 번호(편#번호)가 밀리면 틀별 태그·통계가 어긋난다: 지우지 않고 같은 자리에서 새 유형으로 바꿔 끼우고, 새 틀은 맨 끝에 붙인다 */
  const dropN=['numCount','layerCount','minCount','layer2']; let dropI=0; const dropM=(ep,re)=>{ if(G36[ep]) G36[ep]=G36[ep].map(g=>{ let hit=false; try{ const q=g(); hit=!!(q&&re.test(String(q.q))); }catch(e){} if(!hit) return g; const nm=dropN[dropI++%dropN.length]; return ()=>{ const X=window._SKX; return X&&X[nm]?X[nm]():SKQ[4](); }; }); };
  dropM('S6-65',/1층 \d+개, 2층 \d+개.*되도록 쌓아|층별로 1층 \d+개, 2층|각 칸에 쓰인 수가 [\d, ]+\. 쌓기나무는 모두|네 자리에 쌓은 수가 2, 3, 1, 2/);
  if(G36['S6-64']) G36['S6-64'].push(()=>SKQ[0](),()=>SKQ[1]());
  if(G36['S6-65']) G36['S6-65'].push(()=>SKQ[2](),()=>SKQ[4](),()=>SKQ[3]());
  if(G36['S6-02']){ const i=G36['S6-02'].findIndex(g=>{ try{ return /개로 모양을 만들어 보세요/.test(g().q); }catch(e){ return false; } });
    if(i>=0) G36['S6-02'][i]=()=>{ const n=rnd(4,8); const R=[[0,0,0],[0,0,0],[0,0,0]]; for(let j=0;j<n;j++) R[2-Math.floor((j%6)/3)][j%3]++; return MQ(`쌓기나무 ${n}개로 내 마음대로 모양을 만들어 보세요.`,'바닥을 누르면 놓이고, 쌓기나무를 누르면 그 위에 얹혀요. 길게 누르면 하나 빠져요.',stack3D({check:B=>skSum(B)===n,reveal:R}),`${n}개`); }; }
}catch(e){}
  /* 2학년 쌓기나무 모양: 그림과 똑같이 쌓기(모두 보이는 모양), '몇 층에 몇 개, 모두 몇 개' 덧셈 문제 대신 */
  const copyQ=()=>{ let H, v; for(let t=0;t<300;t++){ H=skRand(4,6,2); v=skVisible(H); if(v.topOk&&v.vis===skSum(H)) break; }
    return MQ('그림과 똑같은 모양으로 쌓기나무를 쌓아 보세요.','1층부터 놓고, 그 위에 2층을 얹어요. 다 쌓으면 돌려 보며 그림과 비교해요.',
      stack3D({cond:skCond(skBox(`<div style="width:170px">${skIsoSvg(H,{s:20})}</div>`,'똑같이 쌓아요')), check:B=>skSame(B,H), reveal:H}),`모두 ${skSum(H)}개`); };
  try{ if(G36['S6-02']){ const j=G36['S6-02'].findIndex(g=>{ try{ return /^1층에 \d+개, 2층에 \d+개/.test(String(g().q)); }catch(e){ return false; } }); if(j>=0) G36['S6-02'][j]=copyQ; else G36['S6-02'].push(copyQ); } }catch(e){}
  SKQ.push(copyQ);
window._SK=SKQ; window._stack3D=stack3D;


// ===== 3-48. 밀기 그림 고르기: 넓은 모눈에서 실제로 움직이게 (교수님 11/22: 3×3 칸에 꽉 차 있어 움직일 칸이 없으면 '똑같은 모양 고르기'가 됨) =====
// 6×5 모눈 위 한 곳에 도형을 두고 "○쪽으로 n칸" 밀기. 보기는 모두 같은 넓은 모눈, 처음 자리는 흐린 점선으로.
// 오답: 칸 수를 하나 더/덜 셈(G4-21), 반대쪽으로 밂(G4-21), 맞는 자리지만 뒤집힘·돌아감(G4-15).
Object.assign(MIS,{'G4-21':['밀기에서 움직인 칸 수·방향을 잘못 셈','도형의 한 점(파란 점)을 골라 그 점이 몇 칸 움직였는지 세어요.']});
function slFig(f,ox,oy,ghost,label,big){ const C=6,R=5,u=big?30:22; let g='';
  for(let i=0;i<=C;i++) g+=`<line x1="${i*u}" y1="0" x2="${i*u}" y2="${R*u}" stroke="#E5D3B5"/>`; for(let j=0;j<=R;j++) g+=`<line x1="0" y1="${j*u}" x2="${C*u}" y2="${j*u}" stroke="#E5D3B5"/>`;
  if(ghost) ghost.cells.forEach(([x,y])=>g+=`<rect x="${(x+ghost.ox)*u+1}" y="${(y+ghost.oy)*u+1}" width="${u-2}" height="${u-2}" fill="none" stroke="#B89A72" stroke-width="1.5" stroke-dasharray="3 3"/>`);
  f.cells.forEach(([x,y])=>g+=`<rect x="${(x+ox)*u}" y="${(y+oy)*u}" width="${u}" height="${u}" fill="#F2A65A" stroke="#7A4A1E" stroke-width="2"/>`);
  g+=`<circle cx="${(f.dot[0]+ox)*u+u/2}" cy="${(f.dot[1]+oy)*u+u/2}" r="${u*0.22}" fill="#3A6E8F"/>`;
  return `<div class="tf"><svg viewBox="-2 -2 ${C*u+4} ${R*u+4}" width="${C*u+4}" style="max-width:100%;background:#fff">${g}</svg>${label?`<b>${label}</b>`:''}</div>`; }
const slQ=()=>{ for(let t=0;t<200;t++){ const f=tRand(); const w=Math.max(...f.cells.map(c=>c[0]))+1, h=Math.max(...f.cells.map(c=>c[1]))+1;
    const D={오른쪽:[1,0],왼쪽:[-1,0],위쪽:[0,-1],아래쪽:[0,1]}, d=rndPick(...Object.keys(D)), [dx,dy]=D[d], room=dx?6-w:5-h; if(room<2) continue; const n=rnd(1,Math.min(3,room-1));
    const lo=dx>0||dy>0?0:n, ox0=dx?(dx>0?rnd(0,6-w-n):rnd(n,6-w)):rnd(0,6-w), oy0=dy?(dy>0?rnd(0,5-h-n):rnd(n,5-h)):rnd(0,5-h);
    const fit=(ox,oy)=>ox>=0&&oy>=0&&ox+w<=6&&oy+h<=5; const P=k=>[ox0+dx*k,oy0+dy*k];
    const cands=[[f,...P(n),null]]; const add=(g,k,code)=>{ const [x,y]=P(k); if(fit(x,y)) cands.push([g,x,y,code]); };
    add(f,n+1,'G4-21'); if(n>1) add(f,n-1,'G4-21'); add(f,-n,'G4-21'); const lr=tA(f,tLR), r1=tA(f,tRk(1)); if(tKey(lr)!==tKey(f)) add(lr,n,'G4-15'); if(tKey(r1)!==tKey(f)) add(r1,n,'G4-15');
    const key=c=>tKey(c[0])+'@'+c[1]+','+c[2], seen=new Set(), opts=[]; for(const c of cands){ if(seen.has(key(c))) continue; seen.add(key(c)); opts.push(c); } if(opts.length<4) continue;
    const use=[opts[0],...shuffle(opts.slice(1)).slice(0,4)], order=shuffle(use.map((_,i)=>i)), labs=['가','나','다','라','마'].slice(0,use.length), ans=labs[order.indexOf(0)], ghost={cells:f.cells,ox:ox0,oy:oy0};
    const q=`이 도형을 ${d}으로 ${n}칸 밀면 어떤 모양이 될까요?`;
    const vis=`<div class="tfrow">${slFig(f,ox0,oy0,null,'',true)}</div><div class="tfrow" style="flex-wrap:wrap;gap:8px">${order.map((k,j)=>slFig(use[k][0],use[k][1],use[k][2],ghost,labs[j])).join('')}</div><div style="font-size:.85rem;color:#8A6A4A">점선은 처음 자리예요</div>`;
    const r=C36(WHO(),q,q,vis,ans,labs.slice()); r.mis={}; order.forEach((k,j)=>{ if(k>0&&use[k][3]) r.mis[labs[j]]=use[k][3]; }); return r; } return null; };
try{ if(G36['S6-22']){ G36['S6-22']=G36['S6-22'].map(g=>{ try{ const q=g(); return q&&!q.manip&&/밀면 어떤 모양/.test(String(q.q))?slQ:g; }catch(e){ return g; } }); if(!G36['S6-22'].includes(slQ)) G36['S6-22'].push(slQ); } }catch(e){}
window._slQ=slQ;


// ===== 3-49. 입체도형: 처음엔 겨냥도·전개도 그림, 익숙해지면 글로만 (교수님 11/22) =====
// 직육면체~구(S6-56~63) 문제에서 글에 나온 입체(n각기둥·n각뿔·직육면체·정육면체·원기둥·원뿔·구)를 그린다. '전개도'가 있으면 전개도, 없으면 겨냥도(보이지 않는 모서리는 점선).
// 그림을 보고 처음 바로 맞힌 것이 그 편에서 2번이 되면 다음부터는 글로만. 글로만 나온 문제를 틀리면 다시 그림부터(발판을 붙였다 뗐다).
const SV_EPS=new Set(['S6-56','S6-57','S6-58','S6-59','S6-60','S6-61','S6-62','S6-63']);
const svNum={'삼':3,'사':4,'오':5,'육':6,'칠':7,'팔':8,'구':9,'십':10};
function svShape(t){ let m=t.match(/밑면이 (\d+|삼|사|오|육|칠|팔|구|십)각형[^?]*각(기둥|뿔)/); if(m) return {k:m[2]==='기둥'?'prism':'pyr', n:svNum[m[1]]||+m[1]}; m=t.match(/(\d+|삼|사|오|육|칠|팔|구|십)각(기둥|뿔)/); if(m) return {k:m[2]==='기둥'?'prism':'pyr', n:svNum[m[1]]||+m[1]};
  if(/정육면체/.test(t)) return {k:'cube'}; if(/직육면체/.test(t)) return {k:'box'}; if(/원기둥/.test(t)) return {k:'cyl'}; if(/원뿔/.test(t)) return {k:'cone'}; if(/(^|[^가-힣])구[는를의가에]/.test(t)) return {k:'sph'}; if(/눕혀/.test(t)) return null; if(/각기둥/.test(t)) return {k:'prism',n:5}; if(/각뿔/.test(t)) return {k:'pyr',n:4}; return null; }
const SVF='#FFE3B0', SVS='#7A4A1E', svWrap=(g,W,H,cap)=>`<div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 ${W} ${H}" width="${Math.min(W,240)}" style="max-width:100%;background:#fff;border-radius:10px">${g}</svg>${cap?`<div style="font-size:.8rem;color:#8A6A4A">${cap}</div>`:''}</div>`;
const svL=(a,b,dash)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${SVS}" stroke-width="2" ${dash?'stroke-dasharray="5 4" stroke-opacity=".75"':''}/>`;
const svP=(pts,fill=SVF)=>`<polygon points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${SVS}" stroke-width="2" stroke-linejoin="round"/>`;
function svSketch(s){ const W=220,H=190, cx=110, R=62, sq=.36, off=Math.PI/2+0.35;
  const base=(n,y)=>Array.from({length:n},(_,k)=>{ const a=off+2*Math.PI*k/n; return [cx+R*Math.cos(a), y+R*sq*Math.sin(a), Math.sin(a)]; });
  if(s.k==='prism'||s.k==='pyr'){ const n=s.n, yb=150, yt=s.k==='prism'?55:0, B=base(n,yb), xs=B.map(p=>p[0]), mn=xs.indexOf(Math.min(...xs)), mx=xs.indexOf(Math.max(...xs)); let g='';
    const back=k=>B[k][2]<-0.05&&k!==mn&&k!==mx;
    if(s.k==='prism'){ const T=base(n,yt); g+=svP(T.map(p=>[p[0],p[1]]),'#FFF0D2');
      for(let k=0;k<n;k++){ const j=(k+1)%n, mid=Math.sin(off+2*Math.PI*(k+.5)/n); g+=svL(B[k],B[j],mid<0); g+=svL(B[k],T[k],back(k)); }
      for(let k=0;k<n;k++){ const j=(k+1)%n; g+=svL(T[k],T[j],false); } }
    else { const A=[cx,22]; for(let k=0;k<n;k++){ const j=(k+1)%n, mid=Math.sin(off+2*Math.PI*(k+.5)/n); g+=svL(B[k],B[j],mid<0); g+=svL(B[k],A,back(k)); } }
    return svWrap(g,W,H,'겨냥도'); }
  if(s.k==='box'||s.k==='cube'){ const w=s.k==='cube'?90:120, h=s.k==='cube'?90:70, d=s.k==='cube'?40:44, x0=30, y0=60+(s.k==='cube'?0:15);
    const P=(x,y,z)=>[x0+x+z*0.9, y0+h-y-z*0.7+ (s.k==='cube'?20:10)];
    const v=[[0,0,0],[w,0,0],[w,h,0],[0,h,0],[0,0,d],[w,0,d],[w,h,d],[0,h,d]].map(a=>P(...a)); let g='';
    g+=svP([v[0],v[1],v[2],v[3]])+svP([v[3],v[2],v[6],v[7]],'#FFF0D2')+svP([v[1],v[5],v[6],v[2]],'#F6CF95');
    g+=svL(v[0],v[4],1)+svL(v[4],v[5],1)+svL(v[4],v[7],1); return svWrap(g,W,H+10,'겨냥도'); }
  if(s.k==='cyl'){ const rx=60, ry=20, yt=45, yb=150; return svWrap(`<path d="M${cx-rx},${yt} L${cx-rx},${yb} A${rx},${ry} 0 0 0 ${cx+rx},${yb} L${cx+rx},${yt}" fill="${SVF}" stroke="${SVS}" stroke-width="2"/><ellipse cx="${cx}" cy="${yt}" rx="${rx}" ry="${ry}" fill="#FFF0D2" stroke="${SVS}" stroke-width="2"/><path d="M${cx-rx},${yb} A${rx},${ry} 0 0 1 ${cx+rx},${yb}" fill="none" stroke="${SVS}" stroke-width="2" stroke-dasharray="5 4" stroke-opacity=".75"/>`,W,H,'겨냥도'); }
  if(s.k==='cone'){ const rx=62, ry=20, yb=150; return svWrap(`<path d="M${cx},22 L${cx-rx},${yb} A${rx},${ry} 0 0 0 ${cx+rx},${yb} Z" fill="${SVF}" stroke="${SVS}" stroke-width="2" stroke-linejoin="round"/><path d="M${cx-rx},${yb} A${rx},${ry} 0 0 1 ${cx+rx},${yb}" fill="none" stroke="${SVS}" stroke-width="2" stroke-dasharray="5 4" stroke-opacity=".75"/>`,W,H+10,'겨냥도'); }
  if(s.k==='sph') return svWrap(`<circle cx="${cx}" cy="95" r="70" fill="${SVF}" stroke="${SVS}" stroke-width="2"/><path d="M40,95 A70,20 0 0 0 180,95" fill="none" stroke="${SVS}" stroke-width="1.6"/><path d="M40,95 A70,20 0 0 1 180,95" fill="none" stroke="${SVS}" stroke-width="1.6" stroke-dasharray="5 4" stroke-opacity=".6"/>`,W,H,'겨냥도');
  return ''; }
function svPoly(p1,p2,n){ const pts=[p1,p2]; let a=Math.atan2(p2[1]-p1[1],p2[0]-p1[0]); const L=Math.hypot(p2[0]-p1[0],p2[1]-p1[1]); for(let k=2;k<n;k++){ a+=2*Math.PI/n; const q=pts[k-1]; pts.push([q[0]+L*Math.cos(a),q[1]+L*Math.sin(a)]); } return pts; }
function svNet(s,labs){ let g='', W=240, H=200;
  if(s.k==='prism'){ const n=s.n, a=Math.min(34,200/n), h=60, x0=(W-n*a)/2, yt=70; for(let k=0;k<n;k++) g+=svP([[x0+k*a,yt],[x0+(k+1)*a,yt],[x0+(k+1)*a,yt+h],[x0+k*a,yt+h]]);
    const j=Math.floor(n/2); g+=svP(svPoly([x0+(j+1)*a,yt],[x0+j*a,yt],n),'#FFF0D2')+svP(svPoly([x0+j*a,yt+h],[x0+(j+1)*a,yt+h],n),'#FFF0D2'); H=yt+h+a*(n/(2*Math.PI))*2+20; }
  else if(s.k==='pyr'){ const n=s.n, a=n>6?30:40, B=svPoly([W/2-a/2,0],[W/2+a/2,0],n); const cy=B.reduce((t,p)=>t+p[1],0)/n; const C=B.map(p=>[p[0],p[1]-cy+H/2]); g+=svP(C,'#FFF0D2');
    const sl=a*1.25; for(let k=0;k<n;k++){ const p=C[k], q=C[(k+1)%n], mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2, dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy), nx=dy/L, ny=-dx/L; const ap=[mx+nx*sl,my+ny*sl]; g+=svP([p,q,ap]); } }
  else if(s.k==='box'||s.k==='cube'){ const a=s.k==='cube'?38:46, b=s.k==='cube'?38:30, c=s.k==='cube'?38:24, x0=20, y0=20; const R=(x,y,w,h,f)=>svP([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],f);
    g+=R(x0+c,y0,a,c,'#FFF0D2')+R(x0,y0+c,c,b)+R(x0+c,y0+c,a,b)+R(x0+c+a,y0+c,c,b)+R(x0+2*c+a,y0+c,a,b)+R(x0+c,y0+c+b,a,c,'#FFF0D2'); H=y0+2*c+b+20; W=x0+2*c+2*a+20; if(labs){ const L=(x,y,t)=>`<text x="${x}" y="${y+6}" font-size="17" font-weight="700" text-anchor="middle" fill="#4A2E14">${t}</text>`; g+=L(x0+c/2,y0+c+b/2,labs[0])+L(x0+c+a/2,y0+c+b/2,labs[1])+L(x0+c+a+c/2,y0+c+b/2,labs[2])+L(x0+2*c+a+a/2,y0+c+b/2,labs[3])+L(x0+c+a/2,y0+c/2,labs[4])+L(x0+c+a/2,y0+c+b+c/2,labs[5]); } }
  else if(s.k==='cyl'){ const r=24, w=2*Math.PI*r, h=70, x0=(W-w)/2, y0=60; g+=svP([[x0,y0],[x0+w,y0],[x0+w,y0+h],[x0,y0+h]])+`<circle cx="${x0+w/2}" cy="${y0-r}" r="${r}" fill="#FFF0D2" stroke="${SVS}" stroke-width="2"/><circle cx="${x0+w/2}" cy="${y0+h+r}" r="${r}" fill="#FFF0D2" stroke="${SVS}" stroke-width="2"/>`; H=y0+h+2*r+10; }
  else if(s.k==='cone'){ const Lr=90, r=30, th=2*Math.PI*r/Lr, cx=W/2, cy=20, a0=Math.PI/2-th/2, a1=Math.PI/2+th/2, p0=[cx+Lr*Math.cos(a0),cy+Lr*Math.sin(a0)], p1=[cx+Lr*Math.cos(a1),cy+Lr*Math.sin(a1)];
    g+=`<path d="M${cx},${cy} L${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${Lr},${Lr} 0 0 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)} Z" fill="${SVF}" stroke="${SVS}" stroke-width="2"/><circle cx="${cx}" cy="${cy+Lr+r}" r="${r}" fill="#FFF0D2" stroke="${SVS}" stroke-width="2"/>`; H=cy+Lr+2*r+10; }
  else return svSketch(s);
  return svWrap(g,W,H,'전개도'); }
function svFadeGet(){ try{ return JSON.parse(localStorage.getItem('kt_svfade')||'{}'); }catch(e){ return {}; } }
function svFadeSet(o){ try{ localStorage.setItem('kt_svfade',JSON.stringify(o)); }catch(e){} }
window._svFade=(q,ok)=>{ try{ if(!q||!q._svEp) return; const o=svFadeGet(), ep=q._svEp; if(q._svShown){ if(ok&&!q._svDone) o[ep]=(o[ep]||0)+1; } else if(!ok) o[ep]=0; q._svDone=1; svFadeSet(o); }catch(e){} };
function solidVis(ep,q){ if(!SV_EPS.has(ep)||!q||/<svg|<img/.test(String(q.visual||''))||q.manip||q.onMount) return q; const t=_pl(String(q.q)); const s=svShape(t); if(!s) return q;
  q._svEp=ep; const pic=/전개도/.test(t)?svNet(s,/가, 나, 다, 라가 가로로 한 줄로 이어져 있고, 나의 위에 마, 아래에 바/.test(t)?['가','나','다','라','마','바']:null):svSketch(s); q._cpaPic=pic; q._cpaBase=q.visual||''; const show=(svFadeGet()[ep]||0)<2;
  q.visual=show?pic+q._cpaBase:q._cpaBase; q._svShown=show?1:0; return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=solidVis(ep,q); }catch(e){} return q; }; }
window._solidVis=solidVis;


// ===== 3-47b. 쌓기나무: 전체 개수를 알려 주기 (교수님 11/22: 개수를 알아야 숨은 쌓기나무가 있는지 알 수 있다) =====
// ①(위·앞·옆) ③(입체+위)에 "쌓기나무 N개로 쌓았어요"를 붙이고, ⑥ 입체 그림 + 전체 개수만으로 똑같이 쌓기를 더한다.
// ⑥은 숨은 자리가 여러 가지일 수 있어, 쌓은 모양이 그림과 똑같이 보이고(같은 그림) 개수가 N이면 정답.
function skSig(H){ try{ const s=16, k=s*0.866, n=SK_N, cv=document.createElement('canvas'); cv.width=140; cv.height=150; const g=cv.getContext('2d');
    const P=(x,y,z)=>[70+(x-y)*k,90+(x+y)*s/2-z*s], poly=(a,col)=>{ g.fillStyle=col; g.beginPath(); a.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p)); g.closePath(); g.fill(); g.strokeStyle='#000'; g.lineWidth=1; g.stroke(); };
    const order=[]; for(let y=0;y<n;y++) for(let x=0;x<n;x++) order.push([x,y]); order.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));
    for(const [x,y] of order) for(let z=0;z<H[y][x];z++){ poly([P(x,y+1,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x,y+1,z+1)],'#f00'); poly([P(x+1,y,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x+1,y,z+1)],'#0f0'); poly([P(x,y,z+1),P(x+1,y,z+1),P(x+1,y+1,z+1),P(x,y+1,z+1)],'#00f'); }
    const d=g.getImageData(0,0,140,150).data; let h=0; for(let i=0;i<d.length;i+=4) h=(h*31+(d[i]>>6)*16+(d[i+1]>>6)*4+(d[i+2]>>6)+(d[i+3]>>6)*64)>>>0; return h; }catch(e){ return JSON.stringify(H); } }
const skCnt=N=>`<div style="font-family:Jua,sans-serif;font-size:1.05rem;color:#4A2E14;align-self:center">쌓기나무<br><b style="font-size:1.5rem;color:#D45F16">${N}개</b>로<br>쌓았어요</div>`;
SKQ[0]=()=>{ let H, sols; for(let t=0;t<200;t++){ H=skRand(5,10); sols=skSolutions(skTop(H)).filter(x=>skViewsEq(x,H)); if(sols.length<=4) break; } const N=skSum(H);
  return MQ('쌓기나무로 쌓은 모양을 위, 앞, 옆에서 본 모양이에요. 똑같이 쌓아 보세요.','앞에서 본 모양은 줄마다 가장 높은 층을 보여 줘요. 쌓기나무 개수도 맞는지 세어 봐요.',
    stack3D({cond:skCond(skViewSvg('top',H)+skViewSvg('front',H)+skViewSvg('side',H)+skCnt(N)), check:B=>skViewsEq(B,H)&&skSum(B)===N, reveal:H,
      mcode:B=>(skSame(skFront(B),skFront(H))&&skSame(skSide(B),skSide(H))&&!skSame(skTop(B),skTop(H)))?'G6-10':(skViewsEq(B,H)&&skSum(B)<N?'G6-09':null)}),`모두 ${N}개`); };
SKQ[2]=()=>{ let H, v; for(let t=0;t<300;t++){ H=skRand(6,11); v=skVisible(H); if(v.topOk&&v.vis<skSum(H)) break; } const N=skSum(H);
  return MQ('그림과 똑같은 모양으로 쌓아 보세요. 위에서 본 모양과 쌓기나무 개수도 함께 보세요.','그림에 보이는 쌓기나무를 세어 보고, 전체 개수와 비교해요. 모자라면 보이지 않는 곳에 숨어 있어요.',
    stack3D({cond:skCond(skBox(`<div style="width:170px">${skIsoSvg(H,{s:20})}</div>`,'쌓은 모양')+skBox(skViewSvg('top',H),'위에서 본 모양')+skCnt(N)), check:B=>skSame(B,H), reveal:H,
      mcode:B=>skSum(B)===v.vis&&skSum(B)<N?'G6-09':null}),`모두 ${N}개`); };
const skCountOnly=()=>{ let H, v; for(let t=0;t<300;t++){ H=skRand(6,11); v=skVisible(H); if(v.topOk&&v.vis<skSum(H)) break; } const N=skSum(H), sig=skSig(H);
  return MQ(`쌓기나무 ${N}개로 그림과 같은 모양을 쌓았어요. 똑같이 쌓아 보세요.`,'그림에 보이는 쌓기나무는 몇 개인가요? 전체 개수보다 적다면 숨은 쌓기나무가 있어요. 위층 아래에는 반드시 쌓기나무가 있어요.',
    stack3D({cond:skCond(skBox(`<div style="width:180px">${skIsoSvg(H,{s:20})}</div>`,'쌓은 모양')+skCnt(N)), check:B=>skSum(B)===N&&skSig(B)===sig, reveal:H,
      mcode:B=>skSig(B)===sig&&skSum(B)<N?'G6-09':null}),`모두 ${N}개`); };
SKQ.push(skCountOnly);
try{ const fix=(ep,from,to)=>{ const a=G36[ep]; if(!a) return; const i=a.indexOf(from); if(i>=0) a[i]=to; };
  /* 위에서 이미 넣은 ①·③을 새 판으로 바꾸고, ⑥을 S6-65 둘째에 */
  const a64=G36['S6-64'], a65=G36['S6-65'];
  
  if(a65){ a65.push(skCountOnly); }
}catch(e){}


// ===== 3-50. 띠그래프·원그래프를 실제 그래프로 (교수님 11/22: 문제에 실물 그래프가 안 나옴) =====
// 띠그래프: 긴 띠 + 아래 눈금자(0~100%, 10%마다). 칸이 좁으면 이름을 띠 위에 빼서 적는다.
// 원그래프: 12시에서 시작해 시계 방향, 바깥 눈금 5%마다(25%마다 길게·수). 좁은 조각은 이름을 밖에.
// ① 기존 .band(글자만 든 상자) → S4-19는 띠그래프, S4-20은 원그래프, S4-21은 번갈아.  ② 글로만 있던 문제에 맞는 그래프를 그린다.
const GR_COL=['#F2A65A','#8CC7E8','#A6D98C','#F2D06B','#D9A6E0','#F4A6A6'];
const grEsc=s=>String(s).replace(/</g,'&lt;');
function bandSvg(items,{ruler=true,cap=''}={}){ const W=320, x0=10, L=300, y0=44, h=42; let g='', x=x0, lastX=-99, lv=0;
  items.forEach((it,k)=>{ const w=L*it.p/100; g+=`<rect x="${x.toFixed(1)}" y="${y0}" width="${w.toFixed(1)}" height="${h}" fill="${it.hi?'#FFE08A':GR_COL[k%GR_COL.length]}" stroke="#6B3E1C" stroke-width="1.5"/>`;
    const lab=it.lab!=null?it.lab:`${it.p}%`, cx=x+w/2;
    if(w>=38){ g+=`<text x="${cx.toFixed(1)}" y="${y0+18}" font-size="12" text-anchor="middle" fill="#3A2410" font-weight="700">${grEsc(it.n)}</text><text x="${cx.toFixed(1)}" y="${y0+34}" font-size="12" text-anchor="middle" fill="#3A2410">${grEsc(lab)}</text>`; }
    else { lv=(cx-lastX<56)?1-lv:0; lastX=cx; const ty=y0-11-lv*14; g+=`<line x1="${cx.toFixed(1)}" y1="${y0}" x2="${cx.toFixed(1)}" y2="${ty+3}" stroke="#6B3E1C"/><text x="${cx.toFixed(1)}" y="${ty}" font-size="11" text-anchor="middle" fill="#3A2410">${grEsc(it.n)} ${grEsc(lab)}</text>`; }
    x+=w; });
  if(ruler){ for(let p=0;p<=100;p+=5){ const xx=x0+L*p/100; g+=`<line x1="${xx}" y1="${y0+h}" x2="${xx}" y2="${y0+h+(p%10?4:8)}" stroke="#6B3E1C"/>`; if(p%10===0) g+=`<text x="${xx}" y="${y0+h+19}" font-size="9.5" text-anchor="middle" fill="#6B3E1C">${p}</text>`; } g+=`<text x="${W-2}" y="${y0+h+30}" font-size="9" text-anchor="end" fill="#8A6A4A">(%)</text>`; }
  return `<div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 ${W} ${ruler?128:94}" width="${W}" style="max-width:100%;background:#fff;border-radius:10px">${g}</svg>${cap?`<div style="font-size:.85rem;color:#6B4A2A">${cap}</div>`:''}</div>`; }
function pieSvg(items,{cap='',angleQ=-1}={}){ const cx=110, cy=108, r=78; let g='', a=-90; const pt=(ang,rr)=>[cx+rr*Math.cos(ang*Math.PI/180), cy+rr*Math.sin(ang*Math.PI/180)];
  items.forEach((it,k)=>{ const da=360*it.p/100, a1=a+da, p0=pt(a,r), p1=pt(a1,r); const col=it.hi?'#FFE08A':GR_COL[k%GR_COL.length];
    g+= it.p>=100?`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}" stroke="#6B3E1C" stroke-width="1.5"/>`:`<path d="M${cx},${cy} L${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${da>180?1:0} 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)} Z" fill="${col}" stroke="#6B3E1C" stroke-width="1.5"/>`;
    if(k===angleQ){ const q0=pt(a,22), q1=pt(a1,22); g+=`<path d="M${q0[0].toFixed(1)},${q0[1].toFixed(1)} A22,22 0 ${da>180?1:0} 1 ${q1[0].toFixed(1)},${q1[1].toFixed(1)}" fill="none" stroke="#D45F16" stroke-width="2.2"/>`; const m=pt(a+da/2,34); g+=`<text x="${m[0].toFixed(1)}" y="${(m[1]+4).toFixed(1)}" font-size="12" text-anchor="middle" fill="#D45F16" font-weight="700">?°</text>`; }
    const lab=it.lab!=null?it.lab:`${it.p}%`, mid=a+da/2;
    if(it.n||lab){ if(it.p>=12){ const m=pt(mid,r*0.62); g+=`<text x="${m[0].toFixed(1)}" y="${(m[1]-(k===angleQ?-10:2)).toFixed(1)}" font-size="12" text-anchor="middle" fill="#3A2410" font-weight="700">${grEsc(it.n)}</text><text x="${m[0].toFixed(1)}" y="${(m[1]+(k===angleQ?24:13)).toFixed(1)}" font-size="11.5" text-anchor="middle" fill="#3A2410">${grEsc(lab)}</text>`; }
      else { const m=pt(mid,r+6), o=pt(mid,r+22); g+=`<line x1="${m[0].toFixed(1)}" y1="${m[1].toFixed(1)}" x2="${o[0].toFixed(1)}" y2="${o[1].toFixed(1)}" stroke="#6B3E1C"/><text x="${o[0].toFixed(1)}" y="${(o[1]+(o[1]>cy?10:-3)).toFixed(1)}" font-size="10.5" text-anchor="middle" fill="#3A2410">${grEsc(it.n)} ${grEsc(lab)}</text>`; } }
    a=a1; });
  for(let p=0;p<100;p+=5){ const ang=-90+3.6*p, i0=pt(ang,r), o=pt(ang,r+(p%25?4:8)); g+=`<line x1="${i0[0].toFixed(1)}" y1="${i0[1].toFixed(1)}" x2="${o[0].toFixed(1)}" y2="${o[1].toFixed(1)}" stroke="#6B3E1C"/>`; if(p%25===0){ const t=pt(ang,r+16); g+=`<text x="${t[0].toFixed(1)}" y="${(t[1]+4).toFixed(1)}" font-size="9.5" text-anchor="middle" fill="#6B3E1C">${p}</text>`; } }
  return `<div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 220 216" width="220" style="max-width:100%;background:#fff;border-radius:10px">${g}</svg>${cap?`<div style="font-size:.85rem;color:#6B4A2A">${cap}</div>`:''}</div>`; }
const grFill=(p,names)=>{ /* 나머지 100-p를 5의 배수 2~3조각으로 */ let rest=100-p; const out=[]; const n=rest>=60?3:rest>=30?2:1; for(let k=0;k<n-1;k++){ const v=5*Math.max(1,Math.round((rest/(n-k))*(0.6+Math.random()*0.8)/5)); const vv=Math.min(v,rest-5*(n-k-1)); out.push({n:names[k],p:vv}); rest-=vv; } if(rest>0) out.push({n:names[n-1],p:rest}); return out; };
function grParseBand(v){ const m=[...String(v).matchAll(/<span style="flex:(\d+);background:[^"]*">([^<]*)<br>([^<]*)<\/span>/g)]; return m.length?m.map(x=>({n:x[2],p:+x[1],lab:x[3]})):null; }
function grVis(ep,i,q){ if(!/^S4-(19|20|21)$/.test(ep)||!q||q.manip||q.onMount) return q; const V=String(q.visual||''), t=_pl(String(q.q)); let m;
  if(/class="band"/.test(V)){ const it=grParseBand(V); if(it){ const pie=ep==='S4-20'||(ep==='S4-21'&&i%2===1); const html=pie?pieSvg(it):bandSvg(it); q.visual=V.replace(/<div class="band">[\s\S]*?<\/div>/,html); } return q; }
  if(/<svg|<img/.test(V)) return q; let pic='';
  if((m=t.match(/띠그래프에서 (\S+)[은는] 눈금 (\d+)%부터 (\d+)%까지/))){ const a=+m[2], b=+m[3], nm=m[1]; const before=a?grFill(100-a,['치킨','김밥','라면']):[]; const after=100-b?grFill(b,['떡볶이','과일','국수']):[]; pic=bandSvg([...before.map(x=>({...x,lab:''})),{n:nm,p:b-a,lab:'?%',hi:1},...after.map(x=>({...x,lab:''}))]); }
  else if((m=t.match(/(\d+)명 중 (\d+)명이 (\S+?)[을를] 좋아해요\. 띠그래프에서/))){ const N=+m[1], k=+m[2], nm=m[3], p=Math.round(100*k/N); pic=bandSvg([{n:nm,p,lab:'?%',hi:1},...grFill(p,['야구','농구','피구']).map(x=>({...x,lab:''}))],{ruler:false,cap:`전체 ${N}명 · ${nm} ${k}명`}); }
  else if((m=t.match(/원그래프에서 (\d+)%인 부분의 중심각/))){ const p=+m[1]; pic=pieSvg([{n:'',p,lab:`${p}%`,hi:1},...grFill(p,['','','']).map(x=>({...x,lab:''}))],{angleQ:0}); }
  else if(/원그래프에서 1%는 몇 도/.test(t)){ pic=pieSvg([{n:'',p:100,lab:''}],{cap:'원 한 바퀴 = 360°, 눈금 한 칸 = 5%'}); }
  else if((m=t.match(/(\d+)명을 조사한 원그래프에서 (\S+?)[가이] (\d+)명이에요/))){ const N=+m[1], k=+m[3], nm=m[2], p=Math.round(100*k/N); pic=pieSvg([{n:nm,p,lab:`${k}명`,hi:1},...grFill(p,['운동','게임','음악']).map(x=>({...x,lab:''}))],{angleQ:0,cap:`전체 ${N}명`}); }
  else if((m=t.match(/전체 (\d+)명 중 (\d+)%는 몇 명/))){ const N=+m[1], p=+m[2]; pic=(ep==='S4-19'?bandSvg:pieSvg)([{n:'?명',p,lab:`${p}%`,hi:1},...grFill(p,['','','']).map(x=>({...x,lab:''}))],{cap:`전체 ${N}명`}); }
  else if((m=t.match(/가 학교 (\d+)명 중 (\d+)%, 나 학교 (\d+)명 중 (\d+)%가 걸어서/))){ const row=(N,p,s)=>bandSvg([{n:'걸어서',p,hi:1},...grFill(p,['버스','자전거','차']).map(x=>({...x}))],{ruler:false,cap:`${s} 학교 (전체 ${N}명)`}); pic=row(+m[1],+m[2],'가')+row(+m[3],+m[4],'나'); }
  else if((m=t.match(/(\d+)명을 조사한 띠그래프에서 (\S+?)[가이] 눈금 (\d+)에서 (\d+)까지/))){ const N=+m[1], nm=m[2], a=+m[3], b=+m[4]; const before=a?grFill(100-a,['독서','게임','음악']):[]; const after=100-b?grFill(b,['그림','요리','춤']):[]; pic=bandSvg([...before.map(x=>({...x,lab:''})),{n:nm,p:b-a,lab:'?명',hi:1},...after.map(x=>({...x,lab:''}))],{cap:`전체 ${N}명`}); }
  else if(/띠그래프의 눈금 \d+~\d+%는/.test(t)){ const segs=[...t.matchAll(/(\d+)~(\d+)%는 (\S+?)[,예]/g)].map(x=>({a:+x[1],b:+x[2],n:x[3]})); if(segs.length){ const it=[]; let cur=0; segs.forEach((g,j)=>{ if(g.a>cur) it.push({n:'',p:g.a-cur,lab:''}); it.push({n:g.n,p:g.b-g.a,lab:j===segs.length-1?'?%':'',hi:j===segs.length-1}); cur=g.b; }); if(cur<100) it.push(...grFill(cur,['기타','','']).map(x=>({...x,lab:''}))); pic=bandSvg(it); } }
  else if((m=t.match(/원그래프에서 (\d+)%인 항목이 있어요\. 전체가 (\d+)명/))){ const p=+m[1], N=+m[2]; pic=pieSvg([{n:'?명',p,lab:`${p}%`,hi:1},...grFill(p,['','','']).map(x=>({...x,lab:''}))],{cap:`전체 ${N}명`}); }
  else if((m=t.match(/가 반 (\d+)명의 (\d+)%와 나 반 (\d+)명의 (\d+)%/))){ const row=(N,p,s)=>bandSvg([{n:'',p,hi:1},...grFill(p,['','','']).map(x=>({...x,lab:''}))],{ruler:false,cap:`${s} 반 (전체 ${N}명)`}); pic=row(+m[1],+m[2],'가')+row(+m[3],+m[4],'나'); }
  if(pic) q.visual=pic+V; return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=grVis(ep,i,q); }catch(e){} return q; }; }
window._bandSvg=bandSvg; window._pieSvg=pieSvg;


// ===== 3-51. 구체 → 그림 → 글·식 (교수님 11/22: 처음엔 구체적인 그림이 먼저, 익숙해지면 글이나 식으로만) =====
// 글·식으로만 된 문제에서 수와 연산을 읽어 그 수준에 맞는 그림 모델을 붙인다(수 모형·묶음·넓이 모델·분수 막대·100칸·수직선·자릿값 표·대응표·띠 모델).
// 그림은 문제를 '보여 줄 때' 정한다: 그 편에서 그림을 보고 첫 시도에 맞힌 것이 2번이면 글·식만, 글·식에서 틀리면 다시 그림(입체도형 3-49와 같은 장부 kt_svfade).
const CP_FILL='#F6C77E', CP_S='#7A4A1E';
const cpWrap=(inner,cap)=>`<div class="cpa" style="display:flex;flex-direction:column;align-items:center;gap:4px;margin:4px 0">${inner}${cap?`<div style="font-size:.8rem;color:#8A6A4A">${cap}</div>`:''}</div>`;
const cpSvg=(g,W,H,mw)=>`<svg viewBox="0 0 ${W} ${H}" width="${Math.min(W,mw||320)}" style="max-width:100%;background:#fff;border-radius:10px">${g}</svg>`;
/* 수 모형: 백 = 판, 십 = 막대, 일 = 낱개 */
function cpBlocks(n,{u=3.2,lab=true}={}){ n=Math.max(0,Math.floor(n)); const h=Math.floor(n/100), t=Math.floor(n/10)%10, o=n%10, F=u*10; let g='', x=4, H=F+8;
  for(let k=0;k<h;k++){ g+=`<rect x="${x}" y="4" width="${F}" height="${F}" fill="${CP_FILL}" stroke="${CP_S}" stroke-width="1.2"/>`; for(let j=1;j<10;j++) g+=`<line x1="${x+j*u}" y1="4" x2="${x+j*u}" y2="${4+F}" stroke="${CP_S}" stroke-width=".3"/><line x1="${x}" y1="${4+j*u}" x2="${x+F}" y2="${4+j*u}" stroke="${CP_S}" stroke-width=".3"/>`; x+=F+3; }
  if(h) x+=4; for(let k=0;k<t;k++){ g+=`<rect x="${x}" y="4" width="${u}" height="${F}" fill="#9FD0EE" stroke="#2F6FA8" stroke-width="1"/>`; for(let j=1;j<10;j++) g+=`<line x1="${x}" y1="${4+j*u}" x2="${x+u}" y2="${4+j*u}" stroke="#2F6FA8" stroke-width=".3"/>`; x+=u+2.2; }
  if(t) x+=4; for(let k=0;k<o;k++){ g+=`<rect x="${x+(k%3)*(u+1.6)}" y="${4+F-(Math.floor(k/3)+1)*(u+1.6)}" width="${u}" height="${u}" fill="#A6D98C" stroke="#3F8F3F" stroke-width="1"/>`; } if(o) x+=3*(u+1.6);
  return `<svg viewBox="0 0 ${Math.max(x+4,20)} ${H}" width="${Math.min(Math.max(x+4,20)*1.25,320)}" style="max-width:100%;background:#fff;border-radius:8px">${g}</svg>`+(lab?`<span style="font-size:.85rem;color:#4A2E14">${n}</span>`:''); }
const cpCol=(...a)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:2px">${a.join('')}</div>`;
const cpRow=(...a)=>`<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">${a.join('')}</div>`;
const cpOp=s=>`<b style="font-size:1.4rem;color:#D45F16">${s}</b>`;
/* 넓이 모델: (a1+a2)×(b1+b2) */
function cpArea(a,b){ const sp=n=>{ const s=String(n), out=[]; for(let i=0;i<s.length;i++){ const v=+s[i]*10**(s.length-1-i); if(v) out.push(v); } return out; }; const A=sp(a), B=sp(b); const W=300, H=150, x0=44, y0=24;
  const wA=A.map(v=>Math.max(30,v/a*(W-x0-8))), sA=wA.reduce((s,v)=>s+v,0), wa=wA.map(v=>v*(W-x0-8)/sA), hB=B.map(v=>Math.max(28,v/b*(H-y0-8))), sB=hB.reduce((s,v)=>s+v,0), hb=hB.map(v=>v*(H-y0-8)/sB);
  let g='', x=x0; A.forEach((v,i)=>{ g+=`<text x="${x+wa[i]/2}" y="16" font-size="12" text-anchor="middle" fill="#2F6FA8" font-weight="700">${v}</text>`; let y=y0; B.forEach((w,j)=>{ g+=`<rect x="${x}" y="${y}" width="${wa[i]}" height="${hb[j]}" fill="${(i+j)%2?'#FFF0D2':'#FFE0B0'}" stroke="${CP_S}" stroke-width="1.4"/><text x="${x+wa[i]/2}" y="${y+hb[j]/2+4}" font-size="11" text-anchor="middle" fill="#8A6A4A">${v} × ${w}</text>`; y+=hb[j]; }); x+=wa[i]; });
  let y=y0; B.forEach((w,j)=>{ g+=`<text x="${x0-6}" y="${y+hb[j]/2+4}" font-size="12" text-anchor="end" fill="#2F6FA8" font-weight="700">${w}</text>`; y+=hb[j]; }); return cpSvg(g,W,H); }
/* 묶음: n개씩 k묶음 (점) */
function cpGroups(k,n,{shade=-1}={}){ const per=Math.min(n,10), cols=Math.min(k,5), rows=Math.ceil(k/cols), cw=Math.max(54,Math.ceil(Math.min(n,25)/5)*13+14), ch=Math.ceil(Math.min(n,25)/Math.ceil(Math.min(n,25)/5))*0+ (Math.min(5,Math.ceil(Math.min(n,25)/1))*0)+ 74; let g='';
  for(let i=0;i<k;i++){ const X=6+(i%cols)*(cw+8), Y=6+Math.floor(i/cols)*(ch+8); g+=`<rect x="${X}" y="${Y}" width="${cw}" height="${ch}" rx="12" fill="${shade>=0&&i<shade?'#FFE08A':'#FFF8EC'}" stroke="${CP_S}" stroke-width="1.3"/>`;
    const m=Math.min(n,25), c=Math.ceil(m/5); for(let j=0;j<m;j++) g+=`<circle cx="${X+10+(j%c)*13}" cy="${Y+12+Math.floor(j/c)*13}" r="5" fill="#C98742" stroke="#6B3E1C"/>`; if(n>25) g+=`<text x="${X+cw/2}" y="${Y+ch-6}" font-size="10" text-anchor="middle">…${n}개</text>`; }
  return cpSvg(g,12+cols*(cw+8),12+rows*(ch+8)); }
/* 분수 막대 */
function cpFrac(w,n,d,{label=''}={}){ if(!(d>0)||d>24) return ''; const L=200, h=22; let bars=[]; for(let k=0;k<w;k++) bars.push(d); let r=n; while(r>0){ bars.push(Math.min(r,d)); r-=d; } if(bars.length>6) return '';
  let g=''; bars.forEach((f,i)=>{ const y=4+i*(h+6); for(let j=0;j<d;j++) g+=`<rect x="${4+j*L/d}" y="${y}" width="${L/d}" height="${h}" fill="${j<f?'#F6C77E':'#fff'}" stroke="${CP_S}" stroke-width="1.2"/>`; });
  return cpCol(cpSvg(g,L+8,8+bars.length*(h+6),220),label?`<span style="font-size:.85rem">${label}</span>`:''); }
/* 100칸 */
function cpHund(v){ const n=Math.round(v*100); if(n<0||n>300) return ''; const grids=Math.max(1,Math.ceil(n/100)); let out=''; for(let gI=0;gI<grids;gI++){ let g=''; const m=Math.min(100,n-gI*100); for(let j=0;j<100;j++) g+=`<rect x="${2+(j%10)*9}" y="${2+Math.floor(j/10)*9}" width="9" height="9" fill="${j<m?'#F6C77E':'#fff'}" stroke="${CP_S}" stroke-width=".5"/>`; out+=cpSvg(g,94,94,94); } return cpRow(out); }
/* 수직선 */
function cpLine(lo,hi,step,marks){ const W=300, x0=14, L=272, n=Math.round((hi-lo)/step); if(n>40||n<2) return ''; let g=`<line x1="${x0}" y1="30" x2="${x0+L}" y2="30" stroke="${CP_S}" stroke-width="2"/>`; const big=Math.round(1/step)||1;
  for(let i=0;i<=n;i++){ const x=x0+L*i/n, v=+(lo+i*step).toFixed(4), major=(Math.abs(v-Math.round(v))<1e-9)||n<=10; g+=`<line x1="${x}" y1="${major?20:25}" x2="${x}" y2="${major?40:35}" stroke="${CP_S}" stroke-width="${major?1.6:1}"/>`; if(major&&(n<=12||Math.abs(v-Math.round(v))<1e-9)) g+=`<text x="${x}" y="54" font-size="11" text-anchor="middle" fill="#4A2E14">${v}</text>`; }
  (marks||[]).forEach(([v,lab,col])=>{ const x=x0+L*(v-lo)/(hi-lo); g+=`<circle cx="${x}" cy="30" r="5" fill="${col||'#D45F16'}"/>`+(lab?`<text x="${x}" y="13" font-size="11" text-anchor="middle" fill="${col||'#D45F16'}" font-weight="700">${lab}</text>`:''); });
  return cpSvg(g,W,60); }
/* 자릿값 표 */
function cpPlace(numStr,{blank=false}={}){ const s=String(numStr).replace(/,/g,''); if(!/^\d{4,12}$/.test(s)) return ''; const H=['천억','백억','십억','억','천만','백만','십만','만','천','백','십','일'].slice(12-s.length);
  return `<table style="border-collapse:collapse;font-family:Jua,sans-serif;margin:2px auto;background:#fff;color:#4A2E14"><tr>${H.map((h,i)=>`<th style="border:1.5px solid #B89A72;padding:2px 5px;font-size:.75rem;background:${(s.length-1-i)%4===0&&i<s.length-1?'#FFE3B0':'#FFF8EC'}">${h}</th>`).join('')}</tr><tr>${[...s].map(c=>`<td style="border:1.5px solid #B89A72;padding:3px 6px;text-align:center;font-size:1.1rem">${blank?'':c}</td>`).join('')}</tr></table>`; }
/* 대응표 */
function cpTable(r1,r2,h1='□',h2='△'){ const td=v=>`<td style="border:1.5px solid #B89A72;padding:3px 10px;text-align:center">${v}</td>`; return `<table style="border-collapse:collapse;font-family:Jua,sans-serif;margin:2px auto;background:#fff;color:#4A2E14;font-size:1.05rem"><tr><th style="border:1.5px solid #B89A72;padding:3px 8px;background:#FFF8EC">${h1}</th>${r1.map(td).join('')}</tr><tr><th style="border:1.5px solid #B89A72;padding:3px 8px;background:#FFF8EC">${h2}</th>${r2.map(td).join('')}</tr></table>`; }
/* 띠 모델: 비 a : b */
function cpTape(parts,{total='',names=[]}={}){ const sum=parts.reduce((s,v)=>s+v,0); if(sum>24||sum<2) return ''; const u=Math.min(26,270/sum); let g='', y=6; parts.forEach((p,i)=>{ for(let j=0;j<p;j++) g+=`<rect x="${50+j*u}" y="${y}" width="${u}" height="20" fill="${i?'#9FD0EE':'#F6C77E'}" stroke="${CP_S}" stroke-width="1.2"/>`; g+=`<text x="44" y="${y+15}" font-size="11" text-anchor="end" fill="#4A2E14">${names[i]||''}</text>`; y+=28; });
  if(total) g+=`<text x="${50+u*Math.max(...parts)/2}" y="${y+10}" font-size="11" text-anchor="middle" fill="#8A6A4A">${total}</text>`; return cpSvg(g,Math.max(60+u*Math.max(...parts),120),y+(total?16:2)); }
/* 수의 배열(점 배열) r × c */
function cpArray(r,c){ if(r*c>120) return ''; let g=''; for(let i=0;i<r;i++) for(let j=0;j<c;j++) g+=`<circle cx="${10+j*14}" cy="${10+i*14}" r="5.2" fill="#C98742" stroke="#6B3E1C"/>`; return cpSvg(g,c*14+6,r*14+6,260); }
const cpN=s=>+String(s).replace(/,/g,'');
const KNUM={'일':1,'이':2,'삼':3,'사':4,'오':5,'육':6,'칠':7,'팔':8,'구':9};
function cpFracs(t){ const out=[]; const re=/(?:(\d+)\s*[과와]\s*)?(\d+)\s*분의\s*(\d+)/g; let m; while((m=re.exec(t))) out.push({w:+(m[1]||0),d:+m[2],n:+m[3]}); return out; }
/* 문제 글 → 그림 */
function cpPic(ep,t){ let m; const S=ep.slice(0,2);
  if(/뜻은\?|검산|잘못된 계산|어떤 수를|약 얼마|어림/.test(t)) return '';   /* 뜻·검산·어림을 묻는 문제는 그림이 답을 알려 주므로 붙이지 않는다 */
  /* 혼합 계산·약속은 식이 대상이라 그림을 붙이지 않는다 */ if(S==='S3'&&/^S3-6[3-7]$/.test(ep)) return '';
  /* 큰 수 */ if(/^S3-(39|4[0-4])$/.test(ep)){ if((m=t.match(/(\d[\d,]{3,})/))) return cpWrap(cpPlace(m[1]),'자릿값 표'); if(/(만|억|천)/.test(t)&&/수로 쓰면|숫자로/.test(t)) return cpWrap(cpPlace('0'.repeat(/억/.test(t)?9:5),{blank:true}),'자릿값 표에 써 보세요'); return ''; }
  /* 어림(올림·버림·반올림) */ if((m=t.match(/(\d+)[을를] (올림|버림|반올림)하여 (십|백|천)의 자리/))){ const v=+m[1], u={십:10,백:100,천:1000}[m[3]], lo=Math.floor(v/u)*u; return cpWrap(cpLine(lo,lo+u,u/10,[[v,String(v)]]),`${lo}과 ${lo+u} 사이`); }
  /* 분수 */ const F=cpFracs(t);
  if(F.length&&/^S3-(1[7-9]|20|3[4-8]|5[1-5]|7[4-9]|8[0-2]|9[0-2]|9[7-9]|10[4-7])$/.test(ep)){
    if((m=t.match(/(\d+)(?:개)?의 (\d+)분의 (\d+)/))&&+m[1]<=40&&+m[1]%+m[2]===0) return cpWrap(cpGroups(+m[2],+m[1]/+m[2],{shade:+m[3]}),`${m[1]}개를 ${m[2]}묶음으로`);
    if((m=t.match(/(\d+) m의 (\d+)분의 (\d+)/))) return cpWrap(cpFrac(0,+m[3],+m[2],{label:`${m[1]} m를 ${m[2]}칸으로`}));
    { let mm; const FR='(\\d+)\\s*분의\\s*(\\d+)', R=x=>new RegExp(x);
      if(/×/.test(t)){ if(F.some(f=>f.w)) return '';
        if((mm=t.match(R('^'+FR+' × '+FR)))) return cpWrap(cpOfOf(+mm[2],+mm[1],+mm[4],+mm[3]),`${mm[1]}분의 ${mm[2]}의 ${mm[3]}분의 ${mm[4]}: 연한 칸 가운데 진한 칸`);
        if((mm=t.match(R('(?<![\\d의] )'+FR+' × (\\d+)(?!\\s*분)')))&&+mm[3]<=6) return cpWrap(cpRow(...Array.from({length:+mm[3]},()=>cpFrac(0,+mm[2],+mm[1]))),`${mm[1]}분의 ${mm[2]}${'를'} ${mm[3]}번 더해요`.replace('를',''));
        if((mm=t.match(R('(?<![\\d.])(\\d+) × '+FR)))&&+mm[1]<=12&&+mm[3]<+mm[2]+1) { const pc=cpPartOf(+mm[1],+mm[3],+mm[2]); return pc?cpWrap(pc,`${mm[1]}의 ${mm[2]}분의 ${mm[3]}: 똑같이 ${mm[2]}칸으로 나눈 것 중 ${mm[3]}칸`):''; }
        return ''; }
      if(/÷/.test(t)){ if(F.some(f=>f.w)) return '';
        if((mm=t.match(R(FR+' ÷ '+FR)))&&mm[1]===mm[3]) return cpWrap(cpSplitBar(+mm[1],+mm[2],+mm[4]),`${mm[1]}분의 ${mm[2]}에서 ${mm[3]}분의 ${mm[4]}씩 덜어 내요`);
        if((mm=t.match(R(FR+' ÷ (\\d+)(?!\\s*분)')))&&+mm[2]%+mm[3]===0) return cpWrap(cpSplitBar(+mm[1],+mm[2],+mm[2]/+mm[3]),`칠한 ${mm[2]}칸을 똑같이 ${mm[3]}묶음으로`);
        if((mm=t.match(R('(?<![\\d.])(\\d+) ÷ '+FR)))&&+mm[3]===1&&+mm[1]*+mm[2]<=24) return cpWrap(cpSplitBar(+mm[1]*+mm[2],+mm[1]*+mm[2],1),`${mm[1]}${''}을(를) ${mm[2]}분의 1씩 덜어 내요 (굵은 묶음 하나가 ${mm[2]}분의 1)`.replace('을(를)',/[136780]$/.test(mm[1])?'을':'를'));
        return ''; } }
    const bars=F.slice(0,3).map(f=>cpFrac(f.w,f.n,f.d,{label:`${f.w?f.w+'과 ':''}${f.d}분의 ${f.n}`})).filter(Boolean); if(/^1 − /.test(t)) bars.unshift(cpFrac(1,0,F[0].d,{label:'1'})); return bars.length?cpWrap(cpRow(...bars)):''; }
  /* 소수 */ const D=(t.match(/\d+\.\d+/g)||[]).map(Number);
  if(D.length&&/^S3-9[3-6]$/.test(ep)){ let mm; const dn=v=>{ const t2=String(v).split('.')[1]||''; return [Math.round(v*10**t2.length),10**t2.length]; };
    /* (소수) × (자연수): 소수를 자연수 번 더하기(동수누가) */ if((mm=t.match(/(?<![\d.])(\d+\.\d) × (\d)(?![\d.])/))||(mm=t.match(/한 도막이 (\d+\.\d) m인 대나무 (\d)도막/))){ const h=cpHops(+mm[1],+mm[2]); return h?cpWrap(h,`${mm[1]}씩 ${mm[2]}번 뛰어요`):''; }
    /* (자연수) × (소수): 자연수의 소수 배 */ if((mm=t.match(/(?<![\d.])(\d+)(?![\d.]) × (0\.\d)(?!\d)/))||(mm=t.match(/1 m의 무게가 (\d+) kg인[^.]*\. 이 대나무 (0\.\d) m/))){ const [n,d]=dn(+mm[2]); const pc=cpPartOf(+mm[1],n,d); return pc?cpWrap(pc,`${mm[1]}의 ${mm[2]}배: ${mm[1]}${'을'}(를) 똑같이 ${d}칸으로 나눈 것 중 ${n}칸`.replace("을(를)",/[136780]$/.test(mm[1])?'을':'를')):''; }
    /* (소수) × (소수): A의 B배 */ if((mm=t.match(/(?<![\d.])(0\.\d) × (0\.\d)(?!\d)/))||(mm=t.match(/1 m의 무게가 (0\.\d) kg인[^.]*\. 이 대나무 (0\.\d) m/))){ const [an,ad]=dn(+mm[1]), [bn,bd]=dn(+mm[2]); return cpWrap(cpOfOf(an,ad,bn,bd),`${mm[1]}의 ${mm[2]}배: 연한 칸이 ${mm[1]}, 그중 진한 칸이 ${mm[2]}만큼 (큰 정사각형 1개 = 1)`); }
    return ''; }
  if(D.length&&/^S3-(10[0-3]|10[89]|11[0-2])$/.test(ep)){ let mm; const cnt=(x,y)=>Math.round(x/y*1000)/1000;
    /* (소수·자연수) ÷ (소수): 포함제 — 나누는 수만큼씩 덜어 내기 */ if((mm=t.match(/(?<![\d.])(\d+(?:\.\d+)?) ÷ (\d+\.\d+)/))||(mm=t.match(/(\d+(?:\.\d+)?) L를 한 (?:컵|병)에 (\d+\.\d+) L씩/))){ const n=cnt(+mm[1],+mm[2]); if(n<=15&&+mm[1]<=12){ const h=cpHops(+mm[2],Math.floor(n+1e-9)); return h?cpWrap(h,`${mm[1]}에서 ${mm[2]}씩 덜어 내요`):''; } return ''; }
    /* (소수) ÷ (자연수): 등분제 — 똑같이 나누기 */ if((mm=t.match(/(?<![\d.])(\d+\.\d+) ÷ (\d+)(?![\d.])/))||(mm=t.match(/(\d+\.\d+) L를 (\d+)명이 똑같이/))){ const e=cpEqualSplit(+mm[1],+mm[2]); return e?cpWrap(e,`${mm[1]}${/[136780]$/.test(mm[1])?'을':'를'} 똑같이 ${mm[2]}로 나누어요`):''; }
    return ''; }
  if(D.length&&/^S3-(2[12]|5[6-9]|6[0-2])$/.test(ep)){ const mx=Math.max(...D, ...((t.match(/(?:^|[^.\d])(\d+)(?![.\d])/g)||[]).map(x=>+x.replace(/\D/g,'')).filter(v=>v<=10)));
    const two=D.some(v=>/\.\d\d/.test(String(v))); if(two&&mx<=3&&D.length<=2) return cpWrap(cpRow(...D.map(v=>cpCol(cpHund(v),`<span style="font-size:.85rem">${v}</span>`))),'큰 정사각형 1개 = 1');
    if(!two&&mx<=10){ const hi=Math.max(1,Math.ceil(mx+0.0001)); return cpWrap(cpLine(0,hi,hi>4?0.5:0.1,D.slice(0,3).map((v,i)=>[v,String(v),['#D45F16','#2F6FA8','#3F8F3F'][i]])),'수직선'); } return ''; }
  /* 비·비율·비례 */ if(S==='S5'){ if((m=t.match(/□가 ([\d, ]+)일 때 △[가는] ([\d, ]+)/))) return cpWrap(cpTable(m[1].split(/,\s*/).concat('…'),m[2].split(/,\s*/).concat('…')),'대응표');
    if((m=t.match(/(\d+)[개을를]* ?(\d+) ?: ?(\d+)로 나누/))||(m=t.match(/(\d+)개를 (\d+) : (\d+)/))) return cpWrap(cpTape([+m[2],+m[3]],{total:`모두 ${m[1]}`,names:['앞','뒤']}),'띠 모델');
    if((m=t.match(/(\d+) : (\d+)(?! *=)/))&&+m[1]+ +m[2]<=20&&!/\./.test(t)) return cpWrap(cpTape([+m[1],+m[2]],{names:['전항','후항']}),'띠 모델');
    if((m=t.match(/([가-힣]+) (\d+)개, ([가-힣]+) (\d+)개/))&&+m[2]+ +m[4]<=20) return cpWrap(cpTape([+m[2],+m[4]],{names:[m[1],m[3]]}));
    if((m=t.match(/^(\d+), (\d+), (\d+), (\d+)/))){ return ''; } return ''; }
  /* 약수·배수 */ if((m=t.match(/^(\d+)의 약수는 모두 몇 개/))&&+m[1]<=48){ return ''; }
  /* 덧셈·뺄셈 (세 자리까지) */ if((m=t.match(/(\d{2,3}) ([+−]) (\d{2,3})(?!\d| ×| ÷)/))&&!/[×÷]/.test(t)){ const a=+m[1], b=+m[3]; return cpWrap(m[2]==='+'?cpRow(cpCol(cpBlocks(a)),cpOp('+'),cpCol(cpBlocks(b))):cpRow(cpCol(cpBlocks(a)),cpOp('−'),`<span style="font-size:1.1rem">${b}</span>`),'수 모형'); }
  if((m=t.match(/도토리가 (\d+)개 있었어요\. 람이가 (\d+)개를 더/))) return cpWrap(cpRow(cpCol(cpBlocks(+m[1])),cpOp('+'),cpCol(cpBlocks(+m[2]))),'수 모형');
  if((m=t.match(/도토리 (\d+)개를 준비했어요\. 그중 (\d+)개/))) return cpWrap(cpRow(cpCol(cpBlocks(+m[1])),cpOp('−'),`<span style="font-size:1.1rem">${m[2]}</span>`),'수 모형');
  /* 곱셈 */ let a,b; if((m=t.match(/(\d+) × (\d+)(?! *[×÷+−])/))){ a=+m[1]; b=+m[2]; } else if((m=t.match(/한 (?:봉지|대)에 (\d+)개씩 (?:담았어요|실었어요)\. (?:수레 )?(\d+)(?:봉지|대)/))){ a=+m[1]; b=+m[2]; }
  if(a&&b&&!/[.÷]/.test(t)&&!/^\d+ × \d+ = \d+/.test(t)){ if(b<=6&&a<=60) return cpWrap(cpGroups(b,a),`${a}씩 ${b}묶음`); if(b<=5&&a<=999) return cpWrap(cpCol(...Array.from({length:b},()=>cpBlocks(a,{lab:false,u:2.2}))),`${a}씩 ${b}줄 (수 모형)`); if(a<=999&&b<=99) return cpWrap(cpArea(a,b),'넓이 모델: 나누어 곱해서 더해요'); }
  /* 나눗셈: 등분제와 포함제를 구분 */ { let dm=t.match(/(?<![\d.])(\d+) ÷ (\d+)(?![\d.]| *[×÷+−])/), kind=null; a=b=0;
    if(dm){ a=+dm[1]; b=+dm[2]; } let wm;
    if((wm=t.match(/(\d+)개를 (?:바구니 |접시 )?(\d+)(?:명에게|개에|명이|곳에) 똑같이/))){ a=+wm[1]; b=+wm[2]; kind='part'; }
    else if((wm=t.match(/(\d+)개를 한 (?:봉지|상자|바구니)에 (\d+)개씩/))||(wm=t.match(/(\d+)에서 (\d+)씩 몇 번/))||(wm=t.match(/(\d+)개로 (\d+)개짜리/))){ a=+wm[1]; b=+wm[2]; kind='meas'; }
    else if(dm&&/똑같이 나누/.test(t)) kind='part'; else if(dm&&/씩/.test(t)) kind='meas';
    if(a&&b>=2&&!/\./.test(t)&&a<=999){ const bare=!kind; if(bare) kind=b>=10?'meas':(a<=60?rndPick('part','meas'):'part');   /* 식만 있는 문제는 뜻을 하나 정해 상황을 붙인다 */
      const J=(n,x,y)=>/[136780]$/.test(String(n))?x:y, sit=kind==='part'?`도토리 ${a}개를 ${b}명이 똑같이 나누어요. 한 명이 몇 개?`:`도토리 ${a}개를 ${b}개씩 묶어요. 몇 묶음?`;
      if(a<=60&&b<=10&&Math.floor(a/b)<=20) return cpWrap(cpShare(a,b,kind),(bare?sit+' · ':'')+(kind==='part'?`접시 ${b}개에 똑같이 나누었어요`:`${b}개씩 묶었어요`));
      return cpWrap(cpRow(cpCol(cpBlocks(a,{u:a>300?2:3})),cpOp('÷'),`<span style="font-size:1.1rem">${b}</span>`),(bare?sit+' · ':'')+(kind==='part'?`${b}곳에 똑같이 나누어요`:`${b}씩 덜어 내요`)); } }
  return ''; }
/* 나눗셈 그림은 뜻에 따라 다르게 그린다.
   등분제(part): b곳에 똑같이 나누기 → 접시 b개에 q개씩. 답은 '한 접시에 몇 개'.
   포함제(meas): b개씩 덜어 내기 → b개짜리 묶음이 q개. 답은 '몇 묶음'. 남는 것은 흰색으로 따로. */
function cpShare(a,b,kind){ const q=Math.floor(a/b), r=a%b, d=13; let g='', W=0, H=0;
  const dots=(X,Y,n,c)=>{ let o=''; for(let i=0;i<n;i++) o+=`<circle cx="${X+7+(i%c)*d}" cy="${Y+8+Math.floor(i/c)*d}" r="5" fill="#C98742" stroke="#6B3E1C"/>`; return o; };
  if(kind==='part'){ const c=Math.min(q,5)||1, pw=c*d+8, ph=Math.max(1,Math.ceil(q/c))*d+18, per=Math.max(1,Math.min(b,Math.floor(300/(pw+8))));
    for(let k=0;k<b;k++){ const X=6+(k%per)*(pw+8), Y=6+Math.floor(k/per)*(ph+8); g+=`<rect x="${X}" y="${Y}" width="${pw}" height="${ph}" rx="10" fill="#FFF8EC" stroke="${CP_S}" stroke-width="1.5"/><text x="${X+pw/2}" y="${Y+ph-3}" font-size="9" text-anchor="middle" fill="#8A6A4A">${k+1}</text>`+dots(X+1,Y+1,q,c); }
    W=12+Math.min(b,per)*(pw+8); H=12+Math.ceil(b/per)*(ph+8); if(r){ g+=dots(W,6,r,1).replace(/fill="#C98742"/g,'fill="#fff"'); W+=22; H=Math.max(H,r*d+14); } }
  else { const c=b<=5?b:Math.ceil(b/2), gw=c*d+6, gh=Math.ceil(b/c)*d+6, per=Math.max(1,Math.floor(300/(gw+6)));
    for(let k=0;k<q;k++){ const X=6+(k%per)*(gw+6), Y=6+Math.floor(k/per)*(gh+6); g+=`<rect x="${X}" y="${Y}" width="${gw}" height="${gh}" rx="8" fill="#FFF3D6" stroke="#D49A3A" stroke-dasharray="4 2" stroke-width="1.4"/>`+dots(X,Y,b,c); }
    W=12+Math.min(Math.max(q,1),per)*(gw+6); H=12+Math.max(1,Math.ceil(q/per))*(gh+6); if(r){ const Y=H-2; g+=dots(4,Y,r,r).replace(/fill="#C98742"/g,'fill="#fff"'); H+=d+8; W=Math.max(W,r*d+16); } }
  return cpSvg(g,W,H,320); }
/* 수직선 위에서 total을 b로 똑같이 나누기(등분제) */
function cpEqualSplit(total,b){ const hi=Math.ceil(total+1e-9); if(hi>20||b>10) return ''; const W=300, x0=14, L=272, X=v=>x0+L*v/hi; let g=`<rect x="${x0}" y="14" width="${X(total)-x0}" height="18" fill="#F6C77E" stroke="${CP_S}" stroke-width="1.2"/>`;
  for(let k=1;k<b;k++){ const xx=x0+(X(total)-x0)*k/b; g+=`<line x1="${xx}" y1="14" x2="${xx}" y2="32" stroke="${CP_S}" stroke-width="1.6" stroke-dasharray="3 2"/>`; } g+=`<text x="${(x0+X(total))/2}" y="10" font-size="11" text-anchor="middle" fill="#D45F16" font-weight="700">${total}</text>`;
  g+=`<line x1="${x0}" y1="44" x2="${x0+L}" y2="44" stroke="${CP_S}" stroke-width="2"/>`; for(let v=0;v<=hi;v++) g+=`<line x1="${X(v)}" y1="38" x2="${X(v)}" y2="50" stroke="${CP_S}"/><text x="${X(v)}" y="63" font-size="11" text-anchor="middle">${v}</text>`; return cpSvg(g,W,68); }
/* (자연수) × (1보다 작은 수): a의 f배 — 길이 a인 띠를 den칸으로 똑같이 나누고 num칸만 칠한다 */
function cpPartOf(a,num,den){ if(den>20||a>12) return ''; const W=300, x0=14, L=272, u=L/a; let g=''; for(let k=0;k<den;k++) g+=`<rect x="${x0+k*L/den}" y="10" width="${L/den}" height="24" fill="${k<num?'#F6C77E':'#fff'}" stroke="${CP_S}" stroke-width="1"/>`;
  g+=`<line x1="${x0}" y1="46" x2="${x0+L}" y2="46" stroke="${CP_S}" stroke-width="2"/>`; for(let v=0;v<=a;v++) g+=`<line x1="${x0+v*u}" y1="40" x2="${x0+v*u}" y2="52" stroke="${CP_S}"/><text x="${x0+v*u}" y="65" font-size="11" text-anchor="middle">${v}</text>`; return cpSvg(g,W,70); }
/* (1보다 작은 수) × (1보다 작은 수): A의 B — 큰 정사각형 1에서 가로 an/ad만 연하게, 그 안에서 세로 bn/bd만 진하게 */
function cpOfOf(an,ad,bn,bd){ if(ad>12||bd>12) return ''; const Sz=132, cw=Sz/ad, rh=Sz/bd; let g=''; for(let i=0;i<bd;i++) for(let j=0;j<ad;j++) g+=`<rect x="${2+j*cw}" y="${2+i*rh}" width="${cw}" height="${rh}" fill="${j<an?(i<bn?'#E08A3C':'#FBE3BC'):'#fff'}" stroke="${CP_S}" stroke-width=".6"/>`; return cpSvg(g,Sz+4,Sz+4,150); }
/* 띠를 똑같이 나누기(등분제) / 같은 크기로 덜어 내기(포함제) */
function cpSplitBar(cells,shaded,chunk){ if(cells>24) return ''; const L=260, w=L/cells; let g=''; for(let j=0;j<cells;j++) g+=`<rect x="${6+j*w}" y="6" width="${w}" height="24" fill="${j<shaded?'#F6C77E':'#fff'}" stroke="${CP_S}" stroke-width="1"/>`;
  if(chunk>0) for(let k=0;k+chunk<=shaded;k+=chunk){ const A=6+k*w+2, B=6+(k+chunk)*w-2; g+=`<path d="M${A},36 v6 H${B} v-6" fill="none" stroke="#D45F16" stroke-width="1.8"/>`; } return cpSvg(g,L+12,48,280); }
function cpHops(x,n){ const tot=x*n, hi=Math.max(1,Math.ceil(tot+1e-9)); if(n>15||hi>12) return ''; const W=300, x0=14, L=272; let g=`<line x1="${x0}" y1="44" x2="${x0+L}" y2="44" stroke="${CP_S}" stroke-width="2"/>`; const st=hi<=2?0.1:hi<=5?0.5:1;
  for(let v=0;v<=hi+1e-9;v+=st){ const X=x0+L*v/hi, maj=Math.abs(v-Math.round(v))<1e-9; g+=`<line x1="${X}" y1="${maj?36:40}" x2="${X}" y2="${maj?52:48}" stroke="${CP_S}"/>`; if(maj) g+=`<text x="${X}" y="66" font-size="11" text-anchor="middle">${Math.round(v)}</text>`; }
  for(let k=0;k<n;k++){ const A=x0+L*k*x/hi, B=x0+L*(k+1)*x/hi; g+=`<path d="M${A},44 Q${(A+B)/2},${44-Math.min(30,(B-A)*0.8)} ${B},44" fill="none" stroke="#D45F16" stroke-width="1.8"/>`; } g+=`<text x="${x0+L*x/hi/2}" y="12" font-size="11" text-anchor="middle" fill="#D45F16">${x}</text>`; return cpSvg(g,W,72); }
function cpDecArea(a,b){ const A=Math.round(a*10), B=Math.round(b*10); if(A>10||B>10||A<1||B<1) return ''; let g=''; for(let i=0;i<10;i++) for(let j=0;j<10;j++){ const c=j<A, r=i<B; g+=`<rect x="${2+j*12}" y="${2+i*12}" width="12" height="12" fill="${c&&r?'#E08A3C':c?'#F6D7A8':r?'#CFE6F5':'#fff'}" stroke="${CP_S}" stroke-width=".5"/>`; } return cpSvg(g,124,124,150); }
function cpaVis(ep,q){ if(!/^S[2-6]-/.test(ep)||!q||q.manip||q.onMount||q._cpaPic!=null) return q; const V=String(q.visual||''); if(/<svg|<img|<table|○/.test(V)) return q; if(/<div|<span/.test(V.replace(/<div class="eqrow">[\s\S]*$/,''))) return q;   /* 이미 그림(막대 등)이 있는 문제에는 덧붙이지 않는다 */
  const t=_pl(String(q.q)).replace(/\s+/g,' ').trim(); let pic=''; try{ pic=cpPic(ep,t); }catch(e){ pic=''; } if(!pic) return q;
  q._cpaPic=pic; q._cpaBase=V; q._svEp=ep; q.visual=pic+V; q._svShown=1; return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=cpaVis(ep,q); }catch(e){} return q; }; }
/* 보여 줄 때 정하기: 장부를 보고 그림을 붙이거나 뗀다 (입체도형 그림도 같은 방식으로) */
try{ const _ra=runAct; runAct=function(){ try{ const a=S&&S.acts&&S.acts[S.i]; const q=a&&a.kind==='q'&&a.q; if(q&&q._svEp){ if(q._cpaPic==null&&q._svShown&&q._svBase==null){ /* 3-49 입체: 처음 붙인 그림을 기억 */ } const show=(svFadeGet()[q._svEp]||0)<2;
      if(q._cpaPic!=null){ q.visual=show?q._cpaPic+q._cpaBase:q._cpaBase; q._svShown=show?1:0; } } }catch(e){} return _ra.apply(this,arguments); }; }catch(e){}
window._cpPic=cpPic; window._cpaVis=cpaVis;


// ===== 3-52. 구체 → 그림 → 글 2차: 도형·측정(S6), 규칙·비(S5), 자료(S4) =====
// 3-51의 cpPic 앞에 끼워, 글만 있는 문제에 맞는 그림을 그린다. 답이 되는 값은 '?'로 두고, 그림이 답을 바로 알려 주는 뜻·이름 묻기 문제는 건너뛴다.
const GX_S='#7A4A1E', GX_F='#FFE3B0', gxT=(x,y,s,sz=12,col='#4A2E14',anc='middle',w=700)=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${sz}" text-anchor="${anc}" fill="${col}" font-weight="${w}">${s}</text>`;
const gxQ='#D45F16';
/* 단위 띠: 큰 단위 n개(칸마다 '1 m = 100 cm') + 나머지 */
function gxUnits(n,rest,big,small,per,{ask=''}={}){ if(n>9) return ''; const bw=n>6?30:n>4?44:54, h=40; let g='', x=6; for(let k=0;k<n;k++){ g+=`<rect x="${x}" y="6" width="${bw}" height="${h}" fill="${GX_F}" stroke="${GX_S}" stroke-width="1.5"/>`+gxT(x+bw/2,23,`1 ${big}`,bw<40?9:11)+gxT(x+bw/2,38,`${per} ${small}`,bw<40?7.5:9.5,'#8A6A4A','middle',400); x+=bw; }
  if(rest){ const rw=Math.max(38,bw*0.75); g+=`<rect x="${x}" y="6" width="${rw}" height="${h}" fill="#CFE6F5" stroke="${GX_S}" stroke-width="1.5"/>`+gxT(x+rw/2,31,`${rest} ${small}`,rest>999?8:10); x+=rw; } return cpSvg(g,x+6,h+12,330); }
const GX_U=[['km','m',1000],['m','cm',100],['cm','mm',10],['kg','g',1000],['t','kg',1000],['L','mL',1000],['시간','분',60],['분','초',60],['주일','일',7],['년','개월',12],['일','시간',24]];
/* 시계 */
function gxClock(h,m){ try{ return `<svg viewBox="0 0 120 120" width="120" style="background:#fff;border-radius:10px">${clockSvg(h,m)}</svg>`; }catch(e){ return ''; } }
/* 삼각형: 밑각 A(왼쪽), B(오른쪽) */
function gxTri(A,B,labs){ const C=180-A-B; if(A<=0||B<=0||C<=0) return ''; const L=150, ra=A*Math.PI/180, rb=B*Math.PI/180, h=L/(1/Math.tan(ra)+1/Math.tan(rb)), px=h/Math.tan(ra); if(!(h>8)) return '';
  const sc=Math.min(1,110/h,1), W=L*sc, P=[[30,140],[30+W,140],[30+px*sc,140-h*sc]]; let minx=Math.min(...P.map(p=>p[0])), maxx=Math.max(...P.map(p=>p[0])); const dx=minx<14?14-minx:0;
  P.forEach(p=>p[0]+=dx); maxx+=dx; let g=`<polygon points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2" stroke-linejoin="round"/>`;
  const cx=(P[0][0]+P[1][0]+P[2][0])/3, cy=(P[0][1]+P[1][1]+P[2][1])/3; (labs||[]).forEach((s,i)=>{ if(s==null) return; const p=P[i], d=Math.hypot(cx-p[0],cy-p[1]), k=Math.min(0.42,26/d); g+=gxT(p[0]+(cx-p[0])*k,p[1]+(cy-p[1])*k+4,s,11,/\?/.test(s)?gxQ:'#4A2E14'); });
  return cpSvg(g,Math.max(maxx+16,200),156,260); }
/* 세 변으로 삼각형 */
function gxTriSides(a,b,c){ if(a+b<=c||a+c<=b||b+c<=a) return ''; const A=Math.acos((b*b+c*c-a*a)/(2*b*c))*180/Math.PI, B=Math.acos((a*a+c*c-b*b)/(2*a*c))*180/Math.PI; const pic=gxTri(A,B,[]); return pic; }
/* 직사각형·정사각형 */
function gxRect(w,h,{wl='',hl='',inl='',sq=false}={}){ const r=sq?1:Math.max(0.35,Math.min(2.4,w/h)), H=r>1?150/r:110, W=H*r, x=60, y=14; let g=`<rect x="${x}" y="${y}" width="${W}" height="${H}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`+gxT(x+W/2,y+H+16,wl,12,/\?/.test(wl)?gxQ:'#4A2E14')+gxT(x-6,y+H/2+4,hl,12,/\?/.test(hl)?gxQ:'#4A2E14','end')+(inl?gxT(x+W/2,y+H/2+4,inl,12,'#8A6A4A'):''); return cpSvg(g,x+W+20,y+H+24,280); }
/* 원 */
function gxCircle({r='',d='',cap=''}={}){ let g=`<circle cx="80" cy="76" r="60" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><circle cx="80" cy="76" r="2.5" fill="${GX_S}"/>`;
  if(d) g+=`<line x1="20" y1="76" x2="140" y2="76" stroke="${GX_S}" stroke-width="1.6"/>`+gxT(80,70,d,11,/\?/.test(d)?gxQ:'#4A2E14'); if(r) g+=`<line x1="80" y1="76" x2="${80+60*0.7}" y2="${76+60*0.714}" stroke="#2F6FA8" stroke-width="1.8"/>`+gxT(118,104,r,11,/\?/.test(r)?gxQ:'#2F6FA8','start'); return cpSvg(g,d||r?190:160,150,200); }
/* 평행사변형·삼각형·사다리꼴·마름모 (넓이) */
function gxPara(b,h){ const g=`<polygon points="50,20 200,20 170,100 20,100" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="100" stroke="#2F6FA8" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M50,92 h8 v8" fill="none" stroke="#2F6FA8"/>`+gxT(95,116,b,12,/\?/.test(b)?gxQ:'#4A2E14')+gxT(58,64,h,12,/\?/.test(h)?gxQ:'#2F6FA8','start'); return cpSvg(g,215,122,260); }
function gxTriArea(b,h){ const g=`<polygon points="20,110 190,110 130,20" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><line x1="130" y1="20" x2="130" y2="110" stroke="#2F6FA8" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M130,102 h8 v8" fill="none" stroke="#2F6FA8"/>`+gxT(105,126,b,12,/\?/.test(b)?gxQ:'#4A2E14')+gxT(137,70,h,12,/\?/.test(h)?gxQ:'#2F6FA8','start'); return cpSvg(g,215,132,260); }
function gxTrap(a,b,h){ const g=`<polygon points="70,20 150,20 200,100 20,100" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><line x1="70" y1="20" x2="70" y2="100" stroke="#2F6FA8" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M70,92 h8 v8" fill="none" stroke="#2F6FA8"/>`+gxT(110,14,a,12)+gxT(110,116,b,12)+gxT(77,64,h,12,/\?/.test(h)?gxQ:'#2F6FA8','start'); return cpSvg(g,215,122,260); }
function gxRhom(d1,d2){ const g=`<polygon points="110,10 200,65 110,120 20,65" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><line x1="20" y1="65" x2="200" y2="65" stroke="#2F6FA8" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="110" y1="10" x2="110" y2="120" stroke="#3F8F3F" stroke-width="1.5" stroke-dasharray="4 3"/>`+gxT(160,60,d1,11,/\?/.test(d1)?gxQ:'#2F6FA8')+gxT(116,36,d2,11,/\?/.test(d2)?gxQ:'#3F8F3F','start'); return cpSvg(g,220,130,260); }
/* 직육면체 겨냥도 + 치수 */
function gxBox(a,b,c,cube){ const w=cube?90:120, h=cube?90:70, d=cube?40:46, x0=40, y0=28, P=(x,y,z)=>[x0+x+z*0.9, y0+h-y+d*0.7-z*0.7], v=[[0,0,0],[w,0,0],[w,h,0],[0,h,0],[0,0,d],[w,0,d],[w,h,d],[0,h,d]].map(q=>P(...q)), pp=a=>a.map(p=>p.map(t=>t.toFixed(1)).join(',')).join(' ');
  let g=`<polygon points="${pp([v[0],v[1],v[2],v[3]])}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><polygon points="${pp([v[3],v[2],v[6],v[7]])}" fill="#FFF0D2" stroke="${GX_S}" stroke-width="2"/><polygon points="${pp([v[1],v[5],v[6],v[2]])}" fill="#F6CF95" stroke="${GX_S}" stroke-width="2"/>`;
  g+=gxT((v[0][0]+v[1][0])/2,v[0][1]+15,a,11)+gxT(v[1][0]+d*0.45+14,(v[1][1]+v[5][1])/2+12,b,11,'#4A2E14','start')+gxT(v[0][0]-5,(v[0][1]+v[3][1])/2+4,c,11,'#4A2E14','end'); return cpSvg(g,x0+w+d+60,y0+h+d*0.7+22,270); }
/* 각 그림 */
function gxAngle(deg,lab){ const r=64, a=deg*Math.PI/180, ox=deg>90?86:22, oy=84, x2=ox+r*Math.cos(a), y2=oy-r*Math.sin(a), ar=20; const g=`<line x1="${ox}" y1="${oy}" x2="${ox+r}" y2="${oy}" stroke="${GX_S}" stroke-width="2.2"/><line x1="${ox}" y1="${oy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${GX_S}" stroke-width="2.2"/><path d="M${ox+ar},${oy} A${ar},${ar} 0 0 0 ${(ox+ar*Math.cos(a)).toFixed(1)},${(oy-ar*Math.sin(a)).toFixed(1)}" fill="none" stroke="${gxQ}" stroke-width="1.8"/>`+gxT(ox+34*Math.cos(a/2)+4,oy-34*Math.sin(a/2)+4,lab,11,gxQ); return cpSvg(g,ox+r+14,96,150); }
/* 사각형(네 각) */
function gxQuad(labs){ const P=[[30,110],[190,110],[160,24],[60,40]]; let g=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`; const cx=110, cy=72; labs.forEach((s,i)=>{ const p=P[i]; g+=gxT(p[0]+(cx-p[0])*0.3,p[1]+(cy-p[1])*0.3+4,s,11,/\?/.test(s)?gxQ:'#4A2E14'); }); return cpSvg(g,215,124,250); }
/* 정다각형 */
function gxPoly(n,{diagFrom=-1,r=46}={}){ const P=Array.from({length:n},(_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/n+(n%2?0:Math.PI/n); return [56+r*Math.cos(a),54+r*Math.sin(a)]; }); let g=`<polygon points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`; if(diagFrom>=0) g+=`<circle cx="${P[0][0].toFixed(1)}" cy="${P[0][1].toFixed(1)}" r="5" fill="${gxQ}"/>`; return `<svg viewBox="0 0 112 108" width="100" style="background:#fff;border-radius:8px">${g}</svg>`; }
/* 하루 띠(0~24시) */
function gxDay(a,b){ const x0=10, L=290, X=h=>x0+L*h/24; let g=`<rect x="${x0}" y="14" width="${L}" height="18" fill="#fff" stroke="${GX_S}"/><rect x="${X(a)}" y="14" width="${X(b)-X(a)}" height="18" fill="#F6C77E" stroke="${GX_S}"/>`; for(let h=0;h<=24;h++){ g+=`<line x1="${X(h)}" y1="32" x2="${X(h)}" y2="${h%6?36:41}" stroke="${GX_S}"/>`; }
  [[0,'오전 0시'],[12,'낮 12시'],[24,'밤 12시']].forEach(([h,s])=>g+=gxT(X(h),53,s,9.5,'#6B4A2A',h===0?'start':h===24?'end':'middle',400)); const f=h=>`${h<12?'오전':'오후'} ${h%12||12}시`; g+=gxT(X(a),10,f(a),10,gxQ)+gxT(X(b),10,f(b),10,gxQ); return cpSvg(g,310,58); }
/* 수 배열(규칙): 칸 + 뛰는 화살표 */
function gxSeq(items){ const n=items.length; if(n>8) return ''; const w=Math.min(46,300/n), y=26; let g=''; items.forEach((s,i)=>{ const x=6+i*w; g+=`<rect x="${x+2}" y="${y}" width="${w-6}" height="28" rx="6" fill="${/□|\?/.test(s)?'#FFF3C4':'#fff'}" stroke="${GX_S}" stroke-width="1.4"/>`+gxT(x+w/2-1,y+19,s,String(s).length>3?10:13,/□|\?/.test(s)?gxQ:'#4A2E14'); if(i<n-1) g+=`<path d="M${x+w/2},${y-2} Q${x+w},${y-20} ${x+w*1.5-2},${y-2}" fill="none" stroke="${gxQ}" stroke-width="1.4"/>`; }); return cpSvg(g,n*w+12,60); }
/* 양팔 저울(등호): 왼쪽·오른쪽에 놓인 수 카드 */
function gxBalance(Ls,Rs){ const card=(x,y,s)=>`<rect x="${x-16}" y="${y-22}" width="32" height="22" rx="5" fill="${/□/.test(s)?'#FFF3C4':'#fff'}" stroke="${GX_S}" stroke-width="1.4"/>`+gxT(x,y-6,s,12,/□/.test(s)?gxQ:'#4A2E14');
  let g=`<polygon points="150,96 138,120 162,120" fill="#C98742" stroke="${GX_S}" stroke-width="1.5"/><line x1="30" y1="96" x2="270" y2="96" stroke="${GX_S}" stroke-width="4"/><rect x="30" y="92" width="100" height="5" fill="#E3A866" stroke="${GX_S}"/><rect x="170" y="92" width="100" height="5" fill="#E3A866" stroke="${GX_S}"/>`; Ls.forEach((s,i)=>g+=card(58+i*42,90,s)); Rs.forEach((s,i)=>g+=card(198+i*42,90,s)); g+=gxT(150,84,'=',16,gxQ); return cpSvg(g,300,124); }
/* 막대(평균·자료): 값만큼 칸 쌓기 */
function gxTowers(vals,names){ const mx=Math.max(...vals); if(mx>20||vals.length>7) return gxBars(vals,names); const u=Math.min(13,110/Math.max(mx,1)), w=30; let g=''; vals.forEach((v,i)=>{ const x=14+i*(w+10); for(let k=0;k<v;k++) g+=`<rect x="${x}" y="${128-(k+1)*u}" width="${w}" height="${u}" fill="${GX_F}" stroke="${GX_S}" stroke-width="1"/>`; g+=gxT(x+w/2,142,names?names[i]:v,10.5,'#4A2E14','middle',400); }); g+=`<line x1="6" y1="128" x2="${18+vals.length*(w+10)}" y2="128" stroke="${GX_S}" stroke-width="1.6"/>`; return cpSvg(g,24+vals.length*(w+10),148,300); }
function gxBars(vals,names){ const mx=Math.max(...vals), w=30; let g=''; vals.forEach((v,i)=>{ const x=14+i*(w+12), h=110*v/mx; g+=`<rect x="${x}" y="${128-h}" width="${w}" height="${h}" fill="${GX_F}" stroke="${GX_S}" stroke-width="1.3"/>`+gxT(x+w/2,124-h,v,10.5)+gxT(x+w/2,142,names?names[i]:'',10.5,'#4A2E14','middle',400); }); g+=`<line x1="6" y1="128" x2="${18+vals.length*(w+12)}" y2="128" stroke="${GX_S}" stroke-width="1.6"/>`; return cpSvg(g,24+vals.length*(w+12),148,300); }
/* 막대그래프 한 줄(눈금 칸): 값은 적지 않고 칸만 */
function gxBarGrid(cells,unitLab,names){ const mx=Math.max(...cells)+1, u=Math.min(13,100/mx), w=30; let g=''; for(let k=0;k<=mx;k++) g+=`<line x1="30" y1="${130-k*u}" x2="${40+cells.length*(w+12)}" y2="${130-k*u}" stroke="#E5D3B5"/>`; cells.forEach((c,i)=>{ const x=40+i*(w+12); g+=`<rect x="${x}" y="${130-c*u}" width="${w}" height="${c*u}" fill="#F2A65A" stroke="${GX_S}" stroke-width="1.3"/>`+gxT(x+w/2,144,names?names[i]:'',10.5,'#4A2E14','middle',400); }); g+=gxT(28,133,'0',9.5,'#6B4A2A','end',400)+`<path d="M22,${130-u} v${u}" stroke="${gxQ}" stroke-width="2"/>`+gxT(4,11,unitLab,10,gxQ,'start'); return cpSvg(g,Math.max(110,50+cells.length*(w+12)),150,300); }
/* 꺾은선 */
function gxLine(vals,names){ const mx=Math.max(...vals), mn=0, W=280, x0=30, y0=120, sx=(W-x0-14)/(vals.length-1), sy=96/mx; let g=`<line x1="${x0}" y1="${y0}" x2="${W-6}" y2="${y0}" stroke="${GX_S}"/><line x1="${x0}" y1="14" x2="${x0}" y2="${y0}" stroke="${GX_S}"/>`, d=''; vals.forEach((v,i)=>{ const x=x0+i*sx, y=y0-v*sy; d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1); g+=`<circle cx="${x}" cy="${y}" r="3.5" fill="${gxQ}"/>`+gxT(x,y-7,v,10)+gxT(x,y0+14,names[i],10,'#4A2E14','middle',400); }); g+=`<path d="${d}" fill="none" stroke="${gxQ}" stroke-width="2"/>`; return cpSvg(g,W,140); }
/* 공·구슬 */
function gxBalls(groups){ let g='', k=0; const col={'빨간':'#E8574A','파란':'#4A90D9','노란':'#F2C230','흰':'#fff','검은':'#444','초록':'#5FB85F'}; const tot=groups.reduce((s,x)=>s+x[1],0); if(tot>20) return ''; const per=Math.min(tot,7); groups.forEach(([c,n])=>{ for(let i=0;i<n;i++,k++) g+=`<circle cx="${30+(k%per)*24}" cy="${32+Math.floor(k/per)*24}" r="10" fill="${col[c]||'#ccc'}" stroke="#4A2E14" stroke-width="1.4"/>`; }); const W=60+per*24, H=26+Math.ceil(tot/per)*24+14; return cpSvg(`<path d="M12,14 Q${W/2},-4 ${W-12},14 L${W-6},${H-8} Q${W/2},${H+6} 6,${H-8} Z" fill="#FFF8EC" stroke="${GX_S}" stroke-width="1.6"/>`+g,W,H,240); }
/* 그림그래프 큰·작은 그림 */
function gxPicto(big,small,bv,sv){ let g=''; for(let i=0;i<big;i++) g+=`<circle cx="${20+i*30}" cy="22" r="12" fill="#C98742" stroke="${GX_S}" stroke-width="1.5"/>`; for(let i=0;i<small;i++) g+=`<circle cx="${14+big*30+i*17}" cy="27" r="6.5" fill="#E9B373" stroke="${GX_S}" stroke-width="1.3"/>`; return cpSvg(g,Math.max(28+big*30+small*17,120),42,300); }
/* 이중 수직선 / 비례 표 */
function gxRatioTab(h1,r1,h2,r2){ return cpTable(r1,r2,h1,h2); }
/* 모눈 위 점 */
function gxDotGrid(cx,cy,n=6){ const u=22; let g=''; for(let i=0;i<=n;i++) g+=`<line x1="${6+i*u}" y1="6" x2="${6+i*u}" y2="${6+n*u}" stroke="#E5D3B5"/><line x1="6" y1="${6+i*u}" x2="${6+n*u}" y2="${6+i*u}" stroke="#E5D3B5"/>`; g+=`<circle cx="${6+(cx-0.5)*u}" cy="${6+(n-cy+0.5)*u}" r="7" fill="${gxQ}"/>`; return cpSvg(g,12+n*u,12+n*u,170); }
/* 시간·길이는 이어진 양이라 상자(블록)가 아니라 띠(시간 띠·줄자)에 나타낸다 (교수님 11/22, 시간 지도는 시계와 시간 띠가 기본).
   segs: [[작은 단위 값, 방향(+1 앞으로/-1 되돌아), 글자]] — 0에서 시작해 차례로 뛴다. 큰 단위마다 굵은 눈금과 이름. */
function gxTimeline(segs,big,small,per,{mark=null}={}){ let pos=0, mx=0; segs.forEach(([v,d])=>{ pos+=v*d; mx=Math.max(mx,pos); }); if(mark!=null) mx=Math.max(mx,mark); const nb=Math.max(1,Math.ceil(mx/per-1e-9)+(mx%per===0?0:0)); if(nb>9) return '';
  const hi=nb*per, W=320, x0=16, L=288, X=v=>x0+L*v/hi, y=58; const sub=[60].includes(per)?(nb<=4?6:2):per===24?(nb<=3?4:2):per===100||per===1000||per===10?(nb<=3?10:nb<=6?5:2):1;
  let g=`<line x1="${x0}" y1="${y}" x2="${x0+L}" y2="${y}" stroke="${GX_S}" stroke-width="2.2"/>`; for(let k=0;k<=nb*sub;k++){ const v=k*per/sub, maj=k%sub===0; g+=`<line x1="${X(v)}" y1="${y-(maj?9:5)}" x2="${X(v)}" y2="${y+(maj?9:5)}" stroke="${GX_S}" stroke-width="${maj?2:1}"/>`; if(maj) g+=gxT(X(v),y+23,k/sub===0?'0':`${k/sub}${big}`,nb>6?9:10.5); }
  pos=0; const cols=[gxQ,'#2F6FA8','#3F8F3F']; segs.forEach(([v,d,lab],i)=>{ const a=pos, b=pos+v*d, fw=d>0, h=Math.min(fw?34:16,Math.abs(X(b)-X(a))*0.5+8), col=cols[i%3];
    g+=`<path d="M${X(a)},${y-10} Q${(X(a)+X(b))/2},${y-10-h*2+ (fw?h:h)} ${X(b)},${y-10}" fill="none" stroke="${col}" stroke-width="2" ${fw?'':'stroke-dasharray="5 3"'}/>`+(fw?'':`<path d="M${X(b)},${y-10} l8,-6 l0,8 z" fill="${col}"/>`)+gxT((X(a)+X(b))/2,fw?y-14-h/2-2:y-16-h/2,lab+(fw?'':' 되돌아오기'),10,col); pos=b; });
  /* 호가 눈금 사이에서 끝나면 허공에서 끊긴 것처럼 보인다(교수님 11/22): 끝난 자리를 선 위에 점으로 찍고 ?로 표시 */
  if(mark==null&&pos>0&&pos<=hi){ const onMaj=Math.abs(pos/per-Math.round(pos/per))<1e-9; g+=`<line x1="${X(pos)}" y1="${y-10}" x2="${X(pos)}" y2="${y}" stroke="${gxQ}" stroke-width="1.5" stroke-dasharray="3 2"/><circle cx="${X(pos)}" cy="${y}" r="4.5" fill="${gxQ}"/>`+(onMaj?'':gxT(X(pos),y+23,'?',12,gxQ)); }
  if(mark!=null) g+=`<circle cx="${X(mark)}" cy="${y}" r="5" fill="${gxQ}"/>`+gxT(X(mark),y-14,`${mark}${small}`,10.5,gxQ);
  return cpSvg(g,W,y+30); }
/* 달력 줄: 1주일 = 7칸, 1년 = 12칸 */
function gxCalRows(n,rest,per,big,small){ if(n>6) return ''; const u=per===7?24:20, heads=per===7?['일','월','화','수','목','금','토']:Array.from({length:12},(_,i)=>`${i+1}`); let g=''; heads.forEach((h,j)=>g+=gxT(40+j*u+u/2,12,h,9,j===0&&per===7?'#D2477A':'#6B4A2A','middle',400));
  for(let r=0;r<n+(rest?1:0);r++){ const cnt=r<n?per:rest; for(let j=0;j<cnt;j++) g+=`<rect x="${40+j*u}" y="${18+r*(u+3)}" width="${u}" height="${u}" fill="${r<n?GX_F:'#CFE6F5'}" stroke="${GX_S}" stroke-width="1"/>`; g+=gxT(36,18+r*(u+3)+u/2+4,r<n?`${big==='주일'?'1주':'1년'}`:'',9.5,'#6B4A2A','end',400); } return cpSvg(g,46+per*u,22+(n+(rest?1:0))*(u+3),300); }
function gxPic(ep,t){ let m; const S=ep.slice(0,2), J=(n,x,y)=>/[136780]$/.test(String(n))?x:y;
  if(S==='S6'){
    /* 단위: 시간·길이는 띠, 주일·년은 달력 줄, 무게·들이는 1 kg 추·1 L 컵 상자 */ for(const [B,s,per] of GX_U){ const eb=B, es=s, ask=`(?:몇 ${es}|며칠)`, line=['시간','분','일','m','km','cm'].includes(B), cal=B==='주일'||B==='년'; let r;
      const comp=(n,rest)=>line?gxTimeline([...Array.from({length:n},()=>[per,1,`${per}${es}`]),...(rest?[[rest,1,`${rest}${es}`]]:[])],B,s,per):cal?gxCalRows(n,rest,per,B,s):gxUnits(n,rest,B,s,per);
      if((r=t.match(new RegExp(`^(\\d+) ?${eb} (\\d+) ?${es}[은는] (?:모두 )?${ask}`)))){ const u=comp(+r[1],+r[2]); if(u) return cpWrap(u,`1${B} = ${per}${s}`); }
      if((r=t.match(new RegExp(`^(\\d+) ?${eb}[은는] (?:모두 )?${ask}`)))){ const u=comp(+r[1],0); if(u) return cpWrap(u,`1${B} = ${per}${s}`); }
      if((r=t.match(new RegExp(`^(\\d+) ?${es}[은는] 몇 ?${eb}`)))&&+r[1]/per<=9&&+r[1]>=per){ const u=line?gxTimeline([],B,s,per,{mark:+r[1]}):''; if(u) return cpWrap(u,`1${B} = ${per}${s}`);
        const n=Math.floor(+r[1]/per), hi=(n+1)*per, tp=[12,7].includes(per)?(per===7?7:4):(n<3?10:n<7?5:2), ln=cpLine(0,hi,per/tp,[[+r[1],`${r[1]} ${s}`]]); if(ln) return cpWrap(ln.replace(/<text[^>]*font-size="11"[^>]*fill="#4A2E14">(\d+)<\/text>/g,(a,v)=>+v%per===0?a:''),`1 ${B} = ${per} ${s}`); }
      if((r=t.match(new RegExp(`^(\\d+) ?${eb} (\\d+) ?${es} ([+−]) (\\d+) ?${eb} (\\d+) ?${es}`)))){ if(line){ const a=+r[1]*per+ +r[2], b=+r[4]*per+ +r[5], u=gxTimeline([[a,1,`${r[1]}${B} ${r[2]}${s}`],[b,r[3]==='+'?1:-1,`${r[4]}${B} ${r[5]}${s}`]],B,s,per); if(u) return cpWrap(u,r[3]==='+'?'이어서 더 가요':'간 만큼에서 되돌아와요'); } else { const u1=gxUnits(+r[1],+r[2],B,s,per), u2=gxUnits(+r[4],+r[5],B,s,per); if(u1&&u2) return cpWrap(cpCol(u1,cpOp(r[3]),u2)); } }
      if((r=t.match(new RegExp(`^(\\d+) ?${eb} (\\d+) ?${es} − (\\d+) ?${es}`)))){ if(line){ const u=gxTimeline([[+r[1]*per+ +r[2],1,`${r[1]}${B} ${r[2]}${s}`],[+r[3],-1,`${r[3]}${s}`]],B,s,per); if(u) return cpWrap(u,'간 만큼에서 되돌아와요'); } else { const u1=gxUnits(+r[1],+r[2],B,s,per); if(u1) return cpWrap(cpCol(u1,`<span>${cpOp('−')} ${r[3]} ${s}</span>`)); } } }
    /* 시각에서 몇 분 뒤·전: 시계 + 시간 띠 */ if((m=t.match(/(\d+)시 (\d+)분에서 (\d+)분 (뒤|전)/))){ const h=+m[1], mi=+m[2], d=+m[3], fw=m[4]==='뒤', h0=fw?h:(mi-d<0?h-1:h), x0=16, L=288, X=v=>x0+L*v/120, y=52; let g=`<line x1="${x0}" y1="${y}" x2="${x0+L}" y2="${y}" stroke="${GX_S}" stroke-width="2.2"/>`;
      for(let k=0;k<=12;k++){ const maj=k%6===0; g+=`<line x1="${X(k*10)}" y1="${y-(maj?9:5)}" x2="${X(k*10)}" y2="${y+(maj?9:5)}" stroke="${GX_S}" stroke-width="${maj?2:1}"/>`; if(maj) g+=gxT(X(k*10),y+23,`${h0+k/6}시`,10.5); }
      const a=(h-h0)*60+mi, b=a+(fw?d:-d); g+=`<circle cx="${X(a)}" cy="${y}" r="5" fill="${gxQ}"/>`+gxT(X(a),y+23+13,`${h}시 ${mi}분`,10,gxQ)+`<path d="M${X(a)},${y-10} Q${(X(a)+X(b))/2},${y-40} ${X(b)},${y-10}" fill="none" stroke="#2F6FA8" stroke-width="2"/><path d="M${X(b)},${y-10} l${fw?-7:7},-2 l${fw?3:-3},7 z" fill="#2F6FA8"/>`+gxT((X(a)+X(b))/2,y-30,`${d}분 ${m[4]}`,10.5,'#2F6FA8');
      return cpWrap(cpRow(gxClock(h,mi))+cpSvg(g,320,y+42),`작은 눈금 한 칸 = 10분`); }
    if(/^직사각형에는 직각이 몇 개|^정사각형에서 평행한 변은 몇 쌍|^직사각형에서 서로 수직인 변은 몇 쌍/.test(t)) return cpWrap(gxRect(/정사각형/.test(t)?1:1.6,1,{sq:/정사각형/.test(t)}));
    if(/^직각삼각형에는 직각이 몇 개/.test(t)) return cpWrap(gxTri(90,35,[]));
    if(/^사다리꼴에서 평행한 변은 몇 쌍/.test(t)) return cpWrap(gxTrap('','',''));
    if(/한 원에서 지름은 반지름의 몇 배/.test(t)) return cpWrap(gxCircle({d:'지름',r:'반지름'}));
    if((m=t.match(/오전 (\d+)시부터 오후 (\d+)시까지/))) return cpWrap(gxDay(+m[1],+m[2]+12),'하루 24시간');
    /* 각도 */ if((m=t.match(/^(\d+)° ([+−]) (\d+)°/))) return cpWrap(cpRow(gxAngle(+m[1],m[1]+'°'),cpOp(m[2]),gxAngle(+m[3],m[3]+'°')));
    if((m=t.match(/삼각형의 두 각이 (\d+)°, (\d+)°/))||(m=t.match(/두 각이 (\d+)°, (\d+)°인 삼각형/))) return cpWrap(gxTri(+m[1],+m[2],[m[1]+'°',m[2]+'°','?']));
    if((m=t.match(/세 각이 (\d+)°, (\d+)°, (\d+)°인 삼각형/))) return cpWrap(gxTri(+m[2],+m[3],[m[2]+'°',m[3]+'°',m[1]+'°']));
    if((m=t.match(/직각삼각형의 한 각이 (\d+)°/))) return cpWrap(gxTri(90,+m[1],['90°',m[1]+'°','?']));
    if((m=t.match(/두 밑각이 각각 (\d+)°/))) return cpWrap(gxTri(+m[1],+m[1],[m[1]+'°',m[1]+'°','?']));
    if((m=t.match(/꼭지각이 (\d+)°/))){ const b=(180-+m[1])/2; return cpWrap(gxTri(b,b,['?','?',m[1]+'°']),'이등변삼각형'); }
    if((m=t.match(/사각형의 세 각이 (\d+)°, (\d+)°, (\d+)°/))) return cpWrap(gxQuad([m[1]+'°',m[2]+'°',m[3]+'°','?']));
    if(!/삼각형 가와/.test(t)&&(m=t.match(/세 변이 (\d+) cm, (\d+) cm, (\d+) cm인 삼각형/))){ const a=+m[1], b=+m[2], c=+m[3]; const pic=gxTriSides(b,c,a); return pic?cpWrap(pic,`세 변: ${a} cm, ${b} cm, ${c} cm`):''; }
    if((m=t.match(/한 변이 (\d+) cm인 정삼각형/))) return cpWrap(gxTri(60,60,[]),`정삼각형, 한 변 ${m[1]} cm`);
    /* 원 */ if((m=t.match(/지름이 (\d+) cm인 원의 반지름/))) return cpWrap(gxCircle({d:m[1]+' cm',r:'?'}));
    if((m=t.match(/지름이 (\d+) cm인 원을 그리려면 컴퍼스/))) return cpWrap(gxCircle({d:m[1]+' cm',r:'?'}),'컴퍼스를 벌린 길이 = 반지름');
    if((m=t.match(/선분이 (\d+) cm예요\. 원/))) return cpWrap(gxCircle({r:m[1]+' cm',d:'?'}));
    if((m=t.match(/원주가 ([\d.]+) cm인 원의 지름/))) return cpWrap(gxCircle({d:'?'}),`원주(둘레) ${m[1]} cm`);
    if((m=t.match(/반지름이 (\d+) cm인 원의 넓이/))) return cpWrap(gxCircle({r:m[1]+' cm'}));
    if((m=t.match(/반지름 (\d+) cm인 원 (\d)개를 한 줄로 맞닿게/))){ const n=+m[2]; let g=''; for(let i=0;i<n;i++) g+=`<circle cx="${40+i*68}" cy="42" r="34" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><circle cx="${40+i*68}" cy="42" r="2" fill="${GX_S}"/><line x1="${40+i*68}" y1="42" x2="${74+i*68}" y2="42" stroke="#2F6FA8" stroke-width="1.6"/>`; return cpWrap(cpSvg(g+gxT(57,37,m[1]+' cm',10,'#2F6FA8'),12+n*68+2,86)); }
    /* 직사각형·정사각형 */ if((m=t.match(/한 변이 (\d+) cm인 정사각형의 네 변/))) return cpWrap(gxRect(1,1,{sq:true,wl:m[1]+' cm',hl:m[1]+' cm'}));
    if((m=t.match(/넓이가 (\d+) cm², 가로가 (\d+) cm인 직사각형의 세로/))) return cpWrap(gxRect(+m[2],+m[1]/+m[2],{wl:m[2]+' cm',hl:'?',inl:`넓이 ${m[1]} cm²`}));
    if((m=t.match(/^가로 (\d+) (m|cm), 세로 (\d+) (?:m|cm)인 (?:땅|거실 바닥|직사각형 돗자리)/))) return cpWrap(gxRect(+m[1],+m[3],{wl:`${m[1]} ${m[2]}`,hl:`${m[3]} ${m[2]}`}));
    if((m=t.match(/^(\d+) m²[는은] 몇 cm²/))||/한 변이 1 m인 정사각형 안에 한 변이 1 cm인/.test(t)) return cpWrap(gxRect(1,1,{sq:true,wl:'1 m = 100 cm',hl:'100 cm',inl:'1 m²'}),m?`이런 정사각형이 ${m[1]}개`:'');
    if((m=t.match(/넓이가 (\d+) cm²이고 밑변이 (\d+) cm인 평행사변형/))) return cpWrap(gxPara(m[2]+' cm','?'),`넓이 ${m[1]} cm²`);
    if((m=t.match(/넓이가 (\d+) cm²이고 밑변이 (\d+) cm인 삼각형/))) return cpWrap(gxTriArea(m[2]+' cm','?'),`넓이 ${m[1]} cm²`);
    if((m=t.match(/밑변이 (\d+) cm, 높이가 (\d+) cm이고 나머지 두 변/))) return cpWrap(gxTriArea(m[1]+' cm',m[2]+' cm'));
    if((m=t.match(/밑변이 (\d+) cm, 옆의 변이 (\d+) cm이고 높이가 (\d+) cm인 평행사변형/))) return cpWrap(gxPara(m[1]+' cm',m[3]+' cm'),`옆의 변 ${m[2]} cm`);
    if((m=t.match(/넓이가 (\d+) cm²이고 한 대각선이 (\d+) cm인 마름모/))) return cpWrap(gxRhom(m[2]+' cm','?'),`넓이 ${m[1]} cm²`);
    if((m=t.match(/두 대각선이 (\d+) cm, (\d+) cm인 마름모/))) return cpWrap(gxRhom(m[2]+' cm',m[1]+' cm'));
    if((m=t.match(/윗변 (\d+) cm, 아랫변 (\d+) cm, 높이 (\d+) cm인 사다리꼴/))) return cpWrap(gxTrap(m[1]+' cm',m[2]+' cm',m[3]+' cm'));
    if((m=t.match(/윗변 (\d+) cm, 아랫변 (\d+) cm인 사다리꼴의 넓이가 (\d+)/))) return cpWrap(gxTrap(m[1]+' cm',m[2]+' cm','?'),`넓이 ${m[3]} cm²`);
    /* 입체 */ if((m=t.match(/한 모서리가 (\d+) cm인 정육면체의 (겉넓이|부피)/))) return cpWrap(gxBox(m[1]+' cm',m[1]+' cm',m[1]+' cm',true));
    if((m=t.match(/가로 (\d+) (c?m), 세로 (\d+) c?m, 높이 (\d+) c?m인 직육면체/))) return cpWrap(gxBox(`${m[1]} ${m[2]}`,`${m[3]} ${m[2]}`,`${m[4]} ${m[2]}`,false));
    if((m=t.match(/^(\d+) m³[는은] 몇 cm³/))) return cpWrap(gxBox('1 m = 100 cm','100 cm','100 cm',true),`1 m³ 상자가 ${m[1]}개`);
    if((m=t.match(/가로 (\d+)개, 세로 (\d+)개, (\d+)층 쌓았/))&&+m[1]<=3&&+m[2]<=3&&+m[3]<=4){ try{ const H=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>r>=3-+m[2]&&c<+m[1]?+m[3]:0)); return cpWrap(`<div style="width:170px">${skIsoSvg(H,{s:20,front:false})}</div>`); }catch(e){} }
    /* 다각형 */ if((m=t.match(/(삼각형|사각형|오각형|육각형)[과와] (삼각형|사각형|오각형|육각형)의 변은 모두/))){ const N={삼각형:3,사각형:4,오각형:5,육각형:6}; return cpWrap(cpRow(gxPoly(N[m[1]]),gxPoly(N[m[2]]))); }
    if((m=t.match(/삼각형 (\d)개, 사각형 (\d)개/))&&+m[1]+ +m[2]<=5) return cpWrap(cpRow(...Array.from({length:+m[1]},()=>gxPoly(3,{r:34})),...Array.from({length:+m[2]},()=>gxPoly(4,{r:34}))));
    if((m=t.match(/(오|육|칠|팔)각형의 한 꼭짓점에서 그을 수 있는 대각선/))) return cpWrap(gxPoly({오:5,육:6,칠:7,팔:8}[m[1]],{diagFrom:0}),'주황 점에서 그을 수 있는 대각선');
    /* 점의 이동 */ if((m=t.match(/점이 왼쪽에서 (\d)번째, 아래에서 (\d)번째 칸/))) return cpWrap(gxDotGrid(+m[1],+m[2],Math.max(6,+m[1]+3)));
    if((m=t.match(/직선 가와 나 사이 (\d+) cm, 나와 다 사이 (\d+) cm/))){ const a=+m[1], b=+m[2], u=60/Math.max(a,b), y1=16, y2=y1+a*u, y3=y2+b*u; return cpWrap(cpSvg([['가',y1],['나',y2],['다',y3]].map(([n,y])=>`<line x1="24" y1="${y}" x2="230" y2="${y}" stroke="${GX_S}" stroke-width="2"/>`+gxT(12,y+4,n,12)).join('')+`<line x1="120" y1="${y1}" x2="120" y2="${y2}" stroke="#2F6FA8" stroke-dasharray="4 3"/>`+gxT(128,(y1+y2)/2+4,a+' cm',10.5,'#2F6FA8','start')+`<line x1="170" y1="${y2}" x2="170" y2="${y3}" stroke="#3F8F3F" stroke-dasharray="4 3"/>`+gxT(178,(y2+y3)/2+4,b+' cm',10.5,'#3F8F3F','start'),240,y3+16)); }
    if((m=t.match(/대칭축에서 (\d+) cm 떨어져/))) return cpWrap(cpSvg(`<line x1="120" y1="8" x2="120" y2="92" stroke="${gxQ}" stroke-width="2" stroke-dasharray="6 4"/>`+gxT(120,104,'대칭축',10,gxQ)+`<circle cx="50" cy="50" r="5" fill="${GX_S}"/>`+gxT(50,40,'ㄱ',12)+`<line x1="50" y1="50" x2="120" y2="50" stroke="#2F6FA8" stroke-dasharray="4 3"/>`+gxT(85,64,m[1]+' cm',10.5,'#2F6FA8')+`<circle cx="190" cy="50" r="5" fill="#fff" stroke="${GX_S}" stroke-width="2"/>`+gxT(190,40,'대응점',10)+`<line x1="120" y1="50" x2="190" y2="50" stroke="#2F6FA8" stroke-dasharray="4 3"/>`+gxT(155,64,'?',12,gxQ),240,110));
    if((m=t.match(/대칭의 중심에서 (\d+) cm 떨어져/))) return cpWrap(cpSvg(`<circle cx="120" cy="50" r="4" fill="${gxQ}"/>`+gxT(120,38,'대칭의 중심',10,gxQ)+`<circle cx="50" cy="70" r="5" fill="${GX_S}"/>`+gxT(42,62,'ㄱ',12)+`<line x1="50" y1="70" x2="190" y2="30" stroke="#2F6FA8" stroke-dasharray="4 3"/>`+gxT(82,76,m[1]+' cm',10.5,'#2F6FA8')+`<circle cx="190" cy="30" r="5" fill="#fff" stroke="${GX_S}" stroke-width="2"/>`+gxT(196,22,'대응점',10)+gxT(158,54,'?',12,gxQ),240,92));
    return ''; }
  if(S==='S5'){
    if((m=t.match(/((?:\d+|□)(?:, (?:\d+|□)){3,6})/))&&!/평균|가 모둠/.test(t)&&/^S5-0[35678]$/.test(ep)){ const it=m[1].split(', '); if(/다음(?:에 올)? 수/.test(t)) it.push('?'); return cpWrap(gxSeq(it)); }
    if((m=t.match(/^(\d+) ([+−×]) (\d+) = (□|\d+) ([+−×]) (□|\d+)/))&&/[+]/.test(m[2])&&m[5]==='+') return cpWrap(gxBalance([m[1],m[3]],[m[4],m[6]]),'양쪽이 같아야 저울이 수평이에요');
    if((m=t.match(/(\d+)시간에 (\d+) km를 갔어요/))||(m=t.match(/(\d+) km를 (\d+)시간 동안/))){ const h=/시간에/.test(m[0])?+m[1]:+m[2], km=/시간에/.test(m[0])?+m[2]:+m[1]; return cpWrap(cpTable(['1',String(h)],['?',String(km)],'시간','km')); }
    if((m=t.match(/넓이 (\d+) km²에 (\d+)명/))) return cpWrap(cpTable(['1',m[1]],['?',m[2]],'km²','명'));
    if((m=t.match(/털실 (\d+) m가 (\d+)원이면 (\d+) m/))) return cpWrap(cpTable([m[1],m[3]],[m[2],'?'],'m','원'));
    if((m=t.match(/(\d+)분에 (\d+) L가 나오는 수도에서 (\d+)분/))) return cpWrap(cpTable([m[1],m[3]],[m[2],'?'],'분','L'));
    if((m=t.match(/페인트 (\d+) L로 벽 (\d+) m²를 칠해요\. 같은 비율로 벽 (\d+) m²/))) return cpWrap(cpTable([m[1],'?'],[m[2],m[3]],'L','m²'));
    if((m=t.match(/^(\d+|□) : (\d+|□) = (\d+|□) : (\d+|□)/))) return cpWrap(cpTable([m[1],m[3]],[m[2],m[4]],'전항','후항'),'비율이 같은 두 비');
    if((m=t.match(/(\d+)원짜리(?: 물건| 장난감)?[을를] (\d+)% 할인/))){ const p=+m[2]; return cpWrap(bandSvg([{n:'할인',p,lab:`${p}%`,hi:1},{n:'내는 돈',p:100-p,lab:'?원'}],{cap:`처음 값 ${m[1]}원 = 100%`})); }
    if((m=t.match(/(소금|설탕) (\d+) g을 물 (\d+) g에/))){ const a=+m[2], b=+m[3], p=Math.round(100*a/(a+b)); return cpWrap(bandSvg([{n:m[1],p,lab:`${a} g`,hi:1},{n:'물',p:100-p,lab:`${b} g`}],{ruler:false,cap:`${m[1]}물 전체 = ${m[1]} + 물`})); }
    if((m=t.match(/(\d+)명 (?:중|가운데) (\d+)명/))&&+m[1]<=50&&[10,20,25,50].includes(+m[1])){ const N=+m[1], k=+m[2]; let g=''; const per=N<=25?5:10; for(let i=0;i<N;i++) g+=`<circle cx="${12+(i%per)*20}" cy="${12+Math.floor(i/per)*20}" r="8" fill="${i<k?'#F2A65A':'#fff'}" stroke="${GX_S}" stroke-width="1.3"/>`; return cpWrap(cpSvg(g,per*20+6,Math.ceil(N/per)*20+6,220),`${N}명 중 색칠한 ${k}명`); }
    if((m=t.match(/남학생 (\d+)명, 여학생 (\d+)명/))) return cpWrap(gxBars([+m[1],+m[2]],['남학생','여학생']));
    if((m=t.match(/빨간 구슬 (\d+)개, 파란 구슬 (\d+)개/))) return cpWrap(gxBalls([['빨간',+m[1]],['파란',+m[2]]]));
    if((m=t.match(/동생이 (\d+)살일 때 형은 (\d+)살, 동생이 (\d+)살일 때 형은 (\d+)살/))) return cpWrap(cpTable([m[1],m[3],'…'],[m[2],m[4],'…'],'동생','형'));
    if((m=t.match(/□ = (\d+) → △ = (\d+), □ = (\d+) → △ = (\d+), □ = (\d+) → △ = (\d+)/))) return cpWrap(cpTable([m[1],m[3],m[5],'…'],[m[2],m[4],m[6],'…']),'대응표');
    return ''; }
  if(S==='S4'){
    if(/평균|고르게/.test(t)&&(m=t.match(/(\d+(?:[개층쪽권회점송이]*)?(?:, \d+[개층쪽권회점송이]*){1,5})/))&&!/모둠/.test(t)){ const v=m[1].split(', ').map(x=>parseInt(x)); return cpWrap(gxTowers(v),/고르게/.test(t)?'높은 곳에서 낮은 곳으로 옮겨 고르게':'자료를 막대로 나타냈어요'); }
    if((m=t.match(/가 모둠 ([\d, ]+) \/ 나 모둠 ([\d, ]+)\./))){ const a=m[1].split(', ').map(Number), b=m[2].split(', ').map(Number); return cpWrap(cpRow(cpCol(gxBars(a),'<span style="font-size:.85rem">가 모둠</span>'),cpCol(gxBars(b),'<span style="font-size:.85rem">나 모둠</span>'))); }
    if((m=t.match(/(빨간|파란|노란|흰|검은) (?:공|구슬|바둑돌) (\d+)개, (빨간|파란|노란|흰|검은) (?:공|구슬|바둑돌) (\d+)개/))) return cpWrap(gxBalls([[m[1],+m[2]],[m[3],+m[4]]]));
    if((m=t.match(/(빨간|파란|노란|흰|검은) (?:공|구슬|바둑돌)만 (\d+)개/))) return cpWrap(gxBalls([[m[1],+m[2]]]));
    if((m=t.match(/(빨간|파란|노란|흰|검은) (?:공|구슬|바둑돌)만 든/))) return cpWrap(gxBalls([[m[1],6]]));
    if((m=t.match(/당첨 (\d+)장, 꽝 (\d+)장/))){ let g=''; const n=+m[1]+ +m[2]; for(let i=0;i<n;i++) g+=`<rect x="${6+i*27}" y="6" width="23" height="32" rx="4" fill="${i<+m[1]?'#FFE08A':'#eee'}" stroke="${GX_S}"/>`+gxT(17.5+i*27,27,i<+m[1]?'당첨':'꽝',8.5); return cpWrap(cpSvg(g,12+n*27,44,300)); }
    if((m=t.match(/큰 (?:그림|동그라미)[은는] (\d+)[개명], 작은 (?:그림|동그라미)[은는] (\d+)[개명][^.]*\. 큰 (?:그림|동그라미) (\d+)개와 작은 (?:그림|동그라미) (\d+)개/))) return cpWrap(gxPicto(+m[3],+m[4]),`큰 것 = ${m[1]}, 작은 것 = ${m[2]}`);
    if((m=t.match(/눈금 한 칸이 (\d+)(명|권)[^.]*막대가 (\d+)칸/))) return cpWrap(gxBarGrid([+m[3]],`한 칸 ${m[1]}${m[2]}`));
    if((m=t.match(/작은 눈금 (\d+)칸이 (\d+)명이에요\. 작은 눈금 (\d+)칸/))) return cpWrap(gxBarGrid([+m[3]],`${m[1]}칸 = ${m[2]}명`));
    if((m=t.match(/눈금 한 칸이 (\d+)권인 막대그래프에서 (\S+)[은는] (\d+)칸, (\S+)[은는] (\d+)칸, (\S+)[은는] (\d+)칸/))) return cpWrap(gxBarGrid([+m[3],+m[5],+m[7]],`한 칸 ${m[1]}권`,[m[2],m[4],m[6]]));
    if((m=t.match(/((?:\d+[일월시] \d+ ?(?:도|cm)(?:, )?){3,6})/))){ const it=[...m[1].matchAll(/(\d+[일월시]) (\d+)/g)]; return cpWrap(gxLine(it.map(x=>+x[2]),it.map(x=>x[1]))); }
    if((m=t.match(/([가-힣]+) (\d+)명, ([가-힣]+) (\d+)명, ([가-힣]+) (\d+)명/))) return cpWrap(cpTable([m[1],m[3],m[5]],[m[2],m[4],m[6]],'과일','학생 수'),'표');
    if((m=t.match(/(\d+)명 중 (\d+)명은 몇 %/))&&[10,20,25,50].includes(+m[1])){ const N=+m[1], k=+m[2], per=N<=25?5:10; let g=''; for(let i=0;i<N;i++) g+=`<circle cx="${12+(i%per)*20}" cy="${12+Math.floor(i/per)*20}" r="8" fill="${i<k?'#F2A65A':'#fff'}" stroke="${GX_S}" stroke-width="1.3"/>`; return cpWrap(cpSvg(g,per*20+6,Math.ceil(N/per)*20+6,220),`${N}명 중 색칠한 ${k}명`); }
    return ''; }
  return ''; }
{ const _cp=cpPic; cpPic=function(ep,t){ if(/^S[456]-/.test(ep)){ if(/어떤 그래프|알맞은 그래프|까닭|뜻은|읽을까요|무엇이라|어떤 선분|이름|옳은|알맞은 말/.test(t)) return ''; let r=''; try{ r=gxPic(ep,t); }catch(e){ r=''; } if(r&&!/<div class="cpa"[^>]*><\/div>|<div class="cpa"[^>]*><div style="font-size/.test(r)) return r; } return _cp(ep,t); }; }
window._gxPic=gxPic;


// ===== 3-53. 도전 문장제: 영역별 복합 개념 문장제 (교수님 11/22) =====
// 난이도 '상'은 임시 표시다. 나중에는 통계(자주 틀리는 문제, 여러 개념이 겹친 문제)로 어려운 문제를 가린다.
// 그래서 문제마다 겹친 개념(kcs)을 적어 두고, 푼 횟수·첫 시도 정답 수를 따로 모은다(localStorage kt_hq → 교사용에서 볼 수 있게).
// 정규 편(G36)에는 넣지 않고 '도전 문장제' 모드에서만 낸다. 1~2학년 수와 연산은 지식추적 대상(S편)이 아니라 기록에서 뺀다(_kt).
const HQ=[];
const hq=(id,grades,dom,ep,kcs,gen,nokt)=>HQ.push({id,grades,dom,ep,kcs,nokt,gen});
const hqR=(a,b)=>rnd(a,b), hqP=(...a)=>rndPick(...a);
/* ---- 1~2학년 ---- */
hq('H1N1',[1,2],'수와 연산','S5-03',['덧셈','뺄셈','세 수 계산'],()=>{ const a=hqR(11,18), b=hqR(3,8), c=hqR(2,7); return WM(`버스에 ${a}명이 타고 있었어요. 이번 정류장에서 ${b}명이 내리고 ${c}명이 탔어요. 지금 버스에 탄 사람은 몇 명일까요?`,'',a-b+c,[[a-b,'N1-12'],[a-b-c,null],[a+b+c,null]],'','명'); },1);
hq('H1N2',[1,2],'수와 연산','S5-03',['뺄셈(비교)','덧셈'],()=>{ const a=hqR(6,9), d=hqR(2,5); return WM(`도토는 도토리를 ${a}개 주웠어요. 람이는 도토보다 ${d}개 더 많이 주웠어요. 두 친구가 주운 도토리는 모두 몇 개일까요?`,'',a+a+d,[[a+d,'N1-12'],[a+a-d,'N1-13'],[a+d+d,null]],'','개'); },1);
hq('H1N3',[2],'수와 연산','S5-03',['곱셈구구','덧셈'],()=>{ const a=hqR(2,5), b=hqR(3,6), c=hqR(2,9); return WM(`한 봉지에 ${a}개씩 든 사탕이 ${b}봉지 있고, 낱개로 ${c}개가 더 있어요. 사탕은 모두 몇 개일까요?`,'',a*b+c,[[a*b,'N1-12'],[a+b+c,'N2-10'],[a*(b+1)+c,'N2-09']],'','개'); },1);
hq('H1N4',[2],'수와 연산','S5-03',['두 자리 수 뺄셈','모르는 수'],()=>{ const t=hqR(42,60), a=hqR(13,19), b=hqR(11,17); return WM(`색종이가 ${t}장 있었어요. 종이학을 접는 데 ${a}장, 비행기를 접는 데 ${b}장을 썼어요. 남은 색종이는 몇 장일까요?`,'',t-a-b,[[t-a,'N1-12'],[a+b,'N1-08'],[t-a+b,null]],'','장'); },1);
hq('H1R1',[1,2],'변화와 관계','S5-05',['규칙 찾기','덧셈'],()=>{ const s=hqR(2,6), d=hqR(3,5); return WM(`도토리를 첫째 날 ${s}개, 둘째 날 ${s+d}개, 셋째 날 ${s+2*d}개 주웠어요. 이 규칙대로라면 다섯째 날에는 몇 개를 주울까요?`,'',s+4*d,[[s+3*d,'N1-07'],[s+2*d+1,'R1-04'],[s+5*d,'N1-07']],'','개'); });
hq('H1R2',[2],'변화와 관계','S5-05',['규칙 찾기','반복'],()=>{ const n=hqP(11,14,17,20); const pat=['빨강','파랑','파랑']; return MC(`구슬을 빨강, 파랑, 파랑, 빨강, 파랑, 파랑… 순서로 꿰고 있어요. ${n}번째 구슬은 무슨 색일까요?`,'',pat[(n-1)%3],[[pat[n%3]===pat[(n-1)%3]?'노랑':pat[n%3],'R1-02'],['노랑',null]]); });
hq('H1R3',[2],'변화와 관계','S5-03',['수 배열표','규칙'],()=>{ const a=hqR(12,36), k=hqR(2,4); return WM(`1부터 100까지 적힌 수 배열표에서 ${a}에서 아래로 ${k}칸, 오른쪽으로 2칸 간 곳의 수는 무엇일까요?`,'',a+10*k+2,[[a+k+2,'R1-03'],[a+10*k,null],[a+k+20,'R1-03']]); });
hq('H1G1',[1,2],'도형과 측정','S6-11',['시각','시간'],()=>{ const h=hqR(1,3), m=hqP(30,40), d=hqP(40,50); const tot=m+d; return MC(`${h}시 ${m}분에 놀이터에 가서 ${d}분 동안 놀았어요. 놀이를 마친 시각은?`,'',`${h+Math.floor(tot/60)}시 ${tot%60?tot%60+'분':''}`.trim(),[[`${h}시 ${tot}분`,'G2-17'],[`${h+1}시 ${tot-50}분`,'G2-03'],[`${h+2}시 ${tot%60}분`,null]]); });
hq('H1G2',[2],'도형과 측정','S6-15',['길이의 합','m와 cm'],()=>{ const a=hqR(1,2), b=hqP(60,70,80), c=hqP(50,60,70,90); const tot=a*100+b+c; return MC(`리본을 ${a} m ${b} cm 쓰고, 이어서 ${c} cm를 더 썼어요. 쓴 리본은 모두 몇 m 몇 cm일까요?`,'',`${Math.floor(tot/100)} m ${tot%100} cm`,[[`${a} m ${b+c} cm`,'G2-17'],[`${Math.floor(tot/100)+1} m ${tot%100} cm`,null],[`${Math.floor(tot/100)} m ${tot%100+10} cm`,null]]); });
hq('H1G3',[1,2],'도형과 측정','S6-04',['도형의 변','덧셈'],()=>{ const a=hqR(2,4), b=hqR(2,3); return WM(`삼각형 ${a}개와 사각형 ${b}개를 그렸어요. 변은 모두 몇 개일까요?`,'',3*a+4*b,[[a+b,'N1-12'],[3*a+3*b,'G1-02'],[4*a+3*b,'G1-02']],'','개'); });
hq('H1D1',[2],'자료와 가능성','S4-06',['표','합계','뺄셈'],()=>{ const a=hqR(5,9), b=hqR(3,7), c=hqR(4,8), t=a+b+c; return WM(`좋아하는 과일을 조사했더니 사과 ${a}명, 포도 ${b}명, 나머지는 모두 귤이에요. 조사한 학생이 ${t}명이라면 귤을 좋아하는 학생은 몇 명일까요?`,'',c,[[t,'D1-02'],[t-a,'N1-12'],[a+b,'N1-08']],'','명'); });
hq('H1D2',[2],'자료와 가능성','S4-05',['그래프 읽기','차'],()=>{ const v=shuffle([hqR(2,4),hqR(5,7),hqR(8,9)]); const mx=Math.max(...v), mn=Math.min(...v); return WM(`○ 하나가 1명인 그래프에 사과 ○ ${v[0]}개, 포도 ○ ${v[1]}개, 귤 ○ ${v[2]}개가 그려져 있어요. 가장 많은 것과 가장 적은 것의 차이는 몇 명일까요?`,'',mx-mn,[[mx,'N1-08'],[mx+mn,null],[v[0]+v[1]+v[2],'D1-02']],'','명'); });
/* ---- 3~4학년 ---- */
hq('H3N1',[3],'수와 연산','S2-05',['세 자리 수 뺄셈','덧셈','두 단계'],()=>{ const a=hqR(520,880), b=hqR(135,290), c=hqR(108,190); return WM(`도서관에 책이 ${a}권 있었어요. 오전에 ${b}권을 빌려 갔고, 오후에 ${c}권이 돌아왔어요. 지금 도서관에 있는 책은 몇 권일까요?`,'',a-b+c,[[a-b,'N1-12'],[a-b-c,null],[a+b+c,null]],'','권'); });
hq('H3N2',[3],'수와 연산','S2-11',['나눗셈','곱셈','두 단계'],()=>{ const per=hqR(3,6), k=hqR(4,8), boxes=hqR(2,4)*per; return WM(`쿠키를 한 판에 ${k}개씩 ${boxes}판 구웠어요. 이 쿠키를 ${per}명이 똑같이 나누어 가지면 한 명이 몇 개씩 가질까요?`,'',k*boxes/per,[[k*boxes,'N1-12'],[boxes/per,null],[k*boxes-per,null]],'','개'); });
hq('H3N3',[3,4],'수와 연산','S3-29',['나머지의 해석','나눗셈'],()=>{ const b=hqR(6,9), q=hqR(4,8), r=hqR(1,b-1), n=b*q+r; return WM(`학생 ${n}명이 한 번에 ${b}명씩 탈 수 있는 보트를 타요. 모두 타려면 보트는 적어도 몇 번 운행해야 할까요?`,'',q+1,[[q,'N4-12'],[r,'N4-16'],[q+2,null]],'','번'); });
hq('H3N4',[3],'수와 연산','S3-35',['전체의 분수','뺄셈'],()=>{ const d=hqP(3,4,5,6), n=hqR(1,d-2), N=d*hqR(3,6); return WM(`사탕 ${N}개 가운데 ${d}분의 ${n}을 동생에게 주었어요. 남은 사탕은 몇 개일까요?`,'',N-N/d*n,[[N/d*n,'N1-08'],[N/d,'N3-39'],[N-n,'N3-26']],'','개'); });
hq('H3N5',[4],'수와 연산','S3-45',['곱셈','뺄셈','두 단계'],()=>{ const p=hqP(350,450,650,850), n=hqR(12,24), pay=Math.ceil(p*n/10000)*10000; return WM(`한 개에 ${p}원인 지우개를 ${n}개 사고 ${pay}원을 냈어요. 거스름돈은 얼마일까요?`,'',pay-p*n,[[p*n,'N1-08'],[pay-p,'N1-12']],'','원'); });
hq('H3N6',[4],'수와 연산','S3-48',['나눗셈','나머지','곱셈'],()=>{ const b=hqP(12,15,16,24), q=hqR(11,19), r=hqR(1,b-1), n=b*q+r; return WM(`공책 ${n}권을 한 상자에 ${b}권씩 담아 팔려고 해요. 상자에 담아 팔 수 있는 공책은 모두 몇 권일까요?`,'',b*q,[[q,'N4-12'],[r,'N4-16'],[n,null]],'','권'); });
hq('H3N7',[4],'수와 연산','S3-61',['소수의 덧셈','소수의 뺄셈'],()=>{ const a=hqR(31,48)/10, b=hqR(12,19)/10, c=hqR(105,145)/100, ans=+(a-b-c).toFixed(2); return MC(`길이가 ${a} m인 끈에서 ${b} m를 잘라 쓰고, 다시 ${c} m를 잘라 썼어요. 남은 끈은 몇 m일까요?`,'',`${ans} m`,[[`${+(a-b).toFixed(2)} m`,'N1-12'],[`${+(a-b-c*10>0?a-b-c*10:a-b+c).toFixed(2)} m`,'N4-03'],[`${+(b+c).toFixed(2)} m`,'N1-08']]); });
hq('H3R1',[4],'변화와 관계','S5-06',['규칙 찾기','곱셈'],()=>{ const k=hqR(8,12); return WM(`성냥개비로 정사각형을 한 줄로 이어 붙여요. 정사각형 1개는 4개, 2개는 7개, 3개는 10개가 필요해요. 정사각형 ${k}개를 만들려면 성냥개비가 몇 개 필요할까요?`,'',3*k+1,[[4*k,'R5-03'],[3*k,null],[3*k+4,null]],'','개'); });
hq('H3R2',[4],'변화와 관계','S5-10',['등호','덧셈과 뺄셈'],()=>{ const a=hqR(34,58), b=hqR(17,29); let c=hqR(12,25); if(c===b) c+=3; return WM(`${a} + ${b} = □ + ${c} 가 되도록 하려고 해요. □에 알맞은 수는 얼마일까요?`,'',a+b-c,[[a+b,'R4-02'],[a+b+c,'R4-02'],[a-c,null]]); });
hq('H3R3',[3,4],'변화와 관계','S5-07',['규칙을 식으로','곱셈'],()=>{ const a=hqR(3,6), b=hqR(2,5), n=hqR(12,20); return WM(`어떤 규칙으로 수를 늘어놓았어요: ${a+b}, ${2*a+b}, ${3*a+b}, ${4*a+b}, … 이 규칙에서 ${n}번째 수는 얼마일까요?`,'',a*n+b,[[a*n,'R5-03'],[a*(n-1)+b,'N1-07'],[(a+b)*n,'R5-02']]); });
hq('H3G1',[3],'도형과 측정','S6-35',['시간의 덧셈','분과 시간'],()=>{ const h=hqR(1,2), m=hqP(35,45,50), h2=1, m2=hqP(25,40,45), tot=(h+h2)*60+m+m2; return MC(`영화를 ${h}시간 ${m}분 동안 보고, 이어서 책을 ${h2}시간 ${m2}분 동안 읽었어요. 모두 몇 시간 몇 분일까요?`,'',`${Math.floor(tot/60)}시간 ${tot%60}분`,[[`${h+h2}시간 ${m+m2}분`,'G2-17'],[`${Math.floor(tot/60)+1}시간 ${tot%60}분`,null],[`${Math.floor(tot/60)}시간 ${tot%60+10}분`,null]]); });
hq('H3G2',[3],'도형과 측정','S6-19',['정사각형','직사각형','둘레'],()=>{ const a=hqR(4,9), k=hqP(2,3); return WM(`한 변이 ${a} cm인 정사각형 ${k}개를 옆으로 겹치지 않게 이어 붙여 직사각형을 만들었어요. 이 직사각형의 네 변의 길이의 합은 몇 cm일까요?`,'',2*(a*k+a),[[4*a*k,'G5-07'],[a*k+a,null],[a*k*a,'G5-01']],'','cm'); });
hq('H3G3',[3],'도형과 측정','S6-27',['원의 반지름과 지름','길이'],()=>{ const r=hqR(3,7), n=hqR(3,5); return WM(`반지름이 ${r} cm인 원 ${n}개를 서로 맞닿게 한 줄로 그렸어요. 맨 왼쪽 끝에서 맨 오른쪽 끝까지의 길이는 몇 cm일까요?`,'',2*r*n,[[r*n,'G3-04'],[2*r*(n-1),'G3-10'],[r*(n+1),null]],'','cm'); });
hq('H3G4',[4],'도형과 측정','S6-50',['삼각형 세 각의 합','이등변삼각형'],()=>{ const top=hqP(40,50,70,80,100); return WM(`이등변삼각형의 꼭지각이 ${top}°예요. 한 밑각의 바깥쪽에 생기는 각(밑각과 합해 180°가 되는 각)은 몇 도일까요?`,'',180-(180-top)/2,[[(180-top)/2,'N1-12'],[180-top,'G4-18'],[top,null]],'','°'); });
hq('H3G5',[4],'도형과 측정','S6-51',['사각형 네 각의 합','평행사변형'],()=>{ const a=hqP(55,65,70,75,110,125); return WM(`평행사변형의 한 각이 ${a}°예요. 이 각과 이웃한 각의 크기는 몇 도일까요?`,'',180-a,[[a,null],[360-a,'G4-12'],[90,null]],'','°'); });
hq('H3D1',[3],'자료와 가능성','S4-08',['그림그래프','합계'],()=>{ const b1=hqR(2,4), s1=hqR(1,5), b2=hqR(1,3), s2=hqR(4,8); return WM(`그림그래프에서 큰 그림은 10개, 작은 그림은 1개를 나타내요. 가 마을은 큰 그림 ${b1}개와 작은 그림 ${s1}개, 나 마을은 큰 그림 ${b2}개와 작은 그림 ${s2}개예요. 두 마을의 도토리는 모두 몇 개일까요?`,'',10*(b1+b2)+s1+s2,[[b1+b2+s1+s2,'D3-01'],[10*b1+s1,'N1-12'],[10*(b1+b2+s1+s2),'D3-01']],'','개'); });
hq('H3D2',[4],'자료와 가능성','S4-10',['막대그래프 눈금','차'],()=>{ const u=hqP(2,5), a=hqR(6,9), b=hqR(2,5); return WM(`세로 눈금 한 칸이 ${u}명인 막대그래프에서 축구는 ${a}칸, 농구는 ${b}칸이에요. 축구를 좋아하는 학생은 농구를 좋아하는 학생보다 몇 명 더 많을까요?`,'',u*(a-b),[[a-b,'D4-01'],[u*a,'N1-08'],[u*(a+b),null]],'','명'); });
hq('H3D3',[4],'자료와 가능성','S4-11',['꺾은선그래프','변화량'],()=>{ const v=[hqR(8,11)]; [hqR(2,3),hqR(5,7),-hqR(1,2),hqR(1,3)].forEach(d=>v.push(v[v.length-1]+d)); const ds=v.slice(1).map((x,i)=>x-v[i]); const mi=ds.indexOf(Math.max(...ds)); const lab=i=>`${i+1}일과 ${i+2}일 사이`; return MC(`낮 기온이 1일 ${v[0]}도, 2일 ${v[1]}도, 3일 ${v[2]}도, 4일 ${v[3]}도, 5일 ${v[4]}도였어요. 기온이 가장 많이 오른 때는 언제일까요?`,'',lab(mi),[[lab(v.indexOf(Math.max(...v))-1===mi?(mi+1)%4:Math.max(0,v.indexOf(Math.max(...v))-1)),'D4-03'],[lab(ds.indexOf(Math.min(...ds))),'D4-04']]); });
/* ---- 5~6학년 ---- */
hq('H5N1',[5],'수와 연산','S3-67',['혼합 계산','문장을 식으로'],()=>{ const p=hqP(700,800,900), n=hqR(3,5), q=hqP(1200,1500), pay=10000; return WM(`${p}원짜리 공책 ${n}권과 ${q}원짜리 필통 2개를 사고 ${pay}원을 냈어요. 거스름돈은 얼마일까요?`,'',pay-(p*n+q*2),[[pay-p*n+q*2,'N5-09'],[p*n+q*2,'N1-08'],[pay-(p*n+q),'N1-12']],'','원'); });
hq('H5N2',[5],'수와 연산','S3-73',['최소공배수','시각'],()=>{ const a=hqP(6,8,9), b=hqP(10,12,15), l=(x,y)=>{ let g=x,h=y; while(h){ [g,h]=[h,g%h]; } return x*y/g; }, L=l(a,b); return WM(`가 버스는 ${a}분마다, 나 버스는 ${b}분마다 출발해요. 두 버스가 오전 9시에 함께 출발했다면, 다음에 함께 출발하는 것은 몇 분 뒤일까요?`,'',L,[[a*b===L?a+b:a*b,'N5-12'],[(()=>{ let g=a,h=b; while(h){ [g,h]=[h,g%h]; } return g; })(),'N5-02'],[a+b,null]],'','분'); });
hq('H5N3',[5],'수와 연산','S3-80',['분모가 다른 분수의 덧셈','뺄셈'],()=>{ const [d1,n1,d2,n2]=hqP([2,1,3,1],[3,1,4,1],[2,1,5,1],[4,1,6,1],[3,1,6,1]); const L=d1*d2/((x,y)=>{ while(y){ [x,y]=[y,x%y]; } return x; })(d1,d2), rest=L-(n1*L/d1+n2*L/d2), g=((x,y)=>{ while(y){ [x,y]=[y,x%y]; } return x; })(rest,L); return MC(`물통의 물 가운데 ${d1}분의 ${n1}은 화분에 주고, ${d2}분의 ${n2}은 세수하는 데 썼어요. 남은 물은 처음의 몇 분의 몇일까요?`,'',`${L/g}분의 ${rest/g}`,[[`${L/g===L?L+1:L}분의 ${n1*L/d1+n2*L/d2}`,'N1-08'],[`${d1+d2}분의 ${n1+n2}`,'N5-04'],[`${d1+d2}분의 ${d1+d2-n1-n2}`,'N5-04']]); });
hq('H5N4',[5],'수와 연산','S3-91',['분수의 곱셈','전체의 분수','남은 양'],()=>{ const N=hqP(24,30,36,40,48), [d1,d2]=hqP([2,3],[3,2],[4,3],[3,4],[2,4]); if(N%d1||((N-N/d1)%d2)) return null; return WM(`책 ${N}쪽 가운데 어제 전체의 ${d1}분의 1을 읽고, 오늘은 남은 쪽수의 ${d2}분의 1을 읽었어요. 아직 읽지 않은 쪽수는 몇 쪽일까요?`,'',N-N/d1-(N-N/d1)/d2,[[N-N/d1-N/d2>0?N-N/d1-N/d2:null,'N5-18'],[(N-N/d1)/d2,'N1-08'],[N-N/d1,'N1-12']],'','쪽'); });
hq('H5N5',[6],'수와 연산','S3-107',['분수의 나눗셈','단위량'],()=>{ const [n,d,k]=hqP([3,4,6],[2,3,8],[3,5,9],[4,5,12]); return WM(`철사 ${d}분의 ${n} m의 무게가 ${k} g이에요. 이 철사 1 m의 무게는 몇 g일까요?`,'',k*d/n,[[k*n/d===Math.floor(k*n/d)?k*n/d:null,'N6-12'],[k*d,'N6-11'],[k,null]],'','g'); });
hq('H5N6',[6],'수와 연산','S3-112',['소수의 나눗셈','나머지','올림'],()=>{ const b=hqP(0.6,0.7,0.8), q=hqR(5,9), r=hqP(0.2,0.3,0.4,0.5), tot=+(b*q+r).toFixed(1); return WM(`주스 ${tot} L를 한 병에 ${b} L씩 모두 담으려고 해요. 병은 적어도 몇 개 필요할까요?`,'',q+1,[[q,'N6-10'],[Math.round(r*10),'N6-09'],[q+2,null]],'','개'); });
hq('H5R1',[5],'변화와 관계','S5-12',['대응 관계','식으로 나타내기'],()=>{ const a=hqR(3,6), b=hqR(2,5), x=hqR(12,20); return WM(`□가 1, 2, 3일 때 △는 ${a+b}, ${2*a+b}, ${3*a+b}이에요. □가 ${x}일 때 △는 얼마일까요?`,'',a*x+b,[[a*x,'R5-03'],[x+a+b-1,'R5-02'],[(a+b)*x,'R5-03']]); });
hq('H5R2',[6],'변화와 관계','S5-16',['백분율','할인','두 단계'],()=>{ const p=hqP(8000,12000,15000,20000), r=hqP(10,20,25), n=2; return WM(`한 개에 ${p}원인 장난감을 ${r}% 할인해서 팔아요. 이 장난감 ${n}개를 사려면 얼마를 내야 할까요?`,'',p*(100-r)/100*n,[[p*r/100*n,'R6-07'],[p*(100-r)/100,'N1-12'],[p*n-p*r/100,null]],'','원'); });
hq('H5R3',[6],'변화와 관계','S5-16',['진하기','백분율','기준량'],()=>{ const [s,w]=hqP([20,80],[30,120],[25,100],[40,160],[10,40]); const add=s+w, ans=Math.round(100*s/(add*2)); return WM(`소금 ${s} g을 물 ${w} g에 녹인 소금물에 물 ${add} g을 더 넣었어요. 새로 만든 소금물의 진하기는 몇 %일까요?`,'',ans,[[Math.round(100*s/(s+w)),'R6-06'],[Math.round(100*s/(w+add)),'R6-08'],[Math.round(100*s/(s+w))/2===ans?null:Math.round(100*s/w),'R6-08']],'','%'); });
hq('H5R4',[6],'변화와 관계','S5-21',['비례배분','차'],()=>{ const [a,b]=hqP([2,3],[3,5],[3,4],[2,5],[4,5]), u=hqR(4,9), N=(a+b)*u; return WM(`구슬 ${N}개를 형과 동생이 ${b} : ${a}로 나누어 가졌어요. 형은 동생보다 몇 개 더 많이 가졌을까요?`,'',(b-a)*u,[[b*u,'N1-08'],[N/b===Math.floor(N/b)?N/b:null,'R6-13'],[b-a,'R6-16']],'','개'); });
hq('H5R5',[6],'변화와 관계','S5-20',['비례식','속력'],()=>{ const v=hqP(60,70,80,90), t1=hqP(2,3), t2=hqP(5,6,7); return WM(`같은 빠르기로 달리는 자동차가 ${t1}시간 동안 ${v*t1} km를 갔어요. 이 빠르기로 ${t2}시간 30분 동안 달리면 몇 km를 갈까요?`,'',v*t2+v/2,[[v*t2,'N1-12'],[v*(t2+0.3)===Math.floor(v*(t2+0.3))?v*(t2+0.3):null,'G2-03'],[v*t1*t2,'R6-14']],'','km'); });
hq('H5G1',[5],'도형과 측정','S6-68',['직사각형의 둘레','넓이'],()=>{ const w=hqR(7,12), h=hqR(3,6); return WM(`둘레가 ${2*(w+h)} cm이고 가로가 ${w} cm인 직사각형이 있어요. 이 직사각형의 넓이는 몇 cm²일까요?`,'',w*h,[[2*(w+h),'G5-01'],[h,'N1-12'],[w*(w+2*h),null]],'','cm²'); });
hq('H5G2',[5],'도형과 측정','S6-71',['삼각형의 넓이','높이 구하기'],()=>{ const b=hqP(8,10,12), h=hqR(5,9), b2=hqP(4,5,6,b/2); return WM(`밑변이 ${b} cm, 높이가 ${h} cm인 삼각형과 넓이가 같은 직사각형이 있어요. 이 직사각형의 가로가 ${b/2} cm라면 세로는 몇 cm일까요?`,'',h,[[2*h,'G5-03'],[b*h/2,'N1-12'],[h/2===Math.floor(h/2)?h/2:null,'G5-16']],'','cm'); });
hq('H5G3',[5],'도형과 측정','S6-56',['직육면체의 모서리','길이의 합'],()=>{ const a=hqR(5,9), b=hqR(3,6), c=hqR(2,4), rb=hqR(15,25); return WM(`가로 ${a} cm, 세로 ${b} cm, 높이 ${c} cm인 직육면체 모양 상자의 모든 모서리에 색 테이프를 붙이려고 해요. 필요한 색 테이프는 모두 몇 cm일까요?`,'',4*(a+b+c),[[a+b+c,'G5-13'],[2*(a+b+c),'G5-11'],[a*b*c,'G6-05']],'','cm'); });
hq('H5G4',[6],'도형과 측정','S6-78',['직육면체의 부피','높이 구하기'],()=>{ const a=hqP(5,6,8,10), b=hqP(4,5,6), h=hqR(3,7), up=hqR(2,4); return WM(`가로 ${a} cm, 세로 ${b} cm인 직육면체 모양 물통에 물이 ${h} cm 높이로 들어 있어요. 여기에 돌을 넣었더니 물의 높이가 ${h+up} cm가 되었어요. 돌의 부피는 몇 cm³일까요?`,'',a*b*up,[[a*b*(h+up),'N1-08'],[a*b*h,null],[2*(a*b+a*up+b*up),'G6-05']],'','cm³'); });
hq('H5G5',[6],'도형과 측정','S6-75',['원의 넓이','반지름과 지름'],()=>{ const d=hqP(8,12,20), r=d/2; return WM(`한 변이 ${d} cm인 정사각형 안에 꼭 맞게 원을 그렸어요. 정사각형에서 원을 뺀 나머지 부분의 넓이는 몇 cm²일까요? (원주율 3)`,'',d*d-3*r*r,[[d*d-3*d*d<0?3*r*r:3*r*r,'N1-08'],[d*d-3*d,'G6-12'],[d*d-3*2*r,'G6-18']],'','cm²'); });
hq('H5D1',[5],'자료와 가능성','S4-16',['평균','합계','모르는 값'],()=>{ const n=4, avg=hqR(82,90), v=[avg+hqR(-6,-2),avg+hqR(1,4),avg+hqR(-3,3)], last=avg*n-v.reduce((s,x)=>s+x,0); return WM(`네 번 본 시험의 평균이 ${avg}점이에요. 세 번의 점수가 ${v[0]}점, ${v[1]}점, ${v[2]}점이라면 나머지 한 번의 점수는 몇 점일까요?`,'',last,[[avg,'D5-01'],[Math.round(v.reduce((s,x)=>s+x,0)/3),'D5-04'],[avg*n,'D5-04']],'','점'); });
hq('H5D2',[5],'자료와 가능성','S4-16',['평균','인원이 다른 두 모둠'],()=>{ const a=hqR(4,6), b=hqR(2,3), T=hqR(10,14), d=hqP(-1,1), ma=T+d*b, mb=T-d*a; return WM(`가 모둠 ${a}명은 책을 평균 ${ma}권, 나 모둠 ${b}명은 평균 ${mb}권 읽었어요. 두 모둠 학생 전체의 평균은 몇 권일까요?`,'',(a*ma+b*mb)/(a+b),[[Math.round((ma+mb)/2)!==(a*ma+b*mb)/(a+b)?Math.round((ma+mb)/2):null,'D5-02'],[a*ma+b*mb,'D5-04'],[ma+mb,null]],'','권'); });
hq('H5D3',[6],'자료와 가능성','S4-21',['비율그래프','전체 수','백분율'],()=>{ const N=hqP(200,300,400,500), p1=hqP(30,35,40), p2=hqP(15,20,25); return WM(`${N}명을 조사한 띠그래프에서 축구는 ${p1}%, 농구는 ${p2}%예요. 축구를 고른 학생은 농구를 고른 학생보다 몇 명 더 많을까요?`,'',N*(p1-p2)/100,[[p1-p2,'D6-01'],[N*p1/100,'N1-08'],[N*(p1+p2)/100,null]],'','명'); });
hq('H5D4',[6],'자료와 가능성','S4-21',['비율그래프 비교','전체가 다른 두 집단'],()=>{ const [N1,p1,N2,p2]=hqP([500,20,200,40],[400,25,150,60],[600,15,200,40],[300,30,100,70]); const a=N1*p1/100, b=N2*p2/100; return MC(`가 학교 ${N1}명 중 ${p1}%, 나 학교 ${N2}명 중 ${p2}%가 자전거로 등교해요. 자전거로 등교하는 학생은 어느 학교가 몇 명 더 많을까요?`,'',`${a>b?'가':'나'} 학교가 ${Math.abs(a-b)}명 더 많다`,[[`${a>b?'나':'가'} 학교가 ${Math.abs(a-b)+10}명 더 많다`,'D6-02'],[`${a>b?'가':'나'} 학교가 ${Math.abs(p1-p2)+1}명 더 많다`,'D6-01'],[`두 학교가 같다`,null]]); });
/* 문제 뽑기 */
function hqMake(h){ for(let t=0;t<30;t++){ let q=null; try{ q=h.gen(); }catch(e){ q=null; } if(!q||typeof q!=='object') continue; const A=String(q.ans); if(q.opts&&q.opts.length&&new Set(q.opts.map(String)).size!==q.opts.length) continue;
    q._hq=h.id; q._kcs=h.kcs; q._ep=h.ep; q._ti=-1; q._lvl='상(임시)'; if(h.nokt) q._kt=1; try{ nowrapExpr(q); }catch(e){} try{ if(h.grades[0]>=3||h.dom!=='수와 연산') cpaVis(h.ep,q); }catch(e){} q._cpaPic=null; delete q._svEp; return q; } return null; }
window._HQ=HQ; window._hqMake=hqMake;
window._hqPick=(dom,band,n=5)=>{ const gs=band>=5?[5,6]:band>=3?[3,4]:[1,2]; const pool=shuffle(HQ.filter(h=>h.dom===dom&&h.grades.some(g=>gs.includes(g)))); const out=[], seen=new Set(); for(let r=0;r<3&&out.length<n;r++) for(const h of pool){ if(out.length>=n) break; const q=hqMake(h); if(!q) continue; const k=String(q.q); if(seen.has(k)) continue; seen.add(k); out.push(q); } return out; };
window._hqRec=(q,ok)=>{ try{ if(!q||!q._hq||q._hqDone) return; q._hqDone=1; const o=JSON.parse(localStorage.getItem('kt_hq')||'{}'), r=o[q._hq]=o[q._hq]||{n:0,ok:0}; r.n++; if(ok) r.ok++; localStorage.setItem('kt_hq',JSON.stringify(o)); }catch(e){} };


// ===== 3-54. 주머니 공 가능성 비교: '같다' 보기 (교수님 11/22: 보기가 둘뿐이라 '같다'를 고를 수 없음) =====
// 보기는 늘 빨간 공·파란 공·같다 셋. 세 번에 한 번쯤은 두 색의 개수를 같게 내어 '같다'가 정답이 되게 한다.
// 오답 코드: 개수가 다른데 '같다' = D5-05(무엇이든 반반), 적은 쪽 = D5-07 대신 방향 혼동이라 코드 없이 F.
try{ const a17=G36['S4-17']; if(a17){ const i=a17.findIndex(g=>{ try{ return /꺼낼 가능성이 더 큰 것은/.test(String(g().q)); }catch(e){ return false; } });
    const gen=()=>{ const same=Math.random()<0.34, r=rnd(1,4), b=same?r:(()=>{ let x; do{ x=rnd(1,4); }while(x===r); return x; })(); const ans=r===b?'같다':r>b?'빨간 공':'파란 공';
      const q=C36(WHO(),`빨간 공 ${r}개, 파란 공 ${b}개가 든 주머니에서 공 하나를 꺼낼 때, 꺼낼 가능성이 더 큰 것은?`,' ','',ans,shuffle(['빨간 공','파란 공']).concat('같다')); q.mis={}; if(r!==b) q.mis['같다']='D5-05'; return q; };
    if(i>=0) a17[i]=gen; else a17.push(gen); } }catch(e){}
/* 비교 문제의 '같다' 보기 — 교육적으로 가려서 넣는다 (교수님 11/22 "교육적으로 고려해서 넣을지 말지 결정")
   넣는다: ① >·=·< 기호 문제는 교과서 형식대로 늘 세 기호. ② 같음이 배울 내용인 곳은 '같다'가 정답인 경우도 넷에 한 번쯤 낸다 —
           분수와 소수(5분의 1 = 0.2), 크기가 같은 분수(3분의 2 = 6분의 4), 소수 끝의 0(0.5 = 0.50), 사람 수가 다른 두 모둠의 평균이 같은 경우.
   안 넣는다: 같은 분모 분수 비교(같을 수 없어 군더더기), 1~2학년 직접 비교(둘 중 고르기가 교육과정 형식, 읽을거리만 늘어남).
              정답이 될 수 없는 '같다'는 아이가 금방 버리는 보기라 변별에 도움이 안 된다. */
function eqOpt(q){ if(!q||q.manip||q.onMount||!Array.isArray(q.opts)||q.opts.length!==2) return q; const o=q.opts.map(String), t=_pl(String(q.q));
  if(o.includes('>')&&o.includes('<')){ q.opts=['>','=','<']; return q; }
  if(/평균이 더 높은 모둠은|^더 큰 수는\? [\d.]+, [\d.]+/.test(t)&&!o.includes('같다')) q.opts=o.concat('같다'); return q; }
function eqCase(ep,q){ if(!q||q.manip||q.onMount||Math.random()>=0.25) return q; const t=_pl(String(q.q)).trim(); let nq=null;
  if(ep==='S3-77'&&/^\d+분의 \d+ □ \d+\.\d+$/.test(t)){ const [d,n,dec]=rndPick([2,1,'0.5'],[4,1,'0.25'],[5,1,'0.2'],[5,2,'0.4'],[5,3,'0.6'],[4,3,'0.75'],[10,3,'0.3']); nq=C36(WHO(),`${d}분의 ${n} □ ${dec}`,' ','','=',['>','=','<']); nq.mis={}; }
  else if(ep==='S3-77'&&/^\d+분의 \d+ □ \d+분의 \d+$/.test(t)){ let [a,b,c,d]=rndPick([2,1,4,2],[3,1,6,2],[3,2,6,4],[4,3,8,6],[5,2,10,4],[2,1,6,3],[4,1,8,2]); if(Math.random()<.5) [a,b,c,d]=[c,d,a,b]; nq=C36(WHO(),`${a}분의 ${b} □ ${c}분의 ${d}`,' ','','=',['>','=','<']); nq.mis={[a>c?'>':'<']:'N5-13'}; }
  else if(ep==='S3-58'&&/^더 큰 수는\? [\d.]+, [\d.]+$/.test(t)){ const k=rnd(2,9), a=`0.${k}`, b=`0.${k}0`; nq=C36(WHO(),`더 큰 수는? ${a}, ${b}`,' ','','같다',[a,b,'같다']); nq.mis={[b]:'N4-02',[a]:'N4-13'}; }
  else if(ep==='S4-16'&&/^가 모둠 [\d, ]+ \/ 나 모둠 [\d, ]+\. 평균이 더 높은 모둠은/.test(t)){ const T=rnd(13,17), A=shuffle([T-3,T+1,T+2]), B=shuffle([T-4,T-1,T+2,T+3]); nq=C36(WHO(),`가 모둠 ${A.join(', ')} / 나 모둠 ${B.join(', ')}. 평균이 더 높은 모둠은?`,' ','','같다',shuffle(['가 모둠','나 모둠']).concat('같다')); nq.mis={'나 모둠':'D5-04'}; }
  if(!nq) return q; try{ nowrapExpr(nq); }catch(e){} try{ cpaVis(ep,nq); }catch(e){} return nq; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=eqOpt(q); }catch(e){} try{ q=eqCase(ep,q); }catch(e){} return q; }; }


// ===== 3-55. 말로만 설명하던 뒤집기·돌리기 문제를 그림 고르기로 (교수님 11/22: "말이 너무 어렵지 않아?") =====
// "위에 꼭짓점 가, 왼쪽 아래에 나…인 삼각형을 뒤집었어요. 가의 방향과 왼쪽에 놓이는 꼭짓점은?" → 꼭짓점 이름이 적힌 삼각형 그림을 보여 주고, 뒤집은 모양을 그림에서 고른다.
// "위쪽 변은 빨간색, 오른쪽 변은 파란색인 정사각형을 돌렸어요…" → 색 변이 있는 정사각형 그림, 돌린 모양을 그림에서 고른다. 오답 그림마다 오개념 코드는 그대로.
function mvTri(top,l,r,label,big){ const W=big?120:92, H=big?100:78, P=top?[[W/2,12],[14,H-14],[W-14,H-14]]:[[W/2,H-12],[14,14],[W-14,14]]; const T=(x,y,s)=>`<text x="${x}" y="${y}" font-size="${big?15:13}" font-weight="700" text-anchor="middle" fill="#4A2E14">${s}</text>`;
  const g=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#FFE3B0" stroke="#7A4A1E" stroke-width="2" stroke-linejoin="round"/>`+T(W/2,top?34:H-26,'가')+T(30,top?H-20:30,l)+T(W-30,top?H-20:30,r);
  return `<div class="tf"><svg viewBox="0 0 ${W} ${H}" width="${W}" style="background:#fff;border-radius:8px">${g}</svg>${label?`<b>${label}</b>`:''}</div>`; }
function mvSq(red,blue,label,big){ const W=big?110:86, a=14, b=W-14, S={위:[a,a,b,a],아래:[a,b,b,b],왼:[a,a,a,b],오른:[b,a,b,b]}, L=(k,c)=>{ const [x1,y1,x2,y2]=S[k]; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`; }, tx=(k,s,c)=>{ const [x1,y1,x2,y2]=S[k], mx=(x1+x2)/2, my=(y1+y2)/2, cx=W/2, cy=W/2; return `<text x="${mx+(cx-mx)*0.36}" y="${my+(cy-my)*0.36+4}" font-size="${big?12:10}" font-weight="700" text-anchor="middle" fill="${c}">${s}</text>`; };
  const g=`<rect x="${a}" y="${a}" width="${b-a}" height="${b-a}" fill="#FFF6E2" stroke="#7A4A1E" stroke-width="2"/>`+L(red,'#D8402F')+L(blue,'#2F6FD0')+tx(red,'빨강','#B32A1C')+tx(blue,'파랑','#1F56AE');
  return `<div class="tf"><svg viewBox="0 0 ${W} ${W}" width="${W}" style="background:#fff;border-radius:8px">${g}</svg>${label?`<b>${label}</b>`:''}</div>`; }
function mvPickQ(q,orig,cands){ const seen=new Set(), use=[]; for(const c of cands){ if(seen.has(c[0])) continue; seen.add(c[0]); use.push(c); } const order=shuffle(use.map((_,i)=>i)), labs=['가','나','다','라'].slice(0,use.length).map(x=>x), names=['①','②','③','④'].slice(0,use.length), ans=names[order.indexOf(0)];
  const vis=`${orig?`<div class="tfrow">${orig}<span class="tarrow">→ ?</span></div>`:''}<div class="tfrow" style="flex-wrap:wrap;gap:8px">${order.map((k,j)=>use[k][1](names[j])).join('')}</div>`;
  const r=C36(WHO(),q,q,vis,ans,names.slice()); r.mis={}; order.forEach((k,j)=>{ if(k>0&&use[k][2]) r.mis[names[j]]=use[k][2]; }); return r; }
function mvWordQ(ep,q){ if(!q||q.manip||q.onMount) return q; const t=_pl(String(q.q));
  if(ep==='S6-23'&&/위에 꼭짓점 가, 왼쪽 아래에 나, 오른쪽 아래에 다가 있는 삼각형/.test(t)){ const ud=Math.random()<0.6, dir=ud?rndPick('아래쪽','위쪽'):rndPick('오른쪽','왼쪽');
    const F=(top,l,r)=>[`${top}${l}${r}`,lab=>mvTri(top,l,r,lab)], flipUD=F(0,'나','다'), flipLR=F(1,'다','나'), rot=F(0,'다','나'), same=F(1,'나','다');
    return mvPickQ(`이 삼각형을 ${dir}으로 뒤집으면 어떤 모양이 될까요?`,mvTri(1,'나','다','',true),ud?[flipUD,[...flipLR,'G4-14'],[...rot,'G4-04'],[...same,'G4-16']]:[flipLR,[...flipUD,'G4-14'],[...rot,'G4-04'],[...same,'G4-16']]); }
  if(ep==='S6-24'&&/위쪽 변은 빨간색, 오른쪽 변은 파란색인 정사각형/.test(t)){ const ccw=Math.random()<0.5, F=(r,b)=>[r+b,lab=>mvSq(r,b,lab)], CCW=F('왼','위'), CW=F('오른','아래'), LR=F('위','왼'), R180=F('아래','왼');
    return mvPickQ(`이 정사각형을 시계 ${ccw?'반대 ':''}방향으로 90° 돌리면 어떤 모양이 될까요?`,mvSq('위','오른','',true),ccw?[CCW,[...CW,'G4-10'],[...LR,'G4-04'],[...R180,'G4-13']]:[CW,[...CCW,'G4-10'],[...LR,'G4-04'],[...R180,'G4-13']]); }
  return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=mvWordQ(ep,q); }catch(e){} return q; }; }


// ===== 3-56. 도형을 말로만 설명한 문제에 그림 (3-55에 이어, 글이 긴 도형 문제 검토) =====
function gxWordPic(ep,t){ let m; const two=(a,b)=>cpRow(a,b);
  if((m=t.match(/자의 눈금 (\d+)에 있는 점 ㄱ에서 눈금 (\d+)에 있는 점 ㄴ까지/))){ const a=+m[1], b=+m[2], N=Math.max(12,b+1), u=280/N, x0=16; let g=`<rect x="${x0-6}" y="40" width="${N*u+12}" height="34" rx="4" fill="#FFF3C4" stroke="#B5701F" stroke-width="1.5"/>`; for(let i=0;i<=N;i++) g+=`<line x1="${x0+i*u}" y1="40" x2="${x0+i*u}" y2="52" stroke="#4A2E14"/>`+gxT(x0+i*u,67,i,9.5,'#4A2E14','middle',400);
    g+=`<line x1="${x0+a*u}" y1="26" x2="${x0+b*u}" y2="26" stroke="${gxQ}" stroke-width="3"/><circle cx="${x0+a*u}" cy="26" r="4" fill="${GX_S}"/><circle cx="${x0+b*u}" cy="26" r="4" fill="${GX_S}"/>`+gxT(x0+a*u,16,'ㄱ',12)+gxT(x0+b*u,16,'ㄴ',12); return cpWrap(cpSvg(g,312,80)); }
  if((m=t.match(/사각형 가\(가로 (\d+) cm, 세로 (\d+) cm\)와 나\(가로 (\d+) cm, 세로 (\d+) cm\)/))||(m=t.match(/가로 (\d+) cm, 세로 (\d+) cm인 직사각형 가와 가로 (\d+) cm, 세로 (\d+) cm인 직사각형 나/))||(m=t.match(/가로 (\d+) cm, 세로 (\d+) cm인 직사각형과 가로 (\d+) cm, 세로 (\d+) cm인 직사각형/))){ const R=(w,h,n)=>{ const sc=Math.min(100/w,90/h), W=Math.max(12,w*sc), H=Math.max(12,h*sc); return cpCol(`<svg viewBox="0 0 ${W+50} ${H+30}" width="${W+50}" style="background:#fff;border-radius:8px"><rect x="40" y="6" width="${W}" height="${H}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>${gxT(40+W/2,H+22,w+' cm',11)}${gxT(36,6+H/2+4,h+' cm',11,'#4A2E14','end')}</svg>`,`<b style="font-size:.95rem">${n}</b>`); }; return cpWrap(two(R(+m[1],+m[2],'가'),R(+m[3],+m[4],'나'))); }
  if((m=t.match(/수직으로 그은 선분은 (\d+) cm, 비스듬히 그은 선분은 (\d+) cm/))) return cpWrap(cpSvg(`<line x1="16" y1="22" x2="264" y2="22" stroke="${GX_S}" stroke-width="2.2"/><line x1="16" y1="92" x2="264" y2="92" stroke="${GX_S}" stroke-width="2.2"/><line x1="80" y1="22" x2="80" y2="92" stroke="#2F6FA8" stroke-width="2"/><path d="M80,84 h8 v8" fill="none" stroke="#2F6FA8"/>`+gxT(70,60,m[1]+' cm',11,'#2F6FA8','end')+`<line x1="130" y1="22" x2="210" y2="92" stroke="#3F8F3F" stroke-width="2"/>`+gxT(182,54,m[2]+' cm',11,'#3F8F3F','start'),280,110));
  if((m=t.match(/직각을 이루는 선분은 (\d+) cm, 가로로 반듯하게 그은 선분은 (\d+) cm, 더 비스듬한 선분은 (\d+) cm/))){ const g=`<line x1="20" y1="70" x2="250" y2="14" stroke="${GX_S}" stroke-width="2.2"/><line x1="30" y1="130" x2="260" y2="74" stroke="${GX_S}" stroke-width="2.2"/><line x1="78" y1="56" x2="92" y2="115" stroke="#2F6FA8" stroke-width="2"/>`+gxT(70,92,m[1]+' cm',11,'#2F6FA8','end')+`<line x1="120" y1="46" x2="182" y2="93" stroke="#3F8F3F" stroke-width="2"/>`+gxT(160,62,m[2]+' cm',11,'#3F8F3F','start')+`<line x1="185" y1="30" x2="250" y2="76" stroke="#B4480C" stroke-width="2" stroke-dasharray="0"/>`+gxT(232,48,m[3]+' cm',11,'#B4480C','start'); return cpWrap(cpSvg(g,280,140),'파란 선분이 두 직선과 직각'); }
  if((m=t.match(/네 변이 모두 (\d+) cm이며 이웃한 두 각이 (\d+)°, (\d+)°인 사각형/))){ const g=`<polygon points="60,20 200,20 160,100 20,100" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`+gxT(130,14,m[1]+' cm',11)+gxT(194,66,m[1]+' cm',11,'#4A2E14','start')+gxT(46,92,m[2]+'°',11,gxQ)+gxT(150,92,m[3]+'°',11,gxQ); return cpWrap(cpSvg(g,240,112)); }
  if((m=t.match(/가로 (\d+) cm, 세로 (\d+) cm인 직사각형에 세로 방향 대칭축/))) return cpWrap(cpSvg(`<rect x="40" y="16" width="170" height="96" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/><line x1="125" y1="6" x2="125" y2="122" stroke="${gxQ}" stroke-width="2" stroke-dasharray="6 4"/>`+gxT(125,134,m[1]+' cm',11)+gxT(36,68,m[2]+' cm',11,'#4A2E14','end')+`<circle cx="40" cy="16" r="4" fill="${GX_S}"/>`,230,140),'점선이 대칭축');
  if(/밑면이 한 변 \d+ cm인 정사각형이고 옆면이 삼각형 4개인 입체도형/.test(t)) return cpWrap(svSketch({k:'pyr',n:4}));
  if((m=t.match(/위에서 본 모양 각 칸에 쌓은 개수가 (\d), (\d), (\d)/))||(m=t.match(/한 줄로 놓인 세 자리에 쌓기나무를 왼쪽부터 (\d)개, (\d)개, (\d)개/))){ const H=[[0,0,0],[0,0,0],[+m[1],+m[2],+m[3]]]; return cpWrap(two(skBox(skNumSvg(H),'위에서 본 모양'),skBox(`<div style="width:150px">${skIsoSvg(H,{s:18})}</div>`,'쌓은 모양'))); }
  if(/위에서 본 모양은 가로 2칸·세로 2칸이고, 앞과 오른쪽 옆에서 본 모양은 모두 왼쪽 2층·오른쪽 2층/.test(t)){ const H=[[0,0,0],[2,2,0],[2,2,0]]; return cpWrap(cpRow(skViewSvg('top',H),skViewSvg('front',H),skViewSvg('side',H))); }
  if((m=t.match(/한 모서리가 1 cm인 쌓기나무로 한 모서리가 (\d) cm인 정육면체/))) return cpWrap(gxBox(m[1]+' cm',m[1]+' cm',m[1]+' cm',true),'쌓기나무 한 모서리 1 cm');
  if((m=t.match(/반지름 (\d+) cm인 원\(넓이 (\d+) cm²\)을 키워 지름 (\d+) cm인 원/))) return cpWrap(two(gxCircle({r:m[1]+' cm'}),gxCircle({d:m[3]+' cm'})));
  return ''; }
{ const _cp2=cpPic; cpPic=function(ep,t){ if(/^S6-/.test(ep)){ let r=''; try{ r=gxWordPic(ep,t); }catch(e){ r=''; } if(r) return r; } return _cp2(ep,t); }; }


// ===== 3-57. 보기 제시 규칙 (교수님 11/22 "보기를 어떻게 제시해야 하는지 제미나이랑 생각해 봐") — 보기규칙.md '보기 제시' 절 참고 =====
// 같은 자리 정답이 3번 넘게 이어지지 않게: 자리를 옮겨도 되는 보기(수·낱말·문장)일 때만 정답을 다른 자리와 맞바꾼다. 이름표·기호·짝·맨 끝 고정 보기는 건드리지 않는다.
try{ const _raP=runAct; let last=[]; runAct=function(){ try{ const a=S&&S.acts&&S.acts[S.i]; const q=a&&a.kind==='q'&&a.q; if(q&&Array.isArray(q.opts)&&q.opts.length>=3&&!q._posDone){ q._posDone=1; const o=q.opts.map(x=>String(x).trim()), A=String(q.ans).trim();
      const fixed=['가나다라마바사아','ㄱㄴㄷㄹㅁㅂㅅㅇ','①②③④⑤⑥⑦⑧'].some(s=>o.every(x=>x.length===1&&s.includes(x)))||o.every(x=>/^[<>=]$/.test(x)), tail=x=>/^((둘이|크기가|길이가|두 \S+가|모두) )?같(다|아요)$|^알 수 없다$|^정할 수 없다$|^모두 (맞다|아니다)$/.test(x);
      let pos=o.indexOf(A); if(pos>=0){ if(!fixed&&!tail(A)&&last.length>=2&&last.slice(-2).every(p=>p===pos)){ const cand=o.map((x,i)=>i).filter(i=>i!==pos&&!tail(o[i])); if(cand.length){ const j=cand[Math.floor(Math.random()*cand.length)]; [q.opts[pos],q.opts[j]]=[q.opts[j],q.opts[pos]]; pos=j; } } last.push(pos); if(last.length>4) last.shift(); } } }catch(e){} return _raP.apply(this,arguments); }; }catch(e){}


// ===== 3-58. 쌓기나무 문제인 것을 글에서 밝히기 (교수님 11/22: "쌓기나무 문제라는 걸 알려 줘야지, 갑자기 이러면 무슨 말이지 할 듯") =====
// 공간과 입체(S6-64·65)에서 무엇을 두고 하는 말인지 빠진 문장을 고친다. 앞뒤 문제 없이 이 문제만 봐도 뜻이 통해야 한다(문제는 섞여서 나온다).
const SK_TEXT=[
  [/^위·앞·옆 모양으로 개수를 구했더니 가장 적으면 (\d+)개, 가장 많으면 (\d+)개였어요\. 알맞은 말은\?/,'쌓기나무로 쌓은 모양을 위·앞·옆에서 본 모양만 보고 쌓기나무의 개수를 구했더니, 가장 적으면 $1개, 가장 많으면 $2개였어요. 알맞은 말은?'],
  [/^쌓은 모양을 하나로 정확히 정하려면 무엇이 더 있으면 좋을까\?/,'쌓기나무로 쌓은 모양을 위·앞·옆에서 본 모양만으로는 하나로 정할 수 없어요. 무엇이 더 있으면 정확히 정할 수 있을까요?'],
  [/^위에서 본 모양 각 칸에 쌓은 개수가 ([\d, ]+?)(이에요|예요)\. 앞에서 보면 가장 높은 곳은 몇 층\?/,'쌓기나무를 한 줄로 쌓고, 위에서 본 모양의 각 칸에 쌓은 개수를 왼쪽부터 썼더니 $1$2. 앞에서 보면 가장 높은 곳은 몇 층일까요?'] ];
function skText(ep,q){ if(!/^S6-6[45]$/.test(ep)||!q||typeof q.q!=='string') return q; for(const [re,to] of SK_TEXT){ const plain=_pl(q.q).trim(); if(re.test(plain)){ const nt=plain.replace(re,to); for(const k of ['q','say','tts','read']) if(typeof q[k]==='string'&&_pl(q[k]).trim()===plain) q[k]=nt; q.q=nt; break; } } return q; }
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=skText(ep,q); }catch(e){} return q; }; }



// ===== 3-59. 쌓기나무 문제 유형 넓히기 (교수님 11/22: "설명만 있다, 다양한 유형을" — 보여 주신 문제집 유형을 참고) =====
// ㉠ 쌓은 모양 보고 본 모양 그리기(모눈 칸 누르기)  ㉡ 본 모양 고르기  ㉢ 본 모양에 맞는 쌓은 모양 고르기
// ㉣ 개수 세기  ㉤ 위에서 본 모양에 수 쓰기  ㉥ 층별 개수  ㉦ 가장 많이 쌓은 모양 고르기  ㉧ 정육면체가 되려면 몇 개 더
const skTf=(inner,label)=>`<div class="tf">${inner}${label?`<b>${label}</b>`:''}</div>`;
const skIsoBox=(H,w=150)=>`<div style="width:${w}px">${skIsoSvg(H,{s:20})}</div>`;
function skClear(lo,hi,need){ for(let t=0;t<400;t++){ const H=skRand(lo,hi), v=skVisible(H); if(!v.topOk) continue; if(need==='hidden'&&v.vis>=skSum(H)) continue; if(need==='nohidden'&&v.vis<skSum(H)) continue; H._vis=v.vis; return H; } const H=[[0,0,0],[0,2,1],[1,1,0]]; H._vis=skVisible(H).vis; return H; }
const skMat=(kind,H)=>{ if(kind==='top') return skTop(H); const h=kind==='front'?skFront(H):skSide(H); return [0,1,2].map(r=>[0,1,2].map(c=>h[c]>=3-r?1:0)); };
/* 본 모양 그리기 판: 모눈 칸을 누르면 칠해지고 다시 누르면 지워진다 */
function viewDraw(H,kinds){ const names={top:'위',front:'앞',side:'옆'}, cols={top:'#6BA34A',front:'#D2477A',side:'#D2477A'}, u=34; let st=kinds.map(()=>[0,1,2].map(()=>[0,0,0]));
  const grid=k=>{ let g=''; for(let r=0;r<3;r++) for(let c=0;c<3;c++) g+=`<rect data-k="${k}" data-r="${r}" data-c="${c}" x="${c*u+2}" y="${r*u+2}" width="${u}" height="${u}" fill="${st[k][r][c]?'#E9B373':'#fff'}" stroke="${st[k][r][c]?'#7A4A1E':'#C9BBA6'}" stroke-width="1.4" style="cursor:pointer"/>`; return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><span style="background:${cols[kinds[k]]};color:#fff;border-radius:99px;padding:1px 10px;font-size:.9rem">${names[kinds[k]]}</span><svg viewBox="0 0 ${3*u+4} ${3*u+4}" width="${3*u+4}" style="background:#fff;border-radius:6px">${g}</svg>${kinds[k]==='top'?'<span style="font-size:.75rem;color:#8A6A4A">↓ 앞</span>':''}</div>`; };
  const html=`${skCond(skBox(skIsoBox(H,170),'쌓은 모양'))}<div class="vdwrap" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;touch-action:manipulation">${kinds.map((_,k)=>grid(k)).join('')}</div><div style="font-size:.9rem;color:#7B5632">칸을 누르면 칠해져요. 다시 누르면 지워져요.</div>`;
  const draw=root=>{ root.querySelector('.vdwrap').innerHTML=kinds.map((_,k)=>grid(k)).join(''); };
  return { html, mount(root){ root.querySelector('.vdwrap').addEventListener('click',e=>{ const el=e.target.closest&&e.target.closest('rect[data-k]'); if(!el) return; const k=+el.dataset.k, r=+el.dataset.r, c=+el.dataset.c; st[k][r][c]=st[k][r][c]?0:1; try{ sfx('pop'); }catch(_){} draw(root); }); },
    check:()=>kinds.every((kd,k)=>skSame(st[k],skMat(kd,H))), state:()=>st.map(m=>m.flat().join('')).join('/'),
    mcode:()=>{ /* 앞과 옆을 바꿔 그림, 또는 좌우를 뒤집어 그림 → 보는 방향 혼동 */ for(let k=0;k<kinds.length;k++){ const kd=kinds[k]; if(skSame(st[k],skMat(kd,H))) continue; if(kd!=='top'){ const other=skMat(kd==='front'?'side':'front',H), mir=skMat(kd,H).map(r=>r.slice().reverse()); if(skSame(st[k],other)||skSame(st[k],mir)) return 'G6-16'; } } return null; },
    reveal(){ st=kinds.map(kd=>skMat(kd,H)); const r=document.getElementById('manip'); if(r) draw(r); } }; }
/* 위에서 본 모양에 수 쓰기 판: 칸을 누를 때마다 1 → 2 → 3 → 빈칸 */
function numDraw(H){ const u=44; let st=[0,1,2].map(()=>[0,0,0]); const T=skTop(H);
  const grid=()=>{ let g=''; for(let r=0;r<3;r++) for(let c=0;c<3;c++){ const on=T[r][c]; g+=`<rect ${on?`data-r="${r}" data-c="${c}"`:''} x="${c*u+2}" y="${r*u+2}" width="${u}" height="${u}" fill="${on?'#FBE3BC':'#fff'}" stroke="${on?'#7A4A1E':'#D9CDBB'}" stroke-width="1.4" ${on?'style="cursor:pointer"':'stroke-dasharray="3 3"'}/>`+(st[r][c]?`<text x="${c*u+2+u/2}" y="${r*u+2+u/2+8}" font-size="22" font-weight="700" text-anchor="middle" fill="#4A2E14" pointer-events="none">${st[r][c]}</text>`:''); } return `<svg viewBox="0 0 ${3*u+4} ${3*u+4}" width="${3*u+4}" style="background:#fff;border-radius:6px">${g}</svg>`; };
  const html=`${skCond(skBox(skIsoBox(H,170),'쌓은 모양'))}<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><span style="background:#6BA34A;color:#fff;border-radius:99px;padding:1px 10px;font-size:.9rem">위에서 본 모양</span><div class="ndwrap" style="touch-action:manipulation">${grid()}</div><span style="font-size:.75rem;color:#8A6A4A">↓ 앞</span></div><div style="font-size:.9rem;color:#7B5632">칸을 누를 때마다 수가 1씩 커져요 (3 다음은 빈칸).</div>`;
  return { html, mount(root){ root.querySelector('.ndwrap').addEventListener('click',e=>{ const el=e.target.closest&&e.target.closest('rect[data-r]'); if(!el) return; const r=+el.dataset.r, c=+el.dataset.c; st[r][c]=(st[r][c]+1)%4; try{ sfx('pop'); }catch(_){} root.querySelector('.ndwrap').innerHTML=grid(); }); },
    check:()=>skSame(st,H.map(r=>r.slice())), state:()=>st.flat().join(''), mcode:()=>{ const n=st.flat().reduce((a,b)=>a+b,0); return n===H._vis&&n<skSum(H)?'G6-09':null; },
    reveal(){ st=H.map(r=>r.slice()); const r=document.getElementById('manip'); if(r) r.querySelector('.ndwrap').innerHTML=grid(); } }; }
const SKX={};
SKX.drawOne=()=>{ const H=skClear(5,9), kd=rndPick('front','side','top'), nm={top:'위',front:'앞',side:'옆(오른쪽)'}[kd]; return MQ(`쌓기나무로 쌓은 모양을 ${nm}에서 본 모양을 그려 보세요.`,kd==='top'?'위에서 보면 쌓기나무가 놓인 자리만 보여요.':'그 방향에서 보면 줄마다 가장 높은 층까지 보여요.',viewDraw(H,[kd]),`${nm}에서 본 모양`); };
SKX.drawAll=()=>{ const H=skClear(5,9); return MQ('쌓기나무로 쌓은 모양을 위, 앞, 옆(오른쪽)에서 본 모양을 각각 그려 보세요.','위는 놓인 자리, 앞과 옆은 줄마다 가장 높은 층까지 칠해요.',viewDraw(H,['top','front','side']),'세 방향에서 본 모양'); };
SKX.pickView=()=>{ for(let t=0;t<200;t++){ const H=skClear(5,9), kd=rndPick('front','side'), nm={front:'앞',side:'옆(오른쪽)'}[kd]; const h=kd==='front'?skFront(H):skSide(H), o=kd==='front'?skSide(H):skFront(H), mir=h.slice().reverse(), top=skTop(H);
    const colsSvg=a=>skViewSvg('front',[[0,0,0],[0,0,0],a],22,1), cands=[[h.join(''),lab=>skTf(colsSvg(h),lab)],[o.join(''),lab=>skTf(colsSvg(o),lab),'G6-16'],[mir.join(''),lab=>skTf(colsSvg(mir),lab),'G6-16'],['T'+top.flat().join(''),lab=>skTf(skViewSvg('top',H,22,1),lab),'G6-16']];
    if(new Set(cands.map(c=>c[0])).size<3||cands.slice(1).some(c=>c[0]===cands[0][0])) continue; return mvPickQ(`쌓기나무로 쌓은 모양을 ${nm}에서 본 모양은 어느 것일까요?`,skIsoBox(H,170),cands); } return SKX.drawOne(); };
SKX.pickStack=()=>{ for(let t=0;t<100;t++){ const H=skClear(5,9), cands=[[H.flat().join(''),lab=>skTf(skIsoBox(H,112),lab)]]; for(let k=0;k<60&&cands.length<4;k++){ const D=skClear(Math.max(4,skSum(H)-1),skSum(H)+1); if(skViewsEq(D,H)||cands.some(c=>c[0]===D.flat().join(''))) continue; cands.push([D.flat().join(''),lab=>skTf(skIsoBox(D,112),lab),'G6-16']); } if(cands.length<3) continue;
    return mvPickQ('위, 앞, 옆에서 본 모양이 다음과 같은 쌓기나무 모양은 어느 것일까요?',`<div style="display:flex;gap:8px;align-items:flex-end">${skViewSvg('top',H,20)}${skViewSvg('front',H,20)}${skViewSvg('side',H,20)}</div>`,cands); } return SKX.drawAll(); };
SKX.count=()=>{ const H=skClear(6,11,'hidden'), N=skSum(H), mh=Math.max(...H.flat()); return WM('쌓기나무로 쌓은 모양이에요. 쌓기나무는 모두 몇 개일까요? (보이지 않는 곳에도 위층을 받치는 쌓기나무가 있어요.)',skCond(skBox(skIsoBox(H,180),'쌓은 모양')+skBox(skViewSvg('top',H),'위에서 본 모양')),N,[[H._vis,'G6-09'],[mh,'G6-20'],[H.flat().filter(x=>x).length,'G6-20']],'','개'); };
SKX.countEasy=()=>{ const H=skClear(4,8,'nohidden'), N=skSum(H); return WM('쌓기나무로 쌓은 모양이에요. 쌓기나무는 모두 몇 개일까요?',skCond(skBox(skIsoBox(H,180),'쌓은 모양')),N,[[Math.max(...H.flat()),'G6-20'],[H.flat().filter(x=>x).length,'G6-20'],[N+1,null]],'','개'); };
SKX.numTop=()=>{ const H=skClear(5,10); return MQ('쌓기나무로 쌓은 모양을 보고, 위에서 본 모양의 각 칸에 쌓인 쌓기나무의 수를 써 보세요.','칸마다 그 자리에 몇 층까지 쌓였는지 세어요.',numDraw(H),`모두 ${skSum(H)}개`); };
SKX.layer=()=>{ for(let t=0;t<200;t++){ const H=skClear(6,11), z=rndPick(1,2), n=H.flat().filter(x=>x>=z).length, n1=H.flat().filter(x=>x>=1).length, N=skSum(H); if(z===2&&n===0) continue; if(new Set([n,N,z===1?H.flat().filter(x=>x>=2).length:n1]).size<3) continue;
    return WM(`쌓기나무로 쌓은 모양이에요. ${z}층에 쌓인 쌓기나무는 몇 개일까요?`,skCond(skBox(skIsoBox(H,180),'쌓은 모양')+skBox(skViewSvg('top',H),'위에서 본 모양')),n,[[N,'G6-20'],[z===1?H.flat().filter(x=>x>=2).length:n1,null]],'','개'); } return SKX.count(); };
SKX.most=()=>{ for(let t=0;t<100;t++){ const Hs=[]; for(let k=0;k<60&&Hs.length<4;k++){ const D=skClear(4,10); if(Hs.some(x=>skSum(x)===skSum(D))) continue; Hs.push(D); } if(Hs.length<4) continue; Hs.sort((a,b)=>skSum(b)-skSum(a)); const tall=Hs.slice(1).reduce((b,x)=>Math.max(...x.flat())>Math.max(...b.flat())?x:b,Hs[1]), tallCode=Math.max(...tall.flat())>Math.max(...Hs[0].flat())?tall:null;
    return mvPickQ('쌓기나무를 가장 많이 써서 쌓은 모양은 어느 것일까요?','<span style="font-size:.9rem;color:#7B5632">보이지 않는 쌓기나무도 세어요</span>',Hs.map((D,i)=>[D.flat().join(''),lab=>skTf(skIsoBox(D,112),lab),i===0?undefined:(D===tallCode?'G6-20':(D._vis>=Hs[0]._vis?'G6-09':null))])); } return SKX.count(); };
SKX.cube=()=>{ for(let t=0;t<200;t++){ const H=[[0,0,0],[rnd(0,2),rnd(0,2),0],[rnd(1,2),rnd(0,2),0]]; const N=skSum(H); if(N<3||N>7||!skVisible(H).topOk) continue; if(H[1][0]===0&&H[1][1]===0&&H[2][1]===0) continue; return WM('쌓기나무로 쌓은 모양이에요. 여기에 쌓기나무를 더 쌓아 가로 2개, 세로 2개, 높이 2층인 정육면체 모양을 만들려면 몇 개가 더 필요할까요?',skCond(skBox(skIsoBox(H,170),'지금 쌓은 모양')),8-N,[[N,'N1-08'],[8,'N1-12'],[8-skVisible(H).vis,'G6-09']],'','개'); } return SKX.countEasy(); };
try{ const a64=G36['S6-64'], a65=G36['S6-65'], a02=G36['S6-02'];
  if(a64) a64.push(SKX.drawOne,SKX.pickView,SKX.drawAll,SKX.pickStack);
  if(a65) a65.push(SKX.count,SKX.numTop,SKX.layer,SKX.most,SKX.cube);
  if(a02) a02.push(SKX.countEasy);
}catch(e){}
window._SKX=SKX;


// ===== 3-60. 유형 넓히기 1차: 평가에서 자주 나오는 문항 유형 (교수님 11/22, 카본에게 국가수준 학업성취도 평가·기초학력 진단-보정·시도 단원평가의 유형 조사를 맡김) =====
// 문항을 옮기지 않고 유형의 구조만 가져와 수가 바뀌는 생성기로 만들었다. 새 틀은 모두 편의 맨 끝에 붙인다(틀 번호 유지).
// 오류 찾기 / 수 카드 / □에 들어갈 수 / 식에 맞는 상황 / 부분곱의 뜻 / 크기 순서 / 어림 판단 / 괄호 위치 / 타일(공배수) / 곱하면 커지나 / 소수 나머지 / 반올림 범위
// 수 배열표 조각 / 곱셈표 머릿수 / 달력 / 대응식 고르기 / 비율 비교 / 단위 고르기 / 삼각형 분류 세기 / ㄱ자 도형 둘레·넓이 / 걸린 시간 / 삼각자 각
// 표 빈칸 / 막대그래프 완성(조작) / 꺾은선 중간값 / 평균에서 빠진 값 / 가능성이 반인 것 / 비율로 전체 구하기
const cq=(q,vis,ans,wr)=>{ const A=String(ans), seen=new Set([A]), o=[A], mis={}; for(const [v,c] of shuffle(wr.slice()).sort((x,y)=>(x[1]?0:1)-(y[1]?0:1))){ if(v==null) continue; const s=String(v); if(seen.has(s)||o.length>=5) continue; seen.add(s); o.push(s); if(c) mis[s]=c; } const r=C36(WHO(),q,q,vis||' ',A,o); r.mis=mis; return r; };
const stepBox=lines=>`<div style="background:#FFF8EC;border:2px solid #EBD9BC;border-radius:12px;padding:8px 12px;text-align:left;color:#4A2E14;font-size:1.02rem;line-height:1.7">${lines.map(l=>`<div>${l}</div>`).join('')}</div>`;
const NT={};
/* --- 수와 연산 --- */
NT.errAdd=()=>{ let a,b; do{ a=rnd(125,489); b=rnd(125,489); }while((a%10+b%10)<10||(Math.floor(a/10)%10+Math.floor(b/10)%10+1)<10||a+b>999); const A=[a%10,Math.floor(a/10)%10,Math.floor(a/100)], B=[b%10,Math.floor(b/10)%10,Math.floor(b/100)], o=A[0]+B[0], t=A[1]+B[1]+1, h=A[2]+B[2]+1, who=rndPick('도토','람이'), e=rndPick(1,2);
  const L=[`㉠ 일의 자리: ${A[0]} + ${B[0]} = ${o} → ${o%10}을 쓰고 1을 올려요.`, e===1?`㉡ 십의 자리: ${A[1]} + ${B[1]} = ${t-1} → ${(t-1)%10}을 쓰고 1을 올려요.`:`㉡ 십의 자리: 1 + ${A[1]} + ${B[1]} = ${t} → ${t%10}을 쓰고 1을 올려요.`, e===2?`㉢ 백의 자리: ${A[2]} + ${B[2]} = ${h-1} → ${h-1}을 써요.`:`㉢ 백의 자리: 1 + ${A[2]} + ${B[2]} = ${h} → ${h}을 써요.`];
  return cq(`${who}가 ${a} + ${b}를 계산한 과정이에요. 처음으로 틀린 곳은 어디일까요?`,stepBox(L),e===1?'㉡':'㉢',[[e===1?'㉢':'㉡',e===1?'N2-01':null],['㉠',null]]); };
NT.errSub=()=>{ let a,b; do{ a=rnd(412,956); b=rnd(125,389); }while(a%10>=b%10||Math.floor(a/10)%10-1>=Math.floor(b/10)%10||Math.floor(a/10)%10===0||a-b<100); const A=[a%10,Math.floor(a/10)%10,Math.floor(a/100)], B=[b%10,Math.floor(b/10)%10,Math.floor(b/100)], who=rndPick('도토','람이'), e=rndPick(1,2);
  const L=[`㉠ 일의 자리: ${A[0]}에서 ${B[0]}을 뺄 수 없어 십의 자리에서 받아내려요. ${10+A[0]} − ${B[0]} = ${10+A[0]-B[0]}`, e===1?`㉡ 십의 자리: 백의 자리에서 받아내려요. ${10+A[1]} − ${B[1]} = ${10+A[1]-B[1]}`:`㉡ 십의 자리: 1을 내어 주어 ${A[1]-1}, 백의 자리에서 받아내려요. ${10+A[1]-1} − ${B[1]} = ${10+A[1]-1-B[1]}`, e===2?`㉢ 백의 자리: ${A[2]} − ${B[2]} = ${A[2]-B[2]}`:`㉢ 백의 자리: 1을 내어 주어 ${A[2]-1}. ${A[2]-1} − ${B[2]} = ${A[2]-1-B[2]}`];
  const r=cq(`${who}가 ${a} − ${b}를 계산한 과정이에요. 처음으로 틀린 곳은 어디일까요?`,stepBox(L),e===1?'㉡':'㉢',[[e===1?'㉢':'㉡',e===1?'N2-08':null],['㉠',null]]); return r; };
NT.cards=()=>{ const ds=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,2).concat(0).sort((x,y)=>y-x), big=ds[0]*100+ds[1]*10+ds[2], small=ds[1]*100+ds[2]*10+ds[0], kind=rndPick('small','diff','second'); const show=shuffle(ds.slice()).join(', ');
  if(kind==='small') return WM(`수 카드 ${show}을 한 번씩 모두 써서 만들 수 있는 가장 작은 세 자리 수는 얼마일까요?`,'',small,[[ds[1]*10+ds[0],'N5-12'],[big,'G2-15'],[ds[1]*100+ds[0]*10+ds[2],null]]);
  if(kind==='second'){ const second=ds[0]*100+ds[2]*10+ds[1]; return WM(`수 카드 ${show}을 한 번씩 모두 써서 만들 수 있는 세 자리 수 가운데 둘째로 큰 수는 얼마일까요?`,'',second,[[ds[1]*100+ds[0]*10+ds[2],null],[big,'D4-05'],[small,'G2-15']]); }
  return WM(`수 카드 ${show}을 한 번씩 모두 써서 만들 수 있는 가장 큰 세 자리 수와 가장 작은 세 자리 수의 차는 얼마일까요?`,'',big-small,[[big-(ds[1]*10+ds[0]),'N5-12'],[big,'N1-12'],[big+small,'N1-03']]); };
NT.boxMul=()=>{ const k=rnd(3,9), lim=rnd(k*3+1,k*9-1), kind=rndPick('max','count'); const mx=Math.floor((lim-1)/k); if(lim%k===0) return NT.boxMul();
  return kind==='max'?WM(`□ × ${k} 의 값이 ${lim}보다 작아요. 1부터 9까지의 수 가운데 □ 안에 들어갈 수 있는 가장 큰 수는 얼마일까요?`,'',mx,[[mx+1,'N1-07'],[mx*k,null],[1,null]]):WM(`□ × ${k} 의 값이 ${lim}보다 작아요. 1부터 9까지의 수 가운데 □ 안에 들어갈 수 있는 수는 모두 몇 개일까요?`,'',mx,[[mx+1,'N1-07'],[mx-1,'N1-07']],'','개'); };
NT.storyDiv=()=>{ const b=rnd(3,8), q=rnd(3,8), a=b*q; return cq('아래 식으로 답을 구할 수 있는 문제는 어느 것일까요?',`<div style="font-family:Jua;font-size:1.5rem;color:#4A2E14">${a} ÷ ${b}</div>`,`사탕 ${a}개를 ${b}명이 똑같이 나누어 가지면 한 명이 몇 개씩 가질까요?`,[[`사탕이 한 봉지에 ${a}개씩 ${b}봉지 있으면 모두 몇 개일까요?`,'N6-06'],[`사탕 ${a}개 가운데 ${b}개를 먹으면 몇 개가 남을까요?`,'N3-11'],[`사탕 ${a}개에 ${b}개를 더 사면 모두 몇 개일까요?`,null]]); };
NT.remMax=()=>{ const d=rnd(4,9), q=rnd(11,19); return WM(`□ ÷ ${d} = ${q} ⋯ △ 에서 나머지 △가 가장 클 때, □는 얼마일까요?`,'',d*q+d-1,[[d*q+d,'N3-02'],[d*q,'N3-15'],[d*q+q-1,null]]); };
NT.partProd=()=>{ const a=rnd(123,489), t=rnd(2,6), o=rnd(3,9), b=t*10+o; return cq(`${a} × ${b}를 세로로 계산할 때, 둘째 줄에 쓰는 ${a*t}는 실제로 얼마를 나타낼까요?`,stepBox([`${a} × ${o} = ${a*o} … 첫째 줄`,`${a} × ${t}□ = ${a*t} … 둘째 줄 (한 자리 왼쪽으로 옮겨 씀)`]),`${a} × ${t*10} = ${a*t*10}`,[[`${a} × ${t} = ${a*t}`,'N3-03'],[`${a} × ${o} = ${a*o}`,null],[`${a} × ${b} = ${a*b}`,null]]); };
NT.orderDec=()=>{ const x=rnd(3,8), a=`0.${x}`, b=`0.${x-1}${rnd(5,9)}`, c=`0.${x}0${rnd(1,9)}`; const right=[c,a,b]; /* 0.x0y > 0.x > 0.(x-1)y */
  return cq(`${shuffle([a,b,c]).join(', ')} 를 큰 수부터 차례로 쓴 것은 어느 것일까요?`,'',right.join(' > '),[[[c,b,a].join(' > '),'N4-02'],[[a,b,c].join(' > '),'N4-13'],[[b,a,c].join(' > '),null]]); };
NT.estBuy=()=>{ const p=[rnd(18,29)*100+rndPick(20,50,80,90), rnd(28,39)*100+rndPick(10,60,80), rnd(21,35)*100+rndPick(40,70,90)], up=p.reduce((s,v)=>s+Math.ceil(v/1000)*1000,0), dn=p.reduce((s,v)=>s+Math.floor(v/1000)*1000,0), can=rndPick(true,false), have=can?up:dn;
  /* 살 수 있다: 모두 올림해 어림한 값이 가진 돈 이하 / 살 수 없다: 모두 버림해 어림한 값이 이미 가진 돈만큼인데 실제 값은 그보다 크다. 까닭은 어림 전략으로만 댄다(실제 합을 계산하게 하지 않음) */
  const ok=can?`살 수 있다. 값을 모두 올림해 어림해도 ${up}원이라서`:`살 수 없다. 값을 모두 버림해 어림해도 ${dn}원인데, 실제 값은 그보다 커서`;
  const wr=can?[[`살 수 없다. 값을 모두 버림해 어림하면 ${dn}원이라서`,'N3-43'],[`살 수 없다. 값을 올림해 어림하면 실제 값보다 커져서`,null]]:[[`살 수 있다. 값을 모두 버림해 어림하면 ${dn}원이라서`,'N3-43'],[`살 수 있다. 값을 모두 올림해 어림하면 ${up}원이라서`,null]];
  return cq(`${p[0]}원, ${p[1]}원, ${p[2]}원짜리 물건을 하나씩 사려고 해요. ${have}원으로 모두 살 수 있는지 어림해 보세요.`,'',ok,wr); };
NT.paren=()=>{ const a=rnd(18,30), b=rnd(5,9), c=rnd(2,4), v1=a-b+c, v2=a-(b+c); return cq(`${a} − ${b} + ${c} 에 괄호를 넣어 계산 결과가 ${v2}가 되게 하려고 해요. 알맞은 식은 어느 것일까요?`,'',`${a} − (${b} + ${c})`,[[`(${a} − ${b}) + ${c}`,'N5-01'],[`${a} − ${b} + ${c}`,'N5-09'],[`(${a} − ${b} + ${c})`,null]]); };
NT.grow=()=>{ const base=rndPick('3.6','4.8','7.2'), items=[[`${base} × 0.8`,0],[`${base} × 1.2`,1],[`${base} ÷ 0.8`,1],[`${base} ÷ 1.2`,0]], pick=rndPick(1,2); const ans=items[pick][0], wrong=items.filter((_,i)=>i!==pick&&items[i][1]===0), other=items.find((x,i)=>i!==pick&&x[1]===1);
  return cq(`계산하지 않고 알아보세요. 계산 결과가 ${base}보다 커지는 식은 어느 것일까요?`,'',ans,[[wrong[0][0],/×/.test(wrong[0][0])?'N5-05':null],[wrong[1][0],/×/.test(wrong[1][0])?'N5-05':null],[`${base} × 1`,null]].filter(x=>x[0]!==other[0])); };
NT.decRem=()=>{ const d=rndPick(2.4,1.8,3.2,2.6), q=rnd(4,7), r=rndPick(0.2,0.4,0.6,0.8), tot=+(d*q+r).toFixed(1); if(r>=d) return NT.decRem(); return cq(`리본 ${tot} m를 한 도막에 ${d} m씩 자르려고 해요. 몇 도막이 되고, 몇 m가 남을까요?`,'',`${q}도막, ${r} m`,[[`${q}도막, ${Math.round(r*10)} m`,'N6-09'],[`${q+1}도막, ${r} m`,'N6-10'],[`${q}도막, ${+(r/10).toFixed(2)} m`,null]]); };
NT.roundRange=()=>{ const h=rnd(3,8)*100, kind=rndPick('max','min'); return kind==='max'?WM(`십의 자리에서 반올림하여 ${h}이 되는 자연수 가운데 가장 큰 수는 얼마일까요?`,'',h+49,[[h+50,'N5-16'],[h+4,'N5-14'],[h+99,null]]):WM(`십의 자리에서 반올림하여 ${h}이 되는 자연수 가운데 가장 작은 수는 얼마일까요?`,'',h-50,[[h-49,'N5-16'],[h-5,'N5-14'],[h,null]]); };
NT.bigJump=()=>{ const base=rnd(31,58)*100+rndPick(70,80,90), step=10, n=rnd(3,5), ans=base+step*n; if(Math.floor(ans/100)===Math.floor(base/100)) return NT.bigJump(); return cq(`${base}만에서 ${step}만씩 ${n}번 뛰어 센 수는 얼마일까요?`,'',`${ans}만`,[[`${base+100*n}만`,'N4-07'],[`${base+n}만`,'N4-07'],[`${base+step*(n-1)}만`,'N1-07']]); };
/* --- 변화와 관계 --- */
NT.hundPiece=()=>{ const c=rnd(12,78); if(c%10===0||c%10===9) return NT.hundPiece(); const dir=rndPick(['아래',10],['위',-10],['오른쪽 아래',11],['왼쪽 아래',9]); const g=[[-10],[ -1,0,1],[10]]; const cell=(v,q)=>`<td style="border:1.5px solid #B89A72;width:38px;height:34px;text-align:center;background:${q?'#FFF3C4':'#fff'};font-family:Jua">${q?'?':v}</td>`, emp='<td style="border:none"></td>';
  const tgt=c+dir[1]; const tbl=`<table style="border-collapse:collapse;margin:4px auto;color:#4A2E14;font-size:1.05rem"><tr>${emp}${cell(c-10,tgt===c-10)}${emp}</tr><tr>${cell(c-1,0)}${cell(c,0)}${cell(c+1,0)}</tr><tr>${cell(c+9,tgt===c+9)}${cell(c+10,tgt===c+10)}${cell(c+11,tgt===c+11)}</tr></table>`.replace(new RegExp(`>${c-10}<`),tgt===c-10?'>?<':'> <').replace(new RegExp(`>${c+9}<`),'> <').replace(new RegExp(`>${c+10}<`),'> <').replace(new RegExp(`>${c+11}<`),'> <').replace(new RegExp(`>${c-1}<`),'> <').replace(new RegExp(`>${c+1}<`),'> <');
  return WM(`1부터 100까지 적힌 수 배열표의 한 조각이에요. ?에 알맞은 수는 얼마일까요?`,`<div>${tbl}<div style="font-size:.85rem;color:#8A6A4A">수 배열표는 한 줄에 10칸이에요</div></div>`,tgt,[[c+(dir[1]>0?1:-1),'R1-03'],[dir[1]===11?c+10:dir[1]===9?c+10:c+dir[1]+1,null],[c+2,null]]); };
NT.mulHead=()=>{ const r=rnd(3,8), cs=shuffle([2,3,4,5,6,7,8,9]).slice(0,3).sort((x,y)=>x-y); const td=(v,h)=>`<td style="border:1.5px solid #B89A72;width:42px;height:34px;text-align:center;background:${h?'#FFE3B0':'#fff'};font-family:Jua">${v}</td>`;
  return WM('곱셈표의 일부예요. ㉠에 알맞은 수는 얼마일까요?',`<table style="border-collapse:collapse;margin:4px auto;color:#4A2E14;font-size:1.05rem"><tr>${td('×',1)}${td(cs[0],1)}${td(cs[1],1)}${td(cs[2],1)}</tr><tr>${td('㉠',1)}${td(r*cs[0],0)}${td(r*cs[1],0)}${td('',0)}</tr></table>`,r,[[r*cs[0]-cs[0],'N2-05'],[r*cs[1]-r*cs[0],'R4-01'],[r*cs[2],null]]); };
NT.calendar=()=>{ const days=['일','월','화','수','목','금','토'], d0=rnd(1,7), w0=rnd(0,6), k=rnd(2,3), extra=rnd(0,5), d1=d0+7*k+extra, w1=(w0+extra)%7; return cq(`어느 달 ${d0}일이 ${days[w0]}요일이에요. 같은 달 ${d1}일은 무슨 요일일까요?`,'',`${days[w1]}요일`,[[`${days[w0]}요일`,null],[`${days[(w1+1)%7]}요일`,'N1-07'],[`${days[(w1+6)%7]}요일`,'N1-07']].filter(x=>x[0]!==`${days[w1]}요일`)); };
NT.ruleExpr=()=>{ const a=rnd(2,5), b=rnd(1,4); const tab=cpTable(['1','2','3','4'],[a+b,2*a+b,3*a+b,4*a+b].map(String)); return cq('표를 보고 □와 △ 사이의 대응 관계를 식으로 바르게 나타낸 것을 고르세요.',cpWrap(tab),`△ = □ × ${a} + ${b}`,[[`△ = □ + ${a+b-1}`,'R5-03'],[`△ = □ × ${a+b}`,'R5-03'],[`△ = □ + ${a}`,'R5-02'],[`□ = △ × ${a} + ${b}`,'R5-01']]); };
NT.rateCmp=()=>{ const [n1,k1,n2,k2]=rndPick([20,12,25,14],[25,16,20,13],[10,8,20,15],[40,26,50,31],[20,14,50,34]); const r1=k1/n1, r2=k2/n2; const A=r1>r2?'가':'나'; return cq(`가 선수는 공을 ${n1}번 던져 ${k1}번 넣었고, 나 선수는 ${n2}번 던져 ${k2}번 넣었어요. 성공률이 더 높은 선수는 누구일까요?`,cpWrap(cpTable([String(n1),String(n2)],[String(k1),String(k2)],'던진 횟수','넣은 횟수').replace('<th','<th')),`${A} 선수 (${Math.round(Math.max(r1,r2)*100)}%)`,[[`${k1>k2?'가':'나'} 선수 (넣은 횟수가 더 많아서)`,'R6-02'],[`${A==='가'?'나':'가'} 선수 (${Math.round(Math.min(r1,r2)*100)}%)`,null],['두 선수의 성공률이 같다',null]]); };
/* --- 도형과 측정 --- */
NT.unitLen=()=>{ const [t,n,u,w]=rndPick(['교실 문의 높이는 약',2,'m',['cm','mm','km']],['연필의 길이는 약',15,'cm',['m','mm','km']],['서울에서 부산까지의 거리는 약',400,'km',['m','cm','mm']],['공책의 두께는 약',5,'mm',['cm','m','km']],['운동장 긴 쪽의 길이는 약',80,'m',['cm','km','mm']]); return cq(`${t} ${n} □예요. □ 안에 알맞은 단위는 어느 것일까요?`,'',u,w.map(x=>[x,'G3-07'])); };
const unitQ=L=>{ const [t,n,u,w]=rndPick(...L); return cq(`${t} ${n} □예요. □ 안에 알맞은 단위는 어느 것일까요?`,'',u,w.map(x=>[x,'G3-07'])); };
NT.unitW=()=>unitQ([['사과 한 개의 무게는 약',300,'g',['kg','mL','L']],['어른 한 명의 몸무게는 약',70,'kg',['g','L','mL']],['수박 한 통의 무게는 약',6,'kg',['g','L','mL']],['연필 한 자루의 무게는 약',5,'g',['kg','mL','L']]]);
NT.unitV=()=>unitQ([['종이컵에 담기는 물은 약',200,'mL',['L','g','kg']],['욕조에 담기는 물은 약',200,'L',['mL','kg','g']],['숟가락에 담기는 물은 약',5,'mL',['L','g','kg']],['양동이에 담기는 물은 약',10,'L',['mL','kg','g']]]);
NT.unitT=()=>unitQ([['트럭 한 대의 무게는 약',5,'t',['kg','g','L']],['코끼리 한 마리의 무게는 약',4,'t',['kg','g','L']],['자전거 한 대의 무게는 약',12,'kg',['t','g','L']]]);
function triAng(A,B,nm){ const C=180-A-B, L=84, ra=A*Math.PI/180, rb=B*Math.PI/180, h0=L/(1/Math.tan(ra)+1/Math.tan(rb)), px0=h0/Math.tan(ra); const xs=[0,L,px0], minx=Math.min(...xs), maxx=Math.max(...xs), sc=Math.min(96/(maxx-minx),70/h0), P=[[0,0],[L,0],[px0,h0]].map(([x,y])=>[8+(x-minx)*sc,84-y*sc]); let g=`<polygon points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2" stroke-linejoin="round"/>`; if(A===90) g+=`<path d="M${P[0][0]+9},${P[0][1]} v-9 h-9" fill="none" stroke="${GX_S}" stroke-width="1.4"/>`;
  return `<div style="width:118px;display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 112 90" width="112">${g}</svg><span style="font-size:.86rem;color:#4A2E14"><b>${nm}</b> ${A}°, ${B}°, ${C}°</span></div>`; }
NT.triCount=()=>{ const kind=rndPick('둔각삼각형','예각삼각형','직각삼각형'); const mk=k=>k==='둔각삼각형'?[rnd(4,7)*5,rnd(20,25)*5]:k==='직각삼각형'?[90,rnd(6,12)*5]:[rnd(11,15)*5,rnd(11,14)*5]; const kinds=shuffle(['둔각삼각형','예각삼각형','직각삼각형','둔각삼각형','예각삼각형','직각삼각형']).slice(0,5); const n=kinds.filter(k=>k===kind).length; if(n<1||n>3) return NT.triCount();
  const pics=kinds.map((k,i)=>{ const [A,B]=mk(k); return triAng(A,B,'가나다라마'[i]); }).join(''); const acuteLike=kinds.filter(k=>k!=='직각삼각형'&&k!==kind).length;
  return WM(`삼각형 가~마 가운데 ${kind}은 모두 몇 개일까요?`,`<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2px">${pics}</div>`,n,[[kind==='예각삼각형'?5:acuteLike||null,null],[5-n,null],[n+1,null]],'','개'); };
function lShape(W,H,w,h,ask){ const sc=Math.min(170/W,120/H), X=30, Y=16, P=[[0,0],[W-w,0],[W-w,h],[W,h],[W,H],[0,H]].map(([x,y])=>[X+x*sc,Y+y*sc]); let g=`<polygon points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`;
  g+=gxT(X+W*sc/2,Y+H*sc+15,W+' cm',11)+gxT(X-5,Y+H*sc/2+4,H+' cm',11,'#4A2E14','end')+gxT(X+(W-w/2)*sc,Y+h*sc-5,w+' cm',11,'#2F6FA8')+gxT(X+(W-w)*sc+5,Y+h*sc/2+4,h+' cm',11,'#2F6FA8','start'); return cpSvg(g,X+W*sc+24,Y+H*sc+24,280); }
NT.lPeri=()=>{ const W=rnd(8,12), H=rnd(6,9), w=rnd(2,W-4), h=rnd(2,H-3); return WM('도형의 둘레는 몇 cm일까요? (모든 각은 직각이에요.)',cpWrap(lShape(W,H,w,h)),2*(W+H),[[W+H+w+h,null],[W*H-w*h,'G5-01'],[2*(W+H)-w-h,null]],'','cm'); };
NT.lArea=()=>{ const W=rnd(8,12), H=rnd(6,9), w=rnd(2,W-4), h=rnd(2,H-3); return WM('도형의 넓이는 몇 cm²일까요? (모든 각은 직각이에요.)',cpWrap(lShape(W,H,w,h)),W*H-w*h,[[W*H,'N1-12'],[2*(W+H),'G5-01'],[W*H+w*h,null]],'','cm²'); };
NT.elapsed=()=>{ const h1=rnd(9,11), m1=rndPick(20,30,40,50), dur=rnd(1,3)*60+rndPick(15,25,35,45), end=h1*60+m1+dur, eh=Math.floor(end/60), em=end%60; if(eh<=12||m1+dur%60<60) return NT.elapsed(); const f=(h,m)=>`${h<12?'오전':'오후'} ${h%12||12}시${m?` ${m}분`:''}`;
  return cq(`${f(h1,m1)}부터 ${f(eh,em)}까지는 몇 시간 몇 분일까요?`,cpWrap(gxDay(h1,eh)),`${Math.floor(dur/60)}시간 ${dur%60}분`,[[`${Math.floor(dur/60)+1}시간 ${dur%60}분`,'G2-03'],[`${(eh%12||12)-h1<0?h1-(eh%12||12):Math.abs((eh%12||12)-h1)}시간 ${Math.abs(em-m1)}분`,'G2-11'],[`${Math.floor(dur/60)}시간 ${(dur%60+40)%60||10}분`,'G2-03']]); };
NT.setSquare=()=>{ const [a,b,op]=rndPick([45,30,'+'],[45,60,'+'],[90,30,'+'],[60,45,'−'],[90,45,'−'],[90,60,'−'],[45,30,'−']); const ans=op==='+'?a+b:a-b; return WM(`삼각자 두 개의 각 ${a}°와 ${b}°를 ${op==='+'?'이어 붙여':'겹쳐서 그 차이로'} 만든 각의 크기는 몇 도일까요?`,cpWrap(cpRow(gxAngle(a,a+'°'),cpOp(op==='+'?'+':'−'),gxAngle(b,b+'°'))),ans,[[op==='+'?a-b>0?a-b:b-a:a+b,'N1-03'],[180-ans,null],[a,null]],'','°'); };
/* --- 자료와 가능성 --- */
NT.tabFill=()=>{ const a=rnd(4,9), b=rnd(3,8), c=2*b, d=rnd(2,6), tot=a+b+c+d; const td=v=>`<td style="border:1.5px solid #B89A72;padding:3px 9px;text-align:center">${v}</td>`, th=v=>`<th style="border:1.5px solid #B89A72;padding:3px 8px;background:#FFF8EC">${v}</th>`;
  return WM('좋아하는 운동을 조사한 표예요. 축구를 좋아하는 학생은 농구를 좋아하는 학생의 2배예요. 축구를 좋아하는 학생은 몇 명일까요?',`<table style="border-collapse:collapse;margin:4px auto;font-family:Jua;background:#fff;color:#4A2E14"><tr>${th('운동')}${th('피구')}${th('농구')}${th('축구')}${th('줄넘기')}${th('합계')}</tr><tr>${th('학생 수')}${td(a)}${td('')}${td('')}${td(d)}${td(tot)}</tr></table>`,c,[[b,'N4-14'],[tot-a-d,'N1-12'],[Math.round((tot-a-d)/2),null]],'','명'); };
function barDraw(names,vals,unit){ const mx=Math.max(...vals.map(v=>v/unit))+2, u=22, w=40; let st=vals.map(()=>0);
  const svg=()=>{ let g=''; for(let k=0;k<=mx;k++){ g+=`<line x1="34" y1="${8+(mx-k)*u}" x2="${40+names.length*(w+10)}" y2="${8+(mx-k)*u}" stroke="#E5D3B5"/>`; if(k%2===0||mx<=6) g+=`<text x="30" y="${12+(mx-k)*u}" font-size="10" text-anchor="end" fill="#6B4A2A">${k*unit}</text>`; }
    names.forEach((n,i)=>{ const x=42+i*(w+10); for(let k=1;k<=mx;k++) g+=`<rect data-i="${i}" data-k="${k}" x="${x}" y="${8+(mx-k)*u}" width="${w}" height="${u}" fill="${k<=st[i]?'#F2A65A':'rgba(0,0,0,0)'}" stroke="${k<=st[i]?'#7A4A1E':'none'}" style="cursor:pointer"/>`; g+=`<text x="${x+w/2}" y="${8+mx*u+15}" font-size="11" text-anchor="middle" fill="#4A2E14">${n}</text>`; }); return `<svg viewBox="0 0 ${48+names.length*(w+10)} ${8+mx*u+22}" width="${48+names.length*(w+10)}" style="max-width:100%;background:#fff;border-radius:8px">${g}</svg>`; };
  const td=v=>`<td style="border:1.5px solid #B89A72;padding:2px 8px;text-align:center">${v}</td>`;
  const html=`<table style="border-collapse:collapse;margin:2px auto;font-family:Jua;background:#fff;color:#4A2E14"><tr>${names.map(td).join('')}</tr><tr>${vals.map(v=>td(v+'명')).join('')}</tr></table><div class="bdwrap" style="touch-action:manipulation">${svg()}</div><div style="font-size:.9rem;color:#7B5632">막대가 올라갈 칸을 눌러요. 세로 눈금 한 칸은 ${unit}명이에요.</div>`;
  return { html, mount(root){ root.querySelector('.bdwrap').addEventListener('click',e=>{ const el=e.target.closest&&e.target.closest('rect[data-i]'); if(!el) return; const i=+el.dataset.i, k=+el.dataset.k; st[i]=st[i]===k?k-1:k; try{ sfx('pop'); }catch(_){} root.querySelector('.bdwrap').innerHTML=svg(); }); },
    check:()=>st.every((v,i)=>v*unit===vals[i]), state:()=>st.join(','), mcode:()=>st.every((v,i)=>v===vals[i])&&unit>1?'D4-01':null,
    reveal(){ st=vals.map(v=>v/unit); const r=document.getElementById('manip'); if(r) r.querySelector('.bdwrap').innerHTML=svg(); } }; }
NT.barDraw=()=>{ const unit=rndPick(2,5), names=shuffle(['축구','피구','농구','수영','줄넘기']).slice(0,4), vals=names.map(()=>unit*rnd(1,6)); return MQ('표를 보고 막대그래프를 완성해 보세요.','세로 눈금 한 칸이 몇 명인지 먼저 확인해요.',barDraw(names,vals,unit),'막대그래프 완성'); };
NT.lineMid=()=>{ const t0=rnd(9,13), a=rnd(8,14), d=rndPick(4,6,8), b=a+d; return cq(`꺾은선그래프에서 ${t0}시의 기온은 ${a}도, ${t0+2}시의 기온은 ${b}도예요. 그래프의 선을 따라 읽으면 ${t0+1}시의 기온은 약 몇 도일까요?`,cpWrap(gxLine([a,b],[`${t0}시`,`${t0+2}시`])),`약 ${a+d/2}도`,[[`약 ${a}도`,null],[`약 ${b}도`,null],[`약 ${a+b}도`,'D5-04'],[`약 ${d}도`,'D4-04']]); };
NT.avgDrop=()=>{ const n=5, avg=rnd(78,88), out=avg+rndPick(-8,-4,4,8), rest=(avg*n-out)/(n-1); return WM(`${n}명의 수학 점수 평균은 ${avg}점이에요. 이 가운데 ${out}점인 학생 한 명을 빼면 나머지 ${n-1}명의 평균은 몇 점일까요?`,'',rest,[[avg,null],[avg*n-out,'D5-04'],[Math.round((avg+out)/2),'D5-02']],'','점'); };
NT.halfChance=()=>{ return cq('일이 일어날 가능성이 2분의 1(반반)인 것은 어느 것일까요?','',rndPick('동전을 던지면 숫자 면이 나올 것이다','주사위를 굴리면 짝수의 눈이 나올 것이다','흰 공 2개와 검은 공 2개가 든 주머니에서 흰 공을 꺼낼 것이다'),[['주사위를 굴리면 6의 눈이 나올 것이다','D5-05'],['내일 아침에 해가 동쪽에서 뜰 것이다','D5-06'],['주사위를 굴리면 7의 눈이 나올 것이다','D5-06'],['흰 공 1개와 검은 공 3개가 든 주머니에서 흰 공을 꺼낼 것이다','D5-05']]); };
NT.wholeFromPct=()=>{ const p=rndPick(20,25,40,50), part=rndPick(12,20,30,40,60), tot=part*100/p; if(tot!==Math.floor(tot)) return NT.wholeFromPct(); return WM(`원그래프에서 독서를 좋아하는 학생은 전체의 ${p}%이고 ${part}명이에요. 조사한 학생은 모두 몇 명일까요?`,cpWrap(pieSvg([{n:'독서',p,lab:`${p}% (${part}명)`,hi:1},{n:'',p:100-p,lab:''}])),tot,[[part*p/100===Math.floor(part*p/100)?part*p/100:null,'R6-01'],[part+p,null],[100,'D6-01']],'','명'); };
try{ const add=(ep,...gs)=>{ if(G36[ep]) for(const g of gs){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  /* 편 지도(claude/14)의 '배울 것'과 맞춰 배정. 도형과 측정은 앱의 편 번호(옛 번호: 밀기 22~25, 원 26~27, 삼각형·사각형·다각형 28~33, 시간·길이 34~39, 들이·무게 40~46, 각도 47~51) 기준 */
  add('S2-03',NT.errAdd); add('S2-06',NT.errSub); add('S2-07',NT.cards); add('S2-11',NT.boxMul); add('S2-08',NT.storyDiv); add('S3-33',NT.remMax); add('S3-45',NT.partProd); add('S3-58',NT.orderDec); add('S3-88',NT.estBuy); add('S3-66',NT.paren); add('S3-108',NT.grow); add('S3-112',NT.decRem); add('S3-87',NT.roundRange); add('S3-43',NT.bigJump);
  add('S5-03',NT.hundPiece); add('S5-04',NT.mulHead); add('S6-13',NT.calendar); add('S5-12',NT.ruleExpr); add('S5-16',NT.rateCmp);
  add('S6-38',NT.unitLen); add('S6-44',NT.unitW); add('S6-41',NT.unitV); add('S6-45',NT.unitT); add('S6-29',NT.triCount); add('S6-66',NT.lPeri); add('S6-68',NT.lArea); add('S6-36',NT.elapsed); add('S6-49',NT.setSquare);
  add('S4-06',NT.tabFill); add('S4-09',NT.barDraw); add('S4-11',NT.lineMid); add('S4-16',NT.avgDrop); add('S4-18',NT.halfChance); add('S4-21',NT.wholeFromPct);
}catch(e){}
window._NT=NT;

// ===== 3-61. 유형 넓히기 2차: 연산·도형·그래프·규칙성 골고루 (교수님 11/22 "연산 도형 그래프 규칙성 모두 다 다양하게") =====
// 틀린 이유 고르기 / 계산 결과 이용하기 / 수직선 눈금 / 식 세우기 / 여러 개의 분수 / 어림 곱 / 반복 무늬 몇째 / 자라는 무늬 / 대응 거꾸로 / 비 쓰기
// 크고 작은 사각형 세기 / 끈으로 정사각형 / 저울 이어 달기 / 정다각형 이름 / 길이 크기 비교 / 표 합계 빈칸 / 그림그래프로 나타내기 / 눈금 다른 두 그래프 / 띠 길이 / 원그래프 몇 배
const dotsSvg=(rows,w)=>{ const r=7, gap=18; const W=Math.max(...rows)*gap+8, H=rows.length*gap+6; let g=''; rows.forEach((n,y)=>{ for(let x=0;x<n;x++) g+=`<circle cx="${10+x*gap}" cy="${10+y*gap}" r="${r}" fill="#C98742" stroke="${GX_S}" stroke-width="1.2"/>`; }); return `<svg viewBox="0 0 ${W} ${H}" width="${w||W}" style="max-width:100%">${g}</svg>`; };
NT.fracSet=()=>{ const d=rndPick(3,4,5,6), per=rnd(2,4), n=d*per, k=rnd(2,d-1); let g=''; for(let i=0;i<d;i++){ const x=6+i*(per>3?46:40); g+=`<rect x="${x}" y="4" width="${per>3?40:34}" height="${per>2?52:34}" rx="8" fill="#FFF8EC" stroke="#D9B98A" stroke-dasharray="4 3"/>`; for(let j=0;j<per;j++) g+=`<circle cx="${x+11+(j%2)*(per>3?18:13)}" cy="${16+Math.floor(j/2)*20}" r="7" fill="#C98742" stroke="${GX_S}" stroke-width="1.2"/>`; }
  return WM(`도토리 ${n}개를 똑같이 ${d}묶음으로 나누었어요. ${n}의 ${d}분의 ${k}는 몇 개일까요?`,cpWrap(cpSvg(g,12+d*(per>3?46:40),62,300)),per*k,[[per,'N3-07'],[k,'N3-07'],[n-k,null]],'','개'); };
NT.mulEst=()=>{ const a=rndPick(19,21,29,31,38,41,49), b=rndPick(18,22,29,32,39), ra=Math.round(a/10)*10, rb=Math.round(b/10)*10; return cq(`한 상자에 귤이 ${a}개씩 들어 있어요. ${b}상자에 든 귤은 약 몇 개일지 어림해 보세요.`,'',`약 ${ra*rb}개`,[[`약 ${ra*rb/10}개`,'N3-12'],[`약 ${ra*rb*10}개`,'N3-12'],[`약 ${ra+rb}개`,'N2-05'],[Math.floor(a/10)*Math.floor(b/10)*100!==ra*rb?`약 ${Math.floor(a/10)*Math.floor(b/10)*100}개`:null,'N3-43']]); };
NT.fracWhy=()=>{ const d=rndPick(7,8,9,11), a=rnd(1,3), b=rnd(1,d-a-2), who=rndPick('도토','람이'); return cq(`${who}는 ${d}분의 ${a} + ${d}분의 ${b} = ${2*d}분의 ${a+b}(이)라고 계산했어요. 바르게 고쳐 준 말은 어느 것일까요?`,'',`분모는 그대로 두고 분자끼리만 더해요. 답은 ${d}분의 ${a+b}이에요.`,[[`틀린 곳이 없어요. 답은 ${2*d}분의 ${a+b}예요.`,'N4-04'],[`분자는 그대로 두고 분모끼리만 더해요. 답은 ${2*d}분의 ${a}예요.`,null],[`분자끼리 곱해요. 답은 ${d}분의 ${a*b}예요.`,null]]); };
NT.decLine=()=>{ const t=rnd(1,8), k=rnd(2,8); if(k===5) return NT.decLine(); const x0=24, L=260; let g=`<line x1="${x0-8}" y1="40" x2="${x0+L+8}" y2="40" stroke="${GX_S}" stroke-width="2"/>`; for(let i=0;i<=10;i++){ const x=x0+i*L/10, big=i===0||i===10; g+=`<line x1="${x}" y1="${big?28:33}" x2="${x}" y2="${big?52:47}" stroke="${GX_S}" stroke-width="${big?2:1.2}"/>`; } g+=gxT(x0,68,`0.${t}`,13)+gxT(x0+L,68,t===9?'1':`0.${t+1}`,13)+`<path d="M${x0+k*L/10},26 l-6,-12 h12 z" fill="${gxQ}"/>`+gxT(x0+k*L/10,11,'?',13,gxQ);
  return cq('수직선에서 ?가 가리키는 수는 얼마일까요?',cpWrap(cpSvg(g,x0+L+24,74,320)),`0.${t}${k}`,[[`0.${k}`,'N3-09'],[`${t}.${k}`,'N3-08'],[`0.${t+1}${k}`,null],[`0.${t}0${k}`,'N4-03']]); };
NT.mixStory=()=>{ const p=rndPick(600,700,800,900), n=rnd(2,4), q=rndPick(1200,1500,1800), pay=rndPick(5000,10000); if(p*n+q>=pay) return NT.mixStory(); return cq(`${pay}원을 내고 ${p}원짜리 공책 ${n}권과 ${q}원짜리 필통 1개를 샀어요. 거스름돈을 구하는 식은 어느 것일까요?`,'',`${pay} − (${p} × ${n} + ${q})`,[[`${pay} − ${p} × ${n} + ${q}`,'N5-09'],[`(${pay} − ${p}) × ${n} + ${q}`,'N5-01'],[`${pay} − (${p} + ${n} + ${q})`,'N2-05']]); };
NT.decMulUse=()=>{ const a=rndPick(23,27,34,36,43), b=rndPick(12,14,16,18,24), prod=a*b, f=v=>String(+v.toFixed(4)); return cq(`${a} × ${b} = ${prod} 예요. 이것을 이용하면 ${f(a/10)} × ${f(b/100)} 의 값은 얼마일까요?`,'',f(prod/1000),[[f(prod/100),'N5-07'],[f(prod/10),'N5-17'],[f(prod/10000),'N5-07']]); };
NT.decDivUse=()=>{ const b=rndPick(12,14,16,18,24), q=rndPick(23,27,34,36), a=b*q, f=v=>String(+v.toFixed(4)); return cq(`${a} ÷ ${b} = ${q} 예요. 이것을 이용하면 ${f(a/100)} ÷ ${f(b/10)} 의 값은 얼마일까요?`,'',f(q/10),[[String(q),'N6-07'],[f(q/100),'N6-07'],[String(q*10),null]]); };
/* --- 규칙성 --- */
NT.shapeNth=()=>{ const S=['🔴','🔺','🟦'], pat=rndPick([0,1,1],[0,0,1],[0,1,2],[0,1,2,2],[0,1]), n=rnd(9,14), ans=S[pat[(n-1)%pat.length]]; const row=Array.from({length:pat.length*2+1},(_,i)=>S[pat[i%pat.length]]).join(' '); const used=[...new Set(pat.map(i=>S[i]))];
  return cq(`규칙에 따라 모양을 늘어놓았어요. ${n}째에 올 모양은 무엇일까요?`,`<div style="font-size:1.3rem;letter-spacing:1px;white-space:nowrap">${row} …</div>`,ans,S.filter(x=>x!==ans).map(x=>[x,used.includes(x)?'R1-01':null])); };
NT.growDots=()=>{ const kind=rndPick('tri','sq','L'), f=kind==='tri'?k=>k*(k+1)/2:kind==='sq'?k=>k*k:k=>2*k-1, rows=k=>kind==='tri'?Array.from({length:k},(_,i)=>i+1):kind==='sq'?Array(k).fill(k):[...Array(k-1).fill(1),k], n=rndPick(5,6);
  const pics=[1,2,3,4].map(k=>`<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end">${dotsSvg(rows(k),Math.max(...rows(k))*13+6)}<span style="font-size:.82rem">${['첫째','둘째','셋째','넷째'][k-1]}</span></div>`).join('');
  return WM(`규칙에 따라 바둑돌을 놓았어요. ${n===5?'다섯째':'여섯째'}에 놓이는 바둑돌은 모두 몇 개일까요?`,`<div style="display:flex;gap:8px;justify-content:center;align-items:flex-end;flex-wrap:nowrap">${pics}</div>`,f(n),[[kind==='L'?null:f(4)+(f(4)-f(3))*(n-4),'R4-01'],[f(n-1),'N1-07'],[kind==='L'?2*n:f(n)+1,null]],'','개'); };
NT.corrBack=()=>{ const [thing,part,k]=rndPick(['세발자전거','바퀴',3],['자동차','바퀴',4],['문어','다리',8],['삼각형','꼭짓점',3],['오각형','변',5]), n=rnd(6,12); return WM(`${thing}의 수를 □, ${part}의 수를 △라고 할 때 △ = □ × ${k} 예요. ${part}의 수가 ${n*k}이면 ${thing}의 수는 몇 ${thing==='문어'?'마리':thing==='자동차'||thing==='세발자전거'?'대':'개'}일까요?`,cpWrap(cpTable(['1','2','3','…'],[k,2*k,3*k,'…'].map(String),thing,part)),n,[[n*k*k,'R5-01'],[n*k-k,'R5-02'],[n*k,null]]); };
NT.ratioWrite=()=>{ const a=rnd(8,14), b=rnd(11,18); if(a===b) return NT.ratioWrite(); return cq(`어느 반의 남학생은 ${a}명, 여학생은 ${b}명이에요. 반 전체 학생 수에 대한 여학생 수의 비는 어느 것일까요?`,'',`${b} : ${a+b}`,[[`${a+b} : ${b}`,'R6-01'],[`${b} : ${a}`,'R6-03'],[`${a} : ${a+b}`,null],[`${a} : ${b}`,'R6-03']]); };
/* --- 도형과 측정 --- */
NT.countRect=()=>{ const [c,r]=rndPick([2,1],[3,1],[4,1],[2,2]), ans=(c*(c+1)/2)*(r*(r+1)/2), u=44; let g=''; for(let y=0;y<r;y++) for(let x=0;x<c;x++) g+=`<rect x="${8+x*u*1.3}" y="${8+y*u}" width="${u*1.3}" height="${u}" fill="${GX_F}" stroke="${GX_S}" stroke-width="2"/>`;
  return WM('그림에서 찾을 수 있는 크고 작은 직사각형은 모두 몇 개일까요?',cpWrap(cpSvg(g,16+c*u*1.3,16+r*u,260)),ans,[[c*r,'N1-12'],[c*r+1,'N1-12'],[ans-1,'N1-07']],'','개'); };
NT.ropeSquare=()=>{ const s=rnd(4,12), L=4*s; return WM(`길이가 ${L} cm인 끈을 남김없이 써서 정사각형을 한 개 만들었어요. 이 정사각형의 넓이는 몇 cm²일까요?`,cpWrap(gxRect(1,1,{sq:true,wl:'? cm',hl:''})),s*s,[[s,'N1-12'],[L,'G5-01'],[(L/2)*(L/2),null]],'','cm²'); };
NT.balanceChain=()=>{ const a=rnd(2,3), b=rnd(2,3), [x,y,z]=rndPick(['수박','멜론','사과'],['배','사과','귤'],['필통','풀','지우개']); return WM(`${x} 1개의 무게는 ${y} ${a}개의 무게와 같고, ${y} 1개의 무게는 ${z} ${b}개의 무게와 같아요. ${x} 1개의 무게는 ${z} 몇 개의 무게와 같을까요?`,cpWrap(cpRow(gxBalance([x],Array(a).fill(y)),gxBalance([y],Array(b).fill(z)))),a*b,[[a+b,'N2-05'],[b,'N1-12'],[a,'N1-12']],'','개'); };
NT.polyName=()=>{ const N={5:'정오각형',6:'정육각형',7:'정칠각형',8:'정팔각형',9:'정구각형'}, n=rnd(5,9), s=rnd(3,8), w=[n-1,n+1].filter(v=>N[v]); return cq(`한 변의 길이가 ${s} cm이고 모든 변의 길이의 합이 ${s*n} cm인 정다각형의 이름은 무엇일까요?`,'',N[n],[...w.map(v=>[N[v],'N1-07']),['정사각형',null],['정삼각형',null]]); };
NT.longest=()=>{ const k=rnd(2,6), m=rnd(1,9)*10, A=[`${k} km ${m} m`,k*1000+m], B=[`${k*1000+m*10} m`,k*1000+m*10], C=[`${k} km ${m+5} m`,k*1000+m+5], D=[`${k*1000+m+m} m`,k*1000+2*m]; const all=[A,B,C,D].filter((x,i,a)=>a.findIndex(y=>y[1]===x[1])===i).sort((x,y)=>y[1]-x[1]); return cq('길이가 가장 긴 것은 어느 것일까요?','',all[0][0],all.slice(1).map(x=>[x[0],/km/.test(x[0])?'G3-05':null])); };
/* --- 자료와 가능성 --- */
NT.tabSum=()=>{ const names=shuffle(['사과','배','귤','포도','감']).slice(0,3), v=[rnd(3,8),rnd(2,7),rnd(3,8)], tot=v[0]+v[1]+v[2], hide=rnd(0,2); const td=x=>`<td style="border:1.5px solid #B89A72;padding:3px 10px;text-align:center">${x}</td>`, th=x=>`<th style="border:1.5px solid #B89A72;padding:3px 8px;background:#FFF8EC">${x}</th>`;
  return WM(`좋아하는 과일을 조사한 표예요. ${names[hide]}을(를) 좋아하는 학생은 몇 명일까요?`.replace(/(.)을\(를\)/,(m,c)=>c+(((c.charCodeAt(0)-44032)%28)?'을':'를')),`<table style="border-collapse:collapse;margin:4px auto;font-family:Jua;background:#fff;color:#4A2E14"><tr>${th('과일')}${names.map(th).join('')}${th('합계')}</tr><tr>${th('학생 수')}${v.map((x,i)=>td(i===hide?'':x)).join('')}${td(tot)}</tr></table>`,v[hide],[[tot,'N1-08'],[tot-v[(hide+1)%3],'N1-12'],[tot-v[(hide+2)%3],'N1-12']],'','명'); };
NT.pictoMake=()=>{ const t=rnd(2,5), o=rnd(2,8); if(t===o) return NT.pictoMake(); const n=t*10+o; return cq(`그림그래프에서 큰 그림은 10명, 작은 그림은 1명을 나타내요. ${n}명을 나타내려면 그림을 어떻게 그려야 할까요?`,cpWrap(gxPicto(1,1,10,1)),`큰 그림 ${t}개, 작은 그림 ${o}개`,[[`큰 그림 ${o}개, 작은 그림 ${t}개`,'D3-01'],[`작은 그림 ${t+o}개`,'D3-01'],[`큰 그림 ${t}개, 작은 그림 ${o*10}개`,null]]); };
const barCells=(n,nm,unit)=>{ const u=15, H=8, x0=30; let g=''; for(let k=0;k<=H;k++){ g+=`<line x1="${x0}" y1="${12+(H-k)*u}" x2="${x0+62}" y2="${12+(H-k)*u}" stroke="#D9C7A8"/>`; if(k===0||k===1) g+=gxT(x0-4,16+(H-k)*u,String(k*unit),10,'#6B4A2A','end'); } g+=`<rect x="${x0+16}" y="${12+(H-n)*u}" width="30" height="${n*u}" fill="#F2A65A" stroke="#7A4A1E" stroke-width="1.4"/>`+gxT(x0+31,12+H*u+15,nm,12)+gxT(x0-4,10,'(명)',9,'#6B4A2A','end'); return cpSvg(g,x0+70,12+H*u+22,130); };
NT.twoBars=()=>{ const u=rndPick(2,5), a=rnd(5,7), b=rnd(2,4); if(a===b*u) return NT.twoBars(); const A=a>b*u?'가':'나'; return cq('가 그래프의 세로 눈금 한 칸은 1명, 나 그래프의 세로 눈금 한 칸은 '+u+'명이에요. 학생이 더 많은 쪽은 어디일까요?',cpWrap(cpRow(barCells(a,'가',1),barCells(b,'나',u))),`${A} (${A==='가'?a:b*u}명)`,[[A==='나'?`가 (막대가 더 길어서)`:null,'D4-01'],[`${A==='가'?'나':'가'} (${A==='가'?b*u:a}명)`,A==='가'?null:null],['두 쪽이 같다',null],[A==='나'?`나 (${b}명)`:`가 (${a*u}명)`,'D4-01']]); };
NT.bandLen=()=>{ const L=rndPick(10,20,40), p=rndPick(15,25,30,35,45), ans=L*p/100; if(ans!==Math.floor(ans)) return NT.bandLen(); return WM(`전체 길이가 ${L} cm인 띠그래프에서 ${p}%를 차지하는 항목의 길이는 몇 cm일까요?`,cpWrap(bandSvg([{n:'동화책',p},{n:'그 밖의 책',p:100-p}],{ruler:true})),ans,[[p,'D6-03'],[L-ans,null],[Math.round(p/10),null]],'','cm'); };
NT.pieTimes=()=>{ const [a,b]=rndPick([30,15],[40,20],[45,15],[36,12],[40,10],[24,12]), rest=100-a-b; return WM(`원그래프에서 축구는 ${a}%, 농구는 ${b}%예요. 축구를 좋아하는 학생 수는 농구를 좋아하는 학생 수의 몇 배일까요?`,cpWrap(pieSvg([{n:'축구',p:a,lab:`축구 ${a}%`,hi:1},{n:'농구',p:b,lab:`농구 ${b}%`},{n:'',p:rest,lab:''}])),a/b,[[a-b,'R6-02'],[a+b,null],[a/b+1,'N1-07']],'','배'); };
/* --- 쌓기나무 개수(S6-65)에서 같은 틀이 여러 자리에 겹치던 것을 서로 다른 유형으로 (교수님 11/22) --- */
try{ const X=window._SKX||SKX;
  X.numCount=()=>{ const H=skClear(5,11), N=skSum(H), cells=H.flat().filter(x=>x).length; return WM('쌓기나무로 쌓은 모양을 위에서 본 모양에 수를 썼어요. 쌓기나무는 모두 몇 개일까요?',skCond(skBox(skNumSvg(H,30),'칸에 쓴 수는 그 자리에 쌓은 개수')),N,[[cells,'G6-20'],[Math.max(...H.flat()),'G6-20'],[N-1,null]],'','개'); };
  X.layerCount=()=>{ for(let t=0;t<200;t++){ const H=skClear(6,11), mh=Math.max(...H.flat()), N=skSum(H), n1=H.flat().filter(x=>x).length; if(mh<2||new Set([N,n1,mh]).size<3) continue; let pic=''; for(let z=1;z<=mh;z++) pic+=skBox(skLayerSvg(H,z),''); return WM('쌓기나무로 쌓은 모양을 층별로 나타냈어요. 쌓기나무는 모두 몇 개일까요?',skCond(pic),N,[[n1,'N1-12'],[mh,'G6-20'],[N+1,null]],'','개'); } return X.numCount(); };
  X.minCount=()=>{ for(let t=0;t<200;t++){ const H=skRand(5,9), sols=skSolutions(skTop(H)).filter(x=>skViewsEq(x,H)).map(skSum), mn=Math.min(...sols), mx=Math.max(...sols), ask=rndPick('min','max'); if(mn===mx||sols.length>40) continue; const cells=H.flat().filter(x=>x).length; return WM(`쌓기나무로 쌓은 모양을 위, 앞, 옆(오른쪽)에서 본 모양이에요. 쌓기나무를 가장 ${ask==='min'?'적게':'많이'} 써서 쌓으면 모두 몇 개일까요?`,skCond(skBox(skViewSvg('top',H),'')+skBox(skViewSvg('front',H),'')+skBox(skViewSvg('side',H),'')),ask==='min'?mn:mx,[[ask==='min'?mx:mn,'G6-10'],[cells,'G6-20'],[(ask==='min'?mn:mx)+(ask==='min'?-1:1),null]],'','개'); } return X.numCount(); };
  X.layer2=()=>{ for(let t=0;t<200;t++){ const H=skClear(6,11), z=rndPick(2,3), n=H.flat().filter(x=>x>=z).length, eq=H.flat().filter(x=>x===z).length, N=skSum(H); if(n<1||n===eq&&z===2||new Set([n,eq,N]).size<3) continue; return WM(`쌓기나무로 쌓은 모양을 위에서 본 모양에 수를 썼어요. ${z}층에 쌓인 쌓기나무는 몇 개일까요?`,skCond(skBox(skNumSvg(H,30),'칸에 쓴 수는 그 자리에 쌓은 개수')),n,[[eq,'G6-20'],[N,'G6-20'],[H.flat().filter(x=>x>=z).reduce((a,b)=>a+b,0),null]],'','개'); } return X.numCount(); };
  /* S6-64(여러 방향에서 본 모양)의 앞 두 자리는 원기둥·각기둥을 본 모양(다른 단원 내용)이었다 → 같은 자리에서 쌓기나무 유형으로 */
  X.viewNum=()=>{ for(let t=0;t<200;t++){ const H=skClear(5,10), kd=rndPick('front','side'), nm={front:'앞',side:'옆(오른쪽)'}[kd], h=kd==='front'?skFront(H):skSide(H), o=kd==='front'?skSide(H):skFront(H), mir=h.slice().reverse(), cnt=kd==='front'?[0,1,2].map(c=>H.filter(r=>r[c]>0).length):H.map(r=>r.filter(v=>v>0).length).reverse();
    const colsSvg=a=>skViewSvg('front',[[0,0,0],[0,0,0],a],22,1), cands=[[h.join(''),lab=>skTf(colsSvg(h),lab)],[o.join(''),lab=>skTf(colsSvg(o),lab),'G6-16'],[mir.join(''),lab=>skTf(colsSvg(mir),lab),'G6-16'],[cnt.join(''),lab=>skTf(colsSvg(cnt),lab),'G6-20']];
    if(new Set(cands.map(c=>c[0])).size<3||cands.slice(1).some(c=>c[0]===cands[0][0])||cands.some(c=>/^0|0$/.test(c[0])&&c[0]!==h.join('')&&false)) continue; return mvPickQ(`쌓기나무로 쌓은 모양을 위에서 본 모양에 수를 썼어요. ${nm}에서 본 모양은 어느 것일까요?`,skBox(skNumSvg(H,30),'앞이 아래쪽이에요'),cands); } return X.pickView(); };
  X.whichDir=()=>{ for(let t=0;t<200;t++){ const H=skClear(5,9), M={top:skMat('top',H),front:skMat('front',H),side:skMat('side',H)}; if(new Set(Object.values(M).map(m=>m.flat().join(''))).size<3) continue; const kd=rndPick('top','front','side'), nm={top:'위',front:'앞',side:'옆(오른쪽)'};
    const pic=kd==='top'?skViewSvg('top',H,22,1):skViewSvg('front',[[0,0,0],[0,0,0],kd==='front'?skFront(H):skSide(H)],22,1); const r=cq('쌓기나무로 쌓은 모양을 어느 방향에서 본 모양일까요?',skCond(skBox(skIsoBox(H,170),'쌓은 모양')+skBox(pic,'본 모양')),nm[kd],Object.keys(nm).filter(k=>k!==kd).map(k=>[nm[k],'G6-16'])); r.opts=['위','앞','옆(오른쪽)']; return r; } return X.pickView(); };
  { const a64=G36['S6-64']; if(a64&&a64.length>=2){ a64[0]=X.viewNum; a64[1]=X.whichDir; } }
  /* 겨냥도(S6-57)와 전개도(S6-58)에 서로 바뀌어 들어가 있던 틀 하나씩을 맞바꿈 */
  { const a=G36['S6-57'], b=G36['S6-58']; if(a&&b&&a[3]&&b[3]){ const t=a[3]; a[3]=b[3]; b[3]=t; } }
}catch(e){}
try{ const add=(ep,...gs)=>{ if(G36[ep]) for(const g of gs){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } };
  add('S3-35',NT.fracSet); add('S3-49',NT.mulEst); add('S3-51',NT.fracWhy); add('S3-56',NT.decLine); add('S3-66',NT.mixStory); add('S3-96',NT.decMulUse); add('S3-109',NT.decDivUse);
  add('S5-01',NT.shapeNth); add('S5-06',NT.growDots); add('S5-12',NT.corrBack); add('S5-13',NT.ratioWrite);
  add('S6-19',NT.countRect); add('S6-68',NT.ropeSquare); add('S6-43',NT.balanceChain); add('S6-32',NT.polyName); add('S6-39',NT.longest);
  add('S4-03',NT.tabSum); add('S4-07',NT.pictoMake); add('S4-10',NT.twoBars); add('S4-19',NT.bandLen); add('S4-20',NT.pieTimes);
}catch(e){}

// ===== 3-62. 1학년 모양 예시 넓히기 (교수님 11/22: 예시가 다양할수록 좋다) =====
// 입체(상자·둥근기둥·공)는 물건 10가지, 평면(세모·네모·동그라미)은 3가지뿐이었다 → 그림으로 그린 물건을 더해 입체 25가지·평면 19가지. 유형도 '어떤 모양?' 말고 '다른 하나 찾기', '○ 모양인 것 고르기'를 더함.
const SHP=(()=>{ const S='#6B3E1C', sv=g=>`<svg viewBox="0 0 100 100" width="84" height="84" stroke="${S}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${g}</svg>`;
  const box=(x,y,w,h,d,c1,c2,c3,ex='')=>`<polygon points="${x},${y} ${x+d},${y-d*0.6} ${x+w+d},${y-d*0.6} ${x+w},${y}" fill="${c2}"/><polygon points="${x+w},${y} ${x+w+d},${y-d*0.6} ${x+w+d},${y+h-d*0.6} ${x+w},${y+h}" fill="${c3}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c1}"/>${ex}`;
  const cyl=(cx,y,rx,ry,h,c1,c2,ex='')=>`<path d="M${cx-rx},${y} v${h} a${rx},${ry} 0 0 0 ${2*rx},0 v${-h} z" fill="${c1}"/><ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c2}"/>${ex}`;
  const lcyl=(x,cy,w,rx,ry,c1,c2,ex='')=>`<path d="M${x},${cy-ry} h${w} a${rx},${ry} 0 0 1 0,${2*ry} h${-w} z" fill="${c1}"/><ellipse cx="${x}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c2}"/>${ex}`;
  const ball=(r,c,ex='')=>`<circle cx="50" cy="52" r="${r}" fill="${c}"/>${ex}`;
  const D3={ '상자 모양':{
      '선물 상자':sv(box(16,40,52,44,22,'#F28B82','#F6AFA9','#D96C63',`<rect x="36" y="40" width="12" height="44" fill="#FFE082"/><polygon points="36,40 58,26.8 70,26.8 48,40" fill="#FFE082"/>`)),
      '택배 상자':sv(box(12,44,58,38,24,'#D9A46A','#E8BF8F','#B98448',`<line x1="41" y1="44" x2="65" y2="29.6" stroke-width="5" stroke="#F3E3C3"/><line x1="41" y1="44" x2="41" y2="58" stroke-width="5" stroke="#F3E3C3"/>`)),
      '벽돌':sv(box(10,52,62,24,22,'#C8634B','#DB8670','#A54B36')),
      '냉장고':sv(box(26,22,40,66,14,'#DCE6EE','#EEF3F7','#B9C7D3',`<line x1="26" y1="46" x2="66" y2="46"/><line x1="33" y1="32" x2="33" y2="40"/><line x1="33" y1="54" x2="33" y2="66"/>`)),
      '두부':sv(box(14,48,54,30,22,'#FFF8E7','#FFFDF5','#EADFC4')),
      '서랍장':sv(box(18,30,50,56,18,'#C79A62','#DDB98A','#A67B45',`<line x1="18" y1="49" x2="68" y2="49"/><line x1="18" y1="68" x2="68" y2="68"/><circle cx="43" cy="40" r="2" fill="${S}"/><circle cx="43" cy="59" r="2" fill="${S}"/><circle cx="43" cy="77" r="2" fill="${S}"/>`)) },
    '둥근기둥 모양':{
      '통조림':sv(cyl(50,30,28,9,46,'#C9D3DA','#E3E9ED',`<path d="M22,44 v20 a28,9 0 0 0 56,0 v-20 a28,9 0 0 1 -56,0 z" fill="#F2A65A"/>`)),
      '분필':sv(cyl(50,14,9,3.5,68,'#FFFFFF','#F1F1F1')),
      '통나무':sv(lcyl(24,54,52,9,20,'#B98448','#E8C99A',`<ellipse cx="24" cy="54" rx="5" ry="11" fill="none" stroke-width="1.5"/>`)),
      '김밥 한 줄':sv(lcyl(20,54,58,7,15,'#2E3B2F','#FFFFFF',`<circle cx="20" cy="54" r="3.5" fill="#F2A65A" stroke-width="1"/>`)),
      '연필꽂이':sv(cyl(50,34,24,8,46,'#8CC7E8','#5D9EC2')),
      '건전지':sv(cyl(50,24,15,5,58,'#F2C14E','#D9D9D9',`<path d="M35,24 v14 a15,5 0 0 0 30,0 v-14 a15,5 0 0 1 -30,0 z" fill="#4A4A4A"/>`)),
      '롤케이크':sv(lcyl(26,56,48,10,22,'#E9B373','#FFF3D6',`<path d="M26,56 m-5,0 a5,11 0 1 1 5,11" fill="none" stroke-width="1.5"/>`)) },
    '공 모양':{
      '농구공':ball(36,'#E8873A',''), '야구공':ball(30,'#FFFFFF',''), '탁구공':ball(20,'#FFB74D',''), '볼링공':ball(36,'#3F51B5',''), '비치볼':ball(36,'#FFFFFF',''), '눈덩이':ball(32,'#F3F8FC','') } };
  D3['공 모양']['농구공']=sv(ball(36,'#E8873A',`<path d="M14,52 h72 M50,16 v72 M24,27 q22,25 0,50 M76,27 q-22,25 0,50" fill="none" stroke-width="2"/>`));
  D3['공 모양']['야구공']=sv(ball(30,'#FFFFFF',`<path d="M32,29 q14,23 0,46 M68,29 q-14,23 0,46" fill="none" stroke="#D0443A" stroke-width="2" stroke-dasharray="3 3"/>`));
  D3['공 모양']['탁구공']=sv(ball(20,'#FFB74D',`<path d="M38,44 q6,-8 14,-8" fill="none" stroke="#FFF3D6" stroke-width="3"/>`));
  D3['공 모양']['볼링공']=sv(ball(36,'#3F51B5',`<circle cx="44" cy="38" r="3.5" fill="#1A237E"/><circle cx="56" cy="38" r="3.5" fill="#1A237E"/><circle cx="50" cy="48" r="3.5" fill="#1A237E"/>`));
  D3['공 모양']['비치볼']=sv(ball(36,'#FFFFFF',`<path d="M50,16 q-30,36 0,72 q-12,-36 0,-72 z" fill="#F28B82"/><path d="M50,16 q30,36 0,72 q12,-36 0,-72 z" fill="#8CC7E8"/>`));
  D3['공 모양']['눈덩이']=sv(ball(32,'#F3F8FC',`<path d="M34,40 q4,-8 12,-10" fill="none" stroke="#C9DCEA" stroke-width="2.5"/>`));
  const D2={ '동그라미':{
      '동전':sv(`<circle cx="50" cy="50" r="34" fill="#E3C46B"/><circle cx="50" cy="50" r="27" fill="none" stroke-width="1.5"/><text x="50" y="58" font-size="20" text-anchor="middle" fill="${S}" stroke="none" font-family="Jua">100</text>`),
      '접시':sv(`<circle cx="50" cy="50" r="36" fill="#FFFFFF"/><circle cx="50" cy="50" r="23" fill="#F4F4F4" stroke-width="1.5"/>`),
      '단추':sv(`<circle cx="50" cy="50" r="32" fill="#8CC7E8"/>${[[42,42],[58,42],[42,58],[58,58]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" stroke-width="1.5"/>`).join('')}`),
      '바퀴':sv(`<circle cx="50" cy="50" r="36" fill="#4A4A4A"/><circle cx="50" cy="50" r="24" fill="#E6E6E6"/><circle cx="50" cy="50" r="5" fill="#9E9E9E"/>${[0,60,120].map(a=>`<line x1="${50-24*Math.cos(a*Math.PI/180)}" y1="${50-24*Math.sin(a*Math.PI/180)}" x2="${50+24*Math.cos(a*Math.PI/180)}" y2="${50+24*Math.sin(a*Math.PI/180)}" stroke-width="1.5"/>`).join('')}`),
      '피자 한 판':sv(`<circle cx="50" cy="50" r="36" fill="#E9B373"/><circle cx="50" cy="50" r="29" fill="#F6D06B" stroke-width="1.5"/>${[[40,40],[60,44],[46,60],[62,62],[34,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="#D0443A" stroke-width="1"/>`).join('')}`),
      '훌라후프':sv(`<circle cx="50" cy="50" r="34" fill="none" stroke="#F28B82" stroke-width="7"/><circle cx="50" cy="50" r="37.5" fill="none" stroke-width="1.5"/><circle cx="50" cy="50" r="30.5" fill="none" stroke-width="1.5"/>`) },
    '세모':{
      '삼각자':sv(`<polygon points="18,82 82,82 18,18" fill="#BDE3F5"/><polygon points="30,70 56,70 30,44" fill="#FFF8EC" stroke-width="1.5"/>`),
      '교통 표지판':sv(`<polygon points="50,14 88,80 12,80" fill="#F6D06B" stroke="#D0443A" stroke-width="6"/><text x="50" y="70" font-size="34" text-anchor="middle" fill="${S}" stroke="none" font-family="Jua">!</text>`),
      '샌드위치':sv(`<polygon points="14,80 86,80 14,22" fill="#F4E2B8"/><polygon points="22,74 72,74 22,34" fill="#A6D98C" stroke-width="1.5"/><polygon points="26,70 62,70 26,41" fill="#F6AFA9" stroke-width="1.5"/>`),
      '트라이앵글':sv(`<polygon points="50,16 86,80 14,80" fill="none" stroke="#9E9E9E" stroke-width="7"/><polygon points="50,9 92,84 8,84" fill="none" stroke-width="1.5"/><polygon points="50,25 78,76 22,76" fill="none" stroke-width="1.5"/>`),
      '수박 한 조각':sv(`<polygon points="50,16 88,82 12,82" fill="#F2686B"/><polygon points="12,82 88,82 84,74 16,74" fill="#7CC36A" stroke-width="1.5"/>${[[50,44],[42,60],[58,60],[50,66]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="3" fill="${S}" stroke="none"/>`).join('')}`),
      '세모 깃발':sv(`<line x1="20" y1="12" x2="20" y2="90" stroke-width="4"/><polygon points="22,16 86,40 22,64" fill="#8CC7E8"/>`) },
    '네모':{
      '창문':sv(`<rect x="16" y="16" width="68" height="68" fill="#BDE3F5"/><line x1="50" y1="16" x2="50" y2="84"/><line x1="16" y1="50" x2="84" y2="50"/>`),
      '액자':sv(`<rect x="12" y="22" width="76" height="56" fill="#C79A62"/><rect x="21" y="31" width="58" height="38" fill="#EAF6E4" stroke-width="1.5"/><polygon points="26,66 44,44 56,58 64,50 76,66" fill="#A6D98C" stroke-width="1.5"/>`),
      '달력':sv(`<rect x="18" y="14" width="64" height="72" fill="#FFFFFF"/><rect x="18" y="14" width="64" height="16" fill="#F28B82"/>${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${26+c*13}" y="${38+r*14}" width="8" height="8" fill="#E6E6E6" stroke="none"/>`).join('')).join('')}`),
      '칠판':sv(`<rect x="8" y="24" width="84" height="52" fill="#3E7D5A" stroke="#C79A62" stroke-width="5"/><path d="M22,44 h26 M22,56 h40" stroke="#fff" stroke-width="2" fill="none"/>`),
      '색종이':sv(`<rect x="18" y="18" width="64" height="64" fill="#FFD54F"/>`),
      '스케치북':sv(`<rect x="16" y="20" width="68" height="64" fill="#FFF8EC"/>${[26,38,50,62,74].map(x=>`<circle cx="${x}" cy="20" r="3.5" fill="#fff" stroke-width="1.5"/>`).join('')}<path d="M30,62 q10,-22 20,-6 t20,-8" fill="none" stroke="#F2A65A" stroke-width="2.5"/>`) } };
  /* 사진이 있는 물건도 함께 */ const IMG3={'상자 모양':['주사위','휴지 상자','책','지우개'],'둥근기둥 모양':['풀통','음료수 캔','휴지심','북'],'공 모양':['축구공','구슬','수박']}, IMG2={'동그라미':['시계'],'세모':['삼각김밥'],'네모':['공책']};
  const pool=(D,I)=>{ const o={}; for(const k of Object.keys(D)){ o[k]=Object.entries(D[k]).map(([n,g])=>[n,g]); for(const n of (I[k]||[])) if(OBJN[n]) o[k].push([n,`<img class="objimg" src="img/obj/${OBJN[n]}.webp" alt="" style="width:84px;height:84px;object-fit:contain">`]); } return o; };
  return {P3:pool(D3,IMG3),P2:pool(D2,IMG2)}; })();
const shpFig=([n,g],w)=>`<figure style="margin:0;display:flex;flex-direction:column;align-items:center">${g}<figcaption style="font-size:.9rem;color:#4A2E14">${n}</figcaption></figure>`;
const eunneun=o=>((o.charCodeAt(o.length-1)-0xAC00)%28)?'은':'는';
function shpQs(P,code,isFlat){ const kinds=Object.keys(P), nm=k=>isFlat?k+' 모양':k;
  const what=()=>{ const k=rndPick(...kinds), it=rndPick(...P[k]); const r=C36(WHO(),`${it[0]}${eunneun(it[0])} 어떤 모양일까요?`,`${it[0]}${eunneun(it[0])} 어떤 모양일까요?`,`<div class="objrow">${shpFig(it)}</div>`,k,kinds.slice()); r.mis={}; kinds.filter(x=>x!==k).forEach(x=>r.mis[x]=code); return r; };
  const odd=()=>{ const [a,b]=shuffle(kinds.slice()), same=shuffle(P[a].slice()).slice(0,3), other=rndPick(...P[b]); const cands=[[other[0],lab=>`<div class="tf">${shpFig(other)}<b>${lab}</b></div>`],...same.map(it=>[it[0],lab=>`<div class="tf">${shpFig(it)}<b>${lab}</b></div>`,code])]; return mvPickQ('모양이 같은 것끼리 모았어요. 모양이 다른 하나는 어느 것일까요?','',cands); };
  const pick=()=>{ const k=rndPick(...kinds), right=rndPick(...P[k]), others=kinds.filter(x=>x!==k).map(x=>rndPick(...P[x])); const cands=[[right[0],lab=>`<div class="tf">${shpFig(right)}<b>${lab}</b></div>`],...others.map(it=>[it[0],lab=>`<div class="tf">${shpFig(it)}<b>${lab}</b></div>`,code])]; return mvPickQ(`${nm(k)}인 것은 어느 것일까요?`,'',cands); };
  return [what,odd,pick]; }
try{ const A=shpQs(SHP.P3,'G1-01',false), B=shpQs(SHP.P2,'G1-02',true); window._SHPQ={A,B,P3:SHP.P3,P2:SHP.P2};
  if(G36['S6-01']) G36['S6-01'].push(...A); if(G36['S6-03']) G36['S6-03'].push(...B);
}catch(e){}

// ===== 3-63. 수 범위: (세 자리)÷(한 자리) 편(S3-32)에 네 자리 수가 나오던 것 (평가 점검 11/22) =====
try{ if(G36['S3-32']) G36['S3-32']=G36['S3-32'].map(g=>function(){ let q; for(let t=0;t<30;t++){ q=g.apply(this,arguments); if(!q||!/(^|[^\d.])\d{4,}/.test(String(q.q).replace(/<[^>]+>/g,' '))) break; } return q; }); }catch(e){}

// ===== 3-64. 틀이 적은 편·고르기만 있는 편 보강 (평가 뒤 과제 1, 교수님 11/22 "지금 해도 되잖아") =====
// 틀 3개 이하인 48편과 보기형만 있는 26편에 직접 써서 답하는 유형을 중심으로 1~3개씩 더함(카본과 유형을 맞춰 봄: 조건에 맞는 수·경계값·거꾸로 묻기·틀린 계산 고치기).
const NX={}, _W=(q,ans,wr,post,vis)=>WM(q,vis||'',ans,wr,'',post||''), _gcdN=(a,b)=>{ while(b){ [a,b]=[b,a%b]; } return a; }, _lcmN=(a,b)=>a*b/_gcdN(a,b);
/* 3-1 나눗셈·곱셈 */
NX['S2-09']=[()=>{ const b=rnd(3,7), q=rnd(3,6); return _W(`${b*q} − ${Array(q).fill(b).join(' − ')} = 0 이에요. 이것을 나눗셈식으로 나타내면 ${b*q} ÷ ${b} = □ 예요. □에 알맞은 수는 얼마일까요?`,q,[[b,'N2-10'],[b*q-b,'N3-11']]); },
  ()=>{ let b=rnd(2,6), q=rnd(3,8); if(b===q) q++; const a=b*q; return cq(`바둑돌 ${a}개를 ${b}개씩 묶었더니 ${q}묶음이 되었어요. 알맞은 나눗셈식은 어느 것일까요?`,'',`${a} ÷ ${b} = ${q}`,[[`${a} ÷ ${q} = ${b}`,'N2-10'],[`${a} − ${b} = ${a-b}`,'N3-11'],[`${a} + ${b} = ${a+b}`,null]]); }];
NX['S2-10']=[()=>{ let a=rnd(3,9), b=rnd(2,9); if(a===b) b=a===9?8:a+1; return _W(`${a} × ${b} = ${a*b} 를 보고 □에 알맞은 수를 구해 보세요. ${a*b} ÷ ${a} = □`,b,[[a,'N3-01'],[a*b-a,'N3-11']]); },
  ()=>{ let a=rnd(3,7), b=rnd(2,6); if(a===b) b++; const t=a*b; return cq(`구슬이 ${a}개씩 ${b}줄 있어요(모두 ${t}개). 알맞지 않은 식은 어느 것일까요?`,'',`${t} ÷ ${a} = ${a}`,[[`${a} × ${b} = ${t}`,null],[`${t} ÷ ${a} = ${b}`,null],[`${t} ÷ ${b} = ${a}`,null]]); }];
NX['S2-12']=[()=>{ const a=rnd(2,9), b=rnd(2,9); return _W(`십 모형이 ${a}개씩 ${b}묶음 있어요. 모두 얼마일까요?`,a*10*b,[[a*b,'N3-12'],[a*10+b*10,'N2-05']]); },
  ()=>{ const a=rnd(2,9), b=rnd(2,9); return _W(`□ × ${b} = ${a*10*b} 에서 □에 알맞은 수는 얼마일까요?`,a*10,[[a,'N3-12'],[a*100,'N3-12']]); }];
/* 분수(3학년) */
NX['S3-19']=[()=>{ const d=rnd(7,12), a=rnd(2,d-4); return _W(`${d}분의 ${a}보다 크고 ${d}분의 ${a+2}보다 작은 분수는 ${d}분의 □ 예요. □에 알맞은 수는 얼마일까요?`,a+1,[[a+3,'G2-15'],[a-1,'G2-15'],[d,null]]); },
  ()=>{ const d=rnd(6,11), k=rnd(2,d-3); return _W(`분모가 ${d}인 분수 가운데 ${d}분의 ${k}보다 크고 1보다 작은 분수는 모두 몇 개일까요?`,d-1-k,[[d-k,'N1-07'],[d-k-2,'N1-07'],[d-1,null]],'개'); }];
NX['S3-20']=[()=>{ const a=rnd(2,8); return _W(`${a}분의 1보다 작고 ${a+2}분의 1보다 큰 단위분수는 □분의 1이에요. □에 알맞은 수는 얼마일까요?`,a+1,[[a-1,'N3-06'],[a+3,'N3-06']]); }];
NX['S3-30']=[()=>{ const d=rnd(4,9); return _W(`어떤 수를 ${d}로 나누었을 때 나머지가 될 수 있는 수 가운데 가장 큰 수는 얼마일까요?`,d-1,[[d,'N3-02'],[d+1,'N3-02'],[1,null]]); },
  ()=>{ const d=rnd(3,9); return _W(`어떤 수를 ${d}로 나누었을 때 나머지가 될 수 있는 수는 0, 1, 2, …처럼 모두 몇 가지일까요?`,d,[[d-1,'N1-07'],[d+1,'N3-02']],'가지'); }];
NX['S3-34']=[()=>{ const g=rnd(2,5), m=rnd(3,6), k=rnd(2,m-1), n=g*m; return _W(`구슬 ${n}개를 ${g}개씩 묶으면 ${m}묶음이 돼요. ${g*k}개는 전체의 ${m}분의 □ 예요. □에 알맞은 수는 얼마일까요?`,k,[[g*k,'N3-07'],[g,'N3-07']]); },
  ()=>{ const g=rnd(2,5), m=rnd(3,7), n=g*m; return _W(`사탕 ${n}개를 ${g}개씩 묶었어요. ${g}개는 전체의 □분의 1이에요. □에 알맞은 수는 얼마일까요?`,m,[[n,'N3-07'],[g,'N3-07']]); }];
NX['S3-36']=[()=>{ const d=rnd(5,12); return _W(`분모가 ${d}인 진분수 가운데 가장 큰 분수의 분자는 얼마일까요?`,d-1,[[d,null],[d+1,null],[1,'G2-15']]); },
  ()=>{ const d=rnd(4,12); return _W(`분모가 ${d}인 가분수 가운데 가장 작은 분수의 분자는 얼마일까요?`,d,[[d+1,null],[d-1,null],[1,null]]); },
  ()=>{ const d=rnd(3,8), n=rnd(2,5); return _W(`자연수 ${n}을 분모가 ${d}인 가분수로 나타내면 ${d}분의 □ 예요. □에 알맞은 수는 얼마일까요?`,n*d,[[n,null],[n+d,'N2-05']]); }];
NX['S3-38']=[()=>{ const d=rnd(4,8), w=rnd(1,3), k=rnd(2,d-1); return _W(`${d}분의 □ 는 ${w}과(와) ${d}분의 ${k}보다 작은 가분수예요. □에 들어갈 수 있는 가장 큰 수는 얼마일까요?`.replace(/(\d)과\(와\)/,(m,c)=>c+('136780'.includes(c)?'과':'와')),w*d+k-1,[[w*d+k,'N1-07'],[k-1,null],[w*d,null]]); }];
/* 큰 수(4-1) */
NX['S3-39']=[()=>{ const [a,b]=rndPick([9990,10],[9900,100],[9000,1000],[9999,1]); return _W(`${a}보다 ${b}만큼 더 큰 수는 얼마일까요?`,10000,[[b>1?+(String(a).slice(0,5-String(b).length)+String(b)):10001,'N4-07'],[1000,'N4-07'],[100000,'N4-07']]); },
  ()=>{ const [a,b]=rndPick([9990,10],[9900,100],[9000,1000]); return _W(`10000은 ${a}보다 □만큼 더 큰 수예요. □에 알맞은 수는 얼마일까요?`,b,[10,100,1000].filter(x=>x!==b).map(x=>[x,'N4-07'])); }];
NX['S3-41']=[()=>{ const ds=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4), N=+(ds.join('')+'0000'), i=rnd(0,3), v=ds[i]*Math.pow(10,7-i); return _W(`${N}에서 숫자 ${ds[i]}가 나타내는 값은 얼마일까요?`.replace(/(\d)가 나타/,(m,c)=>c+('136780'.includes(c)?'이':'가')+' 나타'),v,[[ds[(i+1)%4]*Math.pow(10,7-i),'N4-15'],[v/10,'N4-09'],[v*10,'N4-09'],[ds[i],'N4-15']]); }];
NX['S3-42']=[()=>{ const n=rndPick(20,30,50,70); return _W(`1000만이 ${n}개인 수는 몇 억일까요?`,n/10,[[n,'N4-07'],[n*10,'N4-07']],'억'); },
  ()=>{ const [a,b,k]=rndPick(['1억','1000만',10],['1억','100만',100],['1조','1000억',10],['1조','100억',100],['1억','10만',1000]); return _W(`${a}은(는) ${b}의 몇 배일까요?`.replace('1억은(는)','1억은').replace('1조은(는)','1조는'),k,[10,100,1000,10000].filter(x=>x!==k).slice(0,3).map(x=>[x,'N4-07']),'배'); }];
NX['S3-43']=[()=>{ const st=rndPick(10,100,1000), s=rnd(2,6)*1000+rnd(1,8)*st; if(s+3*st>9999) return NX['S3-43'][0](); return _W(`규칙에 따라 뛰어 세었어요. ${s}만, ${s+st}만, ${s+2*st}만, □만. □에 알맞은 수는 얼마일까요?`,s+3*st,[[s+4*st,'N1-07'],[s+2*st+st/10,'N4-07'],[s+2*st+1,null]]); },
  ()=>{ const x=rnd(12,90)*100+rndPick(10,40,70), n=rnd(2,4); return _W(`어떤 수에서 100만씩 ${n}번 뛰어 세었더니 ${x}만이 되었어요. 어떤 수는 몇 만일까요?`,x-100*n,[[x+100*n,'G2-15'],[x-100,'N1-12'],[x-10*n,'N4-07']],'만'); }];
NX['S3-44']=[()=>{ const p=rnd(12,98), d=rnd(3,8), q=rnd(100,999)*10; return _W(`${p}□${q} 은(는) ${p}${d}${q} 보다 작은 수예요. □에 들어갈 수 있는 가장 큰 숫자는 얼마일까요?`.replace(' 은(는)','은'),d-1,[[d,'N1-07'],[9,'G2-15'],[d+1,'G2-15']]); }];
NX['S3-49']=[()=>{ const [h,d]=rndPick([6,3],[8,4],[9,3],[8,2],[6,2],[4,2]), a=h*100+rnd(3,18); return _W(`${a} ÷ ${d} 를 어림하려고 해요. ${a}을(를) 약 ${h*100}으로 보면 몫은 약 얼마일까요?`.replace(/(\d)을\(를\)/,(m,c)=>c+('136780'.includes(c)?'을':'를')),h*100/d,[[h-d!==h/d?(h-d)*100:null,'N3-11'],[h*10/d,'N3-12'],[h*1000/d,'N3-12']]); }];
NX['S3-50']=[()=>{ const d=rndPick(12,15,18,24), q=rnd(3,7), r=rnd(2,d-2), n=d*q+r; return _W(`학생 ${n}명이 한 번에 ${d}명씩 탈 수 있는 배를 타려고 해요. 모두 타려면 배는 적어도 몇 번 다녀야 할까요?`,q+1,[[q,'N4-12'],[r,'N4-16']],'번'); },
  ()=>{ const d=rndPick(12,15,25,32), q=rnd(3,8), r=rnd(2,d-2), n=d*q+r; return _W(`리본 ${n} cm로 한 개에 ${d} cm씩 쓰는 매듭을 만들어요. 매듭은 몇 개까지 만들 수 있을까요?`,q,[[q+1,'N4-12'],[r,'N4-16']],'개'); }];
/* 소수(4-2) */
NX['S3-57']=[()=>{ const a=rnd(1,8), b=rnd(1,9), d=rnd(1,9); return cq(`1이 ${a}개, 0.1이 ${b}개, 0.001이 ${d}개인 수는 얼마일까요?`,'',`${a}.${b}0${d}`,[[`${a}.${b}${d}`,'N4-01'],[`${a}.0${b}${d}`,null],[`${a}${b}.${d}`,'N3-08']]); },
  ()=>{ const ds=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4); return _W(`${ds[0]}.${ds[1]}${ds[2]}${ds[3]}에서 소수 셋째 자리 숫자는 얼마일까요?`,ds[3],[[ds[1],'N4-09'],[ds[2],'N4-09'],[ds[0],null]]); }];
NX['S3-58']=[()=>{ const t=rnd(1,8), s=rnd(2,7); return _W(`0.${t}${s}보다 크고 0.${t+1}보다 작은 소수 두 자리 수는 모두 몇 개일까요?`,9-s,[[10-s,'N1-07'],[8-s>0?8-s:null,'N1-07'],[0,'N4-13']],'개'); }];
NX['S3-59']=[()=>{ const x=rnd(2,9); return _W(`□의 10분의 1은 0.${x}예요. □에 알맞은 수는 얼마일까요?`,x,[[x*10,'N4-07'],[x*100,'N4-07']]); },
  ()=>{ const x=rnd(12,98), k=rndPick(10,100); if(x%10===0) return NX['S3-59'][1](); const f=v=>String(+v.toFixed(4)); return _W(`${f(x/10/k)}의 몇 배가 ${f(x/10)}일까요?`,k,[10,100,1000].filter(v=>v!==k).map(v=>[v,'N4-07']),'배'); }];
NX['S3-60']=[()=>{ const a=rnd(4,9), b=rnd(4,9); return _W(`0.1이 ${a}개인 수와 0.1이 ${b}개인 수를 더하면 0.1이 모두 몇 개인 수가 될까요?`,a+b,[[(a+b)*10,'N3-08'],[a*b,'N2-05']],'개'); },
  ()=>{ const a=rnd(5,9), b=rnd(5,9), who=rndPick('도토','람이'); return cq(`${who}는 0.${a} + 0.${b} = 0.${a+b} 라고 계산했어요. 바르게 계산한 값은 얼마일까요?`,'',`1.${a+b-10}`,[[`0.${a+b}`,'N3-08'],[`${a+b}`,'N3-08'],[`1.0${a+b-10}`,null]]); }];
/* 5-1 */
NX['S3-63']=[()=>{ const b=rnd(5,12), c=rnd(3,9), a=b+c+rnd(8,25); return _W(`버스에 ${a}명이 타고 있었어요. 정류장에서 ${b}명이 내리고 ${c}명이 탔어요. 지금 버스에 탄 사람은 몇 명일까요?`,a-b+c,[[a-b-c,'N5-09'],[a+b+c,'N1-03'],[a-b,'N1-12']],'명'); }];
NX['S3-64']=[()=>{ const b=rnd(3,6), q=rnd(3,8), c=rnd(2,4); return _W(`연필 ${b*q}자루를 ${b}명이 똑같이 나누어 가졌어요. 한 명이 가진 연필 수의 ${c}배는 몇 자루일까요?`,q*c,[[q,'N1-12'],[b*q*c,'N1-12']],'자루'); },
  ()=>{ const b=rndPick(2,3,4), c=rndPick(2,3), a=b*c*rnd(2,5); return cq(`${a} ÷ ${b} × ${c} 에서 가장 먼저 계산해야 하는 곳은 어디일까요?`,'',`${a} ÷ ${b}`,[[`${b} × ${c}`,'N5-09'],[`${a} × ${c}`,null]]); }];
NX['S3-68']=[()=>{ const [n,a]=rndPick([12,6],[18,9],[20,10],[28,14],[15,5],[21,7],[27,9],[16,8]); return _W(`${n}의 약수 가운데 둘째로 큰 수는 얼마일까요?`,a,[[n,'D4-05'],[n-1,null]]); }];
NX['S3-69']=[()=>{ const k=rnd(3,9), N=rndPick(30,40,50,60); return _W(`1부터 ${N}까지의 수 가운데 ${k}의 배수는 모두 몇 개일까요?`,Math.floor(N/k),[[Math.floor(N/k)+1,'N1-07'],[Math.floor(N/k)-1,'N1-07']],'개'); },
  ()=>{ const k=rnd(4,9), a=rnd(3,6)*10, b=a+rndPick(20,30), big=Math.floor((b-1)/k)*k; return _W(`${a}보다 크고 ${b}보다 작은 수 가운데 가장 큰 ${k}의 배수는 얼마일까요?`,big,[[big-k,'N5-12'],[big+k,'N5-16']]); }];
NX['S3-70']=[()=>{ const a=rnd(3,9), b=rnd(3,9); return _W(`${a*b}는 ${a}의 배수예요. ${a*b} = ${a} × □ 에서 □에 알맞은 수는 얼마일까요?`.replace(/(\d)는 /,(m,c)=>c+('136780'.includes(c)?'은 ':'는 ')),b,[[a*b-a,'N3-11'],[a,null]]); }];
NX['S3-73']=[()=>{ const [a,b]=rndPick([12,18],[16,24],[20,30],[18,27],[24,36],[15,25]), g=_gcdN(a,b); return _W(`가로 ${a} cm, 세로 ${b} cm인 종이를 남김없이 잘라 크기가 같은 가장 큰 정사각형을 여러 개 만들려고 해요. 정사각형의 한 변은 몇 cm일까요?`,g,[[_lcmN(a,b),'N5-02'],[g%2===0?g/2:g%3===0?g/3:null,'N5-12']],'cm'); },
  ()=>{ const [a,b]=rndPick([6,8],[4,6],[10,15],[6,9],[8,12],[9,12]), L=_lcmN(a,b); return _W(`두 버스가 각각 ${a}분, ${b}분마다 출발해요. 두 버스가 동시에 출발한 뒤, 다음에 동시에 출발하는 때는 몇 분 뒤일까요?`,L,[[a*b,'N5-12'],[_gcdN(a,b),'N5-02']],'분'); }];
NX['S3-75']=[()=>{ const [a,b,d,half]=rndPick([12,18,3,9],[8,12,3,6],[16,24,3,12],[18,24,4,12],[20,30,3,15],[12,16,4,8]); return _W(`${b}분의 ${a}를 기약분수로 나타내면 분모는 얼마일까요?`.replace(/(\d)를 기약/,(m,c)=>c+('136780'.includes(c)?'을':'를')+' 기약'),d,[[half,'N5-12'],[b,null]]); }];
NX['S3-76']=[()=>{ const [a,b]=rndPick([4,6],[6,8],[6,9],[8,12],[4,10],[9,12]), L=_lcmN(a,b); return _W(`${a}분의 1과 ${b}분의 1을 가장 작은 공통분모로 통분하려고 해요. 공통분모는 얼마일까요?`,L,[[a*b,'N5-12'],[_gcdN(a,b),'N5-02']]); },
  ()=>{ const [a,b]=rndPick([4,6],[6,8],[6,9],[8,12],[4,10],[9,12]), L=_lcmN(a,b), x=rnd(1,a-1); return _W(`${a}분의 ${x}를 분모가 ${L}인 분수로 통분하면 ${L}분의 □ 예요. □에 알맞은 수는 얼마일까요?`.replace(/(\d)를 분모/,(m,c)=>c+('136780'.includes(c)?'을':'를')+' 분모'),x*L/a,[[x,'N5-13'],[x+L-a,'N5-03']]); }];
NX['S3-77']=[()=>{ const [a,b]=rndPick([3,12],[4,12],[2,10],[5,15],[3,9],[4,8]), x=rnd(1,a-1), v=x*b/a; if(v<2) return NX['S3-77'][0](); return _W(`${b}분의 □ 는 ${a}분의 ${x}보다 작은 분수예요. □에 들어갈 수 있는 가장 큰 수는 얼마일까요?`,v-1,[[v,'N1-07'],[x-1>0?x-1:null,'N5-13']]); }];
NX['S3-78']=[()=>{ const [d,x]=rndPick([5,1],[5,2],[5,3],[5,4],[2,1]); return _W(`${d}분의 ${x} = 10분의 □ 예요. □에 알맞은 수는 얼마일까요?`,x*10/d,[[x,'N5-13'],[x+10-d,'N5-03']]); },
  ()=>{ const [d,x]=rndPick([25,7],[20,3],[25,9],[50,7],[20,9],[4,3]); return _W(`${d}분의 ${x}를 소수로 나타내려고 해요. ${d}분의 ${x} = 100분의 □ 에서 □에 알맞은 수는 얼마일까요?`.replace(/(\d)를 소수/,(m,c)=>c+('136780'.includes(c)?'을':'를')+' 소수'),x*100/d,[[x,'N5-13'],[x*10,null]]); }];
/* 5-2 */
NX['S3-83']=[()=>{ const a=rnd(12,40), n=rnd(4,9), b=a+n; return _W(`${a} 이상 ${b} 이하인 자연수는 모두 몇 개일까요?`,n+1,[[n,'N5-16'],[n-1,'N5-08']],'개'); }];
NX['S3-85']=[()=>{ const h=rnd(3,9); return _W(`올림하여 백의 자리까지 나타내면 ${h*100}이 되는 자연수 가운데 가장 작은 수는 얼마일까요?`,h*100-99,[[h*100-100,'N5-16'],[h*100+1,'N5-14'],[h*100-49,'N5-14']]); },
  ()=>{ const n=rnd(21,88)*10+rnd(1,9); return _W(`학생 ${n}명이 모두 의자에 앉으려고 해요. 긴 의자 하나에 10명씩 앉는다면 의자는 적어도 몇 개 필요할까요?`,Math.ceil(n/10),[[Math.floor(n/10),'N6-10'],[n%10,'N4-16']],'개'); }];
NX['S3-86']=[()=>{ const h=rnd(3,9); return _W(`버림하여 백의 자리까지 나타내면 ${h*100}이 되는 자연수 가운데 가장 큰 수는 얼마일까요?`,h*100+99,[[h*100+100,'N5-16'],[h*100+49,'N5-14'],[h*100,null]]); },
  ()=>{ const n=rnd(12,89)*1000+rnd(1,9)*100; return _W(`저금통에 든 ${n}원을 10000원짜리 지폐로만 바꾸려고 해요. 지폐는 몇 장까지 바꿀 수 있을까요?`,Math.floor(n/10000),[[Math.ceil(n/10000),'N6-10'],[Math.round(n/1000)%10||null,null]],'장'); }];
NX['S3-88']=[()=>{ const n=rnd(3,8)*100+rnd(12,88), up=rndPick(true,false); return up?_W(`귤 ${n}개를 한 상자에 100개씩 모두 담으려고 해요. 상자는 적어도 몇 개 필요할까요?`,Math.ceil(n/100),[[Math.floor(n/100),'N6-10']],'개'):_W(`구슬 ${n}개로 구슬 100개가 드는 목걸이를 만들어요. 목걸이는 몇 개까지 만들 수 있을까요?`,Math.floor(n/100),[[Math.ceil(n/100),'N6-10']],'개'); }];
NX['S3-89']=[()=>{ const d=rnd(5,9), a=rnd(2,d-1), n=rnd(2,4); return _W(`${d}분의 ${a} × ${n} = ${d}분의 □ 예요. □에 알맞은 수는 얼마일까요?`,a*n,[[a,'N5-15'],[a+n,'N2-05']]); },
  ()=>{ const [d,a,n]=rndPick([4,3,8],[5,2,10],[3,2,9],[6,5,12],[4,1,12],[5,3,15]); return _W(`물을 한 번에 ${d}분의 ${a} L씩 ${n}번 부었어요. 부은 물은 모두 몇 L일까요?`,a*n/d,[[a*n,'N5-15'],[n,null]],'L'); }];
/* 6학년 수와 연산 */
NX['S3-99']=[()=>{ const d=rnd(3,6), w=rnd(1,3), a=rnd(1,d-1), n=rnd(2,4); return _W(`(${w}과(와) ${d}분의 ${a}) ÷ ${n} 의 계산에서 대분수를 가분수로 바꾸면 ${d}분의 □ ÷ ${n} 이 돼요. □에 알맞은 수는 얼마일까요?`.replace(/(\d)과\(와\)/,(m,c)=>c+('136780'.includes(c)?'과':'와')),w*d+a,[[w+a,'N5-06'],[w*a,null],[a,null]]); }];
NX['S3-102']=[()=>{ const [a,b,v]=rndPick([1,2,5],[1,5,2],[2,5,4],[3,5,6],[4,5,8]); return _W(`${a} ÷ ${b} = 0.□ 예요. □에 알맞은 숫자는 얼마일까요?`,v,[[b,null],[a,null]]); },
  ()=>{ const [a,b,v,r]=rndPick([7,4,'1.75','1.3'],[9,4,'2.25','2.1'],[13,5,'2.6','2.3'],[11,4,'2.75','2.3'],[7,2,'3.5','3.1']); return cq(`${a} ÷ ${b} 의 몫을 소수로 나타내면 얼마일까요?`,'',v,[[r,'N6-05'],[String(+(v*10).toFixed(2)),'N6-07'],[String(+(v/10).toFixed(3)),'N6-07']]); }];
NX['S3-103']=[()=>{ const d=rnd(3,8), q=rnd(31,89), x=+(d*q/10).toFixed(1); if(q%10===0) return NX['S3-103'][0](); return cq(`${x} ÷ ${d} 의 계산에서 소수점을 빼고 계산한 숫자가 ${q}였어요. 어림해서 소수점을 바르게 찍은 몫은 어느 것일까요?`,'',String(q/10),[[String(q),'N6-07'],[String(+(q/100).toFixed(2)),'N6-07'],[String(q*10),null]]); }];
NX['S3-105']=[()=>{ const [a,b,c,d,x,y]=rndPick([1,2,1,4,2,1],[1,2,1,6,3,1],[2,3,1,6,4,1],[3,4,1,8,6,1],[1,3,1,9,3,1],[2,3,2,9,6,2],[3,4,3,8,6,3]), L=_lcmN(b,d); return _W(`${b}분의 ${a} ÷ ${d}분의 ${c} 의 계산에서 두 분수를 통분하면 ${L}분의 ${x} ÷ ${L}분의 ${y} = ${x} ÷ ${y} 가 돼요. 몫은 얼마일까요?`,x/y,[[1,'N6-03'],[x*y!==x/y?x*y:null,null],[L,null]]); }];
NX['S3-111']=[()=>{ const [a,b,v]=rndPick([17,6,3],[23,6,4],[19,7,3],[25,9,3],[11,3,4],[29,8,4],[20,3,7]); return _W(`${a} ÷ ${b} 의 몫을 반올림하여 일의 자리까지 나타내면 얼마일까요?`,v,[[v-1,'N5-14'],[v+1,null]]); }];
/* 자료와 가능성 */
const circGraph=(names,vals)=>{ const mx=Math.max(...vals), u=22, w=46; let g=''; names.forEach((n,i)=>{ const x=30+i*w; for(let k=0;k<mx;k++){ g+=`<rect x="${x}" y="${6+(mx-1-k)*u}" width="${w-8}" height="${u}" fill="#fff" stroke="#D9C7A8"/>`; if(k<vals[i]) g+=`<circle cx="${x+(w-8)/2}" cy="${6+(mx-1-k)*u+u/2}" r="7" fill="none" stroke="#D45F16" stroke-width="2.4"/>`; } g+=gxT(x+(w-8)/2,6+mx*u+15,n,11); }); for(let k=1;k<=mx;k++) g+=gxT(22,6+(mx-k)*u+u/2+4,String(k),9.5,'#6B4A2A','end'); return cpSvg(g,34+names.length*w,6+mx*u+22,260); };
NX['S4-05']=[()=>{ const names=shuffle(['사과','귤','포도','감','배']).slice(0,3), v=[rnd(2,6),rnd(1,6),rnd(2,6)]; if(new Set(v).size<3) return NX['S4-05'][0](); const [i,j]=shuffle([0,1,2]); return _W(`좋아하는 과일을 조사해 ○로 나타낸 그래프예요. ${names[i]}와(과) ${names[j]}를(을) 좋아하는 학생은 모두 몇 명일까요?`.replace(/(.)와\(과\)/,(m,c)=>c+(((c.charCodeAt(0)-44032)%28)?'과':'와')).replace(/(.)를\(을\)/,(m,c)=>c+(((c.charCodeAt(0)-44032)%28)?'을':'를')),v[i]+v[j],[[Math.abs(v[i]-v[j]),'N1-03'],[Math.max(v[i],v[j]),'N1-12'],[v[0]+v[1]+v[2],null]],'명',cpWrap(circGraph(names,v))); }];
NX['S4-06']=[()=>{ const k=rnd(2,4), s=rnd(2,5), names=shuffle(['피구','축구','줄넘기','수영']).slice(0,3), v=shuffle([s,s*k,s+rnd(1,3)*(k>2?1:1)+1]); const mx=Math.max(...v), mn=Math.min(...v); if(mx%mn||new Set(v).size<3||mx/mn===mx-mn) return NX['S4-06'][0](); return _W('좋아하는 운동을 조사한 표예요. 가장 많은 학생이 좋아하는 운동의 학생 수는 가장 적은 학생이 좋아하는 운동의 학생 수의 몇 배일까요?',mx/mn,[[mx-mn,'R6-02'],[mx,'N1-12']],'배',cpWrap(cpTable(names,v.map(x=>x+'명'),'운동','학생 수'))); }];
const POSL5=['불가능하다','~아닐 것 같다','반반이다','~일 것 같다','확실하다'];
NX['S4-17']=[()=>{ const n=8, k=rndPick(0,1,2,4,6,7,8), a=k===0?0:k===8?4:k===4?2:k<4?1:3; const items=k===0?[{n:'파랑',p:100,lab:''}]:k===8?[{n:'노랑',p:100,lab:'',hi:1}]:[{n:'노랑',p:k*100/n,lab:'',hi:1},{n:'파랑',p:100-k*100/n,lab:''}]; const r=cq('회전판을 돌릴 때 화살이 노란색 부분에 멈출 가능성을 말로 나타내면 어느 것일까요?',cpWrap(pieSvg(items)),POSL5[a],POSL5.filter((_,i)=>i!==a).map((x,i)=>[x,Math.abs(POSL5.indexOf(x)-a)===4?'D5-06':null])); r.opts=POSL5.filter(x=>r.opts.includes(x)); return r; }];
NX['S4-18']=[()=>{ const n=rnd(3,8), c=rndPick(['빨간','파란'],['흰','검은'],['노란','초록']), one=rndPick(true,false); return _W(`${c[0]} 구슬만 ${n}개 든 주머니에서 구슬 1개를 꺼낼 때, 꺼낸 구슬이 ${one?c[0]:c[1]} 구슬일 가능성을 수로 나타내면 얼마일까요?`,one?1:0,[[one?0:1,'D5-06'],[n,'D5-07']]); }];
/* 변화와 관계 */
NX['S5-09']=[()=>{ const a=rnd(12,30), b=rnd(5,9), c=rnd(2,b-1); return cq('등호(=)를 바르게 쓴 식은 어느 것일까요?','',`${a} + ${b} = ${a+b-c} + ${c}`,[[`${a} + ${b} = ${a+b} + ${c}`,'R4-02'],[`${a} + ${b} = ${a+b} − ${c} = ${a+b-c}`,'R4-02'],[`${a} + ${b} = ${a} − ${b}`,null]]); },
  ()=>{ const a=rnd(8,20), b=rnd(4,9), c=rnd(3,9); return _W(`□ − ${c} = ${a} + ${b} 에서 □에 알맞은 수는 얼마일까요?`,a+b+c,[[a+b,'R4-02'],[a+b-c,'N1-03']]); }];
NX['S5-13']=[()=>{ let a=rnd(8,15), b=rnd(9,18); if(a===b) b++; return _W(`어느 반의 남학생은 ${a}명, 여학생은 ${b}명이에요. 여학생 수에 대한 남학생 수의 비를 □ : ${b} 로 나타낼 때, □에 알맞은 수는 얼마일까요?`,a,[[b,'R6-01'],[a+b,'R6-03']]); }];
NX['S5-18']=[()=>{ const [a,b,x,h]=rndPick([24,36,2,12],[18,30,3,9],[16,40,2,8],[45,60,3,9],[28,42,2,14]); return _W(`비 ${a} : ${b} 와 비율이 같은 가장 간단한 자연수의 비는 □ : ${b/(a/x)} 이에요. □에 알맞은 수는 얼마일까요?`,x,[[h,'N5-12'],[a,null]]); },
  ()=>{ const [p,q]=rndPick([2,3],[3,4],[2,5],[3,5],[4,5]); return _W(`${p}분의 1 : ${q}분의 1 과 비율이 같은 가장 간단한 자연수의 비는 □ : ${p} 이에요. □에 알맞은 수는 얼마일까요?`,q,[[1,null],[p*q,'R6-11']]); }];
/* 도형과 측정 */
NX['S6-06']=[()=>{ const k=rndPick(0,1); return _W(['칠교 조각 7개 가운데 삼각형 모양 조각은 모두 몇 개일까요?','칠교 조각 7개 가운데 사각형 모양 조각은 모두 몇 개일까요?'][k],[5,2][k],[[[2,5][k],null],[7,null],[3,null]],'개'); }];
NX['S6-08']=[()=>{ const [a,b]=rndPick(['코끼리','토끼'],['수박','구슬'],['자전거','지우개'],['책','손수건'],['고양이','숟가락']), hv=rndPick(true,false); return cq(hv?'더 무거운 것은 어느 것일까요?':'더 가벼운 것은 어느 것일까요?',objRow(shuffle([a,b])),hv?a:b,[[hv?b:a,'G2-15']]); }];
NX['S6-09']=[()=>{ const h=rnd(1,11); return _W(`시계의 짧은바늘이 ${h}와(과) ${h+1} 사이에 있고, 긴바늘이 6을 가리켜요. 몇 시 30분일까요?`.replace(/(\d+)와\(과\)/,(m,c)=>c+('136780'.includes(c.slice(-1))?'과':'와')),h,[[h+1,null],[6,null]],'시 30분',cpWrap(gxClock(h,30))); }];
NX['S6-11']=[()=>{ const h=rnd(2,4); return _W(`${h}시간은 몇 분일까요?`,h*60,[[h*100,'G2-03'],[60+h,null],[h*10,null]],'분'); }];
NX['S6-12']=[()=>{ const h=rnd(2,9); return _W(`1일 ${h}시간은 모두 몇 시간일까요?`,24+h,[[10+h,'G2-03'],[12+h,null],[100+h,'G2-03']],'시간'); },
  ()=>{ const h=rnd(2,9); return _W(`${24+h}시간은 1일 □시간이에요. □에 알맞은 수는 얼마일까요?`,h,[[h+12,null],[14+h,'G2-03']]); }];
NX['S6-34']=[()=>{ const n=rnd(2,5); return _W(`초바늘이 시계를 한 바퀴 도는 데 60초가 걸려요. ${n}바퀴 도는 데는 몇 초가 걸릴까요?`,n*60,[[n*100,'G2-03'],[60+n,null]],'초'); },
  ()=>cq('초 단위로 재기에 알맞은 것은 어느 것일까요?','',rndPick('눈을 한 번 깜박이는 시간','손뼉을 세 번 치는 시간','물 한 모금을 마시는 시간'),[['영화 한 편을 보는 시간','G3-07'],['학교에서 점심을 먹는 시간','G3-07'],['밤에 잠을 자는 시간','G3-07']])];
NX['S6-48']=[()=>{ const pool=shuffle([rnd(20,85),rnd(20,85),rnd(95,170),rnd(95,170),90,rndPick(89,91),rnd(30,80)]).slice(0,5), kind=rndPick('예각','둔각'), n=pool.filter(x=>kind==='예각'?x<90:x>90).length, r90=pool.filter(x=>x===90).length; if(n<1||n>4||new Set(pool).size<5) return NX['S6-48'][0](); return _W(`${pool.map(x=>x+'°').join(', ')} 가운데 ${kind}은 모두 몇 개일까요?`,n,[[r90?n+r90:null,'G4-07'],[5-n-r90!==n?5-n-r90:null,'G4-07'],[5,null]],'개'); },
  ()=>{ const T=[[4,'둔각'],[5,'둔각'],[1,'예각'],[2,'예각'],[8,'둔각'],[10,'예각'],[3,'직각'],[9,'직각']], want=rndPick('예각','둔각'), ok=rndPick(...T.filter(x=>x[1]===want)), others=shuffle(T.filter(x=>x[1]!==want)).slice(0,3); return cq(`시계의 긴바늘과 짧은바늘이 이루는 작은 쪽의 각이 ${want}인 시각은 어느 것일까요?`,cpWrap(cpRow(...[ok,...others].sort((a,b)=>a[0]-b[0]).map(x=>`<div style="display:flex;flex-direction:column;align-items:center;font-size:.85rem">${gxClock(x[0],0).replace('width="120"','width="70"')}${x[0]}시</div>`))),`${ok[0]}시`,others.map(x=>[`${x[0]}시`,'G4-07'])); }];
NX['S6-49']=[()=>{ const a=rnd(2,7)*10+rndPick(0,5); return _W(`직각을 두 각으로 나누었어요. 한 각이 ${a}°이면 다른 각은 몇 도일까요?`,90-a,[[180-a,'G4-07'],[a,null]],'°'); },
  ()=>{ const a=rnd(4,14)*10+rndPick(0,5); return _W(`곧은 선 위의 한 점에서 선을 하나 그어 두 각을 만들었어요(두 각의 합은 180°). 한 각이 ${a}°이면 다른 각은 몇 도일까요?`,180-a,[[a>90?null:90-a,'G4-07'],[360-a,null]],'°'); }];
NX['S6-25']=[()=>{ const a=rnd(2,5), b=rnd(1,4), h=rndPick(['오른쪽','왼쪽'],['왼쪽','오른쪽']), v=rndPick(['위쪽','아래쪽'],['아래쪽','위쪽']); return cq(`점을 ${h[0]}으로 ${a}칸, ${v[0]}으로 ${b}칸 옮겼어요. 점을 처음 자리로 되돌리려면 어떻게 옮겨야 할까요?`,'',`${h[1]}으로 ${a}칸, ${v[1]}으로 ${b}칸`,[[`${h[0]}으로 ${a}칸, ${v[0]}으로 ${b}칸`,'G4-21'],[`${h[1]}으로 ${a}칸, ${v[0]}으로 ${b}칸`,'G4-21'],[a!==b?`${h[1]}으로 ${b}칸, ${v[1]}으로 ${a}칸`:null,'G4-21']]); }];
NX['S6-30']=[()=>{ const a=rnd(4,12), b=rnd(3,9); if(a===b) return NX['S6-30'][0](); return _W(`이웃한 두 변의 길이가 ${a} cm, ${b} cm인 평행사변형이 있어요. 네 변의 길이의 합은 몇 cm일까요?`,2*(a+b),[[a+b,'N1-12'],[a*b,'G5-01']],'cm'); },
  ()=>{ const a=rnd(4,15); return _W(`한 변의 길이가 ${a} cm인 마름모의 네 변의 길이의 합은 몇 cm일까요?`,4*a,[[2*a,'N1-12'],[a*a,'G5-01']],'cm'); },
  ()=>{ const x=rnd(5,13)*10+5; return _W(`평행사변형의 한 각이 ${x}°예요. 이 각과 마주 보는 각은 몇 도일까요?`,x,[[180-x,null],[360-x,null]],'°'); }];
NX['S6-31']=[()=>{ const [nm,n,w]=rndPick(['평행사변형',4,[[1,'G4-05'],[2,'G4-05'],[5,null]]],['직사각형',2,[[1,'G3-03'],[3,null],[4,null]]],['마름모',2,[[1,'G4-05'],[3,null],[4,null]]],['사다리꼴',5,[[1,'G4-05'],[2,'G4-05'],[4,null]]]); return _W(`사다리꼴, 평행사변형, 마름모, 직사각형, 정사각형 가운데 ${nm}${nm==='마름모'?'라고':'이라고'} 할 수 있는 것은 모두 몇 개일까요?`,n,w,'개'); }];
NX['S6-33']=[()=>{ const [nm,a,n]=rndPick(['정삼각형',60,6],['정사각형',90,4],['정육각형',120,3]); return _W(`${nm}의 한 각은 ${a}°예요. ${nm}으로 평면을 빈틈없이 채우면 한 꼭짓점에 ${nm}이 몇 개 모일까요?`,n,[3,4,6].filter(x=>x!==n).map(x=>[x,null]),'개'); },
  ()=>cq('한 가지 도형만으로 평면을 빈틈없이 채울 수 없는 것은 어느 것일까요?','',rndPick('정오각형','원'),[['정삼각형',null],['정사각형',null],['정육각형',null]])];
NX['S6-67']=[()=>{ const rows=[rnd(3,5)]; for(let i=0;i<rnd(1,2);i++) rows.push(rnd(1,rows[rows.length-1])); const u=24, n=rows.reduce((a,b)=>a+b,0), per=2*(rows[0]+rows.length); let g=''; for(let y=0;y<4;y++) for(let x=0;x<6;x++) g+=`<rect x="${6+x*u}" y="${6+y*u}" width="${u}" height="${u}" fill="${y<rows.length&&x<rows[y]?'#FFD98A':'#fff'}" stroke="#C9B38C"/>`; return _W('모눈 한 칸의 넓이는 1 cm²예요. 색칠한 도형의 넓이는 몇 cm²일까요?',n,[[per!==n?per:null,'G5-01'],[n+1,'N1-07'],[rows[0]*rows.length!==n?rows[0]*rows.length:null,null]],'cm²',cpWrap(cpSvg(g,6*u+12,4*u+12,220))); }];
NX['S6-77']=[()=>{ const a=rnd(4,9), c=rnd(2,4); return _W(`부피가 1 cm³인 쌓기나무를 한 층에 ${a}개씩 ${c}층으로 쌓았어요. 쌓은 모양의 부피는 몇 cm³일까요?`,a*c,[[a+c,'N2-05'],[a,'G6-09']],'cm³'); }];
try{ for(const ep of Object.keys(NX)){ if(!G36[ep]) continue; for(const g of NX[ep]){ (window._NTW=window._NTW||[]).push([ep,G36[ep].length,g]); G36[ep].push(g); } } }catch(e){}
window._NX=NX;
