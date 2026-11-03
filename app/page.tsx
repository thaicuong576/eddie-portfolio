import { ScrollHero } from "@/components/ScrollHero";

const SECTIONS = [
  { id: "approach", title: "Approach" },
  { id: "work", title: "Selected work" },
  { id: "toolkit", title: "Toolkit" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
] as const;

export default function Home() {
  return (
    <ScrollHero>
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-[1240px] mx-auto px-10 py-24 border-t border-rule scroll-mt-[88px]"
        >
          <h2 className="text-[44px] font-semibold tracking-[-0.03em] text-ink">
            {section.title}
          </h2>
        </section>
      ))}
    </ScrollHero>
  );
}
