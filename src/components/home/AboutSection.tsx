"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { OWNER_PROFILE } from "@/lib/constants";
import { MessageCircle, Mail } from "lucide-react";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WHAT_I_STUDIED = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "Software Engineering and principles",
  "Web Architectures and System Design",
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

export function AboutSection() {
  const isReduced = usePrefersReducedMotion();

  return (
    <LazyMotion features={loadFeatures}>
      <section
        id="about"
        className="py-20 sm:py-28 bg-white dark:bg-[#0B1220] border-b border-[#CBD5E1] dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
      >
        <Container>
          {/* Section Eyebrow */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD]">
              (06) ABOUT
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] break-words mt-3">
              <TextReveal text="About me &" delay={0.05} />{" "}
              <AnimatedWord delay={0.22} className="font-serif italic font-normal text-brand-navy dark:text-white">
                my approach.
              </AnimatedWord>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Real Portrait in Arch Shape with Light-Blue Backing */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="group relative w-full max-w-[320px]">
                {/* Arch Shape Container with soft clip-path reveal from bottom */}
                <m.div
                  initial={
                    isReduced
                      ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                      : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
                  }
                  whileInView={{
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASING }}
                  className="relative aspect-[3/4] w-full rounded-t-full overflow-hidden border-t border-x border-white/80 dark:border-white/20 border-b-0 shadow-[0_20px_50px_rgba(29,95,214,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#CFE3FF] via-[#BFDBFE] to-[#DCEBFF] dark:from-[rgba(142,197,255,0.25)] dark:to-[rgba(142,197,255,0.10)]"
                >
                  <Image
                    src="/images/hamza-editorial.webp"
                    alt="Portrait of Hamza Barki, Full-Stack Developer"
                    fill
                    sizes="(max-width: 1023px) 80vw, 320px"
                    priority
                    className="object-cover object-[center_12%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transform-none"
                  />
                </m.div>

                {/* Subtle Name Label under Arch */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white transition-colors duration-200 group-hover:text-[#1D5FD6] dark:group-hover:text-[#7DB4FF]">
                    {OWNER_PROFILE.name}
                  </h3>
                  <p className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                    Full-Stack Developer &amp; Product Builder
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Narrative, Pull Quote & What I Studied */}
            <div className="lg:col-span-7 space-y-8">
              {/* Large Italic Serif Pull Quote with Smooth Reveal */}
              <m.blockquote
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASING }}
                className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] dark:text-white leading-[1.25]"
              >
                &ldquo;Good software doesn&apos;t just work. It should make the problem feel simpler.&rdquo;
              </m.blockquote>

              {/* Two Short Plain Paragraphs */}
              <m.div
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASING }}
                className="space-y-4 text-base sm:text-lg text-[#334155] dark:text-[#B6C2D6] leading-relaxed font-normal"
              >
                <p>
                  I am in the final year of my BS in Computer Science, and I completed a Full-Stack Web Development course at SMIT.
                </p>
                <p>
                  Contributed to an AI training programme organised by a district youth office.
                </p>
              </m.div>

              {/* What I Studied: Simple 2x2 List with Thin Lines */}
              <m.div
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
                className="space-y-3 pt-2"
              >
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                  What I studied
                </h4>
                <div className="border-t border-b border-[#CBD5E1] dark:border-white/15 divide-y divide-[#CBD5E1] dark:divide-white/15">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1] dark:divide-white/15">
                    <div className="py-3 sm:pr-4 text-base font-medium text-[#0F172A] dark:text-white transition-colors duration-200 hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF]">
                      {WHAT_I_STUDIED[0]}
                    </div>
                    <div className="py-3 sm:pl-4 text-base font-medium text-[#0F172A] dark:text-white transition-colors duration-200 hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF]">
                      {WHAT_I_STUDIED[1]}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1] dark:divide-white/15">
                    <div className="py-3 sm:pr-4 text-base font-medium text-[#0F172A] dark:text-white transition-colors duration-200 hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF]">
                      {WHAT_I_STUDIED[2]}
                    </div>
                    <div className="py-3 sm:pl-4 text-base font-medium text-[#0F172A] dark:text-white transition-colors duration-200 hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF]">
                      {WHAT_I_STUDIED[3]}
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Two Direct Action Buttons (At Least 44x44px Tap Target) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={OWNER_PROFILE.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[#E6EDF7] dark:hover:bg-white text-white dark:text-[#0F172A] text-base font-bold transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] whitespace-nowrap active:scale-[0.98] group"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400 dark:text-emerald-600 transition-transform duration-200 group-hover:scale-110" />
                  <span>Start a Project</span>
                </a>
                <a
                  href={`mailto:${OWNER_PROFILE.contacts.email}`}
                  className="min-h-[44px] h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full border border-[#CBD5E1] dark:border-white/15 bg-white dark:bg-[#0F1A2E] hover:bg-slate-100 dark:hover:bg-[#16243E] text-[#0F172A] dark:text-white text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] whitespace-nowrap active:scale-[0.98] group"
                >
                  <Mail className="w-5 h-5 text-[#1D5FD6] dark:text-[#7DB4FF] transition-transform duration-200 group-hover:scale-110" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
