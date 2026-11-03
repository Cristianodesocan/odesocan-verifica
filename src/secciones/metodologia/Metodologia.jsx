import Recorrido from './Recorrido.jsx';
import CasosFrontera from './CasosFrontera.jsx';
import IndiceLectura from '../../componentes/IndiceLectura.jsx';
import { Bloque } from '../../componentes/NotaMargen.jsx';
import { Enlace } from '../../componentes/Enlace.jsx';
import GlifoEscala from '../../componentes/GlifoEscala.jsx';
import Insignia from '../../componentes/Insignia.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import Plazo from '../../componentes/Plazo.jsx';
import useApartado from '../../hooks/useApartado.js';
import { ESCALA, PREGUNTAS_DECISION } from '../../config/escala.js';
import { PLAZOS } from '../../config/plazos.js';
import { URLS } from '../../config/sitio.js';
import { GARANTIAS_EMERGENCIA } from '../../contenido/metodologia.js';
import './metodologia.css';

const APARTADOS = [
  { id: 'escala', titulo: 'Escala de calificación' },
  { id: 'preguntas', titulo: 'Preguntas de decisión' },
  { id: 'prueba', titulo: 'Pon a prueba la escala' },
  { id: 'emergencia', titulo: 'Protocolo de emergencia' },
  { id: 'independencia', titulo: 'Independencia en la selección' },
  { id: 'plazos', titulo: 'Plazos' },
  { id: 'descarga', titulo: 'Metodología completa' },
];

const CLAVES_PLAZOS = ['dictamen_revision', 'subsanacion', 'segunda_revision', 'suspension_maxima', 'revision_urgente', 'replica', 'recorrido_emergencia'];

/**
 * Metodología: el recorrido de una pieza por las nueve fases, la escala,
 * las preguntas de decisión, los casos frontera, el protocolo de
 * emergencia, la independencia en la selección y los plazos.
 */
export default function Metodologia() {
  useApartado();
  return (
    <>
      <div className="ov-contenedor ov-cabeza">
        <h1 className="ov-titulo">Metodología</h1>
        <p className="ov-sumario ov-sumario--ancho">
          Cada pieza pasa por nueve fases, desde que se detecta un contenido hasta que se archiva, y cada fase deja un registro que permite a
          otra persona repetir el proceso.
        </p>
        <div className="ov-entradilla ov-prosa">
          <Bloque nota={<>Código EFCSN, artículo 2.A: explicación pública de cómo se seleccionan, investigan y cierran las verificaciones.</>}>
            <p>
              Para que se entienda cómo trabaja el servicio, se sigue aquí un expediente ficticio, el <span className="ov-id">OV-2026-0000</span>, a lo
              largo de las nueve fases. En cada una se explica qué se hace, qué garantía del Código Europeo se cumple y qué queda registrado.
              Los roles se nombran por su función, como la persona revisora no vinculada.
            </p>
          </Bloque>
        </div>
      </div>

      <section className="ov-contenedor ov-recorrido-seccion" aria-labelledby="ov-ap-recorrido" id="ov-ap-recorrido-seccion">
        <h2 id="ov-ap-recorrido" className="ov-h2">
          El recorrido de una pieza
        </h2>
        <Recorrido />
      </section>

      <div className="ov-contenedor ov-lectura ov-metodologia__lectura">
        <div className="ov-lectura__indice">
          <IndiceLectura apartados={APARTADOS} base="/metodologia" />
        </div>
        <div className="ov-lectura__cuerpo">
          <section className="ov-seccion" id="ov-ap-escala" aria-labelledby="ov-h-escala">
            <h2 id="ov-h-escala" className="ov-h2">
              Escala de calificación
            </h2>
            <Bloque nota="Código EFCSN, artículo 2.A: definición pública de la escala de calificación.">
              <p>
                La escala tiene cuatro categorías. El juicio recae siempre sobre la afirmación y nunca sobre la persona que la hizo, y cada
                categoría tiene su propia forma, para que el color no sea nunca el único portador del significado.
              </p>
            </Bloque>
            <ol className="ov-escala">
              {ESCALA.map((c) => (
                <li key={c.valor} className={`ov-escala__item ov-escala__item--${c.clave}`}>
                  <span className="ov-escala__glifo">
                    <GlifoEscala forma={c.forma} tamano={40} />
                  </span>
                  <span className="ov-escala__valor">{c.valor}</span>
                  <h3 className="ov-escala__nombre">{c.etiqueta}</h3>
                  <p className="ov-escala__definicion">{c.definicion}</p>
                  <p className="ov-escala__lectura">{c.lectura}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="ov-seccion" id="ov-ap-preguntas" aria-labelledby="ov-h-preguntas">
            <h2 id="ov-h-preguntas" className="ov-h2">
              Preguntas de decisión
            </h2>
            <Bloque>
              <p>Las preguntas se hacen en este orden, y la primera respuesta afirmativa decide la categoría.</p>
            </Bloque>
            <ol className="ov-preguntas">
              {PREGUNTAS_DECISION.map((p, i) => (
                <li key={p.valor} className="ov-preguntas__item">
                  <span className="ov-preguntas__numero" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="ov-preguntas__texto">{p.pregunta}</p>
                  <p className="ov-preguntas__si">
                    <span className="ov-preguntas__etiqueta">Si la respuesta es sí:</span> <Insignia valor={p.valor} />
                  </p>
                  {i < PREGUNTAS_DECISION.length - 1 && (
                    <p className="ov-preguntas__no">Si es no, se pasa a la pregunta {i + 2}.</p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="ov-seccion" id="ov-ap-prueba" aria-labelledby="ov-h-prueba">
            <h2 id="ov-h-prueba" className="ov-h2">
              Pon a prueba la escala
            </h2>
            <Bloque>
              <p>
                Seis casos frontera, de los que más dudas generan. Elige la calificación que les darías y compárala con la que aplica la
                metodología.
              </p>
            </Bloque>
            <CasosFrontera />
          </section>

          <section className="ov-seccion" id="ov-ap-emergencia" aria-labelledby="ov-h-emergencia">
            <h2 id="ov-h-emergencia" className="ov-h2">
              Protocolo de emergencia
            </h2>
            <Bloque nota="El Código EFCSN no regula procedimientos de urgencia: este protocolo es propio de ODESOCAN y mantiene todas las garantías del procedimiento ordinario.">
              <p>
                Algunos contenidos pueden causar daño en muy poco tiempo, como un mensaje que da un plazo falso para pedir una ayuda o una
                imagen que siembra alarma durante una inundación. Para ellos existe una vía urgente, que se activa solo si se cumplen a la
                vez dos condiciones.
              </p>
            </Bloque>
            <div className="ov-emergencia">
              <div className="ov-emergencia__test">
                <h3 className="ov-h3">Test de activación</h3>
                <ol className="ov-emergencia__condiciones">
                  <li>El contenido es verificable.</li>
                  <li>Puede causar daño en horas o en pocos días.</li>
                </ol>
              </div>
              <div className="ov-emergencia__ruta">
                <h3 className="ov-h3">Recorrido</h3>
                <p>
                  Un máximo de <strong>unas 20 horas</strong>, sin devoluciones. Plazo de la revisión urgente:{' '}
                  <Plazo clave="revision_urgente" />. La metodología fija 4 horas y el protocolo de emergencia, 12, y el equipo tiene que
                  decidir cuál se aplica.
                </p>
                <p>
                  Si vence un plazo, la pieza sale de la vía urgente y sigue por la ordinaria. Nunca se publica con garantías reducidas.
                </p>
              </div>
              <div className="ov-emergencia__garantias">
                <h3 className="ov-h3">Garantías que se mantienen</h3>
                <ul className="ov-lista">
                  {GARANTIAS_EMERGENCIA.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="ov-seccion" id="ov-ap-independencia" aria-labelledby="ov-h-independencia">
            <h2 id="ov-h-independencia" className="ov-h2">
              Independencia en la selección
            </h2>
            <Bloque
              nota={
                <>
                  Directrices de independencia de Odesocan Verifica. Ver{' '}
                  <Enlace to="/transparencia/independencia">Independencia y no partidismo</Enlace>.
                </>
              }
            >
              <p>
                Las prioridades de incidencia política de ODESOCAN no son un criterio de selección, y nadie de la fundación puede encargar una
                verificación fuera del cauce ordinario: todos los contenidos entran por las mismas vías y pasan los mismos filtros.
              </p>
              <p>
                <Enlace to="/que-es-verificar/dos-caminos">Ver cómo se separan la verificación y la incidencia</Enlace>
              </p>
            </Bloque>
          </section>

          <section className="ov-seccion" id="ov-ap-plazos" aria-labelledby="ov-h-plazos">
            <h2 id="ov-h-plazos" className="ov-h2">
              Plazos
            </h2>
            <Bloque nota="Los plazos se leen de src/config/plazos.js. Los que están entre corchetes siguen pendientes de validar por el equipo.">
              <p>Estos son los plazos de cada paso de la revisión y de la vía urgente.</p>
            </Bloque>
            <div className="ov-tabla-marco">
              <table className="ov-tabla">
                <caption className="ov-oculto">Plazos de la metodología</caption>
                <thead>
                  <tr>
                    <th scope="col">Paso</th>
                    <th scope="col">Plazo</th>
                  </tr>
                </thead>
                <tbody>
                  {CLAVES_PLAZOS.map((c) => (
                    <tr key={c}>
                      <th scope="row">{PLAZOS[c].nombre}</th>
                      <td>
                        <Plazo clave={c} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="ov-seccion" id="ov-ap-descarga" aria-labelledby="ov-h-descarga">
            <h2 id="ov-h-descarga" className="ov-h2">
              Metodología completa
            </h2>
            <Bloque>
              <p>La versión pública de la metodología, con todos los procedimientos, se podrá descargar en PDF.</p>
              <p>
                {URLS.METODOLOGIA_PDF_URL ? (
                  <a className="ov-boton" href={URLS.METODOLOGIA_PDF_URL} target="_blank" rel="noopener">
                    Descargar la metodología (PDF)
                  </a>
                ) : (
                  <>
                    <span className="ov-boton" aria-disabled="true">
                      Descargar la metodología (PDF)
                    </span>{' '}
                    <Pendiente>documento pendiente</Pendiente>
                  </>
                )}
              </p>
            </Bloque>
          </section>
        </div>
      </div>
    </>
  );
}
