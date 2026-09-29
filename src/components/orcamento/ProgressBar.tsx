import { motion, useReducedMotion } from 'framer-motion'

export default function ProgressBar({ progress }: { progress: number }) {
  const reduced = useReducedMotion()
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100)

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}
    >
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: reduced ? 0 : 0.4, ease: 'easeOut' }}
        style={{ height: '100%', background: 'var(--gold)' }}
      />
    </div>
  )
}
