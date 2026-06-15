import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, PortfolioItem } from "@tathastu/types";
import { Cpu, Terminal, Layers, Info } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Tathastu Studio — Solutions & Products",
    description: "Explore our product portfolio of hardware workstations, industry-standard 3D software, and custom plugins.",
  };
}

export default async function StudioPage() {
  const [settingsRes, industriesRes, portfolioRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: PortfolioItem[] }>("/portfolio-items?populate=*"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const items = portfolioRes?.data || [];

  if (!siteSettings) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Hardware":
        return <Cpu size={24} className="text-brand-primary" />;
      case "Software":
        return <Terminal size={24} className="text-brand-orange" />;
      case "Plugin":
        return <Layers size={24} className="text-brand-yellow" />;
      default:
        return <Info size={24} className="text-brand-primary" />;
    }
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Tathastu Studio
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Our Solutions & Product Portfolio
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore high-quality systems, software licenses, and productivity plugins crafted to accelerate your creative pipelines.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-[32px] p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start justify-between"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="sm:self-end mt-4 sm:mt-0 shrink-0">
                  <a
                    href={`/contact?source=Consultation&product=${item.slug}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-dark hover:bg-brand-primary text-white font-bold rounded-full transition-all duration-300 text-sm shadow cursor-pointer"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
