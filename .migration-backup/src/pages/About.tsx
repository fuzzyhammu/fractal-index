import { PageShell } from "@/components/SiteChrome";
import { MoodMosaic } from "@/components/MoodMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import heroPortrait from "@/assets/hero-portrait.jpg";

const About = () => {
  useReveal();
  const cluster = findCluster("about")!;

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 01</span>
          <span className="eyebrow">About</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
          <div>
            <h1 className="display-xl text-5xl md:text-7xl lg:text-8xl text-balance max-w-5xl animate-fade-up">
              Who I am, where I come from, and where I am headed.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-display italic animate-fade-up">
              Born in India, raised between continents, now building from Montréal.
              This is the short version of a long story — click any box to go deeper.
            </p>
          </div>
          <figure className="relative shrink-0 w-32 md:w-44 aspect-[3/4] overflow-hidden border border-border bg-paper-deep animate-fade-in">
            <img
              src={heroPortrait}
              alt="Geetika Gehlot — portrait"
              className="absolute inset-0 w-full h-full object-cover object-[60%_30%]"
              loading="lazy"
            />
            <span className="absolute inset-2 border border-paper/20 pointer-events-none" />
          </figure>
        </div>
        <div className="rule-gold mt-10" />
      </section>

      <MoodMosaic topics={cluster.topics} />
    </PageShell>
  );
};

export default About;
