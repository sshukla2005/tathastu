"use client";

import React from "react";
import Link from "next/link";
import { HeroSection } from "@tathastu/types";

interface HeroProps {
  section: HeroSection;
}

export default function Hero({ section }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-dark min-h-[600px] lg:min-h-[750px] flex items-center text-white">
      {/* Decorative Gradient Background Overlay */}
      <div className="absolute inset-0 bg-hero-gradient mix-blend-multiply opacity-90 z-0" />

      {/* Decorative Network Grid Dots */}
      <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[59px] font-extrabold leading-tight lg:leading-[80px] drop-shadow-md tracking-tight">
            {section.heading}
          </h1>
          <p className="text-lg sm:text-xl lg:text-[26px] text-gray-300 leading-relaxed lg:leading-[42px] font-normal">
            {section.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
            <Link
              href={section.primaryCtaHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-opacity-90 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-lg hover:shadow-xl bg-btn-blue cursor-pointer"
            >
              {section.primaryCtaLabel}
            </Link>
            <Link
              href={section.secondaryCtaHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 border border-brand-border-blue text-brand-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-lg hover:shadow-xl cursor-pointer"
            >
              {section.secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {/* Right Decorative Interactive Column */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[350px] lg:h-[480px]">
          {/* Main Glowing Circle */}
          <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-primary filter blur-[80px] opacity-30 animate-pulse" />

          {/* Houdini Network Node Graph Animation mockup */}
          <div className="relative w-full h-full max-w-[450px] rounded-3xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Dots background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b95ff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="flex justify-between items-center border-b border-gray-800 pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-mono text-gray-500">tathastu_node_graph.hip</span>
            </div>

            {/* SVG Network Graph */}
            <svg className="w-full h-56 relative z-10" viewBox="0 0 350 220">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eb5e0d" />
                  <stop offset="100%" stopColor="#4b95ff" />
                </linearGradient>
              </defs>

              {/* Connections (Lines) */}
              <line x1="60" y1="50" x2="160" y2="90" stroke="url(#edgeGrad)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
              <line x1="60" y1="170" x2="160" y2="90" stroke="url(#edgeGrad)" strokeWidth="2" />
              <line x1="160" y1="90" x2="260" y2="50" stroke="#4b95ff" strokeWidth="2" />
              <line x1="160" y1="90" x2="260" y2="170" stroke="#ecd026" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="260" y1="50" x2="260" y2="170" stroke="#8ceda4" strokeWidth="2" />

              {/* Node 1 (Input/Hardware) */}
              <circle cx="60" cy="50" r="14" fill="#1e293b" stroke="#eb5e0d" strokeWidth="3" />
              <text x="60" y="54" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle">HW</text>
              <text x="60" y="30" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">Workstation</text>

              {/* Node 2 (Input/Plugins) */}
              <circle cx="60" cy="170" r="14" fill="#1e293b" stroke="#ecd026" strokeWidth="3" />
              <text x="60" y="174" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle">PL</text>
              <text x="60" y="196" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">Plugins</text>

              {/* Node 3 (Core/SideFX) */}
              <circle cx="160" cy="90" r="20" fill="#1e293b" stroke="#4b95ff" strokeWidth="4" className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] absolute" style={{ transformOrigin: "160px 90px" }} />
              <circle cx="160" cy="90" r="20" fill="#0f172a" stroke="#4b95ff" strokeWidth="4" />
              <text x="160" y="94" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CORE</text>
              <text x="160" y="62" fill="#4b95ff" fontSize="12" fontWeight="extrabold" textAnchor="middle">Houdini</text>

              {/* Node 4 (Output/VFX) */}
              <circle cx="260" cy="50" r="14" fill="#1e293b" stroke="#8ceda4" strokeWidth="3" />
              <text x="260" y="54" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle">VFX</text>
              <text x="260" y="30" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">Redchilli</text>

              {/* Node 5 (Output/AEC) */}
              <circle cx="260" cy="170" r="14" fill="#1e293b" stroke="#9bc4ff" strokeWidth="3" />
              <text x="260" y="174" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle">AEC</text>
              <text x="260" y="196" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">Studio</text>
            </svg>

            <div className="flex justify-between items-center border-t border-gray-800 pt-4 relative z-10">
              <span className="text-xs font-mono text-brand-primary font-bold">NODE STATUS: ACTIVE</span>
              <span className="text-xs font-mono text-gray-500">FPS: 60.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
