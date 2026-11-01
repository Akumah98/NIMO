
"use client";

interface DirectPayPromptingProps {
  amount: number;
  phone: string;
  onCancel: () => void;
}

export function DirectPayPrompting({ amount, phone, onCancel }: DirectPayPromptingProps) {
  return (
    <div className="text-center py-4">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
          <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-bold text-text">
        Check Your Mobile Phone
      </h3>

      <div className="mt-3 rounded-lg bg-bg-alt p-3.5 border border-border text-left space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-text-light">Prompt sent to:</span>
          <span className="font-semibold text-text font-mono">{phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-light">Amount to approve:</span>
          <span className="font-bold text-primary">{amount.toLocaleString()} XAF</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-text-light leading-relaxed">
        A USSD prompt was sent to your phone. Please dial your <strong>Mobile Money PIN</strong> to authorize this donation.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-light">
        <svg className="h-4 w-4 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Waiting for your PIN confirmation...</span>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-text-light hover:text-red-600 transition-colors"
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
}
