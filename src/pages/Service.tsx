import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import DeviceMockup from '../components/DeviceMockup'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Footer from '../components/Footer'
import ProcessSteps from '../components/home/ProcessSteps'
import FaqAccordion from '../components/home/FaqAccordion'
import FinalCta from '../components/home/FinalCta'
import { getService, legacyServiceSlugs, services } from '../data/services'
import { projects, KIND_LABEL, type Project } from '../data/projects'
import { whatsappLink } from '../config/contact'
import { serviceSeo } from '../data/seo'
import { useSEO } from '../hooks/useSEO'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function ProofCase({ project, note }: { project: Project; note?: string }) {
  return (
    <div className="sv-proof">
      <DeviceMockup title={project.title} desktop={project.images?.desktop} mobile={project.images?.mobile} />
      <div>
        <p className="fs-small" style={{ color: 'var(--sea-soft)', marginBottom: '0.75rem' }}>
          {KIND_LABEL[project.kind]}
          {project.segment ? ` · ${project.segment}` : ''}
        </p>
        <h3 className="fs-h3" style={{ marginBottom: '1rem' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--sea-soft)', marginBottom: '1.5rem' }}>{note ?? project.outcome ?? project.shortDesc}</p>
        <Link className="btn btn-secondary" to={`/projetos/${project.slug}`}>
          Ver como ficou
        </Link>
      </div>
    </div>
  )
}

export default function Service() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  useSEO(service ? serviceSeo(service) : { title: 'Serviços — Dourado Studio', description: '', path: `/servicos/${slug ?? ''}` })

  if (!service) {
    const moved = slug ? legacyServiceSlugs[slug] : undefined
    return <Navigate to={moved ? `/servicos/${moved}` : '/servicos'} replace />
  }

  const proofCase = service.caseSlug ? projects.find((p) => p.slug === service.caseSlug) : undefined
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <main>
        {/* 1. Hero */}
        <section style={{ paddingBlock: 'clamp(2.5rem, 6vw, 5rem) var(--section)' }}>
          <div className="container-x sv-hero">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <p className="label-ui" style={{ color: 'var(--gold-deep)', marginBottom: '1.25rem' }}>
                {service.name}
              </p>
              <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 5.25rem)', marginBottom: '1.5rem' }}>{service.title}</h1>
              <p className="fs-lead measure" style={{ color: 'var(--sea-soft)' }}>
                {service.intro}
              </p>

              <dl className="sv-price">
                <div>
                  <dt className="fs-small">{service.recurring ? 'Com que frequência' : 'Quanto tempo leva'}</dt>
                  <dd className="text-proof">{service.deadline}</dd>
                </div>
              </dl>

              <a className="btn btn-primary" href={whatsappLink(service.message)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} color="var(--sea)" />
                Conversar no WhatsApp
              </a>
            </motion.div>

            <motion.div
              className="sv-hero-media"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              {service.heroImage && <img src={service.heroImage} alt="" decoding="async" fetchPriority="high" />}
              {service.heroCard && (
                <motion.div
                  className="sv-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.6 }}
                >
                  <span className="sv-card-dot" aria-hidden="true" />
                  <span>
                    <span className="label-ui" style={{ display: 'block', color: 'var(--sea-soft)', fontSize: 13 }}>
                      {service.heroCard.label}
                    </span>
                    <span className="fs-small" style={{ color: 'var(--sea)' }}>
                      {service.heroCard.text}
                    </span>
                  </span>
                </motion.div>
              )}
              {service.heroPanel && (
                <div className="sv-panel bg-sand">
                  <div className="sv-panel-card" aria-hidden="true">
                    <p className="label-ui" style={{ color: 'var(--sea-soft)', fontSize: 13, marginBottom: '0.5rem' }}>
                      {service.heroPanel.label}
                    </p>
                    {service.heroPanel.rows.map((row) => (
                      <p key={row.label} className="sv-panel-row">
                        <span className="sv-card-dot" />
                        <span className="sv-panel-text">
                          <span className="fs-small" style={{ fontWeight: 600 }}>{row.label}</span>
                          <span className="fs-small" style={{ color: 'var(--sea-soft)' }}>{row.value}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* 2. A dor */}
        <section className="bg-sea" style={{ paddingBlock: 'clamp(5rem, 12vw, 9rem)' }}>
          <div className="container-x">
            <ol className="sv-pain">
              {service.painLines.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                  className="display"
                >
                  {line}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. O que muda */}
        <section className="bg-sand section-y">
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2-section" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                O que muda na prática
              </h2>
            </ScrollReveal>
            <div className="sv-ba">
              {service.beforeAfter.map((pair, i) => (
                <motion.div
                  key={pair.after}
                  className="sv-ba-pair"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                >
                  <p className="sv-before">
                    <span className="fs-small">Antes</span>
                    {pair.before}
                  </p>
                  <p className="sv-after">
                    <span className="fs-small">Depois</span>
                    {pair.after}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. O que vem incluso */}
        <section className="section-y">
          <div className="container-x sv-included">
            <ScrollReveal>
              <h2 className="fs-h2-section">O que você recebe</h2>
              {service.includedNote && (
                <p style={{ color: 'var(--sea-soft)', marginTop: '1.25rem', maxWidth: '24rem' }}>{service.includedNote}</p>
              )}
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ul className="sv-list">
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
                {!service.recurring && <li>Prazo: {service.deadline.toLowerCase()}</li>}
              </ul>
            </ScrollReveal>
          </div>
        </section>


        {/* 5. Prova */}
        {proofCase && (
          <section className="section-y">
            <div className="container-x">
              <ScrollReveal>
                <h2 className="fs-h2-section" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  Já fiz algo bem parecido
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <ProofCase project={proofCase} note={service.proofNote} />
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* 6. Como funciona */}
        <ProcessSteps steps={service.steps} />

        {/* 7. Perguntas */}
        <FaqAccordion
          title="Dúvidas que sempre aparecem"
          items={service.faq.map((f) => ({ question: f.q, answer: f.a }))}
        />

        {/* Outros serviços */}
        <section className="section-y" style={{ paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="container-x">
            <h2 className="fs-h3" style={{ marginBottom: '1.5rem' }}>
              Não é bem isso que você precisa?
            </h2>
            <ul className="sv-others">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicos/${s.slug}`}>
                    <span className="sv-others-name">{s.name}</span>
                    <span className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                      {s.deadline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. CTA final */}
        <FinalCta message={service.message} />
      </main>

      <Footer />

      <style>{`
        .sv-hero { display: grid; gap: 3rem; align-items: center; }
        @media (min-width: 1000px) { .sv-hero { grid-template-columns: 1.05fr 0.95fr; gap: 4rem; } }
        .sv-price { display: flex; flex-wrap: wrap; gap: 1rem 3rem; margin: 2rem 0 2.25rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
        .sv-price dt { color: var(--sea-soft); margin-bottom: 0.2rem; }
        .sv-price dd { font-size: clamp(1.6rem, 3vw, 2.2rem); line-height: 1; }
        .sv-hero-media { position: relative; }
        .sv-hero-media img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: var(--r-media); }
        @media (min-width: 1000px) { .sv-hero-media img { aspect-ratio: 4 / 4.6; } }
        .sv-card { position: absolute; left: -1rem; bottom: 2rem; display: flex; gap: 0.75rem; align-items: flex-start; max-width: 270px; padding: 1rem 1.15rem; border-radius: var(--r-card); background: var(--white); box-shadow: 0 24px 50px -16px rgba(14,44,63,0.35); }
        @media (max-width: 999px) { .sv-card { left: 1rem; } }
        .sv-panel { position: relative; display: flex; align-items: center; justify-content: center; padding: clamp(1.5rem, 5vw, 3rem); border-radius: var(--r-media); overflow: hidden; }
        @media (min-width: 1000px) { .sv-panel { aspect-ratio: 4 / 4.6; } }
        .sv-panel-card { position: relative; width: 100%; max-width: 340px; padding: 1.25rem 1.35rem; border-radius: var(--r-card); background: var(--white); box-shadow: 0 24px 50px -16px rgba(14,44,63,0.35); }
        .sv-panel-row { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.7rem 0; border-top: 1px solid var(--line); }
        .sv-panel-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.35; }
        .sv-card-dot { flex-shrink: 0; width: 9px; height: 9px; margin-top: 0.35rem; border-radius: 50%; background: var(--whatsapp); }

        .sv-pain { list-style: none; display: flex; flex-direction: column; gap: clamp(1.5rem, 3vw, 2.5rem); }
        .sv-pain li { color: var(--on-sea); font-size: clamp(2rem, 4.6vw, 3.75rem); line-height: 1.05; max-width: 22ch; }
        .sv-pain li:last-child { color: var(--gold); }

        .sv-ba { display: grid; gap: 1.25rem; }
        @media (min-width: 900px) { .sv-ba { grid-template-columns: repeat(3, 1fr); } }
        .sv-ba-pair { display: flex; flex-direction: column; border-radius: var(--r-card); overflow: hidden; background: var(--white); box-shadow: 0 0 0 1px var(--line); }
        .sv-ba-pair p { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.5rem 1.5rem 1.6rem; line-height: 1.35; }
        .sv-ba-pair span { color: var(--sea-soft); font-weight: 600; }
        .sv-before { color: var(--sea-soft); text-decoration: line-through; text-decoration-color: rgba(14,44,63,0.3); }
        .sv-before span { text-decoration: none; display: inline-block; }
        .sv-after { background: var(--sea); color: var(--on-sea); font-size: 1.2rem; font-weight: 500; flex: 1; }
        .sv-after span { color: var(--gold) !important; }

        .sv-included { display: grid; gap: 2.5rem; }
        @media (min-width: 900px) { .sv-included { grid-template-columns: 0.8fr 1.2fr; gap: 4rem; } }
        .sv-list { list-style: none; border-top: 1px solid var(--line-strong); }
        .sv-list li { display: flex; align-items: center; gap: 1rem; padding: 1.15rem 0; border-bottom: 1px solid var(--line-strong); font-size: 1.15rem; }
        .sv-list li::before { content: ''; flex-shrink: 0; width: 18px; height: 2px; background: var(--gold); }

        .sv-proof { display: grid; gap: 2.5rem; align-items: center; }
        @media (min-width: 900px) { .sv-proof { grid-template-columns: 1.15fr 0.85fr; gap: 4rem; } }

        .sv-others { list-style: none; display: grid; gap: 0.75rem; }
        @media (min-width: 768px) { .sv-others { grid-template-columns: repeat(3, 1fr); } }
        .sv-others a { display: flex; flex-direction: column; gap: 0.35rem; padding: 1.25rem 1.4rem; border: 1px solid var(--line-strong); border-radius: var(--r-card); transition: border-color 0.2s ease, transform 0.3s ease; }
        .sv-others a:hover { border-color: var(--gold); transform: translateY(-3px); }
        .sv-others-name { font-weight: 600; font-size: 1.1rem; }
      `}</style>
    </>
  )
}
