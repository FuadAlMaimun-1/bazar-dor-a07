import Link from 'next/link';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const SignUpPage = () => {
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* হেডার টাইটেল ও সাবটাইটেল */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* সাইন আপ কার্ড */}
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <form className="space-y-4">
            {/* নাম */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                নাম
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="আপনার নাম"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* ইমেইল */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                autoComplete="new-email"
                required
                placeholder="আপনার ইমেইল অ্যাকাউন্ট"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* পাসওয়ার্ড */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                required
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* পাসওয়ার্ড নিশ্চিত করুন */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="আবার লিখুন"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* সাবমিট বাটন */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#00a651] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008e45] active:scale-[0.99]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* অথবা সেপারেটর */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs font-medium text-gray-500">
              অথবা
            </span>
          </div>

          {/* সোশ্যাল লগইন বাটনসমূহ */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
            //   onClick={() => handleSocialSignUp("Google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FcGoogle className="text-base" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
            //   onClick={() => handleSocialSignUp("GitHub")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FaGithub className="text-base text-gray-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* সাইন ইন লিঙ্ক */}
          <p className="mt-6 text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#00a651] transition hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* হোম পেজে ফিরে যাওয়ার লিংক */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-medium text-gray-500 transition hover:text-gray-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  
        </div>
    );
};

export default SignUpPage;