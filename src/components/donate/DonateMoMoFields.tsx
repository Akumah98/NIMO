"use client";

interface DonateMoMoFieldsProps {
  operator: "mobile money" | "orange money";
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export function DonateMoMoFields({
  operator,
  donorName,
  donorEmail,
  donorPhone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: DonateMoMoFieldsProps) {
  const isMTN = operator === "mobile money";
  const opLabel = isMTN ? "MTN Mobile Money" : "Orange Money";
  const placeholder = isMTN ? "670000000" : "690000000";

  return (
    <div className="space-y-4 rounded-xl border border-primary/20 bg-primary-light/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-primary/10 pb-2">
        <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
          {opLabel} Donor Details
        </h4>
        <span className="rounded-full bg-white px-2 py-0.5 text-2xs font-semibold text-primary border border-primary/20">
          Direct Push Prompt
        </span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="momo-donor-name" className="block text-xs font-medium text-text-light mb-1">
            Full Name *
          </label>
          <input
            id="momo-donor-name"
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
          <label htmlFor="momo-donor-email" className="block text-xs font-medium text-text-light mb-1">
            Email Address * (For Receipt)
          </label>
          <input
            id="momo-donor-email"
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
          <label htmlFor="momo-donor-phone" className="block text-xs font-medium text-text">
            {opLabel} Phone Number *
          </label>
          <span className="text-2xs text-text-light">9 digits (e.g. {placeholder})</span>
        </div>
        <input
          id="momo-donor-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={placeholder}
          value={donorPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        />
        <p className="mt-1 text-2xs text-text-light">
          A USSD authorization prompt will appear on this phone screen to enter your PIN.
        </p>
      </div>
    </div>
  );
}

