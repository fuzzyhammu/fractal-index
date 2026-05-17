import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";

const CARD_DARKS = [
  "hsl(220 35% 6%)",
  "hsl(230 30% 7%)",
  "hsl(215 38% 6.5%)",
  "hsl(225 32% 7.5%)",
  "hsl(218 40% 6%)",
  "hsl(228 28% 7%)",
];

const CARD_ACCENTS = [
  "hsl(41 80% 55%)",
  "hsl(210 60% 65%)",
  "hsl(38 70% 58%)",
  "hsl(195 55% 62%)",
  "hsl(45 85% 60%)",
  "hsl(220 50% 70%)",
];

function TopicCard({ topic, index, total }: { topic: TopicData; index: number; total: number; }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const bg = CARD_DARKS[index % CARD_DARKS.length];
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const numLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div className="sticky top-0 flex items-center justify-center" style={{ height: "100vh", zIndex: index + 1 }}>
          <div
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden cursor-pointer select-none"
            style={{
              width: "calc(100vw - 7rem)",
              maxWidth: "1120px",
              height: "calc(100vh - 9rem)",
              background: bg,
              border: `1px solid ${hovered ? `${accent}66` : `${accent}24`}`,
              borderRadius: "6px",
              transform: hovered ? "scale(1.003)" : "scale(1)",
              transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), border-color 0.9s ease, box-shadow 0.9s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: hovered
                ? `0 24px 80px -30px hsl(220 90% 3% / 0.9)`
                : `0 18px 56px -30px hsl(220 90% 3% / 0.72)`,
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, hsl(220 30% 4% / 0.16) 100%)" }} />
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, hsl(220 50% 100% / 0.01) 3px 4px)", opacity: 0.45 }} />
            <div className="pointer-events-none absolute top-0 left-0 right-0" style={{ height: "1px", background: `linear-gradient(to right, transparent, ${accent}${hovered ? "55" : "22"}, transparent)`, transition: "background 0.9s ease" }} />
            <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono uppercase tracking-[0.35em]" style={{ fontSize: "10px", color: `${accent}99` }}>§ 01</span>
                  <span className="w-8 h-px" style={{ background: `${accent}30` }} />
                  <span className="font-mono uppercase tracking-[0.25em]" style={{ fontSize: "10px", color: `${accent}60` }}>{numLabel} / {String(total).padStart(2, "0")}</span>
                </div>
                <span className="font-mono uppercase tracking-[0.25em] text-paper/25" style={{ fontSize: "9px" }}>click to expand</span>
              </div>

              <div>
                <div className="pointer-events-none absolute" style={{ bottom: "3rem", right: "3rem", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(160px, 22vw, 300px)", fontWeight: 700, lineHeight: 1, color: `${accent}08`, userSelect: "none", letterSpacing: "-0.05em" }}>{numLabel}</div>
                <div className="relative z-10">
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5.5vw, 72px)", fontWeight: 600, lineHeight: 1.05, color: `hsl(38 30% ${hovered ? 96 : 88}%)`, transition: "color 0.9s ease", marginBottom: "1.2rem" }}>{topic.label}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2vw, 24px)", fontStyle: "italic", color: `hsl(38 20% ${hovered ? 76 : 65}%)`, maxWidth: "560px", lineHeight: 1.55, transition: "color 0.9s ease" }}>{topic.blurb}</p>
                  <div className="inline-flex items-center gap-2.5 mt-8" style={{ border: `1px solid ${accent}${hovered ? "45" : "22"}`, padding: "8px 18px", borderRadius: "2px", transition: "border-color 0.9s ease, transform 0.9s ease", transform: hovered ? "translateY(-1px)" : "translateY(0)" }}>
                    <span className="font-mono uppercase tracking-[0.28em]" style={{ fontSize: "9.5px", color: `${accent}${hovered ? "b0" : "60"}`, transition: "color 0.9s ease" }}>Read more</span>
                    <span style={{ color: `${accent}${hovered ? "b0" : "45"}`, fontSize: "12px", transition: "color 0.9s ease" }}>→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-[hsl(220_30%_8%)] border border-border text-paper p-0 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono uppercase tracking-[0.3em] text-gold/60" style={{ fontSize: "9px" }}>§ 01 · {numLabel}</span>
              <div className="flex-1 h-px bg-border/40" />
            </div>
            <DialogTitle style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, color: "hsl(38 40% 92%)", lineHeight: 1.1 }}>{topic.label}</DialogTitle>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontStyle: "italic", color: "hsl(38 20% 65%)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>{topic.blurb}</p>
            <div className="h-px bg-border/30 mb-6" />
            <DialogDescription asChild>
              <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: "15px", lineHeight: 1.8, color: "hsl(220 15% 75%)" }}>
                {topic.detail.split("\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
                ))}
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StackingTopicCards({ topics }: { topics: TopicData[] }) {
  return <div>{topics.map((topic, i) => <TopicCard key={topic.slug} topic={topic} index={i} total={topics.length} />)}</div>;
}
