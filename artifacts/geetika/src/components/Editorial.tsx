import { ReactNode } from "react";

/* Shared editorial / dossier primitives */

export const PageHeader = ({
  number,
  kicker,
  title,
  lede,
}: {
  number: string;
  kicker: string;
  title: string;
  lede?: string;
}) => (
  <section className="container pt-16 md:pt-24 pb-12">
    <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
      <span className="font-mono text-xs tracking-[0.3em] text-gold">§ {number}</span>
      <span className="eyebrow">{kicker}</span>
      <span className="flex-1 h-px bg-border" />
    </div>
    <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
      {title}
    </h1>
    {lede && (
      <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed font-accent italic animate-fade-up">
        {lede}
      </p>
    )}
    <div className="rule-gold mt-12" />
  </section>
);

export const Section = ({
  number,
  title,
  intro,
  children,
}: {
  number?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) => (
  <section className="container py-16 md:py-24">
    <header className="mb-12 max-w-3xl">
      <div className="flex items-baseline gap-4 mb-3">
        {number && <span className="font-mono text-[0.7rem] text-gold tracking-widest">{number}</span>}
        <span className="eyebrow">Subsection</span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-tight">{title}</h2>
      {intro && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{intro}</p>}
    </header>
    {children}
  </section>
);

export const Card = ({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
  children?: ReactNode;
}) => (
  <article className="dossier-card p-7 hover-lift">
    {eyebrow && <p className="label-gold mb-3">{eyebrow}</p>}
    <h3 className="font-display text-xl text-ink mb-2 leading-tight">{title}</h3>
    {meta && <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground mb-4">{meta}</p>}
    {children && <div className="text-ink-soft text-sm leading-relaxed mt-3">{children}</div>}
  </article>
);

export const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="border-t border-ink/40 pt-3">
    <div className="font-display text-3xl md:text-4xl text-ink leading-none">{value}</div>
    <div className="mt-2 eyebrow">{label}</div>
  </div>
);

export const PullQuote = ({ children, attr }: { children: ReactNode; attr?: string }) => (
  <blockquote className="my-16 max-w-3xl mx-auto text-center">
    <span className="text-gold font-display text-6xl leading-none">“</span>
    <p className="font-accent italic text-xl md:text-2xl text-ink leading-snug -mt-4">
      {children}
    </p>
    {attr && <footer className="eyebrow mt-4">— {attr}</footer>}
  </blockquote>
);

export const Timeline = ({
  items,
}: {
  items: { year: string; title: string; body: string }[];
}) => (
  <ol className="relative border-l border-gold/40 ml-3 space-y-10">
    {items.map((it, i) => (
      <li key={i} className="pl-8 relative">
        <span className="absolute -left-[7px] top-2 w-3 h-3 bg-gold rounded-full" />
        <p className="font-mono text-xs text-gold tracking-widest">{it.year}</p>
        <h4 className="font-display text-lg text-ink mt-1">{it.title}</h4>
        <p className="text-ink-soft text-sm mt-2 leading-relaxed">{it.body}</p>
      </li>
    ))}
  </ol>
);

export const Placeholder = ({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) => (
  <div
    className={`${ratio} bg-paper-deep border border-dashed border-ink/30 flex items-center justify-center relative grain`}
  >
    <div className="text-center px-6">
      <p className="label-gold mb-2">[ Placeholder ]</p>
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft max-w-xs">
        {label}
      </p>
    </div>
  </div>
);

export const Embed = ({ title, todo }: { title: string; todo: string }) => (
  <div className="border border-gold/60 bg-paper p-6 relative">
    <span className="stamp absolute -top-3 left-4 bg-paper">TODO · Embed</span>
    <p className="font-display text-lg text-ink mt-2">{title}</p>
    <p className="font-mono text-xs text-ink-soft mt-3 leading-relaxed">{todo}</p>
  </div>
);

export const Marginalia = ({ children }: { children: ReactNode }) => (
  <aside className="border-l-2 border-gold pl-4 italic font-display text-ink-soft text-base">
    {children}
  </aside>
);
