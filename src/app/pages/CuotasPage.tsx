import { useState } from "react";
import logoArea from "@/assets/logo-area.png";

interface ItemRow {
  id: number;
  desc: string;
  monto: string;
}

let nextId = 200;

function ItemCard({ item, onRemove, onChange, canRemove, descPlaceholder, montoPlaceholder }: {
  item: ItemRow;
  onRemove: () => void;
  onChange: (field: "desc" | "monto", val: string) => void;
  canRemove: boolean;
  descPlaceholder: string;
  montoPlaceholder: string;
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 14, padding: 14, marginBottom: 10 }}>
      <input
        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 10, padding: "10px 14px", fontFamily: "inherit", fontSize: 13, color: "#fff", outline: "none", marginBottom: 8, boxSizing: "border-box" }}
        placeholder={descPlaceholder}
        value={item.desc}
        onChange={e => onChange("desc", e.target.value)}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 12, padding: "0 14px" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#7ab0ab", marginRight: 8, flexShrink: 0 }}>$</span>
          <input
            type="number" min="0" inputMode="numeric"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", padding: "11px 0", width: "100%", minWidth: 0 }}
            placeholder={montoPlaceholder}
            value={item.monto}
            onChange={e => onChange("monto", e.target.value)}
          />
        </div>
        {canRemove && (
          <button onClick={onRemove} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)", color: "rgba(255,255,255,0.62)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, lineHeight: 1 }}>×</button>
        )}
      </div>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
  color: "rgba(255,255,255,0.62)", textTransform: "uppercase", marginBottom: 10,
};

const addBtn: React.CSSProperties = {
  background: "none", border: "1px dashed rgba(255,255,255,0.18)", borderRadius: 10,
  padding: 10, color: "rgba(255,255,255,0.62)", fontFamily: "inherit",
  fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 2,
};

export default function CuotasPage() {
  const [sueldo, setSueldo] = useState("");
  const [cuotas, setCuotas] = useState<ItemRow[]>([{ id: 1, desc: "", monto: "" }]);
  const [tarjetas, setTarjetas] = useState<ItemRow[]>([{ id: 2, desc: "", monto: "" }]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const sumarItems = (items: ItemRow[]) => items.reduce((acc, i) => acc + (parseFloat(i.monto) || 0), 0);
  const totalCuotas = sumarItems(cuotas);
  const totalTarjetas = sumarItems(tarjetas);
  const total = totalCuotas + totalTarjetas;
  const sueldoNum = parseFloat(sueldo) || 0;
  const pct = sueldoNum > 0 ? Math.round((total / sueldoNum) * 100) : 0;
  const fmt = (n: number) => "$" + n.toLocaleString("es-AR");
  const hasData = sueldoNum > 0;

  const addItem = (setter: React.Dispatch<React.SetStateAction<ItemRow[]>>) =>
    setter(prev => [...prev, { id: nextId++, desc: "", monto: "" }]);
  const removeItem = (setter: React.Dispatch<React.SetStateAction<ItemRow[]>>, id: number) =>
    setter(prev => prev.filter(i => i.id !== id));
  const changeItem = (setter: React.Dispatch<React.SetStateAction<ItemRow[]>>, id: number, field: "desc" | "monto", val: string) =>
    setter(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));

  const getColor = () => {
    if (pct <= 20) return "#5cbd7e";
    if (pct <= 35) return "#7de0a3";
    if (pct <= 50) return "#e8b44a";
    if (pct <= 70) return "#e89a4a";
    return "#e05c5c";
  };
  const getActiveDots = () => {
    if (pct <= 20) return 1;
    if (pct <= 35) return 2;
    if (pct <= 50) return 3;
    if (pct <= 70) return 4;
    return 5;
  };
  const getMsgClass = () => pct <= 35 ? "success" : pct <= 70 ? "warning" : "danger";
  const getMsg = () => {
    if (pct <= 20) return "🎉 Excelente. Tu nivel de deuda es muy saludable. Tenés margen para ahorrar o invertir.";
    if (pct <= 35) return "✅ Bien manejado. Estás dentro de un rango razonable, pero ojo con sumar más cuotas.";
    if (pct <= 50) return "⚠️ Zona de atención. Más de un tercio de tu sueldo ya está comprometido.";
    if (pct <= 70) return "🚨 Zona de riesgo. Más de la mitad de tu sueldo se va en deudas.";
    return "🔴 Nivel crítico. Tu deuda supera el 70% de tu sueldo. Es urgente reorganizar.";
  };
  const msgColors: Record<string, { bg: string; border: string; color: string }> = {
    success: { bg: "rgba(92,189,126,0.09)", border: "rgba(92,189,126,0.28)", color: "#7de0a3" },
    warning: { bg: "rgba(232,180,74,0.09)", border: "rgba(232,180,74,0.28)", color: "#f0c96a" },
    danger:  { bg: "rgba(224,92,92,0.09)",  border: "rgba(224,92,92,0.28)",  color: "#f08080" },
  };

  const enviarMail = () => {
    if (!nombre.trim() || !email.trim()) { alert("Por favor completá tu nombre y email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("El email no parece válido."); return; }
    const lineas = [
      `Sueldo neto: ${fmt(sueldoNum)}`, "",
      "CUOTAS FIJAS:",
      ...cuotas.filter(i => parseFloat(i.monto) > 0).map(i => `  - ${i.desc || "Sin descripción"}: ${fmt(parseFloat(i.monto))}`),
      "", "TARJETAS:",
      ...tarjetas.filter(i => parseFloat(i.monto) > 0).map(i => `  - ${i.desc || "Sin descripción"}: ${fmt(parseFloat(i.monto))}`),
      "", `TOTAL COMPROMETIDO: ${fmt(total)} (${pct}% del sueldo)`,
    ];
    const asunto = encodeURIComponent(`Consulta desde calculadora de cuotas — ${nombre}`);
    const cuerpo = encodeURIComponent(
      `Hola, llegó una consulta desde la calculadora de cuotas:\n\nNombre: ${nombre}\nEmail: ${email}\n\n${lineas.join("\n")}`
    );
    window.location.href = `mailto:area.estudiocontable@gmail.com?subject=${asunto}&body=${cuerpo}`;
    setEnviado(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#242938", fontFamily: "Raleway, sans-serif", color: "#fff", position: "relative", overflow: "hidden" }}>

      {/* BLOBS */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 480, height: 480, top: -170, left: -170, borderRadius: "50%", background: "#5f8e8a", opacity: 0.17 }} />
        <div style={{ position: "absolute", width: 360, height: 360, bottom: -110, left: -70, borderRadius: "50%", background: "#5f8e8a", opacity: 0.11 }} />
        <div style={{ position: "absolute", width: 240, height: 240, top: "35%", right: -70, borderRadius: "50%", background: "#5f8e8a", opacity: 0.09 }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <img src={logoArea} alt="Área Estudio Contable" style={{ height: 64, width: "auto", display: "block", margin: "0 auto", filter: "brightness(0) invert(1)" }} />
          <div style={{ marginTop: 28 }}>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", color: "#7ab0ab", textTransform: "uppercase", border: "1px solid #3d6b67", padding: "5px 14px", borderRadius: 20, marginBottom: 14 }}>
              Herramienta gratuita
            </span>
            <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
              Calculá cuánto de tu sueldo se va en cuotas
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.65, maxWidth: 460, margin: "0 auto" }}>
              En 2 minutos sabés si tu deuda es manejable o si ya es hora de ordenarte.
            </p>
          </div>
        </div>

        {/* 2 COLUMNAS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "start" }}>

          {/* COLUMNA IZQUIERDA — inputs */}
          <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 20, padding: "28px 24px" }}>

            {/* SUELDO */}
            <div style={{ marginBottom: 24 }}>
              <div style={sectionTitle}>Sueldo neto mensual</div>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 12, padding: "0 16px" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#7ab0ab", marginRight: 8 }}>$</span>
                <input
                  type="number" min="0" inputMode="numeric" placeholder="350.000"
                  value={sueldo} onChange={e => setSueldo(e.target.value)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "inherit", fontSize: 17, fontWeight: 600, color: "#fff", padding: "14px 0", width: "100%" }}
                />
              </div>
            </div>

            {/* CUOTAS */}
            <div style={{ marginBottom: 24 }}>
              <div style={sectionTitle}>Cuotas fijas</div>
              {cuotas.map(item => (
                <ItemCard key={item.id} item={item} canRemove={cuotas.length > 1}
                  onRemove={() => removeItem(setCuotas, item.id)}
                  onChange={(f, v) => changeItem(setCuotas, item.id, f, v)}
                  descPlaceholder="Descripción — ej: Crédito Banco Provincia"
                  montoPlaceholder="Monto mensual"
                />
              ))}
              <button style={addBtn} onClick={() => addItem(setCuotas)}>+ Agregar cuota</button>
            </div>

            {/* TARJETAS */}
            <div>
              <div style={sectionTitle}>Resúmenes de tarjeta</div>
              {tarjetas.map(item => (
                <ItemCard key={item.id} item={item} canRemove={tarjetas.length > 1}
                  onRemove={() => removeItem(setTarjetas, item.id)}
                  onChange={(f, v) => changeItem(setTarjetas, item.id, f, v)}
                  descPlaceholder="Descripción — ej: Visa Galicia"
                  montoPlaceholder="Total del resumen"
                />
              ))}
              <button style={addBtn} onClick={() => addItem(setTarjetas)}>+ Agregar tarjeta</button>
            </div>
          </div>

          {/* COLUMNA DERECHA — resultado + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* RESULTADO */}
            <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.62)", textTransform: "uppercase", marginBottom: 12 }}>
                Comprometido de tu sueldo
              </div>
              <div style={{ fontSize: "clamp(64px,12vw,100px)", fontWeight: 900, lineHeight: 1, color: hasData ? getColor() : "rgba(255,255,255,0.25)", transition: "color 0.4s" }}>
                <sup style={{ fontSize: "0.38em", fontWeight: 400, verticalAlign: "super" }}>%</sup>
                {hasData ? pct : 0}
              </div>

              {/* SEMAFORO */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "16px 0" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: hasData && i <= getActiveDots() ? getColor() : "rgba(255,255,255,0.13)", transition: "background 0.4s" }} />
                ))}
              </div>

              {hasData ? (
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
                  De <strong style={{ color: "#fff" }}>{fmt(sueldoNum)}</strong> de sueldo,{" "}
                  <strong style={{ color: "#fff" }}>{fmt(total)}</strong> ya están comprometidos.
                </div>
              ) : (
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>
                  Completá los campos para ver tu resultado.
                </div>
              )}

              {/* DESGLOSE */}
              {hasData && (
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.62)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                    <span>Cuotas fijas</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(totalCuotas)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.62)" }}>
                    <span>Tarjetas</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(totalTarjetas)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, marginTop: 4 }}>
                    <span>Total</span>
                    <span style={{ color: getColor() }}>{fmt(total)}</span>
                  </div>
                </div>
              )}

              {/* MENSAJE */}
              {hasData && (
                <div style={{ marginTop: 16, borderRadius: 12, padding: "12px 16px", fontSize: 13, lineHeight: 1.55, border: `1px solid ${msgColors[getMsgClass()].border}`, background: msgColors[getMsgClass()].bg, color: msgColors[getMsgClass()].color, textAlign: "left" }}>
                  {getMsg()}
                </div>
              )}
            </div>

            {/* CTA MAIL */}
            {hasData && (
              <div style={{ background: "#3d6b67", borderRadius: 20, padding: "24px 24px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  No lo dejés pasar, te ayudamos a organizarte.
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 18, lineHeight: 1.5 }}>
                  Dejanos tu nombre y mail y te contactamos a la brevedad.
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 6 }}>Nombre</label>
                  <input
                    style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 14px", fontFamily: "inherit", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" }}
                    placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 6 }}>Email</label>
                  <input
                    type="email"
                    style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 14px", fontFamily: "inherit", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" }}
                    placeholder="tucorreo@gmail.com" value={email} onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={enviarMail} disabled={enviado}
                  style={{ width: "100%", background: "#fff", color: "#3d6b67", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 30, border: "none", cursor: enviado ? "not-allowed" : "pointer", opacity: enviado ? 0.6 : 1 }}
                >
                  {enviado ? "✓ Consulta enviada" : "Enviar consulta"}
                </button>
                {enviado && (
                  <div style={{ marginTop: 12, background: "rgba(92,189,126,0.15)", border: "1px solid rgba(92,189,126,0.4)", borderRadius: 12, padding: "12px 16px", textAlign: "center", color: "#7de0a3", fontSize: 13 }}>
                    ✓ ¡Listo! Tu consulta fue enviada. Te contactamos pronto.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 48, fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "1px" }}>
          © Área Estudio Contable — areaestudiocontable.com.ar
        </div>
      </div>
    </div>
  );
}
