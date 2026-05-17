import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";
import heroPortrait from "@/assets/hero-portrait.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";

/* ─── Helpers ─────────────────────────────────────────── */
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t, 0, 1); }
function easeOut(t: number) { return 1 - Math.pow(1 - clamp(t, 0, 1), 3); }
function easeInOut(t: number) {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
}

/* ─── Timeline ─────────────────────────────────────────
   0.00 → 0.06  profile card enters
   0.06 → 0.72  essay reading phase  (cards are 100% invisible)
   0.72 → 1.00  card stacking phase
*/
const ESSAY_START  = 0.04;
const READ_END     = 0.72;   // cards don't exist before this
const CARD_PHASE   = 1.0 - READ_END; // 0.28 of total scroll

/* ─── Card aesthetics ──────────────────────────────────── */
const ENTRY = [
  { angle:  9, x:  60, y: -80 },
  { angle: -8, x: -55, y: -85 },
  { angle: 10, x:  65, y: -75 },
  { angle: -7, x: -50, y: -78 },
  { angle:  8, x:  58, y: -82 },
  { angle: -9, x: -58, y: -72 },
];
const PEEK = [
  { angle: -2.5, x: -6,  y:  4 },
  { angle:  2.0, x:  5,  y:  5 },
  { angle: -3.0, x: -7,  y:  3 },
  { angle:  1.8, x:  6,  y:  6 },
  { angle: -2.2, x: -5,  y:  4 },
  { angle:  2.4, x:  7,  y:  5 },
];
const CARD_BG = [
  "hsl(220 32% 7%)",
  "hsl(226 28% 7.5%)",
  "hsl(215 36% 6.5%)",
  "hsl(228 30% 8%)",
  "hsl(218 38% 6%)",
  "hsl(223 26% 7%)",
];
const CARD_ACCENT = ["#c9a342","#8ab4c8","#c49a3a","#7bbcb4","#d4aa44","#9aaed4"];
const PHOTOS = [heroPortrait, atmosNotebook, atmosTelescope, atmosMusic, textureCosmos, atmosNotebook];

/* ─── Essay ───────────────────────────────────────────── */
function EssayPhoto({ src, alt, caption, align = "right" }: {
  src: string; alt: string; caption: string; align?: "left" | "right" | "full";
}) {
  if (align === "full") return (
    <figure className="my-8 w-full clear-both">
      <div className="relative w-full overflow-hidden border border-border/25" style={{ aspectRatio: "21/8" }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      <figcaption className="mt-1.5 text-center font-mono uppercase tracking-[0.2em] text-ink-soft/40" style={{ fontSize: "8px" }}>{caption}</figcaption>
    </figure>
  );
  return (
    <figure
      className={`my-1 mb-4 ${align === "right" ? "float-right ml-6" : "float-left mr-6"} w-36 md:w-52`}
      style={{ shapeOutside: "border-box" } as React.CSSProperties}
    >
      <div className="relative overflow-hidden border border-border/25 bg-paper-deep" style={{ aspectRatio: "4/5" }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-1 border border-paper/8 pointer-events-none" />
      </div>
      <figcaption className="mt-1 font-mono uppercase tracking-[0.2em] text-ink-soft/38" style={{ fontSize: "7.5px" }}>{caption}</figcaption>
    </figure>
  );
}

function Essay({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={innerRef} className="flex-1 min-h-0 essay-scroll" style={{ overflowY: "hidden" }}>
      <article className="essay-body pr-4 pb-20" style={{ maxWidth: "740px", margin: "0 auto" }}>
        <section className="essay-section mb-8">
          <h3 className="essay-heading">I. Origin</h3>
          <EssayPhoto src={heroPortrait} alt="Geetika portrait" caption="Montréal, 2024" align="right" />
          <p className="drop-cap">I was born in a city that does not sleep lightly. Rajasthan, India — sandstone and spice and a sky so wide it made ambition feel obligatory. My earliest memories are not of a classroom but of the space between things: between words in a conversation I was too young to join, between the notes of a raag my grandmother hummed while she cooked, between the lines of a physics problem my father was explaining to someone else that I absorbed from across the room.</p>
          <p>That space between things is where I have always lived. Not quite inside any single discipline, any single culture, any single language. The gap is not emptiness. It is where everything interesting happens.</p>
          <p>My family moved when I was young — first within India, then to Canada, to Montréal, a city whose own identity is built on productive tension between languages and traditions. I did not know it then, but I was training for that city my whole life.</p>
        </section>
        <section className="essay-section mb-8">
          <h3 className="essay-heading">II. Between Worlds</h3>
          <EssayPhoto src={atmosNotebook} alt="Notebook" caption="Notes, drafts, half-formed questions" align="left" />
          <p>Moving between countries at a formative age rewires something. You stop assuming the way things are done where you grew up is the only way. You develop a permeability to context, an ability to read rooms that are not yours.</p>
          <p>I speak four languages: English, French, Hindi, and Marwari. Each one carries a different register of myself. English is where I think most precisely. French navigates the city. Hindi is where old memories arrive in intact sentences. Marwari is where I belong without explanation.</p>
          <p>Fluency in a culture is not just the language — it is the assumptions embedded in the grammar, the things people do not say because they do not have to. I grew up learning to find those load-bearing silences in more than one culture. It made me a better thinker, writer, and scientist.</p>
        </section>
        <section className="essay-section mb-8">
          <h3 className="essay-heading">III. The Mind and Its Obsessions</h3>
          <EssayPhoto src={atmosTelescope} alt="Telescope" caption="Observing — always observing" align="right" />
          <p>If you asked me to identify the central obsession of my intellectual life, I would not give you a subject. I would give you a posture. I am obsessed with the moment when something that appeared complicated becomes, in the right frame, simple.</p>
          <p>Physics found me through my father, who treated it not as a subject but as a lens. Mathematics followed closely — I competed in olympiads not because I was the fastest calculator but because I loved the architecture of proofs. Chess gave me something similar: the pleasure of thinking several moves ahead. The disciplines are different in almost every surface feature. The underlying skill is the same.</p>
          <p>Computer science arrived as a natural extension. I came to programming not to build apps but to build things that think. I taught myself React, TypeScript, Python. I built this site. Not to be a software engineer, but to be someone who can build whatever needs to be built.</p>
        </section>
        <EssayPhoto src={textureCosmos} alt="Cosmos" caption="The texture of deep time" align="full" />
        <section className="essay-section mb-8">
          <h3 className="essay-heading">IV. The Creative Life</h3>
          <EssayPhoto src={atmosMusic} alt="Music" caption="Riyaaz — daily practice in Hindustani vocal" align="left" />
          <p>The assumption that STEM and the arts are in competition has never matched my experience. The creativity required to design an experiment and to write a novel are not different in kind — different in material, identical in demand.</p>
          <p>I have been training in Hindustani classical vocal for years. Riyaaz is non-negotiable. A raag is a grammar — it specifies which notes are permitted, forbidden, emphasised. Within those constraints, improvisation is required. You must find something new to say inside a structure explored for centuries. This is also what good science asks.</p>
          <p>Writing is the other major strand. I am several volumes into a novel series — a world built over years with its own history, geography, and rules. Worldbuilding at that scale is a systems design problem. Every chapter revised makes me a better thinker.</p>
        </section>
        <section className="essay-section mb-8">
          <h3 className="essay-heading">V. What I Am Building</h3>
          <p>This site is an artifact. I built it from scratch — React, TypeScript, Vite, Tailwind — not because I needed a portfolio but because I needed a structure that could hold the full picture. Every claim has evidence, every skill has a receipt, every curiosity has a paper trail.</p>
          <p>The FRC robotics team taught me what it means to build under pressure with a team counting on you. Twelve weeks of design, iteration, fabrication, testing, ending in competition — and learning to communicate across roles, between strategic vision and engineering constraints.</p>
        </section>
        <section className="essay-section mb-4">
          <h3 className="essay-heading">VI. Where I Am Headed</h3>
          <p>I do not have a five-year plan. I have a model of what I want my work to look like: rigorous, interdisciplinary, evidence-based, built at the intersection of STEM and creative practice. I am fifteen years old. I have been working on these things for most of my conscious life. I am going to keep working on them.</p>
          <p className="font-accent italic text-ink-soft/65 mt-5 text-[14px] border-l-2 border-gold/30 pl-4 clear-both">The dossier is the argument. Everything else on this site is the evidence. Welcome to the paper trail.</p>
          <div className="flex items-center gap-4 mt-8 clear-both">
            <span className="flex-1 h-px bg-border/25" />
            <span className="font-mono text-gold/35 uppercase tracking-[0.3em]" style={{ fontSize: "7.5px" }}>End § 01</span>
            <span className="flex-1 h-px bg-border/25" />
          </div>
        </section>
      </article>
    </div>
  );
}

/* ─── Topic card ───────────────────────────────────────── */
function TopicCard({ topic, index, transform, opacity, zIndex, isInteractive }: {
  topic: TopicData; index: number;
  transform: string; opacity: number; zIndex: number; isInteractive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = CARD_ACCENT[index % CARD_ACCENT.length];
  const bg     = CARD_BG[index % CARD_BG.length];
  const photo  = PHOTOS[index % PHOTOS.length];
  const num    = String(index + 1).padStart(2, "0");

  return (
    <>
      <div
        onClick={() => isInteractive && setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute", inset: 0,
          transform, opacity, zIndex,
          cursor: isInteractive ? "pointer" : "default",
          pointerEvents: isInteractive ? "auto" : "none",
          willChange: "transform, opacity",
          background: bg,
          border: `1px solid ${hovered && isInteractive ? `${accent}66` : `${accent}28`}`,
          borderRadius: "28px",
          overflow: "hidden",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: isInteractive && hovered
            ? `0 0 0 1px ${accent}20, 0 24px 64px -28px hsl(220 90% 3%/0.88)`
            : `0 18px 56px -28px hsl(220 90% 3%/0.72)`,
        }}
      >
        <img src={photo} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.05] grayscale pointer-events-none" />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, hsl(220 50% 100%/0.009) 3px 4px)" }} />
        <div className="pointer-events-none absolute top-0 left-0 right-0" style={{ height: "1px", background: `linear-gradient(to right, transparent, ${accent}${hovered && isInteractive ? "55" : "28"}, transparent)`, transition: "background 0.5s ease" }} />

        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono uppercase tracking-[0.35em]" style={{ fontSize: "9px", color: `${accent}99` }}>§ 01</span>
              <span className="w-6 h-px" style={{ background: `${accent}35` }} />
              <span className="font-mono uppercase tracking-[0.25em]" style={{ fontSize: "9px", color: `${accent}55` }}>{num}</span>
            </div>
            {isInteractive && <span className="font-mono uppercase tracking-[0.22em] text-paper/20" style={{ fontSize: "8.5px" }}>tap to expand →</span>}
          </div>

          <div className="pointer-events-none absolute bottom-6 right-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(120px, 18vw, 240px)", fontWeight: 700, lineHeight: 1, color: `${accent}07`, userSelect: "none", letterSpacing: "-0.05em" }}>{num}</div>

          <div className="relative z-10">
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4.5vw, 60px)", fontWeight: 600, lineHeight: 1.06, color: `hsl(38 30% ${hovered && isInteractive ? 96 : 88}%)`, transition: "color 0.5s ease", marginBottom: "1rem" }}>{topic.label}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(15px, 1.8vw, 22px)", fontStyle: "italic", color: `hsl(38 15% ${hovered && isInteractive ? 74 : 62}%)`, maxWidth: "520px", lineHeight: 1.55, transition: "color 0.5s ease" }}>{topic.blurb}</p>
            <div className="inline-flex items-center gap-2 mt-7" style={{ border: `1px solid ${accent}${hovered && isInteractive ? "40" : "20"}`, padding: "7px 16px", borderRadius: "2px", transition: "border-color 0.5s ease, transform 0.5s ease", transform: hovered && isInteractive ? "translateY(-1px)" : "translateY(0)" }}>
              <span className="font-mono uppercase tracking-[0.28em]" style={{ fontSize: "8.5px", color: `${accent}${hovered && isInteractive ? "aa" : "55"}`, transition: "color 0.5s ease" }}>Read more</span>
              <span style={{ color: `${accent}${hovered && isInteractive ? "aa" : "40"}`, fontSize: "11px", transition: "color 0.5s ease" }}>→</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-[hsl(220_30%_8%)] border border-border text-paper p-0 overflow-hidden">
          <div className="p-7 md:p-9">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono uppercase tracking-[0.3em] text-gold/55" style={{ fontSize: "8.5px" }}>§ 01 · {num}</span>
              <div className="flex-1 h-px bg-border/35" />
            </div>
            <DialogTitle style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 600, color: "hsl(38 40% 92%)", lineHeight: 1.1 }}>{topic.label}</DialogTitle>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontStyle: "italic", color: "hsl(38 20% 62%)", marginTop: "0.4rem", marginBottom: "1.2rem" }}>{topic.blurb}</p>
            <div className="h-px bg-border/28 mb-5" />
            <DialogDescription asChild>
              <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: "14.5px", lineHeight: 1.8, color: "hsl(220 15% 75%)" }}>
                {topic.detail.split("\n").map((para, i) => <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>)}
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ─── Profile card ─────────────────────────────────────── */
function ProfileCard({ ep, essayRef, transform }: {
  ep: number; essayRef: React.RefObject<HTMLDivElement | null>; transform: string;
}) {
  const bOp  = lerp(0.14, 0.50, ep);
  const spr  = lerp(0, 60, ep);
  const gOp  = lerp(0, 0.11, ep);
  const imgW = lerp(48, 88, ep);
  const PY   = lerp(28, 52, ep);
  const PX   = lerp(28, 60, ep);
  const W    = lerp(52, 76, ep);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, transform, willChange: "transform" }}>
      <div
        className="relative flex flex-col bg-[hsl(220_30%_7%)] border overflow-hidden"
        style={{
          width: `${W}%`, maxWidth: "900px",
          height: `calc(100vh - ${lerp(100, 64, ep)}px)`,
          borderColor: `hsl(41 80% 60% / ${bOp})`,
          borderRadius: `${lerp(24, 16, ep)}px`,
          padding: `${PY}px ${PX}px`,
          boxShadow: `0 0 0 1px hsl(41 80% 55% / ${gOp * 0.75}), 0 ${Math.round(spr * 0.2)}px ${spr}px -16px hsl(220 90% 3%/0.92)`,
          transition: "width 0.9s cubic-bezier(0.22,1,0.36,1), height 0.9s cubic-bezier(0.22,1,0.36,1), padding 0.9s cubic-bezier(0.22,1,0.36,1), border-color 0.9s cubic-bezier(0.22,1,0.36,1), border-radius 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {(["top-3.5 left-3.5 border-t border-l","top-3.5 right-3.5 border-t border-r","bottom-3.5 left-3.5 border-b border-l","bottom-3.5 right-3.5 border-b border-r"] as const).map((cls, k) => (
          <span key={k} className={`absolute w-4 h-4 ${cls} border-gold/60`} style={{ opacity: ep * 0.65 }} />
        ))}
        <div className="relative z-10 flex items-start gap-4 md:gap-5 mb-5" style={{ opacity: lerp(0.88, 1, ep) }}>
          <div className="overflow-hidden border border-border/25 bg-paper-deep shrink-0" style={{ width: `${imgW}px`, height: `${imgW}px`, borderRadius: `${lerp(4, 8, ep)}px` }}>
            <img src={heroPortrait} alt="Geetika Gehlot" className="w-full h-full object-cover" />
          </div>
          <div className="pt-1 min-w-0">
            <div className="label-gold mb-2">§ 01 · Personal Profile</div>
            <h2 className="font-display text-paper-contrast text-[clamp(22px,3vw,32px)] leading-none mb-1.5">Geetika Gehlot</h2>
            <p className="font-mono uppercase tracking-[0.28em] text-paper-contrast-soft" style={{ fontSize: "8px" }}>Montréal · India-born · Multidisciplinary</p>
          </div>
        </div>
        <div className="mb-4 text-ink-soft/40 font-mono uppercase tracking-[0.22em]" style={{ fontSize: "7.5px" }}>Scroll to read ↓</div>
        <div className="flex-1 min-h-0 overflow-hidden rounded-[inherit] bg-[hsl(220_30%_6%)] border border-border/20">
          <Essay innerRef={essayRef} />
        </div>
      </div>
    </div>
  );
}

/* ─── Root ─────────────────────────────────────────────── */
export function AboutCardStack({ topics }: { topics: TopicData[] }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const essayRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    const onResize = () => setVh(window.innerHeight || 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const totalScroll = shellRef.current ? Math.max(1, shellRef.current.offsetHeight - vh) : 1;
  const t = clamp(scrollY / totalScroll, 0, 1);

  /* Essay reading progress (0→1 over the essay phase) */
  const readProgress = easeInOut(
    clamp((t - ESSAY_START) / Math.max(0.001, READ_END - ESSAY_START), 0, 1)
  );

  /* Card stacking progress (0→1 only AFTER READ_END) */
  const cardPhaseT = clamp((t - READ_END) / CARD_PHASE, 0, 1);

  return (
    <section
      ref={shellRef}
      className="relative w-full"
      /* Extra height: ~500vh for essay reading + ~180vh per card for stacking */
      style={{ height: `${500 + topics.length * 180}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Cards: ONLY rendered once card phase starts ── */}
        {topics.map((topic, index) => {
          const n       = topics.length;
          const frac    = n > 1 ? index / (n - 1) : 0;   // 0…1 across stack

          /* stagger: each card enters offset in the card phase */
          const enterStart = frac * 0.45;
          const enterLen   = 0.45;
          const enterT     = easeOut(clamp((cardPhaseT - enterStart) / enterLen, 0, 1));

          /* peek position */
          const stackT = easeOut(clamp((cardPhaseT - frac * 0.35) / 0.55, 0, 1));
          const entry  = ENTRY[index % ENTRY.length];
          const peek   = PEEK[index % PEEK.length];

          const x      = lerp(entry.x,     peek.x,     stackT);
          const y      = lerp(entry.y,     peek.y,     stackT);
          const rot    = lerp(entry.angle, peek.angle, easeInOut(stackT));
          const scale  = lerp(0.88, 1, easeOut(enterT));
          const opacity = easeOut(enterT);

          return (
            <TopicCard
              key={topic.slug}
              topic={topic}
              index={index}
              transform={`translate3d(${x}%, ${y}%, 0) rotate(${rot}deg) scale(${scale})`}
              opacity={opacity}
              zIndex={index + 2}
              isInteractive={cardPhaseT > 0.05}
            />
          );
        })}

        {/* ── Profile card (always present) ── */}
        <ProfileCard
          ep={readProgress}
          essayRef={essayRef}
          transform={`translate3d(0, ${lerp(14, -12, readProgress)}%, 0) scale(${lerp(0.988, 1, readProgress)})`}
        />
      </div>
    </section>
  );
}
