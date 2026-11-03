"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ui } from "@/content/ui";
import {
  WORDMARK_CLASS,
  NAV_LINK_CLASS,
  CONTACT_BUTTON_CLASS,
  MOBILE_MENU_SUMMARY_CLASS,
  MOBILE_DROPDOWN_CLASS,
  SKIP_LINK_CLASS,
} from "./headerStyles";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const LETTERS = [
  { char: "F", sx: -0.34, sy: -0.22, rot: -18, color: "text-ink" },
  { char: "i", sx: -0.27, sy: 0.18, rot: 12, color: "text-ink" },
  { char: "n", sx: -0.19, sy: -0.08, rot: -6, color: "text-ink" },
  { char: "T", sx: 0.16, sy: 0.20, rot: 10, color: "text-system" },
  { char: "e", sx: 0.24, sy: -0.16, rot: -14, color: "text-system" },
  { char: "c", sx: 0.31, sy: 0.10, rot: 8, color: "text-system" },
  { char: "h", sx: 0.38, sy: -0.24, rot: 16, color: "text-system" },
] as const;

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, v));
}

export interface ScrollHeroProps {
  hero: {
    eyebrow: string;
    name: string;
    paragraph: string;
    hints: string[];
    cv?: string;
    cvLabel?: string;
  };
  nav: {
    id: string;
    label: string;
  }[];
  contactLabel: string;
  children?: React.ReactNode;
}

export function ScrollHero({
  hero,
  nav,
  contactLabel,
  children,
}: ScrollHeroProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileDetailsRef = useRef<HTMLDetailsElement | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const stickyBoxRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<SVGSVGElement | null>(null);
  const hintsRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const letterSpansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef({
    W: 0,
    H: 0,
    fs: 0,
    ww: 0,
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    wmFs: 30,
    isPhone: false,
    lastScore: -1,
    rafId: null as number | null,
  });

  const closeMobileMenu = () => {
    if (mobileDetailsRef.current) {
      mobileDetailsRef.current.removeAttribute("open");
    }
  };

  const measure = () => {
    if (
      !wordRef.current ||
      !wordmarkRef.current ||
      !heroRef.current ||
      !stickyBoxRef.current
    ) {
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;
    const isPhone = W < 640;

    const fs = isPhone
      ? Math.min(0.24 * W, 0.28 * H)
      : Math.min(0.18 * W, 0.32 * H);

    wordRef.current.style.fontSize = `${fs}px`;
    const ww = wordRef.current.offsetWidth;

    const headerH = headerRef.current
      ? headerRef.current.offsetHeight
      : isPhone
      ? 56
      : 80;
    heroRef.current.style.marginTop = `-${headerH}px`;

    const wmRect = wordmarkRef.current.getBoundingClientRect();
    const x1 = wmRect.left;
    const y1 = wmRect.top;

    const x0 = (W - ww) / 2;
    const y0 = (H - fs) / 2;

    const wmComputed = window.getComputedStyle(wordmarkRef.current);
    const wmFs = parseFloat(wmComputed.fontSize) || (isPhone ? 24 : 30);

    const s = stateRef.current;
    s.W = W;
    s.H = H;
    s.fs = fs;
    s.ww = ww;
    s.x0 = x0;
    s.y0 = y0;
    s.x1 = x1;
    s.y1 = y1;
    s.wmFs = wmFs;
    s.isPhone = isPhone;
  };

  const update = () => {
    const s = stateRef.current;
    if (s.H <= 0) return;

    const scrollY = window.scrollY;
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + scrollY
      : 0;

    const scrollRange = (s.isPhone ? 1.2 : 1.4) * s.H;
    const p = clamp((scrollY - heroTop) / scrollRange);
    const dock = ease(clamp((p - 0.55) / 0.4));

    // 1. Background grid
    if (gridRef.current) {
      gridRef.current.style.opacity = (0.7 * (1 - dock)).toFixed(4);
    }

    // 2. Hints & Readout
    const hp = clamp(1 - 3.5 * p);
    if (hintsRef.current) {
      hintsRef.current.style.opacity = hp.toFixed(4);
    }
    if (readoutRef.current) {
      readoutRef.current.style.opacity = hp.toFixed(4);
      const score = Math.round(p * 100);
      if (score !== s.lastScore) {
        s.lastScore = score;
        readoutRef.current.textContent = `${String(score).padStart(3, "0")} / 100`;
      }
    }

    // 3. Letters
    const isTablet = s.W < 1024 && !s.isPhone;
    const scatterFactor = s.isPhone ? 0.65 : 1.0;
    const yFactor = s.isPhone ? 0.25 : isTablet ? 0.32 : 1.0;
    const maxBlur = s.isPhone ? 2 : 4;

    for (let i = 0; i < LETTERS.length; i++) {
      const span = letterSpansRef.current[i];
      if (!span) continue;

      const lp = clamp((p / 0.55 - i * 0.035) / 0.78);
      const t = ease(lp);
      const r = 1 - t;
      const item = LETTERS[i];
      const tx = item.sx * s.W * r * scatterFactor;
      const ty = item.sy * s.H * r * yFactor;
      const rot = item.rot * r * (s.isPhone ? 0.6 : 1.0);
      const blur = maxBlur * r;
      const op = 0.55 + 0.45 * t;

      span.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
      span.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
      span.style.opacity = op.toFixed(4);
    }

    // 4. Word docking
    const x = s.x0 + (s.x1 - s.x0) * dock;
    const y = s.y0 + (s.y1 - s.y0) * dock;
    const targetScale = s.wmFs / s.fs;
    const scale = 1 - dock * (1 - targetScale);

    if (wordRef.current) {
      wordRef.current.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(5)})`;
      wordRef.current.style.visibility = dock >= 1 ? "hidden" : "visible";
    }

    if (stickyBoxRef.current) {
      stickyBoxRef.current.style.zIndex = dock >= 1 ? "0" : "40";
    }

    // 5. Header wordmark
    if (wordmarkRef.current) {
      wordmarkRef.current.style.opacity = dock >= 1 ? "1" : "0";
    }

    // Header border cleanly appears at full dock
    if (headerRef.current) {
      headerRef.current.style.borderBottomColor =
        dock >= 0.98 ? "var(--color-rule)" : "transparent";
    }

    // 6. Header nav
    const navOp = clamp((dock - 0.4) * 2);
    if (navRef.current) {
      navRef.current.style.opacity = navOp.toFixed(4);
      navRef.current.style.pointerEvents = navOp > 0.5 ? "auto" : "none";
    }

    // 7. Intro block
    if (introRef.current) {
      introRef.current.style.opacity = dock.toFixed(4);
      introRef.current.style.transform = `translateY(${((1 - dock) * 20).toFixed(2)}px)`;
      introRef.current.style.pointerEvents = dock > 0.6 ? "auto" : "none";
    }
  };

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const cleanupMotion = () => {
      if (stateRef.current.rafId !== null) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (heroRef.current) heroRef.current.style.marginTop = "";
      if (headerRef.current)
        headerRef.current.style.borderBottomColor = "var(--color-rule)";
      if (stickyBoxRef.current) stickyBoxRef.current.style.zIndex = "";
      if (wordRef.current) {
        wordRef.current.style.transform = "";
        wordRef.current.style.visibility = "hidden";
        wordRef.current.style.fontSize = "";
      }
      if (wordmarkRef.current) wordmarkRef.current.style.opacity = "1";
      if (navRef.current) {
        navRef.current.style.opacity = "1";
        navRef.current.style.pointerEvents = "auto";
      }
      if (gridRef.current) gridRef.current.style.opacity = "";
      if (hintsRef.current) hintsRef.current.style.opacity = "";
      if (readoutRef.current) readoutRef.current.style.opacity = "";
      if (introRef.current) {
        introRef.current.style.opacity = "1";
        introRef.current.style.transform = "none";
        introRef.current.style.pointerEvents = "auto";
      }
      letterSpansRef.current.forEach((span) => {
        if (span) {
          span.style.transform = "";
          span.style.filter = "";
          span.style.opacity = "";
        }
      });
    };

    const onScroll = () => {
      if (stateRef.current.rafId === null) {
        stateRef.current.rafId = requestAnimationFrame(() => {
          stateRef.current.rafId = null;
          update();
        });
      }
    };

    const onResize = () => {
      measure();
      update();
    };

    const setupMotion = () => {
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      if (document.fonts) {
        document.fonts.ready.then(() => {
          if (!mql.matches) {
            measure();
            update();
          }
        });
      }
    };

    if (!mql.matches) {
      setupMotion();
    } else {
      cleanupMotion();
    }

    const handleMqlChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cleanupMotion();
      } else {
        setupMotion();
      }
    };

    mql.addEventListener("change", handleMqlChange);

    return () => {
      mql.removeEventListener("change", handleMqlChange);
      cleanupMotion();
    };
  }, []);

  return (
    <>
      <a href="#intro-content" className={SKIP_LINK_CLASS}>
        {ui.skipToContent}
      </a>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-ground h-14 sm:h-20 px-5 sm:px-10 flex items-center justify-between border-b border-transparent transition-colors"
      >
        <a
          ref={wordmarkRef}
          href="#top"
          aria-label="FinTech, back to top"
          className={`${WORDMARK_CLASS} opacity-0 motion-reduce:!opacity-100`}
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </a>

        <nav
          ref={navRef}
          aria-label={ui.navAriaLabel}
          className="opacity-0 pointer-events-none motion-reduce:!opacity-100 motion-reduce:!pointer-events-auto"
        >
          {/* Mobile Nav (<sm) */}
          <div className="flex items-center gap-2 sm:hidden">
            <details ref={mobileDetailsRef} className="relative group">
              <summary
                className={MOBILE_MENU_SUMMARY_CLASS}
                aria-label={ui.menuLabel}
              >
                <span className="group-open:hidden">{ui.menuLabel}</span>
                <span className="hidden group-open:inline">{ui.closeLabel}</span>
              </summary>
              <div className={MOBILE_DROPDOWN_CLASS}>
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMobileMenu}
                    className="px-3 py-2 rounded-lg text-ink hover:text-system hover:bg-ground/50 transition-colors text-[14px]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
            <a href="#contact" className={CONTACT_BUTTON_CLASS}>
              {contactLabel}
            </a>
          </div>

          {/* Desktop Nav (sm+) */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={NAV_LINK_CLASS}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className={CONTACT_BUTTON_CLASS}>
              {contactLabel}
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section
          id="top"
          ref={heroRef}
          className="relative h-[220vh] sm:h-[240vh] -mt-14 sm:-mt-20 pointer-events-none motion-reduce:!mt-0 motion-reduce:!h-auto motion-reduce:!pointer-events-auto"
        >
          <div
            ref={stickyBoxRef}
            className="sticky top-0 h-screen overflow-hidden pointer-events-none motion-reduce:!static motion-reduce:!h-auto motion-reduce:!min-h-0 motion-reduce:!py-16 sm:motion-reduce:!py-24 motion-reduce:!px-5 sm:motion-reduce:!px-10 motion-reduce:!overflow-visible motion-reduce:!pointer-events-auto"
          >
            {/* 1. Background grid as SVG pattern */}
            <svg
              ref={gridRef}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none motion-reduce:hidden"
              style={{ opacity: 0.7 }}
            >
              <defs>
                <pattern
                  id="hero-grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="var(--color-rule)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* 2. Hints */}
            <div
              ref={hintsRef}
              aria-hidden="true"
              className="absolute top-20 sm:top-28 left-5 sm:left-10 font-mono text-[13px] text-muted pointer-events-none select-none motion-reduce:hidden flex flex-col gap-1 pr-5 sm:pr-0"
            >
              {hero.hints.map((hint, idx) => (
                <div key={idx}>{hint}</div>
              ))}
            </div>

            {/* 3. Flying word */}
            <div
              ref={wordRef}
              data-ui="hero-scatter"
              aria-hidden="true"
              className="absolute left-0 top-0 z-[40] whitespace-nowrap font-bold leading-none tracking-[-0.045em] pointer-events-none select-none motion-reduce:hidden [transform-origin:0_0] will-change-transform"
            >
              {LETTERS.map((item, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    letterSpansRef.current[idx] = el;
                  }}
                  className={`inline-block ${item.color} will-change-transform`}
                >
                  {item.char}
                </span>
              ))}
            </div>

            {/* 4. Intro block */}
            <div
              ref={introRef}
              id="intro-content"
              className="absolute bottom-8 sm:bottom-14 left-5 sm:left-10 right-5 sm:right-auto max-w-[760px] flex flex-col gap-4 opacity-0 pointer-events-none motion-reduce:!static motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!p-0 motion-reduce:!pointer-events-auto"
            >
              <p className="font-mono text-[13px] text-system">
                {hero.eyebrow}
              </p>
              <h1 className="text-[34px] sm:text-[48px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
                {hero.name}
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-[1.55] text-ink max-w-[680px]">
                {hero.paragraph}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#contact"
                  className={CONTACT_BUTTON_CLASS}
                >
                  {contactLabel}
                </a>
                {hero.cv && hero.cvLabel && (
                  <a
                    href={hero.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ink text-ink font-medium px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm leading-none hover:bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
                  >
                    {hero.cvLabel}
                  </a>
                )}
              </div>
            </div>

            {/* 5. Readout */}
            <div
              ref={readoutRef}
              aria-hidden="true"
              className="absolute bottom-8 right-5 sm:bottom-12 sm:right-10 font-mono text-[13px] text-muted tabular-nums pointer-events-none select-none motion-reduce:hidden"
            >
              000 / 100
            </div>
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
