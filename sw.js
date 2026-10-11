const CACHE='olympus-shell-v14';
const ASSETS=['./app.html','./r4-app.html','./app.webmanifest','./r4-app.webmanifest','./icons/player-192.png','./icons/r4-192.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('olympus-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).catch(async()=>await caches.match(event.request)||new Response('Нет подключения. Проверьте интернет и обновите страницу.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})));
});
