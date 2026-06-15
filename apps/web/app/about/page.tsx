import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import { Shield, Target, Award, Users } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "About Us — Tathastu Techno Solution",
    description: "Learn about Tathastu Techno Solution — India's leading reseller and technical integration partner for creative industries.",
  };
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  order: number;
}

export default async function AboutPage() {
  const [settingsRes, industriesRes, teamRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: TeamMember[] }>("/team-members?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const teamMembers = teamRes?.data || [];

  if (!siteSettings) return null;

  const coreValues = [
    {
      icon: <Target className="w-8 h-8 text-brand-primary" />,
      title: "Client-Centricity",
      desc: "We place the customer's pipeline requirements and budget at the heart of our operations, regardless of scale.",
    },
    {
      icon: <Award className="w-8 h-8 text-brand-orange" />,
      title: "Unmatched Expertise",
      desc: "Our team leverages years of specialized industry knowledge to size products and configure workflows correctly.",
    },
    {
      icon: <Shield className="w-8 h-8 text-brand-yellow" />,
      title: "Absolute Reliability",
      desc: "We supply only original, ISV-certified components and authorized software licenses with full vendor support.",
    },
  ];

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-white">
        {/* Hero Banner */}
        <section className="bg-brand-dark text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-6">
            <span className="text-sm font-extrabold uppercase tracking-widest text-brand-primary">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              About Tathastu Techno Solution
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light">
              We are a dedicated B2B technology company empowering creative professionals with the world's best hardware, software, and plugins.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>
        </section>

        {/* Story & Vision */}
        <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Our Journey & Commitment
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with the goal of bridging the gap between high-end production demands and authorized technology procurement, Tathastu has become a trusted partner for top-tier VFX houses, architectural studios, and visual rendering professionals across India.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We go beyond simply shipping boxes. We assist with hardware benchmark assessments, software license management, workflow pipeline integrations, and certified team mentoring to ensure your technical assets return value from day one.
            </p>
          </div>

          {/* Graphic block representing values */}
          <div className="bg-brand-light rounded-[40px] p-8 sm:p-12 border border-gray-100 flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-brand-dark">Our Core Values</h3>
            <div className="flex flex-col gap-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-dark text-lg">{val.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mt-1">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <section className="bg-brand-light py-20 px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
                <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
                  Leadership
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
                  Meet the Team
                </h2>
                <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
              </div>

              {/* Leaders Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6 text-center"
                  >
                    {/* Placeholder Leader Initials badge since images are empty */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-orange to-brand-primary flex items-center justify-center text-white font-extrabold text-3xl shadow-md mx-auto">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-2xl font-bold text-brand-dark">{member.name}</h3>
                      <span className="text-sm text-brand-primary font-bold uppercase tracking-wider">{member.role}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed italic">
                      "{member.bio}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
