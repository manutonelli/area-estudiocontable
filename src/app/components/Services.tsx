import { motion } from "motion/react";
import { FileText, Wallet, DollarSign, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Wallet,
    title: "Monotributo",
    description: "Alta, recategorización y seguimiento mensual. Te ayudamos a estar en la categoría correcta y a cumplir con tus obligaciones a tiempo.",
  },
  {
    icon: FileText,
    title: "Relación de dependencia",
    description: "Declaración de Ganancias, deducciones y devoluciones. Te explicamos cómo aprovechar al máximo tus deducciones.",
  },
  {
    icon: DollarSign,
    title: "Freelancers / USD",
    description: "Facturación en moneda extranjera, liquidación de servicios y asesoramiento para ingresos en dólares.",
  },
  {
    icon: Lightbulb,
    title: "Asesoramiento integral",
    description: "Te orientamos sobre tu mejor opción impositiva, te ayudamos a planificar y te acompañamos en cada etapa de tu negocio.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#F4F4F4]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4F6D7A] uppercase tracking-wider text-sm mb-4 block">
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl text-[#2E3A4D] mb-4">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="text-xl text-[#4F6D7A] max-w-2xl mx-auto">
            Nos especializamos en hacer simple lo que parece complicado
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-[#4F6D7A] to-[#2E3A4D] p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-3 text-[#2E3A4D]">
                    {service.title}
                  </h3>
                  <p className="text-[#4F6D7A] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}