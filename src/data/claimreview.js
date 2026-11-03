/**
 * Marcado ClaimReview (schema.org) generado desde el contrato de datos.
 *
 * reviewRating va de 1 (Falso) a 4 (Verdadero), con la etiqueta en
 * alternateName. En el prototipo no se inyecta en la página porque los
 * datos son ficticios: se muestra en la ficha como bloque plegable y solo se
 * inserta en <head> con VITE_CLAIMREVIEW=on.
 *
 * La emisora se describe por su tipo y no por su nombre, así que se omite
 * itemReviewed.author; con datos reales lo decidirá el equipo.
 */
import { ENTIDAD } from '../config/sitio.js';

export function generarClaimReview(v, urlFicha) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url: urlFicha,
    datePublished: v.fecha_publicacion,
    inLanguage: 'es',
    author: {
      '@type': 'Organization',
      name: `${ENTIDAD.nombre} (${ENTIDAD.siglas})`,
      url: ENTIDAD.web,
    },
    claimReviewed: v.afirmacion?.texto,
    itemReviewed: {
      '@type': 'Claim',
      datePublished: v.afirmacion?.fecha,
      appearance: v.afirmacion?.enlace_archivado
        ? { '@type': 'CreativeWork', url: v.afirmacion.enlace_archivado }
        : undefined,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: v.calificacion?.valor,
      worstRating: 1,
      bestRating: 4,
      alternateName: v.calificacion?.etiqueta,
    },
    headline: v.titular,
  };
}
