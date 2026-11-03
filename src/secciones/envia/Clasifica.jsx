import { useRef, useState } from 'react';
import * as m from 'motion/react-m';
import { useMotionValue, useTransform, animate } from 'motion/react';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { ENUNCIADOS } from '../../contenido/envia.js';

const UMBRAL = 90;

/**
 * «¿Esto se puede verificar?»: seis enunciados genéricos que la persona
 * clasifica. En móvil se desliza la tarjeta (derecha: se puede verificar;
 * izquierda: no); en escritorio, botones; con teclado, las flechas
 * izquierda y derecha sobre la tarjeta. Nada se guarda.
 */
export default function Clasifica() {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [aciertos, setAciertos] = useState(0);
  const reducido = useMovimientoReducido();
  const x = useMotionValue(0);
  const giro = useTransform(x, [-200, 200], [-8, 8]);
  const opacidadSi = useTransform(x, [20, UMBRAL], [0, 1]);
  const opacidadNo = useTransform(x, [-UMBRAL, -20], [1, 0]);
  const tarjeta = useRef(null);

  const enunciado = ENUNCIADOS[indice];
  const terminado = indice >= ENUNCIADOS.length;

  const responder = (verificable) => {
    if (respuesta !== null || terminado) return;
    setRespuesta(verificable);
    if (verificable === enunciado.verificable) setAciertos((a) => a + 1);
    const destino = verificable ? 32 : -32;
    if (reducido) x.set(0);
    else animate(x, destino, { type: 'spring', stiffness: 300, damping: 26 });
  };

  const siguiente = () => {
    setRespuesta(null);
    x.set(0);
    setIndice((i) => i + 1);
    requestAnimationFrame(() => tarjeta.current?.focus());
  };

  const alTeclado = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      responder(true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      responder(false);
    }
  };

  if (terminado) {
    return (
      <div className="ov-clasifica ov-clasifica--final" role="status">
        <p className="ov-clasifica__resultado">
          Has acertado {aciertos} de {ENUNCIADOS.length}.
        </p>
        <p>
          La regla es sencilla: se verifican datos, cifras, normas, hechos, imágenes y vídeos, y no se verifican opiniones, valores, promesas
          ni predicciones. Si dudas, envíalo igualmente y te lo explicamos.
        </p>
        <button
          type="button"
          className="ov-boton-sec"
          onClick={() => {
            setIndice(0);
            setAciertos(0);
            setRespuesta(null);
            x.set(0);
          }}
        >
          Volver a empezar
        </button>
      </div>
    );
  }

  const acierto = respuesta !== null && respuesta === enunciado.verificable;

  return (
    <div className="ov-clasifica">
      <p className="ov-clasifica__posicion">
        {indice + 1} de {ENUNCIADOS.length}
        <span className="ov-clasifica__pista-gesto">Desliza la tarjeta o usa los botones</span>
      </p>
      <div className="ov-clasifica__mesa">
        <m.span className="ov-clasifica__lado ov-clasifica__lado--no" style={{ opacity: opacidadNo }} aria-hidden="true">
          No se puede verificar
        </m.span>
        <m.span className="ov-clasifica__lado ov-clasifica__lado--si" style={{ opacity: opacidadSi }} aria-hidden="true">
          Se puede verificar
        </m.span>
        <m.div
          ref={tarjeta}
          className={`ov-clasifica__tarjeta ${respuesta !== null ? 'ov-clasifica__tarjeta--respondida' : ''}`}
          style={{ x, rotate: giro }}
          drag={respuesta === null ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(_, info) => {
            if (info.offset.x > UMBRAL) responder(true);
            else if (info.offset.x < -UMBRAL) responder(false);
          }}
          tabIndex={0}
          onKeyDown={alTeclado}
          role="group"
          aria-roledescription="tarjeta"
          aria-label={`Enunciado ${indice + 1} de ${ENUNCIADOS.length}. Flecha derecha: se puede verificar. Flecha izquierda: no se puede verificar.`}
        >
          <p className="ov-clasifica__texto">«{enunciado.texto}»</p>
        </m.div>
      </div>

      <div className="ov-clasifica__botones">
        <button type="button" className="ov-boton-sec" onClick={() => responder(false)} disabled={respuesta !== null}>
          No se puede verificar
        </button>
        <button type="button" className="ov-boton-sec" onClick={() => responder(true)} disabled={respuesta !== null}>
          Se puede verificar
        </button>
      </div>

      <div className="ov-clasifica__respuesta" role="status" aria-live="polite">
        {respuesta !== null && (
          <>
            <p className="ov-clasifica__veredicto">
              {acierto ? 'Correcto.' : 'No exactamente.'} {enunciado.verificable ? 'Se puede verificar.' : 'No se puede verificar.'}
            </p>
            <p>{enunciado.explicacion}</p>
          </>
        )}
      </div>
      {respuesta !== null && (
        <button type="button" className="ov-boton" onClick={siguiente}>
          {indice === ENUNCIADOS.length - 1 ? 'Ver el resultado' : 'Siguiente enunciado'}
        </button>
      )}
    </div>
  );
}
