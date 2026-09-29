import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Footer from '../components/Footer'
import {
  clientProjects,
  personalProjects,
  projectPreview,
  projectPreviewFallback,
  techLabel,
  type Project,
} from '../data/projects'
import { useSEO } from '../hooks/useSEO'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

function FloatingPreview({ project }: { project: Project }) {
  const sources = [projectPreview(project), projectPreviewFallback(project)]
  const [index, setIndex] = useState(0)

  if (index >= sources.length) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--sand)',
          display: 'grid',
          placeItems: 'center',
          padding: '1rem',
        }}
      >
        <span className="display" style={{ fontSize: '1.1rem', color: 'var(--sea)', textAlign: 'center' }}>
          {project.title}
        </span>
      </div>
    )
  }

  return (
    <img
      src={sources[index]}
      alt=""
      aria-hidden="true"
      onError={() => setIndex((i) => i + 1)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
    />
  )
}

function ProjectRow({
  project,
  position,
  onHover,
}: {
  project: Project
  position: number
  onHover: (slug: string | null) => void
}) {
  return (
    <motion.li variants={itemVariants} style={{ borderBottom: '1px solid var(--line)' }}>
      <Link
        to={`/projetos/${project.slug}`}
        className="project-row"
        onMouseEnter={() => onHover(project.slug)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(project.slug)}
        onBlur={() => onHover(null)}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="fs-small"
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--sea-soft)', marginBottom: '0.6rem' }}
          >
            <span>{String(position).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.segment && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.segment}</span>
              </>
            )}
          </div>

          <h3 className="project-title" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.25rem)', marginBottom: '0.75rem' }}>
            {project.title}
          </h3>

          <p className="measure" style={{ color: 'var(--sea-soft)' }}>
            {project.problem ?? project.shortDesc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="fs-small"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--sea-soft)',
                  padding: '0.2rem 0.7rem',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-pill)',
                }}
              >
                {techLabel(tech)}
              </span>
            ))}
          </div>
        </div>

        <span className="project-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </motion.li>
  )
}

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const reduced = useReducedMotion()

  const hoveredProject =
    hovered !== null ? [...clientProjects, ...personalProjects].find((p) => p.slug === hovered) : undefined

  useSEO({
    title: 'Projetos — Dourado Studio',
    description:
      'Sites, landing pages e sistemas feitos pela Dourado Studio para clientes, além dos projetos autorais de Vinícius Dourado.',
    path: '/projetos',
  })

  return (
    <>
      <main onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}>
        <section style={{ paddingBlock: '5rem 3rem' }}>
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="fs-display" style={{ marginBottom: '1.5rem' }}>
                Projetos
              </h1>
              <p className="fs-lead measure" style={{ color: 'var(--sea-soft)' }}>
                Trabalhos feitos para clientes e projetos autorais construídos para aprender e testar
                ideias.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-x" style={{ paddingBottom: '5rem' }}>
          <h2 className="fs-h3" style={{ marginBottom: '1.5rem' }}>
            Para clientes
          </h2>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ listStyle: 'none', borderTop: '1px solid var(--line)' }}
          >
            {clientProjects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} position={i + 1} onHover={setHovered} />
            ))}
          </motion.ul>
        </section>

        <section className="container-x" style={{ paddingBottom: '6rem' }}>
          <h2 className="fs-h3" style={{ marginBottom: '1.5rem' }}>
            Projetos autorais
          </h2>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ listStyle: 'none', borderTop: '1px solid var(--line)' }}
          >
            {personalProjects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} position={i + 1} onHover={setHovered} />
            ))}
          </motion.ul>
        </section>
      </main>

      {/* Preview flutuante */}
      <AnimatePresence>
        {hoveredProject && !reduced && (
          <motion.div
            key={hoveredProject.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="project-preview"
            style={{
              top: mouse.y - 130,
              left: mouse.x + 32,
            }}
          >
            <FloatingPreview project={hoveredProject} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <style>{`
        .project-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-block: 2.5rem;
        }
        .project-title { transition: color 0.2s ease; }
        .project-row:hover .project-title { color: var(--gold-deep); }
        .project-arrow {
          flex-shrink: 0;
          font-size: 1.5rem;
          color: var(--gold-deep);
          opacity: 0.35;
          transform: translateX(-8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .project-row:hover .project-arrow { opacity: 1; transform: translateX(0); }
        .project-preview {
          position: fixed;
          width: 280px;
          height: 190px;
          border-radius: var(--r-media);
          overflow: hidden;
          background: var(--sand);
          border: 1px solid var(--line);
          box-shadow: 0 24px 60px rgba(14,44,63,0.22);
          pointer-events: none;
          z-index: 90;
        }
        @media (max-width: 900px) { .project-preview { display: none; } }
      `}</style>
    </>
  )
}
