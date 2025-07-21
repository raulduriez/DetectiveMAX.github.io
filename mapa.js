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
  const panel = document.getElementById("mensajePanel");
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  let depto = pistaActual === 1 ? "León" : pistaActual === 2 ? "Masaya" : "Matagalpa";

  panel.innerHTML = `
    <div class="contenedor-pistas">
      <h3>🧭 Elige destino según pista ${pistaActual}</h3>
      <button onclick="viajarA('${depto}')">🚍 Viajar a ${depto}</button>
    </div>`;
}

function viajarA(depto) {
  grupoMarcadores.clearLayers();
  mapa.setView(coordenadasDepartamento(depto), 13);
  document.getElementById("reporteNarrativo").textContent = `📍 ${depto} activado`;
  agregarMarcadores(depto);
}

// 📁 Botón de "Criminales"
function mostrarCriminales() {
  document.getElementById("mensajePanel").innerHTML = `
    <div class="contenedor-pistas">
      <h3>📁 Base criminal</h3>
      <ul>
        <li>🧤 Viuda Negra: vista en Masaya</li>
        <li>🎭 Negra Yan: sospechosa en León</li>
      </ul>
    </div>`;
}

// 📌 Crea marcadores con botones de intervención
function agregarMarcadores(departamento) {
  const lugares = {
    "León": [
      { lugar: "Parque Central", coords: [12.436, -86.879], clave: true },
      { lugar: "Mercado", coords: [12.438, -86.881], clave: false },
      { lugar: "Iglesia principal", coords: [12.434, -86.877], clave: false }
    ],
    "Masaya": [
      { lugar: "Plaza de Artesanías", coords: [11.976, -86.090], clave: true },
      { lugar: "Mercado Municipal", coords: [11.978, -86.088], clave: false },
      { lugar: "Mirador de Catarina", coords: [11.967, -86.073], clave: false }
    ],
    "Matagalpa": [
      { lugar: "Casa Rubén Darío", coords: [13.002, -85.914], clave: true },
      { lugar: "Parque Darío", coords: [13.003, -85.912], clave: false },
      { lugar: "Museo del Café", coords: [13.005, -85.916], clave: false }
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

// 🔍 Intervención narrativa
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

// 🎯 Botones de decisión
function mostrarDecisionFinal() {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML += `
    <div class="contenedor-pistas">
      <h3>⚖️ ¿Quién es la culpable?</h3>
      <button onclick="resolverCaso('Viuda Negra')">🎯 Viuda Negra</button>
      <button onclick="resolverCaso('Negra Yan')">🛑 Negra Yan</button>
    </div>`;
}

// ✅ Resolución y avance
function resolverCaso(nombre) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;

  let acierto =
    (pistaActual === 1 && nombre === "Viuda Negra") ||
    (pistaActual === 2 && nombre === "Negra Yan") ||
    (pistaActual === 3 && nombre === "Viuda Negra");

  let mensaje = acierto
    ? "🎉 Sospechosa capturada.\n🔐 Caso resuelto con éxito.\n🎖️ ¡Bien hecho, detective!"
    : "❌ Sospechosa equivocada.\n⚠️ El verdadero criminal ha escapado.\n🧠 La misión sigue abierta.";

  if (acierto) {
    const nuevaPista = pistaActual + 1;
    localStorage.setItem("pistaActual", nuevaPista);
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
  }

  escribirMaquina(mensaje, "mensajePanel", 35, mostrarPistas);
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

// 🧠 Misión desde Chambot
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

// 🧩 Mostrar pistas activas según pistaActual real
function mostrarPistas() {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  const panel = document.getElementById("mensajePanel");
  let pistas = "";

  if (pistaActual === 1) {
    pistas = `
      <p>Departamento asignado: León</p>
      <ul>
        <li>📍 Parque Central</li>
        <li>🛒 Mercado</li>
        <li>🏛️ Iglesia principal</li>
      </ul>`;
  } else if (pistaActual === 2) {
    pistas = `
      <p>Departamento asignado: Masaya</p>
      <ul>
        <li>🎭 Plaza de Artesanías</li>
        <li>🛒 Mercado Municipal</li>
        <li>🌄 Mirador de Catarina</li>
      </ul>`;
  } else if (pistaActual === 3) {
    pistas = `
      <p>Departamento asignado: Matagalpa</p>
      <ul>
        <li>🏠 Casa Rubén Darío</li>
        <li>🌳 Parque Darío</li>
        <li>☕ Museo del Café</li>
      </ul>`;
  }

  panel.innerHTML = `
    <div class="contenedor-pistas">
      <h3>🧩 Pistas activas</h3>
      ${pistas}
      <p>👣 Rastree los puntos marcados para confirmar presencia del sospechoso.</p>
    </div>`;
}


console.log("🧠 PistaActual:", localStorage.getItem("pistaActual"));

function coordenadasDepartamento(depto) {
  const coordenadas = {
    "León": [12.436, -86.879],
    "Masaya": [11.976, -86.090],
    "Matagalpa": [13.002, -85.914]
  };
  return coordenadas[depto] || [12.8654, -85.2072]; // Fallback: centro de Nicaragua
}

function reiniciarJuego() {
  localStorage.removeItem("aliasDetective");
  localStorage.removeItem("pistaActual");
  localStorage.removeItem("casosResueltos");
  alert("🧹 Datos borrados. Recarga la página para empezar de cero.");
  location.reload();
}






