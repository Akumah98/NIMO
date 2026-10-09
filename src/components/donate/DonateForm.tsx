"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import donationData from "@/data/donationOptions.json";
import { DonateAmountSelector } from "./DonateAmountSelector";

const { amounts, causes } = donationData;

export default function DonateForm() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState(causes[0]);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const selectedAmount = amount || Number(customAmount) || 0;

  return (
    <Card className="mt-10">
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text">Frequency</h3>
          <div className="mt-3 flex gap-3">
            {(["one-time", "monthly"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`min-h-11 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  frequency === freq
                    ? "bg-primary text-white"
                    : "border border-border text-text-light hover:border-primary"
                }`}
              >
                {freq === "one-time" ? "One-time" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        <DonateAmountSelector
          amounts={amounts}
          amount={amount}
          customAmount={customAmount}
          onSelectAmount={(a) => {
            setAmount(a);
            setCustomAmount("");
          }}
          onCustomAmountChange={(val) => {
            setCustomAmount(val);
            setAmount(null);
          }}
        />

        <div>
          <h3 className="text-sm font-medium text-text">Direct your support</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {causes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCause(c)}
                className={`min-h-11 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  cause === c
                    ? "border-2 border-primary bg-primary-light text-primary"
                    : "border border-border text-text-light hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {selectedAmount > 0 && (
          <div className="rounded-lg bg-bg-alt p-4">
            <p className="text-sm text-text-light">
              You&apos;re donating{" "}
              <span className="font-semibold text-text">{selectedAmount.toLocaleString()} XAF</span>{" "}
              {frequency === "monthly" && "monthly "}to{" "}
              <span className="font-semibold text-text">{cause}</span>.
            </p>
          </div>
        )}

        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <p className="text-sm font-medium text-text-light">Payment integration coming soon.</p>
          <p className="mt-1 text-xs text-text-light">
            Mobile Money (MTN/Orange) and card payment options will be available here.
          </p>
        </div>
      </div>
    </Card>
  );
}
