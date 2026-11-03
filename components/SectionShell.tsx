import React from "react";

export interface SectionShellProps {
  id: string;
  eyebrow: string;
  heading?: string;
  intro?: string;
  tone?: "ground" | "surface" | "system";
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  heading,
  intro,
  tone = "ground",
  children,
  className,
}: SectionShellProps) {
  const bgClass =
    tone === "surface"
      ? "bg-surface text-ink"
      : tone === "system"
      ? "bg-system text-on-system"
      : "bg-ground text-ink";

  return (
    <section
      id={id}
      className={`w-full ${bgClass} scroll-mt-14 sm:scroll-mt-20 ${className || ""}`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 py-20 sm:py-28 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28 xl:top-32 mb-8 lg:mb-0">
            <div
              className={`font-mono text-[13px] ${
                tone === "system" ? "text-on-system/80" : "text-system"
              } mb-3`}
            >
              {eyebrow}
            </div>
            {heading && (
              <h2
                className={`font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.12] tracking-[-0.025em] ${
                  tone === "system" ? "text-on-system" : "text-ink"
                } mb-4`}
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p className="text-ink text-[16px] leading-[1.55] max-w-[440px]">
                {intro}
              </p>
            )}
          </div>
          <div className="lg:col-span-7 xl:col-span-7 min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
