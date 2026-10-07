# Guaufy 🐾

Reproductor de música para perros. Todo el texto es "Guau guau guau guau" y se navega solo con las fotos.

## Cómo abrirlo
Abre `index.html` en el navegador (doble clic). No necesita servidor ni instalación.

## Estructura
```
Guaufy/
├── index.html          estructura de la página
├── css/
│   ├── tokens.css      colores, tipografías y variables
│   ├── base.css        reset y layout general
│   ├── icons.css       iconos hechos con CSS
│   ├── cover.css       portadas (foto, degradado, mosaico)
│   ├── components.css  barra lateral, inicio, playlist, canciones
│   ├── player.css      reproductor inferior
│   └── responsive.css  ajustes para celular
├── js/
│   ├── data.js         canciones y playlists
│   ├── player.js       audio (play, pausa, siguiente, volumen...)
│   └── ui.js           pantalla y eventos
└── assets/
    ├── audio/          .mp3
    └── covers/         portadas .jpg
```

## Agregar una canción
1. Copia `mi-cancion.mp3` a `assets/audio/` y `mi-cancion.jpg` a `assets/covers/` (mismo nombre).
2. En `js/data.js`, añade a la lista `canciones`:
   `nuevaCancion("mi-cancion", 200, 120),`  → (nombre de archivo, tono de color 0-360, duración en segundos aprox.)

## Colores
Azul y amarillo, que son los colores que mejor distinguen los perros (no ven bien rojo ni verde).
