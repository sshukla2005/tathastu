import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Section Components
import Hero from "@/components/sections/Hero";
import FeatureCards from "@/components/sections/FeatureCards";
import StatsBand from "@/components/sections/StatsBand";
import ProductPortfolio from "@/components/sections/ProductPortfolio";
import CtaBand from "@/components/sections/CtaBand";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Testimonials from "@/components/sections/Testimonials";
import ClientLogos from "@/components/sections/ClientLogos";

import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, HomepageSection } from "@tathastu/types";

interface HomepageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  sections: HomepageSection[];
}

export async function generateMetadata() {
  try {
    const homepageRes = await fetchStrapi<{ data: HomepageData }>("/homepage");
    if (homepageRes?.data) {
      return {
        title: homepageRes.data.seoTitle || "Tathastu Techno Solution",
        description:
          homepageRes.data.seoDescription ||
          "Cutting-edge solutions for creative industries.",
      };
    }
  } catch (err) {
    console.error("Error generating homepage metadata:", err);
  }
  return {
    title: "Tathastu Techno Solution",
    description: "Cutting-edge Solutions for Creative Industries",
  };
}

// Static fallback used when Strapi is unavailable (dev/preview mode)
const FALLBACK_SETTINGS: SiteSettings = {
  siteName: "Tathastu Techno Solution",
  headerCtaHref: "/contact",
  whatsappNumber: "+919820192970",
  phone: "+91 98201 92970",
  email: "info@tathastu.global.com",
  address: "",
  footerColumns: [],
  socialLinks: [],
} as unknown as SiteSettings;

export default async function Home() {
  // Fetch layout settings & homepage content in parallel; gracefully fall back if Strapi is down
  let settingsRes: { data: SiteSettings } | null = null;
  let industriesRes: { data: Industry[] } | null = null;
  let homepageRes: { data: HomepageData } | null = null;

  try {
    [settingsRes, industriesRes, homepageRes] = await Promise.all([
      fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
      fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
      fetchStrapi<{ data: HomepageData }>("/homepage?populate[sections][populate]=*"),
    ]);
  } catch (err) {
    console.warn("Strapi unavailable — rendering with fallback data:", err);
  }

  const siteSettings = settingsRes?.data ?? FALLBACK_SETTINGS;
  const industries = industriesRes?.data || [];
  const homepage = homepageRes?.data;


  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {homepage?.sections &&
          homepage.sections.map((section, idx) => {
            switch (section.__component) {
              case "sections.hero":
                return <Hero key={idx} section={section} />;
              case "sections.feature-cards":
                return <FeatureCards key={idx} section={section} />;
              case "sections.stats-band":
                return <StatsBand key={idx} section={section} />;
              case "sections.product-portfolio":
                return <ProductPortfolio key={idx} section={section} />;
              case "sections.cta-band":
                return <CtaBand key={idx} section={section} />;
              case "sections.blog-teaser":
                return <BlogTeaser key={idx} section={section} />;
              case "sections.testimonials":
                return <Testimonials key={idx} section={section} />;
              case "sections.client-logos":
                return <ClientLogos key={idx} section={section} />;
              default:
                return (
                  <div key={idx} className="p-4 text-center bg-yellow-50 text-yellow-700 text-sm">
                    Unknown Component: {(section as any).__component}
                  </div>
                );
            }
          })}
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
