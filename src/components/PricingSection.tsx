"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AuditModal } from "./AuditModal";

interface PricingPlan {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  price: string;
  time: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    tag: "01",
    name: "Presencia Digital",
    subtitle: "Tu tarjeta de presentación online.",
    price: "Desde $3,500 MXN",
    time: "3-5 días",
    features: [
      "Landing page optimizada",
      "Diseño responsive",
      "WhatsApp flotante",
      "Formulario de contacto",
      "Links a redes sociales",
    ],
    cta: "Empezar",
  },
  {
    id: "authority",
    tag: "02",
    name: "Sitio Corporativo",
    subtitle: "Genera confianza. Cierra ventas.",
    price: "Desde $7,000 MXN",
    time: "7-10 días",
    features: [
      "Hasta 5 secciones",
      "SEO local optimizado",
      "Velocidad < 2s",
      "Google Maps integrado",
      "Certificado SSL",
    ],
    cta: "Construir",
    popular: true,
  },
  {
    id: "ecommerce",
    tag: "03",
    name: "Negocio Total",
    subtitle: "Vende mientras duermes.",
    price: "Desde $12,000 MXN",
    time: "15-20 días",
    features: [
      "Tienda online completa",
      "Pasarela de pagos",
      "Panel autoadministrable",
      "Hasta 20 productos",
      "Chatbot básico",
    ],
    cta: "Escalar",
  },
];

export function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");

  const handlePlanClick = (planName: string) => {
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  const handleCustomClick = () => {
    setSelectedPlanName("Personalizado");
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1d1d1f] mb-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1d1d1f] mb-2 font-[family-name:var(--font-space-grotesk)]">
              Inversión
            </h2>
            <p className="text-2xl lg:text-3xl text-[#86868b] font-light italic">
              Blueprints disponibles
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative"
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[#1d1d1f] text-white text-xs font-medium px-3 py-1 rounded-full">
                      Más elegido
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "relative h-full border bg-white transition-all duration-300 p-8",
                    plan.popular
                      ? "border-[#1d1d1f] shadow-lg shadow-[#1d1d1f]/10"
                      : hoveredPlan === plan.id
                      ? "border-[#1d1d1f] shadow-lg shadow-[#1d1d1f]/10"
                      : "border-[#E8E6E1]"
                  )}
                >
                  {/* Corner brackets on hover or popular */}
                  {(hoveredPlan === plan.id || plan.popular) && (
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

                  {/* Tag number */}
                  <span className="text-sm font-mono text-[#86868b]">{plan.tag}</span>

                  {/* Plan name */}
                  <h3 className="mt-2 text-xl font-semibold text-[#1d1d1f] font-[family-name:var(--font-space-grotesk)]">
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 text-sm text-[#86868b] italic">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="text-2xl font-bold text-[#1d1d1f] font-[family-name:var(--font-space-grotesk)]">
                      {plan.price}
                    </span>
                  </div>

                  {/* Time */}
                  <p className="mt-1 text-xs font-mono text-[#86868b]">
                    Entrega: {plan.time}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-[#E8E6E1]" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#52525b]">
                        <span className="text-[#1d1d1f] mt-0.5">—</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handlePlanClick(plan.name)}
                    className={cn(
                      "mt-8 w-full py-3 rounded-full font-medium text-sm transition-all duration-300",
                      plan.popular
                        ? "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90"
                        : "border border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white"
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="mt-12 text-center text-sm text-[#86868b]">
            ¿Necesitas algo diferente?{" "}
            <button 
              onClick={handleCustomClick}
              className="text-[#1d1d1f] font-medium hover:underline"
            >
              Hablemos de tu proyecto
            </button>
          </p>
        </div>
      </section>

      <AuditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlanName}
      />
    </>
  );
}
