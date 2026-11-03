import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return {};
  }
  return {
    title: project.title,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isSystems = project.track === "systems";

  return (
    <>
      <SiteHeader />
      <main className="max-w-[1240px] mx-auto px-4 sm:px-10 py-12 sm:py-16">
        <Link
          href="/#work"
          className="font-mono text-[13px] text-system hover:underline inline-flex items-center gap-1.5 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system rounded"
        >
          {ui.backToWork}
        </Link>

        {/* Header Band */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 font-mono text-[12px] uppercase mb-4">
            <span
              className={
                isSystems ? "text-system font-medium" : "text-muted"
              }
            >
              {project.tag}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">{project.status}</span>
          </div>

          <h1 className="text-[32px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.03em] max-w-[840px] text-ink mb-6">
            {project.title}
          </h1>

          <p className="text-[17px] sm:text-[21px] leading-relaxed text-muted max-w-[760px]">
            {project.proves}
          </p>
        </div>

        <hr className="border-t border-rule mb-12 sm:mb-16" />

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12 order-2 lg:order-1">
            {/* 01. Context */}
            <div>
              <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 flex items-center gap-2">
                <span>01</span>
                <span>·</span>
                <span>{ui.contextLabel}</span>
              </div>
              <h2 className="font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] text-ink mb-4">
                {ui.contextLabel}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-ink/90 max-w-[65ch]">
                {project.caseStudy.context}
              </p>
            </div>

            {/* 02. Approach */}
            <div className="border-t border-rule pt-10">
              <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 flex items-center gap-2">
                <span>02</span>
                <span>·</span>
                <span>{ui.approachLabel}</span>
              </div>
              <h2 className="font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] text-ink mb-4">
                {ui.approachLabel}
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-ink/90 max-w-[65ch]">
                {project.caseStudy.approach}
              </p>
            </div>

            {/* 03. Outcome */}
            <div className="border-t border-rule pt-10">
              <div className="bg-surface border border-system/50 rounded-[16px] p-6 sm:p-8">
                <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 flex items-center gap-2">
                  <span>03</span>
                  <span>·</span>
                  <span>{ui.outcomeLabel}</span>
                </div>
                <h2 className="font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] text-ink mb-4">
                  {ui.outcomeLabel}
                </h2>
                <p className="text-[17px] sm:text-[19px] leading-[1.6] text-ink font-medium max-w-[65ch]">
                  {project.caseStudy.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Fact Sheet Sidebar */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] bg-surface border border-rule rounded-[16px] p-6 sm:p-7 space-y-6">
              <h2 className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium border-b border-rule/60 pb-3">
                {ui.factSheetLabel}
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">
                    {ui.trackLabel}
                  </div>
                  <div className="text-[14px] font-medium text-ink">
                    {project.tag}
                  </div>
                </div>
                <div className="border-t border-rule/60 pt-3">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">
                    {ui.statusLabel}
                  </div>
                  <div className="font-mono text-[13px] text-muted">
                    {project.status}
                  </div>
                </div>
              </div>

              {project.caseStudy.tools.length > 0 && (
                <div className="border-t border-rule/60 pt-4">
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">
                    {ui.toolsLabel}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.caseStudy.tools.map((tool) => (
                      <li
                        key={tool}
                        className={
                          isSystems
                            ? "border border-system text-system font-mono text-[12px] px-3 py-1.5 rounded-full leading-none"
                            : "bg-ground border border-rule text-ink font-sans text-[13px] px-3 py-1.5 rounded-full leading-none"
                        }
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.caseStudy.links.length > 0 && (
                <div className="border-t border-rule/60 pt-4">
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">
                    {ui.linksLabel}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.caseStudy.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-system text-on-system font-medium px-4 py-2 text-[13px] hover:bg-system/90 transition-colors inline-flex items-center min-h-[44px]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer Back Link */}
        <hr className="border-t border-rule mt-16 sm:mt-20 mb-8" />
        <div>
          <Link
            href="/#work"
            className="font-mono text-[13px] text-system hover:underline inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system rounded"
          >
            {ui.backToWork}
          </Link>
        </div>
      </main>
    </>
  );
}
