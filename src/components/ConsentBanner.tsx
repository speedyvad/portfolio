import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CONSENT_COPY } from '../data/consent'
import { getConsent, setConsent, subscribeConsent } from '../lib/consent'

/**
 * Aviso de cookies fixo no rodapé da tela. Não bloqueia a página: quem ignora
 * continua navegando sem analytics. No celular ocupa a largura toda; a partir
 * de 768px vira um cartão no canto inferior esquerdo (o WhatsApp fica à direita).
 */
export default function ConsentBanner() {
  const { open } = useSyncExternalStore(subscribeConsent, getConsent)
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? 0 : 24

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          key="consent"
          aria-labelledby="consent-title"
          className="consent-banner"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <h2 id="consent-title" className="consent-title">
            {CONSENT_COPY.title}
          </h2>
          <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.35rem' }}>
            {CONSENT_COPY.text}
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setConsent('denied')}>
              {CONSENT_COPY.deny}
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setConsent('granted')}>
              {CONSENT_COPY.accept}
            </button>
          </div>

          <style>{`
            .consent-banner {
              position: fixed;
              z-index: 120;
              left: max(16px, env(safe-area-inset-left));
              right: max(16px, env(safe-area-inset-right));
              bottom: max(16px, env(safe-area-inset-bottom));
              padding: 1.1rem 1.15rem;
              background: var(--white);
              border: 1px solid var(--line);
              border-radius: var(--r-card);
              box-shadow: 0 12px 40px rgba(14, 44, 63, 0.18);
            }
            .consent-title {
              font-size: 1rem;
              font-weight: 600;
              letter-spacing: 0;
              line-height: 1.3;
            }
            .consent-actions {
              display: flex;
              gap: 0.5rem;
              margin-top: 1rem;
            }
            .consent-actions .btn {
              flex: 1;
              padding: 0.75rem 1.2rem;
              font-size: 0.95rem;
            }
            @media (min-width: 768px) {
              .consent-banner {
                right: auto;
                left: max(24px, env(safe-area-inset-left));
                bottom: max(24px, env(safe-area-inset-bottom));
                max-width: 25rem;
              }
            }
          `}</style>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
