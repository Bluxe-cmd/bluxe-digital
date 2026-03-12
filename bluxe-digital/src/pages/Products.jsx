// ============================================================
// Products page — add/edit products here
// Update gumroadId for each product before going live
// ============================================================

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
  // Add more products below — copy the block above and fill in the details
]

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

export default function Products() {
  return (
    <section className="pt-28 pb-20 px-6 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Collection</p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Tools Built for Your Journey</h1>
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
