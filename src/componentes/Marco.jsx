import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useMatches } from 'react-router';
import Movimiento from './Movimiento.jsx';
import SaltarContenido from './SaltarContenido.jsx';
import BandaPrototipo from './BandaPrototipo.jsx';
import Cabecera from './Cabecera.jsx';
import BarraPestanas from './BarraPestanas.jsx';
import Pie from './Pie.jsx';
import '../estilos/marco.css';
import '../estilos/componentes.css';

const SUFIJO = 'Odesocan Verifica (prototipo)';

/**
 * Marco común: raíz .ov-app, banda de prototipo, cabecera, contenido,
 * pie y barra de pestañas. Gestiona el título del documento y lleva el
 * foco al encabezado principal al cambiar de página, para que quien usa
 * un lector de pantalla sepa que ha cambiado.
 */
export default function Marco() {
  const coincidencias = useMatches();
  const hoja = coincidencias[coincidencias.length - 1];
  const titulo = [...coincidencias].reverse().find((c) => c.handle?.titulo)?.handle.titulo;
  const anterior = useRef(null);

  useEffect(() => {
    document.title = titulo ? `${titulo} | ${SUFIJO}` : SUFIJO;
  }, [titulo]);

  useEffect(() => {
    if (anterior.current && anterior.current !== hoja?.id) {
      const h1 = document.querySelector('#ov-contenido h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    }
    anterior.current = hoja?.id;
  }, [hoja?.id]);

  return (
    <Movimiento>
      <div className="ov-app">
        <SaltarContenido />
        <BandaPrototipo />
        <Cabecera />
        <main id="ov-contenido" className="ov-principal" tabIndex={-1}>
          <Outlet />
        </main>
        <Pie />
        <BarraPestanas />
      </div>
      <ScrollRestoration />
    </Movimiento>
  );
}
