import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Enlace } from '../../componentes/Enlace.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import useMediaQuery, { TABLETA } from '../../hooks/useMediaQuery.js';
import { cargarCorrecciones } from '../../data/correcciones.js';
import { FECHA_REFERENCIA_EJEMPLO } from '../../config/sitio.js';
import { fechaLarga, fechaCorta, hoyISO, sumarMeses } from '../../data/formato.js';
import './portal.css';
import './ficha.css';
import './correcciones.css';

const TIPOS = [
  { id: 'todas', etiqueta: 'Todas' },
  { id: 'correccion', etiqueta: 'Correcciones' },
  { id: 'actualizacion', etiqueta: 'Actualizaciones' },
];

/**
 * Registro público de correcciones (artículos 3.3.E a 3.3.G del Código
 * EFCSN). Lee la hoja configurada en CORRECCIONES_CSV_URL y, mientras no
 * exista, el CSV de ejemplo. Los filtros quedan en la URL.
 */
export default function RegistroCorrecciones() {
  const [estado, setEstado] = useState({ estado: 'cargando', filas: [], origen: null });
  const [params, setParams] = useSearchParams();
  const tabla = useMediaQuery(TABLETA);

  useEffect(() => {
    cargarCorrecciones()
      .then(({ filas, origen }) => setEstado({ estado: 'listo', filas, origen }))
      .catch((error) => setEstado({ estado: 'error', filas: [], error }));
  }, []);

  const tipo = TIPOS.some((t) => t.id === params.get('tipo')) ? params.get('tipo') : 'todas';
  const soloCambios = params.get('cambia') === 'si';
  const anio = params.get('periodo') !== 'todo';
  const q = params.get('q') ?? '';

  const cambiar = (clave, valor) => {
    const p = new URLSearchParams(params);
    if (valor) p.set(clave, valor);
    else p.delete(clave);
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const hoy = estado.origen === 'ejemplo' ? FECHA_REFERENCIA_EJEMPLO : hoyISO();
  const desde = sumarMeses(hoy, -12);
  const filas = useMemo(
    () =>
      estado.filas.filter((f) => {
        if (tipo !== 'todas' && f.tipo !== tipo) return false;
        if (soloCambios && !f.cambia) return false;
        if (anio && f.fecha < desde) return false;
        if (q && !`${f.id} ${f.titular} ${f.nota}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [estado.filas, tipo, soloCambios, anio, desde, q],
  );

  return (
    <div className="ov-contenedor ov-registro">
      {estado.origen === 'ejemplo' && (
        <p className="ov-aviso ov-registro__aviso" role="note">
          Datos de ejemplo. El servicio aún no ha publicado verificaciones ni correcciones.
        </p>
      )}
      <div className="ov-cabeza">
        <nav className="ov-ficha__miga" aria-label="Ruta">
          <Enlace to="/portal">Portal de verificaciones</Enlace>
        </nav>
        <h1 className="ov-titulo">Registro de correcciones</h1>
        <p className="ov-sumario">Cada error corregido y cada actualización quedan registrados aquí, con su fecha y su motivo.</p>
        <div className="ov-prosa ov-entradilla">
          <p>
            Ninguna pieza se borra en silencio: la corrección se explica en una nota visible en la propia ficha, y la versión original se
            conserva en PDF en la misma página. Este registro reúne las correcciones del último año.
          </p>
          <p>
            <Enlace to="/transparencia/correcciones">Leer la política de correcciones</Enlace>
          </p>
        </div>
      </div>

      <form className="ov-registro__filtros" role="search" aria-label="Filtrar el registro" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="ov-filtros__grupo">
          <legend className="ov-filtros__leyenda">Tipo</legend>
          <div className="ov-filtros__chips">
            {TIPOS.map((t) => (
              <label key={t.id} className="ov-chip">
                <input type="radio" name="ov-registro-tipo" checked={tipo === t.id} onChange={() => cambiar('tipo', t.id === 'todas' ? null : t.id)} />
                {t.etiqueta}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="ov-filtros__grupo">
          <legend className="ov-filtros__leyenda">Calificación y periodo</legend>
          <div className="ov-filtros__chips">
            <label className="ov-chip">
              <input type="checkbox" checked={soloCambios} onChange={(e) => cambiar('cambia', e.target.checked ? 'si' : null)} />
              Solo las que cambian la calificación
            </label>
            <label className="ov-chip">
              <input type="checkbox" checked={!anio} onChange={(e) => cambiar('periodo', e.target.checked ? 'todo' : null)} />
              Incluir las de hace más de un año
            </label>
          </div>
        </fieldset>
        <div className="ov-filtros__grupo">
          <label className="ov-filtros__leyenda" htmlFor="ov-registro-q">
            Buscar
          </label>
          <input
            id="ov-registro-q"
            className="ov-filtros__busqueda"
            type="search"
            value={q}
            placeholder="Identificador o palabra"
            onChange={(e) => cambiar('q', e.target.value || null)}
          />
        </div>
      </form>

      <p className="ov-explorador__cuenta" role="status" aria-live="polite">
        {estado.estado === 'listo' &&
          (filas.length === 0
            ? 'Ninguna corrección coincide con estos filtros.'
            : filas.length === 1
              ? 'Se muestra 1 corrección.'
              : `Se muestran ${filas.length} correcciones.`)}
      </p>

      {estado.estado === 'cargando' && <p className="ov-cargando ov-cargando--pagina">Cargando el registro…</p>}
      {estado.estado === 'error' && <p className="ov-aviso">No se ha podido leer el registro de correcciones.</p>}

      {estado.estado === 'listo' && filas.length > 0 && tabla && (
        <div className="ov-tabla-marco">
          <table className="ov-tabla ov-registro__tabla">
            <caption className="ov-oculto">Registro de correcciones</caption>
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Verificación</th>
                <th scope="col">Tipo</th>
                <th scope="col">Qué cambió</th>
                <th scope="col">Calificación</th>
                <th scope="col">Versión original</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f, i) => (
                <tr key={`${f.id}-${i}`}>
                  <td className="ov-registro__fecha">
                    <time dateTime={f.fecha}>{fechaCorta(f.fecha)}</time>
                  </td>
                  <th scope="row">
                    <Enlace to={`/portal/${f.id}`} className="ov-id">
                      {f.id}
                    </Enlace>
                    <span className="ov-registro__titular">{f.titular}</span>
                  </th>
                  <td>{f.tipo === 'actualizacion' ? 'Actualización' : 'Corrección'}</td>
                  <td>{f.nota}</td>
                  <td>{f.cambia ? `Cambia de ${f.anterior ?? '[sin dato]'} a ${f.actual}` : 'No cambia'}</td>
                  <td>{f.pdf ? <a href={f.pdf} target="_blank" rel="noopener">PDF</a> : <Pendiente />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {estado.estado === 'listo' && filas.length > 0 && !tabla && (
        <ol className="ov-registro__lista">
          {filas.map((f, i) => (
            <li key={`${f.id}-${i}`} className="ov-registro__item">
              <p className="ov-registro__fecha">
                <time dateTime={f.fecha}>{fechaLarga(f.fecha)}</time>, {f.tipo === 'actualizacion' ? 'actualización' : 'corrección'}
              </p>
              <h2 className="ov-h3">
                <Enlace to={`/portal/${f.id}`}>{f.titular}</Enlace>
              </h2>
              <p className="ov-id">{f.id}</p>
              <p>{f.nota}</p>
              <p className="ov-ficha__meta">
                {f.cambia ? `La calificación cambia de ${f.anterior ?? '[sin dato]'} a ${f.actual}.` : 'La calificación no cambia.'}{' '}
                {f.pdf ? (
                  <a href={f.pdf} target="_blank" rel="noopener">
                    Versión original en PDF
                  </a>
                ) : (
                  <Pendiente>PDF pendiente</Pendiente>
                )}
              </p>
            </li>
          ))}
        </ol>
      )}

      {estado.estado === 'listo' && filas.length === 0 && (
        <p>
          <button type="button" className="ov-boton" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
            Limpiar filtros
          </button>
        </p>
      )}

      <p className="ov-registro__origen">
        {estado.origen === 'hoja'
          ? 'Fuente: hoja de cálculo publicada del registro de correcciones.'
          : 'Fuente: archivo de ejemplo correcciones-ejemplo.csv. Con el servicio en marcha, el registro se leerá de la hoja publicada que se configure en CORRECCIONES_CSV_URL.'}
      </p>
    </div>
  );
}
