import { ScrollHero } from "@/components/ScrollHero";
import { profile } from "@/content/profile";
import { navSections, contactSection } from "@/content/sections";
import { Approach } from "@/components/sections/Approach";
import { Work } from "@/components/sections/Work";
import { Toolkit } from "@/components/sections/Toolkit";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ScrollHero
      hero={{
        eyebrow: profile.heroEyebrow,
        name: profile.name,
        paragraph: profile.heroParagraph,
        hints: profile.heroHints,
        cv: profile.cv,
        cvLabel: profile.cvLabel,
      }}
      nav={navSections}
      contactLabel={contactSection.label}
    >
      <Approach />
      <Work />
      <Toolkit />
      <Experience />
      <Achievements />
      <Contact />
    </ScrollHero>
  );
}
