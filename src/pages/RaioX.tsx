import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

/**
 * Página temporária de /raio-x. A ferramenta completa (análise via PageSpeed
 * Insights) é a próxima construção — por enquanto só reserva a rota que já
 * está linkada na navegação.
 */
export default function RaioX() {
  useSEO({
    title: 'Raio-X grátis do seu site — em breve | Dourado Studio',
    description: 'Uma ferramenta para descobrir em segundos se o seu site está afastando clientes. Em breve.',
    path: '/raio-x',
  })

  return (
    <>
      <main style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container-x" style={{ paddingBlock: '4rem', maxWidth: '40rem' }}>
          <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginBottom: '1rem' }}>
            Em breve
          </p>
          <h1 className="fs-h2" style={{ marginBottom: '1.25rem' }}>
            O Raio-X do seu site está a caminho.
          </h1>
          <p className="fs-lead measure" style={{ color: 'var(--sea-soft)', marginBottom: '2rem' }}>
            Em poucos segundos você vai poder descobrir se o seu site está lento no celular e o
            que está afastando seus clientes. Enquanto isso, monte uma estimativa do seu projeto.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link className="btn btn-primary" to="/orcamento">
              Simular orçamento
            </Link>
            <Link className="btn btn-secondary" to="/">
              Voltar para a home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
