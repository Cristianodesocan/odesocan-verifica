import HeroMira from './HeroMira.jsx';
import { Enlace } from '../../componentes/Enlace.jsx';
import GlifoSeccion from '../../componentes/GlifoSeccion.jsx';
import TarjetaVerificacion from '../../componentes/TarjetaVerificacion.jsx';
import useVerificaciones from '../../hooks/useVerificaciones.js';
import { SECCIONES } from '../../config/secciones.js';
import './inicio.css';

/**
 * Inicio: hero con la mira, acceso a las cuatro secciones, las tres
 * últimas verificaciones y el acceso a Transparencia.
 */
export default function Inicio() {
  const { estado, datos, meta } = useVerificaciones();
  const ultimas = datos.slice(0, 3);

  return (
    <>
      <HeroMira />

      <section className="ov-contenedor ov-inicio__bloque" aria-labelledby="ov-inicio-secciones">
        <h2 id="ov-inicio-secciones" className="ov-h2">
          Por dónde empezar
        </h2>
        <ol className="ov-filas">
          {SECCIONES.map((s) => (
            <li key={s.id}>
              <Enlace to={s.ruta} className={`ov-fila ov-fila--${s.id}`}>
                <span className="ov-fila__glifo">
                  <GlifoSeccion seccion={s.id} tamano={44} />
                </span>
                <span className="ov-fila__numero" aria-hidden="true">
                  {s.numero}
                </span>
                <span className="ov-fila__titulo">{s.titulo}</span>
                <span className="ov-fila__descripcion">{s.descripcion}</span>
              </Enlace>
            </li>
          ))}
        </ol>
      </section>

      <section className="ov-contenedor ov-inicio__bloque" aria-labelledby="ov-inicio-ultimas">
        <div className="ov-inicio__cabeza">
          <h2 id="ov-inicio-ultimas" className="ov-h2">
            Últimas verificaciones
          </h2>
          <Enlace to="/portal" className="ov-enlace-accion">
            Ver todas en el portal
          </Enlace>
        </div>
        {meta.ejemplo && (
          <p className="ov-inicio__ejemplo">
            Verificaciones de ejemplo: el servicio aún no ha publicado ninguna.
          </p>
        )}
        {estado === 'cargando' && <p className="ov-cargando ov-inicio__reserva">Cargando las últimas verificaciones…</p>}
        {estado === 'error' && (
          <p className="ov-aviso">No se han podido cargar las verificaciones. Vuelve a cargar la página.</p>
        )}
        {estado === 'listo' && (
          <ul className="ov-ultimas">
            {ultimas.map((v) => (
              <li key={v.id}>
                <TarjetaVerificacion v={v} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="ov-contenedor ov-inicio__bloque ov-inicio__confianza" aria-labelledby="ov-inicio-confianza">
        <h2 id="ov-inicio-confianza" className="ov-h2">
          Quién está detrás
        </h2>
        <p>
          Odesocan Verifica es un servicio de la Fundación Canaria Observatorio de Derechos Sociales de Canarias. En Transparencia se
          explica quién ejerce el control editorial, quién es titular de la fundación, cómo se financia, cómo se protege la independencia
          del servicio y cómo se corrigen los errores.
        </p>
        <p>
          <Enlace to="/transparencia" className="ov-boton-sec">
            Ir a Transparencia
          </Enlace>
        </p>
      </section>
    </>
  );
}
