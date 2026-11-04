import { Link, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import { notFoundCopy } from '../data/notFound'
import { notFoundSeo } from '../data/seo'
import { useSEO } from '../hooks/useSEO'

export default function NotFound() {
  const { pathname } = useLocation()
  useSEO({ ...notFoundSeo, path: pathname })

  return (
    <>
      <main style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container-x" style={{ paddingBlock: '4rem', maxWidth: '40rem' }}>
          <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginBottom: '1rem' }}>
            {notFoundCopy.label}
          </p>
          <h1 className="fs-h2" style={{ marginBottom: '1.25rem' }}>
            {notFoundCopy.title}
          </h1>
          <p className="fs-lead measure" style={{ color: 'var(--sea-soft)', marginBottom: '2rem' }}>
            {notFoundCopy.lead}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link className="btn btn-primary" to="/servicos">
              {notFoundCopy.primary}
            </Link>
            <Link className="btn btn-secondary" to="/">
              {notFoundCopy.secondary}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
