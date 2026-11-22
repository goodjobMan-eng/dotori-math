
/* ===== 개념 카드 (로드맵 1단계-①) =====
   비어 있는 조각이 확정됐는데 강의 영상이 없을 때, 영상 자리에 3장짜리 작은 수업을 보여 준다.
   ① 구체물 그림과 한 문장 ② 식으로 옮기기 ③ 빈칸 따라 풀기(맞혀야 넘어감).
   KCARDS[조각] = () => ({t:제목, p:[{h:그림, s:말}, {h, s}, {h, s, ans, opts:[정답 포함 3개], why:틀렸을 때 한마디}]})
   수는 볼 때마다 새로 뽑는다. 그림은 이 파일의 작은 함수(도토리, 열 칸, 묶음·낱개, 접시)로 그린다. */
const KCARDS={};
(()=>{ const st=document.createElement('style'); st.textContent=`
.kc-pic{background:#FFF8EC;border-radius:18px;padding:14px 10px;margin:10px 0;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;min-height:120px}
.kc-say{font-size:1.15rem;line-height:1.6;color:#4A2E14;background:#fff;border-radius:16px;padding:12px 14px;margin:8px 0;word-break:keep-all}
.kc-say b{color:#D45F16}
.kc-ac{display:inline-grid;grid-template-columns:repeat(5,1.5em);gap:2px;font-size:1.25rem;line-height:1.2}
.kc-ac span.x{opacity:.25;text-decoration:line-through}
.kc-tf{display:inline-grid;grid-template-columns:repeat(5,34px);gap:3px}
.kc-tf i{width:34px;height:34px;border:2px solid #C9A46A;border-radius:8px;background:#fff;display:block}
.kc-tf i.a{background:#F0A050}.kc-tf i.b{background:#7FB8E6}
.kc-rod{display:inline-grid;grid-template-rows:repeat(10,9px);gap:1px;margin:0 2px;vertical-align:bottom}
.kc-rod i,.kc-one i{width:14px;height:9px;background:#F0A050;border:1px solid #B5701F;display:block;box-sizing:border-box}
.kc-one{display:inline-grid;grid-template-columns:repeat(5,14px);gap:2px;align-self:flex-end}
.kc-one i{height:14px}.kc-one i.n{background:#7FB8E6;border-color:#3F7FB0}
.kc-flat{display:inline-block;width:64px;height:64px;background:repeating-linear-gradient(0deg,#F0A050 0 5.4px,#B5701F 5.4px 6.4px),#F0A050;border:2px solid #B5701F;margin:0 3px;vertical-align:bottom;box-sizing:border-box}
.kc-plate{display:inline-flex;flex-wrap:wrap;gap:1px;width:74px;min-height:54px;padding:6px;border-radius:50%/42%;background:#fff;border:2px solid #C9A46A;justify-content:center;align-items:center;font-size:1rem}
.kc-eq{font-size:1.7rem;color:#4A2E14;width:100%;text-align:center}
.kc-eq u{display:inline-block;min-width:1.4em;border:2.5px solid #E8963C;border-radius:9px;text-decoration:none;color:#E8963C;margin:0 2px}
.kc-box{display:inline-flex;align-items:center;justify-content:center;border:2px solid #B5701F;background:#FFE3B0;font-size:1rem;color:#4A2E14}
.kc-bar{display:flex;width:92%;height:40px;border:2px solid #B5701F;border-radius:8px;overflow:hidden;font-size:1.1rem}
.kc-bar span{display:flex;align-items:center;justify-content:center}
.kc-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0}
.kc-opts button{font-size:1.35rem;padding:14px 4px;border-radius:16px;border:3px solid #E3C9A0;background:#fff;color:#4A2E14;font-family:inherit}
.kc-opts button.ok{border-color:#6BBF7A;background:#F2FBF3}.kc-opts button.no{border-color:#E57373;background:#FDECEC}
.kc-why{color:#B4441A;font-size:1.05rem;margin:6px 2px;min-height:1.4em}
.kc-dots{display:flex;gap:6px;justify-content:center;margin:6px 0}.kc-dots i{width:9px;height:9px;border-radius:50%;background:#E3C9A0}.kc-dots i.on{background:#E8963C}`; document.head.appendChild(st); })();
const kcAc=(n,x=0)=>`<span class="kc-ac">${Array.from({length:n},(_,i)=>`<span${i>=n-x?' class="x"':''}>🌰</span>`).join('')}</span>`;
const kcTf=(a,b=0)=>`<span class="kc-tf">${Array.from({length:10},(_,i)=>`<i class="${i<a?'a':i<a+b?'b':''}"></i>`).join('')}</span>`;
const kcRod=()=>`<span class="kc-rod">${'<i></i>'.repeat(10)}</span>`;
const kcBlk=(t,o,n=0,h=0)=>`<span>${'<span class="kc-flat"></span>'.repeat(h)}${Array.from({length:t},kcRod).join('')}</span>${o+n?`<span class="kc-one">${'<i></i>'.repeat(o)}${'<i class="n"></i>'.repeat(n)}</span>`:''}`;
const kcPl=(g,n)=>Array.from({length:g},()=>`<span class="kc-plate">${'🌰'.repeat(n)}</span>`).join('');
const kcEq=s=>`<div class="kc-eq">${String(s).replace(/□/g,'<u>?</u>')}</div>`;
const kcR=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const kcO=(ans,...w)=>{ const o=[ans]; for(const x of w) if(!o.map(String).includes(String(x))&&x!==null&&!(typeof x==='number'&&x<0)) o.push(x); let k=1; while(o.length<3){ const y=typeof ans==='number'?ans+k:ans+' '; if(!o.includes(y)) o.push(y); k++; } return o.slice(0,3); };

KCARDS.C01=()=>{ const HW=1; const a=kcR(6,9), b=10-a, a2=kcR(2,8), b2=10-a2; return {t:'10 모으기와 가르기', p:[
  {h:kcTf(a), s:`열 칸 가운데 <b>${a}칸</b>이 찼어요. 빈칸을 세어 보면 <b>${b}칸</b>이에요.`},
  {h:kcTf(a,b)+kcEq(`${a} + ${b} = 10`), s:`${a}와 ${b}를 모으면 <b>10</b>이에요.`},
  {h:kcTf(a2)+kcEq(`${a2} + □ = 10`), s:'빈칸은 몇 칸일까요?', ans:b2, opts:kcO(b2,b2+1,a2===b2?b2-1:a2), why:'열 칸 가운데 빈칸을 하나씩 세어 봐요.'}], hw:HW}; };
KCARDS.C02=()=>{ const HW=1; const a=kcR(3,6), b=kcR(2,4), s=a+b; return {t:'더하기, 빼기와 = 의 뜻', p:[
  {h:`<span style="text-align:center">${kcAc(a)}<br>${kcAc(b)}<br>${a} + ${b}</span><b style="font-size:2rem;color:#D45F16">=</b><span style="text-align:center">${kcAc(s-1)}<br>${kcAc(1)}<br>${s-1} + 1</span>`, s:`저울 왼쪽에 ${a}개와 ${b}개, 오른쪽에 ${s-1}개와 1개를 올렸어요. 양쪽이 똑같이 <b>${s}개</b>라서 기울지 않아요.`},
  {h:kcEq(`${a} + ${b} = ${s}`)+kcEq(`${s} = ${a} + ${b}`)+kcEq(`${a} + ${b} = ${s-1} + 1`), s:`<b>=</b> 는 '답을 써라'가 아니라 <b>양쪽이 같다</b>는 표시예요. 세 식 모두 양쪽이 ${s}로 같아요.`},
  {h:kcEq(`${a} + ${b} = □ + 1`), s:'양쪽이 같아지려면 □는 얼마일까요?', ans:s-1, opts:kcO(s-1,s,s+1), why:`왼쪽은 ${s}예요. 오른쪽도 ${s}가 되어야 해요.`}], hw:HW}; };
KCARDS.C03=()=>{ const HW=1; const t=kcR(2,5), t2=kcR(2,8); let o=kcR(1,9), o2=kcR(1,9); if(o===t) o=o%9+1; if(o2===t2) o2=o2%9+1; return {t:'10개씩 묶음과 낱개', p:[
  {h:kcBlk(t,o), s:`10개씩 묶음이 <b>${t}개</b>, 낱개가 <b>${o}개</b> 있어요.`},
  {h:kcBlk(t,o)+kcEq(`${t*10} + ${o} = ${t*10+o}`), s:`묶음 ${t}개는 ${t*10}이에요. 그래서 ${t*10+o}에서 <b>십의 자리 숫자</b> ${t}는 <b>${t*10}</b>을 나타내요.`},
  {h:kcEq(`${t2*10+o2}`), s:`${t2*10+o2}에서 십의 자리 숫자 ${t2}가 나타내는 수는 얼마일까요?`, ans:t2*10, opts:kcO(t2*10,t2,t2*10+o2), why:`십의 자리 숫자는 10개씩 묶음의 수예요. 묶음 ${t2}개는 얼마일까요?`}], hw:HW}; };
KCARDS.C04=()=>{ const HW=1; const mk=()=>{ const t=kcR(1,3), o=kcR(5,9), b=kcR(11-o,9); return [t,o,b]; }; const [t,o,b]=mk(), [t2,o2,b2]=mk(), s2=t2*10+o2+b2; return {t:'받아올림이 있는 덧셈', p:[
  {h:kcBlk(t,o,b)+kcEq(`${t*10+o} + ${b}`), s:`낱개 ${o}개와 ${b}개를 모으면 <b>${o+b}개</b>. 낱개가 10개를 넘었어요.`},
  {h:kcBlk(t+1,o+b-10)+kcEq(`${t*10+o} + ${b} = ${t*10+o+b}`), s:`낱개 10개를 <b>묶음 1개</b>로 바꿔 십의 자리로 올려요. 묶음은 ${t} + 1 = ${t+1}개, 낱개는 ${o+b-10}개예요.`},
  {h:kcBlk(t2,o2,b2)+kcEq(`${t2*10+o2} + ${b2}`)+kcEq(`낱개: ${o2} + ${b2} = ${o2+b2}`)+kcEq(`묶음: ${t2} + □`), s:'낱개가 10개를 넘었어요. 묶음에는 몇을 더할까요?', ans:1, opts:kcO(1,0,10), why:'낱개 10개가 묶음 1개로 바뀌어요. 묶음에 1을 더해요.', full:s2}], hw:HW}; };
KCARDS.C05=()=>{ const HW=1; const mk=()=>{ const t=kcR(3,6), o=kcR(1,4), b=kcR(o+2,9); return [t,o,b]; }; const [t,o,b]=mk(), [t2,o2,b2]=mk(), d2=t2*10+o2-b2; return {t:'받아내림이 있는 뺄셈', p:[
  {h:kcBlk(t,o)+kcEq(`${t*10+o} − ${b}`), s:`낱개가 ${o}개뿐이라 ${b}개를 뺄 수 없어요.`},
  {h:kcBlk(t-1,o,10)+kcEq(`${t*10+o} − ${b} = ${t*10+o-b}`), s:`묶음 1개를 풀어 <b>낱개 10개</b>로 바꿔요. 묶음은 ${t-1}개, 낱개는 ${o+10}개. ${o+10} − ${b} = ${o+10-b}이에요.`},
  {h:kcBlk(t2,o2)+kcEq(`${t2*10+o2} − ${b2}`)+kcEq(`묶음 1개를 풀면 낱개는 □개`), s:`낱개 ${o2}개에서 ${b2}개를 뺄 수 없어요. 묶음 1개를 풀면 낱개는 몇 개가 될까요?`, ans:o2+10, opts:kcO(o2+10,o2,10), full:d2, why:'묶음 1개를 풀었으니 묶음이 1개 줄어요. 큰 수에서 작은 수를 그냥 빼면 안 돼요.'}], hw:HW}; };
KCARDS.C06=()=>{ const a=kcR(12,29), b=kcR(11,25), s=a+b, bar=`<div class="kc-bar"><span style="flex:${a};background:#F8C98A">${a}</span><span style="flex:${b};background:#A9D2F0">${b}</span></div><div style="width:92%;text-align:center;font-size:1.1rem">전체 ${s}</div>`; return {t:'덧셈과 뺄셈은 한 가족', p:[
  {h:bar, s:`띠 전체의 길이는 <b>${s}</b>, 두 부분의 길이는 ${a}, ${b}.`},
  {h:bar+kcEq(`${s} − ${a} = ${b}`)+kcEq(`${b} + ${a} = ${s}`), s:`전체에서 한쪽을 빼면 다른 쪽이 남아요. 뺄셈을 했으면 <b>남은 수에 뺀 수를 더해서</b> 전체가 되는지 확인해요.`},
  {h:kcEq(`${s} − ${b} = ${a}`), s:'이 뺄셈이 맞는지 확인하는 덧셈식은?', ans:`${a} + ${b} = ${s}`, opts:kcO(`${a} + ${b} = ${s}`,`${s} + ${b} = ${s+b}`,`${s} + ${a} = ${s+a}`), why:'남은 수에 뺀 수를 더하면 처음 수가 되어야 해요.'}]}; };
KCARDS.C07=()=>{ const HW=1; let n=kcR(2,5), g=kcR(3,4), n2=kcR(2,6), g2=kcR(3,5); if(n===g) n=n===2?5:n-1; if(n2===g2) n2=n2===2?6:n2-1; return {t:'곱셈의 뜻', p:[
  {h:kcPl(g,n), s:`도토리가 <b>${n}개씩 ${g}접시</b> 있어요.`},
  {h:kcPl(g,n)+kcEq(Array(g).fill(n).join(' + ')+` = ${n*g}`)+kcEq(`${n} × ${g} = ${n*g}`), s:`${n}을 ${g}번 더하는 것을 <b>${n} × ${g}</b>라고 써요. ${n}의 ${g}배예요.`},
  {h:kcPl(g2,n2)+kcEq(`${n2} × ${g2} = □`), s:`${n2}개씩 ${g2}접시는 모두 몇 개일까요?`, ans:n2*g2, opts:kcO(n2*g2,n2+g2,n2*(g2+1)), why:`${n2}을 ${g2}번 더해요. 두 수를 한 번만 더하는 것이 아니에요.`}], hw:HW}; };
KCARDS.C08=()=>{ let n=kcR(2,4), g=kcR(2,4), n2=kcR(3,6), g2=kcR(3,5); if(n===g) n=n===2?4:n-1; if(n2===g2) n2=n2===3?6:n2-1; const T2=n2*g2; return {t:'나눗셈의 뜻', p:[
  {h:kcAc(n*g), s:`도토리 <b>${n*g}개</b>를 접시 ${g}개에 똑같이 나누어 담아요.`},
  {h:kcPl(g,n)+kcEq(`${n*g} ÷ ${g} = ${n}`)+kcEq(`${n} × ${g} = ${n*g}`), s:`한 접시에 <b>${n}개씩</b>이에요. 나눗셈은 곱셈을 거꾸로 한 것이라서, ${n} × ${g} = ${n*g}로 확인해요.`},
  {h:kcEq(`${T2} ÷ ${g2} = □`), s:`${T2}개를 ${g2}접시에 똑같이 나누면 한 접시에 몇 개일까요?`, ans:n2, opts:kcO(n2,T2-g2,n2+1), why:`${g2} × □ = ${T2}가 되는 수를 찾아요. 빼는 것이 아니에요.`}]}; };
KCARDS.C09=()=>{ const mk=()=>{ const t=kcR(1,3), o=kcR(3,8), b=kcR(Math.ceil(10/o)+0,6); return o*b>=10&&t*b<10?[t,o,b]:mk(); }; const [t,o,b]=mk(), [t2,o2,b2]=mk(), a=t*10+o, a2=t2*10+o2;
  const area=(t,o,b)=>`<span class="kc-box" style="width:${44+t*30}px;height:${22+b*9}px">${t*10} × ${b}</span><span class="kc-box" style="width:${28+o*5}px;height:${22+b*9}px;background:#CFE6F7">${o} × ${b}</span>`; return {t:'두 자리 수의 곱셈', p:[
  {h:area(t,o,b)+kcEq(`${a} × ${b}`), s:`${a}을 <b>${t*10}과 ${o}</b>로 갈라서 따로 곱해요.`},
  {h:area(t,o,b)+kcEq(`${t*10*b} + ${o*b} = ${a*b}`), s:`${t*10} × ${b} = <b>${t*10*b}</b>, ${o} × ${b} = <b>${o*b}</b>. 십의 자리 ${t}는 ${t*10}이니까 ${t*b}가 아니라 ${t*10*b}이에요. ${o*b}의 ${Math.floor(o*b/10)*10}은 십의 자리로 올라가 더해져요.`},
  {h:area(t2,o2,b2)+kcEq(`${a2} × ${b2} = ${t2*10} × ${b2} + ${o2} × ${b2}`)+kcEq(`= □ + ${o2*b2}`), s:`${t2*10} × ${b2}는 얼마일까요?`, ans:t2*10*b2, opts:kcO(t2*10*b2,t2*b2,t2*10+b2), full:a2*b2, why:`${t2*10} × ${b2}와 ${o2} × ${b2}를 구해서 더해요. 올린 수도 잊지 말아요.`}]}; };
KCARDS.C10=()=>{ const mk=()=>{ const d=kcR(2,4), h=kcR(1,2), o=kcR(Math.ceil(10/d),9); return [d,h,o]; }; const [d,h,o]=mk(), [d2,h2,o2]=mk(), N=d*(h*100+o), N2=d2*(h2*100+o2), q2=h2*100+o2; return {t:'몫에 0이 들어가는 나눗셈', p:[
  {h:kcBlk(Math.floor(d*o/10),d*o%10,0,d*h)+kcEq(`${N} ÷ ${d}`), s:`백 모형 ${d*h}개를 ${d}묶음으로 똑같이 나누면 <b>${h}개씩</b>. 몫의 백의 자리는 ${h}예요.`},
  {h:kcBlk(Math.floor(d*o/10),d*o%10,0,0)+kcEq(`${N} ÷ ${d} = ${h}0${o}`), s:`십 모형 ${Math.floor(d*o/10)}개는 ${d}묶음으로 나눌 수 없어요. 그 자리 몫에 <b>0</b>을 써요. 십 모형 ${Math.floor(d*o/10)}개를 낱개 ${Math.floor(d*o/10)*10}개로 풀어 낱개 ${d*o%10}개와 합치면 <b>${d*o}개</b>, ${d}묶음으로 나누면 ${o}개씩이에요.`},
  {h:kcEq(`${N2} ÷ ${d2}`)+kcEq(`백의 자리 몫: ${h2}`)+kcEq(`십 모형 ${Math.floor(d2*o2/10)}개 ÷ ${d2} → 십의 자리 몫 □`), s:'십의 자리 몫은 얼마일까요?', ans:0, opts:kcO(0,1,Math.floor(d2*o2/10)||2), full:q2, why:'십의 자리를 나눌 수 없으면 몫의 십의 자리에 0을 써요.'}]}; };

const kcF=(a,b)=>`<span class="frac"><b>${a}</b><i></i><b>${b}</b></span>`;
const kcFb=(n,k,w=260,lab='')=>`<div style="display:flex;align-items:center;gap:8px;width:100%;justify-content:center"><span style="display:inline-flex;width:${w}px;height:34px;border:2px solid #B5701F;border-radius:6px;overflow:hidden">${Array.from({length:n},(_,i)=>`<i style="flex:1;border-left:${i?'1.5px solid #B5701F':'0'};background:${i<k?'#F0A050':'#fff'}"></i>`).join('')}</span>${lab?`<span style="font-size:1.3rem">${lab}</span>`:''}</div>`;
KCARDS.C12=()=>{ const n=[4,5,6,8][kcR(0,3)], k=kcR(1,n-1); let n2=[5,6,8,10][kcR(0,3)], k2=kcR(1,n2-2); return {t:'분수의 뜻', p:[
  {h:kcFb(4,1,240,kcF(1,4))+`<div style="display:flex;align-items:center;gap:8px"><span style="display:inline-flex;width:240px;height:34px;border:2px solid #B5701F;border-radius:6px;overflow:hidden"><i style="flex:3;background:#F0A050"></i><i style="flex:1;border-left:1.5px solid #B5701F;background:#fff"></i><i style="flex:2;border-left:1.5px solid #B5701F;background:#fff"></i><i style="flex:2;border-left:1.5px solid #B5701F;background:#fff"></i></span><span style="font-size:1.3rem">✗</span></div>`, s:'위 띠는 <b>똑같이</b> 4로 나눈 것 중 1이라서 4분의 1이에요. 아래 띠는 크기가 달라서 4분의 1이 아니에요.'},
  {h:kcFb(n,k,260,kcF(k,n)), s:`전체를 똑같이 <b>${n}칸</b>으로 나눈 것 중 <b>${k}칸</b>을 ${n}분의 ${k}라고 해요. 아래 수(분모)는 <b>전체 칸 수</b>, 위 수(분자)는 색칠한 칸 수예요.`},
  {h:kcFb(n2,k2,260,`<span class="frac"><b>${k2}</b><i></i><b>?</b></span>`), s:`색칠한 부분은 몇 분의 ${k2}일까요? 분모를 골라 보세요.`, ans:n2, opts:kcO(n2,n2-k2,n2+1), why:'분모는 색칠하지 않은 칸이 아니라 전체 칸 수예요.'}]}; };
KCARDS.C14=()=>{ const ds=shuffle([2,3,4,5,6,8].slice()).slice(0,3).sort((a,b)=>a-b), mx=ds[0]; return {t:'단위분수의 크기', p:[
  {h:[2,3,4].map(d=>kcFb(d,1,240,kcF(1,d))).join(''), s:'같은 띠를 2칸, 3칸, 4칸으로 똑같이 나누고 한 칸씩 칠했어요.'},
  {h:[2,3,4].map(d=>kcFb(d,1,240,kcF(1,d))).join(''), s:'나누는 칸이 <b>많을수록 한 칸은 작아져요.</b> 그래서 2분의 1이 가장 크고, 4분의 1이 가장 작아요. 분모가 크다고 큰 수가 아니에요.'},
  {h:`<div class="kc-eq">${shuffle(ds.slice()).map(d=>kcF(1,d)).join(' &nbsp; ')}</div>`, s:'이 가운데 가장 큰 분수의 분모는?', ans:mx, opts:kcO(mx,ds[2],ds[1]), why:'분모가 작을수록 한 칸이 커요. 띠를 떠올려 봐요.'}]}; };
KCARDS.C15=()=>{ const b=[3,4,5,6][kcR(0,3)], q=kcR(1,2), r=kcR(1,b-1), a=b*q+r; const b2=[3,4,5,6,7][kcR(0,4)], q2=kcR(1,3), r2=kcR(1,b2-1), a2=b2*q2+r2; return {t:'가분수와 대분수', p:[
  {h:Array.from({length:q},()=>kcFb(b,b,200)).join('')+kcFb(b,r,200)+`<div class="kc-eq">${kcF(a,b)}</div>`, s:`${b}분의 1이 <b>${a}개</b> 있어요. ${b}칸이 다 차면 1이에요.`},
  {h:`<div class="kc-eq">${kcF(a,b)} = ${q}${kcF(r,b)}</div>`, s:`${a}개 가운데 ${b}개씩 ${q}묶음이 1이 되어 <b>${q}</b>, 남은 ${r}칸이 ${b}분의 ${r}이에요. 그래서 ${q}와 ${b}분의 ${r}이에요.`},
  {h:`<div class="kc-eq">${kcF(a2,b2)} = □${kcF(r2,b2)}</div>`, s:`${b2}칸씩 묶으면 1이 몇 개 나올까요?`, ans:q2, opts:kcO(q2,q2+1,r2===q2?q2+2:r2), why:`${a2}을 ${b2}씩 묶어 봐요. 남은 것이 분자가 돼요.`}]}; };
KCARDS.C16=()=>{ const t=kcR(5,9), h=kcR(1,4), p=kcR(1,9), set=[`0.${t}`,`0.${h}${kcR(1,9)}`,`0.${p===t?p-1||1:0}${kcR(1,9)}${kcR(1,9)}`]; return {t:'소수의 자릿값과 크기', p:[
  {h:kcFb(10,3,260,'0.3'), s:'1을 똑같이 10칸으로 나눈 한 칸이 <b>0.1</b>이에요. 3칸은 0.3이에요.'},
  {h:`<div class="kc-eq">0.9와 0.10</div>`+kcFb(10,9,240,'0.9')+kcFb(10,1,240,'0.10'), s:'0.10은 0.1과 같아요. 소수는 <b>숫자가 길다고 큰 것이 아니에요.</b> 소수 첫째 자리부터 차례로 견줘요. 0.9가 더 커요.'},
  {h:`<div class="kc-eq">${shuffle(set.slice()).join(' &nbsp; ')}</div>`, s:'가장 큰 수는 무엇일까요?', ans:set[0], opts:set.slice(), why:'소수 첫째 자리 숫자부터 견줘요. 자릿수가 많은 것이 큰 것이 아니에요.'}]}; };
KCARDS.C19=()=>{ const n=[5,6,7,8][kcR(0,3)], a=kcR(1,n-3), b=kcR(1,n-1-a); const n2=[5,7,8,9][kcR(0,3)], a2=kcR(1,n2-3), b2=kcR(1,n2-1-a2); return {t:'분모가 같은 분수의 덧셈', p:[
  {h:kcFb(n,a,240,kcF(a,n))+kcFb(n,b,240,kcF(b,n)), s:`${n}분의 ${a}과 ${n}분의 ${b}을 더해요. 칸의 크기는 둘 다 ${n}분의 1이에요.`},
  {h:`<div style="display:flex;justify-content:center"><span style="display:inline-flex;width:240px;height:34px;border:2px solid #B5701F;border-radius:6px;overflow:hidden">${Array.from({length:n},(_,i)=>`<i style="flex:1;border-left:${i?'1.5px solid #B5701F':'0'};background:${i<a?'#F0A050':i<a+b?'#7FB8E6':'#fff'}"></i>`).join('')}</span></div><div class="kc-eq">${kcF(a,n)} + ${kcF(b,n)} = ${kcF(a+b,n)}</div>`, s:`칸을 모으면 ${a + b}칸. 칸의 크기는 그대로라서 <b>분모는 ${n} 그대로</b>, 분자끼리만 더해요.`},
  {h:`<div class="kc-eq">${kcF(a2,n2)} + ${kcF(b2,n2)} = <span class="frac"><b>${a2+b2}</b><i></i><b>?</b></span></div>`, s:'분모는 얼마일까요?', ans:n2, opts:kcO(n2,n2*2,n2+1), why:'칸을 모아도 한 칸의 크기는 그대로예요. 분모끼리 더하지 않아요.'}]}; };
KCARDS.C20=()=>{ const mk=()=>{ const a=kcR(11,49)/10, b=kcR(101,499)/100; return [a,b]; }; const [a,b]=mk(), [a2,b2]=mk(), f=x=>x.toFixed(2).replace(/0$/,'').replace(/\.$/,''), s2=f(a2+b2), mis=f((Math.round(a2*10)+Math.round(b2*100))/100);
  const col=(x,y)=>`<div style="font-size:1.7rem;font-family:inherit;text-align:right;line-height:1.35;display:inline-block;border-bottom:2.5px solid #4A2E14;padding:0 8px">${x.toFixed(2).replace(/0$/,'<span style="opacity:.3">0</span>')}<br>+ ${y.toFixed(2)}</div>`; return {t:'소수의 덧셈은 소수점을 맞춰서', p:[
  {h:col(a,b), s:`${a} + ${b}. 소수점끼리 세로로 맞춰 써요. 빈 자리는 0이 있다고 생각해요.`},
  {h:col(a,b)+kcEq(`= ${f(a+b)}`), s:`같은 자리끼리 더하면 ${f(a+b)}. 끝자리를 맞추면 자리가 어긋나서 틀려요. <b>소수점을 맞춰요.</b>`},
  {h:kcEq(`${a2} + ${b2} = □`), s:'소수점을 맞춰 더해 보세요.', ans:s2, opts:kcO(s2,mis,f(a2+b2+1)), why:'끝자리가 아니라 소수점을 세로로 맞춰요.'}]}; };
const kcD=x=>String(+(+x).toFixed(6));
const kcNL=(lo,hi,mark,closed,dir)=>{ const W=260, X=v=>20+(v-lo)/(hi-lo)*(W-40); let g=`<svg viewBox="0 0 ${W} 60" width="${W}" height="60"><line x1="10" y1="30" x2="${W-10}" y2="30" stroke="#4A2E14" stroke-width="2"/>`;
  for(let v=lo;v<=hi;v++) g+=`<line x1="${X(v)}" y1="24" x2="${X(v)}" y2="36" stroke="#4A2E14"/><text x="${X(v)}" y="54" font-size="13" text-anchor="middle" fill="#4A2E14">${v}</text>`;
  const x0=X(mark), x1=dir>0?W-12:12; g+=`<line x1="${x0}" y1="30" x2="${x1}" y2="30" stroke="#E8963C" stroke-width="5"/><circle cx="${x0}" cy="30" r="6" fill="${closed?'#E8963C':'#fff'}" stroke="#E8963C" stroke-width="3"/></svg>`; return g; };
KCARDS.C11=()=>{ const b=kcR(3,6), q=kcR(2,4), r=kcR(1,b-1), a=b*q+r, b2=kcR(3,8), q2=kcR(2,6); let r2=kcR(1,b2-1); if(r2===q2) r2=r2>1?r2-1:Math.min(b2-1,r2+1); const a2=b2*q2+r2; return {t:'나머지가 있는 나눗셈', p:[
  {h:kcPl(q,b)+`<span class="kc-plate" style="border-style:dashed">${'🌰'.repeat(r)}</span>`, s:`도토리 ${a}개를 ${b}개씩 담으면 ${q}접시가 되고 <b>${r}개가 남아요.</b>`},
  {h:kcEq(`${a} ÷ ${b} = ${q} … ${r}`)+kcEq(`${b} × ${q} + ${r} = ${a}`), s:`남은 ${r}개로는 한 접시를 더 채울 수 없어요. 그래서 <b>나머지는 언제나 나누는 수보다 작아요.</b> 나누는 수 × 몫 + 나머지로 처음 수가 되는지 확인해요.`},
  {h:kcEq(`${a2} ÷ ${b2} = ${q2} … □`), s:'나머지는 얼마일까요?', ans:r2, opts:kcO(r2,r2+b2,q2), why:`나머지는 ${b2}보다 작아야 해요. ${b2} × ${q2}을 먼저 구해 봐요.`}]}; };
KCARDS.C13=()=>{ const d=kcR(3,5), u=kcR(2,5), N=d*u, k=kcR(2,d-1), d2=kcR(3,5), u2=kcR(2,6), N2=d2*u2, k2=kcR(2,d2-1); return {t:'전체의 몇 분의 몇', p:[
  {h:kcPl(d,u), s:`도토리 ${N}개를 똑같이 ${d}묶음으로 나누면 한 묶음에 <b>${u}개</b>예요.`},
  {h:kcPl(d,u)+kcEq(`${N}의 ${k}/${d}`.replace(`${k}/${d}`,kcF(k,d))+` = ${u*k}`), s:`${d}묶음 중 1묶음은 ${u}개, ${k}묶음은 <b>${u*k}개</b>예요. 먼저 한 묶음을 구하고, 묶음 수만큼 곱해요.`},
  {h:kcEq(`${N2}의 ${kcF(k2,d2)} = □`), s:`도토리 ${N2}개를 ${d2}묶음으로 나누어 생각해 보세요.`, ans:u2*k2, opts:kcO(u2*k2,u2,N2%k2===0?N2/k2*d2:k2), why:'한 묶음만 구하고 멈추면 안 돼요. 묶음 수만큼 곱해요.'}]}; };
KCARDS.C17=()=>{ const a=kcR(11,49)/10, a2=kcR(11,89)/10; return {t:'단위 바꾸기와 100배', p:[
  {h:kcEq('1 m = 100 cm')+kcFb(10,10,260,'1 m'), s:'1 m는 100 cm예요. m를 cm로 바꾸면 수가 <b>100배</b>가 돼요.'},
  {h:kcEq(`${a} m = ${kcD(a*100)} cm`), s:`100배가 되면 소수점이 <b>오른쪽으로 두 칸</b> 옮겨 가요. 10배는 한 칸이에요.`},
  {h:kcEq(`${a2} m = □ cm`), s:'몇 cm일까요?', ans:kcD(a2*100), opts:kcO(kcD(a2*100),kcD(a2*10),kcD(a2/100)), why:'1 m = 100 cm라서 100배, 소수점을 오른쪽으로 두 칸 옮겨요. cm가 m보다 작은 단위라 수는 커져요.'}]}; };
KCARDS.C18=()=>{ const m=kcR(2,9), h=kcR(1,9), m2=kcR(2,9), h2=kcR(1,9), N2=m2*10000+h2*100; return {t:'큰 수는 네 자리씩', p:[
  {h:kcEq(`${m*10000+h*100}`.replace(/(\d+)(\d{4})$/,'$1 | $2')), s:'큰 수는 뒤에서부터 <b>네 자리씩</b> 끊어요. 앞 칸이 만의 자리 묶음이에요.'},
  {h:kcEq(`${m}만 ${h}백 = ${m*10000+h*100}`), s:`'${m}만 ${h}백'을 숫자로 쓸 때, 천·십·일의 자리처럼 <b>읽지 않은 자리에는 0</b>을 써요.`},
  {h:kcEq(`${m2}만 ${h2}백 = □`), s:'숫자로 쓰면?', ans:N2, opts:kcO(N2,m2*1000+h2*100,m2*10000+h2*10), why:'만 다음에는 네 자리가 와요. 빈 자리에 0을 써요.'}]}; };
KCARDS.C21=()=>{ const a=kcR(2,15), b=kcR(2,6), c=kcR(2,6), a2=kcR(2,15), b2=kcR(2,6), c2=kcR(2,6); return {t:'계산하는 순서', p:[
  {h:kcEq(`${a} + ${b} × ${c}`), s:'더하기와 곱하기가 섞여 있어요. 무엇부터 할까요?'},
  {h:kcEq(`${a} + <u style="border-color:#7FB8E6;color:#4A2E14">${b} × ${c}</u> = ${a} + ${b*c} = ${a+b*c}`), s:'<b>곱셈과 나눗셈을 먼저</b>, 덧셈과 뺄셈은 그다음이에요. 괄호가 있으면 괄호 안이 맨 먼저예요.'},
  {h:kcEq(`${a2} + ${b2} × ${c2} = □`), s:'순서를 지켜 계산해 보세요.', ans:a2+b2*c2, opts:kcO(a2+b2*c2,(a2+b2)*c2,a2+b2+c2), why:'앞에서부터 하지 말고 곱셈부터 해요.'}]}; };
KCARDS.C22=()=>{ const P=[[12,18],[8,12],[12,16],[18,24],[16,24],[15,20],[20,30]], [a,b]=P[kcR(0,P.length-1)], [a2,b2]=P[kcR(0,P.length-1)], g=(x,y)=>y?g(y,x%y):x, dv=n=>Array.from({length:n},(_,i)=>i+1).filter(i=>n%i===0);
  const cm=dv(a).filter(x=>b%x===0), g2=g(a2,b2), l2=a2*b2/g2, mid=dv(g2).filter(x=>x>1&&x<g2); return {t:'공약수와 최대공약수', p:[
  {h:kcEq(`${a}: ${dv(a).join(', ')}`)+kcEq(`${b}: ${dv(b).join(', ')}`), s:`${a}의 약수와 ${b}의 약수예요. 약수는 <b>나누어떨어지게 하는 수</b>예요.`},
  {h:kcEq(`공약수: ${cm.join(', ')}`), s:`두 수에 모두 있는 수가 공약수, 그중 가장 큰 수 <b>${cm[cm.length-1]}</b>, 이 수가 최대공약수예요. 최소공배수와 헷갈리지 말아요.`},
  {h:kcEq(`${a2}와 ${b2}의 최대공약수 = □`.replace('와',[0,1,3,6,7,8].includes(a2%10)?'과':'와')), s:'두 수를 모두 나누어떨어지게 하는 가장 큰 수는?', ans:g2, opts:kcO(g2,l2,Math.min(a2,b2)), why:'가장 큰 공약수예요. 두 수의 배수가 아니에요.'}]}; };
KCARDS.C23=()=>{ const n=kcR(2,4), k=kcR(1,n-1), m=kcR(2,3), N2=[[4,6,2],[6,8,2],[6,9,3],[8,12,4],[10,15,5],[9,12,3]][kcR(0,5)], [x,y,g]=N2; return {t:'크기가 같은 분수와 약분', p:[
  {h:kcFb(n,k,240,kcF(k,n))+kcFb(n*m,k*m,240,kcF(k*m,n*m)), s:`두 띠의 색칠한 부분은 크기가 같아요. ${n}분의 ${k}와 ${n*m}분의 ${k*m}은 <b>같은 분수</b>예요.`},
  {h:kcEq(`${kcF(k*m,n*m)} = ${kcF(`${k*m} ÷ ${m}`,`${n*m} ÷ ${m}`)} = ${kcF(k,n)}`), s:`분자와 분모를 <b>같은 수로 나누면</b> 크기는 그대로예요. 이것을 약분이라고 해요. 같은 수를 빼면 안 돼요.`},
  {h:kcEq(`${kcF(x,y)} = <span class="frac"><b>?</b><i></i><b>${y/g}</b></span>`), s:'분자는 얼마일까요?', ans:x/g, opts:kcO(x/g,x,x-(y-y/g)>0?x-(y-y/g):x/g+1), why:`분모를 ${g}로 나눴어요. 분자도 같은 수로 나눠요.`}]}; };
KCARDS.C24=()=>{ const a=kcR(3,6), lo=kcR(10,20), hi=lo+kcR(3,6), ty=kcR(0,1), A=ty?hi-lo+1:hi-lo-1; return {t:'이상·이하·초과·미만', p:[
  {h:kcNL(a-3,a+3,a,true,1)+kcEq(`${a} 이상`), s:`${a} 이상은 <b>${a}을 포함</b>해서 더 큰 수예요. 점을 색칠해요. 이하도 포함해요.`.replace(`${a}을`,`${a}${[0,1,3,6,7,8].includes(a%10)?'을':'를'}`)},
  {h:kcNL(a-3,a+3,a,false,1)+kcEq(`${a} 초과`), s:'초과는 그 수를 <b>포함하지 않아요.</b> 점을 비워요. 미만도 포함하지 않아요.'},
  {h:kcEq(ty?`${lo} 이상 ${hi} 이하인 자연수`:`${lo} 초과 ${hi} 미만인 자연수`), s:'모두 몇 개일까요?', ans:A, opts:kcO(A,hi-lo,ty?hi-lo-1:hi-lo+1), why:(ty?'이상과 이하는 두 끝 수를 모두 넣어요.':'초과와 미만은 두 끝 수를 모두 빼요.')+' 빼기만 하지 말고 하나씩 세어 봐요.'}]}; };
KCARDS.C25=()=>{ const N=kcR(11,98)*100+kcR(10,90), up=Math.ceil(N/1000)*1000, dn=Math.floor(N/1000)*1000, rd=Math.round(N/1000)*1000, N2=kcR(11,98)*100+kcR(1,99), r2=Math.round(N2/100)*100; return {t:'올림·버림·반올림', p:[
  {h:kcEq(`${N}`)+kcEq(`올림 ${up} &nbsp; 버림 ${dn}`), s:'천의 자리까지 나타내요. 올림은 아래 자리를 모두 올리고, 버림은 모두 버려요.'},
  {h:kcEq(`${N}`)+kcEq(`반올림 ${rd}`), s:`반올림은 <b>바로 아래 자리 숫자</b>만 봐요. 5, 6, 7, 8, 9이면 올리고 0, 1, 2, 3, 4이면 버려요.`},
  {h:kcEq(`${N2} → 백의 자리까지 반올림`), s:'얼마가 될까요?', ans:r2, opts:kcO(r2,Math.round(N2/10)*10,r2===Math.floor(N2/100)*100?r2+100:Math.floor(N2/100)*100), why:'백의 자리 바로 아래인 십의 자리 숫자를 봐요.'}]}; };
KCARDS.C26=()=>{ const b=kcR(2,5), d=kcR(2,5), b2=kcR(2,6); let d2=kcR(3,7); if(d2===b2) d2++; return {t:'분수의 곱셈', p:[
  {h:kcFb(b,1,240,kcF(1,b)), s:`${b}분의 1의 ${d}분의 1을 구해요. ${b}칸 중 한 칸을 다시 ${d}칸으로 나누는 거예요.`},
  {h:kcFb(b*d,1,240,kcF(1,b*d))+kcEq(`${kcF(1,b)} × ${kcF(1,d)} = ${kcF(1,b*d)}`), s:`전체가 ${b*d}칸이 되니까 <b>분모끼리 곱하고</b>, 분자끼리 곱해요. 분모끼리 더하지 않아요.`},
  {h:kcEq(`${kcF(1,b2)} × ${kcF(1,d2)} = <span class="frac"><b>1</b><i></i><b>?</b></span>`), s:'분모는 얼마일까요?', ans:b2*d2, opts:kcO(b2*d2,b2+d2,Math.max(b2,d2)), why:'한 칸을 다시 나누면 칸이 곱만큼 생겨요.'}]}; };
KCARDS.C27=()=>{ const a=kcR(2,9), b=kcR(2,9), a2=kcR(2,9); let b2=kcR(2,9); if(a2*b2%10===0) b2=b2===9?7:b2+1; if(a2*b2%10===0) b2=3; const ans=kcD(a2*b2/100); return {t:'소수의 곱셈과 소수점', p:[
  {h:kcEq(`0.${a} × 0.${b}`), s:`먼저 소수점이 없다고 보고 ${a} × ${b} = ${a*b}를 구해요.`.replace(`${a*b}를`,`${a*b}${[0,1,3,6,7,8].includes(a*b%10)?'을':'를'}`)},
  {h:kcEq(`0.${a} × 0.${b} = ${kcD(a*b/100)}`), s:'두 수의 소수점 아래 자리를 더하면 1 + 1 = 2자리. 그래서 답도 <b>소수점 아래 두 자리</b>예요. 1보다 작은 수끼리 곱하면 더 작아져요.'},
  {h:kcEq(`0.${a2} × 0.${b2} = □`), s:'소수점 위치를 생각해 보세요.', ans, opts:kcO(ans,kcD(a2*b2/10),kcD(a2*b2/1000)), why:'곱하는 두 수의 소수점 아래 자리 수를 더해요.'}]}; };
KCARDS.C28=()=>{ const N=kcR(2,9)*10, op=kcR(0,1), v=[0.5,0.2,0.4,1.5,2,3][kcR(0,5)], big=op?v>1:v<1; return {t:'1보다 작은 수로 곱하고 나누기', p:[
  {h:kcEq(`${N} × 0.5 = ${kcD(N*0.5)}`), s:'1보다 작은 수를 <b>곱하면</b> 처음보다 작아져요. 0.5배는 반이에요.'},
  {h:kcEq(`${N} ÷ 0.5 = ${kcD(N/0.5)}`), s:`1보다 작은 수로 <b>나누면</b> 처음보다 커져요. ${N} 안에 0.5가 ${kcD(N/0.5)}번 들어가요.`},
  {h:kcEq(`${N} ${op?'×':'÷'} ${v}`), s:`계산 결과는 ${N}보다 클까요, 작을까요?`, ans:big?'커요':'작아요', opts:['커요','작아요','같아요'], why:'곱하는 수, 나누는 수가 1보다 큰지 작은지 먼저 봐요.'}]}; };
KCARDS.C29=()=>{ const P=[[6,3,4],[3,3,4],[4,2,3],[6,2,3],[2,2,5],[4,4,5],[3,3,5]], [a,b,c]=P[kcR(0,P.length-1)], [a2,b2,c2]=P[kcR(0,P.length-1)], q=a*c/b, q2=a2*c2/b2; return {t:'분수로 나누기', p:[
  {h:Array.from({length:a},()=>kcFb(c,c,180)).join('')+kcEq(`${a} ÷ ${kcF(b,c)}`), s:`${a} 안에 ${c}분의 ${b}이 몇 번 들어갈까요? 한 칸이 ${c}분의 1이라 모두 ${a*c}칸이에요.`},
  {h:kcEq(`${a*c}칸 ÷ ${b}칸 = ${q}`)+kcEq(`${a} × ${kcF(c,b)} = ${q}`), s:`${b}칸씩 덜어 내면 ${q}번. 계산은 <b>나누는 분수를 뒤집어 곱해요.</b>`},
  {h:kcEq(`${a2} ÷ ${kcF(b2,c2)} = □`), s:'몇 번 들어갈까요?', ans:q2, opts:kcO(q2,kcD(a2*b2/c2),a2*c2), why:'나누는 분수의 분자와 분모를 바꿔 곱해요.'}]}; };
KCARDS.C30=()=>{ const mk=()=>{ const d=kcR(2,9), q=kcR(2,9); return [d*q/10,d/10,q]; }; const [a,b,q]=mk(), [a2,b2,q2]=mk(); return {t:'소수로 나누기', p:[
  {h:kcEq(`${kcD(a)} ÷ ${kcD(b)}`), s:'나누는 수가 소수예요. 두 수에 똑같이 10을 곱해도 몫은 같아요.'},
  {h:kcEq(`${kcD(a)} ÷ ${kcD(b)} = ${kcD(a*10)} ÷ ${kcD(b*10)} = ${q}`), s:'두 수의 소수점을 <b>똑같이 한 칸씩</b> 옮겨 자연수 나눗셈으로 바꿔요. 한쪽만 옮기면 안 돼요.'},
  {h:kcEq(`${kcD(a2)} ÷ ${kcD(b2)} = □ ÷ ${kcD(b2*10)}`), s:'두 수에 똑같이 10을 곱하면 □는 얼마일까요?', ans:kcD(a2*10), opts:kcO(kcD(a2*10),kcD(a2),kcD(a2*100)), full:q2, why:'나누어지는 수와 나누는 수의 소수점을 같은 칸만큼 옮겨요.'}]}; };
const kcSvg=(w,h,body)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%">${body}</svg>`;
const kcClock=(h,m)=>{ const a=(m/60)*360, b=((h%12)+m/60)*30, P=(deg,r)=>[70+r*Math.sin(deg*Math.PI/180),70-r*Math.cos(deg*Math.PI/180)]; let g=`<circle cx="70" cy="70" r="62" fill="#fff" stroke="#6B3E1C" stroke-width="5"/>`; for(let k=1;k<=12;k++){ const [x,y]=P(k*30,48); g+=`<text x="${x}" y="${y+5}" font-size="14" text-anchor="middle" fill="#4A2E14">${k}</text>`; } const [x1,y1]=P(b,30), [x2,y2]=P(a,50); return kcSvg(140,140,g+`<line x1="70" y1="70" x2="${x1}" y2="${y1}" stroke="#4A2E14" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="70" x2="${x2}" y2="${y2}" stroke="#D45F16" stroke-width="3.5" stroke-linecap="round"/><circle cx="70" cy="70" r="4" fill="#4A2E14"/>`); };
const kcGrid=(w,h,c=18)=>kcSvg(w*c+4,h*c+4,Array.from({length:w*h},(_,i)=>`<rect x="${2+(i%w)*c}" y="${2+Math.floor(i/w)*c}" width="${c}" height="${c}" fill="#FFE3B0" stroke="#B5701F"/>`).join(''));
KCARDS.GC02=()=>{ const h=kcR(1,4), m=kcR(30,55), d=kcR(61-m,Math.min(59,99-m)), h2=kcR(1,4), m2=kcR(25,55), d2=kcR(61-m2,Math.min(59,99-m2)), tot=m2+d2; return {t:'60분은 1시간', p:[
  {h:kcClock(3,0)+kcClock(4,0), s:'긴바늘이 한 바퀴 도는 데 <b>60분</b>, 그동안 짧은바늘은 숫자 한 칸. 그래서 60분은 1시간이에요.'},
  {h:kcEq(`${h}시간 ${m}분 + ${d}분`)+kcEq(`= ${h}시간 ${m+d}분 = ${h+1}시간 ${m+d-60}분`), s:'분끼리 더해 <b>60분이 넘으면 1시간으로 바꿔요.</b> 100분이 아니라 60분이에요.'},
  {h:kcEq(`${h2}시간 ${m2}분 + ${d2}분 = □`), s:'얼마일까요?', ans:`${h2+1}시간 ${tot-60}분`, opts:[`${h2+1}시간 ${tot-60}분`,`${h2}시간 ${tot}분`,`${h2+1}시간 ${tot}분`], why:`${m2} + ${d2}분은 60분을 넘어요. 60분을 1시간으로 바꿔 더해요.`}]}; };
KCARDS.GC05=()=>{ const r=kcR(3,8), d2=kcR(3,9)*2; const circ=(r,lab,dia)=>kcSvg(150,150,`<circle cx="75" cy="75" r="62" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/><circle cx="75" cy="75" r="3.5" fill="#4A2E14"/>`+(dia?`<line x1="13" y1="75" x2="137" y2="75" stroke="#D45F16" stroke-width="3"/>`:`<line x1="75" y1="75" x2="137" y2="75" stroke="#D45F16" stroke-width="3"/>`)+`<text x="${dia?75:106}" y="68" font-size="15" text-anchor="middle" fill="#4A2E14">${lab}</text>`); return {t:'원의 반지름과 지름', p:[
  {h:circ(r,`${r} cm`,0), s:`원의 중심에서 원 위의 한 점까지가 <b>반지름</b>이에요. 이 원의 반지름은 ${r} cm.`},
  {h:circ(r,`${r*2} cm`,1), s:`중심을 지나 원의 한쪽 끝에서 다른 쪽 끝까지가 <b>지름</b>. 지름은 반지름의 2배라서 ${r*2} cm예요.`},
  {h:circ(0,`지름 ${d2} cm`,1), s:'이 원의 반지름은 몇 cm일까요?', ans:d2/2, opts:kcO(d2/2,d2,d2*2), why:'반지름은 지름의 반이에요.'}]}; };
KCARDS.GC06=()=>{ const mk=()=>{ let a,b; do{ a=kcR(35,75); b=kcR(35,75); }while(a+b>130||a+b<=90); return [a,b,180-a-b]; }; const [a,b,c]=mk(), [a2,b2,c2]=mk();
  const tri=(a,b,lab)=>{ const W=240,B=200,ra=a*Math.PI/180, rb=b*Math.PI/180, x0=B*Math.tan(rb)/(Math.tan(ra)+Math.tan(rb)), y0=x0*Math.tan(ra), sc=Math.min(1,110/y0), BB=B*sc, x=x0*sc, y=y0*sc, L=20+(B-BB)/2; const P=[[L,130],[L+BB,130],[L+x,130-y]]; return kcSvg(W,145,`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/>${(()=>{ const cx=(P[0][0]+P[1][0]+P[2][0])/3, cy=(P[0][1]+P[1][1]+P[2][1])/3; return P.map((v,i)=>`<text x="${v[0]+(cx-v[0])*.38}" y="${v[1]+(cy-v[1])*.38+5}" font-size="14" text-anchor="middle" fill="${i===2?'#D45F16':'#4A2E14'}">${lab[i]}</text>`).join(''); })()}`); };
  return {t:'삼각형 세 각의 합', p:[
  {h:tri(a,b,[a+'°',b+'°',c+'°']), s:'삼각형의 세 각을 잘라 한 줄로 이어 붙이면 <b>일직선</b>이 돼요.'},
  {h:tri(a,b,[a+'°',b+'°',c+'°'])+kcEq(`${a}° + ${b}° + ${c}° = 180°`), s:'그래서 삼각형 세 각의 합은 언제나 <b>180°</b>. 사각형은 삼각형 2개라서 360°예요.'},
  {h:tri(a2,b2,[a2+'°',b2+'°','?']), s:'?의 각은 몇 도일까요?', ans:c2, opts:kcO(c2,360-a2-b2,a2+b2), why:'180°에서 두 각을 빼요. 360°는 사각형이에요.'}]}; };
KCARDS.GC11=()=>{ const w=kcR(3,6), h=kcR(2,4), w2=kcR(5,8), h2=kcR(2,4); return {t:'넓이는 칸의 수', p:[
  {h:kcGrid(w,h), s:`한 칸이 1 cm²(가로 1 cm, 세로 1 cm)예요. 칸이 가로에 ${w}개씩 ${h}줄.`},
  {h:kcGrid(w,h)+kcEq(`${w} × ${h} = ${w*h} cm²`), s:`그래서 넓이는 가로 × 세로 = ${w*h} cm². 둘레(테두리 길이)와는 달라요.`},
  {h:kcEq(`가로 ${w2} cm, 세로 ${h2} cm인 직사각형의 넓이`), s:'몇 cm²일까요?', ans:w2*h2, opts:kcO(w2*h2,2*(w2+h2),w2+h2), why:'넓이는 칸의 수, 가로 × 세로예요. 테두리를 더하는 것은 둘레예요.'}]}; };
KCARDS.GC16=()=>{ const a=kcR(2,4), b=kcR(2,3), c=kcR(2,3), a2=kcR(2,5), b2=kcR(2,4), c2=kcR(2,4);
  const box=(a,b,c)=>{ const u=16, dx=8, dy=6; let g=''; for(let z=0;z<c;z++) for(let y=b-1;y>=0;y--) for(let x=0;x<a;x++){ const X=20+x*u+y*dx, Y=20+(c-1-z)*u+(b-1-y)*dy+10; g+=`<polygon points="${X},${Y} ${X+u},${Y} ${X+u+dx},${Y-dy} ${X+dx},${Y-dy}" fill="#FBD9A6" stroke="#B5701F"/><polygon points="${X+u},${Y} ${X+u+dx},${Y-dy} ${X+u+dx},${Y-dy+u} ${X+u},${Y+u}" fill="#E8B06A" stroke="#B5701F"/><rect x="${X}" y="${Y}" width="${u}" height="${u}" fill="#F7C47F" stroke="#B5701F"/>`; } return kcSvg(40+a*u+b*dx+10,40+c*u+b*dy,g); };
  return {t:'부피는 쌓기나무의 수', p:[
  {h:box(a,b,c), s:`1 cm³ 쌓기나무를 가로 ${a}개, 세로 ${b}개로 한 층을 깔고 ${c}층 쌓았어요.`},
  {h:box(a,b,c)+kcEq(`${a} × ${b} × ${c} = ${a*b*c} cm³`), s:`한 층에 ${a*b}개, ${c}층이라 모두 ${a*b*c}개. 부피 = 가로 × 세로 × 높이예요. 겉에 보이는 면만 세면 안 돼요.`},
  {h:kcEq(`가로 ${a2} cm, 세로 ${b2} cm, 높이 ${c2} cm`), s:'부피는 몇 cm³일까요?', ans:a2*b2*c2, opts:kcO(a2*b2*c2,2*(a2*b2+b2*c2+a2*c2),4*(a2+b2+c2)), why:'쌓기나무 수를 세는 것과 같아요. 세 길이를 곱해요.'}]}; };
KCARDS.GC18=()=>{ const r=kcR(2,6), r2=kcR(3,9); return {t:'원주와 원주율', p:[
  {h:kcSvg(260,110,`<circle cx="55" cy="55" r="40" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/><line x1="15" y1="55" x2="95" y2="55" stroke="#D45F16" stroke-width="3"/><line x1="115" y1="55" x2="250" y2="55" stroke="#B5701F" stroke-width="5"/><text x="182" y="80" font-size="14" text-anchor="middle" fill="#4A2E14">원주 ≈ 지름 × 3.14</text>`), s:'원의 둘레(원주)를 펴 보면 <b>지름의 약 3.14배</b>예요. 이 3.14를 원주율이라고 해요.'},
  {h:kcEq(`반지름 ${r} cm → 지름 ${2*r} cm`)+kcEq(`원주 = ${2*r} × 3.14 = ${kcD(2*r*3.14)} cm`), s:'원주는 <b>지름</b> × 원주율. 반지름이 주어지면 먼저 2배를 해서 지름을 구해요.'},
  {h:kcEq(`반지름 ${r2} cm인 원의 원주`), s:'몇 cm일까요?', ans:kcD(2*r2*3.14), opts:kcO(kcD(2*r2*3.14),kcD(r2*3.14),kcD(r2*r2*3.14)), why:'반지름이 아니라 지름에 3.14를 곱해요.'}]}; };
KCARDS.RC04=()=>{ const a=kcR(2,5), b=kcR(a+1,9), b2=[4,5,7,8,9][kcR(0,4)], a2=kcR(2,Math.min(5,b2-1)); return {t:'비와 비율', p:[
  {h:kcAc(a)+`<b style="font-size:1.4rem">:</b>`+`<span class="kc-ac">${'🍂'.repeat(b)}</span>`, s:`도토리 ${a}개, 나뭇잎 ${b}개. 나뭇잎에 대한 도토리의 비는 <b>${a} : ${b}</b>.`},
  {h:kcEq(`${a} : ${b}`)+kcEq(`비율 = ${kcF(a,b)}`), s:`'나뭇잎에 대한'처럼 '~에 대한'이 붙은 쪽이 <b>기준량</b>이에요. 기준량은 기호 : 의 오른쪽, 비율에서는 분모에 와요. 순서를 바꾸면 다른 비예요.`},
  {h:kcEq(`${a2} : ${b2}`), s:'이 비의 비율을 분수로 나타내면?', ans:`${b2}분의 ${a2}`, opts:[`${b2}분의 ${a2}`,`${a2}분의 ${b2}`,`${a2+b2}분의 ${a2}`], why:'비율 = 비교하는 양 ÷ 기준량. 기호 : 의 오른쪽 수가 분모예요.'}]}; };
KCARDS.RC05=()=>{ const p=[10,20,25,30][kcR(0,3)], N=kcR(2,9)*1000, p2=[10,20,30,40][kcR(0,3)], N2=kcR(2,9)*1000; return {t:'백분율과 할인', p:[
  {h:kcFb(10,p/10|0,260,p+'%'), s:`백분율은 <b>100을 기준으로</b> 나타낸 비율이에요. ${p}%는 100 가운데 ${p}이에요.`},
  {h:kcEq(`${N}원의 ${p}% = ${N*p/100}원`)+kcEq(`할인한 값 = ${N} − ${N*p/100} = ${N-N*p/100}원`), s:'할인은 할인되는 금액을 구해서 <b>원래 값에서 빼요.</b> 할인 금액이 곧 내야 할 돈이 아니에요.'},
  {h:kcEq(`${N2}원짜리를 ${p2}% 할인하면`), s:'얼마를 내야 할까요?', ans:N2-N2*p2/100, opts:kcO(N2-N2*p2/100,N2*p2/100,N2-p2), why:`먼저 ${N2}원의 ${p2}%를 구하고, 원래 값에서 빼요.`}]}; };
KCARDS.RC08=()=>{ const a=kcR(1,4), b=kcR(a+1,6), u=kcR(2,6), T=(a+b)*u, a2=kcR(2,4), b2=kcR(a2+1,7), u2=kcR(2,6), T2=(a2+b2)*u2; return {t:'비례배분', p:[
  {h:kcPl(a,u)+'<b style="font-size:1.4rem">|</b>'+kcPl(b,u), s:`도토리 ${T}개를 ${a} : ${b}로 나눠요. 전체를 ${a} + ${b} = <b>${a+b}묶음</b>으로 봐요.`},
  {h:kcEq(`한 묶음 = ${T} ÷ ${a+b} = ${u}`)+kcEq(`${u} × ${a} = ${a*u}, &nbsp;${u} × ${b} = ${b*u}`), s:'한 묶음을 구한 뒤 각자의 묶음 수만큼 곱해요. 두 몫을 더하면 처음 수가 돼요.'},
  {h:kcEq(`${T2}개를 ${a2} : ${b2}로 나누면 앞의 몫은?`), s:'몇 개일까요?', ans:a2*u2, opts:kcO(a2*u2,b2*u2,u2), why:'전체를 (앞 + 뒤)묶음으로 나누어 한 묶음을 먼저 구해요.'}]}; };
KCARDS.DC04=()=>{ const mk=()=>{ const avg=kcR(4,9), d=[kcR(-3,3),kcR(-3,3)]; const v=[avg+d[0],avg+d[1],avg-d[0]-d[1]]; return v.every(x=>x>0)?[v,avg]:mk(); }; const [v,avg]=mk(), [v2,avg2]=mk();
  const bars=v=>kcSvg(200,120,v.map((x,i)=>`<rect x="${20+i*60}" y="${110-x*9}" width="40" height="${x*9}" fill="#F0A050" stroke="#B5701F"/><text x="${40+i*60}" y="${104-x*9}" font-size="13" text-anchor="middle" fill="#4A2E14">${x}</text>`).join(''));
  return {t:'평균은 고르게 했을 때', p:[
  {h:bars(v), s:`세 친구가 도토리를 ${v.join(', ')}개 모았어요. 높은 막대에서 낮은 막대로 옮겨 <b>고르게</b> 하면 얼마씩일까요?`},
  {h:bars([avg,avg,avg])+kcEq(`(${v.join(' + ')}) ÷ 3 = ${avg}`), s:`모두 더해 사람 수로 나누면 ${avg}개씩. 이것이 평균이에요. 합계를 평균이라고 하면 안 돼요.`},
  {h:bars(v2), s:'평균은 몇 개일까요?', ans:avg2, opts:kcO(avg2,v2.reduce((a,b)=>a+b,0),Math.round((Math.max(...v2)+Math.min(...v2))/2)===avg2?avg2+1:Math.round((Math.max(...v2)+Math.min(...v2))/2)), why:'모두 더한 다음 사람 수로 나눠요.'}]}; };
KCARDS.GC03=()=>{ const k=kcR(1,4), g=kcR(100,900), k2=kcR(1,5), g2=kcR(0,1)?kcR(1,9):kcR(11,99); return {t:'큰 단위와 작은 단위', p:[
  {h:kcEq('1 kg = 1000 g')+kcEq('1 L = 1000 mL')+kcEq('1 m = 100 cm'), s:'큰 단위 1에 작은 단위가 몇 개 들어가는지가 단위마다 달라요. kg과 L는 <b>1000</b>, m는 <b>100</b>이에요.'},
  {h:kcEq(`${k} kg ${g} g = ${k*1000+g} g`), s:`${k} kg은 ${k*1000} g. 여기에 ${g} g을 더해요.`.replace(/(\d+) g을/,(m0,n)=>`${n} g${[0,1,3,6,7,8].includes(n%10)?'을':'를'}`)},
  {h:kcEq(`${k2} kg ${g2} g = □ g`), s:'몇 g일까요? 빈 자리에 주의해요.', ans:k2*1000+g2, opts:kcO(k2*1000+g2,+(`${k2}${g2}`),k2*1000+g2*10), why:`1 kg은 1000 g이라서 ${k2} kg은 ${k2*1000} g이에요. 숫자를 이어 붙이면 안 돼요.`}]}; };
KCARDS.GC08=()=>{ const tri=(pts,marks)=>kcSvg(160,120,`<polygon points="${pts}" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/>${marks||''}`); const S=[['정삼각형','세 변의 길이가 모두 같아요.'],['이등변삼각형','두 변의 길이가 같아요.'],['직각삼각형','한 각이 직각이에요.']]; const qk=kcR(0,1);
  return {t:'삼각형의 이름', p:[
  {h:tri('80,15 140,110 20,110')+tri('80,10 120,110 40,110'), s:'왼쪽은 세 변의 길이가 모두 같은 <b>정삼각형</b>, 오른쪽은 두 변의 길이가 같은 <b>이등변삼각형</b>이에요.'},
  {h:kcEq('정삼각형 → 이등변삼각형'), s:'정삼각형은 두 변의 길이도 같으니까 <b>이등변삼각형이기도 해요.</b> 하지만 이등변삼각형이 모두 정삼각형인 것은 아니에요.'},
  {h:kcEq(qk?'세 변이 8 cm, 8 cm, 8 cm인 삼각형':'세 변이 7 cm, 7 cm, 4 cm인 삼각형'), s:'이 삼각형을 부를 수 있는 이름을 모두 고른 것은?', ans:qk?'정삼각형, 이등변삼각형':'이등변삼각형', opts:qk?['정삼각형, 이등변삼각형','정삼각형만','이등변삼각형만']:['이등변삼각형','정삼각형','직각삼각형'], why:qk?'세 변이 같으면 두 변도 같아요. 이름이 둘이에요.':'두 변만 같아요. 세 변이 다 같지는 않아요.'}]}; };
KCARDS.GC10=()=>{ const q=kcR(0,2), Q=[['정사각형','모두 직사각형이라고 부를 수 있을까요?','있어요'],['직사각형','모두 정사각형이라고 부를 수 있을까요?','없어요'],['마름모','모두 평행사변형이라고 부를 수 있을까요?','있어요']][q];
  return {t:'사각형의 포함 관계', p:[
  {h:kcSvg(240,90,`<rect x="10" y="15" width="100" height="60" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/><rect x="150" y="10" width="70" height="70" fill="#FFE3B0" stroke="#B5701F" stroke-width="3"/>`), s:'직사각형은 <b>네 각이 모두 직각</b>. 정사각형은 네 각이 모두 직각이고 <b>네 변의 길이도 같아요.</b>'},
  {h:kcEq('정사각형 ⊂ 직사각형'), s:'그래서 정사각형은 직사각형의 조건을 다 가져요. <b>정사각형은 직사각형</b>이에요. 거꾸로 직사각형은 네 변이 같지 않을 수 있어 정사각형이 아닐 수 있어요.'},
  {h:kcEq(`${Q[0]}`), s:`${Q[0]}${Q[0]==='마름모'?'를':'을'} ${Q[1]}`, ans:Q[2], opts:['있어요','없어요','모양에 따라 달라요'], why:'두 도형의 조건을 나란히 놓고, 한쪽이 다른 쪽 조건을 모두 갖는지 봐요.'}]}; };
KCARDS.GC15=()=>{ const n=kcR(3,6), n2=kcR(5,9), nm=k=>({3:'삼',4:'사',5:'오',6:'육',7:'칠',8:'팔',9:'구'})[k]+'각기둥'; return {t:'각기둥의 수 규칙', p:[
  {h:kcEq(`${nm(n)}`), s:`${nm(n)}은 밑면이 ${n}각형 <b>2개</b>, 옆면이 <b>${n}개</b>예요.`},
  {h:kcEq(`면 ${n}+2 = ${n+2}, 모서리 ${n}×3 = ${n*3}, 꼭짓점 ${n}×2 = ${n*2}`), s:'모서리는 위 밑면 n개, 아래 밑면 n개, 옆 n개라서 <b>3 × n</b>. 꼭짓점은 위아래 n개씩이라 2 × n.'},
  {h:kcEq(`${nm(n2)}의 모서리 수`), s:'몇 개일까요?', ans:n2*3, opts:kcO(n2*3,n2*2,n2+2), why:'위 밑면, 아래 밑면, 옆을 이어 주는 모서리를 모두 세요.'}]}; };
KCARDS.RC03=()=>{ const k=kcR(2,5), k2=kcR(2,6), x=kcR(4,9); return {t:'대응 관계와 식', p:[
  {h:`<table style="font-size:1.2rem;border-collapse:collapse">${[['의자 수(○)',1,2,3,4],['다리 수(△)',k,2*k,3*k,4*k]].map(r=>`<tr>${r.map(c=>`<td style="border:1.5px solid #C9A46A;padding:4px 9px;text-align:center">${c}</td>`).join('')}</tr>`).join('')}</table>`, s:`의자가 1개 늘 때마다 다리는 ${k}개씩 늘어요.`},
  {h:kcEq(`△ = ○ × ${k}`), s:'짝 지어진 두 수를 <b>위아래로</b> 견줘서 식을 세워요. 옆으로 늘어나는 수만 보면 + 가 되어 틀려요.'},
  {h:kcEq(`△ = ○ × ${k2}, &nbsp;○가 ${x}일 때 △`), s:'△는 얼마일까요?', ans:x*k2, opts:kcO(x*k2,x+k2,x*k2+k2), why:'□에 수를 넣어 식대로 계산해요.'}]}; };
KCARDS.RC07=()=>{ const a=kcR(1,4), b=kcR(a+1,6), m=kcR(2,5), a2=kcR(1,4); let b2=kcR(a2+1,7); if(b2%a2===0&&a2>1) b2++; const m2=kcR(2,6); const g=(x,y)=>y?g(y,x%y):x, G=g(a2,b2); return {t:'비의 성질', p:[
  {h:kcEq(`${a} : ${b} = ${a*m} : ${b*m}`), s:`비의 앞과 뒤에 <b>같은 수를 곱해도</b> 비율은 같아요. ${a}과 ${b}에 ${m}을 곱했어요.`.replace(/(\d+)과/,(m0,n)=>n+([0,1,3,6,7,8].includes(n%10)?'과':'와')).replace(/(\d+)을 곱/,(m0,n)=>n+([0,1,3,6,7,8].includes(n%10)?'을':'를')+' 곱')},
  {h:kcEq(`${a*m} : ${b*m} = ${a} : ${b}`), s:'거꾸로 같은 수로 나눠서 간단한 자연수의 비로 만들 수 있어요. 같은 수를 더하거나 빼면 안 돼요.'},
  {h:kcEq(`${a2*m2} : ${b2*m2}을 간단한 자연수의 비로 = ${a2/G} : □`), s:'뒤의 수는?', ans:b2/G, opts:kcO(b2/G,b2*m2-(a2*m2-a2/G),b2*m2), why:'앞의 수를 나눈 수로 뒤의 수도 나눠요.'}]}; };
KCARDS.DC02=()=>{ const v=[kcR(1,9),kcR(1,9),kcR(1,9),kcR(1,9)].map(x=>x*2), sc=2, lab=['봄','여름','가을','겨울'], mx=v.indexOf(Math.max(...v));
  const g=(v,sc)=>kcSvg(240,150,`${Array.from({length:10},(_,t)=>`<line x1="30" y1="${130-t*12}" x2="230" y2="${130-t*12}" stroke="${t%2?'#F3E8D6':'#E0CBA8'}"/>${t%2?'':`<text x="24" y="${134-t*12}" font-size="11" text-anchor="end" fill="#4A2E14">${t*sc}</text>`}`).join('')}${v.map((x,i)=>`<rect x="${42+i*48}" y="${130-x/sc*12}" width="30" height="${x/sc*12}" fill="#F0A050" stroke="#B5701F"/><text x="${57+i*48}" y="146" font-size="12" text-anchor="middle" fill="#4A2E14">${lab[i]}</text>`).join('')}`);
  const k=kcR(0,3); return {t:'막대그래프 읽기', p:[
  {h:g(v,sc), s:'막대그래프는 막대의 길이로 수를 나타내요. 먼저 <b>세로 눈금 한 칸이 얼마인지</b> 봐요.'},
  {h:g(v,sc), s:`숫자가 0, ${sc*2}, ${sc*4}…로 커지고 그 사이에 칸이 둘. 그래서 <b>한 칸은 ${sc}</b>예요. 눈금 한 칸을 1로 읽으면 틀려요.`},
  {h:g(v,sc), s:`${lab[k]}의 막대는 얼마를 나타낼까요?`, ans:v[k], opts:kcO(v[k],v[k]/sc,v[k]+sc), why:'눈금 한 칸의 크기를 먼저 구하고 칸 수를 곱해요.'}]}; };
KCARDS.DC05=()=>{ const r=kcR(1,4), b=kcR(1,4); return {t:'일이 일어날 가능성', p:[
  {h:`<span class="kc-ac">${'🔴'.repeat(r)}${'🔵'.repeat(b)}</span>`, s:`주머니에 빨간 구슬 ${r}개, 파란 구슬 ${b}개. 하나를 꺼낼 때 노란 구슬이 나올 가능성은 <b>불가능</b>, 0이에요.`},
  {h:kcEq('불가능 0 ─ 반반 ½ ─ 확실 1'), s:'빨간 구슬만 들어 있으면 빨간 구슬이 나오는 것은 <b>확실</b>, 1이에요. 두 색이 같은 개수면 반반이에요.'},
  (()=>{ const t=kcR(0,2), n=kcR(1,3), bag=t===0?'🔴'.repeat(n*2):t===1?'🔵'.repeat(n*2):'🔴'.repeat(n)+'🔵'.repeat(n); return {h:`<span class="kc-ac">${bag}</span>`, s:'이 주머니에서 구슬 하나를 꺼낼 때 빨간 구슬이 나올 가능성을 수로 나타내면?', ans:['1','0','½'][t], opts:['0','1','½'], why:'주머니에 빨간 구슬이 몇 개, 다른 색이 몇 개인지 먼저 세어 봐요.'}; })()]}; };
const kcPoly=(n,r=44)=>kcSvg(110,110,`<polygon points="${Array.from({length:n},(_,i)=>{ const t=-Math.PI/2+i*2*Math.PI/n; return `${55+r*Math.cos(t)},${57+r*Math.sin(t)}`; }).join(' ')}" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/>`);
const kcFs=(tf,lab)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:0 6px">${kcSvg(64,74,`<g transform="translate(32 37) ${tf} translate(-15 -30)"><path d="M0,0 H30 V10 H10 V25 H24 V35 H10 V60 H0 Z" fill="#F0A050" stroke="#B5701F" stroke-width="2"/></g>`)}${lab?`<b style="font-size:1.1rem">${lab}</b>`:''}</span>`;
KCARDS.GC01=()=>{ const n=kcR(3,6), n2=kcR(3,7); return {t:'변과 꼭짓점', p:[
  {h:kcPoly(n), s:'도형의 곧은 선을 <b>변</b>, 두 변이 만나는 점을 <b>꼭짓점</b>이라고 해요.'},
  {h:kcPoly(n), s:`이 도형은 변이 ${n}개, 꼭짓점도 ${n}개예요. 변과 꼭짓점의 수는 같아요.`},
  {h:kcPoly(n2), s:'꼭짓점은 몇 개일까요?', ans:n2, opts:kcO(n2,n2*2,n2+1), why:'뾰족한 점만 세요. 변까지 함께 세지 않아요.'}]}; };
KCARDS.GC04=()=>{ const T=[[3,'직각'],[2,'직각보다 작아요'],[5,'직각보다 커요'],[9,'직각'],[1,'직각보다 작아요'],[4,'직각보다 커요']][kcR(0,5)];
  const ck=h=>{ const P=(deg,r)=>[50+r*Math.sin(deg*Math.PI/180),50-r*Math.cos(deg*Math.PI/180)], [x1,y1]=P(h*30,26), [x2,y2]=P(0,38); return kcSvg(100,100,`<circle cx="50" cy="50" r="44" fill="#fff" stroke="#6B3E1C" stroke-width="4"/><line x1="50" y1="50" x2="${x1}" y2="${y1}" stroke="#4A2E14" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${x2}" y2="${y2}" stroke="#D45F16" stroke-width="3" stroke-linecap="round"/>`); };
  return {t:'직각', p:[
  {h:kcSvg(120,100,`<polyline points="20,10 20,85 110,85" fill="none" stroke="#B5701F" stroke-width="4"/><polyline points="20,70 35,70 35,85" fill="none" stroke="#D45F16" stroke-width="2.5"/>`), s:'종이를 반듯하게 두 번 접으면 생기는 각이 <b>직각</b>이에요. 꼭짓점에 ㄴ 표시를 해요.'},
  {h:ck(3), s:'3시에 긴바늘과 짧은바늘이 이루는 각도 직각이에요. 각의 크기는 변의 길이가 아니라 <b>벌어진 정도</b>예요.'},
  {h:ck(T[0]), s:`${T[0]}시예요. 두 바늘이 이루는 각은?`, ans:T[1], opts:['직각','직각보다 작아요','직각보다 커요'], why:'3시의 직각과 견줘 보세요. 더 벌어졌나요, 덜 벌어졌나요?'}]}; };
KCARDS.GC07=()=>{ const Q=[['오른쪽으로 뒤집으면','scale(-1 1)'],['아래쪽으로 뒤집으면','scale(1 -1)'],['시계 방향으로 90°만큼 돌리면','rotate(90)'],['시계 반대 방향으로 90°만큼 돌리면','rotate(-90)']], k=kcR(0,3), cand=shuffle([Q[k][1],...shuffle(Q.filter((_,i)=>i!==k).map(x=>x[1])).slice(0,2)]), L=['가','나','다'];
  return {t:'밀기·뒤집기·돌리기', p:[
  {h:kcFs('','처음')+kcFs('','밀기'), s:'도형을 밀면 <b>모양과 방향이 그대로</b>예요. 자리만 옮겨 가요.'},
  {h:kcFs('','처음')+kcFs('scale(-1 1)','오른쪽 뒤집기')+kcFs('rotate(90)','시계 방향 90°'), s:'오른쪽(왼쪽)으로 뒤집으면 <b>왼쪽과 오른쪽이 바뀌어요.</b> 돌리면 위쪽이 돌린 방향으로 가요.'},
  {h:kcFs('','처음')+'<span style="width:100%"></span>'+cand.map((tf,i)=>kcFs(tf,L[i])).join(''), s:`처음 도형을 ${Q[k][0]} 어느 것이 될까요?`, ans:L[cand.indexOf(Q[k][1])], opts:L.slice(), why:'도형을 손으로 직접 뒤집거나 돌려 본다고 생각해 봐요. 튀어나온 부분이 어디로 가나요?'}]}; };
KCARDS.GC09=()=>{ const d=kcR(3,7), s2=d+kcR(1,3); return {t:'평행선 사이의 거리', p:[
  {h:kcSvg(240,110,`<line x1="10" y1="20" x2="230" y2="20" stroke="#B5701F" stroke-width="3"/><line x1="10" y1="90" x2="230" y2="90" stroke="#B5701F" stroke-width="3"/>`), s:'아무리 길게 늘여도 만나지 않는 두 직선을 <b>평행</b>하다고 해요.'},
  {h:kcSvg(240,110,`<line x1="10" y1="20" x2="230" y2="20" stroke="#B5701F" stroke-width="3"/><line x1="10" y1="90" x2="230" y2="90" stroke="#B5701F" stroke-width="3"/><line x1="70" y1="20" x2="70" y2="90" stroke="#D45F16" stroke-width="3"/><polyline points="70,78 82,78 82,90" fill="none" stroke="#D45F16" stroke-width="2"/><line x1="130" y1="20" x2="190" y2="90" stroke="#7FB8E6" stroke-width="3" stroke-dasharray="6 4"/>`), s:'평행선 사이에 <b>수직인 선분</b>의 길이가 평행선 사이의 거리예요. 비스듬한 선분은 더 길어서 거리가 아니에요.'},
  {h:kcSvg(240,110,`<line x1="10" y1="20" x2="230" y2="20" stroke="#B5701F" stroke-width="3"/><line x1="10" y1="90" x2="230" y2="90" stroke="#B5701F" stroke-width="3"/><line x1="70" y1="20" x2="70" y2="90" stroke="#D45F16" stroke-width="3"/><polyline points="70,78 82,78 82,90" fill="none" stroke="#D45F16" stroke-width="2"/><text x="60" y="60" font-size="14" text-anchor="end" fill="#4A2E14">${d} cm</text><line x1="130" y1="20" x2="190" y2="90" stroke="#7FB8E6" stroke-width="3"/><text x="170" y="50" font-size="14" fill="#4A2E14">${s2} cm</text>`), s:'평행선 사이의 거리는 몇 cm일까요?', ans:d, opts:kcO(d,s2,d+s2), why:'두 직선에 수직인 선분을 찾아요.'}]}; };
KCARDS.GC12=()=>{ const a=kcR(3,6), b=a+kcR(1,3), c=b+kcR(1,2), k=kcR(0,2), sides=[a,b,c], nm=[['ㄱㄴ','ㄹㅁ'],['ㄴㄷ','ㅁㅂ'],['ㄱㄷ','ㄹㅂ']];
  return {t:'합동과 대응변', p:[
  {h:kcSvg(240,100,`<polygon points="15,90 95,90 35,20" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/><polygon points="135,90 215,90 155,20" fill="#FFE3B0" stroke="#B5701F" stroke-width="3"/>`), s:'모양과 크기가 같아서 <b>포개었을 때 꼭 겹치는</b> 두 도형을 합동이라고 해요.'},
  {h:kcSvg(240,110,`<polygon points="15,90 95,90 35,20" fill="#FFF3DE" stroke="#B5701F" stroke-width="3"/><text x="10" y="105" font-size="13">ㄱ</text><text x="95" y="105" font-size="13">ㄴ</text><text x="30" y="15" font-size="13">ㄷ</text><polygon points="135,90 215,90 155,20" fill="#FFE3B0" stroke="#B5701F" stroke-width="3"/><text x="130" y="105" font-size="13">ㄹ</text><text x="215" y="105" font-size="13">ㅁ</text><text x="150" y="15" font-size="13">ㅂ</text>`), s:'포갰을 때 겹치는 변을 <b>대응변</b>이라고 해요. 대응변의 길이는 서로 같아요. 변 ㄱㄴ과 변 ㄹㅁ이 대응변이에요.'},
  {h:kcEq(`변 ${nm[0][0]} = ${a} cm, 변 ${nm[1][0]} = ${b} cm, 변 ${nm[2][0]} = ${c} cm`), s:`두 삼각형은 합동이에요. 변 ${nm[k][1]}의 길이는?`, ans:sides[k], opts:kcO(sides[k],sides[(k+1)%3],sides[(k+2)%3]), why:'변 ㄹㅁ은 ㄱㄴ, 변 ㅁㅂ은 ㄴㄷ, 변 ㄹㅂ은 ㄱㄷ과 포개져요.'}]}; };
KCARDS.GC13=()=>{ const d=kcR(1,4), d2=kcR(2,5); const g=(d,dot)=>{ const c=22; let r=''; for(let y=0;y<4;y++) for(let x=0;x<10;x++) r+=`<rect x="${5+x*c}" y="${5+y*c}" width="${c}" height="${c}" fill="#fff" stroke="#EADBC2"/>`; r+=`<line x1="${5+5*c}" y1="0" x2="${5+5*c}" y2="${10+4*c}" stroke="#D45F16" stroke-width="3" stroke-dasharray="6 4"/>`; r+=`<circle cx="${5+(5-d)*c}" cy="${5+1.5*c}" r="7" fill="#F0A050"/>`; if(dot) r+=`<circle cx="${5+(5+d)*c}" cy="${5+1.5*c}" r="7" fill="#7FB8E6"/>`; return kcSvg(10+10*c,10+4*c,r); };
  return {t:'선대칭의 대응점', p:[
  {h:g(d,false), s:'점선을 따라 접으면 꼭 겹치는 도형을 선대칭도형, 점선을 <b>대칭축</b>이라고 해요.'},
  {h:g(d,true), s:`주황 점은 대칭축에서 ${d}칸. 접으면 겹치는 파란 점도 <b>대칭축에서 ${d}칸</b>이에요. 대응점은 대칭축에서 같은 거리에 있어요.`},
  {h:g(d2,false), s:'이 점의 대응점은 대칭축에서 오른쪽으로 몇 칸일까요?', ans:d2, opts:kcO(d2,d2*2,d2+1), why:'대칭축까지의 칸 수와 같아요. 처음 점에서부터 세지 않아요.'}]}; };
KCARDS.GC14=()=>{ const Q=[['면','6'],['모서리','12'],['꼭짓점','8']], k=kcR(0,2); return {t:'직육면체', p:[
  {h:kcSvg(180,120,`<polygon points="20,40 120,40 120,110 20,110" fill="#FFE3B0" stroke="#B5701F" stroke-width="2.5"/><polygon points="20,40 55,10 155,10 120,40" fill="#FBD9A6" stroke="#B5701F" stroke-width="2.5"/><polygon points="120,40 155,10 155,80 120,110" fill="#E8B06A" stroke="#B5701F" stroke-width="2.5"/><polyline points="20,110 55,80 155,80" fill="none" stroke="#B5701F" stroke-dasharray="5 4"/><line x1="55" y1="10" x2="55" y2="80" stroke="#B5701F" stroke-dasharray="5 4"/>`), s:'직사각형 6개로 둘러싸인 도형이 직육면체예요. 보이지 않는 모서리는 <b>점선</b>으로 그려요.'},
  {h:kcEq('면 6 &nbsp; 모서리 12 &nbsp; 꼭짓점 8'), s:'마주 보는 면은 3쌍이고 서로 평행해요. 한 면과 만나는 면 4개는 그 면과 수직이에요. 보이는 것만 세면 틀려요.'},
  {h:kcEq(`직육면체의 ${Q[k][0]} 수`), s:'몇 개일까요?', ans:+Q[k][1], opts:kcO(+Q[k][1],[3,9,7][k],[8,6,12][k]), why:'점선으로 그린 보이지 않는 부분까지 세요.'}]}; };
KCARDS.GC17=()=>{ const mk=()=>{ for(;;){ const M=[[kcR(1,3),kcR(1,3)],[kcR(1,3),kcR(0,3)]], f=M.flat().filter(x=>x); if(new Set(f).size>=2&&Math.max(...f)>=2) return M; } }; const M=mk(), M2=mk(); const tab=M=>`<table style="font-size:1.5rem;border-collapse:collapse">${M.map(r=>`<tr>${r.map(c=>`<td style="width:46px;height:46px;border:2px solid #B5701F;text-align:center;background:${c?'#FFE3B0':'#fff'}">${c||''}</td>`).join('')}</tr>`).join('')}</table>`; const sum=M=>M.flat().reduce((a,b)=>a+b,0), cells=M=>M.flat().filter(x=>x).length;
  return {t:'쌓기나무 세기', p:[
  {h:tab(M), s:'위에서 본 모양의 각 칸에 <b>그 자리에 쌓인 개수</b>를 써요.'},
  {h:tab(M)+kcEq(`${M.flat().filter(x=>x).join(' + ')} = ${sum(M)}`), s:`칸의 수를 모두 더하면 쌓기나무는 ${sum(M)}개. 위에서 보이는 칸만 세면 안 돼요.`},
  {h:tab(M2), s:'쌓기나무는 모두 몇 개일까요?', ans:sum(M2), opts:kcO(sum(M2),cells(M2),Math.max(...M2.flat())*cells(M2)), why:'칸에 적힌 수를 모두 더해요.'}]}; };
KCARDS.GC19=()=>{ const Q=[['밑면이 2개인 입체도형','원기둥'],['밑면이 1개이고 뾰족한 꼭짓점이 있는 입체도형','원뿔'],['어느 방향에서 보아도 원 모양인 입체도형','구']], k=kcR(0,2); return {t:'원기둥·원뿔·구', p:[
  {h:kcSvg(260,110,`<ellipse cx="45" cy="25" rx="30" ry="9" fill="#FBD9A6" stroke="#B5701F" stroke-width="2"/><path d="M15,25 V85 A30,9 0 0 0 75,85 V25" fill="#FFE3B0" stroke="#B5701F" stroke-width="2"/><path d="M100,85 L130,15 L160,85 A30,9 0 0 1 100,85" fill="#FFE3B0" stroke="#B5701F" stroke-width="2"/><circle cx="215" cy="55" r="35" fill="#FFE3B0" stroke="#B5701F" stroke-width="2"/>`), s:'왼쪽부터 원기둥, 원뿔, 구예요.'},
  {h:kcEq('원기둥: 밑면 2개 &nbsp; 원뿔: 밑면 1개 &nbsp; 구: 밑면 없음'), s:'원기둥은 위아래가 같은 원, 원뿔은 꼭짓점이 하나, 구는 어느 쪽에서 봐도 원이에요.'},
  {h:kcEq(Q[k][0]), s:'무엇일까요?', ans:Q[k][1], opts:['원기둥','원뿔','구'], why:'밑면의 수와 꼭짓점이 있는지 떠올려 봐요.'}]}; };
KCARDS.RC01=()=>{ const E=['🔴','🔵','🟡'], pat=[[0,1],[0,1,1],[0,0,1],[0,1,2]][kcR(0,3)], L=pat.length, seq=Array.from({length:L*2+kcR(0,L-1)},(_,i)=>pat[i%L]), nx=pat[seq.length%L];
  return {t:'반복되는 규칙', p:[
  {h:`<div class="seqrow" style="--n:${seq.length}">${seq.map(i=>`<span class="seqit" style="font-size:1.4rem">${E[i]}</span>`).join('')}</div>`, s:'구슬이 어떤 순서로 놓였는지 보세요.'},
  {h:`<div class="seqrow" style="--n:${seq.length}">${seq.map((i,k)=>`<span class="seqit" style="font-size:1.4rem;${k%L===0&&k?'margin-left:10px;':''}${k<L?'background:#FFE3B0;border-radius:8px':''}">${E[i]}</span>`).join('')}</div>`, s:`<b>되풀이되는 묶음</b>을 찾아요. 이 묶음이 계속 반복돼요. 바로 앞의 것만 보면 틀리기 쉬워요.`},
  {h:`<div class="seqrow" style="--n:${seq.length+1}">${seq.map(i=>`<span class="seqit" style="font-size:1.4rem">${E[i]}</span>`).join('')}<span class="seqit seqq">?</span></div>`, s:'다음에 올 구슬은?', ans:E[nx], opts:E.slice(), why:'되풀이 묶음을 손으로 하나씩 끊어 봐요.'}]}; };
KCARDS.RC02=()=>{ const a=kcR(5,15), b=kcR(2,9), c=kcR(2,a-1), a2=kcR(10,20), b2=kcR(3,9), c2=kcR(2,a2-1), x2=a2+b2-c2; return {t:'등호의 양쪽은 같아요', p:[
  {h:kcEq(`${a} + ${b} = ${c} + □`), s:'=는 <b>양쪽이 같다</b>는 뜻이에요. 왼쪽을 다 계산한 값을 □에 쓰면 안 돼요.'},
  {h:kcEq(`${a+b} = ${c} + ${a+b-c}`), s:`왼쪽은 ${a+b}. 오른쪽도 ${a+b}이 되려면 □는 ${a+b-c}이에요.`.replace(/(\d+)이 되려면/,(m0,n)=>n+([0,1,3,6,7,8].includes(n%10)?'이':'가')+' 되려면')},
  {h:kcEq(`${a2} + ${b2} = ${c2} + □`), s:'□는 얼마일까요?', ans:x2, opts:kcO(x2,a2+b2,a2+b2+c2), why:'오른쪽도 왼쪽과 같은 값이 되도록 해요.'}]}; };
KCARDS.RC06=()=>{ const t=kcR(2,4), v=kcR(4,9)*10, t2=kcR(2,5), v2=kcR(3,9)*10; return {t:'속력', p:[
  {h:kcEq(`${v*t} km를 ${t}시간 동안`), s:`자동차가 ${t}시간 동안 ${v*t} km를 갔어요. 1시간 동안 간 거리는?`},
  {h:kcEq(`${v*t} ÷ ${t} = ${v}`)+kcEq(`속력 = 거리 ÷ 시간`), s:`1시간에 ${v} km. 이것이 속력이에요. 거리에 시간을 곱하면 안 돼요.`},
  {h:kcEq(`${v2*t2} km를 ${t2}시간에 간 자전거의 속력`), s:'시속 몇 km일까요?', ans:v2, opts:kcO(v2,v2*t2*t2,v2*t2-t2), why:'걸린 시간으로 거리를 나눠요.'}]}; };
KCARDS.DC01=()=>{ const sh=['▲','■','●'], co=['#E8963C','#4E95D9'], items=Array.from({length:7},()=>[kcR(0,2),kcR(0,1)]), kinds=new Set(items.map(x=>x[0])).size;
  const show=it=>`<span style="font-size:1.8rem;letter-spacing:6px">${it.map(([s,c])=>`<span style="color:${co[c]}">${sh[s]}</span>`).join('')}</span>`; return {t:'기준을 정해 나누기', p:[
  {h:show(items), s:'여러 도형이 섞여 있어요. 나누려면 먼저 <b>기준</b>을 정해요. 색깔로 나눌까요, 모양으로 나눌까요?'},
  {h:show(items), s:'기준은 누가 나눠도 결과가 같아야 해요. "예쁜 것"처럼 사람마다 다른 기준은 쓰지 않아요.'},
  {h:show(items), s:'모양을 기준으로 나누면 몇 가지로 나뉠까요?', ans:kinds, opts:kcO(kinds,2,items.length).map(x=>x), why:'색깔은 생각하지 말고, 모양의 종류만 세요.'}]}; };
KCARDS.DC03=()=>{ const mk=()=>{ const v=[kcR(5,12)]; for(let i=0;i<4;i++) v.push(v[i]+kcR(1,8)*(i===1?1:1)); return v; }; const v=mk(), H=['9시','10시','11시','12시','1시'];
  const g=v=>kcSvg(250,130,`${v.map((x,i)=>`<circle cx="${30+i*50}" cy="${120-x*2.4}" r="4" fill="#D45F16"/><text x="${30+i*50}" y="128" font-size="11" text-anchor="middle">${H[i]}</text><text x="${30+i*50}" y="${112-x*2.4}" font-size="11" text-anchor="middle">${x}</text>`).join('')}<polyline points="${v.map((x,i)=>`${30+i*50},${120-x*2.4}`).join(' ')}" fill="none" stroke="#D45F16" stroke-width="2.5"/>`);
  const d=v.slice(1).map((x,i)=>x-v[i]), mi=d.indexOf(Math.max(...d)), ans=`${H[mi]}~${H[mi+1]}`, last=`${H[3]}~${H[4]}`, other=`${H[(mi+1)%4]}~${H[(mi+1)%4+1]}`;
  return {t:'꺾은선그래프의 변화', p:[
  {h:g(v), s:'꺾은선그래프는 시간에 따라 <b>어떻게 변하는지</b> 보기 좋아요.'},
  {h:g(v), s:'선이 <b>가장 가파르게</b> 기운 곳이 가장 많이 변한 때예요. 점이 가장 높은 때가 변화가 큰 때는 아니에요.'},
  {h:g(v), s:'기온이 가장 많이 오른 때는 언제와 언제 사이일까요?', ans, opts:kcO(ans,mi===3?other:last,`${H[0]}~${H[1]}`===ans?`${H[2]}~${H[3]}`:`${H[0]}~${H[1]}`), why:'두 점의 차이를 구해 견줘 봐요. 높은 점이 아니라 기울기예요.'}]}; };
KCARDS.DC06=()=>{ const p=[10,15,20,25,30,35,40][kcR(0,6)], N=[200,300,400,500][kcR(0,3)], p2=[10,20,25,30,40][kcR(0,4)], N2=[200,300,400,600][kcR(0,3)];
  return {t:'띠그래프 읽기', p:[
  {h:`<div class="kc-bar"><span style="flex:${p};background:#F8C98A">${p}%</span><span style="flex:${100-p};background:#A9D2F0">${100-p}%</span></div>`, s:'띠그래프는 <b>전체를 100%</b>로 보고 부분이 차지하는 비율을 띠의 길이로 나타내요.'},
  {h:kcEq(`${N}명의 ${p}% = ${N*p/100}명`), s:`전체가 ${N}명이면 ${p}%는 ${N} × ${p} ÷ 100 = ${N*p/100}명. 퍼센트 수를 사람 수로 읽으면 안 돼요.`},
  {h:`<div class="kc-bar"><span style="flex:${p2};background:#F8C98A">${p2}%</span><span style="flex:${100-p2};background:#A9D2F0">${100-p2}%</span></div>`, s:`전체 ${N2}명 가운데 주황 부분은 몇 명일까요?`, ans:N2*p2/100, opts:kcO(N2*p2/100,p2,N2-p2), why:`전체 ${N2}명의 ${p2}%를 구해요.`}]}; };
/* 수 뒤 조사를 받침에 맞게(태그를 건너뛰어 본다): 3이에요/2예요, 3을/2를, 3은/2는, 3과/2와 */
const kcPJ=t=>String(t).replace(/(\d)((?:<\/[a-z]+>)?)(이에요|예요|을|를|은|는|과|와)(?=[\s,.!?<]|$)/g,(m,d,tag,j)=>{ const b=[0,1,3,6,7,8].includes(+d); const P={이에요:['이에요','예요'],예요:['이에요','예요'],을:['을','를'],를:['을','를'],은:['은','는'],는:['은','는'],과:['과','와'],와:['과','와']}[j]; return d+tag+(b?P[0]:P[1]); });
const kcJ=x=>{ let t=String(x); try{ if(typeof fixJ==='function') t=fixJ(t); }catch(e){} return kcPJ(t); };
/* 손글씨로 쓸지: 입력 방식을 고른 적이 있으면 그것을, 아니면 1~2학년이면 손글씨 */
function kcHand(){ let im=null; try{ im=localStorage.getItem('dotori-input'); }catch(e){} if(im) return im==='hand'; try{ const u=S&&S.ui!=null&&typeof UNITS36!=='undefined'?UNITS36[S.ui]:null; return !(u&&u.grade>=3); }catch(e){ return true; } }
function cardStep(stp,done){ done=done||(()=>{ S.si++; step(); }); const mk=KCARDS[stp.c]; if(!mk) return done(); kcSeen(stp.c,stp.why||'v'); let C=mk(), pi=0, tries=0; const who='halmi';
  const draw=()=>{ const P=C.p[pi], last=pi===C.p.length-1, hw=last&&C.hw&&kcHand()&&typeof P.ans==='number'&&typeof writePad==='function'; app.className='wrap';
    app.innerHTML=`<div class="top"><button class="back" id="back">← 목록</button><div class="crumb">${S.title}</div><span style="width:70px"></span></div>${S.steps&&S.si!=null&&!stp.inline?stepsBar():''}
      <div class="stage"><div class="talker">${talker(who)}<div class="bubble"><div class="who">${NAMES[who]}</div><div class="q">${C.t}</div><div class="hint">${stp.why==='ladder'?'같은 곳에서 두 번 막혔네. 잠깐 같이 볼까?':stp.why==='stuck'?'조금 어려웠지? 쉬운 것부터 같이 보자.':stp.why==='again'?'영상을 봤는데 한 번 더 다른 방법으로 볼까?':'문제를 풀기 전에 잠깐 같이 볼까?'}</div></div></div>
      <div class="kc-dots">${C.p.map((_,k)=>`<i class="${k===pi?'on':''}"></i>`).join('')}</div>
      <div class="kc-pic">${P.h}</div><div class="kc-say">${kcJ(P.s)}</div>
      ${!last?'':hw?`<div id="kchw"></div><div class="wtools"><button class="wclr" id="kcclr" aria-label="모두 지우기">지우기</button><button class="next" id="kcok">다 썼어!</button></div>`:`<div class="kc-opts">${shuffle(P.opts.slice()).map(o=>`<button data-v="${o}">${o}</button>`).join('')}</div>`}
      ${last?'<div class="kc-why" id="kcwhy"></div><button class="ghost" id="kcre" style="display:none;width:100%">다른 수로 다시 해 보기</button>':''}
      <button class="next" id="next"${last?' style="display:none"':''}>${last?'문제 풀러 가기 →':'다음 →'}</button></div>`;
    document.getElementById('back').onclick=backToList; try{ hush(); say(kcJ(P.s).replace(/<[^>]+>/g,''),who); }catch(e){}
    const nx=document.getElementById('next'); nx.onclick=()=>{ if(last){ kcDone(stp.c,tries); done(); } else { pi++; draw(); } };
    if(!last) return; try{ window.__kcAns=String(P.ans); }catch(e){} const why=document.getElementById('kcwhy'), re=document.getElementById('kcre');
    const good=()=>{ try{ sfx('good'); }catch(e){} why.textContent=P.full!=null?`맞아요! 그래서 답은 ${P.full}${[2,4,5,9].includes(+String(P.full).slice(-1))?'예요':'이에요'}.`:'맞아요!'; nx.style.display=''; };
    const bad=()=>{ tries++; try{ sfx('bad'); }catch(e){} why.textContent='💡 '+kcJ(P.why); re.style.display=''; };   /* 틀리면 같은 문제를 다시 고르게 하지 않고 수를 바꿔 다시 낸다(찍어서 넘어가지 못하게) */
    re.onclick=()=>{ C=mk(); pi=tries>=2?0:C.p.length-1; if(tries>=2) tries=0; draw(); };                                   /* 두 번 틀리면 첫 장부터 다시 */
    if(hw){ const pad=writePad(document.getElementById('kchw'),String(P.ans),'write',null,{}); document.getElementById('kcclr').onclick=()=>pad.clear();
      document.getElementById('kcok').onclick=()=>{ const r=pad.read(String(P.ans)); if(r.empty){ why.textContent='칸에 숫자를 써 주세요.'; return; } pad.lock(); document.getElementById('kcok').style.display='none'; document.getElementById('kcclr').style.display='none'; r.ok?good():bad(); }; }
    else app.querySelectorAll('.kc-opts button').forEach(b=>b.onclick=()=>{ app.querySelectorAll('.kc-opts button').forEach(x=>x.disabled=true); if(String(b.dataset.v)===String(P.ans)){ b.classList.add('ok'); good(); } else { b.classList.add('no'); bad(); } }); };
  draw(); }
{ const _step0=step; step=function(){ const s=S&&S.steps&&S.steps[S.si]; if(s&&s.kind==='card') return cardStep(s); return _step0(); }; }

/* 카드를 본 기록(기기 안): 어떤 조각을 왜(v 영상 대신, again 영상 뒤에도, ladder 같은 실수 두 번, stuck 연속 오답) 봤는지, 마지막 장을 몇 번 만에 맞혔는지.
   카드 바로 뒤 '비슷한 문제'의 정답 여부는 문제 기록에 방식 's'로 남는다 → 카드별 효과를 견줄 수 있다. */
const KCK='dotori-kt-cards';
function kcSeen(c,why){ try{ const L=JSON.parse(localStorage.getItem(KCK)||'[]'); L.push({c,why,t:Date.now()}); localStorage.setItem(KCK,JSON.stringify(L.slice(-300))); }catch(e){} }
function kcDone(c,tries){ try{ const L=JSON.parse(localStorage.getItem(KCK)||'[]'); const x=[...L].reverse().find(r=>r.c===c&&r.tries==null); if(x) x.tries=tries; localStorage.setItem(KCK,JSON.stringify(L)); }catch(e){} }



{ const _ra=runAct; runAct=function(){ const a=S.acts[S.i]; if(a&&a.kind==='card'){ S.tries=0; return cardStep({kind:'card',c:a.c,why:a.why,inline:true},()=>{ S.results[S.i]=null; S.i++; S.i<S.acts.length?runAct():result(); }); } return _ra(); }; }
