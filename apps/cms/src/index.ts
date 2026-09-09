import type { Core } from "@strapi/strapi";

/**
 * Auto-sets public permissions for all frontend-needed APIs on startup.
 */
const PUBLIC_FIND_ACTIONS = [
  "api::homepage.homepage.find",
  "api::studio-page.studio-page.find",
  "api::academy-page.academy-page.find",
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

/**
 * Seeds the shared "Meet the Team" roster (used by both the Studio and
 * Academy pages). Runs independently of seedDatabase() so it also backfills
 * environments that were already seeded before these content-types existed.
 */
async function seedTeamMembers(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::team-member.team-member").findMany({});
  if (existing.length > 0) return existing;

  const membersData = [
    { name: "Nikitha Gaikwad", role: "Marketing Manager", bgColor: "#D6EAF8", order: 1 },
    { name: "Chetan Jain", role: "Founder & CEO", bgColor: "#D5F5E3", order: 2 },
    { name: "Nikitha Gaikwad", role: "President of Sales", bgColor: "#E8DAEF", order: 3 },
    { name: "Venu Victor", role: "Co-founder and VFX Supervisor", bgColor: "#FDEBD0", order: 4 },
  ];

  const created: any[] = [];
  for (const member of membersData) {
    created.push(await strapi.documents("api::team-member.team-member").create({ data: member }));
  }
  return created;
}

/**
 * Seeds the Studio Page singleType with one component per section of the
 * built Studio UI (apps/web/app/studio/page.tsx). Runs independently of
 * seedDatabase() so it also backfills environments that were already seeded
 * before the Studio Page content-type existed.
 */
async function seedStudioPage(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::studio-page.studio-page").findFirst({});
  if (existing) {
    strapi.log.info("🌱 Studio page already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Studio page...");

  const members = await seedTeamMembers(strapi);

  await strapi.documents("api::studio-page.studio-page").create({
    data: {
      seoTitle: "Tathastu Studio — Solutions & Products",
      seoDescription: "Explore our product portfolio of hardware workstations, industry-standard 3D software, and custom plugins.",
      sections: [
        {
          __component: "sections.studio-hero",
          wordmarkLine1: "TATHASTU",
          wordmarkLine2: "STUDIO",
          heading: "Tathastu Studio",
          subtext: "The Premier Hub of Houdini Professionals",
          ctaLabel: "Contact Us",
          ctaHref: "/contact?source=Studio",
        },
        {
          __component: "sections.studio-connect",
          heading: "Connect with Industry-Leading Houdini Specialists",
          description:
            "Whether you're a filmmaker, studio, or creative director looking for top-tier Houdini talent — or a Houdini artist seeking new opportunities — Tathastu is your destination.\n\nIf you're looking for Houdini work for your project, make use of the skills of our freelance artists to bring your creative vision to life through high-quality, collaborative, and economical solutions.",
        },
        {
          __component: "sections.studio-trusted",
          heading: "Trusted by Studios",
          subtitle: "We're proud to be the go-to Houdini resource for both creators and clients across the industry.",
          ctaLabel: "Contact Now",
          ctaHref: "/contact?source=TrustedByStudios",
        },
        {
          __component: "sections.studio-who-we-are",
          heading: "Who We Are",
          description:
            "Welcome to Tathastu Studio, a dedicated collective built exclusively from Houdini specialists across India and beyond. Each artist is carefully selected based on their skills and experience in Houdini. Our vibrant community of technical and artistic talent is the heart of everything we do. United by a passion for procedural creativity and problem-solving, our artists bring innovation, precision, and cinematic magic to your project.",
          points: [
            { text: "Specialized Houdini FX Expertise – Delivering high-quality simulations, effects, and procedural workflows for film, TV, and advertising projects." },
            { text: "Global Remote Talent Network – Connecting top-tier VFX studios with skilled freelance Houdini artists worldwide." },
            { text: "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs." },
            { text: "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs." },
          ],
        },
        {
          __component: "sections.studio-what-we-do",
          heading: "What We Do",
          subtitle: "You share your artistic and technical intent — we translate that into dynamic visual FX:",
          cards: [
            { label: "Fire" },
            { label: "Smoke" },
            { label: "Explosions" },
            { label: "Water" },
            { label: "Rain" },
            { label: "Snow" },
            { label: "Ocean simulations" },
            { label: "Dust" },
          ],
          ctaLabel: "View More",
          ctaHref: "/portfolio?source=WhatWeDo",
        },
        {
          __component: "sections.studio-meet-team",
          heading: "Meet",
          headingHighlight: "the Team",
          subtitle: "Industry veterans and visionary leaders driving the future of professional VFX collaboration",
          members: members.map((m) => m.documentId),
        },
        {
          __component: "sections.studio-purpose",
          headingPrefix: "Our",
          headingHighlight: "Purpose",
          subtitle: "To build a dynamic, scalable, and globally connected Houdini FX production ecosystem that:",
          points: [
            { text: "Delivers high-quality FX services to filmmakers, studios, and content creators" },
            { text: "Leverages top freelance talent from India and beyond" },
            { text: "Removes infrastructure barriers with a fully virtual pipeline" },
            { text: "Empowers artists through flexibility, creativity, and project-based work culture" },
            { text: "Adapts to changing needs with agile, scalable solutions" },
          ],
        },
        {
          __component: "sections.studio-find-inside",
          heading: "What You'll Find",
          headingHighlight: "Inside",
          studioToggleLabel: "For Studios",
          freelancerToggleLabel: "For Freelancers",
          studioContacts: [
            { name: "Email", email: "academy@tathastu.global", phone: "+91 81256 13838" },
            { name: "Chetan Jain", phone: "+91 98201 92970", email: "chetan@tathastu.global" },
            { name: "Venu Victor", phone: "+91 96111 04802" },
          ],
          freelancerContacts: [],
        },
        {
          __component: "sections.studio-footer",
          taglineLine1: "Tathastu Studio isn't a trend.",
          taglineLine2Plain: "It's a",
          taglineHighlight: "turning point",
          ctaText: "THE FUTURE OF HOUDINI FREELANCING IS HERE. LET'S BUILD THE NEXT GENERATION OF HIGH-END VFX TOGETHER",
          subtextBefore: "",
          subtextHighlight1: "Your story,",
          subtextMiddle: "our innovation — let's make it",
          subtextHighlight2: "unforgettable.",
        },
      ],
    },
    status: "published",
  });

  strapi.log.info("🌱 Studio page seeded successfully!");
}

/**
 * Seeds the Academy Page singleType with one component per section of the
 * built Academy UI (apps/web/app/academy/page.tsx). Runs independently of
 * seedDatabase() so it also backfills environments that were already seeded
 * before the Academy Page content-type existed.
 */
async function seedAcademyPage(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::academy-page.academy-page").findFirst({});
  if (existing) {
    strapi.log.info("🌱 Academy page already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Academy page...");

  const members = await seedTeamMembers(strapi);

  await strapi.documents("api::academy-page.academy-page").create({
    data: {
      seoTitle: "Tathastu Academy — Learn. Rise. Lead.",
      seoDescription:
        "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning.",
      sections: [
        {
          __component: "sections.academy-hero",
          wordmarkLine1: "TATHASTU",
          wordmarkLine2: "ACADEMY",
          tagline: "Learn. Rise. Lead.",
          heading: "From beginner to pro— become a production-ready Houdini artist.",
          subtext:
            "Tathastu Academy empowers future Houdini artists with industry-focused, project-driven training for real-world production success.",
          ctaLabel: "Book A Call",
          ctaHref: "/contact?source=Academy",
        },
        {
          __component: "sections.academy-about",
          headingLine1: "Not just teaching.",
          headingHighlight: "Building careers.",
          description:
            "Tathastu Academy, powered by Tathastu Techno Solution and an official SideFX partner, delivers studio-focused Houdini training designed to create production-ready artists for the VFX industry.",
          features: [
            {
              title: "Project-Driven Learning",
              description: "Every module builds toward real deliverables studios actually expect.",
            },
            {
              title: "Studio-Aligned Curriculum",
              description: "Courses designed in collaboration with real production pipelines.",
            },
            {
              title: "Talent Pipeline for Studios",
              description: "Book seats in advance and hire trained, ready-to-deploy artists.",
            },
          ],
          ctaLabel: "Talk to Us",
          ctaHref: "/contact?source=Academy",
        },
        {
          __component: "sections.academy-programs",
          heading: "Training for every stage of",
          headingHighlight: "your Houdini journey",
          subtitle: "Cutting edge training programs designed for the future of digital creation.",
          programs: [
            {
              title: "Studio Houdini Training",
              description:
                "Custom in-house Houdini training built around your studio's exact production requirements and L&D goals.",
              items: [
                { text: "Crafted with your L&D team" },
                { text: "Flip, Pyro, Destruction, Groom, USD & more" },
                { text: "Flexible seat or full-batch bookings" },
                { text: "Trusted by leading VFX & animation studios" },
              ],
              ctaLabel: "Book Studio Training",
              ctaHref: "/contact?program=Studio",
            },
            {
              title: "Beginner Houdini Training",
              description: "Our flagship Academy trains a hand-picked batch of 15 students in Houdini from the ground up.",
              items: [
                { text: "Studio-ready projects aligned with real pipelines" },
                { text: "Hand-picked cohort of 15 students" },
                { text: "Advance studio seat reservations available" },
                { text: "Full Houdini fundamentals to production workflows" },
              ],
              ctaLabel: "Join Batch",
              ctaHref: "/contact?program=Beginner",
            },
            {
              title: "Advanced Houdini Training",
              description: "Short-term intensive sessions led by industry experts — focused deep dives into specific Houdini workflows.",
              items: [
                { text: "Expert-led deep dives into advanced workflows" },
                { text: "Focus: USD, Groom, Tech Animation & more" },
                { text: "Targeted skill-building for working artists" },
                { text: "Studio seat reservations available" },
              ],
              ctaLabel: "Join Batch",
              ctaHref: "/contact?program=Advanced",
            },
          ],
        },
        {
          __component: "sections.academy-why-us",
          heading: "Why Choose Tathastu",
          headingHighlight: "Academy",
          subtitle: "We are not just another training institute. We are the bridge between where you are and where the industry needs you to be.",
          cards: [
            {
              title: "Authorized SideFX Partner",
              description: "Officially recognized by SideFX for delivering world-class Houdini training in India.",
            },
            {
              title: "Project-Driven Learning",
              description: "Learn by doing, not by theory. Every lesson feeds into real, studio-grade deliverables.",
            },
            {
              title: "Studio-Aligned Curriculum",
              description: "Courses designed with actual studios grounded in real production pipelines.",
            },
            {
              title: "Expert Industry Mentors",
              description: "Learn from trainers with direct, hands-on experience from top studio productions.",
            },
            {
              title: "Talent Pipeline for Studios",
              description: "Studios can reserve seats ahead of time and hire artists ready to contribute from day one.",
            },
            {
              title: "Capped at 15 Per Batch",
              description: "Small cohorts ensure every student receives personal guidance and focused mentorship.",
            },
          ],
          ctaLabel: "Talk to an Advisor",
          ctaHref: "/contact?source=WhyUs",
        },
        {
          __component: "sections.academy-courses",
          heading: "Latest Courses &",
          headingHighlight: "Videos",
          subtitle: "Explore our newest tutorials, expert-led courses, and practical learning resources.",
          courses: [
            {
              title: "AI for Interior Design",
              description: "Create cinematic interior renders using AI — from rough sketches to fully",
              duration: "7-Weeks",
              badge: "NEW",
              isVideo: false,
            },
            {
              title: "Compositing in Nuke",
              description: "Learn compositing like a pro in this incredible Nuke course for FX Artists",
              duration: "10-Weeks",
              isVideo: false,
            },
            {
              title: "Intro to Unreal Engine",
              description: "Learn the basics of Unreal Engine in this exciting game design course.",
              duration: "8-Weeks",
              isVideo: false,
            },
            {
              title: "Intro to Houdini FX",
              description: "Ready to get serious about your FX journey? Check out this intermediate",
              duration: "12-Weeks",
              isVideo: false,
            },
            {
              title: "Coding Generative AI",
              description: "A deep dive into applied generative AI, guiding students from foundational AI",
              duration: "10-Weeks",
              badge: "NEW",
              isVideo: true,
            },
            {
              title: "Unreal Engine Short Film",
              description: "Learn how to create a short film using Unreal Engine.",
              duration: "INSTANT ACCESS",
              isVideo: false,
            },
          ],
          ctaLabel: "View All",
          ctaHref: "/academy/courses&videos",
        },
        {
          __component: "sections.academy-specialization",
          headingLine1: "Every Houdini",
          headingLine2Plain: "Workflow,",
          headingHighlight: "Covered",
          specializations: [
            { label: "Flip Simulations" },
            { label: "Pyro & Smoke" },
            { label: "Destruction & RBD" },
            { label: "Environment & FX" },
            { label: "Groom" },
            { label: "Tech Animation" },
            { label: "Shading & Lighting" },
            { label: "USD Workflows" },
          ],
        },
        {
          __component: "sections.academy-meet-team",
          heading: "Meet",
          headingHighlight: "the Team",
          subtitle: "Industry veterans and visionary leaders driving the future of professional VFX collaboration",
          members: members.map((m) => m.documentId),
        },
        {
          __component: "sections.cta-band",
          heading: "Ready to Launch Your Houdini Career?",
          subtext:
            "The demand for Houdini trained, production ready artists is higher than ever. Whether you are an aspiring professional or a studio looking to upskill your team, Tathastu Academy is here to help.",
          ctaLabel: "Request Demo",
          ctaHref: "/contact?source=Academy",
        },
      ],
    },
    status: "published",
  });

  strapi.log.info("🌱 Academy page seeded successfully!");
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    await seedDatabase(strapi);
    await seedStudioPage(strapi);
    await seedAcademyPage(strapi);
  },
};
