interface Props {
  type: 'radio' | 'checkbox'
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
  hint?: string
  /** Ex.: "+25%" ou "Incluso" — badge discreto no canto. */
  badge?: string
  /** Ex.: extra já incluso no tipo — mostra marcado, sem poder ser desmarcado. */
  disabled?: boolean
}

/**
 * Bloco grande selecionável (área de toque mínima 56px) com um input
 * radio/checkbox real por baixo, visualmente escondido mas focável — para
 * acessibilidade e navegação por teclado.
 */
export default function OptionCard({ type, name, value, checked, onChange, label, hint, badge, disabled }: Props) {
  return (
    <label className={`option-card${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="option-card-input"
      />
      <span
        className="option-card-mark"
        aria-hidden="true"
        style={{ borderRadius: type === 'radio' ? '50%' : '6px' }}
      />
      <span className="option-card-text">
        <span className="option-card-label">{label}</span>
        {hint && <span className="option-card-hint">{hint}</span>}
      </span>
      {badge && <span className="option-card-badge">{badge}</span>}
    </label>
  )
}
