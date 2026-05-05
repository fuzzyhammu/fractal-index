import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Atom, Cpu, Music2, Mic2, Code2, PenTool, Languages, Trophy,
  Camera, Wand2, Brain, Palette,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { PullQuote } from "@/components/Editorial";
import { Bento, type BentoItem } from "@/components/Bento";
import { HeroSlideshow, type Slide } from "@/components/HeroSlideshow";
import { CLUSTERS, findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import heroPortrait from "@/assets/hero-portrait.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";
import texturePaper from "@/assets/texture-paper.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";

/* -------------------- HERO SLIDESHOW -------------------- */
const HERO_SLIDES: Slide[] = [
  {
    src: heroPortrait, alt: "Geetika Gehlot — portrait",
    tone: "light", eyebrow: "Geetika Gehlot · 17 · Montréal",
    title: "Polymath in motion.",
    body: "Self-taught high-energy physicist since age 10 · Bollywood child artist · Hindustani classical vocalist · electric guitarist · 400+ chapter sci-fi novelist · FRC 7700 · YMCA Youth Co-op VP.",
  },
  {
    src: atmosTelescope, alt: "Telescope under stars",
    tone: "light", eyebrow: "Plate II · Physics",
    title: "SUSY, relativity, the cosmos.",
    body: "Two years of university-level physics, chemistry, math, and biology — covered independently before grade 11. Mentored by Prof. Mariana Frank in particle physics.",
  },
  {
    src: atmosNotebook, alt: "Open notebook with handwritten pages",
    tone: "dark", eyebrow: "Plate III · The Novel",
    title: "400+ chapters and counting.",
    body: "A multiverse-spanning sci-fi/fantasy series — drafted, scene by scene, between AP prep and Olympiad rounds.",
  },
  {
    src: atmosMusic, alt: "Stage lights and microphone",
    tone: "light", eyebrow: "Plate IV · Voice & Strings",
    title: "Classical voice. Polyphia in 6 months.",
    body: "Hindustani vocal competitions won. Electric guitar from zero to 'Goat' by Polyphia — polyrhythmic riffs included — in half a year.",
  },
  {
    src: texturePaper, alt: "Aged paper texture",
    tone: "dark", eyebrow: "Plate V · The Receipts",
    title: "Most-awarded student in her school.",
    body: "Hundreds of awards. SOF, IOQM, JSO, RMO, TCS IntelliGem top-4 nationally. EMSB ministry: 100 in math, 100 in history, 97 in science.",
  },
];


/* -------------------- SKILLS TOOLKIT -------------------- */
const SKILLS: { icon: React.ComponentType<{ className?: string }>; label: string; level: string }[] = [
  { icon: Atom,      label: "Physics",          level: "Self-taught since age 10 · SUSY, QM, relativity" },
  { icon: Brain,     label: "Mathematics",      level: "IOQM · RMO · AP Calc BC prep" },
  { icon: Cpu,       label: "Robotics",         level: "FRC Team 7700 · 2025–26" },
  { icon: Code2,     label: "Code + Cybersec",  level: "Music/image/video stacks · offensive sec goals" },
  { icon: PenTool,   label: "Writing",          level: "400+ chapter sci-fi/fantasy novel" },
  { icon: Music2,    label: "Hindustani Vocal", level: "Competition winner · classical training" },
  { icon: Mic2,      label: "Acting + Dubbing", level: "Bollywood child artist · YouTube reel" },
  { icon: Camera,    label: "Multimedia",       level: "Music production · video & image editing" },
  { icon: Palette,   label: "Visual Art",       level: "Canvas painting · embroidery" },
  { icon: Trophy,    label: "Strategy + Sport", level: "State-level chess · badminton · TT · karate" },
  { icon: Languages, label: "Languages",        level: "EN · HI · FR" },
  { icon: Wand2,     label: "Rap Architecture", level: "Verse-by-verse phonetic engineering" },
];

/* -------------------- FEATURED HIGHLIGHTS BENTO -------------------- */
const FEATURED: BentoItem[] = [
  {
    id: "f-frc", size: "xl", eyebrow: "Robotics",
    title: "FRC Team 7700 · 2025–26",
    blurb: "Engineering and teamwork inside Montréal's competition robotics circuit.",
    image: atmosTelescope, meta: "Works · FRC Team 7700",
    detail: "Sharing CAD, build, and driver-station work with an ambitious 7700 crew during the 2025–26 season.",
  },
  {
    id: "f-novel", size: "lg", eyebrow: "Writing",
    title: "400+ chapter sci-fi cycle",
    blurb: "A multiverse-and-fantasy novel sequel — drafted alongside everything else.",
    image: atmosNotebook, meta: "Works · Novel Series Archive",
  },
  {
    id: "f-vocal", size: "md", eyebrow: "Performance",
    title: "Hindustani classical vocal",
    blurb: "Competition wins, training in raagas, performance reels.",
    image: atmosMusic, meta: "Works · Vocal Performance",
  },
  {
    id: "f-ap", size: "md", eyebrow: "Academics",
    title: "5 AP exams in grade 10",
    blurb: "Chem · Bio · Env Sci · Phys C Mech · Phys C E&M — all passed.", meta: "Academics · Highlights",
  },
  {
    id: "f-acting", size: "md", eyebrow: "Screen",
    title: "Bollywood child-artist reel",
    blurb: "Acting and dubbing credits — full YouTube playlist.", meta: "Works · Child Artist Archive",
  },
  {
    id: "f-ymca", size: "md", eyebrow: "Leadership",
    title: "YMCA Youth Co-op · VP",
    blurb: "NDG–Westmount 2025: built a 15-teen co-op from scratch.", meta: "Works · YMCA Youth Co-op",
  },
];

/* -------------------- RANDOM WINS / CURIOSITIES TEASER -------------------- */
const CURIOSITIES: BentoItem[] = [
  { id: "c-karate", size: "md", eyebrow: "Mat", title: "Martial-arts trophies & medals", blurb: "Years of karate — multiple trophies and medals across competitions.", meta: "Works · Karate" },
  { id: "c-abacus", size: "md", eyebrow: "Mental Math", title: "Whiz Kids Abacus · National Rank 3", blurb: "National-level abacus champion — lightning arithmetic from elementary years.", meta: "Works · Abacus" },
  { id: "c-chess", size: "sm", eyebrow: "Strategy", title: "State-level chess (India)", blurb: "Tournament qualifier at the state level.", meta: "Works · Chess" },
  { id: "c-tcs", size: "sm", eyebrow: "Olympiad", title: "TCS IntelliGem · top-4 nationally", blurb: "Qualified top-4 in all of India in grade 5 — same year as head girl.", meta: "Academics · Awards" },
  { id: "c-princess", size: "sm", eyebrow: "Title", title: "School Princess · grades 3 & 5", blurb: "Crowned twice during elementary years.", meta: "About · Identity Timeline" },
  { id: "c-misc", size: "wide", eyebrow: "Side quests", title: "And dozens more — most-awarded student in her school", blurb: "Hundreds of certificates, medals, and titles. The full ledger lives in the vault.", meta: "Vault · Recognition" },
];

const Index = () => {
  useReveal();

  return (
    <PageShell>
      {/* HERO — fullscreen navigable slideshow */}
      <HeroSlideshow slides={HERO_SLIDES} />

      {/* MANIFESTO — layered: paper bg + drifting notebook + telescope corner + crumpled-paper veil */}
      <section
        id="after-hero"
        className="relative py-16 md:py-24 scroll-mt-16 overflow-hidden crumpled-paper crinkle film-grain leak parchment fibers"
      >
        <img
          src={texturePaper}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply pointer-events-none animate-ken"
        />
        <img
          src={atmosNotebook}
          alt=""
          aria-hidden
          className="absolute -right-16 top-6 w-[44%] max-w-2xl h-[80%] object-cover opacity-20 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={atmosTelescope}
          alt=""
          aria-hidden
          className="absolute -left-24 -bottom-10 w-[28%] max-w-md h-[55%] object-cover opacity-10 grayscale rotate-[-4deg] pointer-events-none hidden md:block animate-drift"
        />

        <div className="container relative">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-3" data-reveal>
              <p className="label-gold">§ 00 · Foreword</p>
              <p className="eyebrow mt-3">Read aloud</p>
              <div className="rule-gold mt-5 max-w-[60%]" />
            </div>
            <div className="md:col-span-9 max-w-3xl">
              <p
                className="font-display text-3xl md:text-5xl text-ink leading-[1.05] text-balance drop-cap"
                data-reveal
              >
                Born February 2009 in India. Moved to Montréal on October 10, 2024. Now in
                Secondary 5 in Westmount, Quebec — one year from graduation, already deep
                into university physics, Olympiad math, and a 400-chapter sci-fi novel.
              </p>
              <div className="rule-double my-8 max-w-xs" data-reveal data-reveal-delay="120" />
              <p
                className="font-accent text-xl md:text-2xl text-ink-soft leading-relaxed"
                data-reveal
                data-reveal-delay="200"
              >
                I have been self-teaching high-energy physics since I was ten. I act in
                Bollywood productions, sing Hindustani classical, play electric guitar
                (zero to Polyphia in six months), paint on canvas, lead a YMCA youth
                co-op, and aim straight at elite U.S. universities — and, eventually, a
                multibillion-dollar career in science and business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <PullQuote attr="The operating principle">
          Curiosity is not my hobby. It is my operating system.
        </PullQuote>
      </div>

      {/* SKILLS TOOLKIT — layered telescope + cosmos veil + scanlines */}
      <section className="relative py-14 md:py-20 overflow-hidden scanlines film-grain dust weave-soft stipple">
        <img
          src={atmosTelescope}
          alt=""
          aria-hidden
          className="absolute -left-24 top-10 w-[40%] max-w-xl h-[80%] object-cover opacity-25 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={textureCosmos}
          alt=""
          aria-hidden
          className="absolute right-0 -bottom-10 w-[55%] h-[60%] object-cover opacity-10 pointer-events-none animate-drift"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 01 · Toolkit</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Skills I bring <span className="font-accent text-gold">to the table.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
              A working list, not a brag sheet. Each tool earns its place by what I've shipped, not what I've studied.
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {SKILLS.map(({ icon: I, label, level }, idx) => (
              <li
                key={label}
                data-reveal
                data-reveal-delay={String(idx * 40)}
                className="fancy-tile bg-paper p-5 group hover:bg-navy-deep hover:text-paper-contrast transition-all duration-500 relative overflow-hidden fibers stipple hover:-translate-y-1"
              >
                <I className="w-5 h-5 text-gold mb-4 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110" />
                <p className="font-display text-xl leading-tight">{label}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft group-hover:text-paper-contrast-soft mt-2">
                  {level}
                </p>
                <span className="absolute right-3 top-3 font-mono text-[0.55rem] tracking-[0.25em] text-ink-soft/40 group-hover:text-gold transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED HIGHLIGHTS BENTO — cosmos bg + crumpled-paper field + drifting notebook */}
      <section className="relative py-14 md:py-20 overflow-hidden crumpled-paper film-grain leak marble fibers">
        <img
          src={textureCosmos}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none animate-ken"
        />
        <img
          src={atmosNotebook}
          alt=""
          aria-hidden
          className="absolute -left-10 bottom-0 w-[26%] max-w-sm h-[55%] object-cover opacity-10 grayscale rotate-[3deg] pointer-events-none hidden md:block animate-float"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 02 · Showcase</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Featured <span className="font-accent text-gold">work.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
              Hover for the elevator pitch. Click for the full story.
            </p>
          </div>
          <div data-reveal>
            <Bento items={FEATURED} />
          </div>
        </div>
      </section>

      {/* TRIPTYCH — three layered plates */}
      <section className="container py-8 md:py-10">
        <div className="grid md:grid-cols-3 gap-2">
          {[
            { src: atmosTelescope, label: "Observation", num: "I" },
            { src: atmosNotebook, label: "Notation", num: "II" },
            { src: atmosMusic, label: "Resonance", num: "III" },
          ].map((x, idx) => (
            <figure
              key={x.label}
              data-reveal
              data-reveal-delay={String(idx * 120)}
              className="relative aspect-[3/4] overflow-hidden group crumpled-paper film-grain stipple"
            >
              <img
                src={x.src}
                alt={x.label}
                width={1600}
                height={1000}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-3 border border-paper/15 pointer-events-none" />
              <figcaption className="absolute bottom-6 left-6 right-6 text-paper">
                <span className="font-mono text-xs text-gold tracking-widest">PLATE {x.num}</span>
                <p className="font-display text-3xl md:text-4xl mt-1 leading-tight">{x.label}</p>
                <span className="block w-10 h-px bg-gold mt-3 transition-all duration-500 group-hover:w-20" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* RANDOM WINS / CURIOSITIES TEASER — paper texture wash + crinkle */}
      <section className="relative py-12 md:py-16 overflow-hidden crinkle film-grain dust linen parchment weave-soft">
        <img
          src={texturePaper}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply pointer-events-none"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 03 · Random Wins</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Belts, medals <span className="font-accent text-gold">& side quests.</span>
              </h2>
            </div>
            <Link
              to="/works#karate"
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft hover:text-gold transition-colors flex items-center gap-2 group"
            >
              Open the full vault
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div data-reveal>
            <Bento items={CURIOSITIES} />
          </div>
        </div>
      </section>

      {/* GRAND GROUPS — index, layered music plate */}
      <section className="relative py-16 md:py-24 overflow-hidden film-grain dust crumpled-paper marble fibers">
        <img
          src={atmosMusic}
          alt=""
          aria-hidden
          className="absolute right-0 top-0 w-[40%] max-w-2xl h-[55%] object-cover opacity-20 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={texturePaper}
          alt=""
          aria-hidden
          className="absolute -left-10 bottom-0 w-[30%] max-w-md h-[50%] object-cover opacity-15 mix-blend-multiply pointer-events-none hidden md:block"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 04 · The Archive</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Five pages, <span className="font-accent text-gold">one dossier.</span>
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft text-sm leading-relaxed font-accent italic">
                The whole site lives across five pages — about, academics & research,
                the merged works, the document vault, and a way to reach me. No grand
                groupings, no fractal cul-de-sacs. Just five doors.
              </p>
            </div>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border" data-reveal>
            {CLUSTERS.map((c) => {
              const CI = c.icon;
              return (
                <li key={c.slug} className="bg-paper">
                  <Link
                    to={`/${c.slug}`}
                    className="fancy-tile group/tile block p-6 h-full hover:bg-navy-deep hover:text-paper-contrast transition-all duration-500 relative overflow-hidden fibers stipple hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <CI className="w-5 h-5 text-gold" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-gold">{c.num}</span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl leading-snug mb-2">{c.label}</h4>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft group-hover/tile:text-paper-contrast-soft mt-2">
                      {c.tagline}
                    </p>
                    <ArrowUpRight className="absolute right-4 bottom-4 w-4 h-4 text-ink-soft group-hover/tile:text-gold group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1 transition-all duration-500" />
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-700 group-hover/tile:w-full" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CORE TRAITS BAND — layered cosmos + telescope + crumpled-paper veil */}
      <section className="force-light bg-navy-deep text-paper py-20 md:py-28 relative overflow-hidden grain crumpled-paper film-grain leak marble stipple">
        <img
          src={textureCosmos}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-ken"
        />
        <img
          src={atmosTelescope}
          alt=""
          aria-hidden
          className="absolute -right-20 top-10 w-[35%] max-w-xl h-[70%] object-cover opacity-15 grayscale pointer-events-none hidden md:block animate-float"
        />
        <div className="container relative">
          <p className="label-gold mb-6" data-reveal>§ 05 · Core Traits</p>
          <h2 className="display-xl text-4xl md:text-6xl mb-12 max-w-3xl text-balance" data-reveal>
            Five instincts <span className="font-accent text-gold">I trust</span> before any plan.
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              ["I", "Analytical Precision", "Numbers before opinions."],
              ["II", "Creative Intelligence", "Form follows imagination."],
              ["III", "Leadership", "Quiet, by example."],
              ["IV", "Relentless Work Ethic", "Hours compound."],
              ["V", "Cross-disciplinary Thinking", "Edges are where ideas meet."],
            ].map(([n, t, d], idx) => (
              <div
                key={t}
                className="border-t border-gold/40 pt-4"
                data-reveal
                data-reveal-delay={String(idx * 100)}
              >
                <p className="font-mono text-xs text-gold tracking-widest">{n}</p>
                <h3 className="font-display text-2xl mt-2">{t}</h3>
                <p className="text-paper/70 text-base mt-3 leading-relaxed font-accent">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
