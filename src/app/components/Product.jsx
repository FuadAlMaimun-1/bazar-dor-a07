"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setProducts(data.products || data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f4f8f5] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="py-10 text-center">Loading...</p>
        </div>
      </section>
    );
  }

  // দাম বেড়েছে
  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // দাম কমেছে
  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="bg-[#f4f8f5] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Section A */}
        {risers.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
               <span className="text-green-600 text-xs">▲</span> আজ দাম বেড়েছে 

              </h2>

              <p className="mt-1 text-sm text-gray-500">
                আজ সবচেয়ে বেশি দাম বেড়েছে এমন পণ্য
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {risers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section B */}
        {fallers.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-red-600 text-xs">▼</span>  আজ দাম কমেছে 
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                আজ সবচেয়ে বেশি দাম কমেছে এমন পণ্য
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fallers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section C */}
        <div id="সব-পণ্য">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              মোট {products.length}টি পণ্যের আজকের বাজারদর
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Product;