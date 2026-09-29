import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Wordmark from './Wordmark'

const NAV_LINKS = [
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Raio-X grátis', to: '/raio-x' },
  { label: 'Sobre', to: '/sobre' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu sempre que a rota muda
  const [lastKey, setLastKey] = useState(location.key)
  if (lastKey !== location.key) {
    setLastKey(location.key)
    setMenuOpen(false)
  }

  // Trava o scroll do body enquanto o menu de tela cheia está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goToAnchor = (e: React.MouseEvent, to: string) => {
    if (!to.startsWith('/#')) return
    e.preventDefault()
    const id = to.slice(2)
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 120,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          background: 'var(--white)',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
          transition: 'border-color 0.25s ease',
        }}
      >
        <nav
          className="container-x"
          aria-label="Principal"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <Link to="/" aria-label="Dourado Studio — início">
            <Wordmark />
          </Link>

          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={(e) => goToAnchor(e, link.to)}
                    className="nav-link"
                    style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--sea)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              className="btn btn-primary"
              to="/orcamento"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.95rem' }}
            >
              Simular orçamento
            </Link>
          </div>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            style={{ display: 'none', padding: '0.5rem', cursor: 'pointer' }}
          >
            <span
              style={{
                display: 'block',
                width: 26,
                height: 2,
                background: 'var(--sea)',
                marginBottom: 6,
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 26,
                height: 2,
                background: 'var(--sea)',
                marginBottom: 6,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 26,
                height: 2,
                background: 'var(--sea)',
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              background: 'var(--white)',
              paddingTop: 72,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              className="container-x"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingTop: '3rem' }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={(e) => goToAnchor(e, link.to)}
                    className="display"
                    style={{ fontSize: 'clamp(2rem, 9vw, 3rem)', color: 'var(--sea)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link
                  className="btn btn-primary"
                  to="/orcamento"
                  style={{ marginTop: '1.5rem', display: 'inline-flex' }}
                >
                  Simular orçamento
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link { position: relative; transition: color 0.2s ease; }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
        }
      `}</style>
    </>
  )
}
