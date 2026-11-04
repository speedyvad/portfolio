import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/config/contact'
import { publicPages } from './src/data/seo'
import { renderRouteHtml, routeHtmlFile } from './src/lib/routeHtml'

/** Depois do build, grava um HTML por página pública, cada um com o próprio <head>. */
function routeHtmlPlugin(): Plugin {
  return {
    name: 'route-html',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist'
      const baseHtml = readFileSync(join(outDir, 'index.html'), 'utf-8')
      for (const page of publicPages()) {
        const file = join(outDir, routeHtmlFile(page.path))
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, renderRouteHtml(baseHtml, page, SITE_URL))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routeHtmlPlugin()],
})
