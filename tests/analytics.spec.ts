import { test, expect } from '@playwright/test'
import { classifyLink } from '../src/lib/analytics'

test.describe('classifyLink', () => {
  const wa = 'https://wa.me/5585981077888?text=Ol%C3%A1'

  test('WhatsApp é whatsapp_click', () => {
    expect(classifyLink(wa)).toBe('whatsapp_click')
  })

  test('e-mail e CV', () => {
    expect(classifyLink('mailto:alguem@exemplo.com')).toBe('email_click')
    expect(classifyLink('/cv-vinicius-dourado.pdf')).toBe('cv_download')
    expect(classifyLink('/arquivo.PDF?v=2')).toBe('cv_download')
  })

  test('links internos e redes sociais não viram evento-chave', () => {
    expect(classifyLink('/projetos')).toBeNull()
    expect(classifyLink('https://github.com/speedyvad')).toBeNull()
  })
})
