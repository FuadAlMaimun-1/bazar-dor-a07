"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

const bn = (num) =>
  String(num ?? 0).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[digit]
  );

const ProductDetail = ({ params }) => {
  const { productId } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const products = Array.isArray(data)
          ? data
          : data?.products || [];

        const found = products.find(
          (item) =>
            String(item.id) === String(productId) ||
            item.slug === productId
        );

        setProduct(found || null);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8f5]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f8f5]">
        <h1 className="text-2xl font-bold text-gray-800">
          পণ্য পাওয়া যায়নি
        </h1>

        <Link
          href="/"
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const markets = product.markets || [];

  const prices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const lowest = prices.length ? Math.min(...prices) : 0;
  const highest = prices.length ? Math.max(...prices) : 0;

  const average =
    prices.length > 0
      ? Math.round(
          prices.reduce((sum, price) => sum + price, 0) /
            prices.length
        )
      : 0;

  const change = product.change?.pct || 0;
  const direction = product.change?.dir;

  let unit = "কেজি";

  if (product.unit === "liter") unit = "লিটার";
  if (product.unit === "dozen") unit = "ডজন";
  if (product.unit === "piece") unit = "পিস";

  return (
    <main className="min-h-screen bg-[#f4f8f5] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            হোম
          </Link>

          <span className="mx-2">/</span>

          <span>{product.categoryNameBn}</span>

          <span className="mx-2">/</span>

          <span className="text-gray-800">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  {product.categoryNameBn}
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unit}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="text-3xl font-bold text-gray-900">
                {bn(product.today)} টাকা
              </p>

              <span
                className={`mt-2 inline-block rounded-lg px-3 py-1 text-sm font-semibold ${
                  direction === "up"
                    ? "bg-green-50 text-green-600"
                    : direction === "down"
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                  ? "▼"
                  : "—"}{" "}
                {bn(Number(change).toFixed(1))}%
              </span>
            </div>

          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {bn(lowest)} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              সর্বোচ্চ দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {bn(highest)} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              গড় দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {bn(average)} টাকা
            </p>
          </div>

        </div>

        {/* Market Prices */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভেদে দাম
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="px-4 py-3">
                    বাজার
                  </th>

                  <th className="px-4 py-3">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0"
                  >
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-4 py-4 font-semibold text-green-600">
                      {bn(market.min)} টাকা
                    </td>

                    <td className="px-4 py-4 font-semibold text-red-600">
                      {bn(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProductDetail;