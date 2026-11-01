import { Suspense } from "react";
import type { Metadata } from "next";
import { DonationReceiptView } from "@/components/donate/receipt/DonationReceiptView";

export const metadata: Metadata = {
  title: "Donation Confirmation",
  description: "Receipt and status of your contribution to NIMO.",
};

export default function DonationSuccessPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
              <p className="mt-4 text-sm text-text-light font-medium">Loading receipt...</p>
            </div>
          }
        >
          <DonationReceiptView />
        </Suspense>
      </div>
    </div>
  );
}

