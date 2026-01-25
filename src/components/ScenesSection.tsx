"use client";

import { useEffect, useRef, useState } from "react";

const SCENES = [
  {
    number: "01",
    title: "Análisis de\nEstructura",
    description: "La mayoría de los sitios web fallan porque intentan decir demasiado. Nosotros encontramos el núcleo de tu mensaje.",
    image: "/hero/opcion 6/uno.png",
  },
  {
    number: "02",
    title: "Planos de\nConversión",
    description: "Wireframing lógico. Diseñamos la ruta crítica que seguirá el ojo (y el mouse) de tu usuario desde que entra hasta que paga. Cero decoración, 100% función.",
    image: "/hero/opcion 6/dos.png",
  },
  {
    number: "03",
    title: "Compilación\nLimpia",
    description: "Desarrollo modular. Escribimos código semántico, ligero y documentado. Tu sitio no solo funciona hoy; está preparado para escalar mañana sin romperse.",
    image: "/hero/opcion 6/tres.png",
  },
  {
    number: "04",
    title: "Stress Test &\nDeploy",
    description: "No cruzamos los dedos al lanzar. Sometemos el sitio a pruebas de carga agresivas y auditorías de seguridad antes de abrir el servidor al público real.",
    image: "/hero/opcion 6/cuatro.png",
  },
];

function SceneSlide({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (slideRef.current) {
      observer.observe(slideRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={slideRef}
      className="h-screen w-full flex-shrink-0 snap-start snap-always relative overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{ 
          backgroundImage: `url('${scene.image}')`,
          transform: isVisible ? "scale(1)" : "scale(1.05)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-16">
        <div className="max-w-xl">
          {/* Title with number */}
          <div className={`flex items-start gap-4 ${isEven ? "" : "flex-row-reverse"}`}>
            {isEven ? (
              <>
                <h2 
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] italic transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {scene.title}
                </h2>
                <div className="flex flex-col items-start">
                  <span 
                    className={`text-6xl sm:text-7xl lg:text-8xl font-light text-white/80 italic leading-none transition-all duration-700 ease-out delay-100 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    {scene.number}
                  </span>
                  <div 
                    className={`h-[2px] bg-white/60 mt-2 transition-all duration-700 ease-out delay-200 ${
                      isVisible ? "w-16 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-start">
                  <span 
                    className={`text-6xl sm:text-7xl lg:text-8xl font-light text-white/80 italic leading-none transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    {scene.number}
                  </span>
                  <div 
                    className={`h-[2px] bg-white/60 mt-2 transition-all duration-700 ease-out delay-200 ${
                      isVisible ? "w-16 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
                <h2 
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] italic transition-all duration-700 ease-out delay-100 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {scene.title}
                </h2>
              </>
            )}
          </div>
          
          {/* Description */}
          <p 
            className={`mt-8 text-base sm:text-lg text-white/90 leading-relaxed font-medium max-w-sm italic transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {scene.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ScenesSection() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {SCENES.map((scene, index) => (
        <SceneSlide key={scene.number} scene={scene} index={index} />
      ))}
    </div>
  );
}
