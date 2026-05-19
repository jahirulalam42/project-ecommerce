import OrderDetails from "@/components/Order-details/OrderDetails";
import { LoginSpinner } from "@/components/ui/spinner";
import React, { Suspense } from "react";

const OrderDetailsPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="py-12 text-center">
            <LoginSpinner className="mx-auto" />
          </div>
        }
      >
        <OrderDetails />
      </Suspense>
    </div>
  );
};

export default OrderDetailsPage;
