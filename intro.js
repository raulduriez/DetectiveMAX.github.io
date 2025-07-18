let aliasJugador = "";
let casosResueltos = parseInt(localStorage.getItem("casosResueltos")) || 0;

// ✅ Se ejecuta al cargar la página
window.onload = () => {
  aliasJugador = localStorage.getItem("aliasDetective") || "";
  actualizarRango();
  mostrarCredencialDetective();
};

// ✅ Guarda el alias ingresado por el jugador
function guardarRegistro() {
  aliasJugador = document.getElementById("alias").value.trim() || "Sin alias";
  localStorage.setItem("aliasDetective", aliasJugador);
  actualizarRango();
}

// ✅ Determina el rango según número de casos resueltos
function obtenerRango(casos) {
  if (casos <= 3) return "🎖️ Novato";
  else if (casos <= 6) return "🔎 Inspector";
  else if (casos <= 9) return "🕵️ Detective";
  else if (casos <= 12) return "👮 Subcomandante";
  else if (casos <= 15) return "📡 Comandante";
  else return "🌟 Comandante General";
}

// ✅ Actualiza el panel de rango actual
function actualizarRango() {
  const rango = obtenerRango(casosResueltos);
  document.getElementById("rangoJugador").textContent = rango;
}

// ✅ Muestra una animación estilo credencial detectivesca
function mostrarCredencialDetective() {
  const aliasVisible = aliasJugador || "Detective sin registro";
  const rangoActual = obtenerRango(casosResueltos);
  const mensaje = `
🪪 Validando identidad...
🔓 Perfil reconocido: ${aliasVisible}
🧠 Rango actual: ${rangoActual}
📡 Accediendo al centro de inteligencia...`;
  escribirMaquina(mensaje, "mensajeMaquina", 40);
}

// ✅ Inicia la narrativa y prepara transición hacia mapa.html
function iniciarJuego() {
  aliasJugador = document.getElementById("alias").value.trim() || "Sin alias";
  localStorage.setItem("aliasDetective", aliasJugador);
  actualizarRango();

  const rangoActual = obtenerRango(casosResueltos);
  const mensaje = `
🤖 Chambot activado...

Se ha reportado el robo de un objeto invaluable:
📦 Manuscrito original de la “Carta de los Vientos”.

🧠 Tu misión, detective ${aliasJugador} (${rangoActual}),
es recuperar el objeto antes de que pasen 72 horas ficticias (4320 minutos).

Presiona el botón para iniciar tu expedición.`;

  escribirMaquina(mensaje, "mensajeMaquina", 35, mostrarBotonContinuar);
}

// ✅ Efecto máquina de escribir con callback opcional
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

// ✅ Botón para continuar hacia el mapa
function mostrarBotonContinuar() {
  const btn = document.createElement("button");
  btn.textContent = "🚀 Continuar misión";
  btn.className = "boton-jugar";
  btn.onclick = () => window.location.href = "mapa.html";
  const destino = document.getElementById("mensajeMaquina");
  destino.appendChild(document.createElement("br"));
  destino.appendChild(btn);
}


