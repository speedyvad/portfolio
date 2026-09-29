import { useAnimatedNumber } from '../../hooks/useAnimatedNumber'
import { formatBRL } from '../../data/pricing'

interface Props {
  min: number
  max: number
  onContinue: () => void
  continueLabel?: string
  continueDisabled?: boolean
}

/**
 * Estimativa ao vivo: coluna fixa (sticky) no desktop, barra fixa no rodapé
 * no mobile — com o botão Continuar embutido, já que a barra ocupa o espaço
 * que o botão em fluxo normal usaria. Os números fazem uma transição curta
 * de contagem sempre que a faixa muda (o momento memorável da página).
 */
export default function EstimateBar({ min, max, onContinue, continueLabel = 'Continuar', continueDisabled }: Props) {
  const animMin = useAnimatedNumber(min)
  const animMax = useAnimatedNumber(max)

  return (
    <>
      <aside className="estimate-sidebar" aria-live="polite">
        <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '0.5rem' }}>
          Estimativa ao vivo
        </p>
        <p className="display" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', color: 'var(--sea)' }}>
          {formatBRL(animMin)} – {formatBRL(animMax)}
        </p>
        <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.75rem' }}>
          Atualiza a cada resposta. O valor final vem por escrito na proposta.
        </p>
      </aside>

      <div className="estimate-mobilebar" aria-live="polite">
        <div>
          <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
            Estimativa
          </p>
          <p className="display" style={{ fontSize: '1.15rem', color: 'var(--sea)' }}>
            {formatBRL(animMin)} – {formatBRL(animMax)}
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
