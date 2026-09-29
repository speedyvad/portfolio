import { Link } from 'react-router-dom'
import DeviceMockup from '../DeviceMockup'
import { featuredCases, projectPreviewFallback, type Project } from '../../data/projects'

function Case({ project, flipped }: { project: Project; flipped: boolean }) {
  return (
    <article className={`case${flipped ? ' case-flipped' : ''}`}>
      <div className="case-media">
        <DeviceMockup
          title={project.title}
          desktop={project.images?.desktop}
          mobile={project.images?.mobile}
          desktopFallback={projectPreviewFallback(project)}
        />
      </div>

      <div className="case-text">
        <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '0.75rem' }}>
          {project.client ?? project.title}
        </p>

        <h3 className="fs-h3" style={{ marginBottom: '1rem' }}>
          {project.title}
        </h3>

        <p className="measure" style={{ color: 'var(--sea-soft)', marginBottom: '1.75rem' }}>
          {project.problem ?? project.shortDesc}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <dl
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt
                  className="display"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--gold-deep)' }}
                >
                  {m.value}
                </dt>
                <dd className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.25rem' }}>
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link className="btn btn-primary" to={`/projetos/${project.slug}`} style={{ padding: '0.75rem 1.5rem' }}>
            Ver case
          </Link>
          {project.live && (
            <a
              className="btn btn-secondary"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Abrir site
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function CaseShowcase() {
  return (
    <section className="section-y" style={{ background: 'var(--sand)' }}>
      <div className="container-x">
        <h2 className="fs-h2-section" style={{ marginBottom: '4rem' }}>
          Projetos que já estão no ar
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {featuredCases.map((project, i) => (
            <Case key={project.slug} project={project} flipped={i % 2 === 1} />
          ))}
        </div>

        <p style={{ marginTop: '4rem' }}>
          <Link to="/projetos" className="link-underline" style={{ fontWeight: 600 }}>
            Ver todos os projetos
          </Link>
        </p>
      </div>

      <style>{`
        .case {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .case { grid-template-columns: 1.1fr 0.9fr; gap: 4rem; }
          .case-flipped .case-media { order: 2; }
          .case-flipped .case-text { order: 1; }
        }
      `}</style>
    </section>
  )
}
