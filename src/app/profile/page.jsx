"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user?.name);
    }
  }, [user]);

  // নাম আপডেট করার হ্যান্ডলার (BetterAuth updateUser API)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    try {
      setIsUpdating(true);
      await updateUser({
        name: name,
      });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
    } catch (error) {
      toast.error("আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8f5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* পেজ হেডার */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* কার্ড ১: ইউজারের বেসিক ইনফো ও সাইন আউট বাটন */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* প্রোফাইল ইমেজ / নাম দিয়ে অ্যাভাটার */}
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 ring-1 ring-gray-200">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-emerald-800">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* নাম ও ইমেইল */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user?.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* সাইন আউট বাটন */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-95"
          >
            <span>↩ সাইন আউট</span>
          </button>
        </div>

        {/* কার্ড ২: তথ্য আপডেট করার ফর্ম */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00a651] focus:bg-white focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-xl bg-[#00a651] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008e45] disabled:opacity-50 active:scale-[0.99]"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;