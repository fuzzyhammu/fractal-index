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
      <section className="container pt-12 md:pt-16 pb-8 overflow-hidden">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 02</span>
          <span className="eyebrow text-[0.62rem] md:text-[0.62rem]">Academics, STEM & Research</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-start gap-5 mb-6 animate-fade-in">
          <GraduationCap className="w-6 h-6 text-gold shrink-0 mt-2" />
          <h1 className="display-xl text-lg md:text-xl lg:text-2xl text-balance max-w-4xl animate-fade-up">
            Education timeline, exams, awards, physics, and research.
          </h1>
        </div>
        <p className="mt-6 max-w-2xl text-sm md:text-base text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Every academic claim has evidence. Click any box for the full story —
          transcripts, competition records, and the physics log.
        </p>
        <div className="rule-gold mt-8" />
      </section>

      <div className="overflow-hidden pb-0">
        <MoodMosaic topics={cluster.topics} />
      </div>
    </PageShell>
  );
};

export default Academics;
