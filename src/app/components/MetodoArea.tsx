import { motion } from "motion/react";

const pasos = [
  {
    numero: "01",
    titulo: "Diagnóstico inicial",
    desc: "Analizamos tu situación fiscal y detectamos riesgos.",
  },
  {
    numero: "02",
    titulo: "Planificación",
    desc: "Proyectamos impuestos y organizamos tu estructura.",
  },
  {
    numero: "03",
    titulo: "Seguimiento mensual",
    desc: "Control permanente de tu situación.",
  },
  {
    numero: "04",
    titulo: "Decisiones",
    desc: "Acompañamiento en cada paso de tu negocio.",
  },
];

export function MetodoArea() {
  return (
    <section id="como-trabajamos" className="py-28 bg-white overflow-hidden scroll-mt-28">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-7 block">
            Método
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#282F3F] leading-[1.1]">
            Cómo trabajamos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {pasos.map((paso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector line */}
              {i < pasos.length - 1 && (
                <div className="hidden md:block absolute top-6 left-12 right-0 h-px bg-[#C7C1CB]/40 z-0" style={{ left: "3rem" }} />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border-2 border-[#63868A]/40 flex items-center justify-center mb-6">
                  <span className="text-[#3D5466] text-sm font-bold">{paso.numero}</span>
                </div>
                <h3 className="text-[#282F3F] text-lg font-semibold mb-3">
                  {paso.titulo}
                </h3>
                <p className="text-[#3D5466] text-sm leading-relaxed">
                  {paso.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-l-2 border-[#63868A]/50 pl-6"
        >
          <p className="text-[#3D5466] text-lg leading-relaxed">
            No solo liquidamos impuestos.
            <br />
            <span className="text-[#282F3F] font-medium">
              Te ayudamos a entenderlos y anticiparte.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
