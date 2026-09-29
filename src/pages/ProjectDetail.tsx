import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import DeviceMockup from '../components/DeviceMockup'
import Footer from '../components/Footer'
import WhatsAppIcon from '../components/WhatsAppIcon'
import {
  projects,
  projectPreviewFallback,
  techIcon,
  techLabel,
} from '../data/projects'
import { useSEO } from '../hooks/useSEO'
import { whatsappLink } from '../config/contact'

function NotFound() {
  useSEO({
    title: 'Projeto não encontrado — Dourado Studio',
    description: 'Esta página de projeto não existe.',
    path: '/projetos',
  })

  return (
    <main style={{ minHeight: '60svh', display: 'grid', placeItems: 'center', padding: '4rem 0' }}>
      <div className="container-x" style={{ textAlign: 'center' }}>
        <h1 className="fs-h2" style={{ marginBottom: '1.5rem' }}>
          Projeto não encontrado
        </h1>
        <Link className="btn btn-secondary" to="/projetos">
          Ver todos os projetos
        </Link>
      </div>
    </main>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useSEO({
    title: project ? `${project.title} — Case Dourado Studio` : 'Case — Dourado Studio',
    description: project ? project.shortDesc : 'Case da Dourado Studio.',
    path: `/projetos/${slug ?? ''}`,
    image: project?.images?.desktop,
  })

  if (!project) return <NotFound />

  const prev = projects[index - 1]
  const next = projects[index + 1]
  const isClient = project.kind === 'cliente'

  return (
    <>
      <main>
        {/* Hero */}
        <section style={{ paddingBlock: '4rem 3rem' }}>
          <div className="container-x">
            <Link className="fs-small link-underline" to="/projetos" style={{ color: 'var(--sea-soft)' }}>
              Todos os projetos
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{ marginTop: '2.5rem' }}
            >
              <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '1rem' }}>
                {isClient ? 'Projeto para cliente' : 'Projeto autoral'}
                {project.segment ? ` · ${project.segment}` : ''} · {project.year}
              </p>

              <h1 className="fs-display" style={{ marginBottom: '1.5rem' }}>
                {project.title}
              </h1>

              <p className="fs-lead measure" style={{ color: 'var(--sea-soft)' }}>
                {project.problem ?? project.shortDesc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
                {project.live && (
                  <a
                    className="btn btn-primary"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Abrir site
                  </a>
                )}
                {project.github && (
                  <a
                    className="btn btn-secondary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Ver no GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mockup */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container-x">
            <ScrollReveal>
              <DeviceMockup
                title={project.title}
                desktop={project.images?.desktop}
                mobile={project.images?.mobile}
                desktopFallback={projectPreviewFallback(project)}
                priority
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Resultados */}
        {project.metrics && project.metrics.length > 0 && (
          <section style={{ background: 'var(--sand)', paddingBlock: '3.5rem' }}>
            <div className="container-x">
              <dl style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--gold-deep)' }}>
                      {m.value}
                    </dt>
                    <dd className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.35rem' }}>
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Conteúdo */}
        <section className="section-y">
          <div className="container-x detail-grid">
            <div>
              <ScrollReveal>
                <h2 className="fs-h3" style={{ marginBottom: '1.25rem' }}>
                  Sobre o projeto
                </h2>
                <p className="measure" style={{ color: 'var(--sea-soft)' }}>
                  {project.fullDesc}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="fs-h3" style={{ marginTop: '3.5rem', marginBottom: '1.5rem' }}>
                  Desafios
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.challenges.map((ch, i) => (
                    <motion.li
                      key={ch}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ width: 16, height: 2, background: 'var(--gold)', flexShrink: 0, marginTop: '0.7rem' }}
                      />
                      <p className="measure" style={{ color: 'var(--sea-soft)' }}>
                        {ch}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={0.15}>
                <div
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-input)',
                    padding: '1.75rem',
                  }}
                >
                  {project.client && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 className="fs-small" style={{ fontStretch: '100%', letterSpacing: 0, marginBottom: '0.35rem' }}>
                        Cliente
                      </h3>
                      <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                        {project.client}
                      </p>
                    </div>
                  )}

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 className="fs-small" style={{ fontStretch: '100%', letterSpacing: 0, marginBottom: '0.35rem' }}>
                      Meu papel
                    </h3>
                    <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                      {project.role}
                    </p>
                  </div>

                  <h3 className="fs-small" style={{ fontStretch: '100%', letterSpacing: 0, marginBottom: '1rem' }}>
                    Tecnologias
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                    {project.stack.map((tech) => (
                      <div
                        key={tech}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: 70 }}
                      >
                        <i className={`${techIcon(tech)} colored`} style={{ fontSize: '1.75rem' }} />
                        <span style={{ fontSize: '0.7rem', color: 'var(--sea-soft)', textAlign: 'center' }}>
                          {techLabel(tech)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  className="btn btn-primary"
                  href={whatsappLink(
                    `Olá! Vi o case ${project.title} no site da Dourado Studio e quero algo parecido.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1.5rem', width: '100%' }}
                >
                  <WhatsAppIcon size={20} color="var(--sea)" />
                  Quero algo parecido
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Anterior / próximo */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: '2.5rem' }}>
          <div
            className="container-x"
            style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            {prev ? (
              <Link to={`/projetos/${prev.slug}`}>
                <span className="fs-small" style={{ color: 'var(--sea-soft)', display: 'block', marginBottom: '0.2rem' }}>
                  Anterior
                </span>
                <span className="display" style={{ fontSize: '1.15rem' }}>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link to={`/projetos/${next.slug}`} style={{ textAlign: 'right' }}>
                <span className="fs-small" style={{ color: 'var(--sea-soft)', display: 'block', marginBottom: '0.2rem' }}>
                  Próximo
                </span>
                <span className="display" style={{ fontSize: '1.15rem' }}>
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .detail-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start; }
        @media (min-width: 900px) {
          .detail-grid { grid-template-columns: 1.6fr 0.9fr; gap: 4rem; }
        }
      `}</style>
    </>
  )
}
