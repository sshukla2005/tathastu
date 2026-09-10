import type { Core } from "@strapi/strapi";

/**
 * Auto-sets public permissions for all frontend-needed APIs on startup.
 */
const PUBLIC_FIND_ACTIONS = [
  "api::homepage.homepage.find",
  "api::studio-page.studio-page.find",
  "api::academy-page.academy-page.find",
  "api::industries-page.industries-page.find",
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
  "api::brand.brand.find",
  "api::brand.brand.findOne",
  "api::event-page.event-page.find",
  "api::event.event.find",
  "api::event.event.findOne",
  "api::course.course.find",
  "api::course.course.findOne",
  "api::courses-page.courses-page.find",
];

const PUBLIC_CREATE_ACTIONS = ["api::lead.lead.create", "api::career-application.career-application.create"];

const INDUSTRIES_DATA = [
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
  for (const ind of INDUSTRIES_DATA) {
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
 * Seeds the Academy course catalog — shared by the Academy hub's "Latest
 * Courses & Videos" teaser (sections.academy-courses, a relation into this
 * collection) and the full apps/web/app/academy/courses&videos/page.tsx
 * catalog page. Runs independently of seedDatabase() so it also backfills
 * environments that were already seeded before the Course content-type
 * existed.
 */
async function seedCourses(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::course.course").findMany({});
  if (existing.length > 0) return existing;

  strapi.log.info("🌱 Seeding Academy courses...");

  const coursesData = [
    {
      title: "AI for Interior Design",
      slug: "ai-for-interior-design",
      description: "Create cinematic interior renders using AI — from rough sketches to fully",
      duration: "7-Weeks",
      badge: "NEW",
      isVideo: false,
      category: "AI",
      level: "Intermediate" as const,
      order: 1,
    },
    {
      title: "Compositing in Nuke",
      slug: "compositing-in-nuke",
      description: "Learn compositing like a pro in this incredible Nuke course for FX Artists",
      duration: "10-Weeks",
      isVideo: false,
      category: "Compositing",
      level: "Intermediate" as const,
      order: 2,
    },
    {
      title: "Intro to Unreal Engine",
      slug: "intro-to-unreal-engine",
      description: "Learn the basics of Unreal Engine in this exciting game design course.",
      duration: "8-Weeks",
      isVideo: false,
      category: "Unreal Engine",
      level: "Intermediate" as const,
      order: 3,
    },
    {
      title: "Intro to Houdini FX",
      slug: "intro-to-houdini-fx",
      description: "Ready to get serious about your FX journey? Check out this intermediate",
      duration: "12-Weeks",
      isVideo: false,
      category: "Houdini",
      level: "Intermediate" as const,
      order: 4,
    },
    {
      title: "Coding Generative AI",
      slug: "coding-generative-ai",
      description: "A deep dive into applied generative AI, guiding students from foundational AI",
      duration: "10-Weeks",
      badge: "NEW",
      isVideo: true,
      category: "AI",
      level: "Intermediate" as const,
      order: 5,
    },
    {
      title: "Unreal Engine Short Film",
      slug: "unreal-engine-short-film",
      description: "Learn how to create a short film using Unreal Engine.",
      duration: "INSTANT ACCESS",
      isVideo: false,
      category: "Unreal Engine",
      level: "Intermediate" as const,
      order: 6,
    },
    {
      title: "AI for Interior Design (Beginner)",
      slug: "ai-for-interior-design-beginner",
      description: "Create cinematic interior renders using AI — from rough sketches to fully",
      duration: "7-Weeks",
      badge: "NEW",
      isVideo: false,
      category: "AI",
      level: "Beginner" as const,
      order: 7,
    },
    {
      title: "Compositing in Nuke (Beginner)",
      slug: "compositing-in-nuke-beginner",
      description: "Learn compositing like a pro in this incredible Nuke course for FX Artists",
      duration: "10-Weeks",
      isVideo: false,
      category: "Compositing",
      level: "Beginner" as const,
      order: 8,
    },
  ];

  const created: any[] = [];
  for (const course of coursesData) {
    created.push(await strapi.documents("api::course.course").create({ data: course, status: "published" }));
  }

  strapi.log.info("🌱 Academy courses seeded successfully!");
  return created;
}

/**
 * Backfills the "details" dynamic zone on the two courses that have their
 * own hand-built landing pages — Intro to Houdini FX
 * (apps/web/app/academy/courses&videos/houdini-course/page.tsx) and AI for
 * Interior Design (apps/web/app/academy/courses&videos/ai-for-interior-design/page.tsx)
 * — with the exact content those pages used to hardcode, now editable in
 * Strapi. Which component ends up in "details" (course-details.houdini vs
 * course-details.standard) IS the course type: picking one in the admin
 * is how an editor chooses "Houdini" vs "standard" for a course, and the
 * frontend's getCourseHref() routes based on which component is present.
 * Runs independently of seedDatabase() so it also backfills environments
 * that were already seeded before the "details" field existed.
 */
async function migrateCourseDetails(strapi: Core.Strapi) {
  const [houdiniCourse] = await strapi
    .documents("api::course.course")
    .findMany({ filters: { slug: "intro-to-houdini-fx" }, populate: ["details"] });

  if (houdiniCourse && houdiniCourse.details?.length === 0) {
    strapi.log.info("🌱 Backfilling Houdini course details...");
    await strapi.documents("api::course.course").update({
      documentId: houdiniCourse.documentId,
      data: {
        details: [
          {
            __component: "course-details.houdini",
            introHeading: "Houdini",
            introHighlight: "Course",
            introParagraph1:
              "Some effects in movies look so real that it's hard to believe they were created on a computer — collapsing buildings, raging oceans, flying debris, or massive explosions.",
            introParagraph2:
              "Behind many of these scenes is one powerful tool: Houdini. Our Houdini Course in Noida is designed for students who want to move beyond basic 3D animation and step into the world of high-end VFX simulations. Here you will learn how professional artists build complex effects using procedural workflows and node-based systems used in real production studios.",
            highlightsHeading: "Houdini Course in",
            highlightsHighlight: "(6 Months)",
            highlightPoints: [
              {
                title: "Master the Art of Visual Effects with the Best Houdini Course",
                text: "Learn professional VFX workflows, procedural animation, simulation and production techniques used in films and games.",
              },
              {
                title: "Why Houdini is the Industry Standard",
                text: "Work with node-based workflows and build complex effects while developing strong technical and creative skills.",
              },
              {
                title: "What You'll Learn: From Zero to Simulation Pro",
                text: "Move from a complete beginner to a production-ready artist through practical classroom training and live projects.",
              },
            ],
            highlightFeatures: [
              { title: "6 Months", text: "Comprehensive, industry-focused training" },
              { title: "Hands-on Learning", text: "Real-world projects and simulations" },
              { title: "Industry-Ready Skills", text: "Workflows used in movies and games" },
              { title: "Certified Program", text: "Boost your career with our certification" },
            ],
            whatYouGetHeading: "What You Get",
            whatYouGetSubtitle: "Everything you need to become a professional Houdini artist",
            whatYouGetItems: [
              { title: "Course Level", text: "Beginner to Advanced", accentColor: "#4F6EF5" },
              { title: "Mode", text: "Classroom (Offline)", accentColor: "#17B8C4" },
              { title: "Live Creative Projects", text: "Work on real-world scenes", accentColor: "#22C55E" },
              { title: "Portfolio Development", text: "Build a strong industry portfolio", accentColor: "#F59E0B" },
              { title: "Certificate", text: "Yes, on Completion", accentColor: "#8B5CF6" },
              { title: "Batch Options", text: "Weekday & Weekend", accentColor: "#EC4899" },
            ],
            whoForHeading: "Who Is This Course For?",
            whoForSubtitle: "Everything you need to become a professional Houdini artist",
            whoForItems: [
              { emoji: "🧑‍💻", title: "Beginners in VFX", text: "Start your journey in visual effects from scratch.", accentColor: "#4B95FF" },
              { emoji: "🧑‍🎨", title: "Aspiring 3D Artists", text: "Learn industry-standard tools and production workflows.", accentColor: "#22C55E" },
              { emoji: "🎬", title: "Animation Students", text: "Upgrade your skills with powerful simulation techniques.", accentColor: "#F59E0B" },
              { emoji: "🖥️", title: "Creative Professionals", text: "Boost your career and move into the VFX industry.", accentColor: "#8B5CF6" },
            ],
            visitHeading: "Visit Our Noida Center for a Free Demo",
            visitSubheading: "Book a Free Career Counseling Session",
            visitPhone: "+91 80104 85216",
            visitEmail: "academy@tathastu.global",
            faqsHeading: "Frequently Asked",
            faqsHighlight: "Questions",
            faqs: [
              {
                question: "Do I need any prior experience to join this course?",
                answer: "No. This course is designed for complete beginners. You just need a creative mindset — we will teach you everything from scratch.",
              },
              {
                question: "Which course I should prefer after Grade 12th?",
                answer: "Houdini is an excellent choice after Grade 12th if you're interested in VFX, animation, or game development. Our counselors can help you pick the right track.",
              },
              {
                question: "How long is the Houdini certification course?",
                answer: "The course is 6 months long, covering everything from fundamentals to advanced production-level simulations.",
              },
            ],
          },
        ],
      },
      status: "published",
    });
  }

  const [aiCourse] = await strapi
    .documents("api::course.course")
    .findMany({ filters: { slug: "ai-for-interior-design" }, populate: ["details"] });

  if (aiCourse && aiCourse.details?.length === 0) {
    strapi.log.info("🌱 Backfilling AI for Interior Design course details...");
    await strapi.documents("api::course.course").update({
      documentId: aiCourse.documentId,
      data: {
        details: [
          {
            __component: "course-details.standard",
            trailerHeading: "Watch The Trailer",
            trailerParagraph1:
              "Curious about what you'll learn in this course? Check out the trailer to see all of the amazing techniques you'll learn inside AI For Interior Design.",
            trailerParagraph2:
              "In the final chapter, we introduce Nano Banana as an alternative workflow, applying everything covered in the course through a different approach to reinforce and expand your creative pipeline. Perfect for artists and designers who want to push AI beyond simple image generation into a fully controllable creative process.",
            trailerCtaLabel: "Join The Course",
            breakdownHeading: "Course",
            breakdownHighlight: "Breakdown",
            breakdownIntro1: "Create cinematic interior renders using AI — from rough sketches to fully realized scenes.",
            breakdownIntro2:
              "In this course, you'll build a complete workflow inside ComfyUI, transforming sketches into realistic interiors with full control over lighting, mood, and composition. You'll learn furniture integration, scene generation, camera control, relighting, and people integration — all the way through to high-end upscaling for production-ready results.",
            breakdownIntro3:
              "In the final chapter, we introduce Nano Banana as an alternative workflow, applying everything covered in the course through a different approach to reinforce and expand your creative pipeline. Perfect for artists and designers who want to push AI beyond simple image generation into a fully controllable creative pipeline.",
            modules: [
              {
                title: "Week 1",
                description:
                  "Introduction To ComfyUI workflow. Setup ComfyUI Locally. Introduction To Node base setups in ComfyUI. Integrating Qwen Image Edit into Comfy UI. Advanced Qwen-image-Edit examples.",
              },
              {
                title: "Week 2",
                description:
                  "Introduction To Sketch to Render Workflow. Hand-sketch and prompt structures. Translating CAD and 3D Art to different mood, style and lighting. Water color and Sketchup model.",
              },
              {
                title: "Week 3",
                description:
                  "Custom Furniture integration and Scene generation. Custom furniture with Random scene and prompting. Multiple inputs / mood board with random scene. Custom furniture with custom scene. Using a 3D Model to Control placement, scale and orientation.",
              },
              {
                title: "Week 4",
                description:
                  "Intro to Camera control. Camera control over Flat image (around 50 min). Generate multi-camera angle using Prompting. Generate multi-camera angle using 3D reference. Generating multi-camera angle using LoRa and Custom nodes.",
              },
              {
                title: "Week 5",
                description:
                  "Realistic Scene Relighting Workflow. Relighting using prompting and LoRa. People integration based on references. Controlling Poses and placement.",
              },
              {
                title: "Week 6",
                description:
                  "Introduction To Nano Banana. Integrating and setting up Nano Banana Inside ComfyUI. Sketch to render workflow. Furniture integration. Camera control. Relighting scene. People Integration.",
              },
            ],
          },
        ],
      },
      status: "published",
    });
  }
}

/**
 * Seeds the Courses & Videos hub page singleType (hero content only — the
 * course grid itself comes from the Course collection). Runs independently
 * of seedDatabase() so it also backfills environments that were already
 * seeded before the Courses Page content-type existed.
 */
async function seedCoursesPage(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::courses-page.courses-page").findFirst({});
  if (existing) {
    strapi.log.info("🌱 Courses page already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Courses & Videos page...");

  await strapi.documents("api::courses-page.courses-page").create({
    data: {
      seoTitle: "Courses & Videos — Tathastu Academy",
      seoDescription: "Explore our newest tutorials, expert-led courses, and practical learning resources from Tathastu Academy.",
      heading: "Courses & Videos",
      breadcrumbLabel: "Courses & Videos",
    },
    status: "published",
  });

  strapi.log.info("🌱 Courses & Videos page seeded successfully!");
}

/**
 * Backfills the "sections.academy-courses" relation on an already-seeded
 * Academy page. That field used to be an embedded component and was
 * migrated to a relation into the Course collection — existing environments
 * seeded before the migration need their academy-page recreated so the
 * section picks up real Course relations instead of sitting empty.
 */
async function migrateAcademyCoursesRelation(strapi: Core.Strapi) {
  const academyPage = await strapi
    .documents("api::academy-page.academy-page")
    .findFirst({ populate: { sections: { on: { "sections.academy-courses": { populate: ["courses"] } } } } });

  if (!academyPage) return; // seedAcademyPage() below will create it fresh.

  const coursesSection = (academyPage.sections as any[])?.find((s) => s.__component === "sections.academy-courses");
  if (coursesSection && coursesSection.courses?.length > 0) {
    return; // Already migrated.
  }

  strapi.log.info("🌱 Migrating Academy page's courses section to the new Course relation...");
  await strapi.documents("api::academy-page.academy-page").delete({ documentId: academyPage.documentId });
  strapi.log.info("🌱 Academy page will be reseeded with real course relations.");
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
  const courses = await seedCourses(strapi);
  const teaserCourses = courses.filter((c) => c.level === "Intermediate").slice(0, 6);

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
          courses: teaserCourses.map((c) => c.documentId),
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

/**
 * Seeds the Industries hub page singleType with one component per section of
 * the built Industries UI (apps/web/app/industries/page.tsx). Runs
 * independently of seedDatabase() so it also backfills environments that
 * were already seeded before the Industries Page content-type existed.
 * Reuses the same generic sections (stats-band, feature-cards, cta-band,
 * testimonials, client-logos) already used by the Homepage.
 */
async function seedIndustriesPage(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::industries-page.industries-page").findFirst({});
  if (existing) {
    strapi.log.info("🌱 Industries page already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Industries page...");

  const [stats, testimonials, clientLogos] = await Promise.all([
    strapi.documents("api::stat.stat").findMany({ sort: "order:asc" }),
    strapi.documents("api::testimonial.testimonial").findMany({ sort: "order:asc" }),
    strapi.documents("api::client-logo.client-logo").findMany({ sort: "order:asc" }),
  ]);

  await strapi.documents("api::industries-page.industries-page").create({
    data: {
      seoTitle: "Industries We Serve — Tathastu",
      seoDescription: "Discover our tailor-made technology solutions for Media & Entertainment, AEC, Education, and Manufacturing.",
      sections: [
        {
          __component: "sections.industries-hero",
          heading: "Industries",
          breadcrumbLabel: "Industries",
        },
        {
          __component: "sections.industries-grid",
          heading: "Empowering Industries with Tailored",
          headingHighlight: "Software Solutions",
          subtitle: "Streamlined Software Solutions for Media & Entertainment, AEC, Manufacturing, Marketing, Education, and Government",
          cards: [
            { title: "Media and Entertainment", href: "/industries/media-and-entertainment", isFeatured: true },
            { title: "AEC", href: "/industries/architecture-aec" },
            { title: "Education", href: "/industries/education-and-training" },
            { title: "Manufacturing", href: "/industries/manufacturing-and-visualization" },
            { title: "Government", href: "/industries/government" },
          ],
        },
        {
          __component: "sections.stats-band",
          heading: "Trusted by creative teams everywhere",
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
          __component: "sections.cta-band",
          heading: "Design Support for All Your Creative Needs",
          subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
          ctaLabel: "Request Demo",
          ctaHref: "/contact?source=Demo&industry=industries",
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

  strapi.log.info("🌱 Industries page seeded successfully!");
}

/**
 * Backfills any of the 5 core Industry entries missing from the database.
 * Runs independently of seedDatabase() so it also backfills environments
 * where seedDatabase() skipped (e.g. other data was already seeded before
 * all 5 industries were added to INDUSTRIES_DATA) — this project's dev
 * database is exactly that case: only "Media & Entertainment" existed.
 */
async function seedMissingIndustries(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::industry.industry").findMany({});
  const existingSlugs = new Set(existing.map((ind) => ind.slug));

  const missing = INDUSTRIES_DATA.filter((ind) => !existingSlugs.has(ind.slug));
  if (missing.length === 0) {
    strapi.log.info("🌱 All industries already seeded. Skipping.");
    return;
  }

  strapi.log.info(`🌱 Seeding ${missing.length} missing industr${missing.length === 1 ? "y" : "ies"}...`);
  for (const ind of missing) {
    await strapi.documents("api::industry.industry").create({ data: ind, status: "published" });
  }
  strapi.log.info("🌱 Missing industries seeded successfully!");
}

/**
 * Backfills Brand entries under the Media & Entertainment industry — the
 * content that used to live only in the one-off
 * apps/web/app/industries/media-and-entertainment/page.tsx (brand grid) and
 * apps/web/app/industries/media-and-entertainment/adobe/page.tsx (Adobe's
 * full detail content) — now that every brand routes through the single
 * generic apps/web/app/industries/[slug]/[brand]/page.tsx template. Runs
 * independently of seedDatabase() so it also backfills environments where
 * industries were already seeded before the Brand content-type existed.
 * Other industries (AEC, Education, Manufacturing, Government) intentionally
 * start with no brands until populated in Strapi.
 */
async function seedIndustryBrands(strapi: Core.Strapi) {
  const [mediaAndEntertainment] = await strapi
    .documents("api::industry.industry")
    .findMany({ filters: { slug: "media-and-entertainment" } });

  if (!mediaAndEntertainment) {
    strapi.log.warn('🌱 Industry "media-and-entertainment" not found — skipping brand seed.');
    return;
  }

  const existingBrands = await strapi
    .documents("api::brand.brand")
    .findMany({ filters: { industry: { documentId: mediaAndEntertainment.documentId } } });

  if (existingBrands.length > 0) {
    strapi.log.info("🌱 Industry brands already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Media & Entertainment industry brands...");

  const clientLogos = await strapi.documents("api::client-logo.client-logo").findMany({ sort: "order:asc" });
  const enquiryText =
    'If you\'re looking for the right technology for smooth operation and stunning results, you don\'t have to look any further. Your search ends here!. Connect with us by clicking "Request a Demo" button';

  await strapi.documents("api::brand.brand").create({
    data: {
      name: "Adobe",
      slug: "adobe",
      category: "Software" as const,
      order: 1,
      industry: mediaAndEntertainment.documentId,
      shortDescription:
        "Changing the world through personalized digital experiences. Adobe empowers everyone, everywhere to imagine and create what inspires them.",
      aboutDescription:
        "Changing the world through personalized digital experiences. Adobe empowers everyone, everywhere to imagine, create, and bring any digital experience to life. Founded December 1982 Adobe is making the world more creative and productive and truly is Industry Leader in creative world.",
      apps: [{ label: "Photoshop" }, { label: "Illustrator" }, { label: "InDesign" }, { label: "Adobe Stock" }],
      showcases: [
        {
          title: "Photoshop",
          subtitle:
            "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
          featuresText:
            "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
          enquiryText,
          direction: "left" as const,
        },
        {
          title: "Illustrator",
          subtitle:
            "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
          featuresText:
            "Arrange objects on a path. Vectorise drawings with more accuracy. Make realistic mockups in one click. Create and edit graphics online. Turn 3D designs into vectors. Fill shapes with detail and colour. Start with just Illustrator or get Illustrator and 20+ other apps with the Creative Cloud All Apps plan.",
          enquiryText,
          direction: "right" as const,
        },
        {
          title: "InDesign",
          subtitle:
            "Design and publish print and digital documents that make an impact. Lay out flyers, posters, brochures, annual reports, digital magazines, eBooks, and more with InDesign — for consistent, professional layouts every time.",
          featuresText:
            "Create multi-page layouts with master pages and paragraph styles. Auto-flow text, embed interactive elements, and export directly to PDF, EPUB, or HTML. Collaborate in real time and package files for print with confidence.",
          enquiryText,
          direction: "left" as const,
        },
        {
          title: "Adobe Stock",
          subtitle:
            "Access millions of royalty-free images, videos, templates, and 3D assets — all fully licensed and ready to use. Search visually, integrate directly inside Creative Cloud apps, and find the perfect asset for every project.",
          featuresText:
            "Browse curated, royalty-free photos, illustrations, videos, and templates. Use visual search and Firefly-generated assets, license directly from within Photoshop or Illustrator, and stay fully compliant.",
          enquiryText,
          direction: "right" as const,
        },
      ],
      clientLogos: clientLogos.map((cl) => cl.documentId),
    },
    status: "published",
  });

  await strapi.documents("api::brand.brand").create({
    data: {
      name: "SideFX",
      slug: "sidefx",
      category: "Software" as const,
      order: 2,
      industry: mediaAndEntertainment.documentId,
      shortDescription:
        "For over thirty five years, SideFX has provided artists with cutting-edge procedural 3D animation tools trusted across film, TV, and games.",
    },
    status: "published",
  });

  await strapi.documents("api::brand.brand").create({
    data: {
      name: "RayFire",
      slug: "rayfire",
      category: "Software" as const,
      order: 3,
      industry: mediaAndEntertainment.documentId,
      shortDescription:
        "RayFire is a leading provider of innovative FX plugins for Autodesk 3ds Max, established with a vision to redefine destruction and fragmentation effects.",
    },
    status: "published",
  });

  await strapi.documents("api::brand.brand").create({
    data: {
      name: "Dell",
      slug: "dell",
      category: "Hardware" as const,
      order: 4,
      industry: mediaAndEntertainment.documentId,
      shortDescription:
        "Dell Technologies is a global leader in technology solutions, offering a wide range of workstations built for creative production.",
    },
    status: "published",
  });

  strapi.log.info("🌱 Industry brands seeded successfully!");
}

/**
 * Seeds the past Event entries — the content that used to live only in the
 * static apps/web/app/event/details/page.tsx gallery — now that every past
 * event routes through the generic apps/web/app/event/[slug]/page.tsx
 * template. Runs independently of seedDatabase() so it also backfills
 * environments that were already seeded before the Event content-type
 * existed.
 */
async function seedEvents(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::event.event").findMany({});
  if (existing.length > 0) {
    strapi.log.info("🌱 Events already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding past events...");

  const detailText =
    "—black and white photographers who view the natural world not as a subject to be documented, but as a canvas for emotion, narrative, and art. Their work moves beyond the traditional bounds of wildlife photography, focusing not on species checklists or iconic sightings, but on moments—fleeting, unstaged, and alive with meaning.";

  await strapi.documents("api::event.event").create({
    data: {
      title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      slug: "past-event-1",
      summary: detailText,
      order: 1,
      galleryHeading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      galleryText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    status: "published",
  });

  strapi.log.info("🌱 Past events seeded successfully!");
}

/**
 * Seeds the Event hub page singleType with one component per section of the
 * built Event UI (apps/web/app/event/page.tsx). Runs independently of
 * seedDatabase() so it also backfills environments that were already seeded
 * before the Event Page content-type existed.
 */
async function seedEventPage(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::event-page.event-page").findFirst({});
  if (existing) {
    strapi.log.info("🌱 Event page already seeded. Skipping.");
    return;
  }

  strapi.log.info("🌱 Seeding Event page...");

  const events = await strapi.documents("api::event.event").findMany({ sort: "order:asc" });

  const introText =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.';
  const detailText =
    "—black and white photographers who view the natural world not as a subject to be documented, but as a canvas for emotion, narrative, and art. Their work moves beyond the traditional bounds of wildlife photography, focusing not on species checklists or iconic sightings, but on moments—fleeting, unstaged, and alive with meaning.";

  await strapi.documents("api::event-page.event-page").create({
    data: {
      seoTitle: "Event — Tathastu",
      seoDescription: "Explore our upcoming event.",
      sections: [
        {
          __component: "sections.event-hero",
          heading: "Event",
        },
        {
          __component: "sections.event-upcoming",
          heading: "Upcoming",
          headingHighlight: "Event",
          blocks: [
            {
              heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
              text: introText,
              isVideo: false,
            },
            {
              heading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
              text: detailText,
              isVideo: true,
            },
            {
              heading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
              text: detailText,
              isVideo: false,
            },
          ],
        },
        {
          __component: "sections.event-past",
          heading: "Past",
          headingHighlight: "Event",
          events: events.map((e) => e.documentId),
        },
        {
          __component: "sections.cta-band",
          heading: "Design Support for All Your Creative Needs",
          subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
          ctaLabel: "Request Demo",
          ctaHref: "/contact?source=Demo&industry=event",
        },
      ],
    },
    status: "published",
  });

  strapi.log.info("🌱 Event page seeded successfully!");
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    await seedDatabase(strapi);
    await seedStudioPage(strapi);
    await migrateAcademyCoursesRelation(strapi);
    await seedAcademyPage(strapi);
    await seedCoursesPage(strapi);
    await migrateCourseDetails(strapi);
    await seedIndustriesPage(strapi);
    await seedMissingIndustries(strapi);
    await seedIndustryBrands(strapi);
    await seedEvents(strapi);
    await seedEventPage(strapi);
  },
};
