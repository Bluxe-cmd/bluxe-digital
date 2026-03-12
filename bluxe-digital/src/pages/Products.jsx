// ============================================================
// Products page — add/edit products here
// Update gumroadId for each product before going live
// ============================================================

// ── Vision in the Valley Ecosystem ──────────────────────────
const ecosystemProducts = [
  {
    id: "vitv-2026-core-framework",
    name: "VITV 2026 Core Framework eBook",
    tagline: "Foundational philosophies & the Excavation Method",
    description: "The foundational text of the Vision in the Valley ecosystem. Covers core philosophies and the Excavation Method to help you uncover and articulate your vision.",
    price: "$297",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "valley-seasons-assessment",
    name: "Valley Seasons Assessment",
    tagline: "Diagnostic checklist for terrain diagnosis",
    description: "A powerful diagnostic tool to identify exactly which season of your valley you're in—so you can respond strategically instead of reacting emotionally.",
    price: "$97",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "daily-manna-vision-planner",
    name: "The Daily Manna Vision Planner",
    tagline: "Replace anxiety with authority via the 24-Hour Pivot",
    description: "A daily planner built around the 24-Hour Pivot method to help you move from anxious striving to purposeful, faith-led action every single day.",
    price: "$147",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "vision-roadmap-skill-stacker",
    name: "Vision Roadmap & Skill Stacker",
    tagline: "Reframe chaotic experiences into high-paid skills using AI",
    description: "Uses AI mapping to help you reframe your chaotic experiences into high-paid, high-steward skills—turning your story into your strategy.",
    price: "$197",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "high-stewardship-faith-strategy",
    name: "High-Stewardship Faith Strategy",
    tagline: "Distinguish punishment/consequence; establish elite boundaries",
    description: "An advanced ecosystem guide for distinguishing discipline from punishment, and building elite boundaries that protect your vision and your peace.",
    price: "$262",
    gumroadId: "YOUR_SLUG_HERE",
  },
]

const ecosystemBundle = {
  totalValue: "$1,000",
  bundlePrice: "$297",
  gumroadId: "YOUR_BUNDLE_SLUG_HERE",
}

// ── Individual Products ──────────────────────────────────────
const soloProducts = [
  {
    id: "powered-woman-ai-mastery",
    name: "The Powered Woman AI Mastery Course",
    tagline: "Harness AI as your strategic advantage.",
    description: "A comprehensive course designed to help purpose-driven women confidently use AI tools to grow their brand, streamline their business, and amplify their impact.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "email-money-machine",
    name: "Email Money Machine",
    tagline: "Turn your list into revenue.",
    description: "A complete system for building and monetizing your email list with purpose-driven sequences that convert.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "client-onboarding-pro",
    name: "Client Onboarding Pro",
    tagline: "First impressions that close deals.",
    description: "Streamline your client experience with done-for-you templates, workflows, and onboarding systems.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "content-engine",
    name: "Content Engine",
    tagline: "Create less. Show up more.",
    description: "A strategic content planning system that keeps your brand visible without the burnout.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "grant-writers-edge",
    name: "Grant Writer's Edge",
    tagline: "Fund your vision.",
    description: "The go-to guide for writing winning grant proposals—research, frameworks, and templates included.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "brand-voice-architect",
    name: "Brand Voice Architect",
    tagline: "Say it. Own it. Be remembered.",
    description: "Define your brand's voice, tone, and messaging so every word you write sounds unmistakably you.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  // Add more products below — copy the block above and fill in the details
]

function EcosystemCard({ product }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
        <span className="text-purple-600 text-lg">✦</span>
      </div>
      <div>
        <p className="text-xs text-purple-500 font-medium tracking-wide uppercase mb-1">{product.tagline}</p>
        <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
        <p className="text-sm text-stone-500 mt-2 leading-relaxed">{product.description}</p>
      </div>
      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-2xl font-bold text-stone-900">{product.price}</span>
        <a
          href={`https://gumroad.com/l/${product.gumroadId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center bg-purple-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors font-medium"
        >
          Get It Now
        </a>
      </div>
    </div>
  )
}

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
    <div className="pt-28 pb-20 px-6 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-16">
          <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Collection</p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Tools Built for Your Journey</h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Everything you need to move from scattered to strategic—designed with intention, built for action.
          </p>
        </div>

        {/* ── Vision in the Valley Ecosystem ── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-stone-200" />
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">
              Vision in the Valley Ecosystem
            </p>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          <p className="text-center text-stone-500 text-sm mb-8">
            A unified vision framework bringing five transformative digital assets into harmony.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ecosystemProducts.map(p => <EcosystemCard key={p.id} product={p} />)}
          </div>

          {/* Bundle CTA */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-purple-200 text-sm font-medium tracking-wide uppercase mb-1">Complete Ecosystem Bundle</p>
              <h3 className="text-white text-2xl font-bold">Get All Five Assets</h3>
              <p className="text-purple-200 text-sm mt-1">
                Total value: <span className="line-through">{ecosystemBundle.totalValue}</span>
                &nbsp;— yours for just{" "}
                <span className="text-white font-bold text-lg">{ecosystemBundle.bundlePrice}</span>
              </p>
            </div>
            <a
              href={`https://gumroad.com/l/${ecosystemBundle.gumroadId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm"
            >
              Get the Bundle — $297
            </a>
          </div>
        </div>

        {/* ── Individual Products ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-stone-200" />
            <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">
              More Resources
            </p>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {soloProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        <div className="text-center mt-12">
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
    </div>
  )
}
