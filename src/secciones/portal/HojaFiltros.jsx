import { useEffect, useRef } from 'react';
import Filtros from './Filtros.jsx';

/**
 * Hoja inferior de filtros para móvil. Es un <dialog> nativo abierto con
 * showModal(): atrapa el foco, se cierra con Escape y devuelve el foco al
 * botón que la abrió.
 */
export default function HojaFiltros({ abierta, alCerrar, filtros, alCambiar, alLimpiar, mostradas }) {
  const dialogo = useRef(null);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierta && !d.open) d.showModal();
    if (!abierta && d.open) d.close();
  }, [abierta]);

  return (
    <dialog
      ref={dialogo}
      className="ov-hoja"
      aria-labelledby="ov-hoja-titulo"
      onClose={alCerrar}
      onClick={(e) => {
        if (e.target === dialogo.current) alCerrar();
      }}
    >
      <div className="ov-hoja__interior">
        <div className="ov-hoja__cabeza">
          <span className="ov-hoja__asa" aria-hidden="true" />
          <h2 id="ov-hoja-titulo" className="ov-h3">
            Filtrar verificaciones
          </h2>
          <button type="button" className="ov-boton-sec ov-hoja__cerrar" onClick={alCerrar}>
            Cerrar
          </button>
        </div>
        <Filtros filtros={filtros} alCambiar={alCambiar} alLimpiar={alLimpiar} idBase="ov-hoja" />
        <div className="ov-hoja__pie">
          <button type="button" className="ov-boton ov-hoja__ver" onClick={alCerrar}>
            {mostradas === 1 ? 'Ver 1 verificación' : `Ver ${mostradas} verificaciones`}
          </button>
        </div>
      </div>
    </dialog>
  );
}
