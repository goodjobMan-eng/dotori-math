
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
  const Q=_pl(q.q), t=(Q+' | '+_pl(q.visual)).replace(/,/g,''), ns=(t.match(/\d+(?:\.\d+)?/g)||[]).map(Number), mis={}, clash=new Set();
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
const _tagQ0=tagQ; tagQ=function(ep,i,q){ q=_tagQ0(ep,i,q); try{ if(q&&typeof q==='object'&&!TAG3[ep+'#'+i]){ codeW(q); codeW2(q); codeW3(q); codeW4(q); codeW5(q); codeW6(q); } }catch(e){} return q; };

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
R36['S3-56#2']=(q,s)=>{ const n=String(_N(s)[0]); return [[+n.split('.')[1][0],'N4-24'],[+n[0],'F']]; };
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
R36['S3-39#2']=(q)=>[[q.ans*10,'F']];
R36['S3-40#0']=(q,s)=>{ const n=_N(s)[0], z=String(n); const r=[]; try{ if(/0/.test(z.slice(1))) r.push([readBig(+(z[0]+z.slice(1).replace('0',''))),'N4-01']); r.push([readBig(n+1000),'F'],[readBig(n+100),'F']); }catch(e){} return r; };
R36['S3-41#0']=(q,s)=>{ const n=_N(s)[0]; try{ return [[readBig(n*10),'N4-08'],[readBig(Math.floor(n/10)),'N4-09']]; }catch(e){ return []; } };
R36['S3-40#2']=(q)=>q.opts.filter(o=>String(o)!==String(q.ans)).map(o=>[o,'F']);
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
R36['S5-18#1']=(q,s)=>{ const [a,b]=_N(s); const g=_gcd2(a,b); return [[`${b/g} : ${a/g}`,'R6-01'],[`1 : ${b-(a-1)}`,'R6-10']]; };
R36['S5-21#4']=(q,s)=>{ const [N,a,b]=_N(s); const u=N/(a+b); return [[_like(q,N/2),'R6-13'],[_like(q,u),'R6-16'],[_like(q,u*Math.max(a,b)),'N1-13']]; };
// --- 카본 교차 확인(11/21)으로 보강한 둘째 오답 ---
R36['S2-11#1']=(q,s)=>{ const [a,b]=_N(s); return [[a-b,'N3-11'],[q.ans-1,'N2-09'],[a*b,'N3-30']]; };
R36['S3-25#1']=(q)=>[[1,'N3-12'],[q.ans===3?2:3,'N3-33']];
R36['S3-27#1']=(q,s)=>{ const [a]=_N(s); return [[a+10,'N2-05'],[a*_N(s)[1],'F']]; };
R36['S3-68#0']=(q,s)=>{ const n=_N(s)[0]; return [[n,'N5-10']].concat(q.opts.filter(o=>o!==q.ans).map(o=>[o,(o===n||o===1)?'N5-10':(o*o>n?'N5-19':'F')])); };
{ const _dn=R36['S3-98#4']; R36['S3-98#4']=(q,s)=>{ const [[d,n]]=_FR(s), k=_N(s.replace(/\d+분의 \d+/,''))[0]; const r=_dn(q,s); if((k*d)%n===0) r.splice(1,0,[String(k*d/n),'N6-02']); return r; }; R36['S3-98#5']=R36['S3-98#4']; }
R36['S3-112#1']=(q,s)=>{ const [a,b]=_N(s); return [[_r6(+q.ans*10),'N6-09'],[_r6(a/b-Math.floor(a/b)),'N6-05'],[_r6(+q.ans/10),'F']]; };
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
{ const _t=tagQ; tagQ=function(ep,i,q){ q=_t(ep,i,q); try{ q=g36Wrong(ep,i,q); }catch(e){} return q; }; }
try{ window.__R36=R36; window.__G36G=G36G; window.__MIS=MIS; }catch(e){}


/* ===== 3-33. 1~2학년 수와 연산(EP 엔진) 글 검토: 화면 글만 고친다 ===== */
/* 수 낱말(보이지 않는 표시로 감싼 것) 바로 뒤 조사를 받침에 맞춤: 사을→사를, 삼로→삼으로, 일으로→일로 */
function fixJosa(t){ if(typeof t!=='string'||t.indexOf('​')<0) return t;
  const P={'은':['은','는'],'는':['은','는'],'이':['이','가'],'가':['이','가'],'을':['을','를'],'를':['을','를'],'과':['과','와'],'와':['과','와'],'이에요':['이에요','예요'],'예요':['이에요','예요'],'이야':['이야','야'],'야':['이야','야'],'이란다':['이란다','란다'],'란다':['이란다','란다']};
  return t.replace(/([가-힣])​(으로|로|이에요|예요|이란다|란다|이야|야|은|는|이|가|을|를|과|와)(?=[\s,.?!~…]|$)/g,(m,ch,j)=>{ const jong=(ch.charCodeAt(0)-0xAC00)%28; const nj=(j==='으로'||j==='로')?((jong>0&&jong!==8)?'으로':'로'):P[j][jong>0?0:1]; return ch+'​'+nj; }); }
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
function fixEP(q){ if(q){ for(const k of ['speech','ansSpeech','hint']) if(typeof q[k]==='string') q[k]=fixJosa(q[k]); } if(q&&typeof q.q==='string'){ q.q=q.q.replace(/(하나​?['’])은/,'$1는'); q.q=q.q.replace(/^(['‘].*?([가-힣])​?['’])[은는] 숫자로\?$/,(m,a,ch)=>a+(((ch.charCodeAt(0)-0xAC00)%28)?'은':'는')+' 숫자로?');
  { const m=q.q.match(/^(\d+)에서 숫자 (\d)([은는]) 얼마\?$/); const an=+q.ans; if(m&&an>0){ const pl=an>=1000?'천':an>=100?'백':an>=10?'십':'일'; q.q=`${m[1]}에서 ${pl}의 자리 숫자 ${m[2]}${m[3]} 얼마?`; } } } return q; }
/* 1~2학년 쓰기형(보기 없는) 틀: 객관식과 같은 규칙(EPR)으로 '오개념이면 쓰는 답'을 계산해 예상 오답으로 단다 */
function epWrite(q){ try{ if(!q||typeof q!=='object'||(q.opts&&q.opts.length)||q.manip||q.onMount||(q.mis&&Object.keys(q.mis).length)) return q; const A=String(q.ans); if(!/^\d+$/.test(A)) return q;
  const cands=[_pl(q.q), String(q.ansText||'').replace(/= \d+\s*$/,'= ?')]; for(const t of cands){ const u=String(t).replace(/\s+/g,' ').trim(); for(const [re,f] of EPR){ const m=u.match(re); if(!m) continue; if(!/[+×−-]/.test(u)) continue;
      const n=(u.match(/\d+/g)||[]).map(Number), ops=u.match(/[+×−-]/g)||[]; let v=n[0]; ops.forEach((o,i)=>{ const y=n[i+1]; v=o==='+'?v+y:o==='×'?v*y:v-y; }); if(String(v)!==A) continue;   /* 식을 계산한 값이 정답과 같을 때만 */
      const mis={}, clash=new Set(); for(const [w,c] of (f(m,q)||[])){ const k=String(w); if(k===A||!/^\d+$/.test(k)||typeof c!=='string'||c==='F') continue; if(k in mis){ if(mis[k]!==c) clash.add(k); continue; } mis[k]=c; } clash.forEach(k=>delete mis[k]); if(Object.keys(mis).length){ q.mis=mis; return q; } } } }catch(e){} return q; }
if(typeof G!=='undefined') for(const e of Object.keys(G)) G[e]=G[e].map(g=>function(){ return epWrite(epWrong(fixEP(g.apply(this,arguments)))); });
