"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

const ProductDescription = ({ images, name, description, keywords }: any) => {
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || "");
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const lensSize = 200;
  const zoomFactor = 5;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    let x = e.clientX - left;
    let y = e.clientY - top;

    x = Math.min(Math.max(x, lensSize / 2), width - lensSize / 2);
    y = Math.min(Math.max(y, lensSize / 2), height - lensSize / 2);

    setLensPosition({ x: x - lensSize / 2, y: y - lensSize / 2 });

    // Calculate background position for the zoomed image
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex lg:flex-row flex-col-reverse gap-4">
        {/* Thumbnails */}
        <div className="flex lg:flex-col flex-row gap-2">
          {images?.map((image: any, index: number) => (
            <div
              key={index}
              className="relative w-[140px] h-[157px] md:h-28 lg:h-36 xl:h-39.5 cursor-pointer"
            >
              <Image
                src={image}
                alt="Product thumbnail"
                fill
                className={`object-cover rounded-lg border-2 ${
                  selectedImage === image
                    ? "border-sky-400"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-[450px] md:h-[480px] lg:h-[678px] overflow-hidden rounded-2xl cursor-crosshair"
          onMouseEnter={() => setShowLens(true)}
          onMouseLeave={() => setShowLens(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Normal image */}
          <Image
            src={selectedImage}
            alt="Product main"
            fill
            className="object-cover"
            priority
          />

          {/* Magnifying lens */}
          {showLens && (
            <div
              ref={lensRef}
              className="absolute rounded-full border-2 border-white shadow-lg pointer-events-none"
              style={{
                width: lensSize,
                height: lensSize,
                left: lensPosition.x,
                top: lensPosition.y,
                backgroundImage: `url(${selectedImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundPosition: backgroundPosition,
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
          )}
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
