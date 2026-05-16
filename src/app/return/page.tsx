"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a shadcn Checkbox
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a shadcn Textarea
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you have shadcn Select
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getOrder, createReturn } from "@/lib/api"; // You'll need createReturn
import { LoginSpinner } from "@/components/ui/spinner";

const RETURN_REASONS = [
  "Wrong item received",
  "Item defective",
  "No longer needed",
  "Better price elsewhere",
  "Description not accurate",
  "Other",
];

const ReturnExchangePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnType, setReturnType] = useState<"refund" | "exchange">("refund");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  console.log("Order", order);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      try {
        const response = await getOrder(orderId);
        console.log("Response", response);
        setOrder(response?.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to return.");
      return;
    }
    if (!reason) {
      toast.error("Please select a reason for return.");
      return;
    }
    setSubmitting(true);
    try {
      await createReturn({
        orderId: order.orderId,
        items: selectedItems,
        type: returnType,
        reason,
        notes,
      });
      toast.success("Return request submitted successfully!", {
        description: "We will process your return shortly.",
      });
      router.push(`/order-details?orderId=${orderId}`);
    } catch (error) {
      toast.error("Failed to submit return. Please try again.");
      console.error("Return error:", error);
    } finally {
      setSubmitting(false);
    }
  };

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

  // Only allow returns for delivered orders
  if (order.status !== "delivered") {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">
          Returns can only be made after the order has been delivered.
        </p>
        <Link href={`/order-details?orderId=${orderId}`}>
          <Button variant="link">Back to Order Details</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Return / Exchange
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
          <Link href={`/order-details?orderId=${orderId}`}>
            <Button variant="link" size="sm">
              Order Details
            </Button>
          </Link>{" "}
          /{" "}
          <Button variant="link" size="sm">
            Return / Exchange
          </Button>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {/* Left: Item selection */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-gray-600">SELECT ITEMS</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500 mb-4">
              Check the items you want to return or exchange.{" "}
              <span className="font-semibold">Order: {order.orderId}</span>
            </p>
            <div className="space-y-4">
              {order.items?.map((item: any) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-4"
                >
                  <Checkbox
                    id={item._id || item.id}
                    checked={selectedItems.includes(item._id || item.id)}
                    onCheckedChange={() =>
                      handleItemToggle(item._id || item.id)
                    }
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={item._id || item.id}
                      className="font-medium cursor-pointer"
                    >
                      {item.name}
                    </Label>
                    {item.size && (
                      <p className="text-sm text-gray-500">
                        Size: {item.size} · Qty: {item.quantity}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    ${item.discountPrice || item.price}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Options */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-gray-600">RETURN OPTIONS</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <Label className="mb-2 block">Type</Label>
                <Select
                  value={returnType}
                  onValueChange={(value: "refund" | "exchange") =>
                    setReturnType(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="exchange">Exchange</SelectItem>
                  </SelectContent>
                </Select>
                {returnType === "exchange" && (
                  <p className="text-xs text-gray-500 mt-2">
                    Exchange options (e.g., size, color) will be handled after
                    approval.
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Reason</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {RETURN_REASONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" className="mb-2 block">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Please describe the issue..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            disabled={submitting || selectedItems.length === 0}
            className="w-full rounded-full"
          >
            {submitting ? "Submitting..." : "Submit Return Request"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchangePage;
