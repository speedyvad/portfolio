# 04 — Técnico

## Stack

React 19 · TypeScript strict · Vite · Tailwind CSS v4 · React Router v7 · Framer Motion · GSAP (+ScrollTrigger, SplitText, @gsap/react) ·
Lenis · Embla · NumberFlow · Radix (Accordion, Tabs) · Vaul · Phosphor Icons · Bricolage Grotesque (fontsource variável) · Devicon (CDN).
Testes: `@playwright/test` como runner de testes unitários em `tests/` (sem browser).

Não instalar outra biblioteca sem perguntar.

## Estrutura

```
src/
  App.tsx               rotas (páginas com React.lazy), Navbar, PageTransition, WhatsAppFloat
  main.tsx              fontes e CSS global
  config/contact.ts     WhatsApp, e-mail, redes, SITE_URL — fonte única de contato
  data/                 conteúdo: projects, services, faq, stats, trust, testimonials, galleryImages
  lib/motion.ts         GSAP + Lenis num único lugar
  hooks/                useSEO, useLenis, ...
  components/           compartilhados (DeviceMockup, Footer, Navbar, Wordmark, ScrollReveal...)
  components/home/      seções da home; journey/ = capítulos 1–4; HeroCylinder = cilindro do hero
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
- Cilindro do hero: só monta em ≥ 1024px (celular e tablet não baixam o código nem as imagens); o loop só roda com ele na tela; com reduced-motion não gira sozinho.
- GSAP importado só nas páginas que usam.
- Imagens: WebP preferencialmente, `width`/`height` definidos, `loading="lazy"` abaixo da dobra.
- Metas Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1.
- Medir: `npm run build`, `npm run preview`, Lighthouse no Chrome (modo mobile). Registrar no `MEMORY.md`.

## SEO

- Título, descrição e imagem de cada página ficam em `src/data/seo.ts`. A página chama `useSEO(...)` com esses dados.
- No build, o plugin `route-html` (`vite.config.ts`) grava `dist/<rota>/index.html` com o `<head>` certo para cada página de `publicPages()`, e o build falha se faltar uma tag no `index.html` base. O corpo continua sendo montado pelo JavaScript.
- O build também grava `dist/404.html` (noindex, sem canonical). O `vercel.json` não tem rewrite geral: a Vercel responde 404 em endereço inexistente. Rota nova precisa de HTML gerado (`publicPages()` ou lista do plugin), e endereço antigo vira redirecionamento no `vercel.json`.
- Imagem de prévia padrão: `public/og-image.png`, gerada por `node scripts/build-og-image.mjs` a partir de `scripts/og-image.html`.
- Para conferir no `npm run preview`, abra a rota com barra no fim (`/sobre/`): sem barra, o Vite entrega o `index.html` da raiz.
- JSON-LD no `index.html` com `WebSite`, `ProfessionalService` e `Person`; `tests/structured-data.spec.ts` confere contra `src/config/contact.ts`. Os perfis em `sameAs` ficam na `Person` porque são pessoais; perfil do estúdio (Perfil da Empresa, Instagram próprio) entra em `sameAs` do `ProfessionalService` quando existir.
- `public/sitemap.xml` feito à mão, citado no `robots.txt`. Página nova entra lá: `tests/sitemap.spec.ts` falha se faltar serviço ou projeto.
- Título da home: "Dourado Studio — Criação de sites e landing pages em Fortaleza".

## Analytics (GA4) e cookies

- Google Analytics 4 via `gtag.js`, **sem pacote npm**. ID em `src/config/analytics.ts` (`GA_MEASUREMENT_ID`; vazio = tudo desligado, inclusive o aviso).
- **Nada carrega antes do "Aceitar"** (LGPD). Aviso em `ConsentBanner`, escolha no `localStorage` (`ds-consent`), reaberto pelo botão "Cookies" do rodapé. "Agora não" depois de aceitar desliga o GA e apaga os cookies `_ga*`. Sinais de anúncio sempre `denied`.
- O aviso aparece 1,5 s depois do `load`, para não disputar o LCP. Com consentimento salvo, o GA também só sobe depois do `load`.
- Page view manual, disparado pelo `useSEO` (título e URL certos em cada rota). **No GA4, desligar "Mudanças de página com base em eventos do histórico"** na medição otimizada, senão conta em dobro.
- Eventos-chave por clique (listener único em `src/lib/analytics.ts`, regra pura `classifyLink` testada): `whatsapp_click`, `email_click`, `cv_download`. O `page_path` do evento diz de qual serviço veio o clique. Marcar como "evento principal" no GA4.
- Em localhost (dev e preview) o `dataLayer` é montado, mas o `gtag.js` não é baixado: dá pra inspecionar `window.dataLayer` sem sujar relatório.

## Acessibilidade

- Mobile-first (375, 768, 1280, 1440). Sem rolagem horizontal.
- Foco visível (outline 2px --gold). Contraste AA.
- Carrosséis navegáveis por teclado, com rótulos.
- Toda imagem com `alt` em português; fallback elegante (bloco --sand) se o arquivo não existir.

## Imagens

- Prints de projeto: mínimo 1440×900 (desktop) e 390×844 (celular), capturados em alta densidade e convertidos para WebP.
- Fotos gratuitas (Freepik etc.): registrar autor.
- Fotos pendentes: `about/vinicius-conversando.jpg`, `about/vinicius-trabalhando.jpg` (os componentes já têm fallback).
