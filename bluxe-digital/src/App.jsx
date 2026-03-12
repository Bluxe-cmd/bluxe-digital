import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Chat from './pages/Chat'

// ============================================================
// Nav — shared across all pages
// ============================================================
function Nav() {
  const [open, setOpen] = useState(false)

  const links = [
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/chat", label: "AI Chat" },
  ]

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-semibold text-lg tracking-tight text-stone-900">
          B. <span className="text-purple-600">Luxe</span> Digital
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-medium"
                  : "text-stone-500 hover:text-purple-600 transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/products"
            className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Shop Now
          </NavLink>
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className="hover:text-purple-600">
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="bg-purple-600 text-white text-center px-5 py-2 rounded-full font-medium"
          >
            Shop Now
          </NavLink>
        </div>
      )}
    </nav>
  )
}

// ============================================================
// Footer — shared across all pages
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
          <NavLink to="/products" className="hover:text-white transition-colors">Products</NavLink>
          <NavLink to="/about" className="hover:text-white transition-colors">About</NavLink>
          <NavLink to="/chat" className="hover:text-white transition-colors">AI Chat</NavLink>
          <a href="mailto:hello@bluxedigital.com" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} B. Luxe Digital</p>
      </div>
    </footer>
  )
}

// ============================================================
// App — add new pages by adding a <Route> below
// ============================================================
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans antialiased flex flex-col">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={<Chat />} />
            {/* Add new pages here: <Route path="/testimonials" element={<Testimonials />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
