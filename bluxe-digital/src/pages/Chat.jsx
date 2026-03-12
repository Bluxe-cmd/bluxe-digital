// ============================================================
// Chat page — AI assistant powered by Cloudflare Worker proxy
// Set WORKER_URL in src/config.js before deploying
// ============================================================

import { useState, useRef, useEffect } from 'react'
import { WORKER_URL } from '../config'

function useAIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm your B. Luxe Digital assistant. Ask me anything about our products, planning strategies, or building your purpose-driven business.",
    },
  ])
  const [loading, setLoading] = useState(false)

  async function sendMessage(userText) {
    const updated = [...messages, { role: "user", content: userText }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-6",
          max_tokens: 1024,
          system: "You are a helpful assistant for B. Luxe Digital, a brand that creates digital tools and resources for purpose-driven women. Be warm, encouraging, and faith-aligned in your responses. Help users find the right products and strategies for their goals.",
          messages: updated.filter(m => m.role !== "system"),
        }),
      })
      const data = await res.json()
      const reply = data?.content?.[0]?.text ?? "I'm having trouble connecting right now. Please try again in a moment."
      setMessages([...updated, { role: "assistant", content: reply }])
    } catch {
      setMessages([...updated, { role: "assistant", content: "Connection issue — please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}

export default function Chat() {
  const { messages, loading, sendMessage } = useAIChat()
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    sendMessage(input.trim())
    setInput("")
  }

  return (
    <section className="pt-28 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">AI Assistant</p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Get Personalized Guidance</h1>
          <p className="text-stone-500">Ask about our products, planning strategies, or building your purpose-driven business.</p>
        </div>
        <div className="bg-stone-50 rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
          <div className="h-[500px] overflow-y-auto p-5 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-purple-600 text-white self-end rounded-br-sm"
                    : "bg-white text-stone-700 self-start shadow-sm rounded-bl-sm border border-stone-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-stone-400 text-sm self-start px-4 py-3 rounded-2xl shadow-sm border border-stone-100">
                <span className="animate-pulse">Thinking…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={handleSubmit} className="border-t border-stone-100 p-3 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 text-sm border border-stone-200 rounded-full px-4 py-2.5 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-200 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white text-sm px-5 py-2.5 rounded-full hover:bg-purple-700 disabled:opacity-40 transition-colors font-medium"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
