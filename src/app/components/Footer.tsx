import { Link } from "react-router";
import { Instagram, Mail } from "lucide-react";
import { WHATSAPP_URL } from "@/config/contact";

export function Footer() {
  return (
    <footer className="bg-[#2E3A4D] border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <Link
              to="/"
              className="flex items-baseline gap-2 mb-2 hover:opacity-90 transition-opacity"
            >
              <span className="text-white text-xl font-bold">AREA</span>
              <span className="text-[#F4F4F4]/40 text-sm">Estudio Contable</span>
            </Link>
            <p className="text-[#F4F4F4]/40 text-sm">Saladillo – Buenos Aires</p>
            <p className="text-[#F4F4F4]/30 text-xs mt-0.5">Atención online</p>
            <Link
              to="/recursos-gratuitos"
              className="inline-block mt-3 text-sm text-[#F4F4F4]/50 hover:text-white transition-colors"
            >
              Recursos gratuitos
            </Link>
          </div>

          {/* Matrícula */}
          <div className="text-[#F4F4F4]/40 text-xs leading-relaxed">
            <p className="uppercase tracking-widest mb-1 text-[#F4F4F4]/30">
              Matrícula profesional
            </p>
            <p>C.P.C.E. Buenos Aires</p>
          </div>

          {/* Links sociales */}
          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4F4F4]/50 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              WhatsApp
            </a>
            <a
              href="#"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors p-0 flex items-center gap-2 text-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a
              href="mailto:contacto@areacontable.com.ar"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors flex items-center gap-2 text-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
              contacto@areacontable.com.ar
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
