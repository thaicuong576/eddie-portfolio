import { profile } from "@/content/profile";
import { sectionEyebrow } from "@/content/sections";

export function Contact() {
  const eyebrow = sectionEyebrow("contact");
  const emailHref = profile.email.startsWith("[")
    ? "#contact"
    : `mailto:${profile.email}`;

  return (
    <section
      id="contact"
      className="max-w-[1240px] mx-auto px-4 sm:px-10 py-20 sm:py-28 border-t border-rule scroll-mt-[var(--header-h,72px)]"
    >
      <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-4">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] max-w-[800px] mb-8 text-ink">
        {profile.contactHeadline}
      </h2>
      <div>
        <a
          href={emailHref}
          className="text-[20px] sm:text-[28px] font-medium text-ink underline underline-offset-8 decoration-rule hover:decoration-system hover:text-system transition-colors mb-8 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system rounded"
        >
          {profile.email}
        </a>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-system text-on-system font-medium px-6 py-3 min-h-[44px] inline-flex items-center justify-center text-[14px] hover:bg-system/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system focus-visible:ring-offset-2"
        >
          {profile.linkedinLabel}
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink text-ink font-medium px-6 py-3 min-h-[44px] inline-flex items-center justify-center text-[14px] hover:bg-ink hover:text-ground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system focus-visible:ring-offset-2"
        >
          {profile.cvLabel}
        </a>
      </div>
      <p className="mt-16 font-mono text-[12px] text-muted tracking-wide">
        {profile.copyright}
      </p>
    </section>
  );
}
