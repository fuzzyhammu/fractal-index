import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { CLUSTERS } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";

const Dashboard = () => {
  useReveal();

  return (
    <PageShell>
      <section className="container pt-12 md:pt-16 pb-6">
        <div className="flex items-baseline gap-4 mb-5 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ ✦✦</span>
          <span className="eyebrow">Dashboard</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-5xl md:text-7xl lg:text-8xl text-balance max-w-5xl animate-fade-up">
          Five pages, one dossier.
        </h1>
        <p className="mt-5 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-display italic animate-fade-up">
          A single index of every section. Pick a door.
        </p>
        <div className="rule-gold mt-8" />
      </section>

      <section className="container py-10 md:py-14" data-reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {CLUSTERS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group dossier-card p-6 hover-lift flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="font-mono text-[0.65rem] tracking-widest text-gold">{c.num}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink leading-tight group-hover:text-gold transition-colors">
                    {c.label}
                  </h2>
                  <p className="mt-2 text-ink-soft text-sm leading-relaxed">{c.tagline}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    {c.topics.length} topics
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-gold transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default Dashboard;
