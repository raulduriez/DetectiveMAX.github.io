const narrativaJuego = [
  {
    pista: 1,
    departamento: "León",
    lugares: [
      { nombre: "Parque Central", coords: [12.436, -86.879], clave: true },
      { nombre: "Mercado", coords: [12.438, -86.881], clave: false },
      { nombre: "Iglesia principal", coords: [12.434, -86.877], clave: false }
    ],
    pistas: [
      "📍 Movimiento sospechoso en el Parque Central.",
      "🛒 Venta ilícita reportada en el Mercado.",
      "🏛️ Sin actividad inusual en la Iglesia principal."
    ],
    destinoCorrecto: "Masaya"
  },
  {
    pista: 2,
    departamento: "Masaya",
    lugares: [
      { nombre: "Plaza de Artesanías", coords: [11.976, -86.090], clave: true },
      { nombre: "Mercado Municipal", coords: [11.978, -86.088], clave: false },
      { nombre: "Mirador de Catarina", coords: [11.967, -86.073], clave: false }
    ],
    pistas: [
      "🎭 Sospechosa vista en la Plaza.",
      "🛒 Objetos folklóricos recuperados.",
      "🌄 Actividad normal en el Mirador."
    ],
    destinoCorrecto: "Matagalpa"
  },
  {
    pista: 3,
    departamento: "Matagalpa",
    culpableCorrecta: "Viuda Negra",
    lugares: [
      { nombre: "Casa Rubén Darío", coords: [13.002, -85.914], clave: true },
      { nombre: "Parque Darío", coords: [13.003, -85.912], clave: false },
      { nombre: "Museo del Café", coords: [13.005, -85.916], clave: false }
    ],
    pistas: [
      "🏠 Manuscrito cultural recuperado.",
      "🌳 Huellas recientes en el parque.",
      "☕ Café sin registros sospechosos."
    ]
  }
];

function mostrarPistasNarrativa() {
  const pistaActual = parseInt(localStorage.getItem("pistaActual")) || 1;
  const narrativa = narrativaJuego.find(n => n.pista === pistaActual);
  if (!narrativa || pistaActual === 3) return;

  let html = `<div class="contenedor-pistas">
    <h3>🧩 Pistas activas</h3>
    <p>Departamento actual: <strong>${narrativa.departamento}</strong></p>
    <ul>`;
  narrativa.pistas.forEach(p => html += `<li>${p}</li>`);
  html += `</ul>
    <p>👣 Deduce tu próximo destino antes que el tiempo se agote.</p>
  </div>`;

  document.getElementById("mensajePanel").innerHTML = html;
}
