export interface SummaryItem {
  label: string
  value: string
}

interface Props {
  items: SummaryItem[]
  deadline?: string
  onContinue: () => void
  continueLabel?: string
  continueDisabled?: boolean
}

/**
 * Resumo do projeto montado até aqui: coluna fixa (sticky) no desktop, barra
 * fixa no rodapé no mobile — com o botão Continuar embutido, já que a barra
 * ocupa o espaço que o botão em fluxo normal usaria. Sem preço: o valor vem
 * na proposta, depois da conversa.
 */
export default function ProjectSummary({ items, deadline, onContinue, continueLabel = 'Continuar', continueDisabled }: Props) {
  return (
    <>
      <aside className="summary-sidebar" aria-live="polite">
        <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginBottom: '1rem' }}>
          Seu projeto até agora
        </p>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {items.map((item) => (
            <div key={item.label}>
              <dt className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                {item.label}
              </dt>
              <dd style={{ color: 'var(--sea)', fontWeight: 600 }}>{item.value}</dd>
            </div>
          ))}
          {deadline && (
            <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--line)' }}>
              <dt className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                Prazo estimado
              </dt>
              <dd className="display" style={{ fontSize: '1.35rem', color: 'var(--sea)' }}>
                {deadline}
              </dd>
            </div>
          )}
        </dl>
        <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '1rem' }}>
          No fim, tudo isso vira uma mensagem pronta pro WhatsApp.
        </p>
      </aside>

      <div className="summary-mobilebar" aria-live="polite">
        <div style={{ minWidth: 0 }}>
          <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
            {deadline ? 'Prazo estimado' : 'Seu projeto'}
          </p>
          <p className="display" style={{ fontSize: '1.05rem', color: 'var(--sea)' }}>
            {deadline ?? items[0]?.value}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onContinue}
          disabled={continueDisabled}
          style={{ opacity: continueDisabled ? 0.5 : 1, flexShrink: 0 }}
        >
          {continueLabel}
        </button>
      </div>
    </>
  )
}
