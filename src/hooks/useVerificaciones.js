import { useEffect, useState } from 'react';
import { cargarVerificaciones } from '../data/fuente.js';

/**
 * Carga las verificaciones a través del adaptador de datos.
 * Devuelve { estado: 'cargando' | 'listo' | 'error', datos, meta, error }.
 */
export default function useVerificaciones() {
  const [estado, setEstado] = useState({ estado: 'cargando', datos: [], meta: {} });
  useEffect(() => {
    let vivo = true;
    cargarVerificaciones()
      .then(({ verificaciones, meta }) => vivo && setEstado({ estado: 'listo', datos: verificaciones, meta }))
      .catch((error) => vivo && setEstado({ estado: 'error', datos: [], meta: {}, error }));
    return () => {
      vivo = false;
    };
  }, []);
  return estado;
}
