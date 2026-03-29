import { motion } from "motion/react";
import type { ResultadoCalculadoraGanancias } from "@/config/gananciasCalculadora";
import { WHATSAPP_URL } from "@/config/contact";

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

type GananciasResultCardProps = {
  resultado: ResultadoCalculadoraGanancias;
  resumenFlags: {
    hijos: number;
    alquiler: boolean;
    prepaga: boolean;
    servicioDomestico: boolean;
  };
  onRecalcular: () => void;
};

export function GananciasResultCard({
  resultado,
  resumenFlags,
  onRecalcular,
}: GananciasResultCardProps) {
  const bajoImpacto = !resultado.hayImpactoEstimadoPositivo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-[#C7C1CB]/40 bg-gradient-to-br from-[#63868A]/12 to-white p-8 md:p-10 shadow-[0_8px_30px_rgba(40,47,63,0.06)]"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#3D5466] mb-4">
        Resultado
      </p>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-xl bg-white/90 border border-[#C7C1CB]/30 px-5 py-4">
          <p className="text-xs text-[#3D5466] mb-1">Base imponible estimada (anual)</p>
          <p className="text-xl font-bold text-[#282F3F]">
            {formatARS(Math.max(0, resultado.baseImponibleAnual))}
          </p>
        </div>
        <div className="rounded-xl bg-white/90 border border-[#C7C1CB]/30 px-5 py-4">
          <p className="text-xs text-[#3D5466] mb-1">Impuesto estimado (mensual)</p>
          <p className="text-xl font-bold text-[#63868A]">
            {formatARS(Math.max(0, resultado.impuestoMensualEstimado))}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-[#282F3F]/5 border border-[#282F3F]/10 px-5 py-4 mb-8">
        <p className="text-sm font-semibold text-[#282F3F] mb-3">
          Deducciones consideradas (referencia anual)
        </p>
        <ul className="text-sm text-[#3D5466] space-y-1.5">
          <li>Deducción general orientativa: {formatARS(resultado.desgloseDeducciones.general)}</li>
          {resultado.desgloseDeducciones.casado > 0 && (
            <li>Ajuste por estado civil (casado/a): {formatARS(resultado.desgloseDeducciones.casado)}</li>
          )}
          <li>Hijos ({resumenFlags.hijos}): {formatARS(resultado.desgloseDeducciones.hijos)}</li>
          <li>Alquiler: {resumenFlags.alquiler ? `Sí (${formatARS(resultado.desgloseDeducciones.alquiler)})` : "No"}</li>
          <li>Medicina prepaga: {resumenFlags.prepaga ? `Sí (${formatARS(resultado.desgloseDeducciones.prepaga)})` : "No"}</li>
          <li>Servicio doméstico: {resumenFlags.servicioDomestico ? `Sí (${formatARS(resultado.desgloseDeducciones.servicioDomestico)})` : "No"}</li>
          {resultado.desgloseDeducciones.otras > 0 && (
            <li>Otras deducciones: {formatARS(resultado.desgloseDeducciones.otras)}</li>
          )}
        </ul>
        <p className="text-sm font-medium text-[#282F3F] mt-4 pt-4 border-t border-[#282F3F]/10">
          Total deducciones estimadas: {formatARS(resultado.totalDeduccionesAnual)}
        </p>
        <p className="text-xs text-[#3D5466]/80 mt-2">
          Bruto anual proyectado (referencia): {formatARS(resultado.brutoAnualProyectado)}
        </p>
      </div>

      <div className="rounded-xl border border-[#63868A]/25 bg-white/60 px-5 py-4 mb-6">
        {bajoImpacto ? (
          <p className="text-[#3D5466] leading-relaxed">
            Según el ingreso informado, no correspondería retención estimada de Impuesto a las
            Ganancias. El ingreso bruto proyectado no supera el umbral de deducción
            aplicable para tu situación.
          </p>
        ) : (
          <p className="text-[#3D5466] leading-relaxed">
            Con los datos ingresados, podrías tener una retención estimada de Ganancias
            en el orden indicado. Es una referencia: el monto real depende de tu
            recibo, deducciones efectivas y la normativa vigente.
          </p>
        )}
        <p className="text-xs text-[#3D5466]/75 mt-3 leading-relaxed">
          Este cálculo es orientativo y no reemplaza una revisión profesional.
        </p>
      </div>

      <button
        type="button"
        onClick={onRecalcular}
        className="inline-flex justify-center items-center px-6 py-3 rounded-full border border-[#282F3F]/20 text-[#282F3F] text-sm font-medium hover:bg-[#282F3F]/5 transition-colors mb-10"
      >
        Volver a calcular
      </button>

      <div className="pt-8 border-t border-[#C7C1CB]/40">
        <h3 className="text-lg font-semibold text-[#282F3F] mb-2">
          ¿Querés revisarlo bien según tu recibo y tus deducciones?
        </h3>
        <p className="text-[#3D5466] text-sm leading-relaxed mb-5">
          Podemos ayudarte a entender qué te están descontando y revisar si hay algo
          para ajustar.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#282F3F] text-white text-sm font-semibold hover:bg-[#3D5466] transition-colors shadow-sm"
        >
          Escribinos por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
