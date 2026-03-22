type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all";

  const variants = {
    primary:
      "bg-[#C89B3C] text-white hover:bg-[#B88A2E] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border border-[#E0D6C2] text-[#1C1C1C] hover:bg-[#F4EFE6] disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "border border-[#E8CACA] text-[#8B2E2E] hover:bg-[#F9ECEC] disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}