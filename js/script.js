const API_KEY = "4f298c2d5836d13e7f530597f6674688"; // Clave para buscar imágenes
const favoritos = [
    { t: "Scarface", id: "tt0086250", img: "/iS9Uv9t9ntS6bt3ffOTv99m4bsf.jpg", type: "movie" },
    { t: "Cars 1", id: "tt0317219", img: "/abW59qvvyYSTZTYCOOUvdpMgK9j.jpg", type: "movie" },
    { t: "Cars 2", id: "tt1216475", img: "/9f9Ew9vVfO78OndIu6763Isk3Dk.jpg", type: "movie" },
    { t: "Cars 3", id: "tt3407616", img: "/9pM6C91D45R0U64fHjT22FvWwA5.jpg", type: "movie" },
    { t: "Dragon Ball Super: Broly", id: "tt7961032", img: "/f0NUXUbCq9I2vD6vMGp0pYpM6JF.jpg", type: "movie" }
];

const series = [
    { t: "Los Simpson", id: "tt0096697", img: "/gzB97AmSbtG7S7p7mGFTdn9vX6L.jpg", type: "tv" },
    { t: "Futurama", id: "tt0149460", img: "/799rXp08p5Xv8X8V6B9vX9V6B9v.jpg", type: "tv" },
    { t: "Dragon Ball Z", id: "tt0121955", img: "/6Xp9fXv8X8V6B9vX9V6B9vX9V6B.jpg", type: "tv" }
];

let idActual = "";
let tipoActual = "movie";

function render(lista, divId) {
    const div = document.getElementById(divId);
    div.innerHTML = "";
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => abrirPlayer(item.id, item.type || 'movie');
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.img}" onerror="this.src='https://via.placeholder.com/500x750?text=Cargando...'">
            <div class="card-info">${item.t}</div>
        `;
        div.appendChild(card);
    });
}

async function buscarContenido() {
    const query = document.getElementById('input-busqueda').value;
    if (query.length < 3) return;

    const resp = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=es-MX`);
    const data = await resp.json();
    
    const resultados = data.results.filter(r => r.poster_path && (r.media_type === 'movie' || r.media_type === 'tv')).map(r => ({
        t: r.title || r.name,
        id: r.id, // ID de TMDB funciona en los servidores
        img: r.poster_path,
        type: r.media_type,
        isTMDB: true
    }));

    document.getElementById('titulo-seccion').innerText = "🔍 Resultados de búsqueda";
    document.getElementById('seccion-series').style.display = "none";
    render(resultados, 'grid-principal');
}

function verificarEnter(e) { if (e.key === 'Enter') buscarContenido(); }

function abrirPlayer(id, tipo) {
    idActual = id;
    tipoActual = tipo;
    cambiarServer(1);
    document.getElementById('modal-repro').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cambiarServer(n) {
    const frame = document.getElementById('iframe-video');
    // Si es ID de TMDB (buscado), usamos vidsrc.icu que los soporta mejor
    const url = n === 1 ? `https://vidsrc.icu/embed/${tipoActual}/${idActual}` : `https://embed.su/embed/${tipoActual}/${idActual}`;
    frame.src = url;
    
    document.querySelectorAll('.btn-server').forEach((b, i) => b.classList.toggle('active', i === n - 1));
}

function cerrarModal() {
    document.getElementById('modal-repro').style.display = 'none';
    document.getElementById('iframe-video').src = '';
    document.body.style.overflow = 'auto';
}

render(favoritos, 'grid-principal');
render(series, 'grid-series');
