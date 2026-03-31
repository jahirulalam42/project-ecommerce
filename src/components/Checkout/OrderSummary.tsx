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
import {
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
  makeOrdertotal,
} from "@/features/cart/cartSlice";
import { AppDispatch } from "@/store/store";

const OrderSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts = useSelector((state: any) => state.cart.items);
  // const [summaryProducts, setSummaryProducts] = useState<any>();
  const subtotal = useSelector((state: any) => state.cart.subtotal);
  const taxtotal = useSelector((state: any) => state.cart.taxtotal);
  const ordertotal = useSelector((state: any) => state.cart.ordertotal);
  const summaryProducts = useSelector(
    (state: any) => state.cart.summaryProducts
  );
  console.log("CartProducts", cartProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    dispatch(makeOrdertotal(subtotal + 5 + taxtotal));
  }, [subtotal, taxtotal]);
  console.log("SubTotal", subtotal);
  return (
    <div>
      <Card className="w-full ">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-6">
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
                          <span className="font-semibold">
                            ${discountPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${price}
                          </span>
                        </div>
                      </div>
                      <Separator className="mb-6" />
                    </div>
                  );
                })}
            </div>
            <div className="w-full hidden md:block">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping estimate</span> <span>$5.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax estimate</span> <span>${taxtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Order total</span> <span>${ordertotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 hidden md:block">
          <Button type="submit" className="w-full rounded-full">
            Confirm order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSummary;
