"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

const services: Service[] = [
  {
    id: "1",
    title: "Arquitectura Full-Stack",
    subtitle: "Sin plantillas. Solo código nativo.",
    body: "Diseñamos sistemas a medida alineados con tu lógica de negocio. Escalabilidad nativa desde la primera línea de código para proyectos que planean crecer.",
  },
  {
    id: "2",
    title: "Rendimiento < 1s",
    subtitle: "Optimización del Critical Rendering Path.",
    body: "Tu web no carga; aparece. Eliminamos el bloatware y optimizamos la entrega de assets para que Google te premie y el usuario no se canse de esperar.",
  },
  {
    id: "3",
    title: "UX de Conversión",
    subtitle: "Psicología visual aplicada a ventas.",
    body: "No diseñamos para ganar premios de arte, diseñamos para reducir la fricción de compra. Jerarquía visual estricta que guía el ojo hacia el botón de acción.",
  },
  {
    id: "4",
    title: "Refactoring de Código",
    subtitle: "Migración de legado a moderno.",
    body: "¿Tu web actual es un desastre? Migramos código antiguo a tecnologías modernas (React/Next.js) sin perder tu posicionamiento SEO histórico.",
  },
];

export function ServicesList() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1d1d1f] mb-6">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1d1d1f] mb-2 font-[family-name:var(--font-space-grotesk)]">
            Lo que construimos
          </h2>
          <p className="text-2xl lg:text-3xl text-[#86868b] font-light italic">
            Technical Specs
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredItem(service.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-white transition-all duration-300 ease-in-out",
                  hoveredItem === service.id
                    ? "h-44 border-[#1d1d1f] shadow-lg shadow-[#1d1d1f]/10 bg-[#FAF9F6]"
                    : "h-20 border-[#E8E6E1] hover:border-[#1d1d1f]/30"
                )}
              >
                {/* Corner brackets */}
                {hoveredItem === service.id && (
                  <>
                    <div className="absolute top-3 left-3 w-6 h-6">
                      <div className="absolute top-0 left-0 w-4 h-0.5 bg-[#1d1d1f]" />
                      <div className="absolute top-0 left-0 w-0.5 h-4 bg-[#1d1d1f]" />
                    </div>
                    <div className="absolute bottom-3 right-3 w-6 h-6">
                      <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-[#1d1d1f]" />
                      <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-[#1d1d1f]" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex flex-col justify-start h-full px-6 md:px-8 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "text-xl font-semibold transition-colors duration-300 font-[family-name:var(--font-space-grotesk)]",
                          hoveredItem === service.id ? "text-[#1d1d1f]" : "text-[#1d1d1f]"
                        )}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-sm transition-colors duration-300",
                          hoveredItem === service.id ? "text-[#52525b]" : "text-[#86868b]"
                        )}
                      >
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body text - visible on hover */}
                  <p
                    className={cn(
                      "mt-3 text-sm text-[#52525b] leading-relaxed transition-all duration-300 pr-12",
                      hoveredItem === service.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {service.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
