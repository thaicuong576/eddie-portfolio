import { toolkitGroups } from "@/content/toolkit";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/ui/SectionShell";

export function Toolkit() {
  const eyebrow = sectionEyebrow("toolkit");
  const section = getSection("toolkit");

  return (
    <SectionShell
      id="toolkit"
      eyebrow={eyebrow}
      heading={section?.heading}
      intro={section?.intro}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {toolkitGroups.map((group) => {
          const isSystems = group.tone === "systems";
          return (
            <div
              key={group.name}
              className="bg-surface border border-rule rounded-[16px] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-rule">
                  <h3
                    className={`font-semibold text-[20px] sm:text-[22px] tracking-tight ${
                      isSystems ? "text-system" : "text-ink"
                    }`}
                  >
                    {group.name}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className={
                        isSystems
                          ? "border border-system/40 bg-system/5 text-system font-mono text-[13px] sm:text-[14px] px-3.5 py-1.5 rounded-full leading-none"
                          : "bg-ground border border-rule font-sans text-[14px] sm:text-[15px] text-ink px-3.5 py-1.5 rounded-full leading-none"
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
    </SectionShell>
  );
}
