const CACHE_NAME = 'idkvideos-app-v2';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  const store = response => { if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); } return response; };
  if (req.mode === 'navigate') {
    // pages: network first, so a new deploy shows up; cache only when offline
    event.respondWith(fetch(req).then(store).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(store)));
  }
});
