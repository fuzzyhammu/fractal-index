import { useState } from "react";
import { X, Play, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

const TINTS = [
  "from-gold/15 via-paper to-paper",
  "from-paper via-paper to-navy-deep/10",
  "from-navy-deep/10 via-paper to-gold/10",
  "from-paper-deep via-paper to-paper",
  "from-gold/20 via-paper-deep to-paper",
  "from-paper via-gold/10 to-paper-deep",
  "from-navy-deep/8 via-gold/8 to-paper",
  "from-paper-deep via-navy-deep/5 to-paper",
  "from-gold/12 via-paper to-navy-deep/8",
  "from-paper via-paper-deep to-gold/8",
  "from-gold/18 via-paper to-paper",
  "from-paper-deep via-gold/5 to-paper",
];

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
        <img
          src={src}
          alt={caption ?? "Embedded image"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative ${span} min-h-[140px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tint} transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-24px_hsl(220_60%_4%/0.4)] cursor-pointer`}
      >
        <span className="absolute inset-0 ring-1 ring-inset ring-paper/30 mix-blend-overlay pointer-events-none" />
        <span className="absolute inset-0 holo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
          <h3
            className={`font-display text-ink leading-tight transition-colors duration-300 group-hover:text-gold ${
              isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {topic.label}
          </h3>
          {isLarge && topic.blurb && (
            <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">
              {topic.blurb}
            </p>
          )}
        </div>
        {topic.embed?.type === "youtube" && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-navy-deep/60 flex items-center justify-center">
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

export function MoodMosaic({ topics }: { topics: TopicData[] }) {
  return (
    <section className="px-4 md:px-12 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[120px] md:auto-rows-[140px] gap-3 md:gap-4">
        {topics.map((t, i) => (
          <MosaicBox
            key={t.slug}
            topic={t}
            span={SPANS[i % SPANS.length]}
            tint={TINTS[i % TINTS.length]}
          />
        ))}
      </div>
    </section>
  );
}
