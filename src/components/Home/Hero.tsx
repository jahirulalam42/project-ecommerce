"use client";
import * as React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroImage from "@/../public/images/hero-image.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imageArray = [
    {
      src: HeroImage,
      alt: "Hero Image 1",
    },
    {
      src: HeroImage,
      alt: "Hero Image 2",
    },
    {
      src: HeroImage,
      alt: "Hero Image 3",
    },
    {
      src: HeroImage,
      alt: "Hero Image 4",
    },
    {
      src: HeroImage,
      alt: "Hero Image 5",
    },
  ];

  const cardItems = [
    {
      title: "Free Shipping",
      description: "On orders over $50.00",
      icon: "Test",
    },
    {
      title: "Very easy to return",
      description: "Just phone number",
      icon: "Test",
    },
    {
      title: "Worldwide delivery",
      description: "Fast delivery worldwide",
      icon: "Test",
    },
    {
      title: "Refunds policy",
      description: "60 days return for any reason",
      icon: "Test",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="-mx-2 md:-mx-10 lg:-mx-20">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {imageArray.map((img, index) => (
              <CarouselItem
                key={index}
                className="relative h-[550px] md:h-[600px] basis-full"
              >
                {/* Background Image */}
                <Image
                  src={img?.src}
                  alt={img?.alt}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col gap-4 items-start justify-center px-8 md:px-16 lg:px-22 z-10">
                  <p className="text-gray-600 font-semibold text-lg">
                    Starting from $49.99
                  </p>
                  <h2 className="text-black text-4xl md:text-6xl font-bold">
                    Exclusive collection <br />
                    for everyone
                  </h2>
                  <Button className="rounded-2xl">
                    Explore now{" "}
                    <span>
                      <Search strokeWidth={1.5} />
                    </span>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots slideCount={imageArray.length} />
        </Carousel>
      </div>

      {/* Card Section */}
      <div className="h-[98px] bordered border-2 border-yellow-600 flex flex-row justify-between items-center">
        {cardItems?.map((card: any, index: number) => {
          return (
            <div className="h-full flex flex-row items-center" key={index}>
              {index !== 0 && (
                <div className="w-0.5 h-1/2 bg-neutral-200 dark:bg-white/10 my-auto"></div>
              )}
              <div className="flex flex-row gap-2 md:gap-4 items-center px-4 lg:px-6 shrink-0">
                <span>{card?.icon}</span>
                <div className="flex flex-col md:gap-2">
                  <h4 className="text-base md:text-lg font-semibold">
                    {card?.title}
                  </h4>
                  <span className="hidden md:block text-xs lg:text-sm">
                    {card?.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
