import { useEffect, useRef, useState } from 'react';
import * as m from 'motion/react-m';
import useMediaQuery, { ESCRITORIO } from '../../hooks/useMediaQuery.js';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { EXPEDIENTE, FASES } from '../../contenido/metodologia.js';

const resorte = { type: 'spring', stiffness: 380, damping: 34 };

/**
 * El recorrido de una pieza: el expediente ficticio OV-2026-0000 atraviesa
 * las nueve fases.
 *
 * Escritorio: scrollytelling. El gráfico del recorrido queda fijo a la
 * izquierda y los pasos se desplazan con el scroll nativo; la mira se
 * detiene en la fase que se está leyendo y el expediente se rellena.
 * Móvil: historias horizontales a pantalla completa, con barras de
 * progreso, deslizamiento (scroll-snap nativo), toque en los laterales y
 * botones. No avanzan solas.
 */
export default function Recorrido() {
  const escritorio = useMediaQuery(ESCRITORIO);
  return escritorio ? <RecorridoEscritorio /> : <Historias />;
}

/** Línea de las nueve fases con la mira sobre la activa. */
function LineaFases({ activa, alElegir, compacta = false }) {
  if (compacta) {
    // En móvil la línea solo indica la posición: se navega deslizando,
    // tocando los laterales o con los botones, que tienen 44 px de alto.
    return (
      <ol className="ov-linea ov-linea--compacta" aria-hidden="true">
        {FASES.map((f, i) => (
          <li key={f.id} className={`ov-linea__fase ${i <= activa ? 'ov-linea__fase--hecha' : ''}`}>
            <span className="ov-linea__nodo">
              {i === activa && (
                <m.span layoutId="ov-mira-fase-movil" className="ov-linea__mira" transition={resorte}>
                  <svg viewBox="-50 -50 100 100" width="100%" height="100%" fill="none" style={{ viewTransitionName: 'ov-mira' }}>
                    <circle r="30" stroke="currentColor" strokeWidth="9" />
                    <path d="M0-46V-24M0 24V46M-46 0H-24M24 0H46" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
                  </svg>
                </m.span>
              )}
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="ov-linea">
      {FASES.map((f, i) => (
        <li key={f.id} className={`ov-linea__fase ${i <= activa ? 'ov-linea__fase--hecha' : ''}`}>
          <button
            type="button"
            className="ov-linea__boton"
            onClick={() => alElegir(i)}
            aria-current={i === activa ? 'step' : undefined}
            aria-label={`Fase ${i + 1}: ${f.titulo}`}
          >
            <span className="ov-linea__nodo" aria-hidden="true">
              {i === activa && (
                <m.span layoutId={compacta ? 'ov-mira-fase-movil' : 'ov-mira-fase'} className="ov-linea__mira" transition={resorte}>
                  <svg viewBox="-50 -50 100 100" width="100%" height="100%" fill="none" style={{ viewTransitionName: 'ov-mira' }}>
                    <circle r="30" stroke="currentColor" strokeWidth="9" />
                    <path d="M0-46V-24M0 24V46M-46 0H-24M24 0H46" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
                  </svg>
                </m.span>
              )}
            </span>
            {!compacta && (
              <span className="ov-linea__texto">
                <span className="ov-linea__numero">{i + 1}</span> {f.corto}
              </span>
            )}
          </button>
        </li>
      ))}
    </ol>
  );
}

/** Expediente que se rellena línea a línea según se avanza. */
function Expediente({ activa }) {
  return (
    <div className="ov-expediente" aria-live="off">
      <p className="ov-expediente__cabeza">
        <span className="ov-id">Expediente {EXPEDIENTE}</span>
        <span className="ov-sello">Ficticio</span>
      </p>
      <ol className="ov-expediente__lineas">
        {FASES.map((f, i) => (
          <li key={f.id} className={`ov-expediente__linea ${i <= activa ? 'ov-expediente__linea--escrita' : ''}`} aria-hidden={i > activa}>
            <span className="ov-expediente__fase">{String(i + 1).padStart(2, '0')}</span>
            <span>{i <= activa ? f.registro : ' '}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ContenidoFase({ f, i, nivel = 3 }) {
  const H = `h${nivel}`;
  return (
    <>
      <H className="ov-fase__titulo" tabIndex={-1}>
        <span className="ov-fase__numero">Fase {i + 1} de 9</span>
        {f.titulo}
      </H>
      <div className="ov-fase__cuerpo">
        {f.hace.map((p, j) => (
          <p key={j}>{p}</p>
        ))}
      </div>
      <dl className="ov-fase__datos">
        <div>
          <dt>Garantía del Código</dt>
          <dd>{f.garantia}</dd>
        </div>
        <div>
          <dt>Qué queda registrado</dt>
          <dd>{f.registro}</dd>
        </div>
      </dl>
    </>
  );
}

function RecorridoEscritorio() {
  const [activa, setActiva] = useState(0);
  const pasos = useRef([]);
  const reducido = useMovimientoReducido();

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActiva(Number(e.target.dataset.indice));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    pasos.current.forEach((p) => p && observador.observe(p));
    return () => observador.disconnect();
  }, []);

  const ir = (i) => {
    pasos.current[i]?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'center' });
    pasos.current[i]?.querySelector('h3')?.focus({ preventScroll: true });
  };

  return (
    <div className="ov-recorrido">
      <div className="ov-recorrido__fijo">
        <LineaFases activa={activa} alElegir={ir} />
        <Expediente activa={activa} />
      </div>
      <ol className="ov-recorrido__pasos">
        {FASES.map((f, i) => (
          <li
            key={f.id}
            ref={(el) => (pasos.current[i] = el)}
            data-indice={i}
            className={`ov-fase ${i === activa ? 'ov-fase--activa' : ''}`}
          >
            <ContenidoFase f={f} i={i} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Historias() {
  const [activa, setActiva] = useState(0);
  const pista = useRef(null);
  const reducido = useMovimientoReducido();

  const ir = (i) => {
    const el = pista.current;
    if (!el) return;
    const destino = Math.max(0, Math.min(FASES.length - 1, i));
    el.scrollTo({ left: destino * el.clientWidth, behavior: reducido ? 'auto' : 'smooth' });
  };

  const alDesplazar = () => {
    const el = pista.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== activa) setActiva(i);
  };

  // Toque en el tercio izquierdo o derecho de la historia: anterior o siguiente.
  const alTocar = (e) => {
    if (e.target.closest('a, button, summary')) return;
    const r = pista.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    if (x < 0.3) ir(activa - 1);
    else if (x > 0.7) ir(activa + 1);
  };

  const alTeclado = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      ir(activa + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      ir(activa - 1);
    }
  };

  return (
    <div className="ov-historias" aria-roledescription="carrusel" aria-label="El recorrido de una pieza en nueve fases">
      <div className="ov-historias__barras" aria-hidden="true">
        {FASES.map((f, i) => (
          <span key={f.id} className={`ov-historias__barra ${i <= activa ? 'ov-historias__barra--llena' : ''}`} />
        ))}
      </div>
      <div className="ov-historias__cabeza">
        <span className="ov-id">{EXPEDIENTE}</span>
        <span className="ov-historias__posicion" aria-live="polite">
          Fase {activa + 1} de 9
        </span>
      </div>
      <LineaFases activa={activa} alElegir={ir} compacta />
      <div
        ref={pista}
        className="ov-historias__pista"
        onScroll={alDesplazar}
        onClick={alTocar}
        onKeyDown={alTeclado}
        tabIndex={0}
        aria-label="Fases. Desliza o usa las flechas para cambiar de fase"
      >
        {FASES.map((f, i) => (
          <article
            key={f.id}
            className="ov-historia"
            aria-roledescription="diapositiva"
            aria-label={`Fase ${i + 1} de 9: ${f.titulo}`}
            aria-hidden={i !== activa}
          >
            <ContenidoFase f={f} i={i} />
          </article>
        ))}
      </div>
      <div className="ov-historias__controles">
        <button type="button" className="ov-boton-sec" onClick={() => ir(activa - 1)} disabled={activa === 0}>
          Fase anterior
        </button>
        <button type="button" className="ov-boton-sec" onClick={() => ir(activa + 1)} disabled={activa === FASES.length - 1}>
          Fase siguiente
        </button>
      </div>
    </div>
  );
}
