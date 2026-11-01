"use client";

interface DonateDonorFieldsProps {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export function DonateDonorFields({
  donorName,
  donorEmail,
  donorPhone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: DonateDonorFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text">Your Information</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donor-name" className="block text-xs font-medium text-text-light mb-1">
            Full Name *
          </label>
          <input
            id="donor-name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={donorName}
            onChange={(e) => onNameChange(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="donor-email" className="block text-xs font-medium text-text-light mb-1">
            Email Address * (For Receipt)
          </label>
          <input
            id="donor-email"
            type="email"
            required
            autoComplete="email"
            placeholder="john@example.com"
            value={donorEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="donor-phone" className="block text-xs font-medium text-text-light">
            Mobile Money Phone Number *
          </label>
          <span className="text-2xs text-text-light">e.g. 670000000</span>
        </div>
        <input
          id="donor-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="6..."
          value={donorPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

