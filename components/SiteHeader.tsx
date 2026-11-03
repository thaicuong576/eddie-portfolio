import Link from "next/link";
import { navSections, contactSection } from "@/content/sections";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ground border-b border-rule px-5 sm:px-10 sm:h-[88px] flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-0 gap-y-3">
      <Link
        href="/"
        aria-label="FinTech, back to top"
        className="text-[30px] font-bold leading-none tracking-[-0.045em] select-none"
      >
        <span className="text-ink">Fin</span>
        <span className="text-system">Tech</span>
      </Link>
      <nav className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 text-[15px]">
        {navSections.map((item) => (
          <Link key={item.id} href={`/#${item.id}`} className="text-ink">
            {item.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="rounded-full bg-system text-on-system font-semibold px-[18px] py-[10px] leading-none"
        >
          {contactSection.label}
        </Link>
      </nav>
    </header>
  );
}
