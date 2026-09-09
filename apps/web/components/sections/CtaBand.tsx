"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { CtaBandSection } from "@tathastu/types";

interface CtaBandProps {
  section: CtaBandSection;
}

const FIELD_LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
  color: "#0B0625",
  marginBottom: "8px",
};

const FIELD_INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #DDDDDD",
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: "'Open Sans', sans-serif",
  color: "#0B0625",
  outline: "none",
  boxSizing: "border-box",
};

function QuoteModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    experience: "",
    qualification: "",
    message: "",
  });
  const [cvFileName, setCvFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,6,37,0.55)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          padding: "40px 48px",
          textAlign: "left",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1.5px solid #0B0625",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} color="#0B0625" />
        </button>

        <h2
          style={{
            fontSize: "clamp(22px, 2.6vw, 30px)",
            fontWeight: 800,
            color: "#0B0625",
            margin: "0 0 32px 0",
            textAlign: "center",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          Get the Perfect Quote.
        </h2>

        {submitted ? (
          <div
            style={{
              padding: "60px 0",
              textAlign: "center",
              color: "#22C55E",
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            ✓ Thank you! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="cta-quote-grid">
              <div>
                <label style={FIELD_LABEL_STYLE}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Experience (in years)</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Upload Your CV</label>
                <label
                  style={{
                    ...FIELD_INPUT_STYLE,
                    display: "flex",
                    alignItems: "center",
                    background: "#E5E7EB",
                    color: "#374151",
                    cursor: "pointer",
                  }}
                >
                  {cvFileName || "Browse..."}
                  <input
                    type="file"
                    name="cv"
                    onChange={(e) =>
                      setCvFileName(e.target.files?.[0]?.name || "")
                    }
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className="cta-quote-full">
                <label style={FIELD_LABEL_STYLE}>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...FIELD_INPUT_STYLE, resize: "vertical" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                type="submit"
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .cta-quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
        .cta-quote-full { grid-column: 1 / -1; }
        @media (max-width: 640px) {
          .cta-quote-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

/*
  Figma node 40:3142 — CTA band
  - Dark photograph background (circuit board) + dark overlay
  - Centered, white: heading "Design Support for All Your Creative Needs"
  - Gray subtext (2 lines): "Get a free introduction and discover how you and your team..."
  - "Request Demo" blue gradient pill centered
  No: gradient orange-to-blue rounded banner container, glowing circles, hover tricks
*/

export default function CtaBand({ section }: CtaBandProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 80px",
        textAlign: "center",
        backgroundColor: "#0a0e1a",
      }}
    >
      {/* Circuit board / workstation photo background */}
      <Image
        src="/images/cta/cta-bg.jpg"
        alt=""
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,8,20,0.82)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {section.heading}
        </h2>

        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "620px",
          }}
        >
          {section.subtext}
        </p>

        {/* "Request Demo" blue gradient pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 36px",
            marginTop: "12px",
            background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
            color: "#FFFFFF",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            border: "none",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          {section.ctaLabel}
        </button>
      </div>

      {isModalOpen && <QuoteModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
