import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Terminos',
  '/Privacidad',
  '/InformacionM',
  '/InformacionP',
  '/InformacionVP',
  '/assets/mudanzas.jpeg',
  '/assets/R.jpeg',
  '/assets/urban.png',
  '/public/src/img/logo.png',
  '/public/src/img/headerB.jpg',
];

// Install event - cache the initial static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  console.log('[Service Worker] Installing Service Worker ...', event);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

// Fetch event - serve resources from cache or fetch and cache new ones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Cache API responses for the slider
registerRoute(
  ({ url }) => url.origin === 'https://back-end-siveth-g8vc.vercel.app/api/slider',
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Cache images from all origins, including Amazon S3
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache HTML documents
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache images specifically from Amazon S3
registerRoute(
  ({ url }) => url.origin === 'https://viajesramos.s3.us-east-2.amazonaws.com',
  new StaleWhileRevalidate({
    cacheName: 's3-image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Push event - display notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Notificación Push';
  const options = {
    body: data.body,
    icon: data.icon || '/assets/mudanzas.jpeg',
    badge: data.badge || '/assets/mudanzas.jpeg',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event - open application on click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
