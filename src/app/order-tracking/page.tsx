import OrderTracking from "@/components/Order-tracking/OrderTracking";
import { LoginSpinner } from "@/components/ui/spinner";
import React, { Suspense } from "react";

const OrderTrackingPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="py-12 text-center">
            <LoginSpinner className="mx-auto" />
          </div>
        }
      >
        <OrderTracking />
      </Suspense>
    </div>
  );
};

export default OrderTrackingPage;
