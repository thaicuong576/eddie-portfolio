"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ui } from "@/content/ui";

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
  const navRef = useRef<HTMLDivElement | null>(null);
  const menuDetailsRef = useRef<HTMLDetailsElement | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const stickyBoxRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
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
    targetFs: 24,
    lastScore: -1,
    rafId: null as number | null,
  });

  const closeMenu = () => {
    if (menuDetailsRef.current) {
      menuDetailsRef.current.removeAttribute("open");
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
    let fs = W < 640 ? Math.min(0.20 * W, 0.30 * H) : Math.min(0.19 * W, 0.36 * H);

    wordRef.current.style.fontSize = `${fs}px`;
    let ww = wordRef.current.offsetWidth;
    if (ww > W - 40) {
      fs = Math.floor(fs * ((W - 40) / ww));
      wordRef.current.style.fontSize = `${fs}px`;
      ww = wordRef.current.offsetWidth;
    }

    const headerH = headerRef.current
      ? headerRef.current.offsetHeight
      : W < 640
      ? 56
      : 64;
    heroRef.current.style.marginTop = `-${headerH}px`;

    const wmRect = wordmarkRef.current.getBoundingClientRect();
    const x1 = wmRect.left;
    const y1 = wmRect.top;

    let targetFs = 24;
    if (wordmarkRef.current) {
      const computed = window.getComputedStyle(wordmarkRef.current).fontSize;
      targetFs = parseFloat(computed) || 24;
    }

    const x0 = (W - ww) / 2;
    const y0 = (H - fs) / 2;

    const s = stateRef.current;
    s.W = W;
    s.H = H;
    s.fs = fs;
    s.ww = ww;
    s.x0 = x0;
    s.y0 = y0;
    s.x1 = x1;
    s.y1 = y1;
    s.targetFs = targetFs;
  };

  const update = () => {
    const s = stateRef.current;
    if (s.H <= 0) return;

    const scrollY = window.scrollY;
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + scrollY
      : 0;

    const trackFactor = s.W < 640 ? 1.2 : 1.6;
    const p = clamp((scrollY - heroTop) / (trackFactor * s.H));
    const dock = ease(clamp((p - 0.48) / 0.34));

    // 1. Background ledger lines
    if (gridRef.current) {
      gridRef.current.style.opacity = (0.6 * (1 - dock)).toFixed(4);
    }

    // 2. Hints & Progress line
    const hp = clamp(1 - 3.5 * p);
    if (hintsRef.current) {
      hintsRef.current.style.opacity = hp.toFixed(4);
    }
    if (readoutRef.current) {
      readoutRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      readoutRef.current.style.opacity = (1 - dock).toFixed(4);
    }

    // 3. Letters convergence
    const isMobile = s.W < 640;
    const scatterScale = isMobile ? 0.6 : 1.0;
    for (let i = 0; i < LETTERS.length; i++) {
      const span = letterSpansRef.current[i];
      if (!span) continue;

      const lp = clamp((p / 0.40 - i * 0.03) / 0.85);
      const t = ease(lp);
      const r = 1 - t;
      const item = LETTERS[i];
      const tx = item.sx * s.W * r * scatterScale;
      const ty = item.sy * s.H * r * scatterScale;
      const rot = item.rot * r;
      const blur = r > 0.6 ? 3 * ((r - 0.6) / 0.4) : 0;
      const op = 0.55 + 0.45 * t;

      span.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
      span.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
      span.style.opacity = op.toFixed(4);
    }

    // 4. Word docking
    const x = s.x0 + (s.x1 - s.x0) * dock;
    const y = s.y0 + (s.y1 - s.y0) * dock;
    const scale = 1 - dock * (1 - s.targetFs / s.fs);

    if (wordRef.current) {
      wordRef.current.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(5)})`;
      wordRef.current.style.visibility = dock >= 1 ? "hidden" : "visible";
    }

    if (stickyBoxRef.current) {
      stickyBoxRef.current.style.zIndex = dock >= 1 ? "0" : "60";
    }

    // 5. Header wordmark
    if (wordmarkRef.current) {
      wordmarkRef.current.style.opacity = dock >= 1 ? "1" : "0";
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
      introRef.current.style.pointerEvents = dock > 0.5 ? "auto" : "none";
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
      if (stickyBoxRef.current) stickyBoxRef.current.style.zIndex = "";
      if (wordRef.current) {
        wordRef.current.style.transform = "";
        wordRef.current.style.visibility = "";
        wordRef.current.style.fontSize = "";
      }
      if (wordmarkRef.current) wordmarkRef.current.style.opacity = "";
      if (navRef.current) {
        navRef.current.style.opacity = "";
        navRef.current.style.pointerEvents = "";
      }
      if (gridRef.current) gridRef.current.style.opacity = "";
      if (hintsRef.current) hintsRef.current.style.opacity = "";
      if (readoutRef.current) {
        readoutRef.current.style.width = "";
        readoutRef.current.style.opacity = "";
      }
      if (introRef.current) {
        introRef.current.style.opacity = "";
        introRef.current.style.transform = "";
        introRef.current.style.pointerEvents = "";
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
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-system focus:text-on-system focus:rounded-full text-[14px] font-medium"
      >
        {ui.skipToContent}
      </a>

      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-ground border-b border-rule h-[var(--header-h)] flex items-center justify-between px-5 sm:px-10"
      >
        <a
          ref={wordmarkRef}
          href="#top"
          aria-label="FinTech, back to top"
          className="text-[24px] font-bold leading-none tracking-[-0.04em] select-none opacity-0 motion-reduce:!opacity-100 shrink-0"
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </a>

        <div
          ref={navRef}
          className="flex items-center gap-3 sm:gap-6 opacity-0 pointer-events-none motion-reduce:!opacity-100 motion-reduce:!pointer-events-auto"
        >
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-ink hover:text-system hover:underline underline-offset-4 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact button */}
          <a
            href="#contact"
            className="rounded-full bg-system text-on-system font-medium text-[13px] sm:text-[14px] px-4 py-2 leading-none shrink-0 hover:opacity-95 transition-opacity"
          >
            {contactLabel}
          </a>

          {/* Mobile menu dropdown (< md) */}
          <details ref={menuDetailsRef} className="relative md:hidden">
            <summary
              className="list-none cursor-pointer flex items-center justify-center border border-rule hover:border-system text-ink rounded-full px-3 py-1.5 text-[13px] font-medium select-none [&::-webkit-details-marker]:hidden"
              aria-label={ui.menu}
            >
              {ui.menu}
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-rule rounded-xl p-2 shadow-none z-50 flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className="text-ink text-[14px] px-3 py-2 rounded-lg hover:bg-ground hover:text-system transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </header>

      <main>
        <section
          id="top"
          ref={heroRef}
          className="relative h-[220vh] sm:h-[260vh] pointer-events-none motion-reduce:!mt-0 motion-reduce:!h-auto motion-reduce:!pointer-events-auto"
          style={{ marginTop: "calc(-1 * var(--header-h))" }}
        >
          <div
            ref={stickyBoxRef}
            className="sticky top-0 h-[100svh] overflow-hidden pointer-events-none motion-reduce:!static motion-reduce:!h-auto motion-reduce:!min-h-[calc(100svh-var(--header-h))] motion-reduce:!flex motion-reduce:!flex-col motion-reduce:!justify-end motion-reduce:!p-5 sm:motion-reduce:!p-10 motion-reduce:!overflow-visible motion-reduce:!pointer-events-auto"
          >
            {/* 1. Background ledger lines */}
            <div
              ref={gridRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none motion-reduce:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)",
                backgroundSize: "100% 48px",
                opacity: 0.6,
              }}
            />

            {/* 2. Hints */}
            <div
              ref={hintsRef}
              aria-hidden="true"
              className="absolute top-[84px] sm:top-[100px] left-5 sm:left-10 font-sans text-[13px] text-muted pointer-events-none select-none motion-reduce:hidden flex flex-col gap-1 pr-5 sm:pr-0"
            >
              {hero.hints.map((hint, idx) => (
                <div key={idx}>{hint}</div>
              ))}
            </div>

            {/* 3. Flying word */}
            <div
              ref={wordRef}
              aria-hidden="true"
              className="absolute left-0 top-0 z-[60] whitespace-nowrap font-bold leading-none tracking-[-0.04em] pointer-events-none select-none motion-reduce:hidden [transform-origin:0_0] will-change-transform"
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
              className="absolute bottom-10 sm:bottom-14 left-5 sm:left-10 right-5 sm:right-10 max-w-[1240px] mx-auto opacity-0 pointer-events-none motion-reduce:!static motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!p-0 motion-reduce:!pointer-events-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end pb-8 border-b border-rule">
                <div className="md:col-span-5">
                  <p className="font-sans text-[15px] text-muted mb-2">
                    {hero.eyebrow}
                  </p>
                  <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                    {hero.name}
                  </h1>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[17px] sm:text-[19px] leading-[1.6] text-ink max-w-[65ch]">
                    {hero.paragraph}
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Progress line */}
            <div
              ref={readoutRef}
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] bg-system pointer-events-none motion-reduce:hidden"
              style={{ width: "0%" }}
            />
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
