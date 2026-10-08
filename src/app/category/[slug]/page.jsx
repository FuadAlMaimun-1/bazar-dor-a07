import { Suspense } from "react";
import Category from "@/app/components/Category";

const CategoryPage = ({ params }) => {
  return (
   
      <Category params={params} />

  );
};

export default CategoryPage;