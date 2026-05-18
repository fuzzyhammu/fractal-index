import { useEffect, useRef, useState, useCallback } from "react";
import texturePaper from "@/assets/texture-paper.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}
function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

const EXPAND_START  = 0.06;
const EXPAND_END    = 0.22;
const COLLAPSE_START = 0.72;
const COLLAPSE_END   = 0.90;
// reading zone = EXPAND_END → COLLAPSE_START

export function ScrollExpandProfile() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const essayRef   = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const wh = window.innerHeight;
    const totalTravel = rect.height - wh;
    if (totalTravel <= 0) { setProgress(0); return; }
    const raw = -rect.top / totalTravel;
    const p = clamp(raw, 0, 1);
    setProgress(p);

    // Drive the essay scroll from page-scroll progress
    const essay = essayRef.current;
    if (essay && p >= EXPAND_END && p <= COLLAPSE_START) {
      const readP = (p - EXPAND_END) / (COLLAPSE_START - EXPAND_END);
      const maxScroll = essay.scrollHeight - essay.clientHeight;
      if (maxScroll > 0) {
        essay.scrollTop = readP * maxScroll;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Compute expansion progress
  let ep0 = 0;
  if (progress < EXPAND_START) ep0 = 0;
  else if (progress < EXPAND_END) ep0 = (progress - EXPAND_START) / (EXPAND_END - EXPAND_START);
  else if (progress < COLLAPSE_START) ep0 = 1;
  else if (progress < COLLAPSE_END) ep0 = 1 - (progress - COLLAPSE_START) / (COLLAPSE_END - COLLAPSE_START);
  else ep0 = 0;

  const ep = ease(ep0);
  const isExpanded = ep > 0.02;

  const W     = lerp(52, 96, ep);
  const PY    = lerp(22, 52, ep);
  const PX    = lerp(24, 60, ep);
  const bOp   = lerp(0.18, 0.75, ep);
  const spr   = lerp(0, 100, ep);
  const gOp   = lerp(0, 0.2, ep);
  const imgW  = lerp(52, 96, ep);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "280vh" }}>
      {/* Sticky viewport frame */}
      <div
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Ambient radial backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(65% 55% at 50% 45%, hsl(41 80% 55% / ${gOp * 0.6}), transparent 68%)`,
            transition: "background 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Profile card */}
        <div
          className="relative flex flex-col bg-[hsl(220_30%_7%)] border overflow-hidden"
          style={{
            width: `${W}%`,
            maxWidth: "1180px",
            height: `calc(100vh - ${lerp(80, 32, ep)}px)`,
            borderColor: `hsl(41 80% 60% / ${bOp})`,
            borderRadius: `${lerp(8, 4, ep)}px`,
            padding: `${PY}px ${PX}px`,
            boxShadow: `
              0 0 0 1px hsl(41 80% 55% / ${gOp * 0.8}),
              0 ${Math.round(spr * 0.3)}px ${spr}px -12px hsl(220 90% 3% / 0.96),
              0 0 ${Math.round(spr * 0.5)}px -18px hsl(41 80% 55% / ${gOp * 2.2})
            `,
            transition: "width 0.8s cubic-bezier(0.22,1,0.36,1), height 0.8s cubic-bezier(0.22,1,0.36,1), padding 0.8s cubic-bezier(0.22,1,0.36,1), border-color 0.8s cubic-bezier(0.22,1,0.36,1), box-shadow 0.8s cubic-bezier(0.22,1,0.36,1), border-radius 0.8s cubic-bezier(0.22,1,0.36,1)",
            zIndex: 10,
          }}
        >
          <CornerBrackets op={ep} />

          {/* ── Header row ── */}
          <header
            className="flex items-start gap-5 shrink-0"
            style={{ marginBottom: `${lerp(0, 32, ep)}px`, transition: "margin 0.8s cubic-bezier(0.22,1,0.36,1)" }}
          >
            {/* Portrait */}
            <figure
              className="relative shrink-0 overflow-hidden border bg-[hsl(220_30%_10%)]"
              style={{
                width: `${imgW}px`,
                aspectRatio: "3/4",
                borderColor: `hsl(41 80% 60% / ${lerp(0.15,0.5,ep)})`,
                transition: "width 0.8s cubic-bezier(0.22,1,0.36,1), border-color 0.8s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <img src={textureCosmos} alt="Cosmos texture" className="absolute inset-0 w-full h-full object-cover object-[60%_25%]" />
              <span className="absolute inset-1.5 border border-paper/10 pointer-events-none" />
            </figure>

            {/* Name block */}
            <div className="flex flex-col gap-1.5 pt-0.5 flex-1">
              <span
                className="font-mono text-gold/70 uppercase tracking-[0.3em]"
                style={{ fontSize: `${lerp(8.5,11,ep)}px`, transition: "font-size 0.8s cubic-bezier(0.22,1,0.36,1)" }}
              >
                § 01 · Personal Profile
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: `${lerp(18,34,ep)}px`,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: `hsl(38 40% ${lerp(80,96,ep)}%)`,
                  transition: "font-size 0.8s cubic-bezier(0.22,1,0.36,1), color 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Geetika Gehlot
              </h2>
              <p
                className="font-mono text-ink-soft/70 tracking-[0.08em]"
                style={{
                  fontSize: `${lerp(9.5,13,ep)}px`,
                  transition: "font-size 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Montréal · India-born · Multidisciplinary
              </p>
              {ep < 0.25 && (
                <p className="font-accent italic text-ink-soft/55 mt-1" style={{ fontSize: "12.5px", opacity: Math.max(0, 1 - ep * 5) }}>
                  Scroll to read ↓
                </p>
              )}
            </div>

            {/* Scroll progress pip */}
            <div className="shrink-0 flex flex-col items-center gap-1 ml-2" style={{ opacity: lerp(0.35, 0.12, ep) }}>
              <span className="font-mono text-gold/60 uppercase tracking-[0.2em]" style={{ fontSize: "7px" }}>SCROLL</span>
              <div className="relative w-px bg-border/50" style={{ height: "36px" }}>
                <div
                  className="absolute top-0 left-0 right-0 bg-gold origin-top"
                  style={{ height: "100%", transform: `scaleY(${clamp(progress / EXPAND_START, 0, 1)})`, transition: "transform 0.1s linear" }}
                />
              </div>
            </div>
          </header>

          {/* Divider */}
          <div
            className="shrink-0"
            style={{
              height: "1px",
              background: `linear-gradient(to right, hsl(41 80% 55% / ${lerp(0, 0.5, ep)}), hsl(41 80% 55% / ${lerp(0, 0.12, ep)}) 60%, transparent)`,
              marginBottom: `${lerp(0, 24, ep)}px`,
              transition: "background 0.8s cubic-bezier(0.22,1,0.36,1), margin 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* ── Essay body — page-scroll drives scrollTop ── */}
          <div
            ref={essayRef}
            className="flex-1 min-h-0 overflow-hidden essay-scroll"
            style={{
              opacity: clamp((ep - 0.25) / 0.45, 0, 1),
              transition: "opacity 0.5s ease",
              // intentionally NOT overflow-y: auto — we drive scroll programmatically
              overflowY: "hidden",
            }}
          >
            <Essay />
          </div>

          {/* Bottom vignette */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{
              height: "90px",
              background: "linear-gradient(to top, hsl(220 30% 7% / 0.97) 30%, transparent)",
              opacity: ep,
              transition: "opacity 0.6s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Gold corner brackets ─────────────────────────────────────── */
function CornerBrackets({ op }: { op: number }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: "18px",
    height: "18px",
    opacity: op * 0.65,
    transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1)",
  };
  return (
    <>
      <span style={{ ...base, top: 14, left: 14, borderTop: "1px solid hsl(41 80% 60%)", borderLeft: "1px solid hsl(41 80% 60%)" }} />
      <span style={{ ...base, top: 14, right: 14, borderTop: "1px solid hsl(41 80% 60%)", borderRight: "1px solid hsl(41 80% 60%)" }} />
      <span style={{ ...base, bottom: 14, left: 14, borderBottom: "1px solid hsl(41 80% 60%)", borderLeft: "1px solid hsl(41 80% 60%)" }} />
      <span style={{ ...base, bottom: 14, right: 14, borderBottom: "1px solid hsl(41 80% 60%)", borderRight: "1px solid hsl(41 80% 60%)" }} />
    </>
  );
}

/* ── Inline photo helpers ─────────────────────────────────────── */
function EssayPhoto({ src, alt, caption, align = "right" }: { src: string; alt: string; caption: string; align?: "left" | "right" | "full" }) {
  if (align === "full") {
    return (
      <figure className="my-9 w-full clear-both">
        <div className="relative w-full overflow-hidden border border-border/30" style={{ aspectRatio: "21/8" }}>
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
        </div>
        <figcaption className="mt-2 text-center font-mono uppercase tracking-[0.2em] text-ink-soft/45" style={{ fontSize: "9px" }}>{caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure
      className={`my-1 mb-5 ${align === "right" ? "float-right ml-7" : "float-left mr-7"} w-40 md:w-56`}
      style={{ shapeOutside: "border-box" }}
    >
      <div className="relative overflow-hidden border border-border/30 bg-paper-deep" style={{ aspectRatio: "4/5" }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-1 border border-paper/8 pointer-events-none" />
      </div>
      <figcaption className="mt-1.5 font-mono uppercase tracking-[0.2em] text-ink-soft/40" style={{ fontSize: "8px" }}>{caption}</figcaption>
    </figure>
  );
}

/* ── Full essay ───────────────────────────────────────────────── */
function Essay() {
  return (
    <article className="essay-body pr-5 pb-20" style={{ maxWidth: "760px", margin: "0 auto" }}>

      <section className="essay-section mb-9">
        <h3 className="essay-heading">I. Origin</h3>
        <EssayPhoto src={textureCosmos} alt="Cosmos texture" caption="Montréal, 2024" align="right" />
        <p className="drop-cap">
          I was born in a city that does not sleep lightly. Rajasthan, India — sandstone
          and spice and a sky so wide it made ambition feel obligatory. My earliest memories
          are not of a classroom but of the space between things: between words in a
          conversation I was too young to join, between the notes of a raag my grandmother
          hummed while she cooked, between the lines of a physics problem my father was
          trying to explain to someone else and I was absorbing from across the room.
        </p>
        <p>
          That space between things is where I have always lived. Not quite inside any
          single discipline, any single culture, any single language. The gap, it turns
          out, is not emptiness. It is where everything interesting happens.
        </p>
        <p>
          My family moved when I was young — first within India, then out of it entirely,
          to Canada, to Montréal, a city whose own identity is built on the productive
          tension between languages and traditions. I did not know it then, but I was
          training for that city my whole life.
        </p>
      </section>

      <section className="essay-section mb-9">
        <h3 className="essay-heading">II. Between Worlds</h3>
        <EssayPhoto src={texturePaper} alt="Paper texture" caption="Notes, drafts, half-formed questions" align="left" />
        <p>
          Moving between countries at a formative age is not a neutral event. It rewires
          something. You stop assuming that the way things are done where you grew up is the
          only way — or even the best way. You develop a kind of permeability to context,
          an ability to read rooms that are not yours and find your footing faster than you
          should.
        </p>
        <p>
          I speak four languages: English, French, Hindi, and Marwari. Each one carries a
          different register of myself. English is where I think most precisely. French
          navigates the city. Hindi is where old memories arrive in intact sentences.
          Marwari is where I belong without explanation — the language of family dinners,
          festivals, and stories that predate every version of me I have so far been.
        </p>
        <p>
          What does it mean to be fluent in a culture? It is not just the language. It is
          the assumptions embedded in the grammar, the things people do not say because
          they do not have to. I grew up learning to find those load-bearing silences in
          more than one culture, more than one linguistic family. It made me a better
          thinker, a better writer, and a better scientist. The best researchers I have
          encountered are all translators of a kind — moving fluently between levels of
          abstraction, between formalism and intuition, between their discipline's
          vocabulary and the common tongue.
        </p>
        <p>
          I am still becoming fluent in all the cultures I move through. I do not think
          that process ever finishes. But it has given me a tolerance for ambiguity
          I now recognise as one of the most practically useful things I own.
        </p>
      </section>

      <section className="essay-section mb-9">
        <h3 className="essay-heading">III. The Mind and Its Obsessions</h3>
        <EssayPhoto src={textureCosmos} alt="Cosmos texture" caption="Observing — always observing" align="right" />
        <p>
          If you asked me to identify the central obsession of my intellectual life, I
          would not give you a subject. I would give you a posture. I am obsessed with
          the moment when something that appeared complicated becomes, in the right frame,
          simple. The moment when a pattern reveals itself under enough scrutiny. The
          moment when the equation you have been staring at for an hour suddenly speaks.
        </p>
        <p>
          Physics found me through my father, who treated it not as a subject but as a
          lens. Before I had a name for it, I was learning to see forces as conversations,
          energy as currency, time as a dimension rather than a river. The formal study
          came later, and it came hard — I will not pretend otherwise. The mathematical
          machinery of physics is not gentle. But I kept returning to it because of what
          it promised: a language precise enough to describe the universe without losing
          its strangeness.
        </p>
        <p>
          Mathematics followed closely. I competed in math olympiads not because I was
          the fastest calculator in the room but because I loved the architecture of proofs.
          Chess gave me something similar: the pleasure of thinking several moves ahead,
          of holding a branching tree of possibilities in memory and choosing the path
          with the best expected value. The disciplines are different in almost every
          surface feature. The underlying skill is the same.
        </p>
        <p>
          Computer science arrived as a natural extension. I came to programming not from
          wanting to build apps but from wanting to build things that think. I taught myself
          React and TypeScript. I learned Python. I built this site — not because I want to
          be a software engineer, but because I want to be someone who can build whatever
          needs to be built, in whatever medium is required.
        </p>
        <p>
          Current interests: quantum information, complex systems, the mathematics of
          emergence, and the uncomfortable zone where computation meets cognition.
        </p>
      </section>

      <EssayPhoto src={textureCosmos} alt="Cosmos texture" caption="The texture of deep time" align="full" />

      <section className="essay-section mb-9">
        <h3 className="essay-heading">IV. The Creative Life</h3>
        <EssayPhoto src={texturePaper} alt="Paper texture" caption="Riyaaz — daily practice in Hindustani vocal" align="left" />
        <p>
          The assumption that STEM and the arts are in competition is one I have never
          been able to take seriously, because it has never matched my experience. The
          creativity required to design an experiment and the creativity required to write
          a novel are not different in kind. They are different in material.
        </p>
        <p>
          I have been training in Hindustani classical vocal for years. Riyaaz — daily
          practice — is non-negotiable. A raag is not a melody; it is a grammar. It
          specifies which notes are permitted, which are forbidden, which are emphasised,
          in which direction the phrases typically move, what emotional territory the raag
          inhabits. Within those constraints, improvisation is not just allowed but
          required. You must find something new to say inside a structure that has been
          explored for centuries. I find this an almost exact description of what good
          science asks of you as well.
        </p>
        <p>
          Writing is the other major strand. I am several volumes into a novel series —
          a world built over years, with its own internal history, its own geography, its
          own rules for how power and knowledge are distributed. Worldbuilding at that
          scale is a systems design problem. Every chapter I revise makes me a better
          thinker.
        </p>
        <p>
          Badminton, chess, table tennis, karate, abacus competitions — each sounds like a
          hobby until you look closely at the underlying skill being built. In every case,
          it is the same: accurate perception under time pressure, decision-making with
          incomplete information, recovery from error without losing composure.
        </p>
      </section>

      <section className="essay-section mb-9">
        <h3 className="essay-heading">V. What I Am Building</h3>
        <p>
          This site is an artifact. I built it from scratch — React, TypeScript, Vite,
          Tailwind — not because I needed a portfolio but because I needed a structure
          that could hold the full picture. Most portfolios are curated highlights.
          This is a dossier: every claim has evidence, every skill has a receipt, every
          curiosity has a paper trail.
        </p>
        <p>
          The FRC robotics team taught me what it means to build under pressure with a
          team that is counting on you. Build season is twelve weeks of design, iteration,
          fabrication, and testing, ending in competition. It is also twelve weeks of
          learning to communicate across roles — between the software team and the
          mechanical team, between the strategic vision and the engineering constraints.
        </p>
        <p>
          Zionaxelle is a multimedia brand I designed from nothing — visual identity,
          content strategy, web presence, production pipeline. It exists because I wanted
          to know whether I could build something coherent and ship it. I can. I did.
        </p>
      </section>

      <section className="essay-section mb-4">
        <h3 className="essay-heading">VI. Where I Am Headed</h3>
        <p>
          I do not have a five-year plan in the conventional sense. I have a model of what
          I want my work to look like: rigorous, interdisciplinary, evidence-based, and
          built at the intersection of STEM and creative practice.
        </p>
        <p>
          What I know: I want to do research that matters. I want to make things that work.
          I want to keep training as a vocalist because the practice of it makes everything
          else better. I want to finish the novel. I want to keep building tools and
          systems that allow me to think more clearly, move faster, and share work more
          honestly.
        </p>
        <p>
          I am fifteen years old. I have been working on these things for most of my
          conscious life. I am going to keep working on them.
        </p>
        <p className="font-accent italic text-ink-soft/70 mt-5 text-[15px] border-l-2 border-gold/35 pl-5">
          The dossier is the argument. Everything else on this site is the evidence.
          Welcome to the paper trail.
        </p>
        <div className="flex items-center gap-4 mt-10 clear-both">
          <span className="flex-1 h-px bg-border/30" />
          <span className="font-mono text-gold/40 uppercase tracking-[0.3em]" style={{ fontSize: "8px" }}>End § 01</span>
          <span className="flex-1 h-px bg-border/30" />
        </div>
      </section>
    </article>
  );
}
