import { useState, useEffect, useRef } from 'react'

export function useTypewriter(phrases: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = phrases[phraseIndex]

    const tick = () => {
      if (!deleting) {
        if (charIndex < current.length) {
          const shouldGlitch = charIndex > 0 && charIndex % 5 === 0 && Math.random() < 0.2
          if (shouldGlitch) {
            const wrongChar = String.fromCharCode(65 + Math.floor(Math.random() * 26))
            setDisplayed(current.slice(0, charIndex) + wrongChar)
            timeoutRef.current = setTimeout(() => {
              setDisplayed(current.slice(0, charIndex) + current[charIndex])
              setCharIndex((c) => c + 1)
            }, 160)
          } else {
            setDisplayed(current.slice(0, charIndex + 1))
            setCharIndex((c) => c + 1)
            timeoutRef.current = setTimeout(tick, speed)
          }
        } else {
          timeoutRef.current = setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
          timeoutRef.current = setTimeout(tick, speed / 2)
        } else {
          setDeleting(false)
          setPhraseIndex((i) => (i + 1) % phrases.length)
          timeoutRef.current = setTimeout(tick, 300)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, speed)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [charIndex, deleting, phraseIndex, phrases, speed, pause])

  return displayed
}
