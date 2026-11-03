import { useRef, useState } from 'react';
import * as m from 'motion/react-m';
import useMediaQuery, { TABLETA } from '../../hooks/useMediaQuery.js';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { SUPUESTOS } from '../../contenido/que-es.js';

/** Geometría de los dos trazos, en horizontal (escritorio) y en vertical (móvil). */
const G = {
  h: { ancho: 1000, alto: 260, inc: 74, ver: 190, desde: 170, hasta: 960 },
  v: { ancho: 320, alto: 600, inc: 250, ver: 64, desde: 92, hasta: 560 },
};

function punto(o, carril, t) {
  const g = G[o];
  const c = carril === 'inc' ? g.inc : carril === 'ver' ? g.ver : (g.inc + g.ver) / 2;
  const a = g.desde + t * (g.hasta - g.desde);
  return o === 'h' ? { x: a, y: c } : { x: c, y: a };
}

/**
 * «Dos caminos»: incidencia y verificación, dos trazos paralelos que no se
 * cruzan nunca. La persona elige un supuesto y ve qué camino sigue la
 * afirmación y por qué. El movimiento responde a la elección; con
 * movimiento reducido, el resultado aparece ya dibujado.
 */
export default function DosCaminos() {
  const ancho = useMediaQuery(TABLETA);
  const reducido = useMovimientoReducido();
  const o = ancho ? 'h' : 'v';
  const g = G[o];
  const [id, setId] = useState(null);
  const s = SUPUESTOS.find((x) => x.id === id);

  // Recorrido de la ficha según el tipo de supuesto.
  let tramo = null;
  let barrera = null;
  let conector = null;
  const marcas = [];
  if (s?.tipo === 'verifica') {
    tramo = [punto(o, 'ver', 0), punto(o, 'ver', 1)];
    s.marcas.forEach((texto, k) => {
      const t = 0.18 + (0.66 * (k + 1)) / (s.marcas.length + 1);
      marcas.push({ texto, t, lado: k % 2 === 0 ? 'debajo' : 'encima', ...punto(o, 'ver', t) });
    });
  } else if (s?.tipo === 'no-verifica') {
    tramo = [punto(o, 'ver', -0.06), punto(o, 'ver', 0.12)];
    barrera = punto(o, 'ver', 0.17);
  } else if (s?.tipo === 'no-procede') {
    const inicio = punto(o, 'inc', 0.72);
    const destino = punto(o, 'ver', 0.72);
    const medio = { x: (inicio.x + destino.x) / 2, y: (inicio.y + destino.y) / 2 };
    const antes = { x: inicio.x + (medio.x - inicio.x) * 0.62, y: inicio.y + (medio.y - inicio.y) * 0.62 };
    tramo = [inicio, antes];
    barrera = medio;
    conector = { x1: inicio.x, y1: inicio.y, x2: destino.x, y2: destino.y };
  }
  const duracion = reducido ? 0 : 1.4;
  // En móvil la escena queda debajo de la lista: se lleva a la vista y la
  // animación empieza cuando ya se ve.
  const retraso = !ancho && !reducido ? 0.45 : 0;
  const escena = useRef(null);
  const elegir = (nuevo) => {
    setId(nuevo);
    if (!ancho) escena.current?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'center' });
  };

  const etiqueta = (p, texto, lado = 'debajo') =>
    o === 'h'
      ? { x: p.x, y: p.y + (lado === 'debajo' ? 32 : -18), anchor: 'middle' }
      : { x: p.x + 18, y: p.y + 5, anchor: 'start' };

  return (
    <div className="ov-caminos">
      <fieldset className="ov-caminos__supuestos">
        <legend className="ov-filtros__leyenda">Elige un supuesto</legend>
        <ul className="ov-caminos__lista">
          {SUPUESTOS.map((x, i) => (
            <li key={x.id}>
              <button type="button" className="ov-caminos__supuesto" aria-pressed={id === x.id} onClick={() => elegir(x.id)}>
                <span className="ov-caminos__n" aria-hidden="true">
                  {i + 1}
                </span>
                {x.texto}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <div ref={escena} className="ov-caminos__escena ov-navy">
        <svg
          className="ov-caminos__svg"
          viewBox={`0 0 ${g.ancho} ${g.alto}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          {/* Rótulos de los carriles */}
          {o === 'h' ? (
            <>
              <text x="20" y={g.inc + 5} className="ov-caminos__rotulo">Incidencia</text>
              <text x="20" y={g.ver + 5} className="ov-caminos__rotulo ov-caminos__rotulo--ver">Verificación</text>
              <text x="20" y={(g.inc + g.ver) / 2 + 5} className="ov-caminos__separa">no se cruzan</text>
            </>
          ) : (
            <>
              <text x={g.inc} y="40" textAnchor="middle" className="ov-caminos__rotulo">Incidencia</text>
              <text x={g.ver} y="40" textAnchor="middle" className="ov-caminos__rotulo ov-caminos__rotulo--ver">Verificación</text>
            </>
          )}
          {/* Los dos trazos paralelos */}
          <line {...lineaDe(o, 'inc')} className="ov-caminos__trazo ov-caminos__trazo--inc" />
          <line {...lineaDe(o, 'ver')} className="ov-caminos__trazo ov-caminos__trazo--ver" />
          <circle {...centro(punto(o, 'ver', 1))} r="7" className="ov-caminos__fin" />
          <circle {...centro(punto(o, 'inc', 1))} r="7" className="ov-caminos__fin ov-caminos__fin--inc" />

          {conector && (
            <line x1={conector.x1} y1={conector.y1} x2={conector.x2} y2={conector.y2} className="ov-caminos__conector" />
          )}

          {marcas.map((mk, k) => (
            <m.g
              key={`${id}-${k}`}
              initial={{ opacity: reducido ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducido ? 0 : retraso + duracion * mk.t + 0.1, duration: 0.25 }}
            >
              <line
                x1={o === 'h' ? mk.x : mk.x - 12}
                y1={o === 'h' ? mk.y - 12 : mk.y}
                x2={o === 'h' ? mk.x : mk.x + 12}
                y2={o === 'h' ? mk.y + 12 : mk.y}
                className="ov-caminos__marca"
              />
              <text {...posTexto(etiqueta(mk, mk.texto, mk.lado))} className="ov-caminos__texto-marca">
                {mk.texto}
              </text>
            </m.g>
          ))}

          {barrera && (
            <m.g
              key={`b-${id}`}
              initial={{ opacity: reducido ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducido ? 0 : retraso + duracion * 0.85, duration: 0.2 }}
            >
              <path
                d={`M${barrera.x - 11} ${barrera.y - 11}L${barrera.x + 11} ${barrera.y + 11}M${barrera.x + 11} ${barrera.y - 11}L${barrera.x - 11} ${barrera.y + 11}`}
                className="ov-caminos__barrera"
              />
              <text
                {...posTexto(
                  o === 'h'
                    ? { x: barrera.x + (s.tipo === 'no-procede' ? 22 : 0), y: barrera.y + (s.tipo === 'no-procede' ? 5 : 34), anchor: s.tipo === 'no-procede' ? 'start' : 'middle' }
                    : { x: barrera.x + (s.tipo === 'no-procede' ? 0 : 20), y: barrera.y + (s.tipo === 'no-procede' ? 32 : 5), anchor: s.tipo === 'no-procede' ? 'middle' : 'start' },
                )}
                className="ov-caminos__texto-barrera"
              >
                {s.resultado}
              </text>
            </m.g>
          )}

          {/* La afirmación: una mira pequeña que recorre su camino */}
          {tramo && (
            <m.g
              key={`f-${id}`}
              initial={reducido ? { x: tramo[1].x, y: tramo[1].y } : { x: tramo[0].x, y: tramo[0].y }}
              animate={{ x: tramo[1].x, y: tramo[1].y }}
              transition={{ delay: retraso, duration: duracion, ease: [0.3, 0.6, 0.2, 1] }}
            >
              <circle r="13" className="ov-caminos__ficha" />
              <circle r="4" className="ov-caminos__ficha-punto" />
            </m.g>
          )}

          {!s && (
            <text x={g.ancho / 2} y={o === 'h' ? g.alto - 12 : g.alto - 6} textAnchor="middle" className="ov-caminos__instruccion">
              Elige un supuesto para ver su camino
            </text>
          )}
        </svg>
      </div>

      <div className="ov-caminos__resultado" role="status" aria-live="polite">
        {s && (
          <>
            <p className={`ov-caminos__veredicto ov-caminos__veredicto--${s.tipo}`}>{s.resultado}</p>
            <p>{s.explicacion}</p>
          </>
        )}
      </div>
    </div>
  );
}

function lineaDe(o, carril) {
  const a = punto(o, carril, 0);
  const b = punto(o, carril, 1);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

const centro = (p) => ({ cx: p.x, cy: p.y });
const posTexto = ({ x, y, anchor }) => ({ x, y, textAnchor: anchor });
