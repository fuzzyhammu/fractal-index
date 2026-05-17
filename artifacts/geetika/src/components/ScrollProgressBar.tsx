import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 z-[55] pointer-events-none"
      style={{ top: "63px", height: "2px", background: "hsl(41 80% 55% / 0.12)" }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(to right, hsl(41 80% 55%), hsl(43 90% 65%))",
          boxShadow: "0 0 6px 1px hsl(41 80% 55% / 0.45)",
          transition: "width 0.1s ease",
        }}
      />
    </div>
  );
}
