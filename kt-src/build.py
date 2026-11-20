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
rl("['각도기 바깥쪽 눈금은 60", "  ['각도기 바깥쪽 눈금은 60, 안쪽 눈금은 120. 변이 안쪽 눈금 0에서 시작하면 각도는?','120°',[['60°','G4-01'],['90°',null]]],")
rl("['각도기 바깥쪽 눈금은 50", "  ['각도기 바깥쪽 눈금은 50, 안쪽 눈금은 130. 변이 바깥쪽 눈금 0에서 시작하면 각도는?','50°',[['130°','G4-01'],['90°',null]]],")
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
rl("['반 학생들이 좋아하는 과일의", "  ['반 학생들이 좋아하는 과일의 비율을 나타내기 좋은 그래프는?','원그래프',[['꺾은선그래프','D6-05'],['수 배열표',null]]],")
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


out = '\n'.join(lines) + open('src/bank2.js', encoding='utf-8').read() + open('src/mis.js', encoding='utf-8').read() + open('src/tags3.js', encoding='utf-8').read() + open('src/cpiece.js', encoding='utf-8').read() + open('src/assets2.js', encoding='utf-8').read() + open('src/core2.js', encoding='utf-8').read().replace('/*__FACTS__*/', open('src/facts.js', encoding='utf-8').read()).replace('/*__MODES__*/', open('src/modes.js', encoding='utf-8').read())
open('kt.js', 'w', encoding='utf-8').write(out)

h = open('/tmp/dotori-math/index.html', encoding='utf-8').read()
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
for a, mc in MC:
    assert h.count(a) == 1, a
    h = h.replace(a, a + " mcode:()=>" + mc + ",")
a = "const ok=q.manip.check(); answer("; assert h.count(a) == 1
_a = "g.reveal=()=>g.set(half.map(([x,y])=>[5-x,y])); return MQ('대칭축(점선)을 기준으로 선대칭도형을 완성해 보세요.'"
assert h.count(_a) == 1
h = h.replace(_a, "g.reveal=()=>g.set(half.map(([x,y])=>[5-x,y])); g.state=()=>g.cells().map(v=>v.join('')).sort().join('.'); g.mcode=()=>{ const c=g.cells().map(v=>v.join(',')).sort().join('|'), K=f=>half.map(f).map(v=>v.join(',')).sort().join('|'); return c===K(([x,y])=>[x+3,y])?'G5-15':c===K(([x,y])=>[5-x,4-y])?'G5-05':null; }; return MQ('대칭축(점선)을 기준으로 선대칭도형을 완성해 보세요.'")
h = h.replace(a, "const ok=q.manip.check(); try{ if(S.tries===0&&q.manip.state){ q._mstate=String(q.manip.state()).slice(0,24); if(!ok&&q.manip.mcode) q._mcode=q.manip.mcode(); } }catch(e){} answer(")
k = h.rindex('</body>'); h = h[:k] + '<script>\n' + out + '\n</script>\n' + h[k:]
open('out/index.html', 'w', encoding='utf-8').write(h)
print('built', len(out))
