import { projects, projectPreview } from './projects'

export interface GalleryImage {
  src: string
  alt: string
  slug: string
  /** Proporção aproximada da imagem — orienta o tamanho do plano/mockup. */
  orientation: 'desktop' | 'mobile'
}

/**
 * Prints reais dos projetos (desktop e mobile), usados na galeria curva do convite (capítulo 1).
 * Projetos sem { images } entram com o print único de /images/projects/<slug>.png.
 */
export const galleryImages: GalleryImage[] = projects.flatMap((project) => {
  if (project.images) {
    const items: GalleryImage[] = [
      {
        src: project.images.desktop,
        alt: `${project.title} — tela do site no computador`,
        slug: project.slug,
        orientation: 'desktop',
      },
    ]
    if (project.images.mobile) {
      items.push({
        src: project.images.mobile,
        alt: `${project.title} — tela do site no celular`,
        slug: project.slug,
        orientation: 'mobile',
      })
    }
    return items
  }

  return [
    {
      src: projectPreview(project),
      alt: `${project.title} — print do projeto`,
      slug: project.slug,
      orientation: 'desktop' as const,
    },
  ]
})
