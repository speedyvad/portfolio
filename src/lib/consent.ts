import { GA_MEASUREMENT_ID } from '../config/analytics'
import { disableAnalytics, enableAnalytics } from './analytics'

/**
 * Consentimento de cookies (LGPD). A escolha fica no localStorage do visitante;
 * sem escolha, o aviso aparece pouco depois do carregamento (para não disputar
 * o LCP nem a primeira impressão do hero).
 */

export type ConsentChoice = 'granted' | 'denied'
interface ConsentState {
  choice: ConsentChoice | null
  open: boolean
}

const STORAGE_KEY = 'ds-consent'
const BANNER_DELAY_MS = 1500

function readChoice(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

let state: ConsentState = { choice: null, open: false }
const listeners = new Set<() => void>()

function setState(next: Partial<ConsentState>) {
  state = { ...state, ...next }
  listeners.forEach((listener) => listener())
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getConsent = () => state

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Sem storage (aba anônima, bloqueio): a escolha vale só nesta visita.
  }
  setState({ choice, open: false })
  if (choice === 'granted') enableAnalytics()
  else disableAnalytics()
}

export function openConsent() {
  setState({ open: true })
}

/** Roda uma vez, no main.tsx. */
export function initConsent() {
  if (!GA_MEASUREMENT_ID) return
  const choice = readChoice()
  state = { choice, open: false }

  const afterLoad = (fn: () => void) => {
    const run = () => window.setTimeout(fn, BANNER_DELAY_MS)
    if (document.readyState === 'complete') run()
    else window.addEventListener('load', run, { once: true })
  }

  if (choice === 'granted') afterLoad(enableAnalytics)
  else if (choice === null) afterLoad(() => setState({ open: true }))
}
