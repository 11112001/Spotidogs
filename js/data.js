const TEXTO = "Guau guau guau guau";   // todo el texto de la app

const nuevaCancion = (id, hue, duracion) => ({
  id,
  titulo: TEXTO,
  artista: TEXTO,
  album: TEXTO,
  portada: `assets/covers/${id}.jpg`,
  audio: `assets/audio/${id}.mp3`,
  duracion,                // segundos (se corrige sola al cargar el audio)
  hue,                     // tono del fondo, sale de la foto
  meGusta: false,
  reproducciones: 0,
});

const canciones = [
  nuevaCancion("cali-pachanguero", 47, 49),
  nuevaCancion("quinta-sinfonia", 41, 17),
  nuevaCancion("sin-medir-distancias", 337, 18),
  nuevaCancion("thunderstruck", 335, 67),
];
/* "sin-medir-distancias" usa la portada del álbum "El camino de la vida". */
canciones[2].portada = "assets/covers/el-camino-de-la-vida.jpg";

/* Playlists: la primera tiene todas las canciones; luego una por álbum. */
const listas = [
  { id: "todas", nombre: TEXTO, hue: 32, portada: canciones.map(c => c.portada), canciones },
  ...canciones.map(c => ({ id: c.id, nombre: TEXTO, hue: c.hue, portada: c.portada, canciones: [c] })),
];
