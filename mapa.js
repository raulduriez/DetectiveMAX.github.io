let map;
let pistaActual = 1;
let tiempoRestante = 4320;
let progresoCaso = 0;
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;
let grupoMarcadores = L.layerGroup();

window.onload = () => {
  document.getElementById("chatBotMision").style.display = "block";
};

function aceptarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("panelBotones").style.display = "block";
  iniciarMapa();
  mostrarResumen();
  mostrarPista();
}

function rechazarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("mensajePanel").textContent =
    "🕯️ Has rechazado la misión. El manuscrito se pierde en la historia.";
}

function iniciarMapa() {
  map = L.map("map").setView([12.8654, -85.2072], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
  }).addTo(map);
  grupoMarcadores.addTo(map);
}

function mostrarResumen() {
  const horas = Math.floor(tiempoRestante / 60);
  const minutos = tiempoRestante % 60;
  document.getElementById("resumenJugador").textContent =
    `🧠 Misión activa | Pista ${pistaActual}/3 | Tiempo: ${horas}h ${minutos}min`;
  verificarTiempo();
}

function verificarTiempo() {
  if (tiempoRestante <= 0) {
    alert("🕯️ El tiempo se agotó. El objeto se perdió.");
    document.getElementById("mensajePanel").textContent =
      "⏳ Has fallado. El expediente queda sin cerrar.";
    grupoMarcadores.clearLayers();
  }
}

function mostrarPista() {
  const pistas = [
    "🧠 Pista 1:\nVisto en el parque de León. Habló de trajes folklóricos.",
    "🧠 Pista 2:\nEl comprador esperaba en Masaya entre máscaras.",
    "🧠 Pista 3:\nLa Viuda Negra frecuenta la Casa Rubén Darío en Matagalpa."
  ];

  let html = "<div class='contenedor-pistas'>";
  pistas.slice(0, pistaActual).forEach((p, i) => {
    html += `<div class='pista-item'><strong>Pista ${i + 1}</strong><br>${p}</div><hr>`;
  });
  html += "</div>";
  document.getElementById("mensajePanel").innerHTML = html;
}

function activarViaje() {
  document.getElementById("mensajePanel").innerHTML =
    "🧭 Elige un destino:<br>" +
    `<button onclick="viajarA('León')">Ir a León</button><br>` +
    `<button onclick="viajarA('Masaya')">Ir a Masaya</button><br>` +
    `<button onclick="viajarA('Matagalpa')">Ir a Matagalpa</button>`;
}

function viajarA(destino) {
  grupoMarcadores.clearLayers();
  map.setView(coordenadasDepartamento(destino), 13);
  document.getElementById("reporteNarrativo").textContent = `📍 Has llegado a ${destino}`;

  if (!esCorrecto(destino)) {
    tiempoRestante -= 60;
    alert("⛔ Departamento incorrecto. -1 hora ficticia.");
    mostrarResumen();
  }

  agregarMarcadores(destino);
  mostrarInfoTuristica(destino);
}

function coordenadasDepartamento(depto) {
  const coords = {
    "León": [12.436, -86.879],
    "Masaya": [11.976, -86.090],
    "Matagalpa": [13.002, -85.914]
  };
  return coords[depto] || [12.8654, -85.2072];
}

function esCorrecto(depto) {
  return (pistaActual === 1 && depto === "León") ||
         (pistaActual === 2 && depto === "Masaya") ||
         (pistaActual === 3 && depto === "Matagalpa");
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

function intervenirLugar(nombre, esClave) {
  let narrativa = "";

  // LEÓN
  if (nombre === "Parque Central") {
    narrativa = `📖 El sospechoso hojeaba un libro sobre máscaras artesanales.
🧠 El lugar está vinculado a la primera obra poética de Rubén Darío.
🤖 Chambot: “No todos los lectores son inocentes. Algunos buscan inspiración para ocultarse.”`;
  } else if (nombre === "Iglesia") {
    narrativa = `🎭 Una figura con velo negro dejó caer una máscara al bajar las escaleras.
🧠 Se dice que aquí nació la idea de un poema sobre la dualidad del alma.
🤖 Chambot: “La máscara no oculta el pasado. Solo lo transforma.”`;
  } else if (nombre === "Mercado" && pistaActual === 1) {
    narrativa = `🐀 Una máscara del Macho Ratón fue encontrada cerca de una tumba ilustre.
🧠 La delincuente murmuró que viajaría donde las máscaras cobran vida.
🤖 Chambot: “Cuando el arte se convierte en disfraz, el crimen se vuelve teatro.”`;
  }

  // MASAYA
  else if (nombre === "Parque" && pistaActual === 2) {
    narrativa = `🔥 En una zona marcada por la historia de resistencia, se detectó movimiento sospechoso.
🧠 El barrio fue escenario de sacrificios por la liberación en 1979.
🤖 Chambot: “He capturado una imagen con la cámara espía. Es ella... la Viuda Negra.”`;
  } else if (nombre === "Mercado" && pistaActual === 2) {
    narrativa = `🎨 Entre artesanías y máscaras, se registró una transacción inusual.
🧠 El satélite detectó la compra de una máscara del Macho Ratón.
🤖 Chambot: “La máscara no es solo adorno. Es identidad encubierta.”`;
  } else if (nombre === "Iglesia" && pistaActual === 2) {
    narrativa = `🚌 En la terminal de buses, se observó a la sospechosa abordando un vehículo blanco.
🧠 No se identificó la ruta, pero se escuchó que se dirige al lugar donde nació el poeta universal.
🤖 Chambot: “El rastro se aleja... pero la poesía podría revelarnos el destino.”`;
  }

  // MATAGALPA
  else if (nombre === "Parque" && pistaActual === 3) {
    narrativa = `🌳 El parque central de Matagalpa tiene más de 80 años de historia.
🛰️ Chambot detectó a la Viuda Negra bajando de un vehículo… pero también a otra figura: la Negra Yan.
🎒 Ambas llevaban el mismo bolso y dieron la misma dirección al taxista: “Casa Museo, ciudad de Darío”.
🤖 Chambot: “Dos sombras, un destino. ¿Cuál es real?”`;
  } else if (nombre === "Casa Rubén Darío" && pistaActual === 3) {
    narrativa = `🏠 Ciudad Darío, con más de 300 mil habitantes, es tierra de cultivos y poesía.
📜 En la casa natal del poeta se encuentra el código oculto en su poema.
⚠️ ¡Peligro! El mensaje está por revelarse. Hay que actuar.
🤖 Chambot: “Detective, el momento ha llegado. ¿A quién vas a arrestar?”`;

    document.getElementById("mensajePanel").innerHTML =
      `<div class='contenedor-pistas'>
        <pre>${narrativa}</pre><br>
        <button onclick="resolverCaso('Viuda Negra')">🚨 Arrestar a Viuda Negra</button><br>
        <button onclick="resolverCaso('Negra Yan')">🚨 Arrestar a Negra Yan</button>
      </div>`;
    return;
  } else if (nombre === "Mercado" && pistaActual === 3) {
    narrativa = `📦 El detective ha solicitado la orden de captura.
🤖 Chambot: “La decisión está en tus manos. El archivo se cerrará según tu elección.”`;
  }

  if (esClave) {
    tiempoRestante += 30;
    alert("📍 Rastros encontrados.");
    pistaActual++;
    mostrarResumen();

    if (pistaActual <= 3) {
      document.getElementById("mensajePanel").innerHTML =
        `<div class='contenedor-pistas'><pre>${narrativa}</pre></div>`;
    }
  } else {
    tiempoRestante -= 45;
    alert("❌ Lugar equivocado. -45 min.");
    mostrarResumen();
  }
}

//parte3

function resolverCaso(nombre) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  let mensaje = "🏃 Se inicia la persecución...\n";
  mensaje += "🛰️ Desde el satélite se escuchan disparos cerca del río...\n";

  let resultado = "";

  if (nombre === "Viuda Negra") {
    mensaje += "🎉 La sospechosa ha sido capturada.\n";
    mensaje += "🤖 Chambot: Felicidades, detective. Ha capturado a una jefa de una peligrosa banda.\n";
    mensaje += "🎖️ Con tres casos más, su ascenso será inevitable.\n";

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
    mensaje += "❌ Se ha arrestado al sospechoso equivocado.\n";
    mensaje += "🤖 Chambot: El verdadero criminal ha escapado entre la multitud.\n";
    mensaje += "📁 El archivo queda abierto. Pero no se rinda, detective. El rastro aún respira.\n";

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
//parte 4

function obtenerRango(casos) {
  if (casos <= 3) return "🎖️ Novato";
  else if (casos <= 6) return "🔎 Inspector";
  else if (casos <= 9) return "🕵️ Detective";
  else if (casos <= 12) return "👮 Subcomandante";
  else if (casos <= 15) return "📡 Comandante";
  else return "🌟 Comandante General";
}

function mostrarCriminales() {
  document.getElementById("mensajePanel").textContent =
    "📁 Criminales buscados:\n- Sospechoso #1: Visto en Jinotega\n- Sospechoso #2: Vinculado al robo en Granada\n- Sospechoso #3: Apodada la Viuda Negra";
}

function mostrarInfoTuristica(departamento) {
  let html = "<div class='contenedor-turistico'>";

  if (departamento === "León") {
    html += `
      <h3>🏛️ León: Cuna de la Revolución y la poesía</h3>
      <img src="https://whc.unesco.org/uploads/thumbs/site_1236_0001-750-0-20230905145250.jpg" alt="Catedral de León" />
      <p>📜 León es sede de la Catedral más grande de Centroamérica, Patrimonio UNESCO, tierra de Rubén Darío y del deporte extremo: volcano boarding en el Cerro Negro.</p>
      <p>🤖 Chambot: “Los muros coloniales aún guardan secretos de la historia.”</p>
      <p>🎥 <a href="https://www.youtube.com/watch?v=Txg9CIG3m8M" target="_blank">Explorar León en video</a></p>
    `;
  }

  else if (departamento === "Masaya") {
    html += `
      <h3>🎭 Masaya: Artesanías, fuego y folklore</h3>
      <img src="https://www.visitcentroamerica.com/wp-content/uploads/2020/02/masaya-market.jpg" alt="Mercado de Masaya" />
      <p>🎨 Masaya vibra con danzas tradicionales, máscaras, mercados de artesanía y el volcán activo que respira historia. Es el alma cultural de Nicaragua.</p>
      <p>🤖 Chambot: “El tambor retumba, pero también oculta…”</p>
      <p>🎥 <a href="https://www.youtube.com/watch?v=sAg5Cmj07-U" target="_blank">Conocer Masaya en video</a></p>
    `;
  }

  else if (departamento === "Matagalpa") {
    html += `
      <h3>🌄 Matagalpa: Café, cascadas y poesía</h3>
      <img src="https://blog.ilp.org/hs-fs/hubfs/Waterfalls%20Matagalpa.jpg" alt="Cascadas de Matagalpa" />
      <p>☕ Matagalpa ofrece montañas verdes, fincas cafetaleras y la casa natal de Rubén Darío. Es tierra de versos escondidos entre la neblina.</p>
      <p>🤖 Chambot: “Aquí el objeto podría dormir entre hojas y letras mojadas…”</p>
      <p>🎥 <a href="https://www.youtube.com/watch?v=HlIIs6pWnrk" target="_blank">Descubrir Matagalpa en video</a></p>
    `;
  }

  else {
    html += "<p>📍 Información turística no disponible.</p>";
  }

  html += "</div>";
  document.getElementById("mensajePanel").innerHTML = html;
}
analytics.logEvent('intervencion_realizada');
analytics.logEvent('arresto_exitosa');
analytics.logEvent('arresto_fallida');
