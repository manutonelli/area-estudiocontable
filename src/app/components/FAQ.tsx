import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "¿Tengo que pagar Ganancias?",
    answer:
      "Depende de tu situación. Si estás en relación de dependencia, pagás si tus ingresos brutos superan cierto monto (que se actualiza cada año). También hay deducciones que podés hacer: por hijo, cónyuge, alquiler, cuota médica, entre otras. Te ayudamos a calcular si deberías pagar o si te corresponde una devolución.",
  },
  {
    question: "¿Qué pasa si cobro en USD?",
    answer:
      "Si cobrás en dólares, hay distintas formas de liquidar esos ingresos según tu situación: monotributo con factura E, régimen simplificado, o Responsable Inscripto. Te orientamos sobre cuál es la mejor opción para vos según tu volumen de facturación y tus objetivos.",
  },
  {
    question: "¿Cómo sé si estoy bien en el monotributo?",
    answer:
      "Revisamos tu facturación de los últimos 12 meses y verificamos que estés en la categoría correcta. Si estás por pasarte de categoría o si podés bajar, te avisamos. También te ayudamos con la recategorización semestral para que no tengas sorpresas.",
  },
  {
    question: "¿Qué pasa si no presento algo a tiempo?",
    answer:
      "Hay multas y recargos por presentaciones fuera de término. Lo ideal es evitarlo, pero si ya pasó, te ayudamos a regularizar la situación lo antes posible para minimizar los costos. También te enviamos recordatorios para que no te pase de nuevo.",
  },
  {
    question: "¿Cuánto sale trabajar con ustedes?",
    answer:
      "Depende del servicio que necesites. Trabajamos con honorarios mensuales para monotributistas y freelancers, y por servicio para trámites puntuales (como alta, declaración de Ganancias, etc.). Contanos tu situación y te pasamos un presupuesto sin compromiso.",
  },
  {
    question: "¿Responden rápido?",
    answer:
      "Sí. Usamos WhatsApp como canal principal porque sabemos que necesitás respuestas ágiles. En general respondemos el mismo día (horario hábil). Para consultas más complejas que requieran análisis, te avisamos cuándo vas a tener la respuesta.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-[#F4F4F4]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid md:grid-cols-[1fr_2fr] gap-20 items-start">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:sticky md:top-32"
          >
            <span className="text-[#4F6D7A] text-xs uppercase tracking-[0.22em] mb-6 block">
              Preguntas frecuentes
            </span>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#2E3A4D] leading-[1.15]">
              Las dudas que siempre aparecen.
            </h2>
            <p className="text-[#4F6D7A] mt-5 leading-relaxed text-base">
              Y sus respuestas claras, sin vueltas.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border-none rounded-2xl px-7 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-[#2E3A4D] hover:no-underline py-6 leading-snug">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4F6D7A] pb-7 leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
