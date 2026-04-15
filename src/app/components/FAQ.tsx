import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "¿Qué pasa si empiezo a trabajar y no me inscribo?",
    answer:
      "Podés tener problemas a futuro: multas, deudas o bloqueos. Siempre es mejor empezar en regla desde el primer ingreso.",
  },
  {
    question: "¿Tengo que hacer facturas sí o sí?",
    answer:
      "Sí. Cada ingreso que tengas tiene que estar respaldado con una factura.",
  },
  {
    question: "¿Puedo tener monotributo y trabajar en relación de dependencia?",
    answer:
      "Sí, podés tener ambos al mismo tiempo. Es bastante común.",
  },
  {
    question: "¿Qué gastos puedo descontar?",
    answer:
      "Depende del tipo de actividad. No todo gasto es deducible, por eso es importante analizar cada caso.",
  },
  {
    question: "¿Necesito contador o lo puedo hacer solo?",
    answer:
      "Podés hacerlo solo, pero tener asesoramiento te evita errores, multas y te ayuda a pagar lo justo.",
  },
  {
    question: "¿Qué pasa si nunca hice nada y quiero regularizar?",
    answer:
      "Se puede ordenar. Cuanto antes lo hagas, mejor, porque se pueden reducir problemas y costos.",
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
