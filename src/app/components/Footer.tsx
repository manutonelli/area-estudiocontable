import { Link } from "react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2E3A4D] border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link
              to="/"
              className="flex items-baseline gap-2 mb-2 hover:opacity-90 transition-opacity"
            >
              <span className="text-white text-xl font-bold">AREA</span>
              <span className="text-[#F4F4F4]/40 text-sm">Estudio Contable</span>
            </Link>
            <p className="text-[#F4F4F4]/40 text-sm">Buenos Aires, Argentina</p>
            <Link
              to="/recursos-gratuitos"
              className="inline-block mt-3 text-sm text-[#F4F4F4]/50 hover:text-white transition-colors"
            >
              Recursos gratuitos
            </Link>
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
