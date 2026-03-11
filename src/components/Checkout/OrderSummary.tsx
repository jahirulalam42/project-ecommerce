"use client";
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
import { Separator } from "../ui/separator";
import Image from "next/image";
import globe from "@/../public/globe.svg";

const OrderSummary = () => {
  const [productCount, setProductCount] = React.useState(1);
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
              <div className="h-[108px] flex flex-col gap-4">
                <div className="w-full h-full grid grid-cols-5 gap-2">
                  <div className="col-span-1 relative h-full w-full">
                    <Image
                      src={globe}
                      alt="product"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="col-span-3 flex flex-col justify-between">
                    {" "}
                    <div className="flex flex-col">
                      <CardTitle>Black Automatic Watch</CardTitle>
                      <CardDescription>One size</CardDescription>
                    </div>
                    <div className="w-[80px] h-[40px]">
                      <div className="flex flex-row justify-center items-center gap-2 bg-gray-100 rounded-full">
                        <Button
                          variant="outline"
                          className="rounded-full"
                          size={"icon-xs"}
                          onClick={() => {
                            setProductCount((prev) =>
                              prev > 1 ? prev - 1 : prev
                            );
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
                    </div>
                  </div>

                  <div className="col-span-1">price</div>
                </div>
                <Separator />
              </div>
            </div>
            <div>Subtotal</div>
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
