import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import DeviceMockup from '../components/DeviceMockup'
import ProjectMedia from '../components/ProjectMedia'
import Footer from '../components/Footer'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { projects, KIND_LABEL, techIcon, techLabel, type ProjectShot } from '../data/projects'
import { useSEO } from '../hooks/useSEO'
import { whatsappLink } from '../config/contact'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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

function DesktopShot({ shot }: { shot: ProjectShot }) {
  return (
    <figure className="cs-shot">
      <div className="cs-shot-window">
        <div className="pm-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
      </div>
      {shot.caption && <figcaption className="fs-small">{shot.caption}</figcaption>}
    </figure>
  )
}

function MobileShot({ shot }: { shot: ProjectShot }) {
  return (
    <figure className="cs-phone">
      <div className="cs-phone-frame">
        <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
      </div>
      {shot.caption && <figcaption className="fs-small">{shot.caption}</figcaption>}
    </figure>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useSEO({
    title: project ? `${project.title} — Case Dourado Studio` : 'Case — Dourado Studio',
    description: project ? (project.problem ?? project.shortDesc) : 'Case da Dourado Studio.',
    path: `/projetos/${slug ?? ''}`,
    image: project?.images?.desktop,
  })

  if (!project) return <NotFound />

  const next = projects[(index + 1) % projects.length]
  const desktopShots = project.gallery?.filter((s) => s.device === 'desktop') ?? []
  const mobileShots = project.gallery?.filter((s) => s.device === 'mobile') ?? []

  const facts = [
    { label: 'Cliente', value: project.client },
    { label: 'Segmento', value: project.segment },
    { label: 'Meu papel', value: project.role },
    { label: 'Duração', value: project.duration },
    { label: 'Ano', value: String(project.year) },
    { label: 'Situação', value: project.stage },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  return (
    <>
      <main>
        {/* Abertura */}
        <section style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem) clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="container-x">
            <Link className="fs-small link-underline" to="/projetos" style={{ color: 'var(--sea-soft)' }}>
              Todos os projetos
            </Link>

            <div className="cs-hero">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="fs-small cs-kind">{KIND_LABEL[project.kind]}</p>
                <h1 className="fs-display" style={{ marginBottom: '1.5rem' }}>
                  {project.title}
                </h1>
                <p className="fs-lead measure" style={{ color: 'var(--sea-soft)' }}>
                  {project.problem ?? project.shortDesc}
                </p>

                {(project.live || project.github) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
                    {project.live && (
                      <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">
                        Ver o site no ar
                      </a>
                    )}
                    {project.github && (
                      <a className="btn btn-secondary" href={project.github} target="_blank" rel="noopener noreferrer">
                        Ver o código
                      </a>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.dl
                className="cs-facts"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.12 }}
              >
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="fs-small">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </section>

        {/* Vitrine */}
        <section
          className="cs-stage"
          style={{ ['--cs-color' as string]: project.color }}
          aria-label={`Telas do projeto ${project.title}`}
        >
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              style={{ maxWidth: 1040, marginInline: 'auto' }}
            >
              {project.images ? (
                <DeviceMockup
                  title={project.title}
                  desktop={project.images.desktop}
                  mobile={project.images.mobile}
                  priority
                />
              ) : (
                <ProjectMedia project={project} ratio="16 / 9" priority />
              )}
            </motion.div>
          </div>
        </section>

        {/* Números */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="container-x" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
            <dl className="cs-metrics">
              {project.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="cs-metric"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                >
                  <dt className="text-proof">{m.value}</dt>
                  <dd>{m.label}</dd>
                </motion.div>
              ))}
            </dl>
          </section>
        )}

        {/* História */}
        <section className="section-y">
          <div className="container-x" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 6.5rem)' }}>
            <ScrollReveal>
              <div className="cs-row">
                <h2 className="fs-h3">Como estava</h2>
                <p className="fs-lead" style={{ color: 'var(--sea-soft)', maxWidth: '42rem' }}>
                  {project.fullDesc}
                </p>
              </div>
            </ScrollReveal>

            {project.highlights && project.highlights.length > 0 && (
              <div className="cs-row">
                <ScrollReveal>
                  <h2 className="fs-h3">O que eu fiz</h2>
                </ScrollReveal>
                <ol className="cs-highlights">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={h.title}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease, delay: (i % 2) * 0.1 }}
                    >
                        <span className="cs-num text-proof" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 style={{ fontSize: '1.3rem', margin: '0.75rem 0 0.6rem', lineHeight: 1.15 }}>{h.title}</h3>
                      <p style={{ color: 'var(--sea-soft)' }}>{h.text}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>

        {/* Resultado */}
        {project.outcome && (
          <section className="bg-sea" style={{ paddingBlock: 'clamp(4rem, 9vw, 7rem)' }}>
            <div className="container-x">
              <ScrollReveal>
                <p className="fs-small" style={{ color: 'var(--on-sea-soft)', marginBottom: '1.25rem' }}>
                  E no fim
                </p>
                <p className="display" style={{ color: 'var(--on-sea)', fontSize: 'clamp(1.9rem, 4.2vw, 3.5rem)', maxWidth: '22ch', lineHeight: 1.08 }}>
                  {project.outcome}
                </p>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Galeria */}
        {(desktopShots.length > 0 || mobileShots.length > 0) && (
          <section className="section-y bg-sand">
            <div className="container-x">
              <ScrollReveal>
                <h2 className="fs-h2-section" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  Dá uma olhada por dentro
                </h2>
              </ScrollReveal>

              {desktopShots.length > 0 && (
                <div className="cs-shots">
                  {desktopShots.map((s, i) => (
                    <ScrollReveal key={s.src} delay={(i % 2) * 0.1}>
                      <DesktopShot shot={s} />
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {mobileShots.length > 0 && (
                <div className="cs-phones" role="list" aria-label="Telas no celular">
                  {mobileShots.map((s, i) => (
                    <ScrollReveal key={s.src} delay={i * 0.08}>
                      <div role="listitem">
                        <MobileShot shot={s} />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Por trás do código */}
        <section className="section-y">
          <div className="container-x">
            <details className="cs-tech">
              <summary>
                <span>
                  <span className="fs-h3 display" style={{ display: 'block' }}>
                    Por trás do código
                  </span>
                  <span className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                    Pra quem é da área: a stack e o que deu mais trabalho.
                  </span>
                </span>
                <span className="cs-tech-icon" aria-hidden="true" />
              </summary>

              <div className="cs-tech-body">
                <div className="cs-stack">
                  {project.stack.map((tech) => {
                    const icon = techIcon(tech)
                    return (
                      <span key={tech} className="cs-chip">
                        {icon && <i className={`${icon} colored`} aria-hidden="true" />}
                        {techLabel(tech)}
                      </span>
                    )
                  })}
                </div>
                <ul className="cs-challenges">
                  {project.challenges.map((ch) => (
                    <li key={ch}>{ch}</li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="container-x" style={{ paddingBottom: 'var(--section)' }}>
          <ScrollReveal>
            <div className="cs-cta">
              <h2 className="fs-h2-section" style={{ color: 'var(--on-sea)', maxWidth: '16ch' }}>
                Curtiu? Dá pra fazer algo assim pro seu negócio.
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  className="btn btn-primary"
                  href={whatsappLink(`Olá! Vi o projeto ${project.title} no site da Dourado Studio e quero algo parecido.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={20} color="var(--sea)" />
                  Conversar no WhatsApp
                </a>
                <Link className="btn btn-on-sea" to="/orcamento">
                  Monte seu projeto
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Próximo */}
        {next && next.slug !== project.slug && (
          <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
            <div className="container-x">
              <Link to={`/projetos/${next.slug}`} className="pm-host cs-next">
                <div>
                  <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '0.75rem' }}>
                    Próximo projeto
                  </p>
                  <p className="display pj-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}>
                    {next.title}
                  </p>
                  <p style={{ color: 'var(--sea-soft)', marginTop: '1rem', maxWidth: '30rem' }}>{next.shortDesc}</p>
                </div>
                <ProjectMedia project={next} ratio="16 / 10" />
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        .cs-hero { display: grid; gap: 2.5rem; margin-top: 2.5rem; align-items: end; }
        @media (min-width: 1000px) { .cs-hero { grid-template-columns: 1fr 20rem; gap: 4rem; } }
        .cs-kind { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; margin-bottom: 1rem; }
        .cs-kind::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--gold); }
        .cs-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
        @media (min-width: 1000px) { .cs-facts { grid-template-columns: 1fr; } }
        .cs-facts dt { color: var(--sea-soft); margin-bottom: 0.15rem; }
        .cs-facts dd { font-weight: 500; line-height: 1.35; }

        .cs-stage {
          padding-block: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem);
          background:
            radial-gradient(60% 70% at 50% 100%, color-mix(in srgb, var(--cs-color) 30%, transparent), transparent 70%),
            var(--sand);
        }

        .cs-metrics { display: grid; gap: 1rem; }
        @media (min-width: 720px) { .cs-metrics { grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); } }
        .cs-metric { background: var(--gold); color: var(--sea); border-radius: var(--r-card); padding: 1.75rem 1.75rem 1.5rem; height: 100%; }
        .cs-metric dt { font-size: clamp(2.75rem, 6vw, 4.5rem); line-height: 0.95; }
        .cs-metric dd { margin-top: 0.6rem; font-weight: 500; line-height: 1.35; }
        @media (max-width: 719px) {
          .cs-metric { display: grid; grid-template-columns: 6.5rem 1fr; align-items: center; gap: 1rem; padding: 1.1rem 1.25rem; }
          .cs-metric dt { font-size: 2.4rem; }
          .cs-metric dd { margin-top: 0; }
        }

        .cs-row { display: grid; gap: 1.5rem; }
        @media (min-width: 900px) { .cs-row { grid-template-columns: 16rem 1fr; gap: 3rem; } }
        .cs-highlights { list-style: none; display: grid; gap: 2.5rem 3rem; }
        @media (min-width: 720px) { .cs-highlights { grid-template-columns: 1fr 1fr; } }
        .cs-highlights li { border-top: 1px solid var(--line-strong); padding-top: 1.25rem; }
        .cs-num { color: var(--gold-deep); font-size: 1.1rem; }

        .cs-shots { display: grid; gap: 2.5rem 2rem; }
        @media (min-width: 860px) {
          .cs-shots { grid-template-columns: 1fr 1fr; }
          .cs-shots > :first-child:nth-last-child(2n + 1) { grid-column: 1 / -1; }
        }
        .cs-shot-window { border-radius: 12px; overflow: hidden; background: var(--white); box-shadow: 0 30px 60px -24px rgba(14,44,63,0.35), 0 0 0 1px rgba(14,44,63,0.08); }
        .cs-shot-window img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
        .cs-shot figcaption, .cs-phone figcaption { color: var(--sea-soft); margin-top: 0.85rem; }
        .cs-phones { display: flex; gap: 1.5rem; margin-top: 4rem; overflow-x: auto; padding-bottom: 1rem; scroll-snap-type: x mandatory; }
        .cs-phones > * { flex: 0 0 auto; scroll-snap-align: start; }
        @media (min-width: 860px) { .cs-phones { justify-content: center; overflow: visible; gap: 2.5rem; } }
        .cs-phone { width: clamp(170px, 42vw, 240px); }
        .cs-phone-frame { padding: 7px; border-radius: 34px; background: var(--sea); box-shadow: 0 24px 40px -14px rgba(14,44,63,0.45); }
        .cs-phone-frame img { width: 100%; aspect-ratio: 9 / 19.5; object-fit: cover; object-position: top; border-radius: 28px; }

        .cs-tech { border-top: 1px solid var(--line-strong); border-bottom: 1px solid var(--line-strong); }
        .cs-tech summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding-block: 1.75rem; cursor: pointer; }
        .cs-tech summary::-webkit-details-marker { display: none; }
        .cs-tech-icon { position: relative; flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--line-strong); transition: background-color 0.2s ease, transform 0.3s ease; }
        .cs-tech-icon::before, .cs-tech-icon::after { content: ''; position: absolute; left: 50%; top: 50%; width: 14px; height: 1.5px; background: var(--sea); transform: translate(-50%, -50%); }
        .cs-tech-icon::after { transform: translate(-50%, -50%) rotate(90deg); transition: transform 0.3s ease; }
        .cs-tech[open] .cs-tech-icon::after { transform: translate(-50%, -50%) rotate(0deg); }
        .cs-tech summary:hover .cs-tech-icon { background: var(--sand); }
        .cs-tech-body { padding-bottom: 2.5rem; display: grid; gap: 2rem; }
        .cs-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .cs-chip { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.9rem; padding: 0.4rem 0.85rem; border: 1px solid var(--line-strong); border-radius: var(--r-pill); }
        .cs-chip i { font-size: 1.05rem; }
        .cs-challenges { list-style: none; display: grid; gap: 0.9rem; max-width: 48rem; }
        .cs-challenges li { position: relative; padding-left: 1.75rem; color: var(--sea-soft); }
        .cs-challenges li::before { content: ''; position: absolute; left: 0; top: 0.8rem; width: 14px; height: 2px; background: var(--gold); }

        .cs-cta { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 2rem; background: var(--sea); border-radius: var(--r-media); padding: clamp(2rem, 5vw, 4rem); }

        .cs-next { display: grid; gap: 2rem; align-items: center; }
        @media (min-width: 900px) { .cs-next { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .pj-title { transition: color 0.25s ease; }
        .pm-host:hover .pj-title { color: var(--gold-deep); }
      `}</style>
    </>
  )
}
