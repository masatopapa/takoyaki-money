// 2026-09-18 このサイトは https://masatopapa.github.io/takoyaki-game/ に移転した。
// 旧版がオフラインキャッシュから復活しないよう、Service Worker は自分自身を登録解除してキャッシュを全部消す。
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.navigate(c.url)))
  );
});
