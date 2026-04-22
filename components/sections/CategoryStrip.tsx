import { CATEGORY_STRIP_LINKS } from "@/lib/data";

export function CategoryStrip() {
  return (
    <div className="hidden lg:block border-b border-line-2 bg-cream relative z-40">
      <div className="max-w-[1760px] mx-auto px-6 md:px-10">
        <div className="flex gap-8 items-center py-3.5 text-[13px] text-ink-2 overflow-x-auto">
          {CATEGORY_STRIP_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-ink-2 no-underline whitespace-nowrap font-medium hover:text-ink transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
