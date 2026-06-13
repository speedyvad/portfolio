import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number
}

export default function TiltCard({ children, className, style, intensity = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 300, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * intensity)
    rotateY.set((px - 0.5) * intensity)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: 1000,
        ...style,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          height: '100%',
        }}
      >
        {children}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(245,200,66,0.08) 0%, transparent 60%)`,
            zIndex: 1,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
