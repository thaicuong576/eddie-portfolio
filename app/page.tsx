const SECTIONS = [
  { id: "approach", title: "Approach" },
  { id: "work", title: "Selected work" },
  { id: "toolkit", title: "Toolkit" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
] as const;

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-ground border-b border-rule px-5 sm:px-10 sm:h-[88px] flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-0 gap-y-3">
        <a
          href="#top"
          aria-label="FinTech, back to top"
          className="text-[30px] font-bold leading-none tracking-[-0.045em] select-none"
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </a>
        <nav className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 text-[15px]">
          <a href="#approach" className="text-ink">
            Approach
          </a>
          <a href="#work" className="text-ink">
            Work
          </a>
          <a href="#toolkit" className="text-ink">
            Toolkit
          </a>
          <a href="#experience" className="text-ink">
            Experience
          </a>
          <a
            href="#contact"
            className="rounded-full bg-system text-on-system font-semibold px-[18px] py-[10px] leading-none"
          >
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section
          id="top"
          className="min-h-[calc(100vh-88px)] flex flex-col justify-end p-10"
        >
          <div className="max-w-[760px] flex flex-col gap-4">
            <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
              {"FP&A · Business Finance · Finance Systems"}
            </p>
            <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Eddie Phung
            </h1>
            <p className="text-[18px] sm:text-[21px] leading-[1.5] text-ink">
              A finance professional who understands business performance,
              builds data-driven financial systems, and turns financial
              information into better business decisions.
            </p>
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="max-w-[1240px] mx-auto px-10 py-24 border-t border-rule scroll-mt-[88px]"
          >
            <h2 className="text-[44px] font-semibold tracking-[-0.03em] text-ink">
              {section.title}
            </h2>
          </section>
        ))}
      </main>
    </>
  );
}
