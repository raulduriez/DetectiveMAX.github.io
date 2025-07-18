// 🕵️ Alias y misión
const alias = localStorage.getItem("aliasDetective") || "Duriez";
const jugadorDep = localStorage.getItem("departamentoSeleccionado") || "";

document.getElementById("aliasDisplay").textContent = alias;
document.getElementById("zonaActiva").textContent = jugadorDep || "Sin asignar";

// ⏱️ Tiempo total del juego
let tiempoRestante = 300; // segundos
document.getElementById("tiempoRestante").textContent = `${tiempoRestante} seg.`;

// 🗺️ Inicializar Leaflet
const map = L.map('map').setView([12.8654, -85.2072], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 🎯 Estilo para resaltar zona activa
function styleDepto(feature) {
  const nombre = feature.properties.NAME_1;
  return {
    fillColor: nombre === jugadorDep ? '#ff4444' : '#66ccff',
    weight: 2,
    color: '#fff',
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({ weight: 3, color: '#000', fillOpacity: 0.9 });
  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function onDeptoClick(e) {
  const nombre = e.target.feature.properties.NAME_1;
  if (nombre === jugadorDep) {
    alert(`📍 Estás en la zona del crimen: ${nombre}. Comienza tu investigación.`);
  } else {
    alert(`Has llegado a ${nombre}. Aún no tienes acceso a esta misión.`);
  }
}

// 🧩 Cargar GeoJSON con los departamentos
let geojson;
fetch('data/nicaragua_departamentos.geojson')
  .then(res => res.json())
  .then(data => {
    geojson = L.geoJson(data, {
      style: styleDepto,
      onEachFeature: (feature, layer) => {
        layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: onDeptoClick });
        layer.bindPopup(`<b>${feature.properties.NAME_1}</b>`);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error cargando GeoJSON:", err));


// 📍 Puntos narrativos con penalización opcional
const puntosClave = [
  {
    nombre: "Mercado de León",
    coords: [12.4356, -86.8796],
    mensaje: "🧺 El mercado guarda más que frutas... alguien dejó un dibujo sospechoso.",
    visible: jugadorDep === "León"
  },
  {
    nombre: "Archivo de Managua",
    coords: [12.1364, -86.2510],
    mensaje: "📁 El archivo nacional fue saboteado. ¿Qué buscaba la Viuda?",
    visible: jugadorDep === "Managua"
  },
  {
    nombre: "Templo en Masaya",
    coords: [11.9744, -86.0932],
    mensaje: "🕯️ El templo de los susurros... se oyen versos antiguos en sus paredes.",
    visible: jugadorDep === "Masaya"
  },
  {
    nombre: "Casa del Poeta - Estelí",
    coords: [13.0882, -86.3540],
    mensaje: "📜 Un verso está incompleto… El último rastro de La Viuda pasó por aquí.",
    visible: true,
    penalizacionTiempo: 60
  }
];

// 🔎 Mostrar marcadores clave
puntosClave.forEach(punto => {
  if (punto.visible) {
    const marker = L.marker(punto.coords).addTo(map);
    marker.bindPopup(`<b>${punto.nombre}</b><br>${punto.mensaje}`);

    marker.on("click", () => {
      if (punto.penalizacionTiempo) {
        tiempoRestante -= punto.penalizacionTiempo;
        if (tiempoRestante < 0) tiempoRestante = 0;
        document.getElementById("tiempoRestante").textContent = `${tiempoRestante} seg.`;

        alert(`⏳ Pista secundaria consultada. Tiempo perdido: -${punto.penalizacionTiempo} seg.\nTiempo actual: ${tiempoRestante}`);

        if (tiempoRestante <= 0) {
          alert("🕯️ El tiempo se ha agotado… La Viuda ha escapado sin dejar rastro.");
        }
      }
    });
  }
});


// ❌ Puntos de distracción (15)
const distracciones = [
  { nombre: "Puerto de Corinto", coords: [12.4820, -87.0270] },
  { nombre: "Isla de Ometepe", coords: [11.5170, -85.6970] },
  { nombre: "Puente de Tipitapa", coords: [12.1967, -86.0962] },
  { nombre: "Monumento al Combatiente", coords: [13.4833, -86.5833] },
  { nombre: "Museo de Rivas", coords: [11.4361, -85.8336] },
  { nombre: "Lago de Apanás", coords: [13.9224, -85.9381] },
  { nombre: "Entrada a Waslala", coords: [13.1333, -85.3833] },
  { nombre: "Reserva Indio-Maíz", coords: [11.0391, -84.3991] },
  { nombre: "Zona minera de Bonanza", coords: [14.0431, -84.5997] },
  { nombre: "Campamento abandonado", coords: [13.8132, -85.7717] },
  { nombre: "Aeropuerto de Bluefields", coords: [12.0150, -83.7636] },
  { nombre: "Laguna de Perlas", coords: [12.6231, -83.7358] },
  { nombre: "Ferrocarril de Chinandega", coords: [12.6266, -87.1318] },
  { nombre: "Parque de Ticuantepe", coords: [12.0232, -86.2496] },
  { nombre: "Zona fronteriza Las Manos", coords: [13.9225, -86.1444] }
];

distracciones.forEach(punto => {
  const marcador = L.marker(punto.coords).addTo(map);
  marcador.bindPopup(`<b>${punto.nombre}</b><br>Este lugar parece sospechoso... pero no hay rastro de La Viuda.`);

  marcador.on("click", () => {
    tiempoRestante -= 45;
    if (tiempoRestante < 0) tiempoRestante = 0;
    document.getElementById("tiempoRestante").textContent = `${tiempoRestante} seg.`;

    alert(`❌ Pista equivocada.\nTiempo reducido: -45 seg.\nNuevo tiempo: ${tiempoRestante} segundos.`);

    if (tiempoRestante <= 0) {
      alert("🕯️ El tiempo se ha agotado… La Viuda ha escapado sin dejar rastro.");
    }
  });
});
