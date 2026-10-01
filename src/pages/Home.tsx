import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import JourneyInvite from '../components/home/journey/JourneyInvite'
import JourneyPain from '../components/home/journey/JourneyPain'
import LossCalculator from '../components/home/journey/LossCalculator'
import JourneyTurn from '../components/home/journey/JourneyTurn'
import FortalezaBand from '../components/home/journey/FortalezaBand'
import TrustBar from '../components/home/TrustBar'
import ServicesList from '../components/home/ServicesList'
import CaseShowcase from '../components/home/CaseShowcase'
import Testimonials from '../components/home/Testimonials'
import ProcessSteps from '../components/home/ProcessSteps'
import WhoSection from '../components/home/WhoSection'
import FaqAccordion from '../components/home/FaqAccordion'
import FinalCta from '../components/home/FinalCta'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

export default function Home() {
  const location = useLocation()

  useSEO({
    title: 'Dourado Studio — Criação de sites e landing pages em Fortaleza',
    description:
      'Sites, landing pages e sistemas sob medida para empresas, cursos e eventos. Estúdio em Fortaleza com atendimento para todo o Brasil. Fale direto pelo WhatsApp.',
    path: '/',
  })

  // Âncora vinda de outra rota (ex.: "Serviços" no menu de /sobre)
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    const id = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
    return () => window.clearTimeout(id)
  }, [location.state])

  return (
    <>
      <main>
        <JourneyInvite />
        <TrustBar />
        <JourneyPain />
        <LossCalculator />
        <JourneyTurn />
        <ServicesList />
        <CaseShowcase />
        <Testimonials />
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
