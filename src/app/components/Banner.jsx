'use client';
import React from "react";
import Image from "next/image";
import DateDisplay from "./DateDisplay";
import Link from "next/link";

const Banner = () => {
    const handleScroll = () => {
    const section = document.getElementById("সব-পণ্য");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex bg-white flex-col items-center justify-between gap-8 rounded-3xl p-8 md:flex-row md:p-12">
        {/* বামপাশের তথ্য সেকশন */}
        <div className="flex max-w-2xl flex-col items-start space-y-4">
          {/* Eyebrow / তারিখ ব্যাজ */}
          <span className="rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800">
            <DateDisplay />
          </span>

          {/* প্রধান শিরোনাম */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* সাবটাইটেল */}
          <p className="text-sm font-normal leading-relaxed text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button
            onClick={handleScroll}
            className="inline-flex items-center justify-center cursor-pointer rounded-xl bg-[#00a651] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#008e45] hover:shadow-lg active:scale-95"
          >
            সব পণ্য দেখুন
          </button>
        </div>

    
        <div className="relative flex shrink-0 items-center justify-center">
          <Image
            src="/bazar-hero.png" 
            alt="বাজার দর ঝুড়ি"
            width={320}
            height={280}
            priority
            className="h-auto w-64 object-contain md:w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
