type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E0D0] px-8 py-7 shadow-[0_10px_24px_rgba(80,60,20,0.04)]">
      <h2 className="text-2xl font-serif text-[#1C1C1C] mb-5">{title}</h2>
      <div className="text-[#1C1C1C]/90">{children}</div>
    </div>
  );
}