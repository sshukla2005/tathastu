import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, CtaBandSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const RED = "#E02020";

const WEEKS = [
  {
    title: "Week 1",
    text: "Introduction To ComfyUI workflow. Setup ComfyUI Locally. Introduction To Node base setups in ComfyUI. Integrating Qwen Image Edit into Comfy UI. Advanced Qwen-image-Edit examples.",
  },
  {
    title: "Week 2",
    text: "Introduction To Sketch to Render Workflow. Hand-sketch and prompt structures. Translating CAD and 3D Art to different mood, style and lighting. Water color and Sketchup model.",
  },
  {
    title: "Week 3",
    text: "Custom Furniture integration and Scene generation. Custom furniture with Random scene and prompting. Multiple inputs / mood board with random scene. Custom furniture with custom scene. Using a 3D Model to Control placement, scale and orientation.",
  },
  {
    title: "Week 4",
    text: "Intro to Camera control. Camera control over Flat image (around 50 min). Generate multi-camera angle using Prompting. Generate multi-camera angle using 3D reference. Generating multi-camera angle using LoRa and Custom nodes.",
  },
  {
    title: "Week 5",
    text: "Realistic Scene Relighting Workflow. Relighting using prompting and LoRa. People integration based on references. Controlling Poses and placement.",
  },
  {
    title: "Week 6",
    text: "Introduction To Nano Banana. Integrating and setting up Nano Banana Inside ComfyUI. Sketch to render workflow. Furniture integration. Camera control. Relighting scene. People Integration.",
  },
];

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
  return {
    title: "Ai for Interior Design — Tathastu Academy",
    description:
      "Create cinematic interior renders using AI — from rough sketches to fully controllable creative visuals.",
  };
}

export default async function AiForInteriorDesignPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/academy/hero-bg.jpg"
            alt="Ai for Interior Design course"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ai for Interior Design
            </h1>
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

        {/* ── Watch The Trailer ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FDECE0] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/academy/about-brain.png"
                alt="Ai for Interior Design course preview"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                Watch The Trailer
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                Curious about what you&apos;ll learn in this course? Check out
                the trailer to see all of the amazing techniques you&apos;ll
                learn inside Ai For Interior Design.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                In the final chapter, we introduce Nano Banana as an
                alternative workflow, applying everything covered in the
                course through a different approach to reinforce and expand
                your creative pipeline. Perfect for artists and designers who
                want to push AI beyond simple image generation into a fully
                controllable creative process.
              </p>

              <Link
                href="/contact?source=Enroll&course=ai-for-interior-design"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
                style={{ background: RED }}
              >
                Join The Course
              </Link>
            </div>
          </div>
        </section>

        {/* ── Course Breakdown ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF2FB] via-white to-[#FBE9E1] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                Course <span style={{ color: RED }}>Breakdown</span>
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                Create cinematic interior renders using AI — from rough
                sketches to fully realized scenes.
              </p>
              <p className="max-w-4xl text-sm leading-relaxed text-gray-600">
                In this course, you&apos;ll build a complete workflow inside
                ComfyUI, transforming sketches into realistic interiors with
                full control over lighting, mood, and composition. You&apos;ll
                learn furniture integration, scene generation, camera
                control, relighting, and people integration — all the way
                through to high-end upscaling for production-ready results.
              </p>
              <p className="max-w-4xl text-sm leading-relaxed text-gray-600">
                In the final chapter, we introduce Nano Banana as an
                alternative workflow, applying everything covered in the
                course through a different approach to reinforce and expand
                your creative pipeline. Perfect for artists and designers who
                want to push AI beyond simple image generation into a fully
                controllable creative pipeline.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WEEKS.map((week) => (
                <div
                  key={week.title}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">
                    {week.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {week.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
