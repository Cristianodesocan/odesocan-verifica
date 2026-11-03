import GlifoEscala from './GlifoEscala.jsx';
import { categoriaPorValor } from '../config/escala.js';

/**
 * Insignia de calificación: color de la escala, glifo propio y etiqueta,
 * siempre en tinta (ninguna combinación con texto blanco llega a AA).
 */
export default function Insignia({ valor, tamano = 'normal', conValor = false, nombreTransicion }) {
  const c = categoriaPorValor(valor);
  if (!c) return null;
  return (
    <span
      className={`ov-insignia ov-insignia--${c.clave} ov-insignia--${tamano}`}
      style={nombreTransicion ? { viewTransitionName: nombreTransicion } : undefined}
    >
      <GlifoEscala forma={c.forma} tamano={tamano === 'grande' ? 26 : 16} />
      <span className="ov-insignia__texto">
        {conValor && <span className="ov-insignia__valor">{c.valor}</span>}
        {c.etiqueta}
      </span>
    </span>
  );
}
