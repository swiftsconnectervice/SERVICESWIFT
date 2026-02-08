"use client";

import { useState } from "react";
import { AuditModal } from "./AuditModal";

const VIDEO_SRC =
  "https://res.cloudinary.com/dcpttqcwt/video/upload/v1770573220/V%C3%ADdeo_sin_t%C3%ADtulo_Hecho_con_Clipchamp_2_pobbfg.mp4";

export function HeroStatic() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative h-svh w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_SRC}
        />

        {/* Dark overlay + slight blur to mask low resolution */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[1]" />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] text-center italic drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Claridad sobre ruido.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed max-w-lg text-center">
            Eliminamos lo innecesario para que lo que realmente importa,{" "}
            <span className="text-white font-semibold">tus ventas</span>, sea lo único que destaque.
          </p>

          <div className="mt-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/10 text-white font-semibold border border-white/30 backdrop-blur-md px-8 py-4 text-base tracking-wide transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              Agenda una auditoría
            </button>
          </div>
        </div>
      </div>

      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
