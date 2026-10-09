"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

import { signOut, useSession } from "@/lib/auth-client";

const UserInfo = () => {
  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = session?.user;

  // Outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
    } catch (error) {
      console.error(error);
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      {user ? (
        <>
          {/* Logged in user */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100 focus:outline-none"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 ring-1 ring-gray-200">
              {user.image ? (
                <Image
                  src={user.image}
                  width={48}
                  height={48}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-base font-bold text-emerald-800">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Name */}
            <span className="max-w-[140px] truncate text-sm font-semibold text-gray-800">
              {user.name || "User"}
            </span>

            {/* Arrow */}
            <span className="text-xs text-gray-500">
              {isOpen ? "▴" : "▾"}
            </span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
              
              {/* User info */}
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900">
                  {user.name || "User"}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* Menu */}
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <FiUser className="text-base text-gray-500" />
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <FiLogOut className="text-base" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Logged out */
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl bg-[#00a651] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008e45]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;