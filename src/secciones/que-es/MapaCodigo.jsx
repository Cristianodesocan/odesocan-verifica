import { useLayoutEffect, useRef, useState } from 'react';
import { Enlace } from '../../componentes/Enlace.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import useMediaQuery, { ESCRITORIO } from '../../hooks/useMediaQuery.js';
import { CAPITULOS, DOCUMENTOS } from '../../contenido/que-es.js';

/**
 * Cómo aplica ODESOCAN el Código: cada capítulo conectado con los
 * documentos del servicio que lo desarrollan. En escritorio, dos columnas
 * unidas por líneas; al enfocar un capítulo (puntero, teclado o toque) se
 * iluminan sus líneas y sus documentos. En móvil, una lista desplegable por
 * capítulo con los mismos datos.
 */
export default function MapaCodigo() {
  const escritorio = useMediaQuery(ESCRITORIO);
  return escritorio ? <MapaEscritorio /> : <MapaMovil />;
}

function EnlaceDocumento({ id }) {
  const d = DOCUMENTOS[id];
  const contenido = (
    <>
      {d.nombre}
      {d.nota && <span className="ov-mapa__nota"> ({d.nota})</span>}
    </>
  );
  if (d.ruta) return <Enlace to={d.ruta}>{contenido}</Enlace>;
  return (
    <span>
      {contenido} {d.pendiente && <Pendiente detalle={d.pendiente}>documento pendiente</Pendiente>}
    </span>
  );
}

function MapaMovil() {
  return (
    <div className="ov-mapa-movil">
      {CAPITULOS.map((c) => (
        <details key={c.id} className="ov-plegable">
          <summary>
            <span>
              <span className="ov-mapa__articulo">Artículo {c.articulo}</span> {c.nombre}
            </span>
          </summary>
          <div className="ov-plegable__cuerpo">
            <p>{c.resumen}</p>
            <p className="ov-mapa__desarrollo">Lo desarrollan:</p>
            <ul className="ov-lista">
              {c.documentos.map((d) => (
                <li key={d}>
                  <EnlaceDocumento id={d} />
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}

function MapaEscritorio() {
  const [activo, setActivo] = useState(null);
  const marco = useRef(null);
  const capitulos = useRef({});
  const documentos = useRef({});
  const [lineas, setLineas] = useState([]);
  const [alto, setAlto] = useState(0);

  const listaDocs = Object.keys(DOCUMENTOS);

  useLayoutEffect(() => {
    const calcular = () => {
      const base = marco.current?.getBoundingClientRect();
      if (!base) return;
      setAlto(base.height);
      const nuevas = [];
      CAPITULOS.forEach((c) => {
        const a = capitulos.current[c.id]?.getBoundingClientRect();
        c.documentos.forEach((d) => {
          const b = documentos.current[d]?.getBoundingClientRect();
          if (!a || !b) return;
          const x1 = a.right - base.left;
          const y1 = a.top + a.height / 2 - base.top;
          const x2 = b.left - base.left;
          const y2 = b.top + b.height / 2 - base.top;
          const mx = (x1 + x2) / 2;
          nuevas.push({ capitulo: c.id, documento: d, d: `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` });
        });
      });
      setLineas(nuevas);
    };
    calcular();
    const ro = new ResizeObserver(calcular);
    ro.observe(marco.current);
    return () => ro.disconnect();
  }, []);

  const docsActivos = activo ? CAPITULOS.find((c) => c.id === activo).documentos : [];

  return (
    <div ref={marco} className={`ov-mapa ${activo ? 'ov-mapa--enfocado' : ''}`} onMouseLeave={() => setActivo(null)}>
      <svg className="ov-mapa__lineas" width="100%" height={alto} aria-hidden="true">
        {lineas.map((l) => (
          <path key={`${l.capitulo}-${l.documento}`} d={l.d} className={l.capitulo === activo ? 'ov-mapa__linea ov-mapa__linea--activa' : 'ov-mapa__linea'} />
        ))}
      </svg>
      <div className="ov-mapa__columna">
        <p className="ov-mapa__cabeza">Capítulo del Código</p>
        <ul className="ov-mapa__capitulos">
          {CAPITULOS.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                ref={(el) => (capitulos.current[c.id] = el)}
                className="ov-mapa__capitulo"
                aria-pressed={activo === c.id}
                aria-describedby={`ov-mapa-res-${c.id}`}
                onMouseEnter={() => setActivo(c.id)}
                onFocus={() => setActivo(c.id)}
                onClick={() => setActivo(activo === c.id ? null : c.id)}
              >
                <span className="ov-mapa__articulo">Artículo {c.articulo}</span>
                <span className="ov-mapa__nombre">{c.nombre}</span>
              </button>
              <p id={`ov-mapa-res-${c.id}`} className="ov-mapa__resumen">
                {c.resumen}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="ov-mapa__columna ov-mapa__columna--docs">
        <p className="ov-mapa__cabeza">Documento del servicio que lo desarrolla</p>
        <ul className="ov-mapa__documentos">
          {listaDocs.map((d) => (
            <li
              key={d}
              ref={(el) => (documentos.current[d] = el)}
              className={docsActivos.includes(d) ? 'ov-mapa__documento ov-mapa__documento--activo' : 'ov-mapa__documento'}
            >
              <EnlaceDocumento id={d} />
            </li>
          ))}
        </ul>
        <p className="ov-oculto" aria-live="polite">
          {activo
            ? `${CAPITULOS.find((c) => c.id === activo).nombre}: lo desarrollan ${docsActivos.map((d) => DOCUMENTOS[d].nombre).join(', ')}.`
            : ''}
        </p>
      </div>
    </div>
  );
}
