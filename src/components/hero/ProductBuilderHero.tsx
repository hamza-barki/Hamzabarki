"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { OWNER_PROFILE } from "@/lib/constants";
import { useIntro } from "@/components/ui/IntroLoader";
import { TextReveal } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EXPERIENCES_CHARS = ["E", "X", "P", "E", "R", "I", "E", "N", "C", "E", "S", "."];

const TICKER_ITEMS = [
  "Websites",
  "Online stores",
  "Web apps",
  "Dashboards",
  "Learning platforms",
];

const TICKER_STRING = TICKER_ITEMS.join(" — ") + " — ";

export function ProductBuilderHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { introComplete } = useIntro();

  // Reduced motion detection
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  // Detect whether intro loader is active
  const [heroReady, setHeroReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const isPlay = document.documentElement.getAttribute("data-intro") === "play";
      return !isPlay;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setShouldReduceMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    if (introComplete) {
      setHeroReady(true);
    }
  }, [introComplete]);

  useEffect(() => {
    const handleIntroFinished = () => setHeroReady(true);
    window.addEventListener("intro-finished", handleIntroFinished);
    return () => window.removeEventListener("intro-finished", handleIntroFinished);
  }, []);

  // Detect device characteristics
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    const checkPointer = () => {
      setIsFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    };

    checkMobile();
    checkPointer();

    const mqlMobile = window.matchMedia("(max-width: 767px)");
    const mqlPointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    mqlMobile.addEventListener("change", checkMobile);
    mqlPointer.addEventListener("change", checkPointer);

    return () => {
      mqlMobile.removeEventListener("change", checkMobile);
      mqlPointer.removeEventListener("change", checkPointer);
    };
  }, []);

  // Standard cubic bezier easing for entrance motion
  const cubicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Timing helper
  const getDelay = useCallback(
    (desktopSec: number) =>
      isMobile ? Number((desktopSec * 0.7).toFixed(3)) : desktopSec,
    [isMobile]
  );
  const getDuration = useCallback(
    (desktopDur: number) =>
      isMobile ? Number((desktopDur * 0.7).toFixed(3)) : desktopDur,
    [isMobile]
  );

  // Pointer position normalized to [-1, 1]
  const [pointerNorm, setPointerNorm] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isFinePointer || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointerNorm({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const handlePointerLeave = () => {
    setPointerNorm({ x: 0, y: 0 });
  };

  // Button magnetic pull
  const [btnOffset, setBtnOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFinePointer || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    setBtnOffset({
      x: Math.max(-8, Math.min(8, x)),
      y: Math.max(-8, Math.min(8, y)),
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  // Scroll position tracking for parallax & drift
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll progress through hero (0 to 1 over first 700px)
  const heroScrollProgress = Math.min(1, Math.max(0, scrollY / 700));

  // Desktop transforms:
  // Text layers: max 14px pointer parallax + max 40px scroll drift
  const pX = isFinePointer && !isMobile && !shouldReduceMotion ? pointerNorm.x : 0;
  const pY = isFinePointer && !isMobile && !shouldReduceMotion ? pointerNorm.y : 0;

  const leftTextDrift = -40 * heroScrollProgress;
  const rightTextDrift = 40 * heroScrollProgress;

  const leftComputedX = Number((pX * -14 + (!isMobile && !shouldReduceMotion ? leftTextDrift : 0)).toFixed(2));
  const rightComputedX = Number((pX * 14 + (!isMobile && !shouldReduceMotion ? rightTextDrift : 0)).toFixed(2));

  // Portrait: max 8px pointer parallax + scale 1 to 0.96
  const portraitComputedX = Number((pX * 8).toFixed(2));
  const portraitComputedY = Number((pY * 8).toFixed(2));
  const portraitComputedScale = Number((1 - 0.04 * (!isMobile && !shouldReduceMotion ? heroScrollProgress : 0)).toFixed(3));

  // Ticker fade on scroll: 1 to 0.35
  const tickerOpacity = Number((!shouldReduceMotion && !isMobile ? Math.max(0.35, 1 - 0.65 * (scrollY / 560)) : 1).toFixed(2));

  // Mobile scroll lift: max 12px
  const phoneLift = isMobile && !shouldReduceMotion ? Number((-12 * heroScrollProgress).toFixed(2)) : 0;
  const phoneOpacity = isMobile && !shouldReduceMotion ? Number((1 - 0.18 * heroScrollProgress).toFixed(2)) : 1;

  return (
    <LazyMotion features={loadFeatures}>
      <section
        ref={heroRef}
        aria-label="Hero Introduction"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex flex-col justify-between overflow-x-clip bg-gradient-to-b from-[#F4F6F9] to-[#FFFFFF] dark:from-[#0B1220] dark:to-[#0F1A2E] text-[#0F172A] dark:text-[#E6EDF7] min-h-[calc(100svh-5rem)] border-b border-[#CBD5E1] dark:border-[rgba(255,255,255,0.14)]"
      >
        {/* Single accessible semantic h1 for screen readers & SEO */}
        <h1 className="sr-only">I turn ideas into digital experiences.</h1>

        {/* 0.00 Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
        >
          {/* Desktop soft light-blue radial glow */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={heroReady ? { opacity: 1 } : shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : { delay: 0, duration: 0.8, ease: cubicEase }
            }
            className="hidden sm:block w-[620px] h-[620px] rounded-full bg-[#BFDBFE]/60 dark:bg-[rgba(142,197,255,0.18)] blur-[95px]"
          />
          {/* Mobile CSS radial gradient (static opacity, zero blur filter for smooth 60fps) */}
          <div className="sm:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(191,219,254,0.6)_0%,rgba(207,227,255,0.22)_45%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_50%_35%,rgba(142,197,255,0.16)_0%,transparent_70%)]" />
        </div>

        {/* Main Unified Hero Container — exactly aligned with Navbar max-w-6xl container */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 flex-1 flex flex-col justify-between md:justify-center">
          <div
            style={
              isMobile && !shouldReduceMotion
                ? {
                    transform: `translateY(${phoneLift}px)`,
                    opacity: phoneOpacity,
                  }
                : undefined
            }
            className="relative w-full mx-auto flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center"
          >
            {/* =================================================================== */}
            {/* 1. PORTRAIT ARCH (Single DOM element, shared across mobile & desktop)*/}
            {/* =================================================================== */}
            <div
              id="hero-portrait-layer"
              style={
                !shouldReduceMotion && !isMobile
                  ? {
                      transform: `translate(${portraitComputedX}px, ${portraitComputedY}px) scale(${portraitComputedScale})`,
                      transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }
                  : undefined
              }
              className="order-1 md:order-none md:col-start-2 md:row-start-1 relative justify-self-center shrink-0 z-10 mb-3 sm:mb-5 md:mb-0"
            >
              {/* Responsive Tall Arch: 64vw max 230px on mobile, 360x520px on desktop */}
              <div className="relative w-[64vw] max-w-[230px] sm:max-w-[260px] md:max-w-none md:w-[280px] lg:w-[320px] xl:w-[360px] h-[260px] sm:h-[310px] md:h-[420px] lg:h-[480px] xl:h-[520px]">
                {/* 0.10 Portrait clip-path reveal from bottom up (1.1s) */}
                <m.div
                  initial={
                    shouldReduceMotion
                      ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                      : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
                  }
                  animate={
                    heroReady
                      ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                      : shouldReduceMotion
                      ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                      : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.2 }
                      : {
                          delay: getDelay(0.1),
                          duration: getDuration(1.1),
                          ease: cubicEase,
                        }
                  }
                  className="relative w-full h-full rounded-t-full overflow-hidden border-t border-x border-white/80 dark:border-white/20 border-b-0 shadow-[0_20px_50px_rgba(29,95,214,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#CFE3FF] via-[#BFDBFE] to-[#DCEBFF] dark:from-[rgba(142,197,255,0.25)] dark:to-[rgba(142,197,255,0.10)] [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)]"
                >
                  {/* Photo container */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hamza-editorial.webp"
                      alt="Portrait of Hamza Barki"
                      fill
                      priority
                      sizes="(max-width: 1023px) 64vw, 360px"
                      quality={85}
                      className="object-cover object-[center_12%]"
                    />
                  </div>
                </m.div>

                {/* 1.50 Rotating Circular Badge near top-right of portrait */}
                <m.div
                  initial={
                    shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }
                  }
                  animate={
                    heroReady
                      ? { scale: 1, opacity: 1 }
                      : shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.2 }
                      : {
                          delay: getDelay(1.5),
                          duration: getDuration(0.6),
                          ease: cubicEase,
                        }
                  }
                  className="absolute -top-2 -right-3 md:-top-3 md:-right-6 lg:-right-10 w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[92px] md:h-[92px] lg:w-[102px] lg:h-[102px] xl:w-[108px] xl:h-[108px] rounded-full bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.22)] border border-white/80 dark:border-white/20 shadow-[0_4px_16px_rgba(29,95,214,0.12)] z-30 flex items-center justify-center select-none"
                >
                  {/* Screen reader availability text */}
                  <span className="sr-only">{OWNER_PROFILE.availability.status}</span>

                  {/* Circular Rotating Text (24s continuous loop) */}
                  <div
                    aria-hidden="true"
                    style={
                      heroReady && !shouldReduceMotion
                        ? { animation: "spin 24s linear infinite" }
                        : { animation: "none", transform: "none" }
                    }
                    className="w-full h-full pointer-events-none"
                  >
                    <svg viewBox="0 0 108 108" className="w-full h-full">
                      <path
                        id="badge-path"
                        d="M 54, 54 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
                        fill="none"
                      />
                      <text className="font-mono font-medium text-[8px] uppercase tracking-[0.155em] fill-[#0F172A] dark:fill-[#E6EDF7]">
                        <textPath href="#badge-path" startOffset="0%">
                          AVAILABLE FOR SELECTED PROJECTS —&nbsp;
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Plus Sign in the center */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[#0F172A] dark:text-[#E6EDF7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </m.div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* 2. LEFT FLANK: "I TURN" & "IDEAS" (One line on mobile, stacked desktop)*/}
            {/* =================================================================== */}
            <div
              id="hero-left-text-layer"
              aria-hidden="true"
              style={
                !shouldReduceMotion && !isMobile
                  ? {
                      transform: `translateX(${leftComputedX}px)`,
                      transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }
                  : undefined
              }
              className="order-2 md:order-none md:col-start-1 md:row-start-1 self-center justify-self-center md:justify-self-end text-center md:text-right md:pr-4 lg:pr-6 xl:pr-10 select-none z-10 w-full md:w-auto"
            >
              <div className="font-extrabold uppercase font-sans tracking-[-0.04em] text-[#0F172A] dark:text-[#E6EDF7] text-[clamp(1.75rem,8.2vw,2.75rem)] md:text-[54px] lg:text-[76px] xl:text-[96px] 2xl:text-[104px] leading-tight md:leading-[0.88]">
                {/* Line 1: "I TURN" */}
                <div className="inline-block md:block overflow-hidden mr-2.5 md:mr-0">
                  <m.div
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "115%" }}
                    animate={
                      heroReady ? { y: 0 } : shouldReduceMotion ? { y: 0 } : { y: "115%" }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            delay: getDelay(0.5),
                            duration: getDuration(0.8),
                            ease: cubicEase,
                          }
                    }
                    className="inline-block md:block"
                  >
                    I TURN
                  </m.div>
                </div>
                {/* Line 2: "IDEAS" */}
                <div className="inline-block md:block overflow-hidden md:mt-1">
                  <m.div
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "115%" }}
                    animate={
                      heroReady ? { y: 0 } : shouldReduceMotion ? { y: 0 } : { y: "115%" }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            delay: getDelay(0.6),
                            duration: getDuration(0.8),
                            ease: cubicEase,
                          }
                    }
                    className="inline-block md:block"
                  >
                    IDEAS
                  </m.div>
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* 3. RIGHT FLANK: "into" & "digital"                                 */}
            {/* =================================================================== */}
            <div
              id="hero-right-text-layer"
              aria-hidden="true"
              style={
                !shouldReduceMotion && !isMobile
                  ? {
                      transform: `translateX(${rightComputedX}px)`,
                      transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }
                  : undefined
              }
              className="order-3 md:order-none md:col-start-3 md:row-start-1 self-center justify-self-center md:justify-self-start text-center md:text-left md:pl-4 lg:pl-6 xl:pl-10 select-none z-10 w-full md:w-auto mt-0.5 md:mt-0"
            >
              <div className="font-serif italic text-[clamp(2.1rem,10.2vw,3.5rem)] md:text-[64px] lg:text-[88px] xl:text-[112px] 2xl:text-[124px] leading-none md:leading-[0.85]">
                {/* "into" in deep blue #1D5FD6 */}
                <div className="inline-block md:block overflow-hidden mr-2.5 md:mr-0">
                  <m.div
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
                    animate={
                      heroReady
                        ? { y: 0, opacity: 1 }
                        : shouldReduceMotion
                        ? { y: 0, opacity: 1 }
                        : { y: 32, opacity: 0 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            delay: getDelay(0.65),
                            duration: getDuration(0.8),
                            ease: cubicEase,
                          }
                    }
                    className="inline-block md:block text-[#1D5FD6] dark:text-[#7DB4FF]"
                  >
                    into
                  </m.div>
                </div>
                {/* "digital" in ink */}
                <div className="inline-block md:block overflow-hidden md:mt-1">
                  <m.div
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
                    animate={
                      heroReady
                        ? { y: 0, opacity: 1 }
                        : shouldReduceMotion
                        ? { y: 0, opacity: 1 }
                        : { y: 32, opacity: 0 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            delay: getDelay(0.75),
                            duration: getDuration(0.8),
                            ease: cubicEase,
                          }
                    }
                    className="inline-block md:block text-[#0F172A] dark:text-[#E6EDF7]"
                  >
                    digital
                  </m.div>
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* 4. OVERLAPPING BASE: "EXPERIENCES." (Overlaps the arch base)       */}
            {/* =================================================================== */}
            <div
              aria-hidden="true"
              className="order-4 md:order-none md:col-span-3 md:row-start-2 relative mt-0.5 md:-mt-12 lg:-mt-16 xl:lg:-mt-20 2xl:lg:-mt-24 text-center z-20 select-none pointer-events-none"
            >
              <div
                style={{
                  paintOrder: "stroke fill",
                  WebkitTextStroke: "2.5px var(--hero-stroke, #FFFFFF)",
                }}
                className="hero-experiences-text relative inline-block font-extrabold font-sans uppercase text-[#1D5FD6] dark:text-[#7DB4FF] text-[clamp(2.15rem,10.4vw,3.75rem)] md:text-[96px] lg:text-[132px] xl:lg:text-[158px] 2xl:lg:text-[172px] tracking-tight leading-none md:leading-[0.82]"
              >
                {/* On phones: reveal as one block for high frame-rate (>45fps). On desktop: letter-by-letter reveal */}
                {isMobile ? (
                  <div className="overflow-hidden inline-block">
                    <m.span
                      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
                      animate={
                        heroReady ? { y: 0, opacity: 1 } : shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.2 }
                          : {
                              delay: getDelay(0.9),
                              duration: getDuration(0.75),
                              ease: cubicEase,
                            }
                      }
                      className="inline-block"
                    >
                      EXPERIENCES.
                    </m.span>
                  </div>
                ) : (
                  <div className="relative overflow-hidden inline-flex items-baseline">
                    {EXPERIENCES_CHARS.map((char, index) => (
                      <span key={index} className="inline-block overflow-hidden">
                        <m.span
                          initial={shouldReduceMotion ? { y: 0 } : { y: "120%" }}
                          animate={
                            heroReady ? { y: 0 } : shouldReduceMotion ? { y: 0 } : { y: "120%" }
                          }
                          transition={
                            shouldReduceMotion
                              ? { duration: 0.2 }
                              : {
                                  delay: 1.0 + index * 0.035,
                                  duration: 0.75,
                                  ease: cubicEase,
                                }
                          }
                          className="inline-block"
                        >
                          {char}
                        </m.span>
                      </span>
                    ))}

                    {/* 1.15-2.10 Soft light sweep visible at ~1.5s on desktop (once only, soft light-blue moving left to right) */}
                    {!shouldReduceMotion && (
                      <m.span
                        aria-hidden="true"
                        initial={{ x: "-110%", opacity: 0 }}
                        animate={
                          heroReady
                            ? { x: "240%", opacity: [0, 0.9, 0.9, 0] }
                            : { x: "-110%", opacity: 0 }
                        }
                        transition={{
                          delay: 1.15,
                          duration: 0.95,
                          ease: cubicEase,
                        }}
                        className="pointer-events-none absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-[#93C5FD]/70 dark:via-[#93C5FD]/85 to-transparent -skew-x-12 z-20"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* =================================================================== */}
            {/* 5. PARAGRAPH (Bottom left on desktop/tablet, centered on mobile)   */}
            {/* =================================================================== */}
            <m.div
              initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              animate={
                heroReady
                  ? { y: 0, opacity: 1 }
                  : shouldReduceMotion
                  ? { y: 0, opacity: 1 }
                  : { y: 16, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : {
                      delay: getDelay(1.7),
                      duration: getDuration(0.6),
                      ease: cubicEase,
                    }
              }
              className="order-5 md:order-none md:col-start-1 md:row-start-3 text-center md:text-left max-w-[340px] md:max-w-[210px] lg:max-w-[380px] xl:max-w-[420px] mt-2.5 sm:mt-4 md:mt-0 pt-0 md:pt-6 md:justify-self-start"
            >
              <p className="text-base md:text-sm lg:text-base text-[#334155] dark:text-[#B6C2D6] font-medium leading-relaxed">
                <span className="md:hidden">
                  <TextReveal
                    text="I build websites and custom software that help businesses work smarter."
                    delay={getDelay(1.7)}
                    stagger={0.025}
                  />
                </span>
                <span className="hidden md:inline">
                  <TextReveal
                    text="I build websites and custom software that help businesses work smarter and turn ideas into useful digital products."
                    delay={getDelay(1.7)}
                    stagger={0.02}
                  />
                </span>
              </p>
            </m.div>

            {/* =================================================================== */}
            {/* 6. TWO BUTTONS (Bottom center on desktop, stacked/row on mobile)   */}
            {/* =================================================================== */}
            <m.div
              initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              animate={
                heroReady
                  ? { y: 0, opacity: 1 }
                  : shouldReduceMotion
                  ? { y: 0, opacity: 1 }
                  : { y: 16, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : {
                      delay: getDelay(1.9),
                      duration: getDuration(0.6),
                      ease: cubicEase,
                    }
              }
              className="order-6 md:order-none md:col-start-2 md:row-start-3 flex items-center justify-center gap-2.5 sm:gap-3.5 md:gap-2.5 lg:gap-4 w-full max-w-[360px] md:max-w-none mt-3.5 sm:mt-4 md:mt-0 pt-0 md:pt-6"
            >
              {/* Primary "Start a Project" Button (Magnetic pull at most 8px on desktop) */}
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={
                  !shouldReduceMotion && !isMobile
                    ? {
                        transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                        transition: "transform 0.15s ease-out",
                      }
                    : undefined
                }
                className="group relative flex-1 md:flex-initial inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-4 sm:px-6 md:px-4 lg:px-8 rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] dark:bg-[#E6EDF7] dark:text-[#0F172A] dark:hover:bg-white text-[13px] sm:text-sm md:text-xs lg:text-base font-semibold transition-colors duration-200 shadow-[0_2px_8px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] whitespace-nowrap active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              {/* Outline "Explore My Work" Button */}
              <a
                href="#work"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-4 sm:px-5 md:px-3.5 lg:px-7 rounded-full border border-[#CBD5E1] dark:border-[rgba(255,255,255,0.22)] bg-transparent text-[#0F172A] dark:text-[#E6EDF7] hover:bg-[#0F172A]/5 dark:hover:bg-white/10 text-[13px] sm:text-sm md:text-xs lg:text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] whitespace-nowrap active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </m.div>

            {/* =================================================================== */}
            {/* 7. BOTTOM RIGHT: SCROLL CUE (Desktop/Tablet) / AVAILABILITY (Mobile)*/}
            {/* =================================================================== */}
            <m.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={
                heroReady ? { opacity: 1 } : shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : {
                      delay: getDelay(2.1),
                      duration: getDuration(0.5),
                      ease: cubicEase,
                    }
              }
              className="order-7 md:order-none md:col-start-3 md:row-start-3 text-center md:text-right font-mono text-[#475569] dark:text-[#94A3B8] text-xs font-medium tracking-wider select-none mt-3 sm:mt-4 md:mt-0 pt-0 md:pt-6 md:justify-self-end"
            >
              {/* Desktop/Tablet scroll cue */}
              <div className="hidden md:block">
                <div>SCROLL</div>
                <div className="mt-0.5 text-[11px] opacity-80">01 / 06</div>
              </div>
              {/* Mobile availability text line */}
              <div className="md:hidden text-[11px] uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                AVAILABLE FOR SELECTED PROJECTS
              </div>
            </m.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FULL-WIDTH TICKER STRIP AT THE VERY BOTTOM OF FIRST SCREEN                */}
        {/* ========================================================================= */}
        <div
          aria-hidden="true"
          style={!shouldReduceMotion && !isMobile ? { opacity: tickerOpacity } : undefined}
          className="w-full shrink-0 overflow-hidden bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.18)] border-t border-[#BFDBFE] dark:border-[rgba(255,255,255,0.10)] select-none transition-opacity duration-150"
        >
          <div className="hero-ticker-track py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#0F172A] dark:text-[#E6EDF7] whitespace-nowrap">
            <span className="px-4">{TICKER_STRING + TICKER_STRING + TICKER_STRING}</span>
            <span className="px-4">{TICKER_STRING + TICKER_STRING + TICKER_STRING}</span>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
