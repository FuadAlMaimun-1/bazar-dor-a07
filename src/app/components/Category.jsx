"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import CategoryCard from "@/app/components/CategoryCard";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

// সংখ্যাকে বাংলায় রূপান্তর
const bn = (num) => String(num ?? 0).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const CategoryPage = ({ params }) => {
  const { slug } = use(params);

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?category=${slug}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [slug]);

  // সর্টিং লজিক
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return Number(a.today) - Number(b.today);
    if (sort === "high") return Number(b.today) - Number(a.today);
    return 0;
  });

  const firstProduct = products[0];

  const categoryName = firstProduct?.categoryNameBn || "চাল";
  const categoryIcon = firstProduct?.image || "/icons/rice.png";

  const isImageUrl =
    categoryIcon.startsWith("/") || categoryIcon.startsWith("http");

  return (
    <main className="min-h-screen bg-[#f4f8f5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-3">
            {isImageUrl ? (
              <Image
                src={categoryIcon}
                alt={categoryName}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-3xl">{categoryIcon}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {categoryName}
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">সাজান</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">কম থেকে বেশি</option>
              <option value="high">বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500">
          মোট {bn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white/70 border border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <CategoryCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
            <div className="text-5xl">📦</div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
