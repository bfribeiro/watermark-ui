import Card from "../ui/Card";
import { templates } from "../../constants/watermark";
import type { Buyer, TemplateKey, WatermarkedFile } from "../../types/watermark";

type ProcessSectionProps = {
  buyers: Buyer[];
  template: TemplateKey;
  watermarkedFiles: WatermarkedFile[];
  completed: boolean;
  processing: boolean;
  processBatch: () => void;
  sourceFile: File | null;
  resetProcessingState: () => void;
};

export default function ProcessSection({
  buyers,
  template,
  watermarkedFiles,
  completed,
  processing,
  processBatch,
  sourceFile,
  resetProcessingState,
}: ProcessSectionProps) {
  const canProcess = buyers.length > 0 && !!sourceFile;

  return (
    <Card title="Batch Processing">
      <div className="space-y-6">
        <div className="bg-[#0A1A2F]/5 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#0FA3B1]">
                {buyers.length}
              </div>
              <div className="text-sm text-[#0A1A2F]/70 mt-1">Buyers</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#0FA3B1]">
                {templates[template].name}
              </div>
              <div className="text-sm text-[#0A1A2F]/70 mt-1">Template</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#0FA3B1]">
                {watermarkedFiles.length}
              </div>
              <div className="text-sm text-[#0A1A2F]/70 mt-1">Generated</div>
            </div>
          </div>
        </div>

        {!sourceFile && (
          <div className="rounded-lg border border-[#E6A700]/30 bg-[#E6A700]/10 p-4 text-sm text-[#0A1A2F]/80">
            Upload a master PDF or EPUB before processing.
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={processBatch}
            disabled={!canProcess || processing}
            className="px-6 py-3 bg-[#0FA3B1] text-white rounded-lg hover:bg-[#0FA3B1]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : completed ? "Run Again" : "Generate Watermarked Files"}
          </button>

          <button
            onClick={resetProcessingState}
            disabled={processing}
            className="px-6 py-3 border border-[#0A1A2F]/15 rounded-lg hover:bg-[#0A1A2F]/5 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Results
          </button>
        </div>

        {processing && (
          <div className="bg-[#E6A700]/10 border border-[#E6A700]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-[#E6A700] border-t-transparent rounded-full animate-spin"></div>
              <div className="font-semibold text-[#E6A700]">
                Processing batch...
              </div>
            </div>
          </div>
        )}

        {completed && watermarkedFiles.length > 0 && (
          <div className="border border-[#0A1A2F]/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#0A1A2F]/5">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Buyer</th>
                  <th className="text-left px-4 py-3 font-semibold">Code</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Expires</th>
                </tr>
              </thead>
              <tbody>
                {watermarkedFiles.map((file, index) => (
                  <tr
                    key={`${file.buyer.orderId}-${index}`}
                    className="border-t border-[#0A1A2F]/10"
                  >
                    <td className="px-4 py-3">{file.buyer.name}</td>
                    <td className="px-4 py-3 font-mono">{file.code}</td>
                    <td className="px-4 py-3">
                      {file.status === "ready" ? (
                        <span className="text-[#1B9C85] font-semibold">
                          Ready
                        </span>
                      ) : (
                        <span className="text-[#C44536] font-semibold">
                          Error
                        </span>
                      )}
                      {file.error && (
                        <div className="text-xs text-[#0A1A2F]/60 mt-1">
                          {file.error}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{file.expiresAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}