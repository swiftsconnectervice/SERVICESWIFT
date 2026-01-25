"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-semibold tracking-tight text-[#1d1d1f] font-[family-name:var(--font-space-grotesk)]">
              Swift Service
            </span>
            <button 
              className="group relative text-sm font-medium text-[#1d1d1f] px-3 py-2 transition-all duration-300"
              onClick={() => setIsContactOpen(true)}
            >
              <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
              <span className="px-2">Contacto</span>
              <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
            </button>
          </div>
        </div>
      </nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
