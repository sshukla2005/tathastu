import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import { ArrowRight, Building } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Industries We Serve — Tathastu",
    description: "Discover our tailor-made technology solutions for Media & Entertainment, AEC, Education, and Manufacturing.",
  };
}

export default async function IndustriesPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Targeted Expertise
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Industries We Serve
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We empower businesses with hardware, software, and plugins designed to meet strict industry standards.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-6">
                  {/* Visual Category Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <Building size={28} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {ind.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-sm font-bold text-brand-primary hover:text-brand-orange flex items-center gap-1 group/btn transition-colors"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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
