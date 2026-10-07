import Link from "next/link";
import React from "react";

const getCategory = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data;
};

const NavLink = async () => {
  const categories = await getCategory();

  return (
   <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 scrollbar-hide sm:px-6 lg:px-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
          >
            {/* Category Icon */}
            <span className="text-base transition-transform duration-200 group-hover:scale-110">
              {category.icon}
            </span>

            {/* Category Name */}
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLink;
