import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { faq } from '../../data/faq'

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  const reduced = useReducedMotion()

  return (
    <section className="section-y" style={{ background: 'var(--sand)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ marginBottom: '3rem' }}>
          Perguntas frequentes
        </h2>

        <ul style={{ listStyle: 'none', borderTop: '1px solid var(--line)', maxWidth: '52rem' }}>
          {faq.map((item, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`

            return (
              <li key={item.question} style={{ borderBottom: '1px solid var(--line)' }}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      textAlign: 'left',
                      padding: '1.5rem 0',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontStretch: '100%',
                      fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                      fontWeight: 600,
                      letterSpacing: 0,
                      lineHeight: 1.35,
                      color: 'var(--sea)',
                    }}
                  >
                    {item.question}
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--gold-deep)',
                        fontSize: '1.5rem',
                        lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="measure" style={{ color: 'var(--sea-soft)', paddingBottom: '1.75rem' }}>
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
