import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'

const LANDING_PAGE_PRICE = 800

function formatCentsBRL(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/** Capítulo 3 — a calculadora de perda. Simulação feita com os números do próprio visitante. */
export default function LossCalculator() {
  const [cents, setCents] = useState(0)
  const [clientes, setClientes] = useState(2)
  const ticketId = useId()
  const sliderId = useId()

  const ticket = cents / 100
  const perMonth = ticket * clientes
  const perYear = perMonth * 12
  const breakEvenUnits = ticket > 0 ? Math.max(1, Math.ceil(LANDING_PAGE_PRICE / ticket)) : 0

  const onTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '')
    setCents(digits ? parseInt(digits, 10) : 0)
  }

  return (
    <div className="section-y" style={{ background: 'var(--sea)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ color: '#fff', marginBottom: '2.5rem', maxWidth: '36rem' }}>
          Quanto você deixa na mesa sem ser encontrado?
        </h2>

        <div className="calc-grid">
          <div className="calc-inputs">
            <div className="calc-field">
              <label htmlFor={ticketId} className="label-ui" style={{ color: '#fff', display: 'block', marginBottom: '0.6rem' }}>
                Quanto vale um cliente para você?
              </label>
              <input
                id={ticketId}
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={cents ? formatCentsBRL(cents) : ''}
                onChange={onTicketChange}
                className="calc-input"
              />
            </div>

            <div className="calc-field">
              <label htmlFor={sliderId} className="label-ui" style={{ color: '#fff', display: 'block', marginBottom: '0.6rem' }}>
                Quantos clientes a mais por mês seriam realistas?
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  id={sliderId}
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={clientes}
                  onChange={(e) => setClientes(Number(e.target.value))}
                  className="calc-slider"
                />
                <span className="text-proof" style={{ color: 'var(--gold)', fontSize: '1.75rem', minWidth: '2.5ch', textAlign: 'right' }}>
                  {clientes}
                </span>
              </div>
            </div>
          </div>

          <div className="calc-output">
            <p className="fs-lead" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '0.5rem' }}>
              Por mês:
            </p>
            <p className="display text-proof" style={{ color: 'var(--gold)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
              <NumberFlow value={perMonth} format={{ style: 'currency', currency: 'BRL' }} locales="pt-BR" />
            </p>

            <p className="fs-lead" style={{ color: 'rgba(255,255,255,0.75)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              Por ano:
            </p>
            <p className="display text-proof" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <NumberFlow value={perYear} format={{ style: 'currency', currency: 'BRL' }} locales="pt-BR" />
            </p>

            <p className="fs-body" style={{ color: 'rgba(255,255,255,0.85)', marginTop: '1.75rem' }}>
              {ticket <= 0 ? (
                <>Uma landing page começa em R$ 800.</>
              ) : ticket >= LANDING_PAGE_PRICE ? (
                <>Uma landing page começa em R$ 800. Ela se paga com o primeiro cliente.</>
              ) : (
                <>
                  Uma landing page começa em R$ 800. Ela se paga com{' '}
                  <NumberFlow value={breakEvenUnits} /> {breakEvenUnits === 1 ? 'cliente' : 'clientes'}.
                </>
              )}
            </p>
          </div>
        </div>

        <p className="fs-small" style={{ color: 'rgba(255,255,255,0.55)', marginTop: '2.5rem' }}>
          Simulação feita com os seus números. Não é promessa de resultado.
        </p>

        <Link className="btn btn-primary" to="/orcamento" style={{ marginTop: '1.75rem', display: 'inline-flex' }}>
          Simular o orçamento do meu site
        </Link>
      </div>

      <style>{`
        .calc-grid { display: flex; flex-direction: column; gap: 2.5rem; }
        .calc-field { margin-bottom: 1.75rem; }
        .calc-input {
          width: 100%;
          max-width: 20rem;
          min-height: 56px;
          padding: 0 1rem;
          border-radius: var(--r-input);
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .calc-input::placeholder { color: rgba(255,255,255,0.4); }
        .calc-input:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
        .calc-slider {
          flex: 1;
          height: 44px;
          accent-color: var(--gold);
          cursor: pointer;
        }
        @media (min-width: 1024px) {
          .calc-grid { flex-direction: row; gap: 4rem; }
          .calc-inputs { flex: 1; }
          .calc-output { flex: 1; }
        }
      `}</style>
    </div>
  )
}
