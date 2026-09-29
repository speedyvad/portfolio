export interface HeroSlide {
  image: string
  alt: string
  title: string
  text: string
  cta: string
  message: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero/dor-google.png',
    alt: 'Pessoa pesquisando um serviço no celular',
    title: 'Quando procuram o que você vende, quem aparece é o concorrente.',
    text: 'Um site rápido e bem feito coloca sua empresa no Google e no caminho de quem já quer comprar.',
    cta: 'Quero aparecer no Google',
    message: 'Olá! Vim pelo site da Dourado Studio e quero que minha empresa apareça no Google.',
  },
  {
    image: '/images/hero/dor-curso.jpg',
    alt: 'Professora apresentando uma aula para uma turma',
    title: 'Seu curso merece mais do que um link na bio.',
    text: 'Uma página de inscrição explica tudo, organiza as vagas e deixa o seu direct livre.',
    cta: 'Quero uma página para meu curso',
    message: 'Olá! Vim pelo site da Dourado Studio e quero uma página para meu curso ou evento.',
  },
  {
    image: '/images/hero/dor-planilha.png',
    alt: 'Pessoa cansada diante de planilhas no computador',
    title: 'Sua equipe passa o dia copiando e colando?',
    text: 'Um sistema sob medida faz em segundos o que hoje toma a tarde inteira.',
    cta: 'Quero automatizar um processo',
    message: 'Olá! Vim pelo site da Dourado Studio e quero automatizar um processo da minha empresa.',
  },
  {
    image: '/images/hero/dor-site-antigo.jpg',
    alt: 'Interior de um negócio local em Fortaleza',
    title: 'Seu site ficou menor que a sua empresa.',
    text: 'Visual novo, carregamento rápido e textos claros para passar a confiança que o seu negócio já tem.',
    cta: 'Quero renovar meu site',
    message: 'Olá! Vim pelo site da Dourado Studio e quero renovar o site da minha empresa.',
  },
]

export const HERO_INTERVAL = 7000
