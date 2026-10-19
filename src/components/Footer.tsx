import { Link } from 'react-router-dom'
import Wordmark from './Wordmark'
import {
  EMAIL,
  GITHUB,
  INSTAGRAM,
  LINKEDIN,
  WHATSAPP_DISPLAY,
  DEFAULT_MESSAGE,
  whatsappLink,
} from '../config/contact'

const PAGES = [
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Sobre', to: '/sobre' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--white)', overflow: 'hidden' }}>
      <div className="container-x" style={{ paddingBlock: '4rem 2.5rem' }}>
        <div className="footer-grid">
          <div>
            <Wordmark size="1.5rem" />
            <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '1.25rem', maxWidth: '22rem' }}>
              Fortaleza, CE · Atendimento para todo o Brasil
            </p>
          </div>

          <nav aria-label="Páginas">
            <h2 className="fs-small" style={{ fontStretch: '100%', fontWeight: 700, marginBottom: '1rem', letterSpacing: 0 }}>
              Páginas
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="fs-small link-underline" style={{ color: 'var(--sea-soft)' }}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="fs-small" style={{ fontStretch: '100%', fontWeight: 700, marginBottom: '1rem', letterSpacing: 0 }}>
              Contato
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a
                  className="fs-small link-underline"
                  style={{ color: 'var(--sea-soft)' }}
                  href={whatsappLink(DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a className="fs-small link-underline" style={{ color: 'var(--sea-soft)' }} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  className="fs-small link-underline"
                  style={{ color: 'var(--sea-soft)' }}
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="fs-small link-underline"
                  style={{ color: 'var(--sea-soft)' }}
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="fs-small link-underline"
                  style={{ color: 'var(--sea-soft)' }}
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'space-between',
          }}
        >
          <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
            Dourado Studio · por Vinícius Dourado · Fortaleza, CE
          </p>
          <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>© {year}</p>
        </div>
      </div>

      {/* Wordmark gigante, cortado pela borda inferior da página */}
      <div className="container-x" aria-hidden="true">
        <p className="wordmark-giant footer-giant" data-text="Dourado Studio" />
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
        }
        .footer-giant {
          font-size: clamp(3rem, 20vw, 16.25rem);
          line-height: 0.8;
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: rgba(14, 44, 63, 0.08);
          margin-bottom: -0.12em;
          user-select: none;
        }
        /* Texto via pseudo-elemento: é decorativo e não entra na árvore de acessibilidade. */
        .footer-giant::before { content: attr(data-text); }
      `}</style>
    </footer>
  )
}
