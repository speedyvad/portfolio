export interface BeforeAfter {
  before: string
  after: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface Service {
  slug: string
  name: string
  /** Frase na voz do cliente — a "porta" do capítulo "Qual é o seu caso?". */
  door: string
  /** Título grande da página /servicos/:slug. */
  title: string
  heroImage: string
  /** Cartão de interface (fictício e genérico) que flutua sobre a foto do hero. */
  heroCard: { label: string; text: string }
  painLines: [string, string, string]
  beforeAfter: BeforeAfter[]
  faq: ServiceFaq[]
  /** Case usado como prova na página do serviço. */
  caseSlug: string | null
  forWho: string
  value: string
  /** Prova social curta, com link discreto para o case correspondente. */
  proof?: string
  /** Slug do projeto em /projetos que comprova a frase acima. */
  proofCaseSlug?: string
  deliverables: string[]
  /** null exibe "sob consulta" */
  priceFrom: number | null
  deadline: string
  message: string
}

export const services: Service[] = [
  {
    slug: 'landing-page',
    name: 'Landing page',
    door: 'Quero vender um produto ou serviço',
    title: 'Você tem o que vender. Falta uma página que venda por você.',
    heroImage: '/images/servicos/landing-page.webp',
    heroCard: { label: 'Nova mensagem', text: 'Oi! Vi a página. Ainda tem vaga para essa semana?' },
    painLines: [
      'Seu link na bio leva para um perfil cheio de posts antigos.',
      'Quem chega não entende rápido o que você oferece nem quanto custa.',
      'E vai embora sem mandar mensagem.',
    ],
    beforeAfter: [
      { before: 'Explicar tudo de novo para cada pessoa no direct', after: 'Uma página que responde as dúvidas antes da conversa' },
      { before: 'Divulgação que leva para lugar nenhum', after: 'Um endereço próprio para anúncios, bio e QR code' },
      { before: 'Cliente que desiste no meio do caminho', after: 'Um botão que leva direto para o seu WhatsApp' },
    ],
    faq: [
      { q: 'Posso usar a página em anúncios?', a: 'Sim. Ela é feita para receber tráfego de anúncios, da bio e de QR codes.' },
      { q: 'Consigo mudar a oferta depois?', a: 'Sim. Ajustes de texto e preço entram na manutenção mensal.' },
      { q: 'Preciso de domínio?', a: 'Eu cuido do registro. O domínio .com.br custa em torno de R$ 40 por ano, no seu nome.' },
    ],
    caseSlug: 'imersao-coreia',
    forWho: 'Para quem quer vender um produto, serviço ou campanha específica.',
    value: 'Uma página única, focada em levar o visitante até o seu WhatsApp.',
    deliverables: [
      'Página responsiva',
      'Botão direto para o WhatsApp',
      'SEO básico',
      'Publicação e domínio configurados',
    ],
    priceFrom: 800,
    deadline: '7 a 10 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma landing page.',
  },
  {
    slug: 'pagina-de-curso-ou-evento',
    name: 'Página de curso ou evento',
    door: 'Quero vender um curso ou evento',
    title: 'Seu curso merece mais do que um link na bio.',
    heroImage: '/images/servicos/curso-evento.webp',
    heroCard: { label: 'Nova inscrição', text: 'Turma de sábado · 12 vagas restantes' },
    painLines: [
      'As inscrições chegam espalhadas entre direct, WhatsApp e planilha.',
      'Cada pessoa pergunta a mesma coisa: horário, valor, onde é.',
      'E o evento enche menos do que poderia.',
    ],
    beforeAfter: [
      { before: 'Inscrições espalhadas em vários lugares', after: 'Todas as inscrições organizadas num só lugar' },
      { before: 'Responder as mesmas perguntas o dia inteiro', after: 'Programação, valores e local claros na página' },
      { before: 'Divulgação que esfria depois do primeiro post', after: 'Contagem regressiva e link fácil de compartilhar' },
    ],
    faq: [
      { q: 'Dá para receber as inscrições numa planilha?', a: 'Sim. As respostas chegam organizadas para você acompanhar.' },
      { q: 'Funciona para evento online e presencial?', a: 'Funciona para os dois, com as informações de cada formato.' },
      { q: 'Posso reaproveitar a página na próxima turma?', a: 'Sim. Atualizar datas e programação é rápido.' },
    ],
    caseSlug: 'imersao-coreia',
    forWho: 'Para professores, palestrantes, igrejas e organizadores.',
    value: 'Explica a programação, apresenta quem ensina e organiza as inscrições num só lugar.',
    proof: 'A página da Imersão Coreia reuniu mais de 1.500 inscritos para uma aula de nicho.',
    proofCaseSlug: 'imersao-coreia',
    deliverables: [
      'Programação e palestrantes',
      'Inscrição integrada',
      'Contagem regressiva',
      'Compartilhamento otimizado',
    ],
    priceFrom: 1000,
    deadline: '10 a 15 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma página para meu curso ou evento.',
  },
  {
    slug: 'site-institucional',
    name: 'Site institucional',
    door: 'Quero ser encontrado no Google',
    title: 'Quem procura sua empresa no Google precisa te encontrar.',
    heroImage: '/images/servicos/site-institucional.webp',
    heroCard: { label: 'Google', text: 'Sua Empresa · ★ 4,9 · Aberto agora' },
    painLines: [
      'Seu cliente pesquisa antes de comprar.',
      'Se não encontra a sua empresa, encontra o concorrente.',
      'E se encontra um site antigo, desconfia.',
    ],
    beforeAfter: [
      { before: 'Invisível nas buscas da sua região', after: 'Presente quando procuram o que você faz' },
      { before: 'Um site que passa insegurança', after: 'Um site que passa a confiança que sua empresa já tem' },
      { before: 'Contato difícil de achar', after: 'WhatsApp, telefone e mapa a um toque' },
    ],
    faq: [
      { q: 'Quantas páginas o site tem?', a: 'Até 6 no pacote base. Dá para ampliar no simulador de orçamento.' },
      { q: 'Vou aparecer no Google?', a: 'O site sai com a base de SEO configurada. A posição nas buscas também depende de conteúdo e tempo.' },
      { q: 'Vocês escrevem os textos?', a: 'Organizamos os textos com você. Se precisar de ajuda maior, isso entra como extra.' },
    ],
    caseSlug: 'harmon-visagismo',
    forWho: 'Para empresas que precisam passar credibilidade e ser encontradas.',
    value: 'Várias páginas apresentando a empresa, os serviços e as formas de contato.',
    deliverables: [
      'Até 6 páginas',
      'Textos organizados com você',
      'SEO para buscas locais',
      'Integração com Google Maps e WhatsApp',
    ],
    priceFrom: 1800,
    deadline: '15 a 25 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero um site institucional.',
  },
  {
    slug: 'sistema-sob-medida',
    name: 'Sistema sob medida',
    door: 'Minha equipe perde tempo com tarefas repetidas',
    title: 'Sua equipe não deveria passar a tarde copiando e colando.',
    heroImage: '/images/servicos/sistema-sob-medida.webp',
    heroCard: { label: 'Painel', text: 'Mensagem gerada em 3 s · Copiar' },
    painLines: [
      'Tarefas repetidas tomam horas que deveriam ir para o cliente.',
      'Cada pessoa faz de um jeito, e os erros aparecem.',
      'As planilhas se multiplicam e ninguém sabe qual é a certa.',
    ],
    beforeAfter: [
      { before: 'Mensagens montadas à mão, uma por uma', after: 'Mensagens geradas em segundos, sem erro de dado' },
      { before: 'Cada pessoa trabalhando de um jeito', after: 'Um padrão para a equipe inteira' },
      { before: 'Dados espalhados em planilhas', after: 'Tudo num painel com login e níveis de acesso' },
    ],
    faq: [
      { q: 'Como sei se o meu processo dá para automatizar?', a: 'Se é repetido e segue regras, quase sempre dá. Começamos com uma conversa sobre como ele funciona hoje.' },
      { q: 'Quanto custa?', a: 'Depende do processo. O valor vem por escrito na proposta, depois do levantamento.' },
      { q: 'Minha equipe vai conseguir usar?', a: 'O sistema é desenhado em cima da rotina de vocês, e a entrega inclui suporte inicial.' },
    ],
    caseSlug: 'closr',
    forWho: 'Para equipes que dependem de planilhas e tarefas repetitivas.',
    value: 'Uma ferramenta feita para o seu processo, com login, painel e dados organizados.',
    deliverables: [
      'Levantamento do processo',
      'Painel com login',
      'Níveis de acesso',
      'Publicação e suporte inicial',
    ],
    priceFrom: null,
    deadline: 'Definido na proposta',
    message: 'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um sistema sob medida.',
  },
]

/** Ordem das portas do capítulo "Qual é o seu caso?". */
export const doorOrder = ['site-institucional', 'pagina-de-curso-ou-evento', 'landing-page', 'sistema-sob-medida']

export function getService(slug: string | undefined) {
  return services.find((s) => s.slug === slug)
}

export const servicesNote =
  'Manutenção mensal disponível para todos os projetos: hospedagem, ajustes e suporte.'

export function formatPrice(priceFrom: number | null) {
  if (priceFrom === null) return 'Sob consulta'
  return 'A partir de R$ ' + priceFrom.toLocaleString('pt-BR')
}
