import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import AdobeAppShowcase from "@/components/sections/AdobeAppShowcase";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import { CtaBandSection } from "@tathastu/types";
import CtaBand from "@/components/sections/CtaBand";

export const revalidate = 60; // ISR 60s

const INDUSTRY_SLUG = "adobe";
const INDUSTRY_LABEL = "Adobe";
const PARENT_LABEL = "Media & Entertainment";
const PARENT_HREF = "/industries/media-and-entertainment";

const ADOBE_APPS = [
  { name: "Photoshop", logo: "/images/media-and-entertainment/adobe/photoshop.svg" },
  { name: "Illustrator", logo: "/images/media-and-entertainment/adobe/illustrator.svg" },
  { name: "InDesign", logo: "/images/media-and-entertainment/adobe/indesign.svg" },
  { name: "Adobe Stock", logo: "/images/media-and-entertainment/adobe/stock.svg" },
];

// TODO: drop the real artwork in at these paths — a generic "Features" icon
// and an "Enquiry" contact photo, reused across every app row.
const FEATURES_IMAGE = "/images/media-and-entertainment/adobe/features.svg";
const ENQUIRY_IMAGE = "/images/media-and-entertainment/adobe/enquiry.svg";

const ENQUIRY_TEXT =
  'If you\'re looking for the right technology for smooth operation and stunning results, you don\'t have to look any further. Your search ends here!. Connect with us by clicking "Request a Demo" button';

const APP_SHOWCASES = [
  {
    icon: "/images/media-and-entertainment/adobe/photoshop.svg",
    title: "Photoshop",
    subtitle:
      "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
    features: {
      image: "/images/media-and-entertainment/adobe/features.svg",
      text: "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
    },
    enquiry: { image: ENQUIRY_IMAGE, text: ENQUIRY_TEXT },
    direction: "left" as const,
    bck: 'bg-[linear-gradient(281.78deg,#002039_6.6%,#13466E_86.58%)]',
  },
  {
    icon: "/images/media-and-entertainment/adobe/illustrator.svg",
    title: "Illustrator",
    subtitle:
      "Create at the speed of imagination. Fire up your imagination with the most powerful Photoshop yet. Remove distractions from pics in a click. Get amazing photorealistic results with Generative Fill. And add more picture to your picture with Generative Expand. Now with the latest Adobe Firefly Image Model.",
    features: {
      image: "/images/media-and-entertainment/adobe/features.svg",
      text: "Arrange objects on a path. Vectorise drawings with more accuracy. Make realistic mockups in one click. Create and edit graphics online. Turn 3D designs into vectors. Fill shapes with detail and colour. Start with just Illustrator or get Illustrator and 20+ other apps with the Creative Cloud All Apps plan.",
    },
    enquiry: { image: ENQUIRY_IMAGE, text: ENQUIRY_TEXT },
    direction: "right" as const,
    bck: 'bg-gradient-to-br from-[#EAFBE9] via-white to-[#FDECE0]',
  },
  {
    icon: "/images/media-and-entertainment/adobe/indesign.svg",
    title: "InDesign",
    subtitle:
      "Design and publish print and digital documents that make an impact. Lay out flyers, posters, brochures, annual reports, digital magazines, eBooks, and more with InDesign — for consistent, professional layouts every time.",
    features: {
      image: "/images/media-and-entertainment/adobe/features.svg",
      text: "Create multi-page layouts with master pages and paragraph styles. Auto-flow text, embed interactive elements, and export directly to PDF, EPUB, or HTML. Collaborate in real time and package files for print with confidence.",
    },
    enquiry: { image: ENQUIRY_IMAGE, text: ENQUIRY_TEXT },
    direction: "left" as const,
    bck: 'bg-[linear-gradient(281.78deg,#000000_6.6%,#6B2B43_86.58%)]',
  },
  {
    icon: "/images/media-and-entertainment/adobe/stock.svg",
    title: "Adobe Stock",
    subtitle:
      "Access millions of royalty-free images, videos, templates, and 3D assets — all fully licensed and ready to use. Search visually, integrate directly inside Creative Cloud apps, and find the perfect asset for every project.",
    features: {
      image: "/images/media-and-entertainment/adobe/features.svg",
      text: "Browse curated, royalty-free photos, illustrations, videos, and templates. Use visual search and Firefly-generated assets, license directly from within Photoshop or Illustrator, and stay fully compliant.",
    },
    enquiry: { image: ENQUIRY_IMAGE, text: ENQUIRY_TEXT },
    direction: "right" as const,
    bck: 'bg-gradient-to-br from-[#EAFBE9] via-white to-[#FDECE0]',
  },
];

 const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext:
      "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: `/contact?source=Demo&industry=${INDUSTRY_SLUG}`,
  };


export async function generateMetadata() {
  try {
    const res = await fetchStrapi<{ data: Industry[] }>(
      `/industries?filters[slug][$eq]=${INDUSTRY_SLUG}`,
    );
    const ind = res?.data?.[0];
    return {
      title: `${INDUSTRY_LABEL} Solutions — Tathastu`,
      description:
        ind?.shortDescription ||
        "Explore Adobe creative tools and solutions offered by Tathastu.",
    };
  } catch {
    return { title: `${INDUSTRY_LABEL} Solutions — Tathastu` };
  }
}

export default async function AdobePage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/media-and-entertainment/hero.svg"
            alt="Live concert production with camera operators shooting a stage performance"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {INDUSTRY_LABEL}
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-white">
                Industries
              </Link>
              <span>/</span>
              <Link href={PARENT_HREF} className="hover:text-white">
                {PARENT_LABEL}
              </Link>
              <span>/</span>
              <span className="text-white">{INDUSTRY_LABEL}</span>
            </nav>
          </div>
        </section>

        {/* ── About Adobe ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FBE9E1] via-[#F3E8EF] to-[#E2F0FA] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                About <span className="text-[#2D9BF0]">Adobe</span>
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                Changing the world through personalized digital experiences.
                Adobe empowers everyone, everywhere to imagine, create, and
                bring any digital experience to life. Founded December 1982
                Adobe is making the world more creative and productive and
                truly is Industry Leader in creative world.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {ADOBE_APPS.map((app) => (
                  <div
                    key={app.name}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-md"
                  >
                    <Image
                      src={app.logo}
                      alt={app.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/media-and-entertainment/adobe/hero.svg"
                  alt="Adobe creative experience"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              
            </div>
          </div>
        </section>

        {/* ── Per-app showcase rows ── */}
        {APP_SHOWCASES.map((app) => (
          <AdobeAppShowcase key={app.title} {...app} />
        ))}

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
