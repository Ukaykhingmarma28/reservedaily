"use client";

import { useState } from "react";
import Image from "next/image";
import { Cart, Heart, Menu, Search } from "@/components/ui/icons";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const cartCount = 0;
  const cartTotal = "RM 0.00";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-cream border-b border-line-2 sticky top-0 z-50">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 h-[68px] flex lg:hidden items-center gap-3">
        <Image
          src="/logo.png"
          alt="Reserve Daily"
          width={144}
          height={36}
          className="h-8 w-auto block shrink-0"
          priority
        />
        <div className="flex items-center bg-paper border border-line rounded-[2px] px-3 py-2 gap-2 flex-1 min-w-0">
          <span className="text-muted shrink-0">
            <Search />
          </span>
          <input
            placeholder="Search"
            className="flex-1 min-w-0 border-none bg-transparent outline-none text-sm text-ink placeholder:text-muted"
          />
        </div>
        <a
          href="#"
          aria-label={`Cart, ${cartCount} items`}
          className="relative inline-flex items-center justify-center w-10 h-10 border border-line rounded-[2px] bg-cream text-ink shrink-0"
        >
          <Cart size={16} />
          <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 bg-moss text-cream text-[9px] font-bold rounded-full inline-flex items-center justify-center leading-none border-[1.5px] border-cream">
            {cartCount}
          </span>
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="inline-flex items-center justify-center w-10 h-10 border border-line rounded-[2px] bg-cream text-ink shrink-0"
        >
          <Menu />
        </button>
      </div>

      <div className="max-w-[1760px] mx-auto px-6 md:px-10 h-[68px] hidden lg:grid grid-cols-[auto_auto_1fr_auto] items-center gap-6">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Reserve Daily" width={144} height={36} className="h-9 w-auto block" priority />
        </div>

        <CategoriesDropdown />

        <div className="flex items-center bg-paper border border-line rounded-[2px] px-4 py-2.5 gap-2.5 max-w-[820px] mx-auto w-full">
          <span className="text-muted">
            <Search />
          </span>
          <input
            placeholder="Search treatments, providers, or supplements..."
            className="flex-1 border-none bg-transparent outline-none text-sm text-ink placeholder:text-muted"
          />
          <kbd className="text-[10px] text-muted border border-line px-1.5 py-0.5 rounded-[2px] tracking-[0.04em] font-sans">
            ⌘K
          </kbd>
        </div>

        <div className="flex gap-[18px] items-center">
          <a
            href="#vital"
            className="inline-flex items-center gap-2 no-underline bg-ink text-cream px-3.5 py-2 text-xs font-semibold tracking-[0.04em] rounded-[2px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-butter" />
            Vital AI
          </a>
          <a
            href="#"
            aria-label="Wishlist"
            className="text-ink text-[13px] inline-flex items-center gap-1.5 no-underline font-medium relative"
          >
            <span className="relative inline-flex items-center justify-center w-5 h-5">
              <Heart size={16} />
              <span className="absolute -top-1.5 -right-[7px] min-w-[15px] h-[15px] px-1 bg-rust text-cream text-[9px] font-bold rounded-full inline-flex items-center justify-center leading-none border-[1.5px] border-cream">
                0
              </span>
            </span>
            <span>Wishlist</span>
          </a>
          <div className="w-px h-5 bg-line" />
          <a
            href="#"
            className="text-ink text-[13px] inline-flex items-center gap-2.5 no-underline font-medium px-2.5 py-1.5 border border-line rounded-[2px] bg-cream"
          >
            <span className="relative inline-flex items-center justify-center w-5 h-5">
              <Cart />
              <span className="absolute -top-1.5 -right-[7px] min-w-[15px] h-[15px] px-1 bg-moss text-cream text-[9px] font-bold rounded-full inline-flex items-center justify-center leading-none border-[1.5px] border-cream">
                {cartCount}
              </span>
            </span>
            <span className="text-[13px] font-medium text-ink">Cart</span>
            <span className="w-px h-3 bg-line" />
            <span className="ff text-ink font-medium text-sm tracking-[-0.01em]">{cartTotal}</span>
          </a>
          <button className="bg-ink text-cream border-none px-[18px] py-2.5 text-xs font-semibold cursor-pointer tracking-[0.03em] rounded-[2px]">
            SIGN IN
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}
