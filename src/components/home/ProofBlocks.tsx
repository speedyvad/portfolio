import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { proofBlocks } from '../../data/trust'

/** Capítulo 5 — A prova: três blocos dourados com números reais, cada um levando ao case. */
export default function ProofBlocks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section className="section-y" style={{ background: 'var(--white)', paddingBottom: 0 }}>
      <div className="container-x">
        <h2 className="fs-h2" style={{ maxWidth: '16ch', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Não é promessa. Já aconteceu.
        </h2>

        <div ref={ref} className="proof-grid">
          {proofBlocks.map((b) => (
            <Link key={b.label} to={`/projetos/${b.caseSlug}`} className="proof-block">
              <span className="text-proof proof-value">
                <NumberFlow
                  value={inView ? b.value : 0}
                  suffix={b.suffix}
                  locales="pt-BR"
                  format={{ useGrouping: true }}
                />
              </span>
              <span className="proof-label">{b.label}</span>
              <span className="fs-small proof-link">Ver o projeto</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .proof-grid { display: grid; gap: 1rem; }
        @media (min-width: 860px) { .proof-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } }
        .proof-block { display: flex; flex-direction: column; gap: 0.75rem; min-height: 15rem; padding: clamp(1.5rem, 3vw, 2.25rem); border-radius: var(--r-card); background: var(--gold); color: var(--sea); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        .proof-block:hover { transform: translateY(-4px); }
        .proof-value { font-size: clamp(3.5rem, 7vw, 5.5rem); line-height: 0.9; }
        .proof-label { font-weight: 500; font-size: 1.1rem; line-height: 1.35; max-width: 18rem; }
        .proof-link { margin-top: auto; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; }
        @media (prefers-reduced-motion: reduce) { .proof-block { transition: none; } }
      `}</style>
    </section>
  )
}
