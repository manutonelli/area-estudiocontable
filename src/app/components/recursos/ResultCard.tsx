import { motion } from "motion/react";
import type { EstimacionMonotributo } from "@/config/monotributoCategorias";
import { WHATSAPP_URL } from "@/config/contact";

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

type ResultCardProps = {
  facturacion: number;
  estimacion: Exclude<EstimacionMonotributo, { tipo: "invalido" }>;
  actividadLabel: string;
  tieneLocal: boolean;
  onRecalcular: () => void;
};

export function ResultCard({
  facturacion,
  estimacion,
  actividadLabel,
  tieneLocal,
  onRecalcular,
}: ResultCardProps) {
  const esCategoria = estimacion.tipo === "categoria";

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

      {esCategoria ? (
        <>
          <p className="text-2xl md:text-3xl font-bold text-[#282F3F] mb-3">
            Categoría estimada:{" "}
            <span className="text-[#63868A]">{estimacion.categoria}</span>
          </p>
          <p className="text-[#3D5466] text-base leading-relaxed mb-6">
            Según la facturación informada, podrías estar en la categoría{" "}
            <strong>{estimacion.categoria}</strong>. Es una referencia orientativa:
            puede variar según tu actividad, actualizaciones de escala y otros datos
            de tu caso.
          </p>
        </>
      ) : (
        <>
          <p className="text-2xl md:text-3xl font-bold text-[#282F3F] mb-3">
            Revisá tu situación
          </p>
          <p className="text-[#3D5466] text-base leading-relaxed mb-6">
            Según el monto ingresado, podría no corresponder monotributo o conviene
            revisar otra categoría impositiva. Lo ideal es analizarlo con un contador
            para ver qué opción encaja mejor con vos.
          </p>
        </>
      )}

      <div className="rounded-xl bg-white/80 border border-[#C7C1CB]/30 px-5 py-4 mb-6 space-y-2 text-sm text-[#3D5466]">
        <p>
          <span className="text-[#282F3F] font-medium">Facturación informada:</span>{" "}
          {formatARS(facturacion)}
        </p>
        <p>
          <span className="text-[#282F3F] font-medium">Actividad informada:</span>{" "}
          {actividadLabel}
        </p>
        <p>
          <span className="text-[#282F3F] font-medium">Local comercial:</span>{" "}
          {tieneLocal ? "Sí" : "No"}
        </p>
      </div>

      <p className="text-[#3D5466]/90 text-sm leading-relaxed mb-8">
        Si tus ingresos cambiaron recientemente o tenés otras variables a considerar
        (energía, superficie, alquileres, etc.), conviene revisarlo con un contador.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onRecalcular}
          className="inline-flex justify-center items-center px-6 py-3 rounded-full border border-[#282F3F]/20 text-[#282F3F] text-sm font-medium hover:bg-[#282F3F]/5 transition-colors"
        >
          Volver a calcular
        </button>
      </div>

      <div className="mt-10 pt-10 border-t border-[#C7C1CB]/40">
        <h3 className="text-lg font-semibold text-[#282F3F] mb-2">
          ¿Querés verlo bien según tu caso?
        </h3>
        <p className="text-[#3D5466] text-sm leading-relaxed mb-5">
          La calculadora te da una referencia, pero podemos ayudarte a revisar tu
          situación real y orientarte mejor.
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
