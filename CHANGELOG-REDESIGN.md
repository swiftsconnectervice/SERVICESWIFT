# Swift Service — Registro de Rediseño

## Propósito de este archivo
Documento de referencia para sesiones futuras con Kiro. Contiene el contexto estratégico, los cambios realizados al diseño y al código, y las decisiones tomadas para que cualquier sesión futura pueda retomar sin perder el hilo.

---

## Contexto Estratégico (de dónde viene todo)

**Archivo fuente:** `web-architects/context.md`

**Posicionamiento:** "Infraestructura de Conversión Ligera"
- No vendemos sitios bonitos. Vendemos sistemas digitales que generan ventas.
- Diferenciador vs WordPress: código a medida (React/Next.js), PWA mobile-first, conectado a WhatsApp vía n8n.
- Target: PYMEs de Tehuacán (servicios profesionales, salud, comercios locales).

**Ventaja competitiva:**
- vs BigRedes/MAGO (WordPress): código a medida vs plantillas, misma franja de precio.
- vs Vexus (custom caro): IA reduce tiempos y costos, mismo resultado.
- vs UPHY (marketing): sistemas de conversión real, no likes.

**Estrategia de Upselling (Ajuste 4):**
- El rediseño es un "Caballo de Troya" / Producto de Entrada (Tripwire).
- Se vende como "Optimización de Infraestructura", dejando la base lista para automatización futura.
- Precio de entrada: $5,000 - $8,000 MXN. El upsell viene en 3 meses.

**Tiers por presupuesto (Ajuste 5):**
- Bajo (Semilla) $2,500-$4,500: plantillas, 4hrs máx. NO se muestra en el sitio.
- Medio (Crecimiento) $7,000-$15,000: Kiro + n8n, 15-20hrs.
- Alto (AI-Ops) $20,000+: ecosistema completo, 40+ hrs.

**Manejo de clientes (Ajuste 6):**
- 50% anticipo siempre. Feedback máx 48h. Pausar a las 72h sin respuesta.

**Paquetes MVP (catálogo actual):**
| Paquete | Precio | Entrega | Para quién |
|---------|--------|---------|------------|
| Reactivación | $7,500 MXN + IVA | 3-5 días | Médicos, oficios, servicios urgentes |
| Sistema de Agendamiento | $14,000 MXN + IVA | 7-10 días | Nutriólogos, psicólogos, barberías, spas |
| Dash de Control | $18,000-$25,000 MXN + IVA | 15-20 días | Talleres, tiendas, restaurantes |
| Mantenimiento mensual | $3,500/mes | Continuo | Todos |

---

## Estado del Sitio ANTES del Rediseño

**Stack:** Next.js + Tailwind CSS + shadcn/ui
**Estructura:** Single page con scroll (page.tsx)

**Secciones originales:**
1. Navbar (Swift Service, Proceso, Servicios, Inversión, Contacto)
2. HeroStatic — video de fondo, "Claridad sobre ruido", CTA "Agenda una auditoría"
3. ScenesSection — 4 pasos técnicos (Análisis, Planos, Compilación, Stress Test)
4. ServicesList — accordion con 4 servicios técnicos (Full-Stack, Rendimiento, UX, Refactoring)
5. PricingSection — 3 planes genéricos ($3,500 / $7,000 / $12,000)
6. ExcelenciaSection — CTA final "La excelencia no es un accidente"
7. Footer

**Componentes existentes:**
- `Navbar.tsx` — nav fija con blur, links smooth scroll, mobile hamburger
- `HeroStatic.tsx` — video Cloudinary, overlay dark, modal AuditModal
- `ScenesSection.tsx` — IntersectionObserver para animaciones de entrada
- `ServicesList.tsx` — accordion hover/click con corner brackets
- `PricingSection.tsx` — 3 cards con hover, corner brackets, "Más elegido"
- `ExcelenciaSection.tsx` — CTA con animación de entrada
- `AuditModal.tsx` — formulario completo con webhook n8n (solicitud-auditoria)
- `ContactModal.tsx` — formulario simple con webhook n8n (audit-lead-capture)

**Webhooks n8n activos:**
- `https://n8n.swfitservice.online/webhook/solicitud-auditoria`
- `https://n8n.swfitservice.online/webhook/audit-lead-capture`

**Fuentes:** Inter (body), Space Grotesk (display/logo)
**Paleta:** fondo #0a0a0a, textos white con opacidades, acentos white/borders

---

## Diseño Nuevo (pencil-new.pen)

**Archivo:** `pencil-new.pen` (raíz del workspace)

**Secciones del nuevo diseño (en orden):**
1. **Navbar** — Links: Método, Soluciones, Paquetes. CTA: "Agendar Llamada"
2. **Hero** — Badge "INFRAESTRUCTURA DE CONVERSIÓN", headline "No necesitas otro sitio web. Necesitas un sistema digital que venda por ti.", social proof bar (89% móvil, código a medida, WhatsApp)
3. **Metodología 3 Pasos** — Presencia PWA → Gancho Inteligente (IA) → Automatización WhatsApp
4. **Lo que construimos (Accordion)** — Estilo dropdown del sitio actual. Items: Apps Web PWA, Cotizadores IA, Automatización WhatsApp+n8n, Dashboards Internos. Uno expandido mostrando body + corner brackets.
5. **Selector de Industrias** — 3 cards: Salud (dentistas, nutriólogos), Servicios Profesionales (abogados, contadores), Comercios (talleres, restaurantes). Cada uno con botón "Ver Demo".
6. **Comparativa** — Tabla lado a lado monocromática. Izquierda: "Agencia WordPress" (gris apagado, ✕). Derecha: "Ecosistema Swift Service" (blanco brillante, →). Sin rojo/verde.
7. **Paquetes MVP** — 3 cards ($7,500 / $14,000 / $18,000-$25,000) + banner mantenimiento $3,500/mes
8. **CTA Final** — "Tu competencia tiene una página web. Tú vas a tener un sistema de ventas."
9. **Footer** — "© 2026 Swift Service. Infraestructura de Conversión."

**Decisiones de diseño:**
- Paleta monocromática (sin rojo/verde en la tabla comparativa)
- Se mantiene estética dark (#0a0a0a) con bordes white/opacity
- Se mantiene el estilo accordion con corner brackets (gustó al cliente)
- Tipografía: Inter + Space Mono (monospace para labels/tags)
- Acento rojo (#FF0000) solo en tags de metodología y "Ideal para" en paquetes

---

## Cambios Realizados (Completados)

- [x] Implementar el nuevo diseño en código (modificar componentes existentes)
- [x] Actualizar Navbar links (Método, Soluciones, Paquetes)
- [x] Rehacer HeroStatic con nuevo copy + social proof bar (video Cloudinary conservado)
- [x] Rehacer ScenesSection → Metodología 3 pasos
- [x] Mantener ServicesList (accordion) pero con contenido nuevo
- [x] Agregar sección Selector de Industrias (nueva) — con iconos Lucide (HeartPulse, Briefcase, Store)
- [x] Agregar sección Comparativa (nueva) — monocromática, sin rojo/verde
- [x] Rehacer PricingSection con paquetes MVP + banner mantenimiento
- [x] Actualizar ExcelenciaSection con nuevo CTA copy
- [x] Actualizar AuditModal con nuevos paquetes en el select
- [x] Diseñar páginas de demo por industria (dentista, abogado, taller) en pencil-new.pen
- [x] Crear DEMOS-PROPUESTA.md con justificación de demos
- [x] Corregir precios en demos pencil ($ faltantes por interpolación JS)
- [x] Corregir \n literales en headlines de demos
- [x] Corregir "reportes auto" → "reportes automáticos" en comparativa

## Cambios Pendientes (TODO)

- [ ] Considerar PWA manifest + service worker (demostrar lo que vendemos)
- [ ] Implementar páginas de demo en código (dentista, abogado, taller)

---

## Notas Técnicas

- Los archivos `.pen` de Pencil deben estar en UNA SOLA LÍNEA de JSON para renderizar visualmente. Si se formatean (pretty-print), Pencil los abre como texto plano.
- El sitio usa `tw-animate-css` para animaciones con Tailwind.
- Los modales usan webhooks de n8n reales — no romper las URLs al refactorizar.
- `Space Grotesk` se usa en el código actual para el logo, pero el diseño pencil usa `Space Mono` para labels. Considerar agregar Space Mono al layout.tsx.
