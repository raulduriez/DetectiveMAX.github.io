// 🤖 Muestra el panel del Chambot al cargar (activado desde core.js)

// ✅ Si el jugador acepta la misión
function aceptarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("panelBotones").style.display = "block";
  iniciarMapa();
  mostrarResumen();
  mostrarPista();
}

// ❌ Si el jugador rechaza la misión
function rechazarMision() {
  document.getElementById("chatBotMision").style.display = "none";
  document.getElementById("mensajePanel").textContent =
    "🕯️ Has rechazado la misión. El manuscrito se pierde en la historia.";
}

// 🧩 Botón: Mostrar pista actual y anteriores
function mostrarPistas() {
  mostrarPista();
}

// 🗺️ Botón: Activar panel de viaje
function mostrarViaje() {
  activarViaje();
}

// 📁 Botón: Mostrar carpeta criminal
function mostrarCriminales() {
  document.getElementById("mensajePanel").innerHTML = `
    <div class="contenedor-pistas">
      <h3>📁 Carpeta criminal</h3>
      <ul>
        <li>🧤 Viuda Negra: sospechosa en Matagalpa</li>
        <li>🎭 Negra Yan: vista en Masaya</li>
        <li>🧥 Testigo anónimo: apareció en León</li>
      </ul>
      <p>👣 Rastrea los lugares clave para confirmar vínculos.</p>
    </div>`;
}

