"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiteSettings, Industry } from "@tathastu/types";

interface HeaderProps {
  siteSettings: SiteSettings;
  industries: Industry[];
}

export default function Header({ siteSettings, industries }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isHome = pathname === "/";

  return (
    /*
      Figma node 40:3 — Group 1000013897
      Rectangle 1 (40:4): background #FFFFFF, boxShadow 0px 2px 5px 0px rgba(0,0,0,0.25)
      Rectangle 2 (84:4205): gradient overlay at very low opacity to create
        the "subtle horizontal gradient, light blue (left) → cream/peach (right)" effect.
      We implement this as a position:relative wrapper with a pseudo-gradient layer.
    */
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
        /* Subtle gradient overlay from Rectangle 2 at ~8% opacity:
           Figma gradient: #EB5E0D → #ECD026 → #8CEDA4 → #9BC4FF
           Reversed for left=blue → right=cream (spec description) */
        background:
          "linear-gradient(90deg, rgba(155,196,255,0.12) 0%, rgba(140,237,164,0.08) 29%, rgba(236,208,38,0.06) 62%, rgba(235,94,13,0.05) 100%), #FFFFFF",
      }}
    >
      {/* ── Main nav bar ── */}
      <nav
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          /* Figma: content group starts at left:236px of a 1920px frame → ~12.3% padding */
          padding: "0 122px",
          height: "166px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo: mark (139×103) + wordmark (259×52) ──
            Figma group 40:6185: width 415px, height 103px, gap 16px */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.25))",
            flexShrink: 0,
          }}
        >
          {/* Mark  139×103 */}
          <Image
            src="/images/header/logo-mark.svg"
            alt="Tathastu mark"
            width={139}
            height={103}
            priority
            style={{ height: "103px", width: "auto" }}
          />
          {/* Wordmark 259×52 */}
          <Image
            src="/images/header/logo-wordmark.svg"
            alt="TATHASTU TECHNO SOLUTION"
            width={259}
            height={52}
            priority
            style={{ height: "52px", width: "auto" }}
          />
        </Link>

        {/* ── Desktop nav links ──
            Figma group 40:9: 545×25px, gap 40px, at left:583px top:41px (within content group)
            Links: Home (#4B95FF bold active), Solutions▾, Industries▾, About, Contact
            All: Open Sans 18px, lineHeight 25px, weight 600 (700 for active Home) */}
        <div
          className="hidden lg:flex"
          style={{
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Home */}
          <Link
            href="/"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: isHome ? 700 : 600,
              color: isHome ? "#4B95FF" : "#000000",
              textDecoration: "none",
              lineHeight: "25px",
              whiteSpace: "nowrap",
            }}
          >
            Home
          </Link>

          {/* Solutions ▾ */}
          <div style={{ position: "relative" }} className="group">
            <button
              onClick={() => toggleDropdown("solutions")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: "25px",
              }}
            >
              <span>Solutions</span>
              {/* Figma vector 40:13 — 13×7px caret */}
              <Image
                src="/images/header/caret-down.svg"
                alt=""
                width={13}
                height={7}
              />
            </button>
            {/* Dropdown */}
            <div
              className="opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                width: "220px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                padding: "8px",
                transition: "opacity 0.2s, visibility 0.2s",
                zIndex: 100,
              }}
            >
              <Link
                href="/studio"
                style={{
                  display: "block",
                  padding: "10px 14px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#0b0625",
                  textDecoration: "none",
                  borderRadius: "8px",
                }}
                className="hover:bg-gray-50"
              >
                Tathastu Studio
              </Link>
              <Link
                href="/academy"
                style={{
                  display: "block",
                  padding: "10px 14px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#0b0625",
                  textDecoration: "none",
                  borderRadius: "8px",
                }}
                className="hover:bg-gray-50"
              >
                Tathastu Academy
              </Link>
            </div>
          </div>

          {/* Industries ▾ */}
          <div style={{ position: "relative" }} className="group">
            <button
              onClick={() => toggleDropdown("industries")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: "25px",
              }}
            >
              <span>Industries</span>
              {/* Figma vector 40:15 — 13×7px caret */}
              <Image
                src="/images/header/caret-down-industries.svg"
                alt=""
                width={13}
                height={7}
              />
            </button>
            <div
              className="opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                width: "260px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                padding: "8px",
                transition: "opacity 0.2s, visibility 0.2s",
                zIndex: 100,
              }}
            >
              <Link
                href="/industries"
                style={{
                  display: "block",
                  padding: "10px 14px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0b0625",
                  textDecoration: "none",
                  borderRadius: "8px",
                  borderBottom: "1px solid #f3f4f6",
                  marginBottom: "4px",
                }}
                className="hover:bg-gray-50"
              >
                All Industries
              </Link>
              {industries.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0b0625",
                    textDecoration: "none",
                    borderRadius: "8px",
                  }}
                  className="hover:bg-gray-50"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <Link
            href="/about"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: pathname.startsWith("/about") ? 700 : 600,
              color: pathname.startsWith("/about") ? "#4B95FF" : "#000000",
              textDecoration: "none",
              lineHeight: "25px",
              whiteSpace: "nowrap",
            }}
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: pathname.startsWith("/contact") ? 700 : 600,
              color: pathname.startsWith("/contact") ? "#4B95FF" : "#000000",
              textDecoration: "none",
              lineHeight: "25px",
              whiteSpace: "nowrap",
            }}
          >
            Contact
          </Link>
        </div>

        {/* ── CTA pill: "Get In Touch" ──
            Figma group 40:5: 223×64px, borderRadius 46px
            Rectangle 7 (40:6): white fill, gradient border 1.5px (orange→yellow→green)
            Text (40:7): "Get In Touch", Open Sans 22px 600, color #000000, center */}
        <div className="hidden lg:block" style={{ flexShrink: 0 }}>
          {/*
            CSS gradient border trick:
            Outer wrapper = gradient background (the border)
            Inner span   = white fill (the pill interior)
            padding = 1.5px to match Figma borderWidth 1.5px
          */}
          <Link
            href={siteSettings.headerCtaHref}
            style={{
              display: "inline-block",
              padding: "1.5px",
              borderRadius: "46px",
              background:
                "linear-gradient(90deg, #EB5B0C 0%, #ECD027 45%, #8AEEA6 100%)",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "220px",
                height: "61px",
                borderRadius: "44px",
                backgroundColor: "#FFFFFF",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#000000",
                lineHeight: "30px",
                textAlign: "center",
              }}
            >
              Get In Touch
            </span>
          </Link>
        </div>

        {/* ── Mobile burger ── */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0b0625"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{
            borderTop: "1px solid #f3f4f6",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: isHome ? "#4B95FF" : "#000000",
              textDecoration: "none",
              padding: "8px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            Home
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => toggleDropdown("solutions-mobile")}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                background: "none",
                border: "none",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
                padding: "8px 0",
                width: "100%",
              }}
            >
              <span>Solutions</span>
              <Image
                src="/images/header/caret-down.svg"
                alt=""
                width={13}
                height={7}
              />
            </button>
            {activeDropdown === "solutions-mobile" && (
              <div
                style={{
                  paddingLeft: "16px",
                  borderLeft: "2px solid #4B95FF",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Link
                  href="/studio"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    color: "#0b0625",
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  Tathastu Studio
                </Link>
                <Link
                  href="/academy"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    color: "#0b0625",
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  Tathastu Academy
                </Link>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => toggleDropdown("industries-mobile")}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                background: "none",
                border: "none",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
                padding: "8px 0",
                width: "100%",
              }}
            >
              <span>Industries</span>
              <Image
                src="/images/header/caret-down-industries.svg"
                alt=""
                width={13}
                height={7}
              />
            </button>
            {activeDropdown === "industries-mobile" && (
              <div
                style={{
                  paddingLeft: "16px",
                  borderLeft: "2px solid #4B95FF",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Link
                  href="/industries"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0b0625",
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  All Industries
                </Link>
                {industries.map((ind) => (
                  <Link
                    key={ind.id}
                    href={`/industries/${ind.slug}`}
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "15px",
                      color: "#0b0625",
                      textDecoration: "none",
                      padding: "4px 0",
                    }}
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: pathname.startsWith("/about") ? "#4B95FF" : "#000000",
              textDecoration: "none",
              padding: "8px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            About
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: pathname.startsWith("/contact") ? "#4B95FF" : "#000000",
              textDecoration: "none",
              padding: "8px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            Contact
          </Link>

          {/* Mobile CTA */}
          <Link
            href={siteSettings.headerCtaHref}
            style={{
              display: "block",
              padding: "1.5px",
              borderRadius: "46px",
              background:
                "linear-gradient(90deg, #EB5B0C 0%, #ECD027 45%, #8AEEA6 100%)",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                display: "block",
                padding: "14px",
                borderRadius: "44px",
                backgroundColor: "#FFFFFF",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              Get In Touch
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
