interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
}

const variants = {
  default: "bg-bg-alt text-text-light",
  primary: "bg-primary-light text-primary-dark",
  secondary: "bg-secondary-light text-secondary",
  accent: "bg-accent-light text-accent",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
