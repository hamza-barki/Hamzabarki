"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  LazyMotion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  animate,
} from "framer-motion";
import * as m from "framer-motion/m";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);

export function WaterCursor() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // Render tracking ref to verify ZERO React re-renders on pointer updates
  const renderCountRef = useRef<number>(0);
  renderCountRef.current += 1;

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __waterCursorRenderCount: number }).__waterCursorRenderCount =
        renderCountRef.current;
    }
  });

  // Check device capability: only enable on fine pointers (desktop mouse/trackpad), not phones/touch
  useEffect(() => {
    const checkCapability = () => {
      const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsEnabled(hasFinePointer && !isReduced);
    };

    checkCapability();

    const mqPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    mqPointer.addEventListener("change", checkCapability);
    mqMotion.addEventListener("change", checkCapability);

    return () => {
      mqPointer.removeEventListener("change", checkCapability);
      mqMotion.removeEventListener("change", checkCapability);
    };
  }, []);

  // Framer Motion motion values for pointer coordinates (ZERO React state)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring delay for trailing water drop ring: stiffness 120, damping 18, mass 0.6
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const smoothRingX = useSpring(cursorX, springConfig);
  const smoothRingY = useSpring(cursorY, springConfig);

  // Velocity tracking on the trailing ring for liquid stretch & rotation
  const velX = useVelocity(smoothRingX);
  const velY = useVelocity(smoothRingY);

  // Liquid feel: stretch slightly in direction of travel (scaleX up to 1.25), relaxed at 1
  const stretch = useTransform([velX, velY], ([vx, vy]) => {
    const vxNum = Number(vx) || 0;
    const vyNum = Number(vy) || 0;
    const speed = Math.hypot(vxNum, vyNum);
    const factor = Math.min(speed / 2000, 0.25);
    return 1 + factor;
  });

  // Preserve droplet volume: squash scaleY proportionally
  const squash = useTransform(stretch, (s) => 1 / Math.sqrt(Number(s) || 1));

  // Rotate towards direction of travel
  const rotation = useTransform([velX, velY], ([vx, vy]) => {
    const vxNum = Number(vx) || 0;
    const vyNum = Number(vy) || 0;
    const speed = Math.hypot(vxNum, vyNum);
    if (speed < 12) return 0;
    return Math.atan2(vyNum, vxNum) * (180 / Math.PI);
  });

  // Hover states: grows from 44px to ~72px (scale 72/44 = 1.636) and increases fill
  const hoverScale = useMotionValue(1);
  const smoothHoverScale = useSpring(hoverScale, { stiffness: 220, damping: 25 });

  const hoverFill = useMotionValue(0);
  const smoothHoverFill = useSpring(hoverFill, { stiffness: 220, damping: 25 });

  // Combined scale values for the outer ring
  const finalScaleX = useTransform(
    [stretch, smoothHoverScale],
    ([s, h]) => (Number(s) || 1) * (Number(h) || 1)
  );
  const finalScaleY = useTransform(
    [squash, smoothHoverScale],
    ([sq, h]) => (Number(sq) || 1) * (Number(h) || 1)
  );

  // Global visibility and opacity
  const cursorOpacity = useMotionValue(0);
  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 350, damping: 35 });

  // Ripple effect on click (44px expanding to ~100px and fading out in 700ms)
  const rippleX = useMotionValue(-100);
  const rippleY = useMotionValue(-100);
  const rippleScale = useMotionValue(0.8);
  const rippleOpacity = useMotionValue(0);

  // Setup pointer listeners
  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;

      // Check if over a project row in SelectedWork
      // Keep existing round "VIEW" circle behavior and do NOT create two competing circles
      const isProjectRow = !!(
        target &&
        (target.closest('section[aria-label="Selected work"] a[href^="/projects/"]') ||
          target.closest('[data-testid="selected-work-view-circle"]'))
      );

      if (isProjectRow) {
        cursorOpacity.set(0);
        hoverScale.set(1);
        hoverFill.set(0);
        return;
      }

      // Normal visibility
      cursorOpacity.set(1);

      // Check interactive elements for 72px ring hover state
      const isInteractive = !!(
        target &&
        target.closest(
          'a, button, [role="button"], [data-cursor="hover"], input, select, textarea, label'
        )
      );

      if (isInteractive) {
        hoverScale.set(72 / 44);
        hoverFill.set(1);
      } else {
        hoverScale.set(1);
        hoverFill.set(0);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const isProjectRow = !!(
        target &&
        (target.closest('section[aria-label="Selected work"] a[href^="/projects/"]') ||
          target.closest('[data-testid="selected-work-view-circle"]'))
      );
      if (isProjectRow) return;

      rippleX.set(e.clientX);
      rippleY.set(e.clientY);
      rippleScale.set(0.8);
      rippleOpacity.set(0.7);

      animate(rippleScale, 2.3, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
      animate(rippleOpacity, 0, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [
    isEnabled,
    cursorX,
    cursorY,
    cursorOpacity,
    hoverScale,
    hoverFill,
    rippleX,
    rippleY,
    rippleScale,
    rippleOpacity,
  ]);

  if (!isEnabled) {
    return null;
  }

  return (
    <LazyMotion features={loadFeatures}>
      <div
        id="water-cursor-root"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden select-none"
      >
        {/* 1. Small solid dot following pointer almost instantly (ink colour) */}
        <m.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            marginTop: -4,
            marginLeft: -4,
            x: cursorX,
            y: cursorY,
            opacity: smoothOpacity,
          }}
          className="w-2 h-2 rounded-full bg-[#0F172A] dark:bg-[#E6EDF7] pointer-events-none"
        />

        {/* 2 & 3. Larger soft ring (44px, 1.5px border, light-blue translucent fill) trailing with liquid stretch & rotate */}
        <m.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            marginTop: -22,
            marginLeft: -22,
            x: smoothRingX,
            y: smoothRingY,
            scaleX: finalScaleX,
            scaleY: finalScaleY,
            rotate: rotation,
            opacity: smoothOpacity,
          }}
          className="w-11 h-11 rounded-full border-[1.5px] border-[#1D5FD6]/35 dark:border-[#7DB4FF]/40 bg-[#BFDBFE]/20 dark:bg-[rgba(142,197,255,0.12)] pointer-events-none overflow-hidden"
        >
          {/* Soft light-blue fill that fades in on hover over links/buttons */}
          <m.div
            style={{ opacity: smoothHoverFill }}
            className="absolute inset-0 rounded-full bg-[#BFDBFE]/40 dark:bg-[rgba(142,197,255,0.24)]"
          />
        </m.div>

        {/* 4. Click ripple ring expanding and fading out in ~700ms */}
        <m.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            marginTop: -22,
            marginLeft: -22,
            x: rippleX,
            y: rippleY,
            scale: rippleScale,
            opacity: rippleOpacity,
          }}
          className="w-11 h-11 rounded-full border border-[#1D5FD6]/50 dark:border-[#7DB4FF]/50 bg-[#BFDBFE]/20 dark:bg-[rgba(142,197,255,0.15)] pointer-events-none"
        />
      </div>
    </LazyMotion>
  );
}
