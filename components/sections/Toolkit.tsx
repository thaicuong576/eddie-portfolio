import { toolkitGroups } from "@/content/toolkit";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Toolkit() {
  const eyebrow = sectionEyebrow("toolkit");
  const section = getSection("toolkit");

  return (
    <section
      id="toolkit"
      className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
        {section?.heading}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10">
        {toolkitGroups.map((group) => {
          const isSystems = group.tone === "systems";
          return (
            <div key={group.name}>
              <h3
                className={`font-semibold text-[18px] mb-4 ${
                  isSystems ? "text-system" : "text-ink"
                }`}
              >
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-[10px]">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={
                      isSystems
                        ? "border border-system text-system font-mono text-[14px] px-[14px] py-[9px] rounded-full leading-none"
                        : "bg-surface border border-rule font-sans text-[15px] text-ink px-[14px] py-[9px] rounded-full leading-none"
                    }
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
