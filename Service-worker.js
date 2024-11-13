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
  '/public/src/img/1.png', // Ruta correcta para las imágenes
  '/public/src/img/2.png',
  '/public/src/img/3.png',
  '/public/src/img/4.jpeg',
  '/public/src/img/logo.png',
  '/public/src/img/headerB.jpg',

  '/public/src/img/Guadalajara.jpg',
  '/public/src/img/Monterrey.jpeg',
  '/public/src/img/Queretaro.jpeg',
  '/public/src/img/Tampico.jpeg',
  '/public/src/img/Valles.jpg',

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching files');
        return cache.addAll(urlsToCache); // Agrega todas las URLs al caché
      })
  );
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Elimina cachés antiguos
          }
        })
      );
    })
  );
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Si el archivo está en caché, lo devuelve
        }
        return fetch(event.request); // Si no, hace la solicitud de red
      })
  );
});

// Registro de rutas usando Workbox para las imágenes
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Acepta respuestas con código 0 o 200
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Límite de 60 entradas en caché
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Registro de rutas para las páginas
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
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Evento de push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Notificación Push';
  const options = {
    body: data.body,
    icon: data.icon || '/assets/mudanzas.jpeg', // Ícono por defecto
    badge: data.badge || '/assets/mudanzas.jpeg', // Insignia por defecto
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Evento de click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
