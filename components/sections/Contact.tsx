import { profile } from "@/content/profile";
import { sectionEyebrow } from "@/content/sections";
import { ui } from "@/content/ui";

export function Contact() {
  const eyebrow = sectionEyebrow("contact");
  const emailHref = profile.email.startsWith("[")
    ? "#contact"
    : `mailto:${profile.email}`;

  return (
    <section
      id="contact"
      className="w-full bg-system text-on-system scroll-mt-14 sm:scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 py-20 sm:py-28 lg:py-36">
        <div className="font-mono text-[13px] text-on-system/80 mb-4">
          {eyebrow}
        </div>
        <h2 className="font-semibold text-[30px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] max-w-[860px] mb-8 sm:mb-10 text-on-system">
          {profile.contactHeadline}
        </h2>
        <div className="mb-10 sm:mb-12">
          <a
            href={emailHref}
            className="font-semibold text-[22px] sm:text-[30px] lg:text-[36px] tracking-[-0.02em] hover:opacity-90 underline underline-offset-8 decoration-1 inline-block text-on-system focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-system"
          >
            {profile.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-on-system text-on-system hover:bg-on-system hover:text-system transition-colors font-medium px-5 py-2.5 sm:px-6 sm:py-3 leading-none text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-system"
          >
            {profile.linkedinLabel}
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-on-system text-on-system hover:bg-on-system hover:text-system transition-colors font-medium px-5 py-2.5 sm:px-6 sm:py-3 leading-none text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-system"
          >
            {profile.cvLabel}
          </a>
        </div>
        <div className="border-t border-on-system/20 mt-16 sm:mt-24 pt-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-on-system/75 text-[13px] sm:text-[14px]">
          <p>{profile.copyright}</p>
          <a
            href="#top"
            className="hover:text-on-system transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-system"
          >
            {ui.backToTop}
          </a>
        </div>
      </div>
    </section>
  );
}
