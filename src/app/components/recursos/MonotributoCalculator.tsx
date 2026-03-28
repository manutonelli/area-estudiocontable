import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Calculator } from "lucide-react";
import {
  estimarCategoriaMonotributo,
  type EstimacionMonotributo,
} from "@/config/monotributoCategorias";
import { ResultCard } from "./ResultCard";

const ACTIVIDADES = [
  { value: "servicios", label: "Servicios" },
  { value: "productos", label: "Venta de productos" },
  { value: "otro", label: "Otro" },
] as const;

type ActividadValue = (typeof ACTIVIDADES)[number]["value"];

export function MonotributoCalculator() {
  const [facturacionRaw, setFacturacionRaw] = useState("");
  const [tieneLocal, setTieneLocal] = useState<"si" | "no">("no");
  const [actividad, setActividad] = useState<ActividadValue>("servicios");
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{
    facturacion: number;
    estimacion: EstimacionMonotributo;
  } | null>(null);

  const actividadLabel =
    ACTIVIDADES.find((a) => a.value === actividad)?.label ?? "—";

  const parseFacturacion = (raw: string): number | null => {
    const cleaned = raw.replace(/\./g, "").replace(",", ".").trim();
    if (cleaned === "") return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };

  const handleCalcular = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const valor = parseFacturacion(facturacionRaw);
    if (valor === null) {
      setError("Ingresá un monto válido, por ejemplo 8500000.");
      setResultado(null);
      return;
    }

    const estimacion = estimarCategoriaMonotributo(valor);
    if (estimacion.tipo === "invalido") {
      setError("El monto tiene que ser un número mayor a cero.");
      setResultado(null);
      return;
    }

    setResultado({ facturacion: valor, estimacion });
  };

  const handleRecalcular = () => {
    setResultado(null);
    setError(null);
  };

  const mostrarResultado =
    resultado &&
    resultado.estimacion.tipo !== "invalido";

  return (
    <div id="calculadora-monotributo" className="scroll-mt-28">
      <div className="max-w-2xl mx-auto mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 text-[#63868A] mb-4">
          <Calculator className="w-5 h-5" aria-hidden />
          <span className="text-xs uppercase tracking-[0.2em]">Herramienta</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#282F3F] mb-4">
          Calculadora de Monotributo
        </h2>
        <p className="text-[#3D5466] text-lg leading-relaxed mb-3">
          Ingresá tu facturación anual estimada y obtené una referencia de la
          categoría en la que podrías estar.
        </p>
        <p className="text-[#3D5466]/80 text-sm leading-relaxed">
          Es una estimación orientativa y puede variar según cada caso. No reemplaza
          el asesoramiento profesional.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleCalcular}
          initial={false}
          className="rounded-2xl border border-[#C7C1CB]/35 bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(40,47,63,0.05)] space-y-8"
        >
          <div>
            <label
              htmlFor="facturacion-anual"
              className="block text-sm font-medium text-[#282F3F] mb-2"
            >
              Facturación anual estimada
            </label>
            <input
              id="facturacion-anual"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ej: 8500000"
              value={facturacionRaw}
              onChange={(e) => {
                setFacturacionRaw(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] placeholder:text-[#C7C1CB] focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] transition-all text-base"
            />
            <p className="mt-2 text-xs text-[#3D5466]/70">
              Podés escribir el número con o sin puntos de miles.
            </p>
          </div>

          <div>
            <span className="block text-sm font-medium text-[#282F3F] mb-3">
              ¿Tenés local comercial?
            </span>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  { v: "no" as const, label: "No" },
                  { v: "si" as const, label: "Sí" },
                ] as const
              ).map(({ v, label }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTieneLocal(v)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    tieneLocal === v
                      ? "bg-[#282F3F] text-white shadow-sm"
                      : "bg-[#C7C1CB]/20 text-[#3D5466] hover:bg-[#C7C1CB]/35"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="actividad"
              className="block text-sm font-medium text-[#282F3F] mb-2"
            >
              Actividad <span className="font-normal text-[#3D5466]/80">(opcional)</span>
            </label>
            <select
              id="actividad"
              value={actividad}
              onChange={(e) =>
                setActividad(e.target.value as ActividadValue)
              }
              className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] bg-white focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] transition-all text-base appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%233D5466' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
              }}
            >
              {ACTIVIDADES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-[#3D5466]/70">
              Los topes pueden variar según el tipo de actividad; esta herramienta usa
              una escala general de referencia.
            </p>
          </div>

          {error && (
            <p
              className="text-sm text-[#3D5466] bg-[#C7C1CB]/15 border border-[#C7C1CB]/40 rounded-xl px-4 py-3"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#282F3F] text-white text-base font-semibold hover:bg-[#3D5466] transition-colors shadow-sm"
          >
            Calcular categoría
          </button>
        </motion.form>

        {mostrarResultado && (
          <div className="mt-10">
            <ResultCard
              facturacion={resultado.facturacion}
              estimacion={resultado.estimacion}
              actividadLabel={actividadLabel}
              tieneLocal={tieneLocal === "si"}
              onRecalcular={handleRecalcular}
            />
          </div>
        )}
      </div>
    </div>
  );
}
