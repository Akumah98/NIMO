interface PublishToggleProps {
  published: boolean;
  onChange: (val: boolean) => void;
}

export function PublishToggle({ published, onChange }: PublishToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        id="published"
        type="checkbox"
        checked={published}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
      />
      <label htmlFor="published" className="text-sm font-medium text-text">
        Published
      </label>
    </div>
  );
}
