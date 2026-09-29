import { useState } from 'react'
import { Link } from 'react-router-dom'

const SOURCES = ['/images/about/vinicius-trabalhando.jpg', '/images/profile.png']

function Portrait() {
  const [index, setIndex] = useState(0)

  if (index >= SOURCES.length) {
    return (
      <div
        style={{
          aspectRatio: '4 / 5',
          borderRadius: 'var(--r-media)',
          background: 'var(--sand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="display" style={{ fontSize: '4rem', color: 'var(--sea)' }}>
          VD
        </span>
      </div>
    )
  }

  return (
    <img
      src={SOURCES[index]}
      alt="Vinícius Dourado trabalhando no computador"
      loading="lazy"
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
      style={{
        width: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 'var(--r-media)',
      }}
    />
  )
}

export default function WhoSection() {
  return (
    <section className="section-y" style={{ background: 'var(--white)' }}>
      <div className="container-x who">
        <div className="who-photo">
          <Portrait />
        </div>

        <div>
          <h2 className="fs-h2-section" style={{ marginBottom: '1.75rem' }}>
            Quem faz
          </h2>
          <p className="fs-lead measure" style={{ marginBottom: '1.25rem' }}>
            A Dourado Studio é o estúdio de Vinícius Dourado, desenvolvedor front-end em Fortaleza,
            com experiência no Sistema Verdes Mares.
          </p>
          <p className="measure" style={{ color: 'var(--sea-soft)', marginBottom: '2rem' }}>
            Você fala direto com quem desenha e programa o seu site, sem intermediários.
          </p>
          <Link to="/sobre" className="link-underline" style={{ fontWeight: 600 }}>
            Conhecer minha trajetória
          </Link>
        </div>
      </div>

      <style>{`
        .who { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
        @media (min-width: 900px) {
          .who { grid-template-columns: 0.8fr 1.2fr; gap: 4rem; }
        }
      `}</style>
    </section>
  )
}
