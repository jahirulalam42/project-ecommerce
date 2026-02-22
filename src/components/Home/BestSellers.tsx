import { getCategories, getProducts } from "@/lib/api";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDotsBottom,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "../common/ProductCard";
const BestSellers = async () => {
  const result = await getProducts();
  const categories: any = await getCategories();

  const getCategory = (categoryId: any) => {
    const category = categories?.data.find(
      (cat: any) => String(cat.id) === String(categoryId)
    );
    return category?.name || "Unknown";
  };

  const bestResults = result?.data.sort((a: any, b: any) => b.sales - a.sales);

  // console.log("Best Sellers", bestResults);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        Best Sellers.{" "}
        <span className="text-gray-500">Best selling of the month</span>
      </h1>
      <div className="flex flex-row">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {bestResults?.slice(0, 10).map((item: any, index: any) => (
              <CarouselItem
                key={index}
                className="basis-1/1 pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <ProductCard item={item} getCategory={getCategory} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDotsBottom />
        </Carousel>
      </div>
    </div>
  );
};

export default BestSellers;
