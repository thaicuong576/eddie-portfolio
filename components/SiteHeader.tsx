import Link from "next/link";
import { navSections, contactSection } from "@/content/sections";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ground/95 backdrop-blur-sm border-b border-rule px-4 sm:px-10 h-[56px] sm:h-[72px] flex items-center justify-between gap-3">
      <Link
        href="/"
        aria-label="FinTech, back to top"
        className="text-[22px] sm:text-[26px] font-bold leading-none tracking-[-0.045em] select-none shrink-0"
      >
        <span className="text-ink">Fin</span>
        <span className="text-system">Tech</span>
      </Link>
      <nav className="flex items-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] min-w-0 overflow-x-auto flex-nowrap whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
        {navSections.map((item) => (
          <Link
            key={item.id}
            href={`/#${item.id}`}
            className="text-ink hover:text-system transition-colors shrink-0 py-1"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="rounded-full bg-system text-on-system font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-[13px] leading-none shrink-0 hover:bg-system/90 transition-colors"
        >
          {contactSection.label}
        </Link>
      </nav>
    </header>
  );
}
