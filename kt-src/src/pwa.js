
/* ===== 3-101. 기기에 저장하기(홈 화면 설치, 11/27) =====
   안드로이드·PC 크롬·엣지·삼성 인터넷: 「📲 기기에 저장」 → 설치 창. 아이폰·아이패드(사파리): 공유 → 홈 화면에 추가 안내.
   이미 설치해서 연 경우(standalone)에는 단추를 숨긴다. 서비스 워커로 인터넷이 끊겨도 앱이 열린다. */
(()=>{ let ev=null;
  const installed=()=>{ try{ return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true; }catch(e){ return false; } };
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  try{ if('serviceWorker' in navigator&&location.protocol==='https:') navigator.serviceWorker.register('sw.js').catch(()=>{}); }catch(e){}
  window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); ev=e; put(); });
  window.addEventListener('appinstalled',()=>{ ev=null; document.querySelectorAll('.kt-inst').forEach(b=>b.remove()); });
  const tip=()=>{ const d=document.createElement('div'); d.className='kt-insttip';
    d.innerHTML=ios?`<b>홈 화면에 앱으로 저장하기</b><ol><li>아래(아이패드는 위)의 <b>공유 단추</b> <span style="font-size:1.2em">⎋</span>를 눌러요.</li><li><b>「홈 화면에 추가」</b>를 골라요.</li><li>오른쪽 위 <b>「추가」</b>를 누르면 끝!</li></ol><p>사파리에서만 할 수 있어요.</p>`
      :`<b>홈 화면에 앱으로 저장하기</b><ol><li>브라우저 오른쪽 위 <b>⋮ 메뉴</b>를 눌러요.</li><li><b>「앱 설치」</b> 또는 <b>「홈 화면에 추가」</b>를 골라요.</li></ol>`;
    d.innerHTML+=`<button type="button">알겠어요</button>`; d.querySelector('button').onclick=()=>d.remove(); document.body.appendChild(d); };
  const click=async()=>{ if(ev){ ev.prompt(); try{ await ev.userChoice; }catch(e){} ev=null; } else tip(); };
  const put=()=>{ if(installed()) return; const t=document.querySelector('.kt-hometop'); if(!t||t.querySelector('.kt-inst')) return;
    const b=document.createElement('button'); b.type='button'; b.className='kt-gear kt-inst'; b.textContent='📲 기기에 저장'; b.onclick=click; t.prepend(b); };
  const st=document.createElement('style'); st.textContent=`.kt-hometop{display:flex;gap:8px;justify-content:flex-end}
   .kt-insttip{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);width:min(340px,calc(100% - 32px));z-index:99999;background:#FFF8E6;color:#4A2E14;border:3px solid #7A4A1E;border-radius:18px;padding:14px 16px;font:16px/1.5 'Gowun Dodum',sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.3)}
   .kt-insttip b{font-family:Jua,sans-serif}.kt-insttip ol{margin:6px 0 4px;padding-left:20px}.kt-insttip p{margin:0;font-size:.85em;opacity:.75}
   .kt-insttip button{display:block;margin:8px auto 0;padding:8px 22px;border-radius:999px;border:2px solid #7A4A1E;background:#FFE7A8;font:16px Jua,sans-serif;color:#4A2E14}`;
  document.head.appendChild(st);
  new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true}); setTimeout(put,300);
})();
