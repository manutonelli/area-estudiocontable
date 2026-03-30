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
      "Depende de tu situación. Si estás en relación de dependencia, pagás si tus ingresos brutos superan el umbral vigente. También hay deducciones aplicables: por hijo, cónyuge, alquiler, cuota médica, entre otras. Analizamos tu caso para saber si correspondería retención o si podés reducirla.",
  },
  {
    question: "¿Cómo sé si estoy bien categorizado en el monotributo?",
    answer:
      "Revisamos tu facturación de los últimos 12 meses y verificamos que estés en la categoría correcta. Si estás por pasarte de categoría o podés bajar, te avisamos con tiempo. También acompañamos la recategorización semestral para evitar sorpresas.",
  },
  {
    question: "¿Qué incluye el seguimiento mensual?",
    answer:
      "Control de ingresos, gastos e impuestos, proyección de vencimientos, alertas ante cambios en tu situación fiscal y asesoramiento continuo. No te enterás de los problemas cuando ya pasaron — te anticipamos.",
  },
  {
    question: "¿Qué pasa si no presento algo a tiempo?",
    answer:
      "Hay multas y recargos por presentaciones fuera de término. Lo ideal es evitarlo, pero si ya ocurrió, analizamos la situación para regularizarla y minimizar los costos.",
  },
  {
    question: "¿Trabajan con autónomos y PYMES?",
    answer:
      "Sí. Trabajamos con monotributistas, autónomos, emprendedores, comercios y PYMES. También hacemos certificaciones contables y balances. Cada cliente tiene una estrategia adaptada a su realidad.",
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
            <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-6 block">
              Preguntas frecuentes
            </span>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#282F3F] leading-[1.15]">
              Las dudas que siempre aparecen.
            </h2>
            <p className="text-[#3D5466] mt-5 leading-relaxed text-base">
              Respuestas claras, sin vueltas.
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
                  <AccordionTrigger className="text-left text-base font-semibold text-[#282F3F] hover:no-underline py-6 leading-snug">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3D5466] pb-7 leading-relaxed text-base">
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
