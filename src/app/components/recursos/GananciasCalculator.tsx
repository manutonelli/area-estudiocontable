import { useState, useMemo } from "react";
import { motion } from "motion/react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  calcularEstimacionGanancias,
  type InputCalculadoraGanancias,
  ESCALA_GANANCIAS_TRAMOS,
  DEDUCCION_GENERAL_ANUAL,
  DEDUCCION_CONYUGE_ANUAL,
  DEDUCCION_POR_HIJO_ANUAL,
  DEDUCCION_HIJO_INCAPACITADO_ANUAL,
  PERIODO_VIGENTE,
} from "@/config/gananciasCalculadora";

const SALARY_MAX = 20_000_000;
const SALARY_STEP = 50_000;

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNum(value: number) {
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(value);
}

const ESCENARIOS = [
  {
    label: "Soltero/a, sin hijos",
    sub: "Salario: $2.500.000",
    data: { salario: 2_500_000, extras: 0, sac: true, conyuge: false, hijos: 0, hijosIncap: 0, otras: 0 },
  },
  {
    label: "Casado/a con 2 hijos",
    sub: "Salario: $4.000.000",
    data: { salario: 4_000_000, extras: 0, sac: true, conyuge: true, hijos: 2, hijosIncap: 0, otras: 0 },
  },
  {
    label: "Soltero/a que alquila",
    sub: "Salario: $2.200.000, alquiler $500k/mes",
    data: { salario: 2_200_000, extras: 0, sac: true, conyuge: false, hijos: 0, hijosIncap: 0, otras: 6_000_000 },
  },
  {
    label: "Con bono anual",
    sub: "Salario: $3.500.000 + bono $7.000.000",
    data: { salario: 3_500_000, extras: 7_000_000, sac: true, conyuge: false, hijos: 0, hijosIncap: 0, otras: 0 },
  },
];

// Simple donut using conic-gradient
function DonutChart({ pctNeto, pctAportes, pctGanancias }: { pctNeto: number; pctAportes: number; pctGanancias: number }) {
  const n = Math.round(pctNeto);
  const a = Math.round(pctAportes);
  const g = Math.max(0, 100 - n - a);
  const style = {
    background: `conic-gradient(
      #4ade80 0% ${n}%,
      #f59e0b ${n}% ${n + a}%,
      #f87171 ${n + a}% 100%
    )`,
  };
  return (
    <div className="relative w-32 h-32 rounded-full mx-auto" style={style}>
      <div className="absolute inset-[22%] rounded-full bg-[#1e293b] flex flex-col items-center justify-center">
        <span className="text-[#4ade80] font-bold text-sm leading-none">{n}%</span>
        <span className="text-white/60 text-[10px] mt-0.5">Neto</span>
      </div>
      {/* unused to suppress lint */ void g}
    </div>
  );
}

export function GananciasCalculator() {
  const [salario, setSalario] = useState(2_500_000);
  const [salarioRaw, setSalarioRaw] = useState("2500000");
  const [extras, setExtras] = useState(0);
  const [extrasRaw, setExtrasRaw] = useState("0");
  const [sac, setSac] = useState(true);
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState(0);
  const [hijosIncap, setHijosIncap] = useState(0);
  const [otras, setOtras] = useState(0);
  const [otrasRaw, setOtrasRaw] = useState("0");
  const [otrasOpen, setOtrasOpen] = useState(false);
  const [escenarioActivo, setEscenarioActivo] = useState<number | null>(0);

  function applyEscenario(idx: number) {
    const d = ESCENARIOS[idx].data;
    setSalario(d.salario);
    setSalarioRaw(String(d.salario));
    setExtras(d.extras);
    setExtrasRaw(String(d.extras));
    setSac(d.sac);
    setConyuge(d.conyuge);
    setHijos(d.hijos);
    setHijosIncap(d.hijosIncap);
    setOtras(d.otras);
    setOtrasRaw(String(d.otras));
    setEscenarioActivo(idx);
  }

  const input: InputCalculadoraGanancias = {
    sueldoBrutoMensual: salario,
    ingresosExtraAnuales: extras,
    incluirSAC: sac,
    conyugeACargo: conyuge,
    hijosMenores18: hijos,
    hijosIncapacitados: hijosIncap,
    otrasDeduccionesAnual: otras,
  };

  const resultado = useMemo(() => calcularEstimacionGanancias(input), [
    salario, extras, sac, conyuge, hijos, hijosIncap, otras,
  ]);

  function handleSalarioInput(val: string) {
    setSalarioRaw(val);
    setEscenarioActivo(null);
    const n = Number(val.replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(n) && n >= 0) setSalario(Math.min(n, SALARY_MAX));
  }

  function handleExtrasInput(val: string) {
    setExtrasRaw(val);
    setEscenarioActivo(null);
    const n = Number(val.replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(n) && n >= 0) setExtras(n);
  }

  function handleOtrasInput(val: string) {
    setOtrasRaw(val);
    setEscenarioActivo(null);
    const n = Number(val.replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(n) && n >= 0) setOtras(n);
  }

  const inputCls =
    "w-full px-3 py-2.5 rounded-lg border border-[#C7C1CB]/50 text-[#282F3F] placeholder:text-[#C7C1CB] focus:outline-none focus:ring-2 focus:ring-[#63868A]/40 text-sm";
  const checkboxCls = "h-4 w-4 rounded border-[#C7C1CB] text-[#282F3F] accent-[#282F3F]";

  return (
    <div id="calculadora-ganancias" className="scroll-mt-28 pt-12 md:pt-16 border-t border-[#C7C1CB]/30 mt-16">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#63868A]">Herramienta</span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#282F3F] mt-1 mb-1">
          Calculadora de Impuesto a los Ingresos Personales
        </h2>
        <p className="text-sm text-[#3D5466]">
          Período {PERIODO_VIGENTE} · Art. 94 LIG · Res. Gral. 4.003 AFIP
        </p>
        <div className="mt-3 flex items-start gap-2 bg-[#f0fdf4] border border-[#4ade80]/30 rounded-lg px-4 py-2.5">
          <span className="text-[#16a34a] text-xs mt-0.5">ⓘ</span>
          <p className="text-xs text-[#16a34a]">
            Simulación con proyección de ingresos constantes. No constituye asesoramiento fiscal.
          </p>
        </div>
      </div>

      {/* 1. Escenarios */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#282F3F] mb-3">1. Explorar Escenarios</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {ESCENARIOS.map((esc, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyEscenario(i)}
              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                escenarioActivo === i
                  ? "border-[#282F3F] bg-[#282F3F] text-white"
                  : "border-[#C7C1CB]/50 bg-white hover:border-[#282F3F]/40 text-[#282F3F]"
              }`}
            >
              <p className="font-semibold text-xs leading-tight mb-1">{esc.label}</p>
              <p className={`text-[11px] leading-tight ${escenarioActivo === i ? "text-white/70" : "text-[#3D5466]"}`}>
                {esc.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 2 & 3: Form + Results */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        <div className="bg-white rounded-2xl border border-[#C7C1CB]/35 p-6 shadow-sm space-y-5">
          <p className="text-sm font-semibold text-[#282F3F]">2. Ingrese sus datos</p>

          {/* Salario */}
          <div>
            <label className="block text-xs font-medium text-[#282F3F] mb-1.5">
              Salario Bruto Mensual (ARS)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={salarioRaw}
              onChange={(e) => handleSalarioInput(e.target.value)}
              className={inputCls}
              placeholder="Ej: 2500000"
            />
            <SliderPrimitive.Root
              value={[salario]}
              onValueChange={([v]) => {
                setSalario(v);
                setSalarioRaw(String(v));
                setEscenarioActivo(null);
              }}
              min={0}
              max={SALARY_MAX}
              step={SALARY_STEP}
              className="relative flex items-center select-none touch-none w-full h-5 mt-2"
            >
              <SliderPrimitive.Track className="bg-[#C7C1CB]/40 relative grow rounded-full h-1.5">
                <SliderPrimitive.Range className="absolute bg-[#282F3F] rounded-full h-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-[#282F3F] rounded-full shadow focus:outline-none cursor-pointer" />
            </SliderPrimitive.Root>
            <p className="text-[11px] text-[#3D5466]/60 mt-1">Deslizá para ajustar rápidamente</p>
          </div>

          {/* Ingresos extra */}
          <div>
            <label className="block text-xs font-medium text-[#282F3F] mb-1.5">
              Ingresos Extra Anuales (Bono, etc.)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={extrasRaw}
              onChange={(e) => handleExtrasInput(e.target.value)}
              className={inputCls}
              placeholder="0"
            />
            <p className="text-[11px] text-[#3D5466]/60 mt-1">Bonos, gratificaciones u otros ingresos anuales.</p>
          </div>

          {/* SAC */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={sac}
              onChange={(e) => { setSac(e.target.checked); setEscenarioActivo(null); }}
              className={checkboxCls}
            />
            <div>
              <p className="text-sm font-medium text-[#282F3F]">Incluir SAC/Aguinaldo</p>
              <p className="text-[11px] text-[#3D5466]/70">Considerar la décimo tercera cuota anual.</p>
            </div>
          </label>

          {/* Deducciones personales */}
          <div>
            <p className="text-xs font-semibold text-[#282F3F] mb-3 uppercase tracking-wide">Deducciones Personales</p>
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={conyuge}
                  onChange={(e) => { setConyuge(e.target.checked); setEscenarioActivo(null); }}
                  className={checkboxCls}
                />
                <span className="text-sm text-[#282F3F]">Cónyuge o unión convivencial a cargo</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#282F3F] mb-1">Hijos menores de 18 años</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={hijos}
                    onChange={(e) => { setHijos(Math.max(0, parseInt(e.target.value) || 0)); setEscenarioActivo(null); }}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#282F3F] mb-1">Hijos incapacitados para el trabajo</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={hijosIncap}
                    onChange={(e) => { setHijosIncap(Math.max(0, parseInt(e.target.value) || 0)); setEscenarioActivo(null); }}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Otras deducciones - collapsible */}
          <div className="border border-[#C7C1CB]/40 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOtrasOpen(!otrasOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#282F3F] hover:bg-[#F4F4F4] transition-colors"
            >
              <span>Otras Deducciones (ARS)</span>
              {otrasOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {otrasOpen && (
              <div className="px-4 pb-4 pt-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={otrasRaw}
                  onChange={(e) => handleOtrasInput(e.target.value)}
                  className={inputCls}
                  placeholder="Monto anual (alquiler, prepaga, etc.)"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-[#282F3F]">3. Resultados</p>

          {/* Donut + legend */}
          <div className="bg-white rounded-2xl border border-[#C7C1CB]/35 p-5 shadow-sm">
            <p className="text-xs text-[#3D5466] mb-4 text-center">Composición del Salario Bruto Mensual</p>
            <DonutChart
              pctNeto={resultado.pctNeto}
              pctAportes={resultado.pctAportes}
              pctGanancias={resultado.pctGanancias}
            />
            <div className="flex justify-center gap-5 mt-4 text-xs text-[#3D5466]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] inline-block" />
                {Math.round(resultado.pctNeto)}% Neto
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block" />
                {Math.round(resultado.pctAportes)}% Aportes
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] inline-block" />
                {Math.round(resultado.pctGanancias)}% Gcias.
              </span>
            </div>
          </div>

          {/* Result cards */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              key={resultado.retencionMensualEstimada}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-[#C7C1CB]/35 p-4 shadow-sm"
            >
              <p className="text-xs text-[#3D5466] mb-1">Retención Mensual Estimada</p>
              <p className="text-xl font-bold text-[#282F3F]">
                {formatARS(Math.round(resultado.retencionMensualEstimada))}
              </p>
              <p className="text-[11px] text-[#3D5466]/60 mt-0.5">
                {resultado.porcentajeEfectivo.toFixed(1)}% efectivo
              </p>
            </motion.div>

            <motion.div
              key={resultado.sueldoNetoDeBolsillo}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className="bg-[#f0fdf4] rounded-xl border border-[#4ade80]/30 p-4 shadow-sm"
            >
              <p className="text-xs text-[#16a34a] mb-1">Sueldo Neto de Bolsillo</p>
              <p className="text-xl font-bold text-[#15803d]">
                {formatARS(Math.round(resultado.sueldoNetoDeBolsillo))}
              </p>
            </motion.div>

            <div className="bg-white rounded-xl border border-[#C7C1CB]/35 p-4 shadow-sm">
              <p className="text-xs text-[#3D5466] mb-1">Impuesto Anual Proyectado</p>
              <p className="text-xl font-bold text-[#282F3F]">
                {formatARS(Math.round(resultado.impuestoAnualEstimado))}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#C7C1CB]/35 p-4 shadow-sm">
              <p className="text-xs text-[#3D5466] mb-1">Ganancia Neta sujeta a Impuesto</p>
              <p className="text-xl font-bold text-[#282F3F]">
                {formatARS(Math.max(0, Math.round(resultado.baseImponibleAnual)))}
              </p>
            </div>
          </div>

          {/* Aportes */}
          <div className="bg-white rounded-xl border border-[#C7C1CB]/35 p-4 shadow-sm">
            <p className="text-xs text-[#3D5466] mb-1">Aportes Previsionales Mensuales (17%)</p>
            <p className="text-xl font-bold text-[#282F3F]">
              {formatARS(Math.round(resultado.aportesPrevisionalMensual))}
            </p>
            <p className="text-[11px] text-[#3D5466]/60 mt-0.5">
              Base imponible con topes AFIP aplicados
            </p>
          </div>
        </div>
      </div>

      {/* 4. Cómo se calcula */}
      <div className="mt-10 bg-white rounded-2xl border border-[#C7C1CB]/35 p-6 shadow-sm">
        <p className="text-sm font-semibold text-[#282F3F] mb-4">4. ¿Cómo se Calcula el Impuesto?</p>
        <TabsPrimitive.Root defaultValue="paso1">
          <TabsPrimitive.List className="flex flex-wrap gap-2 mb-5">
            {[
              { value: "paso1", label: "Paso 1: Ganancia Bruta" },
              { value: "paso2", label: "Paso 2: Deducciones" },
              { value: "paso3", label: "Paso 3: Escala" },
              { value: "paso4", label: "Paso 4: Retención" },
            ].map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#C7C1CB]/50 text-[#3D5466] data-[state=active]:bg-[#282F3F] data-[state=active]:text-white data-[state=active]:border-[#282F3F] transition-all"
              >
                {tab.label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          <TabsPrimitive.Content value="paso1" className="text-sm text-[#3D5466] space-y-2">
            <p className="font-semibold text-[#282F3F]">Determinar la Ganancia Bruta Anual</p>
            <p>Se proyecta el ingreso anual sumando los 12 salarios mensuales y el SAC (aguinaldo) si corresponde. Se añaden también los ingresos extra anuales como bonos.</p>
            <div className="bg-[#F4F4F4] rounded-lg px-4 py-2.5 font-mono text-xs text-[#282F3F] mt-2">
              Ganancia Bruta = (Sueldo × 12 ó 13) + Ingresos Extra
            </div>
            <p className="text-xs text-[#3D5466]/70 pt-1">
              Para tu caso: {formatARS(resultado.brutoAnualProyectado)} anuales
            </p>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="paso2" className="text-sm text-[#3D5466] space-y-2">
            <p className="font-semibold text-[#282F3F]">Aplicar las Deducciones Personales</p>
            <p>Se restan las deducciones permitidas por ley para obtener la base imponible neta.</p>
            <ul className="space-y-1.5 mt-2 text-xs">
              <li className="flex justify-between"><span>MNI + Deducción Especial</span><span className="font-medium text-[#282F3F]">{formatARS(DEDUCCION_GENERAL_ANUAL)}</span></li>
              {conyuge && <li className="flex justify-between"><span>Cónyuge/conviviente a cargo</span><span className="font-medium text-[#282F3F]">{formatARS(DEDUCCION_CONYUGE_ANUAL)}</span></li>}
              {hijos > 0 && <li className="flex justify-between"><span>Hijos menores ({hijos})</span><span className="font-medium text-[#282F3F]">{formatARS(hijos * DEDUCCION_POR_HIJO_ANUAL)}</span></li>}
              {hijosIncap > 0 && <li className="flex justify-between"><span>Hijos incapacitados ({hijosIncap})</span><span className="font-medium text-[#282F3F]">{formatARS(hijosIncap * DEDUCCION_HIJO_INCAPACITADO_ANUAL)}</span></li>}
              {otras > 0 && <li className="flex justify-between"><span>Otras deducciones</span><span className="font-medium text-[#282F3F]">{formatARS(otras)}</span></li>}
              <li className="flex justify-between pt-1.5 border-t border-[#C7C1CB]/40 font-semibold text-[#282F3F]">
                <span>Total deducciones</span>
                <span>{formatARS(resultado.totalDeduccionesAnual)}</span>
              </li>
              <li className="flex justify-between font-semibold text-[#282F3F]">
                <span>Base imponible</span>
                <span>{formatARS(Math.max(0, resultado.baseImponibleAnual))}</span>
              </li>
            </ul>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="paso3" className="text-sm text-[#3D5466] space-y-2">
            <p className="font-semibold text-[#282F3F]">Aplicar la Escala Progresiva</p>
            <p>El impuesto se calcula por tramos: cada porción de la base imponible tributa a una tasa diferente.</p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[#282F3F] font-semibold border-b border-[#C7C1CB]/40">
                    <th className="text-left pb-2">Desde</th>
                    <th className="text-left pb-2">Hasta</th>
                    <th className="text-right pb-2">Tasa</th>
                  </tr>
                </thead>
                <tbody>
                  {ESCALA_GANANCIAS_TRAMOS.map((t, i) => (
                    <tr key={i} className="border-b border-[#C7C1CB]/20">
                      <td className="py-1.5">{formatARS(t.desde)}</td>
                      <td className="py-1.5">{t.hasta === Infinity ? "En adelante" : formatARS(t.hasta)}</td>
                      <td className="py-1.5 text-right font-medium text-[#282F3F]">{(t.tasa * 100).toFixed(0)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="paso4" className="text-sm text-[#3D5466] space-y-2">
            <p className="font-semibold text-[#282F3F]">Calcular la Retención Mensual</p>
            <p>El impuesto anual resultante se divide en 12 cuotas mensuales. El empleador lo retiene directamente del salario.</p>
            <div className="bg-[#F4F4F4] rounded-lg px-4 py-2.5 font-mono text-xs text-[#282F3F] mt-2">
              Retención mensual = Impuesto anual ÷ 12
            </div>
            <p className="text-xs text-[#3D5466]/70 pt-1">
              Para tu caso: {formatARS(Math.round(resultado.impuestoAnualEstimado))} ÷ 12 = <strong className="text-[#282F3F]">{formatARS(Math.round(resultado.retencionMensualEstimada))}/mes</strong>
            </p>
            <p className="text-xs mt-3 bg-[#fff7ed] border border-[#f59e0b]/30 rounded-lg px-3 py-2 text-[#92400e]">
              Este cálculo es orientativo. El monto real depende de tu recibo, las deducciones efectivas y la normativa vigente. Consultá con tu contador/a.
            </p>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-[#3D5466]/60 text-center mt-6 max-w-2xl mx-auto">
        Cálculo orientativo basado en Art. 94 LIG y escala vigente. No constituye asesoramiento profesional.
        Los valores deben revisarse ante actualizaciones normativas.
      </p>
    </div>
  );
}
