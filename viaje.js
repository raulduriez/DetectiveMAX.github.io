function activarViaje() {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  const narrativa = narrativaJuego.find(n => n.pista === pistaActual);
  if (!narrativa) return;

  const depto = narrativa.departamento;

  document.getElementById("mensajePanel").innerHTML = `
    <div class="contenedor-pistas">
      <h3>🧭 Departamento activo</h3>
      <p>🚍 ¿Deseas viajar a <strong>${depto}</strong> para investigar pistas?</p>
      <button onclick="viajarA('${depto}')">✅ Sí, viajar a ${depto}</button>
    </div>`;
}

function esDestinoCorrecto(depto) {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  const narrativa = narrativaJuego.find(n => n.pista === pistaActual);
  return narrativa?.departamento === depto;
}

function viajarA(destino) {
  let tiempoRestante = parseInt(localStorage.getItem("tiempoRestante")) || 4320;
  grupoMarcadores.clearLayers();
  mapa.setView(coordenadasDepartamento(destino), 13);
  document.getElementById("reporteNarrativo").textContent = `📍 Has llegado a ${destino}`;

  if (!esDestinoCorrecto(destino)) {
    tiempoRestante -= 60;
    localStorage.setItem("tiempoRestante", tiempoRestante);
    alert("⛔ Departamento incorrecto. -1 hora por desvío narrativo.");
    mostrarResumen();
  }

  agregarMarcadores(destino);
}

function coordenadasDepartamento(depto) {
  const coords = {
    "León": [12.436, -86.879],
    "Masaya": [11.976, -86.090],
    "Matagalpa": [13.002, -85.914]
  };
  return coords[depto] || [12.8654, -85.2072];
}

function agregarMarcadores(depto) {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  const narrativa = narrativaJuego.find(n => n.departamento === depto && n.pista === pistaActual);
  if (!narrativa || !narrativa.lugares) return;

  narrativa.lugares.forEach(p => {
    const marcador = L.marker(p.coords);
    marcador.bindPopup(`
      <strong>${p.nombre}</strong><br>
      <button onclick="intervenirLugar('${p.nombre}', ${p.clave})">📌 Intervenir</button>
    `);
    marcador.addTo(grupoMarcadores);
  });
}


