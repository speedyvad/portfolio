interface Props {
  /** Tamanho da fonte do wordmark. */
  size?: string
  /** Em faixas --sea o texto vira branco. */
  onDark?: boolean
}

/**
 * "Dourado" em Archivo expandida 800 + "Studio" em Archivo 400,
 * precedido pelo traço dourado — a linha do horizonte.
 */
export default function Wordmark({ size = '1.35rem', onDark = false }: Props) {
  const color = onDark ? '#fff' : 'var(--sea)'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        color,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '1.4em',
          height: 3,
          background: 'var(--gold)',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: size }}>
        <span
          className="display"
          style={{ fontSize: 'inherit', fontWeight: 800 }}
        >
          Dourado
        </span>{' '}
        <span
          style={{
            fontSize: 'inherit',
            fontWeight: 400,
            fontStretch: '100%',
            letterSpacing: '-0.01em',
          }}
        >
          Studio
        </span>
      </span>
    </span>
  )
}
