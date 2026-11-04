import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { SITE_URL } from '../src/config/contact'
import { projects } from '../src/data/projects'
import { services } from '../src/data/services'

const sitemap = readFileSync('public/sitemap.xml', 'utf-8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

test.describe('sitemap.xml', () => {
  test('tem exatamente as páginas públicas do site', () => {
    const expected = [
      `${SITE_URL}/`,
      `${SITE_URL}/servicos`,
      ...services.map((s) => `${SITE_URL}/servicos/${s.slug}`),
      `${SITE_URL}/projetos`,
      ...projects.map((p) => `${SITE_URL}/projetos/${p.slug}`),
      `${SITE_URL}/sobre`,
    ]

    expect([...urls].sort()).toEqual([...expected].sort())
  })
})
