"use client";

import React, { useState } from "react";

const RED = "#E02020";
const CARD_BG = "#1A1A1A";
const BORDER = "rgba(224,32,32,0.35)";

const FAQS = [
  {
    q: "Do I need prior Houdini experience?",
    a: "For the Masterclass and Core Intensive, a background in any 3D software (Maya, Blender, Cinema 4D) is sufficient. Specialization tracks require at least basic Houdini familiarity.",
  },
  {
    q: "How are sessions conducted?",
    a: "All sessions are live via Zoom/Google Meet. Each batch has fixed weekly live sessions plus open office hours. Recordings are shared within 24 hours.",
  },
  {
    q: "What is the batch size?",
    a: "All batches are capped at 15 artists to ensure personal mentorship and real feedback on your work.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes. We offer EMI options and installment-based payment for all programs. Book a call to discuss the options that fit your situation.",
  },
  {
    q: "Will I get placement support?",
    a: "Top graduates are introduced to our studio network. We provide portfolio review, resume guidance, and warm referrals — but we do not guarantee placement.",
  },
];

export default function AcademyFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {FAQS.map((faq, i) => (
        <div
          key={i}
          style={{
            background: CARD_BG,
            border: `1px solid ${open === i ? BORDER : "rgba(255,255,255,0.08)"}`,
            borderRadius: "10px",
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#fff",
                lineHeight: 1.4,
              }}
            >
              {faq.q}
            </span>
            <span
              style={{
                color: RED,
                fontSize: "22px",
                fontWeight: 300,
                flexShrink: 0,
                display: "inline-block",
                transition: "transform 0.2s",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>

          {open === i && (
            <p
              style={{
                padding: "0 24px 20px",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
