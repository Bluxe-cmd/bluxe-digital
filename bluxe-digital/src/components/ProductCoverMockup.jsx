// ============================================================
// Product Cover — GenAI prompt-ready placeholders
// Each product renders a styled cover with its AI image prompt
// accessible via hover/click for copy-paste into any GenAI tool
// ============================================================

const accentMap = {
  purple: { bg: "bg-purple-600", bgLight: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-700 to-purple-500" },
  stone: { bg: "bg-stone-700", bgLight: "bg-stone-100", text: "text-stone-600", border: "border-stone-300", gradient: "from-stone-800 to-stone-600" },
  amber: { bg: "bg-amber-600", bgLight: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", gradient: "from-amber-700 to-amber-500" },
  rose: { bg: "bg-rose-600", bgLight: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", gradient: "from-rose-700 to-rose-500" },
  indigo: { bg: "bg-indigo-600", bgLight: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-700 to-indigo-500" },
}

// ── GenAI prompts per product type, optimized for Meta/TikTok ad creatives ──

const prompts = {
  // ECOSYSTEM — ebook products
  "vitv-2026-core-framework": {
    square: `Elegant flat-lay photograph, top-down angle, premium tablet displaying a sleek purple-and-white digital ebook cover titled "VITV 2026", resting on a cream linen desk surface. Beside it: a gold pen, dried lavender sprig, and a small open journal with handwritten notes. Soft natural window light from the left. Warm neutral tones with purple accents. 1080x1080, clean negative space on right side for text overlay. No text on image. Photorealistic, editorial style.`,
    story: `Vertical lifestyle shot, a confident Black woman entrepreneur in a minimalist home office, sitting at a white oak desk, reviewing a digital framework document on her MacBook. Soft purple ambient glow from the screen. Clean white walls, one floating shelf with a small plant and candle. She's wearing a cream knit top, natural hair styled up. Shot from slightly above, golden hour light through sheer curtains. 1080x1920. Aspirational, warm, editorial. No text.`,
  },
  "valley-seasons-assessment": {
    square: `Overhead flat-lay on a warm cream marble surface. A premium printed assessment worksheet with clean purple typography, next to a cup of matcha in a ceramic mug, reading glasses, and a fountain pen. Soft morning light, shallow depth of field on the edges. Muted indigo and cream palette. 1080x1080. Space for text overlay on the top third. No text on image. Magazine editorial aesthetic.`,
    story: `Close-up of hands holding a beautifully designed diagnostic checklist on thick cream card stock, purple section headers visible. Background is a blurred home office with soft indigo and neutral tones. The person's nails are manicured, wearing a gold ring. Shallow depth of field. Warm, intimate, professional. 1080x1920. No text on image.`,
  },
  "daily-manna-vision-planner": {
    square: `Styled desk scene, warm amber and cream palette. An open daily planner with clean layout and amber accent tabs, next to a small Bible, a white ceramic coffee cup, and a gold bookmark. Morning sunlight streaming across the desk. Shot from 45-degree angle. Cozy, intentional, faith-forward aesthetic. 1080x1080, text space on left third. No text on image. Lifestyle product photography.`,
    story: `A woman's hand writing in a beautiful daily planner at sunrise, amber-gold light flooding the page. The planner has clean sections with warm amber headers. A candle burns softly in the background, out of focus. Cream and gold tones. Vertical composition, the planner fills the lower two-thirds. 1080x1920. Warm, devotional, productive energy. No text.`,
  },
  "vision-roadmap-skill-stacker": {
    square: `Modern workspace flat-lay, rose and cream palette. A tablet displaying a sleek skill-mapping dashboard with rose-colored data visualizations, next to a notebook with a hand-drawn mind map, colored pencils in rose and blush tones, and a small succulent. Clean white desk. Overhead shot. 1080x1080. Space for overlay text at bottom. No text on image. Tech-meets-creative aesthetic.`,
    story: `Split composition — left side shows a messy collection of sticky notes and scattered ideas, right side shows the same concepts organized into a clean, beautiful rose-tinted digital roadmap on screen. Visual transformation metaphor. Warm lighting, shallow depth of field. 1080x1920. No text. Aspirational before/after energy.`,
  },
  "high-stewardship-faith-strategy": {
    square: `Premium leather-bound journal aesthetic. A sophisticated strategy document on thick cream paper with stone-gray typography and subtle gold foil accents, resting on a dark walnut desk. A brass desk lamp, a small leather-bound Bible, and a pair of tortoiseshell glasses nearby. Rich, warm, executive tone. 1080x1080. No text on image. Timeless luxury editorial.`,
    story: `A woman in a tailored blazer sitting at a polished conference table, reviewing strategy documents. She looks focused and powerful. Warm neutral tones — stone gray, cream, and touches of gold. Large windows behind her with soft city light. Professional yet faith-grounded energy. 1080x1920. No text. Executive editorial photography.`,
  },
  // STRATEGIC SUITE — tool products
  "doc-coauthor": {
    square: `Clean split-screen composition. Left half: scattered handwritten sticky notes, messy notebook pages, loose papers. Right half: a sleek laptop displaying a beautifully formatted professional document with purple section headers and clean typography. The transformation from chaos to clarity. Purple and white palette with cream background. 1080x1080. No text on image. Conceptual product photography.`,
    story: `Over-the-shoulder view of a professional woman at her desk, her laptop showing a beautifully structured document being co-created in real-time — visible cursor, clean formatting, purple accent headers. She's smiling slightly, leaning back confidently. Modern minimalist office, soft purple ambient light from a desk lamp. Natural hair, cream blazer. 1080x1920. No text. Empowerment-meets-tech aesthetic.`,
  },
  "campaign-hub": {
    square: `Bird's-eye view of a strategy table covered with marketing assets: a pitch deck printout with indigo cover, a laptop showing a sales page, printed email sequences, a mood board with brand photography, and a tablet displaying social media analytics. Organized creative chaos. Indigo, cream, and white palette. 1080x1080. Space for text overlay in center. No text on image. Campaign war room aesthetic.`,
    story: `Dynamic shot of a woman CEO presenting a pitch deck in a modern meeting room, large screen behind her showing a sleek indigo-and-white slide. She gestures confidently. Three people in the audience, backs to camera, out of focus. Clean, modern space with natural light. 1080x1920. No text. Power and persuasion energy.`,
  },
  "equitai-for-business": {
    square: `Minimalist tech aesthetic. A laptop on a clean desk displaying an AI workflow dashboard with connected nodes and data flow visualization in stone and green tones. Beside it: a small notebook with "AI Strategy" written on the cover, a modern pen, and a small potted plant. Clean white desk, natural light. 1080x1080. Space for text at top. No text on image. Modern business intelligence aesthetic.`,
    story: `A small business owner (Black woman, natural hair, casual-professional) working alongside AI — her laptop shows an agent interface while she reviews the output on printed pages, looking thoughtful and engaged. Warm, modern co-working space background with exposed brick and plants. Stone and green tones. 1080x1920. No text. Human-AI partnership aesthetic.`,
  },
  // SOLO PRODUCTS
  "powered-woman-ai-mastery": {
    square: `Empowering workspace scene. A confident woman's hands on a keyboard, laptop screen glowing with AI interface elements in rose-pink tones. Beside the laptop: a premium course workbook with clean design, wireless earbuds, and a small motivational card. Rose, cream, and white palette. Soft ring light reflection. 1080x1080. No text on image. Tech education meets feminine power.`,
    story: `A woman in a cozy home office, headphones on, taking notes while watching an AI course on her ultrawide monitor. The screen shows a sleek rose-tinted course interface. She's engaged, writing in a matching workbook. Warm lamp light, plants in the background. 1080x1920. No text. Learning-in-action aesthetic.`,
  },
  "email-money-machine": {
    square: `Creative flat-lay: a phone displaying email analytics with amber chart lines going up, next to a laptop showing a beautiful email template with amber accents. Gold coins or amber crystals scattered artfully. Clean cream background. Warm, prosperous energy. 1080x1080. No text on image. Revenue-focused product photography.`,
    story: `Close-up of a phone notification showing "New Sale: $497" with email app visible, amber and gold tones. Background is a blurred lifestyle scene — coffee shop or home office. Warm, golden light. The feeling of passive income arriving. 1080x1920. No text. Money-positive aesthetic.`,
  },
  "client-onboarding-pro": {
    square: `Organized workspace flat-lay: a tablet displaying a sleek client onboarding checklist with purple checkmarks, next to a branded welcome packet (cream folder with purple logo), a thank-you card, and a premium pen. All arranged symmetrically on white marble. 1080x1080. No text on image. Premium client experience aesthetic.`,
    story: `A happy client receiving a beautifully packaged digital welcome kit — she's at her desk unboxing or opening files on screen that look clean and professional. Purple accents throughout. Modern home office setting, warm natural light. Expression of delight and trust. 1080x1920. No text. First-impression excellence.`,
  },
  "content-engine": {
    square: `Creative command center: a large monitor displaying a content calendar in indigo and white, surrounded by a ring light, camera, microphone, and a notebook with content ideas. Clean, organized creative space. Indigo and cream palette. 1080x1080. No text on image. Creator-CEO workspace aesthetic.`,
    story: `A content creator sitting at an organized desk, scheduling posts on her laptop. Calendar view visible with color-coded content blocks in indigo tones. She looks calm and in control — no burnout energy. Plants, good lighting, minimal decor. 1080x1920. No text. Sustainable creation aesthetic.`,
  },
  "grant-writers-edge": {
    square: `Professional desk scene: a thick grant proposal document with stone-gray cover and gold embossed title, next to a laptop showing research data, a highlighter, and a stack of reference materials. Warm, serious, professional tone. Stone and gold palette. 1080x1080. No text on image. Grant professional aesthetic.`,
    story: `A woman reviewing a funded grant notification on her laptop, subtle expression of satisfaction and pride. Behind her, a wall with a framed mission statement and photos of community impact. Stone, cream, and gold tones. Professional nonprofit setting. 1080x1920. No text. Impact-through-funding energy.`,
  },
  "brand-voice-architect": {
    square: `Artful flat-lay: a beautifully designed brand voice document with rose and cream palette, surrounded by brand mood board elements — fabric swatches, color chips, typography samples, a small mirror, and dried flowers. Aesthetic, editorial, intentional. 1080x1080. No text on image. Brand identity aesthetic.`,
    story: `A woman at a design table, looking at her brand guide on screen while holding up printed materials that match perfectly — logos, color swatches, business cards. Rose and cream tones. Expression of pride in her brand. Creative studio setting. 1080x1920. No text. Brand ownership energy.`,
  },
}

// Fallback prompt for products not in the map
const fallbackPrompt = {
  square: `Elegant product flat-lay on cream linen surface. A premium digital product mockup on tablet screen with purple accent colors, surrounded by minimal desk accessories — gold pen, small plant, coffee cup. Soft natural light. 1080x1080. No text on image. Editorial product photography.`,
  story: `A confident Black woman entrepreneur using a digital product on her laptop in a modern, minimal workspace. Purple ambient accents, warm natural light, clean aesthetic. 1080x1920. No text on image. Aspirational lifestyle photography.`,
}

// CSS color values for inline styles (Tailwind classes don't work in transforms)
const colorValues = {
  purple: { front: "#7e22ce", side: "#6b21a8", shine: "rgba(168,85,247,0.25)", dark: "#581c87" },
  stone: { front: "#57534e", side: "#44403c", shine: "rgba(168,162,158,0.25)", dark: "#292524" },
  amber: { front: "#d97706", side: "#b45309", shine: "rgba(251,191,36,0.25)", dark: "#78350f" },
  rose: { front: "#e11d48", side: "#be123c", shine: "rgba(251,113,133,0.25)", dark: "#881337" },
  indigo: { front: "#4f46e5", side: "#4338ca", shine: "rgba(129,140,248,0.25)", dark: "#3730a3" },
}

export default function ProductCoverMockup({ type = "ebook", title = "", accent = "purple", size = "sm", id = "" }) {
  const c = accentMap[accent] || accentMap.purple
  const cv = colorValues[accent] || colorValues.purple
  const isLg = size === "lg"
  const prompt = prompts[id] || fallbackPrompt

  const typeLabel = type === "ebook" ? "Digital Asset" : type === "tool" ? "Strategic Tool" : type === "course" ? "Course" : "System"

  return (
    <div className="group relative flex items-center justify-center py-6 px-4" style={{ perspective: "800px" }}>
      {/* 3D Software Box */}
      <div
        className="relative transition-transform duration-500 group-hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-12deg) rotateX(2deg)",
          width: isLg ? "220px" : "160px",
          height: isLg ? "280px" : "200px",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center px-4"
          style={{
            background: `linear-gradient(135deg, ${cv.front} 0%, ${cv.dark} 100%)`,
            boxShadow: `4px 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${cv.shine}`,
            transform: "translateZ(12px)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Top shine */}
          <div
            className="absolute top-0 left-0 right-0 h-1/3"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="w-10 h-px bg-white/30 mx-auto mb-3" />
            <p className={`text-white/50 uppercase tracking-[0.2em] font-medium ${isLg ? "text-[10px] mb-2" : "text-[7px] mb-1.5"}`}>
              B. Luxe Digital
            </p>
            <h4 className={`text-white font-bold leading-tight ${isLg ? "text-lg" : "text-xs"}`}>
              {title}
            </h4>
            <div className="w-6 h-px bg-white/30 mx-auto mt-3 mb-4" />
            <div className="bg-white/15 rounded-full px-2.5 py-0.5 inline-block">
              <span className={`text-white/80 uppercase tracking-widest font-semibold ${isLg ? "text-[8px]" : "text-[6px]"}`}>
                {typeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right spine */}
        <div
          className="absolute top-0 rounded-r-lg overflow-hidden"
          style={{
            right: 0,
            width: isLg ? "24px" : "18px",
            height: "100%",
            background: `linear-gradient(90deg, ${cv.side} 0%, ${cv.dark} 100%)`,
            transform: `translateX(${isLg ? 12 : 9}px) rotateY(90deg)`,
            transformOrigin: "left center",
            boxShadow: "inset -2px 0 8px rgba(0,0,0,0.2)",
          }}
        >
          {/* Spine text */}
          <div className="h-full flex items-center justify-center">
            <p
              className="text-white/40 uppercase tracking-[0.15em] font-semibold whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: isLg ? "7px" : "5px",
              }}
            >
              {title}
            </p>
          </div>
        </div>

        {/* Bottom edge (thin) */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            height: isLg ? "24px" : "18px",
            background: `linear-gradient(180deg, ${cv.side} 0%, ${cv.dark} 100%)`,
            transform: `translateY(${isLg ? 12 : 9}px) rotateX(90deg)`,
            transformOrigin: "top center",
            borderRadius: "0 0 8px 8px",
          }}
        />

        {/* Shadow on surface */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2"
          style={{
            width: "85%",
            height: "12px",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(4px)",
            transform: "translateX(-50%) translateZ(-2px)",
          }}
        />
      </div>

      {/* Hover overlay with prompt preview */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 z-20">
        <p className={`text-white/60 uppercase tracking-widest ${isLg ? "text-[10px]" : "text-[7px]"} font-medium mb-2`}>
          GenAI Image Prompt
        </p>
        <p className={`text-white/90 text-center leading-relaxed ${isLg ? "text-xs" : "text-[8px]"} line-clamp-4`}>
          {prompt.square.slice(0, isLg ? 200 : 120)}...
        </p>
        <p className={`text-purple-300 mt-3 ${isLg ? "text-xs" : "text-[8px]"} font-medium`}>
          Click product for full prompts
        </p>
      </div>
    </div>
  )
}

// Export prompts for use in modal
export { prompts, fallbackPrompt }
