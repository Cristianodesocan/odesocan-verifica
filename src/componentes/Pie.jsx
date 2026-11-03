import { Enlace } from './Enlace.jsx';
import Pendiente from './Pendiente.jsx';
import Marca from './Marca.jsx';
import { ENTIDAD } from '../config/sitio.js';
import { REDES } from '../config/canales.js';

/**
 * Pie de página: datos de registro de la entidad (artículo 5.2.A del
 * Código EFCSN), enlaces a la capa de Transparencia, contacto y redes.
 */
export default function Pie() {
  return (
    <footer className="ov-pie ov-navy">
      <div className="ov-pie__interior ov-contenedor">
        <div className="ov-pie__entidad">
          <Marca claro />
          <p className="ov-pie__descripcion">
            Odesocan Verifica es el servicio de verificación de la {ENTIDAD.nombre} ({ENTIDAD.siglas}).
          </p>
          <dl className="ov-pie__registro">
            <div>
              <dt>CIF</dt>
              <dd>{ENTIDAD.cif}</dd>
            </div>
            <div>
              <dt>Domicilio</dt>
              <dd>{ENTIDAD.domicilio}</dd>
            </div>
            <div>
              <dt>Entidad fundadora</dt>
              <dd>{ENTIDAD.entidad_fundadora}</dd>
            </div>
            <div>
              <dt>Número de registro</dt>
              <dd>{ENTIDAD.numero_registro ?? <Pendiente />}</dd>
            </div>
          </dl>
        </div>

        <nav className="ov-pie__nav" aria-label="Transparencia y políticas">
          <h2 className="ov-pie__titulo">Transparencia</h2>
          <ul>
            <li><Enlace to="/transparencia">Quiénes somos y cómo nos financiamos</Enlace></li>
            <li><Enlace to="/transparencia/independencia">Independencia y no partidismo</Enlace></li>
            <li><Enlace to="/transparencia/correcciones">Política de correcciones</Enlace></li>
            <li><Enlace to="/portal/correcciones">Registro de correcciones</Enlace></li>
            <li><Enlace to="/transparencia/datos">Protección de datos</Enlace></li>
          </ul>
        </nav>

        <div className="ov-pie__contacto">
          <h2 className="ov-pie__titulo">Contacto</h2>
          <p>
            <a href={`mailto:${ENTIDAD.correo}`}>{ENTIDAD.correo}</a>
          </p>
          <h2 className="ov-pie__titulo">Redes de ODESOCAN</h2>
          <ul>
            {REDES.map((r) => (
              <li key={r.id}>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener">
                    {r.nombre} <span className="ov-mono">{r.usuario}</span>
                  </a>
                ) : (
                  <>
                    {r.nombre} <Pendiente detalle={r.pendiente} />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ov-pie__legal ov-contenedor">
        <p>
          Prototipo de diseño sin valor institucional. Sin analítica, sin cookies y con las tipografías alojadas en el propio sitio.
        </p>
      </div>
    </footer>
  );
}
