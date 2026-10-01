/** Faixa larga do horizonte de Fortaleza, logo antes de "Quem faz". */
export default function FortalezaBand() {
  return (
    <div className="fortaleza-band">
      <img
        src="/images/fortaleza/skyline-beira-mar.webp"
        alt="Vista aérea do horizonte de Fortaleza à beira-mar"
        loading="lazy"
        decoding="async"
      />
      <div className="fortaleza-overlay" />
      <p className="display fortaleza-caption">Feito em Fortaleza, para todo o Brasil.</p>

      <style>{`
        .fortaleza-band { position: relative; width: 100%; aspect-ratio: 21 / 9; max-height: 480px; overflow: hidden; }
        .fortaleza-band img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .fortaleza-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14,44,63,0.6) 0%, rgba(14,44,63,0.1) 50%, transparent 75%);
        }
        .fortaleza-caption {
          position: absolute;
          top: 2.25rem;
          left: 0;
          right: 0;
          text-align: center;
          color: #fff;
          font-size: clamp(1.25rem, 3vw, 2.1rem);
          padding-inline: var(--pad);
        }
        @media (max-width: 640px) {
          .fortaleza-band { aspect-ratio: 4 / 3; max-height: 360px; }
        }
      `}</style>
    </div>
  )
}
