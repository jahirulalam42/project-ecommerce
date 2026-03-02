"use client";
import Image from "next/image";
import React from "react";

const ProductDescription = ({ images }: any) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    images?.[0] || ""
  );
  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
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
        <div>
          <div className="relative w-[640px] h-[678px]">
            <Image
              src={selectedImage}
              alt="Product Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div>Descriptions</div>
    </div>
  );
};

export default ProductDescription;
