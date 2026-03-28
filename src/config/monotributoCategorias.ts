/**
 * Topes de ingresos brutos anuales por categoría (locación de servicios / orientativo).
 * Actualizar según tablas vigentes AFIP/ARCA — son referencia para el MVP.
 * Orden: de menor a mayor tope; la primera categoría cuyo máximo cubre el monto aplica.
 */
export const monotributoCategorias = [
  { categoria: "A", maxAnual: 10_277_988.13 },
  { categoria: "B", maxAnual: 15_058_447.71 },
  { categoria: "C", maxAnual: 21_113_696.52 },
  { categoria: "D", maxAnual: 26_212_853.42 },
  { categoria: "E", maxAnual: 30_833_964.37 },
  { categoria: "F", maxAnual: 38_642_048.36 },
  { categoria: "G", maxAnual: 46_211_109.37 },
  { categoria: "H", maxAnual: 70_113_407.33 },
  { categoria: "I", maxAnual: 78_479_211.62 },
  { categoria: "J", maxAnual: 89_872_640.3 },
  { categoria: "K", maxAnual: 108_357_084.05 },
] as const;

export type EstimacionMonotributo =
  | { tipo: "categoria"; categoria: string }
  | { tipo: "excede" }
  | { tipo: "invalido" };

export function estimarCategoriaMonotributo(
  facturacionAnual: number
): EstimacionMonotributo {
  if (!Number.isFinite(facturacionAnual) || facturacionAnual <= 0) {
    return { tipo: "invalido" };
  }

  for (const row of monotributoCategorias) {
    if (facturacionAnual <= row.maxAnual) {
      return { tipo: "categoria", categoria: row.categoria };
    }
  }

  return { tipo: "excede" };
}
