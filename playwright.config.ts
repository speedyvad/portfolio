import { defineConfig } from '@playwright/test'

/**
 * Config mínima do @playwright/test usado apenas como test runner para
 * testes unitários puros (ex.: tests/pricing.spec.ts) — sem browser, sem
 * webServer. Testes ponta a ponta (se algum dia existirem) entram à parte.
 */
export default defineConfig({
  testDir: './tests',
  // workers: 1 porque testes puros em Node não precisam de paralelismo aqui,
  // e alguns ambientes (sandbox do Windows) derrubam workers extras.
  workers: 1,
  reporter: 'list',
})
