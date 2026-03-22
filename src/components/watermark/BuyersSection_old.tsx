import { Upload, Download, CheckCircle2, XCircle } from "lucide-react";
import Card from "../ui/Card";
import type { Buyer } from "../../types/watermark";

type BuyersSectionProps = {
  buyers: Buyer[];
  csvError: string | null;
  loadSampleBuyers: () => void;
  handleCsvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  downloadSampleCsv: () => void;
};

export default function BuyersSection({
  buyers,
  csvError,
  loadSampleBuyers,
  handleCsvUpload,
  downloadSampleCsv,
}: BuyersSectionProps) {
  return (
    <Card title="Buyer List">
      <div className="space-y-4">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={loadSampleBuyers}
            className="px-4 py-2 bg-[#0FA3B1] text-white rounded-lg hover:bg-[#0FA3B1]/90 transition-colors font-semibold"
          >
            Load Sample Buyers
          </button>

          <label className="px-4 py-2 border border-[#0A1A2F]/20 rounded-lg hover:bg-[#0A1A2F]/5 transition-colors cursor-pointer font-semibold inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={downloadSampleCsv}
            className="px-4 py-2 border border-[#0FA3B1] text-[#0FA3B1] rounded-lg hover:bg-[#0FA3B1]/5 transition-colors font-semibold inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Sample CSV
          </button>
        </div>

        {csvError && (
          <div className="bg-[#C44536]/10 border border-[#C44536]/20 rounded-lg p-4 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-[#C44536] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#C44536]">
                CSV Import Error
              </div>
              <div className="text-sm text-[#0A1A2F]/70 mt-1">{csvError}</div>
            </div>
          </div>
        )}

        {!csvError && buyers.length > 0 && (
          <div className="bg-[#1B9C85]/10 border border-[#1B9C85]/20 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1B9C85] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#1B9C85]">
                Buyers loaded successfully
              </div>
              <div className="text-sm text-[#0A1A2F]/70 mt-1">
                {buyers.length} buyers ready for processing
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#0FA3B1]/5 border border-[#0FA3B1]/20 rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">CSV Format Example:</div>
          <div className="bg-[#0A1A2F] text-[#0FA3B1] rounded p-3 font-mono text-xs overflow-x-auto">
            <div>name,email,order_id</div>
            <div>Alice Johnson,alice@example.com,ORD-1001</div>
            <div>Bob Smith,bob@example.com,ORD-1002</div>
          </div>
          <div className="text-xs text-[#0A1A2F]/70 mt-2">
            Required columns: <strong>name</strong>, <strong>email</strong>,{" "}
            <strong>order_id</strong>
          </div>
        </div>

        {buyers.length > 0 && (
          <div className="border border-[#0A1A2F]/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#0A1A2F]/5">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr key={`${buyer.orderId}-${index}`} className="border-t border-[#0A1A2F]/10">
                    <td className="px-4 py-3">{buyer.name}</td>
                    <td className="px-4 py-3">{buyer.email}</td>
                    <td className="px-4 py-3 font-mono">{buyer.orderId}</td>
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