import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

const MOCK_COLORS: Record<string, string> = {
  studyhub: '#4F8EF7',
  'lectio-divina': '#8B5CF6',
  caltracker: '#10B981',
  closr: '#10B981',
}

function ProjectMockup({ slug, color }: { slug: string; color: string }) {
  const c = MOCK_COLORS[slug] || color

  if (slug === 'studyhub') {
    return (
      <div style={{ background: '#0f1117', borderRadius: 8, padding: '1rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#e2e8f0', height: '100%' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {['#ff5f57','#ffbc2e','#28c841'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ background: '#1a1f2e', borderRadius: 6, padding: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ color: c, fontWeight: 700, marginBottom: 4 }}>StudyHub Dashboard</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            {['Matemática 87%','Física 72%','Química 65%','Bio 90%'].map(s => (
              <div key={s} style={{ background: '#0f1117', padding: '0.4rem', borderRadius: 4, fontSize: '0.65rem' }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ background: '#1a1f2e', borderRadius: 6, padding: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, height: 4, background: '#0f1117', borderRadius: 2 }}>
            <div style={{ width: '73%', height: '100%', background: c, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: '0.65rem', color: c }}>73%</span>
        </div>
      </div>
    )
  }

  if (slug === 'lectio-divina') {
    return (
      <div style={{ background: '#1a0a2e', borderRadius: 8, padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ color: c, fontFamily: 'serif', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.5, opacity: 0.9 }}>
          "Lectio, Meditatio,<br />Oratio, Contemplatio"
        </div>
        <div style={{ background: `${c}18`, borderRadius: 6, padding: '0.6rem', border: `1px solid ${c}30` }}>
          <div style={{ fontSize: '0.65rem', color: c, marginBottom: 3 }}>Salmo 23</div>
          <div style={{ fontSize: '0.65rem', color: '#c4b5fd', lineHeight: 1.5 }}>O Senhor é meu pastor e nada me faltará...</div>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[1,2,3,4,5,6,7].map(d => (
            <div key={d} style={{ flex: 1, height: 6, borderRadius: 2, background: d <= 5 ? c : `${c}30` }} />
          ))}
        </div>
        <div style={{ fontSize: '0.6rem', color: '#7c6f9f' }}>5 dias seguidos ✦</div>
      </div>
    )
  }

  if (slug === 'caltracker') {
    return (
      <div style={{ background: '#0a1a12', borderRadius: 8, padding: '1rem', height: '100%', fontFamily: 'monospace', fontSize: '0.65rem', color: '#a7f3d0' }}>
        <div style={{ color: c, fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.8rem' }}>CalTracker</div>
        {[{ name: 'Proteínas', val: 142, max: 160 }, { name: 'Carboidratos', val: 210, max: 300 }, { name: 'Gorduras', val: 58, max: 70 }].map(m => (
          <div key={m.name} style={{ marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span>{m.name}</span><span style={{ color: c }}>{m.val}g</span>
            </div>
            <div style={{ height: 4, background: '#0f1a0f', borderRadius: 2 }}>
              <div style={{ width: `${(m.val / m.max) * 100}%`, height: '100%', background: c, borderRadius: 2, transition: 'width 0.5s' }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: '0.75rem', color: c, fontSize: '0.7rem', fontWeight: 700 }}>1.842 / 2.200 kcal</div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #061a10, #0d2818)',
      borderRadius: 8,
      padding: '1rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 6, padding: '0.5rem 0.6rem', position: 'relative' }}>
        <div style={{ fontSize: '0.55rem', color: '#6ee7b7', marginBottom: 2 }}>Nome do cliente</div>
        <div style={{ fontSize: '0.7rem', color: '#a7f3d0' }}>João Silva</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, position: 'relative' }}>
        <div style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px 8px 2px 8px', padding: '0.4rem 0.6rem', alignSelf: 'flex-end', maxWidth: '85%' }}>
          <div style={{ fontSize: '0.6rem', color: '#a7f3d0', lineHeight: 1.4 }}>Olá João! Seu seguro auto vence em 15 dias. 🚗</div>
        </div>
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px 8px 2px 8px', padding: '0.4rem 0.6rem', alignSelf: 'flex-end', maxWidth: '85%' }}>
          <div style={{ fontSize: '0.6rem', color: '#a7f3d0', lineHeight: 1.4 }}>Posso te ajudar com a renovação?</div>
        </div>
      </div>
      <div style={{ background: 'rgba(16,185,129,0.8)', borderRadius: 6, padding: '0.4rem 0.6rem', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#000', position: 'relative' }}>
        Copiar mensagem ↗
      </div>
    </div>
  )
}

function ProjectPreview({ slug, color, title }: { slug: string; color: string; title: string }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <ProjectMockup slug={slug} color={color} />
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={`/images/projects/${slug}.png`}
        alt={title}
        onError={() => setImgError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.75rem 1rem',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.78))',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, color: '#E8E8E8', letterSpacing: '-0.01em' }}>
          {title}
        </span>
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function Projects() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <main onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '100px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Portfólio
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Projetos
          </h1>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ listStyle: 'none', borderTop: '1px solid var(--border)' }}
        >
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              variants={itemVariants}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <Link
                to={`/projects/${project.slug}`}
                style={{ display: 'block', padding: '2.5rem 0', transition: 'padding 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '100px',
                        background: project.status === 'completed' ? 'rgba(245,200,66,0.1)' : 'rgba(16,185,129,0.1)',
                        color: project.status === 'completed' ? 'var(--yellow)' : '#10B981',
                        border: `1px solid ${project.status === 'completed' ? 'rgba(245,200,66,0.2)' : 'rgba(16,185,129,0.2)'}`,
                        fontWeight: 600,
                      }}>
                        {project.status === 'completed' ? 'Concluído' : 'Em progresso'}
                      </span>
                    </div>

                    <motion.h2
                      animate={{ color: hoveredSlug === project.slug ? 'var(--yellow)' : 'var(--text)' }}
                      transition={{ duration: 0.2 }}
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}
                    >
                      {project.title}
                    </motion.h2>

                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '480px' }}>{project.shortDesc}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} style={{ fontSize: '0.75rem', color: 'var(--muted)', padding: '0.2rem 0.6rem', background: 'var(--bg3)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    animate={{ x: hoveredSlug === project.slug ? 0 : 8, opacity: hoveredSlug === project.slug ? 1 : 0.4 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: '1.5rem', color: 'var(--yellow)', flexShrink: 0 }}
                  >
                    →
                  </motion.div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Floating hover preview */}
      <AnimatePresence>
        {hoveredSlug && (
          <motion.div
            key={hoveredSlug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: mousePos.y - 140,
              left: mousePos.x + 30,
              width: 260,
              height: 180,
              background: 'var(--bg3)',
              border: `1px solid ${MOCK_COLORS[hoveredSlug]}40`,
              borderRadius: '12px',
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 200,
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${MOCK_COLORS[hoveredSlug]}20`,
            }}
          >
            <ProjectPreview
              slug={hoveredSlug}
              color={projects.find((p) => p.slug === hoveredSlug)?.color || 'var(--yellow)'}
              title={projects.find((p) => p.slug === hoveredSlug)?.title || ''}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
