# Design System Specification: The Hyper-Lucid Architect

## 1. Overview & Creative North Star
This design system is built to move beyond the "template" aesthetic of modern SaaS. Our goal is to transform technical utility into a high-end editorial experience. 

**Creative North Star: "The Hyper-Lucid Architect"**
We prioritize extreme clarity, architectural depth, and intentional asymmetry. This isn't just a UI; it’s a digital workspace that feels like a premium physical environment. We achieve this by rejecting "standard" structural elements—like heavy borders and rigid grids—in favor of tonal layering, expansive white space, and high-contrast typographic scales. 

The aesthetic is tech-focused but human-centric, aligning with the precision and vibrancy of the modern web.

---

## 2. Colors: Tonal Depth & Vibrant Precision
Our palette is anchored by the high-energy Catalyst Blue (`#00adef`) and grounded by a sophisticated Slate Gray (`#1f2937`). 

### The Palette Logic
- **Primary (`#00adef` / `primary`):** Use this sparingly for high-impact moments. It is our "active" energy.
- **Surface & Background (`#f4f6ff` / `surface`):** A cool-toned off-white that prevents eye fatigue and feels more premium than pure hex white.
- **Text Primary (`#1f2937` / `on_surface`):** A deep slate that provides high contrast without the "dead" feeling of pure black.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. 
Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation a user needs. If a container requires more prominence, move to `surface-container-high`.

### Signature Textures & Glassmorphism
- **The Glass Rule:** For floating elements (modals, dropdowns, sticky headers), use semi-transparent surface colors (e.g., `surface` at 80% opacity) combined with a `20px` backdrop-blur. This ensures the UI feels integrated and multi-dimensional.
- **Vibrant Gradients:** To add "soul" to CTAs or Hero backgrounds, use a subtle linear gradient from `primary` (`#00adef`) to `primary_container` (`#2fbcff`) at a 135-degree angle.

---

## 3. Typography: The Editorial Voice
We use a dual-typeface system to balance technical precision with extreme readability.

- **The Architectural Voice (Space Grotesk):** Used for all `display`, `headline`, and `label` roles. Its geometric quirks signal "modern tech" and high-end design.
- **The Narrative Voice (Manrope):** Used for `body` and `title` roles. It is highly legible, providing a soft counterpoint to the sharp edges of the headers.

### Typographic Hierarchy
- **Display Large (3.5rem):** Use for hero statements. Tighten letter-spacing to `-0.02em` for a "locked-in" editorial look.
- **Headline (1.5rem - 2rem):** Used to anchor sections. Never center-align headlines unless the entire layout is symmetrical.
- **Body (1rem):** Maintain a generous line-height (1.6) to ensure the technical content feels approachable.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows and borders are replaced by a "Stacking Principle."

### The Layering Principle
Depth is achieved by nesting surface tiers. 
- **Base:** `surface` (`#f4f6ff`)
- **Secondary Section:** `surface-container-low` (`#eaf1ff`)
- **Interactive Card:** `surface-container-lowest` (`#ffffff`) 

This creates a soft, natural lift that mimics fine paper or frosted glass layers without the visual clutter of shadows.

### Ambient Shadows
When a "floating" effect is mandatory (e.g., a primary CTA button or a modal):
- **Shadow Color:** Use a tinted version of `on-surface` (`#252f3d`) at 4–8% opacity.
- **Blur:** Large values (e.g., `30px` to `60px`).
- **Spread:** Negative spread (e.g., `-10px`) to keep the shadow tucked under the element, mimicking natural ambient light.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., an input field), use the `outline_variant` token at **20% opacity**. Never use 100% opaque borders.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** Background `primary` (`#00adef`), Text `on_primary` (`#e8f4ff`). Use `ROUND_FOUR` (`1rem`) corner radius.
- **Tertiary:** No background. Use `primary` text. Interaction is signaled via a subtle `surface-container-high` background shift on hover.
- **Padding:** Vertical `1rem`, Horizontal `2rem` for a wide, premium footprint.

### Cards & Containers
- **Forbid Dividers:** Do not use lines to separate content within a card. Use the Spacing Scale (specifically `spacing-8` or `spacing-10`) to create "Active Negative Space."
- **Rounding:** Strictly follow the `ROUND_FOUR` scale (`1rem` for cards, `0.5rem` for small UI elements).

### Input Fields
- **Background:** `surface-container-highest` (`#cfdef7`).
- **Focus State:** A 2px "Ghost Border" of `primary` (`#00adef`) with a soft `4px` outer glow of the same color at 20% opacity.
- **Labels:** Always use `label-md` (Space Grotesk) in `on_surface_variant` (`#525c6c`) for a technical, metadata-heavy feel.

### Chips & Tags
- **Shape:** Use `full` roundness (`9999px`).
- **Style:** `surface-container-high` background with `on_surface` text. This keeps them secondary to the main content.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Offset your columns. Place a headline on the left and the body text in a narrower column on the right to create an editorial rhythm.
- **Embrace White Space:** If you think there is enough space, add `1rem` more. Space is a luxury indicator.
- **Color-Logic:** Use `primary` only for things that *do* something. Decoration should use `secondary` or `tertiary` shifts.

### Don't:
- **Don't use 1px dividers.** Use color shifts (`surface` vs `surface-container`) instead.
- **Don't use pure black shadows.** They muddy the "Lucid" aesthetic.
- **Don't use default "Blue" for links.** Use our specific `primary` (`#00adef`) to maintain brand alignment.
- **Don't crowd the edges.** Components should have breathing room from the container edge (minimum `spacing-6`).

---

## 7. Scaling & Spacing
Always use the defined spacing scale to maintain mathematical harmony.
- **Section Spacing:** Use `spacing-20` (5rem) or `spacing-24` (6rem) between major vertical sections.
- **Component Gap:** Use `spacing-4` (1rem) as the standard gap between related elements.
- **Micro-spacing:** Use `spacing-2` (0.5rem) for labels and their corresponding inputs.