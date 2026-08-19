import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import StatsBand from "@/components/sections/StatsBand";
import CtaBand from "@/components/sections/CtaBand";
import ClientLogos from "@/components/sections/ClientLogos";
import Testimonials from "@/components/sections/Testimonials";
import { fetchStrapi } from "@/lib/api";
import {
  SiteSettings,
  Industry,
  StatsBandSection,
  CtaBandSection,
  ClientLogosSection,
  TestimonialsSection,
} from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const INDUSTRY_SLUG = "industries";
const INDUSTRY_LABEL = "Industries";

interface IndustryCard {
  title: string;
  img: string;
  href?: string;
  big?: boolean;
}

const INDUSTRY_CARDS: IndustryCard[] = [
  {
    title: "Media and Entertainment",
    img: "/images/industries/media-and-entertainment.svg",
    href: "/industries/media-and-entertainment",
    big: true,
  },
  { title: "AEC", img: "/images/industries/aec.svg" },
  { title: "Education", img: "/images/industries/education.svg" },
  { title: "Manufacturing", img: "/images/industries/manufacturing.svg" },
  { title: "Government", img: "/images/industries/govenment.svg" },
];

const statsBandSection: StatsBandSection = {
  __component: "sections.stats-band",
  id: 1,
  heading: "Trusted by creative teams everywhere",
  stats: [
    {
      id: 1,
      documentId: "hardwares",
      value: "20+",
      label: "Number of Hardwares",
      order: 1,
    },
    {
      id: 2,
      documentId: "plugins",
      value: "80+",
      label: "Number of Plugins",
      order: 2,
    },
    {
      id: 3,
      documentId: "clients",
      value: "4100+",
      label: "Clients Served",
      order: 3,
    },
  ],
};

const ctaBandSection: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever.",
  ctaLabel: "Request Demo",
  ctaHref: `/contact?source=Demo&industry=${INDUSTRY_SLUG}`,
};

const clientLogosSection: ClientLogosSection = {
  __component: "sections.client-logos",
  id: 1,
  logos: [
    { id: 1, documentId: "hp", name: "HP", logo: null, url: "#", order: 1 },
    {
      id: 2,
      documentId: "adobe",
      name: "Adobe",
      logo: null,
      url: "#",
      order: 2,
    },
    {
      id: 3,
      documentId: "sidefx",
      name: "SideFX",
      logo: null,
      url: "#",
      order: 3,
    },
    {
      id: 4,
      documentId: "toon-boom",
      name: "Toon Boom Storyboard Pro",
      logo: null,
      url: "#",
      order: 4,
    },
    { id: 5, documentId: "dell", name: "Dell", logo: null, url: "#", order: 5 },
  ],
};

const testimonialsSection: TestimonialsSection = {
  __component: "sections.testimonials",
  id: 1,
  heading: "Words Of Trust",
  subtitle: "Trusted by customers, backed by results.",
  testimonials: [
    {
      id: 1,
      documentId: "keitan-yadav",
      quote:
        "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable.",
      authorName: "Keitan Yadav",
      authorTitle: "Chief Operating Officer",
      company: "Redchillies.vfx",
      avatar: null,
      order: 1,
    },
    {
      id: 2,
      documentId: "anisha-karthik",
      quote:
        "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs.",
      authorName: "Anisha Karthik",
      authorTitle: "CEO",
      company: "PIXADOO",
      avatar: null,
      order: 2,
    },
  ],
};

export async function generateMetadata() {
  return {
    title: "Industries We Serve — Tathastu",
    description:
      "Discover our tailor-made technology solutions for Media & Entertainment, AEC, Education, and Manufacturing.",
  };
}

export default async function IndustriesPage() {
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

      <main className="flex-grow bg-brand-light">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/media-and-entertainment/hero.svg"
            alt="Live concert production with camera operators shooting a stage performance"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {INDUSTRY_LABEL}
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">{INDUSTRY_LABEL}</span>
            </nav>
          </div>
        </section>

        {/* ── Empowering Industries grid ── */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#FF842F", filter: "blur(400px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#91FFA0", filter: "blur(300px)" }}
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
                Empowering Industries with Tailored{" "}
                <span className="text-[#4B95FF]">Software Solutions</span>
              </h2>
              <p className="text-base text-gray-500">
                Streamlined Software Solutions for Media &amp; Entertainment, AEC, Manufacturing, Marketing, Education, and Government
              </p>
            </div>

            <div className="industries-cards-grid">
              {INDUSTRY_CARDS.map((card) => {
                const cardClassName = `industries-card${card.big ? " industries-card-big" : ""}`;
                const cardContent = (
                  <>
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="industries-card-title">
                      <h3>{card.title}</h3>
                      <span className="industries-card-arrow">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </>
                );

                return card.href ? (
                  <Link key={card.title} href={card.href} className={cardClassName}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={card.title} className={cardClassName}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Stats band ── */}
        <StatsBand section={statsBandSection} />

        {/* ── Why Choose Us ── */}
        <section
          style={{ background: "#F7F8FA", padding: "100px 80px" }}
          className="industries-why-section"
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "56px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 800,
                  color: "#0B0625",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Why <span style={{ color: "#4B95FF" }}>Choose Us?</span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#555555",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Your Partner in Success—Combining Expertise, Innovation, and
                Unmatched Support to Provide Solutions That Help Your Business
                Thrive.
              </p>
            </div>
            <div className="industries-why-grid">
              {[
                {
                  img: "/images/why-choose-us/innovation.png",
                  title: "Innovation",
                  desc: "We deliver innovative tech solutions to help you deliver great results while managing your overall costs.",
                },
                {
                  img: "/images/why-choose-us/client-focus.png",
                  title: "Client Focus",
                  desc: "Doesn't matter how big or small your business is, Customer is always at the heart of our operations.",
                },
                {
                  img: "/images/why-choose-us/expertise.png",
                  title: "Expertise",
                  desc: "Rely exclusively on our professionals expertise for the best offers and solutions with their vast industry knowledge.",
                },
                {
                  img: "/images/why-choose-us/reliability.png",
                  title: "Reliability",
                  desc: "Dependable and consistent solutions, ensuring quality results and trustworthiness every time.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`industries-why-card${idx === 1 ? " industries-why-card-active" : ""}`}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 20px",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0B0625",
                      margin: "0 0 12px 0",
                      textAlign: "center",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#666666",
                      margin: 0,
                      textAlign: "center",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band ── */}
        <CtaBand section={ctaBandSection} />
        
        {/* ── Testimonials ── */}
        <Testimonials section={testimonialsSection} />

        {/* ── Client logos ── */}
        <ClientLogos section={clientLogosSection} />

      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .industries-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 24px;
          width: 100%;
          min-height: 620px;
        }
        .industries-card {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #E7E7E7;
        }
        .industries-card-big {
          grid-column: 1 / span 1;
          grid-row: 1 / span 2;
        }
        .industries-card-title {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px;
          background-color: #000000;
          opacity: 0.5;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .industries-card-title h3 {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .industries-card-arrow {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #0B0625;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .industries-cards-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; min-height: 0; }
          .industries-card-big { grid-column: 1 / span 2; grid-row: auto; aspect-ratio: 16 / 9; }
          .industries-card:not(.industries-card-big) { aspect-ratio: 4 / 3; }
        }
        @media (max-width: 640px) {
          .industries-cards-grid { grid-template-columns: 1fr; }
          .industries-card-big { grid-column: 1; }
        }
        .industries-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; width: 100%; }
        .industries-why-card {
          background: #FFFFFF;
          border: 1.5px solid #E8E8E8;
          border-radius: 12px;
          padding: 40px 24px;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .industries-why-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        border-color: #4B95FF;
          box-shadow: 0 4px 20px rgba(75,149,255,0.15); }
        
        @media (max-width: 1024px) {
          .industries-why-section { padding: 60px 40px !important; }
          .industries-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .industries-why-section { padding: 40px 20px !important; }
          .industries-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
