# Design System Strategy: The Vertical Expedition

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Vertical Expedition."** 

This system moves away from the flat, sterile nature of standard e-commerce to embrace the rugged, atmospheric depth of high-altitude environments. We are not just building a store; we are building a digital topographical map. The experience must feel like a climb—layers of information should feel like layers of gear or rock faces, overlapping and shifting as the user scrolls.

To achieve this, the design system utilizes **Atmospheric Asymmetry**. We intentionally break the grid with overlapping image containers and "floated" technical data points. By using high-contrast typography scales and parallax-ready depth, we create an editorial experience that feels as high-performance as the equipment it showcases.

---

## 2. Colors

The palette is rooted in the high-alpine environment: the deep shadows of the crevasse (`Ice Blue`), the blinding clarity of the peak (`Snow White`), and the high-visibility safety of technical gear (`Accent Orange`).

### Tonal Application
- **Primary (`#ffb599` / `Accent Orange`):** Reserved strictly for high-action touchpoints and critical technical data. It is the "safety beacon" of the UI.
- **Secondary (`#96d5a3` / `Pine Green`):** Used for "Organic Performance" indicators—sustainability badges, weather-resistance icons, and forest-grade durability ratings.
- **Surface & Background (`#0b1326` / `Ice Blue`):** The foundation. All experiences start in this deep, midnight blue to provide a premium, immersive "Dark Mode" default.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined through **Background Color Shifts**. For example, a product specification block should transition from `surface` to `surface-container-low` to define its edge. This creates a more organic, "molded" look rather than a stitched-together template.

### The "Glass & Gradient" Rule
To move beyond a "flat" feel, use **Glassmorphism** for floating overlays (e.g., navigation bars or quick-access technical specs). Use a 12px-20px backdrop-blur combined with a 40% opacity `surface-container`. 
*Signature Polish:* Use a subtle linear gradient on primary CTAs, transitioning from `primary` to `primary-container` at a 135-degree angle to simulate the sheen of technical Ripstop nylon.

---

## 3. Typography

The typography strategy is a collision of "The Technical" and "The Functional."

- **Headings (Oswald):** Used for `display` and `headline` scales. This represents the "impact" of the brand. Oswald’s condensed, architectural nature mimics high-altitude signage. 
    - *The Long Shadow:* For hero titles, apply a subtle, directional long-shadow using a tinted `surface-container-lowest` to create a 3D effect that feels carved into the interface.
- **Body & Labels (Inter):** Used for `title`, `body`, and `label` scales. Inter provides the "technical manual" clarity required for reading fabric specs and sizing charts. Its neutral tone balances the aggression of Oswald.

**Scale Hierarchy:**
- **Display LG (3.5rem):** Reserved for hero slogans and peak elevation markers.
- **Headline SM (1.5rem):** For product categories and technical features.
- **Label MD (0.75rem):** For "Tech Specs" and micro-copy, utilizing increased letter-spacing (0.05em) for a GPS-coordinate aesthetic.

---

## 4. Elevation & Depth

In this design system, depth is a functional tool, not just an ornament. We use **Tonal Layering** to convey hierarchy.

### The Layering Principle
Think of the UI as a series of stacked sheets of technical fabric. 
- **The Base:** `surface-dim` (The valley floor).
- **The Content Section:** `surface-container-low`.
- **The Interactive Card:** `surface-container-high` (The peak).

By stacking a `surface-container-highest` card on top of a `surface-container-low` section, we create a "lift" that is felt rather than seen.

### Ambient Shadows
When an element must float (like a "Add to Cart" sticky bar), shadows must be "Ambient." 
- **Blur:** 40px - 60px.
- **Opacity:** 6% - 10%.
- **Color:** Use a tinted version of `surface-container-lowest` rather than pure black. This mimics natural light scattering in snow and ice.

### The "Ghost Border" Fallback
If a container needs more definition (e.g., an input field against a dark background), use a **Ghost Border**. This is a 1px stroke using the `outline-variant` token at **15% opacity**. It should be barely visible, acting more as a light-catch on an edge than a hard boundary.

---

## 5. Components

### Buttons
- **Primary:** `Accent Orange` background, `on-primary` text. No border. High-performance "active" state uses a subtle `surface-tint` glow.
- **Secondary:** Transparent background with a `Ghost Border`. On hover, the background fills to `surface-container-highest`.
- **Tertiary:** Text-only in `primary` with a 2px `primary` underline that spans only 40% of the text width, centered (Technical Underlining).

### Cards & Lists
- **Forbid Dividers:** Do not use lines to separate list items. Use a `2.5 (0.85rem)` spacing increment and a subtle shift to `surface-container-low` on hover to define the row.
- **Technical Overlays:** Cards should use a "Corner Snipe"—a small 45-degree angled clip on one corner—to reinforce the "rugged equipment" aesthetic.

### Inputs & Forms
- **Field Styling:** Use `surface-container-highest` for the input well. 
- **Focus State:** The border transitions from a `Ghost Border` to a solid 1px `primary` (Orange) to simulate a "system active" status.

### Parallax-Ready Assets
All product photography should be cut out (PNG/WebP) to allow for layering. Place text (`Oswald`) *behind* the product image and *in front* of the background texture to create a three-dimensional "sandwich" effect during scroll.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetric Spacing:** Use larger gaps (Scale `20` or `24`) on one side of the layout to create a sense of vast, open mountain space.
- **Layer Text and Image:** Allow `Display` typography to be partially obscured by product imagery to increase the "Editorial" depth.
- **Embrace the Dark:** Keep the majority of the UI in `surface` (Ice Blue) to allow the `Accent Orange` to pop with maximum intensity.

### Don't:
- **Don't use 100% Opaque Borders:** This shatters the "Vertical Expedition" immersion and makes the site look like a standard retail template.
- **Don't use standard Drop Shadows:** Avoid heavy, dark, small-radius shadows. They feel "web-1.0" and heavy.
- **Don't use Dividers:** If you feel the need for a divider, increase the `Spacing Scale` instead. Vertical white space is your most powerful tool for clarity.