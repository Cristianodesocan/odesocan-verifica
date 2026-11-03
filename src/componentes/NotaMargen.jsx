import { useId, useState } from 'react';
import useMediaQuery, { ESCRITORIO } from '../hooks/useMediaQuery.js';
import Mira from './Mira.jsx';

/**
 * Nota al margen: dice de dónde sale una afirmación de la interfaz (un
 * artículo del Código, un documento del servicio, un artículo de los
 * Estatutos). En escritorio se lee en la columna derecha; en móvil se
 * despliega dentro del texto con un toque.
 */
export function NotaMargen({ children }) {
  const escritorio = useMediaQuery(ESCRITORIO);
  const [abierta, setAbierta] = useState(false);
  const id = useId();

  if (escritorio) {
    return (
      <aside className="ov-nota">
        <Mira tamano={12} grosorTrazo={9} className="ov-nota__marca" />
        <div className="ov-nota__texto">{children}</div>
      </aside>
    );
  }
  return (
    <div className="ov-nota-movil">
      <button
        type="button"
        className="ov-nota-movil__boton"
        aria-expanded={abierta}
        aria-controls={id}
        onClick={() => setAbierta((a) => !a)}
      >
        <Mira tamano={14} grosorTrazo={9} />
        {abierta ? 'Ocultar la fuente' : 'Ver la fuente'}
      </button>
      <div id={id} className="ov-nota-movil__texto" hidden={!abierta}>
        {children}
      </div>
    </div>
  );
}

/**
 * Bloque de lectura: el texto en la columna central y, si la hay, su nota
 * en la columna del margen, alineada con el principio del bloque.
 */
export function Bloque({ nota, children, ancho = false, className = '' }) {
  return (
    <div className={`ov-bloque ${ancho ? 'ov-bloque--ancho' : ''} ${className}`}>
      <div className="ov-bloque__principal">{children}</div>
      {nota && <NotaMargen>{nota}</NotaMargen>}
    </div>
  );
}
