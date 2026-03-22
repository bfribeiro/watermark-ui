import { Palette } from "lucide-react";
import Card from "../ui/Card";
import type { TemplateKey } from "../../types/watermark";
import { templates } from "../../constants/watermark";

type TemplateSelectorProps = {
  template: TemplateKey;
  setTemplate: (value: TemplateKey) => void;
};

export default function TemplateSelector({
  template,
  setTemplate,
}: TemplateSelectorProps) {
  return (
    <Card title="Edition Style">
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9A7B3E] mb-3">
            <Palette className="w-4 h-4" />
            Watermark Profile
          </div>

          <h3 className="text-2xl font-serif text-[#1C1C1C]">
            Choose how visible the protection should feel
          </h3>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            Each style adjusts opacity, frequency, and footer visibility to
            balance readability with traceability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(templates).map(([key, t]) => {
            const isActive = template === key;

            return (
              <button
                key={key}
                onClick={() => setTemplate(key as TemplateKey)}
                className={`rounded-2xl border p-5 text-left transition-all bg-white ${
                  isActive
                    ? "border-[#C89B3C] shadow-[0_2px_10px_rgba(200,155,60,0.10)]"
                    : "border-[#E7DDCB] hover:border-[#D4C4A2]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-serif text-[#1C1C1C]">
                    {t.name}
                  </div>
                  {isActive && (
                    <span className="text-xs font-semibold text-[#9A7B3E] bg-[#F8F1E2] px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-[#6B6B6B]">
                  <div>Opacity: {(t.opacity * 100).toFixed(0)}%</div>
                  <div>Coverage: {t.frequency}%</div>
                  <div>Footer size: {t.footerSize}pt</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[#E7DDCB] bg-[#FFFDFC] p-6">
          <div className="text-sm font-semibold text-[#1C1C1C] mb-3">
            Reading preview
          </div>

          <div className="relative overflow-hidden rounded-xl border border-[#EFE7D8] bg-[#FCFAF6] p-6">
            <div
              className="absolute top-8 right-6 rotate-[-20deg] font-mono text-xs text-[#9A7B3E]"
              style={{ opacity: templates[template].opacity * 2 }}
            >
              SAMPLE-WATERMARK
            </div>

            <div className="space-y-4 text-[#3F3A34]">
              <div className="text-xl font-serif">Chapter One</div>
              <p className="text-sm leading-7">
                The watermark rests quietly inside the reading experience,
                surfacing only as a subtle signature of ownership and origin.
              </p>
              <p className="text-sm leading-7">
                Each generated copy carries a distinct buyer mapping, making it
                possible to identify unauthorized redistribution later.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE7D8] text-center">
              <div
                className="font-mono text-[#6F6659]"
                style={{
                  opacity: templates[template].opacity * 3,
                  fontSize: templates[template].footerSize,
                }}
              >
                Code: SAMPLE-CODE-12AB
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}