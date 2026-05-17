import { useEffect, useRef, useState } from "react";

export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  const target = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const updateTarget = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      target.current = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    };

    const tick = () => {
      setPct((current) => {
        const next = current + (target.current - current) * 0.12;
        return Math.abs(target.current - next) < 0.02 ? target.current : next;
      });
      raf.current = window.requestAnimationFrame(tick);
    };

    updateTarget();
    tick();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div aria-hidden className="fixed left-0 right-0 z-[55] pointer-events-none" style={{ top: "63px", height: "2px", background: "hsl(41 80% 55% / 0.12)" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(to right, hsl(41 80% 55%), hsl(43 90% 65%))", boxShadow: "0 0 6px 1px hsl(41 80% 55% / 0.5)", transition: "width 0.18s linear" }} />
    </div>
  );
}
