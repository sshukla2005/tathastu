"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    source: "Contact",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z\s'-]/g, "");
    setFormData({ ...formData, name: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        source: "Contact",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold text-brand-dark">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter Name"
          pattern="[A-Za-z\s'-]+"
          title="Please enter a valid name (letters only)"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold text-brand-dark">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-bold text-brand-dark">
          Mobile Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Enter Mobile Number"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          title="Please enter a valid 10-digit mobile number"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-sm font-bold text-brand-dark">
          Subject
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter Subject"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-bold text-brand-dark">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter Message"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium resize-none"
        />
      </div>

      {/* Feedback Messages */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100 font-medium">
          <CheckCircle2 size={20} className="shrink-0 text-green-600" />
          <span>
            Thank you! Your message has been submitted. Our team will contact
            you shortly.
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-medium">
          <AlertCircle size={20} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-fit px-10 py-3.5 bg-btn-blue text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 transform hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer shadow"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </form>
  );
}
