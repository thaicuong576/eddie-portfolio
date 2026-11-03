import React from "react";
import { sections } from "@/content/sections";

export interface SectionFrameProps {
  id: string;
  label: string;
  heading?: string;
  intro?: string;
  children: React.ReactNode;
  first?: boolean;
}

export function SectionFrame({
  id,
  label,
  heading,
  intro,
  children,
  first = false,
}: SectionFrameProps) {
  const index = sections.findIndex((s) => s.id === id);
  const number = index !== -1 ? String(index + 1).padStart(2, "0") : "";
  const isFirst = first || index === 0;

  return (
    <section
      id={id}
      className={`max-w-[1240px] mx-auto px-5 sm:px-10 py-20 md:py-28 scroll-mt-[var(--header-h)] ${
        isFirst ? "" : "border-t border-rule"
      }`}
    >
      <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
        {/* Left rail: section number + sentence-case label */}
        <div className="mb-8 md:mb-0 md:col-span-3">
          <div className="md:sticky md:top-[calc(var(--header-h)+24px)] flex md:flex-col items-baseline md:items-start gap-2.5">
            {number && (
              <span className="font-mono tabular-nums text-system text-[14px] sm:text-[15px] font-medium">
                {number}
              </span>
            )}
            <span className="text-[14px] sm:text-[15px] font-medium text-ink">
              {label}
            </span>
          </div>
        </div>

        {/* Content area: cols 4-12 */}
        <div className="md:col-span-9">
          {heading && (
            <h2 className="font-semibold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.025em] text-ink mb-4 max-w-[68ch]">
              {heading}
            </h2>
          )}
          {intro && (
            <p className="text-[17px] text-muted leading-relaxed max-w-[68ch] mb-10">
              {intro}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
