let mapa;
let grupoMarcadores;
let pistaActual = 1;
let progresoCaso = 0;
let tiempoRestante = 180;
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;

function iniciarMapa() {
  mapa = L.map('map').setView([12.8654, -85.2072], 7);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(mapa);

  grupoMarcadores = L.layerGroup().addTo(mapa);
}

function activarViaje() {
  grupoMarcadores.clearLayers();
  const departamentos = ["León", "Masaya", "Matagalpa"];
  const destino = departamentos[pistaActual - 1];
  agregarMarcadores(destino);
  document.getElementById("reporteNarrativo").textContent = `🚍 Viajando a: ${destino}`;
}
//parte2
function agregarMarcadores(departamento) {
  const puntos = {
    "León": [
      { lugar: "Parque Central", coords: [12.436, -86.879], clave: true },
      { lugar: "Iglesia", coords: [12.437, -86.883], clave: true },
      { lugar: "Mercado", coords: [12.438, -86.881], clave: true }
    ],
    "Masaya": [
      { lugar: "Parque", coords: [11.976, -86.090], clave: true },
      { lugar: "Mercado", coords: [11.975, -86.088], clave: true },
      { lugar: "Iglesia", coords: [11.974, -86.092], clave: true }
    ],
    "Matagalpa": [
      { lugar: "Parque", coords: [13.000, -85.916], clave: true },
      { lugar: "Casa Rubén Darío", coords: [13.002, -85.914], clave: true },
      { lugar: "Mercado", coords: [12.998, -85.918], clave: true }
    ]
  };

  puntos[departamento]?.forEach(p => {
    const icono = L.icon({
      iconUrl: p.clave
        ? "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
        : "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
      iconSize: [24, 24]
    });

    const marcador = L.marker(p.coords, { icon: icono });
    marcador.bindPopup(
      `<strong>${p.lugar}</strong><br><button onclick="intervenirLugar('${p.lugar}', ${p.clave})">📌 Intervenir</button>`
    );
    marcador.addTo(grupoMarcadores);
  });
}
//parte3

function intervenirLugar(lugar, esClave) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  if (!esClave) {
    panel.innerHTML = `
      <div class="contenedor-pistas">
        <h3>🔍 Sin pistas relevantes</h3>
        <p>El lugar ${lugar} no contiene evidencia crítica. El Chambot recomienda seguir investigando.</p>
      </div>
    `;
    return;
  }

  const mensaje = `
🏃 Se inicia la persecución...
🛰️ Desde el satélite se escuchan disparos cerca del río...
🎉 Sospechosa detectada: ¿Negra Yan o Viuda Negra?
  `;

  escribirMaquina(mensaje, "mensajePanel", 40, () => {
    panel.innerHTML += `
      <div class="contenedor-pistas">
        <h3>⚖️ Decisión final</h3>
        <p>Seleccione quién cree que es la verdadera responsable:</p>
        <button onclick="resolverCaso('Viuda Negra')">🎯 Viuda Negra</button>
        <button onclick="resolverCaso('Negra Yan')">🛑 Negra Yan</button>
      </div>
    `;
  });
}

function escribirMaquina(texto, idElemento, velocidad = 35, callback = null) {
  let i = 0;
  const destino = document.getElementById(idElemento);
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
//parte4

function resolverCaso(nombre) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  let mensaje = "";
  let resultado = "";

  if (nombre === "Viuda Negra") {
    mensaje = `
🎉 La sospechosa ha sido capturada.
🤖 Chambot: Felicidades, detective. Ha capturado a una jefa de una peligrosa banda.
🎖️ Con tres casos más, su ascenso será inevitable.
    `;

    progresoCaso++;
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
    verificarAscenso();

    resultado = `
      <div class='contenedor-pistas'>
        <h3>🌟 Caso resuelto</h3>
        <p>La Viuda Negra ha sido capturada.</p>
        <p>📁 El archivo se cierra con éxito. Felicitaciones, detective.</p>
      </div>`;
  } else {
    mensaje = `
❌ Se ha arrestado al sospechoso equivocado.
🤖 Chambot: El verdadero criminal ha escapado entre la multitud.
📁 El archivo queda abierto. Pero no se rinda, detective. El rastro aún respira.
    `;

    resultado = `
      <div class='contenedor-pistas'>
        <h3>🕯️ Error de juicio</h3>
        <p>La Viuda Negra ha escapado. El caso queda inconcluso.</p>
        <p>📁 El archivo sigue abierto. Puede volver a intentarlo.</p>
      </div>`;
  }

  escribirMaquina(mensaje, "mensajePanel", 35, () => {
    panel.innerHTML += resultado;
    mostrarResumen();
  });
}

function verificarAscenso() {
  const nuevoRango = obtenerRango(casosResueltos);
  document.getElementById("mensajePanel").innerHTML +=
    `<div class='contenedor-pistas'>
      <h3>🆙 Ascenso Detectivesco</h3>
      <p><strong>Casos resueltos:</strong> ${casosResueltos}</p>
      <p><strong>Nuevo rango:</strong> ${nuevoRango}</p>
      <p>🔓 Nuevas misiones y reconocimientos disponibles.</p>
    </div>`;
}

function obtenerRango(casos) {
  if (casos <= 3) return "🎖️ Novato";
  else if (casos <= 6) return "🔎 Inspector";
  else if (casos <= 9) return "🕵️ Detective";
  else if (casos <= 12) return "👮 Subcomandante";
  else if (casos <= 15) return "📡 Comandante";
  else return "🌟 Comandante General";
}

