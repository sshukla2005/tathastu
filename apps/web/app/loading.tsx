import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-zinc-50/50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Custom Loader matching brand identity */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-brand-primary border-r-brand-primary animate-spin" />
        </div>
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase animate-pulse mt-2">
          Loading Tathastu...
        </p>
      </div>
    </div>
  );
}
