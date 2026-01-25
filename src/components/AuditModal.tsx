"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const painPoints = [
  { value: "", label: "Selecciona una opción" },
  { value: "slow", label: "Mi sitio carga muy lento" },
  { value: "outdated", label: "El diseño se ve anticuado" },
  { value: "no-converts", label: "Tengo tráfico pero no convierte" },
  { value: "rebuild", label: "Necesito reconstruirlo desde cero" },
  { value: "other", label: "Otro" },
];

const planOptions = [
  { value: "", label: "Selecciona un paquete" },
  { value: "Presencia Digital", label: "Presencia Digital — Desde $3,500 MXN" },
  { value: "Sitio Corporativo", label: "Sitio Corporativo — Desde $7,000 MXN" },
  { value: "Negocio Total", label: "Negocio Total — Desde $12,000 MXN" },
  { value: "Personalizado", label: "Necesito algo diferente" },
];

export function AuditModal({ isOpen, onClose, selectedPlan = "" }: AuditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    painPoint: "",
    otherPainPoint: "",
    plan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Pre-seleccionar el plan cuando se abre el modal
  useEffect(() => {
    if (isOpen && selectedPlan) {
      setFormData(prev => ({ ...prev, plan: selectedPlan }));
    }
  }, [isOpen, selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Enviar a webhook de n8n para solicitud de auditoría
      const response = await fetch("https://n8n.swfitservice.online/webhook/solicitud-auditoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          painPoint: formData.painPoint === "other" ? formData.otherPainPoint : formData.painPoint,
          selectedPlan: formData.plan,
          timestamp: new Date().toISOString(),
          source: "landing-page",
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      setIsSuccess(true);
      setFormData({ name: "", email: "", website: "", painPoint: "", otherPainPoint: "", plan: "" });
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
                  Solicita tu Auditoría
                </h3>
                <p className="text-[#86868b]">
                  Analizamos tu sitio y te enviamos un diagnóstico en 24h.
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
                    URL de tu sitio web <span className="text-[#86868b] font-normal">(opcional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all"
                    placeholder="https://tusitio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    ¿Qué te gustaría mejorar?
                  </label>
                  <select
                    required
                    value={formData.painPoint}
                    onChange={(e) => setFormData({ ...formData, painPoint: e.target.value, otherPainPoint: "" })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all appearance-none cursor-pointer"
                  >
                    {painPoints.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campo para especificar "Otro" */}
                {formData.painPoint === "other" && (
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                      Cuéntanos más
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.otherPainPoint}
                      onChange={(e) => setFormData({ ...formData, otherPainPoint: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all"
                      placeholder="Describe tu situación"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    ¿Qué paquete te interesa?
                  </label>
                  <select
                    required
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F6] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] transition-all appearance-none cursor-pointer"
                  >
                    {planOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                  {isSubmitting ? "Enviando..." : "Solicitar Auditoría"}
                </button>
              </form>

              <p className="mt-6 text-xs text-[#86868b] text-center">
                Sin spam. Sin compromiso. Solo valor.
              </p>
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
                ¡Solicitud Recibida!
              </h3>
              <p className="text-[#86868b] mb-6">
                Revisaremos tu sitio y te contactaremos en menos de 24 horas con un diagnóstico inicial.
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
