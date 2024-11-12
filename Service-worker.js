import { registerRoute } from 'workbox-routing'; 
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
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

// Instala y guarda en caché recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  console.log('[Service Worker] Instalando Service Worker...', event);
});

// Activa y limpia cachés antiguas
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
  console.log('[Service Worker] Activando Service Worker...', event);
  return self.clients.claim();
});

// Captura las peticiones y busca en la caché primero
self.addEventListener('fetch', (event) => {
  // Captura las peticiones de imágenes, primero intentando buscar en la cache
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Devuelve la imagen de la caché si está disponible
        }
        return fetch(event.request).then((networkResponse) => {
          // Si la respuesta es válida, se almacena en la caché
          if (networkResponse && networkResponse.status === 200) {
            caches.open('image-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request); // Busca en cache o recurre a la red
      })
    );
  }
});

// Cachea las respuestas de la API para el slider usando StaleWhileRevalidate
registerRoute(
  ({ url }) => url.origin === 'https://back-end-siveth-g8vc.vercel.app/api/slider',
  new StaleWhileRevalidate({
    cacheName: 'api-slider-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
      }),
    ],
  })
);

// Cachea imágenes de cualquier origen, incluyendo Amazon S3
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Cachea documentos HTML
registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'pages-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Cachea imágenes específicamente de Amazon S3
registerRoute(
  ({ url }) => url.origin === 'https://viajesramos.s3.us-east-2.amazonaws.com',
  new CacheFirst({
    cacheName: 's3-image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Muestra notificaciones en eventos push
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

// Abre la aplicación al hacer clic en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
