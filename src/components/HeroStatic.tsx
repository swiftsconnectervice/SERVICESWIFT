"use client";

import { useState } from "react";
import { AuditModal } from "./AuditModal";
import { ShaderAnimation } from "./ShaderAnimation";

export function HeroStatic() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative h-svh w-full overflow-hidden">
        {/* Background Shader */}
        <ShaderAnimation />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-8 px-5 py-2 border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[11px] font-mono text-white/40 tracking-[3px] uppercase">
              Swift Service — Tu Equipo Digital
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] text-center max-w-4xl">
            No hacemos sitios web.
            <br />
            Hacemos infraestructura
            <br />
            <span className="italic">que vende.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl text-center">
            Tecnología de agencia premium a precio de PYME.
            <br />
            Entrega en días, no meses.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/10 text-white font-semibold border border-white/30 backdrop-blur-md px-8 py-4 text-base tracking-wide transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105"
            >
              Agendar consultoría gratuita
            </button>
            <a
              href="#metodo"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Ver cómo funciona ↓
            </a>
          </div>

          {/* Social proof bar */}
          <div className="mt-16 flex items-center gap-6 text-[11px] font-mono text-white/30 tracking-wider">
            <span>Sin plantillas</span>
            <span className="text-white/15">·</span>
            <span>Automatización incluida</span>
            <span className="text-white/15">·</span>
            <span>Soporte continuo</span>
          </div>
        </div>
      </div>

      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}