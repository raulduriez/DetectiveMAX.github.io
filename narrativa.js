// 📜 Muestra las pistas según la progresión
function mostrarPista() {
  const pistas = [
    "🧠 Pista 1:\nVisto en el parque de León. Habló de trajes folklóricos.",
    "🧠 Pista 2:\nEl comprador esperaba en Masaya entre máscaras.",
    "🧠 Pista 3:\nLa Viuda Negra frecuenta la Casa Rubén Darío en Matagalpa."
  ];

  let html = "<div class='contenedor-pistas'>";
  pistas.slice(0, pistaActual).forEach((p, i) => {
    html += `<div class='pista-item'><strong>Pista ${i + 1}</strong><br>${p}</div><hr>`;
  });
  html += "</div>";
  document.getElementById("mensajePanel").innerHTML = html;
}

// ⌨️ Efecto máquina de escribir para textos narrativos
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

