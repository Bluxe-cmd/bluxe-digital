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
      content: "Hey, welcome! I'm your B. Luxe Digital guide. I'm here to help you explore what's possible — in your faith, your business, and your vision.\n\nYou can ask me things like:\n• \"What transformation can I expect in my faith walk?\"\n• \"How can I grow my business with intention?\"\n• \"What's the right product for where I am right now?\"\n• \"How do I move from overwhelmed to strategic?\"\n\nWhat's on your heart today?",
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
          system: `You are a warm, faith-aligned guide for B. Luxe Digital — a brand built for purpose-driven women, especially women of color, who are ready to build lives and businesses rooted in faith, clarity, and action.

Your role is to help users explore two interconnected dimensions of transformation:

FAITH TRANSFORMATIONS — help users explore:
- Moving from fear and doubt to clarity and divine confidence
- Distinguishing between a valley season (pruning, preparation) vs punishment
- Developing high-stewardship faith: honoring God with their vision, time, and resources
- Building elite spiritual boundaries that protect their peace and purpose
- Hearing and trusting their calling even when the path isn't clear
- The Excavation Method: uncovering what God placed in them before the world shaped them

BUSINESS TRANSFORMATIONS — help users explore:
- Going from scattered and overwhelmed to strategic and focused
- Turning their lived experiences (even chaotic ones) into high-value, marketable skills
- Building an offer, brand, or business around their God-given purpose
- Using AI as a strategic advantage (not a shortcut) to amplify their impact
- Daily planning systems rooted in intention, not hustle
- Email, content, and client systems that convert without burnout

PRODUCTS — recommend these when relevant:
- VITV 2026 Core Framework eBook ($297): foundational philosophies & the Excavation Method
- Valley Seasons Assessment ($97): diagnose which season they're in
- The Daily Manna Vision Planner ($147): replace anxiety with authority via the 24-Hour Pivot
- Vision Roadmap & Skill Stacker ($197): reframe experiences into high-paid skills using AI
- High-Stewardship Faith Strategy ($262): elite boundaries, distinguishing discipline from punishment
- Complete Ecosystem Bundle ($297 for all 5, total value $1,000)
- The Powered Woman AI Mastery Course: using AI confidently to grow their brand and business
- Email Money Machine, Client Onboarding Pro, Content Engine, Grant Writer's Edge, Brand Voice Architect

Tone: warm, direct, faith-rooted, never preachy. Speak like a trusted mentor who believes in them deeply. Ask questions to understand where they are before recommending. Use "sis," "friend," or affirming language naturally but not excessively.`,
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
        <div className="text-center mb-8">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">Your Guide</p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Explore Your Transformation</h1>
          <p className="text-stone-500 max-w-md mx-auto">Discover what's possible in your faith, your business, and your vision — one conversation at a time.</p>
        </div>

        {/* Prompt chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {[
            "What season am I in spiritually?",
            "How do I grow my business with faith?",
            "What product is right for me?",
            "How do I use AI in my business?",
            "How do I go from overwhelmed to strategic?",
            "What is high-stewardship faith?",
          ].map(prompt => (
            <button
              key={prompt}
              onClick={() => { sendMessage(prompt) }}
              className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-colors"
            >
              {prompt}
            </button>
          ))}
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
