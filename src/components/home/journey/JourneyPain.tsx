import { useRef } from 'react'
import { useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../lib/motion'
import { stats, statsClosing, type Stat } from '../../../data/stats'

const FRASES = [
  'Agora mesmo, alguém está procurando o que você vende.',
  'Pesquisa no Google. Compara. Lê as avaliações.',
  'E compra de quem aparece primeiro.',
]

function StatSentence({ stat, size }: { stat: Stat; size: 'lg' | 'sm' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [before, after] = stat.sentence.split('{n}')

  return (
    <div ref={ref} style={{ maxWidth: size === 'lg' ? '46rem' : '28rem' }}>
      <p
        className="display"
        style={{
          fontSize: size === 'lg' ? 'clamp(1.9rem, 4.2vw, 3.25rem)' : 'clamp(1.35rem, 2.4vw, 1.85rem)',
          color: '#fff',
          lineHeight: 1.1,
        }}
      >
        {before}
        <span className="text-proof" style={{ color: 'var(--gold)' }}>
          <NumberFlow value={inView ? stat.value : 0} suffix={stat.suffix} />
        </span>
        {after}
      </p>
      <p className="fs-small" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.65rem' }}>
        Fonte:{' '}
        <a
          href={stat.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.35)', paddingBottom: 1 }}
        >
          {stat.source}
        </a>
      </p>
    </div>
  )
}

/** Capítulo 2 — a dor. No desktop, as três frases se revezam numa cena presa na tela. */
export default function JourneyPain() {
  const pinRef = useRef<HTMLDivElement>(null)
  const fraseRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const frases = fraseRefs.current.filter(Boolean) as HTMLParagraphElement[]
        gsap.set(frases.slice(1), { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: true,
          },
        })

        for (let i = 1; i < frases.length; i++) {
          tl.to(frases[i - 1], { opacity: 0.25, duration: 1 }, i)
          tl.to(frases[i], { opacity: 1, duration: 1 }, i)
        }

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: pinRef },
  )

  return (
    <div style={{ background: 'var(--sea)' }}>
      <div ref={pinRef} className="pain-pin">
        <div className="container-x">
          {FRASES.map((frase, i) => (
            <p
              key={frase}
              ref={(el) => {
                fraseRefs.current[i] = el
              }}
              className="display pain-frase"
            >
              {frase}
            </p>
          ))}
        </div>
      </div>

      <div className="section-y">
        <div className="container-x">
          <StatSentence stat={stats[0]} size="lg" />

          <div className="pain-stats-secondary">
            {stats.slice(1).map((stat) => (
              <StatSentence key={stat.sentence} stat={stat} size="sm" />
            ))}
          </div>

          <p
            className="fs-lead measure"
            style={{
              color: '#fff',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            {statsClosing}
          </p>
        </div>
      </div>

      <style>{`
        .pain-pin {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
          padding-block: 4rem;
        }
        .pain-frase {
          color: #fff;
          font-size: clamp(1.75rem, 4.2vw, 3.5rem);
          max-width: 46rem;
        }
        .pain-stats-secondary {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          margin-top: 2.75rem;
        }
        @media (min-width: 700px) {
          .pain-stats-secondary { flex-direction: row; gap: 3.5rem; }
        }
        @media (min-width: 1024px) {
          .pain-pin { min-height: 100vh; }
        }
      `}</style>
    </div>
  )
}
