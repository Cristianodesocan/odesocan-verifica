import { useRef } from 'react';
import { Enlace } from '../../componentes/Enlace.jsx';
import { Bloque } from '../../componentes/NotaMargen.jsx';
import useApartado from '../../hooks/useApartado.js';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { ENTIDAD } from '../../config/sitio.js';
import { DESPUES } from '../../contenido/envia.js';
import Triaje from './Triaje.jsx';
import Clasifica from './Clasifica.jsx';
import FormularioDemo from './FormularioDemo.jsx';
import './envia.css';

/**
 * Envía un contenido: qué se verifica y qué no, el triaje que recomienda
 * el canal, «¿Esto se puede verificar?», qué pasa después, el formulario de
 * demostración y el acceso directo para pedir una corrección.
 *
 * El triaje va justo después de la invitación porque es la tarea principal
 * de la página, y la mira de la sección anterior se transforma en su foco.
 */
export default function Envia() {
  useApartado();
  const reducido = useMovimientoReducido();
  const formulario = useRef(null);

  const irAlFormulario = () => {
    const seccion = document.getElementById('ov-ap-formulario');
    seccion?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    requestAnimationFrame(() => formulario.current?.querySelector('textarea')?.focus({ preventScroll: true }));
  };

  return (
    <>
      <div className="ov-contenedor ov-cabeza">
        <h1 className="ov-titulo">Envía un contenido</h1>
        <p className="ov-sumario ov-sumario--ancho">
          Si algo que circula sobre derechos sociales en Canarias te genera dudas, envíanoslo: te responderemos siempre, también cuando no se
          pueda verificar.
        </p>
        <div className="ov-entradilla">
          <Bloque nota="Código EFCSN, artículo 2.D: un canal público para enviar afirmaciones, que anime a usarlo y aclare qué se verifica y qué no.">
            <div className="ov-que-si-no">
              <div>
                <h2 className="ov-h3">Qué verificamos</h2>
                <p>Datos, cifras, normas, hechos, imágenes y vídeos: todo lo que se puede contrastar con una fuente.</p>
              </div>
              <div>
                <h2 className="ov-h3">Qué no verificamos</h2>
                <p>Opiniones, valores, promesas y predicciones, porque no hay un dato con el que contrastarlos.</p>
              </div>
            </div>
          </Bloque>
        </div>
      </div>

      <section className="ov-contenedor ov-envia__bloque" id="ov-ap-triaje" aria-labelledby="ov-h-triaje">
        <h2 id="ov-h-triaje" className="ov-h2">
          Te ayudamos a elegir el canal
        </h2>
        <p className="ov-envia__intro">Responde a dos preguntas y te diremos por dónde llega antes tu contenido.</p>
        <Triaje alIrAlFormulario={irAlFormulario} />
      </section>

      <section className="ov-contenedor ov-envia__bloque" id="ov-ap-se-puede" aria-labelledby="ov-h-se-puede">
        <h2 id="ov-h-se-puede" className="ov-h2">
          ¿Esto se puede verificar?
        </h2>
        <p className="ov-envia__intro">Seis frases para practicar. Decide si cada una se puede verificar o no, y te explicamos por qué.</p>
        <Clasifica />
      </section>

      <section className="ov-contenedor ov-envia__bloque" id="ov-ap-despues" aria-labelledby="ov-h-despues">
        <h2 id="ov-h-despues" className="ov-h2">
          Qué pasa después
        </h2>
        <ol className="ov-despues">
          {DESPUES.map((d, i) => (
            <li key={d.titulo} className="ov-despues__paso">
              <span className="ov-despues__numero" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="ov-h3">{d.titulo}</h3>
              <p>{d.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ov-contenedor ov-envia__bloque" id="ov-ap-formulario" aria-labelledby="ov-h-formulario">
        <h2 id="ov-h-formulario" className="ov-h2">
          Formulario web
        </h2>
        <p className="ov-envia__intro">Para enlaces y contenidos que necesitan contexto.</p>
        <FormularioDemo ref={formulario} />
      </section>

      <section className="ov-contenedor ov-envia__bloque" id="ov-ap-correccion" aria-labelledby="ov-h-correccion">
        <h2 id="ov-h-correccion" className="ov-h2">
          Pedir una corrección
        </h2>
        <Bloque nota="Código EFCSN, artículo 3.3.G: canales directos para pedir una corrección.">
          <p>
            Si crees que una verificación publicada tiene un error, escríbenos indicando su identificador, que empieza por OV, y qué crees
            que está mal. Cada solicitud se valora y, si procede, la corrección se explica en la propia ficha y en el registro de
            correcciones.
          </p>
          <p className="ov-envia__acciones">
            <a className="ov-boton-sec" href={`mailto:${ENTIDAD.correo}?subject=${encodeURIComponent('Solicitud de corrección')}`}>
              Pedir una corrección por correo
            </a>
            <Enlace to="/transparencia/correcciones">Leer la política de correcciones</Enlace>
          </p>
        </Bloque>
      </section>
    </>
  );
}
