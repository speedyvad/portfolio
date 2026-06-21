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
  github: string
  live?: string
  challenges: string[]
  mockupTheme: string
}

export const projects: Project[] = [
  {
    slug: 'studyhub',
    title: 'StudyHub',
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
    shortDesc: 'App de espiritualidade cristã para praticar a leitura orante da Bíblia com liturgia diária real',
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
  {
    slug: 'closr',
    title: 'Closr',
    shortDesc: 'SaaS B2B de geração de mensagens de pós-venda para corretoras de seguros. Elimina o processo manual de copiar, colar e personalizar mensagens para clientes.',
    fullDesc:
      'O Closr nasceu de uma dor real do mercado de seguros: equipes de atendimento perdiam tempo copiando e colando mensagens manualmente, cometendo erros de dados e sem nenhum padrão de comunicação. A plataforma permite que gestores criem templates inteligentes com campos dinâmicos, e atendentes gerem mensagens personalizadas em segundos — só preenchendo um formulário e copiando o resultado pronto para o WhatsApp. Arquitetura multi-tenant com isolamento por corretora, sistema de convites via link e controle de acesso por roles (master, gestor, atendente).',
    role: 'Full-Stack Developer',
    status: 'in-progress',
    year: 2025,
    stack: ['react', 'vite', 'tailwindcss', 'nodejs', 'express', 'supabase', 'postgresql'],
    color: '#10B981',
    github: 'https://github.com/speedyvad/Closr',
    live: 'https://closrr.vercel.app',
    challenges: [
      'Arquitetura multi-tenant com Row Level Security (RLS) no Supabase, garantindo isolamento total de dados entre corretoras',
      'Sistema de templates dinâmicos com parser customizado que suporta campos simples {{campo}} e blocos de repetição {{#dependentes}}...{{/dependentes}} para estruturas variáveis',
      'Autenticação e autorização com múltiplos roles, rotas protegidas por nível de acesso e fluxo de convite via token',
      'Integração frontend React com backend Node.js em produção, resolvendo problemas de CORS, ordem de inicialização do dotenv e refresh automático de JWT expirado',
      'Deploy em produção com variáveis de ambiente seguras — frontend no Vercel e backend no Railway com auto-deploy via GitHub',
    ],
    mockupTheme: 'mock-closr',
  },
]
