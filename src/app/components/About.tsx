import { motion } from "motion/react";
import aboutEquipo from "@/assets/about-equipo.png";

const formaDeTrabajar = [
  {
    titulo: "100% personalizado",
    desc: "Cada cliente tiene una estrategia distinta.",
  },
  {
    titulo: "Comunicación directa",
    desc: "WhatsApp y seguimiento continuo.",
  },
  {
    titulo: "Acompañamiento real",
    desc: "No solo liquidaciones: estrategia y decisiones.",
  },
];

export function About() {
  return (
    <section id="quienes-somos" className="py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-7 block">
              Quién está detrás de Área
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#282F3F] leading-[1.1] mb-8">
              Camila Tonelli
              <br />
              Antonella Ninni
              <br />
              <span className="text-[#63868A] font-normal text-[clamp(1.2rem,2.5vw,1.6rem)]">
                Contadoras públicas
              </span>
            </h2>
            <div className="space-y-5 text-[#3D5466] text-lg leading-relaxed max-w-md">
              <p>
                Área nace con una idea clara: los impuestos no deberían ser un
                problema. Deberían ser una herramienta de decisión.
              </p>
              <p>
                Trabajamos con cercanía, claridad y estrategia. No solo hacemos
                los números: te explicamos qué significan y te ayudamos a
                tomar mejores decisiones para tu negocio.
              </p>
            </div>

            {/* Matrículas */}
            <div className="mt-10 p-5 rounded-2xl bg-[#F4F4F4] border border-[#C7C1CB]/30 inline-block">
              <p className="text-xs uppercase tracking-[0.18em] text-[#63868A] mb-2">
                Matrícula profesional
              </p>
              <p className="text-[#282F3F] text-sm font-medium">
                C.P.C.E. Buenos Aires
              </p>
              <p className="text-[#3D5466]/70 text-xs mt-1">
                Saladillo – Buenos Aires · Atención online
              </p>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-5 -right-5 w-full h-full bg-[#F4F4F4] rounded-[2.5rem] z-0" />
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src={aboutEquipo}
                alt="Cami Tonelli — AREA Estudio Contable"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Forma de trabajar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-[#C7C1CB]/30 pt-16"
        >
          <p className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-10 block">
            Cómo lo hacemos
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {formaDeTrabajar.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#63868A]/15 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#63868A]" />
                </div>
                <div>
                  <h3 className="text-[#282F3F] font-semibold mb-1">
                    {item.titulo}
                  </h3>
                  <p className="text-[#3D5466] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
