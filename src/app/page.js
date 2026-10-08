import { Suspense } from "react";
import AuthToast from "./components/AuthToast";
import Banner from "./components/Banner";
import Product from "./components/Product";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <AuthToast />
      </Suspense>
      <Banner />
      <Product />
    </div>
  );
}
