import { useEffect, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import { selectAll, select } from 'd3-selection';
import 'd3-transition';
import useMovimientoReducido from '../../../hooks/useMovimientoReducido.js';

/**
 * Barras horizontales dibujadas con D3 (escala lineal y transición de la
 * anchura). Cada fila muestra la cifra absoluta y el porcentaje. Si la
 * barra es interactiva, es un botón: al pulsarla se aplica ese filtro en el
 * explorador (aria-pressed indica si el filtro está aplicado).
 *
 * filas: [{ clave, etiqueta, valor, porcentaje, glifo?, color? }]
 */
export default function BarrasHorizontales({ filas, alPulsar, seleccion = [], accion = 'Filtrar por' }) {
  const raiz = useRef(null);
  const reducido = useMovimientoReducido();
  const maximo = Math.max(1, ...filas.map((f) => f.valor));

  useEffect(() => {
    if (!raiz.current) return;
    const x = scaleLinear().domain([0, maximo]).range([0, 100]);
    const rellenos = select(raiz.current).selectAll('.ov-barras__relleno').data(filas);
    if (reducido) {
      rellenos.style('width', (d) => `${x(d.valor)}%`);
    } else {
      rellenos
        .transition()
        .duration(720)
        .delay((_, i) => i * 50)
        .style('width', (d) => `${x(d.valor)}%`);
    }
    return () => selectAll(raiz.current?.querySelectorAll('.ov-barras__relleno') ?? []).interrupt();
  }, [filas, maximo, reducido]);

  return (
    <ul ref={raiz} className="ov-barras">
      {filas.map((f) => {
        const contenido = (
          <>
            <span className="ov-barras__etiqueta">
              {f.glifo}
              {f.etiqueta}
            </span>
            <span className="ov-barras__pista" aria-hidden="true">
              <span className="ov-barras__relleno" style={{ background: f.color ?? 'var(--ov-neutro)' }} />
            </span>
            <span className="ov-barras__valor">
              <strong>{f.valor}</strong> <span>{f.porcentaje}</span>
            </span>
          </>
        );
        return (
          <li key={f.clave}>
            {alPulsar ? (
              <button
                type="button"
                className="ov-barras__fila ov-barras__fila--boton"
                aria-pressed={seleccion.includes(f.clave)}
                onClick={() => alPulsar(f.clave)}
              >
                <span className="ov-oculto">{accion} </span>
                {contenido}
              </button>
            ) : (
              <div className="ov-barras__fila">{contenido}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
