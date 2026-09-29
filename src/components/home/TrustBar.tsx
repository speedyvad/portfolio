import { trustSentence, trustNumbers } from '../../data/trust'

/**
 * Faixa de confiança — discreta e compacta, fundo branco.
 * Visualmente oposta à faixa de dados que vem em seguida (fundo --sea, escura):
 * aqui não há contagem animada, só a prova social direta.
 */
export default function TrustBar() {
  return (
    <section className="trust-bar" style={{ background: 'var(--white)' }}>
      <div className="container-x">
        <p style={{ color: 'var(--sea-soft)', maxWidth: '52rem', marginBottom: '1.25rem' }}>
          {trustSentence}
        </p>

        <div className="trust-numbers">
          {trustNumbers.map((n) => (
            <div key={n.label}>
              <p className="display fs-h3 trust-value">{n.value}</p>
              <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.35rem' }}>
                {n.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-bar { padding-block: 2.25rem; }
        .trust-numbers {
          display: flex;
          gap: 3rem;
        }
        .trust-value { white-space: nowrap; }
        @media (max-width: 640px) {
          .trust-numbers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        }
      `}</style>
    </section>
  )
}
