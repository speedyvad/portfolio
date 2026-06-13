import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 8

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    addHoverListeners()

    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    let rafId: number
    const animate = () => {
      const { x, y } = pos.current

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4.5}px, ${y - 4.5}px)`
      }

      ringPos.current.x += (x - ringPos.current.x) * 0.12
      ringPos.current.y += (y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        const size = hovered ? 52 : 34
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }

      trail.current.unshift({ x, y })
      trail.current = trail.current.slice(0, TRAIL_LENGTH)

      trail.current.forEach((pt, i) => {
        const el = trailRefs.current[i]
        if (!el) return
        const size = Math.max(2, 8 - i)
        const opacity = (1 - i / TRAIL_LENGTH) * 0.5
        el.style.transform = `translate(${pt.x - size / 2}px, ${pt.y - size / 2}px)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.opacity = String(opacity)
      })

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [hovered])

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            backgroundColor: 'var(--yellow)',
            pointerEvents: 'none',
            zIndex: 9997,
            transition: 'opacity 0.1s',
            willChange: 'transform',
          }}
        />
      ))}

      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: 'var(--yellow)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: clicked ? 'scale(0.7)' : 'scale(1)',
          transition: 'transform 0.1s',
          willChange: 'transform',
        }}
      />

      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid var(--yellow)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.6,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
