const peliculas = [
    { titulo: "Scarface", id: "tt0086250", img: "/iS9Uv9t9ntS6bt3ffOTv99m4bsf.jpg" },
    { titulo: "Cars 1", id: "tt0317219", img: "/abW59qvvyYSTZTYCOOUvdpMgK9j.jpg" },
    { titulo: "Cars 2", id: "tt1216475", img: "/9f9Ew9vVfO78OndIu6763Isk3Dk.jpg" },
    { titulo: "Cars 3", id: "tt3407616", img: "/9pM6C91D45R0U64fHjT22FvWwA5.jpg" },
    { titulo: "DB Super: Broly", id: "tt7961032", img: "/f0NUXUbCq9I2vD6vMGp0pYpM6JF.jpg" }
];

const series = [
    { titulo: "Los Simpson", id: "tt0096697", img: "/gzB97AmSbtG7S7p7mGFTdn9vX6L.jpg" },
    { titulo: "Futurama", id: "tt0149460", img: "/799rXp08p5Xv8X8V6B9vX9V6B9v.jpg" },
    { titulo: "Dragon Ball Z", id: "tt0121955", img: "/6Xp9fXv8X8V6B9vX9V6B9vX9V6B.jpg" }
];

function cargarContenido(lista, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => abrirReproductor(item.id, tipo);
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.img}" onerror="this.src='https://via.placeholder.com/500x750?text=Cargando...'">
            <div class="card-info">${item.titulo}</div>
        `;
        contenedor.appendChild(card);
    });
}

function abrirReproductor(id, tipo) {
    const iframe = document.getElementById('iframe-video');
    // Servidor 1: Optimizado para Latino/Multi-idioma
    iframe.src = `https://vidsrc.pro/embed/${tipo}/${id}`; 
    document.getElementById('modal-repro').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cambiarServer(n) {
    const iframe = document.getElementById('iframe-video');
    // n=1 usa vidsrc.pro, n=2 usa embed.su como respaldo
    const url = n === 1 ? `https://vidsrc.pro/embed/${currentType}/${currentId}` : `https://embed.su/embed/${currentType}/${currentId}`;
    iframe.src = url;
}

function cerrarModal() {
    document.getElementById('modal-repro').style.display = 'none';
    document.getElementById('iframe-video').src = '';
    document.body.style.overflow = 'auto';
}

cargarContenido(peliculas, 'grid-peliculas', 'movie');
cargarContenido(series, 'grid-series', 'tv');
