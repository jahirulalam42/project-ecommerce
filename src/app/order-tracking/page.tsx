"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/lib/api";
import { LoginSpinner } from "@/components/ui/spinner";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Clock,
  CircleDot,
} from "lucide-react";

// Define the possible statuses and their order
const STATUS_STEPS = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

const OrderTrackingPage = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionOrder = sessionStorage.getItem("orderId");

    const fetchOrder = async () => {
      if (sessionOrder) {
        try {
          const response = await getOrder(sessionOrder);
          setOrder(response?.data);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <LoginSpinner className="mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">No order found.</p>
        <Link href="/">
          <Button variant="link">Continue shopping</Button>
        </Link>
      </div>
    );
  }

  // Find the index of the current status
  const currentStepIndex = STATUS_STEPS.findIndex(
    (step) => step.key === order.status
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Tracking
        </h2>
        <span>
          <Link href={"/"}>
            <Button variant={"link"} size={"sm"}>
              Homepage
            </Button>
          </Link>{" "}
          /{" "}
          <Link href="/order-confirmation">
            <Button variant={"link"} size={"sm"}>
              Confirmation
            </Button>
          </Link>{" "}
          /{" "}
          <Button variant={"link"} size={"sm"}>
            Tracking
          </Button>
        </span>
      </div>

      {/* Order ID and estimated delivery */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-semibold text-lg">{order.orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Estimated Delivery</p>
          <p className="font-semibold">{order.estimatedDelivery}</p>
        </div>
      </div>

      {/* Status Timeline - Visual progress bar */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">ORDER STATUS</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-8">
          <div className="relative">
            {/* Horizontal line behind circles */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    currentStepIndex >= 0
                      ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center text-center w-[70px] sm:w-[100px]"
                  >
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                        ${
                          isCompleted
                            ? "bg-green-600 border-green-600 text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }
                        ${isCurrent ? "ring-4 ring-green-100" : ""}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`mt-2 text-xs sm:text-sm font-medium
                        ${isCompleted ? "text-green-700" : "text-gray-500"}
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information (reuse from order) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-gray-600">SHIPPING ADDRESS</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="font-medium">
              {order?.shipping.firstName} {order?.shipping.lastName}
            </p>
            <p>{order?.shipping.address1}</p>
            {order?.shipping.address2 && <p>{order?.shipping.address2}</p>}
            <p>
              {order?.shipping.city}, {order?.shipping.state}{" "}
              {order?.shipping.postal}
            </p>
            <p>{order?.shipping.country}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-gray-600">ORDER SUMMARY</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-3">
              {order?.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} &middot; {item.size}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${item.discountPrice || item.price}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order?.total?.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Link href="/order-confirmation">
          <Button variant="outline" className="rounded-full w-full sm:w-auto">
            Back to Confirmation
          </Button>
        </Link>
        <Link href="/">
          <Button className="rounded-full w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
