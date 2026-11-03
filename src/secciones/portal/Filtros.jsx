import { useEffect, useId, useState } from 'react';
import GlifoEscala from '../../componentes/GlifoEscala.jsx';
import { ESCALA } from '../../config/escala.js';
import { MATERIAS } from '../../config/materias.js';
import { PERIODOS } from './filtros.js';

/**
 * Formulario de filtros del explorador: fecha (atajos o fechas concretas),
 * calificación y temática (selección múltiple) y búsqueda libre. Cada cambio
 * se aplica al momento y queda en la URL.
 */
export default function Filtros({ filtros, alCambiar, alLimpiar, idBase = 'ov-filtros' }) {
  const id = useId();
  const [texto, setTexto] = useState(filtros.q);

  // La búsqueda se aplica al dejar de escribir.
  useEffect(() => setTexto(filtros.q), [filtros.q]);
  useEffect(() => {
    if (texto === filtros.q) return undefined;
    const t = setTimeout(() => alCambiar({ q: texto }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);

  const alternar = (campo, valor) => {
    const actual = filtros[campo];
    alCambiar({ [campo]: actual.includes(valor) ? actual.filter((v) => v !== valor) : [...actual, valor] });
  };

  return (
    <form className="ov-filtros" role="search" aria-label="Filtrar verificaciones" onSubmit={(e) => e.preventDefault()}>
      <div className="ov-filtros__grupo">
        <label className="ov-filtros__leyenda" htmlFor={`${id}-q`}>
          Buscar
        </label>
        <input
          id={`${id}-q`}
          className="ov-filtros__busqueda"
          type="search"
          value={texto}
          placeholder="Palabra, isla o identificador"
          onChange={(e) => setTexto(e.target.value)}
          autoComplete="off"
        />
      </div>

      <fieldset className="ov-filtros__grupo">
        <legend className="ov-filtros__leyenda">Fecha de publicación</legend>
        <div className="ov-filtros__opciones">
          {PERIODOS.map((p) => (
            <label key={p.id} className="ov-opcion">
              <input
                type="radio"
                name={`${idBase}-periodo`}
                value={p.id}
                checked={filtros.periodo === p.id}
                onChange={() => alCambiar({ periodo: p.id })}
              />
              <span className="ov-opcion__marca" aria-hidden="true" />
              {p.etiqueta}
            </label>
          ))}
        </div>
        {filtros.periodo === 'rango' && (
          <div className="ov-filtros__rango">
            <label>
              Desde
              <input type="date" value={filtros.desde} max={filtros.hasta || undefined} onChange={(e) => alCambiar({ desde: e.target.value })} />
            </label>
            <label>
              Hasta
              <input type="date" value={filtros.hasta} min={filtros.desde || undefined} onChange={(e) => alCambiar({ hasta: e.target.value })} />
            </label>
          </div>
        )}
      </fieldset>

      <fieldset className="ov-filtros__grupo">
        <legend className="ov-filtros__leyenda">Calificación</legend>
        <div className="ov-filtros__chips">
          {ESCALA.map((c) => (
            <label key={c.clave} className={`ov-chip ov-chip--${c.clave}`}>
              <input type="checkbox" checked={filtros.cal.includes(c.clave)} onChange={() => alternar('cal', c.clave)} />
              <GlifoEscala forma={c.forma} tamano={16} />
              {c.etiqueta}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="ov-filtros__grupo">
        <legend className="ov-filtros__leyenda">Temática</legend>
        <div className="ov-filtros__chips">
          {MATERIAS.map((m) => (
            <label key={m.id} className="ov-chip">
              <input type="checkbox" checked={filtros.tema.includes(m.id)} onChange={() => alternar('tema', m.id)} />
              {m.etiqueta}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" className="ov-boton-sec ov-filtros__limpiar" onClick={alLimpiar}>
        Limpiar filtros
      </button>
    </form>
  );
}
