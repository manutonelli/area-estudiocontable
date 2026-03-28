import { motion } from "motion/react";
import { Calculator, FileDown, TrendingUp } from "lucide-react";

export function FutureTools() {
  const tools = [
    {
      icon: Calculator,
      title: "Calculadora de Monotributo",
      description: "Calculá tu categoría y cuánto tenés que pagar",
      status: "Próximamente",
    },
    {
      icon: FileDown,
      title: "Recursos descargables",
      description: "Guías y checklists para organizarte mejor",
      status: "Próximamente",
    },
    {
      icon: TrendingUp,
      title: "Herramientas interactivas",
      description: "Simuladores y planificadores para tus decisiones",
      status: "Próximamente",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4F6D7A] uppercase tracking-wider text-sm mb-4 block">
            En desarrollo
          </span>
          <h2 className="text-4xl md:text-5xl text-[#2E3A4D] mb-4">
            Herramientas que vienen
          </h2>
          <p className="text-xl text-[#4F6D7A] max-w-2xl mx-auto">
            Estamos trabajando en herramientas gratuitas para que puedas organizarte mejor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F4F4F4] p-8 rounded-2xl text-center relative overflow-hidden group"
            >
              {/* Badge de estado */}
              <div className="absolute top-4 right-4">
                <span className="bg-[#4F6D7A] text-white text-xs px-3 py-1 rounded-full">
                  {tool.status}
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#4F6D7A] to-[#2E3A4D] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl mb-3 text-[#2E3A4D]">
                {tool.title}
              </h3>
              <p className="text-[#4F6D7A]">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}