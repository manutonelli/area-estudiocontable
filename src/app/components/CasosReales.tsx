import { motion } from "motion/react";

const casos = [
  {
    situacion: "Cliente pagaba $1.800.000 en Ganancias.",
    proceso: "Se regularizó la situación y se aplicaron deducciones correctamente.",
    resultado: "$0",
    etiqueta: "Resultado final",
  },
  {
    situacion: "Cliente con anticipos de Ganancias de $10.000.000.",
    proceso: "Se proyectó el resultado fiscal real y se solicitó la reducción de anticipos.",
    resultado: "$0",
    etiqueta: "Anticipos reducidos a",
  },
];

export function CasosReales() {
  return (
    <section className="py-28 bg-[#F4F4F4] overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-7 block">
            Resultados
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#282F3F] leading-[1.1]">
            Resultados reales
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {casos.map((caso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-[#C7C1CB]/20"
            >
              <p className="text-[#3D5466] text-sm leading-relaxed mb-4">
                {caso.situacion}
              </p>
              <p className="text-[#3D5466]/70 text-sm leading-relaxed mb-6">
                {caso.proceso}
              </p>
              <div className="border-t border-[#C7C1CB]/30 pt-5 flex items-center justify-between">
                <span className="text-[#63868A] text-xs uppercase tracking-widest">
                  {caso.etiqueta}
                </span>
                <span className="text-[#282F3F] text-3xl font-bold">
                  {caso.resultado}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#282F3F] text-xl font-semibold">
            La planificación cambia los resultados.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
