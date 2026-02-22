import { getCategories, getProducts } from "@/lib/api";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDotsBottom,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import ProductCard from "../common/ProductCard";

const Recommendations = async () => {
  const result = await getProducts();
  const categories: any = await getCategories();

  const getCategory = (categoryId: any) => {
    const category = categories?.data.find(
      (cat: any) => String(cat.id) === String(categoryId)
    );
    return category?.name || "Unknown";
  };

  // console.log("Products", categories);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        Recommendations.{" "}
        <span className="text-gray-500">Best matching products for you</span>
      </h1>
      <div className="flex flex-row">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {result?.data.slice(0, 10).map((item: any, index: any) => (
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

export default Recommendations;
