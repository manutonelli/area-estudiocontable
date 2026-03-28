import { motion } from "motion/react";
import aboutEquipo from "@/assets/about-equipo.png";

export function About() {
  return (
    <section id="quienes-somos" className="py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#4F6D7A] text-xs uppercase tracking-[0.22em] mb-7 block">
              Quiénes somos
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#2E3A4D] leading-[1.1] mb-9">
              Simplificamos lo complejo
              <br />
              <span className="text-[#4F6D7A] font-normal italic">
                para que puedas
              </span>
              <br />
              enfocarte en lo tuyo.
            </h2>
            <div className="space-y-5 text-[#4F6D7A] text-lg leading-relaxed max-w-md">
              <p>
                Trabajamos con freelancers, monotributistas y emprendedores que
                necesitan entender su situación impositiva sin perderse en
                tecnicismos.
              </p>
              <p>
                No solo hacemos los números: te explicamos qué significan, te
                orientamos en cada decisión y te acompañamos para que puedas
                enfocarte en lo que realmente importa.
              </p>
              <p>
                Hablamos simple, respondemos rápido y estamos cuando nos
                necesitás.
              </p>
            </div>
          </motion.div>

          {/* Right — Image with offset frame */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Offset background shape */}
            <div className="absolute -top-5 -right-5 w-full h-full bg-[#F4F4F4] rounded-[2.5rem] z-0" />
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src={aboutEquipo}
                alt="Equipo AREA Estudio Contable en el consultorio"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
