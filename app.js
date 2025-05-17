// Cargar catálogo y mostrar casas
fetch('catalogo.json')
  .then(res => res.json())
  .then(data => mostrarCasas(data));

function mostrarCasas(catalogo) {
  const lista = document.getElementById('house-list');
  lista.innerHTML = '';
  catalogo.forEach(casa => {
    const card = document.createElement('div');
    card.className = 'house-card';
    card.innerHTML = `
      <img src="${casa.imagen}" alt="${casa.nombre}">
      <div class="house-card-content">
        <h2>${casa.nombre}</h2>
        <p><strong>Precio:</strong> $${casa.precio.toLocaleString()}</p>
        <p>${casa.descripcion}</p>
        <button onclick="verDetalle(${casa.id})">Ver más</button>
      </div>
    `;
    lista.appendChild(card);
  });
  // Guardar catálogo en window para acceso global
  window._catalogo = catalogo;
}

window.verDetalle = function(id) {
  const casa = window._catalogo.find(c => c.id === id);
  const detalle = document.getElementById('house-detail');
  let youtubeBtn = '';
  if (casa.youtube && casa.youtube.trim() !== '') {
    youtubeBtn = `<a href="${casa.youtube}" target="_blank" class="youtube-link">Ver video <img src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' style='height:1em;vertical-align:middle;margin-left:4px;'></a>`;
  }
  detalle.innerHTML = `
    <button class="close-btn" onclick="cerrarDetalle()">&times;</button>
    <img src="${casa.imagen}" alt="${casa.nombre}">
    <h2>${casa.nombre}</h2>
    <p><strong>Precio:</strong> $${casa.precio.toLocaleString()}</p>
    <p>${casa.descripcion}</p>
    <a href="${casa.pdf}" target="_blank" class="pdf-link">Ver ficha técnica (PDF)</a>
    ${youtubeBtn}
  `;
  detalle.classList.add('visible');
  detalle.classList.remove('hidden');
  window.scrollTo({ top: detalle.offsetTop - 20, behavior: 'smooth' });
}

window.cerrarDetalle = function() {
  const detalle = document.getElementById('house-detail');
  detalle.classList.remove('visible');
  detalle.classList.add('hidden');
} 