import { Suspense } from "react";
import ProductDetail from "./productDetail";

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f4f8f5]">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <ProductDetail params={params} />
    </Suspense>
  );
}