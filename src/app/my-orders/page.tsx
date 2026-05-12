"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMyOrders } from "@/lib/api"; // You'll need to add this API function
import { LoginSpinner } from "@/components/ui/spinner";
import {
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";

// Helper to get an icon based on order status
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
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusStyle = (status: string) => {
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

const MyOrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log("User ID", session?.user?.id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders(session?.user?.id);
        console.log("Order response", response);
        setOrders(response?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchOrders();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <LoginSpinner className="mx-auto" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div>
        <div className="py-6">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            My Orders
          </h2>
          <span>
            <Link href={"/"}>
              <Button variant={"link"} size={"sm"}>
                Homepage
              </Button>
            </Link>{" "}
            /{" "}
            <Button variant={"link"} size={"sm"}>
              My Orders
            </Button>
          </span>
        </div>
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-lg text-gray-500">No orders yet.</p>
          <Link href="/">
            <Button variant="link" className="mt-2">
              Start shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Orders
        </h2>
        <span>
          <Link href={"/"}>
            <Button variant={"link"} size={"sm"}>
              Homepage
            </Button>
          </Link>{" "}
          /{" "}
          <Button variant={"link"} size={"sm"}>
            My Orders
          </Button>
        </span>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {orders.map((order: any) => (
          <Card
            key={order._id || order.orderId}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left side: Order info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-lg">
                      {order.orderId}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order?.status?.replace(/_/g, " ")}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                  <p className="text-sm">
                    {order.items?.length} item{order.items?.length !== 1 && "s"}{" "}
                    · Total:{" "}
                    <span className="font-semibold">
                      ${order.total?.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/order-tracking?orderId=${
                      order._id || order.orderId
                    }`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      Track
                    </Button>
                  </Link>
                  <Link href={`/order-details?orderId=${order.orderId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
