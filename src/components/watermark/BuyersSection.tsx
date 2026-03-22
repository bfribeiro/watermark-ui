import { useState } from "react";
import {
  Upload,
  Download,
  CheckCircle2,
  XCircle,
  Trash2,
  Plus,
  Users,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import type { Buyer } from "../../types/watermark";

type BuyersSectionProps = {
  buyers: Buyer[];
  csvError: string | null;
  loadSampleBuyers: () => void;
  handleCsvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  downloadSampleCsv: () => void;
  addManualBuyer: (buyer: Buyer) => void;
  removeBuyer: (orderId: string) => void;
};

export default function BuyersSection({
  buyers,
  csvError,
  loadSampleBuyers,
  handleCsvUpload,
  downloadSampleCsv,
  addManualBuyer,
  removeBuyer,
}: BuyersSectionProps) {
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualOrderId, setManualOrderId] = useState("");
  const [manualError, setManualError] = useState<string | null>(null);

  const handleAddBuyer = () => {
    const name = manualName.trim();
    const email = manualEmail.trim();
    const orderId = manualOrderId.trim();

    if (!name || !email || !orderId) {
      setManualError("Fill in name, email, and order ID.");
      return;
    }

    addManualBuyer({
      name,
      email,
      orderId,
    });

    setManualName("");
    setManualEmail("");
    setManualOrderId("");
    setManualError(null);
  };

  return (
    <Card title="Reader List">
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9A7B3E] mb-3">
            <Users className="w-4 h-4" />
            Distribution
          </div>

          <h3 className="text-2xl font-serif text-[#1C1C1C]">
            Assign protected copies
          </h3>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            Add readers one by one for small releases or import a CSV for a full
            distribution batch.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button variant="primary" onClick={loadSampleBuyers}>
            Load Sample Buyers
          </Button>

          <label className="inline-flex">
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
            <span className="inline-flex">
              <Button variant="secondary">
                <Upload className="w-4 h-4" />
                Import CSV
              </Button>
            </span>
          </label>

          <Button variant="secondary" onClick={downloadSampleCsv}>
            <Download className="w-4 h-4" />
            Download Sample CSV
          </Button>
        </div>

        <div className="rounded-2xl border border-[#E7DDCB] bg-[#FFFDFC] p-6">
          <div className="mb-5">
            <h4 className="text-lg font-serif text-[#1C1C1C]">
              Manual entry
            </h4>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Ideal for one or two direct deliveries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="Reader name"
              className="w-full px-4 py-3 border border-[#E0D6C2] rounded-lg bg-[#FFFDFC] text-[#1C1C1C] placeholder:text-[#9A948A] focus:outline-none focus:border-[#C89B3C]"
            />

            <input
              type="email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              placeholder="Reader email"
              className="w-full px-4 py-3 border border-[#E0D6C2] rounded-lg bg-[#FFFDFC] text-[#1C1C1C] placeholder:text-[#9A948A] focus:outline-none focus:border-[#C89B3C]"
            />

            <input
              type="text"
              value={manualOrderId}
              onChange={(e) => setManualOrderId(e.target.value)}
              placeholder="Order ID"
              className="w-full px-4 py-3 border border-[#E0D6C2] rounded-lg bg-[#FFFDFC] text-[#1C1C1C] placeholder:text-[#9A948A] focus:outline-none focus:border-[#C89B3C]"
            />
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <Button variant="primary" onClick={handleAddBuyer}>
              <Plus className="w-4 h-4" />
              Add Buyer
            </Button>

            {manualError && (
              <span className="text-sm text-[#9C2F2F] font-medium">
                {manualError}
              </span>
            )}
          </div>
        </div>

        {csvError && (
          <div className="bg-[#FDF1F1] border border-[#E9D3D3] rounded-xl p-4 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-[#9C2F2F] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#9C2F2F]">
                CSV import issue
              </div>
              <div className="text-sm text-[#6B6B6B] mt-1">{csvError}</div>
            </div>
          </div>
        )}

        {!csvError && buyers.length > 0 && (
          <div className="bg-[#F2F7F1] border border-[#D8E9D7] rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3A7A52] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#3A7A52]">
                Reader list ready
              </div>
              <div className="text-sm text-[#5E6A5D] mt-1">
                {buyers.length} protected copies can now be issued.
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#F8F3EA] border border-[#E7DDCB] rounded-xl p-4">
          <div className="text-sm font-semibold text-[#1C1C1C] mb-2">
            CSV format example
          </div>
          <div className="bg-[#2A241C] text-[#F3E9D2] rounded-lg p-3 font-mono text-xs overflow-x-auto">
            <div>name,email,order_id</div>
            <div>Alice Johnson,alice@example.com,ORD-1001</div>
            <div>Bob Smith,bob@example.com,ORD-1002</div>
          </div>
          <div className="text-xs text-[#6B6B6B] mt-2">
            Required columns: <strong>name</strong>, <strong>email</strong>,{" "}
            <strong>order_id</strong>
          </div>
        </div>

        {buyers.length > 0 && (
          <div className="border border-[#E7DDCB] rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F3EA]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#1C1C1C]">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1C1C1C]">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1C1C1C]">
                    Order ID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1C1C1C]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr
                    key={`${buyer.orderId}-${index}`}
                    className="border-t border-[#F0E8D9]"
                  >
                    <td className="px-4 py-3 text-[#1C1C1C]">{buyer.name}</td>
                    <td className="px-4 py-3 text-[#5C5C5C]">{buyer.email}</td>
                    <td className="px-4 py-3 font-mono text-[#1C1C1C]">
                      {buyer.orderId}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="danger"
                        onClick={() => removeBuyer(buyer.orderId)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </td>
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