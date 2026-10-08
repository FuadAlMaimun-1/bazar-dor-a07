"use client";

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();

  // Email + Password Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }

    const { data, error } = await signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }

    if (data) {
  toast.success("সাইন আপ করা হয়েছে");
  router.push("/sign-in");
}
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(
          error.message || "গুগল দিয়ে সাইন আপ করা ব্যর্থ হয়েছে"
        );
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast.error("গুগল দিয়ে সাইন আপ করা ব্যর্থ হয়েছে");
    }
  };

  // GitHub Sign Up
  const handleGithubSignUp = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(
          error.message || "গিটহাব দিয়ে সাইন আপ করা ব্যর্থ হয়েছে"
        );
      }
    } catch (error) {
      console.error("GitHub sign-up error:", error);
      toast.error("গিটহাব দিয়ে সাইন আপ করা ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                নাম
              </label>

              <input
                type="text"
                name="name"
                autoComplete="current-name"
                required
                placeholder="আপনার নাম"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                ইমেইল
              </label>

              <input
                type="email"
                name="email"
                autoComplete="new-email"
                required
                placeholder="আপনার ইমেইল"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="আবার লিখুন"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#00a651] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008e45] active:scale-[0.99]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <span className="relative bg-white px-3 text-xs font-medium text-gray-500">
              অথবা
            </span>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FcGoogle className="text-base" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubSignUp}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FaGithub className="text-base text-gray-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Sign In */}
          <p className="mt-6 text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#00a651] transition hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Home */}
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
  );
};

export default SignUpPage;