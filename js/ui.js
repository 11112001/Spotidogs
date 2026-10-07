/* ───────── Interfaz ───────── */
let vista = "inicio"; 
const $ = id => document.getElementById(id);

const portada = (hue, foto) => Array.isArray(foto)
  ? `<div class="cover cover--mosaic" style="--h:${hue}">${foto.map(f => `<i style="background-image:url('${f}')"></i>`).join("")}</div>`
  : `<div class="cover ${foto ? "cover--photo" : ""}" style="--h:${hue}${foto ? `;background-image:url('${foto}')` : ""}"></div>`;

const ICONO = {
  play: '<i class="ic ic-play"></i>',
  pause: '<i class="ic ic-pause"></i>',
};

function pintarMenu() {
  $("nav").innerHTML =
    `<button class="nav-btn ${vista === "inicio" ? "on" : ""}" data-inicio aria-label="Guau">${portada(40)}</button>` +
    listas.map((l, i) => `<button class="nav-btn ${vista === i ? "on" : ""}" data-abrir="${i}" aria-label="Guau">${portada(l.hue, l.portada)}</button>`).join("");
}

function htmlInicio() {
  return `<div class="home"><div class="tiles">${
    listas.map((l, i) => `<button class="tile" data-abrir="${i}" aria-label="Guau">${portada(l.hue, l.portada)}</button>`).join("")
  }</div></div>`;
}

function htmlLista(v) {
  const l = listas[v], e = Player.estado;
  const aqui = e.lista === v;
  return `
  <section class="hero" style="--h:${l.hue}">
    ${portada(l.hue, l.portada)}
    <div class="hero-body">
      <h1 class="hero-title">${l.nombre}</h1>
      <button class="fab" data-play-lista aria-label="Guau">${aqui && e.sonando ? ICONO.pause : ICONO.play}</button>
    </div>
  </section>
  <div class="tracks">${l.canciones.map((c, i) => {
    const actual = aqui && e.indice === i;
    return `<div class="track ${actual ? "is-current" : ""} ${actual && e.sonando ? "is-playing" : ""}" data-cancion="${i}">
      <span class="eq"><i></i><i></i><i></i></span>
      ${portada(l.hue, c.portada)}
      <b class="track-title">${c.titulo}</b>
      <button class="like ${c.meGusta ? "on" : ""}" data-like="${i}" aria-label="Guau"><i class="ic ic-heart"></i></button>
    </div>`;
  }).join("")}</div>`;
}

function pintarContenido() {
  $("main").innerHTML = vista === "inicio" ? htmlInicio() : htmlLista(vista);
  pintarMenu();
}

function pintarReproductor() {
  const c = Player.actual(), l = listas[Player.estado.lista];
  $("np-cover").innerHTML = portada(l.hue, c.portada);
  $("np-titulo").textContent = c.titulo;
  $("np-artista").textContent = c.artista;
  $("np-like").classList.toggle("on", c.meGusta);
  $("play").innerHTML = Player.estado.sonando ? ICONO.pause : ICONO.play;
  pintarProgreso();
}
const pintarProgreso = () => $("seek").style.setProperty("--p", Player.progreso() * 100 + "%");

function pintarTodo() { pintarContenido(); pintarReproductor(); }

/* ───────── Eventos ───────── */
document.addEventListener("click", e => {
  const abrir = e.target.closest("[data-abrir]");
  if (abrir) { vista = +abrir.dataset.abrir; Player.ir(vista, 0); $("main").scrollTop = 0; return; }

  if (e.target.closest("[data-inicio]")) { vista = "inicio"; pintarContenido(); return; }

  const like = e.target.closest("[data-like]");
  if (like) { const c = listas[vista].canciones[like.dataset.like]; c.meGusta = !c.meGusta; pintarTodo(); return; }

  if (e.target.closest("[data-play-lista]")) {
    Player.estado.lista === vista ? Player.alternar() : Player.ir(vista, 0);
    return;
  }
  const fila = e.target.closest("[data-cancion]");
  if (fila) Player.ir(vista, +fila.dataset.cancion);
});

$("play").onclick = Player.alternar;
$("next").onclick = Player.siguiente;
$("prev").onclick = Player.anterior;
$("np-like").onclick = () => { const c = Player.actual(); c.meGusta = !c.meGusta; pintarTodo(); };

/* barras deslizables: se arrastran con el dedo, el mouse */
function deslizable(el, alMover) {
  const mover = e => { const r = el.getBoundingClientRect(); alMover(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))); };
  el.addEventListener("pointerdown", e => { mover(e); el.setPointerCapture(e.pointerId); el.onpointermove = mover; });
  el.addEventListener("pointerup", () => { el.onpointermove = null; });
}
deslizable($("seek"), p => Player.buscar(p));
deslizable($("vol"), p => { Player.volumen(p); $("vol").style.setProperty("--p", p * 100 + "%"); });

Player.onChange(tipo => (tipo === "tick" ? pintarProgreso() : pintarTodo()));
pintarTodo();
