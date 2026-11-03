import { ScrollHero } from "@/components/ScrollHero";

const APPROACH_CARDS = [
  {
    number: "01",
    title: "What happened",
    description:
      "Reliable actuals: data that is complete, reconciled and traceable to source.",
  },
  {
    number: "02",
    title: "Why it happened",
    description:
      "Variance against budget and forecast, traced back to revenue and cost drivers.",
  },
  {
    number: "03",
    title: "What happens next",
    description:
      "Driver-based forecasts with stated assumptions, scenarios and sensitivity.",
  },
  {
    number: "04",
    title: "What we should do",
    description:
      "A recommendation a budget owner can act on, defended with numbers.",
  },
] as const;

const WORK_CARDS = [
  {
    tag: "Finance · Reporting",
    status: "[Status]",
    title: "Management reporting pack",
    proves:
      "Proves: P&L structure, consolidation by company and department, Actual vs Budget vs Forecast.",
    problem: "[The business problem, in one sentence]",
    isSystemTag: false,
  },
  {
    tag: "Finance · Analysis",
    status: "[Status]",
    title: "Variance analysis case",
    proves:
      "Proves: finance judgment. Revenue up, profit down: why, and what to change.",
    problem: "[The business problem, in one sentence]",
    isSystemTag: false,
  },
  {
    tag: "Finance · Planning",
    status: "[Status]",
    title: "Driver-based forecast model",
    proves:
      "Proves: FP&A capability. Revenue built from drivers, with scenarios and sensitivity.",
    problem: "[The business problem, in one sentence]",
    isSystemTag: false,
  },
  {
    tag: "Systems · Data",
    status: "[Status]",
    title: "Finance data system",
    proves:
      "Proves: systems capability. Architecture, data model, validation, reconciliation and audit trail.",
    problem:
      "[Before and after: what the workflow cost, and what it costs now]",
    isSystemTag: true,
  },
] as const;

const FINANCE_SKILLS = [
  "Financial statements",
  "Management accounting",
  "Budgeting",
  "Forecasting",
  "Variance analysis",
  "Profitability analysis",
  "Working capital",
] as const;

const SYSTEMS_SKILLS = [
  "Excel modeling",
  "SQL",
  "Power BI",
  "Data modeling",
  "Workflow automation",
  "AI coding",
  "ERP / EPM",
] as const;

const EXPERIENCE_ITEMS = [
  {
    period: "[Start] — now",
    role: "[Role] · YouNet",
    summary:
      "[What you owned, in finance terms] · [The system you built, and what it changed]",
  },
  {
    period: "[Start] — [End]",
    role: "[Role] · [Company]",
    summary: "[Only what supports the finance story]",
  },
] as const;

export default function Home() {
  return (
    <ScrollHero>
      {/* 01 · Approach */}
      <section
        id="approach"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 scroll-mt-[88px]"
      >
        <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
          01 · Approach
        </div>
        <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
          From the numbers to a decision, every time.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
          {APPROACH_CARDS.map((card) => (
            <div
              key={card.number}
              className="bg-surface border border-rule rounded-[16px] p-7 flex flex-col"
            >
              <div className="font-mono text-[13px] text-system mb-3">
                {card.number}
              </div>
              <h3 className="font-semibold text-[22px] leading-tight text-ink mb-2">
                {card.title}
              </h3>
              <p className="text-muted leading-[1.55] text-[15px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 02 · Selected work */}
      <section
        id="work"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
      >
        <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
          02 · Selected work
        </div>
        <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
          Four pieces of evidence.
        </h2>
        <p className="text-[18px] text-muted max-w-[640px] mb-12 leading-[1.55]">
          Built on synthetic or anonymised data. Each one starts from a business
          problem and ends with an insight or a tool.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
          {WORK_CARDS.map((card) => (
            <a
              key={card.title}
              href="#work"
              className="bg-surface border border-rule rounded-[20px] p-8 min-h-[280px] flex flex-col"
            >
              <div
                className={`flex items-center justify-between font-mono text-[12px] uppercase ${
                  card.isSystemTag ? "text-system" : "text-muted"
                } mb-4`}
              >
                <span>{card.tag}</span>
                <span>{card.status}</span>
              </div>
              <h3 className="font-semibold text-[28px] tracking-[-0.02em] leading-tight text-ink mb-2">
                {card.title}
              </h3>
              <p className="text-muted leading-[1.55] text-[15px]">
                {card.proves}
              </p>
              <p className="text-ink leading-[1.55] text-[15px] mt-auto pt-6">
                {card.problem}
              </p>
              <div className="font-semibold text-system text-[15px] mt-4 flex items-center gap-1">
                Read the case →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 03 · Toolkit */}
      <section
        id="toolkit"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
      >
        <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
          03 · Toolkit
        </div>
        <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
          Finance first. Systems as leverage.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10">
          <div>
            <h3 className="font-semibold text-[18px] text-ink mb-4">
              Finance
            </h3>
            <ul className="flex flex-wrap gap-[10px]">
              {FINANCE_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="bg-surface border border-rule font-sans text-[15px] text-ink px-[14px] py-[9px] rounded-full leading-none"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[18px] text-system mb-4">
              Systems
            </h3>
            <ul className="flex flex-wrap gap-[10px]">
              {SYSTEMS_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="border border-system text-system font-mono text-[14px] px-[14px] py-[9px] rounded-full leading-none"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04 · Experience */}
      <section
        id="experience"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
      >
        <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
          04 · Experience
        </div>
        <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
          Where the work happened.
        </h2>
        <div>
          {EXPERIENCE_ITEMS.map((item, index) => {
            const isLast = index === EXPERIENCE_ITEMS.length - 1;
            return (
              <div
                key={index}
                className={`border-t border-rule py-7 flex flex-wrap gap-x-12 gap-y-4 ${
                  isLast ? "border-b" : ""
                }`}
              >
                <div className="w-[200px] shrink-0 font-mono text-[14px] text-muted">
                  {item.period}
                </div>
                <div className="flex-[1_1_480px] min-w-0">
                  <h3 className="font-semibold text-[22px] leading-tight text-ink mb-2">
                    {item.role}
                  </h3>
                  <p className="text-muted leading-[1.55] text-[15px]">
                    {item.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 05 · Contact */}
      <section
        id="contact"
        className="max-w-[1240px] mx-auto px-5 sm:px-10 pt-[120px] pb-[72px] border-t border-rule scroll-mt-[88px]"
      >
        <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
          05 · Contact
        </div>
        <h2 className="font-semibold text-[36px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] max-w-[900px] mb-12 text-ink">
          {"[One line on what you are open to]"}
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-system text-on-system font-semibold px-[22px] py-[14px] leading-none"
          >
            {"[your@email]"}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-ink text-ink font-medium px-[22px] py-[14px] leading-none"
          >
            LinkedIn
          </a>
          <a
            href="/Phung-Thai-Cuong-(Eddie)-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink text-ink font-medium px-[22px] py-[14px] leading-none"
          >
            Download CV
          </a>
        </div>
        <p className="mt-12 text-[14px] text-muted">© Eddie Phung</p>
      </section>
    </ScrollHero>
  );
}
