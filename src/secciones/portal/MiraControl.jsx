import { MARCAS, MIRA } from '../../componentes/Mira.jsx';
import { NOMBRES_DIMENSIONES } from './filtros.js';

/**
 * La mira como control del portal: el número de verificaciones que se
 * muestran va en el centro y cada marca cardinal se enciende cuando hay un
 * filtro activo en su dimensión (norte: fecha; este: calificación; sur:
 * temática; oeste: búsqueda). Es el destino de la transición compartida
 * desde las otras secciones (view-transition-name: ov-mira).
 */
export default function MiraControl({ mostradas, activas, tamano = 116, conLeyenda = true, transicion = true }) {
  return (
    <div className={`ov-control ${conLeyenda ? 'ov-control--leyenda' : ''}`}>
      <svg
        className="ov-control__mira"
        width={tamano}
        height={tamano}
        viewBox="-50 -50 100 100"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={transicion ? { viewTransitionName: 'ov-mira' } : undefined}
      >
        <circle r={MIRA.radio} className="ov-control__anillo" strokeWidth={3.5} />
        {MARCAS.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={activas[i] ? 'ov-control__marca ov-control__marca--activa' : 'ov-control__marca'}
            strokeWidth={activas[i] ? 7 : 3.5}
            strokeLinecap="round"
          />
        ))}
        <text className="ov-control__cifra" textAnchor="middle" dominantBaseline="central" y="1">
          {mostradas}
        </text>
      </svg>
      {conLeyenda &&
        NOMBRES_DIMENSIONES.map((n, i) => (
          <span key={n} className={`ov-control__etiqueta ov-control__etiqueta--${i} ${activas[i] ? 'ov-control__etiqueta--activa' : ''}`} aria-hidden="true">
            {n.charAt(0).toUpperCase() + n.slice(1)}
          </span>
        ))}
    </div>
  );
}
