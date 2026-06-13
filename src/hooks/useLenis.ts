import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    let rafId: number
    const raf = (time: number) => {
      lenisInstance?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])
}
