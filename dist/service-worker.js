// Choose a cache name
const cacheName = 'tnia-event-v1';

// List the files to precache
const precacheResources = [
  '/',
  '/index.css',
  '/index.html',
  '/sessions.js',
  'https://cdnjs.cloudflare.com/ajax/libs/luxon/3.4.3/luxon.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/swipejs/2.3.1/swipe.min.js',
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
