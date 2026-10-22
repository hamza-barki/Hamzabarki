"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TOOL_GROUPS = [
  {
    category: "What visitors see",
    sentence: "Clean and responsive pages that load fast on any device.",
    tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "The server and the data",
    sentence: "Server code, secure user logins, and database storage.",
    tools: ["Node.js", "Express", "MongoDB", "Firebase"],
  },
  {
    category: "Working and launching",
    sentence: "Version control to track changes and keep code safe.",
    tools: ["Git", "GitHub"],
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

export function ToolsIUse() {
  const isReduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <LazyMotion features={loadFeatures}>
      <section
        id="stack"
        className="py-20 sm:py-28 bg-[#F4F6F9] dark:bg-[#0F1A2E] border-b border-[#CBD5E1] dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
      >
        <Container>
          {/* Section Header */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] mb-3">
              (05) TOOLS
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] break-words">
              <TextReveal text="The tools I use" delay={0.05} />{" "}
              <AnimatedWord delay={0.22} className="font-serif italic font-normal text-brand-navy dark:text-white">
                to build.
              </AnimatedWord>
            </h2>
            <p className="text-base sm:text-lg text-[#334155] dark:text-[#B6C2D6] mt-3 leading-relaxed max-w-2xl font-normal">
              <TextReveal
                text="Reliable technologies I use to build websites, organized by what they do."
                delay={0.15}
                stagger={0.02}
              />
            </p>
          </div>

          {/* Three Full-Width Rows with Thin Lines */}
          <div className="border-b border-[#CBD5E1] dark:border-white/15">
            {TOOL_GROUPS.map((group, idx) => (
              <div key={group.category} className="relative">
                {/* Scroll reveal: top line draws left to right */}
                {isReduced ? (
                  <div className="h-px w-full bg-[#CBD5E1] dark:bg-white/15" />
                ) : (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{
                      scaleX: 1,
                      transition: { duration: 0.8, ease: EASING },
                    }}
                    viewport={{ once: true }}
                    className="h-px w-full bg-[#CBD5E1] dark:bg-white/15 origin-left"
                  />
                )}

                {/* Content Row: text rises 12px (8px on phones) with stagger */}
                <m.div
                  initial={
                    isReduced
                      ? { y: 0, opacity: 1 }
                      : { y: isMobile ? 8 : 12, opacity: 0 }
                  }
                  whileInView={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      delay: idx * 0.08,
                      ease: EASING,
                    },
                  }}
                  viewport={{ once: true }}
                  className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start"
                >
                  {/* Category Name & Plain Sentence */}
                  <div className="lg:col-span-5 space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                      {group.category}
                    </h3>
                    <p className="text-base text-[#334155] dark:text-[#B6C2D6] leading-relaxed">
                      {group.sentence}
                    </p>
                  </div>

                  {/* Tools in Mono with Tactile Micro-Hover Chips */}
                  <div className="lg:col-span-7 flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/5 border border-[#CBD5E1]/70 dark:border-white/10 text-sm sm:text-base font-mono font-medium text-[#0F172A] dark:text-[#E6EDF7] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-[#1D5FD6]/50 dark:hover:border-[#7DB4FF]/50 hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF] cursor-default select-none motion-reduce:transform-none"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </m.div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
