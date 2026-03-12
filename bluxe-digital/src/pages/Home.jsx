// ============================================================
// Home page — edit hero, welcome, and final CTA here
// ============================================================

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <FinalCTA />
    </>
  )
}

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
          href="/products"
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-colors text-base"
        >
          Explore the Collection
        </a>
        <a
          href="/about"
          className="border border-stone-200 text-stone-700 px-8 py-4 rounded-full font-medium hover:border-purple-300 hover:text-purple-600 transition-colors text-base"
        >
          Meet Bianca
        </a>
      </div>
    </section>
  )
}

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
          <a href="/products" className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors">
            Shop Now
          </a>
          <a href="/chat" className="border border-purple-400 text-white px-8 py-4 rounded-full font-medium hover:border-white transition-colors">
            Talk to Our AI Assistant
          </a>
        </div>
      </div>
    </section>
  )
}
