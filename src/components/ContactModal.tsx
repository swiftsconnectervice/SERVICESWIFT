"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full px-4 py-3 border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all";

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

    const BATZ_KEY = "batz_998f66d9-7c59-4518-b232-bc40bc52";
    const BATZ_URL = "https://preulivulvhsyycdyvqf.supabase.co/functions/v1/webhook-receiver";

    try {
      console.log("[ContactForm] Enviando a n8n y Batz...");

      const [n8nRes, batzRes] = await Promise.all([
        fetch("https://n8n.swfitservice.online/webhook/audit-lead-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: "contact-form",
          }),
        }),
        fetch(BATZ_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": BATZ_KEY },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: "",
            message: formData.message,
          }),
        }),
      ]);

      console.log("[ContactForm] n8n status:", n8nRes.status, await n8nRes.clone().text());
      console.log("[ContactForm] Batz status:", batzRes.status, await batzRes.clone().text());

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("[ContactForm] Error:", err);
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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-[#111] border border-white/10 w-full max-w-lg mx-4 overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6">
          <div className="absolute top-0 left-0 w-4 h-0.5 bg-white/40" />
          <div className="absolute top-0 left-0 w-0.5 h-4 bg-white/40" />
        </div>
        <div className="absolute bottom-3 right-3 w-6 h-6">
          <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white/40" />
          <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white/40" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
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
                <p className="text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                  Contacto
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Contáctanos
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Cuéntanos en qué podemos ayudarte.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(inputClass, "resize-none")}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-4 font-semibold text-base transition-all",
                    isSubmitting
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : "bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20 hover:border-white/50"
                  )}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Mensaje Enviado!
              </h3>
              <p className="text-white/50 mb-6">
                Te responderemos lo antes posible.
              </p>
              <button
                onClick={handleClose}
                className="text-white/70 font-medium hover:text-white transition-colors"
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
