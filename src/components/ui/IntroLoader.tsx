"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface IntroContextType {
  introComplete: boolean;
  setIntroComplete: (val: boolean) => void;
}

const IntroContext = createContext<IntroContextType>({
  introComplete: true,
  setIntroComplete: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const isPlay = document.documentElement.getAttribute("data-intro") === "play";
      return !isPlay;
    } catch {
      return true;
    }
  });

  return (
    <IntroContext.Provider value={{ introComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

// 13 development words with hand-picked positions avoiding center text and viewport edges
interface WordItem {
  text: string;
  isSerif?: boolean;
  isUpper?: boolean;
  sizeClass: string;
  opacityClass: string;
  colorClass?: string;
  style: React.CSSProperties;
}

const DESKTOP_WORDS: WordItem[] = [
  // Top-Left quadrant
  {
    text: "IDEAS",
    isUpper: true,
    sizeClass: "text-2xl lg:text-3xl font-extrabold tracking-wider",
    opacityClass: "opacity-30 dark:opacity-30",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { top: "11%", left: "7%" },
  },
  {
    text: "Plan",
    isSerif: true,
    sizeClass: "text-xl lg:text-2xl font-normal italic",
    opacityClass: "opacity-65 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { top: "21%", left: "16%" },
  },
  {
    text: "Websites",
    isSerif: true,
    sizeClass: "text-2xl lg:text-3xl font-normal italic",
    opacityClass: "opacity-45 dark:opacity-40",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { top: "33%", left: "5%" },
  },

  // Top-Right quadrant
  {
    text: "DESIGN",
    isUpper: true,
    sizeClass: "text-xl lg:text-2xl font-extrabold tracking-wide",
    opacityClass: "opacity-45 dark:opacity-45",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { top: "12%", right: "8%" },
  },
  {
    text: "Code",
    isSerif: true,
    sizeClass: "text-3xl lg:text-4xl font-normal italic",
    opacityClass: "opacity-55 dark:opacity-50",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { top: "23%", right: "16%" },
  },
  {
    text: "Online stores",
    isSerif: true,
    sizeClass: "text-lg lg:text-xl font-normal italic",
    opacityClass: "opacity-50 dark:opacity-45",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { top: "35%", right: "6%" },
  },

  // Bottom-Left quadrant
  {
    text: "BUILD",
    isUpper: true,
    sizeClass: "text-xl lg:text-2xl font-extrabold tracking-wide",
    opacityClass: "opacity-50 dark:opacity-50",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "33%", left: "6%" },
  },
  {
    text: "Test",
    isSerif: true,
    sizeClass: "text-xl lg:text-2xl font-normal italic",
    opacityClass: "opacity-65 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { bottom: "21%", left: "15%" },
  },
  {
    text: "DASHBOARDS",
    isUpper: true,
    sizeClass: "text-xs lg:text-sm font-extrabold tracking-widest",
    opacityClass: "opacity-40 dark:opacity-40",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "11%", left: "7%" },
  },

  // Bottom-Right quadrant
  {
    text: "LAUNCH",
    isUpper: true,
    sizeClass: "text-2xl lg:text-3xl font-extrabold tracking-wide",
    opacityClass: "opacity-60 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { bottom: "33%", right: "7%" },
  },
  {
    text: "Databases",
    isSerif: true,
    sizeClass: "text-xl lg:text-2xl font-normal italic",
    opacityClass: "opacity-50 dark:opacity-45",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "21%", right: "15%" },
  },
  {
    text: "WEB APPS",
    isUpper: true,
    sizeClass: "text-xs lg:text-sm font-extrabold tracking-widest",
    opacityClass: "opacity-45 dark:opacity-45",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "11%", right: "8%" },
  },

  // Bottom-Center anchor
  {
    text: "LEARNING PLATFORMS",
    isUpper: true,
    sizeClass: "text-xs font-extrabold tracking-[0.25em]",
    opacityClass: "opacity-35 dark:opacity-35",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "5%", left: "50%", transform: "translateX(-50%)" },
  },
];

// 6 smaller words on mobile (<640px)
const MOBILE_WORDS: WordItem[] = [
  {
    text: "IDEAS",
    isUpper: true,
    sizeClass: "text-xs font-extrabold tracking-wider",
    opacityClass: "opacity-40 dark:opacity-40",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { top: "14%", left: "6%" },
  },
  {
    text: "Design",
    isSerif: true,
    sizeClass: "text-sm font-normal italic",
    opacityClass: "opacity-65 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { top: "24%", right: "6%" },
  },
  {
    text: "Code",
    isSerif: true,
    sizeClass: "text-base font-normal italic",
    opacityClass: "opacity-65 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { top: "33%", left: "6%" },
  },
  {
    text: "BUILD",
    isUpper: true,
    sizeClass: "text-xs font-extrabold tracking-wider",
    opacityClass: "opacity-50 dark:opacity-50",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "31%", right: "6%" },
  },
  {
    text: "LAUNCH",
    isUpper: true,
    sizeClass: "text-sm font-extrabold tracking-wide",
    opacityClass: "opacity-65 dark:opacity-60",
    colorClass: "text-[#1D5FD6] dark:text-[#7DB4FF]",
    style: { bottom: "21%", left: "6%" },
  },
  {
    text: "Web apps",
    isSerif: true,
    sizeClass: "text-sm font-normal italic",
    opacityClass: "opacity-55 dark:opacity-50",
    colorClass: "text-[#0F172A] dark:text-[#E6EDF7]",
    style: { bottom: "11%", right: "6%" },
  },
];

export function IntroLoader() {
  const { setIntroComplete } = useIntro();
  const [isMounted, setIsMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);
  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [visibleWordIndices, setVisibleWordIndices] = useState<number[]>([]);

  const completedRef = useRef<boolean>(false);

  // Check prefers-reduced-motion and session state on mount
  useEffect(() => {
    setIsMounted(true);

    // If prefers-reduced-motion: reduce, no overlay in the DOM
    const mqlReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mqlReduce.matches) {
      setShouldPlay(false);
      setIntroComplete(true);
      try {
        document.documentElement.setAttribute("data-intro", "skip");
      } catch {}
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const forceIntro = params.get("intro") === "1";

    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("intro_seen") === "1";
    } catch {
      hasSeen = false;
    }

    if (!forceIntro && hasSeen) {
      setShouldPlay(false);
      setIntroComplete(true);
      try {
        document.documentElement.setAttribute("data-intro", "skip");
      } catch {}
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 639px)").matches;
    setIsMobile(mobileQuery);
    setShouldPlay(true);
    try {
      document.documentElement.setAttribute("data-intro", "play");
    } catch {}

    // Record session flag safely
    try {
      sessionStorage.setItem("intro_seen", "1");
    } catch {
      // safely ignore
    }

    // Start timer line and word stagger shortly after mount
    const startTimer = setTimeout(() => {
      setTimerStarted(true);
      if (typeof window !== "undefined") {
        (window as unknown as { __introStartTime?: number }).__introStartTime = performance.now();
      }
    }, 60);

    return () => clearTimeout(startTimer);
  }, [setIntroComplete]);

  // Lock scroll while playing and ALWAYS restore on finish, skip or error
  useEffect(() => {
    if (!shouldPlay) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldPlay]);

  // Stagger words in one after another
  useEffect(() => {
    if (!timerStarted || !shouldPlay || isLifting) return;

    const words = isMobile ? MOBILE_WORDS : DESKTOP_WORDS;
    const staggerInterval = isMobile ? 80 : 120; // 0.08s on mobile, 0.12s on desktop

    const timers: NodeJS.Timeout[] = [];

    words.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleWordIndices((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
      }, idx * staggerInterval);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [timerStarted, shouldPlay, isLifting, isMobile]);

  // Hand-off trigger: lifts overlay and signals hero entrance
  const completeIntro = useCallback(
    (immediate = false) => {
      if (completedRef.current) return;
      completedRef.current = true;

      setIsLifting(true);

      // Restore scrolling immediately
      try {
        document.body.style.overflow = "";
      } catch {}

      if (immediate) {
        // Instant skip: hand-off hero entrance immediately
        setIntroComplete(true);
        if (typeof window !== "undefined") {
          const w = window as unknown as { __introEndTime?: number; __introElapsedMs?: number; __introStartTime?: number };
          w.__introEndTime = performance.now();
          if (w.__introStartTime) w.__introElapsedMs = w.__introEndTime - w.__introStartTime;
          window.dispatchEvent(new CustomEvent("intro-finished"));
        }
        setTimeout(() => {
          setShouldPlay(false);
          try {
            document.documentElement.setAttribute("data-intro", "skip");
          } catch {}
        }, 300);
      } else {
        // Normal completion: overlay lifts up (0.8s on desktop, 0.7s on mobile)
        // Hand off hero timeline right as lift finishes revealing hero
        const liftDuration = isMobile ? 700 : 800;
        setTimeout(() => {
          setIntroComplete(true);
          if (typeof window !== "undefined") {
            const w = window as unknown as { __introEndTime?: number; __introElapsedMs?: number; __introStartTime?: number };
            w.__introEndTime = performance.now();
            if (w.__introStartTime) w.__introElapsedMs = w.__introEndTime - w.__introStartTime;
            window.dispatchEvent(new CustomEvent("intro-finished"));
          }
          setShouldPlay(false);
          try {
            document.documentElement.setAttribute("data-intro", "skip");
          } catch {}
        }, liftDuration);
      }
    },
    [isMobile, setIntroComplete]
  );

  const handleSkip = useCallback(() => {
    if (!shouldPlay || completedRef.current) return;
    completeIntro(true);
  }, [shouldPlay, completeIntro]);

  // Escape key handler
  useEffect(() => {
    if (!shouldPlay) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shouldPlay, handleSkip]);

  // Visual phase active timer:
  // Desktop: 1.75s active + 0.80s lift = 2.55s total (within 2.4-2.8s target)
  // Mobile: 1.25s active + 0.70s lift = 1.95s total (about 2.0s, never longer)
  useEffect(() => {
    if (!shouldPlay || isLifting || !timerStarted) return;

    const activeDisplayTime = isMobile ? 1250 : 1750;
    const timer = setTimeout(() => {
      completeIntro(false);
    }, activeDisplayTime);

    return () => clearTimeout(timer);
  }, [shouldPlay, isLifting, timerStarted, isMobile, completeIntro]);

  // Not shown under reduced-motion or when done
  if (!isMounted || !shouldPlay) {
    return null;
  }

  const words = isMobile ? MOBILE_WORDS : DESKTOP_WORDS;
  const timerLineDuration = isMobile ? 1.25 : 1.75;
  const liftTransitionDuration = isMobile ? "700ms" : "800ms";

  return (
    <div
      id="intro-loader-root"
      aria-hidden="true"
      onClick={handleSkip}
      style={{
        transitionDuration: liftTransitionDuration,
      }}
      className={`fixed inset-0 z-[9999] bg-[#F4F6F9] dark:bg-[#0B1220] text-[#0F172A] dark:text-[#E6EDF7] flex items-center justify-center overflow-hidden cursor-pointer select-none transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isLifting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Skip Button (at least 44x44 px tap target, visible focus ring, accessible name) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          id="intro-skip-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="min-w-[44px] min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center text-xs font-mono font-semibold tracking-wider text-[#0F172A] dark:text-[#E6EDF7] bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15 border border-[#CBD5E1] dark:border-white/15 rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF]"
          aria-label="Skip introductory animation"
        >
          Skip
        </button>
      </div>

      {/* Centrepiece: Name + Progress Line + Subtitle */}
      <div
        id="intro-loader-center"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm sm:max-w-md pointer-events-none"
      >
        <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#E6EDF7] leading-none font-sans">
          Hamza Barki
        </span>

        {/* Thin progress line under name (light-blue track, deep-blue fill) */}
        <div className="w-36 sm:w-48 h-[2px] bg-[#BFDBFE] dark:bg-[rgba(142,197,255,0.25)] rounded-full my-3 sm:my-3.5 overflow-hidden">
          <div
            className="h-full bg-[#1D5FD6] dark:bg-[#7DB4FF] origin-left transition-transform ease-linear"
            style={{
              transform: timerStarted ? "scaleX(1)" : "scaleX(0)",
              transitionDuration: `${timerLineDuration}s`,
            }}
          />
        </div>

        <span className="text-base sm:text-xl font-normal italic font-serif text-[#1D5FD6] dark:text-[#7DB4FF] tracking-wide">
          Full-Stack Developer
        </span>
      </div>

      {/* Development words fading in around the centre */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {words.map((item, index) => {
          const isVisible = visibleWordIndices.includes(index);
          return (
            <div
              key={`${item.text}-${index}`}
              data-intro-word={item.text}
              style={{
                ...item.style,
                transitionDuration: isMobile ? "350ms" : "450ms",
                filter: isMobile
                  ? "none"
                  : isVisible
                  ? "blur(0px)"
                  : "blur(6px)",
              }}
              className={`absolute select-none pointer-events-none transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                item.isSerif ? "font-serif italic" : "font-sans"
              } ${item.sizeClass} ${item.colorClass || ""} ${
                isVisible
                  ? `${item.opacityClass} translate-y-0`
                  : "opacity-0 translate-y-3"
              }`}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
