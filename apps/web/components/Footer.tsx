"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiteSettings } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface FooterProps {
  siteSettings: SiteSettings;
}

export default function Footer({ siteSettings }: FooterProps) {
  const logoUrl = siteSettings.logo
    ? getStrapiMediaUrl(siteSettings.logo.url)
    : null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.524 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.027 0 12 0 12s0 3.973.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.476 20.455 12 20.455 12 20.455s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.973 24 12 24 12s0-3.973-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Info column */}
        <div>
          <Link href="/" className="inline-block mb-6">
            {logoUrl ? (
              <img src={logoUrl} alt="Tathastu Logo" className="h-10 w-auto brightness-200" />
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-primary bg-clip-text text-transparent">
                TATHASTU
              </span>
            )}
          </Link>
          <p className="text-gray-400 text-sm mb-6 max-w-sm">
            Empowering creative industries with high-performance hardware, software, and plugins. Specialized Houdini training and production pipelines.
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            {siteSettings.phone && (
              <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                <Phone size={16} className="text-brand-primary" />
                <span>{siteSettings.phone}</span>
              </a>
            )}
            {siteSettings.email && (
              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                <Mail size={16} className="text-brand-primary" />
                <span>{siteSettings.email}</span>
              </a>
            )}
            {siteSettings.address && (
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-primary mt-1 shrink-0" />
                <span>{siteSettings.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Columns from siteSettings */}
        {siteSettings.footerColumns.map((col, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-bold mb-6 text-brand-primary tracking-wide">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500 text-center md:text-left">
          {siteSettings.copyrightText || "© Copyright 2026 Tathastu. All Rights Reserved."}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 font-semibold mr-2">Follow us:</span>
          {siteSettings.socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label={`Follow us on ${social.platform}`}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
