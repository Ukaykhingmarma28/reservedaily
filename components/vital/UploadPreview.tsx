import type { FileUploadPayload } from "@/lib/vital/types";
import { FileText, Check } from "@/components/ui/icons";

export function UploadPreview({ payload }: { payload: FileUploadPayload }) {
  return (
    <div className="flex items-center gap-3 min-w-[180px]">
      <div className="relative w-10 h-10 rounded-[8px] bg-cream/15 border border-cream/20 flex items-center justify-center shrink-0 overflow-hidden">
        <FileText size={18} className="text-cream/70" />
        {payload.status === "parsing" && (
          <div
            className="absolute left-0 w-full h-[2px] bg-butter shadow-[0_0_6px_var(--color-butter)]"
            style={{ animation: "rd-parse-scan 1.5s ease-in-out infinite" }}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-cream truncate leading-tight">{payload.fileName}</p>
        <p className="text-[11px] text-cream/55 mt-0.5">{payload.fileSize}</p>
      </div>
      <div className="shrink-0">
        {payload.status === "uploading" && (
          <div className="text-right">
            <span className="text-[11px] font-semibold text-cream/80 block mb-1">{payload.progress}%</span>
            <div className="w-12 h-[3px] rounded-full bg-cream/20 overflow-hidden">
              <div
                className="h-full bg-cream rounded-full transition-[width] duration-200"
                style={{ width: `${payload.progress}%` }}
              />
            </div>
          </div>
        )}
        {payload.status === "parsing" && (
          <span className="text-[11px] font-semibold text-butter">Analysing...</span>
        )}
        {payload.status === "complete" && (
          <span className="w-5 h-5 rounded-full bg-cream/20 flex items-center justify-center">
            <Check size={11} className="text-cream" />
          </span>
        )}
        {payload.status === "error" && (
          <span className="text-[11px] font-semibold text-rust">Failed</span>
        )}
      </div>
    </div>
  );
}
