# 04 — Técnico

## Stack

React 19 · TypeScript strict · Vite · Tailwind CSS v4 · React Router v7 · Framer Motion · GSAP (+ScrollTrigger, SplitText, @gsap/react) ·
Lenis · Embla · OGL · NumberFlow · Radix (Accordion, Tabs) · Vaul · Phosphor Icons · Bricolage Grotesque (fontsource variável) · Devicon (CDN).
Testes: `@playwright/test` como runner de testes unitários em `tests/` (sem browser).

Não instalar outra biblioteca sem perguntar.

## Estrutura

```
src/
  App.tsx               rotas (páginas com React.lazy), Navbar, PageTransition, WhatsAppFloat
  main.tsx              fontes e CSS global
  config/contact.ts     WhatsApp, e-mail, redes, SITE_URL — fonte única de contato
  data/                 conteúdo: projects, services, faq, stats, trust, pricing, testimonials, galleryImages
  lib/motion.ts         GSAP + Lenis num único lugar
  hooks/                useSEO, useLenis, useAnimatedNumber, ...
  components/           compartilhados (DeviceMockup, Footer, Navbar, Wordmark, ScrollReveal...)
  components/home/      seções da home; journey/ = capítulos 1–4; gallery/ = galeria do hero
  components/orcamento/ peças do simulador
  pages/                uma por rota
public/images/
  cases/<slug>-desktop.png|webp, <slug>-mobile.*, <slug>-<n>.*   prints dos projetos
  projects/<slug>.png   prints antigos (fallback)
  servicos/, modelos/, fortaleza/, about/   fotos de apoio
docs/                   esta documentação
tests/                  testes unitários
```

## Orçamento de performance

- JS inicial da home ≤ ~180 KB gzip. Páginas em chunks próprios (`React.lazy`).
- OGL só com largura ≥ 1024px, sem reduced-motion e depois do primeiro paint; senão, fallback Embla.
- GSAP importado só nas páginas que usam.
- Imagens: WebP preferencialmente, `width`/`height` definidos, `loading="lazy"` abaixo da dobra.
- Metas Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1.
- Medir: `npm run build`, `npm run preview`, Lighthouse no Chrome (modo mobile). Registrar no `MEMORY.md`.

## SEO

- `useSEO({ title, description, path, image? })` em toda rota.
- JSON-LD `ProfessionalService` no `index.html`.
- Título da home: "Dourado Studio — Criação de sites e landing pages em Fortaleza".

## Acessibilidade

- Mobile-first (375, 768, 1280, 1440). Sem rolagem horizontal.
- Foco visível (outline 2px --gold). Contraste AA.
- Carrosséis navegáveis por teclado, com rótulos.
- Toda imagem com `alt` em português; fallback elegante (bloco --sand) se o arquivo não existir.

## Imagens

- Prints de projeto: mínimo 1440×900 (desktop) e 390×844 (celular), capturados em alta densidade e convertidos para WebP.
- Fotos gratuitas (Freepik etc.): registrar autor.
- Fotos pendentes: `about/vinicius-conversando.jpg`, `about/vinicius-trabalhando.jpg` (os componentes já têm fallback).
