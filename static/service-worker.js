const CACHE_NAME = 'task-manager-cache-v1';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  '/static/icon-192.png',
  '/static/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  self.clients.claim();
});

self.addEventListener("push", event => {
  const data = event.data ? event.data.text() : "Новая задача";

  event.waitUntil(
    self.registration.showNotification("Менеджер задач", {
      body: data,
      icon: "/static/icon-192.png",
      vibrate: [100, 50, 100],
    })
  );
});
