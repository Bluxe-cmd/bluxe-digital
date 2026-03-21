// ============================================================
// About page — edit founder bio and brand pillars here
// ============================================================
import ScrollReveal from "../components/ScrollReveal"

// ── Skills & Expertise ───────────────────────────────────────
const skillCategories = [
  {
    icon: "◈",
    title: "Business Strategy",
    skills: ["Vision Mapping", "Strategic Planning", "Goal Architecture", "Business Development", "Revenue Systems"],
  },
  {
    icon: "✦",
    title: "Creative & Brand",
    skills: ["Digital Product Design", "Brand Identity", "Content Creation", "Visual Storytelling", "Copywriting"],
  },
  {
    icon: "🙏",
    title: "Leadership & Coaching",
    skills: ["Faith-Led Leadership", "Mindset Coaching", "Mentorship", "Community Building", "Purpose Alignment"],
  },
  {
    icon: "⚡",
    title: "Technology & Tools",
    skills: ["AI Integration", "Digital Marketing", "Workflow Design", "Product Development", "Automation"],
  },
]

const reasons = [
  { icon: "✦", title: "Intentionally Designed", body: "Beautiful, functional, and easy to use—because you deserve tools that actually work for you." },
  { icon: "🎯", title: "Purpose-Driven", body: "Built to help you move forward with clarity, not just fill your digital downloads folder." },
  { icon: "🙏", title: "Faith-Aligned", body: "Rooted in the belief that your vision matters and you were created on purpose, for a purpose." },
  { icon: "👑", title: "Made for You", body: "Created with women of color and purpose-led entrepreneurs in mind—finally, tools that get your journey." },
]

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Founder */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Founder</p>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Hey, I'm Bianca.</h1>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <p className="text-stone-500 text-sm font-medium mb-6">Entrepreneur · Strategist · Woman of Faith</p>
            <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
              <p>And someone who knows what it's like to have a big vision with no clear roadmap.</p>
              <p>
                I created B. Luxe Digital because I needed it first. I needed tools that weren't one-size-fits-all. Resources that understood the unique journey of building something meaningful while navigating life, identity, and purpose.
              </p>
              <p className="text-stone-900 font-medium">
                Everything we create here is rooted in three things:{" "}
                <span className="text-purple-600">faith</span>,{" "}
                <span className="text-purple-600">clarity</span>, and{" "}
                <span className="text-purple-600">action</span>.
              </p>
              <p>Because your vision is too important to stay stuck in your head.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-3">The Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Skills That Drive the Work</h2>
              <p className="text-stone-500 max-w-2xl mx-auto">
                Years of lived experience, intentional study, and faith-led practice—distilled into the tools and guidance we bring to every product.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <ScrollReveal key={category.title} delay={i * 80}>
                <div className="bg-stone-50 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                    <h3 className="text-lg font-bold text-stone-900">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span
                        key={skill}
                        className="bg-white border border-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why B. Luxe */}
      <section className="py-20 px-6 bg-stone-50">
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
    </div>
  )
}
