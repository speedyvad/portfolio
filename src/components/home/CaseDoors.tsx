import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { services, doorOrder, formatPrice, type Service } from '../../data/services'

const doors = doorOrder
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is Service => Boolean(s))

/**
 * Capítulo 6 — "Qual é o seu caso?": quatro portas, uma por serviço, num carrossel arrastável.
 * Cada porta leva para /servicos/:slug.
 */
export default function CaseDoors() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' })
  const [progress, setProgress] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    if (!emblaApi) return
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())))
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const frame = requestAnimationFrame(update)
    emblaApi.on('scroll', update).on('reInit', update).on('select', update)
    return () => {
      cancelAnimationFrame(frame)
      emblaApi.off('scroll', update).off('reInit', update).off('select', update)
    }
  }, [emblaApi, update])

  return (
    <section id="servicos" className="doors section-y" aria-labelledby="doors-title">
      <div className="container-x">
        <div className="doors-head">
          <div>
            <h2 id="doors-title" className="fs-h2" style={{ color: 'var(--on-sea)' }}>
              Qual é o seu caso?
            </h2>
            <p className="fs-lead" style={{ color: 'var(--on-sea-soft)', marginTop: '1rem', maxWidth: '30rem' }}>
              Escolha a frase que mais parece com você.
            </p>
          </div>
          <div className="doors-nav">
            <button
              type="button"
              className="doors-arrow"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Ver anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              className="doors-arrow"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Ver próximo"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="doors-viewport" ref={emblaRef}>
          <ul className="doors-track" aria-label="Tipos de projeto">
            {doors.map((s) => (
              <li key={s.slug} className="doors-slide">
                <Link to={`/servicos/${s.slug}`} className="door">
                  <img src={s.heroImage} alt="" loading="lazy" decoding="async" className="door-img" />
                  <span className="door-shade" aria-hidden="true" />
                  <span className="door-body">
                    <span className="door-quote display">“{s.door}”</span>
                    <span className="door-meta">
                      <span className="label-ui">{s.name}</span>
                      <span className="fs-small" style={{ color: 'rgba(255,255,255,0.78)' }}>
                        {formatPrice(s.priceFrom)}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="doors-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.25 + progress * 0.75})` }} />
        </div>
      </div>

      <style>{`
        .doors { background: var(--sea); overflow: hidden; }
        .doors-head { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-bottom: clamp(2rem, 5vw, 3.5rem); }
        .doors-nav { display: none; gap: 0.75rem; }
        @media (min-width: 768px) { .doors-nav { display: flex; } }
        .doors-arrow { width: 52px; height: 52px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.4); color: #fff; display: grid; place-items: center; cursor: pointer; transition: background-color 0.2s ease, opacity 0.2s ease; }
        .doors-arrow:hover:not(:disabled) { background: rgba(255,255,255,0.12); }
        .doors-arrow:disabled { opacity: 0.35; cursor: default; }

        .doors-viewport { overflow: visible; }
        .doors-track { list-style: none; display: flex; gap: 1rem; touch-action: pan-y pinch-zoom; }
        .doors-slide { flex: 0 0 82%; min-width: 0; }
        @media (min-width: 640px) { .doors-slide { flex-basis: 48%; } }
        @media (min-width: 1024px) { .doors-slide { flex-basis: 38%; } .doors-track { gap: 1.5rem; } }

        .door { position: relative; display: block; aspect-ratio: 4 / 5; border-radius: var(--r-media); overflow: hidden; background: #13374d; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .door:hover, .door:focus-visible { transform: translateY(-4px); }
        .door-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
        .door:hover .door-img { transform: scale(1.05); }
        .door-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,26,38,0.92) 0%, rgba(8,26,38,0.55) 45%, rgba(8,26,38,0.05) 75%); }
        .door-body { position: absolute; inset: auto 0 0 0; padding: clamp(1.25rem, 3vw, 2rem); display: flex; flex-direction: column; gap: 1.5rem; color: #fff; }
        .door-quote { font-size: clamp(1.6rem, 3vw, 2.25rem); line-height: 1.05; color: #fff; }
        .door-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.25); }

        .doors-progress { margin-top: 2rem; height: 2px; background: rgba(255,255,255,0.18); border-radius: 2px; overflow: hidden; }
        .doors-progress span { display: block; height: 100%; background: var(--gold); transform-origin: left; transition: transform 0.15s linear; }
        @media (prefers-reduced-motion: reduce) {
          .door, .door-img { transition: none; }
          .door:hover .door-img { transform: none; }
        }
      `}</style>
    </section>
  )
}
