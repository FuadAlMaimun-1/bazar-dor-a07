"use client";

import Image from "next/image";
import Link from "next/link";

// সংখ্যাকে বাংলায় রূপান্তর করার ইউটিলিটি
const bn = (num) =>
  String(num ?? 0).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const CategoryCard = ({ product }) => {
  const price = Number(product?.today || product?.price || 0);
  const change = Number(product?.change?.pct ?? product?.changePct ?? 0);

  // ইমেজ স্ট্রিং URL নাকি ইমোজি তা চেক করা
  const isImageUrl =
    product?.image &&
    (product.image.startsWith("/") || product.image.startsWith("http"));

  return (
   <Link href={`/product/${product.slug}`}>
    <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Icon / Image + Name */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 border border-gray-100">
          {isImageUrl ? (
            <Image
              src={product.image}
              alt={product.nameBn || product.name || "পণ্য"}
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-2xl">{product?.image}</span>
          )}
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base">
            {product?.nameBn || product?.name}
          </h2>

          <p className="text-xs text-gray-500">
            প্রতি {product?.unit || "কেজি"}
          </p>
        </div>
      </div>

      {/* Price & Change */}
      <div className="mt-5 flex items-end justify-between border-t border-gray-50 pt-3">
        <div>
          <p className="text-[11px] font-medium text-gray-400">আজকের দাম</p>

          <p className="text-xl font-extrabold text-gray-900">
            {bn(price)}{" "}
            <span className="text-sm font-normal text-gray-700">টাকা</span>
          </p>
        </div>

        {/* Change Badge (দাম বাড়লে লাল, কমলে সবুজ) */}
        <span
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
            change > 0
              ? "bg-red-50 text-red-600"
              : change < 0
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>{change > 0 ? "▲" : change < 0 ? "▼" : "—"}</span>
          <span>{bn(Math.abs(change))}%</span>
        </span>
      </div>
    </div>
   </Link>
  );
};

export default CategoryCard;