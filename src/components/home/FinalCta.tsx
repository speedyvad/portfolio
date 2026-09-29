import WhatsAppIcon from '../WhatsAppIcon'
import { EMAIL, DEFAULT_MESSAGE, whatsappLink } from '../../config/contact'

export default function FinalCta() {
  return (
    <section id="cta-final" className="section-y" style={{ background: 'var(--sea)' }}>
      <div className="container-x" style={{ textAlign: 'center' }}>
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
    </section>
  )
}
