import JourneyInvite from '../components/home/journey/JourneyInvite'
import JourneyPain from '../components/home/journey/JourneyPain'
import JourneyTurn from '../components/home/journey/JourneyTurn'
import FortalezaBand from '../components/home/journey/FortalezaBand'
import TrustBar from '../components/home/TrustBar'
import ProofBlocks from '../components/home/ProofBlocks'
import CaseDoors from '../components/home/CaseDoors'
import CaseShowcase from '../components/home/CaseShowcase'
import Testimonials from '../components/home/Testimonials'
import ProcessSteps from '../components/home/ProcessSteps'
import WhoSection from '../components/home/WhoSection'
import FaqAccordion from '../components/home/FaqAccordion'
import FinalCta from '../components/home/FinalCta'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

export default function Home() {
  useSEO({
    title: 'Dourado Studio — Criação de sites e landing pages em Fortaleza',
    description:
      'Sites, landing pages e sistemas sob medida para empresas, cursos e eventos. Estúdio em Fortaleza com atendimento para todo o Brasil. Fale direto pelo WhatsApp.',
    path: '/',
  })

  return (
    <>
      <main>
        <JourneyInvite />
        <TrustBar />
        <JourneyPain />
        <JourneyTurn />
        <ProofBlocks />
        <CaseShowcase />
        <Testimonials />
        <CaseDoors />
        <ProcessSteps />
        <FortalezaBand />
        <WhoSection />
        <FaqAccordion />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
