import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, CtaBandSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const FALLBACK_HERO_IMAGE = "/images/media-and-entertainment/hero.svg";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: Industry[] }>(`/industries?filters[slug][$eq]=${slug}`);
    const industry = res?.data?.[0];
    if (industry) {
      return {
        title: `${industry.name} Solutions — Tathastu`,
        description: industry.shortDescription,
      };
    }
  } catch (err) {
    console.error("Error generating industry detail metadata:", err);
  }
  return { title: "Industry Solutions — Tathastu" };
}

export default async function IndustryDetailPage({ params, searchParams }: IndustryPageProps) {
  const { slug } = await params;
  const { category = "", q = "" } = await searchParams;

  const [settingsRes, industriesRes, currentIndRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Industry[] }>(
      `/industries?filters[slug][$eq]=${slug}&populate[heroImage][populate]=*&populate[icon][populate]=*&populate[brands][populate]=logo`,
    ),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const currentIndustry = currentIndRes?.data?.[0];

  if (!currentIndustry) {
    notFound();
  }

  if (!siteSettings) return null;

  const heroImage = getStrapiMediaUrl(currentIndustry.heroImage?.url) || FALLBACK_HERO_IMAGE;
  const brands = currentIndustry.brands || [];

  const query = q.trim().toLowerCase();
  const filteredBrands = brands.filter((brand) => {
    const matchesCategory = !category || brand.category === category;
    const matchesQuery =
      !query ||
      brand.name.toLowerCase().includes(query) ||
      (brand.description || "").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: `/contact?source=Demo&industry=${currentIndustry.slug}`,
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb + search ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src={heroImage}
            alt={currentIndustry.name}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{currentIndustry.name}</h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-white">
                Industries
              </Link>
              <span>/</span>
              <span className="text-white">{currentIndustry.name}</span>
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
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 text-gray-400" />
            </div>

            <div className="flex flex-[1.4] items-center gap-2 rounded-lg bg-white px-4 py-3 opacity-100">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search"
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

        {/* ── About this industry ── */}
        {currentIndustry.shortDescription && (
          <section className="bg-white px-6 pt-16 sm:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-lg text-gray-600 leading-relaxed">{currentIndustry.shortDescription}</p>
            </div>
          </section>
        )}

        {/* ── Brand / partner grid ── */}
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
            {filteredBrands.length === 0 ? (
              <p className="py-12 text-center text-gray-500">
                {brands.length === 0
                  ? "Partner and product details for this industry are coming soon."
                  : "No results found. Try a different search or category."}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredBrands.map((brand, index) => {
                  const cardClassName =
                    "flex flex-col overflow-hidden rounded-[10px] border border-[#E7E7E7] bg-white opacity-100 shadow-md transition-shadow hover:shadow-xl";
                  const cardContent = (
                    <>
                      <div className="relative aspect-[290/137] w-full rounded-[10px] p-3">
                        <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-gray-50">
                          {getStrapiMediaUrl(brand.logo?.url) ? (
                            <Image
                              src={getStrapiMediaUrl(brand.logo?.url)}
                              alt={brand.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                              {brand.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <p className="text-sm leading-relaxed text-gray-500">{brand.description}</p>
                      </div>
                    </>
                  );

                  return brand.href ? (
                    <Link key={brand.id ?? index} href={brand.href} className={cardClassName}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={brand.id ?? index} className={cardClassName}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA band ── */}
        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
