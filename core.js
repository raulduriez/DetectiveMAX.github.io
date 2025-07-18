// 🔧 Variables globales
let map;
let grupoMarcadores = L.layerGroup();
let pistaActual = 1;
let tiempoRestante = 4320; // minutos ficticios
let progresoCaso = 0;
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;

// 🚦 Ejecutar al cargar la página
window.onload = () => {
  document.getElementById("chatBotMision").style.display = "block";
};

// 🗺️ Inicializa el mapa base
function iniciarMapa() {
  map = L.map("map").setView([12.8654, -85.2072], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
  }).addTo(map);
  grupoMarcadores.addTo(map);
}

// 📊 Muestra resumen del progreso y tiempo
function mostrarResumen() {
  const horas = Math.floor(tiempoRestante / 60);
  const minutos = tiempoRestante % 60;
  document.getElementById("resumenJugador").textContent =
    `🧠 Misión activa | Pista ${pistaActual}/3 | Tiempo: ${horas}h ${minutos}min`;
  verificarTiempo();
}

// ⏳ Verifica si el tiempo se agotó
function verificarTiempo() {
  if (tiempoRestante <= 0) {
    alert("🕯️ El tiempo se agotó. El objeto se pierde en la historia.");
    document.getElementById("mensajePanel").textContent =
      "⏳ Has fallado. El expediente queda sin cerrar.";
    grupoMarcadores.clearLayers();
  }
}

// 🗺️ Coordenadas por departamento
function coordenadasDepartamento(depto) {
  const coords = {
    "León": [12.436, -86.879],
    "Masaya": [11.976, -86.090],
    "Matagalpa": [13.002, -85.914]
  };
  return coords[depto] || [12.8654, -85.2072];
}

// 🔍 Verifica si viajó al lugar correcto según pista
function esCorrecto(depto) {
  return (pistaActual === 1 && depto === "León") ||
         (pistaActual === 2 && depto === "Masaya") ||
         (pistaActual === 3 && depto === "Matagalpa");
}

