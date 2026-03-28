import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoArea from "@/assets/logo-area.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

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
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="AREA Estudio Contable — inicio"
          >
            <img
              src={logoArea}
              alt="AREA Estudio Contable"
              className={`h-14 w-auto sm:h-16 md:h-[4.5rem] object-contain object-left transition-[filter] duration-300 ${
                isScrolled ? "brightness-0" : ""
              }`}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${
                isScrolled ? "text-[#2E3A4D]" : "text-white"
              }`}
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className={`text-sm transition-colors duration-300 hover:opacity-60 ${
                isScrolled ? "text-[#2E3A4D]" : "text-white"
              }`}
            >
              FAQ
            </button>
            <motion.button
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

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-[#2E3A4D]" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
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
                  onClick={() => scrollToSection("quienes-somos")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  Quiénes somos
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block w-full text-left py-2 text-[#2E3A4D] text-sm"
                >
                  FAQ
                </button>
                <button
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
