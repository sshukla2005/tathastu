import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import ContactForm from "./ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Contact Us — Tathastu",
    description: "Get in touch with our team for consultations, hardware sizing, plugin configurations, or training inquiries.",
  };
}

export default async function ContactPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Contact Our Experts
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have a pipeline issue or need a software quote? Fill out the form and our engineers will get back to you.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
            {/* Left Contact Details panel */}
            <div className="lg:col-span-5 bg-brand-dark text-white rounded-[40px] p-8 sm:p-12 shadow-xl flex flex-col justify-between border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col gap-8">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tathastu Techno Solution supports major creative visual pipelines with original products and support assistance.
                </p>

                <div className="flex flex-col gap-6 text-sm">
                  {siteSettings.phone && (
                    <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-4 hover:text-brand-primary transition-colors py-1">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 font-semibold uppercase">Call Us</span>
                        <span className="text-base font-bold">{siteSettings.phone}</span>
                      </div>
                    </a>
                  )}

                  {siteSettings.email && (
                    <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-4 hover:text-brand-primary transition-colors py-1">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 font-semibold uppercase">Email Us</span>
                        <span className="text-base font-bold">{siteSettings.email}</span>
                      </div>
                    </a>
                  )}

                  <div className="flex items-start gap-4 py-1">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-semibold uppercase">Visit Us</span>
                      <span className="text-sm font-medium leading-relaxed block text-gray-300">
                        {siteSettings.address || "Mumbai, Maharashtra, India"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 text-xs text-gray-500 font-mono">
                RESPONSES TYPICALLY WITHIN 24 HOURS
              </div>
            </div>

            {/* Right Contact Form panel */}
            <div className="lg:col-span-7 bg-white rounded-[40px] p-8 sm:p-12 shadow-md border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
