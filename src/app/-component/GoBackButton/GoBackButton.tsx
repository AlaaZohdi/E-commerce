// GoBackButton.tsx
"use client";

import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-50 sm:w-auto"
    >
      <ArrowLeft size={18} />
      Go Back
    </button>
  );
}