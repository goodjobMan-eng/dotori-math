
/* ---------- 3-90. 문장 다듬기(윤문): 조사 받침 맞추기·띄어쓰기·끝맺음 ----------
   문제를 화면에 올리기 직전에 한 번 거친다. 수·단위·자음 기호(ㄱ, ㄴ…)·따옴표 낱말 뒤의 조사를
   읽는 소리의 받침에 맞추고(57예요→57이에요, 137를→137을, 20로→20으로, ㄹㅁㅂ는→ㄹㅁㅂ은),
   식과 조사 사이의 빈칸을 없앤다(28 ÷ 4 의→28 ÷ 4의). 소수 계산 찌꺼기(52.019999…)도 정리한다. */
(()=>{
  const DB={'0':1,'1':8,'2':0,'3':1,'4':0,'5':0,'6':1,'7':8,'8':8,'9':0};      /* 영·일·이·삼… 받침: 0 없음, 8 ㄹ, 1 그 밖 */
  const UB={'°':0,'%':0,'cm':0,'mm':0,'km':0,'m':0,'kg':1,'g':1,'t':1,'L':0,'mL':0,'cm²':0,'m²':0,'km²':0,'cm³':0,'m³':0};
  const jong=ch=>{ const k=ch.charCodeAt(0)-0xAC00; if(k<0||k>=11172) return -1; const j=k%28; return j===0?0:(j===8?8:1); };
  const J=[['이에요','예요'],['이라고','라고'],['으로','로'],['은','는'],['이','가'],['을','를'],['과','와']];
  const pickJ=(b,j)=>{ for(const [a,c] of J){ if(j===a||j===c){ if(a==='으로') return (b===0||b===8)?'로':'으로'; return b?a:c; } } return j; };
  const JS='이에요|예요|이라고|라고|으로|로|은|는|이|가|을|를|과|와';
  const END='(?=$|[\\s,.?!)\\]\'"”’…·:;]|<|&)';
  const UNITS='cm²|cm³|km²|m²|m³|mL|cm|mm|km|kg|m|g|t|L';
  const reNum=new RegExp('(\\d)(?:\\s)?((?:'+UNITS+')(?![A-Za-z²³]))?( ?)('+JS+')'+END,'g');
  const reDeg=new RegExp('([°%])( ?)('+JS+')'+END,'g');
  const reJamo=new RegExp('((?:^|[\\s(])[ㄱ-ㅎ]{1,4})( ?)('+JS+')'+END,'g');
  const reQuo=new RegExp('([가-힣])(\\u200b?[\'’”"])('+JS+')'+END,'g');
  const reSp=new RegExp('(\\d|[°%²³□△○)]|\\b(?:'+UNITS+'))\\s(의|에서|에|만큼|보다|까지|부터|처럼)'+END,'g');
  const fixText=s=>{
    if(s==null||typeof s!=='string'||!/[가-힣]/.test(s)) return s;
    let t=s;
    t=t.replace(/(\d+\.\d*?)(?:9{5,}\d*|0{5,}[1-9]\d*)(?!\d)/g,m=>String(+(+m).toFixed(6)));
    t=t.replace(/(\d (?:L|kg|km|m|cm)) 0 (?:mL|g|m|cm|mm)(?![\d²³A-Za-z])/g,'$1');
    t=t.replace(/(\d)\s?\(이\)라고/g,(m,d)=>d+(DB[d]?'이라고':'라고'));
    /* 숫자(+단위) 뒤 조사 */
    t=t.replace(reNum,(m,d,u,sp,j)=>{
      const b=u?UB[u]:DB[d];
      if(u){ return d+(m.slice(1).match(/^\s?/)[0])+u+pickJ(b,j); }
      return d+pickJ(b,j);
    });
    t=t.replace(reDeg,(m,c,sp,j)=>c+pickJ(0,j));
    t=t.replace(reJamo,(m,w,sp,j)=>w+pickJ(/ㄹ$/.test(w)?8:1,j));
    t=t.replace(reQuo,(m,c,q,j)=>c+q+pickJ(jong(c),j));
    t=t.replace(reSp,'$1$2');
    t=t.replace(/(\d) (배|장|개|명|자루|권|살|그루|봉지|묶음|송이|마리|대|척|컵|병|도막|층|쪽)(?=$|[\s,.?!)]|[이가은는을를과와도씩만])/g,'$1$2');
    /* 끝맺음 없는 짧은 물음: '…를 소수로' → '…를 소수로 나타내면?' */
    t=t.replace(/^(.{2,40}?(?:을|를)\s(?:소수|분수|가분수|대분수|기약분수|백분율|숫자|수))로\??$/,'$1로 나타내면?');
    t=t.replace(/^(.{2,40}?)(?:을|를)\s(올림|버림|반올림)하여\s(.{2,6}자리)까지$/,(m,a,k,z)=>m+' 나타내면?');
    t=t.replace(/^(.{1,30}?(?:최대공약수|최소공배수|공약수|공배수|크기가 같은 분수))$/,'$1는?');
    /* '…(대분수로)', '…의 몫을 분수로', '…를 분모가 3인 가분수로', '비율을 소수로?' → 끝맺음 */
    t=t.replace(/^(.+?\d)\s?\((대분수|가분수|기약분수)로\)$/,(m,a,k)=>a+(DB[a.slice(-1)]?'을':'를')+' 계산하여 '+k+'로 나타내면?');
    t=t.replace(/^(.{2,60}?(?:분수|가분수|대분수|기약분수|소수|백분율|자연수의 비))로\??$/,'$1로 나타내면?');
    return t;
  };
  const reTag=new RegExp('(\\d|[°%])((?:</[a-z]+>)+)\\s?('+JS+')'+END,'g');
  const reTagSp=new RegExp('(\\d|[°%²³□])((?:</[a-z]+>)+)\\s(의|에서|에|만큼|보다|까지|부터|처럼)'+END,'g');
  const fixHTML=h=>{ if(h==null||typeof h!=='string') return h;
    h=h.replace(reTag,(m,d,tg,j)=>d+tg+pickJ(d in DB?DB[d]:0,j)).replace(reTagSp,'$1$2$3');
    return h.replace(/>([^<>]*[가-힣][^<>]*)</g,(m,x)=>'>'+fixText(x)+'<').replace(/^([^<>]*[가-힣][^<>]*)(?=<|$)/,x=>fixText(x)); };
  const fixAny=v=>typeof v==='string'?(/<[a-z!\/]/i.test(v)?fixHTML(v):fixText(v)):v;
  window.kfixText=fixText; window.kfixAny=fixAny;
  window.kfixQ=q=>{
    if(!q||typeof q!=='object'||q._kf) return q;
    try{
      for(const k of ['q','speech','hint','hint1','why','ansText','visual']){
        const d=Object.getOwnPropertyDescriptor(q,k);
        if(!d) continue;
        if(d.get){ const g=d.get; Object.defineProperty(q,k,{get(){ return fixAny(g.call(this)); },configurable:true,enumerable:d.enumerable}); }
        else if(typeof d.value==='string'&&d.writable!==false) q[k]=fixAny(d.value);
      }
      if(Array.isArray(q.opts)) q.opts=q.opts.map(fixAny);
      if(typeof q.ans==='string') q.ans=fixAny(q.ans);
      /* 그림 글자(span)가 섞인 발문의 끝맺음: 순수 글자로 보고 꼬리만 고친다 */
      if(typeof q.q==='string'&&/<[a-z]/i.test(q.q)){ const plain=q.q.replace(/<[^>]+>/g,'').trim();
        if(/(분수|가분수|대분수|기약분수|소수|백분율)로$/.test(plain)) q.q=q.q.replace(/\s*$/,'')+' 나타내면?';
        const mm=plain.match(/(\d)\s?\((대분수|가분수|기약분수)로\)$/); if(mm) q.q=q.q.replace(/\s?\((대분수|가분수|기약분수)로\)\s*$/,(x,k)=>(DB[mm[1]]?'을':'를')+' 계산하여 '+k+'로 나타내면?'); }
      /* 식만 있고 >·=·<를 고르는 문제 → 평가원 꼴 끝맺음 */
      if(Array.isArray(q.opts)&&q.opts.length&&q.opts.every(o=>['>','<','=','＞','＜','＝'].includes(String(o).trim()))&&typeof q.q==='string'&&!/[?요]\s*$/.test(q.q.replace(/<[^>]+>/g,'').trim())) q.q=q.q+'<br><span style="font-size:.9em">크기를 비교하여 □ 안에 &gt;, =, &lt; 중 알맞은 것을 고르세요.</span>';
      for(const k of ['mis','fx']){ const m=q[k]; if(m&&typeof m==='object'&&!Array.isArray(m)){ const n={}; for(const key of Object.keys(m)) n[fixAny(key)]=m[key]; q[k]=n; } }
      if(q.manip&&typeof q.manip.html==='string') q.manip.html=fixHTML(q.manip.html);
      Object.defineProperty(q,'_kf',{value:1,enumerable:false});
    }catch(e){}
    return q;
  };
})();
