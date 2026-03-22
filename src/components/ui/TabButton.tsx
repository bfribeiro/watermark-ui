import type { LucideIcon } from "lucide-react";

type TabButtonProps = {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
};

export default function TabButton({
  children,
  active,
  onClick,
  icon: Icon,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
      ${
        active
          ? "border-[#C89B3C] text-[#1C1C1C]"
          : "border-transparent text-[#6B6B6B] hover:text-[#1C1C1C]"
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
}