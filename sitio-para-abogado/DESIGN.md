# Design System Document: Vega & Asociados

## 1. Overview & Creative North Star: "The Architectural Brief"
The Creative North Star for this design system is **"The Architectural Brief."** Much like a high-end law firm’s physical office—where heavy oak desks meet floor-to-ceiling glass and soft Marfil marble—the digital experience must balance the weight of tradition with the transparency of modern global practice.

We are breaking the "template" look by rejecting standard grid-bound boxes. Instead, we use **Intentional Asymmetry** and **Editorial Layering**. Elements should feel like they are laid out on a physical desk: a document slightly overlapping a marble surface, a gold accent catching the light, and expansive white space (Ivory) that suggests the luxury of time and clarity. We do not "fill" space; we curate it.

---

## 2. Colors: Tonal Depth over Borders
The palette is a dialogue between the heritage of `primary` (#022448) and the warmth of `surface` (#faf9f6). 

*   **Primary (#022448) & Primary-Container (#1e3a5f):** Use these for moments of absolute authority—footers, hero sections, or primary actions.
*   **Secondary (#755b00):** Our "Ocre Apagado." Use sparingly as a "Gold Leaf" accent for high-level emphasis (e.g., a signature line or a bespoke icon).
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. We define boundaries through **Background Shifts**. To separate the Header from the Hero, use `surface` transitioning to `surface-container-low`. To separate a sidebar, use `surface-container`.
*   **Surface Hierarchy:** 
    *   **Level 0 (Base):** `surface` (#faf9f6) - The vast Marfil canvas.
    *   **Level 1 (Nesting):** `surface-container-low` (#f4f3f0) - Used for secondary content sections.
    *   **Level 2 (Interaction):** `surface-container-high` (#e9e8e5) - Used for hover states or floating navigation.
*   **The "Glass & Gradient" Rule:** For global navigation or floating contact cards, use **Glassmorphism**. Apply `surface` at 80% opacity with a `backdrop-blur` of 20px. This mimics the "Luz Natural" (natural light) filtering through a glass partition.

---

## 3. Typography: The Editorial Voice
We pair the intellectual rigor of a serif with the functional clarity of a sans-serif.

*   **Display & Headlines (Newsreader/Cormorant Garamond):** These are our "Gravitas" tokens. Use `display-lg` for hero statements. Headlines should use `on-surface` but can occasionally drop into `primary` for a subtle shift in tone. Use generous letter-spacing (tracking) for a premium, airy feel.
*   **Titles & Body (Inter):** This is the "Working Class" of the typography. `title-md` is for sub-headers and navigation. `body-md` (Inter, 0.875rem) is the standard for legal copy and descriptions.
*   **Hierarchy as Brand:** Use extreme contrast in scale. A `display-lg` headline paired with a `label-sm` (all caps, wide tracking) creates a high-fashion, editorial layout that looks bespoke, not templated.

---

## 4. Elevation & Depth: Tonal Layering
We avoid the "Material Design" drop-shadow look in favor of **Ambient Presence**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#ffffff) card on top of a `surface-container` (#efeeeb) background. The change in "paper weight" creates the depth.
*   **Ambient Shadows:** If an element must float (e.g., a modal or a floating action), use a shadow with a 40px blur at 4% opacity, using the `primary` color as the shadow tint. This mimics a soft shadow cast on marble, not a digital glow.
*   **The "Ghost Border":** For input fields or cards where a boundary is functional, use `outline-variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components: The Executive Suite

### Buttons
*   **Primary:** `primary` (#022448) background with `on-primary` (#ffffff) text. Shape: `sm` (0.125rem) roundedness—sharp corners suggest precision and legal rigor.
*   **Secondary (The Gold Standard):** `outline` (#74777f) text with a `secondary` (#755b00) 1px bottom-border (underline) that expands on hover. No container.
*   **Tertiary:** Text-only in `primary-fixed-variant`.

### Cards & Lists
*   **The "Anti-Divider" Rule:** Forbid horizontal lines between list items. Use `spacing-6` (2rem) of vertical white space or a subtle `surface-container-low` background on every second item to create a "Zebra" rhythm that feels intentional.
*   **Cards:** Use `surface-container-lowest` with a "Ghost Border." Imagery (wood, marble) should be clipped with `sm` roundedness.

### Input Fields
*   **Styling:** Minimalist. No background fill. Only a bottom border using `outline-variant` at 40% opacity. Upon focus, the border transitions to `primary` and the label moves up using `label-sm`.

### Signature Component: The "Case Study Ledger"
A bespoke component for this design system: A full-width section using `primary-container` (#1e3a5f) with `on-primary` text, featuring an asymmetrical layout where text sits on the left 40% and a high-resolution "Luz Natural" (natural light) photograph of a law library sits on the right 60%, slightly overlapping the text container.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. If you think there is enough padding, add `spacing-4` (1.4rem) more.
*   **Do** use asymmetrical layouts (e.g., an image aligned to a grid line while text is offset).
*   **Do** use `secondary` (Gold) only for "The Signature"—small icons, specific links, or a single decorative line.

### Don't:
*   **Don't** use `full` (9999px) roundedness. It is too playful for a firm of this stature. Stick to `none` or `sm`.
*   **Don't** use "Blue" for links. Use `primary` with a `secondary` (Gold) underline.
*   **Don't** use generic icons. Use thin-stroke, "Classic" style icons (columns, scales) and render them in `primary` or `secondary`.

---

## 7. Spacing Scale: The Rhythm of Silence
Use the spacing scale to create "breathing rooms." 
*   **Hero Padding:** Use `spacing-24` (8.5rem).
*   **Section Gaps:** Use `spacing-16` (5.5rem).
*   **Internal Component Padding:** Use `spacing-4` (1.4rem) for a sense of luxury. Tight spacing (under 1rem) should only be used for legal "fine print" in `body-sm`.