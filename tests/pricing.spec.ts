import { test, expect } from '@playwright/test'
import { calculateEstimate } from '../src/data/pricing'

test.describe('calculateEstimate', () => {
  test('landing page sem extras retorna a faixa base', () => {
    const result = calculateEstimate({
      type: 'landing-page',
      extraIds: [],
      content: 'tenho-tudo',
      visual: 'tenho',
      urgency: 'normal',
    })

    expect(result.min).toBe(800)
    expect(result.max).toBe(1200)
    expect(result.extrasBreakdown).toEqual([])
  })

  test('institucional 7 a 10 páginas com extras e urgência soma tudo e aplica +25% no final', () => {
    const result = calculateEstimate({
      type: 'site-institucional',
      institutionalSize: '7-10',
      extraIds: ['blog', 'agendamento'],
      content: 'tenho-tudo',
      visual: 'tenho',
      urgency: 'urgente',
    })

    // base 1800-2400 + tamanho 900-1300 + blog 450-700 + agendamento 350-600
    // = 3500-5000, ×1.25 = 4375-6250, arredondado a múltiplos de 50 = 4400-6250
    expect(result.min).toBe(4400)
    expect(result.max).toBe(6250)
  })

  test('extra incluso no tipo aparece sem custo, sem alterar a faixa', () => {
    const result = calculateEstimate({
      type: 'site-institucional',
      extraIds: ['maps'],
      content: 'tenho-tudo',
      visual: 'tenho',
      urgency: 'normal',
    })

    expect(result.min).toBe(1800)
    expect(result.max).toBe(2400)

    const mapsLine = result.extrasBreakdown.find((e) => e.id === 'maps')
    expect(mapsLine?.included).toBe(true)
    expect(mapsLine?.min).toBe(0)
    expect(mapsLine?.max).toBe(0)
  })

  test('idioma adicional (perUnit) multiplica pela quantidade escolhida', () => {
    const result = calculateEstimate({
      type: 'landing-page',
      extraIds: ['idiomas'],
      extraUnits: { idiomas: 2 },
      content: 'tenho-tudo',
      visual: 'tenho',
      urgency: 'normal',
    })

    // base 800-1200 + 2 × (300-450) = 1400-2100
    expect(result.min).toBe(1400)
    expect(result.max).toBe(2100)

    const idiomasLine = result.extrasBreakdown.find((e) => e.id === 'idiomas')
    expect(idiomasLine?.units).toBe(2)
    expect(idiomasLine?.min).toBe(600)
    expect(idiomasLine?.max).toBe(900)
    expect(idiomasLine?.included).toBe(false)
  })
})
