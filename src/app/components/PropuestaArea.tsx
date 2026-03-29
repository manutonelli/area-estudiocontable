import { motion } from "motion/react";

const propuestas = [
  {
    titulo: "Planificación fiscal",
    desc: "Analizamos tu situación y proyectamos impuestos antes de que aparezcan.",
  },
  {
    titulo: "Seguimiento mensual",
    desc: "Controlamos ingresos, gastos e impuestos para que siempre estés al día.",
  },
  {
    titulo: "Prevención de problemas",
    desc: "Detectamos riesgos antes de que se conviertan en deuda.",
  },
  {
    titulo: "Decisiones estratégicas",
    desc: "Te ayudamos a elegir el mejor camino fiscal para tu negocio.",
  },
];

export function PropuestaArea() {
  return (
    <section className="py-28 bg-[#2E3A4D] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute -top-20 -right-20 w-[480px] h-[480px] opacity-[0.07]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4F6D7A"
            d="M38.3,-65.4C50.9,-57.4,63.4,-49.4,70.3,-37.8C77.1,-26.1,78.2,-11.1,76.4,3.4C74.6,17.9,69.8,31.9,61.6,43.3C53.4,54.8,41.7,63.7,28.8,69.5C15.9,75.3,1.6,78,-12.8,76.3C-27.2,74.6,-41.6,68.5,-52.7,58.8C-63.8,49.1,-71.6,35.7,-75.4,21.2C-79.2,6.7,-79,-8.9,-74.4,-23.4C-69.8,-37.8,-60.8,-51.1,-48.6,-59.3C-36.4,-67.5,-21,-70.6,-6.3,-62.4C8.4,-54.2,25.7,-73.4,38.3,-65.4Z"
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
            Nuestra diferencia
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-[1.1] max-w-2xl">
            En Área trabajamos diferente
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {propuestas.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-white/15 pt-8 pb-8 md:pr-10"
            >
              <span className="text-[#63868A] text-xs uppercase tracking-widest mb-4 block">
                0{i + 1}
              </span>
              <h3 className="text-white text-lg font-semibold mb-3">
                {item.titulo}
              </h3>
              <p className="text-[#F4F4F4]/55 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
