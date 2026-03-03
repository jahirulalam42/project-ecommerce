import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Star } from "lucide-react";

const ProductCart = ({
  rating,
  reviewCount,
  sizes,
  price,
  discountPrice,
}: any) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-gray-700">
            <div className="flex flex-row gap-2 items-center">
              <Star
                strokeWidth={1.5}
                className="text-yellow-400 fill-current"
              />{" "}
              {rating} .{" "}
              <span className="underline">{reviewCount} reviews</span>
            </div>
          </CardTitle>
          <CardAction>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              ${discountPrice}
            </h3>
            <p className="leading-7 line-through text-gray-500 font-semibold">
              ${price}
            </p>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Size</Label>
              <div className="grid grid-flow-col gap-2">
                {sizes?.map((size: any, index: number) => (
                  <Button key={index} variant="outline" size={"sm"}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row justify-center items-center px-2 gap-2 bg-gray-100 rounded-full">
                <Button
                  variant="outline"
                  className="rounded-full"
                  size={"icon-xs"}
                >
                  -
                </Button>
                1
                <Button
                  variant="outline"
                  className="rounded-full"
                  size={"icon-xs"}
                >
                  +
                </Button>
              </div>
              <Button
                variant="default"
                className="rounded-full px-2"
                size={"sm"}
              >
                <ShoppingBag strokeWidth={1.5} /> Add to cart
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <span className="w-full flex justify-between">
            <span className="leading-7  text-gray-500 font-semibold">
              $169.99 x 1
            </span>
            <span className="leading-7  text-gray-500 font-semibold">
              $169.99{" "}
            </span>
          </span>

          <span className="w-full flex justify-between">
            <span className="leading-7  text-gray-500 font-semibold">
              Tax extimate
            </span>
            <span className="leading-7  text-gray-500 font-semibold">$0</span>
          </span>

          <span className="w-full flex justify-between">
            <span className="leading-7  font-semibold">Total</span>
            <span className="leading-7  font-semibold">$169.99</span>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCart;
