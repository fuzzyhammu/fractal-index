import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FADE_IN  = 110;
const HOLD     = 130;
const FADE_OUT = 160;
const TOTAL    = FADE_IN + HOLD + FADE_OUT;

type Phase = "idle" | "in" | "hold" | "out";

export function PageTransition() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  const [phase, setPhase]   = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setPhase("in");

    timers.current.push(
      window.setTimeout(() => {
        prevPath.current = pathname;
        setPhase("hold");
      }, FADE_IN),

      window.setTimeout(() => setPhase("out"),  FADE_IN + HOLD),
      window.setTimeout(() => setPhase("idle"), TOTAL),
    );
  }, [pathname]);

  const showing = phase !== "idle";
  const opaque  = phase === "hold";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: showing ? (opaque ? 1 : 0) : 0,
        transition: opaque
          ? `opacity ${FADE_IN}ms cubic-bezier(0.4,0,0.2,1)`
          : phase === "out"
            ? `opacity ${FADE_OUT}ms cubic-bezier(0.4,0,0.2,1)`
            : `opacity ${FADE_IN}ms cubic-bezier(0.4,0,0.2,1)`,
        visibility: showing ? "visible" : "hidden",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          fontWeight: 400,
          letterSpacing: "0.35em",
          textIndent: "0.35em",
          color: "hsl(43 70% 62%)",
          textShadow: "0 0 32px hsl(43 70% 62% / 0.55), 0 0 80px hsl(43 70% 62% / 0.2)",
          transform: opaque ? "scale(1)" : "scale(0.94)",
          opacity: opaque ? 1 : 0,
          transition: `transform ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1), opacity ${FADE_IN}ms ease`,
        }}
      >
        GG
      </span>
    </div>
  );
}
