"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://n8n.swfitservice.online/webhook/audit-lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "contact-form",
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 lg:p-10">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1d1d1f] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Contáctanos
                </h3>
                <p className="text-[#86868b]">
                  Cuéntanos en qué podemos ayudarte.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-4 rounded-full font-semibold text-base transition-all",
                    isSubmitting
                      ? "bg-[#86868b] text-white cursor-not-allowed"
                      : "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90"
                  )}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#1d1d1f] flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2 font-[family-name:var(--font-space-grotesk)]">
                ¡Mensaje Enviado!
              </h3>
              <p className="text-[#86868b] mb-6">
                Te responderemos lo antes posible.
              </p>
              <button
                onClick={handleClose}
                className="text-[#1d1d1f] font-medium hover:underline"
              >
                Cerrar ventana
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
