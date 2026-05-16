import { Wand as Wand2 } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { MoodMosaic } from "@/components/MoodMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";

const Works = () => {
  useReveal();
  const cluster = findCluster("works")!;

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 03</span>
          <span className="eyebrow">Works</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-start gap-5 mb-6 animate-fade-in">
          <Wand2 className="w-6 h-6 text-gold shrink-0 mt-2" />
          <h1 className="display-xl text-5xl md:text-7xl lg:text-8xl text-balance max-w-5xl animate-fade-up">
            Every craft under one roof.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-display italic animate-fade-up">
          Robotics, writing, music, screen, design, art, leadership, sport —
          click any box to see the receipts, build logs, and performance reels.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <MoodMosaic topics={cluster.topics} />
    </PageShell>
  );
};

export default Works;
