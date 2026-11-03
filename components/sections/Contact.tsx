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
      className="max-w-[1240px] mx-auto px-5 sm:px-10 pt-[120px] pb-[72px] border-t border-rule scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[36px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] max-w-[900px] mb-12 text-ink">
        {profile.contactHeadline}
      </h2>
      <div className="flex flex-wrap gap-3">
        <a
          href={emailHref}
          className="rounded-full bg-system text-on-system font-semibold px-[22px] py-[14px] leading-none"
        >
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink text-ink font-medium px-[22px] py-[14px] leading-none"
        >
          {profile.linkedinLabel}
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink text-ink font-medium px-[22px] py-[14px] leading-none"
        >
          {profile.cvLabel}
        </a>
      </div>
      <p className="mt-12 text-[14px] text-muted">{profile.copyright}</p>
    </section>
  );
}
