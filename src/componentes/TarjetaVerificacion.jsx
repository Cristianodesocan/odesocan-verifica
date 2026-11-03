import { Enlace } from './Enlace.jsx';
import Insignia from './Insignia.jsx';
import { fechaCorta } from '../data/formato.js';
import '../estilos/tarjeta.css';

/**
 * Tarjeta de una verificación: el titular con el dato verificado (nunca la
 * afirmación falsa), la calificación, la fecha, la temática, la isla, el
 * tipo de emisora y el identificador. El enlace del titular cubre toda la
 * tarjeta. La insignia comparte nombre de transición con la de la ficha.
 */
export default function TarjetaVerificacion({ v, nivel = 3, grande = false }) {
  const Encabezado = `h${nivel}`;
  return (
    <article className={`ov-tarjeta ${grande ? 'ov-tarjeta--grande' : ''}`}>
      <div className="ov-tarjeta__cabeza">
        <Insignia valor={v.calificacion.valor} nombreTransicion={`ov-insignia-${v.id}`} />
        {v.ejemplo && <span className="ov-sello">Ejemplo</span>}
      </div>
      <Encabezado className="ov-tarjeta__titular">
        <Enlace to={`/portal/${v.id}`} className="ov-tarjeta__enlace">
          {v.titular}
        </Enlace>
      </Encabezado>
      <dl className="ov-tarjeta__datos">
        <div>
          <dt>Publicada</dt>
          <dd>
            <time dateTime={v.fecha_publicacion}>{fechaCorta(v.fecha_publicacion)}</time>
          </dd>
        </div>
        <div>
          <dt>Temática</dt>
          <dd>{v.materia}</dd>
        </div>
        <div>
          <dt>Isla</dt>
          <dd>{v.isla}</dd>
        </div>
        <div>
          <dt>Emisora</dt>
          <dd>{v.afirmacion?.tipo_emisora}</dd>
        </div>
      </dl>
      <p className="ov-tarjeta__id ov-id">{v.id}</p>
    </article>
  );
}
