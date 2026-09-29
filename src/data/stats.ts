export interface Stat {
  value: number
  suffix: string
  /** A frase inteira; {n} é substituído pelo número animado. */
  sentence: string
  source: string
  url: string
}

export const stats: Stat[] = [
  {
    value: 93,
    suffix: '%',
    sentence: '{n} dos consumidores pesquisam na internet antes de decidir uma compra.',
    source: 'State of Search Brasil — Hedgehog Digital e Opinion Box',
    url: 'https://www.m9publicidade.com.br/93-dos-consumidores-pesquisam-online-antes-de-fazer-uma-compra/',
  },
  {
    value: 96,
    suffix: '%',
    sentence: '{n} leem avaliações no Google antes de escolher uma loja física.',
    source: 'Decisão Local 2025 — Harmo e Reclame AQUI',
    url: 'https://exame.com/bussola/96-dos-consumidores-checam-avaliacoes-antes-de-escolher-uma-loja-fisica/',
  },
  {
    value: 53,
    suffix: '%',
    sentence: '{n} das visitas no celular são abandonadas quando a página demora mais de 3 segundos.',
    source: 'Google',
    url: 'https://support.google.com/adsense/answer/7450973?hl=pt-BR',
  },
]

export const statsClosing =
  'Estar online deixou de ser opcional. A questão é como a sua empresa aparece quando alguém procura.'
