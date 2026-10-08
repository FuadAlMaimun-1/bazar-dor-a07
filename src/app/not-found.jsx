"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-4">
      {" "}
      <div className="text-center">
        {" "}
        <div className="text-7xl">🛒</div>
        <h1 className="mt-5 text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-800">
          পেজটি পাওয়া যায়নি
        </h2>
        <p className="mt-2 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি আর নেই।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
         হোমে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
