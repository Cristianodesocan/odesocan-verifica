import Pendiente from './Pendiente.jsx';
import { PLAZOS, CONSERVACION } from '../config/plazos.js';

/**
 * Muestra un plazo leído de src/config/plazos.js. Si está pendiente de
 * validar, añade la marca «[plazo pendiente de validar]».
 */
export default function Plazo({ clave }) {
  const p = PLAZOS[clave] ?? CONSERVACION[clave];
  if (!p) return <Pendiente>plazo sin configurar</Pendiente>;
  if (!p.texto) return <Pendiente detalle={p.discrepancia}>plazo pendiente de validar</Pendiente>;
  return (
    <>
      {p.pendiente ? `[${p.texto}]` : p.texto}
      {p.pendiente && (
        <>
          {' '}
          <Pendiente detalle={p.discrepancia}>plazo pendiente de validar</Pendiente>
        </>
      )}
    </>
  );
}
