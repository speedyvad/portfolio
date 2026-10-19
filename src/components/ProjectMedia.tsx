import { useState } from 'react'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  /** Proporção do painel. */
  ratio?: string
  priority?: boolean
}

function Shot({
  src,
  alt,
  priority,
  onFail,
}: {
  src: string
  alt: string
  priority?: boolean
  onFail: () => void
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={onFail}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
    />
  )
}

/**
 * Painel areia com brilho na cor do projeto, o print do computador numa janela de navegador
 * e o print do celular sobreposto. Sem imagem: placeholder com o nome do projeto.
 * O hover (sobe a janela e o celular) é ligado pelo pai via classe `.pm-host:hover`.
 */
export default function ProjectMedia({ project, ratio = '16 / 11', priority }: Props) {
  const [desktopOk, setDesktopOk] = useState(true)
  const [mobileOk, setMobileOk] = useState(true)
  const desktop = project.images?.desktop
  const mobile = project.images?.mobile

  return (
    <div className="pm" style={{ aspectRatio: ratio, ['--pm-color' as string]: project.color }}>
      {desktop && desktopOk ? (
        <div className="pm-window">
          <div className="pm-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="pm-screen">
            <Shot
              src={desktop}
              alt={`Tela do projeto ${project.title} no computador`}
              priority={priority}
              onFail={() => setDesktopOk(false)}
            />
          </div>
        </div>
      ) : (
        <div className="pm-empty">
          <span className="display">{project.title}</span>
        </div>
      )}

      {mobile && mobileOk && desktopOk && (
        <div className="pm-phone">
          <div className="pm-phone-screen">
            <Shot
              src={mobile}
              alt={`Tela do projeto ${project.title} no celular`}
              priority={priority}
              onFail={() => setMobileOk(false)}
            />
          </div>
        </div>
      )}

    </div>
  )
}
