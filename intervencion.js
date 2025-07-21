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

function intervenirLugar(lugar, esClave) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;

  if (!esClave) {
    panel.innerHTML = `
      <div class="contenedor-pistas">
        <h3>🕵️ Sin pistas relevantes</h3>
        <p>${lugar} no muestra indicios claves.</p>
      </div>`;
    return;
  }

  if (pistaActual < 3) {
    mostrarSugerenciaDeViaje(pistaActual);
  } else {
    escribirMaquina(
      `🏃 Se inicia la persecución...
🛰️ Ruidos detectados cerca del río...
🎯 ¿Negra Yan o Viuda Negra?`,
      "mensajePanel",
      35,
      mostrarDecisionFinal
    );
  }
}

function mostrarSugerenciaDeViaje(pistaActual) {
  const panel = document.getElementById("mensajePanel");
  const narrativa = narrativaJuego.find(n => n.pista === pistaActual);
  const opciones = ["León", "Masaya", "Matagalpa"];

  panel.innerHTML = `
    <div class="contenedor-pistas">
      <h3>🧭 ¿A dónde deseas viajar ahora?</h3>
      <p>Elige según las pistas y decide tu próximo destino.</p>
      ${opciones.map(d => `
        <button onclick="decidirDestino('${d}', '${narrativa.destinoCorrecto}')">
          🚀 Viajar a ${d}
        </button>`).join("")}
    </div>`;
}

function decidirDestino(elegido, destinoCorrecto) {
  let pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  let tiempoRestante = parseInt(localStorage.getItem("tiempoRestante")) || 4320;
  const panel = document.getElementById("mensajePanel");

  if (elegido === destinoCorrecto) {
    panel.innerHTML = `
      <div class="contenedor-pistas">
        <h3>✅ Decisión correcta</h3>
        <pNo pierdes tiempo. Continúas tu investigación.</p>
      </div>`;
  } else {
    tiempoRestante -= 30;
    localStorage.setItem("tiempoRestante", tiempoRestante);
    panel.innerHTML = `
      <div class="contenedor-pistas">
        <h3>⛔ Desvío narrativo</h3>
        <p>Decisión incorrecta. Pierdes 30 minutos.</p>
      </div>`;
  }

  pistaActual++;
  localStorage.setItem("pistaActual", pistaActual);
  setTimeout(mostrarResumen, 1000);
}

function mostrarDecisionFinal() {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML += `
    <div class="contenedor-pistas">
      <h3>⚖️ ¿Quién es la culpable?</h3>
      <button onclick="resolverCaso('Viuda Negra')">🎯 Viuda Negra</button>
      <button onclick="resolverCaso('Negra Yan')">🛑 Negra Yan</button>
    </div>`;
}

function resolverCaso(nombre) {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 3;
  const narrativa = narrativaJuego.find(n => n.pista === pistaActual);
  const panel = document.getElementById("mensajePanel");

  const acierto = narrativa?.culpableCorrecta === nombre;
  let mensaje = acierto
    ? "🎉 Sospechosa capturada. Caso cerrado con éxito."
    : "❌ Sospechosa equivocada. El caso se complica.";

  if (acierto) {
    let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
  } else {
    let tiempoRestante = parseInt(localStorage.getItem("tiempoRestante")) || 4320;
    tiempoRestante -= 90;
    localStorage.setItem("tiempoRestante", tiempoRestante);
  }

  escribirMaquina(mensaje, "mensajePanel", 35, mostrarResumen);
}
