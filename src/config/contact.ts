export const WHATSAPP_NUMBER = '5585981077888'
export const WHATSAPP_DISPLAY = '+55 85 98107-7888'
export const EMAIL = 'viniciusdourado020506@gmail.com'
export const INSTAGRAM = 'https://www.instagram.com/douradovini/'
export const LINKEDIN = 'https://www.linkedin.com/in/vinícius-dourado-29a5422b7'
export const GITHUB = 'https://github.com/speedyvad'

export const SITE_URL = 'https://www.douradostudio.dev.br'
export const STUDIO_NAME = 'Dourado Studio'
export const CITY = 'Fortaleza, CE'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um projeto.'
