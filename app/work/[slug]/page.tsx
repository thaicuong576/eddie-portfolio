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
      <main
        id="main"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 pt-8 sm:pt-12 pb-20 md:pb-28"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left column: sticky project metadata */}
          <div className="lg:col-span-5 mb-12 lg:mb-0 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <Link
              href="/#work"
              className="font-medium text-system text-[14px] inline-flex items-center gap-1 mb-6 hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-system rounded-sm"
            >
              {ui.backToWork}
            </Link>

            <div className="flex items-center justify-between text-[13px] mb-3">
              <span
                className={`font-medium ${
                  isSystems ? "text-system" : "text-muted"
                }`}
              >
                {project.tag}
              </span>
              <span className="font-mono tabular-nums text-muted text-[12px]">
                {project.status}
              </span>
            </div>

            <h1 className="font-semibold text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.025em] text-ink mb-4">
              {project.title}
            </h1>

            <p className="text-[16px] sm:text-[17px] text-muted leading-relaxed mb-6">
              {project.proves}
            </p>

            {project.caseStudy.tools.length > 0 && (
              <div className="mt-8 pt-6 border-t border-rule">
                <div className="text-[13px] font-medium text-muted mb-3">
                  {ui.toolsLabel}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {project.caseStudy.tools.map((tool) => (
                    <li
                      key={tool}
                      className={
                        isSystems
                          ? "border border-system text-system font-mono tabular-nums text-[13px] px-3 py-1.5 rounded-full leading-normal"
                          : "bg-surface border border-rule font-sans text-[14px] text-ink px-3 py-1.5 rounded-full leading-normal"
                      }
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.links.length > 0 && (
              <div className="mt-6 pt-6 border-t border-rule">
                <div className="text-[13px] font-medium text-muted mb-3">
                  {ui.linksLabel}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.caseStudy.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-rule text-ink hover:border-ink font-medium text-[14px] px-5 py-2.5 leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-system"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Context / Approach / Outcome */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="border-t border-rule pt-6 first:border-t-0 first:pt-0">
              <h2 className="text-[14px] font-semibold text-system mb-2">
                {ui.contextLabel}
              </h2>
              <p className="text-ink text-[17px] sm:text-[18px] leading-[1.65]">
                {project.caseStudy.context}
              </p>
            </div>

            <div className="border-t border-rule pt-6">
              <h2 className="text-[14px] font-semibold text-system mb-2">
                {ui.approachLabel}
              </h2>
              <p className="text-ink text-[17px] sm:text-[18px] leading-[1.65]">
                {project.caseStudy.approach}
              </p>
            </div>

            <div className="bg-surface border border-rule border-l-2 border-l-system rounded-xl p-6 sm:p-8">
              <h2 className="text-[14px] font-semibold text-system mb-2">
                {ui.outcomeLabel}
              </h2>
              <p className="text-ink text-[17px] sm:text-[18px] leading-[1.65] font-medium">
                {project.caseStudy.outcome}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
