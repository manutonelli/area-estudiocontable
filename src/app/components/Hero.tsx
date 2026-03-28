import { motion } from "motion/react";
import heroAreaLocal from "@/assets/hero-area-local.png";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#2E3A4D]">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute -top-40 -right-40 w-[700px] h-[700px] opacity-[0.08]"
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
          className="absolute -bottom-32 -left-24 w-[500px] h-[500px] opacity-[0.07]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4F6D7A"
            d="M37.9,-65.4C49.3,-57.9,59,-48,65.3,-36.1C71.6,-24.3,74.4,-10.4,73.9,3.5C73.4,17.4,69.6,31.3,62,43.1C54.4,54.9,43.1,64.5,30.2,70.4C17.3,76.3,2.8,78.5,-11.3,76.5C-25.4,74.5,-39.1,68.3,-50.3,59C-61.5,49.7,-70.2,37.3,-74,23.3C-77.8,9.3,-76.7,-6.2,-71.8,-19.9C-66.9,-33.6,-58.2,-45.4,-47,-53.7C-35.8,-62,-18.9,-66.8,-3.3,-62.4C12.2,-57.9,26.5,-72.9,37.9,-65.4Z"
            transform="translate(100 100)"
          />
        </svg>
        {/* Subtle dot accent */}
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-white/15" />
      </div>

      <div className="mx-auto max-w-7xl px-8 md:px-16 relative z-10 w-full pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left — Text */}
          <div>
            <motion.h1
              className="text-[clamp(2.4rem,5vw,4.2rem)] font-bold text-white leading-[1.08] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65 }}
            >
              Acompañamos a personas y negocios a ordenar su situación contable{" "}
              <span className="text-[#4F6D7A]">de forma clara y simple.</span>
            </motion.h1>

            <motion.p
              className="text-[#F4F4F4]/60 text-lg md:text-xl mb-12 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              Para freelancers, monotributistas y empleados que quieren entender
              su situación sin complicaciones.
            </motion.p>

            <motion.button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-white text-[#2E3A4D] px-9 py-4 rounded-full text-base font-semibold hover:bg-[#F4F4F4] transition-all shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Escribinos
            </motion.button>
          </div>

          {/* Right — Organic visual */}
          <motion.div
            className="relative hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[420px]">
              {/* Floating accent circles */}
              <div className="absolute -top-4 -left-6 w-5 h-5 rounded-full bg-[#4F6D7A]/50 blur-sm" />
              <div className="absolute -bottom-6 -right-4 w-8 h-8 rounded-full bg-white/10" />
              <div className="absolute top-1/2 -right-8 w-3 h-3 rounded-full bg-[#4F6D7A]/30" />

              {/* Blob image clip */}
              <svg
                viewBox="0 0 420 480"
                className="w-full drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="heroBlob">
                    <path d="M330,90 C375,145 395,210 378,280 C361,350 305,408 232,424 C159,440 88,412 52,348 C16,284 28,188 65,116 C102,44 178,0 252,8 C326,16 285,35 330,90Z" />
                  </clipPath>
                </defs>
                {/* Blob color layer */}
                <path
                  d="M330,90 C375,145 395,210 378,280 C361,350 305,408 232,424 C159,440 88,412 52,348 C16,284 28,188 65,116 C102,44 178,0 252,8 C326,16 285,35 330,90Z"
                  fill="#4F6D7A"
                  opacity="0.35"
                />
                <image
                  href={heroAreaLocal}
                  clipPath="url(#heroBlob)"
                  x="0"
                  y="0"
                  width="420"
                  height="480"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
