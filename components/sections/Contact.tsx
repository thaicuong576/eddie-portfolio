import { profile } from "@/content/profile";
import { sectionEyebrow } from "@/content/sections";
import { SectionShell } from "@/components/ui/SectionShell";

export function Contact() {
  const eyebrow = sectionEyebrow("contact");
  const emailHref = profile.email.startsWith("[")
    ? "#contact"
    : `mailto:${profile.email}`;

  return (
    <SectionShell
      id="contact"
      eyebrow={eyebrow}
      className="pb-20 sm:pb-28"
    >
      <h2 className="font-semibold text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.035em] max-w-[860px] mb-10 sm:mb-12 text-ink">
        {profile.contactHeadline}
      </h2>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <a
          href={emailHref}
          className="rounded-full bg-system text-on-system font-medium px-6 py-3.5 text-[14px] sm:text-[15px] leading-none transition-opacity hover:opacity-90 inline-flex items-center justify-center min-h-[44px]"
        >
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink text-ink font-medium px-6 py-3.5 text-[14px] sm:text-[15px] leading-none bg-surface hover:bg-ground transition-colors inline-flex items-center justify-center min-h-[44px]"
        >
          {profile.linkedinLabel}
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink text-ink font-medium px-6 py-3.5 text-[14px] sm:text-[15px] leading-none bg-surface hover:bg-ground transition-colors inline-flex items-center justify-center min-h-[44px]"
        >
          {profile.cvLabel}
        </a>
      </div>
      <p className="mt-14 sm:mt-16 text-[13px] sm:text-[14px] text-muted font-mono tabular-nums select-none">
        {profile.copyright}
      </p>
    </SectionShell>
  );
}
