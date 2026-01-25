"use client";

import { useEffect, useRef, useState } from "react";
import { AuditModal } from "./AuditModal";

export function ExcelenciaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-24 px-6 lg:px-8 bg-[#FAF9F6]"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Top line */}
          <div 
            className={`h-[2px] bg-[#1d1d1f] mb-8 transition-all duration-700 ease-out ${
              isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
          />
          
          {/* Image */}
          <div 
            className={`w-full max-w-2xl transition-all duration-700 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <img 
              src="/hero/opcion 6/cero.jpeg" 
              alt="Arquitectura"
              className="w-full h-auto"
            />
          </div>
          
          {/* Title */}
          <h2 
            className={`mt-12 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1d1d1f] text-center italic transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            La excelencia no es un accidente. Es una arquitectura.
          </h2>
          
          {/* Subtitle */}
          <p 
            className={`mt-4 text-base sm:text-lg text-[#86868b] text-center transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Estamos listos para diseñar el próximo
            <br />
            capítulo de tu negocio.
          </p>
          
          {/* CTA Button */}
          <div 
            className={`mt-8 transition-all duration-700 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1d1d1f] text-white font-semibold hover:bg-[#1d1d1f]/90 rounded-full px-8 py-4 text-base transition-colors"
            >
              Iniciar Transformación
            </button>
          </div>
        </div>
      </section>

      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
