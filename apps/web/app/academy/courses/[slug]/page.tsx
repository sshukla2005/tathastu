import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import CourseDetailClient from "./CourseDetailClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Houdini Course — Tathastu Academy`,
    description: "Master the Art of Visual Effects with the Best Houdini Course at Tathastu Academy.",
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />
      <CourseDetailClient slug={params.slug} siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
