import type { PageSeo } from '../data/seo'

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function replaceTag(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) throw new Error(`routeHtml: tag não encontrada no HTML base: ${label}`)
  // Função no lugar de string: um "$" no texto não pode virar referência da regex.
  return html.replace(pattern, () => replacement)
}

function replaceMeta(html: string, attr: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`)
  return replaceTag(html, pattern, `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`, key)
}

/**
 * Devolve o HTML base com o `<head>` da página: quem não roda JavaScript (WhatsApp,
 * LinkedIn, primeira leitura do Google) já recebe o título e o canonical certos.
 */
export function renderRouteHtml(baseHtml: string, page: PageSeo, siteUrl: string) {
  const url = `${siteUrl}${page.path}`
  let html = replaceTag(baseHtml, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`, 'title')
  html = replaceTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`, 'canonical')
  html = replaceMeta(html, 'name', 'description', page.description)
  html = replaceMeta(html, 'property', 'og:url', url)
  html = replaceMeta(html, 'property', 'og:title', page.title)
  html = replaceMeta(html, 'property', 'og:description', page.description)
  html = replaceMeta(html, 'name', 'twitter:title', page.title)
  html = replaceMeta(html, 'name', 'twitter:description', page.description)

  if (page.image) {
    const image = page.image.startsWith('http') ? page.image : `${siteUrl}${page.image}`
    html = replaceMeta(html, 'property', 'og:image', image)
    html = replaceMeta(html, 'name', 'twitter:image', image)
  }

  return html
}

/** HTML servido com status 404: não entra no índice e não aponta canonical para lugar nenhum. */
export function renderNotFoundHtml(baseHtml: string, page: PageSeo, siteUrl: string) {
  const html = renderRouteHtml(baseHtml, page, siteUrl)
  const withoutCanonical = replaceTag(html, /\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, '', 'canonical')
  return replaceMeta(withoutCanonical, 'name', 'robots', 'noindex')
}

/** Caminho do arquivo gerado, relativo à pasta do build: `/sobre` → `sobre/index.html`. */
export function routeHtmlFile(path: string) {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`
}
