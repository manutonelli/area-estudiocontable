import { motion } from "motion/react";

const publicos = [
  {
    titulo: "Emprendedores",
    desc: "Orden fiscal y control desde el inicio.",
  },
  {
    titulo: "Autónomos",
    desc: "Planificación de impuestos y anticipos.",
  },
  {
    titulo: "Comercios",
    desc: "Seguimiento mensual y control de obligaciones.",
  },
  {
    titulo: "PYMES",
    desc: "Decisiones estratégicas e impositivas.",
  },
];

export function PublicoObjetivo() {
  return (
    <section className="py-28 bg-[#2E3A4D] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.07]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M28.4,-45.4C37.9,-42.3,47.4,-36.3,52.9,-27.5C58.4,-18.7,59.9,-7,57.5,3.5C55.1,14,48.9,23.4,41.8,31.9C34.7,40.4,26.8,48,16.9,53.6C7,59.2,-4.9,62.8,-16.1,60.7C-27.3,58.6,-37.9,50.8,-45.5,41C-53.2,31.2,-57.9,19.3,-59.7,6.8C-61.5,-5.7,-60.3,-18.8,-54.9,-29.7C-49.5,-40.6,-39.8,-49.3,-29.1,-52.2C-18.3,-55.1,-6.5,-52.2,3.2,-57.1C12.8,-62.1,18.9,-48.5,28.4,-45.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-7 block">
            A quién ayudamos
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-[1.1] max-w-2xl">
            Trabajamos con quienes quieren crecer con orden
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {publicos.map((publico, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/15 p-6 hover:border-[#63868A]/50 transition-colors"
            >
              <h3 className="text-white text-lg font-semibold mb-2">
                {publico.titulo}
              </h3>
              <p className="text-[#F4F4F4]/50 text-sm leading-relaxed">
                {publico.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div className="rounded-2xl border border-[#63868A]/30 bg-[#63868A]/10 p-6 max-w-xs">
            <h3 className="text-white/80 text-base font-medium mb-1">
              Agropecuarios
            </h3>
            <p className="text-[#F4F4F4]/40 text-sm">
              Consulta disponible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
