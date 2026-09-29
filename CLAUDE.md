# Dourado Studio — site comercial + portfólio

## O que é este projeto
Site da **Dourado Studio**, o estúdio de Vinícius Dourado (desenvolvedor front-end, Fortaleza, CE).
Objetivo principal: transformar donos de negócio em conversas no WhatsApp.
Objetivo secundário: mostrar a trajetória do Vinícius para recrutadores (página /sobre).

Público da home: donos de pequenos e médios negócios, organizadores de cursos e eventos,
comunidades e organizações. Pessoas que NÃO são técnicas. A maioria acessa pelo celular.

Diferencial a comunicar sempre: "você fala direto com quem desenha e programa o seu site".

---

## Stack (não mudar sem perguntar)
- React 19 + TypeScript strict + Vite
- Tailwind CSS v4
- Framer Motion
- React Router v7
- Lenis (smooth scroll)
- Devicon via CDN (somente na página /sobre)
- Não adicionar bibliotecas novas sem perguntar. Carrossel, accordion e SEO por página
  devem ser feitos com código próprio + Framer Motion.

---

## Design system

### Paleta (tokens em src/styles/globals.css)
```
--white:      #FFFFFF   fundo principal
--sand:       #EFEAE0   superfícies secundárias, hover de linhas, blocos de apoio (areia das dunas)
--sea:        #0E2C3F   cor do texto principal e das faixas escuras (azul-mar de Fortaleza)
--sea-soft:   #4B6272   texto secundário
--line:       rgba(14,44,63,0.12)  bordas e divisórias
--gold:       #D9A21B   acento de marca: botões, linhas de destaque, números
--gold-deep:  #8C6410   ouro para TEXTO sobre fundo claro (contraste AA)
--whatsapp:   #25D366   usado SOMENTE no botão flutuante do WhatsApp
```
Regras de contraste:
- Nunca usar --gold para texto pequeno sobre branco. Texto dourado em fundo claro = --gold-deep.
- Botão dourado: fundo --gold, texto --sea.
- Em faixas --sea, texto branco; números/destaques podem ser --gold.

### Tipografia
- Família única: **Archivo** (Google Fonts, variável com eixos wght e wdth)
  `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap`
- Títulos: Archivo expandida (`font-stretch: 125%`), peso 800, `letter-spacing: -0.02em`, `line-height: 0.95`
- Corpo: Archivo largura normal (100%), peso 400, 18px, `line-height: 1.6`
- Fallback: `system-ui, sans-serif`

Escala:
```
display (hero):   clamp(2.75rem, 7vw, 6.5rem)
h2 (seções):      clamp(2.25rem, 5vw, 4.5rem)
h3:               clamp(1.5rem, 2.5vw, 2.25rem)
lead:             clamp(1.125rem, 1.6vw, 1.375rem)
body:             1.125rem
small:            0.9375rem
```
- Linhas de texto corrido com no máximo ~70 caracteres (`max-width: 38rem`).
- Sentence case em tudo. NADA de labels em caixa alta acima dos títulos.
- Não destacar uma única palavra do título com outra cor ou itálico.

### Layout
- Container: `max-width: 1240px`, padding lateral 24px (mobile) / 48px (desktop)
- Espaçamento vertical generoso entre seções: 8rem desktop / 5rem mobile
- Alinhamento à esquerda como padrão. Centralizar apenas o CTA final.
- Raios: fotos e mockups 20px; botões 999px (pílula); inputs 12px. Não usar o mesmo raio em tudo.
- Evitar grades de cards idênticos. Serviços são LINHAS, cases são VITRINES grandes alternadas.

### Movimento
- O momento memorável do site é o **carrossel do hero**. O resto é calmo.
- Não aplicar fade-up automático em toda seção. Entradas animadas só onde ajudam a leitura
  (contagem dos números na faixa de dados, linha dourada do processo).
- Movimento em resposta a ação é bem-vindo: accordion do FAQ, hover das linhas de serviço, menu mobile.
- Respeitar `prefers-reduced-motion`: sem autoplay, sem zoom, transições instantâneas.
- Lenis e PageTransition continuam globais. A cortina de transição passa a ser --sea com uma linha --gold.
- Cursor customizado e partículas ficam SOMENTE na página /sobre.

### Botões e links
- Primário: pílula --gold, texto --sea, peso 700. Ex.: "Falar no WhatsApp"
- Secundário: pílula com borda --line, texto --sea
- Texto do botão diz exatamente o que acontece. Não anexar "→" em todo botão.

---

## Marca
- Nome: **Dourado Studio**
- Wordmark: "Dourado" em Archivo expandida 800 + "Studio" em Archivo 400, cor --sea,
  com um pequeno traço horizontal --gold antes do nome (a "linha do horizonte")
- Assinatura no rodapé: "Dourado Studio · por Vinícius Dourado · Fortaleza, CE"
- Favicon: traço dourado + "D" em --sea sobre branco (atualizar public/favicon.svg)

### Voz
- Português do Brasil, fala com "você", direta e próxima.
- Fala de resultado para o negócio, não de tecnologia. Na home não aparecem nomes como React ou TypeScript.
- Frases curtas. Verbos simples. Sem jargão ("conversão" pode, "SPA" não).

---

## Contato (src/config/contact.ts)
```ts
export const WHATSAPP_NUMBER = '5585982116585'
export const EMAIL = 'viniciusdourado020506@gmail.com'
export const INSTAGRAM = 'https://www.instagram.com/douradovini/'
export const LINKEDIN = 'https://www.linkedin.com/in/vinícius-dourado-29a5422b7'
export const GITHUB = 'https://github.com/speedyvad'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
export const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um projeto.'
```
Todo CTA de WhatsApp usa `whatsappLink()` com uma mensagem específica do contexto.

---

## Rotas
```
/                     Home comercial
/sobre                Trajetória do Vinícius (conteúdo da antiga home, com o novo tema)
/projetos             Todos os projetos (clientes + autorais)
/projetos/:slug       Case individual
/servicos/:slug       Página de cada serviço            (Fase 2)
/modelos              Modelos por nicho (demonstrações) (Fase 2)
```
Redirecionamentos obrigatórios (links antigos já foram divulgados no LinkedIn):
```
/projects        → /projetos
/projects/:slug  → /projetos/:slug
```

---

## Home — estrutura

### 1. Navegação
Wordmark à esquerda. Links: Serviços (âncora), Projetos, Sobre. Botão primário "Falar no WhatsApp".
Fundo branco; ganha borda --line inferior após 24px de scroll. Menu mobile em tela cheia.

### 2. Hero — carrossel de dores (o momento memorável)
Foto de fundo em tela cheia (altura 100svh no desktop, 88svh no mobile), sobreposição em
gradiente --sea (de 85% no canto inferior esquerdo para 20% no superior direito).
Título gigante em branco, subtítulo, botão primário que abre o WhatsApp com a mensagem do slide,
botão secundário (borda branca) "Ver projetos".

Comportamento:
- Troca a cada 7s. Pausa no hover, no foco e quando a aba não está visível.
- Imagem: crossfade 0.9s + zoom lento de 1.00 para 1.06 durante o slide.
- Texto: título entra por máscara, linha a linha, de baixo para cima.
- Indicador: 4 segmentos horizontais no rodapé do hero; o segmento ativo se preenche em --gold
  durante os 7s (a linha do horizonte). Clicar num segmento vai para o slide.
- Swipe no mobile. Setas acessíveis por teclado. `aria-roledescription="carousel"`.
- Reduced motion: sem autoplay, sem zoom.

Slides (src/data/hero.ts):
```ts
[
  {
    image: '/images/hero/dor-google.jpg',
    title: 'Quando procuram o que você vende, quem aparece é o concorrente.',
    text: 'Um site rápido e bem feito coloca sua empresa no Google e no caminho de quem já quer comprar.',
    cta: 'Quero aparecer no Google',
    message: 'Olá! Vim pelo site da Dourado Studio e quero que minha empresa apareça no Google.'
  },
  {
    image: '/images/hero/dor-curso.jpg',
    title: 'Seu curso merece mais do que um link na bio.',
    text: 'Uma página de inscrição explica tudo, organiza as vagas e deixa o seu direct livre.',
    cta: 'Quero uma página para meu curso',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma página para meu curso ou evento.'
  },
  {
    image: '/images/hero/dor-planilha.jpg',
    title: 'Sua equipe passa o dia copiando e colando?',
    text: 'Um sistema sob medida faz em segundos o que hoje toma a tarde inteira.',
    cta: 'Quero automatizar um processo',
    message: 'Olá! Vim pelo site da Dourado Studio e quero automatizar um processo da minha empresa.'
  },
  {
    image: '/images/hero/dor-site-antigo.jpg',
    title: 'Seu site ficou menor que a sua empresa.',
    text: 'Visual novo, carregamento rápido e textos claros para passar a confiança que o seu negócio já tem.',
    cta: 'Quero renovar meu site',
    message: 'Olá! Vim pelo site da Dourado Studio e quero renovar o site da minha empresa.'
  }
]
```

### 2.5 Faixa de confiança (logo abaixo do hero)
Uma linha discreta, fundo branco, texto --sea-soft:
"Projetos no ar para a Comunidade Católica Shalom, o curso Imersão Coreia e corretoras de seguros."
Em seguida, três números lado a lado em Archivo expandida: "1.500+ inscritos", "2.218+ respostas", "6 idiomas".
Uso da marca Shalom autorizado pelo cliente.

### 3. Faixa de dados (fundo --sea)
Cada dado é uma FRASE grande, não um card. O número faz parte da frase, em --gold, e é o único
elemento com contagem animada. Abaixo de cada frase, a fonte em texto pequeno (branco 60%), com link.
Empilhadas verticalmente, alinhadas à esquerda, com bastante respiro.

src/data/stats.ts:
```ts
[
  {
    value: 93, suffix: '%',
    sentence: '{n} dos consumidores pesquisam na internet antes de decidir uma compra.',
    source: 'State of Search Brasil — Hedgehog Digital e Opinion Box',
    url: 'https://www.m9publicidade.com.br/93-dos-consumidores-pesquisam-online-antes-de-fazer-uma-compra/'
  },
  {
    value: 9, suffix: ' em cada 10',
    sentence: '{n} brasileiros pesquisam em cerca de seis canais antes de escolher onde comprar.',
    source: 'Estudo Offerwise encomendado pelo Google, divulgado pelo Sebrae',
    url: 'https://sebrae.com.br/sites/PortalSebrae/conteudos/posts/a-pesquisa-virtual-e-cada-vez-mais-presente-na-jornada-do-cliente,5673ad4496e47810VgnVCM1000001b00320aRCRD'
  },
  {
    value: 96, suffix: '%',
    sentence: '{n} leem avaliações no Google antes de escolher uma loja física.',
    source: 'Decisão Local 2025 — Harmo e Reclame AQUI',
    url: 'https://exame.com/bussola/96-dos-consumidores-checam-avaliacoes-antes-de-escolher-uma-loja-fisica/'
  },
  {
    value: 53, suffix: '%',
    sentence: '{n} das visitas no celular são abandonadas quando a página demora mais de 3 segundos.',
    source: 'Google',
    url: 'https://support.google.com/adsense/answer/7450973?hl=pt-BR'
  }
]
```
Fechamento da faixa (texto branco, tamanho lead): "Estar online deixou de ser opcional. A questão é
como a sua empresa aparece quando alguém procura."

### 4. Serviços (âncora #servicos)
Título: "O que dá para construir para a sua empresa"
Lista em LINHAS separadas por --line (não cards). Cada linha, no desktop, em 3 colunas:
[nome do serviço em h3 expandido] [para quem + o que faz pelo negócio] [a partir de R$ X + botão WhatsApp].
Hover: fundo --sand ocupando a linha inteira, transição suave.
No mobile, as colunas empilham.

src/data/services.ts:
```ts
[
  {
    slug: 'landing-page',
    name: 'Landing page',
    forWho: 'Para quem quer vender um produto, serviço ou campanha específica.',
    value: 'Uma página única, focada em levar o visitante até o seu WhatsApp.',
    deliverables: ['Página responsiva', 'Botão direto para o WhatsApp', 'SEO básico', 'Publicação e domínio configurados'],
    priceFrom: 800,
    deadline: '7 a 10 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma landing page.'
  },
  {
    slug: 'pagina-de-curso-ou-evento',
    name: 'Página de curso ou evento',
    forWho: 'Para professores, palestrantes, igrejas e organizadores.',
    value: 'Explica a programação, apresenta quem ensina e organiza as inscrições num só lugar.',
    proof: 'A página da Imersão Coreia reuniu mais de 1.500 inscritos para uma aula de nicho.',
    deliverables: ['Programação e palestrantes', 'Inscrição integrada', 'Contagem regressiva', 'Compartilhamento otimizado'],
    priceFrom: 1000,
    deadline: '10 a 15 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma página para meu curso ou evento.'
  },
  {
    slug: 'site-institucional',
    name: 'Site institucional',
    forWho: 'Para empresas que precisam passar credibilidade e ser encontradas.',
    value: 'Várias páginas apresentando a empresa, os serviços e as formas de contato.',
    deliverables: ['Até 6 páginas', 'Textos organizados com você', 'SEO para buscas locais', 'Integração com Google Maps e WhatsApp'],
    priceFrom: 1800,
    deadline: '15 a 25 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero um site institucional.'
  },
  {
    slug: 'sistema-sob-medida',
    name: 'Sistema sob medida',
    forWho: 'Para equipes que dependem de planilhas e tarefas repetitivas.',
    value: 'Uma ferramenta feita para o seu processo, com login, painel e dados organizados.',
    deliverables: ['Levantamento do processo', 'Painel com login', 'Níveis de acesso', 'Publicação e suporte inicial'],
    priceFrom: null,          // exibir "sob consulta"
    deadline: 'Definido na proposta',
    message: 'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um sistema sob medida.'
  }
]
```
Quando o serviço tiver o campo `proof`, exibir essa frase abaixo do texto de valor, em --gold-deep,
com um link discreto para o case correspondente.

Abaixo da lista, texto pequeno: "Manutenção mensal disponível para todos os projetos: hospedagem,
ajustes e suporte." (preço combinado na conversa)

### 5. Projetos que já estão no ar
Título: "Projetos que já estão no ar"
Vitrines grandes, lado alternado a cada case. De um lado, o componente DeviceMockup
(notebook com o print desktop + celular sobreposto com o print mobile). Do outro:
cliente e segmento, o problema em uma frase, os resultados em destaque (números grandes em --gold-deep),
botões "Ver case" (vai para /projetos/:slug) e "Abrir site" (nova aba).
Mostrar os 3 cases de cliente: Imersão Coreia, Enquete da Juventude Shalom, Closr.
Link ao final: "Ver todos os projetos".

### 6. Como funciona (é uma sequência, então numerar faz sentido)
4 etapas em linha horizontal no desktop, ligadas por uma linha --gold que se desenha ao entrar na tela:
1. Conversa — você conta o que precisa pelo WhatsApp.
2. Proposta — escopo, prazo e valor por escrito.
3. Construção — você acompanha e aprova cada etapa.
4. No ar — site publicado, com domínio e suporte inicial.
No mobile, vertical.

### 7. Quem faz
Foto /images/about/vinicius-trabalhando.jpg (raio 20px, sem filtro), ao lado:
"A Dourado Studio é o estúdio de Vinícius Dourado, desenvolvedor front-end em Fortaleza, com
experiência no Sistema Verdes Mares. Você fala direto com quem desenha e programa o seu site,
sem intermediários."
Link secundário: "Conhecer minha trajetória" → /sobre

### 8. Perguntas frequentes (accordion)
src/data/faq.ts:
- Quanto custa um site? → Landing pages a partir de R$ 800 e sites institucionais a partir de R$ 1.800. O valor final depende do número de páginas e funcionalidades e vem por escrito na proposta.
- Quanto tempo leva? → De 7 dias úteis para uma landing page a cerca de 25 para um site institucional. Sistemas têm prazo definido na proposta.
- Preciso ter domínio e hospedagem? → Não. Eu cuido do registro do domínio e da publicação. O domínio .com.br custa em torno de R$ 40 por ano, pago diretamente no Registro.br em seu nome.
- Vou conseguir atualizar o site depois? → Sim. Pequenos ajustes entram na manutenção mensal; mudanças maiores são orçadas à parte.
- O site aparece no Google? → Todo projeto sai com a base de SEO configurada: títulos, descrições, velocidade e versão mobile. Aparecer bem nas buscas também depende de conteúdo e tempo.
- Você atende fora de Fortaleza? → Sim, o atendimento é todo online, para qualquer cidade do Brasil.
Uma pergunta aberta por vez. Animação de altura com Framer Motion.

### 9. CTA final (fundo --sea, centralizado)
Título: "Vamos colocar a sua empresa no lugar onde os clientes procuram."
Botão primário "Falar no WhatsApp" (DEFAULT_MESSAGE). Abaixo, e-mail em texto.

### 10. Rodapé
Wordmark, links (Serviços, Projetos, Sobre), contatos (WhatsApp, e-mail, Instagram, LinkedIn),
"Fortaleza, CE · Atendimento para todo o Brasil", assinatura da marca, ano.

### Botão flutuante do WhatsApp (global)
Círculo 56px --whatsapp com ícone branco, canto inferior direito, respeitando safe-area.
Aparece depois que o usuário passa do hero (na home) ou imediatamente nas outras páginas.
Tooltip no hover do desktop: "Fale com o estúdio". Usa DEFAULT_MESSAGE.

---

## Projetos (src/data/projects.ts)

Estender o tipo existente, mantendo compatibilidade:
```ts
type ProjectKind = 'cliente' | 'autoral' | 'modelo'
interface Project {
  // campos existentes: slug, title, shortDesc, fullDesc, role, status, year, stack,
  // color, github?, live?, challenges, mockupTheme
  kind: ProjectKind
  client?: string
  segment?: string
  problem?: string          // uma frase
  metrics?: { value: string; label: string }[]
  images?: { desktop: string; mobile?: string }
}
```

Novos cases de cliente (vêm primeiro):
```ts
{
  slug: 'imersao-coreia',
  title: 'Imersão Coreia',
  kind: 'cliente',
  client: 'Curso Imersão Coreia — Comunidade Católica Shalom',
  segment: 'Educação e eventos',
  problem: 'Divulgar uma aula inaugural gratuita e ao vivo e captar inscrições para um curso de 10 meses de preparação para a JMJ Seul 2027.',
  shortDesc: 'Landing page de inscrição para a aula inaugural de um curso de língua e cultura coreana.',
  fullDesc: 'Página de captação para a aula inaugural do Imersão Coreia, curso de 10 meses de língua, cultura e história coreana em preparação para a Jornada Mundial da Juventude em Seul, 2027. A página apresenta a programação da noite, a participação ao vivo direto da Coreia, a professora do curso e leva o visitante até a inscrição, com uma identidade visual inspirada no Hangeul.',
  role: 'Design e desenvolvimento',
  status: 'completed',
  year: 2025,
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  live: 'https://cursoimersaocoreia.vercel.app',
  metrics: [
    { value: '1.500+', label: 'inscritos na aula inaugural' },
    { value: '1', label: 'página, do anúncio à inscrição' },
    { value: '100%', label: 'online e responsiva' }
  ],
  images: { desktop: '/images/cases/imersao-coreia-desktop.png', mobile: '/images/cases/imersao-coreia-mobile.png' },
  challenges: [
    'Traduzir a identidade coreana (Hangeul) em um visual leve para um público jovem',
    'Conduzir o visitante da curiosidade até a inscrição em uma única página',
    'Carregamento rápido no celular, onde está a maior parte do público'
  ],
  color: '#C0392B',
  mockupTheme: 'mock-coreia'
},
{
  slug: 'enquete-juventude-shalom',
  title: 'Enquete da Juventude Shalom',
  kind: 'cliente',
  client: 'Assessoria Jovem — Comunidade Católica Shalom',
  segment: 'Comunidades e organizações',
  problem: 'Ouvir jovens de missões espalhadas pelo mundo e transformar as respostas em informação para o conselho da comunidade.',
  shortDesc: 'Plataforma de enquete em 6 idiomas com ranking de participação entre missões em tempo real.',
  fullDesc: 'Enquete rápida (4 perguntas, cerca de 3 minutos) para ouvir os desafios dos jovens da Comunidade Shalom no mundo todo. Disponível em 6 idiomas, com contador de respostas ao vivo e um ranking entre missões que premia a proporção de jovens mobilizados, não o tamanho da missão. As respostas são consolidadas pela assessoria jovem e levadas ao Conselho Geral.',
  role: 'Design e desenvolvimento full-stack',
  status: 'completed',
  year: 2025,
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  live: 'https://enquete-shalom.vercel.app',
  metrics: [
    { value: '2.218+', label: 'respostas' },
    { value: '6', label: 'idiomas' },
    { value: 'Ao vivo', label: 'ranking entre missões' }
  ],
  images: { desktop: '/images/cases/enquete-shalom-desktop.png', mobile: '/images/cases/enquete-shalom-mobile.png' },
  challenges: [
    'Interface em 6 idiomas (PT, ES, EN, FR, IT, PL) com a mesma experiência',
    'Ranking justo entre missões de tamanhos diferentes, calculado pela proporção de participação',
    'Contador e atividade em tempo real para estimular novas respostas',
    'Garantir uma resposta por pessoa sem expor os dados de quem respondeu'
  ],
  color: '#1F6FB2',
  mockupTheme: 'mock-enquete'
}
```
Closr: marcar `kind: 'cliente'`, `segment: 'Corretoras de seguros'`, adicionar
`problem` e `images: { desktop: '/images/cases/closr-desktop.png', mobile: '/images/cases/closr-mobile.png' }`
(manter fallback para /images/projects/closr.png).
StudyHub, Lectio Divina e CalTracker: `kind: 'autoral'`.

Página /projetos: duas seções — "Para clientes" e "Projetos autorais".
Manter o hover preview flutuante, adaptado ao tema claro.

### DeviceMockup
Componente em CSS puro: moldura de notebook (tela 16:10, base fina) e celular (raio 36px, notch)
sobreposto no canto inferior direito. Imagens com `loading="lazy"` e `object-fit: cover; object-position: top`.
Se a imagem não carregar: bloco --sand com o nome do projeto em Archivo expandida.

---

## Página /sobre
Reaproveitar o conteúdo da home antiga (sobre, aprendendo agora, stack, experiência, contato)
adaptado à nova paleta clara. Aqui ficam as animações mais expressivas já existentes:
TextScramble no nome, Typewriter, TiltCard, CountUp, MagneticButton, timeline que cresce,
cursor customizado e partículas (partículas em --gold com opacidade baixa sobre branco).
Remover do cursor/partículas qualquer cor amarela antiga (#F5C842) e usar os tokens novos.
Botão de download do CV continua (public/cv-vinicius-dourado.pdf).

---

## SEO
Hook próprio `useSEO({ title, description, path })` que atualiza document.title, meta description,
og:title, og:description, og:url e canonical a cada rota.

Títulos:
- /          → "Dourado Studio — Criação de sites e landing pages em Fortaleza"
- /sobre     → "Vinícius Dourado — Desenvolvedor front-end | Dourado Studio"
- /projetos  → "Projetos — Dourado Studio"
- /projetos/:slug → "{title} — Case Dourado Studio"

Description da home: "Sites, landing pages e sistemas sob medida para empresas, cursos e eventos.
Estúdio em Fortaleza com atendimento para todo o Brasil. Fale direto pelo WhatsApp."

No index.html, adicionar JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Dourado Studio",
  "url": "https://vinidourado.vercel.app",
  "telephone": "+55 85 98211-6585",
  "email": "viniciusdourado020506@gmail.com",
  "founder": { "@type": "Person", "name": "Vinícius Dourado" },
  "address": { "@type": "PostalAddress", "addressLocality": "Fortaleza", "addressRegion": "CE", "addressCountry": "BR" },
  "areaServed": "BR",
  "priceRange": "R$ 800+"
}
```
Trocar a URL base quando o domínio próprio estiver ativo (Fase 3).

---

## Imagens (public/images)
```
hero/dor-google.jpg            pessoa pesquisando no celular
hero/dor-curso.jpg             professor ou palestrante
hero/dor-planilha.jpg          pessoa cansada diante de planilhas
hero/dor-site-antigo.jpg       fachada ou interior de negócio local
cases/imersao-coreia-desktop.png  / cases/imersao-coreia-mobile.png
cases/enquete-shalom-desktop.png  / cases/enquete-shalom-mobile.png
cases/closr-desktop.png           / cases/closr-mobile.png
about/vinicius-trabalhando.jpg
profile.png                    (já existe, usada em /sobre)
```
Fotos do hero: largura mínima 1920px, converter para .webp se passar de 400KB.
Toda imagem precisa de alt descritivo em português. Toda imagem ausente tem fallback elegante.

---

## Qualidade mínima
- Mobile-first. Testar em 375px, 768px, 1280px e 1440px.
- Foco de teclado visível (outline 2px --gold, offset 3px).
- Contraste AA em todo texto.
- Lighthouse mobile: performance ≥ 90, acessibilidade ≥ 95.
- Imagens do hero: a primeira com `fetchpriority="high"`, as outras com lazy.

---

## Fases
- **Fase 1:** design system novo, rotas e redirecionamentos, Home completa, /sobre com o tema novo,
  /projetos e /projetos/:slug adaptados, botão do WhatsApp, SEO por página.
- **Fase 2:** páginas /servicos/:slug (geradas a partir de services.ts) e /modelos
  (sites demonstrativos por nicho, sempre identificados como demonstração, nunca como cliente).
- **Fase 3:** domínio próprio, sitemap.xml, robots.txt, Google Search Console e Perfil da Empresa no Google.

## Comandos
```
npm run dev
npm run build
```
PowerShell não aceita `&&`: rodar comandos git um por vez.

---

## Inovações

### Navegação atualizada
Links: Serviços, Projetos, Raio-X grátis, Sobre. Botão primário da nav: "Simular orçamento" → /orcamento.
O WhatsApp continua acessível pelo botão flutuante e pelos CTAs das seções.

### Botão flutuante do WhatsApp — correções
- No mobile, reservar espaço: todo o conteúdo ganha `padding-bottom` suficiente para o botão não cobrir texto
  nem controles (ex.: último item do FAQ, texto de fechamento da faixa de dados).
- Esconder o botão enquanto o CTA final ou o rodapé estiverem visíveis (eles já têm WhatsApp).
- Esconder o botão nas telas de resultado do simulador e do Raio-X (elas têm CTA próprio de WhatsApp).

---

### Simulador de orçamento — rota /orcamento

Objetivo: o visitante monta o projeto, vê uma faixa de preço ao vivo e envia um resumo pronto pelo WhatsApp.
Chega um contato já qualificado.

Entradas:
- Botão da nav "Simular orçamento"
- Botões "Pedir orçamento" de cada serviço → `/orcamento?tipo={slug}` (tipo já selecionado, pula a etapa 1)
- Link "Ainda não tenho site" do Raio-X

#### Fluxo (uma pergunta por tela, com botão Voltar e barra de progresso)
1. **Tipo de projeto**: Landing page · Página de curso ou evento · Site institucional · Sistema sob medida · "Ainda não sei"
   - "Ainda não sei" mostra uma mini-pergunta: "O que você quer que o site faça?" com 3 opções
     (vender um produto/serviço específico → Landing page; divulgar curso/evento → Curso/evento;
     apresentar a empresa → Institucional) e segue com o tipo recomendado, avisando qual foi.
   - "Sistema sob medida" vai para um fluxo curto: campo de texto "Descreva o processo que você quer automatizar",
     quantas pessoas vão usar, e resultado "sob consulta".
2. **Tamanho** (só para Institucional): até 4 páginas · 5 a 6 · 7 a 10
3. **Funcionalidades extras** (múltipla escolha, cada uma com explicação de 1 linha em linguagem simples)
4. **Conteúdo**: "Já tenho textos e fotos" · "Tenho parte" · "Preciso de ajuda com os textos"
5. **Identidade visual**: "Já tenho logo e cores" · "Preciso de uma identidade simples"
6. **Prazo**: "Prazo normal" · "Preciso com urgência" (+25%)
7. **Manutenção mensal**: sim · não (valor mensal exibido à parte, nunca somado ao projeto)
8. **Contato**: nome (obrigatório) e nome da empresa (opcional)

#### Preços — src/data/pricing.ts
PROPOSTA INICIAL. O Vinícius revisa estes valores antes do deploy.
```ts
export const BASE = {
  'landing-page':              { min: 800,  max: 1200 },
  'pagina-de-curso-ou-evento': { min: 1000, max: 1500 },
  'site-institucional':        { min: 1800, max: 2400 },   // até 4 páginas
}
export const INSTITUTIONAL_SIZE = {
  'ate-4':  { min: 0,   max: 0 },
  '5-6':    { min: 400, max: 600 },
  '7-10':   { min: 900, max: 1300 },
}
export const EXTRAS = [
  { id: 'inscricao',   label: 'Formulário de inscrição ou contato',  hint: 'As respostas chegam organizadas numa planilha.', min: 200, max: 350 },
  { id: 'idiomas',     label: 'Site em outro idioma',                 hint: 'Valor por idioma adicional.',                 min: 300, max: 450, perUnit: true },
  { id: 'blog',        label: 'Blog ou área de notícias',             hint: 'Para publicar conteúdo e aparecer mais no Google.', min: 450, max: 700 },
  { id: 'galeria',     label: 'Galeria ou portfólio de trabalhos',    hint: 'Fotos de produtos, obras ou eventos.',        min: 150, max: 300 },
  { id: 'agendamento', label: 'Agendamento online',                   hint: 'O cliente marca horário sem precisar ligar.', min: 350, max: 600 },
  { id: 'maps',        label: 'Google Maps e avaliações',             hint: 'Mapa e avaliações do Google no site.',        min: 100, max: 200, includedIn: ['site-institucional'] },
  { id: 'animacoes',   label: 'Animações e interações especiais',     hint: 'Movimento que deixa o site memorável.',      min: 300, max: 600 },
]
export const CONTENT_HELP = { min: 250, max: 450 }        // "Preciso de ajuda com os textos"
export const CONTENT_PARTIAL = { min: 100, max: 200 }     // "Tenho parte"
export const VISUAL_IDENTITY = { min: 350, max: 600 }
export const URGENCY_MULTIPLIER = 1.25
export const MAINTENANCE_MONTHLY = { min: 80, max: 150 }
```
Regras de cálculo:
- Somar min e max separadamente; aplicar urgência no final; arredondar para múltiplos de 50.
- Extras marcados como `includedIn` aparecem como "Incluso" para aquele tipo, sem custo.
- Prazo estimado = prazo do serviço em services.ts, +3 a 5 dias úteis se houver 3 ou mais extras;
  com urgência, mostrar "prazo reduzido, a combinar".

#### Interface
- Página clara, uma pergunta por vez, título da pergunta em h2, opções como blocos selecionáveis grandes
  (área de toque mínima 56px), com radio/checkbox reais por baixo para acessibilidade e teclado.
- **Estimativa ao vivo**: coluna fixa à direita no desktop; barra fixa no rodapé no mobile
  ("Estimativa: R$ 1.800 – R$ 2.400" + botão Continuar). Quando a faixa muda, os números fazem uma
  transição curta de contagem (este é o momento memorável da página).
- Transição entre perguntas: deslizamento horizontal curto (Framer Motion, AnimatePresence).
- O estado da simulação fica em memória; recarregar a página recomeça.

#### Resultado
- Faixa estimada grande, prazo estimado, lista do que está incluso, extras escolhidos, manutenção à parte.
- Aviso honesto: "Esta é uma estimativa. O valor final vem por escrito na proposta, depois da nossa conversa."
- CTA primário: "Enviar resumo pelo WhatsApp", mensagem gerada:
```
Olá! Fiz uma simulação no site da Dourado Studio.

Projeto: Site institucional (5 a 6 páginas)
Extras: Blog, Agendamento online
Conteúdo: preciso de ajuda com os textos
Identidade visual: já tenho
Prazo: normal
Manutenção mensal: sim

Estimativa: R$ 3.300 – R$ 4.400

Meu nome é {nome}, da {empresa}.
```
  (omitir linhas vazias; para sistema sob medida, incluir a descrição digitada)
- CTA secundário: "Refazer simulação"

SEO: título "Simulador de orçamento de site — Dourado Studio",
description "Descubra quanto custa o site da sua empresa em menos de 2 minutos e receba a proposta pelo WhatsApp."

---

### Raio-X do site — rota /raio-x

Objetivo: o visitante descobre em segundos se o site dele está afastando clientes e recebe
os problemas em linguagem simples. Quem tem nota baixa está pronto para contratar.

Entradas:
- Link "Raio-X grátis" na nav
- **Campo inline no fim da faixa de dados da home**, logo após o texto de fechamento:
  "Seu site está nos 53%? Descubra em 30 segundos." + input de URL + botão "Analisar meu site".
  Ao enviar, navega para `/raio-x?url={url}` e inicia a análise automaticamente.

#### API
PageSpeed Insights API v5 (Google):
```
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed
  ?url={url}
  &strategy=mobile
  &category=performance&category=accessibility&category=seo&category=best-practices
  &locale=pt_BR
  &key={import.meta.env.VITE_PSI_API_KEY}
```
- Chave em `.env.local` (VITE_PSI_API_KEY), nunca commitada; também cadastrada nas Environment Variables da Vercel.
- Se a variável não existir, chamar sem key (funciona com cota baixa) e registrar aviso no console.
- Normalizar a URL digitada: adicionar https:// se faltar, remover espaços, validar formato.
- Timeout de 60s com AbortController.

#### Estados
1. **Entrada**: título "Raio-X do seu site", subtítulo explicando que a análise simula um celular,
   campo de URL grande, botão "Analisar". Abaixo, link "Ainda não tenho site" → /orcamento.
2. **Analisando** (10 a 40s): lista de etapas que vão sendo marcadas em sequência
   ("Abrindo seu site num celular", "Medindo a velocidade", "Verificando o Google", "Checando acessibilidade",
   "Montando o relatório"). Sem porcentagem falsa. Mensagem: "Isso leva até 40 segundos."
3. **Resultado**:
   - Nota de velocidade no celular em destaque (0 a 100), com rótulo:
     0–49 "Precisa de atenção urgente", 50–89 "Pode melhorar", 90–100 "Ótimo".
     Cores semânticas: vermelho #C0392B, âmbar #B7791F, verde #2F855A (sempre com texto, nunca só cor).
   - Três notas menores: SEO, Acessibilidade, Boas práticas.
   - Métricas traduzidas:
     - largest-contentful-paint → "Tempo até o conteúdo principal aparecer" (ideal: até 2,5 s)
     - cumulative-layout-shift → "Estabilidade da página enquanto carrega" (ideal: até 0,1)
     - total-blocking-time → "Tempo em que a página fica travada" (ideal: até 200 ms)
   - **O que está afastando visitantes**: até 5 problemas, só auditorias com score < 0.9 presentes no mapa abaixo,
     ordenadas por impacto. Cada uma com título simples e uma frase explicando o efeito no negócio.
     Mapa (src/data/audits-pt.ts):
     ```
     render-blocking-resources → "Arquivos que atrasam a abertura da página"
     modern-image-formats / uses-optimized-images / uses-responsive-images → "Imagens pesadas demais para o celular"
     unused-javascript / unused-css-rules → "Código que carrega sem ser usado"
     server-response-time → "Servidor demorando para responder"
     uses-text-compression → "Arquivos enviados sem compressão"
     meta-description → "Sem descrição para aparecer no Google"
     document-title → "Página sem título adequado no Google"
     viewport → "Site não adaptado para celular"
     tap-targets → "Botões pequenos ou colados demais para o dedo"
     font-size → "Textos pequenos demais para ler no celular"
     image-alt → "Imagens sem descrição (ruim para Google e acessibilidade)"
     color-contrast → "Textos com pouco contraste, difíceis de ler"
     is-crawlable → "O Google pode estar impedido de ler o site"
     ```
   - Aviso: "As notas podem variar um pouco entre uma análise e outra. Análise feita com a ferramenta
     PageSpeed Insights do Google. Nenhum dado é armazenado."
   - CTA primário: "Quero que a Dourado Studio resolva isso" → WhatsApp:
     "Olá! Fiz o Raio-X do site {url} no site da Dourado Studio e a nota de velocidade no celular foi {nota}. Quero entender como melhorar."
   - Se nota ≥ 90: tom de parabéns + CTA "Quer ir além? Vamos conversar" (mensagem adaptada).
   - CTA secundário: "Analisar outro site".
4. **Erro**: mensagens humanas para URL inválida, site fora do ar, tempo esgotado e limite da API.
   Todo erro oferece: "Me manda o endereço pelo WhatsApp que eu analiso pessoalmente."

SEO: título "Raio-X grátis do seu site — velocidade e Google | Dourado Studio",
description "Descubra em 30 segundos se o seu site está lento no celular e o que está afastando seus clientes."

---

### Contagem da faixa de dados — correção
A contagem começa quando 30% do elemento estiver visível (não 100%). Antes de iniciar, o número já aparece
com o valor final em opacidade 0 (reserva espaço), para nunca exibir "0%" parado na tela.