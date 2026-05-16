import { GraduationCap } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { MoodMosaic } from "@/components/MoodMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";

const Academics = () => {
  useReveal();
  const cluster = findCluster("academics")!;

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 02</span>
          <span className="eyebrow">Academics, STEM & Research</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-start gap-5 mb-6 animate-fade-in">
          <GraduationCap className="w-6 h-6 text-gold shrink-0 mt-2" />
          <h1 className="display-xl text-5xl md:text-7xl lg:text-8xl text-balance max-w-5xl animate-fade-up">
            Education timeline, exams, awards, physics, and research.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-display italic animate-fade-up">
          Every academic claim has evidence. Click any box for the full story —
          transcripts, competition records, and the physics log.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <MoodMosaic topics={cluster.topics} />
    </PageShell>
  );
};

export default Academics;
