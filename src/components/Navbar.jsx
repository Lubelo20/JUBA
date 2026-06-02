import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-white/97 backdrop-blur-md border-b border-navy/8 px-[5%] flex items-center justify-between h-[72px] ${
        scrolled ? 'shadow-[0_2px_24px_rgba(11,46,109,0.10)]' : ''
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex flex-col leading-none">
        <span className="text-[26px] font-extrabold text-navy tracking-[4px]">JUBA</span>
        <span className="text-[8px] font-semibold text-gold tracking-[3px] border-t border-b border-gold py-0.5 mt-0.5 uppercase">
          Consultants
        </span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-9 list-none items-center">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-navy pb-1 border-b-2 ${
                  isActive
                    ? 'text-navy border-gold'
                    : 'text-slate-500 border-transparent hover:border-gold/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <Link
            to="/contact"
            className="bg-navy text-white text-[13px] font-bold px-5 py-2.5 rounded tracking-wide hover:bg-gold hover:text-navy transition-colors duration-200"
          >
            Get In Touch
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-navy/10 shadow-lg md:hidden px-[5%] py-6 flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-[15px] font-medium hover:text-navy ${
                  isActive ? 'text-navy font-semibold' : 'text-slate-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-navy w-fit">
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  )
}
