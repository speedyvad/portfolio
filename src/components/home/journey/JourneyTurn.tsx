import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../../../lib/motion'

const SEA = '#0E2C3F'
const SAND = '#EFEAE0'

function WhatsAppCard() {
  return (
    <div className="scene-card" style={{ maxWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--whatsapp)' }} />
        <span className="label-ui" style={{ color: 'var(--sea-soft)' }}>WhatsApp</span>
      </div>
      <p className="fs-small" style={{ color: 'var(--sea)' }}>
        “Oi! Vi o site de vocês. Tem horário no sábado?”
      </p>
    </div>
  )
}

function GoogleResultCard() {
  return (
    <div className="scene-card" style={{ maxWidth: 240 }}>
      <p className="label-ui" style={{ color: 'var(--sea)', marginBottom: '0.25rem' }}>Barbearia do Bairro</p>
      <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>★ 4,9 · Aberto agora</p>
    </div>
  )
}

function EnrollmentCard() {
  return (
    <div className="scene-card" style={{ maxWidth: 260 }}>
      <p className="label-ui" style={{ color: 'var(--sea)', marginBottom: '0.4rem' }}>Nova inscrição · Turma de sábado</p>
      <div style={{ height: 6, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '76%', background: 'var(--gold)' }} />
      </div>
      <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.4rem' }}>23 de 30 vagas preenchidas</p>
    </div>
  )
}

function GeneratorCard() {
  return (
    <div className="scene-card" style={{ maxWidth: 260 }}>
      <p className="label-ui" style={{ color: 'var(--sea)', marginBottom: '0.5rem' }}>Mensagem gerada em 3 s</p>
      <span
        className="label-ui"
        style={{
          display: 'inline-flex',
          padding: '0.4rem 0.9rem',
          borderRadius: 999,
          background: 'var(--gold)',
          color: 'var(--sea)',
        }}
      >
        Copiar
      </span>
    </div>
  )
}

interface SceneProps {
  image: string
  alt: string
  legend: string
  reverse?: boolean
  cards: React.ReactNode[]
}

function Scene({ image, alt, legend, reverse, cards }: SceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = cardRefs.current.filter(Boolean) as HTMLDivElement[]

        gsap.from(els, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sceneRef.current, start: 'top 75%' },
        })

        els.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 20 },
            {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: sceneRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
          void i
        })
      })
    },
    { scope: sceneRef },
  )

  return (
    <div ref={sceneRef} className={`scene ${reverse ? 'scene-reverse' : ''}`}>
      <div className="scene-photo">
        <img src={image} alt={alt} loading="lazy" decoding="async" />
        <div className="scene-cards">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className={`scene-card-slot scene-card-slot-${i}`}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
      <p className="fs-lead measure scene-legend">{legend}</p>
    </div>
  )
}

/** Transição (clareamento --sea → --sand) + capítulo 4, a virada. */
export default function JourneyTurn() {
  const transitionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          transitionRef.current,
          { backgroundColor: SEA },
          {
            backgroundColor: SAND,
            ease: 'none',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          titleRef.current,
          { color: '#ffffff' },
          {
            color: SEA,
            ease: 'none',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: true,
            },
          },
        )

        if (titleRef.current) {
          const split = new SplitText(titleRef.current, { type: 'lines', mask: 'lines' })
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: transitionRef.current, start: 'top 70%' },
          })
        }
      })
    },
    { scope: transitionRef },
  )

  return (
    <>
      <div ref={transitionRef} className="turn-transition" style={{ background: 'var(--sand)' }}>
        <h2 ref={titleRef} className="display" style={{ color: 'var(--sea)' }}>
          Dá pra mudar isso.
        </h2>
      </div>

      <div className="section-y bg-sand">
        <div className="container-x">
          <Scene
            image="/images/modelos/barbearia/hero.webp"
            alt="Barbeiro atendendo um cliente na barbearia"
            legend="Quem procura, encontra. E já chega querendo marcar."
            cards={[<WhatsAppCard key="wa" />, <GoogleResultCard key="g" />]}
          />
          <Scene
            image="/images/servicos/curso-evento.webp"
            alt="Professora conduzindo uma aula para um curso"
            legend="As inscrições chegam organizadas, sem ninguém perguntar o horário de novo."
            reverse
            cards={[<EnrollmentCard key="e" />]}
          />
          <Scene
            image="/images/servicos/sistema-sob-medida.webp"
            alt="Pessoa trabalhando em um painel de sistema no computador"
            legend="O que tomava a tarde agora leva segundos."
            cards={[<GeneratorCard key="p" />]}
          />
        </div>
      </div>

      <style>{`
        .turn-transition {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem var(--pad);
        }
        .turn-transition h2 { font-size: clamp(2rem, 5vw, 3.5rem); }

        .scene { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 5rem; }
        .scene:last-child { margin-bottom: 0; }
        .scene-photo { position: relative; border-radius: var(--r-media); overflow: hidden; aspect-ratio: 4 / 3; }
        .scene-photo img { width: 100%; height: 100%; object-fit: cover; }
        .scene-cards { position: absolute; inset: 0; pointer-events: none; }
        .scene-card {
          background: var(--white);
          border-radius: var(--r-card);
          padding: 0.85rem 1rem;
          box-shadow: 0 16px 32px rgba(14,44,63,0.18);
        }
        .scene-card-slot { position: absolute; }
        .scene-card-slot-0 { left: 6%; bottom: 10%; }
        .scene-card-slot-1 { right: 6%; top: 12%; }
        .scene-legend { color: var(--sea-soft); }

        @media (min-width: 900px) {
          .scene { flex-direction: row; align-items: center; gap: 3.5rem; }
          .scene-reverse { flex-direction: row-reverse; }
          .scene-photo { flex: 1.1; aspect-ratio: 16 / 11; }
          .scene-legend { flex: 0.8; font-size: clamp(1.25rem, 1.8vw, 1.6rem); }
        }
      `}</style>
    </>
  )
}
