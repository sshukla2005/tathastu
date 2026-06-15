"use client";

import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Next.js Boundary Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-zinc-50 text-brand-dark">
      <div className="max-w-md flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <AlertTriangle size={36} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Something Went Wrong</h1>
        <p className="text-gray-500 leading-relaxed">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary hover:bg-opacity-95 font-bold text-white rounded-full transition-all duration-300 transform active:scale-95 shadow bg-btn-blue cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
