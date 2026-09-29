/**
 * Preços do Simulador de orçamento (/orcamento).
 * PROPOSTA INICIAL — o Vinícius revisa estes valores antes do deploy.
 */

export type PricedServiceType = 'landing-page' | 'pagina-de-curso-ou-evento' | 'site-institucional'
export type ServiceType = PricedServiceType | 'sistema-sob-medida'

export type InstitutionalSize = 'ate-4' | '5-6' | '7-10'
export type ContentStatus = 'tenho-tudo' | 'tenho-parte' | 'preciso-ajuda'
export type VisualStatus = 'tenho' | 'preciso'
export type Urgency = 'normal' | 'urgente'

interface Range {
  min: number
  max: number
}

export const BASE: Record<PricedServiceType, Range> = {
  'landing-page': { min: 800, max: 1200 },
  'pagina-de-curso-ou-evento': { min: 1000, max: 1500 },
  'site-institucional': { min: 1800, max: 2400 }, // até 4 páginas
}

export const INSTITUTIONAL_SIZE: Record<InstitutionalSize, Range> = {
  'ate-4': { min: 0, max: 0 },
  '5-6': { min: 400, max: 600 },
  '7-10': { min: 900, max: 1300 },
}

export interface Extra extends Range {
  id: string
  label: string
  hint: string
  /** Valor de min/max é POR UNIDADE (ex.: por idioma adicional). */
  perUnit?: boolean
  /** Tipos de serviço em que este extra já vem incluso, sem custo. */
  includedIn?: PricedServiceType[]
}

export const EXTRAS: Extra[] = [
  {
    id: 'inscricao',
    label: 'Formulário de inscrição ou contato',
    hint: 'As respostas chegam organizadas numa planilha.',
    min: 200,
    max: 350,
  },
  {
    id: 'idiomas',
    label: 'Site em outro idioma',
    hint: 'Valor por idioma adicional.',
    min: 300,
    max: 450,
    perUnit: true,
  },
  {
    id: 'blog',
    label: 'Blog ou área de notícias',
    hint: 'Para publicar conteúdo e aparecer mais no Google.',
    min: 450,
    max: 700,
  },
  {
    id: 'galeria',
    label: 'Galeria ou portfólio de trabalhos',
    hint: 'Fotos de produtos, obras ou eventos.',
    min: 150,
    max: 300,
  },
  {
    id: 'agendamento',
    label: 'Agendamento online',
    hint: 'O cliente marca horário sem precisar ligar.',
    min: 350,
    max: 600,
  },
  {
    id: 'maps',
    label: 'Google Maps e avaliações',
    hint: 'Mapa e avaliações do Google no site.',
    min: 100,
    max: 200,
    includedIn: ['site-institucional'],
  },
  {
    id: 'animacoes',
    label: 'Animações e interações especiais',
    hint: 'Movimento que deixa o site memorável.',
    min: 300,
    max: 600,
  },
]

/** "Preciso de ajuda com os textos" */
export const CONTENT_HELP: Range = { min: 250, max: 450 }
/** "Tenho parte" */
export const CONTENT_PARTIAL: Range = { min: 100, max: 200 }
export const VISUAL_IDENTITY: Range = { min: 350, max: 600 }
export const URGENCY_MULTIPLIER = 1.25
export const MAINTENANCE_MONTHLY: Range = { min: 80, max: 150 }

// ---------------------------------------------------------------------------

export interface EstimateInput {
  type: PricedServiceType
  institutionalSize?: InstitutionalSize
  /** Ids dos extras selecionados (ver EXTRAS). */
  extraIds: string[]
  /** Para extras `perUnit` (ex.: idiomas), a quantidade escolhida. Padrão 1. */
  extraUnits?: Partial<Record<string, number>>
  content: ContentStatus
  visual: VisualStatus
  urgency: Urgency
}

export interface ExtraLineItem {
  id: string
  label: string
  min: number
  max: number
  /** Já incluso no tipo de projeto escolhido, sem custo adicional. */
  included: boolean
  units: number
}

export interface EstimateResult {
  min: number
  max: number
  extrasBreakdown: ExtraLineItem[]
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step
}

/**
 * Calcula a faixa de preço estimada. Soma min e max separadamente,
 * aplica a urgência por último e arredonda para múltiplos de 50.
 * Não cobre `sistema-sob-medida` — esse tipo é sempre "sob consulta".
 */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const base = BASE[input.type]
  let min = base.min
  let max = base.max

  if (input.type === 'site-institucional') {
    const size = INSTITUTIONAL_SIZE[input.institutionalSize ?? 'ate-4']
    min += size.min
    max += size.max
  }

  const extrasBreakdown: ExtraLineItem[] = input.extraIds.map((id) => {
    const extra = EXTRAS.find((e) => e.id === id)
    if (!extra) throw new Error(`Extra desconhecido: ${id}`)

    const included = extra.includedIn?.includes(input.type) ?? false
    if (included) {
      return { id, label: extra.label, min: 0, max: 0, included: true, units: 1 }
    }

    const units = extra.perUnit ? Math.max(1, input.extraUnits?.[id] ?? 1) : 1
    const lineMin = extra.min * units
    const lineMax = extra.max * units
    min += lineMin
    max += lineMax
    return { id, label: extra.label, min: lineMin, max: lineMax, included: false, units }
  })

  if (input.content === 'preciso-ajuda') {
    min += CONTENT_HELP.min
    max += CONTENT_HELP.max
  } else if (input.content === 'tenho-parte') {
    min += CONTENT_PARTIAL.min
    max += CONTENT_PARTIAL.max
  }

  if (input.visual === 'preciso') {
    min += VISUAL_IDENTITY.min
    max += VISUAL_IDENTITY.max
  }

  if (input.urgency === 'urgente') {
    min *= URGENCY_MULTIPLIER
    max *= URGENCY_MULTIPLIER
  }

  min = roundToStep(min, 50)
  max = roundToStep(max, 50)
  if (min > max) min = max

  return { min, max, extrasBreakdown }
}

/**
 * Texto de prazo estimado: usa o prazo base do serviço (services.ts),
 * soma alguns dias se houver 3+ extras, e vira "a combinar" com urgência.
 */
export function estimateDeadlineLabel(baseDeadline: string, extraCount: number, urgency: Urgency): string {
  if (urgency === 'urgente') return 'Prazo reduzido, a combinar'
  if (extraCount >= 3) return `${baseDeadline} (mais 3 a 5 dias úteis pelos extras)`
  return baseDeadline
}

export function formatBRL(value: number) {
  return 'R$ ' + Math.round(value).toLocaleString('pt-BR')
}

export function formatRange(min: number, max: number) {
  return `${formatBRL(min)} – ${formatBRL(max)}`
}
