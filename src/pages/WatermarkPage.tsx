import { useRef, useState } from "react";
/* import { Upload, Users, Settings, Code, Search } from "lucide-react"; */
import { Upload, Users, Settings, Code } from "lucide-react";


import Header from "../components/watermark/Header";
import TabButton from "../components/ui/TabButton";
import UploadProjectSection from "../components/watermark/UploadProjectSection";
import TemplateSelector from "../components/watermark/TemplateSelector";
import BuyersSection from "../components/watermark/BuyersSection";
import ProcessSection from "../components/watermark/ProcessSection";
/*import InvestigatorSection from "../components/watermark/InvestigatorSection";*/

import { sampleBuyers } from "../constants/watermark";
import { parseBuyersCsv } from "../utils/csv";
import { downloadSampleCsv, downloadBlob } from "../utils/download";
import { generateWatermarkCode } from "../utils/watermarkCode";
import { watermarkPdf, watermarkBatchZip } from "../services/watermarkApi";

import type {
  ActiveTab,
  Buyer,
  TemplateKey,
  WatermarkedFile,
 // InvestigatorResult,
} from "../types/watermark";

export default function WatermarkPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("upload");
  const [projectName, setProjectName] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [template, setTemplate] = useState<TemplateKey>("balanced");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [watermarkedFiles, setWatermarkedFiles] = useState<WatermarkedFile[]>(
    []
  );
  // const [investigatorFile, setInvestigatorFile] = useState<File | null>(null);
  //const [investigatorResult, setInvestigatorResult] =
  //   useState<InvestigatorResult | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);

  const uploadInputResetKey = useRef(0);

  const isSupportedSourceFile = (file: File) => {
    const lowerName = file.name.toLowerCase();
    return lowerName.endsWith(".pdf") || lowerName.endsWith(".epub");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupportedSourceFile(file)) {
      alert("Please upload a PDF or EPUB file.");
      return;
    }

    setSourceFile(file);
    setCompleted(false);
    setWatermarkedFiles([]);
  };

  const loadSampleBuyers = () => {
    setBuyers(sampleBuyers);
    setCsvError(null);
  };

  const addManualBuyer = (buyer: Buyer) => {
    const orderIdExists = buyers.some(
      (existingBuyer) =>
        existingBuyer.orderId.toLowerCase() === buyer.orderId.toLowerCase()
    );

    if (orderIdExists) {
      setCsvError("Já existe um comprador com este order_id.");
      return;
    }

    setBuyers((prev) => [...prev, buyer]);
    setCsvError(null);
  };

  const removeBuyer = (orderId: string) => {
    setBuyers((prev) => prev.filter((buyer) => buyer.orderId !== orderId));
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvError(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = String(event.target?.result ?? "");
        const result = parseBuyersCsv(text);

        if (!result.success) {
          setCsvError(result.error);
          return;
        }

        setBuyers(result.buyers);
        setCsvError(null);
      } catch {
        setCsvError("Error parsing CSV file. Please check the format.");
      }
    };

    reader.readAsText(file);
  };

  const resetProcessingState = () => {
    setProcessing(false);
    setCompleted(false);
    setWatermarkedFiles([]);
  };

  const resetBatch = () => {
    setProjectName("");
    setSourceFile(null);
    setBuyers([]);
    setTemplate("balanced");
    setProcessing(false);
    setCompleted(false);
    setWatermarkedFiles([]);
   // setInvestigatorFile(null);
   // setInvestigatorResult(null);
    setCsvError(null);
    uploadInputResetKey.current += 1;
  };

    const processBatch = async () => {
    if (!sourceFile || buyers.length === 0) return;

    setProcessing(true);
    setCompleted(false);
    setWatermarkedFiles([]);

    const ext = sourceFile.name.toLowerCase().endsWith(".epub") ? "epub" : "pdf";

    try {
      if (buyers.length === 1) {
        const buyer = buyers[0];
        const code = generateWatermarkCode(0, buyer.orderId);
        const outputFilename = `${buyer.orderId}-${buyer.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-watermarked.${ext}`;

        const blob = await watermarkPdf({
          file: sourceFile,
          name: buyer.name,
          orderId: buyer.orderId,
        });

        downloadBlob(blob, outputFilename);

        setWatermarkedFiles([
          {
            buyer,
            code,
            filename: outputFilename,
            status: "ready",
            downloads: 1,
            maxDownloads: 3,
            expiresAt: new Date(
              Date.now() + 14 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
          },
        ]);
      } else {
        const zipBlob = await watermarkBatchZip({
          file: sourceFile,
          buyers: buyers.map((buyer) => ({
            name: buyer.name,
            orderId: buyer.orderId,
            email: buyer.email,
          })),
        });

        const zipFilename = `${sourceFile.name.replace(/\.[^.]+$/, "")}_watermarked_batch.zip`;
        downloadBlob(zipBlob, zipFilename);

        const generated = buyers.map((buyer, idx) => ({
          buyer,
          code: generateWatermarkCode(idx, buyer.orderId),
          filename: zipFilename,
          status: "ready" as const,
          downloads: 1,
          maxDownloads: 3,
          expiresAt: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        }));

        setWatermarkedFiles(generated);
      }

      setCompleted(true);
    } catch (error) {
      const failed = buyers.map((buyer, idx) => ({
        buyer,
        code: generateWatermarkCode(idx, buyer.orderId),
        filename: "",
        status: "error" as const,
        downloads: 0,
        maxDownloads: 3,
        expiresAt: "-",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error while processing batch",
      }));

      setWatermarkedFiles(failed);
      setCompleted(true);
    } finally {
      setProcessing(false);
    }
  };


  /*const investigateFile = () => {
    if (!investigatorFile) return;

    const fileName = investigatorFile.name.toLowerCase();
    const match = watermarkedFiles.find((f) =>
      fileName.includes(f.buyer.name.toLowerCase().replace(" ", ""))
    );

    if (match) {
      setInvestigatorResult({
        found: true,
        code: match.code,
        buyer: match.buyer,
        batch: "BATCH-001",
        issuedAt: new Date().toLocaleDateString(),
      });
    } else {
      setInvestigatorResult({
        found: false,
        message: "No watermark code found. File may not be from this system.",
      });
    }
  };
   */
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Header />

      <nav className="sticky top-0 z-10 backdrop-blur-sm bg-[#FAF7F2]/90 border-b border-[#EDE6D8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 flex-wrap">
            <TabButton
              active={activeTab === "upload"}
              onClick={() => setActiveTab("upload")}
              icon={Upload}
            >
              1. Upload
            </TabButton>

            <TabButton
              active={activeTab === "template"}
              onClick={() => setActiveTab("template")}
              icon={Settings}
            >
              2. Template
            </TabButton>

            <TabButton
              active={activeTab === "buyers"}
              onClick={() => setActiveTab("buyers")}
              icon={Users}
            >
              3. Buyers
            </TabButton>

            <TabButton
              active={activeTab === "process"}
              onClick={() => setActiveTab("process")}
              icon={Code}
            >
              4. Process
            </TabButton>
           {/*
           <TabButton
              active={activeTab === "investigator"}
              onClick={() => setActiveTab("investigator")}
              icon={Search}
            > 
              Investigator
            </TabButton>
            */}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
         <div className="rounded-[28px] border border-[#ECE3D3] bg-[#FCFAF6] p-4 md:p-6 shadow-[0_8px_30px_rgba(60,40,10,0.04)]">
        {activeTab === "upload" && (
          <UploadProjectSection
            key={uploadInputResetKey.current}
            projectName={projectName}
            setProjectName={setProjectName}
            sourceFile={sourceFile}
            handleFileUpload={handleFileUpload}
            resetBatch={resetBatch}
          />
        )}

        {activeTab === "template" && (
          <TemplateSelector template={template} setTemplate={setTemplate} />
        )}

        {activeTab === "buyers" && (
          <BuyersSection
            buyers={buyers}
            csvError={csvError}
            loadSampleBuyers={loadSampleBuyers}
            handleCsvUpload={handleCsvUpload}
            downloadSampleCsv={downloadSampleCsv}
            addManualBuyer={addManualBuyer}
            removeBuyer={removeBuyer}
          />
        )}

        {activeTab === "process" && (
          <ProcessSection
            buyers={buyers}
            template={template}
            watermarkedFiles={watermarkedFiles}
            completed={completed}
            processing={processing}
            processBatch={processBatch}
            sourceFile={sourceFile}
            resetProcessingState={resetProcessingState}
          />
        )}
        {/*
        {activeTab === "investigator" && (
          <InvestigatorSection
            investigatorFile={investigatorFile}
            setInvestigatorFile={setInvestigatorFile}
            investigateFile={investigateFile}
            investigatorResult={investigatorResult}
          />
        )}
          */}
        </div>
      </main>
    </div>
  );
}