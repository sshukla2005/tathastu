import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseDetailsStandardSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StandardCourseDetailsProps {
  details: CourseDetailsStandardSection;
  courseSlug: string;
  fallbackImage: string;
}

const RED = "#E02020";

export default function StandardCourseDetails({ details, courseSlug, fallbackImage }: StandardCourseDetailsProps) {
  const trailerImage = getStrapiMediaUrl(details.trailerImage?.url) || fallbackImage;
  const modules = details.modules || [];

  return (
    <>
      {/* ── Watch The Trailer ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FDECE0] px-6 py-20 sm:px-10">
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
            <Image src={trailerImage} alt={details.trailerHeading} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{details.trailerHeading}</h2>
            {details.trailerParagraph1 && <p className="text-base leading-relaxed text-gray-700">{details.trailerParagraph1}</p>}
            {details.trailerParagraph2 && <p className="text-base leading-relaxed text-gray-700">{details.trailerParagraph2}</p>}

            {details.trailerCtaLabel && (
              <Link
                href={`/contact?source=Enroll&course=${courseSlug}`}
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
                style={{ background: RED }}
              >
                {details.trailerCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Course Breakdown ── */}
      {(details.breakdownIntro1 || modules.length > 0) && (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF2FB] via-white to-[#FBE9E1] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                {details.breakdownHeading} <span style={{ color: RED }}>{details.breakdownHighlight}</span>
              </h2>
              {details.breakdownIntro1 && <p className="text-base leading-relaxed text-gray-700">{details.breakdownIntro1}</p>}
              {details.breakdownIntro2 && <p className="max-w-4xl text-sm leading-relaxed text-gray-600">{details.breakdownIntro2}</p>}
              {details.breakdownIntro3 && <p className="max-w-4xl text-sm leading-relaxed text-gray-600">{details.breakdownIntro3}</p>}
            </div>

            {modules.length > 0 && (
              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, idx) => (
                  <div key={module.id ?? idx} className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">{module.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{module.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
