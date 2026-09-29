export interface TrustNumber {
  value: string
  label: string
}

/** Frase da faixa de confiança, logo abaixo do hero. Uso da marca Shalom autorizado pelo cliente. */
export const trustSentence =
  'Projetos no ar para a Comunidade Católica Shalom, o curso Imersão Coreia e corretoras de seguros.'

export const trustNumbers: TrustNumber[] = [
  { value: '1.500+', label: 'inscritos' },
  { value: '2.218+', label: 'respostas' },
  { value: '6', label: 'idiomas' },
]
