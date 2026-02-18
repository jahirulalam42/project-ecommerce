import { getProducts } from "@/lib/api";
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

const Recommendations = async () => {
  const result = await getProducts();
  console.log("Products", result?.data.slice(0, 10));
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        Recommendations.{" "}
        <span className="text-gray-500">Best matching products for you</span>
      </h1>
      <div className="flex flex-row">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {result?.data.slice(0, 10).map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <div className="p-1">
                  <Card className="relative mx-auto w-[309px] h-[448px] rounded-none pt-0">
                    <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                    <img
                      src={item?.images[0]}
                      alt="Event cover"
                      className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 h-[90%]"
                    />
                    <CardHeader>
                      <CardAction>
                        <Badge variant="secondary">{item?.discountPrice}</Badge>
                      </CardAction>
                      <CardTitle>{item?.name}</CardTitle>
                      <CardDescription>{item?.categoryId}</CardDescription>
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

export default Recommendations;
