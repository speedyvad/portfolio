import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProgressBar from '../components/orcamento/ProgressBar'
import OptionCard from '../components/orcamento/OptionCard'
import EstimateBar from '../components/orcamento/EstimateBar'
import Footer from '../components/Footer'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useSEO } from '../hooks/useSEO'
import { services } from '../data/services'
import { whatsappLink } from '../config/contact'
import {
  EXTRAS,
  MAINTENANCE_MONTHLY,
  calculateEstimate,
  estimateDeadlineLabel,
  formatRange,
  type ContentStatus,
  type InstitutionalSize,
  type PricedServiceType,
  type ServiceType,
  type Urgency,
  type VisualStatus,
} from '../data/pricing'

// ---------------------------------------------------------------------------
// Estado e fluxo
// ---------------------------------------------------------------------------

type TypeChoice = ServiceType | 'ainda-nao-sei'
type StepId =
  | 'type'
  | 'unsure'
  | 'custom-description'
  | 'custom-people'
  | 'institutional-size'
  | 'extras'
  | 'content'
  | 'visual'
  | 'urgency'
  | 'maintenance'
  | 'contact'
  | 'result'

interface Answers {
  type?: TypeChoice
  wasUnsure: boolean
  unsureReason?: string
  institutionalSize?: InstitutionalSize
  extraIds: string[]
  extraUnits: Partial<Record<string, number>>
  content?: ContentStatus
  visual?: VisualStatus
  urgency?: Urgency
  maintenance?: 'sim' | 'nao'
  customDescription: string
  customPeople?: string
  name: string
  company: string
}

const EMPTY_ANSWERS: Answers = {
  wasUnsure: false,
  extraIds: [],
  extraUnits: {},
  customDescription: '',
  name: '',
  company: '',
}

const PRICED_TYPES: PricedServiceType[] = ['landing-page', 'pagina-de-curso-ou-evento', 'site-institucional']

function isPricedType(type: TypeChoice | undefined): type is PricedServiceType {
  return !!type && (PRICED_TYPES as string[]).includes(type)
}

const UNSURE_OPTIONS: { id: string; label: string; recommends: PricedServiceType }[] = [
  { id: 'vender', label: 'Vender um produto ou serviço específico', recommends: 'landing-page' },
  { id: 'curso', label: 'Divulgar um curso ou evento', recommends: 'pagina-de-curso-ou-evento' },
  { id: 'empresa', label: 'Apresentar a empresa', recommends: 'site-institucional' },
]

const PEOPLE_OPTIONS = ['1 pessoa', '2 a 5 pessoas', '6 a 20 pessoas', 'Mais de 20 pessoas']

const SIZE_OPTIONS: { value: InstitutionalSize; label: string }[] = [
  { value: 'ate-4', label: 'Até 4 páginas' },
  { value: '5-6', label: '5 a 6 páginas' },
  { value: '7-10', label: '7 a 10 páginas' },
]

const CONTENT_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: 'tenho-tudo', label: 'Já tenho textos e fotos' },
  { value: 'tenho-parte', label: 'Tenho parte' },
  { value: 'preciso-ajuda', label: 'Preciso de ajuda com os textos' },
]

const VISUAL_OPTIONS: { value: VisualStatus; label: string }[] = [
  { value: 'tenho', label: 'Já tenho logo e cores' },
  { value: 'preciso', label: 'Preciso de uma identidade simples' },
]

const CONTENT_LABELS: Record<ContentStatus, string> = {
  'tenho-tudo': 'já tenho textos e fotos',
  'tenho-parte': 'tenho parte dos textos e fotos',
  'preciso-ajuda': 'preciso de ajuda com os textos',
}
const VISUAL_LABELS: Record<VisualStatus, string> = {
  tenho: 'já tenho logo e cores',
  preciso: 'preciso de uma identidade simples',
}
const SIZE_LABELS: Record<InstitutionalSize, string> = {
  'ate-4': 'até 4 páginas',
  '5-6': '5 a 6 páginas',
  '7-10': '7 a 10 páginas',
}

function serviceName(type: PricedServiceType | 'sistema-sob-medida') {
  return services.find((s) => s.slug === type)?.name ?? type
}

function getInitialStep(queryType: string | null): StepId {
  if (queryType === 'sistema-sob-medida') return 'custom-description'
  if (queryType && (PRICED_TYPES as string[]).includes(queryType)) {
    return queryType === 'site-institucional' ? 'institutional-size' : 'extras'
  }
  return 'type'
}

function getNextStep(current: StepId, answers: Answers): StepId {
  switch (current) {
    case 'type':
      if (answers.type === 'ainda-nao-sei') return 'unsure'
      if (answers.type === 'sistema-sob-medida') return 'custom-description'
      return answers.type === 'site-institucional' ? 'institutional-size' : 'extras'
    case 'unsure':
      return answers.type === 'site-institucional' ? 'institutional-size' : 'extras'
    case 'custom-description':
      return 'custom-people'
    case 'custom-people':
      return 'contact'
    case 'institutional-size':
      return 'extras'
    case 'extras':
      return 'content'
    case 'content':
      return 'visual'
    case 'visual':
      return 'urgency'
    case 'urgency':
      return 'maintenance'
    case 'maintenance':
      return 'contact'
    case 'contact':
      return 'result'
    case 'result':
      return 'result'
  }
}

/** Sequência completa esperada para o caminho atual — só para a barra de progresso. */
function getPathSteps(answers: Answers): StepId[] {
  if (answers.type === 'sistema-sob-medida') {
    return ['type', 'custom-description', 'custom-people', 'contact', 'result']
  }
  const steps: StepId[] = ['type']
  if (answers.type === 'ainda-nao-sei' || answers.wasUnsure) steps.push('unsure')
  if (answers.type === 'site-institucional') steps.push('institutional-size')
  steps.push('extras', 'content', 'visual', 'urgency', 'maintenance', 'contact', 'result')
  return steps
}

function isStepValid(step: StepId, answers: Answers): boolean {
  switch (step) {
    case 'type':
      return !!answers.type
    case 'unsure':
      return !!answers.unsureReason
    case 'custom-description':
      return answers.customDescription.trim().length > 0
    case 'custom-people':
      return !!answers.customPeople
    case 'institutional-size':
      return !!answers.institutionalSize
    case 'extras':
      return true
    case 'content':
      return !!answers.content
    case 'visual':
      return !!answers.visual
    case 'urgency':
      return !!answers.urgency
    case 'maintenance':
      return !!answers.maintenance
    case 'contact':
      return answers.name.trim().length > 0
    case 'result':
      return true
  }
}

// ---------------------------------------------------------------------------
// Mensagem do WhatsApp
// ---------------------------------------------------------------------------

function buildWhatsAppMessage(answers: Answers, estimate: { min: number; max: number } | null): string {
  const lines: string[] = ['Olá! Fiz uma simulação no site da Dourado Studio.', '']

  if (answers.type === 'sistema-sob-medida') {
    lines.push('Projeto: Sistema sob medida')
    if (answers.customDescription.trim()) lines.push(`O que precisa automatizar: ${answers.customDescription.trim()}`)
    if (answers.customPeople) lines.push(`Pessoas que vão usar: ${answers.customPeople}`)
    lines.push('', 'Estimativa: sob consulta')
  } else if (isPricedType(answers.type)) {
    const sizeSuffix = answers.type === 'site-institucional' && answers.institutionalSize
      ? ` (${SIZE_LABELS[answers.institutionalSize]})`
      : ''
    lines.push(`Projeto: ${serviceName(answers.type)}${sizeSuffix}`)

    const extraLabels = answers.extraIds
      .map((id) => EXTRAS.find((e) => e.id === id)?.label)
      .filter(Boolean) as string[]
    if (extraLabels.length > 0) lines.push(`Extras: ${extraLabels.join(', ')}`)

    if (answers.content) lines.push(`Conteúdo: ${CONTENT_LABELS[answers.content]}`)
    if (answers.visual) lines.push(`Identidade visual: ${VISUAL_LABELS[answers.visual]}`)
    if (answers.urgency) lines.push(`Prazo: ${answers.urgency === 'urgente' ? 'com urgência' : 'normal'}`)
    if (answers.maintenance) lines.push(`Manutenção mensal: ${answers.maintenance === 'sim' ? 'sim' : 'não'}`)

    if (estimate) lines.push('', `Estimativa: ${formatRange(estimate.min, estimate.max)}`)
  }

  lines.push('', `Meu nome é ${answers.name.trim()}${answers.company.trim() ? `, da ${answers.company.trim()}` : ''}.`)

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// UI compartilhada
// ---------------------------------------------------------------------------

function Question({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="fs-h2-section" style={{ marginBottom: subtitle ? '0.75rem' : '1.75rem', maxWidth: '22ch' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="measure" style={{ color: 'var(--sea-soft)', marginBottom: '1.75rem' }}>
          {subtitle}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
    </div>
  )
}

function RecommendationBanner({ reason, typeLabel }: { reason: string; typeLabel: string }) {
  return (
    <div
      style={{
        background: 'var(--sand)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-input)',
        padding: '0.9rem 1.1rem',
        marginBottom: '1.5rem',
      }}
    >
      <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
        Como você quer <strong style={{ color: 'var(--sea)' }}>{reason}</strong>, recomendamos:{' '}
        <strong style={{ color: 'var(--gold-deep)' }}>{typeLabel}</strong>.
      </p>
    </div>
  )
}

function fieldLabel(text: string) {
  return (
    <span className="fs-small" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
      {text}
    </span>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1.1rem',
  border: '1px solid var(--line-strong)',
  borderRadius: 'var(--r-input)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  color: 'var(--sea)',
  background: 'var(--white)',
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

function ResultScreen({
  answers,
  estimate,
  onRestart,
}: {
  answers: Answers
  estimate: { min: number; max: number; extrasBreakdown: { id: string; label: string; min: number; max: number; included: boolean }[] } | null
  onRestart: () => void
}) {
  const message = buildWhatsAppMessage(answers, estimate)
  const isCustom = answers.type === 'sistema-sob-medida'

  const service = isPricedType(answers.type) ? services.find((s) => s.slug === answers.type) : undefined
  const extraCount = estimate?.extrasBreakdown.filter((e) => !e.included).length ?? 0
  const deadline = service && answers.urgency ? estimateDeadlineLabel(service.deadline, extraCount, answers.urgency) : undefined

  return (
    <div className="container-x" style={{ paddingBlock: '4rem', maxWidth: '46rem' }}>
      <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginBottom: '0.75rem' }}>
        Resultado da simulação
      </p>

      {isCustom ? (
        <h1 className="fs-h2-section" style={{ marginBottom: '1.5rem' }}>
          Sob consulta
        </h1>
      ) : (
        <h1 className="fs-h2-section" style={{ marginBottom: '1.5rem' }}>
          {estimate ? formatRange(estimate.min, estimate.max) : '—'}
        </h1>
      )}

      {!isCustom && deadline && (
        <p style={{ color: 'var(--sea-soft)', marginBottom: '2rem' }}>Prazo estimado: {deadline}</p>
      )}

      {isCustom ? (
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {answers.customDescription && (
            <p style={{ color: 'var(--sea-soft)' }}>
              <strong style={{ color: 'var(--sea)' }}>O que você quer automatizar: </strong>
              {answers.customDescription}
            </p>
          )}
          {answers.customPeople && (
            <p style={{ color: 'var(--sea-soft)' }}>
              <strong style={{ color: 'var(--sea)' }}>Pessoas que vão usar: </strong>
              {answers.customPeople}
            </p>
          )}
        </div>
      ) : (
        <>
          {service && service.deliverables.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 className="fs-small" style={{ fontStretch: '100%', letterSpacing: 0, marginBottom: '0.75rem' }}>
                O que está incluso
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {service.deliverables.map((d) => (
                  <li key={d} style={{ display: 'flex', gap: '0.6rem', color: 'var(--sea-soft)' }}>
                    <span aria-hidden="true" style={{ color: 'var(--gold-deep)' }}>
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {estimate && estimate.extrasBreakdown.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 className="fs-small" style={{ fontStretch: '100%', letterSpacing: 0, marginBottom: '0.75rem' }}>
                Extras escolhidos
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {estimate.extrasBreakdown.map((e) => (
                  <li
                    key={e.id}
                    style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: 'var(--sea-soft)' }}
                  >
                    <span>{e.label}</span>
                    <span style={{ color: 'var(--gold-deep)', fontWeight: 600, flexShrink: 0 }}>
                      {e.included ? 'Incluso' : formatRange(e.min, e.max)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {answers.maintenance === 'sim' && (
            <p style={{ color: 'var(--sea-soft)', marginBottom: '1.75rem' }}>
              Manutenção mensal (à parte): {formatRange(MAINTENANCE_MONTHLY.min, MAINTENANCE_MONTHLY.max)} por mês.
            </p>
          )}
        </>
      )}

      <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '2.5rem' }}>
        Esta é uma estimativa. O valor final vem por escrito na proposta, depois da nossa conversa.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
        <a className="btn btn-primary" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={20} color="var(--sea)" />
          Enviar resumo pelo WhatsApp
        </a>
        <button type="button" className="btn btn-secondary" onClick={onRestart}>
          Refazer simulação
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

export default function Orcamento() {
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get('tipo')
  const reduced = useReducedMotion()

  const initialType: TypeChoice | undefined =
    queryType === 'sistema-sob-medida' || (queryType && (PRICED_TYPES as string[]).includes(queryType))
      ? (queryType as TypeChoice)
      : undefined

  const [answers, setAnswers] = useState<Answers>(() => ({ ...EMPTY_ANSWERS, type: initialType }))
  const [history, setHistory] = useState<StepId[]>(() => [getInitialStep(queryType)])
  const [direction, setDirection] = useState(1)

  const current = history[history.length - 1]

  // Cada pergunta começa do topo — sem isso, o título da próxima pergunta
  // podia renderizar atrás do header se o usuário tivesse rolado a anterior.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [current])

  useSEO({
    title: 'Simulador de orçamento de site — Dourado Studio',
    description: 'Descubra quanto custa o site da sua empresa em menos de 2 minutos e receba a proposta pelo WhatsApp.',
    path: '/orcamento',
  })

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }))
  }

  function goNext() {
    if (!isStepValid(current, answers)) return
    setDirection(1)
    setHistory((h) => [...h, getNextStep(h[h.length - 1], answers)])
  }

  function goBack() {
    setDirection(-1)
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))
  }

  function restart() {
    setAnswers({ ...EMPTY_ANSWERS })
    setHistory([getInitialStep(null)])
    setDirection(1)
  }

  function chooseUnsure(opt: (typeof UNSURE_OPTIONS)[number]) {
    setAnswers((a) => ({ ...a, type: opt.recommends, wasUnsure: true, unsureReason: opt.label }))
  }

  function toggleExtra(id: string) {
    setAnswers((a) => {
      const has = a.extraIds.includes(id)
      return {
        ...a,
        extraIds: has ? a.extraIds.filter((x) => x !== id) : [...a.extraIds, id],
        extraUnits: has ? a.extraUnits : { ...a.extraUnits, [id]: a.extraUnits[id] ?? 1 },
      }
    })
  }

  function setExtraUnits(id: string, units: number) {
    setAnswers((a) => ({ ...a, extraUnits: { ...a.extraUnits, [id]: Math.max(1, units) } }))
  }

  const estimate = useMemo(() => {
    if (!isPricedType(answers.type)) return null
    return calculateEstimate({
      type: answers.type,
      institutionalSize: answers.institutionalSize,
      extraIds: answers.extraIds,
      extraUnits: answers.extraUnits,
      content: answers.content ?? 'tenho-tudo',
      visual: answers.visual ?? 'tenho',
      urgency: answers.urgency ?? 'normal',
    })
  }, [answers])

  const hasEstimate = estimate !== null && current !== 'type' && current !== 'unsure'
  const showRecommendation = answers.wasUnsure && history[history.length - 2] === 'unsure'

  const questionSteps: StepId[] = getPathSteps(answers).filter((s) => s !== 'result')
  const stepIndex = Math.max(0, questionSteps.indexOf(current))
  const progress = (stepIndex + 1) / questionSteps.length

  const canContinue = isStepValid(current, answers)

  function renderStep(): React.ReactNode {
    switch (current) {
      case 'type':
        return (
          <Question title="Qual desses é o seu projeto?">
            {services.map((s) => (
              <OptionCard
                key={s.slug}
                type="radio"
                name="type"
                value={s.slug}
                checked={answers.type === s.slug}
                onChange={() => update('type', s.slug as TypeChoice)}
                label={s.name}
                hint={s.forWho}
              />
            ))}
            <OptionCard
              type="radio"
              name="type"
              value="ainda-nao-sei"
              checked={answers.type === 'ainda-nao-sei'}
              onChange={() => update('type', 'ainda-nao-sei')}
              label="Ainda não sei"
              hint="Eu te ajudo a descobrir com 1 pergunta rápida."
            />
          </Question>
        )

      case 'unsure':
        return (
          <Question title="O que você quer que o site faça?">
            {UNSURE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                type="radio"
                name="unsure"
                value={opt.id}
                checked={answers.unsureReason === opt.label}
                onChange={() => chooseUnsure(opt)}
                label={opt.label}
              />
            ))}
          </Question>
        )

      case 'custom-description':
        return (
          <Question
            title="Descreva o processo que você quer automatizar"
            subtitle="Conte com suas palavras o que a equipe faz hoje manualmente."
          >
            <textarea
              value={answers.customDescription}
              onChange={(e) => update('customDescription', e.target.value)}
              rows={6}
              placeholder="Ex.: hoje a equipe recebe pedidos pelo WhatsApp e anota tudo numa planilha..."
              style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
            />
          </Question>
        )

      case 'custom-people':
        return (
          <Question title="Quantas pessoas vão usar o sistema?">
            {PEOPLE_OPTIONS.map((label) => (
              <OptionCard
                key={label}
                type="radio"
                name="people"
                value={label}
                checked={answers.customPeople === label}
                onChange={() => update('customPeople', label)}
                label={label}
              />
            ))}
          </Question>
        )

      case 'institutional-size':
        return (
          <Question title="Quantas páginas, mais ou menos?">
            {SIZE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                type="radio"
                name="size"
                value={opt.value}
                checked={answers.institutionalSize === opt.value}
                onChange={() => update('institutionalSize', opt.value)}
                label={opt.label}
              />
            ))}
          </Question>
        )

      case 'extras': {
        const type = isPricedType(answers.type) ? answers.type : undefined
        return (
          <Question title="Quer incluir alguma dessas funcionalidades?" subtitle="Marque quantas quiser — ou nenhuma.">
            {EXTRAS.map((extra) => {
              const included = type ? (extra.includedIn?.includes(type) ?? false) : false
              const checked = answers.extraIds.includes(extra.id)
              return (
                <div key={extra.id}>
                  <OptionCard
                    type="checkbox"
                    name={`extra-${extra.id}`}
                    value={extra.id}
                    checked={checked || included}
                    disabled={included}
                    onChange={() => toggleExtra(extra.id)}
                    label={extra.label}
                    hint={extra.hint}
                    badge={included ? 'Incluso' : undefined}
                  />
                  {checked && !included && extra.perUnit && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0 0 1.1rem' }}>
                      <span className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                        Quantos idiomas adicionais?
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => setExtraUnits(extra.id, (answers.extraUnits[extra.id] ?? 1) - 1)}
                          aria-label="Diminuir quantidade"
                        >
                          −
                        </button>
                        <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
                          {answers.extraUnits[extra.id] ?? 1}
                        </span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => setExtraUnits(extra.id, (answers.extraUnits[extra.id] ?? 1) + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </Question>
        )
      }

      case 'content':
        return (
          <Question title="Você já tem os textos e fotos do site?">
            {CONTENT_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                type="radio"
                name="content"
                value={opt.value}
                checked={answers.content === opt.value}
                onChange={() => update('content', opt.value)}
                label={opt.label}
              />
            ))}
          </Question>
        )

      case 'visual':
        return (
          <Question title="E a identidade visual, como está?">
            {VISUAL_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                type="radio"
                name="visual"
                value={opt.value}
                checked={answers.visual === opt.value}
                onChange={() => update('visual', opt.value)}
                label={opt.label}
              />
            ))}
          </Question>
        )

      case 'urgency':
        return (
          <Question title="Qual é o prazo?">
            <OptionCard
              type="radio"
              name="urgency"
              value="normal"
              checked={answers.urgency === 'normal'}
              onChange={() => update('urgency', 'normal')}
              label="Prazo normal"
            />
            <OptionCard
              type="radio"
              name="urgency"
              value="urgente"
              checked={answers.urgency === 'urgente'}
              onChange={() => update('urgency', 'urgente')}
              label="Preciso com urgência"
              badge="+25%"
            />
          </Question>
        )

      case 'maintenance':
        return (
          <Question
            title="Quer manutenção mensal?"
            subtitle={`Hospedagem, ajustes e suporte por ${formatRange(MAINTENANCE_MONTHLY.min, MAINTENANCE_MONTHLY.max)} por mês, à parte do projeto.`}
          >
            <OptionCard
              type="radio"
              name="maintenance"
              value="sim"
              checked={answers.maintenance === 'sim'}
              onChange={() => update('maintenance', 'sim')}
              label="Sim"
            />
            <OptionCard
              type="radio"
              name="maintenance"
              value="nao"
              checked={answers.maintenance === 'nao'}
              onChange={() => update('maintenance', 'nao')}
              label="Não"
            />
          </Question>
        )

      case 'contact':
        return (
          <Question title="Quase lá! Como podemos te chamar?">
            <div>
              {fieldLabel('Nome *')}
              <input
                value={answers.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Seu nome"
                style={inputStyle}
                autoComplete="name"
              />
            </div>
            <div>
              {fieldLabel('Empresa (opcional)')}
              <input
                value={answers.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="Nome da sua empresa"
                style={inputStyle}
                autoComplete="organization"
              />
            </div>
          </Question>
        )

      case 'result':
        return null
    }
  }

  if (current === 'result') {
    return (
      <>
        <main>
          <ResultScreen answers={answers} estimate={estimate} onRestart={restart} />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main>
        <div className={`container-x orcamento-content${hasEstimate ? ' has-mobilebar' : ''}`} style={{ paddingBlock: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {history.length > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="fs-small"
                style={{ color: 'var(--sea-soft)', fontWeight: 600, flexShrink: 0, cursor: 'pointer' }}
              >
                ← Voltar
              </button>
            )}
            <div style={{ flex: 1 }}>
              <ProgressBar progress={progress} />
            </div>
          </div>

          <div className="orc-grid">
            <div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={reduced ? false : { x: direction > 0 ? 40 : -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reduced ? undefined : { x: direction > 0 ? -40 : 40, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.28, ease: 'easeOut' }}
                >
                  {showRecommendation && answers.unsureReason && isPricedType(answers.type) && (
                    <RecommendationBanner
                      reason={answers.unsureReason.toLowerCase()}
                      typeLabel={serviceName(answers.type)}
                    />
                  )}
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <div
                className={hasEstimate ? 'step-continue-desktop-only' : undefined}
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canContinue}
                  onClick={goNext}
                  style={{ opacity: canContinue ? 1 : 0.5 }}
                >
                  Continuar
                </button>
              </div>
            </div>

            {hasEstimate && estimate && (
              <EstimateBar min={estimate.min} max={estimate.max} onContinue={goNext} continueDisabled={!canContinue} />
            )}
          </div>
        </div>
      </main>

      <style>{`
        .orc-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 860px) {
          .orc-grid { grid-template-columns: 1fr 300px; gap: 3.5rem; }
        }
        .stepper-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          font-size: 1.1rem;
          line-height: 1;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .stepper-btn:hover { border-color: var(--gold); background-color: var(--sand); }
      `}</style>
    </>
  )
}
