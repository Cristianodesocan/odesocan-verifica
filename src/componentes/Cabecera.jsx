import { Enlace, EnlaceNav } from './Enlace.jsx';
import Marca from './Marca.jsx';
import { SECCIONES, TRANSPARENCIA } from '../config/secciones.js';

/**
 * Cabecera. En escritorio, barra superior con las cuatro secciones; en
 * móvil, solo la marca y el acceso a Transparencia (las secciones van en la
 * barra inferior, al alcance del pulgar).
 */
export default function Cabecera() {
  return (
    <header className="ov-cabecera">
      <div className="ov-cabecera__interior ov-contenedor">
        <Enlace to="/" className="ov-cabecera__inicio" aria-label="Odesocan Verifica, inicio">
          <Marca />
        </Enlace>
        <nav className="ov-cabecera__nav" aria-label="Secciones">
          <ol className="ov-cabecera__lista">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <EnlaceNav to={s.ruta} className="ov-cabecera__enlace">
                  <span className="ov-cabecera__numero" aria-hidden="true">
                    {s.numero}
                  </span>
                  {s.id === 'portal' ? 'Portal' : s.titulo}
                </EnlaceNav>
              </li>
            ))}
          </ol>
        </nav>
        <EnlaceNav to={TRANSPARENCIA.ruta} className="ov-cabecera__transparencia">
          Transparencia
        </EnlaceNav>
      </div>
    </header>
  );
}
