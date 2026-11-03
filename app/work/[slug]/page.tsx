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
      <main className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24">
        <Link
          href="/#work"
          className="font-semibold text-system text-[15px] inline-flex items-center gap-1 mb-8"
        >
          {ui.backToWork}
        </Link>

        <div
          className={`flex items-center justify-between font-mono text-[12px] uppercase ${
            isSystems ? "text-system" : "text-muted"
          } mb-4 max-w-[760px]`}
        >
          <span>{project.tag}</span>
          <span>{project.status}</span>
        </div>

        <h1 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-6 text-ink">
          {project.title}
        </h1>

        <p className="text-[18px] text-muted max-w-[640px] mb-12 leading-[1.55]">
          {project.proves}
        </p>

        <div className="space-y-10 max-w-[760px]">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
              {ui.contextLabel}
            </div>
            <p className="text-muted leading-[1.55] text-[15px]">
              {project.caseStudy.context}
            </p>
          </div>

          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
              {ui.approachLabel}
            </div>
            <p className="text-muted leading-[1.55] text-[15px]">
              {project.caseStudy.approach}
            </p>
          </div>

          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
              {ui.outcomeLabel}
            </div>
            <p className="text-muted leading-[1.55] text-[15px]">
              {project.caseStudy.outcome}
            </p>
          </div>
        </div>

        {project.caseStudy.tools.length > 0 && (
          <div className="mt-12 max-w-[760px]">
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
              {ui.toolsLabel}
            </div>
            <ul className="flex flex-wrap gap-[10px]">
              {project.caseStudy.tools.map((tool) => (
                <li
                  key={tool}
                  className={
                    isSystems
                      ? "border border-system text-system font-mono text-[14px] px-[14px] py-[9px] rounded-full leading-none"
                      : "bg-surface border border-rule font-sans text-[15px] text-ink px-[14px] py-[9px] rounded-full leading-none"
                  }
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.caseStudy.links.length > 0 && (
          <div className="mt-8 max-w-[760px]">
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
              {ui.linksLabel}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.caseStudy.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink text-ink font-medium px-[22px] py-[14px] leading-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
