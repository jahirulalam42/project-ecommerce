// app/order-confirmation/page.tsx
"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";
import { getOrder } from "@/lib/api";
import { LoginSpinner } from "@/components/ui/spinner";

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState<any>({});
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

  console.log("Current Order", order);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <LoginSpinner className="mx-auto" />
      </div>
    );
  }

  if (Object.keys(order).length === 0 && loading === false) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">No order found.</p>
        <Link href="/">
          <Button variant="link">Continue shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb / heading */}
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Confirmation
        </h2>
        <span>
          <Link href={"/"}>
            <Button variant={"link"} size={"sm"}>
              Homepage
            </Button>
          </Link>{" "}
          /{" "}
          <Button variant={"link"} size={"sm"}>
            Checkout
          </Button>{" "}
          /{" "}
          <Button variant={"link"} size={"sm"}>
            Confirmation
          </Button>
        </span>
      </div>

      {/* Success message */}
      <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 flex items-center gap-4">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <div>
          <h3 className="text-xl font-semibold text-green-800">
            Thank you for your order!
          </h3>
          <p className="text-green-700 mt-1">
            Order{" "}
            <span className="font-mono font-semibold">{order?.orderId}</span>{" "}
            has been placed successfully.
          </p>
          <p className="text-sm text-green-600">
            Estimated delivery: {order?.estimatedDelivery}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: details */}
        <div className="flex flex-col gap-6">
          {/* Shipping Address */}
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

          {/* Contact Info */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">CONTACT INFO</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>Phone: {order?.contact.phone}</p>
              <p>Email: {order?.contact.email}</p>
            </CardContent>
          </Card>

          {/* Payment (partial) */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">PAYMENT</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>Card ending in •••• {order?.payment.last4}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Order summary (mirror of your OrderSummary look) */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {order?.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative bg-gray-100 rounded">
                      {/* If you have images, include them */}
                      <img
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size} size &middot; Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${item.discountPrice || item.price}
                      </p>
                      {item.discountPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          ${item.price}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>{" "}
                  <span>${order?.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>{" "}
                  <span>${order?.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax</span> <span>${order?.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Order Total</span>{" "}
                  <span>${order?.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call-to-action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Link href="/">
          <Button variant="outline" className="rounded-full w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/order-tracking">
          {" "}
          {/* Optional future page */}
          <Button className="rounded-full w-full sm:w-auto">Track Order</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
