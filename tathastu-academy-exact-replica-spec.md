# Tathastu Studio Page — Exact Figma Replica Spec

**Goal:** rebuild `/studio` (apps/web/app/studio/page.tsx) as a pixel-faithful replica of the Figma "Tathastu Studio" frame, **node 206:1731**, file `deDPqbRyTc2RS2noQDFgt1`. The current page is thin/wrong and must be fully rebuilt.

**Theme:** Studio uses a dark **red/black VFX** look (same family as Academy, distinct from the corporate blue site). Pull exact colors/backgrounds per section via `get_design_context` — some bands may be lighter; match each exactly.

**Workflow per section:** `get_figma_data` + `get_design_context` on the node for exact styles, `download_figma_images` for assets into `apps/web/public/images/studio/`. If rate-limited, use a solid placeholder and MARK IT PENDING — never invent/AI-generate images. Build, screenshot-diff `localhost:3000/studio` against the node, then COMMIT + PUSH. Match copy verbatim.

**Section order (9):** Hero → Connect → Trusted by Studios → Who We Are → What We Do → Meet the Team → Our Purpose → What You'll Find Inside → Footer.

---

## 1. Hero — node ~206:1750/206:1758 — DARK
- Heading "Tathastu Studio" (large). Subtitle "The Premier Hub of Houdini Professionals".
- "Contact Us" button (rounded).
- Studio logo top area (node 206:1765) — pull from Figma.
- Concentric-circle ring motif (decorative) + dark background. Pull bg/decor from node.

## 2. Connect — node 208:2107 (206:1733) — band
- Heading "Connect with Industry-Leading Houdini Specialists".
- Paragraph (verbatim): "Whether you're a filmmaker, studio, or creative director looking for top-tier Houdini talent — or a Houdini artist seeking new opportunities — Tathastu is your destination. If you're looking for Houdini work for your project, make use of the skills of our freelance artists to bring your creative vision to life through high-quality, collaborative, and economical solutions."
- Two overlapping images on the right (nodes 206:1789, 206:1790) — pull from Figma.

## 3. Trusted by Studios — node 208:2011 — band (360 tall)
- Heading "Trusted by Studios".
- Text "We're proud to be the go-to Houdini resource for both creators and clients across the industry."
- "Contact Now" button.

## 4. Who We Are — node 208:2108 — section
- Heading "Who We Are".
- Paragraph (verbatim): "Welcome to Tathastu Studio, a dedicated collective built exclusively from Houdini specialists across India and beyond. Each artist is carefully selected based on their skills and experience in Houdini. Our vibrant community of technical and artistic talent is the heart of everything we do. United by a passion for procedural creativity and problem-solving, our artists bring innovation, precision, and cinematic magic to your project."
- Four ticked (tick-circle) points:
  1. "Specialized Houdini FX Expertise – Delivering high-quality simulations, effects, and procedural workflows for film, TV, and advertising projects."
  2. "Global Remote Talent Network – Connecting top-tier VFX studios with skilled freelance Houdini artists worldwide."
  3. "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs."
  4. "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs." *(Figma repeats this line; replicate as-is unless told otherwise.)*
- Two overlapping images on the left (575×493 and 495×342) + a "Leading" experience badge (node 208:2002). Pull images from Figma.

## 5. What We Do — node 208:2163 — section
- Heading "What We Do".
- Intro "You share your artistic and technical intent — we translate that into dynamic visual FX:"
- **8 FX cards** in 2 rows of 4, each = image (~290×153) + centered label:
  Row 1: **Fire · Smoke · Explosions · Water**
  Row 2: **Rain · Snow · Ocean simulations · Dust**
  Pull each card image from Figma (nodes 208:2444–2482 image rects).
- "View More" button below.

## 6. Meet the Team — node 210:2566 — section
- Heading "Meet the Team".
- Subtitle "Industry veterans and visionary leaders driving the future of professional VFX collaboration".
- **3 member cards** (avatar circle 263×263 + name + role):
  - **Chetan Jain** — Founder & CEO
  - **Venu Victor** — Co-founder and VFX Supervisor
  - **Nikitha Gaikwad** — Marketing Manager
  Pull avatar images from Figma (ellipse nodes 210:3368/3371/3373).

## 7. Our Purpose — node 210:3382 — section
- Heading "Our Purpose".
- Lead "To build a dynamic, scalable, and globally connected Houdini FX production ecosystem that:"
- **5 "why" cards**:
  1. "Delivers high-quality FX services to filmmakers, studios, and content creators"
  2. "Leverages top freelance talent from India and beyond"
  3. "Empowers artists through flexibility, creativity, and project-based work culture"
  4. "Adapts to changing needs with agile, scalable solutions"
  5. "Removes infrastructure barriers with a fully virtual pipeline"

## 8. What You'll Find Inside — node 210:3541 — section
- Heading "What You'll Find Inside".
- A toggle / two tabs: **"For Studios"** and **"For Freelancers"**.
- **3 contact cards**:
  - **Email** — academy@tathastu.global — +91 81256 13838
  - **Chetan Jain** — +91 98201 92970
  - **Venu Victor** — +91 96111 04802

## 9. Footer — node 206:1792 — DARK
- Big line "Tathastu Studio isn't a trend. It's a turning point".
- "THE FUTURE OF HOUDINI FREELANCING IS HERE. LET'S BUILD THE NEXT GENERATION OF HIGH-END VFX TOGETHER".
- "Your story, our innovation — let's make it unforgettable."
- Social icons (5).
- Bottom: "© 2025 Tathastu Academy. A division of Tathastu Techno Solution. Authorized SideFX partner in India." *(Figma says "Academy" here — replicate verbatim; flag for later correction.)*
- This is a Studio-specific footer; do not replace the main site footer used elsewhere.

---

## Acceptance
Each section matches its Figma node (screenshot diff), correct theme/colors pulled from Figma, real Figma image assets (not AI-generated), copy verbatim. Build section by section, committing+pushing after each.
