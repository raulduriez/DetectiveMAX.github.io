const CACHE_NAME = 'detective-cache-v1';
const urlsToCache = [
  'index.html',
  'mapa.html',
  'styles.css',
  'core.js',
  'narrativa.js',
  'viaje.js',
  'intervencion.js',
  'panel.js',
  'icon.png',
  'chambot.png',
  'manifest.json',
  'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js'
];

// 📥 Al instalar: se guarda todo en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🔄 Al activar: limpia versiones anteriores si las hay
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// 🚀 Al navegar: se sirve desde caché o se busca online si no está
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
