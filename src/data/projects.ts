export type ProjectKind = 'cliente' | 'autoral' | 'modelo'

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  shortDesc: string
  fullDesc: string
  role: string
  status: 'completed' | 'in-progress'
  year: number
  stack: string[]
  color: string
  github?: string
  live?: string
  challenges: string[]
  mockupTheme: string
  kind: ProjectKind
  client?: string
  segment?: string
  /** O problema do cliente em uma frase. */
  problem?: string
  metrics?: ProjectMetric[]
  images?: { desktop: string; mobile?: string }
}

export const projects: Project[] = [
  {
    slug: 'imersao-coreia',
    title: 'Imersão Coreia',
    kind: 'cliente',
    client: 'Curso Imersão Coreia — Comunidade Católica Shalom',
    segment: 'Educação e eventos',
    problem:
      'Divulgar uma aula inaugural gratuita e ao vivo e captar inscrições para um curso de 10 meses de preparação para a JMJ Seul 2027.',
    shortDesc:
      'Landing page de inscrição para a aula inaugural de um curso de língua e cultura coreana.',
    fullDesc:
      'Página de captação para a aula inaugural do Imersão Coreia, curso de 10 meses de língua, cultura e história coreana em preparação para a Jornada Mundial da Juventude em Seul, 2027. A página apresenta a programação da noite, a participação ao vivo direto da Coreia, a professora do curso e leva o visitante até a inscrição, com uma identidade visual inspirada no Hangeul.',
    role: 'Design e desenvolvimento',
    status: 'completed',
    year: 2025,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    live: 'https://cursoimersaocoreia.vercel.app',
    metrics: [
      { value: '1.500+', label: 'inscritos na aula inaugural' },
      { value: '1', label: 'página, do anúncio à inscrição' },
    ],
    images: {
      desktop: '/images/cases/imersao-coreia-desktop.png',
      mobile: '/images/cases/imersao-coreia-mobile.png',
    },
    challenges: [
      'Traduzir a identidade coreana (Hangeul) em um visual leve para um público jovem',
      'Conduzir o visitante da curiosidade até a inscrição em uma única página',
      'Carregamento rápido no celular, onde está a maior parte do público',
    ],
    color: '#C0392B',
    mockupTheme: 'mock-coreia',
  },
  {
    slug: 'enquete-juventude-shalom',
    title: 'Enquete da Juventude Shalom',
    kind: 'cliente',
    client: 'Assessoria Jovem — Comunidade Católica Shalom',
    segment: 'Comunidades e organizações',
    problem:
      'Ouvir jovens de missões espalhadas pelo mundo e transformar as respostas em informação para o conselho da comunidade.',
    shortDesc:
      'Plataforma de enquete em 6 idiomas com ranking de participação entre missões em tempo real.',
    fullDesc:
      'Enquete rápida (4 perguntas, cerca de 3 minutos) para ouvir os desafios dos jovens da Comunidade Shalom no mundo todo. Disponível em 6 idiomas, com contador de respostas ao vivo e um ranking entre missões que premia a proporção de jovens mobilizados, não o tamanho da missão. As respostas são consolidadas pela assessoria jovem e levadas ao Conselho Geral.',
    role: 'Design e desenvolvimento full-stack',
    status: 'completed',
    year: 2025,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    live: 'https://enquete-shalom.vercel.app',
    metrics: [
      { value: '2.218+', label: 'respostas' },
      { value: '6', label: 'idiomas' },
      { value: 'Ao vivo', label: 'ranking entre missões' },
    ],
    images: {
      desktop: '/images/cases/enquete-shalom-desktop.png',
      mobile: '/images/cases/enquete-shalom-mobile.png',
    },
    challenges: [
      'Interface em 6 idiomas (PT, ES, EN, FR, IT, PL) com a mesma experiência',
      'Ranking justo entre missões de tamanhos diferentes, calculado pela proporção de participação',
      'Contador e atividade em tempo real para estimular novas respostas',
      'Garantir uma resposta por pessoa sem expor os dados de quem respondeu',
    ],
    color: '#1F6FB2',
    mockupTheme: 'mock-enquete',
  },
  {
    slug: 'closr',
    title: 'Closr',
    kind: 'cliente',
    segment: 'Corretoras de seguros',
    problem:
      'Equipes de atendimento perdiam horas copiando, colando e personalizando manualmente cada mensagem de pós-venda enviada aos clientes.',
    shortDesc:
      'SaaS B2B de geração de mensagens de pós-venda para corretoras de seguros. Elimina o processo manual de copiar, colar e personalizar mensagens para clientes.',
    fullDesc:
      'O Closr nasceu de uma dor real do mercado de seguros: equipes de atendimento perdiam tempo copiando e colando mensagens manualmente, cometendo erros de dados e sem nenhum padrão de comunicação. A plataforma permite que gestores criem templates inteligentes com campos dinâmicos, e atendentes gerem mensagens personalizadas em segundos — só preenchendo um formulário e copiando o resultado pronto para o WhatsApp. Arquitetura multi-tenant com isolamento por corretora, sistema de convites via link e controle de acesso por roles (master, gestor, atendente).',
    role: 'Full-Stack Developer',
    status: 'in-progress',
    year: 2025,
    stack: ['react', 'vite', 'tailwindcss', 'nodejs', 'express', 'supabase', 'postgresql'],
    color: '#10B981',
    github: 'https://github.com/speedyvad/Closr',
    live: 'https://closrr.vercel.app',
    metrics: [
      { value: 'Segundos', label: 'para gerar cada mensagem' },
      { value: '3', label: 'níveis de acesso' },
    ],
    images: {
      desktop: '/images/projects/closr.png',
    },
    challenges: [
      'Arquitetura multi-tenant com Row Level Security (RLS) no Supabase, garantindo isolamento total de dados entre corretoras',
      'Sistema de templates dinâmicos com parser customizado que suporta campos simples e blocos de repetição para estruturas variáveis',
      'Autenticação e autorização com múltiplos roles, rotas protegidas por nível de acesso e fluxo de convite via token',
      'Integração frontend React com backend Node.js em produção, resolvendo problemas de CORS, ordem de inicialização do dotenv e refresh automático de JWT expirado',
      'Deploy em produção com variáveis de ambiente seguras — frontend no Vercel e backend no Railway com auto-deploy via GitHub',
    ],
    mockupTheme: 'mock-closr',
  },
  {
    slug: 'studyhub',
    title: 'StudyHub',
    kind: 'autoral',
    shortDesc: 'Plataforma de estudos com dashboard, progresso e estatísticas de aprendizado.',
    fullDesc:
      'StudyHub é uma plataforma completa de gestão de estudos, permitindo que estudantes organizem matérias, acompanhem seu progresso ao longo do tempo e visualizem estatísticas detalhadas de desempenho. Desenvolvida com React 19 e TypeScript, utiliza Zustand para gerenciamento de estado e Recharts para visualizações de dados.',
    role: 'Front-End Developer',
    status: 'completed',
    year: 2024,
    stack: ['react', 'typescript', 'tailwindcss', 'vite'],
    color: '#4F8EF7',
    github: 'https://github.com/speedyvad/studyhub',
    challenges: [
      'Implementar gráficos de progresso responsivos com dados dinâmicos usando Recharts',
      'Gerenciar estado complexo de múltiplas matérias e sessões de estudo com Zustand',
      'Criar um sistema de streaks e gamificação para engajar o usuário',
      'Otimizar re-renders em listas longas de anotações com memoização',
    ],
    mockupTheme: 'studyhub',
  },
  {
    slug: 'lectio-divina',
    title: 'Lectio Divina',
    kind: 'autoral',
    shortDesc:
      'App de espiritualidade cristã para praticar a leitura orante da Bíblia com liturgia diária real',
    fullDesc:
      'O Lectio Divina guia o usuário pelas 7 etapas da leitura orante com o evangelho real do dia, buscado de uma API externa. Permite navegar pelos 73 livros da Bíblia católica com versículos interativos, além de salvar sessões, anotações e favoritos. Design com paleta terrosa e tipografia litúrgica que remete a manuscritos antigos.',
    role: 'Full-Stack Developer',
    status: 'completed',
    year: 2024,
    stack: ['nextjs', 'typescript', 'tailwindcss', 'supabase'],
    color: '#8B5CF6',
    github: 'https://github.com/speedyvad/lectio-divina',
    challenges: [
      'Integração com API de liturgia diária e sincronização em tempo real',
      'Autenticação e persistência de dados com Supabase',
      'Design system próprio com identidade visual contemplativa e afastada do ruído digital',
    ],
    mockupTheme: 'lectio-divina',
  },
  {
    slug: 'caltracker',
    title: 'CalTracker',
    kind: 'autoral',
    shortDesc: 'Controle de calorias com back-end em Clojure e interface React intuitiva.',
    fullDesc:
      'CalTracker é um rastreador de calorias e macronutrientes com um back-end funcional desenvolvido em Clojure usando o framework Ring. A interface React permite adicionar refeições, visualizar consumo diário e acompanhar metas nutricionais. Projeto que explorou paradigma funcional no back-end.',
    role: 'Full-Stack Developer',
    status: 'in-progress',
    year: 2025,
    stack: ['clojure', 'javascript', 'react', 'css3'],
    color: '#10B981',
    github: 'https://github.com/speedyvad/caltracker',
    challenges: [
      'Aprender Clojure e o paradigma funcional para construir a API REST com Ring',
      'Integrar front-end React com back-end Clojure via fetch/JSON',
      'Implementar banco de dados de alimentos com busca e autocompletar eficiente',
      'Calcular macronutrientes dinamicamente com base em porções ajustáveis',
    ],
    mockupTheme: 'caltracker',
  },
]

export const clientProjects = projects.filter((p) => p.kind === 'cliente')
export const personalProjects = projects.filter((p) => p.kind === 'autoral')

/** Cases mostrados nas vitrines da home. */
export const featuredCases = clientProjects

/** Imagem desktop do case, com queda para /images/projects/<slug>.png */
export function projectPreview(project: Project) {
  return project.images?.desktop ?? `/images/projects/${project.slug}.png`
}

export function projectPreviewFallback(project: Project) {
  return `/images/projects/${project.slug}.png`
}

const DEVICON_MAP: Record<string, string> = {
  'next.js': 'devicon-nextjs-plain',
  nextjs: 'devicon-nextjs-plain',
  react: 'devicon-react-original',
  typescript: 'devicon-typescript-plain',
  javascript: 'devicon-javascript-plain',
  'tailwind css': 'devicon-tailwindcss-plain',
  tailwindcss: 'devicon-tailwindcss-plain',
  vite: 'devicon-vitejs-plain',
  'node.js': 'devicon-nodejs-plain',
  nodejs: 'devicon-nodejs-plain',
  express: 'devicon-express-original',
  supabase: 'devicon-supabase-plain',
  postgresql: 'devicon-postgresql-plain',
  clojure: 'devicon-clojure-plain',
  css3: 'devicon-css3-plain',
  html5: 'devicon-html5-plain',
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

/** Classe do Devicon, aceitando slugs e nomes já formatados. */
export function techIcon(tech: string) {
  return DEVICON_MAP[tech.toLowerCase()] ?? 'devicon-devicon-plain'
}

export function techLabel(tech: string) {
  return TECH_LABEL[tech.toLowerCase()] ?? tech
}
