import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

export function useTextScramble(text: string, duration = 1200) {
  const [output, setOutput] = useState('')
  const frameRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const total = text.length
    const run = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const revealCount = Math.floor(progress * total)

      let result = ''
      for (let i = 0; i < total; i++) {
        if (i < revealCount) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setOutput(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(run)
      } else {
        setOutput(text)
      }
    }

    frameRef.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frameRef.current)
  }, [text, duration])

  return output
}
