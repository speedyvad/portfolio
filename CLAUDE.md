# Vinícius Dourado — Portfolio

## Sobre o projeto
Portfólio pessoal de Vinícius Dourado, desenvolvedor Front-End de Fortaleza, CE.
Objetivo: impressionar recrutadores de big techs com um site visualmente impactante,
profissional e que demonstre domínio da stack moderna.

---

## Stack obrigatória
- **React 19** + **TypeScript** (strict)
- **Vite** como bundler
- **Tailwind CSS v4** para estilização
- **Framer Motion** para todas as animações
- **React Router v7** para navegação entre páginas
- **Devicon** (CDN) para ícones de tecnologias

Não adicionar outras bibliotecas sem perguntar ao usuário.

---

## Design system — seguir SEMPRE

### Paleta
```
--bg:       #0A0A0A   (fundo principal)
--bg2:      #111111   (fundo seções alternadas)
--bg3:      #181818   (cards, inputs)
--bg4:      #1E1E1E   (hover states)
--yellow:   #F5C842   (cor de destaque — ÚNICA cor de acento)
--yellow-dim: #C9A020
--yellow-glow: rgba(245,200,66,0.12)
--text:     #E8E8E8
--muted:    #777777
--border:   rgba(255,255,255,0.07)
--border2:  rgba(255,255,255,0.12)
```

### Tipografia
- Display/títulos: **Space Grotesk** (700, letter-spacing: -0.04em)
- Corpo: **Inter** (400/500)
- Ambas via Google Fonts

### Regras visuais
- Cursor customizado: ponto amarelo + anel com delay (já implementado)
- Partículas animadas no hero (canvas, ~50 pontos, linhas de conexão amarelas)
- Scroll reveal com Framer Motion (fadeUp, threshold 0.15)
- Nav: transparente → frosted glass ao scrollar (backdrop-blur)
- Seção hero: grid pattern + radial gradient amarelo sutil
- Botão primário: amarelo sólido, texto preto, hover → branco
- Botão ghost: border sutil, hover → border+texto amarelo
- Cards: bg3, border sutil, hover → border amarelo + translateY(-4px)
- Noise texture sutil no body (SVG data URI)

---

## Estrutura de páginas

### `/` — Home
Seções em ordem:
1. **Hero** — nome animado, efeito de digitação rotacionando entre roles, partículas, badge "disponível"
2. **About** — texto + 4 stat cards com contadores animados (10+ meses, 5+ projetos, 3 produtos, B1)
3. **Learning** — 4 cards "atualmente aprendendo" (React Native, Estruturas de Dados, Clojure, Node/PostgreSQL)
4. **Skills** — grid de ícones Devicon organizados por categoria (Frontend / Backend & Mobile / Ferramentas)
5. **Experience** — timeline vertical com linha dourada (3 itens: Verdes Mares, IC Unifor, Graduação)
6. **Contact** — 4 links (email, LinkedIn, GitHub, Instagram)

### `/projects` — Lista de projetos
- Estilo lista com títulos grandes (como tajmirul.site)
- Preview flutuante ao hover (mockup CSS temático por projeto)
- Dados vindos de `src/data/projects.ts`

### `/projects/:slug` — Página individual do projeto
- Hero do projeto com nome grande + badge de status
- Mockup/preview visual grande
- Descrição completa
- Stack com ícones Devicon
- Desafios enfrentados
- Links (GitHub + live demo se houver)
- Navegação prev/next entre projetos

---

## Dados dos projetos (src/data/projects.ts)
Estrutura de cada projeto:
```ts
{
  slug: string
  title: string
  shortDesc: string      // para a lista
  fullDesc: string       // para a página individual
  role: string           // ex: "Front-End Developer"
  status: 'completed' | 'in-progress'
  year: number
  stack: string[]        // nomes das tecnologias (para Devicon)
  color: string          // cor temática do projeto (hex)
  github: string
  live?: string
  challenges: string[]   // lista de desafios enfrentados
  mockupTheme: string    // classe CSS do mockup
}
```

Projetos iniciais:
1. **StudyHub** — plataforma de estudos (React 19, TypeScript, Tailwind, Zustand, Recharts)
2. **Lectio Divina** — app de leitura espiritual (React, TypeScript, Node.js)
3. **CalTracker** — controle de calorias com back-end em Clojure (Clojure, Ring, JavaScript)

---

## Dados do dono (usar em todo o site)

```
Nome:     Vinícius Dourado
Username: speedyvad
Email:    viniciusdourado020506@gmail.com
LinkedIn: https://www.linkedin.com/in/vinícius-dourado-29a5422b7
GitHub:   https://github.com/speedyvad
Instagram:https://www.instagram.com/douradovini/
Cidade:   Fortaleza, CE, Brasil
Curso:    Ciências da Computação — Unifor (5º semestre, 2024–2027)
```

---

## Componentes obrigatórios

### Cursor.tsx
- Ponto amarelo (9px) que segue o mouse exatamente
- Anel (34px, border amarelo 50%) com delay via requestAnimationFrame
- Escala ao clicar, expande no hover de elementos interativos

### ParticlesBackground.tsx
- Canvas fullscreen, ~50 partículas
- Partículas amarelas com opacidade baixa
- Linhas de conexão quando distância < 120px
- Velocidade lenta e suave

### Navbar.tsx
- Logo "VD." em amarelo, Space Grotesk
- Links: Sobre, Skills, Experiência, Projetos, Contato
- Transição para frosted glass (backdrop-blur-xl, bg-black/80) após 50px de scroll
- Cursor customizado nas âncoras

### ScrollReveal (wrapper component)
- Usa Framer Motion
- fadeUp padrão: opacity 0→1, y 40→0
- duration 0.65s, ease "easeOut"
- threshold 0.15

---

## Convenções de código
- Componentes em PascalCase
- Arquivos de página em `src/pages/`
- Componentes reutilizáveis em `src/components/`
- Dados estáticos em `src/data/`
- Estilos globais em `src/styles/globals.css`
- TypeScript strict, sem `any`
- Framer Motion para TODA animação (não usar CSS keyframes puras)
- Tailwind para layout e espaçamento
- Variáveis CSS para cores (definidas em globals.css)

---

## Comandos úteis
```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # preview do build
```

## Deploy
Vercel — conectar repositório `speedyvad/portfolio` e fazer deploy automático.

---

## Referências visuais
- **brittanychiang.com** — estrutura geral, elegância, sidebar fixa
- **tajmirul.site** — lista de projetos com hover preview, grid de skills com ícones
- Paleta própria: dark + amarelo (não verde como tajmirul, não azul como Brittany)

---

## Assets de mídia

### Estrutura de pastas
```
public/
├── images/
│   ├── profile.jpg              ← foto do Vinícius (headshot)
│   └── projects/
│       ├── studyhub.png         ← screenshot real do projeto
│       ├── lectio-divina.png
│       └── caltracker.png
```

### Foto de perfil (profile.jpg)
- Usada na seção About, ao lado do texto
- Exibir com moldura arredondada + border amarelo sutil
- Se o arquivo não existir ainda, usar placeholder elegante
  com as iniciais "VD" em amarelo sobre fundo bg3

### Imagens de projetos
- Na página individual (/projects/:slug): imagem real em destaque
  acima do dobra, largura total, com overlay escuro + gradiente no rodapé
- Na lista (/projects): usada no hover preview flutuante
  (substituir os mockups CSS quando a imagem existir)
- Se a imagem não existir: manter o mockup CSS temático como fallback
- Sempre usar lazy loading (loading="lazy") e formato otimizado

### Componente de imagem com fallback
Criar `src/components/ProjectImage.tsx`:
- Recebe `src`, `alt`, `fallbackTheme`
- Tenta carregar a imagem real
- Se falhar (onError), renderiza o mockup CSS correspondente
- Transição suave entre os estados

### Dicas pro Vinícius ao tirar screenshot dos projetos
- Resolução mínima: 1280x720px
- Tirar com o browser em modo claro ou escuro, o que ficar mais bonito
- Mostrar a tela mais representativa do projeto (dashboard, lista, etc.)
- Salvar como .png ou .webp para melhor qualidade

---

## Animações — nível máximo (Framer Motion)

Instalar dependências adicionais:
```bash
npm install framer-motion@latest
```

---

### 1. Page Transition — cortina amarela entre rotas
Toda navegação entre páginas deve ter uma cortina amarela que:
- Entra da esquerda cobrindo a tela inteira (duration 0.4s, ease easeInOut)
- Segura 0.1s
- Sai pela direita revelando a nova página (duration 0.4s)

Implementar em `src/components/PageTransition.tsx` usando AnimatePresence do Framer Motion.
Usar `useLocation` do React Router para detectar mudança de rota.

```tsx
// Estrutura base
<AnimatePresence mode="wait">
  <motion.div key={location.pathname}
    initial={{ scaleX: 0, originX: 0 }}
    animate={{ scaleX: 1 }}
    exit={{ scaleX: 0, originX: 1 }}
    style={{ background: '#F5C842', position: 'fixed', inset: 0, zIndex: 9999 }}
  />
</AnimatePresence>
```

---

### 2. Hero Text Scramble — nome embaralha ao carregar
O nome "Vinícius Dourado" deve aparecer com as letras embaralhando
e se reorganizando nos primeiros 1.2s do site.

Implementar `src/hooks/useTextScramble.ts`:
- Começa com caracteres aleatórios (A-Z, símbolos)
- Progressivamente revela as letras corretas da esquerda pra direita
- Cada letra "settle" com um pequeno delay escalonado
- Inspiração: efeito hacker/glitch mas elegante

```ts
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
// Iterar por frames, revelando letra por letra com randomização
```

---

### 3. Magnetic Buttons — botões atraem o cursor
Os botões principais ("Ver projetos", "Entrar em contato") devem
ter efeito magnético: quando o cursor se aproxima até ~80px,
o botão se move suavemente em direção ao cursor.

Implementar `src/components/MagneticButton.tsx`:
```tsx
// Calcular distância cursor → centro do botão
// Se distância < threshold: mover botão (x,y) proporcionalmente
// Usar useMotionValue + useSpring para suavidade
// Ao sair: spring de volta ao centro
const x = useSpring(0, { stiffness: 150, damping: 15 })
const y = useSpring(0, { stiffness: 150, damping: 15 })
```

---

### 4. Project Cards 3D Tilt — inclinação seguindo o mouse
Na lista de projetos e nos cards, ao mover o mouse por cima,
o card inclina em 3D seguindo o cursor (perspectiva realista).

Implementar `src/components/TiltCard.tsx`:
```tsx
// Calcular posição relativa do mouse dentro do card
// rotateX: -15deg a +15deg (eixo Y do mouse)
// rotateY: -15deg a +15deg (eixo X do mouse)
// useSpring com stiffness 300, damping 20
// style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
// Brilho/glare no canto oposto ao mouse (pseudo-elemento ou div overlay)
```

---

### 5. Scroll-Linked Parallax — hero com profundidade
Elementos do hero se movem em velocidades diferentes no scroll:
- Nome: move para cima mais devagar que o scroll (0.3x)
- Badge "disponível": move mais rápido (0.6x)
- Partículas: praticamente não se movem (0.1x)
- Background grid: 0.05x

Usar `useScroll` + `useTransform` do Framer Motion:
```tsx
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, -150])
```

---

### 6. Stagger List — projetos entram em cascata
Na página /projects, cada item da lista entra com delay escalonado:
- Container usa `variants` com `staggerChildren: 0.08`
- Cada item: opacity 0→1, x -30→0
- Total da sequência: ~0.5s

```tsx
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

---

### 7. Counting Numbers — stats animam ao entrar na tela
Os stat cards (10+ meses, 5+ projetos, etc.) devem ter
contadores que sobem de 0 ao valor real quando entram na viewport.

Implementar `src/hooks/useCountUp.ts`:
```ts
// useInView do Framer Motion para detectar entrada
// useMotionValue + useTransform para o número
// animate() de 0 ao target em 1.2s com ease easeOut
// Formato: Math.round(value) + sufixo ('+', '%', etc.)
```

---

### 8. Cursor Trail — rastro de partículas no cursor
O cursor customizado deve deixar um rastro suave de 6-8 pontos
amarelos que seguem com delay progressivo (como uma cobra).

Implementar em `src/components/Cursor.tsx`:
```tsx
// Array de posições com histórico dos últimos N frames
// Cada ponto do trail: menor, mais transparente que o anterior
// useAnimationFrame para update a 60fps
// Pontos: diâmetro de 8px → 2px, opacidade 0.6 → 0.05
```

---

### 9. Smooth Scroll — inércia no scroll da página
Implementar scroll com inércia suave (lerpado) para toda a página,
dando sensação premium de peso e física.

Usar biblioteca `lenis`:
```bash
npm install lenis
```

```tsx
// src/hooks/useLenis.ts
// Inicializar Lenis no App.tsx
// lerp: 0.08 (levemente pesado, premium)
// Integrar com Framer Motion via lenis.on('scroll', ScrollTrigger.update)
```

---

### 10. Hero Text — typing com glitch ocasional
O efeito de digitação das roles ("Front-End Developer", etc.)
deve ter glitches ocasionais: letras erradas que se autocorrigem
antes de continuar digitando.

Modificar o typewriter em `src/hooks/useTypewriter.ts`:
- A cada ~5 caracteres, 20% de chance de digitar errado
- Esperar 80ms
- Apagar a letra errada
- Digitar a correta
- Resultado: parece que alguém está de fato digitando ao vivo

---

### 11. Skills — ícones com hover bounce + tooltip
Cada ícone de tecnologia no grid de skills deve:
- Ao hover: bounce leve (scale 1→1.2→1.05, spring)
- Mostrar tooltip com nome da tech + nível de proficiência
- Tooltip anima de baixo pra cima com spring

```tsx
<motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
```

---

### 12. Timeline — linha que cresce no scroll
A linha vertical da seção de experiência deve crescer
progressivamente conforme o usuário scrolla pela seção.

```tsx
// useScroll com ref do container da timeline
// useTransform: scrollYProgress [0,1] → scaleY [0,1]
// style={{ transformOrigin: 'top', scaleY }}
// Cada ponto da timeline aparece quando a linha chega até ele
```

---

### Ordem de implementação sugerida
1. Lenis (smooth scroll) — base de tudo
2. PageTransition — impacto imediato
3. ScrollReveal padrão (fadeUp) — todas as seções
4. TextScramble + Typewriter com glitch — hero
5. Parallax do hero
6. MagneticButton
7. TiltCard nos projetos
8. Stagger na lista de projetos
9. Timeline animada
10. CountUp nos stats
11. Skills bounce + tooltip
12. Cursor trail