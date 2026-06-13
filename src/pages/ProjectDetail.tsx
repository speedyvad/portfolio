import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectImage from '../components/ProjectImage'
import ScrollReveal from '../components/ScrollReveal'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const prev = projects[index - 1]
  const next = projects[index + 1]

  if (!project) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '1rem' }}>Projeto não encontrado</h1>
          <Link to="/projects" style={{ color: 'var(--yellow)' }}>← Voltar</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${project.color}12 0%, var(--bg) 100%)`,
        paddingBottom: '4rem',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <ProjectImage
            src={`/images/projects/${project.slug}.png`}
            alt={project.title}
            fallbackTheme={project.slug}
            style={{ width: '100%', height: '100%', opacity: 0.15 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, var(--bg) 100%)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '120px 2rem 0', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/projects"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '2rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--yellow)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ← Todos os projetos
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '100px',
                background: project.status === 'completed' ? 'rgba(245,200,66,0.1)' : 'rgba(16,185,129,0.1)',
                color: project.status === 'completed' ? 'var(--yellow)' : '#10B981',
                border: `1px solid ${project.status === 'completed' ? 'rgba(245,200,66,0.3)' : 'rgba(16,185,129,0.3)'}`,
                fontWeight: 600,
              }}>
                {project.status === 'completed' ? '✓ Concluído' : '◎ Em progresso'}
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{project.year}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>·</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{project.role}</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '1.5rem',
              color: 'var(--text)',
            }}>
              {project.title}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: 1.7 }}>
              {project.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section style={{ padding: '0 2rem', marginTop: '-2rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: `1px solid ${project.color}30`,
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}15`,
            }}>
              <ProjectImage
                src={`/images/projects/${project.slug}.png`}
                alt={`Screenshot do ${project.title}`}
                fallbackTheme={project.slug}
                style={{ width: '100%', height: '400px' }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Sobre o projeto
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem' }}>{project.fullDesc}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '3rem', marginBottom: '1.5rem' }}>
                Desafios
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.challenges.map((ch, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: 'var(--bg3)',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ color: 'var(--yellow)', flexShrink: 0, marginTop: 2 }}>◆</span>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{ch}</p>
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.15}>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  Stack
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                  {project.stack.map((tech) => (
                    <div key={tech} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                      <i className={`devicon-${tech}-plain colored`} style={{ fontSize: '1.75rem' }} />
                      <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.9rem',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--yellow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <i className="devicon-github-original" style={{ fontSize: '1.1rem' }} />
                  Ver no GitHub
                </a>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.9rem',
                      background: 'var(--yellow)',
                      borderRadius: '8px',
                      color: '#000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--yellow)')}
                  >
                    ↗ Ver live demo
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '3rem 2rem', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          {prev ? (
            <motion.div whileHover={{ x: -4 }} style={{ cursor: 'pointer' }} onClick={() => navigate(`/projects/${prev.slug}`)}>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>← Anterior</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{prev.title}</p>
            </motion.div>
          ) : <div />}

          {next ? (
            <motion.div whileHover={{ x: 4 }} style={{ cursor: 'pointer', textAlign: 'right' }} onClick={() => navigate(`/projects/${next.slug}`)}>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>Próximo →</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{next.title}</p>
            </motion.div>
          ) : <div />}
        </div>
      </section>
    </main>
  )
}
