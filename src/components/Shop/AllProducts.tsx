import { getCategories, getProducts } from "@/lib/api";
import React from "react";
import ProductCard from "../common/ProductCard";

const AllProducts = async () => {
  const result = await getProducts();
  const categories: any = await getCategories();

  const getCategory = (categoryId: any) => {
    const category = categories?.data.find(
      (cat: any) => String(cat.id) === String(categoryId)
    );
    return category?.name || "Unknown";
  };
  console.log("Result", result);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {result?.data.slice(0, 9).map((item: any, index: any) => (
        <ProductCard key={index} item={item} getCategory={getCategory} />
      ))}
    </div>
  );
};

export default AllProducts;
