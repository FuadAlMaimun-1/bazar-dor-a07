import { Suspense } from "react";
import ProductDetail from "./productDetail";

export default function Page({ params }) {
  return (
   
      <ProductDetail params={params} />

  );
}