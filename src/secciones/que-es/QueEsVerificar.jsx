import IndiceLectura from '../../componentes/IndiceLectura.jsx';
import { Bloque } from '../../componentes/NotaMargen.jsx';
import { Enlace } from '../../componentes/Enlace.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import useApartado from '../../hooks/useApartado.js';
import { URLS } from '../../config/sitio.js';
import { NO_PARTIDISMO, QUE_ES, QUE_NO_ES } from '../../contenido/que-es.js';
import DefinicionAbierta from './DefinicionAbierta.jsx';
import MapaCodigo from './MapaCodigo.jsx';
import DosCaminos from './DosCaminos.jsx';
import './que-es.css';

const APARTADOS = [
  { id: 'definicion', titulo: 'Definición' },
  { id: 'que-es', titulo: 'Qué es y qué no es' },
  { id: 'codigo', titulo: 'El Código Europeo' },
  { id: 'aplica', titulo: 'Cómo lo aplica ODESOCAN' },
  { id: 'encaje', titulo: 'Cómo encaja en ODESOCAN' },
  { id: 'dos-caminos', titulo: 'Dos caminos' },
  { id: 'no-partidismo', titulo: 'No partidismo' },
];

const enlaceCodigo = (
  <a href={URLS.CODIGO_EFCSN_URL} target="_blank" rel="noopener" hrefLang="en">
    texto original del Código, en inglés
  </a>
);

/**
 * Sección 1 · Qué es verificar: qué hace un servicio de verificación, qué
 * normas sigue y por qué ODESOCAN lo separa de su incidencia política.
 */
export default function QueEsVerificar() {
  useApartado();
  return (
    <div className="ov-contenedor ov-lectura ov-que-es">
      <div className="ov-lectura__indice">
        <IndiceLectura apartados={APARTADOS} base="/que-es-verificar" />
      </div>

      <div className="ov-lectura__cuerpo">
        <section className="ov-seccion ov-cabeza" id="ov-ap-definicion" aria-labelledby="ov-h-definicion">
          <h1 id="ov-h-definicion" className="ov-titulo">
            Qué es verificar
          </h1>
          <Bloque
            ancho
            nota={
              <>
                Definición de la European Fact-Checking Standards Network (EFCSN) en su Código Europeo de Normas para Organizaciones
                Independientes de Verificación. Ver el {enlaceCodigo}.
              </>
            }
          >
            <DefinicionAbierta>
              Verificar es usar un método basado en evidencia para comprobar la exactitud de las afirmaciones que se hacen en la esfera
              pública.
            </DefinicionAbierta>
          </Bloque>
          <Bloque>
            <p>
              En inglés se conoce como <em>fact-checking</em>. Odesocan Verifica aplica ese método a lo que se afirma sobre derechos sociales en
              Canarias, como la vivienda, la sanidad, la dependencia, el empleo o la educación, para que la ciudadanía disponga de datos
              contrastados con los que formarse su propia opinión.
            </p>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-que-es" aria-labelledby="ov-h-que-es">
          <h2 id="ov-h-que-es" className="ov-h2">
            Qué es y qué no es
          </h2>
          <div className="ov-que-es__dos">
            <div>
              <h3 className="ov-h3">Lo que hace</h3>
              <ul className="ov-lista">
                {QUE_ES.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="ov-h3">Lo que no hace</h3>
              <ul className="ov-lista">
                {QUE_NO_ES.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="ov-seccion" id="ov-ap-codigo" aria-labelledby="ov-h-codigo">
          <h2 id="ov-h-codigo" className="ov-h2">
            El Código Europeo
          </h2>
          <Bloque nota="Lo aprobó el grupo amplio de organizaciones de la red por mayoría cualificada de tres cuartos, en verano de 2022.">
            <p>
              El Código Europeo de Normas para Organizaciones Independientes de Verificación lo aprobaron en 2022 más de 40 organizaciones
              europeas de verificación, reunidas en la European Fact-Checking Standards Network (EFCSN). Fija lo que una organización tiene
              que cumplir para que su trabajo sea independiente, transparente y comprobable, y se organiza en capítulos sobre metodología,
              estándares éticos, transparencia, acceso y renovación de la condición de miembro, y cumplimiento.
            </p>
          </Bloque>
          <Bloque
            nota={
              <>
                Redacción de la relación con la EFCSN <Pendiente>pendiente de validar</Pendiente>.
              </>
            }
          >
            <p>
              ODESOCAN ha elaborado la metodología de Odesocan Verifica conforme a ese Código. <strong>ODESOCAN no es miembro verificado de la
              EFCSN</strong>: ese reconocimiento solo lo concede la propia red, después de evaluar a cada organización que lo solicita.
            </p>
            <p>
              <a href={URLS.CODIGO_EFCSN_URL} target="_blank" rel="noopener" hrefLang="en">
                Leer el Código en la web de la EFCSN (en inglés)
              </a>
            </p>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-aplica" aria-labelledby="ov-h-aplica">
          <h2 id="ov-h-aplica" className="ov-h2">
            Cómo lo aplica ODESOCAN
          </h2>
          <Bloque>
            <p>
              Cada capítulo del Código se desarrolla en uno o varios documentos del servicio. Elige un capítulo para ver cuáles son y llegar a
              cada uno.
            </p>
          </Bloque>
          <Bloque ancho>
            <MapaCodigo />
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-encaje" aria-labelledby="ov-h-encaje">
          <h2 id="ov-h-encaje" className="ov-h2">
            Cómo encaja en ODESOCAN
          </h2>
          <Bloque
            nota={
              <>
                Estatutos de la Fundación Canaria Observatorio de Derechos Sociales de Canarias, artículos 5.b, 5.d, 5.g y 6.a.{' '}
                <Pendiente>estatutos en PDF</Pendiente>
              </>
            }
          >
            <p>
              La verificación se apoya en los fines que recogen los Estatutos de la fundación: hacer accesible la información sobre los
              servicios públicos (artículo 5.b), fomentar el buen gobierno (artículo 5.d), informar con transparencia (artículo 5.g) y remover
              los obstáculos que dificultan el acceso a una información veraz (artículo 6.a).
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículo 3.1.J: las organizaciones que hacen incidencia publican cómo cumplen estas normas.">
            <p>
              Odesocan Verifica es una rama metodológicamente separada de la investigación y de la incidencia política de ODESOCAN, y esa
              separación funciona en los dos sentidos: los hechos verificados no se convierten en incidencia, y los hechos que sostienen una
              iniciativa de incidencia no pasan a verificación.
            </p>
          </Bloque>
          <Bloque nota="Código EFCSN, artículo 4.1.A: quién ejerce el control editorial y cómo.">
            <p>
              El Patronato de la fundación aprueba la metodología y las directrices del servicio, pero no interviene en la selección, el
              contenido ni la calificación de ninguna pieza.
            </p>
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-dos-caminos" aria-labelledby="ov-h-dos-caminos">
          <h2 id="ov-h-dos-caminos" className="ov-h2">
            Dos caminos
          </h2>
          <Bloque nota="Supuestos del anexo I de las directrices de independencia de Odesocan Verifica.">
            <p>
              La incidencia y la verificación son dos caminos paralelos que no se cruzan. Elige un supuesto para ver qué camino sigue una
              afirmación y por qué.
            </p>
          </Bloque>
          <Bloque ancho>
            <DosCaminos />
          </Bloque>
        </section>

        <section className="ov-seccion" id="ov-ap-no-partidismo" aria-labelledby="ov-h-no-partidismo">
          <h2 id="ov-h-no-partidismo" className="ov-h2">
            Declaración de no partidismo
          </h2>
          <Bloque
            nota={
              <>
                Adaptada del modelo del anexo 3 del Código EFCSN (artículo 3.1.I). Aprobación por el Patronato: <Pendiente />.
              </>
            }
          >
            <ol className="ov-declaracion">
              {NO_PARTIDISMO.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </Bloque>
          <Bloque>
            <p>
              <Enlace to="/transparencia" className="ov-boton-sec">
                Ver quién está detrás y cómo se financia
              </Enlace>
            </p>
          </Bloque>
        </section>
      </div>
    </div>
  );
}
