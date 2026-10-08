"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const AuthToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShown = useRef(false);

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth !== "success" || hasShown.current) return;

    hasShown.current = true;

    toast.success("🎉 সফলভাবে সাইন ইন করা হয়েছে!");

    router.replace("/");
  }, [searchParams, router]);

  return null;
};

export default AuthToast;