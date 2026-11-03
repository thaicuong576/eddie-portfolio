"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";

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
  const navRef = useRef<HTMLElement | null>(null);

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
    wmFs: 24,
    headerH: 72,
    lastScore: -1,
    rafId: null as number | null,
  });

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
    const isMobile = W < 640;

    let fs = Math.min(0.19 * W, 0.36 * H);
    wordRef.current.style.fontSize = `${fs}px`;
    let ww = wordRef.current.offsetWidth;
    if (ww > W - 40 && ww > 0) {
      fs = fs * ((W - 40) / ww);
      wordRef.current.style.fontSize = `${fs}px`;
      ww = wordRef.current.offsetWidth;
    }

    const headerH = headerRef.current
      ? headerRef.current.offsetHeight
      : isMobile
      ? 56
      : 72;
    heroRef.current.style.marginTop = `-${headerH}px`;

    const wmRect = wordmarkRef.current.getBoundingClientRect();
    const x1 = wmRect.left;
    const y1 = wmRect.top;

    const wmComputed = window.getComputedStyle(wordmarkRef.current);
    const wmFs = parseFloat(wmComputed.fontSize) || (isMobile ? 22 : 26);

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
    s.wmFs = wmFs;
    s.headerH = headerH;
  };

  const update = () => {
    const s = stateRef.current;
    if (s.H <= 0) return;

    const scrollY = window.scrollY;
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + scrollY
      : 0;

    const isMobile = s.W < 640;
    const trackDistance = isMobile ? 1.2 * s.H : 2.0 * s.H;
    const p = clamp((scrollY - heroTop) / trackDistance);
    const dock = ease(clamp((p - 0.62) / 0.33));

    // Single hairline border appears on header when word docks
    if (headerRef.current) {
      headerRef.current.style.borderBottomColor =
        dock >= 1 ? "var(--color-rule)" : "transparent";
    }

    // 1. Background grid
    if (gridRef.current) {
      gridRef.current.style.opacity = (0.35 * (1 - dock)).toFixed(4);
    }

    // 2. Hints & Readout
    const hp = clamp(1 - 4 * p);
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
    const scatterScale = isMobile ? 0.6 : 1.0;
    const maxBlur = isMobile ? 2 : 4;
    for (let i = 0; i < LETTERS.length; i++) {
      const span = letterSpansRef.current[i];
      if (!span) continue;

      const lp = clamp((p / 0.55 - i * 0.04) / 0.76);
      const t = ease(lp);
      const r = 1 - t;
      const item = LETTERS[i];
      const tx = item.sx * s.W * r * scatterScale;
      const ty = item.sy * s.H * r * scatterScale;
      const rot = item.rot * r * (isMobile ? 0.6 : 1.0);
      const blurProgress = clamp(1 - lp / 0.6);
      const blur = maxBlur * blurProgress;
      const op = 0.55 + 0.45 * t;

      span.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
      span.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
      span.style.opacity = op.toFixed(4);
    }

    // 4. Word docking
    const x = s.x0 + (s.x1 - s.x0) * dock;
    const y = s.y0 + (s.y1 - s.y0) * dock;
    const scale = 1 - dock * (1 - s.wmFs / s.fs);

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
    const navOp = clamp((dock - 0.5) * 2);
    if (navRef.current) {
      navRef.current.style.opacity = navOp.toFixed(4);
      navRef.current.style.pointerEvents = navOp > 0 ? "auto" : "none";
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

      if (headerRef.current) headerRef.current.style.borderBottomColor = "";
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
      if (readoutRef.current) readoutRef.current.style.opacity = "";
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
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-ground/95 backdrop-blur-sm border-b border-transparent px-4 sm:px-10 h-[56px] sm:h-[72px] flex items-center justify-between gap-3 motion-reduce:!border-rule"
      >
        <a
          ref={wordmarkRef}
          href="#top"
          aria-label="FinTech, back to top"
          className="text-[22px] sm:text-[26px] font-bold leading-none tracking-[-0.045em] select-none shrink-0 opacity-0 motion-reduce:!opacity-100"
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </a>
        <nav
          ref={navRef}
          className="flex items-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] min-w-0 overflow-x-auto flex-nowrap whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 opacity-0 pointer-events-none motion-reduce:!opacity-100 motion-reduce:!pointer-events-auto"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-ink hover:text-system transition-colors shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-system text-on-system font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-[13px] leading-none shrink-0 hover:bg-system/90 transition-colors"
          >
            {contactLabel}
          </a>
        </nav>
      </header>

      <main>
        <section
          id="top"
          ref={heroRef}
          className="relative h-[220vh] sm:h-[300vh] pointer-events-none motion-reduce:!mt-0 motion-reduce:!h-auto motion-reduce:!pointer-events-auto"
        >
          <div
            ref={stickyBoxRef}
            className="sticky top-0 h-screen overflow-hidden pointer-events-none motion-reduce:!static motion-reduce:!h-auto motion-reduce:!min-h-[calc(100vh-var(--header-h,72px))] motion-reduce:!flex motion-reduce:!flex-col motion-reduce:!justify-end motion-reduce:!px-4 sm:motion-reduce:!px-10 motion-reduce:!py-12 motion-reduce:!overflow-visible motion-reduce:!pointer-events-auto"
          >
            {/* 1. Background grid */}
            <div
              ref={gridRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none motion-reduce:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                opacity: 0.35,
              }}
            />

            {/* 2. Hints */}
            <div
              ref={hintsRef}
              aria-hidden="true"
              className="absolute top-[80px] sm:top-[110px] left-4 sm:left-10 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-muted pointer-events-none select-none motion-reduce:hidden flex flex-col gap-1.5 pr-4 sm:pr-0"
            >
              {hero.hints.map((hint, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-1 h-1 rounded-full bg-system/60 inline-block"
                    aria-hidden="true"
                  />
                  <span>{hint}</span>
                </div>
              ))}
            </div>

            {/* 3. Flying word */}
            <div
              ref={wordRef}
              aria-hidden="true"
              className="absolute left-0 top-0 z-[60] whitespace-nowrap font-bold leading-none tracking-[-0.045em] pointer-events-none select-none motion-reduce:hidden [transform-origin:0_0] will-change-transform"
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
              className="absolute bottom-8 sm:bottom-12 left-4 sm:left-10 right-4 sm:right-auto max-w-[760px] flex flex-col gap-3 sm:gap-4 opacity-0 pointer-events-none motion-reduce:!static motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!p-0 motion-reduce:!pointer-events-auto"
            >
              <div className="w-12 h-px bg-rule mb-1" aria-hidden="true" />
              <p className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium">
                {hero.eyebrow}
              </p>
              <h1 className="text-[34px] sm:text-[54px] lg:text-[62px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
                {hero.name}
              </h1>
              <p className="text-[17px] sm:text-[20px] leading-[1.5] text-muted max-w-[660px]">
                {hero.paragraph}
              </p>
            </div>

            {/* 5. Readout */}
            <div
              ref={readoutRef}
              aria-hidden="true"
              className="absolute bottom-8 sm:bottom-12 right-4 sm:right-10 font-mono text-[12px] sm:text-[13px] text-muted pointer-events-none select-none motion-reduce:hidden tabular-nums"
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
