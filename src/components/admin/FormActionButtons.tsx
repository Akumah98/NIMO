import Button from "@/components/ui/Button";

interface FormActionButtonsProps {
  saving: boolean;
  isEditing: boolean;
  cancelHref: string;
  createLabel?: string;
  updateLabel?: string;
}

export function FormActionButtons({
  saving,
  isEditing,
  cancelHref,
  createLabel = "Create",
  updateLabel = "Update",
}: FormActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : isEditing ? updateLabel : createLabel}
      </Button>
      <Button variant="outline" href={cancelHref}>
        Cancel
      </Button>
    </div>
  );
}
