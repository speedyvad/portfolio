import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink, DEFAULT_MESSAGE } from '../config/contact'

/**
 * Botão flutuante global. Na home só aparece depois que o usuário passa do hero;
 * nas outras páginas aparece imediatamente. Fica escondido enquanto o CTA final
 * ou o rodapé estiverem visíveis (eles já têm WhatsApp) e em toda a rota
 * /orcamento — lá a barra fixa de estimativa (mobile) e o CTA de resultado já
 * cobrem esse papel, e o botão flutuante entraria em conflito com a barra.
 */
export default function WhatsAppFloat() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isOrcamento = pathname.startsWith('/orcamento')
  const [pastHero, setPastHero] = useState(
    () => window.scrollY > window.innerHeight * 0.7
  )
  const [obstructed, setObstructed] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isHome) return

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Some enquanto o rodapé (todas as páginas) ou o CTA final (só a home) estiverem visíveis.
  useEffect(() => {
    const targets = [document.querySelector('footer'), document.getElementById('cta-final')].filter(
      (el): el is HTMLElement => el !== null
    )
    // Sem rodapé/CTA final para observar (ex.: página ainda montando): nada obstrui.
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => setObstructed(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const visible = !isOrcamento && !obstructed && (!isHome || pastHero)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            right: 'max(20px, env(safe-area-inset-right))',
            bottom: 'max(20px, env(safe-area-inset-bottom))',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="tooltip"
                className="wa-tooltip fs-small"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                style={{
                  background: 'var(--sea)',
                  color: '#fff',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--r-pill)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  fontWeight: 500,
                }}
              >
                Fale com o estúdio
              </motion.span>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink(DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale com o estúdio no WhatsApp"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--whatsapp)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(14,44,63,0.22)',
              transition: 'transform 0.2s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            <WhatsAppIcon size={30} />
          </a>

          <style>{`
            @media (max-width: 860px) { .wa-tooltip { display: none; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
