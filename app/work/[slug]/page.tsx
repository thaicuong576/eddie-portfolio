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
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const isSystems = project.track === "systems";

  return (
    <>
      <SiteHeader />
      <main className="max-w-[1240px] mx-auto px-5 sm:px-10 lg:px-12 py-12 sm:py-20">
        {/* Back navigation */}
        <Link
          href="/#work"
          className="font-medium text-system text-[14px] inline-flex items-center gap-1.5 mb-8 hover:underline"
        >
          {ui.backToWork}
        </Link>

        {/* Hero header band */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase mb-4 select-none">
            <span
              className={`px-2.5 py-1 rounded border ${
                isSystems
                  ? "border-system/30 bg-system/5 text-system font-medium"
                  : "border-rule/80 bg-surface text-muted"
              }`}
            >
              {project.tag}
            </span>
            <span className="px-2.5 py-1 rounded border border-rule/80 text-muted tabular-nums">
              {project.status}
            </span>
          </div>

          <h1 className="font-semibold text-[32px] sm:text-[46px] lg:text-[54px] leading-[1.08] tracking-[-0.035em] text-ink mb-6 max-w-[960px]">
            {project.title}
          </h1>

          <p className="text-[18px] sm:text-[22px] text-muted leading-[1.55] max-w-[840px] font-normal mb-8">
            {project.proves}
          </p>

          {project.problem && (
            <div className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7 max-w-[840px]">
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-system font-medium mb-2 select-none">
                {ui.problemLabel}
              </div>
              <p className="text-[15px] sm:text-[16px] text-ink leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}
        </div>

        {/* Two column grid on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
          {/* Metadata sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-h,72px)+24px)] order-2 lg:order-1">
            {project.caseStudy.tools.length > 0 && (
              <div className="bg-surface border border-rule rounded-[16px] p-6">
                <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-system font-medium mb-4 select-none">
                  {ui.toolsLabel}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.caseStudy.tools.map((tool) => (
                    <li
                      key={tool}
                      className={
                        isSystems
                          ? "border border-system/40 bg-system/5 text-system font-mono text-[13px] px-3 py-1 rounded-full leading-none"
                          : "border border-rule bg-ground text-ink font-sans text-[13px] px-3 py-1 rounded-full leading-none"
                      }
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.links.length > 0 && (
              <div className="bg-surface border border-rule rounded-[16px] p-6">
                <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-system font-medium mb-4 select-none">
                  {ui.linksLabel}
                </h2>
                <div className="flex flex-col gap-2.5">
                  {project.caseStudy.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-ink font-medium text-[14px] hover:text-system hover:underline"
                    >
                      <span>{link.label}</span>
                      <span className="text-system">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main content: Context, Approach, Outcome */}
          <div className="space-y-8 order-1 lg:order-2">
            <section className="bg-surface border border-rule rounded-[16px] p-7 sm:p-9">
              <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 select-none tabular-nums">
                01 · {ui.contextLabel}
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-ink tracking-tight mb-4">
                {ui.contextLabel}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-muted leading-[1.65]">
                {project.caseStudy.context}
              </p>
            </section>

            <section className="bg-surface border border-rule rounded-[16px] p-7 sm:p-9">
              <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 select-none tabular-nums">
                02 · {ui.approachLabel}
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-ink tracking-tight mb-4">
                {ui.approachLabel}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-muted leading-[1.65]">
                {project.caseStudy.approach}
              </p>
            </section>

            <section className="bg-surface border border-rule rounded-[16px] p-7 sm:p-9">
              <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3 select-none tabular-nums">
                03 · {ui.outcomeLabel}
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-ink tracking-tight mb-4">
                {ui.outcomeLabel}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-muted leading-[1.65]">
                {project.caseStudy.outcome}
              </p>
            </section>
          </div>
        </div>

        {/* Footer navigation */}
        <nav
          aria-label="Case navigation"
          className="mt-16 sm:mt-24 pt-8 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="text-[14px] font-medium text-ink hover:text-system transition-colors flex items-center gap-1.5"
            >
              <span>{ui.previousCase}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/#work"
            className="text-[14px] font-semibold text-system hover:underline"
          >
            {ui.backToWork}
          </Link>

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-[14px] font-medium text-ink hover:text-system transition-colors flex items-center gap-1.5"
            >
              <span>{ui.nextCase}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </>
  );
}
