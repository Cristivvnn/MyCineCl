const peliculas = [
    { titulo: "Scarface", id: "tt0086250", img: "iS9Uv9t9ntS6bt3ffOTv99m4bsf" },
    { titulo: "Cars 1", id: "tt0317219", img: "abW59qvvyYSTZTYCOOUvdpMgK9j" },
    { titulo: "Cars 2", id: "tt1216475", img: "9f9Ew9vVfO78OndIu6763Isk3Dk" },
    { titulo: "Cars 3", id: "tt3407616", img: "9pM6C91D45R0U64fHjT22FvWwA5" },
    { titulo: "DB Super: Broly", id: "tt7961032", img: "f0NUXUbCq9I2vD6vMGp0pYpM6JF" }
];

const series = [
    { titulo: "Los Simpson", id: "tt0096697", img: "gzB97AmSbtG7S7p7mGFTdn9vX6L" },
    { titulo: "Futurama", id: "tt0149460", img: "799rXp08p5Xv8X8V6B9vX9V6B9v" }
];

function cargarContenido(lista, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            const iframe = document.getElementById('iframe-video');
            iframe.src = `https://vidsrc.icu/embed/${tipo}/${item.id}`;
            document.getElementById('modal-repro').style.display = 'block';
        };
        card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${item.img}.jpg"><div class="card-info">${item.titulo}</div>`;
        contenedor.appendChild(card);
    });
}

function cerrarModal() {
    document.getElementById('modal-repro').style.display = 'none';
    document.getElementById('iframe-video').src = '';
}

cargarContenido(peliculas, 'grid-peliculas', 'movie');
cargarContenido(series, 'grid-series', 'tv');
