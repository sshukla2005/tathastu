/**
 * Tathastu CMS Seed Script
 * Populates all collections with content from the Figma design brief.
 *
 * Usage:
 *   npx ts-node scripts/seed.ts
 *   (or add to package.json: "seed": "ts-node scripts/seed.ts")
 *
 * Requires Strapi to be running or the DB to be bootstrapped.
 * This script uses the Strapi programmatic API via bootstrap.
 */

import Strapi from "@strapi/strapi";

async function seed() {
  console.log("🌱 Starting Tathastu seed...");

  const app = await Strapi({ distDir: "./dist" }).load();

  // ─── Stats ──────────────────────────────────────────────────────────────────
  console.log("  Creating stats...");
  const statsData = [
    { value: "20+", label: "Number of Hardwares", order: 1 },
    { value: "80+", label: "Number of Plugins", order: 2 },
    { value: "4100+", label: "Clients Served", order: 3 },
  ];

  const stats: Array<{ documentId: string }> = [];
  for (const stat of statsData) {
    const existing = await app.documents("api::stat.stat").findMany({
      filters: { label: stat.label },
    });
    if (existing.length === 0) {
      const created = await app.documents("api::stat.stat").create({ data: stat });
      stats.push(created);
    } else {
      stats.push(existing[0]);
    }
  }

  // ─── Testimonials ────────────────────────────────────────────────────────────
  console.log("  Creating testimonials...");
  const testimonialsData = [
    {
      quote:
        "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable.",
      authorName: "Keitan Yadav",
      authorTitle: "Chief Operating Officer",
      company: "Redchillies.vfx",
      order: 1,
    },
    {
      quote:
        "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs. They go beyond simply providing products, offering effective solutions to our challenges, even within tight deadlines. We greatly appreciate their support and wish them continued success.",
      authorName: "Anisha Karthik",
      authorTitle: "CEO",
      company: "PIXADOO",
      order: 2,
    },
  ];

  const testimonials: Array<{ documentId: string }> = [];
  for (const t of testimonialsData) {
    const existing = await app.documents("api::testimonial.testimonial").findMany({
      filters: { authorName: t.authorName },
    });
    if (existing.length === 0) {
      const created = await app.documents("api::testimonial.testimonial").create({ data: t });
      testimonials.push(created);
    } else {
      testimonials.push(existing[0]);
    }
  }

  // ─── Client Logos ─────────────────────────────────────────────────────────
  console.log("  Creating client logos...");
  const clientLogosData = [
    { name: "HP", url: "https://hp.com", order: 1 },
    { name: "Adobe", url: "https://adobe.com", order: 2 },
    { name: "SideFX", url: "https://sidefx.com", order: 3 },
    { name: "Toon Boom", url: "https://toonboom.com", order: 4 },
    { name: "Dell", url: "https://dell.com", order: 5 },
  ];

  const clientLogos: Array<{ documentId: string }> = [];
  for (const cl of clientLogosData) {
    const existing = await app.documents("api::client-logo.client-logo").findMany({
      filters: { name: cl.name },
    });
    if (existing.length === 0) {
      const created = await app.documents("api::client-logo.client-logo").create({ data: cl });
      clientLogos.push(created);
    } else {
      clientLogos.push(existing[0]);
    }
  }

  // ─── Industries ──────────────────────────────────────────────────────────────
  console.log("  Creating industries...");
  const industriesData = [
    {
      name: "Media & Entertainment",
      slug: "media-and-entertainment",
      shortDescription:
        "Cutting-edge tools for VFX, animation, and post-production professionals in film and broadcast.",
      order: 1,
    },
    {
      name: "Architecture & Design (AEC)",
      slug: "architecture-aec",
      shortDescription:
        "Powerful visualization and design software for architects, engineers, and construction professionals.",
      order: 2,
    },
    {
      name: "Education & Training",
      slug: "education-and-training",
      shortDescription:
        "Industry-standard software and learning tools to prepare the next generation of creative professionals.",
      order: 3,
    },
    {
      name: "Manufacturing & Visualization",
      slug: "manufacturing-and-visualization",
      shortDescription:
        "Advanced simulation and visualization solutions for product design and manufacturing workflows.",
      order: 4,
    },
    {
      name: "Government",
      slug: "government",
      shortDescription:
        "Technology solutions for government agencies and public sector organizations.",
      order: 5,
    },
  ];

  for (const industry of industriesData) {
    const existing = await app.documents("api::industry.industry").findMany({
      filters: { slug: industry.slug },
    });
    if (existing.length === 0) {
      await app.documents("api::industry.industry").create({
        data: industry,
        status: "published",
      });
    }
  }

  // ─── Portfolio Items ──────────────────────────────────────────────────────────
  console.log("  Creating portfolio items...");
  const portfolioData = [
    {
      title: "Houdini FX",
      slug: "houdini-fx",
      category: "Software" as const,
      summary: "Industry-leading 3D procedural software for film, TV, and game effects.",
    },
    {
      title: "HP Z Workstation",
      slug: "hp-z-workstation",
      category: "Hardware" as const,
      summary: "High-performance workstations certified for VFX and creative workflows.",
    },
    {
      title: "Dell Precision",
      slug: "dell-precision",
      category: "Hardware" as const,
      summary: "ISV-certified mobile and desktop workstations for demanding creative tasks.",
    },
    {
      title: "SideFX Plugins",
      slug: "sidefx-plugins",
      category: "Plugin" as const,
      summary: "Curated collection of Houdini plugins to accelerate production pipelines.",
    },
  ];

  for (const item of portfolioData) {
    const existing = await app.documents("api::portfolio-item.portfolio-item").findMany({
      filters: { slug: item.slug },
    });
    if (existing.length === 0) {
      await app.documents("api::portfolio-item.portfolio-item").create({
        data: item,
        status: "published",
      });
    }
  }

  // ─── Blog Posts ──────────────────────────────────────────────────────────────
  console.log("  Creating blog posts...");
  const blogPostsData = [
    {
      title: "Houdini 20.5: What's New for VFX Artists",
      slug: "houdini-20-5-whats-new",
      excerpt:
        "SideFX has released Houdini 20.5 with major improvements to USD workflows, KineFX rigging, and real-time rendering. Here's a breakdown of the features that matter most to production artists.",
      category: "Software",
      publishedDate: new Date("2026-05-15").toISOString(),
    },
    {
      title: "Why Your Studio Needs a Certified VFX Workstation",
      slug: "certified-vfx-workstation-guide",
      excerpt:
        "Off-the-shelf consumer PCs might handle light work, but serious VFX production demands ISV-certified hardware. We explain what certification means and why it matters for your pipeline.",
      category: "Hardware",
      publishedDate: new Date("2026-04-28").toISOString(),
    },
    {
      title: "Tathastu Academy: Our First Houdini Batch Graduates",
      slug: "tathastu-academy-first-houdini-batch",
      excerpt:
        "We're proud to announce that our inaugural Houdini FX certification batch has graduated. Read about their journey from beginner to production-ready in just 16 weeks.",
      category: "Academy",
      publishedDate: new Date("2026-06-01").toISOString(),
    },
  ];

  for (const post of blogPostsData) {
    const existing = await app.documents("api::blog-post.blog-post").findMany({
      filters: { slug: post.slug },
    });
    if (existing.length === 0) {
      await app.documents("api::blog-post.blog-post").create({
        data: post,
        status: "published",
      });
    }
  }

  // ─── Site Settings ────────────────────────────────────────────────────────────
  console.log("  Creating site settings...");
  const existingSettings = await app.documents("api::site-setting.site-setting").findFirst({});

  if (!existingSettings) {
    await app.documents("api::site-setting.site-setting").create({
      data: {
        headerCtaLabel: "Get In Touch",
        headerCtaHref: "/contact",
        phone: "+91 98201 92970",
        email: "info@tathastu.global",
        copyrightText: "© Copyright 2026 Tathastu. All Rights Reserved.",
        nav: [
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/studio" },
          { label: "Industries", href: "/industries" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
        footerColumns: [
          {
            title: "Tathastu",
            links: [
              { label: "About Us", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Press", href: "/about#press" },
              { label: "Career", href: "/careers" },
              { label: "Contact Us", href: "/contact" },
            ],
          },
          {
            title: "Industries",
            links: [
              { label: "Media and Entertainment", href: "/industries/media-and-entertainment" },
              { label: "AEC", href: "/industries/architecture-aec" },
              { label: "Manufacturing", href: "/industries/manufacturing-and-visualization" },
              { label: "Education", href: "/industries/education-and-training" },
              { label: "Government", href: "/industries/government" },
            ],
          },
          {
            title: "Professions",
            links: [
              { label: "Architects", href: "/industries/architecture-aec" },
              { label: "Animators & Graphic Designers", href: "/industries/media-and-entertainment" },
              { label: "VFX Expert", href: "/studio" },
              { label: "Product Designer", href: "/industries/manufacturing-and-visualization" },
            ],
          },
        ],
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com/tathastu" },
          { platform: "twitter", url: "https://twitter.com/tathastu" },
          { platform: "linkedin", url: "https://linkedin.com/company/tathastu" },
        ],
      },
    });
  }

  // ─── Homepage ─────────────────────────────────────────────────────────────────
  console.log("  Creating homepage...");
  const existingHomepage = await app.documents("api::homepage.homepage").findFirst({});

  if (!existingHomepage) {
    await app.documents("api::homepage.homepage").create({
      data: {
        seoTitle: "Tathastu Techno Solution — Cutting-edge Solutions for Creative Industries",
        seoDescription:
          "Tathastu provides hardware, software, and plugins for VFX, AEC, education, and manufacturing. Authorized reseller of Houdini, HP, Dell, Adobe, and more.",
        sections: [
          {
            __component: "sections.hero",
            heading: "Cutting-edge Solutions for Industries",
            subtext:
              "Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive.",
            primaryCtaLabel: "Get Consultation",
            primaryCtaHref: "/contact?source=Consultation",
            secondaryCtaLabel: "Request Demo",
            secondaryCtaHref: "/contact?source=Demo",
          },
          {
            __component: "sections.feature-cards",
            title: "What We Do",
            subtitle: "Customized solutions for Marketing, Analytics and Infrastructure",
            cards: [
              {
                title: "Media & Entertainment",
                description:
                  "Professional VFX, animation, and post-production tools for film, TV, and streaming studios.",
              },
              {
                title: "Architecture & Design (AEC)",
                description:
                  "High-performance visualization and BIM software for architects and construction professionals.",
              },
              {
                title: "Education & Training",
                description:
                  "Industry-standard tools and training programs to develop the next generation of creative talent.",
              },
              {
                title: "Manufacturing & Visualization",
                description:
                  "Advanced simulation and product visualization solutions for manufacturing and engineering teams.",
              },
            ],
          },
          {
            __component: "sections.stats-band",
            heading: "Join the community of Millions",
            stats: stats.map((s) => s.documentId),
          },
          {
            __component: "sections.feature-cards",
            title: "Why Choose Us?",
            subtitle:
              "Your Partner in Success—Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive.",
            cards: [
              {
                title: "Innovation",
                description:
                  "We deliver innovative tech solutions to help you deliver great results while managing your overall costs.",
              },
              {
                title: "Client Focus",
                description:
                  "Doesn't matter how big or small your business is, Customer is always at the heart of our operations.",
              },
              {
                title: "Expertise",
                description:
                  "Rely exclusively on our professionals' expertise for the best offers and solutions with their vast industry knowledge.",
              },
              {
                title: "Reliability",
                description:
                  "Dependable and consistent solutions, ensuring quality results and trustworthiness every time.",
              },
            ],
          },
          {
            __component: "sections.product-portfolio",
            heading: "Product Portfolio",
            subtitle: "High-Quality Solutions Designed for Every Need",
            headline: "Products Crafted to Meet Industry Standards",
            ctaLabel: "View All Portfolio",
            ctaHref: "/studio",
          },
          {
            __component: "sections.cta-band",
            heading: "Design Support for All Your Creative Needs",
            subtext:
              "Get a free introduction and discover how you and your team can change the way you source design forever",
            ctaLabel: "Request Demo",
            ctaHref: "/contact?source=Demo",
          },
          {
            __component: "sections.blog-teaser",
            heading: "Latest at Tathastu",
            ctaLabel: "View All",
            ctaHref: "/blog",
            count: 3,
          },
          {
            __component: "sections.testimonials",
            heading: "Words Of Trust",
            subtitle: "Trusted by customers, backed by results.",
            testimonials: testimonials.map((t) => t.documentId),
          },
          {
            __component: "sections.client-logos",
            logos: clientLogos.map((cl) => cl.documentId),
          },
        ],
      },
      status: "published",
    });
  }

  // ─── Contact Page ─────────────────────────────────────────────────────────────
  console.log("  Creating contact page...");
  const existingContact = await app.documents("api::contact-page.contact-page").findFirst({});
  if (!existingContact) {
    await app.documents("api::contact-page.contact-page").create({
      data: {
        seoTitle: "Contact Us — Tathastu Techno Solution",
        seoDescription:
          "Get in touch with Tathastu for hardware, software, and plugin inquiries. Request a demo or consultation.",
        heroHeading: "Get In Touch",
        heroSubtext:
          "Have a question or ready to get started? Reach out and our team will get back to you shortly.",
        formHeading: "Send Us a Message",
      },
      status: "published",
    });
  }

  // ─── About Page ───────────────────────────────────────────────────────────────
  console.log("  Creating about page...");
  const existingAbout = await app.documents("api::about-page.about-page").findFirst({});
  if (!existingAbout) {
    await app.documents("api::about-page.about-page").create({
      data: {
        seoTitle: "About Us — Tathastu Techno Solution",
        seoDescription:
          "Learn about Tathastu Techno Solution — India's leading reseller of VFX, AEC, and creative industry hardware and software.",
        heroHeading: "About Tathastu Techno Solution",
        heroSubtext:
          "We are a B2B technology company dedicated to empowering creative professionals with the best hardware, software, and plugins in the industry.",
        teamHeading: "Meet the Team",
      },
      status: "published",
    });
  }

  console.log("\n✅ Seed complete!");
  await app.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
