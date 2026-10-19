import { projects } from './projects'

export interface GalleryImage {
  src: string
  alt: string
  slug: string
  /** Proporção aproximada da imagem — orienta o tamanho do plano/mockup. */
  orientation: 'desktop' | 'mobile'
}

/**
 * Prints reais dos projetos (desktop e mobile), usados na galeria curva do convite (capítulo 1).
 * Entram só os projetos de estúdio (cliente, conceito, laboratório) que têm imagem.
 */
export const galleryImages: GalleryImage[] = projects
  .filter((p) => p.kind !== 'faculdade' && p.images)
  .flatMap((project) => {
    const images = project.images!
    const items: GalleryImage[] = [
      {
        src: images.desktop,
        alt: `${project.title} — tela do site no computador`,
        slug: project.slug,
        orientation: 'desktop',
      },
    ]
    if (images.mobile) {
      items.push({
        src: images.mobile,
        alt: `${project.title} — tela do site no celular`,
        slug: project.slug,
        orientation: 'mobile',
      })
    }
    return items
  })
