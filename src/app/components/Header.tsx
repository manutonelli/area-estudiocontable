import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import logoArea from "@/assets/logo-area.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  const goHome = () => {
    closeMobile();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const scrollToSection = (id: string) => {
    closeMobile();
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ pathname: "/", hash: id });
    }
  };

  const navMuted = isScrolled ? "text-[#2E3A4D]" : "text-white";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex items-center justify-between py-5">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center"
            aria-label="AREA Estudio Contable — inicio"
          >
            <img
              src={logoArea}
              alt="AREA Estudio Contable"
              className={`h-16 w-auto sm:h-20 md:h-24 object-contain object-left transition-[filter] duration-300 ${
                isScrolled ? "brightness-0" : ""
              }`}
            />
          </button>

          <nav className="hidden md:flex items-center gap-10">
            <button
              type="button"
              onClick={() => scrollToSection("como-trabajamos")}
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${navMuted}`}
            >
              Método
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("servicios")}
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${navMuted}`}
            >
              Servicios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("quienes-somos")}
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${navMuted}`}
            >
              Nosotros
            </button>
            <Link
              to="/recursos-gratuitos"
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${navMuted}`}
            >
              Recursos
            </Link>
            <motion.button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className={`text-sm px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-[#2E3A4D] text-white hover:bg-[#4F6D7A]"
                  : "bg-white text-[#2E3A4D] hover:bg-[#F4F4F4]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Contacto
            </motion.button>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-[#2E3A4D]" : "text-white"
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 space-y-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("como-trabajamos")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  Método
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("servicios")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  Servicios
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("quienes-somos")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  Nosotros
                </button>
                <Link
                  to="/recursos-gratuitos"
                  onClick={closeMobile}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  Recursos
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToSection("contacto")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm font-semibold"
                >
                  Contacto
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
