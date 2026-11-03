/**
 * Lector de CSV (RFC 4180) sin dependencias: comillas, comas y saltos de
 * línea dentro de los campos. Pensado para la hoja de Google publicada como
 * CSV («Archivo > Compartir > Publicar en la Web > CSV»).
 */
export function leerCSV(texto, separador = ',') {
  const filas = [];
  let fila = [];
  let campo = '';
  let entreComillas = false;
  const t = texto.replace(/^﻿/, '');

  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (entreComillas) {
      if (c === '"') {
        if (t[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          entreComillas = false;
        }
      } else {
        campo += c;
      }
    } else if (c === '"') {
      entreComillas = true;
    } else if (c === separador) {
      fila.push(campo);
      campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = '';
    } else {
      campo += c;
    }
  }
  if (campo !== '' || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }

  const [cabecera = [], ...resto] = filas.filter((f) => f.some((v) => v.trim() !== ''));
  const claves = cabecera.map((c) => c.trim());
  return resto.map((f) => Object.fromEntries(claves.map((k, i) => [k, (f[i] ?? '').trim()])));
}

/**
 * Convierte una fila plana en un objeto anidado: las columnas con punto
 * («afirmacion.texto») se anidan y los valores que empiezan por [ o { se
 * interpretan como JSON (listas de fuentes, evidencia, correcciones).
 */
export function desaplanar(fila) {
  const salida = {};
  for (const [clave, bruto] of Object.entries(fila)) {
    const valor = interpretar(bruto);
    const partes = clave.split('.');
    let nodo = salida;
    partes.forEach((p, i) => {
      if (i === partes.length - 1) nodo[p] = valor;
      else nodo = nodo[p] ??= {};
    });
  }
  return salida;
}

function interpretar(v) {
  if (v === '') return null;
  if (v === 'true' || v === 'TRUE' || v === 'sí' || v === 'Sí') return true;
  if (v === 'false' || v === 'FALSE' || v === 'no' || v === 'No') return false;
  if (/^[[{]/.test(v)) {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  if (/^-?\d+$/.test(v)) return Number(v);
  return v;
}
