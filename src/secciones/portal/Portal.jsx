import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Enlace } from '../../componentes/Enlace.jsx';
import Pendiente from '../../componentes/Pendiente.jsx';
import TarjetaVerificacion from '../../componentes/TarjetaVerificacion.jsx';
import useVerificaciones from '../../hooks/useVerificaciones.js';
import useMediaQuery, { ESCRITORIO } from '../../hooks/useMediaQuery.js';
import useMovimientoReducido from '../../hooks/useMovimientoReducido.js';
import { FECHA_REFERENCIA_EJEMPLO, URLS } from '../../config/sitio.js';
import { hoyISO } from '../../data/formato.js';
import Indicadores from './Indicadores.jsx';
import Filtros from './Filtros.jsx';
import HojaFiltros from './HojaFiltros.jsx';
import MiraControl from './MiraControl.jsx';
import {
  aplicarFiltros,
  dimensionesActivas,
  escribirFiltros,
  leerFiltros,
  NOMBRES_DIMENSIONES,
} from './filtros.js';
import './portal.css';

/**
 * Portal de verificaciones: aviso de datos de ejemplo, indicadores,
 * explorador con filtros en la URL y acceso al registro de correcciones.
 */
export default function Portal() {
  const { estado, datos, meta } = useVerificaciones();
  const [params, setParams] = useSearchParams();
  const filtros = useMemo(() => leerFiltros(params), [params]);
  const hoy = meta.ejemplo ? FECHA_REFERENCIA_EJEMPLO : hoyISO();
  const resultados = useMemo(() => aplicarFiltros(datos, filtros, hoy), [datos, filtros, hoy]);
  const activas = dimensionesActivas(filtros);
  const escritorio = useMediaQuery(ESCRITORIO);
  const reducido = useMovimientoReducido();
  const [hoja, setHoja] = useState(false);
  const cuenta = useRef(null);

  const cambiar = (parcial) =>
    setParams(escribirFiltros({ ...filtros, ...parcial }), { replace: true, preventScrollReset: true });
  const limpiar = () => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true });

  // Al pulsar una barra de los indicadores se aplica ese filtro y la vista
  // baja a los resultados. Si ya era el único filtro de su dimensión, se quita.
  const desdeGrafico = (campo, valor) => {
    const actual = filtros[campo];
    cambiar({ [campo]: actual.length === 1 && actual[0] === valor ? [] : [valor] });
    requestAnimationFrame(() => {
      cuenta.current?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
      cuenta.current?.focus({ preventScroll: true });
    });
  };

  const total = datos.length;
  const n = resultados.length;
  const textoCuenta =
    estado !== 'listo'
      ? ''
      : n === 0
        ? 'Ninguna verificación coincide con estos filtros.'
        : n === total
          ? `Se muestran las ${total} verificaciones.`
          : `Se muestran ${n} de las ${total} verificaciones.`;
  const nombresActivos = NOMBRES_DIMENSIONES.filter((_, i) => activas[i]);
  const resumenControl = `${n} de ${total} verificaciones. ${
    nombresActivos.length ? `Filtros activos: ${nombresActivos.join(', ')}.` : 'Sin filtros activos.'
  }`;

  return (
    <>
      {/* El aviso se muestra también mientras cargan los datos, para que no
          desplace el contenido al aparecer; solo se retira si los datos
          cargados son reales. */}
      {(estado !== 'listo' || meta.ejemplo) && (
        <div className="ov-portal__aviso" role="note">
          <p className="ov-contenedor">Datos de ejemplo. El servicio aún no ha publicado verificaciones.</p>
        </div>
      )}

      <div className="ov-contenedor ov-cabeza">
        <h1 className="ov-titulo">Portal de verificaciones</h1>
        <p className="ov-sumario">
          Todas las verificaciones publicadas, con su evidencia, sus fuentes y las correcciones que hayan tenido.
        </p>
      </div>

      {estado === 'cargando' && <p className="ov-contenedor ov-cargando ov-cargando--pagina">Cargando las verificaciones…</p>}
      {estado === 'error' && (
        <p className="ov-contenedor">
          <span className="ov-aviso">No se han podido cargar las verificaciones. Vuelve a cargar la página.</span>
        </p>
      )}

      {estado === 'listo' && (
        <>
          <Indicadores datos={datos} ejemplo={meta.ejemplo} hoy={hoy} filtros={filtros} alFiltrar={desdeGrafico} />

          <section className="ov-contenedor ov-explorador" aria-labelledby="ov-explorador-titulo">
            <h2 id="ov-explorador-titulo" className="ov-h2">
              Explorador
            </h2>
            <div className="ov-explorador__rejilla">
              {escritorio && (
                <div className="ov-explorador__filtros">
                  <div className="ov-explorador__mira">
                    <MiraControl mostradas={n} activas={activas} />
                    <p className="ov-explorador__estado">
                      {n} de {total}
                    </p>
                  </div>
                  <Filtros filtros={filtros} alCambiar={cambiar} alLimpiar={limpiar} />
                </div>
              )}

              <div className="ov-explorador__resultados">
                <p ref={cuenta} className="ov-explorador__cuenta" role="status" aria-live="polite" tabIndex={-1}>
                  {textoCuenta}
                </p>
                {n > 0 ? (
                  <ul className="ov-resultados">
                    {resultados.map((v) => (
                      <li key={v.id}>
                        <TarjetaVerificacion v={v} grande />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="ov-vacio">
                    <p>Prueba con otro periodo, otra calificación u otra palabra, o vuelve a ver todas las verificaciones.</p>
                    <button type="button" className="ov-boton" onClick={limpiar}>
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="ov-contenedor ov-portal__mas" aria-labelledby="ov-portal-mas">
            <h2 id="ov-portal-mas" className="ov-h2">
              Correcciones e informes
            </h2>
            <ul className="ov-portal__enlaces">
              <li>
                <Enlace to="/portal/correcciones" className="ov-portal__enlace">
                  Registro de correcciones
                </Enlace>
                <p>Todas las correcciones y actualizaciones del último año, con la fecha, el motivo y la versión original de cada pieza.</p>
              </li>
              <li>
                {URLS.INFORMES_BALANCE_URL ? (
                  <a href={URLS.INFORMES_BALANCE_URL} className="ov-portal__enlace">
                    Informes de balance
                  </a>
                ) : (
                  <span className="ov-portal__enlace ov-portal__enlace--pendiente">
                    Informes de balance <Pendiente />
                  </span>
                )}
                <p>El balance anual del servicio, que incluye el análisis por tipo de emisora con su contexto.</p>
              </li>
            </ul>
          </section>

          {!escritorio && (
            <>
              <button
                type="button"
                className="ov-fab"
                aria-haspopup="dialog"
                aria-expanded={hoja}
                onClick={() => setHoja(true)}
              >
                <MiraControl mostradas={n} activas={activas} tamano={64} conLeyenda={false} />
                <span className="ov-fab__texto">Filtrar</span>
                <span className="ov-oculto">{resumenControl}</span>
              </button>
              <HojaFiltros
                abierta={hoja}
                alCerrar={() => setHoja(false)}
                filtros={filtros}
                alCambiar={cambiar}
                alLimpiar={limpiar}
                mostradas={n}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
