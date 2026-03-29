/**
 * Parámetros orientativos para la estimación de Ganancias (relación de dependencia).
 * Actualizar según criterio profesional o cambios de escala — no constituyen asesoramiento legal.
 *
 * ⚠️ IMPORTANTE: Todos los valores son referencias orientativas 2025.
 * Deben revisarse ante cada actualización normativa (RG AFIP / actualizaciones trimestrales).
 */

/** Proyección anual del sueldo (incluye aguinaldo a modo orientativo). */
export const MULTIPLICADOR_SUELDO_ANUAL = 13;

/**
 * Mínimo No Imponible anual orientativo (referencia 2025).
 * Solo MNI — no incluye la Deducción Especial.
 */
export const MNI_ANUAL = 4_215_000;

/**
 * Deducción Especial para empleados en relación de dependencia (orientativo 2025).
 * Equivale aproximadamente a 3.8 × MNI.
 * Para empleados en relación de dependencia, este es el componente principal que
 * eleva el umbral real de retención.
 */
export const DEDUCCION_ESPECIAL_EMPLEADOS_ANUAL = 16_017_000;

/**
 * Deducción general combinada: MNI + Deducción Especial (orientativo 2025).
 * Representa el total de deducción base para un empleado soltero sin
 * deducciones adicionales. Actualizar si cambia la normativa.
 */
export const DEDUCCION_GENERAL_ANUAL = MNI_ANUAL + DEDUCCION_ESPECIAL_EMPLEADOS_ANUAL;
// ~20,232,000 ARS anuales

/** Por cada hijo a cargo (orientativo 2025). */
export const DEDUCCION_POR_HIJO_ANUAL = 4_000_000;

/** Ajuste adicional si el estado civil es casado/a (orientativo 2025). */
export const DEDUCCION_ADICIONAL_CASADO_ANUAL = 2_000_000;

/** Topes anuales por tipo de deducción (se toma el menor entre monto informado y tope). */
export const TOPE_ALQUILER_ANUAL = 7_200_000;
export const TOPE_PREPAGA_ANUAL = 4_500_000;
export const TOPE_SERVICIO_DOMESTICO_ANUAL = 2_800_000;

/** Si marcó la deducción y no ingresó monto, se usa esta referencia anual. */
export const DEFAULT_ALQUILER_SIN_MONTO_ANUAL = 3_600_000;
export const DEFAULT_PREPAGA_SIN_MONTO_ANUAL = 2_160_000;
export const DEFAULT_SERVICIO_SIN_MONTO_ANUAL = 1_680_000;

/**
 * Escala progresiva orientativa sobre la base imponible anual (tasa marginal por tramo).
 * Valores de referencia 2025 — actualizar ante cambios normativos.
 */
export const ESCALA_GANANCIAS_TRAMOS: ReadonlyArray<{
  desde: number;
  hasta: number;
  tasa: number;
}> = [
  { desde: 0, hasta: 18_000_000, tasa: 0.05 },
  { desde: 18_000_000, hasta: 54_000_000, tasa: 0.09 },
  { desde: 54_000_000, hasta: 108_000_000, tasa: 0.12 },
  { desde: 108_000_000, hasta: Number.POSITIVE_INFINITY, tasa: 0.15 },
];

export type EstadoCivilGanancias = "soltero" | "casado";

export type DeduccionItem = {
  activo: boolean;
  /** Monto anual informado; si activo y ausente, se usa default del tipo. */
  montoAnual?: number;
};

export type InputCalculadoraGanancias = {
  sueldoBrutoMensual: number;
  estadoCivil: EstadoCivilGanancias;
  cantidadHijos: number;
  alquiler: DeduccionItem;
  prepaga: DeduccionItem;
  servicioDomestico: DeduccionItem;
  /** Otras deducciones anuales (único campo numérico directo). */
  otrasDeduccionesAnual: number;
};

export type ResultadoCalculadoraGanancias = {
  brutoAnualProyectado: number;
  totalDeduccionesAnual: number;
  baseImponibleAnual: number;
  impuestoAnualEstimado: number;
  impuestoMensualEstimado: number;
  desgloseDeducciones: {
    general: number;
    hijos: number;
    casado: number;
    alquiler: number;
    prepaga: number;
    servicioDomestico: number;
    otras: number;
  };
  /** Si la base es <= 0 o el impuesto anual es 0 tras la escala. */
  hayImpactoEstimadoPositivo: boolean;
};

function clampDeduccion(
  activo: boolean,
  montoInformado: number | undefined,
  tope: number,
  defaultSinMonto: number
): number {
  if (!activo) return 0;
  const base =
    montoInformado !== undefined && Number.isFinite(montoInformado) && montoInformado > 0
      ? montoInformado
      : defaultSinMonto;
  return Math.min(base, tope);
}

/** Impuesto anual por tramos marginales (solo sobre base imponible > 0). */
export function calcularImpuestoAnualProgresivo(baseImponible: number): number {
  if (baseImponible <= 0) return 0;
  let impuesto = 0;
  for (const tramo of ESCALA_GANANCIAS_TRAMOS) {
    const topeTramo = tramo.hasta;
    const baseTramo = Math.min(baseImponible, topeTramo) - tramo.desde;
    if (baseTramo > 0) {
      impuesto += baseTramo * tramo.tasa;
    }
    if (baseImponible <= topeTramo) break;
  }
  return impuesto;
}

export function calcularEstimacionGanancias(
  input: InputCalculadoraGanancias
): ResultadoCalculadoraGanancias {
  const brutoAnualProyectado = input.sueldoBrutoMensual * MULTIPLICADOR_SUELDO_ANUAL;

  const dedGeneral = DEDUCCION_GENERAL_ANUAL;
  const dedHijos = Math.max(0, input.cantidadHijos) * DEDUCCION_POR_HIJO_ANUAL;
  const dedCasado =
    input.estadoCivil === "casado" ? DEDUCCION_ADICIONAL_CASADO_ANUAL : 0;

  const dedAlquiler = clampDeduccion(
    input.alquiler.activo,
    input.alquiler.montoAnual,
    TOPE_ALQUILER_ANUAL,
    DEFAULT_ALQUILER_SIN_MONTO_ANUAL
  );
  const dedPrepaga = clampDeduccion(
    input.prepaga.activo,
    input.prepaga.montoAnual,
    TOPE_PREPAGA_ANUAL,
    DEFAULT_PREPAGA_SIN_MONTO_ANUAL
  );
  const dedServicio = clampDeduccion(
    input.servicioDomestico.activo,
    input.servicioDomestico.montoAnual,
    TOPE_SERVICIO_DOMESTICO_ANUAL,
    DEFAULT_SERVICIO_SIN_MONTO_ANUAL
  );

  const otras = Math.max(0, input.otrasDeduccionesAnual || 0);

  const totalDeduccionesAnual =
    dedGeneral +
    dedHijos +
    dedCasado +
    dedAlquiler +
    dedPrepaga +
    dedServicio +
    otras;

  const baseImponibleAnual = brutoAnualProyectado - totalDeduccionesAnual;

  if (baseImponibleAnual <= 0) {
    return {
      brutoAnualProyectado,
      totalDeduccionesAnual,
      baseImponibleAnual,
      impuestoAnualEstimado: 0,
      impuestoMensualEstimado: 0,
      desgloseDeducciones: {
        general: dedGeneral,
        hijos: dedHijos,
        casado: dedCasado,
        alquiler: dedAlquiler,
        prepaga: dedPrepaga,
        servicioDomestico: dedServicio,
        otras,
      },
      hayImpactoEstimadoPositivo: false,
    };
  }

  const impuestoAnualEstimado = calcularImpuestoAnualProgresivo(baseImponibleAnual);
  const impuestoMensualEstimado = impuestoAnualEstimado / 12;

  return {
    brutoAnualProyectado,
    totalDeduccionesAnual,
    baseImponibleAnual,
    impuestoAnualEstimado,
    impuestoMensualEstimado,
    desgloseDeducciones: {
      general: dedGeneral,
      hijos: dedHijos,
      casado: dedCasado,
      alquiler: dedAlquiler,
      prepaga: dedPrepaga,
      servicioDomestico: dedServicio,
      otras,
    },
    hayImpactoEstimadoPositivo: impuestoAnualEstimado > 0,
  };
}
