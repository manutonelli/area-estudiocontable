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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.522 5.855L.057 23.082a.75.75 0 0 0 .92.918l5.228-1.474A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.354l-.355-.21-3.676 1.035 1.034-3.586-.228-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/area.estudiocontable/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a
              href="mailto:area.estudiocontable@gmail.com"
              className="text-[#F4F4F4]/40 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              area.estudiocontable@gmail.com
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
