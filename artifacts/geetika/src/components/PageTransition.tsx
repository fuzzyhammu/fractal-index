import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Entry is fast and punchy. Exit is slower and graceful.
const DRIP_TIME = 520;
const HOLD_TIME = 360;
const LIFT_TIME = 950;

// First-render intro: slower, more dramatic
const INTRO_DRIP = 900;
const INTRO_HOLD = 550;
const INTRO_LIFT = 1300;

// Decelerating goop: fast start, slow settle
const EASE_OUT_DECEL = "cubic-bezier(0.22, 1, 0.36, 1)";

// Panel sits at ±220% when hidden — far enough that the goop SVG overflow
// (which extends ~150px) never peeks into the viewport, even on phones.
const OFFSCREEN = 220;

type Phase = "idle" | "dripping" | "covered" | "lifting";

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/academics": "Academics",
  "/works": "Works",
  "/vault": "CV & Resume",
  "/contact": "Contact",
  "/dashboard": "Pages",
};

// SVG drip ellipses — defined in a 1000-unit-wide viewBox.
// The goo filter makes them blob together, so exact positions matter less
// than having enough variety to look organic.
const DRIP_SVG_ELLIPSES = [
  [18, 92, 26, 52], [75, 118, 38, 85], [148, 86, 22, 46],
  [218, 122, 42, 92], [285, 84, 18, 36], [355, 114, 34, 74],
  [422, 96, 26, 56], [498, 130, 48, 98], [568, 88, 22, 50],
  [638, 118, 38, 80], [705, 85, 20, 42], [772, 110, 32, 68],
  [840, 124, 40, 86], [905, 84, 20, 44], [958, 108, 30, 65],
  [992, 86, 22, 46],
];

const DRIP_SVG_ELLIPSES_TOP = [
  [18, 108, 26, 52], [75, 82, 38, 85], [148, 114, 22, 46],
  [218, 78, 42, 92], [285, 116, 18, 36], [355, 86, 34, 74],
  [422, 104, 26, 56], [498, 70, 48, 98], [568, 112, 22, 50],
  [638, 82, 38, 80], [705, 115, 20, 42], [772, 90, 32, 68],
  [840, 76, 40, 86], [905, 116, 20, 44], [958, 92, 30, 65],
  [992, 114, 22, 46],
];

export function PageTransition() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [firstRender, setFirstRender] = useState(true);
  const [destLabel, setDestLabel] = useState("");
  const [shrinkLabel, setShrinkLabel] = useState(false);
  const timers = useRef<number[]>([]);
  const pendingDest = useRef<string | null>(null);

  const isIntro = firstRender;
  const drip = isIntro ? INTRO_DRIP : DRIP_TIME;
  const hold = isIntro ? INTRO_HOLD : HOLD_TIME;
  const lift = isIntro ? INTRO_LIFT : LIFT_TIME;

  const runTransition = useCallback((destPathname: string, doReload = false) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setFirstRender(false);

    const label =
      PAGE_LABELS[destPathname] ??
      (destPathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");

    setDestLabel(label);
    setShrinkLabel(false);
    setPhase("dripping");

    const d = DRIP_TIME;
    const h = HOLD_TIME;
    const l = LIFT_TIME;

    timers.current.push(
      window.setTimeout(() => {
        setPhase("covered");
        if (doReload) {
          window.setTimeout(() => window.location.reload(), 60);
        } else if (pendingDest.current && pendingDest.current !== lastPath.current) {
          navigate(pendingDest.current);
        }
      }, d),
      window.setTimeout(() => {
        lastPath.current = destPathname;
        setShrinkLabel(true);
        setPhase("lifting");
      }, d + h),
      window.setTimeout(() => {
        setPhase("idle");
        setShrinkLabel(false);
        pendingDest.current = null;
      }, d + h + l),
    );
  }, [navigate]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") ||
        href.startsWith("tel:") || anchor.hasAttribute("download") || anchor.target === "_blank"
      ) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      if (href.startsWith("#")) return;
      if (!href.startsWith("/")) return;
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("gg-force-nav", { detail: { to: href, reload: false } })
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { to, reload } = (e as CustomEvent<{ to: string; reload?: boolean }>).detail;
      if (to === pathname) {
        runTransition(to, reload ?? false);
        return;
      }
      pendingDest.current = to;
      runTransition(to, false);
    };
    window.addEventListener("gg-force-nav", handler);
    return () => window.removeEventListener("gg-force-nav", handler);
  }, [pathname, runTransition]);

  useEffect(() => {
    if (firstRender) {
      const label =
        PAGE_LABELS[pathname] ??
        (pathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");
      setDestLabel(label);
      setShrinkLabel(false);
      setPhase("idle");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("dripping"));
      });

      timers.current = [
        window.setTimeout(() => setPhase("covered"), drip),
        window.setTimeout(() => {
          lastPath.current = pathname;
          setShrinkLabel(true);
          setPhase("lifting");
        }, drip + hold),
        window.setTimeout(() => {
          setPhase("idle");
          setShrinkLabel(false);
          setFirstRender(false);
        }, drip + hold + lift),
      ];
      return () => timers.current.forEach(window.clearTimeout);
    }
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    return;
  }, [pathname, firstRender, drip, hold, lift]);

  // --- Motion ---
  //
  // NO opacity fade on the wrapper. The panel is ALWAYS at opacity 1.
  // It moves from -220% (fully above, invisible) to 0% (centered, visible)
  // to +220% (fully below, invisible). The large offset means even the goop
  // SVG overflow (which sticks out ~150px) never enters the viewport.
  //
  // Entry (dripping): fast drop down — 520ms
  // Exit  (lifting):  slow graceful drop — 950ms
  //
  // Text is visible from the start of dripping (opacity 1) so you can
  // read it immediately, not halfway through the animation.

  const panelTranslateY =
    phase === "idle" ? -OFFSCREEN
    : phase === "dripping" ? 0
    : phase === "covered" ? 0
    : OFFSCREEN;

  const transformTransition =
    phase === "dripping"
      ? `transform ${drip}ms ${EASE_OUT_DECEL}`
      : phase === "lifting"
      ? `transform ${lift}ms ${EASE_OUT_DECEL}`
      : "none";

  // Text is visible as soon as the panel starts dropping — no delay.
  // It only hides during idle (before entry) and during the very end
  // of lifting (but the panel is already off-screen by then).
  const labelOpacity = phase === "idle" ? 0 : 1;

  const labelTransform =
    shrinkLabel
      ? "translate(calc(-50% - 28vw), calc(-50% - 22vh)) scale(0.18)"
      : "translate(-50%, -50%) scale(1)";

  const labelTransition =
    phase === "lifting"
      ? `opacity ${Math.round(lift * 0.3)}ms ease, transform ${Math.round(lift * 0.85)}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : phase === "dripping"
      ? `opacity ${Math.round(drip * 0.4)}ms ease`
      : "none";

  const showIntroLine = isIntro;

  return (
    <>
      <svg
        aria-hidden
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", zIndex: -1 }}
      >
        <defs>
          <filter id="gg-slime-goo" x="-2%" y="-10%" width="104%" height="125%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            />
          </filter>
        </defs>
      </svg>

      {/* Wrapper: always opacity 1. No fade in, no fade out. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 9999 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${panelTranslateY}%)`,
            transition: transformTransition,
            willChange: "transform",
          }}
        >
          {/* Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(175deg, hsl(220 52% 5%) 0%, hsl(220 48% 4%) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 45% at 50% 50%, hsl(43 60% 14% / 0.5) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Text label — always "Geetika Gehlot" large, page name small */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              opacity: labelOpacity,
              transform: labelTransform,
              transition: labelTransition,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.55rem",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(3.2rem, 10vw, 7.5rem)",
                fontWeight: 600,
                color: "hsl(43 78% 68%)",
                letterSpacing: "0.03em",
                lineHeight: 1.05,
                textShadow:
                  "0 0 50px hsl(43 78% 55% / 0.4), 0 0 100px hsl(43 65% 42% / 0.22)",
                whiteSpace: "nowrap",
              }}
            >
              Geetika Gehlot
            </span>
            {showIntroLine && (
              <span
                style={{
                  width: "clamp(48px, 10vw, 100px)",
                  height: 1,
                  background: "hsl(43 60% 55% / 0.4)",
                  marginTop: "clamp(0.6rem, 1.5vh, 1.2rem)",
                  transition: "width 800ms ease 400ms",
                }}
              />
            )}
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "hsl(43 60% 55% / 0.75)",
                letterSpacing: "0.1em",
                marginTop: "clamp(2rem, 6vh, 3.5rem)",
              }}
            >
              {destLabel}
            </span>
          </div>

          {/* Top goop — aspect-ratio maintained, never squishes */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMax meet"
            style={{
              position: "absolute",
              top: 0,
              left: -20,
              right: -20,
              width: "calc(100% + 40px)",
              height: "auto",
              transform: "translateY(calc(-100% + 60px))",
              display: "block",
              overflow: "visible",
            }}
          >
            <g filter="url(#gg-slime-goo)" fill="hsl(43 82% 50%)">
              <rect x="-20" y="140" width="1040" height="60" />
              {DRIP_SVG_ELLIPSES_TOP.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
              ))}
            </g>
          </svg>

          {/* Bottom goop — aspect-ratio maintained, never squishes */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMin meet"
            style={{
              position: "absolute",
              bottom: 0,
              left: -20,
              right: -20,
              width: "calc(100% + 40px)",
              height: "auto",
              transform: "translateY(calc(100% - 60px))",
              display: "block",
              overflow: "visible",
            }}
          >
            <g filter="url(#gg-slime-goo)" fill="hsl(43 82% 50%)">
              <rect x="-20" y="0" width="1040" height="60" />
              {DRIP_SVG_ELLIPSES.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
