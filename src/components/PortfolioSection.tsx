"use client";

import InfiniteGallery from "./InfiniteGallery";

const PORTFOLIO_IMAGES = [
  { src: "/portfolio/cafeteria.png", alt: "Sitio para cafetería" },
  { src: "/portfolio/abogado.png", alt: "Sitio para abogado" },
  { src: "/portfolio/constructora.png", alt: "Sitio para constructora" },
  { src: "/portfolio/dentista.png", alt: "Sitio para dentista" },
  { src: "/portfolio/reposteria.png", alt: "Sitio para repostería" },
  { src: "/portfolio/parallax.png", alt: "Sitio web parallax" },
];

export function PortfolioSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-12">
        <span className="text-[11px] font-mono text-white/40 tracking-[3px] uppercase">
          Portafolio
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Esto es lo que construimos.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/50 max-w-xl mx-auto">
          Cada proyecto es código a medida. Sin plantillas. Sin WordPress.
          Sistemas diseñados para convertir visitantes en clientes.
        </p>
      </div>

      <InfiniteGallery
        images={PORTFOLIO_IMAGES}
        className="h-[600px] w-full"
      />
    </section>
  );
}
