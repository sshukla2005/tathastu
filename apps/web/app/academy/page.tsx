import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import { GraduationCap, Award, BookOpen, Clock } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Tathastu Academy — VFX & Houdini Training",
    description: "Certified Houdini FX course training programs for artists looking to become production-ready in VFX and animation.",
  };
}

export default async function AcademyPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  const highlights = [
    {
      icon: <BookOpen className="w-8 h-8 text-brand-primary" />,
      title: "Houdini Certified Syllabus",
      desc: "Our program is built directly in alliance with industry standards, covering SOPs, VEX, DOPs, and USD workflows.",
    },
    {
      icon: <Award className="w-8 h-8 text-brand-orange" />,
      title: "Production Ready Mentor",
      desc: "Get taught directly by senior VFX technical directors who have worked on blockbuster film pipelines.",
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-yellow" />,
      title: "16-Week Intensive Training",
      desc: "Fast track your learning with structured daily assignments, projects, and portfolio review.",
    },
  ];

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Tathastu Academy
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Where Artists Become Production Ready
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Master the world's most powerful 3D procedural simulation software. Certified training programs tailored for the Next-Gen VFX artist.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-brand-light rounded-[40px] p-8 sm:p-12 border border-gray-100">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-md self-start uppercase tracking-wider">
                Enrollment Open for Batch 2026
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-snug">
                Houdini FX Certified Masterclass
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our flagship 16-week immersive curriculum is designed to take you from a basic 3D designer to a specialized Houdini Technical Artist. You will learn particle dynamics, RBD simulations, pyro/smoke fluids, Vellum fabrics, and crowd systems.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-semibold mt-2">
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-orange" />
                  16 Weeks duration
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-brand-primary" />
                  Portfolio Guided Projects
                </span>
              </div>

              <div className="mt-4">
                <Link
                  href="/contact?source=Consultation&academy=houdini-masterclass"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-opacity-95 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-base shadow bg-btn-blue cursor-pointer"
                >
                  Download Brochure & Apply
                </Link>
              </div>
            </div>

            {/* Right decorative graphic */}
            <div className="lg:col-span-5 bg-brand-dark rounded-3xl p-8 text-white min-h-[300px] flex flex-col justify-between border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl" />

              <span className="text-xs font-mono text-gray-400"># academy_syllabus_compilation</span>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-sm font-bold">Week 1-4: Procedural Modeling & VEX</span>
                  <span className="text-xs text-brand-primary font-bold">COMPLETED</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-sm font-bold">Week 5-8: Rigids, Particles & FLIP</span>
                  <span className="text-xs text-brand-orange font-bold">IN PROGRESS</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-sm font-bold">Week 9-16: Crowd & Render Pipelines</span>
                  <span className="text-xs text-gray-500 font-bold">QUEUED</span>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-yellow">Total graduates placed: 120+ artists</span>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((hl, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center">
                  {hl.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-brand-dark">
                    {hl.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {hl.desc}
                  </p>
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
