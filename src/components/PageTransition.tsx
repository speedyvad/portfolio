import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <>
      {!reduced && (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + '-curtain'}
            initial={{ scaleX: 0, originX: '0%' }}
            animate={{ scaleX: [0, 1, 1, 0], originX: ['0%', '0%', '100%', '100%'] }}
            transition={{ duration: 0.9, times: [0, 0.44, 0.55, 1], ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--sea)',
              zIndex: 9990,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* A linha do horizonte */}
            <span
              style={{
                display: 'block',
                width: '100%',
                height: 3,
                background: 'var(--gold)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
