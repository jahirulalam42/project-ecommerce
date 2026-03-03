"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

const ProductDescription = ({ images, name, description, keywords }: any) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    images?.[0] || ""
  );
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex md:flex-row flex-col-reverse  gap-4">
        <div className=" flex md:flex-col flex-row gap-2">
          {images?.map((image: any, index: number) => (
            <div
              key={index}
              className="relative w-35 h-[78px] md:h-28 lg:h-36 xl:h-39.5"
            >
              <Image
                src={image}
                alt="Product Image"
                fill
                className={`object-cover rounded-lg bordered border-2 ${
                  selectedImage === image
                    ? "border-sky-400"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
        <div className="relative w-full h-[450px] md:h-[480px] lg:h-[600px] xl:h-[650px] overflow-hidden rounded-2xl">
          <Image
            src={selectedImage}
            alt="Product Image"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {name}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{description}</p>
      </div>

      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Keywords
        </h3>
        {keywords?.map((item: any, index: number) => (
          <Badge variant={"outline"} key={index} className="mr-2 my-8">
            <Sparkles strokeWidth={1.5} /> {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
