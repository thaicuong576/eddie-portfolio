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
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const isSystems = project.track === "systems";

  return (
    <>
      <SiteHeader />
      <main
        id="case-content"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 py-12 sm:py-20 lg:py-24"
      >
        {/* Header Block */}
        <div className="mb-12 sm:mb-16">
          <Link
            href="/#work"
            className="font-semibold text-system text-[15px] inline-flex items-center gap-1.5 mb-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
          >
            {ui.backToWork}
          </Link>

          <div className="flex items-center justify-between font-mono text-[13px] mb-4 max-w-[840px]">
            <span
              className={isSystems ? "text-system font-medium" : "text-muted"}
            >
              {project.tag}
            </span>
            <span className="text-muted tabular-nums">{project.status}</span>
          </div>

          <h1 className="font-semibold text-[30px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] max-w-[880px] mb-6 text-ink">
            {project.title}
          </h1>

          <p className="text-[18px] text-muted max-w-[760px] leading-[1.55]">
            {project.proves}
          </p>
        </div>

        {/* Two-column layout on lg */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Aside with Tools and Links */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 mb-10 lg:mb-0 order-2 lg:order-1">
            {project.caseStudy.tools.length > 0 && (
              <div className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7">
                <h2 className="font-mono text-[13px] text-system mb-4">
                  {ui.toolsLabel}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.caseStudy.tools.map((tool) => (
                    <li
                      key={tool}
                      className={
                        isSystems
                          ? "border border-system text-system font-mono text-[13px] px-3.5 py-1.5 rounded-full leading-none"
                          : "bg-ground border border-rule font-sans text-[14px] text-ink px-3.5 py-1.5 rounded-full leading-none"
                      }
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.links.length > 0 && (
              <div className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7">
                <h2 className="font-mono text-[13px] text-system mb-4">
                  {ui.linksLabel}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.caseStudy.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-ink text-ink hover:bg-ground transition-colors font-medium px-5 py-2 text-sm leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Column: Context, Approach, Outcome narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <section
              aria-labelledby="context-heading"
              className="bg-surface border border-rule rounded-[16px] p-7 sm:p-8"
            >
              <h2
                id="context-heading"
                className="font-mono text-[13px] text-system mb-3"
              >
                {ui.contextLabel}
              </h2>
              <p className="text-ink text-[16px] leading-[1.6]">
                {project.caseStudy.context}
              </p>
            </section>

            <section
              aria-labelledby="approach-heading"
              className="bg-surface border border-rule rounded-[16px] p-7 sm:p-8"
            >
              <h2
                id="approach-heading"
                className="font-mono text-[13px] text-system mb-3"
              >
                {ui.approachLabel}
              </h2>
              <p className="text-ink text-[16px] leading-[1.6]">
                {project.caseStudy.approach}
              </p>
            </section>

            <section
              aria-labelledby="outcome-heading"
              className="bg-surface border-l-4 border-l-system border-y border-r border-rule rounded-[16px] p-7 sm:p-8 bg-system/[0.03]"
            >
              <h2
                id="outcome-heading"
                className="font-mono text-[13px] text-system mb-3"
              >
                {ui.outcomeLabel}
              </h2>
              <p className="text-ink font-medium text-[16px] leading-[1.6]">
                {project.caseStudy.outcome}
              </p>
            </section>

            {/* Next / Previous Project Navigation */}
            {(prevProject || nextProject) && (
              <nav
                aria-label={ui.navAriaLabel}
                className="pt-8 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prevProject ? (
                  <Link
                    href={`/work/${prevProject.slug}`}
                    className="group flex flex-col p-4 rounded-xl bg-surface border border-rule hover:border-system transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
                  >
                    <span className="font-mono text-[13px] text-muted mb-1">
                      {ui.prevCase}
                    </span>
                    <span className="font-semibold text-ink group-hover:text-system transition-colors text-[16px]">
                      {prevProject.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextProject ? (
                  <Link
                    href={`/work/${nextProject.slug}`}
                    className="group flex flex-col sm:items-end p-4 rounded-xl bg-surface border border-rule hover:border-system transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
                  >
                    <span className="font-mono text-[13px] text-muted mb-1">
                      {ui.nextCase}
                    </span>
                    <span className="font-semibold text-ink group-hover:text-system transition-colors text-[16px]">
                      {nextProject.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
