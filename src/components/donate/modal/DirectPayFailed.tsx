"use client";

interface DirectPayFailedProps {
  message?: string;
  onRetry: () => void;
  onClose: () => void;
}

export function DirectPayFailed({ message, onRetry, onClose }: DirectPayFailedProps) {
  return (
    <div className="text-center py-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <svg className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h3 className="mt-3 text-lg font-bold text-text">
        Payment Not Completed
      </h3>
      <p className="mt-1 text-xs text-text-light">
        {message || "The mobile prompt was cancelled, expired, or declined."}
      </p>

      <div className="mt-4 rounded-lg bg-bg-alt p-3 border border-border text-left text-2xs text-text-light space-y-1">
        <p className="font-semibold text-text">Troubleshooting tips:</p>
        <p>• Make sure your mobile screen is unlocked.</p>
        <p>• Check your Mobile Money account balance.</p>
        <p>• Confirm you entered the correct PIN before timeout.</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 flex-1 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Send Prompt Again
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-text hover:bg-bg-alt"
        >
          Close
        </button>
      </div>
    </div>
  );
}

