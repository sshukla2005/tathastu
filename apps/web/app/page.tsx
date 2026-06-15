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

export default async function Home() {
  // Fetch layout settings & homepage content in parallel
  const [settingsRes, industriesRes, homepageRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: HomepageData }>("/homepage?populate[sections][populate]=*"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const homepage = homepageRes?.data;

  if (!siteSettings) {
    return (
      <div className="flex items-center justify-center min-h-screen text-brand-dark">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Maintenance Mode</h1>
          <p className="text-gray-500 mt-2">Could not load website settings. Please check backend connection.</p>
        </div>
      </div>
    );
  }

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
