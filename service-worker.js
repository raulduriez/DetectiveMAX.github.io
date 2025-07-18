const CACHE_NAME = "detective-app-v1";

const ARCHIVOS_A_CACHEAR = [
  "index.html",
  "mapa.html",
  "styles.css",
  "mapa.css",
  "intro.js",
  "mapa.js",
  "manifest.json",
  "icon.png",
  "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
];

// ⚙️ Instalación inicial: guarda archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
  console.log("🛠️ Service Worker instalado");
});

// 🚀 Activación: limpia versiones viejas si las hay
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      );
    })
  );
  console.log("🚦 Service Worker activo y listo");
});

// 🌀 Intercepta solicitudes: responde desde caché si puede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(respuesta => {
      return respuesta || fetch(event.request);
    })
  );
});


