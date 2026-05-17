import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TopicData } from "@/data/clusters";
import heroPortrait from "@/assets/hero-portrait.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t, 0, 1); }
function easeOut(t: number) { return 1 - Math.pow(1 - clamp(t, 0, 1), 3); }
function easeInOut(t: number) { const c = clamp(t, 0, 1); return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2; }

const READ_START = 0.05;
const READ_END = 0.78;
const CARD_START = 0.88;

const CARD_BG = ["hsl(220 32% 7%)", "hsl(226 28% 7.5%)", "hsl(215 36% 6.5%)", "hsl(228 30% 8%)", "hsl(218 38% 6%)", "hsl(223 26% 7%)"];
const CARD_ACCENT = ["#c9a342", "#8ab4c8", "#c49a3a", "#7bbcb4", "#d4aa44", "#9aaed4"];
const PHOTOS = [heroPortrait, atmosNotebook, atmosTelescope, atmosMusic, textureCosmos, atmosNotebook];

function EssayPhoto({ src, alt, caption, align = "right" }: { src: string; alt: string; caption: string; align?: "left" | "right" | "full"; }) {
  if (align === "full") return (
    <figure className="my-7 w-full clear-both">
      <div className="relative w-full overflow-hidden border border-border/25" style={{ aspectRatio: "21/8" }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      <figcaption className="mt-1.5 text-center font-mono uppercase tracking-[0.2em] text-ink-soft/40" style={{ fontSize: "8px" }}>{caption}</figcaption>
    </figure>
  );
  return (
    <figure className={`my-0 mb-3 ${align === "right" ? "float-right ml-5" : "float-left mr-5"} w-24 md:w-36`} style={{ shapeOutside: "border-box" } as React.CSSProperties}>
      <div className="relative overflow-hidden border border-border/25 bg-paper-deep" style={{ aspectRatio: "4/5" }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-1 border border-paper/8 pointer-events-none" />
      </div>
      <figcaption className="mt-1 font-mono uppercase tracking-[0.2em] text-ink-soft/38" style={{ fontSize: "7px" }}>{caption}</figcaption>
    </figure>
  );
}

function Essay() {
  return (
    <div className="flex-1 min-h-0 essay-scroll" style={{ overflowY: "hidden" }}>
      <article className="essay-body pr-3 pb-14" style={{ maxWidth: "640px", margin: "0 auto" }}>
        <section className="essay-section mb-7">
          <h3 className="essay-heading">I. Origin</h3>
          <EssayPhoto src={heroPortrait} alt="Geetika portrait" caption="Montréal, 2024" align="right" />
          <p className="drop-cap">I was born in Rajasthan, India — sandstone, spice, and a sky so wide it made ambition feel obligatory.</p>
          <p>My family moved when I was young, first within India, then to Montréal. I grew up between languages, places, and ways of thinking.</p>
        </section>
        <section className="essay-section mb-7">
          <h3 className="essay-heading">II. Between Worlds</h3>
          <EssayPhoto src={atmosNotebook} alt="Notebook" caption="Notes, drafts, questions" align="left" />
          <p>I speak English, French, Hindi, and Marwari. Each one carries a different version of me.</p>
          <p>That permeability made me a better thinker, writer, and scientist.</p>
        </section>
        <section className="essay-section mb-7">
          <h3 className="essay-heading">III. The Mind and Its Obsessions</h3>
          <EssayPhoto src={atmosTelescope} alt="Telescope" caption="Observing — always observing" align="right" />
          <p>Physics, mathematics, chess, and computer science all taught me the same thing: complicated systems become beautiful when framed well.</p>
          <p>I built this site in React, TypeScript, Vite, and Tailwind because I wanted a structure that could hold the full picture.</p>
        </section>
        <EssayPhoto src={textureCosmos} alt="Cosmos" caption="The texture of deep time" align="full" />
        <section className="essay-section mb-7">
          <h3 className="essay-heading">IV. The Creative Life</h3>
          <EssayPhoto src={atmosMusic} alt="Music" caption="Riyaaz — daily practice" align="left" />
          <p>I train in Hindustani classical vocal. Riyaaz is discipline, patience, and improvisation inside structure.</p>
          <p>Writing is the other major strand: worldbuilding, revision, and long-form thought.</p>
        </section>
        <section className="essay-section mb-4">
          <h3 className="essay-heading">V. What I Am Building</h3>
          <p>This site is an artifact. Every claim has evidence, every skill has a receipt, every curiosity has a paper trail.</p>
          <p className="font-accent italic text-ink-soft/65 mt-4 text-[14px] border-l-2 border-gold/30 pl-4 clear-both">The dossier is the argument. Everything else on this site is the evidence.</p>
        </section>
      </article>
    </div>
  );
}

function ProfileCard({ ep, transform }: { ep: number; transform: string; }) {
  const bOp = lerp(0.14, 0.42, ep);
  const spr = lerp(0, 38, ep);
  const gOp = lerp(0, 0.08, ep);
  const imgW = lerp(40, 64, ep);
  const PY = lerp(16, 24, ep);
  const PX = lerp(16, 24, ep);
  const W = lerp(58, 70, ep);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, transform, willChange: "transform" }}>
      <div className="relative flex flex-col bg-[hsl(220_30%_7%)] border overflow-hidden" style={{ width: `${W}%`, maxWidth: "720px", height: `calc(100vh - ${lerp(130, 100, ep)}px)`, borderColor: `hsl(41 80% 60% / ${bOp})`, borderRadius: `${lerp(16, 12, ep)}px`, padding: `${PY}px ${PX}px`, boxShadow: `0 0 0 1px hsl(41 80% 55% / ${gOp * 0.75}), 0 ${Math.round(spr * 0.2)}px ${spr}px -16px hsl(220 90% 3%/0.92)`, transition: "width 200ms ease, height 200ms ease, padding 200ms ease, border-color 200ms ease, border-radius 200ms ease" }}>
        <div className="relative z-10 flex items-start gap-3 mb-2" style={{ opacity: lerp(0.9, 1, ep) }}>
          <div className="overflow-hidden border border-border/25 bg-paper-deep shrink-0" style={{ width: `${imgW}px`, height: `${imgW}px`, borderRadius: "6px" }}>
            <img src={heroPortrait} alt="Geetika Gehlot" className="w-full h-full object-cover" />
          </div>
          <div className="pt-1 min-w-0">
            <div className="label-gold mb-1">§ 01 · Personal Profile</div>
            <h2 className="font-display text-paper-contrast text-[clamp(18px,2.4vw,24px)] leading-none mb-1">Geetika Gehlot</h2>
            <p className="font-mono uppercase tracking-[0.28em] text-paper-contrast-soft" style={{ fontSize: "7px" }}>Montréal · India-born · Multidisciplinary</p>
          </div>
        </div>
        <div className="mb-2 text-ink-soft/40 font-mono uppercase tracking-[0.22em]" style={{ fontSize: "7px" }}>Scroll to read ↓</div>
        <div className="flex-1 min-h-0 overflow-hidden rounded-[inherit] bg-[hsl(220_30%_6%)] border border-border/20">
          <Essay />
        </div>
      </div>
    </div>
  );
}

function TopicCard({ topic, index, transform, opacity, zIndex, isInteractive }: { topic: TopicData; index: number; transform: string; opacity: number; zIndex: number; isInteractive: boolean; }) {
  const [open, setOpen] = useState(false);
  const accent = CARD_ACCENT[index % CARD_ACCENT.length];
  const bg = CARD_BG[index % CARD_BG.length];
  const photo = PHOTOS[index % PHOTOS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <div
        onClick={() => isInteractive && setOpen(true)}
        style={{ position: "absolute", inset: 0, transform, opacity, zIndex, cursor: isInteractive ? "pointer" : "default", pointerEvents: isInteractive ? "auto" : "none", background: bg, border: `1px solid ${accent}26`, borderRadius: "16px", overflow: "hidden", boxShadow: `0 16px 40px -26px hsl(220 90% 3%/0.68)`, transition: "transform 180ms ease, opacity 180ms ease, border-color 180ms ease", willChange: "transform, opacity" }}
      >
        <img src={photo} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.04] grayscale pointer-events-none" />
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, hsl(220 50% 100%/0.008) 3px 4px)" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono uppercase tracking-[0.32em]" style={{ fontSize: "8px", color: `${accent}99` }}>§ 01</span>
            <span className="font-mono uppercase tracking-[0.22em] text-paper/18" style={{ fontSize: "7.5px" }}>{num}</span>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(17px, 2vw, 24px)", fontWeight: 600, lineHeight: 1.04, color: "hsl(38 30% 90%)", marginBottom: "0.4rem" }}>{topic.label}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(12px, 1vw, 14px)", fontStyle: "italic", color: "hsl(38 15% 64%)", maxWidth: "34ch", lineHeight: 1.35 }}>{topic.blurb}</p>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-[hsl(220_30%_8%)] border border-border text-paper p-0 overflow-hidden">
          <div className="p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono uppercase tracking-[0.3em] text-gold/55" style={{ fontSize: "8px" }}>§ 01 · {num}</span>
              <div className="flex-1 h-px bg-border/35" />
            </div>
            <DialogTitle style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, color: "hsl(38 40% 92%)", lineHeight: 1.1 }}>{topic.label}</DialogTitle>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "hsl(38 20% 62%)", marginTop: "0.35rem", marginBottom: "1rem" }}>{topic.blurb}</p>
            <div className="h-px bg-border/28 mb-4" />
            <DialogDescription asChild>
              <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: "13.5px", lineHeight: 1.7, color: "hsl(220 15% 75%)" }}>
                {topic.detail.split("\n").map((para, i) => <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>)}
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AboutCardStack({ topics }: { topics: TopicData[] }) {
  const shellRef = useRef<HTMLDivElement>(null);
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
  const readProgress = easeInOut(clamp((t - READ_START) / Math.max(0.001, READ_END - READ_START), 0, 1));
  const cardPhase = clamp((t - CARD_START) / Math.max(0.001, 1 - CARD_START), 0, 1);

  return (
    <section ref={shellRef} className="relative w-full" style={{ height: `${340 + topics.length * 80}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <ProfileCard ep={readProgress} transform={`translate3d(0, ${lerp(10, -8, readProgress)}%, 0) scale(${lerp(0.99, 1, readProgress)})`} />
        {cardPhase > 0.02 && topics.map((topic, index) => {
          const n = topics.length;
          const frac = n > 1 ? index / (n - 1) : 0;
          const enterT = easeOut(clamp((cardPhase - frac * 0.44) / 0.28, 0, 1));
          const stackT = easeOut(clamp((cardPhase - frac * 0.16) / 0.58, 0, 1));
          const entry = { angle: 4 - index * 0.9, x: 16 - index * 1.5, y: 20 - index * 1.3 };
          const peek = { angle: -1.5 + index * 0.35, x: 4 + index * 0.7, y: 6 + index * 0.55 };
          const x = lerp(entry.x, peek.x, stackT);
          const y = lerp(entry.y, peek.y, stackT);
          const rot = lerp(entry.angle, peek.angle, easeInOut(stackT));
          const scale = lerp(0.88, 1, easeOut(enterT));
          return <TopicCard key={topic.slug} topic={topic} index={index} transform={`translate3d(${x}%, ${y}%, 0) rotate(${rot}deg) scale(${scale})`} opacity={enterT} zIndex={index + 2} isInteractive={cardPhase > 0.12} />;
        })}
      </div>
    </section>
  );
}
