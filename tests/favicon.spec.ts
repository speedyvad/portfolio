import { existsSync, readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'

const html = readFileSync('index.html', 'utf-8')

test.describe('favicon', () => {
  test('todo ícone citado no index.html existe em public/', () => {
    const icons = [...html.matchAll(/<link rel="(?:icon|apple-touch-icon)"[^>]*href="\/([^"]+)"/g)].map((match) => match[1])
    expect(icons).toEqual(['favicon.ico', 'favicon.svg', 'favicon-192.png', 'apple-touch-icon.png'])
    for (const icon of icons) expect(existsSync(`public/${icon}`)).toBe(true)
  })

  test('o SVG não depende de fonte instalada', () => {
    expect(readFileSync('public/favicon.svg', 'utf-8')).not.toContain('<text')
  })
})
