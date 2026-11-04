// Gera public/og-image.png (1200x630) a partir de scripts/og-image.html.
// Rodar à mão depois de mudar a arte: node scripts/build-og-image.mjs
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const page = new URL('./og-image.html', import.meta.url).href
const output = fileURLToPath(new URL('../public/og-image.png', import.meta.url))

const browser = await chromium.launch()
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await tab.goto(page, { waitUntil: 'networkidle' })
await tab.evaluate(() => document.fonts.ready)
const png = await tab.screenshot()
await browser.close()

const info = await sharp(png).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(output)
console.log(`og-image.png: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`)
