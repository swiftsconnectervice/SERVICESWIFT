"use client";

import { useState } from "react";
import { AuditModal } from "./AuditModal";

export function HeroStatic() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero/opcion 6/cero.jpeg')" }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-8">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] text-center italic">
            Claridad sobre ruido.
          </h1>
          
          {/* Subtitle */}
          <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium max-w-md text-center italic">
            Eliminamos lo innecesario para que lo que realmente importa —tus ventas— sea lo único que destaque.
          </p>
          
          {/* CTA Button */}
          <div className="mt-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 px-8 py-4 text-base font-medium transition-all hover:scale-105"
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
