import { HeroStatic } from "@/components/HeroStatic";
import { ScenesSection } from "@/components/ScenesSection";
import { ExcelenciaSection } from "@/components/ExcelenciaSection";
import { ServicesList } from "@/components/ServicesList";
import { PricingSection } from "@/components/PricingSection";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="inicio" className="relative">
        <HeroStatic />
      </section>

      {/* Scenes Section - 01, 02, 03, 04 */}
      <div id="proceso">
        <ScenesSection />
      </div>

      {/* Technical Specs / Services */}
      <div id="servicios">
        <ServicesList />
      </div>

      {/* Pricing / Inversión */}
      <div id="inversion">
        <PricingSection />
      </div>

      {/* Excelencia Section */}
      <ExcelenciaSection />

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <span className="text-2xl font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
              Swift Service
            </span>
            <p className="text-sm text-white/40 font-mono">
              © 2026 Swift Service. v2.0 Stable Build.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
