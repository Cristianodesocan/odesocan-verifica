import { isRouteErrorResponse, useRouteError } from 'react-router';
import Marca from './Marca.jsx';
import '../estilos/marco.css';
import '../estilos/componentes.css';

/** Página de error y de ruta inexistente. */
export default function ErrorRuta() {
  const error = useRouteError();
  const noExiste = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="ov-app">
      <main className="ov-principal ov-error ov-contenedor" id="ov-contenido">
        <a href="#/" className="ov-error__marca" aria-label="Odesocan Verifica, inicio">
          <Marca />
        </a>
        <h1 className="ov-titulo">{noExiste ? 'Esta página no existe' : 'No se ha podido mostrar esta página'}</h1>
        <p>
          {noExiste
            ? 'La dirección no corresponde a ninguna página del prototipo. Puede que el enlace esté incompleto.'
            : 'Algo ha fallado al preparar la página. Vuelve a cargarla y, si se repite, escribe a info@odesocan.org.'}
        </p>
        <p>
          <a className="ov-boton" href="#/">
            Volver al inicio
          </a>
        </p>
      </main>
    </div>
  );
}
