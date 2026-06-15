"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

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
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold text-brand-dark">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-brand-dark">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-bold text-brand-dark">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-bold text-brand-dark">
            Company / Studio
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Studio Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium"
          />
        </div>
      </div>

      {/* Inquiry Source / Reason */}
      <div className="flex flex-col gap-2">
        <label htmlFor="source" className="text-sm font-bold text-brand-dark">
          Inquiry Type <span className="text-red-500">*</span>
        </label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary bg-white transition-all text-brand-dark font-medium cursor-pointer"
        >
          <option value="Contact">General Inquiry / Reselling</option>
          <option value="Demo">Request a Demo</option>
          <option value="Consultation">Request pipeline Consultation</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-bold text-brand-dark">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your workstation configurations or licensing needs..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary transition-all text-brand-dark font-medium resize-none"
        />
      </div>

      {/* Feedback Messages */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100 font-medium">
          <CheckCircle2 size={20} className="shrink-0 text-green-600" />
          <span>Thank you! Your message has been submitted. Our team will contact you shortly.</span>
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
        className="w-full py-4 bg-brand-primary hover:bg-opacity-95 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer shadow bg-btn-blue text-lg"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
