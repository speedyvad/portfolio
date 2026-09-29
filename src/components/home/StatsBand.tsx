import { stats, statsClosing, type Stat } from '../../data/stats'
import { useCountUp } from '../../hooks/useCountUp'

function StatSentence({ stat, size }: { stat: Stat; size: 'lg' | 'sm' }) {
  const { ref, value, started } = useCountUp(stat.value)
  const [before, after] = stat.sentence.split('{n}')

  return (
    <div style={{ maxWidth: size === 'lg' ? '46rem' : '28rem' }}>
      <p
        className="display"
        style={{
          fontSize: size === 'lg' ? 'clamp(1.9rem, 4.2vw, 3.25rem)' : 'clamp(1.35rem, 2.4vw, 1.85rem)',
          color: '#fff',
          lineHeight: 1.1,
        }}
      >
        {before}
        {/* Antes de começar a contar, reserva o espaço do valor final em
            opacidade 0 — nunca fica um "0" parado na tela. */}
        <span
          ref={ref as React.RefObject<HTMLSpanElement>}
          style={{ color: 'var(--gold)', opacity: started ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          {started ? value : stat.value}
          {stat.suffix}
        </span>
        {after}
      </p>
      <p className="fs-small" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.65rem' }}>
        Fonte:{' '}
        <a
          href={stat.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.35)', paddingBottom: 1 }}
        >
          {stat.source}
        </a>
      </p>
    </div>
  )
}

export default function StatsBand() {
  // O primeiro dado é o protagonista, largura total; os outros dois vêm menores, lado a lado.
  const [protagonist, ...rest] = stats

  return (
    <section className="section-y" style={{ background: 'var(--sea)' }}>
      <div className="container-x">
        <StatSentence stat={protagonist} size="lg" />

        <div className="stats-secondary">
          {rest.map((stat) => (
            <StatSentence key={stat.sentence} stat={stat} size="sm" />
          ))}
        </div>

        <p
          className="fs-lead measure"
          style={{ color: '#fff', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.16)' }}
        >
          {statsClosing}
        </p>
      </div>

      <style>{`
        .stats-secondary {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          margin-top: 2.75rem;
        }
        @media (min-width: 700px) {
          .stats-secondary { flex-direction: row; gap: 3.5rem; }
        }
      `}</style>
    </section>
  )
}
