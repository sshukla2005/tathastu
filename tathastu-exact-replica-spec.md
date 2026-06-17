# Tathastu Homepage — Exact Figma Replica Spec

**Goal:** Rebuild the homepage so it is a pixel-faithful replica of the Figma design. The current build *invented* a fancier UI; this spec replaces invented elements with what Figma actually contains.

- **Figma file key:** `deDPqbRyTc2RS2noQDFgt1`
- **Homepage frame:** `node-id=40-2` ("Final Design"), 1920px wide.
- **Frontend dir:** `/home/saurabh/workspace/tathastu/apps/web`

## How to work (do this for EVERY section)

1. Call the Figma MCP `get_design_context` on the section's node id (listed below) to get exact colors, spacing, font sizes, and the **asset download URLs** for every image/illustration in that section.
2. **Download each asset** from those URLs and save to `apps/web/public/images/<section>/...` (for an exact static replica) OR upload to Strapi media and reference it. Static `public/` is fastest for a faithful replica; do that unless told otherwise.
3. Rebuild the section component to match the screenshot exactly. After building, screenshot `localhost:3000` and diff against the Figma node; iterate until they match.
4. Do **not** add anything that isn't in Figma. No animations, glows, hover gimmicks, or extra copy unless the design shows them.

## Global corrections (remove invented elements)

These were added by the previous build and are **not** in Figma — remove them:
- The **dark contact topbar** in `Header.tsx` ("+phone/email + Authorized Reseller of Houdini, HP, Dell & Adobe"). Delete entirely.
- The **2px gradient top stripe** at the very top of the header. The colorful gradient stripe actually belongs **above the footer**, not the header (see Footer).
- The entire **fake "tathastu_node_graph.hip" terminal + SVG node graph + glowing pulse circle + "NODE STATUS / FPS 60.00"** in `Hero.tsx`. Replace with the real hero image.
- **lucide icon tiles** in the card sections — Figma uses real photos ("What We Do") and flat illustrations ("Why Choose Us"). Remove icon logic.
- Gradient **hover accent borders**, "Learn more →" hover rows, hover scale/translate effects on cards. Figma cards are static with a simple blue accent.

## Design tokens (mostly correct — keep, with additions)

Current `globals.css` palette is right: `--color-brand-primary: #4b95ff`, background `#f1e8e2`. Keep those. Confirm/add:
- **Section heading style:** large bold, first part `#0b0625` (near-black), accent word(s) in `#4b95ff` blue. e.g. "What **We Do**", "Why **Choose Us?**", "Product **Portfolio**", "Latest at **Tathastu**", "Words Of **Trust**".
- **Primary pill button:** blue gradient (`#1d385e → #4b95ff`), white bold text, fully rounded.
- **Pre-footer gradient stripe:** horizontal bar, ~4px, gradient green→red→orange→yellow→blue, placed directly above the footer.
- Font: **Open Sans** throughout.

---

## Section-by-section spec

### 1. Header — node `40:3`
- Background: **subtle horizontal gradient**, light blue (left) → cream/peach (right). No dark topbar, no top stripe.
- Left: logo = colorful hands-forming-a-"T" mark + "TATHASTU" (bold black) over "TECHNO SOLUTION" (smaller, letter-spaced). Export the logo asset.
- Center nav (regular weight, dark, ~16px): **Home** (active = blue), **Solutions ▾**, **Industries ▾**, **About**, **Contact**. Dropdown carets are small filled triangles.
- Right: **"Get In Touch"** — white pill with a thin **orange→blue gradient outline border**, dark text.
- Sticky on scroll.

### 2. Hero — text node `90:5722`, image node `84:2795`
- Full-width band with a **dark photograph background** (workstations running node graphs) plus a dark overlay; text is white.
- Left column: H1 **"Cutting-edge Solutions for Industries"** (very large, bold, white; the design emphasizes part of it in the brand blue/gradient — match exactly from `get_design_context`). Subtext below in light gray: "Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive." Then two buttons: **"Get Consultation"** (blue gradient pill) and **"Request Demo"** (white/outline pill).
- Right column: a **photograph inside a hexagon mask** with a thin **blue hexagon outline** accent offset behind it. Export this image (node `84:2795`) and the hexagon framing. This replaces the fake terminal entirely.

### 3. What We Do — node `40:1603`
- White background. Centered heading **"What We Do"** (two-tone: "What" black, "We Do" blue), large. Subtitle below, gray: "Customized solutions for Marketing, Analytics and Infrastructure".
- **4 cards**, equal width, white, rounded, subtle shadow, with a **solid blue bottom border (always visible)**. Each card = **a photograph** (top, rounded) + **title only** (bold, dark, centered) **below it**. No description, no icon.
  - Media & Entertainment (concert/camera photo)
  - Architecture & Design (AEC) (modern architecture render)
  - Education & Training (3D stack-of-books render)
  - Manufacturing & Visualization (factory photo)
- Export all 4 card photos from Figma.
- Faint concentric-circles decoration on the right edge.

### 4. Stats band — node `40:1699`
- **Dark band** with a faint workstation photo behind + dark gradient (darker left).
- Left, white bold, two lines, left-aligned: "Join the" / "community of Millions". Thin vertical divider to its right.
- Three stats in a row, white: **20+** "Number of Hardwares" · **80+** "Number of Plugins" · **4100+** "Clients Served" (big number bold, small label beneath).

### 5. Why Choose Us — node `40:4680`
- Light gray background (`~#eeeeee`), faint concentric circles top-left.
- Centered heading **"Why Choose Us?"** (two-tone: "Why" black, "Choose Us?" blue). Subtitle gray, centered: "Your Partner in Success—Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive."
- **4 cards** with **flat vector illustrations** (NOT icons, NOT photos), title bold centered, description gray centered:
  - **Innovation** — "We deliver innovative tech solutions to help you deliver great results while managing your overall costs."
  - **Client Focus** — "Doesn't matter how big or small your business is, Customer is always at the heart of our operations." — **this card is highlighted: light-blue background + blue border.**
  - **Expertise** — "Rely exclusively on our professionals expertise for the best offers and solutions with thier vast industry knowledge."
  - **Reliability** — "Dependable and consistent solutions, ensuring quality results and trustworthiness every time."
- Export all 4 illustrations. (Match the original copy verbatim for an exact replica, including "thier".)

### 6. Product Portfolio — node `40:4579`
- Light background. Heading **"Product Portfolio"** (two-tone), subtitle "High-Quality Solutions Designed for Every Need". **Carousel arrows** (‹ ›, square buttons) top-right.
- One large **image banner** (rounded), dark overlay, with right-aligned white heading "Products Crafted to Meet **Industry** Standards" ("Industry" in blue) and a **"View All Portfolio"** blue gradient pill. Export the banner image.

### 7. CTA band — node `40:3142`
- **Dark photograph background** (circuit board) + dark overlay. Centered, white: heading "Design Support for All Your Creative Needs"; subtext (gray, 2 lines) "Get a free introduction and discover how you and your team can change the way your source design forever"; **"Request Demo"** blue gradient pill centered. Export the background image.

### 8. Latest at Tathastu (Blog) — node `40:1630`
- Light gray bg, faint dotted pattern top-left. Centered heading **"Latest at Tathastu"** (two-tone, "Tathastu" blue).
- **3 cards**: image top (rounded top), white body with a **calendar icon + "March 07, 2026  05:30PM"**, bold title (up to 2 lines), gray excerpt, and **"View Details →"** (blue link). Subtle blue bottom border.
  - Titles seen: "Circuit board close-up with different components"; "Professional software developer types code on a laptop"; "It technician repairing hardware equipment on wooden table".
- Centered **"View All"** blue gradient pill below the grid. Export the 3 blog images.

### 9. Words Of Trust (Testimonials) — node `40:4625`
- White bg. Left-aligned heading **"Words Of Trust"** (two-tone, "Trust" blue), subtitle "Trusted by customers, backed by results." **Carousel arrows** top-right.
- **2 cards**, light-blue tinted background, rounded, with a small **blue triangle accent in the top-right corner**. Each: circular **avatar photo**, name (bold), role/company (gray), **5 orange stars**, then the quote (gray).
  - **Keitan Yadav** — "Chief Operating Officer - Redchillies.vfx" — "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable."
  - **Anisha Karthik** — "CEO - PIXADOO" — "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs. They go beyond simply providing products, offering effective solutions to our challenges, even within tight deadlines. We greatly appreciate their support and wish them continued success."
- Export both avatar images.

### 10. Client logos — node `40:4602`
- Row of partner logos (grayscale/muted) on light bg: **HP, Adobe, SideFX, Toon Boom Storyboard Pro, Dell**. Export each logo.

### 11. Footer — node `40:1509`
- **Pre-footer gradient stripe** (green→red→orange→yellow→blue, ~4px) directly above.
- Footer background: soft gradient (greenish left → peach/cream right).
- Left block: logo (mark + "TATHASTU / TECHNO SOLUTION"); **phone icon + "+91 98201 92970"**; **mail icon + "info@tathastu.global.com"**; "Follow us :" with round blue **Facebook, Instagram, LinkedIn** icons.
- Three link columns (each link prefixed with a small ">" chevron):
  - **Tathastu:** About Us, Blog, Press, Career, Contact Us
  - **Industries:** Media and Entertainment, AEC, Manufacturing, Education, Government
  - **Professions:** Architects, Animators & Graphic Designers, VFX Expert, Product Designer
- Bottom center: "© Copyright 2026 Tathastu. All Rights Reserved".
- **Green WhatsApp floating button** bottom-right (the existing `WhatsAppFAB` is correct — keep it; it's in the design).

---

## Notes on content fidelity

For an **exact replica**, reproduce the Figma copy verbatim — including the original spellings the design uses (e.g. "thier" in the Expertise card, and the email `info@tathastu.global.com`). If you want the typo corrections instead, do that as a separate pass after the visual replica matches.

## Acceptance

Each section, when rendered at 1920px, must visually match its Figma node (screenshot diff). All images must be the **real Figma assets**, not placeholders or CSS recreations. No invented widgets, animations, or copy remain.
