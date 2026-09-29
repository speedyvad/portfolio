import { Link } from 'react-router-dom'
import { testimonials } from '../../data/testimonials'

/**
 * Só aparece quando houver depoimentos reais cadastrados em src/data/testimonials.ts.
 * Nunca preencher esse arquivo com depoimentos inventados.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="section-y" style={{ background: 'var(--white)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ marginBottom: '3rem' }}>
          O que dizem os clientes
        </h2>

        <ul
          style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {testimonials.map((t) => (
            <li key={t.author}>
              <blockquote style={{ margin: 0 }}>
                <p className="fs-lead measure" style={{ marginBottom: '1.25rem' }}>
                  “{t.quote}”
                </p>
                <footer>
                  <p style={{ fontWeight: 600 }}>{t.author}</p>
                  <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                    {t.role}
                    {t.caseSlug && (
                      <>
                        {' · '}
                        <Link to={`/projetos/${t.caseSlug}`} className="link-underline">
                          Ver case
                        </Link>
                      </>
                    )}
                  </p>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
