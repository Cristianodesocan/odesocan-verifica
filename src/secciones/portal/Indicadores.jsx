import { useMemo } from 'react';
import Grafico, { TablaCategorias } from './graficos/Grafico.jsx';
import BarrasHorizontales from './graficos/BarrasHorizontales.jsx';
import ColumnasMensuales from './graficos/ColumnasMensuales.jsx';
import Proporcion from './graficos/Proporcion.jsx';
import GlifoEscala from '../../componentes/GlifoEscala.jsx';
import { ESCALA } from '../../config/escala.js';
import { MATERIAS } from '../../config/materias.js';
import { ISLAS } from '../../config/islas.js';
import { fechaLarga, mesAnio, porcentaje, sumarMeses } from '../../data/formato.js';

const respondida = (r) => r?.ofrecida && r.respuesta && !/^(sin respuesta|no procede)/i.test(r.respuesta);

/**
 * Indicadores del portal (artículo 2.L del Código EFCSN, buena práctica de
 * informar del impacto). Los colores de la escala solo aparecen en la
 * distribución por calificación; temáticas e islas van en un tono neutro.
 * No se muestra la adscripción política de las emisoras.
 */
export default function Indicadores({ datos, ejemplo, hoy, filtros, alFiltrar }) {
  const c = useMemo(() => {
    const total = datos.length;
    const pct = (n, base = total) => porcentaje(base ? (n / base) * 100 : 0);
    const fechas = datos.map((v) => v.fecha_publicacion).sort();

    const calificacion = ESCALA.map((e) => {
      const valor = datos.filter((v) => v.calificacion?.valor === e.valor).length;
      return {
        clave: e.clave,
        etiqueta: e.etiqueta,
        valor,
        porcentaje: pct(valor),
        color: `var(--ov-${e.clave})`,
        glifo: <GlifoEscala forma={e.forma} tamano={16} />,
      };
    });

    const tematicas = MATERIAS.map((m) => {
      const valor = datos.filter((v) => v.materia === m.etiqueta).length;
      return { clave: m.id, etiqueta: m.etiqueta, valor, porcentaje: pct(valor) };
    })
      .filter((t) => t.valor > 0)
      .sort((a, b) => b.valor - a.valor || a.etiqueta.localeCompare(b.etiqueta));

    const islas = ISLAS.map((i) => {
      const valor = datos.filter((v) => v.isla === i.etiqueta).length;
      return { clave: i.id, etiqueta: i.etiqueta === 'Canarias' ? 'Canarias (ámbito autonómico)' : i.etiqueta, valor, porcentaje: pct(valor) };
    })
      .filter((t) => t.valor > 0)
      .sort((a, b) => b.valor - a.valor);

    const meses = Array.from({ length: 12 }, (_, i) => sumarMeses(`${hoy.slice(0, 7)}-01`, i - 11).slice(0, 7)).map((clave) => ({
      clave,
      etiqueta: mesAnio(clave),
      valor: datos.filter((v) => v.fecha_publicacion.startsWith(clave)).length,
    }));

    const ofrecidas = datos.filter((v) => v.replica?.ofrecida).length;
    const respondidas = datos.filter((v) => respondida(v.replica)).length;

    return { total, desde: fechas[0], hasta: fechas.at(-1), calificacion, tematicas, islas, meses, ofrecidas, respondidas, pct };
  }, [datos, hoy]);

  const replica = [
    {
      clave: 'ofrecida',
      texto: `Se ofreció réplica en ${c.ofrecidas} de las ${c.total} piezas (${c.pct(c.ofrecidas)}).`,
      parte: c.ofrecidas,
      total: c.total,
    },
    {
      clave: 'respondida',
      texto: `La parte respondió en ${c.respondidas} de esas ${c.ofrecidas} (${c.pct(c.respondidas, c.ofrecidas)}).`,
      parte: c.respondidas,
      total: c.ofrecidas,
    },
  ];

  return (
    <section className="ov-indicadores ov-navy" aria-labelledby="ov-indicadores-titulo">
      <div className="ov-contenedor">
        <h2 id="ov-indicadores-titulo" className="ov-h2 ov-indicadores__titulo">
          Indicadores
        </h2>
        <p className="ov-indicadores__resumen">
          Odesocan Verifica ha publicado {c.total} verificaciones{ejemplo ? ' de ejemplo' : ''} entre el {fechaLarga(c.desde)} y el{' '}
          {fechaLarga(c.hasta)}.
        </p>

        <div className="ov-indicadores__rejilla">
          <Grafico
            className="ov-grafico--calificacion"
            titulo="Verificaciones por calificación"
            nota="Pulsa una calificación para ver sus verificaciones en el explorador."
            tabla={<TablaCategorias titulo="Verificaciones por calificación" filas={c.calificacion} total={c.total} columna="Calificación" />}
          >
            <BarrasHorizontales filas={c.calificacion} seleccion={filtros.cal} alPulsar={(clave) => alFiltrar('cal', clave)} accion="Ver las verificaciones calificadas como" />
          </Grafico>

          <Grafico
            className="ov-grafico--tematicas"
            titulo="Temáticas más analizadas"
            nota="Pulsa una temática para ver sus verificaciones en el explorador."
            tabla={<TablaCategorias titulo="Temáticas más analizadas" filas={c.tematicas} total={c.total} columna="Temática" />}
          >
            <BarrasHorizontales filas={c.tematicas} seleccion={filtros.tema} alPulsar={(clave) => alFiltrar('tema', clave)} accion="Ver las verificaciones de" />
          </Grafico>

          <Grafico
            className="ov-grafico--meses"
            titulo="Publicadas por mes"
            nota="Últimos doce meses."
            tabla={
              <div className="ov-tabla-marco">
                <table className="ov-tabla">
                  <caption className="ov-oculto">Verificaciones publicadas por mes</caption>
                  <thead>
                    <tr>
                      <th scope="col">Mes</th>
                      <th scope="col" className="ov-num">
                        Verificaciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.meses.map((m) => (
                      <tr key={m.clave}>
                        <th scope="row">{m.etiqueta}</th>
                        <td className="ov-num">{m.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          >
            <ColumnasMensuales meses={c.meses} />
          </Grafico>

          <Grafico
            className="ov-grafico--replica"
            titulo="Réplica a las partes"
            nota="La réplica no se ofrece cuando la autoría es desconocida, como en los mensajes en cadena."
            tabla={
              <div className="ov-tabla-marco">
                <table className="ov-tabla">
                  <caption className="ov-oculto">Réplica a las partes</caption>
                  <thead>
                    <tr>
                      <th scope="col">Situación</th>
                      <th scope="col" className="ov-num">
                        Piezas
                      </th>
                      <th scope="col" className="ov-num">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Réplica ofrecida (sobre el total)</th>
                      <td className="ov-num">{c.ofrecidas}</td>
                      <td className="ov-num">{c.pct(c.ofrecidas)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Réplica respondida (sobre las ofrecidas)</th>
                      <td className="ov-num">{c.respondidas}</td>
                      <td className="ov-num">{c.pct(c.respondidas, c.ofrecidas)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          >
            <Proporcion filas={replica} />
          </Grafico>

          <Grafico
            className="ov-grafico--islas"
            titulo="Por isla"
            tabla={<TablaCategorias titulo="Verificaciones por isla" filas={c.islas} total={c.total} columna="Isla o ámbito" />}
          >
            <BarrasHorizontales filas={c.islas} />
          </Grafico>
        </div>

        <p className="ov-indicadores__cautela">
          El portal no muestra la adscripción política de las emisoras. Ese análisis corresponde al informe de balance anual, que lo
          acompaña del contexto y de las cautelas necesarias para interpretarlo.
        </p>
      </div>
    </section>
  );
}
