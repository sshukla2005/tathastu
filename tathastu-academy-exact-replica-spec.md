# Tathastu Academy Page — Exact Figma Replica Spec

**Goal:** rebuild `/academy` (apps/web/app/academy/page.tsx) as a pixel-faithful replica of the Figma "Tathastu Academy" frame, **node 154:2**, file `deDPqbRyTc2RS2noQDFgt1`.

**Current state:** the hero is correct. Everything else is invented and must be replaced. DELETE these invented sections — they do NOT exist in Figma:
- "Choose your path" programs section
- the dark "Built for artists, by artists" 6-card grid
- the red stat band (120+ / 15 / 98% / 10+)
- the FAQ ("Common questions") accordion
- the "Ready to become production ready?" CTA

**Workflow per section:** call `get_figma_data` on the node id, `download_figma_images` for its assets into `apps/web/public/images/academy/`, build to match, screenshot-diff against the node. Respect each section's light/dark theme exactly. Match all copy verbatim.

**The real page order (8 sections + footer):**
Hero → Ticker → About (LIGHT) → Programs (DARK) → Why Us (LIGHT) → Specialization (DARK) → Team (LIGHT) → CTA (DARK) → Footer (LIGHT).

---

## 1. Hero — node 179:164 — DARK ✅ (already correct, keep)
Dark rooftop/sky photo bg with red glow. Academy logo (red/white "TATHASTU ACADEMY / Learn. Rise. Lead."). Heading "Where artists become **production** ready." (production in red). Subtext "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning." CTAs: red "Book a Call" + outline "View Programs". Right: lightbulb/grad-cap graphic in a red-outlined card with stat strip "15 SEATS/BATCH · 6mo DEEP TRAINING · 3mo INTENSIVE · 10+ SPECIALIZATIONS". Trust line "Trusted by world-class studios · Batches of 15 artists · 100% online".

## 2. Ticker — node 154:3 — thin strip
A thin (~46px) scrolling ticker strip directly under the hero. Match whatever text/logos the node contains.

## 3. About — node 154:132 — LIGHT THEME
Light background, two columns.
- **Left:** two overlapping images — a purple/AI "brain" graphic with a **"SideFX OFFICIAL PARTNER"** white badge, and a VR-headset photo overlapping its lower-right. Pull both from the node.
- **Right:** eyebrow "OUR MISSION" (red). Heading "Not just teaching." (black) / "Building careers." (red). Two paragraphs:
  - "At Tathastu Academy, we understand the biggest challenge studios face —finding Houdini artists who are **technically skilled and production ready from day one.**"
  - "Backed by our official SideFX partnership, we deliver studio-focused training that equips artists with technical expertise, creative vision, and the problem-solving skills demanded by modern VFX pipelines."
  - Three feature rows (icon + title + text): **Project-Driven Learning** — "Every module builds toward real deliverables studios actually expect." · **Studio-Aligned Curriculum** — "Courses designed in collaboration with real production pipelines." · **Talent Pipeline for Studios** — "Book seats in advance and hire trained, ready-to-deploy artists."
  - Red **"Talk to Us"** button.

## 4. Programs — node ~160:286 — DARK THEME
Dark (deep green/black) section with a faint classroom photo bg. Eyebrow "PROGRAMS OFFERED" (red). Heading "Training for every stage of your **Houdini journey**" (Houdini journey in red). Subtitle "Cutting-edge programs designed for the future of digital creation — from your first node to your first studio credit." Then **3 dark cards**, each: image top, a corner badge, a small uppercase label, title, description, a spec box, a red-dot checklist, a red primary button + "Download Brochure" link.
- **Card 1** — badge "MOST POPULAR"; label "FOR STUDIOS & TEAMS"; title "Studio Houdini Training"; desc "Custom in-house Houdini training built around your studio's exact production requirements and L&D goals."; box FORMAT Online / SEATS Flexible / DURATION Custom; checklist: Crafted with your L&D team · Flip, Pyro, Destruction, Groom, USD & more · Flexible seat or full-batch bookings · Trusted by leading VFX & animation studios; button "Book Studio Training" + "Download Brochure".
- **Card 2** — badge "LAUNCHING"; label "FOR ASPIRING ARTISTS"; title "Beginner Houdini Training"; desc "Our flagship Academy trains a hand-picked batch of 15 students in Houdini from the ground up."; box DURATION 6 Months / SEATS Only 15; checklist: Studio-ready projects aligned with real pipelines · Hand-picked cohort of 15 students · Advance studio seat reservations available · Full Houdini fundamentals to production workflows; button "Join Batch" + "Download Brochure".
- **Card 3** — badge "LAUNCHING SOON"; label "FOR WORKING ARTISTS"; title "Advanced Houdini Training"; desc "Short-term intensive sessions led by industry experts — focused deep dives into specific Houdini workflows."; box DURATION 3 Months / SEATS Only 15; checklist: Expert-led deep dives into advanced workflows · Focus: USD, Groom, Tech Animation & more · Targeted skill-building for working artists · Studio seat reservations available; button "Join Batch" + "Download Brochure".

## 5. Why Us — node 154:389 — LIGHT THEME
Light background, two columns.
- **Left:** eyebrow "WHY TATHASTU" (red). Heading "Transform potential into **reality**" (reality in red). Paragraph "We are not just another training institute. We are the bridge between where you are and where the industry needs you to be." Red **"Talk to an Advisor"** button. Below it, a dark workstation photo.
- **Right:** a 2×3 grid of 6 cards (light, soft bg, small red icon + title + text):
  - **Authorized SideFX Partner** — "Officially recognized by SideFX for delivering world-class Houdini training in India."
  - **Project-Driven Learning** — "Learn by doing, not by theory. Every lesson feeds into real, studio-grade deliverables."
  - **Studio-Aligned Curriculum** — "Courses designed with actual studios grounded in real production pipelines."
  - **Expert Industry Mentors** — "Learn from trainers with direct, hands-on experience from top studio productions."
  - **Talent Pipeline for Studios** — "Studios can reserve seats ahead of time and hire artists ready to contribute from day one."
  - **Capped at 15 Per Batch** — "Small cohorts ensure every student receives personal guidance and focused mentorship."

## 6. Specialization — node ~208:2162 — DARK THEME
Dark section with a faint silhouette photo bg. Eyebrow "SPECIALIZATION AREAS" (red). Heading "Every Houdini workflow, **covered.**" (covered in red). Two rows of rounded pill tags (dark pills, small red icon each):
- Row 1: Flip Simulations · Pyro & Smoke · Destruction & RBD · Environment & FX · Groom · Tech Animation
- Row 2: Shading & Lighting · USD Workflows · Procedural Modeling · VEX Scripting · Particles & DOPs · Pipeline Integration

## 7. Team — node 154:561 — LIGHT THEME
Light cream background, centered. Eyebrow "OUR TEAM" (red). Heading "The people behind" (black) / "Tathastu Academy" (red). Three cards (white, rounded, monogram circle + name + role + small red underline):
- **CJ** — Chetan Jain — FOUNDER & CEO
- **VV** — Venu Victor — HEAD OF TRAINING & PRODUCTION STRATEGY
- **NG** — Nikitha Gaikwad — MARKETING MANAGER

## 8. CTA — node 154:595 — DARK THEME
Dark workstation/mountain photo bg. Eyebrow "READY TO BEGIN?" (red). Heading "Launch your **Houdini career** today" (Houdini career in red). Paragraph "The demand for production-ready Houdini artists is higher than ever. Whether you're an aspiring professional or a studio looking to upskill your team, Tathastu Academy is here to help." Buttons: red "Book a Call Now" + outline "Explore Programs". Then 3 dark contact cards:
- GENERAL ENQUIRIES — **Anusha Kuncham** — +91 81256 13838 — academy@tathastu.global
- FOUNDER & CEO — **Chetan Jain** — +91 98201 92970
- HEAD OF TRAINING — **Venu Victor** — +91 96111 04802

## 9. Footer — node 189:7387 — LIGHT THEME
Soft light gradient (green → peach). Three areas:
- **Information:** Academy logo + "A division of Tathastu Techno Solution and an authorized SideFX partner in India".
- **Contact Us:** Email: academy@tathastu.global · Phone: Anusha Kuncham +91 8125613838 · Phone: Chetan Jain +91 9820192970 · Phone: Venu Victor +91 9611104802 · Location: India.
- **Follow us:** Facebook, Instagram, LinkedIn, X icons.
- Bottom bar: "© 2026 Tathastu Academy. A division of Tathastu Techno Solution. Authorized SideFX partner in India."

Note: this Academy footer is page-specific (Academy logo + Academy contacts), different from the main site footer. Use it only on /academy.

---

## Acceptance
Each section matches its Figma node (screenshot diff), correct light/dark theme, real Figma image assets (not CSS/emoji recreations), copy verbatim. No invented sections (no programs "Choose your path", no 6-card dark grid, no stat band, no FAQ).
