import { ArrowRight, Bolt, Brain, Dna, Droplet, Heart, Leaf } from "@/components/ui/icons";
import { CellArt } from "@/components/illustrations/CellArt";
import { LeafArt } from "@/components/illustrations/LeafArt";

type Cat = {
  name: string;
  count: number;
  price: string;
  Icon: React.ComponentType<{ size?: number }>;
  bg: string;
  acc: string;
  art: "cell" | "leaf";
};

const cats: Cat[] = [
  { name: "Regen & Functional Care", count: 38, price: "from RM 2,000", Icon: Dna, bg: "#dfe7ec", acc: "var(--color-moss)", art: "cell" },
  { name: "Anti Aging & Aesthetics", count: 52, price: "from RM 1,200", Icon: Leaf, bg: "#eceff3", acc: "var(--color-rust)", art: "leaf" },
  { name: "Health Check & Body Insights", count: 24, price: "from RM 200", Icon: Droplet, bg: "#d4dde3", acc: "var(--color-moss)", art: "cell" },
  { name: "Pain Relief & Body Recovery", count: 31, price: "from RM 300", Icon: Heart, bg: "#e3e8eb", acc: "var(--color-berry)", art: "leaf" },
  { name: "Health Product & Supplements", count: 29, price: "from RM 49", Icon: Bolt, bg: "#d6dee3", acc: "var(--color-moss)", art: "cell" },
  { name: "Mind & Mood Balance", count: 20, price: "from RM 150", Icon: Brain, bg: "#c8d3db", acc: "var(--color-moss)", art: "leaf" },
];

export function ShopByCategory() {
  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 border-b border-line-2 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-8 lg:mb-12 gap-4 lg:gap-10">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-moss tracking-[0.16em] uppercase font-semibold mb-3.5">
             , Shop by category
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(38px,3.8vw,54px)] font-normal text-ink tracking-[-0.02em] leading-[1.05] m-0"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Six pathways, <span className="ff">one you.</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-[13px] text-ink font-semibold no-underline border-b border-ink pb-0.5 flex items-center gap-1.5 whitespace-nowrap self-start lg:self-auto"
          >
            BROWSE ALL SERVICES <ArrowRight />
          </a>
        </div>

        {/* Mobile: icon grid */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 lg:hidden">
          {cats.map((c) => {
            const Icon = c.Icon;
            return (
              <a key={c.name} href="#" className="flex flex-col items-center gap-2.5 no-underline text-inherit">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: c.bg }}
                >
                  <span style={{ color: c.acc }}>
                    <Icon size={24} />
                  </span>
                </div>
                <span className="text-[12px] font-medium text-ink text-center leading-tight">{c.name}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop: card grid */}
        <div className="hidden lg:grid grid-cols-3 gap-px bg-line">
          {cats.map((c, i) => {
            const ArtComp = c.art === "cell" ? CellArt : LeafArt;
            const Icon = c.Icon;
            return (
              <a
                key={c.name}
                href="#"
                className="p-7 no-underline text-inherit flex flex-col relative transition-colors cursor-pointer hover:bg-cream group"
                style={{ background: c.bg }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span style={{ color: c.acc }}>
                    <Icon size={22} />
                  </span>
                  <span className="text-[11px] text-muted tracking-[0.08em]">
                    {String(i + 1).padStart(2, "0")} / 06
                  </span>
                </div>
                <div className="h-[150px] -mx-7 mb-[18px] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <ArtComp color={c.acc} bg="transparent" />
                  </div>
                </div>
                <div>
                  <h3 className="ff text-[22px] font-medium text-ink tracking-[-0.015em] mb-2 leading-tight">
                    {c.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-xs text-ink-2">
                      {c.count} services · {c.price}
                    </span>
                    <span style={{ color: c.acc }}>
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
