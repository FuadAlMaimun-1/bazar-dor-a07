import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import DateDisplay from "./DateDisplay";
import MarqueeText from "./MarqueeText";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00a651]">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর Logo"
              width={32}
              height={32}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-2xl font-black leading-none tracking-tight text-gray-900">
              বাজার দর
            </p>

            <DateDisplay />
          </div>
        </Link>
        {/* Auth Buttons */}
        <div className="ml-auto flex items-center gap-2">
          <UserInfo />
        </div>
      </div>

      {/* Category Navigation */}
      <Suspense
        fallback={
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
            <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
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
