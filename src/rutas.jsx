import { createHashRouter } from 'react-router';
import Marco from './componentes/Marco.jsx';
import ErrorRuta from './componentes/ErrorRuta.jsx';
import Inicio from './secciones/inicio/Inicio.jsx';

/**
 * Rutas. createHashRouter (modo HashRouter) hace que todas las rutas
 * funcionen en GitHub Pages sin configurar el servidor, y es el modo de
 * React Router que admite transiciones de vista.
 *
 * Inicio va en el paquete principal; el resto de secciones se cargan al
 * visitarlas, y el portal (con D3) solo cuando se abre.
 */
const diferida = (cargar) => async () => {
  const modulo = await cargar();
  return { Component: modulo.default };
};

export const router = createHashRouter([
  {
    path: '/',
    element: <Marco />,
    errorElement: <ErrorRuta />,
    children: [
      { index: true, element: <Inicio />, handle: { titulo: null } },
      {
        path: 'que-es-verificar/:apartado?',
        lazy: diferida(() => import('./secciones/que-es/QueEsVerificar.jsx')),
        handle: { titulo: 'Qué es verificar' },
      },
      {
        path: 'metodologia/:apartado?',
        lazy: diferida(() => import('./secciones/metodologia/Metodologia.jsx')),
        handle: { titulo: 'Metodología' },
      },
      {
        path: 'envia/:apartado?',
        lazy: diferida(() => import('./secciones/envia/Envia.jsx')),
        handle: { titulo: 'Envía un contenido' },
      },
      {
        path: 'portal',
        lazy: diferida(() => import('./secciones/portal/Portal.jsx')),
        handle: { titulo: 'Portal de verificaciones' },
      },
      {
        path: 'portal/correcciones',
        lazy: diferida(() => import('./secciones/portal/RegistroCorrecciones.jsx')),
        handle: { titulo: 'Registro de correcciones' },
      },
      {
        path: 'portal/:id',
        lazy: diferida(() => import('./secciones/portal/Ficha.jsx')),
        handle: { titulo: 'Ficha de verificación' },
      },
      {
        path: 'transparencia/:apartado?',
        lazy: diferida(() => import('./secciones/transparencia/Transparencia.jsx')),
        handle: { titulo: 'Transparencia' },
      },
      { path: '*', element: <ErrorRuta />, handle: { titulo: 'Página no encontrada' } },
    ],
  },
]);
