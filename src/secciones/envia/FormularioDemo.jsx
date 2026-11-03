import { forwardRef, useId, useRef, useState } from 'react';
import { Enlace } from '../../componentes/Enlace.jsx';
import Plazo from '../../componentes/Plazo.jsx';
import { ENTIDAD } from '../../config/sitio.js';

const CONSENTIMIENTO =
  'He leído esta información, acepto el tratamiento de mis datos para esta finalidad y tengo 14 años o más';

/**
 * Formulario de demostración. NO ENVÍA NADA: intercepta el envío, valida en
 * el navegador y muestra una confirmación simulada. Ningún dato sale del
 * navegador ni se guarda (ni siquiera en localStorage). La política de
 * contenidos de la página (form-action 'none') impide además cualquier
 * envío real.
 */
const FormularioDemo = forwardRef(function FormularioDemo(_, ref) {
  const id = useId();
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [archivo, setArchivo] = useState('');
  const resumen = useRef(null);
  const confirmacion = useRef(null);

  const alEnviar = (e) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const nuevos = {};
    const texto = String(datos.get('contenido') ?? '').trim();
    if (!texto && !archivo) nuevos.contenido = 'Escribe o pega el contenido, o adjunta un archivo.';
    if (!datos.get('consentimiento')) nuevos.consentimiento = 'Para enviar el contenido tienes que marcar esta casilla.';
    setErrores(nuevos);
    if (Object.keys(nuevos).length) {
      requestAnimationFrame(() => resumen.current?.focus());
      return;
    }
    e.currentTarget.reset();
    setArchivo('');
    setEnviado(true);
    requestAnimationFrame(() => confirmacion.current?.focus());
  };

  if (enviado) {
    return (
      <div ref={confirmacion} className="ov-formulario__confirmacion" tabIndex={-1} role="status">
        <p className="ov-sello">Demostración</p>
        <h3 className="ov-h3">Así se confirmaría el envío</h3>
        <p>
          En el servicio real, aquí te diríamos que hemos recibido el contenido y que te responderemos por el medio de contacto que nos hayas
          dejado. <strong>En este prototipo no se ha enviado nada</strong>: ningún dato ha salido de tu navegador.
        </p>
        <button type="button" className="ov-boton-sec" onClick={() => setEnviado(false)}>
          Volver al formulario
        </button>
      </div>
    );
  }

  const hayErrores = Object.keys(errores).length > 0;

  return (
    <form ref={ref} className="ov-formulario" noValidate onSubmit={alEnviar} aria-labelledby={`${id}-titulo`}>
      <p className="ov-formulario__demo">
        <span className="ov-sello">Demostración</span> Este formulario no envía nada: sirve para enseñar cómo funcionará.
      </p>
      <h3 id={`${id}-titulo`} className="ov-oculto">
        Formulario para enviar un contenido
      </h3>

      {hayErrores && (
        <div ref={resumen} className="ov-formulario__errores" tabIndex={-1} role="alert">
          <p>Revisa estos campos antes de enviar:</p>
          <ul>
            {Object.entries(errores).map(([campo, msg]) => (
              <li key={campo}>
                <a href={`#${id}-${campo}`} onClick={(e) => { e.preventDefault(); document.getElementById(`${id}-${campo}`)?.focus(); }}>
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="ov-campo">
        <label htmlFor={`${id}-contenido`} className="ov-campo__etiqueta">
          Contenido que quieres que revisemos
        </label>
        <p id={`${id}-contenido-ayuda`} className="ov-campo__ayuda">
          Pega el texto o el enlace, o adjunta una captura, un audio o un vídeo.
        </p>
        <textarea
          id={`${id}-contenido`}
          name="contenido"
          rows={4}
          className="ov-campo__control"
          aria-describedby={`${id}-contenido-ayuda${errores.contenido ? ` ${id}-contenido-error` : ''}`}
          aria-invalid={Boolean(errores.contenido)}
        />
        {errores.contenido && (
          <p id={`${id}-contenido-error`} className="ov-campo__error">
            {errores.contenido}
          </p>
        )}
        <label className="ov-campo__archivo">
          <span className="ov-boton-sec">Adjuntar un archivo</span>
          <input type="file" name="archivo" className="ov-oculto" accept="image/*,video/*,audio/*,.pdf" onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? '')} />
          <span className="ov-campo__nombre-archivo">{archivo || 'Ningún archivo seleccionado'}</span>
        </label>
      </div>

      <div className="ov-campo">
        <label htmlFor={`${id}-contexto`} className="ov-campo__etiqueta">
          Contexto <span className="ov-campo__opcional">(opcional)</span>
        </label>
        <p id={`${id}-contexto-ayuda`} className="ov-campo__ayuda">
          Dónde lo viste, cuándo y por qué te genera dudas.
        </p>
        <textarea id={`${id}-contexto`} name="contexto" rows={3} className="ov-campo__control" aria-describedby={`${id}-contexto-ayuda`} />
      </div>

      <div className="ov-formulario__fila">
        <div className="ov-campo">
          <label htmlFor={`${id}-nombre`} className="ov-campo__etiqueta">
            Nombre o alias <span className="ov-campo__opcional">(opcional)</span>
          </label>
          <input id={`${id}-nombre`} name="nombre" className="ov-campo__control" autoComplete="nickname" />
        </div>
        <div className="ov-campo">
          <label htmlFor={`${id}-contacto`} className="ov-campo__etiqueta">
            Medio de contacto <span className="ov-campo__opcional">(opcional)</span>
          </label>
          <p id={`${id}-contacto-ayuda`} className="ov-campo__ayuda">
            Un correo o un teléfono. Solo se usa para responderte.
          </p>
          <input id={`${id}-contacto`} name="contacto" className="ov-campo__control" aria-describedby={`${id}-contacto-ayuda`} />
        </div>
      </div>

      <div className="ov-formulario__avisos">
        <p>
          No incluyas datos de salud, de ideología ni de otras categorías especiales que no sean imprescindibles para entender el contenido.
        </p>
        <p>
          Este canal no es un sistema de información de la Ley 2/2023, de protección de las personas que informan sobre infracciones
          normativas.
        </p>
      </div>

      {/* Primera capa de información sobre protección de datos, visible antes de enviar. */}
      <section className="ov-capa" aria-labelledby={`${id}-capa`}>
        <h4 id={`${id}-capa`} className="ov-capa__titulo">
          Información básica sobre protección de datos
        </h4>
        <dl className="ov-capa__datos">
          <div>
            <dt>Responsable</dt>
            <dd>{ENTIDAD.siglas} ({ENTIDAD.nombre}).</dd>
          </div>
          <div>
            <dt>Finalidad</dt>
            <dd>Valorar y, en su caso, verificar el contenido que envías y responderte.</dd>
          </div>
          <div>
            <dt>Base jurídica</dt>
            <dd>Tu consentimiento.</dd>
          </div>
          <div>
            <dt>Conservación</dt>
            <dd>
              Si el contenido no se verifica, <Plazo clave="contenido_no_verificado" />. Los datos de contacto, <Plazo clave="datos_contacto" />.
            </dd>
          </div>
          <div>
            <dt>Derechos</dt>
            <dd>
              Acceso, rectificación, supresión y el resto de derechos, escribiendo a <a href={`mailto:${ENTIDAD.correo}`}>{ENTIDAD.correo}</a>.
            </dd>
          </div>
          <div>
            <dt>Más información</dt>
            <dd>
              <Enlace to="/transparencia/datos">Política de protección de datos</Enlace>
            </dd>
          </div>
        </dl>
      </section>

      <div className="ov-campo">
        <label className={`ov-casilla ${errores.consentimiento ? 'ov-casilla--error' : ''}`}>
          <input
            id={`${id}-consentimiento`}
            type="checkbox"
            name="consentimiento"
            aria-invalid={Boolean(errores.consentimiento)}
            aria-describedby={errores.consentimiento ? `${id}-consentimiento-error` : undefined}
            required
          />
          <span className="ov-casilla__marca" aria-hidden="true" />
          <span>{CONSENTIMIENTO}</span>
        </label>
        {errores.consentimiento && (
          <p id={`${id}-consentimiento-error`} className="ov-campo__error">
            {errores.consentimiento}
          </p>
        )}
      </div>

      <div className="ov-campo">
        <label className="ov-casilla">
          <input type="checkbox" name="boletin" />
          <span className="ov-casilla__marca" aria-hidden="true" />
          <span>Quiero recibir también el boletín de ODESOCAN (opcional).</span>
        </label>
      </div>

      <div className="ov-formulario__enviar">
        <button type="submit" className="ov-boton">
          Enviar contenido
        </button>
      </div>
    </form>
  );
});

export default FormularioDemo;
