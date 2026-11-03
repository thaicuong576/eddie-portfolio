import Link from "next/link";
import { navSections, contactSection } from "@/content/sections";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ground/95 backdrop-blur-sm border-b border-rule px-4 sm:px-8 lg:px-12 h-[56px] sm:h-[72px] flex items-center justify-between">
      <Link
        href="/"
        aria-label="FinTech, back to top"
        className="text-[22px] sm:text-[26px] font-bold leading-none tracking-[-0.045em] select-none shrink-0"
      >
        <span className="text-ink">Fin</span>
        <span className="text-system">Tech</span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-6 min-w-0">
        <nav
          aria-label="Primary"
          className="overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,black_calc(100%-16px),transparent_100%)] sm:[mask-image:none] flex items-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] whitespace-nowrap scroll-smooth py-1"
        >
          {navSections.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className="font-medium text-ink hover:text-system transition-colors px-1 sm:px-0 py-2 inline-flex items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="shrink-0 rounded-full bg-system text-on-system font-medium px-3.5 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-[14px] leading-none transition-opacity hover:opacity-90 inline-flex items-center justify-center min-h-[34px] sm:min-h-[40px]"
        >
          {contactSection.label}
        </Link>
      </div>
    </header>
  );
}
