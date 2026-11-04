import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroCards, heroCylinderCopy } from '../../data/heroCards'

const COUNT = heroCards.length
const STEP = 360 / COUNT
/** Raio do cilindro em larguras de cartão, com uma folga entre os cartões. */
const RADIUS = (1 / (2 * Math.tan(Math.PI / COUNT))) * 1.06

/** Graus por segundo do giro automático (negativo: os cartões andam para a esquerda). */
const SPIN = -7
/** Quão rápido a velocidade volta ao giro automático depois de soltar ou de tirar o mouse. */
const EASE_BACK = 2.2
const EASE_TO_TARGET = 6
const DRAG_THRESHOLD = 6

/**
 * Capítulo 1 — cilindro 3D de recortes dos projetos, em CSS puro: um único
 * requestAnimationFrame muda o rotateY do anel e a opacidade de cada cartão.
 * Gira sozinho, para com o mouse em cima ou com o foco do teclado, e dá pra
 * arrastar. Com reduced-motion fica parado. Só existe no computador (ver JourneyInvite).
 */
export default function HeroCylinder() {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  // Lidos e escritos pelo loop e pelos eventos de ponteiro, sem re-render.
  const motionState = useRef({
    angle: 0,
    velocity: SPIN,
    hovering: false,
    focused: false,
    dragging: false,
    target: null as number | null,
    pointerId: null as number | null,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    moved: false,
    degPerPx: 0.2,
    reduced: false,
  })

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return

    const state = motionState.current
    state.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (state.reduced) state.velocity = 0

    const paint = () => {
      ring.style.transform = `rotateY(${state.angle}deg)`
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        // Cartões de frente inteiros; os dos lados somem aos poucos.
        const facing = Math.cos(((state.angle + i * STEP) * Math.PI) / 180)
        card.style.opacity = String(Math.max(0, 0.15 + 0.85 * Math.min(1, facing * 1.35)))
      })
    }

    let frame = 0
    let last = 0
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!state.dragging) {
        if (state.target !== null) {
          const remaining = state.target - state.angle
          state.angle += remaining * (1 - Math.exp(-dt * EASE_TO_TARGET))
          state.velocity = 0
          if (Math.abs(remaining) < 0.05) state.target = null
        } else {
          const idle = state.reduced || state.hovering || state.focused
          const base = idle ? 0 : SPIN
          state.velocity += (base - state.velocity) * (1 - Math.exp(-dt * EASE_BACK))
          state.angle += state.velocity * dt
        }
      }
      paint()
      frame = requestAnimationFrame(tick)
    }

    // Fora da tela o loop para, para não gastar bateria à toa.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    })
    observer.observe(root)
    paint()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const state = motionState.current
    const cardWidth = cardRefs.current[0]?.offsetWidth ?? 300
    // Um cartão inteiro arrastado = um passo do cilindro: o cartão acompanha o dedo.
    state.degPerPx = STEP / cardWidth
    state.pointerId = e.pointerId
    state.startX = e.clientX
    state.lastX = e.clientX
    state.lastTime = e.timeStamp
    state.moved = false
    state.dragging = true
    state.target = null
    state.velocity = 0
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = motionState.current
    if (!state.dragging || e.pointerId !== state.pointerId) return

    if (!state.moved && Math.abs(e.clientX - state.startX) > DRAG_THRESHOLD) {
      state.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (!state.moved) return

    const delta = (e.clientX - state.lastX) * state.degPerPx
    const elapsed = Math.max((e.timeStamp - state.lastTime) / 1000, 0.001)
    state.angle += delta
    state.velocity = state.velocity * 0.6 + (delta / elapsed) * 0.4
    state.lastX = e.clientX
    state.lastTime = e.timeStamp
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = motionState.current
    if (e.pointerId !== state.pointerId) return
    state.dragging = false
    state.pointerId = null
    // Dedo parado antes de soltar não tem embalo.
    if (e.timeStamp - state.lastTime > 80 || state.reduced) state.velocity = 0
  }

  /** Quem navega pelo teclado vê o cartão focado vir para a frente. */
  const bringToFront = (index: number) => {
    const state = motionState.current
    const wanted = -index * STEP
    const turns = Math.round((state.angle - wanted) / 360)
    state.target = wanted + turns * 360
  }

  return (
    <motion.div
      ref={rootRef}
      className="cylinder"
      style={{ '--cards-radius': RADIUS } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="group"
      aria-label={heroCylinderCopy.label}
    >
      <div className="cylinder-clip">
        <div
          className="cylinder-stage"
          onFocus={() => {
            motionState.current.focused = true
          }}
          onBlur={() => {
            motionState.current.focused = false
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') motionState.current.hovering = true
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') motionState.current.hovering = false
          }}
          onClickCapture={(e) => {
            // O arraste termina em cima de um cartão: isso não é um clique no link.
            if (motionState.current.moved) {
              e.preventDefault()
              e.stopPropagation()
              motionState.current.moved = false
            }
          }}
        >
          <div className="cylinder-pull">
            <div ref={ringRef} className="cylinder-ring">
              {heroCards.map((card, i) => (
                <Link
                  key={card.image}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  to={`/projetos/${card.slug}`}
                  className="cylinder-card"
                  style={{ '--card-angle': `${i * STEP}deg` } as React.CSSProperties}
                  draggable={false}
                  onFocus={(e) => {
                    // Foco de mouse (no começo de um arraste) não mexe no cilindro.
                    if (e.currentTarget.matches(':focus-visible')) bringToFront(i)
                  }}
                >
                  <img
                    src={`/images/hero/${card.image}-840.webp`}
                    srcSet={`/images/hero/${card.image}-420.webp 420w, /images/hero/${card.image}-840.webp 840w`}
                    sizes="clamp(280px, 26vw, 420px)"
                    width={840}
                    height={1120}
                    alt={card.alt}
                    draggable={false}
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                  <span className="cylinder-name">{card.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cylinder {
          --card-w: clamp(280px, 26vw, 420px);
          position: relative;
          height: calc(var(--card-w) * 4 / 3 + 3rem);
        }

        /* Os cartões sangram até a borda da tela à direita e somem antes de chegar no texto à esquerda. */
        .cylinder-clip {
          --bleed: 50vw;
          position: absolute;
          inset: -2rem calc(var(--bleed) * -1) -2rem 0;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 7rem);
          mask-image: linear-gradient(to right, transparent, #000 7rem);
        }

        .cylinder-stage {
          position: absolute;
          inset: 0 var(--bleed) 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: calc(var(--card-w) * 5);
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
        }
        .cylinder-stage:active { cursor: grabbing; }
        .cylinder-pull {
          transform-style: preserve-3d;
          transform: translateZ(calc(var(--card-w) * var(--cards-radius) * -1));
        }
        .cylinder-ring {
          position: relative;
          width: var(--card-w);
          height: calc(var(--card-w) * 4 / 3);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .cylinder-card {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          border-radius: var(--r-media);
          background: var(--sand);
          box-shadow: 0 18px 40px -18px rgba(14, 44, 63, 0.45);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: rotateY(var(--card-angle)) translateZ(calc(var(--card-w) * var(--cards-radius)));
          -webkit-user-drag: none;
        }
        .cylinder-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
        .cylinder-name {
          position: absolute;
          left: 0.75rem;
          bottom: 0.75rem;
          max-width: calc(100% - 1.5rem);
          padding: 0.35rem 0.8rem;
          border-radius: var(--r-pill);
          background: var(--white);
          color: var(--sea);
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.2;
        }
      `}</style>
    </motion.div>
  )
}
