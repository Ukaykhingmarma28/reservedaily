import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "@/components/ui/icons";
import type { ProductInformation as ProductInformationData } from "@/lib/pdp-mock";

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[15px] lg:text-base font-semibold text-ink mb-3">{children}</h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mb-4">
      {items.map((item) => (
        <li key={item} className="text-[13px] lg:text-sm text-ink-2 leading-relaxed flex gap-2">
          <span className="text-ink mt-0.5 shrink-0">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProductInformation({ info }: { info: ProductInformationData }) {
  const factsTitle = info.treatmentFacts ? "Treatment information" : "Supplement information";

  return (
    <section className="py-10 lg:py-16 border-t border-line-2">
      <div className="border border-line-2 bg-cream">
        <h2 className="px-5 lg:px-6 py-4 border-b border-line-2 text-[17px] lg:text-lg font-semibold text-ink">
          Product information
        </h2>

        <div className="p-5 lg:p-8 space-y-8 lg:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <SectionHeading>Overview</SectionHeading>
              <BulletList items={info.overviewBullets} />
              <p className="text-[13px] lg:text-sm text-ink-2 leading-relaxed">{info.overviewText}</p>
            </div>

            {info.supplementFacts && (
              <div className="border border-line-2 bg-paper p-4 lg:p-5 h-fit">
                <SectionHeading>{factsTitle}</SectionHeading>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-ink-2 mb-4 pb-3 border-b border-line-2">
                  <p>
                    <span className="font-semibold text-ink">Serving size: </span>
                    {info.supplementFacts.servingSize}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Servings per container: </span>
                    {info.supplementFacts.servingsPerContainer}
                  </p>
                </div>
                <table className="w-full text-[12px] lg:text-[13px]">
                  <thead>
                    <tr className="border-b border-line-2 text-left text-ink">
                      <th className="pb-2 pr-2 font-semibold w-[50%]"> </th>
                      <th className="pb-2 px-2 font-semibold text-right whitespace-nowrap">
                        Amount per serving
                      </th>
                      <th className="pb-2 pl-2 font-semibold text-right whitespace-nowrap">
                        Reference intake %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.supplementFacts.rows.map((row) => (
                      <tr key={row.nutrient} className="border-b border-line-2/80 text-ink-2">
                        <td className="py-2 pr-2 align-top">{row.nutrient}</td>
                        <td className="py-2 px-2 text-right align-top whitespace-nowrap">{row.amount}</td>
                        <td className="py-2 pl-2 text-right align-top whitespace-nowrap">{row.dailyValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {info.treatmentFacts && (
              <div className="border border-line-2 bg-paper p-4 lg:p-5 h-fit">
                <SectionHeading>{factsTitle}</SectionHeading>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-ink-2 mb-4 pb-3 border-b border-line-2">
                  <p>
                    <span className="font-semibold text-ink">Type: </span>
                    {info.treatmentFacts.sessionType}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Duration: </span>
                    {info.treatmentFacts.duration}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Consultation: </span>
                    {info.treatmentFacts.consultation}
                  </p>
                </div>
                <dl className="space-y-2">
                  {info.treatmentFacts.rows.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 text-[13px]">
                      <dt className="text-ink-2">{row.label}</dt>
                      <dd className="text-ink font-medium text-right">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <div>
            <SectionHeading>Specifications</SectionHeading>
            <ul className="space-y-2">
              {info.specifications.map((spec) => (
                <li
                  key={spec.text}
                  className="text-[13px] lg:text-sm text-ink-2 leading-relaxed flex items-start gap-2"
                >
                  {spec.checked ? (
                    <Check size={14} className="text-berry shrink-0 mt-0.5" />
                  ) : (
                    <span className="text-muted mt-0.5 shrink-0">·</span>
                  )}
                  {spec.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading>Suggested use</SectionHeading>
            <p className="text-[13px] lg:text-sm text-ink-2 leading-relaxed">{info.suggestedUse}</p>
          </div>

          <div>
            <SectionHeading>{info.treatmentFacts ? "Clinic & protocol" : "Other ingredients"}</SectionHeading>
            <p className="text-[13px] lg:text-sm text-ink-2 leading-relaxed">{info.otherIngredients}</p>
          </div>

          <div>
            <SectionHeading>Warnings</SectionHeading>
            <ul className="space-y-2">
              {info.warnings.map((w) => (
                <li key={w} className="text-[13px] lg:text-sm text-ink-2 leading-relaxed">
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-line-2">
            <SectionHeading>Disclaimer</SectionHeading>
            <p className="text-[12px] lg:text-[13px] text-muted leading-relaxed">{info.disclaimer}</p>
            <Link
              href={info.manufacturerUrl}
              className="inline-block mt-4 text-[13px] text-moss font-medium hover:underline"
            >
              Visit manufacturer&apos;s site
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
