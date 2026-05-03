import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
  removeCartItem,
} from "@/features/cart/cartSlice";
import { Separator } from "../ui/separator";
import { AppDispatch } from "@/store/store";

const CartOrderSummary = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const summaryProducts = useSelector(
    (state: any) => state.cart.summaryProducts
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <div>
        {summaryProducts &&
          summaryProducts?.map((product: any, index: number) => {
            const { name, id, price, size, quantity, discountPrice, images } =
              product;
            return (
              <div
                key={`${id}-${size}-${index}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="h-[108px] flex flex-col gap-4"
              >
                <div className="relative w-full h-full grid grid-cols-5 gap-2">
                  <div className="col-span-1 relative h-full w-full">
                    <Image
                      src={images[0]}
                      alt="product"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="col-span-3 flex flex-col justify-between">
                    {" "}
                    <div className="flex flex-col">
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{size} size</CardDescription>
                    </div>
                    <div className="w-[80px] h-[40px]">
                      <div className="flex flex-row justify-center items-center gap-2 bg-gray-100 rounded-full">
                        <Button
                          variant="outline"
                          className="rounded-full"
                          size={"icon-xs"}
                          onClick={() => {
                            dispatch(
                              decreaseQuantity({ productId: id, size: size })
                            );
                          }}
                        >
                          -
                        </Button>
                        {quantity}
                        <Button
                          variant="outline"
                          className="rounded-full"
                          size={"icon-xs"}
                          onClick={() =>
                            dispatch(
                              increaseQuantity({ productId: id, size: size })
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex flex-col items-end">
                    <span className="font-semibold">${discountPrice}</span>
                    <span className="text-sm text-gray-500 line-through">
                      ${price}
                    </span>
                  </div>
                  {isHovered && (
                    <div className="absolute top-[30%] right-0">
                      <Button
                        onClick={() => {
                          dispatch(
                            removeCartItem({ productId: id, size: size })
                          );
                        }}
                        variant={"destructive"}
                        size={"xs"}
                      >
                        X
                      </Button>
                    </div>
                  )}
                </div>
                <Separator className="mb-6" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CartOrderSummary;
