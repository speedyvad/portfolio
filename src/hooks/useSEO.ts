import { useEffect } from 'react'
import { SITE_URL } from '../config/contact'
import type { PageSeo } from '../data/seo'
import { trackPageView } from '../lib/analytics'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO({ title, description, path, image }: PageSeo) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`

    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    if (image) {
      const abs = image.startsWith('http') ? image : `${SITE_URL}${image}`
      setMeta('meta[property="og:image"]', 'property', 'og:image', abs)
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', abs)
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    trackPageView(title)
  }, [title, description, path, image])
}
