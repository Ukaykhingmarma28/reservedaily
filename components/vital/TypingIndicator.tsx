import Image from "next/image";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 animate-[rd-fade-up_0.25s_ease-out]">
      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 overflow-hidden">
        <Image src="/vital-logo.svg" alt="VitalNow AI" width={30} height={30} className="w-full h-full object-contain" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-[4px_16px_16px_16px] bg-paper border border-line-2 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full bg-moss/40 block"
            style={{ animation: `rd-typing-dot 1.2s ease-in-out ${i * 0.18}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
