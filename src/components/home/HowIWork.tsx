"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Talk",
    desc: "I listen to your goals, learn about your users, and understand what you want to build.",
  },
  {
    step: "02",
    title: "Plan",
    desc: "I organize the pages, content structure, and features before writing code.",
  },
  {
    step: "03",
    title: "Design",
    desc: "I create simple, clean layouts focused on readability and ease of use on every screen.",
  },
  {
    step: "04",
    title: "Build and test",
    desc: "I write clean code and test every feature on phones, tablets, and computers.",
  },
  {
    step: "05",
    title: "Launch and support",
    desc: "I publish the website to fast hosting and make sure everything runs smoothly.",
  },
];

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

export function HowIWork() {
  const isReduced = usePrefersReducedMotion();

  return (
    <LazyMotion features={loadFeatures}>
      <section
        id="process"
        className="py-20 sm:py-28 bg-white dark:bg-[#0B1220] border-b border-[#CBD5E1] dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
      >
        <Container>
          {/* Section Header */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] mb-3">
              (04) PROCESS
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] break-words">
              <TextReveal text="How I work," delay={0.05} />{" "}
              <AnimatedWord delay={0.22} className="font-serif italic font-normal text-brand-navy dark:text-white">
                step by step.
              </AnimatedWord>
            </h2>
            <p className="text-base sm:text-lg text-[#334155] dark:text-[#B6C2D6] mt-3 leading-relaxed max-w-2xl font-normal">
              <TextReveal
                text="How I take a project from an early idea to a finished, working website."
                delay={0.15}
                stagger={0.02}
              />
            </p>
          </div>

          {/* Desktop Horizontal Timeline (md and up) */}
          <div className="hidden md:block relative">
            {/* The single connecting line that draws from left to right, ending at the last marker */}
            <div className="absolute top-6 left-[10%] right-[10%] h-[2px] overflow-hidden pointer-events-none z-0">
              {isReduced ? (
                <div className="w-full h-full bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.30)]" />
              ) : (
                <m.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASING }}
                  className="w-full h-full bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.30)] origin-left"
                />
              )}
            </div>

            {/* Five Step Markers and Descriptions */}
            <div className="grid grid-cols-5 gap-6 lg:gap-8 relative z-10">
              {PROCESS_STEPS.map((item, idx) => (
                <m.div
                  key={item.step}
                  initial={
                    isReduced
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 12, scale: 0.9 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.55,
                      delay: idx * 0.12,
                      ease: EASING,
                    },
                  }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center text-center cursor-default"
                >
                  {/* Light-blue circular marker with large italic serif number */}
                  <div className="w-12 h-12 rounded-full bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.22)] border-2 border-[#1D5FD6]/30 dark:border-[#7DB4FF]/40 text-[#0F172A] dark:text-white flex items-center justify-center shadow-sm select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[#1D5FD6] dark:group-hover:border-[#7DB4FF] group-hover:shadow-md">
                    <span className="font-serif italic text-lg font-bold transition-transform duration-200 group-hover:scale-105">
                      {item.step}
                    </span>
                  </div>

                  {/* Step title */}
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mt-5 mb-2 transition-colors duration-200 group-hover:text-[#1D5FD6] dark:group-hover:text-[#7DB4FF]">
                    {item.title}
                  </h3>

                  {/* One plain sentence */}
                  <p className="text-base text-[#334155] dark:text-[#B6C2D6] leading-relaxed">
                    {item.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline (below md) */}
          <div className="md:hidden relative pl-8">
            {/* Vertical connecting line that draws from top to bottom, ending at the last marker */}
            <div className="absolute top-6 bottom-6 left-6 -ml-px w-[2px] overflow-hidden pointer-events-none z-0">
              {isReduced ? (
                <div className="w-full h-full bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.30)]" />
              ) : (
                <m.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASING }}
                  className="w-full h-full bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.30)] origin-top"
                />
              )}
            </div>

            {/* Vertical Steps */}
            <div className="space-y-10 relative z-10">
              {PROCESS_STEPS.map((item, idx) => (
                <m.div
                  key={item.step}
                  initial={
                    isReduced
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 8, scale: 0.92 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: EASING,
                    },
                  }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-4 group"
                >
                  {/* Circular marker on left (-ml-8 aligns center with vertical line at left-6) */}
                  <div className="-ml-8 shrink-0 w-12 h-12 rounded-full bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.22)] border-2 border-[#1D5FD6]/30 dark:border-[#7DB4FF]/40 text-[#0F172A] dark:text-white flex items-center justify-center shadow-sm select-none transition-all duration-300 group-hover:scale-105 group-hover:border-[#1D5FD6]">
                    <span className="font-serif italic text-lg font-bold">
                      {item.step}
                    </span>
                  </div>

                  {/* Title and sentence on right */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1.5 transition-colors duration-200 group-hover:text-[#1D5FD6] dark:group-hover:text-[#7DB4FF]">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#334155] dark:text-[#B6C2D6] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
