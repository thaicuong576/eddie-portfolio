import { toolkitGroups } from "@/content/toolkit";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/SectionShell";

export function Toolkit() {
  const eyebrow = sectionEyebrow("toolkit");
  const section = getSection("toolkit");

  return (
    <SectionShell
      id="toolkit"
      eyebrow={eyebrow}
      heading={section?.heading}
      tone="surface"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {toolkitGroups.map((group) => {
          const isSystems = group.tone === "systems";

          return (
            <div
              key={group.name}
              className="bg-ground border border-rule rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <h3
                  className={`font-semibold text-[20px] mb-5 ${
                    isSystems ? "text-system" : "text-ink"
                  }`}
                >
                  {group.name}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2 sm:gap-2.5 mt-auto">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={
                      isSystems
                        ? "border border-system text-system font-mono text-[13px] px-3.5 py-2 rounded-full leading-none"
                        : "bg-surface border border-rule font-sans text-[14px] text-ink px-3.5 py-2 rounded-full leading-none"
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
    </SectionShell>
  );
}
