import { Upload, CheckCircle2, RefreshCcw, BookOpen } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

type UploadProjectSectionProps = {
  projectName: string;
  setProjectName: (value: string) => void;
  sourceFile: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetBatch: () => void;
};

export default function UploadProjectSection({
  projectName,
  setProjectName,
  sourceFile,
  handleFileUpload,
  resetBatch,
}: UploadProjectSectionProps) {
  return (
    <div className="space-y-6">
      <Card title="Library Intake">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9A7B3E] mb-3">
                <BookOpen className="w-4 h-4" />
                Source Edition
              </div>

              <h3 className="text-2xl font-serif text-[#1C1C1C]">
                Upload the master ebook
              </h3>

              <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
                Start with the original file that will receive individualized
                watermarking. PDF and EPUB are both supported.
              </p>
            </div>

            <Button variant="secondary" onClick={resetBatch}>
              <RefreshCcw className="w-4 h-4" />
              Start New Batch
            </Button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Spring Release 2026"
              className="w-full px-4 py-3 border border-[#E0D6C2] rounded-lg bg-[#FFFDFC] text-[#1C1C1C] placeholder:text-[#9A948A] focus:outline-none focus:border-[#C89B3C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
              Master File
            </label>

            <div className="border border-dashed border-[#D8CCB6] rounded-2xl p-10 text-center bg-[#FFFDFC] hover:border-[#C89B3C] transition-colors">
              <input
                type="file"
                accept=".pdf,.epub,application/pdf,application/epub+zip"
                onChange={handleFileUpload}
                className="hidden"
                id="source-upload"
              />

              <label htmlFor="source-upload" className="cursor-pointer block">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7 text-[#9A7B3E]" />
                </div>

                {sourceFile ? (
                  <>
                    <div className="text-[#1C1C1C] font-semibold text-base">
                      {sourceFile.name}
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
                      The master edition will be used to create protected copies
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          {sourceFile && (
            <div className="bg-[#F2F7F1] border border-[#D8E9D7] rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3A7A52] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#3A7A52]">
                  Master file loaded successfully
                </div>
                <div className="text-sm text-[#5E6A5D] mt-1">
                  You can now configure the watermark style and assign buyers.
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}