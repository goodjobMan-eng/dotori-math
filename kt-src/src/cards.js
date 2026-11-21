
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
  {h:kcBlk(t2,o2,b2)+kcEq(`${t2*10+o2} + ${b2} = □`), s:'낱개 10개를 묶음으로 바꿔 올려 보세요.', ans:s2, opts:kcO(s2,s2-10,+(`${t2}${o2+b2}`)), why:'낱개가 10개를 넘으면 묶음 1개로 바꿔 십의 자리에 더해요.'}], hw:HW}; };
KCARDS.C05=()=>{ const HW=1; const mk=()=>{ const t=kcR(3,6), o=kcR(1,4), b=kcR(o+2,9); return [t,o,b]; }; const [t,o,b]=mk(), [t2,o2,b2]=mk(), d2=t2*10+o2-b2; return {t:'받아내림이 있는 뺄셈', p:[
  {h:kcBlk(t,o)+kcEq(`${t*10+o} − ${b}`), s:`낱개가 ${o}개뿐이라 ${b}개를 뺄 수 없어요.`},
  {h:kcBlk(t-1,o,10)+kcEq(`${t*10+o} − ${b} = ${t*10+o-b}`), s:`묶음 1개를 풀어 <b>낱개 10개</b>로 바꿔요. 묶음은 ${t-1}개, 낱개는 ${o+10}개. ${o+10} − ${b} = ${o+10-b}이에요.`},
  {h:kcBlk(t2,o2)+kcEq(`${t2*10+o2} − ${b2} = □`), s:'묶음 1개를 풀어서 빼 보세요.', ans:d2, opts:kcO(d2,t2*10+(b2-o2),d2+10), why:'묶음 1개를 풀었으니 묶음이 1개 줄어요. 큰 수에서 작은 수를 그냥 빼면 안 돼요.'}], hw:HW}; };
KCARDS.C06=()=>{ const a=kcR(12,29), b=kcR(11,25), s=a+b, bar=`<div class="kc-bar"><span style="flex:${a};background:#F8C98A">${a}</span><span style="flex:${b};background:#A9D2F0">${b}</span></div><div style="width:92%;text-align:center;font-size:1.1rem">전체 ${s}</div>`; return {t:'덧셈과 뺄셈은 한 가족', p:[
  {h:bar, s:`전체 <b>${s}</b>는 ${a}와 ${b}로 되어 있어요.`},
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
  {h:area(t2,o2,b2)+kcEq(`${a2} × ${b2} = □`), s:'갈라서 곱한 다음 더해 보세요.', ans:a2*b2, opts:kcO(a2*b2,t2*b2*10+(o2*b2)%10,t2*b2+o2*b2), why:`${t2*10} × ${b2}와 ${o2} × ${b2}를 구해서 더해요. 올린 수도 잊지 말아요.`}]}; };
KCARDS.C10=()=>{ const mk=()=>{ const d=kcR(2,4), h=kcR(1,2), o=kcR(Math.ceil(10/d),9); return [d,h,o]; }; const [d,h,o]=mk(), [d2,h2,o2]=mk(), N=d*(h*100+o), N2=d2*(h2*100+o2), q2=h2*100+o2; return {t:'몫에 0이 들어가는 나눗셈', p:[
  {h:kcBlk(Math.floor(d*o/10),d*o%10,0,d*h)+kcEq(`${N} ÷ ${d}`), s:`백 모형 ${d*h}개를 ${d}묶음으로 똑같이 나누면 <b>${h}개씩</b>. 몫의 백의 자리는 ${h}예요.`},
  {h:kcBlk(Math.floor(d*o/10),d*o%10,0,0)+kcEq(`${N} ÷ ${d} = ${h}0${o}`), s:`십 모형 ${Math.floor(d*o/10)}개는 ${d}묶음으로 나눌 수 없어요. 그 자리 몫에 <b>0</b>을 써요. 십 모형 ${Math.floor(d*o/10)}개를 낱개 ${Math.floor(d*o/10)*10}개로 풀어 낱개 ${d*o%10}개와 합치면 <b>${d*o}개</b>, ${d}묶음으로 나누면 ${o}개씩이에요.`},
  {h:kcEq(`${N2} ÷ ${d2} = □`), s:'나눌 수 없는 자리에 0을 쓰는 것을 잊지 마세요.', ans:q2, opts:kcO(q2,h2*10+o2,h2*100+o2*10), why:'십의 자리를 나눌 수 없으면 몫의 십의 자리에 0을 써요.'}]}; };

const kcJ=x=>{ try{ return typeof fixJ==='function'?fixJ(String(x)):String(x); }catch(e){ return String(x); } };
function cardStep(stp){ const mk=KCARDS[stp.c]; if(!mk){ S.si++; return step(); } let C=mk(), pi=0, tries=0; const who='halmi';
  const draw=()=>{ const P=C.p[pi], last=pi===C.p.length-1, hw=last&&C.hw&&typeof P.ans==='number'&&typeof writePad==='function'; app.className='wrap';
    app.innerHTML=`<div class="top"><button class="back" id="back">← 목록</button><div class="crumb">${S.title}</div><span style="width:70px"></span></div>${stepsBar()}
      <div class="stage"><div class="talker">${talker(who)}<div class="bubble"><div class="who">${NAMES[who]}</div><div class="q">${C.t}</div><div class="hint">문제를 풀기 전에 잠깐 같이 볼까?</div></div></div>
      <div class="kc-dots">${C.p.map((_,k)=>`<i class="${k===pi?'on':''}"></i>`).join('')}</div>
      <div class="kc-pic">${P.h}</div><div class="kc-say">${kcJ(P.s)}</div>
      ${!last?'':hw?`<div id="kchw"></div><div class="wtools"><button class="wclr" id="kcclr" aria-label="모두 지우기">지우기</button><button class="next" id="kcok">다 썼어!</button></div>`:`<div class="kc-opts">${shuffle(P.opts.slice()).map(o=>`<button data-v="${o}">${o}</button>`).join('')}</div>`}
      ${last?'<div class="kc-why" id="kcwhy"></div><button class="ghost" id="kcre" style="display:none;width:100%">다른 수로 다시 해 보기</button>':''}
      <button class="next" id="next"${last?' style="display:none"':''}>${last?'문제 풀러 가기 →':'다음 →'}</button></div>`;
    document.getElementById('back').onclick=backToList; try{ hush(); say(kcJ(P.s).replace(/<[^>]+>/g,''),who); }catch(e){}
    const nx=document.getElementById('next'); nx.onclick=()=>{ if(last){ S.si++; step(); } else { pi++; draw(); } };
    if(!last) return; const why=document.getElementById('kcwhy'), re=document.getElementById('kcre');
    const good=()=>{ try{ sfx('good'); }catch(e){} why.textContent='맞아요!'; nx.style.display=''; };
    const bad=()=>{ tries++; try{ sfx('bad'); }catch(e){} why.textContent='💡 '+kcJ(P.why); re.style.display=''; };   /* 틀리면 같은 문제를 다시 고르게 하지 않고 수를 바꿔 다시 낸다(찍어서 넘어가지 못하게) */
    re.onclick=()=>{ C=mk(); pi=tries>=2?0:C.p.length-1; if(tries>=2) tries=0; draw(); };                                   /* 두 번 틀리면 첫 장부터 다시 */
    if(hw){ const pad=writePad(document.getElementById('kchw'),String(P.ans),'write',null,{}); document.getElementById('kcclr').onclick=()=>pad.clear();
      document.getElementById('kcok').onclick=()=>{ const r=pad.read(String(P.ans)); if(r.empty){ why.textContent='칸에 숫자를 써 주세요.'; return; } pad.lock(); document.getElementById('kcok').style.display='none'; document.getElementById('kcclr').style.display='none'; r.ok?good():bad(); }; }
    else app.querySelectorAll('.kc-opts button').forEach(b=>b.onclick=()=>{ app.querySelectorAll('.kc-opts button').forEach(x=>x.disabled=true); if(String(b.dataset.v)===String(P.ans)){ b.classList.add('ok'); good(); } else { b.classList.add('no'); bad(); } }); };
  draw(); }
{ const _step0=step; step=function(){ const s=S&&S.steps&&S.steps[S.si]; if(s&&s.kind==='card') return cardStep(s); return _step0(); }; }
