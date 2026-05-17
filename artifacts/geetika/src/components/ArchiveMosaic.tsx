import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";
import heroPortrait from "@/assets/hero-portrait.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";

const BG_POOL = [heroPortrait, atmosNotebook, atmosTelescope, atmosMusic, textureCosmos, atmosNotebook, atmosTelescope, heroPortrait, atmosMusic, textureCosmos, atmosNotebook, atmosTelescope];

function pickImage(topic: TopicData, index: number): string {
  const s = (topic.label + " " + topic.blurb).toLowerCase();
  if (s.includes("music") || s.includes("vocal") || s.includes("riyaaz") || s.includes("instrument")) return atmosMusic;
  if (s.includes("physics") || s.includes("telescope") || s.includes("research") || s.includes("cosmos") || s.includes("science")) return atmosTelescope;
  if (s.includes("note") || s.includes("writing") || s.includes("essay") || s.includes("journal") || s.includes("novel")) return atmosNotebook;
  if (s.includes("profile") || s.includes("identity") || s.includes("about") || s.includes("personal")) return heroPortrait;
  return BG_POOL[index % BG_POOL.length];
}

function ArchiveTile({ topic, index, span }: { topic: TopicData; index: number; span: string }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const img = pickImage(topic, index);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fancy-tile group/tile relative ${span} overflow-hidden bg-paper border border-border hover:bg-navy-deep hover:text-paper-contrast transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold fibers stipple text-left`}
        style={{ minHeight: "160px" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500">
          <img src={img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold">{num}</span>
            <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover/tile:text-gold group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 transition-all duration-400" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-base md:text-lg leading-snug group-hover/tile:text-paper-contrast transition-colors duration-300">
              {topic.label}
            </h3>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-soft group-hover/tile:text-paper-contrast-soft transition-colors duration-300 line-clamp-2">
              {topic.blurb}
            </p>
          </div>
        </div>

        <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover/tile:w-full" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-paper">
          <div className="grid md:grid-cols-[1fr,1.1fr]">
            <div className="relative min-h-[200px] md:min-h-[440px] overflow-hidden bg-navy-deep">
              <img src={img} alt={topic.label} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">{num}</span>
              </div>
            </div>
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <DialogTitle className="font-display text-2xl md:text-3xl leading-tight text-ink mb-2">{topic.label}</DialogTitle>
              <p className="font-accent italic text-base text-ink-soft mb-5">{topic.blurb}</p>
              <div className="h-px bg-border mb-5" />
              <DialogDescription asChild>
                <div className="text-sm md:text-base leading-relaxed text-ink-soft font-display">
                  {topic.detail.split("\n").map((p, i) => <p key={i} className={i > 0 ? "mt-3" : ""}>{p}</p>)}
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const SPANS_SM = ["col-span-2", "col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1", "col-span-2"];
const SPANS_LG = ["col-span-2", "col-span-1", "col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1", "col-span-1", "col-span-2"];

export function ArchiveMosaic({ topics }: { topics: TopicData[] }) {
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3.5">
        {topics.map((topic, i) => {
          const lgSpan = SPANS_LG[i % SPANS_LG.length];
          const smSpan = SPANS_SM[i % SPANS_SM.length];
          return (
            <ArchiveTile key={topic.slug} topic={topic} index={i} span={`${smSpan} md:${lgSpan}`} />
          );
        })}
      </div>
    </section>
  );
}
