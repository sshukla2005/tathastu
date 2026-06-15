import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, Career } from "@tathastu/types";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Careers — Tathastu",
    description: "Join the team at Tathastu Techno Solution. Explore opportunities in VFX training, workstations support, and cloud pipeline consulting.",
  };
}

export default async function CareersPage() {
  const [settingsRes, industriesRes, careersRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Career[] }>("/careers?filters[isOpen][$eq]=true"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const openPositions = careersRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Join Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Careers at Tathastu
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are constantly seeking innovators, training instructors, and technical TDs passionate about the creative visual industry.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Positions list */}
          {openPositions.length > 0 ? (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {openPositions.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-wider bg-brand-primary/10 px-2.5 py-1 rounded self-start">
                      {job.department}
                    </span>
                    <h3 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-brand-orange" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-brand-primary" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-brand-border-blue hover:bg-brand-primary text-brand-dark hover:text-white font-bold rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer text-sm shrink-0"
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 font-medium bg-white rounded-[40px] max-w-4xl mx-auto border border-dashed border-gray-200">
              No open positions at the moment. Feel free to send your resume to info@tathastu.global
            </div>
          )}
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
