import { Link } from 'react-router-dom'
import { services, servicesNote, formatPrice } from '../../data/services'

export default function ServicesList() {
  return (
    <section id="servicos" className="section-y" style={{ background: 'var(--white)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ maxWidth: '18ch', marginBottom: '3.5rem' }}>
          O que dá para construir para a sua empresa
        </h2>

        <ul className="services-list" style={{ listStyle: 'none' }}>
          {services.map((service) => (
            <li key={service.slug} className="service-row">
              <div className="service-row-inner container-x">
                <div>
                  <h3 className="service-name" style={{ marginBottom: '0.35rem' }}>
                    {service.name}
                  </h3>
                  <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                    {service.deadline}
                  </p>
                </div>

                <div>
                  <p style={{ marginBottom: '0.5rem' }}>{service.forWho}</p>
                  <p style={{ color: 'var(--sea-soft)' }}>{service.value}</p>

                  {service.proof && (
                    <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginTop: '0.75rem' }}>
                      {service.proof}
                      {service.proofCaseSlug && (
                        <>
                          {' '}
                          <Link
                            to={`/projetos/${service.proofCaseSlug}`}
                            className="link-underline"
                            style={{ color: 'var(--gold-deep)', fontWeight: 600 }}
                          >
                            Ver case
                          </Link>
                        </>
                      )}
                    </p>
                  )}

                  <ul
                    className="fs-small"
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem 1rem',
                      marginTop: '1rem',
                      color: 'var(--sea-soft)',
                    }}
                  >
                    {service.deliverables.map((d) => (
                      <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span aria-hidden="true" style={{ width: 12, height: 2, background: 'var(--gold)', flexShrink: 0 }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-cta">
                  <p
                    className="display"
                    style={{ fontSize: '1.25rem', color: 'var(--gold-deep)', marginBottom: '1rem' }}
                  >
                    {formatPrice(service.priceFrom)}
                  </p>
                  <Link
                    className="btn btn-secondary"
                    to={`/orcamento?tipo=${service.slug}`}
                    style={{ padding: '0.7rem 1.35rem', fontSize: '0.95rem' }}
                  >
                    Pedir orçamento
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="fs-small measure" style={{ color: 'var(--sea-soft)', marginTop: '2rem' }}>
          {servicesNote} O valor é combinado na conversa.
        </p>
      </div>

      <style>{`
        /* A lista inteira e cada linha bleedam a mesma largura, para que a borda
           de cima e as divisórias entre linhas fiquem com a mesma largura. */
        .services-list {
          border-top: 1px solid var(--line);
          margin-inline: calc(var(--pad) * -1);
        }
        .service-row {
          border-bottom: 1px solid var(--line);
          transition: background-color 0.25s ease;
        }
        .service-row:hover { background-color: var(--sand); }
        .service-row-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          padding-block: 2.25rem;
        }
        .service-name {
          font-size: clamp(1.35rem, 1.8vw, 1.85rem);
        }
        .service-cta { display: flex; flex-direction: column; align-items: flex-start; }
        @media (min-width: 900px) {
          .service-row-inner {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.45fr) minmax(0, 0.75fr);
            gap: 2.5rem;
            align-items: start;
            padding-block: 2.75rem;
          }
          .service-cta { align-items: flex-end; text-align: right; }
        }
      `}</style>
    </section>
  )
}
