import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import FinalCta from '../components/home/FinalCta'
import { services, servicesPageCopy } from '../data/services'
import { useSEO } from '../hooks/useSEO'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** /servicos — todos os serviços, cada um levando à própria página. */
export default function Services() {
  useSEO({
    title: servicesPageCopy.seoTitle,
    description: servicesPageCopy.seoDescription,
    path: '/servicos',
  })

  return (
    <>
      <main>
        <section style={{ paddingBlock: 'clamp(2.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem)' }}>
          <motion.div
            className="container-x"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1 className="fs-h2" style={{ maxWidth: '18ch', marginBottom: '1.5rem' }}>
              {servicesPageCopy.title}
            </h1>
            <p className="fs-lead measure" style={{ color: 'var(--sea-soft)' }}>
              {servicesPageCopy.lead}
            </p>
          </motion.div>
        </section>

        {servicesPageCopy.groups.map((group) => (
          <section key={group.id} style={{ paddingBlock: 'clamp(1.5rem, 3vw, 2.5rem)' }} aria-labelledby={`grupo-${group.id}`}>
            <div className="container-x">
              <ScrollReveal>
                <h2 id={`grupo-${group.id}`} className="fs-h3" style={{ marginBottom: '1.5rem' }}>
                  {group.title}
                </h2>
              </ScrollReveal>
              <ul className="svs-list">
                {services
                  .filter((s) => s.group === group.id)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link to={`/servicos/${s.slug}`} className="svs-card">
                        <span className="svs-name">{s.name}</span>
                        <span className="svs-summary">{s.summary}</span>
                        <span className="svs-more label-ui">Ver como funciona</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        ))}

        <div style={{ height: 'clamp(2rem, 4vw, 4rem)' }} />
        <FinalCta />
      </main>

      <Footer />

      <style>{`
        .svs-list { list-style: none; display: grid; gap: 0.75rem; }
        @media (min-width: 768px) { .svs-list { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
        .svs-list li { display: flex; }
        .svs-card { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; padding: 1.5rem; border: 1px solid var(--line-strong); border-radius: var(--r-card); transition: border-color 0.2s ease, transform 0.3s ease; }
        .svs-card:hover { border-color: var(--gold); transform: translateY(-3px); }
        .svs-name { font-weight: 600; font-size: 1.25rem; line-height: 1.2; }
        .svs-summary { color: var(--sea-soft); flex: 1; }
        .svs-more { color: var(--gold-deep); margin-top: 0.4rem; }
        @media (prefers-reduced-motion: reduce) { .svs-card { transition: none; } .svs-card:hover { transform: none; } }
      `}</style>
    </>
  )
}
