import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import BrandAppShowcase from "@/components/sections/BrandAppShowcase";
import ClientLogos from "@/components/sections/ClientLogos";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, Brand, CtaBandSection, ClientLogosSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const FALLBACK_HERO_IMAGE = "/images/media-and-entertainment/hero.svg";

// Fallback app-icon artwork that already exists for the seeded Adobe content,
// used until a brand's apps/showcases have their own media set in Strapi.
const FALLBACK_APP_ICONS: Record<string, string> = {
  photoshop: "/images/media-and-entertainment/adobe/photoshop.svg",
  illustrator: "/images/media-and-entertainment/adobe/illustrator.svg",
  indesign: "/images/media-and-entertainment/adobe/indesign.svg",
  "adobe stock": "/images/media-and-entertainment/adobe/stock.svg",
};
const FALLBACK_FEATURES_IMAGE = "/images/media-and-entertainment/adobe/features.svg";
const FALLBACK_ENQUIRY_IMAGE = "/images/media-and-entertainment/adobe/enquiry.svg";

function fallbackAppIcon(label: string): string {
  return FALLBACK_APP_ICONS[label.toLowerCase()] || FALLBACK_FEATURES_IMAGE;
}

interface BrandPageProps {
  params: Promise<{ slug: string; brand: string }>;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug, brand } = await params;
  try {
    const res = await fetchStrapi<{ data: Brand[] }>(
      `/brands?filters[slug][$eq]=${brand}&filters[industry][slug][$eq]=${slug}`,
    );
    const current = res?.data?.[0];
    if (current) {
      return {
        title: `${current.name} Solutions — Tathastu`,
        description: current.shortDescription,
      };
    }
  } catch (err) {
    console.error("Error generating brand detail metadata:", err);
  }
  return { title: "Brand Solutions — Tathastu" };
}

const BRAND_POPULATE = [
  "populate[logo][populate]=*",
  "populate[heroImage][populate]=*",
  "populate[apps][populate]=icon",
  "populate[showcases][populate][icon][populate]=*",
  "populate[showcases][populate][featuresImage][populate]=*",
  "populate[showcases][populate][enquiryImage][populate]=*",
  "populate[clientLogos][populate]=logo",
].join("&");

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug, brand } = await params;

  const [settingsRes, industriesRes, currentIndRes, currentBrandRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Industry[] }>(`/industries?filters[slug][$eq]=${slug}`),
    fetchStrapi<{ data: Brand[] }>(
      `/brands?filters[slug][$eq]=${brand}&filters[industry][slug][$eq]=${slug}&${BRAND_POPULATE}`,
    ),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const currentIndustry = currentIndRes?.data?.[0];
  const currentBrand = currentBrandRes?.data?.[0];

  if (!currentIndustry || !currentBrand) {
    notFound();
  }

  if (!siteSettings) return null;

  const heroImage = getStrapiMediaUrl(currentIndustry.heroImage?.url) || FALLBACK_HERO_IMAGE;
  const apps = currentBrand.apps || [];
  const showcases = currentBrand.showcases || [];
  const clientLogos = currentBrand.clientLogos || [];
  const aboutIllustration = getStrapiMediaUrl(currentBrand.heroImage?.url);

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: `/contact?source=Demo&industry=${currentIndustry.slug}&brand=${currentBrand.slug}`,
  };

  const clientLogosSection: ClientLogosSection = {
    __component: "sections.client-logos",
    id: 1,
    logos: clientLogos,
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image src={heroImage} alt={currentBrand.name} fill priority className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{currentBrand.name}</h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-white">
                Industries
              </Link>
              <span>/</span>
              <Link href={`/industries/${currentIndustry.slug}`} className="hover:text-white">
                {currentIndustry.name}
              </Link>
              <span>/</span>
              <span className="text-white">{currentBrand.name}</span>
            </nav>
          </div>
        </section>

        {/* ── About the brand ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FBE9E1] via-[#F3E8EF] to-[#E2F0FA] px-6 py-20 sm:px-10">
          <div
            className={`relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 ${
              aboutIllustration ? "lg:grid-cols-2" : ""
            }`}
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                About <span className="text-[#2D9BF0]">{currentBrand.name}</span>
              </h2>
              {currentBrand.aboutDescription && (
                <p className="text-base leading-relaxed text-gray-600">{currentBrand.aboutDescription}</p>
              )}
              {apps.length > 0 && (
                <div className="flex flex-wrap items-center gap-4">
                  {apps.map((app, idx) => (
                    <div key={app.id ?? idx} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={getStrapiMediaUrl(app.icon?.url) || fallbackAppIcon(app.label)}
                        alt={app.label}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {aboutIllustration && (
              <div className="relative mx-auto w-full max-w-md">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                  <Image
                    src={aboutIllustration}
                    alt={`${currentBrand.name} creative experience`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Per-app showcase rows ── */}
        {showcases.map((showcase, idx) => (
          <BrandAppShowcase
            key={showcase.id ?? idx}
            showcase={showcase}
            fallbackIcon={fallbackAppIcon(showcase.title)}
            fallbackFeaturesImage={FALLBACK_FEATURES_IMAGE}
            fallbackEnquiryImage={FALLBACK_ENQUIRY_IMAGE}
          />
        ))}

        <CtaBand section={ctaBandSection} />

        {clientLogos.length > 0 && <ClientLogos section={clientLogosSection} />}
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
