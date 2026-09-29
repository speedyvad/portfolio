export interface Testimonial {
  quote: string
  author: string
  role: string
  /** Slug do projeto em /projetos, se o depoimento se referir a um case específico. */
  caseSlug?: string
}

/**
 * Vazio até que a Dourado Studio colete depoimentos reais de clientes.
 * NUNCA preencher com depoimentos inventados — a seção correspondente na
 * home (Testimonials) só é renderizada quando este array tiver itens.
 */
export const testimonials: Testimonial[] = []
