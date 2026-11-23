"""kt.js(1차본)의 문항 부분을 고치고 보강 문항·오개념 표·핵심 코드를 붙여 kt.js 2차본과 index.html을 만든다."""
import re, sys
src = open('kt_v1.js', encoding='utf-8').read()
head = src[:src.index('/* ---------- 4. 오개념 이름')]

# --- 도우미 함수 교체 ---
a = head.index('function MC(q, vis, ans, wr, extra){'); b = head.index('const ADD =')
HELP = r'''function MC(q, vis, ans, wr, extra){
  const A = String(ans), seen = new Set([A]), pool = [];
  const order = shuffle(wr.slice()).sort((x,y)=>(x[1]?0:1)-(y[1]?0:1));          // 코드가 붙은 오답을 먼저 넣는다
  for(const [v,c] of order){ if(v==null) continue; const s=String(v); if(s===''||seen.has(s)) continue; seen.add(s); pool.push([s,c]); }
  // 오개념 유형 수만큼 보기를 둔다: 코드가 서로 다른 오답은 모두(최대 4개), 모자라면 코드 없는 오답으로 2개까지 채운다.
  const used = new Set(), pk = []; for(const x of pool){ if(pk.length>=4) break; if(x[1]){ if(used.has(x[1])) continue; used.add(x[1]); pk.push(x); } }
  for(const x of pool){ if(pk.length>=2) break; if(!pk.includes(x)) pk.push(x); }
  for(const f of (extra||[])){ if(pk.length>=2) break; const s=String(f); if(!seen.has(s)){ seen.add(s); pk.push([s,null]); } }
  const o = CF(q, vis||'', A, [A, ...pk.map(x=>x[0])]); o.mis = {};
  pk.forEach(([s,c])=>{ if(c) o.mis[String(fixJ(s))] = c; });
  o.diag = 1; o._v = 0; return o;
}
// MT: 글 보기형 문제 묶음. [질문, 정답, [[오답, 코드], ...], 그림?] — 묶음 안 번호가 문항의 '종'(v)이 된다.
const MT = bank => () => { const i = rnd(0, bank.length-1); const [q,ans,wr,vis] = bank[i]; const o = MC(q, vis||'', ans, wr); o._v = i; return o; };
// WM: 직접 쓰기형. wr = [[예상 오답(정수), 코드], ...] — 아이가 그 수를 쓰면 그 오개념으로 기록.
function WM(q, vis, ans, wr, pre, post){
  const A=String(ans), coded=wr.filter(([v,c])=>v!=null&&c!=null&&v>=0&&Number.isInteger(v)&&String(v)!==A);
  // 칸 수가 정답 자릿수로 정해지므로, 자릿수가 같은 예상 오답이 없으면 보기형으로 낸다.
  if(coded.length && !coded.some(([v])=>String(v).length===A.length)){
    const f=v=>`${pre?pre+' ':''}${v}${post?' '+post:''}`, n=+ans;
    return MC(q, vis, f(A), coded.map(([v,c])=>[f(v),c]), [n+10, n+1, n>1?n-1:n+2].map(f));
  }
  const o = WN(q, vis||'', ans, pre||'', post||''); o.mis = {};
  for(const [v,c] of coded){ const s=String(v); if(!(s in o.mis)) o.mis[s]=c; }
  o.diag = 1; o._v = 0; return o;
}
'''
head = head[:a] + HELP + head[b:]
head = head.replace("const KT_VER = 1;", "const KT_VER = 2;")

lines = head.split('\n')
def rl(prefix, new):
    idx = [i for i, l in enumerate(lines) if l.strip().startswith(prefix)]
    assert len(idx) == 1, (prefix, len(idx))
    lines[idx[0]] = new
def sub(old, new, n=None):
    global lines
    t = '\n'.join(lines); c = t.count(old)
    assert c >= 1 and (n is None or c == n), (old, c)
    lines = t.replace(old, new).split('\n')

# --- 문항 고치기 ---
rl("ADD('S2-06', ()=>{ const h=rnd(3,9)", "ADD('S2-06', ()=>{ const h=rnd(3,9), b=rnd(1,h-1)*100+rnd(1,9)*10+rnd(1,9), a=h*100, r=a-b; const big=+String(b).split('').map((x,i)=>Math.abs(+String(a)[i]-x)).join('');")
rl("return WM(`${a} − ${b}`, vert2(a,'−',b,a-b), a-b, [[wrongNoDec", "  return WM(`${a} − ${b}`, vert2(a,'−',b,r), r, [[r+110,'N2-04'],[r+10,'N2-04'],[r+100,'N2-04'],[big,'N2-02']]); });")
sub("['둘이 같다','N3-06']", "['둘이 같다',null]"); sub("['똑같다','N3-06']", "['똑같다',null]"); sub("['같다','N4-02']", "['같다',null]")
rl("['크기가 서로 다른 4조각", "  ['크기가 서로 다른 4조각 중 1조각은 전체의 얼마일까?','4분의 1이라고 할 수 없다',[['4분의 1','N3-05'],['4분의 3',null]]],")
rl("['똑같이 나누지 않은 3조각", "  ['똑같이 나누지 않은 3조각 중 1조각은 전체의 얼마일까?','3분의 1이라고 할 수 없다',[['3분의 1','N3-05'],['3분의 2',null]]],")
rl("ADD('S3-79',", "ADD('S3-79', ()=>{ const [a,b]=rndPick([2,3],[2,5],[3,4],[3,5],[4,5]); return MC(`${b}분의 1 + ${a}분의 1`, '', F(a+b,a*b), [[`${a+b}분의 2`,'N5-04'],[F(1,a*b),null]]); });")
rl("ADD('S3-81',", "ADD('S3-81', ()=>{ const [p,q,r,s]=rndPick([5,8,1,3],[6,7,1,4],[7,9,1,4],[4,5,1,3],[7,8,2,5]); return MC(`${q}분의 ${p} − ${s}분의 ${r}`, '', F(p*s-r*q,q*s), [[`${q-s}분의 ${p-r}`,'N5-04'],[F(p*s-r*q+q,q*s),null]]); });")
rl("['15 초과인 수에 15가", "  ['15 초과인 자연수 중 가장 작은 수는?','16',[['15','N5-08'],['14','N5-08']]],")
sub("[`${d}분의 ${n}`,'N6-04']", "[`${d}분의 ${n}`,null]"); sub("[F(a*b,d*d),'N6-02']", "[F(a*b,d*d),null]")
sub("△ = □ + ${k*2-1}", "△ = □ + ${k-1}")
rl("['2 : 3과 4 : 5는 같은", "    ['2 : 3과 4 : 5 중 비율이 더 큰 것은?','4 : 5',[['둘이 같다','R6-02'],['2 : 3',null]]],")
rl("['150%는 나올 수", "    ['작년 학생은 100명, 올해는 150명이에요. 올해 학생 수는 작년의 몇 %?','150%',[['100%를 넘을 수 없어 나타낼 수 없다','R6-05'],['50%',null]]],")
rl("['정사각형은 직사각형이라고", "  ['네 각이 모두 직각인 사각형 가(가로 5 cm, 세로 3 cm)와 나(가로 4 cm, 세로 4 cm). 직사각형은?','가와 나 모두',[['가','G3-03'],['나',null]]],")
rl("['정삼각형은 이등변삼각형이라고", "  ['세 변이 5 cm, 5 cm, 5 cm인 삼각형 가와 5 cm, 5 cm, 3 cm인 삼각형 나. 이등변삼각형은?','가와 나 모두',[['나','G4-02'],['가',null]]],")
rl("['마름모는 평행사변형이라고", "  ['마름모는 평행사변형이라고 할 수 있을까?','항상 그렇다',[['아니다','G4-05'],['모양에 따라 다르다','G4-05']]],")
rl("['정사각형은 마름모라고", "  ['정사각형은 마름모라고 할 수 있을까?','항상 그렇다',[['아니다','G4-05'],['크기에 따라 다르다','G4-05']]],")
rl("['직사각형은 평행사변형이라고", "  ['평행사변형은 직사각형이라고 할 수 있을까?','네 각이 모두 직각일 때만 그렇다',[['항상 그렇다','G4-05'],['절대 아니다','G4-05']]],")
rl("['비스듬히 그려진 두 직선이", "  ['비스듬히 그려진 두 직선이 만나서 이루는 각이 직각이에요. 두 직선은?','서로 수직이다',[['수직이 아니다','G4-03'],['평행하다',null]]],")
rl("['지금 그려진 부분에서", "  ['그려진 부분에서는 만나지 않지만 길게 늘이면 만나는 두 직선은?','평행하지 않다',[['평행하다','G4-03'],['수직이다',null]]],")
rl("['각도기 바깥쪽 눈금은 60", "  ['각도기로 각도를 잴 때, 각도기의 중심은 어디에 맞출까요?','각의 꼭짓점',[['각의 한 변의 끝','G4-11'],['각의 다른 한 변',null]]],")
rl("['각도기 바깥쪽 눈금은 50", "  ['각도기로 각도를 잴 때, 각도기의 밑금은 어디에 맞출까요?','각의 한 변',[['각의 꼭짓점',null],['각의 다른 한 변이 가리키는 눈금','G4-11']]],")
rl("['둘레가 더 긴 직사각형은", "    ['둘레가 더 긴 직사각형의 넓이는?','더 넓을 수도, 더 좁을 수도 있다',[['항상 더 넓다','G5-01'],['항상 더 좁다',null]]],")
sub("[['둘이 같다','G5-01'],['가','G5-01']]", "[['둘이 같다','G5-01'],['가',null]]")
sub("[a*h/2%1?null:a*h/2,'G5-03'],", "")
rl("['넓이가 같은 두 직사각형은 항상", "    ['넓이가 같은 두 직사각형은?','합동일 수도 아닐 수도 있다',[['항상 합동이다','G5-07'],['절대 합동이 아니다',null]]],")
rl("['둘레가 같은 두 삼각형은 항상", "    ['둘레가 같은 두 삼각형은?','합동일 수도 아닐 수도 있다',[['항상 합동이다','G5-07'],['절대 합동이 아니다',null]]],")
rl("['세 각의 크기가 각각", "    ['크기가 다른 두 정삼각형은 세 각의 크기가 모두 같아요. 두 삼각형은?','합동이 아니다',[['합동이다','G5-07'],['알 수 없다',null]]],")
sub("return MC('넓이가 같은 두 직사각형은 항상 합동일까?','', '아니다', [['그렇다','G5-07']]);", "return MC('넓이가 같은 두 직사각형은?','', '합동일 수도 아닐 수도 있다', [['항상 합동이다','G5-07'],['절대 합동이 아니다',null]]);")
sub("'합동이 아니다', [['합동이다 (넓이가 같아서)','G5-07']]", "'합동이 아니다', [['합동이다','G5-07'],['알 수 없다',null]]")
rl("let a,b,c; do{", "    const [a,b,c]=rndPick([12,13,10],[9,10,7],[11,12,9],[6,7,5]);   // 그림의 변 길이 비와 비슷하게")
rl("let x,y; do{", "    let x,y; do{ x=rnd(68,75); y=rnd(42,48); }while(180-x-y===x);   // 그림의 각과 비슷하게")
sub("['알 수 없다','G5-08']", "['알 수 없다',null]")
rl("()=>{ const k=rndPick(['정사각형',4,", "  ()=>{ const k=rndPick(['직사각형(정사각형이 아닌)',2,[[4,'G5-09'],[1,null]]],['평행사변형(직사각형·마름모가 아닌)',0,[[2,'G5-09'],[4,null]]]);")
rl("['평행사변형은 선대칭도형일까?'", "    ['직사각형도 마름모도 아닌 평행사변형을 반으로 접으면?','어떻게 접어도 완전히 겹치지 않는다',[['대각선으로 접으면 겹친다','G5-09'],['가운데를 세로로 접으면 겹친다','G5-05']]],")
rl("['직사각형의 대각선은 대칭축일까?'", "    ['정사각형이 아닌 직사각형의 대칭축이 될 수 있는 것은?','마주 보는 변의 가운데를 지나는 직선',[['대각선','G5-09'],['한 변',null]]],")
rl("['정삼각형은 점대칭도형일까?'", "    ['정삼각형을 한 점을 중심으로 180° 돌리면?','처음 도형과 겹치지 않는다',[['완전히 겹친다','G5-05'],['크기가 달라진다',null]]],")
rl("['평행사변형은 점대칭도형일까?'", "    ['점대칭도형인 것은?','평행사변형',[['정삼각형','G5-05'],['이등변삼각형','G5-05']]],")
rl("['정육면체 전개도를 접었을 때", "  ['정육면체 전개도처럼 보이는 그림을 접었더니 두 면이 겹쳤어요. 이 그림은?','정육면체를 만들 수 없다',[['그래도 정육면체가 된다','G5-06'],['면이 7개인 도형이 된다',null]]],")
sub("const n=rnd(3,6); const nm=PNAME[n]; return MC(`옆으로 눕혀", "const n=rndPick(3,5,6); const nm=PNAME[n]; return MC(`옆으로 눕혀")
sub("'삼각뿔 (옆면이 삼각형이라서)'", "'삼각뿔'")
rl("['원기둥에 모서리가 있을까?'", "    ['원기둥의 모서리는 몇 개?','0개',[['2개','G6-15'],['3개','G6-15']]],")
rl("['구에 꼭짓점이 있을까?'", "  ['구의 꼭짓점은 몇 개?','0개',[['1개','G6-15'],['2개',null]]],")
rl("['반 학생들이 좋아하는 과일의", "  ['반 학생들이 좋아하는 과일별 학생 수를 비교하기 좋은 그래프는?','막대그래프',[['꺾은선그래프','D6-05'],['수 배열표',null]]],")
rl("['평균은 반드시 자료", "  ['3, 4, 8의 평균을 5라고 구했어요. 자료에 5가 없는데 맞을까?','맞다. 평균은 자료에 없는 값일 수 있다',[['틀렸다. 평균은 자료 중 하나여야 한다','D5-01'],['틀렸다. 평균은 가장 큰 값이다',null]]],")
rl("['평균은 가장 많이", "  ['2, 2, 2, 10의 평균은?','4',[['2','D5-01'],['6','D5-02']]],")
sub(",[xs[1],'D5-01']", "")
rl("['주사위를 던져 1이 나올", "  ['주사위를 한 번 던질 때 1이 나올 가능성은?','반반보다 작다',[['반반이다','D5-03'],['확실하다',null]]],")
sub("const ta=rndPick(200,300,400)", "const ta=rndPick(300,400,500)")
sub("['그렇다 (둘 다 1 차이)'", "['그렇다'") if "['그렇다 (둘 다 1 차이)'" in '\n'.join(lines) else None

# --- 보기가 겹쳐 2개만 남는 경우를 막는 예비 보기 ---
sub("[F(a*b,d*d),null]]); });", "[F(a*b,d*d),null]], [String(q+1)]); });", 1)
sub("[[F(fn,fd),'N6-05'],[F(un,ud),null]]); });", "[[F(fn,fd),'N6-05'],[F(un,ud),null]], [F(fn*un+1,fd*ud)]); });", 1)
sub("[`${s}%`,'R6-08']]); },", "[`${s}%`,'R6-08']], [`${w}%`]); },", 1)
sub("const a=rnd(1,4), b=a+rnd(1,3), k=rnd(2,6);", "const a=rnd(1,3), b=a+rnd(1,2), k=a*b*rndPick(1,2);", 1)
sub("[`${D1(r*r*3.14)} cm`,'G6-12']]); },", "[`${D1(r*r*3.14)} cm`,'G6-12']], [`${D1(4*r*3.14)} cm`]); },", 1)
sub("[`${D1(4*r*r*3.14)} cm²`,'G6-12']]); },", "[`${D1(4*r*r*3.14)} cm²`,'G6-12']], [`${D1(r*3.14)} cm²`]); },", 1)
sub("[`${2*k}배`,'G6-13']]); });", "[`${2*k}배`,'G6-13']], ['8배']); });", 1)
sub("}while(m%1||m===(Math.min(...xs)+Math.max(...xs))/2);", "}while(m%1||(Math.min(...xs)+Math.max(...xs))%2||m===(Math.min(...xs)+Math.max(...xs))/2);", 1)
sub("[`${t}%`,null]]); },", "[`${t}%`,null]], [`${100-p}%`]); },", 1)
sub("[`${a}%`,'D6-03']]); });", "[`${a}%`,'D6-03']], [`${100-b}%`]); });", 1)

sub("[[`${2*(a+b)} cm²`,'G5-01'],[`${a+b} cm²`,'G5-01']]); },", "[[`${2*(a+b)} cm²`,'G5-01'],[`${a+b} cm²`,'G5-01']], [`${a*b+a} cm²`]); },", 1)


out = '\n'.join(lines) + open('src/bank2.js', encoding='utf-8').read() + open('src/mis.js', encoding='utf-8').read() + open('src/tags3.js', encoding='utf-8').read() + open('src/basic.js', encoding='utf-8').read() + open('src/kfix.js', encoding='utf-8').read() + open('src/manip2.js', encoding='utf-8').read() + open('src/cpiece.js', encoding='utf-8').read() + open('src/assets2.js', encoding='utf-8').read() + open('src/core2.js', encoding='utf-8').read().replace('/*__FACTS__*/', open('src/facts.js', encoding='utf-8').read()).replace('/*__MODES__*/', open('src/modes.js', encoding='utf-8').read() + open('src/coach.js', encoding='utf-8').read()) + open('src/cards.js', encoding='utf-8').read()
open('kt.js', 'w', encoding='utf-8').write(out)

h = open('/tmp/dotori-math/index.html', encoding='utf-8').read()
_t="['수직','평행','합동']"; assert h.count(_t)==1; h=h.replace(_t,"['수직','평행','대각선']")   # 4학년 문항의 보기에 5학년 용어(합동)
i = h.index("const em=equivMsg(q,r.guess); if(em){"); j = h.index("S.tries++; sfx('bad');", i); assert j - i < 300
h = h[:j] + "if(S.tries===0&&window.KT) KT.rec(q,r.guess,false); " + h[j:]
i2 = h.index("const r=pad.read(ans); const fb=document.getElementById('fb');"); j2 = h.index("S.tries++; sfx('bad');", i2); assert j2 - i2 < 500 and j2 < j
h = h[:j2] + "if(S.tries===0&&window.KT) KT.rec(q,r.guess==null?'':r.guess,false); " + h[j2:]
# 조작 문제: 처음 '다 했어요'를 눌렀을 때의 상태를 짧은 문자열로 남긴다(q._mstate). 종류마다 상태를 읽는 식을 check 옆에 붙인다.
MST = [("check:()=>h===th&&m===tm,", "h+':'+m"), ("check:()=>d===target,", "''+d"), ("check:()=>len===target,", "''+len"), ("check:()=>tKey(cur)===tKey(target),", "String(tKey(cur))"),
 ("check:()=>px===x0+dx&&py===y0+dy,", "(px-x0)+','+(py-y0)"), ("check:()=>on.size===n,", "on.size+'/'+d"), ("check:()=>items.every((it,i)=>want(it)===sel.has(i)),", "[...sel].sort((a,b)=>a-b).join('.')"),
 ("check:()=>h.every((v,i)=>v*step===target[i]),", "h.map(v=>v*step).join(',')"), ("check:()=>check(v),", "v.join('')"), ("check:()=>holes.every(h=>val[h]===seq[h]),", "holes.map(h=>val[h]).join(',')"),
 ("check:()=>mode==='vertex'?tapped.size===n:lines.size===n*(n-3)/2,", "''+(mode==='vertex'?tapped.size:lines.size)"), ("check:()=>Math.abs(v-target)<step/2,", "''+(+(+v).toFixed(3))"),
 ("check:()=>tot()===target,", "''+tot()"), ("check:()=>sel===target.join(','),", "''+sel"), ("check:()=>rad===r,", "''+rad"), ("check:()=>v.every(x=>x===avg),", "v.join(',')")]
for a, st in MST:
    assert h.count(a) == 1, a
    h = h.replace(a, a + " state:()=>" + st + ",")
h = h.replace("check:()=>on.size===n, state:()=>on.size+'/'+d,", "check:()=>on.size===n, state:()=>on.size+'/'+d, mcode:()=>(!dec&&on.size===d-n&&d-n!==n)?'N3-16':(!dec&&on.size===d)?'N3-17':null,")
# 조작 상태 → 오개념 코드 규칙(Gemini 제안을 도구의 변수에 맞춤). 위에서부터 먼저 맞는 것.
MC = [("state:()=>h+':'+m,", "(h%12===Math.round(tm/5)%12&&Math.abs(m-(th%12)*5)<=2&&h%12!==th%12)?'G2-10':(tm>=35&&h%12===(th%12+1)%12&&Math.abs(m-tm)<=1)?'G2-06':(tm>0&&tm%5===0&&h%12===th%12&&m===tm/5)?'G2-07':null"),
 ("state:()=>''+d,", "(target!==90&&Math.abs(d-(180-target))<=3)?'G4-01':null"), ("state:()=>''+len,", "len===target+1?'G2-09':null"), ("state:()=>''+rad,", "(rad===2*r||rad*2===r)?'G3-04':null"),
 ("state:()=>h.map(v=>v*step).join(','),", "(step>1&&h.filter((v,i)=>target[i]>0&&v===target[i]).length>=Math.ceil(target.filter(x=>x>0).length*.6))?'D4-01':null")]
MC.append(("state:()=>''+(+(+v).toFixed(3)),", "Math.abs(v-(target-step))<step/2&&target-step>lo?'G2-09':null"))
MC.append(("state:()=>String(tKey(cur)),", "(()=>{ const K=tKey, R=k=>tApply(f,c=>tRot(c,k)), ck=K(cur), tk=K(target); if(ck===K(f)) return null; const rk=[1,2,3].find(k=>K(R(k))===tk), fl=[tLR,tUD].find(g=>K(tApply(f,g))===tk), cr=[1,2,3].find(k=>K(R(k))===ck), cf=[tLR,tUD].find(g=>K(tApply(f,g))===ck); if(rk&&!fl){ if(cr) return cr===4-rk?'G4-10':'G4-13'; if(cf) return 'G4-04'; } if(fl&&!rk){ if(cf) return 'G4-14'; if(cr) return 'G4-04'; } return null; })()"))

# ---- 소수점 직접 찍기: 소수 답 칸의 소수점을 미리 찍지 않고 아이가 칸 사이를 눌러 찍는다 ----
_a = "function mountWriteQ36(q){ const host=document.getElementById('wpad'); const ans=String(q.ans); const slots=[...document.querySelectorAll('#visual .vslot')]; const g=(UNITS36[S.ui]||{}).grade||3;"
assert h.count(_a) == 1
h = h.replace(_a, _a + """
  /* 소수 답: 칸마다 쓰는 대신 답을 통째로 쓴다(12.4처럼 소수점도 직접). 칸 사이 점 찍기는 헷갈려서 없앴다(교수님 11/21). */
  let _m0; try{ _m0=localStorage.getItem('dotori-input'); }catch(e){} if(!_m0) _m0=g>=3?'pad':'hand';
  const DP=null; const FREE=(()=>{ const ds=[...document.querySelectorAll('#visual em.dot')];
    if(ds.length===0&&slots.length){ /* 소수 계산인데 답이 자연수로 떨어진 경우(0.5 × 6 = 3)도 같은 답 상자를 쓴다: 칸 모양으로 '소수가 아니다'를 알려 주지 않게 */ const grp=slots[0].parentElement, txt=String(q.q||'')+' '+document.getElementById('visual').textContent; if(!grp||!grp.classList.contains('vgrp')||slots.some(x=>x.parentElement!==grp)||!/^\\d+$/.test(ans)) return null; const isDec=/\\d\\.\\d/.test(txt); if(!isDec&&(_m0==='hand'||q.ub||q._step||/^0\\d/.test(ans)||document.querySelectorAll('#visual .vgrp').length!==1)) return null;   /* 정수 답도 숫자판 모드에서는 상자 하나(자릿수 힌트 없음). 손글씨 모드는 숫자를 직접 쓰게 칸 그대로 */ slots.forEach(x=>x.remove()); const box=document.createElement('div'); box.className='freeans empty'; box.id='freeans'; grp.appendChild(box); grp.classList.add('hasfree'); return {p:ans.length,box,int:!isDec}; }
    if(ds.length!==1) return null; const grp=ds[0].parentElement, gs=[...grp.querySelectorAll('.vslot')]; if(gs.length<2||gs.length!==slots.length||!grp.classList.contains('vgrp')) return null; let p=0; for(const n of grp.children){ if(n===ds[0]) break; if(n.classList.contains('vslot')) p++; } if(p<1||p>=gs.length) return null;
    ds[0].remove(); gs.forEach(x=>x.remove()); const box=document.createElement('div'); box.className='freeans empty'; box.id='freeans'; grp.appendChild(box); grp.classList.add('hasfree'); return {p,box}; })();
  if(FREE) return mountFree(q,host,ans,FREE);
  /* 손글씨 모드(1~2학년 기본)는 숫자를 직접 써 보는 것이 중요해서 칸을 그대로 둔다. 숫자판 모드에서만 단위 상자. */
  if(q.ub&&_m0!=='hand'){ const gs=[...document.querySelectorAll('#visual .vgrp')]; if(gs.length===2&&slots.every(x=>gs.includes(x.parentElement))){ slots.forEach(x=>x.remove()); const boxes=gs.map((g,i)=>{ const d=document.createElement('div'); d.className='ubox empty'; d.dataset.i=i; g.appendChild(d); g.classList.add('hasfree'); return d; }); return mountUnit(q,host,ans,boxes); } }""")
_a = "function mountWriteQ36(q){"
assert h.count(_a) == 1
h = h.replace(_a, """/* 시간·복합 단위 답: 단위마다 답 상자 하나(자릿수 힌트 없음). 빈 상자는 제출을 막는다. 값이 같지만 넘친 채로 둔 답(3시간 75분)은 G2-17 */
function mountUnit(q,host,ans,boxes){ const U=q.ub, A=U.a, tot=A[0]*U.base+A[1]; let vals=['',''], sel=0, lock=false;
  const paint=()=>boxes.forEach((b,i)=>{ b.textContent=vals[i]; b.classList.toggle('empty',!vals[i]); b.classList.toggle('sel',!lock&&i===sel); });
  const key=k=>{ if(lock) return; if(k==='⌫'){ if(!vals[sel]&&sel>0) sel--; else vals[sel]=vals[sel].slice(0,-1); } else if(k==='→') sel=(sel+1)%2; else if(vals[sel].length<4) vals[sel]+=k; paint(); };
  boxes.forEach((b,i)=>b.onclick=()=>{ if(lock) return; sel=i; paint(); });
  host.innerHTML=`<div class="numpad">${['1','2','3','4','5','6','7','8','9','→','0','⌫'].map(k=>`<button class="nk${/\\d/.test(k)?'':' fn'}" data-k="${k}"${k==='→'?' aria-label="다음 칸"':''}>${k==='→'?'다음 칸':k}</button>`).join('')}</div><div class="wtools"><button class="next wok">다 썼어!</button><button class="wmode">✍️ 손글씨</button></div>`;
  host.querySelectorAll('.nk').forEach(b=>b.onclick=()=>key(b.dataset.k)); host.querySelector('.wok').onclick=()=>submit();
  host.querySelector('.wmode').onclick=()=>{ try{ localStorage.setItem('dotori-input','hand'); }catch(e){} document.removeEventListener('keydown',onKey); document.getElementById('visual').innerHTML=q.visual; mountWriteQ36(q); };
  const onKey=e=>{ if(!document.body.contains(boxes[0])||lock){ document.removeEventListener('keydown',onKey); return; } if(/^[0-9]$/.test(e.key)) key(e.key); else if(e.key==='Backspace') key('⌫'); else if(e.key==='Tab'||e.key===' '||e.key==='ArrowRight'||e.key==='ArrowLeft') key('→'); else if(e.key==='Enter'){ if(sel===0&&vals[0]&&!vals[1]) key('→'); else submit(); } else return; e.preventDefault(); }; document.addEventListener('keydown',onKey);
  const done=()=>{ lock=true; host.querySelector('.wtools')?.remove(); host.querySelector('.numpad')?.remove(); document.removeEventListener('keydown',onKey); paint(); };
  const addNext=fb=>{ if(document.getElementById('next')) return; fb.insertAdjacentHTML('beforeend',`<button class="next" id="next">${S.i>=S.acts.length-1?'결과 보기 ★':'다음 →'}</button>`); const nb=document.getElementById('next'); nb.onclick=()=>{ S.i++; S.i<S.acts.length?runAct():result(); }; nb.scrollIntoView({block:'nearest',behavior:'smooth'}); };
  function submit(){ if(lock) return; const fb=document.getElementById('fb'); const e=vals.findIndex(v=>!v);
    if(e>=0){ sfx('bad'); host.classList.add('shakey'); setTimeout(()=>host.classList.remove('shakey'),450); sel=e; paint(); fb.innerHTML=`<div class="fb no"><div class="msg">${U.u[e]} 칸이 비어 있어요. 없으면 0을 써요.</div></div>`; return; }
    const x=parseInt(vals[0],10), y=parseInt(vals[1],10); if(x===A[0]&&y===A[1]){ done(); boxes.forEach(b=>b.classList.add('show')); answer({dataset:{v:ans},classList:{add(){}}},q); return; }
    const same=x*U.base+y===tot; delete q._mcode; if(same) q._mcode='G2-17';   /* 값은 같지만 큰 단위로 바꾸지 않음 */
    if(S.tries===0&&window.KT) KT.rec(q,x+','+y,false); S.tries++; sfx('bad');
    if(S.tries<2){ fb.innerHTML=`<div class="fb no">${chip('doto','oops')}<div class="msg">${same?`값은 맞아요! ${U.base} ${U.u[1]}${/^(분|g)$/.test(U.u[1])?'이':'가'} 넘으면 ${U.u[0]}${/^(시|시간|분|kg)$/.test(U.u[0])?'으로':'로'} 바꿔 써요.`:`아깝다! 다시 생각해 봐요.<div class="hint1">💡 ${hintFor(q)}</div>`}</div></div>`; vals=['','']; sel=0; paint(); return; }
    S.results[S.i]=false; logAct(false,'q'); done(); fb.innerHTML=`<div class="fb no">${chip('rami','base')}<div class="msg">괜찮아요, 같이 풀어 봐요!${solveHTML(q)}</div></div>`; vals=[String(A[0]),String(A[1])]; paint(); boxes.forEach(b=>b.classList.add('show')); addNext(fb); }
  paint(); }
function mountFree(q,host,ans,F){ const truth=F.p>=ans.length?ans:ans.slice(0,F.p)+'.'+ans.slice(F.p), dec=ans.length-F.p, tv=parseFloat(truth); let txt='', lock=false;
  const paint=()=>{ F.box.textContent=txt; F.box.classList.toggle('empty',!txt); };
  const key=k=>{ if(lock) return; if(k==='⌫') txt=txt.slice(0,-1); else if(k==='.'){ if(txt&&!txt.includes('.')) txt+='.'; } else if(txt.replace('.','').length<9) txt+=k; paint(); };
  host.innerHTML=`<div class="numpad">${['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k=>`<button class="nk${/\\d/.test(k)?'':' fn'}" data-k="${k}">${k}</button>`).join('')}</div><div class="wtools"><button class="next wok">다 썼어!</button>${F.int?'<button class="wmode">✍️ 손글씨</button>':''}</div>`;
  host.querySelectorAll('.nk').forEach(b=>b.onclick=()=>key(b.dataset.k)); host.querySelector('.wok').onclick=()=>submit();
  if(F.int) host.querySelector('.wmode').onclick=()=>{ try{ localStorage.setItem('dotori-input','hand'); }catch(e){} document.removeEventListener('keydown',onKey); document.getElementById('visual').innerHTML=q.visual; mountWriteQ36(q); };
  const onKey=e=>{ if(!document.body.contains(F.box)||lock){ document.removeEventListener('keydown',onKey); return; } if(/^[0-9]$/.test(e.key)) key(e.key); else if(e.key==='.'||e.key===',') key('.'); else if(e.key==='Backspace') key('⌫'); else if(e.key==='Enter') submit(); else return; e.preventDefault(); }; document.addEventListener('keydown',onKey);
  const done=()=>{ lock=true; host.querySelector('.wtools')?.remove(); host.querySelector('.numpad')?.remove(); document.removeEventListener('keydown',onKey); };
  const addNext=fb=>{ if(document.getElementById('next')) return; fb.insertAdjacentHTML('beforeend',`<button class="next" id="next">${S.i>=S.acts.length-1?'결과 보기 ★':'다음 →'}</button>`); const nb=document.getElementById('next'); nb.onclick=()=>{ S.i++; S.i<S.acts.length?runAct():result(); }; nb.scrollIntoView({block:'nearest',behavior:'smooth'}); };
  function submit(){ if(lock) return; const fb=document.getElementById('fb');
    if(!txt||txt.endsWith('.')){ sfx('bad'); host.classList.add('shakey'); setTimeout(()=>host.classList.remove('shakey'),450); fb.innerHTML=`<div class="fb no"><div class="msg">답을 써 주세요</div></div>`; return; }
    const v=parseFloat(txt); if(Math.abs(v-tv)<1e-9){ done(); F.box.classList.add('show'); answer({dataset:{v:ans},classList:{add(){}}},q); return; }
    const strip=s=>s.replace('.','').replace(/^0+/,'').replace(/0+$/,''); let guess; delete q._mcode;
    if(strip(txt)&&strip(txt)===strip(truth)){ guess=txt; const t=String(q.q||'')+String(q.visual||'').replace(/<[^>]+>/g,' ')+String(q.ansText||''); q._mcode=/×|넓이|원주/.test(t)?'N5-07':/÷/.test(t)?'N6-07':'N4-23'; }   /* 숫자는 맞고 소수점 자리만 틀림 */
    else { const sc=v*Math.pow(10,dec), r=Math.round(sc), k1=Math.abs(sc-r)<1e-6?String(r).padStart(ans.length,'0'):null, k2=txt.replace('.',''), M=q.mis||{}; guess=k1&&M[k1]?k1:M[k2]?k2:(k1||txt); }   /* 예상 오답 열쇠(소수점을 뺀 숫자열)로 맞춘다 */
    if(S.tries===0&&window.KT) KT.rec(q,guess,false); S.tries++; sfx('bad');
    if(S.tries<2){ fb.innerHTML=`<div class="fb no">${chip('doto','oops')}<div class="msg">아깝다! 다시 생각해 봐요.<div class="hint1">💡 ${hintFor(q)}</div></div></div>`; txt=''; paint(); return; }
    S.results[S.i]=false; logAct(false,'q'); done(); fb.innerHTML=`<div class="fb no">${chip('rami','base')}<div class="msg">괜찮아요, 같이 풀어 봐요!${solveHTML(q)}</div></div>`; txt=String(tv); paint(); F.box.classList.add('show'); addNext(fb); }
  paint(); }
function mountWriteQ36(q){""")

# ---- 분수 답: 분자·분모(·자연수 부분)마다 답 상자 하나 (교수님 11/22: 분모가 두 자리라고 칸 수로 알려 주는 것은 과한 힌트) ----
_a = "  if(q.ub&&_m0!=='hand'){ const gs=[...document.querySelectorAll('#visual .vgrp')];"
assert h.count(_a) == 1
h = h.replace(_a, """  /* 숫자판 모드의 분수 답: 칸을 자릿수만큼 나누지 않고 분자·분모·자연수 부분마다 상자 하나. 여러 자리 수를 그대로 쓴다. 손글씨 모드는 칸 그대로. */
  if(_m0!=='hand'&&!q.ub&&!q._step&&slots.length&&slots.some(x=>x.closest('.frac'))){ const cs=[]; slots.forEach(x=>{ const c=x.parentElement; if(!cs.includes(c)) cs.push(c); });
    if(cs.every(c=>c.matches('.frac b.fs, .vgrp'))&&/^\\d+$/.test(ans)){ const lens=cs.map(c=>c.querySelectorAll('.vslot').length); slots.forEach(x=>x.remove()); const boxes=cs.map((c,i)=>{ const d=document.createElement('div'); d.className='ubox pbox empty'; d.dataset.i=i; c.appendChild(d); c.classList.add('hasfree'); return d; }); return mountParts(q,host,ans,boxes,lens); } }
""" + _a)
_a = "function mountUnit(q,host,ans,boxes){"
assert h.count(_a) == 1
h = h.replace(_a, """function mountParts(q,host,ans,boxes,lens){ const n=boxes.length; let vals=boxes.map(()=>''), lock=false; const want=[];
  /* 칸을 옮기는 순서: 분수는 읽는 순서(○분의 △)·쓰는 순서(가로선 → 분모 → 분자)대로 분모 먼저. 대분수는 자연수 → 분모 → 분자 */
  const ord=[]; { const seen=new Set(); boxes.forEach((b,i)=>{ if(seen.has(i)) return; const fr=b.closest&&b.closest('.frac'); const grp=fr?boxes.map((x,j)=>j).filter(j=>!seen.has(j)&&boxes[j].closest('.frac')===fr):[i]; grp.forEach(j=>seen.add(j)); ord.push(...(fr?grp.slice().reverse():grp)); }); }
  const nxt=i=>ord[(ord.indexOf(i)+1)%n], prv=i=>ord[Math.max(0,ord.indexOf(i)-1)], firstEmpty=()=>{ const k=ord.find(j=>!vals[j]); return k==null?-1:k; }; let sel=ord[0]; { let p=0; lens.forEach(L=>{ want.push(ans.slice(p,p+L)); p+=L; }); }
  const paint=()=>boxes.forEach((b,i)=>{ b.textContent=vals[i]; b.classList.toggle('empty',!vals[i]); b.classList.toggle('sel',!lock&&i===sel); });
  const key=k=>{ if(lock) return; if(k==='⌫'){ if(!vals[sel]&&ord.indexOf(sel)>0) sel=prv(sel); else vals[sel]=vals[sel].slice(0,-1); } else if(k==='→') sel=nxt(sel); else if(vals[sel].length<4) vals[sel]+=k; paint(); };
  boxes.forEach((b,i)=>b.onclick=()=>{ if(lock) return; sel=i; paint(); });
  host.innerHTML=`<div class="numpad">${['1','2','3','4','5','6','7','8','9',n>1?'→':'','0','⌫'].map(k=>k===''?'<span></span>':`<button class="nk${/\\\\d/.test(k)?'':' fn'}" data-k="${k}"${k==='→'?' aria-label="다음 칸"':''}>${k==='→'?'다음 칸':k}</button>`).join('')}</div><div class="wtools"><button class="next wok">다 썼어!</button><button class="wmode">✍️ 손글씨</button></div>`;
  host.querySelectorAll('.nk').forEach(b=>b.onclick=()=>key(b.dataset.k)); host.querySelector('.wok').onclick=()=>submit();
  host.querySelector('.wmode').onclick=()=>{ try{ localStorage.setItem('dotori-input','hand'); }catch(e){} document.removeEventListener('keydown',onKey); document.getElementById('visual').innerHTML=q.visual; mountWriteQ36(q); };
  const onKey=e=>{ if(!document.body.contains(boxes[0])||lock){ document.removeEventListener('keydown',onKey); return; } if(/^[0-9]$/.test(e.key)) key(e.key); else if(e.key==='Backspace') key('⌫'); else if(e.key==='Tab'||e.key===' '||e.key==='/'||e.key==='ArrowRight'||e.key==='ArrowDown') key('→'); else if(e.key==='Enter'){ const em=firstEmpty(); if(em>=0&&vals.some(v=>v)){ sel=em; paint(); } else submit(); } else return; e.preventDefault(); }; document.addEventListener('keydown',onKey);
  const done=()=>{ lock=true; host.querySelector('.wtools')?.remove(); host.querySelector('.numpad')?.remove(); document.removeEventListener('keydown',onKey); paint(); };
  const addNext=fb=>{ if(document.getElementById('next')) return; fb.insertAdjacentHTML('beforeend',`<button class="next" id="next">${S.i>=S.acts.length-1?'결과 보기 ★':'다음 →'}</button>`); const nb=document.getElementById('next'); nb.onclick=()=>{ S.i++; S.i<S.acts.length?runAct():result(); }; nb.scrollIntoView({block:'nearest',behavior:'smooth'}); };
  function submit(){ if(lock) return; const fb=document.getElementById('fb'); const e=firstEmpty();
    if(e>=0){ sfx('bad'); host.classList.add('shakey'); setTimeout(()=>host.classList.remove('shakey'),450); sel=e; paint(); fb.innerHTML=`<div class="fb no"><div class="msg">빈 칸이 있어요. 칸을 누르고 수를 써요.</div></div>`; return; }
    const norm=vals.map(v=>String(parseInt(v,10))); if(norm.every((v,i)=>v===String(parseInt(want[i],10)))){ done(); boxes.forEach((b,i)=>{ b.textContent=want[i]; b.classList.add('show'); }); answer({dataset:{v:ans},classList:{add(){}}},q); return; }
    /* 예상 오답 열쇠는 자리마다 이어 붙인 글자(기존 칸 입력과 같은 꼴). 칸 수가 정답과 다르면 쉼표로 이어 코드 없이 기록 */
    const given=vals.every((v,i)=>v.length===lens[i])?vals.join(''):vals.join(','); delete q._mcode;
    if(S.tries===0&&window.KT) KT.rec(q,given,false); S.tries++; sfx('bad');
    if(S.tries<2){ fb.innerHTML=`<div class="fb no">${chip('doto','oops')}<div class="msg">아깝다! 다시 생각해 봐요.<div class="hint1">💡 ${hintFor(q)}</div></div></div>`; vals=boxes.map(()=>''); sel=ord[0]; paint(); return; }
    S.results[S.i]=false; logAct(false,'q'); done(); fb.innerHTML=`<div class="fb no">${chip('rami','base')}<div class="msg">괜찮아요, 같이 풀어 봐요!${solveHTML(q)}</div></div>`; vals=want.slice(); paint(); boxes.forEach(b=>b.classList.add('show')); addNext(fb); }
  paint(); }
""" + _a)

_a = ".vgrp{display:inline-flex;gap:4px}"
assert h.count(_a) == 1
h = h.replace(_a, _a + ".vgrp.hasfree{display:inline-flex}.uchunk{display:inline-flex;align-items:center;gap:4px;flex-wrap:nowrap;white-space:nowrap}.uchunk .vgrp{gap:2px}.eqrow:has(.uchunk + .uchunk){gap:6px 6px;font-size:1.8rem}.eqrow:has(.uchunk + .uchunk) .uchunk{gap:2px}.eqrow:has(.uchunk + .uchunk) .wbox.sm{width:46px;height:64px}.eqrow:has(.uchunk + .uchunk) .vslot{min-width:46px;min-height:64px}.eqrow:has(.uchunk + .uchunk) b{min-width:0}.ubox{min-width:76px;height:58px;padding:0 10px;border:3px solid #E3C9A0;border-radius:14px;background:#fff;color:#2E2620;font-size:32px;font-weight:700;display:flex;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer}.ubox.sel{border-color:#E8963C;box-shadow:0 0 0 3px #FBE3C6}.ubox.show{border-color:#6BBF7A;background:#F2FBF3}.numpad .nk[data-k='→']{font-size:15px}.eqrow.stepq{font-size:1.5rem;gap:3px}.eqrow.stepq .vslot.mini{min-width:40px;min-height:48px}.eqrow.stepq .frac{margin:0 1px}.freeans{min-width:150px;height:60px;padding:0 16px;border:3px solid #E8963C;border-radius:16px;background:#fff;color:#2E2620;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center;letter-spacing:1px;box-sizing:border-box}.freeans.empty::after{content:'답';color:#C9B79E;font-weight:400;font-size:22px}.freeans.show{border-color:#6BBF7A;background:#F2FBF3}")
_a = "    if(r.ok){ dropTools(); if(pad) pad.lock(); answer({dataset:{v:ans},classList:{add(){}}},q); return; }\n    const em=equivMsg(q,r.guess);"
assert h.count(_a) == 1
h = h.replace(_a, """    if(DP&&DP.cur==null){ sfx('bad'); fb.innerHTML=`<div class="fb no"><div class="msg">소수점을 찍어 주세요. 칸 사이의 동그라미를 눌러요.</div></div>`; return; }
    if(DP&&r.ok&&DP.cur!==DP.p){ r.ok=false; r.guess=ans.slice(0,DP.cur)+'.'+ans.slice(DP.cur); const t=String(q.q||'')+String(q.visual||'').replace(/<[^>]+>/g,' '); q._mcode=/×/.test(t)?'N5-07':/÷/.test(t)?'N6-07':'N4-23'; }
    if(r.ok){ dropTools(); if(pad) pad.lock(); if(DP) DP.lock=true; answer({dataset:{v:ans},classList:{add(){}}},q); return; }
    const em=DP&&q._mcode&&/\\./.test(r.guess)?null:equivMsg(q,r.guess);""")
_a = "    S.results[S.i]=false; logAct(false,'q'); dropTools();\n    fb.innerHTML=`<div class=\"fb no\">${chip('rami','base')}<div class=\"msg\">괜찮아요, 같이 풀어 봐요!${solveHTML(q)}</div></div>`;"
assert h.count(_a) == 1
h = h.replace(_a, _a.replace("dropTools();\n", "dropTools(); if(DP){ DP.cur=DP.p; DP.lock=true; DP.paint(); }\n"))
_a = ".vgrp{display:inline-flex;gap:4px}"
assert h.count(_a) == 1
h = h.replace(_a, _a + ".vgrp.hasdp{gap:0;align-items:flex-end}.dotpick{width:26px;height:54px;padding:0;border:0;background:none;position:relative;cursor:pointer;flex:none}.dotpick::after{content:'';position:absolute;left:50%;bottom:13px;width:14px;height:14px;margin-left:-7px;border-radius:50%;border:2px dashed #B98A55;box-sizing:border-box;background:#fff}.dotpick.on::after{background:#2E2620;border:2px solid #2E2620}")

# ---- 1~2학년 가르기 식 정답 오류: 'N = a + □'의 정답이 a로 되어 있었음(바른 답은 N-a). 'N = □ + b' 꼴은 맞았음 ----
_a = "eq(left?`${N} = □ + ${N-a}`:`${N} = ${a} + □`),a,numOpts(a,1,N),{hint:'가르기 식'}"
assert h.count(_a) == 1
h = h.replace(_a, "eq(left?`${N} = □ + ${N-a}`:`${N} = ${a} + □`),left?a:N-a,numOpts(left?a:N-a,1,N),{hint:'가르기 식'}")
for a, mc in MC:
    assert h.count(a) == 1, a
    h = h.replace(a, a + " mcode:()=>" + mc + ",")
a = "const ok=q.manip.check(); answer("; assert h.count(a) == 1
_a = "g.reveal=()=>g.set(half.map(([x,y])=>[5-x,y])); return MQ('대칭축(점선)을 기준으로 선대칭도형을 완성해 보세요.'"
assert h.count(_a) == 1
h = h.replace(_a, "g.reveal=()=>g.set(half.map(([x,y])=>[5-x,y])); g.state=()=>g.cells().map(v=>v.join('')).sort().join('.'); g.mcode=()=>{ const c=g.cells().map(v=>v.join(',')).sort().join('|'), K=f=>half.map(f).map(v=>v.join(',')).sort().join('|'); return c===K(([x,y])=>[x+3,y])?'G5-15':c===K(([x,y])=>[5-x,4-y])?'G5-05':null; }; return MQ('대칭축(점선)을 기준으로 선대칭도형을 완성해 보세요.'")
h = h.replace(a, "const ok=q.manip.check(); try{ if(S.tries===0&&q.manip.state){ q._mstate=String(q.manip.state()).slice(0,24); if(!ok&&q.manip.mcode) q._mcode=q.manip.mcode(); } }catch(e){} answer(")
k = h.rindex('</body>'); h = h[:k] + '<script>\n' + out + '\n</script>\n' + h[k:]
# --- 음성 글: 수 뒤 조사·읽기 고침 (2026-11-21) ---
import re as _re
_n=len(_re.findall(r"\$\{sn\(([^}]*)\)\} (될까|된단다)", h)); assert _n==7, _n
h = _re.sub(r"\$\{sn\(([^}]*)\)\} (될까|된단다)", lambda m: "${sp(%s,'이','가')} %s"%(m.group(1),m.group(2)), h)
_b="${sino(b)}의 ${sino(t)}배"; assert h.count(_b)==3
h = h.replace(_b, "${sino(b)}의 ${nativeCount(t)} 배")
_c="${frSp(n,d)}의 ${sino(k)}배."; assert h.count(_c)==1
h = h.replace(_c, "${frSp(n,d)}의 ${nativeCount(k)} 배.")
_d="const bubbleSay=(root,who,text)=>{"; assert h.count(_d)==1
h = h.replace(_d, _d+" text=fixJosa(text);")
_e="const mixTxt=(w,n,d)=>n?`${w}와 ${d}분의 ${n}`:`${w}`;"; assert h.count(_e)==1
h = h.replace(_e, "const mixTxt=(w,n,d)=>n?`${w}${/[013678]$/.test(String(w))?'과':'와'} ${d}분의 ${n}`:`${w}`;")
# --- 100의 단위 이름: '창고 한 칸' → '상자'(2026.9.27. 교수님 결정, 시리즈 기획서) ---
for _o,_n,_c in [("100은 창고 한 칸","100은 상자 하나",1),("${crateSVG()}창고</div>","${crateSVG()}상자</div>",1),
  ("개는 창고 몇 칸?","개는 상자 몇 개?",1),("} 개는 창고 몇 칸일까요? 창고 한 칸은 백 개예요.","} 개는 상자 몇 개일까요? 상자 하나는 백 개예요.",1),
  ("`창고 ${c}칸은 도토리 몇 개?`","`상자 ${c}개는 도토리 몇 개?`",1),("창고 한 칸에는 도토리가 백 개 들어간단다. 창고 ${nativeCount(c)} 칸이면 몇 개일까?","상자 하나에는 도토리가 백 개 들어간단다. 상자 ${GAE(c)}면 몇 개일까?",1),
  ("창고 ${nativeCount(c)} 칸, 바구니","상자 ${GAE(c)}, 바구니",3),("창고 100, 바구니 10","상자 100, 바구니 10",1),
  ("창고 ${nativeCount(k)} 칸이면 모두 몇 개일까?","상자 ${GAE(k)}면 모두 몇 개일까?",1),("수레 1000, 창고 100","수레 1000, 상자 100",1),
  ("'창고 상자'","'상자'",None),("창고 상자는 백 개","상자는 백 개",None)]:
    assert (h.count(_o)==_c) if _c else h.count(_o)>=1, (_o,h.count(_o))
    h = h.replace(_o,_n)
# --- 꺾은선그래프 세로 눈금 숫자가 12개를 넘으면 한 칸 건너 적는다(겹침 방지) ---
_f='for(let v=base;v<=top;v+=step){ const y=H-B-(v-base)*sc; g+=`<line x1="${L}" y1="${y}" x2="${W-4}" y2="${y}" stroke="#E5D3B5"/><text x="${L-4}" y="${y+4}" text-anchor="end" font-size="11">${v}</text>`; }'
assert h.count(_f)==1
h = h.replace(_f, 'const _nt=Math.round((top-base)/step); '+_f.replace('g+=`<line','const _lb=(_nt<=12||Math.round((v-base)/step)%2===0)?v:\'\'; g+=`<line').replace('${v}</text>','${_lb}</text>'))
# --- 그림 점검 1회차: 직사각형·마름모를 치수 비율대로, 직육면체 높이 글자 잘림 ---
_g="if(kind==='rect') s=`<rect x=\"40\" y=\"20\" width=\"160\" height=\"90\" ${F}/>`+lab(120,130,a+' cm')+lab(20,70,b+' cm');"; assert h.count(_g)==1
h = h.replace(_g, "if(kind==='rect'){ const k=Math.min(160/a,90/b), w=Math.max(34,a*k), hh=Math.max(26,b*k), x=120-w/2, y=62-hh/2; s=`<rect x=\"${x}\" y=\"${y}\" width=\"${w}\" height=\"${hh}\" ${F}/>`+lab(120,y+hh+20,a+' cm')+lab(Math.max(22,x-22),67,b+' cm'); }")
_g="else if(kind==='rhom') s=`<polygon points=\"120,10 200,65 120,120 40,65\" ${F}/><line x1=\"40\" y1=\"65\" x2=\"200\" y2=\"65\" ${D}/><line x1=\"120\" y1=\"10\" x2=\"120\" y2=\"120\" ${D}/>`+lab(165,58,a+' cm')+lab(140,100,b);"; assert h.count(_g)==1
h = h.replace(_g, "else if(kind==='rhom'){ const bv=parseFloat(b)||a, k=Math.min(160/a,110/bv), hx=Math.max(24,a*k/2), hy=Math.max(20,bv*k/2); s=`<polygon points=\"120,${65-hy} ${120+hx},65 120,${65+hy} ${120-hx},65\" ${F}/><line x1=\"${120-hx}\" y1=\"65\" x2=\"${120+hx}\" y2=\"65\" ${D}/><line x1=\"120\" y1=\"${65-hy}\" x2=\"120\" y2=\"${65+hy}\" ${D}/>`+lab(120+hx*0.55,58,a+' cm')+lab(142,65+Math.max(18,hy*0.6),b); }")
_g="+(a?lab(85,148,a+' cm')+lab(190,140,b+' cm')+lab(8,98,c+' cm'):''),260);"; assert h.count(_g)==1
h = h.replace(_g, "+(a?lab(85,148,a+' cm')+lab(190,140,b+' cm')+lab(44,98,c+' cm'):''),260);")
# --- 그림 점검 2회차: 수 없는 치수 글자(' cm')는 그리지 않음, 직육면체 가로 글자가 모서리 선에 겹침 ---
_g="const lab=(x,y,t)=>`<text x="; assert h.count(_g)==1
h = h.replace(_g, "const lab=(x,y,t)=>/^\\s*(cm)?\\s*$/.test(String(t))?'':`<text x=")
_g="const boxSvg=(a,b,c)=>SV(220,150,"; assert h.count(_g)==1
h = h.replace(_g, "const boxSvg=(a,b,c)=>SV(220,162,")
_g="(a?lab(85,148,a+' cm')"; assert h.count(_g)==1
h = h.replace(_g, "(a?lab(85,158,a+' cm')")
# --- 조사: "조이 7개" → "조가", "풀통는" → "풀통은" ---
_g="C36('halmi',`${nm}이 ${k}개인 수는?`,`${nm}이 ${sino(k)} 개이면 얼마일까?"; assert h.count(_g)==1
h = h.replace(_g, "C36('halmi',`${nm}${nm==='조'?'가':'이'} ${k}개인 수는?`,`${nm}${nm==='조'?'가':'이'} ${sino(k)} 개이면 얼마일까?")
_g="CF(`${o}는 어떤 모양일까요?`"; assert h.count(_g)==1
h = h.replace(_g, "CF(`${o}${((o.charCodeAt(o.length-1)-0xAC00)%28)?'은':'는'} 어떤 모양일까요?`")
# --- 정답 오류: a + bq ÷ b × c − bq 틀(S3-67#0, S3-113#0)의 정답이 ÷b를 빼먹고 계산돼 있었음 ---
_g="c=rnd(2,9), a=rnd(5,30); const r=a+b*q*c- (b*q);"; assert h.count(_g)==1
h = h.replace(_g, "c=rnd(2,9), a=b*q+rnd(1,20); const r=a+q*c-(b*q);")
# --- 분모가 같은 분수 비교(S3-19#1): 늘 작은 분수가 앞이라 정답이 언제나 '<'였음 → 앞뒤를 무작위로 ---
_g="()=>{ const d=rnd(4,9), a=rnd(1,d-2), b=rnd(a+1,d-1); return C36('rami',`□ 안에 알맞은 것은?`,`${sino(d)}분의 ${sino(a)}와 ${sino(d)}분의 ${sino(b)}. 부등호를 넣어 보세요.`,row(fr(a,d),'□',fr(b,d)),'<',['<','>','=']); },"; assert h.count(_g)==1
h = h.replace(_g, "()=>{ const d=rnd(4,9); let a=rnd(1,d-2), b=rnd(a+1,d-1); if(Math.random()<0.5) [a,b]=[b,a]; return C36('rami',`□ 안에 알맞은 것은?`,`${sino(d)}분의 ${sino(a)}와 ${sino(d)}분의 ${sino(b)}. 부등호를 넣어 보세요.`,row(fr(a,d),'□',fr(b,d)),a<b?'<':'>',['>','=','<']); },")
# --- 음수 답: (a + b) × c − d 틀(S3-67#1)에서 (2 + 2) × 2 − 9 = −1이 나올 수 있었음. 초등은 음수를 다루지 않는다 ---
_g="()=>{ const a=rnd(2,6), b=rnd(2,6), c=rnd(2,5), d=rnd(1,9); const r=(a+b)*c-d;"; assert h.count(_g)==1
h = h.replace(_g, "()=>{ const a=rnd(2,6), b=rnd(2,6), c=rnd(2,5), d=rnd(1,7); const r=(a+b)*c-d;")
# --- 음수 자료: 평균 틀에서 마지막 값이 avg − (차의 합)이라 음수가 될 수 있었음(예: 15, 14, 12, 11, -2) ---
_g="()=>{ const n=rnd(3,5), avg=rnd(10,40); let v=Array(n).fill(avg); for(let i=0;i<n-1;i++){ const d=rnd(-5,5); v[i]+=d; v[n-1]-=d; }"; assert h.count(_g)>=1
h = h.replace(_g, "()=>{ const n=rnd(3,5), avg=rnd(25,45); let v=Array(n).fill(avg); for(let i=0;i<n-1;i++){ const d=rnd(-5,5); v[i]+=d; v[n-1]-=d; }")
_g="'S4-15':()=>{ const n=rnd(3,5), avg=rnd(20,40); let v=Array(n).fill(avg); for(let i=0;i<n-1;i++){ const d=rnd(-6,6);"; assert h.count(_g)==1
h = h.replace(_g, "'S4-15':()=>{ const n=rnd(3,5), avg=rnd(26,45); let v=Array(n).fill(avg); for(let i=0;i<n-1;i++){ const d=rnd(-6,6);")
# --- 식을 미리 주면 단순 계산 문제가 됨(교수님 11/21): 원주·원의 넓이 쓰기 틀에서 '16 × 3.14 =' 식을 뺌 ---
_g="figSvg('circ',`${d/2} cm`)+row(d,'×',3.14,'=',decS(s),'cm'),s,{ansText:`${s} cm`}"; assert h.count(_g)==1
h = h.replace(_g, "figSvg('circ',`${d/2} cm`)+row(decS(s),'cm'),s,{ansText:`${d} × 3.14 = ${s} cm`}")
_g="figSvg('circ',`${r} cm`)+row(r,'×',r,'×',3.14,'=',decS(s)),s,{ansText:`${s} cm²`}"; assert h.count(_g)==1
h = h.replace(_g, "figSvg('circ',`${r} cm`)+row(decS(s),'cm²'),s,{ansText:`${r} × ${r} × 3.14 = ${s} cm²`}")
# --- 비율을 소수로(S5-14#0): '3 ÷ 5 =' 식을 주면 어느 수를 나누는지(비의 순서)를 알려 주게 됨 → 식을 뺌 ---
_g="`${a} : ${b}의 비율을 소수로?`,' ',row(a,'÷',b,'=',decS(s)),s,{ansText:s}"; assert h.count(_g)==1
h = h.replace(_g, "`${a} : ${b}의 비율을 소수로?`,' ',row(decS(s)),s,{ansText:`${a} ÷ ${b} = ${s}`}")
# --- 부동소수 찌꺼기: 소수 크기 비교(S3-22#1)에서 b=a+0.1이 1.7000000000000002로 문제 글에 그대로 나왔음 ---
_g="()=>{ const a=rnd(1,30)/10; let b=rnd(1,30)/10; if(b===a) b=a+0.1; return C36('doto',`${a}와 ${b}, 더 큰 수는?`"; assert h.count(_g)==1
h = h.replace(_g, "()=>{ const a=rnd(1,30)/10; let b=rnd(1,30)/10; if(b===a) b=+(a+0.1).toFixed(1); return C36('doto',`${a}와 ${b}, 더 큰 수는?`")
# --- 손글씨 → 숫자판으로 바꿀 때 단위 답 문제는 단위 상자로 다시 그린다 ---
_g="tools.querySelector('.wmode').onclick=()=>{ mode=mode==='hand'?'pad':'hand'; try{ localStorage.setItem('dotori-input',mode); }catch(e){} build(); };"; assert h.count(_g)==1
h = h.replace(_g, "tools.querySelector('.wmode').onclick=()=>{ mode=mode==='hand'?'pad':'hand'; try{ localStorage.setItem('dotori-input',mode); }catch(e){} if(mode==='pad'&&typeof q.visual==='string'&&!q.onMount){ document.getElementById('visual').innerHTML=q.visual; return mountWriteQ36(q); } build(); };")
# --- km·m 덧셈(S6-39): m가 늘 세 자리이고 받아올림이 없어 오개념이 안 드러났음 → 두 자리 m와 받아올림이 섞여 나오게 ---
_g="()=>{ const a=rnd(1,4), b=rnd(100,499), c=rnd(1,4), d=rnd(100,499); return WN2(`${a} km ${b} m + ${c} km ${d} m`,'',a+c,'km',b+d,'m'); }"; assert h.count(_g)==1
h = h.replace(_g, "()=>{ const a=rnd(1,4), b=rnd(0,1)?rnd(20,95):rnd(300,950), c=rnd(1,4), d=rnd(0,1)?rnd(20,95):rnd(300,950), t=b+d; return WN2(`${a} km ${b} m + ${c} km ${d} m`,'',a+c+(t>=1000?1:0),'km',t%1000,'m'); }")
# --- 교수님 11/22: '어른과 함께 읽어요' 표시는 빼고, '우리 강아지' 칭찬은 할머니가 한다 ---
for _g in ["if((UNITS36[S.ui]||{}).grade===2&&!S.retry) vz.insertAdjacentHTML('afterbegin','<div class=\"withadult sm\">", "${u&&u.grade===2?'<div class=\"withadult\">"]:
    assert h.count(_g)==1, _g
h = h.replace("if((UNITS36[S.ui]||{}).grade===2&&!S.retry) vz.insertAdjacentHTML('afterbegin','<div class=\"withadult sm\">", "if(false) vz.insertAdjacentHTML('afterbegin','<div class=\"withadult sm\">")
h = h.replace("${u&&u.grade===2?'<div class=\"withadult\">", "${false?'<div class=\"withadult\">")
_g="const chip=(who,mood)=>(typeof S!=='undefined'&&S&&S.mode==='ep36'&&S.chars&&!S.idle)?juImg(S.chars[WHO_IDX[who]??0],mood):chip0(who,mood);"; assert h.count(_g)==1
h = h.replace(_g, _g+"\nconst praiseChip=(who,mood)=>who==='halmi'?chip0('halmi',mood):chip(who,mood);   /* '우리 강아지' 같은 할머니 말은 어느 단원에서든 할머니가 */")
for _g in ["const [who,pr]=pick(PRAISE); document.getElementById('gdone').innerHTML=`<div class=\"gdone\">${chip(who,'happy')}", "const [who,msg]=pick(PRAISE);\n    fb.innerHTML=`<div class=\"fb ok\">${chip(who,'happy')}"]:
    assert h.count(_g)==1, _g
    h = h.replace(_g, _g.replace("${chip(who,'happy')}","${praiseChip(who,'happy')}"))
# --- 교수님 11/22: 규칙(반복 무늬)은 순서·위치가 중요 → 가운데 정렬로 두 줄이 되면 헷갈림. 한 줄로, 왼쪽에서 오른쪽으로, 끝에 ? 칸 ---
_g="const itemsVis=items=>`<div class=\"items\">${items.map(i=>shp(i.s,COLORS[i.c])).join('')}</div>`;"; assert h.count(_g)==1
h = h.replace(_g, _g+"\nconst seqVis=items=>`<div class=\"seqrow\" style=\"--n:${items.length+1}\">${items.map(i=>`<span class=\"seqit\">${shp(i.s,COLORS[i.c])}</span>`).join('')}<span class=\"seqit seqq\">?</span></div>`;")
for _k in ["return CF('모양의 규칙을 보고 다음", "return CF('색깔 규칙을 보고 다음 색은?',itemsVis(seq)", "return CF('다음에 올 것은?',itemsVis(seq)"]:
    assert h.count(_k)==1, _k
_i=h.index("const seq=Array.from({length:len},(_,i)=>({s:sh[i%p],c:cl[0]}));"); _j=h.index("\n",_i); h=h[:_i]+h[_i:_j].replace("itemsVis(seq)","seqVis(seq)")+h[_j:]
h = h.replace("return CF('색깔 규칙을 보고 다음 색은?',itemsVis(seq)","return CF('색깔 규칙을 보고 다음 색은?',seqVis(seq)").replace("return CF('다음에 올 것은?',itemsVis(seq)","return CF('다음에 올 것은?',seqVis(seq)")
_g=".withadult{"; assert h.count(_g)==1
h = h.replace(_g, ".nw{white-space:nowrap}.objrow{display:flex;justify-content:center;align-items:flex-end;gap:14px;flex-wrap:wrap;margin:8px auto}.objrow figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:4px}.objrow figcaption{font-family:Jua,sans-serif;font-size:.95rem;color:#4A2E14}.objimg{height:auto;display:block}.objtag{position:absolute;width:26px;height:26px;border-radius:50%;background:#FFF3C4;border:2px solid #B5701F;font-family:Jua,sans-serif;font-size:1rem;line-height:22px;text-align:center;color:#4A2E14}table.hund td{padding:4px 5px;font-size:.85rem;min-width:24px}.seqrow{display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;gap:3px;margin:10px auto;width:100%;max-width:100%}.seqrow .seqit{flex:0 1 calc((100% - 3px*(var(--n) - 1))/var(--n));max-width:40px;aspect-ratio:1;display:flex;align-items:center;justify-content:center}.seqrow .seqit svg{width:100%;height:100%}.seqrow .seqq{border:2.5px dashed #E8963C;border-radius:9px;font-family:Jua,sans-serif;font-size:1.3rem;color:#E8963C;box-sizing:border-box}\n"+_g)
# '어른과 함께 읽어요' 문구 자체를 없앤다(꺼 둔 코드도 남기지 않음)
h = h.replace("if(false) vz.insertAdjacentHTML('afterbegin','<div class=\"withadult sm\">👨‍👩‍👧 어른과 함께 읽어요</div>');","")
h = h.replace("${false?'<div class=\"withadult\">👨‍👩‍👧 글이 어려우면 어른과 함께 읽어요</div>':''}","")
# --- 교수님 11/22: 휴대폰 다크 모드에서 브라우저가 화면 색을 제멋대로 뒤집으면(강제 다크) 그림·표·색 규칙 문제의 색이 바뀌어 문제 자체가 달라진다.
#     '밝은 화면만'을 밝혀 강제 다크를 끄고, 어느 모드에서든 설계한 색 그대로 보이게 한다. ---
_g='<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'; assert h.count(_g)==1
h = h.replace(_g, _g+'<meta name="color-scheme" content="only light"><meta name="darkreader-lock">')
h = h.replace('</head>', '<style id="kt-light">:root{color-scheme:only light}html,body{background-color:#FFF7EC}</style></head>',1)
# --- 교수님 11/22: 1~2학년 화면의 도토·람이·할머니(·청이)도 시즌1 그림 대신 시즌3 그림(JU)으로 ---
import json as _json
_i=h.index('const JU={'); _d=0
for _k in range(_i+9,len(h)):
    if h[_k]=='{': _d+=1
    elif h[_k]=='}':
        _d-=1
        if _d==0: _j=_k; break
_JU=_json.loads(h[_i+9:_j+1])
_ai=h.index('const A={'); _aj=h.index('};',_ai); _A=_json.loads(h[_ai+8:_aj+1])
for _n in ['도토','람이','할머니','청이']:
    for _m,_p in [('기본','기본'),('기쁨','자세_박수'),('놀람','자세_시무룩'),('가리키기','자세_가리키기_오른쪽')]:
        _k=_n+'_'+_m
        if _k in _A and _p in _JU.get(_n,{}): _A[_k]=_JU[_n][_p]
h=h[:_ai+8]+_json.dumps(_A,ensure_ascii=False)[:-1]+'}'+h[_aj+1:]
# 말하는 입 모양 그림(POSE, 놀이·말풍선의 캐릭터)도 시즌3 그림으로. 시즌3판에는 입 모양 그림이 없어 열린 입·닫힌 입을 같은 그림으로 둔다.
_pi=h.index('const POSE={')+len('const POSE='); _d=0
for _k in range(_pi,len(h)):
    if h[_k]=='{': _d+=1
    elif h[_k]=='}':
        _d-=1
        if _d==0: _pj=_k; break
_P=_json.loads(h[_pi:_pj+1]); _PM={'cheer':'자세_만세','clap':'자세_박수','point':'자세_가리키기_오른쪽','wave':'자세_손흔들기'}
for _k in list(_P):
    _n,_pose,_mo=_k.split('_')
    if _n in _JU and _PM.get(_pose) in _JU[_n]: _P[_k]=_JU[_n][_PM[_pose]]
h=h[:_pi]+_json.dumps(_P,ensure_ascii=False)+h[_pj+1:]

# 단계 4개(조작 → 기본 → 문장제 → 여러 개념): 편 연습의 순서에 '여러 개념'을 맨 뒤 단계로 더함
_a="const STAGE=q=>(q.manip||q.onMount)?0:q.word?2:1;"
assert h.count(_a)==1; h=h.replace(_a,"const STAGE=q=>window.ktStage?window.ktStage(q):((q.manip||q.onMount)?0:q.word?2:1);")
_i=h.index("const STAGE=q=>window.ktStage"); _j=h.index("return res.map(x=>x.q); }",_i); _seg=h[_i:_j]
for _x,_y in [("const want={0:1,2:2};","const want={0:1,2:2,3:1};"),("[0,2].forEach(","[0,2,3].forEach("),("const cap={0:2,2:2}, cnt={0:0,1:0,2:0};","const cap={0:2,2:2,3:2}, cnt={0:0,1:0,2:0,3:0};"),("for(const s of [0,1,2]){","for(const s of [0,1,2,3]){")]:
    assert _seg.count(_x)==1,_x; _seg=_seg.replace(_x,_y)
h=h[:_i]+_seg+h[_j:]
# 조작 문제: [다 했어요]를 누른 때의 상태로 오개념을 판정(q.manip.wrong()이 보기 이름을 돌려주면 그 이름으로 기록)
_a="answer({dataset:{v:ok?q.ans:'__no'},classList:{add(){}},disabled:false},q);"
assert h.count(_a)==1; h=h.replace(_a,"let _wv='__no'; try{ if(!ok&&q.manip.wrong){ const w=q.manip.wrong(); if(w) _wv=w; } }catch(e){} if(!ok) (q._mw=q._mw||[]).push(_wv); answer({dataset:{v:ok?q.ans:_wv},classList:{add(){}},disabled:false},q); try{ if(!ok&&S.tries>=2&&window.__manipFail) window.__manipFail(q); }catch(e){}")

# 11/23 교수님: ① '색깔별로 세고 더해 보세요'는 색깔별 수와 모두를 차례로 쓰게 ② 연필 길이 비교 그림에서 이름표가 화면 밖으로 잘림 → 이름표를 막대 앞으로
_a="()=>{ const it=mkItems(rnd(9,12)); return WN('모두 몇 개일까요? 색깔별로 세고 더해 보세요.',itemsVis(it),it.length,'','개'); },"
assert h.count(_a)==1
h=h.replace(_a,"()=>{ const it=mkItems(rnd(9,12)); const C=['빨간','파란','노란'], n=C.map(c=>cntBy(it,'c',c)); if(n.some(x=>x===0)) return G36['S4-02'][1](); return W36(WHO(),'색깔별로 세어 쓰고, 모두 몇 개인지도 써 보세요.',' ',itemsVis(it)+C.map((c,i)=>row(c+'색',slotsN(n[i]),'개')).join('')+row('모두',slotsN(it.length),'개'),n.join('')+String(it.length),{ansText:`${C.map((c,i)=>c+'색 '+n[i]+'개').join(', ')} → 모두 ${it.length}개`,hint:'색깔마다 하나씩 짚어 가며 세고, 세 수를 더해요.'}); },")
_a="""<rect x="10" y="15" width="${a*26}" height="18" rx="6" fill="#F2A65A" stroke="#7A4A1E" stroke-width="2"/><text x="${a*26+18}" y="29" font-size="13">도토</text><rect x="10" y="55" width="${b*26}" height="18" rx="6" fill="#8CC7E8" stroke="#3A6E8F" stroke-width="2"/><text x="${b*26+18}" y="69" font-size="13">람이</text>`)"""
assert h.count(_a)==1
h=h.replace(_a,"""<text x="4" y="29" font-size="13" font-weight="700">도토</text><rect x="40" y="15" width="${a*23}" height="18" rx="6" fill="#F2A65A" stroke="#7A4A1E" stroke-width="2"/><text x="4" y="69" font-size="13" font-weight="700">람이</text><rect x="40" y="55" width="${b*23}" height="18" rx="6" fill="#8CC7E8" stroke="#3A6E8F" stroke-width="2"/>`)""")

# 11/23 교수님 화면(휴대폰 어두운 모드): 브라우저가 색을 멋대로 어둡게 바꿔 그림 속 글자가 안 보임 → 이 앱은 밝은 화면만 쓴다고 알림
_a='<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
assert h.count(_a)==1
h=h.replace(_a,_a+'\n<meta name="color-scheme" content="only light">\n<meta name="supported-color-schemes" content="light">\n<style>:root{color-scheme:only light}</style>')
# 다른 세션(Opus 5.5, 02458e7)이 index.html에 바로 고친 것을 원본에 옮김: 3학년 이상은 늘 숫자판, 자릿수 칸 없이 상자 하나(교수님 11/23)
for _a,_b in [
  ("<style>:root{color-scheme:only light}</style>", "<style>:root{color-scheme:only light}#wpad.g3 .wmode{display:none}</style>"),
  ("if(!_m0) _m0=g>=3?'pad':'hand';", "if(!_m0) _m0=g>=3?'pad':'hand'; if(g>=3) _m0='pad'; host.classList.toggle('g3',g>=3); /* 3학년 이상은 늘 숫자판, 자릿수 칸 없이 상자 하나(교수님 11/23) */"),
  ("||document.querySelectorAll('#visual .vgrp').length!==1)) return null", "||(g<3&&document.querySelectorAll('#visual .vgrp').length!==1))) return null"),
  ("if(!mode) mode=g>=3?'pad':'hand';", "if(!mode) mode=g>=3?'pad':'hand'; if(g>=3) mode='pad';"),
]:
    assert h.count(_a)==1, (_a, h.count(_a)); h = h.replace(_a,_b)
# 다른 세션(Opus 5.5, 302b600)이 index.html에 바로 고친 것을 원본에 옮김: 편마다 유튜브 쇼츠 연결(시즌3~6 208편), 옛 시즌1 영상은 비공개라 비움.
# 영상 주소를 바꿀 때는 src/videos_patch.json을 고친다(index.html을 바로 고치면 다음 빌드에서 사라짐).
import json as _json
_vp = _json.load(open('src/videos_patch.json', encoding='utf8'))
_i = h.index(_vp['videos_start']); _j = h.index('\n};', _i) + 3
h = h[:_i] + _vp['videos'] + h[_j:]
_l36 = [l for l in h.split('\n') if l.startswith('const VIDEOS36=')]; assert len(_l36) == 1
h = h.replace(_l36[0], _vp['videos36'])
_nl = [l for l in h.split('\n') if 'class="nolink"' in l and 'if(!id)' in l]; assert len(_nl) == 1
h = h.replace(_nl[0], _vp['nolink'])
# 묶음으로 분수 나타내기(교수님 11/23: 2분의 1이라고 썼는데 틀렸다고 나옴 — 4분의 2와 크기가 같으니 틀렸다고 하면 안 됨)
# ① 문장에 '묶음 수로 나타낸다'는 것을 밝힘 ② 약분하면 다른 분수가 되는 수(4분의 2 같은 것)는 내지 않음 → 맞는 답을 틀렸다고 하는 일이 없게.
_a = "()=>{ const g=rnd(3,6), k=rnd(2,4), part=rnd(1,g-1); return W36('rami',`${g*k}개를 ${k}개씩 묶으면 ${part*k}개는 전체의 얼마?`,"
assert h.count(_a) == 1
h = h.replace(_a, "()=>{ let g=rnd(3,6), k=rnd(2,4), part=rnd(1,g-1); const _gc=(x,y)=>y?_gc(y,x%y):x; for(let t=0;t<40&&_gc(part,g)!==1;t++){ g=rnd(3,6); part=rnd(1,g-1); } return W36('rami',`${g*k}개를 ${k}개씩 묶었어요. ${part*k}개는 전체 묶음의 몇 분의 몇일까요? (묶음 수로 나타내요)`,")


# 윤문(교수님 11/24): 문제를 올리기 직전에 조사 받침·띄어쓰기를 맞춘다(src/kfix.js)
_a = "function question(q){\n"
assert h.count(_a) == 1, h.count(_a)
h = h.replace(_a, "function question(q){ q=window.kfixQ?window.kfixQ(q):q;\n")

# 문제지형 화면(교수님 11/23: 문제 제시가 전문적이지 않고 UI가 깔끔하지 않다 → 늘품이·진단도구 학습지 짜임을 따름)
# 3~6학년(ep36): 말풍선 대신 '번호 + 발문', 그림은 테두리 상자, 보기는 ①②③④ 번호를 단 목록. 1~2학년은 캐릭터 말풍선 그대로.
_a = '<div class="talker">${talker(q.who)}<div class="bubble"><div class="who">${NAMES[q.who]}</div><div class="q">${q.q}</div><div class="hint">${q.hint}</div></div></div>\n      <div class="visual" id="visual">${q.visual}</div>'
assert h.count(_a) == 1, h.count(_a)
h = h.replace(_a, '${true?`<div class="qp${S.mode===\'ep36\'?\'\':\' qp-young\'}"><span class="qp-no">${S.i+1}</span><div class="qp-q">${window.qpNb(q.q)}</div><div class="qp-who">${talker(q.who)}</div></div>`:`' + _a.split('\n')[0].strip() + '`}\n      <div class="visual${(String(q.visual||\'\').trim()?\' qp-vis\':\' qp-novis\')}" id="visual">${q.visual}</div>')
_a = '`<div class="opts${q.opts.some(o=>String(o).length>9)?" wide":""}" id="opts">'
assert h.count(_a) == 1, h.count(_a)
h = h.replace(_a, '`<div class="opts${q.opts.some(o=>String(o).length>9)?" wide":""}${S.mode===\'ep36\'?(q.opts.every(o=>/^[①-⑳㉠-㉭]/.test(String(o)))?" qp-sym":q.opts.some(o=>String(o).length>14)?" qp-opts qp-list":" qp-opts"):""}" id="opts">')

_a = 'id="opts">${q.opts.map(o=>`<button class="opt${q.text?\' text\':\'\'}" data-v="${o}">${o}</button>`).join(\'\')}'
assert h.count(_a) == 1, h.count(_a)
h = h.replace(_a, _a.replace('${q.opts.map(', '${(q.opts.every(o=>/^[①-⑳㉠-㉭]/.test(String(o)))?q.opts.slice().sort():q.opts).map('))
_a = "const sel='.bubble .q, .opt,"
assert h.count(_a) == 1
h = h.replace(_a, "const sel='.bubble .q, .qp-q, .opt,")
_css = """
.qp{display:flex;align-items:flex-start;gap:10px;padding:4px 2px 10px;border-bottom:2px dashed var(--line)}
.qp-no{flex:none;min-width:30px;height:30px;border-radius:8px;background:#E8743B;color:#fff;font:700 1.05rem/30px "Jua",sans-serif;text-align:center;margin-top:2px}
.qp-q{flex:1;font-family:"Gowun Dodum","Jua",sans-serif;font-weight:700;font-size:1.28rem;line-height:1.55;color:var(--ink);word-break:keep-all;text-wrap:pretty}
.qp-who{flex:none;width:64px;height:64px;overflow:hidden}.qp-who img,.qp-who svg{width:64px!important;height:64px!important;object-fit:contain}
.qp-q,.qp-opts .opt,.qp-sym .opt{font-variant-numeric:tabular-nums}
/* 1~2학년도 같은 문제지 짜임(11/23 교수님: 다른 문제도 같은 글꼴·디자인으로). 어린 학년은 캐릭터를 크게, 보기 번호는 달지 않음(수와 헷갈림) */
.qp-young .qp-who{width:84px;height:84px}.qp-young .qp-who img,.qp-young .qp-who svg{width:84px!important;height:84px!important}.qp-young .qp-q{font-size:1.4rem}
/* 말풍선을 쓰는 다른 화면(놀이·목록·개념 카드)도 같은 글꼴로 */
.bubble .q{font-family:"Gowun Dodum","Jua",sans-serif;font-weight:700}
.bubble{background:#fff!important;border:2px solid var(--line)}.bubble:before{border-right-color:var(--line)!important}
.opt.kt-arm{border-color:#E8743B!important;box-shadow:0 0 0 3px #FFD9A0!important;background:#FFF6E8!important}
.qp-vis button svg,.qp-vis button img,.qp-vis [data-ma] svg{max-width:100%;height:auto}.qp-vis button{box-sizing:border-box;min-width:0;max-width:100%}
.qp-vis button svg,.qp-vis [data-ma] svg{background:transparent!important;box-shadow:none!important;border-radius:0!important}.qp-vis .manip{border:0!important;background:transparent!important;padding:4px 0 2px!important;box-shadow:none!important}
.qp-vis{min-width:0}.qp-vis>*,.qp-vis .manip,.qp-vis .fbars,.qp-vis .vert{max-width:100%;box-sizing:border-box}.qp-vis [style*="white-space:nowrap"]{max-width:100%;overflow-x:auto}
.qp-vis .fbars{width:100%}.qp-vis .fbar{width:min(320px,100%);box-sizing:border-box}.qp-vis .vert{padding:8px}.qp-vis .vert.w4{grid-template-columns:24px repeat(4,minmax(0,52px));gap:4px}.qp-vis .vert.w5{grid-template-columns:20px repeat(5,minmax(0,44px));gap:3px}.qp-vis .vert.w6{grid-template-columns:16px repeat(6,minmax(0,38px));gap:2px}
.qp-vis svg{overflow:hidden}
.qp-sub{display:block;font-size:.85rem;font-weight:400;color:var(--ink-soft)}
/* 가로 2단은 쓰지 않음(교수님 11/23: 세로 숏츠·문제풀이 정체성 유지) */
.visual.qp-vis{border:2px solid var(--line);border-radius:14px;background:#fff;padding:10px;margin:12px 0 4px}
.qp-opts{counter-reset:qo}
.visual.qp-novis{min-height:0;margin:4px 0}
.qp-sym{grid-template-columns:repeat(4,1fr)}
.qp-opts .opt{counter-increment:qo;position:relative;padding-left:36px!important;font-size:1.35rem;text-align:left}
.qp-opts .opt::before{content:counter(qo,decimal);position:absolute;left:9px;top:50%;transform:translateY(-50%);width:20px;height:20px;border-radius:50%;border:1.6px solid var(--ink-soft);font:700 .75rem/18px sans-serif;text-align:center;color:var(--ink-soft)}
.qp-opts:not(.qp-list){grid-template-columns:repeat(2,1fr)}
.qp-list{grid-template-columns:1fr!important}.qp-list .opt{font-family:"Gowun Dodum",sans-serif;font-weight:700;font-size:1.08rem;padding:12px 12px 12px 40px!important;line-height:1.45}
"""
_a = '.opt.text{font-size:1.4rem}'
assert h.count(_a) == 1
h = h.replace(_a, _a + _css)

# 6-2 단원 차례(교수님 11/23 밤: 원기둥 편에서 아직 배우지 않은 원주를 구하는 문제가 나옴) → 교과서처럼 '원주와 원주율 → 원의 넓이 → 원기둥 → 원뿔과 구' 차례로
_u0 = h.index("unit(6,'6-2 원기둥·원뿔·구, 원의 넓이',[")
_a = h.index(" ['S6-62','원기둥','원기둥',[", _u0); _b = h.index(" ['S6-74','원주와 원주율'", _u0); _c = h.index(" ['S6-80','숲 마을 운동회'", _u0)
h = h[:_a] + h[_b:_c] + h[_a:_b] + h[_c:]
h = h.replace("unit(6,'6-2 원기둥·원뿔·구, 원의 넓이',[", "unit(6,'6-2 원의 넓이, 원기둥·원뿔·구',[", 1)
h = h.replace("'6-2 원기둥·원뿔·구, 원의 넓이':'KG6-4'", "'6-2 원의 넓이, 원기둥·원뿔·구':'KG6-4'")
h = h.replace("GC18:['S6-74','S6-75'],GC19:['S6-62','S6-63']", "GC18:['S6-74','S6-75'],GC19:['S6-62','S6-63']")

# 각도기 끌기(교수님 11/24: 눈금이 작아 안 보임, 실제처럼 뒤집고 싶음) → [각도기 뒤집기]·[돋보기] 단추
_a = """<g id="prot" transform="translate(180,390)" style="cursor:grab">${pr}</g></svg><div class="hint" style="text-align:center">파란 각도기를 끌어서 가운데 점을 각의 꼭짓점에 맞춰요</div>`;"""
assert h.count(_a) == 1, 'prot vis'
h = h.replace(_a, """<g id="prot" transform="translate(180,390)" style="cursor:grab"><g id="protf">${pr}</g></g></svg><div style="display:flex;gap:8px;justify-content:center;margin:6px 0"><button type="button" class="m2b" id="pflip" style="min-height:44px;padding:6px 14px;border-radius:12px;border:2.5px solid #C9A56B;background:#fff;font-family:Jua,sans-serif;font-size:1rem;color:#4A2E14">↔ 각도기 뒤집기</button><button type="button" class="m2b" id="pzoom" style="min-height:44px;padding:6px 14px;border-radius:12px;border:2.5px solid #C9A56B;background:#fff;font-family:Jua,sans-serif;font-size:1rem;color:#4A2E14">🔍 눈금 크게 보기</button></div><div class="hint" style="text-align:center">파란 각도기를 끌어서 가운데 점을 각의 꼭짓점에 맞춰요. 눈금이 작으면 [눈금 크게 보기]를 눌러요</div>`;""")
_a = """q.onMount=root=>{ const svg=root.querySelector('svg.pdrag'), g=svg.querySelector('#prot'); let px=180, py=390, off=null;"""
assert h.count(_a) == 1, 'prot mount'
h = h.replace('<svg class="pdrag" viewBox="0 0 360 400" style="width:100%', '<svg class="pdrag" viewBox="0 0 360 400" style="overflow:hidden;width:100%', 1)
h = h.replace(_a, _a + """ let flip=false, zoom=false; const gf=svg.querySelector('#protf'); const fb=root.querySelector('#pflip'), zb=root.querySelector('#pzoom');
    if(fb) fb.onclick=()=>{ flip=!flip; /* 뒤집으면 눈금이 거꾸로 읽히는 것과 같다: 바깥·안쪽 눈금 수가 서로 바뀜(글자는 바로 보이게) */ gf.querySelectorAll('text').forEach(t=>{ t.textContent=180-(+t.textContent); }); fb.style.borderColor=flip?'#E8743B':'#C9A56B'; };
    if(zb) zb.onclick=()=>{ zoom=!zoom; if(zoom){ const tx=vx+150*Math.cos(a), ty=vy-150*Math.sin(a); const w=150, hh=167; svg.setAttribute('viewBox',`${Math.max(0,Math.min(360-w,tx-w/2)).toFixed(1)} ${Math.max(0,Math.min(400-hh,ty-hh/2)).toFixed(1)} ${w} ${hh}`); zb.textContent='🔍 원래 크기로'; zb.style.borderColor='#E8743B'; } else { svg.setAttribute('viewBox','0 0 360 400'); zb.textContent='🔍 눈금 크게 보기'; zb.style.borderColor='#C9A56B'; } };""")

# 만든 사람 표시(교수님 11/23): 눈에 띄지 않게 코드 안에만
h = h.replace('<head>', '<head>\n<!-- 도토리 숲 수학 퀴즈 · made by 굳잡맨(goodjobMan) · CC BY-NC 4.0 · 비영리·교육 목적, 출처를 밝히고 고쳐 써도 됩니다 -->\n<meta name="author" content="굳잡맨 (goodjobMan)">', 1)
h = h.replace('</body>', '<script>/* gjm */(function(){try{Object.defineProperty(window,"__dotori",{value:Object.freeze({by:decodeURIComponent("%EA%B5%B3%EC%9E%A1%EB%A7%A8"),id:"goodjobMan",license:"CC BY-NC 4.0"}),enumerable:false});}catch(e){}})();</script>\n</body>', 1)

# 빈틈없이 채워요(S6-33) 도움말: 각의 합 360°가 아니라 모양 조각 관계로(교수님 11/24, 교육과정 범위)
_a = "'S6-33':'한 꼭짓점에 모인 각의 합이 360°가 되면 빈틈없이 채울 수 있어요.'"
assert h.count(_a) == 1, 'S6-33 tip'
h = h.replace(_a, "'S6-33':'모양 조각을 겹치지 않게, 빈틈없이 놓아 보세요. 큰 조각 하나가 작은 조각 몇 개와 크기가 같은지 생각해요.'")

# 새 버전 알림(교수님 11/24: 밤새 열어 둔 탭이 옛 버전 그대로) — 화면에 돌아올 때·20분마다 새 버전이 있는지 보고, 있으면 위에 '눌러서 새로 고침' 띠
import hashlib as _hl
_bid = _hl.sha1(h.encode('utf-8')).hexdigest()[:10]
h = h.replace("</body>", r"""<script>window.__BUILD="%s";(function(){var shown=0;function chk(){ if(shown||!navigator.onLine) return; fetch(location.pathname+'?v='+Date.now(),{cache:'no-store'}).then(function(r){return r.text();}).then(function(t){ var m=t.match(/window\.__BUILD="(\w+)"/); if(m&&m[1]!==window.__BUILD){ shown=1; var b=document.createElement('button'); b.textContent='새 버전이 나왔어요 · 눌러서 새로 고침'; b.style.cssText='position:fixed;top:8px;left:50%%;transform:translateX(-50%%);z-index:99999;padding:10px 16px;border-radius:999px;border:2px solid #7A4A1E;background:#FFE7A8;color:#4A2E14;font:16px Jua,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25)'; b.onclick=function(){ location.reload(); }; document.body.appendChild(b); } }).catch(function(){}); } document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible') chk(); }); setInterval(chk,20*60*1000); setTimeout(chk,5000); })();</script>
</body>""" % _bid, 1)
open('out/index.html', 'w', encoding='utf-8').write(h)
print('built', len(out))


# 물건 그림(Flow로 그림, img/obj) — 문서와 함께 out/img로
import shutil as _sh, os as _os
if _os.path.isdir('img'):
    _sh.rmtree('out/img',ignore_errors=True); _sh.copytree('img','out/img')
