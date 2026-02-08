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
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          {/* Header - compact */}
          <div className="mb-16">
            <p className="text-sm font-mono text-white/40 tracking-widest uppercase">
              Blueprints disponibles
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Inversión
            </h2>
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
                    <span className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
                      Más elegido
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "relative h-full border transition-all duration-300 p-8",
                    plan.popular
                      ? "border-white/30 bg-white/5 shadow-lg shadow-white/5"
                      : hoveredPlan === plan.id
                      ? "border-white/30 bg-white/5 shadow-lg shadow-white/5"
                      : "border-white/10 bg-transparent"
                  )}
                >
                  {/* Corner brackets on hover or popular */}
                  {(hoveredPlan === plan.id || plan.popular) && (
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

                  {/* Tag number */}
                  <span className="text-sm font-mono text-white/40">{plan.tag}</span>

                  {/* Plan name */}
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 text-sm text-white/50 italic">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="text-2xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>

                  {/* Time */}
                  <p className="mt-1 text-xs font-mono text-white/40">
                    Entrega: {plan.time}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-white/10" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="text-white/40 mt-0.5">—</span>
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
                        ? "bg-white text-black hover:bg-white/90"
                        : "border border-white/30 text-white hover:bg-white/10"
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="mt-12 text-center text-sm text-white/40">
            ¿Necesitas algo diferente?{" "}
            <button
              onClick={handleCustomClick}
              className="text-white font-medium hover:underline"
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
