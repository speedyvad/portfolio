import { useRef, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
  threshold?: number
}

export default function MagneticButton({ children, className, style, onClick, href, threshold = 80 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < threshold) {
      x.set(dx * 0.35)
      y.set(dy * 0.35)
    }
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block', ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>{content}</a>
  }

  return content
}
