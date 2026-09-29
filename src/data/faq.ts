export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'Quanto custa um site?',
    answer:
      'Landing pages a partir de R$ 800 e sites institucionais a partir de R$ 1.800. O valor final depende do número de páginas e funcionalidades e vem por escrito na proposta.',
  },
  {
    question: 'Quanto tempo leva?',
    answer:
      'De 7 dias úteis para uma landing page a cerca de 25 para um site institucional. Sistemas têm prazo definido na proposta.',
  },
  {
    question: 'Preciso ter domínio e hospedagem?',
    answer:
      'Não. Eu cuido do registro do domínio e da publicação. O domínio .com.br custa em torno de R$ 40 por ano, pago diretamente no Registro.br em seu nome.',
  },
  {
    question: 'Vou conseguir atualizar o site depois?',
    answer:
      'Sim. Pequenos ajustes entram na manutenção mensal; mudanças maiores são orçadas à parte.',
  },
  {
    question: 'O site aparece no Google?',
    answer:
      'Todo projeto sai com a base de SEO configurada: títulos, descrições, velocidade e versão mobile. Aparecer bem nas buscas também depende de conteúdo e tempo.',
  },
  {
    question: 'Você atende fora de Fortaleza?',
    answer: 'Sim, o atendimento é todo online, para qualquer cidade do Brasil.',
  },
]
