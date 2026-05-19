import { Suspense } from "react";
import { LoginSpinner } from "@/components/ui/spinner";
import InvoiceClient from "@/components/Invoice/InvoiceClient";

const InvoicePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center">
          <LoginSpinner className="mx-auto" />
        </div>
      }
    >
      <InvoiceClient />
    </Suspense>
  );
};

export default InvoicePage;
