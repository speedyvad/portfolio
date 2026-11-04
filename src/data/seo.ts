import { projects, type Project } from './projects'
import { services, servicesPageCopy, type Service } from './services'

/** Título, descrição e imagem de uma página: fonte única do `useSEO` e do HTML gerado no build. */
export interface PageSeo {
  title: string
  description: string
  path: string
  image?: string
}

export const homeSeo: PageSeo = {
  title: 'Dourado Studio — Criação de sites e landing pages em Fortaleza',
  description:
    'Sites, landing pages e sistemas sob medida para empresas, cursos e eventos. Estúdio em Fortaleza com atendimento para todo o Brasil. Fale direto pelo WhatsApp.',
  path: '/',
}

export const aboutSeo: PageSeo = {
  title: 'Vinícius Dourado — Desenvolvedor front-end | Dourado Studio',
  description:
    'Trajetória de Vinícius Dourado: desenvolvedor front-end em Fortaleza, com experiência no Sistema Verdes Mares e formação em Ciências da Computação na Unifor.',
  path: '/sobre',
}

export const projectsSeo: PageSeo = {
  title: 'Projetos — Dourado Studio',
  description:
    'Sites, landing pages e sistemas desenhados e programados pela Dourado Studio: cases de clientes, projetos conceito e laboratório.',
  path: '/projetos',
}

export const servicesSeo: PageSeo = {
  title: servicesPageCopy.seoTitle,
  description: servicesPageCopy.seoDescription,
  path: '/servicos',
}

/** Página em pausa: fora do sitemap, mas com HTML próprio porque a rota continua existindo. */
export const raioXSeo: PageSeo = {
  title: 'Raio-X grátis do seu site — em breve | Dourado Studio',
  description: 'Uma ferramenta para descobrir em segundos se o seu site está afastando clientes. Em breve.',
  path: '/raio-x',
}

export const notFoundSeo: PageSeo = {
  title: 'Página não encontrada — Dourado Studio',
  description: 'Este endereço não existe. Os serviços e os projetos da Dourado Studio continuam no site.',
  path: '/404',
}

export function serviceSeo(service: Service): PageSeo {
  return {
    title: `${service.name} em Fortaleza — Dourado Studio`,
    description: service.summary,
    path: `/servicos/${service.slug}`,
    image: service.heroImage,
  }
}

export function projectSeo(project: Project): PageSeo {
  return {
    title: `${project.title} — Case Dourado Studio`,
    description: project.problem ?? project.shortDesc,
    path: `/projetos/${project.slug}`,
    image: project.images?.desktop,
  }
}

/** Páginas públicas: as mesmas do sitemap. Cada uma ganha um HTML próprio no build. */
export function publicPages(): PageSeo[] {
  return [
    homeSeo,
    servicesSeo,
    ...services.map(serviceSeo),
    projectsSeo,
    ...projects.map(projectSeo),
    aboutSeo,
  ]
}
