import { useState } from 'react'

interface Props {
  src: string
  alt: string
  fallbackTheme: string
  className?: string
  style?: React.CSSProperties
}

const THEME_COLORS: Record<string, string> = {
  studyhub: '#4F8EF7',
  'lectio-divina': '#8B5CF6',
  caltracker: '#10B981',
}

export default function ProjectImage({ src, alt, fallbackTheme, className, style }: Props) {
  const [error, setError] = useState(false)
  const color = THEME_COLORS[fallbackTheme] || 'var(--yellow)'

  if (error || !src) {
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(135deg, var(--bg3) 0%, ${color}18 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}30`,
          ...style,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', opacity: 0.4 }}>⬡</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', color, opacity: 0.7 }}>
            {alt}
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
      style={{ objectFit: 'cover', ...style }}
    />
  )
}
