self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('detective-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'mapa.html',
        'styles.css',
        'mapa.css',
        'intro.js',
        'mapa.js',
        'manifest.json',
        'icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
