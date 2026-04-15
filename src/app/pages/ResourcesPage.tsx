import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { UpcomingResources } from "../components/recursos/UpcomingResources";
import { ArrowRight } from "lucide-react";

const PAGE_TITLE =
  "Recursos gratuitos — Monotributo y Ganancias | AREA Estudio Contable";
const PAGE_DESCRIPTION =
  "Calculadoras gratuitas de monotributo e Impuesto a las Ganancias en relación de dependencia. Referencias orientativas de AREA Estudio Contable.";

export default function ResourcesPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", PAGE_DESCRIPTION);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#282F3F] text-white pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute -top-32 -right-24 w-[520px] h-[520px] opacity-[0.07]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M47.1,-73.6C60.5,-67.2,70.5,-53.9,76.8,-39.1C83.1,-24.3,85.7,-7.9,83.4,7.7C81,23.2,73.6,37.9,63,49.1C52.3,60.3,38.4,68.1,23.4,72.8C8.4,77.5,-7.6,79.1,-22.5,74.9C-37.4,70.7,-51.2,60.7,-60.9,47.5C-70.6,34.3,-76.2,17.9,-77.1,0.9C-78,-16,-74.2,-33.5,-65,-47.1C-55.8,-60.7,-41.3,-70.4,-26.4,-75.3C-11.5,-80.2,3.8,-80.4,19,-77.2C34.2,-74,33.7,-80,47.1,-73.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-[380px] h-[380px] opacity-[0.06]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#63868A"
              d="M28.4,-45.4C37.9,-42.3,47.4,-36.3,52.9,-27.5C58.4,-18.7,59.9,-7,57.5,3.5C55.1,14,48.9,23.4,41.8,31.9C34.7,40.4,26.8,48,16.9,53.6C7,59.2,-4.9,62.8,-16.1,60.7C-27.3,58.6,-37.9,50.8,-45.5,41C-53.2,31.2,-57.9,19.3,-59.7,6.8C-61.5,-5.7,-60.3,-18.8,-54.9,-29.7C-49.5,-40.6,-39.8,-49.3,-29.1,-52.2C-18.3,-55.1,-6.5,-52.2,3.2,-57.1C12.8,-62.1,18.9,-48.5,28.4,-45.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-[1.08] mb-6">
              Recursos gratuitos
            </h1>
            <p className="text-xl md:text-2xl text-[#C7C1CB] font-light leading-relaxed mb-6">
              Herramientas simples para entender mejor tu situación contable
            </p>
            <p className="text-[#C7C1CB]/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Creamos estos recursos para ayudarte a tener una referencia inicial de
              forma clara y práctica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/recursos-gratuitos/monotributo"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#282F3F] text-sm font-semibold hover:bg-[#C7C1CB]/30 transition-colors"
              >
                Calculadora Monotributo
              </Link>
              <Link
                to="/recursos-gratuitos/ganancias"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/35 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Ganancias — Relación de dependencia
              </Link>
            </div>
            <p className="mt-8">
              <Link
                to="/"
                className="text-sm text-white/55 hover:text-white transition-colors underline underline-offset-4"
              >
                Volver al inicio
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#63868A] mb-8">Herramientas disponibles</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <Link
              to="/recursos-gratuitos/monotributo"
              className="group rounded-2xl border border-[#C7C1CB]/40 bg-white p-8 hover:shadow-lg hover:border-[#282F3F]/20 transition-all"
            >
              <h2 className="text-xl font-bold text-[#282F3F] mb-2 group-hover:text-[#63868A] transition-colors">
                Calculadora de Monotributo
              </h2>
              <p className="text-sm text-[#3D5466] leading-relaxed mb-6">
                Estimá tu categoría según tus ingresos anuales y tipo de actividad.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#282F3F] group-hover:gap-3 transition-all">
                Ir a la calculadora <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              to="/recursos-gratuitos/ganancias"
              className="group rounded-2xl border border-[#C7C1CB]/40 bg-white p-8 hover:shadow-lg hover:border-[#282F3F]/20 transition-all"
            >
              <h2 className="text-xl font-bold text-[#282F3F] mb-2 group-hover:text-[#63868A] transition-colors">
                Impuesto a las Ganancias — Relación de dependencia
              </h2>
              <p className="text-sm text-[#3D5466] leading-relaxed mb-6">
                Estimá tu retención mensual y sueldo neto de bolsillo en relación de dependencia.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#282F3F] group-hover:gap-3 transition-all">
                Ir a la calculadora <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#C7C1CB]/10">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <UpcomingResources />
        </div>
      </section>
    </>
  );
}
