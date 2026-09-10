import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import StandardCourseDetails from "@/components/sections/StandardCourseDetails";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, CtaBandSection, Course } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const COURSE_SLUG = "ai-for-interior-design";
const FALLBACK_IMAGE = "/images/academy/about-brain.png";

const STANDARD_POPULATE = [
  "populate[details][on][course-details.standard][populate][trailerImage][populate]=*",
  "populate[details][on][course-details.standard][populate][modules][populate][icon][populate]=*",
].join("&");

const ctaBandSection: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever.",
  ctaLabel: "Request Demo",
  ctaHref: "/contact?source=Demo&industry=academy-courses",
};

export async function generateMetadata() {
  try {
    const res = await fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${COURSE_SLUG}`);
    const course = res?.data?.[0];
    return {
      title: `${course?.title || "AI for Interior Design"} — Tathastu Academy`,
      description: course?.description || "Create cinematic interior renders using AI — from rough sketches to fully controllable creative visuals.",
    };
  } catch {
    return { title: "AI for Interior Design — Tathastu Academy" };
  }
}

export default async function AiForInteriorDesignPage() {
  const [settingsRes, industriesRes, courseRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${COURSE_SLUG}&${STANDARD_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const course = courseRes?.data?.[0];
  const details = course?.details?.find((d) => d.__component === "course-details.standard");

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/academy/hero-bg.jpg"
            alt={`${course?.title || "AI for Interior Design"} course`}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{course?.title || "AI for Interior Design"}</h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/academy" className="hover:text-white">
                Academy
              </Link>
              <span>/</span>
              <Link href="/academy/courses&videos" className="hover:text-white">
                Courses & Videos
              </Link>
              <span>/</span>
              <span className="text-white">Details</span>
            </nav>
          </div>
        </section>

        {details && <StandardCourseDetails details={details} courseSlug={COURSE_SLUG} fallbackImage={FALLBACK_IMAGE} />}

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
