import { Suspense } from "react";
import Category from "@/app/components/Category";

const CategoryPage = ({ params }) => {
  return (
   
      <Suspense fallback={null}>
        <Category params={params} />
      </Suspense>

  );
};

export default CategoryPage;