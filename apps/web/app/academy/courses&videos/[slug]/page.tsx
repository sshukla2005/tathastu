import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import StandardCourseDetails from "@/components/sections/StandardCourseDetails";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, Course, CtaBandSection } from "@tathastu/types";
import { Clock, BarChart3, Tag, PlayCircle } from "lucide-react";

export const revalidate = 60; // ISR 60s

const RED = "#E02020";
const FALLBACK_IMAGE = "/images/academy/program-studio.png";

// Populate just enough of "details" to know which type is present (for the
// Houdini redirect below) plus the standard course's own rich fields, if any.
const COURSE_POPULATE = [
  "populate[image][populate]=*",
  "populate[details][on][course-details.standard][populate][trailerImage][populate]=*",
  "populate[details][on][course-details.standard][populate][modules][populate][icon][populate]=*",
  "populate[details][on][course-details.houdini][populate]=*",
].join("&");

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${slug}`);
    const course = res?.data?.[0];
    if (course) {
      return {
        title: `${course.title} — Tathastu Academy`,
        description: course.description,
      };
    }
  } catch (err) {
    console.error("Error generating course detail metadata:", err);
  }
  return { title: "Course — Tathastu Academy" };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;

  const [settingsRes, industriesRes, courseRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${slug}&${COURSE_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const course = courseRes?.data?.[0];

  if (!course) {
    notFound();
  }

  // This course has its own dedicated, richly-built landing page — send
  // visitors there instead of rendering the generic template for it.
  const isHoudini = course.details?.some((d) => d.__component === "course-details.houdini");
  if (isHoudini) {
    redirect("/academy/courses&videos/houdini-course");
  }

  if (!siteSettings) return null;

  const image = getStrapiMediaUrl(course.image?.url) || FALLBACK_IMAGE;
  const standardDetails = course.details?.find((d) => d.__component === "course-details.standard");

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: `/contact?source=Demo&industry=academy-courses&course=${course.slug}`,
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image src="/images/academy/hero-bg.jpg" alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{course.title}</h1>
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
              <span className="text-white">{course.title}</span>
            </nav>
          </div>
        </section>

        {/* ── Course details ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FBE9E1] via-[#F3E8EF] to-[#E2F0FA] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-xl">
              <Image src={image} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              {course.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircle size={64} color="#FFFFFF" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {course.badge && (
                <span
                  className="w-fit rounded px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                  style={{ background: RED }}
                >
                  {course.badge}
                </span>
              )}

              <p className="text-base leading-relaxed text-gray-600">{course.description}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                  <Clock size={18} color={RED} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Duration</span>
                    <span className="text-sm font-bold text-brand-dark">{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                  <BarChart3 size={18} color={RED} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Level</span>
                    <span className="text-sm font-bold text-brand-dark">{course.level}</span>
                  </div>
                </div>
                {course.category && (
                  <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                    <Tag size={18} color={RED} />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Category</span>
                      <span className="text-sm font-bold text-brand-dark">{course.category}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Link
                  href={`/contact?source=Enroll&course=${course.slug}`}
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-white shadow transition-transform hover:scale-105 active:scale-95"
                  style={{ background: RED }}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {standardDetails && <StandardCourseDetails details={standardDetails} courseSlug={course.slug} fallbackImage={image} />}

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
