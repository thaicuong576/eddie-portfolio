import { achievements } from "@/content/achievements";
import { getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionFrame } from "@/components/SectionFrame";

function toSentenceCase(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function Achievements() {
  const section = getSection("achievements");

  return (
    <SectionFrame
      id="achievements"
      label={section?.label ?? "Achievements"}
      heading={section?.heading}
    >
      <div className="divide-y divide-rule border-y border-rule">
        {achievements.map((item, index) => {
          const kindLabel = toSentenceCase(item.kind);
          return (
            <div
              key={index}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 flex-1 min-w-0">
                <div className="w-24 shrink-0 font-mono tabular-nums text-[14px] text-muted">
                  {item.year}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[17px] text-ink leading-snug">
                      {item.title}
                    </h3>
                    <span className="font-sans text-[12px] text-muted border border-rule px-2 py-0.5 rounded-full leading-normal">
                      {kindLabel}
                    </span>
                  </div>
                  <p className="text-muted text-[14px] leading-normal">
                    {item.issuer}
                  </p>
                </div>
              </div>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-system text-[14px] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-system rounded-sm shrink-0 self-start sm:self-center"
                >
                  {ui.viewLabel}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
