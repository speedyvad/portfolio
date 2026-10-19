export interface TrustNumber {
  value: string
  label: string
}

/** Frase da faixa de confiança, logo abaixo do hero. Uso da marca Shalom autorizado pelo cliente. */
export const trustSentence =
  'Projetos no ar para a Comunidade Católica Shalom e o curso Imersão Coreia.'

export const trustNumbers: TrustNumber[] = [
  { value: '1.500+', label: 'inscritos' },
  { value: '2.218+', label: 'respostas' },
  { value: '6', label: 'idiomas' },
]

export interface ProofBlock {
  value: number
  /** Formatação do número: "+" depois, separador de milhar pt-BR. */
  suffix?: string
  label: string
  caseSlug: string
}

/** Blocos dourados do capítulo "A prova". Só números medidos. */
export const proofBlocks: ProofBlock[] = [
  { value: 1500, suffix: '+', label: 'inscritos na aula inaugural do Imersão Coreia', caseSlug: 'imersao-coreia' },
  { value: 2218, suffix: '+', label: 'respostas de jovens de missões no mundo todo', caseSlug: 'enquete-juventude-shalom' },
  { value: 6, label: 'idiomas na mesma plataforma, com ranking ao vivo', caseSlug: 'enquete-juventude-shalom' },
]
