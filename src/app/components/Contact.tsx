import { useState } from "react";
import { motion } from "motion/react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_URL } from "@/config/contact";

export function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    consulta: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de envío
    toast.success("¡Mensaje enviado! Te contactaremos pronto.");
    
    setFormData({
      nombre: "",
      email: "",
      consulta: "",
    });
  };

  const handleWhatsApp = () => {
    window.open(WHATSAPP_URL, "_blank");
  };

  return (
    <section id="contacto" className="py-24 bg-[#F4F4F4]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4F6D7A] uppercase tracking-wider text-sm mb-4 block">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl text-[#2E3A4D] mb-4">
            Contanos tu situación
          </h2>
          <p className="text-xl text-[#4F6D7A]">
            Te orientamos sin compromiso
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-[#2E3A4D] mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#4F6D7A] focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#2E3A4D] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#4F6D7A] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="consulta" className="block text-[#2E3A4D] mb-2">
                  Consulta
                </label>
                <textarea
                  id="consulta"
                  required
                  rows={5}
                  value={formData.consulta}
                  onChange={(e) => setFormData({ ...formData, consulta: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#4F6D7A] focus:border-transparent transition-all resize-none"
                  placeholder="Contanos qué necesitás..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4F6D7A] to-[#2E3A4D] text-white px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar consulta
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-[#4F6D7A] to-[#2E3A4D] p-8 rounded-2xl text-white">
              <h3 className="text-2xl mb-4">
                ¿Preferís WhatsApp?
              </h3>
              <p className="text-[#F4F4F4]/80 mb-6">
                Es nuestro canal principal. Te respondemos rápido y podés consultarnos 
                lo que necesites.
              </p>
              <motion.button
                onClick={handleWhatsApp}
                className="bg-white text-[#2E3A4D] px-6 py-3 rounded-full flex items-center gap-3 hover:bg-[#F4F4F4] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                Escribinos por WhatsApp
              </motion.button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#4F6D7A] p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#2E3A4D] mb-1">Email</p>
                  <p className="text-[#4F6D7A]">contacto@areacontable.com.ar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#4F6D7A] p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#2E3A4D] mb-1">Ubicación</p>
                  <p className="text-[#4F6D7A]">Buenos Aires, Argentina</p>
                  <p className="text-sm text-[#4F6D7A]/70 mt-1">
                    Trabajamos de forma remota y presencial
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EFEFEF]">
              <p className="text-[#4F6D7A] italic">
                "No importa qué tan perdido te sientas con el tema impositivo: 
                hay solución y te la explicamos en simple."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}