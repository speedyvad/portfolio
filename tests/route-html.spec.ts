import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { SITE_URL } from '../src/config/contact'
import { legacyServiceSlugs } from '../src/data/services'
import { homeSeo, notFoundSeo, publicPages } from '../src/data/seo'
import { renderNotFoundHtml, renderRouteHtml, routeHtmlFile } from '../src/lib/routeHtml'

const baseHtml = readFileSync('index.html', 'utf-8')
const sitemap = readFileSync('public/sitemap.xml', 'utf-8')
const vercel = JSON.parse(readFileSync('vercel.json', 'utf-8')) as {
  rewrites?: unknown[]
  redirects: { source: string; destination: string }[]
}

test.describe('HTML por rota', () => {
  test('as páginas geradas são as mesmas do sitemap', () => {
    const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
    const pageUrls = publicPages().map((page) => `${SITE_URL}${page.path}`)
    expect([...pageUrls].sort()).toEqual([...sitemapUrls].sort())
  })

  test('toda página sai com o próprio título, descrição e canonical', () => {
    for (const page of publicPages()) {
      const html = renderRouteHtml(baseHtml, page, SITE_URL)
      expect(html).toContain(`<link rel="canonical" href="${SITE_URL}${page.path}" />`)
      expect(html).toContain(`<meta property="og:url" content="${SITE_URL}${page.path}" />`)
      expect(html.match(/<title>/g)).toHaveLength(1)
      expect(html.match(/rel="canonical"/g)).toHaveLength(1)
      expect(page.description.length).toBeGreaterThan(0)
    }
  })

  test('nenhuma página além da home herda o canonical da home', () => {
    for (const page of publicPages().filter((p) => p.path !== '/')) {
      const html = renderRouteHtml(baseHtml, page, SITE_URL)
      expect(html).not.toContain(`<link rel="canonical" href="${SITE_URL}/" />`)
      expect(html).not.toContain(`<title>${homeSeo.title}</title>`)
    }
  })

  test('escapa aspas e símbolos, e não interpreta "$" no texto', () => {
    const html = renderRouteHtml(
      baseHtml,
      { title: 'A & B', description: 'Diz "oi" por $1 <agora>', path: '/x' },
      SITE_URL,
    )
    expect(html).toContain('<title>A &amp; B</title>')
    expect(html).toContain('<meta name="description" content="Diz &quot;oi&quot; por $1 &lt;agora&gt;" />')
  })

  test('falha se o HTML base perder uma tag, em vez de publicar errado', () => {
    expect(() => renderRouteHtml('<html></html>', homeSeo, SITE_URL)).toThrow(/title/)
  })

  test('a página 404 não entra no índice nem declara canonical', () => {
    const html = renderNotFoundHtml(baseHtml, notFoundSeo, SITE_URL)
    expect(html).toContain('<meta name="robots" content="noindex" />')
    expect(html).not.toContain('rel="canonical"')
    expect(html).toContain(`<title>${notFoundSeo.title}</title>`)
  })

  test('sem rewrite geral: endereço inexistente precisa responder 404', () => {
    expect(vercel.rewrites ?? []).toEqual([])
  })

  test('endereços antigos redirecionam no servidor', () => {
    const redirects = new Map(vercel.redirects.map((r) => [r.source, r.destination]))
    expect(redirects.get('/orcamento')).toBe('/servicos')
    expect(redirects.get('/projects')).toBe('/projetos')
    expect(redirects.get('/projects/:slug')).toBe('/projetos/:slug')
    for (const [oldSlug, newSlug] of Object.entries(legacyServiceSlugs)) {
      expect(redirects.get(`/servicos/${oldSlug}`)).toBe(`/servicos/${newSlug}`)
    }
  })

  test('caminho do arquivo gerado', () => {
    expect(routeHtmlFile('/')).toBe('index.html')
    expect(routeHtmlFile('/sobre')).toBe('sobre/index.html')
    expect(routeHtmlFile('/servicos/landing-page')).toBe('servicos/landing-page/index.html')
  })
})
