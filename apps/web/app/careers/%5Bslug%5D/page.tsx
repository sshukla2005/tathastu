import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, Career } from "@tathastu/types";
import { ChevronLeft, MapPin, Clock, Briefcase, Mail } from "lucide-react";

export const revalidate = 60; // ISR 60s

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: Career[] }>(
      `/careers?filters[slug][$eq]=${slug}`
    );
    if (res?.data && res.data.length > 0) {
      const job = res.data[0];
      return {
        title: `${job.title} — Careers at Tathastu`,
        description: `Join Tathastu as a ${job.title} in the ${job.department} department.`,
      };
    }
  } catch (err) {
    console.error("Error generating career metadata:", err);
  }
  return {
    title: "Job Details — Tathastu Careers",
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const [settingsRes, industriesRes, currentJobRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Career[] }>(`/careers?filters[slug][$eq]=${slug}&populate=*`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const job = currentJobRes?.data?.[0];

  if (!job) {
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
            href="/careers"
            className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-brand-primary mb-8 group transition-colors"
          >
            <ChevronLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Open Positions</span>
          </Link>

          {/* Job Info Header */}
          <div className="flex flex-col gap-6 mb-12">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider bg-brand-primary/10 px-3 py-1.5 rounded self-start">
              {job.department}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-500 mt-2">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-orange" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-brand-primary" />
                {job.type}
              </span>
            </div>
            <div className="w-20 h-1 bg-brand-orange rounded-full" />
          </div>

          {/* Job Details Content */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed border-t border-gray-100 pt-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-brand-dark">About the Role</h3>
            <p>
              Tathastu Techno Solution is looking for a qualified, highly motivated {job.title} to join our growing {job.department} team. In this role, you will collaborate closely with creative professionals and pipelines to ensure that our deliverables align with high visual standard requirements.
            </p>
            
            <h3 className="text-xl font-bold text-brand-dark mt-4">Key Responsibilities</h3>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Manage and optimize pipelines, workstations, or training modules based on customer workflows.</li>
              <li>Coordinate with product engineers to specify configurations for VFX, AEC, and design customers.</li>
              <li>Deliver workshops, certifications, or custom training for Houdini software tools.</li>
            </ul>

            {/* Application box */}
            <div className="mt-12 p-8 rounded-3xl bg-brand-light border border-gray-100 flex flex-col items-center text-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Briefcase size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark">Interested in this position?</h4>
                <p className="text-sm text-gray-500 mt-1">Please send your resume and portfolio highlights to our recruiting team.</p>
              </div>
              <a
                href={`mailto:careers@tathastu.global?subject=Application for ${encodeURIComponent(job.title)}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-opacity-90 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow cursor-pointer bg-btn-blue text-base"
              >
                <Mail size={18} />
                <span>Apply via Email</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
