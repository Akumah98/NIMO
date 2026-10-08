"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

const AMOUNTS = [5000, 10000, 25000, 50000, 100000];
const CAUSES = [
  "General Fund",
  "Education in Emergencies",
  "GBV Protection",
  "Water & Sanitation",
];

export default function DonateForm() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState(CAUSES[0]);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const selectedAmount = amount || Number(customAmount) || 0;

  return (
    <Card className="mt-10">
      <div className="space-y-8">
        {/* Frequency */}
        <div>
          <h3 className="text-sm font-medium text-text">Frequency</h3>
          <div className="mt-3 flex gap-3">
            {(["one-time", "monthly"] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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

        {/* Amount */}
        <div>
          <h3 className="text-sm font-medium text-text">Amount (XAF)</h3>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustomAmount(""); }}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  amount === a
                    ? "bg-primary text-white"
                    : "border border-border text-text-light hover:border-primary"
                }`}
              >
                {a.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Cause */}
        <div>
          <h3 className="text-sm font-medium text-text">Direct your support</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CAUSES.map((c) => (
              <button
                key={c}
                onClick={() => setCause(c)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
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

        {/* Summary */}
        {selectedAmount > 0 && (
          <div className="rounded-lg bg-bg-alt p-4">
            <p className="text-sm text-text-light">
              You&apos;re donating{" "}
              <span className="font-semibold text-text">
                {selectedAmount.toLocaleString()} XAF
              </span>{" "}
              {frequency === "monthly" && "monthly "}to{" "}
              <span className="font-semibold text-text">{cause}</span>.
            </p>
          </div>
        )}

        {/* Payment - Coming Soon */}
        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <p className="text-sm font-medium text-text-light">
            Payment integration coming soon.
          </p>
          <p className="mt-1 text-xs text-text-light">
            Mobile Money (MTN/Orange) and card payment options will be available here.
          </p>
        </div>
      </div>
    </Card>
  );
}
