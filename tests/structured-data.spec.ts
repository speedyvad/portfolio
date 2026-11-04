import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { EMAIL, GITHUB, INSTAGRAM, LINKEDIN, SITE_URL, STUDIO_NAME, WHATSAPP_DISPLAY } from '../src/config/contact'

const html = readFileSync('index.html', 'utf-8')
const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? ''

interface Node {
  '@type': string
  '@id': string
  name: string
  url: string
  telephone?: string
  email?: string
  sameAs?: string[]
}

const graph = (JSON.parse(script) as { '@graph': Node[] })['@graph']
const byType = (type: string) => graph.find((node) => node['@type'] === type)

test.describe('dados estruturados', () => {
  test('o site declara o nome e o endereço oficiais', () => {
    expect(byType('WebSite')?.name).toBe(STUDIO_NAME)
    expect(byType('WebSite')?.url).toBe(`${SITE_URL}/`)
  })

  test('o contato do estúdio é o mesmo do contact.ts', () => {
    const studio = byType('ProfessionalService')
    expect(studio?.name).toBe(STUDIO_NAME)
    expect(studio?.telephone).toBe(WHATSAPP_DISPLAY)
    expect(studio?.email).toBe(EMAIL)
  })

  test('os perfis são os mesmos do contact.ts', () => {
    expect(byType('Person')?.sameAs).toEqual([INSTAGRAM, LINKEDIN, GITHUB])
  })

  test('todo @id usado aponta para um item do próprio bloco', () => {
    const ids = new Set(graph.map((node) => node['@id']))
    const refs = [...script.matchAll(/\{ "@id": "([^"]+)" \}/g)].map((match) => match[1])
    expect(refs.length).toBeGreaterThan(0)
    for (const ref of refs) expect(ids.has(ref)).toBe(true)
  })
})
