"use client";
import React, { useEffect, useState } from "react";
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
import { Separator } from "../ui/separator";
import Image from "next/image";
import globe from "@/../public/globe.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSingleProduct } from "@/lib/api";
import { decreaseQuantity, increaseQuantity } from "@/features/cart/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: any) => state.cart.items);
  const [summaryProducts, setSummaryProducts] = useState<any>();
  console.log("CartProducts", cartProducts);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Promise.all(
        cartProducts.map(async (product: any) => {
          const res: any = await getSingleProduct(product.productId);

          return {
            ...res.data,
            quantity: product.quantity,
            size: product.size,
          };
        })
      );
      console.log("Summary Products", summaryProducts);
      setSummaryProducts(result);
    };
    if (cartProducts) {
      fetchData();
    }
  }, [cartProducts]);

  console.log(summaryProducts);
  return (
    <div>
      <Card className="w-full border-none shadow-none">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Order summary
        </h4>
        <Separator />
        <CardContent>
          <div>
            <div>
              {summaryProducts &&
                summaryProducts?.map((product: any) => {
                  const {
                    name,
                    id,
                    price,
                    size,
                    quantity,
                    discountPrice,
                    images,
                  } = product;
                  return (
                    <div key={id} className="h-[108px] flex flex-col gap-4">
                      <div className="w-full h-full grid grid-cols-5 gap-2">
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
                                  dispatch(decreaseQuantity(id));
                                }}
                              >
                                -
                              </Button>
                              {quantity}
                              <Button
                                variant="outline"
                                className="rounded-full"
                                size={"icon-xs"}
                                onClick={() => dispatch(increaseQuantity(id))}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 flex flex-col items-end">
                          <span className="font-semibold line-through">
                            ${discountPrice}
                          </span>
                          <span className="text-sm text-gray-500">
                            ${price}
                          </span>
                        </div>
                      </div>
                      <Separator className="mb-6" />
                    </div>
                  );
                })}
            </div>
            <div className="w-full">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span> <span>price</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping estimate</span> <span>price</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax estimate</span> <span>price</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Order total</span> <span>price</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full rounded-full">
            Confirm order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSummary;
