import Link from "next/link";
import { navSections, contactSection } from "@/content/sections";
import { ui } from "@/content/ui";
import {
  HEADER_CONTAINER_CLASS,
  WORDMARK_CLASS,
  NAV_LINK_CLASS,
  CONTACT_BUTTON_CLASS,
  MOBILE_MENU_SUMMARY_CLASS,
  MOBILE_DROPDOWN_CLASS,
  SKIP_LINK_CLASS,
} from "./headerStyles";

export function SiteHeader() {
  return (
    <>
      <a href="#case-content" className={SKIP_LINK_CLASS}>
        {ui.skipToContent}
      </a>
      <header className={HEADER_CONTAINER_CLASS}>
        <Link
          href="/"
          aria-label="FinTech, back to top"
          className={WORDMARK_CLASS}
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </Link>

        {/* Mobile Nav (<sm) */}
        <div className="flex items-center gap-2 sm:hidden">
          <details className="relative group">
            <summary
              className={MOBILE_MENU_SUMMARY_CLASS}
              aria-label={ui.menuLabel}
            >
              <span className="group-open:hidden">{ui.menuLabel}</span>
              <span className="hidden group-open:inline">{ui.closeLabel}</span>
            </summary>
            <div className={MOBILE_DROPDOWN_CLASS}>
              {navSections.map((item) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className="px-3 py-2 rounded-lg text-ink hover:text-system hover:bg-ground/50 transition-colors text-[14px]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/#contact" className={CONTACT_BUTTON_CLASS}>
            {contactSection.label}
          </Link>
        </div>

        {/* Desktop Nav (sm+) */}
        <nav
          aria-label={ui.navAriaLabel}
          className="hidden sm:flex items-center gap-6 lg:gap-8"
        >
          {navSections.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={NAV_LINK_CLASS}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className={CONTACT_BUTTON_CLASS}>
            {contactSection.label}
          </Link>
        </nav>
      </header>
    </>
  );
}
