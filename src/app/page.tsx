import { HeroStatic } from "@/components/HeroStatic";
import { ScenesSection } from "@/components/ScenesSection";
import { ExcelenciaSection } from "@/components/ExcelenciaSection";
import { ServicesList } from "@/components/ServicesList";
import { PricingSection } from "@/components/PricingSection";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <HeroStatic />
      </section>

      {/* Scenes Section - 01, 02, 03, 04 */}
      <ScenesSection />

      {/* Technical Specs / Services */}
      <ServicesList />

      {/* Pricing / Inversión */}
      <PricingSection />

      {/* Excelencia Section */}
      <ExcelenciaSection />

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-[#1d1d1f]">
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
