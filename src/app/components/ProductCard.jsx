"use client";

import Link from "next/link";

const ProductCard = ({ product }) => {
  const price = product.today || 0;
  const change = product.change?.pct || 0;
  const direction = product.change?.dir;

  const bengaliPrice = new Intl.NumberFormat("en-IN")
    .format(price)
    .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  const bengaliChange = change
    .toFixed(1)
    .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  let changeIcon = "—";
  let changeClass = "bg-gray-100 text-gray-600";

  if (direction === "up") {
    changeIcon = "▲";
    changeClass = "bg-red-50 text-red-600";
  }

  if (direction === "down") {
    changeIcon = "▼";
    changeClass = "bg-green-50 text-green-600";
  }

  let unit = "কেজি";

  if (product.unit === "liter") {
    unit = "লিটার";
  }

  if (product.unit === "dozen") {
    unit = "ডজন";
  }

  if (product.unit === "piece") {
    unit = "পিস";
  }

  return (
    <Link href={`/product/${product.slug}`} className="cursor-pointer">
      <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        {/* Product */}
        <div className="flex items-center gap-3">
          {/* Emoji */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {product?.image}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-bold text-gray-900">{product?.nameBn}</h3>

            <p className="text-sm text-gray-500">প্রতি {unit}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3">
          <div>
            <p className="text-[11px] font-medium text-gray-400">আজকের দাম</p>
            <p className="text-xl font-extrabold text-gray-900">
              {bengaliPrice}{" "}
              <span className="text-sm font-normal text-gray-700">টাকা</span>
            </p>
          </div>

          {/* দাম পরিবর্তনের শতাংশ ব্যাজ (Riser/Faller Indicator) */}
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                change > 0
                  ? "bg-red-50 text-red-600"
                  : change < 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              <span>{change > 0 ? "▲" : change < 0 ? "▼" : "—"}</span>
              <span>{bengaliChange}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
