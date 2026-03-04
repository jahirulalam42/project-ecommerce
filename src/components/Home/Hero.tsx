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
import { CircleDollarSign, Globe, Recycle, Search, Truck } from "lucide-react";

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
      icon: <Truck strokeWidth={1.5} />,
    },
    {
      title: "Very easy to return",
      description: "Just phone number",
      icon: <Recycle strokeWidth={1.5} />,
    },
    {
      title: "Worldwide delivery",
      description: "Fast delivery worldwide",
      icon: <Globe strokeWidth={1.5} />,
    },
    {
      title: "Refunds policy",
      description: "60 days return for any reason",
      icon: <CircleDollarSign strokeWidth={1.5} />,
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
                  <h2 className="text-black text-3xl md:text-4xl lg:text-6xl  font-bold">
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
      <Card className="hidden lg:grid grid-cols-4">
        {cardItems?.map((item, index) => (
          <div
            key={index}
            className="relative w-full flex justify-center items-center"
          >
            {index > 0 && (
              <div className="absolute left-0 h-full min-h-[1em] w-px self-stretch bg-black opacity-25 dark:via-neutral-400"></div>
            )}
            <div className="flex flex-row justify-center items-center gap-4">
              <span className="font-bold">{item?.icon}</span>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold xl:text-lg">{item?.title}</h1>
                <p className="text-xs xl:text-sm text-gray-400">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Card>

      <div className="lg:hidden flex flex-col gap-4">
        <h1 className="font-bold text-lg">Nexton always with you</h1>

        <div className="overflow-auto flex flex-row gap-6">
          {cardItems?.map((item, index) => (
            <div key={index} className="flex flex-row gap-2">
              <span>{item?.icon}</span>
              <h1 className="whitespace-nowrap">{item?.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
