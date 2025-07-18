let aliasJugador = "";
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;

window.onload = () => {
  aliasJugador = localStorage.getItem("aliasDetective") || "";
  actualizarRango();
};

function guardarRegistro() {
  aliasJugador = document.getElementById("alias").value || "Sin alias";
  localStorage.setItem("aliasDetective", aliasJugador);
  actualizarRango();
}

function obtenerRango(casos) {
  if (casos <= 3) return "🎖️ Novato";
  else if (casos <= 6) return "🔎 Inspector";
  else if (casos <= 9) return "🕵️ Detective";
  else if (casos <= 12) return "👮 Subcomandante";
  else if (casos <= 15) return "📡 Comandante";
  else return "🌟 Comandante General";
}

function actualizarRango() {
  const rango = obtenerRango(casosResueltos);
  document.getElementById("rangoJugador").textContent = rango;
}

function iniciarJuego() {
  aliasJugador = document.getElementById("alias").value || "Sin alias";
  localStorage.setItem("aliasDetective", aliasJugador);
  actualizarRango();

  const rangoActual = obtenerRango(casosResueltos);
  const mensaje = `🤖 Chambot activado...

Se ha reportado el robo de un objeto invaluable:
📦 Manuscrito original de la “Carta de los Vientos”.

🧠 Tu misión, detective ${aliasJugador} (${rangoActual}),
es recuperar el objeto antes de que pasen 72 horas ficticias (4320 minutos).

Presiona el botón para iniciar tu expedición.`;

  escribirMaquina(mensaje, "mensajeMaquina", 35, mostrarBotonContinuar);
}

function escribirMaquina(texto, idElemento, velocidad, callback) {
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

function mostrarBotonContinuar() {
  const btn = document.createElement("button");
  btn.textContent = "🚀 Continuar misión";
  btn.className = "boton-jugar";
  btn.onclick = () => window.location.href = "mapa.html";
  document.getElementById("mensajeMaquina").appendChild(document.createElement("br"));
  document.getElementById("mensajeMaquina").appendChild(btn);
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
function resolverCaso(nombre) {
  let mensaje = "";
  let finalHTML = "";

  mensaje += "🏃 Se inicia la persecución...\n";
  mensaje += "🛰️ Desde el satélite se escuchan disparos cerca del río...\n";

  if (nombre === "Viuda Negra") {
    mensaje += "🎉 La sospechosa ha sido capturada.\n";
    mensaje += "🤖 Chambot: Felicidades, detective. Ha capturado a una jefa de una peligrosa banda.\n";
    mensaje += "🎖️ Con tres casos más, su ascenso será inevitable.\n";

    progresoCaso++;
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
    verificarAscenso();

    finalHTML = `
      <div class='contenedor-pistas'>
        <h3>🌟 Caso resuelto</h3>
        <p>La Viuda Negra ha sido capturada.</p>
        <p>📁 El archivo se cierra con éxito. Felicitaciones, detective.</p>
      </div>`;
  } else {
    mensaje += "❌ Se ha arrestado al sospechoso equivocado.\n";
    mensaje += "🤖 Chambot: El verdadero criminal ha escapado entre la multitud.\n";
    mensaje += "📁 El archivo queda abierto. Pero no se rinda, detective. El rastro aún respira.\n";

    finalHTML = `
      <div class='contenedor-pistas'>
        <h3>🕯️ Error de juicio</h3>
        <p>La Viuda Negra ha escapado. El caso queda inconcluso.</p>
        <p>📁 El archivo sigue abierto. Puede volver a intentarlo.</p>
      </div>`;
  }

  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = ""; // Limpia antes de escribir
  escribirMaquina(mensaje, "mensajePanel", 35, () => {
    panel.innerHTML += finalHTML;
    mostrarResumen();
  });
}
