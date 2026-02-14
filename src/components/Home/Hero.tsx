"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroImage from "@/../public/images/hero-image.png";
import Image from "next/image";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="relative h-[400px] md:h-[600px] basis-full"
            >
              {/* Background Image */}
              <Image
                src={HeroImage}
                alt="Hero"
                fill
                className="object-cover"
                priority
              />

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h2 className="text-black text-4xl md:text-6xl font-bold">
                  {index + 1}
                </h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hero;
