# Design System Specification: Industrial Precision

## 1. Overview & Creative North Star
### Creative North Star: "The Blueprint Aesthetic"
This design system moves away from generic corporate layouts to embrace the raw, disciplined beauty of structural engineering. We are not just building a website; we are drafting a digital monument. The system is defined by **Industrial Precision**—a high-end editorial approach that mimics the clarity of a master blueprint combined with the premium feel of a luxury architectural monograph.

To break the "template" look, we utilize **Intentional Asymmetry**. Large-scale display typography should be offset against dense technical data, creating a push-and-pull between "The Vision" (large scale) and "The Execution" (granular detail). We celebrate white space as a structural element, treating it with the same importance as the steel and concrete of a physical build.

---

## 2. Colors & Surface Logic
The palette is rooted in the materials of the construction site: deep structural steel blue, graphite, and stark white, punctuated by a high-visibility Safety Orange.

### The "No-Line" Rule
To maintain a high-end feel, **1px solid borders for sectioning are strictly prohibited.** We define spatial boundaries through tonal shifts rather than lines. A change in purpose is a change in background. 
*   *Implementation:* Place a `surface_container_low` section directly against a `surface` background. The subtle shift in hex value provides all the containment the eye needs without the "cheapness" of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:
*   **Base Layer:** `surface` (#f9f9ff)
*   **Sub-Section Layer:** `surface_container_low` (#eff3ff)
*   **Interactive/Elevated Layer:** `surface_container_lowest` (#ffffff)
*   **High-Contrast Info Layer:** `surface_container_high` (#dee9fd)

### Signature Textures & The "Glass" Rule
To provide a "soul" to the industrial aesthetic, use subtle gradients. 
*   **Primary CTA Backgrounds:** Transition from `primary` (#022448) to `primary_container` (#1e3a5f) at a 135-degree angle.
*   **The Glassmorphism Clause:** For floating navigation or technical overlays, use `surface` at 80% opacity with a `20px` backdrop-blur. This ensures the technical background (site photos or blueprints) bleeds through, softening the edges of the digital interface.

---

## 3. Typography: The Authority of 'Inter'
We rely on a single typeface, **Inter**, to convey "Technical Solidity." The hierarchy is achieved through extreme scale and weight contrast rather than font variety.

*   **Display (800 weight):** Used for project titles and impact statements. `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to feel "heavy" and immovable.
*   **Headlines (600 weight):** For section headers. Use `headline-md` (1.75rem).
*   **Body (400 weight):** `body-lg` (1rem) for readability. Ensure a generous line-height (1.6) to provide breathing room amidst technical data.
*   **Labels & Monospace Data:** Use `label-md` (0.75rem) in all-caps with `0.05em` letter spacing for technical specs. Pair this with a monospace font for numerical data (sq ft, budget, duration) to reinforce the "industrial report" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows look "web-kit generic." In this system, we build depth through light and material.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` (#ffffff) card on top of a `surface_container_low` (#eff3ff) background. The 4% brightness difference creates a natural, sophisticated lift.
*   **Ambient Shadows:** If a floating element is required (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 24px 48px -12px rgba(18, 28, 42, 0.08);`. The shadow color is derived from `on_surface` to keep it natural.
*   **The Ghost Border Fallback:** If accessibility requires a border, use `outline_variant` at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Fill with `primary` gradient, `rounded-sm` (0.125rem). Use `800` weight for text.
*   **Secondary:** Ghost style. `outline_variant` at 20% opacity. Text in `primary`.
*   **Tertiary/Accent:** Used only for "Safety/Action" items. Use `tertiary` (#411800) with `tertiary_fixed_dim` text.

### Inputs & Fields
*   **Form Logic:** No borders. Background is `surface_container_high`. Underline only (2px) using `primary` on focus. This mimics the look of a technical fill-in-the-blank form.

### Technical Cards
*   **Construction:** Forbid divider lines within cards. Separate "Title," "Phase," and "Data" using vertical spacing tokens `8` (1.75rem) and `10` (2.25rem).
*   **Status Chips:** Use `tertiary_container` for active "On Site" statuses to utilize the Safety Orange accent.

### Interactive "Blueprints" (Unique Component)
*   **Blueprint Overlays:** Large-scale background technical drawings (SVG) at 5% opacity behind content. This reinforces the 18 years of experience without cluttering the UI.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Grids:** Align text to the left but allow large imagery to bleed off the right edge of the screen.
*   **Embrace Monospace:** Use monospace for all dates and coordinates. It conveys precision.
*   **Layer Surfaces:** Use `surface_container` tokens to "group" related data instead of using a box with a border.

### Don’t:
*   **Don't use Rounded-Full:** Avoid pills or circles. This system is about "Estructura" (Structure). Use `rounded-sm` (2px) or `none` (0px) to maintain a hard, architectural edge.
*   **Don't use Standard Shadows:** Never use `0 2px 4px rgba(0,0,0,0.5)`. It destroys the premium high-end feel.
*   **Don't use Icons as Decoration:** Icons must be "Technical Icons" (thin stroke, geometric). If it doesn't add functional clarity, remove it.