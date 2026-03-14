// ============================================================
// Products page — add/edit products here
// Update gumroadId for each product before going live
// ============================================================
import { useState } from "react"
import ScrollReveal from "../components/ScrollReveal"
import ProductCoverMockup from "../components/ProductCoverMockup"
import ProductModal from "../components/ProductModal"

// ── Audience identities for "Are You...?" section ────────────
const audiences = [
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    icon: "◈",
    description: "You're building something from vision. You need tools that move as fast as your calling.",
  },
  {
    id: "organization",
    label: "Organization",
    icon: "◈",
    description: "Scale impact, streamline operations, and lead with strategy — not survival mode.",
  },
  {
    id: "nonprofit",
    label: "Non-Profit",
    icon: "◈",
    description: "You have a mission. We help you fund it, articulate it, and grow it with precision.",
  },
  {
    id: "investor",
    label: "Investor",
    icon: "◈",
    description: "Find the signal in the noise. The founders you're looking for are built different.",
  },
]

// ── Vision in the Valley Ecosystem ──────────────────────────
const ecosystemProducts = [
  {
    id: "vitv-2026-core-framework",
    name: "VITV 2026 Core Framework eBook",
    shortTitle: "VITV 2026",
    type: "ebook",
    accent: "purple",
    tagline: "Foundational philosophies & the Excavation Method",
    description: "The foundational text of the Vision in the Valley ecosystem. Covers core philosophies and the Excavation Method to help you uncover and articulate your vision.",
    price: "$297",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "valley-seasons-assessment",
    name: "Valley Seasons Assessment",
    shortTitle: "Valley Seasons",
    type: "ebook",
    accent: "indigo",
    tagline: "Diagnostic checklist for terrain diagnosis",
    description: "A powerful diagnostic tool to identify exactly which season of your valley you're in—so you can respond strategically instead of reacting emotionally.",
    price: "$97",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "daily-manna-vision-planner",
    name: "The Daily Manna Vision Planner",
    shortTitle: "Daily Manna",
    type: "ebook",
    accent: "amber",
    tagline: "Replace anxiety with authority via the 24-Hour Pivot",
    description: "A daily planner built around the 24-Hour Pivot method to help you move from anxious striving to purposeful, faith-led action every single day.",
    price: "$147",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "vision-roadmap-skill-stacker",
    name: "Vision Roadmap & Skill Stacker",
    shortTitle: "Vision Roadmap",
    type: "ebook",
    accent: "rose",
    tagline: "Reframe chaotic experiences into high-paid skills using AI",
    description: "Uses AI mapping to help you reframe your chaotic experiences into high-paid, high-steward skills—turning your story into your strategy.",
    price: "$197",
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "high-stewardship-faith-strategy",
    name: "High-Stewardship Faith Strategy",
    shortTitle: "Faith Strategy",
    type: "ebook",
    accent: "stone",
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

// ── Strategic Suite ──────────────────────────────────────────
const strategicProducts = [
  {
    id: "doc-coauthor",
    name: "Doc CoAuthor",
    shortTitle: "Doc CoAuthor",
    type: "tool",
    accent: "purple",
    tagline: "From scattered thoughts to structured authority.",
    description: "AI-powered document co-creation that meets you where you are and produces work that represents where you're going.",
    gumroadId: "YOUR_SLUG_HERE",
    features: [
      "Text gathering & intelligent intake",
      "Semantic search & refinement",
      "Structure, formatting & flow",
      "Reader testing & clarity scoring",
      "Deep research integration",
    ],
  },
  {
    id: "campaign-hub",
    name: "Campaign Hub",
    shortTitle: "Campaign Hub",
    type: "tool",
    accent: "indigo",
    tagline: "One platform. Every pitch, proposal, and positioning asset.",
    description: "Built for founders, organizations, and leaders who need to move markets — not just audiences.",
    gumroadId: "YOUR_SLUG_HERE",
    features: [
      "Sales page generation",
      "Corporate proposal builder",
      "LinkedIn positioning system",
      "Crowdfunding + investor pitch decks",
      "Industry & anointing-based outreach templates",
    ],
  },
  {
    id: "equitai-for-business",
    name: "EquitAI for Business",
    shortTitle: "EquitAI",
    type: "tool",
    accent: "stone",
    tagline: "Agents, not prompts. Strategy, not shortcuts.",
    description: "The agentic AI training program built for small businesses ready to lead the next economy — not catch up to it.",
    gumroadId: "YOUR_SLUG_HERE",
    features: [
      "Agentic strategy + implementation",
      "Digital access training programs",
      "Built specifically for small businesses",
      "Agents-not-prompts framework",
      "Why this matters now — the facts",
      "Modernization + optimization roadmap",
      "What your customers actually care about",
      "The cost of doing nothing",
    ],
  },
]

// ── Individual Products ──────────────────────────────────────
const soloProducts = [
  {
    id: "powered-woman-ai-mastery",
    name: "The Powered Woman AI Mastery Course",
    shortTitle: "AI Mastery",
    type: "course",
    accent: "rose",
    tagline: "Harness AI as your strategic advantage.",
    description: "A comprehensive course designed to help purpose-driven women confidently use AI tools to grow their brand, streamline their business, and amplify their impact.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "email-money-machine",
    name: "Email Money Machine",
    shortTitle: "Email Machine",
    type: "system",
    accent: "amber",
    tagline: "Turn your list into revenue.",
    description: "A complete system for building and monetizing your email list with purpose-driven sequences that convert.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "client-onboarding-pro",
    name: "Client Onboarding Pro",
    shortTitle: "Onboarding Pro",
    type: "system",
    accent: "purple",
    tagline: "First impressions that close deals.",
    description: "Streamline your client experience with done-for-you templates, workflows, and onboarding systems.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "content-engine",
    name: "Content Engine",
    shortTitle: "Content Engine",
    type: "system",
    accent: "indigo",
    tagline: "Create less. Show up more.",
    description: "A strategic content planning system that keeps your brand visible without the burnout.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "grant-writers-edge",
    name: "Grant Writer's Edge",
    shortTitle: "Grant Writer's Edge",
    type: "system",
    accent: "stone",
    tagline: "Fund your vision.",
    description: "The go-to guide for writing winning grant proposals—research, frameworks, and templates included.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
  {
    id: "brand-voice-architect",
    name: "Brand Voice Architect",
    shortTitle: "Brand Voice",
    type: "system",
    accent: "rose",
    tagline: "Say it. Own it. Be remembered.",
    description: "Define your brand's voice, tone, and messaging so every word you write sounds unmistakably you.",
    price: null,
    gumroadId: "YOUR_SLUG_HERE",
  },
]

// ── Card Components ─────────────────────────────────────────

function AudienceCard({ audience }) {
  return (
    <div className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 cursor-default">
      <p className="text-purple-300 text-2xl mb-3">{audience.icon}</p>
      <h3 className="text-white text-lg font-bold mb-2">{audience.label}</h3>
      <p className="text-purple-200 text-sm leading-relaxed">{audience.description}</p>
    </div>
  )
}

function EcosystemCard({ product, onOpen }) {
  return (
    <div
      onClick={() => onOpen(product)}
      className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <ProductCoverMockup type={product.type} title={product.shortTitle} accent={product.accent} size="sm" id={product.id} />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-purple-500 font-medium tracking-wide uppercase mb-1">{product.tagline}</p>
          <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-stone-900">{product.price}</span>
          <a
            href={`https://gumroad.com/l/${product.gumroadId}`}
            data-gumroad-overlay-checkout="true"
            onClick={(e) => e.stopPropagation()}
            className="text-center bg-purple-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            Get It Now
          </a>
        </div>
      </div>
    </div>
  )
}

function StrategicCard({ product, onOpen }) {
  return (
    <div
      onClick={() => onOpen(product)}
      className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <ProductCoverMockup type={product.type} title={product.shortTitle} accent={product.accent} size="sm" id={product.id} />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <p className="text-xs text-purple-500 font-medium tracking-wide uppercase mb-1">{product.tagline}</p>
          <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">{product.description}</p>
        </div>
        <ul className="flex flex-col gap-1.5 mt-1">
          {product.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
              <span className="text-purple-400 mt-0.5 shrink-0">—</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3">
          <a
            href={`https://gumroad.com/l/${product.gumroadId}`}
            data-gumroad-overlay-checkout="true"
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center bg-stone-900 text-white text-sm px-5 py-3 rounded-xl hover:bg-stone-800 transition-colors font-medium"
          >
            Get Access
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, onOpen }) {
  return (
    <div
      onClick={() => onOpen(product)}
      className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <ProductCoverMockup type={product.type} title={product.shortTitle} accent={product.accent} size="sm" id={product.id} />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <p className="text-xs text-purple-500 font-medium tracking-wide uppercase mb-1">{product.tagline}</p>
          <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="mt-auto pt-2">
          <a
            href={`https://gumroad.com/l/${product.gumroadId}`}
            data-gumroad-overlay-checkout="true"
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center bg-purple-600 text-white text-sm px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            Get It Now
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────

export default function Products() {
  const [modalProduct, setModalProduct] = useState(null)

  return (
    <div className="pt-28 pb-20 px-6 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Collection</p>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Tools Built for Your Journey</h1>
            <p className="text-stone-500 max-w-xl mx-auto">
              Everything you need to move from scattered to strategic — designed with intention, built for action.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Are You...? ── */}
        <ScrollReveal>
          <div className="bg-stone-900 rounded-3xl px-8 py-12 mb-16">
            <div className="text-center mb-10">
              <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">Who This Is For</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Are You…?</h2>
              <p className="text-stone-400 max-w-lg mx-auto text-sm leading-relaxed">
                B. Luxe Digital serves leaders across sectors. If you're building, funding, serving, or scaling — there's a tool in this collection for exactly where you are.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {audiences.map(a => <AudienceCard key={a.id} audience={a} />)}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Vision in the Valley Ecosystem ── */}
        <div className="mb-16">
          <ScrollReveal>
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
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ecosystemProducts.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <EcosystemCard product={p} onOpen={setModalProduct} />
              </ScrollReveal>
            ))}
          </div>

          {/* Bundle CTA */}
          <ScrollReveal>
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
                data-gumroad-overlay-checkout="true"
                className="shrink-0 bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm"
              >
                Get the Bundle — $297
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Strategic Suite ── */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-stone-200" />
              <p className="text-stone-700 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">
                Strategic Suite
              </p>
              <div className="h-px flex-1 bg-stone-200" />
            </div>
            <p className="text-center text-stone-500 text-sm mb-8">
              Advanced tools for entrepreneurs, organizations, non-profits, and investors operating at the next level.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicProducts.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <StrategicCard product={p} onOpen={setModalProduct} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── Individual Products ── */}
        <div>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-stone-200" />
              <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">
                More Resources
              </p>
              <div className="h-px flex-1 bg-stone-200" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {soloProducts.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <ProductCard product={p} onOpen={setModalProduct} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
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
        </ScrollReveal>

      </div>

      {/* Modal */}
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  )
}
