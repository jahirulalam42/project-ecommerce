import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDotsBottom,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

const Exploring = () => {
  const cardItems = [
    {
      title: "For Men's",
      description: "Starting at $24",
    },
    {
      title: "For Womens's",
      description: "Starting at $19",
    },
    {
      title: "For Kids and Toys",
      description: "Starting at $12",
    },
    {
      title: "For Accessories",
      description: "Starting at $10",
    },
    {
      title: "For Cosmetics",
      description: "Starting at $11",
    },
    {
      title: "For Shoes",
      description: "Starting at $20",
    },
    {
      title: "For Sports",
      description: "Starting at $22",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        Start exploring.{" "}
        <span className="text-gray-500">Good things are waiting for you</span>
      </h1>

      <div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {cardItems.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex justify-between items-center">
                      <div className="relative w-full">
                        <h1 className="text-xl font-bold">{item?.title}</h1>
                        <p className="text-gray-600">{item?.description}</p>
                        {index > 0 && (
                          <div className="absolute top-0 right-2 h-full min-h-[1em] w-0.5 self-stretch bg-gray-600 opacity-25 dark:via-neutral-400"></div>
                        )}
                      </div>
                      <span className="flex flex-row text-sm justify-center items-center text-gray-600 gap-1">
                        SHOP NOW <ArrowRight className="text-xs" />
                      </span>
                    </CardContent>
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

export default Exploring;
