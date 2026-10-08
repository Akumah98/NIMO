interface SiteContentFieldProps {
  fieldKey: string;
  label: string;
  type: string;
  value: string;
  onChange: (key: string, value: string) => void;
}

export default function SiteContentField({
  fieldKey,
  label,
  type,
  value,
  onChange,
}: SiteContentFieldProps) {
  const inputStyles =
    "rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          rows={3}
          className={inputStyles}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className={inputStyles}
        />
      )}
    </div>
  );
}
