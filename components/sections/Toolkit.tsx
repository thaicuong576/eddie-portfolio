import { toolkitGroups } from "@/content/toolkit";
import { getSection } from "@/content/sections";
import { SectionFrame } from "@/components/SectionFrame";

export function Toolkit() {
  const section = getSection("toolkit");

  return (
    <SectionFrame
      id="toolkit"
      label={section?.label ?? "Toolkit"}
      heading={section?.heading}
    >
      <div className="divide-y divide-rule border-y border-rule">
        {toolkitGroups.map((group) => {
          const isSystems = group.tone === "systems";
          return (
            <div
              key={group.name}
              className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8"
            >
              <div className="w-36 shrink-0">
                <h3
                  className={`font-semibold text-[17px] ${
                    isSystems ? "text-system" : "text-ink"
                  }`}
                >
                  {group.name}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2.5 flex-1">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={
                      isSystems
                        ? "border border-system text-system font-mono tabular-nums text-[13px] px-3 py-1.5 rounded-full leading-normal"
                        : "bg-surface border border-rule font-sans text-[14px] text-ink px-3 py-1.5 rounded-full leading-normal"
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
    </SectionFrame>
  );
}
