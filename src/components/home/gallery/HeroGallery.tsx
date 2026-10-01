import { lazy, Suspense, useEffect, useState } from 'react'
import GalleryFallback from './GalleryFallback'

const CurvedGalleryOGL = lazy(() => import('./CurvedGalleryOGL'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Decide entre a galeria curva em WebGL (desktop, sem reduced-motion, depois do
 * primeiro paint) e o fallback Embla — nunca os dois ao mesmo tempo.
 */
export default function HeroGallery() {
  const [useOGL, setUseOGL] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.innerWidth >= 1024

    if (!wide || reducedMotion || !supportsWebGL()) return

    // Espera o primeiro paint antes de montar o WebGL, para não competir com o LCP.
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setUseOGL(true))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  if (!useOGL) return <GalleryFallback />

  return (
    <Suspense fallback={<GalleryFallback />}>
      <CurvedGalleryOGL />
    </Suspense>
  )
}
