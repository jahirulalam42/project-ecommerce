"use client";
import { getCategories, getProducts } from "@/lib/api";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../common/ProductCard";
import { PaginationComp } from "../common/PaginationComp";
import { useDispatch, useSelector } from "react-redux";
import {
  setMaxPrice,
  setMinPrice,
  setPriceValue,
} from "@/features/shop/categorySlice";

const AllProducts = () => {
  const [product, setProduct] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  // const [minPrice, setMinPrice] = useState<any>(0);
  // const [maxPrice, setMaxPrice] = useState<any>(1000);

  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state: any) => state.category.selectedCategory
  );

  const minPrice = useSelector((state: any) => state.category.minPrice);
  const maxPrice = useSelector((state: any) => state.category.maxPrice);

  const priceValue = useSelector((state: any) => state.category.priceValue);

  const sortValue = useSelector((state: any) => state.category.sortValue);

  console.log(selectedCategory, "selectedCategory");

  const filteredProducts = useMemo(() => {
    if (!product) return [];

    let updatedProducts = [...product];

    // Filter by Category
    if (selectedCategory?.length > 0) {
      updatedProducts = updatedProducts.filter((item: any) =>
        selectedCategory.map(Number).includes(item.categoryId)
      );
    }

    // Sort
    if (sortValue) {
      if (sortValue === "mostPopular") {
        updatedProducts.sort((a: any, b: any) => b.sales - a.sales);
      }

      if (sortValue === "priceLow") {
        updatedProducts.sort((a: any, b: any) => a.price - b.price);
      }

      if (sortValue === "priceHigh") {
        updatedProducts.sort((a: any, b: any) => b.price - a.price);
      }

      if (sortValue === "bestRating") {
        updatedProducts.sort((a: any, b: any) => b.rating - a.rating);
      }
    }

    if (priceValue) {
      updatedProducts = updatedProducts.filter(
        (item: any) => item.price >= priceValue
      );
    }

    return updatedProducts;
  }, [product, selectedCategory, priceValue, sortValue]);

  useEffect(() => {
    if (!filteredProducts.length) return;

    const min: any = Math.min(...filteredProducts.map((p: any) => p.price));
    const max: any = Math.max(...filteredProducts.map((p: any) => p.price));

    dispatch(setMinPrice(min));
    dispatch(setMaxPrice(max));
    dispatch(setPriceValue([min]));
  }, [product, dispatch]);

  const itemsPerPage = 12;
  const totalPage = Math.ceil(filteredProducts?.length / itemsPerPage);
  const currentPageItems = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("Filtered", sortValue);

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
