import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Enlace } from '../../componentes/Enlace.jsx';
import useMediaQuery, { TABLETA, PUNTERO_FINO } from '../../hooks/useMediaQuery.js';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { componerRuido } from './ruido.js';

const RADIO = { ancho: 100, estrecho: 84 };
const AMPLIACION = 1.5;
// En móvil, la capa de ruido es más alta que el marco y lo atraviesa.
const ALTURA_CAPA_MOVIL = 3.4;
const VELOCIDAD_MOVIL = 1.25;

/**
 * Hero de Inicio: la mira enfoca el ruido.
 *
 * Escritorio: la mira sigue el puntero y enfoca lo que toca. Un clic la
 * amplía. El botón «Enfocar otra referencia» la mueve con el teclado.
 * Móvil: la mira queda fija y el ruido la atraviesa al desplazarse (el
 * desplazamiento es el nativo, solo se lee); un toque la amplía.
 *
 * Momento orquestado: al cargar, el anillo se fija sobre la primera
 * referencia y su contenido pasa de desenfocado a nítido. Con movimiento
 * reducido, la mira aparece directamente enfocada.
 */
export default function HeroMira() {
  const ancho = useMediaQuery(TABLETA);
  const puntero = useMediaQuery(PUNTERO_FINO);
  const reducido = useMovimientoReducido();
  const formato = ancho ? 'ancho' : 'estrecho';
  const { publicaciones, fragmentos } = useMemo(() => componerRuido(formato), [formato]);
  const inicial = formato === 'ancho' ? 8 : 1;

  const marco = useRef(null);
  const capaRuido = useRef(null);
  const lente = useRef(null);
  const nitida = useRef(null);
  const medida = useRef({ w: 0, h: 0, capa: 0 });
  const posicion = useRef({ x: 0, y: 0, desp: 0, base: 0 });
  const cuadro = useRef(0);

  const [enfocada, setEnfocada] = useState(inicial);
  const [ampliada, setAmpliada] = useState(false);
  const [fijando, setFijando] = useState(!reducido);

  const radio = RADIO[formato] * (ampliada ? AMPLIACION : 1);

  const aplicar = useCallback(() => {
    cuadro.current = 0;
    const { x, y, desp } = posicion.current;
    if (lente.current) lente.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    if (nitida.current) nitida.current.style.transform = `translate3d(${-x}px, ${-y - desp}px, 0)`;
    if (capaRuido.current) capaRuido.current.style.transform = `translate3d(0, ${-desp}px, 0)`;
  }, []);

  const programar = useCallback(() => {
    if (!cuadro.current) cuadro.current = requestAnimationFrame(aplicar);
  }, [aplicar]);

  /** Lleva la mira al centro de una publicación (escritorio). */
  const irA = useCallback(
    (indice) => {
      const p = publicaciones[indice];
      const { w, capa } = medida.current;
      if (!p || !w) return;
      posicion.current.x = p.x * w;
      posicion.current.y = p.y * capa - posicion.current.desp;
      programar();
    },
    [publicaciones, programar],
  );

  // Medidas del marco y posición de partida.
  useLayoutEffect(() => {
    const el = marco.current;
    if (!el) return undefined;
    const medir = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const capa = formato === 'ancho' ? h : h * ALTURA_CAPA_MOVIL;
      medida.current = { w, h, capa };
      for (const capaEl of [capaRuido.current, nitida.current]) {
        if (capaEl) {
          capaEl.style.width = `${w}px`;
          capaEl.style.height = `${capa}px`;
        }
      }
      if (formato === 'estrecho') {
        const p = publicaciones[inicial];
        posicion.current.base = p.y * capa - h / 2;
        posicion.current.x = w / 2;
        posicion.current.y = h / 2;
        actualizarDesplazamiento();
      } else {
        posicion.current.desp = 0;
        irA(enfocada);
      }
      aplicar();
    };
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    medir();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formato, publicaciones]);

  // Móvil: el ruido atraviesa la mira al ritmo del desplazamiento nativo.
  const actualizarDesplazamiento = useCallback(() => {
    const el = marco.current;
    if (!el) return;
    const { h, capa } = medida.current;
    const recorrido = Math.min(Math.max(window.scrollY, 0), h * 1.4);
    const maximo = Math.max(capa - h, 0);
    posicion.current.desp = Math.min(posicion.current.base + recorrido * VELOCIDAD_MOVIL, maximo);
    programar();
  }, [programar]);

  useEffect(() => {
    if (formato !== 'estrecho') return undefined;
    window.addEventListener('scroll', actualizarDesplazamiento, { passive: true });
    return () => window.removeEventListener('scroll', actualizarDesplazamiento);
  }, [formato, actualizarDesplazamiento]);

  // Escritorio: la mira sigue al puntero.
  const alMover = (e) => {
    if (formato !== 'ancho' || !puntero) return;
    const r = marco.current.getBoundingClientRect();
    posicion.current.x = e.clientX - r.left;
    posicion.current.y = e.clientY - r.top;
    programar();
  };

  const alSalir = () => {
    if (formato === 'ancho') irA(enfocada);
  };

  const siguiente = () => {
    const n = (enfocada + 1) % publicaciones.length;
    setEnfocada(n);
    irA(n);
  };

  useEffect(() => {
    if (!fijando) return undefined;
    const t = setTimeout(() => setFijando(false), 1300);
    return () => clearTimeout(t);
  }, [fijando]);

  useEffect(() => () => cancelAnimationFrame(cuadro.current), []);

  const clases = ['ov-hero', 'ov-navy', fijando && !reducido ? 'ov-hero--fijando' : '', puntero ? 'ov-hero--puntero' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={clases} aria-labelledby="ov-hero-titulo">
      <div
        ref={marco}
        className="ov-hero__marco"
        aria-hidden="true"
        onPointerMove={alMover}
        onPointerLeave={alSalir}
        onClick={() => setAmpliada((a) => !a)}
      >
        <div ref={capaRuido} className="ov-ruido">
          {fragmentos.map((f, i) => (
            <span
              key={`f${i}`}
              className="ov-ruido__fragmento"
              style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%`, width: f.ancho, height: f.alto }}
            />
          ))}
          {publicaciones.map((p, i) => (
            <span
              key={`p${i}`}
              className={`ov-ruido__pub ov-ruido__pub--${p.tipo}`}
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              <span className="ov-ruido__cabeza">
                <span className="ov-ruido__avatar" />
                <span className="ov-ruido__barra" style={{ width: '46%' }} />
              </span>
              {p.tipo === 'imagen' && <span className="ov-ruido__imagen" />}
              {Array.from({ length: p.tipo === 'imagen' ? 2 : p.lineas }, (_, j) => (
                <span key={j} className="ov-ruido__barra" style={{ width: `${62 + ((i * 7 + j * 13) % 38)}%` }} />
              ))}
            </span>
          ))}
        </div>

        <div ref={lente} className="ov-hero__lente" style={{ '--ov-r': `${radio}px` }}>
          <div className="ov-hero__disco">
            <div ref={nitida} className="ov-nitida">
              {publicaciones.map((p, i) => (
                <span
                  key={`r${i}`}
                  className="ov-nitida__ref"
                  style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                >
                  <span className="ov-nitida__tipo">{p.referencia[0]}</span>
                  <span>{p.referencia[1]}</span>
                  <span className="ov-nitida__dato">{p.referencia[2]}</span>
                </span>
              ))}
            </div>
          </div>
          <svg
            className="ov-hero__anillo"
            width={(radio + 34) * 2}
            height={(radio + 34) * 2}
            viewBox={`${-(radio + 34)} ${-(radio + 34)} ${(radio + 34) * 2} ${(radio + 34) * 2}`}
            fill="none"
            focusable="false"
          >
            <circle r={radio} strokeWidth={5} />
            <path
              d={`M0 ${-radio - 30}V${-radio + 9}M0 ${radio - 9}V${radio + 30}M${-radio - 30} 0H${-radio + 9}M${radio - 9} 0H${radio + 30}`}
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <p className="ov-oculto">
        Ilustración: una mira recorre fragmentos desenfocados que sugieren mensajes y publicaciones, y dentro de ella se leen nítidas las
        referencias que sostienen una verificación, como la fuente consultada, la fecha de consulta o la huella del archivo.
      </p>

      <div className="ov-hero__texto">
        <h1 id="ov-hero-titulo" className="ov-hero__titulo">
          Contrastamos con datos lo que se afirma en el debate público de Canarias.
        </h1>
        <p className="ov-hero__bajada">
          Odesocan Verifica es el servicio de verificación de ODESOCAN para las afirmaciones públicas sobre derechos sociales.
        </p>
        <div className="ov-hero__acciones">
          <Enlace to="/envia" className="ov-boton">
            Enviar un contenido
          </Enlace>
          <Enlace to="/portal" className="ov-enlace-accion">
            Ver las verificaciones
          </Enlace>
        </div>
      </div>

      {formato === 'ancho' && (
        <button type="button" className="ov-hero__otra" onClick={siguiente}>
          Enfocar otra referencia
        </button>
      )}
    </section>
  );
}
