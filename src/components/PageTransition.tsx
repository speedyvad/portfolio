import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + '-curtain'}
          initial={{ scaleX: 0, originX: '0%' }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.9,
            times: [0, 0.44, 0.55, 1],
            ease: 'easeInOut',
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--yellow)',
            zIndex: 9990,
            pointerEvents: 'none',
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
