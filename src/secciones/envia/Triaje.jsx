import { useRef, useState } from 'react';
import * as m from 'motion/react-m';
import Pendiente from '../../componentes/Pendiente.jsx';
import useMediaQuery, { ESCRITORIO } from '../../hooks/useMediaQuery.js';
import { CANALES, canalPorId, EMERGENCIAS } from '../../config/canales.js';
import { NIVELES_DANO, TIPOS_CONTENIDO } from '../../contenido/envia.js';

const resorte = { type: 'spring', stiffness: 360, damping: 32 };

/**
 * Triaje guiado en tres pasos: qué quiere revisar la persona, si puede
 * causar daño en horas o pocos días y el canal recomendado, con su motivo
 * y el resto de canales como alternativa.
 *
 * La mira es el foco del triaje: se cierra sobre la opción elegida y pasa
 * de un paso a otro (layoutId de Motion).
 * Escritorio: tres paneles a la vista. Móvil: un paso a pantalla completa
 * cada vez, con botones grandes.
 */
export default function Triaje({ alIrAlFormulario }) {
  const escritorio = useMediaQuery(ESCRITORIO);
  const [tipo, setTipo] = useState(null);
  const [dano, setDano] = useState(null);
  const [paso, setPaso] = useState(1);
  const raiz = useRef(null);

  const enfocarPaso = (n) =>
    requestAnimationFrame(() => {
      const h = raiz.current?.querySelector(`[data-paso="${n}"] h3`);
      h?.focus({ preventScroll: escritorio });
      if (!escritorio) raiz.current?.scrollIntoView({ block: 'start' });
    });

  const elegirTipo = (id) => {
    setTipo(id);
    setPaso(2);
    if (!escritorio) enfocarPaso(2);
  };
  const elegirDano = (id) => {
    setDano(id);
    setPaso(3);
    if (!escritorio) enfocarPaso(3);
  };
  const reiniciar = () => {
    setTipo(null);
    setDano(null);
    setPaso(1);
    enfocarPaso(1);
  };

  const visible = (n) => escritorio || paso === n;

  return (
    <div ref={raiz} className={`ov-triaje ${escritorio ? 'ov-triaje--paneles' : 'ov-triaje--pasos'}`}>
      {visible(1) && (
        <section className="ov-triaje__panel" data-paso="1" aria-labelledby="ov-triaje-1">
          <p className="ov-triaje__paso">Paso 1 de 3</p>
          <h3 id="ov-triaje-1" className="ov-triaje__titulo" tabIndex={-1}>
            {!tipo && (
              <span className="ov-triaje__foco ov-triaje__foco--titulo" aria-hidden="true">
                <MiraFoco />
              </span>
            )}
            ¿Qué quieres que revisemos?
          </h3>
          <Opciones opciones={TIPOS_CONTENIDO} elegida={tipo} alElegir={elegirTipo} focoActivo={!dano} />
        </section>
      )}

      {visible(2) && (
        <section className={`ov-triaje__panel ${!tipo ? 'ov-triaje__panel--espera' : ''}`} data-paso="2" aria-labelledby="ov-triaje-2">
          <p className="ov-triaje__paso">Paso 2 de 3</p>
          <h3 id="ov-triaje-2" className="ov-triaje__titulo" tabIndex={-1}>
            ¿Puede causar daño a alguien en horas o en pocos días?
          </h3>
          {tipo ? (
            <Opciones opciones={NIVELES_DANO} elegida={dano} alElegir={elegirDano} focoActivo />
          ) : (
            <p className="ov-triaje__espera">Elige antes qué quieres que revisemos.</p>
          )}
          {!escritorio && (
            <button type="button" className="ov-triaje__volver" onClick={() => setPaso(1)}>
              Volver al paso 1
            </button>
          )}
        </section>
      )}

      {visible(3) && (
        <section className={`ov-triaje__panel ov-triaje__panel--canal ${!dano ? 'ov-triaje__panel--espera' : 'ov-navy'}`} data-paso="3" aria-labelledby="ov-triaje-3">
          <p className="ov-triaje__paso">Paso 3 de 3</p>
          <h3 id="ov-triaje-3" className="ov-triaje__titulo" tabIndex={-1}>
            Por dónde enviarlo
          </h3>
          {dano ? (
            <Recomendacion tipo={tipo} dano={dano} alIrAlFormulario={alIrAlFormulario} />
          ) : (
            <p className="ov-triaje__espera">Responde antes a los dos primeros pasos y te diremos qué canal es el más adecuado.</p>
          )}
          {(tipo || dano) && (
            <button type="button" className="ov-triaje__volver" onClick={reiniciar}>
              Empezar de nuevo
            </button>
          )}
        </section>
      )}
    </div>
  );
}

/**
 * La mira del triaje. Solo hay una a la vez (layoutId): al elegir una
 * opción se desliza hasta ella, y es el destino de la transición
 * compartida desde las otras secciones (view-transition-name: ov-mira).
 */
function MiraFoco() {
  return (
    <m.span layoutId="ov-mira-triaje" className="ov-triaje__mira" transition={resorte} style={{ viewTransitionName: 'ov-mira' }}>
      <svg viewBox="-50 -50 100 100" width="100%" height="100%" fill="none">
        <circle r="30" stroke="currentColor" strokeWidth="8" />
        <path d="M0-48V-22M0 22V48M-48 0H-22M22 0H48" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle r="7" fill="currentColor" />
      </svg>
    </m.span>
  );
}

function Opciones({ opciones, elegida, alElegir, focoActivo }) {
  return (
    <ul className="ov-triaje__opciones" role="list">
      {opciones.map((o) => (
        <li key={o.id}>
          <button type="button" className="ov-triaje__opcion" aria-pressed={elegida === o.id} onClick={() => alElegir(o.id)}>
            <span className="ov-triaje__foco" aria-hidden="true">
              {elegida === o.id && focoActivo && <MiraFoco />}
            </span>
            <span>{o.etiqueta}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Recomendacion({ tipo, dano, alIrAlFormulario }) {
  const t = TIPOS_CONTENIDO.find((x) => x.id === tipo);
  const recomendado = canalPorId(t.canal);
  const otros = CANALES.filter((c) => c.id !== recomendado.id);

  return (
    <div className="ov-recomendacion">
      {dano === 'inmediato' && (
        <div className="ov-aviso ov-aviso--urgente ov-recomendacion__112" role="alert">
          <p className="ov-recomendacion__112-titulo">Si hay un riesgo inmediato para una persona, llama primero al 112.</p>
          <a className="ov-boton ov-recomendacion__llamar" href={EMERGENCIAS.enlace}>
            Llamar al 112
          </a>
          <p>
            Después, si quieres, envíanos el contenido. El servicio prioriza estos casos con un protocolo de emergencia, pero no sustituye
            a los servicios de emergencia.
          </p>
        </div>
      )}
      {dano === 'pronto' && (
        <p className="ov-recomendacion__urgente">
          Indícalo al enviarlo: los contenidos que pueden causar daño en poco tiempo se valoran con el protocolo de emergencia, que acorta los
          plazos sin rebajar ninguna garantía.
        </p>
      )}

      <p className="ov-recomendacion__etiqueta">Canal recomendado</p>
      <Canal canal={recomendado} destacado motivo={t.motivo} alIrAlFormulario={alIrAlFormulario} />

      <details className="ov-plegable ov-recomendacion__otros">
        <summary>Otros canales</summary>
        <ul className="ov-plegable__cuerpo ov-canales">
          {otros.map((c) => (
            <li key={c.id}>
              <Canal canal={c} alIrAlFormulario={alIrAlFormulario} />
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

/** Ficha de un canal, con su enlace directo a la aplicación si está disponible. */
export function Canal({ canal, destacado = false, motivo, alIrAlFormulario }) {
  let accion;
  if (!canal.activo) {
    accion = <span className="ov-canal__estado">Canal pendiente de activación</span>;
  } else if (canal.id === 'formulario') {
    accion = (
      <button type="button" className={destacado ? 'ov-boton' : 'ov-boton-sec'} onClick={alIrAlFormulario}>
        {canal.accion}
      </button>
    );
  } else if (!canal.valor) {
    accion = <Pendiente detalle={canal.pendiente}>{canal.id === 'telegram' ? 'usuario pendiente' : 'número pendiente'}</Pendiente>;
  } else {
    accion = (
      <a className={destacado ? 'ov-boton' : 'ov-boton-sec'} href={canal.enlace(canal.valor)} target={canal.id === 'correo' ? undefined : '_blank'} rel="noopener">
        {canal.accion}
      </a>
    );
  }
  return (
    <div className={`ov-canal ${destacado ? 'ov-canal--destacado' : ''} ${!canal.activo ? 'ov-canal--inactivo' : ''}`}>
      <p className="ov-canal__nombre">{canal.nombre}</p>
      {motivo && <p className="ov-canal__motivo">{motivo}</p>}
      <p className="ov-canal__uso">{canal.uso}</p>
      {canal.nota && <p className="ov-canal__nota">{canal.nota}</p>}
      <div className="ov-canal__accion">{accion}</div>
    </div>
  );
}
