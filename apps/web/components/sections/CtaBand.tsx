"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { CtaBandSection } from "@tathastu/types";

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB

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
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z\s'-]/g, "");
    setFormData({ ...formData, name: value });
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setFormData({ ...formData, experience: value });
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError(null);

    if (!file) {
      setCvFile(null);
      setCvFileName("");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please upload a PDF or Word document.");
      setCvFile(null);
      setCvFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File must be smaller than 5MB.");
      setCvFile(null);
      setCvFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCvFile(file);
    setCvFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      setFileError("Please upload your CV.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("position", formData.position);
      body.append("experience", formData.experience);
      body.append("qualification", formData.qualification);
      body.append("message", formData.message);
      body.append("cv", cvFile);

      const response = await fetch("/api/career-application", {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", position: "", experience: "", qualification: "", message: "" });
      setCvFile(null);
      setCvFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
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
          Apply Now
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CheckCircle2 size={40} />
            <span>Thank you! Your application has been submitted. We&apos;ll be in touch soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="cta-quote-grid">
              <div>
                <label style={FIELD_LABEL_STYLE}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Enter Name"
                  pattern="[A-Za-z\s'-]+"
                  title="Please enter a valid name (letters only)"
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Position</label>
                <input
                  type="text"
                  name="position"
                  required
                  minLength={2}
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position you're applying for"
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Experience (in years)</label>
                <input
                  type="text"
                  name="experience"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{1,2}"
                  maxLength={2}
                  title="Please enter your years of experience as a number"
                  value={formData.experience}
                  onChange={handleExperienceChange}
                  placeholder="e.g. 3"
                  style={FIELD_INPUT_STYLE}
                />
              </div>
              <div>
                <label style={FIELD_LABEL_STYLE}>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  required
                  minLength={2}
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
                    border: fileError ? "1.5px solid #EF4444" : FIELD_INPUT_STYLE.border,
                  }}
                >
                  {cvFileName || "Browse..."}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvChange}
                    style={{ display: "none" }}
                  />
                </label>
                <p style={{ fontSize: "12px", color: fileError ? "#EF4444" : "#6B7280", margin: "6px 0 0" }}>
                  {fileError || "PDF or Word document, up to 5MB"}
                </p>
              </div>
              <div className="cta-quote-full">
                <label style={FIELD_LABEL_STYLE}>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Anything else you'd like us to know?"
                  style={{ ...FIELD_INPUT_STYLE, resize: "vertical" }}
                />
              </div>
            </div>

            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                  padding: "14px 18px",
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  borderRadius: "12px",
                  border: "1px solid #FEE2E2",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "999px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {loading && (
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#FFFFFF",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "cta-spin 0.7s linear infinite",
                    }}
                  />
                )}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes cta-spin { to { transform: rotate(360deg); } }
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
