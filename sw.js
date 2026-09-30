// Funciona offline: entrega o que está guardado e atualiza por trás.
const V = 'astrokdok-v2';
const FILES = ['./', 'index.html', 'style.css', 'manifest.json', 'icon-192.png', 'icon-512.png',
  'js/engine.js', 'js/sprites.js', 'js/world.js', 'js/lesson.js', 'js/episodes.js', 'js/content1.js', 'js/content2.js', 'js/content3.js', 'js/content4.js', 'js/content5.js', 'js/content6.js', 'js/content7.js', 'js/content8.js', 'js/content9.js', 'js/content10.js', 'js/content11.js', 'js/content12.js', 'js/content13.js', 'js/content14.js', 'js/content15.js', 'js/content16.js', 'js/content17.js', 'js/content18.js', 'js/sites.js', 'js/bodies.js', 'js/games-common.js', 'js/game-launch.js', 'js/game-lander.js', 'js/game-sun.js', 'js/games-a.js', 'js/games-b.js', 'js/games-c.js', 'js/games-d.js', 'js/games-e.js', 'js/scenes.js', 'js/flow.js', 'js/main.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(V).then(c => c.match(e.request).then(hit => {
    const net = fetch(e.request).then(res => { if (res.ok || res.type === 'opaque') c.put(e.request, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  })));
});
