let mapa;
let grupoMarcadores;
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;

window.onload = () => {
  iniciarMapa();
  document.getElementById("mensajePanel").textContent = "🧠 Esperando instrucciones del Chambot...";
};

function iniciarMapa() {
  mapa = L.map("map").setView([12.8654, -85.2072], 7);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);
  grupoMarcadores = L.layerGroup().addTo(mapa);
}

// 🚀 Botón de "Viajar"
function activarViaje() {
  grupoMarcadores.clearLayers();
  document.getElementById("mensajePanel").textContent = "🚍 Viajando a León...";
  document.getElementById("reporteNarrativo").textContent = "📍 León activado";
  agregarMarcadores("León");
}

// 📁 Botón de "Criminales"
function mostrarCriminales() {
  document.getElementById("mensajePanel").textContent =
    "📁 Base criminal:\n- Viuda Negra: vista en Masaya\n- Negra Yan: sospechosa en León";
}

// 📌 Crea marcadores con botones de intervención
function agregarMarcadores(departamento) {
  const lugares = {
    "León": [
      { lugar: "Parque Central", coords: [12.436, -86.879], clave: true },
      { lugar: "Mercado", coords: [12.438, -86.881], clave: false }
    ]
  };

  lugares[departamento]?.forEach(p => {
    const marcador = L.marker(p.coords);
    marcador.bindPopup(`
      <strong>${p.lugar}</strong><br>
      <button onclick="intervenirLugar('${p.lugar}', ${p.clave})">📌 Intervenir</button>
    `);
    marcador.addTo(grupoMarcadores);
  });
}

// 🔍 Botón de intervención narrativa
function intervenirLugar(lugar, esClave) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  if (!esClave) {
    panel.innerHTML = `
      <div class="contenedor-pistas">
        <h3>🕵️ Sin pistas relevantes</h3>
        <p>${lugar} no muestra indicios claves. Chambot recomienda seguir investigando.</p>
      </div>`;
    return;
  }

  escribirMaquina(`
🏃 Se inicia la persecución...
🛰️ Ruidos detectados cerca del río...
🎯 ¿Negra Yan o Viuda Negra?`, "mensajePanel", 35, mostrarDecisionFinal);
}

// 🎯 Botones de elección
function mostrarDecisionFinal() {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML += `
    <div class="contenedor-pistas">
      <h3>⚖️ ¿Quién es la culpable?</h3>
      <button onclick="resolverCaso('Viuda Negra')">🎯 Viuda Negra</button>
      <button onclick="resolverCaso('Negra Yan')">🛑 Negra Yan</button>
    </div>`;
}

// ✅ Resolución del caso
function resolverCaso(nombre) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  let mensaje = "";
  if (nombre === "Viuda Negra") {
    mensaje = `🎉 Sospechosa capturada.\n🔐 Caso resuelto con éxito.\n🎖️ ¡Bien hecho, detective!`;
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
  } else {
    mensaje = `❌ Sospechosa equivocada.\n⚠️ El verdadero criminal ha escapado.\n🧠 La misión sigue abierta.`;
  }

  escribirMaquina(mensaje, "mensajePanel", 35);
}

// ✍️ Máquina de escribir
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

// 🧠 Activación de misión desde Chambot
function aceptarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("panelBotones").style.display = "block";
  document.getElementById("mensajePanel").textContent =
    "🧠 Misión iniciada. Selecciona una zona para investigar.";
}

function rechazarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("mensajePanel").textContent =
    "📁 Misión rechazada. Puedes regresar más tarde.";
}

function mostrarPistas() {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = `
    <div class="contenedor-pistas">
      <h3>🧩 Pistas activas</h3>
      <p>Departamento asignado: León</p>
      <p>⚠️ Se ha reportado actividad inusual en tres zonas clave:</p>
      <ul>
        <li>📍 Parque Central</li>
        <li>🛒 Mercado</li>
        <li>🏛️ Iglesia principal</li>
      </ul>
      <p>👣 Rastree los puntos marcados para confirmar presencia del sospechoso.</p>
    </div>`;
}




