import { lazy, Suspense, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import WhatsAppFloat from './components/WhatsAppFloat'
import ConsentBanner from './components/ConsentBanner'
import { useLenis } from './hooks/useLenis'
import { resetScroll } from './lib/motion'

// Cada página vira o próprio chunk, carregado só quando a rota é acessada —
// mantém o JS inicial da home dentro do orçamento de performance do v3.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./pages/Services'))
const Service = lazy(() => import('./pages/Service'))
const RaioX = lazy(() => import('./pages/RaioX'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Redireciona os links antigos /projects/:slug já divulgados. */
function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/projetos/${slug ?? ''}`} replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    resetScroll()
  }, [pathname])

  return null
}

function AppInner() {
  const { pathname } = useLocation()
  useLenis()

  return (
    <>
      {/* Cursor customizado e partículas ficam somente na página /sobre */}
      {pathname === '/sobre' && <Cursor />}

      <Navbar />
      <ScrollToTop />

      {/* Reserva espaço para o botão flutuante do WhatsApp não cobrir conteúdo. */}
      <div style={{ paddingTop: 72 }} className="reserve-fab-space">
        <PageTransition>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/projetos/:slug" element={<ProjectDetail />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/servicos/:slug" element={<Service />} />
              <Route path="/orcamento" element={<Navigate to="/servicos" replace />} />
              <Route path="/raio-x" element={<RaioX />} />

              <Route path="/projects" element={<Navigate to="/projetos" replace />} />
              <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </div>

      <WhatsAppFloat />
      <ConsentBanner />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
