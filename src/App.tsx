import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Orcamento from './pages/Orcamento'
import RaioX from './pages/RaioX'
import { useLenis } from './hooks/useLenis'

/** Redireciona os links antigos /projects/:slug já divulgados. */
function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/projetos/${slug ?? ''}`} replace />
}

function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if ((state as { scrollTo?: string } | null)?.scrollTo) return
    window.scrollTo(0, 0)
  }, [pathname, state])

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

      {/* /orcamento cuida da própria barra fixa no rodapé (mobile); as demais
          páginas reservam espaço para o botão flutuante do WhatsApp não cobrir conteúdo. */}
      <div
        style={{ paddingTop: 72 }}
        className={pathname.startsWith('/orcamento') ? undefined : 'reserve-fab-space'}
      >
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:slug" element={<ProjectDetail />} />
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/raio-x" element={<RaioX />} />

            <Route path="/projects" element={<Navigate to="/projetos" replace />} />
            <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </div>

      <WhatsAppFloat />
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
