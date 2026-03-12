import { useState, useRef, useEffect } from 'react'

// ============================================================
// CONFIG — fill these in before deploying
// ============================================================
const WORKER_URL = "YOUR_CLOUDFLARE_WORKER_URL_HERE"

const products = [
  {
    id: "email-money-machine",
    name: "Email Money Machine",
    tagline: "Turn your list into revenue.",
    description: "A complete system for building and monetizing your email list with purpose-driven sequences that convert.",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "client-onboarding-pro",
    name: "Client Onboarding Pro",
    tagline: "First impressions that close deals.",
    description: "Streamline your client experience with done-for-you templates, workflows, and onboarding systems.",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "content-engine",
    name: "Content Engine",
    tagline: "Create less. Show up more.",
    description: "A strategic content planning system that keeps your brand visible without the burnout.",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "grant-writers-edge",
    name: "Grant Writer's Edge",
    tagline: "Fund your vision.",
    description: "The go-to guide for writing winning grant proposals—research, frameworks, and templates included.",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "brand-voice-architect",
    name: "Brand Voice Architect",
    tagline: "Say it. Own it. Be remembered.",
    description: "Define your brand's voice, tone, and messaging so every word you write sounds unmistakably you.",
    gumroadId: "YOUR_SLUG_HERE",
  },
]

// ============================================================
// AI Chat hook
// ============================================================
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

// ============================================================
// Nav
// ============================================================
function Nav() {
  const [open, setOpen] = useState(false)
  const links = ["Products", "About", "Why B. Luxe", "Chat"]

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold text-lg tracking-tight text-stone-900">
          B. <span className="text-purple-600">Luxe</span> Digital
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-stone-500">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-purple-600 transition-colors">
              {l}
            </a>
          ))}
          <a
            href="#products"
            className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Shop Now
          </a>
        </div>
        {/* Mobile toggle */}
        <button className="md:hidden text-stone-700" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)} className="hover:text-purple-600">
              {l}
            </a>
          ))}
          <a href="#products" onClick={() => setOpen(false)} className="bg-purple-600 text-white text-center px-5 py-2 rounded-full font-medium">
            Shop Now
          </a>
        </div>
      )}
    </nav>
  )
}

// ============================================================
// Hero
// ============================================================
function Hero() {
  return (
    <section id="top" className="pt-32 pb-24 px-6 text-center bg-gradient-to-b from-purple-50 via-white to-white">
      <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-4">Faith · Clarity · Action</p>
      <h1 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight max-w-3xl mx-auto mb-6">
        Your Vision Deserves a Plan.<br />
        <span className="text-purple-600">Your Purpose Deserves Support.</span>
      </h1>
      <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10">
        Digital tools, journals, and resources designed for women who are ready to stop dreaming and start building—with faith, clarity, and intention.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#products"
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-colors text-base"
        >
          Explore the Collection
        </a>
        <a
          href="#about"
          className="border border-stone-200 text-stone-700 px-8 py-4 rounded-full font-medium hover:border-purple-300 hover:text-purple-600 transition-colors text-base"
        >
          Meet Bianca
        </a>
      </div>
    </section>
  )
}

// ============================================================
// Welcome / Brand Intro
// ============================================================
function Welcome() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">Welcome</p>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-8">Welcome to B. Luxe Digital</h2>
        <div className="text-stone-600 text-lg leading-relaxed space-y-4 text-left md:text-center">
          <p>You've got the vision. The ideas that keep you up at night. The calling you can't shake.</p>
          <p>But somewhere between the dream and the doing, things get foggy. Overwhelming. Unclear.</p>
          <p className="font-medium text-stone-800">That's exactly why B. Luxe Digital exists.</p>
          <p>
            We create thoughtfully designed digital planners, journals, and resources that help purpose-driven women—especially women of color—move from scattered to strategic, from overwhelmed to organized, and from dreaming to <em>doing</em>.
          </p>
          <p className="text-purple-700 font-medium">
            This isn't about hustle culture. It's about holy alignment.
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Products
// ============================================================
function ProductCard({ product }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-1">
        <span className="text-purple-600 text-lg">✦</span>
      </div>
      <div>
        <p className="text-xs text-purple-500 font-medium tracking-wide uppercase mb-1">{product.tagline}</p>
        <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
        <p className="text-sm text-stone-500 mt-2 leading-relaxed">{product.description}</p>
      </div>
      <div className="mt-auto pt-2">
        <a
          href={`https://gumroad.com/l/${product.gumroadId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-purple-600 text-white text-sm px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium"
        >
          Get It Now
        </a>
      </div>
    </div>
  )
}

function Products() {
  return (
    <section id="products" className="py-20 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Collection</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Tools Built for Your Journey</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Everything you need to move from scattered to strategic—designed with intention, built for action.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://gumroad.com/bluxedigital"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-purple-200 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors text-sm font-medium"
          >
            Browse Full Collection on Gumroad
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Why B. Luxe
// ============================================================
const reasons = [
  { icon: "✦", title: "Intentionally Designed", body: "Beautiful, functional, and easy to use—because you deserve tools that actually work for you." },
  { icon: "🎯", title: "Purpose-Driven", body: "Built to help you move forward with clarity, not just fill your digital downloads folder." },
  { icon: "🙏", title: "Faith-Aligned", body: "Rooted in the belief that your vision matters and you were created on purpose, for a purpose." },
  { icon: "👑", title: "Made for You", body: "Created with women of color and purpose-led entrepreneurs in mind—finally, tools that get your journey." },
]

function WhyBLuxe() {
  return (
    <section id="why-b.-luxe" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Difference</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Why B. Luxe Digital?</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Because you don't need another generic planner that collects digital dust. You need tools that <em>get</em> you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map(r => (
            <div key={r.title} className="bg-purple-50 rounded-2xl p-8">
              <div className="text-2xl mb-3">{r.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{r.title}</h3>
              <p className="text-stone-600 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-purple-200 text-sm font-medium tracking-widest uppercase mb-3">The Promise</p>
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
            This is planning with purpose. Journaling with intention. Building with faith.
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// About
// ============================================================
function About() {
  return (
    <section id="about" className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Founder</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Hey, I'm Bianca.</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <p className="text-stone-500 text-sm font-medium mb-6">Entrepreneur · Strategist · Woman of Faith</p>
          <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
            <p>
              And someone who knows what it's like to have a big vision with no clear roadmap.
            </p>
            <p>
              I created B. Luxe Digital because I needed it first. I needed tools that weren't one-size-fits-all. Resources that understood the unique journey of building something meaningful while navigating life, identity, and purpose.
            </p>
            <p className="text-stone-900 font-medium">
              Everything we create here is rooted in three things: <span className="text-purple-600">faith</span>, <span className="text-purple-600">clarity</span>, and <span className="text-purple-600">action</span>.
            </p>
            <p>Because your vision is too important to stay stuck in your head.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// AI Chat
// ============================================================
function Chat() {
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
    <section id="chat" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">AI Assistant</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Get Personalized Guidance</h2>
          <p className="text-stone-500">Ask about our products, planning strategies, or building your purpose-driven business.</p>
        </div>
        <div className="bg-stone-50 rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
          <div className="h-96 overflow-y-auto p-5 flex flex-col gap-3">
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

// ============================================================
// Final CTA
// ============================================================
function FinalCTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-purple-300 text-sm font-medium tracking-widest uppercase mb-4">Your Next Chapter</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Next Chapter Starts Here.</h2>
        <p className="text-purple-100 text-lg mb-10 leading-relaxed">
          You don't have to figure it all out alone. You just need the right tools—and the courage to begin. Let's turn that vision into something real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors"
          >
            Shop Now
          </a>
          <a
            href="#chat"
            className="border border-purple-400 text-white px-8 py-4 rounded-full font-medium hover:border-white transition-colors"
          >
            Talk to Our AI Assistant
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <span className="text-white font-semibold">B. Luxe Digital</span>
          <span className="mx-2">·</span>
          <span className="italic">Faith-Fueled Planning for Purpose-Driven Women.</span>
        </div>
        <div className="flex gap-6">
          <a href="#products" className="hover:text-white transition-colors">Products</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#chat" className="hover:text-white transition-colors">AI Chat</a>
          <a href="mailto:hello@bluxedigital.com" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} B. Luxe Digital</p>
      </div>
    </footer>
  )
}

// ============================================================
// App
// ============================================================
export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Nav />
      <Hero />
      <Welcome />
      <Products />
      <WhyBLuxe />
      <About />
      <Chat />
      <FinalCTA />
      <Footer />
    </div>
  )
}
