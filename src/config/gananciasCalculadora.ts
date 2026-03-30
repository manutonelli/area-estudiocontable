// =============================================================================
// ✏️  ACTUALIZACIÓN SEMESTRAL — ÚNICO BLOQUE A MODIFICAR
// =============================================================================
// Cada semestre ARCA publica nuevas tablas. Pasos:
//   1. Descargar el PDF oficial de ARCA:
//      https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/
//   2. Buscar la columna "IMPORTE ACUMULADO DICIEMBRE $" (es el total anual).
//   3. Reemplazar los valores de este bloque con los del nuevo PDF.
//   4. Actualizar PERIODO_VIGENTE con el nuevo semestre.
//   5. Guardar — la calculadora se actualiza sola.
// =============================================================================

/** Período vigente — se muestra en el encabezado de la calculadora */
export const PERIODO_VIGENTE = "Enero–Junio 2026";

// --- Fuente: ARCA — "IMPORTE DE LA DEDUCCIÓN A DICIEMBRE 2026 $" ---

/** Art. 30 inc. a) — Ganancias no imponibles (MNI) */
export const MNI_ANUAL = 5_151_802.50;

/** Art. 30 inc. c), Apartado 2 — Deducción Especial empleados en relación de dependencia */
export const DEDUCCION_ESPECIAL_EMPLEADOS_ANUAL = 24_728_652.02;

/** Art. 30 inc. b) punto 1 — Cónyuge o unión convivencial a cargo */
export const DEDUCCION_CONYUGE_ANUAL = 4_851_964.66;

/** Art. 30 inc. b) punto 2 — Hijo/a menor de 18 años */
export const DEDUCCION_POR_HIJO_ANUAL = 2_446_863.48;

/** Art. 30 inc. b) punto 2.1 — Hijo/a incapacitado/a para el trabajo */
export const DEDUCCION_HIJO_INCAPACITADO_ANUAL = 4_893_726.96;

/**
 * Tope mensual base imponible aportes previsionales (SIPA).
 * Se actualiza trimestralmente — verificar en AFIP/ARCA.
 */
export const TOPE_APORTES_MENSUAL = 3_500_000;

// =============================================================================
// 🔒 NO MODIFICAR — Lógica derivada y constantes fijas
// =============================================================================

/** MNI + Deducción Especial = base total para empleado soltero sin cargas de familia */
export const DEDUCCION_GENERAL_ANUAL = MNI_ANUAL + DEDUCCION_ESPECIAL_EMPLEADOS_ANUAL;

/** 11% jubilación + 3% obra social + 3% PAMI = 17% total aportes */
export const TASA_APORTES_PREVISIONALES = 0.17;

/**
 * Escala progresiva Art. 94 LIG (Ley 27.743).
 * Solo modificar si cambia la ley — no es semestral.
 */
export const ESCALA_GANANCIAS_TRAMOS: ReadonlyArray<{
  desde: number;
  hasta: number;
  tasa: number;
}> = [
  { desde: 0,           hasta: 18_000_000,            tasa: 0.05 },
  { desde: 18_000_000,  hasta: 54_000_000,             tasa: 0.09 },
  { desde: 54_000_000,  hasta: 108_000_000,            tasa: 0.12 },
  { desde: 108_000_000, hasta: Number.POSITIVE_INFINITY, tasa: 0.15 },
];

export type InputCalculadoraGanancias = {
  sueldoBrutoMensual: number;
  ingresosExtraAnuales: number;
  incluirSAC: boolean;
  conyugeACargo: boolean;
  hijosMenores18: number;
  hijosIncapacitados: number;
  otrasDeduccionesAnual: number;
};

export type ResultadoCalculadoraGanancias = {
  brutoAnualProyectado: number;
  totalDeduccionesAnual: number;
  baseImponibleAnual: number;
  impuestoAnualEstimado: number;
  retencionMensualEstimada: number;
  porcentajeEfectivo: number;
  aportesPrevisionalMensual: number;
  sueldoNetoDeBolsillo: number;
  pctNeto: number;
  pctAportes: number;
  pctGanancias: number;
};

export function calcularImpuestoAnualProgresivo(baseImponible: number): number {
  if (baseImponible <= 0) return 0;
  let impuesto = 0;
  for (const tramo of ESCALA_GANANCIAS_TRAMOS) {
    const baseTramo = Math.min(baseImponible, tramo.hasta) - tramo.desde;
    if (baseTramo > 0) impuesto += baseTramo * tramo.tasa;
    if (baseImponible <= tramo.hasta) break;
  }
  return impuesto;
}

export function calcularEstimacionGanancias(
  input: InputCalculadoraGanancias
): ResultadoCalculadoraGanancias {
  const multiplicador = input.incluirSAC ? 13 : 12;
  const brutoAnualProyectado =
    input.sueldoBrutoMensual * multiplicador + Math.max(0, input.ingresosExtraAnuales);

  const dedGeneral = DEDUCCION_GENERAL_ANUAL;
  const dedConyuge = input.conyugeACargo ? DEDUCCION_CONYUGE_ANUAL : 0;
  const dedHijos = Math.max(0, input.hijosMenores18) * DEDUCCION_POR_HIJO_ANUAL;
  const dedHijosIncap = Math.max(0, input.hijosIncapacitados) * DEDUCCION_HIJO_INCAPACITADO_ANUAL;
  const otras = Math.max(0, input.otrasDeduccionesAnual || 0);

  const totalDeduccionesAnual = dedGeneral + dedConyuge + dedHijos + dedHijosIncap + otras;
  const baseImponibleAnual = brutoAnualProyectado - totalDeduccionesAnual;

  const impuestoAnualEstimado = calcularImpuestoAnualProgresivo(Math.max(0, baseImponibleAnual));
  const retencionMensualEstimada = impuestoAnualEstimado / 12;
  const porcentajeEfectivo =
    input.sueldoBrutoMensual > 0
      ? (retencionMensualEstimada / input.sueldoBrutoMensual) * 100
      : 0;

  const baseAportes = Math.min(input.sueldoBrutoMensual, TOPE_APORTES_MENSUAL);
  const aportesPrevisionalMensual = baseAportes * TASA_APORTES_PREVISIONALES;

  const sueldoNetoDeBolsillo =
    input.sueldoBrutoMensual - aportesPrevisionalMensual - retencionMensualEstimada;

  const pctAportes =
    input.sueldoBrutoMensual > 0
      ? (aportesPrevisionalMensual / input.sueldoBrutoMensual) * 100
      : 0;
  const pctGanancias =
    input.sueldoBrutoMensual > 0
      ? (retencionMensualEstimada / input.sueldoBrutoMensual) * 100
      : 0;
  const pctNeto = Math.max(0, 100 - pctAportes - pctGanancias);

  return {
    brutoAnualProyectado,
    totalDeduccionesAnual,
    baseImponibleAnual,
    impuestoAnualEstimado,
    retencionMensualEstimada,
    porcentajeEfectivo,
    aportesPrevisionalMensual,
    sueldoNetoDeBolsillo,
    pctNeto,
    pctAportes,
    pctGanancias,
  };
}
