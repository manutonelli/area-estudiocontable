import { motion } from "motion/react";

const services = [
  {
    label: "Monotributo",
    desc: "Inscripción, recategorización y gestión de tu situación como monotributista.",
  },
  {
    label: "Relación de dependencia",
    desc: "Declaración de Ganancias, deducciones y optimización de retenciones.",
  },
  {
    label: "Freelancers / USD",
    desc: "Facturación en dólares, régimen simplificado y estrategia impositiva.",
  },
];

export function Midpoint() {
  return (
    <section
      id="servicios"
      className="py-32 bg-[#2E3A4D] relative overflow-hidden scroll-mt-28"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.09]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4F6D7A"
            d="M38.3,-65.4C50.9,-57.4,63.4,-49.4,70.3,-37.8C77.1,-26.1,78.2,-11.1,76.4,3.4C74.6,17.9,69.8,31.9,61.6,43.3C53.4,54.8,41.7,63.7,28.8,69.5C15.9,75.3,1.6,78,-12.8,76.3C-27.2,74.6,-41.6,68.5,-52.7,58.8C-63.8,49.1,-71.6,35.7,-75.4,21.2C-79.2,6.7,-79,-8.9,-74.4,-23.4C-69.8,-37.8,-60.8,-51.1,-48.6,-59.3C-36.4,-67.5,-21,-70.6,-6.3,-62.4C8.4,-54.2,25.7,-73.4,38.3,-65.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.07]"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#F4F4F4]/40 text-xs uppercase tracking-[0.25em] mb-8">
            Nuestros servicios
          </p>
          <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-bold text-white leading-[1.05] max-w-3xl">
            ¿En qué te podemos{" "}
            <em className="not-italic text-[#4F6D7A]">ayudar?</em>
          </h2>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-0">
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="border-t border-white/15 pt-8 pb-8 md:pr-10"
            >
              <span className="text-[#4F6D7A] text-xs uppercase tracking-widest mb-4 block">
                0{i + 1}
              </span>
              <h3 className="text-white text-xl font-semibold mb-4">
                {item.label}
              </h3>
              <p className="text-[#F4F4F4]/55 leading-relaxed text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
