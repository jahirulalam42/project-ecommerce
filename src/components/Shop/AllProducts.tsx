"use client";
import { getCategories, getProducts } from "@/lib/api";
import React, { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import { PaginationComp } from "../common/PaginationComp";

const AllProducts = () => {
  const [product, setProduct] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPage = Math.ceil(product?.length / itemsPerPage);
  const currentPageItems = product?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      const categoriesResult: any = await getCategories();
      setCategories(categoriesResult?.data);
      setProduct(result?.data);
    };
    fetchData();
  }, []);

  const getCategory = (categoryId: any) => {
    const category = categories?.find(
      (cat: any) => String(cat.id) === String(categoryId)
    );
    return category?.name || "Unknown";
  };
  // console.log("Result", product);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentPageItems?.map((item: any, index: any) => (
          <ProductCard key={index} item={item} getCategory={getCategory} />
        ))}
      </div>
      {currentPageItems && (
        <div className="w-full flex justify-end items-center pt-6">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
