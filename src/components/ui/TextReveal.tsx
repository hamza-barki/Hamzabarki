"use client";

import React, { useEffect, useState, useRef } from "react";
import * as m from "framer-motion/m";
import { useInView } from "framer-motion";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.035,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once, amount: "some" });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-baseline">
          <m.span
            initial={{ y: "115%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: EASING,
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}

interface AnimatedWordProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedWord({ children, delay = 0, className = "" }: AnimatedWordProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: "some" });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={containerRef} className="inline-block overflow-hidden align-baseline">
      <m.span
        initial={{ y: "120%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "120%", opacity: 0 }}
        transition={{
          duration: 0.75,
          delay,
          ease: EASING,
        }}
        className={`inline-block ${className}`}
      >
        {children}
      </m.span>
    </span>
  );
}
