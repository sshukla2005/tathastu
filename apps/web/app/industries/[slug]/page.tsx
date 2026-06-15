import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import { ChevronLeft, ArrowRight, Building } from "lucide-react";

export const revalidate = 60; // ISR 60s

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: Industry[] }>(
      `/industries?filters[slug][$eq]=${slug}`
    );
    if (res?.data && res.data.length > 0) {
      const ind = res.data[0];
      return {
        title: `${ind.name} Solutions — Tathastu`,
        description: ind.shortDescription,
      };
    }
  } catch (err) {
    console.error("Error generating industry detail metadata:", err);
  }
  return {
    title: "Industry Solutions — Tathastu",
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const [settingsRes, industriesRes, currentIndRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Industry[] }>(`/industries?filters[slug][$eq]=${slug}&populate=*`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const currentIndustry = currentIndRes?.data?.[0];

  if (!currentIndustry) {
    notFound();
  }

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/industries"
            className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-brand-primary mb-8 group transition-colors"
          >
            <ChevronLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Industries</span>
          </Link>

          {/* Headline */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary">
              <Building size={32} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              {currentIndustry.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {currentIndustry.shortDescription}
            </p>
            <div className="w-20 h-1 bg-brand-orange rounded-full" />
          </div>

          {/* Details Content */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed border-t border-gray-100 pt-8 flex flex-col gap-6">
            <p>
              Tathastu Techno Solution delivers industry-standard pipelines, workstations, plugins, and custom training programs specifically tailored for {currentIndustry.name} professionals.
            </p>
            <p>
              Our deep integration with industry leaders like SideFX, Autodesk, and major hardware vendors ensures your team has the performance and workflow speed necessary to deliver outstanding results within production deadlines.
            </p>

            <div className="mt-8 p-8 rounded-3xl bg-brand-light flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-lg font-bold text-brand-dark">Need a customized solution for your team?</h4>
                <p className="text-sm text-gray-500 mt-1">Get in touch for hardware sizing and software license options.</p>
              </div>
              <Link
                href={`/contact?source=Consultation&industry=${currentIndustry.slug}`}
                className="px-6 py-3 bg-brand-primary hover:bg-opacity-90 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow shrink-0 text-center cursor-pointer"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
