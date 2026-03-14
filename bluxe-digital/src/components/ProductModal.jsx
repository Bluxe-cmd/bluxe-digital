import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import ProductCoverMockup, { prompts, fallbackPrompt } from "./ProductCoverMockup"

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
      style={{
        background: copied ? "#16a34a" : "#f3e8ff",
        color: copied ? "#fff" : "#7e22ce",
      }}
    >
      {copied ? "Copied" : label}
    </button>
  )
}

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const prompt = prompts[product.id] || fallbackPrompt

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-modal-backdrop"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="text-stone-500 text-lg leading-none">&times;</span>
        </button>

        {/* Cover mockup */}
        <div className="p-6 pb-0">
          <div className="max-w-sm mx-auto">
            <ProductCoverMockup
              type={product.type || "ebook"}
              title={product.shortTitle || product.name}
              accent={product.accent || "purple"}
              size="lg"
              id={product.id}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-5">
          {product.tagline && (
            <p className="text-purple-500 text-xs font-medium tracking-wide uppercase mb-1.5">
              {product.tagline}
            </p>
          )}
          <h2 className="text-2xl font-bold text-stone-900 mb-3">{product.name}</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-4">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <ul className="flex flex-col gap-1.5 mb-5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-purple-400 mt-0.5 shrink-0">&mdash;</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* GenAI Ad Prompts */}
          <div className="mt-4 mb-5 border border-purple-100 rounded-xl overflow-hidden">
            <div className="bg-purple-50 px-4 py-3 flex items-center gap-2">
              <span className="text-purple-600 text-sm">&#9998;</span>
              <p className="text-purple-700 text-xs font-semibold uppercase tracking-wider">GenAI Image Prompts</p>
              <span className="ml-auto text-purple-400 text-[10px]">Meta / TikTok optimized</span>
            </div>

            {/* Square (1:1) — Feed */}
            <div className="px-4 py-3 border-b border-purple-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-stone-700 text-xs font-semibold">Feed — 1080 x 1080 (1:1)</p>
                <CopyButton text={prompt.square} label="Copy" />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">{prompt.square}</p>
            </div>

            {/* Story (9:16) — Story/Reel/TikTok */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-stone-700 text-xs font-semibold">Story / Reel / TikTok — 1080 x 1920 (9:16)</p>
                <CopyButton text={prompt.story} label="Copy" />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">{prompt.story}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            {product.price && (
              <span className="text-2xl font-bold text-stone-900">{product.price}</span>
            )}
            <a
              href={`https://gumroad.com/l/${product.gumroadId}`}
              data-gumroad-overlay-checkout="true"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto bg-purple-600 text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Get It Now
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
