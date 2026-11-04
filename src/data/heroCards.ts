import { projects } from './projects'

export interface HeroCard {
  /** Nome-base em public/images/hero (gerado por scripts/build-hero-cards.mjs). */
  image: string
  alt: string
  /** Case para onde o cartão leva. */
  slug: string
  /** Nome do projeto, mostrado no cartão. */
  name: string
}

/**
 * Cartões do cilindro do convite (capítulo 1): prints inteiros dos sites, em 3:4.
 * A ordem alterna projetos e fundos claros e escuros.
 */
const CARDS: Omit<HeroCard, 'name'>[] = [
  { image: 'harmon-ritual', slug: 'harmon-visagismo', alt: 'Seção "Mais que um corte" do site da Harmon, com foto do salão' },
  { image: 'enquete-topo', slug: 'enquete-juventude-shalom', alt: 'Início da enquete da Juventude Shalom' },
  { image: 'coreia-topo', slug: 'imersao-coreia', alt: 'Início da página da aula de Imersão Coreana' },
  { image: 'harmon-topo', slug: 'harmon-visagismo', alt: 'Início do site da Harmon' },
  { image: 'enquete-respostas', slug: 'enquete-juventude-shalom', alt: 'Contador de respostas da enquete da Juventude Shalom' },
  { image: 'harmon-clube', slug: 'harmon-visagismo', alt: 'Seção "Um clube, não uma fila" do site da Harmon' },
  { image: 'coreia-programa', slug: 'imersao-coreia', alt: 'Programação da aula de Imersão Coreana' },
  { image: 'harmon-metodo', slug: 'harmon-visagismo', alt: 'Seção "Visagismo é estratégia" do site da Harmon' },
]

export const heroCards: HeroCard[] = CARDS.map((card) => ({
  ...card,
  name: projects.find((p) => p.slug === card.slug)?.title ?? card.slug,
}))

export const heroCylinderCopy = {
  label: 'Projetos da Dourado Studio',
}
