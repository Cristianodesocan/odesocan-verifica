import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Enlace } from '../../componentes/Enlace.jsx';
import Insignia from '../../componentes/Insignia.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import useVerificaciones from '../../hooks/useVerificaciones.js';
import { categoriaPorValor } from '../../config/escala.js';
import { BANDERAS, ENTIDAD, SITIO } from '../../config/sitio.js';
import { fechaLarga } from '../../data/formato.js';
import { generarClaimReview } from '../../data/claimreview.js';
import './ficha.css';

const VIAS = {
  influenciabilidad: 'influenciabilidad (poder o alcance de quien afirma)',
  viralidad: 'viralidad (difusión del contenido)',
  peligrosidad: 'peligrosidad (riesgo de daño)',
};

/**
 * Ficha de verificación, en el orden del encargo: calificación y resumen;
 * nota de corrección; afirmación literal; por qué se verifica; evidencia;
 * fuentes; método; conflictos; réplica; historial de versiones; enlaces a
 * la escala y a la política de correcciones; compartir.
 *
 * La afirmación literal solo aparece aquí, enmarcada como voz citada y
 * después del dato verificado. El texto para compartir es el titular.
 */
export default function Ficha() {
  const { id } = useParams();
  const { estado, datos } = useVerificaciones();
  const v = useMemo(() => datos.find((d) => d.id === id), [datos, id]);

  useEffect(() => {
    if (v) document.title = `${v.id}, ficha de verificación | Odesocan Verifica (prototipo)`;
  }, [v]);

  const urlFicha = `${SITIO.URL_BASE ?? SITIO.URL_PROTOTIPO}#/portal/${id}`;
  const marcado = useMemo(() => (v ? generarClaimReview(v, urlFicha) : null), [v, urlFicha]);

  // ClaimReview solo se inyecta con VITE_CLAIMREVIEW=on (datos reales).
  useEffect(() => {
    if (!BANDERAS.CLAIMREVIEW || !marcado) return undefined;
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(marcado);
    document.head.appendChild(s);
    return () => s.remove();
  }, [marcado]);

  if (estado === 'cargando') return <p className="ov-contenedor ov-cargando">Cargando la ficha…</p>;
  if (!v) {
    return (
      <div className="ov-contenedor ov-cabeza ov-prosa">
        <h1 className="ov-titulo">No hay ninguna verificación con el identificador {id}</h1>
        <p>Comprueba el enlace o busca la verificación en el portal.</p>
        <p>
          <Enlace to="/portal" className="ov-boton">
            Ir al portal
          </Enlace>
        </p>
      </div>
    );
  }

  const cat = categoriaPorValor(v.calificacion.valor);
  const correcciones = [...(v.correcciones ?? [])].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const ultima = correcciones[0];

  return (
    <article className="ov-ficha">
      <div className="ov-contenedor">
        <nav className="ov-ficha__miga" aria-label="Ruta">
          <Enlace to="/portal">Portal de verificaciones</Enlace>
          <span aria-hidden="true"> / </span>
          <span className="ov-id">{v.id}</span>
        </nav>

        <div className="ov-ficha__rejilla">
          <div className="ov-ficha__principal">
            {/* 1. Calificación y resumen */}
            <header className="ov-ficha__cabeza">
              <div className="ov-ficha__calificacion">
                <Insignia valor={v.calificacion.valor} tamano="grande" nombreTransicion={`ov-insignia-${v.id}`} />
                {v.ejemplo && <span className="ov-sello">Verificación de ejemplo</span>}
                {v.emergencia && <span className="ov-sello">Protocolo de emergencia</span>}
              </div>
              <h1 className="ov-ficha__titular">{v.titular}</h1>
              <p className="ov-ficha__resumen">{v.resumen}</p>
              <p className="ov-dateline">
                <span className="ov-oculto">Identificador: </span>
                {v.id} <span aria-hidden="true">·</span> <span className="ov-oculto">Publicada el </span>
                <time dateTime={v.fecha_publicacion}>{fechaLarga(v.fecha_publicacion)}</time> <span aria-hidden="true">·</span>{' '}
                {v.materia} <span aria-hidden="true">·</span> {v.isla}
              </p>
              {v.ejemplo && (
                <p className="ov-ficha__ejemplo">
                  Pieza ficticia para el prototipo: las cifras, las fuentes y las afirmaciones son inventadas, aunque los organismos citados existan.
                </p>
              )}
            </header>

            {/* 2. Nota de corrección o actualización, visible arriba */}
            {ultima && (
              <aside className={`ov-ficha__correccion ov-ficha__correccion--${ultima.tipo}`} aria-labelledby="ov-ficha-correccion">
                <h2 id="ov-ficha-correccion" className="ov-h3">
                  {ultima.tipo === 'actualizacion' ? 'Actualización' : 'Corrección'} del {fechaLarga(ultima.fecha)}
                </h2>
                <p>{ultima.nota}</p>
                {ultima.cambia_calificacion && ultima.calificacion_anterior && (
                  <p className="ov-ficha__cambio">
                    La calificación cambió de <Insignia valor={ultima.calificacion_anterior.valor} /> a <Insignia valor={v.calificacion.valor} />.
                  </p>
                )}
                <p>
                  <a href="#ov-ap-historial" onClick={irA('ov-ap-historial')}>
                    Ver el historial de versiones
                  </a>
                </p>
              </aside>
            )}

            {/* 3. Afirmación literal */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-afirmacion">
              <h2 id="ov-ficha-afirmacion" className="ov-h2">
                Qué se afirmó
              </h2>
              <figure className="ov-afirmacion">
                <blockquote>
                  <p className="ov-afirmacion__texto">«{v.afirmacion.texto}»</p>
                </blockquote>
                <figcaption>
                  <dl className="ov-afirmacion__datos">
                    <div>
                      <dt>Emisora</dt>
                      <dd>{v.afirmacion.tipo_emisora}</dd>
                    </div>
                    <div>
                      <dt>Fecha</dt>
                      <dd>
                        <time dateTime={v.afirmacion.fecha}>{fechaLarga(v.afirmacion.fecha)}</time>
                      </dd>
                    </div>
                    <div>
                      <dt>Canal</dt>
                      <dd>{v.afirmacion.canal}</dd>
                    </div>
                    <div>
                      <dt>Archivo</dt>
                      <dd>
                        {v.afirmacion.enlace_archivado ? (
                          <a href={v.afirmacion.enlace_archivado} target="_blank" rel="noopener">
                            Ver la copia archivada
                          </a>
                        ) : (
                          <Pendiente>sin copia archivada</Pendiente>
                        )}
                      </dd>
                    </div>
                  </dl>
                </figcaption>
              </figure>
              <p className="ov-ficha__aclaracion">Se califica la afirmación, no a la persona o la entidad que la hizo.</p>
            </section>

            {/* 4. Por qué se verifica */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-porque">
              <h2 id="ov-ficha-porque" className="ov-h2">
                Por qué se verifica
              </h2>
              <p>{v.por_que}</p>
              {v.via_entrada?.length > 0 && (
                <p className="ov-ficha__meta">
                  Vía de entrada: {v.via_entrada.map((via) => VIAS[via] ?? via).join(' y ')}.
                </p>
              )}
            </section>

            {/* 5. Evidencia a favor y en contra */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-evidencia">
              <h2 id="ov-ficha-evidencia" className="ov-h2">
                Evidencia
              </h2>
              <div className="ov-ficha__evidencia">
                <div>
                  <h3 className="ov-h3">A favor de la afirmación</h3>
                  {v.evidencia.a_favor?.length ? (
                    <ul className="ov-lista">
                      {v.evidencia.a_favor.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ov-ficha__meta">No se ha encontrado evidencia a favor.</p>
                  )}
                </div>
                <div>
                  <h3 className="ov-h3">En contra de la afirmación</h3>
                  {v.evidencia.en_contra?.length ? (
                    <ul className="ov-lista">
                      {v.evidencia.en_contra.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ov-ficha__meta">No se ha encontrado evidencia en contra.</p>
                  )}
                </div>
              </div>
            </section>

            {/* 6. Fuentes */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-fuentes">
              <h2 id="ov-ficha-fuentes" className="ov-h2">
                Fuentes
              </h2>
              <ol className="ov-fuentes">
                {v.fuentes.map((f, i) => (
                  <li key={i} className="ov-fuentes__item">
                    <p className="ov-fuentes__organismo">{f.organismo}</p>
                    <p className="ov-fuentes__titulo">
                      <a href={f.url} target="_blank" rel="noopener">
                        {f.titulo}
                      </a>
                    </p>
                    <p className="ov-fuentes__meta">
                      Fuente {f.tipo}, consultada el {fechaLarga(f.fecha_consulta)}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* 7. Método y replicabilidad */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-metodo">
              <h2 id="ov-ficha-metodo" className="ov-h2">
                Método y replicabilidad
              </h2>
              <dl className="ov-datos">
                <div>
                  <dt>Indicador</dt>
                  <dd>{v.metodo.indicador}</dd>
                </div>
                <div>
                  <dt>Definición</dt>
                  <dd>{v.metodo.definicion}</dd>
                </div>
                <div>
                  <dt>Serie</dt>
                  <dd>{v.metodo.serie}</dd>
                </div>
                <div>
                  <dt>Código</dt>
                  <dd>
                    {v.metodo.codigo_url ? (
                      <a href={v.metodo.codigo_url} target="_blank" rel="noopener">
                        Ver el código del análisis
                      </a>
                    ) : (
                      'No se ha necesitado cálculo propio'
                    )}
                  </dd>
                </div>
              </dl>
            </section>

            {/* 8. Conflictos de interés */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-conflictos">
              <h2 id="ov-ficha-conflictos" className="ov-h2">
                Conflictos de interés
              </h2>
              <p>{v.conflictos}</p>
            </section>

            {/* 9. Réplica */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-replica">
              <h2 id="ov-ficha-replica" className="ov-h2">
                Réplica
              </h2>
              <dl className="ov-datos">
                <div>
                  <dt>Réplica ofrecida</dt>
                  <dd>
                    {v.replica.ofrecida
                      ? `Sí, el ${fechaLarga(v.replica.fecha_solicitud)}, con un plazo de 48 horas`
                      : 'No'}
                  </dd>
                </div>
                <div>
                  <dt>Respuesta</dt>
                  <dd>{v.replica.respuesta}</dd>
                </div>
              </dl>
            </section>

            {/* 10. Historial de versiones */}
            <section className="ov-ficha__seccion" aria-labelledby="ov-ficha-historial" id="ov-ap-historial">
              <h2 id="ov-ficha-historial" className="ov-h2">
                Historial de versiones
              </h2>
              <ol className="ov-historial">
                <li className="ov-historial__item">
                  <span className="ov-historial__fecha">
                    <time dateTime={v.fecha_publicacion}>{fechaLarga(v.fecha_publicacion)}</time>
                  </span>
                  <span>
                    Publicación original
                    {correcciones.length > 0 &&
                      (correcciones.at(-1).version_original_pdf ? (
                        <>
                          {' '}
                          (
                          <a href={correcciones.at(-1).version_original_pdf} target="_blank" rel="noopener">
                            versión original en PDF
                          </a>
                          )
                        </>
                      ) : (
                        <>
                          {' '}
                          <Pendiente>PDF de la versión original</Pendiente>
                        </>
                      ))}
                  </span>
                </li>
                {[...correcciones].reverse().map((c, i) => (
                  <li key={i} className="ov-historial__item">
                    <span className="ov-historial__fecha">
                      <time dateTime={c.fecha}>{fechaLarga(c.fecha)}</time>
                    </span>
                    <span>
                      {c.tipo === 'actualizacion' ? 'Actualización' : 'Corrección'}. {c.nota}
                    </span>
                  </li>
                ))}
              </ol>
              {correcciones.length === 0 && <p className="ov-ficha__meta">Esta pieza no ha tenido correcciones ni actualizaciones.</p>}
            </section>

            {/* Marcado ClaimReview */}
            <details className="ov-plegable ov-ficha__marcado">
              <summary>Marcado ClaimReview de esta ficha</summary>
              <div className="ov-plegable__cuerpo">
                <p className="ov-ficha__meta">
                  {BANDERAS.CLAIMREVIEW
                    ? 'Este marcado está insertado en la página para que buscadores y plataformas reconozcan la verificación.'
                    : 'Con datos de ejemplo, el marcado no se inserta en la página. Se activa con la variable VITE_CLAIMREVIEW=on.'}
                </p>
                <pre className="ov-codigo">{JSON.stringify(marcado, null, 2)}</pre>
              </div>
            </details>
          </div>

          {/* 11 y 12. Enlaces a la escala y a la política de correcciones; compartir */}
          <aside className="ov-ficha__lateral" aria-label="Sobre esta ficha">
            <div className="ov-ficha__bloque">
              <h2 className="ov-h3">Qué significa {cat.etiqueta}</h2>
              <p>{cat.definicion}</p>
              <p>
                <Enlace to="/metodologia/escala">Ver la escala de calificación</Enlace>
              </p>
            </div>
            <div className="ov-ficha__bloque">
              <h2 className="ov-h3">¿Ves un error?</h2>
              <p>
                Cualquier persona puede pedir una corrección. Indica el identificador <span className="ov-id">{v.id}</span>.
              </p>
              <p>
                <a
                  href={`mailto:${ENTIDAD.correo}?subject=${encodeURIComponent(`Solicitud de corrección ${v.id}`)}`}
                  className="ov-boton-sec"
                >
                  Pedir una corrección
                </a>
              </p>
              <p>
                <Enlace to="/transparencia/correcciones">Leer la política de correcciones</Enlace>
              </p>
            </div>
            <div className="ov-ficha__bloque">
              <h2 className="ov-h3">Compartir</h2>
              <Compartir titulo={v.titular} url={urlFicha} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

/** Desplazamiento a un apartado de la ficha sin cambiar la ruta (HashRouter). */
function irA(id) {
  return (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: 'start' });
    el?.querySelector('h2')?.setAttribute('tabindex', '-1');
    el?.querySelector('h2')?.focus({ preventScroll: true });
  };
}

/**
 * Compartir: en móvil abre el menú nativo (navigator.share); en
 * escritorio copia el enlace. El texto compartido es el titular, que
 * contiene el dato verificado y nunca la afirmación.
 */
function Compartir({ titulo, url }) {
  const [estado, setEstado] = useState('');
  const nativo = typeof navigator !== 'undefined' && typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches;
  const enlace = typeof window !== 'undefined' ? window.location.href : url;

  const compartir = async () => {
    try {
      if (nativo) {
        await navigator.share({ title: titulo, text: titulo, url: enlace });
        setEstado('');
      } else {
        await navigator.clipboard.writeText(enlace);
        setEstado('Enlace copiado.');
      }
    } catch (e) {
      if (e?.name !== 'AbortError') setEstado('No se ha podido copiar. Copia la dirección de la barra del navegador.');
    }
  };

  return (
    <div className="ov-compartir">
      <button type="button" className="ov-boton-sec" onClick={compartir}>
        {nativo ? 'Compartir' : 'Copiar el enlace'}
      </button>
      <p className="ov-compartir__estado" role="status" aria-live="polite">
        {estado}
      </p>
    </div>
  );
}
