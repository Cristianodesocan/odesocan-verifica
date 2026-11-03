import IndiceLectura from '../../componentes/IndiceLectura.jsx';
import { Bloque } from '../../componentes/NotaMargen.jsx';
import { Enlace } from '../../componentes/Enlace.jsx';
import Pendiente, { EnlaceDocumento } from '../../componentes/Pendiente.jsx';
import Plazo from '../../componentes/Plazo.jsx';
import useApartado from '../../hooks/useApartado.js';
import { BANDERAS, ENTIDAD, URLS } from '../../config/sitio.js';
import { TRANSPARENCIA } from '../../config/secciones.js';
import './transparencia.css';

/** Una fila de una ficha de datos (modelos de los anexos del Código). */
function Dato({ campo, children }) {
  return (
    <div>
      <dt>{campo}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/**
 * Aviso de la posibilidad de queja ante la EFCSN (artículo 3.3.H). Está
 * preparado, pero solo se muestra cuando ODESOCAN sea miembro verificado
 * (BANDERAS.EFCSN_MIEMBRO en src/config/sitio.js).
 */
export function AvisoQuejaEFCSN() {
  if (!BANDERAS.EFCSN_MIEMBRO) return null;
  return (
    <div className="ov-aviso">
      <p>
        Si consideras que Odesocan Verifica ha incumplido el Código Europeo de Normas para Organizaciones Independientes de Verificación,
        puedes presentar una queja ante la EFCSN.{' '}
        {URLS.EFCSN_QUEJAS_URL ? (
          <a href={URLS.EFCSN_QUEJAS_URL} target="_blank" rel="noopener" hrefLang="en">
            Ir al formulario de quejas de la EFCSN
          </a>
        ) : (
          <Pendiente>enlace al formulario de quejas</Pendiente>
        )}
      </p>
    </div>
  );
}

/**
 * Capa transversal de Transparencia (artículos 3, 4 y 5.2.A del Código
 * EFCSN). Usa texto real donde existe y [pendiente] donde falta el dato,
 * sin inventar ninguno.
 */
export default function Transparencia() {
  useApartado();
  return (
    <div className="ov-contenedor ov-lectura ov-transparencia">
      <div className="ov-lectura__indice">
        <IndiceLectura apartados={TRANSPARENCIA.apartados} base="/transparencia" />
      </div>

      <div className="ov-lectura__cuerpo">
        <div className="ov-cabeza">
          <h1 className="ov-titulo">Transparencia</h1>
          <p className="ov-sumario ov-sumario--ancho">
            Quién está detrás de Odesocan Verifica, quién decide, cómo se financia la fundación y cómo se corrigen los errores.
          </p>
        </div>

        <section className="ov-seccion" id="ov-ap-quienes-somos" aria-labelledby="ov-h-quienes">
          <h2 id="ov-h-quienes" className="ov-h2">
            Quiénes somos y control editorial
          </h2>
          <Bloque nota="Código EFCSN, artículo 4.1.A: estructura de la organización y forma en que se ejerce el control editorial.">
            <p>
              Odesocan Verifica es el servicio de verificación de la {ENTIDAD.nombre} ({ENTIDAD.siglas}). Funciona como una rama
              metodológicamente separada de la investigación y de la incidencia política de la fundación.
            </p>
            <p>
              En cada pieza, el control editorial lo ejerce una persona revisora no vinculada a su investigación ni a su selección, que emite
              un dictamen motivado y asigna la calificación. La dirección de ODESOCAN interviene solo para la consulta por riesgo jurídico, para
              las funciones organizativas y, cuando se le asigna, para la investigación jurídica, y en ningún caso puede modificar contenidos ni
              calificaciones.
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículos 4.1.E y 4.1.F: identidad de las personas responsables y cargos y trayectoria del equipo editorial.">
            <h3 className="ov-h3">Equipo</h3>
            <dl className="ov-datos">
              <Dato campo="Responsables editoriales">
                <Pendiente>nombres y cargos</Pendiente>
              </Dato>
              <Dato campo="Equipo editorial, con su cargo">
                <Pendiente />
              </Dato>
              <Dato campo="Trayectoria anterior relevante">
                <Pendiente />
              </Dato>
            </dl>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-titularidad" aria-labelledby="ov-h-titularidad">
          <h2 id="ov-h-titularidad" className="ov-h2">
            Titularidad y estatuto jurídico
          </h2>
          <Bloque nota="Código EFCSN, artículos 4.1.B y 5.2.A, según el modelo del anexo 4.">
            <dl className="ov-datos">
              <Dato campo="¿Forma parte de una organización más amplia?">Sí. Odesocan Verifica es un servicio de la fundación.</Dato>
              <Dato campo="Denominación">{ENTIDAD.nombre}</Dato>
              <Dato campo="País">{ENTIDAD.pais}</Dato>
              <Dato campo="Forma jurídica">{ENTIDAD.forma_juridica}</Dato>
              <Dato campo="CIF">{ENTIDAD.cif}</Dato>
              <Dato campo="Domicilio">{ENTIDAD.domicilio}</Dato>
              <Dato campo="Entidad fundadora">{ENTIDAD.entidad_fundadora}</Dato>
              <Dato campo="Registro">{ENTIDAD.registro ?? <Pendiente />}</Dato>
              <Dato campo="Número de registro">{ENTIDAD.numero_registro ?? <Pendiente />}</Dato>
              <Dato campo="Titulares de más del 5 % del capital">
                No procede, porque una fundación no tiene capital repartido en participaciones. <Pendiente>a confirmar por el equipo</Pendiente>
              </Dato>
            </dl>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-gobernanza" aria-labelledby="ov-h-gobernanza">
          <h2 id="ov-h-gobernanza" className="ov-h2">
            Gobernanza y estatutos
          </h2>
          <Bloque nota="Código EFCSN, artículos 4.1.C y 4.1.H, según el modelo del anexo 5.">
            <dl className="ov-datos">
              <Dato campo="Órgano">Patronato</Dato>
              <Dato campo="Funciones">
                Es el órgano de gobierno de la fundación. Aprueba la metodología y las directrices de Odesocan Verifica, sin intervenir en la
                selección, el contenido ni la calificación de ninguna pieza.
              </Dato>
              <Dato campo="Composición">
                <Pendiente>nombres y cargos en el Patronato</Pendiente>
              </Dato>
              <Dato campo="Estatutos">
                <EnlaceDocumento url={URLS.ESTATUTOS_PDF_URL}>Estatutos de la fundación (PDF)</EnlaceDocumento>
              </Dato>
            </dl>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-financiacion" aria-labelledby="ov-h-financiacion">
          <h2 id="ov-h-financiacion" className="ov-h2">
            Financiación
          </h2>
          <Bloque nota="Código EFCSN, artículos 4.2.B a 4.2.F, según el modelo del anexo 8.">
            <dl className="ov-datos">
              <Dato campo="Ingresos del último ejercicio cerrado">
                <Pendiente />
              </Dato>
              <Dato campo="Fuentes que aportan más del 5 % de los ingresos">
                <Pendiente />
              </Dato>
              <Dato campo="Otras fuentes relevantes (plataformas, financiación pública y posibles conflictos de interés)">
                <Pendiente />
              </Dato>
              <Dato campo="Compromisos significativos no remunerados con otras organizaciones">
                <Pendiente />
              </Dato>
              <Dato campo="Bienes o servicios recibidos que superan el 5 % de los ingresos netos">
                <Pendiente />
              </Dato>
            </dl>
          </Bloque>
          <Bloque nota="Código EFCSN, artículo 4.2.C: mecanismos que protegen la independencia editorial.">
            <h3 className="ov-h3">Cómo se protege la independencia editorial</h3>
            <p>
              Ninguna entidad que financie a ODESOCAN interviene en la selección, el contenido ni la calificación de las piezas. Si una
              verificación afecta a una entidad que financia a la fundación, se verifica con el mismo estándar que cualquier otra y el vínculo
              se declara en la propia pieza.
            </p>
            <p>
              Naturaleza del trabajo financiado por plataformas o por fuentes públicas: <Pendiente />.
            </p>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-independencia" aria-labelledby="ov-h-independencia">
          <h2 id="ov-h-independencia" className="ov-h2">
            Independencia y no partidismo
          </h2>
          <Bloque nota="Código EFCSN, artículo 4.1.G: misión, valores y directrices internas que protegen la independencia.">
            <h3 className="ov-h3">Misión</h3>
            <p>
              Declaración de misión y valores del servicio: <Pendiente />. Mientras tanto, los fines estatutarios en los que se apoya la
              verificación se explican en{' '}
              <Enlace to="/que-es-verificar/encaje">Cómo encaja en ODESOCAN</Enlace>.
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículos 3.1.I y 3.1.J: políticas de no partidismo y directrices públicas de las organizaciones que hacen incidencia.">
            <h3 className="ov-h3">Resumen de las directrices de independencia</h3>
            <ul className="ov-lista">
              <li>
                La verificación y la incidencia están separadas en los dos sentidos: los hechos verificados no se convierten en incidencia, y
                los hechos que sostienen una iniciativa de incidencia no pasan a verificación.
              </li>
              <li>Las prioridades de incidencia no son un criterio de selección, y nadie de la fundación puede encargar una verificación fuera del cauce ordinario.</li>
              <li>El Patronato aprueba la metodología y las directrices, pero no interviene en la selección, el contenido ni la calificación de ninguna pieza.</li>
              <li>Cada pieza declara sus conflictos de interés, con reglas para los casos en que la emisora es contraparte, financia a ODESOCAN o cita sus datos.</li>
            </ul>
            <p className="ov-transparencia__acciones">
              <Enlace to="/que-es-verificar/dos-caminos">Ver los supuestos en «Dos caminos»</Enlace>
              <Enlace to="/que-es-verificar/no-partidismo">Leer la declaración de no partidismo</Enlace>
            </p>
            <p>
              <EnlaceDocumento url={URLS.DIRECTRICES_INDEPENDENCIA_URL}>Directrices de independencia completas</EnlaceDocumento>
            </p>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-correcciones" aria-labelledby="ov-h-correcciones">
          <h2 id="ov-h-correcciones" className="ov-h2">
            Política de correcciones
          </h2>
          <Bloque nota="Código EFCSN, artículo 3.3.G: canales directos para pedir una corrección.">
            <h3 className="ov-h3">Cómo se pide una corrección</h3>
            <p>
              Por el teléfono de ODESOCAN (<Pendiente>número pendiente</Pendiente>) o por sus redes sociales, indicando el identificador de la
              pieza, que tiene la forma <span className="ov-id">OV-AAAA-NNNN</span>, y el error que has detectado. También puedes escribir a{' '}
              <a href={`mailto:${ENTIDAD.correo}?subject=${encodeURIComponent('Solicitud de corrección')}`}>{ENTIDAD.correo}</a> o usar el botón
              «Pedir una corrección» de cada ficha.
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículo 3.3.F: explicación detallada de cómo se valoran las solicitudes.">
            <h3 className="ov-h3">Cómo se valora</h3>
            <p>
              Las solicitudes se valoran con el mismo sistema que la revisión editorial: una persona de comunicación recibe la solicitud, una
              persona revisora no vinculada a la pieza la valora y, si procede, una persona de investigación aplica la corrección en la web.
            </p>
            <p>
              Plazo de respuesta y detalle del procedimiento: <Pendiente>pendiente de la política de correcciones</Pendiente>.{' '}
              <Enlace to="/metodologia/completa/fase-8">Ver la fase de corrección de errores en la metodología</Enlace>
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículo 3.3.E: política de correcciones y registro de las correcciones del último año.">
            <h3 className="ov-h3">Cómo se publica</h3>
            <p>
              Si procede, la corrección se explica en una nota visible al principio de la propia ficha, y nunca se borra nada en silencio. La
              versión original se conserva en PDF en la misma página, y cada corrección queda en el registro público.
            </p>
            <p className="ov-transparencia__acciones">
              <Enlace to="/portal/correcciones" className="ov-boton-sec">
                Ver el registro de correcciones
              </Enlace>
              <EnlaceDocumento url={URLS.POLITICA_CORRECCIONES_URL}>Política de correcciones completa</EnlaceDocumento>
            </p>
            <AvisoQuejaEFCSN />
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-datos" aria-labelledby="ov-h-datos">
          <h2 id="ov-h-datos" className="ov-h2">
            Protección de datos
          </h2>
          <Bloque>
            <dl className="ov-datos">
              <Dato campo="Responsable">
                {ENTIDAD.siglas} ({ENTIDAD.nombre})
              </Dato>
              <Dato campo="Finalidad">Valorar y, en su caso, verificar los contenidos que se envían y responder a quien los envía.</Dato>
              <Dato campo="Base jurídica">El consentimiento de quien envía el contenido.</Dato>
              <Dato campo="Conservación">
                Contenidos que no se verifican: <Plazo clave="contenido_no_verificado" />. Datos de contacto: <Plazo clave="datos_contacto" />.
              </Dato>
              <Dato campo="Derechos">
                Escribiendo a <a href={`mailto:${ENTIDAD.correo}`}>{ENTIDAD.correo}</a>.
              </Dato>
            </dl>
            <p>
              <EnlaceDocumento url={URLS.POLITICA_DATOS_URL}>Política de protección de datos completa</EnlaceDocumento>
            </p>
            <p className="ov-transparencia__nota">
              Instagram, Facebook y TikTok aparecen como canales pendientes de activación: no se abrirán hasta que la política de protección de
              datos y el registro de actividades de tratamiento los incluyan.
            </p>
          </Bloque>
        </section>
      </div>
    </div>
  );
}
