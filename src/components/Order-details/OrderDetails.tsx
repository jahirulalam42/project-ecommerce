"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrder, getReturn } from "@/lib/api";
import { LoginSpinner } from "@/components/ui/spinner";
import { CheckCircle2, Package, Truck, Clock, Home } from "lucide-react";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case "shipped":
    case "out_for_delivery":
      return <Truck className="w-5 h-5 text-blue-600" />;
    case "processing":
    case "confirmed":
      return <Package className="w-5 h-5 text-yellow-600" />;
    case "pending":
      return <Clock className="w-5 h-5 text-gray-500" />;
    default:
      return null;
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-50 text-green-700 border-green-200";
    case "shipped":
    case "out_for_delivery":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "processing":
    case "confirmed":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [returnStatus, setReturnStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      try {
        const response = await getOrder(orderId);
        setOrder(response?.data);
        console.log("Order status:", response?.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReturnStatus = async () => {
      try {
        const response = await getReturn(orderId);
        setReturnStatus(response?.data);
        console.log("Return status:", response?.data);
      } catch (error) {
        console.error("Error fetching return status:", error);
      }
    };

    fetchOrder();
    fetchReturnStatus();
  }, [orderId]);

  const returnItemIds = useMemo(() => {
    if (!returnStatus) return [];
    const ids: number[] = [];
    for (const ret of returnStatus) {
      for (const item of ret?.items || []) {
        ids.push(item.itemId);
      }
    }
    return ids;
  }, [returnStatus]);

  const uniqueReturnItemIds = useMemo(() => {
    if (!returnItemIds) return [];

    let unique: any = [];

    // Iterate over the array to get unique values
    for (let i = 0; i < returnItemIds.length; i++) {
      // Check if the element exist in the new array
      if (!unique.includes(returnItemIds[i])) {
        // If not then push the element to new array
        unique.push(returnItemIds[i]);
      }
    }
    return unique;
  }, [returnItemIds]);
  console.log("Unique Return Item Ids", uniqueReturnItemIds);

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
        <p className="text-lg text-gray-500">Order not found.</p>
        <Link href="/my-orders">
          <Button variant="link">Back to My Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Details
        </h2>
        <span>
          <Link href="/">
            <Button variant="link" size="sm">
              Homepage
            </Button>
          </Link>{" "}
          /{" "}
          <Link href="/my-orders">
            <Button variant="link" size="sm">
              My Orders
            </Button>
          </Link>{" "}
          /{" "}
          <Button variant="link" size="sm">
            Details
          </Button>
        </span>
      </div>

      {/* Status + Order ID */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-semibold text-lg">{order.orderId}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeStyle(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)}
            <span className="capitalize">
              {order?.status?.replace(/_/g, " ")}
            </span>
          </span>
          <p className="text-sm text-gray-500">
            Est. delivery: {order.estimatedDelivery}
          </p>
        </div>
      </div>

      {/* Full order info (same cards as confirmation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          {/* Shipping */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">SHIPPING ADDRESS</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="font-medium">
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p>{order.shipping.address1}</p>
              {order.shipping.address2 && <p>{order.shipping.address2}</p>}
              <p>
                {order.shipping.city}, {order.shipping.state}{" "}
                {order.shipping.postal}
              </p>
              <p>{order.shipping.country}</p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">CONTACT INFO</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>Phone: {order.contact.phone}</p>
              <p>Email: {order.contact.email}</p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">PAYMENT</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>Card ending in •••• {order.payment.last4}</p>
            </CardContent>
          </Card>
        </div>

        {/* Order items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size} &middot; Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${item.discountPrice || item.price}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span> <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>{" "}
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span> <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Order Total</span> <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center pb-6">
        <Link href="/my-orders">
          <Button variant="outline" className="rounded-full w-full sm:w-auto">
            Back to My Orders
          </Button>
        </Link>
        <Link href={`/order-tracking?orderId=${order.orderId}`}>
          <Button className="rounded-full w-full sm:w-auto">Track Order</Button>
        </Link>
        <Link href={`/invoice?orderId=${order.orderId}`}>
          <Button className="rounded-full w-full sm:w-auto">
            View Invoice
          </Button>
        </Link>
        {/* If status allows, add a Return/Exchange button */}
        {order.status === "delivered" &&
          (returnStatus !== null ? (
            order?.items === returnStatus?.items ? (
              <Button className="rounded-full w-full sm:w-auto" disabled>
                Return / Exchange
              </Button>
            ) : (
              <Link href={`/return?orderId=${order.orderId}`}>
                <Button className="rounded-full w-full sm:w-auto">
                  Return / Exchange
                </Button>
              </Link>
            )
          ) : (
            <Link href={`/return?orderId=${order.orderId}`}>
              <Button className="rounded-full w-full sm:w-auto">
                Return / Exchange
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OrderDetails;
