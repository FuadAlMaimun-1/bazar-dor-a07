import React from "react";
import Marquee from "react-fast-marquee";

// বাংলা সংখ্যায় কনভার্ট করার হেলপার ফাংশন
const toBanglaNumeral = (num) => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

const getPrice = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 60 }, // ডাটা ক্যাশিংয়ের জন্য
    },
  );
  const data = await res.json();
  return data;
};

const MarqueeText = async () => {
  const products = await getPrice();

  return (
  <div className="mx-auto w-full max-w-7xl border-y border-gray-200 bg-gray-50/50 py-2">
  <Marquee speed={60}>
    {products?.map((item) => {
      const isUp = item?.change?.dir === "up";
      const isDown = item?.change?.dir === "down";

      return (
        <div
          key={item.id}
          className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-6 text-sm text-gray-800"
        >
          <span className="text-base">
            {item?.image || "🛒"}
          </span>

          <span className="font-semibold text-gray-900">
            {item?.nameBn}
          </span>

          <span className="text-gray-700">
            {toBanglaNumeral(item?.today)} টাকা/কেজি
          </span>

          <span
            className={`font-bold ${
              isUp
                ? "text-emerald-600"
                : isDown
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {toBanglaNumeral(item?.change?.pct || 0)}%
          </span>
        </div>
      );
    })}
  </Marquee>
</div>
  );
};

export default MarqueeText;
