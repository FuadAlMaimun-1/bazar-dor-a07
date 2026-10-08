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
    <Link href={`/product/${product.slug}`}>
      <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

        {/* Product */}
        <div className="flex items-center gap-3">

          {/* Emoji */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-bold text-gray-900">
              {product.nameBn}
            </h3>

            <p className="text-sm text-gray-500">
              প্রতি {unit}
            </p>
          </div>

        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between border-t pt-4">

          <div>
            <p className="text-xs text-gray-400">
              আজকের দাম
            </p>

            <p className="text-xl font-bold text-gray-900">
              {bengaliPrice} টাকা
            </p>
          </div>

          {/* Change */}
          <span
            className={`rounded-lg px-2 py-1 text-sm ${changeClass}`}
          >
            {changeIcon} {bengaliChange}%
          </span>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;