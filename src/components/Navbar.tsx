import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Sobre', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experiência', href: '/#experience' },
  { label: 'Projetos', href: '/projects' },
  { label: 'Contato', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault()
        const id = href.slice(2)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--yellow)', letterSpacing: '-0.04em' }}>
        VD.
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="hidden-mobile">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              onClick={(e) => handleAnchor(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                transition: 'color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', padding: '0.5rem' }}
        className="show-mobile"
      >
        <div style={{ width: 24, height: 2, background: 'var(--text)', marginBottom: 5, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <div style={{ width: 24, height: 2, background: 'var(--text)', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
        <div style={{ width: 24, height: 2, background: 'var(--text)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => { handleAnchor(e as React.MouseEvent<HTMLAnchorElement>, link.href); setMenuOpen(false) }}
                style={{ fontSize: '1.1rem', color: 'var(--text)', fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}
