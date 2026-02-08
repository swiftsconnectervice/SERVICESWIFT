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
        className="relative py-32 lg:py-40 px-6 lg:px-8 bg-[#0a0a0a]"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Top line */}
          <div
            className={`h-[1px] bg-white/30 mb-12 transition-all duration-700 ease-out ${
              isVisible ? "w-16 opacity-100" : "w-0 opacity-0"
            }`}
          />

          {/* Title */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center italic leading-tight transition-all duration-700 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            La excelencia no es un accidente. Es una arquitectura.
          </h2>

          {/* Subtitle */}
          <p
            className={`mt-6 text-base sm:text-lg text-white/50 text-center leading-relaxed transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Estamos listos para diseñar el próximo
            <br />
            capítulo de tu negocio.
          </p>

          {/* CTA Button */}
          <div
            className={`mt-10 transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/10 text-white font-semibold border border-white/30 backdrop-blur-md rounded-full px-8 py-4 text-base transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105"
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
