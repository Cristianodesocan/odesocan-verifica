import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import 'd3-transition';
import useMovimientoReducido from '../../../hooks/useMovimientoReducido.js';

/**
 * Barra de proporción (parte sobre total), con transición de D3.
 * filas: [{ clave, texto, parte, total }]
 */
export default function Proporcion({ filas }) {
  const raiz = useRef(null);
  const reducido = useMovimientoReducido();
  useEffect(() => {
    const rellenos = select(raiz.current).selectAll('.ov-proporcion__relleno').data(filas);
    const ancho = (d) => `${d.total ? (d.parte / d.total) * 100 : 0}%`;
    (reducido ? rellenos : rellenos.transition().duration(720).delay((_, i) => 120 + i * 80)).style('width', ancho);
  }, [filas, reducido]);
  return (
    <ul ref={raiz} className="ov-proporcion">
      {filas.map((f) => (
        <li key={f.clave} className="ov-proporcion__fila">
          <p className="ov-proporcion__texto">{f.texto}</p>
          <span className="ov-proporcion__pista" aria-hidden="true">
            <span className="ov-proporcion__relleno" />
          </span>
        </li>
      ))}
    </ul>
  );
}
