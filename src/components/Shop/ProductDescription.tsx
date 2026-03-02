"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

const ProductDescription = ({ images, name, description }: any) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    images?.[0] || ""
  );
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-row gap-4">
        <div className=" flex flex-col gap-2">
          {images?.map((image: any, index: number) => (
            <div key={index} className="relative w-35 h-39.5">
              <Image
                src={image}
                alt="Product Image"
                fill
                className="object-cover rounded-lg"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl">
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
    </div>
  );
};

export default ProductDescription;
