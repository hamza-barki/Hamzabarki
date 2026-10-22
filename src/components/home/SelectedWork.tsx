"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { OWNER_PROFILE } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { SELECTED_WORK_ITEMS } from "@/lib/projects-data";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SelectedWorkDesktopPreview = dynamic(
  () => import("./SelectedWorkDesktopPreview"),
  { ssr: false }
);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function SelectedWork() {
  const isReduced = usePrefersReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!canHover) return;
    setPointerPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section
        id="work"
        className="py-20 sm:py-28 bg-white dark:bg-surface-base border-b border-border-color dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
        onPointerMove={handlePointerMove}
      >
        <Container>
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] mb-3">
              (02) Selected work
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold text-brand-navy dark:text-white tracking-tight leading-[1.15] break-words">
              <TextReveal text="Selected work," delay={0.05} />{" "}
              <AnimatedWord delay={0.22} className="font-serif italic font-normal text-brand-navy dark:text-white">
                two real projects.
              </AnimatedWord>
            </h2>
          </div>

          {/* Two Big Rows Separated by Thin Lines */}
          <div className="border-b border-border-color dark:border-white/15">
            {SELECTED_WORK_ITEMS.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isOtherDimmed = hoveredIndex !== null && hoveredIndex !== idx;
              const isFocused = focusedIndex === idx;

              return (
                <div key={item.slug} className="relative group">
                  {/* Scroll reveal: top line draws left to right */}
                  {isReduced ? (
                    <div className="h-px w-full bg-border-color dark:bg-white/15" />
                  ) : (
                    <m.div
                      initial={{ scaleX: 0 }}
                      whileInView={{
                        scaleX: 1,
                        transition: { duration: 0.8, ease: EASING },
                      }}
                      viewport={{ once: true }}
                      className="h-px w-full bg-border-color dark:bg-white/15 origin-left"
                    />
                  )}

                  {/* The whole row is ONE link */}
                  <Link
                    href={`/projects/${item.slug}`}
                    onPointerEnter={() => {
                      if (canHover) setHoveredIndex(idx);
                    }}
                    onPointerLeave={() => {
                      if (canHover) setHoveredIndex(null);
                    }}
                    onFocus={() => setFocusedIndex(idx)}
                    onBlur={() => setFocusedIndex(null)}
                    className="min-h-[56px] py-10 sm:py-14 block transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-yellow rounded-lg px-2 sm:px-4"
                    aria-label={`${item.title} — ${item.typeLabel}, view case study`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left: Project Name rising from behind a mask */}
                      <div className="overflow-hidden pb-1">
                        {isReduced ? (
                          <span
                            className={`text-[clamp(2.25rem,6vw,4.5rem)] font-[800] tracking-tight leading-none block transition-colors duration-200 ${
                              isOtherDimmed
                                ? "text-slate-600 dark:text-slate-400"
                                : "text-brand-navy dark:text-white"
                            }`}
                          >
                            {item.title}
                          </span>
                        ) : (
                          <m.div
                            initial={{ y: "100%" }}
                            whileInView={{
                              y: 0,
                              transition: { duration: 0.8, ease: EASING },
                            }}
                            viewport={{ once: true }}
                            animate={{
                              x: canHover && isHovered ? 6 : 0,
                              transition: { duration: 0.25, ease: EASING },
                            }}
                          >
                            <span
                              className={`text-[clamp(2.25rem,6vw,4.5rem)] font-[800] tracking-tight leading-none block transition-colors duration-200 ${
                                isOtherDimmed
                                  ? "text-slate-600 dark:text-slate-400"
                                  : "text-brand-navy dark:text-white"
                              }`}
                            >
                              {item.title}
                            </span>
                          </m.div>
                        )}
                      </div>

                      {/* Right: Type, Plain Text Tools & View case study link */}
                      <div className="flex flex-col sm:flex-row sm:items-center lg:items-end lg:flex-col gap-3 lg:text-right">
                        <div className="space-y-1">
                          <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block font-semibold">
                            {item.typeLabel}
                          </span>
                          <p className="text-xs sm:text-sm font-mono text-ink-secondary dark:text-slate-300">
                            {item.tools.join(" · ")}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-[#93C5FD] px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 group-hover:bg-[#1D5FD6] group-hover:text-white dark:group-hover:bg-[#7DB4FF] dark:group-hover:text-[#0B1220] transition-all duration-200 mt-1 shadow-sm">
                          <span>View case study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Keyboard focus static preview card (appears in fixed spot near row) */}
                  {isFocused && !isHovered && (
                    <div
                      className="hidden lg:flex flex-col absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none rounded-2xl bg-white dark:bg-[#0B1F38] p-3 shadow-2xl border border-border-color dark:border-white/10 w-[420px] h-[260px]"
                      style={{ transform: "translateY(-50%) rotate(-5deg)", transformOrigin: "center center" }}
                    >
                      <div className="flex items-center justify-between pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                          {item.title}
                        </span>
                      </div>
                      <div className="relative flex-1 w-full rounded-lg overflow-hidden border border-border-color dark:border-white/10 bg-slate-100 dark:bg-slate-900">
                        <Image
                          src={item.screenshot.src}
                          alt={item.screenshot.alt}
                          fill
                          sizes="420px"
                          priority
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Below the rows: Link to #capabilities + Start a Project WhatsApp button */}
          <div className="mt-12 sm:mt-16 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-base text-ink-secondary dark:text-slate-300">
              I can build other kinds of projects too.{" "}
              <a
                href="#capabilities"
                className="font-bold text-brand-navy dark:text-white underline underline-offset-4 hover:text-brand-blue dark:hover:text-[#93C5FD] transition-colors"
              >
                See everything I build
              </a>
            </p>

            <a
              href={OWNER_PROFILE.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] h-12 inline-flex items-center justify-center px-7 rounded-full bg-[#0B1F38] hover:bg-[#1E293B] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0B1F38] text-base font-bold transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-yellow whitespace-nowrap active:scale-[0.98]"
            >
              Start a Project
            </a>
          </div>
        </Container>

        {/* Dynamic Desktop Hover Floating Preview Card & View Circle */}
        {canHover && !isReduced && hoveredIndex !== null && (
          <SelectedWorkDesktopPreview
            items={SELECTED_WORK_ITEMS}
            hoveredIndex={hoveredIndex}
            pointerPos={pointerPos}
          />
        )}
      </section>
    </LazyMotion>
  );
}
