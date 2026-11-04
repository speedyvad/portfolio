// Tira os prints dos cartões do cilindro do hero (capítulo 1): cada site aberto já
// em 3:4, na posição escolhida, para o cartão mostrar uma tela inteira e nítida.
// Uso: node scripts/build-hero-cards.mjs
// A Harmon ainda não tem endereço público: usa o build local em HARMON_DIST.
// Harmon: fora as seções de serviços, equipe e avaliações (têm placeholder).
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import http from 'node:http'
import { extname, join } from 'node:path'

const OUT = join(import.meta.dirname, '..', 'public', 'images', 'hero')
const HARMON_DIST = 'C:/Users/User/Desktop/Harmon Visagismo/harmon-site/dist'
const HARMON_PORT = 4599
const VIEWPORT = { width: 560, height: 747 }
const SIZES = [420, 840]

const SITES = [
  {
    // Em 560px os botões do topo da Harmon saem cortados: esse print usa a largura de celular.
    url: `http://localhost:${HARMON_PORT}/`,
    viewport: { width: 440, height: 587 },
    shots: [{ to: 'harmon-topo', y: 0 }],
  },
  {
    url: `http://localhost:${HARMON_PORT}/`,
    shots: [
      { to: 'harmon-ritual', y: 3940 },
      { to: 'harmon-clube', y: 4600 },
      { to: 'harmon-metodo', y: 6340 },
    ],
  },
  {
    url: 'https://cursoimersaocoreia.vercel.app',
    shots: [
      { to: 'coreia-topo', y: 0 },
      { to: 'coreia-programa', y: 640 },
    ],
  },
  {
    url: 'https://enquete-shalom.vercel.app',
    shots: [
      { to: 'enquete-topo', y: 0 },
      { to: 'enquete-respostas', y: 958 },
    ],
  },
]

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
}

const server = http.createServer((req, res) => {
  let file = join(HARMON_DIST, decodeURIComponent(req.url.split('?')[0]))
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file)) {
    res.writeHead(404)
    res.end()
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
})
await new Promise((resolve) => server.listen(HARMON_PORT, resolve))

/** Esconde botões flutuantes (WhatsApp etc.), que não fazem parte da tela. */
function hideFloating() {
  for (const el of document.querySelectorAll('body *')) {
    const rect = el.getBoundingClientRect()
    if (getComputedStyle(el).position === 'fixed' && rect.width < 90 && rect.top > 400) el.style.visibility = 'hidden'
  }
}

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const site of SITES) {
  const viewport = site.viewport ?? VIEWPORT
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2.5 })
  const page = await context.newPage()
  await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(2500)
  await page.mouse.move(viewport.width / 2, viewport.height / 2)

  for (const shot of site.shots) {
    // Desce com a roda do mouse para disparar as animações do caminho.
    for (let guard = 0; guard < 80; guard++) {
      const y = await page.evaluate(() => window.scrollY)
      const delta = shot.y - y
      if (Math.abs(delta) < 20) break
      await page.mouse.wheel(0, Math.sign(delta) * Math.min(Math.abs(delta), 400))
      await page.waitForTimeout(450)
      if ((await page.evaluate(() => window.scrollY)) === y) break
    }
    await page.waitForTimeout(1800)
    await page.evaluate(hideFloating)

    const png = await page.screenshot()
    for (const width of SIZES) {
      await sharp(png)
        .resize(width, Math.round((width * 4) / 3))
        .webp({ quality: 80 })
        .toFile(join(OUT, `${shot.to}-${width}.webp`))
    }
    console.log(shot.to)
  }
  await context.close()
}

await browser.close()
server.close()
