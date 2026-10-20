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
  /** Parágrafo de abertura da página do serviço, em tom de conversa. */
  intro: string
  /** Frase que liga o case ao serviço, na seção de prova. */
  proofNote?: string
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
    title: 'Você tem o que vender. Só falta um lugar que mostre isso direito.',
    intro:
      'Sabe quando alguém pergunta "como funciona?" e você manda áudio, print, link do destaque… e a pessoa some? Uma landing page resolve isso: uma página só, direta, que explica o que você vende e leva a pessoa até o seu WhatsApp já sabendo o que quer.',
    heroImage: '/images/servicos/landing-page.webp',
    heroCard: { label: 'Nova mensagem', text: 'Oi! Vi a página. Ainda tem vaga essa semana?' },
    painLines: [
      'Você posta, alguém se interessa e clica no link da bio.',
      'Cai num perfil cheio de post antigo, sem preço, sem explicação.',
      'E fecha o app antes de te mandar um "oi".',
    ],
    beforeAfter: [
      { before: 'Explicar tudo de novo pra cada pessoa no direct', after: 'A página tira as dúvidas antes mesmo da conversa começar' },
      { before: 'Anúncio levando pra um perfil bagunçado', after: 'Um endereço seu, pronto pra anúncio, bio e QR code' },
      { before: 'Gente interessada que desiste no meio do caminho', after: 'Um botão que leva direto pro seu WhatsApp' },
    ],
    faq: [
      { q: 'Dá pra usar em anúncio?', a: 'Dá, e é pra isso mesmo. Ela funciona bem com anúncio, link da bio e QR code impresso.' },
      { q: 'E se eu mudar a oferta depois?', a: 'Sem problema. Trocar texto, preço ou foto entra na manutenção mensal, é só me chamar.' },
      { q: 'Preciso ter um domínio?', a: 'Não precisa se preocupar com isso. Eu registro pra você, no seu nome. Um .com.br sai por volta de R$ 40 por ano.' },
    ],
    caseSlug: 'imersao-coreia',
    proofNote:
      'O Imersão Coreia precisava lotar uma aula gratuita. Fiz uma página que explicava a noite em poucos segundos e levava direto pra inscrição. Mais de 1.500 pessoas se inscreveram.',
    deliverables: [
      'Página feita primeiro pro celular',
      'Botão direto pro seu WhatsApp',
      'Configuração básica pro Google',
      'Domínio e publicação por minha conta',
    ],
    priceFrom: 800,
    deadline: '7 a 10 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma landing page.',
  },
  {
    slug: 'pagina-de-curso-ou-evento',
    name: 'Página de curso ou evento',
    door: 'Quero vender um curso ou evento',
    title: 'Seu curso merece mais do que um link perdido na bio.',
    intro:
      'Quem organiza curso ou evento conhece a rotina: a mesma pergunta cinquenta vezes, inscrição chegando por todo lado, planilha que ninguém atualiza. Eu faço uma página que conta tudo de uma vez (o que é, quando, quanto, quem ensina) e junta as inscrições num lugar só.',
    heroImage: '/images/servicos/curso-evento.webp',
    heroCard: { label: 'Nova inscrição', text: 'Turma de sábado · 12 vagas restantes' },
    painLines: [
      'Uma inscrição chega no direct, outra no WhatsApp, outra num formulário.',
      '"Que horas começa?" "É presencial?" "Quanto custa?" De novo.',
      'E na semana do evento você ainda não sabe quantas pessoas vão.',
    ],
    beforeAfter: [
      { before: 'Inscrição espalhada em três lugares diferentes', after: 'Todas as inscrições juntas, organizadas pra você acompanhar' },
      { before: 'Responder as mesmas perguntas o dia inteiro', after: 'Programação, valor e local claros logo de cara' },
      { before: 'Divulgação que esfria depois do primeiro post', after: 'Contagem regressiva e um link fácil de mandar nos grupos' },
    ],
    faq: [
      { q: 'As inscrições podem cair numa planilha?', a: 'Podem. Você acompanha tudo organizado, sem copiar nada à mão.' },
      { q: 'Serve pra evento online e presencial?', a: 'Serve pros dois. A página mostra o que importa em cada formato: link, endereço, horário.' },
      { q: 'Dá pra reaproveitar na próxima turma?', a: 'Dá sim. Troco datas e programação e a página fica pronta de novo.' },
    ],
    caseSlug: 'imersao-coreia',
    proofNote:
      'Foi exatamente o caso do Imersão Coreia: uma aula inaugural ao vivo, com participação direto da Coreia. A página juntou mais de 1.500 inscrições.',
    deliverables: [
      'Programação e quem vai ensinar',
      'Inscrição integrada',
      'Contagem regressiva',
      'Prévia bonita quando o link é compartilhado',
    ],
    priceFrom: 1000,
    deadline: '10 a 15 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma página para meu curso ou evento.',
  },
  {
    slug: 'site-institucional',
    name: 'Site institucional',
    door: 'Quero ser encontrado no Google',
    title: 'Quando alguém pesquisar o que você faz, é você que tem que aparecer.',
    intro:
      'Antes de comprar, quase todo mundo dá uma olhada no Google. Se a sua empresa não aparece, ou aparece com um site de 2015, a pessoa segue pro próximo resultado. Eu faço um site que passa a mesma confiança que você passa pessoalmente, e que deixa fácil chegar até você.',
    heroImage: '/images/servicos/site-institucional.webp',
    heroCard: { label: 'Google', text: 'Sua Empresa · ★ 4,9 · Aberto agora' },
    painLines: [
      'Seu cliente pesquisa antes de decidir. Todo mundo faz isso.',
      'Se não te encontra, encontra o concorrente.',
      'E se encontra um site velho, fica com o pé atrás.',
    ],
    beforeAfter: [
      { before: 'Ninguém te acha quando procura o seu serviço na região', after: 'Você aparece pra quem está procurando o que você faz' },
      { before: 'Um site que não combina com o seu trabalho', after: 'Um site à altura do que você entrega' },
      { before: 'Telefone e endereço difíceis de achar', after: 'WhatsApp, telefone e mapa a um toque' },
    ],
    faq: [
      { q: 'Quantas páginas vêm?', a: 'Até 6 no pacote base, o que cobre a maioria das empresas. Se precisar de mais, dá pra ver no simulador.' },
      { q: 'Vou aparecer no Google?', a: 'O site já sai preparado pra isso: rápido, bem estruturado e com as informações certas. Mas vou ser sincero: subir nas buscas também leva tempo e depende de conteúdo.' },
      { q: 'Preciso escrever os textos?', a: 'Não sozinho. A gente conversa, eu organizo e escrevo com você. Se precisar de um trabalho maior de texto, eu te aviso antes.' },
    ],
    caseSlug: 'harmon-visagismo',
    proofNote:
      'A Harmon é uma barbearia na Aldeota com nota 4,6 no Google, mas sem site: quem pesquisava caía no Instagram. Desenhei um site com a cara do salão, pensado pra aparecer nas buscas e levar direto pro agendamento.',
    deliverables: [
      'Até 6 páginas',
      'Textos organizados junto com você',
      'Preparado pra aparecer nas buscas da sua região',
      'Google Maps e WhatsApp integrados',
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
    intro:
      'Toda empresa tem aquela tarefa que todo mundo faz igual, todo dia, na mão: montar mensagem, preencher planilha, conferir dado. Se ela segue regras, dá pra virar um sistema simples, feito em cima da rotina de vocês, que resolve em segundos o que hoje leva horas.',
    heroImage: '/images/servicos/sistema-sob-medida.webp',
    heroCard: { label: 'Painel', text: 'Mensagem gerada em 3 s · Copiar' },
    painLines: [
      'Horas por semana indo embora em tarefa repetida.',
      'Cada pessoa faz de um jeito, e os erros aparecem.',
      'Três planilhas com o mesmo nome. Ninguém sabe qual é a certa.',
    ],
    beforeAfter: [
      { before: 'Mensagem montada à mão, uma por uma', after: 'Mensagem pronta em segundos, sem erro de nome ou de dado' },
      { before: 'Cada pessoa trabalhando de um jeito', after: 'Um padrão que a equipe inteira segue sem pensar' },
      { before: 'Informação espalhada em planilhas', after: 'Tudo num painel só, com login e quem pode ver o quê' },
    ],
    faq: [
      { q: 'Como sei se o meu processo dá pra automatizar?', a: 'Se é repetido e segue regras, quase sempre dá. A gente começa com uma conversa: você me mostra como faz hoje e eu te digo o que dá pra simplificar.' },
      { q: 'Quanto custa?', a: 'Depende muito do processo. Depois da conversa eu te mando uma proposta por escrito, com valor e prazo fechados.' },
      { q: 'Minha equipe vai conseguir usar?', a: 'Vai, porque o sistema é desenhado em cima do que vocês já fazem. E eu acompanho o começo de perto.' },
    ],
    caseSlug: 'closr',
    proofNote:
      'Num estágio numa corretora de seguros, vi a equipe montando mensagem de pós-venda na mão o dia todo. Criei o Closr: o atendente preenche um formulário e a mensagem sai pronta pra copiar.',
    deliverables: [
      'Conversa pra entender o processo',
      'Painel com login',
      'Níveis de acesso pra cada pessoa',
      'Publicação e acompanhamento no começo',
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
  'Depois que o site vai pro ar, eu continuo por perto: a manutenção mensal cobre hospedagem, ajustes e suporte.'

export function formatPrice(priceFrom: number | null) {
  if (priceFrom === null) return 'Sob consulta'
  return 'A partir de R$ ' + priceFrom.toLocaleString('pt-BR')
}
