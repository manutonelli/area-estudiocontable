import { useEffect } from "react";
import { useLocation } from "react-router";
import { Hero } from "../components/Hero";
import { ProblemaCliente } from "../components/ProblemaCliente";
import { PropuestaArea } from "../components/PropuestaArea";
import { MetodoArea } from "../components/MetodoArea";
import { Midpoint } from "../components/Midpoint";
import { About } from "../components/About";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    const id = decodeURIComponent(hash);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.pathname]);

  return (
    <>
      <Hero />
      <ProblemaCliente />
      <PropuestaArea />
      <MetodoArea />
      <Midpoint />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
