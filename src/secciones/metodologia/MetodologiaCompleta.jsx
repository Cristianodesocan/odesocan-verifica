import IndiceLectura from '../../componentes/IndiceLectura.jsx';
import { Bloque } from '../../componentes/NotaMargen.jsx';
import { Enlace } from '../../componentes/Enlace.jsx';
import GlifoEscala from '../../componentes/GlifoEscala.jsx';
import Plazo from '../../componentes/Plazo.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import useApartado from '../../hooks/useApartado.js';
import { ESCALA, PREGUNTAS_DECISION } from '../../config/escala.js';
import { URLS } from '../../config/sitio.js';
import {
  CIFRAS,
  EQUIPO,
  ESCALAS_REFERENCIA,
  FASES_COMPLETAS,
  FLUJO,
  PRESENTACION,
  SECCIONES_PIEZA,
  VERSION,
} from '../../contenido/metodologia-completa.js';
import './metodologia.css';
import './metodologia-completa.css';

const APARTADOS = [
  { id: 'presentacion', titulo: 'Del análisis a la verificación' },
  ...FASES_COMPLETAS.map((f, i) => ({ id: f.id, titulo: `${i + 1}. ${f.titulo}` })),
  { id: 'equipo', titulo: 'Equipo' },
  { id: 'flujo', titulo: 'Recorrido de una pieza' },
];

/** Pasos del procedimiento de revisión editorial, con los plazos de la configuración. */
function PasosRevision() {
  return (
    <ol className="ov-pasos-revision">
      <li>
        <h3 className="ov-pasos-revision__titulo">Revisión principal</h3>
        <p>
          Una persona no vinculada a la pieza, ni como investigadora ni como evaluadora en la selección, la revisa con un guion de valoración y
          emite por escrito un dictamen motivado en un máximo de <Plazo clave="dictamen_revision" />: publicable, devolución para subsanar o
          no publicable, con motivos técnicos, éticos o metodológicos.
        </p>
      </li>
      <li>
        <h3 className="ov-pasos-revision__titulo">Devolución para subsanar</h3>
        <p>
          Procede cuando el fallo se corrige con trabajo de redacción o con documentos y datos que ya existen. Plazo: <Plazo clave="subsanacion" />.
          Si hace falta una nueva investigación, la pieza pasa a suspendida o a no publicable.
        </p>
      </li>
      <li>
        <h3 className="ov-pasos-revision__titulo">Segunda revisión</h3>
        <p>
          Ante un dictamen de no publicable, la persona autora puede pedir que intervenga otra persona del equipo, distinta de la primera y
          tampoco vinculada a la pieza, que emite un dictamen propio y definitivo. Plazo: <Plazo clave="segunda_revision" />. Los dos dictámenes
          se conservan en el expediente.
        </p>
      </li>
      <li>
        <h3 className="ov-pasos-revision__titulo">Suspendida</h3>
        <p>
          Es el estado de las piezas que no pueden subsanarse a tiempo por su complejidad o por falta de capacidad del equipo, nunca por
          deficiencias de calidad, y no es una vía de urgencia. Dura como máximo <Plazo clave="suspension_maxima" />; después, la pieza se
          publica con un nuevo dictamen, se acota a una afirmación más concreta o se descarta con su motivo.
        </p>
      </li>
      <li>
        <h3 className="ov-pasos-revision__titulo">Urgencia</h3>
        <p>
          Con el protocolo de emergencia, el plazo de revisión se reduce (<Plazo clave="revision_urgente" />) sin suprimir la revisión
          independiente. Si no hay ninguna persona revisora disponible en ese plazo, la pieza no se publica.
        </p>
      </li>
      <li>
        <h3 className="ov-pasos-revision__titulo">Riesgo jurídico</h3>
        <p>
          Con independencia del dictamen, las piezas que entran en los supuestos de consulta a la dirección requieren esa consulta antes de
          publicarse.
        </p>
      </li>
    </ol>
  );
}

function TablaSecciones() {
  return (
    <figure className="ov-tabla-figura">
      {/* En móvil la tabla se desplaza en horizontal: el marco se puede
          enfocar para recorrerla con el teclado. */}
      <div className="ov-tabla-marco" tabIndex={0} role="region" aria-label="Secciones mínimas de cada pieza (tabla desplazable)">
        <table className="ov-tabla ov-tabla--secciones">
          <caption>Secciones mínimas de cada pieza de verificación</caption>
          <thead>
            <tr>
              <th scope="col">Sección</th>
              <th scope="col">Contenido mínimo</th>
              <th scope="col">Artículo del Código</th>
              <th scope="col">Carácter</th>
            </tr>
          </thead>
          <tbody>
            {SECCIONES_PIEZA.map(([seccion, contenido, articulo, caracter]) => (
              <tr key={seccion}>
                <th scope="row">{seccion}</th>
                <td>{contenido}</td>
                <td className="ov-mono">{articulo}</td>
                <td>{caracter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="ov-tabla-figura__pie">
        Elaboración de ODESOCAN a partir del Código EFCSN, consultado el 13 de octubre de 2026. La fila marcada como propuesta es una decisión
        de ODESOCAN, no una exigencia del Código.
      </figcaption>
    </figure>
  );
}

function Escalas() {
  return (
    <>
      <figure className="ov-tabla-figura">
        <div className="ov-tabla-marco" tabIndex={0} role="region" aria-label="Escalas de organizaciones de referencia (tabla desplazable)">
          <table className="ov-tabla">
            <caption>Escalas de calificación de organizaciones de referencia</caption>
            <thead>
              <tr>
                <th scope="col">Organización</th>
                <th scope="col">Escala</th>
                <th scope="col">Enfoque principal</th>
              </tr>
            </thead>
            <tbody>
              {ESCALAS_REFERENCIA.map(([org, escala, enfoque]) => (
                <tr key={org}>
                  <th scope="row">{org}</th>
                  <td>{escala}</td>
                  <td>{enfoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="ov-tabla-figura__pie">Elaboración de ODESOCAN a partir de las metodologías publicadas por cada organización.</figcaption>
      </figure>
      <p>
        La categoría intermedia es clave, porque buena parte de la desinformación no es binaria: mezcla datos correctos e incorrectos, o no hay
        pruebas suficientes para calificarla de falsa con rigor. Además de verdadero y falso, Odesocan Verifica usa dos categorías
        intermedias, engañoso y contexto. El juicio recae siempre sobre la afirmación y nunca sobre la persona.
      </p>
      <dl className="ov-escala-completa">
        {ESCALA.map((c) => (
          <div key={c.valor} className={`ov-escala-completa__item ov-escala-completa__item--${c.clave}`}>
            <dt>
              <GlifoEscala forma={c.forma} tamano={28} />
              <span>
                <span className="ov-mono">{c.valor}</span> {c.etiqueta}
              </span>
            </dt>
            <dd>{c.definicion}</dd>
          </div>
        ))}
      </dl>
      <p>
        La diferencia entre engañoso y contexto está en la distancia respecto a lo verdadero: el contenido engañoso mezcla elementos verdaderos
        y falsos, mientras que al de contexto le faltan elementos necesarios para completar los verdaderos que ya contiene.
      </p>
      <h3 className="ov-h3">Preguntas de decisión</h3>
      <p>Se hacen en este orden, y la primera respuesta afirmativa decide la categoría:</p>
      <ol className="ov-lista ov-lista--numerada">
        {PREGUNTAS_DECISION.map((p) => (
          <li key={p.valor}>
            {p.pregunta} <strong>{ESCALA.find((c) => c.valor === p.valor).etiqueta}.</strong>
          </li>
        ))}
      </ol>
      <p>
        <Enlace to="/metodologia/prueba">Practicar con los casos frontera en «Pon a prueba la escala»</Enlace>
      </p>
    </>
  );
}

function Cuerpo({ bloques }) {
  return bloques.map((b, i) => {
    if (typeof b === 'string') return <p key={i}>{b}</p>;
    if (b.lista) {
      return (
        <ul key={i} className="ov-lista">
          {b.lista.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      );
    }
    return (
      <div key={i} className="ov-documento__sub">
        <h3 className="ov-h3">{b.titulo}</h3>
        {b.parrafos.map((p, j) => (
          <p key={j}>{p}</p>
        ))}
      </div>
    );
  });
}

/**
 * Metodología completa: versión pública del documento de metodología del
 * servicio, en formato de lectura larga y preparada para guardarse en PDF
 * desde el navegador.
 */
export default function MetodologiaCompleta() {
  useApartado();
  return (
    <div className="ov-contenedor ov-lectura ov-documento">
      <div className="ov-lectura__indice">
        <IndiceLectura apartados={APARTADOS} base="/metodologia/completa" etiqueta="Índice" />
      </div>

      <article className="ov-lectura__cuerpo">
        <header className="ov-cabeza ov-documento__cabeza">
          <nav className="ov-ficha__miga" aria-label="Ruta">
            <Enlace to="/metodologia">Metodología</Enlace>
            <span aria-hidden="true"> / </span>
            <span>Metodología completa</span>
          </nav>
          <h1 className="ov-titulo">Metodología de verificación</h1>
          <p className="ov-dateline">
            Versión {VERSION.numero} <span aria-hidden="true">·</span> {VERSION.periodo} <span aria-hidden="true">·</span> Odesocan Verifica
          </p>
          <p className="ov-sumario ov-sumario--ancho">
            Nueve fases, desde la monitorización hasta el archivo, adaptadas del Código Europeo de verificación y con una función asignada a
            cada persona del equipo.
          </p>
          <dl className="ov-documento__cifras">
            {CIFRAS.map((c) => (
              <div key={c.texto}>
                <dt>{c.valor}</dt>
                <dd>{c.texto}</dd>
              </div>
            ))}
          </dl>
          <div className="ov-documento__acciones">
            <button type="button" className="ov-boton" onClick={() => window.print()}>
              Guardar como PDF
            </button>
            {URLS.METODOLOGIA_PDF_URL ? (
              <a href={URLS.METODOLOGIA_PDF_URL} target="_blank" rel="noopener">
                Descargar la versión oficial (PDF)
              </a>
            ) : (
              <span className="ov-documento__oficial">
                Versión oficial en PDF <Pendiente>pendiente de publicar</Pendiente>
              </span>
            )}
          </div>
          <p className="ov-documento__aviso">
            Versión pública adaptada del documento interno de metodología: las funciones sustituyen a los nombres del equipo. Borrador pendiente
            de revisión por el equipo de ODESOCAN.
          </p>
        </header>

        <section className="ov-seccion" id="ov-ap-presentacion" aria-labelledby="ov-h-presentacion">
          <h2 id="ov-h-presentacion" className="ov-h2">
            Del análisis a la verificación
          </h2>
          {PRESENTACION.map((p, i) => (
            <Bloque
              key={i}
              nota={i === 2 ? <a href={URLS.CODIGO_EFCSN_URL} target="_blank" rel="noopener" hrefLang="en">Código EFCSN, en inglés</a> : undefined}
            >
              <p>{p}</p>
            </Bloque>
          ))}
        </section>

        {FASES_COMPLETAS.map((f, i) => (
          <section key={f.id} className="ov-seccion ov-documento__fase" id={`ov-ap-${f.id}`} aria-labelledby={`ov-h-${f.id}`}>
            <h2 id={`ov-h-${f.id}`} className="ov-h2 ov-documento__titulo-fase">
              <span className="ov-documento__numero">Fase {i + 1}</span>
              {f.titulo}
            </h2>
            <Bloque nota={f.articulos}>
              <div className="ov-prosa">
                <Cuerpo bloques={f.cuerpo} />
              </div>
            </Bloque>
            {f.tablaSecciones && (
              <Bloque ancho>
                <TablaSecciones />
              </Bloque>
            )}
            {f.pasosRevision && (
              <Bloque>
                <PasosRevision />
              </Bloque>
            )}
            {f.escalas && (
              <Bloque>
                <div className="ov-prosa">
                  <Escalas />
                </div>
              </Bloque>
            )}
            <Bloque>
              <dl className="ov-fase__datos">
                {f.objetivo && (
                  <div>
                    <dt>Objetivo</dt>
                    <dd>{f.objetivo}</dd>
                  </div>
                )}
                <div>
                  <dt>Quién interviene</dt>
                  <dd>
                    <ul className="ov-documento__roles">
                      {f.intervienen.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Bloque>
          </section>
        ))}

        <section className="ov-seccion" id="ov-ap-equipo" aria-labelledby="ov-h-equipo">
          <h2 id="ov-h-equipo" className="ov-h2">
            Equipo
          </h2>
          <Bloque
            nota={
              <>
                Nombres y trayectoria del equipo: <Enlace to="/transparencia/quienes-somos">Transparencia</Enlace>.
              </>
            }
          >
            <p>
              El equipo lo forman tres personas de dirección e investigación y dos de comunicación, sin dedicación exclusiva al servicio. Las
              funciones no son totalmente rígidas, para que el trabajo sea sostenible, pero la persona que investiga una pieza nunca la revisa
              ni la califica.
            </p>
            <div className="ov-tabla-marco">
              <table className="ov-tabla">
                <caption className="ov-oculto">Perfiles del equipo</caption>
                <thead>
                  <tr>
                    <th scope="col">Función</th>
                    <th scope="col">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {EQUIPO.map(([funcion, perfil]) => (
                    <tr key={perfil}>
                      <th scope="row">{funcion}</th>
                      <td>{perfil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-flujo" aria-labelledby="ov-h-flujo">
          <h2 id="ov-h-flujo" className="ov-h2">
            Recorrido de una pieza
          </h2>
          <Bloque>
            <ol className="ov-flujo">
              {FLUJO.map(([etapa, texto]) => (
                <li key={etapa} className="ov-flujo__paso">
                  <h3 className="ov-h3">{etapa}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
            <p>
              <Enlace to="/metodologia/recorrido">Seguir el expediente OV-2026-0000 por las nueve fases</Enlace>
            </p>
          </Bloque>
        </section>
      </article>
    </div>
  );
}
