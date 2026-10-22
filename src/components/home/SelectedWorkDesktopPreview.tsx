"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useMotionValue, useSpring } from "framer-motion";
import * as m from "framer-motion/m";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface PreviewItem {
  slug: string;
  title: string;
  screenshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface SelectedWorkDesktopPreviewProps {
  items: PreviewItem[];
  hoveredIndex: number | null;
  pointerPos: { x: number; y: number };
}

const CARD_WIDTH = 420;
const CARD_HEIGHT = 260;

export default function SelectedWorkDesktopPreview({
  items,
  hoveredIndex,
  pointerPos,
}: SelectedWorkDesktopPreviewProps) {
  // Motion values for pointer position
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring for the circle following the pointer
  const circleSpringConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const smoothCircleX = useSpring(mouseX, circleSpringConfig);
  const smoothCircleY = useSpring(mouseY, circleSpringConfig);

  // Motion values for the floating card
  const cardX = useMotionValue(-1000);
  const cardY = useMotionValue(-1000);

  // Smooth spring for card movement
  const cardSpringConfig = { damping: 24, stiffness: 220, mass: 0.6 };
  const smoothCardX = useSpring(cardX, cardSpringConfig);
  const smoothCardY = useSpring(cardY, cardSpringConfig);

  useEffect(() => {
    if (pointerPos.x > 0 && pointerPos.y > 0) {
      mouseX.set(pointerPos.x);
      mouseY.set(pointerPos.y);

      // Compute card position:
      // Place to the right of pointer with offset, kept inside the empty area of the row so it never covers the project name.
      // At desktop (>= 1200px), row name ends around 660-690px. Card starts at least at 700px if pointer is left of it.
      const winWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
      const winHeight = typeof window !== "undefined" ? window.innerHeight : 900;

      let targetX = pointerPos.x + 36;
      if (winWidth >= 1200) {
        // Keep inside the empty area between name and right column (never cover name)
        targetX = Math.max(targetX, 690);
      }
      // Ensure card stays within viewport
      if (targetX + CARD_WIDTH > winWidth - 20) {
        targetX = Math.max(20, winWidth - 20 - CARD_WIDTH);
      }

      // Vertical centering around pointer with viewport bounding
      let targetY = pointerPos.y - CARD_HEIGHT / 2;
      targetY = Math.max(20, Math.min(targetY, winHeight - CARD_HEIGHT - 20));

      cardX.set(targetX);
      cardY.set(targetY);
    }
  }, [pointerPos, mouseX, mouseY, cardX, cardY]);

  if (hoveredIndex === null || !items[hoveredIndex]) return null;

  const currentItem = items[hoveredIndex];

  return (
    <>
      {/* Floating Preview Card positioned to the right of pointer with visible -5deg tilt */}
      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASING }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: smoothCardX,
          y: smoothCardY,
          pointerEvents: "none",
          zIndex: 50,
        }}
        data-testid="selected-work-hover-card"
      >
        <div
          style={{
            transform: "rotate(-5deg)",
            transformOrigin: "center center",
          }}
          className="w-[420px] h-[260px] rounded-2xl bg-white dark:bg-[#0B1F38] p-3 shadow-2xl border border-border-color dark:border-white/10 flex flex-col"
        >
          {/* Window Chrome Header Bar */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
              {currentItem.title}
            </span>
          </div>

          {/* Screenshot Container with object-fit for readability */}
          <div className="relative flex-1 w-full rounded-lg overflow-hidden border border-border-color dark:border-white/10 bg-slate-100 dark:bg-slate-900">
            <Image
              src={currentItem.screenshot.src}
              alt={currentItem.screenshot.alt}
              fill
              sizes="420px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </m.div>

      {/* Round Light-Blue "View" Circle Following Pointer Directly */}
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.15, ease: EASING }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: smoothCircleX,
          y: smoothCircleY,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 51,
        }}
        data-testid="selected-work-view-circle"
        className="w-14 h-14 rounded-full bg-[#93C5FD] text-[#0B1F38] text-xs font-extrabold uppercase tracking-wider flex items-center justify-center shadow-lg pointer-events-none"
      >
        VIEW
      </m.div>
    </>
  );
}
