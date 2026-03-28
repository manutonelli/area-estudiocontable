import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { PiggyBank } from "lucide-react";
import {
  calcularEstimacionGanancias,
  type EstadoCivilGanancias,
  type InputCalculadoraGanancias,
  type ResultadoCalculadoraGanancias,
} from "@/config/gananciasCalculadora";
import { GananciasResultCard } from "./GananciasResultCard";

function parseMonto(raw: string): number | null {
  const cleaned = raw.replace(/\./g, "").replace(",", ".").trim();
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function GananciasCalculator() {
  const [sueldoRaw, setSueldoRaw] = useState("");
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivilGanancias>("soltero");
  const [hijosRaw, setHijosRaw] = useState("0");
  const [alquilerOn, setAlquilerOn] = useState(false);
  const [alquilerMontoRaw, setAlquilerMontoRaw] = useState("");
  const [prepagaOn, setPrepagaOn] = useState(false);
  const [prepagaMontoRaw, setPrepagaMontoRaw] = useState("");
  const [servicioOn, setServicioOn] = useState(false);
  const [servicioMontoRaw, setServicioMontoRaw] = useState("");
  const [otrasRaw, setOtrasRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoCalculadoraGanancias | null>(
    null
  );

  const handleCalcular = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const sueldo = parseMonto(sueldoRaw);
    if (sueldo === null || sueldo <= 0) {
      setError("Ingresá tu sueldo bruto mensual con un valor válido, por ejemplo 2500000.");
      setResultado(null);
      return;
    }

    const hijosParsed = parseInt(hijosRaw, 10);
    const hijos = Number.isFinite(hijosParsed) && hijosParsed >= 0 ? hijosParsed : 0;

    const otras = parseMonto(otrasRaw) ?? 0;
    if (otras < 0) {
      setError("Las otras deducciones no pueden ser negativas.");
      setResultado(null);
      return;
    }

    const input: InputCalculadoraGanancias = {
      sueldoBrutoMensual: sueldo,
      estadoCivil,
      cantidadHijos: hijos,
      alquiler: {
        activo: alquilerOn,
        montoAnual: (() => {
          if (!alquilerOn) return undefined;
          const m = parseMonto(alquilerMontoRaw);
          return m !== null && m > 0 ? m : undefined;
        })(),
      },
      prepaga: {
        activo: prepagaOn,
        montoAnual: (() => {
          if (!prepagaOn) return undefined;
          const m = parseMonto(prepagaMontoRaw);
          return m !== null && m > 0 ? m : undefined;
        })(),
      },
      servicioDomestico: {
        activo: servicioOn,
        montoAnual: (() => {
          if (!servicioOn) return undefined;
          const m = parseMonto(servicioMontoRaw);
          return m !== null && m > 0 ? m : undefined;
        })(),
      },
      otrasDeduccionesAnual: otras,
    };

    setResultado(calcularEstimacionGanancias(input));
  };

  const handleRecalcular = () => {
    setResultado(null);
    setError(null);
  };

  return (
    <div id="calculadora-ganancias" className="scroll-mt-28 pt-8 md:pt-12 border-t border-[#C7C1CB]/30">
      <div className="max-w-2xl mx-auto mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 text-[#63868A] mb-4">
          <PiggyBank className="w-5 h-5" aria-hidden />
          <span className="text-xs uppercase tracking-[0.2em]">Herramienta</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#282F3F] mb-4">
          Calculadora de Ganancias
        </h2>
        <p className="text-[#3D5466] text-lg leading-relaxed mb-3">
          Una estimación simple para entender cómo pueden impactar tus ingresos y
          deducciones.
        </p>
        <p className="text-[#3D5466] leading-relaxed mb-2">
          Si trabajás en relación de dependencia, esta herramienta te da una referencia
          inicial para entender mejor tu situación.
        </p>
        <p className="text-[#3D5466]/80 text-sm leading-relaxed">
          Es un cálculo orientativo y puede variar según normativa vigente y tu caso
          particular.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleCalcular}
          className="rounded-2xl border border-[#C7C1CB]/35 bg-white p-6 md:p-10 shadow-[0_4px_24px_rgba(40,47,63,0.05)] space-y-8"
        >
          <div>
            <label
              htmlFor="sueldo-bruto"
              className="block text-sm font-medium text-[#282F3F] mb-2"
            >
              Sueldo bruto mensual
            </label>
            <input
              id="sueldo-bruto"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ej: 2500000"
              value={sueldoRaw}
              onChange={(e) => {
                setSueldoRaw(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] placeholder:text-[#C7C1CB] focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] transition-all text-base"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="estado-civil"
                className="block text-sm font-medium text-[#282F3F] mb-2"
              >
                Estado civil
              </label>
              <select
                id="estado-civil"
                value={estadoCivil}
                onChange={(e) =>
                  setEstadoCivil(e.target.value as EstadoCivilGanancias)
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] bg-white focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] text-base"
              >
                <option value="soltero">Soltero/a</option>
                <option value="casado">Casado/a</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="hijos"
                className="block text-sm font-medium text-[#282F3F] mb-2"
              >
                Cantidad de hijos
              </label>
              <input
                id="hijos"
                type="number"
                min={0}
                step={1}
                value={hijosRaw}
                onChange={(e) => setHijosRaw(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] text-base"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#282F3F] mb-4">Deducciones</p>
            <div className="space-y-5">
              <DeduccionToggle
                id="ded-alquiler"
                label="Alquiler"
                checked={alquilerOn}
                onCheckedChange={setAlquilerOn}
                montoPlaceholder="Monto anual estimado (opcional)"
                montoValue={alquilerMontoRaw}
                onMontoChange={setAlquilerMontoRaw}
              />
              <DeduccionToggle
                id="ded-prepaga"
                label="Medicina prepaga"
                checked={prepagaOn}
                onCheckedChange={setPrepagaOn}
                montoPlaceholder="Monto anual estimado (opcional)"
                montoValue={prepagaMontoRaw}
                onMontoChange={setPrepagaMontoRaw}
              />
              <DeduccionToggle
                id="ded-servicio"
                label="Servicio doméstico"
                checked={servicioOn}
                onCheckedChange={setServicioOn}
                montoPlaceholder="Monto anual estimado (opcional)"
                montoValue={servicioMontoRaw}
                onMontoChange={setServicioMontoRaw}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="otras-ded"
              className="block text-sm font-medium text-[#282F3F] mb-2"
            >
              Otras deducciones <span className="font-normal text-[#3D5466]/80">(anual, opcional)</span>
            </label>
            <input
              id="otras-ded"
              type="text"
              inputMode="decimal"
              placeholder="Ej: 200000"
              value={otrasRaw}
              onChange={(e) => setOtrasRaw(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-[#C7C1CB]/50 text-[#282F3F] placeholder:text-[#C7C1CB] focus:outline-none focus:ring-2 focus:ring-[#63868A]/50 focus:border-[#63868A] text-base"
            />
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
            Calcular
          </button>
        </motion.form>

        {resultado && (
          <div className="mt-10">
            <GananciasResultCard
              resultado={resultado}
              resumenFlags={{
                hijos: Math.max(0, parseInt(hijosRaw, 10) || 0),
                alquiler: alquilerOn,
                prepaga: prepagaOn,
                servicioDomestico: servicioOn,
              }}
              onRecalcular={handleRecalcular}
            />
          </div>
        )}
      </div>
    </div>
  );
}

type DeduccionToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  montoPlaceholder: string;
  montoValue: string;
  onMontoChange: (v: string) => void;
};

function DeduccionToggle({
  id,
  label,
  checked,
  onCheckedChange,
  montoPlaceholder,
  montoValue,
  onMontoChange,
}: DeduccionToggleProps) {
  return (
    <div className="rounded-xl border border-[#C7C1CB]/40 p-4 bg-[#C7C1CB]/5">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="h-4 w-4 rounded border-[#C7C1CB] text-[#282F3F] focus:ring-[#63868A]"
        />
        <span className="text-sm font-medium text-[#282F3F]">{label}</span>
      </label>
      {checked && (
        <div className="mt-3 pl-7">
          <input
            type="text"
            inputMode="decimal"
            placeholder={montoPlaceholder}
            value={montoValue}
            onChange={(e) => onMontoChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-[#C7C1CB]/50 text-sm text-[#282F3F] placeholder:text-[#C7C1CB]/80 focus:outline-none focus:ring-2 focus:ring-[#63868A]/40"
          />
          <p className="text-xs text-[#3D5466]/65 mt-1.5">
            Si lo dejás vacío, usamos una referencia interna acotada por tope.
          </p>
        </div>
      )}
    </div>
  );
}
