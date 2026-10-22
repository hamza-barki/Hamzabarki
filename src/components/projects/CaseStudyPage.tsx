"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CaseStudyProject } from "@/types/project";
import { OWNER_PROFILE } from "@/lib/constants";
import { ArrowLeft, MessageCircle } from "lucide-react";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CaseStudyPageProps {
  project: CaseStudyProject;
}

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const [mounted, setMounted] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [frameAnimDone, setFrameAnimDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mqReduced.matches);
    const handlerReduced = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mqReduced.addEventListener("change", handlerReduced);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mqReduced.removeEventListener("change", handlerReduced);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const shouldAnimate = mounted && !isReduced;

  return (
    <LazyMotion features={loadFeatures}>
      <div className="flex min-h-screen flex-col bg-surface-base selection:bg-brand-navy selection:text-brand-yellow">
        <Navbar />

        <main id="main-content" className="flex-1 py-12 sm:py-16 md:py-20">
          <Container className="w-full">
            {/* 1. Header & Back Link */}
            <div className="space-y-6">
              <Link
                href="/#work"
                className="min-h-[44px] inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-brand-navy dark:text-brand-yellow hover:text-brand-blue dark:hover:text-white px-4 py-2 rounded-full border border-[#CBD5E1] dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>All work</span>
              </Link>

              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] mb-3">
                  {project.numberLabel} — {project.typeLabel}
                </p>

                {/* Project title: clamp(3.25rem, 10vw, 9.5rem) in Plus Jakarta Sans 800 with tight tracking */}
                <div className="overflow-hidden pb-1">
                  {shouldAnimate ? (
                    <m.h1
                      initial={
                        isMobile
                          ? { opacity: 0, y: 16 }
                          : { opacity: 0, y: "100%" }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: isMobile ? 0.6 : 0.85,
                          ease: EASING,
                        },
                      }}
                      className="text-[clamp(3.25rem,10vw,9.5rem)] font-sans font-[800] tracking-[-0.035em] leading-[0.98] break-words text-brand-navy dark:text-white"
                    >
                      {project.title}
                    </m.h1>
                  ) : (
                    <h1 className="text-[clamp(3.25rem,10vw,9.5rem)] font-sans font-[800] tracking-[-0.035em] leading-[0.98] break-words text-brand-navy dark:text-white">
                      {project.title}
                    </h1>
                  )}
                </div>
              </div>

              {/* Summary sentence */}
              {shouldAnimate ? (
                <m.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.15, ease: EASING },
                  }}
                  className="text-lg sm:text-xl md:text-2xl text-ink-secondary dark:text-slate-200 leading-relaxed max-w-3xl font-normal"
                >
                  {project.summary}
                </m.p>
              ) : (
                <p className="text-lg sm:text-xl md:text-2xl text-ink-secondary dark:text-slate-200 leading-relaxed max-w-3xl font-normal">
                  {project.summary}
                </p>
              )}

              {/* Facts row: four columns across the full container, two by two on phones */}
              {shouldAnimate ? (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.25 },
                  }}
                  className="pt-6 border-t border-border-color dark:border-white/15 w-full"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2 w-full">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        My role
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Type
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.type}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Status
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Tools
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.tools}
                      </span>
                    </div>
                  </div>
                </m.div>
              ) : (
                <div className="pt-6 border-t border-border-color dark:border-white/15 w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2 w-full">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        My role
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Type
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.type}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Status
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-slate-400 block mb-1">
                        Tools
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white block">
                        {project.facts.tools}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Large Screenshot Area: Full Container Width Frame */}
            <div className="mt-12 sm:mt-16 w-full">
              {shouldAnimate ? (
                <m.div
                  initial={{ clipPath: "inset(20% 0% 0% 0%)", opacity: 0 }}
                  animate={{
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    transition: { duration: 0.8, delay: 0.3, ease: EASING },
                  }}
                  onAnimationComplete={() => setFrameAnimDone(true)}
                  style={{
                    willChange: frameAnimDone ? "auto" : "clip-path, opacity",
                  }}
                  className="relative rounded-2xl sm:rounded-3xl bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.15)] p-4 sm:p-8 md:p-12 border border-[#BFDBFE] dark:border-white/10 overflow-hidden w-full"
                >
                  {/* Browser window frame */}
                  <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B1220] border border-border-color dark:border-white/15 shadow-2xl overflow-hidden w-full">
                    {/* Browser window chrome dots */}
                    <div className="px-4 py-3 border-b border-border-color dark:border-white/10 flex items-center gap-2 bg-[#F8FAFC] dark:bg-[#0F172A]/70">
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                    </div>

                    {/* Screenshot display - natural size centered in frame, never upscaled or blurred */}
                    <div className="p-3 sm:p-6 md:p-8 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#071322] w-full">
                      <div className="max-w-full flex justify-center w-full">
                        <Image
                          src={project.screenshot.src}
                          alt={project.screenshot.alt}
                          width={project.screenshot.width}
                          height={project.screenshot.height}
                          priority
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1152px"
                          className="h-auto max-w-full object-contain rounded-lg border border-border-color/60 dark:border-white/10"
                          style={{ maxWidth: project.screenshot.width }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Caption & Chip Area Under Frame */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {project.slug === "hisaabhub" && (
                        <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                          Demo data
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/95 dark:bg-[#0B1F38]/95 text-brand-navy dark:text-white border border-border-color dark:border-white/20 shadow-sm">
                      {project.screenshot.chip}
                    </span>
                  </div>
                </m.div>
              ) : (
                <div className="relative rounded-2xl sm:rounded-3xl bg-[#CFE3FF] dark:bg-[rgba(142,197,255,0.15)] p-4 sm:p-8 md:p-12 border border-[#BFDBFE] dark:border-white/10 overflow-hidden w-full">
                  {/* Browser window frame */}
                  <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B1220] border border-border-color dark:border-white/15 shadow-2xl overflow-hidden w-full">
                    {/* Browser window chrome dots */}
                    <div className="px-4 py-3 border-b border-border-color dark:border-white/10 flex items-center gap-2 bg-[#F8FAFC] dark:bg-[#0F172A]/70">
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#CBD5E1] dark:bg-white/20 inline-block" />
                    </div>

                    {/* Screenshot display - natural size centered */}
                    <div className="p-3 sm:p-6 md:p-8 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#071322] w-full">
                      <div className="max-w-full flex justify-center w-full">
                        <Image
                          src={project.screenshot.src}
                          alt={project.screenshot.alt}
                          width={project.screenshot.width}
                          height={project.screenshot.height}
                          priority
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1152px"
                          className="h-auto max-w-full object-contain rounded-lg border border-border-color/60 dark:border-white/10"
                          style={{ maxWidth: project.screenshot.width }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Caption & Chip Area Under Frame */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {project.slug === "hisaabhub" && (
                        <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                          Demo data
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/95 dark:bg-[#0B1F38]/95 text-brand-navy dark:text-white border border-border-color dark:border-white/20 shadow-sm">
                      {project.screenshot.chip}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Five Numbered Blocks: Two-column on desktop (number and large italic serif heading on left, text on right) */}
            <div className="mt-16 sm:mt-24 space-y-16 sm:space-y-24 w-full">
              {/* Block 01: Overview */}
              <section className="pt-8 relative">
                {shouldAnimate ? (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: EASING } }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15 origin-left"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15" />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-baseline">
                  <div className="lg:col-span-5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-[#93C5FD] block mb-2">
                      01
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                      Overview
                    </h2>
                  </div>
                  <div className="lg:col-span-7 text-base sm:text-lg text-ink-secondary dark:text-slate-200 leading-relaxed font-normal">
                    {project.overview}
                  </div>
                </div>
              </section>

              {/* Block 02: The problem */}
              <section className="pt-8 relative">
                {shouldAnimate ? (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: EASING } }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15 origin-left"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15" />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-baseline">
                  <div className="lg:col-span-5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-[#93C5FD] block mb-2">
                      02
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                      The problem
                    </h2>
                  </div>
                  <div className="lg:col-span-7 text-base sm:text-lg text-ink-secondary dark:text-slate-200 leading-relaxed font-normal">
                    {project.problem}
                  </div>
                </div>
              </section>

              {/* Block 03: What I built */}
              <section className="pt-8 relative">
                {shouldAnimate ? (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: EASING } }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15 origin-left"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15" />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-baseline">
                  <div className="lg:col-span-5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-[#93C5FD] block mb-2">
                      03
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                      What I built
                    </h2>
                  </div>
                  <div className="lg:col-span-7 text-base sm:text-lg text-ink-secondary dark:text-slate-200 leading-relaxed font-normal">
                    {project.whatIBuilt}
                  </div>
                </div>
              </section>

              {/* Block 04: Main features */}
              <section className="pt-8 relative">
                {shouldAnimate ? (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: EASING } }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15 origin-left"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15" />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                  <div className="lg:col-span-5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-[#93C5FD] block mb-2">
                      04
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                      Main features
                    </h2>
                  </div>

                  <div className="lg:col-span-7 divide-y divide-border-color dark:divide-white/15 border-y border-border-color dark:border-white/15">
                    {project.features.map((feature, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <div
                          key={feature}
                          className="py-4 sm:py-5 flex items-center justify-between gap-4"
                        >
                          <span className="text-base sm:text-lg font-bold text-brand-navy dark:text-white">
                            {feature}
                          </span>
                          <span className="text-xs font-mono font-semibold text-ink-muted dark:text-slate-400">
                            {letter}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Block 05: Under the hood */}
              <section className="pt-8 relative">
                {shouldAnimate ? (
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: EASING } }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15 origin-left"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-px bg-border-color dark:bg-white/15" />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                  <div className="lg:col-span-5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-[#93C5FD] block mb-2">
                      05
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                      Under the hood
                    </h2>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {project.decisions.map((decision) => (
                      <div key={decision.title} className="space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-brand-navy dark:text-white">
                          {decision.title}
                        </h3>
                        <p className="text-sm sm:text-base text-ink-secondary dark:text-slate-200 leading-relaxed">
                          {decision.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* 4. Next Project Band */}
            <div className="mt-20 sm:mt-28 w-full">
              <div className="rounded-2xl sm:rounded-3xl bg-[#CFE3FF] hover:bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.15)] dark:hover:bg-[rgba(142,197,255,0.22)] border border-[#BFDBFE] dark:border-white/10 p-6 sm:p-10 md:p-12 transition-colors duration-300 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <Link
                    href={`/projects/${project.nextProject.slug}`}
                    className="group min-h-[44px] flex-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
                    aria-label={`Next project: ${project.nextProject.title}`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] block mb-2 font-semibold">
                      Next project
                    </span>
                    <span className="text-[clamp(1.85rem,5.5vw,3rem)] font-extrabold text-brand-navy dark:text-white tracking-tight leading-none inline-flex items-center gap-3">
                      <span>{project.nextProject.title}</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </span>
                  </Link>

                  <a
                    href={OWNER_PROFILE.contacts.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] h-12 inline-flex items-center gap-2 px-6 rounded-full bg-[#0B1F38] dark:bg-white text-white dark:text-[#0B1F38] text-sm sm:text-base font-bold hover:bg-[#1E293B] dark:hover:bg-slate-100 transition-colors shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-brand-yellow"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Start a Project</span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
