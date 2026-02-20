const peliculas = [
    { titulo: "Scarface (Caracortada)", id: "tt0086250", img: "iS9Uv9t9ntS6bt3ffOTv99m4bsf" },
    { titulo: "Cars 1", id: "tt0317219", img: "abW59qvvyYSTZTYCOOUvdpMgK9j" },
    { titulo: "Cars 2", id: "tt1216475", img: "9f9Ew9vVfO78OndIu6763Isk3Dk" },
    { titulo: "Cars 3", id: "tt3407616", img: "9pM6C91D45R0U64fHjT22FvWwA5" },
    { titulo: "Dragon Ball Super: Broly", id: "tt7961032", img: "f0NUXUbCq9I2vD6vMGp0pYpM6JF" },
    { titulo: "Dragon Ball Super: Super Hero", id: "tt14614812", img: "v796S66vS69vS69vS69vS69v" }
];

const series = [
    { titulo: "Los Simpson", id: "tt0096697", img: "gzB97AmSbtG7S7p7mGFTdn9vX6L" },
    { titulo: "Futurama", id: "tt0149460", img: "799rXp08p5Xv8X8V6B9vX9V6B9v" },
    { titulo: "Dragon Ball Z", id: "tt0121955", img: "6Xp9fXv8X8V6B9vX9V6B9vX9V6B" }
];

let currentId = "";
let currentType = "movie";

function cargarContenido(lista, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => abrirReproductor(item.id, tipo);
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${item.img}.jpg" alt="${item.titulo}">
            <div class="card-info">${item.titulo}</div>
        `;
        contenedor.appendChild(card);
    });
}

function abrirReproductor(id, tipo) {
    currentId = id;
    currentType = tipo;
    cambiarServer(1);
    document.getElementById('modal-repro').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cambiarServer(n) {
    const iframe = document.getElementById('iframe-video');
    const servers = {
        1: `https://vidsrc.icu/embed/${currentType}/${currentId}`,
        2: `https://embed.su/embed/${currentType}/${currentId}`
    };
    iframe.src = servers[n];
    
    // Actualizar botones
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((t, i) => t.classList.toggle('active', i === n - 1));
}

function cerrarModal() {
    document.getElementById('modal-repro').style.display = 'none';
    document.getElementById('iframe-video').src = '';
    document.body.style.overflow = 'auto';
}

// Iniciar carga
cargarContenido(peliculas, 'grid-peliculas', 'movie');
cargarContenido(series, 'grid-series', 'tv');
