"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderSummary from "@/components/Checkout/OrderSummary";

const page = () => {
  return (
    <div>
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Checkout
        </h2>
        <span>
          <Button variant={"link"} size={"sm"}>
            Homepage
          </Button>{" "}
          /{" "}
          <Button variant={"link"} size={"sm"}>
            Checkout
          </Button>
        </span>
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row gap-6">
        <div className="w-full md:w-[50%] flex-1  flex flex-col gap-6">
          <CheckoutInfo />
        </div>
        <div className="w-full md:w-[50%] flex-1 ">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default page;
