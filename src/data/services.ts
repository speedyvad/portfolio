export interface BeforeAfter {
  before: string
  after: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServiceStep {
  title: string
  text: string
}

/** Painel de interface (fictício e genérico) que ocupa o lugar da foto no hero. */
export interface ServicePanel {
  label: string
  rows: { label: string; value: string }[]
}

export interface Service {
  slug: string
  name: string
  /** Em qual grupo da página /servicos ele aparece. */
  group: 'pacote' | 'outro'
  /** Uma frase pro cartão de /servicos e pra descrição no Google. */
  summary: string
  /** Frase na voz do cliente — a "porta" do capítulo "Qual é o seu caso?". */
  door?: string
  /** Título grande da página /servicos/:slug. */
  title: string
  /** Foto do hero. Sem ela, o hero mostra o `heroPanel`. */
  heroImage?: string
  /** Cartão de interface (fictício e genérico) que flutua sobre a foto do hero. */
  heroCard?: { label: string; text: string }
  heroPanel?: ServicePanel
  painLines: [string, string, string]
  beforeAfter: BeforeAfter[]
  faq: ServiceFaq[]
  /** Case usado como prova na página do serviço. Sem case, a seção não aparece. */
  caseSlug: string | null
  /** Parágrafo de abertura da página do serviço, em tom de conversa. */
  intro: string
  /** Frase que liga o case ao serviço, na seção de prova. */
  proofNote?: string
  deliverables: string[]
  /** Nota ao lado de "O que você recebe". */
  includedNote?: string
  /** "Como funciona" próprio. Sem ele, valem os passos de construir um site. */
  steps?: ServiceStep[]
  deadline: string
  /** Serviço contínuo: `deadline` é uma frequência, não um prazo. */
  recurring?: boolean
  message: string
}

const MAINTENANCE_NOTE =
  'Depois que o site vai pro ar, eu continuo por perto: a manutenção mensal cobre hospedagem, ajustes e suporte.'

export const services: Service[] = [
  {
    slug: 'landing-page',
    name: 'Landing page essencial',
    group: 'pacote',
    summary: 'Uma página com até 6 seções, feita pro celular, com botão pro seu WhatsApp e formulário simples.',
    door: 'Quero vender um produto ou serviço',
    title: 'Você tem o que vender. Só falta um lugar que mostre isso direito.',
    intro:
      'Sabe quando alguém pergunta "como funciona?" e você manda áudio, print, link do destaque… e a pessoa some? Uma landing page resolve isso: uma página só, direta, que explica o que você vende e leva a pessoa até o seu WhatsApp já sabendo o que quer. Eu faço landing page aqui em Fortaleza, pra negócios daqui e de todo o Brasil.',
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
      { q: 'Preciso ter um domínio?', a: 'Não precisa se preocupar com isso. Eu registro pra você, no seu nome.' },
    ],
    caseSlug: 'imersao-coreia',
    proofNote:
      'O Imersão Coreia precisava lotar uma aula gratuita. Fiz uma página que explicava a noite em poucos segundos e levava direto pra inscrição. Mais de 1.500 pessoas se inscreveram.',
    deliverables: [
      'Uma página com até 6 seções, feita primeiro pro celular',
      'Botão direto pro seu WhatsApp',
      'Formulário simples',
      'Configuração básica pro Google',
      'Domínio e publicação por minha conta',
    ],
    includedNote: MAINTENANCE_NOTE,
    deadline: '7 a 10 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma landing page.',
  },
  {
    slug: 'site-institucional',
    name: 'Site institucional',
    group: 'pacote',
    summary: 'Até 5 páginas: apresentação, serviços e contato, já com a configuração básica pra aparecer nas buscas.',
    door: 'Quero ser encontrado no Google',
    title: 'Quando alguém pesquisar o que você faz, é você que tem que aparecer.',
    intro:
      'Antes de comprar, quase todo mundo dá uma olhada no Google. Se a sua empresa não aparece, ou aparece com um site de 2015, a pessoa segue pro próximo resultado. Eu faço um site que passa a mesma confiança que você passa pessoalmente, e que deixa fácil chegar até você. Eu crio sites aqui em Fortaleza, pra empresas daqui e de todo o Brasil.',
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
      { q: 'Quantas páginas vêm?', a: 'Até 5 no pacote base, o que cobre a maioria das empresas. Se precisar de mais, é só me falar na conversa.' },
      { q: 'Vou aparecer no Google?', a: 'O site já sai preparado pra isso: rápido, bem estruturado e com as informações certas. Mas vou ser sincero: subir nas buscas também leva tempo e depende de conteúdo.' },
      { q: 'Preciso escrever os textos?', a: 'Não sozinho. A gente conversa, eu organizo e escrevo com você. Se precisar de um trabalho maior de texto, eu te aviso antes.' },
    ],
    caseSlug: 'harmon-visagismo',
    proofNote:
      'A Harmon é uma barbearia na Aldeota com nota 4,6 no Google, mas sem site: quem pesquisava caía no Instagram. Desenhei um site com a cara do salão, pensado pra aparecer nas buscas e levar direto pro agendamento.',
    deliverables: [
      'Até 5 páginas: apresentação, serviços e contato',
      'Textos organizados junto com você',
      'Preparado pra aparecer nas buscas da sua região',
      'Google Maps e WhatsApp integrados',
    ],
    includedNote: MAINTENANCE_NOTE,
    deadline: '15 a 25 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero um site institucional.',
  },
  {
    slug: 'landing-page-de-campanha',
    name: 'Landing page de campanha',
    group: 'pacote',
    summary: 'Uma página pra uma oferta só (curso, evento, lançamento), com formulário e a medição de resultados que a gente combinar.',
    door: 'Quero divulgar um curso, evento ou oferta',
    title: 'Sua campanha merece mais do que um link perdido na bio.',
    intro:
      'Quem organiza curso, evento ou lançamento conhece a rotina: a mesma pergunta cinquenta vezes, inscrição chegando por todo lado, planilha que ninguém atualiza. Eu faço uma página que conta tudo de uma vez (o que é, quando, quanto, com quem), junta os inscritos num lugar só e mostra de onde eles vieram. Eu trabalho de Fortaleza, e a página serve pra evento daqui ou de qualquer outra cidade.',
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
      { before: 'Divulgar sem saber o que trouxe gente', after: 'Você vê de onde veio cada inscrição' },
    ],
    faq: [
      { q: 'As inscrições podem cair numa planilha?', a: 'Podem. Você acompanha tudo organizado, sem copiar nada à mão.' },
      { q: 'Serve pra evento online e presencial?', a: 'Serve pros dois. A página mostra o que importa em cada formato: link, endereço, horário.' },
      { q: 'O que é essa medição de resultados?', a: 'A gente combina antes o que importa pra você (cliques, inscrições, de onde as pessoas vieram) e eu deixo isso configurado.' },
      { q: 'Dá pra reaproveitar na próxima turma?', a: 'Dá sim. Troco datas e programação e a página fica pronta de novo.' },
    ],
    caseSlug: 'imersao-coreia',
    proofNote:
      'Foi exatamente o caso do Imersão Coreia: uma aula inaugural ao vivo, com participação direto da Coreia. A página juntou mais de 1.500 inscrições.',
    deliverables: [
      'Uma página pra uma oferta só',
      'Formulário de inscrição ou contato',
      'Medição de resultados combinada com você',
      'Prévia bonita quando o link é compartilhado',
    ],
    includedNote: MAINTENANCE_NOTE,
    deadline: '10 a 15 dias úteis',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma landing page para a minha campanha.',
  },
  {
    slug: 'manutencao-mensal',
    name: 'Manutenção mensal',
    group: 'pacote',
    summary: 'Eu confiro todo mês se está tudo funcionando, faço até 1 hora de pequenas alterações e cuido da hospedagem.',
    title: 'Seu site no ar e funcionando, sem você ter que pensar nisso.',
    intro:
      'Depois que o site vai pro ar, a vida continua: muda o telefone, muda o horário, uma foto envelhece, um formulário para de funcionar e ninguém avisa. Na manutenção, eu fico de olho nisso todo mês, faço os ajustes pequenos e você tem pra quem chamar. Vale pros sites que eu fiz.',
    heroPanel: {
      label: 'Conferência do mês',
      rows: [
        { label: 'Site no ar', value: 'Tudo certo' },
        { label: 'Formulário', value: 'Funcionando' },
        { label: 'Botão do WhatsApp', value: 'Funcionando' },
        { label: 'Horário atualizado', value: 'Feito' },
      ],
    },
    painLines: [
      'O telefone antigo continua no site há meses.',
      'O formulário parou, e você descobre por um cliente.',
      'E na hora do problema, não tem pra quem chamar.',
    ],
    beforeAfter: [
      { before: 'Descobrir um problema só quando um cliente reclama', after: 'Eu confiro todo mês se está tudo funcionando' },
      { before: 'Aquela alteração pequena que fica sempre pra depois', after: 'Até 1 hora de alterações por mês, é só me pedir' },
      { before: 'Hospedagem e painel que você nem sabe como funcionam', after: 'A hospedagem fica comigo, e as dúvidas você tira no WhatsApp' },
    ],
    faq: [
      { q: 'O que conta como pequena alteração?', a: 'Trocar texto, foto, telefone, horário, esse tipo de coisa. Se o pedido passar de 1 hora, eu te aviso antes e a gente combina à parte.' },
      { q: 'Vale pra site que outra pessoa fez?', a: 'Hoje não. A manutenção é pros sites que eu fiz, porque aí eu conheço cada parte e sei o que posso prometer.' },
      { q: 'O que entra no suporte?', a: 'Tirar dúvida sobre o site pelo WhatsApp, com quem fez ele. Sem abrir chamado, sem falar com robô.' },
    ],
    caseSlug: null,
    deliverables: [
      'Verificação de funcionamento todo mês',
      'Até 1 hora de pequenas alterações por mês',
      'Hospedagem do site',
      'Suporte pelo WhatsApp',
    ],
    steps: [
      { title: 'Conversa', text: 'Você me conta se quer manter o site comigo depois da entrega.' },
      { title: 'Proposta', text: 'O que entra e o valor do mês, por escrito.' },
      { title: 'Todo mês', text: 'Eu confiro se está tudo funcionando.' },
      { title: 'Quando precisar', text: 'Você pede o ajuste ou tira a dúvida no WhatsApp.' },
    ],
    deadline: 'Todo mês',
    recurring: true,
    message: 'Olá! Vim pelo site da Dourado Studio e quero saber mais sobre a manutenção mensal.',
  },
  {
    slug: 'presenca-digital',
    name: 'Desenvolvimento ou melhoria de presença digital',
    group: 'outro',
    summary: 'Crio ou arrumo o seu perfil no Google e deixo o visual das suas redes com a cara do seu negócio.',
    title: 'Quem pesquisa o seu negócio precisa achar a informação certa. E gostar do que vê.',
    intro:
      'Antes de te chamar, a pessoa olha o Google e o Instagram. Se o telefone está errado, o horário é antigo ou o perfil parece abandonado, ela desconfia e vai embora. Eu crio ou arrumo o seu perfil no Google e organizo o visual das suas redes, pra quem te procura te achar e confiar. Eu atendo negócios de Fortaleza e de outras cidades.',
    heroPanel: {
      label: 'Perfil no Google',
      rows: [
        { label: 'Telefone e endereço', value: 'Conferidos' },
        { label: 'Horário', value: 'Atualizado' },
        { label: 'Fotos', value: 'Novas' },
        { label: 'Bio do Instagram', value: 'Organizada' },
      ],
    },
    painLines: [
      'Alguém pesquisa o seu nome e acha um telefone antigo.',
      'Vai pro Instagram e cada post tem uma cara diferente.',
      'E fica na dúvida se você ainda está aberto.',
    ],
    beforeAfter: [
      { before: 'Perfil no Google incompleto ou que nem existe', after: 'Telefone, endereço, horário e fotos certos no Google e no Maps' },
      { before: 'Redes com uma cara diferente em cada canto', after: 'Foto, capa, bio e destaques com a identidade do seu negócio' },
      { before: 'Parecer menor do que você é', after: 'Uma primeira impressão à altura do seu trabalho' },
    ],
    faq: [
      { q: 'Você faz os posts todo mês?', a: 'Não. Eu arrumo o perfil e o visual. O conteúdo do dia a dia continua com você.' },
      { q: 'Vou ficar em primeiro no Google?', a: 'Não dá pra prometer isso. O que eu faço é deixar o perfil completo e certinho, e isso ajuda. A verificação e a posição dependem do Google.' },
      { q: 'E se eu também precisar de um site?', a: 'Aí é outro serviço, o site institucional ou a landing page. A gente vê na conversa o que faz mais sentido pra você agora.' },
    ],
    caseSlug: null,
    deliverables: [
      'Perfil no Google criado ou organizado',
      'Telefone, endereço, horário e fotos conferidos',
      'Foto, capa, bio e destaques das redes organizados',
      'Identidade visual aplicada nas redes',
    ],
    steps: [
      { title: 'Conversa', text: 'Você me mostra onde o seu negócio aparece hoje.' },
      { title: 'Proposta', text: 'O que vou arrumar, prazo e valor por escrito.' },
      { title: 'Arrumação', text: 'Organizo o perfil e o visual, e você aprova.' },
      { title: 'Entrega', text: 'Tudo no ar, com os acessos no seu nome.' },
    ],
    deadline: 'Combinado na conversa',
    message: 'Olá! Vim pelo site da Dourado Studio e quero melhorar a presença digital do meu negócio.',
  },
  {
    slug: 'design-de-interfaces',
    name: 'Design de interfaces e experiência do usuário',
    group: 'outro',
    summary: 'Reviso o site ou sistema que você já tem e melhoro as telas que estão confundindo as pessoas.',
    title: 'Se as pessoas se perdem no seu site, o problema não é com elas.',
    intro:
      'Botão que ninguém acha, formulário que a pessoa abandona no meio, tela que só faz sentido pra quem criou. Eu olho o seu site ou sistema como quem nunca usou, principalmente no celular, mostro onde as pessoas travam e melhoro essas telas.',
    heroPanel: {
      label: 'Revisão da tela',
      rows: [
        { label: 'Botão principal', value: 'Fora da tela no celular' },
        { label: 'Formulário', value: 'Campos demais' },
        { label: 'Menu', value: 'Nomes confusos' },
        { label: 'Texto', value: 'Pequeno demais' },
      ],
    },
    painLines: [
      'As pessoas entram no seu site e não fazem o que você esperava.',
      'Sua equipe precisa explicar o sistema toda vez.',
      'E ninguém sabe dizer em qual tela o problema está.',
    ],
    beforeAfter: [
      { before: 'Achar que o problema é "o site", sem saber onde', after: 'Uma lista clara do que está atrapalhando, por ordem de importância' },
      { before: 'Telas que só fazem sentido pra quem criou', after: 'Telas fáceis de entender de primeira, também no celular' },
      { before: 'Refazer tudo do zero sem precisar', after: 'Melhorar só o que está atrapalhando' },
    ],
    faq: [
      { q: 'Serve pra sistema interno também?', a: 'Serve. Muitas vezes é onde mais se perde tempo, porque a equipe usa aquela tela o dia inteiro.' },
      { q: 'Você mesmo programa as mudanças?', a: 'Esse serviço é a revisão e o novo desenho das telas. Se você precisar colocar as mudanças no ar, a gente conversa sobre isso.' },
      { q: 'Preciso ter o site pronto?', a: 'Precisa ter algo pra eu olhar: um site, um sistema ou um protótipo. Se ainda não existe nada, os outros serviços combinam mais com você.' },
    ],
    caseSlug: null,
    deliverables: [
      'Revisão do site ou sistema, no celular e no computador',
      'Lista do que está confundindo, por ordem de importância',
      'As telas problemáticas redesenhadas',
    ],
    steps: [
      { title: 'Conversa', text: 'Você me mostra o que tem e onde sente que trava.' },
      { title: 'Proposta', text: 'O que vou revisar, prazo e valor por escrito.' },
      { title: 'Revisão', text: 'Uso como quem nunca viu e anoto cada tropeço.' },
      { title: 'Telas novas', text: 'Você recebe a lista e as telas melhoradas.' },
    ],
    deadline: 'Combinado na conversa',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma revisão das telas do meu site ou sistema.',
  },
  {
    slug: 'marketing-digital',
    name: 'Marketing digital',
    group: 'outro',
    summary: 'Faço a página da campanha e a medição que mostra de onde vêm os seus contatos. Os anúncios ficam com você ou com quem já cuida deles.',
    title: 'Curtida não paga conta. Você precisa saber de onde vem o contato.',
    intro:
      'Muita gente impulsiona post, recebe curtida e não sabe se veio algum cliente. Eu cuido da parte que fica depois do clique: a página pra onde a campanha leva e a medição que mostra o que trouxe contato de verdade. Vou ser sincero: eu não gerencio os anúncios. Isso fica com você ou com quem já cuida deles.',
    heroPanel: {
      label: 'De onde vieram os contatos',
      rows: [
        { label: 'Anúncio do Instagram', value: 'Trouxe contato' },
        { label: 'Post impulsionado', value: 'Só curtida' },
        { label: 'Google', value: 'Trouxe contato' },
        { label: 'Botão mais tocado', value: 'WhatsApp do topo' },
      ],
    },
    painLines: [
      'Você paga o anúncio e o post enche de curtida.',
      'O WhatsApp continua quieto.',
      'E ninguém sabe dizer o que funcionou.',
    ],
    beforeAfter: [
      { before: 'Anúncio levando pra um perfil ou pra um link qualquer', after: 'Uma página feita pra aquela campanha' },
      { before: 'Achar que funcionou porque teve curtida', after: 'Ver de onde veio cada contato' },
      { before: 'Mudar tudo no chute', after: 'Ajustar a página com base no que os dados mostram' },
    ],
    faq: [
      { q: 'Você gerencia os meus anúncios?', a: 'Não. Eu faço a página e a medição. Quem cria e cuida dos anúncios é você ou o seu gestor de tráfego, e eu trabalho junto sem problema.' },
      { q: 'Isso garante vendas?', a: 'Não, e desconfie de quem garante. O que você ganha é clareza: saber o que está trazendo contato e parar de gastar com o que não traz.' },
      { q: 'Preciso de uma página nova?', a: 'Nem sempre. Se você já tem site ou página, eu vejo se dá pra medir nela e o que vale ajustar.' },
    ],
    caseSlug: null,
    deliverables: [
      'Página da campanha',
      'Google Analytics configurado',
      'Pixel dos anúncios configurado, se a campanha usar',
      'Medição de cliques no WhatsApp e de formulários',
      'Ajustes na página com base nos resultados',
    ],
    steps: [
      { title: 'Conversa', text: 'Você me conta o que está divulgando e como.' },
      { title: 'Proposta', text: 'O que vou fazer, prazo e valor por escrito.' },
      { title: 'Montagem', text: 'Faço a página e configuro a medição.' },
      { title: 'Ajustes', text: 'Olhamos os resultados e melhoramos a página.' },
    ],
    deadline: 'Combinado na conversa',
    message: 'Olá! Vim pelo site da Dourado Studio e quero conversar sobre a página e a medição da minha campanha.',
  },
  {
    slug: 'diagnostico-e-planejamento',
    name: 'Diagnóstico e planejamento da presença digital',
    group: 'outro',
    summary: 'Analiso o seu site, as suas redes e o seu Google, e te entrego um plano por escrito do que fazer primeiro.',
    title: 'Antes de gastar com site ou anúncio, descubra o que está te atrapalhando.',
    intro:
      'Às vezes o problema não é falta de site. É um perfil desatualizado, um link que não funciona, uma página que ninguém entende. Eu analiso onde o seu negócio aparece hoje e te entrego um plano por escrito, com o que fazer primeiro e o que pode esperar.',
    heroPanel: {
      label: 'Seu plano',
      rows: [
        { label: 'Primeiro', value: 'Corrigir o perfil no Google' },
        { label: 'Depois', value: 'Arrumar o link da bio' },
        { label: 'Com calma', value: 'Pensar em um site' },
        { label: 'Pode esperar', value: 'Anúncios' },
      ],
    },
    painLines: [
      'Todo mundo te diz que você precisa de alguma coisa.',
      'Site, anúncio, rede social, tudo ao mesmo tempo.',
      'E você não sabe por onde começar.',
    ],
    beforeAfter: [
      { before: 'Contratar no escuro e torcer pra resolver', after: 'Saber o que está atrapalhando antes de gastar' },
      { before: 'Uma lista enorme de coisas pra fazer', after: 'Uma ordem clara: o que vem primeiro e o que pode esperar' },
      { before: 'Conselho solto de cada pessoa que você conhece', after: 'Um plano por escrito, feito olhando o seu negócio' },
    ],
    faq: [
      { q: 'O diagnóstico é pago?', a: 'É. É um trabalho à parte, com análise e documento. Me chama no WhatsApp que eu te passo o valor.' },
      { q: 'Sou obrigado a contratar você depois?', a: 'Não. O plano é seu. Você pode fazer comigo, com outra pessoa ou por conta própria.' },
      { q: 'Preciso ter site?', a: 'Não. Se você só tem Instagram ou só aparece no Google, eu analiso o que existe e o plano parte daí.' },
    ],
    caseSlug: null,
    deliverables: [
      'Análise do seu site, das suas redes e do seu Google',
      'O que está atrapalhando, explicado sem termo técnico',
      'Plano por escrito do que fazer primeiro',
    ],
    steps: [
      { title: 'Conversa', text: 'Você me conta sobre o negócio e onde ele aparece.' },
      { title: 'Proposta', text: 'O que vou analisar, prazo e valor por escrito.' },
      { title: 'Análise', text: 'Olho site, redes e Google como um cliente olharia.' },
      { title: 'Plano', text: 'Você recebe o documento e decide como seguir.' },
    ],
    deadline: 'Combinado na conversa',
    message: 'Olá! Vim pelo site da Dourado Studio e quero um diagnóstico da minha presença digital.',
  },
  {
    slug: 'automacao-e-integracao',
    name: 'Automação e integração de processos',
    group: 'outro',
    summary: 'Tarefa repetida que segue regra vira sistema: mensagem que sai pronta, planilha que se preenche, ferramentas que conversam entre si.',
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
    steps: [
      { title: 'Conversa', text: 'Você me mostra como a tarefa é feita hoje.' },
      { title: 'Proposta', text: 'Escopo, prazo e valor por escrito.' },
      { title: 'Construção', text: 'Você acompanha e testa cada etapa.' },
      { title: 'No ar', text: 'Sistema publicado, e eu acompanho o começo de perto.' },
    ],
    deadline: 'Definido na proposta',
    message: 'Olá! Vim pelo site da Dourado Studio e quero automatizar um processo da minha empresa.',
  },
]

/** Ordem das portas do capítulo "Qual é o seu caso?". */
export const doorOrder = ['site-institucional', 'landing-page-de-campanha', 'landing-page', 'automacao-e-integracao']

export function getService(slug: string | undefined) {
  return services.find((s) => s.slug === slug)
}

/** Endereços antigos, já divulgados, de serviços que mudaram de nome. */
export const legacyServiceSlugs: Record<string, string> = {
  'pagina-de-curso-ou-evento': 'landing-page-de-campanha',
  'sistema-sob-medida': 'automacao-e-integracao',
}

/** Textos da página /servicos. */
export const servicesPageCopy = {
  title: 'Tudo o que eu faço, num lugar só.',
  lead: 'Toque em qualquer um pra ver o que entra e como funciona. Na dúvida, me chama no WhatsApp que a gente descobre junto.',
  seoTitle: 'Serviços — Dourado Studio',
  seoDescription:
    'Landing pages, sites institucionais, manutenção, presença digital, design, marketing, diagnóstico e automação. Estúdio em Fortaleza com atendimento para todo o Brasil.',
  groups: [
    { id: 'pacote', title: 'Pacotes' },
    { id: 'outro', title: 'Outros serviços' },
  ] as const,
  homeLink: 'Ver todos os serviços',
}
