const CACHE_NAME = 'app-cache-v2';
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)));
      await self.clients.claim();
    })()
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isAsset = url.pathname.startsWith('/assets/') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js');
  const isDoc = req.headers.get('accept')?.includes('text/html');

  if (isAsset || isDoc) {
    event.respondWith(staleWhileRevalidate(req));
  }
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((resp) => {
      if (resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'opaque')) {
        cache.put(request, resp.clone()).catch(() => {});
      }
      return resp;
    })
    .catch(() => cached);
  return cached || networkPromise;
}
