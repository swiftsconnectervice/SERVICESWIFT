# Propuesta de Páginas Demo — Swift Service

## ¿Por qué páginas demo?

Las demos son tu portafolio vivo. En vez de decirle al cliente "te puedo hacer esto", le dices "mira, ya está hecho, solo falta ponerle tu logo". Esto reduce la fricción de venta porque:

1. El cliente VE el resultado antes de pagar.
2. Demuestras que tu tecnología es real, no promesas.
3. Cada demo corresponde a un paquete MVP, así el cliente se auto-segmenta.

---

## Demo 1: Dentista (Paquete Reactivación — $7,500)

**URL propuesta:** `/demo/dentista`

**Objetivo:** Mostrar cómo una landing interactiva con cotizador convierte visitantes en pacientes reales vía WhatsApp.

**Estructura de la página:**
1. Hero con foto/gradiente dental + headline "¿Cuánto cuesta tu sonrisa ideal?"
2. Cotizador interactivo de blanqueamiento (el usuario selecciona servicio → ve precio estimado)
3. Sección de servicios del consultorio (limpieza, brackets, implantes, blanqueamiento)
4. Testimonios / confianza (estrellas, reseñas simuladas)
5. CTA final con botón WhatsApp que dice "Agendar mi cita"

**¿Por qué esta demo?**
- Los dentistas son el cliente ideal del Paquete Reactivación: servicio urgente, ticket medio, necesitan filtrar pacientes.
- El cotizador es "El Gancho" que diferencia a Swift Service de una agencia WordPress.
- El botón de WhatsApp demuestra la automatización n8n en acción.

**Qué demuestra al cliente potencial:**
- Que no es una página estática, tiene lógica interactiva.
- Que el lead llega directo al WhatsApp del dueño con datos del servicio y precio.
- Que se ve como app nativa en celular (PWA).

---

## Demo 2: Abogado (Paquete Reactivación — $7,500)

**URL propuesta:** `/demo/abogado`

**Objetivo:** Mostrar cómo un filtro de calificación evita llamadas innecesarias y solo conecta con prospectos serios.

**Estructura de la página:**
1. Hero con gradiente oscuro + headline "¿Necesitas asesoría legal? Responde 3 preguntas."
2. Quiz/Filtro de 3 pasos (tipo de caso → urgencia → presupuesto estimado)
3. Resultado: "Tu caso es de tipo X, el costo aproximado es Y" + botón WhatsApp
4. Áreas de práctica (familiar, mercantil, laboral, penal)
5. Barra de confianza (años de experiencia, casos resueltos, consulta gratis)

**¿Por qué esta demo?**
- Los abogados pierden mucho tiempo en llamadas con gente que no puede pagar o no es su área.
- El quiz filtra antes de que el abogado levante el teléfono.
- Demuestra "El Filtro" del context.md: solo hablas con prospectos calificados.

**Qué demuestra al cliente potencial:**
- Que la web trabaja POR el profesional, no solo lo presenta.
- Que el quiz reduce llamadas basura en un 70%+.
- Que el resultado se envía automáticamente por WhatsApp.

---

## Demo 3: Taller Mecánico (Paquete Dash de Control — $18,000-$25,000)

**URL propuesta:** `/demo/taller`

**Objetivo:** Mostrar cómo un dashboard interno organiza el negocio y genera reportes automáticos.

**Estructura de la página:**
Esta demo es diferente: es una App Web interna (no pública). Se muestra como una pantalla de login + preview del dashboard.

1. Pantalla de Login (usuario: demo / contraseña: demo)
2. Dashboard principal:
   - Resumen del día (vehículos en taller, servicios completados, pendientes)
   - Lista de servicios activos (cliente, vehículo, servicio, estado)
   - Botón "Registrar nuevo servicio"
3. Vista de registro: formulario simple (cliente, vehículo, servicio, costo estimado)
4. Indicador: "Reporte diario se envía a las 8 PM al correo del dueño"

**¿Por qué esta demo?**
- Los talleres mecánicos son caóticos: apuntan en libretas, pierden datos, no saben cuánto facturaron.
- Un dashboard simple les cambia la vida y justifica el precio alto ($18k-$25k).
- Demuestra que Swift Service no solo hace "sitios bonitos" sino herramientas de negocio reales.

**Qué demuestra al cliente potencial:**
- Que puedes construir apps web internas, no solo landing pages.
- Que el reporte automático por correo/WhatsApp es real.
- Que el dueño puede ver su negocio desde el celular sin estar en el taller.

---

## Cómo se conectan las demos con el sitio principal

En la sección "¿De qué giro es tu negocio?" del sitio principal, cada card tiene un botón "Ver Demo". Ese botón lleva a la demo correspondiente:

| Card | Botón | Ruta |
|------|-------|------|
| Salud y Bienestar | Ver Demo Dentista → | `/demo/dentista` |
| Servicios Profesionales | Ver Demo Legal → | `/demo/abogado` |
| Comercios y Talleres | Ver Demo Taller → | `/demo/taller` |

Cada demo tiene un banner flotante arriba que dice: "Esto es una demo. ¿Quieres algo así para tu negocio? → Agendar llamada" para convertir al visitante.

---

## Estilo visual de las demos

- Misma paleta dark (#0a0a0a) del sitio principal para coherencia.
- Cada demo tiene un color de acento sutil diferente para distinguir la industria:
  - Dentista: acento azul claro (confianza médica)
  - Abogado: acento ámbar/dorado (autoridad legal)
  - Taller: acento naranja (industria/mecánica)
- Todas mobile-first, se sienten como app nativa.
- El banner "Esto es una demo" usa el estilo del badge del hero (borde sutil, fondo semi-transparente).


Unificación propeusta
Esta es una duda excelente y demuestra que ya estás pensando en la Experiencia de Usuario (UX) y en cómo reducir la fricción en la venta. Como tu mentor, te voy a dar una solución que equilibra el impacto visual ("que se vea bonito") con la eficiencia técnica ("que no te tome mil horas programarlo").

Hacer que tu sitio web completo cambie de diseño según el cliente es arriesgado: puede confundir al usuario y es técnicamente pesado de mantener.

Aquí tienes la estrategia de "El Visualizador de Soluciones" (o Showroom Interactivo).

1. No cambies el sitio, cambia el "Marco" (El efecto Split-Screen)
En lugar de que todo tu sitio cambie, crea una sección o una página dedicada (/showroom) donde el cliente sea el protagonista.

La idea es esta:
Imagina una pantalla dividida o una sección con un panel de control a la izquierda y una vista previa a la derecha.

Panel de Control (Tú como Consultor): Botones que digan [Sector Salud], [Sector Legal], [Sector Fitness].

Vista Previa (El resultado): Cuando el usuario da clic en "Salud", solo el área central (un "Hero Component") cambia para mostrar el diseño de un dentista, incluyendo su automatización.

2. Cómo mostrar los niveles (Básico vs. Premium)
Esta es una técnica de ventas brutal. En lugar de explicarlo con texto, muéstralo con un "Switch" de potencia.

Modo Básico: Muestras el rediseño web (estético, limpio, rápido).

Modo AI-Ops (Premium): Al activar este switch, aparecen mágicamente en el diseño los "puntos de inteligencia" (el chatbot, la calculadora, el agendador).

Por qué funciona: El cliente ve visualmente cómo su sitio "cobra vida" y entiende por qué el Premium cuesta más. No le vendes un precio, le vendes una mejora de capacidad.

3. ¿Plantilla de inicio o estilos diferentes?
Mi recomendación técnica (usando Kiro):
Crea UNA estructura maestra (Layout) que sea muy sólida y profesional, y usa lo que en programación llamamos "temas" o "skins".

La Estructura: Título, Subtítulo, Imagen/Video, Formulario. (Esto no cambia).

El Estilo (Lo que cambia):

Si es Dentista: Colores blancos/azules, fotos de clínica, tipografía Serif elegante.

Si es Gym: Colores oscuros/neón, fotos de acción, tipografía Sans-Serif pesada.