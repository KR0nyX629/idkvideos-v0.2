// Kill-switch. Earlier versions registered a worker at the site root that kept
// serving the cached viewer instead of the landing page. Browsers re-check this
// exact URL, so this version removes the old worker and its caches, then reloads.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});
