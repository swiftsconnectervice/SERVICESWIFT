"use client";

import { useEffect, useRef, useState } from "react";

const SCENES = [
  {
    number: "01",
    title: "Análisis de Estructura",
    description:
      "La mayoría de los sitios web fallan porque intentan decir demasiado. Nosotros encontramos el núcleo de tu mensaje.",
  },
  {
    number: "02",
    title: "Planos de Conversión",
    description:
      "Wireframing lógico. Diseñamos la ruta crítica que seguirá el ojo (y el mouse) de tu usuario desde que entra hasta que paga. Cero decoración, 100% función.",
  },
  {
    number: "03",
    title: "Compilación Limpia",
    description:
      "Desarrollo modular. Escribimos código semántico, ligero y documentado. Tu sitio no solo funciona hoy; está preparado para escalar mañana sin romperse.",
  },
  {
    number: "04",
    title: "Stress Test & Deploy",
    description:
      "No cruzamos los dedos al lanzar. Sometemos el sitio a pruebas de carga agresivas y auditorías de seguridad antes de abrir el servidor al público real.",
  },
];

function SceneCard({
  scene,
  index,
}: {
  scene: (typeof SCENES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative border-b border-white/10 py-16 lg:py-20 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
        {/* Number */}
        <span className="text-6xl lg:text-8xl font-extralight text-white/20 font-mono leading-none shrink-0 group-hover:text-white/40 transition-colors duration-500">
          {scene.number}
        </span>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            {scene.title}
          </h3>
          <p className="mt-4 text-base lg:text-lg text-white/60 leading-relaxed max-w-xl">
            {scene.description}
          </p>
        </div>

        {/* Decorative line */}
        <div className="hidden lg:flex items-center shrink-0">
          <div
            className={`h-[1px] bg-white/20 transition-all duration-700 ease-out ${
              isVisible ? "w-24" : "w-0"
            }`}
            style={{ transitionDelay: `${index * 100 + 300}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

export function ScenesSection() {
  return (
    <section className="bg-[#0a0a0a] py-20 lg:py-32">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
        <p className="text-sm font-mono text-white/40 tracking-widest uppercase">
          Proceso
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Cómo trabajamos
        </h2>
      </div>

      {/* Steps */}
      <div className="border-t border-white/10">
        {SCENES.map((scene, index) => (
          <SceneCard key={scene.number} scene={scene} index={index} />
        ))}
      </div>
    </section>
  );
}
