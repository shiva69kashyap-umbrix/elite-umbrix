// Caches the game so it opens offline after the first visit.
const V='umbrix-v2',THREE='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const LOCAL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);
await Promise.allSettled(LOCAL.map(u=>c.add(u)));
try{const r=await fetch(THREE,{mode:'no-cors'});await c.put(THREE,r)}catch(_){}
self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>m||fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match('index.html'))))});
