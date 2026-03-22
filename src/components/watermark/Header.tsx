export default function Header() {
  return (
    <header className="relative border-b border-[#EDE6D8] bg-[#F6F1E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,155,60,0.10),transparent_45%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.22em] text-[#9A7B3E] mb-3">
            BlindStamp Library Edition
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] leading-tight">
            Protect every ebook copy with traceable ownership
          </h1>

          <p className="text-[#5F564A] text-base leading-7 mt-4">
            Generate protected PDF and EPUB editions, assign them to individual
            buyers, and investigate leaked files with a clean editorial workflow.
          </p>
        </div>
      </div>
    </header>
  );
}