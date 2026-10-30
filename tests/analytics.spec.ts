import { test, expect } from '@playwright/test'
import { classifyLink } from '../src/lib/analytics'

test.describe('classifyLink', () => {
  const wa = 'https://wa.me/5585982116585?text=Ol%C3%A1'

  test('WhatsApp fora do "Monte seu projeto" é whatsapp_click', () => {
    expect(classifyLink(wa, '/')).toBe('whatsapp_click')
    expect(classifyLink(wa, '/projetos/harmon-visagismo')).toBe('whatsapp_click')
  })

  test('WhatsApp dentro de /orcamento é o envio do briefing', () => {
    expect(classifyLink(wa, '/orcamento')).toBe('orcamento_enviado')
  })

  test('e-mail e CV', () => {
    expect(classifyLink('mailto:alguem@exemplo.com', '/sobre')).toBe('email_click')
    expect(classifyLink('/cv-vinicius-dourado.pdf', '/sobre')).toBe('cv_download')
    expect(classifyLink('/arquivo.PDF?v=2', '/sobre')).toBe('cv_download')
  })

  test('links internos e redes sociais não viram evento-chave', () => {
    expect(classifyLink('/projetos', '/')).toBeNull()
    expect(classifyLink('https://github.com/speedyvad', '/sobre')).toBeNull()
  })
})
