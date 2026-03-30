import { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_URL } from "@/config/contact";

export function FinalCTA() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    consulta: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xreoqkng", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("¡Mensaje enviado! Te contactamos pronto.");
        setFormData({ nombre: "", email: "", consulta: "" });
      } else {
        toast.error("Hubo un error. Intentá de nuevo o escribinos por WhatsApp.");
      }
    } catch {
      toast.error("Hubo un error. Intentá de nuevo o escribinos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-36 bg-[#2E3A4D] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute -bottom-28 -left-28 w-[560px] h-[560px] opacity-[0.09]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M47.1,-73.6C60.5,-67.2,70.5,-53.9,76.8,-39.1C83.1,-24.3,85.7,-7.9,83.4,7.7C81,23.2,73.6,37.9,63,49.1C52.3,60.3,38.4,68.1,23.4,72.8C8.4,77.5,-7.6,79.1,-22.5,74.9C-37.4,70.7,-51.2,60.7,-60.9,47.5C-70.6,34.3,-76.2,17.9,-77.1,0.9C-78,-16,-74.2,-33.5,-65,-47.1C-55.8,-60.7,-41.3,-70.4,-26.4,-75.3C-11.5,-80.2,3.8,-80.4,19,-77.2C34.2,-74,33.7,-80,47.1,-73.6Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute top-0 right-0 w-[360px] h-[360px] opacity-[0.06]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="#4F6D7A" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-8 md:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 w-full max-w-lg md:pt-12"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-nombre" className="block text-[#F4F4F4]/90 text-sm mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="cta-nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#63868A] focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-[#F4F4F4]/90 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="cta-email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#63868A] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="cta-consulta" className="block text-[#F4F4F4]/90 text-sm mb-2">
                  Consulta
                </label>
                <textarea
                  id="cta-consulta"
                  required
                  rows={4}
                  value={formData.consulta}
                  onChange={(e) =>
                    setFormData({ ...formData, consulta: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#63868A] focus:border-transparent transition-all resize-none"
                  placeholder="Contanos qué necesitás..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#63868A] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#4F6D7A] transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Agendar reunión"}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Columna derecha: texto + mapa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 md:text-right max-w-2xl md:ml-auto flex flex-col gap-6"
          >
            <div>
              <span className="text-[#63868A] text-xs uppercase tracking-[0.22em] mb-4 block">
                Contacto
              </span>

              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white leading-[1.1] mb-4">
                Empezá a trabajar{" "}
                <span className="text-[#63868A]">con tranquilidad.</span>
              </h2>

              <p className="text-[#F4F4F4]/50 text-base mb-6 leading-relaxed">
                Primera consulta sin compromiso. Te escuchamos y analizamos tu situación.
              </p>

              <div className="flex md:justify-end">
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white text-[#2E3A4D] px-8 py-4 rounded-full font-semibold text-base hover:bg-[#F4F4F4] transition-all shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Escribir por WhatsApp
                </motion.a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3242.376372839866!2d-59.7845169240784!3d-35.643097613131566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDM4JzM1LjIiUyA1OcKwNDYnNTUuMCJX!5e0!3m2!1ses!2sar!4v1774878280712!5m2!1ses!2sar"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación AREA Estudio Contable"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
