// Funciona offline: entrega o que está guardado e atualiza por trás.
const V = 'astrokdok-v1';
const FILES = ['./', 'index.html', 'style.css', 'manifest.json', 'icon-192.png', 'icon-512.png',
  'js/engine.js', 'js/sprites.js', 'js/world.js', 'js/lesson.js', 'js/content1.js', 'js/content2.js', 'js/content3.js',
  'js/game-launch.js', 'js/game-lander.js', 'js/game-sun.js', 'js/scenes.js', 'js/flow.js', 'js/main.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(V).then(c => c.match(e.request).then(hit => {
    const net = fetch(e.request).then(res => { if (res.ok || res.type === 'opaque') c.put(e.request, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  })));
});
