import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#4F6D7A] to-[#2E3A4D] relative overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="20" cy="20" r="40" fill="white" />
          <circle cx="80" cy="80" r="50" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl text-white mb-6 leading-tight">
                Si sentís que estás{" "}
                <span className="text-[#F4F4F4]/90">medio perdido</span>
                {" "}con esto...
              </h2>
              <p className="text-xl text-[#F4F4F4]/80 mb-8">
                Es más común de lo que parece. La buena noticia es que tiene solución 
                (y no es tan complicado como suena).
              </p>
              <motion.button
                onClick={scrollToContact}
                className="group bg-white text-[#2E3A4D] px-8 py-4 rounded-full text-lg flex items-center gap-3 hover:bg-[#F4F4F4] transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lo vemos juntos
                <MessageCircle className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1758612214917-81d7956c09de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2VyJTIwd29ya3NwYWNlJTIwbm90ZWJvb2t8ZW58MXx8fHwxNzc0NzMzMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Workspace"
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}