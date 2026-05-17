import { Sparkles } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { PullQuote, Placeholder } from "@/components/Editorial";
import { useReveal } from "@/hooks/useReveal";

const Proof = () => {
  useReveal();

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ ✦</span>
          <span className="eyebrow">Proof of Curiosity</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          Notebook scans, sketches, half-formed ideas.
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Not finished work — the raw material. Marginalia, doodles, margin calculations,
          the pages you'd normally throw away. Kept here because they prove the process is real.
        </p>
        <div className="rule-gold mt-12" />
      </section>

      <PullQuote attr="The operating principle">
        The notebook never lies. The final product often does.
      </PullQuote>

      <section className="container py-16 md:py-24" data-reveal>
        <div className="flex items-baseline gap-4 mb-8">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="label-gold">Raw Archive</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 [grid-auto-flow:dense]">
          <Placeholder label="Notebook scan — physics derivation" ratio="col-span-2 md:col-span-2 aspect-[16/9]" />
          <Placeholder label="Sketch — robot arm concept" ratio="col-span-1 md:col-span-1 aspect-[4/5]" />
          <Placeholder label="Margin notes — novel draft" ratio="col-span-1 md:col-span-1 aspect-[4/3]" />
          <Placeholder label="Doodle — embroidery pattern" ratio="col-span-2 md:col-span-2 aspect-[16/9]" />
          <Placeholder label="Calculation sheet — abacus practice" ratio="col-span-1 md:col-span-1 aspect-[4/3]" />
          <Placeholder label="Half-formed idea — worldbuilding map" ratio="col-span-1 md:col-span-1 aspect-[1/1]" />
        </div>
      </section>

      <section className="container py-16 md:py-24" data-reveal>
        <div className="flex items-baseline gap-4 mb-8">
          <span className="label-gold">Process</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <p className="max-w-3xl text-ink-soft text-lg leading-relaxed font-accent italic">
          Every item here is unedited. No retouching, no reordering, no cherry-picking.
          The point is to show that curiosity leaves a paper trail — even when the paper
          is crumpled, crossed out, or coffee-stained.
        </p>
      </section>
    </PageShell>
  );
};

export default Proof;
