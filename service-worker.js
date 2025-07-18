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
  "chambot.png",
  "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
];

// 🛠️ Instalación: guarda archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
  console.log("🧩 Service Worker instalado y archivos cacheados");
});

// 🚦 Activación: limpia versiones antiguas si las hay
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(claves => {
      return Promise.all(
        claves.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  console.log("🧠 Service Worker activo y actualizado");
});

// 🔄 Intercepción: responde desde caché si existe, si no, usa red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(respuesta => {
      return respuesta || fetch(event.request);
    })
  );
});



