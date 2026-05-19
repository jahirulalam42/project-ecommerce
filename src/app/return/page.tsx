import ReturnExchange from "@/components/Return/ReturnExchange";
import { LoginSpinner } from "@/components/ui/spinner";
import React, { Suspense } from "react";

const ReturnExchangePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center">
          <LoginSpinner className="mx-auto" />
        </div>
      }
    >
      <ReturnExchange />
    </Suspense>
  );
};

export default ReturnExchangePage;
