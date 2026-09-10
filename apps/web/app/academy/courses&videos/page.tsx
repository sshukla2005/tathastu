import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, Course, CtaBandSection, getCourseHref } from "@tathastu/types";
import { Search, ChevronDown } from "lucide-react";

export const revalidate = 60; // ISR 60s

interface CoursesPageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  breadcrumbLabel: string;
}

export async function generateMetadata() {
  try {
    const res = await fetchStrapi<{ data: CoursesPageData }>("/courses-page");
    if (res?.data) {
      return {
        title: res.data.seoTitle || "Courses & Videos — Tathastu Academy",
        description:
          res.data.seoDescription ||
          "Explore our newest tutorials, expert-led courses, and practical learning resources from Tathastu Academy.",
      };
    }
  } catch (err) {
    console.error("Error generating courses page metadata:", err);
  }
  return {
    title: "Courses & Videos — Tathastu Academy",
    description: "Explore our newest tutorials, expert-led courses, and practical learning resources from Tathastu Academy.",
  };
}

const RED = "#E02020";
const ABOUT_TEXT_PRIMARY = "#1A1A1A";
const ABOUT_TEXT_SECONDARY = "#4D4D4D";

const LEVELS: Course["level"][] = ["Intermediate", "Beginner"];
const FALLBACK_IMAGE = "/images/academy/program-studio.png";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function CoursesVideosPage({ searchParams }: PageProps) {
  const { category = "", q = "" } = await searchParams;

  const [settingsRes, industriesRes, coursesPageRes, coursesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: CoursesPageData }>("/courses-page"),
    fetchStrapi<{ data: Course[] }>("/courses?sort=order:asc&populate[image][populate]=*&populate[details][populate]=*"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const coursesPage = coursesPageRes?.data;
  const courses = coursesRes?.data || [];

  if (!siteSettings) return null;

  const heading = coursesPage?.heading || "Courses & Videos";
  const breadcrumbLabel = coursesPage?.breadcrumbLabel || "Courses & Videos";
  const categories = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));

  const query = q.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = !category || course.category === category;
    const matchesQuery =
      !query ||
      course.title.toLowerCase().includes(query) ||
      (course.description || "").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: "/contact?source=Demo&industry=academy-courses",
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb + search — same pattern as Media & Entertainment ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image src="/images/academy/hero-bg.jpg" alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{heading}</h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/academy" className="hover:text-white">
                Academy
              </Link>
              <span>/</span>
              <span className="text-white">{breadcrumbLabel}</span>
            </nav>
          </div>

          {/* Search / filter bar — overlaps the bottom edge of the hero */}
          <form
            method="get"
            className="relative z-10 mx-auto mt-12 flex w-[95%] max-w-286.75 flex-col items-stretch gap-3 rounded-3xl border border-[#00000080] bg-[#00000080] p-3 opacity-100 sm:h-28.5 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
          >
            <div className="relative flex flex-1 items-center rounded-lg bg-white px-4 py-2 opacity-100">
              <select
                name="category"
                defaultValue={category}
                className="w-full appearance-none bg-transparent py-1 pr-8 text-sm font-semibold text-brand-dark outline-none"
              >
                <option value="">Select by Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 text-gray-400" />
            </div>

            <div className="flex flex-[1.4] items-center gap-2 rounded-lg bg-white px-4 py-3 opacity-100">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search courses"
                className="w-full bg-transparent text-sm text-brand-dark outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="flex h-13.5 w-full shrink-0 items-center justify-center rounded-[50px] bg-btn-blue text-sm font-bold text-white opacity-100 transition-transform hover:scale-105 active:scale-95 sm:w-39.75"
            >
              Search
            </button>
          </form>
        </section>

        {/* ── Courses grid — same card design as the Academy page's Courses & Videos section ── */}
        <section style={{ background: "#F0F0F0", padding: "100px 80px 120px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {filteredCourses.length === 0 ? (
              <p className="py-12 text-center text-gray-500">No results found. Try a different search or category.</p>
            ) : (
              LEVELS.map((level) => {
                const levelCourses = filteredCourses.filter((course) => course.level === level);
                if (levelCourses.length === 0) return null;

                return (
                  <div key={level} style={{ marginBottom: "56px" }} className="courses-videos-group">
                    <h2
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "clamp(24px, 2.2vw, 30px)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: ABOUT_TEXT_PRIMARY,
                        margin: "0 0 24px",
                      }}
                    >
                      {level} <span style={{ color: RED }}>Courses</span>
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="courses-videos-grid">
                      {levelCourses.map((course, idx) => (
                        <div
                          key={course.id ?? idx}
                          style={{
                            background: "#FFFFFF",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.04)",
                            border: "1px solid rgba(0, 0, 0, 0.03)",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          }}
                          className="course-card"
                        >
                          {/* Card Image */}
                          <div style={{ position: "relative", width: "100%", height: "200px" }}>
                            <Image
                              src={getStrapiMediaUrl(course.image?.url) || FALLBACK_IMAGE}
                              alt={course.title}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 1024px) 100vw, 400px"
                            />
                            {course.badge && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "12px",
                                  right: "12px",
                                  background: RED,
                                  color: "#FFFFFF",
                                  fontWeight: 700,
                                  fontSize: "10px",
                                  letterSpacing: "0.06em",
                                  padding: "5px 10px",
                                  borderRadius: "4px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {course.badge}
                              </span>
                            )}
                            {course.isVideo && (
                              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div
                                  style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.92)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill={RED} style={{ marginLeft: "2px" }}>
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card Body */}
                          <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>{course.title}</h3>
                            <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.55 }}>
                              {course.description}{" "}
                              <Link
                                href={getCourseHref(course)}
                                style={{ color: RED, fontWeight: 600, textDecoration: "none" }}
                                className="read-more-link"
                              >
                                read more...
                              </Link>
                            </p>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: RED, letterSpacing: "0.04em", marginTop: "6px" }}>
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── CTA band — "Design Support for All Your Creative Needs" ── */}
        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
        .read-more-link:hover {
          text-decoration: underline !important;
        }
        @media (max-width: 1024px) {
          .courses-videos-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
