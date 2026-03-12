import { useState } from 'react'

// ============================================================
// STEP 1: Replace this URL with your Cloudflare Worker URL
// Example: "https://bluxe-proxy.yourname.workers.dev"
// ============================================================
const WORKER_URL = "YOUR_CLOUDFLARE_WORKER_URL_HERE"

// ============================================================
// STEP 2: Update each gumroadId with your actual Gumroad slug
// Find it at: gumroad.com/l/YOUR-SLUG
// ============================================================
const products = [
  {
    id: "powered-woman",
    name: "The Powered Woman Playbook",
    description: "Your go-to guide for showing up as your most powerful, purposeful self.",
    price: "$27",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "vision-planner",
    name: "Vision & Goals Planner",
    description: "A structured planner to map your vision, set aligned goals, and stay on track.",
    price: "$17",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "brand-voice-kit",
    name: "Brand Voice Kit",
    description: "Define your brand's tone, messaging, and personality with clarity.",
    price: "$37",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "campaign-hub-pack",
    name: "Campaign Hub Pack",
    description: "Everything you need to plan and launch a high-impact marketing campaign.",
    price: "$47",
    gumroadId: "YOUR_SLUG_HERE",
  },
]

// ============================================================
// AI Chat — powered by your Cloudflare Worker proxy
// ============================================================
function useAIChat() {
  const [messages, setMessages] = useState([])
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
          messages: updated,
        }),
      })
      const data = await res.json()
      const reply = data?.content?.[0]?.text ?? "Sorry, I could not get a response."
      setMessages([...updated, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages([...updated, { role: "assistant", content: "Error connecting to AI. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}

// ============================================================
// Components
// ============================================================
function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-900">B. Luxe Digital</div>
      <nav className="hidden md:flex gap-6 text-sm text-gray-600">
        <a href="#products" className="hover:text-gray-900">Products</a>
        <a href="#chat" className="hover:text-gray-900">AI Assistant</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-white px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Built on Faith.<br />Implemented with Purpose.
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
        Digital products and AI tools designed for purpose-driven women ready to build and grow.
      </p>
      <a
        href="#products"
        className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
      >
        Shop Products
      </a>
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-purple-600 font-bold text-lg">{product.price}</span>
        <a
          href={`https://gumroad.com/l/${product.gumroadId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Buy Now
        </a>
      </div>
    </div>
  )
}

function Products() {
  return (
    <section id="products" className="px-6 py-16 max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Digital Products</h2>
      <p className="text-gray-500 text-center mb-10">Tools to help you show up, grow, and lead.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function AIChat() {
  const { messages, loading, sendMessage } = useAIChat()
  const [input, setInput] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    sendMessage(input.trim())
    setInput("")
  }

  return (
    <section id="chat" className="bg-gray-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">AI Assistant</h2>
        <p className="text-gray-500 text-center mb-8">Ask anything about building your brand or business.</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-8">Start a conversation below...</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-purple-600 text-white self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 text-gray-400 text-sm self-start px-4 py-2 rounded-2xl">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-700 disabled:opacity-40 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
      <p>B. Luxe Digital · Built on Faith · Implemented with Purpose</p>
    </footer>
  )
}

// ============================================================
// Root App
// ============================================================
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
      <Products />
      <AIChat />
      <Footer />
    </div>
  )
}
