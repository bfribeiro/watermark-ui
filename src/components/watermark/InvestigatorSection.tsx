import {
  AlertCircle,
  Search,
  CheckCircle2,
  XCircle,
  Fingerprint,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import type { InvestigatorResult } from "../../types/watermark";

type InvestigatorSectionProps = {
  investigatorFile: File | null;
  setInvestigatorFile: (file: File | null) => void;
  investigateFile: () => void;
  investigatorResult: InvestigatorResult | null;
};

export default function InvestigatorSection({
  investigatorFile,
  setInvestigatorFile,
  investigateFile,
  investigatorResult,
}: InvestigatorSectionProps) {
  return (
    <Card title="Leak Investigator">
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9A7B3E] mb-3">
            <Fingerprint className="w-4 h-4" />
            Forensic Lookup
          </div>

          <h3 className="text-2xl font-serif text-[#1C1C1C]">
            Inspect a suspicious copy
          </h3>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            Upload a suspected file to identify whether it belongs to your
            protected distribution set and, if so, trace it back to the buyer.
          </p>
        </div>

        <div className="bg-[#F8F3EA] border border-[#E7DDCB] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#9A7B3E] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#5F564A]">
              Use this tool when a leaked or suspicious file appears outside your
              intended reader list.
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
            Suspect File
          </label>

          <div className="border border-dashed border-[#D8CCB6] rounded-2xl p-10 text-center bg-[#FFFDFC] hover:border-[#C89B3C] transition-colors">
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={(e) => setInvestigatorFile(e.target.files?.[0] ?? null)}
              className="hidden"
              id="investigator-upload"
            />

            <label htmlFor="investigator-upload" className="cursor-pointer block">
              <div className="w-16 h-16 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-[#9A7B3E]" />
              </div>

              {investigatorFile ? (
                <>
                  <div className="text-[#1C1C1C] font-semibold text-base">
                    {investigatorFile.name}
                  </div>
                  <div className="text-sm text-[#6B6B6B] mt-2">
                    Click here to replace this file
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[#1C1C1C] font-semibold text-base mb-1">
                    Select a PDF or EPUB file
                  </div>
                  <div className="text-sm text-[#6B6B6B]">
                    The system will search for a matching watermark signature
                  </div>
                </>
              )}
            </label>
          </div>
        </div>

        {investigatorFile && (
          <Button onClick={investigateFile}>
            <Search className="w-4 h-4" />
            Analyze File
          </Button>
        )}

        {investigatorResult && investigatorResult.found && (
          <div className="bg-[#F2F7F1] border border-[#D8E9D7] rounded-xl p-5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3A7A52] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="font-semibold text-[#3A7A52]">
                Watermark identified
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Code:</strong> {investigatorResult.code}
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Buyer:</strong> {investigatorResult.buyer.name}
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Email:</strong> {investigatorResult.buyer.email}
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Order ID:</strong> {investigatorResult.buyer.orderId}
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Batch:</strong> {investigatorResult.batch}
              </div>
              <div className="text-[#5E6A5D]">
                <strong>Issued:</strong> {investigatorResult.issuedAt}
              </div>
            </div>
          </div>
        )}

        {investigatorResult && !investigatorResult.found && (
          <div className="bg-[#FDF1F1] border border-[#E9D3D3] rounded-xl p-5 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-[#9C2F2F] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#9C2F2F]">
                No watermark match found
              </div>
              <div className="text-sm text-[#6B6B6B] mt-1">
                {investigatorResult.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}