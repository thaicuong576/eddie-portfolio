import Link from "next/link";
import { navSections, contactSection } from "@/content/sections";
import { ui } from "@/content/ui";

export function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-system focus:text-on-system focus:rounded-full text-[14px] font-medium"
      >
        {ui.skipToContent}
      </a>
      <header className="sticky top-0 z-50 bg-ground border-b border-rule h-[var(--header-h)] flex items-center justify-between px-5 sm:px-10">
        <Link
          href="/"
          aria-label="FinTech, back to top"
          className="text-[24px] font-bold leading-none tracking-[-0.04em] select-none shrink-0"
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium">
            {navSections.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="text-ink hover:text-system hover:underline underline-offset-4 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact button */}
          <Link
            href="/#contact"
            className="rounded-full bg-system text-on-system font-medium text-[13px] sm:text-[14px] px-4 py-2 leading-none shrink-0 hover:opacity-95 transition-opacity"
          >
            {contactSection.label}
          </Link>

          {/* Mobile menu dropdown (< md) */}
          <details className="relative md:hidden">
            <summary
              className="list-none cursor-pointer flex items-center justify-center border border-rule hover:border-system text-ink rounded-full px-3 py-1.5 text-[13px] font-medium select-none [&::-webkit-details-marker]:hidden"
              aria-label={ui.menu}
            >
              {ui.menu}
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-rule rounded-xl p-2 shadow-none z-50 flex flex-col gap-1">
              {navSections.map((item) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className="text-ink text-[14px] px-3 py-2 rounded-lg hover:bg-ground hover:text-system transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
