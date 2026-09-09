import React from "react";
import { StudioFindInsideSection, ContactCard } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioFindInsideProps {
  section: StudioFindInsideSection;
}

function ContactCardView({ contact }: { contact: ContactCard }) {
  return (
    <div className="studio-contact-card">
      <div className="studio-contact-content">
        <p className="studio-contact-name">{contact.name}</p>
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="studio-contact-value">
            {contact.email}
          </a>
        )}
        {contact.phone && (
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="studio-contact-value">
            {contact.phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default function StudioFindInside({ section }: StudioFindInsideProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || "/images/studio/trusted-bg.jpg";
  const studioContacts = section.studioContacts || [];
  const freelancerContacts = section.freelancerContacts || [];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px",
        color: "#FFFFFF",
      }}
      className="studio-find-section"
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={backgroundImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.78)", zIndex: 1 }} />
      {/* Radio inputs for CSS-based toggling */}
      <input type="radio" id="studio-toggle-studios" name="studio-toggle" defaultChecked style={{ display: "none" }} />
      <input type="radio" id="studio-toggle-freelancers" name="studio-toggle" style={{ display: "none" }} />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", maxWidth: "800px" }}>
          <h2
            style={{ fontSize: "54px", fontWeight: 800, lineHeight: "68px", color: "#FFFFFF", margin: 0, fontFamily: "'Open Sans', sans-serif" }}
            className="studio-find-title"
          >
            {section.heading} <span style={{ color: "#D61814" }}>{section.headingHighlight}</span>
          </h2>
        </div>

        {/* Toggle bar */}
        <div className="studio-toggle-bar">
          <label htmlFor="studio-toggle-studios" className="studio-toggle-label studio-toggle-label-studios">
            {section.studioToggleLabel}
          </label>
          <label htmlFor="studio-toggle-freelancers" className="studio-toggle-label studio-toggle-label-freelancers">
            {section.freelancerToggleLabel}
          </label>
        </div>

        {/* Contact Cards Containers */}
        <div className="studio-cards-container for-studios-only">
          {studioContacts.map((contact, idx) => (
            <ContactCardView key={contact.id ?? idx} contact={contact} />
          ))}
        </div>
        {freelancerContacts.length > 0 && (
          <div className="studio-cards-container for-freelancers-only" style={{ display: "none" }}>
            {freelancerContacts.map((contact, idx) => (
              <ContactCardView key={contact.id ?? idx} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
