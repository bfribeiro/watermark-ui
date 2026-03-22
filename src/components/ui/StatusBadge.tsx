type StatusBadgeProps = {
  status: "ready" | "error";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#EAF4EC] px-3 py-1 text-xs font-semibold text-[#2F6B43]">
        Ready
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-[#F8EAEA] px-3 py-1 text-xs font-semibold text-[#8B2E2E]">
      Error
    </span>
  );
}