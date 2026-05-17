import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FADE_IN = 120;
const HOLD = 180;
const FADE_OUT = 140;

type Phase = "idle" | "enter" | "hold" | "exit";

export function PageTransition() {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setPhase("enter");
    timers.current.push(
      window.setTimeout(() => setPhase("hold"), FADE_IN),
      window.setTimeout(() => {
        lastPath.current = pathname;
        setPhase("exit");
      }, FADE_IN + HOLD),
      window.setTimeout(() => setPhase("idle"), FADE_IN + HOLD + FADE_OUT),
    );
    return () => timers.current.forEach(window.clearTimeout);
  }, [pathname]);

  const visible = phase !== "idle";
  const showText = phase === "hold";
  const overlayTransition = phase === "enter"
    ? `opacity ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1)`
    : phase === "exit"
      ? `opacity ${FADE_OUT}ms cubic-bezier(0.22,1,0.36,1)`
      : `opacity ${HOLD}ms linear`;
  const textTransition = phase === "enter"
    ? `opacity ${FADE_IN}ms ease, transform ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1)`
    : phase === "exit"
      ? `opacity ${FADE_OUT}ms ease, transform ${FADE_OUT}ms cubic-bezier(0.22,1,0.36,1)`
      : `opacity ${HOLD}ms linear`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] bg-black"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: overlayTransition,
      }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: "clamp(3rem, 6vw, 5.25rem)",
            letterSpacing: "0.38em",
            textIndent: "0.38em",
            color: "hsl(43 78% 62%)",
            textShadow: "0 0 24px hsl(43 78% 62% / 0.45)",
            opacity: showText ? 1 : 0,
            transform: showText ? "scale(1)" : "scale(0.96)",
            transition: textTransition,
          }}
        >
          GG
        </span>
      </div>
    </div>
  );
}
