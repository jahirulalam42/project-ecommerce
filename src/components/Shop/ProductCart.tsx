"use client";
import React, { useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { ShoppingBag, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/features/cart/cartSlice";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const ProductCart = ({
  rating,
  reviewCount,
  sizes,
  price,
  discountPrice,
  productId,
  tax,
}: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [productCount, setProductCount] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState(sizes?.[0] || null);

  // Ensure numeric values
  const numericDiscountPrice = Number(discountPrice) || 0;
  const numericTax = Number(tax) || 0;
  const numericPrice = Number(price) || 0;

  const totalPrice = numericDiscountPrice * productCount;
  const totalTax = numericTax * productCount;
  const total = totalPrice + totalTax;

  const handleAddToCart = () => {
    if (session === undefined || session === null) {
      toast.error("Please login to add items to your cart.", {
        position: "top-right",
        style: {
          backgroundColor: "red",
          color: "white",
        } as React.CSSProperties,
      });
      return;
    } else {
      dispatch(
        addCartItem({
          productId,
          size: selectedSize,
          quantity: productCount,
        })
      );
      toast.success("Item added to cart!", {
        position: "top-right",
        style: {
          backgroundColor: "#4ade80",
        } as React.CSSProperties,
      });
    }
  };

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
              ${numericDiscountPrice.toFixed(2)}
            </h3>
            <p className="leading-7 line-through text-gray-500 font-semibold">
              ${numericPrice.toFixed(2)}
            </p>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Size: {selectedSize}</Label>
              <div className="grid grid-flow-col gap-2">
                {sizes?.map((size: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={
                      selectedSize === size ? "bg-sky-500 text-white" : ""
                    }
                    size={"sm"}
                    onClick={() => {
                      setSelectedSize(size);
                    }}
                  >
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
                  onClick={() => {
                    setProductCount((prev) => (prev > 1 ? prev - 1 : prev));
                  }}
                >
                  -
                </Button>
                {productCount}
                <Button
                  variant="outline"
                  className="rounded-full"
                  size={"icon-xs"}
                  onClick={() => setProductCount((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="default"
                className="rounded-full px-2"
                size={"sm"}
                onClick={handleAddToCart}
              >
                <ShoppingBag strokeWidth={1.5} /> Add to cart
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <span className="w-full flex justify-between">
            <span className="leading-7 text-gray-500 font-semibold">
              ${numericDiscountPrice.toFixed(2)} x {productCount}
            </span>
            <span className="leading-7 text-gray-500 font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </span>

          <span className="w-full flex justify-between">
            <span className="leading-7 text-gray-500 font-semibold">
              Tax estimate
            </span>
            <span className="leading-7 text-gray-500 font-semibold">
              ${totalTax.toFixed(2)}
            </span>
          </span>

          <span className="w-full flex justify-between">
            <span className="leading-7 font-semibold">Total</span>
            <span className="leading-7 font-semibold">${total.toFixed(2)}</span>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCart;
