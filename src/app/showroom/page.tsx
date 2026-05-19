"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";

/* ─── Data ─── */
interface Demo {
  name: string;
  slug: string;
  sector: string;
  label: string;
  description: string;
  isNew?: boolean;
  preview?: string;
}

const DEMOS: Demo[] = [
  // Legal
  { name: "Firma Legal Estratégica", slug: "firma-legal-estrategica", sector: "legal", label: "Legal · Estratégica", description: "Firma legal estratégica. Civil, mercantil, financiero, inmobiliario.", preview: "firma-legal-estrategica" },
  { name: "Despacho Corporativo", slug: "adlex", sector: "legal", label: "Legal · Corporativo", description: "Firma corporativa. Fiscal, corporativo y licitaciones.", preview: "adlex" },
  { name: "Bufete Premium", slug: "abogado-demo", sector: "legal", label: "Legal · Premium", description: "Firma premium. M&A, litigio complejo y derecho fiscal.", preview: "abogado-demo" },
  { name: "Abogados Asociados", slug: "torre-legal", sector: "legal", label: "Legal · Toluca", description: "Abogados en Toluca. Estilo profesional.", preview: "torre-legal" },
  { name: "Asesoría Legal Integral", slug: "ayuda-legal", sector: "legal", label: "Legal · Cuernavaca", description: "Bufete jurídico. Penal, civil, familiar. 42+ años.", preview: "ayuda-legal" },
  { name: "Defensa Legal Profesional", slug: "cardenas-thomae", sector: "legal", label: "Legal · Defensa", description: "Defensa legal profesional. Estilo corporativo.", preview: "cardenas-thomae" },
  { name: "Boutique Legal", slug: "rios-abogados", sector: "legal", label: "Legal · CDMX", description: "Boutique legal desde 1999. Estilo elegante.", preview: "rios-abogados" },
  { name: "Firma Legal Formal", slug: "sjm-abogados", sector: "legal", label: "Legal · Formal", description: "Despacho de abogados. Estilo formal.", preview: "sjm-abogados" },
  { name: "Firma Legal Corporativa", slug: "cimet-abogados", sector: "legal", label: "Legal · Corporativo", description: "Firma legal corporativa. Estilo profesional.", preview: "cimet-abogados" },
  { name: "Firma Legal Textor", slug: "textor", sector: "legal", label: "Legal · Textor", description: "Firma legal. Estilo moderno.", preview: "textor" },
  // Dental
  { name: "Consultorio Dental Premium", slug: "dentista", sector: "dental", label: "Dental · Premium", description: "Consultorio dental. Estilo dorado/premium.", preview: "dentista" },
  { name: "Clínica Dental Profesional", slug: "macdent", sector: "dental", label: "Dental · Profesional", description: "Clínica dental. Estilo azul/profesional.", preview: "macdent" },
  { name: "Clínica Dental Moderna", slug: "serenitydent", sector: "dental", label: "Dental · Moderno", description: "Clínica dental. Estilo turquesa/moderno.", preview: "serenitydent" },
  { name: "Diseño de Sonrisa", slug: "sonrisa-precision", sector: "dental", label: "Dental · Especializado", description: "Diseño de sonrisa. Estilo especializado.", preview: "sonrisa-precision" },
  { name: "Clínicas Dentales", slug: "spota", sector: "dental", label: "Dental · Corporativo", description: "Clínicas dentales. Estilo azul corporativo.", preview: "spota" },
  // Cafetería
  { name: "Café de Especialidad", slug: "brown-caffeine-lab", sector: "cafe", label: "Café · Especialidad", description: "Café de especialidad en Puebla. Estilo craft/artesanal.", preview: "brown-caffeine-lab" },
  { name: "Cafetería de Barrio", slug: "cafevera-calavera", sector: "cafe", label: "Café · Barrio", description: "Cafetería de barrio en CDMX. Estilo mexicano/barrial.", preview: "cafevera-calavera" },
  { name: "Casa Gourmet", slug: "margu", sector: "cafe", label: "Gourmet · Puebla", description: "Casa gourmet en Puebla. Estilo elegante.", preview: "margu" },
  { name: "Taller Automotriz", slug: "garaje-central", sector: "cafe", label: "Automotriz · Alemanes", description: "Especialistas en autos alemanes. Taller mecánico.", preview: "garaje-central" },
  // Repostería
  { name: "Pastelería Europea", slug: "pasteleria-europea", sector: "reposteria", label: "Pastelería · Clásica", description: "Pastelería europea. Estilo clásico.", preview: "pasteleria-europea" },
  { name: "Repostería Gourmet", slug: "violette", sector: "reposteria", label: "Repostería · Gourmet", description: "Repostería gourmet. Estilo femenino/elegante.", preview: "violette" },
  { name: "Pastelería de Autor", slug: "voila", sector: "reposteria", label: "Pastelería · Autor", description: "Pastelería de autor. Estilo francés/premium.", preview: "voila" },
  // Construcción
  { name: "Constructora Industrial", slug: "anirac", sector: "construccion", label: "Construcción · Tijuana", description: "Obras civiles, industrial, infraestructura. 25+ años.", preview: "anirac" },
  { name: "Constructora General", slug: "constructora-demo", sector: "construccion", label: "Construcción · General", description: "\"Edificamos tu Visión\". Constructora genérica.", preview: "constructora-demo" },
  { name: "Estructuras Metálicas", slug: "techylam", sector: "construccion", label: "Estructuras · CDMX", description: "Techos y estructuras metálicas. Estilo industrial.", preview: "techylam" },
];

const CONCEPTS: Demo[] = [
  { name: "\"Precision Chaos\"", slug: "nootropicos", sector: "conceptos", label: "E-commerce · Nootrópicos", description: "Hyperbold, dark, neón. Amarillo ácido + magenta. Text scramble, magnetic buttons, custom cursor.", isNew: true, preview: "nootropicos" },
  { name: "\"La Trazada Humana\"", slug: "cafeteria-artesanal", sector: "conceptos", label: "Cafetería · Artesanal", description: "Cálida, imperfecta, papel. Subrayados a mano, washi tape, bordes orgánicos, textura de papel.", isNew: true, preview: "cafeteria" },
  { name: "\"La Institución Silenciosa\"", slug: "vega-herrera", sector: "conceptos", label: "Legal · Corporativo", description: "Poder, silencio, bronce. Serif monumental, transiciones lineales, cero decoración.", isNew: true, preview: "vegaherrera" },
];

const SECTORS = [
  { id: "all", label: "Todos" },
  { id: "legal", label: "Legal" },
  { id: "dental", label: "Dental" },
  { id: "cafe", label: "Cafetería" },
  { id: "reposteria", label: "Repostería" },
  { id: "construccion", label: "Construcción" },
  { id: "conceptos", label: "Conceptos" },
];

const SECTOR_LABELS: Record<string, { title: string; count: number }> = {
  legal: { title: "Sector Legal", count: 10 },
  dental: { title: "Sector Dental", count: 5 },
  cafe: { title: "Sector Cafetería & Alimentos", count: 4 },
  reposteria: { title: "Sector Repostería & Pastelería", count: 3 },
  construccion: { title: "Sector Construcción", count: 3 },
};

/* ─── Components ─── */

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function DemoPreview({ type }: { type: string }) {
  // Conceptos originales
  if (type === "nootropicos") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm bg-[#111] border border-white/5 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 via-transparent to-[#FF006E]/10" />
        <div className="text-center relative z-10">
          <span className="font-mono text-[9px] text-[#CCFF00]/60 tracking-widest">NEUROVEX LABS</span>
          <p className="font-bold text-2xl text-white/90 font-[family-name:var(--font-space-grotesk)] mt-1">NF</p>
          <span className="font-mono text-[9px] text-[#CCFF00]/80 tracking-wider">NEUROFIRE</span>
        </div>
      </div>
    );
  }
  if (type === "cafeteria") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#F7F5F0" }}>
        <div className="text-center">
          <p className="text-2xl text-[#2C2C2C] italic" style={{ fontFamily: "Georgia, serif" }}>El Trazo</p>
          <p className="text-[10px] text-[#6B6560] mt-1" style={{ fontFamily: "Courier, monospace" }}>café de barrio</p>
        </div>
      </div>
    );
  }
  if (type === "vegaherrera") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0A0C10" }}>
        <div className="text-center">
          <p className="text-lg text-[#E2E2DF]" style={{ fontFamily: "Georgia, serif" }}>Vega, Herrera <span className="text-[#6B7280]">&</span> Asociados</p>
          <div className="w-12 h-px bg-[#B8956A] mx-auto mt-2" />
          <p className="text-[9px] text-[#6B7280] mt-2 tracking-widest font-mono">EST. 1987</p>
        </div>
      </div>
    );
  }

  // SECTOR LEGAL
  if (type === "firma-legal-estrategica") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0D1117" }}>
        <div className="text-center">
          <p className="text-xl text-white font-semibold" style={{ fontFamily: "Georgia, serif" }}>Firma Legal Estratégica</p>
          <div className="w-16 h-px bg-blue-500/50 mx-auto mt-3" />
          <p className="text-[9px] text-white/40 mt-3 tracking-widest font-mono">CIVIL · MERCANTIL · FINANCIERO</p>
        </div>
      </div>
    );
  }
  if (type === "adlex") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1A1A2E" }}>
        <div className="text-center">
          <p className="text-3xl text-white font-bold tracking-wider">ADLEX</p>
          <p className="text-[9px] text-blue-400/60 mt-2 tracking-widest font-mono">DESPACHO CORPORATIVO</p>
        </div>
      </div>
    );
  }
  if (type === "abogado-demo") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}>
        <div className="text-center">
          <p className="text-2xl text-amber-400 font-bold" style={{ fontFamily: "Georgia, serif" }}>Bufete Premium</p>
          <div className="w-12 h-px bg-amber-400/50 mx-auto mt-2" />
          <p className="text-[9px] text-white/50 mt-2 tracking-widest font-mono">M&A · LITIGIO · FISCAL</p>
        </div>
      </div>
    );
  }
  if (type === "torre-legal") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0F172A" }}>
        <div className="text-center">
          <p className="text-2xl text-white font-semibold">Torre Legal</p>
          <p className="text-[9px] text-slate-400 mt-2 tracking-widest font-mono">ABOGADOS ASOCIADOS</p>
        </div>
      </div>
    );
  }
  if (type === "ayuda-legal") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="text-center">
          <p className="text-xl text-white font-semibold" style={{ fontFamily: "Georgia, serif" }}>Ayuda Legal</p>
          <p className="text-[9px] text-blue-300/60 mt-2 tracking-widest font-mono">42+ AÑOS DE EXPERIENCIA</p>
        </div>
      </div>
    );
  }
  if (type === "cardenas-thomae") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#111827" }}>
        <div className="text-center">
          <p className="text-lg text-white font-bold tracking-wide">CÁRDENAS & THOMAE</p>
          <p className="text-[9px] text-gray-400 mt-2 tracking-widest font-mono">DEFENSA LEGAL</p>
        </div>
      </div>
    );
  }
  if (type === "rios-abogados") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#18181B" }}>
        <div className="text-center">
          <p className="text-xl text-white italic" style={{ fontFamily: "Georgia, serif" }}>Ríos & Abogados</p>
          <p className="text-[9px] text-zinc-400 mt-2 tracking-widest font-mono">EST. 1999</p>
        </div>
      </div>
    );
  }
  if (type === "sjm-abogados") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="text-center">
          <p className="text-2xl text-white font-bold tracking-widest">SJM</p>
          <p className="text-[9px] text-white/40 mt-2 tracking-widest font-mono">ABOGADOS</p>
        </div>
      </div>
    );
  }
  if (type === "cimet-abogados") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1C1C1E" }}>
        <div className="text-center">
          <p className="text-2xl text-white font-semibold">CIMET</p>
          <p className="text-[9px] text-gray-400 mt-2 tracking-widest font-mono">ABOGADOS</p>
        </div>
      </div>
    );
  }
  if (type === "textor") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#141414" }}>
        <div className="text-center">
          <p className="text-2xl text-white font-bold tracking-tight">TEXTOR</p>
          <div className="w-8 h-px bg-white/30 mx-auto mt-2" />
          <p className="text-[9px] text-white/50 mt-2 tracking-widest font-mono">FIRMA LEGAL</p>
        </div>
      </div>
    );
  }

  // SECTOR DENTAL
  if (type === "dentista") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1410 0%, #2d2416 100%)" }}>
        <div className="text-center">
          <p className="text-2xl text-amber-300 font-bold" style={{ fontFamily: "Georgia, serif" }}>Consultorio Dental</p>
          <div className="w-12 h-px bg-amber-300/50 mx-auto mt-2" />
          <p className="text-[9px] text-amber-200/40 mt-2 tracking-widest font-mono">PREMIUM</p>
        </div>
      </div>
    );
  }
  if (type === "macdent") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm bg-[#111] border border-white/5 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-500/10"></div>
        <div className="text-center relative z-10">
          <span className="font-mono text-[9px] text-blue-400/60 tracking-widest">MACDENT MX</span>
          <p className="font-bold text-2xl text-white/90 mt-1" style={{ fontFamily: "sans-serif" }}>MD</p>
          <span className="font-mono text-[9px] text-blue-400/80 tracking-wider">CLÍNICA DENTAL</span>
        </div>
      </div>
    );
  }
  if (type === "serenitydent") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0D1F1F 0%, #1A3535 100%)" }}>
        <div className="text-center">
          <p className="text-2xl text-teal-300 font-semibold">SerenityDent</p>
          <p className="text-[9px] text-teal-200/50 mt-2 tracking-widest font-mono">CLÍNICA DENTAL MODERNA</p>
        </div>
      </div>
    );
  }
  if (type === "sonrisa-precision") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0F1419" }}>
        <div className="text-center">
          <p className="text-xl text-white font-semibold">Sonrisa Precisión</p>
          <p className="text-[9px] text-cyan-400/60 mt-2 tracking-widest font-mono">DISEÑO DE SONRISA</p>
        </div>
      </div>
    );
  }
  if (type === "spota") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0A1628" }}>
        <div className="text-center">
          <p className="text-3xl text-blue-400 font-bold">SPOTA</p>
          <p className="text-[9px] text-blue-300/50 mt-2 tracking-widest font-mono">CLÍNICAS DENTALES</p>
        </div>
      </div>
    );
  }

  // SECTOR CAFETERÍA
  if (type === "brown-caffeine-lab") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#2C1810" }}>
        <div className="text-center">
          <p className="text-xl text-amber-600 font-bold tracking-tight">BROWN</p>
          <p className="text-sm text-amber-500/80 font-light italic">Caffeine Lab</p>
          <p className="text-[9px] text-amber-400/40 mt-2 tracking-widest font-mono">CAFÉ DE ESPECIALIDAD</p>
        </div>
      </div>
    );
  }
  if (type === "cafevera-calavera") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1A0F0A" }}>
        <div className="text-center">
          <p className="text-2xl text-orange-400 font-bold">Cafévera Calavera</p>
          <p className="text-[9px] text-orange-300/50 mt-2 tracking-widest font-mono">CAFÉ DE BARRIO</p>
        </div>
      </div>
    );
  }
  if (type === "margu") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1C1410" }}>
        <div className="text-center">
          <p className="text-2xl text-amber-200 italic" style={{ fontFamily: "Georgia, serif" }}>Margu</p>
          <p className="text-[9px] text-amber-200/40 mt-2 tracking-widest font-mono">CASA GOURMET</p>
        </div>
      </div>
    );
  }
  if (type === "garaje-central") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0D0D0D" }}>
        <div className="text-center">
          <p className="text-2xl text-red-500 font-bold tracking-wider">GARAJE CENTRAL</p>
          <p className="text-[9px] text-red-400/50 mt-2 tracking-widest font-mono">ESPECIALISTAS ALEMANES</p>
        </div>
      </div>
    );
  }

  // SECTOR REPOSTERÍA
  if (type === "pasteleria-europea") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#F5F1E8" }}>
        <div className="text-center">
          <p className="text-2xl text-[#4A3F35] italic" style={{ fontFamily: "Georgia, serif" }}>Pastelería Europea</p>
          <p className="text-[9px] text-[#8B7355] mt-2 tracking-widest font-mono">TRADICIÓN CLÁSICA</p>
        </div>
      </div>
    );
  }
  if (type === "violette") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #F8E8F5 0%, #E8D5E8 100%)" }}>
        <div className="text-center">
          <p className="text-2xl text-purple-900 italic" style={{ fontFamily: "Georgia, serif" }}>Violette</p>
          <p className="text-[9px] text-purple-700/60 mt-2 tracking-widest font-mono">REPOSTERÍA GOURMET</p>
        </div>
      </div>
    );
  }
  if (type === "voila") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#FFF8F0" }}>
        <div className="text-center">
          <p className="text-3xl text-[#2C2416] italic" style={{ fontFamily: "Georgia, serif" }}>Voilà</p>
          <p className="text-[9px] text-[#8B7355] mt-2 tracking-widest font-mono">PASTELERÍA DE AUTOR</p>
        </div>
      </div>
    );
  }

  // SECTOR CONSTRUCCIÓN
  if (type === "anirac") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="text-center">
          <p className="text-3xl text-orange-500 font-bold tracking-wider">ANIRAC</p>
          <p className="text-[9px] text-orange-400/50 mt-2 tracking-widest font-mono">CONSTRUCTORA INDUSTRIAL</p>
        </div>
      </div>
    );
  }
  if (type === "constructora-demo") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#0F1419" }}>
        <div className="text-center">
          <p className="text-xl text-white font-bold">Constructora</p>
          <p className="text-sm text-blue-400 italic mt-1">"Edificamos tu Visión"</p>
          <p className="text-[9px] text-white/40 mt-2 tracking-widest font-mono">CONSTRUCCIÓN GENERAL</p>
        </div>
      </div>
    );
  }
  if (type === "techylam") {
    return (
      <div className="w-full aspect-[16/10] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden" style={{ background: "#141414" }}>
        <div className="text-center">
          <p className="text-2xl text-gray-300 font-bold tracking-wide">TECHYLAM</p>
          <p className="text-[9px] text-gray-400 mt-2 tracking-widest font-mono">ESTRUCTURAS METÁLICAS</p>
        </div>
      </div>
    );
  }

  return null;
}

function DemoCard({ demo, delay = 0 }: { demo: Demo; delay?: number }) {
  return (
    <FadeUp delay={delay}>
      <a
        href={`/demos/${demo.slug}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden border border-white/10 bg-transparent hover:border-white/30 hover:bg-white/[0.03] hover:shadow-lg hover:shadow-white/5 transition-all duration-300 p-5"
      >
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-3.5 h-0.5 bg-white/60" />
          <div className="absolute top-0 left-0 w-0.5 h-3.5 bg-white/60" />
        </div>
        <div className="absolute bottom-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 right-0 w-3.5 h-0.5 bg-white/60" />
          <div className="absolute bottom-0 right-0 w-0.5 h-3.5 bg-white/60" />
        </div>

        {/* Preview */}
        <div className="mb-4">
          {demo.preview ? <DemoPreview type={demo.preview} /> : (
            <div className="w-full aspect-[16/10] rounded-sm bg-gradient-to-br from-[#111] via-[#151515] to-[#111] animate-pulse" />
          )}
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{demo.label}</span>
          {demo.isNew && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white/10 text-white/50 tracking-wider">NUEVO</span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">{demo.name}</h3>

        {/* Description */}
        <p className="mt-1 text-xs text-white/40 leading-relaxed">{demo.description}</p>
      </a>
    </FadeUp>
  );
}

/* ─── Page ─── */

export default function ShowroomPage() {
  const [filter, setFilter] = useState("all");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const filteredDemos = filter === "all" || filter === "conceptos"
    ? DEMOS
    : DEMOS.filter((d) => d.sector === filter);

  const showConcepts = filter === "all" || filter === "conceptos";

  // Group demos by sector for "all" view
  const groupedSectors = filter === "all"
    ? ["legal", "dental", "cafe", "reposteria", "construccion"]
    : [filter];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
          >
            Swift Service
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#proceso" className="text-sm text-white/60 hover:text-white transition-colors duration-300">Proceso</Link>
            <Link href="/#servicios" className="text-sm text-white/60 hover:text-white transition-colors duration-300">Servicios</Link>
            <Link href="/#inversion" className="text-sm text-white/60 hover:text-white transition-colors duration-300">Inversión</Link>
            <span className="text-sm text-white font-medium">Portafolio</span>
            <button
              className="group relative text-sm font-medium text-white/80 hover:text-white px-3 py-2 transition-all duration-300"
              onClick={() => setIsContactOpen(true)}
            >
              <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
              <span className="px-2">Contacto</span>
              <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex px-5 py-2 border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[11px] font-mono text-white/40 tracking-[3px] uppercase">
              Showroom de Soluciones
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-[family-name:var(--font-space-grotesk)]">
            Esto es lo que<br />construimos.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            Cada demo es un sistema digital funcional. Sin plantillas. Sin WordPress.
            <br />
            Elige tu sector y explora lo que podemos hacer para tu negocio.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-mono text-white/30 tracking-wider">
            <span>Código a medida</span>
            <span className="text-white/15">·</span>
            <span>Mobile-first</span>
            <span className="text-white/15">·</span>
            <span>Entrega en días</span>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-mono text-white/30 tracking-widest uppercase mr-2">Filtrar:</span>
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-200 ${
                filter === s.id
                  ? "border-white/50 bg-white/10 text-white"
                  : "border-white/10 bg-transparent text-white/60 hover:border-white/30 hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Demos grid */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filter !== "conceptos" && groupedSectors.map((sectorId) => {
            const sectorDemos = filter === "all"
              ? DEMOS.filter((d) => d.sector === sectorId)
              : filteredDemos;
            const info = SECTOR_LABELS[sectorId];
            if (!info || sectorDemos.length === 0) return null;

            return (
              <div key={sectorId} className="mb-20">
                <FadeUp>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-white/40 tracking-widest uppercase">{info.title}</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-mono text-white/20">{info.count} soluciones</span>
                  </div>
                </FadeUp>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {sectorDemos.map((demo, i) => (
                    <DemoCard key={demo.slug} demo={demo} delay={i * 50} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Concepts section */}
          {showConcepts && (
            <div className="mb-20">
              <FadeUp>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-mono text-white/40 tracking-widest uppercase">Conceptos de Diseño</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs font-mono text-white/20">3 conceptos</span>
                </div>
                <p className="text-sm text-white/30 mb-8 max-w-2xl">
                  Exploraciones de diseño avanzado. Cada concepto demuestra una filosofía visual diferente aplicada a un sector específico.
                </p>
              </FadeUp>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CONCEPTS.map((demo, i) => (
                  <DemoCard key={demo.slug} demo={demo} delay={i * 50} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-8 bg-[#0a0a0a]">
        <FadeUp className="max-w-3xl mx-auto text-center">
          <div className="h-[1px] w-16 bg-white/30 mx-auto mb-12" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white italic leading-tight font-[family-name:var(--font-space-grotesk)]">
            ¿Ves algo que te gusta?
            <br />
            Solo falta ponerle tu logo.
          </h2>
          <p className="mt-6 text-base text-white/50 leading-relaxed">
            Cada solución se adapta a tu marca, tu contenido y tu mercado.
            <br />
            Entrega en días, no meses.
          </p>
          <div className="mt-10">
            <Link
              href="/#inversion"
              className="inline-flex items-center bg-white/10 text-white font-semibold border border-white/30 backdrop-blur-md px-8 py-4 text-base tracking-wide transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105"
            >
              Agendar consultoría gratuita
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <span className="text-2xl font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
            Swift Service
          </span>
          <p className="text-sm text-white/40 font-mono">
            © 2026 Swift Service. v2.0 Stable Build.
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
