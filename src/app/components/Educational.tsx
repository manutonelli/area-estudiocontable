import { motion } from "motion/react";
import { Check } from "lucide-react";

export function Educational() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#2E3A4D] to-[#4F6D7A] relative overflow-hidden">
      {/* Ondas decorativas */}
      <svg className="absolute top-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C240,80 480,20 720,40 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"></path>
      </svg>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6 leading-tight">
              No se trata solo de{" "}
              <span className="text-[#F4F4F4]/90">pagar impuestos</span>
              , se trata de entenderlos
            </h2>
            <p className="text-xl text-[#F4F4F4]/80 mb-8">
              La diferencia entre AREA y otros contadores es que nosotros te explicamos 
              el por qué detrás de cada número. No queremos que nos confíes ciegamente: 
              queremos que entiendas tu situación.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              "Te hablamos en simple, sin tecnicismos innecesarios",
              "Respondemos rápido por WhatsApp",
              "Te avisamos antes de cada vencimiento",
              "Te ayudamos a planificar, no solo a cumplir",
              "Estamos para vos cuando lo necesitás"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl"
              >
                <div className="bg-[#F4F4F4] p-1 rounded-full mt-1">
                  <Check className="w-4 h-4 text-[#2E3A4D]" />
                </div>
                <p className="text-white text-lg flex-1">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}