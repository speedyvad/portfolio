import * as Accordion from '@radix-ui/react-accordion'
import { faq } from '../../data/faq'

export interface FaqEntry {
  question: string
  answer: string
}

interface Props {
  items?: FaqEntry[]
  title?: string
  /** Fundo da seção. */
  tone?: 'sand' | 'white'
}

/** Perguntas frequentes (Radix Accordion). Na home usa src/data/faq.ts; as páginas de serviço passam as próprias. */
export default function FaqAccordion({ items = faq, title = 'Perguntas frequentes', tone = 'sand' }: Props) {
  return (
    <section className={`section-y${tone === 'sand' ? ' bg-sand' : ''}`} style={tone === 'white' ? { background: 'var(--white)' } : undefined}>
      <div className="container-x faq-layout">
        <h2 className="fs-h2-section">{title}</h2>

        <Accordion.Root type="single" collapsible defaultValue="item-0" className="faq-root">
          {items.map((item, i) => (
            <Accordion.Item key={item.question} value={`item-${i}`} className="faq-item">
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="faq-trigger">
                    {item.question}
                    <span className="faq-plus" aria-hidden="true" />
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="faq-content">
                <p className="measure">{item.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <style>{`
        .faq-layout { display: grid; gap: 2.5rem; }
        @media (min-width: 960px) { .faq-layout { grid-template-columns: 0.8fr 1.2fr; gap: 4rem; align-items: start; } }
        .faq-root { border-top: 1px solid var(--line-strong); }
        .faq-item { border-bottom: 1px solid var(--line-strong); }
        .faq-item h3 { margin: 0; }
        .faq-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
          text-align: left; padding: 1.5rem 0; cursor: pointer;
          font-family: var(--font-body); font-size: clamp(1.05rem, 2vw, 1.3rem); font-weight: 600; line-height: 1.35; color: var(--sea);
        }
        .faq-plus { position: relative; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line-strong); transition: background-color 0.2s ease; }
        .faq-plus::before, .faq-plus::after { content: ''; position: absolute; left: 50%; top: 50%; width: 12px; height: 1.5px; background: var(--gold-deep); transform: translate(-50%, -50%); transition: transform 0.3s ease; }
        .faq-plus::after { transform: translate(-50%, -50%) rotate(90deg); }
        .faq-trigger[data-state='open'] .faq-plus::after { transform: translate(-50%, -50%) rotate(0deg); }
        .faq-trigger:hover .faq-plus { background: var(--white); }
        .faq-content { overflow: hidden; color: var(--sea-soft); }
        .faq-content p { padding-bottom: 1.75rem; }
        .faq-content[data-state='open'] { animation: faq-open 0.32s cubic-bezier(0.22, 1, 0.36, 1); }
        .faq-content[data-state='closed'] { animation: faq-close 0.25s ease; }
        @keyframes faq-open { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
        @keyframes faq-close { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
      `}</style>
    </section>
  )
}
