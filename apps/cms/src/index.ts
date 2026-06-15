import type { Core } from "@strapi/strapi";

/**
 * Auto-sets public permissions for all frontend-needed APIs on startup.
 */
const PUBLIC_FIND_ACTIONS = [
  "api::homepage.homepage.find",
  "api::site-setting.site-setting.find",
  "api::about-page.about-page.find",
  "api::contact-page.contact-page.find",
  "api::blog-post.blog-post.find",
  "api::blog-post.blog-post.findOne",
  "api::industry.industry.find",
  "api::industry.industry.findOne",
  "api::portfolio-item.portfolio-item.find",
  "api::portfolio-item.portfolio-item.findOne",
  "api::testimonial.testimonial.find",
  "api::testimonial.testimonial.findOne",
  "api::client-logo.client-logo.find",
  "api::client-logo.client-logo.findOne",
  "api::stat.stat.find",
  "api::stat.stat.findOne",
  "api::career.career.find",
  "api::career.career.findOne",
  "api::team-member.team-member.find",
  "api::team-member.team-member.findOne",
];

const PUBLIC_CREATE_ACTIONS = ["api::lead.lead.create"];

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) {
    strapi.log.warn("Public role not found — skipping permission setup");
    return;
  }

  const existingPermissions: Array<{ action: string }> = await strapi
    .query("plugin::users-permissions.permission")
    .findMany({ where: { role: { id: publicRole.id } } });

  const existingActions = new Set(existingPermissions.map((p) => p.action));

  const toCreate = [...PUBLIC_FIND_ACTIONS, ...PUBLIC_CREATE_ACTIONS]
    .filter((action) => !existingActions.has(action))
    .map((action) => ({ action, role: publicRole.id }));

  if (toCreate.length > 0) {
    await strapi
      .query("plugin::users-permissions.permission")
      .createMany({ data: toCreate });
    
    // Also insert raw links since createMany might not trigger relation hook
    const db = strapi.db.connection;
    const createdPerms: Array<{ id: number; action: string }> = await strapi
      .query("plugin::users-permissions.permission")
      .findMany({ where: { action: { $in: toCreate.map(c => c.action) } } });

    const links = createdPerms.map((p, idx) => ({
      permission_id: p.id,
      role_id: publicRole.id,
      permission_ord: idx + 1.0,
    }));

    if (links.length > 0) {
      await db("up_permissions_role_lnk").insert(links);
    }

    strapi.log.info(`✅ Set ${toCreate.length} public permissions and links for frontend access`);
  } else {
    strapi.log.info("✅ Public permissions already configured");
  }
}

async function seedDatabase(strapi: Core.Strapi) {
  strapi.log.info("🌱 Checking if Tathastu database needs seeding...");

  // Check if stats are already seeded
  const existingStats = await strapi.documents("api::stat.stat").findMany({});
  if (existingStats.length > 0) {
    strapi.log.info("🌱 Database already seeded. Skipping seed.");
    return;
  }

  strapi.log.info("🌱 Seeding Tathastu database with demo and Figma content...");

  // 1. Stats
  const statsData = [
    { value: "20+", label: "Number of Hardwares", order: 1 },
    { value: "80+", label: "Number of Plugins", order: 2 },
    { value: "4100+", label: "Clients Served", order: 3 },
  ];
  const stats: any[] = [];
  for (const stat of statsData) {
    const created = await strapi.documents("api::stat.stat").create({ data: stat });
    stats.push(created);
  }

  // 2. Testimonials
  const testimonialsData = [
    {
      quote: "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable.",
      authorName: "Keitan Yadav",
      authorTitle: "Chief Operating Officer",
      company: "Redchillies.vfx",
      order: 1,
    },
    {
      quote: "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs. They go beyond simply providing products, offering effective solutions to our challenges, even within tight deadlines. We greatly appreciate their support and wish them continued success.",
      authorName: "Anisha Karthik",
      authorTitle: "CEO",
      company: "PIXADOO",
      order: 2,
    },
  ];
  const testimonials: any[] = [];
  for (const t of testimonialsData) {
    const created = await strapi.documents("api::testimonial.testimonial").create({ data: t });
    testimonials.push(created);
  }

  // 3. Client Logos
  const clientLogosData = [
    { name: "HP", url: "https://hp.com", order: 1 },
    { name: "Adobe", url: "https://adobe.com", order: 2 },
    { name: "SideFX", url: "https://sidefx.com", order: 3 },
    { name: "Toon Boom", url: "https://toonboom.com", order: 4 },
    { name: "Dell", url: "https://dell.com", order: 5 },
  ];
  const clientLogos: any[] = [];
  for (const cl of clientLogosData) {
    const created = await strapi.documents("api::client-logo.client-logo").create({ data: cl });
    clientLogos.push(created);
  }

  // 4. Industries
  const industriesData = [
    {
      name: "Media & Entertainment",
      slug: "media-and-entertainment",
      shortDescription: "Cutting-edge tools for VFX, animation, and post-production professionals in film and broadcast.",
      order: 1,
    },
    {
      name: "Architecture & Design (AEC)",
      slug: "architecture-aec",
      shortDescription: "Powerful visualization and design software for architects, engineers, and construction professionals.",
      order: 2,
    },
    {
      name: "Education & Training",
      slug: "education-and-training",
      shortDescription: "Industry-standard software and learning tools to prepare the next generation of creative professionals.",
      order: 3,
    },
    {
      name: "Manufacturing & Visualization",
      slug: "manufacturing-and-visualization",
      shortDescription: "Advanced simulation and visualization solutions for product design and manufacturing workflows.",
      order: 4,
    },
    {
      name: "Government",
      slug: "government",
      shortDescription: "Technology solutions for government agencies and public sector organizations.",
      order: 5,
    },
  ];
  for (const ind of industriesData) {
    await strapi.documents("api::industry.industry").create({ data: ind, status: "published" });
  }

  // 5. Portfolio Items
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
  for (const port of portfolioData) {
    await strapi.documents("api::portfolio-item.portfolio-item").create({ data: port, status: "published" });
  }

  // 6. Blog Posts
  const blogPostsData = [
    {
      title: "Houdini 20.5: What's New for VFX Artists",
      slug: "houdini-20-5-whats-new",
      excerpt: "SideFX has released Houdini 20.5 with major improvements to USD workflows, KineFX rigging, and real-time rendering. Here's a breakdown of the features that matter most to production artists.",
      category: "Software",
      publishedDate: new Date("2026-05-15").toISOString(),
    },
    {
      title: "Why Your Studio Needs a Certified VFX Workstation",
      slug: "certified-vfx-workstation-guide",
      excerpt: "Off-the-shelf consumer PCs might handle light work, but serious VFX production demands ISV-certified hardware. We explain what certification means and why it matters for your pipeline.",
      category: "Hardware",
      publishedDate: new Date("2026-04-28").toISOString(),
    },
    {
      title: "Tathastu Academy: Our First Houdini Batch Graduates",
      slug: "tathastu-academy-first-houdini-batch",
      excerpt: "We're proud to announce that our inaugural Houdini FX certification batch has graduated. Read about their journey from beginner to production-ready in just 16 weeks.",
      category: "Academy",
      publishedDate: new Date("2026-06-01").toISOString(),
    },
  ];
  for (const post of blogPostsData) {
    await strapi.documents("api::blog-post.blog-post").create({ data: post, status: "published" });
  }

  // 7. Site Settings
  await strapi.documents("api::site-setting.site-setting").create({
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

  // 8. Homepage
  await strapi.documents("api::homepage.homepage").create({
    data: {
      seoTitle: "Tathastu Techno Solution — Cutting-edge Solutions for Creative Industries",
      seoDescription: "Tathastu provides hardware, software, and plugins for VFX, AEC, education, and manufacturing. Authorized reseller of Houdini, HP, Dell, Adobe, and more.",
      sections: [
        {
          __component: "sections.hero",
          heading: "Cutting-edge Solutions for Industries",
          subtext: "Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive.",
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
              description: "Professional VFX, animation, and post-production tools for film, TV, and streaming studios.",
            },
            {
              title: "Architecture & Design (AEC)",
              description: "High-performance visualization and BIM software for architects and construction professionals.",
            },
            {
              title: "Education & Training",
              description: "Industry-standard tools and training programs to develop the next generation of creative talent.",
            },
            {
              title: "Manufacturing & Visualization",
              description: "Advanced simulation and product visualization solutions for manufacturing and engineering teams.",
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
          subtitle: "Your Partner in Success—Combining Expertise, Innovation, and Unmatched Support to Provide Solutions That Help Your Business Thrive.",
          cards: [
            {
              title: "Innovation",
              description: "We deliver innovative tech solutions to help you deliver great results while managing your overall costs.",
            },
            {
              title: "Client Focus",
              description: "Doesn't matter how big or small your business is, Customer is always at the heart of our operations.",
            },
            {
              title: "Expertise",
              description: "Rely exclusively on our professionals' expertise for the best offers and solutions with their vast industry knowledge.",
            },
            {
              title: "Reliability",
              description: "Dependable and consistent solutions, ensuring quality results and trustworthiness every time.",
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
          subtext: "Get a free introduction and discover how you and your team can change the way you source design forever",
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

  // 9. Contact Page
  await strapi.documents("api::contact-page.contact-page").create({
    data: {
      seoTitle: "Contact Us — Tathastu Techno Solution",
      seoDescription: "Get in touch with Tathastu for hardware, software, and plugin inquiries. Request a demo or consultation.",
      heroHeading: "Get In Touch",
      heroSubtext: "Have a question or ready to get started? Reach out and our team will get back to you shortly.",
      formHeading: "Send Us a Message",
    },
    status: "published",
  });

  // 10. About Page
  await strapi.documents("api::about-page.about-page").create({
    data: {
      seoTitle: "About Us — Tathastu Techno Solution",
      seoDescription: "Learn about Tathastu Techno Solution — India's leading reseller of VFX, AEC, and creative industry hardware and software.",
      heroHeading: "About Tathastu Techno Solution",
      heroSubtext: "We are a B2B technology company dedicated to empowering creative professionals with the best hardware, software, and plugins in the industry.",
      teamHeading: "Meet the Team",
    },
    status: "published",
  });

  strapi.log.info("🌱 Database seeded successfully!");
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    await seedDatabase(strapi);
  },
};
