import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  text: string
  /** Muda para reiniciar a animação. */
  replayKey: string | number
  className?: string
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'p'
  delay?: number
}

/**
 * Revela um texto linha a linha, de baixo para cima, por máscara.
 * As linhas reais são medidas no layout, então o efeito acompanha qualquer quebra.
 */
export default function MaskedLines({
  text,
  replayKey,
  className,
  style,
  as = 'h1',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)
  const [measuredFor, setMeasuredFor] = useState(text)
  const reduced = useReducedMotion()

  // Texto novo: descarta a medição anterior antes de renderizar
  if (measuredFor !== text) {
    setMeasuredFor(text)
    setLines(null)
  }

  // Remede quando a janela é redimensionada
  useEffect(() => {
    let timer: number
    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setLines(null), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useLayoutEffect(() => {
    if (lines !== null) return
    const el = ref.current
    if (!el) return

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))
    if (!words.length) return

    const grouped: string[][] = []
    let lastTop: number | null = null
    for (const word of words) {
      const top = word.offsetTop
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        grouped.push([])
        lastTop = top
      }
      grouped[grouped.length - 1].push(word.textContent ?? '')
    }
    setLines(grouped.map((g) => g.join(' ')))
  }, [lines, text])

  const Tag = as

  // Passo de medição: as palavras são renderizadas normalmente e agrupadas antes do paint
  if (lines === null) {
    return (
      <Tag className={className} style={style}>
        <span ref={ref as React.RefObject<HTMLDivElement>} style={{ visibility: 'hidden' }}>
          {text.split(' ').map((word, i) => (
            <span data-word key={i}>
              {word}{' '}
            </span>
          ))}
        </span>
      </Tag>
    )
  }

  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <span key={`${replayKey}-${i}`} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={reduced ? { y: 0, opacity: 1 } : { y: '110%' }}
            animate={{ y: 0, opacity: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.7, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
