/**
 * Projetos do site. Regras de cada `kind` e como adicionar um novo: docs/01 e docs/05.
 * A ordem do array é a ordem de exibição em /projetos.
 */
export type ProjectKind = 'cliente' | 'conceito' | 'laboratorio' | 'faculdade'

export interface ProjectMetric {
  value: string
  label: string
}

export interface ProjectHighlight {
  title: string
  text: string
}

export interface ProjectShot {
  src: string
  alt: string
  caption?: string
  device: 'desktop' | 'mobile'
}

export interface Project {
  slug: string
  title: string
  kind: ProjectKind
  year: number
  /** Uma linha, para cartões. */
  shortDesc: string
  /** "O desafio": contexto em um parágrafo. */
  fullDesc: string
  /** A dor do cliente em uma frase, em linguagem de negócio. */
  problem?: string
  /** O que foi feito, em linguagem de negócio. */
  highlights?: ProjectHighlight[]
  /** Resultado em uma frase. Só fatos. */
  outcome?: string
  metrics?: ProjectMetric[]
  client?: string
  segment?: string
  role: string
  duration?: string
  /** Situação atual, quando não for um projeto entregue (ex.: em apresentação). */
  stage?: string
  /** Vai para "Por trás do código". */
  stack: string[]
  challenges: string[]
  images?: { desktop: string; mobile?: string }
  gallery?: ProjectShot[]
  live?: string
  github?: string
  /** Cor da marca do projeto — usada como brilho sutil atrás da vitrine. */
  color: string
}

export const KIND_LABEL: Record<ProjectKind, string> = {
  cliente: 'Projeto para cliente',
  conceito: 'Projeto conceito',
  laboratorio: 'Laboratório',
  faculdade: 'Estudo',
}

export const projects: Project[] = [
  {
    slug: 'harmon-visagismo',
    title: 'Harmon Visagismo',
    kind: 'conceito',
    year: 2026,
    segment: 'Barbearia premium',
    problem:
      'Uma barbearia de visagismo com nota 4,6 no Google, mas sem site: quem pesquisava pelo nome caía no Instagram e precisava caçar o número para marcar horário.',
    shortDesc:
      'Site para uma barbearia de visagismo na Aldeota, pensado para ser encontrado no Google e levar direto ao agendamento pelo WhatsApp.',
    fullDesc:
      'A Harmon Visagismo é uma barbearia de visagismo masculino na Aldeota, em Fortaleza, com um espaço físico de clube de cavalheiros: mármore, couro, dourado e atendimento com hora marcada. Toda essa experiência ficava invisível para quem pesquisava no Google. O desafio era criar uma presença digital à altura do espaço, que fosse encontrada nas buscas da região e transformasse a visita em agendamento sem nenhuma fricção.',
    highlights: [
      {
        title: 'A marca traduzida para a tela',
        text: 'Creme, café e dourado tirados do próprio salão, tipografia clássica e o brasão redesenhado em vetor, que se desenha na tela. O site passa a mesma sensação de entrar no espaço.',
      },
      {
        title: 'Do Google ao WhatsApp em um toque',
        text: 'Cada serviço abre o WhatsApp com a mensagem pronta. No celular, o botão de agendar acompanha a leitura sem atrapalhar.',
      },
      {
        title: 'Feito para ser encontrado',
        text: 'Estrutura de SEO local, dados estruturados de barbearia, endereço e contato idênticos ao Google Meu Negócio.',
      },
      {
        title: 'Elegante e leve',
        text: 'Animações lentas e com propósito, que respeitam quem prefere menos movimento. Carrega rápido até no 4G.',
      },
    ],
    outcome:
      'Do Google ao agendamento em um toque, num site que carrega rápido até no 4G e tira nota máxima em acessibilidade e SEO.',
    stage: 'Versão de teste no ar, em apresentação ao dono',
    metrics: [
      { value: '97+', label: 'de desempenho no celular (Lighthouse)' },
      { value: '100', label: 'em acessibilidade e SEO' },
      { value: '1 toque', label: 'do site até o WhatsApp' },
    ],
    role: 'Direção visual, desenvolvimento e SEO',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    challenges: [
      'Lighthouse mobile de 79 para 97–98: GSAP carregado só na primeira interação, CSS crítico embutido, pré-carregamento das fontes e brasão como sprite SVG (o HTML tinha 113 KB de SVG repetido)',
      'Hero 100% em CSS (palavras por máscara, arco e órbita) para o título e a foto aparecerem no primeiro frame e o LCP ficar rápido',
      'Motor de animação declarativo por atributos (data-split, data-reveal, data-draw), com rede de segurança para conexões lentas e respeito a prefers-reduced-motion',
      'Seção fixa no scroll com espaço reservado no CSS: CLS 0 mesmo com o GSAP chegando depois',
      'Dados estruturados HairSalon sem publicar nenhum dado provisório (horário e coordenadas ficam de fora até serem confirmados)',
    ],
    images: {
      desktop: '/images/cases/harmon-desktop.webp',
      mobile: '/images/cases/harmon-mobile.webp',
    },
    gallery: [
      { src: '/images/cases/harmon-1.webp', device: 'desktop', alt: 'Seção "O nome": HAR e MON separados por filetes dourados', caption: 'O conceito do nome, contado no scroll.' },
      { src: '/images/cases/harmon-2.webp', device: 'desktop', alt: 'Seção "A experiência" com fotos do espaço em cartões escalonados', caption: 'A experiência do salão em cartões que mudam o fundo.' },
      { src: '/images/cases/harmon-6.webp', device: 'mobile', alt: 'Seção "A experiência" no celular' },
      { src: '/images/cases/harmon-3.webp', device: 'desktop', alt: 'Seção "O método" com foto do salão', caption: 'O método de visagismo, explicado em quatro passos.' },
      { src: '/images/cases/harmon-7.webp', device: 'mobile', alt: 'Galeria curva de fotos do espaço no celular' },
      { src: '/images/cases/harmon-4.webp', device: 'desktop', alt: 'Galeria curva e arrastável com fotos do espaço', caption: 'Galeria curva e arrastável com os detalhes do espaço.' },
      { src: '/images/cases/harmon-8.webp', device: 'mobile', alt: 'Chamada final para agendar no celular' },
      { src: '/images/cases/harmon-5.webp', device: 'desktop', alt: 'Chamada final com letreiro em movimento', caption: 'Fechamento com letreiro que reage ao scroll.' },
    ],
    color: '#B08D57',
  },
  {
    slug: 'imersao-coreia',
    title: 'Imersão Coreia',
    kind: 'cliente',
    year: 2025,
    client: 'Curso Imersão Coreia — Comunidade Católica Shalom',
    segment: 'Educação e eventos',
    problem:
      'Divulgar uma aula inaugural gratuita e ao vivo e captar inscrições para um curso de 10 meses de preparação para a JMJ Seul 2027.',
    shortDesc:
      'Landing page de inscrição para a aula inaugural de um curso de língua e cultura coreana.',
    fullDesc:
      'O Imersão Coreia é um curso de 10 meses de língua, cultura e história coreana em preparação para a Jornada Mundial da Juventude em Seul, 2027. A aula inaugural seria gratuita, ao vivo e com participação direto da Coreia, mas a divulgação dependia de posts soltos e de um link na bio. Era preciso uma página que explicasse a noite em poucos segundos e levasse o visitante até a inscrição.',
    highlights: [
      {
        title: 'Uma página, uma decisão',
        text: 'A página conduz da curiosidade até a inscrição: o que vai acontecer na noite, quem ensina, a participação ao vivo da Coreia e o botão para garantir a vaga.',
      },
      {
        title: 'Identidade inspirada no Hangeul',
        text: 'O alfabeto coreano virou grafismo, com um visual leve para um público jovem.',
      },
      {
        title: 'Pensada para o celular',
        text: 'A maior parte do público chegava pelo Instagram e pelo WhatsApp, então tudo foi desenhado primeiro para a tela pequena.',
      },
    ],
    outcome: 'Mais de 1.500 pessoas se inscreveram na aula inaugural.',
    metrics: [
      { value: '1.500+', label: 'inscritos na aula inaugural' },
      { value: '1', label: 'página, do anúncio à inscrição' },
    ],
    role: 'Design e desenvolvimento',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    challenges: [
      'Traduzir a identidade coreana (Hangeul) em um visual leve para um público jovem',
      'Conduzir o visitante da curiosidade até a inscrição em uma única página',
      'Carregamento rápido no celular, onde está a maior parte do público',
    ],
    images: {
      desktop: '/images/cases/imersao-coreia-desktop.webp',
      mobile: '/images/cases/imersao-coreia-mobile.webp',
    },
    live: 'https://cursoimersaocoreia.vercel.app',
    color: '#C0392B',
  },
  {
    slug: 'enquete-juventude-shalom',
    title: 'Enquete da Juventude Shalom',
    kind: 'cliente',
    year: 2025,
    client: 'Assessoria Jovem — Comunidade Católica Shalom',
    segment: 'Comunidades e organizações',
    problem:
      'Ouvir jovens de missões espalhadas pelo mundo e transformar as respostas em informação para o conselho da comunidade.',
    shortDesc:
      'Plataforma de enquete em 6 idiomas com ranking de participação entre missões em tempo real.',
    fullDesc:
      'A Assessoria Jovem da Comunidade Shalom precisava ouvir os desafios dos jovens de missões em vários países e levar essas respostas ao Conselho Geral. Formulários comuns não davam conta de seis idiomas, nem davam motivo para as missões mobilizarem a sua juventude.',
    highlights: [
      {
        title: 'Seis idiomas, a mesma experiência',
        text: 'Português, espanhol, inglês, francês, italiano e polonês, com quatro perguntas e cerca de três minutos para responder.',
      },
      {
        title: 'Um ranking justo',
        text: 'As missões competem pela proporção de jovens mobilizados, não pelo tamanho. Uma missão pequena pode liderar.',
      },
      {
        title: 'Participação ao vivo',
        text: 'Contador de respostas e atividade em tempo real, que incentivam novas respostas a cada visita.',
      },
    ],
    outcome:
      'Mais de 2.218 respostas, consolidadas pela assessoria jovem e levadas ao Conselho Geral da comunidade.',
    metrics: [
      { value: '2.218+', label: 'respostas' },
      { value: '6', label: 'idiomas' },
      { value: 'Ao vivo', label: 'ranking entre missões' },
    ],
    role: 'Design e desenvolvimento full-stack',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    challenges: [
      'Interface em 6 idiomas (PT, ES, EN, FR, IT, PL) com a mesma experiência',
      'Ranking justo entre missões de tamanhos diferentes, calculado pela proporção de participação',
      'Contador e atividade em tempo real para estimular novas respostas',
      'Garantir uma resposta por pessoa sem expor os dados de quem respondeu',
    ],
    images: {
      desktop: '/images/cases/enquete-shalom-desktop.webp',
      mobile: '/images/cases/enquete-shalom-mobile.webp',
    },
    live: 'https://enquete-shalom.vercel.app',
    color: '#1F6FB2',
  },
  {
    slug: 'closr',
    title: 'Closr',
    kind: 'laboratorio',
    year: 2025,
    segment: 'Corretoras de seguros',
    problem:
      'A equipe de atendimento de uma corretora perdia horas copiando, colando e ajustando à mão cada mensagem de pós-venda.',
    shortDesc:
      'Protótipo de gerador de mensagens de pós-venda criado durante um estágio e usado pela equipe de atendimento de uma corretora.',
    fullDesc:
      'Criei o Closr durante um estágio de pouco mais de três meses numa corretora de seguros. As mensagens de pós-venda eram montadas à mão, com erros de dados e sem padrão entre atendentes. O protótipo virou ferramenta do dia a dia da equipe e ficou com a empresa ao fim do estágio.',
    highlights: [
      {
        title: 'Templates com campos dinâmicos',
        text: 'Gestores criam os modelos uma vez; atendentes preenchem um formulário e copiam a mensagem pronta para o WhatsApp.',
      },
      {
        title: 'Um padrão para a equipe',
        text: 'Três níveis de acesso (master, gestor e atendente) e convite por link para entrar na equipe.',
      },
    ],
    role: 'Full-stack (estágio)',
    duration: 'Pouco mais de 3 meses',
    stack: ['react', 'vite', 'tailwindcss', 'nodejs', 'express', 'supabase', 'postgresql'],
    challenges: [
      'Arquitetura multi-tenant com Row Level Security (RLS) no Supabase, garantindo isolamento total de dados entre corretoras',
      'Parser de templates próprio, com campos simples e blocos de repetição para estruturas variáveis (ex.: dependentes)',
      'Autenticação e autorização com múltiplos roles, rotas protegidas por nível de acesso e fluxo de convite via token',
      'Integração React + Node.js em produção: CORS, ordem de inicialização do dotenv e refresh automático de JWT expirado',
      'Deploy com variáveis de ambiente seguras — frontend na Vercel e backend no Railway com auto-deploy via GitHub',
    ],
    images: {
      desktop: '/images/projects/closr.webp',
    },
    github: 'https://github.com/speedyvad/Closr',
    color: '#10B981',
  },
  {
    slug: 'lectio-divina',
    title: 'Lectio Divina',
    kind: 'faculdade',
    year: 2024,
    shortDesc: 'App para praticar a leitura orante da Bíblia com a liturgia diária real.',
    fullDesc:
      'O Lectio Divina guia o usuário pelas 7 etapas da leitura orante com o evangelho real do dia, buscado de uma API externa. Permite navegar pelos 73 livros da Bíblia católica com versículos interativos, além de salvar sessões, anotações e favoritos. Design com paleta terrosa e tipografia litúrgica que remete a manuscritos antigos.',
    role: 'Full-stack',
    stack: ['nextjs', 'typescript', 'tailwindcss', 'supabase'],
    challenges: [
      'Integração com API de liturgia diária e sincronização em tempo real',
      'Autenticação e persistência de dados com Supabase',
      'Design system próprio com identidade visual contemplativa',
    ],
    images: { desktop: '/images/projects/lectio-divina.webp' },
    github: 'https://github.com/speedyvad/lectio-divina',
    color: '#8B5CF6',
  },
  {
    slug: 'caltracker',
    title: 'CalTracker',
    kind: 'faculdade',
    year: 2025,
    shortDesc: 'Controle de calorias com back-end funcional em Clojure.',
    fullDesc:
      'CalTracker é um rastreador de calorias e macronutrientes com back-end em Clojure usando Ring. A interface permite adicionar refeições, visualizar o consumo diário e acompanhar metas. Projeto para explorar o paradigma funcional no back-end.',
    role: 'Full-stack',
    stack: ['clojure', 'javascript', 'react', 'css3'],
    challenges: [
      'Aprender Clojure e o paradigma funcional para construir a API REST com Ring',
      'Integrar front-end React com back-end Clojure via JSON',
      'Busca com autocompletar no banco de alimentos',
      'Cálculo de macronutrientes com porções ajustáveis',
    ],
    images: { desktop: '/images/projects/caltracker.webp' },
    github: 'https://github.com/speedyvad/caltracker',
    color: '#10B981',
  },
  {
    slug: 'studyhub',
    title: 'StudyHub',
    kind: 'faculdade',
    year: 2024,
    shortDesc: 'Plataforma de estudos com dashboard, progresso e estatísticas.',
    fullDesc:
      'StudyHub organiza matérias, acompanha o progresso ao longo do tempo e mostra estatísticas de desempenho. Feito com React 19 e TypeScript, com Zustand para estado e Recharts para gráficos.',
    role: 'Front-end',
    stack: ['react', 'typescript', 'tailwindcss', 'vite'],
    challenges: [
      'Gráficos de progresso responsivos com dados dinâmicos (Recharts)',
      'Estado de múltiplas matérias e sessões de estudo com Zustand',
      'Sistema de sequência de dias (streaks) para engajar o usuário',
    ],
    github: 'https://github.com/speedyvad/studyhub',
    color: '#4F8EF7',
  },
]

export const clientProjects = projects.filter((p) => p.kind === 'cliente')
/** Destaques de /projetos: clientes e conceitos, na ordem do array. */
export const highlightProjects = projects.filter((p) => p.kind === 'cliente' || p.kind === 'conceito')
export const labProjects = projects.filter((p) => p.kind === 'laboratorio')
export const studyProjects = projects.filter((p) => p.kind === 'faculdade')

/** Vitrines da home: clientes primeiro (prova), depois os conceitos. */
export const featuredCases = [
  ...clientProjects,
  ...projects.filter((p) => p.kind === 'conceito'),
]

/** Imagem principal do projeto (ou undefined, e quem usa mostra o placeholder). */
export function projectPreview(project: Project) {
  return project.images?.desktop
}

const DEVICON_MAP: Record<string, string> = {
  'next.js': 'devicon-nextjs-plain',
  nextjs: 'devicon-nextjs-plain',
  react: 'devicon-react-original',
  typescript: 'devicon-typescript-plain',
  javascript: 'devicon-javascript-plain',
  'tailwind css': 'devicon-tailwindcss-original',
  tailwindcss: 'devicon-tailwindcss-original',
  vite: 'devicon-vitejs-plain',
  'node.js': 'devicon-nodejs-plain',
  nodejs: 'devicon-nodejs-plain',
  express: 'devicon-express-original',
  supabase: 'devicon-supabase-plain',
  postgresql: 'devicon-postgresql-plain',
  clojure: 'devicon-clojure-plain',
  css3: 'devicon-css3-plain',
  html5: 'devicon-html5-plain',
  astro: 'devicon-astro-plain',
}

const TECH_LABEL: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  tailwindcss: 'Tailwind CSS',
  vite: 'Vite',
  nodejs: 'Node.js',
  express: 'Express',
  supabase: 'Supabase',
  postgresql: 'PostgreSQL',
  clojure: 'Clojure',
  css3: 'CSS3',
  html5: 'HTML5',
}

/** Classe do Devicon, aceitando slugs e nomes já formatados. undefined quando não existe ícone. */
export function techIcon(tech: string) {
  return DEVICON_MAP[tech.toLowerCase()]
}

export function techLabel(tech: string) {
  return TECH_LABEL[tech.toLowerCase()] ?? tech
}
