import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Link } from 'react-router-dom'
import { galleryImages } from '../../../data/galleryImages'

/**
 * Faixa contínua de mockups de celular com os mesmos prints da galeria —
 * usada no mobile, com reduced-motion ou quando o WebGL não está disponível.
 */
export default function GalleryFallback() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({ speed: 0.6, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  return (
    <div className="gallery-fallback" aria-hidden="true">
      <div className="gallery-fallback-viewport" ref={emblaRef}>
        <div className="gallery-fallback-track">
          {galleryImages.map((img, i) => (
            <Link
              to={`/projetos/${img.slug}`}
              key={`${img.slug}-${i}`}
              className="gallery-fallback-slide"
              tabIndex={-1}
            >
              <img src={img.src} alt="" loading="lazy" decoding="async" />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-fallback { position: absolute; inset: 0; display: flex; align-items: center; overflow: hidden; }
        .gallery-fallback-viewport { width: 100%; overflow: hidden; }
        .gallery-fallback-track { display: flex; gap: 1rem; }
        .gallery-fallback-slide {
          flex: 0 0 auto;
          width: clamp(120px, 28vw, 170px);
          aspect-ratio: 9 / 18;
          border-radius: 22px;
          overflow: hidden;
          transform: rotate(-4deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          opacity: 0.9;
        }
        .gallery-fallback-slide:nth-child(even) { transform: rotate(3deg) translateY(10px); }
        .gallery-fallback-slide img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
      `}</style>
    </div>
  )
}
