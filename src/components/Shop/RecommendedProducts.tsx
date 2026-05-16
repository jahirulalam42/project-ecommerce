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

const RecommendedProducts = async () => {
  const result = await getProducts();
  const categories: any = await getCategories();

  const getCategory = (categoryId: any) => {
    const category = categories?.data.find(
      (cat: any) => String(cat.id) === String(categoryId)
    );
    return category?.name || "Unknown";
  };

  const recommendedResult = result?.data.map((item: any) => {return(
    {
      const result = result?.data.find((p: any) => p.id === item.id);
    }
  )});

  // console.log("Products", categories);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Recommended products</h1>
      <div className="flex flex-row">
        <Carousel className="w-full">
          <CarouselContent className="gap-1 md:gap-2 lg:gap-4 xl:gap-6">
            {result?.data.slice(0, 10).map((item: any, index: any) => (
              <CarouselItem
                key={index}
                className="basis-1/1 pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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

export default RecommendedProducts;
