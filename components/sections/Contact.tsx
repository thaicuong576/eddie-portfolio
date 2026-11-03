import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { SectionFrame } from "@/components/SectionFrame";

export function Contact() {
  const section = getSection("contact");
  const emailHref = profile.email.startsWith("[")
    ? "#contact"
    : `mailto:${profile.email}`;

  return (
    <SectionFrame id="contact" label={section?.label ?? "Contact"}>
      <h2 className="font-semibold text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.08] tracking-[-0.03em] text-ink mb-10 max-w-[760px]">
        {profile.contactHeadline}
      </h2>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={emailHref}
          className="rounded-full bg-system text-on-system font-medium text-[15px] px-6 py-3.5 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-system transition-opacity leading-none"
        >
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-rule text-ink hover:border-ink font-medium text-[15px] px-6 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-system transition-colors leading-none"
        >
          {profile.linkedinLabel}
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-rule text-ink hover:border-ink font-medium text-[15px] px-6 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-system transition-colors leading-none"
        >
          {profile.cvLabel}
        </a>
      </div>
      <div className="mt-20 pt-8 border-t border-rule text-[14px] text-muted">
        {profile.copyright}
      </div>
    </SectionFrame>
  );
}
