export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'Quanto custa um site?',
    answer:
      'Depende do que você precisa: quantas páginas, quais funcionalidades, se já tem textos e fotos. Me conta pelo WhatsApp e eu te devolvo uma proposta por escrito, com valor e prazo fechados.',
  },
  {
    question: 'Quanto tempo leva?',
    answer:
      'De 7 dias úteis para uma landing page a cerca de 25 para um site institucional. Automações têm prazo definido na proposta.',
  },
  {
    question: 'Preciso ter domínio e hospedagem?',
    answer:
      'Não. Eu cuido do registro do domínio e da publicação. O domínio fica no seu nome, e te explico o custo dele antes de fechar.',
  },
  {
    question: 'Vou conseguir atualizar o site depois?',
    answer:
      'Sim. Pequenos ajustes entram na manutenção mensal; mudanças maiores entram numa proposta à parte.',
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
