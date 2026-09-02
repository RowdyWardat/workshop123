import { SmartLink } from "../core/SmartLink";
import React, { useState, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, MoveRight, X, ChevronDown } from "lucide-react";
import { cn } from "../core/utils";
import type { RegistryLink } from "../core/link";
import { linkHref, linkLabel } from "../core/link";

import { tokens } from "../../tokens";
// --- Types ---
export interface MegaMenuSubItem extends RegistryLink {}

export interface MegaMenuItem extends RegistryLink {
  description?: string;
  items?: MegaMenuSubItem[];
}

export interface MegaMenuHeaderProps {
  brandName?: string;
  logo?: React.ReactNode;
  menuItems?: MegaMenuItem[];
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  ctaTertiaryText?: string;
  onCtaPrimaryClick?: () => void;
  onCtaSecondaryClick?: () => void;
  onCtaTertiaryClick?: () => void;
  className?: string;
}

// --- Default Data ---
const DEFAULT_MENU_ITEMS: MegaMenuItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Product",
    description:
      "Managing a small business today is already tough. We make it easy.",
    items: [
      { title: "Reports", href: "#" },
      { title: "Statistics", href: "#" },
      { title: "Dashboards", href: "#" },
      { title: "Recordings", href: "#" },
    ],
  },
  {
    title: "Company",
    description: "Learn more about our mission, our team, and our investors.",
    items: [
      { title: "About us", href: "#" },
      { title: "Fundraising", href: "#" },
      { title: "Investors", href: "#" },
      { title: "Contact us", href: "#" },
    ],
  },
];

// --- Subcomponent: Desktop Dropdown ---
const DesktopDropdown = ({ item }: { item: MegaMenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // slight delay to make moving to the dropdown easier
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 gap-1 group hover:opacity-70" style={{ color: tokens.color.text }}>
        {linkLabel(item)}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="w-[450px] p-4 border rounded-xl shadow-xl" style={{ backgroundColor: tokens.color.background, borderColor: tokens.color.border }}>
              <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                <div className="flex flex-col h-full justify-between p-4 rounded-lg" style={{ backgroundColor: tokens.color.background }}>
                  <div className="flex flex-col">
                    <p className="text-base font-medium mb-2" style={{ color: tokens.color.text }}>
                      {linkLabel(item)}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: tokens.color.mutedForeground }}>
                      {item.description}
                    </p>
                  </div>
                  <button className="mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none h-9 px-4 py-2 w-max hover:opacity-70" style={{ backgroundColor: tokens.color.background, color: tokens.color.mutedForeground }}>
                    Book a call today
                  </button>
                </div>
                <div className="flex flex-col text-sm h-full justify-center gap-1">
                  {item.items?.map((subItem) => (
                    <SmartLink
                      href={linkHref(subItem)}
                      key={linkLabel(subItem)}
                      className="flex flex-row justify-between items-center py-2 px-3 rounded-md transition-colors hover:opacity-70" style={{ color: tokens.color.text }}
                    >
                      <span className="font-medium">{linkLabel(subItem)}</span>
                      <MoveRight className="w-4 h-4 opacity-50" />
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
export function MegaMenuHeader({
  brandName = "",
  logo,
  menuItems = DEFAULT_MENU_ITEMS,
  ctaPrimaryText = "Get started",
  ctaSecondaryText = "Sign in",
  ctaTertiaryText = "Book a demo",
  onCtaPrimaryClick,
  onCtaSecondaryClick,
  onCtaTertiaryClick,
  className,
}: MegaMenuHeaderProps) {
  const [isOpen, setOpen] = useState(false);

  // Common button classes
  const btnBase =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const btnGhost =
    "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-zinc-800 dark:hover:text-slate-50 text-slate-700 dark:text-slate-300";
  const btnOutline =
    "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-slate-50 text-slate-900 dark:text-white";
  const btnPrimary =
    "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 shadow-sm";

  return (
    <header
      className={cn(
        "w-full z-40 fixed top-0 left-0 border-b",
        className,
      )}
     style={{ backgroundColor: tokens.color.background, borderColor: tokens.color.border }}>
      <div className="container mx-auto px-4 md:px-6 relative min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        {/* Left: Desktop Navigation */}
        <div className="justify-start items-center gap-2 lg:flex hidden flex-row">
          <nav className="flex justify-start items-center gap-2 flex-row">
            {menuItems.map((item) => (
              <Fragment key={linkLabel(item)}>
                {linkHref(item) && !item.items ? (
                  <SmartLink href={linkHref(item)} className={cn(btnBase, btnGhost)}>
                    {linkLabel(item)}
                  </SmartLink>
                ) : (
                  <DesktopDropdown item={item} />
                )}
              </Fragment>
            ))}
          </nav>
        </div>

        {/* Center: Brand */}
        <div className="flex lg:justify-center items-center gap-2 w-full lg:w-auto">
          <SmartLink
            href="/"
            className="flex items-center gap-2" style={{ color: tokens.color.text }}
          >
            {logo}
            <p className="font-bold text-lg tracking-tight">{brandName}</p>
          </SmartLink>
        </div>

        {/* Right: CTAs */}
        <div className="hidden lg:flex justify-end w-full gap-3">
          <button
            className={cn(btnBase, btnGhost)}
            onClick={onCtaTertiaryClick}
          >
            {ctaTertiaryText}
          </button>
          <div className="w-px h-5 self-center mx-1" style={{ backgroundColor: tokens.color.muted }}></div>
          <button
            className={cn(btnBase, btnOutline)}
            onClick={onCtaSecondaryClick}
          >
            {ctaSecondaryText}
          </button>
          <button
            className={cn(btnBase, btnPrimary)}
            onClick={onCtaPrimaryClick}
          >
            {ctaPrimaryText}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex shrink-0 lg:hidden items-center justify-end">
          <button
            className={cn(btnBase, btnGhost, "px-2")}
            onClick={() => setOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full border-b shadow-xl overflow-hidden lg:hidden" style={{ backgroundColor: tokens.color.background, borderColor: tokens.color.border }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
              {menuItems.map((item) => (
                <div key={linkLabel(item)} className="flex flex-col gap-3">
                  {linkHref(item) && !item.items ? (
                    <SmartLink
                      href={linkHref(item)}
                      className="flex justify-between items-center font-medium text-lg border-b pb-2" style={{ color: tokens.color.text, borderColor: tokens.color.border }}
                    >
                      <span>{linkLabel(item)}</span>
                      <MoveRight className="w-4 h-4" style={{ color: tokens.color.mutedForeground }} />
                    </SmartLink>
                  ) : (
                    <>
                      <p className="text-lg font-bold border-b pb-2" style={{ color: tokens.color.text, borderColor: tokens.color.border }}>
                        {linkLabel(item)}
                      </p>
                      <div className="flex flex-col gap-3 pl-2 border-l-2 ml-2" style={{ borderColor: tokens.color.border }}>
                        {item.items?.map((subItem) => (
                          <SmartLink
                            key={linkLabel(subItem)}
                            href={linkHref(subItem)}
                            className="flex justify-between items-center hover:opacity-70" style={{ color: tokens.color.mutedForeground }}
                          >
                            <span className="font-medium">{linkLabel(subItem)}</span>
                            <MoveRight className="w-4 h-4 opacity-50" />
                          </SmartLink>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: tokens.color.border }}>
                <button
                  className={cn(btnBase, btnOutline, "w-full justify-center")}
                  onClick={onCtaSecondaryClick}
                >
                  {ctaSecondaryText}
                </button>
                <button
                  className={cn(btnBase, btnPrimary, "w-full justify-center")}
                  onClick={onCtaPrimaryClick}
                >
                  {ctaPrimaryText}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
