import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import bricolageLatinWoff2 from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2?url'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import './styles/globals.css'
import App from './App.tsx'

// Pré-carrega o recorte latino (cobre pt-BR) da variável antes do primeiro paint.
const fontPreload = document.createElement('link')
fontPreload.rel = 'preload'
fontPreload.as = 'font'
fontPreload.type = 'font/woff2'
fontPreload.href = bricolageLatinWoff2
fontPreload.crossOrigin = 'anonymous'
document.head.prepend(fontPreload)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
