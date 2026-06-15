"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { SiteSettings, Industry } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface HeaderProps {
  siteSettings: SiteSettings;
  industries: Industry[];
}

export default function Header({ siteSettings, industries }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const logoUrl = siteSettings.logo
    ? getStrapiMediaUrl(siteSettings.logo.url)
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Thin Stripe */}
      <div className="h-2 w-full bg-brand-top-stripe" />

      {/* Topbar Contact Info */}
      <div className="bg-brand-dark text-white text-xs py-2 px-6 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-6">
          {siteSettings.phone && (
            <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
              <Phone size={12} />
              <span>{siteSettings.phone}</span>
            </a>
          )}
          {siteSettings.email && (
            <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
              <Mail size={12} />
              <span>{siteSettings.email}</span>
            </a>
          )}
        </div>
        <div>
          <span className="opacity-75">Authorized Reseller of Houdini, HP, Dell & Adobe</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Tathastu Logo" className="h-10 w-auto" />
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-primary bg-clip-text text-transparent">
              TATHASTU
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {siteSettings.nav.map((item) => {
            if (item.label === "Solutions") {
              return (
                <div key={item.id} className="relative group">
                  <button
                    className={`flex items-center gap-1 text-lg font-semibold hover:text-brand-primary transition-colors py-2 cursor-pointer ${
                      pathname.startsWith("/studio") || pathname.startsWith("/academy")
                        ? "text-brand-primary font-bold"
                        : "text-brand-dark"
                    }`}
                    onClick={() => toggleDropdown("solutions")}
                  >
                    <span>Solutions</span>
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
                    <Link
                      href="/studio"
                      className="block px-4 py-3 hover:bg-gray-50 rounded-lg text-brand-dark font-medium transition-colors"
                    >
                      Tathastu Studio
                      <span className="block text-xs text-gray-500 font-normal mt-0.5">VFX & Media Solutions</span>
                    </Link>
                    <Link
                      href="/academy"
                      className="block px-4 py-3 hover:bg-gray-50 rounded-lg text-brand-dark font-medium transition-colors"
                    >
                      Tathastu Academy
                      <span className="block text-xs text-gray-500 font-normal mt-0.5">Where Artists Become Ready</span>
                    </Link>
                  </div>
                </div>
              );
            }

            if (item.label === "Industries") {
              return (
                <div key={item.id} className="relative group">
                  <button
                    className={`flex items-center gap-1 text-lg font-semibold hover:text-brand-primary transition-colors py-2 cursor-pointer ${
                      pathname.startsWith("/industries") ? "text-brand-primary font-bold" : "text-brand-dark"
                    }`}
                    onClick={() => toggleDropdown("industries")}
                  >
                    <span>Industries</span>
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
                    <Link
                      href="/industries"
                      className="block px-4 py-3 hover:bg-gray-50 rounded-lg text-brand-dark font-semibold border-b border-gray-50 mb-1 transition-colors"
                    >
                      All Industries
                    </Link>
                    {industries.map((ind) => (
                      <Link
                        key={ind.id}
                        href={`/industries/${ind.slug}`}
                        className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm text-brand-dark font-medium transition-colors"
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const isHome = item.href === "/" && pathname === "/";
            const isActive = isHome || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`text-lg font-semibold hover:text-brand-primary transition-colors ${
                  isActive ? "text-brand-primary font-bold" : "text-brand-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Header CTA Button */}
        <div className="hidden lg:block">
          <Link
            href={siteSettings.headerCtaHref}
            className="relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-black bg-white rounded-full border-[1.5px] border-transparent transition-all duration-300 hover:scale-105 active:scale-95 group shadow-sm"
          >
            {/* Gradient border wrapper */}
            <span className="absolute inset-0 rounded-full border-[1.5px] border-transparent bg-brand-header-stripe -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">{siteSettings.headerCtaLabel}</span>
          </Link>
        </div>

        {/* Mobile Burger Menu Icon */}
        <button
          className="lg:hidden p-2 text-brand-dark hover:text-brand-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 flex flex-col gap-4 shadow-inner">
          {siteSettings.nav.map((item) => {
            if (item.label === "Solutions") {
              return (
                <div key={item.id} className="flex flex-col gap-2">
                  <button
                    className="flex justify-between items-center text-lg font-semibold text-brand-dark py-2 border-b border-gray-50"
                    onClick={() => toggleDropdown("solutions-mobile")}
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        activeDropdown === "solutions-mobile" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "solutions-mobile" && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-gray-100 mt-1">
                      <Link href="/studio" className="py-2 text-brand-dark hover:text-brand-primary font-medium">
                        Tathastu Studio
                      </Link>
                      <Link href="/academy" className="py-2 text-brand-dark hover:text-brand-primary font-medium">
                        Tathastu Academy
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (item.label === "Industries") {
              return (
                <div key={item.id} className="flex flex-col gap-2">
                  <button
                    className="flex justify-between items-center text-lg font-semibold text-brand-dark py-2 border-b border-gray-50"
                    onClick={() => toggleDropdown("industries-mobile")}
                  >
                    <span>Industries</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        activeDropdown === "industries-mobile" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "industries-mobile" && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-gray-100 mt-1">
                      <Link href="/industries" className="py-2 text-brand-dark hover:text-brand-primary font-semibold">
                        All Industries
                      </Link>
                      {industries.map((ind) => (
                        <Link
                          key={ind.id}
                          href={`/industries/${ind.slug}`}
                          className="py-2 text-sm text-brand-dark hover:text-brand-primary font-medium"
                        >
                          {ind.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isHome = item.href === "/" && pathname === "/";
            const isActive = isHome || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`text-lg font-semibold py-2 border-b border-gray-50 ${
                  isActive ? "text-brand-primary font-bold" : "text-brand-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <Link
            href={siteSettings.headerCtaHref}
            className="w-full text-center bg-brand-primary text-white font-bold py-3 rounded-full mt-4 hover:bg-opacity-90 shadow"
          >
            {siteSettings.headerCtaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
