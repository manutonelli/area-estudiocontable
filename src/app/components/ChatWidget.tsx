import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Config ──────────────────────────────────────────────────────────────────
// La API key vive en el servidor (api/chat.ts). Este componente
// nunca la ve — solo llama al endpoint local /api/chat.
const API_ENDPOINT = "/api/chat";

const SUGGESTIONS = [
  "¿Cuáles son los horarios?",
  "¿Qué es el Monotributo?",
  "¿Cómo me inscribo en AFIP?",
  "¿Cuándo vencen los pagos?",
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "bot";
  text: string;
  time: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function nowTime() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

function formatText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)/gm, "• $1");
}

// ─── Component ───────────────────────────────────────────────────────────────
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && !greeted) {
      setGreeted(true);
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "¡Hola! 👋 Soy el asistente virtual de **AREA Estudio Contable**.\n\nPuedo ayudarte con consultas sobre Monotributo, IVA, Ganancias, AFIP, sociedades y más. ¿En qué te puedo ayudar hoy?",
            time: nowTime(),
          },
        ]);
      }, 350);
    }
    if (isOpen) setHasUnread(false);
  }, [isOpen, greeted]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text: msg, time: nowTime() }]);
    setIsTyping(true);

    historyRef.current.push({ role: "user", content: msg });

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current }),
      });

      const data = await res.json();
      const reply: string = data.reply ?? "Lo siento, hubo un error. Intentá de nuevo.";
      historyRef.current.push({ role: "assistant", content: reply });

      setMessages((prev) => [...prev, { role: "bot", text: reply, time: nowTime() }]);
      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Lo siento, hubo un problema al conectarme. Por favor intentá de nuevo o contactá al estudio directamente.",
          time: nowTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-[5.5rem] right-6 z-50 w-[340px] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 500, transformOrigin: "bottom right" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)" }}>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">AREA Estudio Contable</p>
                <p className="text-white/70 text-[11px] mt-0.5">Saladillo, Buenos Aires</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                  <span className="text-white/70 text-[11px]">Asistente en línea</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesEndRef}
              className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-2.5"
              style={{ background: "#f8f9fc" }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "text-[#1a2340] border border-[#e8ecf2] shadow-sm rounded-bl-sm bg-white"
                    }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg,#0f3460,#1a4a8a)" } : {}}
                    dangerouslySetInnerHTML={
                      msg.role === "bot"
                        ? { __html: formatText(msg.text) }
                        : undefined
                    }
                  >
                    {msg.role === "user" ? msg.text : undefined}
                  </div>
                  <span className="text-[10.5px] text-[#a0a8bc] mt-1 px-0.5">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="flex items-center gap-1 px-3.5 py-3 bg-white border border-[#e8ecf2] rounded-2xl rounded-bl-sm shadow-sm">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-[#9ba8c0] inline-block"
                        style={{ animation: `bounce 1.2s ${delay}ms infinite ease-in-out` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {showSuggestions && messages.length <= 1 && (
              <div className="px-3.5 pt-2 pb-1 flex flex-wrap gap-1.5" style={{ background: "#f8f9fc" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1 rounded-full text-[11.5px] border border-[#c8d0e0] text-[#1a4a8a] bg-white hover:bg-[#e8effc] hover:border-[#0f3460] transition-colors whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-t border-[#edf0f7] bg-white flex-shrink-0">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí tu consulta…"
                className="flex-1 resize-none rounded-3xl border-[1.5px] border-[#dce2ef] bg-[#f8f9fc] px-3.5 py-2 text-[13px] text-[#1a2340] outline-none focus:border-[#0f3460] focus:bg-white transition-colors max-h-20 overflow-y-auto leading-snug placeholder:text-[#a8b0c4]"
                style={{ minHeight: 36 }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 80) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isTyping || !input.trim()}
                aria-label="Enviar"
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-default hover:scale-105"
                style={{ background: "linear-gradient(135deg,#0f3460,#1a4a8a)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            <div className="text-center py-1.5 text-[10px] text-[#b0b8cc] bg-white border-t border-[#f0f0f0]">
              Powered by GroqCloud · AREA Estudio Contable
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble button ── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-[5.5rem] right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl"
        style={{ background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">
            1
          </span>
        )}
      </motion.button>

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
