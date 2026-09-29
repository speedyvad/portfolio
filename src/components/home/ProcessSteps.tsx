import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const STEPS = [
  { title: 'Conversa', text: 'Você conta o que precisa pelo WhatsApp.' },
  { title: 'Proposta', text: 'Escopo, prazo e valor por escrito.' },
  { title: 'Construção', text: 'Você acompanha e aprova cada etapa.' },
  { title: 'No ar', text: 'Site publicado, com domínio e suporte inicial.' },
]

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduced = useReducedMotion()

  return (
    <section style={{ background: 'var(--white)', paddingTop: 'var(--section)', paddingBottom: 'clamp(3rem, 6vw, 4rem)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ marginBottom: '3.5rem' }}>
          Como funciona
        </h2>

        <div ref={ref} className="process">
          {/* A linha dourada que se desenha ao entrar na tela */}
          <motion.span
            aria-hidden="true"
            className="process-line"
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={inView || reduced ? { scaleX: 1, scaleY: 1 } : undefined}
            transition={{ duration: reduced ? 0 : 1, ease: 'easeInOut' }}
          />

          <ol className="process-list">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                className="process-step"
                initial={{ opacity: 0, y: 16 }}
                animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.2 + i * 0.18 }}
              >
                <span className="process-dot" aria-hidden="true" />
                <span
                  className="display"
                  style={{ fontSize: '0.9rem', color: 'var(--gold-deep)', display: 'block', marginBottom: '0.6rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--sea-soft)' }}>
                  {step.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .process { position: relative; }
        .process-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          position: relative;
        }
        .process-step { position: relative; padding-left: 2rem; }
        .process-dot {
          position: absolute;
          left: -4.5px;
          top: 4px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--gold);
        }
        .process-line {
          position: absolute;
          left: 0;
          top: 9px;
          bottom: 9px;
          width: 2px;
          background: var(--gold);
          transform-origin: top;
        }
        @media (min-width: 900px) {
          .process-list { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
          .process-step { padding-left: 0; padding-right: 1.5rem; padding-top: 2.5rem; }
          .process-dot { left: 0; top: 0; }
          .process-line {
            left: 0;
            right: 0;
            top: 4.5px;
            bottom: auto;
            width: auto;
            height: 2px;
            transform-origin: left;
          }
        }
      `}</style>
    </section>
  )
}
