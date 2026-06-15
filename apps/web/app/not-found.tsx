import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-zinc-50 text-brand-dark">
      <div className="max-w-md flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange animate-bounce">
          <HelpCircle size={36} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Page Not Found</h1>
        <p className="text-gray-500 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary hover:bg-opacity-95 font-bold text-white rounded-full transition-all duration-300 transform active:scale-95 shadow bg-btn-blue cursor-pointer"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
