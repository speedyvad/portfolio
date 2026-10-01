import { useEffect } from 'react'
import { startLenis, stopLenis } from '../lib/motion'

export function useLenis() {
  useEffect(() => {
    startLenis()
    return () => stopLenis()
  }, [])
}
