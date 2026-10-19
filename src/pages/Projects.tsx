import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import ProjectMedia from '../components/ProjectMedia'
import {
  highlightProjects,
  labProjects,
  studyProjects,
  KIND_LABEL,
  techLabel,
  type Project,
} from '../data/projects'
import { useSEO } from '../hooks/useSEO'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease },
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="fs-small pj-meta">
      <span className="pj-kind" data-kind={project.kind}>
        {KIND_LABEL[project.kind]}
      </span>
      {project.segment && <span>{project.segment}</span>}
      <span>{project.year}</span>
    </p>
  )
}

function Metrics({ project, max = 3 }: { project: Project; max?: number }) {
  if (!project.metrics?.length) return null
  return (
    <dl className="pj-metrics">
      {project.metrics.slice(0, max).map((m) => (
        <div key={m.label}>
          <dt className="text-proof">{m.value}</dt>
          <dd className="fs-small">{m.label}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Destaque principal: painel grande + texto ao lado. */
function FeatureCard({ project }: { project: Project }) {
  return (
    <motion.article {...reveal}>
      <Link to={`/projetos/${project.slug}`} className="pm-host pj-feature">
        <ProjectMedia project={project} priority />
        <div className="pj-feature-text">
          <Meta project={project} />
          <h2 className="pj-title" style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
            {project.title}
          </h2>
          <p className="fs-lead" style={{ color: 'var(--sea-soft)' }}>
            {project.problem ?? project.shortDesc}
          </p>
          <Metrics project={project} />
          <span className="pj-cta label-ui">Ver o case</span>
        </div>
      </Link>
    </motion.article>
  )
}

function GridCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article {...reveal} transition={{ ...reveal.transition, delay: (index % 2) * 0.1 }}>
      <Link to={`/projetos/${project.slug}`} className="pm-host pj-card">
        <ProjectMedia project={project} />
        <div style={{ paddingTop: '1.5rem' }}>
          <Meta project={project} />
          <h2 className="pj-title fs-h3" style={{ marginBottom: '0.75rem' }}>
            {project.title}
          </h2>
          <p style={{ color: 'var(--sea-soft)' }}>{project.problem ?? project.shortDesc}</p>
          <Metrics project={project} max={2} />
          <span className="pj-cta label-ui">Ver o case</span>
        </div>
      </Link>
    </motion.article>
  )
}

function LabCard({ project }: { project: Project }) {
  return (
    <motion.article {...reveal}>
      <Link to={`/projetos/${project.slug}`} className="pm-host pj-lab">
        <ProjectMedia project={project} ratio="16 / 10" />
        <div>
          <Meta project={project} />
          <h3 className="pj-title fs-h3" style={{ marginBottom: '0.75rem' }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--sea-soft)', marginBottom: '1.25rem' }}>{project.shortDesc}</p>
          <div className="pj-tags">
            {project.stack.slice(0, 5).map((t) => (
              <span key={t}>{techLabel(t)}</span>
            ))}
          </div>
          <span className="pj-cta label-ui">Ver detalhes</span>
        </div>
      </Link>
    </motion.article>
  )
}

function StudyRow({ project }: { project: Project }) {
  return (
    <li>
      <Link to={`/projetos/${project.slug}`} className="pj-study">
        <span className="pj-thumb">
          {project.images?.desktop ? (
            <img src={project.images.desktop} alt="" loading="lazy" decoding="async" />
          ) : (
            <span aria-hidden="true" style={{ background: project.color }} className="pj-thumb-dot" />
          )}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="pj-title" style={{ display: 'block', fontWeight: 600, fontSize: '1.125rem' }}>
            {project.title}
          </span>
          <span className="fs-small" style={{ color: 'var(--sea-soft)' }}>
            {project.shortDesc}
          </span>
        </span>
        <span className="fs-small pj-study-year">{project.year}</span>
      </Link>
    </li>
  )
}

export default function Projects() {
  const [feature, ...rest] = highlightProjects

  useSEO({
    title: 'Projetos — Dourado Studio',
    description:
      'Sites, landing pages e sistemas desenhados e programados pela Dourado Studio: cases de clientes, projetos conceito e laboratório.',
    path: '/projetos',
  })

  return (
    <>
      <main>
        <section style={{ paddingBlock: 'clamp(3rem, 8vw, 6rem) clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="container-x">
            <motion.h1
              className="fs-display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              style={{ marginBottom: '1.5rem' }}
            >
              Projetos
            </motion.h1>
            <motion.p
              className="fs-lead measure"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              style={{ color: 'var(--sea-soft)' }}
            >
              Cada projeto começou com um problema de negócio. Aqui está como cada um foi resolvido,
              do primeiro esboço até o site no ar.
            </motion.p>
          </div>
        </section>

        <section className="container-x" aria-label="Projetos em destaque" style={{ paddingBottom: 'var(--section)' }}>
          {feature && <FeatureCard project={feature} />}
          {rest.length > 0 && (
            <div className="pj-grid">
              {rest.map((p, i) => (
                <GridCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </section>

        {labProjects.length > 0 && (
          <section className="bg-sand section-y">
            <div className="container-x">
              <div className="pj-section-head">
                <h2 className="fs-h2-section">Laboratório</h2>
                <p className="measure" style={{ color: 'var(--sea-soft)' }}>
                  Protótipos e ferramentas criados para resolver um problema de perto, fora do formato de
                  site para cliente.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {labProjects.map((p) => (
                  <LabCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {studyProjects.length > 0 && (
          <section className="section-y">
            <div className="container-x">
              <div className="pj-section-head">
                <h2 className="fs-h3">Estudos da faculdade</h2>
                <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                  Ciência da Computação, Unifor.
                </p>
              </div>
              <ul className="pj-study-list">
                {studyProjects.map((p) => (
                  <StudyRow key={p.slug} project={p} />
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        .pj-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem 0.9rem; color: var(--sea-soft); margin-bottom: 0.9rem; }
        .pj-kind { font-weight: 600; color: var(--sea); display: inline-flex; align-items: center; gap: 0.45rem; }
        .pj-kind::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--gold); }
        .pj-kind[data-kind='conceito']::before { background: transparent; box-shadow: inset 0 0 0 1.5px var(--gold-deep); }
        .pj-kind[data-kind='laboratorio']::before, .pj-kind[data-kind='faculdade']::before { background: var(--sea-soft); }
        .pj-title { transition: color 0.25s ease; }
        .pm-host:hover .pj-title { color: var(--gold-deep); }
        .pj-cta { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.75rem; border-bottom: 1.5px solid var(--gold); padding-bottom: 2px; }
        .pj-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr)); gap: 1.25rem 1.5rem; margin-top: 1.75rem; max-width: 34rem; }
        .pj-metrics dt { font-size: clamp(1.9rem, 3.2vw, 2.6rem); line-height: 1; color: var(--gold-deep); }
        .pj-metrics dd { color: var(--sea-soft); margin-top: 0.35rem; line-height: 1.3; font-size: 0.875rem; }

        .pj-feature { display: grid; gap: 2rem; align-items: center; }
        .pj-feature-text .pj-title { margin-bottom: 1.25rem; }
        @media (min-width: 1000px) {
          .pj-feature { grid-template-columns: 1.35fr 1fr; gap: 4rem; }
        }

        .pj-grid { display: grid; gap: 4rem 2.5rem; margin-top: clamp(4rem, 8vw, 7rem); }
        @media (min-width: 860px) { .pj-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 860px) { .pj-grid > :nth-child(2n) { margin-top: 6rem; } }
        .pj-card { display: block; }

        .pj-section-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1rem 3rem; margin-bottom: 3rem; }
        .pj-lab { display: grid; gap: 2rem; align-items: center; }
        @media (min-width: 900px) { .pj-lab { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .pj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .pj-tags span { font-size: 0.8rem; color: var(--sea-soft); padding: 0.2rem 0.7rem; border: 1px solid var(--line-strong); border-radius: var(--r-pill); }

        .pj-study-list { list-style: none; border-top: 1px solid var(--line); }
        .pj-study-list li { border-bottom: 1px solid var(--line); }
        .pj-study { display: flex; align-items: center; gap: 1.25rem; padding-block: 1.25rem; }
        .pj-study:hover .pj-title { color: var(--gold-deep); }
        .pj-thumb { flex-shrink: 0; width: 88px; aspect-ratio: 16 / 10; border-radius: 8px; overflow: hidden; background: var(--sand); display: grid; place-items: center; border: 1px solid var(--line); }
        .pj-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .pj-thumb-dot { width: 14px; height: 14px; border-radius: 50%; }
        .pj-study-year { color: var(--sea-soft); flex-shrink: 0; }
      `}</style>
    </>
  )
}
