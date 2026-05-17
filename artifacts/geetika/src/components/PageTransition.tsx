import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DRIP_TIME = 520;
const HOLD_TIME = 560;
const LIFT_TIME = 520;

// Decelerating goop: starts fast, settles slow — like goo landing
const EASE_OUT_DECEL = "cubic-bezier(0.22, 1, 0.36, 1)";

type Phase = "idle" | "dripping" | "covered" | "lifting" | "afterlift";

const PAGE_LABELS: Record<string, string> = {
  "/": "Geetika Gehlot",
  "/about": "About",
  "/academics": "Academics",
  "/works": "Works",
  "/vault": "CV & Resume",
  "/contact": "Contact",
  "/dashboard": "Pages",
};

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
  const [isHomeDest, setIsHomeDest] = useState(false);
  const [shrinkLabel, setShrinkLabel] = useState(false);
  const timers = useRef<number[]>([]);

  const runTransition = useCallback((destPathname: string, doReload = false) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];

    const label =
      PAGE_LABELS[destPathname] ??
      (destPathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");

    setDestLabel(label);
    setIsHomeDest(destPathname === "/");
    setShrinkLabel(false);
    setPhase("dripping");

    timers.current.push(
      window.setTimeout(() => setPhase("covered"), DRIP_TIME),
      window.setTimeout(() => {
        lastPath.current = destPathname;
        setShrinkLabel(true);
        if (doReload) {
          window.setTimeout(() => window.location.reload(), 60);
        }
        setPhase("lifting");
      }, DRIP_TIME + HOLD_TIME),
      window.setTimeout(() => setPhase("afterlift"), DRIP_TIME + HOLD_TIME + LIFT_TIME),
      window.setTimeout(() => {
        setPhase("idle");
        setShrinkLabel(false);
      }, DRIP_TIME + HOLD_TIME + LIFT_TIME + 60),
    );
  }, []);

  useEffect(() => {
    if (firstRender) {
      const label =
        PAGE_LABELS[pathname] ??
        (pathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");
      setDestLabel(label);
      setIsHomeDest(pathname === "/");
      setShrinkLabel(false);
      // Start in idle so the first transition triggers properly from hidden state
      setPhase("idle");

      // Kick off the first transition after a brief paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("dripping"));
      });

      timers.current = [
        window.setTimeout(() => setPhase("covered"), DRIP_TIME),
        window.setTimeout(() => {
          lastPath.current = pathname;
          setShrinkLabel(true);
          setPhase("lifting");
        }, DRIP_TIME + HOLD_TIME),
        window.setTimeout(() => setPhase("afterlift"), DRIP_TIME + HOLD_TIME + LIFT_TIME),
        window.setTimeout(() => {
          setPhase("idle");
          setShrinkLabel(false);
          setFirstRender(false);
        }, DRIP_TIME + HOLD_TIME + LIFT_TIME + 60),
      ];
      return () => timers.current.forEach(window.clearTimeout);
    }
    if (pathname === lastPath.current) return;
    runTransition(pathname, false);
    return () => timers.current.forEach(window.clearTimeout);
  }, [pathname, runTransition, firstRender]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { to, reload } = (e as CustomEvent<{ to: string; reload?: boolean }>).detail;
      if (to !== pathname) {
        navigate(to);
      } else {
        runTransition(to, reload ?? false);
      }
    };
    window.addEventListener("gg-force-nav", handler);
    return () => window.removeEventListener("gg-force-nav", handler);
  }, [navigate, pathname, runTransition]);

  // --- Motion: always drops downward ---
  //
  // Entry (idle → dripping):  hidden above (-110%) → visible (0%)
  //   → The whole panel drops DOWN from above, decelerating like goo landing.
  //
  // Exit  (covered → lifting): visible (0%) → hidden below (+110%)
  //   → The whole panel drops DOWN past the bottom, goop dripping away.
  //
  // Afterlift → idle: panel snaps instantly back to -110% (while opacity is 0)
  //   → No visual jump because opacity is 0 during the reset.

  const panelTranslateY =
    phase === "idle"
      ? -110   // hidden above — ready to drop down on next entry
      : phase === "dripping"
      ? 0      // dropped down and settled
      : phase === "covered"
      ? 0      // holding in place
      : phase === "lifting"
      ? 110    // dropping down past bottom
      : 110;   // afterlift — still below, about to snap back to idle position

  const panelOpacity =
    phase === "idle" ? 0
    : phase === "afterlift" ? 0
    : 1;

  const transformTransition =
    phase === "dripping"
      ? `transform ${DRIP_TIME}ms ${EASE_OUT_DECEL}`
      : phase === "lifting" || phase === "afterlift"
      ? `transform ${LIFT_TIME}ms ${EASE_OUT_DECEL}`
      : "none";

  const opacityTransition =
    phase === "dripping"
      ? `opacity ${DRIP_TIME * 0.5}ms ease`
      : phase === "lifting" || phase === "afterlift"
      ? `opacity ${LIFT_TIME * 0.6}ms ease`
      : "none";

  const labelOpacity = phase === "covered" && !shrinkLabel ? 1 : 0;

  const labelTransform =
    shrinkLabel && isHomeDest
      ? "translate(calc(-50% - 28vw), calc(-50% - 22vh)) scale(0.18)"
      : "translate(-50%, -50%) scale(1)";

  const labelTransition =
    phase === "lifting"
      ? `opacity ${Math.round(LIFT_TIME * 0.5)}ms ease, transform ${Math.round(LIFT_TIME * 0.85)}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : phase === "covered"
      ? "opacity 200ms ease 100ms"
      : "none";

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

      {/* Always mounted — no mount/unmount flash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{
          zIndex: 9999,
          opacity: panelOpacity,
          transition: opacityTransition,
        }}
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

          {/* Text label */}
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
            {isHomeDest ? (
              <>
                <span
                  style={{
                    fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.48em",
                    textTransform: "uppercase",
                    color: "hsl(43 65% 52% / 0.55)",
                  }}
                >
                  § 00
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2.4rem, 7.5vw, 5.8rem)",
                    fontWeight: 600,
                    color: "hsl(43 78% 68%)",
                    letterSpacing: "0.03em",
                    lineHeight: 1,
                    textShadow:
                      "0 0 50px hsl(43 78% 55% / 0.4), 0 0 100px hsl(43 65% 42% / 0.22)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Geetika Gehlot
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "hsl(43 65% 52% / 0.45)",
                  }}
                >
                  GG
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.9rem, 5.5vw, 4.2rem)",
                    fontWeight: 600,
                    color: "hsl(43 72% 64%)",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                    textShadow: "0 0 36px hsl(43 78% 52% / 0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {destLabel}
                </span>
              </>
            )}
          </div>

          {/* Top goop — drips down with the panel */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: -130,
              left: 0,
              right: 0,
              width: "100%",
              height: 190,
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

          {/* Bottom goop — drips down with the panel */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: -130,
              left: 0,
              right: 0,
              width: "100%",
              height: 190,
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
