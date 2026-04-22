const columns = [
  {
    t: "Shop",
    l: [
      "Anti Aging & Aesthetics",
      "Health Check & Body Insights",
      "Health Product & Supplements",
      "Mind & Mood Balance",
      "Pain Relief & Body Recovery",
      "Regen & Functional Care",
    ],
  },
  { t: "Platform", l: ["How It Works", "Vital AI", "For Providers", "Loyalty Rewards"] },
  { t: "Company", l: ["About", "Our Mission", "Careers", "Press", "Contact"] },
  { t: "Support", l: ["FAQ", "Dispute Resolution", "Privacy", "Terms of Service"] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-[60px] mb-14 pb-14 border-b border-cream/10">
          <div className="col-span-2 md:col-span-1">
            <img src="/logo-footer.png" alt="ReserveDaily" className="h-8 lg:h-9 w-auto mb-4" />
            <p className="text-[13px] leading-[1.7] text-cream/60 mb-6 max-w-[280px]">
              Malaysia&apos;s curated marketplace for wellness, aesthetics, and preventative care. Reserve your path
              to wellness.
            </p>
            <div className="text-[11px] text-cream/40 leading-[1.7]">
              ReserveWell Sdn. Bhd. (1618587-P)
              <br />
              B-18-06, Menara G Vestor Tower
              <br />
              200 Jalan Ampang, 50450 Kuala Lumpur
              <br />
              WhatsApp: +60 13-533 3353
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.t}>
              <div className="text-[11px] font-semibold tracking-[0.14em] mb-5 text-butter uppercase">{col.t}</div>
              <div className="flex flex-col gap-2.5">
                {col.l.map((x) => (
                  <a
                    key={x}
                    href="#"
                    className="text-[13px] text-cream/70 no-underline hover:text-cream transition-colors"
                  >
                    {x}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4 text-[11px] text-cream/40">
          <span>© 2026 ReserveWell Sdn. Bhd. All rights reserved.</span>
          <span className="ff">Reserve your path to wellness.</span>
        </div>
      </div>
    </footer>
  );
}
