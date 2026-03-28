import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2E3A4D] border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-baseline gap-2 mb-2"
            >
              <span className="text-white text-xl font-bold">AREA</span>
              <span className="text-[#F4F4F4]/40 text-sm">Estudio Contable</span>
            </button>
            <p className="text-[#F4F4F4]/40 text-sm">Buenos Aires, Argentina</p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="#"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors p-2"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contacto@areacontable.com.ar"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors p-2"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-[#F4F4F4]/30 text-xs">
            © {new Date().getFullYear()} AREA Estudio Contable. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
