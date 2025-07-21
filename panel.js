function aceptarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("panelBotones").style.display = "block";
  iniciarMapa();
  mostrarResumen();

  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;

  // Ocultar el botón de pistas si estamos en Matagalpa
  if (pistaActual === 3) {
    const botonPistas = document.querySelector("button[onclick='mostrarPistas()']");
    if (botonPistas) botonPistas.style.display = "none";
  }

  mostrarPistasNarrativa(); // ← Solo tiene efecto en pistas 1 y 2
}

function rechazarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("mensajePanel").textContent =
    "🕯️ Has rechazado la misión. El manuscrito cultural se desvanece entre sombras...";
}

function mostrarPistas() {
  if (typeof mostrarPistasNarrativa === "function") {
    mostrarPistasNarrativa();
  } else {
    document.getElementById("mensajePanel").textContent =
      "⚠️ No se pudieron cargar las pistas. Revisa narrativa.js.";
  }
}

function mostrarViaje() {
  if (typeof activarViaje === "function") {
    activarViaje();
  } else {
    document.getElementById("mensajePanel").textContent =
      "⚠️ No se pudo activar la función de viaje. Revisa viaje.js.";
  }
}

function mostrarCriminales() {
  document.getElementById("mensajePanel").innerHTML = `
    <div class="contenedor-pistas">
      <h3>📁 Carpeta criminal</h3>
      <ul>
        <li>🧤 Viuda Negra — sospechosa activa en Matagalpa</li>
        <li>🎭 Negra Yan — vista en Masaya con objetos robados</li>
        <li>🧥 Testigo anónimo — mencionó trajes folklóricos en León</li>
      </ul>
      <p>👣 Rastrea los lugares marcados para confirmar vínculos narrativos.</p>
    </div>`;
}

function reiniciarMision() {
  if (confirm("🧹 ¿Seguro que quieres reiniciar el caso desde cero?")) {
    localStorage.setItem("pistaActual", 1);
    localStorage.setItem("casosResueltos", 0);
    localStorage.setItem("tiempoRestante", 4320);
    location.reload();
  }
}


