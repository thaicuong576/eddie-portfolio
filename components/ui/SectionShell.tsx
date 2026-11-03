import React from "react";

export interface SectionShellProps {
  id: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  first?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  heading,
  intro,
  first = false,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      style={{ scrollMarginTop: "var(--header-h, 72px)" }}
      className={`max-w-[1240px] mx-auto px-5 sm:px-10 lg:px-12 py-20 sm:py-28 ${
        first ? "" : "border-t border-rule"
      } ${className}`}
    >
      {(eyebrow || heading || intro) && (
        <div className="mb-10 sm:mb-14 max-w-[800px]">
          {eyebrow && (
            <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 sm:mb-4 select-none tabular-nums">
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="font-semibold text-[30px] sm:text-[42px] lg:text-[46px] leading-[1.12] tracking-[-0.03em] text-ink">
              {heading}
            </h2>
          )}
          {intro && (
            <p className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] leading-[1.6] text-muted">
              {intro}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
