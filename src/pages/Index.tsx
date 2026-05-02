import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { Stat, PullQuote } from "@/components/Editorial";
import { GRAND_GROUPS, findCluster } from "@/data/clusters";
import heroPortrait from "@/assets/hero-portrait.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";

function GrandGroupRow({
  group, open, onToggle,
}: { group: typeof GRAND_GROUPS[number]; open: boolean; onToggle: () => void }) {
  const GI = group.icon;
  return (
    <div className="border-t border-border">
      <button
        onClick={onToggle}
        className="w-full grid md:grid-cols-12 gap-6 items-center py-8 text-left group"
        aria-expanded={open}
      >
        <div className="md:col-span-3 flex items-center gap-3">
          <GI className="w-5 h-5 text-gold" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold">Grand Group</span>
        </div>
        <div className="md:col-span-7">
          <h3 className="font-display text-3xl md:text-4xl text-ink group-hover:text-gold transition-colors">
            {group.label}
          </h3>
          <p className="text-ink-soft text-sm mt-1">{group.tagline}</p>
        </div>
        <div className="md:col-span-2 flex justify-end items-center gap-2">
          <span className="font-mono text-[0.6rem] tracking-widest text-ink-soft">
            {group.clusterSlugs.length} clusters
          </span>
          <ChevronDown className={`w-4 h-4 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {group.clusterSlugs.map((cs) => {
              const c = findCluster(cs);
              if (!c) return null;
              return (
                <li key={cs} className="bg-paper">
                  <Link
                    to={`/${c.slug}`}
                    className="group/tile block p-8 h-full hover:bg-navy-deep hover:text-paper transition-colors duration-500"
                  >
                    <div className="flex items-start justify-between mb-12">
                      <span className="font-mono text-xs tracking-widest text-gold">{c.num}</span>
                      <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover/tile:text-gold group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1 transition-all" />
                    </div>
                    <h4 className="font-display text-3xl leading-tight mb-2">{c.label}</h4>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft group-hover/tile:text-paper/60">
                      {c.tagline}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const toggle = (slug: string) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  const allOpen = openSet.size === GRAND_GROUPS.length;
  const setAll = (open: boolean) =>
    setOpenSet(open ? new Set(GRAND_GROUPS.map((g) => g.slug)) : new Set());
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative min-h-[100vh] -mt-16 bg-navy-deep text-paper overflow-hidden grain">
        <img
          src={textureCosmos}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          aria-hidden
        />
        <img
          src={heroPortrait}
          alt="Geetika Gehlot"
          width={1080}
          height={1920}
          className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover object-[60%_30%] opacity-70 md:opacity-90 mix-blend-luminosity md:mix-blend-normal"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(222 65% 6% / 0.95) 0%, hsl(222 65% 6% / 0.6) 45%, hsl(222 65% 6% / 0.2) 75%, hsl(222 65% 6% / 0.7) 100%)",
          }}
        />

        <div className="relative container min-h-[100vh] pt-32 pb-16 flex flex-col justify-between">
          {/* Top bar */}
          <div className="flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.3em] text-paper/60">
            <span>E-Portfolio · Edition I</span>
            <span className="hidden md:inline">Montréal · 45.50°N · 73.57°W</span>
            <span>MMXXVI</span>
          </div>

          {/* Title */}
          <div className="max-w-4xl animate-fade-up">
            <p className="label-gold mb-6">Geetika Gehlot</p>
            <h1 className="display-xl text-[14vw] md:text-[10rem] leading-[0.85] text-paper">
              Building<br />
              <em className="text-gold not-italic font-light italic">worlds</em><br />
              through science,<br />
              art, &amp; innovation.
            </h1>
            <p className="mt-10 max-w-xl text-paper/80 text-lg leading-relaxed font-display italic">
              Scientist · Researcher · Creator · Musician · Storyteller · Innovator.
              A 15-year-old multidisciplinary researcher, creator, and future
              physicist-engineer.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 border-t border-paper/20 pt-8">
            {[
              ["15", "Years"],
              ["02", "Countries"],
              ["05", "Disciplines"],
              ["100+", "Awards"],
              ["03", "Languages"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-3xl md:text-5xl text-paper">{v}</div>
                <div className="eyebrow text-paper/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] text-paper/40 animate-shimmer">
          ↓ TURN THE PAGE
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="container py-24 md:py-40">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="label-gold">§ 00 · Foreword</p>
            <p className="eyebrow mt-3">Read aloud</p>
          </div>
          <div className="md:col-span-9 max-w-3xl">
            <p className="font-display text-3xl md:text-5xl text-ink leading-tight text-balance drop-cap">
              This is not a résumé. It is a working dossier — equal parts laboratory
              notebook, gallery catalogue, and founder's manifesto. Every page has
              layers, sublayers, evidence. Every claim is meant to be examined.
            </p>
            <div className="rule-double my-12 max-w-xs" />
            <p className="text-ink-soft text-lg leading-relaxed">
              I was born in India, raised between two continents, and I now write,
              perform, code, and study physics from Montréal. I have spent the
              last ten years collecting questions; this site is where I begin to
              answer them — in public, with proof.
            </p>
          </div>
        </div>
      </section>

      <PullQuote attr="The operating principle">
        Curiosity is not my hobby. It is my operating system.
      </PullQuote>

      {/* TRIPTYCH */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-2">
          {[
            { src: atmosTelescope, label: "Observation", num: "I" },
            { src: atmosNotebook, label: "Notation", num: "II" },
            { src: atmosMusic, label: "Resonance", num: "III" },
          ].map((x) => (
            <figure key={x.label} className="relative aspect-[3/4] overflow-hidden group">
              <img
                src={x.src}
                alt={x.label}
                width={1600}
                height={1000}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 text-paper">
                <span className="font-mono text-xs text-gold tracking-widest">PLATE {x.num}</span>
                <p className="font-display text-3xl mt-1">{x.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* QUICK NAVIGATION GRID */}
      <section className="container py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-gold mb-3">§ 01 · Index</p>
            <h2 className="display-xl text-4xl md:text-6xl text-ink">The Archive</h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <p className="hidden md:block max-w-sm text-ink-soft text-sm leading-relaxed text-right">
              Fourteen clusters, bundled into four grand groups. Toggle any group
              to expand its dossier. Begin anywhere.
            </p>
            <button
              onClick={() => setAll(!allOpen)}
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft hover:text-gold transition-colors flex items-center gap-2"
            >
              {allOpen ? "Collapse all" : "Expand all"}
              <ChevronDown className={`w-3 h-3 transition-transform ${allOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <div className="border-b border-border">
          {/* Top tile: Dashboard quick link */}
          <div className="border-t border-border py-6 flex items-center gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold">✦ Launcher</span>
            <Link to="/dashboard" className="flex-1 font-display text-2xl text-ink hover:text-gold transition-colors">
              Open the Dashboard →
            </Link>
          </div>
          {GRAND_GROUPS.map((g) => (
            <GrandGroupRow
              key={g.slug}
              group={g}
              open={openSet.has(g.slug)}
              onToggle={() => toggle(g.slug)}
            />
          ))}
        </div>
      </section>

      {/* CORE TRAITS BAND */}
      <section className="bg-navy-deep text-paper py-24 md:py-32 relative overflow-hidden grain">
        <img src={textureCosmos} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="container relative">
          <p className="label-gold mb-6">§ 01.3 · Core Traits</p>
          <h2 className="display-xl text-5xl md:text-7xl mb-16 max-w-3xl text-balance">
            Five instincts I trust before any plan.
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              ["I", "Analytical Precision", "Numbers before opinions."],
              ["II", "Creative Intelligence", "Form follows imagination."],
              ["III", "Leadership", "Quiet, by example."],
              ["IV", "Relentless Work Ethic", "Hours compound."],
              ["V", "Cross-disciplinary Thinking", "Edges are where ideas meet."],
            ].map(([n, t, d]) => (
              <div key={t} className="border-t border-gold/40 pt-4">
                <p className="font-mono text-xs text-gold tracking-widest">{n}</p>
                <h3 className="font-display text-2xl mt-2">{t}</h3>
                <p className="text-paper/60 text-sm mt-3 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="container py-24 md:py-32">
        <p className="label-gold mb-3">§ 01.1 · At a Glance</p>
        <h2 className="display-xl text-4xl md:text-6xl mb-12 max-w-3xl">The shape of one curious life.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="15" label="Age" />
          <Stat value="India → Canada" label="Trajectory" />
          <Stat value="Sec. IV" label="Current grade" />
          <Stat value="Montréal" label="Base" />
          <Stat value="5" label="Disciplines" />
          <Stat value="100+" label="Recognitions" />
          <Stat value="3" label="Languages — EN · HI · FR" />
          <Stat value="∞" label="Open questions" />
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
