import type { Metadata } from "next";
import DonateForm from "@/components/donate/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support NIMO's community development work in Cameroon.",
};

export default function DonatePage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">
            Support Our Work
          </h1>
          <p className="mt-4 text-text-light">
            Your contribution helps us continue building better communities
            through education, protection, and research in Cameroon.
          </p>
        </div>

        <DonateForm />
      </div>
    </div>
  );
}
