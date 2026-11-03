import { GA_MEASUREMENT_ID } from '../config/analytics'

/**
 * Google Analytics 4 via gtag.js, sem pacote npm. Nada carrega antes do
 * consentimento (ver src/lib/consent.ts): sem "Aceitar", nenhum script do
 * Google e nenhum cookie.
 *
 * Page views são manuais (disparados pelo useSEO, que já sabe título e rota).
 * Por isso, na propriedade do GA4, a opção "Mudanças de página com base em
 * eventos do histórico do navegador" (medição otimizada) deve ficar desligada,
 * senão cada troca de rota conta duas vezes.
 */

export type LinkEvent = 'whatsapp_click' | 'email_click' | 'cv_download'

/** Qual evento-chave um clique em link representa. Função pura (testada em tests/analytics.spec.ts). */
export function classifyLink(href: string): LinkEvent | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (/\.pdf($|[?#])/i.test(href)) return 'cv_download'
  return null
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

// Build local (dev e `npm run preview`) monta o dataLayer, mas não baixa o
// gtag.js: dá pra inspecionar `window.dataLayer` sem sujar os relatórios.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]']
const shouldSend = () => import.meta.env.PROD && !LOCAL_HOSTS.includes(window.location.hostname)

let booted = false
let enabled = false
let listening = false
let lastPage: { title: string } | null = null
let lastSentHref = ''

// gtag.js só reconhece o objeto `arguments`, não um array.
const gtag: (...args: unknown[]) => void = function () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments)
}

function setDisabledFlag(value: boolean) {
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = value
}

function boot() {
  if (booted) return
  booted = true
  window.dataLayer = window.dataLayer ?? []
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  if (!shouldSend()) return
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function sendPageView() {
  if (!enabled || !lastPage) return
  // Evita duplicar quando o efeito do useSEO roda de novo na mesma URL (StrictMode, re-render).
  const href = window.location.href
  if (href === lastSentHref) return
  lastSentHref = href
  gtag('event', 'page_view', { page_title: lastPage.title, page_location: href })
}

function onClick(event: MouseEvent) {
  if (!enabled) return
  const link = (event.target as Element | null)?.closest?.('a')
  const href = link?.getAttribute('href')
  if (!link || !href) return

  const name = classifyLink(href)
  if (!name) return

  const text = (link.getAttribute('aria-label') ?? link.textContent ?? '').trim().replace(/\s+/g, ' ')
  gtag('event', name, { page_path: window.location.pathname, link_text: text.slice(0, 80) })
}

/** Chamado pelo useSEO em toda rota. Guarda a página para enviar assim que houver consentimento. */
export function trackPageView(title: string) {
  lastPage = { title }
  sendPageView()
}

export function enableAnalytics() {
  if (!GA_MEASUREMENT_ID) return
  setDisabledFlag(false)
  boot()
  enabled = true
  if (!listening) {
    listening = true
    document.addEventListener('click', onClick, { capture: true })
  }
  sendPageView()
}

export function disableAnalytics() {
  if (!GA_MEASUREMENT_ID) return
  enabled = false
  lastSentHref = ''
  setDisabledFlag(true)
  // Apaga os cookies _ga / _ga_<id> já gravados (no host e no domínio-pai).
  const host = window.location.hostname
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) return
    for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  })
}
