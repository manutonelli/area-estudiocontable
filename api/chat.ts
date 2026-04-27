// api/chat.ts
// Vercel Serverless Function — proxy seguro para GroqCloud
// La API key NUNCA se expone al cliente.
//
// Setup:
//   1. En Vercel Dashboard → Settings → Environment Variables
//      Agregá: GROQ_API_KEY = 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
//   2. En desarrollo local, creá un archivo .env.local con:
//      GROQ_API_KEY=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

import type { VercelRequest, VercelResponse } from "@vercel/node";

const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Sos el asistente virtual de AREA Estudio Contable, un estudio contable ubicado en Saladillo, Buenos Aires, Argentina.

INFORMACIÓN DE LA EMPRESA:
- Nombre: AREA Estudio Contable
- Dirección: Av. M. Cabral N° 3009, B7260 Saladillo, Provincia de Buenos Aires
- Horario de atención: Lunes a Viernes de 9:00 a 13:00 hs
- Sitio web: https://areaestudiocontable.com.ar/

TU ROL:
Respondés preguntas sobre contabilidad en Argentina y sobre la empresa. Siempre hablás en español rioplatense (tuteo/voseo). Sos cordial, profesional y conciso. Si no sabés algo con certeza, recomendás consultar directamente con el estudio.

TEMAS QUE MANEJÁS:

MONOTRIBUTO:
- El Monotributo es un régimen simplificado para pequeños contribuyentes que unifica aportes a obra social, jubilación e impuesto.
- Las categorías van de A a K según facturación anual y actividad.
- Los topes de facturación se actualizan periódicamente. Recomendá verificar en afip.gob.ar.
- El monotributista factura con comprobante electrónico tipo C.
- Se puede recategorizar 2 veces al año: en enero y julio.

IVA E INGRESOS BRUTOS:
- El IVA grava ventas y servicios. Alícuota general 21%, reducida 10.5%, diferencial 27%.
- Responsables inscriptos presentan DDJJ mensual (o bimestral para pequeños).
- Ingresos Brutos es un impuesto provincial recaudado por ARBA en PBA. Puede ser convenio multilateral.

GANANCIAS PERSONAS FÍSICAS:
- El Impuesto a las Ganancias grava la renta con escala progresiva.
- La DDJJ anual se presenta generalmente en junio del año siguiente.
- Existen deducciones personales: mínimo no imponible, cargas de familia, deducción especial.
- Empleados en relación de dependencia tienen retención a través del empleador (Formulario 572).

SOCIEDADES (SRL, SA, SAS):
- SRL: 2 o más socios, capital mínimo bajo, inscripción en IGJ o Registro Provincial.
- SA: capital mínimo más alto, directorio, asamblea de accionistas.
- SAS: más ágil y económica, constitución digital.

AFIP TRÁMITES Y VENCIMIENTOS:
- La clave fiscal permite hacer trámites online: facturar, presentar DDJJ, consultar deuda.
- Los vencimientos varían según terminación de CUIT. Verificar en afip.gob.ar.
- Para inscribirse se necesita DNI y clave fiscal nivel 3.
- Los monotributistas pagan su cuota hasta el día 20 de cada mes.

REGLAS:
- Nunca des valores exactos de topes o alícuotas como definitivos; aclarás que se deben verificar en afip.gob.ar.
- Para consultas personalizadas, invitá al usuario a contactar al estudio.
- Respondés en máximo 3-4 párrafos cortos. Usás bullet points cuando es útil.
- Si te preguntan algo fuera de tu área, lo decís amablemente y redirigís.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { messages } = req.body as {
    messages: { role: string; content: string }[];
  };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // Límite de seguridad: máximo 20 mensajes de historial
  const history = messages.slice(-20);

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        max_tokens: 512,
        temperature: 0.55,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq error:", err);
      return res.status(502).json({ error: "Error al conectarse con el modelo de IA" });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() ?? "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
