// 🚀 Activa botón "Viajar"
function activarViaje() {
  document.getElementById("mensajePanel").innerHTML =
    "🧭 Elige un destino:<br>" +
    `<button onclick="viajarA('León')">Ir a León</button><br>` +
    `<button onclick="viajarA('Masaya')">Ir a Masaya</button><br>` +
    `<button onclick="viajarA('Matagalpa')">Ir a Matagalpa</button>`;
}

// 📍 Lógica de viaje y penalización
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

// 🗺️ Agrega puntos investigativos en cada destino
function agregarMarcadores(departamento) {
  const lugares = {
    "León": [
      { lugar: "Parque Central", coords: [12.436, -86.879], clave: true },
      { lugar: "Mercado", coords: [12.438, -86.881], clave: false },
      { lugar: "Iglesia", coords: [12.434, -86.877], clave: false }
    ],
    "Masaya": [
      { lugar: "Plaza de Artesanías", coords: [11.976, -86.090], clave: true },
      { lugar: "Mercado", coords: [11.978, -86.088], clave: false }
    ],
    "Matagalpa": [
      { lugar: "Casa Rubén Darío", coords: [13.002, -85.914], clave: true },
      { lugar: "Parque", coords: [13.003, -85.912], clave: false }
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

// 🧭 Información turística opcional
function mostrarInfoTuristica(depto) {
  const datos = {
    "León": "📚 León: ciudad universitaria, arte y patrimonio colonial.",
    "Masaya": "🎭 Masaya: tierra de artesanos, máscaras y volcanes.",
    "Matagalpa": "🌄 Matagalpa: frescura, poesía y café en la montaña."
  };
  document.getElementById("mensajePanel").innerHTML +=
    `<div class='contenedor-pistas'>${datos[depto] || ""}</div>`;
}

function viajarA(destino) {
  console.log("🧭 Viajando a:", destino);
  ...
}

