import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../../../lib/motion'
import { whatsappLink } from '../../../config/contact'
import WhatsAppIcon from '../../WhatsAppIcon'
import HeroGallery from '../gallery/HeroGallery'

const MESSAGE =
  'Olá! Vim pelo site da Dourado Studio e quero conversar sobre um projeto para o meu negócio.'

/** Capítulo 1 — o convite. O momento memorável é a galeria curva ao lado. */
export default function JourneyInvite() {
  const titleRef = useRef<HTMLHeadingElement>(null)

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
            <Link className="btn btn-primary" to="/orcamento">
              Simular orçamento
            </Link>
            <a className="btn btn-secondary" href={whatsappLink(MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} color="var(--sea)" />
              Conversar no WhatsApp
            </a>
          </div>
        </div>

        <div className="invite-gallery" aria-hidden={false}>
          <HeroGallery />
        </div>
      </div>

      <style>{`
        .invite { padding-block: 3.5rem 2rem; overflow: hidden; }
        .invite-grid { display: flex; flex-direction: column; gap: 2.5rem; }
        .invite-copy { max-width: 42rem; }
        .invite-gallery { position: relative; height: 320px; border-radius: var(--r-media); overflow: hidden; background: var(--sand); }
        @media (min-width: 1024px) {
          .invite { padding-block: 5rem 3rem; }
          .invite-grid { flex-direction: row; align-items: center; gap: 3rem; min-height: 60vh; }
          .invite-copy { flex: 0 0 40%; min-width: 0; }
          .invite-gallery { flex: 1; height: 50vh; min-height: 420px; background: transparent; overflow: visible; }
        }
      `}</style>
    </section>
  )
}
