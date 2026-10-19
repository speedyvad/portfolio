import WhatsAppIcon from '../WhatsAppIcon'
import { EMAIL, DEFAULT_MESSAGE, whatsappLink } from '../../config/contact'

export default function FinalCta() {
  return (
    <section id="cta-final" className="section-y final-cta">
      <img
        src="/images/fortaleza/horizonte-beira-mar.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="final-cta-img"
      />
      <div className="container-x" style={{ position: 'relative', textAlign: 'center', paddingBlock: 'clamp(2rem, 6vw, 5rem)' }}>
        <h2
          className="fs-h2"
          style={{ color: '#fff', maxWidth: '20ch', marginInline: 'auto', marginBottom: '2.5rem' }}
        >
          Vamos colocar a sua empresa no lugar onde os clientes procuram.
        </h2>

        <a
          className="btn btn-primary"
          href={whatsappLink(DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={20} color="var(--sea)" />
          Falar no WhatsApp
        </a>

        <p className="fs-small" style={{ color: 'rgba(255,255,255,0.72)', marginTop: '1.75rem' }}>
          Ou por e-mail:{' '}
          <a href={`mailto:${EMAIL}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 1 }}>
            {EMAIL}
          </a>
        </p>
      </div>

      <style>{`
        .final-cta { position: relative; overflow: hidden; background: var(--sea); isolation: isolate; }
        .final-cta-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; opacity: 0.4; }
        .final-cta::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(to bottom, rgba(14,44,63,0.55), rgba(14,44,63,0.9)); }
      `}</style>
    </section>
  )
}
