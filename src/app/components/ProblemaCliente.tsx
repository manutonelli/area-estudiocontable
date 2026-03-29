import { motion } from "motion/react";

const problemas = [
  "Paga cuando vence, sin planificar.",
  "No sabe cuánto va a pagar el próximo mes.",
  "No entiende sus números ni lo que le retienen.",
  "Vive apagando incendios fiscales.",
  "Se entera de los problemas cuando ya es tarde.",
];

export function ProblemaCliente() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-7 block">
              El problema
            </span>
            <h2 className="text-[clamp(1.9rem,3.5vw,2.9rem)] font-bold text-[#282F3F] leading-[1.12] mb-6">
              La mayoría de los contribuyentes trabaja los impuestos así
            </h2>
            <p className="text-[#3D5466] text-lg leading-relaxed">
              Esto genera estrés, deudas y falta de control.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {problemas.map((problema, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F4F4F4] border border-[#C7C1CB]/30"
              >
                <span className="w-2 h-2 rounded-full bg-[#63868A] mt-2 flex-shrink-0" />
                <p className="text-[#3D5466] leading-relaxed">{problema}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
