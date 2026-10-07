const Player = (() => {
  const audio = new Audio();
  audio.preload = "auto";
  audio.volume = 0.7;

  const estado = { lista: 0, indice: 0, sonando: false };
  const oyentes = [];
  const avisar = tipo => oyentes.forEach(fn => fn(tipo));
  const actual = () => listas[estado.lista].canciones[estado.indice];

  const cargar = () => { audio.src = actual().audio; };

  function reproducir() {
    estado.sonando = true;
    audio.play().catch(() => { estado.sonando = false; avisar("estado"); });
    avisar("estado");
  }
  function pausar() {
    estado.sonando = false;
    audio.pause();
    avisar("estado");
  }
  function ir(lista, indice) {
    const total = listas[lista].canciones.length;
    estado.lista = lista;
    estado.indice = (indice + total) % total;
    actual().reproducciones++;
    cargar();
    reproducir();
  }
  const alternar = () => (estado.sonando ? pausar() : reproducir());
  const siguiente = () => ir(estado.lista, estado.indice + 1);
  const anterior = () => ir(estado.lista, estado.indice - 1);

  const duracion = () => (isFinite(audio.duration) ? audio.duration : actual().duracion);
  const progreso = () => Math.min(1, audio.currentTime / duracion() || 0);
  function buscar(p) {
    if (!isFinite(audio.duration)) return;
    audio.currentTime = p * audio.duration;
    avisar("tick");
  }
  const volumen = p => { audio.volume = p; };

  audio.addEventListener("timeupdate", () => avisar("tick"));
  audio.addEventListener("loadedmetadata", () => { actual().duracion = Math.round(audio.duration); avisar("tick"); });
  audio.addEventListener("ended", siguiente);

  cargar();
  return { estado, actual, ir, alternar, siguiente, anterior, buscar, volumen, progreso, onChange: fn => oyentes.push(fn) };
})();
