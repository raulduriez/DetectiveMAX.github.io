let mapa;
let grupoMarcadores;
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;
let tiempoRestante = parseInt(localStorage.getItem("tiempoRestante")) || 4320;

window.onload = () => {
  iniciarMapa();
  mostrarResumen();
  document.getElementById("mensajePanel").textContent = "🧠 Esperando instrucciones del Chambot...";
};

function iniciarMapa() {
  if (mapa) {
  mapa.remove(); // 🔧 elimina instancia anterior
}

  mapa = L.map("map").setView([12.8654, -85.2072], 7);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);
  grupoMarcadores = L.layerGroup().addTo(mapa);
}

function mostrarResumen() {
  const horas = Math.floor(tiempoRestante / 60);
  const minutos = tiempoRestante % 60;
  document.getElementById("resumenJugador").textContent =
    `🧠 Pista ${parseInt(localStorage.getItem("pistaActual")) || 1}/3 | Tiempo restante: ${horas}h ${minutos}min`;
  localStorage.setItem("tiempoRestante", tiempoRestante);
}

function obtenerRango(total) {
  if (total >= 16) return "👑 Comandante General";
  if (total >= 13) return "🧠 Comandante";
  if (total >= 10) return "🎖️ Subcomandante";
  if (total >= 7)  return "🕵️ Detective";
  if (total >= 4)  return "🔍 Inspector";
  return "📦 Novato";
}

function escribirMaquina(texto, idElemento, velocidad = 35, callback = null) {
  let i = 0;
  const destino = document.getElementById(idElemento);
  if (!destino) return;
  destino.textContent = "";
  const intervalo = setInterval(() => {
    destino.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, velocidad);
}



