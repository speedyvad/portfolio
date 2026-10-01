// Conversão única das fotos novas da v3 para WebP, organizadas nas pastas do design system.
// Uso: node scripts/convert-v3-images.mjs
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { mkdir, unlink, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const ROOT = join(import.meta.dirname, '..', 'public', 'images')

const JOBS = [
  { from: 'landing-page.jpg', to: 'servicos/landing-page.webp' },
  { from: 'curso-evento.jpg', to: 'servicos/curso-evento.webp' },
  { from: 'site-institucional.jpg', to: 'servicos/site-institucional.webp' },
  { from: 'sistema-sob-medida.jpg', to: 'servicos/sistema-sob-medida.webp' },
  { from: 'barbearia.jpg', to: 'modelos/barbearia/hero.webp' },
  { from: 'horizonte-beira-mar.jpg', to: 'fortaleza/horizonte-beira-mar.webp' },
  { from: 'skyline-beira-mar.jpg', to: 'fortaleza/skyline-beira-mar.webp' },
]

for (const { from, to } of JOBS) {
  const src = join(ROOT, from)
  const dest = join(ROOT, to)

  if (!existsSync(src)) {
    console.warn(`[pular] ${from} não encontrado em public/images/`)
    continue
  }

  await mkdir(dirname(dest), { recursive: true })

  await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(dest)

  const { size } = await stat(dest)
  console.log(`${to} — ${(size / 1024).toFixed(1)} KB`)

  await unlink(src)
}

console.log('Concluído.')
