import { Sparkles } from "lucide-react";

const PLACEHOLDERS = [
  "¿Estoy pagando de más?",
  "Recursos para freelancers que cobran en USD",
];

export function UpcomingResources() {
  return (
    <section className="py-20 md:py-28 border-t border-[#C7C1CB]/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-[#63868A] mb-4">
          <Sparkles className="w-5 h-5" aria-hidden />
          <span className="text-xs uppercase tracking-[0.2em]">Próximamente</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#282F3F] mb-10">
          Más recursos en camino
        </h2>
        <ul className="space-y-4">
          {PLACEHOLDERS.map((title) => (
            <li
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-dashed border-[#C7C1CB]/60 bg-[#C7C1CB]/5 px-6 py-5 text-[#3D5466]/70"
            >
              <span className="h-2 w-2 rounded-full bg-[#63868A]/40 shrink-0" />
              <span className="text-base font-medium">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
