import { getCategories, getProducts } from "@/lib/api";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDotsBottom,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
const BestSellers = async () => {
  const result = await getProducts();
  const categories: any = await getCategories();

  const getCategory = (categoryId: any) => {
    const category = categories?.data.find(
      (cat: any) => String(cat.id) === String(categoryId),
    );
    return category?.name || "Unknown";
  };

  const bestResults = result?.data.sort((a: any, b: any) => b.sales - a.sales);

  console.log("Best Sellers", bestResults);
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
                <div className="p-1">
                  <Card className="relative mx-auto w-[309px] h-[448px] rounded-none pt-0">
                    <img
                      src={item?.images[0]}
                      alt="Event cover"
                      className="relative z-20 aspect-video w-full object-cover h-[90%]"
                    />
                    <CardHeader>
                      <CardAction className="flex flex-col gap-2">
                        <Badge variant="outline" className="ml-2">
                          {item?.discountPrice}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="ml-2 line-through"
                        >
                          {item?.price}
                        </Badge>
                      </CardAction>
                      <CardAction></CardAction>
                      <CardTitle>{item?.name}</CardTitle>
                      <CardDescription>
                        {getCategory(item?.categoryId)}
                      </CardDescription>
                      <div className="flex flex-row gap-2">
                        <Star
                          strokeWidth={1.5}
                          className="text-yellow-400 fill-current"
                        />{" "}
                        {item?.rating} ({item?.reviewCount})
                      </div>
                    </CardHeader>
                  </Card>
                </div>
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
