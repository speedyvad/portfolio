import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Anima um número sempre que `target` muda (não só na primeira vez) — usado
 * na estimativa ao vivo do simulador de orçamento, o "momento memorável" da página.
 */
export function useAnimatedNumber(target: number, duration = 450) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const frameRef = useRef<number>(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const from = fromRef.current
    if (from === target || reduced) {
      fromRef.current = target
      setValue(target)
      return
    }

    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, reduced])

  return value
}
