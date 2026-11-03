import { EnlaceNav } from './Enlace.jsx';
import GlifoSeccion from './GlifoSeccion.jsx';
import { SECCIONES } from '../config/secciones.js';

/** Barra inferior de cuatro pestañas para móvil, al alcance del pulgar. */
export default function BarraPestanas() {
  return (
    <nav className="ov-pestanas" aria-label="Secciones">
      <ul className="ov-pestanas__lista">
        {SECCIONES.map((s) => (
          <li key={s.id} className="ov-pestanas__item">
            <EnlaceNav to={s.ruta} className="ov-pestanas__enlace">
              <GlifoSeccion seccion={s.id} tamano={26} />
              <span className="ov-pestanas__texto">{s.corto}</span>
            </EnlaceNav>
          </li>
        ))}
      </ul>
    </nav>
  );
}
