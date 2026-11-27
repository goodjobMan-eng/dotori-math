/* 도토리 숲 수학 — 오프라인 지원(11/27)
   앱 화면(index.html)은 인터넷이 되면 늘 새로 받고(새 버전 바로 반영), 끊기면 저장해 둔 것을 연다.
   그림·글꼴·아이콘은 한 번 받으면 저장해서 씀. 유튜브 영상·기록 전송은 인터넷이 있어야 함. */
const C='dotori-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(r.mode==='navigate'||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname))){
    e.respondWith(fetch(r).then(res=>{ const cp=res.clone(); caches.open(C).then(c=>c.put('./index.html',cp)); return res; }).catch(()=>caches.match('./index.html')));
    return; }
  const same=u.origin===location.origin, font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(same||font) e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; })));
});
