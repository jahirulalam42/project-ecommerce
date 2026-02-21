import React from "react";
import DownHomeImage from "@/../public/images/down-home.png";
import Image from "next/image";
import { Button } from "../ui/button";

const CollectionItems = () => {
  return (
    <div className="hidden md:block relative w-full h-[437px]">
      <Image
        src={DownHomeImage}
        alt="Down home image"
        fill
        className="object-cover rounded-2xl"
      />

      <div className="absolute top-1/2 left-1/12 flex flex-col gap-4 -translate-y-1/2">
        <p className="text-gray-600 font-semibold text-lg">
          100% Original Products
        </p>
        <h3 className="text-3xl font-bold">
          The All New Fashion <br /> Collection Items
        </h3>
        <p className="text-gray-600 font-semibold text-lg">
          Starting from: $59.99
        </p>
        <Button className="rounded-3xl w-1/2">Shop Now</Button>
      </div>
    </div>
  );
};

export default CollectionItems;
