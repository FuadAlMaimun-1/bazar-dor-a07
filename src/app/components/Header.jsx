import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import NavLink from "./NavLink";
import DateDisplay from "./DateDisplay";
import MarqueeText from "./MarqueeText";
import UserInfo from "./UserInfo";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="relative flex min-h-[68px] items-center gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00a651] sm:h-12 sm:w-12 sm:rounded-2xl">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর Logo"
                width={32}
                height={32}
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xl font-black leading-none text-gray-900 sm:text-2xl">
                বাজার দর
              </p>

              <div className="mt-1">
                <DateDisplay />
              </div>
            </div>
          </Link>

          {/* Desktop User Info */}
          <div className="ml-auto hidden sm:block">
            <UserInfo />
          </div>

          {/* Mobile Menu */}
          <div className="ml-auto sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <Suspense
        fallback={
          <div className="border-t border-gray-100">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-3 py-2.5">
              <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-9 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-9 w-16 shrink-0 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        }
      >
        <NavLink />
        <MarqueeText />
      </Suspense>
    </div>
  );
};

export default Navbar;