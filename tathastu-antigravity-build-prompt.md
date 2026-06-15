# Build Prompt — Tathastu Website (Strapi 5 + Next.js)

> Paste this whole document into the Antigravity Agent Panel as your goal. Run it in **Agent-Assisted (with verification checkpoints)** mode. Before starting, connect the **Figma MCP server** in Antigravity and authenticate so the agent can read exact design tokens. Figma file key: `deDPqbRyTc2RS2noQDFgt1`, homepage node id `40:2`.

---

## 0. Role & Objective

You are a senior full-stack engineer. Build a production-ready marketing website for **Tathastu** (Tathastu Techno Solutions / "Tathastu Global") — a company selling hardware, software, and plugins to creative industries (VFX/Media & Entertainment, Architecture & Design / AEC, Education & Training, Manufacturing & Visualization), with a strong Houdini/SideFX focus.

The site must **visually match the Figma design** as closely as possible. Pull exact colors, typography, spacing, radii, and shadows from the Figma file via the Figma MCP tools (file key `deDPqbRyTc2RS2noQDFgt1`). Do not invent the visual system from memory — read it from Figma. Where you cannot read a value, take a screenshot of the relevant Figma node, compare against your rendered page in the browser subagent, and iterate until they match.

The content (CMS-managed) must be editable by non-technical staff through Strapi's admin panel.

## 1. Tech Stack (use exactly this unless a hard blocker appears)

- **Backend / CMS:** Strapi **5** (latest 5.x). TypeScript. PostgreSQL in production, SQLite for local dev. Draft & Publish enabled. i18n plugin installed (default locale `en`).
- **Frontend:** Next.js **15** (App Router, TypeScript, Server Components for data fetching), **Tailwind CSS v4**, deployed as a separate app.
- **Data fetching:** Next.js fetches from Strapi via the REST API (use the populate/`fields` params; cache with `revalidate`). Add ISR (`revalidate: 60`) on content pages.
- **Media:** Strapi media library; configure an upload provider abstraction (local for dev, S3-compatible for prod via env vars).
- **Forms:** Contact and "Get a Demo / Consultation" forms post to a Strapi collection type (`Lead`) via a Next.js route handler (server-side) — no secrets in the client.
- **Monorepo layout:**
  ```
  /apps
    /web        # Next.js frontend
    /cms        # Strapi 5
  /packages
    /types      # shared TS types generated from Strapi schema
  ```
  Use a workspace (npm/pnpm). Add a root `README.md` with run instructions and a single `docker-compose.yml` (postgres + cms + web) for local dev.

## 2. Visual System (read from Figma; these are guardrails)

- Desktop frames are **1920px** wide. Build a responsive layout: mobile-first, with breakpoints sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536. The 1920 design maps to a centered max-width container (~1440–1536px) with ~240px equivalent side gutters scaled proportionally.
- Extract the brand palette, heading/body font families and weights, button styles (pill-shaped CTAs with notable radius), card radii, and the dotted/halftone decorative motifs from Figma. Define them as **CSS variables + Tailwind theme tokens** in one place (`globals.css` / `tailwind.config`).
- The decorative dotted/halftone graphics in the design are built from thousands of vector dots — **do not** recreate them as thousands of DOM nodes. Export them as optimized SVG/PNG from Figma and use as background images.
- Buttons seen in design: primary pill ("Get Consultation", "Get In Touch"), secondary pill ("Request Demo", "View All", "View All Portfolio", "View Details" with right-arrow).
- Honor hover/focus states and keyboard accessibility (WCAG AA contrast, focus rings, semantic landmarks).

## 3. Strapi Content Model

### Single Types
- **homepage** — `heroHeading`, `heroSubtext`, `heroPrimaryCtaLabel`, `heroPrimaryCtaHref`, `heroSecondaryCtaLabel`, `heroSecondaryCtaHref`, `heroImage` (media), plus a **Dynamic Zone** `sections` (see components) so editors can reorder homepage blocks.
- **siteSettings** (global) — `logo` (media), `nav` (repeatable component: label, href, optional dropdown children), `headerCtaLabel`, `headerCtaHref`, `footerColumns` (repeatable: title + links), `phone`, `email`, `socialLinks` (repeatable: platform, url), `copyrightText`.
- **aboutPage**, **contactPage** — flexible Dynamic Zone `sections` + page-specific fields (e.g., `mapEmbed`, `addressLines` on contact).

### Collection Types
- **blog-post** — `title`, `slug` (uid), `excerpt`, `body` (rich text / blocks), `coverImage` (media), `publishedDate` (datetime), `author` (relation → team-member, optional), `category` (enum/relation). Draft & Publish ON.
- **industry** — `name`, `slug`, `shortDescription`, `icon` (media), `heroImage` (media), `body` (blocks), `order` (int). Seed: Media & Entertainment, Architecture & Design (AEC), Education & Training, Manufacturing & Visualization, plus Government (appears in footer).
- **portfolio-item** (Product Portfolio) — `title`, `slug`, `category` (enum: Hardware, Software, Plugin), `image` (media), `summary`, `body` (blocks).
- **testimonial** — `quote` (long text), `authorName`, `authorTitle`, `company`, `avatar` (media), `order`.
- **client-logo** — `name`, `logo` (media), `url`, `order`.
- **career** (Job listing) — `title`, `slug`, `location`, `type` (enum: Full-time/Part-time/Contract), `department`, `description` (blocks), `isOpen` (bool).
- **team-member** — `name`, `role`, `photo` (media), `bio`, `order`.
- **stat** — `value` (e.g. "20+"), `label` (e.g. "Number of Hardwares"), `order`.
- **lead** (form submissions) — `name`, `email`, `phone`, `company`, `message`, `source` (enum: Contact / Demo / Consultation). Restrict read to authenticated; allow create from server only.

### Reusable Components (for Dynamic Zones)
- `sections.hero` — heading, subtext, two CTAs, image.
- `sections.feature-cards` — title, subtitle, repeatable cards (icon, title, description) → used by **What We Do** and **Why Choose Us**.
- `sections.stats-band` — heading + relation/repeatable stats.
- `sections.product-portfolio` — heading, subtitle, headline, CTA, relation to portfolio items.
- `sections.cta-band` — heading, subtext, CTA.
- `sections.blog-teaser` — heading, CTA, count (number of latest posts to show).
- `sections.testimonials` — heading, subtitle, relation to testimonials.
- `sections.client-logos` — relation to client-logos.

Set **public read permissions** (Settings → Roles → Public) for all GET endpoints the site needs. Generate and commit a seed script (`cms/scripts/seed.ts`) that loads the content in §5.

## 4. Frontend Pages & Routing (Next.js App Router)

Build these routes; each fetches from Strapi and renders the matching Figma frame:

- `/` — **Homepage** (Figma `Final Design`, node `40:2`). Render the Dynamic Zone sections in order: Header → Hero → What We Do → Stats Band → Why Choose Us → Product Portfolio → CTA Band → Latest at Tathastu → Words Of Trust → Client Logos → Footer.
- `/industries` — Industries overview grid.
- `/industries/[slug]` — single industry (e.g. media-and-entertainment).
- `/studio` — Tathastu Studio page.
- `/academy` — Tathastu Academy page (Houdini training; "Where artists become production ready").
- `/about` — About Us.
- `/contact` — Contact Us (form → Lead).
- `/careers` — Career listings; `/careers/[slug]` for a job.
- `/blog` — list of posts; `/blog/[slug]` for a post.

Shared `Header` (sticky, with Solutions▾ and Industries▾ dropdowns) and `Footer` come from `siteSettings`. Add `generateMetadata` per page for SEO (title, description, Open Graph). Add `sitemap.ts` and `robots.ts`.

## 5. Seed Content (exact copy from the design — use verbatim)

**Header nav:** Home · Solutions ▾ · Industries ▾ · About · Contact · button "Get In Touch".

**Hero:** heading "Cutting-edge Solutions for Industries"; subtext "Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive."; CTAs "Get Consultation" (primary) and "Request Demo" (secondary).

**What We Do:** title "What We Do"; subtitle "Customized solutions for Marketing, Analytics and Infrastructure"; cards: Media & Entertainment · Architecture & Design (AEC) · Education & Training · Manufacturing & Visualization.

**Stats band:** heading "Join the community of Millions"; stats: "20+" Number of Hardwares · "80+" Number of Plugins · "4100+" Clients Served.

**Why Choose Us:** title "Why Choose Us?"; subtitle "Your Partner in Success—Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive."; cards:
- **Innovation** — "We deliver innovative tech solutions to help you deliver great results while managing your overall costs."
- **Client Focus** — "Doesn't matter how big or small your business is, Customer is always at the heart of our operations."
- **Expertise** — "Rely exclusively on our professionals' expertise for the best offers and solutions with their vast industry knowledge." *(fix original typo "thier" → "their")*
- **Reliability** — "Dependable and consistent solutions, ensuring quality results and trustworthiness every time."

**Product Portfolio:** title "Product Portfolio"; subtitle "High-Quality Solutions Designed for Every Need"; headline "Products Crafted to Meet Industry Standards"; category label "Hardware"; CTA "View All Portfolio".

**CTA band:** heading "Design Support for All Your Creative Needs"; subtext "Get a free introduction and discover how you and your team can change the way you source design forever"; CTA "Request Demo".

**Latest at Tathastu (blog teaser):** heading "Latest at Tathastu"; 3 cards, each with date, title, excerpt, "View Details"; section CTA "View All". (Replace the Lorem ipsum placeholders with real draft posts.)

**Words Of Trust (testimonials):** title "Words Of Trust"; subtitle "Trusted by customers, backed by results."
- Keitan Yadav — Chief Operating Officer, Redchillies.vfx — "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable."
- Anisha Karthik — CEO, PIXADOO — "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs. They go beyond simply providing products, offering effective solutions to our challenges, even within tight deadlines. We greatly appreciate their support and wish them continued success."

**Client logos:** HP · Adobe · SideFX · Toon Boom Storyboard Pro · Dell.

**Footer:** phone "+91 98201 92970"; email "info@tathastu.global" *(fix original "info@tathastu.global.com" double-TLD typo — confirm correct address with stakeholder)*; columns — **Tathastu**: About Us, Blog, Press, Career, Contact Us · **Industries**: Media and Entertainment, AEC, Manufacturing, Education, Government · **Professions**: Architects, Animators & Graphic Designers, VFX Expert, Product Designer; "Follow us:" social icons; "© Copyright 2026 Tathastu. All Rights Reserved".

*Note: the page named "Blogk" in Figma is a typo for "Blog" — use "Blog".*

## 6. Build Plan (execute in phases, pause at each checkpoint)

1. **Scaffold** the monorepo, Strapi 5 app, Next.js app, Tailwind, docker-compose, README. Checkpoint: both apps boot.
2. **Content model** in Strapi: create all types/components/relations from §3, set public permissions, enable Draft & Publish + i18n. Checkpoint: admin shows all collections.
3. **Seed** content from §5 via the seed script. Checkpoint: API returns populated data.
4. **Design tokens**: read palette/type/spacing from Figma MCP; define tokens. Export decorative SVG/PNG assets from Figma. Checkpoint: a Storybook or a `/styleguide` page shows tokens.
5. **Shared layout**: Header (with dropdowns, mobile menu) + Footer from `siteSettings`. Checkpoint.
6. **Homepage** section by section, fetching from Strapi. After each section, use the browser subagent to screenshot `localhost:3000` and compare to the Figma node; iterate until close.
7. **Remaining pages** (industries, studio, academy, about, contact+form, careers, blog).
8. **Polish**: responsive passes (mobile/tablet), accessibility (axe checks), SEO metadata, sitemap/robots, 404/500 pages, loading/error states.
9. **Verification**: run the checklist in §8.

## 7. `.antigravity-rules` (create this file at repo root)

```
- Always use TypeScript. No `any` without a comment justifying it.
- Frontend styling: Tailwind utility classes only; no inline styles; no CSS-in-JS.
- Pull all design values (color, spacing, font, radius) from the Figma MCP tools for file deDPqbRyTc2RS2noQDFgt1. Never hardcode a hex you didn't read from Figma without flagging it.
- Strapi: use the Strapi 5 Document Service API, not the deprecated v4 Entity Service.
- Next.js: prefer Server Components; fetch from Strapi REST with explicit populate; use ISR revalidate.
- Never put Strapi admin tokens or DB creds in client code or commit them. Use .env + .env.example.
- After building any page, screenshot it in the browser subagent and visually diff against the corresponding Figma frame before marking the task done.
- Keep components small and reusable; one section component per Figma section.
```

## 8. Acceptance Criteria / Verification

- [ ] All 9 routes render and are populated from Strapi (no hardcoded copy in components).
- [ ] Editing any field in Strapi admin updates the live page after revalidation.
- [ ] Homepage visually matches Figma node `40:2` (header, hero, what-we-do, stats, why-choose-us, portfolio, CTA, blog, testimonials, logos, footer) — verified by side-by-side screenshots.
- [ ] Fully responsive at 375 / 768 / 1280 / 1920 with no overflow or broken layouts.
- [ ] Contact + Demo + Consultation forms create `Lead` records in Strapi; validation + success/error states work.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on the homepage.
- [ ] `docker-compose up` brings up postgres + cms + web locally; README documents env vars and first-run steps.
- [ ] No secrets committed; `.env.example` present for both apps.

## 9. Deliverables

Working monorepo, seed script, `.env.example` files, README with setup + deploy notes, and a short `WALKTHROUGH.md` (Antigravity artifact) summarizing what was built, screenshots of each page next to its Figma frame, and any deviations from the design with reasons.
