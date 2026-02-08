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
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        {/* Header - compact */}
        <div className="mb-12">
          <p className="text-sm font-mono text-white/40 tracking-widest uppercase">
            Technical Specs
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Lo que construimos
          </h2>
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
                  "relative overflow-hidden border transition-all duration-300 ease-in-out",
                  hoveredItem === service.id
                    ? "h-44 border-white/30 shadow-lg shadow-white/5 bg-white/5"
                    : "h-20 border-white/10 hover:border-white/20 bg-transparent"
                )}
              >
                {/* Corner brackets */}
                {hoveredItem === service.id && (
                  <>
                    <div className="absolute top-3 left-3 w-6 h-6">
                      <div className="absolute top-0 left-0 w-4 h-0.5 bg-white/60" />
                      <div className="absolute top-0 left-0 w-0.5 h-4 bg-white/60" />
                    </div>
                    <div className="absolute bottom-3 right-3 w-6 h-6">
                      <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white/60" />
                      <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white/60" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex flex-col justify-start h-full px-6 md:px-8 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-sm transition-colors duration-300",
                          hoveredItem === service.id
                            ? "text-white/60"
                            : "text-white/40"
                        )}
                      >
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body text - visible on hover */}
                  <p
                    className={cn(
                      "mt-3 text-sm text-white/50 leading-relaxed transition-all duration-300 pr-12",
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
