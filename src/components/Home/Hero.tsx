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
    </div>
  );
};

export default Hero;
