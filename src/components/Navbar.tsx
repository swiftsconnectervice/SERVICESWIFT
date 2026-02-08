"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";

const navLinks = [
  { label: "Proceso", href: "#proceso" },
  { label: "Servicios", href: "#servicios" },
  { label: "Inversión", href: "#inversion" },
];

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#inicio")}
              className="text-xl font-semibold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
            >
              Swift Service
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                className="group relative text-sm font-medium text-white/80 hover:text-white px-3 py-2 transition-all duration-300"
                onClick={() => setIsContactOpen(true)}
              >
                <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
                <span className="px-2">Contacto</span>
                <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left text-sm text-white/60 hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsContactOpen(true);
                }}
                className="block w-full text-left text-sm font-medium text-white py-2"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
