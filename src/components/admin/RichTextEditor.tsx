"use client";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1 rounded-t-lg border border-b-0 border-border bg-bg-alt px-3 py-2">
        <span className="text-xs text-text-light">Markdown supported</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write your content using Markdown..."}
        rows={15}
        className="rounded-b-lg border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <p className="text-xs text-text-light">
        Use **bold**, *italic*, ## headings, - lists, and [links](url)
      </p>
    </div>
  );
}
