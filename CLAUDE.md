# Dourado Studio — v3 "A jornada"

## O que é este projeto
Site da **Dourado Studio**, o estúdio de Vinícius Dourado (desenvolvedor front-end, Fortaleza, CE).
Objetivo: conduzir o dono de negócio por uma jornada (convite → dor → virada → prova → escolha do caminho)
que termina numa conversa no WhatsApp ou numa simulação de orçamento.
Objetivo secundário: mostrar a trajetória do Vinícius para recrutadores (/sobre).

Público: donos de pequenos e médios negócios, organizadores de cursos e eventos, comunidades.
Não técnicos. A maioria acessa pelo celular.

Diferencial a comunicar sempre: "você fala direto com quem desenha e programa o seu site".

---

## Princípios da v3
1. **Natural, não genérico.** Fotos reais convivendo com elementos do trabalho (cartões de interface,
   mockups, notificações). Nada de efeitos que viraram assinatura de site de IA
   (feixes de luz, holofote, meteoros, gradientes neon, Aceternity UI, Magic UI).
2. **Quatro momentos de impacto, o resto calmo.** Os momentos estão listados na seção "Home".
   Fora deles, movimento só em resposta a ação ou para ajudar a leitura.
3. **O site vende velocidade, então precisa ser rápido.** Orçamento de performance obrigatório (abaixo).
4. **Bater na dor com honestidade.** Só dados com fonte e contas feitas com os números do próprio visitante.
   Sem urgência falsa, sem escassez inventada, sem estatística exagerada.

---

## Stack

Já existentes: React 19, TypeScript strict, Vite, Tailwind v4, React Router v7, Framer Motion, Lenis,
Devicon via CDN (só em /sobre).

Novas (instalar):
```
npm install gsap @gsap/react
npm install embla-carousel-react embla-carousel-autoplay embla-carousel-auto-scroll
npm install ogl
npm install @number-flow/react
npm install @radix-ui/react-accordion @radix-ui/react-tabs
npm install vaul
npm install @phosphor-icons/react
npm install @fontsource-variable/bricolage-grotesque
```
Remover: Archivo (Google Fonts) de todo o projeto.

### Papel de cada biblioteca (não sobrepor)
| Biblioteca | Usar para | Não usar para |
|---|---|---|
| GSAP + ScrollTrigger | cenas ligadas ao scroll (pin, scrub, troca de cor de fundo, parallax) | micro-interações de componente |
| GSAP SplitText | títulos que se montam por linha/palavra (hero e títulos dos capítulos) | texto corrido |
| Framer Motion | hover, AnimatePresence, transições de página, layout animations, simulador | cenas de scroll |
| Lenis | scroll suave global, integrado ao ScrollTrigger | — |
| Embla | carrosséis arrastáveis e faixa contínua de mockups | galeria 3D do hero |
| OGL | galeria curva em WebGL do hero (somente desktop) | qualquer outra coisa |
| NumberFlow | números que mudam: calculadora de perda, estimativa do simulador, faixa de prova | contagens decorativas |
| Radix | Accordion (FAQ), Tabs | — |
| Vaul | gavetas no mobile: menu e resumo do simulador | desktop |
| Phosphor Icons | todos os ícones (peso "regular" ou "light") | — |

Um elemento nunca é animado por GSAP e Framer Motion ao mesmo tempo.

Integração Lenis + GSAP (em um único lugar, src/lib/motion.ts):
```ts
gsap.registerPlugin(ScrollTrigger, SplitText)
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```
Usar `useGSAP()` do @gsap/react em componentes React, sempre com escopo (scope) e limpeza automática.

### Orçamento de performance (obrigatório)
- JavaScript inicial da home: no máximo ~180 KB gzip.
- OGL carregado com `React.lazy` + import dinâmico, só quando: largura ≥ 1024px,
  sem `prefers-reduced-motion` e após o primeiro paint. Fora disso, usar o fallback Embla.
- GSAP/ScrollTrigger/SplitText importados apenas nas páginas que usam.
- Imagens em WebP com `width`/`height` definidos, `loading="lazy"` abaixo da dobra, `sizes` corretos.
- Metas Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1.
- Medir com `npm run build && npm run preview` + Lighthouse ao fim de cada etapa e reportar os números.

---

## Design system

### Paleta (mantida)
```
--white:      #FFFFFF
--sand:       #EFEAE0   capítulo "virada", superfícies de apoio
--sea:        #0E2C3F   texto principal e capítulo "dor"
--sea-soft:   #4B6272   texto secundário
--line:       rgba(14,44,63,0.12)
--gold:       #D9A21B   acento, blocos de prova, botões
--gold-deep:  #8C6410   ouro para texto sobre fundo claro (AA)
--whatsapp:   #25D366   só no botão flutuante
```
Contraste: texto dourado sobre claro = --gold-deep. Botão dourado = fundo --gold, texto --sea.

### Textura
Seções --sand recebem uma textura de papel: ruído SVG (feTurbulence) em overlay, opacidade ~4%,
`pointer-events: none`, gerada em CSS (sem imagem externa).

### Tipografia — Bricolage Grotesque
Fonte: `@fontsource-variable/bricolage-grotesque` (self-hosted, eixos opsz 12–96, wdth 75–100, wght 200–800).
Importar em main.tsx. Pré-carregar o arquivo woff2 no index.html. `font-optical-sizing: auto` no body.
Fallback: `system-ui, sans-serif`.

Papéis:
```
Títulos grandes (hero, capítulos, h2):  wght 400–500, wdth 100, letter-spacing -0.035em, line-height 0.98
Números de prova e preços:               wght 700, wdth 75 (condensado), letter-spacing -0.02em
Wordmark gigante do rodapé:              wght 800, wdth 75
Corpo:                                   wght 400, 18px, line-height 1.6
Labels de interface e botões:            wght 600, 15–16px
```
Escala:
```
display:  clamp(3rem, 8vw, 7.5rem)
h2:       clamp(2.25rem, 5vw, 4.25rem)
h3:       clamp(1.5rem, 2.4vw, 2rem)
lead:     clamp(1.125rem, 1.6vw, 1.375rem)
body:     1.125rem
small:    0.9375rem
```
Regras: títulos LEVES, nunca peso 800 em título de seção. Sentence case. Sem labels em caixa alta
acima dos títulos. Não destacar palavra isolada com outra cor. Texto corrido com max-width ~38rem.

### Layout
- Container 1240px; padding lateral 24px (mobile) / 48px (desktop).
- Cada capítulo da jornada tem cenário próprio (cor de fundo e composição diferentes).
  Evitar repetir "título à esquerda + conteúdo abaixo" em seções seguidas.
- Raios: fotos 24px, cartões de interface 16px, botões 999px.

### Botões
- Primário: pílula --gold, texto --sea, wght 600.
- Secundário: pílula com borda --line (ou branca sobre --sea).
- Texto do botão diz o que acontece. Sem "→" automático.

### Voz
Português do Brasil, "você", frases curtas, resultado para o negócio, sem jargão técnico na home.

---

## Contato e dados existentes
- src/config/contact.ts (whatsappLink, DEFAULT_MESSAGE) — manter.
- src/data/stats.ts, services.ts, faq.ts, projects.ts, pricing.ts, testimonials.ts — são a fonte da verdade.
- src/data/hero.ts (slides de dores) deixa de ser usado no hero; as frases migram para o capítulo da dor
  e para as páginas de serviço. Pode ser removido ao final.

---

## Rotas
```
/                     Home (a jornada)
/servicos/:slug       Página de cada serviço (NOVA nesta versão)
/orcamento            Simulador (já existe — só adaptar à tipografia nova)
/projetos             Projetos
/projetos/:slug       Case
/sobre                Trajetória do Vinícius
/creditos             Créditos de imagens
/raio-x               PAUSADO — manter fora da navegação até ser construído
```
Redirecionamentos /projects → /projetos continuam.

Navegação: Serviços, Projetos, Sobre + botão primário "Simular orçamento".
Menu mobile em gaveta Vaul.

---

## Home — a jornada

### Capítulo 1 — O convite (hero) ★ momento de impacto 1
Fundo branco. Título (display, SplitText por linha com máscara, entrada em ~1s, stagger curto):
**"Seu negócio já é bom. Falta ser encontrado."**
Texto (lead): "A Dourado Studio cria sites, landing pages e sistemas que trazem clientes pelo Google
e pelo WhatsApp. Feito em Fortaleza, por quem você conhece pelo nome."
Botões: "Simular orçamento" (/orcamento) e "Conversar no WhatsApp" (DEFAULT_MESSAGE).

Visual: **galeria curva em WebGL (OGL)** com os prints reais dos projetos (desktop e mobile de
public/images/cases e /projects), dispostos num arco, girando devagar sozinha e respondendo ao
scroll e ao arrasto, com leve curvatura e fade nas bordas. Clicar numa imagem leva ao case.
Referência de técnica: galeria circular em OGL (planos em arco com shader de curvatura).
Fallback (mobile, reduced-motion ou sem WebGL): faixa contínua Embla Auto Scroll de mockups de celular
com os mesmos prints, inclinada levemente, pausando ao toque.

Logo abaixo, faixa de confiança discreta (já existe): clientes + "1.500+ inscritos · 2.218+ respostas · 6 idiomas".

### Capítulo 2 — A dor ★ momento de impacto 2 (parte A)
Fundo --sea. No desktop, cena presa na tela (ScrollTrigger pin, ~250vh): as frases aparecem uma a uma,
cada nova frase empurrando a anterior para opacidade 0.25:
1. "Agora mesmo, alguém está procurando o que você vende."
2. "Pesquisa no Google. Compara. Lê as avaliações."
3. "E compra de quem aparece primeiro."
No mobile: sem pin, as três frases empilhadas com revelação simples ao entrar na tela.

Depois do pin, os dados de mercado de src/data/stats.ts (93% protagonista; 96% e 53% lado a lado),
com fontes visíveis. Números com NumberFlow ao entrar na tela.

### Capítulo 3 — A calculadora de perda ★ momento de impacto 3
Ainda em --sea. Título h2: "Quanto você deixa na mesa sem ser encontrado?"
Entradas (grandes, fáceis no celular):
- "Quanto vale um cliente para você?" — campo em R$ (ticket médio), máscara de moeda pt-BR, padrão vazio.
- "Quantos clientes a mais por mês seriam realistas?" — slider 1 a 10, padrão 2.
Saídas com NumberFlow, atualizando ao digitar:
- "Por mês: R$ {ticket × clientes}"
- "Por ano: R$ {ticket × clientes × 12}"
- "Uma landing page começa em R$ 800. Ela se paga com {ceil(800 / ticket)} cliente(s)."
  (pluralizar corretamente; se ticket ≥ 800, "com o primeiro cliente")
Texto pequeno obrigatório: "Simulação feita com os seus números. Não é promessa de resultado."
Botão: "Simular o orçamento do meu site" → /orcamento.
Sem nenhum dado inventado de conversão.

### Transição — a tela clareia ★ momento de impacto 2 (parte B)
Ao sair da calculadora, o fundo interpola de --sea para --sand com ScrollTrigger scrub
(a página literalmente clareia), e o texto inverte de branco para --sea no mesmo ritmo.
No centro, surge o título do capítulo 4. Reduced motion: troca direta de seção.

### Capítulo 4 — A virada
Fundo --sand com textura. Título (h2, SplitText): **"Dá pra mudar isso."**
Três cenas foto + interface (técnica de composição: foto real com cartões flutuando por cima):
1. Foto modelos/barbearia/hero.webp + cartão de notificação do WhatsApp
   ("Oi! Vi o site de vocês. Tem horário no sábado?") + cartão de resultado do Google
   ("Barbearia do Bairro · ★ 4,9 · Aberto agora").
   Legenda: "Quem procura, encontra. E já chega querendo marcar."
2. Foto servicos/curso-evento.webp + cartão "Nova inscrição · Turma de sábado" + contador de vagas.
   Legenda: "As inscrições chegam organizadas, sem ninguém perguntar o horário de novo."
3. Foto servicos/sistema-sob-medida.webp + cartão de painel ("Mensagem gerada em 3 s · Copiar").
   Legenda: "O que tomava a tarde agora leva segundos."
Os cartões são HTML/CSS (não imagens), estilo de interface real, com sombra suave; entram com stagger
e têm parallax leve (GSAP scrub, deslocamento máx. 40px). Layout alternado e assimétrico entre as cenas.
Os nomes nos cartões são fictícios e genéricos (nunca marcas reais).

### Capítulo 5 — A prova
Fundo branco.
- Três blocos de cor --gold (texto --sea), números grandes condensados com NumberFlow:
  "1.500+ inscritos na aula inaugural" · "2.218+ respostas em 6 idiomas" · "3 projetos no ar para clientes".
- Vitrines dos cases (já existem), mantendo DeviceMockup.
- Depoimentos (componente existente, só aparece com dados).

### Capítulo 6 — Qual é o seu caso? ★ momento de impacto 4
Fundo --sea ou branco (escolher o que contrastar melhor com os vizinhos).
Título h2: "Qual é o seu caso?"
Carrossel Embla arrastável (snap, mostra ~1.15 cartão no mobile e ~2.5 no desktop, setas + barra de progresso):
quatro "portas", cada uma um cartão alto com foto, frase na voz do cliente, nome do serviço e "a partir de":
1. "Quero ser encontrado no Google" → Site institucional → /servicos/site-institucional
2. "Quero vender um curso ou evento" → Página de curso ou evento → /servicos/pagina-de-curso-ou-evento
3. "Quero vender um produto ou serviço" → Landing page → /servicos/landing-page
4. "Minha equipe perde tempo com tarefas repetidas" → Sistema sob medida → /servicos/sistema-sob-medida
Hover/toque: foto aproxima levemente, cartão sobe 4px. Clicar abre a página do serviço.

### Capítulo 7 — Como funciona
Etapas existentes + foto about/vinicius-conversando.jpg (se existir).

### Capítulo 8 — Quem faz
Seção existente.

### Capítulo 9 — Perguntas frequentes
Migrar o accordion para Radix Accordion (mantendo o visual).

### Capítulo 10 — Fechamento
CTA final com fortaleza/horizonte-beira-mar.webp e sobreposição --sea (contraste AA).
Rodapé com wordmark **"Dourado Studio"** gigante (wght 800, wdth 75) ocupando a largura do container,
parcialmente cortado pela borda inferior da página, cor --sea a 8% sobre branco.

### Botão flutuante do WhatsApp
Regras existentes mantidas (some sobre CTA final e rodapé; oculto em /orcamento).

---

## Páginas de serviço — /servicos/:slug

Template único alimentado por src/data/services.ts. Adicionar a cada serviço:
`title`, `heroImage`, `painLines[3]`, `beforeAfter[3]`, `faq[]`, `caseSlug | null`.

Estrutura da página:
1. **Hero** (branco): título (display, SplitText) + foto grande (heroImage) com um cartão de interface
   flutuando por cima, "a partir de R$ X", prazo, botões "Simular orçamento" (/orcamento?tipo={slug})
   e "Conversar no WhatsApp" (message do serviço).
2. **A dor** (--sea): as três painLines em sequência, grandes.
3. **O que muda** (--sand + textura): três pares Antes/Depois lado a lado, o "depois" em destaque.
4. **O que vem incluso** (branco): deliverables + prazo + manutenção opcional.
5. **Calculadora de perda compacta** (reutilizar o componente do capítulo 3).
6. **Prova**: case de caseSlug com DeviceMockup; se null, faixa com os cases de cliente.
7. **Como funciona** (componente compartilhado).
8. **Perguntas** específicas (Radix Accordion).
9. **CTA final** (componente compartilhado).
SEO: useSEO com título "{nome do serviço} em Fortaleza — Dourado Studio" e description própria.

Conteúdo:

```ts
'landing-page': {
  title: 'Você tem o que vender. Falta uma página que venda por você.',
  heroImage: '/images/servicos/landing-page.webp',
  painLines: [
    'Seu link na bio leva para um perfil cheio de posts antigos.',
    'Quem chega não entende rápido o que você oferece nem quanto custa.',
    'E vai embora sem mandar mensagem.'
  ],
  beforeAfter: [
    { before: 'Explicar tudo de novo para cada pessoa no direct', after: 'Uma página que responde as dúvidas antes da conversa' },
    { before: 'Divulgação que leva para lugar nenhum', after: 'Um endereço próprio para anúncios, bio e QR code' },
    { before: 'Cliente que desiste no meio do caminho', after: 'Um botão que leva direto para o seu WhatsApp' }
  ],
  faq: [
    { q: 'Posso usar a página em anúncios?', a: 'Sim. Ela é feita para receber tráfego de anúncios, da bio e de QR codes.' },
    { q: 'Consigo mudar a oferta depois?', a: 'Sim. Ajustes de texto e preço entram na manutenção mensal.' },
    { q: 'Preciso de domínio?', a: 'Eu cuido do registro. O domínio .com.br custa em torno de R$ 40 por ano, no seu nome.' }
  ],
  caseSlug: 'imersao-coreia'
},
'pagina-de-curso-ou-evento': {
  title: 'Seu curso merece mais do que um link na bio.',
  heroImage: '/images/servicos/curso-evento.webp',
  painLines: [
    'As inscrições chegam espalhadas entre direct, WhatsApp e planilha.',
    'Cada pessoa pergunta a mesma coisa: horário, valor, onde é.',
    'E o evento enche menos do que poderia.'
  ],
  beforeAfter: [
    { before: 'Inscrições espalhadas em vários lugares', after: 'Todas as inscrições organizadas num só lugar' },
    { before: 'Responder as mesmas perguntas o dia inteiro', after: 'Programação, valores e local claros na página' },
    { before: 'Divulgação que esfria depois do primeiro post', after: 'Contagem regressiva e link fácil de compartilhar' }
  ],
  faq: [
    { q: 'Dá para receber as inscrições numa planilha?', a: 'Sim. As respostas chegam organizadas para você acompanhar.' },
    { q: 'Funciona para evento online e presencial?', a: 'Funciona para os dois, com as informações de cada formato.' },
    { q: 'Posso reaproveitar a página na próxima turma?', a: 'Sim. Atualizar datas e programação é rápido.' }
  ],
  caseSlug: 'imersao-coreia'
},
'site-institucional': {
  title: 'Quem procura sua empresa no Google precisa te encontrar.',
  heroImage: '/images/servicos/site-institucional.webp',
  painLines: [
    'Seu cliente pesquisa antes de comprar.',
    'Se não encontra a sua empresa, encontra o concorrente.',
    'E se encontra um site antigo, desconfia.'
  ],
  beforeAfter: [
    { before: 'Invisível nas buscas da sua região', after: 'Presente quando procuram o que você faz' },
    { before: 'Um site que passa insegurança', after: 'Um site que passa a confiança que sua empresa já tem' },
    { before: 'Contato difícil de achar', after: 'WhatsApp, telefone e mapa a um toque' }
  ],
  faq: [
    { q: 'Quantas páginas o site tem?', a: 'Até 6 no pacote base. Dá para ampliar no simulador de orçamento.' },
    { q: 'Vou aparecer no Google?', a: 'O site sai com a base de SEO configurada. A posição nas buscas também depende de conteúdo e tempo.' },
    { q: 'Vocês escrevem os textos?', a: 'Organizamos os textos com você. Se precisar de ajuda maior, isso entra como extra.' }
  ],
  caseSlug: null
},
'sistema-sob-medida': {
  title: 'Sua equipe não deveria passar a tarde copiando e colando.',
  heroImage: '/images/servicos/sistema-sob-medida.webp',
  painLines: [
    'Tarefas repetidas tomam horas que deveriam ir para o cliente.',
    'Cada pessoa faz de um jeito, e os erros aparecem.',
    'As planilhas se multiplicam e ninguém sabe qual é a certa.'
  ],
  beforeAfter: [
    { before: 'Mensagens montadas à mão, uma por uma', after: 'Mensagens geradas em segundos, sem erro de dado' },
    { before: 'Cada pessoa trabalhando de um jeito', after: 'Um padrão para a equipe inteira' },
    { before: 'Dados espalhados em planilhas', after: 'Tudo num painel com login e níveis de acesso' }
  ],
  faq: [
    { q: 'Como sei se o meu processo dá para automatizar?', a: 'Se é repetido e segue regras, quase sempre dá. Começamos com uma conversa sobre como ele funciona hoje.' },
    { q: 'Quanto custa?', a: 'Depende do processo. O valor vem por escrito na proposta, depois do levantamento.' },
    { q: 'Minha equipe vai conseguir usar?', a: 'O sistema é desenhado em cima da rotina de vocês, e a entrega inclui suporte inicial.' }
  ],
  caseSlug: 'closr'
}
```

---

## Páginas existentes — ajustes
- /orcamento: aplicar a tipografia nova; estimativa ao vivo com NumberFlow; resumo no mobile em gaveta Vaul.
- /projetos e /projetos/:slug: tipografia nova; hover preview mantido.
- /sobre: tipografia nova; cursor e partículas continuam só aqui.

---

## Imagens
```
cases/*-desktop.png, *-mobile.png      prints dos projetos (galeria do hero e vitrines)
servicos/landing-page.webp             hero da página de serviço e porta do capítulo 6
servicos/curso-evento.webp             idem + cena 2 da virada
servicos/site-institucional.webp       idem
servicos/sistema-sob-medida.webp       idem + cena 3 da virada
modelos/barbearia/hero.webp            cena 1 da virada
fortaleza/horizonte-beira-mar.webp     CTA final
about/vinicius-conversando.jpg         como funciona
about/vinicius-trabalhando.jpg         quem faz
hero/dor-*.webp                        não são mais usadas no hero (podem ficar como acervo)
```
Toda imagem com alt em português e fallback elegante (bloco --sand) se não existir.
Imagens gratuitas do Freepik: registrar autor em src/data/credits.ts.

---

## SEO
Hook useSEO existente em todas as rotas. JSON-LD ProfessionalService no index.html (mantido).
Home: "Dourado Studio — Criação de sites e landing pages em Fortaleza".

## Qualidade mínima
Mobile-first (375, 768, 1280, 1440). Foco visível (outline 2px --gold). Contraste AA.
`prefers-reduced-motion`: sem pin, sem scrub, sem WebGL, sem SplitText — conteúdo direto.
Todo carrossel navegável por teclado e com rótulos acessíveis.

## Etapas de implementação
- **Etapa A — Fundação:** branch `redesign-v3`, bibliotecas, src/lib/motion.ts, Bricolage, remoção do Archivo,
  textura, orçamento de performance medido.
- **Etapa B — Jornada parte 1:** capítulos 1 a 4 (convite, dor, calculadora, clareamento, virada).
- **Etapa C — Jornada parte 2:** capítulos 5 a 10, rodapé com wordmark, Radix no FAQ.
- **Etapa D — Páginas de serviço** + ajustes de /orcamento, /projetos e /sobre.

## Comandos
```
npm run dev
npm run build
npm run preview
npm test
```
PowerShell não aceita `&&`: rodar comandos git um por vez.