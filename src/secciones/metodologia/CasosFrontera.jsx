import { useId, useState } from 'react';
import GlifoEscala from '../../componentes/GlifoEscala.jsx';
import Insignia from '../../componentes/Insignia.jsx';
import { ESCALA } from '../../config/escala.js';
import { CASOS_FRONTERA } from '../../contenido/metodologia.js';

const OPCIONES = [...ESCALA.map((c) => ({ valor: c.valor, etiqueta: c.etiqueta, forma: c.forma, clave: c.clave })), { valor: 0, etiqueta: 'No se califica', clave: 'ninguna' }];

/**
 * «Pon a prueba la escala»: seis casos frontera. La persona elige una
 * calificación y recibe la explicación. Nada se guarda.
 */
export default function CasosFrontera() {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const id = useId();
  const caso = CASOS_FRONTERA[indice];
  const elegida = respuestas[indice];
  const acierto = elegida === caso?.respuesta;
  const terminado = indice >= CASOS_FRONTERA.length;
  const aciertos = Object.entries(respuestas).filter(([i, r]) => CASOS_FRONTERA[i].respuesta === r).length;

  if (terminado) {
    return (
      <div className="ov-prueba">
        <p className="ov-prueba__resultado" role="status">
          Has coincidido con la escala en {aciertos} de los {CASOS_FRONTERA.length} casos.
        </p>
        <p>Los casos frontera son los que más dudas generan, y por eso la metodología los resuelve por escrito antes de que lleguen.</p>
        <button
          type="button"
          className="ov-boton-sec"
          onClick={() => {
            setRespuestas({});
            setIndice(0);
          }}
        >
          Volver a empezar
        </button>
      </div>
    );
  }

  const correcta = OPCIONES.find((o) => o.valor === caso.respuesta);

  return (
    <div className="ov-prueba">
      <p className="ov-prueba__posicion">
        Caso {indice + 1} de {CASOS_FRONTERA.length}
      </p>
      <fieldset className="ov-prueba__caso" aria-describedby={`${id}-caso`}>
        <legend className="ov-oculto">Elige una calificación para este caso</legend>
        <p id={`${id}-caso`} className="ov-prueba__enunciado">
          {caso.caso}
        </p>
        <div className="ov-prueba__opciones">
          {OPCIONES.map((o) => {
            const marcada = elegida === o.valor;
            const esCorrecta = elegida != null && o.valor === caso.respuesta;
            return (
              <button
                key={o.valor}
                type="button"
                className={`ov-prueba__opcion ov-prueba__opcion--${o.clave} ${marcada ? 'ov-prueba__opcion--marcada' : ''} ${esCorrecta ? 'ov-prueba__opcion--correcta' : ''}`}
                aria-pressed={marcada}
                disabled={elegida != null}
                onClick={() => setRespuestas((r) => ({ ...r, [indice]: o.valor }))}
              >
                {o.forma ? <GlifoEscala forma={o.forma} tamano={18} /> : <span className="ov-prueba__sin" aria-hidden="true" />}
                {o.etiqueta}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="ov-prueba__respuesta" role="status" aria-live="polite">
        {elegida != null && (
          <>
            <p className="ov-prueba__veredicto">
              {acierto ? 'Coincides con la escala.' : 'La escala lo resuelve de otra forma.'}{' '}
              <span className="ov-prueba__correcta">
                Calificación: {caso.respuesta ? <Insignia valor={caso.respuesta} /> : <strong>{correcta.etiqueta}</strong>}
              </span>
            </p>
            <p>{caso.explicacion}</p>
          </>
        )}
      </div>

      {elegida != null && (
        <button type="button" className="ov-boton" onClick={() => setIndice((i) => i + 1)}>
          {indice === CASOS_FRONTERA.length - 1 ? 'Ver el resultado' : 'Siguiente caso'}
        </button>
      )}
    </div>
  );
}
