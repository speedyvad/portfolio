import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

let lenis: Lenis | null = null
let tick: ((time: number) => void) | null = null

/** Instância global do Lenis, sincronizada com o ticker do GSAP/ScrollTrigger. */
export function getLenis() {
  return lenis
}

/** Liga o scroll suave global. Idempotente — chamadas extras são ignoradas. */
export function startLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/**
 * Volta ao topo na hora, cancelando a inércia do Lenis. Sem isso, um clique
 * enquanto a página ainda desliza fazia a página nova abrir lá embaixo:
 * o Lenis ignorava o window.scrollTo e continuava indo para o alvo antigo.
 */
export function resetScroll() {
  lenis?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

export function stopLenis() {
  if (tick) {
    gsap.ticker.remove(tick)
    tick = null
  }
  lenis?.destroy()
  lenis = null
}

export { gsap, ScrollTrigger, SplitText }
