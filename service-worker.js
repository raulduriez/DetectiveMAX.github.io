// ⚡ Activación e instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('detective-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'mapa.html',
        'styles.css',
        'mapa.css',
        'intro.js',
        'mapa.js',
        'manifest.json',
        'icon.png',
        'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js',
        'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
      ]);
    })
  );
  console.log('🛠️ Service Worker instalado');
});

// 🌀 Intercepta solicitudes y sirve desde caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

