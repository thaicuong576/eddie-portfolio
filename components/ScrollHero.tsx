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

export function ScrollHero({ children }: { children?: React.ReactNode }) {
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
    const fs = Math.min(0.19 * W, 0.36 * H);

    wordRef.current.style.fontSize = `${fs}px`;
    const ww = wordRef.current.offsetWidth;

    const headerH = headerRef.current ? headerRef.current.offsetHeight : 88;
    heroRef.current.style.marginTop = `-${headerH}px`;

    const wmRect = wordmarkRef.current.getBoundingClientRect();
    const x1 = wmRect.left;
    const y1 = wmRect.top;

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
  };

  const update = () => {
    const s = stateRef.current;
    if (s.H <= 0) return;

    const scrollY = window.scrollY;
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + scrollY
      : 0;

    const p = clamp((scrollY - heroTop) / (2 * s.H));
    const dock = ease(clamp((p - 0.62) / 0.33));

    // 1. Background grid
    if (gridRef.current) {
      gridRef.current.style.opacity = (0.7 * (1 - dock)).toFixed(4);
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
    for (let i = 0; i < LETTERS.length; i++) {
      const span = letterSpansRef.current[i];
      if (!span) continue;

      const lp = clamp((p / 0.55 - i * 0.04) / 0.76);
      const t = ease(lp);
      const r = 1 - t;
      const item = LETTERS[i];
      const tx = item.sx * s.W * r;
      const ty = item.sy * s.H * r;
      const rot = item.rot * r;
      const blur = 14 * r;
      const op = 0.25 + 0.75 * t;

      span.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
      span.style.filter = blur > 0.001 ? `blur(${blur.toFixed(2)}px)` : "none";
      span.style.opacity = op.toFixed(4);
    }

    // 4. Word docking
    const x = s.x0 + (s.x1 - s.x0) * dock;
    const y = s.y0 + (s.y1 - s.y0) * dock;
    const scale = 1 - dock * (1 - 30 / s.fs);

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
      introRef.current.style.transform = `translateY(${((1 - dock) * 24).toFixed(2)}px)`;
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
        className="sticky top-0 z-50 bg-ground border-b border-rule px-5 sm:px-10 sm:h-[88px] flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-0 gap-y-3"
      >
        <a
          ref={wordmarkRef}
          href="#top"
          aria-label="FinTech, back to top"
          className="text-[30px] font-bold leading-none tracking-[-0.045em] select-none opacity-0 motion-reduce:!opacity-100"
        >
          <span className="text-ink">Fin</span>
          <span className="text-system">Tech</span>
        </a>
        <nav
          ref={navRef}
          className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 text-[15px] opacity-0 pointer-events-none motion-reduce:!opacity-100 motion-reduce:!pointer-events-auto"
        >
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
          ref={heroRef}
          className="relative h-[300vh] -mt-[88px] pointer-events-none motion-reduce:!mt-0 motion-reduce:!h-auto motion-reduce:!pointer-events-auto"
        >
          <div
            ref={stickyBoxRef}
            className="sticky top-0 h-screen overflow-hidden pointer-events-none motion-reduce:!static motion-reduce:!h-auto motion-reduce:!min-h-[calc(100vh-88px)] motion-reduce:!flex motion-reduce:!flex-col motion-reduce:!justify-end motion-reduce:!p-10 motion-reduce:!overflow-visible motion-reduce:!pointer-events-auto"
          >
            {/* 1. Background grid */}
            <div
              ref={gridRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none motion-reduce:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                opacity: 0.7,
              }}
            />

            {/* 2. Hints */}
            <div
              ref={hintsRef}
              aria-hidden="true"
              className="absolute top-[120px] left-5 sm:left-10 font-mono text-[12px] uppercase tracking-[0.12em] text-muted pointer-events-none select-none motion-reduce:hidden flex flex-col gap-1 pr-5 sm:pr-0"
            >
              <div>Fin · planning, performance, decisions</div>
              <div>Tech · data, systems, automation</div>
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
              className="absolute bottom-12 left-5 sm:left-10 right-5 sm:right-auto max-w-[760px] flex flex-col gap-4 opacity-0 pointer-events-none motion-reduce:!static motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!p-0 motion-reduce:!pointer-events-auto"
            >
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

            {/* 5. Readout */}
            <div
              ref={readoutRef}
              aria-hidden="true"
              className="absolute bottom-12 right-5 sm:right-10 font-mono text-[13px] text-muted pointer-events-none select-none motion-reduce:hidden"
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
