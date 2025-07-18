
// 📌 Intervención narrativa en el lugar investigado
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

// ⚖️ Presenta al jugador la decisión final
function mostrarDecisionFinal() {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML += `
    <div class="contenedor-pistas">
      <h3>⚖️ ¿Quién es la culpable?</h3>
      <button onclick="resolverCaso('Viuda Negra')">🎯 Viuda Negra</button>
      <button onclick="resolverCaso('Negra Yan')">🛑 Negra Yan</button>
    </div>`;
}

// ✅ Resuelve el caso, ajusta progreso y tiempo
function resolverCaso(nombre) {
  const panel = document.getElementById("mensajePanel");
  panel.innerHTML = "";

  let mensaje = "";
  if (
    (pistaActual === 1 && nombre === "Viuda Negra") ||
    (pistaActual === 2 && nombre === "Negra Yan") ||
    (pistaActual === 3 && nombre === "Viuda Negra")
  ) {
    mensaje = `🎉 Sospechosa capturada.\n🔐 Caso resuelto con éxito.\n🎖️ ¡Bien hecho, detective!`;
    progresoCaso++;
    pistaActual++;
    casosResueltos++;
    localStorage.setItem("casosResueltos", casosResueltos);
    mostrarResumen();
  } else {
    mensaje = `❌ Sospechosa equivocada.\n⚠️ El verdadero criminal ha escapado.\n🧠 La misión sigue abierta.`;
    tiempoRestante -= 90;
    mostrarResumen();
  }

  escribirMaquina(mensaje, "mensajePanel", 35);
}
