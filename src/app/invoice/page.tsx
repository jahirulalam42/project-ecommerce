"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/lib/api";
import { LoginSpinner } from "@/components/ui/spinner";
import { Printer } from "lucide-react";

const InvoicePage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      try {
        const response = await getOrder(orderId);
        setOrder(response?.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
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

  return (
    <>
      {/* Print styles – only the content inside #invoice-content will be visible */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-content,
          #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="no-print">
        {/* Breadcrumb */}
        <div className="py-6">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Invoice
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
              Invoice
            </Button>
          </span>
        </div>

        {/* Print button */}
        <div className="flex justify-end mb-4">
          <Button onClick={handlePrint} className="rounded-full">
            <Printer className="mr-2 h-4 w-4" /> Print / Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Content – this is what gets printed */}
      <div
        ref={invoiceRef}
        id="invoice-content"
        className="max-w-4xl mx-auto p-6 bg-white"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
            <p className="text-sm text-gray-500">
              Order #{order.orderId || order._id}
            </p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{order.date}</p>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold text-gray-600">BILL TO</p>
            <p className="font-medium">
              {order.shipping?.firstName} {order.shipping?.lastName}
            </p>
            <p>{order.shipping?.address1}</p>
            {order.shipping?.address2 && <p>{order.shipping?.address2}</p>}
            <p>
              {order.shipping?.city}, {order.shipping?.state}{" "}
              {order.shipping?.postal}
            </p>
            <p>{order.shipping?.country}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-semibold text-gray-600">SHIP TO</p>
            <p className="font-medium">
              {order.shipping?.firstName} {order.shipping?.lastName}
            </p>
            <p>{order.shipping?.address1}</p>
            {order.shipping?.address2 && <p>{order.shipping?.address2}</p>}
            <p>
              {order.shipping?.city}, {order.shipping?.state}{" "}
              {order.shipping?.postal}
            </p>
            <p>{order.shipping?.country}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-gray-300 text-left text-sm text-gray-600">
              <th className="pb-2 font-semibold">Item</th>
              <th className="pb-2 font-semibold text-center">Qty</th>
              <th className="pb-2 font-semibold text-right">Price</th>
              <th className="pb-2 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item: any, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.size && `${item.size} · `}
                    SKU: {item.productId || "N/A"}
                  </p>
                </td>
                <td className="py-3 text-center">{item.quantity}</td>
                <td className="py-3 text-right">
                  ${item.discountPrice?.toFixed(2) || item.price?.toFixed(2)}
                </td>
                <td className="py-3 text-right font-semibold">
                  $
                  {((item.discountPrice || item.price) * item.quantity).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${order.shippingCost?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${order.tax?.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 text-center text-sm text-gray-500">
          <p>Thank you for your purchase!</p>
          <p>If you have any questions, contact support@example.com</p>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
