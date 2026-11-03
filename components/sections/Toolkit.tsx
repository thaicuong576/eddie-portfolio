import { toolkitGroups } from "@/content/toolkit";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Toolkit() {
  const eyebrow = sectionEyebrow("toolkit");
  const section = getSection("toolkit");

  return (
    <section
      id="toolkit"
      className="max-w-[1240px] mx-auto px-4 sm:px-10 py-20 sm:py-28 border-t border-rule scroll-mt-[var(--header-h,72px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3">
            {eyebrow}
          </div>
          <h2 className="font-semibold text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.08] tracking-[-0.03em] text-ink">
            {section?.heading}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {toolkitGroups.map((group) => {
              const isSystems = group.tone === "systems";
              return (
                <div
                  key={group.name}
                  className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <h3
                      className={`font-mono text-[13px] uppercase tracking-[0.1em] font-medium mb-5 ${
                        isSystems ? "text-system" : "text-ink"
                      }`}
                    >
                      {group.name}
                    </h3>
                    <ul className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className={
                            isSystems
                              ? "border border-system text-system font-mono text-[13px] px-3.5 py-1.5 rounded-full leading-none"
                              : "bg-ground border border-rule text-ink font-sans text-[14px] px-3.5 py-1.5 rounded-full leading-none"
                          }
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
