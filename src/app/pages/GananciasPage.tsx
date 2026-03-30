import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { GananciasCalculator } from "../components/recursos/GananciasCalculator";
import { PERIODO_VIGENTE } from "@/config/gananciasCalculadora";

export default function GananciasPage() {
  useEffect(() => {
    document.title = "Calculadora de Ganancias | AREA Estudio Contable";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `Calculadora de Impuesto a las Ganancias en relación de dependencia. Período ${PERIODO_VIGENTE}. AREA Estudio Contable.`);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#282F3F] text-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-4">Recurso gratuito</p>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] mb-4">
              Calculadora de Ganancias
            </h1>
            <p className="text-[#C7C1CB] text-lg leading-relaxed mb-2">
              Estimá tu retención mensual y sueldo neto de bolsillo.
            </p>
            <p className="text-[#C7C1CB]/60 text-sm mb-6">Período {PERIODO_VIGENTE} · Relación de dependencia</p>
            <Link
              to="/recursos-gratuitos"
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
            >
              ← Ver todos los recursos
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <GananciasCalculator />
        </div>
      </section>
    </>
  );
}
