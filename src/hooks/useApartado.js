import { useEffect } from 'react';
import { useParams } from 'react-router';
import useMovimientoReducido from './useMovimientoReducido.js';

/**
 * Lleva la vista al apartado indicado en la ruta (/seccion/:apartado)
 * y pone el foco en su encabezado, para que los enlaces a un apartado
 * concreto (desde el pie, desde otra sección o compartidos) funcionen
 * con HashRouter, donde no se pueden usar anclas #.
 */
export default function useApartado(listo = true) {
  const { apartado } = useParams();
  const reducido = useMovimientoReducido();
  useEffect(() => {
    if (!apartado || !listo) return;
    const destino = document.getElementById(`ov-ap-${apartado}`);
    if (!destino) return;
    const id = requestAnimationFrame(() => {
      destino.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
      const encabezado = destino.matches('h1,h2,h3') ? destino : destino.querySelector('h2, h3');
      if (encabezado) {
        if (!encabezado.hasAttribute('tabindex')) encabezado.setAttribute('tabindex', '-1');
        encabezado.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [apartado, listo, reducido]);
  return apartado;
}
