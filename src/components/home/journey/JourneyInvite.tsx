import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../../../lib/motion'
import { whatsappLink } from '../../../config/contact'
import WhatsAppIcon from '../../WhatsAppIcon'

const HeroCylinder = lazy(() => import('../HeroCylinder'))

const MESSAGE =
  'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um projeto para o meu negócio.'

const DESKTOP = '(min-width: 1024px)'

/** Capítulo 1 — o convite. No computador, o cilindro de projetos ao lado; no celular e no tablet, só o texto. */
export default function JourneyInvite() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  // Sem o cilindro montado, celular e tablet não baixam o código nem as imagens dele.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP).matches)

  useEffect(() => {
    const query = window.matchMedia(DESKTOP)
    const onChange = () => setIsDesktop(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !titleRef.current) return

      const split = new SplitText(titleRef.current, { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
      })

      return () => split.revert()
    },
    { scope: titleRef },
  )

  return (
    <section className="invite" style={{ background: 'var(--white)' }}>
      <div className="container-x invite-grid">
        <div className="invite-copy">
          <h1 ref={titleRef} className="display fs-h2" style={{ marginBottom: '1.75rem' }}>
            Seu negócio já é bom. Falta ser encontrado.
          </h1>
          <p className="fs-lead measure" style={{ color: 'var(--sea-soft)', marginBottom: '2.25rem' }}>
            A Dourado Studio cria sites, landing pages e sistemas que trazem clientes pelo Google e
            pelo WhatsApp. Feito em Fortaleza, por quem você conhece pelo nome.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <a className="btn btn-primary" href={whatsappLink(MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} color="var(--sea)" />
              Conversar no WhatsApp
            </a>
            <Link className="btn btn-secondary" to="/servicos">
              Ver os serviços
            </Link>
          </div>
        </div>

        {isDesktop && (
          <div className="invite-gallery">
            <Suspense fallback={null}>
              <HeroCylinder />
            </Suspense>
          </div>
        )}
      </div>

      <style>{`
        .invite { padding-block: 3.5rem 2rem; overflow: hidden; }
        .invite-copy { position: relative; z-index: 1; max-width: 42rem; }
        @media (min-width: 1024px) {
          .invite { padding-block: 4rem 3rem; }
          .invite-grid { display: flex; align-items: center; gap: 2rem; min-height: 72vh; }
          .invite-copy { flex: 0 0 40%; min-width: 0; }
          .invite-gallery {
            position: relative;
            flex: 1;
            min-width: 0;
            min-height: calc(clamp(280px, 26vw, 420px) * 4 / 3 + 3rem);
          }
        }
      `}</style>
    </section>
  )
}
