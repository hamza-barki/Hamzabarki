"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { OWNER_PROFILE } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CAPABILITY_ITEMS = [
  {
    num: "01",
    title: "Business websites",
    sentence:
      "Clear, fast website experiences designed to present your services, establish trust with clients, and turn visits into project inquiries.",
    includes: [
      "Company overviews & team pages",
      "Service catalogs & inquiry forms",
      "Case studies & portfolios",
    ],
  },
  {
    num: "02",
    title: "E-commerce websites",
    sentence:
      "Online stores built for smooth browsing, simple checkouts, and easy product management.",
    includes: [
      "Product catalogs with filters & search",
      "Shopping cart & checkout flows",
      "Digital download delivery for courses & software",
    ],
  },
  {
    num: "03",
    title: "Web applications",
    sentence:
      "Interactive cloud software and portals built to streamline operations and handle daily business work.",
    includes: [
      "User dashboards & activity feeds",
      "Booking & scheduling systems",
      "Customer accounts & permission portals",
    ],
  },
  {
    num: "04",
    title: "Educational websites",
    sentence:
      "Learning portals and academic websites that make course materials and student information easy to access.",
    includes: [
      "Course listings & video lessons",
      "Student & teacher login accounts",
      "Progress tracking & assignment portals",
    ],
  },
  {
    num: "05",
    title: "Specialized websites",
    sentence:
      "Focused websites tailored around the exact daily needs of specific fields.",
    includes: [
      "Online appointment scheduling",
      "Categorized directories & listings",
      "Digital menus & reservation forms",
    ],
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

export function Capabilities() {
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
        id="capabilities"
        className="py-20 sm:py-28 bg-[#F4F6F9] dark:bg-[#0F1A2E] border-b border-[#CBD5E1] dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
      >
        <Container>
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] mb-3">
              (03) WHAT I BUILD
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] break-words">
              <TextReveal text="What I can build" delay={0.05} />{" "}
              <AnimatedWord delay={0.22} className="font-serif italic font-normal text-brand-navy dark:text-white">
                for you.
              </AnimatedWord>
            </h2>
            <p className="text-base sm:text-lg text-[#334155] dark:text-[#B6C2D6] mt-3 leading-relaxed max-w-2xl font-normal">
              <TextReveal
                text="Modern web applications, online platforms, and business tools engineered to solve real problems and run reliably."
                delay={0.15}
                stagger={0.02}
              />
            </p>
          </div>

          {/* Five Big Rows with Thin Lines */}
          <div className="border-b border-[#CBD5E1] dark:border-white/15">
            {CAPABILITY_ITEMS.map((item, idx) => (
              <div
                key={item.num}
                tabIndex={0}
                className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF]"
              >
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

                {/* Desktop hover & keyboard focus: light-blue fill slides in behind row from the left */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute inset-0 bg-[#CFE3FF]/40 dark:bg-[rgba(142,197,255,0.12)] -z-10 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />

                {/* Content Row */}
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
                  className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start px-2 sm:px-4"
                >
                  {/* Left: Big Italic Serif Number with Subtle Hover Accent */}
                  <div className="lg:col-span-1">
                    <span className="font-serif italic text-3xl sm:text-4xl text-[#64748B] dark:text-[#94A3B8] font-normal select-none transition-colors duration-200 group-hover:text-[#1D5FD6] dark:group-hover:text-[#7DB4FF]">
                      {item.num}
                    </span>
                  </div>

                  {/* Middle: Type Name (moves 6px on desktop hover/focus, arrow appears) */}
                  <div className="lg:col-span-5">
                    <h3 className="text-[clamp(1.65rem,4vw,2.25rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] break-words transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-1.5 md:group-focus-visible:translate-x-1.5 motion-reduce:transform-none inline-flex items-center">
                      <span>{item.title}</span>
                      <span
                        aria-hidden="true"
                        className="hidden md:inline-block ml-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 text-[#1D5FD6] dark:text-[#7DB4FF] motion-reduce:opacity-100 motion-reduce:translate-x-0 font-sans"
                      >
                        &rarr;
                      </span>
                    </h3>
                  </div>

                  {/* Right: Sentence and Plain-Text List */}
                  <div className="lg:col-span-6 space-y-3">
                    <p className="text-base text-[#334155] dark:text-[#B6C2D6] leading-relaxed">
                      {item.sentence}
                    </p>
                    <div className="space-y-1 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                        Can include
                      </p>
                      {item.includes.map((inc) => (
                        <p key={inc} className="text-[#334155] dark:text-[#CBD5E1]">
                          • {inc}
                        </p>
                      ))}
                    </div>
                  </div>
                </m.div>
              </div>
            ))}
          </div>

          {/* Section Ending Button */}
          <div className="mt-12 sm:mt-16 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-base text-[#334155] dark:text-[#B6C2D6]">
              Have a specific website in mind?
            </p>
            <a
              href={OWNER_PROFILE.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-[44px] h-12 inline-flex items-center justify-center gap-2 px-7 rounded-full bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[#E6EDF7] dark:hover:bg-white text-white dark:text-[#0F172A] text-base font-bold transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] whitespace-nowrap active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-white dark:text-[#0F172A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
