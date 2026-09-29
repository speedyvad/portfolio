import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import MaskedLines from './MaskedLines'
import WhatsAppIcon from './WhatsAppIcon'
import { heroSlides, HERO_INTERVAL } from '../data/hero'
import { whatsappLink } from '../config/contact'

/** Sobreposição: 85% no canto inferior esquerdo, 20% no superior direito. */
const OVERLAY =
  'linear-gradient(to top right, rgba(14,44,63,0.85) 0%, rgba(14,44,63,0.62) 45%, rgba(14,44,63,0.2) 100%)'

function SlideImage({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()

  if (failed) {
    // Sem foto: gradiente profundo do mar, que mantém o texto legível
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 100% at 15% 100%, #123C55 0%, #0E2C3F 55%, #08202F 100%)',
        }}
      />
    )
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      initial={{ scale: 1 }}
      animate={{ scale: reduced ? 1 : 1.06 }}
      transition={{ duration: HERO_INTERVAL / 1000, ease: 'linear' }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  )
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const elapsedRef = useRef(0)
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const touchStartX = useRef<number | null>(null)
  const reduced = useReducedMotion()

  const count = heroSlides.length
  const slide = heroSlides[index]

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  const goTo = useCallback((next: number) => {
    elapsedRef.current = 0
    setIndex(((next % count) + count) % count)
  }, [count])

  // Pausa quando a aba não está visível
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Relógio único: avança o slide e desenha o preenchimento do indicador
  useEffect(() => {
    if (reduced) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now

      if (!pausedRef.current) {
        elapsedRef.current += dt
        if (elapsedRef.current >= HERO_INTERVAL) {
          elapsedRef.current = 0
          setIndex((i) => (i + 1) % count)
        }
      }

      const progress = Math.min(elapsedRef.current / HERO_INTERVAL, 1)
      barRefs.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${i === index ? progress : 0})`
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [count, index, reduced])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(index - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + 1)
    }
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="O que a Dourado Studio resolve"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1))
        touchStartX.current = null
      }}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--sea)' }}
    >
      {/* Imagens em crossfade */}
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SlideImage src={slide.image} alt={slide.alt} priority={index === 0} />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
      </div>

      {/* Conteúdo */}
      <div
        className="container-x hero-content"
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        <div aria-live="polite" aria-atomic="true" style={{ maxWidth: 'min(100%, 60rem)' }}>
          <p className="fs-small" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem' }}>
            {index + 1} de {count}
          </p>

          <MaskedLines
            as="h1"
            text={slide.title}
            replayKey={index}
            style={{
              fontSize: 'clamp(1.9rem, 5.2vw, 4.25rem)',
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          />

          <motion.p
            key={`text-${index}`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.35, ease: 'easeOut' }}
            className="fs-lead measure"
            style={{ color: 'rgba(255,255,255,0.88)', marginBottom: '2.25rem' }}
          >
            {slide.text}
          </motion.p>

          <motion.div
            key={`cta-${index}`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.45, ease: 'easeOut' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}
          >
            <a
              className="btn btn-primary"
              href={whatsappLink(slide.message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} color="var(--sea)" />
              {slide.cta}
            </a>
            <Link className="btn btn-on-sea" to="/projetos">
              Ver projetos
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Indicador (a linha do horizonte) e setas, na mesma linha */}
      <div
        className="container-x hero-bottom-row"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '2rem',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para o slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              style={{
                flex: 1,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: 3,
                  background: 'rgba(255,255,255,0.32)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <span
                  ref={(el) => {
                    barRefs.current[i] = el
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--gold)',
                    transformOrigin: 'left',
                    transform: `scaleX(${reduced && i === index ? 1 : 0})`,
                    borderRadius: 2,
                  }}
                />
              </span>
            </button>
          ))}
        </div>

        {/* Setas */}
        <div className="hero-arrows">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Slide anterior"
            className="hero-arrow"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próximo slide"
            className="hero-arrow"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        .hero {
          height: calc(88svh - 72px);
          min-height: 520px;
          display: flex;
          align-items: center;
        }
        .hero-content { padding-block: 4rem 6rem; }
        .hero-arrows {
          display: none;
          flex-shrink: 0;
          gap: 0.5rem;
        }
        .hero-arrow {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.45);
          color: #fff;
          font-size: 1.25rem;
          line-height: 1;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .hero-arrow:hover { background: rgba(255,255,255,0.16); }
        @media (min-width: 768px) {
          .hero { height: calc(100svh - 72px); }
          .hero-arrows { display: flex; }
        }
      `}</style>
    </section>
  )
}
