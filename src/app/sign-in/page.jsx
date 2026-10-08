"use client";

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
  // Email + Password Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const { data, error } = await signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }

    if (data) {
      toast.success("সাইন ইন করা হয়েছে");
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(
          error.message || "গুগল দিয়ে সাইন ইন করা ব্যর্থ হয়েছে"
        );
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("গুগল দিয়ে সাইন ইন করা ব্যর্থ হয়েছে");
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(
          error.message || "গিটহাব দিয়ে সাইন ইন করা ব্যর্থ হয়েছে"
        );
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast.error("গিটহাব দিয়ে সাইন ইন করা ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্টে প্রবেশ করুন
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                ইমেইল
              </label>

              <input
                type="email"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
                required
                placeholder="আপনার পাসওয়ার্ড"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#00a651] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008e45] active:scale-[0.99]"
            >
              সাইন ইন করুন
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
              onClick={handleGoogleSignIn}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FcGoogle className="text-base" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              <FaGithub className="text-base text-gray-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Sign Up */}
          <p className="mt-6 text-center text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#00a651] transition hover:underline"
            >
              সাইন আপ করুন
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

export default SignInPage;