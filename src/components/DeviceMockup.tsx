import { useState } from 'react'

interface Props {
  title: string
  desktop?: string
  mobile?: string
  /** Imagem alternativa quando a do case ainda não existe. */
  desktopFallback?: string
  priority?: boolean
}

function Placeholder({ title, small = false }: { title: string; small?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--sand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: small ? '0.5rem' : '1.5rem',
      }}
    >
      <span
        className="display"
        style={{
          fontSize: small ? '0.7rem' : 'clamp(1rem, 2.4vw, 1.75rem)',
          color: 'var(--sea)',
          textAlign: 'center',
          lineHeight: 1.05,
        }}
      >
        {title}
      </span>
    </div>
  )
}

function Screen({
  src,
  fallbackSrc,
  alt,
  title,
  small,
  priority,
  objectPosition = 'top center',
}: {
  src?: string
  fallbackSrc?: string
  alt: string
  title: string
  small?: boolean
  priority?: boolean
  objectPosition?: string
}) {
  const sources = [src, fallbackSrc].filter(Boolean) as string[]
  const [index, setIndex] = useState(0)

  if (index >= sources.length) return <Placeholder title={title} small={small} />

  return (
    <img
      src={sources[index]}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
      }}
    />
  )
}

/**
 * Notebook (tela 16:10 + base fina) com o celular sobreposto no canto inferior direito.
 * Tudo em CSS, sem imagem de moldura.
 */
export default function DeviceMockup({ title, desktop, mobile, desktopFallback, priority }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '3.5rem', paddingRight: mobile ? '2.5rem' : 0 }}>
      {/* Notebook */}
      <div
        style={{
          background: 'var(--sea)',
          borderRadius: 'var(--r-media)',
          padding: '10px 10px 0',
          boxShadow: '0 24px 60px rgba(14,44,63,0.18)',
        }}
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 10',
            borderRadius: '12px 12px 0 0',
            overflow: 'hidden',
            background: 'var(--sand)',
          }}
        >
          <Screen
            src={desktop}
            fallbackSrc={desktopFallback}
            alt={`Tela do projeto ${title} no computador`}
            title={title}
            priority={priority}
            objectPosition="top center"
          />
        </div>
      </div>

      {/* Base do notebook */}
      <div
        style={{
          height: 12,
          background: 'linear-gradient(to bottom, #0E2C3F, #08202F)',
          borderRadius: '0 0 14px 14px',
          margin: '0 auto',
          width: '104%',
          maxWidth: '104%',
          marginLeft: '-2%',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 64,
            height: 4,
            borderRadius: '0 0 6px 6px',
            background: 'rgba(255,255,255,0.18)',
          }}
        />
      </div>

      {/* Celular sobreposto */}
      {mobile && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '22%',
            minWidth: 96,
            maxWidth: 160,
            background: 'var(--sea)',
            borderRadius: 36,
            padding: 7,
            boxShadow: '0 18px 40px rgba(14,44,63,0.28)',
          }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '9 / 19.5',
              borderRadius: 30,
              overflow: 'hidden',
              background: 'var(--sand)',
            }}
          >
            <Screen
              src={mobile}
              alt={`Tela do projeto ${title} no celular`}
              title={title}
              small
            />
            {/* Notch */}
            <span
              style={{
                position: 'absolute',
                top: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '38%',
                height: 8,
                borderRadius: 999,
                background: 'var(--sea)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
