import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";

/* Size assignments: cycle through varied spans to fill the grid.
   Each topic gets one box. Sparse pages get decorative fillers to close the grid. */

const SPANS = [
  "col-span-2 row-span-2",   // 0: large hero
  "col-span-1 row-span-1",   // 1: small
  "col-span-2 row-span-1",   // 2: wide
  "col-span-1 row-span-2",   // 3: tall
  "col-span-1 row-span-1",   // 4: small
  "col-span-2 row-span-1",   // 5: wide
  "col-span-1 row-span-2",   // 6: tall
  "col-span-1 row-span-1",   // 7: small
  "col-span-2 row-span-2",   // 8: large hero
  "col-span-1 row-span-1",   // 9: small
  "col-span-2 row-span-1",   // 10: wide
  "col-span-1 row-span-1",   // 11: small
  "col-span-1 row-span-2",   // 12: tall
  "col-span-2 row-span-1",   // 13: wide
  "col-span-1 row-span-1",   // 14: small
  "col-span-2 row-span-2",   // 15: large hero
  "col-span-1 row-span-1",   // 16: small
  "col-span-1 row-span-2",   // 17: tall
  "col-span-2 row-span-1",   // 18: wide
  "col-span-1 row-span-1",   // 19: small
];

/* Warm, tonal backgrounds — no rainbow, just paper/gold/navy warmth */
const TINTS = [
  "bg-paper-deep",
  "bg-gradient-to-br from-gold/8 via-paper to-paper-deep",
  "bg-gradient-to-br from-navy-deep/6 via-paper to-paper-deep",
  "bg-paper",
  "bg-gradient-to-br from-gold/12 via-paper-deep to-paper",
  "bg-paper-deep",
  "bg-gradient-to-br from-navy-deep/8 via-paper to-gold/6",
  "bg-paper",
  "bg-gradient-to-br from-gold/10 via-paper to-navy-deep/5",
  "bg-paper-deep",
  "bg-gradient-to-br from-gold/6 via-paper to-paper-deep",
  "bg-paper",
  "bg-gradient-to-br from-navy-deep/5 via-paper-deep to-paper",
  "bg-gradient-to-br from-gold/8 via-paper to-paper",
  "bg-paper-deep",
  "bg-gradient-to-br from-gold/14 via-paper to-paper-deep",
  "bg-paper",
  "bg-gradient-to-br from-navy-deep/7 via-paper to-gold/5",
  "bg-gradient-to-br from-gold/6 via-paper-deep to-paper",
  "bg-paper-deep",
];

/* Decorative filler types for sparse pages */
type FillerKind = "quote" | "stamp" | "swatch" | "glyph";

type FillerData = {
  kind: FillerKind;
  content: string;
  sub?: string;
  span: string;
  tint: string;
};

const QUOTES = [
  "Curiosity is not my hobby. It is my operating system.",
  "Every claim, open for inspection.",
  "Words before pixels, always.",
  "Build things that matter, and prove they work.",
  "The edges are where ideas meet.",
];

const STAMPS = [
  { text: "Examined", sub: "in public" },
  { text: "Edition I", sub: "Volume One" },
  { text: "Ongoing", sub: "Since 2015" },
];

const GLYPHS = ["§", "✦", "※", "◆", "⬡"];

function YouTubeEmbed({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="mt-6">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-navy-deep">
        <iframe
          src={src}
          title={caption ?? "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft">{caption}</p>
      )}
    </div>
  );
}

function ImageEmbed({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="mt-6">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-paper-deep">
        <img src={src} alt={caption ?? "Embedded image"} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft">{caption}</p>
      )}
    </div>
  );
}

function MosaicBox({ topic, span, tint }: { topic: TopicData; span: string; tint: string }) {
  const [open, setOpen] = useState(false);
  const isLarge = span.includes("row-span-2") && span.includes("col-span-2");
  const isTall = span.includes("row-span-2") && !span.includes("col-span-2");
  const isWide = span.includes("col-span-2") && !span.includes("row-span-2");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative ${span} min-h-[140px] overflow-hidden rounded-2xl border border-border ${tint} transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/60 hover:shadow-[0_12px_32px_-16px_hsl(220_60%_4%/0.35),0_0_0_1px_hsl(var(--gold)/0.15)] cursor-pointer`}
      >
        <span className="absolute inset-0 ring-1 ring-inset ring-paper/30 mix-blend-overlay pointer-events-none" />

        {/* Subtle gold light-sweep on hover */}
        <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent" />

        <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
          <h3
            className={`font-display text-ink leading-tight transition-colors duration-400 group-hover:text-gold ${
              isLarge ? "text-2xl md:text-3xl" : isTall || isWide ? "text-lg md:text-xl" : "text-base md:text-lg"
            }`}
          >
            {topic.label}
          </h3>
          {(isLarge || isWide) && topic.blurb && (
            <p className="mt-1.5 text-sm text-ink-soft/70 leading-relaxed line-clamp-2 transition-opacity duration-400 group-hover:text-ink-soft">
              {topic.blurb}
            </p>
          )}
        </div>

        {topic.embed?.type === "youtube" && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-navy-deep/50 backdrop-blur-sm flex items-center justify-center border border-paper/10">
            <Play className="w-3 h-3 text-paper fill-paper" />
          </div>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-paper p-0 overflow-hidden">
          <div className="p-7 md:p-10">
            <DialogTitle className="font-display text-2xl md:text-4xl text-ink leading-tight pr-8">
              {topic.label}
            </DialogTitle>
            {topic.blurb && (
              <p className="mt-2 text-ink-soft text-sm font-mono uppercase tracking-widest">
                {topic.blurb}
              </p>
            )}
            <div className="rule-gold my-6" />
            <DialogDescription asChild>
              <div className="text-ink-soft text-base md:text-lg leading-relaxed font-display">
                {topic.detail.split("\n").map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
                ))}
              </div>
            </DialogDescription>

            {topic.embed?.type === "youtube" && (
              <YouTubeEmbed src={topic.embed.src} caption={topic.embed.caption} />
            )}
            {topic.embed?.type === "image" && (
              <ImageEmbed src={topic.embed.src} caption={topic.embed.caption} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* Decorative filler boxes for sparse pages */
function FillerBox({ filler }: { filler: FillerData }) {
  if (filler.kind === "quote") {
    return (
      <div className={`${filler.span} ${filler.tint} min-h-[140px] rounded-2xl border border-border p-5 md:p-6 flex items-center overflow-hidden`}>
        <blockquote className="font-accent text-ink-soft text-base md:text-lg leading-snug italic">
          &ldquo;{filler.content}&rdquo;
        </blockquote>
      </div>
    );
  }

  if (filler.kind === "stamp") {
    return (
      <div className={`${filler.span} ${filler.tint} min-h-[140px] rounded-2xl border border-border flex items-center justify-center`}>
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl text-gold leading-none">{filler.content}</p>
          {filler.sub && (
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-gold/70 mt-1.5">{filler.sub}</p>
          )}
        </div>
      </div>
    );
  }

  if (filler.kind === "swatch") {
    return (
      <div className={`${filler.span} ${filler.tint} min-h-[140px] rounded-2xl border border-border flex items-center justify-center`}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-navy-deep/20 border border-gold/20" />
      </div>
    );
  }

  // glyph
  return (
    <div className={`${filler.span} ${filler.tint} min-h-[140px] rounded-2xl border border-border flex items-center justify-center`}>
      <span className="font-display text-3xl text-gold/40 select-none">{filler.content}</span>
    </div>
  );
}

/* Generate fillers to pad sparse pages to at least 6 boxes */
function generateFillers(topicCount: number): FillerData[] {
  const minBoxes = 6;
  if (topicCount >= minBoxes) return [];

  const fillers: FillerData[] = [];
  const needed = minBoxes - topicCount;

  // Add a quote filler
  fillers.push({
    kind: "quote",
    content: QUOTES[topicCount % QUOTES.length],
    span: needed <= 2 ? "col-span-2 row-span-1" : "col-span-2 row-span-2",
    tint: "bg-gradient-to-br from-gold/8 via-paper to-paper-deep",
  });

  if (needed >= 2) {
    fillers.push({
      kind: "stamp",
      content: STAMPS[topicCount % STAMPS.length].text,
      sub: STAMPS[topicCount % STAMPS.length].sub,
      span: "col-span-1 row-span-1",
      tint: "bg-paper-deep",
    });
  }

  if (needed >= 3) {
    fillers.push({
      kind: "glyph",
      content: GLYPHS[topicCount % GLYPHS.length],
      span: "col-span-1 row-span-2",
      tint: "bg-paper",
    });
  }

  if (needed >= 4) {
    fillers.push({
      kind: "swatch",
      content: "",
      span: "col-span-1 row-span-1",
      tint: "bg-gradient-to-br from-navy-deep/5 via-paper to-paper-deep",
    });
  }

  return fillers;
}

export function MoodMosaic({ topics }: { topics: TopicData[] }) {
  const fillers = generateFillers(topics.length);
  const allItems: Array<{ type: "topic" | "filler"; data: TopicData | FillerData; span: string; tint: string }> = [
    ...topics.map((t, i) => ({
      type: "topic" as const,
      data: t,
      span: SPANS[i % SPANS.length],
      tint: TINTS[i % TINTS.length],
    })),
    ...fillers.map((f, i) => ({
      type: "filler" as const,
      data: f,
      span: f.span,
      tint: f.tint,
    })),
  ];

  return (
    <section className="container py-8 md:py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3 md:gap-4">
        {allItems.map((item, i) =>
          item.type === "topic" ? (
            <MosaicBox
              key={(item.data as TopicData).slug}
              topic={item.data as TopicData}
              span={item.span}
              tint={item.tint}
            />
          ) : (
            <FillerBox key={`filler-${i}`} filler={item.data as FillerData} />
          )
        )}
      </div>
    </section>
  );
}
