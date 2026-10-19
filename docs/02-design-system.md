# 02 — Design system

Tokens e utilitários vivem em `src/styles/globals.css`. Use as variáveis e classes de lá; não repita valores soltos.

## Paleta

```
--white:      #FFFFFF
--sand:       #EFEAE0   superfícies de apoio, capítulo "virada"
--sea:        #0E2C3F   texto principal, capítulo "dor", faixas escuras
--sea-soft:   #4B6272   texto secundário
--line:       rgba(14,44,63,0.12)
--line-strong rgba(14,44,63,0.24)
--gold:       #D9A21B   acento, blocos de prova, botões
--gold-deep:  #8C6410   ouro para TEXTO sobre fundo claro (AA)
--whatsapp:   #25D366   só no botão flutuante
--on-sea / --on-sea-soft / --line-on-sea   texto e linhas sobre --sea
```
Contraste: texto dourado sobre claro = `--gold-deep`. Botão dourado = fundo `--gold`, texto `--sea`.

**Textura:** `.bg-sand` já aplica ruído SVG a ~4% (`::before`). Toda seção areia usa essa classe.

## Tipografia — Bricolage Grotesque (variável, self-hosted)

| Papel | Configuração |
|---|---|
| Títulos (hero, capítulos, h2) | wght 400–500, wdth 100, letter-spacing -0.025/-0.035em, line-height 0.98 |
| Números de prova e preços (`.text-proof`) | wght 700, wdth 75 (condensado) |
| Wordmark gigante do rodapé (`.wordmark-giant`) | wght 800, wdth 75 |
| Corpo | wght 400, 18px, line-height 1.6 |
| Labels e botões (`.label-ui`) | wght 600, 15–16px |

Escala (classes `.fs-*`): display `clamp(3rem, 8vw, 7.5rem)` · h2 `clamp(2.25rem, 5vw, 4.25rem)` ·
h2-section `clamp(2rem, 4vw, 3.25rem)` · h3 `clamp(1.5rem, 2.4vw, 2rem)` · lead `clamp(1.125rem, 1.6vw, 1.375rem)` · body 1.125rem · small 0.9375rem.

Regras: títulos LEVES (nunca 800 em título de seção). Texto corrido com `.measure` (38rem).

## Layout

- `.container-x`: 1240px, padding 24px (mobile) / 48px (≥768px). `.section-y`: 5rem / 8rem.
- Cada capítulo tem cenário próprio (cor + composição). Evitar "título à esquerda + conteúdo abaixo" em seções seguidas.
- Raios: fotos 24px (`--r-media`), cartões 16px (`--r-card`), inputs 12px, botões 999px.

## Componentes

- **Botões:** `.btn .btn-primary` (pílula ouro), `.btn .btn-secondary` (borda), `.btn .btn-on-sea` (sobre escuro). Link de texto: `.link-underline`.
- **DeviceMockup** (`src/components/DeviceMockup.tsx`): notebook CSS + celular sobreposto. Vitrine grande de case e home.
- **ProjectMedia** (`src/components/ProjectMedia.tsx`): painel areia com brilho na cor do projeto, janela de navegador + celular. Cartões de `/projetos`, `/sobre` e "próximo projeto". Hover via classe `.pm-host` no pai.
- **ScrollReveal**: fadeUp padrão (Framer Motion).
- **Wordmark**: logo textual "Dourado Studio".
- **Footer**: rodapé com wordmark gigante.
- **WhatsAppFloat**: some sobre CTA final e rodapé; oculto em `/orcamento`.
- **Cursor customizado e partículas**: só em `/sobre`.

## Movimento — uma biblioteca por papel

| Biblioteca | Usar para | Não usar para |
|---|---|---|
| GSAP + ScrollTrigger | cenas ligadas ao scroll (pin, scrub, troca de cor, parallax) | micro-interações |
| GSAP SplitText | títulos que se montam por linha/palavra | texto corrido |
| Framer Motion | hover, AnimatePresence, transição de página, layout, simulador, reveals simples | cenas de scroll |
| Lenis | scroll suave global, integrado ao ScrollTrigger em `src/lib/motion.ts` | — |
| Embla | carrosséis arrastáveis e faixa contínua de mockups | galeria do hero |
| OGL | galeria curva em WebGL do hero (só desktop) | qualquer outra coisa |
| NumberFlow | números que mudam (calculadora, simulador, faixa de prova) | contagens decorativas |
| Radix | Accordion (FAQ), Tabs | — |
| Vaul | gavetas no mobile (menu, resumo do simulador) | desktop |
| Phosphor Icons | todos os ícones (peso regular/light) | — |
| Devicon (CDN) | ícones de tecnologia, só em `/sobre` e nos cases | — |

Regras: GSAP sempre via `useGSAP()` com `scope`. Importar GSAP só nas páginas que usam.
`prefers-reduced-motion`: sem pin, sem scrub, sem WebGL, sem SplitText — conteúdo direto.
