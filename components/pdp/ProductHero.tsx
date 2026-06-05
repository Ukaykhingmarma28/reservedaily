"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Star, Check, Plus, Sparkle } from "@/components/ui/icons";
import { CellArt } from "@/components/illustrations/CellArt";
import { LeafArt } from "@/components/illustrations/LeafArt";
import { BottleArt } from "@/components/illustrations/BottleArt";
import type { Product } from "@/lib/data";
import type { PackageOption, ProductSpec } from "@/lib/pdp-mock";
import { Breadcrumbs } from "@/components/pdp/Breadcrumbs";

type GallerySlide = { id: string; label: string; mode: "image" | "art" | "art-soft" };

function ProductArt({
  product,
  bg,
  className,
}: {
  product: Product;
  bg: string;
  className?: string;
}) {
  const props = { color: product.color, bg, className };
  if (product.art === "cell") return <CellArt {...props} />;
  if (product.art === "leaf") return <LeafArt {...props} />;
  return <BottleArt {...props} />;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-px" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? "text-rust" : "text-line"}
        />
      ))}
    </div>
  );
}

/** Nav is h-[68px]; breadcrumb bar ~44px → side panels sit below both when stuck. */
const NAV_OFFSET = "top-[68px]";
const STICKY_BELOW_NAV =
  "sticky z-30 -mx-6 px-6 md:-mx-10 md:px-10 bg-cream/95 backdrop-blur-sm border-b border-line-2";
const STICKY_PANEL = `lg:sticky lg:top-[calc(68px+2.75rem)] lg:max-h-[calc(100dvh-68px-2.75rem)] lg:overflow-y-auto`;

export function ProductPdpShell({
  product: p,
  description,
  aiSummary,
  specs,
  certifications,
  categoryRanks,
  soldLast30Days,
  packageOptions,
  avgRating,
  similarHighlight,
  comboProducts,
}: {
  product: Product;
  description: string;
  aiSummary: string;
  specs: ProductSpec[];
  certifications: string[];
  categoryRanks: string[];
  soldLast30Days: string;
  packageOptions: PackageOption[];
  avgRating: number;
  similarHighlight?: Product;
  comboProducts?: Product[];
}) {
  const [vIdx, setVIdx] = useState(0);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchaseMode, setPurchaseMode] = useState<"once" | "subscribe">("once");

  const isBookable = p.type === "bookable";
  const opt = packageOptions[vIdx] ?? packageOptions[0];
  const displayPrice = opt?.price ?? p.price ?? "";
  const displayWas = opt?.was ?? p.was;

  const gallery: GallerySlide[] = useMemo(() => {
    const slides: GallerySlide[] = [];
    if (p.image) slides.push({ id: "product", label: "Product", mode: "image" });
    slides.push({ id: "front", label: "Front", mode: "art" });
    slides.push({ id: "detail", label: "Detail", mode: "art-soft" });
    if (p.image) slides.push({ id: "packaging", label: "Packaging", mode: "image" });
    return slides;
  }, [p.image]);

  const activeSlide = gallery[thumbIdx] ?? gallery[0];
  const subscribePrice = displayPrice.replace(/\d+/, (m) =>
    String(Math.max(1, Math.round(Number(m) * 0.95))),
  );
  const checkoutPrice = purchaseMode === "subscribe" ? subscribePrice : displayPrice;
  const combo = comboProducts?.filter(Boolean).slice(0, 2) ?? [];

  return (
    <section className="pb-24 lg:pb-16 border-b border-line-2">
      <div className={`${STICKY_BELOW_NAV} ${NAV_OFFSET} mb-4 lg:mb-6`}>
        <Breadcrumbs
          category={p.category ?? "Products"}
          productName={p.name}
          className="py-0"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-stretch">
        <div className="lg:col-span-4">
          <div className={STICKY_PANEL}>
          <div className="relative aspect-square bg-paper border border-line-2 overflow-hidden mb-3">
            <div className="absolute inset-0 opacity-[0.06]">
              <ProductArt product={p} bg="var(--color-paper)" />
            </div>
            {activeSlide?.mode === "image" && p.image ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-10">
                <div className="relative w-full h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div
                className={`absolute inset-0 ${activeSlide?.mode === "art-soft" ? "opacity-70" : ""}`}
              >
                <ProductArt product={p} bg="var(--color-paper)" />
              </div>
            )}
            <span className="absolute top-3 left-3 bg-rust text-cream text-[9px] lg:text-[10px] px-2.5 py-1 tracking-[0.12em] uppercase font-semibold">
              {p.tag}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((slide, i) => {
              const active = i === thumbIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setThumbIdx(i)}
                  className={`relative shrink-0 w-[72px] h-[72px] border-2 overflow-hidden cursor-pointer transition-colors ${
                    active ? "border-berry" : "border-line-2 hover:border-ink"
                  }`}
                  aria-label={`View ${slide.label}`}
                  aria-current={active}
                >
                  {slide.mode === "image" && p.image ? (
                    <Image src={p.image} alt="" fill className="object-contain p-1.5 bg-paper" sizes="72px" />
                  ) : (
                    <div className="absolute inset-0 bg-paper">
                      <ProductArt product={p} bg="var(--color-paper)" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 bg-sage/50 border border-line-2 px-3 py-2.5 text-[11px]">
            <span className="text-berry font-semibold tracking-[0.06em] uppercase shrink-0">New here?</span>
            <span className="text-ink-2">Get 15% off your first order with code WELCOME15</span>
          </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex gap-1.5 shrink-0 pt-1">
              <button
                type="button"
                aria-label="Add to wishlist"
                className="w-8 h-8 border border-line flex items-center justify-center text-ink hover:text-rust hover:border-rust transition-colors cursor-pointer"
              >
                <Heart size={14} />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              {(p.tag.toLowerCase().includes("featured") || p.tag.includes("%")) && (
                <span
                  className={`inline-block text-[10px] px-2 py-0.5 tracking-[0.1em] uppercase font-semibold mb-2 ${
                    p.tag.includes("%") ? "bg-rust text-cream" : "bg-butter/30 text-moss"
                  }`}
                >
                  {p.tag.includes("%") ? p.tag : "Best seller"}
                </span>
              )}
              <h1 className="ff text-[clamp(20px,3.5vw,28px)] font-medium text-ink tracking-[-0.02em] leading-snug">
                {p.name}
              </h1>
              <p className="mt-1.5 text-sm">
                <span className="text-muted">by </span>
                <span className="text-moss font-medium">{p.provider}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
            <StarRating rating={avgRating} />
            <Link href="#reviews" className="text-sm text-moss hover:underline">
              {avgRating}
            </Link>
            <span className="text-sm text-muted">({p.reviews.toLocaleString()} reviews)</span>
            <span className="hidden sm:inline text-line">|</span>
            <span className="text-sm font-medium text-berry">In stock</span>
            <span className="text-xs text-muted w-full sm:w-auto">{soldLast30Days}</span>
          </div>

          {packageOptions.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] text-muted tracking-[0.12em] uppercase font-semibold mb-2.5">
                {p.variationLabel ?? (isBookable ? "Session package" : "Package quantity")}
              </p>
              <div className="flex flex-wrap gap-2">
                {packageOptions.map((option, j) => {
                  const active = j === vIdx;
                  return (
                    <button
                      key={`${option.label}-${j}`}
                      type="button"
                      onClick={() => setVIdx(j)}
                      className={`min-w-[120px] text-left px-3.5 py-2.5 border-2 cursor-pointer transition-colors ${
                        active ? "border-berry bg-berry/5" : "border-line-2 bg-cream hover:border-ink"
                      }`}
                    >
                      <span className="block text-[13px] font-medium text-ink">{option.label}</span>
                      <span className="block text-[11px] text-muted mt-0.5">{option.meta}</span>
                      <span className="block text-[12px] font-medium text-ink mt-1">{option.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-5 rounded-sm border border-line-2 bg-sage/40 px-4 py-3.5">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Sparkle size={14} className="text-moss shrink-0" />
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-moss">
                Vital overview
              </span>
              <span className="text-[10px] text-muted">· AI-generated summary</span>
            </div>
            <p className="text-[13px] text-ink-2 leading-relaxed">{aiSummary}</p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 pb-5 border-b border-line-2">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] text-muted tracking-[0.08em] uppercase mb-0.5">{s.label}</dt>
                <dd className="text-[13px] text-ink font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mb-5">
            <p className="text-[11px] text-muted tracking-[0.12em] uppercase font-semibold mb-2">
              Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 text-[11px] text-ink border border-line-2 bg-cream px-2.5 py-1"
                >
                  <Check size={10} className="text-berry shrink-0" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {categoryRanks.length > 0 && (
            <div className="mb-5 space-y-1">
              {categoryRanks.map((rank) => (
                <p key={rank} className="text-[13px] text-moss">
                  {rank}
                </p>
              ))}
            </div>
          )}

          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 line-clamp-3">{description}</p>

          {similarHighlight && (
            <div className="border border-line-2 bg-paper p-3 flex gap-3 items-center">
              <div className="relative w-16 h-16 shrink-0 bg-cream border border-line-2 overflow-hidden">
                {similarHighlight.image ? (
                  <Image
                    src={similarHighlight.image}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                ) : (
                  <ProductArt product={similarHighlight} bg="var(--color-cream)" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-muted tracking-[0.1em] uppercase mb-0.5">
                  Discover a similar item
                </p>
                <Link
                  href={`/products/${similarHighlight.id}`}
                  className="text-[13px] text-ink font-medium hover:text-moss line-clamp-2 no-underline block"
                >
                  {similarHighlight.name}
                </Link>
                <p className="text-[12px] text-ink mt-0.5">{similarHighlight.price}</p>
              </div>
              <Link
                href={`/products/${similarHighlight.id}`}
                className="shrink-0 px-3 py-2 text-[10px] font-semibold tracking-[0.08em] uppercase border border-ink text-ink no-underline hover:bg-ink hover:text-cream transition-colors"
              >
                View
              </Link>
            </div>
          )}

        </div>

        <div className="hidden lg:block lg:col-span-3">
        <aside className={`${STICKY_PANEL} space-y-4`}>
          <div className="border border-line-2 bg-cream shadow-[0_4px_24px_rgba(26,38,89,0.06)] p-4 lg:p-5">
            {!isBookable && (
              <label
                className={`flex gap-3 p-3 border-2 mb-3 cursor-pointer transition-colors ${
                  purchaseMode === "subscribe"
                    ? "border-berry bg-berry/5"
                    : "border-line-2 hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="purchase-mode"
                  checked={purchaseMode === "subscribe"}
                  onChange={() => setPurchaseMode("subscribe")}
                  className="mt-1 accent-berry"
                />
                <div>
                  <p className="text-[12px] font-semibold text-ink">Subscribe &amp; save</p>
                  <p className="text-lg font-medium text-ink mt-0.5">{subscribePrice}</p>
                  <ul className="mt-2 space-y-1 text-[11px] text-ink-2">
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-berry" /> 5% off every order
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-berry" /> Free recurring delivery
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-berry" /> Skip or cancel anytime
                    </li>
                  </ul>
                </div>
              </label>
            )}

            <label
              className={`flex gap-3 p-3 border-2 mb-4 cursor-pointer transition-colors ${
                purchaseMode === "once" || isBookable
                  ? "border-berry bg-berry/5"
                  : "border-line-2 hover:border-ink"
              }`}
            >
              <input
                type="radio"
                name="purchase-mode"
                checked={purchaseMode === "once" || isBookable}
                onChange={() => setPurchaseMode("once")}
                className="mt-1 accent-berry"
              />
              <div>
                <p className="text-[12px] font-semibold text-ink">
                  {isBookable ? "Single booking" : "One-off purchase"}
                </p>
                <p className="text-[22px] ff font-medium text-ink tracking-[-0.02em] mt-0.5">
                  {checkoutPrice}
                  {displayWas && (
                    <span className="text-sm text-muted line-through ml-2 font-sans">{displayWas}</span>
                  )}
                </p>
                <p className="text-[11px] text-berry mt-1 font-medium">
                  {isBookable ? "Consultation included · flexible rescheduling" : "Free delivery · MY"}
                </p>
              </div>
            </label>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] text-muted tracking-[0.1em] uppercase font-semibold shrink-0">
                Qty
              </span>
              <div className="flex items-center border border-line-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:bg-paper cursor-pointer"
                >
                  <span className="text-lg leading-none">−</span>
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((n) => n + 1)}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:bg-paper cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3.5 mb-3 text-[12px] font-semibold tracking-[0.1em] uppercase cursor-pointer flex items-center justify-center gap-2 bg-rust text-cream border border-rust hover:bg-moss hover:border-moss transition-colors"
            >
              {isBookable ? "Reserve now" : "Add to basket"}
              <ArrowRight />
            </button>

            <button
              type="button"
              className="w-full py-3 border border-ink text-ink text-[11px] font-semibold tracking-[0.1em] uppercase cursor-pointer flex items-center justify-center gap-2 bg-transparent hover:bg-ink hover:text-cream transition-colors"
            >
              <Heart size={13} />
              Add to lists
            </button>
          </div>

          <div className="border border-line-2 bg-sage/30 px-4 py-3 flex gap-2.5">
            <Check size={16} className="text-berry shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-semibold text-ink">ReserveDaily quality promise</p>
              <p className="text-[11px] text-ink-2 mt-0.5 leading-relaxed">
                Physician-vetted products and clinic partners. Third-party tested where applicable.
              </p>
            </div>
          </div>

          {combo.length >= 2 && (
            <div className="border border-line-2 bg-paper p-4">
              <p className="text-[11px] font-semibold text-rust tracking-[0.08em] uppercase mb-3">
                Combo offer · Save 15%
              </p>
              <div className="flex items-center gap-2 mb-3">
                {combo.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-2 flex-1 min-w-0">
                    {i > 0 && <Plus size={12} className="text-muted shrink-0" />}
                    <div className="relative w-14 h-14 shrink-0 bg-cream border border-line-2 overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt="" fill className="object-contain p-1" sizes="56px" />
                      ) : (
                        <ProductArt product={item} bg="var(--color-cream)" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-ink-2 line-clamp-2 mb-2">
                {combo[0].name} + {combo[1].name}
              </p>
              <button
                type="button"
                className="w-full py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase cursor-pointer bg-rust text-cream border border-rust hover:bg-moss transition-colors"
              >
                Add both to basket
              </button>
            </div>
          )}
        </aside>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-line-2 bg-cream/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0 flex-1">
          <p className="text-lg ff font-medium text-ink truncate">{checkoutPrice}</p>
          <p className="text-[10px] text-berry font-medium">{isBookable ? "Reserve" : "Free delivery"}</p>
        </div>
        <button
          type="button"
          className="shrink-0 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase bg-rust text-cream border border-rust"
        >
          {isBookable ? "Reserve" : "Add to basket"}
        </button>
      </div>
    </section>
  );
}

/** @deprecated Use ProductPdpShell */
export const ProductHero = ProductPdpShell;
