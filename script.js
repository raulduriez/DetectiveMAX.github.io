const message = `
AGENTE DURIEZ — CLASIFICADO NIVEL INSPECTOR

14 de Julio, 2025 — León, Nicaragua

Se ha robado un cuadro original de Rubén Darío.
Sospechosa principal: LA VIUDA.

Amenaza: código oculto que desactiva una bomba de alcance crítico (+2 hectáreas).
Zonas en riesgo: Mercado Central, Cine Real, Escuela Nacional, Iglesia La Merced.

Misión: Operación Verso Letal
Objetivo: Recuperar el cuadro, descifrar el poema y detener a La Viuda.

¿Aceptas la misión?
`;

let i = 0;
const typingSpeed = 40;
const typewriter = document.getElementById("typewriter");
const typingSound = document.getElementById("typingSound");

// Solo comienza cuando el usuario hace clic
document.addEventListener("click", () => {
  typeText();
}, { once: true });

function typeText() {
  if (i < message.length) {
    typewriter.textContent += message.charAt(i);

    typingSound.currentTime = 0;
    typingSound.play().catch(error => {
      console.warn("No se pudo reproducir el sonido:", error.message);
    });

    i++;
    setTimeout(typeText, typingSpeed);
  } else {
    typingSound.pause();              // detiene el sonido
    typingSound.currentTime = 0;     // lo reinicia para futuras escenas
    document.getElementById("options").style.display = "block";
  }
}

function acceptMission() {
  alert("¡Misión aceptada! Preparando tu mapa de León...");
  // Aquí podrías cargar la siguiente escena
  
}

function rejectMission() {
  alert("Has abandonado la brigada... la historia tomará otro rumbo.");
}

function mostrarViajar() {
  ocultarTodos();
  document.getElementById("infoViaje").style.display = "block";
  document.getElementById("infoViaje").innerHTML = `
    🧭 Selecciona el lugar de destino en el mapa. Al llegar, se mostrará una descripción del departamento.
    <br><br>
    <button onclick="viajarA('León')">Ir a León</button>
    <button onclick="viajarA('Granada')">Ir a Granada</button>
  `;
}

function viajarA(destino) {
  localStorage.setItem("departamentoSeleccionado", destino);

  if (destino === "León") {
    alert("📍 Has llegado a León.\nZona popular por movimiento cultural y tránsito interlocal.\nAnaliza los puntos cercanos para buscar indicios.");
    // Aquí podrías activar marcadores o eventos específicos
  }

  document.getElementById("zonaActiva").textContent = destino;
}

function onDeptoClick(e) {
  const nombre = e.target.feature.properties.NAME_1;
  if (nombre === "León") {
    alert("📍 Has llegado a León.\nZona popular por movimiento cultural y tránsito interlocal.\nAnaliza los puntos cercanos para buscar indicios.");
    document.getElementById("zonaActiva").textContent = "León";
  } else {
    alert(`Has llegado a ${nombre}. No hay información relevante en este momento.`);
  }
}

function mostrarPista() {
  document.getElementById("mensajePanel").textContent =
    "🕵️ Pista:\nTestigo asegura que portaba una chaqueta con símbolo antiguo.\nSubió a un interlocal marcado 'Poneloya'.";
}

function activarViaje() {
  document.getElementById("mensajePanel").textContent =
    "🧭 Viajar:\nSelecciona un departamento en el mapa para iniciar tu búsqueda.\nLee su descripción y elige puntos clave.";
}

function mostrarCriminales() {
  document.getElementById("mensajePanel").textContent =
    "📁 Criminales conocidos:\n- Sospechoso #1: Visto en Jinotega.\n- Sospechoso #2: Vinculado al robo en Granada.";
}

