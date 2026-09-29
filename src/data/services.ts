export interface Service {
  slug: string
  name: string
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

export const servicesNote =
  'Manutenção mensal disponível para todos os projetos: hospedagem, ajustes e suporte.'

export function formatPrice(priceFrom: number | null) {
  if (priceFrom === null) return 'Sob consulta'
  return 'A partir de R$ ' + priceFrom.toLocaleString('pt-BR')
}
